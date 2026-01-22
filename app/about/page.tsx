import { getBrandConfig } from '../../src/brands/getBrandConfig';
import { buildMetadata } from '../../src/core/seo/metadata';
import { AboutPage } from '../../src/core/sections/AboutPage';

export async function generateMetadata() {
  const brand = await getBrandConfig();
  return buildMetadata(brand, 'about');
}

export default async function Page() {
  return <AboutPage />;
}
