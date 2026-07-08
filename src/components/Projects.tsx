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
      id: "llamia",
      title: "LlamIA",
      subtitle: "Microcursos de IA para Medicina",
      description: "Plataforma educativa de microcursos de IA para medicina. Generación de casos clínicos, quizzes y flashcards con IA.",
      logo: "/projects/LlamIA/LlamIA.webp",
      image: "/projects/LlamIA/LlamIA.webp",
      date: "2026 - En desarrollo (V0.5)",
      technologies: ["Next.js", "TypeScript", "Supabase", "Mercado Pago"],
      liveUrl: "https://llamia.vercel.app/",
      objective: "Hacer accesible la educación médica mediante microcursos de IA que generan casos clínicos, quizzes y flashcards personalizados para estudiantes y profesionales de la salud.",
      problem: "El estudio de la medicina exige practicar con casos clínicos variados y material de repaso, pero generarlos manualmente es lento y costoso, y no existe una herramienta que produzca contenido clínico de calidad bajo demanda.",
      technicalApproach: "Aplicación full-stack con Next.js y TypeScript, base de datos y autenticación en Supabase, y pasarela de pagos con Mercado Pago para suscripciones. La generación de contenido clínico (casos, quizzes, flashcards) se apoya en modelos de IA.",
      extendedDescription: "LlamIA es una plataforma educativa de microcursos de IA enfocada en medicina. Permite generar casos clínicos interactivos, quizzes y flashcards con IA, con onboarding, dashboard de progreso y suscripciones de pago. Actualmente en desarrollo activo (V0.5).",
      images: [
        "/projects/LlamIA/LlamIA.webp",
        "/projects/LlamIA/LlamIA2.webp",
        "/projects/LlamIA/LlamIA3.webp"
      ]
    },
    {
      id: "klippr",
      title: "Klippr",
      subtitle: "App Móvil Android",
      description: "Aplicación móvil Android desarrollada con Kotlin y Jetpack Compose, con persistencia local mediante ROOM.",
      logo: "/projects/Klippr/Klippr.webp",
      image: "/projects/Klippr/Klippr.webp",
      date: "2026 - En desarrollo",
      technologies: ["Kotlin", "Jetpack Compose", "ROOM"],
      githubUrl: "https://github.com/QRustOrg/Klippr-LandingPage",
      liveUrl: "https://klippr-landing-page.vercel.app/",
      objective: "Construir una aplicación móvil nativa de Android aplicando arquitectura moderna con Jetpack Compose y persistencia local con ROOM.",
      problem: "Desarrollar una app móvil nativa que funcione con almacenamiento local persistente y una interfaz declarativa moderna, aplicando buenas prácticas del ecosistema Android.",
      technicalApproach: "Desarrollo nativo en Kotlin con UI declarativa en Jetpack Compose y persistencia local mediante la librería ROOM. El producto cuenta con una landing page desplegada en Vercel.",
      extendedDescription: "Klippr es una aplicación móvil Android desarrollada en el curso de Aplicaciones Móviles usando Kotlin, Jetpack Compose y ROOM. Incluye una landing page de presentación del producto.",
      images: [
        "/projects/Klippr/Klippr.webp",
        "/projects/Klippr/Klippr2.webp",
        "/projects/Klippr/Klippr3.webp"
      ]
    },
    {
      id: "mjys",
      title: "MaquinariasJyS",
      subtitle: "Catálogo y Admin de Maquinarias",
      description: "Plataforma de catálogo y administración para empresa de maquinarias. Panel admin con autenticación y gestión de productos.",
      logo: "/projects/MJYS/MJYS.webp",
      image: "/projects/MJYS/MJYS.webp",
      date: "Mayo 2026",
      technologies: ["Next.js", "Django", "Supabase", "Render"],
      liveUrl: "https://mjys-frontend.vercel.app/home",
      objective: "Proveer a una empresa de maquinarias un catálogo web público y un panel de administración para gestionar sus productos de forma autónoma.",
      problem: "Las empresas de maquinarias suelen carecer de un catálogo digital actualizable y de un panel propio para administrar productos sin depender de terceros.",
      technicalApproach: "Frontend en Next.js desplegado en Vercel, backend en Django con base de datos en Supabase desplegado en Render. Incluye autenticación para el panel administrativo y gestión CRUD de productos.",
      extendedDescription: "MaquinariasJyS es una plataforma de catálogo y administración para una empresa de maquinarias. Ofrece un catálogo público de productos y un panel admin con autenticación para gestionarlos. Deploy completado en mayo de 2026.",
      images: [
        "/projects/MJYS/MJYS.webp",
        "/projects/MJYS/MJYS2.webp",
        "/projects/MJYS/MJYS3.webp"
      ]
    },
    {
      id: "we-ride",
      title: "WeRide",
      subtitle: "Alquiler de Vehículos",
      description: "Plataforma web para alquilar vehículos. Desarrollado con Angular y REST API con Java SpringBoot.",
      logo: "/projects/WeRide/WeRide.webp",
      image: "/projects/WeRide/WeRide.webp",
      date: "Setiembre - En desarrollo",
      technologies: ["Angular", "TypeScript", "Java", "Spring Boot"],
      githubUrl: "https://github.com/samuelbonifacio015/Frontend-WeRide",
      liveUrl: "https://frontend-we-ride.vercel.app",
      objective: "Desarrollar una plataforma web completa para facilitar el alquiler de vehículos, conectando propietarios con usuarios que necesitan transporte temporal de manera segura y eficiente.",
      problem: "La falta de una plataforma centralizada y confiable para el alquiler de vehículos dificulta el proceso tanto para propietarios como para usuarios, generando desconfianza y procesos manuales ineficientes.",
      technicalApproach: "Arquitectura frontend con Angular para una experiencia de usuario reactiva y moderna, combinada con una API REST robusta desarrollada en Java SpringBoot que garantiza seguridad, escalabilidad y manejo eficiente de transacciones y reservas.",
      extendedDescription: "WeRide es una solución integral que incluye sistema de autenticación, gestión de reservas, pagos integrados, y un panel de administración completo. La aplicación prioriza la seguridad de los datos y la experiencia del usuario en cada interacción.",
      images: [
        "/projects/WeRide/WeRide.webp",
        "/projects/WeRide/WeRide1.webp",
        "/projects/WeRide/WeRide2.webp",
        "/projects/WeRide/WeRide3.webp"
      ]
    },
    {
      id: "cultivapp",
      title: "CultivApp",
      subtitle: "Gestión de Cultivos",
      description: "Plataforma web para gestión de cultivos agrícolas. Desarrollado con Vue y REST API con C# .NET.",
      logo: "/utils/CultivApp.webp",
      image: "/utils/CultivApp.webp",
      date: "Setiembre - Diciembre 2025",
      technologies: ["Vue", "JavaScript", "C#", ".NET"],
      githubUrl: "https://github.com/Apps-Web-Grupo-4-FruTech/Frontend-FruTech",
      objective: "Proporcionar a los agricultores una herramienta digital moderna para gestionar sus cultivos, optimizar recursos y mejorar la productividad mediante el seguimiento detallado de sus actividades agrícolas.",
      problem: "Los agricultores enfrentan dificultades para llevar un registro organizado de sus cultivos, planificar rotaciones, gestionar recursos y tomar decisiones basadas en datos históricos, lo que limita su capacidad de optimización.",
      technicalApproach: "Frontend desarrollado con Vue.js para una interfaz intuitiva y reactiva, mientras que el backend utiliza C# .NET para proporcionar una API robusta con capacidades de procesamiento de datos agrícolas, generación de reportes y análisis predictivo.",
      extendedDescription: "CultivApp ofrece funcionalidades como registro de siembras, seguimiento de crecimiento, gestión de recursos (agua, fertilizantes), alertas de mantenimiento, y generación de reportes que ayudan a los agricultores a tomar decisiones informadas.",
      images: [
        "/utils/CultivApp.webp"
      ]
    },
    {
      id: "translator",
      title: "Translator",
      subtitle: "Traducción de Textos",
      description: "Aplicación web para traducción de textos utilizando la API de TAS (Open Source).",
      logo: "/projects/Translator/Translator.webp",
      image: "/projects/Translator/Translator.webp",
      date: "Enero 2026 - En desarrollo",
      technologies: ["Electron", "React", "TypeScript", "JavaScript", "Tailwind", "Vite"],
      liveUrl: "https://translator-phi.vercel.app/",
      objective: "Desarrollar una aplicación de escritorio que facilite la traducción de textos entre múltiples idiomas utilizando la API de TAS (Open Source).",
      problem: "Gran parte de los traductores residen en navegadores, no cuentan con funciones actualizadas o atajos para simplificar el proceso de conversión de idiomas, además de no ser fáciles de usar para todos los usuarios.",
      technicalApproach: "Construcción de una interfaz de usuario intuitiva con Electron, React y TypeScript para garantizar una experiencia completa.",
      extendedDescription: "Translator es una solución gratuita a los traductores de navegador, aplicaciones de pago, etc. Ya que cuenta con múltiples funciones que ayudan a simplificar la experiencia del usuario priorizando la rapidez y facilidad de uso."
      ,
      images: [
        "/projects/Translator/Translator.webp",
        "/projects/Translator/Translator2.webp",
        "/projects/Translator/Translator3.webp",
        "/projects/Translator/Translator4.webp"
      ]
    },
    {
      id: "we-pages",
      title: "WePages",
      subtitle: "Servicio de Web Apps",
      description: "Servicio de creación de Landing Pages y Web Apps personalizadas para pequeñas empresas y emprendedores.",
      logo: "/projects/WePages/WePages.webp",
      image: "/projects/WePages/WePages.webp",
      date: "En desarrollo",
      technologies: ["Next.js", "TypeScript", "Tailwind", "Vercel"],
      objective: "Ofrecer un servicio accesible y personalizado de creación de Landing Pages y Web Apps para pequeñas empresas y emprendedores, ayudándoles a establecer una presencia en línea.",
      problem: "Muchas pequeñas empresas y emprendedores carecen de los recursos o conocimientos técnicos para desarrollar una presencia web profesional, lo que limita su capacidad para atraer clientes y crecer en el mercado digital.",
      technicalApproach: "Utilización de Next.js + TypeScript y Tailwind CSS para un diseño moderno y responsivo. El despliegue se realiza en Vercel para asegurar un rendimiento óptimo y escalabilidad.",
      extendedDescription: "WePages ofrece servicios personalizados que incluyen diseño de Landing Pages atractivas, desarrollo de Web Apps funcionales, optimización SEO, y soporte continuo. El enfoque se centra en entender las necesidades del cliente y entregar soluciones que impulsen su éxito en línea."
      ,
      images: [
        "/projects/WePages/WePages.webp",
        "/projects/WePages/WePages2.webp",
      ]
    },
    {
      id: "libreria-jsr",
      title: "Libreria JSR",
      subtitle: "Plataforma E-commerce",
      description: "Una plataforma de e-commerce con carrito de compras y sistema de gestión de inventario.",
      logo: "/utils/LibreriaJSR.webp",
      image: "/utils/LibreriaJSR.webp",
      date: "Diciembre 2024 - Agosto 2025",
      technologies: ["HTML", "CSS", "JavaScript", "Node.js"],
      githubUrl: "https://github.com/samuelbonifacio015/Libreria-JSR",
      liveUrl: "https://libreria-jsr.vercel.app",
      objective: "Crear una plataforma de e-commerce funcional y accesible para la venta de libros, demostrando habilidades en desarrollo web frontend con tecnologías fundamentales.",
      problem: "La necesidad de una solución de e-commerce simple pero completa que permita gestionar productos, carrito de compras e inventario sin depender de frameworks complejos, ideal para proyectos educativos o pequeñas empresas.",
      technicalApproach: "Desarrollo utilizando HTML5 semántico, CSS3 moderno con flexbox y grid para layouts responsivos, y JavaScript vanilla para la lógica de negocio, gestión de estado del carrito y manipulación del DOM, priorizando la simplicidad y el rendimiento.",
      extendedDescription: "La plataforma incluye catálogo de productos con búsqueda y filtrado, carrito de compras persistente en localStorage, gestión de inventario, y una interfaz de usuario intuitiva diseñada para facilitar la experiencia de compra.",
      images: [
        "/projects/LibreriaJSR/LibreriaJSR.webp",
        "/projects/LibreriaJSR/LibreriaJSR2.webp",
        "/projects/LibreriaJSR/LibreriaJSR3.webp"
      ]
    },
    {
      id: "finovate",
      title: "Finovate",
      subtitle: "Gestión de Finanzas",
      description: "Aplicación web diseñada para gestión de finanzas personales con herramientas de seguimiento y análisis financiero.",
      logo: "/utils/Finovate.webp",
      image: "/utils/Finovate.webp",
      date: "Mayo 2025",
      technologies: ["React", "TypeScript", "Tailwind", "Vite"],
      githubUrl: "https://github.com/samuelbonifacio015/Finovate",
      objective: "Desarrollar una aplicación web moderna que ayude a los usuarios a gestionar sus finanzas personales de manera efectiva, proporcionando herramientas de seguimiento, análisis y planificación financiera.",
      problem: "Muchas personas tienen dificultades para mantener un control adecuado de sus finanzas personales, careciendo de herramientas visuales e intuitivas que les permitan entender sus gastos, ingresos y tendencias financieras de manera clara.",
      technicalApproach: "Stack moderno con React y TypeScript para type-safety y desarrollo escalable, Tailwind CSS para diseño rápido y consistente, y Vite como build tool para optimización de rendimiento. La aplicación utiliza estado local y componentes reutilizables para una arquitectura limpia.",
      extendedDescription: "Finovate ofrece funcionalidades como registro de transacciones, categorización de gastos, visualización de gráficos y estadísticas, establecimiento de presupuestos, y análisis de tendencias financieras para ayudar a los usuarios a tomar mejores decisiones económicas.",
      images: [
        "/utils/Finovate.webp"
      ]
    },
    {
      id: "paso-perfecto",
      title: "PasoPerfecto",
      subtitle: "Actividad Física",
      description: "Aplicación web diseñada para llevar un seguimiento eficiente de tu actividad física diaria.",
      logo: "/utils/PasoPerfecto.webp",
      image: "/utils/PasoPerfecto.webp",
      date: "Mayo - Junio 2025",
      technologies: ["React", "TypeScript", "Tailwind", "Vite"],
      githubUrl: "https://github.com/samuelbonifacio015/PasoPerfecto",
      liveUrl: "https://paso-perfecto.vercel.app/",
      objective: "Crear una aplicación web que motive y ayude a los usuarios a mantener un estilo de vida activo mediante el seguimiento detallado de su actividad física diaria y el establecimiento de metas personales.",
      problem: "Las personas que buscan mejorar su condición física necesitan una herramienta simple y accesible para registrar y visualizar su progreso, sin la complejidad de aplicaciones móviles o dispositivos especializados.",
      technicalApproach: "Desarrollo con React y TypeScript para una base sólida y mantenible, Tailwind CSS para un diseño moderno y responsive, y Vite para un desarrollo ágil. La aplicación utiliza componentes funcionales con hooks para gestión de estado y efectos secundarios.",
      extendedDescription: "PasoPerfecto permite registrar pasos, distancia recorrida, tiempo de actividad y calorías quemadas. Incluye visualización de estadísticas diarias y semanales, establecimiento de metas personalizadas, y un sistema de logros para mantener la motivación del usuario.",
      images: [
        "/projects/PasoPerfecto/PasoPerfecto.webp",
        "/projects/PasoPerfecto/PasoPerfecto2.webp",
        "/projects/PasoPerfecto/PasoPerfecto3.webp"
      ]
    },
    {
      id: "timex-js",
      title: "Timex.js",
      subtitle: "Reloj",
      description: "Aplicación web de reloj con funcionalidades de tiempo real, cronómetro y pomodoro.",
      logo: "/projects/TimexJS/TimexJS.webp",
      image: "/projects/TimexJS/TimexJS.webp",
      date: "Junio 2025 - Enero 2026",
      technologies: ["React", "TypeScript", "Tailwind", "Vite"],
      githubUrl: "https://github.com/samuelbonifacio015/Timex.js",
      liveUrl: "https://timex-js.vercel.app/",
      objective: "Desarrollar una aplicación web de reloj multifuncional que incluya funcionalidades de tiempo real, cronómetro y técnica pomodoro para mejorar la productividad de los usuarios.",
      problem: "Los usuarios necesitan herramientas accesibles y fáciles de usar para gestionar su tiempo de manera efectiva, pero muchas aplicaciones existentes son complicadas o requieren instalaciones adicionales.",
      technicalApproach: "Utilización de React y TypeScript para una estructura sólida y escalable, Tailwind CSS para un diseño atractivo y responsivo, y Vite para un entorno de desarrollo rápido. La aplicación hace uso de hooks para manejar el estado del tiempo y efectos secundarios.",
      extendedDescription: "Timex.js ofrece un reloj en tiempo real con opciones personalizables, un cronómetro preciso con funciones de inicio, pausa y reinicio, y un temporizador pomodoro que ayuda a los usuarios a dividir su trabajo en intervalos manejables con descansos regulares.",
      images: [
        "/projects/TimexJS/TimexJS.webp",
        "/projects/TimexJS/TimexJS2.webp",
        "/projects/TimexJS/TimexJS3.webp",
      ]
    },
    {
      id: "agua-connect",
      title: "AguaConnect",
      subtitle: "Landing Page",
      description: "Ejemplo de Landing Page para una empresa de servicios de agua potable.",
      logo: "/utils/AguaConnect.webp",
      image: "/utils/AguaConnect.webp",
      date: "Marzo - Julio 2025",
      technologies: ["HTML", "CSS", "JavaScript"],
      githubUrl: "https://github.com/samuelbonifacio015/AguaConnect",
      liveUrl: "https://agua-connect-nu.vercel.app/",
      objective: "Desarrollar una landing page atractiva y funcional para una empresa de servicios de agua potable, enfocada en convertir visitantes en clientes mediante un diseño persuasivo y una experiencia de usuario optimizada.",
      problem: "Las empresas de servicios necesitan una presencia web profesional que comunique efectivamente sus servicios, genere confianza y facilite el contacto con clientes potenciales, sin requerir una inversión en desarrollo complejo.",
      technicalApproach: "Landing page desarrollada con HTML5 semántico para SEO, CSS3 con animaciones suaves y diseño responsive, y JavaScript para interactividad como formularios de contacto, navegación suave y efectos visuales que mejoran la experiencia del usuario.",
      extendedDescription: "AguaConnect presenta una landing page moderna con secciones de hero, servicios, beneficios, testimonios y formulario de contacto. El diseño prioriza la claridad del mensaje, la facilidad de navegación y la conversión de visitantes en leads.",
      images: [
        "/projects/AguaConnect/AguaConnect.webp",
        "/projects/AguaConnect/AguaConnect2.webp",
        "/projects/AguaConnect/AguaConnect3.webp"
      ]
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
