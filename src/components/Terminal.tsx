import { Terminal as TerminalIcon } from 'lucide-react';
import { cn } from '@/lib/utils';

interface TerminalProps {
  className?: string;
}

const lines = [
  'samuel@portfolio:~$ neofetch',
  'Estudiando en: Universidad Peruana de Ciencias Aplicadas',
  'Aprendiendo: Dart & React Native',
  'Usando: Arch Linux',
];

const Terminal = ({ className }: TerminalProps) => {
  return (
    <div className={cn('p-5 sm:p-6', className)}>
        <div className="mb-4 flex items-center gap-2 text-sm font-semibold text-foreground">
          <TerminalIcon className="h-4 w-4 text-primary" aria-hidden="true" />
          <span>samuel@portfolio</span>
        </div>
        <div className="space-y-2 overflow-x-auto font-mono text-xs leading-6 text-muted-foreground sm:text-sm">
          {lines.map((line) => (
            <p key={line} className="min-w-max">
              {line}
            </p>
          ))}
        </div>
    </div>
  );
};

export default Terminal;
