'use client';

import Link from 'next/link';
import { useMemo, useState } from 'react';
import styled from 'styled-components';
import { BlogMeta } from '../utils/blog';
import { useI18n } from '../i18n/I18nProvider';
import { Input } from '../design-system/components/FormControls';
import { Card, Container, Grid, Section, Stack } from '../design-system/primitives';
import { Icon } from '../icons/Icon';
import { formatDate } from '../utils/format';
import { Reveal } from '../design-system/components/Reveal';

const Title = styled.h1`
  font-size: clamp(2rem, 4vw, ${({ theme }) => theme.typography.sizes.xxl});
  line-height: ${({ theme }) => theme.typography.lineHeights?.tight || 1.2};
  margin-bottom: ${({ theme }) => theme.spacing.md}px;
`;

const Subtitle = styled.p`
  color: ${({ theme }) => theme.colors.textMuted};
  max-width: 780px;
  line-height: ${({ theme }) => theme.typography.lineHeights?.relaxed || 1.75};
  margin-bottom: ${({ theme }) => theme.spacing.lg}px;
`;

const Excerpt = styled.p`
  color: ${({ theme }) => theme.colors.textMuted};
  line-height: 1.75;
  font-size: 0.95rem;
  margin: 0;
`;

const Tag = styled.button<{ active: boolean }>`
  border: 1px solid ${({ theme, active }) => (active ? theme.colors.primary : theme.colors.border)};
  border-radius: ${({ theme }) => theme.radii.md};
  padding: ${({ theme }) => theme.spacing.sm}px ${({ theme }) => theme.spacing.md}px;
  background: ${({ active, theme }) => (active ? theme.colors.primary : theme.colors.surface)};
  color: ${({ active, theme }) => (active ? theme.colors.primaryContrast : theme.colors.text)};
  cursor: pointer;
  display: inline-flex;
  align-items: center;
  gap: ${({ theme }) => theme.spacing.xs}px;
  font-size: ${({ theme }) => theme.typography.sizes.sm};
  font-weight: ${({ theme, active }) =>
    active ? theme.typography.weights.semi : theme.typography.weights.medium};
  transition: all ${({ theme }) => theme.motion?.duration.fast || '150ms'}
    ${({ theme }) => theme.motion?.easing.ease || 'ease'};

  &:hover {
    border-color: ${({ theme }) => theme.colors.primary};
    background: ${({ active, theme }) =>
      active ? theme.colors.primaryStrong : theme.colors.surfaceMuted};
  }

  &:focus-visible {
    outline: 2px solid ${({ theme }) => theme.colors.primary};
    outline-offset: 2px;
  }
`;

const MetaRow = styled.div`
  display: inline-flex;
  align-items: center;
  gap: ${({ theme }) => theme.spacing.md}px;
  color: ${({ theme }) => theme.colors.textMuted};
  flex-wrap: wrap;
  font-size: ${({ theme }) => theme.typography.sizes.sm};
`;

const NoResults = styled.p`
  text-align: center;
  padding: 48px 0;
  margin: 0;
  color: ${({ theme }) => theme.colors.textMuted};
`;

interface Props {
  posts: BlogMeta[];
  introTitle: string;
  introDescription: string;
}

export const BlogIndexPage = ({ posts, introTitle, introDescription }: Props) => {
  const { t, locale } = useI18n();
  const [query, setQuery] = useState('');
  const [tag, setTag] = useState<string | null>(null);

  const tags = useMemo(() => Array.from(new Set(posts.flatMap((p) => p.tags || []))), [posts]);

  const filtered = useMemo(() => {
    return posts.filter((post) => {
      const matchesQuery =
        post.title.toLowerCase().includes(query.toLowerCase()) ||
        post.excerpt.toLowerCase().includes(query.toLowerCase());
      const matchesTag = tag ? post.tags?.includes(tag) : true;
      return matchesQuery && matchesTag;
    });
  }, [posts, query, tag]);

  return (
    <Section>
      <Container width="wide">
        <Stack gap="lg">
          <Title>{introTitle}</Title>
          <Subtitle>{introDescription}</Subtitle>
          <Input
            placeholder={t('blog.searchPlaceholder')}
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            style={{ maxWidth: '500px' }}
          />
          {tags.length > 0 && (
            <Stack
              direction="row"
              gap="sm"
              align="center"
              style={{ flexWrap: 'wrap', marginTop: '8px' }}
            >
              <strong style={{ fontSize: '0.95rem' }}>{t('blog.filterTags')}:</strong>
              <Tag active={!tag} onClick={() => setTag(null)}>
                <Icon name="check" size={14} /> {t('actions.all')}
              </Tag>
              {tags.map((item) => (
                <Tag key={item} active={tag === item} onClick={() => setTag(item)}>
                  <Icon name="tag" size={12} />
                  {item}
                </Tag>
              ))}
            </Stack>
          )}
        </Stack>
        <Grid gap="lg" style={{ marginTop: '32px' }}>
          {filtered.map((post, idx) => (
            <Reveal key={post.slug} delay={0.08 + idx * 0.05}>
              <Card
                elevation="md"
                style={{ display: 'flex', flexDirection: 'column', height: '100%' }}
              >
                <Stack gap="md">
                  <MetaRow>
                    <span style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                      <Icon name="calendar" size={14} /> {formatDate(post.date, locale)}
                    </span>
                    <span style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                      <Icon name="clock" size={14} /> {post.readingTime} {t('blog.minRead')}
                    </span>
                  </MetaRow>
                  <Link
                    href={`/blog/${post.slug}`}
                    style={{ color: 'inherit', textDecoration: 'none' }}
                  >
                    <h3 style={{ fontSize: '1.25rem', lineHeight: '1.3', marginBottom: '8px' }}>
                      {post.title}
                    </h3>
                  </Link>
                  <Excerpt>{post.excerpt}</Excerpt>
                  <MetaRow style={{ marginTop: 'auto', paddingTop: '8px' }}>
                    {post.tags?.map((t) => (
                      <span key={t} style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
                        <Icon name="tag" size={12} /> {t}
                      </span>
                    ))}
                  </MetaRow>
                </Stack>
              </Card>
            </Reveal>
          ))}
        </Grid>
        {filtered.length === 0 && <NoResults>{t('blog.noResults')}</NoResults>}
      </Container>
    </Section>
  );
};
