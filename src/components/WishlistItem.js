'use client';

import Image from 'next/image';
import { useWishlist } from '../context/WishlistContext';
import { useCart } from '../context/CartContext';
import { useState } from 'react';

const WishlistItem = ({ item }) => {
  const { removeItem } = useWishlist();
  const { addItem: addToCart } = useCart();
  const [isAdding, setIsAdding] = useState(false);

  const handleAddToCart = () => {
    setIsAdding(true);
    addToCart(item);
    setTimeout(() => setIsAdding(false), 600);
  };

  const handleRemove = () => {
    removeItem(item.id);
  };

  return (
    <div className="wishlist-item card mb-3">
      <div className="card-body">
        <div className="row align-items-center">
          <div className="col-md-2">
            <Image
              src={item.image}
              alt={item.name}
              width={100}
              height={100}
              className="rounded"
              style={{ objectFit: 'cover', width: '100%', height: 'auto' }}
            />
          </div>
          
          <div className="col-md-6">
            <h5 className="mb-1">{item.name}</h5>
            <p className="text-muted mb-2">{item.category}</p>
            <p className="h5 text-primary mb-0">${item.price.toFixed(2)}</p>
          </div>
          
          <div className="col-md-4 text-end">
            <div className="d-flex flex-column gap-2">
              <button
                className={`btn ${isAdding ? 'btn-success' : 'btn-primary'}`}
                onClick={handleAddToCart}
                disabled={isAdding}
              >
                {isAdding ? (
                  <>
                    <svg width="16" height="16" fill="currentColor" viewBox="0 0 16 16" className="me-1">
                      <path d="M10.97 4.97a.75.75 0 0 1 1.07 1.05l-3.99 4.99a.75.75 0 0 1-1.08.02L4.324 8.384a.75.75 0 1 1 1.06-1.06l2.094 2.093 3.473-4.425a.267.267 0 0 1 .02-.022z"/>
                    </svg>
                    Added to Cart!
                  </>
                ) : (
                  'Add to Cart'
                )}
              </button>
              <button
                className="btn btn-outline-danger"
                onClick={handleRemove}
              >
                Remove
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default WishlistItem;
