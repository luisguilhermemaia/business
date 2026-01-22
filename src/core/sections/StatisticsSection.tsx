'use client';

import styled from 'styled-components';
import { useI18n } from '../i18n/I18nProvider';
import { Container, Grid, Section } from '../design-system/primitives';
import { LinkButton } from '../design-system/components/Button';
import { Reveal } from '../design-system/components/Reveal';

const HighlightSection = styled(Section)`
  background: ${({ theme }) => theme.colors.backgroundAlt};
`;

const Card = styled.div`
  background: ${({ theme }) => theme.colors.surface};
  border-radius: ${({ theme }) => theme.radii.xl || theme.radii.lg};
  border: 1px solid ${({ theme }) => theme.colors.border};
  padding: ${({ theme }) => theme.spacing.xl}px;
  box-shadow: ${({ theme }) => theme.shadows.md || theme.shadows.medium};
  display: flex;
  flex-direction: column;
  gap: ${({ theme }) => theme.spacing.md}px;
`;

const Title = styled.h2`
  font-size: clamp(1.8rem, 3.5vw, 2.6rem);
  line-height: 1.2;
  color: ${({ theme }) => theme.colors.text};
  font-family: ${({ theme }) => theme.typography.fonts.heading};
  font-weight: ${({ theme }) => theme.typography.weights.bold};
  margin: 0;
`;

const Text = styled.p`
  color: ${({ theme }) => theme.colors.textMuted};
  font-size: ${({ theme }) => theme.typography.sizes.md};
  line-height: 1.7;
  margin: 0;
`;

export const StatisticsSection = () => {
  const { t } = useI18n();
  return (
    <HighlightSection>
      <Container width="wide">
        <Reveal>
          <Grid columns={2} min="280px" gap="xl">
            <Card>
              <Title>{t('stats.card1Title')}</Title>
              <Text>{t('stats.card1Text')}</Text>
            </Card>
            <Card>
              <Title>{t('stats.card2Title')}</Title>
              <Text>{t('stats.card2Text')}</Text>
              <LinkButton href="/booking" size="md">
                {t('actions.book')}
              </LinkButton>
            </Card>
          </Grid>
        </Reveal>
      </Container>
    </HighlightSection>
  );
};
