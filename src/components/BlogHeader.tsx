import { BookOpen } from 'lucide-react';
import { cn } from '@/lib/utils';
import { useI18n } from '@/lib/i18n';

interface BlogHeaderProps {
  currentFilter?: string;
  onFilterChange: (filter: string) => void;
}

const BlogHeader = ({ currentFilter = 'Todos', onFilterChange }: BlogHeaderProps) => {
  const { t } = useI18n();
  const filters = [t('Todos'), t('Reflexiones')];

  return (
    <section className="py-12 sm:py-16 px-4">
      <div className="container mx-auto max-w-6xl">
        <div className="text-center mb-8 sm:mb-12">
          <div className="flex items-center justify-center gap-3 mb-4">
            <BookOpen className="h-6 w-6 sm:h-8 sm:w-8 text-primary" />

          </div>
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold text-foreground mb-4 tracking-tight">
            {t('Bienvenidos a mi blog')}
          </h1>
          <p className="text-base sm:text-lg text-muted-foreground max-w-2xl mx-auto">
            {t('Espacio donde comparto mis experiencias, aprendizajes y reflexiones sobre tecnología y desarrollo de software.')}
          </p>
        </div>

        <div className="flex flex-wrap items-center justify-center gap-2 sm:gap-3">
          {filters.map((filter) => (
            <button
              key={filter}
              onClick={() => onFilterChange(filter)}
              className={cn(
                "px-4 sm:px-5 py-2 sm:py-2.5 rounded-lg font-medium transition-all duration-200",
                "text-sm sm:text-base",
                currentFilter === filter
                  ? "bg-primary text-white hover:bg-primary/90"
                  : "bg-muted/50 text-foreground hover:bg-muted/80 border border-border/50"
              )}
            >
              {filter}
            </button>
          ))}
        </div>
      </div>
    </section>
  );
};

export default BlogHeader;
