import { FluidGradientText } from '@/components/fluid-gradient-text';
import { useI18n } from '@/lib/i18n';

const FluidGradientTextDemo = () => {
  const { t } = useI18n();
  return (
    <section
      aria-label={t('Texto interactivo')}
      className="px-5 md:px-6"
    >
      <div className="relative mx-auto h-[clamp(8rem,18vw,13rem)] max-w-[var(--container-max)] text-foreground">
        <p className="pointer-events-none absolute inset-x-0 top-0 z-10 text-center text-xs text-muted-foreground select-none">
          <span className="hidden pointer-fine:inline-block">
            {t('Move your cursor within the text below')}
          </span>
          <span className="hidden pointer-coarse:inline-block">
            {t('Press anywhere within the text below')}
          </span>
        </p>

        <FluidGradientText text="samuel" />
      </div>
    </section>
  );
};

export default FluidGradientTextDemo;
