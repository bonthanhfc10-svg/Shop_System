import { createContext, useState, useCallback, useContext } from 'react';

const StorefrontContext = createContext(null);

export function StorefrontProvider({ children }) {
  const [menuOpen, setMenuOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [cartOpen, setCartOpen] = useState(false);

  const openSearch = useCallback(() => {
    setMenuOpen(false);
    setSearchOpen(true);
  }, []);

  const openCart = useCallback(() => {
    setSearchOpen(false);
    setCartOpen(true);
  }, []);

  const closeAll = useCallback(() => {
    setMenuOpen(false);
    setSearchOpen(false);
    setCartOpen(false);
  }, []);

  return (
    <StorefrontContext.Provider
      value={{
        menuOpen,
        setMenuOpen,
        searchOpen,
        setSearchOpen,
        cartOpen,
        setCartOpen,
        openSearch,
        openCart,
        closeAll,
      }}
    >
      {children}
    </StorefrontContext.Provider>
  );
}

export function useStorefront() {
  const ctx = useContext(StorefrontContext);
  if (!ctx) throw new Error('useStorefront must be used within StorefrontProvider');
  return ctx;
}
