'use client';

import styled from 'styled-components';
import { useI18n } from '../i18n/I18nProvider';
import { Container, Grid, Section } from '../design-system/primitives';
import { LinkButton } from '../design-system/components/Button';
import { Reveal } from '../design-system/components/Reveal';

const Card = styled.div`
  background: ${({ theme }) => theme.colors.surface};
  border-radius: ${({ theme }) => theme.radii.xl || theme.radii.lg};
  border: 1px solid ${({ theme }) => theme.colors.border};
  padding: ${({ theme }) => theme.spacing.xl}px;
  box-shadow: ${({ theme }) => theme.shadows.md || theme.shadows.medium};
  display: flex;
  flex-direction: column;
  gap: ${({ theme }) => theme.spacing.md}px;

  @media (max-width: ${({ theme }) => theme.breakpoints.sm}) {
    padding: ${({ theme }) => theme.spacing.lg}px;
  }
`;

const Title = styled.h2`
  font-size: clamp(1.8rem, 3.5vw, 2.6rem);
  line-height: 1.2;
  color: ${({ theme }) => theme.colors.text};
  font-family: ${({ theme }) => theme.typography.fonts.heading};
  font-weight: ${({ theme }) => theme.typography.weights.bold};
  margin: 0;

  @media (max-width: ${({ theme }) => theme.breakpoints.sm}) {
    font-size: clamp(1.4rem, 4.5vw, 1.9rem);
  }
`;

const Text = styled.p`
  color: ${({ theme }) => theme.colors.text};
  font-size: ${({ theme }) => theme.typography.sizes.md};
  line-height: 1.7;
  margin: 0;
  opacity: 0.9;
`;

const BenefitList = styled.ul`
  list-style: none;
  padding: 0;
  margin: ${({ theme }) => theme.spacing.lg}px 0 0 0;
  display: flex;
  flex-direction: column;
  gap: ${({ theme }) => theme.spacing.sm}px;

  @media (max-width: ${({ theme }) => theme.breakpoints.sm}) {
    margin: ${({ theme }) => theme.spacing.md}px 0 0 0;
  }
`;

const BenefitItem = styled.li`
  display: flex;
  align-items: center;
  gap: ${({ theme }) => theme.spacing.sm}px;
  color: ${({ theme }) => theme.colors.text};
  font-size: ${({ theme }) => theme.typography.sizes.md};
  line-height: 1.6;

  @media (max-width: ${({ theme }) => theme.breakpoints.sm}) {
    font-size: ${({ theme }) => theme.typography.sizes.sm};
  }

  &::before {
    content: '✓';
    color: ${({ theme }) => theme.colors.primary};
    font-weight: ${({ theme }) => theme.typography.weights.bold};
    font-size: ${({ theme }) => theme.typography.sizes.lg};
    flex-shrink: 0;
  }
`;

const CTAButton = styled(LinkButton)`
  margin-top: ${({ theme }) => theme.spacing.md}px;
  width: 100%;
  min-height: 44px;
  font-size: ${({ theme }) => theme.typography.sizes.sm};
`;

export const StatisticsSection = () => {
  const { t } = useI18n();
  return (
    <Section background="muted">
      <Container width="wide">
        <Reveal direction="up" duration={900}>
          <Grid columns={2} min="280px" gap="xl">
            <Card>
              <Title>{t('stats.card1Title')}</Title>
              <Text>{t('stats.card1Text')}</Text>
              <BenefitList>
                <BenefitItem>Consulta com tempo adequado para escuta</BenefitItem>
                <BenefitItem>Decisões baseadas em evidências científicas</BenefitItem>
                <BenefitItem>Plano de tratamento claro e personalizado</BenefitItem>
                <BenefitItem>Acompanhamento contínuo e disponibilidade</BenefitItem>
              </BenefitList>
            </Card>
            <Card>
              <Title>{t('stats.card2Title')}</Title>
              <Text>{t('stats.card2Text')}</Text>
              <BenefitList>
                <BenefitItem>Agendamento rápido pelo WhatsApp</BenefitItem>
                <BenefitItem>Atendimento presencial e online</BenefitItem>
                <BenefitItem>Horários flexíveis e amplos</BenefitItem>
                <BenefitItem>Confirmação imediata do agendamento</BenefitItem>
              </BenefitList>
              <CTAButton href="/booking" size="md">
                {t('actions.book')} Agora
              </CTAButton>
            </Card>
          </Grid>
        </Reveal>
      </Container>
    </Section>
  );
};
