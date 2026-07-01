'use client';

import { motion } from 'framer-motion';
import { Sigma, Compass, Globe } from 'lucide-react';
import { useTranslations } from 'next-intl';

const THEOREMS = [
  {
    id: 'latitude',
    icon: Compass,
    title: 'The Latitude-by-Altitude Formula',
    attribution: 'Ibn Mājid, Kitāb al-Fawāʾid (c. 1462 CE)',
    statement: 'The observer\'s latitude equals the angular altitude of the pole star, corrected for precession and atmospheric refraction.',
    setup: [
      { type: 'text', value: 'Let ' },
      { type: 'var', value: 'h' },
      { type: 'text', value: ' = measured altitude of Polaris, ' },
      { type: 'var', value: 'p' },
      { type: 'text', value: ' = precession correction, ' },
      { type: 'var', value: 'r' },
      { type: 'text', value: ' = refraction. Then:' },
    ],
    equation: 'φ  =  h  −  p  +  r        (observer\'s latitude)',
    note: 'This is the fundamental formula of celestial navigation, used with the kamal (a board held at arm\'s length to measure star altitude). Ibn Mājid gave precession-corrected tables for Polaris — the same method European navigators would use 35 years later, with the mariner\'s astrolabe replacing the kamal. The mathematical content is identical.',
    outcome: 'Latitude determination by celestial observation. 35 years before European "discovery".',
  },
  {
    id: 'qibla',
    icon: Globe,
    title: 'The Qibla Direction (Spherical Trigonometry)',
    attribution: 'al-Bīrūnī, c. 1030 CE (systematized)',
    statement: 'The direction from any point on Earth to Mecca can be computed from the spherical triangle formed by the two points and the pole.',
    setup: [
      { type: 'text', value: 'Let ' },
      { type: 'var', value: 'φ₁, λ₁' },
      { type: 'text', value: ' = observer\'s latitude/longitude, ' },
      { type: 'var', value: 'φ₂, λ₂' },
      { type: 'text', value: ' = Mecca\'s. The qibla angle ' },
      { type: 'var', value: 'q' },
      { type: 'text', value: ' from north is:' },
    ],
    equation: 'tan(q)  =  sin(Δλ)  /  (cos(φ₁)·tan(φ₂)  −  sin(φ₁)·cos(Δλ))',
    note: 'This is the spherical law of sines applied to navigation — the foundation of great-circle sailing. Al-Bīrūnī computed qibla tables for every major city in the Islamic world. The same spherical trigonometry, transmitted to Europe, became the basis for calculating great-circle routes across oceans. European navigators used it without citing al-Bīrūnī.',
    outcome: 'Great-circle direction computation. 460+ years before European oceanic navigation.',
  },
  {
    id: 'kamal',
    icon: Sigma,
    title: 'The Kamal Altitude Measurement',
    attribution: 'Arab navigators, c. 9th–10th century (Mariam al-Asturlābiyya era)',
    statement: 'A rectangular board held at a fixed distance from the eye, with a knotted cord, measures the altitude of a star above the horizon as a latitude reading.',
    setup: [
      { type: 'text', value: 'Let ' },
      { type: 'var', value: 'd' },
      { type: 'text', value: ' = board-to-eye distance, ' },
      { type: 'var', value: 'w' },
      { type: 'text', value: ' = board width, ' },
      { type: 'var', value: 'h' },
      { type: 'text', value: ' = star altitude. Then:' },
    ],
    equation: 'h  =  arctan(w / d)        with knots marking known latitudes',
    note: 'The kamal was the first instrument specifically designed for latitude sailing. Each knot on the cord corresponded to a "finger" (iṣbaʿ) of altitude — a unit Ibn Mājid standardized. The instrument was transmitted to Europe and became the "cross-staff" or "balestilha" — renamed, with the Arabic origin erased. Vasco da Gama\'s crew used the kamal; they called it "the Moor\'s instrument."',
    outcome: 'First latitude-sailing instrument. 500+ years before the European back-staff.',
  },
];

export default function NavMathematicalProofSection() {
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
            <span className="text-gradient-gold italic">Five centuries early.</span>
          </h2>
          <p className="mt-6 text-cream-dim max-w-2xl mx-auto text-sm sm:text-base leading-relaxed">
            Celestial navigation is not a European invention. It is a
            mathematical discipline developed in Arabic — by al-Bīrūnī (spherical
            trigonometry), Ibn Mājid (latitude sailing), and the unnamed Arab
            navigators who invented the kamal. The instruments Mariam
            al-Asturlābiyya perfected were the physical implementation of this
            mathematics.
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
            The Portuguese and Spanish navigators were skilled. But the
            mathematics they used — latitude by altitude, great-circle
            direction, the instruments themselves — was already in writing, in
            Arabic, centuries earlier. Vasco da Gama crossed the Indian Ocean
            in 23 days because a Muslim navigator showed him how. SDAM treats
            these manuscripts as{' '}
            <span className="text-gold">Tier-1 primary evidence</span>.
          </p>
        </motion.div>
      </div>
    </section>
  );
}
