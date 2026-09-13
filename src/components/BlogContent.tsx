import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import { getMarkdownHeadings } from '@/lib/markdownHeadings';
import { useI18n } from '@/lib/i18n';

interface BlogContentProps {
  content: string;
}

const BlogContent = ({ content }: BlogContentProps) => {
  const { t } = useI18n();
  const headings = getMarkdownHeadings(content);
  let headingIndex = 0;
  const nextHeading = () => headings[headingIndex++];

  return (
    <div className="blog-prose">
      <ReactMarkdown
        remarkPlugins={[remarkGfm]}
        components={{
          h1: ({ children }) => {
            const heading = nextHeading();
            return <h2 id={heading?.id}>{children}</h2>;
          },
          h2: ({ children }) => {
            const heading = nextHeading();
            return <h2 id={heading?.id}>{children}</h2>;
          },
          h3: ({ children }) => {
            const heading = nextHeading();
            return <h3 id={heading?.id}>{children}</h3>;
          },
          img: ({ src, alt, ...props }) => (
            <img src={src} alt={alt || t('Imagen del artículo')} loading="lazy" {...props} />
          ),
          a: ({ href, children, ...props }) => {
            const isExternal = Boolean(href && /^https?:\/\//i.test(href));
            return (
              <a href={href} target={isExternal ? '_blank' : undefined} rel={isExternal ? 'noopener noreferrer' : undefined} {...props}>
                {children}
              </a>
            );
          },
          code: ({ className, children, ...props }) =>
            className ? <code className={className} {...props}>{children}</code> : <code {...props}>{children}</code>,
        }}
      >
        {content}
      </ReactMarkdown>
    </div>
  );
};

export default BlogContent;
