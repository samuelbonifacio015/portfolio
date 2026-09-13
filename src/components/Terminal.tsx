import { Terminal as TerminalIcon } from 'lucide-react';
import { cn } from '@/lib/utils';
import { useI18n } from '@/lib/i18n';

interface TerminalProps {
  className?: string;
}

const Terminal = ({ className }: TerminalProps) => {
  const { t } = useI18n();
  const lines = [
    'samuel@portfolio:~$ neofetch',
    t('Estudiando en: Universidad Peruana de Ciencias Aplicadas'),
    t('Aprendiendo: RAG & Deep Learning'),
    t('Trabajando en: Maquinarias JYS'),
  ];
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
