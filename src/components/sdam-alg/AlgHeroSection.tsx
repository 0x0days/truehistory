'use client';
import { useEffect, useRef, useState } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import TopicHeroImage from '@/components/psych/TopicHeroImage';
import { useTranslations } from 'next-intl';

export default function AlgHeroSection() {
  const t = useTranslations('Hero.alg');

  const ref = useRef<HTMLDivElement>(null);
  const [phase, setPhase] = useState(0);
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start start', 'end start'] });
  const heroOpacity = useTransform(scrollYProgress, [0, 0.4, 0.55], [1, 1, 0]);
  const heroScale = useTransform(scrollYProgress, [0, 0.55], [1, 0.96]);
  const questionOpacity = useTransform(scrollYProgress, [0.45, 0.65], [0, 1]);
  const questionScale = useTransform(scrollYProgress, [0.45, 0.65], [0.94, 1]);
  const hintOpacity = useTransform(scrollYProgress, [0, 0.1, 0.35], [0, 1, 0]);

  useEffect(() => {
    const timers = [
      setTimeout(() => setPhase(1), 2000),
      setTimeout(() => setPhase(2), 4000),
      setTimeout(() => setPhase(3), 6000),
      setTimeout(() => setPhase(4), 8000),
    ];
    return () => timers.forEach(clearTimeout);
  }, []);

  return (
    <section id="hero" ref={ref} className="relative min-h-[180vh]">
      <div className="sticky top-0 h-screen w-full overflow-hidden">
        <TopicHeroImage
          src="/images/sdam-alg/algorismus-renaissance-1.jpg"
          alt="Authentic medieval Latin manuscript page of Algoritmi de numero Indorum — al-Khwārizmī's name Latinized into a word"
          caption='Source: Latin translation of al-Khwārizmī'
          treatment="manuscript"
        />

        <motion.div style={{ opacity: heroOpacity, scale: heroScale }} className="absolute inset-0 flex flex-col items-center justify-center px-6">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 1, delay: 0.3 }} className="absolute top-[10vh] flex items-center gap-3 text-[10px] sm:text-xs font-mono tracking-[0.3em] uppercase text-gold/70">
            <span className="h-px w-8 bg-gold/40" />{t('eyebrow')}<span className="h-px w-8 bg-gold/40" />
          </motion.div>

          {/* The Etymological Animation */}
          <div className="w-full max-w-3xl mt-[-2vh] text-center">
            <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 1, delay: 0.5 }} className="text-cream-dim text-xs sm:text-sm font-mono uppercase tracking-widest mb-6">
              The word you use every day
            </motion.p>

            {/* Phase 0: Arabic name */}
            <motion.div initial={{ opacity: 0, scale: 0.8 }} animate={{ opacity: phase >= 0 ? 1 : 0, scale: phase >= 0 ? 1 : 0.8 }} transition={{ duration: 1 }} className="mb-4">
              <p className="font-arabic text-6xl sm:text-8xl text-gold mb-2" dir="rtl">الخوارزمي</p>
              <p className="font-display text-2xl sm:text-4xl text-cream italic">Muḥammad ibn Mūsā al-Khwārizmī</p>
              <p className="text-cream-dim text-xs mt-2 font-mono uppercase tracking-widest">c. 780 – 850 CE · Baghdad</p>
            </motion.div>

            {/* Phase 1: Latinization */}
            {phase >= 1 && (
              <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 1 }} className="mb-4">
                <p className="text-gold/60 text-3xl sm:text-5xl font-display italic">↓ Latinized as</p>
                <p className="font-display text-3xl sm:text-5xl text-gradient-gold italic">Algoritmi</p>
              </motion.div>
            )}

            {/* Phase 2: Middle Ages */}
            {phase >= 2 && (
              <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 1 }} className="mb-4">
                <p className="text-gold/60 text-3xl sm:text-5xl font-display italic">↓ Became</p>
                <p className="font-display text-3xl sm:text-5xl text-gradient-gold italic">Algorismus</p>
              </motion.div>
            )}

            {/* Phase 3: Modern */}
            {phase >= 3 && (
              <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 1 }} className="mb-4">
                <p className="text-gold/60 text-3xl sm:text-5xl font-display italic">↓ And finally</p>
                <p className="font-display text-5xl sm:text-7xl text-gradient-gold text-glow-gold italic">Algorithm</p>
              </motion.div>
            )}

            {/* Phase 4: The reveal */}
            {phase >= 4 && (
              <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 1.2 }} className="mt-8 max-w-2xl mx-auto">
                <p className="text-cream/85 text-sm sm:text-base leading-relaxed">
                  The word <span className="text-gradient-gold font-semibold">algorithm</span> IS his name.
                  The word <span className="text-gradient-gold font-semibold">algebra</span> IS his book title (<em>al-Jabr</em>).
                </p>
                <p className="text-cream-dim text-xs sm:text-sm mt-3">
                  <span className="text-gradient-gold font-semibold">382 years</span> before Fibonacci. <span className="text-gradient-gold font-semibold">771 years</span> before Turing. Every algorithm ever written carries his name.
                </p>
              </motion.div>
            )}
          </div>

          <motion.div style={{ opacity: hintOpacity }} className="absolute bottom-10 flex flex-col items-center gap-2 text-cream-dim/70">
            <span className="text-[10px] font-mono tracking-[0.4em] uppercase">{t('scrollHint')}</span>
            <motion.div animate={{ y: [0, 8, 0] }} transition={{ repeat: Infinity, duration: 1.6 }} className="w-5 h-8 rounded-full border border-gold/40 flex items-start justify-center p-1.5"><span className="w-1 h-1.5 rounded-full bg-gold animate-pulse-gold" /></motion.div>
          </motion.div>
        </motion.div>

        <motion.div style={{ opacity: questionOpacity, scale: questionScale }} className="absolute inset-0 flex flex-col items-center justify-center px-6 text-center pointer-events-none">
          <h1 className="font-display text-[10vw] sm:text-6xl md:text-7xl lg:text-8xl leading-[0.95] tracking-tight">
            <span className="block text-cream">{t('q1')}</span>
            <span className="block text-gradient-gold text-glow-gold italic">a European invention.</span>
            <span className="block mt-4 text-cream-dim text-2xl sm:text-4xl md:text-5xl font-display italic">{t('orDid')}</span>
          </h1>
        </motion.div>
      </div>
    </section>
  );
}
