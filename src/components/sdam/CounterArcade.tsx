'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Swords, RotateCcw, Shield } from 'lucide-react';
import { useTranslations } from 'next-intl';

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
      'They only knew heavy things fall down. Newton discovered the math.',
    source: 'Common textbook framing',
    rebuttal:
      'Al-Khāzini did not just observe that things fall. He explicitly stated — in writing, in 1121 — that weight varies mathematically with distance from the Earth\'s center. He provided hydrostatic proofs for this variation. This is not "things fall down." This is a quantitative claim about a variable force.',
    strategy: 'Show the text.',
  },
  {
    id: 2,
    challenge:
      'This is independent discovery. Newton figured it out from Kepler.',
    source: 'Standard historical defense',
    rebuttal:
      'Newton\'s mathematical leap — the inverse-square law applied to celestial orbits — was genuinely his synthesis, built on Kepler and Galileo. SDAM does not contest this. But the conceptual breakthrough that gravity is a variable force (not an Aristotelian absolute) was already in the European tradition via the Arabic "science of weights." Newton inherited the concept; he formalized the math.',
    strategy: 'Distinguish concept from math.',
  },
  {
    id: 3,
    challenge: 'Why does this matter? Credit is just naming.',
    source: 'Skeptical dismissal',
    rebuttal:
      'The barrier to discovering gravity was not the math. It was the Aristotelian belief that weight was an absolute, intrinsic property. Al-Bīrūnī and al-Khāzini were the first humans in recorded history to break that barrier. Crediting them honors the exact moment the scientific paradigm shifted — and corrects a colonial-era double standard that applied strict proof to non-European claims and lax proof to European ones.',
    strategy: 'Correct the paradigm shift.',
  },
  {
    id: 4,
    challenge:
      'Even if they said it, no one in Europe read them. So they had no impact.',
    source: 'Translation Gap defense',
    rebuttal:
      'The "science of weights" (ʿilm al-ḥiyal, ʿilm al-thiqāl) was transmitted to Europe in the 12th–13th centuries via Latin translations of Arabic mechanics. Jordanus de Nemore (c. 1200) wrote extensively on positional gravity (gravitas secundum situm) — directly traceable to Arabic statics. The concept survived transmission even when al-Khāzini\'s name did not. That is the Translation Gap in action.',
    strategy: 'Trace the concept, not the citation.',
  },
];

export default function CounterArcade() {
  const tSections = useTranslations('Sections');
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
            {tSections('CounterArcade.chapterTitle')}
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
