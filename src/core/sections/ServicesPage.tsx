'use client';

import styled from 'styled-components';
import { useBrand } from '../brand/BrandProvider';
import { useI18n } from '../i18n/I18nProvider';
import { LinkButton } from '../design-system/components/Button';
import { Container, Section, Stack } from '../design-system/primitives';
import { ServicesGridSection } from './ServicesGridSection';
import { CTASection } from './CTASection';

const Title = styled.h1`
  font-size: clamp(2rem, 4vw, ${({ theme }) => theme.typography.sizes.xxl});
  line-height: ${({ theme }) => theme.typography.lineHeights?.tight || 1.2};
  margin-bottom: ${({ theme }) => theme.spacing.md}px;
`;

const Subtitle = styled.p`
  color: ${({ theme }) => theme.colors.textMuted};
  max-width: 760px;
  font-size: ${({ theme }) => theme.typography.sizes.lg};
  line-height: ${({ theme }) => theme.typography.lineHeights?.relaxed || 1.75};
  margin-bottom: ${({ theme }) => theme.spacing.xl}px;
`;

export const ServicesPage = () => {
  const { content } = useBrand();
  const { t } = useI18n();

  return (
    <>
      <Section>
        <Container>
          <Stack gap="lg">
            <Title>{t('services.headline')}</Title>
            <Subtitle>{t('services.subtitle')}</Subtitle>
            <LinkButton href="/booking" size="md">
              {content.hero.ctaLabel || t('actions.book')}
            </LinkButton>
          </Stack>
        </Container>
      </Section>
      <ServicesGridSection />
      <CTASection />
    </>
  );
};
