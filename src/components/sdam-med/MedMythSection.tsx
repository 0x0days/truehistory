'use client';
import { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { useTranslations } from 'next-intl';
const MYTH_FIGURES = [
  { year: '~400 BCE', name: 'Hippocrates', claim: 'The "father of medicine." Hippocratic Oath. Observation over superstition.', note: 'Greek precursor. Refined but not systematized by Europeans.' },
  { year: '~180 CE', name: 'Galen', claim: 'Anatomy, physiology, four humors. The dominant European medical authority for 1,300 years.', note: 'Galen\'s errors (bloodletting, humors) persisted until Ibn Sīnā corrected them.' },
  { year: '1543 CE', name: 'Vesalius', claim: 'De Humani Corporis Fabrica. "Founded" modern anatomy. Credited with overturning Galen.', note: 'Used Ibn Sīnā\'s anatomical framework. The Canon was still the standard text.' },
  { year: '1628 CE', name: 'William Harvey', claim: 'Discovered blood circulation. Credited as the founder of modern physiology.', note: 'Ibn al-Nafīs described pulmonary circulation 350 years earlier (1242 CE).' },
];
export default function MedMythSection() {
  const tCommon = useTranslations('Myth.common');
  const t = useTranslations('Myth.med');

  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start end', 'end start'] });
  const lineScale = useTransform(scrollYProgress, [0.1, 0.7], [0, 1]);
  const problemY = useTransform(scrollYProgress, [0.7, 0.95], [60, 0]);
  const problemOpacity = useTransform(scrollYProgress, [0.7, 0.95], [0, 1]);
  return (
    <section id="myth" ref={ref} className="relative min-h-screen flex flex-col items-center justify-center px-6 py-24">
      <div className="max-w-5xl w-full">
        <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, margin: "0px 0px 50% 0px" }} transition={{ duration: 0.8 }} className="text-center mb-16">
          <p className="text-[10px] font-mono tracking-[0.4em] uppercase text-gold/70 mb-4">{tCommon('chapterTitle')}</p>
          <h2 className="font-display text-4xl sm:text-6xl md:text-7xl text-cream leading-tight">{tCommon('officialNarrative')}<br /><span className="text-gradient-gold italic">{t('subtitle')}</span></h2>
          <p className="mt-6 text-cream-dim max-w-2xl mx-auto text-base sm:text-lg">{t('intro')}</p>
        </motion.div>
        <div className="relative">
          <div className="absolute left-6 sm:left-1/2 top-0 bottom-0 w-px -translate-x-1/2 bg-cream-dim/15" />
          <motion.div style={{ scaleY: lineScale, transformOrigin: 'top' }} className="absolute left-6 sm:left-1/2 top-0 bottom-0 w-px -translate-x-1/2 gradient-gold" />
          <div className="space-y-20">
            {MYTH_FIGURES.map((fig, i) => (
              <motion.div key={fig.name} initial={{ opacity: 0, y: 50, x: i % 2 === 0 ? -30 : 30 }} whileInView={{ opacity: 1, y: 0, x: 0 }} viewport={{ once: true, margin: "0px 0px 50% 0px" }} transition={{ duration: 0.8, delay: 0.1 }} className={`relative pl-16 sm:pl-0 flex ${i % 2 === 0 ? 'sm:justify-start' : 'sm:justify-end'}`}>
                <div className="absolute left-6 sm:left-1/2 top-6 -translate-x-1/2 z-10"><div className="w-4 h-4 rounded-full bg-cosmos border-2 border-gold glow-gold" /></div>
                <div className={`glass-card rounded-2xl p-6 sm:p-8 max-w-md w-full ${i % 2 === 0 ? 'sm:mr-12' : 'sm:ml-12'}`}>
                  <div className="flex items-baseline gap-3 mb-3"><span className="text-gold font-mono text-sm tracking-wider">{fig.year}</span><span className="h-px flex-1 bg-gold/20" /></div>
                  <h3 className="font-display text-2xl sm:text-3xl text-cream mb-3">{fig.name}</h3>
                  <p className="text-cream/85 text-sm sm:text-base leading-relaxed mb-3">{fig.claim}</p>
                  <p className="text-cream-dim italic text-xs sm:text-sm border-l-2 border-gold/30 pl-3">{fig.note}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
        <motion.div style={{ y: problemY, opacity: problemOpacity }} className="mt-24 text-center">
          <p className="text-[10px] font-mono tracking-[0.4em] uppercase text-burgundy mb-4">{tCommon('butThereIsAProblem')}</p>
          <h3 className="font-display text-3xl sm:text-5xl md:text-6xl text-cream leading-tight max-w-3xl mx-auto">{t('problem1')} <span className="text-gradient-gold italic">{t('problemHighlight')}</span> {t('problem2')}</h3>
          <motion.div initial={{ width: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true, margin: "0px 0px 50% 0px" }} transition={{ duration: 0.9, delay: 0.3 }} className="h-px gradient-gold mx-auto mt-8" />
        </motion.div>
      </div>
    </section>
  );
}
