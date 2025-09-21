'use client';

import InteractiveProductCard from './InteractiveProductCard';
import { products } from '../data/products';

const ProductGrid = () => {
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
        <div className="row">
          {products.map((product) => (
            <InteractiveProductCard key={product.id} product={product} />
          ))}
        </div>

        {/* Load More Button */}
        <div className="row mt-5">
          <div className="col-12 text-center">
            <button className="btn btn-outline-primary btn-lg px-5 py-3 rounded-pill fw-medium">
              Load More Products
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ProductGrid;
