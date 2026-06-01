# Portfolio Update Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Modernizar el portfolio de Samuel Bonifacio: añadir 3 proyectos nuevos (LlamIA, Klippr, MJYS), corregir bugs (email, enlaces placeholder, ancho de BlogCard, bug latente del parser de blog), y limpiar deuda técnica (deps sin uso, npm audit, README).

**Architecture:** Single-page portfolio en React 18 + Vite + TypeScript + Tailwind. Los proyectos son objetos `ProjectProps` en un array dentro de `src/components/Projects.tsx`; cada uno se renderiza como tarjeta y abre un `ProjectModal` con carrusel de imágenes/video. El blog parsea archivos markdown de `/blog/*.md` vía `import.meta.glob`. No hay framework de tests configurado.

**Tech Stack:** React 18.3, Vite 5.4, TypeScript 5.5, Tailwind 3.4, lucide-react, embla-carousel, react-markdown.

---

## ⚠️ Notas de ejecución (leer antes de empezar)

1. **No hay test runner.** `package.json` no define script `test`. La verificación de cada tarea se hace con:
   - `npm run build` → debe terminar sin errores de TypeScript/Vite.
   - `npm run lint` → no debe introducir errores nuevos.
   - Verificación visual con `npm run dev` cuando el cambio sea visual.
   Donde el formato de skill pide "test que falla", se sustituye por estos comandos de verificación.

2. **Decisión sobre dependencias (resuelta).** En el brainstorming se marcaron opciones en conflicto (quitar `gray-matter` **y** refactorizar `blogUtils` para usarlo). Resolución técnica adoptada: **eliminar `gray-matter`** (queda como dependencia muerta) y **endurecer el parser manual** de `blogUtils.ts` arreglando su bug latente de null-check. Motivo: `gray-matter` depende de `Buffer` de Node y requiere polyfill en el bundle de navegador (Vite), añadiendo fragilidad sin beneficio real frente al parser manual actual. `@tanstack/react-query` también se elimina (está como provider en `App.tsx` pero sin ninguna query).

3. **Imágenes de carrusel = assets del usuario.** Las tareas que añaden arrays `images` esperan archivos PNG con rutas/nombres exactos en `public/projects/{Nombre}/`. El usuario debe dejar caer esos archivos. Hasta entonces el carrusel mostrará imágenes rotas para esos proyectos — es el flujo acordado. La imagen principal (`image`) de cada proyecto nuevo es el primer archivo del array y es el mínimo imprescindible.

4. **URLs faltantes → campo omitido.** `ProjectCard`/`ProjectModal` solo renderizan `githubUrl`/`liveUrl` si son truthy. Cuando no se dispone de una URL real, **se omite el campo** (no se pone `"#"`). URLs aún no provistas por el usuario:
   - LlamIA: repo GitHub (se omite `githubUrl` por ahora).
   - MJYS: repo GitHub (se omite `githubUrl` por ahora).
   - Translator: repo GitHub (se omite `githubUrl`).
   - WePages: repo + live (se omiten ambos por ahora).
   Cuando el usuario los tenga, se añaden con un edit puntual al objeto correspondiente.

---

## Estructura de archivos afectados

| Archivo | Responsabilidad | Acción |
|---------|-----------------|--------|
| `src/components/Contact.tsx` | Sección de contacto | Modificar (fix email) |
| `src/components/BlogCard.tsx` | Tarjeta de post de blog | Modificar (fix ancho) |
| `src/components/Projects.tsx` | Array de proyectos + grid | Modificar (placeholders, 3 proyectos nuevos, arrays de imágenes) |
| `src/lib/blogUtils.ts` | Parseo de markdown del blog | Modificar (fix bug null-check) |
| `src/App.tsx` | Root de la app | Modificar (quitar react-query) |
| `package.json` | Dependencias | Modificar (quitar gray-matter + react-query) |
| `README.md` | Documentación | Reescribir |
| `public/projects/{LlamIA,Klippr,MJYS,CultivApp,LibreriaJSR,Finovate,PasoPerfecto,AguaConnect}/` | Assets de screenshots | El usuario añade archivos |

---

## Task 0: Crear rama de trabajo

**Files:** (ninguno — operación git)

- [ ] **Step 1: Verificar working tree limpio**

Run: `git status --short`
Expected: sin salida (árbol limpio).

- [ ] **Step 2: Crear y cambiar a la rama**

```bash
git checkout -b feature/portfolio-update
```
Expected: `Switched to a new branch 'feature/portfolio-update'`

---

## Task 1: Fix email inconsistente

**Files:**
- Modify: `src/components/Contact.tsx:171`

El `href` apunta a `samuelbonifacio015@gmail.com` (correcto) pero el texto visible muestra `samuelbonifacio019@gmail.com`. Unificar el texto visible al correcto.

- [ ] **Step 1: Editar el texto visible del email**

En `src/components/Contact.tsx`, reemplazar la línea 171:

```tsx
                    samuelbonifacio019@gmail.com
```

por:

```tsx
                    samuelbonifacio015@gmail.com
```

El `href="mailto:samuelbonifacio015@gmail.com"` de la línea 168 ya es correcto y no se toca.

- [ ] **Step 2: Verificar build**

Run: `npm run build`
Expected: build OK sin errores.

- [ ] **Step 3: Commit**

```bash
git add src/components/Contact.tsx
git commit -m "fix: unify contact email to samuelbonifacio015@gmail.com"
```

---

## Task 2: Fix ancho de BlogCard

**Files:**
- Modify: `src/components/BlogCard.tsx:21`

El `max-w-[70%] mx-auto` limita artificialmente el ancho de las tarjetas dentro del grid. Eliminar esa restricción para que la tarjeta ocupe el ancho de su celda.

- [ ] **Step 1: Eliminar la clase restrictiva**

En `src/components/BlogCard.tsx`, dentro del `cn(...)` (líneas 15-22), eliminar la línea 21:

```tsx
        "max-w-[70%] mx-auto"
```

El bloque resultante debe quedar:

```tsx
      className={cn(
        "glass-card rounded-xl overflow-hidden group cursor-pointer",
        "hover:border-primary/50 hover:shadow-lg hover:shadow-primary/10",
        "hover:scale-[1.02] hover:-translate-y-1",
        "transition-all duration-300",
        "opacity-0 animate-fade-in"
      )}
```

(ojo: quitar también la coma que quedaba al final de la línea `animate-fade-in`).

- [ ] **Step 2: Verificar visualmente**

Run: `npm run dev`
Expected: en `/blog`, las tarjetas ocupan el ancho completo de su celda del grid, sin quedar centradas al 70%.

- [ ] **Step 3: Commit**

```bash
git add src/components/BlogCard.tsx
git commit -m "fix: remove artificial max-width on BlogCard"
```

---

## Task 3: Fix enlaces placeholder (Translator y WePages)

**Files:**
- Modify: `src/components/Projects.tsx:98` (Translator)
- Modify: `src/components/Projects.tsx:121-122` (WePages)

Translator tiene `githubUrl="#"` (sin repo real provisto) y WePages tiene `githubUrl="#"` y `liveUrl="#"` (sin URLs provistas). Un `"#"` es truthy y renderiza un botón roto. Solución: **omitir** los campos sin URL real.

- [ ] **Step 1: Quitar el githubUrl placeholder de Translator**

En el objeto `translator` (`src/components/Projects.tsx`), eliminar la línea 98:

```tsx
      githubUrl: "#",
```

Queda solo `liveUrl: "https://translator-phi.vercel.app/",` que es real.

- [ ] **Step 2: Quitar los placeholders de WePages**

En el objeto `we-pages`, eliminar las líneas 121-122:

```tsx
      githubUrl: "#",
      liveUrl: "#",
```

WePages queda sin botones de enlace hasta que el usuario provea las URLs reales (ver Nota de ejecución 4).

- [ ] **Step 3: Verificar build**

Run: `npm run build`
Expected: build OK.

- [ ] **Step 4: Verificar visualmente**

Run: `npm run dev`
Expected: las tarjetas de Translator y WePages ya no muestran botón de GitHub roto; WePages no muestra botón de Demo.

- [ ] **Step 5: Commit**

```bash
git add src/components/Projects.tsx
git commit -m "fix: remove placeholder links from Translator and WePages"
```

---

## Task 4: Añadir proyecto LlamIA

**Files:**
- Modify: `src/components/Projects.tsx` (insertar objeto al inicio del array `projects`)
- Assets (usuario): `public/projects/LlamIA/LlamIA.png`, `LlamIA2.png`, `LlamIA3.png`

- [ ] **Step 1: Insertar el objeto LlamIA**

En `src/components/Projects.tsx`, justo después de la línea `const projects: ProjectProps[] = [` (línea 50), insertar como **primer** elemento del array:

```tsx
    {
      id: "llamia",
      title: "LlamIA",
      subtitle: "Microcursos de IA para Medicina",
      description: "Plataforma educativa de microcursos de IA para medicina. Generación de casos clínicos, quizzes y flashcards con IA.",
      logo: "/projects/LlamIA/LlamIA.png",
      image: "/projects/LlamIA/LlamIA.png",
      date: "2026 - En desarrollo (V0.5)",
      technologies: ["Next.js", "TypeScript", "Supabase", "Mercado Pago"],
      liveUrl: "https://llamia.vercel.app/",
      objective: "Hacer accesible la educación médica mediante microcursos de IA que generan casos clínicos, quizzes y flashcards personalizados para estudiantes y profesionales de la salud.",
      problem: "El estudio de la medicina exige practicar con casos clínicos variados y material de repaso, pero generarlos manualmente es lento y costoso, y no existe una herramienta que produzca contenido clínico de calidad bajo demanda.",
      technicalApproach: "Aplicación full-stack con Next.js y TypeScript, base de datos y autenticación en Supabase, y pasarela de pagos con Mercado Pago para suscripciones. La generación de contenido clínico (casos, quizzes, flashcards) se apoya en modelos de IA.",
      extendedDescription: "LlamIA es una plataforma educativa de microcursos de IA enfocada en medicina. Permite generar casos clínicos interactivos, quizzes y flashcards con IA, con onboarding, dashboard de progreso y suscripciones de pago. Actualmente en desarrollo activo (V0.5).",
      images: [
        "/projects/LlamIA/LlamIA.png",
        "/projects/LlamIA/LlamIA2.png",
        "/projects/LlamIA/LlamIA3.png"
      ]
    },
```

> Nota: `githubUrl` se omite a propósito (repo aún no provisto). Cuando se tenga, añadir `githubUrl: "https://github.com/...",` al objeto.

- [ ] **Step 2: El usuario añade los assets**

Colocar los archivos de screenshot en `public/projects/LlamIA/` con estos nombres exactos: `LlamIA.png` (principal — dashboard), `LlamIA2.png` (generación de contenido), `LlamIA3.png` (onboarding). Como mínimo `LlamIA.png` debe existir.

- [ ] **Step 3: Verificar build**

Run: `npm run build`
Expected: build OK.

- [ ] **Step 4: Verificar visualmente**

Run: `npm run dev`
Expected: LlamIA aparece como primera tarjeta; al abrir el modal se ve el carrusel y el botón "Demo en Vivo" apunta a `https://llamia.vercel.app/`.

- [ ] **Step 5: Commit**

```bash
git add src/components/Projects.tsx
git commit -m "feat: add LlamIA project"
```

---

## Task 5: Añadir proyecto Klippr

**Files:**
- Modify: `src/components/Projects.tsx` (insertar objeto tras el de LlamIA)
- Assets (usuario): `public/projects/Klippr/Klippr.png`, `Klippr2.png`, `Klippr3.png`

- [ ] **Step 1: Insertar el objeto Klippr**

En `src/components/Projects.tsx`, justo después del objeto `llamia` (antes de `we-ride`), insertar:

```tsx
    {
      id: "klippr",
      title: "Klippr",
      subtitle: "App Móvil Android",
      description: "Aplicación móvil Android desarrollada con Kotlin y Jetpack Compose, con persistencia local mediante ROOM.",
      logo: "/projects/Klippr/Klippr.png",
      image: "/projects/Klippr/Klippr.png",
      date: "2026 - En desarrollo",
      technologies: ["Kotlin", "Jetpack Compose", "ROOM"],
      githubUrl: "https://github.com/QRustOrg/Klippr-LandingPage",
      liveUrl: "https://klippr-landing-page.vercel.app/",
      objective: "Construir una aplicación móvil nativa de Android aplicando arquitectura moderna con Jetpack Compose y persistencia local con ROOM.",
      problem: "Desarrollar una app móvil nativa que funcione con almacenamiento local persistente y una interfaz declarativa moderna, aplicando buenas prácticas del ecosistema Android.",
      technicalApproach: "Desarrollo nativo en Kotlin con UI declarativa en Jetpack Compose y persistencia local mediante la librería ROOM. El producto cuenta con una landing page desplegada en Vercel.",
      extendedDescription: "Klippr es una aplicación móvil Android desarrollada en el curso de Aplicaciones Móviles usando Kotlin, Jetpack Compose y ROOM. Incluye una landing page de presentación del producto.",
      images: [
        "/projects/Klippr/Klippr.png",
        "/projects/Klippr/Klippr2.png",
        "/projects/Klippr/Klippr3.png"
      ]
    },
```

> Nota: la descripción es deliberadamente genérica respecto a la función del producto (aún sin confirmar). Refinar `description`/`extendedDescription` cuando se conozca el propósito exacto de la app.

- [ ] **Step 2: El usuario añade los assets**

Colocar en `public/projects/Klippr/` los screenshots del emulador Android: `Klippr.png` (principal), `Klippr2.png`, `Klippr3.png`. Mínimo `Klippr.png`.

- [ ] **Step 3: Verificar build**

Run: `npm run build`
Expected: build OK.

- [ ] **Step 4: Verificar visualmente**

Run: `npm run dev`
Expected: Klippr aparece como tarjeta; el modal muestra botones "Repositorio" (→ QRustOrg/Klippr-LandingPage) y "Demo en Vivo" (→ klippr-landing-page.vercel.app).

- [ ] **Step 5: Commit**

```bash
git add src/components/Projects.tsx
git commit -m "feat: add Klippr project"
```

---

## Task 6: Añadir proyecto MaquinariasJyS (MJYS)

**Files:**
- Modify: `src/components/Projects.tsx` (insertar objeto tras el de Klippr)
- Assets (usuario): `public/projects/MJYS/MJYS.png`, `MJYS2.png`, `MJYS3.png`

- [ ] **Step 1: Insertar el objeto MJYS**

En `src/components/Projects.tsx`, justo después del objeto `klippr` (antes de `we-ride`), insertar:

```tsx
    {
      id: "mjys",
      title: "MaquinariasJyS",
      subtitle: "Catálogo y Admin de Maquinarias",
      description: "Plataforma de catálogo y administración para empresa de maquinarias. Panel admin con autenticación y gestión de productos.",
      logo: "/projects/MJYS/MJYS.png",
      image: "/projects/MJYS/MJYS.png",
      date: "Mayo 2026",
      technologies: ["Next.js", "Django", "Supabase", "Render"],
      liveUrl: "https://mjys-frontend.vercel.app/home",
      objective: "Proveer a una empresa de maquinarias un catálogo web público y un panel de administración para gestionar sus productos de forma autónoma.",
      problem: "Las empresas de maquinarias suelen carecer de un catálogo digital actualizable y de un panel propio para administrar productos sin depender de terceros.",
      technicalApproach: "Frontend en Next.js desplegado en Vercel, backend en Django con base de datos en Supabase desplegado en Render. Incluye autenticación para el panel administrativo y gestión CRUD de productos.",
      extendedDescription: "MaquinariasJyS es una plataforma de catálogo y administración para una empresa de maquinarias. Ofrece un catálogo público de productos y un panel admin con autenticación para gestionarlos. Deploy completado en mayo de 2026.",
      images: [
        "/projects/MJYS/MJYS.png",
        "/projects/MJYS/MJYS2.png",
        "/projects/MJYS/MJYS3.png"
      ]
    },
```

> Nota: `githubUrl` se omite (repo aún no provisto). Añadir cuando se tenga.

- [ ] **Step 2: El usuario añade los assets**

Colocar en `public/projects/MJYS/`: `MJYS.png` (catálogo, principal), `MJYS2.png` (panel admin), `MJYS3.png`. Mínimo `MJYS.png`.

- [ ] **Step 3: Verificar build**

Run: `npm run build`
Expected: build OK.

- [ ] **Step 4: Verificar visualmente**

Run: `npm run dev`
Expected: MaquinariasJyS aparece como tarjeta; botón "Demo en Vivo" → `https://mjys-frontend.vercel.app/home`.

- [ ] **Step 5: Commit**

```bash
git add src/components/Projects.tsx
git commit -m "feat: add MaquinariasJyS project"
```

---

## Task 7: Arrays de imágenes para proyectos sin carrusel

**Files:**
- Modify: `src/components/Projects.tsx` (añadir campo `images` a 5 objetos)
- Assets (usuario): carpetas nuevas bajo `public/projects/`

Proyectos afectados: CultivApp, Libreria JSR, Finovate, PasoPerfecto, AguaConnect. Cada uno conserva su `image`/`logo` actual (en `/utils/`) y gana un array `images` apuntando a una carpeta nueva en `public/projects/{Nombre}/`.

- [ ] **Step 1: Añadir `images` a CultivApp**

En el objeto `cultivapp`, tras la propiedad `extendedDescription`, añadir (recuerda la coma antes):

```tsx
      images: [
        "/projects/CultivApp/CultivApp.png",
        "/projects/CultivApp/CultivApp2.png",
        "/projects/CultivApp/CultivApp3.png"
      ]
```

- [ ] **Step 2: Añadir `images` a Libreria JSR**

En el objeto `libreria-jsr`, tras `extendedDescription`, añadir:

```tsx
      images: [
        "/projects/LibreriaJSR/LibreriaJSR.png",
        "/projects/LibreriaJSR/LibreriaJSR2.png",
        "/projects/LibreriaJSR/LibreriaJSR3.png"
      ]
```

- [ ] **Step 3: Añadir `images` a Finovate**

En el objeto `finovate`, tras `extendedDescription`, añadir:

```tsx
      images: [
        "/projects/Finovate/Finovate.png",
        "/projects/Finovate/Finovate2.png",
        "/projects/Finovate/Finovate3.png"
      ]
```

- [ ] **Step 4: Añadir `images` a PasoPerfecto**

En el objeto `paso-perfecto`, tras `extendedDescription`, añadir:

```tsx
      images: [
        "/projects/PasoPerfecto/PasoPerfecto.png",
        "/projects/PasoPerfecto/PasoPerfecto2.png",
        "/projects/PasoPerfecto/PasoPerfecto3.png"
      ]
```

- [ ] **Step 5: Añadir `images` a AguaConnect**

En el objeto `agua-connect`, tras `extendedDescription`, añadir:

```tsx
      images: [
        "/projects/AguaConnect/AguaConnect.png",
        "/projects/AguaConnect/AguaConnect2.png",
        "/projects/AguaConnect/AguaConnect3.png"
      ]
```

- [ ] **Step 6: El usuario añade los assets**

Crear las carpetas y dejar caer 3 screenshots por proyecto con los nombres exactos anteriores en:
`public/projects/CultivApp/`, `public/projects/LibreriaJSR/`, `public/projects/Finovate/`, `public/projects/PasoPerfecto/`, `public/projects/AguaConnect/`.

- [ ] **Step 7: Verificar build**

Run: `npm run build`
Expected: build OK (los arrays son strings; no falla aunque las imágenes aún no existan).

- [ ] **Step 8: Commit**

```bash
git add src/components/Projects.tsx
git commit -m "feat: wire carousel image arrays for remaining projects"
```

---

## Task 8: Eliminar gray-matter y endurecer el parser de blog

**Files:**
- Modify: `src/lib/blogUtils.ts:64-69` (fix bug null-check)
- Modify: `package.json` (quitar dependencia)

`blogUtils.ts` ya parsea el frontmatter manualmente (no usa `gray-matter` → dependencia muerta). Además tiene un bug latente: usa `frontmatterMatch[1]` sin comprobar que el match exista; un `.md` sin frontmatter lanza un TypeError en runtime.

- [ ] **Step 1: Añadir el guard de null en `parseMarkdownPost`**

En `src/lib/blogUtils.ts`, reemplazar el bloque actual (líneas 64-69):

```tsx
function parseMarkdownPost(content: string, slug: string): BlogPost | null {
  const frontmatterMatch = content.match(/^---\s*([\s\S]*?)\s*---/);


  const frontmatterText = frontmatterMatch[1];
  const body = content.replace(frontmatterMatch[0], '');
```

por:

```tsx
function parseMarkdownPost(content: string, slug: string): BlogPost | null {
  const frontmatterMatch = content.match(/^---\s*([\s\S]*?)\s*---/);

  if (!frontmatterMatch) return null;

  const frontmatterText = frontmatterMatch[1];
  const body = content.replace(frontmatterMatch[0], '');
```

- [ ] **Step 2: Desinstalar gray-matter**

```bash
npm uninstall gray-matter
```
Expected: `gray-matter` desaparece de `dependencies` en `package.json` y de `package-lock.json`.

- [ ] **Step 3: Confirmar que nada importa gray-matter**

Run: `git grep -n "gray-matter" -- src/`
Expected: sin resultados.

- [ ] **Step 4: Verificar build**

Run: `npm run build`
Expected: build OK.

- [ ] **Step 5: Verificar el blog visualmente**

Run: `npm run dev`
Expected: en `/blog` los posts siguen listándose y abriéndose correctamente.

- [ ] **Step 6: Commit**

```bash
git add src/lib/blogUtils.ts package.json package-lock.json
git commit -m "refactor: harden blog frontmatter parser and drop unused gray-matter"
```

---

## Task 9: Eliminar @tanstack/react-query

**Files:**
- Modify: `src/App.tsx`
- Modify: `package.json`

`App.tsx` envuelve la app en `QueryClientProvider` pero no existe ninguna query (`useQuery`) en el código. Es overhead sin uso.

- [ ] **Step 1: Confirmar que solo App.tsx lo usa**

Run: `git grep -n "react-query\|useQuery\|QueryClient" -- src/`
Expected: solo coincidencias en `src/App.tsx`.

- [ ] **Step 2: Reescribir App.tsx sin react-query**

Reemplazar el contenido completo de `src/App.tsx` por:

```tsx
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import Blog from "./pages/Blog";
import BlogPostPage from "./pages/BlogPost";
import NotFound from "./pages/NotFound";

const App = () => (
  <TooltipProvider>
    <Toaster />
    <Sonner />
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Index />} />
        <Route path="/blog" element={<Blog />} />
        <Route path="/blog/:slug" element={<BlogPostPage />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </BrowserRouter>
  </TooltipProvider>
);

export default App;
```

- [ ] **Step 3: Desinstalar la dependencia**

```bash
npm uninstall @tanstack/react-query
```
Expected: desaparece de `package.json` y `package-lock.json`.

- [ ] **Step 4: Verificar build**

Run: `npm run build`
Expected: build OK, sin errores de import faltante.

- [ ] **Step 5: Verificar visualmente**

Run: `npm run dev`
Expected: la app carga (home, blog, 404) igual que antes.

- [ ] **Step 6: Commit**

```bash
git add src/App.tsx package.json package-lock.json
git commit -m "refactor: remove unused @tanstack/react-query"
```

---

## Task 10: npm audit fix

**Files:**
- Modify: `package-lock.json` (y posiblemente `package.json`)

- [ ] **Step 1: Ver el estado actual**

Run: `npm audit`
Expected: lista de vulnerabilidades (informativo).

- [ ] **Step 2: Aplicar fixes no destructivos**

```bash
npm audit fix
```
Expected: resuelve las que no requieren cambios breaking. **No** ejecutar `npm audit fix --force` (puede romper versiones mayores).

- [ ] **Step 3: Verificar que la app sigue compilando**

Run: `npm run build`
Expected: build OK.

- [ ] **Step 4: Verificar visualmente**

Run: `npm run dev`
Expected: home y blog cargan sin errores en consola.

- [ ] **Step 5: Commit**

```bash
git add package.json package-lock.json
git commit -m "chore: npm audit fix for non-breaking vulnerabilities"
```

> Nota: las vulnerabilidades restantes que solo se resolverían con `--force` se dejan documentadas; no se fuerzan en este plan para no romper el build.

---

## Task 11: Escribir README.md

**Files:**
- Modify: `README.md` (reescribir por completo)

- [ ] **Step 1: Reemplazar el contenido de README.md**

Reemplazar el contenido completo de `README.md` por:

```markdown
# Portfolio — Samuel Bonifacio

Portfolio personal de Samuel Bonifacio: proyectos, blog y formas de contacto. Single-page app construida con React + Vite + TypeScript + Tailwind.

🔗 **Live:** https://samuelbonifacio.vercel.app

## Stack

- **Framework:** React 18 + Vite 5
- **Lenguaje:** TypeScript
- **Estilos:** Tailwind CSS + shadcn/ui (Radix)
- **Routing:** React Router
- **Iconos:** lucide-react
- **Carrusel:** embla-carousel
- **Blog:** markdown (`/blog/*.md`) renderizado con react-markdown + remark-gfm
- **Formulario de contacto:** EmailJS

## Estructura

```
src/
  components/    Componentes UI (Projects, Contact, BlogCard, modales…)
  lib/           Utilidades (blogUtils, blogTypes)
  pages/         Rutas (Index, Blog, BlogPost, NotFound)
public/
  projects/      Screenshots de proyectos
blog/            Posts en markdown con frontmatter
```

## Desarrollo local

Requisitos: Node.js 18+ y npm.

```bash
# 1. Instalar dependencias
npm install

# 2. Crear .env con las claves de EmailJS (necesario para el formulario de contacto)
#    VITE_EMAILJS_SERVICE_ID=...
#    VITE_EMAILJS_TEMPLATE_ID=...
#    VITE_EMAILJS_PUBLIC_KEY=...

# 3. Levantar el servidor de desarrollo
npm run dev
```

La app queda disponible en `http://localhost:5173`.

## Scripts

| Script | Descripción |
|--------|-------------|
| `npm run dev` | Servidor de desarrollo con HMR |
| `npm run build` | Build de producción a `dist/` |
| `npm run build:dev` | Build en modo development |
| `npm run preview` | Previsualiza el build de producción |
| `npm run lint` | Ejecuta ESLint |

## Añadir un proyecto

Editar el array `projects` en `src/components/Projects.tsx` con un objeto `ProjectProps` (ver `src/components/ProjectCard.tsx` para el tipo). Colocar las imágenes en `public/projects/{Nombre}/` y referenciarlas en el campo `images`.

## Añadir un post de blog

Crear un `.md` en `blog/` con frontmatter:

```markdown
---
title: Mi título
date: 2026-06-01
category: Reflexiones
excerpt: Resumen corto
image: /ruta/opcional.png
tags: [tag1, tag2]
---

Contenido del post en markdown…
```

## Deploy

Desplegado en Vercel. Cada push a `main` dispara un nuevo deploy automático. El build de producción se genera con `npm run build` (salida en `dist/`).
```

> Nota: si la URL de producción o las variables `.env` reales difieren, ajustarlas en este paso.

- [ ] **Step 2: Commit**

```bash
git add README.md
git commit -m "docs: write full project README"
```

---

## Task 12: Verificación final e integración de la rama

**Files:** (ninguno — verificación + git)

- [ ] **Step 1: Build limpio de extremo a extremo**

Run: `npm run build`
Expected: build OK sin errores ni warnings de TypeScript.

- [ ] **Step 2: Lint**

Run: `npm run lint`
Expected: sin errores nuevos respecto al estado inicial.

- [ ] **Step 3: Revisión visual completa**

Run: `npm run dev`
Expected: 
- Home muestra LlamIA, Klippr y MaquinariasJyS además de los 9 proyectos previos.
- Email de contacto = `samuelbonifacio015@gmail.com` (href y texto).
- Translator/WePages sin botones rotos.
- `/blog` con tarjetas a ancho completo.

- [ ] **Step 4: Revisar el historial de commits de la rama**

Run: `git log --oneline main..feature/portfolio-update`
Expected: la serie de commits de las tareas 1–11.

- [ ] **Step 5: Finalizar la rama**

Usar la skill `superpowers:finishing-a-development-branch` para decidir merge a `main`, abrir PR, o limpieza, según preferencia del usuario.

---

## Self-Review (cobertura del spec)

- 1.1 Email → Task 1 ✅
- 1.2 Placeholders Translator/WePages → Task 3 ✅
- 2.1 LlamIA → Task 4 ✅
- 2.2 Klippr → Task 5 ✅
- 2.3 MJYS → Task 6 ✅
- 3.1 Imágenes carrusel faltantes → Task 7 ✅
- 3.2 BlogCard width → Task 2 ✅
- 4.1 gray-matter → Task 8 (eliminar + endurecer parser, resuelve conflicto de opciones) ✅
- 4.2 react-query → Task 9 (eliminar) ✅
- 4.3 npm audit fix → Task 10 ✅
- 4.4 README → Task 11 ✅
- "rama aparte" → Task 0 ✅

**Datos pendientes del usuario** (no bloquean ejecución; añadir con edit puntual cuando estén): repo de LlamIA, repo de MJYS, repo de Translator, repo + live de WePages, y todos los archivos PNG de screenshots.
