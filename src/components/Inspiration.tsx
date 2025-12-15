import React, { useEffect, useRef, useState } from "react";

//Inspiration

const Inspiration = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const observer = new window.IntersectionObserver(
      ([entry]) => setIsVisible(entry.isIntersecting),
      { threshold: 0.2 }
    );
    if (sectionRef.current) observer.observe(sectionRef.current);
    return () => observer.disconnect();
  }, []);

  return (
    <section
      ref={sectionRef}
      id="inspiration"
      className={`w-full flex justify-center mt-12 px-4 transition-opacity duration-1000 ${
        isVisible ? "opacity-100" : "opacity-0"
      }`}
    >
      <div className="glass-card rounded-2xl max-w-5xl w-full p-8 md:p-12 flex flex-col md:flex-row items-center md:items-stretch gap-8 md:gap-16 text-center md:text-left shadow-xl">
        <div className="flex-1 flex flex-col justify-center order-2 md:order-1">
          <span className="inline-block w-fit px-3 py-1 text-xs font-medium rounded-full bg-primary/10 text-primary/90 mb-4 animate-fade-in mx-auto md:mx-0">
            Valores
          </span>
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4 md:mb-6 border-b-4 border-primary/60 pb-2 md:pb-4 w-fit self-center md:self-start tracking-tight text-center md:text-left">
            Inspiración
          </h2>
          
          <div className="mb-6 md:mb-8">
            <div className="flex items-start gap-3 mb-4">
              <div className="w-1 h-16 bg-primary rounded-full flex-shrink-0 hidden sm:block"></div>
              <p className="text-white/90 text-base md:text-xl italic font-light leading-relaxed">
                "La familia no es una cosa importante. Es todo."
              </p>
            </div>
          </div>

          <p className="text-white/80 text-sm md:text-xl mb-4 max-w-2xl">
            Mi principal fuente de inspiración es mi familia. Su apoyo constante y la confianza que depositan en mí han sido fundamentales para mantenerme enfocado y perseverar en el desarrollo de mis proyectos, incluso en los momentos más exigentes.
          </p>
          <p className="text-white/80 text-sm md:text-xl mb-4 max-w-2xl">
            Gracias a ellos cuento con estabilidad, oportunidades y un entorno que me permite crecer profesional y personalmente. Retribuir todo ese esfuerzo y apoyo, mejorando nuestro estilo de vida a través de mi trabajo como desarrollador de software, es uno de mis mayores objetivos y una motivación diaria.
          </p>
        </div>

        <div className="flex flex-col items-center justify-center gap-4 w-full md:w-auto max-w-xs mx-auto order-1 md:order-2">
          <div className="overflow-hidden rounded-2xl shadow-lg border-4 border-primary/60 bg-black/30 w-full max-w-xs md:w-80 md:h-80 aspect-square flex items-center justify-center">
            <img
              src="/utils/Familia.jpeg"
              alt="Mi familia - Mi mayor inspiración"
              className="object-cover w-full h-full"
              loading="lazy"
            />
          </div>
        </div>
      </div>
    </section>
  );
};

export default Inspiration;
