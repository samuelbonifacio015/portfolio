import { useEffect, useState, type MouseEvent } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Github, Menu, X } from 'lucide-react';
import { cn } from '@/lib/utils';
import ThemeToggle from '@/components/ThemeToggle';
import { LiquidGlass } from '@/components/ui/LiquidGlass';

interface NavLink {
  name: string;
  sectionId?: string;
  href?: string;
}

interface NavbarProps {
  isMobile: boolean;
}

const sectionNavLinks: NavLink[] = [
  { name: 'Blog', href: '/blog' },
];

// Mirror of Sidebar items: Sidebar is hidden on mobile, so section
// navigation must live in the mobile menu.
const mobileSectionLinks: NavLink[] = [
  { name: 'Inicio', sectionId: 'home' },
  { name: 'Tecnologías', sectionId: 'technologies' },
  { name: 'Proyectos', sectionId: 'projects' },
  { name: 'Conocimientos', sectionId: 'knowledge' },
  { name: 'Contacto', sectionId: 'contact' },
];

const Navbar = ({ isMobile }: NavbarProps) => {
  const location = useLocation();
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const isHomeRoute = location.pathname === '/';
  void isMobile;

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 20);
    handleScroll();
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const getSectionHref = (sectionId?: string) => {
    if (!sectionId) return undefined;
    return isHomeRoute ? `#${sectionId}` : `/#${sectionId}`;
  };

  const scrollToSection = (event: MouseEvent<HTMLAnchorElement>, sectionId?: string) => {
    if (!sectionId) { setIsMobileMenuOpen(false); return; }
    if (!isHomeRoute) { setIsMobileMenuOpen(false); return; }
    event.preventDefault();
    document.getElementById(sectionId)?.scrollIntoView({ behavior: 'smooth', block: 'start' });
    setIsMobileMenuOpen(false);
  };

  const renderNavLink = (link: NavLink, className: string) => {
    if (link.href) {
      return (
        <Link
          key={link.name}
          to={link.href}
          className={className}
          onClick={() => setIsMobileMenuOpen(false)}
        >
          {link.name}
        </Link>
      );
    }
    return (
      <a
        key={link.name}
        href={getSectionHref(link.sectionId)}
        onClick={(event) => scrollToSection(event, link.sectionId)}
        className={className}
      >
        {link.name}
      </a>
    );
  };

  return (
    <header className="fixed left-0 right-0 top-0 z-50 w-full">
      <LiquidGlass
        variant="strong"
        enableReflection
        enableBreathing
        disabled={!isScrolled}
        className={cn(
          'relative mx-auto flex items-center justify-between overflow-visible transition-[width,max-width,margin,padding,background-color,border-color,border-radius,box-shadow,backdrop-filter] duration-700 [transition-timing-function:cubic-bezier(0.22,1,0.36,1)]',
          isScrolled
            ? 'mt-3 w-[95%] max-w-5xl rounded-full px-4 py-3 shadow-[0_18px_55px_rgba(15,23,42,0.10),inset_0_1px_1px_rgba(255,255,255,0.20)] dark:shadow-[0_18px_55px_rgba(0,0,0,0.35),inset_0_1px_1px_rgba(255,255,255,0.12)] md:w-[86%] md:px-6'
            : 'w-full px-4 py-4 md:px-10'
        )}
      >
        <div className="z-10 flex items-center gap-6">
          <Link to="/" className="flex items-center" onClick={() => setIsMobileMenuOpen(false)}>
            <span className="text-lg font-display font-bold tracking-tight text-foreground sm:text-xl">
              <span className="text-primary">samuel</span>.dev
            </span>
          </Link>
        </div>

        <div className="absolute left-1/2 top-1/2 hidden -translate-x-1/2 -translate-y-1/2 lg:block">
          <nav className="flex items-center gap-1 xl:gap-2" aria-label="Navegación principal">
            {sectionNavLinks.map((link) =>
              renderNavLink(
                link,
                'rounded-full px-3 py-2 text-sm font-medium text-muted-foreground transition-colors duration-150 hover:bg-primary/10 hover:text-primary xl:px-4'
              )
            )}
          </nav>
        </div>

        <div className="z-10 hidden items-center gap-3 lg:flex">
          <a
            href="https://github.com/samuelbonifacio015"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex h-10 w-10 items-center justify-center rounded-full text-muted-foreground transition-colors duration-150 hover:bg-muted hover:text-foreground"
            aria-label="Perfil de GitHub"
          >
            <Github className="h-5 w-5" />
          </a>

          <ThemeToggle />

          <a
            href={getSectionHref('contact')}
            onClick={(event) => scrollToSection(event, 'contact')}
            className="rounded-full bg-foreground px-5 py-2.5 text-sm font-semibold text-background shadow-sm transition-colors duration-150 hover:bg-foreground/90"
          >
            Hablemos
          </a>
        </div>

        <div className="fixed right-4 top-4 z-20 flex items-center gap-2 lg:hidden">
          <ThemeToggle />
          <button
            type="button"
            className="inline-flex h-10 w-10 items-center justify-center rounded-full text-foreground transition-colors hover:bg-muted focus:outline-none focus-visible:ring-2 focus-visible:ring-ring"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            aria-label={isMobileMenuOpen ? 'Cerrar menú' : 'Abrir menú'}
            aria-expanded={isMobileMenuOpen}
          >
            {isMobileMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>

        {isMobileMenuOpen && (
          <LiquidGlass
            as="nav"
            variant="strong"
            enableBreathing
            className="fixed left-4 right-4 top-16 rounded-2xl px-2 py-3 shadow-xl animate-in fade-in slide-in-from-top-2 duration-300 lg:hidden"
            aria-label="Menú móvil"
          >
            <div className="flex flex-col">
              {[...mobileSectionLinks, ...sectionNavLinks].map((link) =>
                renderNavLink(
                  link,
                  'rounded-xl px-4 py-3 text-sm font-medium text-foreground/90 transition-all duration-200 hover:bg-muted hover:text-foreground'
                )
              )}
              <a
                href="https://github.com/samuelbonifacio015"
                target="_blank"
                rel="noopener noreferrer"
                className="mt-1 flex items-center gap-2 rounded-xl px-4 py-3 text-sm font-medium text-foreground/90 transition-all duration-200 hover:bg-muted hover:text-foreground"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                <Github className="h-4 w-4" />
                GitHub
              </a>
            </div>
          </LiquidGlass>
        )}
      </LiquidGlass>
    </header>
  );
};

export default Navbar;
