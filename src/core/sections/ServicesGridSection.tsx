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

  @media (max-width: ${({ theme }) => theme.breakpoints.md}) {
    margin-bottom: ${({ theme }) => theme.spacing.xl}px;
  }

  @media (max-width: ${({ theme }) => theme.breakpoints.sm}) {
    margin-bottom: ${({ theme }) => theme.spacing.lg}px;
  }
`;

const SectionBadge = styled.div`
  display: inline-flex;
  align-items: center;
  gap: ${({ theme }) => theme.spacing.sm}px;
  padding: ${({ theme }) => theme.spacing.sm + 2}px ${({ theme }) => theme.spacing.lg}px;
  border-radius: ${({ theme }) => theme.radii.pill};
  background: ${({ theme }) => theme.colors.tealDark ?? theme.colors.surface};
  border: 1px solid ${({ theme }) => (theme.colors.tealDark ? 'transparent' : theme.colors.border)};
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

  @media (max-width: ${({ theme }) => theme.breakpoints.sm}) {
    font-size: clamp(1.5rem, 5vw, 2rem);
    margin-bottom: ${({ theme }) => theme.spacing.sm}px;
  }
`;

const Description = styled.p`
  color: ${({ theme }) => theme.colors.textMuted};
  font-size: ${({ theme }) => theme.typography.sizes.lg};
  line-height: 1.75;

  @media (max-width: ${({ theme }) => theme.breakpoints.sm}) {
    font-size: ${({ theme }) => theme.typography.sizes.md};
  }
`;

const ServiceIcon = styled.div`
  width: 56px;
  height: 56px;
  border-radius: ${({ theme }) => theme.radii.lg};
  display: grid;
  place-items: center;
  background: ${({ theme }) => theme.colors.tealDark ?? theme.colors.surfaceMuted};
  color: ${({ theme }) => theme.colors.tealDarkContrast ?? '#FFFFFF'};
  margin: 0 auto;
  box-shadow: 0 2px 8px
    ${({ theme }) => hexToRgba(theme.colors.tealDark || theme.colors.text, 0.15)};
  transition: transform ${({ theme }) => theme.motion?.duration.normal || '250ms'}
    ${({ theme }) => theme.motion?.easing.easeOut || 'cubic-bezier(0.4, 0, 0.2, 1)'};
`;

const ServiceCard = styled.div`
  background: ${({ theme }) => theme.colors.surface};
  border-radius: ${({ theme }) => theme.radii.xl || theme.radii.lg};
  border: 1px solid ${({ theme }) => theme.colors.border};
  padding: ${({ theme }) => theme.spacing.lg}px;

  @media (max-width: ${({ theme }) => theme.breakpoints.sm}) {
    padding: ${({ theme }) => theme.spacing.lg}px;
  }
  box-shadow: ${({ theme }) => theme.shadows.sm || theme.shadows.soft};
  transition: all ${({ theme }) => theme.motion?.duration.normal || '250ms'}
    ${({ theme }) => theme.motion?.easing.easeOut || 'cubic-bezier(0.4, 0, 0.2, 1)'};
  display: flex;
  flex-direction: column;
  gap: ${({ theme }) => theme.spacing.sm}px;
  text-align: center;
  position: relative;
  overflow: hidden;

  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    height: 3px;
    background: ${({ theme }) => theme.colors.primary};
    transform: scaleX(0);
    transform-origin: left;
    transition: transform ${({ theme }) => theme.motion?.duration.normal || '250ms'}
      ${({ theme }) => theme.motion?.easing.easeOut || 'cubic-bezier(0.4, 0, 0.2, 1)'};
  }

  &:hover {
    transform: translateY(-8px) scale(1.02);
    box-shadow: ${({ theme }) => theme.shadows.lg || theme.shadows.strong};
    border-color: ${({ theme }) => hexToRgba(theme.colors.primary, 0.4)};

    &::before {
      transform: scaleX(1);
    }

    ${ServiceIcon} {
      transform: scale(1.15) rotate(5deg);
    }
  }

  @media (prefers-reduced-motion: reduce) {
    &:hover {
      transform: none;

      ${ServiceIcon} {
        transform: none;
      }
    }
  }
`;

const ServiceTitle = styled.h3`
  font-size: ${({ theme }) => theme.typography.sizes.lg};
  font-weight: ${({ theme }) => theme.typography.weights.bold};
  color: ${({ theme }) => theme.colors.text};
  margin: 0;
  margin-top: ${({ theme }) => theme.spacing.sm}px;
`;

const ServiceDescription = styled.p`
  color: ${({ theme }) => theme.colors.text};
  font-size: ${({ theme }) => theme.typography.sizes.sm};
  line-height: 1.7;
  margin: 0;
  opacity: 0.85;
`;

const CTASection = styled.div`
  text-align: center;
  margin-top: ${({ theme }) => theme.spacing.xl * 2}px;
  padding-top: ${({ theme }) => theme.spacing.xl * 2}px;
  border-top: 1px solid ${({ theme }) => theme.colors.border};

  @media (max-width: ${({ theme }) => theme.breakpoints.sm}) {
    margin-top: ${({ theme }) => theme.spacing.xl}px;
    padding-top: ${({ theme }) => theme.spacing.xl}px;
  }
`;

const CTAText = styled.p`
  color: ${({ theme }) => theme.colors.text};
  font-size: ${({ theme }) => theme.typography.sizes.lg};
  font-weight: ${({ theme }) => theme.typography.weights.medium};
  margin-bottom: ${({ theme }) => theme.spacing.lg}px;

  @media (max-width: ${({ theme }) => theme.breakpoints.sm}) {
    font-size: ${({ theme }) => theme.typography.sizes.md};
    margin-bottom: ${({ theme }) => theme.spacing.md}px;
  }
`;

const CTAButtonStack = styled(Stack)`
  @media (max-width: ${({ theme }) => theme.breakpoints.sm}) {
    flex-direction: column !important;
    width: 100%;
    gap: ${({ theme }) => theme.spacing.sm}px !important;

    a {
      width: 100%;
      min-height: 44px;
      justify-content: center;
      font-size: ${({ theme }) => theme.typography.sizes.sm};
    }
  }
`;

const PrimaryCTAButton = styled(LinkButton)`
  background: ${({ theme }) => theme.colors.tealDark || theme.colors.text} !important;
  color: ${({ theme }) => theme.colors.tealDarkContrast || '#FFFFFF'} !important;
  border: 1.5px solid ${({ theme }) => theme.colors.tealDark || theme.colors.text} !important;
  box-shadow: 0 2px 8px ${({ theme }) => hexToRgba(theme.colors.tealDark || theme.colors.text, 0.2)} !important;
  font-weight: ${({ theme }) => theme.typography.weights.semi} !important;

  &:hover:not(:disabled) {
    background: ${({ theme }) => theme.colors.tealDark || theme.colors.text} !important;
    opacity: 0.9;
    transform: translateY(-1px);
    box-shadow: 0 4px 12px
      ${({ theme }) => hexToRgba(theme.colors.tealDark || theme.colors.text, 0.3)} !important;
  }

  &:active:not(:disabled) {
    transform: translateY(0);
  }
`;

const SecondaryCTAButton = styled(LinkButton)`
  background: transparent !important;
  color: ${({ theme }) => theme.colors.tealDark || theme.colors.text} !important;
  border: 1.5px solid ${({ theme }) => theme.colors.tealDark || theme.colors.text} !important;
  box-shadow: none !important;
  font-weight: ${({ theme }) => theme.typography.weights.medium} !important;

  &:hover:not(:disabled) {
    background: ${({ theme }) =>
      hexToRgba(theme.colors.tealDark || theme.colors.text, 0.08)} !important;
    color: ${({ theme }) => theme.colors.tealDark || theme.colors.text} !important;
    border-color: ${({ theme }) => theme.colors.tealDark || theme.colors.text} !important;
    transform: translateY(-1px);
    box-shadow: 0 2px 6px
      ${({ theme }) => hexToRgba(theme.colors.tealDark || theme.colors.text, 0.15)} !important;
  }

  &:active:not(:disabled) {
    transform: translateY(0);
    background: ${({ theme }) =>
      hexToRgba(theme.colors.tealDark || theme.colors.text, 0.12)} !important;
  }
`;

export const ServicesGridSection = () => {
  const { content } = useBrand();
  const { t } = useI18n();

  return (
    <Section>
      <Container width="wide">
        <Reveal direction="up" duration={800}>
          <SectionHeader>
            <SectionBadge>{t('services.title')}</SectionBadge>
            <Title>{t('services.headline')}</Title>
            <Description>{t('services.subtitle')}</Description>
          </SectionHeader>
        </Reveal>
        <Grid min="220px" gap="lg">
          {content.services.map((service, idx) => (
            <Reveal key={service.title} delay={0.08 + idx * 0.06} direction="up" duration={750}>
              <ServiceCard>
                <ServiceIcon>
                  <Icon name={(service.iconKey as IconName) || 'stethoscope'} size={24} />
                </ServiceIcon>
                <ServiceTitle>{service.title}</ServiceTitle>
                <ServiceDescription>{service.shortDescription}</ServiceDescription>
              </ServiceCard>
            </Reveal>
          ))}
        </Grid>
        <CTASection>
          <Reveal direction="fade" duration={700} delay={0.15}>
            <CTAText>{t('services.ctaBlurb')}</CTAText>
            <CTAButtonStack
              direction="row"
              gap="md"
              style={{ justifyContent: 'center', flexWrap: 'wrap' }}
            >
              <PrimaryCTAButton href="/booking" size="md">
                Agendar Consulta Agora
              </PrimaryCTAButton>
              <SecondaryCTAButton href="/contact" size="md">
                Falar com a Clínica
              </SecondaryCTAButton>
            </CTAButtonStack>
          </Reveal>
          <CTAText
            style={{
              fontSize: '0.875rem',
              marginTop: '12px',
              opacity: 0.8,
              fontStyle: 'italic',
            }}
          >
            ⚡ Resposta rápida via WhatsApp • Primeira consulta com acolhimento especial
          </CTAText>
        </CTASection>
      </Container>
    </Section>
  );
};
