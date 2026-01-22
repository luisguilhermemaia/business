'use client';

import Image from 'next/image';
import styled from 'styled-components';
import { useBrand } from '../brand/BrandProvider';
import { Container, Grid, Section, Stack } from '../design-system/primitives';
import { Reveal } from '../design-system/components/Reveal';
import { Icon } from '../icons/Icon';

const AboutShell = styled(Section)`
  background: ${({ theme }) => theme.colors.backgroundAlt};
`;

const TextBlock = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${({ theme }) => theme.spacing.lg}px;
  max-width: 560px;
`;

const Title = styled.h2`
  font-size: clamp(2rem, 4vw, 3rem);
  line-height: 1.2;
  color: ${({ theme }) => theme.colors.text};
  font-family: ${({ theme }) => theme.typography.fonts.heading};
  font-weight: ${({ theme }) => theme.typography.weights.bold};
  letter-spacing: -0.02em;
  margin: 0;
`;

const Description = styled.p`
  color: ${({ theme }) => theme.colors.textMuted};
  font-size: ${({ theme }) => theme.typography.sizes.lg};
  line-height: 1.75;
  margin: 0;
`;

const BulletList = styled.div`
  display: grid;
  gap: ${({ theme }) => theme.spacing.md}px;
`;

const BulletItem = styled.div`
  display: flex;
  align-items: flex-start;
  gap: ${({ theme }) => theme.spacing.md}px;
  padding: ${({ theme }) => theme.spacing.md}px;
  border-radius: ${({ theme }) => theme.radii.lg};
  background: ${({ theme }) => theme.colors.surface};
  border: 1px solid ${({ theme }) => theme.colors.border};
`;

const BulletTitle = styled.div`
  font-weight: ${({ theme }) => theme.typography.weights.semi};
  color: ${({ theme }) => theme.colors.text};
`;

const BulletText = styled.div`
  color: ${({ theme }) => theme.colors.textMuted};
  font-size: ${({ theme }) => theme.typography.sizes.sm};
  line-height: 1.6;
`;

const Media = styled.div`
  position: relative;
  width: 100%;
  height: 420px;
  border-radius: ${({ theme }) => theme.radii['2xl'] || theme.radii.xl || theme.radii.lg};
  overflow: hidden;
  background: ${({ theme }) => theme.colors.surfaceMuted};
  box-shadow: ${({ theme }) => theme.shadows.md || theme.shadows.medium};

  img {
    object-fit: cover;
  }

  @media (max-width: ${({ theme }) => theme.breakpoints.md}) {
    height: 320px;
  }
`;

export const StepsSection = () => {
  const { content } = useBrand();
  const imageUrl =
    content.doctor.headshot ||
    'https://images.unsplash.com/photo-1544717305-2782549b5136?w=1200&h=900&fit=crop&q=80';

  return (
    <AboutShell>
      <Container width="wide">
        <Grid columns={2} min="300px" gap="xl">
          <Reveal>
            <TextBlock>
              <Title>{content.steps.title}</Title>
              <Description>{content.steps.description}</Description>
              <BulletList>
                {content.steps.items.map((item) => (
                  <BulletItem key={item.title}>
                    <Icon name="check" size={18} />
                    <Stack gap="xs">
                      <BulletTitle>{item.title}</BulletTitle>
                      <BulletText>{item.description}</BulletText>
                    </Stack>
                  </BulletItem>
                ))}
              </BulletList>
            </TextBlock>
          </Reveal>
          <Reveal delay={0.1}>
            <Media>
              <Image
                src={imageUrl}
                alt={content.doctor.name}
                fill
                sizes="(max-width: 768px) 100vw, 50vw"
              />
            </Media>
          </Reveal>
        </Grid>
      </Container>
    </AboutShell>
  );
};
