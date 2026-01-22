import { getBrandConfig } from '../../src/brands/getBrandConfig';
import { buildMetadata } from '../../src/core/seo/metadata';
import { LocationPage } from '../../src/core/sections/LocationPage';

export async function generateMetadata() {
  const brand = await getBrandConfig();
  return buildMetadata(brand, 'location');
}

export default async function Page() {
  return <LocationPage />;
}
