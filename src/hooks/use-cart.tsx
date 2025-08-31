'use client';

import { createContext, useContext, useState, useEffect, ReactNode, useMemo } from 'react';
import type { Product } from '@/lib/products';
import { getShippingCost } from '@/lib/shipping';

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
  shippingState: string | null;
  setShippingState: (state: string) => void;
  shippingCost: number;
  totalWithShipping: number;
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
  const [shippingState, setShippingState] = useState<string | null>(null);
  const [isClient, setIsClient] = useState(false);

  // Ensure localStorage is only accessed on the client
  useEffect(() => {
    setIsClient(true);
  }, []);

  // Load cart and shipping state from localStorage on initial render
  useEffect(() => {
    if (isClient) {
      const savedCart = localStorage.getItem('sareeshine-cart');
      if (savedCart) {
        setItems(JSON.parse(savedCart));
      }
      const savedState = localStorage.getItem('sareeshine-shipping-state');
      if (savedState) {
        setShippingState(JSON.parse(savedState));
      }
    }
  }, [isClient]);

  // Save cart and shipping state to localStorage whenever they change
  useEffect(() => {
    if (isClient) {
      localStorage.setItem('sareeshine-cart', JSON.stringify(items));
    }
  }, [items, isClient]);

  useEffect(() => {
    if (isClient) {
      if (shippingState) {
        localStorage.setItem('sareeshine-shipping-state', JSON.stringify(shippingState));
      } else {
        localStorage.removeItem('sareeshine-shipping-state');
      }
    }
  }, [shippingState, isClient]);

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
    setShippingState(null);
    if(isClient) {
      localStorage.removeItem('sareeshine-cart');
      localStorage.removeItem('sareeshine-shipping-state');
    }
  };

  const itemCount = items.reduce((count, item) => count + item.quantity, 0);

  const total = items.reduce((sum, item) => sum + item.price * item.quantity, 0);

  const shippingCost = useMemo(() => {
    if (!shippingState || itemCount === 0) return 0;
    // Assume average weight is between 201-500g per saree for calculation
    return getShippingCost(shippingState);
  }, [shippingState, itemCount]);

  const totalWithShipping = total + shippingCost;

  return (
    <CartContext.Provider
      value={{
        items,
        addItem,
        removeItem,
        clearCart,
        itemCount,
        total,
        shippingState,
        setShippingState,
        shippingCost,
        totalWithShipping,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};
