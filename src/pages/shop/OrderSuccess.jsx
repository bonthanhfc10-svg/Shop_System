import { useMemo } from 'react';
import { Link } from 'react-router-dom';
import { useTheme } from '../../hooks/useTheme';
import { CheckCircle2, Package, ArrowRight, Home } from 'lucide-react';

export default function OrderSuccess() {
  const { colors } = useTheme();
  const orderId = useMemo(() => Math.floor(10000 + Math.random() * 90000), []);

  return (
    <div style={{
      maxWidth: '560px', margin: '0 auto', padding: '64px clamp(16px, 3vw, 32px)',
      textAlign: 'center',
    }}>
      <div style={{
        width: '80px', height: '80px', borderRadius: '50%',
        background: 'linear-gradient(135deg, #059669 0%, #10b981 100%)',
        display: 'flex', alignItems: 'center', justifyContent: 'center',
        margin: '0 auto 24px', boxShadow: '0 8px 24px rgba(16,185,129,0.3)',
        animation: 'scaleIn 0.5s ease',
      }}>
        <CheckCircle2 size={40} color="#fff" />
      </div>

      <h1 style={{ margin: '0 0 8px', fontSize: '28px', fontWeight: '800', color: colors.text }}>
        Order Confirmed!
      </h1>
      <p style={{ margin: '0 0 8px', fontSize: '15px', color: colors.textSecondary, lineHeight: '1.6' }}>
        Thank you for your purchase. Your order has been successfully placed.
      </p>
      <p style={{ margin: '0 0 32px', fontSize: '14px', color: colors.textMuted }}>
        Order ID: <strong style={{ color: colors.accent }}>#ORD-{orderId}</strong>
      </p>

      <div style={{
        background: colors.bgCard, borderRadius: '14px', border: `1px solid ${colors.border}`,
        padding: '20px', marginBottom: '32px', textAlign: 'left',
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '12px' }}>
          <Package size={18} color={colors.accent} />
          <span style={{ fontSize: '14px', fontWeight: '600', color: colors.text }}>What happens next?</span>
        </div>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
          {[
            'You will receive an email confirmation shortly.',
            'We will process your order within 24 hours.',
            'Track your order status from your dashboard.',
          ].map((text, i) => (
            <div key={i} style={{ display: 'flex', gap: '10px', alignItems: 'flex-start' }}>
              <div style={{
                width: '20px', height: '20px', borderRadius: '50%',
                background: colors.bgAccent, color: colors.accent,
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                fontSize: '11px', fontWeight: '700', flexShrink: 0, marginTop: '2px',
              }}>{i + 1}</div>
              <span style={{ fontSize: '13px', color: colors.textSecondary }}>{text}</span>
            </div>
          ))}
        </div>
      </div>

      <div style={{ display: 'flex', gap: '12px', justifyContent: 'center', flexWrap: 'wrap' }}>
        <Link to="/user/orders" style={{
          display: 'inline-flex', alignItems: 'center', gap: '6px',
          padding: '12px 24px', borderRadius: '10px', textDecoration: 'none',
          background: colors.gradientPrimary, color: '#fff',
          fontSize: '14px', fontWeight: '600',
          boxShadow: '0 4px 16px rgba(102,126,234,0.3)',
        }}>
          View My Orders <ArrowRight size={16} />
        </Link>
        <Link to="/" style={{
          display: 'inline-flex', alignItems: 'center', gap: '6px',
          padding: '12px 24px', borderRadius: '10px', textDecoration: 'none',
          background: colors.bgCard, color: colors.textSecondary,
          border: `1px solid ${colors.border}`, fontSize: '14px', fontWeight: '600',
        }}>
          <Home size={16} /> Back to Home
        </Link>
      </div>
    </div>
  );
}
