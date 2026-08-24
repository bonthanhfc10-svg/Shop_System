import { useState } from 'react';
import { Link } from 'react-router-dom';
import { useTheme } from '../../hooks/useTheme';
import { Mail, ArrowLeft } from 'lucide-react';

export default function ForgotPassword() {
  const [email, setEmail] = useState('');
  const [sent, setSent] = useState(false);
  const [loading, setLoading] = useState(false);
  const { colors } = useTheme();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setTimeout(() => { setSent(true); setLoading(false); }, 1000);
  };

  return (
    <div>
      <h2 style={{ margin: '0 0 8px', fontSize: '24px', fontWeight: '700', color: colors.text, textAlign: 'center' }}>
        Forgot Password?
      </h2>
      <p style={{ margin: '0 0 24px', fontSize: '14px', color: colors.textMuted, textAlign: 'center' }}>
        Enter your email and we'll send you a reset link
      </p>

      {sent ? (
        <div style={{ textAlign: 'center' }}>
          <div style={{
            width: '56px', height: '56px', borderRadius: '50%',
            background: '#ecfdf5', display: 'flex', alignItems: 'center',
            justifyContent: 'center', margin: '0 auto 16px',
          }}>
            <Mail size={24} color="#059669" />
          </div>
          <p style={{ margin: '0 0 8px', fontSize: '14px', fontWeight: '600', color: colors.text }}>
            Check your email
          </p>
          <p style={{ margin: '0 0 20px', fontSize: '13px', color: colors.textMuted }}>
            We've sent a password reset link to <strong>{email}</strong>
          </p>
        </div>
      ) : (
        <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
          <div>
            <label style={{ display: 'block', marginBottom: '6px', fontSize: '13px', fontWeight: '500', color: colors.textSecondary }}>Email</label>
            <input
              type="email" value={email} onChange={(e) => setEmail(e.target.value)} required
              placeholder="you@example.com"
              style={{
                width: '100%', padding: '10px 12px', border: `1px solid ${colors.borderInput}`,
                borderRadius: '8px', fontSize: '14px', outline: 'none', boxSizing: 'border-box',
                background: colors.bgInput, color: colors.text,
              }}
            />
          </div>
          <button
            type="submit" disabled={loading}
            style={{
              padding: '10px', background: colors.accent, color: '#fff', border: 'none',
              borderRadius: '8px', fontSize: '14px', fontWeight: '600',
              cursor: loading ? 'not-allowed' : 'pointer', opacity: loading ? 0.7 : 1,
            }}
          >
            {loading ? 'Sending...' : 'Send Reset Link'}
          </button>
        </form>
      )}

      <p style={{ margin: '16px 0 0', fontSize: '13px', color: colors.textMuted, textAlign: 'center' }}>
        <Link to="/auth/login" style={{ color: colors.accent, textDecoration: 'none', fontWeight: '500', display: 'inline-flex', alignItems: 'center', gap: '4px' }}>
          <ArrowLeft size={14} /> Back to Login
        </Link>
      </p>
    </div>
  );
}
