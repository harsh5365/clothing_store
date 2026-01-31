'use client';

import { useState, useEffect, useCallback } from 'react';
import { useParams } from 'next/navigation';
import Image from 'next/image';
import Link from 'next/link';
import { useCart } from '../../../context/CartContext';
import { useWishlist } from '../../../context/WishlistContext';
import WishlistButton from '../../../components/WishlistButton';
import ReviewForm from '../../../components/ReviewForm';
import ReviewList from '../../../components/ReviewList';
import { getProductReviews, calculateAverageRating, getReviewCount } from '../../../lib/reviewUtils';

export default function ProductDetailPage() {
  const params = useParams();
  const productId = params.id;
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetch(`/api/products?id=${encodeURIComponent(productId)}`)
      .then((res) => {
        if (!res.ok) {
          if (res.status === 404) return null;
          throw new Error('Failed to load product');
        }
        return res.json();
      })
      .then(setProduct)
      .catch(setError)
      .finally(() => setLoading(false));
  }, [productId]);

  const { addItem } = useCart();
  const { isInWishlist } = useWishlist();
  const [isAdding, setIsAdding] = useState(false);
  const [reviews, setReviews] = useState([]);
  const [averageRating, setAverageRating] = useState(0);
  const [reviewCount, setReviewCount] = useState(0);

  const loadReviews = useCallback(() => {
    const id = product?.id ?? parseInt(productId, 10);
    if (!id) return;
    setReviews(getProductReviews(id));
    setAverageRating(calculateAverageRating(id));
    setReviewCount(getReviewCount(id));
  }, [productId, product?.id]);

  useEffect(() => {
    if (product) {
      loadReviews();
    }
  }, [product, loadReviews]);

  const handleAddToCart = () => {
    if (!product) return;
    setIsAdding(true);
    addItem(product);
    setTimeout(() => setIsAdding(false), 600);
  };

  const handleReviewAdded = () => {
    loadReviews();
  };

  if (loading) {
    return (
      <div className="container py-5" style={{ marginTop: '80px' }}>
        <div className="text-center py-5">
          <div className="spinner-border text-primary" role="status">
            <span className="visually-hidden">Loading...</span>
          </div>
          <p className="mt-2 text-muted">Loading product...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="container py-5" style={{ marginTop: '80px' }}>
        <div className="text-center py-5">
          <p className="text-danger">{error.message}</p>
        </div>
      </div>
    );
  }

  if (!product) {
    return (
      <div className="container py-5" style={{ marginTop: '80px' }}>
        <div className="text-center">
          <h2>Product Not Found</h2>
          <Link href="/products" className="btn btn-primary mt-3">
            Browse Products
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="container py-5" style={{ marginTop: '80px' }}>
      {/* Breadcrumb */}
      <nav aria-label="breadcrumb" className="mb-4">
        <ol className="breadcrumb">
          <li className="breadcrumb-item"><Link href="/">Home</Link></li>
          <li className="breadcrumb-item"><Link href="/products">Products</Link></li>
          <li className="breadcrumb-item active">{product.name}</li>
        </ol>
      </nav>

      {/* Product Details */}
      <div className="row mb-5">
        <div className="col-md-6 mb-4">
          <div className="position-relative">
            <Image
              src={product.image}
              alt={product.name}
              width={600}
              height={600}
              className="rounded"
              style={{ width: '100%', height: 'auto', objectFit: 'cover' }}
            />
          </div>
        </div>
        
        <div className="col-md-6">
          <div className="d-flex justify-content-between align-items-start mb-3">
            <div>
              <span className="badge bg-primary mb-2">{product.category}</span>
              <h1 className="mb-2">{product.name}</h1>
            </div>
            <WishlistButton product={product} />
          </div>
          
          {reviewCount > 0 && (
            <div className="mb-3">
              <div className="d-flex align-items-center gap-2">
                <span className="h5 mb-0">{averageRating.toFixed(1)}</span>
                <span className="text-warning">★★★★★</span>
                <span className="text-muted">({reviewCount} reviews)</span>
              </div>
            </div>
          )}
          
          <h2 className="text-primary mb-4">${product.price.toFixed(2)}</h2>
          
          <p className="lead mb-4">{product.description}</p>
          
          <div className="d-grid gap-2">
            <button
              className={`btn btn-lg ${isAdding ? 'btn-success' : 'btn-primary'}`}
              onClick={handleAddToCart}
              disabled={isAdding}
            >
              {isAdding ? '✓ Added to Cart!' : 'Add to Cart'}
            </button>
            <Link href="/cart" className="btn btn-outline-secondary btn-lg">
              View Cart
            </Link>
          </div>
        </div>
      </div>

      {/* Reviews Section */}
      <div className="row">
        <div className="col-12">
          <h3 className="mb-4">Customer Reviews</h3>
        </div>
        
        <div className="col-lg-8 mb-4">
          <ReviewList
            reviews={reviews}
            averageRating={averageRating}
            totalCount={reviewCount}
          />
        </div>
        
        <div className="col-lg-4">
          <ReviewForm
            productId={product.id}
            onReviewAdded={handleReviewAdded}
          />
        </div>
      </div>
    </div>
  );
}
