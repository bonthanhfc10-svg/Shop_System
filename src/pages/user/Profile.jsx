import { useState } from 'react';
import { Link } from 'react-router-dom';
import { useTheme } from '../../hooks/useTheme';
import { useAuth } from '../../hooks/useAuth';
import {
  User, Mail, Phone, Lock, Camera, Save, Edit3,
  Shield, Calendar, MapPin, CreditCard, Package,
  ChevronRight, CheckCircle2, Heart, Tag, Star, Bell,
  ShoppingBag, LogOut, ExternalLink,
} from 'lucide-react';

function ProfileHeader({ user, colors, isEditing, setIsEditing, avatarPreview, setAvatarPreview }) {
  const handleAvatarChange = (e) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => setAvatarPreview(reader.result);
      reader.readAsDataURL(file);
    }
  };

  return (
    <div style={{ borderRadius: '20px', overflow: 'hidden', background: colors.bgCard, border: `1px solid ${colors.border}` }}>
      <div style={{
        height: 'clamp(140px, 20vw, 220px)',
        background: 'linear-gradient(135deg, #1e1b4b 0%, #312e81 25%, #4f46e5 50%, #7c3aed 75%, #a855f7 100%)',
        position: 'relative', overflow: 'hidden',
      }}>
        <div style={{ position: 'absolute', inset: 0, background: 'url("data:image/svg+xml,%3Csvg width=\'60\' height=\'60\' viewBox=\'0 0 60 60\' xmlns=\'http://www.w3.org/2000/svg\'%3E%3Cg fill=\'none\' fill-rule=\'evenodd\'%3E%3Cg fill=\'%23ffffff\' fill-opacity=\'0.05\'%3E%3Cpath d=\'M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z\'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")', opacity: 0.6 }} />
        <div style={{ position: 'absolute', top: '-40%', right: '-10%', width: '300px', height: '300px', borderRadius: '50%', background: 'rgba(255,255,255,0.06)' }} />
        <div style={{ position: 'absolute', bottom: '-30%', left: '-5%', width: '200px', height: '200px', borderRadius: '50%', background: 'rgba(255,255,255,0.04)' }} />
        <button style={{
          position: 'absolute', top: '16px', right: '16px',
          background: 'rgba(255,255,255,0.15)', backdropFilter: 'blur(8px)',
          border: '1px solid rgba(255,255,255,0.2)', borderRadius: '10px',
          padding: '8px 14px', cursor: 'pointer', color: '#fff',
          fontSize: '12px', fontWeight: '600', display: 'flex', alignItems: 'center', gap: '6px',
          transition: 'all 0.2s',
        }}
          onMouseEnter={(e) => { e.currentTarget.style.background = 'rgba(255,255,255,0.3)'; }}
          onMouseLeave={(e) => { e.currentTarget.style.background = 'rgba(255,255,255,0.15)'; }}
        >
          <Camera size={14} /> Change Cover
        </button>
      </div>

      <div style={{ padding: '0 clamp(20px, 4vw, 40px) clamp(24px, 3vw, 36px)', position: 'relative' }}>
        <div style={{
          display: 'flex', alignItems: 'flex-end', gap: '20px',
          marginTop: '-52px', marginBottom: '24px', flexWrap: 'wrap',
        }}>
          <div style={{ position: 'relative', flexShrink: 0 }}>
            <div style={{
              width: '104px', height: '104px', borderRadius: '50%',
              background: avatarPreview || 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
              backgroundSize: 'cover', backgroundPosition: 'center',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              border: `4px solid ${colors.bgCard}`,
              boxShadow: '0 8px 32px rgba(102,126,234,0.3)',
              fontSize: '36px', fontWeight: '700', color: '#fff',
              transition: 'all 0.3s',
            }}>
              {!avatarPreview && (user?.name?.charAt(0) || 'U')}
            </div>
            <label style={{
              position: 'absolute', bottom: '2px', right: '2px',
              width: '32px', height: '32px', borderRadius: '50%',
              background: colors.accent, border: `3px solid ${colors.bgCard}`,
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              cursor: 'pointer', transition: 'all 0.2s',
            }}
              onMouseEnter={(e) => { e.currentTarget.style.transform = 'scale(1.1)'; }}
              onMouseLeave={(e) => { e.currentTarget.style.transform = 'scale(1)'; }}
            >
              <Camera size={14} color="#fff" />
              <input type="file" accept="image/*" onChange={handleAvatarChange} style={{ display: 'none' }} />
            </label>
          </div>

          <div style={{ flex: 1, minWidth: '200px', paddingBottom: '4px' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '10px', flexWrap: 'wrap' }}>
              <h1 style={{ margin: 0, fontSize: 'clamp(22px, 3vw, 28px)', fontWeight: '800', color: colors.text, letterSpacing: '-0.02em' }}>
                {user?.name || 'User'}
              </h1>
              <div style={{ display: 'flex', gap: '6px' }}>
                <span style={{
                  display: 'inline-flex', alignItems: 'center', gap: '4px',
                  padding: '4px 10px', borderRadius: '6px', fontSize: '11px', fontWeight: '600',
                  background: '#eef2ff', color: '#4f46e5',
                }}>
                  <Shield size={11} /> {user?.role === 'admin' ? 'Admin' : 'Member'}
                </span>
                <span style={{
                  display: 'inline-flex', alignItems: 'center', gap: '4px',
                  padding: '4px 10px', borderRadius: '6px', fontSize: '11px', fontWeight: '600',
                  background: '#ecfdf5', color: '#059669',
                }}>
                  <CheckCircle2 size={11} /> Verified
                </span>
              </div>
            </div>
            <p style={{ margin: '4px 0 0', fontSize: '14px', color: colors.textMuted }}>
              {user?.email || 'user@example.com'}
            </p>
          </div>

          <button
            onClick={() => setIsEditing(!isEditing)}
            style={{
              display: 'inline-flex', alignItems: 'center', gap: '6px',
              padding: '10px 20px', borderRadius: '10px', border: 'none',
              background: isEditing ? colors.bgHover : colors.gradientPrimary,
              color: isEditing ? colors.text : '#fff',
              fontSize: '13px', fontWeight: '600', cursor: 'pointer',
              transition: 'all 0.25s',
              boxShadow: isEditing ? 'none' : '0 4px 16px rgba(102,126,234,0.3)',
            }}
            onMouseEnter={(e) => { e.currentTarget.style.transform = 'translateY(-1px)'; }}
            onMouseLeave={(e) => { e.currentTarget.style.transform = 'translateY(0)'; }}
          >
            <Edit3 size={14} />
            {isEditing ? 'Cancel' : 'Edit Profile'}
          </button>
        </div>
      </div>
    </div>
  );
}

function InfoField({ icon: Icon, label, value, isEditing, type = 'text', options, onChange, fieldKey }) {
  const { colors } = useTheme();

  if (isEditing) {
    if (options) {
      return (
        <div>
          <label style={{ display: 'block', marginBottom: '6px', fontSize: '12px', fontWeight: '600', color: colors.textMuted, textTransform: 'uppercase', letterSpacing: '0.05em' }}>{label}</label>
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
            <div style={{ width: '38px', height: '38px', borderRadius: '10px', background: `${colors.accent}10`, display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
              <Icon size={16} color={colors.accent} />
            </div>
            <select
              value={value}
              onChange={(e) => onChange(fieldKey, e.target.value)}
              style={{
                flex: 1, padding: '10px 12px', borderRadius: '10px', border: `1px solid ${colors.borderInput}`,
                fontSize: '14px', outline: 'none', background: colors.bgInput, color: colors.text, cursor: 'pointer',
              }}
            >
              <option value="">Select</option>
              {options.map((opt) => <option key={opt} value={opt}>{opt}</option>)}
            </select>
          </div>
        </div>
      );
    }
    return (
      <div>
        <label style={{ display: 'block', marginBottom: '6px', fontSize: '12px', fontWeight: '600', color: colors.textMuted, textTransform: 'uppercase', letterSpacing: '0.05em' }}>{label}</label>
        <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
          <div style={{ width: '38px', height: '38px', borderRadius: '10px', background: `${colors.accent}10`, display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
            <Icon size={16} color={colors.accent} />
          </div>
          <input
            type={type}
            value={value}
            onChange={(e) => onChange(fieldKey, e.target.value)}
            style={{
              flex: 1, padding: '10px 12px', borderRadius: '10px', border: `1px solid ${colors.borderInput}`,
              fontSize: '14px', outline: 'none', background: colors.bgInput, color: colors.text,
            }}
          />
        </div>
      </div>
    );
  }

  return (
    <div style={{ display: 'flex', alignItems: 'center', gap: '12px', padding: '14px 0', borderBottom: `1px solid ${colors.borderLight}` }}>
      <div style={{ width: '38px', height: '38px', borderRadius: '10px', background: `${colors.accent}10`, display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
        <Icon size={16} color={colors.accent} />
      </div>
      <div style={{ flex: 1, minWidth: 0 }}>
        <p style={{ margin: 0, fontSize: '11px', color: colors.textSubtle, fontWeight: '600', textTransform: 'uppercase', letterSpacing: '0.06em' }}>{label}</p>
        <p style={{ margin: '3px 0 0', fontSize: '14px', color: colors.text, fontWeight: '500', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{value || '—'}</p>
      </div>
    </div>
  );
}

function PasswordSection({ colors }) {
  const [showForm, setShowForm] = useState(false);
  const [current, setCurrent] = useState('');
  const [newPass, setNewPass] = useState('');
  const [confirm, setConfirm] = useState('');

  const inputStyle = {
    width: '100%', padding: '10px 12px', borderRadius: '10px',
    border: `1px solid ${colors.borderInput}`, fontSize: '14px',
    outline: 'none', background: colors.bgInput, color: colors.text, boxSizing: 'border-box',
  };

  return (
    <div style={{ background: colors.bgCard, borderRadius: '16px', padding: 'clamp(20px, 3vw, 28px)', border: `1px solid ${colors.border}` }}>
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: showForm ? '20px' : '0' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
          <div style={{ width: '42px', height: '42px', borderRadius: '12px', background: 'linear-gradient(135deg, #f59e0b 0%, #ef4444 100%)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <Lock size={18} color="#fff" />
          </div>
          <div>
            <h3 style={{ margin: 0, fontSize: '15px', fontWeight: '700', color: colors.text }}>Password & Security</h3>
            <p style={{ margin: '2px 0 0', fontSize: '12px', color: colors.textSubtle }}>Last changed 30 days ago</p>
          </div>
        </div>
        <button
          onClick={() => setShowForm(!showForm)}
          style={{
            padding: '8px 14px', borderRadius: '8px', border: `1px solid ${colors.border}`,
            background: colors.bgHover, color: colors.textSecondary,
            fontSize: '12px', fontWeight: '600', cursor: 'pointer',
            display: 'flex', alignItems: 'center', gap: '5px', transition: 'all 0.2s',
          }}
          onMouseEnter={(e) => { e.currentTarget.style.borderColor = colors.accent; e.currentTarget.style.color = colors.accent; }}
          onMouseLeave={(e) => { e.currentTarget.style.borderColor = colors.border; e.currentTarget.style.color = colors.textSecondary; }}
        >
          <Lock size={12} /> {showForm ? 'Cancel' : 'Change'}
        </button>
      </div>

      {showForm && (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '14px', animation: 'fadeIn 0.3s ease' }}>
          {[
            { label: 'Current Password', val: current, set: setCurrent },
            { label: 'New Password', val: newPass, set: setNewPass },
            { label: 'Confirm Password', val: confirm, set: setConfirm },
          ].map((f) => (
            <div key={f.label}>
              <label style={{ display: 'block', marginBottom: '5px', fontSize: '12px', fontWeight: '600', color: colors.textMuted }}>{f.label}</label>
              <input
                type="password" value={f.val} onChange={(e) => f.set(e.target.value)}
                placeholder="••••••••" style={inputStyle}
              />
            </div>
          ))}
          <button style={{
            alignSelf: 'flex-end', padding: '10px 22px', borderRadius: '10px', border: 'none',
            background: 'linear-gradient(135deg, #f59e0b 0%, #ef4444 100%)',
            color: '#fff', fontSize: '13px', fontWeight: '600', cursor: 'pointer',
            display: 'flex', alignItems: 'center', gap: '6px', boxShadow: '0 4px 12px rgba(245,158,11,0.3)',
            transition: 'all 0.2s',
          }}
            onMouseEnter={(e) => { e.currentTarget.style.transform = 'translateY(-1px)'; }}
            onMouseLeave={(e) => { e.currentTarget.style.transform = 'translateY(0)'; }}
          >
            <Lock size={14} /> Update Password
          </button>
        </div>
      )}
    </div>
  );
}

function StatsBar({ colors }) {
  const stats = [
    { label: 'Orders', value: '23', icon: Package, gradient: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)', link: '/user/orders' },
    { label: 'Wishlist', value: '8', icon: Heart, gradient: 'linear-gradient(135deg, #fa709a 0%, #fee140 100%)', link: '/user/wishlist' },
    { label: 'Reviews', value: '12', icon: Star, gradient: 'linear-gradient(135deg, #11998e 0%, #38ef7d 100%)', link: '/user/reviews' },
    { label: 'Coupons', value: '5', icon: Tag, gradient: 'linear-gradient(135deg, #4facfe 0%, #00f2fe 100%)', link: '/user/coupons' },
  ];

  return (
    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(140px, 1fr))', gap: '12px' }}>
      {stats.map((s) => {
        const Icon = s.icon;
        return (
          <Link key={s.label} to={s.link} style={{ textDecoration: 'none' }}>
            <div style={{
              background: colors.bgCard, borderRadius: '14px', padding: '20px 16px',
              border: `1px solid ${colors.border}`, textAlign: 'center',
              transition: 'all 0.25s', cursor: 'pointer',
            }}
              onMouseEnter={(e) => { e.currentTarget.style.transform = 'translateY(-4px)'; e.currentTarget.style.boxShadow = colors.shadowLg; }}
              onMouseLeave={(e) => { e.currentTarget.style.transform = 'translateY(0)'; e.currentTarget.style.boxShadow = 'none'; }}
            >
              <div style={{
                width: '44px', height: '44px', borderRadius: '12px',
                background: s.gradient, display: 'flex', alignItems: 'center',
                justifyContent: 'center', margin: '0 auto 12px',
                boxShadow: `0 4px 12px ${s.gradient.includes('#667eea') ? 'rgba(102,126,234,0.3)' : 'rgba(0,0,0,0.1)'}`,
              }}>
                <Icon size={20} color="#fff" />
              </div>
              <p style={{ margin: 0, fontSize: '22px', fontWeight: '800', color: colors.text, letterSpacing: '-0.02em' }}>{s.value}</p>
              <p style={{ margin: '4px 0 0', fontSize: '12px', color: colors.textSubtle, fontWeight: '500' }}>{s.label}</p>
            </div>
          </Link>
        );
      })}
    </div>
  );
}

function ActivityTimeline({ colors }) {
  const activities = [
    { icon: Package, color: '#6366f1', text: 'Order #ORD-7891 delivered', time: '2 hours ago' },
    { icon: Star, color: '#f59e0b', text: 'Reviewed "Wireless Headphones"', time: '1 day ago' },
    { icon: Heart, color: '#ef4444', text: 'Added "Smart Watch Pro" to wishlist', time: '2 days ago' },
    { icon: CreditCard, color: '#10b981', text: 'Payment method updated', time: '3 days ago' },
    { icon: Package, color: '#6366f1', text: 'Order #ORD-7890 shipped', time: '4 days ago' },
  ];

  return (
    <div style={{ background: colors.bgCard, borderRadius: '16px', padding: 'clamp(20px, 3vw, 28px)', border: `1px solid ${colors.border}` }}>
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '20px' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
          <div style={{ width: '42px', height: '42px', borderRadius: '12px', background: 'linear-gradient(135deg, #8b5cf6 0%, #6366f1 100%)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <Bell size={18} color="#fff" />
          </div>
          <div>
            <h3 style={{ margin: 0, fontSize: '15px', fontWeight: '700', color: colors.text }}>Recent Activity</h3>
            <p style={{ margin: '2px 0 0', fontSize: '12px', color: colors.textSubtle }}>Your latest actions</p>
          </div>
        </div>
      </div>
      <div style={{ display: 'flex', flexDirection: 'column' }}>
        {activities.map((a, i) => {
          const Icon = a.icon;
          return (
            <div key={i} style={{
              display: 'flex', alignItems: 'flex-start', gap: '12px',
              padding: '12px 0', borderBottom: i < activities.length - 1 ? `1px solid ${colors.borderLight}` : 'none',
            }}>
              <div style={{
                width: '32px', height: '32px', borderRadius: '8px',
                background: `${a.color}12`, display: 'flex', alignItems: 'center',
                justifyContent: 'center', flexShrink: 0, marginTop: '2px',
              }}>
                <Icon size={14} color={a.color} />
              </div>
              <div style={{ flex: 1, minWidth: 0 }}>
                <p style={{ margin: 0, fontSize: '13px', color: colors.text, fontWeight: '500' }}>{a.text}</p>
                <p style={{ margin: '3px 0 0', fontSize: '11.5px', color: colors.textSubtle }}>{a.time}</p>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

function QuickActions({ colors }) {
  const actions = [
    { label: 'Manage Addresses', icon: MapPin, color: '#6366f1', path: '/user/addresses' },
    { label: 'Payment Methods', icon: CreditCard, color: '#10b981', path: '/user/payment-methods' },
    { label: 'Notification Settings', icon: Bell, color: '#f59e0b', path: '/user/notifications' },
    { label: 'My Orders', icon: ShoppingBag, color: '#8b5cf6', path: '/user/orders' },
    { label: 'Support Center', icon: Mail, color: '#ec4899', path: '/user/support' },
  ];

  return (
    <div style={{ background: colors.bgCard, borderRadius: '16px', padding: 'clamp(20px, 3vw, 28px)', border: `1px solid ${colors.border}` }}>
      <h3 style={{ margin: '0 0 16px', fontSize: '15px', fontWeight: '700', color: colors.text }}>Quick Actions</h3>
      <div style={{ display: 'flex', flexDirection: 'column', gap: '4px' }}>
        {actions.map((action) => {
          const Icon = action.icon;
          return (
            <Link key={action.label} to={action.path} style={{ textDecoration: 'none' }}>
              <div style={{
                display: 'flex', alignItems: 'center', gap: '12px', padding: '12px',
                borderRadius: '10px', cursor: 'pointer', transition: 'all 0.2s',
              }}
                onMouseEnter={(e) => { e.currentTarget.style.background = colors.bgHover; }}
                onMouseLeave={(e) => { e.currentTarget.style.background = 'transparent'; }}
              >
                <div style={{ width: '36px', height: '36px', borderRadius: '8px', background: `${action.color}12`, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                  <Icon size={16} color={action.color} />
                </div>
                <span style={{ flex: 1, fontSize: '13.5px', fontWeight: '500', color: colors.textSecondary }}>{action.label}</span>
                <ExternalLink size={14} color={colors.textSubtle} />
              </div>
            </Link>
          );
        })}
      </div>
    </div>
  );
}

export default function Profile() {
  const { user, logout } = useAuth();
  const { colors } = useTheme();
  const [isEditing, setIsEditing] = useState(false);
  const [avatarPreview, setAvatarPreview] = useState(null);
  const [profile, setProfile] = useState({
    name: user?.name || 'User',
    email: user?.email || 'user@example.com',
    phone: '+1 (555) 123-4567',
    bio: 'Passionate about great products and even better deals. Shopping enthusiast and tech lover.',
    gender: 'Male',
    birthday: '1995-06-15',
  });

  const handleChange = (key, val) => setProfile((p) => ({ ...p, [key]: val }));

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
      <ProfileHeader
        user={user}
        colors={colors}
        isEditing={isEditing}
        setIsEditing={setIsEditing}
        avatarPreview={avatarPreview}
        setAvatarPreview={setAvatarPreview}
      />

      <StatsBar colors={colors} />

      <div className="grid-1fr-1fr-responsive" style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(340px, 1fr))', gap: '24px' }}>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
          <div style={{
            background: colors.bgCard, borderRadius: '16px', padding: 'clamp(20px, 3vw, 28px)',
            border: `1px solid ${colors.border}`,
          }}>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '20px' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                <div style={{ width: '42px', height: '42px', borderRadius: '12px', background: colors.gradientPrimary, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                  <User size={18} color="#fff" />
                </div>
                <div>
                  <h3 style={{ margin: 0, fontSize: '15px', fontWeight: '700', color: colors.text }}>Personal Information</h3>
                  <p style={{ margin: '2px 0 0', fontSize: '12px', color: colors.textSubtle }}>Manage your details</p>
                </div>
              </div>
              {isEditing && (
                <button style={{
                  padding: '8px 16px', borderRadius: '8px', border: 'none',
                  background: colors.gradientPrimary, color: '#fff',
                  fontSize: '12px', fontWeight: '600', cursor: 'pointer',
                  display: 'flex', alignItems: 'center', gap: '5px',
                  boxShadow: '0 2px 8px rgba(102,126,234,0.3)', transition: 'all 0.2s',
                }}
                  onMouseEnter={(e) => { e.currentTarget.style.transform = 'translateY(-1px)'; }}
                  onMouseLeave={(e) => { e.currentTarget.style.transform = 'translateY(0)'; }}
                >
                  <Save size={13} /> Save
                </button>
              )}
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: isEditing ? '14px' : 0 }}>
              <InfoField icon={User} label="Full Name" value={profile.name} isEditing={isEditing} fieldKey="name" onChange={handleChange} />
              <InfoField icon={Mail} label="Email" value={profile.email} isEditing={isEditing} type="email" fieldKey="email" onChange={handleChange} />
              <InfoField icon={Phone} label="Phone" value={profile.phone} isEditing={isEditing} type="tel" fieldKey="phone" onChange={handleChange} />
              <InfoField icon={Calendar} label="Birthday" value={profile.birthday} isEditing={isEditing} type="date" fieldKey="birthday" onChange={handleChange} />
              <InfoField icon={User} label="Gender" value={profile.gender} isEditing={isEditing} options={['Male', 'Female', 'Other']} fieldKey="gender" onChange={handleChange} />
            </div>
          </div>

          <div style={{
            background: colors.bgCard, borderRadius: '16px', padding: 'clamp(20px, 3vw, 28px)',
            border: `1px solid ${colors.border}`,
          }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '16px' }}>
              <div style={{ width: '42px', height: '42px', borderRadius: '12px', background: 'linear-gradient(135deg, #11998e 0%, #38ef7d 100%)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <Edit3 size={18} color="#fff" />
              </div>
              <div>
                <h3 style={{ margin: 0, fontSize: '15px', fontWeight: '700', color: colors.text }}>About Me</h3>
                <p style={{ margin: '2px 0 0', fontSize: '12px', color: colors.textSubtle }}>Your short bio</p>
              </div>
            </div>
            {isEditing ? (
              <textarea
                value={profile.bio}
                onChange={(e) => handleChange('bio', e.target.value)}
                rows={3}
                style={{
                  width: '100%', padding: '10px 12px', borderRadius: '10px',
                  border: `1px solid ${colors.borderInput}`, fontSize: '14px',
                  outline: 'none', background: colors.bgInput, color: colors.text,
                  resize: 'vertical', boxSizing: 'border-box',
                }}
              />
            ) : (
              <p style={{ margin: 0, fontSize: '14px', color: colors.textSecondary, lineHeight: '1.7' }}>
                {profile.bio || 'No bio added yet.'}
              </p>
            )}
          </div>
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
          <PasswordSection colors={colors} />
          <ActivityTimeline colors={colors} />
          <QuickActions colors={colors} />
        </div>
      </div>

      <div style={{
        display: 'flex', justifyContent: 'center',
        padding: '8px 0',
      }}>
        <button onClick={logout} style={{
          display: 'flex', alignItems: 'center', gap: '8px',
          padding: '10px 24px', borderRadius: '10px',
          border: `1px solid ${colors.borderDanger}`, background: colors.bgDanger,
          color: colors.danger, fontSize: '13px', fontWeight: '600', cursor: 'pointer',
          transition: 'all 0.2s',
        }}
          onMouseEnter={(e) => { e.currentTarget.style.background = colors.danger; e.currentTarget.style.color = '#fff'; }}
          onMouseLeave={(e) => { e.currentTarget.style.background = colors.bgDanger; e.currentTarget.style.color = colors.danger; }}
        >
          <LogOut size={16} /> Sign Out
        </button>
      </div>
    </div>
  );
}
