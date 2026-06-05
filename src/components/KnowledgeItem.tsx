
import { CheckCircle } from 'lucide-react';
import { cn } from '@/lib/utils';
import { LiquidGlass } from '@/components/ui/LiquidGlass';

interface KnowledgeItemProps {
  title: string;
  description: string;
  className?: string;
}

const KnowledgeItem = ({ title, description, className }: KnowledgeItemProps) => {
  return (
    <LiquidGlass
      variant="light"
      enableBreathing
      className={cn(
        'flex items-start gap-3 p-5 rounded-xl transition-all duration-300 hover:bg-card/80',
        className
      )}
    >
      <CheckCircle className="text-primary h-5 w-5 mt-1 shrink-0" />
      <div>
        <h3 className="font-medium text-foreground mb-1">{title}</h3>
        <p className="text-sm text-muted-foreground">{description}</p>
      </div>
    </LiquidGlass>
  );
};

export default KnowledgeItem;
