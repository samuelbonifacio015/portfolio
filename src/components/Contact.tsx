
import { Github, Linkedin, Mail, MapPin } from 'lucide-react';
import { useEffect, useRef, useState } from 'react';

const Contact = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.unobserve(entry.target);
        }
      },
      {
        root: null,
        threshold: 0.1,
      }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => {
      if (sectionRef.current) {
        observer.unobserve(sectionRef.current);
      }
    };
  }, []);

  return (
    <section
      id="contact"
      ref={sectionRef}
      className="section-padding px-4 relative bg-black/20"
    >
      <div className="container mx-auto max-w-6xl">
        <div className={`space-y-4 text-center mb-12 transition-all duration-700 ease-out ${isVisible ? 'opacity-100' : 'opacity-0 transform translate-y-8'}`}>
          <span className="inline-block px-3 py-1 text-xs font-medium rounded-full bg-primary/10 text-primary/90">
            Contacto
          </span>
          <h2 className="text-3xl md:text-4xl font-bold text-white">¿Hablamos?</h2>
          <p className="text-white/70 max-w-2xl mx-auto">
            Contacta conmigo para colaboraciones o si tienes alguna pregunta sobre mi trabajo.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8">
          <div 
            className={`glass-card rounded-xl p-6 md:col-span-2 transition-all duration-700 ease-out ${isVisible ? 'opacity-100' : 'opacity-0 transform translate-y-8'}`}
            style={{ transitionDelay: '200ms' }}
          >
            <h3 className="text-xl font-semibold text-white mb-6">Envíame un mensaje</h3>
            <form className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label htmlFor="name" className="block text-sm font-medium text-white/70 mb-1">
                    Nombre
                  </label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    className="w-full px-4 py-2 bg-white/5 border border-white/10 rounded-lg focus:ring-2 focus:ring-primary/50 focus:border-primary/50 focus:outline-none text-white"
                    placeholder="Tu nombre"
                  />
                </div>
                <div>
                  <label htmlFor="email" className="block text-sm font-medium text-white/70 mb-1">
                    Email
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    className="w-full px-4 py-2 bg-white/5 border border-white/10 rounded-lg focus:ring-2 focus:ring-primary/50 focus:border-primary/50 focus:outline-none text-white"
                    placeholder="tu@email.com"
                  />
                </div>
              </div>
              <div>
                <label htmlFor="subject" className="block text-sm font-medium text-white/70 mb-1">
                  Asunto
                </label>
                <input
                  type="text"
                  id="subject"
                  name="subject"
                  className="w-full px-4 py-2 bg-white/5 border border-white/10 rounded-lg focus:ring-2 focus:ring-primary/50 focus:border-primary/50 focus:outline-none text-white"
                  placeholder="Asunto de tu mensaje"
                />
              </div>
              <div>
                <label htmlFor="message" className="block text-sm font-medium text-white/70 mb-1">
                  Mensaje
                </label>
                <textarea
                  id="message"
                  name="message"
                  rows={4}
                  className="w-full px-4 py-2 bg-white/5 border border-white/10 rounded-lg focus:ring-2 focus:ring-primary/50 focus:border-primary/50 focus:outline-none text-white resize-none"
                  placeholder="Tu mensaje..."
                />
              </div>
              <button
                type="submit"
                className="w-full md:w-auto px-6 py-3 bg-primary hover:bg-primary/90 text-white font-medium rounded-lg transition-all duration-300 transform hover:translate-y-[-2px] shadow-md shadow-primary/20"
              >
                Enviar mensaje
              </button>
            </form>
          </div>

          <div 
            className={`glass-card rounded-xl p-6 transition-all duration-700 ease-out ${isVisible ? 'opacity-100' : 'opacity-0 transform translate-y-8'}`}
            style={{ transitionDelay: '300ms' }}
          >
            <h3 className="text-xl font-semibold text-white mb-6">Información de contacto</h3>
            <div className="space-y-4">
              <div className="flex items-start gap-3">
                <Mail className="h-5 w-5 text-primary shrink-0 mt-1" />
                <div>
                  <p className="text-sm text-white/70">Email</p>
                  <a href="mailto:tu@email.com" className="text-white hover:text-primary transition-colors">
                    samuelbonifacio015@gmail.com
                  </a>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <MapPin className="h-5 w-5 text-primary shrink-0 mt-1" />
                <div>
                  <p className="text-sm text-white/70">Ubicación</p>
                  <p className="text-white">Lima, Perú</p>
                </div>
              </div>
              
              <div className="pt-4 mt-6 border-t border-white/10">
                <p className="text-sm text-white/70 mb-3">Sígueme en</p>
                <div className="flex space-x-4">
                  <a
                    href="https://github.com/samuelbonifacio015"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="h-10 w-10 rounded-full bg-white/5 flex items-center justify-center hover:bg-primary/20 hover:text-primary transition-all duration-300"
                    aria-label="GitHub"
                  >
                    <Github className="h-5 w-5" />
                  </a>
                  <a
                    href="https://www.linkedin.com/in/samuel-bonifacio-208a37364/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="h-10 w-10 rounded-full bg-white/5 flex items-center justify-center hover:bg-primary/20 hover:text-primary transition-all duration-300"
                    aria-label="LinkedIn"
                  >
                    <Linkedin className="h-5 w-5" />
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Contact;
