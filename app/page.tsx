import { getBrandConfig } from '../src/brands/getBrandConfig';
import { HomePage } from '../src/core/sections/HomePage';
import { getAllPostsMeta } from '../src/core/utils/blog';
import { buildMetadata } from '../src/core/seo/metadata';

export async function generateMetadata() {
  const brand = await getBrandConfig();
  return buildMetadata(brand, 'home');
}

export default async function Page() {
  const brand = await getBrandConfig();
  const posts = getAllPostsMeta();
  return <HomePage sections={brand.content.home.sections} posts={posts} />;
}
