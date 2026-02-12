import Link from 'next/link';
import { ComponentProps } from 'react';
import styled from 'styled-components';
import { hexToRgba } from '../utils/colors';
import { useBrand } from '../brand/BrandProvider';
import { useI18n } from '../i18n/I18nProvider';
import { Container, Grid, Stack } from '../design-system/primitives';
import { Icon } from '../icons/Icon';
import { SocialIcon } from '../icons/SocialIcon';
import type { SocialPlatform } from '../types/brand';

function inferPlatformFromUrl(url: string): SocialPlatform | null {
  try {
    const host = new URL(url).hostname.toLowerCase();
    if (host.includes('instagram.com')) return 'instagram';
    if (host.includes('facebook.com') || host.includes('fb.com')) return 'facebook';
    if (host.includes('linkedin.com')) return 'linkedin';
    if (host.includes('threads.net')) return 'threads';
    if (host.includes('x.com') || host.includes('twitter.com')) return 'x';
    if (host.includes('youtube.com')) return 'youtube';
  } catch {
    /* ignore */
  }
  return null;
}

const FooterShell = styled.footer`
  background: ${({ theme }) => theme.colors.tealDark ?? theme.colors.backgroundAlt};
  color: ${({ theme }) => theme.colors.tealDarkContrast ?? theme.colors.text};
  padding: ${({ theme }) => theme.spacing.xxl * 2}px 0 ${({ theme }) => theme.spacing.xl}px;
  margin-top: ${({ theme }) => theme.spacing.xxl * 2}px;

  @media (max-width: ${({ theme }) => theme.breakpoints.md}) {
    padding: ${({ theme }) => theme.spacing.xxl}px 0 ${({ theme }) => theme.spacing.xl}px;
    margin-top: ${({ theme }) => theme.spacing.xxl}px;
  }

  @media (max-width: ${({ theme }) => theme.breakpoints.sm}) {
    padding: ${({ theme }) => theme.spacing.xl * 1.5}px 0 ${({ theme }) => theme.spacing.lg}px;
    padding-bottom: max(${({ theme }) => theme.spacing.xl}px, env(safe-area-inset-bottom));
  }
`;

const Title = styled.h3`
  font-size: ${({ theme }) => theme.typography.sizes.xl};
  font-weight: ${({ theme }) => theme.typography.weights.bold};
  margin-bottom: ${({ theme }) => theme.spacing.lg}px;
  color: ${({ theme }) => theme.colors.tealDarkContrast ?? theme.colors.text};
  font-family: ${({ theme }) => theme.typography.fonts.heading};

  @media (max-width: ${({ theme }) => theme.breakpoints.sm}) {
    font-size: ${({ theme }) => theme.typography.sizes.lg};
    margin-bottom: ${({ theme }) => theme.spacing.md}px;
  }
`;

const Text = styled.p`
  color: ${({ theme }) => hexToRgba(theme.colors.tealDarkContrast ?? theme.colors.text, 0.85)};
  line-height: 1.75;
  font-size: ${({ theme }) => theme.typography.sizes.md};
  margin: 0;
`;

const LinkRow = styled(Link)<Omit<ComponentProps<typeof Link>, 'href'> & { href: string }>`
  display: inline-flex;
  align-items: center;
  gap: ${({ theme }) => theme.spacing.sm}px;
  color: ${({ theme }) => hexToRgba(theme.colors.tealDarkContrast ?? theme.colors.text, 0.75)};
  padding: ${({ theme }) => theme.spacing.sm}px 0;
  min-height: 44px;
  font-size: ${({ theme }) => theme.typography.sizes.md};
  transition: all ${({ theme }) => theme.motion?.duration.fast || '150ms'}
    ${({ theme }) => theme.motion?.easing.ease || 'ease'};

  &:hover {
    color: ${({ theme }) => theme.colors.primary};
    transform: translateX(4px);
  }

  &:focus-visible {
    outline: 2px solid ${({ theme }) => theme.colors.primary};
    outline-offset: 2px;
    border-radius: ${({ theme }) => theme.radii.sm};
  }

  svg {
    flex-shrink: 0;
    transition: transform ${({ theme }) => theme.motion?.duration.fast || '150ms'}
      ${({ theme }) => theme.motion?.easing.ease || 'ease'};
  }

  &:hover svg {
    transform: translateX(2px);
  }

  @media (prefers-reduced-motion: reduce) {
    &:hover {
      transform: none;
    }
    &:hover svg {
      transform: none;
    }
  }

  @media (max-width: ${({ theme }) => theme.breakpoints.sm}) {
    padding: ${({ theme }) => theme.spacing.md}px 0;
  }
`;

const SocialLink = styled(Link)<Omit<ComponentProps<typeof Link>, 'href'> & { href: string }>`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 44px;
  height: 44px;
  border-radius: ${({ theme }) => theme.radii.pill};
  border: 1px solid ${({ theme }) =>
    hexToRgba(theme.colors.tealDarkContrast ?? theme.colors.text, 0.25)};
  background: ${({ theme }) => hexToRgba(theme.colors.tealDarkContrast ?? theme.colors.text, 0.08)};
  color: ${({ theme }) => hexToRgba(theme.colors.tealDarkContrast ?? theme.colors.text, 0.9)};
  transition: all ${({ theme }) => theme.motion?.duration.fast || '150ms'}
    ${({ theme }) => theme.motion?.easing.ease || 'ease'};

  &:hover {
    border-color: ${({ theme }) => theme.colors.primary};
    color: ${({ theme }) => theme.colors.primary};
    background: ${({ theme }) => hexToRgba(theme.colors.primary, 0.2)};
    transform: translateY(-3px);
  }

  &:focus-visible {
    outline: 2px solid ${({ theme }) => theme.colors.primary};
    outline-offset: 2px;
  }

  @media (prefers-reduced-motion: reduce) {
    &:hover {
      transform: none;
    }
  }
`;

const FooterBottom = styled.div`
  margin-top: ${({ theme }) => theme.spacing.xl * 2}px;
  padding-top: ${({ theme }) => theme.spacing.xl}px;
  border-top: 1px solid ${({ theme }) =>
    hexToRgba(theme.colors.tealDarkContrast ?? theme.colors.text, 0.2)};
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: ${({ theme }) => theme.spacing.md}px;
  flex-wrap: wrap;
  color: ${({ theme }) => hexToRgba(theme.colors.tealDarkContrast ?? theme.colors.text, 0.65)};
  font-size: ${({ theme }) => theme.typography.sizes.sm};

  @media (max-width: ${({ theme }) => theme.breakpoints.md}) {
    flex-direction: column;
    text-align: center;
    margin-top: ${({ theme }) => theme.spacing.xl}px;
    padding-top: ${({ theme }) => theme.spacing.lg}px;
  }

  @media (max-width: ${({ theme }) => theme.breakpoints.sm}) {
    gap: ${({ theme }) => theme.spacing.sm}px;
    font-size: ${({ theme }) => theme.typography.sizes.xs};
  }
`;

const BrandSection = styled(Stack)`
  max-width: 350px;

  @media (max-width: ${({ theme }) => theme.breakpoints.sm}) {
    max-width: 100%;
  }
`;

const SocialLinks = styled(Stack)`
  margin-top: ${({ theme }) => theme.spacing.md}px;
`;

export const Footer = () => {
  const { content, name } = useBrand();
  const { t } = useI18n();

  const quickLinks = [
    { href: '/', label: t('nav.home') },
    { href: '/about', label: t('nav.about') },
    { href: '/services', label: t('nav.services') },
    { href: '/blog', label: t('nav.blog') },
  ];

  return (
    <FooterShell>
      <Container>
        <Grid min="260px" gap="xl">
          <BrandSection gap="md">
            <Title>{name}</Title>
            <Text>{content.doctor.bio}</Text>
            {content.social && content.social.length > 0 && (
              <SocialLinks direction="row" gap="sm">
                {content.social.map((s) => {
                  const platform =
                    s.platform ?? inferPlatformFromUrl(s.url);
                  return (
                    <SocialLink
                      key={s.url}
                      href={s.url}
                      target="_blank"
                      rel="noreferrer noopener"
                      aria-label={s.label}
                    >
                      {platform ? (
                        <SocialIcon platform={platform} size={20} />
                      ) : (
                        <Icon name="arrow-right" size={18} />
                      )}
                    </SocialLink>
                  );
                })}
              </SocialLinks>
            )}
          </BrandSection>
          <Stack gap="sm">
            <Title>{t('footer.quickLinks')}</Title>
            {quickLinks.map((item) => (
              <LinkRow key={item.href} href={item.href}>
                <Icon name="arrow-right" size={14} />
                {item.label}
              </LinkRow>
            ))}
          </Stack>
          <Stack gap="sm">
            <Title>{t('footer.contact')}</Title>
            <LinkRow href={`mailto:${content.contact.email}`}>
              <Icon name="arrow-right" size={16} />
              {content.contact.email}
            </LinkRow>
            <LinkRow href={`tel:${content.contact.phone}`}>
              <Icon name="phone" size={16} />
              {content.contact.phone}
            </LinkRow>
          </Stack>
          <Stack gap="sm">
            <Title>{t('footer.location')}</Title>
            <Text>
              {content.location.addressLine}
              <br />
              {content.location.neighborhood} • {content.location.city}/{content.location.state}
            </Text>
            {content.location.openingHours && content.location.openingHours.length > 0 && (
              <Text style={{ marginTop: '12px' }}>
                <strong style={{ color: 'inherit', opacity: 1 }}>{t('footer.hours')}:</strong>{' '}
                {content.location.openingHours[0]}
              </Text>
            )}
            {content.location.mapsLink && (
              <LinkRow
                href={content.location.mapsLink}
                target="_blank"
                rel="noreferrer noopener"
                style={{ marginTop: '8px' }}
              >
                <Icon name="location" size={16} />
                {t('footer.map')}
              </LinkRow>
            )}
          </Stack>
        </Grid>
        <FooterBottom>
          <span>{t('footer.rights', { name })}</span>
          <span>{t('footer.madeWithCare')}</span>
        </FooterBottom>
      </Container>
    </FooterShell>
  );
};
