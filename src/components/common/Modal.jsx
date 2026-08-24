import { useEffect } from 'react';
import { useTheme } from '../../hooks/useTheme';

export default function Modal({ isOpen, onClose, title, children, maxWidth = '500px' }) {
  const { colors } = useTheme();

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => { document.body.style.overflow = ''; };
  }, [isOpen]);

  if (!isOpen) return null;

  return (
    <div
      onClick={onClose}
      style={{
        position: 'fixed', inset: 0, background: colors.bgOverlay,
        display: 'flex', alignItems: 'center', justifyContent: 'center',
        zIndex: 1000, padding: '16px',
      }}
    >
      <div
        onClick={(e) => e.stopPropagation()}
        style={{
          background: colors.bgModal, borderRadius: '12px', padding: '24px',
          width: '100%', maxWidth, maxHeight: '90vh', overflow: 'auto',
          boxShadow: colors.shadow,
        }}
      >
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px' }}>
          <h2 style={{ margin: 0, fontSize: '18px', fontWeight: '600', color: colors.text }}>{title}</h2>
          <button
            onClick={onClose}
            style={{
              background: 'none', border: 'none', fontSize: '20px',
              cursor: 'pointer', color: colors.textSubtle, padding: '4px',
            }}
          >
            &times;
          </button>
        </div>
        {children}
      </div>
    </div>
  );
}
