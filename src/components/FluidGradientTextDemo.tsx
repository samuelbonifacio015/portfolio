import { FluidGradientText } from '@/components/fluid-gradient-text';

const FluidGradientTextDemo = () => {
  return (
    <section
      aria-label="Texto interactivo"
      className="px-5 md:px-6"
    >
      <div className="relative mx-auto h-[clamp(8rem,18vw,13rem)] max-w-[var(--container-max)] text-foreground">
        <p className="pointer-events-none absolute inset-x-0 top-0 z-10 text-center text-xs text-muted-foreground select-none">
          <span className="hidden pointer-fine:inline-block">
            Move your cursor within the text below
          </span>
          <span className="hidden pointer-coarse:inline-block">
            Press anywhere within the text below
          </span>
        </p>

        <FluidGradientText text="samuel" />
      </div>
    </section>
  );
};

export default FluidGradientTextDemo;
