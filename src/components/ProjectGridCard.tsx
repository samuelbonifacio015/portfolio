import type { KeyboardEvent } from 'react';
import { ArrowUpRight, Flame } from 'lucide-react';

import { MagicCard } from '@/components/magicui/magic-card';
import TechBadge from './TechBadge';
import { ProjectProps } from './ProjectCard';
import { useI18n } from '@/lib/i18n';

interface ProjectGridCardProps extends ProjectProps {
  onClick: () => void;
}

const ProjectGridCard = ({
  id,
  title,
  subtitle,
  description,
  image,
  date,
  technologies,
  onClick,
}: ProjectGridCardProps) => {
  const { t } = useI18n();
  const handleKeyDown = (event: KeyboardEvent<HTMLDivElement>) => {
    if (event.key === 'Enter' || event.key === ' ') {
      event.preventDefault();
      onClick();
    }
  };

  return (
    <article
      id={id}
      role="button"
      tabIndex={0}
      aria-label={`${t('Ver detalles')}: ${title}`}
      onClick={onClick}
      onKeyDown={handleKeyDown}
      className="project-row group cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-4 focus-visible:ring-offset-background"
    >
      <MagicCard
        showBase={false}
        gradientColor="#D9D9D955"
        gradientFrom="#D4D4D8"
        gradientTo="#52525B"
        className="rounded-[var(--radius-card)] px-0 py-8 sm:py-10"
      >
        <div className="grid gap-6 sm:grid-cols-[180px_minmax(0,1fr)] sm:gap-8">
          <div className="flex min-w-0 flex-col gap-3">
            {image && (
              <div className="aspect-[4/3] w-full overflow-hidden rounded-lg bg-white">
                <img
                  src={image}
                  alt={`${title} — ${subtitle}`}
                  className="h-full w-full object-cover"
                  loading="lazy"
                  decoding="async"
                />
              </div>
            )}
            <p className="text-xs leading-5 text-muted-foreground sm:text-sm">{date}</p>
          </div>

          <div className="min-w-0 self-center">
            <div className="flex flex-col items-start gap-1">
              <div className="flex flex-wrap items-center gap-2">
                <h3 className="text-xl font-semibold leading-tight tracking-tight text-foreground sm:text-2xl">{title}</h3>
                {id === 'futeate' && (
                  <span className="inline-flex items-center gap-1 rounded-full bg-red-500/10 px-2 py-1 text-[0.68rem] font-semibold uppercase tracking-[0.08em] text-red-600 dark:bg-red-500/15 dark:text-red-400">
                    <Flame className="h-3.5 w-3.5" aria-hidden="true" />
                    {t('En desarrollo')}
                  </span>
                )}
              </div>
              <p className="text-sm font-medium text-primary sm:text-base">{subtitle}</p>
            </div>

            <p className="mt-4 max-w-[65ch] text-sm leading-7 text-muted-foreground sm:text-base">{description}</p>

            {technologies && technologies.length > 0 && (
              <div className="mt-4 flex flex-wrap gap-1.5">
                {technologies.map((technology) => (
                  <TechBadge key={technology} name={technology} showIcon className="text-xs" />
                ))}
              </div>
            )}

            <span className="mt-5 inline-flex items-center gap-1 text-sm font-medium text-muted-foreground transition-colors group-hover:text-foreground">
              {t('Ver detalles')}
              <ArrowUpRight className="h-4 w-4 transition-transform duration-200 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" aria-hidden="true" />
            </span>
          </div>
        </div>
      </MagicCard>
    </article>
  );
};

export default ProjectGridCard;
