import { useState, useMemo } from 'react';
import { Link } from 'react-router-dom';
import { formatCurrency } from '../../utils/formatCurrency';
import { formatDate } from '../../utils/formatDate';
import { useTheme } from '../../hooks/useTheme';
import {
  ShoppingCart, Search, Filter, ChevronDown, Eye, MoreHorizontal,
  CheckCircle2, Clock, Truck, XCircle, AlertCircle,
  Package, Download, RefreshCw,
} from 'lucide-react';

const ordersData = [
  { id: 'ORD-7891', customer: 'John Doe', date: '2026-08-16', items: 3, total: 129.99, status: 'delivered' },
  { id: 'ORD-7890', customer: 'Jane Smith', date: '2026-08-16', items: 2, total: 89.50, status: 'processing' },
  { id: 'ORD-7889', customer: 'Bob Wilson', date: '2026-08-15', items: 5, total: 245.00, status: 'shipped' },
  { id: 'ORD-7888', customer: 'Alice Brown', date: '2026-08-15', items: 1, total: 67.25, status: 'pending' },
  { id: 'ORD-7887', customer: 'Charlie Davis', date: '2026-08-14', items: 4, total: 198.00, status: 'delivered' },
  { id: 'ORD-7886', customer: 'Diana Evans', date: '2026-08-14', items: 2, total: 312.75, status: 'cancelled' },
  { id: 'ORD-7885', customer: 'Edward Hall', date: '2026-08-13', items: 3, total: 156.00, status: 'delivered' },
  { id: 'ORD-7884', customer: 'Fiona Clark', date: '2026-08-13', items: 1, total: 42.50, status: 'shipped' },
];

const statusConfig = {
  pending: { bg: '#f5f5f5', text: '#525252', icon: AlertCircle, color: '#0a0a0a' },
  processing: { bg: '#eeeeee', text: '#262626', icon: Clock, color: '#0a0a0a' },
  shipped: { bg: '#e8e8e8', text: '#0a0a0a', icon: Truck, color: '#171717' },
  delivered: { bg: '#e8e8e8', text: '#0a0a0a', icon: CheckCircle2, color: '#171717' },
  cancelled: { bg: '#f0f0f0', text: '#737373', icon: XCircle, color: '#0a0a0a' },
};

const statusFilters = ['all', 'pending', 'processing', 'shipped', 'delivered', 'cancelled'];

function StatCard({ label, value, icon: Icon, gradient, shadowColor }) {
  const { colors } = useTheme();
  return (
    <div style={{
      background: colors.bgCard, borderRadius: '16px', padding: '20px 22px',
      border: `1px solid ${colors.border}`, flex: '1 1 160px',
      transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
      cursor: 'default', minWidth: '150px',
    }}
      onMouseEnter={(e) => {
        e.currentTarget.style.transform = 'translateY(-3px)';
        e.currentTarget.style.boxShadow = `0 12px 28px ${shadowColor}`;
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.transform = 'translateY(0)';
        e.currentTarget.style.boxShadow = 'none';
      }}
    >
      <div style={{ display: 'flex', alignItems: 'center', gap: '14px' }}>
        <div style={{
          width: '46px', height: '46px', borderRadius: '12px',
          background: gradient, display: 'flex', alignItems: 'center',
          justifyContent: 'center', boxShadow: `0 6px 16px ${shadowColor}`, flexShrink: 0,
        }}>
          <Icon size={21} color="#fff" strokeWidth={2} />
        </div>
        <div>
          <p style={{ margin: 0, fontSize: '12px', color: colors.textMuted, fontWeight: '500', marginBottom: '2px' }}>
            {label}
          </p>
          <p style={{ margin: 0, fontSize: '24px', fontWeight: '800', color: colors.text, letterSpacing: '-0.02em' }}>
            {value}
          </p>
        </div>
      </div>
    </div>
  );
}

function StatusBadge({ status }) {
  const cfg = statusConfig[status] || statusConfig.pending;
  const StatusIcon = cfg.icon;
  return (
    <span style={{
      display: 'inline-flex', alignItems: 'center', gap: '5px',
      padding: '5px 12px', borderRadius: '8px', fontSize: '12px', fontWeight: '600',
      background: cfg.bg, color: cfg.text, textTransform: 'capitalize', whiteSpace: 'nowrap',
    }}>
      <StatusIcon size={12} />
      {status}
    </span>
  );
}

export default function Orders() {
  const { colors } = useTheme();
  const [statusFilter, setStatusFilter] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [dropdownOpen, setDropdownOpen] = useState(false);

  const stats = useMemo(() => {
    const counts = { pending: 0, processing: 0, shipped: 0, delivered: 0, cancelled: 0 };
    ordersData.forEach((o) => { counts[o.status] = (counts[o.status] || 0) + 1; });
    return counts;
  }, []);

  const filteredOrders = useMemo(() => {
    return ordersData.filter((order) => {
      const matchesStatus = statusFilter === 'all' || order.status === statusFilter;
      const query = searchQuery.toLowerCase();
      const matchesSearch = !query ||
        order.id.toLowerCase().includes(query) ||
        order.customer.toLowerCase().includes(query);
      return matchesStatus && matchesSearch;
    });
  }, [statusFilter, searchQuery]);

  const statCards = [
    { label: 'Total Orders', value: ordersData.length, icon: ShoppingCart, gradient: '#000000', shadowColor: 'rgba(0,0,0,0.12)' },
    { label: 'Pending', value: stats.pending, icon: Clock, gradient: '#000000', shadowColor: 'rgba(0,0,0,0.3)' },
    { label: 'Shipped', value: stats.shipped, icon: Truck, gradient: '#262626', shadowColor: 'rgba(0,0,0,0.3)' },
    { label: 'Delivered', value: stats.delivered, icon: CheckCircle2, gradient: '#171717', shadowColor: 'rgba(0,0,0,0.3)' },
  ];

  return (
    <div>
      <div style={{
        background: '#0a0a0a',
        borderRadius: '20px', padding: 'clamp(24px, 3vw, 36px)',
        position: 'relative', overflow: 'hidden', marginBottom: '24px',
      }}>
        <div style={{ position: 'relative', zIndex: 1, display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', flexWrap: 'wrap', gap: '20px' }}>
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '8px' }}>
              <ShoppingCart size={18} color="#fafafa" />
              <span style={{ fontSize: '12px', fontWeight: '600', color: 'rgba(255,255,255,0.7)', textTransform: 'uppercase', letterSpacing: '0.1em' }}>Order Management</span>
            </div>
            <h1 style={{ margin: 0, fontSize: 'clamp(22px, 3vw, 28px)', fontWeight: '800', color: '#fff', letterSpacing: '-0.02em', lineHeight: '1.2' }}>
              Orders
            </h1>
            <p style={{ margin: '8px 0 0', fontSize: 'clamp(13px, 2vw, 15px)', color: 'rgba(255,255,255,0.7)', maxWidth: '480px', lineHeight: '1.5' }}>
              Manage customer orders, track shipments, and process deliveries.
            </p>
          </div>
          <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
            <button style={{
              display: 'inline-flex', alignItems: 'center', gap: '6px',
              padding: '10px 18px', borderRadius: '10px', background: 'rgba(255,255,255,0.15)',
              color: '#fff', fontSize: '13px', fontWeight: '600', cursor: 'pointer',
              border: '1px solid rgba(255,255,255,0.12)', backdropFilter: 'blur(8px)',
              transition: 'all 0.2s',
            }}
              onMouseEnter={(e) => { e.currentTarget.style.background = 'rgba(255,255,255,0.25)'; }}
              onMouseLeave={(e) => { e.currentTarget.style.background = 'rgba(255,255,255,0.15)'; }}
            >
              <Download size={15} /> Export
            </button>
            <button style={{
              display: 'inline-flex', alignItems: 'center', gap: '6px',
              padding: '10px 18px', borderRadius: '10px', background: 'rgba(255,255,255,0.15)',
              color: '#fff', fontSize: '13px', fontWeight: '600', cursor: 'pointer',
              border: '1px solid rgba(255,255,255,0.12)', backdropFilter: 'blur(8px)',
              transition: 'all 0.2s',
            }}
              onMouseEnter={(e) => { e.currentTarget.style.background = 'rgba(255,255,255,0.25)'; }}
              onMouseLeave={(e) => { e.currentTarget.style.background = 'rgba(255,255,255,0.15)'; }}
            >
              <RefreshCw size={15} /> Refresh
            </button>
          </div>
        </div>
        <div style={{ position: 'absolute', top: '-60px', right: '-40px', width: '220px', height: '220px', borderRadius: '50%', background: 'rgba(255,255,255,0.05)' }} />
        <div style={{ position: 'absolute', bottom: '-50px', right: '100px', width: '140px', height: '140px', borderRadius: '50%', background: 'rgba(255,255,255,0.04)' }} />
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(170px, 1fr))', gap: '16px', marginBottom: '24px' }}>
        {statCards.map((stat) => (
          <StatCard key={stat.label} {...stat} />
        ))}
      </div>

      <div style={{
        background: colors.bgCard, borderRadius: '16px', padding: '18px 22px',
        border: `1px solid ${colors.border}`, marginBottom: '24px',
        display: 'flex', alignItems: 'center', gap: '14px', flexWrap: 'wrap',
      }}>
        <div style={{
          flex: '1 1 240px', display: 'flex', alignItems: 'center', gap: '10px',
          padding: '10px 14px', borderRadius: '10px',
          background: colors.bgInput, border: `1px solid ${colors.borderInput}`,
          transition: 'border-color 0.2s',
        }}
          onFocus={(e) => { e.currentTarget.style.borderColor = colors.accent; }}
          onBlur={(e) => { e.currentTarget.style.borderColor = colors.borderInput; }}
        >
          <Search size={16} color={colors.textSubtle} />
          <input
            type="text"
            placeholder="Search by order ID or customer..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            style={{
              border: 'none', outline: 'none', background: 'transparent',
              fontSize: '13.5px', color: colors.text, width: '100%',
              fontFamily: 'inherit',
            }}
          />
        </div>
        <div style={{ position: 'relative' }}>
          <button
            onClick={() => setDropdownOpen(!dropdownOpen)}
            style={{
              display: 'flex', alignItems: 'center', gap: '8px',
              padding: '10px 16px', borderRadius: '10px',
              background: statusFilter !== 'all' ? colors.bgAccent : colors.bgInput,
              border: `1px solid ${statusFilter !== 'all' ? colors.accent : colors.borderInput}`,
              color: statusFilter !== 'all' ? colors.accent : colors.textSecondary,
              fontSize: '13px', fontWeight: '600', cursor: 'pointer',
              transition: 'all 0.2s', fontFamily: 'inherit', textTransform: 'capitalize',
            }}
          >
            <Filter size={14} />
            {statusFilter === 'all' ? 'All Status' : statusFilter}
            <ChevronDown size={14} style={{ transition: 'transform 0.2s', transform: dropdownOpen ? 'rotate(180deg)' : 'rotate(0)' }} />
          </button>
          {dropdownOpen && (
            <div style={{
              position: 'absolute', top: 'calc(100% + 6px)', right: 0, zIndex: 20,
              background: colors.bgCard, border: `1px solid ${colors.border}`,
              borderRadius: '12px', padding: '6px', minWidth: '160px',
              boxShadow: colors.shadowLg,
            }}>
              {statusFilters.map((s) => (
                <button
                  key={s}
                  onClick={() => { setStatusFilter(s); setDropdownOpen(false); }}
                  style={{
                    display: 'block', width: '100%', padding: '8px 12px',
                    borderRadius: '8px', border: 'none', cursor: 'pointer',
                    background: statusFilter === s ? colors.bgAccent : 'transparent',
                    color: statusFilter === s ? colors.accent : colors.textSecondary,
                    fontSize: '13px', fontWeight: statusFilter === s ? '600' : '500',
                    textAlign: 'left', textTransform: 'capitalize', fontFamily: 'inherit',
                    transition: 'background 0.15s',
                  }}
                  onMouseEnter={(e) => { if (statusFilter !== s) e.currentTarget.style.background = colors.bgHover; }}
                  onMouseLeave={(e) => { if (statusFilter !== s) e.currentTarget.style.background = 'transparent'; }}
                >
                  {s === 'all' ? 'All Status' : s}
                </button>
              ))}
            </div>
          )}
        </div>
      </div>

      <div style={{
        background: colors.bgCard, borderRadius: '20px',
        border: `1px solid ${colors.border}`, overflow: 'hidden',
      }}>
        <div style={{ overflowX: 'auto' }}>
          <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '13.5px', minWidth: '720px' }}>
            <thead>
              <tr>
                {['Order ID', 'Customer', 'Date', 'Items', 'Total', 'Status', 'Actions'].map((h) => (
                  <th key={h} style={{
                    textAlign: 'left', padding: '14px 18px',
                    fontSize: '11.5px', fontWeight: '600', color: colors.textSubtle,
                    textTransform: 'uppercase', letterSpacing: '0.06em',
                    borderBottom: `1px solid ${colors.border}`,
                    whiteSpace: 'nowrap',
                  }}>
                    {h}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {filteredOrders.length === 0 ? (
                <tr>
                  <td colSpan={7} style={{
                    padding: '48px 18px', textAlign: 'center',
                    color: colors.textMuted, fontSize: '14px',
                  }}>
                    No orders found matching your criteria.
                  </td>
                </tr>
              ) : (
                filteredOrders.map((order) => (
                  <tr key={order.id} style={{
                    borderBottom: `1px solid ${colors.borderLight}`,
                    transition: 'background 0.15s',
                  }}
                    onMouseEnter={(e) => { e.currentTarget.style.background = colors.bgHover; }}
                    onMouseLeave={(e) => { e.currentTarget.style.background = 'transparent'; }}
                  >
                    <td style={{ padding: '16px 18px' }}>
                      <Link to={`/admin/orders/${order.id}`} style={{
                        fontWeight: '600', color: colors.accent, textDecoration: 'none',
                        fontSize: '13.5px', transition: 'opacity 0.15s',
                      }}
                        onMouseEnter={(e) => { e.currentTarget.style.opacity = '0.8'; }}
                        onMouseLeave={(e) => { e.currentTarget.style.opacity = '1'; }}
                      >
                        {order.id}
                      </Link>
                    </td>
                    <td style={{ padding: '16px 18px', color: colors.textSecondary, fontWeight: '500' }}>
                      {order.customer}
                    </td>
                    <td style={{ padding: '16px 18px', color: colors.textMuted, whiteSpace: 'nowrap' }}>
                      {formatDate(order.date)}
                    </td>
                    <td style={{ padding: '16px 18px' }}>
                      <span style={{
                        display: 'inline-flex', alignItems: 'center', gap: '5px',
                        padding: '4px 10px', borderRadius: '6px',
                        background: colors.bgHover, color: colors.textSecondary,
                        fontSize: '12.5px', fontWeight: '600',
                      }}>
                        <Package size={12} color={colors.textSubtle} />
                        {order.items} {order.items === 1 ? 'item' : 'items'}
                      </span>
                    </td>
                    <td style={{ padding: '16px 18px', fontWeight: '700', color: colors.text, whiteSpace: 'nowrap' }}>
                      {formatCurrency(order.total)}
                    </td>
                    <td style={{ padding: '16px 18px' }}>
                      <StatusBadge status={order.status} />
                    </td>
                    <td style={{ padding: '16px 18px' }}>
                      <div style={{ display: 'flex', gap: '6px' }}>
                        <Link to={`/admin/orders/${order.id}`} style={{
                          display: 'flex', alignItems: 'center', justifyContent: 'center',
                          width: '34px', height: '34px', borderRadius: '8px',
                          background: colors.bgHover, color: colors.textMuted,
                          transition: 'all 0.15s', textDecoration: 'none',
                        }}
                          onMouseEnter={(e) => { e.currentTarget.style.background = colors.bgAccent; e.currentTarget.style.color = colors.accent; }}
                          onMouseLeave={(e) => { e.currentTarget.style.background = colors.bgHover; e.currentTarget.style.color = colors.textMuted; }}
                        >
                          <Eye size={15} />
                        </Link>
                        <button style={{
                          display: 'flex', alignItems: 'center', justifyContent: 'center',
                          width: '34px', height: '34px', borderRadius: '8px',
                          background: colors.bgHover, color: colors.textMuted,
                          border: 'none', cursor: 'pointer', transition: 'all 0.15s',
                        }}
                          onMouseEnter={(e) => { e.currentTarget.style.background = colors.bgAccent; e.currentTarget.style.color = colors.accent; }}
                          onMouseLeave={(e) => { e.currentTarget.style.background = colors.bgHover; e.currentTarget.style.color = colors.textMuted; }}
                        >
                          <MoreHorizontal size={15} />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
        {filteredOrders.length > 0 && (
          <div style={{
            padding: '14px 18px', borderTop: `1px solid ${colors.border}`,
            display: 'flex', justifyContent: 'space-between', alignItems: 'center',
            flexWrap: 'wrap', gap: '8px',
          }}>
            <span style={{ fontSize: '13px', color: colors.textMuted, fontWeight: '500' }}>
              Showing {filteredOrders.length} of {ordersData.length} orders
            </span>
            <div style={{ display: 'flex', gap: '4px' }}>
              {[1].map((p) => (
                <button key={p} style={{
                  padding: '6px 12px', borderRadius: '8px', border: 'none',
                  background: colors.accent, color: colors.bg,
                  fontSize: '12.5px', fontWeight: '600', cursor: 'default',
                }}>
                  {p}
                </button>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
