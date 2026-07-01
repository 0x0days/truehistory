'use client';
import { useEffect, useRef, useState } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import TopicHeroImage from '@/components/psych/TopicHeroImage';
import { useTranslations } from 'next-intl';

export default function UniHeroSection() {
  const t = useTranslations('Hero.uni');

  const ref = useRef<HTMLDivElement>(null);
  const [phase, setPhase] = useState<'islamic' | 'contrast' | 'question'>('islamic');
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start start', 'end start'] });
  const heroOpacity = useTransform(scrollYProgress, [0, 0.4, 0.55], [1, 1, 0]);
  const heroScale = useTransform(scrollYProgress, [0, 0.55], [1, 0.96]);
  const questionOpacity = useTransform(scrollYProgress, [0.45, 0.65], [0, 1]);
  const questionScale = useTransform(scrollYProgress, [0.45, 0.65], [0.94, 1]);
  const hintOpacity = useTransform(scrollYProgress, [0, 0.1, 0.35], [0, 1, 0]);

  useEffect(() => {
    const t1 = setTimeout(() => setPhase('contrast'), 4000);
    const t2 = setTimeout(() => setPhase('question'), 7000);
    return () => { clearTimeout(t1); clearTimeout(t2); };
  }, []);

  return (
    <section id="hero" ref={ref} className="relative min-h-[180vh]">
      <div className="sticky top-0 h-screen w-full overflow-hidden">
        <TopicHeroImage
          src="/images/sdam-uni/fatima-cnn.jpg"
          alt="Authentic illustration of Fatima al-Fihri and the University of al-Qarawiyyin in Fez, founded 859 CE — the world's oldest university"
          caption='Source: Fatima al-Fihri, University of al-Qarawiyyin'
          treatment="manuscript"
        />

        <motion.div style={{ opacity: heroOpacity, scale: heroScale }} className="absolute inset-0 flex flex-col items-center justify-center px-6">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 1, delay: 0.3 }} className="absolute top-[10vh] flex items-center gap-3 text-[10px] sm:text-xs font-mono tracking-[0.3em] uppercase text-gold/70">
            <span className="h-px w-8 bg-gold/40" />{t('eyebrow')}<span className="h-px w-8 bg-gold/40" />
          </motion.div>
          {/* Two-column contrast visual */}
          <div className="w-full max-w-4xl mt-[-2vh] grid grid-cols-2 gap-4 sm:gap-8">
            {/* Islamic world */}
            <motion.div initial={{ opacity: 0, x: -30 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 1, delay: 0.5 }} className="text-center">
              <div className="glass-card-gold rounded-2xl p-4 sm:p-6">
                <p className="font-arabic text-2xl sm:text-3xl text-gold mb-2" dir="rtl">الجامعة</p>
                <p className="font-display text-3xl sm:text-5xl text-gradient-gold italic">859 CE</p>
                <p className="text-cream text-xs sm:text-sm mt-2">Fatima al-Fehri founds<br />al-Qarawiyyin University</p>
                <p className="text-cream-dim text-[10px] mt-2">Fez, Morocco</p>
              </div>
            </motion.div>
            {/* Europe */}
            <motion.div initial={{ opacity: 0, x: 30 }} animate={{ opacity: phase === 'islamic' ? 0 : 1, x: phase === 'islamic' ? 30 : 0 }} transition={{ duration: 1, delay: 0.5 }} className="text-center">
              <div className="glass-card rounded-2xl p-4 sm:p-6 border-burgundy/30">
                <p className="font-display text-2xl sm:text-3xl text-burgundy mb-2">♰</p>
                <p className="font-display text-3xl sm:text-5xl text-burgundy italic">859 CE</p>
                <p className="text-cream-dim text-xs sm:text-sm mt-2">European women denied<br />souls by church councils</p>
                <p className="text-cream-dim/70 text-[10px] mt-2">Witch burnings begin</p>
              </div>
            </motion.div>
          </div>
          {/* Caption */}
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: phase === 'islamic' ? 0 : 1 }} transition={{ duration: 1 }} className="mt-6 text-center max-w-2xl">
            <p className="text-cream/85 text-sm sm:text-base leading-relaxed">
              In <span className="text-gradient-gold font-semibold">859 CE</span>, a woman founded the world&apos;s oldest university.
              In the same century, European women were being burned alive for practicing medicine.
            </p>
            {phase === 'question' && (
              <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.3 }} className="text-cream-dim text-xs sm:text-sm mt-3">
                <span className="text-gradient-gold font-semibold">229 years</span> before Bologna. <span className="text-gradient-gold font-semibold">237 years</span> before Oxford.
              </motion.p>
            )}
          </motion.div>
          <motion.div style={{ opacity: hintOpacity }} className="absolute bottom-10 flex flex-col items-center gap-2 text-cream-dim/70">
            <span className="text-[10px] font-mono tracking-[0.4em] uppercase">{t('scrollHint')}</span>
            <motion.div animate={{ y: [0, 8, 0] }} transition={{ repeat: Infinity, duration: 1.6 }} className="w-5 h-8 rounded-full border border-gold/40 flex items-start justify-center p-1.5">
              <span className="w-1 h-1.5 rounded-full bg-gold animate-pulse-gold" />
            </motion.div>
          </motion.div>
        </motion.div>
        <motion.div style={{ opacity: questionOpacity, scale: questionScale }} className="absolute inset-0 flex flex-col items-center justify-center px-6 text-center pointer-events-none">
          <h1 className="font-display text-[10vw] sm:text-6xl md:text-7xl lg:text-8xl leading-[0.95] tracking-tight">
            <span className="block text-cream">Europeans built</span>
            <span className="block text-gradient-gold text-glow-gold italic">{t('q2')}</span>
            <span className="block mt-4 text-cream-dim text-2xl sm:text-4xl md:text-5xl font-display italic">{t('orDid')}</span>
          </h1>
        </motion.div>
      </div>
    </section>
  );
}
