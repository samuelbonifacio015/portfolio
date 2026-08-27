export interface MarkdownHeading {
  id: string;
  text: string;
  level: 2 | 3;
}

const headingPattern = /^(#{1,3})\s+(.+?)\s*#*\s*$/gm;

export const slugifyHeading = (value: string) =>
  value
    .replace(/[`*_~]/g, '')
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9\s-]/g, '')
    .replace(/\s+/g, '-')
    .replace(/-+/g, '-') || 'seccion';

const uniqueHeadingId = (text: string, seen: Map<string, number>) => {
  const base = slugifyHeading(text);
  const count = (seen.get(base) ?? 0) + 1;
  seen.set(base, count);
  return count === 1 ? base : `${base}-${count}`;
};

export const getMarkdownHeadings = (content: string): MarkdownHeading[] => {
  const seen = new Map<string, number>();
  const headings: MarkdownHeading[] = [];
  let match: RegExpExecArray | null;

  headingPattern.lastIndex = 0;
  while ((match = headingPattern.exec(content)) !== null) {
    const level = match[1].length;
    if (level >= 1 && level <= 3) {
      headings.push({ id: uniqueHeadingId(match[2], seen), text: match[2], level: level === 1 ? 2 : level });
    }
  }
  return headings;
};
