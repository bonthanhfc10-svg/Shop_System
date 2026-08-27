import { createContext, useState, useCallback, useEffect } from 'react';

export const WishlistContext = createContext(null);

const STORAGE_KEY = 'vibe-wishlist';

function loadWishlist() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    return raw ? JSON.parse(raw) : [];
  } catch {
    return [];
  }
}

export function WishlistProvider({ children }) {
  const [wishlist, setWishlist] = useState(loadWishlist);

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(wishlist));
    } catch {
      // ignore storage errors
    }
  }, [wishlist]);

  const addToWishlist = useCallback((product) => {
    setWishlist((prev) =>
      prev.some((item) => item.id === product.id) ? prev : [...prev, product]
    );
  }, []);

  const removeFromWishlist = useCallback((productId) => {
    setWishlist((prev) => prev.filter((item) => item.id !== productId));
  }, []);

  const isInWishlist = useCallback(
    (productId) => wishlist.some((item) => item.id === productId),
    [wishlist]
  );

  // Kept for backward compatibility with existing consumers.
  const toggleWishlist = useCallback(
    (product) => {
      if (typeof product === 'number') {
        setWishlist((prev) =>
          prev.some((item) => item.id === product)
            ? prev.filter((item) => item.id !== product)
            : prev
        );
        return;
      }
      setWishlist((prev) =>
        prev.some((item) => item.id === product.id)
          ? prev.filter((item) => item.id !== product.id)
          : [...prev, product]
      );
    },
    []
  );

  return (
    <WishlistContext.Provider
      value={{ wishlist, addToWishlist, removeFromWishlist, isInWishlist, toggleWishlist }}
    >
      {children}
    </WishlistContext.Provider>
  );
}
