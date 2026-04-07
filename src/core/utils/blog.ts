import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';
import { compileMDX } from 'next-mdx-remote/rsc';
import { toSeoSlug } from './slug';

const postsDirectory = path.join(process.cwd(), 'content/blog');
export const BLOG_POSTS_PER_PAGE = 6;

export interface BlogFrontmatter {
  title: string;
  excerpt: string;
  date: string;
  category?: string;
  tags?: string[];
  cover?: string;
  slug?: string;
  seoTitle?: string;
  seoDescription?: string;
}

export interface BlogMeta extends Omit<BlogFrontmatter, 'slug'> {
  slug: string;
  category: string;
  categorySlug: string;
  tags: string[];
  readingTime: number;
}

export interface BlogPost extends BlogMeta {
  Content: React.ComponentType;
}

export interface BlogCategory {
  label: string;
  slug: string;
  count: number;
}

interface PaginatedPostsResult {
  items: BlogMeta[];
  currentPage: number;
  totalPages: number;
  totalItems: number;
}

const getFiles = () => {
  if (!fs.existsSync(postsDirectory)) return [];
  return fs.readdirSync(postsDirectory).filter((file) => file.endsWith('.mdx'));
};

const estimateReadingTime = (text: string) => {
  const words = text.split(/\s+/).filter(Boolean).length;
  return Math.max(1, Math.round(words / 180));
};

const normalizeTags = (rawTags?: string[]) =>
  Array.from(new Set((rawTags || []).map((tag) => tag.trim()).filter(Boolean)));

const resolveCategory = (meta: BlogFrontmatter, fallback: string) => {
  const category = meta.category?.trim() || meta.tags?.[0]?.trim() || fallback;
  return category.length ? category : fallback;
};

const normalizeSlug = (rawSlug: string | undefined, fallback: string) => {
  const normalized = toSeoSlug(rawSlug || fallback);
  return normalized || fallback;
};

const parsePostMeta = (file: string): BlogMeta => {
  const fileSlug = file.replace(/\.mdx$/, '');
  const raw = fs.readFileSync(path.join(postsDirectory, file), 'utf-8');
  const { data, content } = matter(raw);
  const meta = data as BlogFrontmatter;
  const category = resolveCategory(meta, 'Conteudos');
  return {
    ...meta,
    slug: normalizeSlug(meta.slug, fileSlug),
    category,
    categorySlug: toSeoSlug(category),
    tags: normalizeTags(meta.tags),
    readingTime: estimateReadingTime(content),
  };
};

export const getAllPostsMeta = (): BlogMeta[] => {
  const files = getFiles();
  return files.map((file) => parsePostMeta(file)).sort((a, b) => (a.date > b.date ? -1 : 1));
};

const resolveFileBySlug = (slug: string) => {
  const files = getFiles();
  return files.find((file) => {
    const fileSlug = file.replace(/\.mdx$/, '');
    const raw = fs.readFileSync(path.join(postsDirectory, file), 'utf-8');
    const { data } = matter(raw);
    const frontmatter = data as BlogFrontmatter;
    return normalizeSlug(frontmatter.slug, fileSlug) === slug;
  });
};

export const getPostBySlug = async (slug: string): Promise<BlogPost | null> => {
  const file = resolveFileBySlug(slug);
  if (!file) return null;
  const fileSlug = file.replace(/\.mdx$/, '');
  const filepath = path.join(postsDirectory, file);
  const source = fs.readFileSync(filepath, 'utf-8');
  const { content } = matter(source);
  const compiled = await compileMDX<BlogFrontmatter>({
    source,
    options: { parseFrontmatter: true },
  });
  const frontmatter = compiled.frontmatter as BlogFrontmatter;
  const readingTime = estimateReadingTime(content);
  const category = resolveCategory(frontmatter, 'Conteudos');
  const ContentComponent = () => compiled.content;
  return {
    ...frontmatter,
    slug: normalizeSlug(frontmatter.slug, fileSlug),
    category,
    categorySlug: toSeoSlug(category),
    tags: normalizeTags(frontmatter.tags),
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

export const getAllCategories = (posts: BlogMeta[] = getAllPostsMeta()): BlogCategory[] => {
  const categoriesMap = new Map<string, BlogCategory>();

  posts.forEach((post) => {
    const slug = toSeoSlug(post.category);
    if (!slug) return;
    const current = categoriesMap.get(slug);
    if (current) {
      categoriesMap.set(slug, {
        ...current,
        count: current.count + 1,
      });
      return;
    }
    categoriesMap.set(slug, {
      label: post.category,
      slug,
      count: 1,
    });
  });

  return [...categoriesMap.values()].sort((a, b) => a.label.localeCompare(b.label, 'pt-BR'));
};

export const getCategoryBySlug = (
  categorySlug: string,
  posts: BlogMeta[] = getAllPostsMeta()
): BlogCategory | null =>
  getAllCategories(posts).find((category) => category.slug === categorySlug) || null;

export const filterPosts = ({
  posts,
  query,
  categorySlug,
}: {
  posts: BlogMeta[];
  query?: string;
  categorySlug?: string | null;
}) => {
  const normalizedQuery = query?.trim().toLowerCase() || '';
  return posts.filter((post) => {
    const matchesCategory = categorySlug ? post.categorySlug === categorySlug : true;
    if (!matchesCategory) return false;
    if (!normalizedQuery) return true;
    const searchable = [post.title, post.excerpt, post.category, ...post.tags]
      .join(' ')
      .toLowerCase();
    return searchable.includes(normalizedQuery);
  });
};

export const paginatePosts = ({
  posts,
  page,
  perPage = BLOG_POSTS_PER_PAGE,
}: {
  posts: BlogMeta[];
  page?: number;
  perPage?: number;
}): PaginatedPostsResult => {
  const sanitizedPerPage = Math.max(1, perPage);
  const totalItems = posts.length;
  const totalPages = Math.max(1, Math.ceil(totalItems / sanitizedPerPage));
  const currentPage = Math.min(Math.max(page || 1, 1), totalPages);
  const startIndex = (currentPage - 1) * sanitizedPerPage;
  return {
    items: posts.slice(startIndex, startIndex + sanitizedPerPage),
    currentPage,
    totalPages,
    totalItems,
  };
};
