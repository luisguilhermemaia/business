import { notFound } from 'next/navigation';
import { getBrandConfig } from '../../../src/brands/getBrandConfig';
import { buildMetadata } from '../../../src/core/seo/metadata';
import { BlogPostPage } from '../../../src/core/sections/BlogPostPage';
import { getAdjacentPosts, getAllPostsMeta, getPostBySlug } from '../../../src/core/utils/blog';

export async function generateStaticParams() {
  const posts = getAllPostsMeta();
  return posts.map((post) => ({ slug: post.slug }));
}

export async function generateMetadata({ params }: { params: { slug: string } }) {
  const brand = await getBrandConfig();
  const post = await getPostBySlug(params.slug);
  if (!post) return buildMetadata(brand, 'blog/[slug]');
  const seoTitle = post.seoTitle || post.title;
  const seoDescription = post.seoDescription || post.excerpt;
  return {
    title: `${seoTitle} | ${brand.name}`,
    description: seoDescription,
    alternates: {
      canonical: `/blog/${post.slug}`,
    },
    openGraph: {
      type: 'article',
      title: seoTitle,
      description: seoDescription,
      url: `/blog/${post.slug}`,
      publishedTime: post.date,
      tags: [post.category, ...post.tags],
      images: post.cover ? [post.cover] : undefined,
    },
  };
}

export default async function BlogPost({ params }: { params: { slug: string } }) {
  const post = await getPostBySlug(params.slug);
  if (!post) return notFound();
  const { previous, next } = getAdjacentPosts(params.slug);
  const { Content, ...postMeta } = post;
  return (
    <BlogPostPage post={postMeta} previous={previous} next={next}>
      <Content />
    </BlogPostPage>
  );
}
