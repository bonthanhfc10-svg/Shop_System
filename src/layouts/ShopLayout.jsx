import { useState } from 'react';
import { Outlet, Link, useNavigate, useLocation } from 'react-router-dom';
import { useTheme } from '../hooks/useTheme';
import { useAuth } from '../hooks/useAuth';
import { useCart } from '../hooks/useCart';
import ThemeToggle from '../components/common/ThemeToggle';
import Footer from '../components/layout/Footer';
import {
  ShoppingCart, Heart, Search, Menu, X,
  LogOut, Store, Home, ShoppingBag, User,
} from 'lucide-react';

const navLinks = [
  { label: 'Home', path: '/', icon: Home },
  { label: 'Shop', path: '/shop', icon: ShoppingBag },
];

export default function ShopLayout() {
  const { colors } = useTheme();
  const { user, logout } = useAuth();
  const { cartCount } = useCart();
  const navigate = useNavigate();
  const location = useLocation();
  const [menuOpen, setMenuOpen] = useState(false);
  const [search, setSearch] = useState('');

  const handleSearch = (e) => {
    e.preventDefault();
    if (search.trim()) {
      navigate(`/shop?q=${encodeURIComponent(search.trim())}`);
      setSearch('');
    }
  };

  return (
    <div style={{ minHeight: '100vh', background: colors.bg, display: 'flex', flexDirection: 'column' }}>
      <header style={{
        background: colors.bgNavbar, borderBottom: `1px solid ${colors.border}`,
        position: 'sticky', top: 0, zIndex: 30,
      }}>
        <div style={{
          maxWidth: '1280px', margin: '0 auto', padding: '0 clamp(12px, 3vw, 32px)',
          display: 'flex', alignItems: 'center', justifyContent: 'space-between', height: '64px',
        }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '24px' }}>
            <Link to="/" style={{ textDecoration: 'none', display: 'flex', alignItems: 'center', gap: '8px' }}>
              <div style={{
                width: '36px', height: '36px', borderRadius: '10px',
                background: colors.gradientPrimary, display: 'flex',
                alignItems: 'center', justifyContent: 'center',
              }}>
                <Store size={18} color="#fff" />
              </div>
              <span style={{ fontSize: '20px', fontWeight: '700', color: colors.text }}>KH Shop</span>
            </Link>
            <nav className="hide-mobile" style={{ display: 'flex', gap: '4px' }}>
              {navLinks.map((link) => (
                <Link key={link.path} to={link.path} style={{
                  padding: '8px 16px', borderRadius: '8px', textDecoration: 'none',
                  fontSize: '14px', fontWeight: '500',
                  color: location.pathname === link.path ? '#ffffff' : colors.textMuted,
                  background: location.pathname === link.path ? 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)' : 'transparent',
                  transition: 'all 0.15s',
                }}>
                  {link.label}
                </Link>
              ))}
            </nav>
          </div>

          <form onSubmit={handleSearch} className="hide-mobile" style={{
            flex: '0 1 400px', display: 'flex', alignItems: 'center', gap: '8px',
            padding: '8px 14px', borderRadius: '10px',
            background: colors.bgInput, border: `1px solid ${colors.borderInput}`,
          }}>
            <Search size={16} color={colors.textSubtle} />
            <input
              type="text"
              placeholder="Search products..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              style={{
                border: 'none', outline: 'none', background: 'transparent',
                fontSize: '14px', color: colors.text, width: '100%',
              }}
            />
          </form>

          <div style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
            <ThemeToggle />
            <Link to="/user/wishlist" style={{
              padding: '8px', borderRadius: '8px', color: colors.textSecondary,
              display: 'flex', alignItems: 'center', textDecoration: 'none',
              transition: 'all 0.15s',
            }}
              onMouseEnter={(e) => { e.currentTarget.style.background = colors.bgHover; }}
              onMouseLeave={(e) => { e.currentTarget.style.background = 'transparent'; }}
            >
              <Heart size={20} />
            </Link>
            <Link to="/user/orders" style={{
              padding: '8px', borderRadius: '8px', color: colors.textSecondary,
              display: 'flex', alignItems: 'center', textDecoration: 'none',
              position: 'relative', transition: 'all 0.15s',
            }}
              onMouseEnter={(e) => { e.currentTarget.style.background = colors.bgHover; }}
              onMouseLeave={(e) => { e.currentTarget.style.background = 'transparent'; }}
            >
              <ShoppingCart size={20} />
              <span style={{
                position: 'absolute', top: '2px', right: '2px',
                width: '16px', height: '16px', borderRadius: '50%',
                background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)', color: '#fff',
                fontSize: '10px', fontWeight: '700',
                display: 'flex', alignItems: 'center', justifyContent: 'center',
              }}>{cartCount || 0}</span>
            </Link>

            {user ? (
              <div className="hide-mobile" style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                <Link to={user.role === 'admin' ? '/admin' : '/user'} style={{
                  display: 'flex', alignItems: 'center', gap: '8px',
                  padding: '6px 12px', borderRadius: '10px', textDecoration: 'none',
                  transition: 'all 0.15s',
                }}
                  onMouseEnter={(e) => { e.currentTarget.style.background = colors.bgHover; }}
                  onMouseLeave={(e) => { e.currentTarget.style.background = 'transparent'; }}
                >
                  <div style={{
                    width: '32px', height: '32px', borderRadius: '50%',
                    background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                    color: '#fff', display: 'flex', alignItems: 'center', justifyContent: 'center',
                    fontSize: '13px', fontWeight: '600',
                  }}>
                    {user.name?.charAt(0) || 'U'}
                  </div>
                  <span style={{ fontSize: '14px', fontWeight: '500', color: colors.text }}>
                    {user.name}
                  </span>
                </Link>
                <button
                  onClick={() => { logout(); navigate('/'); }}
                  style={{
                    background: 'none', border: 'none', cursor: 'pointer',
                    color: colors.textMuted, padding: '6px', borderRadius: '6px',
                    display: 'flex', alignItems: 'center',
                  }}
                  onMouseEnter={(e) => { e.currentTarget.style.color = colors.danger; }}
                  onMouseLeave={(e) => { e.currentTarget.style.color = colors.textMuted; }}
                >
                  <LogOut size={18} />
                </button>
              </div>
            ) : (
              <div className="hide-mobile" style={{ display: 'flex', gap: '8px' }}>
                <Link to="/auth/login" style={{
                  padding: '8px 16px', borderRadius: '8px', textDecoration: 'none',
                  fontSize: '13px', fontWeight: '600', color: colors.textSecondary,
                  border: `1px solid ${colors.border}`, transition: 'all 0.15s',
                }}
                  onMouseEnter={(e) => { e.currentTarget.style.background = colors.bgHover; }}
                  onMouseLeave={(e) => { e.currentTarget.style.background = 'transparent'; }}
                >
                  Login
                </Link>
                <Link to="/auth/register" style={{
                  padding: '8px 16px', borderRadius: '8px', textDecoration: 'none',
                  fontSize: '13px', fontWeight: '600', color: '#fff',
                  background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)', transition: 'all 0.15s',
                }}>
                  Register
                </Link>
              </div>
            )}

            <button
              className="show-mobile"
              onClick={() => setMenuOpen(!menuOpen)}
              style={{
                background: 'none', border: 'none', cursor: 'pointer',
                color: colors.textSecondary, padding: '6px',
                alignItems: 'center', justifyContent: 'center',
              }}
            >
              {menuOpen ? <X size={22} /> : <Menu size={22} />}
            </button>
          </div>
        </div>

        {menuOpen && (
          <div style={{
            padding: '12px clamp(16px, 3vw, 32px)', borderTop: `1px solid ${colors.border}`,
            display: 'flex', flexDirection: 'column', gap: '8px',
            background: colors.bgNavbar,
          }}>
            <form onSubmit={handleSearch} style={{
              display: 'flex', alignItems: 'center', gap: '8px',
              padding: '10px 14px', borderRadius: '10px',
              background: colors.bgInput, border: `1px solid ${colors.borderInput}`,
            }}>
              <Search size={16} color={colors.textSubtle} />
              <input
                type="text"
                placeholder="Search products..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                style={{
                  border: 'none', outline: 'none', background: 'transparent',
                  fontSize: '14px', color: colors.text, width: '100%',
                }}
              />
            </form>
            {navLinks.map((link) => (
              <Link key={link.path} to={link.path} onClick={() => setMenuOpen(false)} style={{
                padding: '10px 14px', borderRadius: '8px', textDecoration: 'none',
                fontSize: '14px', fontWeight: '500',
                color: location.pathname === link.path ? '#ffffff' : colors.textSecondary,
                background: location.pathname === link.path ? 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)' : 'transparent',
              }}>
                <span style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                  <link.icon size={16} />
                  {link.label}
                </span>
              </Link>
            ))}
            {user ? (
              <>
                <Link
                  to={user.role === 'admin' ? '/admin' : '/user'}
                  onClick={() => setMenuOpen(false)}
                  style={{
                    padding: '10px 14px', borderRadius: '8px', textDecoration: 'none',
                    fontSize: '14px', fontWeight: '500', color: colors.textSecondary,
                    display: 'flex', alignItems: 'center', gap: '10px',
                    transition: 'all 0.15s',
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.background = 'linear-gradient(135deg, #667eea15 0%, #764ba215 100%)';
                    e.currentTarget.style.color = colors.text;
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.background = 'transparent';
                    e.currentTarget.style.color = colors.textSecondary;
                  }}
                >
                  <User size={16} />
                  Dashboard
                </Link>
                <button
                  onClick={() => { logout(); setMenuOpen(false); navigate('/'); }}
                  style={{
                    padding: '10px 14px', borderRadius: '8px',
                    fontSize: '14px', fontWeight: '500', color: colors.danger,
                    background: 'none', border: 'none', cursor: 'pointer',
                    display: 'flex', alignItems: 'center', gap: '10px', textAlign: 'left',
                    width: '100%',
                  }}
                >
                  <LogOut size={16} />
                  Logout
                </button>
              </>
            ) : (
              <>
                <Link to="/auth/login" onClick={() => setMenuOpen(false)} style={{
                  padding: '10px 14px', borderRadius: '8px', textDecoration: 'none',
                  fontSize: '14px', fontWeight: '500', color: colors.textSecondary,
                  display: 'flex', alignItems: 'center', gap: '10px',
                  transition: 'all 0.15s',
                }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.background = 'linear-gradient(135deg, #667eea15 0%, #764ba215 100%)';
                    e.currentTarget.style.color = colors.text;
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.background = 'transparent';
                    e.currentTarget.style.color = colors.textSecondary;
                  }}
                >
                  Login
                </Link>
                <Link to="/auth/register" onClick={() => setMenuOpen(false)} style={{
                  padding: '10px 14px', borderRadius: '8px', textDecoration: 'none',
                  fontSize: '14px', fontWeight: '500', color: '#fff',
                  background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                  display: 'flex', alignItems: 'center', gap: '10px', textAlign: 'center',
                  justifyContent: 'center', transition: 'all 0.15s',
                }}>
                  Register
                </Link>
              </>
            )}
          </div>
        )}
      </header>

      <main style={{ flex: 1 }}>
        <Outlet />
      </main>

      <Footer />
    </div>
  );
}
