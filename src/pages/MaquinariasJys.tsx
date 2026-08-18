import { useEffect } from 'react';
import { ArrowLeft, ArrowUpRight, Database, Server, Store } from 'lucide-react';
import { Link } from 'react-router-dom';
import Footer from '@/components/Footer';
import Navbar from '@/components/Navbar';
import TechBadge from '@/components/TechBadge';
import { Button } from '@/components/ui/button';

const screenshots = [
  {
    src: '/projects/MJYS/jys-home.webp',
    alt: 'Página de inicio pública de Maquinarias JYS con el mensaje Precisión, rendimiento',
    caption: 'Inicio: propuesta comercial y acceso directo al catálogo.',
  },
  {
    src: '/projects/MJYS/jys-catalog.webp',
    alt: 'Catálogo público de Maquinarias JYS con filtros y tarjetas de productos',
    caption: 'Catálogo: exploración de productos mediante categorías y filtros.',
  },
  {
    src: '/projects/MJYS/jys-product.webp',
    alt: 'Detalle público de un motor gasolinero en Maquinarias JYS',
    caption: 'Producto: especificaciones, disponibilidad pública y acción de compra.',
  },
];

const stack = ['Next.js', 'TypeScript', 'Django REST', 'Supabase', 'PostgreSQL', 'Vercel', 'Render'];

const MaquinariasJys = () => {
  useEffect(() => {
    const previousTitle = document.title;
    const description = document.querySelector<HTMLMetaElement>('meta[name="description"]');
    const canonical = document.querySelector<HTMLLinkElement>('link[rel="canonical"]');
    const previousDescription = description?.content;
    const previousCanonical = canonical?.href;

    document.title = 'Maquinarias JYS — Caso técnico de Samuel Bonifacio';
    if (description) description.content = 'Caso técnico de Maquinarias JYS: plataforma e-commerce B2C/B2B desarrollada por Samuel Bonifacio con Next.js, Django REST y PostgreSQL.';
    if (canonical) canonical.href = 'https://samuelbonifacio.vercel.app/projects/maquinarias-jys';

    return () => {
      document.title = previousTitle;
      if (description && previousDescription) description.content = previousDescription;
      if (canonical && previousCanonical) canonical.href = previousCanonical;
    };
  }, []);

  return (
    <div className="min-h-screen bg-background text-foreground">
      <Navbar />
      <main className="px-5 pb-20 pt-28 md:px-6 md:pb-28 md:pt-36">
        <article className="mx-auto max-w-[var(--container-max)]">
          <Link to="/#experience" className="inline-flex items-center gap-2 text-sm font-semibold text-muted-foreground underline-offset-4 hover:text-foreground hover:underline focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring">
            <ArrowLeft className="h-4 w-4" aria-hidden="true" />
            Volver a Experiencia
          </Link>

          <header className="mt-10 border-b border-border pb-12">
            <p className="font-mono text-xs font-medium uppercase tracking-[0.14em] text-muted-foreground">Caso técnico · Proyecto profesional</p>
            <h1 className="mt-4 text-balance text-[clamp(2.8rem,8vw,5.8rem)] font-extrabold leading-[0.92] tracking-[-0.04em]">Maquinarias JYS</h1>
            <p className="mt-6 max-w-2xl text-pretty text-lg leading-8 text-muted-foreground">
              Plataforma e-commerce B2C/B2B para comercializar maquinaria y conectar el catálogo público con una operación interna de inventario.
            </p>

            <div className="mt-7 flex flex-wrap gap-2">
              {stack.map((technology) => <TechBadge key={technology} name={technology} showIcon />)}
            </div>

            <div className="mt-8 flex flex-wrap gap-3">
              <Button asChild size="lg">
                <a href="https://maquinariasjys.com/" target="_blank" rel="noopener noreferrer">
                  Visitar aplicación <ArrowUpRight aria-hidden="true" />
                </a>
              </Button>
              <Button asChild size="lg" variant="outline">
                <a href="https://maquinariasjys.com/shop" target="_blank" rel="noopener noreferrer">Ver catálogo</a>
              </Button>
            </div>
          </header>

          <section className="grid gap-10 border-b border-border py-12 md:grid-cols-[0.75fr_1.25fr]">
            <div>
              <p className="font-mono text-xs font-medium uppercase tracking-[0.14em] text-muted-foreground">01 · Contexto</p>
              <h2 className="mt-3 text-3xl font-bold">Del catálogo a la operación</h2>
            </div>
            <div className="space-y-5 text-base leading-7 text-muted-foreground">
              <p>
                El negocio necesitaba presentar maquinaria a compradores finales y empresas sin convertir la web pública en una réplica de sus procesos internos. El reto fue construir una experiencia de consulta y compra clara, conectada con una fuente operativa más amplia.
              </p>
              <p>
                Trabajo como desarrollador full-stack principal: implemento la experiencia en Next.js y TypeScript, la API en Django REST y la integración con Supabase/PostgreSQL, además de los despliegues en Vercel y Render.
              </p>
            </div>
          </section>

          <section className="border-b border-border py-12">
            <p className="font-mono text-xs font-medium uppercase tracking-[0.14em] text-muted-foreground">02 · Evidencia</p>
            <div className="mt-6 grid gap-px overflow-hidden rounded-xl border border-border bg-border sm:grid-cols-3">
              <div className="bg-background p-6">
                <Store className="h-5 w-5 text-primary" aria-hidden="true" />
                <p className="mt-8 text-4xl font-bold tabular-nums">3</p>
                <p className="mt-1 text-sm text-muted-foreground">almacenes integrados en la operación</p>
              </div>
              <div className="bg-background p-6">
                <Database className="h-5 w-5 text-primary" aria-hidden="true" />
                <p className="mt-8 text-4xl font-bold tabular-nums">577</p>
                <p className="mt-1 text-sm text-muted-foreground">registros internos de inventario</p>
              </div>
              <div className="bg-background p-6">
                <Server className="h-5 w-5 text-primary" aria-hidden="true" />
                <p className="mt-8 text-2xl font-bold">Full-stack</p>
                <p className="mt-2 text-sm text-muted-foreground">responsabilidad principal de producto</p>
              </div>
            </div>
            <p className="mt-4 max-w-3xl text-sm leading-6 text-muted-foreground">
              Los 577 registros pertenecen al inventario interno. El catálogo público es una selección curada y, por privacidad, no expone stock exacto, pedidos, endpoints internos ni información administrativa.
            </p>
          </section>

          <section className="border-b border-border py-12">
            <div className="grid gap-10 md:grid-cols-[0.75fr_1.25fr]">
              <div>
                <p className="font-mono text-xs font-medium uppercase tracking-[0.14em] text-muted-foreground">03 · Arquitectura</p>
                <h2 className="mt-3 text-3xl font-bold">Separación por responsabilidades</h2>
              </div>
              <div>
                <ol className="divide-y divide-border border-y border-border">
                  <li className="grid gap-2 py-5 sm:grid-cols-[120px_1fr]">
                    <span className="font-mono text-xs font-semibold uppercase tracking-wider text-foreground">Interfaz</span>
                    <span className="text-sm leading-6 text-muted-foreground">Next.js y TypeScript entregan el catálogo público y los flujos de interacción.</span>
                  </li>
                  <li className="grid gap-2 py-5 sm:grid-cols-[120px_1fr]">
                    <span className="font-mono text-xs font-semibold uppercase tracking-wider text-foreground">API</span>
                    <span className="text-sm leading-6 text-muted-foreground">Django REST concentra autenticación, reglas de negocio y acceso controlado a los datos.</span>
                  </li>
                  <li className="grid gap-2 py-5 sm:grid-cols-[120px_1fr]">
                    <span className="font-mono text-xs font-semibold uppercase tracking-wider text-foreground">Datos</span>
                    <span className="text-sm leading-6 text-muted-foreground">Supabase/PostgreSQL mantiene el catálogo y el inventario operativo como fuentes diferenciadas.</span>
                  </li>
                  <li className="grid gap-2 py-5 sm:grid-cols-[120px_1fr]">
                    <span className="font-mono text-xs font-semibold uppercase tracking-wider text-foreground">Entrega</span>
                    <span className="text-sm leading-6 text-muted-foreground">Vercel sirve el frontend y Render ejecuta el backend, con contratos públicos limitados a la información necesaria.</span>
                  </li>
                </ol>
              </div>
            </div>
          </section>

          <section className="py-12">
            <p className="font-mono text-xs font-medium uppercase tracking-[0.14em] text-muted-foreground">04 · Producto en producción</p>
            <h2 className="mt-3 text-3xl font-bold">Recorrido público</h2>
            <div className="mt-8 space-y-10">
              {screenshots.map((screenshot) => (
                <figure key={screenshot.src}>
                  <div className="overflow-hidden rounded-xl border border-border bg-muted">
                    <img src={screenshot.src} alt={screenshot.alt} width={1440} height={900} className="h-auto w-full" loading="lazy" decoding="async" />
                  </div>
                  <figcaption className="mt-3 text-sm text-muted-foreground">{screenshot.caption}</figcaption>
                </figure>
              ))}
            </div>
          </section>

          <section className="border-t border-border pt-12">
            <h2 className="text-3xl font-bold">Explora el producto</h2>
            <p className="mt-3 max-w-2xl text-muted-foreground">La aplicación pública permite revisar la propuesta comercial, navegar el catálogo y consultar el detalle de cada producto.</p>
            <div className="mt-6 flex flex-wrap gap-3">
              <Button asChild><a href="https://maquinariasjys.com/" target="_blank" rel="noopener noreferrer">Abrir Maquinarias JYS <ArrowUpRight aria-hidden="true" /></a></Button>
              <Button asChild variant="outline"><Link to="/#contact">Contactar a Samuel</Link></Button>
            </div>
          </section>
        </article>
      </main>
      <Footer />
    </div>
  );
};

export default MaquinariasJys;
