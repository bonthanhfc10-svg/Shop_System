import { useTheme } from '../../hooks/useTheme';

export default function Loading({ size = 'md', text = 'Loading...' }) {
  const { colors } = useTheme();

  const sizes = {
    sm: { width: '16px', height: '16px' },
    md: { width: '24px', height: '24px' },
    lg: { width: '40px', height: '40px' },
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: '12px', padding: '40px' }}>
      <div
        style={{
          ...sizes[size],
          border: `3px solid ${colors.border}`,
          borderTopColor: colors.accent,
          borderRadius: '50%',
          animation: 'spin 0.8s linear infinite',
        }}
      />
      <style>{`@keyframes spin { to { transform: rotate(360deg); } }`}</style>
      {text && <span style={{ color: colors.textMuted, fontSize: '14px' }}>{text}</span>}
    </div>
  );
}
