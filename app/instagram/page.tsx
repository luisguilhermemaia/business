import { notFound } from 'next/navigation';
import { getBrandConfig } from '../../src/brands/getBrandConfig';
import { buildMetadata } from '../../src/core/seo/metadata';
import { InstagramPage } from '../../src/core/sections/InstagramPage';

export async function generateMetadata() {
  const brand = await getBrandConfig();
  return buildMetadata(brand, 'instagram');
}

export default async function Page() {
  const brand = await getBrandConfig();
  if (!brand.content.instagram?.profileUrl) notFound();

  return <InstagramPage />;
}
