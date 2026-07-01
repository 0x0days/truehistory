import type { MetadataRoute } from 'next';

/**
 * robots.txt — controls crawler access.
 *
 * Allows all crawlers (Google, Bing, etc.) to index everything.
 * Points them to the sitemap.
 */
export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: '*',
      allow: '/',
      disallow: ['/api/', '/_next/'],
    },
    sitemap: 'https://behstory.netlify.app/sitemap.xml',
    host: 'https://behstory.netlify.app',
  };
}
