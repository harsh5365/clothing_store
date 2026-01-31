'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { loadOrders, sortOrdersByDate } from '../../lib/orderUtils';

export default function OrdersPage() {
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    fetchOrders();
  }, []);

  const fetchOrders = async () => {
    try {
      const response = await fetch('/api/orders');
      if (response.ok) {
        const data = await response.json();
        setOrders(data);
      }
    } catch (error) {
      console.error('Failed to fetch orders:', error);
      // Fallback to localStorage
      const allOrders = loadOrders();
      setOrders(sortOrdersByDate(allOrders));
    }
  };

  const getStatusBadge = (status) => {
    const badges = {
      pending: 'bg-warning',
      processing: 'bg-info',
      shipped: 'bg-primary',
      delivered: 'bg-success'
    };
    return badges[status] || 'bg-secondary';
  };

  const formatDate = (timestamp) => {
    return new Date(timestamp).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  return (
    <div className="container py-5" style={{ marginTop: '80px' }}>
      <h1 className="mb-4">My Orders</h1>

      {orders.length === 0 ? (
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
          <h3 className="mb-3">No orders yet</h3>
          <p className="text-muted mb-4">
            Start shopping to see your orders here.
          </p>
          <Link href="/products" className="btn btn-primary btn-lg">
            Browse Products
          </Link>
        </div>
      ) : (
        <div className="row">
          {orders.map(order => (
            <div key={order.id} className="col-12 mb-3">
              <div className="card">
                <div className="card-body">
                  <div className="row align-items-center">
                    <div className="col-md-3">
                      <h6 className="mb-1">Order #{order.orderNumber}</h6>
                      <small className="text-muted">{formatDate(order.orderDate)}</small>
                    </div>
                    <div className="col-md-3">
                      <small className="text-muted d-block">Items</small>
                      <span>{order.items?.length || 0} items</span>
                    </div>
                    <div className="col-md-2">
                      <small className="text-muted d-block">Total</small>
                      <span className="fw-bold">${order.total?.toFixed(2) || '0.00'}</span>
                    </div>
                    <div className="col-md-2">
                      <span className={`badge ${getStatusBadge(order.status)}`}>
                        {order.status}
                      </span>
                    </div>
                    <div className="col-md-2 text-end">
                      <Link
                        href={`/orders/${order.id}`}
                        className="btn btn-sm btn-outline-primary"
                      >
                        View Details
                      </Link>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
