import { useState, useEffect } from 'react';
import { cn } from '@/lib/utils';

const navItems = [
  { name: 'Inicio', href: '#home', id: 'home' },
  { name: 'Tecnologías', href: '#technologies', id: 'technologies' },
  { name: 'Proyectos', href: '#projects', id: 'projects' },
  { name: 'Conocimientos', href: '#knowledge', id: 'knowledge' },
  { name: 'Contacto', href: '#contact', id: 'contact' },
];

interface RadioSidebarProps {
  isMobile: boolean;
}

const RadioSidebar = ({ isMobile }: RadioSidebarProps) => {
  const [activeSection, setActiveSection] = useState('home');

  const icons = {
    home: (
      <svg className="text-2xl" xmlns="http://www.w3.org/2000/svg" width={24} height={24} viewBox="0 0 24 24">
        <path fill="currentColor" d="M12 2a5 5 0 1 0 5 5 5 5 0 0 0-5-5zm0 8a3 3 0 1 1 3-3 3 3 0 0 1-3 3zm9 11v-1a7 7 0 0 0-7-7h-4a7 7 0 0 0-7 7v1h2v-1a5 5 0 0 1 5-5h4a5 5 0 0 1 5 5v1z" />
      </svg>
    ),
    technologies: (
      <svg className="text-2xl" xmlns="http://www.w3.org/2000/svg" width={24} height={24} viewBox="0 0 24 24">
        <path fill="currentColor" d="M12 16c2.206 0 4-1.794 4-4s-1.794-4-4-4-4 1.794-4 4 1.794 4 4 4zm0-6c1.084 0 2 .916 2 2s-.916 2-2 2-2-.916-2-2 .916-2 2-2z" />
        <path fill="currentColor" d="m2.845 16.136 1 1.73c.531.917 1.809 1.261 2.73.73l.529-.306A8.1 8.1 0 0 0 9 19.402V20c0 1.103.897 2 2 2h2c1.103 0 2-.897 2-2v-.598a8.132 8.132 0 0 0 1.896-1.111l.529.306c.923.53 2.198.188 2.731-.731l.999-1.729a2.001 2.001 0 0 0-.731-2.732l-.505-.292a7.718 7.718 0 0 0 0-2.224l.505-.292a2.002 2.002 0 0 0 .731-2.732l-.999-1.729c-.531-.92-1.808-1.265-2.731-.732l-.529.306A8.1 8.1 0 0 0 15 4.598V4c0-1.103-.897-2-2-2h-2c-1.103 0-2 .897-2 2v.598a8.132 8.132 0 0 0-1.896 1.111l-.529-.306c-.924-.531-2.2-.187-2.731.732l-.999 1.729a2.001 2.001 0 0 0 .731 2.732l.505.292a7.683 7.683 0 0 0 0 2.223l-.505.292a2.003 2.003 0 0 0-.731 2.733zm3.326-2.758A5.703 5.703 0 0 1 6 12c0-.462.058-.926.17-1.378a.999.999 0 0 0-.47-1.108l-1.123-.65.998-1.729 1.145.662a.997.997 0 0 0 1.188-.142 6.071 6.071 0 0 1 2.384-1.399A1 1 0 0 0 11 5.3V4h2v1.3a1 1 0 0 0 .708.956 6.083 6.083 0 0 1 2.384 1.399.999.999 0 0 0 1.188.142l1.144-.661 1 1.729-1.124.649a1 1 0 0 0-.47 1.108c.112.452.17.916.17 1.378 0 .461-.058.925-.171 1.378a1 1 0 0 0 .471 1.108l1.123.649-.998 1.729-1.145-.661a.996.996 0 0 0-1.188.142 6.071 6.071 0 0 1-2.384 1.399A1 1 0 0 0 13 18.7l.002 1.3H11v-1.3a1 1 0 0 0-.708-.956 6.083 6.083 0 0 1-2.384-1.399.992.992 0 0 0-1.188-.141l-1.144.662-1-1.729 1.124-.651a1 1 0 0 0 .471-1.108z" />
      </svg>
    ),
    projects: (
      <svg className="text-2xl" xmlns="http://www.w3.org/2000/svg" width={24} height={24} viewBox="0 0 24 24">
        <path fill="currentColor" d="M10.5 2A2.5 2.5 0 0 0 8 4.5V6H5A3 3 0 0 0 2 9v9a3 3 0 0 0 3 3h14a3 3 0 0 0 3-3V9a3 3 0 0 0-3-3h-3V4.5A2.5 2.5 0 0 0 13.5 2zm0 2h3A.5.5 0 0 1 14 4.5V6h-4V4.5A.5.5 0 0 1 10.5 4zm-5.5 5h14a1 1 0 0 1 1 1v2H4V10a1 1 0 0 1 1-1zm-1 5h16v3a1 1 0 0 1-1 1H5a1 1 0 0 1-1-1z"/>
      </svg>
    ),
    knowledge: (
      <svg className="text-2xl" xmlns="http://www.w3.org/2000/svg" width={24} height={24} viewBox="0 0 24 24">
        <path fill="currentColor" d="M21 4a1 1 0 0 0-1-1c-3.866 0-6.598 1.264-8 2.003C9.598 4.264 6.866 3 3 3A1 1 0 0 0 2 4v15a1 1 0 0 0 1 1c3.866 0 6.598 1.264 8 2.003C14.402 21.264 17.134 20 21 20a1 1 0 0 0 1-1V4zm-2 13.764c-2.77.093-5.018.8-7 1.86V7.236c1.982-1.06 4.23-1.767 7-1.86zm-14 0V5.376c2.77.093 5.018.8 7 1.86v12.388c-1.982-1.06-4.23-1.767-7-1.86z"/>
      </svg>
    ),
    contact: (
      <svg className="text-2xl" xmlns="http://www.w3.org/2000/svg" width={24} height={24} viewBox="0 0 24 24">
        <path fill="currentColor" d="M20 4H4a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V6a2 2 0 0 0-2-2zm0 2v.01L12 13 4 6.01V6h16zM4 20v-9.99l7.29 6.36a1 1 0 0 0 1.42 0L20 10.01V20H4z"/>
      </svg>
    ),
  };

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
            {icons[item.id as keyof typeof icons]}
          </a>
        ))}
      </article>
    </div>
  );
};

export default RadioSidebar;