'use client';

import { useWishlist } from '../context/WishlistContext';
import Link from 'next/link';

const WishlistBadge = () => {
  const { itemCount } = useWishlist();

  return (
    <Link
      href="/wishlist"
      className="btn position-relative border-0 p-2"
      aria-label={`Wishlist with ${itemCount} items`}
    >
      <svg
        width="24"
        height="24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        viewBox="0 0 24 24"
      >
        <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"/>
      </svg>
      {itemCount > 0 && (
        <span 
          className="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-danger"
          aria-label={`${itemCount} items in wishlist`}
        >
          {itemCount}
        </span>
      )}
    </Link>
  );
};

export default WishlistBadge;
