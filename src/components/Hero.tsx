
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
      className="min-h-screen flex flex-col items-center justify-center relative px-4 py-20"
    >
      <div className="absolute inset-0 bg-gradient-to-b from-black/90 via-background to-background z-[-1]"></div>
      
      <div className="absolute top-1/3 left-1/4 w-64 h-64 bg-primary/10 rounded-full blur-3xl"></div>
      <div className="absolute bottom-1/3 right-1/4 w-80 h-80 bg-blue-500/5 rounded-full blur-3xl"></div>
      
      <div className="container mx-auto max-w-4xl">
        <div className={`appear-done transition-all duration-700 ease-out ${isVisible ? 'opacity-100' : 'opacity-0 transform translate-y-8'}`}>
          <div className="glass-card rounded-xl p-8 md:p-12">
            <span className="inline-block px-3 py-1 text-xs font-medium rounded-full bg-primary/10 text-primary/90 mb-4 animate-fade-in">
              Desarrollador Web UX/UI
            </span>
            
            <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold mb-4 tracking-tight text-white">
              Samuel Bonifacio<span className="text-primary">.</span>
            </h1>
            
            <p className="text-lg md:text-xl text-white/80 max-w-2xl mb-8">
              Desarrollador web especializado en crear experiencias digitales elegantes y funcionales
              con un enfoque en interfaces minimalistas y de alto rendimiento.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4">
              <a
                href="#projects"
                className="px-6 py-3 rounded-lg bg-primary hover:bg-primary/90 text-white font-medium transition-all duration-300 text-center transform hover:translate-y-[-2px] shadow-lg shadow-primary/20"
              >
                Ver Proyectos
              </a>
              <a
                href="#contact"
                className="px-6 py-3 rounded-lg bg-white/10 hover:bg-white/15 text-white font-medium border border-white/10 transition-all duration-300 text-center backdrop-blur-sm transform hover:translate-y-[-2px]"
              >
                Contacto
              </a>
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
