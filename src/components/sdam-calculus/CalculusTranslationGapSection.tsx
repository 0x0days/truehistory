'use client';

import { motion } from 'framer-motion';
import { BookOpen, Languages, Unlink } from 'lucide-react';
import { useTranslations } from 'next-intl';

const LOST_NAMES = [
  { original: 'Ibn al-Haytham', appeared: 'Alhazen', note: '→ sum of fourth powers erased' },
  { original: 'Sharaf al-Dīn al-Ṭūsī', appeared: '(rarely cited)', note: '→ derivative analysis erased' },
  { original: 'Madhava of Saṅgamagrāma', appeared: '(unknown to Europe)', note: '→ infinite series lost' },
  { original: 'al-Jayyānī', appeared: '(rarely cited)', note: '→ spherical trigonometry' },
  { original: 'Ibn al-Haytham\'s Maqāla', appeared: 'De Quadratura (Latin)', note: '→ integration transmitted' },
];

export default function CalculusTranslationGapSection() {
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
            Three traditions,
            <br />
            <span className="text-gradient-gold italic">three erasures.</span>
          </h2>
          <p className="mt-6 text-cream-dim max-w-2xl mx-auto text-base sm:text-lg leading-relaxed">
            Calculus was not invented in a single act by Newton or Leibniz. It
            emerged from three independent traditions — the Arabic, the Indian,
            and the Greek — each of which solved part of the problem centuries
            earlier. The Arabic tradition was transmitted to Europe via Latin
            translation. The Indian was not. The Greek was lost for a thousand
            years.
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
            <BookOpen className="w-8 h-8 mx-auto mb-3 text-gold" />
            <p className="font-arabic text-2xl text-gold mb-1" dir="rtl">
              التكامل
            </p>
            <p className="text-cream text-sm">Arabic tradition</p>
            <p className="text-cream-dim text-xs mt-1">
              Ibn al-Haytham (c. 1000) + Sharaf al-Ṭūsī (1170) — sum of powers,
              derivative analysis. Transmitted to Europe via Latin translation.
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
              Kerala
            </p>
            <p className="text-cream-dim text-sm">
              Indian tradition (c. 1350)
            </p>
            <p className="text-cream-dim/70 text-xs mt-1">
              Madhava derived infinite series for sine, cosine, and π — 280
              years before Newton&apos;s binomial series. Not transmitted to
              Europe.
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
              Greek
            </p>
            <p className="text-cream-dim text-sm">
              Archimedes (c. 250 BCE)
            </p>
            <p className="text-cream-dim/70 text-xs mt-1">
              Method of exhaustion. Lost for ~1000 years. The Archimedes
              Palimpsest was rediscovered only in 1906.
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
            Names erased, methods inherited
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
            Newton&apos;s teacher Isaac Barrow knew the Arabic mathematical
            tradition. Newton himself owned and annotated copies of works
            derived from Ibn al-Haytham&apos;s optics and mathematics.
          </p>
        </motion.div>
      </div>
    </section>
  );
}
