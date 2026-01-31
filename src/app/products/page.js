'use client';

import { useState, useEffect } from 'react';
import { useProductSearch } from '../../hooks/useProductSearch';
import SearchBar from '../../components/SearchBar';
import FilterPanel from '../../components/FilterPanel';
import FilterTags from '../../components/FilterTags';
import ProductGrid from '../../components/ProductGrid';

export default function ProductsPage() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetch('/api/products')
      .then((res) => (res.ok ? res.json() : Promise.reject(new Error('Failed to load products'))))
      .then(setProducts)
      .catch(setError)
      .finally(() => setLoading(false));
  }, []);

  const {
    filteredProducts,
    resultCount,
    filters,
    setSearchQuery,
    toggleCategory,
    setPriceRange,
    clearFilters,
    activeFilters,
    hasActiveFilters
  } = useProductSearch(products);

  if (loading) {
    return (
      <div className="container py-5" style={{ marginTop: '80px' }}>
        <div className="text-center py-5">
          <div className="spinner-border text-primary" role="status">
            <span className="visually-hidden">Loading...</span>
          </div>
          <p className="mt-2 text-muted">Loading products...</p>
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

  return (
    <div className="container py-5" style={{ marginTop: '80px' }}>
      {/* Page Header */}
      <div className="row mb-4">
        <div className="col-12">
          <h1 className="mb-3">Products</h1>
          <SearchBar
            value={filters.query}
            onChange={setSearchQuery}
            placeholder="Search products by name or description..."
          />
        </div>
      </div>

      {/* Active Filters */}
      {hasActiveFilters && (
        <div className="row mb-3">
          <div className="col-12">
            <FilterTags
              activeFilters={activeFilters}
              onClearAll={clearFilters}
            />
          </div>
        </div>
      )}

      <div className="row">
        {/* Filter Sidebar */}
        <div className="col-lg-3 mb-4">
          <FilterPanel
            allProducts={products}
            selectedCategories={filters.categories}
            onToggleCategory={toggleCategory}
            priceRange={filters.priceRange}
            onPriceRangeChange={setPriceRange}
            filteredProducts={filteredProducts}
          />
        </div>

        {/* Products Grid */}
        <div className="col-lg-9">
          {/* Result Count */}
          <div className="d-flex justify-content-between align-items-center mb-3">
            <h5 className="mb-0">
              {resultCount} {resultCount === 1 ? 'Product' : 'Products'} Found
            </h5>
            {hasActiveFilters && (
              <button
                className="btn btn-outline-secondary btn-sm"
                onClick={clearFilters}
              >
                Clear All Filters
              </button>
            )}
          </div>

          {/* Products or No Results */}
          {resultCount === 0 ? (
            <div className="text-center py-5">
              <svg
                width="120"
                height="120"
                fill="currentColor"
                viewBox="0 0 16 16"
                className="text-muted mb-4"
              >
                <path d="M11.742 10.344a6.5 6.5 0 1 0-1.397 1.398h-.001c.03.04.062.078.098.115l3.85 3.85a1 1 0 0 0 1.415-1.414l-3.85-3.85a1.007 1.007 0 0 0-.115-.1zM12 6.5a5.5 5.5 0 1 1-11 0 5.5 5.5 0 0 1 11 0z"/>
              </svg>
              <h3 className="mb-3">No products found</h3>
              <p className="text-muted mb-4">
                Try adjusting your filters or search query to find what you&lsquo;re looking for.
              </p>
              <button
                className="btn btn-primary"
                onClick={clearFilters}
              >
                Clear All Filters
              </button>
            </div>
          ) : (
            <ProductGrid products={filteredProducts} />
          )}
        </div>
      </div>
    </div>
  );
}
