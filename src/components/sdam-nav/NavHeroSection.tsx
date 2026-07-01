'use client';

import { useEffect, useRef, useState } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import TopicHeroImage from '@/components/psych/TopicHeroImage';
import { useTranslations } from 'next-intl';

/**
 * Hero for NAVIGATION investigation.
 * Visual: a rotating astrolabe with the rete (star pointer) sweeping,
 * and angular graduations lighting up. Symbolizes the instrument
 * Mariam al-Asturlabiya manufactured — the precision navigation tool
 * that made celestial navigation possible 500+ years before Europeans
 * claimed to invent it.
 */
export default function NavHeroSection() {
  const t = useTranslations('Hero.nav');

  const ref = useRef<HTMLDivElement>(null);
  const [angle, setAngle] = useState(0);

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start start', 'end start'],
  });

  const heroOpacity = useTransform(scrollYProgress, [0, 0.4, 0.55], [1, 1, 0]);
  const heroScale = useTransform(scrollYProgress, [0, 0.55], [1, 0.96]);
  const questionOpacity = useTransform(scrollYProgress, [0.45, 0.65], [0, 1]);
  const questionScale = useTransform(scrollYProgress, [0.45, 0.65], [0.94, 1]);
  const hintOpacity = useTransform(scrollYProgress, [0, 0.1, 0.35], [0, 1, 0]);

  useEffect(() => {
    let raf = 0;
    const tick = () => {
      setAngle((a) => (a + 0.3) % 360);
      raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, []);

  return (
    <section
      id="hero"
      ref={ref}
      className="relative min-h-[180vh]"
    >
      <div className="sticky top-0 h-screen w-full overflow-hidden">
        <TopicHeroImage
          src="/images/sdam-nav/astrolabe-sothebys.jpg"
          alt='Authentic medieval Islamic astrolabe — the navigation instrument that guided Columbus and every European navigator after him'
          caption='Source: medieval Islamic astrolabe'
          treatment="cosmic"
        />

        {/* Hero content layer */}
        <motion.div
          style={{ opacity: heroOpacity, scale: heroScale }}
          className="absolute inset-0 flex flex-col items-center justify-center px-6"
        >
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.3 }}
            className="absolute top-[10vh] flex items-center gap-3 text-[10px] sm:text-xs font-mono tracking-[0.3em] uppercase text-gold/70"
          >
            <span className="h-px w-8 bg-gold/40" />
            {t('eyebrow')}
            <span className="h-px w-8 bg-gold/40" />
          </motion.div>

          {/* Astrolabe animation */}
          <div className="w-full max-w-md mt-[-2vh]">
            <AstrolabeSVG angle={angle} />
          </div>

          {/* Text below */}
          <div className="mt-4 text-center max-w-2xl">
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 1, delay: 1.5 }}
              className="text-cream/85 text-sm sm:text-base leading-relaxed"
            >
              This instrument — the astrolabe — was the GPS of the medieval
              world. It was perfected by{' '}
              <span className="text-gradient-gold font-semibold">
                Mariam al-Asturlābiyya
              </span>{' '}
              in Aleppo, c. 944 CE.
            </motion.p>

            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 1, delay: 2.5 }}
              className="text-cream-dim text-xs sm:text-sm mt-3"
            >
              <span className="text-gradient-gold font-semibold">554 years</span> before
              Columbus set sail.{' '}
              <span className="text-gradient-gold font-semibold">553 years</span> before
              Vasco da Gama reached India — guided by a Muslim navigator.
            </motion.p>
          </div>

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

        {/* Question layer */}
        <motion.div
          style={{ opacity: questionOpacity, scale: questionScale }}
          className="absolute inset-0 flex flex-col items-center justify-center px-6 text-center pointer-events-none"
        >
          <h1 className="font-display text-[10vw] sm:text-6xl md:text-7xl lg:text-8xl leading-[0.95] tracking-tight">
            <span className="block text-cream">Europeans invented</span>
            <span className="block text-gradient-gold text-glow-gold italic">
              celestial navigation
            </span>
            <span className="block text-cream mt-2">{t('q2')}</span>
            <span className="block mt-4 text-cream-dim text-2xl sm:text-4xl md:text-5xl font-display italic">
              {t('orDid')}
            </span>
          </h1>
        </motion.div>
      </div>
    </section>
  );
}

function AstrolabeSVG({ angle }: { angle: number }) {
  const size = 400;
  const cx = size / 2;
  const cy = size / 2;
  const R = 180;

  return (
    <svg viewBox={`0 0 ${size} ${size}`} className="w-full h-auto">
      <defs>
        <radialGradient id="astrolabeFace">
          <stop offset="0%" stopColor="#1a1a2a" />
          <stop offset="70%" stopColor="#0f0f18" />
          <stop offset="100%" stopColor="#0a0a14" />
        </radialGradient>
        <linearGradient id="reteGrad" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#f4d062" />
          <stop offset="100%" stopColor="#d4af37" />
        </linearGradient>
      </defs>

      {/* Outer ring (suspension ring + throne) */}
      <circle cx={cx} cy={cy} r={R + 8} fill="none" stroke="#d4af37" strokeWidth="2" />
      <circle cx={cx} cy={cy} r={R + 14} fill="none" stroke="rgba(212, 175, 55, 0.3)" strokeWidth="1" />

      {/* Suspension throne */}
      <rect x={cx - 8} y={cy - R - 22} width="16" height="10" fill="#d4af37" />
      <circle cx={cx} cy={cy - R - 24} r="6" fill="none" stroke="#d4af37" strokeWidth="2" />

      {/* Main face */}
      <circle cx={cx} cy={cy} r={R} fill="url(#astrolabeFace)" stroke="#d4af37" strokeWidth="2.5" />

      {/* Angular graduations (360 ticks) */}
      {Array.from({ length: 72 }).map((_, i) => {
        const a = (i * 5 * Math.PI) / 180;
        const isMajor = i % 6 === 0;
        const r1 = R - (isMajor ? 14 : 8);
        const r2 = R - 2;
        const lit = ((angle - i * 5 + 360) % 360) < 30;
        return (
          <line
            key={i}
            x1={cx + Math.cos(a) * r1}
            y1={cy + Math.sin(a) * r1}
            x2={cx + Math.cos(a) * r2}
            y2={cy + Math.sin(a) * r2}
            stroke={lit ? '#f4d062' : isMajor ? 'rgba(212, 175, 55, 0.6)' : 'rgba(212, 175, 55, 0.3)'}
            strokeWidth={isMajor ? 1.5 : 0.8}
          />
        );
      })}

      {/* Tropic of Cancer and Capricorn circles */}
      <circle cx={cx} cy={cy} r={R * 0.75} fill="none" stroke="rgba(212, 175, 55, 0.2)" strokeWidth="0.8" />
      <circle cx={cx} cy={cy} r={R * 0.5} fill="none" stroke="rgba(212, 175, 55, 0.2)" strokeWidth="0.8" />

      {/* Equator line */}
      <line x1={cx - R * 0.85} y1={cy} x2={cx + R * 0.85} y2={cy} stroke="rgba(212, 175, 55, 0.15)" strokeWidth="0.5" strokeDasharray="2 3" />

      {/* The rete (star pointer) — rotates */}
      <g transform={`rotate(${angle} ${cx} ${cy})`}>
        {/* Rete frame */}
        <circle cx={cx} cy={cy} r={R * 0.85} fill="none" stroke="url(#reteGrad)" strokeWidth="1.5" opacity="0.7" />
        {/* Star pointers */}
        {[0, 60, 120, 180, 240, 300].map((deg, i) => {
          const rad = (deg * Math.PI) / 180;
          return (
            <g key={i}>
              <line
                x1={cx + Math.cos(rad) * (R * 0.3)}
                y1={cy + Math.sin(rad) * (R * 0.3)}
                x2={cx + Math.cos(rad) * (R * 0.82)}
                y2={cy + Math.sin(rad) * (R * 0.82)}
                stroke="#f4d062"
                strokeWidth="2"
                opacity="0.8"
              />
              <circle
                cx={cx + Math.cos(rad) * (R * 0.82)}
                cy={cy + Math.sin(rad) * (R * 0.82)}
                r="4"
                fill="#f4d062"
              />
            </g>
          );
        })}
      </g>

      {/* Center pivot */}
      <circle cx={cx} cy={cy} r="8" fill="#d4af37" />
      <circle cx={cx} cy={cy} r="4" fill="#0a0a14" />

      {/* Label */}
      <text x={cx} y={cy + R + 28} fill="#a39c87" fontSize="10" textAnchor="middle" className="font-mono uppercase tracking-widest">
        ASTROLABE · MARIAM AL-ASTURLĀBIYYA · c. 944 CE
      </text>
    </svg>
  );
}
