import { createContext, useState, useCallback, useEffect } from 'react';

export const CartContext = createContext(null);

const STORAGE_KEY = 'vibe-cart';
const FREE_SHIPPING_THRESHOLD = 100;
const SHIPPING_FLAT = 10;

function loadCart() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    return raw ? JSON.parse(raw) : [];
  } catch {
    return [];
  }
}

export function CartProvider({ children }) {
  const [items, setItems] = useState(loadCart);

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(items));
    } catch {
      // ignore storage errors (e.g. private mode)
    }
  }, [items]);

  // Add a product (full product object) with optional size/color/quantity.
  const addToCart = useCallback((product, quantity = 1, size, color) => {
    setItems((prev) => {
      const key = `${product.id}-${size || 'one-size'}-${color || ''}`;
      const existing = prev.find((item) => item.key === key);
      if (existing) {
        return prev.map((item) =>
          item.key === key ? { ...item, quantity: item.quantity + quantity } : item
        );
      }
      return [
        ...prev,
        {
          key,
          productId: product.id,
          name: product.name,
          category: product.category,
          price: product.price,
          image: product.image,
          rating: product.rating,
          size,
          color,
          quantity,
        },
      ];
    });
  }, []);

  const removeFromCart = useCallback((key) => {
    setItems((prev) => prev.filter((item) => item.key !== key));
  }, []);

  const updateQuantity = useCallback((key, quantity) => {
    setItems((prev) =>
      prev.map((item) =>
        item.key === key ? { ...item, quantity: Math.max(1, quantity) } : item
      )
    );
  }, []);

  const clearCart = useCallback(() => {
    setItems([]);
  }, []);

  const cartCount = items.reduce((sum, item) => sum + item.quantity, 0);
  const cartTotal = items.reduce((sum, item) => sum + item.price * item.quantity, 0);

  // Kept for backward compatibility with existing admin/user consumers.
  const totalAmount = cartTotal;

  const getCartTotal = useCallback(() => cartTotal, [cartTotal]);
  const getCartCount = useCallback(() => cartCount, [cartCount]);

  const shipping = cartTotal >= FREE_SHIPPING_THRESHOLD || cartTotal === 0 ? 0 : SHIPPING_FLAT;
  const grandTotal = cartTotal + shipping;

  return (
    <CartContext.Provider
      value={{
        cart: { items, totalAmount },
        items,
        addToCart,
        removeFromCart,
        updateQuantity,
        clearCart,
        cartCount,
        cartTotal,
        getCartTotal,
        getCartCount,
        shipping,
        grandTotal,
        FREE_SHIPPING_THRESHOLD,
      }}
    >
      {children}
    </CartContext.Provider>
  );
}
