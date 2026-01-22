import { BrandConfig } from '../core/types/brand';

const DEFAULT_BRAND = process.env.NEXT_PUBLIC_BRAND || 'karinne-azin';

export const getBrandConfig = async (brandName?: string): Promise<BrandConfig> => {
  const brand = brandName || DEFAULT_BRAND;
  try {
    const module = await import(`./${brand}/brand`);
    return (module.brandConfig || module.default) as BrandConfig;
  } catch (error) {
    console.warn(`Brand "${brand}" not found. Falling back to ${DEFAULT_BRAND}.`);
    const module = await import(`./${DEFAULT_BRAND}/brand`);
    return (module.brandConfig || module.default) as BrandConfig;
  }
};
