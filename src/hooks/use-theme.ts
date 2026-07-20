import { useCallback, useEffect, useState } from 'react';

export type Theme = 'light' | 'dark';

const THEME_KEY = 'theme';

const getInitialTheme = (): Theme => {
  if (typeof window === 'undefined') return 'light';

  try {
    const stored = localStorage.getItem(THEME_KEY);
    if (stored === 'light' || stored === 'dark') return stored;
  } catch (error) {
    console.warn('Error accessing localStorage:', error);
  }

  return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
};

const applyTheme = (theme: Theme) => {
  try {
    document.documentElement.classList.toggle('dark', theme === 'dark');
    localStorage.setItem(THEME_KEY, theme);

    document.dispatchEvent(
      new CustomEvent('theme-changed', {
        detail: { theme, actualTheme: theme },
      })
    );
  } catch (error) {
    console.warn('Error applying theme:', error);
  }
};

export const useTheme = () => {
  const [theme, setTheme] = useState<Theme>(getInitialTheme);
  const [mounted, setMounted] = useState(false);

  const updateTheme = useCallback((newTheme: Theme) => {
    setTheme(newTheme);
    applyTheme(newTheme);
  }, []);

  const toggleTheme = useCallback(() => {
    updateTheme(theme === 'dark' ? 'light' : 'dark');
  }, [theme, updateTheme]);

  useEffect(() => {
    setMounted(true);
    applyTheme(theme);
  }, [theme]);

  return {
    theme,
    actualTheme: theme,
    setTheme: updateTheme,
    toggleTheme,
    mounted,
    isLight: theme === 'light',
    isDark: theme === 'dark',
  };
};
