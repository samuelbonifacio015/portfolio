
import { useEffect, useRef, useState } from 'react';
import ProjectCard, { ProjectProps } from './ProjectCard';
import TechBadge from './TechBadge';

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
      id: "we-ride",
      title: "WeRide",
      subtitle: "Aplicación de Alquiler de Vehhículos",
      description: "Plataforma web para alquilar vehículos. Desarrollado con Angular y REST API con json-server.",
      logo: "/utils/WeRide.png",
      image: "/utils/WeRide.png",
      date: "Setiembre - En desarrollo",
      technologies: ["Angular", "TypeScript", "json-server"],
      githubUrl: "https://github.com/OpenSource-Grupo-4/Frontend-WeRide",
      liveUrl: "https://frontend-we-ride-lake.vercel.app",
    },
    {
      id: "libreria-jsr",
      title: "Libreria JSR",
      subtitle: "Plataforma E-commerce",
      description: "Una plataforma de comercio electrónico con carrito de compras y sistema de gestión de inventario.",
      logo: "/utils/LibreriaJSR.png",
      image: "/utils/LibreriaJSR.png",
      date: "Diciembre 2024 - Agosto 2025",
      technologies: ["HTML", "CSS", "JavaScript"],
      githubUrl: "https://github.com/samuelbonifacio015/Libreria-JSR",
      liveUrl: "https://libreria-jsr.vercel.app",
    },
    {
      id: "finovate",
      title: "Finovate",
      subtitle: "Gestión de Finanzas Personales",
      description: "Aplicación web diseñada para gestión de finanzas personales con herramientas de seguimiento y análisis financiero.",
      logo: "/utils/Finovate.png",
      image: "/utils/Finovate.png",
      date: "Mayo 2025",
      technologies: ["React", "TypeScript", "Tailwind", "Vite"],
      githubUrl: "https://github.com/samuelbonifacio015/Finovate",
      liveUrl: "https://finovate-six.vercel.app",
    },
    {
      id: "paso-perfecto",
      title: "PasoPerfecto",
      subtitle: "Aplicación de Seguimiento de Actividad",
      description: "Aplicación web diseñada para llevar un seguimiento eficiente de tus pasos y actividad física diaria.",
      logo: "/utils/PasoPerfecto.png",
      image: "/utils/PasoPerfecto.png",
      date: "Mayo - Junio 2025",
      technologies: ["React", "TypeScript", "Tailwind", "Vite"],
      githubUrl: "https://github.com/samuelbonifacio015/PasoPerfecto",
      liveUrl: "https://paso-perfecto.vercel.app/",
    },
    {
      id: "agua-connect",
      title: "AguaConnect",
      subtitle: "Landing Page Corporativa",
      description: "Ejemplo de Landing Page para una empresa de servicios de agua potable.",
      logo: "/utils/AguaConnect.png",
      image: "/utils/AguaConnect.png",
      date: "Marzo - Julio 2025",
      technologies: ["HTML", "CSS", "JavaScript"],
      githubUrl: "https://github.com/samuelbonifacio015/AguaConnect",
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

        <div className="space-y-6">
          {projects.map((project, index) => (
            <div
              key={project.id || index}
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
