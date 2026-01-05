import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { ArrowLeft, Calendar } from 'lucide-react';
import BlogContent from '@/components/BlogContent';
import Footer from '@/components/Footer';
import Navbar from '@/components/Navbar';
import TechBadge from '@/components/TechBadge';
import { BlogPost } from '@/lib/blogTypes';
import { getPostBySlug } from '@/lib/blogUtils';
import ThemeToggle from '@/components/ThemeToggle';

const BlogPostPage = () => {
  const { slug } = useParams<{ slug: string }>();
  const navigate = useNavigate();
  const [post, setPost] = useState<BlogPost | null>(null);
  const [isMobile, setIsMobile] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768);
    };
    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  useEffect(() => {
    const loadPost = async () => {
      setLoading(true);
      const loadedPost = await getPostBySlug(slug || '');

      if (loadedPost) {
        setPost(loadedPost);
      }
      setLoading(false);
    };
    loadPost();
  }, [slug]);

  if (loading) {
    return (
      <div className="min-h-screen bg-background text-foreground flex items-center justify-center">
        <div className="animate-pulse text-foreground">Cargando...</div>
      </div>
    );
  }

  if (!post) {
    return (
      <div className="min-h-screen bg-background text-foreground flex flex-col items-center justify-center px-4">
        <h1 className="text-3xl font-bold mb-4">Post no encontrado</h1>
        <p className="text-muted-foreground mb-6">El post que buscas no existe.</p>
        <button
          onClick={() => navigate('/blog')}
          className="px-6 py-2 bg-primary text-white rounded-lg hover:bg-primary/90 transition-all"
        >
          Volver al blog
        </button>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background text-foreground">
      <div className="mx-auto transition-all duration-300 max-w-[75%] px-4 py-20 md:px-6 md:max-w-[100%] md:py-20 lg:px-8 lg:py-24">
        <Navbar isMobile={isMobile} />

        <article className="mt-12 sm:mt-16 md:mt-20">
          <button
            onClick={() => navigate('/blog')}
            className="m-auto sm:mb-8 flex items-center gap-2 text-sm font-medium text-muted-foreground hover:text-foreground transition-colors"
          >
            <ArrowLeft className="h-4 w-4" />
            Volver al blog
          </button>

          {post.image && (
            <div className="relative w-[55%] m-auto aspect-video overflow-hidden rounded-xl sm:rounded-2xl shadow-xl sm:mb-8">
              <img
                src={post.image}
                alt={post.title}
                className="w-full h-full object-cover "
              />
            </div>
          )}

          <div className="max-w-4xl mx-auto">
            <div className="mb-6 sm:mb-8 space-y-3">
              <TechBadge name={post.category} className="text-xs sm:text-sm py-1.5 px-3" />
            </div>

            <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold text-foreground mb-6 sm:mb-8 tracking-tight">
              {post.title}
            </h1>

            <div className="flex flex-wrap items-center gap-4 sm:gap-6 text-sm text-muted-foreground mb-6 sm:mb-8 pb-6 border-b border-border">
              <div className="flex items-center gap-2">
                <Calendar className="h-4 w-4" />
                <time dateTime={post.date}>
                  {new Date(post.date).toLocaleDateString('es-ES', {
                    weekday: 'long',
                    day: 'numeric',
                    month: 'long',
                    year: 'numeric'
                  })}
                </time>
              </div>
            </div>

            {post.tags.length > 0 && (
              <div className="flex flex-wrap gap-2 mb-6 sm:mb-8">
                {post.tags.map((tag) => (
                  <span
                    key={tag}
                    className="text-xs sm:text-sm text-primary/80 bg-primary/10 px-3 py-1.5 rounded-md"
                  >
                    #{tag}
                  </span>
                ))}
              </div>
            )}

            <BlogContent content={post.content} />
          </div>
        </article>

        <Footer />
      </div>
    </div>
  );
};

export default BlogPostPage;
