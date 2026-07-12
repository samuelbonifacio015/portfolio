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

  const focusMenuItem = useCallback((index: number) => {
    const items = menuRef.current?.querySelectorAll<HTMLButtonElement>('[role="menuitemradio"]');
    if (!items?.length) return;
    items[(index + items.length) % items.length].focus();
  }, []);

  const handleMenuKeyDown = useCallback((e: React.KeyboardEvent<HTMLDivElement>) => {
    if (e.key === "Escape") {
      closeMenu();
      buttonRef.current?.focus();
      return;
    }

    if (e.key === "Tab") {
      closeMenu();
      return;
    }

    const items = Array.from(
      menuRef.current?.querySelectorAll<HTMLButtonElement>('[role="menuitemradio"]') ?? []
    );
    const currentIndex = items.indexOf(document.activeElement as HTMLButtonElement);

    if (e.key === "ArrowDown" || e.key === "ArrowRight") {
      e.preventDefault();
      focusMenuItem(currentIndex + 1);
    } else if (e.key === "ArrowUp" || e.key === "ArrowLeft") {
      e.preventDefault();
      focusMenuItem(currentIndex - 1);
    } else if (e.key === "Home") {
      e.preventDefault();
      focusMenuItem(0);
    } else if (e.key === "End") {
      e.preventDefault();
      focusMenuItem(items.length - 1);
    }
  }, [closeMenu, focusMenuItem]);

  const handleTriggerKeyDown = useCallback((e: React.KeyboardEvent<HTMLButtonElement>) => {
    if (e.key === "ArrowDown" || e.key === "ArrowUp") {
      e.preventDefault();
      setIsOpen(true);
    }
  }, []);

  useEffect(() => {
    if (!isOpen) return;

    const focusFrame = requestAnimationFrame(() => {
      const selectedItem = menuRef.current?.querySelector<HTMLButtonElement>('[aria-checked="true"]');
      selectedItem?.focus();
    });

    const handleClickOutside = (e: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(e.target as Node) && 
          buttonRef.current && !buttonRef.current.contains(e.target as Node)) {
        closeMenu();
      }
    };

    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      cancelAnimationFrame(focusFrame);
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isOpen, closeMenu]);

  if (!mounted) {
    return (
      <div 
        className="inline-flex h-11 w-11 items-center justify-center rounded-full border border-border bg-background"
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
        onKeyDown={handleTriggerKeyDown}
        aria-expanded={isOpen}
        aria-haspopup="menu"
        aria-controls={isOpen ? 'theme-selector' : undefined}
        aria-label={`Cambiar tema (actual: ${getThemeLabel(theme)})`}
        title={getThemeLabel(theme)}
        className={cn(
          "group relative inline-flex h-11 w-11 items-center justify-center rounded-full",
          "border border-border bg-background",
          "text-foreground transition-colors duration-200",
          "hover:border-primary hover:bg-secondary",
          "active:scale-95",
          "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background"
        )}
      >
        <div className="relative transition-transform duration-200 group-hover:scale-110 group-active:scale-95">
          {getCurrentIcon()}
        </div>
      </button>

      {isOpen && (
        <div
          id="theme-selector"
          ref={menuRef}
          role="menu"
          aria-label="Selector de tema"
          className="absolute right-0 top-full mt-2 w-40 rounded-[var(--radius-card)] border border-border bg-popover"
          onKeyDown={handleMenuKeyDown}
        >
          <div className="space-y-0.5 p-1">
            {themes.map((t) => {
              const isActive = theme === t;
              return (
                <button
                  key={t}
                  type="button"
                  role="menuitemradio"
                  aria-checked={isActive}
                  onClick={() => handleSelectTheme(t)}
                  className={cn(
                    "flex min-h-11 w-full items-center justify-between gap-2 rounded-lg px-3 py-2.5",
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
