import { LiquidGlass } from '@/components/ui/LiquidGlass';
import { useSectionReveal } from '@/hooks/use-section-reveal';

//Inspiration

const Inspiration = () => {
  const { ref: sectionRef, isVisible } = useSectionReveal<HTMLElement>();

  return (
    <section
      ref={sectionRef}
      id="inspiration"
      className={`w-full flex justify-center mt-12 px-4 transition-opacity duration-1000 ${
        isVisible ? "opacity-100" : "opacity-0"
      }`}
    >
      <LiquidGlass variant="card" enableBreathing className="rounded-2xl max-w-5xl w-full p-8 md:p-12 flex flex-col md:flex-row items-center md:items-stretch gap-8 md:gap-16 text-center md:text-left shadow-xl">
        <div className="flex-1 flex flex-col justify-center order-2 md:order-1">
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4 md:mb-6 tracking-tight text-center md:text-left">
            Inspiración
          </h2>

          <p className="mb-6 text-foreground text-base md:text-xl italic font-light leading-relaxed md:mb-8">
            "La familia no es una cosa importante. Es todo."
          </p>

          <p className="text-muted-foreground text-sm md:text-xl mb-4 max-w-2xl">
            Mi principal fuente de inspiración es mi familia. Su apoyo constante y la confianza que depositan en mí han sido fundamentales para mantenerme enfocado y perseverar en el desarrollo de mis proyectos, incluso en los momentos más exigentes.
          </p>
          <p className="text-muted-foreground text-sm md:text-xl mb-4 max-w-2xl">
            Gracias a ellos cuento con estabilidad, oportunidades y un entorno que me permite crecer profesional y personalmente. Retribuir todo ese esfuerzo y apoyo, mejorando nuestro estilo de vida a través de mi trabajo como desarrollador de software, es uno de mis mayores objetivos y una motivación diaria.
          </p>
        </div>

        <div className="flex flex-col items-center justify-center gap-4 w-full md:w-auto max-w-xs mx-auto order-1 md:order-2">
          <div className="overflow-hidden rounded-2xl shadow-lg w-full max-w-xs md:w-80 md:h-80 aspect-square flex items-center justify-center">
            <img
              src="/utils/Familia.webp"
              alt="Mi familia - Mi mayor inspiración"
              className="object-cover w-full h-full"
              loading="lazy"
            />
          </div>
        </div>
      </LiquidGlass>
    </section>
  );
};

export default Inspiration;
