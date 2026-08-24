import { useTheme } from '../../hooks/useTheme';
import { Plus, Edit2, Trash2 } from 'lucide-react';

const sizesData = [
  { id: 1, label: 'XS', category: 'Clothing', products: 45, color: '#525252', bg: '#f4f4f4' },
  { id: 2, label: 'S', category: 'Clothing', products: 98, color: '#525252', bg: '#f4f4f4' },
  { id: 3, label: 'M', category: 'Clothing', products: 156, color: '#525252', bg: '#f4f4f4' },
  { id: 4, label: 'L', category: 'Clothing', products: 142, color: '#525252', bg: '#f4f4f4' },
  { id: 5, label: 'XL', category: 'Clothing', products: 98, color: '#525252', bg: '#f4f4f4' },
  { id: 6, label: 'XXL', category: 'Clothing', products: 67, color: '#525252', bg: '#f4f4f4' },
  { id: 7, label: '38', category: 'Shoes', products: 34, color: '#404040', bg: '#f2f2f2' },
  { id: 8, label: '39', category: 'Shoes', products: 56, color: '#404040', bg: '#f2f2f2' },
  { id: 9, label: '40', category: 'Shoes', products: 78, color: '#404040', bg: '#f2f2f2' },
  { id: 10, label: '41', category: 'Shoes', products: 65, color: '#404040', bg: '#f2f2f2' },
  { id: 11, label: '42', category: 'Shoes', products: 43, color: '#404040', bg: '#f2f2f2' },
];

export default function Sizes() {
  const { colors } = useTheme();

  return (
    <div>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '28px' }}>
        <div>
          <h1 style={{ fontSize: '22px', fontWeight: '700', color: colors.text, margin: 0 }}>Sizes</h1>
          <p style={{ fontSize: '13px', color: colors.textSubtle, margin: '4px 0 0' }}>Manage product sizes</p>
        </div>
        <button style={{
          display: 'flex', alignItems: 'center', gap: '8px', padding: '10px 20px',
          background: '#000000',
          color: '#fff', border: 'none', borderRadius: '10px', fontSize: '13px', fontWeight: '600', cursor: 'pointer',
        }}>
          <Plus size={16} /> Add Size
        </button>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(180px, 1fr))', gap: '16px' }}>
        {sizesData.map((s) => (
          <div key={s.id} style={{
            background: colors.bgCard, borderRadius: '16px', padding: '24px 16px',
            border: `1px solid ${colors.border}`, textAlign: 'center',
            transition: 'all 0.25s', cursor: 'default',
          }}
            onMouseEnter={(e) => { e.currentTarget.style.transform = 'translateY(-3px)'; e.currentTarget.style.boxShadow = colors.shadowMd; }}
            onMouseLeave={(e) => { e.currentTarget.style.transform = 'translateY(0)'; e.currentTarget.style.boxShadow = 'none'; }}
          >
            <div style={{
              width: '56px', height: '56px', borderRadius: '14px',
              background: s.bg, display: 'flex', alignItems: 'center', justifyContent: 'center',
              margin: '0 auto 12px', fontSize: '20px', fontWeight: '800', color: s.color,
            }}>
              {s.label}
            </div>
            <span style={{
              display: 'inline-block', fontSize: '11.5px', fontWeight: '600', padding: '3px 10px',
              borderRadius: '12px', background: s.bg, color: s.color, marginBottom: '10px',
            }}>
              {s.category}
            </span>
            <p style={{ fontSize: '13px', color: colors.textSecondary, margin: '0 0 14px' }}>
              {s.products} products
            </p>
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
