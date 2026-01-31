# Implementation Plan

- [x] 1. Create search logic utilities
  - Create src/lib/searchUtils.js with pure filter functions
  - Implement filterProducts function
  - Implement matchesSearch with case-insensitive matching
  - Implement matchesCategory for single and multiple categories
  - Implement matchesPriceRange with min/max boundaries
  - _Requirements: 1.1, 1.5, 2.1, 2.2, 3.1, 3.2_

- [ ]* 1.1 Write property test for case-insensitive search
  - **Property 1: Search matching is case-insensitive**
  - **Validates: Requirements 1.5**

- [ ]* 1.2 Write property test for search results contain query
  - **Property 2: Search results contain query**
  - **Validates: Requirements 1.1**

- [ ]* 1.3 Write property test for category filter
  - **Property 3: Category filter includes only selected categories**
  - **Validates: Requirements 2.1, 2.2**

- [ ]* 1.4 Write property test for price range filter
  - **Property 4: Price range filter respects boundaries**
  - **Validates: Requirements 3.1, 3.2**

- [ ]* 1.5 Write property test for empty filters return all products
  - **Property 10: Empty filters return all products**
  - **Validates: Requirements 1.2, 2.3, 3.4**

- [ ]* 1.6 Write unit tests for search utilities
  - Test filterProducts with various combinations
  - Test edge cases (empty query, no categories, null prices)
  - Test no results scenario
  - _Requirements: 1.1, 1.2, 1.4, 2.1, 3.1_

- [x] 2. Create useProductSearch hook
  - Create src/hooks/useProductSearch.js
  - Implement filter state management (query, categories, priceRange)
  - Implement URL parameter synchronization with Next.js useSearchParams
  - Implement setSearchQuery function
  - Implement toggleCategory function
  - Implement setPriceRange function
  - Implement clearFilters function
  - Implement removeFilter function
  - Calculate filteredProducts using search utilities
  - Calculate resultCount and activeFilters
  - _Requirements: 1.1, 2.1, 3.1, 4.1, 5.1, 6.2, 7.1, 7.2_

- [ ]* 2.1 Write property test for filter combination independence
  - **Property 5: Filter combination preserves independence**
  - **Validates: Requirements 2.4, 3.5**

- [ ]* 2.2 Write property test for result count accuracy
  - **Property 6: Result count matches filtered products**
  - **Validates: Requirements 4.1**

- [ ]* 2.3 Write property test for clear filters
  - **Property 7: Clear filters resets to initial state**
  - **Validates: Requirements 5.1, 5.2, 5.3, 5.4**

- [ ]* 2.4 Write property test for URL serialization round trip
  - **Property 8: URL serialization round trip**
  - **Validates: Requirements 7.1, 7.2, 7.5**

- [ ]* 2.5 Write property test for individual filter removal
  - **Property 9: Removing individual filter updates state correctly**
  - **Validates: Requirements 6.2**

- [ ]* 2.6 Write unit tests for useProductSearch hook
  - Test URL parameter parsing on mount
  - Test state updates trigger URL changes
  - Test clearFilters removes URL parameters
  - _Requirements: 7.1, 7.2, 7.4_

- [x] 3. Create SearchBar component
  - Create src/components/SearchBar.js
  - Implement text input with debouncing (300ms)
  - Wire input to setSearchQuery from hook
  - Add search icon and clear button
  - Style with Bootstrap and glassmorphism
  - Add ARIA labels for accessibility
  - _Requirements: 1.1, 1.3_

- [ ]* 3.1 Write unit tests for SearchBar
  - Test input updates query
  - Test debouncing behavior
  - Test clear button
  - _Requirements: 1.1, 1.3_

- [x] 4. Create FilterPanel component
  - Create src/components/FilterPanel.js
  - Implement category filter checkboxes
  - Implement price range inputs (min/max)
  - Wire category checkboxes to toggleCategory
  - Wire price inputs to setPriceRange
  - Display product count per category
  - Style with Bootstrap accordion/collapse
  - Add ARIA labels for accessibility
  - _Requirements: 2.1, 2.2, 2.5, 3.1, 3.2_

- [ ]* 4.1 Write unit tests for FilterPanel
  - Test category selection
  - Test price range input
  - Test category count display
  - _Requirements: 2.1, 3.1_

- [x] 5. Create FilterTags component
  - Create src/components/FilterTags.js
  - Display active filter tags from activeFilters array
  - Implement remove button for each tag
  - Wire remove buttons to removeFilter function
  - Show filter type and value in tag
  - Hide component when no active filters
  - Style with Bootstrap badges
  - _Requirements: 6.1, 6.2, 6.3, 6.4_

- [ ]* 5.1 Write unit tests for FilterTags
  - Test tag display for various filters
  - Test tag removal
  - Test hide when no filters
  - _Requirements: 6.1, 6.2, 6.3_

- [x] 6. Create products page with search and filters
  - Create or update /products page
  - Integrate useProductSearch hook
  - Add SearchBar component
  - Add FilterPanel component (sidebar or top)
  - Add FilterTags component
  - Display filteredProducts in ProductGrid
  - Display result count
  - Show "no results" message when count is 0
  - Add "Clear All Filters" button
  - _Requirements: 1.2, 1.4, 2.3, 3.4, 4.1, 4.3, 4.4, 5.5_

- [ ]* 6.1 Write unit tests for products page
  - Test page renders all components
  - Test no results message
  - Test clear all button
  - _Requirements: 1.4, 4.4_

- [x] 7. Add search to homepage
  - Add SearchBar to homepage hero section
  - Link search to /products page with query parameter
  - Style search bar prominently
  - _Requirements: 1.1_

- [x] 8. Add responsive design
  - Make FilterPanel collapsible on mobile
  - Ensure SearchBar works on all screen sizes
  - Test layout on mobile, tablet, desktop
  - Add mobile-friendly filter drawer
  - _Requirements: 1.1, 2.1, 3.1_

- [x] 9. Add performance optimizations
  - Add debouncing to search input (300ms)
  - Add useMemo to filteredProducts calculation
  - Test performance with large product catalog (100+ items)
  - _Requirements: 1.3_

- [x] 10. Add accessibility features
  - Add ARIA labels to all filter controls
  - Implement keyboard navigation
  - Add screen reader announcements for result count changes
  - Test with keyboard-only navigation
  - Ensure focus management on filter changes
  - _Requirements: 1.1, 2.1, 3.1_

- [x] 11. Handle edge cases and errors
  - Handle empty product catalog
  - Handle invalid URL parameters
  - Handle invalid price inputs (negative, non-numeric)
  - Add input validation and sanitization
  - _Requirements: 1.4, 4.4_

- [x] 12. Checkpoint - Ensure all tests pass
  - Ensure all tests pass, ask the user if questions arise.
