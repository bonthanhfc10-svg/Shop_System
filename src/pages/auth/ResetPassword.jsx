import { useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { useTheme } from '../../hooks/useTheme';
import { Lock, ArrowLeft, CheckCircle2 } from 'lucide-react';

export default function ResetPassword() {
  const [password, setPassword] = useState('');
  const [confirm, setConfirm] = useState('');
  const [reset, setReset] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const { colors } = useTheme();
  useParams();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    if (password !== confirm) {
      setError('Passwords do not match');
      return;
    }
    if (password.length < 6) {
      setError('Password must be at least 6 characters');
      return;
    }
    setLoading(true);
    setTimeout(() => { setReset(true); setLoading(false); }, 1000);
  };

  const inputStyle = {
    width: '100%', padding: '10px 12px', border: `1px solid ${colors.borderInput}`,
    borderRadius: '8px', fontSize: '14px', outline: 'none', boxSizing: 'border-box',
    background: colors.bgInput, color: colors.text,
  };

  return (
    <div>
      <h2 style={{ margin: '0 0 8px', fontSize: '24px', fontWeight: '700', color: colors.text, textAlign: 'center' }}>
        Reset Password
      </h2>
      <p style={{ margin: '0 0 24px', fontSize: '14px', color: colors.textMuted, textAlign: 'center' }}>
        Enter your new password below
      </p>

      {reset ? (
        <div style={{ textAlign: 'center' }}>
          <div style={{
            width: '56px', height: '56px', borderRadius: '50%',
            background: '#e8e8e8', display: 'flex', alignItems: 'center',
            justifyContent: 'center', margin: '0 auto 16px',
          }}>
            <CheckCircle2 size={24} color="#171717" />
          </div>
          <p style={{ margin: '0 0 8px', fontSize: '14px', fontWeight: '600', color: colors.text }}>
            Password Reset Successfully!
          </p>
          <p style={{ margin: '0 0 20px', fontSize: '13px', color: colors.textMuted }}>
            You can now login with your new password.
          </p>
          <Link to="/auth/login" style={{
            display: 'inline-flex', alignItems: 'center', gap: '6px',
            padding: '10px 24px', borderRadius: '8px', textDecoration: 'none',
            background: colors.accent, color: colors.bg, fontSize: '14px', fontWeight: '600',
          }}>
            Go to Login
          </Link>
        </div>
      ) : (
        <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
          {error && (
            <p style={{ margin: 0, padding: '10px', borderRadius: '8px', fontSize: '13px', color: '#0a0a0a', background: '#f0f0f0', textAlign: 'center' }}>
              {error}
            </p>
          )}
          <div>
            <label style={{ display: 'block', marginBottom: '6px', fontSize: '13px', fontWeight: '500', color: colors.textSecondary }}>New Password</label>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', ...inputStyle }}>
              <Lock size={16} color={colors.textSubtle} />
              <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} required placeholder="••••••••" style={{ border: 'none', outline: 'none', background: 'transparent', fontSize: '14px', color: colors.text, width: '100%' }} />
            </div>
          </div>
          <div>
            <label style={{ display: 'block', marginBottom: '6px', fontSize: '13px', fontWeight: '500', color: colors.textSecondary }}>Confirm Password</label>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', ...inputStyle }}>
              <Lock size={16} color={colors.textSubtle} />
              <input type="password" value={confirm} onChange={(e) => setConfirm(e.target.value)} required placeholder="••••••••" style={{ border: 'none', outline: 'none', background: 'transparent', fontSize: '14px', color: colors.text, width: '100%' }} />
            </div>
          </div>
          <button type="submit" disabled={loading} style={{
            padding: '10px', background: colors.accent, color: colors.bg, border: 'none',
            borderRadius: '8px', fontSize: '14px', fontWeight: '600',
            cursor: loading ? 'not-allowed' : 'pointer', opacity: loading ? 0.7 : 1,
          }}>
            {loading ? 'Resetting...' : 'Reset Password'}
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
