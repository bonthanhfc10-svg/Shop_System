import { useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { X } from 'lucide-react';
import { useStorefront } from '../../../context/StorefrontContext';

const links = [
  { label: 'Home', to: '/' },
  { label: 'Shoes', to: '/category/shoes' },
  { label: 'Shirts', to: '/category/shirts' },
  { label: 'Pants', to: '/category/pants' },
  { label: 'New Arrivals', to: '/shop?sort=newest' },
  { label: 'Sale', to: '/shop?sale=true' },
  { label: 'All Products', to: '/shop' },
];

export default function MobileMenu() {
  const { menuOpen, setMenuOpen } = useStorefront();
  const location = useLocation();

  useEffect(() => {
    if (menuOpen) {
      document.body.classList.add('vibe-lock');
    } else {
      document.body.classList.remove('vibe-lock');
    }
    return () => document.body.classList.remove('vibe-lock');
  }, [menuOpen]);

  useEffect(() => {
    setMenuOpen(false);
  }, [location, setMenuOpen]);

  if (!menuOpen) return null;

  return (
    <div className="fixed inset-0 z-50 lg:hidden">
      <div
        className="absolute inset-0 bg-black/50 vibe-fade"
        onClick={() => setMenuOpen(false)}
      />
      <div className="absolute left-0 top-0 bottom-0 w-[80%] max-w-xs bg-white vibe-slide-left flex flex-col">
        <div className="flex items-center justify-between p-5 border-b border-mist">
          <span className="font-black text-2xl text-ink">VIBE</span>
          <button
            className="p-2 text-ink hover:bg-mist rounded-full"
            onClick={() => setMenuOpen(false)}
            aria-label="Close menu"
          >
            <X size={22} />
          </button>
        </div>
        <nav className="flex-1 overflow-y-auto p-5">
          <ul className="flex flex-col gap-1">
            {links.map((link) => (
              <li key={link.label}>
                <Link
                  to={link.to}
                  className="block py-3 text-[16px] font-semibold text-ink hover:text-black border-b border-mist/60"
                >
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
          <Link
            to="/login"
            className="mt-6 flex items-center justify-center bg-ink text-white text-[13px] font-semibold uppercase tracking-wider py-3.5 rounded-full"
          >
            Sign In
          </Link>
        </nav>
      </div>
    </div>
  );
}
