'use client';

import Link from 'next/link';
import { useEffect, useRef, useState } from 'react';
import styled from 'styled-components';
import { getCookie, setCookie } from 'cookies-next';
import { useI18n } from '../i18n/I18nProvider';
import { hexToRgba } from '../utils/colors';

const COOKIE_CONSENT_KEY = 'site-cookie-consent';
const COOKIE_CONSENT_VERSION = 1;
const COOKIE_MAX_AGE_SECONDS = 60 * 60 * 24 * 180;
export const OPEN_COOKIE_PREFERENCES_EVENT = 'open-cookie-preferences';

interface CookieConsentPayload {
  version: number;
  necessary: true;
  analytics: boolean;
  marketing: boolean;
  consentedAt: string;
}

const Root = styled.div`
  position: fixed;
  left: 0;
  right: 0;
  bottom: 0;
  z-index: ${({ theme }) => theme.zIndex.overlay - 10};
  border-top: 1px solid ${({ theme }) => hexToRgba(theme.colors.text, 0.15)};
  background: ${({ theme }) => hexToRgba(theme.colors.surface, 0.97)};
  backdrop-filter: blur(4px);
  box-shadow: 0 -8px 24px ${({ theme }) => hexToRgba(theme.colors.text, 0.14)};
`;

const Inner = styled.div`
  max-width: ${({ theme }) => theme.containerWidth.wide};
  margin: 0 auto;
  padding: 10px 16px;
  display: grid;
  gap: 8px;

  @media (max-width: ${({ theme }) => theme.breakpoints.sm}) {
    padding: 10px 12px;
    gap: 8px;
  }
`;

const MessageRow = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 12px;

  @media (max-width: ${({ theme }) => theme.breakpoints.md}) {
    flex-direction: column;
    align-items: stretch;
    gap: 10px;
  }
`;

const Message = styled.p`
  color: ${({ theme }) => hexToRgba(theme.colors.text, 0.8)};
  font-size: 0.97rem;
  line-height: 1.35;
  margin: 0;
`;

const PrivacyLink = styled(Link)<{ href: string }>`
  margin-left: 4px;
  color: ${({ theme }) => hexToRgba(theme.colors.text, 0.85)};
  font-weight: ${({ theme }) => theme.typography.weights.semi};
  text-decoration: none;

  &::after {
    content: none !important;
    display: none !important;
  }

  &:hover {
    color: ${({ theme }) => theme.colors.primaryStrong};
  }
`;

const Actions = styled.div`
  display: inline-flex;
  align-items: center;
  justify-content: flex-end;
  gap: 8px;
  flex-wrap: nowrap;

  @media (max-width: ${({ theme }) => theme.breakpoints.md}) {
    flex-wrap: wrap;
    justify-content: flex-start;
  }
`;

const Button = styled.button<{ $tone?: 'primary' | 'neutral' }>`
  min-height: 34px;
  border-radius: ${({ theme }) => theme.radii.sm};
  border: 1px solid
    ${({ theme, $tone = 'neutral' }) =>
      $tone === 'primary' ? theme.colors.primary : hexToRgba(theme.colors.text, 0.2)};
  background: ${({ theme, $tone = 'neutral' }) =>
    $tone === 'primary' ? theme.colors.primary : 'transparent'};
  color: ${({ theme, $tone = 'neutral' }) =>
    $tone === 'primary' ? theme.colors.primaryContrast : hexToRgba(theme.colors.text, 0.86)};
  padding: 0 12px;
  font-size: 0.78rem;
  font-weight: ${({ theme }) => theme.typography.weights.bold};
  text-transform: uppercase;
  letter-spacing: 0.01em;
  white-space: nowrap;
  cursor: pointer;
  transition:
    background ${({ theme }) => theme.motion?.duration.fast || '150ms'}
      ${({ theme }) => theme.motion?.easing.ease || 'ease'},
    border-color ${({ theme }) => theme.motion?.duration.fast || '150ms'}
      ${({ theme }) => theme.motion?.easing.ease || 'ease'},
    transform ${({ theme }) => theme.motion?.duration.fast || '150ms'}
      ${({ theme }) => theme.motion?.easing.ease || 'ease'};

  &:hover {
    transform: translateY(-1px);
    border-color: ${({ theme, $tone = 'neutral' }) =>
      $tone === 'primary' ? theme.colors.primaryStrong : hexToRgba(theme.colors.text, 0.35)};
    background: ${({ theme, $tone = 'neutral' }) =>
      $tone === 'primary' ? theme.colors.primaryStrong : hexToRgba(theme.colors.text, 0.04)};
  }
`;

const PreferencesPanel = styled.div`
  border: 1px solid ${({ theme }) => hexToRgba(theme.colors.text, 0.14)};
  border-radius: ${({ theme }) => theme.radii.md};
  background: ${({ theme }) => hexToRgba(theme.colors.surface, 0.92)};
  padding: 10px;
  display: grid;
  gap: 8px;
`;

const PreferencesTitle = styled.p`
  margin: 0;
  font-size: ${({ theme }) => theme.typography.sizes.sm};
  font-weight: ${({ theme }) => theme.typography.weights.bold};
  color: ${({ theme }) => theme.colors.text};
`;

const PreferencesDescription = styled.p`
  margin: 0;
  font-size: 0.8rem;
  color: ${({ theme }) => hexToRgba(theme.colors.text, 0.75)};
`;

const Toggle = styled.label`
  min-height: 34px;
  padding: 0 10px;
  border: 1px solid ${({ theme }) => hexToRgba(theme.colors.text, 0.12)};
  border-radius: ${({ theme }) => theme.radii.sm};
  background: ${({ theme }) => hexToRgba(theme.colors.surface, 0.85)};
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 10px;
  font-size: 0.8rem;
`;

const ToggleLabel = styled.span`
  color: ${({ theme }) => hexToRgba(theme.colors.text, 0.9)};
`;

const ToggleInput = styled.input`
  width: 16px;
  height: 16px;
  accent-color: ${({ theme }) => theme.colors.primary};
`;

const parseConsentPayload = (value: string | undefined): CookieConsentPayload | null => {
  if (!value) return null;
  try {
    const parsed = JSON.parse(value) as Partial<CookieConsentPayload>;
    if (
      parsed &&
      parsed.version === COOKIE_CONSENT_VERSION &&
      typeof parsed.analytics === 'boolean' &&
      typeof parsed.marketing === 'boolean'
    ) {
      return {
        version: COOKIE_CONSENT_VERSION,
        necessary: true,
        analytics: parsed.analytics,
        marketing: parsed.marketing,
        consentedAt: parsed.consentedAt || new Date().toISOString(),
      };
    }
  } catch {
    return null;
  }
  return null;
};

export const CookieConsentBanner = ({ policyHref = '/politica-de-privacidade' }) => {
  const { t } = useI18n();
  const rootRef = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);
  const [preferencesOpen, setPreferencesOpen] = useState(false);
  const [analytics, setAnalytics] = useState(false);
  const [marketing, setMarketing] = useState(false);

  useEffect(() => {
    const stored = getCookie(COOKIE_CONSENT_KEY);
    const normalized = typeof stored === 'string' ? stored : undefined;
    const parsed = parseConsentPayload(normalized);

    if (parsed) {
      setAnalytics(parsed.analytics);
      setMarketing(parsed.marketing);
      setVisible(false);
      return;
    }

    setVisible(true);
  }, []);

  useEffect(() => {
    if (typeof window === 'undefined') return;

    const handleOpenPreferences = () => {
      setVisible(true);
      setPreferencesOpen(true);
    };

    window.addEventListener(OPEN_COOKIE_PREFERENCES_EVENT, handleOpenPreferences);
    return () => window.removeEventListener(OPEN_COOKIE_PREFERENCES_EVENT, handleOpenPreferences);
  }, []);

  useEffect(() => {
    if (typeof window === 'undefined') return;

    const root = document.documentElement;
    if (!visible) {
      root.style.setProperty('--cookie-banner-offset', '0px');
      return;
    }

    const updateOffset = () => {
      const nextOffset = (rootRef.current?.getBoundingClientRect().height || 0) + 12;
      root.style.setProperty('--cookie-banner-offset', `${Math.ceil(nextOffset)}px`);
    };

    updateOffset();
    window.addEventListener('resize', updateOffset);
    return () => {
      window.removeEventListener('resize', updateOffset);
      root.style.setProperty('--cookie-banner-offset', '0px');
    };
  }, [visible, preferencesOpen]);

  const savePreferences = (nextAnalytics: boolean, nextMarketing: boolean) => {
    const payload: CookieConsentPayload = {
      version: COOKIE_CONSENT_VERSION,
      necessary: true,
      analytics: nextAnalytics,
      marketing: nextMarketing,
      consentedAt: new Date().toISOString(),
    };

    setCookie(COOKIE_CONSENT_KEY, JSON.stringify(payload), {
      maxAge: COOKIE_MAX_AGE_SECONDS,
      path: '/',
      sameSite: 'lax',
    });
    setVisible(false);
    setPreferencesOpen(false);
  };

  if (!visible) return null;

  return (
    <Root ref={rootRef}>
      <Inner>
        <MessageRow>
          <Message>
            {t('cookies.message')}{' '}
            <PrivacyLink href={policyHref}>{t('cookies.privacyPolicy')}</PrivacyLink>
          </Message>

          <Actions>
            <Button type="button" onClick={() => setPreferencesOpen((current) => !current)}>
              {preferencesOpen ? t('cookies.hideSettings') : t('cookies.manage')}
            </Button>
            <Button type="button" $tone="primary" onClick={() => savePreferences(true, true)}>
              {t('cookies.acceptAndContinue')}
            </Button>
          </Actions>
        </MessageRow>

        {preferencesOpen ? (
          <PreferencesPanel>
            <PreferencesTitle>{t('cookies.manageTitle')}</PreferencesTitle>
            <PreferencesDescription>{t('cookies.manageDescription')}</PreferencesDescription>

            <Toggle>
              <ToggleLabel>{t('cookies.necessary')}</ToggleLabel>
              <ToggleInput type="checkbox" checked disabled aria-label={t('cookies.necessary')} />
            </Toggle>

            <Toggle>
              <ToggleLabel>{t('cookies.analytics')}</ToggleLabel>
              <ToggleInput
                type="checkbox"
                checked={analytics}
                onChange={(event) => setAnalytics(event.target.checked)}
                aria-label={t('cookies.analytics')}
              />
            </Toggle>

            <Toggle>
              <ToggleLabel>{t('cookies.marketing')}</ToggleLabel>
              <ToggleInput
                type="checkbox"
                checked={marketing}
                onChange={(event) => setMarketing(event.target.checked)}
                aria-label={t('cookies.marketing')}
              />
            </Toggle>

            <Actions>
              <Button type="button" onClick={() => savePreferences(false, false)}>
                {t('cookies.rejectOptional')}
              </Button>
              <Button type="button" $tone="primary" onClick={() => savePreferences(analytics, marketing)}>
                {t('cookies.savePreferences')}
              </Button>
            </Actions>
          </PreferencesPanel>
        ) : null}
      </Inner>
    </Root>
  );
};
