import { useState, useEffect } from 'react';
import { Github, ExternalLink, X } from 'lucide-react';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from '@/components/ui/carousel';
import { Button } from '@/components/ui/button';
import TechBadge from './TechBadge';
import { ProjectProps } from './ProjectCard';
import { cn } from '@/lib/utils';

interface ProjectModalProps {
  project: ProjectProps | null;
  isOpen: boolean;
  onClose: () => void;
}

const ProjectModal = ({ project, isOpen, onClose }: ProjectModalProps) => {
  const [api, setApi] = useState<any>(null);
  const [current, setCurrent] = useState(0);

  // Preparar imágenes para el carrusel
  const images = project?.images && project.images.length > 0
    ? project.images
    : project?.image
    ? [project.image]
    : [];

  useEffect(() => {
    if (!api) return;

    setCurrent(api.selectedScrollSnap() + 1);

    api.on('select', () => {
      setCurrent(api.selectedScrollSnap() + 1);
    });
  }, [api]);

  if (!project) return null;

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-4xl max-h-[90vh] overflow-hidden p-0 gap-0 w-[95vw] sm:w-full">
        <DialogHeader className="px-4 sm:px-6 pt-4 sm:pt-6 pb-3 sm:pb-4 border-b border-border">
          <div className="flex items-start justify-between gap-3 sm:gap-4">
            <div className="flex-1 space-y-1 min-w-0">
              <DialogTitle className="text-2xl sm:text-2xl font-bold text-foreground truncate text-center">
                {project.title}
              </DialogTitle>
              <p className="text-lg sm:text-base font-semibold text-primary text-center">
                {project.subtitle}
              </p>
            </div>
            <Button
              variant="ghost"
              size="icon"
              onClick={onClose}
              className="h-8 w-8 sm:h-9 sm:w-9 rounded-full flex-shrink-0"
              aria-label="Cerrar modal"
            >
              <X className="h-4 w-4 sm:h-5 sm:w-5" />
            </Button>
          </div>
        </DialogHeader>

        <div className="overflow-y-auto max-h-[calc(90vh-100px)] sm:max-h-[calc(90vh-120px)]">
          {images.length > 0 && (
            <div className="relative w-full bg-muted/30">
              <Carousel
                setApi={setApi}
                className="w-full"
                opts={{
                  align: 'start',
                  loop: images.length > 1,
                }}
              >
                <CarouselContent>
                  {images.map((img, index) => (
                    <CarouselItem key={index}>
                      <div className="relative w-full aspect-video bg-primary/5 rounded-lg overflow-hidden">
                        <img
                          src={img}
                          alt={`${project.title} - Imagen ${index + 1}`}
                          className="w-full h-full object-contain"
                          loading="lazy"
                        />
                      </div>
                    </CarouselItem>
                  ))}
                </CarouselContent>
                {images.length > 1 && (
                  <>
                    <CarouselPrevious className="left-1 sm:left-2 md:left-4 h-8 w-8 sm:h-10 sm:w-10" />
                    <CarouselNext className="right-1 sm:right-2 md:right-4 h-8 w-8 sm:h-10 sm:w-10" />
                  </>
                )}
              </Carousel>
              
              {images.length > 1 && (
                <div className="flex justify-center gap-2 py-4">
                  {images.map((_, index) => (
                    <button
                      key={index}
                      onClick={() => api?.scrollTo(index)}
                      className={cn(
                        "h-2 rounded-full transition-all duration-300",
                        current === index + 1
                          ? "w-8 bg-primary"
                          : "w-2 bg-muted-foreground/30 hover:bg-muted-foreground/50"
                      )}
                      aria-label={`Ir a imagen ${index + 1}`}
                    />
                  ))}
                </div>
              )}
            </div>
          )}

          <div className="px-4 sm:px-6 py-4 sm:py-6 space-y-4 sm:space-y-6">
            <div className="flex flex-wrap items-center gap-4 text-sm text-muted-foreground">
              {project.date && (
                <span className="flex items-center gap-1.5">
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                  </svg>
                  {project.date}
                </span>
              )}
            </div>

            <div className="space-y-6">
              {project.objective && (
                <div className="space-y-2">
                  <h3 className="text-base sm:text-lg font-semibold text-foreground flex items-center gap-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-primary flex-shrink-0" />
                    Objetivo
                  </h3>
                  <p className="text-sm text-muted-foreground leading-relaxed pl-3.5">
                    {project.objective}
                  </p>
                </div>
              )}

              {project.problem && (
                <div className="space-y-2">
                  <h3 className="text-base sm:text-lg font-semibold text-foreground flex items-center gap-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-primary flex-shrink-0" />
                    Problema que Resuelve
                  </h3>
                  <p className="text-sm text-muted-foreground leading-relaxed pl-3.5">
                    {project.problem}
                  </p>
                </div>
              )}

              {project.technicalApproach && (
                <div className="space-y-2">
                  <h3 className="text-base sm:text-lg font-semibold text-foreground flex items-center gap-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-primary flex-shrink-0" />
                    Enfoque Técnico
                  </h3>
                  <p className="text-sm text-muted-foreground leading-relaxed pl-3.5">
                    {project.technicalApproach}
                  </p>
                </div>
              )}

              {(project.extendedDescription || project.description) && (
                <div className="space-y-2">
                  <h3 className="text-base sm:text-lg font-semibold text-foreground flex items-center gap-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-primary flex-shrink-0" />
                    Descripción
                  </h3>
                  <p className="text-sm text-muted-foreground leading-relaxed pl-3.5">
                    {project.extendedDescription || project.description}
                  </p>
                </div>
              )}
            </div>

            {project.technologies && project.technologies.length > 0 && (
              <div className="space-y-2 sm:space-y-3">
                <h3 className="text-base sm:text-lg font-semibold text-foreground">Tecnologías</h3>
                <div className="flex flex-wrap gap-1.5 sm:gap-2">
                  {project.technologies.map((tech, index) => (
                    <TechBadge key={index} name={tech} />
                  ))}
                </div>
              </div>
            )}

            {(project.githubUrl || project.liveUrl || project.links) && (
              <div className="space-y-2 sm:space-y-3 pt-2 border-t border-border">
                <h3 className="text-base sm:text-lg font-semibold text-foreground">Enlaces</h3>
                <div className="flex flex-wrap gap-2 sm:gap-3">
                  {project.githubUrl && (
                    <Button
                      asChild
                      variant="outline"
                      size="sm"
                      className="gap-2 text-xs sm:text-sm"
                    >
                      <a
                        href={project.githubUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center"
                      >
                        <Github className="h-3.5 w-3.5 sm:h-4 sm:w-4" />
                        <span>Repositorio</span>
                      </a>
                    </Button>
                  )}
                  {project.liveUrl && (
                    <Button
                      asChild
                      variant="default"
                      size="sm"
                      className="gap-2 text-xs sm:text-sm"
                    >
                      <a
                        href={project.liveUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center"
                      >
                        <ExternalLink className="h-3.5 w-3.5 sm:h-4 sm:w-4" />
                        <span>Demo en Vivo</span>
                      </a>
                    </Button>
                  )}
                  {project.links && project.links.map((link, index) => (
                    <Button
                      key={index}
                      asChild
                      variant="outline"
                      size="sm"
                      className="gap-2 text-xs sm:text-sm"
                    >
                      <a
                        href={link.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center"
                      >
                        <ExternalLink className="h-3.5 w-3.5 sm:h-4 sm:w-4" />
                        <span>{link.label}</span>
                      </a>
                    </Button>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default ProjectModal;

