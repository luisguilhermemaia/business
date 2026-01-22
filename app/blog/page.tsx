import { getBrandConfig } from '../../src/brands/getBrandConfig';
import { buildMetadata } from '../../src/core/seo/metadata';
import { BlogIndexPage } from '../../src/core/sections/BlogIndexPage';
import { getAllPostsMeta } from '../../src/core/utils/blog';

export async function generateMetadata() {
  const brand = await getBrandConfig();
  return buildMetadata(brand, 'blog');
}

export default async function BlogPage() {
  const brand = await getBrandConfig();
  const posts = getAllPostsMeta();
  return (
    <BlogIndexPage
      posts={posts}
      introTitle={brand.content.blog.intro.title}
      introDescription={brand.content.blog.intro.description}
    />
  );
}
