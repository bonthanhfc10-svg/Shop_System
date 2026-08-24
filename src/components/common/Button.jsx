import { useTheme } from '../../hooks/useTheme';

export default function Button({ children, variant = 'primary', size = 'md', onClick, disabled, type = 'button', className = '' }) {
  const { colors } = useTheme();

  const baseStyle = {
    display: 'inline-flex',
    alignItems: 'center',
    justifyContent: 'center',
    gap: '8px',
    border: 'none',
    borderRadius: '8px',
    cursor: disabled ? 'not-allowed' : 'pointer',
    fontWeight: '500',
    fontFamily: 'inherit',
    opacity: disabled ? 0.6 : 1,
    transition: 'all 0.2s ease',
  };

  const variants = {
    primary: { background: colors.accent, color: colors.bg },
    secondary: { background: colors.bgHover, color: colors.textSecondary, border: `1px solid ${colors.borderInput}` },
    danger: { background: colors.danger, color: colors.bg },
    success: { background: colors.success, color: colors.bg },
    outline: { background: 'transparent', color: colors.accent, border: `1px solid ${colors.accent}` },
  };

  const sizes = {
    sm: { padding: '6px 12px', fontSize: '13px' },
    md: { padding: '8px 16px', fontSize: '14px' },
    lg: { padding: '12px 24px', fontSize: '16px' },
  };

  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled}
      style={{ ...baseStyle, ...variants[variant], ...sizes[size] }}
      className={className}
    >
      {children}
    </button>
  );
}
