'use client';

import styled from 'styled-components';
import { hexToRgba } from '../utils/colors';
import { useI18n } from '../i18n/I18nProvider';
import { LinkButton } from '../design-system/components/Button';
import { Card, Container, Section, Stack } from '../design-system/primitives';
import { Icon } from '../icons/Icon';
import { Reveal } from '../design-system/components/Reveal';

const Title = styled.h2`
  font-size: clamp(2rem, 4vw, ${({ theme }) => theme.typography.sizes.xxl});
  line-height: ${({ theme }) => theme.typography.lineHeights?.tight || 1.2};
  margin-bottom: ${({ theme }) => theme.spacing.md}px;
  font-family: ${({ theme }) => theme.typography.fonts.heading};
  font-weight: ${({ theme }) => theme.typography.weights.bold};
  letter-spacing: -0.02em;
  color: ${({ theme }) => theme.colors.text};

  @media (max-width: ${({ theme }) => theme.breakpoints.sm}) {
    font-size: clamp(1.5rem, 5vw, 2rem);
  }
`;

const Text = styled.p`
  color: ${({ theme }) => theme.colors.text};
  max-width: 650px;
  font-size: ${({ theme }) => theme.typography.sizes.lg};
  line-height: ${({ theme }) => theme.typography.lineHeights?.relaxed || 1.8};
  margin: 0 auto;
  opacity: 0.9;
  font-weight: ${({ theme }) => theme.typography.weights.medium};

  @media (max-width: ${({ theme }) => theme.breakpoints.sm}) {
    font-size: ${({ theme }) => theme.typography.sizes.md};
  }
`;

const BenefitsList = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: ${({ theme }) => theme.spacing.md}px;
  justify-content: center;
  margin: ${({ theme }) => theme.spacing.lg}px 0;
  padding: ${({ theme }) => theme.spacing.lg}px;
  background: ${({ theme }) => hexToRgba(theme.colors.primary, 0.05)};
  border-radius: ${({ theme }) => theme.radii.lg};
  border: 1px solid ${({ theme }) => hexToRgba(theme.colors.primary, 0.15)};

  @media (max-width: ${({ theme }) => theme.breakpoints.sm}) {
    margin: ${({ theme }) => theme.spacing.md}px 0;
    padding: ${({ theme }) => theme.spacing.md}px;
    gap: ${({ theme }) => theme.spacing.sm}px;
  }
`;

const Benefit = styled.div`
  display: flex;
  align-items: center;
  gap: ${({ theme }) => theme.spacing.sm}px;
  font-size: ${({ theme }) => theme.typography.sizes.sm};
  color: ${({ theme }) => theme.colors.text};
  font-weight: ${({ theme }) => theme.typography.weights.medium};

  &::before {
    content: '✓';
    color: ${({ theme }) => theme.colors.primary};
    font-weight: ${({ theme }) => theme.typography.weights.bold};
    font-size: ${({ theme }) => theme.typography.sizes.md};
  }
`;

const UrgencyText = styled.p`
  font-size: ${({ theme }) => theme.typography.sizes.sm};
  margin-top: ${({ theme }) => theme.spacing.md}px;
  opacity: 0.85;
  font-style: italic;
  color: ${({ theme }) => theme.colors.textMuted};
`;

const CTAButtonsWrap = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: ${({ theme }) => theme.spacing.md}px;
  justify-content: center;

  @media (max-width: ${({ theme }) => theme.breakpoints.sm}) {
    flex-direction: column;
    width: 100%;
    gap: ${({ theme }) => theme.spacing.sm}px;

    a {
      width: 100%;
      min-height: 44px;
      justify-content: center;
      font-size: ${({ theme }) => theme.typography.sizes.sm};
    }
  }
`;

const PrimaryCTAButton = styled(LinkButton)`
  background: ${({ theme }) => theme.colors.tealDark || theme.colors.text} !important;
  color: ${({ theme }) => theme.colors.tealDarkContrast || '#FFFFFF'} !important;
  border: 1.5px solid ${({ theme }) => theme.colors.tealDark || theme.colors.text} !important;
  box-shadow: 0 2px 8px ${({ theme }) => hexToRgba(theme.colors.tealDark || theme.colors.text, 0.2)} !important;
  font-weight: ${({ theme }) => theme.typography.weights.semi} !important;

  &:hover:not(:disabled) {
    background: ${({ theme }) => theme.colors.tealDark || theme.colors.text} !important;
    opacity: 0.9;
    transform: translateY(-1px);
    box-shadow: 0 4px 12px
      ${({ theme }) => hexToRgba(theme.colors.tealDark || theme.colors.text, 0.3)} !important;
  }

  &:active:not(:disabled) {
    transform: translateY(0);
  }
`;

const SecondaryCTAButton = styled(LinkButton)`
  background: transparent !important;
  color: ${({ theme }) => theme.colors.tealDark || theme.colors.text} !important;
  border: 1.5px solid ${({ theme }) => theme.colors.tealDark || theme.colors.text} !important;
  box-shadow: none !important;
  font-weight: ${({ theme }) => theme.typography.weights.medium} !important;

  &:hover:not(:disabled) {
    background: ${({ theme }) =>
      hexToRgba(theme.colors.tealDark || theme.colors.text, 0.08)} !important;
    color: ${({ theme }) => theme.colors.tealDark || theme.colors.text} !important;
    border-color: ${({ theme }) => theme.colors.tealDark || theme.colors.text} !important;
    transform: translateY(-1px);
    box-shadow: 0 2px 6px
      ${({ theme }) => hexToRgba(theme.colors.tealDark || theme.colors.text, 0.15)} !important;
  }

  &:active:not(:disabled) {
    transform: translateY(0);
    background: ${({ theme }) =>
      hexToRgba(theme.colors.tealDark || theme.colors.text, 0.12)} !important;
  }
`;

const CTAWrap = styled(Card)`
  background: ${({ theme }) => theme.colors.surface};
  border: 1px solid ${({ theme }) => theme.colors.border};
  padding: ${({ theme }) => theme.spacing.xxl * 1.5}px;
  text-align: center;
  elevation: lg;
  border-radius: ${({ theme }) => theme.radii['2xl'] || theme.radii.xl || theme.radii.lg};
  box-shadow: ${({ theme }) => theme.shadows.md || theme.shadows.medium};

  @media (max-width: ${({ theme }) => theme.breakpoints.md}) {
    padding: ${({ theme }) => theme.spacing.xl * 1.5}px;
  }

  @media (max-width: ${({ theme }) => theme.breakpoints.sm}) {
    padding: ${({ theme }) => theme.spacing.lg}px;
  }
`;

export const CTASection = () => {
  const { t } = useI18n();
  return (
    <Section>
      <Container>
        <Reveal delay={0.08} direction="scale" duration={950}>
          <CTAWrap>
            <Stack gap="lg" align="center">
              <Title>{t('cta.title')}</Title>
              <Text>{t('cta.subtitle')}</Text>
              <BenefitsList>
                <Benefit>Consulta com tempo adequado</Benefit>
                <Benefit>Resposta em até 24h</Benefit>
                <Benefit>Atendimento presencial e online</Benefit>
                <Benefit>Plano de tratamento personalizado</Benefit>
              </BenefitsList>
              <CTAButtonsWrap>
                <PrimaryCTAButton href="/booking" size="md">
                  <Icon name="calendar" size={18} />
                  Agendar Consulta Agora
                </PrimaryCTAButton>
                <SecondaryCTAButton href="/contact" size="md">
                  <Icon name="phone" size={18} />
                  Falar com a Clínica
                </SecondaryCTAButton>
              </CTAButtonsWrap>
              <UrgencyText>
                ⚡ Resposta rápida via WhatsApp • Horários disponíveis esta semana • Primeira
                consulta com acolhimento especial
              </UrgencyText>
            </Stack>
          </CTAWrap>
        </Reveal>
      </Container>
    </Section>
  );
};
