'use client';

import { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { useTranslations } from 'next-intl';

const MILESTONES = [
  { year: 900, label: 'al-Battānī', note: 'Solar year precision', side: 'top', color: '#f4d062' },
  { year: 964, label: 'al-Sūfī', note: 'Andromeda Galaxy observed', side: 'bottom', color: '#f4d062' },
  { year: 1247, label: 'al-Ṭūsī', note: 'Tusi Couple', side: 'top', color: '#f4d062' },
  { year: 1350, label: 'Ibn al-Shāṭir', note: 'Lunar model (= Copernicus)', side: 'bottom', color: '#f4d062' },
  { year: 1424, label: 'Ulugh Beg', note: 'Samarkand Zīj star catalog', side: 'top', color: '#f4d062' },
  { year: 1543, label: 'Copernicus', note: 'De Revolutionibus (copied models)', side: 'bottom', color: '#d4af37' },
  { year: 1610, label: 'Galileo', note: 'Sidereus Nuncius (telescope)', side: 'top', color: '#a39c87' },
];

const START = 880;
const END = 1640;

export default function AstroPriorityTimeline() {
  const tSections = useTranslations('Sections');
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start end', 'end start'],
  });

  const lineScale = useTransform(scrollYProgress, [0.1, 0.6], [0, 1]);
  const gap1 = useTransform(scrollYProgress, [0.25, 0.45], [0, 1]);
  const gap2 = useTransform(scrollYProgress, [0.35, 0.55], [0, 1]);

  const positionFor = (year: number) => ((year - START) / (END - START)) * 100;

  return (
    <section
      id="timeline"
      ref={ref}
      className="relative min-h-screen flex flex-col items-center justify-center px-6 py-24"
    >
      <div className="max-w-6xl w-full">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "0px 0px 15% 0px" }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <p className="text-[10px] font-mono tracking-[0.4em] uppercase text-gold/70 mb-4">
            {tSections('PriorityTimeline.chapterTitle')}
          </p>
          <h2 className="font-display text-4xl sm:text-6xl md:text-7xl text-cream leading-tight">
            <span className="text-gradient-gold">800 years</span> before Messier.
            <br />
            <span className="text-gradient-gold">296 years</span> before Copernicus.
          </h2>
          <p className="mt-6 text-cream-dim max-w-2xl mx-auto text-sm sm:text-base">
            SDAM considers any priority margin over 200 years to be{' '}
            <span className="text-gold">definitive</span>. The astronomy case
            clears that threshold four times over — across 700 years of
            continuous Islamic astronomical research.
          </p>
        </motion.div>

        <div className="relative h-[480px] mb-12">
          <div className="absolute left-0 right-0 top-1/2 h-px bg-cream-dim/15" />
          <motion.div
            style={{ scaleX: lineScale, transformOrigin: 'left' }}
            className="absolute left-0 right-0 top-1/2 h-px gradient-gold"
          />

          {/* Gap 1: al-Sufi (964) → Messier (1764) - offscreen, but show the gap to Copernicus */}
          <motion.div style={{ opacity: gap1 }} className="absolute top-1/2 -translate-y-1/2 h-12 -mt-6">
            <div
              className="h-full border-y-2 border-gold/40"
              style={{
                background: 'repeating-linear-gradient(45deg, rgba(212,175,55,0.08), rgba(212,175,55,0.08) 6px, transparent 6px, transparent 12px)',
                left: `${positionFor(964)}%`,
                width: `${positionFor(1543) - positionFor(964)}%`,
                position: 'absolute',
              }}
            />
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "0px 0px 15% 0px" }}
              transition={{ delay: 0.6 }}
              className="absolute -top-9 left-1/2 -translate-x-1/2 text-center"
              style={{ left: `${(positionFor(964) + positionFor(1543)) / 2}%` }}
            >
              <p className="font-display text-2xl sm:text-3xl text-gradient-gold whitespace-nowrap">579 years</p>
              <p className="text-[10px] font-mono uppercase tracking-widest text-gold/70">observation → theory</p>
            </motion.div>
          </motion.div>

          {/* Gap 2: al-Tusi (1247) → Copernicus (1543) = 296 years */}
          <motion.div style={{ opacity: gap2 }} className="absolute top-1/2 -translate-y-1/2 h-12 -mt-6">
            <div
              className="h-full border-y-2 border-gold/40"
              style={{
                background: 'repeating-linear-gradient(45deg, rgba(212,175,55,0.06), rgba(212,175,55,0.06) 6px, transparent 6px, transparent 12px)',
                left: `${positionFor(1247)}%`,
                width: `${positionFor(1543) - positionFor(1247)}%`,
                position: 'absolute',
                top: '24px',
              }}
            />
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "0px 0px 15% 0px" }}
              transition={{ delay: 0.8 }}
              className="absolute -bottom-9 left-1/2 -translate-x-1/2 text-center"
              style={{ left: `${(positionFor(1247) + positionFor(1543)) / 2}%` }}
            >
              <p className="font-display text-2xl sm:text-3xl text-gradient-gold whitespace-nowrap">296 years</p>
              <p className="text-[10px] font-mono uppercase tracking-widest text-gold/70">Tusi Couple</p>
            </motion.div>
          </motion.div>

          {[900, 1000, 1100, 1200, 1300, 1400, 1500, 1600].map((y) => (
            <div key={y} className="absolute top-1/2 -translate-y-1/2" style={{ left: `${positionFor(y)}%` }}>
              <div className="w-px h-3 bg-cream-dim/30 -translate-x-1/2" />
              <p className="text-[10px] font-mono text-cream-dim/60 -translate-x-1/2 mt-1">{y}</p>
            </div>
          ))}

          {MILESTONES.map((m, i) => {
            const x = positionFor(m.year);
            const isTop = m.side === 'top';
            return (
              <motion.div
                key={m.year}
                initial={{ opacity: 0, y: isTop ? -20 : 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "0px 0px 15% 0px" }}
                transition={{ duration: 0.6, delay: 0.2 + i * 0.1 }}
                className="absolute"
                style={{
                  left: `${x}%`,
                  transform: 'translateX(-50%)',
                  top: isTop ? '4%' : 'auto',
                  bottom: isTop ? 'auto' : '4%',
                }}
              >
                <div className="flex flex-col items-center">
                  {isTop && (
                    <>
                      <div className="glass-card rounded-xl px-3 py-2 mb-2 min-w-[130px] text-center">
                        <p className="font-mono text-xs font-bold" style={{ color: m.color }}>{m.year} CE</p>
                        <p className="font-display text-sm text-cream leading-tight">{m.label}</p>
                        <p className="text-cream-dim text-[10px] leading-tight mt-0.5">{m.note}</p>
                      </div>
                      <div className="w-px h-12" style={{ background: `linear-gradient(to bottom, ${m.color}40, ${m.color})` }} />
                      <div className="w-3 h-3 rounded-full -mt-1.5 border-2" style={{ backgroundColor: m.color, borderColor: '#0a0a14', boxShadow: `0 0 12px ${m.color}80` }} />
                    </>
                  )}
                  {!isTop && (
                    <>
                      <div className="w-3 h-3 rounded-full -mb-1.5 border-2" style={{ backgroundColor: m.color, borderColor: '#0a0a14', boxShadow: `0 0 12px ${m.color}80` }} />
                      <div className="w-px h-12" style={{ background: `linear-gradient(to top, ${m.color}40, ${m.color})` }} />
                      <div className="glass-card rounded-xl px-3 py-2 mt-2 min-w-[130px] text-center">
                        <p className="font-mono text-xs font-bold" style={{ color: m.color }}>{m.year} CE</p>
                        <p className="font-display text-sm text-cream leading-tight">{m.label}</p>
                        <p className="text-cream-dim text-[10px] leading-tight mt-0.5">{m.note}</p>
                      </div>
                    </>
                  )}
                </div>
              </motion.div>
            );
          })}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "0px 0px 15% 0px" }}
          transition={{ duration: 0.7, delay: 0.5 }}
          className="grid sm:grid-cols-3 gap-4 max-w-3xl mx-auto"
        >
          <div className="glass-card rounded-xl p-4 text-center">
            <div className="w-3 h-3 rounded-full bg-gold-bright mx-auto mb-2 glow-gold" />
            <p className="font-display text-cream text-sm">Islamic Golden Age astronomy</p>
            <p className="text-cream-dim text-xs mt-1">al-Battānī, al-Sūfī, al-Ṭūsī, Ibn al-Shāṭir, Ulugh Beg — 700 years</p>
          </div>
          <div className="glass-card rounded-xl p-4 text-center">
            <div className="w-3 h-3 rounded-full bg-gold mx-auto mb-2" />
            <p className="font-display text-cream text-sm">European "rediscovery"</p>
            <p className="text-cream-dim text-xs mt-1">Copernicus copied the models; Galileo used the telescope</p>
          </div>
          <div className="glass-card rounded-xl p-4 text-center">
            <div className="w-3 h-3 rounded-full bg-cream-dim mx-auto mb-2" />
            <p className="font-display text-cream text-sm">The credit</p>
            <p className="text-cream-dim text-xs mt-1">Textbooks still name Copernicus as the inventor of heliocentrism</p>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
