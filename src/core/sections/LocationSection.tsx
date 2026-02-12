'use client';

import styled from 'styled-components';
import { useBrand } from '../brand/BrandProvider';
import { useI18n } from '../i18n/I18nProvider';
import { Badge } from '../design-system/components/Badge';
import { Card, Container, Grid, Section, Stack } from '../design-system/primitives';
import { Icon } from '../icons/Icon';
import { LinkButton } from '../design-system/components/Button';
import { Reveal } from '../design-system/components/Reveal';

const Title = styled.h2`
  font-size: ${({ theme }) => theme.typography.sizes.xxl};
  line-height: ${({ theme }) => theme.typography.lineHeights?.tight || 1.2};
  margin-bottom: ${({ theme }) => theme.spacing.md}px;

  @media (max-width: ${({ theme }) => theme.breakpoints.sm}) {
    font-size: clamp(1.5rem, 5vw, 2rem);
  }
`;

const Info = styled.p`
  color: ${({ theme }) => theme.colors.textMuted};
  font-size: ${({ theme }) => theme.typography.sizes.sm};
  line-height: ${({ theme }) => theme.typography.lineHeights?.relaxed || 1.75};
`;

const MapFrame = styled.iframe`
  width: 100%;
  border: none;
  border-radius: ${({ theme }) => theme.radii.lg};
  height: 450px;
  min-height: 400px;
  box-shadow: ${({ theme }) => theme.shadows.md || theme.shadows.medium};

  @media (max-width: ${({ theme }) => theme.breakpoints.md}) {
    height: 350px;
    min-height: 300px;
  }

  @media (max-width: ${({ theme }) => theme.breakpoints.sm}) {
    height: 280px;
    min-height: 240px;
  }
`;

const MapsButton = styled(LinkButton)`
  @media (max-width: ${({ theme }) => theme.breakpoints.sm}) {
    min-height: 44px;
    font-size: ${({ theme }) => theme.typography.sizes.sm};
  }
`;

export const LocationSection = () => {
  const { content } = useBrand();
  const { t } = useI18n();
  return (
    <Section background="muted">
      <Container width="wide">
        <Stack gap="md">
          <Badge tone="teal">{t('location.title')}</Badge>
          <Title>{t('location.headline')}</Title>
          <Info>{t('location.description')}</Info>
        </Stack>
        <Grid columns={2} gap="xl">
          <Reveal direction="right" duration={800}>
            <Card elevation="md" style={{ display: 'flex', flexDirection: 'column' }}>
              <Stack gap="lg">
                <div>
                  <Info style={{ fontWeight: 600, color: 'inherit', marginBottom: '8px' }}>
                    {content.location.addressLine}
                  </Info>
                  <Info>
                    {content.location.neighborhood} • {content.location.city}/
                    {content.location.state}
                  </Info>
                </div>
                <Stack gap="sm">
                  {content.location.openingHours.map((line) => (
                    <Info key={line} style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                      <Icon name="clock" size={16} /> {line}
                    </Info>
                  ))}
                </Stack>
                {content.location.mapsLink && (
                  <MapsButton
                    href={content.location.mapsLink}
                    target="_blank"
                    rel="noreferrer noopener"
                    size="md"
                    style={{ marginTop: 'auto' }}
                  >
                    <Icon name="location" size={16} />
                    {t('location.openMaps')}
                  </MapsButton>
                )}
              </Stack>
            </Card>
          </Reveal>
          <Reveal delay={0.15} direction="left" duration={800}>
            <Card style={{ padding: 0, overflow: 'hidden' }}>
              {content.location.mapEmbedUrl ? (
                <MapFrame
                  src={content.location.mapEmbedUrl}
                  loading="lazy"
                  allowFullScreen
                  title="Localização do consultório"
                />
              ) : null}
            </Card>
          </Reveal>
        </Grid>
      </Container>
    </Section>
  );
};
