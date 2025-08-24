'use client';

import { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import type { Product } from '@/lib/products';

// Define the shape of a cart item
export interface CartItem extends Product {
  quantity: number;
}

// Define the shape of the cart context
interface CartContextType {
  items: CartItem[];
  addItem: (item: Product) => void;
  removeItem: (itemId: number) => void;
  clearCart: () => void;
  itemCount: number;
  total: number;
}

// Create the context with a default undefined value
const CartContext = createContext<CartContextType | undefined>(undefined);

// Custom hook to use the cart context
export const useCart = () => {
  const context = useContext(CartContext);
  if (context === undefined) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
};

// CartProvider component to wrap around parts of the app that need cart access
export const CartProvider = ({ children }: { children: ReactNode }) => {
  const [items, setItems] = useState<CartItem[]>([]);

  // Load cart from localStorage on initial render
  useEffect(() => {
    const savedCart = localStorage.getItem('sareeshine-cart');
    if (savedCart) {
      setItems(JSON.parse(savedCart));
    }
  }, []);

  // Save cart to localStorage whenever it changes
  useEffect(() => {
    localStorage.setItem('sareeshine-cart', JSON.stringify(items));
  }, [items]);

  const addItem = (product: Product) => {
    setItems((prevItems) => {
      const existingItem = prevItems.find((item) => item.id === product.id);
      if (existingItem) {
        // For simplicity, we'll just prevent adding the same item again.
        // A real cart might increase quantity.
        return prevItems;
      }
      return [...prevItems, { ...product, quantity: 1 }];
    });
  };

  const removeItem = (itemId: number) => {
    setItems((prevItems) => prevItems.filter((item) => item.id !== itemId));
  };

  const clearCart = () => {
    setItems([]);
  };

  const itemCount = items.reduce((count, item) => count + item.quantity, 0);

  const total = items.reduce((sum, item) => sum + item.price * item.quantity, 0);

  return (
    <CartContext.Provider value={{ items, addItem, removeItem, clearCart, itemCount, total }}>
      {children}
    </CartContext.Provider>
  );
};
