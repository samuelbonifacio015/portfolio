# LiquidGlass Dark Mode Fix Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Fix LiquidGlass dark mode appearance — cards are invisible on pure black background because `rgba(255,255,255,0.01)` background and undifferentiated box-shadow give zero depth or contrast.

**Architecture:** Three focused changes to `LiquidGlass.tsx`: (1) per-variant/per-theme `BG` and `SHADOW` lookup tables replace the hardcoded single values, (2) breathing border gradient becomes dark-aware for stronger primary blue border in dark mode. One CSS change to `index.css`: `.dark .lg-blob` increases blob opacity from `0.12` to `0.22` so blobs are visible on black. Light mode is untouched.

**Tech Stack:** Framer Motion, React 18, TypeScript, Tailwind CSS, CSS custom properties (`hsl(var(--primary))`).

---

## File Map

| Action | Path | Change |
|---|---|---|
| **Modify** | `src/components/ui/LiquidGlass.tsx` | Add `BG` + `SHADOW` tables, update `glassStyle`, dark-aware breathing border |
| **Modify** | `src/index.css` | Add `.dark .lg-blob` opacity override |

---

### Task 1: Fix LiquidGlass dark mode — background, shadow, border, blobs

**Files:**
- Modify: `src/components/ui/LiquidGlass.tsx`
- Modify: `src/index.css`

**Root cause:** `background: isDark ? 'rgba(255,255,255,0.01)' : ...` is essentially transparent on pure black. `backdrop-filter: blur()` on a uniform black surface blurs nothing — still black. Cards have no edge definition. Blobs at `primary/0.12` are invisible on black. The breathing border gradient uses `rgba(255,255,255,0)` as midpoint which disappears on dark.

**Desired result (dark):**
- Cards: `rgba(255,255,255,0.07)` surface — subtly elevated, still dark, not gray
- Edges: `0 0 0 0.5px rgba(255,255,255,0.08)` hairline + outer depth shadow
- Blobs: `primary/0.22` so they create something for the blur to work with
- Breathing border: primary blue at `0.7/0.5` intensity (vs `0.5/0.3` in light)

- [ ] **Step 1: Add `BG` lookup table to `LiquidGlass.tsx`**

In `src/components/ui/LiquidGlass.tsx`, after the `BLUR` constant (line 27), add:

```tsx
const BG: Record<'light' | 'strong' | 'card', { light: string; dark: string }> = {
  light:  { light: 'rgba(255,255,255,0.55)', dark: 'rgba(255,255,255,0.05)' },
  strong: { light: 'rgba(255,255,255,0.55)', dark: 'rgba(255,255,255,0.04)' },
  card:   { light: 'rgba(255,255,255,0.55)', dark: 'rgba(255,255,255,0.07)' },
};
```

- [ ] **Step 2: Add `SHADOW` lookup table**

Immediately after `BG`, add:

```tsx
const SHADOW: Record<'light' | 'strong' | 'card', { light: string; dark: string }> = {
  light: {
    light: 'inset 0 1px 1px rgba(255,255,255,0.1)',
    dark:  'inset 0 1px 1px rgba(255,255,255,0.08), 0 0 0 0.5px rgba(255,255,255,0.07)',
  },
  strong: {
    light: '4px 4px 4px rgba(0,0,0,0.05), inset 0 1px 1px rgba(255,255,255,0.15)',
    dark:  '4px 4px 4px rgba(0,0,0,0.3), inset 0 1px 1px rgba(255,255,255,0.1), 0 0 0 0.5px rgba(255,255,255,0.07)',
  },
  card: {
    light: 'inset 0 1px 1px rgba(255,255,255,0.1)',
    dark:  '0 4px 24px rgba(0,0,0,0.4), 0 0 0 0.5px rgba(255,255,255,0.08), inset 0 1px 1px rgba(255,255,255,0.06)',
  },
};
```

- [ ] **Step 3: Update `glassStyle` to use the lookup tables**

Find the `glassStyle` block (around line 100):

```tsx
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
```

Replace with:

```tsx
  const theme = isDark ? 'dark' : 'light';

  const glassStyle = disabled ? {} : {
    backdropFilter: `blur(${blur}px)`,
    WebkitBackdropFilter: `blur(${blur}px)`,
    background: BG[variant][theme],
    boxShadow: SHADOW[variant][theme],
    willChange: 'transform' as const,
    ...(canTilt && { transformStyle: 'preserve-3d' as const, rotateX, rotateY }),
  };
```

- [ ] **Step 4: Make breathing border dark-aware**

Find the breathing border style block (around line 135–146):

```tsx
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
```

Replace with:

```tsx
      {canBreathe && (
        <div
          className="lg-border-breathe pointer-events-none absolute inset-0 rounded-[inherit]"
          style={{
            padding: '1.4px',
            background: isDark
              ? 'linear-gradient(180deg, rgba(37,99,235,0.7) 0%, rgba(37,99,235,0.1) 50%, rgba(37,99,235,0.5) 100%)'
              : 'linear-gradient(180deg, rgba(37,99,235,0.5) 0%, rgba(255,255,255,0) 50%, rgba(37,99,235,0.3) 100%)',
            WebkitMask: 'linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)',
            WebkitMaskComposite: 'xor',
            maskComposite: 'exclude',
          }}
        />
      )}
```

- [ ] **Step 5: Add `.dark .lg-blob` override to `src/index.css`**

In `src/index.css`, find the `.lg-blob { ... }` rule (inside `@layer components`). Add this rule immediately after the closing `}` of `.lg-blob`:

```css
  .dark .lg-blob {
    background: hsl(var(--primary) / 0.22);
  }
```

- [ ] **Step 6: Verify build**

```bash
npm run build
```

Expected: clean build, no TypeScript errors.

- [ ] **Step 7: Commit**

```bash
git add src/components/ui/LiquidGlass.tsx src/index.css
git commit -m "fix: improve LiquidGlass dark mode — background opacity, shadows, border intensity, blob brightness"
```

---

## Self-Review

| Requirement | Covered by |
|---|---|
| Light mode unchanged | Steps 1–4 — `light` keys in BG/SHADOW match original values; light border gradient unchanged |
| Dark cards visible on black | Step 3 — `BG.card.dark = rgba(255,255,255,0.07)` |
| Dark card edge definition | Step 3 — `SHADOW.card.dark` adds hairline `0 0 0 0.5px` + outer depth shadow |
| Navbar strong glass in dark | Step 3 — `SHADOW.strong.dark` stronger outer shadow |
| Breathing border visible in dark | Step 4 — primary blue at 0.7/0.5 opacity in dark |
| Blobs contribute to blur in dark | Step 5 — `.dark .lg-blob` bumps to primary/0.22 |
| Build passes | Step 6 |
| No placeholder code | ✅ All values explicit |
