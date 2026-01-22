import { Metadata } from 'next';
import { BrandConfig } from '../types/brand';

export const buildMetadata = (brand: BrandConfig, routeKey: string): Metadata => {
  const meta = brand.content.pagesMeta[routeKey] ?? brand.content.pagesMeta['default'] ?? {};
  const title = meta.title ? `${meta.title} | ${brand.name}` : brand.name;
  const description = meta.description ?? '';
  return {
    title,
    description,
    openGraph: {
      title,
      description,
      images: brand.content.openGraph?.image ? [brand.content.openGraph.image] : undefined
    }
  };
};
