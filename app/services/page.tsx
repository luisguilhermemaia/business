import { getBrandConfig } from '../../src/brands/getBrandConfig';
import { buildMetadata } from '../../src/core/seo/metadata';
import { ServicesPage } from '../../src/core/sections/ServicesPage';

export async function generateMetadata() {
  const brand = await getBrandConfig();
  return buildMetadata(brand, 'services');
}

export default async function Page() {
  return <ServicesPage />;
}
