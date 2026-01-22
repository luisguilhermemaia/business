'use client';

import Image from 'next/image';
import Link from 'next/link';
import { useEffect, useRef, useState } from 'react';
import styled from 'styled-components';
import { useBrand } from '../brand/BrandProvider';
import { useI18n } from '../i18n/I18nProvider';
import { Icon } from '../icons/Icon';
import { LinkButton } from '../design-system/components/Button';
import { LanguageSwitcher } from './LanguageSwitcher';
import { Container } from '../design-system/primitives';
import { usePathname } from 'next/navigation';

const HeaderShell = styled.header<{ $scrolled: boolean }>`
  position: sticky;
  top: 0;
  z-index: ${({ theme }) => theme.zIndex.header};
  background: ${({ theme }) => theme.colors.background};
  border-bottom: 1px solid ${({ theme }) => theme.colors.border};
  transition: all ${({ theme }) => theme.motion?.duration.normal || '250ms'} ${({ theme }) => theme.motion?.easing.ease || 'ease'};
  box-shadow: ${({ $scrolled }) =>
    $scrolled 
      ? `0 1px 3px rgba(0, 0, 0, 0.04)`
      : 'none'};
`;

const TopBar = styled.div`
  background: ${({ theme }) => theme.colors.text};
  color: ${({ theme }) => theme.colors.surface};
  padding: ${({ theme }) => theme.spacing.sm}px 0;
  font-size: ${({ theme }) => theme.typography.sizes.sm};
  border-bottom: 1px solid rgba(255, 255, 255, 0.1);

  @media (max-width: ${({ theme }) => theme.breakpoints.md}) {
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
  color: ${({ theme }) => theme.colors.surface};
  font-size: ${({ theme }) => theme.typography.sizes.sm};

  svg {
    flex-shrink: 0;
  }
`;

const Inner = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: ${({ theme }) => theme.spacing.lg}px;
  height: 72px;
  min-height: 72px;

  @media (max-width: ${({ theme }) => theme.breakpoints.md}) {
    height: 64px;
    min-height: 64px;
    gap: ${({ theme }) => theme.spacing.md}px;
  }
`;

const BrandMark = styled(Link)`
  display: inline-flex;
  align-items: center;
  gap: 12px;
  font-size: ${({ theme }) => theme.typography.sizes.xl};
  font-weight: ${({ theme }) => theme.typography.weights.bold};
  color: ${({ theme }) => theme.colors.text};
  text-decoration: none;
  transition: opacity ${({ theme }) => theme.motion?.duration.fast || '150ms'} ${({ theme }) => theme.motion?.easing.ease || 'ease'};
  flex-shrink: 0;

  &:hover {
    opacity: 0.75;
  }

  img {
    height: 42px;
    width: auto;
  }
`;

const Nav = styled.nav`
  display: flex;
  align-items: center;
  gap: ${({ theme }) => theme.spacing.xs}px;
  flex: 1;
  justify-content: center;

  @media (max-width: ${({ theme }) => theme.breakpoints.md}) {
    display: none;
  }
`;

const NavLink = styled(Link)<{ $active?: boolean }>`
  color: ${({ theme, $active }) => $active ? theme.colors.primary : theme.colors.text};
  font-weight: ${({ theme, $active }) => $active ? theme.typography.weights.semi : theme.typography.weights.regular};
  font-size: ${({ theme }) => theme.typography.sizes.md};
  padding: ${({ theme }) => theme.spacing.sm + 2}px ${({ theme }) => theme.spacing.lg}px;
  border-radius: ${({ theme }) => theme.radii.lg};
  transition: all ${({ theme }) => theme.motion?.duration.fast || '150ms'} ${({ theme }) => theme.motion?.easing.ease || 'ease'};
  position: relative;
  text-decoration: none;
  white-space: nowrap;
  
  ${({ $active, theme }) => $active && `
    background: rgba(184, 87, 122, 0.12);
    color: ${theme.colors.primary};
  `}

  &:hover {
    color: ${({ theme }) => theme.colors.primary};
    background: ${({ theme, $active }) => $active ? 'rgba(184, 87, 122, 0.16)' : 'rgba(184, 87, 122, 0.06)'};
  }

  &:focus-visible {
    outline: 2px solid ${({ theme }) => theme.colors.primary};
    outline-offset: 2px;
  }

  @media (max-width: ${({ theme }) => theme.breakpoints.md}) {
    padding: ${({ theme }) => theme.spacing.md}px ${({ theme }) => theme.spacing.lg}px;
    font-size: ${({ theme }) => theme.typography.sizes.lg};
    border-radius: ${({ theme }) => theme.radii.lg};
    background: ${({ theme, $active }) => $active ? 'rgba(184, 87, 122, 0.12)' : 'transparent'};
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
  background: rgba(184, 87, 122, 0.08);
  color: ${({ theme }) => theme.colors.primary};
  padding: ${({ theme }) => theme.spacing.sm}px;
  border-radius: ${({ theme }) => theme.radii.pill};
  cursor: pointer;
  transition: all ${({ theme }) => theme.motion?.duration.fast || '150ms'} ${({ theme }) => theme.motion?.easing.ease || 'ease'};
  width: 42px;
  height: 42px;
  align-items: center;
  justify-content: center;
  
  &:hover {
    background: rgba(184, 87, 122, 0.16);
    transform: translateY(-1px);
  }

  &:active {
    transform: scale(0.98);
  }

  &:focus-visible {
    outline: 2px solid ${({ theme }) => theme.colors.primary};
    outline-offset: 2px;
  }

  @media (max-width: ${({ theme }) => theme.breakpoints.md}) {
    display: inline-flex;
  }
`;

const DesktopOnly = styled.div`
  display: inline-flex;
  align-items: center;
  gap: ${({ theme }) => theme.spacing.md}px;
  @media (max-width: ${({ theme }) => theme.breakpoints.md}) {
    display: none;
  }
`;

const MobileOnly = styled.div`
  display: none;
  @media (max-width: ${({ theme }) => theme.breakpoints.md}) {
    display: block;
    position: relative;
    z-index: ${({ theme }) => theme.zIndex.overlay + 1};
  }
`;

const MobileMenuOverlay = styled.div<{ $open: boolean }>`
  display: none;
  position: fixed;
  inset: 0;
  background: rgba(10, 6, 12, 0.35);
  backdrop-filter: blur(3px);
  z-index: ${({ theme }) => theme.zIndex.overlay};
  opacity: ${({ $open }) => ($open ? 1 : 0)};
  pointer-events: ${({ $open }) => ($open ? 'auto' : 'none')};
  transition: opacity ${({ theme }) => theme.motion?.duration.normal || '250ms'} ${({ theme }) => theme.motion?.easing.ease || 'ease'};

  @media (max-width: ${({ theme }) => theme.breakpoints.md}) {
    display: block;
  }
`;

const MobileMenuPanel = styled.aside<{ $open: boolean }>`
  display: none;

  @media (max-width: ${({ theme }) => theme.breakpoints.md}) {
    display: flex;
    position: fixed;
    inset: 0;
    width: 100vw;
    height: 100vh;
    background: ${({ theme }) => theme.colors.surface};
    z-index: ${({ theme }) => theme.zIndex.overlay + 1};
    padding: ${({ theme }) => theme.spacing.xl}px;
    box-shadow: 0 24px 48px rgba(0, 0, 0, 0.18);
    transform: translateX(${({ $open }) => ($open ? '0' : '100%')});
    transition: transform ${({ theme }) => theme.motion?.duration.normal || '250ms'} ${({ theme }) => theme.motion?.easing.easeOut || 'ease-out'};
    flex-direction: column;
    gap: ${({ theme }) => theme.spacing.lg}px;
    overflow-y: auto;
    overflow-x: hidden;
    pointer-events: ${({ $open }) => ($open ? 'auto' : 'none')};
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
  padding: ${({ theme }) => theme.spacing.md}px ${({ theme }) => theme.spacing.lg}px;
  border-radius: ${({ theme }) => theme.radii.lg};
  background: rgba(184, 87, 122, 0.04);

  &:hover {
    background: rgba(184, 87, 122, 0.1);
  }
`;

const MainCTA = styled(LinkButton)`
  @media (max-width: ${({ theme }) => theme.breakpoints.md}) {
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
    { href: '/contact', label: t('nav.contact') }
  ];

  return (
    <HeaderShell $scrolled={scrolled}>
      <TopBar>
        <Container width="wide">
          <TopBarInner>
            <TopBarItem>
              <Icon name="location" size={16} />
              Atendimento presencial e online para todo o Brasil
            </TopBarItem>
          </TopBarInner>
        </Container>
      </TopBar>
      <Container width="wide">
        <Inner>
          <BrandMark href="/">
            {logo ? (
              <Image src={logo} alt={content.doctor.name} width={140} height={42} priority />
            ) : (
              <span>{content.doctor.name}</span>
            )}
          </BrandMark>
          <DesktopOnly>
            <Nav>
              {navItems.map((item) => (
                <NavLink 
                  key={item.href} 
                  href={item.href}
                  $active={pathname === item.href}
                >
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
              <Image src={logo} alt={content.doctor.name} width={120} height={36} />
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
