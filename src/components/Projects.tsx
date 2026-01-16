import { useEffect, useRef, useState } from 'react';
import { ProjectProps } from './ProjectCard';
import ProjectGridCard from './ProjectGridCard';
import ProjectModal from './ProjectModal';

const Projects = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const [isVisible, setIsVisible] = useState(false);
  const [selectedProject, setSelectedProject] = useState<ProjectProps | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

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

  // Modal funciones
  const handleOpenModal = (project: ProjectProps) => {
    setSelectedProject(project);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setTimeout(() => {
      setSelectedProject(null);
    }, 200);
  };

  const projects: ProjectProps[] = [
    {
      id: "we-ride",
      title: "WeRide",
      subtitle: "Alquiler de Vehículos",
      description: "Plataforma web para alquilar vehículos. Desarrollado con Angular y REST API con Java SpringBoot.",
      logo: "/projects/WeRide/WeRide.png",
      image: "/projects/WeRide/WeRide.png",
      date: "Setiembre - En desarrollo",
      technologies: ["Angular", "TypeScript", "Java", "Spring Boot"],
      githubUrl: "https://github.com/samuelbonifacio015/Frontend-WeRide",
      liveUrl: "https://frontend-we-ride.vercel.app",
      objective: "Desarrollar una plataforma web completa para facilitar el alquiler de vehículos, conectando propietarios con usuarios que necesitan transporte temporal de manera segura y eficiente.",
      problem: "La falta de una plataforma centralizada y confiable para el alquiler de vehículos dificulta el proceso tanto para propietarios como para usuarios, generando desconfianza y procesos manuales ineficientes.",
      technicalApproach: "Arquitectura frontend con Angular para una experiencia de usuario reactiva y moderna, combinada con una API REST robusta desarrollada en Java SpringBoot que garantiza seguridad, escalabilidad y manejo eficiente de transacciones y reservas.",
      extendedDescription: "WeRide es una solución integral que incluye sistema de autenticación, gestión de reservas, pagos integrados, y un panel de administración completo. La aplicación prioriza la seguridad de los datos y la experiencia del usuario en cada interacción.",
      images: [
        "/projects/WeRide/WeRide.png",
        "/projects/WeRide/WeRide1.png",
        "/projects/WeRide/WeRide2.png",
        "/projects/WeRide/WeRide3.png"
      ]
    },
    {
      id: "cultivapp",
      title: "CultivApp",
      subtitle: "Gestión de Cultivos",
      description: "Plataforma web para gestión de cultivos agrícolas. Desarrollado con Vue y REST API con C# .NET.",
      logo: "/utils/CultivApp.png",
      image: "/utils/CultivApp.png",
      date: "Setiembre - En desarrollo",
      technologies: ["Vue", "JavaScript", "C#", ".NET"],
      githubUrl: "https://github.com/Apps-Web-Grupo-4-FruTech/Frontend-FruTech",
      liveUrl: "https://frontend-frutech-static.onrender.com",
      objective: "Proporcionar a los agricultores una herramienta digital moderna para gestionar sus cultivos, optimizar recursos y mejorar la productividad mediante el seguimiento detallado de sus actividades agrícolas.",
      problem: "Los agricultores enfrentan dificultades para llevar un registro organizado de sus cultivos, planificar rotaciones, gestionar recursos y tomar decisiones basadas en datos históricos, lo que limita su capacidad de optimización.",
      technicalApproach: "Frontend desarrollado con Vue.js para una interfaz intuitiva y reactiva, mientras que el backend utiliza C# .NET para proporcionar una API robusta con capacidades de procesamiento de datos agrícolas, generación de reportes y análisis predictivo.",
      extendedDescription: "CultivApp ofrece funcionalidades como registro de siembras, seguimiento de crecimiento, gestión de recursos (agua, fertilizantes), alertas de mantenimiento, y generación de reportes que ayudan a los agricultores a tomar decisiones informadas."
    },
    {
      id: "translator",
      title: "Translator",
      subtitle: "Traducción de Textos",
      description: "Aplicación web para traducción de textos utilizando la API de Google Translate.",
      logo: "/utils/Translator.png",
      image: "/utils/Translator.png",
      date: "Agosto 2025",
      technologies: ["Electron", "React", "TypeScript", "JavaScript", "Tailwind", "Vite"],
      githubUrl: "#",
      liveUrl: "https://translator-phi.vercel.app/",
      objective: "Desarrollar una aplicación web que facilite la traducción rápida y precisa de textos entre múltiples idiomas utilizando la API de Google Translate, mejorando la comunicación y accesibilidad para los usuarios.",
      problem: "La barrera del idioma puede dificultar la comunicación efectiva en un mundo globalizado, y muchas herramientas de traducción existentes no son lo suficientemente accesibles o fáciles de usar para todos los usuarios.",
      technicalApproach: "Construcción de una interfaz de usuario intuitiva con React y TypeScript para garantizar una experiencia fluida, junto con Tailwind CSS para un diseño atractivo y responsivo. La integración con la API de Google Translate permite traducciones rápidas y precisas.",
      extendedDescription: "Translator ofrece una interfaz simple donde los usuarios pueden ingresar texto, seleccionar idiomas de origen y destino, y obtener traducciones instantáneas. La aplicación también incluye características como historial de traducciones y opciones de personalización para mejorar la experiencia del usuario."
      ,
      images: [
        "/utils/Translator.png"
      ]
    },
    {
      id: "we-pages",
      title: "WePages",
      subtitle: "Servicio de Web Apps",
      description: "Servicio de creación de Landing Pages y Web Apps personalizadas para pequeñas empresas y emprendedores.",
      logo: "/projects/WePages/WePages.png",
      image: "/projects/WePages/WePages.png",
      date: "En desarrollo",
      technologies: ["Next.js", "TypeScript", "Tailwind", "Vercel"],
      githubUrl: "#",
      liveUrl: "#",
      objective: "Ofrecer un servicio accesible y personalizado de creación de Landing Pages y Web Apps para pequeñas empresas y emprendedores, ayudándoles a establecer una presencia en línea efectiva y profesional.",
      problem: "Muchas pequeñas empresas y emprendedores carecen de los recursos o conocimientos técnicos para desarrollar una presencia web profesional, lo que limita su capacidad para atraer clientes y crecer en el mercado digital.",
      technicalApproach: "Utilización de Next.js para construir aplicaciones web rápidas y optimizadas, combinadas con TypeScript para garantizar la calidad del código y Tailwind CSS para un diseño moderno y responsivo. El despliegue se realiza en Vercel para asegurar un rendimiento óptimo y escalabilidad.",
      extendedDescription: "WePages ofrece servicios personalizados que incluyen diseño de Landing Pages atractivas, desarrollo de Web Apps funcionales, optimización SEO, y soporte continuo. El enfoque se centra en entender las necesidades del cliente y entregar soluciones que impulsen su éxito en línea."
      ,
      images: [
        "/projects/WePages/WePages.png",
        "/projects/WePages/WePages2.png",
      ]
    },
    {
      id: "libreria-jsr",
      title: "Libreria JSR",
      subtitle: "Plataforma E-commerce",
      description: "Una plataforma de e-commerce con carrito de compras y sistema de gestión de inventario.",
      logo: "/utils/LibreriaJSR.png",
      image: "/utils/LibreriaJSR.png",
      date: "Diciembre 2024 - Agosto 2025",
      technologies: ["HTML", "CSS", "JavaScript", "Node.js"],
      githubUrl: "https://github.com/samuelbonifacio015/Libreria-JSR",
      liveUrl: "https://libreria-jsr.vercel.app",
      objective: "Crear una plataforma de e-commerce funcional y accesible para la venta de libros, demostrando habilidades en desarrollo web frontend con tecnologías fundamentales.",
      problem: "La necesidad de una solución de e-commerce simple pero completa que permita gestionar productos, carrito de compras e inventario sin depender de frameworks complejos, ideal para proyectos educativos o pequeñas empresas.",
      technicalApproach: "Desarrollo utilizando HTML5 semántico, CSS3 moderno con flexbox y grid para layouts responsivos, y JavaScript vanilla para la lógica de negocio, gestión de estado del carrito y manipulación del DOM, priorizando la simplicidad y el rendimiento.",
      extendedDescription: "La plataforma incluye catálogo de productos con búsqueda y filtrado, carrito de compras persistente en localStorage, gestión de inventario, y una interfaz de usuario intuitiva diseñada para facilitar la experiencia de compra."
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
      objective: "Desarrollar una aplicación web moderna que ayude a los usuarios a gestionar sus finanzas personales de manera efectiva, proporcionando herramientas de seguimiento, análisis y planificación financiera.",
      problem: "Muchas personas tienen dificultades para mantener un control adecuado de sus finanzas personales, careciendo de herramientas visuales e intuitivas que les permitan entender sus gastos, ingresos y tendencias financieras de manera clara.",
      technicalApproach: "Stack moderno con React y TypeScript para type-safety y desarrollo escalable, Tailwind CSS para diseño rápido y consistente, y Vite como build tool para optimización de rendimiento. La aplicación utiliza estado local y componentes reutilizables para una arquitectura limpia.",
      extendedDescription: "Finovate ofrece funcionalidades como registro de transacciones, categorización de gastos, visualización de gráficos y estadísticas, establecimiento de presupuestos, y análisis de tendencias financieras para ayudar a los usuarios a tomar mejores decisiones económicas."
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
      objective: "Crear una aplicación web que motive y ayude a los usuarios a mantener un estilo de vida activo mediante el seguimiento detallado de su actividad física diaria y el establecimiento de metas personales.",
      problem: "Las personas que buscan mejorar su condición física necesitan una herramienta simple y accesible para registrar y visualizar su progreso, sin la complejidad de aplicaciones móviles o dispositivos especializados.",
      technicalApproach: "Desarrollo con React y TypeScript para una base sólida y mantenible, Tailwind CSS para un diseño moderno y responsive, y Vite para un desarrollo ágil. La aplicación utiliza componentes funcionales con hooks para gestión de estado y efectos secundarios.",
      extendedDescription: "PasoPerfecto permite registrar pasos, distancia recorrida, tiempo de actividad y calorías quemadas. Incluye visualización de estadísticas diarias y semanales, establecimiento de metas personalizadas, y un sistema de logros para mantener la motivación del usuario."
    },
    {
      id: "timex-js",
      title: "Timex.js",
      subtitle: "Reloj",
      description: "Aplicación web de reloj con funcionalidades de tiempo real, cronómetro y pomodoro.",
      logo: "/projects/TimexJS/TimexJS.png",
      image: "/projects/TimexJS/TimexJS.png",
      date: "Junio - Enero 2026",
      technologies: ["React", "TypeScript", "Tailwind", "Vite"],
      githubUrl: "https://github.com/samuelbonifacio015/Timex.js",
      liveUrl: "https://timex-js.vercel.app/",
      objective: "Desarrollar una aplicación web de reloj multifuncional que incluya funcionalidades de tiempo real, cronómetro y técnica pomodoro para mejorar la productividad de los usuarios.",
      problem: "Los usuarios necesitan herramientas accesibles y fáciles de usar para gestionar su tiempo de manera efectiva, pero muchas aplicaciones existentes son complicadas o requieren instalaciones adicionales.",
      technicalApproach: "Utilización de React y TypeScript para una estructura sólida y escalable, Tailwind CSS para un diseño atractivo y responsivo, y Vite para un entorno de desarrollo rápido. La aplicación hace uso de hooks para manejar el estado del tiempo y efectos secundarios.",
      extendedDescription: "Timex.js ofrece un reloj en tiempo real con opciones personalizables, un cronómetro preciso con funciones de inicio, pausa y reinicio, y un temporizador pomodoro que ayuda a los usuarios a dividir su trabajo en intervalos manejables con descansos regulares.",
      images: [
        "/projects/TimexJS/TimexJS.png",
        "/projects/TimexJS/TimexJS2.png",
        "/projects/TimexJS/TimexJS3.png",
      ]
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
      liveUrl: "https://agua-connect-nu.vercel.app/",
      objective: "Desarrollar una landing page atractiva y funcional para una empresa de servicios de agua potable, enfocada en convertir visitantes en clientes mediante un diseño persuasivo y una experiencia de usuario optimizada.",
      problem: "Las empresas de servicios necesitan una presencia web profesional que comunique efectivamente sus servicios, genere confianza y facilite el contacto con clientes potenciales, sin requerir una inversión en desarrollo complejo.",
      technicalApproach: "Landing page desarrollada con HTML5 semántico para SEO, CSS3 con animaciones suaves y diseño responsive, y JavaScript para interactividad como formularios de contacto, navegación suave y efectos visuales que mejoran la experiencia del usuario.",
      extendedDescription: "AguaConnect presenta una landing page moderna con secciones de hero, servicios, beneficios, testimonios y formulario de contacto. El diseño prioriza la claridad del mensaje, la facilidad de navegación y la conversión de visitantes en leads."
    },
  ];

  return (
    <section
      id="projects"
      ref={sectionRef}
      className="section-padding px-4 relative scroll-mt-20"
    >
      <div className="container mx-auto max-w-6xl">
        <div className={`space-y-4 text-center mb-12 transition-all duration-700 ease-out ${isVisible ? 'opacity-100' : 'opacity-0 transform translate-y-8'}`}>
          <span className="inline-block px-3 py-1 text-xs font-medium rounded-full bg-primary/20 text-primary">
            Portfolio
          </span>
          <h2 className="text-3xl md:text-4xl font-bold text-foreground">Mis Proyectos</h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Mi colección personal de proyectos que he desarrollado a través del tiempo.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
          {projects.map((project, index) => (
            <div
              key={project.id || index}
              className={`transition-all duration-700 ease-out ${isVisible ? 'opacity-100' : 'opacity-0 transform translate-y-8'}`}
              style={{ transitionDelay: `${200 + index * 100}ms` }}
            >
              <ProjectGridCard
                {...project}
                onClick={() => handleOpenModal(project)}
              />
            </div>
          ))}
        </div>
      </div>

      <ProjectModal
        project={selectedProject}
        isOpen={isModalOpen}
        onClose={handleCloseModal}
      />
    </section>
  );
};

export default Projects;
