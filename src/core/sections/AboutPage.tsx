'use client';

import styled from 'styled-components';
import { useBrand } from '../brand/BrandProvider';
import { useI18n } from '../i18n/I18nProvider';
import { Badge } from '../design-system/components/Badge';
import { LinkButton } from '../design-system/components/Button';
import { Card, Container, Grid, Section, Stack } from '../design-system/primitives';
import { Icon } from '../icons/Icon';

const Title = styled.h1`
  font-size: clamp(2rem, 4vw, ${({ theme }) => theme.typography.sizes.xxl});
  line-height: ${({ theme }) => theme.typography.lineHeights?.tight || 1.2};
  margin-bottom: ${({ theme }) => theme.spacing.md}px;
`;

const Subtitle = styled.p`
  color: ${({ theme }) => theme.colors.textMuted};
  max-width: 780px;
  font-size: ${({ theme }) => theme.typography.sizes.lg};
  line-height: ${({ theme }) => theme.typography.lineHeights?.relaxed || 1.75};
  margin-bottom: ${({ theme }) => theme.spacing.xl}px;
`;

const Pillar = styled.div`
  padding: ${({ theme }) => theme.spacing.md}px ${({ theme }) => theme.spacing.lg}px;
  border-radius: ${({ theme }) => theme.radii.md};
  border: 1px solid ${({ theme }) => theme.colors.border};
  background: ${({ theme }) => theme.colors.surface};
  display: flex;
  gap: ${({ theme }) => theme.spacing.sm}px;
  align-items: center;
  font-size: ${({ theme }) => theme.typography.sizes.sm};
  box-shadow: ${({ theme }) => theme.shadows.sm || theme.shadows.soft};
`;

const AccentCard = styled(Card)`
  background: ${({ theme }) => theme.colors.surfaceMuted};
  elevation: md;
`;

export const AboutPage = () => {
  const { content } = useBrand();
  const { t } = useI18n();
  const pillars = t<string[]>('about.pillars');

  return (
    <Section>
      <Container>
        <Stack gap="lg">
          <Badge tone="muted">{content.doctor.specialty}</Badge>
          <Title>{t('about.title')}</Title>
          <Subtitle>{t('about.intro')}</Subtitle>
        </Stack>
        <Grid columns={2} gap="xl">
          <Card elevation="md">
            <Stack gap="lg">
              <h3 style={{ fontSize: '1.5rem', marginBottom: '8px' }}>{content.doctor.name}</h3>
              <p style={{ fontWeight: 600, color: 'inherit', marginBottom: '8px' }}>{content.doctor.registrationLabel}</p>
              <p style={{ color: 'inherit', opacity: 0.8, lineHeight: '1.75', fontSize: '0.95rem' }}>{content.doctor.bio}</p>
              <Stack gap="sm">
                {(pillars || content.doctor.highlights).map((pillar: string) => (
                  <Pillar key={pillar}>
                    <Icon name="check" size={16} />
                    {pillar}
                  </Pillar>
                ))}
              </Stack>
              <LinkButton href="/booking" style={{ marginTop: '8px' }}>
                {t('actions.book')}
              </LinkButton>
            </Stack>
          </Card>
          <AccentCard>
            <Stack gap="lg">
              <Badge tone="accent">{t('about.approachTitle')}</Badge>
              <p style={{ opacity: 0.85, lineHeight: '1.75', fontSize: '0.95rem' }}>{t('about.approach')}</p>
              <Stack direction="row" gap="md" align="center" style={{ marginTop: '8px' }}>
                <Icon name="heart" size={20} />
                <span style={{ fontWeight: 600 }}>{content.doctor.highlights[0]}</span>
              </Stack>
            </Stack>
          </AccentCard>
        </Grid>
      </Container>
    </Section>
  );
};
