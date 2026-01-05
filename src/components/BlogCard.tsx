import { Calendar } from 'lucide-react';
import { cn } from '@/lib/utils';
import TechBadge from './TechBadge';
import { BlogPost } from '@/lib/blogTypes';

interface BlogCardProps {
  post: BlogPost;
  onTagClick: (tag: string) => void;
  delay?: number;
}

const BlogCard = ({ post, onTagClick, delay = 0 }: BlogCardProps) => {
  return (
    <article
      className={cn(
        "glass-card rounded-xl overflow-hidden group cursor-pointer",
        "hover:border-primary/50 hover:shadow-lg hover:shadow-primary/10",
        "hover:scale-[1.02] hover:-translate-y-1",
        "transition-all duration-300",
        "opacity-0 animate-fade-in",
        "max-w-[70%] mx-auto"
      )}
      style={{ animationDelay: `${delay}ms` }}
    >
      {post.image && (
        <div className="relative w-full aspect-video overflow-hidden bg-primary/5">
          <img
            src={post.image}
            alt={post.title}
            className="w-full h-full object-cover transition-transform duration-500 ease-out group-hover:scale-11"
            loading="lazy"
          />
        </div>
      )}

      <div className="p-4 sm:p-5 space-y-3 sm:space-y-4">
        <div className="flex items-center gap-2 flex-wrap">
          <TechBadge
            name={post.category}
            className="text-xs py-1 px-2.5 bg-gray-700 text-gray-50 border-gray-700 border dark:bg-gray-700/10 dark:text-gray-400 dark:border-gray-200/50"
          />
          <div className="flex items-center gap-1 text-xs text-muted-foreground">
            <Calendar className="h-3.5 w-3.5" />
            <time dateTime={post.date}>
              {new Date(post.date).toLocaleDateString('es-ES', {
                day: 'numeric',
                month: 'short',
                year: 'numeric'
              })}
            </time>
          </div>
        </div>

        <div className="space-y-1.5">
          <h3 className="text-lg sm:text-xl font-semibold text-foreground group-hover:text-primary transition-colors duration-300 line-clamp-2">
            {post.title}
          </h3>
          <p className="text-sm text-muted-foreground line-clamp-3 leading-relaxed">
            {post.excerpt}
          </p>
        </div>

        {post.tags.length > 0 && (
          <div className="flex flex-wrap gap-1.5 pt-1">
            {post.tags.slice(0, 4).map((tag) => (
              <button
                key={tag}
                onClick={(e) => {
                  e.stopPropagation();
                  onTagClick(tag);
                }}
                className="text-xs text-primary/80 hover:text-primary hover:bg-primary/10 px-2 py-1 rounded-md transition-all duration-200"
              >
                #{tag}
              </button>
            ))}
            {post.tags.length > 4 && (
              <span className="text-xs text-muted-foreground px-2 py-1">
                +{post.tags.length - 4}
              </span>
            )}
          </div>
        )}
      </div>
    </article>
  );
};

export default BlogCard;
