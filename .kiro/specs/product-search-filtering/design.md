# Product Search & Filtering System Design

## Overview

The Product Search & Filtering System provides a comprehensive solution for customers to discover products through text search and multiple filter criteria. The system uses a custom React hook for state management, Next.js URL search params for persistence, and pure functions for search/filter logic to ensure testability and maintainability.

## Architecture

### High-Level Architecture

```
┌─────────────────────────────────────────────────────────┐
│                    UI Components Layer                   │
│  (SearchBar, FilterPanel, ProductGrid, FilterTags)      │
└────────────────┬────────────────────────────────────────┘
                 │ useProductSearch() hook
┌────────────────▼────────────────────────────────────────┐
│              Search State Management                     │
│  - Filter State (query, categories, priceRange)         │
│  - URL Sync (searchParams)                               │
│  - Filter Operations                                     │
└────────────────┬────────────────────────────────────────┘
                 │
┌────────────────▼────────────────────────────────────────┐
│              Search Logic Layer                          │
│  - filterProducts(products, filters)                     │
│  - matchesSearch(product, query)                         │
│  - matchesCategory(product, categories)                  │
│  - matchesPriceRange(product, range)                     │
└────────────────┬────────────────────────────────────────┘
                 │
┌────────────────▼────────────────────────────────────────┐
│                  Product Data                            │
│  - Static product catalog                                │
│  - Future: API endpoint                                  │
└─────────────────────────────────────────────────────────┘
```

### Component Architecture

1. **Search Logic Module** (`src/lib/searchUtils.js`): Pure functions for filtering
2. **useProductSearch Hook** (`src/hooks/useProductSearch.js`): State management and URL sync
3. **UI Components**:
   - SearchBar: Text input with real-time search
   - FilterPanel: Category and price range filters
   - FilterTags: Active filter display with removal
   - ProductGrid: Results display (existing component)

## Components and Interfaces

### Search Logic Functions

```javascript
// Pure function for filtering products
function filterProducts(products, filters) {
  return products.filter(product => 
    matchesSearch(product, filters.query) &&
    matchesCategory(product, filters.categories) &&
    matchesPriceRange(product, filters.priceRange)
  );
}

// Case-insensitive search matching
function matchesSearch(product, query) {
  if (!query) return true;
  const lowerQuery = query.toLowerCase();
  return product.name.toLowerCase().includes(lowerQuery) ||
         product.description.toLowerCase().includes(lowerQuery);
}

// Category filter matching
function matchesCategory(product, categories) {
  if (!categories || categories.length === 0) return true;
  return categories.includes(product.category);
}

// Price range filter matching
function matchesPriceRange(product, priceRange) {
  const { min, max } = priceRange;
  if (min !== null && product.price < min) return false;
  if (max !== null && product.price > max) return false;
  return true;
}
```

### useProductSearch Hook

```javascript
interface FilterState {
  query: string;
  categories: string[];
  priceRange: { min: number | null; max: number | null };
}

interface UseProductSearchReturn {
  // Filtered results
  filteredProducts: Product[];
  resultCount: number;
  
  // Filter state
  filters: FilterState;
  
  // Filter operations
  setSearchQuery: (query: string) => void;
  toggleCategory: (category: string) => void;
  setPriceRange: (min: number | null, max: number | null) => void;
  clearFilters: () => void;
  removeFilter: (filterType: string, value?: any) => void;
  
  // Derived state
  activeFilters: ActiveFilter[];
  hasActiveFilters: boolean;
}
```

### URL Parameter Schema

```
/products?q=shirt&cat=T-Shirts,Hoodies&minPrice=20&maxPrice=50

Parameters:
- q: search query (string)
- cat: comma-separated categories (string)
- minPrice: minimum price (number)
- maxPrice: maximum price (number)
```

## Data Models

### FilterState Model

```javascript
{
  query: string,                    // Search text
  categories: string[],             // Selected categories
  priceRange: {
    min: number | null,             // Minimum price (null = no limit)
    max: number | null              // Maximum price (null = no limit)
  }
}
```

### ActiveFilter Model

```javascript
{
  type: 'query' | 'category' | 'price',
  label: string,                    // Display text
  value: any,                       // Filter value
  onRemove: () => void              // Removal handler
}
```

## Correctness Properties

*A property is a characteristic or behavior that should hold true across all valid executions of a system—essentially, a formal statement about what the system should do. Properties serve as the bridge between human-readable specifications and machine-verifiable correctness guarantees.*

### Property 1: Search matching is case-insensitive

*For any* product and search query, searching with different cases (uppercase, lowercase, mixed) should return the same results

**Validates: Requirements 1.5**

### Property 2: Search results contain query

*For any* non-empty search query and filtered product list, all returned products should have the query string in either their name or description (case-insensitive)

**Validates: Requirements 1.1**

### Property 3: Category filter includes only selected categories

*For any* set of selected categories and product list, all filtered products should belong to one of the selected categories

**Validates: Requirements 2.1, 2.2**

### Property 4: Price range filter respects boundaries

*For any* price range (min, max) and product list, all filtered products should have prices within the specified range (inclusive)

**Validates: Requirements 3.1, 3.2**

### Property 5: Filter combination preserves independence

*For any* filter state, applying a new filter (category or price) should not modify the search query or other unrelated filters

**Validates: Requirements 2.4, 3.5**

### Property 6: Result count matches filtered products

*For any* filter state and product list, the displayed result count should equal the length of the filtered products array

**Validates: Requirements 4.1**

### Property 7: Clear filters resets to initial state

*For any* filter state with active filters, clearing all filters should result in an empty query, no selected categories, and null price range values

**Validates: Requirements 5.1, 5.2, 5.3, 5.4**

### Property 8: URL serialization round trip

*For any* filter state, serializing to URL parameters and then deserializing should produce an equivalent filter state

**Validates: Requirements 7.1, 7.2, 7.5**

### Property 9: Removing individual filter updates state correctly

*For any* active filter, removing that specific filter should update the filter state to exclude only that filter while preserving all other filters

**Validates: Requirements 6.2**

### Property 10: Empty filters return all products

*For any* product list, when all filters are empty (no query, no categories, no price range), the filtered results should equal the original product list

**Validates: Requirements 1.2, 2.3, 3.4**

## Error Handling

### Invalid Input Handling

1. **Invalid Price Values**: Clamp to reasonable ranges (0-10000), ignore negative values
2. **Invalid Categories**: Ignore categories that don't exist in the catalog
3. **Malformed URL Parameters**: Parse safely, use defaults on error

### Edge Cases

1. **Empty Product Catalog**: Display "no products available" message
2. **No Search Results**: Display "no results found" with suggestion to clear filters
3. **Invalid URL State**: Initialize with default empty filters

## Testing Strategy

### Unit Testing

The search system will use **Jest** and **React Testing Library**:

1. **Search Logic Tests**:
   - Test filterProducts with various filter combinations
   - Test matchesSearch with different queries and products
   - Test matchesCategory with single and multiple categories
   - Test matchesPriceRange with various ranges
   - Test case-insensitive matching

2. **Hook Tests**:
   - Test setSearchQuery updates state and URL
   - Test toggleCategory adds/removes categories
   - Test setPriceRange updates range
   - Test clearFilters resets all state
   - Test URL parameter parsing on mount

3. **Component Tests**:
   - Test SearchBar input updates query
   - Test FilterPanel category selection
   - Test FilterTags display and removal
   - Test result count display

### Property-Based Testing

The search system will use **fast-check** for property-based testing. Each property-based test will run a minimum of 100 iterations.

Each property-based test MUST be tagged with: `// Feature: product-search-filtering, Property {number}: {property_text}`

1. **Property 1 Test**: Generate random queries with different cases, verify same results
2. **Property 2 Test**: Generate random queries and products, verify all results contain query
3. **Property 3 Test**: Generate random category selections, verify all results match categories
4. **Property 4 Test**: Generate random price ranges, verify all results within range
5. **Property 5 Test**: Generate random filter sequences, verify filter independence
6. **Property 6 Test**: Generate random filter states, verify count matches array length
7. **Property 7 Test**: Generate random filter states, verify clear resets to initial
8. **Property 8 Test**: Generate random filter states, verify URL round trip
9. **Property 9 Test**: Generate random active filters, verify individual removal
10. **Property 10 Test**: Generate random product lists, verify empty filters return all

## Implementation Notes

### Performance Optimization

1. **Debounced Search**: Debounce search input (300ms) to reduce filtering operations
2. **Memoization**: Use useMemo for filtered products calculation
3. **Virtual Scrolling**: Consider for large result sets (100+ products)

### Accessibility

1. **ARIA Labels**: Proper labels for search input and filter controls
2. **Keyboard Navigation**: Full keyboard support for all filters
3. **Screen Reader**: Announce result count changes
4. **Focus Management**: Maintain focus on filter removal

### Future Enhancements

1. **Sort Options**: Add sorting by price, name, popularity
2. **Advanced Filters**: Size, color, brand filters
3. **Search Suggestions**: Autocomplete based on product names
4. **Filter Persistence**: Remember user's filter preferences
5. **Search Analytics**: Track popular searches and filters
