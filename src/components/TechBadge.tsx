
import type { CSSProperties } from 'react';
import { cn } from '@/lib/utils';
import { Badge } from '@/components/ui/badge';

import html5Icon from '@/assets/tech-icons/html5.svg';
import css3Icon from '@/assets/tech-icons/css3.svg';
import javascriptIcon from '@/assets/tech-icons/javascript.svg';
import typescriptIcon from '@/assets/tech-icons/typescript.svg';
import nodejsIcon from '@/assets/tech-icons/nodejs.svg';
import reactIcon from '@/assets/tech-icons/react.svg';
import djangoIcon from '@/assets/tech-icons/django.svg';
import javaIcon from '@/assets/tech-icons/java.svg';
import springIcon from '@/assets/tech-icons/spring.svg';
import cplusplusIcon from '@/assets/tech-icons/cplusplus.svg';
import csharpIcon from '@/assets/tech-icons/csharp.svg';
import dotnetIcon from '@/assets/tech-icons/dotnet.svg';
import angularIcon from '@/assets/tech-icons/angular.svg';
import vueIcon from '@/assets/tech-icons/vue.svg';
import tailwindIcon from '@/assets/tech-icons/tailwind.svg';
import nextIcon from '@/assets/tech-icons/next.svg';
import dartIcon from '@/assets/tech-icons/dart.svg';
import flutterIcon from '@/assets/tech-icons/flutter.svg';
import kotlinIcon from '@/assets/tech-icons/kotlin.svg';
import androidStudioIcon from '@/assets/tech-icons/android-studio.svg';
import mongodbIcon from '@/assets/tech-icons/mongodb.svg';
import mysqlIcon from '@/assets/tech-icons/mysql.svg';
import postgresqlIcon from '@/assets/tech-icons/sql.svg';
import pythonIcon from '@/assets/tech-icons/python.svg';
import firebaseIcon from '@/assets/tech-icons/firebase.svg';
import gitIcon from '@/assets/tech-icons/git.svg';
import githubIcon from '@/assets/tech-icons/github.svg';
import dockerIcon from '@/assets/tech-icons/docker.svg';
import figmaIcon from '@/assets/tech-icons/figma.svg';
import obsidianIcon from '@/assets/tech-icons/obsidian.svg';
import vscodeIcon from '@/assets/tech-icons/vscode.svg';
import linuxIcon from '@/assets/tech-icons/linux.svg';
import archLinuxIcon from '@/assets/tech-icons/archlinux.svg';
import bashIcon from '@/assets/tech-icons/bash.svg';
import postmanIcon from '@/assets/tech-icons/postman.svg';
import hermesIcon from '@/assets/tech-icons/hermes.svg';
import renderIcon from '@/assets/tech-icons/render.svg';
import rechartsIcon from '@/assets/tech-icons/recharts.svg';
import supabaseIcon from '@/assets/tech-icons/supabase.svg';

interface TechBadgeProps {
  name: string;
  className?: string;
  showIcon?: boolean;
}

const technologyColors: Record<string, string> = {
  HTML: '#E34F26',
  CSS: '#1572B6',
  JavaScript: '#F7DF1E',
  TypeScript: '#3178C6',
  'Node.js': '#68A063',
  React: '#61DAFB',
  Django: '#092E20',
  Java: '#E76F00',
  'Spring Boot': '#6DB33F',
  'C++': '#00599C',
  'C#': '#512BD4',
  '.NET': '#512BD4',
  Angular: '#DD0031',
  Vue: '#42B883',
  Tailwind: '#06B6D4',
  'Next.js': '#111111',
  Dart: '#0175C2',
  Flutter: '#02569B',
  Kotlin: '#7F52FF',
  Android: '#A4C639',
  MongoDB: '#47A248',
  MySQL: '#4479A1',
  PostgreSQL: '#4169E1',
  Python: '#3776AB',
  Firebase: '#FFCA28',
  Git: '#F05032',
  GitHub: '#181717',
  Docker: '#2496ED',
  Figma: '#A259FF',
  Obsidian: '#7C3AED',
  'VS Code': '#007ACC',
  Linux: '#FCC624',
  'Arch Linux': '#1793D1',
  Bash: '#4EAA25',
  Postman: '#FF6C37',
  'Hermes Agent': '#18181B',
  Render: '#46E3B7',
  Recharts: '#FF7300',
  Supabase: '#3FCF8E',
};

const technologyIcons: Record<string, string> = {
  HTML: html5Icon,
  CSS: css3Icon,
  JavaScript: javascriptIcon,
  TypeScript: typescriptIcon,
  'Node.js': nodejsIcon,
  React: reactIcon,
  Django: djangoIcon,
  Java: javaIcon,
  'Spring Boot': springIcon,
  'C++': cplusplusIcon,
  'C#': csharpIcon,
  '.NET': dotnetIcon,
  Angular: angularIcon,
  Vue: vueIcon,
  Tailwind: tailwindIcon,
  'Next.js': nextIcon,
  Dart: dartIcon,
  Flutter: flutterIcon,
  Kotlin: kotlinIcon,
  Android: androidStudioIcon,
  MongoDB: mongodbIcon,
  MySQL: mysqlIcon,
  PostgreSQL: postgresqlIcon,
  Python: pythonIcon,
  Firebase: firebaseIcon,
  Git: gitIcon,
  GitHub: githubIcon,
  Docker: dockerIcon,
  Figma: figmaIcon,
  Obsidian: obsidianIcon,
  'VS Code': vscodeIcon,
  Linux: linuxIcon,
  'Arch Linux': archLinuxIcon,
  Bash: bashIcon,
  Postman: postmanIcon,
  'Hermes Agent': hermesIcon,
  Render: renderIcon,
  Recharts: rechartsIcon,
  Supabase: supabaseIcon,
};

type TechBadgeStyle = CSSProperties & {
  '--tech-color-soft': string;
  '--tech-color-border': string;
};

const TechBadge = ({ name, className, showIcon = false }: TechBadgeProps) => {
  const color = technologyColors[name] ?? '#71717A';
  const style: TechBadgeStyle = {
    '--tech-color-soft': `color-mix(in oklch, ${color} 12%, var(--background))`,
    '--tech-color-border': `color-mix(in oklch, ${color} 48%, var(--border))`,
  };
  const icon = technologyIcons[name];

  return (
    <Badge
      variant={showIcon ? 'outline' : 'secondary'}
      style={style}
      className={cn(
        'text-xs text-foreground',
        showIcon &&
          'group/tech-badge gap-1.5 border-border/80 bg-background/70 font-mono transition-[background-color,border-color,transform] duration-200 hover:-translate-y-px hover:border-[var(--tech-color-border)] hover:bg-[var(--tech-color-soft)] dark:bg-background/30',
        className
      )}
    >
      {showIcon && icon && (
        <img
          src={icon}
          alt=""
          aria-hidden="true"
          decoding="async"
          className={cn(
            'h-3.5 w-3.5 shrink-0 object-contain transition-transform duration-200 group-hover/tech-badge:scale-110',
            'dark:invert'
          )}
        />
      )}
      {name}
    </Badge>
  );
};

export default TechBadge;
