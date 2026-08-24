import { useState, useEffect } from 'react';
import { Outlet } from 'react-router-dom';
import AdminSidebar from '../components/layout/AdminSidebar';
import AdminNavbar from '../components/layout/AdminNavbar';
import { useTheme } from '../hooks/useTheme';

export default function AdminLayout() {
  const { colors } = useTheme();
  const [sidebarExpanded, setSidebarExpanded] = useState(true);

  return (
    <div style={{ display: 'flex', minHeight: '100vh', background: colors.bg }}>
      <AdminSidebar
        expanded={sidebarExpanded}
        onClose={() => setSidebarExpanded(false)}
      />
      <div
        className="layout-content"
        style={{
          flex: 1,
          marginLeft: sidebarExpanded ? '260px' : '72px',
          display: 'flex',
          flexDirection: 'column',
          transition: 'margin-left 0.25s cubic-bezier(0.4, 0, 0.2, 1)',
        }}
      >
        <AdminNavbar
          onToggleSidebar={() => setSidebarExpanded((p) => !p)}
        />
        <main style={{ flex: 1, padding: 'clamp(16px, 3vw, 32px)' }}>
          <Outlet />
        </main>
      </div>
    </div>
  );
}
