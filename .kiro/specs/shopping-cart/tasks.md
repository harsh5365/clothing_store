# Implementation Plan

- [x] 1. Set up cart context and provider
  - Create CartContext with React Context API
  - Implement CartProvider component with state management
  - Create useCart custom hook with error handling
  - Add localStorage utilities for serialization/deserialization
  - _Requirements: 7.1, 7.2, 7.3, 5.1, 5.2_

- [ ]* 1.1 Write property test for cart serialization round trip
  - **Property 2: Cart serialization round trip**
  - **Validates: Requirements 5.1, 5.2, 5.3, 5.4**

- [x] 2. Implement core cart operations
  - Implement addItem function with duplicate detection
  - Implement removeItem function
  - Implement updateQuantity function with zero-quantity handling
  - Implement clearCart function
  - Add localStorage persistence on all operations
  - _Requirements: 1.1, 1.2, 4.1, 3.1, 3.2, 3.3_

- [ ]* 2.1 Write property test for adding items increases cart size
  - **Property 1: Adding items increases cart size**
  - **Validates: Requirements 1.1, 1.2**

- [ ]* 2.2 Write property test for quantity updates preserve cart integrity
  - **Property 3: Quantity updates preserve cart integrity**
  - **Validates: Requirements 3.1, 3.2, 3.4**

- [ ]* 2.3 Write property test for zero quantity removal
  - **Property 7: Zero quantity removal**
  - **Validates: Requirements 3.3**

- [ ]* 2.4 Write property test for removing items decreases cart size
  - **Property 4: Removing items decreases cart size**
  - **Validates: Requirements 4.1, 4.2**

- [x] 3. Implement derived state calculations
  - Implement itemCount calculation (sum of all quantities)
  - Implement totalPrice calculation (sum of price × quantity)
  - Use useMemo for performance optimization
  - _Requirements: 6.1, 2.4, 3.4, 4.2_

- [ ]* 3.1 Write property test for item count equals sum of quantities
  - **Property 5: Item count equals sum of quantities**
  - **Validates: Requirements 6.1, 6.3**

- [ ]* 3.2 Write property test for total price calculation consistency
  - **Property 6: Total price calculation consistency**
  - **Validates: Requirements 2.4, 3.4, 4.2**

- [x] 4. Integrate CartProvider into application
  - Add CartProvider to root layout.js
  - Ensure CartProvider wraps all pages
  - Test context availability in child components
  - _Requirements: 7.1, 7.3_

- [ ]* 4.1 Write property test for state consistency across operations
  - **Property 8: State consistency across operations**
  - **Validates: Requirements 7.2, 7.4**

- [x] 5. Create cart UI components
  - Create CartBadge component for navbar
  - Create CartDrawer component (slide-out panel)
  - Create CartItem component for individual items
  - Add open/close state management to CartContext
  - Style components with Bootstrap and glassmorphism
  - _Requirements: 6.1, 6.2, 2.1, 2.2_

- [ ]* 5.1 Write unit tests for CartBadge component
  - Test badge displays correct count
  - Test badge hidden when cart empty
  - Test badge updates on cart changes
  - _Requirements: 6.1, 6.2, 6.3_

- [ ]* 5.2 Write unit tests for CartDrawer component
  - Test drawer renders all cart items
  - Test empty cart message display
  - Test total price display
  - Test open/close functionality
  - _Requirements: 2.1, 2.2, 2.4_

- [x] 6. Integrate cart with ProductCard
  - Update ProductCard add button to use addItem
  - Add visual feedback on successful add (toast/animation)
  - Remove console.log placeholder
  - _Requirements: 1.1, 1.3_

- [x] 7. Integrate cart badge with Navbar
  - Add CartBadge component to Navbar
  - Position badge next to theme toggle
  - Add click handler to open CartDrawer
  - Ensure responsive design
  - _Requirements: 6.1, 6.3, 6.4_

- [x] 8. Implement cart quantity controls
  - Add increment/decrement buttons to CartItem
  - Add remove button to CartItem
  - Wire buttons to updateQuantity and removeItem
  - Add loading states during operations
  - _Requirements: 3.1, 3.2, 3.3, 4.1_

- [x] 9. Add error handling and edge cases
  - Handle localStorage quota exceeded
  - Handle corrupted cart data in localStorage
  - Handle localStorage unavailable (private browsing)
  - Add error boundaries for cart components
  - _Requirements: 5.5_

- [ ]* 9.1 Write unit tests for error handling
  - Test localStorage quota exceeded fallback
  - Test corrupted data recovery
  - Test localStorage unavailable fallback
  - _Requirements: 5.5_

- [x] 10. Create full cart page
  - Create /cart page route
  - Display full cart with all items
  - Add quantity controls and remove buttons
  - Show cart summary with total
  - Add "Continue Shopping" and "Checkout" buttons
  - _Requirements: 2.1, 2.2, 2.3, 2.4_

- [ ]* 10.1 Write unit tests for cart page
  - Test page renders cart items correctly
  - Test empty cart state
  - Test navigation buttons
  - _Requirements: 2.1, 2.2_

- [x] 11. Add accessibility features
  - Add ARIA labels to all cart buttons
  - Implement keyboard navigation for cart drawer
  - Add screen reader announcements for cart updates
  - Test with keyboard-only navigation
  - Ensure focus management in cart drawer
  - _Requirements: 1.3, 6.3_

- [x] 12. Optimize performance
  - Add debouncing to localStorage writes (300ms)
  - Implement lazy loading for CartDrawer
  - Add memoization to expensive calculations
  - Test performance with large cart (50+ items)
  - _Requirements: 1.5, 3.5, 4.4_

- [x] 13. Checkpoint - Ensure all tests pass
  - Ensure all tests pass, ask the user if questions arise.
