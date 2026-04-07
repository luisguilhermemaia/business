'use client';

import Image from 'next/image';
import Link from 'next/link';
import { ComponentProps, useEffect, useMemo, useState } from 'react';
import { usePathname } from 'next/navigation';
import styled from 'styled-components';
import { useBrand } from '../brand/BrandProvider';
import { Icon } from '../icons/Icon';
import { SocialIcon } from '../icons/SocialIcon';
import type { SocialPlatform } from '../types/brand';
import { hexToRgba } from '../utils/colors';
import { toSeoSlug } from '../utils/slug';
import { useRecentPosts } from '../blog/RecentPostsProvider';
import { siteRoutes } from './siteRoutes';

interface HeaderNavItem {
  label: string;
  href?: string;
  children?: { label: string; href: string }[];
  dropdownTitle?: string;
}

interface MobileNavSection {
  title: string;
  links: { label: string; href: string }[];
}

const specialtyChildren = [
  { label: 'Menopausa & Climatério', href: siteRoutes.specialty.menopause },
  { label: 'Implantes Hormonais', href: siteRoutes.specialty.hormonalImplants },
] as const;

const advancedGynecologyChildren = [
  { label: 'Laser Íntimo', href: siteRoutes.advancedGynecology.laserIntimo },
  { label: 'Endometriose', href: siteRoutes.advancedGynecology.endometriosis },
  { label: 'Cirurgia Ginecológica', href: siteRoutes.advancedGynecology.gynecologicalSurgery },
  { label: 'Cirurgia Íntima', href: siteRoutes.advancedGynecology.intimateSurgery },
  { label: 'DIUs', href: siteRoutes.advancedGynecology.iuds },
] as const;

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
    return null;
  }
  return null;
}

const normalizeHrefPath = (href: string) => href.split('?')[0].split('#')[0];

const matchesPath = (pathname: string, href: string) => {
  const baseHref = normalizeHrefPath(href);
  return baseHref === '/' ? pathname === '/' : pathname.startsWith(baseHref);
};

const HeaderShell = styled.header`
  position: sticky;
  top: 0;
  z-index: ${({ theme }) => theme.zIndex.header};
  border-top: 6px solid ${({ theme }) => hexToRgba(theme.colors.text, 0.85)};
  border-bottom: 1px solid ${({ theme }) => hexToRgba(theme.colors.text, 0.14)};
  background: ${({ theme }) => theme.colors.surface};
`;

const Wrapper = styled.div`
  width: 100%;
  max-width: 1440px;
  margin: 0 auto;
  padding: 0 18px;

  @media (max-width: ${({ theme }) => theme.breakpoints.sm}) {
    padding: 0 12px;
  }
`;

const DesktopBar = styled.div`
  min-height: 126px;
  display: flex;
  align-items: stretch;
  justify-content: space-between;
  gap: ${({ theme }) => theme.spacing.lg}px;

  @media (max-width: ${({ theme }) => theme.breakpoints.lg}) {
    display: none;
  }
`;

const BrandMark = styled(Link)<Omit<ComponentProps<typeof Link>, 'href'> & { href: string }>`
  display: inline-flex;
  align-items: center;
  align-self: center;
  flex-shrink: 0;
  position: relative;
  text-decoration: none;
  transition: opacity ${({ theme }) => theme.motion?.duration.fast || '150ms'}
    ${({ theme }) => theme.motion?.easing.ease || 'ease'};

  /* Disable generic global link underline animation for the logo */
  &::before,
  &::after {
    content: none !important;
    display: none !important;
  }

  img {
    width: auto;
    height: 92px;
    max-width: min(560px, 66vw);
    object-fit: contain;
    object-position: left center;
  }
`;

const RightBlock = styled.div`
  align-self: stretch;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: flex-end;
  padding: 14px 0 0;
`;

const SocialRow = styled.div`
  display: inline-flex;
  align-items: center;
  gap: 8px;
`;

const SocialLink = styled(Link)<
  Omit<ComponentProps<typeof Link>, 'href'> & {
    href: string;
    $accent?: boolean;
  }
>`
  width: 38px;
  height: 38px;
  border-radius: ${({ theme }) => theme.radii.round};
  border: 2px solid
    ${({ theme, $accent }) =>
      $accent ? hexToRgba(theme.colors.danger, 0.8) : hexToRgba(theme.colors.primary, 0.8)};
  color: ${({ theme, $accent }) =>
    $accent ? hexToRgba(theme.colors.danger, 0.9) : hexToRgba(theme.colors.primary, 0.9)};
  display: inline-flex;
  align-items: center;
  justify-content: center;
  text-decoration: none;
  background: ${({ theme }) => hexToRgba(theme.colors.surface, 0.8)};
  transition: all ${({ theme }) => theme.motion?.duration.fast || '150ms'}
    ${({ theme }) => theme.motion?.easing.ease || 'ease'};

  &:hover {
    transform: translateY(-1px);
    background: ${({ theme }) => hexToRgba(theme.colors.primary, 0.08)};
  }
`;

const MenuList = styled.ul`
  margin: 0 0 -1px;
  padding: 0;
  list-style: none;
  display: flex;
  align-items: flex-end;
  gap: 30px;
`;

const MenuItem = styled.li<{ $hasDropdown?: boolean }>`
  position: relative;
  list-style: none;

  &:hover > a,
  &:hover > button,
  &:focus-within > a,
  &:focus-within > button {
    color: ${({ theme }) => theme.colors.primaryStrong};
  }

  &:hover ul,
  &:focus-within ul {
    opacity: 1;
    pointer-events: auto;
    transform: translate(-50%, 0) scale(1);
  }
`;

const MenuLink = styled(Link)<
  Omit<ComponentProps<typeof Link>, 'href'> & { href: string; $active?: boolean }
>`
  position: relative;
  display: inline-flex;
  align-items: center;
  gap: 5px;
  min-height: 40px;
  padding: 0 0 12px;
  text-decoration: none;
  text-transform: uppercase;
  letter-spacing: 0.07em;
  font-size: 0.94rem;
  line-height: 1.2;
  font-weight: ${({ theme }) => theme.typography.weights.medium};
  color: ${({ theme, $active }) =>
    $active ? theme.colors.primaryStrong : hexToRgba(theme.colors.text, 0.72)};
  transition:
    color ${({ theme }) => theme.motion?.duration.fast || '150ms'}
      ${({ theme }) => theme.motion?.easing.ease || 'ease'},
    opacity ${({ theme }) => theme.motion?.duration.fast || '150ms'}
      ${({ theme }) => theme.motion?.easing.ease || 'ease'};

  &::after {
    content: none !important;
    display: none !important;
  }

  &::before {
    content: '';
    position: absolute;
    left: 0;
    bottom: 2px;
    width: 100%;
    height: 2px;
    border-radius: 999px;
    background: ${({ theme }) => hexToRgba(theme.colors.primary, 0.7)};
    transform: scaleX(${({ $active }) => ($active ? 1 : 0)});
    transform-origin: left center;
    transition: transform ${({ theme }) => theme.motion?.duration.normal || '250ms'}
      ${({ theme }) => theme.motion?.easing.ease || 'ease'};
  }

  &:hover {
    color: ${({ theme }) => theme.colors.primaryStrong};
    opacity: 0.95;
  }

  &:hover::before,
  &:focus-visible::before {
    transform: scaleX(1);
  }
`;

const MenuButton = styled.button<{ $active?: boolean }>`
  position: relative;
  display: inline-flex;
  align-items: center;
  gap: 5px;
  min-height: 40px;
  padding: 0 0 12px;
  border: 0;
  background: transparent;
  text-decoration: none;
  text-transform: uppercase;
  letter-spacing: 0.07em;
  font-size: 0.94rem;
  line-height: 1.2;
  font-weight: ${({ theme }) => theme.typography.weights.medium};
  color: ${({ theme, $active }) =>
    $active ? theme.colors.primaryStrong : hexToRgba(theme.colors.text, 0.72)};
  transition:
    color ${({ theme }) => theme.motion?.duration.fast || '150ms'}
      ${({ theme }) => theme.motion?.easing.ease || 'ease'},
    opacity ${({ theme }) => theme.motion?.duration.fast || '150ms'}
      ${({ theme }) => theme.motion?.easing.ease || 'ease'};
  cursor: default;

  &::before {
    content: '';
    position: absolute;
    left: 0;
    bottom: 2px;
    width: 100%;
    height: 2px;
    border-radius: 999px;
    background: ${({ theme }) => hexToRgba(theme.colors.primary, 0.7)};
    transform: scaleX(${({ $active }) => ($active ? 1 : 0)});
    transform-origin: left center;
    transition: transform ${({ theme }) => theme.motion?.duration.normal || '250ms'}
      ${({ theme }) => theme.motion?.easing.ease || 'ease'};
  }

  &:hover {
    color: ${({ theme }) => theme.colors.primaryStrong};
    opacity: 0.95;
  }

  &:hover::before,
  &:focus-visible::before {
    transform: scaleX(1);
  }
`;

const Caret = styled.span`
  font-size: 10px;
  line-height: 1;
  opacity: 0.75;
`;

const Dropdown = styled.ul`
  margin: 0;
  list-style: none;
  position: absolute;
  top: calc(100% - 1px);
  left: 50%;
  right: auto;
  min-width: 330px;
  border: 1px solid ${({ theme }) => hexToRgba(theme.colors.text, 0.12)};
  border-top: 2px solid ${({ theme }) => hexToRgba(theme.colors.primary, 0.35)};
  background: ${({ theme }) => hexToRgba(theme.colors.surface, 0.98)};
  box-shadow: 0 18px 36px ${({ theme }) => hexToRgba(theme.colors.text, 0.14)};
  padding: 16px 12px 10px;
  min-height: 0;
  border-radius: 0 0 12px 12px;
  opacity: 0;
  pointer-events: none;
  transform: translate(-50%, 10px) scale(0.985);
  transition:
    opacity 170ms ease,
    transform 170ms ease;
`;

const DropdownTitle = styled.p`
  margin: 0 10px 9px;
  text-transform: uppercase;
  letter-spacing: 0.11em;
  color: ${({ theme }) => hexToRgba(theme.colors.text, 0.58)};
  font-size: 0.72rem;
  font-weight: ${({ theme }) => theme.typography.weights.bold};
`;

const DropdownLink = styled(Link)<Omit<ComponentProps<typeof Link>, 'href'> & { href: string }>`
  display: block;
  text-decoration: none;
  font-size: 0.92rem;
  color: ${({ theme }) => hexToRgba(theme.colors.text, 0.78)};
  padding: 10px;
  border-radius: 8px;
  line-height: 1.35;
  font-weight: ${({ theme }) => theme.typography.weights.medium};
  transition:
    color 140ms ease,
    background 140ms ease,
    transform 140ms ease;

  &::after {
    content: none !important;
    display: none !important;
  }

  &:hover,
  &:focus-visible {
    color: ${({ theme }) => theme.colors.primaryStrong};
    background: ${({ theme }) => hexToRgba(theme.colors.primary, 0.08)};
    transform: translateX(2px);
    outline: none;
  }
`;

const MobileBar = styled.div`
  display: none;

  @media (max-width: ${({ theme }) => theme.breakpoints.lg}) {
    min-height: 78px;
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: ${({ theme }) => theme.spacing.sm}px;
  }
`;

const MobileToggle = styled.button`
  width: 40px;
  height: 40px;
  border-radius: ${({ theme }) => theme.radii.round};
  border: 1px solid ${({ theme }) => hexToRgba(theme.colors.text, 0.2)};
  background: transparent;
  color: ${({ theme }) => theme.colors.text};
  display: inline-flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
`;

const MobileLogo = styled(BrandMark)`
  img {
    height: 68px;
    max-width: min(380px, 70vw);
  }
`;

const MobileOverlay = styled.div<{ $open: boolean }>`
  display: none;

  @media (max-width: ${({ theme }) => theme.breakpoints.lg}) {
    display: block;
    position: fixed;
    inset: 0;
    z-index: ${({ theme }) => theme.zIndex.overlay};
    background: ${({ theme }) => hexToRgba(theme.colors.text, 0.42)};
    opacity: ${({ $open }) => ($open ? 1 : 0)};
    pointer-events: ${({ $open }) => ($open ? 'auto' : 'none')};
    transition: opacity ${({ theme }) => theme.motion?.duration.normal || '250ms'}
      ${({ theme }) => theme.motion?.easing.ease || 'ease'};
  }
`;

const MobilePanel = styled.aside<{ $open: boolean }>`
  display: none;

  @media (max-width: ${({ theme }) => theme.breakpoints.lg}) {
    display: flex;
    flex-direction: column;
    position: fixed;
    top: 0;
    left: 0;
    bottom: 0;
    width: min(82vw, 320px);
    background: ${({ theme }) => hexToRgba(theme.colors.surfaceMuted, 0.96)};
    border-right: none;
    z-index: ${({ theme }) => theme.zIndex.overlay + 1};
    transform: translateX(${({ $open }) => ($open ? '0' : '-100%')});
    transition: transform ${({ theme }) => theme.motion?.duration.normal || '250ms'}
      ${({ theme }) => theme.motion?.easing.ease || 'ease'};
    overflow-y: auto;
    box-shadow: 14px 0 24px ${({ theme }) => hexToRgba(theme.colors.text, 0.24)};
  }
`;

const MobileHead = styled.div`
  min-height: 68px;
  padding: 10px ${({ theme }) => theme.spacing.md}px 6px;
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

const MobileTitle = styled.p`
  margin: 0;
  text-transform: uppercase;
  letter-spacing: 0.1em;
  font-size: 0.88rem;
  color: ${({ theme }) => hexToRgba(theme.colors.surface, 0.88)};
  font-weight: ${({ theme }) => theme.typography.weights.bold};
`;

const MobileNav = styled.div`
  padding: 4px 24px 24px;
  display: grid;
  gap: 15px;
`;

const MobileHomeLink = styled(Link)<
  Omit<ComponentProps<typeof Link>, 'href'> & { href: string; $active?: boolean }
>`
  display: inline-flex;
  text-decoration: none;
  text-transform: uppercase;
  letter-spacing: 0.09em;
  font-size: clamp(1.44rem, 4vw, 1.68rem);
  font-weight: ${({ theme }) => theme.typography.weights.bold};
  color: ${({ theme, $active }) =>
    $active ? hexToRgba(theme.colors.surface, 0.98) : hexToRgba(theme.colors.surface, 0.92)};

  &::after {
    content: none !important;
    display: none !important;
  }
`;

const MobileSection = styled.section`
  display: grid;
  gap: 10px;
`;

const MobileSectionTitle = styled.p`
  margin: 0;
  text-transform: uppercase;
  letter-spacing: 0.09em;
  font-size: clamp(1.32rem, 3.6vw, 1.56rem);
  font-weight: ${({ theme }) => theme.typography.weights.bold};
  color: ${({ theme }) => hexToRgba(theme.colors.surface, 0.95)};
`;

const MobileSectionLinks = styled.div`
  display: grid;
  gap: 9px;
`;

const MobileSectionLink = styled(Link)<
  Omit<ComponentProps<typeof Link>, 'href'> & { href: string; $active?: boolean }
>`
  display: block;
  text-decoration: none;
  font-size: 1rem;
  line-height: 1.3;
  letter-spacing: 0.05em;
  color: ${({ theme, $active }) =>
    $active ? hexToRgba(theme.colors.surface, 0.96) : hexToRgba(theme.colors.text, 0.85)};

  &::after {
    content: none !important;
    display: none !important;
  }
`;

const MobileSocials = styled.div`
  margin-top: ${({ theme }) => theme.spacing.md}px;
  display: inline-flex;
  align-items: center;
  gap: ${({ theme }) => theme.spacing.sm}px;
`;

export const Header = () => {
  const { content, logo } = useBrand();
  const recentPosts = useRecentPosts();
  const pathname = usePathname();
  const [open, setOpen] = useState(false);

  useEffect(() => {
    setOpen(false);
  }, [pathname]);

  useEffect(() => {
    document.body.style.overflow = open ? 'hidden' : '';
    return () => {
      document.body.style.overflow = '';
    };
  }, [open]);

  const socialItems = useMemo(() => content.social || [], [content.social]);
  const configuredBlogCategories = useMemo(
    () =>
      content.blog.menu?.categories
        ?.map((category) => category.trim())
        .filter((category) => category.length > 0) || [],
    [content.blog.menu?.categories]
  );

  const blogChildren = useMemo(
    () =>
      configuredBlogCategories.length
        ? configuredBlogCategories.map((category) => ({
            label: category,
            href: `/blog/categoria/${toSeoSlug(category)}`,
          }))
        : recentPosts.slice(0, 5).map((post) => ({
            label: post.title,
            href: `/blog/${post.slug}`,
          })),
    [configuredBlogCategories, recentPosts]
  );

  const desktopMenu = useMemo<HeaderNavItem[]>(() => {
    const blogDropdownTitle = configuredBlogCategories.length
      ? content.blog.menu?.title || 'Todas as categorias'
      : blogChildren.length
        ? 'Últimos artigos'
        : undefined;

    return [
      { label: 'Home', href: siteRoutes.home },
      { label: 'Sobre a médica', href: siteRoutes.about },
      {
        label: 'Especialidade',
        href: siteRoutes.specialty.overview,
        children: [...specialtyChildren],
        dropdownTitle: 'Especialidade',
      },
      {
        label: 'Ginecologia Avançada',
        href: siteRoutes.advancedGynecology.overview,
        children: [...advancedGynecologyChildren],
        dropdownTitle: 'Ginecologia avançada',
      },
      {
        label: 'Blog',
        href: siteRoutes.blog,
        children: blogChildren.length ? blogChildren : undefined,
        dropdownTitle: blogDropdownTitle,
      },
      { label: 'Contato', href: siteRoutes.attendance },
    ];
  }, [blogChildren, configuredBlogCategories.length, content.blog.menu?.title]);

  const mobileSections = useMemo<MobileNavSection[]>(
    () => [
      {
        title: 'Sobre a médica',
        links: [{ label: content.doctor.name, href: siteRoutes.about }],
      },
      {
        title: 'Especialidade',
        links: [...specialtyChildren],
      },
      {
        title: 'Ginecologia Avançada',
        links: [...advancedGynecologyChildren],
      },
      {
        title: 'Blog',
        links: blogChildren.length ? blogChildren : [{ label: 'Blog', href: siteRoutes.blog }],
      },
      {
        title: 'Contato',
        links: [{ label: 'Atendimento', href: siteRoutes.attendance }],
      },
    ],
    [blogChildren, content.doctor.name]
  );

  return (
    <HeaderShell>
      <Wrapper>
        <DesktopBar>
          <BrandMark href="/">
            {logo ? (
              <Image src={logo} alt={content.doctor.name} width={380} height={62} priority />
            ) : (
              <span>{content.doctor.name}</span>
            )}
          </BrandMark>

          <RightBlock>
            <SocialRow>
              {socialItems.map((social, index) => {
                const platform = social.platform ?? inferPlatformFromUrl(social.url);
                return (
                  <SocialLink
                    key={social.url}
                    href={social.url}
                    target="_blank"
                    rel="noreferrer noopener"
                    aria-label={social.label}
                    $accent={index % 2 === 1}
                  >
                    {platform ? (
                      <SocialIcon platform={platform} size={16} />
                    ) : (
                      <Icon name="arrow-right" size={14} />
                    )}
                  </SocialLink>
                );
              })}
            </SocialRow>

            <MenuList>
              {desktopMenu.map((item) => {
                const active =
                  (item.href ? matchesPath(pathname, item.href) : false) ||
                  item.children?.some((child) => matchesPath(pathname, child.href));

                return (
                  <MenuItem key={item.label} $hasDropdown={!!item.children?.length}>
                    {item.href ? (
                      <MenuLink href={item.href} $active={active}>
                        {item.label}
                        {item.children?.length ? <Caret>▾</Caret> : null}
                      </MenuLink>
                    ) : (
                      <MenuButton
                        type="button"
                        $active={active}
                        aria-haspopup={item.children?.length ? 'menu' : undefined}
                      >
                        {item.label}
                        {item.children?.length ? <Caret>▾</Caret> : null}
                      </MenuButton>
                    )}

                    {item.children?.length ? (
                      <Dropdown>
                        {item.dropdownTitle ? (
                          <DropdownTitle>{item.dropdownTitle}</DropdownTitle>
                        ) : null}
                        {item.children.map((child) => (
                          <li key={child.href}>
                            <DropdownLink href={child.href}>{child.label}</DropdownLink>
                          </li>
                        ))}
                      </Dropdown>
                    ) : null}
                  </MenuItem>
                );
              })}
            </MenuList>
          </RightBlock>
        </DesktopBar>

        <MobileBar>
          <MobileToggle onClick={() => setOpen(true)} aria-label="Abrir menu">
            <Icon name="menu" size={20} />
          </MobileToggle>

          <MobileLogo href="/">
            {logo ? (
              <Image src={logo} alt={content.doctor.name} width={280} height={50} priority />
            ) : (
              <span>{content.doctor.name}</span>
            )}
          </MobileLogo>

          <div style={{ width: 40 }} />
        </MobileBar>
      </Wrapper>

      <MobileOverlay $open={open} onClick={() => setOpen(false)} />
      <MobilePanel $open={open}>
        <MobileHead>
          <MobileTitle>Menu</MobileTitle>
          <MobileToggle onClick={() => setOpen(false)} aria-label="Fechar menu">
            <Icon name="close" size={20} />
          </MobileToggle>
        </MobileHead>

        <MobileNav>
          <MobileHomeLink href="/" $active={pathname === '/'} onClick={() => setOpen(false)}>
            Home
          </MobileHomeLink>

          {mobileSections.map((section) => (
            <MobileSection key={section.title}>
              <MobileSectionTitle>{section.title}</MobileSectionTitle>
              <MobileSectionLinks>
                {section.links.map((link) => (
                  <MobileSectionLink
                    key={`${section.title}-${link.href}`}
                    href={link.href}
                    $active={matchesPath(pathname, link.href)}
                    onClick={() => setOpen(false)}
                  >
                    {link.label}
                  </MobileSectionLink>
                ))}
              </MobileSectionLinks>
            </MobileSection>
          ))}

          {socialItems.length > 0 ? (
            <MobileSocials>
              {socialItems.map((social, index) => {
                const platform = social.platform ?? inferPlatformFromUrl(social.url);
                return (
                  <SocialLink
                    key={`mobile-${social.url}`}
                    href={social.url}
                    target="_blank"
                    rel="noreferrer noopener"
                    aria-label={social.label}
                    $accent={index % 2 === 1}
                  >
                    {platform ? (
                      <SocialIcon platform={platform} size={16} />
                    ) : (
                      <Icon name="arrow-right" size={14} />
                    )}
                  </SocialLink>
                );
              })}
            </MobileSocials>
          ) : null}
        </MobileNav>
      </MobilePanel>
    </HeaderShell>
  );
};
