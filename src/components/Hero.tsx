import { ArrowDown } from 'lucide-react';
import { useEffect, useState } from 'react';

const Hero = () => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    setIsVisible(true);
  }, []);

  return (
    <section
      id="home"
      className="min-h-screen flex flex-col items-center justify-center relative px-4 py-20 scroll-mt-20"
    >
      <div className="absolute inset-0 bg-gradient-to-b from-black/90 via-background to-background z-[-1]"></div>
      
      <div className="absolute top-1/3 left-1/4 w-64 h-64 bg-primary/10 rounded-full blur-3xl"></div>
      <div className="absolute bottom-1/3 right-1/4 w-80 h-80 bg-blue-500/5 rounded-full blur-3xl"></div>
      
      <div className="container mx-auto max-w-4xl">
        <div className={`transition-all duration-1000 ease-[cubic-bezier(0.4,0,0.2,1)] ${isVisible ? 'opacity-100 translate-y-0 scale-100' : 'opacity-0 translate-y-8 scale-95'}`}> 
          <div className="glass-card rounded-xl sm:rounded-2xl p-6 sm:p-8 md:p-12 lg:p-16 flex flex-col md:flex-row items-center justify-between gap-8 sm:gap-10 md:gap-12 lg:gap-16 shadow-2xl">
            <div className="flex-1 flex flex-col items-center md:items-start justify-center">
              <span className="inline-block px-3 py-1 text-xs sm:text-sm font-medium rounded-full bg-primary/10 text-primary/90 mb-4 sm:mb-6 animate-fade-in">
                Desarrollador Web UX/UI
              </span>
              <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold mb-3 sm:mb-4 tracking-tight text-white font-display text-center md:text-left leading-tight">
                Samuel Bonifacio<span className="text-primary">.</span>
              </h1>
              <p className="text-base sm:text-lg md:text-xl text-white/80 mb-6 sm:mb-8 max-w-md animate-fade-in text-center md:text-left">
                Ingeniero de software especializado en frontend y frameworks ágiles.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 items-center justify-center w-full">
                <a
                  href="#projects"
                  className="px-6 py-3 rounded-lg bg-primary hover:bg-primary/90 text-white font-medium transition-all duration-300 text-center transform hover:translate-y-[-2px] shadow-lg shadow-primary/20 w-full sm:w-auto"
                >
                  Ver Proyectos
                </a>
                <a
                  href="#contact"
                  className="px-6 py-3 rounded-lg bg-white/10 hover:bg-white/15 text-white font-medium border border-white/10 transition-all duration-300 text-center backdrop-blur-sm transform hover:translate-y-[-2px] w-full sm:w-auto"
                >
                  Contacto
                </a>
              </div>
            </div>
            <div className="flex-1 flex justify-center md:justify-end mt-6 md:mt-0">
              <img
                src="/utils/Samuel Bonifacio.jpeg"
                alt="Samuel Bonifacio"
                className="w-48 h-48 sm:w-64 sm:h-64 md:w-72 md:h-72 lg:w-80 lg:h-80 object-cover rounded-2xl sm:rounded-3xl border-2 sm:border-4 border-primary shadow-2xl max-w-[340px] max-h-[340px]"
              />
            </div>
          </div>
        </div>
      </div>
      
      <a
        href="#projects"
        className="absolute bottom-8 left-1/2 transform -translate-x-1/2 text-white/50 hover:text-white animate-bounce transition-colors duration-300"
        aria-label="Scroll to projects"
      >
        <ArrowDown size={24} />
      </a>
    </section>
  );
};

export default Hero;
