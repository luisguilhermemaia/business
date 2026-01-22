import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';
import { compileMDX } from 'next-mdx-remote/rsc';

const postsDirectory = path.join(process.cwd(), 'content/blog');

export interface BlogFrontmatter {
  title: string;
  excerpt: string;
  date: string;
  tags?: string[];
  cover?: string;
  slug: string;
}

export interface BlogMeta extends BlogFrontmatter {
  readingTime: number;
}

export interface BlogPost extends BlogMeta {
  Content: React.ComponentType;
}

const getFiles = () => {
  if (!fs.existsSync(postsDirectory)) return [];
  return fs.readdirSync(postsDirectory).filter((file) => file.endsWith('.mdx'));
};

const estimateReadingTime = (text: string) => {
  const words = text.split(/\s+/).filter(Boolean).length;
  return Math.max(1, Math.round(words / 180));
};

export const getAllPostsMeta = (): BlogMeta[] => {
  const files = getFiles();
  return files
    .map((file) => {
      const slug = file.replace(/\.mdx$/, '');
      const raw = fs.readFileSync(path.join(postsDirectory, file), 'utf-8');
      const { data, content } = matter(raw);
      const meta = data as BlogFrontmatter;
      return {
        ...meta,
        slug: meta.slug || slug,
        readingTime: estimateReadingTime(content),
      };
    })
    .sort((a, b) => (a.date > b.date ? -1 : 1));
};

export const getPostBySlug = async (slug: string): Promise<BlogPost | null> => {
  const filepath = path.join(postsDirectory, `${slug}.mdx`);
  if (!fs.existsSync(filepath)) return null;
  const source = fs.readFileSync(filepath, 'utf-8');
  const { content } = matter(source);
  const compiled = await compileMDX<BlogFrontmatter>({
    source,
    options: { parseFrontmatter: true },
  });
  const readingTime = estimateReadingTime(content);
  const ContentComponent = () => compiled.content;
  return {
    ...(compiled.frontmatter as BlogFrontmatter),
    slug,
    readingTime,
    Content: ContentComponent,
  };
};

export const getAdjacentPosts = (slug: string) => {
  const posts = getAllPostsMeta();
  const index = posts.findIndex((p) => p.slug === slug);
  return {
    previous: index < posts.length - 1 ? posts[index + 1] : null,
    next: index > 0 ? posts[index - 1] : null,
  };
};
