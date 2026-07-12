import React from 'react';
import { Github } from 'lucide-react';
import { useTheme } from '@/hooks/use-theme';

interface GithubChartProps {
  username?: string;
  color?: string;
  className?: string;
  alt?: string;
}

const GithubChart: React.FC<GithubChartProps> = ({
  username = 'samuelbonifacio015',
  color,
  className = 'github-chart',
  alt = 'Contribuciones de GitHub de Samuel Bonifacio',
}) => {
  const { isDark } = useTheme();
  const chartColor = color ?? (isDark ? 'A1A1AA' : '3F3F46');
  const chartUrl = `https://ghchart.rshah.org/${chartColor}/${username}`;

  return (
    <div className="p-5 sm:p-6">
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
          className="block focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
        >
          <img src={chartUrl} alt={alt} className={`${className} h-auto w-full`} loading="lazy" />
        </a>
    </div>
  );
};

export default GithubChart;
