import { getBrandConfig } from '../../src/brands/getBrandConfig';
import { buildMetadata } from '../../src/core/seo/metadata';
import { ContactBookingHubPage } from '../../src/core/sections/ContactBookingHubPage';

export async function generateMetadata() {
  const brand = await getBrandConfig();
  return buildMetadata(brand, 'atendimento');
}

export default async function AtendimentoPage() {
  return <ContactBookingHubPage />;
}
