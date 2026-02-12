'use client';

import Image from 'next/image';
import Link from 'next/link';
import { ComponentProps } from 'react';
import { useEffect, useRef, useState } from 'react';
import styled from 'styled-components';
import { useBrand } from '../brand/BrandProvider';
import { useI18n } from '../i18n/I18nProvider';
import { Icon } from '../icons/Icon';
import { LinkButton } from '../design-system/components/Button';
import { LanguageSwitcher } from './LanguageSwitcher';
import { Container } from '../design-system/primitives';
import { usePathname } from 'next/navigation';
import { hexToRgba } from '../utils/colors';

const HeaderShell = styled.header<{ $scrolled: boolean }>`
  position: sticky;
  top: 0;
  z-index: ${({ theme }) => theme.zIndex.header};
  background: ${({ theme }) => theme.colors.background};
  border-bottom: 1px solid ${({ theme }) => theme.colors.border};
  transition: all ${({ theme }) => theme.motion?.duration.normal || '250ms'}
    ${({ theme }) => theme.motion?.easing.ease || 'ease'};
  box-shadow: ${({ $scrolled }) => ($scrolled ? `0 1px 3px rgba(0, 0, 0, 0.04)` : 'none')};
`;

const TopBar = styled.div`
  background: ${({ theme }) => theme.colors.tealDark ?? theme.colors.backgroundAlt};
  color: ${({ theme }) => theme.colors.tealDarkContrast ?? theme.colors.text};
  padding: ${({ theme }) => theme.spacing.sm}px 0;
  font-size: ${({ theme }) => theme.typography.sizes.sm};
  border-bottom: 1px solid
    ${({ theme }) => hexToRgba(theme.colors.tealDarkContrast ?? theme.colors.text, 0.12)};

  @media (max-width: ${({ theme }) => theme.breakpoints.lg}) {
    display: none;
  }
`;

const TopBarInner = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: ${({ theme }) => theme.spacing.sm}px;
`;

const TopBarItem = styled.div`
  display: inline-flex;
  align-items: center;
  gap: ${({ theme }) => theme.spacing.sm}px;
  color: ${({ theme }) => theme.colors.tealDarkContrast ?? theme.colors.text};
  font-size: ${({ theme }) => theme.typography.sizes.sm};

  svg {
    flex-shrink: 0;
  }
`;

const Inner = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: ${({ theme }) => theme.spacing.md}px;
  min-height: 80px;
  padding: ${({ theme }) => theme.spacing.md}px 0;

  @media (max-width: ${({ theme }) => theme.breakpoints.lg}) {
    min-height: 72px;
    padding: ${({ theme }) => theme.spacing.sm}px 0;
    gap: ${({ theme }) => theme.spacing.sm}px;
  }

  @media (max-width: ${({ theme }) => theme.breakpoints.sm}) {
    padding-left: env(safe-area-inset-left, 0);
    padding-right: env(safe-area-inset-right, 0);
  }
`;

const BrandMark = styled(Link)<Omit<ComponentProps<typeof Link>, 'href'> & { href: string }>`
  display: inline-flex;
  align-items: center;
  flex-shrink: 0;
  font-size: ${({ theme }) => theme.typography.sizes.xl};
  font-weight: ${({ theme }) => theme.typography.weights.bold};
  color: ${({ theme }) => theme.colors.text};
  text-decoration: none;
  transition: opacity ${({ theme }) => theme.motion?.duration.fast || '150ms'}
    ${({ theme }) => theme.motion?.easing.ease || 'ease'};

  &:hover {
    opacity: 0.85;
  }

  img {
    height: 60px;
    width: auto;
    display: block;
  }

  @media (max-width: ${({ theme }) => theme.breakpoints.lg}) {
    img {
      height: 52px;
      max-width: 200px;
      object-fit: contain;
    }
  }

  @media (max-width: ${({ theme }) => theme.breakpoints.sm}) {
    img {
      height: 46px;
      max-width: 180px;
    }
  }
`;

const Nav = styled.nav`
  display: flex;
  align-items: center;
  gap: ${({ theme }) => theme.spacing.xs}px;
  flex: 1;
  justify-content: center;
  min-width: 0;

  @media (max-width: ${({ theme }) => theme.breakpoints.lg}) {
    display: none;
  }
`;

const NavLink = styled(Link)<
  Omit<ComponentProps<typeof Link>, 'href'> & { href: string; $active?: boolean }
>`
  color: ${({ theme, $active }) => ($active ? theme.colors.primary : theme.colors.text)};
  font-weight: ${({ theme, $active }) =>
    $active ? theme.typography.weights.semi : theme.typography.weights.regular};
  font-size: ${({ theme }) => theme.typography.sizes.md};
  padding: ${({ theme }) => theme.spacing.sm + 2}px ${({ theme }) => theme.spacing.lg}px;
  border-radius: ${({ theme }) => theme.radii.lg};
  transition: all ${({ theme }) => theme.motion?.duration.fast || '150ms'}
    ${({ theme }) => theme.motion?.easing.ease || 'ease'};
  position: relative;
  text-decoration: none;
  white-space: nowrap;

  ${({ $active, theme }) =>
    $active &&
    `
    background: ${hexToRgba(theme.colors.primary, 0.1)};
    color: ${theme.colors.text};
    border: 1px solid ${hexToRgba(theme.colors.primary, 0.3)};
  `}

  &:hover {
    color: ${({ $active, theme }) => ($active ? theme.colors.text : theme.colors.primary)};
    background: ${({ $active, theme }) =>
      $active ? hexToRgba(theme.colors.primary, 0.12) : hexToRgba(theme.colors.primary, 0.06)};
  }

  &:focus-visible {
    outline: 2px solid ${({ theme }) => theme.colors.primary};
    outline-offset: 2px;
  }

  @media (max-width: ${({ theme }) => theme.breakpoints.lg}) {
    padding: ${({ theme }) => theme.spacing.md}px ${({ theme }) => theme.spacing.lg}px;
    font-size: ${({ theme }) => theme.typography.sizes.lg};
    border-radius: ${({ theme }) => theme.radii.lg};
    background: ${({ $active, theme }) =>
      $active ? hexToRgba(theme.colors.primary, 0.1) : 'transparent'};
    color: ${({ $active, theme }) => ($active ? theme.colors.text : theme.colors.text)};
    border: ${({ $active, theme }) =>
      $active ? `1px solid ${hexToRgba(theme.colors.primary, 0.3)}` : '1px solid transparent'};
  }
`;

const Actions = styled.div`
  display: flex;
  align-items: center;
  gap: ${({ theme }) => theme.spacing.md}px;
  flex-shrink: 0;
`;

const MobileToggle = styled.button`
  display: none;
  border: none;
  background: ${({ theme }) => hexToRgba(theme.colors.primary, 0.08)};
  color: ${({ theme }) => theme.colors.primary};
  padding: ${({ theme }) => theme.spacing.sm}px;
  border-radius: ${({ theme }) => theme.radii.pill};
  cursor: pointer;
  transition: all ${({ theme }) => theme.motion?.duration.fast || '150ms'}
    ${({ theme }) => theme.motion?.easing.ease || 'ease'};
  min-width: 44px;
  min-height: 44px;
  width: 44px;
  height: 44px;
  align-items: center;
  justify-content: center;

  &:hover {
    background: ${({ theme }) => hexToRgba(theme.colors.primary, 0.16)};
    transform: translateY(-1px);
  }

  &:active {
    transform: scale(0.98);
  }

  &:focus-visible {
    outline: 2px solid ${({ theme }) => theme.colors.primary};
    outline-offset: 2px;
  }

  @media (max-width: ${({ theme }) => theme.breakpoints.lg}) {
    display: inline-flex;
  }
`;

const DesktopOnly = styled.div`
  display: inline-flex;
  align-items: center;
  gap: ${({ theme }) => theme.spacing.md}px;
  @media (max-width: ${({ theme }) => theme.breakpoints.lg}) {
    display: none;
  }
`;

const MobileOnly = styled.div`
  display: none;
  @media (max-width: ${({ theme }) => theme.breakpoints.lg}) {
    display: block;
    position: relative;
    z-index: ${({ theme }) => theme.zIndex.overlay + 1};
  }
`;

const MobileMenuOverlay = styled.div<{ $open: boolean }>`
  display: none;
  position: fixed;
  inset: 0;
  background: ${({ theme }) => theme.colors.overlay};
  backdrop-filter: blur(3px);
  z-index: ${({ theme }) => theme.zIndex.overlay};
  opacity: ${({ $open }) => ($open ? 1 : 0)};
  pointer-events: ${({ $open }) => ($open ? 'auto' : 'none')};
  transition: opacity ${({ theme }) => theme.motion?.duration.normal || '250ms'}
    ${({ theme }) => theme.motion?.easing.ease || 'ease'};

  @media (max-width: ${({ theme }) => theme.breakpoints.lg}) {
    display: block;
  }
`;

const MobileMenuPanel = styled.aside<{ $open: boolean }>`
  display: none;

  @media (max-width: ${({ theme }) => theme.breakpoints.lg}) {
    display: flex;
    position: fixed;
    top: 0;
    right: 0;
    bottom: 0;
    left: 0;
    width: min(100vw, 360px);
    margin-left: auto;
    height: 100vh;
    height: 100dvh;
    padding: max(env(safe-area-inset-top), ${({ theme }) => theme.spacing.lg}px)
      max(env(safe-area-inset-right), ${({ theme }) => theme.spacing.lg}px)
      max(env(safe-area-inset-bottom), ${({ theme }) => theme.spacing.xl}px)
      max(env(safe-area-inset-left), ${({ theme }) => theme.spacing.xl}px);
    background: ${({ theme }) => theme.colors.surface};
    z-index: ${({ theme }) => theme.zIndex.overlay + 1};
    box-shadow: -8px 0 32px rgba(42, 66, 66, 0.15);
    transform: translateX(${({ $open }) => ($open ? '0' : '100%')});
    transition: transform ${({ theme }) => theme.motion?.duration.slow || '350ms'}
      ${({ theme }) => theme.motion?.easing.easeOut || 'cubic-bezier(0, 0, 0.2, 1)'};
    flex-direction: column;
    gap: ${({ theme }) => theme.spacing.md}px;
    overflow-y: auto;
    overflow-x: hidden;
    pointer-events: ${({ $open }) => ($open ? 'auto' : 'none')};
    -webkit-overflow-scrolling: touch;
  }
`;

const MobileMenuHeader = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: ${({ theme }) => theme.spacing.md}px;
  padding-bottom: ${({ theme }) => theme.spacing.md}px;
  border-bottom: 1px solid ${({ theme }) => theme.colors.border};
`;

const MobileMenuBody = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${({ theme }) => theme.spacing.sm}px;
  flex: 1;
`;

const MobileMenuFooter = styled.div`
  margin-top: auto;
  display: flex;
  flex-direction: column;
  gap: ${({ theme }) => theme.spacing.md}px;
  padding-top: ${({ theme }) => theme.spacing.lg}px;
  border-top: 1px solid ${({ theme }) => theme.colors.border};
`;

const MobileNavLink = styled(NavLink)`
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 100%;
  font-size: ${({ theme }) => theme.typography.sizes.md};
  min-height: 48px;
  padding: ${({ theme }) => theme.spacing.md}px ${({ theme }) => theme.spacing.lg}px;
  border-radius: ${({ theme }) => theme.radii.lg};
  background: ${({ theme }) => hexToRgba(theme.colors.primary, 0.04)};

  &:hover {
    background: ${({ theme }) => hexToRgba(theme.colors.primary, 0.1)};
  }

  @media (max-width: ${({ theme }) => theme.breakpoints.sm}) {
    min-height: 52px;
    padding: ${({ theme }) => theme.spacing.lg}px ${({ theme }) => theme.spacing.xl}px;
  }
`;

const MainCTA = styled(LinkButton)`
  background: transparent !important;
  color: ${({ theme }) => theme.colors.text} !important;
  border: 1.5px solid ${({ theme }) => hexToRgba(theme.colors.primary, 0.4)} !important;
  box-shadow: none !important;
  font-weight: ${({ theme }) => theme.typography.weights.medium} !important;

  &:hover:not(:disabled) {
    background: ${({ theme }) => hexToRgba(theme.colors.primary, 0.08)} !important;
    color: ${({ theme }) => theme.colors.text} !important;
    border-color: ${({ theme }) => hexToRgba(theme.colors.primary, 0.6)} !important;
    transform: translateY(-1px);
    box-shadow: 0 2px 6px rgba(0, 0, 0, 0.06) !important;
  }

  &:active:not(:disabled) {
    transform: translateY(0);
  }

  @media (max-width: ${({ theme }) => theme.breakpoints.lg}) {
    display: none;
  }
`;

export const Header = () => {
  const { content, logo } = useBrand();
  const { t } = useI18n();
  const pathname = usePathname();
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const navRef = useRef<HTMLElement>(null);
  const ctaHref = '/booking';

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    handleScroll();
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    if (open) {
      document.body.style.overflow = 'hidden';
      const firstFocusable = navRef.current?.querySelector<HTMLElement>(
        'a[href], button:not([disabled]), [tabindex]:not([tabindex="-1"])'
      );
      firstFocusable?.focus();
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [open]);

  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && open) {
        setOpen(false);
      }
    };
    window.addEventListener('keydown', handleEscape);
    return () => window.removeEventListener('keydown', handleEscape);
  }, [open]);

  const navItems = [
    { href: '/', label: t('nav.home') },
    { href: '/about', label: t('nav.about') },
    { href: '/services', label: t('nav.services') },
    { href: '/location', label: t('nav.location') },
    { href: '/blog', label: t('nav.blog') },
    { href: '/contact', label: t('nav.contact') },
  ];

  return (
    <HeaderShell $scrolled={scrolled}>
      <TopBar>
        <Container width="wide">
          <TopBarInner>
            <TopBarItem>
              <Icon name="location" size={16} />
              {t('hero.topBar')}
            </TopBarItem>
          </TopBarInner>
        </Container>
      </TopBar>
      <Container width="wide">
        <Inner>
          <BrandMark href="/">
            {logo ? (
              <Image src={logo} alt={content.doctor.name} width={240} height={60} priority />
            ) : (
              <span>{content.doctor.name}</span>
            )}
          </BrandMark>
          <DesktopOnly>
            <Nav>
              {navItems.map((item) => (
                <NavLink key={item.href} href={item.href} $active={pathname === item.href}>
                  {item.label}
                </NavLink>
              ))}
            </Nav>
          </DesktopOnly>
          <Actions>
            <DesktopOnly>
              <LanguageSwitcher />
              <MainCTA href={ctaHref} size="sm" variant="primary">
                {t('actions.book')}
              </MainCTA>
            </DesktopOnly>
            <MobileOnly>
              <MobileToggle onClick={() => setOpen((prev) => !prev)} aria-label="Toggle navigation">
                <Icon name={open ? 'close' : 'menu'} size={22} />
              </MobileToggle>
            </MobileOnly>
          </Actions>
        </Inner>
      </Container>
      <MobileMenuOverlay $open={open} onClick={() => setOpen(false)} aria-hidden="true" />
      <MobileMenuPanel ref={navRef} $open={open} aria-label="Mobile navigation">
        <MobileMenuHeader>
          <BrandMark href="/" onClick={() => setOpen(false)}>
            {logo ? (
              <Image src={logo} alt={content.doctor.name} width={200} height={52} />
            ) : (
              <span>{content.doctor.name}</span>
            )}
          </BrandMark>
          <MobileToggle onClick={() => setOpen(false)} aria-label="Close navigation">
            <Icon name="close" size={22} />
          </MobileToggle>
        </MobileMenuHeader>
        <MobileMenuBody>
          {navItems.map((item) => (
            <MobileNavLink
              key={item.href}
              href={item.href}
              onClick={() => setOpen(false)}
              $active={pathname === item.href}
            >
              {item.label}
            </MobileNavLink>
          ))}
        </MobileMenuBody>
        <MobileMenuFooter>
          <LanguageSwitcher />
          <LinkButton href={ctaHref} fullWidth onClick={() => setOpen(false)}>
            {t('actions.book')}
          </LinkButton>
        </MobileMenuFooter>
      </MobileMenuPanel>
    </HeaderShell>
  );
};
