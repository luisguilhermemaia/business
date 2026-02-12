'use client';

import { useBrand } from '../brand/BrandProvider';
import { InstagramSection } from './InstagramSection';

/**
 * Dedicated Instagram page — renders only the Instagram section.
 * Used at /instagram when the brand has instagram configured.
 */
export const InstagramPage = () => {
  const { content } = useBrand();
  if (!content.instagram?.profileUrl) return null;

  return <InstagramSection />;
};
