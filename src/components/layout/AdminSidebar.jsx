import { NavLink } from 'react-router-dom';
import { useTheme } from '../../hooks/useTheme';
import {
  LayoutDashboard, Package, Tag, Building2, Palette, Ruler,
  ShoppingCart, CreditCard, Users, Ticket, Star, Heart,
  FileText, Settings, TrendingUp, X,
} from 'lucide-react';

const menuGroups = [
  {
    label: 'Overview',
    items: [
      { label: 'Dashboard', path: '/admin', icon: LayoutDashboard },
    ],
  },
  {
    label: 'Catalog',
    items: [
      { label: 'Products', path: '/admin/products', icon: Package },
      { label: 'Categories', path: '/admin/categories', icon: Tag },
      { label: 'Brands', path: '/admin/brands', icon: Building2 },
      { label: 'Colors', path: '/admin/colors', icon: Palette },
      { label: 'Sizes', path: '/admin/sizes', icon: Ruler },
    ],
  },
  {
    label: 'Sales',
    items: [
      { label: 'Orders', path: '/admin/orders', icon: ShoppingCart },
      { label: 'Payments', path: '/admin/payments', icon: CreditCard },
      { label: 'Coupons', path: '/admin/coupons', icon: Ticket },
    ],
  },
  {
    label: 'Customers',
    items: [
      { label: 'Users', path: '/admin/users', icon: Users },
      { label: 'Reviews', path: '/admin/reviews', icon: Star },
      { label: 'Wishlists', path: '/admin/wishlists', icon: Heart },
    ],
  },
  {
    label: 'System',
    items: [
      { label: 'Logs', path: '/admin/logs', icon: FileText },
      { label: 'Settings', path: '/admin/settings', icon: Settings },
    ],
  },
];

export default function AdminSidebar({ expanded, onClose }) {
  const { colors } = useTheme();

  const linkStyle = ({ isActive }) => ({
    display: 'flex',
    alignItems: 'center',
    gap: '10px',
    padding: '9px 14px',
    borderRadius: '10px',
    textDecoration: 'none',
    fontSize: '13px',
    fontWeight: isActive ? '600' : '450',
    color: isActive ? colors.accent : colors.textMuted,
    background: isActive ? colors.bgAccent : 'transparent',
    transition: 'all 0.15s ease',
    width: '100%',
  });

  return (
    <>
      <div
        onClick={onClose}
        className="sidebar-overlay"
        style={{
          position: 'fixed', inset: 0, background: colors.bgOverlay,
          zIndex: 30, backdropFilter: 'blur(4px)',
          display: expanded ? 'block' : 'none',
        }}
      />
      <aside
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
          overflowX: 'hidden',
          display: 'flex',
          flexDirection: 'column',
          transition: 'transform 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
          transform: expanded ? 'translateX(0)' : 'translateX(-100%)',
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '0 8px', marginBottom: '24px' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
            <div style={{
              width: '36px', height: '36px', borderRadius: '10px',
              background: colors.gradientPrimary,
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              boxShadow: '0 2px 8px rgba(99,102,241,0.3)',
              flexShrink: 0,
            }}>
              <TrendingUp size={18} color="#fff" strokeWidth={2.5} />
            </div>
            <div>
              <h1 style={{ margin: 0, fontSize: '17px', fontWeight: '700', color: colors.text, letterSpacing: '-0.02em' }}>
                Kh-Shop
              </h1>
              <span style={{ fontSize: '11px', color: colors.textSubtle, fontWeight: '500' }}>Admin Panel</span>
            </div>
          </div>
          <button
            onClick={onClose}
            style={{
              background: 'none', border: 'none', cursor: 'pointer',
              color: colors.textSecondary, padding: '6px',
              borderRadius: '8px', display: 'flex',
              alignItems: 'center', justifyContent: 'center',
            }}
          >
            <X size={18} />
          </button>
        </div>

        <nav style={{ display: 'flex', flexDirection: 'column', gap: '4px', flex: 1 }}>
          {menuGroups.map((group) => (
            <div key={group.label}>
              <p style={{
                margin: '16px 0 6px', padding: '0 14px',
                fontSize: '10.5px', fontWeight: '700', color: colors.textSubtle,
                textTransform: 'uppercase', letterSpacing: '0.1em',
              }}>
                {group.label}
              </p>
              {group.items.map((item) => {
                const Icon = item.icon;
                return (
                  <NavLink
                    key={item.path}
                    to={item.path}
                    end={item.path === '/admin'}
                    style={linkStyle}
                    onClick={onClose}
                  >
                    <Icon size={18} strokeWidth={1.8} style={{ flexShrink: 0 }} />
                    <span>{item.label}</span>
                  </NavLink>
                );
              })}
            </div>
          ))}
        </nav>

        <div style={{
          marginTop: '16px', padding: '16px', borderRadius: '12px',
          background: colors.bgHover,
          border: `1px solid ${colors.borderLight}`,
        }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '8px' }}>
            <div style={{
              width: '8px', height: '8px', borderRadius: '50%',
              background: colors.success, boxShadow: `0 0 6px ${colors.success}40`,
            }} />
            <span style={{ fontSize: '12px', fontWeight: '600', color: colors.textSecondary }}>System Active</span>
          </div>
          <p style={{ margin: 0, fontSize: '11.5px', color: colors.textSubtle, lineHeight: '1.5' }}>
            All services running smoothly
          </p>
        </div>
      </aside>
    </>
  );
}
