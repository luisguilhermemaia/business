'use client';

import Image from 'next/image';
import Link from 'next/link';
import { ComponentProps } from 'react';
import styled from 'styled-components';
import { BlogMeta, BlogPost } from '../utils/blog';
import { useI18n } from '../i18n/I18nProvider';
import { Container, Section } from '../design-system/primitives';
import { Icon } from '../icons/Icon';
import { formatDate } from '../utils/format';

const BackLink = styled(Link)<Omit<ComponentProps<typeof Link>, 'href'> & { href: string }>`
  display: inline-flex;
  align-items: center;
  gap: ${({ theme }) => theme.spacing.sm}px;
  color: ${({ theme }) => theme.colors.textMuted};
  text-decoration: none;
  font-size: ${({ theme }) => theme.typography.sizes.sm};
  margin-bottom: ${({ theme }) => theme.spacing.xl}px;
  transition: color ${({ theme }) => theme.motion?.duration.fast || '150ms'}
    ${({ theme }) => theme.motion?.easing.ease || 'ease'};

  &:hover {
    color: ${({ theme }) => theme.colors.primary};
  }
`;

const PostHeader = styled.div`
  max-width: 800px;
  margin: 0 auto;
  text-align: center;
  margin-bottom: ${({ theme }) => theme.spacing.xxl}px;
`;

const Title = styled.h1`
  font-size: clamp(2.25rem, 5vw + 0.5rem, 3.5rem);
  line-height: 1.2;
  margin-bottom: ${({ theme }) => theme.spacing.lg}px;
  color: ${({ theme }) => theme.colors.text};
  font-family: ${({ theme }) => theme.typography.fonts.heading};
  font-weight: ${({ theme }) => theme.typography.weights.bold};
  letter-spacing: -0.02em;
`;

const Excerpt = styled.p`
  color: ${({ theme }) => theme.colors.textMuted};
  margin-bottom: ${({ theme }) => theme.spacing.xl}px;
  font-size: ${({ theme }) => theme.typography.sizes.lg};
  line-height: 1.75;
  max-width: 680px;
  margin-left: auto;
  margin-right: auto;
`;

const MetaRow = styled.div`
  display: flex;
  gap: ${({ theme }) => theme.spacing.md}px;
  align-items: center;
  justify-content: center;
  color: ${({ theme }) => theme.colors.textMuted};
  flex-wrap: wrap;
  font-size: ${({ theme }) => theme.typography.sizes.sm};
  margin-bottom: ${({ theme }) => theme.spacing.xl}px;
  padding-bottom: ${({ theme }) => theme.spacing.lg}px;
  border-bottom: 1px solid ${({ theme }) => theme.colors.border};
`;

const TagBadge = styled.span`
  display: inline-flex;
  align-items: center;
  gap: ${({ theme }) => theme.spacing.xs}px;
  padding: ${({ theme }) => theme.spacing.xs}px ${({ theme }) => theme.spacing.md}px;
  border-radius: ${({ theme }) => theme.radii.pill};
  background: ${({ theme }) => theme.colors.surfaceMuted};
  color: ${({ theme }) => theme.colors.primary};
  font-size: ${({ theme }) => theme.typography.sizes.xs};
  font-weight: ${({ theme }) => theme.typography.weights.semi};
  border: 1px solid ${({ theme }) => theme.colors.border};
`;

const CoverImage = styled.div`
  position: relative;
  width: 100%;
  height: 400px;
  border-radius: ${({ theme }) => theme.radii.xl || theme.radii.lg};
  overflow: hidden;
  margin-bottom: ${({ theme }) => theme.spacing.xxl}px;
  background: ${({ theme }) => theme.colors.surfaceMuted};
  box-shadow: ${({ theme }) => theme.shadows.md || theme.shadows.medium};

  img {
    object-fit: cover;
  }

  @media (max-width: ${({ theme }) => theme.breakpoints.md}) {
    height: 280px;
    margin-bottom: ${({ theme }) => theme.spacing.xl}px;
  }
`;

const Article = styled.article`
  max-width: 720px;
  margin: 0 auto;
  line-height: 1.8;
  color: ${({ theme }) => theme.colors.text};
  font-size: ${({ theme }) => theme.typography.sizes.md};

  h2 {
    font-size: clamp(1.75rem, 3vw, 2.25rem);
    margin-top: ${({ theme }) => theme.spacing.xxl * 1.5}px;
    margin-bottom: ${({ theme }) => theme.spacing.lg}px;
    line-height: 1.3;
    color: ${({ theme }) => theme.colors.text};
    font-family: ${({ theme }) => theme.typography.fonts.heading};
    font-weight: ${({ theme }) => theme.typography.weights.bold};
    letter-spacing: -0.01em;
  }

  h3 {
    font-size: clamp(1.375rem, 2.5vw, 1.75rem);
    margin-top: ${({ theme }) => theme.spacing.xxl}px;
    margin-bottom: ${({ theme }) => theme.spacing.md}px;
    line-height: 1.35;
    color: ${({ theme }) => theme.colors.text};
    font-family: ${({ theme }) => theme.typography.fonts.heading};
    font-weight: ${({ theme }) => theme.typography.weights.semi};
  }

  h4 {
    font-size: ${({ theme }) => theme.typography.sizes.lg};
    margin-top: ${({ theme }) => theme.spacing.xl}px;
    margin-bottom: ${({ theme }) => theme.spacing.sm}px;
    color: ${({ theme }) => theme.colors.text};
    font-weight: ${({ theme }) => theme.typography.weights.semi};
  }

  p {
    margin-bottom: ${({ theme }) => theme.spacing.lg}px;
    line-height: 1.8;
    color: ${({ theme }) => theme.colors.text};
  }

  ul,
  ol {
    padding-left: ${({ theme }) => theme.spacing.xl}px;
    margin-bottom: ${({ theme }) => theme.spacing.lg}px;
    color: ${({ theme }) => theme.colors.text};
    line-height: 1.8;
  }

  li {
    margin-bottom: ${({ theme }) => theme.spacing.sm}px;

    &::marker {
      color: ${({ theme }) => theme.colors.primary};
    }
  }

  blockquote {
    border-left: 4px solid ${({ theme }) => theme.colors.primary};
    padding-left: ${({ theme }) => theme.spacing.lg}px;
    margin: ${({ theme }) => theme.spacing.xl}px 0;
    font-style: italic;
    color: ${({ theme }) => theme.colors.textMuted};
    background: ${({ theme }) => theme.colors.surfaceMuted};
    padding: ${({ theme }) => theme.spacing.lg}px;
    border-radius: ${({ theme }) => theme.radii.md};
  }

  code {
    background: ${({ theme }) => theme.colors.surfaceMuted};
    padding: 3px 8px;
    border-radius: ${({ theme }) => theme.radii.sm};
    font-size: 0.9em;
    font-family: 'Monaco', 'Courier New', monospace;
    color: ${({ theme }) => theme.colors.primary};
  }

  pre {
    background: ${({ theme }) => theme.colors.surfaceMuted};
    padding: ${({ theme }) => theme.spacing.lg}px;
    border-radius: ${({ theme }) => theme.radii.md};
    overflow-x: auto;
    margin: ${({ theme }) => theme.spacing.xl}px 0;
    border: 1px solid ${({ theme }) => theme.colors.border};

    code {
      background: transparent;
      padding: 0;
      color: ${({ theme }) => theme.colors.text};
    }
  }

  a {
    color: ${({ theme }) => theme.colors.primary};
    text-decoration: underline;
    text-underline-offset: 3px;
    transition: color ${({ theme }) => theme.motion?.duration.fast || '150ms'}
      ${({ theme }) => theme.motion?.easing.ease || 'ease'};

    &:hover {
      color: ${({ theme }) => theme.colors.primaryStrong};
    }
  }

  img {
    width: 100%;
    height: auto;
    border-radius: ${({ theme }) => theme.radii.md};
    margin: ${({ theme }) => theme.spacing.xl}px 0;
  }

  hr {
    border: none;
    border-top: 1px solid ${({ theme }) => theme.colors.border};
    margin: ${({ theme }) => theme.spacing.xxl}px 0;
  }
`;

const AdjacentSection = styled.div`
  margin-top: ${({ theme }) => theme.spacing.xxl * 2}px;
  padding-top: ${({ theme }) => theme.spacing.xl}px;
  border-top: 1px solid ${({ theme }) => theme.colors.border};
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: ${({ theme }) => theme.spacing.xl}px;

  @media (max-width: ${({ theme }) => theme.breakpoints.md}) {
    grid-template-columns: 1fr;
  }
`;

const AdjacentCard = styled(Link)<Omit<ComponentProps<typeof Link>, 'href'> & { href: string }>`
  display: flex;
  flex-direction: column;
  gap: ${({ theme }) => theme.spacing.sm}px;
  padding: ${({ theme }) => theme.spacing.lg}px;
  border-radius: ${({ theme }) => theme.radii.lg};
  background: ${({ theme }) => theme.colors.surface};
  border: 1px solid ${({ theme }) => theme.colors.border};
  text-decoration: none;
  transition: all ${({ theme }) => theme.motion?.duration.normal || '250ms'}
    ${({ theme }) => theme.motion?.easing.ease || 'ease'};

  &:hover {
    transform: translateY(-2px);
    box-shadow: ${({ theme }) => theme.shadows.md || theme.shadows.medium};
    border-color: ${({ theme }) => theme.colors.primary};
  }
`;

const AdjacentLabel = styled.div`
  font-size: ${({ theme }) => theme.typography.sizes.xs};
  color: ${({ theme }) => theme.colors.textMuted};
  text-transform: uppercase;
  letter-spacing: 0.1em;
  font-weight: ${({ theme }) => theme.typography.weights.semi};
  margin-bottom: ${({ theme }) => theme.spacing.xs}px;
`;

const AdjacentTitle = styled.div`
  font-size: ${({ theme }) => theme.typography.sizes.md};
  color: ${({ theme }) => theme.colors.text};
  font-weight: ${({ theme }) => theme.typography.weights.semi};
  line-height: 1.4;
`;

interface Props {
  post: Omit<BlogPost, 'Content'>;
  previous: BlogMeta | null;
  next: BlogMeta | null;
  children: React.ReactNode;
}

export const BlogPostPage = ({ post, previous, next, children }: Props) => {
  const { t, locale } = useI18n();
  return (
    <Section>
      <Container width="wide">
        <BackLink href="/blog">
          <Icon name="arrow-right" size={16} style={{ transform: 'rotate(180deg)' }} />
          {t('actions.back') || 'Voltar ao blog'}
        </BackLink>

        <PostHeader>
          <Title>{post.title}</Title>
          <Excerpt>{post.excerpt}</Excerpt>
          <MetaRow>
            <span style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
              <Icon name="calendar" size={14} /> {formatDate(post.date, locale)}
            </span>
            <span style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
              <Icon name="clock" size={14} /> {post.readingTime} {t('blog.minRead')}
            </span>
            {post.tags?.map((tag) => (
              <TagBadge key={tag}>
                <Icon name="tag" size={12} />
                {tag}
              </TagBadge>
            ))}
          </MetaRow>
        </PostHeader>

        {post.cover && (
          <CoverImage>
            <Image
              src={post.cover}
              alt={post.title}
              fill
              sizes="(max-width: 768px) 100vw, 1200px"
              style={{ objectFit: 'cover' }}
            />
          </CoverImage>
        )}

        <Article>
          {children}
        </Article>

        {(previous || next) && (
          <AdjacentSection>
            {previous ? (
              <AdjacentCard href={`/blog/${previous.slug}`}>
                <AdjacentLabel>← {t('actions.previous') || 'Anterior'}</AdjacentLabel>
                <AdjacentTitle>{previous.title}</AdjacentTitle>
              </AdjacentCard>
            ) : (
              <div />
            )}
            {next ? (
              <AdjacentCard href={`/blog/${next.slug}`} style={{ textAlign: 'right' }}>
                <AdjacentLabel style={{ textAlign: 'right' }}>
                  {t('actions.next') || 'Próximo'} →
                </AdjacentLabel>
                <AdjacentTitle>{next.title}</AdjacentTitle>
              </AdjacentCard>
            ) : (
              <div />
            )}
          </AdjacentSection>
        )}
      </Container>
    </Section>
  );
};
