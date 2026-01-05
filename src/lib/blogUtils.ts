import { BlogPost } from './blogTypes';

// Import all markdown files from the blog directory

const postsModules = import.meta.glob('/blog/*.md', { as: 'raw', eager: true });

export async function getAllPosts(): Promise<BlogPost[]> {
  const posts: BlogPost[] = [];

  for (const path in postsModules) {
    const content = postsModules[path] as string;
    const slug = path.replace('/blog/', '').replace('.md', '');
    const post = parseMarkdownPost(content, slug);
    if (post) {
      posts.push(post);
    }
  }

  return posts.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
}

export async function getPostBySlug(slug: string): Promise<BlogPost | null> {
  const path = `/blog/${slug}.md`;
  const content = postsModules[path] as string;

  if (!content) return null;

  return parseMarkdownPost(content, slug);
}

export function getCategories(): string[] {
  return ['Todos', 'Reflexiones'];
}

export function getUniqueTags(): string[] {
  const tags = new Set<string>();
  for (const path in postsModules) {
    const content = postsModules[path] as string;
    const match = content.match(/tags:\s*\[(.*?)\]/s);
    if (match) {
      const tagsArray = match[1].split(',').map((t: string) => t.trim().replace(/['"]/g, ''));
      tagsArray.forEach(tag => tags.add(tag));
    }
  }
  return Array.from(tags);
}

export function getPostsByCategory(category: string): Promise<BlogPost[]> {
  if (category === 'Todos') {
    return getAllPosts();
  }

  return getAllPosts().then(posts =>
    posts.filter(post => post.category === category)
  );
}

export function getPostsByTag(tag: string): Promise<BlogPost[]> {
  return getAllPosts().then(posts =>
    posts.filter(post => post.tags.includes(tag))
  );
}

function parseMarkdownPost(content: string, slug: string): BlogPost | null {
  const frontmatterMatch = content.match(/^---\s*([\s\S]*?)\s*---/);


  const frontmatterText = frontmatterMatch[1];
  const body = content.replace(frontmatterMatch[0], '');

  const frontmatter: Record<string, any> = {};
  const lines = frontmatterText.split('\n');

  for (const line of lines) {
    const cleanLine = line.trim(); 
    const match = cleanLine.match(/^(\w+):\s*(.*)$/);
    if (match) {
      const [, key, value] = match;
      let parsedValue: any = value.trim();

      if (key === 'tags') {
        parsedValue = parsedValue
          .replace(/[\[\]]/g, '')
          .split(',')
          .map((t: string) => t.trim().replace(/['"]/g, ''));
      } else if (key === 'readTime') {
        parsedValue = parsedValue;
      } else {
        parsedValue = parsedValue.replace(/^["']|["']$/g, '');
      }

      frontmatter[key] = parsedValue;
    }
  }

  const finalPost = {
    slug,
    title: frontmatter.title || 'Sin título',
    date: frontmatter.date || new Date().toISOString().split('T')[0],
    category: frontmatter.category || 'General',
    excerpt: frontmatter.excerpt || '',
    readTime: frontmatter.readTime || '5 min',
    image: frontmatter.image || '',
    tags: frontmatter.tags || [],
    content: body,
  };

  return finalPost;
}
