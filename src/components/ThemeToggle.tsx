import { Moon, Sun, Monitor, Check } from "lucide-react";
import { useState, useRef, useEffect, useCallback } from "react";
import { cn } from "@/lib/utils";
import { useTheme, type Theme } from "@/hooks/use-theme";

export default function ThemeToggle() {
  const { theme, setTheme, mounted } = useTheme();
  const [isOpen, setIsOpen] = useState(false);
  const buttonRef = useRef<HTMLButtonElement>(null);
  const menuRef = useRef<HTMLDivElement>(null);

  const getThemeLabel = (t: Theme) => {
    switch (t) {
      case "light":
        return "Modo claro";
      case "dark":
        return "Modo oscuro";
      case "system":
        return "Sistema";
    }
  };

  const getCurrentIcon = () => {
    switch (theme) {
      case "light":
        return <Sun size={18} />;
      case "dark":
        return <Moon size={18} />;
      case "system":
        return <Monitor size={18} />;
    }
  };

  const handleSelectTheme = useCallback((t: Theme) => {
    setTheme(t);
    setIsOpen(false);
    buttonRef.current?.focus();
  }, [setTheme]);

  const toggleMenu = useCallback(() => {
    setIsOpen(prev => !prev);
  }, []);

  const closeMenu = useCallback(() => {
    setIsOpen(false);
  }, []);

  const handleKeyDown = useCallback((e: React.KeyboardEvent) => {
    if (e.key === "Escape") {
      closeMenu();
      buttonRef.current?.focus();
    }
  }, [closeMenu]);

  useEffect(() => {
    if (!isOpen) return;

    const handleClickOutside = (e: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(e.target as Node) && 
          buttonRef.current && !buttonRef.current.contains(e.target as Node)) {
        closeMenu();
      }
    };

    const handleTab = (e: KeyboardEvent) => {
      if (e.key === "Tab") {
        const menu = menuRef.current;
        const button = buttonRef.current;
        if (menu && button && !menu.contains(document.activeElement) && !button.contains(document.activeElement)) {
          closeMenu();
        }
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    document.addEventListener("keydown", handleTab);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
      document.removeEventListener("keydown", handleTab);
    };
  }, [isOpen, closeMenu]);

  if (!mounted) {
    return (
      <div 
        className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-border bg-background"
        aria-hidden="true"
      >
        <Monitor size={18} className="text-neutral-400" />
      </div>
    );
  }

  const themes: Theme[] = ["light", "dark", "system"];

  return (
    <div className="relative">
      <button
        ref={buttonRef}
        type="button"
        onClick={toggleMenu}
        aria-expanded={isOpen}
        aria-haspopup="menu"
        aria-label={`Cambiar tema (actual: ${getThemeLabel(theme)})`}
        title={getThemeLabel(theme)}
        className={cn(
          "group relative inline-flex h-10 w-10 items-center justify-center rounded-full",
          "border border-border bg-background",
          "text-foreground transition-colors duration-200",
          "hover:border-primary hover:bg-secondary",
          "active:scale-95",
          "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background",
          "dark:bg-neutral-900/80 dark:border-neutral-700/50 dark:text-neutral-100",
          "dark:hover:bg-neutral-900/90 dark:hover:border-neutral-600/50",
          "dark:focus-visible:ring-neutral-100/20 dark:focus-visible:ring-offset-neutral-900"
        )}
      >
        <div className="relative transition-transform duration-200 group-hover:scale-110 group-active:scale-95">
          {getCurrentIcon()}
        </div>
      </button>

      {isOpen && (
        <div
          ref={menuRef}
          role="menu"
          aria-label="Selector de tema"
          aria-orientation="vertical"
          className="absolute right-0 top-full mt-2 w-40 rounded-[var(--radius-card)] border border-border bg-background dark:border-neutral-700/50 dark:bg-neutral-900/95"
          onKeyDown={handleKeyDown}
        >
          <div className="space-y-0.5 p-1">
            {themes.map((t) => {
              const isActive = theme === t;
              return (
                <button
                  key={t}
                  type="button"
                  role="menuitem"
                  onClick={() => handleSelectTheme(t)}
                  className={cn(
                    "flex w-full items-center justify-between gap-2 rounded-lg px-3 py-2.5",
                    "text-sm font-medium transition-colors duration-150",
                    "focus:outline-none focus-visible:ring-2 focus-visible:ring-ring",
                    isActive
                      ? "bg-secondary text-foreground"
                      : "text-muted-foreground hover:bg-secondary hover:text-foreground"
                  )}
                >
                  <div className="flex items-center gap-2">
                    <span className="flex-shrink-0">
                      {t === "light" && <Sun size={15} />}
                      {t === "dark" && <Moon size={15} />}
                      {t === "system" && <Monitor size={15} />}
                    </span>
                    <span className="truncate">{getThemeLabel(t)}</span>
                  </div>
                  {isActive && <Check size={14} className="flex-shrink-0" />}
                </button>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
}
