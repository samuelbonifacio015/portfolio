import { Code2, Palette, Boxes, Database, Rocket, Users, type LucideIcon } from 'lucide-react';
import { cn } from '@/lib/utils';

const icons: Record<string, LucideIcon> = {
  code: Code2,
  palette: Palette,
  boxes: Boxes,
  database: Database,
  rocket: Rocket,
  users: Users,
};

interface KnowledgeItemProps {
  icon?: keyof typeof icons;
  title: string;
  description: string;
  className?: string;
}

const KnowledgeItem = ({ icon = 'code', title, description, className }: KnowledgeItemProps) => {
  const Icon = icons[icon] ?? Code2;

  return (
    <div className={cn('flex items-start gap-4 border-b border-border py-5 last:border-b-0', className)}>
      <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-secondary">
        <Icon className="h-5 w-5 text-primary" aria-hidden="true" />
      </span>
      <div>
        <h3 className="font-semibold text-foreground">{title}</h3>
        <p className="mt-1 text-sm leading-6 text-muted-foreground">{description}</p>
      </div>
    </div>
  );
};

export default KnowledgeItem;
