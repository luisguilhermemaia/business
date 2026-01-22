'use client';

import styled from 'styled-components';
import { hexToRgba } from '../utils/colors';
import { useBrand } from '../brand/BrandProvider';
import { useI18n } from '../i18n/I18nProvider';
import { LinkButton } from '../design-system/components/Button';
import { Card, Container, Section, Stack } from '../design-system/primitives';
import { Icon } from '../icons/Icon';
import { Reveal } from '../design-system/components/Reveal';

const Title = styled.h2`
  font-size: clamp(1.9rem, 3.5vw, ${({ theme }) => theme.typography.sizes.xxl});
  line-height: ${({ theme }) => theme.typography.lineHeights?.tight || 1.2};
  margin-bottom: ${({ theme }) => theme.spacing.md}px;
  font-family: ${({ theme }) => theme.typography.fonts.heading};
  letter-spacing: -0.02em;
`;

const Text = styled.p`
  color: ${({ theme }) => theme.colors.text};
  max-width: 650px;
  font-size: ${({ theme }) => theme.typography.sizes.lg};
  line-height: ${({ theme }) => theme.typography.lineHeights?.relaxed || 1.8};
  margin: 0 auto;
  opacity: 0.9;
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
`;

export const CTASection = () => {
  const { content } = useBrand();
  const { t } = useI18n();
  return (
    <Section>
      <Container>
        <Reveal delay={0.1}>
          <CTAWrap>
            <Stack gap="lg" align="center">
              <Title>{t('cta.title')}</Title>
              <Text>{t('cta.subtitle')}</Text>
              <Stack
                direction="row"
                gap="md"
                align="center"
                style={{ flexWrap: 'wrap', justifyContent: 'center' }}
              >
                <PrimaryCTAButton href="/booking" size="md">
                  <Icon name="calendar" size={18} />
                  Agendar Consulta Agora
                </PrimaryCTAButton>
                <SecondaryCTAButton href="/contact" size="md">
                  <Icon name="phone" size={18} />
                  Falar com a Clínica
                </SecondaryCTAButton>
              </Stack>
              <Text
                style={{
                  fontSize: '0.875rem',
                  marginTop: '8px',
                  opacity: 0.8,
                  fontStyle: 'italic',
                }}
              >
                ⚡ Resposta rápida via WhatsApp • Horários disponíveis esta semana
              </Text>
            </Stack>
          </CTAWrap>
        </Reveal>
      </Container>
    </Section>
  );
};
