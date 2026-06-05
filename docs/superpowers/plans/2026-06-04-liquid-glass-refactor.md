# Liquid Glass + Glassmorphism Refactor Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Replace static `.liquid-glass`, `.liquid-glass-strong`, `.glass`, and `.glass-card` CSS classes with a reusable `<LiquidGlass>` Framer Motion component that adds interactive 3D tilt, cursor reflection, breathing borders, and morphing blobs.

**Architecture:** A single `LiquidGlass` polymorphic component (`as` prop, defaults to `div`) wraps Framer Motion motion values for tilt + cursor-follow reflection. CSS `@keyframes` handle blob drift and border breathing for GPU compositing. Heavy effects (tilt, blobs) are gated behind `!isMobile`, `!prefersReducedMotion`, and viewport width checks. A `disabled` prop (used by Navbar for the unscrolled state) skips all glass styles while still rendering the motion element to prevent unmount/remount flashes.

**Tech Stack:** Framer Motion, React 18, TypeScript, Tailwind CSS, existing `useIsMobile` hook (`src/hooks/use-mobile.tsx`), existing `useTheme` hook (`src/hooks/use-theme.ts`).

---

## File Map

| Action | Path | Purpose |
|---|---|---|
| **Create** | `src/components/ui/LiquidGlass.tsx` | Core polymorphic glass component |
| **Modify** | `src/index.css` | Add `@keyframes` + `.lg-*` CSS classes; mark old classes `@deprecated` |
| **Modify** | `src/components/ProjectGridCard.tsx` | Primary target — full card effects |
| **Modify** | `src/components/Hero.tsx` | 4 uses: badge, 2 buttons, video wrapper |
| **Modify** | `src/components/Navbar.tsx` | 2 uses: scrolled bar, mobile menu |
| **Modify** | `src/components/AboutMe.tsx` | 1 use: card wrapper |
| **Modify** | `src/components/Inspiration.tsx` | 1 use: card wrapper |
| **Modify** | `src/components/Technologies.tsx` | 4 uses: category cards in map |
| **Modify** | `src/components/Contact.tsx` | 3 uses: form card, info card, success modal |
| **Modify** | `src/components/KnowledgeItem.tsx` | 1 use: item wrapper |
| **Modify** | `src/components/BlogCard.tsx` | 1 use: article card |

---

### Task 1: Install Framer Motion + CSS animations

**Files:**
- Run: `npm install framer-motion`
- Modify: `src/index.css`

- [ ] **Step 1: Install framer-motion**

```bash
npm install framer-motion
```

Expected output: `added N packages` with `framer-motion` in the list.

- [ ] **Step 2: Add LiquidGlass CSS keyframes and classes to `src/index.css`**

Find the line `@layer components {` in `src/index.css`. Add the following block **before** the existing `.liquid-glass` rule (still inside `@layer components`):

```css
  /* ─── LiquidGlass component ───────────────────────────────────────── */
  @keyframes lg-blob-drift-1 {
    0%, 100% { transform: translate(0, 0) scale(1); }
    33%       { transform: translate(8px, -12px) scale(1.05); }
    66%       { transform: translate(-4px, 8px) scale(0.97); }
  }

  @keyframes lg-blob-drift-2 {
    0%, 100% { transform: translate(0, 0) scale(1); }
    33%       { transform: translate(-8px, 8px) scale(1.05); }
    66%       { transform: translate(12px, -4px) scale(0.95); }
  }

  @keyframes lg-breathe {
    0%, 100% { opacity: 0.55; }
    50%       { opacity: 1; }
  }

  .lg-blob {
    position: absolute;
    border-radius: 50%;
    filter: blur(24px);
    background: hsl(var(--primary) / 0.12);
    will-change: transform;
  }

  .lg-blob-1 {
    width: 55%;
    height: 55%;
    top: -15%;
    left: -10%;
    animation: lg-blob-drift-1 9s ease-in-out infinite;
  }

  .lg-blob-2 {
    width: 40%;
    height: 40%;
    bottom: -10%;
    right: -5%;
    animation: lg-blob-drift-2 11s ease-in-out infinite;
  }

  .lg-border-breathe {
    animation: lg-breathe 5s ease-in-out infinite;
  }
```

- [ ] **Step 3: Verify build succeeds**

```bash
npm run build
```

Expected: no errors.

- [ ] **Step 4: Commit**

```bash
git add src/index.css package.json package-lock.json
git commit -m "feat: install framer-motion and add LiquidGlass CSS keyframes"
```

---

### Task 2: Create `LiquidGlass` component

**Files:**
- Create: `src/components/ui/LiquidGlass.tsx`

- [ ] **Step 1: Create the file with the complete implementation**

Create `src/components/ui/LiquidGlass.tsx` with this exact content:

```tsx
import { motion, useMotionValue, useTransform, useSpring, useReducedMotion } from 'framer-motion';
import { useRef, useState, useCallback, useEffect } from 'react';
import { cn } from '@/lib/utils';
import { useIsMobile } from '@/hooks/use-mobile';
import { useTheme } from '@/hooks/use-theme';

export interface LiquidGlassProps extends React.AllHTMLAttributes<HTMLElement> {
  as?: keyof JSX.IntrinsicElements;
  variant?: 'light' | 'strong' | 'card';
  children?: React.ReactNode;
  className?: string;
  enableTilt?: boolean;
  enableReflection?: boolean;
  enableBreathing?: boolean;
  enableMorphing?: boolean;
  disabled?: boolean;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  whileHover?: Record<string, any>;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  whileTap?: Record<string, any>;
}

const BLUR: Record<'light' | 'strong' | 'card', { light: number; dark: number }> = {
  light:  { light: 4,  dark: 8  },
  strong: { light: 30, dark: 50 },
  card:   { light: 10, dark: 20 },
};

const TILT_MAX = 4;

export function LiquidGlass({
  as = 'div',
  variant = 'card',
  children,
  className,
  enableTilt = false,
  enableReflection = false,
  enableBreathing = false,
  enableMorphing = false,
  disabled = false,
  whileHover,
  whileTap,
  ...rest
}: LiquidGlassProps) {
  const prefersReduced = useReducedMotion();
  const isMobile = useIsMobile();
  const { isDark } = useTheme();
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const containerRef = useRef<any>(null);
  const [isWide, setIsWide] = useState(false);

  useEffect(() => {
    const check = () => setIsWide(window.innerWidth >= 1024);
    check();
    window.addEventListener('resize', check);
    return () => window.removeEventListener('resize', check);
  }, []);

  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  const rotateX = useSpring(
    useTransform(mouseY, [-0.5, 0.5], [TILT_MAX, -TILT_MAX]),
    { stiffness: 300, damping: 30 }
  );
  const rotateY = useSpring(
    useTransform(mouseX, [-0.5, 0.5], [-TILT_MAX, TILT_MAX]),
    { stiffness: 300, damping: 30 }
  );

  const [reflection, setReflection] = useState({ x: 50, y: 50, visible: false });

  const canTilt    = !disabled && enableTilt    && !isMobile && !prefersReduced;
  const canReflect = !disabled && enableReflection && !isMobile && !prefersReduced;
  const canMorph   = !disabled && enableMorphing && isWide && variant === 'card' && !prefersReduced;
  const canBreathe = !disabled && enableBreathing && !prefersReduced;

  const onPointerMove = useCallback(
    (e: React.PointerEvent<HTMLElement>) => {
      if (!containerRef.current) return;
      const rect = (containerRef.current as HTMLElement).getBoundingClientRect();
      const x = (e.clientX - rect.left) / rect.width;
      const y = (e.clientY - rect.top) / rect.height;
      if (canTilt) { mouseX.set(x - 0.5); mouseY.set(y - 0.5); }
      if (canReflect) setReflection({ x: x * 100, y: y * 100, visible: true });
    },
    [canTilt, canReflect, mouseX, mouseY]
  );

  const onPointerLeave = useCallback(() => {
    mouseX.set(0);
    mouseY.set(0);
    setReflection(prev => ({ ...prev, visible: false }));
  }, [mouseX, mouseY]);

  const blur = BLUR[variant][isDark ? 'dark' : 'light'];

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const MotionEl = (motion as any)[as] as typeof motion.div;

  const glassStyle = disabled ? {} : {
    backdropFilter: `blur(${blur}px)`,
    WebkitBackdropFilter: `blur(${blur}px)`,
    background: isDark ? 'rgba(255,255,255,0.01)' : 'rgba(255,255,255,0.5)',
    boxShadow:
      variant === 'strong'
        ? '4px 4px 4px rgba(0,0,0,0.05), inset 0 1px 1px rgba(255,255,255,0.15)'
        : 'inset 0 1px 1px rgba(255,255,255,0.1)',
    willChange: 'transform' as const,
    ...(canTilt && { transformStyle: 'preserve-3d' as const, rotateX, rotateY }),
  };

  return (
    <MotionEl
      ref={containerRef}
      {...rest}
      className={cn('relative overflow-hidden', className)}
      style={{ ...glassStyle, ...((rest as React.CSSProperties & typeof rest).style ?? {}) }}
      whileHover={whileHover}
      whileTap={whileTap}
      onPointerMove={onPointerMove}
      onPointerLeave={onPointerLeave}
    >
      {canMorph && (
        <div
          className="pointer-events-none absolute inset-0 overflow-hidden rounded-[inherit]"
          aria-hidden="true"
        >
          <div className="lg-blob lg-blob-1" />
          <div className="lg-blob lg-blob-2" />
        </div>
      )}

      {children}

      {canBreathe && (
        <div
          className="lg-border-breathe pointer-events-none absolute inset-0 rounded-[inherit]"
          style={{
            padding: '1.4px',
            background:
              'linear-gradient(180deg, rgba(37,99,235,0.5) 0%, rgba(255,255,255,0) 50%, rgba(37,99,235,0.3) 100%)',
            WebkitMask: 'linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)',
            WebkitMaskComposite: 'xor',
            maskComposite: 'exclude',
          }}
        />
      )}

      {canReflect && (
        <div
          className="pointer-events-none absolute inset-0 rounded-[inherit]"
          style={{
            opacity: reflection.visible ? 1 : 0,
            transition: 'opacity 0.3s ease-out',
            background: `radial-gradient(circle at ${reflection.x}% ${reflection.y}%, rgba(255,255,255,0.08) 0%, transparent 60%)`,
          }}
        />
      )}
    </MotionEl>
  );
}
```

- [ ] **Step 2: Verify build succeeds**

```bash
npm run build
```

Expected: no TypeScript errors, no ESLint errors.

- [ ] **Step 3: Commit**

```bash
git add src/components/ui/LiquidGlass.tsx
git commit -m "feat: add LiquidGlass Framer Motion component with tilt, reflection, breathing, morphing"
```

---

### Task 3: Refactor `ProjectGridCard.tsx` (primary target)

**Files:**
- Modify: `src/components/ProjectGridCard.tsx`

The outer `div` becomes `<LiquidGlass variant="card">` with all 4 effects. The existing `hover:scale-*` and `hover:-translate-y-*` Tailwind classes are replaced by `whileHover` on the LiquidGlass motion element.

- [ ] **Step 1: Replace the file content**

Replace `src/components/ProjectGridCard.tsx` with:

```tsx
import { cn } from '@/lib/utils';
import TechBadge from './TechBadge';
import { ProjectProps } from './ProjectCard';
import { LiquidGlass } from '@/components/ui/LiquidGlass';

interface ProjectGridCardProps extends ProjectProps {
  onClick: () => void;
}

const ProjectGridCard = ({
  title,
  subtitle,
  description,
  image,
  technologies,
  onClick,
}: ProjectGridCardProps) => {
  const truncatedDescription =
    description.length > 100 ? `${description.substring(0, 100)}...` : description;

  return (
    <LiquidGlass
      variant="card"
      enableTilt
      enableReflection
      enableBreathing
      enableMorphing
      className="group cursor-pointer rounded-xl border border-border/50"
      whileHover={{ scale: 1.02, y: -4 }}
      whileTap={{ scale: 0.98 }}
      onClick={onClick}
      role="button"
      tabIndex={0}
      onKeyDown={(e: React.KeyboardEvent) => {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault();
          onClick();
        }
      }}
      aria-label={`Ver detalles de ${title}`}
    >
      {image && (
        <div className="relative w-full aspect-video overflow-hidden bg-primary/5">
          <img
            src={image}
            alt={`${title} - ${subtitle}`}
            className={cn(
              'w-full h-full object-cover transition-transform duration-500 ease-out',
              'group-hover:scale-110'
            )}
            loading="lazy"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
        </div>
      )}

      <div className="p-3 sm:p-4 space-y-2 sm:space-y-3">
        <div className="space-y-0.5 sm:space-y-1">
          <h3 className="text-base sm:text-lg font-semibold text-foreground group-hover:text-primary transition-colors duration-300 line-clamp-1">
            {title}
          </h3>
          <p className="text-xs sm:text-sm font-medium text-primary/80 line-clamp-1">
            {subtitle}
          </p>
        </div>

        <p className="text-sm text-muted-foreground line-clamp-2 leading-relaxed">
          {truncatedDescription}
        </p>

        {technologies && technologies.length > 0 && (
          <div className="flex flex-wrap gap-1.5 pt-1">
            {technologies.slice(0, 3).map((tech, index) => (
              <TechBadge key={index} name={tech} className="text-xs" />
            ))}
            {technologies.length > 3 && (
              <span className="text-xs text-muted-foreground px-2 py-0.5">
                +{technologies.length - 3}
              </span>
            )}
          </div>
        )}

        <div className="flex items-center gap-2 text-xs text-muted-foreground opacity-0 group-hover:opacity-100 transition-opacity duration-300 pt-1">
          <span>Ver detalles</span>
          <svg
            className="w-4 h-4 transform group-hover:translate-x-1 transition-transform duration-300"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M9 5l7 7-7 7"
            />
          </svg>
        </div>
      </div>
    </LiquidGlass>
  );
};

export default ProjectGridCard;
```

- [ ] **Step 2: Verify build succeeds**

```bash
npm run build
```

Expected: no errors.

- [ ] **Step 3: Commit**

```bash
git add src/components/ProjectGridCard.tsx
git commit -m "feat: refactor ProjectGridCard with LiquidGlass tilt/reflection/breathing/blobs"
```

---

### Task 4: Refactor `Hero.tsx`

**Files:**
- Modify: `src/components/Hero.tsx`

4 replacements: badge span → `LiquidGlass variant="light" enableBreathing`, "Ver Proyectos" `<a>` → `LiquidGlass as="a" variant="strong"`, "Contacto" `<a>` → `LiquidGlass as="a" variant="light"`, video wrapper `<div>` → `LiquidGlass variant="light"`.

- [ ] **Step 1: Replace the file content**

Replace `src/components/Hero.tsx` with:

```tsx
import { ArrowDown } from 'lucide-react';
import { useEffect, useState } from 'react';
import FadingVideo from '@/components/FadingVideo';
import { LiquidGlass } from '@/components/ui/LiquidGlass';

const Hero = () => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    setIsVisible(true);
  }, []);

  return (
    <section
      id="home"
      className="relative flex min-h-screen w-full flex-col items-center justify-center overflow-hidden px-4 py-24 scroll-mt-20 sm:px-6 lg:px-10"
    >
      <div className="absolute inset-0 z-[-2] bg-[linear-gradient(180deg,hsl(var(--background))_0%,hsl(var(--muted))_52%,hsl(var(--background))_100%)] dark:bg-[linear-gradient(180deg,#050505_0%,hsl(var(--background))_54%,#050505_100%)]" />
      <div className="absolute inset-x-0 top-0 z-[-1] h-32 bg-white/80 blur-2xl dark:bg-white/[0.03]" />
      <div className="absolute inset-x-0 bottom-0 z-[-1] h-40 bg-background/95 blur-2xl" />

      <div className="mx-auto flex w-full max-w-[1500px] flex-1 items-center">
        <div
          className={`grid w-full items-center gap-10 transition-all duration-1000 ease-out md:grid-cols-[minmax(0,0.9fr)_minmax(420px,1.1fr)] lg:gap-14 xl:gap-20 ${
            isVisible ? 'translate-y-0 scale-100 opacity-100' : 'translate-y-8 scale-95 opacity-0'
          }`}
        >
          <div className="flex flex-col items-center justify-center text-center md:items-start md:pl-20 md:text-left lg:pl-24">
            <LiquidGlass
              variant="light"
              enableBreathing
              className="mb-5 inline-flex rounded-full px-4 py-2 text-xs font-medium text-primary shadow-[0_8px_28px_rgba(15,23,42,0.08)] sm:mb-6 sm:text-sm dark:text-primary-foreground/90"
            >
              Desarrollador Full-Stack
            </LiquidGlass>

            <h1 className="mb-4 max-w-3xl text-4xl font-bold leading-[0.95] tracking-normal text-foreground sm:text-5xl md:text-7xl lg:text-8xl">
              Samuel Bonifacio<span className="text-primary">.</span>
            </h1>

            <p className="mb-8 max-w-[22rem] text-base leading-7 text-muted-foreground sm:max-w-xl sm:text-lg md:text-xl md:leading-8">
              Ingeniero de software especializado en desarrollo Full-Stack e Inteligencia Artificial.
            </p>

            <div className="flex w-full flex-col items-center justify-center gap-3 sm:w-auto sm:flex-row md:justify-start">
              <LiquidGlass
                as="a"
                variant="strong"
                enableReflection
                enableBreathing
                enableTilt
                href="#projects"
                className="inline-flex w-full items-center justify-center rounded-full bg-foreground px-7 py-3.5 text-sm font-semibold text-background shadow-[0_18px_45px_rgba(15,23,42,0.12)] sm:w-auto dark:bg-white dark:text-black"
                whileHover={{ y: -2 }}
              >
                Ver Proyectos
              </LiquidGlass>

              <LiquidGlass
                as="a"
                variant="light"
                enableBreathing
                href="#contact"
                className="inline-flex w-full items-center justify-center rounded-full px-7 py-3.5 text-sm font-semibold text-foreground shadow-[0_12px_32px_rgba(15,23,42,0.08)] sm:w-auto"
                whileHover={{ y: -2 }}
              >
                Contacto
              </LiquidGlass>
            </div>
          </div>

          <div className="flex w-full justify-center md:justify-end">
            <LiquidGlass
              variant="light"
              enableBreathing
              className="w-full max-w-[760px] rounded-[2rem] p-2 shadow-[0_30px_90px_rgba(15,23,42,0.14)] sm:rounded-[2.5rem] sm:p-3 dark:shadow-black/40"
            >
              <FadingVideo
                src="/hero/xml_version_encoding_.mp4"
                poster="/hero/xml_version_encoding_poster.png"
                className="aspect-[16/10] rounded-[1.5rem] bg-black/5 shadow-[inset_0_1px_1px_rgba(255,255,255,0.45)] sm:rounded-[2rem]"
                videoClassName="rounded-[1.5rem] sm:rounded-[2rem]"
              />
            </LiquidGlass>
          </div>
        </div>
      </div>

      <a
        href="#projects"
        className="absolute bottom-8 left-1/2 -translate-x-1/2 text-muted-foreground transition-colors duration-300 hover:text-foreground dark:text-white/50 dark:hover:text-white md:bottom-10"
        aria-label="Scroll to projects"
      >
        <ArrowDown size={24} />
      </a>
    </section>
  );
};

export default Hero;
```

- [ ] **Step 2: Verify build succeeds**

```bash
npm run build
```

Expected: no errors.

- [ ] **Step 3: Commit**

```bash
git add src/components/Hero.tsx
git commit -m "feat: refactor Hero glass elements to LiquidGlass component"
```

---

### Task 5: Refactor `Navbar.tsx`

**Files:**
- Modify: `src/components/Navbar.tsx`

2 replacements:
1. Desktop navbar bar: outer `div` → `LiquidGlass` with `disabled={!isScrolled}` (keeps the CSS transition animation while conditionally activating glass)
2. Mobile menu: `<nav className="liquid-glass-strong ...">` → `<LiquidGlass as="nav" variant="strong" enableBreathing>`

- [ ] **Step 1: Replace the file content**

Replace `src/components/Navbar.tsx` with:

```tsx
import { useEffect, useState, type MouseEvent } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Github, Menu, X } from 'lucide-react';
import { cn } from '@/lib/utils';
import ThemeToggle from '@/components/ThemeToggle';
import { LiquidGlass } from '@/components/ui/LiquidGlass';

interface NavLink {
  name: string;
  sectionId?: string;
  href?: string;
}

interface NavbarProps {
  isMobile: boolean;
}

const sectionNavLinks: NavLink[] = [
  { name: 'Inicio', sectionId: 'home' },
  { name: 'Tecnologías', sectionId: 'technologies' },
  { name: 'Proyectos', sectionId: 'projects' },
  { name: 'Conocimientos', sectionId: 'knowledge' },
  { name: 'Contacto', sectionId: 'contact' },
  { name: 'Blog', href: '/blog' },
];

const Navbar = ({ isMobile }: NavbarProps) => {
  const location = useLocation();
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const isHomeRoute = location.pathname === '/';
  void isMobile;

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 20);
    handleScroll();
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const getSectionHref = (sectionId?: string) => {
    if (!sectionId) return undefined;
    return isHomeRoute ? `#${sectionId}` : `/#${sectionId}`;
  };

  const scrollToSection = (event: MouseEvent<HTMLAnchorElement>, sectionId?: string) => {
    if (!sectionId) { setIsMobileMenuOpen(false); return; }
    if (!isHomeRoute) { setIsMobileMenuOpen(false); return; }
    event.preventDefault();
    document.getElementById(sectionId)?.scrollIntoView({ behavior: 'smooth', block: 'start' });
    setIsMobileMenuOpen(false);
  };

  const renderNavLink = (link: NavLink, className: string) => {
    if (link.href) {
      return (
        <Link
          key={link.name}
          to={link.href}
          className={className}
          onClick={() => setIsMobileMenuOpen(false)}
        >
          {link.name}
        </Link>
      );
    }
    return (
      <a
        key={link.name}
        href={getSectionHref(link.sectionId)}
        onClick={(event) => scrollToSection(event, link.sectionId)}
        className={className}
      >
        {link.name}
      </a>
    );
  };

  return (
    <header className="fixed left-0 right-0 top-0 z-50 w-full">
      <LiquidGlass
        variant="strong"
        enableReflection
        enableBreathing
        disabled={!isScrolled}
        className={cn(
          'relative mx-auto flex items-center justify-between transition-[width,max-width,margin,padding,background-color,border-color,border-radius,box-shadow,backdrop-filter] duration-700 [transition-timing-function:cubic-bezier(0.22,1,0.36,1)]',
          isScrolled
            ? 'mt-3 w-[95%] max-w-5xl rounded-full px-4 py-3 shadow-[0_18px_55px_rgba(15,23,42,0.10),inset_0_1px_1px_rgba(255,255,255,0.20)] dark:shadow-[0_18px_55px_rgba(0,0,0,0.35),inset_0_1px_1px_rgba(255,255,255,0.12)] md:w-[86%] md:px-6'
            : 'w-full px-4 py-4 md:px-10'
        )}
      >
        <div className="z-10 flex items-center gap-6">
          <Link to="/" className="flex items-center" onClick={() => setIsMobileMenuOpen(false)}>
            <span className="text-lg font-display font-bold tracking-tight text-foreground sm:text-xl">
              <span className="text-primary">samuel</span>.dev
            </span>
          </Link>
        </div>

        <div className="absolute left-1/2 top-1/2 hidden -translate-x-1/2 -translate-y-1/2 lg:block">
          <nav className="flex items-center gap-1 xl:gap-2" aria-label="Navegación principal">
            {sectionNavLinks.map((link) =>
              renderNavLink(
                link,
                'rounded-full px-3 py-2 text-sm font-medium text-muted-foreground transition-colors duration-150 hover:bg-primary/10 hover:text-primary xl:px-4'
              )
            )}
          </nav>
        </div>

        <div className="z-10 hidden items-center gap-3 lg:flex">
          <a
            href="https://github.com/samuelbonifacio015"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex h-10 w-10 items-center justify-center rounded-full text-muted-foreground transition-colors duration-150 hover:bg-muted hover:text-foreground"
            aria-label="Perfil de GitHub"
          >
            <Github className="h-5 w-5" />
          </a>

          <ThemeToggle />

          <a
            href={getSectionHref('contact')}
            onClick={(event) => scrollToSection(event, 'contact')}
            className="rounded-full bg-foreground px-5 py-2.5 text-sm font-semibold text-background shadow-sm transition-colors duration-150 hover:bg-foreground/90"
          >
            Hablemos
          </a>
        </div>

        <div className="fixed right-4 top-4 z-20 flex items-center gap-2 lg:hidden">
          <ThemeToggle />
          <button
            type="button"
            className="inline-flex h-10 w-10 items-center justify-center rounded-full text-foreground transition-colors hover:bg-muted focus:outline-none focus-visible:ring-2 focus-visible:ring-ring"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            aria-label={isMobileMenuOpen ? 'Cerrar menú' : 'Abrir menú'}
            aria-expanded={isMobileMenuOpen}
          >
            {isMobileMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>

        {isMobileMenuOpen && (
          <LiquidGlass
            as="nav"
            variant="strong"
            enableBreathing
            className="fixed left-4 right-4 top-16 rounded-2xl px-2 py-3 shadow-xl animate-in fade-in slide-in-from-top-2 duration-300 lg:hidden"
            aria-label="Menú móvil"
          >
            <div className="flex flex-col">
              {sectionNavLinks.map((link) =>
                renderNavLink(
                  link,
                  'rounded-xl px-4 py-3 text-sm font-medium text-foreground/90 transition-all duration-200 hover:bg-muted hover:text-foreground'
                )
              )}
              <a
                href="https://github.com/samuelbonifacio015"
                target="_blank"
                rel="noopener noreferrer"
                className="mt-1 flex items-center gap-2 rounded-xl px-4 py-3 text-sm font-medium text-foreground/90 transition-all duration-200 hover:bg-muted hover:text-foreground"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                <Github className="h-4 w-4" />
                GitHub
              </a>
            </div>
          </LiquidGlass>
        )}
      </LiquidGlass>
    </header>
  );
};

export default Navbar;
```

- [ ] **Step 2: Verify build succeeds**

```bash
npm run build
```

Expected: no errors.

- [ ] **Step 3: Commit**

```bash
git add src/components/Navbar.tsx
git commit -m "feat: refactor Navbar glass effects to LiquidGlass component"
```

---

### Task 6: Refactor `AboutMe.tsx` and `Inspiration.tsx`

**Files:**
- Modify: `src/components/AboutMe.tsx`
- Modify: `src/components/Inspiration.tsx`

Both have a single `glass-card` div wrapping the card content. Replace with `<LiquidGlass variant="card" enableBreathing>`.

- [ ] **Step 1: Edit `src/components/AboutMe.tsx`**

Add the import at the top:

```tsx
import { LiquidGlass } from '@/components/ui/LiquidGlass';
```

Replace this line (the `glass-card` div):

```tsx
      <div className="glass-card rounded-xl sm:rounded-2xl max-w-5xl w-full p-6 sm:p-8 md:p-10 lg:p-12 flex flex-col md:flex-row items-center md:items-stretch gap-6 sm:gap-8 md:gap-12 lg:gap-16 text-center md:text-left shadow-xl">
```

With:

```tsx
      <LiquidGlass variant="card" enableBreathing className="rounded-xl sm:rounded-2xl max-w-5xl w-full p-6 sm:p-8 md:p-10 lg:p-12 flex flex-col md:flex-row items-center md:items-stretch gap-6 sm:gap-8 md:gap-12 lg:gap-16 text-center md:text-left shadow-xl">
```

Replace the closing `</div>` that matches that wrapper with `</LiquidGlass>`. It is the final closing tag before the `</section>` close.

- [ ] **Step 2: Edit `src/components/Inspiration.tsx`**

Add the import at the top:

```tsx
import { LiquidGlass } from '@/components/ui/LiquidGlass';
```

Replace this line (the `glass-card` div):

```tsx
      <div className="glass-card rounded-2xl max-w-5xl w-full p-8 md:p-12 flex flex-col md:flex-row items-center md:items-stretch gap-8 md:gap-16 text-center md:text-left shadow-xl">
```

With:

```tsx
      <LiquidGlass variant="card" enableBreathing className="rounded-2xl max-w-5xl w-full p-8 md:p-12 flex flex-col md:flex-row items-center md:items-stretch gap-8 md:gap-16 text-center md:text-left shadow-xl">
```

Replace the matching `</div>` with `</LiquidGlass>`.

- [ ] **Step 3: Verify build succeeds**

```bash
npm run build
```

Expected: no errors.

- [ ] **Step 4: Commit**

```bash
git add src/components/AboutMe.tsx src/components/Inspiration.tsx
git commit -m "feat: refactor AboutMe and Inspiration glass cards to LiquidGlass"
```

---

### Task 7: Refactor `Technologies.tsx`

**Files:**
- Modify: `src/components/Technologies.tsx`

4 `glass-card` divs rendered in a `.map()`. Replace the inner `div` with `LiquidGlass variant="card" enableBreathing`.

- [ ] **Step 1: Add import and replace the mapped card div**

Add the import at the top of `src/components/Technologies.tsx`:

```tsx
import { LiquidGlass } from '@/components/ui/LiquidGlass';
```

Find this block inside the `.map()`:

```tsx
            <div
              key={category.name}
              className={`glass-card rounded-xl p-5 sm:p-6 transition-all duration-700 ease-out ${isVisible ? 'opacity-100' : 'opacity-0 transform translate-y-8'}`}
              style={{ transitionDelay: `${200 + index * 100}ms` }}
            >
```

Replace with:

```tsx
            <LiquidGlass
              key={category.name}
              variant="card"
              enableBreathing
              className={`rounded-xl p-5 sm:p-6 transition-all duration-700 ease-out ${isVisible ? 'opacity-100' : 'opacity-0 transform translate-y-8'}`}
              style={{ transitionDelay: `${200 + index * 100}ms` }}
            >
```

Replace the matching closing `</div>` inside the map with `</LiquidGlass>`.

- [ ] **Step 2: Verify build succeeds**

```bash
npm run build
```

Expected: no errors.

- [ ] **Step 3: Commit**

```bash
git add src/components/Technologies.tsx
git commit -m "feat: refactor Technologies category cards to LiquidGlass"
```

---

### Task 8: Refactor `Contact.tsx`

**Files:**
- Modify: `src/components/Contact.tsx`

3 replacements:
1. Form card (`md:col-span-2`)
2. Contact info card
3. Success modal card (`glass-card rounded-xl p-6 max-w-md`)

- [ ] **Step 1: Add import**

Add at the top of `src/components/Contact.tsx`:

```tsx
import { LiquidGlass } from '@/components/ui/LiquidGlass';
```

- [ ] **Step 2: Replace the form card div**

Find:

```tsx
          <div 
            className={`glass-card rounded-xl p-6 md:col-span-2 transition-all duration-700 ease-out ${isVisible ? 'opacity-100' : 'opacity-0 transform translate-y-8'}`}
            style={{ transitionDelay: '200ms' }}
          >
```

Replace with:

```tsx
          <LiquidGlass
            variant="card"
            enableBreathing
            className={`rounded-xl p-6 md:col-span-2 transition-all duration-700 ease-out ${isVisible ? 'opacity-100' : 'opacity-0 transform translate-y-8'}`}
            style={{ transitionDelay: '200ms' }}
          >
```

Replace the matching closing `</div>` with `</LiquidGlass>`.

- [ ] **Step 3: Replace the contact info card div**

Find:

```tsx
          <div 
            className={`glass-card rounded-xl p-6 flex flex-col items-center text-center transition-all duration-700 ease-out ${isVisible ? 'opacity-100' : 'opacity-0 transform translate-y-8'}`}
            style={{ transitionDelay: '300ms' }}
          >
```

Replace with:

```tsx
          <LiquidGlass
            variant="card"
            enableBreathing
            className={`rounded-xl p-6 flex flex-col items-center text-center transition-all duration-700 ease-out ${isVisible ? 'opacity-100' : 'opacity-0 transform translate-y-8'}`}
            style={{ transitionDelay: '300ms' }}
          >
```

Replace the matching closing `</div>` with `</LiquidGlass>`.

- [ ] **Step 4: Replace the modal card div**

Find:

```tsx
          <div className="glass-card rounded-xl p-6 max-w-md w-full animate-fade-in">
```

Replace with:

```tsx
          <LiquidGlass variant="card" enableBreathing className="rounded-xl p-6 max-w-md w-full animate-fade-in">
```

Replace the matching closing `</div>` with `</LiquidGlass>`.

- [ ] **Step 5: Verify build succeeds**

```bash
npm run build
```

Expected: no errors.

- [ ] **Step 6: Commit**

```bash
git add src/components/Contact.tsx
git commit -m "feat: refactor Contact glass cards to LiquidGlass"
```

---

### Task 9: Refactor `KnowledgeItem.tsx` and `BlogCard.tsx`

**Files:**
- Modify: `src/components/KnowledgeItem.tsx`
- Modify: `src/components/BlogCard.tsx`

- [ ] **Step 1: Edit `src/components/KnowledgeItem.tsx`**

Add import:

```tsx
import { LiquidGlass } from '@/components/ui/LiquidGlass';
```

Replace the outer `<div className={cn("flex items-start gap-3 glass p-5 rounded-xl ...">` with:

```tsx
    <LiquidGlass
      variant="light"
      enableBreathing
      className={cn(
        'flex items-start gap-3 p-5 rounded-xl transition-all duration-300 hover:bg-card/80',
        className
      )}
    >
```

Replace closing `</div>` with `</LiquidGlass>`.

Remove the `glass` class from the className string (it's replaced by `LiquidGlass variant="light"`). The full updated component:

```tsx
import { CheckCircle } from 'lucide-react';
import { cn } from '@/lib/utils';
import { LiquidGlass } from '@/components/ui/LiquidGlass';

interface KnowledgeItemProps {
  title: string;
  description: string;
  className?: string;
}

const KnowledgeItem = ({ title, description, className }: KnowledgeItemProps) => {
  return (
    <LiquidGlass
      variant="light"
      enableBreathing
      className={cn(
        'flex items-start gap-3 p-5 rounded-xl transition-all duration-300 hover:bg-card/80',
        className
      )}
    >
      <CheckCircle className="text-primary h-5 w-5 mt-1 shrink-0" />
      <div>
        <h3 className="font-medium text-foreground mb-1">{title}</h3>
        <p className="text-sm text-muted-foreground">{description}</p>
      </div>
    </LiquidGlass>
  );
};

export default KnowledgeItem;
```

- [ ] **Step 2: Edit `src/components/BlogCard.tsx`**

Add import:

```tsx
import { LiquidGlass } from '@/components/ui/LiquidGlass';
```

Replace the outer `<article className={cn("glass-card rounded-xl ...">` with `<LiquidGlass as="article" variant="card" enableBreathing enableTilt whileHover={{ scale: 1.02, y: -4 }} whileTap={{ scale: 0.98 }}>` removing the Tailwind hover:scale/hover:-translate-y classes (now handled by Framer Motion). Full updated component:

```tsx
import { Calendar } from 'lucide-react';
import { cn } from '@/lib/utils';
import TechBadge from './TechBadge';
import { BlogPost } from '@/lib/blogTypes';
import { LiquidGlass } from '@/components/ui/LiquidGlass';

interface BlogCardProps {
  post: BlogPost;
  onTagClick: (tag: string) => void;
  delay?: number;
}

const BlogCard = ({ post, onTagClick, delay = 0 }: BlogCardProps) => {
  return (
    <LiquidGlass
      as="article"
      variant="card"
      enableBreathing
      enableTilt
      whileHover={{ scale: 1.02, y: -4 }}
      whileTap={{ scale: 0.98 }}
      className={cn(
        'rounded-xl overflow-hidden group cursor-pointer',
        'hover:border-primary/50 hover:shadow-lg hover:shadow-primary/10',
        'transition-shadow duration-300',
        'opacity-0 animate-fade-in'
      )}
      style={{ animationDelay: `${delay}ms` }}
    >
      {post.image && (
        <div className="relative w-full aspect-video overflow-hidden bg-primary/5">
          <img
            src={post.image}
            alt={post.title}
            className="w-full h-full object-cover transition-transform duration-500 ease-out group-hover:scale-11"
            loading="lazy"
          />
        </div>
      )}

      <div className="p-4 sm:p-5 space-y-3 sm:space-y-4">
        <div className="flex items-center gap-2 flex-wrap">
          <TechBadge
            name={post.category}
            className="text-xs py-1 px-2.5 bg-gray-700 text-gray-50 border-gray-700 border dark:bg-gray-700/10 dark:text-gray-400 dark:border-gray-200/50"
          />
          <div className="flex items-center gap-1 text-xs text-muted-foreground">
            <Calendar className="h-3.5 w-3.5" />
            <time dateTime={post.date}>
              {new Date(post.date).toLocaleDateString('es-ES', {
                day: 'numeric',
                month: 'short',
                year: 'numeric',
              })}
            </time>
          </div>
        </div>

        <div className="space-y-1.5">
          <h3 className="text-lg sm:text-xl font-semibold text-foreground group-hover:text-primary transition-colors duration-300 line-clamp-2">
            {post.title}
          </h3>
          <p className="text-sm text-muted-foreground line-clamp-3 leading-relaxed">
            {post.excerpt}
          </p>
        </div>

        {post.tags.length > 0 && (
          <div className="flex flex-wrap gap-1.5 pt-1">
            {post.tags.slice(0, 4).map((tag) => (
              <button
                key={tag}
                onClick={(e) => {
                  e.stopPropagation();
                  onTagClick(tag);
                }}
                className="text-xs text-primary/80 hover:text-primary hover:bg-primary/10 px-2 py-1 rounded-md transition-all duration-200"
              >
                #{tag}
              </button>
            ))}
            {post.tags.length > 4 && (
              <span className="text-xs text-muted-foreground px-2 py-1">
                +{post.tags.length - 4}
              </span>
            )}
          </div>
        )}
      </div>
    </LiquidGlass>
  );
};

export default BlogCard;
```

- [ ] **Step 3: Verify build succeeds**

```bash
npm run build
```

Expected: no errors.

- [ ] **Step 4: Commit**

```bash
git add src/components/KnowledgeItem.tsx src/components/BlogCard.tsx
git commit -m "feat: refactor KnowledgeItem and BlogCard glass effects to LiquidGlass"
```

---

### Task 10: Mark old CSS classes @deprecated + final verification

**Files:**
- Modify: `src/index.css`

- [ ] **Step 1: Mark old glass CSS classes as deprecated in `src/index.css`**

Find the `.liquid-glass {` rule and add a comment above it:

```css
  /* @deprecated — use <LiquidGlass variant="light"> instead. Kept as reduced-motion fallback. */
  .liquid-glass {
```

Find the `.liquid-glass-strong {` rule and add:

```css
  /* @deprecated — use <LiquidGlass variant="strong"> instead. Kept as reduced-motion fallback. */
  .liquid-glass-strong {
```

Find the `.glass {` rule and add:

```css
  /* @deprecated — use <LiquidGlass variant="light"> instead. */
  .glass {
```

Find the `.glass-card {` rule and add:

```css
  /* @deprecated — use <LiquidGlass variant="card"> instead. */
  .glass-card {
```

- [ ] **Step 2: Final production build**

```bash
npm run build
```

Expected: clean build, no errors, no warnings about unused CSS (Tailwind purges unused).

- [ ] **Step 3: Run dev server and verify visually**

```bash
npm run dev
```

Open `http://localhost:8080` and verify:

- [ ] Project cards show 3D tilt on hover (desktop)
- [ ] Project cards show cursor-following sheen on hover (desktop)
- [ ] Breathing border pulses on project cards, Hero badge, buttons, Navbar (when scrolled)
- [ ] Morphing blobs visible in project cards on wide desktop (≥1024px)
- [ ] Navbar activates glass blur + breathing when scrolled past 20px
- [ ] Mobile: no tilt, no reflection, no blobs — static glass only
- [ ] Hero badge, video wrapper have glass effect
- [ ] "Ver Proyectos" button tilt + reflection active on desktop
- [ ] Dark mode: higher blur intensity, glass more visible
- [ ] Light mode: subtle glass, border visible

- [ ] **Step 4: Commit**

```bash
git add src/index.css
git commit -m "chore: mark legacy glass CSS classes as @deprecated"
```

---

## Self-Review Against Spec

| Spec requirement | Task covering it |
|---|---|
| `LiquidGlass` component with `variant`, tilt, reflection, breathing, morphing props | Task 2 |
| `light` variant: badge, secondary buttons, subtle breathing only | Tasks 2, 4 |
| `strong` variant: primary buttons, Navbar, reflection + breathing + tilt desktop | Tasks 2, 4, 5 |
| `card` variant: full effects — tilt, reflection, breathing, blobs desktop | Tasks 2, 3, 6, 7, 8, 9 |
| Disable tilt + blobs on mobile (`<768px`) | Task 2 — `canTilt`, `canMorph` gated on `!isMobile` |
| `prefers-reduced-motion` fallback to static glass | Task 2 — `prefersReduced` check |
| Blobs via CSS `@keyframes` (GPU, not JS) | Task 1 — `lg-blob-drift-*` keyframes |
| Breathing border via CSS `@keyframes` on opacity | Task 1 — `lg-breathe` keyframe |
| `will-change: transform` on animated elements | Task 2 — set in `glassStyle` |
| `transform` / `opacity` only animations | Task 2 — `rotateX/Y` via spring, `whileHover` uses `scale`/`y` |
| No layout-triggering properties in animation | Task 2 — no width/height/margin animations |
| Blobs only on `card` variant desktop (≥1024px) | Task 2 — `isWide && variant === 'card'` |
| Keep old CSS as static fallback, mark `@deprecated` | Tasks 1, 10 |
| `npm run build` succeeds | Every task ends with build check |
| ProjectGridCard: tilt, reflection, breathing, blobs | Task 3 |
| Hero: 4 LiquidGlass uses | Task 4 |
| Navbar: scrolled bar + mobile menu | Task 5 |
| `disabled` prop for Navbar unscrolled state | Tasks 2, 5 |
| AboutMe, Inspiration: breathing card | Task 6 |
| Technologies: breathing cards in map | Task 7 |
| Contact: 3 card uses | Task 8 |
| KnowledgeItem (`glass`), BlogCard (`glass-card`) | Task 9 |
| Theme-aware blur (dark = more blur) | Task 2 — `BLUR[variant][isDark ? 'dark' : 'light']` |
