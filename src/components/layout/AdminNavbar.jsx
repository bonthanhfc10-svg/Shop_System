import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../../hooks/useAuth';
import { useTheme } from '../../hooks/useTheme';
import ThemeToggle from '../common/ThemeToggle';
import {
  Menu, Bell, Search, LogOut, Settings, FileText,
  ShoppingCart, Package, UserPlus, Store, ChevronDown,
} from 'lucide-react';

const notifications = [
  { id: 1, icon: ShoppingCart, title: 'New order #4521 received', detail: 'Classic White T-Shirt × 2 · $39.98', time: '2 min ago', color: '#171717', bg: '#e8e8e8' },
  { id: 2, icon: Package, title: 'Low stock alert', detail: 'Sports Running Shoes — only 4 left', time: '26 min ago', color: '#404040', bg: '#f5f5f5' },
  { id: 3, icon: UserPlus, title: 'New customer registered', detail: 'sokvannak@example.com just signed up', time: '1 hr ago', color: '#0a0a0a', bg: '#eeeeee' },
];

export default function AdminNavbar({ onToggleSidebar }) {
  const { user, logout } = useAuth();
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
    background: 'transparent', border: `1px solid transparent`,
    borderRadius: '8px', cursor: 'pointer',
    width: '36px', height: '36px', display: 'flex',
    alignItems: 'center', justifyContent: 'center',
    color: colors.textSecondary, position: 'relative', transition: 'all 0.15s', flexShrink: 0,
  };

  const menuCardStyle = {
    position: 'absolute', right: 0, top: 'calc(100% + 8px)',
    background: colors.bgModal, borderRadius: '12px',
    border: `1px solid ${colors.border}`, boxShadow: colors.shadowXl,
    minWidth: '300px', overflow: 'hidden', zIndex: 60,
  };

  const menuItemStyle = {
    display: 'flex', alignItems: 'center', gap: '10px',
    padding: '10px 14px', cursor: 'pointer', transition: 'background 0.15s',
    textDecoration: 'none', width: '100%', border: 'none', background: 'none',
    textAlign: 'left', fontFamily: 'inherit',
  };

  return (
    <header style={{
      height: '56px',
      background: `${colors.bgNavbar}ee`,
      borderBottom: `1px solid ${colors.border}`,
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'space-between',
      padding: '0 clamp(12px, 2vw, 24px)',
      position: 'sticky',
      top: 0,
      zIndex: 20,
      backdropFilter: 'blur(12px)',
      gap: '12px',
    }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: '12px', flex: 1, minWidth: 0 }}>
        <button
          onClick={onToggleSidebar}
          onMouseEnter={(e) => { e.currentTarget.style.background = colors.bgHover; e.currentTarget.style.borderColor = colors.border; }}
          onMouseLeave={(e) => { e.currentTarget.style.background = 'transparent'; e.currentTarget.style.borderColor = 'transparent'; }}
          style={iconButtonStyle}
          title="Toggle sidebar"
        >
          <Menu size={18} />
        </button>

        <div className="hide-mobile" style={{
          display: 'flex', alignItems: 'center', gap: '8px',
          background: colors.bgInput, border: `1px solid ${colors.border}`,
          borderRadius: '8px', padding: '7px 12px', width: 'min(320px, 30vw)',
          transition: 'border-color 0.15s',
        }}
          onFocus={(e) => { e.currentTarget.style.borderColor = colors.accent; }}
          onBlur={(e) => { e.currentTarget.style.borderColor = colors.border; }}
        >
          <Search size={14} color={colors.textSubtle} style={{ flexShrink: 0 }} />
          <input
            type="text"
            placeholder="Search products, orders, users..."
            style={{
              background: 'none', border: 'none', outline: 'none',
              fontSize: '12.5px', color: colors.textSecondary,
              width: '100%', fontFamily: 'inherit',
            }}
          />
          <kbd style={{
            fontSize: '10px', fontWeight: '600', color: colors.textSubtle,
            background: colors.bgBadge, border: `1px solid ${colors.borderLight}`,
            borderRadius: '5px', padding: '1px 6px', flexShrink: 0, fontFamily: 'inherit',
          }}>
            ⌘K
          </kbd>
        </div>
      </div>

      <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
        <Link
          to="/shop"
          className="hide-mobile"
          onMouseEnter={(e) => { e.currentTarget.style.background = colors.bgHover; e.currentTarget.style.borderColor = colors.border; e.currentTarget.style.color = colors.accent; }}
          onMouseLeave={(e) => { e.currentTarget.style.background = 'transparent'; e.currentTarget.style.borderColor = 'transparent'; e.currentTarget.style.color = colors.textSecondary; }}
          style={{
            ...iconButtonStyle, width: 'auto', padding: '0 12px', gap: '6px',
            fontSize: '12px', fontWeight: '600', textDecoration: 'none', color: colors.textSecondary,
          }}
          title="View storefront"
        >
          <Store size={14} />
          View Store
        </Link>

        <ThemeToggle />

        <div data-navbar-menu style={{ position: 'relative' }}>
          <button
            onClick={() => setOpenMenu((prev) => (prev === 'notifications' ? null : 'notifications'))}
            onMouseEnter={(e) => { e.currentTarget.style.background = colors.bgHover; }}
            onMouseLeave={(e) => { e.currentTarget.style.background = 'transparent'; }}
            style={{ ...iconButtonStyle, borderColor: openMenu === 'notifications' ? colors.border : 'transparent', background: openMenu === 'notifications' ? colors.bgHover : 'transparent' }}
            title="Notifications"
          >
            <Bell size={17} />
            <span style={{
              position: 'absolute', top: '6px', right: '7px',
              width: '7px', height: '7px', background: colors.danger,
              borderRadius: '50%', border: `2px solid ${colors.bgNavbar}`,
            }} />
          </button>

          {openMenu === 'notifications' && (
            <div style={menuCardStyle}>
              <div style={{
                display: 'flex', justifyContent: 'space-between', alignItems: 'center',
                padding: '12px 14px', borderBottom: `1px solid ${colors.borderLight}`,
              }}>
                <span style={{ fontSize: '13px', fontWeight: '700', color: colors.text }}>Notifications</span>
                <span style={{
                  fontSize: '10.5px', fontWeight: '600', padding: '2px 7px', borderRadius: '8px',
                  background: colors.bgDanger, color: colors.danger,
                }}>
                  3 new
                </span>
              </div>
              {notifications.map((n) => {
                const Icon = n.icon;
                return (
                  <div key={n.id} style={{ ...menuItemStyle, alignItems: 'flex-start' }}
                    onMouseEnter={(e) => { e.currentTarget.style.background = colors.bgHover; }}
                    onMouseLeave={(e) => { e.currentTarget.style.background = 'transparent'; }}
                  >
                    <div style={{
                      width: '32px', height: '32px', borderRadius: '8px', flexShrink: 0,
                      background: n.bg, display: 'flex', alignItems: 'center', justifyContent: 'center',
                    }}>
                      <Icon size={14} color={n.color} />
                    </div>
                    <div style={{ flex: 1, minWidth: 0 }}>
                      <p style={{ margin: 0, fontSize: '12.5px', fontWeight: '600', color: colors.text }}>{n.title}</p>
                      <p style={{ margin: '2px 0 0', fontSize: '11.5px', color: colors.textMuted }}>{n.detail}</p>
                      <p style={{ margin: '3px 0 0', fontSize: '10.5px', color: colors.textSubtle }}>{n.time}</p>
                    </div>
                  </div>
                );
              })}
              <button
                onClick={() => setOpenMenu(null)}
                style={{
                  display: 'block', width: '100%', padding: '10px',
                  background: colors.bgHover, color: colors.accent,
                  fontSize: '12px', fontWeight: '600', cursor: 'pointer', fontFamily: 'inherit',
                }}
              >
                Mark all as read
              </button>
            </div>
          )}
        </div>

        <div className="hide-mobile" style={{
          width: '1px', height: '24px', background: colors.border, margin: '0 2px',
        }} />

        <div data-navbar-menu style={{ position: 'relative' }}>
          <button
            onClick={() => setOpenMenu((prev) => (prev === 'profile' ? null : 'profile'))}
            onMouseEnter={(e) => { e.currentTarget.style.background = colors.bgHover; }}
            onMouseLeave={(e) => { e.currentTarget.style.background = openMenu === 'profile' ? colors.bgHover : 'transparent'; }}
            style={{
              display: 'flex', alignItems: 'center', gap: '8px',
              padding: '4px 6px', borderRadius: '10px', cursor: 'pointer',
              border: 'none', background: openMenu === 'profile' ? colors.bgHover : 'transparent',
              transition: 'background 0.15s', fontFamily: 'inherit',
            }}
          >
            <div style={{
              width: '32px', height: '32px', borderRadius: '8px',
              background: colors.gradientPrimary, color: '#fff',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              fontSize: '13px', fontWeight: '700', letterSpacing: '-0.02em',
              boxShadow: '0 2px 6px rgba(0,0,0,0.2)', flexShrink: 0,
            }}>
              {user?.name?.charAt(0) || 'A'}
            </div>
            <div className="hide-mobile" style={{ textAlign: 'left' }}>
              <div style={{ fontSize: '12.5px', fontWeight: '600', color: colors.text, lineHeight: '1.2' }}>
                {user?.name || 'Admin'}
              </div>
              <div style={{ fontSize: '10.5px', color: colors.textSubtle }}>Administrator</div>
            </div>
            <ChevronDown size={13} color={colors.textSubtle} className="hide-mobile" style={{
              transform: openMenu === 'profile' ? 'rotate(180deg)' : 'rotate(0deg)',
              transition: 'transform 0.2s',
            }} />
          </button>

          {openMenu === 'profile' && (
            <div style={{ ...menuCardStyle, minWidth: '220px' }}>
              <div style={{ padding: '12px 14px', borderBottom: `1px solid ${colors.borderLight}` }}>
                <p style={{ margin: 0, fontSize: '13px', fontWeight: '700', color: colors.text }}>
                  {user?.name || 'Admin'}
                </p>
                <p style={{ margin: '2px 0 0', fontSize: '11.5px', color: colors.textMuted }}>
                  {user?.email || 'admin@vibeshop.com'}
                </p>
              </div>
              <div style={{ padding: '5px' }}>
                <Link to="/admin/settings" onClick={() => setOpenMenu(null)}
                  style={{ ...menuItemStyle, borderRadius: '6px', color: colors.textSecondary }}
                  onMouseEnter={(e) => { e.currentTarget.style.background = colors.bgHover; }}
                  onMouseLeave={(e) => { e.currentTarget.style.background = 'transparent'; }}
                >
                  <Settings size={15} /> Profile Settings
                </Link>
                <Link to="/admin/logs" onClick={() => setOpenMenu(null)}
                  style={{ ...menuItemStyle, borderRadius: '6px', color: colors.textSecondary }}
                  onMouseEnter={(e) => { e.currentTarget.style.background = colors.bgHover; }}
                  onMouseLeave={(e) => { e.currentTarget.style.background = 'transparent'; }}
                >
                  <FileText size={15} /> System Logs
                </Link>
              </div>
              <div style={{ padding: '5px', borderTop: `1px solid ${colors.borderLight}` }}>
                <button
                  onClick={() => { setOpenMenu(null); logout(); }}
                  style={{ ...menuItemStyle, borderRadius: '6px', color: colors.danger }}
                  onMouseEnter={(e) => { e.currentTarget.style.background = colors.bgDanger; }}
                  onMouseLeave={(e) => { e.currentTarget.style.background = 'transparent'; }}
                >
                  <LogOut size={15} /> Sign out
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </header>
  );
}
