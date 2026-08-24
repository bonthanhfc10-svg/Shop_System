import { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { formatCurrency } from '../../utils/formatCurrency';
import { formatDate } from '../../utils/formatDate';
import { useTheme } from '../../hooks/useTheme';
import { useAuth } from '../../hooks/useAuth';
import {
  DollarSign, ShoppingCart, Package, Users, TrendingUp, TrendingDown,
  Eye, Plus, BarChart3, ArrowUpRight, ArrowDownRight,
  Crown, Medal, Trophy, Activity,
  Clock, CheckCircle2, Truck, XCircle, RefreshCw,
  AlertCircle, ChevronRight, Zap, Target, Layers,
  Tag, Smartphone, Headphones, Shirt, Armchair, Laptop, Gamepad2,
  Calendar, Filter, Download, MoreHorizontal, Sparkles,
} from 'lucide-react';

const statsCards = [
  {
    label: 'Total Revenue',
    value: '$45,231.89',
    change: '+20.1%',
    changeType: 'positive',
    icon: DollarSign,
    gradient: '#000000',
    shadowColor: 'rgba(0,0,0,0.12)',
    sparkline: [30, 45, 35, 55, 48, 62, 58, 72],
  },
  {
    label: 'Total Orders',
    value: '1,234',
    change: '+12.5%',
    changeType: 'positive',
    icon: ShoppingCart,
    gradient: '#262626',
    shadowColor: 'rgba(0,0,0,0.3)',
    sparkline: [20, 35, 28, 42, 38, 50, 45, 58],
  },
  {
    label: 'Total Products',
    value: '567',
    change: '+8.2%',
    changeType: 'positive',
    icon: Package,
    gradient: '#404040',
    shadowColor: 'rgba(0,0,0,0.3)',
    sparkline: [40, 38, 42, 45, 50, 48, 55, 52],
  },
  {
    label: 'Total Customers',
    value: '2,890',
    change: '-2.1%',
    changeType: 'negative',
    icon: Users,
    gradient: '#404040',
    shadowColor: 'rgba(0,0,0,0.3)',
    sparkline: [50, 52, 48, 45, 47, 42, 44, 40],
  },
];

const recentOrders = [
  { id: 'ORD-7891', customer: 'John Doe', date: '2026-08-16', total: 129.99, status: 'delivered' },
  { id: 'ORD-7890', customer: 'Jane Smith', date: '2026-08-16', total: 89.50, status: 'processing' },
  { id: 'ORD-7889', customer: 'Bob Wilson', date: '2026-08-15', total: 245.00, status: 'shipped' },
  { id: 'ORD-7888', customer: 'Alice Brown', date: '2026-08-15', total: 67.25, status: 'pending' },
  { id: 'ORD-7887', customer: 'Charlie Davis', date: '2026-08-14', total: 198.00, status: 'delivered' },
  { id: 'ORD-7886', customer: 'Diana Evans', date: '2026-08-14', total: 312.75, status: 'cancelled' },
];

const salesData = [
  { month: 'Jan', revenue: 4000, orders: 120 },
  { month: 'Feb', revenue: 3000, orders: 95 },
  { month: 'Mar', revenue: 5000, orders: 155 },
  { month: 'Apr', revenue: 4500, orders: 140 },
  { month: 'May', revenue: 6000, orders: 185 },
  { month: 'Jun', revenue: 5500, orders: 170 },
  { month: 'Jul', revenue: 7000, orders: 215 },
  { month: 'Aug', revenue: 8000, orders: 248 },
];

const orderStatusCounts = {
  pending: 12,
  processing: 28,
  shipped: 45,
  delivered: 189,
  cancelled: 8,
};

const statusConfig = {
  pending: { bg: '#f5f5f5', text: '#525252', icon: AlertCircle, color: '#0a0a0a' },
  processing: { bg: '#eeeeee', text: '#262626', icon: Clock, color: '#0a0a0a' },
  shipped: { bg: '#e8e8e8', text: '#0a0a0a', icon: Truck, color: '#171717' },
  delivered: { bg: '#e8e8e8', text: '#0a0a0a', icon: CheckCircle2, color: '#171717' },
  cancelled: { bg: '#f0f0f0', text: '#737373', icon: XCircle, color: '#0a0a0a' },
};

const topCategories = [
  { name: 'Electronics', sold: 1248, revenue: 28450, icon: Smartphone, color: '#0a0a0a', bg: '#eeeeee' },
  { name: 'Fashion', sold: 986, revenue: 19320, icon: Shirt, color: '#525252', bg: '#f4f4f4' },
  { name: 'Headphones', sold: 754, revenue: 14680, icon: Headphones, color: '#0a0a0a', bg: '#f5f5f5' },
  { name: 'Furniture', sold: 532, revenue: 11240, icon: Armchair, color: '#171717', bg: '#e8e8e8' },
  { name: 'Computers', sold: 421, revenue: 9870, icon: Laptop, color: '#404040', bg: '#f2f2f2' },
  { name: 'Gaming', sold: 318, revenue: 7650, icon: Gamepad2, color: '#737373', bg: '#f0f0f0' },
];

const topProducts = [
  { name: 'Wireless Bluetooth Headphones', sold: 234, revenue: 8190, img: '🎧' },
  { name: 'Smart Watch Pro', sold: 189, revenue: 13230, img: '⌚' },
  { name: 'USB-C Hub Adapter', sold: 156, revenue: 4680, img: '🔌' },
  { name: 'Laptop Stand Adjustable', sold: 134, revenue: 5360, img: '💻' },
  { name: 'Mechanical Keyboard RGB', sold: 112, revenue: 7840, img: '⌨️' },
  { name: 'Wireless Mouse Ergonomic', sold: 98, revenue: 3430, img: '🖱️' },
  { name: '4K Webcam HD', sold: 87, revenue: 6090, img: '📷' },
  { name: 'Portable SSD 1TB', sold: 76, revenue: 7600, img: '💾' },
];

const quickActions = [
  { label: 'Add Product', icon: Plus, path: '/admin/products/create', gradient: '#000000' },
  { label: 'View Orders', icon: ShoppingCart, path: '/admin/orders', gradient: '#262626' },
  { label: 'Manage Users', icon: Users, path: '/admin/users', gradient: '#404040' },
  { label: 'Analytics', icon: BarChart3, path: '/admin/payments', gradient: '#404040' },
];

function Sparkline({ data, color, width = 80, height = 32 }) {
  const max = Math.max(...data);
  const min = Math.min(...data);
  const range = max - min || 1;
  const points = data.map((v, i) => {
    const x = (i / (data.length - 1)) * width;
    const y = height - ((v - min) / range) * (height - 4) - 2;
    return `${x},${y}`;
  }).join(' ');
  const areaPoints = `0,${height} ${points} ${width},${height}`;
  const gradId = `sp-${color.replace('#', '')}`;

  return (
    <svg width={width} height={height} style={{ display: 'block' }}>
      <defs>
        <linearGradient id={gradId} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor={color} stopOpacity="0.3" />
          <stop offset="100%" stopColor={color} stopOpacity="0" />
        </linearGradient>
      </defs>
      <polygon points={areaPoints} fill={`url(#${gradId})`} />
      <polyline points={points} fill="none" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

function AnimatedNumber({ value, prefix = '', suffix = '', duration = 1200, decimals = 0 }) {
  const [display, setDisplay] = useState(0);
  const ref = useRef(null);

  useEffect(() => {
    const start = performance.now();
    const from = 0;
    const to = typeof value === 'number' ? value : parseFloat(String(value).replace(/[^0-9.]/g, '')) || 0;
    const step = (now) => {
      const elapsed = now - start;
      const progress = Math.min(elapsed / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      setDisplay(from + (to - from) * eased);
      if (progress < 1) ref.current = requestAnimationFrame(step);
    };
    ref.current = requestAnimationFrame(step);
    return () => cancelAnimationFrame(ref.current);
  }, [value, duration]);

  const formatted = display.toLocaleString('en-US', {
    minimumFractionDigits: decimals,
    maximumFractionDigits: decimals,
  });
  return <>{prefix}{formatted}{suffix}</>;
}

function WelcomeBanner() {
  const { colors } = useTheme();
  const { user } = useAuth();
  const hour = new Date().getHours();
  const greeting = hour < 12 ? 'Good morning' : hour < 18 ? 'Good afternoon' : 'Good evening';

  return (
    <div style={{
      background: '#0a0a0a',
      borderRadius: '20px', padding: 'clamp(24px, 3vw, 36px)',
      position: 'relative', overflow: 'hidden',
    }}>
      <div style={{ position: 'relative', zIndex: 1, display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', flexWrap: 'wrap', gap: '20px' }}>
        <div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '8px' }}>
            <Sparkles size={18} color="#fafafa" />
            <span style={{ fontSize: '12px', fontWeight: '600', color: 'rgba(255,255,255,0.7)', textTransform: 'uppercase', letterSpacing: '0.1em' }}>Dashboard Overview</span>
          </div>
          <h1 style={{ margin: 0, fontSize: 'clamp(22px, 3vw, 28px)', fontWeight: '800', color: '#fff', letterSpacing: '-0.02em', lineHeight: '1.2' }}>
            {greeting}, {user?.name || 'Admin'}
          </h1>
          <p style={{ margin: '8px 0 0', fontSize: 'clamp(13px, 2vw, 15px)', color: 'rgba(255,255,255,0.7)', maxWidth: '480px', lineHeight: '1.5' }}>
            Here's what's happening with your store today. Track sales, orders, and performance at a glance.
          </p>
          <div style={{ display: 'flex', gap: '10px', marginTop: '20px', flexWrap: 'wrap' }}>
            <Link to="/admin/orders" style={{
              display: 'inline-flex', alignItems: 'center', gap: '6px',
              padding: '10px 20px', borderRadius: '10px', background: 'rgba(255,255,255,0.15)',
              color: '#fff', fontSize: '13px', fontWeight: '600', textDecoration: 'none',
              backdropFilter: 'blur(8px)', border: '1px solid rgba(255,255,255,0.12)',
              transition: 'all 0.2s',
            }}
              onMouseEnter={(e) => { e.currentTarget.style.background = 'rgba(255,255,255,0.25)'; }}
              onMouseLeave={(e) => { e.currentTarget.style.background = 'rgba(255,255,255,0.15)'; }}
            >
              <Eye size={15} /> View Orders
            </Link>
            <Link to="/admin/products/create" style={{
              display: 'inline-flex', alignItems: 'center', gap: '6px',
              padding: '10px 20px', borderRadius: '10px', background: '#fff',
              color: '#0a0a0a', fontSize: '13px', fontWeight: '600', textDecoration: 'none',
              transition: 'all 0.2s',
            }}
              onMouseEnter={(e) => { e.currentTarget.style.transform = 'translateY(-1px)'; e.currentTarget.style.boxShadow = '0 8px 24px rgba(0,0,0,0.2)'; }}
              onMouseLeave={(e) => { e.currentTarget.style.transform = 'translateY(0)'; e.currentTarget.style.boxShadow = 'none'; }}
            >
              <Plus size={15} /> Add Product
            </Link>
          </div>
        </div>
        <div style={{
          display: 'flex', alignItems: 'center', gap: '8px',
          padding: '8px 14px', borderRadius: '10px',
          background: 'rgba(255,255,255,0.1)', backdropFilter: 'blur(8px)',
          border: '1px solid rgba(255,255,255,0.1)',
        }}>
          <Calendar size={14} color="rgba(255,255,255,0.7)" />
          <span style={{ fontSize: '12.5px', fontWeight: '500', color: 'rgba(255,255,255,0.85)' }}>
            {new Date().toLocaleDateString('en-US', { weekday: 'long', month: 'short', day: 'numeric', year: 'numeric' })}
          </span>
        </div>
      </div>
      <div style={{ position: 'absolute', top: '-60px', right: '-40px', width: '220px', height: '220px', borderRadius: '50%', background: 'rgba(255,255,255,0.05)' }} />
      <div style={{ position: 'absolute', bottom: '-50px', right: '100px', width: '140px', height: '140px', borderRadius: '50%', background: 'rgba(255,255,255,0.04)' }} />
      <div style={{ position: 'absolute', top: '30px', right: '280px', width: '80px', height: '80px', borderRadius: '50%', background: 'rgba(255,255,255,0.03)' }} />
    </div>
  );
}

function StatCard({ stat, index }) {
  const { colors } = useTheme();
  const Icon = stat.icon;

  return (
    <div
      className="dash-stat-card"
      style={{
        background: colors.bgCard,
        borderRadius: '16px',
        padding: '22px',
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
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '14px' }}>
        <div style={{
          width: '48px', height: '48px', borderRadius: '14px',
          background: stat.gradient, display: 'flex', alignItems: 'center',
          justifyContent: 'center', boxShadow: `0 8px 20px ${stat.shadowColor}`,
        }}>
          <Icon size={22} color="#fff" strokeWidth={2} />
        </div>
        <div style={{
          display: 'flex', alignItems: 'center', gap: '4px',
          padding: '4px 10px', borderRadius: '20px',
          background: stat.changeType === 'positive' ? '#e8e8e8' : '#f0f0f0',
        }}>
          {stat.changeType === 'positive' ? (
            <ArrowUpRight size={13} color="#171717" />
          ) : (
            <ArrowDownRight size={13} color="#0a0a0a" />
          )}
          <span style={{
            fontSize: '12px', fontWeight: '600',
            color: stat.changeType === 'positive' ? '#171717' : '#0a0a0a',
          }}>
            {stat.change}
          </span>
        </div>
      </div>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end' }}>
        <div>
          <p style={{ margin: 0, fontSize: '12.5px', color: colors.textMuted, fontWeight: '500', marginBottom: '4px' }}>
            {stat.label}
          </p>
          <p style={{ margin: 0, fontSize: '26px', fontWeight: '800', color: colors.text, letterSpacing: '-0.02em', lineHeight: '1.2' }}>
            {stat.value}
          </p>
        </div>
        <div style={{ opacity: 0.6 }}>
          <Sparkline data={stat.sparkline} color={stat.changeType === 'positive' ? '#171717' : '#0a0a0a'} />
        </div>
      </div>
    </div>
  );
}

function RevenueChart() {
  const { colors } = useTheme();
  const [anim, setAnim] = useState(0);
  const [hoveredBar, setHoveredBar] = useState(null);
  const rafRef = useRef(null);

  const maxRevenue = Math.max(...salesData.map((d) => d.revenue));
  const totalRevenue = salesData.reduce((sum, d) => sum + d.revenue, 0);
  const avgRevenue = Math.round(totalRevenue / salesData.length);
  const chartW = 600;
  const chartH = 200;
  const padX = 16;
  const padY = 20;
  const plotW = chartW - padX * 2;
  const plotH = chartH - padY * 2;
  const barW = plotW / salesData.length * 0.55;
  const gap = plotW / salesData.length;

  useEffect(() => {
    let start = null;
    const duration = 1000;
    const draw = (ts) => {
      if (!start) start = ts;
      const progress = Math.min((ts - start) / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      setAnim(eased);
      if (progress < 1) rafRef.current = requestAnimationFrame(draw);
    };
    rafRef.current = requestAnimationFrame(draw);
    return () => cancelAnimationFrame(rafRef.current);
  }, []);

  return (
    <div style={{
      background: colors.bgCard, borderRadius: '20px', padding: '24px',
      border: `1px solid ${colors.border}`,
    }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '24px', flexWrap: 'wrap', gap: '12px' }}>
        <div>
          <h3 style={{ margin: 0, fontSize: '16px', fontWeight: '700', color: colors.text, letterSpacing: '-0.01em' }}>Revenue Overview</h3>
          <p style={{ margin: '4px 0 0', fontSize: '13px', color: colors.textSubtle }}>Monthly revenue breakdown</p>
        </div>
        <div style={{ display: 'flex', gap: '4px', background: colors.bgHover, borderRadius: '10px', padding: '3px' }}>
          {['Week', 'Month', 'Year'].map((period, i) => (
            <button key={period} style={{
              padding: '5px 12px', borderRadius: '7px', border: 'none',
              background: i === 1 ? colors.accent : 'transparent',
              color: i === 1 ? '#fff' : colors.textMuted,
              fontSize: '12px', cursor: 'pointer', fontWeight: '500',
              transition: 'all 0.15s',
            }}>
              {period}
            </button>
          ))}
        </div>
      </div>

      <div style={{ display: 'flex', gap: '12px', marginBottom: '24px', flexWrap: 'wrap' }}>
        {[
          { label: 'Total Revenue', value: totalRevenue, prefix: '$', icon: DollarSign, gradient: '#000000' },
          { label: 'Avg. Monthly', value: avgRevenue, prefix: '$', icon: BarChart3, gradient: '#262626' },
          { label: 'Best Month', value: maxRevenue, prefix: '$', icon: TrendingUp, gradient: '#404040' },
        ].map((s, si) => {
          const SIcon = s.icon;
          return (
            <div key={s.label} style={{
              flex: 1, minWidth: '130px', display: 'flex', alignItems: 'center', gap: '12px',
              padding: '14px 16px', borderRadius: '12px',
              background: colors.bgHover, border: `1px solid ${colors.borderLight}`,
              opacity: anim, transform: `translateY(${(1 - anim) * 10}px)`,
              transition: `opacity 0.4s ease ${si * 0.1}s, transform 0.4s ease ${si * 0.1}s`,
            }}>
              <div style={{
                width: '38px', height: '38px', borderRadius: '10px',
                background: s.gradient, display: 'flex', alignItems: 'center',
                justifyContent: 'center', flexShrink: 0,
              }}>
                <SIcon size={17} color="#fff" strokeWidth={2} />
              </div>
              <div>
                <p style={{ margin: 0, fontSize: '11px', color: colors.textSubtle, fontWeight: '500' }}>{s.label}</p>
                <p style={{ margin: '2px 0 0', fontSize: '17px', fontWeight: '700', color: colors.text, letterSpacing: '-0.02em' }}>
                  <AnimatedNumber value={s.value} prefix={s.prefix} duration={1200} />
                </p>
              </div>
            </div>
          );
        })}
      </div>

      <div style={{
        position: 'relative', background: colors.bgHover, borderRadius: '14px',
        padding: '16px 8px', border: `1px solid ${colors.borderLight}`,
        opacity: anim, transition: 'opacity 0.5s ease 0.2s',
      }}>
        <svg viewBox={`0 0 ${chartW} ${chartH}`} style={{ width: '100%', height: 'auto', display: 'block' }}>
          {[0, 0.25, 0.5, 0.75, 1].map((frac) => {
            const yy = padY + plotH - frac * plotH;
            return (
              <g key={frac}>
                <line x1={padX} y1={yy} x2={chartW - padX} y2={yy}
                  stroke={colors.border} strokeWidth="0.5" strokeDasharray="4 4"
                  opacity={anim * 0.5} />
                <text x={padX - 4} y={yy + 3.5} textAnchor="end" fontSize="9" fill={colors.textSubtle} fontWeight="500">
                  ${(frac * maxRevenue / 1000).toFixed(0)}k
                </text>
              </g>
            );
          })}
          {salesData.map((d, i) => {
            const x = padX + i * gap + (gap - barW) / 2;
            const barH = (d.revenue / maxRevenue) * plotH * anim;
            const y = padY + plotH - barH;
            const isHovered = hoveredBar === i;
            return (
              <g key={i}
                onMouseEnter={() => setHoveredBar(i)}
                onMouseLeave={() => setHoveredBar(null)}
                style={{ cursor: 'pointer' }}
              >
                <rect x={x} y={y} width={barW} height={barH}
                  rx="4" ry="4"
                  fill={isHovered ? '#525252' : '#a3a3a3'}
                  opacity={isHovered ? 1 : 0.8}
                  style={{ transition: 'all 0.2s' }}
                />
                {isHovered && (
                  <g>
                    <rect x={x + barW / 2 - 30} y={y - 32} width="60" height="22" rx="6" fill={colors.text} />
                    <text x={x + barW / 2} y={y - 17} textAnchor="middle" fontSize="10" fontWeight="600" fill="#fff">
                      ${(d.revenue / 1000).toFixed(1)}k
                    </text>
                  </g>
                )}
                <text x={x + barW / 2} y={padY + plotH + 16} textAnchor="middle"
                  fontSize="10.5" fontWeight="500" fill={colors.textSubtle}>
                  {d.month}
                </text>
              </g>
            );
          })}
        </svg>
      </div>
    </div>
  );
}

function OrderStatus() {
  const { colors } = useTheme();
  const total = Object.values(orderStatusCounts).reduce((a, b) => a + b, 0);
  const statusOrder = ['delivered', 'shipped', 'processing', 'pending', 'cancelled'];
  const cx = 100, cy = 100, r = 72, stroke = 18;
  const circumference = 2 * Math.PI * r;
  let cumulativeOffset = 0;

  return (
    <div style={{
      background: colors.bgCard, borderRadius: '20px', padding: '24px',
      border: `1px solid ${colors.border}`,
    }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '24px' }}>
        <div>
          <h3 style={{ margin: 0, fontSize: '16px', fontWeight: '700', color: colors.text, letterSpacing: '-0.01em' }}>Order Status</h3>
          <p style={{ margin: '4px 0 0', fontSize: '13px', color: colors.textSubtle }}>{total.toLocaleString()} total orders</p>
        </div>
        <Link to="/admin/orders" style={{
          fontSize: '13px', color: colors.accent, textDecoration: 'none', fontWeight: '600',
          display: 'flex', alignItems: 'center', gap: '4px',
        }}>
          Details <ChevronRight size={14} />
        </Link>
      </div>

      <div style={{ display: 'flex', alignItems: 'center', gap: '24px', flexWrap: 'wrap', justifyContent: 'center' }}>
        <div style={{ position: 'relative', width: '190px', height: '190px', flexShrink: 0 }}>
          <svg viewBox="0 0 200 200" style={{ width: '100%', height: '100%', transform: 'rotate(-90deg)' }}>
            <circle cx={cx} cy={cy} r={r} fill="none" stroke={colors.bgHover} strokeWidth={stroke} />
            {statusOrder.map((status) => {
              const count = orderStatusCounts[status];
              const pct = count / total;
              const dashLen = pct * circumference;
              const dashOffset = -cumulativeOffset;
              cumulativeOffset += dashLen;
              return (
                <circle key={status} cx={cx} cy={cy} r={r} fill="none"
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

        <div style={{ flex: 1, minWidth: '180px', display: 'flex', flexDirection: 'column', gap: '8px' }}>
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

function TopSellingCategories() {
  const { colors } = useTheme();
  const maxSold = Math.max(...topCategories.map((c) => c.sold));

  return (
    <div style={{
      background: colors.bgCard, borderRadius: '20px', padding: '24px',
      border: `1px solid ${colors.border}`,
    }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
        <div>
          <h3 style={{ margin: 0, fontSize: '16px', fontWeight: '700', color: colors.text, letterSpacing: '-0.01em' }}>Top Selling Categories</h3>
          <p style={{ margin: '4px 0 0', fontSize: '13px', color: colors.textSubtle }}>Best performing product categories</p>
        </div>
        <Link to="/admin/categories" style={{
          fontSize: '13px', color: colors.accent, textDecoration: 'none', fontWeight: '600',
          display: 'flex', alignItems: 'center', gap: '4px',
        }}>
          View All <ChevronRight size={14} />
        </Link>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))', gap: '12px' }}>
        {topCategories.map((cat, index) => {
          const Icon = cat.icon;
          const pct = ((cat.sold / maxSold) * 100).toFixed(0);
          const RankBadge = index === 0 ? Crown : index === 1 ? Medal : index === 2 ? Trophy : null;
          return (
            <div key={cat.name} style={{
              display: 'flex', alignItems: 'center', gap: '14px',
              padding: '16px', borderRadius: '14px',
              background: index === 0 ? colors.bgAccent : colors.bgHover,
              border: index === 0 ? `1px solid ${colors.border}` : `1px solid transparent`,
              transition: 'all 0.25s cubic-bezier(0.4, 0, 0.2, 1)',
              cursor: 'pointer',
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
                width: '48px', height: '48px', borderRadius: '12px',
                background: cat.bg, display: 'flex', alignItems: 'center',
                justifyContent: 'center', flexShrink: 0, position: 'relative',
              }}>
                <Icon size={22} color={cat.color} strokeWidth={1.8} />
                {RankBadge && (
                  <div style={{
                    position: 'absolute', top: '-4px', right: '-4px',
                    width: '18px', height: '18px', borderRadius: '50%',
                    background: cat.color, display: 'flex', alignItems: 'center',
                    justifyContent: 'center',
                  }}>
                    <RankBadge size={10} color="#fff" strokeWidth={2.5} />
                  </div>
                )}
              </div>
              <div style={{ flex: 1, minWidth: 0 }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '4px' }}>
                  <p style={{ margin: 0, fontSize: '14px', fontWeight: '600', color: colors.text }}>{cat.name}</p>
                  <span style={{ fontSize: '13px', fontWeight: '700', color: colors.success }}>{formatCurrency(cat.revenue)}</span>
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                  <div style={{ flex: 1, height: '5px', background: colors.border, borderRadius: '3px', overflow: 'hidden' }}>
                    <div style={{
                      height: '100%', borderRadius: '3px',
                      width: `${pct}%`, background: cat.color,
                      transition: 'width 0.5s cubic-bezier(0.4, 0, 0.2, 1)',
                    }} />
                  </div>
                  <span style={{ fontSize: '11.5px', color: colors.textSubtle, fontWeight: '600', whiteSpace: 'nowrap' }}>
                    {cat.sold.toLocaleString()} sold
                  </span>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

function TopSellingProducts() {
  const { colors } = useTheme();
  const maxSold = Math.max(...topProducts.map((p) => p.sold));

  return (
    <div style={{
      background: colors.bgCard, borderRadius: '20px', padding: '24px',
      border: `1px solid ${colors.border}`,
    }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
        <div>
          <h3 style={{ margin: 0, fontSize: '16px', fontWeight: '700', color: colors.text, letterSpacing: '-0.01em' }}>Top Selling Products</h3>
          <p style={{ margin: '4px 0 0', fontSize: '13px', color: colors.textSubtle }}>Best performing products by units sold</p>
        </div>
        <Link to="/admin/products" style={{
          fontSize: '13px', color: colors.accent, textDecoration: 'none', fontWeight: '600',
          display: 'flex', alignItems: 'center', gap: '4px',
        }}>
          View All <ChevronRight size={14} />
        </Link>
      </div>

      <div style={{ overflowX: 'auto' }}>
        <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '13.5px', minWidth: '600px' }}>
          <thead>
            <tr>
              {['#', 'Product', 'Units Sold', 'Revenue', 'Performance'].map((h) => (
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
            {topProducts.map((product, index) => {
              const pct = ((product.sold / maxSold) * 100).toFixed(0);
              const rankColors = ['#0a0a0a', '#737373', '#737373'];
              const isTop3 = index < 3;
              return (
                <tr key={product.name} style={{
                  borderBottom: `1px solid ${colors.borderLight}`,
                  background: index === 0 ? colors.bgAccent : 'transparent',
                  transition: 'background 0.15s',
                }}
                  onMouseEnter={(e) => { if (index !== 0) e.currentTarget.style.background = colors.bgHover; }}
                  onMouseLeave={(e) => { if (index !== 0) e.currentTarget.style.background = index === 0 ? colors.bgAccent : 'transparent'; }}
                >
                  <td style={{ padding: '14px' }}>
                    <div style={{
                      width: '28px', height: '28px', borderRadius: '8px',
                      background: isTop3 ? rankColors[index] : colors.bgHover,
                      display: 'flex', alignItems: 'center', justifyContent: 'center',
                      fontSize: '12px', fontWeight: '700',
                      color: isTop3 ? '#fff' : colors.textMuted,
                    }}>
                      {index + 1}
                    </div>
                  </td>
                  <td style={{ padding: '14px' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                      <span style={{ fontSize: '22px' }}>{product.img}</span>
                      <span style={{ fontWeight: '600', color: colors.text }}>{product.name}</span>
                    </div>
                  </td>
                  <td style={{ padding: '14px', fontWeight: '600', color: colors.text }}>
                    {product.sold.toLocaleString()}
                  </td>
                  <td style={{ padding: '14px', fontWeight: '700', color: colors.success }}>
                    {formatCurrency(product.revenue)}
                  </td>
                  <td style={{ padding: '14px', minWidth: '160px' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                      <div style={{ flex: 1, height: '6px', background: colors.bgHover, borderRadius: '3px', overflow: 'hidden' }}>
                        <div style={{
                          height: '100%', borderRadius: '3px',
                          width: `${pct}%`,
                          background: isTop3 ? rankColors[index] : colors.accent,
                          transition: 'width 0.5s cubic-bezier(0.4, 0, 0.2, 1)',
                        }} />
                      </div>
                      <span style={{ fontSize: '12px', fontWeight: '600', color: colors.textMuted, minWidth: '32px' }}>{pct}%</span>
                    </div>
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

function RecentOrders() {
  const { colors } = useTheme();
  return (
    <div style={{
      background: colors.bgCard, borderRadius: '20px', padding: '24px',
      border: `1px solid ${colors.border}`,
    }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
        <div>
          <h3 style={{ margin: 0, fontSize: '16px', fontWeight: '700', color: colors.text, letterSpacing: '-0.01em' }}>Recent Orders</h3>
          <p style={{ margin: '4px 0 0', fontSize: '13px', color: colors.textSubtle }}>Latest customer orders</p>
        </div>
        <Link to="/admin/orders" style={{
          fontSize: '13px', color: colors.accent, textDecoration: 'none', fontWeight: '600',
          display: 'flex', alignItems: 'center', gap: '4px',
        }}>
          View All <ChevronRight size={14} />
        </Link>
      </div>
      <div style={{ overflowX: 'auto' }}>
        <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '13.5px', minWidth: '520px' }}>
          <thead>
            <tr>
              {['Order', 'Customer', 'Date', 'Amount', 'Status'].map((h) => (
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
              return (
                <tr key={order.id} style={{
                  borderBottom: `1px solid ${colors.borderLight}`,
                  transition: 'background 0.15s',
                }}
                  onMouseEnter={(e) => { e.currentTarget.style.background = colors.bgHover; }}
                  onMouseLeave={(e) => { e.currentTarget.style.background = 'transparent'; }}
                >
                  <td style={{ padding: '14px', fontWeight: '600', color: colors.accent, fontSize: '13px' }}>
                    {order.id}
                  </td>
                  <td style={{ padding: '14px', color: colors.textSecondary, fontWeight: '500' }}>{order.customer}</td>
                  <td style={{ padding: '14px', color: colors.textMuted }}>{formatDate(order.date)}</td>
                  <td style={{ padding: '14px', fontWeight: '600', color: colors.text }}>
                    {formatCurrency(order.total)}
                  </td>
                  <td style={{ padding: '14px' }}>
                    <span style={{
                      display: 'inline-flex', alignItems: 'center', gap: '5px',
                      padding: '5px 12px', borderRadius: '8px', fontSize: '12px', fontWeight: '600',
                      background: cfg.bg, color: cfg.text, textTransform: 'capitalize',
                    }}>
                      {(() => { const SIcon = cfg.icon; return <SIcon size={12} />; })()}
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

function QuickActions() {
  const { colors } = useTheme();
  return (
    <div style={{
      background: colors.bgCard, borderRadius: '20px', padding: '24px',
      border: `1px solid ${colors.border}`,
    }}>
      <h3 style={{ margin: '0 0 16px', fontSize: '16px', fontWeight: '700', color: colors.text, letterSpacing: '-0.01em' }}>Quick Actions</h3>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(140px, 1fr))', gap: '10px' }}>
        {quickActions.map((action) => {
          const Icon = action.icon;
          return (
            <Link
              key={action.label}
              to={action.path}
              style={{
                display: 'flex', alignItems: 'center', gap: '12px',
                padding: '14px', borderRadius: '14px', textDecoration: 'none',
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
                width: '40px', height: '40px', borderRadius: '12px',
                background: action.gradient, display: 'flex',
                alignItems: 'center', justifyContent: 'center', flexShrink: 0,
              }}>
                <Icon size={18} color="#fff" strokeWidth={2} />
              </div>
              <span style={{ fontSize: '13px', fontWeight: '600', color: colors.textSecondary }}>{action.label}</span>
            </Link>
          );
        })}
      </div>
    </div>
  );
}

export default function AdminDashboard() {
  return (
    <div>
      <WelcomeBanner />

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '16px', marginTop: '24px', marginBottom: '24px' }}>
        {statsCards.map((stat, i) => (
          <StatCard key={stat.label} stat={stat} index={i} />
        ))}
      </div>

      <div className="grid-2col-responsive" style={{ marginBottom: '24px' }}>
        <RevenueChart />
        <OrderStatus />
      </div>

      <div style={{ marginBottom: '24px' }}>
        <TopSellingCategories />
      </div>

      <div style={{ marginBottom: '24px' }}>
        <TopSellingProducts />
      </div>

      <div className="grid-2col-responsive" style={{ marginBottom: '24px' }}>
        <RecentOrders />
        <QuickActions />
      </div>
    </div>
  );
}
