import { createContext, useState, useEffect } from 'react';

export const ThemeContext = createContext(null);

const lightTheme = {
  bg: '#f8fafc',
  bgCard: '#ffffff',
  bgHover: '#f1f5f9',
  bgSidebar: '#ffffff',
  bgNavbar: '#ffffff',
  bgInput: '#f8fafc',
  bgModal: '#ffffff',
  bgOverlay: 'rgba(0,0,0,0.4)',
  bgTableRow: '#f8fafc',
  bgBadge: '#f1f5f9',
  bgAccent: '#eef2ff',
  bgAccentHover: '#e0e7ff',
  bgDanger: '#fef2f2',
  bgSuccess: '#ecfdf5',
  bgWarning: '#fffbeb',
  bgPink: '#fdf2f8',
  bgNavActive: '#eef2ff',
  text: '#0f172a',
  textSecondary: '#334155',
  textMuted: '#64748b',
  textSubtle: '#94a3b8',
  textOnAccent: '#4f46e5',
  border: '#e2e8f0',
  borderLight: '#f1f5f9',
  borderInput: '#cbd5e1',
  borderDanger: '#fecaca',
  accent: '#4f46e5',
  accentLight: '#818cf8',
  danger: '#ef4444',
  success: '#059669',
  warning: '#d97706',
  shadow: '0 1px 3px rgba(0,0,0,0.06), 0 1px 2px rgba(0,0,0,0.04)',
  shadowCard: '0 1px 3px rgba(0,0,0,0.06), 0 1px 2px rgba(0,0,0,0.04)',
  shadowMd: '0 4px 6px -1px rgba(0,0,0,0.07), 0 2px 4px -2px rgba(0,0,0,0.05)',
  shadowLg: '0 10px 15px -3px rgba(0,0,0,0.08), 0 4px 6px -4px rgba(0,0,0,0.04)',
  shadowXl: '0 20px 25px -5px rgba(0,0,0,0.08), 0 8px 10px -6px rgba(0,0,0,0.04)',
  chartBar: 'linear-gradient(180deg, #6366f1 0%, #818cf8 100%)',
  gradientPrimary: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
  gradientSuccess: 'linear-gradient(135deg, #11998e 0%, #38ef7d 100%)',
  gradientWarning: 'linear-gradient(135deg, #f093fb 0%, #f5576c 100%)',
  gradientInfo: 'linear-gradient(135deg, #4facfe 0%, #00f2fe 100%)',
  gradientPurple: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
  gradientOrange: 'linear-gradient(135deg, #fa709a 0%, #fee140 100%)',
};

const darkTheme = {
  bg: '#0b1120',
  bgCard: '#111827',
  bgHover: '#1e293b',
  bgSidebar: '#0f172a',
  bgNavbar: '#0f172a',
  bgInput: '#1e293b',
  bgModal: '#111827',
  bgOverlay: 'rgba(0,0,0,0.7)',
  bgTableRow: '#111827',
  bgBadge: '#1e293b',
  bgAccent: '#1e1b4b',
  bgAccentHover: '#312e81',
  bgDanger: '#450a0a',
  bgSuccess: '#052e16',
  bgWarning: '#451a03',
  bgPink: '#4a1942',
  bgNavActive: '#1e1b4b',
  text: '#f1f5f9',
  textSecondary: '#cbd5e1',
  textMuted: '#94a3b8',
  textSubtle: '#64748b',
  textOnAccent: '#818cf8',
  border: '#1e293b',
  borderLight: '#334155',
  borderInput: '#334155',
  borderDanger: '#7f1d1d',
  accent: '#6366f1',
  accentLight: '#818cf8',
  danger: '#f87171',
  success: '#34d399',
  warning: '#fbbf24',
  shadow: '0 1px 3px rgba(0,0,0,0.3), 0 1px 2px rgba(0,0,0,0.2)',
  shadowCard: '0 1px 3px rgba(0,0,0,0.3), 0 1px 2px rgba(0,0,0,0.2)',
  shadowMd: '0 4px 6px -1px rgba(0,0,0,0.4), 0 2px 4px -2px rgba(0,0,0,0.3)',
  shadowLg: '0 10px 15px -3px rgba(0,0,0,0.4), 0 4px 6px -4px rgba(0,0,0,0.3)',
  shadowXl: '0 20px 25px -5px rgba(0,0,0,0.5), 0 8px 10px -6px rgba(0,0,0,0.4)',
  chartBar: 'linear-gradient(180deg, #6366f1 0%, #a78bfa 100%)',
  gradientPrimary: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
  gradientSuccess: 'linear-gradient(135deg, #11998e 0%, #38ef7d 100%)',
  gradientWarning: 'linear-gradient(135deg, #f093fb 0%, #f5576c 100%)',
  gradientInfo: 'linear-gradient(135deg, #4facfe 0%, #00f2fe 100%)',
  gradientPurple: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
  gradientOrange: 'linear-gradient(135deg, #fa709a 0%, #fee140 100%)',
};

export function ThemeProvider({ children }) {
  const [theme, setTheme] = useState(() => {
    return 'light';
  });

  useEffect(() => {
    localStorage.setItem('khshop-theme', theme);
    document.documentElement.setAttribute('data-theme', theme);
  }, [theme]);

  const toggleTheme = () => setTheme((prev) => (prev === 'light' ? 'dark' : 'light'));

  const colors = theme === 'dark' ? darkTheme : lightTheme;

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme, colors }}>
      {children}
    </ThemeContext.Provider>
  );
}
