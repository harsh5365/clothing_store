# User Wishlist Design

## Overview

The User Wishlist System provides wishlist functionality using React Context for state management and localStorage for persistence. Similar architecture to the cart system.

## Architecture

Context-based state management with localStorage persistence.

## Components and Interfaces

### WishlistContext API
```javascript
interface WishlistContextValue {
  items: Product[];
  itemCount: number;
  addItem: (product: Product) => void;
  removeItem: (productId: string | number) => void;
  isInWishlist: (productId: string | number) => boolean;
  clearWishlist: () => void;
}
```

## Data Models

### Wishlist Item
```javascript
{
  id: string | number,
  name: string,
  price: number,
  image: string,
  category: string,
  addedAt: timestamp
}
```

## Correctness Properties

*A property is a characteristic or behavior that should hold true across all valid executions of a system—essentially, a formal statement about what the system should do.*

### Property 1: No duplicate items
*For any* product, adding it multiple times should result in only one instance in the wishlist
**Validates: Requirements 1.2**

### Property 2: Wishlist serialization round trip
*For any* wishlist state, serializing and deserializing should produce equivalent state
**Validates: Requirements 5.1, 5.2, 5.3**

### Property 3: Item count accuracy
*For any* wishlist state, the item count should equal the number of items in the wishlist
**Validates: Requirements 1.4, 2.2**

## Testing Strategy

Use Jest and fast-check for testing with minimum 100 iterations per property test.

## Implementation Notes

- Similar to CartContext pattern
- localStorage key: `fashionfox-wishlist`
- Heart icon for wishlist button
- Wishlist page at /wishlist
