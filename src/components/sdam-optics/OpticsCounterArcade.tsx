'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Swords, RotateCcw, Shield } from 'lucide-react';

interface Objection {
  id: number;
  challenge: string;
  source: string;
  rebuttal: string;
  strategy: string;
}

const OBJECTIONS: Objection[] = [
  {
    id: 1,
    challenge:
      'Newton\'s prism experiment was the real discovery — he proved white light is a mixture of colors.',
    source: 'Standard physics textbook framing',
    rebuttal:
      'Newton\'s prism experiment (1666) is a genuine independent contribution — SDAM does not contest it. But Newton did not "discover optics." The foundational laws — reflection, refraction, straight-line propagation, the camera obscura theorem, the intromission theory of vision — were all proven by Ibn al-Haytham 683 years earlier. Newton\'s Opticks (1704) explicitly assumes and builds on these laws. Crediting Newton with "discovering optics" is like crediting someone who added a new wing to a house they did not build.',
    strategy: 'Distinguish foundations from additions.',
  },
  {
    id: 2,
    challenge:
      'Snell\'s law of refraction is called Snell\'s law for a reason — Snell discovered it.',
    source: 'Conventional naming defense',
    rebuttal:
      'Willebrord Snellius derived the sine law of refraction in 1621. Ibn Sahl derived it — in full geometric form, with drawn hyperbolic lenses designed using it — in 984 CE. That is a 637-year priority margin. Ibn Sahl\'s manuscript was lost to European scholars until Roshdi Rashed rediscovered it in 1993. Snell did not plagiarize; he independently re-derived it. But he was not first. The law should be called "Ibn Sahl\'s law" — or at minimum "the Ibn Sahl–Snell law."',
    strategy: 'Show the manuscript. Cite Rashed 1993.',
  },
  {
    id: 3,
    challenge:
      'Daguerre invented photography in 1839. The French government bought the patent and released it as a "gift to the world."',
    source: 'Popular history + French nationalist narrative',
    rebuttal:
      'Daguerre did not invent photography. Niépce made the first photograph — "View from the Window at Le Gras" — in 1826/27, 13 years before Daguerre\'s announcement. Daguerre had been Niépce\'s partner from 1829 until Niépce\'s death in 1833; he commercialized a chemistry they had worked on together. And crucially: the camera itself — the camera obscura, the optical apparatus that makes any photograph possible — was proven by Ibn al-Haytham in 1011 CE. Take away Ibn al-Haytham\'s theorem, and neither Niépce nor Daguerre has a camera.',
    strategy: 'Separate optics, first photo, and commercialization.',
  },
  {
    id: 4,
    challenge:
      'Even if Ibn al-Haytham described the camera obscura, he didn\'t make photographs. Photography required chemistry.',
    source: 'Skeptical dismissal',
    rebuttal:
      'Correct — and irrelevant. Photography = optics + chemistry. The optics was solved in 1011. The chemistry was solved in 1826. Both were necessary; neither alone was sufficient. But the optics was solved FIRST, by 815 years, and it was the HARDER problem. Light-sensitive chemicals were a gradual discovery by many hands (Schulze 1727, Wedgwood 1800, Niépce 1822). The camera obscura theorem, by contrast, was a single act of genius by Ibn al-Haytham — and it remained unchanged. The chemistry changed; the optics never did.',
    strategy: 'Decompose the invention. Credit each part.',
  },
];

export default function OpticsCounterArcade() {
  const [open, setOpen] = useState<number | null>(0);

  return (
    <section
      id="arcade"
      className="relative min-h-screen flex flex-col items-center justify-center px-6 py-24 manuscript-bg"
    >
      <div className="max-w-4xl w-full">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "0px 0px 50% 0px" }}
          transition={{ duration: 0.8 }}
          className="text-center mb-12"
        >
          <p className="text-[10px] font-mono tracking-[0.4em] uppercase text-gold/70 mb-4 flex items-center justify-center gap-2">
            <Swords className="w-3 h-3" />
            Chapter 10 — The Counter-Argument Arcade
          </p>
          <h2 className="font-display text-4xl sm:text-6xl md:text-7xl text-cream leading-tight">
            Every objection.
            <br />
            <span className="text-gradient-gold italic">Pre-empted.</span>
          </h2>
          <p className="mt-6 text-cream-dim max-w-2xl mx-auto text-sm sm:text-base">
            SDAM&apos;s &ldquo;No Credible Counter-Argument&rdquo; standard
            requires confronting the strongest objections head-on. Tap each to
            see the rebuttal.
          </p>
        </motion.div>

        <div className="space-y-3">
          {OBJECTIONS.map((obj, i) => {
            const isOpen = open === obj.id;
            return (
              <motion.div
                key={obj.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "0px 0px 50% 0px" }}
                transition={{ duration: 0.5, delay: i * 0.08 }}
                className={`rounded-2xl border transition-all duration-500 ${
                  isOpen
                    ? 'glass-card-gold border-gold/50 glow-gold'
                    : 'glass-card border-cream-dim/15 hover:border-gold/30'
                }`}
              >
                <button
                  onClick={() => setOpen(isOpen ? null : obj.id)}
                  className="w-full text-left p-5 sm:p-6 flex items-start gap-4"
                  aria-expanded={isOpen}
                >
                  <span className="flex-shrink-0 w-8 h-8 rounded-full glass-card flex items-center justify-center font-display text-gold text-sm">
                    {String.fromCharCode(64 + obj.id)}
                  </span>
                  <div className="flex-1 min-w-0">
                    <p className="font-mono text-[10px] uppercase tracking-widest text-burgundy mb-2">
                      Objection #{obj.id} · {obj.source}
                    </p>
                    <p className="font-display text-base sm:text-lg text-cream leading-snug italic">
                      &ldquo;{obj.challenge}&rdquo;
                    </p>
                  </div>
                  <motion.div
                    animate={{ rotate: isOpen ? 90 : 0 }}
                    className="flex-shrink-0 mt-1"
                  >
                    <RotateCcw
                      className={`w-4 h-4 ${
                        isOpen ? 'text-gold' : 'text-cream-dim/50'
                      }`}
                    />
                  </motion.div>
                </button>

                <AnimatePresence initial={false}>
                  {isOpen && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: 'auto', opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.4, ease: 'easeInOut' }}
                      className="overflow-hidden"
                    >
                      <div className="px-5 sm:px-6 pb-6 pt-0 pl-16 sm:pl-[68px]">
                        <div className="border-l-2 border-gold/40 pl-4 py-2">
                          <p className="flex items-center gap-2 text-[10px] font-mono uppercase tracking-widest text-gold mb-2">
                            <Shield className="w-3 h-3" />
                            SDAM Rebuttal · Strategy: {obj.strategy}
                          </p>
                          <p className="text-cream text-sm sm:text-base leading-relaxed">
                            {obj.rebuttal}
                          </p>
                        </div>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            );
          })}
        </div>

        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true, margin: "0px 0px 50% 0px" }}
          transition={{ duration: 0.7, delay: 0.4 }}
          className="text-center mt-10"
        >
          <p className="text-cream-dim text-sm italic">
            A claim is only as strong as its handling of its strongest
            counter-argument. SDAM requires that no credible objection remain
            unanswered.
          </p>
        </motion.div>
      </div>
    </section>
  );
}
