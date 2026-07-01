import createMiddleware from 'next-intl/middleware';
import { routing } from './i18n/routing';

/**
 * Locale detection middleware.
 *
 * Detection order (most accurate method for multilingual sites):
 *   1. URL path prefix (/en, /fr, /de, /ar) — explicit user choice
 *   2. NEXT_LOCALE cookie — returning user's saved preference
 *   3. Accept-Language HTTP header — browser/region preference
 *      (more accurate than IP geolocation — a French speaker in
 *       Germany still gets French because their browser sends fr-FR)
 *   4. Default locale (English)
 *
 * On first visit (no prefix, no cookie), the middleware:
 *   - Parses the Accept-Language header
 *   - Picks the best matching locale
 *   - Redirects to /<locale>/...
 *   - Sets the NEXT_LOCALE cookie so the choice persists
 *
 * Netlify runs this on edge functions automatically — no extra config needed.
 */
export default createMiddleware(routing);

export const config = {
  // Match all pathnames except for
  // - /api (API routes)
  // - /_next (Next.js internals)
  // - /.*\\..* (files with extensions, e.g. favicon.ico, robots.txt)
  // - /images (static image files)
  matcher: ['/((?!api|_next|.*\\..*|images).*)'],
};
