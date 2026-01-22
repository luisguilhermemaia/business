'use client';

import styled from 'styled-components';
import { useBrand } from '../brand/BrandProvider';
import { useI18n } from '../i18n/I18nProvider';
import { Container, Section, Grid } from '../design-system/primitives';
import { Icon } from '../icons/Icon';

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
        <Grid min="260px" gap={12}>
          {[inPerson, online].map((item, idx) => (
            <Pill key={item}>
              <Icon name={idx === 0 ? 'location' : 'calendar'} size={16} />
              {item}
            </Pill>
          ))}
        </Grid>
      </Container>
    </Strip>
  );
};
