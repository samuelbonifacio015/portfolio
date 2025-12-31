import React, { useRef, useEffect, useState } from "react";

//AboutMe

const AboutMe = () => {
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
      className={`w-full flex justify-center mt-12 px-4 transition-opacity duration-1000 ${
        isVisible ? "opacity-100" : "opacity-0"
      }`}
    >
      <div className="glass-card rounded-xl sm:rounded-2xl max-w-5xl w-full p-6 sm:p-8 md:p-10 lg:p-12 flex flex-col md:flex-row items-center md:items-stretch gap-6 sm:gap-8 md:gap-12 lg:gap-16 text-center md:text-left shadow-xl">
        <div className="flex-1 flex flex-col justify-center">
          <span className="inline-block w-fit px-3 py-1 text-xs font-medium rounded-full bg-primary/10 text-primary/90 mb-4 animate-fade-in mx-auto md:mx-0">
            Información Personal
          </span>
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-white mb-4 md:mb-6 border-b-4 border-primary/60 pb-2 md:pb-4 w-fit self-center md:self-start tracking-tight text-center md:text-left">
            Sobre Mi
          </h2>
          <p className="text-white/80 text-sm md:text-xl mb-4 max-w-2xl">
            Soy Samuel Bonifacio, estudiante del tercer año de la carrera de
            Ingeniería de Software en la Universidad Peruana de Ciencias
            Aplicadas.
          </p>
          <p className="text-white/80 text-sm md:text-xl mb-4 max-w-2xl">
            Múltiples veces perteneciendo al tercio superior, mi curiosidad por la tecnología me ha llevado a incursionar en distintas tecnologías a lo largo de mi carrera.
          </p>
          <p className="text-white/80 text-sm md:text-xl max-w-2xl">
            Actualmente busco oportunidades que me permitan adquirir nuevas
            experiencias y seguir mejorando como desarrollador de software profesional.
          </p>
        </div>
        <div className="flex flex-col items-center justify-center gap-4 w-full md:w-auto max-w-xs mx-auto">
          <div className="overflow-hidden rounded-xl sm:rounded-2xl shadow-lg border-2 sm:border-4 border-primary/60 bg-black/30 w-64 h-64 sm:w-72 sm:h-72 md:w-80 md:h-80 flex items-center justify-center mb-2">
            <img
              src="/utils/SamuelUPC.jpg"
              alt="Samuel Bonifacio"
              className="object-cover w-full h-full"
            />
          </div>
          <a
            href="/utils/SamuelBonifacioCV.docx"
            download
            className="inline-flex items-center justify-center gap-2 px-4 sm:px-6 py-2.5 sm:py-3 rounded-lg bg-primary hover:bg-primary/90 text-white text-sm sm:text-base font-medium transition-all duration-300 shadow-lg shadow-primary/20 w-full"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-4 w-4 sm:h-5 sm:w-5"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M4 16v2a2 2 0 002 2h12a2 2 0 002-2v-2M7 10l5 5m0 0l5-5m-5 5V4"
              />
            </svg>
            Descargar CV
          </a>
        </div>
      </div>
    </section>
  );
};

export default AboutMe;