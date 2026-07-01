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
    challenge: 'Copernicus invented heliocentrism in 1543. Before him, everyone was a geocentrist.',
    source: 'Standard astronomy textbook framing',
    rebuttal:
      'False on both counts. (1) Aristarchus of Samos proposed heliocentrism in ancient Greece (~270 BCE) — Copernicus himself cited him. (2) Al-Bīrūnī (c. 1030 CE) discussed heliocentrism as a serious possibility 500 years before Copernicus. (3) The Maragheh school (al-Ṭūsī, Ibn al-Shāṭir) developed the mathematical machinery of heliocentrism — the Tusi Couple, the lunar model — without yet placing the Sun at the center. Copernicus\'s genuine contribution was the conceptual unification: take the Maragheh mathematical models AND the ancient Greek heliocentric hypothesis AND put them together. That is a real breakthrough. But the components were not his.',
    strategy: 'Distinguish framework from components. Cite Aristarchus + al-Bīrūnī.',
  },
  {
    id: 2,
    challenge: 'The Tusi Couple appearing in Copernicus is a coincidence. Similar problems yield similar solutions.',
    source: 'Coincidence defense',
    rebuttal:
      'The mathematical identity is too precise for coincidence. Victor Roberts (1957) demonstrated that Ibn al-Shāṭir\'s lunar model (Damascus, c. 1350) and Copernicus\'s lunar model (De Revolutionibus, 1543) use the same parameter values, the same geometric construction, and the same elimination of Ptolemy\'s trepidation. The probability of independent discovery with identical parameter values is negligible. George Saliba (2007) extended this analysis to the Tusi Couple. The transmission chain (Maragheh → Byzantine → Italian universities → Copernicus) is documented. Copernicus studied at Bologna and Padua 1496–1503, exactly when these manuscripts were arriving after the fall of Constantinople (1453).',
    strategy: 'Cite Roberts 1957, Saliba 2007. The parameter values match.',
  },
  {
    id: 3,
    challenge: 'The Andromeda Galaxy was discovered by Charles Messier in 1764. Al-Sūfī described a "cloud," not a galaxy.',
    source: 'Conventional astronomy history',
    rebuttal:
      'Al-Sūfī\'s description (964 CE) is precise: "the large nebulous spot lies before the mouth of the Fish. It is a small cloud." He gave its exact position relative to the constellation Pisces. When Messier catalogued it as M31 in 1764 — exactly 800 years later — he was observing the same object al-Sūfī had recorded. Al-Sūfī did not know it was a galaxy (no one did until Hubble in 1923). But he was the first human to record it, name its position, and note that it was not a star. That is the discovery. Messier catalogued it. Hubble identified its nature. Al-Sūfī found it first.',
    strategy: 'Show the quote. 800-year priority margin is definitive.',
  },
  {
    id: 4,
    challenge: 'The "library theft" narrative blames European scholars for circumstances beyond their control.',
    source: 'Eurocentric historical defense',
    rebuttal:
      'The library theft is not a moral accusation against Copernicus personally. It is a description of how the manuscripts reached him. The Toledo translation (1085+), the fall of Constantinople (1453), and the Andalusian diaspora are documented historical events. Copernicus did not loot anything. He READ manuscripts that were in Italian universities because of these events. The moral issue is not that he read them — it is that he did not CITE al-Ṭūsī or Ibn al-Shāṭir, and that 500 years of textbooks have credited him with inventing mathematics that was already in those manuscripts. The corrected record is not "Copernicus stole." It is "Copernicus unified; the components were Arabic; the textbooks have not caught up."',
    strategy: 'Frame as documentation, not accusation. Correct the record.',
  },
];

export default function AstroCounterArcade() {
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
          viewport={{ once: true, margin: "0px 0px 15% 0px" }}
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
                viewport={{ once: true, margin: "0px 0px 15% 0px" }}
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
          viewport={{ once: true, margin: "0px 0px 15% 0px" }}
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
