import TechBadge from './TechBadge';

const techCategories = [
  {
    name: 'Lenguajes',
    technologies: [
      'HTML',
      'CSS',
      'JavaScript',
      'TypeScript',
      'Python',
      'Java',
      'C++',
      'C#',
      'Dart',
      'Kotlin',
    ],
  },
  {
    name: 'Frameworks',
    technologies: [
      'Node.js',
      'Django',
      'Spring Boot',
      '.NET',
      'React',
      'Vue',
      'Angular',
      'Tailwind',
      'Next.js',
      'Flutter',
      'Android',
    ],
  },
  {
    name: 'Bases de datos',
    technologies: [
      'MongoDB',
      'MySQL',
      'PostgreSQL',
      'Firebase',
    ],
  },
  {
    name: 'Herramientas',
    technologies: [
      'Git',
      'GitHub',
      'Docker',
      'Figma',
      'Obsidian',
      'VS Code',
      'Linux',
      'Arch Linux',
      'Bash',
      'Postman',
      'Render',
      'Hermes Agent',
    ],
  },
];

const Technologies = () => {
  return (
    <section id="technologies" className="scroll-mt-28 px-5 py-16 md:px-6 md:py-24">
      <div className="mx-auto max-w-[var(--container-max)]">
        <header className="mb-10 max-w-2xl">
          <h2 id="technologies-title" className="text-3xl font-bold text-foreground sm:text-4xl">
            Tecnologías
          </h2>
        </header>
        <div className="divide-y divide-border border-y border-border">
          {techCategories.map((category, index) => (
            <div key={category.name} className="grid gap-4 py-5 sm:grid-cols-[180px_minmax(0,1fr)] sm:gap-0 sm:py-6">
              <div className="flex items-baseline gap-3 sm:pr-6">
                <span className="font-mono text-[11px] tabular-nums text-muted-foreground" aria-hidden="true">
                  {String(index + 1).padStart(2, '0')}
                </span>
                <h3 className="text-sm font-semibold text-foreground sm:text-base">{category.name}</h3>
              </div>
              <div className="flex min-w-0 flex-wrap gap-2 sm:border-l sm:border-dashed sm:border-border sm:pl-6">
                {category.technologies.map((tech) => (
                  <TechBadge key={tech} name={tech} showIcon />
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
