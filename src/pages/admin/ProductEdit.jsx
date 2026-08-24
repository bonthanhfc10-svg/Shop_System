import { useState } from 'react';
import { Link, useParams, useNavigate } from 'react-router-dom';
import { useTheme } from '../../hooks/useTheme';
import { ChevronLeft, Save, Upload } from 'lucide-react';

const productsData = {
  1: { name: 'Wireless Bluetooth Headphones', description: 'Premium wireless headphones with active noise cancellation.', price: '79.99', stock: '124', category: 'Electronics', status: 'active' },
  2: { name: 'Smart Watch Pro', description: 'Advanced smartwatch with health monitoring.', price: '199.99', stock: '56', category: 'Electronics', status: 'active' },
};

export default function ProductEdit() {
  const { id } = useParams();
  const { colors } = useTheme();
  const navigate = useNavigate();
  const existing = productsData[id] || productsData[1];
  const [form, setForm] = useState(existing);

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const inputStyle = {
    width: '100%', padding: '10px 12px', borderRadius: '10px',
    border: `1px solid ${colors.borderInput}`, fontSize: '14px',
    outline: 'none', background: colors.bgInput, color: colors.text, boxSizing: 'border-box',
  };

  return (
    <div style={{ maxWidth: '700px', margin: '0 auto', padding: '0 clamp(16px, 3vw, 24px)' }}>
      <Link to="/admin/products" style={{
        display: 'inline-flex', alignItems: 'center', gap: '6px',
        fontSize: '14px', color: colors.textMuted, textDecoration: 'none', marginBottom: '16px',
      }}>
        <ChevronLeft size={16} /> Back to Products
      </Link>
      <h1 style={{ margin: '0 0 24px', fontSize: '24px', fontWeight: '700', color: colors.text }}>Edit Product</h1>

      <div style={{
        background: colors.bgCard, borderRadius: '16px', border: `1px solid ${colors.border}`,
        padding: '28px',
      }}>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
          <div>
            <label style={{ display: 'block', marginBottom: '6px', fontSize: '12px', fontWeight: '600', color: colors.textMuted }}>Product Name</label>
            <input name="name" value={form.name} onChange={handleChange} style={inputStyle} />
          </div>
          <div>
            <label style={{ display: 'block', marginBottom: '6px', fontSize: '12px', fontWeight: '600', color: colors.textMuted }}>Description</label>
            <textarea name="description" value={form.description} onChange={handleChange} rows={4} style={{ ...inputStyle, resize: 'vertical' }} />
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(160px, 1fr))', gap: '14px' }}>
            <div>
              <label style={{ display: 'block', marginBottom: '6px', fontSize: '12px', fontWeight: '600', color: colors.textMuted }}>Price ($)</label>
              <input name="price" type="number" value={form.price} onChange={handleChange} style={inputStyle} />
            </div>
            <div>
              <label style={{ display: 'block', marginBottom: '6px', fontSize: '12px', fontWeight: '600', color: colors.textMuted }}>Stock</label>
              <input name="stock" type="number" value={form.stock} onChange={handleChange} style={inputStyle} />
            </div>
            <div>
              <label style={{ display: 'block', marginBottom: '6px', fontSize: '12px', fontWeight: '600', color: colors.textMuted }}>Category</label>
              <select name="category" value={form.category} onChange={handleChange} style={{ ...inputStyle, cursor: 'pointer' }}>
                <option value="Electronics">Electronics</option>
                <option value="Accessories">Accessories</option>
                <option value="Furniture">Furniture</option>
              </select>
            </div>
          </div>
          <div>
            <label style={{ display: 'block', marginBottom: '6px', fontSize: '12px', fontWeight: '600', color: colors.textMuted }}>Status</label>
            <select name="status" value={form.status} onChange={handleChange} style={{ ...inputStyle, cursor: 'pointer' }}>
              <option value="active">Active</option>
              <option value="draft">Draft</option>
              <option value="out of stock">Out of Stock</option>
            </select>
          </div>
          <div>
            <label style={{ display: 'block', marginBottom: '6px', fontSize: '12px', fontWeight: '600', color: colors.textMuted }}>Image</label>
            <div style={{
              padding: '32px', borderRadius: '12px', border: `2px dashed ${colors.borderInput}`,
              textAlign: 'center', cursor: 'pointer', background: colors.bgInput,
            }}>
              <Upload size={24} color={colors.textSubtle} style={{ marginBottom: '8px' }} />
              <p style={{ margin: 0, fontSize: '13px', color: colors.textMuted }}>Click to upload or drag & drop</p>
            </div>
          </div>
          <div style={{ display: 'flex', gap: '12px', justifyContent: 'flex-end', marginTop: '8px' }}>
            <Link to="/admin/products" style={{
              padding: '10px 20px', borderRadius: '10px', textDecoration: 'none',
              border: `1px solid ${colors.border}`, background: colors.bgCard,
              color: colors.textSecondary, fontSize: '13px', fontWeight: '600',
            }}>Cancel</Link>
            <button onClick={() => navigate('/admin/products')} style={{
              padding: '10px 20px', borderRadius: '10px', border: 'none',
              background: colors.gradientPrimary, color: '#fff',
              fontSize: '13px', fontWeight: '600', cursor: 'pointer',
              display: 'flex', alignItems: 'center', gap: '6px',
              boxShadow: '0 4px 12px rgba(0,0,0,0.12)',
            }}>
              <Save size={16} /> Save Changes
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
