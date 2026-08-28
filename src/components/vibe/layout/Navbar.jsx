import { useState, useEffect } from 'react';
import { Link, NavLink, useLocation } from 'react-router-dom';
import { Search, Heart, User, ShoppingBag, Menu, Zap } from 'lucide-react';
import { useCart } from '../../../hooks/useCart';
import { useStorefront } from '../../../context/StorefrontContext';

const navLinks = [
  { label: 'MEN', to: '/shop?g=men' },
  { label: 'WOMEN', to: '/shop?g=women' },
  { label: 'SHOES', to: '/category/shoes' },
  { label: 'SHIRTS', to: '/category/shirts' },
  { label: 'PANTS', to: '/category/pants' },
  { label: 'NEW ARRIVALS', to: '/shop?sort=newest' },
];

const SALE_LINK = { label: 'SALE', to: '/shop?sale=true' };

function IconButton({ label, children, onClick, className = '' }) {
  return (
    <button
      onClick={onClick}
      aria-label={label}
      className={`p-2.5 text-ink hover:bg-mist rounded-full transition-colors vibe-focus ${className}`}
    >
      {children}
    </button>
  );
}

export default function Navbar() {
  const { cartCount } = useCart();
  const { setMenuOpen, openSearch, openCart } = useStorefront();
  const location = useLocation();
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <header
      className={`sticky top-0 z-40 bg-white/90 backdrop-blur-md transition-shadow ${
        scrolled ? 'shadow-[0_4px_24px_rgba(0,0,0,0.06)] border-b border-mist' : 'border-b border-mist'
      }`}
    >
      <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-10">
        <div className="flex items-center justify-between h-16 lg:h-20">

          {/* Left: mobile menu + logo */}
          <div className="flex items-center gap-3 lg:gap-10">
            <IconButton label="Open menu" onClick={() => setMenuOpen(true)} className="lg:hidden -ml-2">
              <Menu size={22} />
            </IconButton>
            <Link to="/" className="flex items-center gap-1.5 group">
              <span className="inline-flex items-center justify-center w-8 h-8 rounded-lg bg-volt text-ink group-hover:bg-volt-dark transition-colors">
                <Zap size={17} strokeWidth={2.5} />
              </span>
              <span className="font-black text-2xl tracking-tight text-ink">
                VIBE
              </span>
            </Link>
          </div>

          {/* Center: nav links (desktop) */}
          <nav className="hidden lg:flex items-center gap-1" aria-label="Main navigation">
            {navLinks.map((link) => (
              <NavLink
                key={link.label}
                to={link.to}
                className="relative px-4 py-2 rounded-full text-[13px] font-semibold tracking-wide text-ink/80 hover:text-ink hover:bg-mist transition-colors vibe-focus"
              >
                {({ isActive }) => (
                  <>
                    {link.label}
                    {isActive && (
                      <span className="absolute left-4 right-4 -bottom-0.5 h-0.5 rounded-full bg-ink" />
                    )}
                  </>
                )}
              </NavLink>
            ))}
            <NavLink
              to={SALE_LINK.to}
              className="ml-2 px-4 py-2 rounded-full text-[13px] font-bold tracking-wide uppercase text-ink bg-volt hover:bg-volt-dark transition-colors vibe-focus"
            >
              {SALE_LINK.label}
            </NavLink>
          </nav>

          {/* Right: icons */}
          <div className="flex items-center gap-1 sm:gap-2">
            <IconButton label="Search" onClick={openSearch}>
              <Search size={20} />
            </IconButton>
            <Link
              to="/wishlist"
              aria-label="Wishlist"
              className={`p-2.5 text-ink hover:bg-mist rounded-full transition-colors vibe-focus ${
                location.pathname === '/wishlist' ? 'bg-mist' : ''
              }`}
            >
              <Heart size={20} />
            </Link>
            <Link
              to="/login"
              aria-label="Account"
              className={`hidden sm:block p-2.5 text-ink hover:bg-mist rounded-full transition-colors vibe-focus ${
                location.pathname === '/login' ? 'bg-mist' : ''
              }`}
            >
              <User size={20} />
            </Link>
            <IconButton label="Shopping bag" onClick={openCart} className="relative">
              <ShoppingBag size={20} />
              {cartCount > 0 && (
                <span className="absolute top-1 right-1 min-w-[18px] h-[18px] px-1 rounded-full bg-volt text-ink text-[11px] font-bold flex items-center justify-center shadow-sm">
                  {cartCount}
                </span>
              )}
            </IconButton>
          </div>
        </div>
      </div>

      <div className="news-ticker overflow-hidden border-t border-mist bg-ink">
        <div className="news-ticker-track items-center py-2">
          <span className="text-[11px] sm:text-xs font-semibold tracking-widest text-white/70 uppercase mx-8">Free shipping on orders over $100</span>
          <span className="text-[11px] sm:text-xs font-semibold tracking-widest text-white/70 uppercase mx-8">New arrivals every week</span>
          <span className="text-[11px] sm:text-xs font-semibold tracking-widest text-white/70 uppercase mx-8">Use code VIBE10 for 10% off</span>
          <span className="text-[11px] sm:text-xs font-semibold tracking-widest text-white/70 uppercase mx-8">Free returns within 30 days</span>
          <span className="text-[11px] sm:text-xs font-semibold tracking-widest text-white/70 uppercase mx-8">Free shipping on orders over $100</span>
          <span className="text-[11px] sm:text-xs font-semibold tracking-widest text-white/70 uppercase mx-8">New arrivals every week</span>
          <span className="text-[11px] sm:text-xs font-semibold tracking-widest text-white/70 uppercase mx-8">Use code VIBE10 for 10% off</span>
          <span className="text-[11px] sm:text-xs font-semibold tracking-widest text-white/70 uppercase mx-8">Free returns within 30 days</span>
        </div>
      </div>
    </header>
  );
}
