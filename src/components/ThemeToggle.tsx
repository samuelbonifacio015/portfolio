import { Moon, Sun } from 'lucide-react';

import { useTheme } from '@/hooks/use-theme';

export default function ThemeToggle() {
  const { isDark, toggleTheme, mounted } = useTheme();

  if (!mounted) {
    return (
      <div
        className="inline-flex h-11 w-11 items-center justify-center rounded-full border border-border bg-background"
        aria-hidden="true"
      />
    );
  }

  const label = isDark ? 'Cambiar a modo claro' : 'Cambiar a modo oscuro';
  const Icon = isDark ? Sun : Moon;

  return (
    <button
      type="button"
      onClick={toggleTheme}
      aria-label={label}
      title={label}
      className="group inline-flex h-11 w-11 items-center justify-center rounded-full border border-border bg-background text-foreground transition-colors duration-200 hover:border-primary hover:bg-secondary active:scale-95 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background"
    >
      <Icon
        aria-hidden="true"
        className="h-[18px] w-[18px] transition-transform duration-200 group-hover:scale-110 group-active:scale-95"
      />
    </button>
  );
}
