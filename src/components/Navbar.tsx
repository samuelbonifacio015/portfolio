import { useEffect, useRef, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { cn } from '@/lib/utils';
import ThemeToggle from '@/components/ThemeToggle';

const navItems = [
  { name: 'Inicio', href: '#home', id: 'home' },
  { name: 'Tecnologías', href: '#technologies', id: 'technologies' },
  { name: 'Proyectos', href: '#projects', id: 'projects' },
  { name: 'Conocimientos', href: '#knowledge', id: 'knowledge' },
  { name: 'Contacto', href: '#contact', id: 'contact' },
];

const Navbar = () => {
  const { pathname } = useLocation();
  const [activeSection, setActiveSection] = useState('home');
  const navRef = useRef<HTMLElement>(null);
  const isBlog = pathname.startsWith('/blog');

  useEffect(() => {
    if (pathname !== '/') {
      setActiveSection('');
      return;
    }

    const handleScroll = () => {
      const scrollPosition = window.scrollY + 140;
      let current = 'home';

      for (const item of navItems) {
        const element = document.getElementById(item.id);
        if (element && scrollPosition >= element.offsetTop) current = item.id;
      }

      setActiveSection(current);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener('scroll', handleScroll);
  }, [pathname]);

  useEffect(() => {
    const nav = navRef.current;
    const activeLink = nav?.querySelector<HTMLElement>('[aria-current]');
    if (!nav || !activeLink) return;

    nav.scrollTo({
      left: activeLink.offsetLeft - nav.clientWidth / 2 + activeLink.clientWidth / 2,
      behavior: window.matchMedia('(prefers-reduced-motion: reduce)').matches ? 'auto' : 'smooth',
    });
  }, [activeSection, pathname]);

  return (
    <header className="fixed inset-x-0 top-0 z-50 px-3 pt-3 sm:px-5">
      <div className="mx-auto flex max-w-[var(--container-max)] items-center gap-3">
        <Link
          to="/"
          className="hidden shrink-0 text-base font-bold tracking-tight text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring sm:block"
          aria-label="Ir al inicio"
        >
          samuel<span className="text-primary">.</span>dev
        </Link>

        <nav
          ref={navRef}
          aria-label="Navegación principal"
          className="min-w-0 flex-1 overflow-x-auto rounded-[var(--radius-pill)] border border-border bg-background/80 p-1 shadow-[0_1px_3px_rgba(0,0,0,0.06)] backdrop-blur-md [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
        >
          <div className="flex min-w-max items-center justify-center gap-0.5">
            {navItems.map((item) => {
              const isActive = activeSection === item.id;
              return (
                <a
                  key={item.id}
                  href={pathname === '/' ? item.href : `/${item.href}`}
                  aria-current={isActive ? 'true' : undefined}
                  className={cn(
                    'inline-flex min-h-11 items-center rounded-[var(--radius-pill)] px-3 py-2.5 text-xs font-semibold transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring sm:px-4 sm:text-sm',
                    isActive
                      ? 'bg-primary text-primary-foreground'
                      : 'text-muted-foreground hover:bg-secondary hover:text-foreground'
                  )}
                >
                  {item.name}
                </a>
              );
            })}
            <Link
              to="/blog"
              aria-current={isBlog ? 'page' : undefined}
              className={cn(
                'inline-flex min-h-11 items-center rounded-[var(--radius-pill)] px-3 py-2.5 text-xs font-semibold transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring sm:px-4 sm:text-sm',
                isBlog
                  ? 'bg-primary text-primary-foreground'
                  : 'text-muted-foreground hover:bg-secondary hover:text-foreground'
              )}
            >
              Blog
            </Link>
          </div>
        </nav>

        <div className="shrink-0">
          <ThemeToggle />
        </div>
      </div>
    </header>
  );
};

export default Navbar;
