'use client';

import { useState, useRef, useEffect } from 'react';
import { useLocale, useTranslations } from 'next-intl';
import { useRouter, usePathname } from '@/i18n/navigation';
import { Globe, Check, ChevronDown } from 'lucide-react';
import { localeNames, routing } from '@/i18n/routing';
import { motion, AnimatePresence } from 'framer-motion';

/**
 * LanguageSwitcher — premium dropdown for switching between the 4 locales.
 *
 * Behavior:
 *   - Click globe icon → dropdown opens with all 4 languages
 *   - Click a language → router.replace() to the same path under the new locale
 *   - The locale choice is automatically saved to the NEXT_LOCALE cookie by
 *     next-intl's middleware (so it persists across sessions)
 *   - Closes on outside click or escape key
 *
 * Placement: top-right of every page, fixed position so it's always accessible.
 */
export default function LanguageSwitcher({
  variant = 'fixed',
}: {
  variant?: 'fixed' | 'inline';
}) {
  const t = useTranslations('Nav');
  const locale = useLocale() as 'en' | 'fr' | 'de' | 'ar';
  const router = useRouter();
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  // Close on outside click
  useEffect(() => {
    const handleClick = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) {
        setOpen(false);
      }
    };
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setOpen(false);
    };
    document.addEventListener('mousedown', handleClick);
    document.addEventListener('keydown', handleEscape);
    return () => {
      document.removeEventListener('mousedown', handleClick);
      document.removeEventListener('keydown', handleEscape);
    };
  }, []);

  const switchLocale = (newLocale: 'en' | 'fr' | 'de' | 'ar') => {
    if (newLocale === locale) {
      setOpen(false);
      return;
    }
    // router.replace with the same pathname but new locale
    // next-intl's router automatically handles the locale prefix
    router.replace(pathname, { locale: newLocale });
    setOpen(false);
  };

  const currentLocaleInfo = localeNames[locale];

  const positionClass =
    variant === 'fixed'
      ? 'fixed top-4 right-4 z-50'
      : 'relative';

  return (
    <div ref={ref} className={positionClass}>
      <button
        onClick={() => setOpen(!open)}
        aria-label={t('selectLanguage')}
        aria-expanded={open}
        className="group flex items-center gap-2 px-3 py-2 rounded-full glass-premium hover:border-ember/50 transition-all duration-300 text-xs font-mono uppercase tracking-wider"
      >
        <Globe className="w-4 h-4 text-ember" />
        <span className="text-cream-dim hidden sm:inline">{currentLocaleInfo?.native}</span>
        <span className="text-base leading-none">{currentLocaleInfo?.flag}</span>
        <ChevronDown
          className={`w-3 h-3 text-cream-dim transition-transform duration-300 ${open ? 'rotate-180' : ''}`}
        />
      </button>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: -8, scale: 0.96 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -8, scale: 0.96 }}
            transition={{ duration: 0.2, ease: [0.16, 1, 0.3, 1] }}
            className="absolute top-full right-0 mt-2 w-48 rounded-xl glass-premium overflow-hidden shadow-premium"
          >
            <div className="p-2">
              <p className="text-[10px] font-mono uppercase tracking-widest text-cream-dim/60 px-3 py-2">
                {t('language')}
              </p>
              {routing.locales.map((loc) => {
                const info = localeNames[loc];
                const isActive = loc === locale;
                return (
                  <button
                    key={loc}
                    onClick={() => switchLocale(loc as 'en' | 'fr' | 'de' | 'ar')}
                    className={`w-full flex items-center gap-3 px-3 py-2 rounded-lg transition-all duration-200 ${
                      isActive
                        ? 'bg-ember/15 text-ember'
                        : 'text-cream hover:bg-aether-soft/50 hover:text-ember-bright'
                    }`}
                  >
                    <span className="text-base">{info.flag}</span>
                    <span className="flex-1 text-left text-sm font-medium">
                      {info.native}
                    </span>
                    {isActive && <Check className="w-4 h-4" />}
                  </button>
                );
              })}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
