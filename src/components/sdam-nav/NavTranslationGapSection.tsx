'use client';

import { motion } from 'framer-motion';
import { BookOpen, Languages, Unlink, Compass } from 'lucide-react';
import { useTranslations } from 'next-intl';

const LOST_NAMES = [
  { original: 'Mariam al-Asturlābiyya', appeared: '(unnamed)', note: '→ astrolabe manufacture erased' },
  { original: 'Aḥmad ibn Mājid', appeared: '(unnamed "Moor")', note: '→ guided Vasco da Gama' },
  { original: 'Sulaymān al-Mahrī', appeared: '(rarely cited)', note: '→ Indian Ocean navigation erased' },
  { original: 'al-Fazārī', appeared: '(rarely cited)', note: '→ first Islamic astrolabe' },
  { original: 'Ibn al-Saffār', appeared: '(rarely cited)', note: '→ astrolabe treatise transmitted' },
  { original: 'Kamāl', appeared: '"cross-staff" / "mariner\'s astrolabe"', note: '→ instrument renamed' },
];

export default function NavTranslationGapSection() {
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
          viewport={{ once: true, margin: "0px 0px 15% 0px" }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <p className="text-[10px] font-mono tracking-[0.4em] uppercase text-gold/70 mb-4">
            {tSections('TranslationGap.chapterTitle')}
          </p>
          <h2 className="font-display text-4xl sm:text-6xl md:text-7xl text-cream leading-tight">
            The instruments crossed into Latin.
            <br />
            <span className="text-gradient-gold italic">The inventors did not.</span>
          </h2>
          <p className="mt-6 text-cream-dim max-w-2xl mx-auto text-base sm:text-lg leading-relaxed">
            The astrolabe, the kamal, the spherical trigonometry of celestial
            navigation — all crossed into Europe via the Toledo translation
            movement (12th c.) and the fall of Constantinople (1453). The
            instruments survived under European names. The Arabic inventors
            — including Mariam al-Asturlābiyya — were erased entirely.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-16 max-w-4xl mx-auto">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "0px 0px 15% 0px" }}
            transition={{ duration: 0.7 }}
            className="glass-card-gold rounded-2xl p-6 text-center"
          >
            <Compass className="w-8 h-8 mx-auto mb-3 text-gold" />
            <p className="font-arabic text-2xl text-gold mb-1" dir="rtl">
              الأسطرلاب
            </p>
            <p className="text-cream text-sm">Arabic navigation instruments</p>
            <p className="text-cream-dim text-xs mt-1">
              Astrolabe, kamal, spherical trigonometry. 944–1500 CE.
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: -20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "0px 0px 15% 0px" }}
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
              Instruments and tables transmitted; inventors renamed
            </p>
            <div className="absolute -top-3 -right-3 w-7 h-7 rounded-full bg-burgundy/80 border border-burgundy flex items-center justify-center">
              <Unlink className="w-4 h-4 text-cream" />
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "0px 0px 15% 0px" }}
            transition={{ duration: 0.7, delay: 0.4 }}
            className="glass-card rounded-2xl p-6 text-center"
          >
            <BookOpen className="w-8 h-8 mx-auto mb-3 text-cream-dim" />
            <p className="font-display text-2xl text-cream mb-1 italic">
              European "Age of Discovery"
            </p>
            <p className="text-cream-dim text-sm">
              Portuguese + Spanish (15th c.)
            </p>
            <p className="text-cream-dim/70 text-xs mt-1">
              Used Arabic instruments; credited themselves with invention
            </p>
          </motion.div>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "0px 0px 15% 0px" }}
          transition={{ duration: 0.8 }}
          className="max-w-3xl mx-auto"
        >
          <p className="text-center text-cream-dim text-sm uppercase tracking-widest mb-6 font-mono">
            Names erased, instruments inherited
          </p>
          <div className="space-y-2">
            {LOST_NAMES.map((n, i) => (
              <motion.div
                key={n.original}
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, margin: "0px 0px 15% 0px" }}
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
            Vasco da Gama&apos;s Portuguese crew called his Muslim guide
            &ldquo;the Moor.&rdquo; The navigator&apos;s name was Aḥmad ibn
            Mājid. His navigation manual, the <em>Kitāb al-Fawāʾid</em>, survives
            — but no European textbook mentions him.
          </p>
        </motion.div>
      </div>
    </section>
  );
}
