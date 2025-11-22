'use client';

import { useState } from 'react';

const StarRating = ({ 
  rating = 0, 
  onRatingChange, 
  readonly = false, 
  size = 20 
}) => {
  const [hoverRating, setHoverRating] = useState(0);

  const handleClick = (value) => {
    if (!readonly && onRatingChange) {
      onRatingChange(value);
    }
  };

  const handleMouseEnter = (value) => {
    if (!readonly) {
      setHoverRating(value);
    }
  };

  const handleMouseLeave = () => {
    if (!readonly) {
      setHoverRating(0);
    }
  };

  const displayRating = hoverRating || rating;

  return (
    <div className="star-rating d-inline-flex gap-1">
      {[1, 2, 3, 4, 5].map((value) => (
        <button
          key={value}
          type="button"
          className={`btn btn-link p-0 border-0 ${readonly ? '' : 'cursor-pointer'}`}
          onClick={() => handleClick(value)}
          onMouseEnter={() => handleMouseEnter(value)}
          onMouseLeave={handleMouseLeave}
          disabled={readonly}
          aria-label={`${value} star${value > 1 ? 's' : ''}`}
          style={{ cursor: readonly ? 'default' : 'pointer' }}
        >
          <svg
            width={size}
            height={size}
            fill={value <= displayRating ? 'currentColor' : 'none'}
            stroke="currentColor"
            strokeWidth="2"
            viewBox="0 0 24 24"
            className={value <= displayRating ? 'text-warning' : 'text-muted'}
          >
            <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/>
          </svg>
        </button>
      ))}
      {!readonly && (
        <span className="ms-2 text-muted small">
          {displayRating > 0 ? `${displayRating} star${displayRating > 1 ? 's' : ''}` : 'Select rating'}
        </span>
      )}
    </div>
  );
};

export default StarRating;
