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
      'Francis Bacon\'s Novum Organum (1620) was the first systematic statement of the scientific method. Before him, science was just philosophy.',
    source: 'Standard philosophy-of-science textbook framing',
    rebuttal:
      'False. Ibn al-Haytham\'s Kitāb al-Manāẓir (1011–1021 CE) and Doubts Concerning Ptolemy (1025–1030 CE) contain explicit, systematic statements of the method: observe, hypothesize, experiment, verify, repeat, publish — and question authority throughout. Bacon\'s Novum Organum restates these same steps in Latin, 590 years later. Bacon\'s genuine contribution was formalizing INDUCTION (the logic of generalizing from instances). The empirical foundation was Alhazen\'s — transmitted via Robert Grosseteste and Roger Bacon, both of whom explicitly cite Alhazen.',
    strategy: 'Show the manuscript. Cite Sabra, Steffens, Sarton.',
  },
  {
    id: 2,
    challenge:
      'Descartes invented the modern scientific method with his Discourse on Method (1637) — rationalism, systematic doubt.',
    source: 'Rationalist tradition defense',
    rebuttal:
      'Descartes\' contribution was rationalism — the complement to empiricism, not its replacement. The modern scientific method uses BOTH: empirical observation (Alhazen → F. Bacon) AND rational deduction (Descartes). Neither alone is sufficient. But the foundational insistence that all claims must be tested against observation — the anti-authority principle — was Alhazen\'s, stated 612 years before Descartes. Descartes himself did not contest this; he refined it with systematic doubt. Modern science is a synthesis. The empirical pillar is older than the rationalist pillar by six centuries.',
    strategy: 'Distinguish empiricism from rationalism. Both matter.',
  },
  {
    id: 3,
    challenge:
      'Karl Popper\'s falsifiability criterion (1934) is what truly distinguishes science from non-science. The "method" before that was just inductivism.',
    source: 'Modern philosophy of science defense',
    rebuttal:
      'Popper\'s falsifiability is a logical refinement of Ibn al-Haytham\'s step V (verification). Alhazen wrote: "If the result contradicts the hypothesis, the hypothesis is false — even if its author was Aristotle." That IS falsifiability, stated in 1025. Popper sharpened the demarcation criterion formally — which is a genuine contribution — but the principle that scientific claims must be refutable by observation was already Alhazen\'s, 910 years earlier. Popper formalized. Alhazen practiced.',
    strategy: 'Show the quote. Falsifiability is Alhazen\'s step V, restated.',
  },
  {
    id: 4,
    challenge:
      'The ancient Greeks — Aristotle, Ptolemy, Archimedes — invented the scientific method. Muslims just preserved Greek knowledge.',
    source: 'Classicist / Eurocentric narrative',
    rebuttal:
      'Aristotle deduced from first principles and rejected experiment. Ptolemy used observation but accepted Earth as the center of the universe on authority. Archimedes did use experiment — but did not state a general method. What Ibn al-Haytham did that NO Greek did: he stated the method EXPLICITLY, applied it SYSTEMATICALLY, and made it REPRODUCIBLE. He also criticized the Greeks — his Doubts Concerning Ptolemy systematically demolishes Ptolemy\'s authority using observational evidence. That act of critiquing authority by experiment is the foundational break with Greek science. The Greeks had pieces. Alhazen had the method.',
    strategy: 'List what each Greek did vs. what Alhazen did. The difference is systematic.',
  },
];

export default function MethodCounterArcade() {
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
