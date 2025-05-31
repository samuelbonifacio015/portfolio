
import { CheckCircle } from 'lucide-react';
import { cn } from '@/lib/utils';

interface KnowledgeItemProps {
  title: string;
  description: string;
  className?: string;
}

const KnowledgeItem = ({ title, description, className }: KnowledgeItemProps) => {
  return (
    <div className={cn(
      "flex items-start gap-3 glass p-5 rounded-xl transition-all duration-300 hover:bg-black/40",
      className
    )}>
      <CheckCircle className="text-primary h-5 w-5 mt-1 shrink-0" />
      <div>
        <h3 className="font-medium text-white mb-1">{title}</h3>
        <p className="text-sm text-white/70">{description}</p>
      </div>
    </div>
  );
};

export default KnowledgeItem;
