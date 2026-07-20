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
];

const WorkExperienceSection = () => {
  return (
    <section id="experience" className="scroll-mt-28 px-5 py-16 md:px-6 md:py-24">
      <div className="mx-auto max-w-[var(--container-max)]">
        <header className="mb-10 max-w-2xl">
          <h2 className="text-3xl font-bold text-foreground sm:text-4xl">Experiencia</h2>
          <p className="mt-3 max-w-2xl text-pretty text-muted-foreground">
            Proyectos profesionales en los que he convertido necesidades reales en productos web funcionales.
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
