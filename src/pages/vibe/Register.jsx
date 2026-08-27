import { useState } from 'react';
import { Link, useNavigate, useSearchParams } from 'react-router-dom';
import { useAuth } from '../../hooks/useAuth';

export default function Register() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirm, setConfirm] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const { register } = useAuth();
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const redirect = searchParams.get('redirect') || '/';

  const submit = async (e) => {
    e.preventDefault();
    if (password !== confirm) {
      setError('Passwords do not match.');
      return;
    }
    setError('');
    setLoading(true);
    try {
      await register({ name, email, password });
      navigate(redirect);
    } catch (err) {
      setError(err.response?.data?.message || 'Registration failed. Please try again.');
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
          <h1 className="text-3xl font-black uppercase tracking-tight text-ink">Create Account</h1>
          <p className="mt-2 text-muted">Join VIBE and start discovering.</p>
        </div>

        <form onSubmit={submit} className="space-y-4">
          {error && (
            <p className="text-sm text-ink bg-volt/40 border border-volt-dark rounded-2xl px-4 py-3">
              {error}
            </p>
          )}
          <label className="block">
            <span className="block text-[12px] font-semibold uppercase tracking-wide text-ink mb-1.5">Full Name</span>
            <input
              type="text"
              required
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Your name"
              className={inputClass}
            />
          </label>
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
          <label className="block">
            <span className="block text-[12px] font-semibold uppercase tracking-wide text-ink mb-1.5">Confirm Password</span>
            <input
              type="password"
              required
              value={confirm}
              onChange={(e) => setConfirm(e.target.value)}
              placeholder="••••••••"
              className={inputClass}
            />
          </label>

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-ink text-white text-[13px] font-semibold uppercase tracking-wide py-4 rounded-full hover:bg-black transition-colors disabled:opacity-70 disabled:cursor-not-allowed"
          >
            {loading ? 'Creating Account...' : 'Create Account'}
          </button>
        </form>

        <p className="text-center text-sm text-muted mt-8">
          Already have an account?{' '}
          <Link to="/login" className="text-ink font-semibold underline hover:opacity-70">
            Login
          </Link>
        </p>
      </div>
    </div>
  );
}
