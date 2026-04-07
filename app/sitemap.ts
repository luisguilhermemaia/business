import { MetadataRoute } from 'next';
import { getAllCategories, getAllPostsMeta } from '../src/core/utils/blog';
import { allStructuredRoutes } from '../src/core/layout/siteStructure';

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000';

  const legacyRoutes = [
    '/about',
    '/services',
    '/location',
    '/contact',
    '/booking',
    '/instagram',
    '/politica-de-privacidade',
  ];

  const staticRoutes = Array.from(new Set([...allStructuredRoutes, ...legacyRoutes])).map(
    (path) => ({
      url: `${baseUrl}${path}`,
      lastModified: new Date(),
    })
  );

  const posts = getAllPostsMeta().map((post) => ({
    url: `${baseUrl}/blog/${post.slug}`,
    lastModified: post.date,
  }));

  const categories = getAllCategories().map((category) => ({
    url: `${baseUrl}/blog/categoria/${category.slug}`,
    lastModified: new Date(),
  }));

  return [...staticRoutes, ...posts, ...categories];
}
