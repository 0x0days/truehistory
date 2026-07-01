'use client';

import { useEffect, useRef, useState } from 'react';
import { motion, useInView, AnimatePresence } from 'framer-motion';
import { useTranslations } from 'next-intl';

interface Burst {
  id: number;
  x: number;
  y: number;
  vx: number;
  vy: number;
  r: number;
  color: string;
  life: number;
  maxLife: number;
}

export default function OpticsVerdictSection() {
  const tSections = useTranslations('Sections');
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: '0px 0px 200px 0px' });
  const [score, setScore] = useState(0);
  const [bursts, setBursts] = useState<Burst[]>([]);
  const [showVerdict, setShowVerdict] = useState(false);

  useEffect(() => {
    if (!inView) return;
    let frame = 0;
    const totalFrames = 110;
    const target = 16.5;
    const interval = setInterval(() => {
      frame += 1;
      const progress = frame / totalFrames;
      const eased = 1 - Math.pow(1 - progress, 3);
      setScore(target * eased);
      if (frame >= totalFrames) {
        clearInterval(interval);
        setScore(target);
        const newBursts: Burst[] = Array.from({ length: 90 }, (_, i) => {
          const angle = (i / 90) * Math.PI * 2 + Math.random() * 0.3;
          const speed = 3 + Math.random() * 7;
          return {
            id: i,
            x: 50,
            y: 50,
            vx: Math.cos(angle) * speed,
            vy: Math.sin(angle) * speed,
            r: 1 + Math.random() * 4,
            color: ['#f4d062', '#d4af37', '#ebe0c4', '#8a7028'][i % 4],
            life: 0,
            maxLife: 80 + Math.random() * 60,
          };
        });
        setBursts(newBursts);
        setTimeout(() => setShowVerdict(true), 350);
      }
    }, 16);
    return () => clearInterval(interval);
  }, [inView]);

  useEffect(() => {
    if (bursts.length === 0) return;
    let raf = 0;
    const tick = () => {
      setBursts((prev) =>
        prev
          .map((b) => ({
            ...b,
            x: b.x + b.vx,
            y: b.y + b.vy,
            vy: b.vy + 0.12,
            vx: b.vx * 0.99,
            life: b.life + 1,
          }))
          .filter((b) => b.life < b.maxLife)
      );
      raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [bursts.length > 0]);

  const category =
    score >= 18
      ? { label: 'Irrefutable', color: '#f4d062' }
      : score >= 14
      ? { label: 'Very Strong Case', color: '#f4d062' }
      : score >= 10
      ? { label: 'Strong Case', color: '#d4af37' }
      : score >= 7
      ? { label: 'Moderate', color: '#a39c87' }
      : { label: 'Weak', color: '#6b1d2a' };

  return (
    <section
      id="verdict"
      ref={ref}
      className="relative min-h-screen flex flex-col items-center justify-center px-6 py-24 overflow-hidden"
    >
      <motion.div
        initial={{ opacity: 0, scale: 0.5 }}
        animate={inView ? { opacity: 1, scale: 1 } : {}}
        transition={{ duration: 1.2 }}
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            'radial-gradient(circle at center, rgba(212,175,55,0.18) 0%, transparent 50%)',
        }}
      />

      <div className="pointer-events-none absolute inset-0 z-10">
        {bursts.map((b) => (
          <span
            key={b.id}
            className="absolute rounded-full"
            style={{
              left: `${b.x}%`,
              top: `${b.y}%`,
              width: b.r * 2,
              height: b.r * 2,
              background: b.color,
              boxShadow: `0 0 ${b.r * 4}px ${b.color}`,
              opacity: 1 - b.life / b.maxLife,
            }}
          />
        ))}
      </div>

      <div className="max-w-4xl w-full relative z-20 text-center">
        <motion.p
          initial={{ opacity: 0 }}
          animate={inView ? { opacity: 1 } : {}}
          transition={{ duration: 0.8 }}
          className="text-[10px] font-mono tracking-[0.4em] uppercase text-gold/70 mb-6"
        >
          {tSections('Verdict.chapterTitle')}
        </motion.p>

        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.1 }}
          className="font-display text-3xl sm:text-5xl text-cream-dim mb-8"
        >
          The Cumulative Evidence Score
        </motion.h2>

        <div className="relative mb-4">
          <AnimatePresence mode="wait">
            <motion.div
              key={showVerdict ? 'final' : 'counting'}
              initial={{ scale: 0.95 }}
              animate={{ scale: 1 }}
              className="font-display text-[26vw] sm:text-[20vw] md:text-[16rem] leading-none text-gradient-gold text-glow-gold"
            >
              {score.toFixed(1)}
              <span className="text-cream-dim/40 text-[14vw] sm:text-[10vw] md:text-[7rem]">
                /21
              </span>
            </motion.div>
          </AnimatePresence>
        </div>

        <AnimatePresence>
          {showVerdict && (
            <motion.div
              initial={{ opacity: 0, y: 30, scale: 0.9 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              transition={{ duration: 0.7, ease: 'easeOut' }}
              className="mt-4"
            >
              <div className="inline-flex items-center gap-3 px-6 py-3 rounded-full border-2 border-gold glass-card-gold glow-gold">
                <span className="w-2 h-2 rounded-full bg-gold animate-pulse-gold" />
                <span
                  className="font-display text-2xl sm:text-4xl italic"
                  style={{ color: category.color }}
                >
                  {category.label}
                </span>
                <span className="w-2 h-2 rounded-full bg-gold animate-pulse-gold" />
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        <AnimatePresence>
          {showVerdict && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.4 }}
              className="mt-12 max-w-2xl mx-auto space-y-4"
            >
              <p className="text-cream text-base sm:text-lg leading-relaxed">
                The historical record is unambiguous. The foundational laws of
                optics — reflection, refraction, straight-line propagation, the
                camera obscura theorem, and the intromission theory of vision —
                were{' '}
                <span className="text-gradient-gold font-semibold">
                  mathematically proven by Ibn al-Haytham (1011–1021) and Ibn
                  Sahl (984)
                </span>{' '}
                using reproducible experiments and geometric demonstration.
              </p>
              <p className="text-cream-dim text-sm sm:text-base leading-relaxed">
                Newton&apos;s genuine, independent contribution was the prism
                decomposition of white light and the corpuscular theory. Snell&apos;s
                genuine contribution was rediscovering Ibn Sahl&apos;s sine law
                637 years later. Daguerre&apos;s contribution was adding
                chemistry to Ibn al-Haytham&apos;s camera obscura. None of these
                European &ldquo;discoveries&rdquo; would have been possible
                without the Arabic optical tradition. Ibn al-Haytham did not
                guess — he proved, measured, and built the apparatus.
              </p>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </section>
  );
}
