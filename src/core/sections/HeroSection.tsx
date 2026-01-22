'use client';

import Image from 'next/image';
import styled from 'styled-components';
import { useBrand } from '../brand/BrandProvider';
import { useI18n } from '../i18n/I18nProvider';
import { LinkButton } from '../design-system/components/Button';
import { Container, Section } from '../design-system/primitives';
import { Reveal } from '../design-system/components/Reveal';
import { hexToRgba } from '../utils/colors';

const HeroShell = styled(Section)`
  padding: 0;
  background: linear-gradient(
    180deg,
    ${({ theme }) => theme.colors.background} 0%,
    ${({ theme }) => theme.colors.backgroundAlt || theme.colors.background} 100%
  );
  position: relative;
  overflow: hidden;
  min-height: calc(100vh - 120px);
  display: flex;
  flex-direction: column;

  @media (min-width: ${({ theme }) => theme.breakpoints.lg}) {
    flex-direction: row;
    min-height: auto;
    height: auto;
    max-height: 85vh;
  }

  @media (max-width: ${({ theme }) => theme.breakpoints.md}) {
    min-height: auto;
  }
`;

const HeroImageSection = styled.div`
  position: relative;
  width: 100%;
  height: 65vh;
  min-height: 500px;
  overflow: hidden;
  z-index: 1;
  background: radial-gradient(
    ellipse at 20% 30%,
    ${({ theme }) => hexToRgba(theme.colors.background || '#FBF8ED', 0.4)} 0%,
    transparent 50%
  ),
  radial-gradient(
    ellipse at 80% 70%,
    ${({ theme }) => hexToRgba(theme.colors.backgroundAlt || '#F5F0E0', 0.3)} 0%,
    transparent 60%
  ),
  linear-gradient(
    135deg,
    ${({ theme }) => theme.colors.background || '#FBF8ED'} 0%,
    ${({ theme }) => theme.colors.backgroundAlt || '#F5F0E0'} 100%
  );

  @media (min-width: ${({ theme }) => theme.breakpoints.lg}) {
    width: 50%;
    height: auto;
    min-height: 600px;
    max-height: 85vh;
    background: radial-gradient(
      ellipse at 15% 25%,
      ${({ theme }) => hexToRgba(theme.colors.background || '#FBF8ED', 0.5)} 0%,
      transparent 45%
    ),
    radial-gradient(
      ellipse at 85% 75%,
      ${({ theme }) => hexToRgba(theme.colors.backgroundAlt || '#F5F0E0', 0.4)} 0%,
      transparent 55%
    ),
    linear-gradient(
      135deg,
      ${({ theme }) => theme.colors.background || '#FBF8ED'} 0%,
      ${({ theme }) => hexToRgba(theme.colors.backgroundAlt || '#F5F0E0', 0.8)} 50%,
      ${({ theme }) => theme.colors.backgroundAlt || '#F5F0E0'} 100%
    );
  }

  @media (max-width: ${({ theme }) => theme.breakpoints.md}) {
    height: 50vh;
    min-height: 400px;
  }
`;

const HeroImageContainer = styled.div`
  position: relative;
  width: 100%;
  height: 100%;

  img {
    object-fit: cover;
    object-position: center top;
    width: 100%;
    height: 100%;
  }

  @media (min-width: ${({ theme }) => theme.breakpoints.lg}) {
    &::after {
      content: '';
      position: absolute;
      inset: 0;
      background: radial-gradient(
        ellipse at 30% 40%,
        transparent 0%,
        ${({ theme }) => hexToRgba(theme.colors.background || '#FBF8ED', 0.15)} 40%,
        transparent 70%
      );
      pointer-events: none;
      z-index: 1;
    }
  }
`;

const DecorativeElements = styled.div`
  position: absolute;
  inset: 0;
  z-index: 2;
  pointer-events: none;
  overflow: hidden;
`;

const BrainOutline = styled.svg`
  position: absolute;
  left: 8%;
  top: 15%;
  width: 200px;
  height: 200px;
  opacity: 0.08;
  stroke: ${({ theme }) => theme.colors.brownDark || theme.colors.text};
  fill: none;
  stroke-width: 1.5;

  @media (min-width: ${({ theme }) => theme.breakpoints.lg}) {
    left: -8%;
    top: 15%;
    width: 320px;
    height: 320px;
    opacity: 0.12;
    stroke: ${({ theme }) => theme.colors.brownMedium || '#a77e5d'};
    stroke-width: 2;
    filter: blur(0.5px);
  }

  @media (max-width: ${({ theme }) => theme.breakpoints.md}) {
    width: 120px;
    height: 120px;
    left: 5%;
    top: 10%;
  }
`;

const HandsOutline = styled.svg`
  position: absolute;
  right: 10%;
  top: 20%;
  width: 180px;
  height: 180px;
  opacity: 0.08;
  stroke: ${({ theme }) => theme.colors.brownDark || theme.colors.text};
  fill: none;
  stroke-width: 1.5;

  @media (min-width: ${({ theme }) => theme.breakpoints.lg}) {
    display: none;
  }

  @media (max-width: ${({ theme }) => theme.breakpoints.md}) {
    width: 100px;
    height: 100px;
    right: 5%;
    top: 15%;
  }
`;

const ContentOverlay = styled.div`
  position: relative;
  width: 100%;
  padding: ${({ theme }) => theme.spacing.xxl * 1.5}px 0 ${({ theme }) => theme.spacing.xxl}px;
  background: linear-gradient(
    180deg,
    transparent 0%,
    ${({ theme }) => hexToRgba(theme.colors.backgroundAlt || theme.colors.background, 0.3)} 20%,
    ${({ theme }) => theme.colors.backgroundAlt || theme.colors.background} 40%
  );
  z-index: 3;
  margin-top: -120px;
  display: flex;
  align-items: center;

  @media (min-width: ${({ theme }) => theme.breakpoints.lg}) {
    width: 50%;
    margin-top: 0;
    padding: ${({ theme }) => theme.spacing.xxl * 1.5}px ${({ theme }) => theme.spacing.xxl * 2}px ${({ theme }) => theme.spacing.xxl * 1.5}px;
    background: radial-gradient(
      ellipse at 0% 50%,
      ${({ theme }) => hexToRgba(theme.colors.background || '#FBF8ED', 0.3)} 0%,
      transparent 40%
    ),
    linear-gradient(
      90deg,
      ${({ theme }) => theme.colors.background || '#FBF8ED'} 0%,
      ${({ theme }) => theme.colors.backgroundAlt || '#F5F0E0'} 100%
    );
    position: relative;
    align-items: flex-start;
    justify-content: flex-start;
    height: auto;
    max-height: 85vh;
    
    &::before {
      content: '';
      position: absolute;
      left: 0;
      top: 0;
      bottom: 0;
      width: 1px;
      background: linear-gradient(
        180deg,
        transparent 0%,
        ${({ theme }) => hexToRgba(theme.colors.border || '#C4B5A5', 0.2)} 20%,
        ${({ theme }) => hexToRgba(theme.colors.border || '#C4B5A5', 0.2)} 80%,
        transparent 100%
      );
    }
  }

  @media (max-width: ${({ theme }) => theme.breakpoints.md}) {
    padding: ${({ theme }) => theme.spacing.xl * 1.5}px ${({ theme }) => theme.spacing.lg}px ${({ theme }) => theme.spacing.xl}px;
    margin-top: -80px;
  }
`;

const ContentWrapper = styled.div`
  position: relative;
  z-index: 4;
  width: 100%;
  max-width: 100%;

  @media (min-width: ${({ theme }) => theme.breakpoints.lg}) {
    max-width: 580px;
    margin: 0;
    padding: 0;
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
    min-height: auto;
    padding-top: ${({ theme }) => theme.spacing.xl}px;
  }

  @media (max-width: ${({ theme }) => theme.breakpoints.md}) {
    padding: 0 ${({ theme }) => theme.spacing.lg}px;
  }
`;

const Heading = styled.h1`
  font-size: clamp(2rem, 5vw + 0.5rem, 3.5rem);
  line-height: 1.2;
  margin: 0 0 ${({ theme }) => theme.spacing.lg}px 0;
  color: ${({ theme }) => theme.colors.brownMedium || theme.colors.text};
  letter-spacing: -0.02em;
  font-weight: ${({ theme }) => theme.typography.weights.bold};
  font-family: ${({ theme }) => theme.typography.fonts.heading};
  max-width: 100%;

  strong {
    font-weight: ${({ theme }) => theme.typography.weights.bold};
  }

  @media (min-width: ${({ theme }) => theme.breakpoints.lg}) {
    font-size: clamp(2.5rem, 3.5vw + 0.5rem, 3.25rem);
    margin-bottom: ${({ theme }) => theme.spacing.lg}px;
    margin-top: 0;
    line-height: 1.15;
    letter-spacing: -0.03em;
  }

  @media (max-width: ${({ theme }) => theme.breakpoints.md}) {
    font-size: clamp(1.75rem, 6vw, 2.5rem);
    margin-bottom: ${({ theme }) => theme.spacing.md}px;
  }
`;

const Subheading = styled.p`
  font-size: ${({ theme }) => theme.typography.sizes.lg};
  color: ${({ theme }) => theme.colors.brownMedium || theme.colors.text};
  line-height: 1.7;
  margin: 0 0 ${({ theme }) => theme.spacing.xl * 1.5}px 0;
  font-weight: ${({ theme }) => theme.typography.weights.regular};
  max-width: 100%;

  @media (min-width: ${({ theme }) => theme.breakpoints.lg}) {
    font-size: ${({ theme }) => theme.typography.sizes.xl};
    margin-bottom: ${({ theme }) => theme.spacing.xl * 1.5}px;
    line-height: 1.75;
    max-width: 95%;
  }

  @media (max-width: ${({ theme }) => theme.breakpoints.md}) {
    font-size: ${({ theme }) => theme.typography.sizes.md};
    margin-bottom: ${({ theme }) => theme.spacing.lg}px;
  }
`;

const CTAs = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${({ theme }) => theme.spacing.md}px;
  max-width: 400px;

  @media (min-width: ${({ theme }) => theme.breakpoints.lg}) {
    flex-direction: row;
    gap: ${({ theme }) => theme.spacing.lg}px;
    max-width: 100%;
    margin-top: 0;
    & > a {
      flex: 1;
      min-width: 0;
      padding: ${({ theme }) => theme.spacing.md + 4}px ${({ theme }) => theme.spacing.xl}px !important;
      font-size: ${({ theme }) => theme.typography.sizes.md};
    }
  }

  @media (max-width: ${({ theme }) => theme.breakpoints.md}) {
    max-width: 100%;
    & > a {
      width: 100%;
    }
  }
`;

const PrimaryButton = styled(LinkButton)`
  background: ${({ theme }) => theme.colors.brownDark || theme.colors.text} !important;
  color: ${({ theme }) => theme.colors.background || '#fff'} !important;
  border: none !important;
  box-shadow: 0 4px 12px ${({ theme }) =>
    hexToRgba(theme.colors.brownDark || theme.colors.text, 0.2)} !important;
  font-weight: ${({ theme }) => theme.typography.weights.medium} !important;
  letter-spacing: 0.01em !important;
  border-radius: ${({ theme }) => theme.radii.lg || '12px'} !important;
  padding: ${({ theme }) => theme.spacing.md}px ${({ theme }) => theme.spacing.xl}px !important;
  transition: all 0.3s ease !important;

  &:hover:not(:disabled) {
    background: ${({ theme }) =>
      hexToRgba(theme.colors.brownDark || theme.colors.text, 0.9)} !important;
    transform: translateY(-2px);
    box-shadow: 0 6px 16px ${({ theme }) =>
      hexToRgba(theme.colors.brownDark || theme.colors.text, 0.3)} !important;
  }

  &:active:not(:disabled) {
    transform: translateY(0);
  }
`;

const SecondaryButton = styled(LinkButton)`
  background: ${({ theme }) => theme.colors.brownMedium || '#a77e5d'} !important;
  color: ${({ theme }) => theme.colors.background || '#fff'} !important;
  border: none !important;
  box-shadow: 0 4px 12px ${({ theme }) =>
    hexToRgba(theme.colors.brownMedium || '#a77e5d', 0.2)} !important;
  font-weight: ${({ theme }) => theme.typography.weights.medium} !important;
  letter-spacing: 0.01em !important;
  border-radius: ${({ theme }) => theme.radii.lg || '12px'} !important;
  padding: ${({ theme }) => theme.spacing.md}px ${({ theme }) => theme.spacing.xl}px !important;
  transition: all 0.3s ease !important;

  &:hover:not(:disabled) {
    background: ${({ theme }) =>
      hexToRgba(theme.colors.brownMedium || '#a77e5d', 0.9)} !important;
    transform: translateY(-2px);
    box-shadow: 0 6px 16px ${({ theme }) =>
      hexToRgba(theme.colors.brownMedium || '#a77e5d', 0.3)} !important;
  }

  &:active:not(:disabled) {
    transform: translateY(0);
  }
`;

const GradientOverlay = styled.div`
  position: absolute;
  bottom: 0;
  left: 0;
  right: 0;
  height: 200px;
  background: linear-gradient(
    180deg,
    transparent 0%,
    ${({ theme }) => hexToRgba(theme.colors.backgroundAlt || theme.colors.background, 0.6)} 50%,
    ${({ theme }) => theme.colors.backgroundAlt || theme.colors.background} 100%
  );
  z-index: 2;
  pointer-events: none;

  @media (min-width: ${({ theme }) => theme.breakpoints.lg}) {
    display: none;
  }
`;

export const HeroSection = () => {
  const { content } = useBrand();
  const { t } = useI18n();

  return (
    <HeroShell>
      <HeroImageSection>
        <HeroImageContainer>
          <Image
            src={
              content.doctor.headshot ||
              'https://images.unsplash.com/photo-1544717305-2782549b5136?w=1200&h=900&fit=crop&q=80'
            }
            alt={content.doctor.name}
            fill
            priority
            sizes="100vw"
            style={{ objectFit: 'cover', objectPosition: 'center top' }}
          />
        </HeroImageContainer>
        <GradientOverlay />
      </HeroImageSection>
      <ContentOverlay>
        <ContentWrapper>
          <Reveal direction="up" duration={1000} delay={0.2}>
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
          </Reveal>
        </ContentWrapper>
      </ContentOverlay>
    </HeroShell>
  );
};
