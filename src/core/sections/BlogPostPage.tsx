'use client';

import Link from 'next/link';
import styled from 'styled-components';
import { BlogMeta, BlogPost } from '../utils/blog';
import { useI18n } from '../i18n/I18nProvider';
import { Container, Section, Stack } from '../design-system/primitives';
import { Icon } from '../icons/Icon';
import { formatDate } from '../utils/format';

const Title = styled.h1`
  font-size: clamp(2rem, 5vw, ${({ theme }) => theme.typography.sizes.display});
  line-height: ${({ theme }) => theme.typography.lineHeights?.tight || 1.15};
  margin-bottom: ${({ theme }) => theme.spacing.md}px;
  letter-spacing: ${({ theme }) => theme.typography.letterSpacings.tight};
`;

const Excerpt = styled.p`
  color: ${({ theme }) => theme.colors.textMuted};
  margin-bottom: ${({ theme }) => theme.spacing.lg}px;
  font-size: ${({ theme }) => theme.typography.sizes.lg};
  line-height: ${({ theme }) => theme.typography.lineHeights?.relaxed || 1.75};
`;

const MetaRow = styled.div`
  display: flex;
  gap: ${({ theme }) => theme.spacing.md}px;
  align-items: center;
  color: ${({ theme }) => theme.colors.textMuted};
  flex-wrap: wrap;
  font-size: ${({ theme }) => theme.typography.sizes.sm};
  margin-bottom: ${({ theme }) => theme.spacing.xl}px;
  padding-bottom: ${({ theme }) => theme.spacing.lg}px;
  border-bottom: 1px solid ${({ theme }) => theme.colors.border};
`;

const Article = styled.article`
  margin-top: ${({ theme }) => theme.spacing.xl}px;
  line-height: ${({ theme }) => theme.typography.lineHeights?.relaxed || 1.75};
  color: ${({ theme }) => theme.colors.text};
  max-width: 70ch;
  font-size: ${({ theme }) => theme.typography.sizes.md};
  
  h2 {
    font-size: ${({ theme }) => theme.typography.sizes.xl};
    margin-top: ${({ theme }) => theme.spacing.xxl}px;
    margin-bottom: ${({ theme }) => theme.spacing.md}px;
    line-height: ${({ theme }) => theme.typography.lineHeights?.tight || 1.2};
  }
  
  h3 {
    font-size: ${({ theme }) => theme.typography.sizes.lg};
    margin-top: ${({ theme }) => theme.spacing.xl}px;
    margin-bottom: ${({ theme }) => theme.spacing.sm}px;
    line-height: ${({ theme }) => theme.typography.lineHeights?.tight || 1.2};
  }
  
  h4 {
    font-size: ${({ theme }) => theme.typography.sizes.md};
    margin-top: ${({ theme }) => theme.spacing.lg}px;
    margin-bottom: ${({ theme }) => theme.spacing.sm}px;
  }
  
  p {
    margin-bottom: ${({ theme }) => theme.spacing.lg}px;
    line-height: ${({ theme }) => theme.typography.lineHeights?.relaxed || 1.75};
  }
  
  ul, ol {
    padding-left: ${({ theme }) => theme.spacing.xl}px;
    margin-bottom: ${({ theme }) => theme.spacing.lg}px;
    color: ${({ theme }) => theme.colors.textMuted};
    line-height: ${({ theme }) => theme.typography.lineHeights?.relaxed || 1.75};
  }
  
  li {
    margin-bottom: ${({ theme }) => theme.spacing.sm}px;
  }
  
  blockquote {
    border-left: 3px solid ${({ theme }) => theme.colors.primary};
    padding-left: ${({ theme }) => theme.spacing.lg}px;
    margin: ${({ theme }) => theme.spacing.xl}px 0;
    font-style: italic;
    color: ${({ theme }) => theme.colors.textMuted};
  }
  
  code {
    background: ${({ theme }) => theme.colors.surfaceMuted};
    padding: 2px 6px;
    border-radius: ${({ theme }) => theme.radii.sm};
    font-size: 0.9em;
    font-family: 'Monaco', 'Courier New', monospace;
  }
  
  pre {
    background: ${({ theme }) => theme.colors.surfaceMuted};
    padding: ${({ theme }) => theme.spacing.lg}px;
    border-radius: ${({ theme }) => theme.radii.md};
    overflow-x: auto;
    margin: ${({ theme }) => theme.spacing.lg}px 0;
  }
  
  a {
    color: ${({ theme }) => theme.colors.primary};
    text-decoration: underline;
    text-underline-offset: 2px;
  }
`;

const Adjacent = styled.div`
  margin-top: ${({ theme }) => theme.spacing.xxl}px;
  padding-top: ${({ theme }) => theme.spacing.lg}px;
  border-top: 1px solid ${({ theme }) => theme.colors.border};
  display: flex;
  gap: ${({ theme }) => theme.spacing.lg}px;
  flex-wrap: wrap;
  justify-content: space-between;
  
  a {
    color: ${({ theme }) => theme.colors.primary};
    font-weight: ${({ theme }) => theme.typography.weights.semi};
    transition: color ${({ theme }) => theme.motion?.duration.fast || '150ms'} ${({ theme }) => theme.motion?.easing.ease || 'ease'};
    
    &:hover {
      color: ${({ theme }) => theme.colors.primaryStrong};
    }
  }
`;

interface Props {
  post: BlogPost;
  previous: BlogMeta | null;
  next: BlogMeta | null;
}

export const BlogPostPage = ({ post, previous, next }: Props) => {
  const { t, locale } = useI18n();
  return (
    <Section>
      <Container>
        <Title>{post.title}</Title>
        <Excerpt>{post.excerpt}</Excerpt>
        <MetaRow>
          <span>
            <Icon name="calendar" size={14} /> {formatDate(post.date, locale)}
          </span>
          <span>
            <Icon name="clock" size={14} /> {post.readingTime} {t('blog.minRead')}
          </span>
          {post.tags?.map((tag) => (
            <span key={tag}>
              <Icon name="tag" size={12} /> {tag}
            </span>
          ))}
        </MetaRow>
        <Article>
          <post.Content />
        </Article>
        <Adjacent>
          {previous && (
            <Link href={`/blog/${previous.slug}`}>
              ← {previous.title}
            </Link>
          )}
          {next && (
            <Link href={`/blog/${next.slug}`}>
              {next.title} →
            </Link>
          )}
        </Adjacent>
      </Container>
    </Section>
  );
};
