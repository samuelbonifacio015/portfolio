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
    <div className="min-h-screen bg-background text-foreground">
      <div className="mx-auto transition-all duration-300 max-w-[75%] px-4 py-20 md:px-6 md:max-w-[100%] md:py-20 lg:px-8 lg:py-24">
        <Navbar isMobile={isMobile} />

        <div
          ref={sectionRef}
          className="mt-12 sm:mt-16 md:mt-20"
        >
          <BlogHeader
            currentFilter={currentFilter}
            onFilterChange={handleFilterChange}
          />

          {filteredPosts.length === 0 ? (
            <div className="text-center py-20">
              <p className="text-muted-foreground text-lg">
                No se encontraron posts con este filtro.
              </p>
              <button
                onClick={() => handleFilterChange('Todos')}
                className="mt-4 px-6 py-2 bg-primary text-white rounded-lg hover:bg-primary/90 transition-all"
              >
                Ver todos los posts
              </button>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 lg:gap-8 pb-12">
              {filteredPosts.map((post, index) => (
                <div
                  key={post.slug}
                  onClick={() => handlePostClick(post.slug)}
                >
                  <BlogCard
                    post={post}
                    onTagClick={handleTagClick}
                    delay={index * 100}
                  />
                </div>
              ))}
            </div>
          )}
        </div>

        <Footer />
      </div>
    </div>
  );
};

export default Blog;
