
import { cn } from '@/lib/utils';
import { Badge } from '@/components/ui/badge';

interface TechBadgeProps {
  name: string;
  className?: string;
}

const TechBadge = ({ name, className }: TechBadgeProps) => {
  return (
    <Badge
      variant="secondary"
      className={cn(
        "text-xs text-foreground",
        className
      )}
    >
      {name}
    </Badge>
  );
};

export default TechBadge;
