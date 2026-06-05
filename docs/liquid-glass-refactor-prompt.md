# Liquid Glass + Glassmorphism Refactor — Claude Code Prompt

## Mission
Refactor the liquid-glass and glass-card effects across the portfolio from static CSS to interactive, animated components using Framer Motion. Preserve dark/light theme awareness and keep primary color (blue #2563eb) as the accent.

## Current state

### CSS classes in `src/index.css`:
- `.liquid-glass` — backdrop-filter: blur(4px) + static border-gradient using `mask-composite: exclude` + `box-shadow: inset 0 1px 1px rgba(255,255,255,0.1)`
- `.liquid-glass-strong` — backdrop-filter: blur(50px) + heavier border + `box-shadow: 4px 4px 4px rgba(0,0,0,0.05)`
- `.glass` — `backdrop-blur-md` + `border-border/60` + subtle shadow, dark: `bg-black/20`
- `.glass-card` — dark: `bg-black/40 backdrop-blur-sm border border-white/10`

### Usage:
- `liquid-glass` → Hero badge, Hero "Contacto" button, Hero video showcase
- `liquid-glass-strong` → Hero "Ver Proyectos" button, Navbar (sticky + mobile menu)
- `glass` → KnowledgeItem
- `glass-card` → AboutMe, Contact (3 locations), Technologies, BlogCard, Inspiration

### Target section (primary): Projects (src/components/Projects.tsx)
ProjectGridCard currently uses: `bg-card/50 backdrop-blur-sm border-border/50 hover:border-primary/50`. The Projects section needs the Liquid Glass treatment: animated cards with mouse-follow tilt/reflection, breathing border, and morphing background.

## What to build

### 1. `<LiquidGlass>` component (core building block)
`src/components/ui/LiquidGlass.tsx`

A reusable Framer Motion component that wraps children with:

```tsx
interface LiquidGlassProps {
  variant?: 'light' | 'strong' | 'card'  // maps to blur intensity
  children: React.ReactNode
  className?: string
  // Mouse-follow
  enableTilt?: boolean           // 3D perspective tilt on hover
  enableReflection?: boolean     // highlight that follows cursor
  // Border
  enableBreathing?: boolean      // animated gradient border (slow pulse)
  // Background morphing
  enableMorphing?: boolean       // subtle animated blob behind glass
  // Responsive: disable heavy effects on mobile
  reducedMotion?: boolean        // respect prefers-reduced-motion
}
```

**Behaviour by variant:**
- `light` (blur 4-8px) → Hero badge, secondary buttons. Subtle breathing border only. No tilt.
- `strong` (blur 30-50px) → Primary buttons, Navbar. Mouse-follow reflection + breathing border. Tilt on desktop only.
- `card` (blur 10-20px) → ProjectGridCard, AboutMe, Technologies, etc. Full effects: tilt, reflection, breathing border, optional bg morphing blobs on desktop.

**Performance rules (5. priority):**
- `will-change: transform` on animated elements
- Use `transform` / `opacity` only (no layout-triggering properties in animation)
- Disable tilt and bg morphing on mobile (< 768px) via `use-media` hook or existing `use-mobile.tsx`
- `prefers-reduced-motion` media query fallback: fall back to static glass
- Framer Motion `layout` animations are off — no layout recalculations
- Use GPU-compatible properties (translateZ(0), scale, opacity)

### 2. Animated Border Gradient (breathing)

Current border-gradient uses `::before` with `mask-composite: exclude`. Replace with a Framer Motion animated SVG gradient or keyframes that slowly shift hue/saturation within the primary blue range (HSL 221° 83% 53%). 

The breathing cycle: 4-6 second loop, subtle saturation + brightness oscillation (primary → slightly desaturated → primary again).

### 3. Mouse-follow Reflection (cursor-aware highlight)

A radial gradient overlay (`<div>` inside the glass wrapper) that follows the mouse position via `onPointerMove`. The gradient center tracks cursor relative to element bounds. Opacity: 0.03-0.08. Subtle — not a spotlight, just a liquid sheen.

On touch devices: disable (no cursor = no point).

### 4. Morphing Background Blobs (enhancement)

Behind the glass panel, 2-3 smooth animated blobs (CSS `border-radius` keyframes or SVG filters) that slowly drift. Colors: primary/20 to primary/5. Only on `card` variant desktop. Use `filter: blur()` on the blobs for a soft liquid look.

These should NOT interfere with existing background gradients in Hero (the `bg-[linear-gradient(...)]` setup). Render inside a `z-[-1]` wrapper div.

### 5. Refactor ProjectGridCard

`src/components/ProjectGridCard.tsx`

Wrap the entire card in `<LiquidGlass variant="card">`. Keep existing hover:scale and hover:-translate-y behaviour but now powered by Framer Motion `whileHover`. The tilt should be subtle (max 3-5deg perspective). On hover, the border brightens toward primary/70 with the breathing animation.

Add a `motion.div` that reveals the "Ver detalles" arrow on hover, already exists but can be smoother.

### 6. Create component variants

| Original class | New component usage |
|---|---|
| `liquid-glass` (badge/button) | `<LiquidGlass variant="light">` without tilt/reflection |
| `liquid-glass-strong` (button) | `<LiquidGlass variant="strong">` with reflection |
| `glass` (knowledge items) | `<LiquidGlass variant="light">` without extras |
| `glass-card` (sections) | `<LiquidGlass variant="card">` with full effects on desktop |
| ProjectGridCard | `<LiquidGlass variant="card">` wrapping the whole card |

## Install first

```bash
npm install framer-motion
```

## File structure

```
src/
├── components/
│   └── ui/
│       └── LiquidGlass.tsx    # NEW — the core component
├── components/
│   ├── ProjectGridCard.tsx    # MODIFY — wrap with LiquidGlass
│   ├── Hero.tsx               # MODIFY — replace liquid-glass classes with <LiquidGlass>
│   ├── Navbar.tsx             # MODIFY — replace liquid-glass-strong with <LiquidGlass>
│   ├── AboutMe.tsx            # MODIFY — replace glass-card with <LiquidGlass>
│   ├── Contact.tsx            # MODIFY — replace glass-card with <LiquidGlass>
│   ├── Technologies.tsx       # MODIFY — replace glass-card with <LiquidGlass>
│   ├── KnowledgeItem.tsx      # MODIFY — replace glass with <LiquidGlass>
│   ├── Inspiration.tsx        # MODIFY — replace glass-card with <LiquidGlass>
│   └── BlogCard.tsx           # MODIFY — replace glass-card with <LiquidGlass>
├── index.css                  # KEEP existing liquid-glass classes for fallback, but mark as @deprecated
```

## Theme-aware dark/light

Current CSS vars:
- Light: `--background: 0 0% 100%`, `--primary: 221 83% 53%` (blue)
- Dark: `--background: 0 0% 0%`, `--primary: 221 83% 53%` (same blue)

The LiquidGlass component should:
- Use `hsl(var(--primary))` for borders and accent glows
- In dark mode: increase blur intensity (background is black, more blur = more visible)
- In light mode: reduce blur, make border more visible
- Read theme from the existing `useTheme` hook in `src/hooks/use-theme.ts`

## Performance constraints (priority: PERFORMANCE)

1. No layout-triggering animations — `transform` and `opacity` only
2. Desktop only: tilt (>768px), bg morphing blobs (>1024px)
3. `prefers-reduced-motion`: instant fallback to static CSS with no animations
4. Framer Motion's `useReducedMotion()` hook
5. Mouse-follow uses `pointer-events: none` overlay, not on the content
6. Cleanup event listeners on unmount
7. The morphing blobs should use CSS `@keyframes` (GPU-composited) not Framer Motion (JS-driven) for efficiency
8. Use `transform: translateZ(0)` or `will-change: transform` on animated elements
9. Profile with React DevTools after changes — no excessive re-renders

## Visual references

Apple's WWDC 2024 glass UI patterns:
- Frosted glass with animated gradient borders
- Subtle parallax on card hover
- Saturation/brightness breathing on borders (3-5s cycle)
- No harsh transitions — all easing should be smooth (`cubic-bezier(0.16, 1, 0.3, 1)` or similar)

## Acceptance criteria

- [ ] `<LiquidGlass>` component builds without TypeScript errors
- [ ] `npm run build` succeeds
- [ ] Hovering a project card shows subtle 3D tilt + cursor reflection + breathing border
- [ ] Mobile has no tilt/no morphing blobs (smooth static glass)
- [ ] Dark mode: glass is more visible (higher blur, better contrast)
- [ ] Light mode: glass is subtle (less blur, refined)
- [ ] Hero badge, buttons, and video showcase maintain existing liquid look
- [ ] Navbar continues to have the blurred glass effect
- [ ] `prefers-reduced-motion: reduce` → all animations disabled, static glass remains
- [ ] No layout shift or reflow on initial render
- [ ] Old `.liquid-glass`, `.liquid-glass-strong` classes remain as static fallbacks (marked @deprecated)

## Steps

1. Install framer-motion
2. Create `src/components/ui/LiquidGlass.tsx` with all variants and effects
3. Update `ProjectGridCard.tsx` using `LiquidGlass variant="card"`
4. Update `Hero.tsx` (3 locations)
5. Update `Navbar.tsx` (2 locations)
6. Update `AboutMe.tsx`, `Contact.tsx`, `Technologies.tsx`, `Inspiration.tsx`
7. Update `KnowledgeItem.tsx`, `BlogCard.tsx`
8. Run `npm run build` — fix any TS/ESLint errors
9. Run `npm run dev` and verify visually
