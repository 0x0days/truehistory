'use client';
import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Swords, RotateCcw, Shield } from 'lucide-react';
interface Objection { id: number; challenge: string; source: string; rebuttal: string; strategy: string; }
const OBJECTIONS: Objection[] = [
  { id: 1, challenge: 'Bologna (1088) is recognized as the first university. Al-Qarawiyyin was a mosque, not a university.', source: 'Standard European education history', rebuttal: 'Al-Qarawiyyin was a mosque-UNIVERSITY — the same model Bologna adopted. It granted degrees (ijāza), had a faculty of scholars, a structured curriculum, and was open to students from across the Islamic world. UNESCO and Guinness World Records recognize it as the oldest continuously operating, degree-granting educational institution. The European distinction between "mosque" and "university" is anachronistic — medieval European universities were also church institutions. The first European universities were cathedral schools. The first Islamic universities were mosque-schools. Same model, different religion.', strategy: 'Cite UNESCO. The mosque/university distinction is anachronistic.' },
  { id: 2, challenge: 'European women were not "burned for practicing science." Witch burnings were about superstition, not education.', source: 'Eurocentric historical defense', rebuttal: 'The Malleus Maleficarum (1486) — the legal manual for witch prosecution — explicitly linked women\'s knowledge to witchcraft. Women who practiced herbal medicine, midwifery, or any healing art outside church control were accused. The charge was "witchcraft"; the real crime was knowing something the church didn\'t sanction. An estimated 40,000–60,000 women were executed. The gender ratio was 80–85% female. This was not random superstition — it was a systematic suppression of women\'s knowledge, codified in law, lasting 296 years.', strategy: 'Cite the Malleus. The gender ratio proves it was gendered.' },
  { id: 3, challenge: 'The Islamic world also had restrictions on women. It wasn\'t a feminist paradise.', source: 'Both-sides defense', rebuttal: 'Correct — and SDAM does not claim the Islamic world was perfect. But the comparison is not perfection vs. imperfection. It is: women founding universities (Fatima, 859), managing libraries of 500,000 books (Lubna, 960s), financing hospital systems (Dhayfa, 1230s) — vs. women being denied souls, defined as "defective males," and burned alive for reading. The Islamic world was not perfect. But it was categorically different on this specific question: women\'s access to education. The evidence is not ambiguous.', strategy: 'Acknowledge imperfection. The contrast is still categorical.' },
  { id: 4, challenge: 'The European university model was independently developed. The similarity to the madrasa is coincidence.', source: 'Independent invention defense', rebuttal: 'George Makdisi (The Rise of Colleges, 1981) demonstrated that the European university — with its degree (licentia docendi), its faculty organization, its curriculum structure — is structurally identical to the Arabic madrasa. The transmission chain runs through Toledo (12th c.) and Sicily. The 229-year gap between al-Qarawiyyin and Bologna is not a coincidence gap — it is the time it took for the model to cross. The burden of proof is on the claimant of independent invention, not on the documented transmission.', strategy: 'Cite Makdisi 1981. The structural identity is provable.' },
];
export default function UniCounterArcade() {
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
