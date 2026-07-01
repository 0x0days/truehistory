'use client';

import { useEffect, useRef, useState } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import TopicHeroImage from '@/components/psych/TopicHeroImage';
import { useTranslations } from 'next-intl';

/**
 * Hero for ASTRONOMY investigation.
 * Visual: an animated planetary orbit with epicycles, gradually simplifying
 * to a clean heliocentric orbit. Symbolizes the Maragheh→Copernicus
 * mathematical lineage — the planetary models Copernicus "invented" were
 * already in Arabic manuscripts 300 years earlier.
 */
export default function AstroHeroSection() {
  const t = useTranslations('Hero.astro');

  const ref = useRef<HTMLDivElement>(null);
  const [phase, setPhase] = useState<'geocentric' | 'transitioning' | 'heliocentric'>('geocentric');
  const [orbitAngle, setOrbitAngle] = useState(0);

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start start', 'end start'],
  });

  const heroOpacity = useTransform(scrollYProgress, [0, 0.4, 0.55], [1, 1, 0]);
  const heroScale = useTransform(scrollYProgress, [0, 0.55], [1, 0.96]);
  const questionOpacity = useTransform(scrollYProgress, [0.45, 0.65], [0, 1]);
  const questionScale = useTransform(scrollYProgress, [0.45, 0.65], [0.92, 1]);
  const hintOpacity = useTransform(scrollYProgress, [0, 0.1, 0.35], [0, 1, 0]);

  // Animate the orbit continuously
  useEffect(() => {
    let raf = 0;
    const tick = () => {
      setOrbitAngle((a) => (a + 0.008) % (Math.PI * 2));
      raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, []);

  // Phase transitions
  useEffect(() => {
    const t1 = setTimeout(() => setPhase('transitioning'), 4500);
    const t2 = setTimeout(() => setPhase('heliocentric'), 7500);
    return () => {
      clearTimeout(t1);
      clearTimeout(t2);
    };
  }, []);

  return (
    <section
      id="hero"
      ref={ref}
      className="relative min-h-[180vh]"
    >
      {/* SINGLE sticky container — both hero content and question overlap with cross-fade */}
      <div className="sticky top-0 h-screen w-full overflow-hidden">
        <TopicHeroImage
          src="/images/sdam-astro/battani-academia.jpg"
          alt="Authentic manuscript page from al-Battānī's astronomical tables, the foundation of Copernicus's data"
          caption='Source: al-Battānī astronomical manuscript'
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

          {/* Orbit animation */}
          <div className="w-full max-w-2xl mt-[-2vh]">
            <OrbitSVG phase={phase} angle={orbitAngle} />
          </div>

          {/* Text below */}
          <div className="mt-4 text-center max-w-2xl">
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: phase === 'geocentric' ? 0 : 1 }}
              transition={{ duration: 1 }}
              className="text-cream/85 text-sm sm:text-base leading-relaxed"
            >
              This planetary model — the math that makes a heliocentric orbit
              work — was developed at the Maragheh observatory in Persia by
              <span className="text-gradient-gold font-semibold"> Naṣīr al-Dīn al-Ṭūsī </span>
              c. 1247 CE.
            </motion.p>

            {phase === 'heliocentric' && (
              <motion.p
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.2 }}
                className="text-cream-dim text-xs sm:text-sm mt-3"
              >
                <span className="text-gradient-gold font-semibold">296 years</span> before
                Copernicus published <em>De Revolutionibus</em> (1543). The
                diagram is identical. The math is identical. The authorship is not.
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

        {/* Question layer — cross-fades in as hero fades out */}
        <motion.div
          style={{ opacity: questionOpacity, scale: questionScale }}
          className="absolute inset-0 flex flex-col items-center justify-center px-6 text-center pointer-events-none"
        >
          <h1 className="font-display text-[10vw] sm:text-6xl md:text-7xl lg:text-8xl leading-[0.95] tracking-tight">
            <span className="block text-cream">{t('q1')}</span>
            <span className="block text-gradient-gold text-glow-gold italic">
              heliocentrism
            </span>
            <span className="block text-cream mt-2">in 1543.</span>
            <span className="block mt-4 text-cream-dim text-2xl sm:text-4xl md:text-5xl font-display italic">
              {t('orDid')}
            </span>
          </h1>
        </motion.div>
      </div>
    </section>
  );
}

function OrbitSVG({ phase, angle }: { phase: string; angle: number }) {
  const width = 600;
  const height = 360;
  const cx = width / 2;
  const cy = height / 2;

  // Geocentric: Earth at center, planet on epicycle
  const deferentR = 130;
  const epicycleR = 35;
  const planetX = cx + Math.cos(angle) * deferentR + Math.cos(angle * 3) * epicycleR;
  const planetY = cy + Math.sin(angle) * deferentR + Math.sin(angle * 3) * epicycleR;

  // Heliocentric: Sun at center, planet on clean ellipse
  const sunR = 130;
  const planetHeliX = cx + Math.cos(angle) * sunR;
  const planetHeliY = cy + Math.sin(angle) * sunR * 0.95;

  return (
    <svg viewBox={`0 0 ${width} ${height}`} className="w-full h-auto">
      <defs>
        <radialGradient id="sunGlow">
          <stop offset="0%" stopColor="#fff7d6" />
          <stop offset="50%" stopColor="#f4d062" stopOpacity="0.8" />
          <stop offset="100%" stopColor="#d4af37" stopOpacity="0" />
        </radialGradient>
        <radialGradient id="earthGlow">
          <stop offset="0%" stopColor="#5a8acc" />
          <stop offset="100%" stopColor="#1a3a5a" stopOpacity="0" />
        </radialGradient>
      </defs>

      {/* Orbit path (deferent) */}
      {phase !== 'heliocentric' && (
        <circle cx={cx} cy={cy} r={deferentR} fill="none" stroke="rgba(212, 175, 55, 0.2)" strokeWidth="1" strokeDasharray="3 4" />
      )}
      {phase === 'heliocentric' && (
        <ellipse cx={cx} cy={cy} rx={sunR} ry={sunR * 0.95} fill="none" stroke="rgba(212, 175, 55, 0.3)" strokeWidth="1.5" strokeDasharray="4 4" />
      )}

      {/* Center body — Earth (geocentric) or Sun (heliocentric) */}
      {phase !== 'heliocentric' ? (
        <>
          <circle cx={cx} cy={cy} r="20" fill="url(#earthGlow)" />
          <circle cx={cx} cy={cy} r="9" fill="#5a8acc" />
          <text x={cx} y={cy + 30} fill="#5a8acc" fontSize="9" textAnchor="middle" className="font-mono uppercase tracking-widest">Earth</text>
        </>
      ) : (
        <>
          <circle cx={cx} cy={cy} r="30" fill="url(#sunGlow)" />
          <circle cx={cx} cy={cy} r="14" fill="#fff7d6" />
          <text x={cx} y={cy + 38} fill="#f4d062" fontSize="9" textAnchor="middle" className="font-mono uppercase tracking-widest">Sun</text>
        </>
      )}

      {/* Epicycle (geocentric only) */}
      {phase === 'geocentric' && (
        <>
          <line
            x1={cx + Math.cos(angle) * deferentR}
            y1={cy + Math.sin(angle) * deferentR}
            x2={planetX}
            y2={planetY}
            stroke="rgba(244, 208, 98, 0.4)"
            strokeWidth="1"
          />
          <circle
            cx={cx + Math.cos(angle) * deferentR}
            cy={cy + Math.sin(angle) * deferentR}
            r={epicycleR}
            fill="none"
            stroke="rgba(244, 208, 98, 0.2)"
            strokeWidth="0.5"
            strokeDasharray="2 3"
          />
        </>
      )}

      {/* Trail (during transition) */}
      {phase === 'transitioning' && (
        <path
          d={`M ${planetX} ${planetY} Q ${cx} ${cy - 60} ${planetHeliX} ${planetHeliY}`}
          fill="none"
          stroke="rgba(244, 208, 98, 0.3)"
          strokeWidth="1"
          strokeDasharray="2 3"
        />
      )}

      {/* Planet */}
      {phase !== 'heliocentric' ? (
        <circle cx={planetX} cy={planetY} r="6" fill="#f4d062">
          <animate attributeName="r" values="6;7;6" dur="2s" repeatCount="indefinite" />
        </circle>
      ) : (
        <circle cx={planetHeliX} cy={planetHeliY} r="6" fill="#f4d062">
          <animate attributeName="r" values="6;7;6" dur="2s" repeatCount="indefinite" />
        </circle>
      )}

      {/* Labels */}
      <text x={width / 2} y={24} fill={phase === 'geocentric' ? '#a39c87' : '#f4d062'} fontSize="10" textAnchor="middle" className="font-mono uppercase tracking-widest">
        {phase === 'geocentric' && 'PTOLEMAIC · EARTH AT CENTER · AL-ṬŪSĪ REFINED THIS'}
        {phase === 'transitioning' && 'AL-ṬŪSĪ\'S REFORM · 1247 CE'}
        {phase === 'heliocentric' && 'HELIOCENTRIC · SUN AT CENTER · 296 YEARS BEFORE COPERNICUS'}
      </text>
    </svg>
  );
}
