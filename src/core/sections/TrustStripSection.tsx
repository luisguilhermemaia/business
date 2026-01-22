'use client';

import styled from 'styled-components';
import { useBrand } from '../brand/BrandProvider';
import { useI18n } from '../i18n/I18nProvider';
import { Container, Section, Grid } from '../design-system/primitives';
import { Icon } from '../icons/Icon';
import { Reveal } from '../design-system/components/Reveal';

const Strip = styled(Section)`
  padding: ${({ theme }) => theme.spacing.lg}px 0;
  background: ${({ theme }) => theme.colors.tealDark ?? theme.colors.surfaceMuted};
  border-top: 1px solid
    ${({ theme }) => (theme.colors.tealDark ? 'transparent' : theme.colors.border)};
  border-bottom: 1px solid
    ${({ theme }) => (theme.colors.tealDark ? 'transparent' : theme.colors.border)};
`;

const Pill = styled.div`
  display: flex;
  align-items: center;
  gap: ${({ theme }) => theme.spacing.md}px;
  padding: ${({ theme }) => theme.spacing.sm + 2}px ${({ theme }) => theme.spacing.lg}px;
  border-radius: ${({ theme }) => theme.radii.pill};
  border: 1px solid ${({ theme }) =>
    (theme.colors.tealDark ? 'rgba(255, 255, 255, 0.2)' : theme.colors.border)};
  background: ${({ theme }) => theme.colors.surface};
  color: ${({ theme }) => theme.colors.text};
  justify-content: center;
  font-size: ${({ theme }) => theme.typography.sizes.sm};
  font-weight: ${({ theme }) => theme.typography.weights.semi};
`;

const StatPill = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: ${({ theme }) => theme.spacing.xs}px;
  padding: ${({ theme }) => theme.spacing.md}px ${({ theme }) => theme.spacing.lg}px;
  border-radius: ${({ theme }) => theme.radii.lg};
  background: ${({ theme }) => theme.colors.surface};
  color: ${({ theme }) => theme.colors.text};
  text-align: center;
  min-width: 140px;
`;

const StatNumber = styled.div`
  font-size: ${({ theme }) => theme.typography.sizes.xxl};
  font-weight: ${({ theme }) => theme.typography.weights.bold};
  color: ${({ theme }) => theme.colors.primary};
  line-height: 1;
  font-family: ${({ theme }) => theme.typography.fonts.heading};
`;

const StatLabel = styled.div`
  font-size: ${({ theme }) => theme.typography.sizes.xs};
  color: ${({ theme }) => theme.colors.textMuted};
  font-weight: ${({ theme }) => theme.typography.weights.medium};
  text-transform: uppercase;
  letter-spacing: 0.05em;
`;

export const TrustStripSection = () => {
  const { content } = useBrand();
  const { t } = useI18n();
  const inPerson = t('trustStrip.inPerson', {
    city: content.location.city,
    state: content.location.state,
  });
  const online = t('trustStrip.online');
  return (
    <Strip>
      <Container width="wide">
        <Grid min="200px" gap="md">
          {[inPerson, online].map((item, idx) => (
            <Reveal key={item} delay={idx * 0.1} direction="fade" duration={600}>
              <Pill>
                <Icon name={idx === 0 ? 'location' : 'calendar'} size={16} />
                {item}
              </Pill>
            </Reveal>
          ))}
          <Reveal delay={0.2} direction="scale" duration={700}>
            <StatPill>
              <StatNumber>15+</StatNumber>
              <StatLabel>Anos de Experiência</StatLabel>
            </StatPill>
          </Reveal>
          <Reveal delay={0.3} direction="scale" duration={700}>
            <StatPill>
              <StatNumber>500+</StatNumber>
              <StatLabel>Pacientes Atendidas</StatLabel>
            </StatPill>
          </Reveal>
        </Grid>
      </Container>
    </Strip>
  );
};
