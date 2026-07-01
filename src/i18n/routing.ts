import { defineRouting } from 'next-intl/routing';

/**
 * Locale routing configuration.
 *
 * Defines the 4 supported locales, the path-based routing strategy,
 * and the locale detection logic.
 */
export const routing = defineRouting({
  // 4 supported locales — English (default), French, German, Arabic (RTL)
  locales: ['en', 'fr', 'de', 'ar'],

  // Default locale — used when no prefix is present (Netlify root)
  defaultLocale: 'en',

  // Always prefix the locale in the URL — even for English.
  // This is the most predictable + SEO-friendly approach.
  // /en/investigations/gravity  /fr/investigations/gravité  etc.
  localePrefix: 'always',

  // Locale detection — used by middleware
  // 1. Check URL prefix (explicit user choice)
  // 2. Check NEXT_LOCALE cookie (returning user preference)
  // 3. Parse Accept-Language header (browser/region preference)
  // 4. Fall back to defaultLocale (en)
});

// Locale display names — for the language switcher UI
export const localeNames: Record<string, { label: string; native: string; flag: string; dir: 'ltr' | 'rtl' }> = {
  en: { label: 'English', native: 'English', flag: '🇬🇧', dir: 'ltr' },
  fr: { label: 'French', native: 'Français', flag: '🇫🇷', dir: 'ltr' },
  de: { label: 'German', native: 'Deutsch', flag: '🇩🇪', dir: 'ltr' },
  ar: { label: 'Arabic', native: 'العربية', flag: '🇸🇦', dir: 'rtl' },
};

// Helper: get text direction for a locale
export function getLocaleDirection(locale: string): 'ltr' | 'rtl' {
  return localeNames[locale]?.dir ?? 'ltr';
}
