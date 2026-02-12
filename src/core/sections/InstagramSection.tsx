'use client';

import { useEffect, useRef, useState } from 'react';
import Script from 'next/script';
import styled, { keyframes } from 'styled-components';
import { useBrand } from '../brand/BrandProvider';
import { useI18n } from '../i18n/I18nProvider';
import { Container, Section } from '../design-system/primitives';
import { Reveal } from '../design-system/components/Reveal';
import { SocialIcon } from '../icons/SocialIcon';
import { hexToRgba } from '../utils/colors';

const shimmer = keyframes`
  0% { opacity: 0.4; transform: translateX(-100%); }
  50% { opacity: 0.7; }
  100% { opacity: 0.4; transform: translateX(100%); }
`;

const SectionHeader = styled.div`
  text-align: center;
  margin-bottom: ${({ theme }) => theme.spacing.xl}px;
  max-width: 560px;
  margin-left: auto;
  margin-right: auto;

  @media (max-width: ${({ theme }) => theme.breakpoints.sm}) {
    margin-bottom: ${({ theme }) => theme.spacing.lg}px;
  }
`;

const Subtitle = styled.p`
  color: ${({ theme }) => theme.colors.textMuted};
  font-size: ${({ theme }) => theme.typography.sizes.lg};
  line-height: 1.6;
  margin: 0;
  font-weight: ${({ theme }) => theme.typography.weights.regular};
`;

const PostsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: ${({ theme }) => theme.spacing.lg}px;
  align-items: start;

  @media (max-width: ${({ theme }) => theme.breakpoints.md}) {
    grid-template-columns: repeat(2, 1fr);
  }

  @media (max-width: ${({ theme }) => theme.breakpoints.sm}) {
    grid-template-columns: 1fr;
    gap: ${({ theme }) => theme.spacing.md}px;
  }

  /* Instagram embeds - limit width for readability */
  iframe {
    max-width: 100%;
    border-radius: ${({ theme }) => theme.radii.lg || '12px'};
  }
`;

const EmbedWrapper = styled.div`
  position: relative;
  min-height: 320px;
  max-height: 480px;
  display: flex;
  align-items: stretch;
  justify-content: center;
  background: ${({ theme }) => theme.colors.surfaceMuted || hexToRgba(theme.colors.text, 0.04)};
  border-radius: ${({ theme }) => theme.radii.lg || '12px'};
  overflow-y: auto;
  overflow-x: hidden;

  blockquote.instagram-media,
  iframe {
    margin: 0 !important;
    min-width: 100% !important;
  }
`;

const SkeletonOverlay = styled.div<{ $visible: boolean }>`
  position: absolute;
  inset: 0;
  border-radius: ${({ theme }) => theme.radii.lg || '12px'};
  background: ${({ theme }) => theme.colors.surfaceMuted || hexToRgba(theme.colors.text, 0.06)};
  display: flex;
  align-items: center;
  justify-content: center;
  opacity: ${({ $visible }) => ($visible ? 1 : 0)};
  pointer-events: ${({ $visible }) => ($visible ? 'auto' : 'none')};
  transition: opacity 0.4s ease;
  z-index: 1;

  &::after {
    content: '';
    position: absolute;
    inset: 0;
    background: linear-gradient(
      90deg,
      transparent 0%,
      ${({ theme }) => hexToRgba(theme.colors.text, 0.06)} 50%,
      transparent 100%
    );
    animation: ${shimmer} 1.8s ease-in-out infinite;
  }

  @media (prefers-reduced-motion: reduce) {
    &::after {
      animation: none;
    }
  }
`;

const SkeletonIcon = styled.div`
  width: 48px;
  height: 48px;
  border-radius: 50%;
  background: ${({ theme }) => hexToRgba(theme.colors.text, 0.12)};
  flex-shrink: 0;
`;

const FollowCTA = styled.a`
  display: inline-flex;
  align-items: center;
  gap: ${({ theme }) => theme.spacing.sm}px;
  padding: ${({ theme }) => theme.spacing.md}px ${({ theme }) => theme.spacing.xl}px;
  background: linear-gradient(
    45deg,
    #f09433 0%,
    #e6683c 25%,
    #dc2743 50%,
    #cc2366 75%,
    #bc1888 100%
  );
  color: white;
  font-weight: ${({ theme }) => theme.typography.weights.semi};
  font-size: ${({ theme }) => theme.typography.sizes.md};
  border-radius: ${({ theme }) => theme.radii.pill};
  text-decoration: none;
  transition:
    transform 0.2s ease,
    box-shadow 0.2s ease;
  box-shadow: 0 4px 14px rgba(188, 24, 136, 0.35);

  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 6px 20px rgba(188, 24, 136, 0.4);
    color: white;
  }
`;

const CTAWrap = styled.div`
  text-align: center;
  margin-top: ${({ theme }) => theme.spacing.xl}px;
`;

declare global {
  interface Window {
    instgrm?: { Embeds: { process: () => void } };
  }
}

/** Normalize Instagram URLs: strip UTM params, extract from embed permalink, etc. */
function normalizeInstagramUrl(input: string): string {
  const trimmed = input.trim();
  if (!trimmed) return '';
  // Extract shortcode from /p/CODE, /reel/CODE, /tv/CODE, or username/p/CODE
  const match = trimmed.match(/(?:instagram\.com\/)?(?:\w+\/)?(p|reel|tv)\/([A-Za-z0-9_-]+)/);
  if (match) {
    const type = match[1];
    const shortcode = match[2];
    return `https://www.instagram.com/${type}/${shortcode}/`;
  }
  if (trimmed.startsWith('http')) {
    // Strip UTM params (from embed: ?utm_source=ig_embed&utm_campaign=loading)
    return trimmed.split('?')[0].replace(/\/$/, '') + '/';
  }
  const pathMatch = trimmed.replace(/^\/+/, '').match(/(p|reel|tv)\/([A-Za-z0-9_-]+)/);
  if (pathMatch) {
    return `https://www.instagram.com/${pathMatch[1]}/${pathMatch[2]}/`;
  }
  return trimmed;
}

export const InstagramSection = () => {
  const { content } = useBrand();
  const { t } = useI18n();
  const gridRef = useRef<HTMLDivElement>(null);
  const [loadedIndices, setLoadedIndices] = useState<Set<number>>(new Set());

  const instagram = content.instagram;
  const rawUrls = instagram?.postUrls?.filter(Boolean) ?? [];
  const normalized = rawUrls.map(normalizeInstagramUrl).filter(Boolean);
  const postUrls = [...new Set(normalized)];
  const postUrlsKey = postUrls.join(',');
  const username = instagram?.profileUrl?.match(/instagram\.com\/([^/?#]+)/)?.[1] ?? 'instagram';

  const processEmbeds = () => {
    if (window.instgrm?.Embeds?.process) {
      window.instgrm.Embeds.process();
    }
  };

  const onEmbedScriptLoad = () => {
    requestAnimationFrame(() => {
      setTimeout(processEmbeds, 150);
    });
  };

  useEffect(() => {
    if (postUrls.length === 0) return;
    const id = setTimeout(processEmbeds, 300);
    return () => clearTimeout(id);
  }, [postUrls.length, postUrlsKey]);

  useEffect(() => {
    if (postUrls.length === 0) return;

    const checkEmbeds = () => {
      if (!gridRef.current) return;
      const wrappers = gridRef.current.querySelectorAll('[data-embed-wrapper]');
      if (!wrappers?.length) return;
      setLoadedIndices((prev) => {
        const next = new Set(prev);
        wrappers.forEach((el, i) => {
          if (el.querySelector('iframe')) next.add(i);
        });
        return next.size === prev.size ? prev : next;
      });
    };

    const interval = setInterval(checkEmbeds, 400);
    const timeout = setTimeout(() => {
      setLoadedIndices(new Set(postUrls.map((_, i) => i)));
    }, 8000);
    return () => {
      clearInterval(interval);
      clearTimeout(timeout);
    };
    // postUrlsKey is stable when URLs don't change; postUrls would change ref every render
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [postUrls.length, postUrlsKey]);

  if (!instagram?.profileUrl) return null;

  return (
    <Section background="muted">
      <Container>
        <SectionHeader>
          <Reveal direction="up" duration={600}>
            <Subtitle>{t('instagram.subtitle')}</Subtitle>
          </Reveal>
        </SectionHeader>

        {postUrls.length > 0 ? (
          <>
            <PostsGrid ref={gridRef}>
              {postUrls.map((url, index) => (
                <Reveal key={url} direction="up" duration={600} delay={0.12 + index * 0.08}>
                  <EmbedWrapper data-embed-wrapper>
                    <SkeletonOverlay $visible={!loadedIndices.has(index)}>
                      <SkeletonIcon aria-hidden />
                    </SkeletonOverlay>
                    <blockquote
                      className="instagram-media"
                      data-instgrm-captioned
                      data-instgrm-permalink={url}
                      data-instgrm-version="14"
                    >
                      <a href={url}>{t('instagram.viewPost')}</a>
                    </blockquote>
                  </EmbedWrapper>
                </Reveal>
              ))}
            </PostsGrid>
            <Script
              src="https://www.instagram.com/embed.js"
              strategy="afterInteractive"
              onLoad={onEmbedScriptLoad}
            />
          </>
        ) : (
          <Reveal direction="up" duration={600} delay={0.15}>
            <div style={{ textAlign: 'center' }}>
              <p
                style={{
                  marginBottom: 24,
                  color: 'var(--color-text-muted, #6B5D4F)',
                  fontSize: '1rem',
                }}
              >
                {t('instagram.followText')}
              </p>
              <FollowCTA href={instagram.profileUrl} target="_blank" rel="noopener noreferrer">
                <SocialIcon platform="instagram" size={24} />
                {t('instagram.followButton', { username: `@${username}` })}
              </FollowCTA>
            </div>
          </Reveal>
        )}

        {postUrls.length > 0 && (
          <Reveal direction="up" duration={600} delay={0.35}>
            <CTAWrap>
              <FollowCTA href={instagram.profileUrl} target="_blank" rel="noopener noreferrer">
                <SocialIcon platform="instagram" size={20} />
                {t('instagram.followButton', { username: `@${username}` })}
              </FollowCTA>
            </CTAWrap>
          </Reveal>
        )}
      </Container>
    </Section>
  );
};
