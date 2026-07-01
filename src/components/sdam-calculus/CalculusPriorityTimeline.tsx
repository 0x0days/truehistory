'use client';

import { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { useTranslations } from 'next-intl';

const MILESTONES = [
  { year: 1000, label: 'Ibn al-Haytham', note: 'Integration (sum of 4th powers)', side: 'top', color: '#f4d062' },
  { year: 1170, label: 'Sharaf al-Ṭūsī', note: 'Differentiation (max of cubic)', side: 'bottom', color: '#f4d062' },
  { year: 1400, label: 'Mādhava', note: 'Infinite series (sin, π)', side: 'top', color: '#f4d062' },
  { year: 1666, label: 'Newton (fluxions)', note: 'Unifies + Fundamental Theorem', side: 'bottom', color: '#d4af37' },
  { year: 1684, label: 'Leibniz', note: 'Nova Methodus + notation', side: 'top', color: '#d4af37' },
  { year: 1715, label: 'Brook Taylor', note: 'Taylor series (= Mādhava)', side: 'bottom', color: '#a39c87' },
];

const START = 980;
const END = 1740;

export default function CalculusPriorityTimeline() {
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
          viewport={{ once: true, margin: "0px 0px 50% 0px" }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <p className="text-[10px] font-mono tracking-[0.4em] uppercase text-gold/70 mb-4">
            {tSections('PriorityTimeline.chapterTitle')}
          </p>
          <h2 className="font-display text-4xl sm:text-6xl md:text-7xl text-cream leading-tight">
            <span className="text-gradient-gold">666 years</span> before Newton.
            <br />
            <span className="text-gradient-gold">280 years</span> before Leibniz&apos;s series.
          </h2>
          <p className="mt-6 text-cream-dim max-w-2xl mx-auto text-sm sm:text-base">
            SDAM considers any priority margin over 200 years to be{' '}
            <span className="text-gold">definitive</span>. The calculus case
            clears that threshold three times over — in three different
            traditions.
          </p>
        </motion.div>

        <div className="relative h-[460px] mb-12">
          <div className="absolute left-0 right-0 top-1/2 h-px bg-cream-dim/15" />
          <motion.div
            style={{ scaleX: lineScale, transformOrigin: 'left' }}
            className="absolute left-0 right-0 top-1/2 h-px gradient-gold"
          />

          {/* Gap 1: Ibn al-Haytham (1000) → Newton (1666) = 666 years */}
          <motion.div style={{ opacity: gap1 }} className="absolute top-1/2 -translate-y-1/2 h-12 -mt-6">
            <div
              className="h-full border-y-2 border-gold/40"
              style={{
                background: 'repeating-linear-gradient(45deg, rgba(212,175,55,0.08), rgba(212,175,55,0.08) 6px, transparent 6px, transparent 12px)',
                left: `${positionFor(1000)}%`,
                width: `${positionFor(1666) - positionFor(1000)}%`,
                position: 'absolute',
              }}
            />
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "0px 0px 50% 0px" }}
              transition={{ delay: 0.6 }}
              className="absolute -top-9 left-1/2 -translate-x-1/2 text-center"
              style={{ left: `${(positionFor(1000) + positionFor(1666)) / 2}%` }}
            >
              <p className="font-display text-2xl sm:text-3xl text-gradient-gold whitespace-nowrap">666 years</p>
              <p className="text-[10px] font-mono uppercase tracking-widest text-gold/70">integration</p>
            </motion.div>
          </motion.div>

          {/* Gap 2: Madhava (1400) → Taylor (1715) = 315 years */}
          <motion.div style={{ opacity: gap2 }} className="absolute top-1/2 -translate-y-1/2 h-12 -mt-6">
            <div
              className="h-full border-y-2 border-gold/40"
              style={{
                background: 'repeating-linear-gradient(45deg, rgba(212,175,55,0.06), rgba(212,175,55,0.06) 6px, transparent 6px, transparent 12px)',
                left: `${positionFor(1400)}%`,
                width: `${positionFor(1715) - positionFor(1400)}%`,
                position: 'absolute',
                top: '24px',
              }}
            />
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "0px 0px 50% 0px" }}
              transition={{ delay: 0.8 }}
              className="absolute -bottom-9 left-1/2 -translate-x-1/2 text-center"
              style={{ left: `${(positionFor(1400) + positionFor(1715)) / 2}%` }}
            >
              <p className="font-display text-2xl sm:text-3xl text-gradient-gold whitespace-nowrap">315 years</p>
              <p className="text-[10px] font-mono uppercase tracking-widest text-gold/70">series</p>
            </motion.div>
          </motion.div>

          {[1000, 1200, 1400, 1600, 1700].map((y) => (
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
                      <div className="glass-card rounded-xl px-3 py-2 mb-2 min-w-[140px] text-center">
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
                      <div className="glass-card rounded-xl px-3 py-2 mt-2 min-w-[140px] text-center">
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
          viewport={{ once: true, margin: "0px 0px 50% 0px" }}
          transition={{ duration: 0.7, delay: 0.5 }}
          className="grid sm:grid-cols-3 gap-4 max-w-3xl mx-auto"
        >
          <div className="glass-card rounded-xl p-4 text-center">
            <div className="w-3 h-3 rounded-full bg-gold-bright mx-auto mb-2 glow-gold" />
            <p className="font-display text-cream text-sm">Three pre-Newtonian traditions</p>
            <p className="text-cream-dim text-xs mt-1">Arabic (integration + differentiation) + Indian (infinite series)</p>
          </div>
          <div className="glass-card rounded-xl p-4 text-center">
            <div className="w-3 h-3 rounded-full bg-gold mx-auto mb-2" />
            <p className="font-display text-cream text-sm">European unification</p>
            <p className="text-cream-dim text-xs mt-1">Newton + Leibniz connect differentiation and integration</p>
          </div>
          <div className="glass-card rounded-xl p-4 text-center">
            <div className="w-3 h-3 rounded-full bg-cream-dim mx-auto mb-2" />
            <p className="font-display text-cream text-sm">European rediscovery</p>
            <p className="text-cream-dim text-xs mt-1">Taylor restates Mādhava\'s series 315 years later</p>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
