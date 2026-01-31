'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useSession } from 'next-auth/react';
import { useCart } from '../../context/CartContext';
import Image from 'next/image';
import Link from 'next/link';

export default function CheckoutPage() {
  const router = useRouter();
  const { data: session, status } = useSession();
  const { items, totalPrice, clearCart } = useCart();
  
  const [currentStep, setCurrentStep] = useState(1);
  const [isProcessing, setIsProcessing] = useState(false);
  
  // Shipping Information
  const [shippingInfo, setShippingInfo] = useState({
    name: session?.user?.name || '',
    address: '',
    city: '',
    state: '',
    zip: '',
    phone: ''
  });
  
  const [shippingErrors, setShippingErrors] = useState({});
  
  // Payment: Razorpay
  const [paymentMethod] = useState('razorpay');

  // Redirect if not authenticated
  if (status === 'unauthenticated') {
    router.push('/login?callbackUrl=/checkout');
    return null;
  }

  // Redirect if cart is empty
  if (items.length === 0) {
    return (
      <div className="container py-5" style={{ marginTop: '80px' }}>
        <div className="text-center">
          <h2>Your cart is empty</h2>
          <p className="text-muted mb-4">Add some items to your cart before checking out.</p>
          <Link href="/products" className="btn btn-primary">
            Browse Products
          </Link>
        </div>
      </div>
    );
  }

  const subtotal = totalPrice;
  const shipping = 0; // Free shipping
  const tax = subtotal * 0.1; // 10% tax
  const total = subtotal + shipping + tax;

  const validateShipping = () => {
    const errors = {};
    
    if (!shippingInfo.name.trim()) errors.name = 'Name is required';
    if (!shippingInfo.address.trim()) errors.address = 'Address is required';
    if (!shippingInfo.city.trim()) errors.city = 'City is required';
    if (!shippingInfo.state.trim()) errors.state = 'State is required';
    if (!shippingInfo.zip.trim()) errors.zip = 'ZIP code is required';
    if (!shippingInfo.phone.trim()) errors.phone = 'Phone is required';
    
    setShippingErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleShippingSubmit = (e) => {
    e.preventDefault();
    if (validateShipping()) {
      setCurrentStep(2);
    }
  };

  const loadRazorpayScript = () => {
    return new Promise((resolve) => {
      if (typeof window !== 'undefined' && window.Razorpay) {
        resolve();
        return;
      }
      const script = document.createElement('script');
      script.src = 'https://checkout.razorpay.com/v1/checkout.js';
      script.async = true;
      script.onload = () => resolve();
      script.onerror = () => resolve();
      document.body.appendChild(script);
    });
  };

  const handlePayWithRazorpay = async () => {
    setIsProcessing(true);
    try {
      const orderData = {
        userId: session.user.id,
        items: items.map(item => ({
          productId: item.id,
          name: item.name,
          price: item.price,
          quantity: item.quantity,
          image: item.image,
          category: item.category
        })),
        subtotal,
        shipping,
        tax,
        total,
        shippingName: shippingInfo.name,
        shippingAddress: shippingInfo.address,
        shippingCity: shippingInfo.city,
        shippingState: shippingInfo.state,
        shippingZip: shippingInfo.zip,
        shippingPhone: shippingInfo.phone,
        paymentMethod
      };

      const orderRes = await fetch('/api/orders', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(orderData)
      });
      if (!orderRes.ok) {
        const err = await orderRes.json().catch(() => ({}));
        throw new Error(err.error || 'Failed to create order');
      }
      const order = await orderRes.json();

      const razorpayRes = await fetch('/api/razorpay/create-order', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ orderId: order.id })
      });
      if (!razorpayRes.ok) {
        const err = await razorpayRes.json().catch(() => ({}));
        throw new Error(err.error || 'Failed to init payment');
      }
      const { razorpayOrderId, amount, currency, keyId } = await razorpayRes.json();

      await loadRazorpayScript();
      if (typeof window.Razorpay === 'undefined') {
        throw new Error('Payment gateway could not be loaded.');
      }

      const options = {
        key: keyId,
        amount,
        currency,
        order_id: razorpayOrderId,
        name: 'FashionFox',
        description: `Order #${order.orderNumber}`,
        prefill: {
          name: shippingInfo.name,
          email: session?.user?.email || '',
          contact: shippingInfo.phone || ''
        },
        handler: async (response) => {
          try {
            const verifyRes = await fetch('/api/orders/verify-payment', {
              method: 'POST',
              headers: { 'Content-Type': 'application/json' },
              body: JSON.stringify({
                orderId: order.id,
                razorpayPaymentId: response.razorpay_payment_id,
                razorpayOrderId: response.razorpay_order_id,
                razorpaySignature: response.razorpay_signature
              })
            });
            if (verifyRes.ok) {
              clearCart();
              router.push(`/orders/${order.id}?success=true`);
            } else {
              const err = await verifyRes.json().catch(() => ({}));
              alert(err.error || 'Payment verification failed.');
            }
          } catch (e) {
            console.error(e);
            alert('Payment verification failed.');
          } finally {
            setIsProcessing(false);
          }
        },
        modal: {
          ondismiss: () => setIsProcessing(false)
        }
      };

      const rzp = new window.Razorpay(options);
      rzp.open();
    } catch (error) {
      console.error('Checkout error:', error);
      alert(error?.message || 'Something went wrong. Please try again.');
      setIsProcessing(false);
    }
  };

  return (
    <div className="container py-5" style={{ marginTop: '80px' }}>
      <h1 className="mb-4">Checkout</h1>

      {/* Progress Steps */}
      <div className="row mb-4">
        <div className="col-12">
          <div className="d-flex justify-content-between">
            <div className={`text-center flex-fill ${currentStep >= 1 ? 'text-primary' : 'text-muted'}`}>
              <div className={`rounded-circle d-inline-flex align-items-center justify-content-center mb-2 ${currentStep >= 1 ? 'bg-primary text-white' : 'bg-light'}`} style={{ width: '40px', height: '40px' }}>
                1
              </div>
              <div className="small">Shipping</div>
            </div>
            <div className={`text-center flex-fill ${currentStep >= 2 ? 'text-primary' : 'text-muted'}`}>
              <div className={`rounded-circle d-inline-flex align-items-center justify-content-center mb-2 ${currentStep >= 2 ? 'bg-primary text-white' : 'bg-light'}`} style={{ width: '40px', height: '40px' }}>
                2
              </div>
              <div className="small">Review</div>
            </div>
          </div>
        </div>
      </div>

      <div className="row">
        <div className="col-lg-8">
          {/* Step 1: Shipping Information */}
          {currentStep === 1 && (
            <div className="card mb-4">
              <div className="card-header">
                <h5 className="mb-0">Shipping Information</h5>
              </div>
              <div className="card-body">
                <form onSubmit={handleShippingSubmit}>
                  <div className="mb-3">
                    <label className="form-label">Full Name *</label>
                    <input
                      type="text"
                      className={`form-control ${shippingErrors.name ? 'is-invalid' : ''}`}
                      value={shippingInfo.name}
                      onChange={(e) => setShippingInfo({...shippingInfo, name: e.target.value})}
                    />
                    {shippingErrors.name && <div className="invalid-feedback">{shippingErrors.name}</div>}
                  </div>
                  
                  <div className="mb-3">
                    <label className="form-label">Address *</label>
                    <input
                      type="text"
                      className={`form-control ${shippingErrors.address ? 'is-invalid' : ''}`}
                      value={shippingInfo.address}
                      onChange={(e) => setShippingInfo({...shippingInfo, address: e.target.value})}
                    />
                    {shippingErrors.address && <div className="invalid-feedback">{shippingErrors.address}</div>}
                  </div>
                  
                  <div className="row">
                    <div className="col-md-6 mb-3">
                      <label className="form-label">City *</label>
                      <input
                        type="text"
                        className={`form-control ${shippingErrors.city ? 'is-invalid' : ''}`}
                        value={shippingInfo.city}
                        onChange={(e) => setShippingInfo({...shippingInfo, city: e.target.value})}
                      />
                      {shippingErrors.city && <div className="invalid-feedback">{shippingErrors.city}</div>}
                    </div>
                    
                    <div className="col-md-3 mb-3">
                      <label className="form-label">State *</label>
                      <input
                        type="text"
                        className={`form-control ${shippingErrors.state ? 'is-invalid' : ''}`}
                        value={shippingInfo.state}
                        onChange={(e) => setShippingInfo({...shippingInfo, state: e.target.value})}
                      />
                      {shippingErrors.state && <div className="invalid-feedback">{shippingErrors.state}</div>}
                    </div>
                    
                    <div className="col-md-3 mb-3">
                      <label className="form-label">ZIP *</label>
                      <input
                        type="text"
                        className={`form-control ${shippingErrors.zip ? 'is-invalid' : ''}`}
                        value={shippingInfo.zip}
                        onChange={(e) => setShippingInfo({...shippingInfo, zip: e.target.value})}
                      />
                      {shippingErrors.zip && <div className="invalid-feedback">{shippingErrors.zip}</div>}
                    </div>
                  </div>
                  
                  <div className="mb-3">
                    <label className="form-label">Phone *</label>
                    <input
                      type="tel"
                      className={`form-control ${shippingErrors.phone ? 'is-invalid' : ''}`}
                      value={shippingInfo.phone}
                      onChange={(e) => setShippingInfo({...shippingInfo, phone: e.target.value})}
                    />
                    {shippingErrors.phone && <div className="invalid-feedback">{shippingErrors.phone}</div>}
                  </div>
                  
                  <button type="submit" className="btn btn-primary">
                    Continue to Review
                  </button>
                </form>
              </div>
            </div>
          )}

          {/* Step 2: Review Order */}
          {currentStep === 2 && (
            <>
              <div className="card mb-4">
                <div className="card-header d-flex justify-content-between align-items-center">
                  <h5 className="mb-0">Shipping Information</h5>
                  <button className="btn btn-sm btn-outline-primary" onClick={() => setCurrentStep(1)}>
                    Edit
                  </button>
                </div>
                <div className="card-body">
                  <p className="mb-1"><strong>{shippingInfo.name}</strong></p>
                  <p className="mb-1">{shippingInfo.address}</p>
                  <p className="mb-1">{shippingInfo.city}, {shippingInfo.state} {shippingInfo.zip}</p>
                  <p className="mb-0">{shippingInfo.phone}</p>
                </div>
              </div>

              <div className="card mb-4">
                <div className="card-header">
                  <h5 className="mb-0">Payment Method</h5>
                </div>
                <div className="card-body">
                  <p className="mb-0">Pay securely with Razorpay (cards, UPI, net banking, wallets).</p>
                </div>
              </div>

              <div className="card mb-4">
                <div className="card-header">
                  <h5 className="mb-0">Order Items</h5>
                </div>
                <div className="card-body">
                  {items.map(item => (
                    <div key={item.id} className="d-flex align-items-center mb-3 pb-3 border-bottom">
                      <Image
                        src={item.image}
                        alt={item.name}
                        width={60}
                        height={60}
                        className="rounded me-3"
                      />
                      <div className="flex-grow-1">
                        <h6 className="mb-0">{item.name}</h6>
                        <small className="text-muted">Qty: {item.quantity}</small>
                      </div>
                      <div className="text-end">
                        <strong>${(item.price * item.quantity).toFixed(2)}</strong>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <button
                className="btn btn-primary btn-lg w-100"
                onClick={handlePayWithRazorpay}
                disabled={isProcessing}
              >
                {isProcessing ? 'Opening payment...' : `Pay $${total.toFixed(2)} with Razorpay`}
              </button>
            </>
          )}
        </div>

        {/* Order Summary Sidebar */}
        <div className="col-lg-4">
          <div className="card sticky-top" style={{ top: '100px' }}>
            <div className="card-header">
              <h5 className="mb-0">Order Summary</h5>
            </div>
            <div className="card-body">
              <div className="d-flex justify-content-between mb-2">
                <span>Subtotal</span>
                <span>${subtotal.toFixed(2)}</span>
              </div>
              <div className="d-flex justify-content-between mb-2">
                <span>Shipping</span>
                <span className="text-success">FREE</span>
              </div>
              <div className="d-flex justify-content-between mb-2">
                <span>Tax</span>
                <span>${tax.toFixed(2)}</span>
              </div>
              <hr />
              <div className="d-flex justify-content-between">
                <strong>Total</strong>
                <strong className="text-primary h4 mb-0">${total.toFixed(2)}</strong>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
