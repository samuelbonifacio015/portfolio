
import { ExternalLink, Github } from 'lucide-react';
import TechBadge from './TechBadge';

export interface ProjectProps {
  title: string;
  description: string;
  image: string;
  technologies: string[];
  githubUrl?: string;
  liveUrl?: string;
}

const ProjectCard = ({ title, description, image, technologies, githubUrl, liveUrl }: ProjectProps) => {
  return (
    <div className="group glass-card rounded-xl overflow-hidden transition-all duration-500 hover:shadow-xl hover:shadow-primary/5 relative">
      <div className="relative overflow-hidden h-48 md:h-56">
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent z-10"></div>
        <img 
          src={image} 
          alt={title} 
          className="w-full h-full object-cover object-center transition-transform duration-700 ease-out group-hover:scale-110"
        />
      </div>
      
      <div className="p-6 relative transform transition-all duration-500">
        <div className="space-y-4">
          <h3 className="text-xl font-bold text-white tracking-tight">{title}</h3>
          <p className="text-white/70 text-sm line-clamp-3">{description}</p>
          
          <div className="flex flex-wrap gap-2 my-3">
            {technologies.map((tech) => (
              <TechBadge key={tech} name={tech} />
            ))}
          </div>
          
          <div className="flex items-center space-x-4 pt-2">
            {githubUrl && (
              <a 
                href={githubUrl} 
                target="_blank" 
                rel="noopener noreferrer" 
                className="text-white/70 hover:text-primary transition-colors duration-300"
                aria-label={`Ver código de ${title} en GitHub`}
              >
                <Github size={20} />
              </a>
            )}
            {liveUrl && (
              <a 
                href={liveUrl} 
                target="_blank" 
                rel="noopener noreferrer" 
                className="text-white/70 hover:text-primary transition-colors duration-300"
                aria-label={`Ver demo de ${title}`}
              >
                <ExternalLink size={20} />
              </a>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProjectCard;
