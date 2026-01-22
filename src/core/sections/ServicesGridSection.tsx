'use client';

import styled from 'styled-components';
import { hexToRgba } from '../utils/colors';
import { useBrand } from '../brand/BrandProvider';
import { useI18n } from '../i18n/I18nProvider';
import { LinkButton } from '../design-system/components/Button';
import { Container, Grid, Section, Stack } from '../design-system/primitives';
import { Icon, IconName } from '../icons/Icon';
import { Reveal } from '../design-system/components/Reveal';

const SectionHeader = styled.div`
  text-align: center;
  margin-bottom: ${({ theme }) => theme.spacing.xl * 2}px;
  max-width: 720px;
  margin-left: auto;
  margin-right: auto;
`;

const SectionBadge = styled.div`
  display: inline-flex;
  align-items: center;
  gap: ${({ theme }) => theme.spacing.sm}px;
  padding: ${({ theme }) => theme.spacing.sm + 2}px ${({ theme }) => theme.spacing.lg}px;
  border-radius: ${({ theme }) => theme.radii.pill};
  background: ${({ theme }) =>
    theme.colors.tealDark ?? theme.colors.surface};
  border: 1px solid
    ${({ theme }) => (theme.colors.tealDark ? 'transparent' : theme.colors.border)};
  color: ${({ theme }) =>
    theme.colors.tealDark ? theme.colors.tealDarkContrast : theme.colors.primary};
  font-size: ${({ theme }) => theme.typography.sizes.xs};
  font-weight: ${({ theme }) => theme.typography.weights.bold};
  letter-spacing: 0.1em;
  text-transform: uppercase;
  margin-bottom: ${({ theme }) => theme.spacing.lg}px;
`;

const Title = styled.h2`
  font-size: clamp(1.9rem, 3.6vw, 2.8rem);
  line-height: 1.2;
  margin-bottom: ${({ theme }) => theme.spacing.md}px;
  color: ${({ theme }) => theme.colors.text};
  font-family: ${({ theme }) => theme.typography.fonts.heading};
  font-weight: ${({ theme }) => theme.typography.weights.bold};
  letter-spacing: -0.02em;
`;

const Description = styled.p`
  color: ${({ theme }) => theme.colors.textMuted};
  font-size: ${({ theme }) => theme.typography.sizes.lg};
  line-height: 1.75;
`;

const ServiceCard = styled.div`
  background: ${({ theme }) => theme.colors.surface};
  border-radius: ${({ theme }) => theme.radii.xl || theme.radii.lg};
  border: 1px solid ${({ theme }) => theme.colors.border};
  padding: ${({ theme }) => theme.spacing.lg}px ${({ theme }) => theme.spacing.lg}px;
  box-shadow: ${({ theme }) => theme.shadows.sm || theme.shadows.soft};
  transition: all ${({ theme }) => theme.motion?.duration.normal || '250ms'}
    ${({ theme }) => theme.motion?.easing.ease || 'ease'};
  display: flex;
  flex-direction: column;
  gap: ${({ theme }) => theme.spacing.sm}px;
  text-align: center;

  &:hover {
    transform: translateY(-4px);
    box-shadow: ${({ theme }) => theme.shadows.md || theme.shadows.medium};
    border-color: ${({ theme }) => hexToRgba(theme.colors.primary, 0.35)};
  }

  @media (prefers-reduced-motion: reduce) {
    &:hover {
      transform: none;
    }
  }
`;

const ServiceIcon = styled.div`
  width: 48px;
  height: 48px;
  border-radius: ${({ theme }) => theme.radii.lg};
  display: grid;
  place-items: center;
  background: ${({ theme }) =>
    theme.colors.tealDark ?? theme.colors.surfaceMuted};
  color: ${({ theme }) => theme.colors.primary};
  margin: 0 auto;
`;

const ServiceTitle = styled.h3`
  font-size: ${({ theme }) => theme.typography.sizes.lg};
  font-weight: ${({ theme }) => theme.typography.weights.semi};
  color: ${({ theme }) => theme.colors.text};
  margin: 0;
`;

const ServiceDescription = styled.p`
  color: ${({ theme }) => theme.colors.textMuted};
  font-size: ${({ theme }) => theme.typography.sizes.sm};
  line-height: 1.6;
  margin: 0;
`;

const CTASection = styled.div`
  text-align: center;
  margin-top: ${({ theme }) => theme.spacing.xl * 2}px;
  padding-top: ${({ theme }) => theme.spacing.xl * 2}px;
  border-top: 1px solid ${({ theme }) => theme.colors.border};
`;

const CTAText = styled.p`
  color: ${({ theme }) => theme.colors.textMuted};
  font-size: ${({ theme }) => theme.typography.sizes.md};
  margin-bottom: ${({ theme }) => theme.spacing.lg}px;
`;

export const ServicesGridSection = () => {
  const { content } = useBrand();
  const { t } = useI18n();

  return (
    <Section background="muted">
      <Container width="wide">
        <SectionHeader>
          <SectionBadge>{t('services.title')}</SectionBadge>
          <Title>{t('services.headline')}</Title>
          <Description>{t('services.subtitle')}</Description>
        </SectionHeader>
        <Grid min="220px" gap="lg">
          {content.services.map((service, idx) => (
            <Reveal key={service.title} delay={0.05 + idx * 0.04}>
              <ServiceCard>
                <ServiceIcon>
                  <Icon name={(service.iconKey as IconName) || 'stethoscope'} size={22} />
                </ServiceIcon>
                <ServiceTitle>{service.title}</ServiceTitle>
                <ServiceDescription>{service.shortDescription}</ServiceDescription>
              </ServiceCard>
            </Reveal>
          ))}
        </Grid>
        <CTASection>
          <CTAText>{t('services.ctaBlurb')}</CTAText>
          <Stack direction="row" gap="md" style={{ justifyContent: 'center', flexWrap: 'wrap' }}>
            <LinkButton href="/booking" size="md">
              {t('actions.book')}
            </LinkButton>
            <LinkButton href="/contact" variant="secondary" size="md">
              {t('actions.contact')}
            </LinkButton>
          </Stack>
        </CTASection>
      </Container>
    </Section>
  );
};
