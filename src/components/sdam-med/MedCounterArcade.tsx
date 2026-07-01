'use client';
import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Swords, RotateCcw, Shield } from 'lucide-react';
interface Objection { id: number; challenge: string; source: string; rebuttal: string; strategy: string; }
const OBJECTIONS: Objection[] = [
  { id: 1, challenge: 'Vesalius (1543) founded modern anatomy. Before him, medicine was stuck in Galen\'s errors.', source: 'Standard medical history', rebuttal: 'Vesalius was brilliant — but he studied the Canon at Padua, where it was still the standard textbook. His anatomical framework was inherited from Ibn Sīnā. And the specific "Galen error" he is credited with correcting — the invisible heart pores — had already been corrected by Ibn al-Nafīs in 1242, 301 years earlier. Vesalius did not cite Ibn al-Nafīs. The correction was rediscovered in 1924.', strategy: 'Cite Ibn al-Nafīs. The correction was 301 years earlier.' },
  { id: 2, challenge: 'William Harvey discovered blood circulation in 1628. That is the foundation of modern physiology.', source: 'Conventional physiology textbook', rebuttal: 'Harvey described the COMPLETE circulation (systemic + pulmonary). But the pulmonary circulation — the hardest part, the part that required rejecting Galen — was described by Ibn al-Nafīs in 1242 CE, 386 years earlier. Ibn al-Nafīs stated that blood passes from the right ventricle to the lungs, mixes with air, and returns to the left ventricle. Harvey\'s contribution was the systemic half. The pulmonary half was Arabic.', strategy: 'Separate pulmonary (Arabic) from systemic (Harvey).' },
  { id: 3, challenge: 'The Canon of Medicine was just a compilation of Greek medicine. Ibn Sīnā added nothing original.', source: 'Eurocentric dismissal', rebuttal: 'The Canon contained original content on every page: the 7 rules of drug testing (the first clinical trial protocol), the contagion theory (600 years before Pasteur), the distinction between primary and secondary cardiac disease, the description of meningitis, the classification of cancers, and the pharmacological analysis of 760 drugs. It was a synthesis — but a synthesis that included massive original contributions. George Sarton called Ibn Sīnā "the most famous scientist of Islam and one of the most famous of all races, places, and times."', strategy: 'Cite Sarton. List the original contributions.' },
  { id: 4, challenge: 'European medicine was independent. The Canon was used, but Europeans innovated beyond it.', source: 'Independent development defense', rebuttal: 'The Canon was used as the PRIMARY medical textbook at every major European university for 600 years. That is not "use" — that is the curriculum. Vesalius studied it. Harvey studied it. Every European physician from 1181 to the 17th century learned from it. The "European innovations" — the clinical trial, contagion theory, pulmonary circulation — were all restatements of content already in Arabic manuscripts. The Canon did not go out of print in Europe until 1658. That is not influence. That is dependence.', strategy: '600 years as the primary textbook is not "influence." It is the curriculum.' },
];
export default function MedCounterArcade() {
  const [open, setOpen] = useState<number | null>(0);
  return (
    <section id="arcade" className="relative min-h-screen flex flex-col items-center justify-center px-6 py-24 manuscript-bg">
      <div className="max-w-4xl w-full">
        <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, margin: "0px 0px 15% 0px" }} transition={{ duration: 0.8 }} className="text-center mb-12">
          <p className="text-[10px] font-mono tracking-[0.4em] uppercase text-gold/70 mb-4 flex items-center justify-center gap-2"><Swords className="w-3 h-3" />Chapter 10 — The Counter-Argument Arcade</p>
          <h2 className="font-display text-4xl sm:text-6xl md:text-7xl text-cream leading-tight">Every objection.<br /><span className="text-gradient-gold italic">Pre-empted.</span></h2>
        </motion.div>
        <div className="space-y-3">
          {OBJECTIONS.map((obj, i) => {
            const isOpen = open === obj.id;
            return (
              <motion.div key={obj.id} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, margin: "0px 0px 15% 0px" }} transition={{ duration: 0.5, delay: i * 0.08 }} className={`rounded-2xl border transition-all duration-500 ${isOpen ? 'glass-card-gold border-gold/50 glow-gold' : 'glass-card border-cream-dim/15 hover:border-gold/30'}`}>
                <button onClick={() => setOpen(isOpen ? null : obj.id)} className="w-full text-left p-5 sm:p-6 flex items-start gap-4" aria-expanded={isOpen}>
                  <span className="flex-shrink-0 w-8 h-8 rounded-full glass-card flex items-center justify-center font-display text-gold text-sm">{String.fromCharCode(64 + obj.id)}</span>
                  <div className="flex-1 min-w-0"><p className="font-mono text-[10px] uppercase tracking-widest text-burgundy mb-2">Objection #{obj.id} · {obj.source}</p><p className="font-display text-base sm:text-lg text-cream leading-snug italic">&ldquo;{obj.challenge}&rdquo;</p></div>
                  <motion.div animate={{ rotate: isOpen ? 90 : 0 }} className="flex-shrink-0 mt-1"><RotateCcw className={`w-4 h-4 ${isOpen ? 'text-gold' : 'text-cream-dim/50'}`} /></motion.div>
                </button>
                <AnimatePresence initial={false}>
                  {isOpen && (
                    <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: 'auto', opacity: 1 }} exit={{ height: 0, opacity: 0 }} transition={{ duration: 0.4, ease: 'easeInOut' }} className="overflow-hidden">
                      <div className="px-5 sm:px-6 pb-6 pt-0 pl-16 sm:pl-[68px]">
                        <div className="border-l-2 border-gold/40 pl-4 py-2">
                          <p className="flex items-center gap-2 text-[10px] font-mono uppercase tracking-widest text-gold mb-2"><Shield className="w-3 h-3" />SDAM Rebuttal · Strategy: {obj.strategy}</p>
                          <p className="text-cream text-sm sm:text-base leading-relaxed">{obj.rebuttal}</p>
                        </div>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
