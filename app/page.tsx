import { getBrandConfig } from '../src/brands/getBrandConfig';
import { HomePage } from '../src/core/sections/HomePage';
import { buildMetadata } from '../src/core/seo/metadata';

export async function generateMetadata() {
  const brand = await getBrandConfig();
  return buildMetadata(brand, 'home');
}

export default async function Page() {
  return <HomePage />;
}
