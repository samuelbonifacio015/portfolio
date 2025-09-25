import { useEffect, useState } from "react";
import { Moon, Sun } from "lucide-react";

const getInitialTheme = (): "light" | "dark" => {
  if (typeof window === "undefined") return "light";
  const stored = localStorage.getItem("theme");
  if (stored === "light" || stored === "dark") return stored;
  const prefersDark = window.matchMedia && window.matchMedia("(prefers-color-scheme: dark)").matches;
  return prefersDark ? "dark" : "light";
};

const applyTheme = (theme: "light" | "dark") => {
  const root = document.documentElement;
  if (theme === "dark") root.classList.add("dark");
  else root.classList.remove("dark");
};

export default function ThemeToggle() {
  const [theme, setTheme] = useState<"light" | "dark">(getInitialTheme);

  useEffect(() => {
    applyTheme(theme);
    localStorage.setItem("theme", theme);
  }, [theme]);

  const toggleTheme = () => setTheme((t) => (t === "dark" ? "light" : "dark"));

  return (
    <button
      type="button"
      onClick={toggleTheme}
      aria-label="Cambiar tema"
      className="inline-flex h-9 w-9 items-center justify-center rounded-md border border-border bg-card text-foreground hover:bg-accent hover:text-accent-foreground transition-colors"
    >
      {theme === "dark" ? <Sun size={18} /> : <Moon size={18} />}
    </button>
  );
}


