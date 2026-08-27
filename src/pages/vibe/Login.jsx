import { useState } from 'react';
import { Link, useNavigate, useSearchParams } from 'react-router-dom';
import { useAuth } from '../../hooks/useAuth';

function GoogleIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" aria-hidden="true">
      <path fill="#EA4335" d="M12 5.27c1.6 0 3.04.55 4.17 1.62l3.1-3.1C17.46 1.98 14.95 1 12 1 7.42 1 3.48 3.55 1.55 7.28l3.62 2.81C6.1 7.45 8.84 5.27 12 5.27z" />
      <path fill="#4285F4" d="M23.49 12.27c0-.85-.08-1.67-.23-2.45H12v4.64h6.45c-.28 1.5-1.12 2.77-2.39 3.62v3.01h3.87c2.27-2.09 3.57-5.17 3.57-8.82z" />
      <path fill="#FBBC05" d="M5.17 14.09a6.96 6.96 0 0 1 0-4.18L1.55 7.1A11.5 11.5 0 0 0 .5 12c0 1.7.38 3.31 1.05 4.9l3.62-2.81z" />
      <path fill="#34A853" d="M12 23c2.95 0 5.44-.97 7.25-2.63l-3.87-3.01c-1.07.72-2.45 1.14-3.38 1.14-3.16 0-5.9-2.18-6.83-5.1l-3.62 2.85C3.48 20.45 7.42 23 12 23z" />
    </svg>
  );
}

export default function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [remember, setRemember] = useState(false);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const { login } = useAuth();
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const redirect = searchParams.get('redirect') || '/';

  const submit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);
    try {
      const data = await login({ email, password });
      if (data.user?.role === 'admin') {
        navigate('/admin');
      } else {
        navigate(redirect);
      }
    } catch (err) {
      setError(err.response?.data?.message || 'Invalid email or password. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const inputClass =
    'w-full px-4 py-3 border border-mist rounded-full text-sm outline-none focus:border-ink bg-white transition-colors';

  return (
    <div className="min-h-[80vh] flex items-center justify-center px-4 py-16">
      <div className="w-full max-w-md">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-black uppercase tracking-tight text-ink">Welcome Back</h1>
          <p className="mt-2 text-muted">Sign in to continue shopping.</p>
        </div>

        <form onSubmit={submit} className="space-y-4">
          {error && (
            <p className="text-sm text-ink bg-volt/40 border border-volt-dark rounded-2xl px-4 py-3">
              {error}
            </p>
          )}
          <label className="block">
            <span className="block text-[12px] font-semibold uppercase tracking-wide text-ink mb-1.5">Email</span>
            <input
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="you@example.com"
              className={inputClass}
            />
          </label>
          <label className="block">
            <span className="block text-[12px] font-semibold uppercase tracking-wide text-ink mb-1.5">Password</span>
            <input
              type="password"
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="••••••••"
              className={inputClass}
            />
          </label>

          <div className="flex items-center justify-between text-sm">
            <label className="flex items-center gap-2 text-muted cursor-pointer">
              <input
                type="checkbox"
                checked={remember}
                onChange={(e) => setRemember(e.target.checked)}
                className="accent-ink"
              />
              Remember me
            </label>
            <Link to="/forgot-password" className="text-ink underline hover:opacity-70">
              Forgot password?
            </Link>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-ink text-white text-[13px] font-semibold uppercase tracking-wide py-4 rounded-full hover:bg-black transition-colors disabled:opacity-70 disabled:cursor-not-allowed"
          >
            {loading ? 'Signing In...' : 'Login'}
          </button>
        </form>

        <div className="flex items-center gap-4 my-6">
          <div className="flex-1 h-px bg-mist" />
          <span className="text-xs text-muted">OR</span>
          <div className="flex-1 h-px bg-mist" />
        </div>

        <button className="w-full flex items-center justify-center gap-3 border border-mist py-3.5 rounded-full text-sm font-semibold text-ink hover:bg-mist transition-colors">
          <GoogleIcon /> Continue with Google
        </button>

        <p className="text-center text-sm text-muted mt-8">
          Don't have an account?{' '}
          <Link to="/register" className="text-ink font-semibold underline hover:opacity-70">
            Register
          </Link>
        </p>
      </div>
    </div>
  );
}
