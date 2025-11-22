/**
 * Review and rating utilities
 */

const REVIEWS_STORAGE_KEY = 'fashionfox-reviews';

/**
 * Load reviews from localStorage
 */
export function loadReviews() {
  if (typeof window === 'undefined') return [];
  
  try {
    const stored = localStorage.getItem(REVIEWS_STORAGE_KEY);
    if (!stored) return [];
    
    const reviews = JSON.parse(stored);
    return Array.isArray(reviews) ? reviews : [];
  } catch (error) {
    console.error('Failed to load reviews:', error);
    return [];
  }
}

/**
 * Save reviews to localStorage
 */
export function saveReviews(reviews) {
  if (typeof window === 'undefined') return;
  
  try {
    localStorage.setItem(REVIEWS_STORAGE_KEY, JSON.stringify(reviews));
  } catch (error) {
    console.error('Failed to save reviews:', error);
  }
}

/**
 * Get reviews for a specific product
 */
export function getProductReviews(productId) {
  const allReviews = loadReviews();
  return allReviews.filter(review => review.productId === productId);
}

/**
 * Add a new review
 */
export function addReview(review) {
  const reviews = loadReviews();
  const newReview = {
    ...review,
    id: `review-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`,
    date: Date.now(),
    helpful: 0
  };
  reviews.push(newReview);
  saveReviews(reviews);
  return newReview;
}

/**
 * Calculate average rating for a product
 */
export function calculateAverageRating(productId) {
  const reviews = getProductReviews(productId);
  
  if (reviews.length === 0) return 0;
  
  const sum = reviews.reduce((acc, review) => acc + review.rating, 0);
  return sum / reviews.length;
}

/**
 * Get review count for a product
 */
export function getReviewCount(productId) {
  return getProductReviews(productId).length;
}

/**
 * Filter reviews by rating
 */
export function filterReviewsByRating(reviews, rating) {
  if (!rating) return reviews;
  return reviews.filter(review => review.rating === rating);
}

/**
 * Sort reviews
 */
export function sortReviews(reviews, sortBy = 'newest') {
  const sorted = [...reviews];
  
  switch (sortBy) {
    case 'newest':
      return sorted.sort((a, b) => b.date - a.date);
    case 'oldest':
      return sorted.sort((a, b) => a.date - b.date);
    case 'highest':
      return sorted.sort((a, b) => b.rating - a.rating);
    case 'lowest':
      return sorted.sort((a, b) => a.rating - b.rating);
    case 'helpful':
      return sorted.sort((a, b) => b.helpful - a.helpful);
    default:
      return sorted;
  }
}
