
import KnowledgeItem from './KnowledgeItem';

const Knowledge = () => {

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
      className="scroll-mt-28 px-5 py-16 md:px-6 md:py-24"
    >
      <div className="mx-auto max-w-[var(--container-max)]">
        <div className="mb-8">
          <h2 className="text-3xl font-bold text-foreground">Conocimientos</h2>
          <p className="mt-3 max-w-2xl text-muted-foreground">
            Áreas en las que he trabajado a lo largo de mi carrera como desarrollador.
          </p>
        </div>

        <div className="border-y border-border">
          {knowledgeItems.map((item, index) => (
            <div key={index}>
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
