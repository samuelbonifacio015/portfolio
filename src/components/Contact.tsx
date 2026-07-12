import { Github, Linkedin, Mail, MapPin, Send } from 'lucide-react';
import { useRef, useState } from 'react';
import emailjs from '@emailjs/browser';
import { toast } from 'sonner';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';

const fieldClassName =
  'mt-1.5 w-full rounded-lg border border-input bg-background px-4 py-2.5 text-foreground placeholder:text-muted-foreground focus:border-primary focus:outline-none focus:ring-2 focus:ring-ring/30';

const Contact = () => {
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
    <section id="contact" className="scroll-mt-28 px-5 py-20 md:px-6 md:py-24">
      <div className="mx-auto max-w-[var(--container-max)]">
        <div className="mb-10">
          <h2 className="text-balance text-3xl font-bold text-foreground sm:text-4xl">¿Hablamos?</h2>
          <p className="mt-3 max-w-2xl text-pretty text-muted-foreground">
            Contacta conmigo para colaboraciones o si tienes alguna pregunta sobre mi trabajo.
          </p>
        </div>

        <Card className="grid overflow-hidden md:grid-cols-[1.45fr_0.75fr]">
          <div className="p-6 sm:p-8">
            <h3 className="text-xl font-semibold text-foreground">Envíame un mensaje</h3>
            <form ref={formRef} onSubmit={handleSubmit} className="mt-6 space-y-4" aria-describedby={error ? 'contact-error' : undefined}>
              <div className="grid gap-4 sm:grid-cols-2">
                <label htmlFor="name" className="text-sm font-medium text-foreground">
                  Nombre
                  <input id="name" name="user_name" type="text" autoComplete="name" required className={fieldClassName} placeholder="Tu nombre" />
                </label>
                <label htmlFor="email" className="text-sm font-medium text-foreground">
                  Email
                  <input id="email" name="user_email" type="email" autoComplete="email" required className={fieldClassName} placeholder="tu@email.com" />
                </label>
              </div>

              <label htmlFor="subject" className="block text-sm font-medium text-foreground">
                Asunto
                <input id="subject" name="subject" type="text" required className={fieldClassName} placeholder="Asunto de tu mensaje" />
              </label>

              <label htmlFor="message" className="block text-sm font-medium text-foreground">
                Mensaje
                <textarea id="message" name="message" rows={4} required className={`${fieldClassName} resize-none`} placeholder="Tu mensaje..." />
              </label>

              {error && <p id="contact-error" role="alert" aria-live="polite" className="text-sm font-medium text-destructive">{error}</p>}

              <Button type="submit" size="lg" disabled={isLoading}>
                <Send aria-hidden="true" />
                {isLoading ? 'Enviando...' : 'Enviar mensaje'}
              </Button>
            </form>
          </div>

          <div className="space-y-6 border-t border-border bg-muted p-6 sm:p-8 md:border-l md:border-t-0">
            <div>
              <h3 className="text-lg font-semibold text-foreground">Información de contacto</h3>
              <div className="mt-4 space-y-4">
                <div className="flex items-start gap-3">
                  <Mail className="mt-0.5 h-5 w-5 shrink-0 text-primary" aria-hidden="true" />
                  <div>
                    <p className="text-xs font-medium text-muted-foreground">Email</p>
                    <a href="mailto:samuelbonifacio015@gmail.com" className="mt-1 block break-all text-sm font-medium text-foreground hover:underline">
                      samuelbonifacio015@gmail.com
                    </a>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <MapPin className="mt-0.5 h-5 w-5 shrink-0 text-primary" aria-hidden="true" />
                  <div>
                    <p className="text-xs font-medium text-muted-foreground">Ubicación</p>
                    <p className="mt-1 text-sm font-medium text-foreground">Lima, Perú</p>
                  </div>
                </div>
              </div>
            </div>

            <div>
              <h3 className="text-lg font-semibold text-foreground">Sígueme en</h3>
              <div className="mt-3">
                <a
                  href="https://github.com/samuelbonifacio015"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-3 border-b border-border py-3 transition-colors hover:text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
                >
                  <Github className="h-5 w-5" aria-hidden="true" />
                  <span>
                    <strong className="block text-sm text-foreground">GitHub</strong>
                    <span className="text-xs text-muted-foreground">Ver perfil</span>
                  </span>
                </a>
                <a
                  href="https://www.linkedin.com/in/samuelbonifacio015"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-3 py-3 transition-colors hover:text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
                >
                  <Linkedin className="h-5 w-5" aria-hidden="true" />
                  <span>
                    <strong className="block text-sm text-foreground">LinkedIn</strong>
                    <span className="text-xs text-muted-foreground">Ver perfil</span>
                  </span>
                </a>
              </div>
            </div>
          </div>
        </Card>
      </div>
    </section>
  );
};

export default Contact;
