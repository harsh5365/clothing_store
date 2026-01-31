'use client';

import { useState } from 'react';
import StarRating from './StarRating';
import { addReview } from '../lib/reviewUtils';

const ReviewForm = ({ productId, onReviewAdded }) => {
  const [rating, setRating] = useState(0);
  const [title, setTitle] = useState('');
  const [text, setText] = useState('');
  const [author, setAuthor] = useState('');
  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  const validate = () => {
    const newErrors = {};
    
    if (rating === 0) {
      newErrors.rating = 'Please select a rating';
    }
    
    if (!title.trim()) {
      newErrors.title = 'Title is required';
    }
    
    if (!text.trim()) {
      newErrors.text = 'Review text is required';
    }
    
    if (!author.trim()) {
      newErrors.author = 'Name is required';
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    if (!validate()) return;
    
    setIsSubmitting(true);
    
    const review = {
      productId,
      rating,
      title: title.trim(),
      text: text.trim(),
      author: author.trim()
    };
    
    const newReview = addReview(review);
    
    // Reset form
    setRating(0);
    setTitle('');
    setText('');
    setAuthor('');
    setErrors({});
    setIsSubmitting(false);
    
    if (onReviewAdded) {
      onReviewAdded(newReview);
    }
  };

  return (
    <div className="review-form card">
      <div className="card-body">
        <h5 className="card-title mb-4">Write a Review</h5>
        
        <form onSubmit={handleSubmit}>
          {/* Rating */}
          <div className="mb-3">
            <label className="form-label">Rating *</label>
            <div>
              <StarRating rating={rating} onRatingChange={setRating} />
            </div>
            {errors.rating && (
              <div className="text-danger small mt-1">{errors.rating}</div>
            )}
          </div>

          {/* Author Name */}
          <div className="mb-3">
            <label htmlFor="author" className="form-label">Your Name *</label>
            <input
              type="text"
              className={`form-control ${errors.author ? 'is-invalid' : ''}`}
              id="author"
              value={author}
              onChange={(e) => setAuthor(e.target.value)}
              placeholder="Enter your name"
            />
            {errors.author && (
              <div className="invalid-feedback">{errors.author}</div>
            )}
          </div>

          {/* Title */}
          <div className="mb-3">
            <label htmlFor="title" className="form-label">Review Title *</label>
            <input
              type="text"
              className={`form-control ${errors.title ? 'is-invalid' : ''}`}
              id="title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="Sum up your review in one line"
            />
            {errors.title && (
              <div className="invalid-feedback">{errors.title}</div>
            )}
          </div>

          {/* Review Text */}
          <div className="mb-3">
            <label htmlFor="text" className="form-label">Review *</label>
            <textarea
              className={`form-control ${errors.text ? 'is-invalid' : ''}`}
              id="text"
              rows="4"
              value={text}
              onChange={(e) => setText(e.target.value)}
              placeholder="Share your experience with this product"
            />
            {errors.text && (
              <div className="invalid-feedback">{errors.text}</div>
            )}
          </div>

          <button
            type="submit"
            className="btn btn-primary"
            disabled={isSubmitting}
          >
            {isSubmitting ? 'Submitting...' : 'Submit Review'}
          </button>
        </form>
      </div>
    </div>
  );
};

export default ReviewForm;
