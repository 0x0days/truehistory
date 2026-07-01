'use client';
import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Swords, RotateCcw, Shield } from 'lucide-react';
interface Objection { id: number; challenge: string; source: string; rebuttal: string; strategy: string; }
const OBJECTIONS: Objection[] = [
  { id: 1, challenge: 'Diophantus (c. 250 CE) was the father of algebra. Al-Khwārizmī just systematized Greek ideas.', source: 'Standard math history', rebuttal: 'Diophantus solved SPECIFIC equations (e.g., "find two numbers whose sum is 10 and product is 24"). Al-Khwārizmī created a SYSTEMATIC METHOD for solving ALL equations of a given type. This is the difference between solving a puzzle and inventing a discipline. Diophantus did not use the word "algebra" — al-Khwārizmī did (al-Jabr). Diophantus did not have a general method — al-Khwārizmī did (completing the square). The word "algebra" IS the title of al-Khwārizmī\'s book, not Diophantus\'.', strategy: 'Distinguish specific solutions from systematic method. The word IS his.' },
  { id: 2, challenge: 'Fibonacci (1202) brought algebra to Europe. He was the real innovator.', source: 'European math textbook', rebuttal: 'Fibonacci explicitly credits "the Indians and the Arabs" in the preface to Liber Abaci. He did not claim to invent algebra — he stated he was transmitting what he learned in North Africa. The methods (completing the square, the quadratic formula, Hindu-Arabic numerals) are all in al-Khwārizmī\'s works, 382 years earlier. Fibonacci\'s genuine contribution was applying them to European commercial arithmetic. He was a transmitter, not an inventor.', strategy: 'Cite Fibonacci\'s own preface. He says it himself.' },
  { id: 3, challenge: 'The word "algorithm" is just a common word. Its etymology from al-Khwārizmī is a coincidence.', source: 'Etymological dismissal', rebuttal: 'The etymology is not debated. Every etymological dictionary — Oxford, Merriam-Webster, Larousse — traces "algorithm" through Latin "algorismus" from Medieval Latin "Algoritmi," which IS the Latinized name of al-Khwārizmī. The Latin title of his book on calculation was "Algoritmi de numero Indorum" — "al-Khwārizmī on Indian Numbers." European scholars assumed "Algoritmi" was a method. It was a man. This is the only case in the SDAM collection where the proof IS the name.', strategy: 'Cite Oxford English Dictionary. The etymology is absolute.' },
  { id: 4, challenge: 'Turing (1936) invented the algorithm as a formal mathematical concept. That\'s what matters.', source: 'Computer science textbook', rebuttal: 'Turing formalized the algorithm as a mathematical object (the Turing machine). That is a genuine contribution. But the CONCEPT of a step-by-step procedure for computation — the systematic method al-Khwārizmī developed — was stated 1,116 years earlier. The word Turing used ("algorithm") IS al-Khwārizmī\'s name. Turing formalized what al-Khwārizmī systematized. Both contributions matter. But the word, the method, and the systematic framework are al-Khwārizmī\'s. Turing built on them. He did not mention the etymology.', strategy: 'Distinguish formalization from systematization. The word IS his name.' },
];
export default function AlgCounterArcade() {
  const [open, setOpen] = useState<number | null>(0);
  return (
    <section id="arcade" className="relative min-h-screen flex flex-col items-center justify-center px-6 py-24 manuscript-bg">
      <div className="max-w-4xl w-full">
        <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, margin: "0px 0px 50% 0px" }} transition={{ duration: 0.8 }} className="text-center mb-12">
          <p className="text-[10px] font-mono tracking-[0.4em] uppercase text-gold/70 mb-4 flex items-center justify-center gap-2"><Swords className="w-3 h-3" />Chapter 10 — The Counter-Argument Arcade</p>
          <h2 className="font-display text-4xl sm:text-6xl md:text-7xl text-cream leading-tight">Every objection.<br /><span className="text-gradient-gold italic">Pre-empted.</span></h2>
        </motion.div>
        <div className="space-y-3">
          {OBJECTIONS.map((obj, i) => {
            const isOpen = open === obj.id;
            return (
              <motion.div key={obj.id} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, margin: "0px 0px 50% 0px" }} transition={{ duration: 0.5, delay: i * 0.08 }} className={`rounded-2xl border transition-all duration-500 ${isOpen ? 'glass-card-gold border-gold/50 glow-gold' : 'glass-card border-cream-dim/15 hover:border-gold/30'}`}>
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
