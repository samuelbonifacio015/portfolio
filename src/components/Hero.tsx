import { ArrowDown } from 'lucide-react';
import { useEffect, useState } from 'react';
import FadingVideo from '@/components/FadingVideo';
import { LiquidGlass } from '@/components/ui/LiquidGlass';

const Hero = () => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    setIsVisible(true);
  }, []);

  return (
    <section
      id="home"
      className="relative flex min-h-screen w-full flex-col items-center justify-center overflow-hidden px-4 py-24 scroll-mt-20 sm:px-6 lg:px-10"
    >
      <div className="absolute inset-0 z-[-2] bg-[linear-gradient(180deg,hsl(var(--background))_0%,hsl(var(--muted))_52%,hsl(var(--background))_100%)] dark:bg-[linear-gradient(180deg,#050505_0%,hsl(var(--background))_54%,#050505_100%)]" />
      <div className="absolute inset-x-0 top-0 z-[-1] h-32 bg-white/80 blur-2xl dark:bg-white/[0.03]" />
      <div className="absolute inset-x-0 bottom-0 z-[-1] h-40 bg-background/95 blur-2xl" />

      <div className="mx-auto flex w-full max-w-[1500px] flex-1 items-center">
        <div
          className={`grid w-full items-center gap-10 transition-all duration-1000 ease-out md:grid-cols-[minmax(0,0.9fr)_minmax(420px,1.1fr)] lg:gap-14 xl:gap-20 ${
            isVisible ? 'translate-y-0 scale-100 opacity-100' : 'translate-y-8 scale-95 opacity-0'
          }`}
        >
          <div className="flex flex-col items-center justify-center text-center md:items-start md:pl-20 md:text-left lg:pl-24">
            <LiquidGlass
              variant="light"
              enableBreathing
              className="mb-5 inline-flex rounded-full px-4 py-2 text-xs font-medium text-primary shadow-[0_8px_28px_rgba(15,23,42,0.08)] sm:mb-6 sm:text-sm dark:text-primary-foreground/90"
            >
              Desarrollador Full-Stack
            </LiquidGlass>

            <h1 className="mb-4 max-w-3xl text-4xl font-bold leading-[0.95] tracking-normal text-foreground sm:text-5xl md:text-7xl lg:text-8xl">
              Samuel Bonifacio<span className="text-primary">.</span>
            </h1>

            <p className="mb-8 max-w-[22rem] text-base leading-7 text-muted-foreground sm:max-w-xl sm:text-lg md:text-xl md:leading-8">
              Ingeniero de software especializado en desarrollo Full-Stack e Inteligencia Artificial.
            </p>

            <div className="flex w-full flex-col items-center justify-center gap-3 sm:w-auto sm:flex-row md:justify-start">
              <LiquidGlass
                as="a"
                variant="strong"
                enableReflection
                enableBreathing
                enableTilt
                href="#projects"
                className="inline-flex w-full items-center justify-center rounded-full bg-foreground px-7 py-3.5 text-sm font-semibold text-background shadow-[0_18px_45px_rgba(15,23,42,0.12)] sm:w-auto dark:bg-white dark:text-black"
                whileHover={{ y: -2 }}
              >
                Ver Proyectos
              </LiquidGlass>

              <LiquidGlass
                as="a"
                variant="light"
                enableBreathing
                href="#contact"
                className="inline-flex w-full items-center justify-center rounded-full px-7 py-3.5 text-sm font-semibold text-foreground shadow-[0_12px_32px_rgba(15,23,42,0.08)] sm:w-auto"
                whileHover={{ y: -2 }}
              >
                Contacto
              </LiquidGlass>
            </div>
          </div>

          <div className="flex w-full justify-center md:justify-end">
            <LiquidGlass
              variant="light"
              enableBreathing
              className="w-full max-w-[760px] rounded-[2rem] p-2 shadow-[0_30px_90px_rgba(15,23,42,0.14)] sm:rounded-[2.5rem] sm:p-3 dark:shadow-black/40"
            >
              <FadingVideo
                src="/hero/xml_version_encoding_.mp4"
                poster="/hero/xml_version_encoding_poster.webp"
                className="aspect-[16/10] rounded-[1.5rem] bg-black/5 shadow-[inset_0_1px_1px_rgba(255,255,255,0.45)] sm:rounded-[2rem]"
                videoClassName="rounded-[1.5rem] sm:rounded-[2rem]"
              />
            </LiquidGlass>
          </div>
        </div>
      </div>

      <a
        href="#projects"
        className="absolute bottom-8 left-1/2 -translate-x-1/2 text-muted-foreground transition-colors duration-300 hover:text-foreground dark:text-white/50 dark:hover:text-white md:bottom-10"
        aria-label="Scroll to projects"
      >
        <ArrowDown size={24} />
      </a>
    </section>
  );
};

export default Hero;
