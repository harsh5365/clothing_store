'use client';

import { createContext, useContext, useEffect, useState, useMemo } from 'react';

const WishlistContext = createContext();

const WISHLIST_STORAGE_KEY = 'fashionfox-wishlist';
const WISHLIST_VERSION = '1.0';

// localStorage utilities
const loadWishlistFromStorage = () => {
  if (typeof window === 'undefined') return { items: [], version: WISHLIST_VERSION };
  
  try {
    const stored = localStorage.getItem(WISHLIST_STORAGE_KEY);
    if (!stored) return { items: [], version: WISHLIST_VERSION };
    
    const parsed = JSON.parse(stored);
    
    if (!parsed || !Array.isArray(parsed.items)) {
      console.error('Invalid wishlist data in localStorage');
      return { items: [], version: WISHLIST_VERSION };
    }
    
    return parsed;
  } catch (error) {
    console.error('Failed to load wishlist from localStorage:', error);
    return { items: [], version: WISHLIST_VERSION };
  }
};

const saveWishlistToStorage = (items) => {
  if (typeof window === 'undefined') return;
  
  try {
    const wishlistData = {
      items,
      version: WISHLIST_VERSION
    };
    localStorage.setItem(WISHLIST_STORAGE_KEY, JSON.stringify(wishlistData));
  } catch (error) {
    console.error('Failed to save wishlist to localStorage:', error);
  }
};

export const useWishlist = () => {
  const context = useContext(WishlistContext);
  if (!context) {
    throw new Error('useWishlist must be used within a WishlistProvider');
  }
  return context;
};

export const WishlistProvider = ({ children }) => {
  const [items, setItems] = useState([]);
  const [isInitialized, setIsInitialized] = useState(false);

  // Initialize wishlist from localStorage on mount
  useEffect(() => {
    const wishlistData = loadWishlistFromStorage();
    setItems(wishlistData.items);
    setIsInitialized(true);
  }, []);

  // Persist wishlist to localStorage whenever items change
  useEffect(() => {
    if (isInitialized) {
      saveWishlistToStorage(items);
    }
  }, [items, isInitialized]);

  // Calculate item count
  const itemCount = useMemo(() => items.length, [items]);

  // Check if product is in wishlist
  const isInWishlist = (productId) => {
    return items.some(item => item.id === productId);
  };

  // Add item to wishlist
  const addItem = (product) => {
    try {
      if (!product || !product.id || !product.name || product.price === undefined) {
        console.error('Invalid product:', product);
        return;
      }

      // Prevent duplicates
      if (isInWishlist(product.id)) {
        console.log('Product already in wishlist');
        return;
      }

      setItems(currentItems => [...currentItems, {
        id: product.id,
        name: product.name,
        price: product.price,
        image: product.image,
        category: product.category,
        addedAt: Date.now()
      }]);
    } catch (error) {
      console.error('Failed to add item to wishlist:', error);
    }
  };

  // Remove item from wishlist
  const removeItem = (productId) => {
    try {
      setItems(currentItems => currentItems.filter(item => item.id !== productId));
    } catch (error) {
      console.error('Failed to remove item from wishlist:', error);
    }
  };

  // Clear wishlist
  const clearWishlist = () => {
    try {
      setItems([]);
    } catch (error) {
      console.error('Failed to clear wishlist:', error);
    }
  };

  const value = {
    // State
    items,
    itemCount,
    
    // Operations
    addItem,
    removeItem,
    isInWishlist,
    clearWishlist
  };

  return (
    <WishlistContext.Provider value={value}>
      {children}
    </WishlistContext.Provider>
  );
};
