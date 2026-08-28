import { useState } from 'react';
import { Link } from 'react-router-dom';
import { useTheme } from '../../hooks/useTheme';
import {
  Users as UsersIcon, UserCheck, UserPlus, Shield,
  Search, Plus, Edit2, Ban,
} from 'lucide-react';

const statsCards = [
  {
    label: 'Total Users',
    value: '2,890',
    icon: UsersIcon,
    gradient: '#000000',
    shadowColor: 'rgba(0,0,0,0.12)',
  },
  {
    label: 'Active',
    value: '2,456',
    icon: UserCheck,
    gradient: '#262626',
    shadowColor: 'rgba(0,0,0,0.3)',
  },
  {
    label: 'New This Month',
    value: '156',
    icon: UserPlus,
    gradient: '#404040',
    shadowColor: 'rgba(0,0,0,0.3)',
  },
  {
    label: 'Admins',
    value: '3',
    icon: Shield,
    gradient: '#404040',
    shadowColor: 'rgba(0,0,0,0.3)',
  },
];

const initialUsers = [
  { id: 1, name: 'John Doe', email: 'john@example.com', role: 'user', orders: 12, joined: '2026-01-15', color: '#0a0a0a' },
  { id: 2, name: 'Jane Smith', email: 'jane@example.com', role: 'user', orders: 8, joined: '2026-02-20', color: '#525252' },
  { id: 3, name: 'Bob Wilson', email: 'bob@example.com', role: 'user', orders: 23, joined: '2025-11-10', color: '#0a0a0a' },
  { id: 4, name: 'Alice Brown', email: 'alice@example.com', role: 'user', orders: 5, joined: '2026-05-01', color: '#171717' },
  { id: 5, name: 'Charlie Davis', email: 'charlie@example.com', role: 'admin', orders: 0, joined: '2025-06-15', color: '#737373' },
  { id: 6, name: 'Diana Evans', email: 'diana@example.com', role: 'user', orders: 15, joined: '2026-03-12', color: '#0a0a0a' },
  { id: 7, name: 'Edward Hall', email: 'edward@example.com', role: 'user', orders: 7, joined: '2026-04-25', color: '#404040' },
  { id: 8, name: 'Fiona Clark', email: 'fiona@example.com', role: 'user', orders: 3, joined: '2026-07-08', color: '#a3a3a3' },
];

const roleConfig = {
  admin: { bg: '#f0f0f0', text: '#525252', border: '#e5e5e5' },
  user: { bg: '#f2f2f2', text: '#0a0a0a', border: '#e5e5e5' },
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
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
        <div>
          <p style={{ margin: 0, fontSize: '12.5px', color: colors.textMuted, fontWeight: '500', marginBottom: '6px' }}>
            {stat.label}
          </p>
          <p style={{ margin: 0, fontSize: '26px', fontWeight: '800', color: colors.text, letterSpacing: '-0.02em', lineHeight: '1.2' }}>
            {stat.value}
          </p>
        </div>
        <div style={{
          width: '48px', height: '48px', borderRadius: '14px',
          background: stat.gradient, display: 'flex', alignItems: 'center',
          justifyContent: 'center', boxShadow: `0 8px 20px ${stat.shadowColor}`,
        }}>
          <Icon size={22} color="#fff" strokeWidth={2} />
        </div>
      </div>
    </div>
  );
}

export default function Users() {
  const { colors } = useTheme();
  const [users, setUsers] = useState(initialUsers);
  const [search, setSearch] = useState('');

  const filtered = users.filter(
    (u) =>
      u.name.toLowerCase().includes(search.toLowerCase()) ||
      u.email.toLowerCase().includes(search.toLowerCase()) ||
      u.role.toLowerCase().includes(search.toLowerCase())
  );

  const handleBlock = (id) => {
    setUsers((prev) => prev.filter((u) => u.id !== id));
  };

  return (
    <div>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '24px', flexWrap: 'wrap', gap: '16px' }}>
        <div>
          <h1 style={{ margin: 0, fontSize: '28px', fontWeight: 700, color: colors.text, letterSpacing: '-0.02em' }}>
            Users
          </h1>
          <p style={{ margin: '4px 0 0', fontSize: '14px', color: colors.textMuted }}>
            Manage customer accounts
          </p>
        </div>
        <Link
          to="/admin/users/add"
          style={{
            display: 'inline-flex', alignItems: 'center', gap: '8px',
            padding: '10px 20px', borderRadius: '10px',
            background: colors.accent, color: colors.bg,
            fontSize: '14px', fontWeight: 600, textDecoration: 'none',
            transition: 'all 0.2s',
          }}
          onMouseEnter={(e) => { e.currentTarget.style.opacity = '0.9'; e.currentTarget.style.transform = 'translateY(-1px)'; }}
          onMouseLeave={(e) => { e.currentTarget.style.opacity = '1'; e.currentTarget.style.transform = 'translateY(0)'; }}
        >
          <Plus size={18} />
          Add User
        </Link>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '16px', marginBottom: '24px' }}>
        {statsCards.map((stat) => (
          <StatCard key={stat.label} stat={stat} />
        ))}
      </div>

      <div style={{ marginBottom: '20px', position: 'relative' }}>
        <Search size={18} color={colors.textSubtle} style={{ position: 'absolute', left: '14px', top: '50%', transform: 'translateY(-50%)', pointerEvents: 'none' }} />
        <input
          type="text"
          placeholder="Search users by name, email or role..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          style={{
            width: '100%', padding: '12px 16px 12px 42px',
            borderRadius: '12px', border: `1px solid ${colors.border}`,
            background: colors.bgCard, color: colors.text,
            fontSize: '14px', outline: 'none',
            transition: 'border-color 0.2s',
            boxSizing: 'border-box',
          }}
          onFocus={(e) => { e.currentTarget.style.borderColor = colors.accent; }}
          onBlur={(e) => { e.currentTarget.style.borderColor = colors.border; }}
        />
      </div>

      <div style={{
        background: colors.bgCard, borderRadius: '16px',
        border: `1px solid ${colors.border}`, overflow: 'hidden',
      }}>
        <div style={{ overflowX: 'auto' }}>
          <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '13.5px', minWidth: '720px' }}>
            <thead>
              <tr>
                {['User', 'Email', 'Role', 'Orders', 'Joined', 'Actions'].map((h) => (
                  <th key={h} style={{
                    textAlign: 'left', padding: '14px 16px',
                    fontSize: '11.5px', fontWeight: '600', color: colors.textSubtle,
                    textTransform: 'uppercase', letterSpacing: '0.06em',
                    borderBottom: `1px solid ${colors.border}`,
                    background: colors.bgHover,
                  }}>
                    {h}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {filtered.map((user) => {
                const rc = roleConfig[user.role] || roleConfig.user;
                return (
                  <tr key={user.id} style={{
                    borderBottom: `1px solid ${colors.borderLight}`,
                    transition: 'background 0.15s',
                  }}
                    onMouseEnter={(e) => { e.currentTarget.style.background = colors.bgHover; }}
                    onMouseLeave={(e) => { e.currentTarget.style.background = 'transparent'; }}
                  >
                    <td style={{ padding: '14px 16px' }}>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                        <div style={{
                          width: '38px', height: '38px', borderRadius: '10px',
                          background: user.color, display: 'flex', alignItems: 'center',
                          justifyContent: 'center', fontSize: '14px', fontWeight: '700',
                          color: '#fff', flexShrink: 0,
                        }}>
                          {user.name.charAt(0)}
                        </div>
                        <span style={{ fontWeight: '600', color: colors.text }}>{user.name}</span>
                      </div>
                    </td>
                    <td style={{ padding: '14px 16px', color: colors.textMuted }}>{user.email}</td>
                    <td style={{ padding: '14px 16px' }}>
                      <span style={{
                        display: 'inline-flex', alignItems: 'center', gap: '5px',
                        padding: '5px 12px', borderRadius: '8px', fontSize: '12px', fontWeight: '600',
                        background: rc.bg, color: rc.text, textTransform: 'capitalize',
                        border: `1px solid ${rc.border}`,
                      }}>
                        {user.role === 'admin' && <Shield size={12} />}
                        {user.role}
                      </span>
                    </td>
                    <td style={{ padding: '14px 16px', fontWeight: '600', color: colors.text }}>{user.orders}</td>
                    <td style={{ padding: '14px 16px', color: colors.textMuted }}>
                      {new Date(user.joined).toLocaleDateString('en-US', { year: 'numeric', month: 'short', day: 'numeric' })}
                    </td>
                    <td style={{ padding: '14px 16px' }}>
                      <div style={{ display: 'flex', gap: '6px' }}>
                        <button
                          style={{
                            width: '32px', height: '32px', borderRadius: '8px',
                            border: `1px solid ${colors.border}`, background: colors.bgCard,
                            display: 'flex', alignItems: 'center', justifyContent: 'center',
                            cursor: 'pointer', transition: 'all 0.15s',
                          }}
                          onMouseEnter={(e) => { e.currentTarget.style.background = colors.bgAccent; e.currentTarget.style.borderColor = colors.accent; }}
                          onMouseLeave={(e) => { e.currentTarget.style.background = colors.bgCard; e.currentTarget.style.borderColor = colors.border; }}
                          title="Edit"
                        >
                          <Edit2 size={14} color={colors.accent} />
                        </button>
                        <button
                          onClick={() => handleBlock(user.id)}
                          style={{
                            width: '32px', height: '32px', borderRadius: '8px',
                            border: `1px solid ${colors.border}`, background: colors.bgCard,
                            display: 'flex', alignItems: 'center', justifyContent: 'center',
                            cursor: 'pointer', transition: 'all 0.15s',
                          }}
                          onMouseEnter={(e) => { e.currentTarget.style.background = '#f0f0f0'; e.currentTarget.style.borderColor = '#e5e5e5'; }}
                          onMouseLeave={(e) => { e.currentTarget.style.background = colors.bgCard; e.currentTarget.style.borderColor = colors.border; }}
                          title="Block"
                        >
                          <Ban size={14} color="#0a0a0a" />
                        </button>
                      </div>
                    </td>
                  </tr>
                );
              })}
              {filtered.length === 0 && (
                <tr>
                  <td colSpan={6} style={{ padding: '40px 16px', textAlign: 'center', color: colors.textSubtle, fontSize: '14px' }}>
                    No users found matching "{search}"
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
