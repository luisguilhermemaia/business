import { MetadataRoute } from 'next';
import { getAllPostsMeta } from '../src/core/utils/blog';

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000';
  const staticRoutes = ['', '/about', '/services', '/location', '/contact', '/booking', '/blog'].map((path) => ({
    url: `${baseUrl}${path}`,
    lastModified: new Date()
  }));

  const posts = getAllPostsMeta().map((post) => ({
    url: `${baseUrl}/blog/${post.slug}`,
    lastModified: post.date
  }));

  return [...staticRoutes, ...posts];
}
