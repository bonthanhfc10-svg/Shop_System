import { useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { useTheme } from '../../hooks/useTheme';
import { ChevronLeft, Plus, Edit2, Trash2, Package } from 'lucide-react';

const defaultVariants = [
  { id: 1, name: 'Black / Medium', sku: 'WBH-BLK-M', price: 79.99, stock: 45, status: 'active' },
  { id: 2, name: 'Black / Large', sku: 'WBH-BLK-L', price: 79.99, stock: 38, status: 'active' },
  { id: 3, name: 'White / Medium', sku: 'WBH-WHT-M', price: 84.99, stock: 22, status: 'active' },
  { id: 4, name: 'White / Large', sku: 'WBH-WHT-L', price: 84.99, stock: 0, status: 'out of stock' },
];

export default function ProductVariants() {
  useParams();
  const { colors } = useTheme();
  const [variants, setVariants] = useState(defaultVariants);

  const handleDelete = (vid) => setVariants((prev) => prev.filter((v) => v.id !== vid));

  return (
    <div style={{ maxWidth: '900px', margin: '0 auto', padding: '0 clamp(16px, 3vw, 24px)' }}>
      <Link to="/admin/products" style={{
        display: 'inline-flex', alignItems: 'center', gap: '6px',
        fontSize: '14px', color: colors.textMuted, textDecoration: 'none', marginBottom: '16px',
      }}>
        <ChevronLeft size={16} /> Back to Products
      </Link>

      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '24px', flexWrap: 'wrap', gap: '12px' }}>
        <h1 style={{ margin: 0, fontSize: '22px', fontWeight: '700', color: colors.text }}>Product Variants</h1>
        <button style={{
          display: 'flex', alignItems: 'center', gap: '6px', padding: '10px 18px',
          borderRadius: '10px', border: 'none', background: colors.gradientPrimary,
          color: '#fff', fontSize: '13px', fontWeight: '600', cursor: 'pointer',
        }}>
          <Plus size={16} /> Add Variant
        </button>
      </div>

      <div style={{
        background: colors.bgCard, borderRadius: '16px', border: `1px solid ${colors.border}`,
        overflow: 'hidden',
      }}>
        <div style={{ overflowX: 'auto' }}>
          <table style={{ width: '100%', borderCollapse: 'collapse', minWidth: '600px' }}>
            <thead>
              <tr>
                {['Variant', 'SKU', 'Price', 'Stock', 'Status', 'Actions'].map((h) => (
                  <th key={h} style={{
                    textAlign: 'left', padding: '14px 18px', fontSize: '12px',
                    fontWeight: '600', color: colors.textSubtle, textTransform: 'uppercase',
                    letterSpacing: '0.05em', borderBottom: `1px solid ${colors.border}`,
                    background: colors.bgBadge,
                  }}>{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {variants.map((v) => (
                <tr key={v.id} style={{ borderBottom: `1px solid ${colors.borderLight}` }}
                  onMouseEnter={(e) => { e.currentTarget.style.background = colors.bgHover; }}
                  onMouseLeave={(e) => { e.currentTarget.style.background = 'transparent'; }}
                >
                  <td style={{ padding: '14px 18px' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                      <div style={{
                        width: '36px', height: '36px', borderRadius: '8px',
                        background: colors.bgBadge, display: 'flex',
                        alignItems: 'center', justifyContent: 'center',
                      }}>
                        <Package size={16} color={colors.textSubtle} />
                      </div>
                      <span style={{ fontWeight: '600', fontSize: '14px', color: colors.text }}>{v.name}</span>
                    </div>
                  </td>
                  <td style={{ padding: '14px 18px', fontSize: '13px', color: colors.textMuted, fontFamily: 'monospace' }}>{v.sku}</td>
                  <td style={{ padding: '14px 18px', fontWeight: '600', color: colors.text }}>${v.price.toFixed(2)}</td>
                  <td style={{ padding: '14px 18px', fontSize: '14px', color: v.stock === 0 ? colors.danger : colors.text }}>{v.stock}</td>
                  <td style={{ padding: '14px 18px' }}>
                    <span style={{
                      padding: '4px 10px', borderRadius: '20px', fontSize: '12px', fontWeight: '600',
                      background: v.status === 'active' ? '#dcfce7' : '#fef2f2',
                      color: v.status === 'active' ? '#166534' : '#991b1b',
                    }}>
                      {v.status === 'active' ? 'Active' : 'Out of Stock'}
                    </span>
                  </td>
                  <td style={{ padding: '14px 18px' }}>
                    <div style={{ display: 'flex', gap: '6px' }}>
                      <button style={{
                        width: '32px', height: '32px', borderRadius: '8px',
                        border: `1px solid ${colors.border}`, background: colors.bgCard,
                        color: colors.accent, cursor: 'pointer', display: 'flex',
                        alignItems: 'center', justifyContent: 'center',
                      }}><Edit2 size={14} /></button>
                      <button onClick={() => handleDelete(v.id)} style={{
                        width: '32px', height: '32px', borderRadius: '8px',
                        border: `1px solid ${colors.borderDanger}`, background: colors.bgDanger,
                        color: colors.danger, cursor: 'pointer', display: 'flex',
                        alignItems: 'center', justifyContent: 'center',
                      }}><Trash2 size={14} /></button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
