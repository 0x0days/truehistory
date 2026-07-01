'use client';

import { useEffect, useRef, useState } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import TopicHeroImage from '@/components/psych/TopicHeroImage';
import { useTranslations } from 'next-intl';

/**
 * Hero for CALCULUS investigation.
 * Visual: an area-under-a-curve filling up with rectangles (Riemann sum),
 * representing the integral that Ibn al-Haytham computed c. 1000 CE —
 * 666 years before Newton's Principia (1687).
 */
export default function CalculusHeroSection() {
  const t = useTranslations('Hero.calculus');

  const ref = useRef<HTMLDivElement>(null);
  const [rectCount, setRectCount] = useState(4);
  const [phase, setPhase] = useState<'counting' | 'revealing' | 'questioning'>('counting');

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start start', 'end start'],
  });

  const heroOpacity = useTransform(scrollYProgress, [0, 0.4, 0.55], [1, 1, 0]);
  const heroScale = useTransform(scrollYProgress, [0, 0.55], [1, 0.96]);
  const questionOpacity = useTransform(scrollYProgress, [0.45, 0.65], [0, 1]);
  const questionScale = useTransform(scrollYProgress, [0.45, 0.65], [0.94, 1]);
  const hintOpacity = useTransform(scrollYProgress, [0, 0.1, 0.35], [0, 1, 0]);

  // Animate the Riemann sum — increase rectangle count over time
  useEffect(() => {
    const interval = setInterval(() => {
      setRectCount((c) => {
        if (c >= 64) {
          clearInterval(interval);
          setTimeout(() => setPhase('revealing'), 600);
          setTimeout(() => setPhase('questioning'), 2600);
          return 64;
        }
        return c * 2;
      });
    }, 900);
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
          src="/images/sdam-calculus/archimedes-smithsonian.jpg"
          alt="Authentic manuscript page from the Arabic Archimedes tradition — the source of Ibn al-Haytham's integration theorem"
          caption='Source: Arabic Archimedes manuscript tradition'
          treatment="manuscript"
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

          {/* Integral animation */}
          <div className="w-full max-w-3xl mt-[-2vh]">
            <RiemannSumSVG rectCount={rectCount} />
          </div>

          {/* Text below the visualization */}
          <div className="mt-4 text-center max-w-2xl">
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: phase === 'counting' ? 0 : 1 }}
              transition={{ duration: 1 }}
              className="text-cream/85 text-sm sm:text-base leading-relaxed"
            >
              This is a Riemann sum — the limit that defines an integral.
              Ibn al-Haytham computed this exact limit, for the volume of a
              paraboloid, in Cairo c.{' '}
              <span className="text-gradient-gold font-semibold">1000 CE</span>.
            </motion.p>

            {phase !== 'counting' && (
              <motion.p
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.2 }}
                className="text-cream-dim text-xs sm:text-sm mt-3"
              >
                <span className="text-gradient-gold font-semibold">666 years</span> before
                Newton&apos;s <em>Principia</em> (1687).
                <span className="text-gradient-gold font-semibold"> 684 years</span> before
                Leibniz&apos;s first calculus paper (1684).
              </motion.p>
            )}
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

        {/* Question layer — cross-fades in */}
        <motion.div
          style={{ opacity: questionOpacity, scale: questionScale }}
          className="absolute inset-0 flex flex-col items-center justify-center px-6 text-center pointer-events-none"
        >
          <h1 className="font-display text-[10vw] sm:text-6xl md:text-7xl lg:text-8xl leading-[0.95] tracking-tight">
            <span className="block text-cream">{t('q1')}</span>
            <span className="block text-gradient-gold text-glow-gold italic">
              in 1687.
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

function RiemannSumSVG({ rectCount }: { rectCount: number }) {
  // The curve: y = x^2 / 4 from x=0 to x=8 (max y = 16)
  const width = 800;
  const height = 320;
  const padding = 30;
  const plotW = width - padding * 2;
  const plotH = height - padding * 2;
  const xMax = 8;
  const yMax = 16;

  const xToPx = (x: number) => padding + (x / xMax) * plotW;
  const yToPx = (y: number) => padding + plotH - (y / yMax) * plotH;

  // Generate the curve points
  const curvePoints = [];
  for (let i = 0; i <= 80; i++) {
    const x = (i / 80) * xMax;
    const y = (x * x) / 4;
    curvePoints.push(`${xToPx(x)},${yToPx(y)}`);
  }

  // Generate the rectangles
  const rects = [];
  const dx = xMax / rectCount;
  for (let i = 0; i < rectCount; i++) {
    const xLeft = i * dx;
    const xRight = (i + 1) * dx;
    // Use left-endpoint height (or midpoint — let's use midpoint for nicer look)
    const xMid = (xLeft + xRight) / 2;
    const yMid = (xMid * xMid) / 4;
    rects.push({ xLeft, xRight, yMid });
  }

  return (
    <svg viewBox={`0 0 ${width} ${height}`} className="w-full h-auto">
      <defs>
        <linearGradient id="rectGrad" x1="0%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%" stopColor="#f4d062" stopOpacity="0.4" />
          <stop offset="100%" stopColor="#d4af37" stopOpacity="0.15" />
        </linearGradient>
        <linearGradient id="curveGrad" x1="0%" y1="0%" x2="100%" y2="0%">
          <stop offset="0%" stopColor="#f4d062" />
          <stop offset="100%" stopColor="#d4af37" />
        </linearGradient>
      </defs>

      {/* Axes */}
      <line
        x1={padding}
        y1={height - padding}
        x2={width - padding}
        y2={height - padding}
        stroke="rgba(244, 234, 213, 0.4)"
        strokeWidth="1.5"
      />
      <line
        x1={padding}
        y1={padding}
        x2={padding}
        y2={height - padding}
        stroke="rgba(244, 234, 213, 0.4)"
        strokeWidth="1.5"
      />
      <text x={width - padding} y={height - padding + 18} fill="#a39c87" fontSize="10" textAnchor="end" className="font-mono">
        x
      </text>
      <text x={padding - 8} y={padding + 4} fill="#a39c87" fontSize="10" textAnchor="end" className="font-mono">
        y
      </text>

      {/* The Riemann rectangles */}
      {rects.map((r, i) => {
        const x1 = xToPx(r.xLeft);
        const x2 = xToPx(r.xRight);
        const yTop = yToPx(r.yMid);
        const yBottom = yToPx(0);
        return (
          <motion.rect
            key={`${rectCount}-${i}`}
            x={x1}
            y={yTop}
            width={Math.max(0.5, x2 - x1)}
            height={yBottom - yTop}
            fill="url(#rectGrad)"
            stroke="rgba(212, 175, 55, 0.5)"
            strokeWidth="0.5"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.4, delay: i * 0.02 }}
          />
        );
      })}

      {/* The curve y = x²/4 */}
      <motion.polyline
        points={curvePoints.join(' ')}
        fill="none"
        stroke="url(#curveGrad)"
        strokeWidth="2.5"
        initial={{ pathLength: 0 }}
        animate={{ pathLength: 1 }}
        transition={{ duration: 1.5 }}
        style={{ filter: 'drop-shadow(0 0 6px rgba(244, 208, 98, 0.4))' }}
      />

      {/* Label */}
      <text x={xToPx(6)} y={yToPx(10)} fill="#f4d062" fontSize="12" className="font-mono italic">
        y = x²/4
      </text>

      {/* Rectangle count display */}
      <text
        x={width / 2}
        y={padding / 2 + 4}
        fill="#f4d062"
        fontSize="11"
        textAnchor="middle"
        className="font-mono uppercase tracking-widest"
      >
        n = {rectCount} RECTANGLES → ∫₀⁸ (x²/4) dx = 256/3 ≈ 85.33
      </text>
    </svg>
  );
}
