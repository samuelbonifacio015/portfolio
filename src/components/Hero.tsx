import { ArrowDownRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import TextFlipDemo from '@/components/text-flip';

const Hero = () => {
  return (
    <section id="home" className="scroll-mt-28 px-5 pb-14 pt-32 md:px-6 md:pb-20 md:pt-40">
      <div className="mx-auto max-w-[var(--container-max)]">
        <div className="mt-6 grid items-center gap-10 lg:grid-cols-[0.9fr_1.1fr] lg:gap-12">
          <div>
            <div className="mb-6 flex items-center gap-4">
              <img
                src="/samuel.jpg"
                alt="Samuel Bonifacio"
                className="h-20 w-20 rounded-full object-cover ring-1 ring-border sm:h-24 sm:w-24"
              />
              <TextFlipDemo />
            </div>

            <h1 className="max-w-xl text-balance text-4xl font-bold leading-[1.02] tracking-[-0.035em] text-foreground sm:text-5xl">
              Samuel Bonifacio<span className="text-primary">.</span>
            </h1>

            <p className="mt-5 max-w-[48ch] text-pretty text-base leading-7 text-muted-foreground sm:text-lg">
              Ingeniero de software especializado en crear productos web y soluciones con Inteligencia Artificial.
            </p>

            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <Button asChild size="lg">
                <a href="#projects">
                  Ver Proyectos
                  <ArrowDownRight aria-hidden="true" />
                </a>
              </Button>
              <Button asChild size="lg" variant="outline">
                <a href="#contact">Contacto</a>
              </Button>
            </div>
          </div>

          <div className="relative mx-auto w-full max-w-lg">
            <div className="rounded-[var(--radius-card)] border border-border bg-card p-2">
              <div className="mb-2 flex items-center justify-center">
                <span className="h-1.5 w-12 rounded-full bg-secondary" aria-hidden="true" />
              </div>
              <img
                src="/utils/FamiliaCasa.webp"
                alt="Samuel Bonifacio junto a sus padres"
                className="aspect-[16/10] w-full rounded-lg bg-muted object-cover"
                loading="eager"
                fetchPriority="high"
              />
            </div>
            <div className="mx-auto h-2 w-[92%] rounded-b-lg border-x border-b border-border bg-secondary" aria-hidden="true" />
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
