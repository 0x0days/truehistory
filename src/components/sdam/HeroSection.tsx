'use client';

import { useEffect, useRef, useState } from 'react';
import { motion, useScroll, useTransform, useMotionValue, useSpring } from 'framer-motion';
import TopicHeroImage from '@/components/psych/TopicHeroImage';
import { useTranslations } from 'next-intl';

/**
 * Hero section: "Newton discovered gravity in 1687. Or did he?"
 * Features a falling apple that drifts down on scroll and "shatters" into gold particles
 * at the threshold where the question is revealed.
 */
export default function HeroSection() {
  const t = useTranslations('Hero.gravity');

  const ref = useRef<HTMLDivElement>(null);
  const [shattered, setShattered] = useState(false);
  const [particles, setParticles] = useState<
    { x: number; y: number; vx: number; vy: number; r: number; life: number; maxLife: number }[]
  >([]);

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start start', 'end start'],
  });

  // Apple falls as user scrolls
  const appleY = useTransform(scrollYProgress, [0, 0.6], [0, 380]);
  const appleYSpring = useSpring(appleY, { stiffness: 90, damping: 18 });
  const appleRotate = useTransform(scrollYProgress, [0, 0.6], [0, 35]);
  const appleScale = useTransform(scrollYProgress, [0, 0.5, 0.6], [1, 1.05, 0.4]);
  const appleOpacity = useTransform(scrollYProgress, [0, 0.5, 0.62], [1, 1, 0]);
  const questionOpacity = useTransform(scrollYProgress, [0.4, 0.6], [0, 1]);
  const questionScale = useTransform(scrollYProgress, [0.4, 0.6], [0.94, 1]);
  const hintOpacity = useTransform(scrollYProgress, [0, 0.15, 0.35], [1, 1, 0]);

  // Track shatter moment
  useEffect(() => {
    const unsub = scrollYProgress.on('change', (v) => {
      if (v > 0.55 && !shattered) {
        setShattered(true);
        // Spawn burst particles
        const burst = Array.from({ length: 38 }, () => {
          const angle = Math.random() * Math.PI * 2;
          const speed = 2 + Math.random() * 6;
          return {
            x: 50 + (Math.random() - 0.5) * 8,
            y: 50 + (Math.random() - 0.5) * 8,
            vx: Math.cos(angle) * speed,
            vy: Math.sin(angle) * speed - 2,
            r: 1 + Math.random() * 3,
            life: 0,
            maxLife: 60 + Math.random() * 40,
          };
        });
        setParticles(burst);
      }
    });
    return () => unsub();
  }, [scrollYProgress, shattered]);

  // Animate burst particles
  useEffect(() => {
    if (particles.length === 0) return;
    let raf = 0;
    const tick = () => {
      setParticles((prev) =>
        prev
          .map((p) => ({
            ...p,
            x: p.x + p.vx,
            y: p.y + p.vy,
            vy: p.vy + 0.18, // gravity
            vx: p.vx * 0.99,
            life: p.life + 1,
          }))
          .filter((p) => p.life < p.maxLife)
      );
      raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [particles.length > 0]);

  return (
    <section
      id="hero"
      ref={ref}
      className="relative min-h-[180vh]"
    >
      {/* Sticky stage */}
      <div className="sticky top-0 h-screen w-full flex flex-col items-center justify-center px-6">
        <TopicHeroImage
          src="/images/sdam-real/mizan-diagram-1.jpg"
          alt="Authentic Arabic manuscript page from al-Khāzini's Mīzān al-ḥikma (Book of the Balance of Wisdom, 1121 CE) showing the hydrostatic balance diagram"
          caption='Source: al-Khāzini, Mīzān al-ḥikma manuscript'
          treatment="manuscript"
        />

        {/* Pre-title eyebrow */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.3 }}
          className="absolute top-[14vh] flex items-center gap-3 text-[10px] sm:text-xs font-mono tracking-[0.3em] uppercase text-gold/70"
        >
          <span className="h-px w-8 bg-gold/40" />
          {t('eyebrow')}
          <span className="h-px w-8 bg-gold/40" />
        </motion.div>

        {/* The apple */}
        <motion.div
          style={{
            y: appleYSpring,
            rotate: appleRotate,
            scale: appleScale,
            opacity: appleOpacity,
          }}
          className="relative z-10 mt-[-3vh]"
        >
          <AppleSVG />
          {/* shadow ground */}
          <motion.div
            style={{ opacity: appleOpacity }}
            className="absolute -bottom-6 left-1/2 -translate-x-1/2 w-20 h-3 rounded-full bg-gold/20 blur-md"
          />
        </motion.div>

        {/* Burst particles */}
        <div className="pointer-events-none absolute inset-0 z-20">
          {particles.map((p, i) => (
            <motion.span
              key={i}
              className="absolute rounded-full"
              style={{
                left: `${p.x}%`,
                top: `${p.y}%`,
                width: p.r * 2,
                height: p.r * 2,
                background:
                  i % 3 === 0
                    ? '#f4d062'
                    : i % 3 === 1
                    ? '#d4af37'
                    : '#ebe0c4',
                boxShadow: '0 0 8px rgba(244,208,98,0.6)',
                opacity: 1 - p.life / p.maxLife,
              }}
            />
          ))}
        </div>

        {/* The Question */}
        <motion.div
          style={{ opacity: questionOpacity, scale: questionScale }}
          className="absolute inset-0 flex flex-col items-center justify-center px-6 text-center"
        >
          <h1 className="font-display text-[12vw] sm:text-7xl md:text-8xl lg:text-9xl leading-[0.95] tracking-tight">
            <span className="block text-cream">{t('q1')}</span>
            <span className="block text-gradient-gold text-glow-gold italic">
              {t('q2')}
            </span>
            <span className="block text-cream">{t('q3')}</span>
            <span className="block mt-4 text-cream-dim text-3xl sm:text-5xl md:text-6xl font-display italic">
              {t('orDid')}
            </span>
          </h1>
        </motion.div>

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
      </div>
    </section>
  );
}

function AppleSVG() {
  return (
    <svg
      width="120"
      height="130"
      viewBox="0 0 120 130"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className="drop-shadow-[0_0_25px_rgba(212,175,55,0.35)]"
    >
      <defs>
        <radialGradient id="appleBody" cx="38%" cy="32%" r="75%">
          <stop offset="0%" stopColor="#f4d062" />
          <stop offset="45%" stopColor="#d4af37" />
          <stop offset="100%" stopColor="#8a7028" />
        </radialGradient>
        <linearGradient id="leaf" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#2a6b5e" />
          <stop offset="100%" stopColor="#1a4d4a" />
        </linearGradient>
      </defs>
      {/* stem */}
      <path
        d="M60 18 Q60 8 66 4"
        stroke="#5a3a1a"
        strokeWidth="3"
        strokeLinecap="round"
        fill="none"
      />
      {/* leaf */}
      <path
        d="M66 8 Q84 4 88 18 Q80 22 70 18 Q66 14 66 8 Z"
        fill="url(#leaf)"
      />
      {/* apple body */}
      <path
        d="M60 22
           C 38 22, 22 38, 22 62
           C 22 92, 42 116, 60 116
           C 78 116, 98 92, 98 62
           C 98 38, 82 22, 60 22 Z"
        fill="url(#appleBody)"
      />
      {/* highlight */}
      <ellipse cx="46" cy="42" rx="10" ry="14" fill="#fff7d6" opacity="0.35" />
    </svg>
  );
}
