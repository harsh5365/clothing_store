/**
 * Search and filtering utilities for product catalog
 * Pure functions for testability and maintainability
 */

/**
 * Check if a product matches the search query (case-insensitive)
 * @param {Object} product - Product object with name and description
 * @param {string} query - Search query string
 * @returns {boolean} - True if product matches query
 */
export function matchesSearch(product, query) {
  if (!query || query.trim() === '') return true;
  
  const lowerQuery = query.toLowerCase().trim();
  const productName = (product.name || '').toLowerCase();
  const productDescription = (product.description || '').toLowerCase();
  
  return productName.includes(lowerQuery) || productDescription.includes(lowerQuery);
}

/**
 * Check if a product matches the selected categories
 * @param {Object} product - Product object with category
 * @param {string[]} categories - Array of selected category names
 * @returns {boolean} - True if product matches any selected category
 */
export function matchesCategory(product, categories) {
  if (!categories || categories.length === 0) return true;
  
  return categories.includes(product.category);
}

/**
 * Check if a product's price is within the specified range
 * @param {Object} product - Product object with price
 * @param {Object} priceRange - Object with min and max price values
 * @returns {boolean} - True if product price is within range
 */
export function matchesPriceRange(product, priceRange) {
  if (!priceRange) return true;
  
  const { min, max } = priceRange;
  const price = product.price;
  
  if (min !== null && min !== undefined && price < min) return false;
  if (max !== null && max !== undefined && price > max) return false;
  
  return true;
}

/**
 * Filter products based on search query, categories, and price range
 * @param {Object[]} products - Array of product objects
 * @param {Object} filters - Filter object with query, categories, and priceRange
 * @returns {Object[]} - Filtered array of products
 */
export function filterProducts(products, filters) {
  if (!products || !Array.isArray(products)) return [];
  if (!filters) return products;
  
  const { query, categories, priceRange } = filters;
  
  return products.filter(product => 
    matchesSearch(product, query) &&
    matchesCategory(product, categories) &&
    matchesPriceRange(product, priceRange)
  );
}

/**
 * Get unique categories from product list
 * @param {Object[]} products - Array of product objects
 * @returns {string[]} - Array of unique category names
 */
export function getUniqueCategories(products) {
  if (!products || !Array.isArray(products)) return [];
  
  const categories = products.map(p => p.category).filter(Boolean);
  return [...new Set(categories)].sort();
}

/**
 * Get price range from product list
 * @param {Object[]} products - Array of product objects
 * @returns {Object} - Object with min and max prices
 */
export function getPriceRange(products) {
  if (!products || !Array.isArray(products) || products.length === 0) {
    return { min: 0, max: 0 };
  }
  
  const prices = products.map(p => p.price).filter(p => typeof p === 'number');
  
  if (prices.length === 0) return { min: 0, max: 0 };
  
  return {
    min: Math.min(...prices),
    max: Math.max(...prices)
  };
}
