
const Inspiration = () => {
  return (
    <section id="inspiration" className="px-5 py-12 md:px-6 md:py-16">
      <div
        className="mx-auto max-w-[var(--container-max)] overflow-hidden rounded-[var(--radius-card)] bg-muted"
      >
        <img
          src="/utils/FamiliaCasa.webp"
          alt="Samuel Bonifacio junto a sus padres, su mayor inspiración"
          className="aspect-[4/3] w-full object-cover object-center"
          loading="lazy"
        />

        <div className="p-6 sm:p-8 md:p-10">
          <h2 className="text-center text-2xl font-bold text-foreground sm:text-3xl">Inspiración</h2>
          <blockquote className="mx-auto mt-4 max-w-[34ch] text-center text-xl font-medium italic leading-8 text-foreground sm:text-2xl">
            &quot;La familia no es una cosa importante. Es todo.&quot;
          </blockquote>
          <div className="mx-auto mt-5 max-w-[68ch] space-y-4 text-sm leading-7 text-muted-foreground sm:text-base">
            <p>
              Mi principal fuente de inspiración es mi familia. Su apoyo constante y la confianza que depositan en mí han sido fundamentales para mantenerme enfocado y perseverar en el desarrollo de mis proyectos, incluso en los momentos más exigentes.
            </p>
            <p>
              Gracias a ellos cuento con estabilidad, oportunidades y un entorno que me permite crecer profesional y personalmente. Retribuir todo ese esfuerzo y apoyo, mejorando nuestro estilo de vida a través de mi trabajo como desarrollador de software, es uno de mis mayores objetivos y una motivación diaria.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Inspiration;
