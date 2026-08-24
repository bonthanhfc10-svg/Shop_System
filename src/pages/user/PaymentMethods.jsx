import { useState } from 'react';
import { useTheme } from '../../hooks/useTheme';
import { Plus, Trash2, Shield, CheckCircle2 } from 'lucide-react';

const initialCards = [
  { id: 1, type: 'Visa', last4: '4242', expiry: '12/28', isDefault: true },
  { id: 2, type: 'Mastercard', last4: '8888', expiry: '06/27', isDefault: false },
];

const typeIcons = { Visa: '💳', Mastercard: '💳', Amex: '💳' };

export default function PaymentMethods() {
  const { colors } = useTheme();
  const [cards, setCards] = useState(initialCards);
  const [showForm, setShowForm] = useState(false);

  const handleDelete = (id) => setCards((prev) => prev.filter((c) => c.id !== id));
  const handleSetDefault = (id) => setCards((prev) => prev.map((c) => ({ ...c, isDefault: c.id === id })));

  const inputStyle = {
    width: '100%', padding: '10px 12px', borderRadius: '10px',
    border: `1px solid ${colors.borderInput}`, fontSize: '14px',
    outline: 'none', background: colors.bgInput, color: colors.text, boxSizing: 'border-box',
  };

  return (
    <div style={{ maxWidth: '800px', margin: '0 auto', padding: '0 clamp(16px, 3vw, 24px)' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '24px', flexWrap: 'wrap', gap: '12px' }}>
        <h1 style={{ margin: 0, fontSize: '24px', fontWeight: '700', color: colors.text }}>Payment Methods</h1>
        <button onClick={() => setShowForm(!showForm)} style={{
          display: 'flex', alignItems: 'center', gap: '6px', padding: '10px 18px',
          borderRadius: '10px', border: 'none', background: colors.gradientPrimary,
          color: '#fff', fontSize: '13px', fontWeight: '600', cursor: 'pointer',
        }}>
          <Plus size={16} /> Add Card
        </button>
      </div>

      {showForm && (
        <div style={{
          background: colors.bgCard, borderRadius: '14px', border: `1px solid ${colors.border}`,
          padding: '20px', marginBottom: '20px', animation: 'fadeIn 0.3s ease',
        }}>
          <h3 style={{ margin: '0 0 16px', fontSize: '15px', fontWeight: '700', color: colors.text }}>Add New Card</h3>
          <div style={{ display: 'grid',           gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))', gap: '12px' }}>
            <div style={{ gridColumn: '1 / -1' }}>
              <label style={{ display: 'block', marginBottom: '4px', fontSize: '12px', fontWeight: '600', color: colors.textMuted }}>Card Number</label>
              <input placeholder="1234 5678 9012 3456" style={inputStyle} />
            </div>
            <div>
              <label style={{ display: 'block', marginBottom: '4px', fontSize: '12px', fontWeight: '600', color: colors.textMuted }}>Expiry Date</label>
              <input placeholder="MM/YY" style={inputStyle} />
            </div>
            <div>
              <label style={{ display: 'block', marginBottom: '4px', fontSize: '12px', fontWeight: '600', color: colors.textMuted }}>CVC</label>
              <input placeholder="123" style={inputStyle} />
            </div>
          </div>
          <div style={{ display: 'flex', gap: '10px', marginTop: '14px' }}>
            <button onClick={() => setShowForm(false)} style={{
              padding: '10px 20px', borderRadius: '10px', border: 'none',
              background: colors.accent, color: colors.bg, fontSize: '13px', fontWeight: '600', cursor: 'pointer',
            }}>Save Card</button>
            <button onClick={() => setShowForm(false)} style={{
              padding: '10px 20px', borderRadius: '10px',
              border: `1px solid ${colors.border}`, background: colors.bgCard,
              color: colors.textSecondary, fontSize: '13px', fontWeight: '600', cursor: 'pointer',
            }}>Cancel</button>
          </div>
        </div>
      )}

      <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
        {cards.map((card) => (
          <div key={card.id} style={{
            display: 'flex', alignItems: 'center', gap: '16px',
            padding: '20px', background: colors.bgCard, borderRadius: '14px',
            border: `1px solid ${card.isDefault ? colors.accent : colors.border}`,
          }}>
            <div style={{
              width: '56px', height: '40px', borderRadius: '8px',
              background: colors.bgHover, display: 'flex',
              alignItems: 'center', justifyContent: 'center', fontSize: '22px',
            }}>
              {typeIcons[card.type]}
            </div>
            <div style={{ flex: 1 }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                <span style={{ fontSize: '15px', fontWeight: '600', color: colors.text }}>{card.type}</span>
                {card.isDefault && (
                  <span style={{ padding: '2px 8px', borderRadius: '4px', background: '#e5e5e5', color: '#0a0a0a', fontSize: '11px', fontWeight: '600' }}>Default</span>
                )}
              </div>
              <p style={{ margin: '2px 0 0', fontSize: '13px', color: colors.textMuted }}>
                **** **** **** {card.last4} | Expires {card.expiry}
              </p>
            </div>
            <div style={{ display: 'flex', gap: '6px' }}>
              {!card.isDefault && (
                <button onClick={() => handleSetDefault(card.id)} style={{
                  padding: '6px 10px', borderRadius: '6px', border: `1px solid ${colors.border}`,
                  background: colors.bgCard, color: colors.textMuted, fontSize: '11px',
                  fontWeight: '600', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '4px',
                }}>
                  <CheckCircle2 size={12} /> Default
                </button>
              )}
              <button onClick={() => handleDelete(card.id)} style={{
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

      <div style={{
        display: 'flex', alignItems: 'center', gap: '10px',
        marginTop: '20px', padding: '14px', borderRadius: '10px',
        background: colors.bgSuccess, color: colors.success,
        fontSize: '13px',
      }}>
        <Shield size={16} /> Your payment information is encrypted and secure.
      </div>
    </div>
  );
}
