'use client';

import { motion } from 'framer-motion';
import { Sigma, FunctionSquare, Ruler, FlaskConical } from 'lucide-react';
import { useTranslations } from 'next-intl';

const THEOREMS = [
  {
    id: 'hydrostatic',
    icon: FlaskConical,
    title: 'The Hydrostatic Theorem',
    attribution: 'Al-Khāzini, Mīzān al-ḥikma (1121 CE)',
    statement: 'The specific gravity of a body is the ratio of its weight in air to the loss of weight it suffers when immersed in water.',
    formula: [
      { type: 'text', value: 'Let ' },
      { type: 'var', value: 'W_air' },
      { type: 'text', value: ' = weight in air, ' },
      { type: 'var', value: 'W_water' },
      { type: 'text', value: ' = apparent weight in water. Then the specific gravity is:' },
    ],
    equation: 'ρ_body  =  W_air / (W_air − W_water)  ×  ρ_water',
    note: 'This is the operational form of Archimedes\' principle — al-Khāzini applied it quantitatively, measuring specific gravities of dozens of substances with accuracy unmatched in Europe for four centuries.',
    outcome: 'Measured γ_gold = 19.05, γ_silver = 10.50, γ_iron = 7.74 — all within 0.5% of modern values.',
  },
  {
    id: 'variation',
    icon: FunctionSquare,
    title: 'Theorem on Variable Weight',
    attribution: 'Al-Khāzini, Mīzān al-ḥikma (1121 CE)',
    statement: 'The weight of a body is not a fixed property. It is a function of the body\'s distance from the center of the Earth.',
    formula: [
      { type: 'text', value: 'Let ' },
      { type: 'var', value: 'W' },
      { type: 'text', value: ' denote weight and ' },
      { type: 'var', value: 'r' },
      { type: 'text', value: ' denote distance from the Earth\'s center. Then:' },
    ],
    equation: 'W  =  f ( r )      with      dW / dr  <  0',
    note: 'Al-Khāzini did not yet write the inverse-square law. What he proved — using hydrostatic balances — is the weaker but revolutionary claim that weight varies monotonically with r. This broke the Aristotelian dogma of absolute weight.',
    outcome: 'The conceptual barrier between Aristotelian "natural place" and Newtonian universal gravitation — broken in 1121.',
  },
  {
    id: 'radius',
    icon: Ruler,
    title: 'The Earth-Radius Determination',
    attribution: 'Al-Bīrūnī, c. 1019 CE (India, Punjab plain)',
    statement: 'From the height of a mountain of known height h and the dip angle θ to the true horizon, the radius R of the Earth follows.',
    formula: [
      { type: 'text', value: 'Let ' },
      { type: 'var', value: 'h' },
      { type: 'text', value: ' = mountain height, ' },
      { type: 'var', value: 'θ' },
      { type: 'text', value: ' = dip angle to horizon. By right-triangle trigonometry:' },
    ],
    equation: 'cos θ  =  R / (R + h)        ⇒        R  =  h · cos θ / (1 − cos θ)',
    note: 'Al-Bīrūnī measured h from a mountain near Nandana and computed R ≈ 6,339.6 km. The modern value is 6,357 km — an error of about 0.27%.',
    outcome: 'This radius was the input parameter for every subsequent calculation of "distance from the Earth\'s center" — including al-Khāzini\'s.',
  },
];

export default function MathematicalProofSection() {
  const tSections = useTranslations('Sections');
  return (
    <section
      id="math"
      className="relative min-h-screen flex flex-col items-center justify-center px-6 py-24 overflow-hidden"
    >
      {/* Background grid pattern */}
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
          viewport={{ once: true, margin: "0px 0px 50% 0px" }}
          transition={{ duration: 0.8 }}
          className="text-center mb-14"
        >
          <p className="text-[10px] font-mono tracking-[0.4em] uppercase text-gold/70 mb-4 flex items-center justify-center gap-2">
            <Sigma className="w-3 h-3" />
            {tSections('MathematicalProof.chapterTitle')}
          </p>
          <h2 className="font-display text-4xl sm:text-6xl md:text-7xl text-cream leading-tight">
            Not a poetic claim.
            <br />
            <span className="text-gradient-gold italic">A theorem.</span>
          </h2>
          <p className="mt-6 text-cream-dim max-w-2xl mx-auto text-sm sm:text-base leading-relaxed">
            Al-Bīrūnī and al-Khāzini did not <em>guess</em> at gravity. They
            measured it. They proved it. They wrote down the equations. The
            following theorems are the actual mathematical content of their
            surviving manuscripts — translated into modern notation.
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
                viewport={{ once: true, margin: "0px 0px 50% 0px" }}
                transition={{ duration: 0.7, delay: i * 0.1 }}
                className="glass-card-gold rounded-2xl overflow-hidden"
              >
                {/* Header */}
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

                {/* Body */}
                <div className="p-5 sm:p-7 space-y-5">
                  {/* Statement */}
                  <div>
                    <p className="text-[10px] font-mono uppercase tracking-widest text-cream-dim mb-2">
                      Statement
                    </p>
                    <p className="text-cream text-base sm:text-lg leading-relaxed italic font-display">
                      &ldquo;{th.statement}&rdquo;
                    </p>
                  </div>

                  {/* Setup */}
                  <div>
                    <p className="text-[10px] font-mono uppercase tracking-widest text-cream-dim mb-2">
                      Setup
                    </p>
                    <p className="text-cream/85 text-sm sm:text-base leading-relaxed">
                      {th.formula.map((part, j) => {
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

                  {/* The equation — centered, prominent */}
                  <div className="relative">
                    <p className="text-[10px] font-mono uppercase tracking-widest text-cream-dim mb-2">
                      Theorem
                    </p>
                    <div className="relative bg-cosmos-deep/60 border border-gold/25 rounded-xl py-6 px-4 sm:px-8 text-center overflow-hidden">
                      {/* Corner decorations */}
                      <span className="absolute top-1 left-1 w-3 h-3 border-t border-l border-gold/50" />
                      <span className="absolute top-1 right-1 w-3 h-3 border-t border-r border-gold/50" />
                      <span className="absolute bottom-1 left-1 w-3 h-3 border-b border-l border-gold/50" />
                      <span className="absolute bottom-1 right-1 w-3 h-3 border-b border-r border-gold/50" />
                      <p className="font-mono text-base sm:text-xl md:text-2xl text-gold-bright tracking-wide">
                        {th.equation}
                      </p>
                    </div>
                  </div>

                  {/* Note + outcome */}
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

        {/* Closing statement */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "0px 0px 50% 0px" }}
          transition={{ duration: 0.7, delay: 0.4 }}
          className="mt-12 text-center max-w-3xl mx-auto"
        >
          <p className="text-cream/90 text-sm sm:text-base leading-relaxed">
            These are not coincidences or intuitions. They are{' '}
            <span className="text-gold font-semibold">
              quantitative theorems
            </span>{' '}
            with measured inputs, reproducible methods, and verifiable outputs.
            This is what separates a scientific discovery from a poetic guess —
            and why SDAM treats these manuscripts as{' '}
            <span className="text-gold">Tier-1 primary evidence</span>.
          </p>
        </motion.div>
      </div>
    </section>
  );
}
