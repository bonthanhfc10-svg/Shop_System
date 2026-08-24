import { useState } from 'react';
import { useTheme } from '../../hooks/useTheme';
import {
  Star, MessageSquare, ThumbsUp, AlertTriangle, Trash2,
  CheckCircle2, Flag, Clock, Search, Filter, ChevronDown,
} from 'lucide-react';

const reviewsData = [
  { id: 1, rating: 5, customer: 'John Doe', product: 'Wireless Bluetooth Headphones', text: 'Great sound quality!', date: '2026-08-16', status: 'approved' },
  { id: 2, rating: 4, customer: 'Jane Smith', product: 'Smart Watch Pro', text: 'Good but battery could be better', date: '2026-08-15', status: 'approved' },
  { id: 3, rating: 3, customer: 'Bob Wilson', product: 'USB-C Hub Adapter', text: 'Works fine, a bit slow', date: '2026-08-14', status: 'pending' },
  { id: 4, rating: 5, customer: 'Alice Brown', product: 'Mechanical Keyboard RGB', text: 'Best keyboard ever!', date: '2026-08-13', status: 'approved' },
  { id: 5, rating: 2, customer: 'Charlie Davis', product: 'Wireless Mouse Ergonomic', text: 'Scroll wheel broke after 2 weeks', date: '2026-08-12', status: 'flagged' },
  { id: 6, rating: 4, customer: 'Diana Evans', product: '4K Webcam HD', text: 'Clear picture, good for calls', date: '2026-08-11', status: 'approved' },
  { id: 7, rating: 1, customer: 'Edward Hall', product: 'Laptop Stand Adjustable', text: 'Very wobbly, poor quality', date: '2026-08-10', status: 'flagged' },
  { id: 8, rating: 5, customer: 'Fiona Clark', product: 'Portable SSD 1TB', text: 'Fast and reliable!', date: '2026-08-09', status: 'approved' },
];

const statsCards = [
  { label: 'Total Reviews', value: '1,247', icon: MessageSquare, gradient: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)', shadowColor: 'rgba(102,126,234,0.3)' },
  { label: 'Average Rating', value: '4.3', icon: Star, gradient: 'linear-gradient(135deg, #f59e0b 0%, #f97316 100%)', shadowColor: 'rgba(245,158,11,0.3)' },
  { label: 'Pending', value: '23', icon: Clock, gradient: 'linear-gradient(135deg, #4facfe 0%, #00f2fe 100%)', shadowColor: 'rgba(79,172,254,0.3)' },
  { label: 'Flagged', value: '5', icon: AlertTriangle, gradient: 'linear-gradient(135deg, #fa709a 0%, #fee140 100%)', shadowColor: 'rgba(250,112,154,0.3)' },
];

const statusConfig = {
  approved: { bg: '#dcfce7', text: '#166534', dot: '#22c55e', icon: CheckCircle2 },
  pending: { bg: '#fef9c3', text: '#854d0e', dot: '#eab308', icon: Clock },
  flagged: { bg: '#fef2f2', text: '#991b1b', dot: '#ef4444', icon: Flag },
};

function StarRating({ rating, size = 16 }) {
  const { colors } = useTheme();
  return (
    <div style={{ display: 'flex', gap: '2px' }}>
      {[1, 2, 3, 4, 5].map((i) => (
        <Star
          key={i}
          size={size}
          fill={i <= rating ? '#f59e0b' : 'none'}
          color={i <= rating ? '#f59e0b' : colors.border}
          strokeWidth={1.8}
        />
      ))}
    </div>
  );
}

function StatCard({ stat }) {
  const { colors } = useTheme();
  const Icon = stat.icon;
  return (
    <div
      style={{
        background: colors.bgCard, borderRadius: '16px', padding: '22px',
        border: `1px solid ${colors.border}`, flex: '1 1 200px',
        position: 'relative', overflow: 'hidden',
        transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
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
      <div style={{ display: 'flex', alignItems: 'center', gap: '14px' }}>
        <div style={{
          width: '48px', height: '48px', borderRadius: '14px',
          background: stat.gradient, display: 'flex', alignItems: 'center',
          justifyContent: 'center', boxShadow: `0 8px 20px ${stat.shadowColor}`, flexShrink: 0,
        }}>
          <Icon size={22} color="#fff" strokeWidth={2} />
        </div>
        <div>
          <p style={{ margin: 0, fontSize: '12.5px', color: colors.textMuted, fontWeight: '500' }}>
            {stat.label}
          </p>
          <p style={{ margin: '4px 0 0', fontSize: '26px', fontWeight: '800', color: colors.text, letterSpacing: '-0.02em', lineHeight: '1.2' }}>
            {stat.value}
          </p>
        </div>
      </div>
    </div>
  );
}

export default function Reviews() {
  const { colors } = useTheme();
  const [search, setSearch] = useState('');
  const [filterStatus, setFilterStatus] = useState('All');
  const [hoveredRow, setHoveredRow] = useState(null);
  const [reviews, setReviews] = useState(reviewsData);

  const filtered = reviews.filter((r) => {
    const matchesSearch =
      r.customer.toLowerCase().includes(search.toLowerCase()) ||
      r.product.toLowerCase().includes(search.toLowerCase()) ||
      r.text.toLowerCase().includes(search.toLowerCase());
    const matchesStatus = filterStatus === 'All' || r.status === filterStatus;
    return matchesSearch && matchesStatus;
  });

  const handleApprove = (id) => {
    setReviews((prev) => prev.map((r) => r.id === id ? { ...r, status: 'approved' } : r));
  };

  const handleFlag = (id) => {
    setReviews((prev) => prev.map((r) => r.id === id ? { ...r, status: 'flagged' } : r));
  };

  const handleDelete = (id) => {
    setReviews((prev) => prev.filter((r) => r.id !== id));
  };

  return (
    <div style={{ padding: 'clamp(16px, 3vw, 32px)', maxWidth: '1200px', margin: '0 auto' }}>
      <div style={{
        display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start',
        flexWrap: 'wrap', gap: '16px', marginBottom: '32px',
      }}>
        <div>
          <h1 style={{
            margin: 0, fontSize: 'clamp(22px, 3vw, 28px)', fontWeight: '800',
            color: colors.text, letterSpacing: '-0.02em',
          }}>
            Reviews
          </h1>
          <p style={{ margin: '6px 0 0', fontSize: '14px', color: colors.textMuted }}>
            Customer feedback
          </p>
        </div>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '16px', marginBottom: '32px' }}>
        {statsCards.map((stat) => (
          <StatCard key={stat.label} stat={stat} />
        ))}
      </div>

      <div style={{
        display: 'flex', gap: '12px', flexWrap: 'wrap',
        marginBottom: '24px', alignItems: 'center',
      }}>
        <div style={{
          display: 'flex', alignItems: 'center', gap: '8px',
          flex: '1 1 280px', padding: '10px 16px',
          borderRadius: '12px', background: colors.bgInput,
          border: `1px solid ${colors.borderInput}`,
          transition: 'border-color 0.2s',
        }}>
          <Search size={18} color={colors.textSubtle} />
          <input
            type="text"
            placeholder="Search reviews..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            style={{
              border: 'none', outline: 'none', background: 'transparent',
              fontSize: '14px', color: colors.text, width: '100%',
            }}
          />
        </div>
        <div style={{ position: 'relative', display: 'flex', alignItems: 'center', gap: '8px' }}>
          <Filter size={16} color={colors.textSubtle} />
          <select
            value={filterStatus}
            onChange={(e) => setFilterStatus(e.target.value)}
            style={{
              padding: '10px 36px 10px 14px', borderRadius: '12px',
              background: colors.bgInput, border: `1px solid ${colors.borderInput}`,
              fontSize: '14px', color: colors.text, cursor: 'pointer',
              outline: 'none', appearance: 'none',
              backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='12' height='12' fill='%2364748b' viewBox='0 0 16 16'%3E%3Cpath d='M8 11L3 6h10l-5 5z'/%3E%3C/svg%3E")`,
              backgroundRepeat: 'no-repeat',
              backgroundPosition: 'right 12px center',
            }}
          >
            {['All', 'approved', 'pending', 'flagged'].map((s) => (
              <option key={s} value={s}>{s === 'All' ? 'All' : s.charAt(0).toUpperCase() + s.slice(1)}</option>
            ))}
          </select>
        </div>
      </div>

      <div style={{
        background: colors.bgCard, borderRadius: '16px',
        border: `1px solid ${colors.border}`, overflow: 'hidden',
        boxShadow: colors.shadowCard,
      }}>
        <div style={{ overflowX: 'auto' }}>
          <table style={{ width: '100%', borderCollapse: 'collapse', minWidth: '740px' }}>
            <thead>
              <tr>
                {['Rating', 'Customer', 'Product', 'Review', 'Date', 'Status', 'Actions'].map((header) => (
                  <th key={header} style={{
                    textAlign: 'left', padding: '14px 20px',
                    fontSize: '12px', fontWeight: '600', color: colors.textMuted,
                    textTransform: 'uppercase', letterSpacing: '0.05em',
                    borderBottom: `1px solid ${colors.border}`,
                    background: colors.bgBadge,
                  }}>
                    {header}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {filtered.map((review) => {
                const badge = statusConfig[review.status];
                const StatusIcon = badge.icon;
                return (
                  <tr
                    key={review.id}
                    onMouseEnter={() => setHoveredRow(review.id)}
                    onMouseLeave={() => setHoveredRow(null)}
                    style={{
                      background: hoveredRow === review.id ? colors.bgHover : 'transparent',
                      transition: 'background 0.15s',
                    }}
                  >
                    <td style={{ padding: '14px 20px', borderBottom: `1px solid ${colors.borderLight}` }}>
                      <StarRating rating={review.rating} />
                    </td>
                    <td style={{ padding: '14px 20px', borderBottom: `1px solid ${colors.borderLight}` }}>
                      <span style={{ fontSize: '14px', fontWeight: '600', color: colors.text }}>
                        {review.customer}
                      </span>
                    </td>
                    <td style={{ padding: '14px 20px', borderBottom: `1px solid ${colors.borderLight}` }}>
                      <span style={{ fontSize: '13px', fontWeight: '500', color: colors.textSecondary }}>
                        {review.product}
                      </span>
                    </td>
                    <td style={{ padding: '14px 20px', borderBottom: `1px solid ${colors.borderLight}`, maxWidth: '260px' }}>
                      <span style={{
                        fontSize: '13px', color: colors.textMuted,
                        display: '-webkit-box', WebkitLineClamp: 2, WebkitBoxOrient: 'vertical',
                        overflow: 'hidden', lineHeight: '1.5',
                      }}>
                        {review.text}
                      </span>
                    </td>
                    <td style={{ padding: '14px 20px', borderBottom: `1px solid ${colors.borderLight}` }}>
                      <span style={{ fontSize: '13px', color: colors.textMuted, whiteSpace: 'nowrap' }}>
                        {review.date}
                      </span>
                    </td>
                    <td style={{ padding: '14px 20px', borderBottom: `1px solid ${colors.borderLight}` }}>
                      <span style={{
                        display: 'inline-flex', alignItems: 'center', gap: '6px',
                        padding: '4px 12px', borderRadius: '20px',
                        fontSize: '12px', fontWeight: '600',
                        background: badge.bg, color: badge.text, textTransform: 'capitalize',
                      }}>
                        <StatusIcon size={12} />
                        {review.status}
                      </span>
                    </td>
                    <td style={{ padding: '14px 20px', borderBottom: `1px solid ${colors.borderLight}` }}>
                      <div style={{ display: 'flex', gap: '8px' }}>
                        {review.status !== 'approved' && (
                          <button
                            onClick={() => handleApprove(review.id)}
                            title="Approve"
                            style={{
                              display: 'flex', alignItems: 'center', justifyContent: 'center',
                              width: '36px', height: '36px', borderRadius: '10px',
                              border: `1px solid ${colors.border}`,
                              background: colors.bgCard, color: '#22c55e',
                              cursor: 'pointer', transition: 'all 0.15s',
                            }}
                            onMouseEnter={(e) => { e.currentTarget.style.background = '#dcfce7'; }}
                            onMouseLeave={(e) => { e.currentTarget.style.background = colors.bgCard; }}
                          >
                            <ThumbsUp size={15} />
                          </button>
                        )}
                        {review.status !== 'flagged' && (
                          <button
                            onClick={() => handleFlag(review.id)}
                            title="Flag"
                            style={{
                              display: 'flex', alignItems: 'center', justifyContent: 'center',
                              width: '36px', height: '36px', borderRadius: '10px',
                              border: `1px solid ${colors.border}`,
                              background: colors.bgCard, color: '#f59e0b',
                              cursor: 'pointer', transition: 'all 0.15s',
                            }}
                            onMouseEnter={(e) => { e.currentTarget.style.background = '#fef9c3'; }}
                            onMouseLeave={(e) => { e.currentTarget.style.background = colors.bgCard; }}
                          >
                            <Flag size={15} />
                          </button>
                        )}
                        <button
                          onClick={() => handleDelete(review.id)}
                          title="Delete"
                          style={{
                            display: 'flex', alignItems: 'center', justifyContent: 'center',
                            width: '36px', height: '36px', borderRadius: '10px',
                            border: `1px solid ${colors.borderDanger}`,
                            background: colors.bgDanger, color: colors.danger,
                            cursor: 'pointer', transition: 'all 0.15s',
                          }}
                          onMouseEnter={(e) => { e.currentTarget.style.opacity = '0.8'; }}
                          onMouseLeave={(e) => { e.currentTarget.style.opacity = '1'; }}
                        >
                          <Trash2 size={15} />
                        </button>
                      </div>
                    </td>
                  </tr>
                );
              })}
              {filtered.length === 0 && (
                <tr>
                  <td colSpan={7} style={{ padding: '48px 20px', textAlign: 'center' }}>
                    <MessageSquare size={40} color={colors.textSubtle} style={{ marginBottom: '12px' }} />
                    <p style={{ margin: 0, fontSize: '15px', fontWeight: '600', color: colors.textSecondary }}>
                      No reviews found
                    </p>
                    <p style={{ margin: '6px 0 0', fontSize: '13px', color: colors.textMuted }}>
                      Try adjusting your search or filter criteria
                    </p>
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
