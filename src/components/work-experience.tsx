import { ChevronDown } from 'lucide-react';
import type { ReactNode } from 'react';

import { cn } from '@/lib/utils';
import TechBadge from './TechBadge';

export type ExperiencePositionItemType = {
  id: string;
  title: string;
  employmentPeriod: {
    start: string;
    end?: string;
  };
  employmentType?: string;
  description?: string;
  icon?: ReactNode;
  skills?: string[];
  isExpanded?: boolean;
};

export type ExperienceItemType = {
  id: string;
  companyName: string;
  companyLogo?: string;
  companyWebsite?: string;
  positions: ExperiencePositionItemType[];
  isCurrentEmployer?: boolean;
};

interface WorkExperienceProps {
  className?: string;
  experiences: ExperienceItemType[];
}

const WorkExperience = ({ className, experiences }: WorkExperienceProps) => {
  return (
    <div className={cn('bg-transparent text-foreground', className)}>
      {experiences.map((experience) => (
        <ExperienceItem key={experience.id} experience={experience} />
      ))}
    </div>
  );
};

const ExperienceItem = ({ experience }: { experience: ExperienceItemType }) => {
  return (
    <article className="space-y-4 py-6 first:pt-0 last:pb-0">
      <div className="flex items-center gap-3">
        <div className="flex h-7 w-7 shrink-0 items-center justify-center overflow-hidden rounded-full border border-border bg-muted">
          {experience.companyLogo ? (
            <img
              src={experience.companyLogo}
              alt=""
              className="h-full w-full object-cover"
              loading="lazy"
            />
          ) : (
            <span className="h-2 w-2 rounded-full bg-muted-foreground" aria-hidden="true" />
          )}
        </div>

        <h3 className="text-lg font-semibold leading-snug">
          {experience.companyWebsite ? (
            <a
              href={experience.companyWebsite}
              target="_blank"
              rel="noopener noreferrer"
              className="underline-offset-4 hover:underline focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
            >
              {experience.companyName}
            </a>
          ) : (
            experience.companyName
          )}
        </h3>

        {experience.isCurrentEmployer && (
          <span className="relative flex h-3 w-3 items-center justify-center" aria-label="Experiencia actual">
            <span className="absolute h-3 w-3 animate-ping rounded-full bg-sky-500/50" />
            <span className="relative h-2 w-2 rounded-full bg-sky-500" />
          </span>
        )}
      </div>

      <div className="relative space-y-4 before:absolute before:bottom-0 before:left-3 before:top-0 before:w-px before:bg-border">
        {experience.positions.map((position) => (
          <ExperiencePositionItem key={position.id} position={position} />
        ))}
      </div>
    </article>
  );
};

const ExperiencePositionItem = ({ position }: { position: ExperiencePositionItemType }) => {
  const hasDetails = Boolean(position.description || position.skills?.length);
  const { start, end } = position.employmentPeriod;
  const duration = formatDuration(start, end);

  return (
    <details open={position.isExpanded} className="group relative last:before:absolute last:before:-bottom-4 last:before:left-0 last:before:top-6 last:before:w-4 last:before:bg-background">
      <summary
        className={cn(
          'relative z-10 flex list-none items-start gap-3 text-left [&::-webkit-details-marker]:hidden',
          hasDetails && 'cursor-pointer'
        )}
      >
        <div className="flex h-6 w-6 shrink-0 items-center justify-center rounded-lg border border-border bg-muted text-muted-foreground ring-1 ring-background">
          {position.icon ?? <BriefcaseIcon />}
        </div>

        <div className="min-w-0 flex-1">
          <div className="flex items-start justify-between gap-3">
            <h4 className="font-medium text-balance text-foreground">{position.title}</h4>
            {hasDetails && (
              <ChevronDown className="h-4 w-4 shrink-0 text-muted-foreground transition-transform duration-200 group-open:rotate-180" aria-hidden="true" />
            )}
          </div>

          <dl className="mt-1 flex flex-wrap items-center gap-x-2 gap-y-1 text-sm text-muted-foreground">
            {position.employmentType && <dd>{position.employmentType}</dd>}
            {position.employmentType && <span aria-hidden="true">·</span>}
            <dd className="tabular-nums">
              {start} <span aria-hidden="true">—</span> {end ?? 'Actualidad'}
            </dd>
            {duration && (
              <>
                <span aria-hidden="true">·</span>
                <dd className="tabular-nums">{duration}</dd>
              </>
            )}
          </dl>
        </div>
      </summary>

      {position.description && (
        <ul className="relative z-10 ml-9 mt-3 list-disc space-y-2 pl-4 text-sm leading-6 text-muted-foreground marker:text-border">
          {position.description
            .split('\n')
            .map((item) => item.replace(/^-\s*/, '').trim())
            .filter(Boolean)
            .map((item) => <li key={item}>{item}</li>)}
        </ul>
      )}

      {position.skills && position.skills.length > 0 && (
        <div className="relative z-10 ml-9 mt-3 flex flex-wrap gap-1.5">
          {position.skills.map((skill) => (
            <TechBadge key={skill} name={skill} className="font-mono text-xs" />
          ))}
        </div>
      )}
    </details>
  );
};

const BriefcaseIcon = () => (
  <svg viewBox="0 0 24 24" className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth="1.8" aria-hidden="true">
    <path d="M8 7V5.5A1.5 1.5 0 0 1 9.5 4h5A1.5 1.5 0 0 1 16 5.5V7" />
    <path d="M5 7h14a2 2 0 0 1 2 2v8.5a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V9a2 2 0 0 1 2-2Z" />
    <path d="M3 12h18M10 12v2h4v-2" />
  </svg>
);

function formatDuration(start: string, end?: string): string {
  const startDate = parsePeriod(start);
  const endDate = end ? parsePeriod(end) : { month: new Date().getMonth() + 1, year: new Date().getFullYear() };
  const totalMonths = (endDate.year - startDate.year) * 12 + endDate.month - startDate.month + 1;

  if (totalMonths <= 0) return '';
  if (totalMonths < 12) return `${totalMonths}m`;

  const years = Math.floor(totalMonths / 12);
  const months = totalMonths % 12;
  return months ? `${years}y ${months}m` : `${years}y`;
}

function parsePeriod(value: string) {
  const [monthOrYear, maybeYear] = value.split('.');
  return maybeYear
    ? { month: Number(monthOrYear), year: Number(maybeYear) }
    : { month: 1, year: Number(monthOrYear) };
}

export { WorkExperience };
