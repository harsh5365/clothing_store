'use client';

import { useState, useEffect } from 'react';
import { useParams } from 'next/navigation';
import Link from 'next/link';
import Image from 'next/image';
import { getOrder } from '../../../lib/orderUtils';

export default function OrderDetailPage() {
  const params = useParams();
  const [order, setOrder] = useState(null);

  useEffect(() => {
    const orderData = getOrder(params.id);
    setOrder(orderData);
  }, [params.id]);

  if (!order) {
    return (
      <div className="container py-5" style={{ marginTop: '80px' }}>
        <div className="text-center">
          <h2>Order Not Found</h2>
          <Link href="/orders" className="btn btn-primary mt-3">
            View All Orders
          </Link>
        </div>
      </div>
    );
  }

  const formatDate = (timestamp) => {
    return new Date(timestamp).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  return (
    <div className="container py-5" style={{ marginTop: '80px' }}>
      <nav aria-label="breadcrumb" className="mb-4">
        <ol className="breadcrumb">
          <li className="breadcrumb-item"><Link href="/">Home</Link></li>
          <li className="breadcrumb-item"><Link href="/orders">Orders</Link></li>
          <li className="breadcrumb-item active">Order #{order.orderNumber}</li>
        </ol>
      </nav>

      <div className="row">
        <div className="col-lg-8">
          <div className="card mb-4">
            <div className="card-header">
              <h5 className="mb-0">Order Items</h5>
            </div>
            <div className="card-body">
              {order.items?.map((item, index) => (
                <div key={index} className="d-flex align-items-center mb-3 pb-3 border-bottom">
                  <Image
                    src={item.image}
                    alt={item.name}
                    width={80}
                    height={80}
                    className="rounded me-3"
                  />
                  <div className="flex-grow-1">
                    <h6 className="mb-1">{item.name}</h6>
                    <p className="text-muted small mb-0">Quantity: {item.quantity}</p>
                  </div>
                  <div className="text-end">
                    <p className="mb-0 fw-bold">${(item.price * item.quantity).toFixed(2)}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="col-lg-4">
          <div className="card mb-4">
            <div className="card-header">
              <h5 className="mb-0">Order Summary</h5>
            </div>
            <div className="card-body">
              <div className="d-flex justify-content-between mb-2">
                <span>Order Number:</span>
                <strong>{order.orderNumber}</strong>
              </div>
              <div className="d-flex justify-content-between mb-2">
                <span>Order Date:</span>
                <span>{formatDate(order.orderDate)}</span>
              </div>
              <div className="d-flex justify-content-between mb-2">
                <span>Status:</span>
                <span className="badge bg-primary">{order.status}</span>
              </div>
              <hr />
              <div className="d-flex justify-content-between mb-2">
                <span>Subtotal:</span>
                <span>${order.subtotal?.toFixed(2) || '0.00'}</span>
              </div>
              <div className="d-flex justify-content-between mb-2">
                <span>Shipping:</span>
                <span>${order.shipping?.toFixed(2) || '0.00'}</span>
              </div>
              <div className="d-flex justify-content-between mb-2">
                <span>Tax:</span>
                <span>${order.tax?.toFixed(2) || '0.00'}</span>
              </div>
              <hr />
              <div className="d-flex justify-content-between">
                <strong>Total:</strong>
                <strong className="text-primary">${order.total?.toFixed(2) || '0.00'}</strong>
              </div>
            </div>
          </div>

          {order.shippingAddress && (
            <div className="card">
              <div className="card-header">
                <h5 className="mb-0">Shipping Address</h5>
              </div>
              <div className="card-body">
                <p className="mb-1">{order.shippingAddress.name}</p>
                <p className="mb-1">{order.shippingAddress.address}</p>
                <p className="mb-0">
                  {order.shippingAddress.city}, {order.shippingAddress.state} {order.shippingAddress.zip}
                </p>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
