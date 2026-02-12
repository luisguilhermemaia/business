'use client';

import Image from 'next/image';
import styled from 'styled-components';
import { useBrand } from '../brand/BrandProvider';
import { useI18n } from '../i18n/I18nProvider';
import { LinkButton } from '../design-system/components/Button';
import { Section } from '../design-system/primitives';
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
  background:
    radial-gradient(
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
    width: 55%;
    height: auto;
    min-height: 600px;
    max-height: 85vh;
    background:
      radial-gradient(
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

  @media (min-width: ${({ theme }) => theme.breakpoints.xl}) {
    width: 50%;
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
  display: flex;
  align-items: center;
  justify-content: center;

  img {
    object-fit: cover;
    object-position: center top;
    width: 100%;
    height: 100%;
  }

  @media (min-width: ${({ theme }) => theme.breakpoints.lg}) {
    padding: ${({ theme }) => theme.spacing.xxl}px;
    padding-right: ${({ theme }) => theme.spacing.xxl * 2}px;

    img {
      object-fit: contain;
      object-position: center center;
      width: auto;
      max-width: 100%;
      height: 100%;
    }

    &::after {
      content: '';
      position: absolute;
      inset: 0;
      background: linear-gradient(
        90deg,
        transparent 0%,
        transparent 50%,
        ${({ theme }) => hexToRgba(theme.colors.background || '#FBF8ED', 0.3)} 70%,
        ${({ theme }) => hexToRgba(theme.colors.background || '#FBF8ED', 0.6)} 85%,
        ${({ theme }) => theme.colors.background || '#FBF8ED'} 100%
      );
      pointer-events: none;
      z-index: 1;
    }
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
    width: 45%;
    margin-top: 0;
    padding: ${({ theme }) => theme.spacing.xxl * 1.5}px ${({ theme }) => theme.spacing.xxl * 2}px
      ${({ theme }) => theme.spacing.xxl * 1.5}px;
    background: linear-gradient(
      90deg,
      ${({ theme }) => hexToRgba(theme.colors.background || '#FBF8ED', 0.95)} 0%,
      ${({ theme }) => theme.colors.background || '#FBF8ED'} 15%,
      ${({ theme }) => theme.colors.backgroundAlt || '#F5F0E0'} 100%
    );
    position: relative;
    align-items: flex-start;
    justify-content: flex-start;
    height: auto;
    max-height: 85vh;
  }

  @media (min-width: ${({ theme }) => theme.breakpoints.xl}) {
    width: 50%;
  }

  @media (max-width: ${({ theme }) => theme.breakpoints.md}) {
    padding: ${({ theme }) => theme.spacing.xl * 1.5}px ${({ theme }) => theme.spacing.lg}px
      ${({ theme }) => theme.spacing.xl}px;
    margin-top: -80px;
  }
`;

const ContentWrapper = styled.div`
  position: relative;
  z-index: 4;
  width: 100%;
  max-width: 100%;

  @media (min-width: ${({ theme }) => theme.breakpoints.lg}) {
    max-width: 100%;
    margin: 0;
    padding: 0;
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
    min-height: auto;
    padding-top: ${({ theme }) => theme.spacing.xl}px;
  }

  @media (min-width: ${({ theme }) => theme.breakpoints.xl}) {
    max-width: 580px;
  }

  @media (max-width: ${({ theme }) => theme.breakpoints.md}) {
    padding: 0 ${({ theme }) => theme.spacing.lg}px;
  }
`;

const Heading = styled.h1`
  font-size: clamp(2rem, 5vw + 0.5rem, 3.5rem);
  line-height: 1.2;
  margin: 0 0 ${({ theme }) => theme.spacing.lg}px 0;
  color: ${({ theme }) => theme.colors.brownDark || theme.colors.text};
  letter-spacing: -0.02em;
  font-weight: ${({ theme }) => theme.typography.weights.bold};
  font-family: ${({ theme }) => theme.typography.fonts.heading};
  max-width: 100%;
  text-align: left;

  strong {
    font-weight: ${({ theme }) => theme.typography.weights.bold};
  }

  @media (min-width: ${({ theme }) => theme.breakpoints.lg}) {
    font-size: clamp(2.5rem, 3.5vw + 0.5rem, 3.25rem);
    margin-bottom: ${({ theme }) => theme.spacing.xl}px;
    margin-top: 0;
    line-height: 1.2;
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
  text-align: left;

  @media (min-width: ${({ theme }) => theme.breakpoints.lg}) {
    font-size: ${({ theme }) => theme.typography.sizes.lg};
    margin-bottom: ${({ theme }) => theme.spacing.xxl}px;
    line-height: 1.75;
    max-width: 100%;
    color: ${({ theme }) => theme.colors.textMuted || theme.colors.brownMedium};
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
  align-items: flex-start;

  @media (min-width: ${({ theme }) => theme.breakpoints.lg}) {
    flex-direction: row;
    gap: ${({ theme }) => theme.spacing.lg}px;
    max-width: 100%;
    margin-top: 0;
    align-items: flex-start;
    & > a {
      flex: 0 1 auto;
      min-width: 220px;
      max-width: 260px;
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
  box-shadow: 0 6px 14px rgba(89, 60, 44, 0.18) !important;
  font-weight: ${({ theme }) => theme.typography.weights.semi} !important;
  letter-spacing: 0 !important;
  border-radius: 999px !important;
  padding: ${({ theme }) => theme.spacing.sm + 2}px ${({ theme }) => theme.spacing.xl + 8}px !important;
  font-size: ${({ theme }) => theme.typography.sizes.md} !important;
  min-height: 46px !important;
  transition:
    opacity 0.2s ease,
    box-shadow 0.2s ease !important;
  white-space: normal !important;
  text-align: center !important;
  line-height: 1.35 !important;

  &:hover:not(:disabled) {
    background: ${({ theme }) => theme.colors.brownDark || theme.colors.text} !important;
    opacity: 0.9;
    transform: none !important;
    box-shadow: 0 8px 18px rgba(89, 60, 44, 0.2) !important;
  }

  &:active:not(:disabled) {
    opacity: 0.85;
    transform: none !important;
  }

  @media (min-width: ${({ theme }) => theme.breakpoints.lg}) {
    padding: ${({ theme }) => theme.spacing.sm + 4}px ${({ theme }) => theme.spacing.xxl}px !important;
    font-size: ${({ theme }) => theme.typography.sizes.md} !important;
    min-height: 48px !important;
  }
`;

const SecondaryButton = styled(LinkButton)`
  background: ${({ theme }) => theme.colors.brownMedium || '#a77e5d'} !important;
  color: ${({ theme }) => theme.colors.background || '#fff'} !important;
  border: none !important;
  box-shadow: 0 6px 14px rgba(140, 107, 80, 0.18) !important;
  font-weight: ${({ theme }) => theme.typography.weights.semi} !important;
  letter-spacing: 0 !important;
  border-radius: 999px !important;
  padding: ${({ theme }) => theme.spacing.sm + 2}px ${({ theme }) => theme.spacing.xl + 8}px !important;
  font-size: ${({ theme }) => theme.typography.sizes.md} !important;
  min-height: 46px !important;
  transition:
    opacity 0.2s ease,
    box-shadow 0.2s ease !important;
  white-space: normal !important;
  text-align: center !important;
  line-height: 1.35 !important;

  &:hover:not(:disabled) {
    background: ${({ theme }) => theme.colors.brownMedium || '#a77e5d'} !important;
    opacity: 0.9;
    transform: none !important;
    box-shadow: 0 8px 18px rgba(140, 107, 80, 0.2) !important;
  }

  &:active:not(:disabled) {
    opacity: 0.85;
    transform: none !important;
  }

  @media (min-width: ${({ theme }) => theme.breakpoints.lg}) {
    padding: ${({ theme }) => theme.spacing.sm + 4}px ${({ theme }) => theme.spacing.xxl}px !important;
    font-size: ${({ theme }) => theme.typography.sizes.md} !important;
    min-height: 48px !important;
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
