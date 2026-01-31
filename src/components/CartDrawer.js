'use client';

import { useCart } from '../context/CartContext';
import CartItem from './CartItem';
import Link from 'next/link';
import { useEffect } from 'react';

const CartDrawer = () => {
  const { items, totalPrice, isCartOpen, closeCart, itemCount } = useCart();

  // Close drawer on escape key
  useEffect(() => {
    const handleEscape = (e) => {
      if (e.key === 'Escape' && isCartOpen) {
        closeCart();
      }
    };

    document.addEventListener('keydown', handleEscape);
    return () => document.removeEventListener('keydown', handleEscape);
  }, [isCartOpen, closeCart]);

  // Prevent body scroll when drawer is open
  useEffect(() => {
    if (isCartOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [isCartOpen]);

  if (!isCartOpen) return null;

  return (
    <>
      {/* Backdrop */}
      <div
        className="position-fixed top-0 start-0 w-100 h-100 bg-dark bg-opacity-50"
        style={{ zIndex: 1040 }}
        onClick={closeCart}
        aria-hidden="true"
      />

      {/* Drawer */}
      <div
        className="position-fixed top-0 end-0 h-100 bg-body shadow-lg"
        style={{
          width: '100%',
          maxWidth: '400px',
          zIndex: 1050,
          overflowY: 'auto'
        }}
        role="dialog"
        aria-modal="true"
        aria-labelledby="cart-drawer-title"
      >
        {/* Header */}
        <div className="d-flex justify-content-between align-items-center p-3 border-bottom sticky-top bg-body">
          <h5 className="mb-0" id="cart-drawer-title">
            Shopping Cart ({itemCount})
          </h5>
          <button
            className="btn-close"
            onClick={closeCart}
            aria-label="Close cart"
          />
        </div>

        {/* Cart Items */}
        <div className="cart-items">
          {items.length === 0 ? (
            <div className="text-center py-5">
              <svg
                width="64"
                height="64"
                fill="currentColor"
                viewBox="0 0 16 16"
                className="text-muted mb-3"
              >
                <path d="M0 1.5A.5.5 0 0 1 .5 1H2a.5.5 0 0 1 .485.379L2.89 3H14.5a.5.5 0 0 1 .491.592l-1.5 8A.5.5 0 0 1 13 12H4a.5.5 0 0 1-.491-.408L2.01 3.607 1.61 2H.5a.5.5 0 0 1-.5-.5zM3.102 4l1.313 7h8.17l1.313-7H3.102zM5 12a2 2 0 1 0 0 4 2 2 0 0 0 0-4zm7 0a2 2 0 1 0 0 4 2 2 0 0 0 0-4zm-7 1a1 1 0 1 1 0 2 1 1 0 0 1 0-2zm7 0a1 1 0 1 1 0 2 1 1 0 0 1 0-2z"/>
              </svg>
              <p className="text-muted">Your cart is empty</p>
              <button
                className="btn btn-primary"
                onClick={closeCart}
              >
                Continue Shopping
              </button>
            </div>
          ) : (
            <>
              {items.map(item => (
                <CartItem key={item.id} item={item} />
              ))}
            </>
          )}
        </div>

        {/* Footer with Total and Checkout */}
        {items.length > 0 && (
          <div className="position-sticky bottom-0 bg-body border-top p-3">
            <div className="d-flex justify-content-between align-items-center mb-3">
              <span className="h5 mb-0">Total:</span>
              <span className="h4 mb-0 text-primary fw-bold">
                ${totalPrice.toFixed(2)}
              </span>
            </div>
            
            <div className="d-grid gap-2">
              <Link
                href="/cart"
                className="btn btn-outline-primary"
                onClick={closeCart}
              >
                View Cart
              </Link>
              <Link
                href="/checkout"
                className="btn btn-primary"
                onClick={closeCart}
              >
                Checkout
              </Link>
            </div>
          </div>
        )}
      </div>
    </>
  );
};

export default CartDrawer;
