import { Github, Linkedin, Mail, MapPin } from 'lucide-react';
import { useRef, useState } from 'react';
import emailjs from '@emailjs/browser';
import { toast } from 'sonner';
import { LiquidGlass } from '@/components/ui/LiquidGlass';
import { useSectionReveal } from '@/hooks/use-section-reveal';

const Contact = () => {
  const { ref: sectionRef, isVisible } = useSectionReveal<HTMLElement>();
  const formRef = useRef<HTMLFormElement>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError(null);

    try {
      const result = await emailjs.sendForm(
        import.meta.env.VITE_EMAILJS_SERVICE_ID,
        import.meta.env.VITE_EMAILJS_TEMPLATE_ID,
        formRef.current!,
        import.meta.env.VITE_EMAILJS_PUBLIC_KEY
      );

      if (result.text === 'OK') {
        toast.success('¡Mensaje enviado!', {
          description: 'Tu mensaje ha sido enviado correctamente. Te responderé lo antes posible.',
        });
        formRef.current?.reset();
      }
    } catch (err) {
      console.error('Error:', err);
      setError('Error al enviar el mensaje. Intenta nuevamente.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <section
      id="contact"
      ref={sectionRef}
      className="section-padding px-4 relative bg-background scroll-mt-20"
    >
      <div className="container mx-auto max-w-6xl">
        <div className={`space-y-4 text-center mb-12 transition-all duration-700 ease-out ${isVisible ? 'opacity-100' : 'opacity-0 transform translate-y-8'}`}>
          <span className="inline-block px-3 py-1 text-xs font-medium rounded-full bg-primary/20 text-primary">
            Contacto
          </span>
          <h2 className="text-3xl md:text-4xl font-bold text-foreground">¿Hablamos?</h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Contacta conmigo para colaboraciones o si tienes alguna pregunta sobre mi trabajo.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8">
          <LiquidGlass
            variant="card"
            enableBreathing
            className={`rounded-xl p-6 md:col-span-2 transition-all duration-700 ease-out ${isVisible ? 'opacity-100' : 'opacity-0 transform translate-y-8'}`}
            style={{ transitionDelay: '200ms' }}
          >
            <h3 className="text-xl font-semibold text-foreground mb-6">Envíame un mensaje</h3>
            <form ref={formRef} onSubmit={handleSubmit} className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label htmlFor="name" className="block text-sm font-medium text-muted-foreground mb-1">
                    Nombre
                  </label>
                  <input
                    type="text"
                    id="name"
                    name="user_name"
                    required
                    className="w-full px-4 py-2 bg-background dark:bg-white/5 border border-input dark:border-white/10 rounded-lg focus:ring-2 focus:ring-primary/50 focus:border-primary/50 focus:outline-none text-foreground dark:text-white"
                    placeholder="Tu nombre"
                  />
                </div>
                <div>
                  <label htmlFor="email" className="block text-sm font-medium text-muted-foreground mb-1">
                    Email
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="user_email"
                    required
                    className="w-full px-4 py-2 bg-background dark:bg-white/5 border border-input dark:border-white/10 rounded-lg focus:ring-2 focus:ring-primary/50 focus:border-primary/50 focus:outline-none text-foreground dark:text-white"
                    placeholder="tu@email.com"
                  />
                </div>
              </div>
              <div>
                <label htmlFor="subject" className="block text-sm font-medium text-muted-foreground mb-1">
                  Asunto
                </label>
                <input
                  type="text"
                  id="subject"
                  name="subject"
                  required
                  className="w-full px-4 py-2 bg-background dark:bg-white/5 border border-input dark:border-white/10 rounded-lg focus:ring-2 focus:ring-primary/50 focus:border-primary/50 focus:outline-none text-foreground dark:text-white"
                  placeholder="Asunto de tu mensaje"
                />
              </div>
              <div>
                <label htmlFor="message" className="block text-sm font-medium text-muted-foreground mb-1">
                  Mensaje
                </label>
                <textarea
                  id="message"
                  name="message"
                  rows={4}
                  required
                  className="w-full px-4 py-2 bg-background dark:bg-white/5 border border-input dark:border-white/10 rounded-lg focus:ring-2 focus:ring-primary/50 focus:border-primary/50 focus:outline-none text-foreground dark:text-white resize-none"
                  placeholder="Tu mensaje..."
                />
              </div>
              {error && (
                <p className="text-red-400 text-sm">{error}</p>
              )}
              <button
                type="submit"
                disabled={isLoading}
                className="w-full md:w-auto px-6 py-3 bg-primary hover:bg-primary/90 text-white font-medium rounded-lg transition-all duration-300 transform hover:translate-y-[-2px] shadow-md shadow-primary/20 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isLoading ? 'Enviando...' : 'Enviar mensaje'}
              </button>
            </form>
          </LiquidGlass>

          <LiquidGlass
            variant="card"
            enableBreathing
            className={`rounded-xl p-6 flex flex-col items-center text-center transition-all duration-700 ease-out ${isVisible ? 'opacity-100' : 'opacity-0 transform translate-y-8'}`}
            style={{ transitionDelay: '300ms' }}
          >
            <h3 className="text-xl font-semibold text-foreground mb-6">Información de contacto</h3>
            <div className="space-y-5 w-full">
              <div className="flex items-center gap-4">
                <div className="h-10 w-10 rounded-lg bg-primary/10 flex items-center justify-center">
                  <Mail className="h-5 w-5 text-primary" />
                </div>
                <div className="flex-1">
                  <p className="text-sm font-medium text-muted-foreground mb-1">Email</p>
                  <a 
                    href="mailto:samuelbonifacio015@gmail.com" 
                    className="text-foreground hover:text-primary transition-colors break-all font-medium"
                  >
                    samuelbonifacio015@gmail.com
                  </a>
                </div>
              </div>
              <div className="flex items-center gap-4">
                <div className="h-10 w-10 rounded-lg bg-primary/10 flex items-center justify-center">
                  <MapPin className="h-5 w-5 text-primary" />
                </div>
                <div className="flex-1">
                  <p className="text-sm font-medium text-muted-foreground mb-1">Ubicación</p>
                  <p className="text-foreground font-medium">Lima, Perú</p>
                </div>
              </div>
              
              <div className="pt-5 mt-6 border-t border-border w-full">
                <p className="text-sm font-medium text-muted-foreground mb-4">Sígueme en</p>
                <div className="flex justify-center space-x-4">
                  <a
                    href="https://github.com/samuelbonifacio015"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="h-12 w-12 rounded-xl bg-slate-100 dark:bg-white/5 flex items-center justify-center hover:bg-primary hover:text-white transition-all duration-300 border border-slate-200 dark:border-white/10"
                    aria-label="GitHub"
                  >
                    <Github className="h-5 w-5" />
                  </a>
                  <a
                    href="https://www.linkedin.com/in/samuelbonifacio015"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="h-12 w-12 rounded-xl bg-slate-100 dark:bg-white/5 flex items-center justify-center hover:bg-primary hover:text-white transition-all duration-300 border border-slate-200 dark:border-white/10"
                    aria-label="LinkedIn"
                  >
                    <Linkedin className="h-5 w-5" />
                  </a>
                </div>
              </div>
            </div>
          </LiquidGlass>
        </div>
      </div>

    </section>
  );
};

export default Contact;
