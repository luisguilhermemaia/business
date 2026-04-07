'use client';

import Image from 'next/image';
import Link from 'next/link';
import { ComponentProps } from 'react';
import styled from 'styled-components';
import { Container, Section } from '../design-system/primitives';
import { Icon } from '../icons/Icon';
import { hexToRgba } from '../utils/colors';

interface BreadcrumbItem {
  label: string;
  href?: string;
}

interface FeaturedItem {
  eyebrow?: string;
  title: string;
  description: string;
  href: string;
  ctaLabel: string;
  imageSrc: string;
  imageAlt: string;
}

interface SpecialtyHubCard {
  title: string;
  subtitle?: string;
  description: string;
  href: string;
  imageSrc: string;
  imageAlt: string;
}

interface Props {
  breadcrumbs: BreadcrumbItem[];
  featured: FeaturedItem;
  cardsTitle: string;
  cards: SpecialtyHubCard[];
}

const BreadcrumbNav = styled.nav`
  margin-bottom: ${({ theme }) => theme.spacing.md}px;
`;

const BreadcrumbList = styled.ol`
  margin: 0;
  padding: 0;
  list-style: none;
  display: flex;
  align-items: center;
  gap: 8px;
  flex-wrap: wrap;
`;

const BreadcrumbItemRow = styled.li`
  display: inline-flex;
  align-items: center;
  gap: 8px;
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

const FeaturedGrid = styled.article`
  display: grid;
  grid-template-columns: minmax(0, 0.95fr) minmax(0, 1.25fr);
  border: 1px solid ${({ theme }) => hexToRgba(theme.colors.text, 0.12)};
  background: ${({ theme }) => hexToRgba(theme.colors.surface, 0.95)};
  overflow: hidden;

  @media (max-width: ${({ theme }) => theme.breakpoints.lg}) {
    grid-template-columns: 1fr;
  }
`;

const FeaturedMedia = styled.div`
  position: relative;
  min-height: clamp(230px, 28vw, 360px);
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

const Description = styled.p`
  margin: 0;
  color: ${({ theme }) => theme.colors.textMuted};
  line-height: ${({ theme }) => theme.typography.lineHeights?.relaxed || 1.75};
`;

const FeaturedAction = styled(Link)<Omit<ComponentProps<typeof Link>, 'href'> & { href: string }>`
  margin-top: ${({ theme }) => theme.spacing.md}px;
  min-height: 44px;
  padding: 0 ${({ theme }) => theme.spacing.lg}px;
  border-radius: ${({ theme }) => theme.radii.sm};
  border: 1px solid ${({ theme }) => hexToRgba(theme.colors.primary, 0.6)};
  background: ${({ theme }) => theme.colors.primary};
  color: ${({ theme }) => theme.colors.primaryContrast};
  display: inline-flex;
  align-items: center;
  gap: ${({ theme }) => theme.spacing.sm}px;
  text-decoration: none;
  text-transform: uppercase;
  letter-spacing: 0.04em;
  font-size: ${({ theme }) => theme.typography.sizes.sm};
  font-weight: ${({ theme }) => theme.typography.weights.bold};

  &:hover {
    background: ${({ theme }) => theme.colors.primaryStrong};
    border-color: ${({ theme }) => hexToRgba(theme.colors.primaryStrong, 0.82)};
  }
`;

const CardsSurface = styled.section`
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

const CardsTitle = styled.h2`
  margin: 0;
  text-transform: uppercase;
  letter-spacing: 0.06em;
  font-size: clamp(1.3rem, 1.4vw + 0.9rem, 1.95rem);
  color: ${({ theme }) => theme.colors.primaryStrong};
`;

const CardsGrid = styled.div`
  margin-top: ${({ theme }) => theme.spacing.lg}px;
  display: grid;
  grid-template-columns: repeat(3, minmax(0, 1fr));
  gap: ${({ theme }) => theme.spacing.lg}px;

  @media (max-width: ${({ theme }) => theme.breakpoints.lg}) {
    grid-template-columns: repeat(2, minmax(0, 1fr));
  }

  @media (max-width: ${({ theme }) => theme.breakpoints.md}) {
    grid-template-columns: 1fr;
  }
`;

const Card = styled.article`
  border: 1px solid ${({ theme }) => hexToRgba(theme.colors.text, 0.12)};
  background: ${({ theme }) => theme.colors.surface};
  display: grid;
  grid-template-rows: auto 1fr;
  min-height: 100%;
`;

const CardImageLink = styled(Link)<Omit<ComponentProps<typeof Link>, 'href'> & { href: string }>`
  position: relative;
  display: block;
  aspect-ratio: 16 / 10;
  overflow: hidden;
  border-bottom: 2px solid ${({ theme }) => hexToRgba(theme.colors.primary, 0.62)};
`;

const CardContent = styled.div`
  padding: ${({ theme }) => theme.spacing.md}px;
  display: grid;
  gap: ${({ theme }) => theme.spacing.sm}px;
  align-content: start;
`;

const CardTitle = styled.h3`
  margin: 0;
  font-size: ${({ theme }) => theme.typography.sizes.lg};
  line-height: 1.25;
`;

const CardSubtitle = styled.p`
  margin: 0;
  font-size: ${({ theme }) => theme.typography.sizes.sm};
  text-transform: uppercase;
  letter-spacing: 0.04em;
  color: ${({ theme }) => hexToRgba(theme.colors.primaryStrong, 0.78)};
  font-weight: ${({ theme }) => theme.typography.weights.medium};
`;

const CardDescription = styled.p`
  margin: 0;
  color: ${({ theme }) => theme.colors.textMuted};
  line-height: ${({ theme }) => theme.typography.lineHeights?.relaxed || 1.75};
`;

const CardAction = styled(Link)<Omit<ComponentProps<typeof Link>, 'href'> & { href: string }>`
  margin-top: ${({ theme }) => theme.spacing.xs}px;
  display: inline-flex;
  align-items: center;
  gap: ${({ theme }) => theme.spacing.xs}px;
  color: ${({ theme }) => theme.colors.primaryStrong};
  text-decoration: none;
  text-transform: uppercase;
  letter-spacing: 0.05em;
  font-size: ${({ theme }) => theme.typography.sizes.xs};
  font-weight: ${({ theme }) => theme.typography.weights.bold};
`;

export const SpecialtyHubPage = ({ breadcrumbs, featured, cardsTitle, cards }: Props) => {
  return (
    <Section padding="md">
      <Container width="wide">
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

        <FeaturedGrid>
          <FeaturedMedia>
            <Image
              src={featured.imageSrc}
              alt={featured.imageAlt}
              fill
              sizes="(max-width: 1024px) 100vw, 38vw"
              style={{ objectFit: 'cover' }}
            />
          </FeaturedMedia>
          <FeaturedContent>
            {featured.eyebrow ? <Eyebrow>{featured.eyebrow}</Eyebrow> : null}
            <Title>{featured.title}</Title>
            <Description>{featured.description}</Description>
            <FeaturedAction href={featured.href}>
              {featured.ctaLabel}
              <Icon name="arrow-right" size={14} style={{ transform: 'rotate(90deg)' }} />
            </FeaturedAction>
          </FeaturedContent>
        </FeaturedGrid>

        <CardsSurface>
          <CardsTitle>{cardsTitle}</CardsTitle>
          <CardsGrid>
            {cards.map((card) => (
              <Card key={card.href}>
                <CardImageLink href={card.href}>
                  <Image
                    src={card.imageSrc}
                    alt={card.imageAlt}
                    fill
                    sizes="(max-width: 768px) 100vw, (max-width: 1240px) 50vw, 33vw"
                    style={{ objectFit: 'cover' }}
                  />
                </CardImageLink>
                <CardContent>
                  <CardTitle>{card.title}</CardTitle>
                  {card.subtitle ? <CardSubtitle>{card.subtitle}</CardSubtitle> : null}
                  <CardDescription>{card.description}</CardDescription>
                  <CardAction href={card.href}>
                    Saiba mais
                    <Icon name="arrow-right" size={13} style={{ transform: 'rotate(90deg)' }} />
                  </CardAction>
                </CardContent>
              </Card>
            ))}
          </CardsGrid>
        </CardsSurface>
      </Container>
    </Section>
  );
};
