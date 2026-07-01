'use client';

import { motion } from 'framer-motion';
import { Sigma, Orbit, Moon } from 'lucide-react';
import { useTranslations } from 'next-intl';

const THEOREMS = [
  {
    id: 'tusi-couple',
    icon: Orbit,
    title: 'The Tusi Couple (Linear from Circular Motion)',
    attribution: 'Naṣīr al-Dīn al-Ṭūsī, Tadhkira fī ʿIlm al-Hayʾa (c. 1247 CE)',
    statement: 'A point on a circle of radius r rolling inside a circle of radius 2r traces a straight-line diameter of the larger circle.',
    setup: [
      { type: 'text', value: 'Let the smaller circle have radius ' },
      { type: 'var', value: 'r' },
      { type: 'text', value: ', the larger radius ' },
      { type: 'var', value: '2r' },
      { type: 'text', value: '. A point ' },
      { type: 'var', value: 'P' },
      { type: 'text', value: ' on the smaller circle traces:' },
    ],
    equation: 'P(t) = (2r cos t, 0)     (straight line — diameter)',
    note: 'This device eliminates the Ptolemaic equant by generating linear motion from two circular motions. Copernicus used it for the same purpose in De Revolutionibus (1543). The diagrams in Copernicus\'s manuscript are geometrically identical to al-Ṭūsī\'s. The priority margin is 296 years. The mathematical identity is documented by Kennedy (1966), Saliba (2007), and Roberts (1957).',
    outcome: 'Eliminated the equant. Used by Copernicus 296 years later. Documented plagiarism chain.',
  },
  {
    id: 'shatir-lunar',
    icon: Moon,
    title: 'The Lunar Model of Ibn al-Shāṭir',
    attribution: 'Ibn al-Shāṭir, Damascus (c. 1350 CE)',
    statement: 'The Moon\'s motion can be modeled by two epicycles that eliminate Ptolemy\'s erroneous "trepidation" — using only uniform circular motions.',
    setup: [
      { type: 'text', value: 'Let the Moon\'s position be given by two nested epicycles with radii ' },
      { type: 'var', value: 'r₁, r₂' },
      { type: 'text', value: ' rotating uniformly. The position is:' },
    ],
    equation: 'θ_moon(t) = ω₁t + ω₂t + arctan(r₂ sin(ω₂t) / (r₁ + r₂ cos(ω₂t)))',
    note: 'Ibn al-Shāṭir\'s lunar model (Damascus, c. 1350) is mathematically identical to the one Copernicus published in De Revolutionibus (1543) — 193 years later. The similarity is too great to be coincidence: the parameter values, the geometric construction, and the elimination of Ptolemy\'s trepidation are all the same. Victor Roberts (1957) and George Saliba (2007) demonstrated the identity. Copernicus did not cite Ibn al-Shāṭir.',
    outcome: 'Identical to Copernicus\'s lunar model. 193 years before De Revolutionibus. Documented by Roberts (1957).',
  },
  {
    id: 'battani-year',
    icon: Sigma,
    title: 'The Precise Solar Year',
    attribution: 'al-Battānī, Zīj al-Ṣābiʾ (c. 900 CE)',
    statement: 'The tropical solar year is 365.24219858156 days — precise to within 2 minutes of the modern value.',
    setup: [
      { type: 'text', value: 'By measuring the solstices and equinoxes over 40+ years, al-Battānī derived the year length:' },
    ],
    equation: '1 tropical year  =  365.24219858156 days    (modern: 365.24219)',
    note: 'Al-Battānī\'s value (c. 900 CE) is accurate to within 2 minutes of the modern value — and was MORE accurate than the Julian calendar then in use in Europe. His observations were transmitted to Latin Europe and used directly by Copernicus (who cites "Albatenius" 23 times in De Revolutionibus), Tycho Brahe, and Kepler. The precision of Kepler\'s laws rests on al-Battānī\'s data, transmitted through 700 years.',
    outcome: 'Used by Copernicus (23 citations), Brahe, Kepler. 700-year transmission chain documented.',
  },
];

export default function AstroMathematicalProofSection() {
  const tSections = useTranslations('Sections');
  return (
    <section
      id="math"
      className="relative min-h-screen flex flex-col items-center justify-center px-6 py-24 overflow-hidden"
    >
      <div
        className="absolute inset-0 opacity-[0.025] pointer-events-none"
        style={{
          backgroundImage:
            'linear-gradient(rgba(212,175,55,1) 1px, transparent 1px), linear-gradient(90deg, rgba(212,175,55,1) 1px, transparent 1px)',
          backgroundSize: '60px 60px',
        }}
      />

      <div className="max-w-5xl w-full relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "0px 0px 15% 0px" }}
          transition={{ duration: 0.8 }}
          className="text-center mb-14"
        >
          <p className="text-[10px] font-mono tracking-[0.4em] uppercase text-gold/70 mb-4 flex items-center justify-center gap-2">
            <Sigma className="w-3 h-3" />
            {tSections('MathematicalProof.chapterTitle')}
          </p>
          <h2 className="font-display text-4xl sm:text-6xl md:text-7xl text-cream leading-tight">
            Three theorems.
            <br />
            <span className="text-gradient-gold italic">All copied by Copernicus.</span>
          </h2>
          <p className="mt-6 text-cream-dim max-w-2xl mx-auto text-sm sm:text-base leading-relaxed">
            The mathematical identity between the Maragheh/Damascus planetary
            models and Copernicus&apos;s De Revolutionibus is not a coincidence.
            It is documented plagiarism — the same devices, the same parameter
            values, the same geometric constructions, published 193–296 years
            later without citation.
          </p>
        </motion.div>

        <div className="space-y-6">
          {THEOREMS.map((th, i) => {
            const Icon = th.icon;
            return (
              <motion.div
                key={th.id}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "0px 0px 15% 0px" }}
                transition={{ duration: 0.7, delay: i * 0.1 }}
                className="glass-card-gold rounded-2xl overflow-hidden"
              >
                <div className="flex items-center gap-4 p-5 sm:p-6 border-b border-gold/15">
                  <div className="w-12 h-12 rounded-full bg-gold/10 border border-gold/30 flex items-center justify-center flex-shrink-0">
                    <Icon className="w-6 h-6 text-gold" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-[10px] font-mono uppercase tracking-widest text-gold/70 mb-1">
                      Theorem {String.fromCharCode(8544 + i)} · {th.attribution}
                    </p>
                    <h3 className="font-display text-xl sm:text-2xl text-cream leading-tight">
                      {th.title}
                    </h3>
                  </div>
                </div>

                <div className="p-5 sm:p-7 space-y-5">
                  <div>
                    <p className="text-[10px] font-mono uppercase tracking-widest text-cream-dim mb-2">
                      Statement
                    </p>
                    <p className="text-cream text-base sm:text-lg leading-relaxed italic font-display">
                      &ldquo;{th.statement}&rdquo;
                    </p>
                  </div>

                  <div>
                    <p className="text-[10px] font-mono uppercase tracking-widest text-cream-dim mb-2">
                      Setup
                    </p>
                    <p className="text-cream/85 text-sm sm:text-base leading-relaxed">
                      {th.setup.map((part, j) => {
                        if (part.type === 'var') {
                          return (
                            <span
                              key={j}
                              className="font-mono text-gold font-semibold px-1"
                            >
                              {part.value}
                            </span>
                          );
                        }
                        return <span key={j}>{part.value}</span>;
                      })}
                    </p>
                  </div>

                  <div className="relative">
                    <p className="text-[10px] font-mono uppercase tracking-widest text-cream-dim mb-2">
                      Theorem
                    </p>
                    <div className="relative bg-cosmos-deep/60 border border-gold/25 rounded-xl py-6 px-4 sm:px-8 text-center overflow-hidden">
                      <span className="absolute top-1 left-1 w-3 h-3 border-t border-l border-gold/50" />
                      <span className="absolute top-1 right-1 w-3 h-3 border-t border-r border-gold/50" />
                      <span className="absolute bottom-1 left-1 w-3 h-3 border-b border-l border-gold/50" />
                      <span className="absolute bottom-1 right-1 w-3 h-3 border-b border-r border-gold/50" />
                      <p className="font-mono text-sm sm:text-base md:text-lg text-gold-bright tracking-wide break-words">
                        {th.equation}
                      </p>
                    </div>
                  </div>

                  <div className="grid sm:grid-cols-2 gap-4 pt-2">
                    <div className="border-l-2 border-gold/30 pl-3">
                      <p className="text-[10px] font-mono uppercase tracking-widest text-gold/70 mb-1">
                        Why it matters
                      </p>
                      <p className="text-cream-dim text-xs sm:text-sm leading-relaxed">
                        {th.note}
                      </p>
                    </div>
                    <div className="border-l-2 border-gold/60 pl-3">
                      <p className="text-[10px] font-mono uppercase tracking-widest text-gold mb-1">
                        Result
                      </p>
                      <p className="text-cream text-xs sm:text-sm leading-relaxed font-medium">
                        {th.outcome}
                      </p>
                    </div>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "0px 0px 15% 0px" }}
          transition={{ duration: 0.7, delay: 0.4 }}
          className="mt-12 text-center max-w-3xl mx-auto"
        >
          <p className="text-cream/90 text-sm sm:text-base leading-relaxed">
            Copernicus was a brilliant mathematician. He unified the Maragheh
            and Damascus models into a heliocentric framework — a genuine
            conceptual breakthrough. But the planetary devices he used — the
            Tusi Couple, Ibn al-Shāṭir&apos;s lunar model, al-Battānī&apos;s
            solar year — were not his inventions. They were in manuscripts that
            reached Italy via the fall of Constantinople in 1453. Copernicus
            read them. He did not cite them. SDAM treats these manuscripts as{' '}
            <span className="text-gold">Tier-1 primary evidence</span>.
          </p>
        </motion.div>
      </div>
    </section>
  );
}
