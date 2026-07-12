import { Braces, Database, Settings2, Workflow } from 'lucide-react';
import TechBadge from './TechBadge';

const techCategories = [
  {
    name: 'Frontend',
    icon: Braces,
    technologies: ['HTML', 'CSS', 'JavaScript', 'TypeScript', 'React', 'Angular', 'Vue', 'Next.js', 'Tailwind'],
  },
  {
    name: 'Backend',
    icon: Database,
    technologies: ['MongoDB', 'SQL', 'C++', 'Python', 'Java', 'C#', 'Spring Boot', '.NET'],
  },
  {
    name: 'DevOps',
    icon: Workflow,
    technologies: ['Git', 'Docker', 'AWS', 'Firebase'],
  },
  {
    name: 'Herramientas',
    icon: Settings2,
    technologies: ['Cursor', 'Figma', 'Postman', 'TestSprite MCP', 'Claude Code'],
  },
];

const Technologies = () => {
  return (
    <section id="technologies" className="scroll-mt-28 px-5 py-16 md:px-6 md:py-24">
      <div className="mx-auto max-w-[var(--container-max)]">
        <div className="mb-10">
          <h2 className="text-3xl font-bold text-foreground">Tecnologías</h2>
          <p className="mt-3 max-w-2xl text-pretty text-muted-foreground">
            Herramientas y tecnologías con las que trabajo a diario para desarrollar soluciones modernas y escalables.
          </p>
        </div>

        <div className="divide-y divide-border border-y border-border">
          {techCategories.map((category) => (
            <div key={category.name} className="grid gap-4 py-6 sm:grid-cols-[180px_1fr] sm:items-start">
              <div className="flex items-center gap-3">
                <category.icon className="h-5 w-5 text-primary" aria-hidden="true" />
                <h3 className="text-base font-bold text-foreground">{category.name}</h3>
              </div>
              <div className="flex flex-wrap gap-2">
                {category.technologies.map((tech) => (
                  <TechBadge
                    key={tech}
                    name={tech}
                    className="hover:[background-color:color-mix(in_oklch,var(--tech-color)_14%,var(--secondary))] hover:[border-color:color-mix(in_oklch,var(--tech-color)_70%,var(--border))]"
                  />
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Technologies;
