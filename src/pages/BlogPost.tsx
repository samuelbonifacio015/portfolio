import { useEffect, useMemo, useRef, useState } from 'react';
import { ArrowLeft, Calendar, Menu, X } from 'lucide-react';
import { useNavigate, useParams } from 'react-router-dom';
import BlogContent from '@/components/BlogContent';
import Footer from '@/components/Footer';
import Navbar from '@/components/Navbar';
import { BlogPost } from '@/lib/blogTypes';
import { getPostBySlug } from '@/lib/blogUtils';
import { getMarkdownHeadings } from '@/lib/markdownHeadings';
import { useI18n } from '@/lib/i18n';

const BlogPostPage = () => {
  const { slug } = useParams<{ slug: string }>();
  const navigate = useNavigate();
  const [post, setPost] = useState<BlogPost | null>(null);
  const [loading, setLoading] = useState(true);
  const [tocOpen, setTocOpen] = useState(false);
  const [activeHeading, setActiveHeading] = useState('');
  const tocRef = useRef<HTMLDivElement>(null);
  const tocButtonRef = useRef<HTMLButtonElement>(null);
  const { language, t, translatePost, formatDate } = useI18n();

  const headings = useMemo(() => getMarkdownHeadings(post?.content ?? ''), [post?.content]);

  useEffect(() => {
    let cancelled = false;
    const loadPost = async () => {
      setLoading(true);
      const loadedPost = await getPostBySlug(slug || '');
      if (!cancelled) {
        setPost(loadedPost ? translatePost(loadedPost) : null);
        setLoading(false);
      }
    };
    loadPost();
    return () => { cancelled = true; };
  }, [language, slug, translatePost]);

  useEffect(() => {
    if (!headings.length) return;
    const elements = headings
      .map(({ id }) => document.getElementById(id))
      .filter((element): element is HTMLElement => Boolean(element));
    if (!elements.length) return;

    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((entry) => entry.isIntersecting)
          .sort((a, b) => a.boundingClientRect.top - b.boundingClientRect.top)[0];
        if (visible) setActiveHeading(visible.target.id);
      },
      { rootMargin: '-96px 0px -65% 0px', threshold: [0, 1] },
    );
    elements.forEach((element) => observer.observe(element));
    return () => observer.disconnect();
  }, [headings]);

  useEffect(() => {
    if (!headings.length) return;
    const hash = window.location.hash.slice(1);
    if (!hash) return;
    requestAnimationFrame(() => {
      document.getElementById(decodeURIComponent(hash))?.scrollIntoView({
        behavior: window.matchMedia('(prefers-reduced-motion: reduce)').matches ? 'auto' : 'smooth',
        block: 'start',
      });
    });
  }, [headings]);

  useEffect(() => {
    if (!tocOpen) return;
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        setTocOpen(false);
        tocButtonRef.current?.focus();
      }
    };
    const onPointerDown = (event: PointerEvent) => {
      if (tocRef.current && !tocRef.current.contains(event.target as Node)) setTocOpen(false);
    };
    document.addEventListener('keydown', onKeyDown);
    document.addEventListener('pointerdown', onPointerDown);
    return () => {
      document.removeEventListener('keydown', onKeyDown);
      document.removeEventListener('pointerdown', onPointerDown);
    };
  }, [tocOpen]);

  const scrollToHeading = (id: string) => {
    const target = document.getElementById(id);
    if (!target) return;
    window.history.pushState(null, '', `#${id}`);
    target.scrollIntoView({
      behavior: window.matchMedia('(prefers-reduced-motion: reduce)').matches ? 'auto' : 'smooth',
      block: 'start',
    });
    setActiveHeading(id);
    setTocOpen(false);
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-background text-foreground">
        <Navbar />
        <div className="flex min-h-screen items-center justify-center text-sm text-muted-foreground">{t('Cargando…')}</div>
      </div>
    );
  }

  if (!post) {
    return (
      <div className="flex min-h-screen flex-col items-center justify-center bg-background px-4 text-center text-foreground">
        <Navbar />
        <h1 className="text-3xl font-semibold tracking-tight">{t('Post no encontrado')}</h1>
        <p className="mt-3 text-muted-foreground">{t('El post que buscas no existe.')}</p>
        <button onClick={() => navigate('/blog')} className="mt-8 rounded-full bg-primary px-5 py-2.5 text-sm font-semibold text-primary-foreground transition-colors hover:bg-primary/90 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2">
          {t('Volver al blog')}
        </button>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background text-foreground">
      <Navbar />

      <div className="mx-auto max-w-7xl px-4 pt-28 md:px-8">
        <button
          onClick={() => navigate('/blog')}
          className="inline-flex items-center gap-2 rounded-lg px-2 py-1 text-sm text-muted-foreground transition-colors hover:text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
        >
          <ArrowLeft className="h-4 w-4" aria-hidden="true" />
          {t('Volver al blog')}
        </button>
      </div>

      {headings.length > 0 && (
        <div ref={tocRef} className="fixed right-4 top-20 z-40 md:hidden">
          <button
            ref={tocButtonRef}
            type="button"
            aria-label={tocOpen ? t('Cerrar índice del artículo') : t('Abrir índice del artículo')}
            aria-expanded={tocOpen}
            aria-controls="mobile-article-toc"
            onClick={() => setTocOpen((open) => !open)}
            className="flex h-11 w-11 items-center justify-center rounded-full border border-border bg-background text-foreground shadow-sm transition-colors hover:bg-muted focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
          >
            {tocOpen ? <X className="h-4 w-4" aria-hidden="true" /> : <Menu className="h-4 w-4" aria-hidden="true" />}
          </button>
          <div id="mobile-article-toc" hidden={!tocOpen} className="absolute right-0 top-14 w-[min(280px,calc(100vw-2rem))] rounded-xl border border-border bg-background p-3 shadow-lg">
            <TocLinks headings={headings} activeHeading={activeHeading} onSelect={scrollToHeading} />
          </div>
        </div>
      )}

      <main className="mx-auto flex w-full max-w-7xl flex-col gap-8 px-4 pb-20 pt-8 md:flex-row md:gap-4 md:px-8 md:pt-12">
        {headings.length > 0 && (
          <aside className="sticky top-20 left-0 hidden max-w-xs shrink-0 self-start pr-10 md:flex" aria-label={t('Índice del artículo')}>
            <TocLinks headings={headings} activeHeading={activeHeading} onSelect={scrollToHeading} />
          </aside>
        )}

        <article className="min-w-0 max-w-2xl flex-1">
          {post.image && (
            <img src={post.image} alt={post.title} className="h-60 w-full rounded-3xl object-cover md:h-[30rem]" />
          )}

          <h1 className="mt-6 text-2xl font-semibold leading-tight tracking-tight text-foreground [text-wrap:balance]">{post.title}</h1>

          <BlogContent content={post.content} />

          <div className="mt-12 border-t border-border" />
          <div className="mt-2 border-t border-muted-foreground/20" />

          <footer className="mb-8 mt-8 flex items-center gap-3 text-sm text-muted-foreground">
            <img src="/samuel.jpg" alt="Samuel Bonifacio" className="h-5 w-5 rounded-full object-cover" />
            <span className="font-medium text-foreground">Samuel Bonifacio</span>
            <span aria-hidden="true" className="h-1 w-1 rounded-full bg-muted-foreground/60" />
            <Calendar className="h-3.5 w-3.5" aria-hidden="true" />
            <time dateTime={post.date}>{formatDate(post.date)}</time>
          </footer>
        </article>
      </main>

      <div className="mx-auto max-w-7xl px-4 md:px-8"><Footer /></div>
    </div>
  );
};

interface TocLinksProps {
  headings: ReturnType<typeof getMarkdownHeadings>;
  activeHeading: string;
  onSelect: (id: string) => void;
}

const TocLinks = ({ headings, activeHeading, onSelect }: TocLinksProps) => {
  const { t } = useI18n();
  return <nav aria-label={t('Secciones del artículo')} className="space-y-1">
    {headings.map((heading) => (
      <a
        key={heading.id}
        href={`#${heading.id}`}
        aria-current={activeHeading === heading.id ? 'location' : undefined}
        onClick={(event) => {
          event.preventDefault();
          onSelect(heading.id);
        }}
        className={`group relative block w-full rounded-lg px-2 py-1.5 text-left text-sm leading-snug transition-transform duration-150 hover:translate-x-1 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring ${heading.level === 3 ? 'pl-5 text-muted-foreground' : 'text-foreground/80'} ${activeHeading === heading.id ? 'text-foreground' : ''}`}
      >
        <span className={`absolute bottom-1.5 left-0 top-1.5 w-0.5 rounded-full bg-primary transition-opacity ${activeHeading === heading.id ? 'opacity-100' : 'opacity-0 group-hover:opacity-100'}`} aria-hidden="true" />
        {heading.text}
      </a>
    ))}
  </nav>;
};

export default BlogPostPage;
