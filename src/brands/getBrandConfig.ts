import { BrandConfig } from '../core/types/brand';

const DEFAULT_BRAND = process.env.NEXT_PUBLIC_BRAND || 'karinne-azin';

export const getBrandConfig = async (brandName?: string): Promise<BrandConfig> => {
  const brand = brandName || DEFAULT_BRAND;
  try {
    const brandModule = await import(`./${brand}/brand`);
    return (brandModule.brandConfig || brandModule.default) as BrandConfig;
  } catch {
    console.warn(`Brand "${brand}" not found. Falling back to ${DEFAULT_BRAND}.`);
    const fallbackModule = await import(`./${DEFAULT_BRAND}/brand`);
    return (fallbackModule.brandConfig || fallbackModule.default) as BrandConfig;
  }
};
