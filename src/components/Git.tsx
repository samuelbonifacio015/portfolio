import React from 'react';
import { Github } from 'lucide-react';

interface GithubChartProps {
  username?: string;
  color?: string;
  className?: string;
  alt?: string;
}

const GithubChart: React.FC<GithubChartProps> = ({
  username = 'samuelbonifacio015',
  color = 'FF5F05',
  className = 'github-chart',
  alt = 'Contribuciones de GitHub de Samuel Bonifacio',
}) => {
  const chartUrl = `https://ghchart.rshah.org/${color}/${username}`;

  return (
    <section className="px-5 py-8 md:px-6">
      <div className="mx-auto max-w-[var(--container-max)]">
        <div className="mb-4 flex items-center justify-between gap-4">
          <a
            href={`https://github.com/${username}`}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 text-sm font-semibold text-foreground hover:underline focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
          >
            <Github className="h-5 w-5" aria-hidden="true" />
            {username}
          </a>
          <span className="hidden text-xs text-muted-foreground sm:block">Actividad en GitHub</span>
        </div>
        <a
          href={`https://github.com/${username}`}
          target="_blank"
          rel="noopener noreferrer"
          className="block overflow-x-auto rounded-[var(--radius-card)] border border-border bg-card p-4 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
        >
          <img src={chartUrl} alt={alt} className={`${className} min-w-[680px]`} loading="lazy" />
        </a>
      </div>
    </section>
  );
};

export default GithubChart;
