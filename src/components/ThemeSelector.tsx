import { Check, ChevronDown, Moon, Sun, Monitor, type LucideIcon } from "lucide-react";
import { cn } from "@/lib/utils";
import { useTheme, type Theme } from "@/hooks/use-theme";
import { useState, useRef, useEffect } from "react";

interface ThemeOption {
  value: Theme;
  label: string;
  icon: LucideIcon;
  description: string;
}

const themeOptions: ThemeOption[] = [
  {
    value: "light",
    label: "Claro",
    icon: Sun,
    description: "Tema claro siempre activo"
  },
  {
    value: "dark",
    label: "Oscuro",
    icon: Moon,
    description: "Tema oscuro siempre activo"
  },
  {
    value: "system",
    label: "Sistema",
    icon: Monitor,
    description: "Sigue la preferencia del sistema"
  }
];

export default function ThemeSelector() {
  const { theme, setTheme, mounted } = useTheme();
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const currentTheme = themeOptions.find(option => option.value === theme);

  if (!mounted) {
    return (
      <div className="inline-flex h-10 w-32 items-center justify-center rounded-xl bg-card/50 border border-border/50 animate-pulse">
        <Monitor size={16} className="opacity-50" />
      </div>
    );
  }

  return (
    <div className="relative" ref={dropdownRef}>
      <button
        type="button"
        onClick={() => setIsOpen(!isOpen)}
        aria-label="Seleccionar tema"
        aria-expanded={isOpen ? "true" : "false"}
        className={cn(
          "group inline-flex h-10 min-w-[120px] items-center justify-between gap-2 rounded-xl px-3",
          "border border-border/50 bg-card/80 backdrop-blur-sm text-sm font-medium",
          "text-foreground shadow-sm transition-all duration-300 ease-out",
          "hover:border-primary/30 hover:bg-primary/5 hover:shadow-md",
          "active:scale-95 active:shadow-sm",
          "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/50 focus-visible:ring-offset-2 focus-visible:ring-offset-background",
          "dark:hover:bg-primary/10 dark:border-border/30",
          isOpen && "border-primary/50 bg-primary/5 shadow-md dark:bg-primary/10"
        )}
      >
        <div className="flex items-center gap-2">
          {currentTheme && (
            <currentTheme.icon size={16} className="transition-transform duration-200" />
          )}
          <span>{currentTheme?.label}</span>
        </div>
        <ChevronDown 
          size={14} 
          className={cn(
            "transition-transform duration-200 opacity-60",
            isOpen && "rotate-180"
          )} 
        />
      </button>

      {isOpen && (
        <div className={cn(
          "absolute top-full left-0 right-0 mt-2 z-50",
          "bg-popover/95 backdrop-blur-md border border-border rounded-xl shadow-lg",
          "overflow-hidden animate-in slide-in-from-top-2 duration-200"
        )}>
          {themeOptions.map((option) => {
            const Icon = option.icon;
            const isSelected = theme === option.value;
            
            return (
              <button
                key={option.value}
                type="button"
                onClick={() => {
                  setTheme(option.value);
                  setIsOpen(false);
                }}
                className={cn(
                  "flex w-full items-center gap-3 px-3 py-2.5 text-left text-sm",
                  "text-foreground hover:bg-accent/50 transition-colors duration-150",
                  "first:rounded-t-xl last:rounded-b-xl",
                  isSelected && "bg-primary/10 text-primary"
                )}
              >
                <Icon size={16} className="flex-shrink-0" />
                <div className="flex-1">
                  <div className="font-medium">{option.label}</div>
                  <div className="text-xs text-muted-foreground">{option.description}</div>
                </div>
                {isSelected && (
                  <Check size={14} className="flex-shrink-0 text-primary" />
                )}
              </button>
            );
          })}
        </div>
      )}
    </div>
  );
}