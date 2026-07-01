'use client';
import { useEffect, useRef, useState } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import TopicHeroImage from '@/components/psych/TopicHeroImage';
import { useTranslations } from 'next-intl';

export default function MedHeroSection() {
  const t = useTranslations('Hero.med');

  const ref = useRef<HTMLDivElement>(null);
  const [pulse, setPulse] = useState(0);
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start start', 'end start'] });
  const heroOpacity = useTransform(scrollYProgress, [0, 0.4, 0.55], [1, 1, 0]);
  const heroScale = useTransform(scrollYProgress, [0, 0.55], [1, 0.96]);
  const questionOpacity = useTransform(scrollYProgress, [0.45, 0.65], [0, 1]);
  const questionScale = useTransform(scrollYProgress, [0.45, 0.65], [0.94, 1]);
  const hintOpacity = useTransform(scrollYProgress, [0, 0.1, 0.35], [0, 1, 0]);

  useEffect(() => {
    let raf = 0;
    const tick = () => { setPulse((p) => (p + 0.02) % 1); raf = requestAnimationFrame(tick); };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, []);

  return (
    <section id="hero" ref={ref} className="relative min-h-[180vh]">
      <div className="sticky top-0 h-screen w-full overflow-hidden">
        <TopicHeroImage
          src="/images/sdam-med/canon-latin-facsimile.jpg"
          alt="Authentic Latin translation page of Ibn Sīnā's Canon of Medicine — Europe's medical textbook for 600 years"
          caption="Source: Latin translation of Ibn Sīnā's Canon of Medicine"
          treatment="manuscript"
        />

        <motion.div style={{ opacity: heroOpacity, scale: heroScale }} className="absolute inset-0 flex flex-col items-center justify-center px-6">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 1, delay: 0.3 }} className="absolute top-[10vh] flex items-center gap-3 text-[10px] sm:text-xs font-mono tracking-[0.3em] uppercase text-gold/70">
            <span className="h-px w-8 bg-gold/40" />{t('eyebrow')}<span className="h-px w-8 bg-gold/40" />
          </motion.div>
          {/* Heartbeat/pulse animation */}
          <div className="w-full max-w-2xl mt-[-2vh]">
            <PulseSVG pulse={pulse} />
          </div>
          <div className="mt-4 text-center max-w-2xl">
            <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 1, delay: 1.5 }} className="text-cream/85 text-sm sm:text-base leading-relaxed">
              This is a heartbeat — the rhythm of clinical medicine. The first controlled clinical trial in history was conducted by <span className="text-gradient-gold font-semibold">al-Rāzī</span> in Baghdad, c. 900 CE.
            </motion.p>
            <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 1, delay: 2.5 }} className="text-cream-dim text-xs sm:text-sm mt-3">
              <span className="text-gradient-gold font-semibold">663 years</span> before the first European hospital. The Canon of Medicine — Europe&apos;s medical textbook for <span className="text-gradient-gold font-semibold">600 years</span>.
            </motion.p>
          </div>
          <motion.div style={{ opacity: hintOpacity }} className="absolute bottom-10 flex flex-col items-center gap-2 text-cream-dim/70">
            <span className="text-[10px] font-mono tracking-[0.4em] uppercase">{t('scrollHint')}</span>
            <motion.div animate={{ y: [0, 8, 0] }} transition={{ repeat: Infinity, duration: 1.6 }} className="w-5 h-8 rounded-full border border-gold/40 flex items-start justify-center p-1.5"><span className="w-1 h-1.5 rounded-full bg-gold animate-pulse-gold" /></motion.div>
          </motion.div>
        </motion.div>
        <motion.div style={{ opacity: questionOpacity, scale: questionScale }} className="absolute inset-0 flex flex-col items-center justify-center px-6 text-center pointer-events-none">
          <h1 className="font-display text-[10vw] sm:text-6xl md:text-7xl lg:text-8xl leading-[0.95] tracking-tight">
            <span className="block text-cream">Europeans invented</span>
            <span className="block text-gradient-gold text-glow-gold italic">{t('q2')}</span>
            <span className="block mt-4 text-cream-dim text-2xl sm:text-4xl md:text-5xl font-display italic">{t('orDid')}</span>
          </h1>
        </motion.div>
      </div>
    </section>
  );
}

function PulseSVG({ pulse }: { pulse: number }) {
  const w = 600, h = 200;
  const points: string[] = [];
  for (let i = 0; i <= 100; i++) {
    const x = (i / 100) * w;
    let y = h / 2;
    // Heartbeat spike pattern
    const phase = ((i / 100) + pulse) % 1;
    if (phase > 0.45 && phase < 0.5) y = h / 2 - (phase - 0.45) * 20 * h;
    else if (phase >= 0.5 && phase < 0.52) y = h / 2 + (phase - 0.5) * 25 * h;
    else if (phase >= 0.52 && phase < 0.55) y = h / 2 - (phase - 0.52) * 10 * h;
    points.push(`${x},${y}`);
  }
  return (
    <svg viewBox={`0 0 ${w} ${h}`} className="w-full h-auto">
      <defs>
        <linearGradient id="pulseGrad" x1="0%" y1="0%" x2="100%" y2="0%">
          <stop offset="0%" stopColor="#f4d062" stopOpacity="0.3" />
          <stop offset="50%" stopColor="#f4d062" stopOpacity="1" />
          <stop offset="100%" stopColor="#d4af37" stopOpacity="0.3" />
        </linearGradient>
      </defs>
      <polyline points={points.join(' ')} fill="none" stroke="url(#pulseGrad)" strokeWidth="2.5" style={{ filter: 'drop-shadow(0 0 6px rgba(244,208,98,0.4))' }} />
      <text x={w / 2} y={h - 8} fill="#a39c87" fontSize="10" textAnchor="middle" className="font-mono uppercase tracking-widest">CLINICAL MEDICINE · AL-RĀZĪ · c. 900 CE</text>
    </svg>
  );
}
