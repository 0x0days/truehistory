'use client';

import { motion } from 'framer-motion';
import { LayoutGrid } from 'lucide-react';
import { useTranslations } from 'next-intl';

/**
 * A floating "back to all investigations" button.
 * Rendered on every investigation page so users can return to the selector.
 *
 * The onBack callback (passed from the page) handles the navigation,
 * using the i18n-aware router from @/i18n/navigation.
 */
export default function BackToSelectorButton({
  onBack,
}: {
  onBack: () => void;
}) {
  const t = useTranslations('Nav');
  return (
    <motion.button
      initial={{ opacity: 0, x: -20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ delay: 1, duration: 0.6 }}
      onClick={onBack}
      className="fixed top-4 left-4 z-50 flex items-center gap-2 px-3 py-2 rounded-full glass-card-gold border border-gold/30 hover:border-gold/60 hover:bg-gold/10 transition-all text-cream text-[10px] font-mono uppercase tracking-wider group"
      aria-label={t('backToCollection')}
    >
      <LayoutGrid className="w-3.5 h-3.5 text-gold group-hover:scale-110 transition-transform" />
      <span className="hidden sm:inline">{t('backToCollection')}</span>
      <span className="sm:hidden">{t('backToCollection').split(' ')[0]}</span>
    </motion.button>
  );
}
