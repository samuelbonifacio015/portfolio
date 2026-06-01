# Portfolio — Samuel Bonifacio

Portfolio personal de Samuel Bonifacio: proyectos, blog y formas de contacto. Single-page app construida con React + Vite + TypeScript + Tailwind.

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
