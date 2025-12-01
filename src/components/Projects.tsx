
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
      subtitle: "Alquiler de Vehículos",
      description: "Plataforma web para alquilar vehículos. Desarrollado con Angular y REST API con Java SpringBoot.",
      logo: "/utils/WeRide.png",
      image: "/utils/WeRide.png",
      date: "Setiembre - En desarrollo",
      technologies: ["Angular", "TypeScript", "Java"],
      githubUrl: "https://github.com/OpenSource-Grupo-4/Frontend-WeRide",
      liveUrl: "https://frontend-we-ride-lake.vercel.app",
    },
    {
      id: "cultivapp",
      title: "CultivApp",
      subtitle: "Gestión de Cultivos",
      description: "Plataforma web para gestión de cultivos agrícolas. Desarrollado con Vue y REST API con C# .NET.",
      logo: "/utils/CultivApp.png",
      image: "/utils/CultivApp.png",
      date: "Setiembre - En desarrollo",
      technologies: ["Vue", "JavaScript", "C#"],
      githubUrl: "https://github.com/Apps-Web-Grupo-4-FruTech/Frontend-FruTech",
      liveUrl: "https://frontend-frutech-static.onrender.com",
    },
    {
      id: "libreria-jsr",
      title: "Libreria JSR",
      subtitle: "Plataforma E-commerce",
      description: "Una plataforma de e-commerce con carrito de compras y sistema de gestión de inventario.",
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
      subtitle: "Gestión de Finanzas",
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
      subtitle: "Actividad Física",
      description: "Aplicación web diseñada para llevar un seguimiento eficiente de tu actividad física diaria.",
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
      subtitle: "Landing Page",
      description: "Ejemplo de Landing Page para una empresa de servicios de agua potable.",
      logo: "/utils/AguaConnect.png",
      image: "/utils/AguaConnect.png",
      date: "Marzo - Julio 2025",
      technologies: ["HTML", "CSS", "JavaScript"],
      githubUrl: "https://github.com/samuelbonifacio015/AguaConnect",
      liveUrl: "https://agua-connect-nu.vercel.app/"
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
            Mi colección personal de proyectos que he desarrollado a través del tiempo.
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
