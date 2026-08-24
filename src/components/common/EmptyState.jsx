import { useTheme } from '../../hooks/useTheme';

export default function EmptyState({ icon = '📋', title = 'No data found', description = 'There are no items to display.' }) {
  const { colors } = useTheme();

  return (
    <div style={{
      display: 'flex', flexDirection: 'column', alignItems: 'center',
      justifyContent: 'center', padding: '60px 20px', textAlign: 'center',
    }}>
      <span style={{ fontSize: '48px', marginBottom: '16px' }}>{icon}</span>
      <h3 style={{ margin: '0 0 8px', fontSize: '16px', fontWeight: '600', color: colors.text }}>{title}</h3>
      <p style={{ margin: 0, color: colors.textMuted, fontSize: '14px' }}>{description}</p>
    </div>
  );
}
