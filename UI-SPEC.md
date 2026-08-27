---
phase: blog-post-detail
slug: blog-post-detail
status: approved
shadcn_initialized: true
preset: default style / slate base / CSS variables / no prefix
created: 2026-08-26
reviewed_at: 2026-08-26
---

# Blog post detail — UI Design Contract

> Visual and interaction source of truth for `src/pages/BlogPost.tsx` and `src/components/BlogContent.tsx`.
> The composition reproduces Aceternity UI's **Blog Content With TOC** block while keeping the real Spanish Markdown posts and local images from `blog/`.

## Design System

| Property | Value |
|----------|-------|
| Tool | shadcn/ui (already initialized) |
| Preset | `default`, slate base, CSS variables, no prefix (`components.json`) |
| Component library | Radix primitives via shadcn; compose existing `Button`, `Sheet`/`Dialog` or `Collapsible` where useful |
| Icon library | `lucide-react` (`Menu`, `X`, `ArrowLeft`, `Calendar`) |
| Motion | `framer-motion` is installed; use it only for TOC indicator/menu transitions |
| Font | Existing Inter (`--font-sans`/`--font-display`); do not add a second family |

Existing semantic tokens in `src/index.css` are the source of truth. Do not introduce hard-coded page colors when a semantic token exists.

## Scene, Layout and Responsive Contract

**Scene:** a recruiter scans a Spanish technical article on a bright laptop or a one-handed phone; the page should feel quiet, factual and image-led, with navigation always close but never competing with the article.

### Desktop (min-width: 768px)

- Keep the fixed site `Navbar`; reserve at least 80px of top breathing room below it.
- Article shell: `mx-auto flex w-full max-w-7xl flex-row gap-4 px-8`.
- Left TOC: `sticky top-20 left-0 hidden max-w-xs flex-col self-start pr-10 md:flex`; its intrinsic width preserves the reference's generous right whitespace and it contains only generated section links (no card background).
- Main column: `flex-1 max-w-2xl` (672px), aligned left within the shell. Do not center the article independently of the TOC.
- Sequence is exactly: hero image → post title → Markdown body → two fine separators → author/date row. Do not insert a category badge, tag chip row, excerpt or share card between these landmarks; that would break the reference silhouette.
- Hero image: `w-full h-[30rem] object-cover rounded-3xl` (24px), using `post.image`; no placeholder panel when an image exists.

### Mobile (below 768px)

- Article shell becomes one column: `w-full px-4`; hide the desktop TOC.
- Hero image remains first, `h-60` (240px), full width, `rounded-3xl`, `object-cover`.
- Show a floating TOC trigger at the top-right, visually 40px circular with a 44px minimum hit area, sticky/fixed below the navbar (`top: 5rem; right: 1rem`).
- Trigger opens a compact menu panel no wider than `min(280px, calc(100vw - 2rem))`; panel is anchored to the trigger and must not push article content.
- Keep title and body at the same readable column width; never allow horizontal overflow from long titles, code, URLs, or tags.

### Content and image behavior

- Use the actual `BlogPost` fields. Hero mapping is `post.image`; Markdown images resolve as authored in the `.md` file (for example `/projects/WeRide/WeRide.webp`, `/utils/SamuelUPC.webp`).
- Markdown images are full content-column width, intrinsic height, `display:block`, `my-10`; unlike the hero, do not add a decorative shadow or large radius.
- Every image has meaningful Spanish `alt` text; missing `alt` falls back to the post title only as a last resort.
- Body measure is capped at 65–75ch (the `max-w-2xl` column naturally enforces this).

## Spacing Scale

Declared values (multiples of 4 only):

| Token | Value | Usage |
|-------|-------|-------|
| xs | 4px | TOC indicator offset, metadata dot, icon/text micro-gap |
| sm | 8px | TOC link padding, tag/metadata grouping |
| md | 16px | Mobile page gutter, default element gap, list indent base |
| lg | 24px | Hero-to-title gap, paragraph rhythm, mobile menu inset |
| xl | 32px | Article shell gap and heading separation |
| 2xl | 48px | Major content breaks, image and separator margins |
| 3xl | 64px | Top page breathing room and post footer spacing |

Exceptions: the 40px visual TOC trigger uses a 44px accessible hit area; the 20px author avatar and 4px metadata dot are optical exceptions, not layout spacing tokens.

## Typography

Use Inter with only regular (400) and semibold (600) weights. Apply `text-wrap: balance` to title/headings and `text-wrap: pretty` to long paragraphs.

| Role | Size | Weight | Line Height |
|------|------|--------|-------------|
| Body / prose | 16px | 400 | 1.75 (28px) |
| Label / TOC / metadata | 14px | 400 | 1.5 (21px) |
| Section heading (`h2`/`h3`) | 20px | 600 | 1.4 (28px) |
| Post title (`h1`) | 24px | 600 | 1.25 (30px) |

- Keep the outer post title at 24px on all breakpoints, matching the reference block's `text-2xl` title.
- Markdown `h1` is rendered as a section-level `h2` because `BlogPostPage` owns the only document `h1`; never render two post titles.
- Lists inherit 16px/1.75; ordered-list markers and nested bullets align to the prose column.
- Inline code uses 14px/1.5 with a subtle muted surface. Fenced code keeps horizontal scrolling inside the code block.

## Color

The reference is neutral, white-first and dark-mode safe. Use existing semantic variables so light and dark themes remain consistent.

| Role | Light value | Dark value | Usage |
|------|-------------|------------|-------|
| Dominant (60%) | `--background` (`#fff`) | `--background` (`rgba(33,33,33,.9)`) | Page canvas and article surface |
| Secondary (30%) | `--muted`/`--bg-subtle` (`oklch(.98 0 0)`) | `--muted`/`--bg-subtle` (`oklch(.15 0 0)`) | Mobile TOC panel, inline code, subtle metadata surfaces |
| Accent (10%) | `--primary` (`#3F3F46`) | `--primary` (`#D4D4D8`) | Back-to-blog CTA, TOC hover/active indicator, links and focus ring only |
| Destructive | `--destructive` (`#DC2626`) | `--destructive` (`#EF4444`) | Error action only; no destructive action exists in this phase |

Accent reserved for: `Volver al blog` action, article hyperlinks, active/hover TOC indicator, keyboard focus rings, and category/tag text when those existing fields are shown. Do not tint every heading, image, border or surface with accent.

Contrast requirements: body and TOC text must reach WCAG AA (4.5:1); muted metadata is still readable (at least 4.5:1 at 14px); focus rings remain visible in both themes.

## Component and Interaction Contract

### Table of contents (TOC)

- Build the TOC from rendered Markdown `h2`/`h3` headings in document order. Generate deterministic, URL-safe IDs (lowercase Spanish slug, accents normalized, duplicate headings suffixed `-2`, `-3`).
- Desktop links use transparent backgrounds, `rounded-lg px-2 py-1`, 14px text. Hover shifts label exactly 4px right (`translateX(4px)`) and reveals a 2px vertical indicator at the leading edge; animate the indicator position with Framer Motion `layoutId` when available.
- Mark the section nearest the viewport top with `aria-current="location"` and the same indicator. Clicking a link updates the hash and scrolls with `scroll-margin-top: 96px`; honor reduced-motion by using instant scrolling.
- Mobile trigger uses `Menu`/`X`, `aria-label="Abrir índice del artículo"` / `"Cerrar índice del artículo"`, `aria-expanded`, and `aria-controls`. Menu panel contains the identical links and closes after navigation, outside click, or `Escape`.
- Mobile panel animation is a short opacity/translate transition (150–200ms ease-out); disable transforms/animation under `prefers-reduced-motion: reduce`.
- If a post has no headings, omit both TOC variants rather than rendering an empty box.

### Article body

- Keep `ReactMarkdown` + `remark-gfm`. Apply semantic heading levels, paragraphs, ordered/unordered lists, links (`target="_blank"` only for external URLs with `rel="noopener noreferrer"`), blockquotes, inline/fenced code, horizontal rules and images.
- Paragraphs: 24px bottom rhythm, 16px/1.75, foreground at full contrast. Links are solid accent with underline on hover/focus (no gradient text).
- Section headings: 32px top margin / 16px bottom margin; no decorative full-width heading rules. Use whitespace, not card chrome, to separate sections.
- Blockquotes use a 1px full border plus muted surface, 16px inset padding and italic text. Do not use a colored side stripe thicker than 1px.
- After the final Markdown node render two stacked 1px separators (`border-border` then a lighter muted border) with 40px top margin, matching Aceternity's footer rhythm.

### Metadata and footer

- Keep category/tags available to the blog index and document metadata, but do not render a badge/chip row in the detail hero. The visible detail metadata is the localized date in the bottom author row, matching the reference.
- Author row at the bottom uses `/samuel.jpg` (or the existing local Samuel portrait), 20px circular avatar, `Samuel Bonifacio`, a 4px separator dot, and `toLocaleDateString('es-ES')` date. Use `alt="Samuel Bonifacio"`.
- Footer continues to use the existing `Footer` component after the article and remains outside the 2-column article shell.

## Copywriting Contract

| Element | Copy |
|---------|------|
| Primary CTA | `Volver al blog` |
| Loading state | `Cargando…` |
| Empty TOC state | Do not render a TOC when el artículo no tiene encabezados; no empty panel copy. |
| Blog index empty heading | `No se encontraron posts con este filtro.` |
| Blog index empty next step | `Ver todos los posts` |
| Error state | Heading: `Post no encontrado`; body: `El post que buscas no existe.`; action: `Volver al blog`. |
| Destructive confirmation | None — this read-only article has no destructive actions. |

All interface copy is Spanish. Preserve the exact title, excerpt, headings, lists, links, formulas and image intent authored in each `blog/*.md` file; do not replace article prose with demo text from Aceternity.

## Accessibility and Quality Gates

- One document `h1` (the post title); Markdown headings continue at `h2`/`h3`.
- TOC links are keyboard reachable with visible `:focus-visible` rings and descriptive text; active section uses `aria-current="location"`.
- Mobile menu traps focus only if implemented as a dialog; otherwise use a semantic disclosure and return focus to the trigger on close.
- Images have non-empty alt text; decorative images use empty alt and never duplicate adjacent prose.
- Respect `prefers-reduced-motion` for TOC hover shifts, scroll behavior, menu transitions and any existing reveal animation.
- Test at 320px, 375px, 768px, 1024px and 1440px widths; no horizontal scroll, clipped TOC, or title overflow.
- Verify light/dark contrast and keyboard navigation before sign-off; ensure external links cannot reverse-tab into an off-screen mobile panel.

## Registry Safety

| Registry | Blocks Used | Safety Gate |
|----------|-------------|-------------|
| shadcn official | Existing primitives only (`button`, `dialog`/`sheet` or `collapsible` if needed) | not required; generated components are local |

## Checker Sign-Off

- [x] Dimension 1 Copywriting: PASS
- [x] Dimension 2 Visuals: PASS
- [x] Dimension 3 Color: PASS
- [x] Dimension 4 Typography: PASS
- [x] Dimension 5 Spacing: PASS
- [x] Dimension 6 Registry Safety: PASS

**Approval:** approved by gsd-ui-checker (all 6 dimensions pass)

## Sources and Decisions

- Existing project conventions: `AGENTS.md`, `components.json`, `src/index.css`, `tailwind.config.ts`, `src/pages/BlogPost.tsx`, `src/components/BlogContent.tsx`.
- Real content inventory: `blog/bienvenida-al-blog.md`, `blog/el-poder-de-la-consistencia.md`, `blog/por-que-me-encanta-react.md`.
- Reference inspected: Aceternity UI **Blog Content With TOC** (`https://ui.aceternity.com/blocks/blog-content-sections/blog-content-with-toc`) and supplied screenshot. Reference classes establish `max-w-7xl` shell, desktop sticky TOC at `top-20`, mobile floating 40px menu, `max-w-2xl` content, `h-60`/`md:h-[30rem]` hero and `rounded-3xl` image treatment.
- No `CONTEXT.md`, `RESEARCH.md` or `REQUIREMENTS.md` files exist in this repository; values not present upstream use the concrete defaults above.
