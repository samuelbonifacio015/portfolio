import { Github, Linkedin, Mail, MapPin, Send } from 'lucide-react';
import { useRef, useState } from 'react';
import emailjs from '@emailjs/browser';
import { toast } from 'sonner';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { useI18n } from '@/lib/i18n';

const fieldClassName =
  'mt-1.5 w-full rounded-lg border border-input bg-background px-4 py-2.5 text-foreground placeholder:text-muted-foreground focus:border-primary focus:outline-none focus:ring-2 focus:ring-ring/30';

const emailJsConfig = {
  serviceId: import.meta.env.VITE_EMAILJS_SERVICE_ID,
  templateId: import.meta.env.VITE_EMAILJS_TEMPLATE_ID,
  publicKey: import.meta.env.VITE_EMAILJS_PUBLIC_KEY,
};

const hasEmailJsConfig = Object.values(emailJsConfig).every(Boolean);

const Contact = () => {
  const { t } = useI18n();
  const formRef = useRef<HTMLFormElement>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    if (!hasEmailJsConfig) {
      setError(t('El formulario no está disponible en este entorno. Puedes escribirme directamente por email.'));
      return;
    }

    setIsLoading(true);

    try {
      const result = await emailjs.sendForm(
        emailJsConfig.serviceId,
        emailJsConfig.templateId,
        formRef.current!,
        emailJsConfig.publicKey
      );

      if (result.text === 'OK') {
        toast.success(t('¡Mensaje enviado!'), {
          description: t('Tu mensaje ha sido enviado correctamente. Te responderé lo antes posible.'),
        });
        formRef.current?.reset();
      }
    } catch (err) {
      console.error('Error:', err);
      setError(t('No pude enviar el mensaje. Puedes intentarlo nuevamente o escribirme directamente por email.'));
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <section id="contact" className="scroll-mt-28 px-5 pb-8 pt-20 md:px-6 md:pb-10 md:pt-24">
      <div className="mx-auto max-w-[var(--container-max)]">
        <div className="mb-10">
          <h2 className="text-balance text-3xl font-bold text-foreground sm:text-4xl">{t('¿Hablamos?')}</h2>
          <p className="mt-3 max-w-2xl text-pretty text-muted-foreground">
            {t('Contacta conmigo para colaboraciones o si tienes alguna pregunta sobre mi trabajo.')}
          </p>
        </div>

        <Card className="grid overflow-hidden md:grid-cols-[1.45fr_0.75fr]">
          <div className="p-6 sm:p-8">
            <h3 className="text-xl font-semibold text-foreground">{t('Envíame un mensaje')}</h3>
            <form ref={formRef} onSubmit={handleSubmit} className="mt-6 space-y-4" aria-describedby={error ? 'contact-error' : undefined}>
              <div className="grid gap-4 sm:grid-cols-2">
                <label htmlFor="name" className="text-sm font-medium text-foreground">
                  {t('Nombre')}
                  <input id="name" name="user_name" type="text" autoComplete="name" required className={fieldClassName} placeholder={t('Tu nombre')} />
                </label>
                <label htmlFor="email" className="text-sm font-medium text-foreground">
                  {t('Email')}
                  <input id="email" name="user_email" type="email" autoComplete="email" required className={fieldClassName} placeholder="tu@email.com" />
                </label>
              </div>

              <label htmlFor="subject" className="block text-sm font-medium text-foreground">
                {t('Asunto')}
                <input id="subject" name="subject" type="text" required className={fieldClassName} placeholder={t('Asunto de tu mensaje')} />
              </label>

              <label htmlFor="message" className="block text-sm font-medium text-foreground">
                {t('Mensaje')}
                <textarea id="message" name="message" rows={4} required className={`${fieldClassName} resize-none`} placeholder={t('Tu mensaje...')} />
              </label>

              {error && (
                <p id="contact-error" role="alert" aria-live="polite" className="text-sm font-medium text-destructive">
                  {error}{' '}
                  <a href="mailto:samuelbonifacio019@gmail.com" className="underline underline-offset-2">{t('Abrir correo')}</a>
                </p>
              )}

              <Button type="submit" size="lg" disabled={isLoading}>
                <Send aria-hidden="true" />
                {isLoading ? t('Enviando...') : t('Enviar mensaje')}
              </Button>
            </form>
          </div>

          <div className="space-y-6 border-t border-border bg-muted p-6 sm:p-8 md:border-l md:border-t-0">
            <div>
              <h3 className="text-lg font-semibold text-foreground">{t('Información de contacto')}</h3>
              <div className="mt-4 space-y-4">
                <div className="flex items-start gap-3">
                  <Mail className="mt-0.5 h-5 w-5 shrink-0 text-primary" aria-hidden="true" />
                  <div className="min-w-0 flex-1">
                    <p className="text-xs font-medium text-muted-foreground">Email</p>
                    <a href="mailto:samuelbonifacio019@gmail.com" className="mt-1 block max-w-full break-words text-xs font-medium leading-4 text-foreground hover:underline">
                      samuelbonifacio019@gmail.com
                    </a>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <MapPin className="mt-0.5 h-5 w-5 shrink-0 text-primary" aria-hidden="true" />
                  <div>
                    <p className="text-xs font-medium text-muted-foreground">{t('Ubicación')}</p>
                    <p className="mt-1 text-sm font-medium text-foreground">{t('Lima, Perú')}</p>
                  </div>
                </div>
              </div>
            </div>

            <div>
              <h3 className="text-lg font-semibold text-foreground">{t('Sígueme en')}</h3>
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
                    <span className="text-xs text-muted-foreground">{t('Ver perfil')}</span>
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
                    <span className="text-xs text-muted-foreground">{t('Ver perfil')}</span>
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
