import { useState, useEffect } from 'react';
import { Link, NavLink } from 'react-router-dom';
import { useAuth } from '../../hooks/useAuth';
import { useCart } from '../../hooks/useCart';
import { useTheme } from '../../hooks/useTheme';
import ThemeToggle from '../common/ThemeToggle';
import {
  Menu, ShoppingCart, Heart, Bell, LogOut, LogIn, UserPlus,
  LayoutDashboard, Package, Settings, ChevronDown,
} from 'lucide-react';

const navLinks = [
  { label: 'Home', to: '/', end: true },
  { label: 'Shop', to: '/shop' },
];

export default function UserNavbar({ onToggleSidebar }) {
  const { user, logout } = useAuth();
  const { cartCount } = useCart();
  const { colors } = useTheme();
  const [openMenu, setOpenMenu] = useState(null);

  useEffect(() => {
    if (!openMenu) return undefined;
    const handleClickOutside = (e) => {
      if (!e.target.closest('[data-navbar-menu]')) setOpenMenu(null);
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [openMenu]);

  const iconButtonStyle = {
    background: 'none', border: 'none', cursor: 'pointer',
    position: 'relative', color: colors.textSecondary, padding: '8px',
    borderRadius: '10px', display: 'flex', alignItems: 'center', justifyContent: 'center',
    transition: 'all 0.2s', flexShrink: 0,
  };

  const badgeStyle = {
    position: 'absolute', top: '1px', right: '0px',
    minWidth: '17px', height: '17px', padding: '0 4px',
    background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
    color: '#fff', fontSize: '10.5px', fontWeight: '700',
    borderRadius: '9px', display: 'flex', alignItems: 'center', justifyContent: 'center',
    border: `2px solid ${colors.bgNavbar}`, boxSizing: 'content-box',
  };

  const menuCardStyle = {
    position: 'absolute', right: 0, top: 'calc(100% + 10px)',
    background: colors.bgModal, borderRadius: '14px',
    border: `1px solid ${colors.border}`, boxShadow: colors.shadowXl,
    minWidth: '230px', overflow: 'hidden', zIndex: 60,
  };

  const menuItemStyle = {
    display: 'flex', alignItems: 'center', gap: '12px',
    padding: '11px 14px', borderRadius: '8px', cursor: 'pointer',
    transition: 'background 0.15s', textDecoration: 'none', width: '100%',
    border: 'none', background: 'none', textAlign: 'left',
    fontSize: '13px', fontWeight: '500', color: colors.textSecondary, fontFamily: 'inherit',
  };

  return (
    <header style={{
      height: '64px',
      background: `${colors.bgNavbar}ee`,
      borderBottom: `1px solid ${colors.border}`,
      backdropFilter: 'blur(12px)',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'space-between',
      gap: '12px',
      padding: '0 clamp(12px, 2vw, 20px)',
      position: 'sticky',
      top: 0,
      zIndex: 20,
    }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
        <button
          onClick={onToggleSidebar}
          onMouseEnter={(e) => { e.currentTarget.style.background = colors.bgHover; }}
          onMouseLeave={(e) => { e.currentTarget.style.background = 'none'; }}
          style={iconButtonStyle}
          title="Toggle menu"
        >
          <Menu size={22} />
        </button>
        <Link to="/" style={{
          textDecoration: 'none', fontSize: '18px', fontWeight: '700',
          color: colors.text, letterSpacing: '-0.02em', whiteSpace: 'nowrap',
        }}>
          🏪 Kh-Shop
        </Link>

        <nav className="hide-mobile" style={{ display: 'flex', alignItems: 'center', gap: '4px', marginLeft: '16px' }}>
          {navLinks.map((link) => (
            <NavLink
              key={link.to}
              to={link.to}
              end={link.end}
              style={({ isActive }) => ({
                padding: '7px 14px', borderRadius: '9px', textDecoration: 'none',
                fontSize: '13.5px', fontWeight: isActive ? '600' : '500',
                color: isActive ? colors.textOnAccent : colors.textMuted,
                background: isActive ? colors.bgNavActive : 'transparent',
                transition: 'all 0.15s',
              })}
              onMouseEnter={(e) => { e.currentTarget.style.background = colors.bgHover; }}
              onMouseLeave={(e) => {
                const isActive = e.currentTarget.getAttribute('aria-current') === 'page';
                e.currentTarget.style.background = isActive ? colors.bgNavActive : 'transparent';
              }}
            >
              {link.label}
            </NavLink>
          ))}
        </nav>
      </div>

      <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
        <ThemeToggle />

        <Link
          to="/cart"
          onMouseEnter={(e) => { e.currentTarget.style.background = colors.bgHover; }}
          onMouseLeave={(e) => { e.currentTarget.style.background = 'none'; }}
          style={iconButtonStyle}
          title="Shopping cart"
        >
          <ShoppingCart size={20} />
          {cartCount > 0 && (
            <span style={badgeStyle}>
              {cartCount > 99 ? '99+' : cartCount}
            </span>
          )}
        </Link>

        {user ? (
          <>
            <Link
              to="/user/wishlist"
              className="hide-mobile"
              onMouseEnter={(e) => { e.currentTarget.style.background = colors.bgHover; }}
              onMouseLeave={(e) => { e.currentTarget.style.background = 'none'; }}
              style={iconButtonStyle}
              title="Wishlist"
            >
              <Heart size={19} />
            </Link>

            <Link
              to="/user/notifications"
              className="hide-mobile"
              onMouseEnter={(e) => { e.currentTarget.style.background = colors.bgHover; }}
              onMouseLeave={(e) => { e.currentTarget.style.background = 'none'; }}
              style={iconButtonStyle}
              title="Notifications"
            >
              <Bell size={19} />
              <span style={{
                position: 'absolute', top: '6px', right: '6px',
                width: '8px', height: '8px', background: '#ef4444',
                borderRadius: '50%', border: `2px solid ${colors.bgNavbar}`,
              }} />
            </Link>

            <div data-navbar-menu style={{ position: 'relative' }}>
              <button
                onClick={() => setOpenMenu((prev) => (prev === 'profile' ? null : 'profile'))}
                onMouseEnter={(e) => { e.currentTarget.style.background = colors.bgHover; }}
                onMouseLeave={(e) => { e.currentTarget.style.background = openMenu === 'profile' ? colors.bgHover : 'none'; }}
                style={{
                  display: 'flex', alignItems: 'center', gap: '8px',
                  padding: '5px', paddingRight: '8px', borderRadius: '24px',
                  cursor: 'pointer', border: 'none',
                  background: openMenu === 'profile' ? colors.bgHover : 'none',
                  transition: 'background 0.2s', fontFamily: 'inherit',
                }}
              >
                <div style={{
                  width: '34px', height: '34px', borderRadius: '50%',
                  background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                  color: '#fff', display: 'flex',
                  alignItems: 'center', justifyContent: 'center',
                  fontSize: '14px', fontWeight: '600', flexShrink: 0,
                  boxShadow: '0 2px 8px rgba(102,126,234,0.3)',
                }}>
                  {user?.name?.charAt(0) || 'U'}
                </div>
                <span className="hide-mobile" style={{ fontSize: '13.5px', fontWeight: '600', color: colors.text }}>
                  {user?.name || 'User'}
                </span>
                <ChevronDown size={14} color={colors.textSubtle} style={{
                  transform: openMenu === 'profile' ? 'rotate(180deg)' : 'rotate(0deg)',
                  transition: 'transform 0.2s',
                }} />
              </button>

              {openMenu === 'profile' && (
                <div style={menuCardStyle}>
                  <div style={{ padding: '14px 16px', borderBottom: `1px solid ${colors.borderLight}` }}>
                    <p style={{ margin: 0, fontSize: '13.5px', fontWeight: '700', color: colors.text }}>
                      {user?.name || 'User'}
                    </p>
                    <p style={{ margin: '2px 0 0', fontSize: '12px', color: colors.textMuted }}>
                      {user?.email || 'user@khshop.com'}
                    </p>
                  </div>
                  <div style={{ padding: '6px' }}>
                    <Link to="/user" onClick={() => setOpenMenu(null)} style={menuItemStyle}
                      onMouseEnter={(e) => { e.currentTarget.style.background = colors.bgHover; }}
                      onMouseLeave={(e) => { e.currentTarget.style.background = 'transparent'; }}
                    >
                      <LayoutDashboard size={16} /> My Dashboard
                    </Link>
                    <Link to="/user/orders" onClick={() => setOpenMenu(null)} style={menuItemStyle}
                      onMouseEnter={(e) => { e.currentTarget.style.background = colors.bgHover; }}
                      onMouseLeave={(e) => { e.currentTarget.style.background = 'transparent'; }}
                    >
                      <Package size={16} /> My Orders
                    </Link>
                    <Link to="/user/wishlist" onClick={() => setOpenMenu(null)} style={menuItemStyle}
                      onMouseEnter={(e) => { e.currentTarget.style.background = colors.bgHover; }}
                      onMouseLeave={(e) => { e.currentTarget.style.background = 'transparent'; }}
                    >
                      <Heart size={16} /> Wishlist
                    </Link>
                    <Link to="/user/profile" onClick={() => setOpenMenu(null)} style={menuItemStyle}
                      onMouseEnter={(e) => { e.currentTarget.style.background = colors.bgHover; }}
                      onMouseLeave={(e) => { e.currentTarget.style.background = 'transparent'; }}
                    >
                      <Settings size={16} /> Profile Settings
                    </Link>
                  </div>
                  <div style={{ padding: '6px', borderTop: `1px solid ${colors.borderLight}` }}>
                    <button onClick={() => { setOpenMenu(null); logout(); }} style={{ ...menuItemStyle, color: colors.danger }}
                      onMouseEnter={(e) => { e.currentTarget.style.background = colors.bgDanger; }}
                      onMouseLeave={(e) => { e.currentTarget.style.background = 'transparent'; }}
                    >
                      <LogOut size={16} /> Sign out
                    </button>
                  </div>
                </div>
              )}
            </div>
          </>
        ) : (
          <>
            <Link to="/auth/login" style={{
              display: 'inline-flex', alignItems: 'center', gap: '6px',
              padding: '7px 14px', borderRadius: '9px', textDecoration: 'none',
              fontSize: '13px', fontWeight: '600', color: colors.textSecondary,
              border: `1px solid ${colors.border}`, transition: 'all 0.2s',
            }}
              onMouseEnter={(e) => { e.currentTarget.style.background = colors.bgHover; }}
              onMouseLeave={(e) => { e.currentTarget.style.background = 'transparent'; }}
            >
              <LogIn size={14} />
              <span className="hide-mobile">Login</span>
            </Link>
            <Link to="/auth/register" style={{
              display: 'inline-flex', alignItems: 'center', gap: '6px',
              padding: '7px 14px', borderRadius: '9px', textDecoration: 'none',
              fontSize: '13px', fontWeight: '600', color: '#fff',
              background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
              boxShadow: '0 2px 8px rgba(102,126,234,0.3)',
              transition: 'all 0.2s',
            }}
              onMouseEnter={(e) => { e.currentTarget.style.opacity = '0.9'; e.currentTarget.style.transform = 'translateY(-1px)'; }}
              onMouseLeave={(e) => { e.currentTarget.style.opacity = '1'; e.currentTarget.style.transform = 'translateY(0)'; }}
            >
              <UserPlus size={14} />
              <span className="hide-mobile">Register</span>
            </Link>
          </>
        )}
      </div>
    </header>
  );
}
