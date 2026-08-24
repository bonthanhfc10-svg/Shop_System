import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useTheme } from '../../hooks/useTheme';
import { useAuth } from '../../hooks/useAuth';

export default function Register() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const { colors } = useTheme();
  const { register } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);
    try {
      await register({ name, email, password });
      navigate('/');
    } catch (err) {
      setError(err.response?.data?.message || 'Registration failed. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <h2 style={{ margin: '0 0 8px', fontSize: '24px', fontWeight: '700', color: colors.text, textAlign: 'center' }}>
        Create Account
      </h2>
      <p style={{ margin: '0 0 24px', fontSize: '14px', color: colors.textMuted, textAlign: 'center' }}>
        Sign up for a new account
      </p>
      {error && (
        <p style={{ margin: '0 0 16px', padding: '10px', borderRadius: '8px', fontSize: '13px', color: '#0a0a0a', background: '#f0f0f0', textAlign: 'center' }}>
          {error}
        </p>
      )}
      <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
        <div>
          <label style={{ display: 'block', marginBottom: '6px', fontSize: '13px', fontWeight: '500', color: colors.textSecondary }}>Full Name</label>
          <input
            type="text" value={name} onChange={(e) => setName(e.target.value)} required
            style={{
              width: '100%', padding: '10px 12px', border: `1px solid ${colors.borderInput}`,
              borderRadius: '8px', fontSize: '14px', outline: 'none', boxSizing: 'border-box',
              background: colors.bgInput, color: colors.text,
            }}
          />
        </div>
        <div>
          <label style={{ display: 'block', marginBottom: '6px', fontSize: '13px', fontWeight: '500', color: colors.textSecondary }}>Email</label>
          <input
            type="email" value={email} onChange={(e) => setEmail(e.target.value)} required
            style={{
              width: '100%', padding: '10px 12px', border: `1px solid ${colors.borderInput}`,
              borderRadius: '8px', fontSize: '14px', outline: 'none', boxSizing: 'border-box',
              background: colors.bgInput, color: colors.text,
            }}
          />
        </div>
        <div>
          <label style={{ display: 'block', marginBottom: '6px', fontSize: '13px', fontWeight: '500', color: colors.textSecondary }}>Password</label>
          <input
            type="password" value={password} onChange={(e) => setPassword(e.target.value)} required
            style={{
              width: '100%', padding: '10px 12px', border: `1px solid ${colors.borderInput}`,
              borderRadius: '8px', fontSize: '14px', outline: 'none', boxSizing: 'border-box',
              background: colors.bgInput, color: colors.text,
            }}
          />
        </div>
        <button
          type="submit"
          disabled={loading}
          style={{
            padding: '10px', background: colors.accent, color: colors.bg, border: 'none',
            borderRadius: '8px', fontSize: '14px', fontWeight: '600', cursor: loading ? 'not-allowed' : 'pointer',
            opacity: loading ? 0.7 : 1,
          }}
        >
          {loading ? 'Creating Account...' : 'Sign Up'}
        </button>
      </form>
      <p style={{ margin: '16px 0 0', fontSize: '13px', color: colors.textMuted, textAlign: 'center' }}>
        Already have an account?{' '}
        <Link to="/auth/login" style={{ color: colors.accent, textDecoration: 'none', fontWeight: '500' }}>
          Sign In
        </Link>
      </p>
    </div>
  );
}
