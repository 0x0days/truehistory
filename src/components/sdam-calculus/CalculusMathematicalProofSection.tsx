'use client';

import { motion } from 'framer-motion';
import { Sigma, TrendingUp, Infinity as InfinityIcon } from 'lucide-react';
import { useTranslations } from 'next-intl';

const THEOREMS = [
  {
    id: 'sum-powers',
    icon: Sigma,
    title: 'The Sum of Fourth Powers (Integration)',
    attribution: 'Ibn al-Haytham, On the Measurement of the Paraboloid (c. 1000 CE)',
    statement: 'The sum of the first n fourth powers has a closed-form expression — which Ibn al-Haytham derived to compute the volume of a paraboloid by the limit of a sum.',
    setup: [
      { type: 'text', value: 'Let ' },
      { type: 'var', value: 'n' },
      { type: 'text', value: ' be a positive integer. Ibn al-Haytham derived:' },
    ],
    equation: '∑(k=1 to n) k⁴  =  n(n+1)(2n+1)(3n² + 3n − 1) / 30',
    note: 'This is the algebraic identity that makes the paraboloid volume computable. Taking the limit as n → ∞ of [∑k⁴ / n⁵] yields 1/5 — which is exactly the modern integral ∫₀¹ x⁴ dx = 1/5. Ibn al-Haytham did not write the integral sign (it would not be invented for 666 years), but the mathematical content — the limit, the closed form, the application to volume — is unmistakable integration.',
    outcome: 'Computed the volume of a paraboloid of revolution. Verified by Archimedean comparison. 666 years before Newton\'s De Quadratura (1693).',
  },
  {
    id: 'derivative',
    icon: TrendingUp,
    title: 'The Maximum of a Cubic (Differentiation)',
    attribution: 'Sharaf al-Dīn al-Ṭūsī, On Equations (c. 1170 CE)',
    statement: 'To solve a cubic equation of the form x³ + c = ax, one must first determine whether the equation has solutions — by finding the maximum of the function f(x) = ax − x³.',
    setup: [
      { type: 'text', value: 'Let ' },
      { type: 'var', value: 'f(x) = ax − x³' },
      { type: 'text', value: '. Al-Ṭūsī found the maximum by setting the derivative to zero — without using the word "derivative":' },
    ],
    equation: "f'(x) = a − 3x²  =  0     ⇒     x_max  =  √(a/3)",
    note: 'Roshdi Rashed (1986) demonstrated that al-Ṭūsī\'s analysis is recognizably differential calculus. He treats the equation f(x) = 0 as having solutions only when f reaches a maximum above zero — which requires locating that maximum by setting the rate of change to zero. This is the derivative criterion, stated 500 years before Newton\'s fluxions.',
    outcome: 'Solved cubic equations using derivative analysis. 500 years before Newton\'s fluxions (1666).',
  },
  {
    id: 'infinite-series',
    icon: InfinityIcon,
    title: 'The Infinite Series for Sine (Power Series)',
    attribution: 'Mādhava of Saṅgamagrāma, Kerala school (c. 1400 CE)',
    statement: 'The sine, cosine, and arctangent functions can be expressed as infinite power series — converging for all real numbers.',
    setup: [
      { type: 'text', value: 'Let ' },
      { type: 'var', value: 'x' },
      { type: 'text', value: ' be in radians. Mādhava derived:' },
    ],
    equation: 'sin(x)  =  x − x³/3! + x⁵/5! − x⁷/7! + …      π/4  =  1 − 1/3 + 1/5 − 1/7 + …',
    note: 'The series for sin(x) is identical to the one Brook Taylor would publish in 1715 — 315 years later. The series for π/4 is the one Leibniz would publish in 1676 — 276 years later. Mādhava also gave error bounds (the "Mādhava–Leibniz" remainder), making this rigorous, not merely suggestive. The Kerala school\'s work was not transmitted to Europe.',
    outcome: 'Infinite power series with error bounds. 280 years before Newton\'s binomial series (1665).',
  },
];

export default function CalculusMathematicalProofSection() {
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
            <span className="text-gradient-gold italic">Three centuries early.</span>
          </h2>
          <p className="mt-6 text-cream-dim max-w-2xl mx-auto text-sm sm:text-base leading-relaxed">
            Calculus is not a single invention but a synthesis of three
            problems: integration (computing areas and volumes), differentiation
            (finding rates of change and maxima), and infinite series
            (representing functions). Each was solved independently — in Arabic,
            in Arabic again, and in Sanskrit — centuries before Newton and
            Leibniz unified them.
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
            Newton and Leibniz did not invent these techniques. They unified
            them — connecting differentiation and integration through the
            Fundamental Theorem of Calculus, and inventing a notation that
            made the operations routine. That is a genuine contribution. But
            the three component theorems were already{' '}
            <span className="text-gold font-semibold">in writing</span>, in
            Arabic and Sanskrit, hundreds of years earlier. SDAM treats these
            manuscripts as <span className="text-gold">Tier-1 primary evidence</span>.
          </p>
        </motion.div>
      </div>
    </section>
  );
}
