import { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { formatCurrency } from '../../utils/formatCurrency';
import { formatDate } from '../../utils/formatDate';
import { useTheme } from '../../hooks/useTheme';
import { useAuth } from '../../hooks/useAuth';
import {
  DollarSign, ShoppingCart, Package, Users, TrendingUp,
  Eye, Plus, BarChart3, ArrowUpRight, ArrowDownRight,
  Crown, Medal, Trophy,
  Clock, CheckCircle2, Truck, XCircle,
  AlertCircle, ChevronRight,
  Calendar, Sparkles,
} from 'lucide-react';

const warm = {
  gradient: 'linear-gradient(135deg, #f97316 0%, #ec4899 100%)',
  gradientSub: 'linear-gradient(135deg, #fb923c 0%, #f472b6 100%)',
  gradientCard: 'linear-gradient(135deg, #fff7ed 0%, #fdf2f8 100%)',
  orange: '#f97316',
  coral: '#f87171',
  pink: '#ec4899',
  amber: '#f59e0b',
  rose: '#f43f5e',
  orangeLight: '#ffedd5',
  pinkLight: '#fce7f3',
  amberLight: '#fef3c7',
  roseLight: '#ffe4e6',
  warm50: '#fff7ed',
  warm100: '#ffedd5',
  warm200: '#fed7aa',
  warm300: '#fdba74',
  warm400: '#fb923c',
  warm500: '#f97316',
  warm600: '#ea580c',
  warm700: '#c2410c',
  rose500: '#f43f5e',
  rose600: '#e11d48',
  pink500: '#ec4899',
  amber500: '#f59e0b',
};

const statsCards = [
  {
    label: 'Total Revenue',
    value: '$38,459',
    change: '+18.2%',
    changeType: 'positive',
    icon: DollarSign,
    gradient: warm.gradient,
    sparkline: [28, 42, 35, 52, 46, 60, 55, 70],
  },
  {
    label: 'Total Orders',
    value: '1,087',
    change: '+14.7%',
    changeType: 'positive',
    icon: ShoppingCart,
    gradient: 'linear-gradient(135deg, #f472b6 0%, #ec4899 100%)',
    sparkline: [18, 32, 26, 40, 36, 48, 43, 56],
  },
  {
    label: 'Products',
    value: '156',
    change: '+6.3%',
    changeType: 'positive',
    icon: Package,
    gradient: 'linear-gradient(135deg, #fb923c 0%, #f97316 100%)',
    sparkline: [36, 34, 38, 42, 47, 45, 50, 48],
  },
  {
    label: 'Customers',
    value: '2,341',
    change: '-1.8%',
    changeType: 'negative',
    icon: Users,
    gradient: 'linear-gradient(135deg, #f43f5e 0%, #e11d48 100%)',
    sparkline: [48, 50, 46, 43, 45, 40, 42, 38],
  },
];

const recentOrders = [
  { id: 'ORD-4521', customer: 'Sok Vannak', date: '2026-08-24', total: 87.97, status: 'delivered', items: 'Classic White T-Shirt × 2, Slim Fit Blue Jeans × 1' },
  { id: 'ORD-4520', customer: 'Dara Chantrea', date: '2026-08-24', total: 124.98, status: 'processing', items: 'White Running Sneakers × 1, Polo Shirt Navy × 2' },
  { id: 'ORD-4519', customer: 'Bopha Kem', date: '2026-08-23', total: 62.98, status: 'shipped', items: 'Cargo Pants Olive × 1, Casual Canvas Shoes × 1' },
  { id: 'ORD-4518', customer: 'Chantrea Min', date: '2026-08-23', total: 156.97, status: 'pending', items: 'Long Sleeve Flannel × 2, Summer Shorts Khaki × 1' },
  { id: 'ORD-4517', customer: 'Makara Touch', date: '2026-08-22', total: 99.98, status: 'delivered', items: 'Sports Running Shoes × 1, Black Graphic Tee × 2' },
  { id: 'ORD-4516', customer: 'Kosal Phan', date: '2026-08-22', total: 44.98, status: 'cancelled', items: 'Striped V-Neck Tee × 2, Athletic Shorts Black × 1' },
];

const salesData = [
  { month: 'Jan', revenue: 3200, orders: 95 },
  { month: 'Feb', revenue: 2800, orders: 82 },
  { month: 'Mar', revenue: 4100, orders: 124 },
  { month: 'Apr', revenue: 3900, orders: 118 },
  { month: 'May', revenue: 5200, orders: 158 },
  { month: 'Jun', revenue: 4800, orders: 145 },
  { month: 'Jul', revenue: 6100, orders: 189 },
  { month: 'Aug', revenue: 7359, orders: 226 },
];


const statusConfig = {
  pending: { bg: '#fef3c7', text: '#92400e', icon: AlertCircle },
  processing: { bg: '#ffedd5', text: '#9a3412', icon: Clock },
  shipped: { bg: '#fce7f3', text: '#9d174d', icon: Truck },
  delivered: { bg: '#dcfce7', text: '#166534', icon: CheckCircle2 },
  cancelled: { bg: '#ffe4e6', text: '#9f1239', icon: XCircle },
};

const topCategories = [
  { name: 'Shirts', sold: 842, revenue: 18640, color: '#f97316', bg: '#ffedd5', emoji: '👕' },
  { name: 'Pants', sold: 634, revenue: 14280, color: '#ec4899', bg: '#fce7f3', emoji: '👖' },
  { name: 'Shoes', sold: 521, revenue: 12950, color: '#f43f5e', bg: '#ffe4e6', emoji: '👟' },
];

const topProducts = [
  { name: 'Classic White T-Shirt', sold: 234, revenue: 4677, emoji: '👕', sub: 'T-Shirts' },
  { name: 'Slim Fit Blue Jeans', sold: 189, revenue: 7559, emoji: '👖', sub: 'Jeans' },
  { name: 'White Running Sneakers', sold: 156, revenue: 9359, emoji: '👟', sub: 'Sneakers' },
  { name: 'Polo Shirt Navy', sold: 134, revenue: 3349, emoji: '👔', sub: 'Polo Shirts' },
  { name: 'Long Sleeve Flannel', sold: 112, revenue: 3695, emoji: '👕', sub: 'Long Sleeve' },
  { name: 'Sports Running Shoes', sold: 98, revenue: 6369, emoji: '👟', sub: 'Sports Shoes' },
  { name: 'Casual Canvas Shoes', sold: 87, revenue: 2609, emoji: '👞', sub: 'Casual Shoes' },
  { name: 'Cargo Pants Olive', sold: 76, revenue: 2659, emoji: '👖', sub: 'Cargo Pants' },
];

const quickActions = [
  { label: 'Add Product', icon: Plus, path: '/admin/products/create', gradient: 'linear-gradient(135deg, #f97316, #ec4899)' },
  { label: 'View Orders', icon: ShoppingCart, path: '/admin/orders', gradient: 'linear-gradient(135deg, #ec4899, #f43f5e)' },
  { label: 'Manage Users', icon: Users, path: '/admin/users', gradient: 'linear-gradient(135deg, #fb923c, #f59e0b)' },
  { label: 'Analytics', icon: BarChart3, path: '/admin/payments', gradient: 'linear-gradient(135deg, #f43f5e, #e11d48)' },
];

function Sparkline({ data, color, width = 72, height = 28 }) {
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
      <polyline points={points} fill="none" stroke={color} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

function AnimatedNumber({ value, prefix = '', suffix = '', duration = 1000, decimals = 0 }) {
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
  const { user } = useAuth();
  const hour = new Date().getHours();
  const greeting = hour < 12 ? 'Good morning' : hour < 18 ? 'Good afternoon' : 'Good evening';

  return (
    <div style={{
      background: warm.gradient,
      borderRadius: '20px', padding: 'clamp(24px, 3vw, 32px)',
      position: 'relative', overflow: 'hidden',
    }}>
      <div style={{ position: 'relative', zIndex: 1, display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', flexWrap: 'wrap', gap: '20px' }}>
        <div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '10px' }}>
            <div style={{
              width: '28px', height: '28px', borderRadius: '8px',
              background: 'rgba(255,255,255,0.2)', display: 'flex',
              alignItems: 'center', justifyContent: 'center',
            }}>
              <Sparkles size={14} color="#fff" />
            </div>
            <span style={{ fontSize: '11px', fontWeight: '600', color: 'rgba(255,255,255,0.7)', textTransform: 'uppercase', letterSpacing: '0.12em' }}>Dashboard</span>
          </div>
          <h1 style={{ margin: 0, fontSize: 'clamp(22px, 3vw, 30px)', fontWeight: '800', color: '#fff', letterSpacing: '-0.03em', lineHeight: '1.15' }}>
            {greeting}, {user?.name?.split(' ')[0] || 'Admin'}
          </h1>
          <p style={{ margin: '10px 0 0', fontSize: 'clamp(13px, 1.5vw, 14px)', color: 'rgba(255,255,255,0.8)', maxWidth: '440px', lineHeight: '1.6' }}>
            Here's your store at a glance. Track sales, orders, and performance.
          </p>
          <div style={{ display: 'flex', gap: '8px', marginTop: '20px', flexWrap: 'wrap' }}>
            <Link to="/admin/orders" style={{
              display: 'inline-flex', alignItems: 'center', gap: '6px',
              padding: '9px 18px', borderRadius: '10px', background: 'rgba(255,255,255,0.2)',
              color: '#fff', fontSize: '12.5px', fontWeight: '600', textDecoration: 'none',
              backdropFilter: 'blur(8px)', border: '1px solid rgba(255,255,255,0.15)',
              transition: 'all 0.2s',
            }}
              onMouseEnter={(e) => { e.currentTarget.style.background = 'rgba(255,255,255,0.32)'; }}
              onMouseLeave={(e) => { e.currentTarget.style.background = 'rgba(255,255,255,0.2)'; }}
            >
              <Eye size={14} /> View Orders
            </Link>
            <Link to="/admin/products/create" style={{
              display: 'inline-flex', alignItems: 'center', gap: '6px',
              padding: '9px 18px', borderRadius: '10px', background: '#fff',
              color: '#c2410c', fontSize: '12.5px', fontWeight: '600', textDecoration: 'none',
              transition: 'all 0.2s',
            }}
              onMouseEnter={(e) => { e.currentTarget.style.transform = 'translateY(-1px)'; e.currentTarget.style.boxShadow = '0 6px 20px rgba(249,115,22,0.3)'; }}
              onMouseLeave={(e) => { e.currentTarget.style.transform = 'translateY(0)'; e.currentTarget.style.boxShadow = 'none'; }}
            >
              <Plus size={14} /> Add Product
            </Link>
          </div>
        </div>
        <div style={{
          display: 'flex', alignItems: 'center', gap: '6px',
          padding: '7px 12px', borderRadius: '8px',
          background: 'rgba(255,255,255,0.15)', backdropFilter: 'blur(8px)',
          border: '1px solid rgba(255,255,255,0.1)',
        }}>
          <Calendar size={13} color="rgba(255,255,255,0.7)" />
          <span style={{ fontSize: '12px', fontWeight: '500', color: 'rgba(255,255,255,0.9)' }}>
            {new Date().toLocaleDateString('en-US', { weekday: 'short', month: 'short', day: 'numeric', year: 'numeric' })}
          </span>
        </div>
      </div>
      <div style={{ position: 'absolute', top: '-50px', right: '-30px', width: '200px', height: '200px', borderRadius: '50%', background: 'rgba(255,255,255,0.08)' }} />
      <div style={{ position: 'absolute', bottom: '-40px', right: '120px', width: '120px', height: '120px', borderRadius: '50%', background: 'rgba(255,255,255,0.06)' }} />
      <div style={{ position: 'absolute', top: '20px', right: '30%', width: '60px', height: '60px', borderRadius: '50%', background: 'rgba(255,255,255,0.05)' }} />
    </div>
  );
}

function StatCard({ stat }) {
  const { colors } = useTheme();
  const Icon = stat.icon;

  return (
    <div
      className="dash-stat-card"
      style={{
        background: colors.bgCard,
        borderRadius: '14px',
        padding: '14px 16px',
        border: `1px solid ${colors.border}`,
        position: 'relative',
        overflow: 'hidden',
        transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
        cursor: 'default',
      }}
      onMouseEnter={(e) => {
        e.currentTarget.style.transform = 'translateY(-2px)';
        e.currentTarget.style.boxShadow = colors.shadowLg;
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.transform = 'translateY(0)';
        e.currentTarget.style.boxShadow = 'none';
      }}
    >
      <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
        <div style={{
          width: '38px', height: '38px', borderRadius: '10px',
          background: stat.gradient, display: 'flex', alignItems: 'center',
          justifyContent: 'center', flexShrink: 0,
          boxShadow: `0 3px 10px ${stat.gradient.includes('#f97316') ? 'rgba(249,115,22,0.25)' : stat.gradient.includes('#ec4899') ? 'rgba(236,72,153,0.25)' : stat.gradient.includes('#fb923c') ? 'rgba(251,146,60,0.25)' : 'rgba(244,63,94,0.25)'}`,
        }}>
          <Icon size={17} color="#fff" strokeWidth={1.8} />
        </div>
        <div style={{ flex: 1, minWidth: 0 }}>
          <p style={{ margin: 0, fontSize: '11px', color: colors.textMuted, fontWeight: '500' }}>{stat.label}</p>
          <div style={{ display: 'flex', alignItems: 'baseline', gap: '8px' }}>
            <p style={{ margin: 0, fontSize: '18px', fontWeight: '800', color: colors.text, letterSpacing: '-0.02em', lineHeight: '1.2' }}>
              {stat.value}
            </p>
            <span style={{
              fontSize: '10.5px', fontWeight: '600',
              color: stat.changeType === 'positive' ? '#16a34a' : '#e11d48',
              display: 'flex', alignItems: 'center', gap: '2px',
            }}>
              {stat.changeType === 'positive' ? <ArrowUpRight size={10} /> : <ArrowDownRight size={10} />}
              {stat.change}
            </span>
          </div>
        </div>
        <div style={{ opacity: 0.5 }}>
          <Sparkline data={stat.sparkline} color={stat.changeType === 'positive' ? warm.orange : warm.rose} width={56} height={22} />
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
  const chartH = 180;
  const padX = 16;
  const padY = 16;
  const plotW = chartW - padX * 2;
  const plotH = chartH - padY * 2;
  const barW = plotW / salesData.length * 0.5;
  const gap = plotW / salesData.length;

  useEffect(() => {
    let start = null;
    const duration = 800;
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
      background: colors.bgCard, borderRadius: '16px', padding: '22px',
      border: `1px solid ${colors.border}`,
    }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '20px', flexWrap: 'wrap', gap: '12px' }}>
        <div>
          <h3 style={{ margin: 0, fontSize: '15px', fontWeight: '700', color: colors.text }}>Revenue Overview</h3>
          <p style={{ margin: '4px 0 0', fontSize: '12px', color: colors.textSubtle }}>Monthly revenue breakdown</p>
        </div>
        <div style={{ display: 'flex', gap: '2px', background: colors.bgHover, borderRadius: '8px', padding: '2px' }}>
          {['Week', 'Month', 'Year'].map((period, i) => (
            <button key={period} style={{
              padding: '4px 10px', borderRadius: '6px', border: 'none',
              background: i === 1 ? warm.gradient : 'transparent',
              color: i === 1 ? '#fff' : colors.textMuted,
              fontSize: '11px', cursor: 'pointer', fontWeight: '500',
              transition: 'all 0.15s',
            }}>
              {period}
            </button>
          ))}
        </div>
      </div>

      <div style={{ display: 'flex', gap: '10px', marginBottom: '20px', flexWrap: 'wrap' }}>
        {[
          { label: 'Total Revenue', value: totalRevenue, prefix: '$', icon: DollarSign, gradient: warm.gradient },
          { label: 'Avg. Monthly', value: avgRevenue, prefix: '$', icon: BarChart3, gradient: 'linear-gradient(135deg, #ec4899, #f472b6)' },
          { label: 'Best Month', value: maxRevenue, prefix: '$', icon: TrendingUp, gradient: 'linear-gradient(135deg, #fb923c, #f59e0b)' },
        ].map((s, si) => {
          const SIcon = s.icon;
          return (
            <div key={s.label} style={{
              flex: 1, minWidth: '120px', display: 'flex', alignItems: 'center', gap: '10px',
              padding: '12px 14px', borderRadius: '10px',
              background: colors.bgHover, border: `1px solid ${colors.borderLight}`,
              opacity: anim, transform: `translateY(${(1 - anim) * 8}px)`,
              transition: `opacity 0.4s ease ${si * 0.08}s, transform 0.4s ease ${si * 0.08}s`,
            }}>
              <div style={{
                width: '34px', height: '34px', borderRadius: '9px',
                background: s.gradient, display: 'flex', alignItems: 'center',
                justifyContent: 'center', flexShrink: 0,
              }}>
                <SIcon size={15} color="#fff" strokeWidth={1.8} />
              </div>
              <div>
                <p style={{ margin: 0, fontSize: '10.5px', color: colors.textSubtle, fontWeight: '500' }}>{s.label}</p>
                <p style={{ margin: '2px 0 0', fontSize: '15px', fontWeight: '700', color: colors.text, letterSpacing: '-0.02em' }}>
                  <AnimatedNumber value={s.value} prefix={s.prefix} duration={800} />
                </p>
              </div>
            </div>
          );
        })}
      </div>

      <div style={{
        position: 'relative', background: colors.bgHover, borderRadius: '12px',
        padding: '14px 8px', border: `1px solid ${colors.borderLight}`,
        opacity: anim, transition: 'opacity 0.5s ease 0.15s',
      }}>
        <svg viewBox={`0 0 ${chartW} ${chartH}`} style={{ width: '100%', height: 'auto', display: 'block' }}>
          <defs>
            <linearGradient id="barGrad" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor={warm.orange} />
              <stop offset="100%" stopColor={warm.pink} />
            </linearGradient>
            <linearGradient id="barGradHover" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor={warm.warm600} />
              <stop offset="100%" stopColor={warm.rose600} />
            </linearGradient>
          </defs>
          {[0, 0.25, 0.5, 0.75, 1].map((frac) => {
            const yy = padY + plotH - frac * plotH;
            return (
              <g key={frac}>
                <line x1={padX} y1={yy} x2={chartW - padX} y2={yy}
                  stroke={colors.border} strokeWidth="0.5" strokeDasharray="3 3"
                  opacity={anim * 0.4} />
                <text x={padX - 4} y={yy + 3} textAnchor="end" fontSize="8.5" fill={colors.textSubtle} fontWeight="500">
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
                  fill={isHovered ? 'url(#barGradHover)' : 'url(#barGrad)'}
                  opacity={isHovered ? 1 : 0.85}
                  style={{ transition: 'all 0.2s' }}
                />
                {isHovered && (
                  <g>
                    <rect x={x + barW / 2 - 28} y={y - 30} width="56" height="20" rx="5" fill={warm.warm700} />
                    <text x={x + barW / 2} y={y - 16} textAnchor="middle" fontSize="9.5" fontWeight="600" fill="#fff">
                      ${(d.revenue / 1000).toFixed(1)}k
                    </text>
                  </g>
                )}
                <text x={x + barW / 2} y={padY + plotH + 14} textAnchor="middle"
                  fontSize="10" fontWeight="500" fill={colors.textSubtle}>
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


function TopSellingCategories() {
  const { colors } = useTheme();
  const maxSold = Math.max(...topCategories.map((c) => c.sold));

  return (
    <div style={{
      background: colors.bgCard, borderRadius: '16px', padding: '22px',
      border: `1px solid ${colors.border}`,
    }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '18px' }}>
        <div>
          <h3 style={{ margin: 0, fontSize: '15px', fontWeight: '700', color: colors.text }}>Top Categories</h3>
          <p style={{ margin: '4px 0 0', fontSize: '12px', color: colors.textSubtle }}>Best performing categories</p>
        </div>
        <Link to="/admin/categories" style={{
          fontSize: '12px', color: warm.orange, textDecoration: 'none', fontWeight: '600',
          display: 'flex', alignItems: 'center', gap: '3px',
        }}>
          View All <ChevronRight size={13} />
        </Link>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))', gap: '10px' }}>
        {topCategories.map((cat, index) => {
          const pct = ((cat.sold / maxSold) * 100).toFixed(0);
          const RankBadge = index === 0 ? Crown : index === 1 ? Medal : index === 2 ? Trophy : null;
          return (
            <div key={cat.name} style={{
              display: 'flex', alignItems: 'center', gap: '12px',
              padding: '14px', borderRadius: '12px',
              background: index === 0 ? cat.bg : colors.bgHover,
              border: index === 0 ? `1px solid ${cat.color}22` : `1px solid transparent`,
              transition: 'all 0.25s cubic-bezier(0.4, 0, 0.2, 1)',
              cursor: 'pointer',
            }}
              onMouseEnter={(e) => {
                e.currentTarget.style.transform = 'translateY(-2px)';
                e.currentTarget.style.boxShadow = `0 4px 16px ${cat.color}18`;
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = 'translateY(0)';
                e.currentTarget.style.boxShadow = 'none';
              }}
            >
              <div style={{
                width: '44px', height: '44px', borderRadius: '12px',
                background: `${cat.color}15`, display: 'flex', alignItems: 'center',
                justifyContent: 'center', flexShrink: 0, position: 'relative',
                fontSize: '20px',
              }}>
                {cat.emoji}
                {RankBadge && (
                  <div style={{
                    position: 'absolute', top: '-3px', right: '-3px',
                    width: '16px', height: '16px', borderRadius: '50%',
                    background: cat.color, display: 'flex', alignItems: 'center',
                    justifyContent: 'center', boxShadow: `0 2px 6px ${cat.color}40`,
                  }}>
                    <RankBadge size={9} color="#fff" strokeWidth={2.5} />
                  </div>
                )}
              </div>
              <div style={{ flex: 1, minWidth: 0 }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '4px' }}>
                  <p style={{ margin: 0, fontSize: '13px', fontWeight: '600', color: colors.text }}>{cat.name}</p>
                  <span style={{ fontSize: '12px', fontWeight: '700', color: cat.color }}>{formatCurrency(cat.revenue)}</span>
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                  <div style={{ flex: 1, height: '4px', background: `${cat.color}15`, borderRadius: '2px', overflow: 'hidden' }}>
                    <div style={{
                      height: '100%', borderRadius: '2px',
                      width: `${pct}%`, background: `linear-gradient(90deg, ${cat.color}, ${cat.color}aa)`,
                      transition: 'width 0.5s cubic-bezier(0.4, 0, 0.2, 1)',
                    }} />
                  </div>
                  <span style={{ fontSize: '11px', color: colors.textSubtle, fontWeight: '600', whiteSpace: 'nowrap' }}>
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
      background: colors.bgCard, borderRadius: '16px', padding: '22px',
      border: `1px solid ${colors.border}`,
    }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '18px' }}>
        <div>
          <h3 style={{ margin: 0, fontSize: '15px', fontWeight: '700', color: colors.text }}>Top Products</h3>
          <p style={{ margin: '4px 0 0', fontSize: '12px', color: colors.textSubtle }}>Best by units sold</p>
        </div>
        <Link to="/admin/products" style={{
          fontSize: '12px', color: warm.orange, textDecoration: 'none', fontWeight: '600',
          display: 'flex', alignItems: 'center', gap: '3px',
        }}>
          View All <ChevronRight size={13} />
        </Link>
      </div>

      <div style={{ overflowX: 'auto' }}>
        <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '13px', minWidth: '580px' }}>
          <thead>
            <tr>
              {['#', 'Product', 'Sold', 'Revenue', 'Performance'].map((h) => (
                <th key={h} style={{
                  textAlign: 'left', padding: '8px 12px',
                  fontSize: '10.5px', fontWeight: '600', color: colors.textSubtle,
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
              const rankColors = [warm.orange, warm.pink, warm.rose];
              const isTop3 = index < 3;
              return (
                <tr key={product.name} style={{
                  borderBottom: `1px solid ${colors.borderLight}`,
                  background: index === 0 ? `${warm.orange}08` : 'transparent',
                  transition: 'background 0.15s',
                }}
                  onMouseEnter={(e) => { if (index !== 0) e.currentTarget.style.background = colors.bgHover; }}
                  onMouseLeave={(e) => { if (index !== 0) e.currentTarget.style.background = index === 0 ? `${warm.orange}08` : 'transparent'; }}
                >
                  <td style={{ padding: '12px' }}>
                    <div style={{
                      width: '26px', height: '26px', borderRadius: '7px',
                      background: isTop3 ? rankColors[index] : colors.bgHover,
                      display: 'flex', alignItems: 'center', justifyContent: 'center',
                      fontSize: '11px', fontWeight: '700',
                      color: isTop3 ? '#fff' : colors.textMuted,
                    }}>
                      {index + 1}
                    </div>
                  </td>
                  <td style={{ padding: '12px' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                      <span style={{ fontSize: '20px' }}>{product.emoji}</span>
                      <div>
                        <span style={{ fontWeight: '600', color: colors.text, fontSize: '13px' }}>{product.name}</span>
                        <p style={{ margin: '1px 0 0', fontSize: '11px', color: colors.textSubtle }}>{product.sub}</p>
                      </div>
                    </div>
                  </td>
                  <td style={{ padding: '12px', fontWeight: '600', color: colors.text }}>
                    {product.sold.toLocaleString()}
                  </td>
                  <td style={{ padding: '12px', fontWeight: '700', color: colors.text }}>
                    {formatCurrency(product.revenue)}
                  </td>
                  <td style={{ padding: '12px', minWidth: '140px' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                      <div style={{ flex: 1, height: '5px', background: colors.bgHover, borderRadius: '3px', overflow: 'hidden' }}>
                        <div style={{
                          height: '100%', borderRadius: '3px',
                          width: `${pct}%`,
                          background: isTop3 ? `linear-gradient(90deg, ${rankColors[index]}, ${rankColors[index]}aa)` : warm.gradient,
                          transition: 'width 0.5s cubic-bezier(0.4, 0, 0.2, 1)',
                        }} />
                      </div>
                      <span style={{ fontSize: '11px', fontWeight: '600', color: colors.textMuted, minWidth: '30px' }}>{pct}%</span>
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
      background: colors.bgCard, borderRadius: '16px', padding: '22px',
      border: `1px solid ${colors.border}`,
    }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '18px' }}>
        <div>
          <h3 style={{ margin: 0, fontSize: '15px', fontWeight: '700', color: colors.text }}>Recent Orders</h3>
          <p style={{ margin: '4px 0 0', fontSize: '12px', color: colors.textSubtle }}>Latest customer orders</p>
        </div>
        <Link to="/admin/orders" style={{
          fontSize: '12px', color: warm.orange, textDecoration: 'none', fontWeight: '600',
          display: 'flex', alignItems: 'center', gap: '3px',
        }}>
          View All <ChevronRight size={13} />
        </Link>
      </div>
      <div style={{ overflowX: 'auto' }}>
        <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '13px', minWidth: '520px' }}>
          <thead>
            <tr>
              {['Order', 'Customer', 'Date', 'Amount', 'Status'].map((h) => (
                <th key={h} style={{
                  textAlign: 'left', padding: '8px 12px',
                  fontSize: '10.5px', fontWeight: '600', color: colors.textSubtle,
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
                  <td style={{ padding: '12px', fontWeight: '600', color: warm.orange, fontSize: '12.5px' }}>
                    {order.id}
                  </td>
                  <td style={{ padding: '12px', color: colors.textSecondary, fontWeight: '500' }}>{order.customer}</td>
                  <td style={{ padding: '12px', color: colors.textMuted, fontSize: '12px' }}>{formatDate(order.date)}</td>
                  <td style={{ padding: '12px', fontWeight: '600', color: colors.text }}>
                    {formatCurrency(order.total)}
                  </td>
                  <td style={{ padding: '12px' }}>
                    <span style={{
                      display: 'inline-flex', alignItems: 'center', gap: '4px',
                      padding: '4px 10px', borderRadius: '6px', fontSize: '11px', fontWeight: '600',
                      background: cfg.bg, color: cfg.text, textTransform: 'capitalize',
                    }}>
                      {(() => { const SIcon = cfg.icon; return <SIcon size={11} />; })()}
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
      background: colors.bgCard, borderRadius: '16px', padding: '22px',
      border: `1px solid ${colors.border}`,
    }}>
      <h3 style={{ margin: '0 0 14px', fontSize: '15px', fontWeight: '700', color: colors.text }}>Quick Actions</h3>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(130px, 1fr))', gap: '8px' }}>
        {quickActions.map((action) => {
          const Icon = action.icon;
          return (
            <Link
              key={action.label}
              to={action.path}
              style={{
                display: 'flex', alignItems: 'center', gap: '10px',
                padding: '12px', borderRadius: '10px', textDecoration: 'none',
                border: `1px solid ${colors.border}`, transition: 'all 0.25s cubic-bezier(0.4, 0, 0.2, 1)',
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.transform = 'translateY(-2px)';
                e.currentTarget.style.boxShadow = `0 4px 12px rgba(249,115,22,0.15)`;
                e.currentTarget.style.borderColor = `${warm.orange}40`;
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = 'translateY(0)';
                e.currentTarget.style.boxShadow = 'none';
                e.currentTarget.style.borderColor = colors.border;
              }}
            >
              <div style={{
                width: '36px', height: '36px', borderRadius: '10px',
                background: action.gradient, display: 'flex',
                alignItems: 'center', justifyContent: 'center', flexShrink: 0,
                boxShadow: `0 3px 8px rgba(249,115,22,0.2)`,
              }}>
                <Icon size={16} color="#fff" strokeWidth={2} />
              </div>
              <span style={{ fontSize: '12px', fontWeight: '600', color: colors.textSecondary }}>{action.label}</span>
            </Link>
          );
        })}
      </div>
    </div>
  );
}

function LeftSidebar() {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '16px', minWidth: 0 }}>
      <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
        {statsCards.map((stat) => (
          <StatCard key={stat.label} stat={stat} />
        ))}
      </div>
      <TopSellingCategories />
      <QuickActions />
    </div>
  );
}

export default function AdminDashboard() {
  return (
    <div style={{ display: 'flex', gap: '20px', alignItems: 'flex-start' }}>
      <aside style={{
        width: '340px', flexShrink: 0,
        position: 'sticky', top: '76px',
        maxHeight: 'calc(100vh - 92px)', overflowY: 'auto',
        display: 'flex', flexDirection: 'column', gap: '16px',
      }}>
        <LeftSidebar />
      </aside>

      <main style={{ flex: 1, minWidth: 0, display: 'flex', flexDirection: 'column', gap: '16px' }}>
        <WelcomeBanner />
        <RevenueChart />
        <TopSellingProducts />
        <RecentOrders />
      </main>
    </div>
  );
}
