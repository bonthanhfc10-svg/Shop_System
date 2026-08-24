import { NavLink } from 'react-router-dom';
import { useTheme } from '../../hooks/useTheme';
import { useAuth } from '../../hooks/useAuth';
import {
  LayoutDashboard, Package, Heart, User, MapPin,
  CreditCard, Tag, Star, Bell, Headphones, X, ChevronRight,
} from 'lucide-react';

const menuItems = [
  { label: 'Dashboard', path: '/user', icon: LayoutDashboard },
  { label: 'My Orders', path: '/user/orders', icon: Package },
  { label: 'Wishlist', path: '/user/wishlist', icon: Heart },
  { label: 'Profile', path: '/user/profile', icon: User },
  { label: 'Addresses', path: '/user/addresses', icon: MapPin },
  { label: 'Payment Methods', path: '/user/payment-methods', icon: CreditCard },
  { label: 'Coupons', path: '/user/coupons', icon: Tag },
  { label: 'Reviews', path: '/user/reviews', icon: Star },
  { label: 'Notifications', path: '/user/notifications', icon: Bell },
  { label: 'Support', path: '/user/support', icon: Headphones },
];

export default function UserSidebar({ mobileOpen, onClose }) {
  const { colors } = useTheme();
  const { user } = useAuth();
  const isMobile = typeof window !== 'undefined' && window.innerWidth <= 768;

  const linkStyle = ({ isActive }) => ({
    display: 'flex',
    alignItems: 'center',
    gap: '10px',
    padding: '10px 16px',
    borderRadius: '8px',
    textDecoration: 'none',
    fontSize: '14px',
    fontWeight: isActive ? '600' : '400',
    color: isActive ? colors.textOnAccent : colors.textMuted,
    background: isActive ? colors.bgNavActive : 'transparent',
    transition: 'all 0.2s',
  });

  return (
    <>
      <div
        onClick={onClose}
        className="sidebar-overlay"
        style={{
          position: 'fixed', inset: 0, background: colors.bgOverlay,
          zIndex: 30, display: isMobile && mobileOpen ? 'block' : 'none',
        }}
      />
      <aside
        className={`sidebar-responsive ${mobileOpen ? 'sidebar-open' : ''}`}
        style={{
          width: '260px',
          minHeight: '100vh',
          background: colors.bgSidebar,
          borderRight: `1px solid ${colors.border}`,
          padding: '20px 12px',
          position: 'fixed',
          top: 0,
          left: 0,
          zIndex: 40,
          overflowY: 'auto',
          transform: mobileOpen ? 'translateX(0)' : 'translateX(-100%)',
          transition: 'transform 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '0 8px', marginBottom: '16px' }}>
          <h1 style={{ margin: 0, fontSize: '20px', fontWeight: '700', color: colors.text }}>
            🏪 Kh-Shop
          </h1>
          <button
            onClick={onClose}
            style={{
              background: 'none', border: 'none', cursor: 'pointer',
              color: colors.textMuted, padding: '4px', borderRadius: '6px',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
            }}
          >
            <X size={18} />
          </button>
        </div>

        <NavLink
          to="/user/profile"
          style={{
            display: 'flex', alignItems: 'center', gap: '12px',
            padding: '14px', borderRadius: '12px', textDecoration: 'none',
            background: `linear-gradient(135deg, ${colors.accent}10 0%, ${colors.accent}05 100%)`,
            border: `1px solid ${colors.accent}20`,
            marginBottom: '20px', transition: 'all 0.2s',
          }}
          onMouseEnter={(e) => { e.currentTarget.style.background = `linear-gradient(135deg, ${colors.accent}18 0%, ${colors.accent}08 100%)`; }}
          onMouseLeave={(e) => { e.currentTarget.style.background = `linear-gradient(135deg, ${colors.accent}10 0%, ${colors.accent}05 100%)`; }}
          onClick={onClose}
        >
          <div style={{
            width: '48px', height: '48px', borderRadius: '50%',
            background: '#000000',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            color: '#fff', fontSize: '18px', fontWeight: '700', flexShrink: 0,
            boxShadow: '0 4px 12px rgba(0,0,0,0.12)',
          }}>
            {user?.name?.charAt(0) || 'U'}
          </div>
          <div style={{ flex: 1, minWidth: 0 }}>
            <p style={{ margin: 0, fontSize: '14px', fontWeight: '600', color: colors.text, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
              {user?.name || 'User'}
            </p>
            <p style={{ margin: '2px 0 0', fontSize: '12px', color: colors.textSubtle, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
              {user?.email || 'user@example.com'}
            </p>
          </div>
          <ChevronRight size={16} color={colors.textSubtle} />
        </NavLink>

        <nav style={{ display: 'flex', flexDirection: 'column', gap: '2px' }}>
          {menuItems.map((item) => {
            const Icon = item.icon;
            return (
              <NavLink
                key={item.path}
                to={item.path}
                end={item.path === '/user'}
                style={linkStyle}
                onClick={onClose}
              >
                <Icon size={18} />
                {item.label}
              </NavLink>
            );
          })}
        </nav>
      </aside>
    </>
  );
}
