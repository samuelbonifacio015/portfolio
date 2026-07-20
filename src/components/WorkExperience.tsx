import { CodeXmlIcon } from 'lucide-react';

import type { ExperienceItemType } from './work-experience';
import { WorkExperience as WorkExperienceList } from './work-experience';

const experiences: ExperienceItemType[] = [
  {
    id: 'libreria-jsr',
    companyName: 'Librería JSR',
    companyLogo: '/utils/LibreriaJSR.webp',
    companyWebsite: 'https://libreria-jsr.vercel.app',
    companyRepository: 'https://github.com/samuelbonifacio015/Libreria-JSR',
    positions: [
      {
        id: 'frontend-developer',
        title: 'Frontend Developer',
        employmentPeriod: {
          start: '12.2024',
          end: '09.2025',
        },
        employmentType: 'Proyecto profesional',
        icon: <CodeXmlIcon />,
        description: `- Plataforma E-commerce para 10+ clientes concurrentes que ordenan sus productos de manera virtual.
- Reducción de tiempo de procesamiento de pedidos a través de un panel de administrador / tracking de inventario en tiempo real y confirmaciones automatizadas.
- Soporte operativo a través de servicios de impresión, fotocopiado, productos escolares y trabajos personalizados.
- Desarrollé un carrito de compras persistente con cálculo automático de totales y actualización dinámica de productos durante la navegación.`,
        skills: ['HTML', 'CSS', 'JavaScript', 'Node.js'],
        projectImage: {
          src: '/projects/LibreriaJSR/LibreriaJSR.webp',
          alt: 'Página principal de la plataforma de e-commerce de Librería JSR',
        },
        isExpanded: true,
      },
    ],
  },
  {
    id: 'maquinarias-jys',
    companyName: 'Maquinarias JYS',
    companyLogo: '/projects/MJYS/MJYS.webp',
    companyWebsite: 'https://mjys-frontend.vercel.app/home',
    positions: [
      {
        id: 'full-stack-developer',
        title: 'FullStack Developer',
        employmentPeriod: {
          start: '04.2026',
        },
        employmentType: 'Proyecto profesional',
        icon: <CodeXmlIcon />,
        description: `- Plataforma E-Commerce FullStack B2C/B2B para la comercialización de maquinarias NERA Japan & JAM TOOLS Germany.
- Frontend Next.js enfocada en la conversión con productos junto a un backend de Django REST con autenticación JWT.
- Flujo de búsqueda/compra simplificada para los clientes a través de pedidos en web/recibo en tienda.
- Impulsé ciclos de validación semanal con más de 25 clientes, recopilando pedidos, cotizaciones y feedback continuo.`,
        skills: ['Next.js', 'Django', 'Supabase', 'Render'],
        projectImage: {
          src: '/projects/MJYS/MJYS2.webp',
          alt: 'Catálogo de productos de la plataforma e-commerce de Maquinarias JYS',
        },
        isExpanded: true,
      },
    ],
    isCurrentEmployer: true,
  },
  {
    id: 'braymar',
    companyName: 'Braymar',
    companyLogo: '/projects/Braymar/braymar-logo.webp',
    companyRepository: 'https://github.com/samuelbonifacio015/Braymar-frontend',
    positions: [
      {
        id: 'full-stack-developer',
        title: 'FullStack Developer',
        employmentPeriod: {
          start: '01.2026',
          end: '04.2026',
        },
        employmentType: 'Proyecto profesional',
        icon: <CodeXmlIcon />,
        description: `- Construí un sistema de inventario, migrando gradualmente su control de stock desde procesos manuales en papel hacia un sistema digital.
- Diseñé flujos de gestión de inventario orientados a reducir errores operativos, mejorar la trazabilidad y acelerar la toma de decisiones del negocio.
- El sistema apoyó una operación más eficiente y acompañó una mejora progresiva en los ingresos de la empresa.
- Implementé un dashboard en tiempo real para monitorear métricas clave del negocio, incluyendo accesos, productos más vendidos y alertas de bajo stock.`,
        skills: ['Next.js', 'React', 'TypeScript', 'Tailwind', 'Supabase'],
        projectImage: {
          src: '/projects/Braymar/braymar-dashboard.webp',
          alt: 'Dashboard de gestión de inventario de Braymar con métricas, filtros y tabla de productos',
        },
        isExpanded: true,
      },
    ],
  },
];

const WorkExperienceSection = () => {
  return (
    <section id="experience" className="scroll-mt-28 px-5 py-16 md:px-6 md:py-24">
      <div className="mx-auto max-w-[var(--container-max)]">
        <header className="mb-10 max-w-2xl">
          <h2 className="text-3xl font-bold text-foreground sm:text-4xl">Experiencia</h2>
          <p className="mt-3 max-w-2xl text-pretty text-muted-foreground">
            Proyectos profesionales en los que he convertido ideas y necesidades reales en productos web funcionales.
          </p>
        </header>

        <div className="border-y border-border py-6 sm:px-6">
          <WorkExperienceList experiences={experiences} />
        </div>
      </div>
    </section>
  );
};

export default WorkExperienceSection;
