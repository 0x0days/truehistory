'use client';

import { useEffect, useRef, useState } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import TopicHeroImage from '@/components/psych/TopicHeroImage';
import { useTranslations } from 'next-intl';

const FULL_QUOTE =
  'The authority of those who profess to teach is a hindrance to those who desire to learn.';

export default function MethodHeroSection() {
  const t = useTranslations('Hero.method');

  const ref = useRef<HTMLDivElement>(null);
  const [typed, setTyped] = useState('');
  const [phase, setPhase] = useState<'typing' | 'attributing' | 'revealing' | 'questioning'>('typing');

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start start', 'end start'],
  });

  const heroOpacity = useTransform(scrollYProgress, [0, 0.4, 0.55], [1, 1, 0]);
  const heroScale = useTransform(scrollYProgress, [0, 0.55], [1, 0.96]);
  const questionOpacity = useTransform(scrollYProgress, [0.45, 0.65], [0, 1]);
  const questionScale = useTransform(scrollYProgress, [0.45, 0.65], [0.94, 1]);
  const hintOpacity = useTransform(scrollYProgress, [0, 0.1, 0.35], [0, 1, 0]);

  // Typewriter effect
  useEffect(() => {
    let i = 0;
    const interval = setInterval(() => {
      i += 1;
      setTyped(FULL_QUOTE.slice(0, i));
      if (i >= FULL_QUOTE.length) {
        clearInterval(interval);
        setTimeout(() => setPhase('attributing'), 500);
        setTimeout(() => setPhase('revealing'), 2200);
        setTimeout(() => setPhase('questioning'), 4200);
      }
    }, 45);
    return () => clearInterval(interval);
  }, []);

  return (
    <section
      id="hero"
      ref={ref}
      className="relative min-h-[180vh]"
    >
      {/* SINGLE sticky container with cross-fading layers */}
      <div className="sticky top-0 h-screen w-full overflow-hidden">
        <TopicHeroImage
          src="/images/sdam-method/doubts-muslim-heritage.jpg"
          alt="Authentic Arabic manuscript page from Ibn al-Haytham's Doubts Concerning Ptolemy, the foundational text of the experimental method"
          caption='Source: Ibn al-Haytham, Doubts Concerning Ptolemy'
          treatment="manuscript"
        />

        {/* Hero content layer */}
        <motion.div
          style={{ opacity: heroOpacity, scale: heroScale }}
          className="absolute inset-0 flex flex-col items-center justify-center px-6"
        >
          {/* Eyebrow */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.3 }}
            className="absolute top-[12vh] flex items-center gap-3 text-[10px] sm:text-xs font-mono tracking-[0.3em] uppercase text-gold/70"
          >
            <span className="h-px w-8 bg-gold/40" />
            {t('eyebrow')}
            <span className="h-px w-8 bg-gold/40" />
          </motion.div>

          {/* The Quote */}
          <div className="max-w-4xl mx-auto text-center">
            <motion.div
              initial={{ opacity: 0, scale: 0.5 }}
              animate={{ opacity: 0.3, scale: 1 }}
              transition={{ duration: 1.5 }}
              className="text-gold/30 text-8xl sm:text-9xl font-display absolute -top-8 left-1/2 -translate-x-1/2 select-none leading-none"
            >
              &ldquo;
            </motion.div>

            <p className="font-display text-2xl sm:text-4xl md:text-5xl text-cream leading-tight italic min-h-[6em] sm:min-h-[4em] flex items-center justify-center">
              <span>
                {typed}
                {phase === 'typing' && <span className="text-gold cursor-blink">|</span>}
              </span>
            </p>

            {/* Attribution */}
            {phase !== 'typing' && (
              <motion.p
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8 }}
                className="text-cream-dim text-sm sm:text-base mt-6 font-mono tracking-wider"
              >
                — Abū ʿAlī al-Ḥasan ibn al-Haytham
              </motion.p>
            )}

            {/* Revelation */}
            {phase === 'revealing' || phase === 'questioning' ? (
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 1.2 }}
                className="mt-10 max-w-2xl mx-auto"
              >
                <p className="text-cream text-base sm:text-lg leading-relaxed">
                  He wrote this in Cairo, c. 1030 CE. He was describing the{' '}
                  <span className="text-gradient-gold font-semibold">scientific method</span> —
                  skepticism toward authority, observation, experiment, replication.
                </p>
                <p className="text-cream-dim text-sm sm:text-base mt-4">
                  <span className="text-gradient-gold font-semibold">590 years</span> before
                  Francis Bacon&apos;s <em>Novum Organum</em> (1620) — the book
                  credited with inventing it.
                </p>
              </motion.div>
            ) : null}
          </div>

          {/* Scroll hint */}
          <motion.div
            style={{ opacity: hintOpacity }}
            className="absolute bottom-10 flex flex-col items-center gap-2 text-cream-dim/70"
          >
            <span className="text-[10px] font-mono tracking-[0.4em] uppercase">
              {t('scrollHint')}
            </span>
            <motion.div
              animate={{ y: [0, 8, 0] }}
              transition={{ repeat: Infinity, duration: 1.6, ease: 'easeInOut' }}
              className="w-5 h-8 rounded-full border border-gold/40 flex items-start justify-center p-1.5"
            >
              <span className="w-1 h-1.5 rounded-full bg-gold animate-pulse-gold" />
            </motion.div>
          </motion.div>
        </motion.div>

        {/* Question layer — cross-fades in */}
        <motion.div
          style={{ opacity: questionOpacity, scale: questionScale }}
          className="absolute inset-0 flex flex-col items-center justify-center px-6 text-center pointer-events-none"
        >
          <h1 className="font-display text-[10vw] sm:text-6xl md:text-7xl lg:text-8xl leading-[0.95] tracking-tight">
            <span className="block text-cream">{t('q1')}</span>
            <span className="block text-gradient-gold text-glow-gold italic">
              {t('q2')}
            </span>
            <span className="block text-cream mt-2">in 1620.</span>
            <span className="block mt-4 text-cream-dim text-2xl sm:text-4xl md:text-5xl font-display italic">
              {t('orDid')}
            </span>
          </h1>
        </motion.div>
      </div>
    </section>
  );
}
