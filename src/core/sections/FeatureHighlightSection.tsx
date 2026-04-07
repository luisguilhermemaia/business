'use client';

import Image from 'next/image';
import Link from 'next/link';
import { ComponentProps, ReactNode } from 'react';
import styled from 'styled-components';
import { Container } from '../design-system/primitives';
import { hexToRgba } from '../utils/colors';

type FeatureTone = 'surface' | 'alt' | 'radial';
type OverlayTone = 'soft' | 'medium' | 'strong';

interface FeatureHighlightSectionProps {
  title: string;
  subtitle?: string;
  paragraphs: ReactNode[];
  imageSrc: string;
  imageAlt: string;
  imageObjectPosition?: string;
  plusHref?: string;
  plusAriaLabel?: string;
  reverse?: boolean;
  tone?: FeatureTone;
  lead?: ReactNode;
  imageOverlay?: boolean;
  overlayTone?: OverlayTone;
  actions?: ReactNode;
}

const Section = styled.section<{ $tone: FeatureTone }>`
  background: ${({ theme, $tone }) =>
    $tone === 'alt'
      ? hexToRgba(theme.colors.backgroundAlt, 0.42)
      : $tone === 'radial'
        ? `radial-gradient(
      circle at 10% 8%,
      ${hexToRgba(theme.colors.primary, 0.14)} 0%,
      transparent 35%
    ), ${theme.colors.background}`
        : theme.colors.surface};
  padding: clamp(64px, 8vw, 110px) 0 28px;
`;

const Lead = styled.div`
  margin-bottom: ${({ theme }) => theme.spacing.md}px;
`;

const Grid = styled.div<{ $reverse: boolean }>`
  position: relative;
  display: grid;
  grid-template-columns: ${({ $reverse }) =>
    $reverse ? 'minmax(0, 42%) minmax(0, 58%)' : 'minmax(0, 58%) minmax(0, 42%)'};
  align-items: stretch;

  @media (max-width: ${({ theme }) => theme.breakpoints.lg}) {
    grid-template-columns: 1fr;
    gap: 0;
  }
`;

const Visual = styled.div<{ $imageOverlay: boolean; $overlayTone: OverlayTone }>`
  position: relative;
  min-height: clamp(430px, 48vw, 620px);
  overflow: hidden;
  border-bottom: 4px solid ${({ theme }) => theme.colors.primary};
  z-index: 1;

  &::after {
    content: '';
    position: absolute;
    inset: 0;
    pointer-events: none;
    background: ${({ theme, $overlayTone }) =>
      $overlayTone === 'strong'
        ? `linear-gradient(
      180deg,
      ${hexToRgba(theme.colors.text, 0.08)} 0%,
      ${hexToRgba(theme.colors.text, 0.56)} 100%
    )`
        : $overlayTone === 'medium'
          ? `linear-gradient(
      180deg,
      ${hexToRgba(theme.colors.text, 0.06)} 0%,
      ${hexToRgba(theme.colors.text, 0.42)} 100%
    )`
          : `linear-gradient(
      180deg,
      ${hexToRgba(theme.colors.text, 0.04)} 0%,
      ${hexToRgba(theme.colors.text, 0.28)} 100%
    )`};
    opacity: ${({ $imageOverlay }) => ($imageOverlay ? 1 : 0)};
    transition: opacity 180ms ease;
  }

  @media (max-width: ${({ theme }) => theme.breakpoints.md}) {
    min-height: 380px;
  }
`;

const Content = styled.article<{ $reverse: boolean }>`
  margin: ${({ $reverse }) => ($reverse ? '-48px -72px 0 0' : '-48px 0 0 -72px')};
  padding: clamp(24px, 3vw, 44px) clamp(20px, 2.6vw, 40px);
  background: ${({ theme }) => hexToRgba(theme.colors.surfaceMuted, 0.94)};
  border-right: ${({ theme, $reverse }) => ($reverse ? 'none' : `2px solid ${theme.colors.primary}`)};
  border-left: ${({ theme, $reverse }) => ($reverse ? `2px solid ${theme.colors.primary}` : 'none')};
  z-index: 2;
  display: grid;
  gap: 12px;
  align-content: start;

  @media (max-width: ${({ theme }) => theme.breakpoints.lg}) {
    margin: 0;
    border-right: none;
    border-left: none;
    border-bottom: 2px solid ${({ theme }) => theme.colors.primary};
  }
`;

const TitleRow = styled.div`
  display: inline-flex;
  align-items: center;
  gap: 12px;
  flex-wrap: wrap;
`;

const Title = styled.h2`
  margin: 0;
  font-family: ${({ theme }) => theme.typography.fonts.body};
  font-size: clamp(2rem, 2.8vw + 0.6rem, 3rem);
  line-height: 1.08;
  letter-spacing: -0.01em;
  font-weight: ${({ theme }) => theme.typography.weights.regular};
  color: ${({ theme }) => theme.colors.primary};
`;

const Plus = styled(Link)<Omit<ComponentProps<typeof Link>, 'href'> & { href: string }>`
  width: 38px;
  height: 38px;
  border-radius: ${({ theme }) => theme.radii.round};
  border: 2px solid ${({ theme }) => hexToRgba(theme.colors.surface, 0.9)};
  color: ${({ theme }) => theme.colors.primary};
  font-size: 1.55rem;
  line-height: 1;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  transform: translateY(2px);

  &::after {
    content: none !important;
    display: none !important;
  }
`;

const Subtitle = styled.p`
  margin: 0;
  color: ${({ theme }) => hexToRgba(theme.colors.text, 0.72)};
  font-size: clamp(1.12rem, 0.84vw + 0.86rem, 1.48rem);
  line-height: 1.25;
`;

const Paragraph = styled.p`
  margin: 0;
  color: ${({ theme }) => hexToRgba(theme.colors.text, 0.7)};
  line-height: ${({ theme }) => theme.typography.lineHeights?.relaxed || 1.8};
  font-size: clamp(1rem, 0.62vw + 0.85rem, 1.15rem);
`;

export const FeatureHighlightSection = ({
  title,
  subtitle,
  paragraphs,
  imageSrc,
  imageAlt,
  imageObjectPosition = 'center center',
  plusHref,
  plusAriaLabel,
  reverse = false,
  tone = 'surface',
  lead,
  imageOverlay = false,
  overlayTone = 'medium',
  actions,
}: FeatureHighlightSectionProps) => {
  const contentNode = (
    <Content $reverse={reverse}>
      <TitleRow>
        <Title>{title}</Title>
        {plusHref ? (
          <Plus href={plusHref} aria-label={plusAriaLabel || `Ir para ${title}`}>
            +
          </Plus>
        ) : null}
      </TitleRow>
      {subtitle ? <Subtitle>{subtitle}</Subtitle> : null}
      {paragraphs.map((paragraph, index) => (
        <Paragraph key={`paragraph-${index}`}>{paragraph}</Paragraph>
      ))}
      {actions}
    </Content>
  );

  const visualNode = (
    <Visual $imageOverlay={imageOverlay} $overlayTone={overlayTone}>
      <Image src={imageSrc} alt={imageAlt} fill style={{ objectFit: 'cover', objectPosition: imageObjectPosition }} />
    </Visual>
  );

  return (
    <Section $tone={tone}>
      <Container width="wide">
        {lead ? <Lead>{lead}</Lead> : null}
        <Grid $reverse={reverse}>
          {reverse ? (
            <>
              {contentNode}
              {visualNode}
            </>
          ) : (
            <>
              {visualNode}
              {contentNode}
            </>
          )}
        </Grid>
      </Container>
    </Section>
  );
};
