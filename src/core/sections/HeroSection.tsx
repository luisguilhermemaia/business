'use client';

import Image from 'next/image';
import styled from 'styled-components';
import { useBrand } from '../brand/BrandProvider';
import { useI18n } from '../i18n/I18nProvider';
import { LinkButton } from '../design-system/components/Button';
import { Section } from '../design-system/primitives';
import { Reveal } from '../design-system/components/Reveal';
import { hexToRgba } from '../utils/colors';

const Wrapper = styled(Section)`
  padding: 0;
  background: ${({ theme }) => theme.colors.background};
`;

const Grid = styled.div`
  display: grid;
  grid-template-columns: 1fr;
  min-height: auto;

  @media (min-width: ${({ theme }) => theme.breakpoints.sm}) {
    min-height: 68vh;
  }

  @media (min-width: ${({ theme }) => theme.breakpoints.md}) {
    min-height: 72vh;
  }

  @media (min-width: ${({ theme }) => theme.breakpoints.lg}) {
    grid-template-columns: 1.1fr 0.9fr;
    min-height: 0;
    align-items: stretch;
  }

  @media (min-width: ${({ theme }) => theme.breakpoints.xl}) {
    grid-template-columns: 1fr 1fr;
  }
`;

/* ---- Image column: photo + fade into content ---- */
const ImageCol = styled.div`
  position: relative;
  order: 1;
  min-height: 44vh;
  background: ${({ theme }) => theme.colors.backgroundAlt || theme.colors.background};

  @media (min-width: ${({ theme }) => theme.breakpoints.sm}) {
    min-height: 42vh;
  }

  @media (min-width: ${({ theme }) => theme.breakpoints.md}) {
    min-height: 48vh;
  }

  @media (min-width: ${({ theme }) => theme.breakpoints.lg}) {
    order: 1;
    min-height: 0;
  }
`;

const ImageInner = styled.div`
  position: absolute;
  inset: 0;

  img {
    object-fit: cover;
    object-position: center 28%;
    width: 100%;
    height: 100%;
  }

  /* Fade: image blends into content (mobile: bottom, desktop: right) */
  &::after {
    content: '';
    position: absolute;
    left: 0;
    right: 0;
    bottom: 0;
    height: 50%;
    background: linear-gradient(
      to top,
      ${({ theme }) => theme.colors.background} 0%,
      ${({ theme }) => hexToRgba(theme.colors.background, 0.3)} 60%,
      transparent 100%
    );
    pointer-events: none;
  }

  @media (min-width: ${({ theme }) => theme.breakpoints.sm}) {
    img {
      object-position: center 30%;
    }
    &::after {
      height: 38%;
      background: linear-gradient(
        to top,
        ${({ theme }) => theme.colors.background} 0%,
        transparent 100%
      );
    }
  }

  @media (min-width: ${({ theme }) => theme.breakpoints.md}) {
    img {
      object-position: center 28%;
    }
    &::after {
      height: 42%;
    }
  }

  @media (min-width: ${({ theme }) => theme.breakpoints.lg}) {
    img {
      object-position: center center;
    }

    &::after {
      left: auto;
      right: 0;
      top: 0;
      bottom: 0;
      width: 45%;
      height: 100%;
      background: linear-gradient(
        to right,
        transparent 0%,
        ${({ theme }) => hexToRgba(theme.colors.background, 0.35)} 45%,
        ${({ theme }) => theme.colors.background} 100%
      );
    }
  }

  @media (min-width: ${({ theme }) => theme.breakpoints.xl}) {
    &::after {
      width: 48%;
      background: linear-gradient(
        to right,
        transparent 0%,
        ${({ theme }) => hexToRgba(theme.colors.background, 0.3)} 50%,
        ${({ theme }) => theme.colors.background} 100%
      );
    }
  }
`;

/* ---- Content column ---- */
const ContentCol = styled.div`
  position: relative;
  order: 2;
  display: flex;
  align-items: center;
  padding: ${({ theme }) => theme.spacing.xl}px ${({ theme }) => theme.spacing.lg}px
    ${({ theme }) => theme.spacing.xxl}px;
  background: ${({ theme }) => theme.colors.background};

  @media (max-width: ${({ theme }) => theme.breakpoints.md}) {
    justify-content: center;
    align-items: center;
  }

  @media (max-width: ${({ theme }) => theme.breakpoints.sm}) {
    padding: ${({ theme }) => theme.spacing.xl}px
      max(${({ theme }) => theme.spacing.lg}px, env(safe-area-inset-left))
      ${({ theme }) => theme.spacing.xxl}px
      max(${({ theme }) => theme.spacing.lg}px, env(safe-area-inset-right));
  }

  @media (min-width: ${({ theme }) => theme.breakpoints.sm}) {
    padding: ${({ theme }) => theme.spacing.xl}px ${({ theme }) => theme.spacing.lg}px
      ${({ theme }) => theme.spacing.xxl}px;
  }

  @media (min-width: ${({ theme }) => theme.breakpoints.md}) {
    padding: ${({ theme }) => theme.spacing.xxl}px ${({ theme }) => theme.spacing.xl}px;
  }

  @media (min-width: ${({ theme }) => theme.breakpoints.lg}) {
    order: 2;
    padding: ${({ theme }) => theme.spacing.xl}px ${({ theme }) => theme.spacing.xl}px
      ${({ theme }) => theme.spacing.xxl}px;
    padding-left: clamp(${({ theme }) => theme.spacing.xl}px, 4vw, ${({ theme }) => theme.spacing.xxl}px);
  }

  @media (min-width: ${({ theme }) => theme.breakpoints.xl}) {
    padding-left: clamp(${({ theme }) => theme.spacing.xxl}px, 5vw, 80px);
    padding-right: clamp(${({ theme }) => theme.spacing.xxl}px, 5vw, 80px);
  }
`;

const ContentInner = styled.div`
  width: 100%;
  max-width: 540px;
  margin: 0 auto;
  text-align: center;

  @media (min-width: ${({ theme }) => theme.breakpoints.lg}) {
    margin: 0;
    text-align: left;
  }

  @media (min-width: ${({ theme }) => theme.breakpoints.xl}) {
    max-width: 560px;
  }
`;

const Title = styled.h1`
  font-size: clamp(1.4rem, 6vw + 0.75rem, 2.25rem);
  line-height: 1.3;
  margin: 0 0 ${({ theme }) => theme.spacing.md}px;
  color: ${({ theme }) => theme.colors.brownDark || theme.colors.text};
  font-family: ${({ theme }) => theme.typography.fonts.heading};
  font-weight: ${({ theme }) => theme.typography.weights.bold};
  letter-spacing: -0.02em;

  @media (max-width: ${({ theme }) => theme.breakpoints.sm}) {
    font-size: clamp(1.35rem, 5.5vw + 0.75rem, 2rem);
    line-height: 1.35;
    margin-bottom: ${({ theme }) => theme.spacing.lg}px;
  }

  @media (min-width: ${({ theme }) => theme.breakpoints.sm}) {
    font-size: clamp(1.65rem, 4.5vw + 0.5rem, 2.35rem);
    margin-bottom: ${({ theme }) => theme.spacing.md}px;
  }

  @media (min-width: ${({ theme }) => theme.breakpoints.md}) {
    font-size: clamp(1.85rem, 3.5vw + 0.5rem, 2.5rem);
    margin-bottom: ${({ theme }) => theme.spacing.md}px;
    letter-spacing: -0.025em;
  }

  @media (min-width: ${({ theme }) => theme.breakpoints.lg}) {
    font-size: clamp(1.9rem, 2.8vw + 0.5rem, 2.5rem);
    margin-bottom: ${({ theme }) => theme.spacing.md}px;
  }

  @media (min-width: ${({ theme }) => theme.breakpoints.xl}) {
    font-size: clamp(2rem, 2.2vw + 0.5rem, 2.6rem);
    margin-bottom: ${({ theme }) => theme.spacing.lg}px;
  }
`;

const Lead = styled.p`
  font-size: ${({ theme }) => theme.typography.sizes.md};
  line-height: 1.7;
  margin: 0 0 ${({ theme }) => theme.spacing.lg}px;
  color: ${({ theme }) => theme.colors.textMuted || theme.colors.brownMedium};

  @media (max-width: ${({ theme }) => theme.breakpoints.sm}) {
    font-size: ${({ theme }) => theme.typography.sizes.sm};
    line-height: 1.75;
    margin-bottom: ${({ theme }) => theme.spacing.xl}px;
  }

  @media (min-width: ${({ theme }) => theme.breakpoints.sm}) {
    font-size: ${({ theme }) => theme.typography.sizes.md};
    line-height: 1.7;
    margin-bottom: ${({ theme }) => theme.spacing.lg}px;
  }

  @media (min-width: ${({ theme }) => theme.breakpoints.md}) {
    margin-bottom: ${({ theme }) => theme.spacing.lg}px;
  }

  @media (min-width: ${({ theme }) => theme.breakpoints.lg}) {
    line-height: 1.75;
    margin-bottom: ${({ theme }) => theme.spacing.xl}px;
  }

  @media (min-width: ${({ theme }) => theme.breakpoints.xl}) {
    font-size: ${({ theme }) => theme.typography.sizes.lg};
    margin-bottom: ${({ theme }) => theme.spacing.xl}px;
  }
`;

const CtaRow = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${({ theme }) => theme.spacing.sm}px;
  width: 100%;
  align-items: center;

  a {
    font-size: ${({ theme }) => theme.typography.sizes.sm};
    padding: ${({ theme }) => theme.spacing.sm + 2}px ${({ theme }) => theme.spacing.lg}px;
    min-height: 44px;
    border-radius: ${({ theme }) => theme.radii.pill};
    width: 100%;
    justify-content: center;
  }

  @media (min-width: ${({ theme }) => theme.breakpoints.sm}) {
    flex-direction: row;
    flex-wrap: wrap;
    width: auto;
    align-items: center;
    justify-content: center;
    gap: ${({ theme }) => theme.spacing.md}px;

    a {
      width: auto;
      min-height: 40px;
      padding: ${({ theme }) => theme.spacing.sm}px ${({ theme }) => theme.spacing.lg}px;
    }
  }

  @media (min-width: ${({ theme }) => theme.breakpoints.lg}) {
    justify-content: flex-start;
    align-items: flex-start;
  }

  @media (min-width: ${({ theme }) => theme.breakpoints.md}) {
    a {
      min-height: 42px;
    }
  }

  @media (min-width: ${({ theme }) => theme.breakpoints.lg}) {
    a {
      padding: ${({ theme }) => theme.spacing.sm + 2}px ${({ theme }) => theme.spacing.xl}px;
      min-height: 44px;
    }
  }

  @media (min-width: ${({ theme }) => theme.breakpoints.xl}) {
    gap: ${({ theme }) => theme.spacing.lg}px;

    a {
      font-size: ${({ theme }) => theme.typography.sizes.md};
      padding: ${({ theme }) => theme.spacing.sm + 4}px ${({ theme }) => theme.spacing.xl + 4}px;
      min-height: 46px;
    }
  }
`;

const CtaPrimary = styled(LinkButton)`
  && {
    background: ${({ theme }) => theme.colors.brownDark || theme.colors.text};
    color: ${({ theme }) => theme.colors.background};
    border: none;
    font-weight: ${({ theme }) => theme.typography.weights.semi};
  }
  &&:hover:not(:disabled) {
    opacity: 0.92;
  }
`;

const CtaSecondary = styled(LinkButton)`
  && {
    background: transparent;
    color: ${({ theme }) => theme.colors.brownDark || theme.colors.text};
    border: 1.5px solid ${({ theme }) => hexToRgba(theme.colors.brownDark || theme.colors.text, 0.4)};
    font-weight: ${({ theme }) => theme.typography.weights.medium};
  }
  &&:hover:not(:disabled) {
    background: ${({ theme }) => hexToRgba(theme.colors.brownDark || theme.colors.text, 0.08)};
    border-color: ${({ theme }) => theme.colors.brownDark || theme.colors.text};
  }
`;

const DEFAULT_HEADSHOT =
  'https://images.unsplash.com/photo-1544717305-2782549b5136?w=1200&h=900&fit=crop&q=80';

export const HeroSection = () => {
  const { content } = useBrand();
  const { t } = useI18n();
  const headshot = content.doctor.headshot || DEFAULT_HEADSHOT;

  return (
    <Wrapper>
      <Grid>
        <ImageCol>
          <Reveal immediate fill direction="fade" duration={1000} delay={0}>
            <ImageInner>
              <Image
                src={headshot}
                alt={content.doctor.name}
                fill
                priority
                sizes="(max-width: 1023px) 100vw, 50vw"
              />
            </ImageInner>
          </Reveal>
        </ImageCol>
        <ContentCol>
          <ContentInner>
            <Reveal immediate direction="up" duration={700} delay={0.15}>
              <Title>{content.hero.headline}</Title>
            </Reveal>
            <Reveal immediate direction="up" duration={700} delay={0.3}>
              <Lead>{content.hero.subheadline}</Lead>
            </Reveal>
            <Reveal immediate direction="up" duration={700} delay={0.45}>
              <CtaRow>
                <CtaPrimary href="/booking" size="sm">
                  {t('hero.ctaPresencial')}
                </CtaPrimary>
                <CtaSecondary href="/booking" size="sm" variant="secondary">
                  {t('hero.ctaOnline')}
                </CtaSecondary>
              </CtaRow>
            </Reveal>
          </ContentInner>
        </ContentCol>
      </Grid>
    </Wrapper>
  );
};
