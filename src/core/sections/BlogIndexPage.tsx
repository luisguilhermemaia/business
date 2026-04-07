'use client';

import Image from 'next/image';
import Link from 'next/link';
import { useSearchParams } from 'next/navigation';
import { useEffect, useMemo, useRef, useState } from 'react';
import styled from 'styled-components';
import { Input } from '../design-system/components/FormControls';
import { Container, Section, Stack } from '../design-system/primitives';
import { Reveal } from '../design-system/components/Reveal';
import { useI18n } from '../i18n/I18nProvider';
import { Icon } from '../icons/Icon';
import { BlogCategory, BlogMeta } from '../utils/blog';
import { hexToRgba } from '../utils/colors';
import { formatDate } from '../utils/format';

const POSTS_PER_PAGE = 6;
const DEFAULT_BLOG_COVER = '/brands/karinne-azin/banner.jpg';

const getPageFromQuery = (rawPage: string | null) => {
  const parsed = Number.parseInt(rawPage || '', 10);
  return Number.isFinite(parsed) && parsed > 0 ? parsed : 1;
};

const buildPathWithQuery = ({
  basePath,
  query,
  page,
}: {
  basePath: string;
  query?: string;
  page?: number;
}) => {
  const params = new URLSearchParams();
  const normalizedQuery = query?.trim();
  if (normalizedQuery) params.set('q', normalizedQuery);
  if (page && page > 1) params.set('page', String(page));
  const qs = params.toString();
  return qs ? `${basePath}?${qs}` : basePath;
};

const buildCategoryPath = (categorySlug: string, query?: string) => {
  const params = new URLSearchParams();
  if (query?.trim()) params.set('q', query.trim());
  const qs = params.toString();
  return qs ? `/blog/categoria/${categorySlug}?${qs}` : `/blog/categoria/${categorySlug}`;
};

const BreadcrumbNav = styled.nav`
  margin-bottom: ${({ theme }) => theme.spacing.lg}px;
`;

const BreadcrumbList = styled.ol`
  margin: 0;
  padding: 0;
  list-style: none;
  display: flex;
  align-items: center;
  gap: 8px;
  flex-wrap: wrap;
`;

const BreadcrumbItem = styled.li`
  display: inline-flex;
  align-items: center;
  gap: 8px;
`;

const BreadcrumbLink = styled(Link)<{ href: string }>`
  text-decoration: none;
  text-transform: uppercase;
  letter-spacing: 0.08em;
  font-size: ${({ theme }) => theme.typography.sizes.xs};
  font-weight: ${({ theme }) => theme.typography.weights.bold};
  color: ${({ theme }) => hexToRgba(theme.colors.text, 0.72)};

  &::after {
    content: none !important;
    display: none !important;
  }

  &:hover {
    color: ${({ theme }) => theme.colors.primaryStrong};
  }
`;

const BreadcrumbCurrent = styled.span`
  text-transform: uppercase;
  letter-spacing: 0.08em;
  font-size: ${({ theme }) => theme.typography.sizes.xs};
  font-weight: ${({ theme }) => theme.typography.weights.bold};
  color: ${({ theme }) => hexToRgba(theme.colors.primaryStrong, 0.76)};
`;

const BreadcrumbSeparator = styled.span`
  color: ${({ theme }) => hexToRgba(theme.colors.primary, 0.62)};
  font-size: 0.8rem;
  line-height: 1;
  transform: translateY(-1px);
`;

const FeaturedModule = styled.div`
  margin-top: ${({ theme }) => theme.spacing.md}px;
`;

const FeaturedUtility = styled.div`
  display: flex;
  align-items: center;
  gap: ${({ theme }) => theme.spacing.sm}px;
  flex-wrap: wrap;
  padding: ${({ theme }) => theme.spacing.sm}px 0;
  border-bottom: 1px solid ${({ theme }) => hexToRgba(theme.colors.text, 0.14)};
`;

const FeaturedUtilityTab = styled.button<{ $active?: boolean }>`
  border: 0;
  background: transparent;
  padding: 0;
  cursor: pointer;
  text-transform: uppercase;
  letter-spacing: 0.06em;
  font-size: ${({ theme }) => theme.typography.sizes.sm};
  font-weight: ${({ theme }) => theme.typography.weights.bold};
  color: ${({ theme, $active }) =>
    $active ? theme.colors.primaryStrong : hexToRgba(theme.colors.text, 0.7)};

  &:hover {
    color: ${({ theme }) => theme.colors.primaryStrong};
  }
`;

const UtilityDivider = styled.span`
  color: ${({ theme }) => hexToRgba(theme.colors.text, 0.42)};
  font-size: 1rem;
`;

const FeaturedGrid = styled.article`
  margin-top: ${({ theme }) => theme.spacing.md}px;
  display: grid;
  grid-template-columns: minmax(0, 0.95fr) minmax(0, 1.25fr);
  border: 1px solid ${({ theme }) => hexToRgba(theme.colors.text, 0.12)};
  background: ${({ theme }) => hexToRgba(theme.colors.surface, 0.94)};
  overflow: hidden;

  @media (max-width: ${({ theme }) => theme.breakpoints.lg}) {
    grid-template-columns: 1fr;
  }
`;

const FeaturedMedia = styled.div`
  position: relative;
  min-height: clamp(220px, 28vw, 340px);
  border-right: 1px solid ${({ theme }) => hexToRgba(theme.colors.text, 0.12)};
  border-bottom: 3px solid ${({ theme }) => hexToRgba(theme.colors.primary, 0.72)};

  @media (max-width: ${({ theme }) => theme.breakpoints.lg}) {
    border-right: none;
  }
`;

const FeaturedContent = styled.div`
  padding: clamp(20px, 2.4vw, 34px);
  background: ${({ theme }) => hexToRgba(theme.colors.surfaceMuted, 0.42)};
`;

const FeaturedBadge = styled.p`
  margin: 0 0 ${({ theme }) => theme.spacing.sm}px;
  text-transform: uppercase;
  letter-spacing: 0.08em;
  font-size: ${({ theme }) => theme.typography.sizes.xs};
  font-weight: ${({ theme }) => theme.typography.weights.bold};
  color: ${({ theme }) => hexToRgba(theme.colors.primaryStrong, 0.82)};
`;

const FeaturedTitle = styled.h2`
  margin: 0 0 ${({ theme }) => theme.spacing.sm}px;
  font-size: clamp(1.6rem, 1.9vw + 1rem, 2.6rem);
  line-height: 1.16;
  font-weight: ${({ theme }) => theme.typography.weights.regular};
  color: ${({ theme }) => theme.colors.text};
`;

const Excerpt = styled.p`
  color: ${({ theme }) => theme.colors.textMuted};
  line-height: 1.75;
  font-size: 0.98rem;
  margin: 0;
`;

const MetaRow = styled.div`
  display: inline-flex;
  align-items: center;
  gap: ${({ theme }) => theme.spacing.md}px;
  color: ${({ theme }) => theme.colors.textMuted};
  flex-wrap: wrap;
  font-size: ${({ theme }) => theme.typography.sizes.sm};
`;

const FeaturedAction = styled(Link)<{ href: string }>`
  margin-top: ${({ theme }) => theme.spacing.md}px;
  min-height: 44px;
  padding: 0 ${({ theme }) => theme.spacing.lg}px;
  border-radius: ${({ theme }) => theme.radii.sm};
  border: 1px solid ${({ theme }) => hexToRgba(theme.colors.primary, 0.6)};
  background: ${({ theme }) => theme.colors.primary};
  color: ${({ theme }) => theme.colors.primaryContrast};
  display: inline-flex;
  align-items: center;
  gap: ${({ theme }) => theme.spacing.sm}px;
  text-decoration: none;
  text-transform: uppercase;
  letter-spacing: 0.04em;
  font-size: ${({ theme }) => theme.typography.sizes.sm};
  font-weight: ${({ theme }) => theme.typography.weights.bold};

  &:hover {
    background: ${({ theme }) => theme.colors.primaryStrong};
    border-color: ${({ theme }) => hexToRgba(theme.colors.primaryStrong, 0.84)};
  }
`;

const SearchForm = styled.form`
  margin-top: ${({ theme }) => theme.spacing.md}px;
`;

const SearchRow = styled.div`
  display: flex;
  align-items: center;
  gap: ${({ theme }) => theme.spacing.sm}px;
  flex-wrap: wrap;
`;

const SearchButton = styled.button`
  border: 1px solid ${({ theme }) => theme.colors.primary};
  border-radius: ${({ theme }) => theme.radii.md};
  min-height: 48px;
  padding: 0 ${({ theme }) => theme.spacing.lg}px;
  background: ${({ theme }) => theme.colors.primary};
  color: ${({ theme }) => theme.colors.primaryContrast};
  cursor: pointer;
  display: inline-flex;
  align-items: center;
  gap: ${({ theme }) => theme.spacing.xs}px;
  font-size: ${({ theme }) => theme.typography.sizes.md};
  font-weight: ${({ theme }) => theme.typography.weights.semi};
  transition: all ${({ theme }) => theme.motion?.duration.fast || '150ms'}
    ${({ theme }) => theme.motion?.easing.ease || 'ease'};

  &:hover {
    background: ${({ theme }) => theme.colors.primaryStrong};
    border-color: ${({ theme }) => theme.colors.primaryStrong};
  }

  &:focus-visible {
    outline: 2px solid ${({ theme }) => theme.colors.primary};
    outline-offset: 2px;
  }
`;

const FiltersSummary = styled.p`
  margin: ${({ theme }) => theme.spacing.md}px 0 0;
  color: ${({ theme }) => theme.colors.textMuted};
  font-size: ${({ theme }) => theme.typography.sizes.sm};
`;

const TagLink = styled(Link)<{ $active: boolean; href: string }>`
  border: 1px solid
    ${({ theme, $active }) => ($active ? theme.colors.primary : theme.colors.border)};
  border-radius: ${({ theme }) => theme.radii.md};
  padding: ${({ theme }) => theme.spacing.sm}px ${({ theme }) => theme.spacing.md}px;
  background: ${({ $active, theme }) => ($active ? theme.colors.primary : theme.colors.surface)};
  color: ${({ $active, theme }) => ($active ? theme.colors.primaryContrast : theme.colors.text)};
  cursor: pointer;
  display: inline-flex;
  align-items: center;
  gap: ${({ theme }) => theme.spacing.xs}px;
  font-size: ${({ theme }) => theme.typography.sizes.sm};
  font-weight: ${({ theme, $active }) =>
    $active ? theme.typography.weights.semi : theme.typography.weights.medium};
  text-decoration: none;
  transition: all ${({ theme }) => theme.motion?.duration.fast || '150ms'}
    ${({ theme }) => theme.motion?.easing.ease || 'ease'};

  &:hover {
    border-color: ${({ theme }) => theme.colors.primary};
    background: ${({ $active, theme }) =>
      $active ? theme.colors.primaryStrong : theme.colors.surfaceMuted};
  }

  &:focus-visible {
    outline: 2px solid ${({ theme }) => theme.colors.primary};
    outline-offset: 2px;
  }
`;

const ArticlesSurface = styled.div`
  margin-top: ${({ theme }) => theme.spacing.xl}px;
  padding: clamp(20px, 2.7vw, 34px);
  border: 1px solid ${({ theme }) => hexToRgba(theme.colors.text, 0.1)};
  background:
    linear-gradient(
      180deg,
      ${({ theme }) => hexToRgba(theme.colors.surfaceMuted, 0.48)} 0%,
      ${({ theme }) => hexToRgba(theme.colors.surface, 0.92)} 100%
    ),
    repeating-linear-gradient(
      45deg,
      ${({ theme }) => hexToRgba(theme.colors.primary, 0.06)} 0 1px,
      transparent 1px 18px
    ),
    repeating-linear-gradient(
      -45deg,
      ${({ theme }) => hexToRgba(theme.colors.text, 0.035)} 0 1px,
      transparent 1px 20px
    );
`;

const ArticlesTitle = styled.h2`
  margin: 0;
  text-transform: uppercase;
  letter-spacing: 0.06em;
  font-size: clamp(1.3rem, 1.4vw + 0.9rem, 1.9rem);
  color: ${({ theme }) => theme.colors.primaryStrong};
`;

const PostsGrid = styled.div`
  margin-top: ${({ theme }) => theme.spacing.lg}px;
  display: grid;
  grid-template-columns: repeat(3, minmax(0, 1fr));
  gap: ${({ theme }) => theme.spacing.lg}px;

  @media (max-width: ${({ theme }) => theme.breakpoints.lg}) {
    grid-template-columns: repeat(2, minmax(0, 1fr));
  }

  @media (max-width: ${({ theme }) => theme.breakpoints.md}) {
    grid-template-columns: 1fr;
  }
`;

const PostCard = styled.article`
  border: 1px solid ${({ theme }) => hexToRgba(theme.colors.text, 0.12)};
  background: ${({ theme }) => theme.colors.surface};
  display: grid;
  grid-template-rows: auto 1fr;
  min-height: 100%;
`;

const PostImageLink = styled(Link)<{ href: string }>`
  position: relative;
  display: block;
  aspect-ratio: 16 / 10;
  overflow: hidden;
  border-bottom: 2px solid ${({ theme }) => hexToRgba(theme.colors.primary, 0.6)};
`;

const PostContent = styled.div`
  padding: ${({ theme }) => theme.spacing.md}px;
  display: grid;
  gap: ${({ theme }) => theme.spacing.sm}px;
  align-content: start;
`;

const PostTitle = styled.h3`
  margin: 0;
  font-size: ${({ theme }) => theme.typography.sizes.lg};
  line-height: 1.28;
`;

const PostTitleLink = styled(Link)<{ href: string }>`
  color: ${({ theme }) => theme.colors.text};
  text-decoration: none;

  &:hover {
    color: ${({ theme }) => theme.colors.primaryStrong};
  }
`;

const PostMetaRow = styled.div`
  display: flex;
  align-items: center;
  gap: ${({ theme }) => theme.spacing.sm}px;
  flex-wrap: wrap;
  font-size: ${({ theme }) => theme.typography.sizes.xs};
  color: ${({ theme }) => theme.colors.textMuted};
`;

const ReadMoreLink = styled(Link)<{ href: string }>`
  margin-top: ${({ theme }) => theme.spacing.xs}px;
  display: inline-flex;
  align-items: center;
  gap: ${({ theme }) => theme.spacing.xs}px;
  color: ${({ theme }) => theme.colors.primaryStrong};
  text-decoration: none;
  text-transform: uppercase;
  letter-spacing: 0.05em;
  font-size: ${({ theme }) => theme.typography.sizes.xs};
  font-weight: ${({ theme }) => theme.typography.weights.bold};
`;

const NoResults = styled.p`
  text-align: center;
  padding: 48px 0;
  margin: 0 auto;
  color: ${({ theme }) => theme.colors.textMuted};
  max-width: 640px;
`;

const PaginationNav = styled.nav`
  margin-top: ${({ theme }) => theme.spacing.xl}px;
  display: flex;
  gap: ${({ theme }) => theme.spacing.xs}px;
  flex-wrap: wrap;
  align-items: center;
`;

const PaginationLink = styled(Link)<{ $active?: boolean; href: string }>`
  min-width: 40px;
  height: 40px;
  padding: 0 ${({ theme }) => theme.spacing.md}px;
  border-radius: ${({ theme }) => theme.radii.md};
  border: 1px solid
    ${({ theme, $active }) => ($active ? theme.colors.primary : theme.colors.border)};
  background: ${({ theme, $active }) => ($active ? theme.colors.primary : theme.colors.surface)};
  color: ${({ theme, $active }) => ($active ? theme.colors.primaryContrast : theme.colors.text)};
  text-decoration: none;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  font-size: ${({ theme }) => theme.typography.sizes.sm};
  font-weight: ${({ theme, $active }) =>
    $active ? theme.typography.weights.semi : theme.typography.weights.medium};
  transition: all ${({ theme }) => theme.motion?.duration.fast || '150ms'}
    ${({ theme }) => theme.motion?.easing.ease || 'ease'};

  &:hover {
    border-color: ${({ theme }) => theme.colors.primary};
    background: ${({ theme, $active }) =>
      $active ? theme.colors.primaryStrong : theme.colors.surfaceMuted};
  }
`;

const PaginationDisabled = styled.span`
  min-width: 40px;
  height: 40px;
  padding: 0 ${({ theme }) => theme.spacing.md}px;
  border-radius: ${({ theme }) => theme.radii.md};
  border: 1px solid ${({ theme }) => theme.colors.border};
  color: ${({ theme }) => theme.colors.textMuted};
  display: inline-flex;
  align-items: center;
  justify-content: center;
  font-size: ${({ theme }) => theme.typography.sizes.sm};
  opacity: 0.65;
`;

interface BlogCategoryLink extends BlogCategory {
  href: string;
  active: boolean;
}

interface BlogPaginationLink {
  page: number;
  href: string;
  active: boolean;
}

interface Props {
  posts: BlogMeta[];
  categories: BlogCategory[];
  introTitle: string;
  introDescription: string;
  basePath: string;
  activeCategorySlug?: string | null;
  showFeaturedLatest?: boolean;
}

type BlogTopTab = 'featured' | 'search';

export const BlogIndexPage = ({
  posts,
  categories,
  introTitle: _introTitle,
  introDescription: _introDescription,
  basePath,
  activeCategorySlug,
  showFeaturedLatest = false,
}: Props) => {
  const { t, locale } = useI18n();
  const searchParams = useSearchParams();
  const searchInputRef = useRef<HTMLInputElement | null>(null);

  const query = (searchParams.get('q') || '').trim();
  const requestedPage = getPageFromQuery(searchParams.get('page'));
  const activeCategory =
    categories.find((category) => category.slug === (activeCategorySlug || '')) || null;

  const filteredPosts = useMemo(() => {
    const normalizedQuery = query.toLowerCase();
    return posts.filter((post) => {
      const matchesCategory = activeCategorySlug ? post.categorySlug === activeCategorySlug : true;
      if (!matchesCategory) return false;
      if (!normalizedQuery) return true;
      const searchable = [post.title, post.excerpt, post.category, ...post.tags]
        .join(' ')
        .toLowerCase();
      return searchable.includes(normalizedQuery);
    });
  }, [posts, query, activeCategorySlug]);

  const reservedFeaturedPost = useMemo(() => {
    const shouldReserveFeatured = showFeaturedLatest && !activeCategorySlug && !query;
    if (!shouldReserveFeatured) return null;
    return posts[0] || null;
  }, [showFeaturedLatest, activeCategorySlug, query, posts]);

  const featuredPost = requestedPage === 1 ? reservedFeaturedPost : null;

  const [activeTopTab, setActiveTopTab] = useState<BlogTopTab>(() => {
    if (query) return 'search';
    return featuredPost ? 'featured' : 'search';
  });

  useEffect(() => {
    if (query) {
      setActiveTopTab('search');
      return;
    }
    setActiveTopTab(featuredPost ? 'featured' : 'search');
  }, [query, featuredPost]);

  useEffect(() => {
    if (activeTopTab !== 'search') return;
    searchInputRef.current?.focus();
  }, [activeTopTab]);

  const postsForList = useMemo(() => {
    if (!reservedFeaturedPost) return filteredPosts;
    return filteredPosts.filter((post) => post.slug !== reservedFeaturedPost.slug);
  }, [filteredPosts, reservedFeaturedPost]);

  const totalPages = Math.max(1, Math.ceil(postsForList.length / POSTS_PER_PAGE));
  const currentPage = Math.min(Math.max(requestedPage, 1), totalPages);

  const paginatedPosts = useMemo(() => {
    const start = (currentPage - 1) * POSTS_PER_PAGE;
    return postsForList.slice(start, start + POSTS_PER_PAGE);
  }, [postsForList, currentPage]);

  const categoryLinks: BlogCategoryLink[] = useMemo(
    () =>
      categories.map((category) => ({
        ...category,
        active: category.slug === activeCategorySlug,
        href: buildCategoryPath(category.slug, query),
      })),
    [categories, activeCategorySlug, query]
  );

  const allCategoriesHref = query
    ? `/blog?${new URLSearchParams({ q: query }).toString()}`
    : '/blog';

  const clearFiltersHref = activeCategorySlug ? `/blog/categoria/${activeCategorySlug}` : '/blog';

  const paginationLinks: BlogPaginationLink[] = useMemo(
    () =>
      Array.from({ length: totalPages }, (_, index) => {
        const pageNumber = index + 1;
        return {
          page: pageNumber,
          href: buildPathWithQuery({
            basePath,
            query,
            page: pageNumber,
          }),
          active: pageNumber === currentPage,
        };
      }),
    [totalPages, basePath, query, currentPage]
  );

  const previousHref =
    currentPage > 1
      ? buildPathWithQuery({
          basePath,
          query,
          page: currentPage - 1,
        })
      : null;

  const nextHref =
    currentPage < totalPages
      ? buildPathWithQuery({
          basePath,
          query,
          page: currentPage + 1,
        })
      : null;

  const hasActiveFilters = Boolean(query || activeCategory);

  const breadcrumbs = activeCategory
    ? [
        { label: t('nav.home'), href: '/' },
        { label: t('nav.blog'), href: '/blog' },
        { label: activeCategory.label },
      ]
    : [{ label: t('nav.home'), href: '/' }, { label: t('nav.blog') }];

  return (
    <Section padding="md">
      <Container width="wide">
        <BreadcrumbNav aria-label="Breadcrumb">
          <BreadcrumbList>
            {breadcrumbs.map((breadcrumb, index) => {
              const isLast = index === breadcrumbs.length - 1;
              return (
                <BreadcrumbItem key={`${breadcrumb.label}-${index}`}>
                  {breadcrumb.href && !isLast ? (
                    <BreadcrumbLink href={breadcrumb.href as never}>
                      {breadcrumb.label}
                    </BreadcrumbLink>
                  ) : (
                    <BreadcrumbCurrent>{breadcrumb.label}</BreadcrumbCurrent>
                  )}
                  {!isLast ? <BreadcrumbSeparator>{'>'}</BreadcrumbSeparator> : null}
                </BreadcrumbItem>
              );
            })}
          </BreadcrumbList>
        </BreadcrumbNav>

        <FeaturedModule>
          {featuredPost ? (
            <FeaturedUtility role="tablist" aria-label={t('blog.searchTab')}>
              <FeaturedUtilityTab
                type="button"
                role="tab"
                aria-selected={activeTopTab === 'featured'}
                aria-controls="blog-featured-panel"
                id="blog-featured-tab"
                $active={activeTopTab === 'featured'}
                onClick={() => setActiveTopTab('featured')}
              >
                {t('blog.featuredTab')}
              </FeaturedUtilityTab>
              <UtilityDivider>|</UtilityDivider>
              <FeaturedUtilityTab
                type="button"
                role="tab"
                aria-selected={activeTopTab === 'search'}
                aria-controls="blog-search-panel"
                id="blog-search-tab"
                $active={activeTopTab === 'search'}
                onClick={() => setActiveTopTab('search')}
              >
                {t('blog.searchTab')}
              </FeaturedUtilityTab>
            </FeaturedUtility>
          ) : (
            <FeaturedUtility>
              <FeaturedUtilityTab as="span" $active>
                {t('blog.searchTab')}
              </FeaturedUtilityTab>
            </FeaturedUtility>
          )}

          {featuredPost && activeTopTab === 'featured' ? (
            <FeaturedGrid
              role="tabpanel"
              id="blog-featured-panel"
              aria-labelledby="blog-featured-tab"
            >
              <FeaturedMedia>
                <Image
                  src={featuredPost.cover || DEFAULT_BLOG_COVER}
                  alt={featuredPost.title}
                  fill
                  sizes="(max-width: 1024px) 100vw, 38vw"
                  style={{ objectFit: 'cover' }}
                />
              </FeaturedMedia>
              <FeaturedContent>
                <FeaturedBadge>{t('blog.featuredLatestLabel')}</FeaturedBadge>
                <FeaturedTitle>{featuredPost.title}</FeaturedTitle>
                <MetaRow>
                  <span style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                    <Icon name="calendar" size={14} /> {formatDate(featuredPost.date, locale)}
                  </span>
                  <span style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                    <Icon name="clock" size={14} /> {featuredPost.readingTime} {t('blog.minRead')}
                  </span>
                </MetaRow>
                <Excerpt style={{ marginTop: '12px' }}>{featuredPost.excerpt}</Excerpt>
                <FeaturedAction href={`/blog/${featuredPost.slug}` as never}>
                  {t('blog.readMore')}
                </FeaturedAction>
              </FeaturedContent>
            </FeaturedGrid>
          ) : null}

          <SearchForm
            action={basePath}
            method="get"
            role="tabpanel"
            id="blog-search-panel"
            aria-labelledby={featuredPost ? 'blog-search-tab' : undefined}
            style={{ display: featuredPost && activeTopTab === 'featured' ? 'none' : 'block' }}
          >
            <SearchRow>
              <Input
                ref={searchInputRef}
                name="q"
                placeholder={t('blog.searchPlaceholder')}
                defaultValue={query}
                style={{ flex: 1, minWidth: '260px' }}
              />
              <SearchButton type="submit">
                <Icon name="search" size={14} />
                {t('blog.searchAction')}
              </SearchButton>
            </SearchRow>
          </SearchForm>
        </FeaturedModule>

        {hasActiveFilters && (
          <FiltersSummary>
            {t('blog.resultsCount', {
              count: filteredPosts.length,
              query: query || '-',
              category: activeCategory?.label || t('actions.all'),
            })}
            {' · '}
            <Link href={clearFiltersHref as never}>{t('blog.clearFilters')}</Link>
          </FiltersSummary>
        )}

        {categoryLinks.length > 0 && (
          <Stack
            direction="row"
            gap="sm"
            align="center"
            style={{ flexWrap: 'wrap', marginTop: '16px' }}
          >
            <strong style={{ fontSize: '0.95rem' }}>{t('blog.filterTags')}:</strong>
            <TagLink href={allCategoriesHref as never} $active={!activeCategory}>
              <Icon name="check" size={14} /> {t('actions.all')}
            </TagLink>
            {categoryLinks.map((category) => (
              <TagLink key={category.slug} href={category.href as never} $active={category.active}>
                <Icon name="tag" size={12} />
                {category.label} ({category.count})
              </TagLink>
            ))}
          </Stack>
        )}

        <ArticlesSurface>
          <ArticlesTitle>{t('blog.moreArticlesTitle')}</ArticlesTitle>
          <PostsGrid>
            {paginatedPosts.map((post, idx) => (
              <Reveal key={post.slug} delay={0.08 + idx * 0.05}>
                <PostCard>
                  <PostImageLink href={`/blog/${post.slug}` as never}>
                    <Image
                      src={post.cover || DEFAULT_BLOG_COVER}
                      alt={post.title}
                      fill
                      sizes="(max-width: 768px) 100vw, (max-width: 1240px) 50vw, 33vw"
                      style={{ objectFit: 'cover' }}
                    />
                  </PostImageLink>
                  <PostContent>
                    <PostMetaRow>
                      <span style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
                        <Icon name="calendar" size={12} /> {formatDate(post.date, locale)}
                      </span>
                      <span style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
                        <Icon name="clock" size={12} /> {post.readingTime} {t('blog.minRead')}
                      </span>
                    </PostMetaRow>
                    <PostTitle>
                      <PostTitleLink href={`/blog/${post.slug}` as never}>
                        {post.title}
                      </PostTitleLink>
                    </PostTitle>
                    <Excerpt>{post.excerpt}</Excerpt>
                    <ReadMoreLink href={`/blog/${post.slug}` as never}>
                      {t('blog.readMore')}
                      <Icon name="arrow-right" size={13} style={{ transform: 'rotate(90deg)' }} />
                    </ReadMoreLink>
                  </PostContent>
                </PostCard>
              </Reveal>
            ))}
          </PostsGrid>
        </ArticlesSurface>

        {paginatedPosts.length === 0 && !featuredPost && (
          <NoResults>{t('blog.noResults')}</NoResults>
        )}

        {totalPages > 1 && (
          <PaginationNav aria-label={t('blog.paginationLabel')}>
            {previousHref ? (
              <PaginationLink href={previousHref as never}>{t('actions.previous')}</PaginationLink>
            ) : (
              <PaginationDisabled>{t('actions.previous')}</PaginationDisabled>
            )}
            {paginationLinks.map((link) => (
              <PaginationLink key={link.page} href={link.href as never} $active={link.active}>
                {link.page}
              </PaginationLink>
            ))}
            {nextHref ? (
              <PaginationLink href={nextHref as never}>{t('actions.next')}</PaginationLink>
            ) : (
              <PaginationDisabled>{t('actions.next')}</PaginationDisabled>
            )}
          </PaginationNav>
        )}
      </Container>
    </Section>
  );
};
