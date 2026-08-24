import { AlertTriangle } from 'lucide-react';
import { useTheme } from '../../hooks/useTheme';

export default function DeleteCategoryModal({ isOpen, category, onClose, onConfirm }) {
  const { colors } = useTheme();

  if (!isOpen || !category) return null;

  return (
    <div
      onClick={onClose}
      style={{
        position: 'fixed', inset: 0, background: colors.bgOverlay,
        display: 'flex', alignItems: 'center', justifyContent: 'center',
        zIndex: 1000, padding: '16px', animation: 'fadeIn 0.2s ease',
        backdropFilter: 'blur(4px)',
      }}
    >
      <div
        onClick={(e) => e.stopPropagation()}
        role="dialog"
        aria-modal="true"
        aria-labelledby="delete-category-title"
        style={{
          background: colors.bgModal, borderRadius: '18px', padding: '28px',
          width: '100%', maxWidth: '420px', boxShadow: colors.shadowXl,
          animation: 'scaleIn 0.2s cubic-bezier(0.4, 0, 0.2, 1)',
          textAlign: 'center',
        }}
      >
        <div style={{
          width: '60px', height: '60px', borderRadius: '50%', margin: '0 auto 18px',
          background: colors.bgDanger, display: 'flex', alignItems: 'center',
          justifyContent: 'center', color: colors.danger,
        }}>
          <AlertTriangle size={26} />
        </div>

        <h2 id="delete-category-title" style={{ margin: '0 0 8px', fontSize: '18px', fontWeight: '700', color: colors.text }}>
          Delete Category?
        </h2>
        <p style={{ margin: '0 0 6px', fontSize: '13.5px', color: colors.textMuted, lineHeight: 1.55 }}>
          Are you sure you want to delete this category? This action cannot be undone.
        </p>
        {category && (
          <p style={{ margin: '0 0 22px', fontSize: '13.5px', fontWeight: '600', color: colors.text }}>
            “{category.name}” <span style={{ fontWeight: 400, color: colors.textSubtle }}>· {category.products} products</span>
          </p>
        )}

        <div style={{ display: 'flex', gap: '10px' }}>
          <button
            type="button"
            onClick={onClose}
            style={{
              flex: 1, padding: '10px 20px', borderRadius: '10px',
              border: `1px solid ${colors.border}`, background: 'transparent',
              color: colors.textSecondary, fontSize: '13px', fontWeight: '600',
              cursor: 'pointer', fontFamily: 'inherit',
            }}
          >
            Cancel
          </button>
          <button
            type="button"
            onClick={onConfirm}
            autoFocus
            style={{
              flex: 1, padding: '10px 20px', borderRadius: '10px', border: 'none',
              background: '#ef4444', color: '#fff',
              fontSize: '13px', fontWeight: '600', cursor: 'pointer', fontFamily: 'inherit',
              transition: 'background 0.15s',
            }}
            onMouseEnter={(e) => { e.currentTarget.style.background = '#dc2626'; }}
            onMouseLeave={(e) => { e.currentTarget.style.background = '#ef4444'; }}
          >
            Delete Category
          </button>
        </div>
      </div>
    </div>
  );
}
