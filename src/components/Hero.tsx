import { ArrowUpRight } from 'lucide-react';
import { Button } from '@/components/ui/button';

const Hero = () => {
  return (
    <section
      id="home"
      className="scroll-mt-28 px-5 pb-0 pt-24 md:px-6 md:pt-32 lg:pt-36"
    >
      <div className="mx-auto max-w-[var(--container-max)]">
        <div className="relative flex flex-col md:block md:min-h-[clamp(22rem,32vw,28rem)]">
          <div className="hero-portrait pointer-events-none relative z-10 order-last ml-auto mt-8 w-[min(72%,17rem)] select-none md:absolute md:bottom-0 md:right-0 md:top-[-18%] md:mx-0 md:mt-0 md:w-[40%] md:overflow-hidden">
            <img
              src="/hero/samuel-hero.webp"
              alt="Retrato de Samuel Bonifacio"
              width={1122}
              height={1293}
              loading="eager"
              className="w-full md:absolute md:left-0 md:top-0 md:h-full md:w-auto md:max-w-none"
            />
          </div>

          <div className="hero-enter relative z-0">
            <h1
              className="font-display text-[clamp(3.5rem,10.5vw,8rem)] font-extrabold leading-[0.9] tracking-[0.012em]"
              style={{ fontVariantLigatures: 'none', fontFeatureSettings: '"liga" 0, "clig" 0, "calt" 0' }}
            >
              <span className="block text-foreground">Samuel</span>
              <span
                className="block text-transparent"
                style={{ WebkitTextStroke: 'max(1px, 0.011em) var(--foreground)' }}
              >
                Bonifacio
              </span>
            </h1>

            <p className="mt-6 text-[clamp(1.25rem,2.4vw,2rem)] font-normal leading-tight tracking-[-0.01em] text-muted-foreground">
              Full Stack Developer
            </p>

            <div className="relative z-20 mt-8 flex flex-col gap-3 sm:flex-row">
              <Button asChild size="lg" className="rounded-xl">
                <a href="#projects">
                  Ver Proyectos
                  <ArrowUpRight aria-hidden="true" />
                </a>
              </Button>
              <Button asChild size="lg" variant="outline" className="rounded-xl">
                <a href="#contact">Contacto</a>
              </Button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
