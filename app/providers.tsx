'use client';

import { ReactNode } from 'react';
import { ThemeProvider } from 'styled-components';
import { BrandConfig } from '../src/core/types/brand';
import { I18nProvider } from '../src/core/i18n/I18nProvider';
import { BrandProvider } from '../src/core/brand/BrandProvider';
import { GlobalStyle } from '../src/core/design-system/global';

export const Providers = ({ brand, children }: { brand: BrandConfig; children: ReactNode }) => {
  return (
    <ThemeProvider theme={brand.theme}>
      <GlobalStyle />
      <BrandProvider brand={brand}>
        <I18nProvider
          translations={brand.translations}
          defaultLocale={brand.defaultLocale}
          locales={brand.locales}
        >
          {children}
        </I18nProvider>
      </BrandProvider>
    </ThemeProvider>
  );
};
