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
  { id: 1, icon: ShoppingCart, title: 'New order #2841 received', detail: 'Wireless Headphones × 2 · $159.98', time: '2 min ago', color: '#059669', bg: '#ecfdf5' },
  { id: 2, icon: Package, title: 'Low stock alert', detail: 'Wireless Mouse — only 4 left', time: '26 min ago', color: '#d97706', bg: '#fffbeb' },
  { id: 3, icon: UserPlus, title: 'New customer registered', detail: 'fiona@example.com just signed up', time: '1 hr ago', color: '#4f46e5', bg: '#eef2ff' },
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
    borderRadius: '10px', cursor: 'pointer',
    width: '38px', height: '38px', display: 'flex',
    alignItems: 'center', justifyContent: 'center',
    color: colors.textSecondary, position: 'relative', transition: 'all 0.15s', flexShrink: 0,
  };

  const menuCardStyle = {
    position: 'absolute', right: 0, top: 'calc(100% + 10px)',
    background: colors.bgModal, borderRadius: '14px',
    border: `1px solid ${colors.border}`, boxShadow: colors.shadowXl,
    minWidth: '320px', overflow: 'hidden', zIndex: 60,
  };

  const menuItemStyle = {
    display: 'flex', alignItems: 'center', gap: '12px',
    padding: '11px 16px', cursor: 'pointer', transition: 'background 0.15s',
    textDecoration: 'none', width: '100%', border: 'none', background: 'none',
    textAlign: 'left', fontFamily: 'inherit',
  };

  return (
    <header style={{
      height: '64px',
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
      <div style={{ display: 'flex', alignItems: 'center', gap: '14px', flex: 1, minWidth: 0 }}>
        <button
          onClick={onToggleSidebar}
          onMouseEnter={(e) => { e.currentTarget.style.background = colors.bgHover; e.currentTarget.style.borderColor = colors.border; }}
          onMouseLeave={(e) => { e.currentTarget.style.background = 'transparent'; e.currentTarget.style.borderColor = 'transparent'; }}
          style={iconButtonStyle}
          title="Toggle sidebar"
        >
          <Menu size={19} />
        </button>

        <div className="hide-mobile" style={{
          display: 'flex', alignItems: 'center', gap: '10px',
          background: colors.bgInput, border: `1px solid ${colors.border}`,
          borderRadius: '10px', padding: '9px 14px', width: 'min(340px, 32vw)',
          transition: 'border-color 0.15s',
        }}
          onFocus={(e) => { e.currentTarget.style.borderColor = colors.accent; }}
          onBlur={(e) => { e.currentTarget.style.borderColor = colors.border; }}
        >
          <Search size={15} color={colors.textSubtle} style={{ flexShrink: 0 }} />
          <input
            type="text"
            placeholder="Search products, orders, users..."
            style={{
              background: 'none', border: 'none', outline: 'none',
              fontSize: '13px', color: colors.textSecondary,
              width: '100%', fontFamily: 'inherit',
            }}
          />
          <kbd style={{
            fontSize: '10.5px', fontWeight: '600', color: colors.textSubtle,
            background: colors.bgBadge, border: `1px solid ${colors.borderLight}`,
            borderRadius: '6px', padding: '2px 7px', flexShrink: 0, fontFamily: 'inherit',
          }}>
            ⌘K
          </kbd>
        </div>
      </div>

      <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
        <Link
          to="/shop"
          className="hide-mobile"
          onMouseEnter={(e) => { e.currentTarget.style.background = colors.bgHover; e.currentTarget.style.borderColor = colors.border; e.currentTarget.style.color = colors.accent; }}
          onMouseLeave={(e) => { e.currentTarget.style.background = 'transparent'; e.currentTarget.style.borderColor = 'transparent'; e.currentTarget.style.color = colors.textSecondary; }}
          style={{
            ...iconButtonStyle, width: 'auto', padding: '0 14px', gap: '7px',
            fontSize: '12.5px', fontWeight: '600', textDecoration: 'none', color: colors.textSecondary,
          }}
          title="View storefront"
        >
          <Store size={15} />
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
            <Bell size={18} />
            <span style={{
              position: 'absolute', top: '7px', right: '8px',
              width: '8px', height: '8px', background: colors.danger,
              borderRadius: '50%', border: `2px solid ${colors.bgNavbar}`,
            }} />
          </button>

          {openMenu === 'notifications' && (
            <div style={menuCardStyle}>
              <div style={{
                display: 'flex', justifyContent: 'space-between', alignItems: 'center',
                padding: '14px 16px', borderBottom: `1px solid ${colors.borderLight}`,
              }}>
                <span style={{ fontSize: '13.5px', fontWeight: '700', color: colors.text }}>Notifications</span>
                <span style={{
                  fontSize: '11px', fontWeight: '600', padding: '2px 8px', borderRadius: '10px',
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
                      width: '34px', height: '34px', borderRadius: '10px', flexShrink: 0,
                      background: n.bg, display: 'flex', alignItems: 'center', justifyContent: 'center',
                    }}>
                      <Icon size={16} color={n.color} />
                    </div>
                    <div style={{ flex: 1, minWidth: 0 }}>
                      <p style={{ margin: 0, fontSize: '13px', fontWeight: '600', color: colors.text }}>{n.title}</p>
                      <p style={{ margin: '2px 0 0', fontSize: '12px', color: colors.textMuted }}>{n.detail}</p>
                      <p style={{ margin: '3px 0 0', fontSize: '11px', color: colors.textSubtle }}>{n.time}</p>
                    </div>
                  </div>
                );
              })}
              <button
                onClick={() => setOpenMenu(null)}
                style={{
                  display: 'block', width: '100%', padding: '11px',
                  background: colors.bgHover, color: colors.accent,
                  fontSize: '12.5px', fontWeight: '600', cursor: 'pointer', fontFamily: 'inherit',
                }}
              >
                Mark all as read
              </button>
            </div>
          )}
        </div>

        <div className="hide-mobile" style={{
          width: '1px', height: '26px', background: colors.border, margin: '0 4px',
        }} />

        <div data-navbar-menu style={{ position: 'relative' }}>
          <button
            onClick={() => setOpenMenu((prev) => (prev === 'profile' ? null : 'profile'))}
            onMouseEnter={(e) => { e.currentTarget.style.background = colors.bgHover; }}
            onMouseLeave={(e) => { e.currentTarget.style.background = openMenu === 'profile' ? colors.bgHover : 'transparent'; }}
            style={{
              display: 'flex', alignItems: 'center', gap: '10px',
              padding: '5px 8px', borderRadius: '12px', cursor: 'pointer',
              border: 'none', background: openMenu === 'profile' ? colors.bgHover : 'transparent',
              transition: 'background 0.15s', fontFamily: 'inherit',
            }}
          >
            <div style={{
              width: '34px', height: '34px', borderRadius: '10px',
              background: colors.gradientPrimary, color: '#fff',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              fontSize: '13.5px', fontWeight: '700', letterSpacing: '-0.02em',
              boxShadow: '0 2px 8px rgba(99,102,241,0.25)', flexShrink: 0,
            }}>
              {user?.name?.charAt(0) || 'A'}
            </div>
            <div style={{ textAlign: 'left' }}>
              <div style={{ fontSize: '13px', fontWeight: '600', color: colors.text, lineHeight: '1.2' }}>
                {user?.name || 'Admin'}
              </div>
              <div style={{ fontSize: '11px', color: colors.textSubtle }}>Administrator</div>
            </div>
            <ChevronDown size={14} color={colors.textSubtle} style={{
              transform: openMenu === 'profile' ? 'rotate(180deg)' : 'rotate(0deg)',
              transition: 'transform 0.2s',
            }} />
          </button>

          {openMenu === 'profile' && (
            <div style={{ ...menuCardStyle, minWidth: '240px' }}>
              <div style={{ padding: '14px 16px', borderBottom: `1px solid ${colors.borderLight}` }}>
                <p style={{ margin: 0, fontSize: '13.5px', fontWeight: '700', color: colors.text }}>
                  {user?.name || 'Admin'}
                </p>
                <p style={{ margin: '2px 0 0', fontSize: '12px', color: colors.textMuted }}>
                  {user?.email || 'admin@khshop.com'}
                </p>
              </div>
              <div style={{ padding: '6px' }}>
                <Link to="/admin/settings" onClick={() => setOpenMenu(null)}
                  style={{ ...menuItemStyle, borderRadius: '8px', color: colors.textSecondary }}
                  onMouseEnter={(e) => { e.currentTarget.style.background = colors.bgHover; }}
                  onMouseLeave={(e) => { e.currentTarget.style.background = 'transparent'; }}
                >
                  <Settings size={16} /> Profile Settings
                </Link>
                <Link to="/admin/logs" onClick={() => setOpenMenu(null)}
                  style={{ ...menuItemStyle, borderRadius: '8px', color: colors.textSecondary }}
                  onMouseEnter={(e) => { e.currentTarget.style.background = colors.bgHover; }}
                  onMouseLeave={(e) => { e.currentTarget.style.background = 'transparent'; }}
                >
                  <FileText size={16} /> System Logs
                </Link>
              </div>
              <div style={{ padding: '6px', borderTop: `1px solid ${colors.borderLight}` }}>
                <button
                  onClick={() => { setOpenMenu(null); logout(); }}
                  style={{ ...menuItemStyle, borderRadius: '8px', color: colors.danger }}
                  onMouseEnter={(e) => { e.currentTarget.style.background = colors.bgDanger; }}
                  onMouseLeave={(e) => { e.currentTarget.style.background = 'transparent'; }}
                >
                  <LogOut size={16} /> Sign out
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </header>
  );
}
