'use client';

import { createContext, ReactNode, useContext } from 'react';
import { BrandConfig } from '../types/brand';

const BrandContext = createContext<BrandConfig | null>(null);

export const BrandProvider = ({ brand, children }: { brand: BrandConfig; children: ReactNode }) => {
  return <BrandContext.Provider value={brand}>{children}</BrandContext.Provider>;
};

export const useBrand = () => {
  const ctx = useContext(BrandContext);
  if (!ctx) throw new Error('useBrand must be used within BrandProvider');
  return ctx;
};
