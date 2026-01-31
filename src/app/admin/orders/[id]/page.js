'use client';

import { useState, useEffect } from 'react';
import { useParams, useRouter } from 'next/navigation';
import Link from 'next/link';
import Image from 'next/image';
import { useSession } from 'next-auth/react';

export default function AdminOrderDetailPage() {
  const params = useParams();
  const router = useRouter();
  const { data: session, status } = useSession();
  const [order, setOrder] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [statusUpdating, setStatusUpdating] = useState(false);

  useEffect(() => {
    if (status === 'unauthenticated' || (status === 'authenticated' && session?.user?.role !== 'ADMIN')) {
      router.push('/login');
      return;
    }
    if (status !== 'authenticated' || !params.id) {
      if (status === 'authenticated' && !params.id) setLoading(false);
      return;
    }
    setLoading(true);
    setError(null);
    fetch(`/api/admin/orders?id=${encodeURIComponent(params.id)}`)
      .then((res) => {
        if (!res.ok) {
          if (res.status === 404) return null;
          throw new Error('Failed to load order');
        }
        return res.json();
      })
      .then((data) => {
        setOrder(data);
      })
      .catch((err) => setError(err.message))
      .finally(() => setLoading(false));
  }, [params.id, session?.user?.role, status, router]);

  const formatDate = (timestamp) => {
    if (!timestamp) return '—';
    return new Date(timestamp).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    });
  };

  if (status === 'loading' || loading) {
    return (
      <div className="container py-5" style={{ marginTop: '80px' }}>
        <div className="text-center py-5">
          <div className="spinner-border text-primary" role="status">
            <span className="visually-hidden">Loading...</span>
          </div>
          <p className="mt-2 text-muted">Loading order...</p>
        </div>
      </div>
    );
  }

  if (session?.user?.role !== 'ADMIN') {
    return null;
  }

  if (error || !order) {
    return (
      <div className="container py-5" style={{ marginTop: '80px' }}>
        <div className="text-center">
          <h2>Order Not Found</h2>
          {error && <p className="text-muted">{error}</p>}
          <Link href="/admin/dashboard" className="btn btn-primary mt-3">
            Back to Dashboard
          </Link>
        </div>
      </div>
    );
  }

  const hasShipping = order.shippingName || order.shippingAddress;

  return (
    <div className="container py-5" style={{ marginTop: '80px' }}>
      <nav aria-label="breadcrumb" className="mb-4">
        <ol className="breadcrumb">
          <li className="breadcrumb-item"><Link href="/admin/dashboard">Dashboard</Link></li>
          <li className="breadcrumb-item"><Link href="/admin/dashboard">Orders</Link></li>
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
              {order.items?.length ? (
                order.items.map((item) => (
                  <div key={item.id} className="d-flex align-items-center mb-3 pb-3 border-bottom">
                    {item.image ? (
                      <Image
                        src={item.image}
                        alt={item.name}
                        width={80}
                        height={80}
                        className="rounded me-3"
                        unoptimized={item.image?.startsWith('http')}
                      />
                    ) : (
                      <div className="rounded me-3 bg-light d-flex align-items-center justify-content-center text-muted" style={{ width: 80, height: 80 }}>
                        No image
                      </div>
                    )}
                    <div className="flex-grow-1">
                      <h6 className="mb-1">{item.name}</h6>
                      <p className="text-muted small mb-0">Quantity: {item.quantity}</p>
                    </div>
                    <div className="text-end">
                      <p className="mb-0 fw-bold">${(item.price * item.quantity).toFixed(2)}</p>
                    </div>
                  </div>
                ))
              ) : (
                <p className="text-muted mb-0">No items in this order.</p>
              )}
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
                <span>Customer:</span>
                <span>{order.user?.name || order.user?.email || order.userId || '—'}</span>
              </div>
              <div className="d-flex justify-content-between mb-2">
                <span>Order Date:</span>
                <span>{formatDate(order.createdAt)}</span>
              </div>
              <div className="d-flex justify-content-between align-items-center mb-2">
                <span>Status:</span>
                <select
                  className="form-select form-select-sm"
                  style={{ width: 'auto', minWidth: '120px' }}
                  value={order.status ?? ''}
                  disabled={statusUpdating}
                  onChange={(e) => {
                    const newStatus = e.target.value;
                    if (!newStatus) return;
                    if (!confirm(`Change order status to ${newStatus}?`)) {
                      e.target.value = order.status ?? '';
                      return;
                    }
                    setStatusUpdating(true);
                    fetch('/api/admin/orders', {
                      method: 'PATCH',
                      headers: { 'Content-Type': 'application/json' },
                      body: JSON.stringify({ id: order.id, status: newStatus }),
                    })
                      .then((res) => (res.ok ? res.json() : Promise.reject(new Error('Update failed'))))
                      .then((updated) => {
                        setOrder(updated);
                      })
                      .catch((err) => {
                        alert(err?.message || 'Failed to update status');
                        e.target.value = order.status ?? '';
                      })
                      .finally(() => setStatusUpdating(false));
                  }}
                >
                  <option value="PENDING">PENDING</option>
                  <option value="PROCESSING">PROCESSING</option>
                  <option value="SHIPPED">SHIPPED</option>
                  <option value="DELIVERED">DELIVERED</option>
                  <option value="CANCELLED">CANCELLED</option>
                </select>
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

          {(order.paymentStatus || order.razorpayOrderId || order.razorpayPaymentId) && (
            <div className="card mb-4">
              <div className="card-header">
                <h5 className="mb-0">Payment & Purchase</h5>
              </div>
              <div className="card-body">
                <div className="d-flex justify-content-between mb-2">
                  <span>Payment method:</span>
                  <span>{order.paymentMethod === 'razorpay' ? 'Razorpay' : order.paymentMethod || '—'}</span>
                </div>
                {order.paymentStatus && (
                  <div className="d-flex justify-content-between mb-2">
                    <span>Payment status:</span>
                    <span className={`badge ${order.paymentStatus === 'captured' ? 'bg-success' : order.paymentStatus === 'signature_failed' ? 'bg-danger' : 'bg-secondary'}`}>
                      {order.paymentStatus}
                    </span>
                  </div>
                )}
                {order.razorpayOrderId && (
                  <div className="mb-2">
                    <small className="text-muted d-block">Razorpay Order ID</small>
                    <span className="small font-monospace">{order.razorpayOrderId}</span>
                  </div>
                )}
                {order.razorpayPaymentId && (
                  <div>
                    <small className="text-muted d-block">Razorpay Payment ID</small>
                    <span className="small font-monospace">{order.razorpayPaymentId}</span>
                  </div>
                )}
              </div>
            </div>
          )}

          {hasShipping && (
            <div className="card">
              <div className="card-header">
                <h5 className="mb-0">Shipping Address</h5>
              </div>
              <div className="card-body">
                {order.shippingName && <p className="mb-1">{order.shippingName}</p>}
                {order.shippingAddress && <p className="mb-1">{order.shippingAddress}</p>}
                {(order.shippingCity || order.shippingState || order.shippingZip) && (
                  <p className="mb-1">
                    {[order.shippingCity, order.shippingState, order.shippingZip].filter(Boolean).join(', ')}
                  </p>
                )}
                {order.shippingPhone && <p className="mb-0">{order.shippingPhone}</p>}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
