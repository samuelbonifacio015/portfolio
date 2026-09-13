import {
  RiGithubFill,
  RiInstagramFill,
  RiLinkedinBoxFill,
  RiTiktokFill,
  RiYoutubeFill,
  type RemixiconComponentType,
} from '@remixicon/react';
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from '@/components/ui/tooltip';
import { cn } from '@/lib/utils';
import { useI18n } from '@/lib/i18n';

type SocialLink = {
  name: string;
  username: string;
  href?: string;
  icon: RemixiconComponentType;
};

const socialLinks: SocialLink[] = [
  {
    name: 'GitHub',
    username: 'samuelbonifacio015',
    href: 'https://github.com/samuelbonifacio015',
    icon: RiGithubFill,
  },
  {
    name: 'LinkedIn',
    username: 'samuelbonifacio015',
    href: 'https://www.linkedin.com/in/samuelbonifacio015',
    icon: RiLinkedinBoxFill,
  },
  {
    name: 'TikTok',
    username: 'ssamuelcode',
    href: 'https://www.tiktok.com/@ssamuelcode',
    icon: RiTiktokFill,
  },
  {
    name: 'Instagram',
    username: 'bcsdz',
    href: 'https://www.instagram.com/bcsdz/',
    icon: RiInstagramFill,
  },
  {
    name: 'YouTube',
    username: 'ssamuelcode',
    href: 'https://www.youtube.com/@ssamuelcode',
    icon: RiYoutubeFill,
  },
];

const socialButtonClassName =
  'inline-flex h-10 w-10 items-center justify-center rounded-lg border border-border bg-background text-foreground transition-[transform,background-color,border-color] duration-200 hover:-translate-y-0.5 hover:border-primary hover:bg-secondary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background motion-reduce:transform-none';

const SocialLinks = () => {
  const { t } = useI18n();
  return (
    <ul aria-label={t('Redes sociales')} className="mt-4 flex flex-wrap gap-2">
      {socialLinks.map(({ name, username, href, icon: Icon }) => (
        <li key={name}>
          <Tooltip>
            <TooltipTrigger asChild>
              {href ? (
                <a
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={`${name}: ${username}`}
                  className={socialButtonClassName}
                >
                  <Icon aria-hidden="true" className="h-5 w-5" />
                </a>
              ) : (
                <span
                  role="link"
                  aria-disabled="true"
                  aria-label={`${name}: ${t('enlace pendiente')}`}
                  tabIndex={0}
                  className={cn(
                    socialButtonClassName,
                    'cursor-not-allowed opacity-45 hover:translate-y-0 hover:border-border hover:bg-background'
                  )}
                >
                  <Icon aria-hidden="true" className="h-5 w-5" />
                </span>
              )}
            </TooltipTrigger>
            <TooltipContent
              side="top"
              sideOffset={8}
              className="border-zinc-950 bg-zinc-950 text-white dark:border-zinc-800 dark:bg-zinc-900 dark:text-zinc-50"
            >
              {name} ({username})
            </TooltipContent>
          </Tooltip>
        </li>
      ))}
    </ul>
  );
};

export default SocialLinks;
