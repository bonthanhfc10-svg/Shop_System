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

  return (
    <header
      className="flex items-center justify-between gap-3 sticky top-0 z-20 backdrop-blur-md"
      style={{
        height: '64px',
        background: `${colors.bgNavbar}ee`,
        borderBottom: `1px solid ${colors.border}`,
        padding: '0 clamp(12px, 2vw, 20px)',
      }}
    >
      <div className="flex items-center gap-2.5">
        <button
          onClick={onToggleSidebar}
          className="flex items-center justify-center rounded-[10px] p-2 shrink-0 cursor-pointer border-none hover:opacity-80 transition-all"
          style={{ background: 'none', color: colors.textSecondary }}
          title="Toggle menu"
        >
          <Menu size={22} />
        </button>
        <Link
          to="/"
          className="text-[18px] font-bold tracking-tight whitespace-nowrap no-underline"
          style={{ color: colors.text }}
        >
          🏪 KH Shop
        </Link>

        <nav className="hide-mobile flex items-center gap-1 ml-4">
          {navLinks.map((link) => (
            <NavLink
              key={link.to}
              to={link.to}
              end={link.end}
              className="rounded-[9px] no-underline transition-all text-[13.5px]"
              style={({ isActive }) => ({
                padding: '7px 14px',
                fontWeight: isActive ? '600' : '500',
                color: isActive ? '#ffffff' : colors.textMuted,
                background: isActive ? 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)' : 'transparent',
              })}
              onMouseEnter={(e) => {
                const isActive = e.currentTarget.getAttribute('aria-current') === 'page';
                if (!isActive) e.currentTarget.style.background = colors.bgHover;
              }}
              onMouseLeave={(e) => {
                const isActive = e.currentTarget.getAttribute('aria-current') === 'page';
                e.currentTarget.style.background = isActive ? 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)' : 'transparent';
              }}
            >
              {link.label}
            </NavLink>
          ))}
        </nav>
      </div>

      <div className="flex items-center gap-1.5">
        <ThemeToggle />

        <Link
          to="/cart"
          className="relative flex items-center justify-center rounded-[10px] p-2 shrink-0 cursor-pointer border-none hover:opacity-80 transition-all"
          style={{ background: 'none', color: colors.textSecondary }}
          title="Shopping cart"
        >
          <ShoppingCart size={20} />
          {cartCount > 0 && (
            <span
              className="absolute top-[1px] right-0 min-w-[17px] h-[17px] px-1 text-[10.5px] font-bold rounded-[9px] flex items-center justify-center text-white"
              style={{
                background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                border: `2px solid ${colors.bgNavbar}`,
                boxSizing: 'content-box',
              }}
            >
              {cartCount > 99 ? '99+' : cartCount}
            </span>
          )}
        </Link>

        {user ? (
          <>
            <Link
              to="/user/wishlist"
              className="hide-mobile flex items-center justify-center rounded-[10px] p-2 shrink-0 cursor-pointer border-none hover:opacity-80 transition-all"
              style={{ background: 'none', color: colors.textSecondary }}
              title="Wishlist"
            >
              <Heart size={19} />
            </Link>

            <Link
              to="/user/notifications"
              className="hide-mobile relative flex items-center justify-center rounded-[10px] p-2 shrink-0 cursor-pointer border-none hover:opacity-80 transition-all"
              style={{ background: 'none', color: colors.textSecondary }}
              title="Notifications"
            >
              <Bell size={19} />
              <span
                className="absolute top-[6px] right-[6px] w-2 h-2 rounded-full"
                style={{ background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)', border: `2px solid ${colors.bgNavbar}` }}
              />
            </Link>

            <div data-navbar-menu className="relative">
              <button
                onClick={() => setOpenMenu((prev) => (prev === 'profile' ? null : 'profile'))}
                className="flex items-center gap-2 rounded-3xl cursor-pointer border-none p-[5px] pr-2 transition-all font-inherit"
                style={{
                  background: openMenu === 'profile' ? 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)' : 'none',
                  color: openMenu === 'profile' ? '#ffffff' : colors.text,
                }}
                onMouseEnter={(e) => { e.currentTarget.style.background = 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)'; e.currentTarget.style.color = '#ffffff'; }}
                onMouseLeave={(e) => {
                  const isOpen = openMenu === 'profile';
                  e.currentTarget.style.background = isOpen ? 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)' : 'none';
                  e.currentTarget.style.color = isOpen ? '#ffffff' : colors.text;
                }}
              >
                <div
                  className="w-[34px] h-[34px] rounded-full flex items-center justify-center text-white text-[14px] font-semibold shrink-0"
                  style={{ background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)', boxShadow: '0 2px 8px rgba(0,0,0,0.12)' }}
                >
                  {user?.name?.charAt(0) || 'U'}
                </div>
                <span className="hide-mobile text-[13.5px] font-semibold" style={{ color: colors.text }}>
                  {user?.name || 'User'}
                </span>
                <ChevronDown
                  size={14}
                  color={colors.textSubtle}
                  style={{
                    transform: openMenu === 'profile' ? 'rotate(180deg)' : 'rotate(0deg)',
                    transition: 'transform 0.2s',
                  }}
                />
              </button>

              {openMenu === 'profile' && (
                <div
                  className="absolute right-0 min-w-[230px] rounded-[14px] overflow-hidden z-[60]"
                  style={{
                    top: 'calc(100% + 10px)',
                    background: colors.bgModal,
                    border: `1px solid ${colors.border}`,
                    boxShadow: colors.shadowXl,
                  }}
                >
                  <div className="p-3.5 px-4" style={{ borderBottom: `1px solid ${colors.borderLight}` }}>
                    <p className="m-0 text-[13.5px] font-bold" style={{ color: colors.text }}>
                      {user?.name || 'User'}
                    </p>
                    <p className="mt-0.5 text-xs" style={{ color: colors.textMuted }}>
                      {user?.email || 'user@khshop.com'}
                    </p>
                  </div>
                  <div className="p-1.5">
                    {[
                      { to: '/user', icon: LayoutDashboard, label: 'My Dashboard' },
                      { to: '/user/orders', icon: Package, label: 'My Orders' },
                      { to: '/user/wishlist', icon: Heart, label: 'Wishlist' },
                      { to: '/user/profile', icon: Settings, label: 'Profile Settings' },
                    ].map((item) => (
                      <Link
                        key={item.to}
                        to={item.to}
                        onClick={() => setOpenMenu(null)}
                        className="flex items-center gap-3 py-[11px] px-3.5 rounded-lg cursor-pointer w-full no-underline text-[13px] font-medium border-none text-left transition-all duration-150"
                        style={{ background: 'none', color: colors.textSecondary, fontFamily: 'inherit' }}
                        onMouseEnter={(e) => { e.currentTarget.style.background = 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)'; e.currentTarget.style.color = '#ffffff'; }}
                        onMouseLeave={(e) => { e.currentTarget.style.background = 'transparent'; e.currentTarget.style.color = colors.textSecondary; }}
                      >
                        <item.icon size={16} /> {item.label}
                      </Link>
                    ))}
                  </div>
                  <div className="p-1.5" style={{ borderTop: `1px solid ${colors.borderLight}` }}>
                    <button
                      onClick={() => { setOpenMenu(null); logout(); }}
                      className="flex items-center gap-3 py-[11px] px-3.5 rounded-lg cursor-pointer w-full text-[13px] font-medium border-none text-left transition-all duration-150"
                      style={{ background: 'none', color: colors.danger, fontFamily: 'inherit' }}
                      onMouseEnter={(e) => { e.currentTarget.style.background = 'linear-gradient(135deg, #ff6b6b 0%, #ee5a24 100%)'; e.currentTarget.style.color = '#ffffff'; }}
                      onMouseLeave={(e) => { e.currentTarget.style.background = 'transparent'; e.currentTarget.style.color = colors.danger; }}
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
            <Link
              to="/auth/login"
              className="inline-flex items-center gap-1.5 rounded-[9px] no-underline text-[13px] font-semibold transition-all"
              style={{
                padding: '7px 14px',
                color: colors.textSecondary,
                border: `1px solid ${colors.border}`,
              }}
              onMouseEnter={(e) => { e.currentTarget.style.background = colors.bgHover; }}
              onMouseLeave={(e) => { e.currentTarget.style.background = 'transparent'; }}
            >
              <LogIn size={14} />
              <span className="hide-mobile">Login</span>
            </Link>
            <Link
              to="/auth/register"
              className="inline-flex items-center gap-1.5 rounded-[9px] no-underline text-[13px] font-semibold text-white transition-all"
              style={{
                padding: '7px 14px',
                background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                boxShadow: '0 2px 8px rgba(0,0,0,0.12)',
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
