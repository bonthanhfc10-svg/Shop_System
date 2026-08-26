import { createContext, useState, useEffect } from 'react';

export const ThemeContext = createContext(null);

const lightTheme = {
  bg: '#fafafa',
  bgCard: '#ffffff',
  bgHover: '#f5f5f5',
  bgSidebar: '#ffffff',
  bgNavbar: '#ffffff',
  bgInput: '#ffffff',
  bgModal: '#ffffff',
  bgOverlay: 'rgba(0,0,0,0.45)',
  bgTableRow: '#fafafa',
  bgBadge: '#f5f5f5',
  bgAccent: '#f0f0f0',
  bgAccentHover: '#e5e5e5',
  bgDanger: '#f5f5f5',
  bgSuccess: '#f0f0f0',
  bgWarning: '#f5f5f5',
  bgPink: '#f5f5f5',
  bgNavActive: '#000000',
  text: '#0a0a0a',
  textSecondary: '#404040',
  textMuted: '#737373',
  textSubtle: '#a3a3a3',
  textOnAccent: '#0a0a0a',
  border: '#e5e5e5',
  borderLight: '#f0f0f0',
  borderInput: '#d4d4d4',
  borderDanger: '#a3a3a3',
  accent: '#000000',
  accentLight: '#404040',
  danger: '#171717',
  success: '#0a0a0a',
  warning: '#404040',
  shadow: '0 1px 2px rgba(0,0,0,0.05)',
  shadowCard: '0 1px 2px rgba(0,0,0,0.04)',
  shadowMd: '0 2px 6px rgba(0,0,0,0.06)',
  shadowLg: '0 6px 16px rgba(0,0,0,0.08)',
  shadowXl: '0 12px 32px rgba(0,0,0,0.10)',
  chartBar: '#171717',
  gradientPrimary: '#000000',
  gradientSuccess: '#262626',
  gradientWarning: '#404040',
  gradientInfo: '#171717',
  gradientPurple: '#000000',
  gradientOrange: '#404040',
};

const darkTheme = {
  bg: '#0a0a0a',
  bgCard: '#141414',
  bgHover: '#1f1f1f',
  bgSidebar: '#0d0d0d',
  bgNavbar: '#0d0d0d',
  bgInput: '#141414',
  bgModal: '#141414',
  bgOverlay: 'rgba(0,0,0,0.75)',
  bgTableRow: '#141414',
  bgBadge: '#1f1f1f',
  bgAccent: '#262626',
  bgAccentHover: '#333333',
  bgDanger: '#1f1f1f',
  bgSuccess: '#262626',
  bgWarning: '#1f1f1f',
  bgPink: '#1f1f1f',
  bgNavActive: '#ffffff',
  text: '#fafafa',
  textSecondary: '#d4d4d4',
  textMuted: '#8f8f8f',
  textSubtle: '#5c5c5c',
  textOnAccent: '#0a0a0a',
  border: '#262626',
  borderLight: '#1f1f1f',
  borderInput: '#404040',
  borderDanger: '#5c5c5c',
  accent: '#ffffff',
  accentLight: '#d4d4d4',
  danger: '#e5e5e5',
  success: '#ffffff',
  warning: '#d4d4d4',
  shadow: '0 1px 2px rgba(0,0,0,0.5)',
  shadowCard: '0 1px 3px rgba(0,0,0,0.45)',
  shadowMd: '0 4px 10px rgba(0,0,0,0.5)',
  shadowLg: '0 10px 24px rgba(0,0,0,0.55)',
  shadowXl: '0 16px 40px rgba(0,0,0,0.6)',
  chartBar: '#e5e5e5',
  gradientPrimary: '#404040',
  gradientSuccess: '#333333',
  gradientWarning: '#2e2e2e',
  gradientInfo: '#3a3a3a',
  gradientPurple: '#404040',
  gradientOrange: '#2e2e2e',
};

export function ThemeProvider({ children }) {
  const [theme, setTheme] = useState(() => {
    return 'light';
  });

  useEffect(() => {
    localStorage.setItem('vibe-theme', theme);
    document.documentElement.setAttribute('data-theme', theme);
    const root = document.documentElement;
    const vars = theme === 'dark' ? darkTheme : lightTheme;
    Object.entries(vars).forEach(([key, value]) => {
      root.style.setProperty(`--${key}`, value);
    });
  }, [theme]);

  const toggleTheme = () => setTheme((prev) => (prev === 'light' ? 'dark' : 'light'));

  const colors = theme === 'dark' ? darkTheme : lightTheme;

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme, colors }}>
      {children}
    </ThemeContext.Provider>
  );
}
