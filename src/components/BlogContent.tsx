import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';

interface BlogContentProps {
  content: string;
}

const BlogContent = ({ content }: BlogContentProps) => {
  return (
    <article className="prose prose-lg prose-slate dark:prose-invert max-w-none
      prose-headings:font-bold prose-headings:tracking-tight
      prose-h1:text-4xl prose-h1:mb-6 prose-h1:mt-12 prose-h1:leading-tight
      prose-h2:text-3xl prose-h2:mb-4 prose-h2:mt-10 prose-h2:leading-snug prose-h2:border-b prose-h2:border-border prose-h2:pb-2
      prose-h3:text-2xl prose-h3:mb-3 prose-h3:mt-8
      prose-p:text-base prose-p:leading-relaxed prose-p:mb-6 prose-p:text-foreground/90
      prose-a:text-primary prose-a:no-underline prose-a:font-medium hover:prose-a:text-primary/80 hover:prose-a:underline prose-a:transition-all
      prose-strong:text-foreground prose-strong:font-semibold
      prose-code:text-primary prose-code:bg-muted prose-code:px-1.5 prose-code:py-0.5 prose-code:rounded prose-code:text-sm prose-code:font-mono prose-code:before:content-none prose-code:after:content-none
      prose-pre:bg-muted prose-pre:border prose-pre:border-border prose-pre:rounded-lg prose-pre:p-4 prose-pre:my-6
      prose-ul:my-6 prose-ul:list-disc prose-ul:pl-6 prose-ul:space-y-2
      prose-ol:my-6 prose-ol:list-decimal prose-ol:pl-6 prose-ol:space-y-2
      prose-li:text-foreground/90 prose-li:leading-relaxed prose-li:marker:text-primary
      prose-blockquote:border-l-4 prose-blockquote:border-primary/50 prose-blockquote:bg-primary/5 prose-blockquote:pl-6 prose-blockquote:pr-4 prose-blockquote:py-4 prose-blockquote:my-6 prose-blockquote:italic prose-blockquote:text-foreground/80
      prose-img:rounded-xl prose-img:shadow-xl prose-img:my-8 prose-img:w-full
      prose-hr:border-border prose-hr:my-8
      mb-[5rem]">
      <ReactMarkdown
        remarkPlugins={[remarkGfm]}
        components={{
          img: ({ src, alt, ...props }) => (
            <img
              src={src}
              alt={alt}
              className="w-full rounded-xl shadow-xl my-8"
              loading="lazy"
              {...props}
            />
          ),
          a: ({ href, children, ...props }) => (
            <a
              href={href}
              target="_blank"
              rel="noopener noreferrer"
              className="text-primary font-medium hover:text-primary/80 hover:underline transition-all"
              {...props}
            >
              {children}
            </a>
          ),
          h1: ({ children }) => (
            <h1 className="text-4xl font-bold mb-6 mt-12 leading-tight tracking-tight">
              {children}
            </h1>
          ),
          h2: ({ children }) => (
            <h2 className="text-3xl font-bold mb-4 mt-10 leading-snug tracking-tight border-b border-border pb-2">
              {children}
            </h2>
          ),
          h3: ({ children }) => (
            <h3 className="text-2xl font-bold mb-3 mt-8 tracking-tight">
              {children}
            </h3>
          ),
          p: ({ children }) => (
            <p className="text-base leading-relaxed mb-6 text-foreground/90">
              {children}
            </p>
          ),
          ul: ({ children }) => (
            <ul className="my-6 list-disc pl-6 space-y-2">
              {children}
            </ul>
          ),
          ol: ({ children }) => (
            <ol className="my-6 list-decimal pl-6 space-y-2">
              {children}
            </ol>
          ),
          li: ({ children }) => (
            <li className="text-foreground/90 leading-relaxed marker:text-primary">
              {children}
            </li>
          ),
          blockquote: ({ children }) => (
            <blockquote className="border-l-4 border-primary/50 bg-primary/5 pl-6 pr-4 py-4 my-6 italic text-foreground/80">
              {children}
            </blockquote>
          ),
          code: ({ inline, children, ...props }: any) => 
            inline ? (
              <code className="text-primary bg-muted px-1.5 py-0.5 rounded text-sm font-mono" {...props}>
                {children}
              </code>
            ) : (
              <code {...props}>{children}</code>
            ),
        }}
      >
        {content}
      </ReactMarkdown>
    </article>
  );
};

export default BlogContent;
