'use client';

import { ReactNode } from 'react';
import styled from 'styled-components';
import { useBrand } from '../brand/BrandProvider';
import { Header } from './Header';
import { Footer } from './Footer';
import { FloatingWhatsAppButton } from '../design-system/components/FloatingWhatsAppButton';

const Main = styled.main`
  min-height: 70vh;
`;

export const SiteLayout = ({ children }: { children: ReactNode }) => {
  const { content, defaultLocale } = useBrand();
  return (
    <>
      <Header />
      <Main>{children}</Main>
      <Footer />
      <FloatingWhatsAppButton phone={content.contact.whatsapp} message={content.hero.ctaLabel} />
    </>
  );
};
