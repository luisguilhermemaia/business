'use client';

import styled from 'styled-components';
import { useI18n } from '../i18n/I18nProvider';
import { Container, Section, Stack } from '../design-system/primitives';
import { LocationSection } from './LocationSection';
import { CTASection } from './CTASection';

const Title = styled.h1`
  font-size: clamp(2rem, 4vw, ${({ theme }) => theme.typography.sizes.xxl});
  line-height: ${({ theme }) => theme.typography.lineHeights?.tight || 1.2};
  margin-bottom: ${({ theme }) => theme.spacing.md}px;
`;

const Subtitle = styled.p`
  color: ${({ theme }) => theme.colors.textMuted};
  max-width: 720px;
  line-height: ${({ theme }) => theme.typography.lineHeights?.relaxed || 1.75};
  margin-bottom: ${({ theme }) => theme.spacing.xl}px;
`;

export const LocationPage = () => {
  const { t } = useI18n();
  return (
    <>
      <Section>
        <Container>
          <Stack gap="lg">
            <Title>{t('location.headline')}</Title>
            <Subtitle>{t('location.description')}</Subtitle>
          </Stack>
        </Container>
      </Section>
      <LocationSection />
      <CTASection />
    </>
  );
};
