import { cn } from '@/lib/utils';
import TechBadge from './TechBadge';
import { ProjectProps } from './ProjectCard';

interface ProjectGridCardProps extends ProjectProps {
  onClick: () => void;
}

//Proyecto Grid Card + descripción 
const ProjectGridCard = ({
  title,
  subtitle,
  description,
  image,
  technologies,
  onClick,
}: ProjectGridCardProps) => {
  const truncatedDescription = description.length > 100 
    ? `${description.substring(0, 100)}...` 
    : description;

  return (
    <div
      onClick={onClick}
      className={cn(
        "group relative cursor-pointer rounded-xl border border-border/50",
        "bg-card/50 backdrop-blur-sm overflow-hidden",
        "transition-all duration-300 ease-out",
        "hover:border-primary/50 hover:shadow-lg hover:shadow-primary/10",
        "hover:scale-[1.02] hover:-translate-y-1",
        "active:scale-[0.98]"
      )}
      role="button"
      tabIndex={0}
      onKeyDown={(e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault();
          onClick();
        }
      }}
      aria-label={`Ver detalles de ${title}`}
    >
      {image && (
        <div className="relative w-full aspect-video overflow-hidden bg-primary/5">
          <img
            src={image}
            alt={`${title} - ${subtitle}`}
            className={cn(
              "w-full h-full object-cover transition-transform duration-500 ease-out",
              "group-hover:scale-110"
            )}
            loading="lazy"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
        </div>
      )}

      <div className="p-3 sm:p-4 space-y-2 sm:space-y-3">
        <div className="space-y-0.5 sm:space-y-1">
          <h3 className="text-base sm:text-lg font-semibold text-foreground group-hover:text-primary transition-colors duration-300 line-clamp-1">
            {title}
          </h3>
          <p className="text-xs sm:text-sm font-medium text-primary/80 line-clamp-1">
            {subtitle}
          </p>
        </div>

        <p className="text-sm text-muted-foreground line-clamp-2 leading-relaxed">
          {truncatedDescription}
        </p>

        {technologies && technologies.length > 0 && (
          <div className="flex flex-wrap gap-1.5 pt-1">
            {technologies.slice(0, 3).map((tech, index) => (
              <TechBadge 
                key={index} 
                name={tech}
                className="text-xs"
              />
            ))}
            {technologies.length > 3 && (
              <span className="text-xs text-muted-foreground px-2 py-0.5">
                +{technologies.length - 3}
              </span>
            )}
          </div>
        )}

        <div className="flex items-center gap-2 text-xs text-muted-foreground opacity-0 group-hover:opacity-100 transition-opacity duration-300 pt-1">
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
    </div>
  );
};

export default ProjectGridCard;

