import { useState, useEffect } from 'react';
import { Menu, X } from 'lucide-react';
import { cn } from '@/lib/utils';

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { name: 'Inicio', href: '#home' },
    { name: 'Proyectos', href: '#projects' },
    { name: 'Tecnologías', href: '#technologies' },
    { name: 'Conocimientos', href: '#knowledge' },
    { name: 'Contacto', href: '#contact' },
  ];

  return (
    <header
      className={cn(
        'fixed top-0 left-0 right-0 z-50 transition-all duration-300 ease-in-out py-4',
        isScrolled ? 'bg-black/50 backdrop-blur-lg shadow-md' : 'bg-transparent'
      )}
    >
      <div className="container mx-auto px-4 md:px-6">
        <div className="flex items-center justify-between">
          <a href="#home" className="text-xl font-display font-bold tracking-tight text-white">
            <span className="text-primary">samuel</span>.dev
          </a>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-8">
            {navLinks.map((link) => (
              <a
                key={link.name}
                href={link.href}
                className="text-sm font-medium text-white/80 hover:text-white transition-colors duration-200 relative group"
              >
                {link.name}
                <span className="absolute left-0 bottom-0 w-0 h-0.5 bg-primary group-hover:w-full transition-all duration-300"></span>
              </a>
            ))}
          </nav>

          {/* Menu Nav Mobile */}
          <button
            className="md:hidden text-white focus:outline-none"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            aria-label="Toggle menu"
          >
            {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>

        {/* Mobile Menu Dropdown */}
        <div
          className={cn(
            'md:hidden overflow-hidden transition-all duration-300 ease-in-out',
            isMobileMenuOpen ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'
          )}
        >
          <nav className="bg-black/95 backdrop-blur-xl rounded-lg mt-4 py-4 px-2 shadow-lg border border-white/10">
            <div className="flex flex-col space-y-1">
              {navLinks.map((link) => (
                <a
                  key={link.name}
                  href={link.href}
                  className="text-sm font-medium text-white/90 hover:text-white hover:bg-white/10 transition-all duration-200 px-4 py-3 rounded-md"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  {link.name}
                </a>
              ))}
            </div>
          </nav>
        </div>
      </div>
    </header>
  );
};

export default Navbar;