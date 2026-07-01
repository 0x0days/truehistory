'use client';

import Image from 'next/image';
import { motion } from 'framer-motion';
import { ArrowRight, ScrollText } from 'lucide-react';
import { useTranslations } from 'next-intl';

/**
 * MainPageHero — premium full-bleed hero for the SDAM collection landing page.
 *
 * Features:
 *   - A 5-image collage of authentic manuscript pages (one per topic family)
 *   - Animated entrance: images fade in with stagger
 *   - Multi-layer gradient overlay for text legibility
 *   - Aurora tint harmonized with Embered Aether palette
 *   - Premium headline with animated hero gradient text
 *   - Scroll cue at bottom
 *
 * Replaces the previous text-only header on the main page.
 */

const COLLAGE_IMAGES = [
  {
    src: '/images/sdam-real/mizan-diagram-1.jpg',
    alt: 'Al-Khāzini Mīzān al-ḥikma manuscript — hydrostatic balance diagram',
    caption: 'al-Khāzini · 1121 CE',
    span: 'col-span-2 row-span-2',
  },
  {
    src: '/images/sdam-optics/alhazen-latin-1.jpg',
    alt: 'Latin translation of Ibn al-Haytham Optics manuscript',
    caption: 'Ibn al-Haytham · 1011 CE',
    span: 'col-span-1 row-span-1',
  },
  {
    src: '/images/sdam-alg/algorismus-renaissance-1.jpg',
    alt: 'Latin Algoritmi manuscript — al-Khwārizmī name Latinized',
    caption: 'al-Khwārizmī · 820 CE',
    span: 'col-span-1 row-span-1',
  },
  {
    src: '/images/sdam-med/canon-latin-facsimile.jpg',
    alt: 'Latin translation of Ibn Sīnā Canon of Medicine',
    caption: 'Ibn Sīnā · 1025 CE',
    span: 'col-span-1 row-span-1',
  },
  {
    src: '/images/sdam-real/astrolabe-met-1.jpg',
    alt: 'Medieval Islamic astrolabe',
    caption: 'Islamic Golden Age',
    span: 'col-span-1 row-span-1',
  },
];

interface MainPageHeroProps {
  onScrollToCollection?: () => void;
}

export default function MainPageHero({ onScrollToCollection }: MainPageHeroProps) {
  const t = useTranslations('MainHero');
  return (
    <section className="relative min-h-[100svh] w-full overflow-hidden aurora-mesh">
      {/* === Layer 1: Full-bleed image collage background === */}
      <div className="absolute inset-0 z-0">
        {/* Desktop: 4-column collage grid; mobile: stacked single column */}
        <div className="grid grid-cols-2 md:grid-cols-4 grid-rows-4 md:grid-rows-2 h-full gap-1">
          {COLLAGE_IMAGES.map((img, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, scale: 1.1 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{
                duration: 1.4,
                delay: 0.2 + i * 0.18,
                ease: [0.16, 1, 0.3, 1],
              }}
              className={`relative overflow-hidden ${img.span}`}
            >
              <Image
                src={img.src}
                alt={img.alt}
                fill
                priority={i === 0}
                sizes="(max-width: 768px) 50vw, 25vw"
                className="object-cover object-center"
                quality={80}
              />
              {/* Per-image gradient for depth + caption */}
              <div
                className="absolute inset-0"
                style={{
                  background:
                    'linear-gradient(180deg, rgba(7,9,26,0.2) 0%, rgba(7,9,26,0.6) 100%)',
                }}
              />
              <div className="absolute bottom-2 left-3 z-10">
                <p className="text-[10px] font-mono uppercase tracking-widest text-cream/50">
                  {img.caption}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* === Layer 2: Multi-layer gradient overlay for text legibility === */}
      <div
        className="absolute inset-0 z-10 pointer-events-none"
        style={{
          background:
            'linear-gradient(180deg, rgba(7,9,26,0.45) 0%, rgba(7,9,26,0.65) 50%, rgba(7,9,26,0.92) 100%)',
        }}
      />

      {/* === Layer 3: Aurora tint — harmonizes collage with Embered Aether palette === */}
      <div
        className="absolute inset-0 z-10 mix-blend-soft-light opacity-70 pointer-events-none"
        style={{
          background:
            'radial-gradient(ellipse 60% 50% at 20% 30%, rgba(232, 149, 72, 0.35), transparent 70%), radial-gradient(ellipse 60% 50% at 80% 70%, rgba(122, 139, 212, 0.30), transparent 70%)',
        }}
      />

      {/* === Layer 4: Premium grain === */}
      <div
        className="absolute inset-0 z-10 opacity-[0.05] mix-blend-overlay pointer-events-none"
        style={{
          backgroundImage:
            "url(\"data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E\")",
        }}
      />

      {/* === Layer 5: Hero content === */}
      <div className="relative z-20 flex min-h-[100svh] flex-col items-center justify-center px-6 text-center">
        {/* Eyebrow */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.3 }}
          className="flex items-center gap-3 text-[10px] sm:text-xs font-mono tracking-[0.3em] uppercase text-ember/90 mb-8"
        >
          <span className="h-px w-8 bg-gradient-to-r from-transparent to-ember/70" />
          <span className="text-gradient-ember font-semibold">{t('eyebrow')}</span>
          <span className="h-px w-8 bg-gradient-to-l from-transparent to-ember/70" />
        </motion.div>

        {/* Main headline — premium animated gradient */}
        <motion.h1
          initial={{ opacity: 0, y: 30, filter: 'blur(12px)' }}
          animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
          transition={{ duration: 1.6, delay: 0.5, ease: [0.16, 1, 0.3, 1] }}
          className="font-display text-[11vw] sm:text-7xl md:text-8xl lg:text-9xl leading-[0.95] tracking-tight max-w-5xl"
        >
          <span className="block text-cream">{t('titleLine1')}</span>
          <span className="block text-gradient-hero text-glow-ember italic">{t('titleLine2')}</span>
          <span className="block text-cream">{t('titleLine3')}</span>
        </motion.h1>

        {/* Subhead */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.2, delay: 1.0 }}
          className="mt-8 max-w-2xl text-cream-dim text-base sm:text-lg leading-relaxed"
        >
          {t('subhead')}
        </motion.p>

        {/* CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.2, delay: 1.3 }}
          className="mt-10 flex flex-col sm:flex-row items-center gap-4"
        >
          <button
            onClick={onScrollToCollection}
            className="btn-ember rounded-full px-7 py-3 text-sm font-mono uppercase tracking-wider flex items-center gap-2"
          >
            <ScrollText className="w-4 h-4" />
            {t('cta')}
            <ArrowRight className="w-4 h-4" />
          </button>
          <p className="text-[10px] font-mono uppercase tracking-widest text-cream-dim/60">
            {t('ctaHint')}
          </p>
        </motion.div>

        {/* Scroll cue */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 1.8 }}
          className="absolute bottom-8 flex flex-col items-center gap-2"
        >
          <span className="text-[10px] font-mono tracking-[0.4em] uppercase text-ember/70">
            {t('scrollToExplore')}
          </span>
          <motion.div
            animate={{ y: [0, 8, 0] }}
            transition={{ repeat: Infinity, duration: 1.6, ease: 'easeInOut' }}
            className="w-5 h-8 rounded-full border border-ember/40 flex items-start justify-center p-1.5"
          >
            <span className="w-1 h-1.5 rounded-full bg-ember animate-pulse-gold" />
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
