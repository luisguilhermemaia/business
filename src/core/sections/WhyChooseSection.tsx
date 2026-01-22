'use client';

import styled from 'styled-components';
import { Container, Grid, Section } from '../design-system/primitives';
import { Badge } from '../design-system/components/Badge';
import { Icon } from '../icons/Icon';
import { Reveal } from '../design-system/components/Reveal';
import { hexToRgba } from '../utils/colors';

const SectionHeader = styled.div`
  text-align: center;
  margin-bottom: ${({ theme }) => theme.spacing.xl * 2}px;
  max-width: 700px;
  margin-left: auto;
  margin-right: auto;
`;

const Title = styled.h2`
  font-size: clamp(2rem, 4vw, 3rem);
  line-height: 1.2;
  margin-bottom: ${({ theme }) => theme.spacing.md}px;
  color: ${({ theme }) => theme.colors.text};
  font-family: ${({ theme }) => theme.typography.fonts.heading};
  font-weight: ${({ theme }) => theme.typography.weights.bold};
  letter-spacing: -0.02em;
`;

const FeatureIcon = styled.div`
  width: 56px;
  height: 56px;
  border-radius: ${({ theme }) => theme.radii.lg};
  display: grid;
  place-items: center;
  background: ${({ theme }) => theme.colors.tealDark ?? theme.colors.surfaceMuted};
  color: ${({ theme }) => theme.colors.tealDarkContrast ?? '#FFFFFF'};
  box-shadow: 0 2px 8px
    ${({ theme }) => hexToRgba(theme.colors.tealDark || theme.colors.text, 0.15)};
  margin-bottom: ${({ theme }) => theme.spacing.sm}px;
  transition: transform ${({ theme }) => theme.motion?.duration.normal || '250ms'}
    ${({ theme }) => theme.motion?.easing.easeOut || 'cubic-bezier(0.4, 0, 0.2, 1)'};
`;

const FeatureCard = styled.div`
  background: ${({ theme }) => theme.colors.surface};
  border-radius: ${({ theme }) => theme.radii.xl || theme.radii.lg};
  border: 1px solid ${({ theme }) => theme.colors.border};
  padding: ${({ theme }) => theme.spacing.xl}px;
  box-shadow: ${({ theme }) => theme.shadows.sm || theme.shadows.soft};
  display: flex;
  flex-direction: column;
  gap: ${({ theme }) => theme.spacing.md}px;
  transition: all ${({ theme }) => theme.motion?.duration.normal || '250ms'}
    ${({ theme }) => theme.motion?.easing.easeOut || 'cubic-bezier(0.4, 0, 0.2, 1)'};
  position: relative;
  overflow: hidden;

  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: ${({ theme }) => hexToRgba(theme.colors.primary, 0.03)};
    opacity: 0;
    transition: opacity ${({ theme }) => theme.motion?.duration.normal || '250ms'}
      ${({ theme }) => theme.motion?.easing.ease || 'ease'};
  }

  &:hover {
    transform: translateY(-6px) scale(1.01);
    box-shadow: ${({ theme }) => theme.shadows.lg || theme.shadows.strong};
    border-color: ${({ theme }) => hexToRgba(theme.colors.primary, 0.4)};

    &::before {
      opacity: 1;
    }

    ${FeatureIcon} {
      transform: scale(1.1) rotate(5deg);
    }
  }
`;

const FeatureTitle = styled.h3`
  font-size: ${({ theme }) => theme.typography.sizes.lg};
  font-weight: ${({ theme }) => theme.typography.weights.bold};
  color: ${({ theme }) => theme.colors.text};
  margin: 0;
  font-family: ${({ theme }) => theme.typography.fonts.heading};
`;

const FeatureDescription = styled.p`
  color: ${({ theme }) => theme.colors.text};
  font-size: ${({ theme }) => theme.typography.sizes.md};
  line-height: 1.7;
  margin: 0;
  opacity: 0.85;
`;

const features = [
  {
    icon: 'heart' as const,
    title: 'Acolhimento e Escuta Ativa',
    description:
      'Cada consulta é um espaço seguro para você se expressar. Tempo adequado para ouvir suas preocupações e construir juntas o melhor caminho de cuidado.',
  },
  {
    icon: 'shield' as const,
    title: 'Ciência e Evidências',
    description:
      'Todas as condutas são baseadas em evidências científicas atualizadas. Você recebe informações claras e transparentes sobre cada decisão de tratamento.',
  },
  {
    icon: 'user' as const,
    title: 'Cuidado Personalizado',
    description:
      'Reconhecemos que cada mulher é única. Seu plano de tratamento é pensado especificamente para você, considerando sua história, necessidades e objetivos.',
  },
  {
    icon: 'clock' as const,
    title: 'Disponibilidade e Acompanhamento',
    description:
      'Estou disponível para esclarecer dúvidas entre consultas e acompanho seu caso de perto, com ajustes quando necessário.',
  },
];

export const WhyChooseSection = () => {
  return (
    <Section>
      <Container width="wide">
        <SectionHeader>
          <Badge tone="teal">Por que Escolher</Badge>
          <Title>O que torna nosso cuidado especial</Title>
        </SectionHeader>
        <Grid min="260px" gap="lg">
          {features.map((feature, idx) => (
            <Reveal key={feature.title} delay={idx * 0.1} direction="up" duration={700}>
              <FeatureCard>
                <FeatureIcon>
                  <Icon name={feature.icon} size={24} />
                </FeatureIcon>
                <FeatureTitle>{feature.title}</FeatureTitle>
                <FeatureDescription>{feature.description}</FeatureDescription>
              </FeatureCard>
            </Reveal>
          ))}
        </Grid>
      </Container>
    </Section>
  );
};
