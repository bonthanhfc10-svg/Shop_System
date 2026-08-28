import { useState } from 'react';
import { Link } from 'react-router-dom';
import { useTheme } from '../../hooks/useTheme';
import {
  Plus, Edit2, Trash2, Ticket, Copy, BarChart3,
  Calendar, Tag, Percent, DollarSign, Truck, X,
  CheckCircle2, Clock,
} from 'lucide-react';

const couponsData = [
  {
    id: 1,
    code: 'SAVE20',
    discount: '20% off',
    discountType: 'percentage',
    discountValue: 20,
    minOrder: '$50',
    uses: 234,
    status: 'active',
    expiry: '2026-12-31',
    color: '#0a0a0a',
    gradient: '#000000',
  },
  {
    id: 2,
    code: 'FLAT10',
    discount: '$10 off',
    discountType: 'fixed',
    discountValue: 10,
    minOrder: '$30',
    uses: 567,
    status: 'active',
    expiry: '2026-10-15',
    color: '#171717',
    gradient: '#262626',
  },
  {
    id: 3,
    code: 'NEWUSER',
    discount: '15% off',
    discountType: 'percentage',
    discountValue: 15,
    minOrder: 'No minimum',
    uses: 892,
    status: 'active',
    expiry: '2027-03-01',
    color: '#0a0a0a',
    gradient: '#171717',
  },
  {
    id: 4,
    code: 'FREESHIP',
    discount: 'Free Shipping',
    discountType: 'shipping',
    discountValue: 0,
    minOrder: '$25',
    uses: 1245,
    status: 'active',
    expiry: '2026-11-30',
    color: '#404040',
    gradient: '#404040',
  },
  {
    id: 5,
    code: 'SUMMER30',
    discount: '30% off',
    discountType: 'percentage',
    discountValue: 30,
    minOrder: '$100',
    uses: 89,
    status: 'expired',
    expiry: '2026-08-01',
    color: '#0a0a0a',
    gradient: '#404040',
  },
  {
    id: 6,
    code: 'VIP50',
    discount: '50% off',
    discountType: 'percentage',
    discountValue: 50,
    minOrder: '$200',
    uses: 45,
    status: 'active',
    expiry: '2027-06-30',
    color: '#737373',
    gradient: '#737373',
  },
];

const statusConfig = {
  active: { bg: '#e5e5e5', text: '#0a0a0a', dot: '#171717' },
  expired: { bg: '#f0f0f0', text: '#737373', dot: '#0a0a0a' },
};

function CouponCard({ coupon, onCopy, onDelete }) {
  const { colors } = useTheme();
  const [hovered, setHovered] = useState(false);
  const [copied, setCopied] = useState(false);
  const status = statusConfig[coupon.status];
  const isExpired = coupon.status === 'expired';

  const handleCopy = () => {
    onCopy(coupon.code);
    setCopied(true);
    setTimeout(() => setCopied(false), 1500);
  };

  const formatDate = (dateStr) => {
    return new Date(dateStr).toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric',
    });
  };

  return (
    <div
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        background: colors.bgCard,
        borderRadius: '16px',
        border: `2px dashed ${isExpired ? colors.border : coupon.color}`,
        position: 'relative',
        overflow: 'hidden',
        transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
        transform: hovered ? 'translateY(-4px)' : 'translateY(0)',
        boxShadow: hovered
          ? `0 20px 40px ${coupon.color}22`
          : 'none',
        opacity: isExpired ? 0.7 : 1,
      }}
    >
      <div style={{
        position: 'absolute', top: '50%', left: '-10px',
        width: '20px', height: '20px', borderRadius: '50%',
        background: colors.bgCard,
        transform: 'translateY(-50%)',
        border: `2px solid ${isExpired ? colors.border : coupon.color}`,
      }} />
      <div style={{
        position: 'absolute', top: '50%', right: '-10px',
        width: '20px', height: '20px', borderRadius: '50%',
        background: colors.bgCard,
        transform: 'translateY(-50%)',
        border: `2px solid ${isExpired ? colors.border : coupon.color}`,
      }} />

      <div style={{
        padding: '24px',
        position: 'relative',
        zIndex: 1,
      }}>
        <div style={{
          display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start',
          marginBottom: '16px',
        }}>
          <div style={{
            display: 'flex', alignItems: 'center', gap: '10px',
          }}>
            <div style={{
              width: '44px', height: '44px', borderRadius: '12px',
              background: coupon.gradient,
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              boxShadow: `0 8px 20px ${coupon.color}33`,
            }}>
              {coupon.discountType === 'shipping' ? (
                <Truck size={20} color="#fff" />
              ) : coupon.discountType === 'fixed' ? (
                <DollarSign size={20} color="#fff" />
              ) : (
                <Percent size={20} color="#fff" />
              )}
            </div>
            <div>
              <span style={{
                display: 'inline-flex', alignItems: 'center', gap: '4px',
                padding: '3px 10px', borderRadius: '6px',
                background: status.bg, color: status.text,
                fontSize: '11px', fontWeight: '600', textTransform: 'capitalize',
              }}>
                <span style={{
                  width: '6px', height: '6px', borderRadius: '50%',
                  background: status.dot,
                }} />
                {coupon.status}
              </span>
            </div>
          </div>
          <div style={{ display: 'flex', gap: '6px' }}>
            <button
              onClick={handleCopy}
              style={{
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                width: '34px', height: '34px', borderRadius: '8px',
                border: `1px solid ${colors.border}`,
                background: copied ? '#e5e5e5' : colors.bgCard,
                color: copied ? '#0a0a0a' : colors.textMuted,
                cursor: 'pointer', transition: 'all 0.15s',
              }}
              title="Copy code"
            >
              <Copy size={14} />
            </button>
            <button
              style={{
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                width: '34px', height: '34px', borderRadius: '8px',
                border: `1px solid ${colors.border}`,
                background: colors.bgCard, color: colors.accent,
                cursor: 'pointer', transition: 'all 0.15s',
              }}
              onMouseEnter={(e) => { e.currentTarget.style.background = colors.bgAccent; }}
              onMouseLeave={(e) => { e.currentTarget.style.background = colors.bgCard; }}
              title="Edit"
            >
              <Edit2 size={14} />
            </button>
            <button
              onClick={() => onDelete(coupon.id)}
              style={{
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                width: '34px', height: '34px', borderRadius: '8px',
                border: `1px solid ${colors.borderDanger}`,
                background: colors.bgDanger, color: colors.danger,
                cursor: 'pointer', transition: 'all 0.15s',
              }}
              onMouseEnter={(e) => { e.currentTarget.style.opacity = '0.8'; }}
              onMouseLeave={(e) => { e.currentTarget.style.opacity = '1'; }}
              title="Delete"
            >
              <Trash2 size={14} />
            </button>
          </div>
        </div>

        <div style={{
          borderLeft: `3px dashed ${coupon.color}`,
          paddingLeft: '14px',
          marginBottom: '16px',
        }}>
          <h3 style={{
            margin: 0,
            fontSize: '28px',
            fontWeight: '800',
            color: coupon.color,
            letterSpacing: '0.08em',
            fontFamily: 'monospace, sans-serif',
          }}>
            {coupon.code}
          </h3>
          <p style={{
            margin: '6px 0 0',
            fontSize: '18px',
            fontWeight: '700',
            color: colors.text,
          }}>
            {coupon.discount}
          </p>
        </div>

        <div style={{
          display: 'grid',
          gridTemplateColumns: '1fr 1fr',
          gap: '10px',
          marginBottom: '16px',
        }}>
          <div style={{
            padding: '10px 12px',
            borderRadius: '10px',
            background: colors.bgHover,
            border: `1px solid ${colors.borderLight}`,
          }}>
            <div style={{
              display: 'flex', alignItems: 'center', gap: '6px',
              marginBottom: '4px',
            }}>
              <Tag size={12} color={colors.textSubtle} />
              <span style={{
                fontSize: '11px', fontWeight: '500', color: colors.textSubtle,
                textTransform: 'uppercase', letterSpacing: '0.04em',
              }}>
                Min Order
              </span>
            </div>
            <p style={{
              margin: 0, fontSize: '14px', fontWeight: '600', color: colors.text,
            }}>
              {coupon.minOrder}
            </p>
          </div>
          <div style={{
            padding: '10px 12px',
            borderRadius: '10px',
            background: colors.bgHover,
            border: `1px solid ${colors.borderLight}`,
          }}>
            <div style={{
              display: 'flex', alignItems: 'center', gap: '6px',
              marginBottom: '4px',
            }}>
              <BarChart3 size={12} color={colors.textSubtle} />
              <span style={{
                fontSize: '11px', fontWeight: '500', color: colors.textSubtle,
                textTransform: 'uppercase', letterSpacing: '0.04em',
              }}>
                Uses
              </span>
            </div>
            <p style={{
              margin: 0, fontSize: '14px', fontWeight: '600', color: colors.text,
            }}>
              {coupon.uses.toLocaleString()}
            </p>
          </div>
        </div>

        <div style={{
          display: 'flex', alignItems: 'center', justifyContent: 'space-between',
          paddingTop: '14px',
          borderTop: `1px dashed ${colors.border}`,
        }}>
          <div style={{
            display: 'flex', alignItems: 'center', gap: '6px',
          }}>
            <Calendar size={13} color={colors.textSubtle} />
            <span style={{
              fontSize: '12px', color: isExpired ? colors.danger : colors.textMuted,
              fontWeight: '500',
            }}>
              {isExpired ? 'Expired' : 'Expires'}: {formatDate(coupon.expiry)}
            </span>
          </div>
          {isExpired && (
            <span style={{
              display: 'inline-flex', alignItems: 'center', gap: '4px',
              padding: '3px 8px', borderRadius: '6px',
              background: '#f0f0f0', color: '#737373',
              fontSize: '11px', fontWeight: '600',
            }}>
              <X size={11} />
              Expired
            </span>
          )}
          {!isExpired && (
            <span style={{
              display: 'inline-flex', alignItems: 'center', gap: '4px',
              padding: '3px 8px', borderRadius: '6px',
              background: '#e5e5e5', color: '#0a0a0a',
              fontSize: '11px', fontWeight: '600',
            }}>
              <CheckCircle2 size={11} />
              Active
            </span>
          )}
        </div>
      </div>
    </div>
  );
}

export default function Coupons() {
  const { colors } = useTheme();
  const [coupons, setCoupons] = useState(couponsData);
  const [filter, setFilter] = useState('all');

  const filteredCoupons = coupons.filter((c) => {
    if (filter === 'all') return true;
    return c.status === filter;
  });

  const handleCopy = (code) => {
    navigator.clipboard.writeText(code).catch(() => {});
  };

  const handleDelete = (id) => {
    setCoupons((prev) => prev.filter((c) => c.id !== id));
  };

  const activeCount = coupons.filter((c) => c.status === 'active').length;
  const expiredCount = coupons.filter((c) => c.status === 'expired').length;
  const totalUses = coupons.reduce((sum, c) => sum + c.uses, 0);

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
            Coupons
          </h1>
          <p style={{ margin: '6px 0 0', fontSize: '14px', color: colors.textMuted }}>
            Manage discount codes
          </p>
        </div>
        <Link to="/admin/coupons/create" style={{
          display: 'inline-flex', alignItems: 'center', gap: '8px',
          padding: '12px 24px', borderRadius: '12px',
          background: colors.gradientPrimary, color: '#fff',
          fontSize: '14px', fontWeight: '600', textDecoration: 'none',
          boxShadow: '0 4px 14px rgba(0,0,0,0.35)',
          transition: 'all 0.2s',
        }}
          onMouseEnter={(e) => { e.currentTarget.style.transform = 'translateY(-2px)'; e.currentTarget.style.boxShadow = '0 8px 24px rgba(0,0,0,0.45)'; }}
          onMouseLeave={(e) => { e.currentTarget.style.transform = 'translateY(0)'; e.currentTarget.style.boxShadow = '0 4px 14px rgba(0,0,0,0.35)'; }}
        >
          <Plus size={18} /> Add Coupon
        </Link>
      </div>

      <div style={{
        display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
        gap: '14px', marginBottom: '28px',
      }}>
        {[
          { label: 'Total Coupons', value: coupons.length, icon: Ticket, gradient: '#000000' },
          { label: 'Active Coupons', value: activeCount, icon: CheckCircle2, gradient: '#262626' },
          { label: 'Expired Coupons', value: expiredCount, icon: Clock, gradient: '#404040' },
          { label: 'Total Redemptions', value: totalUses.toLocaleString(), icon: BarChart3, gradient: '#404040' },
        ].map((stat) => {
          const StatIcon = stat.icon;
          return (
            <div key={stat.label} style={{
              background: colors.bgCard, borderRadius: '14px',
              padding: '20px', border: `1px solid ${colors.border}`,
              display: 'flex', alignItems: 'center', gap: '14px',
            }}>
              <div style={{
                width: '44px', height: '44px', borderRadius: '12px',
                background: stat.gradient,
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                flexShrink: 0,
              }}>
                <StatIcon size={20} color="#fff" />
              </div>
              <div>
                <p style={{ margin: 0, fontSize: '12px', color: colors.textMuted, fontWeight: '500' }}>
                  {stat.label}
                </p>
                <p style={{ margin: '4px 0 0', fontSize: '20px', fontWeight: '700', color: colors.text }}>
                  {stat.value}
                </p>
              </div>
            </div>
          );
        })}
      </div>

      <div style={{
        display: 'flex', gap: '8px', marginBottom: '24px', flexWrap: 'wrap',
      }}>
        {[
          { key: 'all', label: 'All Coupons', count: coupons.length },
          { key: 'active', label: 'Active', count: activeCount },
          { key: 'expired', label: 'Expired', count: expiredCount },
        ].map((tab) => (
          <button
            key={tab.key}
            onClick={() => setFilter(tab.key)}
            style={{
              display: 'flex', alignItems: 'center', gap: '6px',
              padding: '8px 16px', borderRadius: '10px',
              border: 'none',
              background: filter === tab.key ? colors.gradientPrimary : colors.bgHover,
              color: filter === tab.key ? '#fff' : colors.textSecondary,
              fontSize: '13px', fontWeight: '600',
              cursor: 'pointer', transition: 'all 0.2s',
            }}
          >
            {tab.label}
            <span style={{
              display: 'inline-flex', alignItems: 'center', justifyContent: 'center',
              minWidth: '20px', height: '20px', borderRadius: '10px',
              padding: '0 6px',
              background: filter === tab.key ? 'rgba(255,255,255,0.25)' : colors.border,
              fontSize: '11px', fontWeight: '700',
              color: filter === tab.key ? '#fff' : colors.textMuted,
            }}>
              {tab.count}
            </span>
          </button>
        ))}
      </div>

      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fill, minmax(340px, 1fr))',
        gap: '20px',
      }}>
        {filteredCoupons.map((coupon) => (
          <CouponCard
            key={coupon.id}
            coupon={coupon}
            onCopy={handleCopy}
            onDelete={handleDelete}
          />
        ))}
      </div>

      {filteredCoupons.length === 0 && (
        <div style={{
          textAlign: 'center', padding: '64px 20px',
          background: colors.bgCard, borderRadius: '16px',
          border: `1px solid ${colors.border}`,
        }}>
          <Ticket size={48} color={colors.textSubtle} style={{ marginBottom: '16px' }} />
          <p style={{ margin: 0, fontSize: '16px', fontWeight: '600', color: colors.textSecondary }}>
            No coupons found
          </p>
          <p style={{ margin: '8px 0 0', fontSize: '14px', color: colors.textMuted }}>
            {filter === 'all'
              ? 'Create your first coupon to get started'
              : `No ${filter} coupons at the moment`}
          </p>
        </div>
      )}
    </div>
  );
}
