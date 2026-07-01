'use client';

import { useEffect, useRef, useState } from 'react';
import { motion, useScroll, useTransform, useSpring } from 'framer-motion';
import TopicHeroImage from '@/components/psych/TopicHeroImage';
import { useTranslations } from 'next-intl';

/**
 * Hero section for the OPTICS investigation.
 * "Newton discovered the laws of optics. Daguerre invented photography. Or did they?"
 *
 * Visual: a camera obscura animation — light rays pass through a pinhole and
 * project an inverted image of the world onto the back wall. As the user
 * scrolls, the pinhole widens and the projected image sharpens — symbolizing
 * the moment Ibn al-Haytham PROVED (not guessed) how light travels.
 */
export default function OpticsHeroSection() {
  const t = useTranslations('Hero.optics');

  const ref = useRef<HTMLDivElement>(null);
  const [rayPhase, setRayPhase] = useState(0);

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start start', 'end start'],
  });

  const pinholeWidth = useTransform(scrollYProgress, [0, 0.6], [2, 28]);
  const pinholeWidthSpring = useSpring(pinholeWidth, { stiffness: 80, damping: 18 });
  const projectionOpacity = useTransform(scrollYProgress, [0.1, 0.6], [0, 1]);
  const questionOpacity = useTransform(scrollYProgress, [0.4, 0.6], [0, 1]);
  const questionScale = useTransform(scrollYProgress, [0.4, 0.6], [0.94, 1]);
  const hintOpacity = useTransform(scrollYProgress, [0, 0.15, 0.35], [1, 1, 0]);

  // Animate the rays continuously
  useEffect(() => {
    let raf = 0;
    const tick = () => {
      setRayPhase((p) => (p + 0.012) % 1);
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
      <div className="sticky top-0 h-screen w-full flex flex-col items-center justify-center px-6">
        <TopicHeroImage
          src="/images/sdam-optics/alhazen-latin-1.jpg"
          alt="Authentic Latin manuscript page of Alhazen's Perspectiva (Ibn al-Haytham's Kitāb al-Manāẓir), the foundational text of optics"
          caption="Source: Latin translation of Ibn al-Haytham's Optics"
          treatment="manuscript"
        />

        {/* Pre-title eyebrow */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.3 }}
          className="absolute top-[12vh] flex items-center gap-3 text-[10px] sm:text-xs font-mono tracking-[0.3em] uppercase text-gold/70"
        >
          <span className="h-px w-8 bg-gold/40" />
          A SDAM Investigation · Vol. II
          <span className="h-px w-8 bg-gold/40" />
        </motion.div>

        {/* Camera Obscura Animation */}
        <div className="relative w-full max-w-3xl mt-[-4vh] aspect-[16/9]">
          <CameraObscuraSVG
            pinholeWidth={pinholeWidthSpring}
            projectionOpacity={projectionOpacity}
            rayPhase={rayPhase}
          />
        </div>

        {/* The Question */}
        <motion.div
          style={{ opacity: questionOpacity, scale: questionScale }}
          className="absolute inset-0 flex flex-col items-center justify-center px-6 text-center"
        >
          <h1 className="font-display text-[10vw] sm:text-6xl md:text-7xl lg:text-8xl leading-[0.95] tracking-tight">
            <span className="block text-cream">{t('q1')}</span>
            <span className="block text-gradient-gold text-glow-gold italic">
              {t('q2')}
            </span>
            <span className="block text-cream mt-2">{t('q3')}</span>
            <span className="block text-gradient-gold text-glow-gold italic">
              {t('q4')}
            </span>
            <span className="block mt-4 text-cream-dim text-2xl sm:text-4xl md:text-5xl font-display italic">
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

function CameraObscuraSVG({
  pinholeWidth,
  projectionOpacity,
  rayPhase,
}: {
  pinholeWidth: any;
  projectionOpacity: any;
  rayPhase: number;
}) {
  return (
    <svg
      viewBox="0 0 800 450"
      className="w-full h-full"
      xmlns="http://www.w3.org/2000/svg"
    >
      <defs>
        <linearGradient id="rayGrad" x1="0%" y1="0%" x2="100%" y2="0%">
          <stop offset="0%" stopColor="#f4d062" stopOpacity="0.9" />
          <stop offset="100%" stopColor="#d4af37" stopOpacity="0.6" />
        </linearGradient>
        <linearGradient id="rayGrad2" x1="0%" y1="0%" x2="100%" y2="0%">
          <stop offset="0%" stopColor="#f4d062" stopOpacity="0.7" />
          <stop offset="100%" stopColor="#d4af37" stopOpacity="0.4" />
        </linearGradient>
        <radialGradient id="sunGlow">
          <stop offset="0%" stopColor="#fff7d6" stopOpacity="1" />
          <stop offset="60%" stopColor="#f4d062" stopOpacity="0.7" />
          <stop offset="100%" stopColor="#d4af37" stopOpacity="0" />
        </radialGradient>
      </defs>

      {/* Dark room outline (camera obscura chamber) */}
      <rect
        x="40"
        y="80"
        width="720"
        height="320"
        rx="6"
        fill="rgba(18, 18, 31, 0.6)"
        stroke="rgba(212, 175, 55, 0.4)"
        strokeWidth="1.5"
      />

      {/* Sun (light source) on left side outside the box */}
      <circle cx="80" cy="60" r="28" fill="url(#sunGlow)" />
      <circle cx="80" cy="60" r="14" fill="#fff7d6" />
      <text x="80" y="115" textAnchor="middle" className="font-mono" fill="#a39c87" fontSize="9">
        LIGHT SOURCE
      </text>

      {/* An object outside — a tree / arrow (so we can show inversion) */}
      <g transform="translate(120, 180)">
        {/* Arrow pointing up — outside the chamber */}
        <line x1="0" y1="80" x2="0" y2="10" stroke="#f4d062" strokeWidth="3" />
        <polygon points="-6,15 0,0 6,15" fill="#f4d062" />
        <text x="0" y="100" textAnchor="middle" className="font-mono" fill="#a39c87" fontSize="9">
          OBJECT
        </text>
      </g>

      {/* Light rays from top of arrow through pinhole to bottom of back wall */}
      {/* Ray 1: from arrow tip (120, 190) to pinhole (400, 240) then to projection (700, 290) */}
      <motion.line
        x1="120"
        y1="190"
        x2="400"
        y2="240"
        stroke="url(#rayGrad)"
        strokeWidth="1.5"
        initial={{ pathLength: 0 }}
        animate={{ pathLength: 1 }}
        transition={{ duration: 1.5, repeat: Infinity, repeatType: 'reverse', delay: rayPhase * 0 }}
      />
      <motion.line
        x1="400"
        y1="240"
        x2="700"
        y2="290"
        stroke="url(#rayGrad2)"
        strokeWidth="1.5"
        initial={{ pathLength: 0 }}
        animate={{ pathLength: 1 }}
        transition={{ duration: 1.5, repeat: Infinity, repeatType: 'reverse', delay: 0.3 }}
      />

      {/* Ray 2: from arrow base (120, 250) to pinhole (400, 240) then to projection (700, 190) */}
      <motion.line
        x1="120"
        y1="250"
        x2="400"
        y2="240"
        stroke="url(#rayGrad)"
        strokeWidth="1.5"
        initial={{ pathLength: 0 }}
        animate={{ pathLength: 1 }}
        transition={{ duration: 1.5, repeat: Infinity, repeatType: 'reverse', delay: 0.15 }}
      />
      <motion.line
        x1="400"
        y1="240"
        x2="700"
        y2="190"
        stroke="url(#rayGrad2)"
        strokeWidth="1.5"
        initial={{ pathLength: 0 }}
        animate={{ pathLength: 1 }}
        transition={{ duration: 1.5, repeat: Infinity, repeatType: 'reverse', delay: 0.45 }}
      />

      {/* The pinhole (animated width) */}
      <motion.rect
        x="395"
        y="230"
        width="10"
        height="20"
        rx="2"
        fill="#0a0a14"
        style={{ width: pinholeWidth }}
        transform="translate(-5 0)"
      />
      <line
        x1="400"
        y1="220"
        x2="400"
        y2="270"
        stroke="rgba(212, 175, 55, 0.8)"
        strokeWidth="2"
      />
      <text x="400" y="300" textAnchor="middle" className="font-mono" fill="#d4af37" fontSize="9">
        PINHOLE
      </text>

      {/* Projection on back wall — inverted arrow */}
      <motion.g
        style={{ opacity: projectionOpacity }}
        transform="translate(680, 200)"
      >
        {/* Inverted arrow (pointing down) */}
        <line x1="0" y1="0" x2="0" y2="80" stroke="#d4af37" strokeWidth="2" opacity="0.8" />
        <polygon points="-5,5 0,20 5,5" fill="#d4af37" opacity="0.8" transform="rotate(180 0 10)" />
        <text x="20" y="40" className="font-mono" fill="#d4af37" fontSize="9">
          INVERTED
        </text>
        <text x="20" y="52" className="font-mono" fill="#d4af37" fontSize="9">
          IMAGE
        </text>
      </motion.g>

      {/* Back wall projection screen label */}
      <text x="730" y="100" textAnchor="middle" className="font-mono" fill="#a39c87" fontSize="9">
        PROJECTION
      </text>
      <text x="730" y="112" textAnchor="middle" className="font-mono" fill="#a39c87" fontSize="9">
        WALL
      </text>

      {/* Caption */}
      <text x="400" y="430" textAnchor="middle" className="font-mono" fill="#a39c87" fontSize="10" letterSpacing="2">
        CAMERA OBSCURA · IBN AL-HAYTHAM · 1011 CE
      </text>
    </svg>
  );
}
