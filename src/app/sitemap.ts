import type { MetadataRoute } from 'next';

/**
 * sitemap.xml — tells Google about every page on the site.
 *
 * Includes all 4 locales × all investigation pages.
 * Submitted to Google Search Console for indexing.
 */
const BASE_URL = 'https://behstory.netlify.app';
const LOCALES = ['en', 'fr', 'de', 'ar'];

// All investigation IDs
const INVESTIGATIONS = [
  'gravity',
  'optics',
  'method',
  'calculus',
  'astro',
  'nav',
  'uni',
  'med',
  'alg',
];

export default function sitemap(): MetadataRoute.Sitemap {
  const entries: MetadataRoute.Sitemap = [];

  // Home page for each locale
  for (const locale of LOCALES) {
    entries.push({
      url: `${BASE_URL}/${locale}`,
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 1.0,
      alternates: {
        languages: {
          en: `${BASE_URL}/en`,
          fr: `${BASE_URL}/fr`,
          de: `${BASE_URL}/de`,
          ar: `${BASE_URL}/ar`,
        },
      },
    });
  }

  // Investigation pages for each locale
  for (const locale of LOCALES) {
    for (const inv of INVESTIGATIONS) {
      entries.push({
        url: `${BASE_URL}/${locale}?v=${inv}`,
        lastModified: new Date(),
        changeFrequency: 'monthly',
        priority: 0.9,
        alternates: {
          languages: {
            en: `${BASE_URL}/en?v=${inv}`,
            fr: `${BASE_URL}/fr?v=${inv}`,
            de: `${BASE_URL}/de?v=${inv}`,
            ar: `${BASE_URL}/ar?v=${inv}`,
          },
        },
      });
    }
  }

  return entries;
}
