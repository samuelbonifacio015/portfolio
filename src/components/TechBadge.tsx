
import type { CSSProperties } from 'react';
import { cn } from '@/lib/utils';
import { Badge } from '@/components/ui/badge';

interface TechBadgeProps {
  name: string;
  className?: string;
}

const technologyColors: Record<string, string> = {
  HTML: '#E34F26',
  CSS: '#1572B6',
  JavaScript: '#F7DF1E',
  TypeScript: '#3178C6',
  React: '#61DAFB',
  Angular: '#DD0031',
  Vue: '#42B883',
  'Next.js': '#111111',
  Tailwind: '#06B6D4',
  MongoDB: '#47A248',
  SQL: '#336791',
  'C++': '#00599C',
  Python: '#3776AB',
  Java: '#E76F00',
  'C#': '#512BD4',
  'Spring Boot': '#6DB33F',
  '.NET': '#512BD4',
  Git: '#F05032',
  Docker: '#2496ED',
  AWS: '#FF9900',
  Firebase: '#FFCA28',
  Cursor: '#111827',
  Figma: '#A259FF',
  Postman: '#FF6C37',
  'TestSprite MCP': '#7C3AED',
  'Claude Code': '#D97757',
};

type TechBadgeStyle = CSSProperties & { '--tech-color': string };

const TechBadge = ({ name, className }: TechBadgeProps) => {
  const style: TechBadgeStyle = {
    '--tech-color': technologyColors[name] ?? '#71717A',
  };

  return (
    <Badge
      variant="secondary"
      style={style}
      className={cn(
        "border border-transparent text-xs text-foreground transition-[background-color,border-color] duration-200",
        className
      )}
    >
      {name}
    </Badge>
  );
};

export default TechBadge;
