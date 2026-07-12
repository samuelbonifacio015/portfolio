import { cn } from '@/lib/utils';
import TechBadge from './TechBadge';
import { ProjectProps } from './ProjectCard';
import { Card } from '@/components/ui/card';

interface ProjectGridCardProps extends ProjectProps {
  onClick: () => void;
}

const ProjectGridCard = ({
  title,
  subtitle,
  image,
  technologies,
  onClick,
}: ProjectGridCardProps) => {
  return (
    <Card
      className="group h-full cursor-pointer overflow-hidden transition-[border-color,transform] duration-200 hover:border-primary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background motion-safe:hover:-translate-y-px"
      onClick={onClick}
      role="button"
      tabIndex={0}
      onKeyDown={(e: React.KeyboardEvent) => {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault();
          onClick();
        }
      }}
      aria-label={`Ver detalles de ${title}`}
    >
      {image && (
        <div className="relative mx-3 mt-3 aspect-video overflow-hidden rounded-lg bg-muted">
          <img
            src={image}
            alt={`${title} - ${subtitle}`}
            className={cn(
              "h-full w-full object-cover"
            )}
            loading="lazy"
          />
        </div>
      )}

      <div className="space-y-3 p-4">
        <div className="space-y-0.5 sm:space-y-1">
          <h3 className="line-clamp-1 text-base font-semibold text-foreground group-hover:underline sm:text-lg">
            {title}
          </h3>
          <p className="line-clamp-1 text-xs font-medium text-muted-foreground sm:text-sm">
            {subtitle}
          </p>
        </div>

        {technologies && technologies.length > 0 && (
          <div className="flex flex-wrap gap-1.5 pt-1">
            {technologies.slice(0, 3).map((tech, index) => (
              <TechBadge 
                key={index} 
                name={tech}
                className="text-xs"
              />
            ))}
          </div>
        )}

        <div className="flex items-center gap-2 pt-1 text-xs font-medium text-muted-foreground group-hover:text-foreground">
          <span>Ver detalles</span>
          <svg 
            className="w-4 h-4 transform group-hover:translate-x-1 transition-transform duration-300" 
            fill="none" 
            stroke="currentColor" 
            viewBox="0 0 24 24"
          >
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
          </svg>
        </div>
      </div>
    </Card>
  );
};

export default ProjectGridCard;
