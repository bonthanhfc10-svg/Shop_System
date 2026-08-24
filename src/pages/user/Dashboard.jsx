import { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { formatCurrency } from '../../utils/formatCurrency';
import { formatDate } from '../../utils/formatDate';
import { useTheme } from '../../hooks/useTheme';
import { useAuth } from '../../hooks/useAuth';
import {
  ShoppingCart, Heart, Clock, Package,
  Eye, ChevronRight, Truck, CheckCircle2, AlertCircle,
  MapPin, User, Headphones, Tag, Gift, Star,
} from 'lucide-react';

const statsCards = [
  { label: 'Total Orders', value: '23', icon: ShoppingCart, gradient: '#000000', shadowColor: 'rgba(0,0,0,0.12)' },
  { label: 'Total Spent', value: '$1,432.50', icon: Tag, gradient: '#262626', shadowColor: 'rgba(0,0,0,0.3)' },
  { label: 'Wishlist Items', value: '8', icon: Heart, gradient: '#404040', shadowColor: 'rgba(0,0,0,0.3)' },
  { label: 'Pending Orders', value: '3', icon: Clock, gradient: '#404040', shadowColor: 'rgba(0,0,0,0.3)' },
];

const recentOrders = [
  { id: 'ORD-7891', date: '2026-08-16', total: 129.99, items: 3, status: 'delivered' },
  { id: 'ORD-7870', date: '2026-08-10', total: 89.50, items: 2, status: 'shipped' },
  { id: 'ORD-7855', date: '2026-08-05', total: 245.00, items: 5, status: 'processing' },
  { id: 'ORD-7840', date: '2026-07-28', total: 67.25, items: 1, status: 'delivered' },
  { id: 'ORD-7830', date: '2026-07-20', total: 198.00, items: 4, status: 'delivered' },
];

const statusConfig = {
  pending: { bg: '#f5f5f5', text: '#525252', icon: AlertCircle, color: '#0a0a0a' },
  processing: { bg: '#eeeeee', text: '#262626', icon: Clock, color: '#0a0a0a' },
  shipped: { bg: '#e8e8e8', text: '#0a0a0a', icon: Truck, color: '#171717' },
  delivered: { bg: '#e8e8e8', text: '#0a0a0a', icon: CheckCircle2, color: '#171717' },
  cancelled: { bg: '#f0f0f0', text: '#737373', icon: null, color: '#0a0a0a' },
};

const quickLinks = [
  { label: 'Continue Shopping', icon: ShoppingCart, path: '/shop', gradient: '#000000' },
  { label: 'View All Orders', icon: Package, path: '/user/orders', gradient: '#262626' },
  { label: 'My Wishlist', icon: Heart, path: '/user/wishlist', gradient: '#404040' },
  { label: 'Update Profile', icon: User, path: '/user/profile', gradient: '#404040' },
  { label: 'My Addresses', icon: MapPin, path: '/user/addresses', gradient: '#171717' },
  { label: 'Get Support', icon: Headphones, path: '/user/support', gradient: '#404040' },
];

const recommendedProducts = [
  { id: 1, name: 'Wireless Earbuds Pro', price: 59.99, image: '🎧', rating: 4.5 },
  { id: 2, name: 'Smart Fitness Band', price: 39.99, image: '⌚', rating: 4.2 },
  { id: 3, name: 'Portable Charger 20000mAh', price: 29.99, image: '🔋', rating: 4.7 },
  { id: 4, name: 'Laptop Sleeve 15.6"', price: 24.99, image: '💻', rating: 4.3 },
];

const recentNotifications = [
  { message: 'Your order ORD-7891 has been delivered', time: '2 hours ago', type: 'success', icon: CheckCircle2 },
  { message: 'New coupon "SAVE20" available for you', time: '5 hours ago', type: 'info', icon: Gift },
  { message: 'Your order ORD-7870 has been shipped', time: '1 day ago', type: 'info', icon: Truck },
  { message: 'Flash sale: Up to 50% off on electronics', time: '2 days ago', type: 'promo', icon: Tag },
];

const notificationColors = {
  success: { bg: '#e8e8e8', icon: '#171717', border: '#e5e5e5' },
  info: { bg: '#f2f2f2', icon: '#404040', border: '#e5e5e5' },
  promo: { bg: '#f5f5f5', icon: '#0a0a0a', border: '#e5e5e5' },
};

const orderStatusCounts = { delivered: 15, shipped: 4, processing: 2, pending: 2 };

function StatCard({ stat, index }) {
  const { colors } = useTheme();
  const Icon = stat.icon;
  return (
    <div
      className="dash-stat-card"
      style={{
        background: colors.bgCard,
        borderRadius: '16px',
        padding: '24px',
        border: `1px solid ${colors.border}`,
        flex: '1 1 200px',
        position: 'relative',
        overflow: 'hidden',
        transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
        cursor: 'default',
      }}
      onMouseEnter={(e) => {
        e.currentTarget.style.transform = 'translateY(-4px)';
        e.currentTarget.style.boxShadow = `0 20px 40px ${stat.shadowColor}`;
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.transform = 'translateY(0)';
        e.currentTarget.style.boxShadow = 'none';
      }}
    >
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '16px' }}>
        <div style={{
          width: '52px', height: '52px', borderRadius: '14px',
          background: stat.gradient, display: 'flex', alignItems: 'center',
          justifyContent: 'center', boxShadow: `0 8px 20px ${stat.shadowColor}`,
        }}>
          <Icon size={24} color="#fff" strokeWidth={2} />
        </div>
      </div>
      <div>
        <p style={{ margin: 0, fontSize: '13px', color: colors.textMuted, fontWeight: '500', marginBottom: '4px' }}>
          {stat.label}
        </p>
        <p style={{ margin: 0, fontSize: '28px', fontWeight: '700', color: colors.text, letterSpacing: '-0.02em', lineHeight: '1.2' }}>
          {stat.value}
        </p>
      </div>
    </div>
  );
}

function WelcomeBanner({ user }) {
  const hour = new Date().getHours();
  const greeting = hour < 12 ? 'Good morning' : hour < 18 ? 'Good afternoon' : 'Good evening';

  return (
    <div style={{
      background: '#000000',
      borderRadius: '16px', padding: 'clamp(24px, 3vw, 36px)',
      color: '#fff', position: 'relative', overflow: 'hidden',
    }}>
      <div style={{ position: 'relative', zIndex: 1 }}>
        <h1 style={{ margin: 0, fontSize: 'clamp(20px, 3vw, 26px)', fontWeight: '700', letterSpacing: '-0.01em' }}>
          {greeting}, {user?.name || 'Customer'}!
        </h1>
        <p style={{ margin: '8px 0 20px', fontSize: 'clamp(13px, 2vw, 15px)', opacity: 0.9, maxWidth: '520px' }}>
          Welcome to your personal dashboard. Track your orders, manage your wishlist, and discover new products.
        </p>
        <div style={{ display: 'flex', gap: '12px', flexWrap: 'wrap' }}>
          <Link to="/shop" style={{
            display: 'inline-flex', alignItems: 'center', gap: '6px',
            padding: '10px 22px', borderRadius: '10px', background: '#fff',
            color: '#0a0a0a', fontSize: '13px', fontWeight: '600', textDecoration: 'none',
            transition: 'all 0.2s',
          }}
            onMouseEnter={(e) => { e.currentTarget.style.transform = 'translateY(-1px)'; e.currentTarget.style.boxShadow = '0 8px 24px rgba(0,0,0,0.15)'; }}
            onMouseLeave={(e) => { e.currentTarget.style.transform = 'translateY(0)'; e.currentTarget.style.boxShadow = 'none'; }}
          >
            <ShoppingCart size={15} /> Start Shopping
          </Link>
          <Link to="/user/orders" style={{
            display: 'inline-flex', alignItems: 'center', gap: '6px',
            padding: '10px 22px', borderRadius: '10px', background: 'rgba(255,255,255,0.2)',
            color: '#fff', fontSize: '13px', fontWeight: '600', textDecoration: 'none',
            backdropFilter: 'blur(4px)', border: '1px solid rgba(255,255,255,0.15)',
            transition: 'all 0.2s',
          }}
            onMouseEnter={(e) => { e.currentTarget.style.background = 'rgba(255,255,255,0.3)'; }}
            onMouseLeave={(e) => { e.currentTarget.style.background = 'rgba(255,255,255,0.2)'; }}
          >
            <Eye size={15} /> View Orders
          </Link>
        </div>
      </div>
      <div style={{ position: 'absolute', top: '-40px', right: '-40px', width: '180px', height: '180px', borderRadius: '50%', background: 'rgba(255,255,255,0.08)' }} />
      <div style={{ position: 'absolute', bottom: '-50px', right: '80px', width: '130px', height: '130px', borderRadius: '50%', background: 'rgba(255,255,255,0.05)' }} />
      <div style={{ position: 'absolute', top: '20px', right: '200px', width: '80px', height: '80px', borderRadius: '50%', background: 'rgba(255,255,255,0.04)' }} />
    </div>
  );
}

function RecentOrders() {
  const { colors } = useTheme();
  return (
    <div style={{
      background: colors.bgCard, borderRadius: '16px', padding: '24px',
      border: `1px solid ${colors.border}`,
    }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
        <div>
          <h3 style={{ margin: 0, fontSize: '16px', fontWeight: '700', color: colors.text, letterSpacing: '-0.01em' }}>Recent Orders</h3>
          <p style={{ margin: '4px 0 0', fontSize: '13px', color: colors.textSubtle }}>Your latest purchases</p>
        </div>
        <Link to="/user/orders" style={{
          fontSize: '13px', color: colors.accent, textDecoration: 'none', fontWeight: '600',
          display: 'flex', alignItems: 'center', gap: '4px',
        }}>
          View All <ChevronRight size={14} />
        </Link>
      </div>
      <div style={{ overflowX: 'auto' }}>
        <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '13.5px', minWidth: '500px' }}>
          <thead>
            <tr>
              {['Order', 'Date', 'Items', 'Amount', 'Status'].map((h) => (
                <th key={h} style={{
                  textAlign: 'left', padding: '10px 14px',
                  fontSize: '11.5px', fontWeight: '600', color: colors.textSubtle,
                  textTransform: 'uppercase', letterSpacing: '0.06em',
                  borderBottom: `1px solid ${colors.border}`,
                }}>
                  {h}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {recentOrders.map((order) => {
              const cfg = statusConfig[order.status] || statusConfig.pending;
              const StatusIcon = cfg.icon;
              return (
                <tr key={order.id} style={{ borderBottom: `1px solid ${colors.borderLight}` }}>
                  <td style={{ padding: '14px', fontWeight: '600', color: colors.accent, fontSize: '13px' }}>
                    {order.id}
                  </td>
                  <td style={{ padding: '14px', color: colors.textMuted }}>{formatDate(order.date)}</td>
                  <td style={{ padding: '14px', color: colors.textSecondary, fontWeight: '500' }}>
                    {order.items} item{order.items > 1 ? 's' : ''}
                  </td>
                  <td style={{ padding: '14px', fontWeight: '600', color: colors.text }}>
                    {formatCurrency(order.total)}
                  </td>
                  <td style={{ padding: '14px' }}>
                    <span style={{
                      display: 'inline-flex', alignItems: 'center', gap: '5px',
                      padding: '5px 12px', borderRadius: '8px', fontSize: '12px', fontWeight: '600',
                      background: cfg.bg, color: cfg.text, textTransform: 'capitalize',
                    }}>
                      {StatusIcon && <StatusIcon size={12} />}
                      {order.status}
                    </span>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
}

function OrderStatusOverview() {
  const { colors } = useTheme();
  const total = Object.values(orderStatusCounts).reduce((a, b) => a + b, 0);
  const statusOrder = ['delivered', 'shipped', 'processing', 'pending'];
  const cx = 100, cy = 100, r = 72, stroke = 18;
  const circumference = 2 * Math.PI * r;
  let cumulativeOffset = 0;

  return (
    <div style={{
      background: colors.bgCard, borderRadius: '16px', padding: '24px',
      border: `1px solid ${colors.border}`,
    }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '24px' }}>
        <div>
          <h3 style={{ margin: 0, fontSize: '16px', fontWeight: '700', color: colors.text, letterSpacing: '-0.01em' }}>Order Status</h3>
          <p style={{ margin: '4px 0 0', fontSize: '13px', color: colors.textSubtle }}>{total} total orders</p>
        </div>
        <Link to="/user/orders" style={{
          fontSize: '13px', color: colors.accent, textDecoration: 'none', fontWeight: '600',
          display: 'flex', alignItems: 'center', gap: '4px',
        }}>
          Details <ChevronRight size={14} />
        </Link>
      </div>
      <div style={{ display: 'flex', alignItems: 'center', gap: '24px', flexWrap: 'wrap', justifyContent: 'center' }}>
        <div style={{ position: 'relative', width: '180px', height: '180px', flexShrink: 0 }}>
          <svg viewBox="0 0 200 200" style={{ width: '100%', height: '100%', transform: 'rotate(-90deg)' }}>
            <circle cx={cx} cy={cy} r={r} fill="none" stroke={colors.bgHover} strokeWidth={stroke} />
            {statusOrder.map((status) => {
              const count = orderStatusCounts[status];
              const pct = count / total;
              const dashLen = pct * circumference;
              const dashOffset = -cumulativeOffset;
              cumulativeOffset += dashLen;
              return (
                <circle
                  key={status}
                  cx={cx} cy={cy} r={r}
                  fill="none"
                  stroke={statusConfig[status].color}
                  strokeWidth={stroke}
                  strokeDasharray={`${dashLen} ${circumference - dashLen}`}
                  strokeDashoffset={dashOffset}
                  strokeLinecap="round"
                  style={{ transition: 'stroke-dasharray 0.6s cubic-bezier(0.4,0,0.2,1)' }}
                />
              );
            })}
          </svg>
          <div style={{
            position: 'absolute', inset: 0, display: 'flex', flexDirection: 'column',
            alignItems: 'center', justifyContent: 'center',
          }}>
            <span style={{ fontSize: '28px', fontWeight: '800', color: colors.text, lineHeight: '1' }}>{total}</span>
            <span style={{ fontSize: '11px', color: colors.textSubtle, fontWeight: '500', marginTop: '2px' }}>orders</span>
          </div>
        </div>
        <div style={{ flex: 1, minWidth: '180px', display: 'flex', flexDirection: 'column', gap: '10px' }}>
          {statusOrder.map((status) => {
            const cfg = statusConfig[status];
            const StatusIcon = cfg.icon;
            const count = orderStatusCounts[status];
            const pct = ((count / total) * 100).toFixed(1);
            return (
              <div key={status} style={{
                display: 'flex', alignItems: 'center', gap: '10px',
                padding: '10px 12px', borderRadius: '10px',
                background: colors.bgHover, border: `1px solid ${colors.borderLight}`,
                transition: 'all 0.15s',
              }}
                onMouseEnter={(e) => { e.currentTarget.style.background = colors.bgAccent; }}
                onMouseLeave={(e) => { e.currentTarget.style.background = colors.bgHover; }}
              >
                <div style={{
                  width: '32px', height: '32px', borderRadius: '8px',
                  background: cfg.bg, display: 'flex', alignItems: 'center',
                  justifyContent: 'center', flexShrink: 0,
                }}>
                  <StatusIcon size={15} color={cfg.color} />
                </div>
                <div style={{ flex: 1, minWidth: 0 }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <span style={{ fontSize: '12.5px', color: colors.textSecondary, textTransform: 'capitalize', fontWeight: '500' }}>{status}</span>
                    <span style={{ fontSize: '13px', fontWeight: '700', color: colors.text }}>{count}</span>
                  </div>
                  <div style={{ height: '4px', background: colors.border, borderRadius: '2px', overflow: 'hidden', marginTop: '5px' }}>
                    <div style={{
                      height: '100%', borderRadius: '2px',
                      width: `${pct}%`, background: cfg.color,
                      transition: 'width 0.6s cubic-bezier(0.4,0,0.2,1)',
                    }} />
                  </div>
                </div>
                <span style={{ fontSize: '11px', fontWeight: '600', color: colors.textMuted, minWidth: '36px', textAlign: 'right' }}>{pct}%</span>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}

function QuickLinks() {
  const { colors } = useTheme();
  return (
    <div style={{
      background: colors.bgCard, borderRadius: '16px', padding: '24px',
      border: `1px solid ${colors.border}`,
    }}>
      <h3 style={{ margin: '0 0 20px', fontSize: '16px', fontWeight: '700', color: colors.text, letterSpacing: '-0.01em' }}>Quick Links</h3>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(140px, 1fr))', gap: '10px' }}>
        {quickLinks.map((link) => {
          const Icon = link.icon;
          return (
            <Link
              key={link.label}
              to={link.path}
              style={{
                display: 'flex', alignItems: 'center', gap: '12px',
                padding: '14px', borderRadius: '12px', textDecoration: 'none',
                border: `1px solid ${colors.border}`, transition: 'all 0.25s cubic-bezier(0.4, 0, 0.2, 1)',
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.transform = 'translateY(-2px)';
                e.currentTarget.style.boxShadow = colors.shadowMd;
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = 'translateY(0)';
                e.currentTarget.style.boxShadow = 'none';
              }}
            >
              <div style={{
                width: '40px', height: '40px', borderRadius: '10px',
                background: link.gradient, display: 'flex',
                alignItems: 'center', justifyContent: 'center', flexShrink: 0,
              }}>
                <Icon size={18} color="#fff" strokeWidth={2} />
              </div>
              <span style={{ fontSize: '13px', fontWeight: '600', color: colors.textSecondary }}>{link.label}</span>
            </Link>
          );
        })}
      </div>
    </div>
  );
}

function Notifications() {
  const { colors } = useTheme();
  return (
    <div style={{
      background: colors.bgCard, borderRadius: '16px', padding: '24px',
      border: `1px solid ${colors.border}`,
    }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
        <div>
          <h3 style={{ margin: 0, fontSize: '16px', fontWeight: '700', color: colors.text, letterSpacing: '-0.01em' }}>Recent Notifications</h3>
          <p style={{ margin: '4px 0 0', fontSize: '13px', color: colors.textSubtle }}>Stay updated on your orders</p>
        </div>
        <Link to="/user/notifications" style={{
          fontSize: '13px', color: colors.accent, textDecoration: 'none', fontWeight: '600',
          display: 'flex', alignItems: 'center', gap: '4px',
        }}>
          View All <ChevronRight size={14} />
        </Link>
      </div>
      <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
        {recentNotifications.map((notif, i) => {
          const nColors = notificationColors[notif.type] || notificationColors.info;
          const NotifIcon = notif.icon;
          return (
            <div key={i} style={{
              display: 'flex', gap: '12px', padding: '12px 14px',
              borderRadius: '10px', background: nColors.bg,
              border: `1px solid ${nColors.border}`, alignItems: 'flex-start',
              transition: 'all 0.15s',
            }}
              onMouseEnter={(e) => { e.currentTarget.style.transform = 'translateX(2px)'; }}
              onMouseLeave={(e) => { e.currentTarget.style.transform = 'translateX(0)'; }}
            >
              <div style={{
                width: '32px', height: '32px', borderRadius: '8px',
                background: `${nColors.icon}18`, display: 'flex', alignItems: 'center',
                justifyContent: 'center', flexShrink: 0,
              }}>
                <NotifIcon size={15} color={nColors.icon} />
              </div>
              <div style={{ flex: 1, minWidth: 0 }}>
                <p style={{ margin: 0, fontSize: '13px', color: colors.textSecondary, fontWeight: '500' }}>{notif.message}</p>
                <span style={{ fontSize: '11px', color: colors.textSubtle, marginTop: '4px', display: 'block' }}>{notif.time}</span>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

function RecommendedProducts() {
  const { colors } = useTheme();
  return (
    <div style={{
      background: colors.bgCard, borderRadius: '16px', padding: '24px',
      border: `1px solid ${colors.border}`,
    }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
        <div>
          <h3 style={{ margin: 0, fontSize: '16px', fontWeight: '700', color: colors.text, letterSpacing: '-0.01em' }}>Recommended For You</h3>
          <p style={{ margin: '4px 0 0', fontSize: '13px', color: colors.textSubtle }}>Based on your browsing history</p>
        </div>
        <Link to="/shop" style={{
          fontSize: '13px', color: colors.accent, textDecoration: 'none', fontWeight: '600',
          display: 'flex', alignItems: 'center', gap: '4px',
        }}>
          Browse Shop <ChevronRight size={14} />
        </Link>
      </div>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(160px, 1fr))', gap: '14px' }}>
        {recommendedProducts.map((product) => (
          <Link
            key={product.id}
            to={`/shop/products/${product.id}`}
            style={{
              display: 'flex', flexDirection: 'column', alignItems: 'center',
              padding: '20px 16px', borderRadius: '12px', textDecoration: 'none',
              border: `1px solid ${colors.border}`, transition: 'all 0.25s cubic-bezier(0.4, 0, 0.2, 1)',
              textAlign: 'center',
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.transform = 'translateY(-4px)';
              e.currentTarget.style.boxShadow = colors.shadowLg;
              e.currentTarget.style.borderColor = colors.accent;
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.transform = 'translateY(0)';
              e.currentTarget.style.boxShadow = 'none';
              e.currentTarget.style.borderColor = colors.border;
            }}
          >
            <span style={{ fontSize: '40px', marginBottom: '12px' }}>{product.image}</span>
            <p style={{ margin: '0 0 6px', fontSize: '13px', fontWeight: '600', color: colors.text, lineHeight: '1.3' }}>
              {product.name}
            </p>
            <div style={{ display: 'flex', alignItems: 'center', gap: '4px', marginBottom: '6px' }}>
              {[...Array(5)].map((_, i) => (
                <Star key={i} size={11} color={i < Math.floor(product.rating) ? '#737373' : colors.border} fill={i < Math.floor(product.rating) ? '#737373' : 'none'} />
              ))}
              <span style={{ fontSize: '11px', color: colors.textSubtle, marginLeft: '2px' }}>{product.rating}</span>
            </div>
            <span style={{ fontSize: '15px', fontWeight: '700', color: colors.accent }}>
              {formatCurrency(product.price)}
            </span>
          </Link>
        ))}
      </div>
    </div>
  );
}

export default function UserDashboard() {
  const { user } = useAuth();

  return (
    <div>
      <WelcomeBanner user={user} />

      <div style={{ marginTop: '28px', display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '16px' }}>
        {statsCards.map((stat, index) => (
          <StatCard key={stat.label} stat={stat} index={index} />
        ))}
      </div>

      <div className="grid-2col-responsive" style={{ marginTop: '28px' }}>
        <RecentOrders />
        <OrderStatusOverview />
      </div>

      <div className="grid-2col-responsive" style={{ marginTop: '28px' }}>
        <RecommendedProducts />
        <Notifications />
      </div>

      <div style={{ marginTop: '28px' }}>
        <QuickLinks />
      </div>
    </div>
  );
}
