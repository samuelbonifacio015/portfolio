# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project

Personal portfolio. Single-page React site (Spanish-language UI) with a Markdown-driven blog.

## Commands

```bash
npm run dev        # Vite dev server on http://localhost:3000 (host "::")
npm run build      # production build
npm run build:dev  # build with development mode
npm run lint       # ESLint over the repo
npm run preview    # serve the production build locally
```

No test runner is configured. `npm` is the package manager (`package-lock.json`).

## Architecture

- **Stack**: Vite + React 18 + TypeScript + Tailwind + shadcn/ui (Radix primitives). `@` alias maps to `src/` (see `vite.config.ts` and `tsconfig.json`).
- **Routing** (`src/App.tsx`): `react-router-dom`. Routes: `/` (Index), `/blog`, `/blog/:slug`, `*` (NotFound). `vercel.json` rewrites all paths to `/index.html` for client-side routing on Vercel. Providers wrapping the app: `QueryClientProvider` (TanStack Query, currently unused for data fetching), `TooltipProvider`, and two toasters (`Toaster` + Sonner).
- **Home page** (`src/pages/Index.tsx`): assembles the whole site as a vertical stack of section components from `src/components/` (Hero, Terminal, GitHub chart, AboutMe, Technologies, Projects, Knowledge, Inspiration, Contact, Footer). Sections animate in via `IntersectionObserver` — the standard pattern across components is a `sectionRef` + `isVisible` state toggling opacity/transform classes.
- **Components**: `src/components/ui/` is the shadcn/ui library (generated, configured by `components.json` — slate base color, CSS variables, no prefix). Hand-written feature components live directly in `src/components/`. Prefer composing existing `ui/` primitives.

## Blog system

- Posts are `.md` files in the top-level `blog/` directory (NOT under `src/`).
- `src/lib/blogUtils.ts` loads them at build time via Vite's `import.meta.glob('/blog/*.md', { as: 'raw', eager: true })`. Slug = filename without `.md`.
- Frontmatter (`title`, `date`, `category`, `excerpt`, `image`, `tags`) is parsed by a **hand-rolled regex parser** in `parseMarkdownPost`, not `gray-matter`. `tags` must be a bracketed list, e.g. `tags: [react, js]`. Keep one `key: value` per line.
- To add a post: drop a new `.md` file in `blog/` with valid frontmatter — no code changes needed.
- Rendered with `react-markdown` + `remark-gfm`.

## Theming

- Custom theme hook `src/hooks/use-theme.ts` (light/dark/system, persisted in `localStorage` under `theme`, toggles `.dark` class on `<html>`). `next-themes` is installed but the custom hook is what's used.
- Colors are CSS variables consumed via `hsl(var(--...))` in `tailwind.config.ts`. Use semantic Tailwind classes (`bg-background`, `text-foreground`, `text-primary`, etc.) rather than hardcoded colors so both themes work.

## External integrations

- **Contact form** (`src/components/Contact.tsx`): EmailJS. Requires env vars `VITE_EMAILJS_SERVICE_ID`, `VITE_EMAILJS_TEMPLATE_ID`, `VITE_EMAILJS_PUBLIC_KEY` (no `.env` is committed).
- **GitHub contributions chart** (`src/components/Git.tsx`): pulls an image from `ghchart.rshah.org` for a hardcoded default username.
