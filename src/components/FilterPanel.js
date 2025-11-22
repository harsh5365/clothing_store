'use client';

import { useMemo } from 'react';
import { getUniqueCategories, getPriceRange } from '../lib/searchUtils';

/**
 * FilterPanel component for category and price filtering
 * @param {Object} props
 * @param {Object[]} props.allProducts - All products for calculating categories and price range
 * @param {string[]} props.selectedCategories - Currently selected categories
 * @param {Function} props.onToggleCategory - Callback when category is toggled
 * @param {Object} props.priceRange - Current price range filter {min, max}
 * @param {Function} props.onPriceRangeChange - Callback when price range changes
 * @param {Object[]} props.filteredProducts - Filtered products for count display
 */
const FilterPanel = ({
  allProducts = [],
  selectedCategories = [],
  onToggleCategory,
  priceRange = { min: null, max: null },
  onPriceRangeChange,
  filteredProducts = []
}) => {
  // Get unique categories from all products
  const categories = useMemo(() => getUniqueCategories(allProducts), [allProducts]);
  
  // Get price range from all products
  const productPriceRange = useMemo(() => getPriceRange(allProducts), [allProducts]);

  // Count products per category in filtered results
  const categoryCounts = useMemo(() => {
    const counts = {};
    categories.forEach(cat => {
      counts[cat] = filteredProducts.filter(p => p.category === cat).length;
    });
    return counts;
  }, [categories, filteredProducts]);

  const handleMinPriceChange = (e) => {
    const value = e.target.value;
    const min = value ? parseFloat(value) : null;
    onPriceRangeChange(min, priceRange.max);
  };

  const handleMaxPriceChange = (e) => {
    const value = e.target.value;
    const max = value ? parseFloat(value) : null;
    onPriceRangeChange(priceRange.min, max);
  };

  return (
    <div className="filter-panel">
      <div className="card shadow-sm">
        <div className="card-header">
          <h5 className="mb-0">Filters</h5>
        </div>
        <div className="card-body">
          {/* Category Filters */}
          <div className="mb-4">
            <h6 className="mb-3">Categories</h6>
            <div className="d-flex flex-column gap-2">
              {categories.map(category => (
                <div key={category} className="form-check">
                  <input
                    className="form-check-input"
                    type="checkbox"
                    id={`category-${category}`}
                    checked={selectedCategories.includes(category)}
                    onChange={() => onToggleCategory(category)}
                    aria-label={`Filter by ${category}`}
                  />
                  <label
                    className="form-check-label d-flex justify-content-between w-100"
                    htmlFor={`category-${category}`}
                  >
                    <span>{category}</span>
                    <span className="badge bg-secondary rounded-pill">
                      {categoryCounts[category] || 0}
                    </span>
                  </label>
                </div>
              ))}
            </div>
          </div>

          {/* Price Range Filters */}
          <div>
            <h6 className="mb-3">Price Range</h6>
            <div className="row g-2">
              <div className="col-6">
                <label htmlFor="minPrice" className="form-label small">
                  Min Price
                </label>
                <input
                  type="number"
                  className="form-control form-control-sm"
                  id="minPrice"
                  placeholder={`$${Math.floor(productPriceRange.min)}`}
                  value={priceRange.min !== null ? priceRange.min : ''}
                  onChange={handleMinPriceChange}
                  min="0"
                  step="1"
                  aria-label="Minimum price"
                />
              </div>
              <div className="col-6">
                <label htmlFor="maxPrice" className="form-label small">
                  Max Price
                </label>
                <input
                  type="number"
                  className="form-control form-control-sm"
                  id="maxPrice"
                  placeholder={`$${Math.ceil(productPriceRange.max)}`}
                  value={priceRange.max !== null ? priceRange.max : ''}
                  onChange={handleMaxPriceChange}
                  min="0"
                  step="1"
                  aria-label="Maximum price"
                />
              </div>
            </div>
            <div className="mt-2">
              <small className="text-muted">
                Range: ${Math.floor(productPriceRange.min)} - ${Math.ceil(productPriceRange.max)}
              </small>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FilterPanel;
