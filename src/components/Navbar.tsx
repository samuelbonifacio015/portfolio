import { useState, useEffect } from 'react';
import { Menu, X } from 'lucide-react';
import { cn } from '@/lib/utils';
import ThemeToggle from '@/components/ThemeToggle';

interface NavLink {
  name: string;
  href: string;
}

interface NavbarProps {
  isMobile: boolean;
}

const mobileNavLinks: NavLink[] = [
  { name: 'Inicio', href: '/' },
  { name: 'Blog', href: '/blog' },
  { name: 'Tecnologías', href: '#technologies' },
  { name: 'Proyectos', href: '#projects' },
  { name: 'Conocimientos', href: '#knowledge' },
  { name: 'Contacto', href: '#contact' },
];

const personalNavLinks: NavLink[] = [
  { name: 'Blog', href: '/blog' },
];

const Navbar = ({ isMobile }: NavbarProps) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <header
      className={cn(
        'fixed top-0 left-0 right-0 z-50 transition-all duration-300 ease-in-out py-3 sm:py-4',
        isScrolled
          ? 'backdrop-blur-lg shadow-md bg-white/70 dark:bg-black/50'
          : 'bg-transparent'
      )}
    >
      <div className="container mx-auto px-3 sm:px-4 md:px-6 relative">
        <div className="flex items-center justify-between">
          <a href="#home" className="text-lg sm:text-xl font-display font-bold tracking-tight text-foreground">
            <span className="text-primary">samuel</span>.dev
          </a>

          <div className="hidden md:flex absolute left-1/2 -translate-x-1/2 items-center gap-2">
            <nav className="flex items-center gap-1 sm:gap-2">
              {personalNavLinks.map((link) => (
                <a
                  key={link.name}
                  href={link.href}
                  className="text-xs sm:text-sm font-medium text-primary/90 hover:text-primary hover:bg-primary/10 transition-all duration-200 px-3 py-2 rounded-lg"
                >
                  {link.name}
                </a>
              ))}
            </nav>
          </div>

          {isMobile ? (
            <div className="flex items-center gap-1 sm:gap-2">
              <ThemeToggle />
              <button
                className="text-foreground focus:outline-none p-1 hover:bg-foreground/5 rounded-lg transition-colors"
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                aria-label="Toggle menu"
              >
                {isMobileMenuOpen ? <X size={20} className="sm:size-24" /> : <Menu size={20} className="sm:size-24" />}
              </button>
            </div>
          ) : (
            <div className="flex items-center gap-4">
              <ThemeToggle />
            </div>
          )}
        </div>

        {isMobile && isMobileMenuOpen && (
          <nav className="backdrop-blur-xl rounded-lg mt-3 sm:mt-4 py-3 sm:py-4 px-2 shadow-lg border border-border bg-card/95 animate-in fade-in slide-down-from-top-2 duration-300">
            <div className="flex flex-col space-y-0 sm:space-y-1">
              {mobileNavLinks.map((link) => (
                <a
                  key={link.name}
                  href={link.href}
                  className="text-sm font-medium text-foreground/90 hover:text-foreground hover:bg-foreground/5 transition-all duration-200 px-3 sm:px-4 py-2 sm:py-3 rounded-md"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  {link.name}
                </a>
              ))}
            </div>
          </nav>
        )}
      </div>
    </header>
  );
};

export default Navbar;