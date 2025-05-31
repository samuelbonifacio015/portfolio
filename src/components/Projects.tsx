
import { useEffect, useRef, useState } from 'react';
import ProjectCard, { ProjectProps } from './ProjectCard';

const Projects = () => {
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

  const projects: ProjectProps[] = [
    {
      title: "Libreria JSR",
      description: "Una plataforma de comercio electrónico con carrito de compras, y sistema de gestión de inventario.",
      image: "utils/LibreriaJSR.png",
      technologies: ["HTML", "CSS", "JavaScript"],
      githubUrl: "https://github.com/samuelbonifacio015/JSR-Libreria",
      liveUrl: "https://jsr-libreria.vercel.app",
    },
    {
      title: "Finovate",
      description: "Aplicación web diseñada para gestión de finanzas personales.",
      image: "utils/Finovate.png",
      technologies: ["React", "TypeScript", "Tailwind", "Vite"],
      githubUrl: "https://github.com/samuelbonifacio015/Finovate",
      liveUrl: "https://finovate-six.vercel.app",
    },
    {
      title: "AguaConnect",
      description: "Ejemplo de Landing Page para una empresa de servicios de agua potable.",
      image: "utils/AguaConnect.png",
      technologies: ["HTML", "CSS", "JavaScript"],
      githubUrl: "https://github.com/samuelbonifacio015/AguaConnect",
    },
    {
      title: "API de Microservicios",
      description: "Sistema de microservicios para procesamiento de datos en tiempo real con alta disponibilidad.",
      image: "https://images.unsplash.com/photo-1633412802994-5c058f151b66?q=80&w=2670&auto=format&fit=crop",
      technologies: ["Node.js", "Express", "Docker", "AWS"],
      githubUrl: "https://github.com",
    },
  ];

  return (
    <section
      id="projects"
      ref={sectionRef}
      className="section-padding px-4 relative"
    >
      <div className="container mx-auto max-w-6xl">
        <div className={`space-y-4 text-center mb-12 transition-all duration-700 ease-out ${isVisible ? 'opacity-100' : 'opacity-0 transform translate-y-8'}`}>
          <span className="inline-block px-3 py-1 text-xs font-medium rounded-full bg-primary/10 text-primary/90">
            Portfolio
          </span>
          <h2 className="text-3xl md:text-4xl font-bold text-white">Mis Proyectos</h2>
          <p className="text-white/70 max-w-2xl mx-auto">
            Una colección de trabajos en los que he aplicado diferentes tecnologías
            y soluciones a problemas reales.
          </p>
        </div>

        <div className={`grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-6 lg:gap-8 transition-all duration-700 delay-200 ease-out ${isVisible ? 'opacity-100' : 'opacity-0 transform translate-y-8'}`}>
          {projects.map((project, index) => (
            <div
              key={index}
              className={`transition-all duration-700 ease-out ${isVisible ? 'opacity-100' : 'opacity-0 transform translate-y-8'}`}
              style={{ transitionDelay: `${200 + index * 100}ms` }}
            >
              <ProjectCard {...project} />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Projects;
