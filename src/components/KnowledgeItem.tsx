
import { Code2, Palette, Boxes, Database, Rocket, Users, type LucideIcon } from 'lucide-react';
import { cn } from '@/lib/utils';
import { LiquidGlass } from '@/components/ui/LiquidGlass';

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
    <LiquidGlass
      variant="light"
      enableBreathing
      className={cn(
        'flex items-start gap-3 p-5 rounded-xl transition-all duration-300 hover:bg-card/80',
        className
      )}
    >
      <Icon className="text-primary h-5 w-5 mt-1 shrink-0" />
      <div>
        <h3 className="font-medium text-foreground mb-1">{title}</h3>
        <p className="text-sm text-muted-foreground">{description}</p>
      </div>
    </LiquidGlass>
  );
};

export default KnowledgeItem;
