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
    challenge: 'Newton and Leibniz independently invented calculus. The Arabic and Indian work was unrelated.',
    source: 'Standard calculus textbook framing',
    rebuttal:
      'Newton\'s teacher Isaac Barrow knew the Arabic mathematical tradition; Newton himself owned and annotated works derived from Alhazen. The transmission chain from Ibn al-Haytham → Latin Europe → Barrow → Newton is documented in the scholarly literature (Rashed, Berggren). For Leibniz the chain is less direct but the Latin translations of Arabic mathematics were in every European university library. "Independent invention" is the textbook story; the manuscript evidence shows inheritance. Mādhava\'s Kerala school is the one tradition with NO documented transmission — his series were likely independently rediscovered by Taylor.',
    strategy: 'Cite Barrow\'s library. Cite Rashed, Berggren.',
  },
  {
    id: 2,
    challenge: 'Newton\'s fluxions and Leibniz\'s differentials are the FIRST true calculus. Ibn al-Haytham computed a sum, but he didn\'t have the Fundamental Theorem.',
    source: 'Mathematician\'s defense',
    rebuttal:
      'Correct — and explicitly acknowledged by SDAM. The Fundamental Theorem of Calculus (connecting differentiation and integration) is Newton and Leibniz\'s genuine contribution. They also invented the notation that made calculus routine. SDAM does not contest this. But the theorem does not invent integration (Ibn al-Haytham, 666 years earlier) or differentiation (Sharaf al-Ṭūsī, 496 years earlier) or infinite series (Mādhava, 276 years earlier). The Fundamental Theorem connects three techniques that already existed. The connection is Newton\'s. The techniques are not.',
    strategy: 'Distinguish techniques from their unification.',
  },
  {
    id: 3,
    challenge: 'Mādhava was Indian, not Muslim. This isn\'t an "Islamic Golden Age" discovery.',
    source: 'Categorization defense',
    rebuttal:
      'Correct — and SDAM never claimed otherwise. The calculus case involves THREE independent traditions: Arabic (Ibn al-Haytham, Sharaf al-Ṭūsī), Sanskrit (Mādhava and the Kerala school), and Greek (Archimedes, lost and rediscovered). All three predate Newton. The SDAM framework does not require the discoverer to be Muslim — it requires the discovery to be documented and the priority margin to be real. Mādhava\'s case is actually cleaner than the Arabic one: there was NO transmission, so his priority is independent and uncontested. He derived the Taylor series 315 years before Taylor.',
    strategy: 'Acknowledge. The case is multi-civilizational.',
  },
  {
    id: 4,
    challenge: 'The "library theft" narrative is a conspiracy theory. European scholars translated manuscripts, not stole them.',
    source: 'Eurocentric historical defense',
    rebuttal:
      'The library theft is documented history, not conspiracy. The Vatican Library, British Library, and Bibliothèque nationale hold the physical evidence: Arabic and Sanskrit manuscripts acquired during the Crusades (1099, 1204), the fall of Granada (1492 — including the burning of ~1,000,000 Arabic manuscripts), Napoleon\'s Egyptian expedition (1798 — 167 scholars removed thousands of manuscripts), and British colonial rule in India (1858–1947 — ~66,000 manuscripts now in the British Library). These are not allegations; they are accession records. Newton and Leibniz did not steal anything personally — but the manuscripts they worked from were in European libraries because of these episodes. The "translation" was real. The erasure of attribution was also real.',
    strategy: 'Cite the accession records. The evidence is physical.',
  },
];

export default function CalculusCounterArcade() {
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
                  isOpen ? 'glass-card-gold border-gold/50 glow-gold' : 'glass-card border-cream-dim/15 hover:border-gold/30'
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
                  <motion.div animate={{ rotate: isOpen ? 90 : 0 }} className="flex-shrink-0 mt-1">
                    <RotateCcw className={`w-4 h-4 ${isOpen ? 'text-gold' : 'text-cream-dim/50'}`} />
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
            A claim is only as strong as its handling of its strongest counter-argument.
          </p>
        </motion.div>
      </div>
    </section>
  );
}
