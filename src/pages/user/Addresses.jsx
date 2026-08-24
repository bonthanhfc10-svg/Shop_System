import { useState } from 'react';
import { useTheme } from '../../hooks/useTheme';
import { Plus, Trash2, Home, Building2, CheckCircle2 } from 'lucide-react';

const initialAddresses = [
  { id: 1, label: 'Home', address: '123 Main Street, Apt 4B', city: 'Phnom Penh', state: 'Phnom Penh', zip: '12000', phone: '+855 12 345 6789', isDefault: true },
  { id: 2, label: 'Office', address: '456 Business Park, Floor 3', city: 'Siem Reap', state: 'Siem Reap', zip: '17000', phone: '+855 98 765 4321', isDefault: false },
];

export default function Addresses() {
  const { colors } = useTheme();
  const [addresses, setAddresses] = useState(initialAddresses);
  const [showForm, setShowForm] = useState(false);
  const [form, setForm] = useState({ label: '', address: '', city: '', state: '', zip: '', phone: '' });

  const handleAdd = () => {
    if (form.label && form.address) {
      setAddresses((prev) => [...prev, { ...form, id: Date.now(), isDefault: false }]);
      setForm({ label: '', address: '', city: '', state: '', zip: '', phone: '' });
      setShowForm(false);
    }
  };

  const handleDelete = (id) => setAddresses((prev) => prev.filter((a) => a.id !== id));

  const handleSetDefault = (id) => {
    setAddresses((prev) => prev.map((a) => ({ ...a, isDefault: a.id === id })));
  };

  const inputStyle = {
    width: '100%', padding: '10px 12px', borderRadius: '10px',
    border: `1px solid ${colors.borderInput}`, fontSize: '14px',
    outline: 'none', background: colors.bgInput, color: colors.text, boxSizing: 'border-box',
  };

  return (
    <div style={{ maxWidth: '800px', margin: '0 auto', padding: '0 clamp(16px, 3vw, 24px)' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '24px', flexWrap: 'wrap', gap: '12px' }}>
        <h1 style={{ margin: 0, fontSize: '24px', fontWeight: '700', color: colors.text }}>My Addresses</h1>
        <button onClick={() => setShowForm(!showForm)} style={{
          display: 'flex', alignItems: 'center', gap: '6px', padding: '10px 18px',
          borderRadius: '10px', border: 'none', background: colors.gradientPrimary,
          color: '#fff', fontSize: '13px', fontWeight: '600', cursor: 'pointer',
        }}>
          <Plus size={16} /> Add Address
        </button>
      </div>

      {showForm && (
        <div style={{
          background: colors.bgCard, borderRadius: '14px', border: `1px solid ${colors.border}`,
          padding: '20px', marginBottom: '20px', animation: 'fadeIn 0.3s ease',
        }}>
          <h3 style={{ margin: '0 0 16px', fontSize: '15px', fontWeight: '700', color: colors.text }}>New Address</h3>
          <div style={{ display: 'grid',           gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '12px' }}>
            <div>
              <label style={{ display: 'block', marginBottom: '4px', fontSize: '12px', fontWeight: '600', color: colors.textMuted }}>Label</label>
              <input value={form.label} onChange={(e) => setForm({ ...form, label: e.target.value })} placeholder="Home, Office..." style={inputStyle} />
            </div>
            <div>
              <label style={{ display: 'block', marginBottom: '4px', fontSize: '12px', fontWeight: '600', color: colors.textMuted }}>Phone</label>
              <input value={form.phone} onChange={(e) => setForm({ ...form, phone: e.target.value })} placeholder="+855..." style={inputStyle} />
            </div>
            <div style={{ gridColumn: '1 / -1' }}>
              <label style={{ display: 'block', marginBottom: '4px', fontSize: '12px', fontWeight: '600', color: colors.textMuted }}>Address</label>
              <input value={form.address} onChange={(e) => setForm({ ...form, address: e.target.value })} placeholder="Street address" style={inputStyle} />
            </div>
            <div>
              <label style={{ display: 'block', marginBottom: '4px', fontSize: '12px', fontWeight: '600', color: colors.textMuted }}>City</label>
              <input value={form.city} onChange={(e) => setForm({ ...form, city: e.target.value })} style={inputStyle} />
            </div>
            <div>
              <label style={{ display: 'block', marginBottom: '4px', fontSize: '12px', fontWeight: '600', color: colors.textMuted }}>State</label>
              <input value={form.state} onChange={(e) => setForm({ ...form, state: e.target.value })} style={inputStyle} />
            </div>
          </div>
          <div style={{ display: 'flex', gap: '10px', marginTop: '14px' }}>
            <button onClick={handleAdd} style={{
              padding: '10px 20px', borderRadius: '10px', border: 'none',
              background: colors.accent, color: '#fff', fontSize: '13px', fontWeight: '600', cursor: 'pointer',
            }}>Save Address</button>
            <button onClick={() => setShowForm(false)} style={{
              padding: '10px 20px', borderRadius: '10px',
              border: `1px solid ${colors.border}`, background: colors.bgCard,
              color: colors.textSecondary, fontSize: '13px', fontWeight: '600', cursor: 'pointer',
            }}>Cancel</button>
          </div>
        </div>
      )}

      <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
        {addresses.map((addr) => (
          <div key={addr.id} style={{
            display: 'flex', alignItems: 'flex-start', gap: '16px',
            padding: '20px', background: colors.bgCard, borderRadius: '14px',
            border: `1px solid ${addr.isDefault ? colors.accent : colors.border}`,
          }}>
            <div style={{
              width: '44px', height: '44px', borderRadius: '12px',
              background: addr.isDefault ? colors.bgAccent : colors.bgHover,
              display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0,
            }}>
              {addr.label === 'Home' ? <Home size={20} color={colors.accent} /> : <Building2 size={20} color={colors.accent} />}
            </div>
            <div style={{ flex: 1 }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '4px' }}>
                <span style={{ fontSize: '15px', fontWeight: '600', color: colors.text }}>{addr.label}</span>
                {addr.isDefault && (
                  <span style={{
                    padding: '2px 8px', borderRadius: '4px',
                    background: '#dcfce7', color: '#166534',
                    fontSize: '11px', fontWeight: '600',
                  }}>Default</span>
                )}
              </div>
              <p style={{ margin: 0, fontSize: '13px', color: colors.textSecondary, lineHeight: '1.5' }}>
                {addr.address}<br />{addr.city}, {addr.state} {addr.zip}<br />{addr.phone}
              </p>
            </div>
            <div style={{ display: 'flex', gap: '6px', flexShrink: 0 }}>
              {!addr.isDefault && (
                <button onClick={() => handleSetDefault(addr.id)} style={{
                  padding: '6px 10px', borderRadius: '6px', border: `1px solid ${colors.border}`,
                  background: colors.bgCard, color: colors.textMuted, fontSize: '11px',
                  fontWeight: '600', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '4px',
                }}>
                  <CheckCircle2 size={12} /> Set Default
                </button>
              )}
              <button onClick={() => handleDelete(addr.id)} style={{
                width: '32px', height: '32px', borderRadius: '8px',
                border: `1px solid ${colors.borderDanger}`, background: colors.bgDanger,
                color: colors.danger, cursor: 'pointer', display: 'flex',
                alignItems: 'center', justifyContent: 'center',
              }}>
                <Trash2 size={14} />
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
