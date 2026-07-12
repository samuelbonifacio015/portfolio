
const Inspiration = () => {
  return (
    <section id="inspiration" className="section-padding px-5 md:px-6">
      <div
        className="mx-auto max-w-[var(--container-max)] rounded-[var(--radius-card)] bg-muted p-6 sm:p-8 md:p-10"
      >
        <div className="flex flex-col gap-6 sm:flex-row sm:items-start">
          <img
            src="/utils/Familia.webp"
            alt="Mi familia - Mi mayor inspiración"
            className="h-24 w-24 shrink-0 rounded-full object-cover"
            loading="lazy"
          />

          <div>
            <h2 className="text-2xl font-bold text-foreground sm:text-3xl">Inspiración</h2>
            <blockquote className="mt-4 text-xl font-medium italic leading-8 text-foreground sm:text-2xl">
              &quot;La familia no es una cosa importante. Es todo.&quot;
            </blockquote>
            <div className="mt-5 max-w-[68ch] space-y-4 text-sm leading-7 text-muted-foreground sm:text-base">
              <p>
                Mi principal fuente de inspiración es mi familia. Su apoyo constante y la confianza que depositan en mí han sido fundamentales para mantenerme enfocado y perseverar en el desarrollo de mis proyectos, incluso en los momentos más exigentes.
              </p>
              <p>
                Gracias a ellos cuento con estabilidad, oportunidades y un entorno que me permite crecer profesional y personalmente. Retribuir todo ese esfuerzo y apoyo, mejorando nuestro estilo de vida a través de mi trabajo como desarrollador de software, es uno de mis mayores objetivos y una motivación diaria.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Inspiration;
