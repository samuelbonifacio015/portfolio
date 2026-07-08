
import { cn } from '@/lib/utils';

interface TechBadgeProps {
  name: string;
  className?: string;
}

const TechBadge = ({ name, className }: TechBadgeProps) => {
  return (
    <span
      className={cn(
        "inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium border",
        "border-border bg-secondary/50 text-foreground/80 transition-colors",
        "hover:border-primary/40 hover:bg-primary/10 hover:text-primary",
        className
      )}
    >
      {name}
    </span>
  );
};

export default TechBadge;
