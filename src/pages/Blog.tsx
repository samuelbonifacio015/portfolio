import { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';
import BlogCard from '@/components/BlogCard';
import BlogHeader from '@/components/BlogHeader';
import Footer from '@/components/Footer';
import Navbar from '@/components/Navbar';
import { BlogPost } from '@/lib/blogTypes';
import { getAllPosts, getPostsByCategory, getPostsByTag } from '@/lib/blogUtils';
import ThemeToggle from '@/components/ThemeToggle';

const Blog = () => {
  const [posts, setPosts] = useState<BlogPost[]>([]);
  const [filteredPosts, setFilteredPosts] = useState<BlogPost[]>([]);
  const [currentFilter, setCurrentFilter] = useState<string>('Todos');
  const [isMobile, setIsMobile] = useState(false);
  const [isVisible, setIsVisible] = useState(false);
  const navigate = useNavigate();
  const sectionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768);
    };
    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  useEffect(() => {
    const loadPosts = async () => {
      const allPosts = await getAllPosts();
      setPosts(allPosts);
      setFilteredPosts(allPosts);
    };
    loadPosts();
  }, []);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.unobserve(entry.target);
        }
      },
      { threshold: 0.1 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => {
      if (sectionRef.current) {
        observer.unobserve(sectionRef.current);
      }
    };
  }, []);

  const handleFilterChange = async (filter: string) => {
    setCurrentFilter(filter);

    if (filter === 'Todos') {
      setFilteredPosts(posts);
    } else if (['Reflexiones'].includes(filter)) {
      const categoryPosts = await getPostsByCategory(filter);
      setFilteredPosts(categoryPosts);
    } else {
      const tagPosts = await getPostsByTag(filter);
      setFilteredPosts(tagPosts);
    }
  };

  const handleTagClick = (tag: string) => {
    setCurrentFilter(tag);
    handleFilterChange(tag);
  };

  const handlePostClick = (slug: string) => {
    navigate(`/blog/${slug}`);
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-background via-background to-muted/20">
      <div className="mx-auto transition-all duration-300 max-w-7xl px-4 py-20 md:px-6 md:py-24 lg:px-8 lg:py-28">
        <Navbar isMobile={isMobile} />

        <div
          ref={sectionRef}
          className="mt-16 sm:mt-20 md:mt-24 space-y-12"
        >
          <BlogHeader
            currentFilter={currentFilter}
            onFilterChange={handleFilterChange}
          />

          {filteredPosts.length === 0 ? (
            <div className="text-center py-32">
              <div className="max-w-md mx-auto space-y-6">
                <div className="w-20 h-20 mx-auto rounded-full bg-muted flex items-center justify-center">
                  <span className="text-4xl">📝</span>
                </div>
                <p className="text-muted-foreground text-lg font-medium">
                  No se encontraron posts con este filtro.
                </p>
                <button
                  onClick={() => handleFilterChange('Todos')}
                  className="mt-4 px-8 py-3 bg-primary text-white rounded-full hover:bg-primary/90 transition-all shadow-lg hover:shadow-xl hover:scale-105"
                >
                  Ver todos los posts
                </button>
              </div>
            </div>
          ) : (
            <div className="mx-auto w-full max-w-7xl">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8 pb-16">
                {filteredPosts.map((post, index) => (
                  <div
                    key={post.slug}
                    onClick={() => handlePostClick(post.slug)}
                    className="transform transition-all duration-300 hover:scale-[1.02]"
                  >
                    <BlogCard
                      post={post}
                      onTagClick={handleTagClick}
                      delay={index * 100}
                    />
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        <Footer />
      </div>
    </div>
  );
};

export default Blog;
