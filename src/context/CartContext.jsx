import { createContext, useState, useCallback } from 'react';

export const CartContext = createContext(null);

const DEMO_PRODUCTS = {
  1: { id: 1, name: 'Wireless Bluetooth Headphones', price: 79.99, emoji: '🎧', category: 'Electronics' },
  2: { id: 2, name: 'Smart Watch Pro', price: 199.99, emoji: '⌚', category: 'Electronics' },
  3: { id: 3, name: 'USB-C Hub Adapter', price: 34.99, emoji: '🔌', category: 'Accessories' },
  4: { id: 4, name: 'Laptop Stand Adjustable', price: 45.99, emoji: '🖥️', category: 'Furniture' },
  5: { id: 5, name: 'Wireless Mouse Ergonomic', price: 39.99, emoji: '🖱️', category: 'Electronics' },
  6: { id: 6, name: '4K Webcam HD', price: 69.99, emoji: '📷', category: 'Electronics' },
  7: { id: 7, name: 'Portable SSD 1TB', price: 99.99, emoji: '💾', category: 'Accessories' },
  8: { id: 8, name: 'Mechanical Keyboard RGB', price: 89.99, emoji: '⌨️', category: 'Electronics' },
  9: { id: 9, name: 'Desk Lamp LED', price: 29.99, emoji: '💡', category: 'Furniture' },
  10: { id: 10, name: 'Noise Cancelling Earbuds', price: 129.99, emoji: '🎵', category: 'Electronics' },
  11: { id: 11, name: 'Webcam Tripod Stand', price: 19.99, emoji: '📷', category: 'Accessories' },
  12: { id: 12, name: 'Monitor Light Bar', price: 49.99, emoji: '💡', category: 'Electronics' },
};

export function CartProvider({ children }) {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(false);

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
      loading,
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
