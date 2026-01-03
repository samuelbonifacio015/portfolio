
import { useEffect, useRef, useState } from 'react';
import TechBadge from './TechBadge';

const Technologies = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.unobserve(entry.target);
        }
      },
      {
        root: null,
        threshold: 0.1,
      }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => {
      if (sectionRef.current) {
        observer.unobserve(sectionRef.current);
      }
    };
  }, []);

  const techCategories = [
    {
      name: "Frontend",
      technologies: ["HTML", "CSS", "JavaScript", "TypeScript", "React", "Angular", "Vue", "Next.js", "Tailwind"],
    },
    {
      name: "Backend",
      technologies: ["MongoDB", "SQL", "C++", "Python", "Java", "C#", "Spring Boot", ".NET"],
    },
    {
      name: "DevOps",
      technologies: ["Git", "Docker", "AWS", "Firebase"],
    },
    {
      name: "Herramientas",
      technologies: ["VSCode", "Figma", "Postman"],
    }
  ];

  return (
    <section
      id="technologies"
      ref={sectionRef}
      className="section-padding px-4 relative bg-white dark:bg-black scroll-mt-20"
    >
      <div className="container mx-auto max-w-6xl">
        <div className={`space-y-4 text-center mb-8 sm:mb-10 md:mb-12 transition-all duration-700 ease-out ${isVisible ? 'opacity-100' : 'opacity-0 transform translate-y-8'}`}>
          <span className="inline-block px-3 py-1 text-xs sm:text-sm font-medium rounded-full bg-primary/20 text-primary">
            Stack Tecnológico
          </span>
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-foreground">Tecnologías</h2>
          <p className="text-sm sm:text-base text-muted-foreground max-w-2xl mx-auto px-4">
            Herramientas y tecnologías con las que trabajo a diario para desarrollar soluciones modernas y escalables.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 gap-4 sm:gap-6 lg:gap-8">
          {techCategories.map((category, index) => (
            <div
              key={category.name}
              className={`glass-card rounded-xl p-5 sm:p-6 transition-all duration-700 ease-out ${isVisible ? 'opacity-100' : 'opacity-0 transform translate-y-8'}`}
              style={{ transitionDelay: `${200 + index * 100}ms` }}
            >
              <h3 className="text-lg sm:text-xl font-semibold text-foreground mb-3 sm:mb-4">{category.name}</h3>
              <div className="flex flex-wrap gap-2 sm:gap-2.5">
                {category.technologies.map((tech) => (
                  <TechBadge 
                    key={tech} 
                    name={tech} 
                    className="text-sm py-1 px-3"
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
