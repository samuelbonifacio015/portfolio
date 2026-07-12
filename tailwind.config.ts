
import type { Config } from "tailwindcss";
import tailwindcssAnimate from "tailwindcss-animate";

const cssColor = (variable: string) =>
  ({ opacityValue }: { opacityValue?: string }) =>
    opacityValue === undefined
      ? `var(${variable})`
      : `color-mix(in srgb, var(${variable}) calc(${opacityValue} * 100%), transparent)`;

export default {
  darkMode: ["class"],
  content: [
    "./pages/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}",
    "./app/**/*.{ts,tsx}",
    "./src/**/*.{ts,tsx}",
  ],
  prefix: "",
  theme: {
    container: {
      center: true,
      padding: {
        DEFAULT: "1.25rem",
        md: "1.5rem",
      },
      screens: {
        sm: "880px",
        md: "880px",
        lg: "880px",
        xl: "880px",
        "2xl": "880px",
      },
    },
    extend: {
      colors: {
        border: cssColor("--border"),
        input: cssColor("--input"),
        ring: cssColor("--ring"),
        background: cssColor("--background"),
        foreground: cssColor("--foreground"),
        primary: {
          DEFAULT: cssColor("--primary"),
          foreground: cssColor("--primary-foreground"),
        },
        secondary: {
          DEFAULT: cssColor("--secondary"),
          foreground: cssColor("--secondary-foreground"),
        },
        destructive: {
          DEFAULT: cssColor("--destructive"),
          foreground: cssColor("--destructive-foreground"),
        },
        muted: {
          DEFAULT: cssColor("--muted"),
          foreground: cssColor("--muted-foreground"),
        },
        accent: {
          DEFAULT: cssColor("--accent"),
          foreground: cssColor("--accent-foreground"),
        },
        popover: {
          DEFAULT: cssColor("--popover"),
          foreground: cssColor("--popover-foreground"),
        },
        card: {
          DEFAULT: cssColor("--card"),
          foreground: cssColor("--card-foreground"),
        },
      },
      fontFamily: {
        sans: ["Inter", "General Sans", "system-ui", "sans-serif"],
        display: ["Inter", "General Sans", "system-ui", "sans-serif"],
      },
      borderRadius: {
        lg: "var(--radius)",
        md: "calc(var(--radius) - 2px)",
        sm: "calc(var(--radius) - 4px)",
      },
      keyframes: {
        "accordion-down": {
          from: { height: "0" },
          to: { height: "var(--radix-accordion-content-height)" },
        },
        "accordion-up": {
          from: { height: "var(--radix-accordion-content-height)" },
          to: { height: "0" },
        },
        float: {
          "0%, 100%": { transform: "translateY(0)" },
          "50%": { transform: "translateY(-5px)" },
        },
        "fade-in": {
          "0%": { opacity: "0", transform: "translateY(10px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
        "fade-in-right": {
          "0%": { opacity: "0", transform: "translateX(-10px)" },
          "100%": { opacity: "1", transform: "translateX(0)" },
        },
        "fade-in-left": {
          "0%": { opacity: "0", transform: "translateX(10px)" },
          "100%": { opacity: "1", transform: "translateX(0)" },
        },
        "slide-up": {
          "0%": { opacity: "0", transform: "translateY(20px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
        "slide-down": {
          "0%": { opacity: "0", transform: "translateY(-20px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
        shimmer: {
          "100%": { transform: "translateX(100%)" },
        },
      },
      animation: {
        "accordion-down": "accordion-down 0.2s ease-out",
        "accordion-up": "accordion-up 0.2s ease-out",
        float: "float 4s ease-in-out infinite",
        "fade-in": "fade-in 0.6s ease-out forwards",
        "fade-in-right": "fade-in-right 0.6s ease-out forwards",
        "fade-in-left": "fade-in-left 0.6s ease-out forwards",
        "slide-up": "slide-up 0.7s ease-out forwards",
        "slide-down": "slide-down 0.7s ease-out forwards",
        shimmer: "shimmer 1.5s infinite",
      },
      backdropBlur: {
        xs: "2px",
      },
    },
  },
  plugins: [tailwindcssAnimate],
} satisfies Config;
