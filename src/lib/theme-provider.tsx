'use client';

import React, { createContext, useContext, useEffect, useState } from 'react';

export const ThemeContext = createContext<{
  theme: 'light' | 'dark';
  toggleTheme: () => void;
} | null>(null);

const apply = (t: 'light' | 'dark') => {
  document.documentElement.classList.toggle('dark', t === 'dark');
};

export function ThemeProvider({ children }: { children: React.ReactNode }) {
  const [theme, setTheme] = useState<'light' | 'dark'>('light');

  useEffect(() => {
    const stored = localStorage.getItem('theme') as 'light' | 'dark' | null;
    const system = window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
    const initial = stored || system;
    setTheme(initial);
    apply(initial);
  }, []);

  const toggleTheme = () => {
    const next = theme === 'light' ? 'dark' : 'light';
    setTheme(next);
    localStorage.setItem('theme', next);
    apply(next);
  };

  return <ThemeContext.Provider value={{ theme, toggleTheme }}>{children}</ThemeContext.Provider>;
}

export function useTheme() {
  const context = useContext(ThemeContext);
  if (!context) throw new Error('useTheme must be used within ThemeProvider');
  return context;
}
