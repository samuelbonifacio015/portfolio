import { CodeXmlIcon } from 'lucide-react';

import type { ExperienceItemType } from './work-experience';
import { WorkExperience as WorkExperienceList } from './work-experience';

const experiences: ExperienceItemType[] = [
  {
    id: 'maquinarias-jys',
    companyName: 'MaquinariasJyS',
    companyLogo: '/projects/MJYS/MJYS.webp',
    companyWebsite: 'https://mjys-frontend.vercel.app/home',
    positions: [
      {
        id: 'full-stack-developer',
        title: 'Desarrollador Full-Stack',
        employmentPeriod: {
          start: '05.2026',
          end: '05.2026',
        },
        employmentType: 'Proyecto profesional',
        icon: <CodeXmlIcon />,
        description: `- Diseñé y desarrollé el catálogo público de productos para la empresa.
- Construí un panel administrativo con autenticación y gestión CRUD de productos.
- Conecté un frontend en Next.js con un backend en Django y una base de datos en Supabase.
- Coordiné el despliegue del frontend en Vercel y del backend en Render.`,
        skills: ['Next.js', 'Django', 'Supabase', 'Render'],
        isExpanded: true,
      },
    ],
  },
  {
    id: 'libreria-jsr',
    companyName: 'Librería JSR',
    companyLogo: '/utils/LibreriaJSR.webp',
    companyWebsite: 'https://libreria-jsr.vercel.app',
    companyRepository: 'https://github.com/samuelbonifacio015/Libreria-JSR',
    positions: [
      {
        id: 'web-developer',
        title: 'Desarrollador Web',
        employmentPeriod: {
          start: '12.2024',
          end: '08.2025',
        },
        employmentType: 'Proyecto personal',
        icon: <CodeXmlIcon />,
        description: `- Diseñé y desarrollé una plataforma de e-commerce para la venta de libros.
- Implementé catálogo con búsqueda y filtrado, carrito persistente en localStorage y gestión de inventario.
- Construí la interfaz responsive con HTML5 semántico, CSS3 y JavaScript vanilla.
- Organicé la lógica del proyecto con Node.js, priorizando simplicidad y rendimiento.`,
        skills: ['HTML', 'CSS', 'JavaScript', 'Node.js'],
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
        </header>

        <div className="border-y border-border py-6 sm:px-6">
          <WorkExperienceList experiences={experiences} />
        </div>
      </div>
    </section>
  );
};

export default WorkExperienceSection;
