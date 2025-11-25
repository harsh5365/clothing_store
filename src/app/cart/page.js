'use client';

import { useCart } from '../../context/CartContext';
import CartItem from '../../components/CartItem';
import Link from 'next/link';

export default function CartPage() {
  const { items, totalPrice, itemCount, clearCart } = useCart();

  return (
    <div className="container py-5" style={{ marginTop: '80px' }}>
      <div className="row">
        <div className="col-12">
          <h1 className="mb-4">Shopping Cart</h1>
        </div>
      </div>

      {items.length === 0 ? (
        <div className="row">
          <div className="col-12">
            <div className="text-center py-5">
              <svg
                width="120"
                height="120"
                fill="currentColor"
                viewBox="0 0 16 16"
                className="text-muted mb-4"
              >
                <path d="M0 1.5A.5.5 0 0 1 .5 1H2a.5.5 0 0 1 .485.379L2.89 3H14.5a.5.5 0 0 1 .491.592l-1.5 8A.5.5 0 0 1 13 12H4a.5.5 0 0 1-.491-.408L2.01 3.607 1.61 2H.5a.5.5 0 0 1-.5-.5zM3.102 4l1.313 7h8.17l1.313-7H3.102zM5 12a2 2 0 1 0 0 4 2 2 0 0 0 0-4zm7 0a2 2 0 1 0 0 4 2 2 0 0 0 0-4zm-7 1a1 1 0 1 1 0 2 1 1 0 0 1 0-2zm7 0a1 1 0 1 1 0 2 1 1 0 0 1 0-2z"/>
              </svg>
              <h3 className="mb-3">Your cart is empty</h3>
              <p className="text-muted mb-4">
                Looks like you haven&lsquo;t added any items to your cart yet.
              </p>
              <Link href="/" className="btn btn-primary btn-lg">
                Continue Shopping
              </Link>
            </div>
          </div>
        </div>
      ) : (
        <div className="row">
          {/* Cart Items */}
          <div className="col-lg-8">
            <div className="card shadow-sm mb-4">
              <div className="card-header d-flex justify-content-between align-items-center">
                <h5 className="mb-0">Cart Items ({itemCount})</h5>
                <button
                  className="btn btn-sm btn-outline-danger"
                  onClick={clearCart}
                  aria-label="Clear cart"
                >
                  Clear Cart
                </button>
              </div>
              <div className="card-body p-0">
                {items.map(item => (
                  <CartItem key={item.id} item={item} />
                ))}
              </div>
            </div>
          </div>

          {/* Cart Summary */}
          <div className="col-lg-4">
            <div className="card shadow-sm sticky-top" style={{ top: '100px' }}>
              <div className="card-header">
                <h5 className="mb-0">Order Summary</h5>
              </div>
              <div className="card-body">
                <div className="d-flex justify-content-between mb-2">
                  <span>Subtotal ({itemCount} items)</span>
                  <span>${totalPrice.toFixed(2)}</span>
                </div>
                <div className="d-flex justify-content-between mb-2">
                  <span>Shipping</span>
                  <span className="text-success">FREE</span>
                </div>
                <div className="d-flex justify-content-between mb-2">
                  <span>Tax</span>
                  <span>${(totalPrice * 0.1).toFixed(2)}</span>
                </div>
                <hr />
                <div className="d-flex justify-content-between mb-3">
                  <strong>Total</strong>
                  <strong className="text-primary h4 mb-0">
                    ${(totalPrice * 1.1).toFixed(2)}
                  </strong>
                </div>
                
                <div className="d-grid gap-2">
                  <Link
                    href="/checkout"
                    className="btn btn-primary btn-lg"
                  >
                    Proceed to Checkout
                  </Link>
                  <Link
                    href="/"
                    className="btn btn-outline-secondary"
                  >
                    Continue Shopping
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
