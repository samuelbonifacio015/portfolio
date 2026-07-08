
import KnowledgeItem from './KnowledgeItem';
import { useSectionReveal } from '@/hooks/use-section-reveal';

const Knowledge = () => {
  const { ref: sectionRef, isVisible } = useSectionReveal<HTMLElement>();

  const knowledgeItems = [
    {
      icon: 'code' as const,
      title: "Desarrollo web Frontend",
      description: "React, Angular, Vue y Next.js en producción: LlamIA, WeRide, MaquinariasJyS y este portfolio."
    },
    {
      icon: 'palette' as const,
      title: "Diseño UI/UX",
      description: "Interfaces con Tailwind y shadcn/ui, responsive y con modo oscuro; este sitio es la demo."
    },
    {
      icon: 'boxes' as const,
      title: "Arquitectura de software",
      description: "APIs REST con Spring Boot, Django y .NET conectadas a frontends desacoplados."
    },
    {
      icon: 'database' as const,
      title: "Bases de datos",
      description: "PostgreSQL con Supabase, SQL, y persistencia local con ROOM en Android (Klippr)."
    },
    {
      icon: 'rocket' as const,
      title: "Despliegue",
      description: "Deploys continuos en Vercel y Render integrados con GitHub."
    },
    {
      icon: 'users' as const,
      title: "Metodologías ágiles",
      description: "Scrum en equipos universitarios de 4-6 personas (WeRide, CultivApp)."
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
          <h2 className="text-3xl md:text-4xl font-bold text-foreground">Conocimientos</h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
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
                icon={item.icon}
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
