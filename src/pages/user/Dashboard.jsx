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
  { label: 'Total Orders', value: '23', icon: ShoppingCart, gradient: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)', shadowColor: 'rgba(102,126,234,0.2)' },
  { label: 'Total Spent', value: '$1,432.50', icon: Tag, gradient: 'linear-gradient(135deg, #f093fb 0%, #f5576c 100%)', shadowColor: 'rgba(245,87,108,0.2)' },
  { label: 'Wishlist Items', value: '8', icon: Heart, gradient: 'linear-gradient(135deg, #4facfe 0%, #00f2fe 100%)', shadowColor: 'rgba(79,172,254,0.2)' },
  { label: 'Pending Orders', value: '3', icon: Clock, gradient: 'linear-gradient(135deg, #43e97b 0%, #38f9d7 100%)', shadowColor: 'rgba(67,233,123,0.2)' },
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
  { label: 'Continue Shopping', icon: ShoppingCart, path: '/shop', gradient: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)' },
  { label: 'View All Orders', icon: Package, path: '/user/orders', gradient: 'linear-gradient(135deg, #f093fb 0%, #f5576c 100%)' },
  { label: 'My Wishlist', icon: Heart, path: '/user/wishlist', gradient: 'linear-gradient(135deg, #4facfe 0%, #00f2fe 100%)' },
  { label: 'Update Profile', icon: User, path: '/user/profile', gradient: 'linear-gradient(135deg, #43e97b 0%, #38f9d7 100%)' },
  { label: 'My Addresses', icon: MapPin, path: '/user/addresses', gradient: 'linear-gradient(135deg, #fa709a 0%, #fee140 100%)' },
  { label: 'Get Support', icon: Headphones, path: '/user/support', gradient: 'linear-gradient(135deg, #a18cd1 0%, #fbc2eb 100%)' },
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

function WelcomeBanner({ user }) {
  const hour = new Date().getHours();
  const greeting = hour < 12 ? 'Good morning' : hour < 18 ? 'Good afternoon' : 'Good evening';

  return (
    <div
      className="relative overflow-hidden rounded-2xl p-6 sm:p-8 lg:p-9 text-white"
      style={{ background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)' }}
    >
      <div className="relative z-10">
        <h1 className="text-xl sm:text-2xl lg:text-[26px] font-bold tracking-tight m-0">
          {greeting}, {user?.name || 'Customer'}!
        </h1>
        <p className="text-xs sm:text-sm lg:text-[15px] mt-2 sm:mt-3 mb-5 sm:mb-6 opacity-90 max-w-[520px]">
          Welcome to your personal dashboard. Track your orders, manage your wishlist, and discover new products.
        </p>
        <div className="flex gap-3 flex-wrap">
          <Link
            to="/shop"
            className="inline-flex items-center gap-1.5 px-5 py-2.5 rounded-xl text-xs sm:text-sm font-semibold no-underline transition-all duration-200"
            style={{ background: '#fff', color: '#0a0a0a' }}
            onMouseEnter={(e) => { e.currentTarget.style.transform = 'translateY(-1px)'; e.currentTarget.style.boxShadow = '0 8px 24px rgba(0,0,0,0.15)'; }}
            onMouseLeave={(e) => { e.currentTarget.style.transform = 'translateY(0)'; e.currentTarget.style.boxShadow = 'none'; }}
          >
            <ShoppingCart size={15} /> Start Shopping
          </Link>
          <Link
            to="/user/orders"
            className="inline-flex items-center gap-1.5 px-5 py-2.5 rounded-xl text-xs sm:text-sm font-semibold no-underline transition-all duration-200"
            style={{ background: 'rgba(255,255,255,0.2)', border: '1px solid rgba(255,255,255,0.15)', backdropFilter: 'blur(4px)' }}
            onMouseEnter={(e) => { e.currentTarget.style.background = 'rgba(255,255,255,0.3)'; }}
            onMouseLeave={(e) => { e.currentTarget.style.background = 'rgba(255,255,255,0.2)'; }}
          >
            <Eye size={15} /> View Orders
          </Link>
        </div>
      </div>
      <div className="absolute -top-10 -right-10 w-44 h-44 rounded-full" style={{ background: 'rgba(255,255,255,0.08)' }} />
      <div className="absolute -bottom-12 right-20 w-32 h-32 rounded-full" style={{ background: 'rgba(255,255,255,0.05)' }} />
      <div className="absolute top-5 right-48 w-20 h-20 rounded-full" style={{ background: 'rgba(255,255,255,0.04)' }} />
    </div>
  );
}

function StatCard({ stat }) {
  const { colors } = useTheme();
  const Icon = stat.icon;
  return (
    <div
      className="dash-stat-card rounded-2xl p-4 sm:p-6 border relative overflow-hidden transition-all duration-300 cursor-default"
      style={{ background: colors.bgCard, borderColor: colors.border }}
      onMouseEnter={(e) => {
        e.currentTarget.style.transform = 'translateY(-4px)';
        e.currentTarget.style.boxShadow = `0 20px 40px ${stat.shadowColor}`;
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.transform = 'translateY(0)';
        e.currentTarget.style.boxShadow = 'none';
      }}
    >
      <div className="flex justify-between items-start mb-3 sm:mb-4">
        <div
          className="w-11 h-11 sm:w-[52px] sm:h-[52px] rounded-[12px] sm:rounded-[14px] flex items-center justify-center shrink-0"
          style={{ background: stat.gradient, boxShadow: `0 8px 20px ${stat.shadowColor}` }}
        >
          <Icon size={20} className="sm:hidden" color="#fff" strokeWidth={2} />
          <Icon size={24} className="hidden sm:block" color="#fff" strokeWidth={2} />
        </div>
      </div>
      <div>
        <p className="m-0 text-[12px] sm:text-[13px] mb-1 font-medium" style={{ color: colors.textMuted }}>
          {stat.label}
        </p>
        <p className="m-0 text-xl sm:text-[28px] font-bold tracking-tight leading-tight" style={{ color: colors.text }}>
          {stat.value}
        </p>
      </div>
    </div>
  );
}

function RecentOrders() {
  const { colors } = useTheme();
  return (
    <div className="rounded-2xl p-4 sm:p-6 border" style={{ background: colors.bgCard, borderColor: colors.border }}>
      <div className="flex justify-between items-center mb-4 sm:mb-5">
        <div>
          <h3 className="m-0 text-sm sm:text-base font-bold tracking-tight" style={{ color: colors.text }}>Recent Orders</h3>
          <p className="mt-1 m-0 text-xs" style={{ color: colors.textSubtle }}>Your latest purchases</p>
        </div>
        <Link to="/user/orders" className="text-xs sm:text-[13px] font-semibold no-underline flex items-center gap-1" style={{ color: colors.accent }}>
          View All <ChevronRight size={14} />
        </Link>
      </div>

      {/* Desktop Table */}
      <div className="hidden sm:block overflow-x-auto">
        <table className="w-full border-collapse text-[13px]">
          <thead>
            <tr>
              {['Order', 'Date', 'Items', 'Amount', 'Status'].map((h) => (
                <th key={h} className="text-left py-2.5 px-3.5 text-[11px] font-semibold uppercase tracking-wider" style={{ color: colors.textSubtle, borderBottom: `1px solid ${colors.border}` }}>
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
                  <td className="py-3.5 px-3.5 font-semibold" style={{ color: colors.accent }}>{order.id}</td>
                  <td className="py-3.5 px-3.5" style={{ color: colors.textMuted }}>{formatDate(order.date)}</td>
                  <td className="py-3.5 px-3.5 font-medium" style={{ color: colors.textSecondary }}>
                    {order.items} item{order.items > 1 ? 's' : ''}
                  </td>
                  <td className="py-3.5 px-3.5 font-semibold" style={{ color: colors.text }}>{formatCurrency(order.total)}</td>
                  <td className="py-3.5 px-3.5">
                    <span className="inline-flex items-center gap-1.5 py-1.5 px-3 rounded-lg text-xs font-semibold capitalize" style={{ background: cfg.bg, color: cfg.text }}>
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

      {/* Mobile Cards */}
      <div className="flex flex-col gap-2.5 sm:hidden">
        {recentOrders.map((order) => {
          const cfg = statusConfig[order.status] || statusConfig.pending;
          const StatusIcon = cfg.icon;
          return (
            <div
              key={order.id}
              className="flex items-center gap-3 p-3 rounded-xl transition-all"
              style={{ background: colors.bgHover, border: `1px solid ${colors.borderLight}` }}
            >
              <div className="flex-1 min-w-0">
                <div className="flex items-center justify-between gap-2">
                  <span className="text-xs font-semibold" style={{ color: colors.accent }}>{order.id}</span>
                  <span className="inline-flex items-center gap-1 py-0.5 px-2 rounded text-[10px] font-semibold capitalize" style={{ background: cfg.bg, color: cfg.text }}>
                    {StatusIcon && <StatusIcon size={10} />}
                    {order.status}
                  </span>
                </div>
                <div className="flex items-center justify-between mt-1.5">
                  <span className="text-[11px]" style={{ color: colors.textMuted }}>{formatDate(order.date)}</span>
                  <span className="text-xs font-semibold" style={{ color: colors.text }}>{formatCurrency(order.total)}</span>
                </div>
              </div>
            </div>
          );
        })}
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
    <div className="rounded-2xl p-4 sm:p-6 border" style={{ background: colors.bgCard, borderColor: colors.border }}>
      <div className="flex justify-between items-center mb-5 sm:mb-6">
        <div>
          <h3 className="m-0 text-sm sm:text-base font-bold tracking-tight" style={{ color: colors.text }}>Order Status</h3>
          <p className="mt-1 m-0 text-xs" style={{ color: colors.textSubtle }}>{total} total orders</p>
        </div>
        <Link to="/user/orders" className="text-xs sm:text-[13px] font-semibold no-underline flex items-center gap-1" style={{ color: colors.accent }}>
          Details <ChevronRight size={14} />
        </Link>
      </div>
      <div className="flex flex-col sm:flex-row items-center gap-5 sm:gap-6">
        <div className="relative w-36 h-36 sm:w-44 sm:h-44 shrink-0">
          <svg viewBox="0 0 200 200" className="w-full h-full" style={{ transform: 'rotate(-90deg)' }}>
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
          <div className="absolute inset-0 flex flex-col items-center justify-center">
            <span className="text-2xl sm:text-[28px] font-extrabold leading-none" style={{ color: colors.text }}>{total}</span>
            <span className="text-[10px] sm:text-[11px] font-medium mt-0.5" style={{ color: colors.textSubtle }}>orders</span>
          </div>
        </div>
        <div className="flex-1 w-full sm:w-auto flex flex-col gap-2.5">
          {statusOrder.map((status) => {
            const cfg = statusConfig[status];
            const StatusIcon = cfg.icon;
            const count = orderStatusCounts[status];
            const pct = ((count / total) * 100).toFixed(1);
            return (
              <div
                key={status}
                className="flex items-center gap-2.5 p-2.5 sm:p-3 rounded-xl transition-all"
                style={{ background: colors.bgHover, border: `1px solid ${colors.borderLight}` }}
                onMouseEnter={(e) => { e.currentTarget.style.background = colors.bgAccent; }}
                onMouseLeave={(e) => { e.currentTarget.style.background = colors.bgHover; }}
              >
                <div className="w-8 h-8 rounded-lg flex items-center justify-center shrink-0" style={{ background: cfg.bg }}>
                  <StatusIcon size={14} color={cfg.color} />
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex justify-between items-center">
                    <span className="text-[11px] sm:text-xs capitalize font-medium" style={{ color: colors.textSecondary }}>{status}</span>
                    <span className="text-xs sm:text-[13px] font-bold" style={{ color: colors.text }}>{count}</span>
                  </div>
                  <div className="h-1 rounded-full mt-1.5 overflow-hidden" style={{ background: colors.border }}>
                    <div
                      className="h-full rounded-full transition-all duration-500"
                      style={{ width: `${pct}%`, background: cfg.color }}
                    />
                  </div>
                </div>
                <span className="text-[10px] sm:text-[11px] font-semibold min-w-[36px] text-right" style={{ color: colors.textMuted }}>{pct}%</span>
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
    <div className="rounded-2xl p-4 sm:p-6 border" style={{ background: colors.bgCard, borderColor: colors.border }}>
      <h3 className="m-0 mb-4 sm:mb-5 text-sm sm:text-base font-bold tracking-tight" style={{ color: colors.text }}>Quick Links</h3>
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-2.5 sm:gap-3">
        {quickLinks.map((link) => {
          const Icon = link.icon;
          return (
            <Link
              key={link.label}
              to={link.path}
              className="flex items-center gap-2.5 sm:gap-3 p-3 sm:p-3.5 rounded-xl no-underline transition-all duration-250"
              style={{ border: `1px solid ${colors.border}` }}
              onMouseEnter={(e) => {
                e.currentTarget.style.transform = 'translateY(-2px)';
                e.currentTarget.style.boxShadow = colors.shadowMd;
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = 'translateY(0)';
                e.currentTarget.style.boxShadow = 'none';
              }}
            >
              <div className="w-9 h-9 sm:w-10 sm:h-10 rounded-[10px] flex items-center justify-center shrink-0" style={{ background: link.gradient }}>
                <Icon size={16} className="sm:hidden" color="#fff" strokeWidth={2} />
                <Icon size={18} className="hidden sm:block" color="#fff" strokeWidth={2} />
              </div>
              <span className="text-[11px] sm:text-[13px] font-semibold leading-tight" style={{ color: colors.textSecondary }}>{link.label}</span>
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
    <div className="rounded-2xl p-4 sm:p-6 border" style={{ background: colors.bgCard, borderColor: colors.border }}>
      <div className="flex justify-between items-center mb-4 sm:mb-5">
        <div>
          <h3 className="m-0 text-sm sm:text-base font-bold tracking-tight" style={{ color: colors.text }}>Recent Notifications</h3>
          <p className="mt-1 m-0 text-xs" style={{ color: colors.textSubtle }}>Stay updated on your orders</p>
        </div>
        <Link to="/user/notifications" className="text-xs sm:text-[13px] font-semibold no-underline flex items-center gap-1" style={{ color: colors.accent }}>
          View All <ChevronRight size={14} />
        </Link>
      </div>
      <div className="flex flex-col gap-2.5">
        {recentNotifications.map((notif, i) => {
          const nColors = notificationColors[notif.type] || notificationColors.info;
          const NotifIcon = notif.icon;
          return (
            <div
              key={i}
              className="flex gap-3 p-3 sm:p-3.5 rounded-xl transition-all duration-150"
              style={{ background: nColors.bg, border: `1px solid ${nColors.border}` }}
              onMouseEnter={(e) => { e.currentTarget.style.transform = 'translateX(2px)'; }}
              onMouseLeave={(e) => { e.currentTarget.style.transform = 'translateX(0)'; }}
            >
              <div className="w-8 h-8 rounded-lg flex items-center justify-center shrink-0" style={{ background: `${nColors.icon}18` }}>
                <NotifIcon size={14} color={nColors.icon} />
              </div>
              <div className="flex-1 min-w-0">
                <p className="m-0 text-xs sm:text-[13px] font-medium" style={{ color: colors.textSecondary }}>{notif.message}</p>
                <span className="text-[10px] sm:text-[11px] mt-1 block" style={{ color: colors.textSubtle }}>{notif.time}</span>
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
    <div className="rounded-2xl p-4 sm:p-6 border" style={{ background: colors.bgCard, borderColor: colors.border }}>
      <div className="flex justify-between items-center mb-4 sm:mb-5">
        <div>
          <h3 className="m-0 text-sm sm:text-base font-bold tracking-tight" style={{ color: colors.text }}>Recommended For You</h3>
          <p className="mt-1 m-0 text-xs" style={{ color: colors.textSubtle }}>Based on your browsing history</p>
        </div>
        <Link to="/shop" className="text-xs sm:text-[13px] font-semibold no-underline flex items-center gap-1" style={{ color: colors.accent }}>
          Browse Shop <ChevronRight size={14} />
        </Link>
      </div>
      <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-3.5">
        {recommendedProducts.map((product) => (
          <Link
            key={product.id}
            to={`/shop/products/${product.id}`}
            className="flex flex-col items-center p-4 sm:p-5 rounded-xl no-underline text-center transition-all duration-250"
            style={{ border: `1px solid ${colors.border}` }}
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
            <span className="text-3xl sm:text-[40px] mb-2.5 sm:mb-3">{product.image}</span>
            <p className="m-0 mb-1.5 text-[11px] sm:text-[13px] font-semibold leading-snug" style={{ color: colors.text }}>
              {product.name}
            </p>
            <div className="flex items-center gap-0.5 mb-1.5">
              {[...Array(5)].map((_, i) => (
                <Star key={i} size={10} className="sm:hidden" color={i < Math.floor(product.rating) ? '#737373' : colors.border} fill={i < Math.floor(product.rating) ? '#737373' : 'none'} />
              ))}
              {[...Array(5)].map((_, i) => (
                <Star key={`lg-${i}`} size={11} className="hidden sm:block" color={i < Math.floor(product.rating) ? '#737373' : colors.border} fill={i < Math.floor(product.rating) ? '#737373' : 'none'} />
              ))}
              <span className="text-[10px] sm:text-[11px] ml-0.5" style={{ color: colors.textSubtle }}>{product.rating}</span>
            </div>
            <span className="text-sm sm:text-[15px] font-bold" style={{ color: colors.accent }}>
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

      <div className="mt-6 sm:mt-7 grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4">
        {statsCards.map((stat) => (
          <StatCard key={stat.label} stat={stat} />
        ))}
      </div>

      <div className="mt-6 sm:mt-7 grid grid-cols-1 lg:grid-cols-2 gap-4 sm:gap-5">
        <RecentOrders />
        <OrderStatusOverview />
      </div>

      <div className="mt-6 sm:mt-7 grid grid-cols-1 lg:grid-cols-2 gap-4 sm:gap-5">
        <RecommendedProducts />
        <Notifications />
      </div>

      <div className="mt-6 sm:mt-7">
        <QuickLinks />
      </div>
    </div>
  );
}
