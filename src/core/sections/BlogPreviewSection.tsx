'use client';

import Link from 'next/link';
import styled from 'styled-components';
import { BlogMeta } from '../utils/blog';
import { useI18n } from '../i18n/I18nProvider';
import { Badge } from '../design-system/components/Badge';
import { LinkButton } from '../design-system/components/Button';
import { Card, Container, Grid, Section, Stack } from '../design-system/primitives';
import { Icon } from '../icons/Icon';
import { formatDate } from '../utils/format';
import { Reveal } from '../design-system/components/Reveal';
import { hexToRgba } from '../utils/colors';

const Title = styled.h2`
  font-size: ${({ theme }) => theme.typography.sizes.xxl};
  line-height: ${({ theme }) => theme.typography.lineHeights?.tight || 1.2};
  margin-bottom: ${({ theme }) => theme.spacing.md}px;
`;

const Excerpt = styled.p`
  color: ${({ theme }) => theme.colors.textMuted};
  font-size: ${({ theme }) => theme.typography.sizes.sm};
  line-height: ${({ theme }) => theme.typography.lineHeights?.relaxed || 1.75};
`;

const Tag = styled.span`
  display: inline-flex;
  align-items: center;
  gap: ${({ theme }) => theme.spacing.xs}px;
  padding: ${({ theme }) => theme.spacing.xs}px ${({ theme }) => theme.spacing.sm}px;
  border-radius: ${({ theme }) => theme.radii.md};
  background: ${({ theme }) => hexToRgba(theme.colors.primary, 0.1)};
  border: 1px solid ${({ theme }) => hexToRgba(theme.colors.primary, 0.25)};
  color: ${({ theme }) => theme.colors.primary};
  font-size: ${({ theme }) => theme.typography.sizes.xs};
  font-weight: ${({ theme }) => theme.typography.weights.medium};
`;

const PostTitle = styled.h3`
  font-size: ${({ theme }) => theme.typography.sizes.lg};
  margin-bottom: ${({ theme }) => theme.spacing.sm}px;
  line-height: ${({ theme }) => theme.typography.lineHeights?.tight || 1.2};

  a {
    color: ${({ theme }) => theme.colors.text};
    transition: color ${({ theme }) => theme.motion?.duration.fast || '150ms'}
      ${({ theme }) => theme.motion?.easing.ease || 'ease'};

    &:hover {
      color: ${({ theme }) => theme.colors.primary};
    }
  }
`;

const ReadingMeta = styled.div`
  display: flex;
  align-items: center;
  gap: ${({ theme }) => theme.spacing.sm}px;
  margin-top: auto;
  font-size: 0.875rem;
  color: ${({ theme }) => theme.colors.textMuted};
`;

interface Props {
  posts: BlogMeta[];
}

export const BlogPreviewSection = ({ posts }: Props) => {
  const { t, locale } = useI18n();
  return (
    <Section background="card">
      <Container width="wide">
        <Stack gap="md">
          <Badge tone="teal">{t('blog.title')}</Badge>
          <Title>{t('blog.headline')}</Title>
          <Excerpt>{t('blog.subtitle')}</Excerpt>
        </Stack>
        <Grid gap="lg">
          {posts.map((post, idx) => (
            <Reveal key={post.slug} delay={0.1 + idx * 0.06}>
              <Card
                elevation="md"
                style={{ display: 'flex', flexDirection: 'column', height: '100%' }}
              >
                <Stack gap="md">
                  <Stack direction="row" gap="sm" align="center" style={{ flexWrap: 'wrap' }}>
                    <Tag>
                      <Icon name="calendar" size={14} />
                      {formatDate(post.date, locale)}
                    </Tag>
                    {post.tags?.slice(0, 2).map((tag) => (
                      <Tag key={tag}>
                        <Icon name="tag" size={12} />
                        {tag}
                      </Tag>
                    ))}
                  </Stack>
                  <PostTitle>
                    <Link href={`/blog/${post.slug}`}>{post.title}</Link>
                  </PostTitle>
                  <Excerpt>{post.excerpt}</Excerpt>
                  <ReadingMeta>
                    <Icon name="clock" size={16} />
                    <span>
                      {post.readingTime} {t('blog.minRead')}
                    </span>
                  </ReadingMeta>
                  <LinkButton
                    href={`/blog/${post.slug}`}
                    variant="secondary"
                    style={{ marginTop: '8px' }}
                  >
                    {t('blog.readMore')}
                  </LinkButton>
                </Stack>
              </Card>
            </Reveal>
          ))}
        </Grid>
        <div style={{ marginTop: '48px', textAlign: 'center' }}>
          <LinkButton href="/blog" variant="secondary" size="md">
            {t('blog.viewAll')}
          </LinkButton>
        </div>
      </Container>
    </Section>
  );
};
