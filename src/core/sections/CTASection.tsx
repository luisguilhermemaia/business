'use client';

import styled from 'styled-components';
import { useBrand } from '../brand/BrandProvider';
import { useI18n } from '../i18n/I18nProvider';
import { LinkButton } from '../design-system/components/Button';
import { Card, Container, Section, Stack } from '../design-system/primitives';
import { Icon } from '../icons/Icon';
import { Reveal } from '../design-system/components/Reveal';

const Title = styled.h2`
  font-size: clamp(1.9rem, 3.5vw, ${({ theme }) => theme.typography.sizes.xxl});
  line-height: ${({ theme }) => theme.typography.lineHeights?.tight || 1.2};
  margin-bottom: ${({ theme }) => theme.spacing.md}px;
  font-family: ${({ theme }) => theme.typography.fonts.heading};
  letter-spacing: -0.02em;
`;

const Text = styled.p`
  color: ${({ theme }) => theme.colors.textMuted};
  max-width: 650px;
  font-size: ${({ theme }) => theme.typography.sizes.lg};
  line-height: ${({ theme }) => theme.typography.lineHeights?.relaxed || 1.8};
  margin: 0 auto;
`;

const CTAWrap = styled(Card)`
  background: ${({ theme }) => theme.colors.surface};
  border: 1px solid ${({ theme }) => theme.colors.border};
  padding: ${({ theme }) => theme.spacing.xxl * 1.5}px;
  text-align: center;
  elevation: lg;
  border-radius: ${({ theme }) => theme.radii['2xl'] || theme.radii.xl || theme.radii.lg};
  box-shadow: ${({ theme }) => theme.shadows.md || theme.shadows.medium};

  @media (max-width: ${({ theme }) => theme.breakpoints.md}) {
    padding: ${({ theme }) => theme.spacing.xl * 1.5}px;
  }
`;

export const CTASection = () => {
  const { content } = useBrand();
  const { t } = useI18n();
  return (
    <Section>
      <Container>
        <Reveal delay={0.1}>
          <CTAWrap>
            <Stack gap="lg" align="center">
              <Title>{t('cta.title')}</Title>
              <Text>{t('cta.subtitle')}</Text>
              <Stack direction="row" gap="md" align="center" style={{ flexWrap: 'wrap', justifyContent: 'center' }}>
                <LinkButton href="/booking" size="md">
                  <Icon name="calendar" size={18} />
                  {content.hero.ctaLabel || t('actions.book')}
                </LinkButton>
                <LinkButton href="/contact" variant="secondary" size="md">
                  {t('actions.contact')}
                </LinkButton>
              </Stack>
            </Stack>
          </CTAWrap>
        </Reveal>
      </Container>
    </Section>
  );
};
