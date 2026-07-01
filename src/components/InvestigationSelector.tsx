'use client';

import { motion } from 'framer-motion';
import { useRef } from 'react';
import Image from 'next/image';
import { useTranslations } from 'next-intl';
import { ArrowRight, ScrollText, Eye, Sigma, FunctionSquare, Orbit, BookOpen, Compass, GraduationCap, Stethoscope, Binary } from 'lucide-react';
import MainPageHero from '@/components/MainPageHero';

export interface Investigation {
  id: string;
  // Visual-only fields (not translated)
  icon: typeof Eye;
  accentFrom: string;
  accentTo: string;
  // Authentic period portrait/manuscript image of the topic's main discoverer
  portrait: string;
  portraitAlt: string;
  // Translatable fields are pulled from messages/<locale>.json at render time
  // using useTranslations('Investigation') with this id as the namespace key.
}

export const INVESTIGATIONS: Investigation[] = [
  {
    id: 'gravity',
    icon: ScrollText,
    accentFrom: '#d4af37',
    accentTo: '#8a7028',
    portrait: '/images/sdam-real/biruni-scholar.jpg',
    portraitAlt: 'Authentic period illustration of al-Bīrūnī, the Khwarazmian polymath who measured the Earth\'s radius by trigonometry in 1020 CE',
  },
  {
    id: 'optics',
    icon: Eye,
    accentFrom: '#f4d062',
    accentTo: '#d4af37',
    portrait: '/images/sdam-optics/alhazen-latin-1.jpg',
    portraitAlt: 'Authentic Latin manuscript portrait of Ibn al-Haytham (Alhazen) from the medieval Latin translation of his Optics',
  },
  {
    id: 'method',
    icon: BookOpen,
    accentFrom: '#f4d062',
    accentTo: '#d4af37',
    portrait: '/images/sdam-method/doubts-muslim-heritage.jpg',
    portraitAlt: 'Authentic Arabic manuscript page from Ibn al-Haytham\'s Doubts Concerning Ptolemy — the foundational text of the experimental method',
  },
  {
    id: 'calculus',
    icon: FunctionSquare,
    accentFrom: '#d4af37',
    accentTo: '#8a7028',
    portrait: '/images/sdam-calculus/haytham-math-muslim-heritage.jpg',
    portraitAlt: 'Authentic Arabic manuscript page from Ibn al-Haytham\'s infinitesimal mathematics — the foundational integration theorem',
  },
  {
    id: 'astro',
    icon: Orbit,
    accentFrom: '#f4d062',
    accentTo: '#d4af37',
    portrait: '/images/sdam-astro/battani-academia.jpg',
    portraitAlt: 'Authentic manuscript page from al-Battānī\'s astronomical tables — the foundation of Copernicus\'s data',
  },
  {
    id: 'nav',
    icon: Compass,
    accentFrom: '#f4d062',
    accentTo: '#d4af37',
    portrait: '/images/sdam-nav/ibnmajid-inlibris-1.jpg',
    portraitAlt: 'Authentic manuscript portrait of Ahmad Ibn Mājid, the legendary Arab navigator whose manuals guided Vasco da Gama',
  },
  {
    id: 'uni',
    icon: GraduationCap,
    accentFrom: '#f4d062',
    accentTo: '#d4af37',
    portrait: '/images/sdam-uni/fatima-cnn.jpg',
    portraitAlt: 'Authentic period illustration of Fatima al-Fihri, founder of the University of al-Qarawiyyin in 859 CE — the world\'s oldest university',
  },
  {
    id: 'med',
    icon: Stethoscope,
    accentFrom: '#f4d062',
    accentTo: '#d4af37',
    portrait: '/images/sdam-med/alrazi-muslim-heritage-1.jpg',
    portraitAlt: 'Authentic period illustration of al-Rāzī (Rhazes), the Persian physician who conducted the first clinical trial in 900 CE',
  },
  {
    id: 'alg',
    icon: Binary,
    accentFrom: '#f4d062',
    accentTo: '#d4af37',
    portrait: '/images/sdam-alg/khwarizmi-muslim-heritage-1.jpg',
    portraitAlt: 'Authentic period illustration of al-Khwārizmī — whose name Latinized to Algoritmi became the word algorithm',
  },
];

export default function InvestigationSelector({
  onSelect,
}: {
  onSelect: (id: string) => void;
}) {
  const t = useTranslations('Collection');
  const tInv = useTranslations('Investigation');
  const collectionRef = useRef<HTMLDivElement>(null);

  const scrollToCollection = () => {
    collectionRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' });
  };

  return (
    <main className="relative min-h-screen flex flex-col bg-cosmos">
      {/* === Premium main-page hero with full-bleed image collage === */}
      <MainPageHero onScrollToCollection={scrollToCollection} />

      {/* Background starfield is rendered by the parent page; this is the content layer */}
      <div className="relative z-10 flex-1 flex flex-col">
        {/* Header */}
        <motion.header
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
          className="px-6 pt-20 pb-8 text-center"
        >
          <div className="flex items-center justify-center gap-3 text-[10px] sm:text-xs font-mono tracking-[0.3em] uppercase text-gold/70 mb-6">
            <span className="h-px w-8 bg-gold/40" />
            {t('eyebrow')}
            <span className="h-px w-8 bg-gold/40" />
          </div>
          <h1 className="font-display text-5xl sm:text-7xl md:text-8xl text-cream leading-tight">
            {t('titleLine1')}
            <br />
            <span className="text-gradient-gold text-glow-gold italic">
              {t('titleLine2')}
            </span>
          </h1>
          <p className="mt-6 text-cream-dim max-w-2xl mx-auto text-sm sm:text-base leading-relaxed">
            {t('subhead')}
          </p>
        </motion.header>

        {/* Investigation cards */}
        <div ref={collectionRef} className="flex-1 px-6 pb-20 pt-8 scroll-mt-4">
          <div className="max-w-6xl mx-auto grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {INVESTIGATIONS.map((inv, i) => {
              const Icon = inv.icon;
              return (
                <motion.button
                  key={inv.id}
                  initial={{ opacity: 0, y: 40 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: i * 0.1 }}
                  onClick={() => onSelect(inv.id)}
                  className="group relative text-left glass-card rounded-2xl overflow-hidden hover:border-gold/60 transition-all duration-500 hover:-translate-y-1"
                >
                  {/* Portrait image — authentic period illustration of the discoverer */}
                  <div className="relative h-52 sm:h-48 overflow-hidden">
                    <Image
                      src={inv.portrait}
                      alt={inv.portraitAlt}
                      fill
                      sizes="(max-width: 640px) 100vw, 33vw"
                      className="object-cover object-center transition-transform duration-700 group-hover:scale-105"
                    />
                    {/* Multi-layer gradient overlay for depth + legibility */}
                    <div
                      className="absolute inset-0"
                      style={{
                        background:
                          'linear-gradient(180deg, rgba(7,9,26,0.15) 0%, rgba(7,9,26,0.55) 70%, rgba(7,9,26,0.95) 100%)',
                      }}
                    />
                    {/* Volume badge — top-left, on top of portrait */}
                    <div className="absolute top-3 left-3 z-10">
                      <span
                        className="inline-block px-2.5 py-1 rounded-full backdrop-blur-md font-mono text-[10px] uppercase tracking-widest border"
                        style={{
                          backgroundColor: 'rgba(7,9,26,0.7)',
                          borderColor: `${inv.accentFrom}40`,
                          color: inv.accentFrom,
                        }}
                      >
                        {tInv(`${inv.id}.volume`)}
                      </span>
                    </div>
                    {/* Icon circle — top-right, on top of portrait */}
                    <div
                      className="absolute top-3 right-3 z-10 w-10 h-10 rounded-full flex items-center justify-center border backdrop-blur-md transition-all group-hover:scale-110 group-hover:rotate-3"
                      style={{
                        backgroundColor: `rgba(7,9,26,0.7)`,
                        borderColor: `${inv.accentFrom}60`,
                      }}
                    >
                      <Icon
                        className="w-5 h-5"
                        style={{ color: inv.accentFrom }}
                      />
                    </div>
                    {/* Portrait caption — bottom-left, identifies the figure */}
                    <div className="absolute bottom-3 left-3 z-10 max-w-[80%]">
                      <p
                        className="font-mono text-[10px] uppercase tracking-widest leading-tight"
                        style={{ color: inv.accentFrom }}
                      >
                        {tInv(`${inv.id}.portraitCaption`)}
                      </p>
                    </div>
                  </div>

                  {/* Accent gradient bar */}
                  <div
                    className="h-1 w-full"
                    style={{
                      background: `linear-gradient(90deg, ${inv.accentFrom}, ${inv.accentTo})`,
                    }}
                  />

                  <div className="p-6">
                    {/* Volume + icon */}
                    <div className="flex items-start justify-between mb-4">
                      <span className="font-mono text-[10px] uppercase tracking-widest text-gold/70">
                        {tInv(`${inv.id}.volume`)}
                      </span>
                      <div
                        className="w-10 h-10 rounded-full flex items-center justify-center border transition-all group-hover:scale-110"
                        style={{
                          backgroundColor: `${inv.accentFrom}15`,
                          borderColor: `${inv.accentFrom}40`,
                        }}
                  >
                        <Icon
                          className="w-5 h-5"
                          style={{ color: inv.accentFrom }}
                        />
                      </div>
                    </div>

                    {/* Title */}
                    <h2 className="font-display text-2xl sm:text-3xl text-cream leading-tight mb-2">
                      {tInv(`${inv.id}.title`)}
                    </h2>
                    <p className="text-cream-dim text-xs sm:text-sm leading-relaxed mb-4">
                      {tInv(`${inv.id}.subtitle`)}
                    </p>

                    {/* The question */}
                    <div className="border-l-2 border-gold/30 pl-3 mb-4">
                      <p className="font-display text-sm text-cream italic leading-snug">
                        {tInv(`${inv.id}.question`)}
                      </p>
                    </div>

                    {/* Stats grid */}
                    <div className="grid grid-cols-2 gap-2 mb-4">
                      <div className="rounded-lg bg-cosmos-deep/40 p-2.5">
                        <p className="text-[9px] font-mono uppercase tracking-widest text-cream-dim/70 mb-0.5">
                          Discoverers
                        </p>
                        <p className="text-cream text-xs font-medium leading-tight">
                          {tInv(`${inv.id}.discoverers`)}
                        </p>
                      </div>
                      <div className="rounded-lg bg-cosmos-deep/40 p-2.5">
                        <p className="text-[9px] font-mono uppercase tracking-widest text-cream-dim/70 mb-0.5">
                          Year
                        </p>
                        <p className="text-cream text-xs font-medium leading-tight">
                          {tInv(`${inv.id}.year`)}
                        </p>
                      </div>
                      <div className="rounded-lg bg-cosmos-deep/40 p-2.5">
                        <p className="text-[9px] font-mono uppercase tracking-widest text-cream-dim/70 mb-0.5">
                          Priority margin
                        </p>
                        <p
                          className="text-xs font-display font-bold leading-tight"
                          style={{ color: inv.accentFrom }}
                        >
                          {tInv(`${inv.id}.priorityMargin`)}
                        </p>
                      </div>
                      <div className="rounded-lg bg-cosmos-deep/40 p-2.5">
                        <p className="text-[9px] font-mono uppercase tracking-widest text-cream-dim/70 mb-0.5">
                          CES Score
                        </p>
                        <p
                          className="text-xs font-display font-bold leading-tight"
                          style={{ color: inv.accentFrom }}
                        >
                          {tInv(`${inv.id}.ces`)} · {tInv(`${inv.id}.verdict`)}
                        </p>
                      </div>
                    </div>

                    {/* CTA */}
                    <div className="flex items-center justify-between pt-3 border-t border-gold/10">
                      <span className="text-[10px] font-mono uppercase tracking-widest text-cream-dim/60">
                        {tInv(`${inv.id}.competitor`)}
                      </span>
                      <span className="flex items-center gap-1 text-gold text-xs font-mono uppercase tracking-wider group-hover:gap-2 transition-all">
                        Investigate
                        <ArrowRight className="w-3.5 h-3.5" />
                      </span>
                    </div>
                  </div>
                </motion.button>
              );
            })}
          </div>
        </div>

        {/* Footer */}
        <motion.footer
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.8, duration: 1 }}
          className="px-6 pb-10 text-center"
        >
          <p className="text-cream-dim/60 text-xs italic max-w-2xl mx-auto leading-relaxed">
            {t('footerNote')}
          </p>
          <p className="mt-4 font-mono text-[10px] uppercase tracking-widest text-gold/50">
            {t('footerSignature')}
          </p>
        </motion.footer>
      </div>
    </main>
  );
}
