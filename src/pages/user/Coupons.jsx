import { useState } from 'react';
import { useTheme } from '../../hooks/useTheme';
import { Copy, CheckCircle2, Percent, Clock } from 'lucide-react';

const coupons = [
  { id: 1, code: 'WELCOME10', discount: '10%', type: 'percentage', minOrder: 50, expires: '2026-09-30', used: false },
  { id: 2, code: 'SAVE20', discount: '$20', type: 'fixed', minOrder: 100, expires: '2026-08-31', used: false },
  { id: 3, code: 'SUMMER15', discount: '15%', type: 'percentage', minOrder: 75, expires: '2026-09-15', used: true },
  { id: 4, code: 'FREESHIP', discount: 'Free Shipping', type: 'shipping', minOrder: 0, expires: '2026-10-31', used: false },
];

export default function UserCoupons() {
  const { colors } = useTheme();
  const [copiedId, setCopiedId] = useState(null);

  const handleCopy = (code, id) => {
    navigator.clipboard.writeText(code).catch(() => {});
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  return (
    <div style={{ maxWidth: '800px', margin: '0 auto', padding: '0 clamp(16px, 3vw, 24px)' }}>
      <h1 style={{ margin: '0 0 24px', fontSize: '24px', fontWeight: '700', color: colors.text }}>My Coupons</h1>

      <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
        {coupons.map((coupon) => (
          <div key={coupon.id} style={{
            display: 'flex', alignItems: 'center', gap: '16px',
            padding: '20px', background: colors.bgCard, borderRadius: '14px',
            border: `1px dashed ${coupon.used ? colors.border : colors.accent}`,
            opacity: coupon.used ? 0.6 : 1,
          }}>
            <div style={{
              width: '56px', height: '56px', borderRadius: '14px',
              background: coupon.used ? colors.bgHover : colors.bgAccent,
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              flexShrink: 0,
            }}>
              <Percent size={24} color={coupon.used ? colors.textSubtle : colors.accent} />
            </div>
            <div style={{ flex: 1 }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '4px' }}>
                <span style={{ fontSize: '16px', fontWeight: '700', color: colors.text, fontFamily: 'monospace' }}>
                  {coupon.code}
                </span>
                {coupon.used && (
                  <span style={{ padding: '2px 8px', borderRadius: '4px', background: colors.bgHover, color: colors.textMuted, fontSize: '11px', fontWeight: '600' }}>Used</span>
                )}
              </div>
              <p style={{ margin: 0, fontSize: '13px', color: colors.textSecondary }}>
                {coupon.discount} off {coupon.minOrder > 0 ? `orders over $${coupon.minOrder}` : 'all orders'}
              </p>
              <div style={{ display: 'flex', alignItems: 'center', gap: '4px', marginTop: '4px' }}>
                <Clock size={12} color={colors.textSubtle} />
                <span style={{ fontSize: '11px', color: colors.textSubtle }}>Expires: {coupon.expires}</span>
              </div>
            </div>
            <button
              onClick={() => handleCopy(coupon.code, coupon.id)}
              disabled={coupon.used}
              style={{
                display: 'flex', alignItems: 'center', gap: '6px',
                padding: '8px 16px', borderRadius: '8px', border: 'none',
                background: coupon.used ? colors.bgHover : colors.accent,
                color: coupon.used ? colors.textMuted : '#fff',
                fontSize: '12px', fontWeight: '600', cursor: coupon.used ? 'not-allowed' : 'pointer',
              }}
            >
              {copiedId === coupon.id ? <><CheckCircle2 size={14} /> Copied</> : <><Copy size={14} /> Copy</>}
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}
