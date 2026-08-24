import { useState } from 'react';
import { useTheme } from '../../hooks/useTheme';
import { Plus, Edit2, Trash2, Package } from 'lucide-react';

const colorsData = [
  { id: 1, name: 'Black', hex: '#000000', products: 234 },
  { id: 2, name: 'White', hex: '#FFFFFF', products: 198 },
  { id: 3, name: 'Navy Blue', hex: '#1e3a5f', products: 156 },
  { id: 4, name: 'Red', hex: '#ef4444', products: 134 },
  { id: 5, name: 'Gray', hex: '#6b7280', products: 112 },
  { id: 6, name: 'Green', hex: '#22c55e', products: 98 },
  { id: 7, name: 'Pink', hex: '#ec4899', products: 87 },
  { id: 8, name: 'Brown', hex: '#92400e', products: 76 },
];

export default function Colors() {
  const { colors } = useTheme();
  const [colorList] = useState(colorsData);

  return (
    <div>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '28px' }}>
        <div>
          <h1 style={{ fontSize: '22px', fontWeight: '700', color: colors.text, margin: 0 }}>Colors</h1>
          <p style={{ fontSize: '13px', color: colors.textSubtle, margin: '4px 0 0' }}>Manage product colors</p>
        </div>
        <button style={{
          display: 'flex', alignItems: 'center', gap: '8px', padding: '10px 20px',
          background: '#000000',
          color: '#fff', border: 'none', borderRadius: '10px', fontSize: '13px', fontWeight: '600', cursor: 'pointer',
        }}>
          <Plus size={16} /> Add Color
        </button>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(170px, 1fr))', gap: '16px' }}>
        {colorList.map((c) => (
          <div key={c.id} style={{
            background: colors.bgCard, borderRadius: '16px', padding: '24px 16px',
            border: `1px solid ${colors.border}`, textAlign: 'center',
            transition: 'all 0.25s', cursor: 'default',
          }}
            onMouseEnter={(e) => { e.currentTarget.style.transform = 'translateY(-3px)'; e.currentTarget.style.boxShadow = colors.shadowMd; }}
            onMouseLeave={(e) => { e.currentTarget.style.transform = 'translateY(0)'; e.currentTarget.style.boxShadow = 'none'; }}
          >
            <div style={{ display: 'flex', justifyContent: 'center', marginBottom: '14px' }}>
              <div style={{
                width: '64px', height: '64px', borderRadius: '50%',
                background: c.hex, boxShadow: '0 4px 12px rgba(0,0,0,0.15)',
                border: c.hex.toUpperCase() === '#FFFFFF' || c.hex.toUpperCase() === '#FFF' ? '3px solid #e5e7eb' : '3px solid rgba(255,255,255,0.15)',
              }} />
            </div>
            <h3 style={{ fontSize: '15px', fontWeight: '600', color: colors.text, margin: '0 0 4px' }}>{c.name}</h3>
            <p style={{ fontSize: '12px', color: colors.textMuted, margin: '0 0 10px', fontFamily: 'monospace' }}>{c.hex}</p>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '5px', fontSize: '12.5px', color: colors.textSubtle, marginBottom: '14px' }}>
              <Package size={13} /> {c.products} products
            </div>
            <div style={{ display: 'flex', justifyContent: 'center', gap: '8px', paddingTop: '14px', borderTop: `1px solid ${colors.borderLight}` }}>
              <button style={{
                padding: '6px 10px', borderRadius: '6px', border: 'none', fontSize: '11.5px',
                fontWeight: '600', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '4px',
                background: `${colors.accent}12`, color: colors.accent,
              }}>
                <Edit2 size={11} /> Edit
              </button>
              <button style={{
                padding: '6px 10px', borderRadius: '6px', border: 'none', fontSize: '11.5px',
                fontWeight: '600', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '4px',
                background: '#f0f0f0', color: '#0a0a0a',
              }}>
                <Trash2 size={11} /> Delete
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
