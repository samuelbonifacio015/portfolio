import { useEffect, useState } from 'react';
import type { Activity } from '@/components/contribution-graph';
import {
  GitHubContributions,
  GitHubContributionsFallback,
} from '@/components/github-contributions';
import { getContributions } from '@/lib/get-cached-contributions';

interface GithubChartProps {
  username?: string;
  className?: string;
}

const GithubChart = ({
  username = 'samuelbonifacio015',
  className,
}: GithubChartProps) => {
  const [contributions, setContributions] = useState<Activity[] | null>(null);
  const [hasError, setHasError] = useState(false);
  const profileUrl = `https://github.com/${username}`;

  useEffect(() => {
    const controller = new AbortController();
    setContributions(null);
    setHasError(false);

    void getContributions(username, controller.signal)
      .then(setContributions)
      .catch((error: unknown) => {
        if (error instanceof DOMException && error.name === 'AbortError') return;
        setHasError(true);
      });

    return () => controller.abort();
  }, [username]);

  return (
    <div className="p-5 sm:p-6">
      {contributions === null && !hasError && <GitHubContributionsFallback />}

      {(hasError || contributions?.length === 0) && (
        <p role="status" className="py-10 text-center text-sm text-muted-foreground">
          No pude cargar las contribuciones.{' '}
          <a
            href={profileUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="font-medium text-foreground underline underline-offset-4"
          >
            Ver GitHub
          </a>
        </p>
      )}

      {contributions && contributions.length > 0 && (
        <GitHubContributions
          contributions={contributions}
          githubProfileUrl={profileUrl}
          className={className}
        />
      )}
    </div>
  );
};

export default GithubChart;
