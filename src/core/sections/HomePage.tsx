'use client';

import { BlogMeta } from '../utils/blog';
import { HeroSection } from './HeroSection';
import { TrustStripSection } from './TrustStripSection';
import { ServicesGridSection } from './ServicesGridSection';
import { StepsSection } from './StepsSection';
import { StatisticsSection } from './StatisticsSection';
import { TestimonialsSection } from './TestimonialsSection';
import { LocationSection } from './LocationSection';
import { BlogPreviewSection } from './BlogPreviewSection';
import { CTASection } from './CTASection';
import { SectionKey } from '../types/brand';

interface Props {
  sections: SectionKey[];
  posts: BlogMeta[];
}

export const HomePage = ({ sections, posts }: Props) => {
  const renderSection = (key: SectionKey) => {
    switch (key) {
      case 'hero':
        return <HeroSection key={key} />;
      case 'trust':
        return <TrustStripSection key={key} />;
      case 'services':
        return <ServicesGridSection key={key} />;
      case 'steps':
        return <StepsSection key={key} />;
      case 'testimonials':
        return <TestimonialsSection key={key} />;
      case 'location':
        return <LocationSection key={key} />;
      case 'blog':
        return <BlogPreviewSection key={key} posts={posts.slice(0, 3)} />;
      case 'cta':
        return <CTASection key={key} />;
      default:
        return null;
    }
  };

  return (
    <>
      {sections.map(renderSection)}
      {/* Add statistics section after services */}
      {sections.includes('services') && <StatisticsSection key="statistics" />}
    </>
  );
};
