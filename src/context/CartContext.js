'use client';

import { createContext, useContext, useEffect, useState, useMemo } from 'react';

const CartContext = createContext();

const CART_STORAGE_KEY = 'fashionfox-cart';
const CART_VERSION = '1.0';

// localStorage utilities
const loadCartFromStorage = () => {
  if (typeof window === 'undefined') return { items: [], version: CART_VERSION };
  
  try {
    const stored = localStorage.getItem(CART_STORAGE_KEY);
    if (!stored) return { items: [], version: CART_VERSION };
    
    const parsed = JSON.parse(stored);
    
    // Validate cart data structure
    if (!parsed || !Array.isArray(parsed.items)) {
      console.error('Invalid cart data in localStorage');
      return { items: [], version: CART_VERSION };
    }
    
    return parsed;
  } catch (error) {
    console.error('Failed to load cart from localStorage:', error);
    return { items: [], version: CART_VERSION };
  }
};

const saveCartToStorage = (items) => {
  if (typeof window === 'undefined') return;
  
  try {
    const cartData = {
      items,
      version: CART_VERSION
    };
    localStorage.setItem(CART_STORAGE_KEY, JSON.stringify(cartData));
  } catch (error) {
    if (error.name === 'QuotaExceededError') {
      console.error('localStorage quota exceeded. Cart will not persist.');
    } else {
      console.error('Failed to save cart to localStorage:', error);
    }
  }
};

export const useCart = () => {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
};

export const CartProvider = ({ children }) => {
  const [items, setItems] = useState([]);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isInitialized, setIsInitialized] = useState(false);

  // Initialize cart from localStorage on mount
  useEffect(() => {
    const cartData = loadCartFromStorage();
    setItems(cartData.items);
    setIsInitialized(true);
  }, []);

  // Persist cart to localStorage whenever items change (after initialization)
  useEffect(() => {
    if (isInitialized) {
      saveCartToStorage(items);
    }
  }, [items, isInitialized]);

  // Calculate derived values with memoization
  const itemCount = useMemo(() => {
    return items.reduce((total, item) => total + item.quantity, 0);
  }, [items]);

  const totalPrice = useMemo(() => {
    return items.reduce((total, item) => total + (item.price * item.quantity), 0);
  }, [items]);

  // Cart operations
  const addItem = (product) => {
    try {
      // Validate product has required fields
      if (!product || !product.id || !product.name || product.price === undefined) {
        console.error('Invalid product:', product);
        return;
      }

      setItems(currentItems => {
        const existingItem = currentItems.find(item => item.id === product.id);
        
        if (existingItem) {
          // Increment quantity if item already exists
          return currentItems.map(item =>
            item.id === product.id
              ? { ...item, quantity: Math.min(item.quantity + 1, 99) }
              : item
          );
        } else {
          // Add new item with quantity 1
          return [...currentItems, {
            id: product.id,
            name: product.name,
            price: product.price,
            image: product.image,
            category: product.category,
            quantity: 1
          }];
        }
      });
    } catch (error) {
      console.error('Failed to add item to cart:', error);
    }
  };

  const removeItem = (productId) => {
    try {
      setItems(currentItems => currentItems.filter(item => item.id !== productId));
    } catch (error) {
      console.error('Failed to remove item from cart:', error);
    }
  };

  const updateQuantity = (productId, quantity) => {
    try {
      // Clamp quantity between 1 and 99
      const clampedQuantity = Math.max(1, Math.min(99, quantity));
      
      setItems(currentItems => {
        // If quantity is 0, remove the item
        if (quantity === 0) {
          return currentItems.filter(item => item.id !== productId);
        }
        
        return currentItems.map(item =>
          item.id === productId
            ? { ...item, quantity: clampedQuantity }
            : item
        );
      });
    } catch (error) {
      console.error('Failed to update quantity:', error);
    }
  };

  const clearCart = () => {
    try {
      setItems([]);
    } catch (error) {
      console.error('Failed to clear cart:', error);
    }
  };

  const openCart = () => setIsCartOpen(true);
  const closeCart = () => setIsCartOpen(false);

  const value = {
    // State
    items,
    itemCount,
    totalPrice,
    
    // Operations
    addItem,
    removeItem,
    updateQuantity,
    clearCart,
    
    // UI State
    isCartOpen,
    openCart,
    closeCart
  };

  return (
    <CartContext.Provider value={value}>
      {children}
    </CartContext.Provider>
  );
};
