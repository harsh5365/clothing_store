'use client';

import { useState, useMemo, useCallback, useEffect } from 'react';
import { useRouter, useSearchParams, usePathname } from 'next/navigation';
import { filterProducts } from '../lib/searchUtils';

/**
 * Custom hook for product search and filtering with URL synchronization
 * @param {Object[]} products - Array of all products
 * @returns {Object} - Search state and operations
 */
export function useProductSearch(products) {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  
  // Initialize state from URL parameters
  const [filters, setFilters] = useState(() => {
    const query = searchParams.get('q') || '';
    const categoriesParam = searchParams.get('cat');
    const categories = categoriesParam ? categoriesParam.split(',').filter(Boolean) : [];
    const minPrice = searchParams.get('minPrice');
    const maxPrice = searchParams.get('maxPrice');
    
    return {
      query,
      categories,
      priceRange: {
        min: minPrice ? parseFloat(minPrice) : null,
        max: maxPrice ? parseFloat(maxPrice) : null
      }
    };
  });

  // Update URL when filters change
  useEffect(() => {
    const params = new URLSearchParams();
    
    if (filters.query) {
      params.set('q', filters.query);
    }
    
    if (filters.categories.length > 0) {
      params.set('cat', filters.categories.join(','));
    }
    
    if (filters.priceRange.min !== null) {
      params.set('minPrice', filters.priceRange.min.toString());
    }
    
    if (filters.priceRange.max !== null) {
      params.set('maxPrice', filters.priceRange.max.toString());
    }
    
    const queryString = params.toString();
    const newUrl = queryString ? `${pathname}?${queryString}` : pathname;
    
    // Only update if URL actually changed
    if (window.location.pathname + window.location.search !== newUrl) {
      router.replace(newUrl, { scroll: false });
    }
  }, [filters, pathname, router]);

  // Filter products based on current filters
  const filteredProducts = useMemo(() => {
    return filterProducts(products, filters);
  }, [products, filters]);

  // Calculate result count
  const resultCount = filteredProducts.length;

  // Set search query
  const setSearchQuery = useCallback((query) => {
    setFilters(prev => ({
      ...prev,
      query: query || ''
    }));
  }, []);

  // Toggle category selection
  const toggleCategory = useCallback((category) => {
    setFilters(prev => {
      const categories = prev.categories.includes(category)
        ? prev.categories.filter(c => c !== category)
        : [...prev.categories, category];
      
      return {
        ...prev,
        categories
      };
    });
  }, []);

  // Set price range
  const setPriceRange = useCallback((min, max) => {
    setFilters(prev => ({
      ...prev,
      priceRange: {
        min: min !== null && min !== undefined ? parseFloat(min) : null,
        max: max !== null && max !== undefined ? parseFloat(max) : null
      }
    }));
  }, []);

  // Clear all filters
  const clearFilters = useCallback(() => {
    setFilters({
      query: '',
      categories: [],
      priceRange: { min: null, max: null }
    });
  }, []);

  // Remove specific filter
  const removeFilter = useCallback((filterType, value) => {
    setFilters(prev => {
      switch (filterType) {
        case 'query':
          return { ...prev, query: '' };
        
        case 'category':
          return {
            ...prev,
            categories: prev.categories.filter(c => c !== value)
          };
        
        case 'minPrice':
          return {
            ...prev,
            priceRange: { ...prev.priceRange, min: null }
          };
        
        case 'maxPrice':
          return {
            ...prev,
            priceRange: { ...prev.priceRange, max: null }
          };
        
        default:
          return prev;
      }
    });
  }, []);

  // Get active filters for display
  const activeFilters = useMemo(() => {
    const active = [];
    
    if (filters.query) {
      active.push({
        type: 'query',
        label: `Search: "${filters.query}"`,
        value: filters.query,
        onRemove: () => removeFilter('query')
      });
    }
    
    filters.categories.forEach(category => {
      active.push({
        type: 'category',
        label: category,
        value: category,
        onRemove: () => removeFilter('category', category)
      });
    });
    
    if (filters.priceRange.min !== null) {
      active.push({
        type: 'price',
        label: `Min: $${filters.priceRange.min}`,
        value: filters.priceRange.min,
        onRemove: () => removeFilter('minPrice')
      });
    }
    
    if (filters.priceRange.max !== null) {
      active.push({
        type: 'price',
        label: `Max: $${filters.priceRange.max}`,
        value: filters.priceRange.max,
        onRemove: () => removeFilter('maxPrice')
      });
    }
    
    return active;
  }, [filters, removeFilter]);

  const hasActiveFilters = activeFilters.length > 0;

  return {
    // Filtered results
    filteredProducts,
    resultCount,
    
    // Filter state
    filters,
    
    // Filter operations
    setSearchQuery,
    toggleCategory,
    setPriceRange,
    clearFilters,
    removeFilter,
    
    // Derived state
    activeFilters,
    hasActiveFilters
  };
}
