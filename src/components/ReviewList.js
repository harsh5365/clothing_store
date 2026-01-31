'use client';

import { useState, useMemo } from 'react';
import StarRating from './StarRating';
import { filterReviewsByRating, sortReviews } from '../lib/reviewUtils';

const ReviewList = ({ reviews = [], averageRating = 0, totalCount = 0 }) => {
  const [filterRating, setFilterRating] = useState(null);
  const [sortBy, setSortBy] = useState('newest');

  const filteredAndSortedReviews = useMemo(() => {
    let result = reviews;
    
    if (filterRating) {
      result = filterReviewsByRating(result, filterRating);
    }
    
    result = sortReviews(result, sortBy);
    
    return result;
  }, [reviews, filterRating, sortBy]);

  const formatDate = (timestamp) => {
    return new Date(timestamp).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  return (
    <div className="review-list">
      {/* Summary */}
      <div className="card mb-4">
        <div className="card-body">
          <div className="row align-items-center">
            <div className="col-md-4 text-center border-end">
              <h2 className="display-4 mb-0">{averageRating.toFixed(1)}</h2>
              <StarRating rating={Math.round(averageRating)} readonly size={24} />
              <p className="text-muted mb-0">{totalCount} {totalCount === 1 ? 'review' : 'reviews'}</p>
            </div>
            <div className="col-md-8">
              <h5 className="mb-3">Rating Distribution</h5>
              {[5, 4, 3, 2, 1].map(star => {
                const count = reviews.filter(r => r.rating === star).length;
                const percentage = totalCount > 0 ? (count / totalCount) * 100 : 0;
                
                return (
                  <div key={star} className="d-flex align-items-center mb-2">
                    <span className="me-2" style={{ width: '60px' }}>{star} stars</span>
                    <div className="progress flex-grow-1 me-2" style={{ height: '8px' }}>
                      <div
                        className="progress-bar bg-warning"
                        style={{ width: `${percentage}%` }}
                      />
                    </div>
                    <span className="text-muted" style={{ width: '40px' }}>{count}</span>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>

      {/* Filters and Sort */}
      {reviews.length > 0 && (
        <div className="d-flex justify-content-between align-items-center mb-3">
          <div className="btn-group" role="group">
            <button
              className={`btn btn-sm ${!filterRating ? 'btn-primary' : 'btn-outline-primary'}`}
              onClick={() => setFilterRating(null)}
            >
              All
            </button>
            {[5, 4, 3, 2, 1].map(star => (
              <button
                key={star}
                className={`btn btn-sm ${filterRating === star ? 'btn-primary' : 'btn-outline-primary'}`}
                onClick={() => setFilterRating(star)}
              >
                {star} ★
              </button>
            ))}
          </div>
          
          <select
            className="form-select form-select-sm"
            style={{ width: 'auto' }}
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value)}
          >
            <option value="newest">Newest First</option>
            <option value="oldest">Oldest First</option>
            <option value="highest">Highest Rating</option>
            <option value="lowest">Lowest Rating</option>
          </select>
        </div>
      )}

      {/* Reviews */}
      {filteredAndSortedReviews.length === 0 ? (
        <div className="text-center py-5">
          <p className="text-muted">
            {reviews.length === 0 
              ? 'No reviews yet. Be the first to review this product!' 
              : 'No reviews match your filter.'}
          </p>
        </div>
      ) : (
        <div className="reviews">
          {filteredAndSortedReviews.map(review => (
            <div key={review.id} className="card mb-3">
              <div className="card-body">
                <div className="d-flex justify-content-between align-items-start mb-2">
                  <div>
                    <StarRating rating={review.rating} readonly size={16} />
                    <h6 className="mt-2 mb-1">{review.title}</h6>
                  </div>
                  <small className="text-muted">{formatDate(review.date)}</small>
                </div>
                <p className="mb-2">{review.text}</p>
                <small className="text-muted">By {review.author}</small>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default ReviewList;
