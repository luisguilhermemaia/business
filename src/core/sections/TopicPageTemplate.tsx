'use client';

import Image from 'next/image';
import Link from 'next/link';
import { ComponentProps } from 'react';
import styled from 'styled-components';
import { Container, Section } from '../design-system/primitives';
import { Icon } from '../icons/Icon';
import { hexToRgba } from '../utils/colors';

interface TopicBlock {
  title: string;
  description: string;
  points?: string[];
}

interface TopicLink {
  label: string;
  href: string;
}

interface BreadcrumbItem {
  label: string;
  href?: string;
}

interface Props {
  breadcrumbs?: BreadcrumbItem[];
  eyebrow?: string;
  title: string;
  subtitle: string;
  heroImageSrc?: string;
  heroImageAlt?: string;
  heroImagePosition?: string;
  blocks: TopicBlock[];
  sideTitle: string;
  sidePoints: string[];
  ctaLabel: string;
  ctaHref: string;
  relatedLinks?: TopicLink[];
}

const BreadcrumbNav = styled.nav`
  margin-bottom: ${({ theme }) => theme.spacing.md}px;
`;

const BreadcrumbList = styled.ol`
  margin: 0;
  padding: 0;
  list-style: none;
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  gap: 6px;
`;

const BreadcrumbItemRow = styled.li`
  display: inline-flex;
  align-items: center;
  gap: 6px;
`;

const BreadcrumbLink = styled(Link)<Omit<ComponentProps<typeof Link>, 'href'> & { href: string }>`
  text-decoration: none;
  text-transform: uppercase;
  letter-spacing: 0.08em;
  font-size: ${({ theme }) => theme.typography.sizes.xs};
  font-weight: ${({ theme }) => theme.typography.weights.bold};
  color: ${({ theme }) => hexToRgba(theme.colors.text, 0.72)};

  &:hover {
    color: ${({ theme }) => theme.colors.primaryStrong};
  }
`;

const BreadcrumbCurrent = styled.span`
  text-transform: uppercase;
  letter-spacing: 0.08em;
  font-size: ${({ theme }) => theme.typography.sizes.xs};
  font-weight: ${({ theme }) => theme.typography.weights.bold};
  color: ${({ theme }) => hexToRgba(theme.colors.primaryStrong, 0.76)};
`;

const BreadcrumbSeparator = styled.span`
  color: ${({ theme }) => hexToRgba(theme.colors.primary, 0.62)};
  font-size: 0.8rem;
  line-height: 1;
  transform: translateY(-1px);
`;

const FeaturedGrid = styled.article<{ $withImage: boolean }>`
  display: grid;
  grid-template-columns: ${({ $withImage }) =>
    $withImage ? 'minmax(0, 0.95fr) minmax(0, 1.25fr)' : '1fr'};
  border: 1px solid ${({ theme }) => hexToRgba(theme.colors.text, 0.12)};
  background: ${({ theme }) => hexToRgba(theme.colors.surface, 0.95)};
  overflow: hidden;

  @media (max-width: ${({ theme }) => theme.breakpoints.lg}) {
    grid-template-columns: 1fr;
  }
`;

const FeaturedMedia = styled.div`
  position: relative;
  min-height: clamp(240px, 30vw, 360px);
  border-right: 1px solid ${({ theme }) => hexToRgba(theme.colors.text, 0.12)};
  border-bottom: 3px solid ${({ theme }) => hexToRgba(theme.colors.primary, 0.72)};

  @media (max-width: ${({ theme }) => theme.breakpoints.lg}) {
    border-right: none;
  }
`;

const FeaturedContent = styled.div`
  padding: clamp(20px, 2.6vw, 36px);
  background: ${({ theme }) => hexToRgba(theme.colors.surfaceMuted, 0.42)};
`;

const Eyebrow = styled.p`
  margin: 0 0 ${({ theme }) => theme.spacing.xs}px;
  text-transform: uppercase;
  letter-spacing: 0.08em;
  font-size: ${({ theme }) => theme.typography.sizes.xs};
  font-weight: ${({ theme }) => theme.typography.weights.bold};
  color: ${({ theme }) => hexToRgba(theme.colors.primaryStrong, 0.82)};
`;

const Title = styled.h1`
  margin: 0 0 ${({ theme }) => theme.spacing.sm}px;
  font-size: clamp(1.7rem, 2vw + 1rem, 2.8rem);
  line-height: 1.14;
  font-weight: ${({ theme }) => theme.typography.weights.regular};
  color: ${({ theme }) => theme.colors.text};
`;

const Subtitle = styled.p`
  margin: 0;
  color: ${({ theme }) => theme.colors.textMuted};
  line-height: ${({ theme }) => theme.typography.lineHeights?.relaxed || 1.75};
`;

const BodySurface = styled.section`
  margin-top: ${({ theme }) => theme.spacing.xl}px;
  padding: clamp(20px, 2.8vw, 36px);
  border: 1px solid ${({ theme }) => hexToRgba(theme.colors.text, 0.11)};
  background:
    linear-gradient(
      180deg,
      ${({ theme }) => hexToRgba(theme.colors.surfaceMuted, 0.48)} 0%,
      ${({ theme }) => hexToRgba(theme.colors.surface, 0.92)} 100%
    ),
    repeating-linear-gradient(
      45deg,
      ${({ theme }) => hexToRgba(theme.colors.primary, 0.06)} 0 1px,
      transparent 1px 18px
    ),
    repeating-linear-gradient(
      -45deg,
      ${({ theme }) => hexToRgba(theme.colors.text, 0.035)} 0 1px,
      transparent 1px 20px
    );
`;

const Grid = styled.div`
  display: grid;
  grid-template-columns: 1.45fr 1fr;
  gap: ${({ theme }) => theme.spacing.lg}px;

  @media (max-width: ${({ theme }) => theme.breakpoints.lg}) {
    grid-template-columns: 1fr;
  }
`;

const Main = styled.div`
  display: grid;
  gap: ${({ theme }) => theme.spacing.md}px;
`;

const Card = styled.article`
  border: 1px solid ${({ theme }) => hexToRgba(theme.colors.text, 0.14)};
  border-left: 3px solid ${({ theme }) => hexToRgba(theme.colors.primary, 0.52)};
  background: ${({ theme }) => theme.colors.surface};
  padding: ${({ theme }) => theme.spacing.md}px ${({ theme }) => theme.spacing.lg}px;
`;

const CardTitle = styled.h2`
  font-size: ${({ theme }) => theme.typography.sizes.lg};
  margin-bottom: ${({ theme }) => theme.spacing.xs}px;
`;

const CardText = styled.p`
  margin: 0;
  color: ${({ theme }) => hexToRgba(theme.colors.text, 0.84)};
  line-height: ${({ theme }) => theme.typography.lineHeights?.relaxed || 1.75};
`;

const PointList = styled.ul`
  margin-top: ${({ theme }) => theme.spacing.sm}px;
  display: grid;
  gap: ${({ theme }) => theme.spacing.xs}px;
`;

const Point = styled.li`
  display: flex;
  align-items: flex-start;
  gap: ${({ theme }) => theme.spacing.sm}px;
  font-size: ${({ theme }) => theme.typography.sizes.sm};
  color: ${({ theme }) => hexToRgba(theme.colors.text, 0.84)};
`;

const Side = styled.aside`
  display: grid;
  gap: ${({ theme }) => theme.spacing.md}px;
  align-content: start;
`;

const SideCard = styled(Card)`
  display: grid;
  gap: ${({ theme }) => theme.spacing.md}px;
  background: ${({ theme }) => hexToRgba(theme.colors.primary, 0.08)};
  position: sticky;
  top: 108px;

  @media (max-width: ${({ theme }) => theme.breakpoints.lg}) {
    position: static;
  }
`;

const Action = styled(Link)<Omit<ComponentProps<typeof Link>, 'href'> & { href: string }>`
  min-height: 46px;
  border-radius: ${({ theme }) => theme.radii.pill};
  border: 1px solid ${({ theme }) => hexToRgba(theme.colors.primary, 0.52)};
  background: ${({ theme }) => hexToRgba(theme.colors.primary, 0.14)};
  color: ${({ theme }) => theme.colors.text};
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: ${({ theme }) => theme.spacing.sm}px;
  text-decoration: none;
  font-size: ${({ theme }) => theme.typography.sizes.sm};
  font-weight: ${({ theme }) => theme.typography.weights.bold};
  text-transform: uppercase;
  letter-spacing: 0.05em;

  &:hover {
    background: ${({ theme }) => hexToRgba(theme.colors.primary, 0.24)};
  }
`;

const Related = styled(Card)`
  display: grid;
  gap: ${({ theme }) => theme.spacing.xs}px;
`;

const RelatedTitle = styled.p`
  margin: 0;
  text-transform: uppercase;
  letter-spacing: 0.1em;
  font-size: ${({ theme }) => theme.typography.sizes.xs};
  font-weight: ${({ theme }) => theme.typography.weights.bold};
`;

const RelatedLink = styled(Link)<Omit<ComponentProps<typeof Link>, 'href'> & { href: string }>`
  display: inline-flex;
  align-items: center;
  gap: ${({ theme }) => theme.spacing.sm}px;
  color: ${({ theme }) => theme.colors.text};
  text-decoration: none;
  font-size: ${({ theme }) => theme.typography.sizes.sm};

  &:hover {
    color: ${({ theme }) => theme.colors.primary};
  }
`;

export const TopicPageTemplate = ({
  breadcrumbs,
  eyebrow,
  title,
  subtitle,
  heroImageSrc,
  heroImageAlt,
  heroImagePosition,
  blocks,
  sideTitle,
  sidePoints,
  ctaHref,
  ctaLabel,
  relatedLinks,
}: Props) => {
  return (
    <Section padding="md">
      <Container width="wide">
        {breadcrumbs?.length ? (
          <BreadcrumbNav aria-label="Breadcrumb">
            <BreadcrumbList>
              {breadcrumbs.map((breadcrumb, index) => {
                const isLast = index === breadcrumbs.length - 1;
                return (
                  <BreadcrumbItemRow key={`${breadcrumb.label}-${index}`}>
                    {breadcrumb.href && !isLast ? (
                      <BreadcrumbLink href={breadcrumb.href}>{breadcrumb.label}</BreadcrumbLink>
                    ) : (
                      <BreadcrumbCurrent>{breadcrumb.label}</BreadcrumbCurrent>
                    )}
                    {!isLast ? <BreadcrumbSeparator>{'>'}</BreadcrumbSeparator> : null}
                  </BreadcrumbItemRow>
                );
              })}
            </BreadcrumbList>
          </BreadcrumbNav>
        ) : null}

        <FeaturedGrid $withImage={Boolean(heroImageSrc)}>
          {heroImageSrc ? (
            <FeaturedMedia>
              <Image
                src={heroImageSrc}
                alt={heroImageAlt || title}
                fill
                priority
                sizes="(max-width: 1024px) 100vw, 38vw"
                style={{
                  objectFit: 'cover',
                  objectPosition: heroImagePosition || 'center center',
                }}
              />
            </FeaturedMedia>
          ) : null}

          <FeaturedContent>
            {eyebrow ? <Eyebrow>{eyebrow}</Eyebrow> : null}
            <Title>{title}</Title>
            <Subtitle>{subtitle}</Subtitle>
          </FeaturedContent>
        </FeaturedGrid>

        <BodySurface>
          <Grid>
            <Main>
              {blocks.map((block) => (
                <Card key={block.title}>
                  <CardTitle>{block.title}</CardTitle>
                  <CardText>{block.description}</CardText>
                  {block.points?.length ? (
                    <PointList>
                      {block.points.map((point) => (
                        <Point key={point}>
                          <Icon name="check" size={15} />
                          {point}
                        </Point>
                      ))}
                    </PointList>
                  ) : null}
                </Card>
              ))}
            </Main>

            <Side>
              <SideCard>
                <CardTitle>{sideTitle}</CardTitle>
                <PointList>
                  {sidePoints.map((point) => (
                    <Point key={point}>
                      <Icon name="check" size={15} />
                      {point}
                    </Point>
                  ))}
                </PointList>
                <Action href={ctaHref}>
                  {ctaLabel}
                  <Icon name="arrow-right" size={14} style={{ transform: 'rotate(90deg)' }} />
                </Action>
              </SideCard>

              {relatedLinks?.length ? (
                <Related>
                  <RelatedTitle>Temas relacionados</RelatedTitle>
                  {relatedLinks.map((link) => (
                    <RelatedLink key={link.href} href={link.href}>
                      <Icon name="arrow-right" size={13} style={{ transform: 'rotate(90deg)' }} />
                      {link.label}
                    </RelatedLink>
                  ))}
                </Related>
              ) : null}
            </Side>
          </Grid>
        </BodySurface>
      </Container>
    </Section>
  );
};
