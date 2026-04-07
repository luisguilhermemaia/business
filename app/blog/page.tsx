import { getBrandConfig } from '../../src/brands/getBrandConfig';
import { buildMetadata } from '../../src/core/seo/metadata';
import { BlogIndexPage } from '../../src/core/sections/BlogIndexPage';
import { getAllCategories, getAllPostsMeta } from '../../src/core/utils/blog';

export async function generateMetadata() {
  const brand = await getBrandConfig();
  return buildMetadata(brand, 'blog');
}

export default async function BlogPage() {
  const brand = await getBrandConfig();
  const posts = getAllPostsMeta();
  const categories = getAllCategories(posts);

  return (
    <BlogIndexPage
      posts={posts}
      categories={categories}
      introTitle={brand.content.blog.intro.title}
      introDescription={brand.content.blog.intro.description}
      basePath="/blog"
      showFeaturedLatest
    />
  );
}
