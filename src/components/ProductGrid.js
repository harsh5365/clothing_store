'use client';

import { useState, useEffect } from 'react';
import InteractiveProductCard from './InteractiveProductCard';

const ProductGrid = ({ products: productsProp }) => {
  const [products, setProducts] = useState(productsProp ?? null);
  const [loading, setLoading] = useState(!productsProp);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (productsProp != null) {
      setProducts(productsProp);
      setLoading(false);
      return;
    }
    fetch('/api/products')
      .then((res) => (res.ok ? res.json() : Promise.reject(new Error('Failed to load products'))))
      .then(setProducts)
      .catch(setError)
      .finally(() => setLoading(false));
  }, [productsProp]);

  const list = products ?? [];

  return (
    <section id="products" className="py-5">
      <div className="container">
        {/* Section Header */}
        <div className="row mb-5">
          <div className="col-12 text-center">
            <h2 className="display-5 fw-bold mb-3">
              Our <span className="text-primary">Collection</span>
            </h2>
            <p className="lead opacity-75">
              Discover our carefully curated selection of premium clothing and accessories
            </p>
          </div>
        </div>

        {/* Product Grid */}
        {loading ? (
          <div className="row">
            <div className="col-12 text-center py-5">
              <div className="spinner-border text-primary" role="status">
                <span className="visually-hidden">Loading...</span>
              </div>
              <p className="mt-2 text-muted">Loading products...</p>
            </div>
          </div>
        ) : error ? (
          <div className="row">
            <div className="col-12 text-center py-5">
              <p className="text-danger">{error.message}</p>
            </div>
          </div>
        ) : (
          <div className="row">
            {list.map((product) => (
              <InteractiveProductCard key={product.id} product={product} />
            ))}
          </div>
        )}

        {/* Load More Button */}
        {!loading && !error && list.length > 0 && (
          <div className="row mt-5">
            <div className="col-12 text-center">
              <button className="btn btn-outline-primary btn-lg px-5 py-3 rounded-pill fw-medium">
                Load More Products
              </button>
            </div>
          </div>
        )}
      </div>
    </section>
  );
};

export default ProductGrid;
