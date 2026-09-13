import { Download } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { MagicCard } from '@/components/magicui/magic-card';
import { useTheme } from '@/hooks/use-theme';
import { useI18n } from '@/lib/i18n';

const AboutMe = () => {
  const { isDark } = useTheme();
  const { language, t } = useI18n();
  const cvFile = `/utils/SamuelBonifacioCV-${language.toUpperCase()}.pdf`;

  return (
    <section className="px-5 py-12 md:px-6 md:py-16">
      <Card className="mx-auto max-w-[var(--container-max)] overflow-hidden border-none bg-transparent p-0 shadow-none">
        <MagicCard
          gradientColor={isDark ? '#262626' : '#D9D9D955'}
          gradientFrom={isDark ? '#52525B' : '#D4D4D8'}
          gradientTo={isDark ? '#A1A1AA' : '#52525B'}
          className="p-0"
        >
          <div className="grid gap-0 md:grid-cols-[1fr_220px]">
          <div className="p-6 sm:p-8 md:p-10">
            <h2 className="mb-6 text-3xl font-bold text-foreground sm:text-4xl">{t('Sobre mí')}</h2>

            <div className="max-w-[68ch] space-y-4 text-sm leading-7 text-muted-foreground sm:text-base">
              <p>
                {t('Soy Samuel Bonifacio, estudiante del tercer año de la carrera de Ingeniería de Software en la Universidad Peruana de Ciencias Aplicadas.')}
              </p>
              <p>
                {t('Múltiples veces perteneciendo al tercio superior, mi curiosidad por el área de la tecnología me ha llevado a incursionar en el desarrollo de varios proyectos a lo largo de mi carrera.')}
              </p>
              <p>
                {t('Actualmente busco oportunidades que me permitan adquirir experiencias profesionales y seguir incursionando en el desarrollo de software.')}
              </p>
            </div>

            <Button asChild className="mt-7" variant="outline">
              <a href={cvFile} download aria-describedby="cv-download-note">
                <Download aria-hidden="true" />
                {t('Descargar CV')}
              </a>
            </Button>
            <p id="cv-download-note" className="mt-2 text-xs text-muted-foreground">
              {t('El CV está disponible para descargar en español e inglés según el idioma seleccionado.')}
            </p>
          </div>

          <img
            src="/utils/SamuelUPC.webp"
            alt="Samuel Bonifacio"
            className="h-64 w-full object-cover md:h-full"
            loading="lazy"
          />
          </div>
        </MagicCard>
      </Card>
    </section>
  );
};

export default AboutMe;
