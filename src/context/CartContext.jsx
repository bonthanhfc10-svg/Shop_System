import { createContext, useState, useCallback } from 'react';

export const CartContext = createContext(null);

const DEMO_PRODUCTS = {
  1: { id: 1, name: 'Classic White T-Shirt', price: 19.99, emoji: '👕', category: 'Shirts' },
  2: { id: 2, name: 'Slim Fit Blue Jeans', price: 39.99, emoji: '👖', category: 'Pants' },
  3: { id: 3, name: 'White Running Sneakers', price: 59.99, emoji: '👟', category: 'Shoes' },
  4: { id: 4, name: 'Polo Shirt Navy', price: 24.99, emoji: '👔', category: 'Shirts' },
  5: { id: 5, name: 'Cargo Pants Olive', price: 34.99, emoji: '👖', category: 'Pants' },
  6: { id: 6, name: 'Casual Canvas Shoes', price: 29.99, emoji: '👞', category: 'Shoes' },
  7: { id: 7, name: 'Long Sleeve Flannel', price: 32.99, emoji: '👕', category: 'Shirts' },
  8: { id: 8, name: 'Summer Shorts Khaki', price: 22.99, emoji: '🩳', category: 'Pants' },
  9: { id: 9, name: 'Black Graphic Tee', price: 17.99, emoji: '👕', category: 'Shirts' },
  10: { id: 10, name: 'Leather Sandals Brown', price: 35.99, emoji: '🩴', category: 'Shoes' },
  11: { id: 11, name: 'Casual Linen Shirt', price: 28.99, emoji: '👔', category: 'Shirts' },
  12: { id: 12, name: 'Sports Running Shoes', price: 64.99, emoji: '👟', category: 'Shoes' },
  13: { id: 13, name: 'Regular Fit Chinos', price: 27.99, emoji: '👖', category: 'Pants' },
  14: { id: 14, name: 'Striped V-Neck Tee', price: 15.99, emoji: '👕', category: 'Shirts' },
  15: { id: 15, name: 'Denim Jacket Blue', price: 49.99, emoji: '🧥', category: 'Shirts' },
  16: { id: 16, name: 'Athletic Shorts Black', price: 18.99, emoji: '🩳', category: 'Pants' },
  17: { id: 17, name: 'Formal Oxford Shoes', price: 74.99, emoji: '👞', category: 'Shoes' },
  18: { id: 18, name: 'Plaid Button Down', price: 36.99, emoji: '👔', category: 'Shirts' },
};

export function CartProvider({ children }) {
  const [items, setItems] = useState([]);

  const addToCart = useCallback((productId, quantity = 1) => {
    setItems((prev) => {
      const existing = prev.find((item) => item.productId === productId);
      if (existing) {
        return prev.map((item) =>
          item.productId === productId
            ? { ...item, quantity: item.quantity + quantity }
            : item
        );
      }
      const product = DEMO_PRODUCTS[productId];
      const name = product?.name || `Product #${productId}`;
      const price = product?.price || 0;
      const emoji = product?.emoji || '📦';
      return [...prev, { productId, name, price, emoji, quantity }];
    });
  }, []);

  const removeFromCart = useCallback((productId) => {
    setItems((prev) => prev.filter((item) => item.productId !== productId));
  }, []);

  const updateQuantity = useCallback((productId, quantity) => {
    setItems((prev) =>
      prev.map((item) =>
        item.productId === productId
          ? { ...item, quantity: Math.max(1, quantity) }
          : item
      )
    );
  }, []);

  const clearCart = useCallback(() => {
    setItems([]);
  }, []);

  const cartCount = items.reduce((sum, item) => sum + item.quantity, 0);
  const cartTotal = items.reduce((sum, item) => sum + item.price * item.quantity, 0);

  return (
    <CartContext.Provider value={{
      cart: { items, totalAmount: cartTotal },
      items,
      addToCart,
      removeFromCart,
      updateQuantity,
      clearCart,
      cartCount,
      cartTotal,
    }}>
      {children}
    </CartContext.Provider>
  );
}
