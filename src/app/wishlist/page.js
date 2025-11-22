'use client';

import { useWishlist } from '../../context/WishlistContext';
import WishlistItem from '../../components/WishlistItem';
import Link from 'next/link';

export default function WishlistPage() {
  const { items, itemCount, clearWishlist } = useWishlist();

  return (
    <div className="container py-5" style={{ marginTop: '80px' }}>
      <div className="row">
        <div className="col-12">
          <div className="d-flex justify-content-between align-items-center mb-4">
            <h1>My Wishlist</h1>
            {itemCount > 0 && (
              <button
                className="btn btn-outline-danger"
                onClick={clearWishlist}
              >
                Clear Wishlist
              </button>
            )}
          </div>
        </div>
      </div>

      {items.length === 0 ? (
        <div className="row">
          <div className="col-12">
            <div className="text-center py-5">
              <svg
                width="120"
                height="120"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                viewBox="0 0 24 24"
                className="text-muted mb-4"
              >
                <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"/>
              </svg>
              <h3 className="mb-3">Your wishlist is empty</h3>
              <p className="text-muted mb-4">
                Save your favorite products to your wishlist and come back to them later.
              </p>
              <Link href="/products" className="btn btn-primary btn-lg">
                Browse Products
              </Link>
            </div>
          </div>
        </div>
      ) : (
        <div className="row">
          <div className="col-12">
            <p className="text-muted mb-4">
              {itemCount} {itemCount === 1 ? 'item' : 'items'} in your wishlist
            </p>
            {items.map(item => (
              <WishlistItem key={item.id} item={item} />
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
