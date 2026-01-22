'use client';

import Image from 'next/image';
import styled from 'styled-components';
import { useBrand } from '../brand/BrandProvider';
import { LinkButton } from '../design-system/components/Button';
import { Container, Grid, Section } from '../design-system/primitives';
import { Reveal } from '../design-system/components/Reveal';

const HeroShell = styled(Section)`
  padding-top: ${({ theme }) => theme.spacing.xxl * 2}px;
  padding-bottom: ${({ theme }) => theme.spacing.xxl * 2}px;
  background: ${({ theme }) => theme.colors.background};
  position: relative;
  overflow: hidden;
  min-height: calc(100vh - 152px);
  display: flex;
  align-items: center;

  @media (max-width: ${({ theme }) => theme.breakpoints.md}) {
    min-height: auto;
    padding-top: ${({ theme }) => theme.spacing.xl}px;
    padding-bottom: ${({ theme }) => theme.spacing.xl * 1.5}px;
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
  display: flex;
  align-items: center;
  justify-content: center;

  @media (max-width: ${({ theme }) => theme.breakpoints.md}) {
    order: 0;
  }
`;

const Heading = styled.h1`
  font-size: clamp(2.25rem, 5.5vw + 0.5rem, 3.75rem);
  line-height: 1.2;
  margin: 0 0 ${({ theme }) => theme.spacing.lg}px 0;
  color: ${({ theme }) => theme.colors.text};
  letter-spacing: -0.02em;
  font-weight: ${({ theme }) => theme.typography.weights.bold};
  font-family: ${({ theme }) => theme.typography.fonts.heading};

  @media (max-width: ${({ theme }) => theme.breakpoints.md}) {
    font-size: clamp(1.875rem, 6vw, 2.75rem);
    margin-bottom: ${({ theme }) => theme.spacing.md}px;
  }
`;

const Subheading = styled.p`
  font-size: ${({ theme }) => theme.typography.sizes.lg};
  color: ${({ theme }) => theme.colors.textMuted};
  line-height: 1.7;
  margin: 0 0 ${({ theme }) => theme.spacing.xl}px 0;
  font-weight: ${({ theme }) => theme.typography.weights.regular};

  @media (max-width: ${({ theme }) => theme.breakpoints.md}) {
    font-size: ${({ theme }) => theme.typography.sizes.md};
    margin-bottom: ${({ theme }) => theme.spacing.lg}px;
  }
`;

const CTAs = styled.div`
  display: flex;
  gap: ${({ theme }) => theme.spacing.md}px;
  flex-wrap: wrap;
  margin-top: ${({ theme }) => theme.spacing.lg}px;

  @media (max-width: ${({ theme }) => theme.breakpoints.md}) {
    flex-direction: column;
  }
`;

const HeroImage = styled.div`
  position: relative;
  width: 100%;
  height: 680px;
  border-radius: ${({ theme }) => theme.radii.xl || theme.radii.lg};
  overflow: hidden;
  box-shadow: ${({ theme }) => theme.shadows.lg || theme.shadows.strong};
  background: ${({ theme }) => theme.colors.surfaceMuted};

  img {
    object-fit: cover;
    width: 100%;
    height: 100%;
  }

  @media (max-width: ${({ theme }) => theme.breakpoints.md}) {
    height: 420px;
    margin-bottom: ${({ theme }) => theme.spacing.xl}px;
  }
`;

export const HeroSection = () => {
  const { content } = useBrand();

  return (
    <HeroShell>
      <Container width="wide">
        <Grid columns={2} min="320px" gap="xl">
          <Reveal>
            <HeroMedia>
              <HeroImage>
                <Image
                  src={
                    content.doctor.headshot ||
                    'https://images.unsplash.com/photo-1544717305-2782549b5136?w=1200&h=900&fit=crop&q=80'
                  }
                  alt={`Dra. ${content.doctor.name}`}
                  fill
                  priority
                  sizes="(max-width: 768px) 100vw, 50vw"
                  style={{ objectFit: 'cover' }}
                />
              </HeroImage>
            </HeroMedia>
          </Reveal>
          <Reveal delay={0.1}>
            <HeroContent>
              <Heading>{content.hero.headline}</Heading>
              <Subheading>{content.hero.subheadline}</Subheading>
              <CTAs>
                <LinkButton href="/booking" size="md">
                  Quero atendimento presencial
                </LinkButton>
                <LinkButton href="/booking" variant="secondary" size="md">
                  Quero atendimento online
                </LinkButton>
              </CTAs>
            </HeroContent>
          </Reveal>
        </Grid>
      </Container>
    </HeroShell>
  );
};
