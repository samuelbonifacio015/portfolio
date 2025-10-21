import { Moon, Sun, Monitor } from "lucide-react";
import { cn } from "@/lib/utils";
import { useTheme, type Theme } from "@/hooks/use-theme";

export default function ThemeToggle() {
  const { theme, cycleTheme, mounted } = useTheme();

  const getIcon = () => {
    if (!mounted) return <Monitor size={18} />;
    
    switch (theme) {
      case "light":
        return <Sun size={18} />;
      case "dark":
        return <Moon size={18} />;
      case "system":
        return <Monitor size={18} />;
      default:
        return <Monitor size={18} />;
    }
  };

  const getThemeLabel = () => {
    switch (theme) {
      case "light":
        return "Modo claro";
      case "dark":
        return "Modo oscuro";
      case "system":
        return "Sistema";
      default:
        return "Sistema";
    }
  };

  if (!mounted) {
    return (
      <div className="inline-flex h-10 w-10 items-center justify-center rounded-xl bg-card/50 border border-border/50 animate-pulse">
        <Monitor size={18} className="opacity-50" />
      </div>
    );
  }

  return (
    <button
      type="button"
      onClick={cycleTheme}
      aria-label={`Cambiar tema (actual: ${getThemeLabel()})`}
      title={getThemeLabel()}
      className={cn(
        "group relative inline-flex h-10 w-10 items-center justify-center rounded-xl",
        "border border-border/50 bg-card/80 backdrop-blur-sm",
        "text-foreground shadow-sm transition-all duration-300 ease-out",
        "hover:border-primary/30 hover:bg-primary/5 hover:scale-105 hover:shadow-md",
        "active:scale-95 active:shadow-sm",
        "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/50 focus-visible:ring-offset-2 focus-visible:ring-offset-background",
        "dark:hover:bg-primary/10 dark:border-border/30"
      )}
    >
      <div className="relative transition-transform duration-200 group-hover:rotate-12">
        {getIcon()}
      </div>
      
      <div className="absolute -bottom-8 left-1/2 -translate-x-1/2 opacity-0 group-hover:opacity-100 transition-opacity duration-200 pointer-events-none">
        <div className="px-2 py-1 text-xs font-medium bg-popover/95 backdrop-blur-sm border border-border rounded-md shadow-md whitespace-nowrap">
          {getThemeLabel()}
        </div>
      </div>
    </button>
  );
}


