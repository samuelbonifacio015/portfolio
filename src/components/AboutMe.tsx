import { Download, GraduationCap } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';

const AboutMe = () => {
  return (
    <section className="px-5 py-12 md:px-6 md:py-16">
      <Card className="mx-auto max-w-[var(--container-max)] overflow-hidden">
        <div className="grid gap-0 md:grid-cols-[1fr_220px]">
          <div className="p-6 sm:p-8 md:p-10">
            <div className="mb-6 flex items-center gap-4">
              <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-lg bg-primary text-primary-foreground">
                <GraduationCap aria-hidden="true" />
              </span>
              <div>
                <h2 className="text-2xl font-bold text-foreground sm:text-3xl">Sobre mí</h2>
                <p className="mt-1 text-sm text-muted-foreground">Ingeniería de Software</p>
              </div>
            </div>

            <div className="max-w-[68ch] space-y-4 text-sm leading-7 text-muted-foreground sm:text-base">
              <p>
                Soy Samuel Bonifacio, estudiante del tercer año de la carrera de Ingeniería de Software en la Universidad Peruana de Ciencias Aplicadas.
              </p>
              <p>
                Múltiples veces perteneciendo al tercio superior, mi curiosidad por el área de la tecnología me ha llevado a incursionar en el desarrollo de varios proyectos a lo largo de mi carrera.
              </p>
              <p>
                Actualmente busco oportunidades que me permitan adquirir experiencias profesionales y seguir incursionando en el desarrollo de software.
              </p>
            </div>

            <Button asChild className="mt-7" variant="outline">
              <a href="/utils/SamuelBonifacioCV.pdf" download>
                <Download aria-hidden="true" />
                Descargar CV
              </a>
            </Button>
          </div>

          <img
            src="/utils/SamuelUPC.webp"
            alt="Samuel Bonifacio"
            className="h-64 w-full object-cover md:h-full"
            loading="lazy"
          />
        </div>
      </Card>
    </section>
  );
};

export default AboutMe;
