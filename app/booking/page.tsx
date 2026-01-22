import { getBrandConfig } from '../../src/brands/getBrandConfig';
import { buildMetadata } from '../../src/core/seo/metadata';
import { BookingPage } from '../../src/core/sections/BookingPage';

export async function generateMetadata() {
  const brand = await getBrandConfig();
  return buildMetadata(brand, 'booking');
}

export default async function Page() {
  return <BookingPage />;
}
