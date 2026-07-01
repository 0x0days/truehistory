'use client';
import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Swords, RotateCcw, Shield } from 'lucide-react';

interface Objection { id: number; challenge: string; source: string; rebuttal: string; strategy: string; }

const OBJECTIONS: Objection[] = [
  { id: 1, challenge: 'The Portuguese invented celestial navigation in the 15th century. Henry the Navigator\'s school at Sagres was the first.', source: 'Standard history of navigation', rebuttal: 'False. The astrolabe — the instrument celestial navigation depends on — was perfected by Mariam al-Asturlābiyya in Aleppo c. 944 CE, 471 years before Henry\'s school. The spherical trigonometry was developed by al-Bīrūnī c. 1030 CE. The latitude-by-altitude formula was stated by Ibn Mājid c. 1462 CE. Henry\'s school used translated Arabic instruments and tables. The "invention" was inheritance, not discovery.', strategy: 'Show the dates. Cite Tibbetts 1971.' },
  { id: 2, challenge: 'The astrolabe was a Greek invention. The Muslims just copied it.', source: 'Classicist defense', rebuttal: 'The earliest astrolabes were Greek (Hipparchus, c. 150 BCE), but they were crude and limited. The instrument that became the navigation tool — with precise graduations, the rete, the mater, the angular scales — was perfected in the Islamic world. Al-Fazārī (c. 770 CE) built the first Islamic astrolabe. Mariam al-Asturlābiyya (c. 944) perfected the manufacturing tradition. Al-Zarqāllu (c. 1080) developed the universal astrolabe. The Greek prototype was a sketch; the Islamic astrolabe was the instrument.', strategy: 'Distinguish prototype from perfected instrument.' },
  { id: 3, challenge: 'Vasco da Gama found his own way to India. The "Muslim guide" story is a legend.', source: 'Portuguese nationalist defense', rebuttal: 'The incident is documented in multiple sources. Vasco da Gama\'s own crew recorded hiring a pilot at Malindi. The Roteiro (logbook) of the voyage describes the crossing from Malindi to Calicut in 23 days — a crossing that requires local knowledge of monsoon patterns, currents, and star positions. The pilot is almost certainly Ibn Mājid, based on Ibn Mājid\'s own poetry (in which he mentions guiding the "Frankish" ships) and the Kitāb al-Fawāʾid\'s coverage of the exact route. The "legend" is documented history.', strategy: 'Cite the Roteiro. Cite Ibn Mājid\'s poetry.' },
  { id: 4, challenge: 'Even if the instruments were Arabic, the Portuguese were the first to cross oceans systematically. That\'s the real achievement.', source: 'Eurocentric "systematic" defense', rebuttal: 'The Arab navigators had been crossing the Indian Ocean systematically for 600+ years before da Gama. Ibn Mājid\'s Kitāb al-Fawāʾid describes routes from East Africa to China — a far larger systematic network than the Portuguese achieved in their first century. The Chinese voyages under Zheng He (1405–1433) covered even more ground. The Portuguese achievement was not "systematic ocean crossing" — it was the military conquest of trade routes others had already mapped.', strategy: 'Compare the networks. The Indian Ocean was already mapped.' },
];

export default function NavCounterArcade() {
  const [open, setOpen] = useState<number | null>(0);
  return (
    <section id="arcade" className="relative min-h-screen flex flex-col items-center justify-center px-6 py-24 manuscript-bg">
      <div className="max-w-4xl w-full">
        <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, margin: "0px 0px 15% 0px" }} transition={{ duration: 0.8 }} className="text-center mb-12">
          <p className="text-[10px] font-mono tracking-[0.4em] uppercase text-gold/70 mb-4 flex items-center justify-center gap-2"><Swords className="w-3 h-3" />Chapter 10 — The Counter-Argument Arcade</p>
          <h2 className="font-display text-4xl sm:text-6xl md:text-7xl text-cream leading-tight">Every objection.<br /><span className="text-gradient-gold italic">Pre-empted.</span></h2>
          <p className="mt-6 text-cream-dim max-w-2xl mx-auto text-sm sm:text-base">SDAM&apos;s &ldquo;No Credible Counter-Argument&rdquo; standard requires confronting the strongest objections head-on. Tap each to see the rebuttal.</p>
        </motion.div>
        <div className="space-y-3">
          {OBJECTIONS.map((obj, i) => {
            const isOpen = open === obj.id;
            return (
              <motion.div key={obj.id} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, margin: "0px 0px 15% 0px" }} transition={{ duration: 0.5, delay: i * 0.08 }} className={`rounded-2xl border transition-all duration-500 ${isOpen ? 'glass-card-gold border-gold/50 glow-gold' : 'glass-card border-cream-dim/15 hover:border-gold/30'}`}>
                <button onClick={() => setOpen(isOpen ? null : obj.id)} className="w-full text-left p-5 sm:p-6 flex items-start gap-4" aria-expanded={isOpen}>
                  <span className="flex-shrink-0 w-8 h-8 rounded-full glass-card flex items-center justify-center font-display text-gold text-sm">{String.fromCharCode(64 + obj.id)}</span>
                  <div className="flex-1 min-w-0">
                    <p className="font-mono text-[10px] uppercase tracking-widest text-burgundy mb-2">Objection #{obj.id} · {obj.source}</p>
                    <p className="font-display text-base sm:text-lg text-cream leading-snug italic">&ldquo;{obj.challenge}&rdquo;</p>
                  </div>
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
        <motion.div initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true, margin: "0px 0px 15% 0px" }} transition={{ duration: 0.7, delay: 0.4 }} className="text-center mt-10"><p className="text-cream-dim text-sm italic">A claim is only as strong as its handling of its strongest counter-argument.</p></motion.div>
      </div>
    </section>
  );
}
