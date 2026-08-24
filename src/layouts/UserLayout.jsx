import { useState, useEffect } from 'react';
import { Outlet } from 'react-router-dom';
import UserSidebar from '../components/layout/UserSidebar';
import UserNavbar from '../components/layout/UserNavbar';
import { useTheme } from '../hooks/useTheme';

export default function UserLayout() {
  const { colors } = useTheme();
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [isMobile, setIsMobile] = useState(() => window.innerWidth <= 768);

  useEffect(() => {
    const handleResize = () => {
      const mobile = window.innerWidth <= 768;
      setIsMobile(mobile);
    };
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return (
    <div style={{ display: 'flex', minHeight: '100vh', background: colors.bg }}>
      <UserSidebar mobileOpen={sidebarOpen} onClose={() => setSidebarOpen(false)} />
      <div
        className="layout-content"
        style={{
          flex: 1,
          marginLeft: isMobile ? '0' : (sidebarOpen ? '260px' : '0'),
          display: 'flex',
          flexDirection: 'column',
          transition: 'margin-left 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
        }}
      >
        <UserNavbar onToggleSidebar={() => setSidebarOpen((prev) => !prev)} sidebarOpen={sidebarOpen} />
        <main style={{ flex: 1, padding: 'clamp(16px, 3vw, 24px)' }}>
          <Outlet />
        </main>
      </div>
    </div>
  );
}
