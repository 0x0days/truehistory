'use client';

import { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { useTranslations } from 'next-intl';

const MILESTONES = [
  { year: 984, label: 'Ibn Sahl', note: 'Sine law of refraction', side: 'top', color: '#f4d062' },
  { year: 1011, label: 'Ibn al-Haytham', note: 'Kitāb al-Manāẓir begins', side: 'bottom', color: '#f4d062' },
  { year: 1300, label: 'Al-Fārisī', note: 'Correct rainbow theory', side: 'top', color: '#f4d062' },
  { year: 1621, label: 'Willebrord Snell', note: 'Re-derives sine law', side: 'bottom', color: '#d4af37' },
  { year: 1704, label: 'Isaac Newton', note: 'Opticks — prism + corpuscles', side: 'top', color: '#d4af37' },
  { year: 1826, label: 'Joseph Niépce', note: 'First photograph', side: 'bottom', color: '#a39c87' },
  { year: 1839, label: 'Louis Daguerre', note: 'Daguerreotype commercialized', side: 'top', color: '#a39c87' },
];

const START = 950;
const END = 1860;

export default function OpticsPriorityTimeline() {
  const tSections = useTranslations('Sections');
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start end', 'end start'],
  });

  const lineScale = useTransform(scrollYProgress, [0.1, 0.6], [0, 1]);
  const gap1Highlight = useTransform(scrollYProgress, [0.25, 0.45], [0, 1]); // Ibn Sahl → Snell
  const gap2Highlight = useTransform(scrollYProgress, [0.35, 0.55], [0, 1]); // Ibn al-Haytham → Newton

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
          viewport={{ once: true, margin: "0px 0px 50% 0px" }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <p className="text-[10px] font-mono tracking-[0.4em] uppercase text-gold/70 mb-4">
            {tSections('PriorityTimeline.chapterTitle')}
          </p>
          <h2 className="font-display text-4xl sm:text-6xl md:text-7xl text-cream leading-tight">
            <span className="text-gradient-gold">637 years</span>
            <br />
            before Snell. <span className="text-gradient-gold">683</span> before Newton.
          </h2>
          <p className="mt-6 text-cream-dim max-w-2xl mx-auto text-sm sm:text-base">
            SDAM considers any priority margin over 200 years to be{' '}
            <span className="text-gold">definitive</span>. The Islamic Golden
            Age optics tradition clears that threshold twice over.
          </p>
        </motion.div>

        <div className="relative h-[460px] mb-12">
          <div className="absolute left-0 right-0 top-1/2 h-px bg-cream-dim/15" />
          <motion.div
            style={{ scaleX: lineScale, transformOrigin: 'left' }}
            className="absolute left-0 right-0 top-1/2 h-px gradient-gold"
          />

          {/* Gap 1: Ibn Sahl (984) → Snell (1621) = 637 years */}
          <motion.div
            style={{ opacity: gap1Highlight }}
            className="absolute top-1/2 -translate-y-1/2 h-12 -mt-6"
          >
            <div
              className="h-full border-y-2 border-gold/40"
              style={{
                background:
                  'repeating-linear-gradient(45deg, rgba(212,175,55,0.08), rgba(212,175,55,0.08) 6px, transparent 6px, transparent 12px)',
                left: `${positionFor(984)}%`,
                width: `${positionFor(1621) - positionFor(984)}%`,
                position: 'absolute',
              }}
            />
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "0px 0px 50% 0px" }}
              transition={{ delay: 0.6, duration: 0.7 }}
              className="absolute -top-9 left-1/2 -translate-x-1/2 text-center"
              style={{ left: `${(positionFor(984) + positionFor(1621)) / 2}%` }}
            >
              <p className="font-display text-2xl sm:text-3xl text-gradient-gold whitespace-nowrap">
                637 years
              </p>
              <p className="text-[10px] font-mono uppercase tracking-widest text-gold/70">
                sine law
              </p>
            </motion.div>
          </motion.div>

          {/* Gap 2: Ibn al-Haytham (1011) → Newton (1704) = 683 years */}
          <motion.div
            style={{ opacity: gap2Highlight }}
            className="absolute top-1/2 -translate-y-1/2 h-12 -mt-6"
          >
            <div
              className="h-full border-y-2 border-gold/40"
              style={{
                background:
                  'repeating-linear-gradient(45deg, rgba(212,175,55,0.06), rgba(212,175,55,0.06) 6px, transparent 6px, transparent 12px)',
                left: `${positionFor(1011)}%`,
                width: `${positionFor(1704) - positionFor(1011)}%`,
                position: 'absolute',
                top: '20px',
              }}
            />
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "0px 0px 50% 0px" }}
              transition={{ delay: 0.8, duration: 0.7 }}
              className="absolute -bottom-9 left-1/2 -translate-x-1/2 text-center"
              style={{ left: `${(positionFor(1011) + positionFor(1704)) / 2}%` }}
            >
              <p className="font-display text-2xl sm:text-3xl text-gradient-gold whitespace-nowrap">
                683 years
              </p>
              <p className="text-[10px] font-mono uppercase tracking-widest text-gold/70">
                optics
              </p>
            </motion.div>
          </motion.div>

          {/* Year ticks */}
          {[1000, 1200, 1400, 1600, 1800].map((y) => (
            <div
              key={y}
              className="absolute top-1/2 -translate-y-1/2"
              style={{ left: `${positionFor(y)}%` }}
            >
              <div className="w-px h-3 bg-cream-dim/30 -translate-x-1/2" />
              <p className="text-[10px] font-mono text-cream-dim/60 -translate-x-1/2 mt-1">
                {y}
              </p>
            </div>
          ))}

          {/* Milestones */}
          {MILESTONES.map((m, i) => {
            const x = positionFor(m.year);
            const isTop = m.side === 'top';
            return (
              <motion.div
                key={m.year}
                initial={{ opacity: 0, y: isTop ? -20 : 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "0px 0px 50% 0px" }}
                transition={{ duration: 0.6, delay: 0.2 + i * 0.1 }}
                className="absolute"
                style={{
                  left: `${x}%`,
                  transform: 'translateX(-50%)',
                  top: isTop ? '6%' : 'auto',
                  bottom: isTop ? 'auto' : '6%',
                }}
              >
                <div className="flex flex-col items-center">
                  {isTop && (
                    <>
                      <div className="glass-card rounded-xl px-3 py-2 mb-2 min-w-[120px] text-center">
                        <p
                          className="font-mono text-xs font-bold"
                          style={{ color: m.color }}
                        >
                          {m.year} CE
                        </p>
                        <p className="font-display text-sm text-cream leading-tight">
                          {m.label}
                        </p>
                        <p className="text-cream-dim text-[10px] leading-tight mt-0.5">
                          {m.note}
                        </p>
                      </div>
                      <div
                        className="w-px h-12"
                        style={{
                          background: `linear-gradient(to bottom, ${m.color}40, ${m.color})`,
                        }}
                      />
                      <div
                        className="w-3 h-3 rounded-full -mt-1.5 border-2"
                        style={{
                          backgroundColor: m.color,
                          borderColor: '#0a0a14',
                          boxShadow: `0 0 12px ${m.color}80`,
                        }}
                      />
                    </>
                  )}
                  {!isTop && (
                    <>
                      <div
                        className="w-3 h-3 rounded-full -mb-1.5 border-2"
                        style={{
                          backgroundColor: m.color,
                          borderColor: '#0a0a14',
                          boxShadow: `0 0 12px ${m.color}80`,
                        }}
                      />
                      <div
                        className="w-px h-12"
                        style={{
                          background: `linear-gradient(to top, ${m.color}40, ${m.color})`,
                        }}
                      />
                      <div className="glass-card rounded-xl px-3 py-2 mt-2 min-w-[120px] text-center">
                        <p
                          className="font-mono text-xs font-bold"
                          style={{ color: m.color }}
                        >
                          {m.year} CE
                        </p>
                        <p className="font-display text-sm text-cream leading-tight">
                          {m.label}
                        </p>
                        <p className="text-cream-dim text-[10px] leading-tight mt-0.5">
                          {m.note}
                        </p>
                      </div>
                    </>
                  )}
                </div>
              </motion.div>
            );
          })}
        </div>

        {/* Legend */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "0px 0px 50% 0px" }}
          transition={{ duration: 0.7, delay: 0.5 }}
          className="grid sm:grid-cols-3 gap-4 max-w-3xl mx-auto"
        >
          <div className="glass-card rounded-xl p-4 text-center">
            <div className="w-3 h-3 rounded-full bg-gold-bright mx-auto mb-2 glow-gold" />
            <p className="font-display text-cream text-sm">Islamic Golden Age</p>
            <p className="text-cream-dim text-xs mt-1">
              Ibn Sahl, Ibn al-Haytham, al-Fārisī — the actual discoverers
            </p>
          </div>
          <div className="glass-card rounded-xl p-4 text-center">
            <div className="w-3 h-3 rounded-full bg-gold mx-auto mb-2" />
            <p className="font-display text-cream text-sm">European rediscovery</p>
            <p className="text-cream-dim text-xs mt-1">
              Snell and Newton re-derive what was already in Arabic
            </p>
          </div>
          <div className="glass-card rounded-xl p-4 text-center">
            <div className="w-3 h-3 rounded-full bg-cream-dim mx-auto mb-2" />
            <p className="font-display text-cream text-sm">Photography</p>
            <p className="text-cream-dim text-xs mt-1">
              Built on Ibn al-Haytham&apos;s camera obscura — 815 years later
            </p>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
