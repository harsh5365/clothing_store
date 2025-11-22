'use client';

import Image from 'next/image';
import { useCart } from '../context/CartContext';

const CartItem = ({ item }) => {
  const { updateQuantity, removeItem } = useCart();

  const handleIncrement = () => {
    updateQuantity(item.id, item.quantity + 1);
  };

  const handleDecrement = () => {
    if (item.quantity > 1) {
      updateQuantity(item.id, item.quantity - 1);
    } else {
      removeItem(item.id);
    }
  };

  const handleRemove = () => {
    removeItem(item.id);
  };

  const subtotal = (item.price * item.quantity).toFixed(2);

  return (
    <div className="cart-item d-flex gap-3 p-3 border-bottom">
      <div className="cart-item-image" style={{ width: '80px', height: '80px', flexShrink: 0 }}>
        <Image
          src={item.image}
          alt={item.name}
          width={80}
          height={80}
          className="rounded"
          style={{ objectFit: 'cover', width: '100%', height: '100%' }}
        />
      </div>
      
      <div className="flex-grow-1">
        <div className="d-flex justify-content-between align-items-start mb-2">
          <div>
            <h6 className="mb-1">{item.name}</h6>
            <small className="text-muted">{item.category}</small>
          </div>
          <button
            className="btn btn-sm btn-link text-danger p-0"
            onClick={handleRemove}
            aria-label={`Remove ${item.name} from cart`}
          >
            <svg width="16" height="16" fill="currentColor" viewBox="0 0 16 16">
              <path d="M5.5 5.5A.5.5 0 0 1 6 6v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5zm2.5 0a.5.5 0 0 1 .5.5v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5zm3 .5a.5.5 0 0 0-1 0v6a.5.5 0 0 0 1 0V6z"/>
              <path fillRule="evenodd" d="M14.5 3a1 1 0 0 1-1 1H13v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V4h-.5a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1H6a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1h3.5a1 1 0 0 1 1 1v1zM4.118 4 4 4.059V13a1 1 0 0 0 1 1h6a1 1 0 0 0 1-1V4.059L11.882 4H4.118zM2.5 3V2h11v1h-11z"/>
            </svg>
          </button>
        </div>
        
        <div className="d-flex justify-content-between align-items-center">
          <div className="btn-group btn-group-sm" role="group" aria-label="Quantity controls">
            <button
              className="btn btn-outline-secondary"
              onClick={handleDecrement}
              aria-label="Decrease quantity"
            >
              -
            </button>
            <button className="btn btn-outline-secondary" disabled>
              {item.quantity}
            </button>
            <button
              className="btn btn-outline-secondary"
              onClick={handleIncrement}
              aria-label="Increase quantity"
              disabled={item.quantity >= 99}
            >
              +
            </button>
          </div>
          
          <div className="text-end">
            <div className="fw-bold text-primary">${subtotal}</div>
            <small className="text-muted">${item.price.toFixed(2)} each</small>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CartItem;
