import { Braces, Database, Settings2, Workflow } from 'lucide-react';
import TechBadge from './TechBadge';
import { Card } from '@/components/ui/card';

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
    <section id="technologies" className="section-padding scroll-mt-28 px-5 md:px-6">
      <div className="mx-auto max-w-[var(--container-max)]">
        <div className="mb-10">
          <h2 className="text-3xl font-bold text-foreground">Tecnologías</h2>
          <p className="mt-3 max-w-2xl text-pretty text-muted-foreground">
            Herramientas y tecnologías con las que trabajo a diario para desarrollar soluciones modernas y escalables.
          </p>
        </div>

        <div className="grid gap-4 sm:grid-cols-2">
          {techCategories.map((category) => (
            <Card key={category.name} className="p-6">
              <category.icon className="mb-5 h-6 w-6 text-primary" aria-hidden="true" />
              <h3 className="text-lg font-bold text-foreground">{category.name}</h3>
              <div className="mt-4 flex flex-wrap gap-2">
                {category.technologies.map((tech) => (
                  <TechBadge key={tech} name={tech} />
                ))}
              </div>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Technologies;
