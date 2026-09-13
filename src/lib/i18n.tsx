import { createContext, useContext, useEffect, useMemo, useState, type ReactNode } from 'react';
import type { BlogPost } from './blogTypes';

export type Language = 'es' | 'en';

const translations: Record<string, string> = {
  'Tecnologías': 'Technologies', 'Educación': 'Education', 'Experiencia': 'Experience', 'Proyectos': 'Projects',
  'Contacto': 'Contact', 'Navegación principal': 'Main navigation', 'Ir al inicio': 'Go to home',
  'Abrir el perfil de GitHub de Samuel Bonifacio': "Open Samuel Bonifacio's GitHub profile", 'Ver caso': 'View case study',
  'Visitar sitio web': 'Visit website', 'Visitar sitio web de Maquinarias JYS': 'Visit Maquinarias JYS website',
  'Experiencia actual': 'Current experience', 'Full Stack Developer': 'Full Stack Developer', 'Ver Proyectos': 'View Projects',
  'Sobre mí': 'About me', 'Descargar CV': 'Download CV', 'El CV está disponible para descargar en español e inglés según el idioma seleccionado.': 'The CV is available to download in Spanish and English based on the selected language.', 'Lenguajes': 'Languages', 'Frameworks': 'Frameworks',
  'Bases de datos': 'Databases', 'Herramientas': 'Tools', 'No pude cargar las contribuciones.': 'I could not load contributions.',
  'Ver GitHub': 'View GitHub', '¿Hablamos?': 'Let’s talk?', 'Contacta conmigo para colaboraciones o si tienes alguna pregunta sobre mi trabajo.': 'Contact me for collaborations or if you have any questions about my work.',
  'Envíame un mensaje': 'Send me a message', 'Nombre': 'Name', 'Tu nombre': 'Your name', 'Asunto': 'Subject',
  'Asunto de tu mensaje': 'Message subject', 'Mensaje': 'Message', 'Tu mensaje...': 'Your message...', 'Abrir correo': 'Open email',
  'Enviando...': 'Sending...', 'Enviar mensaje': 'Send message', 'Información de contacto': 'Contact information',
  'Ubicación': 'Location', 'Sígueme en': 'Follow me', 'Ver perfil': 'View profile', 'Hecho con': 'Made with', 'y mucho código': 'and lots of code',
  '¡Mensaje enviado!': 'Message sent!', 'Tu mensaje ha sido enviado correctamente. Te responderé lo antes posible.': 'Your message was sent successfully. I will get back to you as soon as possible.',
  'El formulario no está disponible en este entorno. Puedes escribirme directamente por email.': 'The form is not available in this environment. You can write to me directly by email.',
  'No pude enviar el mensaje. Puedes intentarlo nuevamente o escribirme directamente por email.': 'I could not send the message. You can try again or write to me directly by email.',
  'Email': 'Email', 'Lima, Perú': 'Lima, Peru',
  'Inspiración': 'Inspiration', 'Redes sociales': 'Social networks', 'enlace pendiente': 'link pending',
  'Texto interactivo': 'Interactive text', 'En desarrollo': 'In development', 'Ver detalles': 'View details',
  'Cerrar modal': 'Close modal', 'Video de demostración': 'Demo video', 'No soporta el elemento de video.': 'Your browser does not support the video element.',
  'Diapositiva anterior': 'Previous slide', 'Diapositiva siguiente': 'Next slide',
  'Ir al video': 'Go to video', 'Enlaces': 'Links', 'Repositorio': 'Repository', 'Demo en Vivo': 'Live Demo',
  'Objetivo': 'Objective', 'Problema que Resuelve': 'Problem Solved', 'Enfoque Técnico': 'Technical Approach', 'Descripción': 'Description',
  'Todos': 'All', 'Reflexiones': 'Reflections', 'Bienvenidos a mi blog': 'Welcome to my blog',
  'Bienvenida a mi Blog': 'Welcome to My Blog',
  'Por qué me encanta React': 'Why I Love React',
  'El poder de la consistencia en el aprendizaje': 'The Power of Consistency in Learning',
  'Hola y bienvenido a mi espacio personal donde compartiré mis pensamientos, experiencias y aprendizajes sobre el mundo del desarrollo de software.': 'Hello and welcome to my personal space where I will share my thoughts, experiences, and lessons about the world of software development.',
  'Hablamos sobre cómo la consistencia diaria puede transformar tu aprendizaje y habilidades de programación más que las sesiones intensivas de estudio.': 'We talk about how daily consistency can transform your learning and programming skills more than intensive study sessions.',
  'Reflexión personal sobre por qué React se convirtió en mi framework favorito y cómo ha transformado mi forma de pensar sobre el desarrollo frontend.': 'A personal reflection on why React became my favorite framework and how it transformed the way I think about frontend development.',
  'Espacio donde comparto mis experiencias, aprendizajes y reflexiones sobre tecnología y desarrollo de software.': 'A space where I share my experiences, lessons, and reflections on technology and software development.',
  'No se encontraron posts con este filtro.': 'No posts were found with this filter.', 'Ver todos los posts': 'View all posts',
  'Cargando…': 'Loading…', 'Post no encontrado': 'Post not found', 'El post que buscas no existe.': 'The post you are looking for does not exist.',
  'Volver al blog': 'Back to the blog', 'Índice del artículo': 'Article index', 'Cerrar índice del artículo': 'Close article index',
  'Abrir índice del artículo': 'Open article index', 'Secciones del artículo': 'Article sections', 'Imagen del artículo': 'Article image',
  'Volver': 'Back', 'Caso técnico · Proyecto profesional': 'Technical case · Professional project',
  'Visitar aplicación': 'Visit application', '01 · Contexto': '01 · Context', '02 · Arquitectura': '02 · Architecture',
  '03 · Despliegue final': '03 · Final deployment', 'De la idea a la realidad': 'From idea to reality',
  'Separación por responsabilidades': 'Separation of responsibilities', 'Recorrido por la app': 'App walkthrough', 'Interfaz': 'Interface',
  'API': 'API', 'Datos': 'Data', 'Entrega': 'Delivery',
  'Soy': 'I am', 'Ingeniero': 'Engineer', 'Hola': 'Hello', 'Cambiar a modo claro': 'Switch to light mode', 'Cambiar a modo oscuro': 'Switch to dark mode',
  'Move your cursor within the text below': 'Move your cursor within the text below', 'Press anywhere within the text below': 'Press anywhere within the text below',
  'Actualidad': 'Present', 'Proyecto profesional': 'Professional project', 'm': 'm', 'y': 'y',
  'Página no encontrada': 'Page not found', 'Regresar a la página principal': 'Return to the home page',
  'General': 'General', 'Sin título': 'Untitled', 'Portfolio de Samuel Bonifacio': 'Samuel Bonifacio Portfolio',
  'Desarrollador Full-Stack': 'Full-Stack Developer', 'Desarrollador full-stack disponible para prácticas y posiciones junior.': 'Full-stack developer available for internships and junior positions.',
  'Retrato de Samuel Bonifacio': 'Portrait of Samuel Bonifacio', 'Logo de la Universidad Peruana de Ciencias Aplicadas': 'Logo of Universidad Peruana de Ciencias Aplicadas',
  'Actividad y perfil técnico': 'Activity and technical profile',
  'contribución': 'contribution', 'contribuciones': 'contributions', 'el': 'on', 'contribuciones desde': 'contributions since', 'en': 'on',
  'Menos': 'Less', 'Más': 'More',
  'La familia no es una cosa importante. Es todo.': 'Family is not an important thing. It is everything.',
  'El tercio superior y el quinto superior han sido los mayores reconocimientos de mi carrera. Estos reflejan la constancia que he mantenido en mis proyectos.': 'Being in the top third and top fifth have been the greatest recognitions of my career. They reflect the consistency I have maintained in my projects.',
  'Tercio superior': 'Top third', 'Último promedio': 'Latest average', 'Acumulado': 'Cumulative', 'Periodo académico': 'Academic period',
  'Estudiante de tercer año': 'Third-year student', 'Ingeniería de Software': 'Software Engineering',
  'Durante la carrera he desarrollado proyectos web y aplicaciones móviles mientras sigo fortaleciendo mis bases técnicas.': 'During my degree, I have developed web projects and mobile applications while continuing to strengthen my technical foundations.',
  'Proyectos profesionales en los que he convertido ideas y necesidades reales en productos web funcionales.': 'Professional projects where I have turned real ideas and needs into functional web products.',
  'Página principal de la plataforma de e-commerce de Librería JSR': 'Main page of the Librería JSR e-commerce platform',
  'Catálogo de productos de la plataforma e-commerce de Maquinarias JYS': 'Product catalog of the Maquinarias JYS e-commerce platform',
  'Dashboard de gestión de inventario de Braymar con métricas, filtros y tabla de productos': 'Braymar inventory dashboard with metrics, filters, and product table',
  'Estudiando en: Universidad Peruana de Ciencias Aplicadas': 'Studying at: Universidad Peruana de Ciencias Aplicadas',
  'Aprendiendo: RAG & Deep Learning': 'Learning: RAG & Deep Learning',
  'Trabajando en: Maquinarias JYS': 'Working on: Maquinarias JYS',
  'Soy Samuel Bonifacio, estudiante del tercer año de la carrera de Ingeniería de Software en la Universidad Peruana de Ciencias Aplicadas.': 'I am Samuel Bonifacio, a third-year Software Engineering student at Universidad Peruana de Ciencias Aplicadas.',
  'Múltiples veces perteneciendo al tercio superior, mi curiosidad por el área de la tecnología me ha llevado a incursionar en el desarrollo de varios proyectos a lo largo de mi carrera.': 'Having repeatedly ranked in the top third, my curiosity about technology has led me to explore the development of several projects throughout my degree.',
  'Actualmente busco oportunidades que me permitan adquirir experiencias profesionales y seguir incursionando en el desarrollo de software.': 'I am currently looking for opportunities to gain professional experience and continue exploring software development.',
  'Samuel Bonifacio junto a sus padres, su mayor inspiración': 'Samuel Bonifacio with his parents, his greatest inspiration',
  'Mi principal fuente de inspiración es mi familia. Su apoyo constante y la confianza que depositan en mí han sido fundamentales para mantenerme enfocado y perseverar en el desarrollo de mis proyectos, incluso en los momentos más exigentes.': 'My main source of inspiration is my family. Their constant support and trust have been essential in keeping me focused and persevering with my projects, even during the most demanding moments.',
  'Gracias a ellos cuento con estabilidad, oportunidades y un entorno que me permite crecer profesional y personalmente. Retribuir todo ese esfuerzo y apoyo, mejorando nuestro estilo de vida a través de mi trabajo como desarrollador de software, es uno de mis mayores objetivos y una motivación diaria.': 'Thanks to them, I have stability, opportunities, and an environment that allows me to grow professionally and personally. Giving back all that effort and support by improving our lifestyle through my work as a software developer is one of my greatest goals and a daily motivation.',
  '- Plataforma E-commerce para 10+ clientes concurrentes que ordenan sus productos de manera virtual.\n- Reducción de tiempo de procesamiento de pedidos a través de un panel de administrador / tracking de inventario en tiempo real y confirmaciones automatizadas.\n- Soporte operativo a través de servicios de impresión, fotocopiado, productos escolares y trabajos personalizados.\n- Desarrollé un carrito de compras persistente con cálculo automático de totales y actualización dinámica de productos durante la navegación.': '- E-commerce platform for 10+ concurrent customers ordering their products online.\n- Reduced order processing time through an admin panel, real-time inventory tracking, and automated confirmations.\n- Operational support through printing, photocopying, school supplies, and custom work services.\n- Developed a persistent shopping cart with automatic total calculation and dynamic product updates while browsing.',
  '- Plataforma E-Commerce FullStack B2C/B2B para la comercialización de maquinarias NERA Japan & JAM TOOLS Germany.\n- Frontend Next.js enfocada en la conversión con productos junto a un backend de Django REST con autenticación JWT.\n- Flujo de búsqueda/compra simplificada para los clientes a través de pedidos en web/recibo en tienda.\n- Impulsé ciclos de validación semanal con más de 25 clientes, recopilando pedidos, cotizaciones y feedback continuo.': '- Full-stack B2C/B2B e-commerce platform for selling NERA Japan and JAM TOOLS Germany machinery.\n- Conversion-focused Next.js frontend with a Django REST backend and JWT authentication.\n- Simplified search and purchase flow through online orders and in-store receipts.\n- Led weekly validation cycles with more than 25 customers, gathering orders, quotes, and continuous feedback.',
  '- Construí un sistema de inventario, migrando gradualmente su control de stock desde procesos manuales en papel hacia un sistema digital.\n- Diseñé flujos de gestión de inventario orientados a reducir errores operativos, mejorar la trazabilidad y acelerar la toma de decisiones del negocio.\n- El sistema apoyó una operación más eficiente y acompañó una mejora progresiva en los ingresos de la empresa.\n- Implementé un dashboard en tiempo real para monitorear métricas clave del negocio, incluyendo accesos, productos más vendidos y alertas de bajo stock.': '- Built an inventory system, gradually moving stock control from manual paper processes to a digital system.\n- Designed inventory management flows to reduce operational errors, improve traceability, and speed up business decisions.\n- The system supported a more efficient operation and accompanied progressive revenue growth.\n- Implemented a real-time dashboard to monitor key business metrics, including visits, best-selling products, and low-stock alerts.',
  'Análisis de rendimiento futbolístico': 'Football performance analysis',
  'Aplicación para analizar videos de partidos, detectar toques y revisar el rendimiento individual con correcciones interactivas.': 'Application for analyzing match videos, detecting touches, and reviewing individual performance with interactive corrections.',
  'Convertir un video de partido en información accionable sobre el rendimiento del jugador.': 'Turn a match video into actionable information about player performance.',
  'Revisar manualmente cada toque y movimiento de un partido consume tiempo y dificulta identificar patrones de mejora.': 'Manually reviewing every touch and movement in a match takes time and makes it difficult to identify improvement patterns.',
  'Aplicación construida con Next.js 16, React 19, TypeScript, Tailwind CSS v4 y componentes de shadcn/ui, con route handlers mock para el análisis y las correcciones.': 'Application built with Next.js 16, React 19, TypeScript, Tailwind CSS v4, and shadcn/ui components, with mock route handlers for analysis and corrections.',
  'FUTeate permite analizar un video de fútbol, revisar los toques detectados sobre una línea de tiempo y corregir el resultado por fragmentos.': 'FUTeate lets you analyze a football video, review detected touches on a timeline, and correct the result segment by segment.',
  'Microcursos de IA para Medicina': 'AI micro-courses for Medicine',
  'Plataforma educativa de microcursos de IA para medicina. Generación de casos clínicos, quizzes y flashcards con IA.': 'Educational platform of AI micro-courses for medicine. Generate clinical cases, quizzes, and flashcards with AI.',
  '2026 - En pausa': '2026 - On hold',
  'Hacer accesible la educación médica mediante microcursos de IA que generan casos clínicos, quizzes y flashcards personalizados para estudiantes y profesionales de la salud.': 'Make medical education accessible through AI micro-courses that generate personalized clinical cases, quizzes, and flashcards for students and healthcare professionals.',
  'El estudio de la medicina exige practicar con casos clínicos variados y material de repaso, pero generarlos manualmente es lento y costoso, y no existe una herramienta que produzca contenido clínico de calidad bajo demanda.': 'Medical study requires practice with varied clinical cases and review material, but creating them manually is slow and expensive, and no tool produces quality clinical content on demand.',
  'Aplicación full-stack con Next.js y TypeScript, base de datos y autenticación en Supabase. La generación de contenido clínico (casos, quizzes, flashcards) se apoya en modelos de IA.': 'Full-stack application with Next.js and TypeScript, database and authentication in Supabase. Clinical content generation (cases, quizzes, flashcards) is powered by AI models.',
  'LlamIA es una plataforma educativa de microcursos de IA enfocada en medicina. Permite generar casos clínicos interactivos, quizzes y flashcards con IA, con onboarding, dashboard de progreso y suscripciones de pago. Actualmente en desarrollo activo (V0.5).': 'LlamIA is an educational AI micro-course platform focused on medicine. It generates interactive clinical cases, quizzes, and flashcards with AI, plus onboarding, a progress dashboard, and paid subscriptions. Currently in active development (V0.5).',
  'App Móvil Android': 'Android Mobile App', 'Aplicación móvil Android desarrollada con Kotlin, Jetpack Compose y Flutter, con persistencia local mediante ROOM.': 'Android mobile application built with Kotlin, Jetpack Compose, and Flutter, with local persistence through ROOM.',
  'Construir una aplicación móvil Android combinando Kotlin, Jetpack Compose y Flutter, con persistencia local mediante ROOM.': 'Build an Android mobile application combining Kotlin, Jetpack Compose, and Flutter, with local persistence through ROOM.',
  'Desarrollar una app móvil nativa que funcione con almacenamiento local persistente y una interfaz declarativa moderna, aplicando buenas prácticas del ecosistema Android.': 'Develop a native mobile app with persistent local storage and a modern declarative interface, applying Android ecosystem best practices.',
  'Desarrollo móvil con Kotlin, UI declarativa en Jetpack Compose, Flutter y persistencia local mediante la librería ROOM. El producto cuenta con una landing page desplegada en Vercel.': 'Mobile development with Kotlin, declarative UI in Jetpack Compose, Flutter, and local persistence through ROOM. The product includes a landing page deployed on Vercel.',
  'Klippr es una aplicación móvil Android desarrollada en el curso de Aplicaciones Móviles usando Kotlin, Jetpack Compose, Flutter y ROOM. Incluye una landing page de presentación del producto.': 'Klippr is an Android mobile application developed in the Mobile Applications course using Kotlin, Jetpack Compose, Flutter, and ROOM. It includes a product presentation landing page.',
  'Alquiler de Vehículos': 'Vehicle Rental', 'Plataforma web para alquilar vehículos. Desarrollado con Angular y REST API con Java SpringBoot.': 'Web platform for renting vehicles. Built with Angular and a REST API using Java Spring Boot.',
  'Set - Dic 2025': 'Sep - Dec 2025', 'Desarrollar una plataforma web completa para facilitar el alquiler de vehículos, conectando propietarios con usuarios que necesitan transporte temporal de manera segura y eficiente.': 'Develop a complete web platform to facilitate vehicle rentals, safely and efficiently connecting owners with users who need temporary transportation.',
  'La falta de una plataforma centralizada y confiable para el alquiler de vehículos dificulta el proceso tanto para propietarios como para usuarios, generando desconfianza y procesos manuales ineficientes.': 'The lack of a centralized, trustworthy vehicle rental platform makes the process difficult for both owners and users, creating distrust and inefficient manual processes.',
  'Arquitectura frontend con Angular para una experiencia de usuario reactiva y moderna, combinada con una API REST robusta desarrollada en Java SpringBoot que garantiza seguridad, escalabilidad y manejo eficiente de transacciones y reservas.': 'Frontend architecture with Angular for a reactive, modern user experience, combined with a robust Java Spring Boot REST API that ensures security, scalability, and efficient transaction and booking management.',
  'WeRide es una solución integral que incluye sistema de autenticación, gestión de reservas, pagos integrados, y un panel de administración completo. La aplicación prioriza la seguridad de los datos y la experiencia del usuario en cada interacción.': 'WeRide is a complete solution with authentication, booking management, integrated payments, and a full admin panel. The application prioritizes data security and user experience in every interaction.',
  'Gestión de Cultivos': 'Crop Management', 'Plataforma web para gestión de cultivos agrícolas. Desarrollado con Vue y REST API con C# .NET.': 'Web platform for managing agricultural crops. Built with Vue and a REST API using C# .NET.',
  'Proporcionar a los agricultores una herramienta digital moderna para gestionar sus cultivos, optimizar recursos y mejorar la productividad mediante el seguimiento detallado de sus actividades agrícolas.': 'Provide farmers with a modern digital tool to manage crops, optimize resources, and improve productivity through detailed activity tracking.',
  'Los agricultores enfrentan dificultades para llevar un registro organizado de sus cultivos, planificar rotaciones, gestionar recursos y tomar decisiones basadas en datos históricos, lo que limita su capacidad de optimización.': 'Farmers struggle to organize crop records, plan rotations, manage resources, and make decisions based on historical data, limiting their ability to optimize operations.',
  'Frontend desarrollado con Vue.js para una interfaz intuitiva y reactiva, mientras que el backend utiliza C# .NET para proporcionar una API robusta con capacidades de procesamiento de datos agrícolas, generación de reportes y análisis predictivo.': 'Frontend built with Vue.js for an intuitive, reactive interface, while the backend uses C# .NET to provide a robust API for agricultural data processing, reporting, and predictive analysis.',
  'CultivApp ofrece funcionalidades como registro de siembras, seguimiento de crecimiento, gestión de recursos (agua, fertilizantes), alertas de mantenimiento, y generación de reportes que ayudan a los agricultores a tomar decisiones informadas.': 'CultivApp offers planting records, growth tracking, resource management (water, fertilizer), maintenance alerts, and reports that help farmers make informed decisions.',
  'Traducción de Textos': 'Text Translation', 'Aplicación web para traducción de textos utilizando la API de TAS (Open Source).': 'Web application for translating text using the TAS API (Open Source).',
  'Ene - Feb 2026': 'Jan - Feb 2026', 'Desarrollar una aplicación de escritorio que facilite la traducción de textos entre múltiples idiomas utilizando la API de TAS (Open Source).': 'Develop a desktop application that facilitates text translation between multiple languages using the TAS API (Open Source).',
  'Gran parte de los traductores residen en navegadores, no cuentan con funciones actualizadas o atajos para simplificar el proceso de conversión de idiomas, además de no ser fáciles de usar para todos los usuarios.': 'Most translators live in browsers and lack updated features or shortcuts to simplify language conversion, while also not being easy for everyone to use.',
  'Construcción de una interfaz de usuario intuitiva con Electron, React y TypeScript para garantizar una experiencia completa.': 'Building an intuitive user interface with Electron, React, and TypeScript for a complete experience.',
  'Translator es una solución gratuita a los traductores de navegador, aplicaciones de pago, etc. Ya que cuenta con múltiples funciones que ayudan a simplificar la experiencia del usuario priorizando la rapidez y facilidad de uso.': 'Translator is a free alternative to browser translators and paid applications. It includes multiple features that simplify the user experience while prioritizing speed and ease of use.',
  'Servicio de Web Apps': 'Web App Service', 'Servicio de creación de Landing Pages y Web Apps personalizadas para pequeñas empresas y emprendedores.': 'Custom Landing Page and Web App creation service for small businesses and entrepreneurs.',
  'Ene 2026': 'Jan 2026', 'Ofrecer un servicio accesible y personalizado de creación de Landing Pages y Web Apps para pequeñas empresas y emprendedores, ayudándoles a establecer una presencia en línea.': 'Offer an accessible, personalized Landing Page and Web App creation service for small businesses and entrepreneurs, helping them establish an online presence.',
  'Muchas pequeñas empresas y emprendedores carecen de los recursos o conocimientos técnicos para desarrollar una presencia web profesional, lo que limita su capacidad para atraer clientes y crecer en el mercado digital.': 'Many small businesses and entrepreneurs lack the resources or technical knowledge to build a professional web presence, limiting their ability to attract customers and grow in the digital market.',
  'Utilización de Next.js + TypeScript y Tailwind CSS para un diseño moderno y responsivo. El despliegue se realiza en Vercel para asegurar un rendimiento óptimo y escalabilidad.': 'Next.js, TypeScript, and Tailwind CSS are used for a modern, responsive design. Deployment on Vercel ensures optimal performance and scalability.',
  'WePages ofrece servicios personalizados que incluyen diseño de Landing Pages atractivas, desarrollo de Web Apps funcionales, optimización SEO, y soporte continuo. El enfoque se centra en entender las necesidades del cliente y entregar soluciones que impulsen su éxito en línea.': 'WePages offers custom services including attractive Landing Page design, functional Web App development, SEO optimization, and ongoing support. The focus is on understanding client needs and delivering solutions that drive online success.',
  'Reloj': 'Clock', 'Aplicación web de reloj con funcionalidades de tiempo real, cronómetro y pomodoro.': 'Clock web application with real-time, stopwatch, and pomodoro features.',
  'Jun 2025 - Ene 2026': 'Jun 2025 - Jan 2026',
  'Plataforma e-commerce B2C/B2B para venta de maquinarias y conectar el catálogo público con una operación interna de inventario.': 'B2C/B2B e-commerce platform for selling machinery and connecting the public catalog with internal inventory operations.',
  'El negocio necesitaba un catálogo virtual para la venta de maquinarias a compradores. El reto fue construir una experiencia de consulta y compra clara, conectar un panel de administración efectivo que brinde una experiencia de usuario simple al dueño del negocio.': 'The business needed a virtual catalog for selling machinery to buyers. The challenge was to build a clear browsing and purchasing experience and connect an effective admin panel that gives the owner a simple user experience.',
  'Actualmente me desempeño como desarrollador full-stack principal:  Next.js & TypeScript, API en Django REST integrado con Supabase/PostgreSQL.': 'I currently work as the lead full-stack developer: Next.js and TypeScript, with a Django REST API integrated with Supabase/PostgreSQL.',
  'Next.js y TypeScript entregan el catálogo público y los flujos de interacción.': 'Next.js and TypeScript deliver the public catalog and interaction flows.',
  'Django REST concentra autenticación, reglas de negocio y acceso controlado a los datos.': 'Django REST centralizes authentication, business rules, and controlled data access.',
  'Supabase/PostgreSQL mantiene el catálogo y el inventario operativo como fuentes diferenciadas.': 'Supabase/PostgreSQL keeps the catalog and operational inventory as separate sources.',
  'Vercel sirve el frontend y Render ejecuta el backend, con contratos públicos limitados a la información necesaria.': 'Vercel serves the frontend and Render runs the backend, with public contracts limited to the necessary information.',
  'Página de inicio pública de Maquinarias JYS con el mensaje Precisión, rendimiento': 'Public Maquinarias JYS homepage with the message Precision, performance',
  'Inicio: propuesta comercial y acceso directo al catálogo.': 'Home: commercial proposition and direct access to the catalog.',
  'Catálogo público de Maquinarias JYS con filtros y tarjetas de productos': 'Public Maquinarias JYS catalog with filters and product cards',
  'Catálogo: exploración de productos mediante categorías y filtros.': 'Catalog: browse products through categories and filters.',
  'Detalle público de un motor gasolinero en Maquinarias JYS': 'Public detail page for a gasoline engine on Maquinarias JYS',
  'Producto: especificaciones, disponibilidad pública y acción de compra.': 'Product: specifications, public availability, and purchase action.',
};

const blogContent: Record<string, string> = {
  'bienvenida-al-blog': `\n\nHello and welcome to this personal space where I will share my **thoughts, experiences, and lessons** about the world of software development.\n\n## What will you find here?\n\nThis blog is a place where I plan to document my journey as a developer, sharing:\n\n- **Reflections** on web development and technology\n- **Experiences** learning new frameworks and tools\n- **Thoughts** on life as a Software Engineering student\n- **Projects** I have developed and the process behind them\n\n## Why I created this space\n\nAs a third-year Software Engineering student at **UPC**, I have always enjoyed **learning new technologies** and applying them to real projects. This blog helps me to:\n\n1. Document my progress\n2. Share knowledge with others\n3. Keep a record of my growth as a developer\n4. Reflect on what I have learned\n\nI hope you find the content useful or at least interesting. Thank you for visiting! 🙏\n`,
  'el-poder-de-la-consistencia': `\n\nLately I have been thinking a lot about how we **learn best**. Is it better to study 10 hours in one day or 1 hour each day for two weeks?\n\n## My personal experience\n\nDuring my university degree, I have noticed that when I try to **learn everything at once**, I forget much of the content the next day. However, when I dedicate time **daily**, even if it is not much, knowledge becomes consolidated much better.\n\n### The 1% rule per day\n\nI have read that improving just **1% every day** can completely transform you in a year. Mathematically:\n\n$$1.01^{365} \\approx 37.8$$\n\nIf you improve by 1% every day, by the end of the year you will be **37 times better** than at the beginning. It is incredible, isn’t it?\n\n## Applying it to software development\n\nIn software development, consistency is even more important because:\n\n1. **Daily practice** keeps concepts fresh in your mind\n2. **Small projects** are more manageable and finishable\n3. **Daily coding** keeps your “muscle memory” active\n4. **Mistakes are learned from** better when you face them regularly\n\n## My current approach\n\nFor some time now, I have adopted these practices:\n\n- Code for **at least 30 minutes** every day\n- Document what I learn in **notes or the blog**\n- Work on **small features** in my projects\n- Review concepts I already know so I **do not forget them**\n\n## Conclusions\n\nConsistency is more powerful than intensity. It is not about studying 10 hours one day and resting the rest of the week, but about maintaining a **sustainable pace**.\n\nWhat strategies do you use to stay consistent in your learning? I would love to read about your experiences.\n\n---\n\n*Did you enjoy this reflection? Share it or leave me your thoughts.*\n`,
  'por-que-me-encanta-react': `\n\nWhen I started learning web development, I tried several frameworks: **Angular, Vue, Svelte**, among others. But there was something special about **React** that completely captivated me.\n\n## Components: the key piece\n\nWhat I liked most about React from the beginning was its **component-based approach**. The idea that everything can be a small, reusable piece completely changed my perspective.\n\n### Advantages of this approach\n\n- **Reusability**: Once you create a good component, you can use it anywhere\n- **Maintainability**: Each piece lives in its own file with its own logic\n- **Testing**: It is easier to test individual components than the whole application\n\n## The incredible ecosystem\n\nReact is not just the library, it is the entire ecosystem around it:\n\n- **Next.js**: For server rendering and routes\n- **React Router**: For SPA navigation\n- **Tailwind CSS**: For fast and efficient styling\n- **React Query**: For asynchronous state management\n\n## The community\n\nThe React community is, in my experience, one of the most active and welcoming. You can always find:\n\n- Excellent documentation\n- Libraries for almost anything\n- Quality tutorials and courses\n- Fast help on StackOverflow and forums\n\n## Conclusion\n\nReact is not the best framework for everyone, but **for me it was perfect**. It helped me better understand frontend development and gave me tools to build complex applications elegantly.\n\nIf you have not tried it yet, I recommend giving it a chance. And if you already use it, what do you like most?\n\n---\n`,
};

const tagTranslations: Record<string, string> = {
  aprendizaje: 'learning', consistencia: 'consistency', desarrollo: 'development',
};

type I18nValue = {
  language: Language;
  t: (value: string) => string;
  translatePost: (post: BlogPost) => BlogPost;
  formatDate: (value: string, options?: Intl.DateTimeFormatOptions) => string;
  toggleLanguage: () => void;
};

const I18nContext = createContext<I18nValue | null>(null);

export const I18nProvider = ({ children }: { children: ReactNode }) => {
  const [language, setLanguage] = useState<Language>(() => (localStorage.getItem('portfolio-language') as Language) || 'es');

  useEffect(() => {
    localStorage.setItem('portfolio-language', language);
    document.documentElement.lang = language;
    document.title = language === 'en' ? 'Samuel Bonifacio — Full-Stack Developer' : 'Samuel Bonifacio';
  }, [language]);

  const value = useMemo<I18nValue>(() => ({
    language,
    t: (value) => language === 'en' ? translations[value] ?? value : value,
    translatePost: (post) => language === 'es' ? post : ({
      ...post,
      title: translations[post.title] ?? post.title,
      category: translations[post.category] ?? post.category,
      excerpt: translations[post.excerpt] ?? post.excerpt,
      tags: post.tags.map((tag) => tagTranslations[tag] ?? tag),
      content: blogContent[post.slug] ?? post.content,
    }),
    formatDate: (value, options) => new Date(value).toLocaleDateString(language === 'en' ? 'en-US' : 'es-ES', options ?? { day: 'numeric', month: 'long', year: 'numeric' }),
    toggleLanguage: () => setLanguage((current) => current === 'es' ? 'en' : 'es'),
  }), [language]);

  return <I18nContext.Provider value={value}>{children}</I18nContext.Provider>;
};

export const useI18n = () => {
  const context = useContext(I18nContext);
  if (!context) throw new Error('useI18n must be used inside I18nProvider');
  return context;
};
