import { useState } from 'react';
import { Link } from 'react-router-dom';
import { formatCurrency } from '../../utils/formatCurrency';
import { formatDate } from '../../utils/formatDate';
import { useTheme } from '../../hooks/useTheme';
import {
  DollarSign, Clock, RotateCcw, TrendingUp,
  CreditCard, Search, Filter, Download, ChevronDown,
  CheckCircle2, AlertCircle, XCircle, ArrowUpRight,
  Eye, MoreHorizontal, Receipt,
} from 'lucide-react';

const statsCards = [
  {
    label: 'Total Revenue',
    value: 45231.89,
    icon: DollarSign,
    gradient: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
    shadowColor: 'rgba(102,126,234,0.3)',
  },
  {
    label: 'This Month',
    value: 8420.50,
    icon: TrendingUp,
    gradient: 'linear-gradient(135deg, #11998e 0%, #38ef7d 100%)',
    shadowColor: 'rgba(17,153,142,0.3)',
  },
  {
    label: 'Pending',
    value: 2340.00,
    icon: Clock,
    gradient: 'linear-gradient(135deg, #f59e0b 0%, #fbbf24 100%)',
    shadowColor: 'rgba(245,158,11,0.3)',
  },
  {
    label: 'Refunded',
    value: 890.00,
    icon: RotateCcw,
    gradient: 'linear-gradient(135deg, #ef4444 0%, #f87171 100%)',
    shadowColor: 'rgba(239,68,68,0.3)',
  },
];

const payments = [
  { id: 'TXN-9001', order: 'ORD-7891', customer: 'John Doe', method: 'Credit Card', amount: 129.99, status: 'completed', date: '2026-08-16' },
  { id: 'TXN-9002', order: 'ORD-7890', customer: 'Jane Smith', method: 'PayPal', amount: 89.50, status: 'completed', date: '2026-08-16' },
  { id: 'TXN-9003', order: 'ORD-7889', customer: 'Bob Wilson', method: 'Credit Card', amount: 245.00, status: 'pending', date: '2026-08-15' },
  { id: 'TXN-9004', order: 'ORD-7888', customer: 'Alice Brown', method: 'Stripe', amount: 67.25, status: 'completed', date: '2026-08-15' },
  { id: 'TXN-9005', order: 'ORD-7887', customer: 'Charlie Davis', method: 'PayPal', amount: 198.00, status: 'completed', date: '2026-08-14' },
  { id: 'TXN-9006', order: 'ORD-7886', customer: 'Diana Evans', method: 'Credit Card', amount: 312.75, status: 'refunded', date: '2026-08-14' },
];

const statusConfig = {
  completed: { bg: '#ecfdf5', text: '#047857', icon: CheckCircle2, color: '#10b981' },
  pending: { bg: '#fffbeb', text: '#b45309', icon: AlertCircle, color: '#f59e0b' },
  refunded: { bg: '#fef2f2', text: '#b91c1c', icon: XCircle, color: '#ef4444' },
};

const methodIcons = {
  'Credit Card': CreditCard,
  'PayPal': Receipt,
  'Stripe': Receipt,
};

function StatCard({ stat }) {
  const { colors } = useTheme();
  const Icon = stat.icon;

  return (
    <div
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
      </div>
      <p style={{ margin: 0, fontSize: '12.5px', color: colors.textMuted, fontWeight: '500', marginBottom: '4px' }}>
        {stat.label}
      </p>
      <p style={{ margin: 0, fontSize: '26px', fontWeight: '800', color: colors.text, letterSpacing: '-0.02em', lineHeight: '1.2' }}>
        {formatCurrency(stat.value)}
      </p>
    </div>
  );
}

export default function Payments() {
  const { colors } = useTheme();
  const [searchTerm, setSearchTerm] = useState('');

  const filteredPayments = payments.filter(
    (p) =>
      p.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
      p.customer.toLowerCase().includes(searchTerm.toLowerCase()) ||
      p.order.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div>
      <div style={{ marginBottom: '24px' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '4px' }}>
          <Receipt size={24} color={colors.accent} />
          <h1 style={{ margin: 0, fontSize: 'clamp(22px, 3vw, 28px)', fontWeight: '800', color: colors.text, letterSpacing: '-0.02em' }}>
            Payments
          </h1>
        </div>
        <p style={{ margin: 0, fontSize: '14px', color: colors.textSubtle }}>Track all transactions</p>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '16px', marginBottom: '24px' }}>
        {statsCards.map((stat) => (
          <StatCard key={stat.label} stat={stat} />
        ))}
      </div>

      <div style={{
        background: colors.bgCard, borderRadius: '20px', padding: '24px',
        border: `1px solid ${colors.border}`,
      }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px', flexWrap: 'wrap', gap: '12px' }}>
          <div style={{ position: 'relative', flex: '1 1 240px', maxWidth: '360px' }}>
            <Search size={16} style={{ position: 'absolute', left: '12px', top: '50%', transform: 'translateY(-50%)', color: colors.textMuted }} />
            <input
              type="text"
              placeholder="Search transactions..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              style={{
                width: '100%', padding: '10px 12px 10px 38px',
                borderRadius: '10px', border: `1px solid ${colors.border}`,
                background: colors.bgHover, color: colors.text,
                fontSize: '13px', outline: 'none', transition: 'border-color 0.2s',
              }}
              onFocus={(e) => { e.target.style.borderColor = colors.accent; }}
              onBlur={(e) => { e.target.style.borderColor = colors.border; }}
            />
          </div>
          <div style={{ display: 'flex', gap: '8px' }}>
            <button style={{
              display: 'inline-flex', alignItems: 'center', gap: '6px',
              padding: '10px 16px', borderRadius: '10px',
              border: `1px solid ${colors.border}`, background: colors.bgCard,
              color: colors.textSecondary, fontSize: '13px', fontWeight: '500',
              cursor: 'pointer', transition: 'all 0.15s',
            }}
              onMouseEnter={(e) => { e.currentTarget.style.background = colors.bgHover; }}
              onMouseLeave={(e) => { e.currentTarget.style.background = colors.bgCard; }}
            >
              <Filter size={14} /> Filter <ChevronDown size={12} />
            </button>
            <button style={{
              display: 'inline-flex', alignItems: 'center', gap: '6px',
              padding: '10px 16px', borderRadius: '10px',
              border: `1px solid ${colors.border}`, background: colors.bgCard,
              color: colors.textSecondary, fontSize: '13px', fontWeight: '500',
              cursor: 'pointer', transition: 'all 0.15s',
            }}
              onMouseEnter={(e) => { e.currentTarget.style.background = colors.bgHover; }}
              onMouseLeave={(e) => { e.currentTarget.style.background = colors.bgCard; }}
            >
              <Download size={14} /> Export
            </button>
          </div>
        </div>

        <div style={{ overflowX: 'auto' }}>
          <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '13.5px', minWidth: '750px' }}>
            <thead>
              <tr>
                {['Transaction ID', 'Order', 'Customer', 'Method', 'Amount', 'Status', 'Date', ''].map((h) => (
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
              {filteredPayments.map((payment) => {
                const cfg = statusConfig[payment.status] || statusConfig.pending;
                const StatusIcon = cfg.icon;
                const MethodIcon = methodIcons[payment.method] || Receipt;
                return (
                  <tr key={payment.id} style={{
                    borderBottom: `1px solid ${colors.borderLight}`,
                    transition: 'background 0.15s',
                  }}
                    onMouseEnter={(e) => { e.currentTarget.style.background = colors.bgHover; }}
                    onMouseLeave={(e) => { e.currentTarget.style.background = 'transparent'; }}
                  >
                    <td style={{ padding: '14px', fontWeight: '600', color: colors.accent, fontSize: '13px' }}>
                      {payment.id}
                    </td>
                    <td style={{ padding: '14px', color: colors.textSecondary, fontWeight: '500' }}>
                      <Link to={`/admin/orders/${payment.order}`} style={{ color: colors.accent, textDecoration: 'none', fontWeight: '500' }}>
                        {payment.order}
                      </Link>
                    </td>
                    <td style={{ padding: '14px', color: colors.text, fontWeight: '500' }}>
                      {payment.customer}
                    </td>
                    <td style={{ padding: '14px' }}>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                        <div style={{
                          width: '30px', height: '30px', borderRadius: '8px',
                          background: colors.bgHover, display: 'flex', alignItems: 'center',
                          justifyContent: 'center',
                        }}>
                          <MethodIcon size={14} color={colors.textMuted} />
                        </div>
                        <span style={{ color: colors.textSecondary, fontWeight: '500' }}>{payment.method}</span>
                      </div>
                    </td>
                    <td style={{ padding: '14px', fontWeight: '700', color: colors.text }}>
                      {formatCurrency(payment.amount)}
                    </td>
                    <td style={{ padding: '14px' }}>
                      <span style={{
                        display: 'inline-flex', alignItems: 'center', gap: '5px',
                        padding: '5px 12px', borderRadius: '8px', fontSize: '12px', fontWeight: '600',
                        background: cfg.bg, color: cfg.text, textTransform: 'capitalize',
                      }}>
                        <StatusIcon size={12} />
                        {payment.status}
                      </span>
                    </td>
                    <td style={{ padding: '14px', color: colors.textMuted }}>
                      {formatDate(payment.date)}
                    </td>
                    <td style={{ padding: '14px' }}>
                      <div style={{ display: 'flex', gap: '4px' }}>
                        <button style={{
                          width: '32px', height: '32px', borderRadius: '8px',
                          border: `1px solid ${colors.border}`, background: colors.bgCard,
                          display: 'flex', alignItems: 'center', justifyContent: 'center',
                          cursor: 'pointer', transition: 'all 0.15s',
                        }}
                          onMouseEnter={(e) => { e.currentTarget.style.background = colors.bgHover; }}
                          onMouseLeave={(e) => { e.currentTarget.style.background = colors.bgCard; }}
                        >
                          <Eye size={14} color={colors.textMuted} />
                        </button>
                        <button style={{
                          width: '32px', height: '32px', borderRadius: '8px',
                          border: `1px solid ${colors.border}`, background: colors.bgCard,
                          display: 'flex', alignItems: 'center', justifyContent: 'center',
                          cursor: 'pointer', transition: 'all 0.15s',
                        }}
                          onMouseEnter={(e) => { e.currentTarget.style.background = colors.bgHover; }}
                          onMouseLeave={(e) => { e.currentTarget.style.background = colors.bgCard; }}
                        >
                          <MoreHorizontal size={14} color={colors.textMuted} />
                        </button>
                      </div>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>

        {filteredPayments.length === 0 && (
          <div style={{ textAlign: 'center', padding: '48px 24px', color: colors.textMuted }}>
            <Receipt size={40} style={{ marginBottom: '12px', opacity: 0.4 }} />
            <p style={{ margin: 0, fontSize: '14px', fontWeight: '500' }}>No transactions found</p>
            <p style={{ margin: '4px 0 0', fontSize: '13px' }}>Try adjusting your search</p>
          </div>
        )}
      </div>
    </div>
  );
}
