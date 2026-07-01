import { getRequestConfig } from 'next-intl/server';
import { routing } from './routing';

/**
 * Server-side request config — loads the correct message file
 * for the requested locale.
 *
 * Falls back to English if a message key is missing in the requested
 * locale (prevents "key not found" errors during translation work).
 */
export default getRequestConfig(async ({ requestLocale }) => {
  // This corresponds to the [locale] segment
  let locale = await requestLocale;

  // Validate that the incoming locale is supported
  if (!locale || !routing.locales.includes(locale as 'en' | 'fr' | 'de' | 'ar')) {
    locale = routing.defaultLocale;
  }

  return {
    locale,
    messages: (await import(`../../messages/${locale}.json`)).default,
  };
});
