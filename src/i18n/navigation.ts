import { createNavigation } from 'next-intl/navigation';
import { routing } from './routing';

/**
 * Locale-aware navigation utilities.
 *
 * Use these instead of next/link and next/navigation for any link
 * or programmatic navigation. They automatically inject the current
 * locale prefix.
 *
 *   import { Link, useRouter, usePathname } from '@/i18n/navigation';
 *
 *   <Link href="/investigations/gravity">...</Link>
 *   // renders as /en/investigations/gravity (or /fr/..., /de/..., /ar/...)
 */
export const { Link, redirect, usePathname, useRouter, getPathname } =
  createNavigation(routing);
