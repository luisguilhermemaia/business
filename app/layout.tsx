import type { Metadata } from 'next';
import type { ReactNode } from 'react';
import { Manrope, Playfair_Display } from 'next/font/google';
import StyledComponentsRegistry from '../src/core/utils/styled-registry';
import { Providers } from './providers';
import { getBrandConfig } from '../src/brands/getBrandConfig';
import { SiteLayout } from '../src/core/layout/SiteLayout';
import { buildMetadata } from '../src/core/seo/metadata';

const sans = Manrope({
  subsets: ['latin'],
  variable: '--font-sans',
  display: 'swap'
});

const serif = Playfair_Display({
  subsets: ['latin'],
  variable: '--font-serif',
  display: 'swap'
});

export async function generateMetadata(): Promise<Metadata> {
  const brand = await getBrandConfig();
  return buildMetadata(brand, 'default');
}

export default async function RootLayout({ children }: { children: ReactNode }) {
  const brand = await getBrandConfig();
  return (
    <html lang={brand.defaultLocale} className={`${sans.variable} ${serif.variable}`}>
      <body>
        <StyledComponentsRegistry>
          <Providers brand={brand}>
            <SiteLayout>{children}</SiteLayout>
          </Providers>
        </StyledComponentsRegistry>
      </body>
    </html>
  );
}
