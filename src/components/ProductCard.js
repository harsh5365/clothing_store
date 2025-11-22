'use client';

import Image from 'next/image';
import { useCart } from '../context/CartContext';
import WishlistButton from './WishlistButton';
import { useState } from 'react';

const ProductCard = ({ product }) => {
  const { id, name, price, image, category, description } = product;
  const { addItem } = useCart();
  const [isAdding, setIsAdding] = useState(false);

  const handleAddToCart = () => {
    setIsAdding(true);
    addItem(product);
    
    // Reset animation after a short delay
    setTimeout(() => {
      setIsAdding(false);
    }, 600);
  };

  return (
    <div>
      <div className="product-card h-100">
        {/* Product Image */}
        <div className="position-relative overflow-hidden">
          <Image
            src={image}
            alt={name}
            width={400}
            height={250}
            className="product-image"
            priority={false}
          />
          {/* Category Badge */}
          <div className="position-absolute top-0 end-0 m-3">
            <span className="badge bg-primary bg-opacity-75 rounded-pill px-3 py-2">
              {category}
            </span>
          </div>
          {/* Wishlist Button */}
          <div className="position-absolute top-0 start-0 m-3">
            <WishlistButton product={product} />
          </div>
        </div>

        {/* Product Info */}
        <div className="p-4">
          <h5 className="fw-bold mb-2 text-truncate" title={name}>
            {name}
          </h5>
          <p className="text-muted small mb-3 line-clamp-2" title={description}>
            {description}
          </p>
          
          {/* Price and Add to Cart */}
          <div className="d-flex justify-content-between align-items-center">
            <div className="price-section">
              <span className="h5 fw-bold text-primary mb-0">
                ${price}
              </span>
            </div>
            <button 
              className={`btn btn-sm rounded-pill px-3 ${isAdding ? 'btn-success' : 'btn-outline-primary'}`}
              onClick={handleAddToCart}
              disabled={isAdding}
              aria-label={`Add ${name} to cart`}
            >
              {isAdding ? (
                <>
                  <svg 
                    width="16" 
                    height="16" 
                    fill="currentColor" 
                    viewBox="0 0 16 16"
                    className="me-1"
                  >
                    <path d="M10.97 4.97a.75.75 0 0 1 1.07 1.05l-3.99 4.99a.75.75 0 0 1-1.08.02L4.324 8.384a.75.75 0 1 1 1.06-1.06l2.094 2.093 3.473-4.425a.267.267 0 0 1 .02-.022z"/>
                  </svg>
                  Added!
                </>
              ) : (
                <>
                  <svg 
                    width="16" 
                    height="16" 
                    fill="currentColor" 
                    viewBox="0 0 16 16"
                    className="me-1"
                  >
                    <path d="M0 1.5A.5.5 0 0 1 .5 1H2a.5.5 0 0 1 .485.379L2.89 3H14.5a.5.5 0 0 1 .491.592l-1.5 8A.5.5 0 0 1 13 12H4a.5.5 0 0 1-.491-.408L2.01 3.607 1.61 2H.5a.5.5 0 0 1-.5-.5zM3.102 4l1.313 7h8.17l1.313-7H3.102zM5 12a2 2 0 1 0 0 4 2 2 0 0 0 0-4zm7 0a2 2 0 1 0 0 4 2 2 0 0 0 0-4zm-7 1a1 1 0 1 1 0 2 1 1 0 0 1 0-2zm7 0a1 1 0 1 1 0 2 1 1 0 0 1 0-2z"/>
                  </svg>
                  Add
                </>
              )}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
