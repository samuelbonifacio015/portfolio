import { useState, useEffect } from 'react';
import { cn } from '@/lib/utils';
import { Home, Cpu, FolderGit2, BookOpen, Mail } from 'lucide-react';

const navItems = [
  { name: 'Inicio', href: '#home', id: 'home', icon: Home },
  { name: 'Tecnologías', href: '#technologies', id: 'technologies', icon: Cpu },
  { name: 'Proyectos', href: '#projects', id: 'projects', icon: FolderGit2 },
  { name: 'Conocimientos', href: '#knowledge', id: 'knowledge', icon: BookOpen },
  { name: 'Contacto', href: '#contact', id: 'contact', icon: Mail },
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

    window.addEventListener('scroll', handleScroll);
    handleScroll();

    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  if (isMobile) return null;

  return (
    <div className="fixed left-2 sm:left-3 md:left-4 top-1/2 -translate-y-1/2 z-50 transition-all duration-500 ease-in-out">
      <article className="border border-border w-14 sm:w-16 ease-in-out duration-500 left-0 rounded-2xl inline-block shadow-lg shadow-black/15 bg-card/95 backdrop-blur-xl">
        {navItems.map((item) => (
          <a
            key={item.id}
            href={item.href}
            className={cn(
              'has-[:checked]:shadow-lg relative w-full h-12 sm:h-16 p-3 sm:p-4 ease-in-out duration-300 border-solid border-border/10 has-[:checked]:border-primary/50 group flex flex-row gap-3 items-center justify-center text-foreground/80 rounded-xl cursor-pointer transition-all',
              'hover:text-foreground hover:bg-foreground/5',
              activeSection === item.id ? 'text-primary bg-foreground/5' : ''
            )}
          >
            <item.icon size={24} strokeWidth={1.5} />
          </a>
        ))}
      </article>
    </div>
  );
};

export default Sidebar;