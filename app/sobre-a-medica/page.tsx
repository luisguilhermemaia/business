import { getBrandConfig } from '../../src/brands/getBrandConfig';
import { buildMetadata } from '../../src/core/seo/metadata';
import { AboutDoctorProfilePage } from '../../src/core/sections/AboutDoctorProfilePage';

export async function generateMetadata() {
  const brand = await getBrandConfig();
  return buildMetadata(brand, 'sobre-a-medica');
}

export default async function SobreAMedicaPage() {
  return <AboutDoctorProfilePage />;
}
