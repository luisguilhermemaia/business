'use client';

import Image from 'next/image';
import styled from 'styled-components';
import { useBrand } from '../brand/BrandProvider';
import { useI18n } from '../i18n/I18nProvider';
import { LinkButton } from '../design-system/components/Button';
import { Container, Grid, Section } from '../design-system/primitives';
import { Reveal } from '../design-system/components/Reveal';
import { hexToRgba } from '../utils/colors';

const HeroShell = styled(Section)`
  padding-top: ${({ theme }) => theme.spacing.xl}px;
  padding-bottom: ${({ theme }) => theme.spacing.xxl}px;
  background: ${({ theme }) => theme.colors.background};
  position: relative;
  overflow: hidden;
  min-height: calc(100vh - 120px);
  display: flex;
  align-items: center;

  @media (max-width: ${({ theme }) => theme.breakpoints.md}) {
    min-height: auto;
    padding-top: ${({ theme }) => theme.spacing.lg}px;
    padding-bottom: ${({ theme }) => theme.spacing.xl}px;
  }
`;

const HeroContent = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${({ theme }) => theme.spacing.lg}px;
  max-width: 640px;

  @media (max-width: ${({ theme }) => theme.breakpoints.md}) {
    max-width: 100%;
    order: 1;
  }
`;

const HeroMedia = styled.div`
  position: relative;
  display: flex;
  align-items: flex-start;
  justify-content: center;
  padding-top: ${({ theme }) => theme.spacing.md}px;

  @media (max-width: ${({ theme }) => theme.breakpoints.md}) {
    order: 0;
    padding-top: 0;
  }
`;

const Heading = styled.h1`
  font-size: clamp(2.25rem, 5.5vw + 0.5rem, 3.75rem);
  line-height: 1.2;
  margin: 0 0 ${({ theme }) => theme.spacing.xl}px 0;
  color: ${({ theme }) => theme.colors.text};
  letter-spacing: -0.02em;
  font-weight: ${({ theme }) => theme.typography.weights.bold};
  font-family: ${({ theme }) => theme.typography.fonts.heading};

  @media (max-width: ${({ theme }) => theme.breakpoints.md}) {
    font-size: clamp(1.875rem, 6vw, 2.75rem);
    margin-bottom: ${({ theme }) => theme.spacing.lg}px;
  }
`;

const Subheading = styled.p`
  font-size: ${({ theme }) => theme.typography.sizes.lg};
  color: ${({ theme }) => theme.colors.text};
  line-height: 1.7;
  margin: 0 0 ${({ theme }) => theme.spacing.xl * 1.5}px 0;
  font-weight: ${({ theme }) => theme.typography.weights.regular};

  @media (max-width: ${({ theme }) => theme.breakpoints.md}) {
    font-size: ${({ theme }) => theme.typography.sizes.md};
    margin-bottom: ${({ theme }) => theme.spacing.xl}px;
  }
`;

const CTAs = styled.div`
  display: flex;
  gap: ${({ theme }) => theme.spacing.md}px;
  flex-wrap: wrap;
  margin-top: ${({ theme }) => theme.spacing.lg}px;

  @media (max-width: ${({ theme }) => theme.breakpoints.md}) {
    flex-direction: column;
    width: 100%;
    & > a {
      width: 100%;
      min-width: 0;
    }
  }
`;

const HeroImageWrapper = styled.div`
  position: relative;
  width: 100%;
  height: 580px;
  border-radius: ${({ theme }) => theme.radii.xl || theme.radii.lg};
  overflow: hidden;
  box-shadow: ${({ theme }) => theme.shadows.lg || theme.shadows.strong};
  background: ${({ theme }) => theme.colors.surfaceMuted};

  @media (max-width: ${({ theme }) => theme.breakpoints.md}) {
    height: 380px;
    margin-bottom: ${({ theme }) => theme.spacing.lg}px;
  }
`;

const HeroImageContainer = styled.div`
  position: relative;
  width: 100%;
  height: 100%;
  z-index: 1;

  img {
    object-fit: cover;
    width: 100%;
    height: 100%;
  }
`;

const BlurredBackground = styled.div<{ $imageUrl?: string }>`
  position: absolute;
  top: -20%;
  left: -15%;
  width: 60%;
  height: 80%;
  opacity: 0.15;
  filter: blur(40px);
  transform: scale(1.2);
  z-index: 0;
  pointer-events: none;

  ${({ $imageUrl }) =>
    $imageUrl &&
    `
    background-image: url(${$imageUrl});
    background-size: cover;
    background-position: center;
  `}

  @media (max-width: ${({ theme }) => theme.breakpoints.md}) {
    display: none;
  }
`;

const PrimaryButton = styled(LinkButton)`
  background: transparent !important;
  color: ${({ theme }) => theme.colors.brownDark || theme.colors.text} !important;
  border: 1.5px solid ${({ theme }) => theme.colors.brownDark || theme.colors.text} !important;
  box-shadow: none !important;
  font-weight: ${({ theme }) => theme.typography.weights.medium} !important;
  letter-spacing: 0.01em !important;

  &:hover:not(:disabled) {
    background: ${({ theme }) =>
      hexToRgba(theme.colors.brownDark || theme.colors.text, 0.08)} !important;
    color: ${({ theme }) => theme.colors.brownDark || theme.colors.text} !important;
    border-color: ${({ theme }) => theme.colors.brownDark || theme.colors.text} !important;
    transform: translateY(-1px);
    box-shadow: 0 2px 6px rgba(0, 0, 0, 0.08) !important;
  }

  &:active:not(:disabled) {
    transform: translateY(0);
    background: ${({ theme }) =>
      hexToRgba(theme.colors.brownDark || theme.colors.text, 0.12)} !important;
  }
`;

const SecondaryButton = styled(LinkButton)`
  background: transparent !important;
  color: ${({ theme }) => theme.colors.brownMedium || '#a77e5d'} !important;
  border: 1.5px solid ${({ theme }) => theme.colors.brownMedium || '#a77e5d'} !important;
  box-shadow: none !important;
  font-weight: ${({ theme }) => theme.typography.weights.medium} !important;
  letter-spacing: 0.01em !important;

  &:hover:not(:disabled) {
    background: ${({ theme }) =>
      hexToRgba(theme.colors.brownMedium || '#a77e5d', 0.08)} !important;
    color: ${({ theme }) => theme.colors.brownMedium || '#a77e5d'} !important;
    border-color: ${({ theme }) => theme.colors.brownMedium || '#a77e5d'} !important;
    transform: translateY(-1px);
    box-shadow: 0 2px 6px rgba(0, 0, 0, 0.08) !important;
  }

  &:active:not(:disabled) {
    transform: translateY(0);
    background: ${({ theme }) =>
      hexToRgba(theme.colors.brownMedium || '#a77e5d', 0.12)} !important;
  }
`;

export const HeroSection = () => {
  const { content } = useBrand();
  const { t } = useI18n();

  return (
    <HeroShell>
      <Container width="wide">
        <Grid columns={2} min="320px" gap="lg">
          <Reveal>
            <HeroMedia>
              <HeroImageWrapper>
                {content.hero.backgroundImage && (
                  <BlurredBackground $imageUrl={content.hero.backgroundImage} />
                )}
                <HeroImageContainer>
                  <Image
                    src={
                      content.doctor.headshot ||
                      'https://images.unsplash.com/photo-1544717305-2782549b5136?w=1200&h=900&fit=crop&q=80'
                    }
                    alt={content.doctor.name}
                    fill
                    priority
                    sizes="(max-width: 768px) 100vw, 50vw"
                    style={{ objectFit: 'cover' }}
                  />
                </HeroImageContainer>
              </HeroImageWrapper>
            </HeroMedia>
          </Reveal>
          <Reveal delay={0.1}>
            <HeroContent>
              <Heading>{content.hero.headline}</Heading>
              <Subheading>{content.hero.subheadline}</Subheading>
              <CTAs>
                <PrimaryButton href="/booking" size="md" variant="primary">
                  {t('hero.ctaPresencial')}
                </PrimaryButton>
                <SecondaryButton href="/booking" size="md" variant="secondary">
                  {t('hero.ctaOnline')}
                </SecondaryButton>
              </CTAs>
            </HeroContent>
          </Reveal>
        </Grid>
      </Container>
    </HeroShell>
  );
};
