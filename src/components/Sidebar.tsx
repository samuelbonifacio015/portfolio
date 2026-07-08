import { useState, useEffect } from 'react';
import { cn } from '@/lib/utils';
import { House, Layers3, Briefcase, GraduationCap, MessageCircle } from 'lucide-react';
import { LiquidGlass } from '@/components/ui/LiquidGlass';
import { Tooltip, TooltipContent, TooltipTrigger } from '@/components/ui/tooltip';

const navItems = [
  { name: 'Inicio', href: '#home', id: 'home', icon: House },
  { name: 'Tecnologías', href: '#technologies', id: 'technologies', icon: Layers3 },
  { name: 'Proyectos', href: '#projects', id: 'projects', icon: Briefcase },
  { name: 'Conocimientos', href: '#knowledge', id: 'knowledge', icon: GraduationCap },
  { name: 'Contacto', href: '#contact', id: 'contact', icon: MessageCircle },
];

interface SidebarProps {
  isMobile: boolean;
}

const Sidebar = ({ isMobile }: SidebarProps) => {
  const [activeSection, setActiveSection] = useState('home');

  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY + 100;

      for (const item of navItems) {
        const element = document.querySelector(item.href);
        if (element) {
          const offsetTop = (element as HTMLElement).offsetTop;
          const offsetBottom = offsetTop + (element as HTMLElement).offsetHeight;

          if (scrollPosition >= offsetTop && scrollPosition < offsetBottom) {
            setActiveSection(item.id);
            break;
          }
        }
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();

    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  if (isMobile) return null;

  return (
    <div className="fixed left-2 sm:left-3 md:left-4 top-1/2 -translate-y-1/2 z-50 transition-all duration-500 ease-in-out">
      <LiquidGlass
        as="nav"
        aria-label="Navegación de secciones"
        variant="strong"
        enableBreathing
        className="w-14 sm:w-16 rounded-2xl"
      >
        {navItems.map((item) => (
          <Tooltip key={item.id}>
            <TooltipTrigger asChild>
              <a
                href={item.href}
                aria-label={item.name}
                aria-current={activeSection === item.id ? 'true' : undefined}
                className={cn(
                  'relative w-full h-12 sm:h-14 flex items-center justify-center rounded-xl transition-all duration-300 cursor-pointer',
                  'text-muted-foreground hover:text-primary hover:bg-primary/10',
                  activeSection === item.id
                    ? 'text-primary bg-primary/15 shadow-sm'
                    : ''
                )}
              >
                <item.icon size={20} strokeWidth={activeSection === item.id ? 2 : 1.5} />
              </a>
            </TooltipTrigger>
            <TooltipContent side="right">{item.name}</TooltipContent>
          </Tooltip>
        ))}
      </LiquidGlass>
    </div>
  );
};

export default Sidebar;