'use client';

import { useWishlist } from '../context/WishlistContext';
import { useState } from 'react';

const WishlistButton = ({ product, className = '' }) => {
  const { addItem, removeItem, isInWishlist } = useWishlist();
  const [isAnimating, setIsAnimating] = useState(false);
  const inWishlist = isInWishlist(product.id);

  const handleClick = (e) => {
    e.preventDefault();
    e.stopPropagation();
    
    setIsAnimating(true);
    
    if (inWishlist) {
      removeItem(product.id);
    } else {
      addItem(product);
    }
    
    setTimeout(() => setIsAnimating(false), 300);
  };

  return (
    <button
      className={`btn btn-link p-0 ${className}`}
      onClick={handleClick}
      aria-label={inWishlist ? 'Remove from wishlist' : 'Add to wishlist'}
      style={{ transition: 'transform 0.2s' }}
    >
      <svg
        width="24"
        height="24"
        fill={inWishlist ? 'currentColor' : 'none'}
        stroke="currentColor"
        strokeWidth="2"
        viewBox="0 0 24 24"
        className={`${inWishlist ? 'text-danger' : 'text-muted'} ${isAnimating ? 'scale-125' : ''}`}
        style={{ transition: 'all 0.2s' }}
      >
        <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"/>
      </svg>
    </button>
  );
};

export default WishlistButton;
