import { getBrandConfig } from '../../src/brands/getBrandConfig';
import { buildMetadata } from '../../src/core/seo/metadata';
import { ContactShowcasePage } from '../../src/core/sections/ContactShowcasePage';

export async function generateMetadata() {
  const brand = await getBrandConfig();
  return buildMetadata(brand, 'contato');
}

export default async function ContatoPage() {
  return <ContactShowcasePage />;
}
