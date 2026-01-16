import { Github } from 'lucide-react';
import TechBadge from './TechBadge';

export interface ProjectProps {
  id?: string;
  title: string;
  subtitle: string;
  description: string;
  logo: string;
  image?: string; 
  date: string;
  technologies?: string[];
  githubUrl?: string;
  liveUrl?: string;
  links?: Array<{
    label: string;
    url: string;
  }>;
  // Nuevos campos para descripción extendida
  extendedDescription?: string;
  objective?: string;
  problem?: string;
  technicalApproach?: string;
  images?: string[]; // Array de imágenes para el carrusel (preparado para futuro)
  demoVideo?: string; // URL del video de demostración (YouTube, Vimeo, o MP4)
}

const ProjectCard = ({ 
  id,
  title, 
  subtitle, 
  description, 
  logo: _logo, 
  image,
  date, 
  technologies,
  githubUrl, 
  liveUrl,
  links 
}: ProjectProps) => {
  return (
    <div
      id={id}
      className="max-w-7xl p-4 sm:p-6 rounded-xl border border-transparent hover:border hover:border-primary/45 hover:shadow-lg transition-all duration-300"
    >
      <div className="flex flex-col md:flex-row md:items-start gap-4 md:gap-6">
        <div className="w-full md:w-1/3 flex flex-col gap-3">
          {image && (
            <div className="w-full aspect-video bg-primary/5 rounded-lg overflow-hidden border border-primary/10 hover:scale-105 transition-transform duration-500 ease-in-out">
              <img
                src={image}
                alt={`${title} Screenshot`}
                className="w-full h-full object-cover"
              />
            </div>
          )}
          <p className="text-xs sm:text-sm opacity-75 text-center md:text-left font-semibold">{date}</p>
        </div>

        <div className="w-full md:w-2/3 space-y-3">
          <div>
            <h3 className="text-lg sm:text-xl font-semibold text-white">{title}</h3>
            <p className="text-sm sm:text-base font-medium text-primary">
              {subtitle}
            </p>
          </div>

          <div 
            className="text-xs sm:text-sm leading-relaxed text-white/80"
            dangerouslySetInnerHTML={{ __html: description }}
          />

          {technologies && technologies.length > 0 && (
            <div className="flex flex-wrap gap-1.5 sm:gap-2">
              {technologies.map((tech, index) => (
                <TechBadge 
                  key={index} 
                  name={tech}
                />
              ))}
            </div>
          )}

          <div className="flex flex-wrap gap-1.5 sm:gap-2 pt-1">
            {githubUrl && (
              <a
                href={githubUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center text-[10px] sm:text-xs px-2 sm:px-3 py-1 rounded-full bg-primary/10 hover:bg-primary/15 border border-transparent hover:border-primary transition-all duration-300 gap-1.5"
                aria-label="GitHub"
              >
                <Github className="h-4 w-4" />
                <span className="sr-only">GitHub</span>
              </a>
            )}
            {liveUrl && (
              <a
                href={liveUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center text-[10px] sm:text-xs px-2 sm:px-3 py-1 rounded-full bg-primary/10 hover:bg-primary/15 border border-transparent hover:border-primary transition-all duration-600"
              >
                <span>Demo</span>
              </a>
            )}
            {links && links.map((link, index) => (
              <a
                key={index}
                href={link.url}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center text-[10px] sm:text-xs px-2 sm:px-3 py-1 rounded-full bg-primary/10 hover:bg-primary/15 border border-transparent hover:border-primary transition-all duration-600"
              >
                <span>{link.label}</span>
              </a>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProjectCard;
