
import { useEffect, useRef, useState } from 'react';
import KnowledgeItem from './KnowledgeItem';

const Knowledge = () => {
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

  const knowledgeItems = [
    {
      title: "Desarrollo web Frontend",
      description: "Experiencia en el desarrollo de aplicaciones web completas, desde el frontend hasta el backend."
    },
    {
      title: "Diseño UI/UX",
      description: "Creación de interfaces de usuario intuitivas y experiencias de usuario atractivas."
    },
    {
      title: "Arquitectura de software",
      description: "Diseño e implementación de arquitecturas escalables y mantenibles."
    },
    {
      title: "Bases de datos",
      description: "Conocimiento en bases de datos relacionales (SQL) y no relacionales (NoSQL)."
    },
    {
      title: "DevOps",
      description: "Implementación de pipelines CI/CD y despliegue de aplicaciones en la nube."
    },
    {
      title: "Metodologías ágiles",
      description: "Experiencia trabajando con Scrum, Kanban y otras metodologías ágiles."
    },
  ];

  return (
    <section
      id="knowledge"
      ref={sectionRef}
      className="section-padding px-4 relative scroll-mt-20"
    >
      <div className="container mx-auto max-w-6xl">
        <div className={`space-y-4 text-center mb-12 transition-all duration-700 ease-out ${isVisible ? 'opacity-100' : 'opacity-0 transform translate-y-8'}`}>
          <span className="inline-block px-3 py-1 text-xs font-medium rounded-full bg-primary/10 text-primary/90">
            Experiencia
          </span>
          <h2 className="text-3xl md:text-4xl font-bold text-white">Conocimientos</h2>
          <p className="text-white/70 max-w-2xl mx-auto">
            Áreas en las que he trabajado a lo largo de mi carrera como desarrollador.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {knowledgeItems.map((item, index) => (
            <div
              key={index}
              className={`transition-all duration-700 ease-out ${isVisible ? 'opacity-100' : 'opacity-0 transform translate-y-8'}`}
              style={{ transitionDelay: `${200 + index * 100}ms` }}
            >
              <KnowledgeItem
                title={item.title}
                description={item.description}
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Knowledge;
