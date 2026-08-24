import { useState } from 'react';
import { X } from 'lucide-react';
import { useTheme } from '../../hooks/useTheme';
import { slugify } from '../../data/categoryData';

export default function CategoryModal({ isOpen, onClose, onSubmit, editing, categories, readOnly = false }) {
  const { colors } = useTheme();
  const [form, setForm] = useState(() => ({
    name: editing?.name || '',
    slug: editing?.slug || '',
    image: editing?.image || '',
    parentId: editing?.parentId != null ? String(editing.parentId) : '',
    description: editing?.description || '',
    status: editing?.status || 'active',
  }));
  const [touchedSubmit, setTouchedSubmit] = useState(false);

  if (!isOpen) return null;

  const nameInvalid = touchedSubmit && !form.name.trim();

  const handleNameChange = (e) => {
    const name = e.target.value;
    setForm((prev) => ({ ...prev, name, slug: slugify(name) }));
  };

  const handleSubmit = () => {
    setTouchedSubmit(true);
    if (!form.name.trim() || readOnly) return;
    onSubmit({
      name: form.name.trim(),
      slug: form.slug || slugify(form.name),
      image: form.image.trim(),
      parentId: form.parentId ? Number(form.parentId) : null,
      description: form.description.trim(),
      status: form.status,
    });
  };

  const overlayStyle = {
    position: 'fixed', inset: 0, background: colors.bgOverlay,
    display: 'flex', alignItems: 'center', justifyContent: 'center',
    zIndex: 1000, padding: '16px', animation: 'fadeIn 0.2s ease',
    backdropFilter: 'blur(4px)',
  };

  const cardStyle = {
    background: colors.bgModal, borderRadius: '18px', padding: '24px',
    width: '100%', maxWidth: '560px', maxHeight: '90vh', overflowY: 'auto',
    boxShadow: colors.shadowXl, animation: 'scaleIn 0.2s cubic-bezier(0.4, 0, 0.2, 1)',
  };

  const labelStyle = {
    display: 'block', fontSize: '12px', fontWeight: '600',
    color: colors.textSecondary, margin: '0 0 6px',
  };

  const inputStyle = {
    width: '100%', padding: '10px 14px', borderRadius: '10px',
    border: `1px solid ${colors.border}`, background: colors.bgInput,
    color: colors.text, fontSize: '13.5px', outline: 'none',
    boxSizing: 'border-box', fontFamily: 'inherit',
  };

  return (
    <div onClick={onClose} style={overlayStyle}>
      <div
        onClick={(e) => e.stopPropagation()}
        role="dialog"
        aria-modal="true"
        aria-labelledby="category-modal-title"
        style={cardStyle}
      >
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
          <h2 id="category-modal-title" style={{ margin: 0, fontSize: '17px', fontWeight: '700', color: colors.text }}>
            {readOnly ? 'Category Details' : editing ? 'Edit Category' : 'Add New Category'}
          </h2>
          <button
            onClick={onClose}
            aria-label="Close dialog"
            onMouseEnter={(e) => { e.currentTarget.style.background = colors.bgHover; }}
            onMouseLeave={(e) => { e.currentTarget.style.background = 'transparent'; }}
            style={{
              background: 'transparent', border: 'none', cursor: 'pointer',
              color: colors.textSubtle, width: '32px', height: '32px',
              borderRadius: '8px', display: 'flex', alignItems: 'center',
              justifyContent: 'center', transition: 'background 0.15s',
            }}
          >
            <X size={18} />
          </button>
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
          <div>
            <label htmlFor="cat-image" style={labelStyle}>Category Image</label>
            <div style={{ display: 'flex', gap: '10px', alignItems: 'center' }}>
              {form.image ? (
                <img
                  src={form.image}
                  alt="Preview"
                  style={{
                    width: '52px', height: '52px', borderRadius: '12px', objectFit: 'cover',
                    flexShrink: 0, border: `1px solid ${colors.border}`,
                  }}
                />
              ) : (
                <div style={{
                  width: '52px', height: '52px', borderRadius: '12px', flexShrink: 0,
                  background: editing?.bg || '#eeeeee', display: 'flex', alignItems: 'center',
                  justifyContent: 'center', fontSize: '22px',
                }}>
                  {form.name.charAt(0).toUpperCase() || '🏷️'}
                </div>
              )}
              <input
                id="cat-image"
                type="text"
                placeholder="https://example.com/category.jpg"
                value={form.image}
                disabled={readOnly}
                onChange={(e) => setForm((prev) => ({ ...prev, image: e.target.value }))}
                style={inputStyle}
              />
            </div>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px' }}>
            <div>
              <label htmlFor="cat-name" style={labelStyle}>Category Name *</label>
              <input
                id="cat-name"
                type="text"
                placeholder="e.g. Fashion"
                value={form.name}
                disabled={readOnly}
                onChange={handleNameChange}
                autoFocus={!readOnly}
                style={{
                  ...inputStyle,
                  borderColor: nameInvalid ? colors.danger : colors.border,
                }}
              />
              {nameInvalid && (
                <p style={{ margin: '5px 0 0', fontSize: '11.5px', color: colors.danger }}>
                  Category name is required.
                </p>
              )}
            </div>
            <div>
              <label htmlFor="cat-slug" style={labelStyle}>Slug</label>
              <input
                id="cat-slug"
                type="text"
                placeholder="auto-generated-from-name"
                value={form.slug}
                disabled={readOnly}
                onChange={(e) => setForm((prev) => ({ ...prev, slug: e.target.value }))}
                style={{ ...inputStyle, fontFamily: 'monospace', fontSize: '12.5px' }}
              />
            </div>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px' }}>
            <div>
              <label htmlFor="cat-parent" style={labelStyle}>Parent Category</label>
              <select
                id="cat-parent"
                value={form.parentId}
                disabled={readOnly}
                onChange={(e) => setForm((prev) => ({ ...prev, parentId: e.target.value }))}
                style={inputStyle}
              >
                <option value="">None (Main Category)</option>
                {categories
                  .filter((c) => c.id !== editing?.id)
                  .map((c) => (
                    <option key={c.id} value={String(c.id)}>{c.name}</option>
                  ))}
              </select>
            </div>
            <div>
              <label htmlFor="cat-status" style={labelStyle}>Status</label>
              <select
                id="cat-status"
                value={form.status}
                disabled={readOnly}
                onChange={(e) => setForm((prev) => ({ ...prev, status: e.target.value }))}
                style={inputStyle}
              >
                <option value="active">Active</option>
                <option value="hidden">Hidden</option>
              </select>
            </div>
          </div>

          <div>
            <label htmlFor="cat-description" style={labelStyle}>Description</label>
            <textarea
              id="cat-description"
              rows={3}
              maxLength={200}
              placeholder="Short description shown to customers..."
              value={form.description}
              disabled={readOnly}
              onChange={(e) => setForm((prev) => ({ ...prev, description: e.target.value }))}
              style={{ ...inputStyle, resize: 'vertical', minHeight: '76px' }}
            />
          </div>

          <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '10px', marginTop: '8px' }}>
            <button
              type="button"
              onClick={onClose}
              style={{
                padding: '10px 20px', borderRadius: '10px', border: `1px solid ${colors.border}`,
                background: 'transparent', color: colors.textSecondary,
                fontSize: '13px', fontWeight: '600', cursor: 'pointer', fontFamily: 'inherit',
              }}
            >
              {readOnly ? 'Close' : 'Cancel'}
            </button>
            {!readOnly && (
              <button
                type="button"
                onClick={handleSubmit}
                disabled={!form.name.trim()}
                style={{
                  padding: '10px 22px', borderRadius: '10px', border: 'none',
                  background: colors.gradientPrimary, color: '#fff',
                  fontSize: '13px', fontWeight: '600', fontFamily: 'inherit',
                  cursor: form.name.trim() ? 'pointer' : 'not-allowed',
                  opacity: form.name.trim() ? 1 : 0.5,
                  transition: 'opacity 0.15s',
                }}
              >
                {editing ? 'Update Category' : 'Create Category'}
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
