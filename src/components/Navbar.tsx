import { useCallback, useEffect, useRef, useState } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { RiGithubFill } from '@remixicon/react';
import { Link, useLocation } from 'react-router-dom';
import { cn } from '@/lib/utils';
import ThemeToggle from '@/components/ThemeToggle';
import { useI18n } from '@/lib/i18n';

const navItems = [
  { key: 'Tecnologías', href: '#technologies', id: 'technologies' },
  { key: 'Educación', href: '#education', id: 'education' },
  { key: 'Experiencia', href: '#experience', id: 'experience' },
  { key: 'Proyectos', href: '#projects', id: 'projects' },
];

const Navbar = () => {
  const { language, t, toggleLanguage } = useI18n();
  const { pathname, hash } = useLocation();
  const [activeSection, setActiveSection] = useState('home');
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(false);
  const navRef = useRef<HTMLDivElement>(null);
  const isBlog = pathname.startsWith('/blog');

  const updateOverflowIndicators = useCallback(() => {
    const nav = navRef.current;
    if (!nav) return;

    setCanScrollLeft(nav.scrollLeft > 4);
    setCanScrollRight(nav.scrollLeft + nav.clientWidth < nav.scrollWidth - 4);
  }, []);

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
    if (pathname !== '/' || !hash) return;

    const frame = requestAnimationFrame(() => {
      const target = document.getElementById(decodeURIComponent(hash.slice(1)));
      target?.scrollIntoView({
        behavior: window.matchMedia('(prefers-reduced-motion: reduce)').matches ? 'auto' : 'smooth',
      });
    });

    return () => cancelAnimationFrame(frame);
  }, [hash, pathname]);

  useEffect(() => {
    const nav = navRef.current;
    if (!nav) return;

    updateOverflowIndicators();
    nav.addEventListener('scroll', updateOverflowIndicators, { passive: true });
    window.addEventListener('resize', updateOverflowIndicators);

    return () => {
      nav.removeEventListener('scroll', updateOverflowIndicators);
      window.removeEventListener('resize', updateOverflowIndicators);
    };
  }, [updateOverflowIndicators]);

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
      <div className="mx-auto max-w-[var(--container-max)]">
        <div className="flex items-center rounded-[var(--radius-pill)] border border-border bg-background/95 p-1 shadow-[0_1px_3px_rgba(0,0,0,0.06)] backdrop-blur-lg supports-[backdrop-filter]:bg-background/80">
          <nav aria-label={t('Navegación principal')} className="flex min-w-0 flex-1 items-center gap-2">
            <a
              href={pathname === '/' ? '#home' : '/#home'}
              className="shrink-0 rounded-[var(--radius-pill)] px-2.5 py-2 text-sm font-bold tracking-tight text-foreground transition-colors hover:bg-secondary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring sm:px-3 sm:text-base"
              aria-label={t('Ir al inicio')}
            >
              samuel<span className="text-primary">.</span>dev
            </a>

            <div className="relative min-w-0 flex-1">
              <div
                ref={navRef}
                className="w-full overflow-x-auto [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
              >
                <div className="flex min-w-max items-center justify-start gap-0.5 pr-1 sm:justify-center">
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
                            : 'text-foreground/75 hover:bg-secondary hover:text-foreground'
                        )}
                      >
                        {t(item.key)}
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
                        : 'text-foreground/75 hover:bg-secondary hover:text-foreground'
                    )}
                  >
                    Blog
                  </Link>
                </div>
              </div>

              {canScrollLeft && (
                <span className="pointer-events-none absolute inset-y-2 left-0 flex w-5 items-center justify-center rounded-full bg-background text-muted-foreground sm:hidden" aria-hidden="true">
                  <ChevronLeft className="h-3.5 w-3.5" />
                </span>
              )}
              {canScrollRight && (
                <span className="pointer-events-none absolute inset-y-2 right-0 flex w-5 items-center justify-center rounded-full bg-background text-muted-foreground sm:hidden" aria-hidden="true">
                  <ChevronRight className="h-3.5 w-3.5" />
                </span>
              )}
            </div>
          </nav>

          <div className="ml-1 flex shrink-0 items-center gap-1">
            <button
              type="button"
              onClick={toggleLanguage}
              aria-label={language === 'es' ? 'Switch to English' : 'Cambiar a español'}
              title={language === 'es' ? 'Switch to English' : 'Cambiar a español'}
              className="inline-flex h-11 min-w-11 items-center justify-center rounded-full border border-border bg-background px-2 text-xs font-bold tracking-wide text-foreground transition-colors hover:border-primary hover:bg-secondary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background"
            >
              {language === 'es' ? 'EN' : 'ES'}
            </button>
            <a
              href="https://github.com/samuelbonifacio015"
              target="_blank"
              rel="noopener noreferrer"
              aria-label={t('Abrir el perfil de GitHub de Samuel Bonifacio')}
              title="GitHub"
              className="group inline-flex h-11 w-11 items-center justify-center rounded-full border border-border bg-background text-foreground transition-colors duration-200 hover:border-primary hover:bg-secondary active:scale-95 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background"
            >
              <RiGithubFill
                aria-hidden="true"
                className="h-8 w-8 transition-transform duration-200 group-hover:scale-105 group-active:scale-95"
              />
            </a>
            <ThemeToggle />
          </div>
        </div>
      </div>
    </header>
  );
};

export default Navbar;
