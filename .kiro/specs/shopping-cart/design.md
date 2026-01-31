# Shopping Cart System Design

## Overview

The Shopping Cart System provides a complete client-side cart management solution for the FashionFox e-commerce application. The system uses React Context API for state management, browser localStorage for persistence, and integrates seamlessly with the existing Next.js App Router architecture. The design follows the established patterns in the codebase (similar to ThemeContext) and provides a clean API for cart operations across all components.

## Architecture

### High-Level Architecture

```
┌─────────────────────────────────────────────────────────┐
│                    Application Layer                     │
│  (ProductCard, Navbar, CartPage, CartDrawer)            │
└────────────────┬────────────────────────────────────────┘
                 │ useCart() hook
┌────────────────▼────────────────────────────────────────┐
│                   CartContext Provider                   │
│  - Cart State Management                                 │
│  - Cart Operations (add, remove, update, clear)         │
│  - Item Count Calculation                                │
│  - Total Price Calculation                               │
└────────────────┬────────────────────────────────────────┘
                 │
┌────────────────▼────────────────────────────────────────┐
│                  Browser localStorage                    │
│  - Persistent Cart Storage                               │
│  - JSON Serialization/Deserialization                    │
└─────────────────────────────────────────────────────────┘
```

### Component Architecture

The cart system consists of:

1. **CartContext & CartProvider**: Centralized state management
2. **useCart Hook**: Consumer API for components
3. **Cart UI Components**: 
   - CartDrawer: Slide-out cart panel
   - CartPage: Full cart view page
   - CartBadge: Item count indicator
4. **Integration Points**: ProductCard, Navbar

## Components and Interfaces

### CartContext API

```javascript
interface CartItem {
  id: string | number;
  name: string;
  price: number;
  image: string;
  category: string;
  quantity: number;
}

interface CartContextValue {
  // State
  items: CartItem[];
  itemCount: number;
  totalPrice: number;
  
  // Operations
  addItem: (product: Product) => void;
  removeItem: (productId: string | number) => void;
  updateQuantity: (productId: string | number, quantity: number) => void;
  clearCart: () => void;
  
  // UI State
  isCartOpen: boolean;
  openCart: () => void;
  closeCart: () => void;
}
```

### CartProvider Component

The CartProvider wraps the application and provides cart state to all child components:

```javascript
<CartProvider>
  <App />
</CartProvider>
```

Key responsibilities:
- Initialize cart from localStorage on mount
- Manage cart state with useState
- Provide cart operations through context
- Persist cart changes to localStorage
- Calculate derived values (itemCount, totalPrice)

### useCart Hook

Custom hook for accessing cart functionality:

```javascript
const { items, addItem, removeItem, itemCount, totalPrice } = useCart();
```

Throws error if used outside CartProvider (similar to useTheme pattern).

## Data Models

### CartItem Model

```javascript
{
  id: string | number,        // Product ID
  name: string,               // Product name
  price: number,              // Unit price
  image: string,              // Product image URL
  category: string,           // Product category
  quantity: number            // Quantity in cart (min: 1)
}
```

### Cart State Model

```javascript
{
  items: CartItem[],          // Array of cart items
  version: string             // Schema version for future migrations
}
```

### localStorage Schema

Key: `fashionfox-cart`
Value: JSON string of Cart State Model

```json
{
  "items": [
    {
      "id": "1",
      "name": "Classic White T-Shirt",
      "price": 29.99,
      "image": "/images/products/tshirt-white.jpg",
      "category": "T-Shirts",
      "quantity": 2
    }
  ],
  "version": "1.0"
}
```

## Correctness Properties

*A property is a characteristic or behavior that should hold true across all valid executions of a system—essentially, a formal statement about what the system should do. Properties serve as the bridge between human-readable specifications and machine-verifiable correctness guarantees.*

### Property 1: Adding items increases cart size

*For any* cart state and any valid product, adding the product to the cart should result in either:
- The cart containing one more item (if product not already in cart), OR
- The existing item's quantity increasing by 1 (if product already in cart)

**Validates: Requirements 1.1, 1.2**

### Property 2: Cart serialization round trip

*For any* valid cart state, serializing to JSON and then deserializing should produce an equivalent cart state with the same items, quantities, and total price

**Validates: Requirements 5.1, 5.2, 5.3, 5.4**

### Property 3: Quantity updates preserve cart integrity

*For any* cart item and any positive quantity value, updating the quantity should result in the item having that exact quantity and the total price being recalculated correctly

**Validates: Requirements 3.1, 3.2, 3.4**

### Property 4: Removing items decreases cart size

*For any* cart state containing at least one item, removing an item should result in the cart having one fewer item and the total price being reduced by (item.price × item.quantity)

**Validates: Requirements 4.1, 4.2**

### Property 5: Item count equals sum of quantities

*For any* cart state, the displayed item count should always equal the sum of all individual item quantities

**Validates: Requirements 6.1, 6.3**

### Property 6: Total price calculation consistency

*For any* cart state, the total price should always equal the sum of (item.price × item.quantity) for all items in the cart

**Validates: Requirements 2.4, 3.4, 4.2**

### Property 7: Zero quantity removal

*For any* cart item, setting its quantity to zero should result in that item being removed from the cart entirely

**Validates: Requirements 3.3**

### Property 8: State consistency across operations

*For any* sequence of cart operations (add, remove, update), all subscribed components should receive the same cart state simultaneously

**Validates: Requirements 7.2, 7.4**

## Error Handling

### localStorage Errors

1. **Quota Exceeded**: If localStorage is full, log error and continue with in-memory cart
2. **Parse Errors**: If stored cart data is corrupted, initialize empty cart and log error
3. **Access Denied**: If localStorage is blocked (private browsing), use in-memory cart only

### Invalid Data Handling

1. **Invalid Product**: Reject add operation if product missing required fields
2. **Invalid Quantity**: Clamp quantity to minimum of 1, maximum of 99
3. **Missing Item**: Silently ignore remove/update operations on non-existent items

### Error Recovery Strategy

```javascript
try {
  // Cart operation
} catch (error) {
  console.error('Cart operation failed:', error);
  // Maintain current state, don't crash
  // Optionally show user-friendly toast notification
}
```

## Testing Strategy

### Unit Testing

The cart system will use **Jest** and **React Testing Library** for unit tests:

1. **CartContext Tests**:
   - Test addItem with new product
   - Test addItem with existing product (quantity increment)
   - Test removeItem
   - Test updateQuantity with various values
   - Test clearCart
   - Test itemCount calculation
   - Test totalPrice calculation

2. **localStorage Integration Tests**:
   - Test cart persistence on add
   - Test cart restoration on mount
   - Test handling of corrupted data
   - Test handling of localStorage unavailability

3. **Component Tests**:
   - Test CartBadge displays correct count
   - Test CartDrawer renders items correctly
   - Test ProductCard add button integration

### Property-Based Testing

The cart system will use **fast-check** for property-based testing. Each property-based test will run a minimum of 100 iterations to ensure robust validation.

Each property-based test MUST be tagged with a comment explicitly referencing the correctness property from this design document using the format: `// Feature: shopping-cart, Property {number}: {property_text}`

1. **Property 1 Test**: Generate random products and cart states, verify adding items increases size correctly
2. **Property 2 Test**: Generate random cart states, verify serialization round trip preserves data
3. **Property 3 Test**: Generate random cart items and quantities, verify updates maintain integrity
4. **Property 4 Test**: Generate random cart states, verify removal decreases size and updates price
5. **Property 5 Test**: Generate random cart states, verify item count equals sum of quantities
6. **Property 6 Test**: Generate random cart states, verify total price calculation
7. **Property 7 Test**: Generate random cart items, verify zero quantity triggers removal
8. **Property 8 Test**: Generate random operation sequences, verify state consistency

### Test Configuration

- Minimum 100 iterations per property test
- Use custom generators for Product and CartItem types
- Mock localStorage for controlled testing
- Test edge cases: empty cart, single item, many items, large quantities

## Implementation Notes

### Integration with Existing Code

1. **Navbar Integration**: Add CartBadge component next to theme toggle
2. **ProductCard Integration**: Replace console.log with addItem call
3. **Layout Integration**: Wrap app with CartProvider in layout.js (after ThemeProvider)
4. **Routing**: Add /cart page for full cart view

### Performance Considerations

1. **Memoization**: Use useMemo for itemCount and totalPrice calculations
2. **Debouncing**: Debounce localStorage writes (300ms) to avoid excessive I/O
3. **Lazy Loading**: Load CartDrawer component only when needed

### Accessibility

1. **ARIA Labels**: Proper labels for cart icon, buttons, and counts
2. **Keyboard Navigation**: Full keyboard support for cart operations
3. **Screen Reader**: Announce cart updates ("Item added to cart")
4. **Focus Management**: Manage focus when opening/closing cart drawer

### Browser Compatibility

- localStorage is supported in all modern browsers
- Fallback to in-memory cart for browsers without localStorage
- Test in Chrome, Firefox, Safari, Edge
