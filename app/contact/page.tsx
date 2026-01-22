import { getBrandConfig } from '../../src/brands/getBrandConfig';
import { buildMetadata } from '../../src/core/seo/metadata';
import { ContactPage } from '../../src/core/sections/ContactPage';

export async function generateMetadata() {
  const brand = await getBrandConfig();
  return buildMetadata(brand, 'contact');
}

export default async function Page() {
  return <ContactPage />;
}
