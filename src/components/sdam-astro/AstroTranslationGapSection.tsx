'use client';

import { motion } from 'framer-motion';
import { BookOpen, Languages, Unlink, Telescope } from 'lucide-react';
import { useTranslations } from 'next-intl';

const LOST_NAMES = [
  { original: 'al-Battānī', appeared: 'Albatenius', note: '→ star tables erased' },
  { original: 'ʿAbd al-Raḥmān al-Sūfī', appeared: 'Azophi', note: '→ Andromeda erased' },
  { original: 'Naṣīr al-Dīn al-Ṭūsī', appeared: '(rarely cited)', note: '→ Tusi Couple stolen' },
  { original: 'Ibn al-Shāṭir', appeared: '(unnamed)', note: '→ lunar model copied' },
  { original: 'Ulugh Beg', appeared: '(rarely cited)', note: '→ star catalog used' },
  { original: 'Kitāb al-Kawākib', appeared: 'Liber de Stellarum', note: '→ constellations transmitted' },
];

export default function AstroTranslationGapSection() {
  const tSections = useTranslations('Sections');
  return (
    <section
      id="gap"
      className="relative min-h-screen flex flex-col items-center justify-center px-6 py-24 manuscript-bg"
    >
      <div
        className="absolute inset-0 opacity-[0.04] pointer-events-none"
        style={{
          backgroundImage:
            'radial-gradient(circle at 1px 1px, #d4af37 1px, transparent 0)',
          backgroundSize: '32px 32px',
        }}
      />

      <div className="max-w-6xl w-full relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "0px 0px 50% 0px" }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <p className="text-[10px] font-mono tracking-[0.4em] uppercase text-gold/70 mb-4">
            {tSections('TranslationGap.chapterTitle')}
          </p>
          <h2 className="font-display text-4xl sm:text-6xl md:text-7xl text-cream leading-tight">
            The stars crossed into Latin.
            <br />
            <span className="text-gradient-gold italic">The astronomers did not.</span>
          </h2>
          <p className="mt-6 text-cream-dim max-w-2xl mx-auto text-base sm:text-lg leading-relaxed">
            The Maragheh and Damascus astronomical models reached Europe via
            Greek scholars fleeing Constantinople in 1453, and via the
            centuries-long Toledo translation movement. The mathematics survived.
            The names did not. When Copernicus published his planetary models
            in 1543, they were mathematically identical to Ibn al-Shāṭir&apos;s
            Damascus models of 1350 — and Copernicus did not cite him.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-16 max-w-4xl mx-auto">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "0px 0px 50% 0px" }}
            transition={{ duration: 0.7 }}
            className="glass-card-gold rounded-2xl p-6 text-center"
          >
            <Telescope className="w-8 h-8 mx-auto mb-3 text-gold" />
            <p className="font-arabic text-2xl text-gold mb-1" dir="rtl">
              المرصد
            </p>
            <p className="text-cream text-sm">Arabic observatories</p>
            <p className="text-cream-dim text-xs mt-1">
              Maragheh (1259), Samarkand (1424), Damascus (1330). Precision astronomy for 200+ years.
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: -20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "0px 0px 50% 0px" }}
            transition={{ duration: 0.7, delay: 0.2 }}
            className="glass-card rounded-2xl p-6 text-center relative"
          >
            <Languages className="w-8 h-8 mx-auto mb-3 text-cream-dim" />
            <p className="font-display text-2xl text-cream mb-1 italic">
              Translatio
            </p>
            <p className="text-cream-dim text-sm">
              Toledo (12th c.) + Constantinople 1453
            </p>
            <p className="text-cream-dim/70 text-xs mt-1">
              Greek scholars fled with Arabic manuscripts; Copernicus read them in Italy
            </p>
            <div className="absolute -top-3 -right-3 w-7 h-7 rounded-full bg-burgundy/80 border border-burgundy flex items-center justify-center">
              <Unlink className="w-4 h-4 text-cream" />
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "0px 0px 50% 0px" }}
            transition={{ duration: 0.7, delay: 0.4 }}
            className="glass-card rounded-2xl p-6 text-center"
          >
            <BookOpen className="w-8 h-8 mx-auto mb-3 text-cream-dim" />
            <p className="font-display text-2xl text-cream mb-1 italic">
              De Revolutionibus
            </p>
            <p className="text-cream-dim text-sm">
              Copernicus (1543)
            </p>
            <p className="text-cream-dim/70 text-xs mt-1">
              Credited with heliocentrism. The math was 300 years older.
            </p>
          </motion.div>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "0px 0px 50% 0px" }}
          transition={{ duration: 0.8 }}
          className="max-w-3xl mx-auto"
        >
          <p className="text-center text-cream-dim text-sm uppercase tracking-widest mb-6 font-mono">
            Names erased, mathematics inherited
          </p>
          <div className="space-y-2">
            {LOST_NAMES.map((n, i) => (
              <motion.div
                key={n.original}
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, margin: "0px 0px 50% 0px" }}
                transition={{ duration: 0.5, delay: i * 0.08 }}
                className="grid grid-cols-12 items-center gap-2 glass-card rounded-xl px-4 py-3 hover:border-gold/40 transition-colors"
              >
                <span className="col-span-5 text-cream font-medium text-sm sm:text-base truncate">
                  {n.original}
                </span>
                <span className="col-span-1 text-gold/60 text-center">→</span>
                <span className="col-span-3 text-cream-dim italic text-xs sm:text-sm truncate">
                  {n.appeared}
                </span>
                <span className="col-span-3 text-gold/70 text-[10px] sm:text-xs text-right font-mono truncate">
                  {n.note}
                </span>
              </motion.div>
            ))}
          </div>
          <p className="text-center text-cream-dim/70 text-xs mt-6 italic">
            The mathematical identity between Ibn al-Shāṭir&apos;s Damascus
            models (c. 1350) and Copernicus&apos;s De Revolutionibus (1543) is
            documented in the scholarly literature (Saliba, Kennedy, Roberts).
            The similarity is too great to be coincidence.
          </p>
        </motion.div>
      </div>
    </section>
  );
}
