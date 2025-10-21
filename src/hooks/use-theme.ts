import { useEffect, useState, useCallback } from "react";

export type Theme = "light" | "dark" | "system";

const THEME_KEY = "theme";

const getInitialTheme = (): Theme => {
  if (typeof window === "undefined") return "system";
  
  try {
    const stored = localStorage.getItem(THEME_KEY) as Theme;
    if (stored && ["light", "dark", "system"].includes(stored)) {
      return stored;
    }
  } catch (error) {
    console.warn("Error accessing localStorage:", error);
  }
  
  return "system";
};

const getSystemTheme = (): "light" | "dark" => {
  if (typeof window === "undefined") return "light";
  return window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light";
};

const applyTheme = (theme: Theme) => {
  try {
    const root = document.documentElement;
    const actualTheme = theme === "system" ? getSystemTheme() : theme;
    
    root.classList.toggle("dark", actualTheme === "dark");
    localStorage.setItem(THEME_KEY, theme);
    
    document.dispatchEvent(new CustomEvent("theme-changed", { 
      detail: { theme, actualTheme } 
    }));
  } catch (error) {
    console.warn("Error applying theme:", error);
  }
};

export const useTheme = () => {
  const [theme, setTheme] = useState<Theme>(getInitialTheme);
  const [mounted, setMounted] = useState(false);

  const handleSystemThemeChange = useCallback((e: MediaQueryListEvent) => {
    if (theme === "system") {
      applyTheme("system");
    }
  }, [theme]);

  const updateTheme = useCallback((newTheme: Theme) => {
    setTheme(newTheme);
    applyTheme(newTheme);
  }, []);

  const cycleTheme = useCallback(() => {
    const themeOrder: Theme[] = ["light", "dark", "system"];
    const currentIndex = themeOrder.indexOf(theme);
    const nextTheme = themeOrder[(currentIndex + 1) % themeOrder.length];
    updateTheme(nextTheme);
  }, [theme, updateTheme]);

  const getActualTheme = useCallback((): "light" | "dark" => {
    return theme === "system" ? getSystemTheme() : theme;
  }, [theme]);

  useEffect(() => {
    setMounted(true);
    applyTheme(theme);

    const mediaQuery = window.matchMedia("(prefers-color-scheme: dark)");
    mediaQuery.addEventListener("change", handleSystemThemeChange);

    return () => {
      mediaQuery.removeEventListener("change", handleSystemThemeChange);
    };
  }, [theme, handleSystemThemeChange]);

  return {
    theme,
    actualTheme: getActualTheme(),
    setTheme: updateTheme,
    cycleTheme,
    mounted,
    isLight: getActualTheme() === "light",
    isDark: getActualTheme() === "dark",
    isSystem: theme === "system"
  };
};