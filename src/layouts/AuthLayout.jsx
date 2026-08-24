import { Outlet } from 'react-router-dom';
import { useTheme } from '../hooks/useTheme';

export default function AuthLayout() {
  const { colors } = useTheme();

  return (
    <div style={{
      minHeight: '100vh',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      background: '#000000',
      padding: '16px',
    }}>
      <div style={{
        width: '100%',
        maxWidth: '420px',
        background: colors.bgCard,
        borderRadius: '16px',
        padding: 'clamp(24px, 5vw, 40px)',
        boxShadow: colors.shadow,
      }}>
        <Outlet />
      </div>
    </div>
  );
}
