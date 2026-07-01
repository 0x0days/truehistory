'use client';
import { motion } from 'framer-motion';
import { Sigma, Heart, Shield } from 'lucide-react';
const THEOREMS = [
  { id:'trial', icon:Sigma, title:'The 7 Rules of Drug Testing (Clinical Trial Methodology)', attribution:'al-Rāzī / Ibn Sīnā, Canon of Medicine (c. 900–1025 CE)', statement:'Before prescribing any drug, the physician must: (1) test on the healthy first, (2) test on one disease not many, (3) observe in controlled conditions, (4) repeat the experiment, (5) compare with controls, (6) record all results including failures, (7) verify before prescribing.', setup:[{type:'text',value:'Let '},{type:'var',value:'D'},{type:'text',value:' = drug, '},{type:'var',value:'P₁'},{type:'text',value:' = treatment group, '},{type:'var',value:'P₀'},{type:'text',value:' = control. Ibn Sīnā stated:'}], equation:'E[D | P₁]  >  E[D | P₀]     (controlled comparison)', note:'This is the foundation of evidence-based medicine — the randomized controlled trial, stated 900 years before the British Medical Research Council\'s 1948 streptomycin trial. Ibn Sīnā\'s 7 rules are identical to the modern FDA clinical trial protocol. The Canon was Europe\'s medical textbook for 600 years, but the 7 rules were never attributed to their author.', outcome:'First controlled clinical trial methodology. 900+ years before European "evidence-based medicine".' },
  { id:'contagion', icon:Shield, title:'The Contagion Theory (Quarantine)', attribution:'Ibn Sīnā, Canon of Medicine, Book IV (c. 1025 CE)', statement:'Infectious diseases spread by contaminated objects and through the air. The sick should be isolated, their belongings quarantined, and travel restricted during epidemics.', setup:[{type:'text',value:'Ibn Sīnā identified contagion vectors:'}], equation:'disease  ∝  contact + air + contaminated objects  →  isolate + quarantine', note:'Ibn Sīnā\'s contagion theory (1025 CE) directly led to the Islamic practice of quarantine (al-arbaʿīniyyāt — 40-day isolation). The word "quarantine" comes from Italian "quarantena" — which comes from the Arabic practice the Venetians observed in Islamic ports. This was 600+ years before European germ theory (Pasteur, 1861).', outcome:'Quarantine and isolation protocol. 600+ years before European germ theory.' },
  { id:'circulation', icon:Heart, title:'Pulmonary Circulation (Blood Flow Through the Lungs)', attribution:'Ibn al-Nafīs, Commentary on the Anatomy of the Canon (1242 CE)', statement:'Blood passes from the right ventricle to the left ventricle through the lungs — not through invisible pores in the heart wall as Galen claimed. The lung is the site of exchange.', setup:[{type:'text',value:'Let '},{type:'var',value:'RV'},{type:'text',value:' = right ventricle, '},{type:'var',value:'LV'},{type:'text',value:' = left ventricle. Ibn al-Nafīs stated:'}], equation:'RV  →  pulmonary artery  →  lung (air exchange)  →  pulmonary vein  →  LV', note:'Ibn al-Nafīs (1242 CE) described pulmonary circulation 350 years before William Harvey (1628). Galen had claimed blood passed through invisible pores in the heart septum — an error that persisted in European medicine for 1,300 years. Ibn al-Nafīs corrected it. Harvey\'s work, which built on the Arabic tradition transmitted to Italy, did not cite him. The manuscript was rediscovered in 1924.', outcome:'Pulmonary circulation described. 350 years before Harvey. Rediscovered 1924.' },
];
export default function MedClinicalProofSection() {
  return (
    <section id="math" className="relative min-h-screen flex flex-col items-center justify-center px-6 py-24 overflow-hidden">
      <div className="absolute inset-0 opacity-[0.025] pointer-events-none" style={{ backgroundImage: 'linear-gradient(rgba(212,175,55,1) 1px, transparent 1px), linear-gradient(90deg, rgba(212,175,55,1) 1px, transparent 1px)', backgroundSize: '60px 60px' }} />
      <div className="max-w-5xl w-full relative z-10">
        <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, margin: "0px 0px 50% 0px" }} transition={{ duration: 0.8 }} className="text-center mb-14">
          <p className="text-[10px] font-mono tracking-[0.4em] uppercase text-gold/70 mb-4 flex items-center justify-center gap-2"><Sigma className="w-3 h-3" />Chapter 04b — The Clinical Proof</p>
          <h2 className="font-display text-4xl sm:text-6xl md:text-7xl text-cream leading-tight">Three theorems.<br /><span className="text-gradient-gold italic">Centuries early.</span></h2>
          <p className="mt-6 text-cream-dim max-w-2xl mx-auto text-sm sm:text-base leading-relaxed">Modern medicine is not a European invention. The controlled clinical trial, contagion theory, and pulmonary circulation were all stated in Arabic — 350–900 years before the European &ldquo;discoverers.&rdquo; The Canon of Medicine was Europe&apos;s textbook for 600 years. The European &ldquo;innovations&rdquo; were restatements.</p>
        </motion.div>
        <div className="space-y-6">
          {THEOREMS.map((th, i) => {
            const Icon = th.icon;
            return (
              <motion.div key={th.id} initial={{ opacity: 0, y: 40 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, margin: "0px 0px 50% 0px" }} transition={{ duration: 0.7, delay: i * 0.1 }} className="glass-card-gold rounded-2xl overflow-hidden">
                <div className="flex items-center gap-4 p-5 sm:p-6 border-b border-gold/15">
                  <div className="w-12 h-12 rounded-full bg-gold/10 border border-gold/30 flex items-center justify-center flex-shrink-0"><Icon className="w-6 h-6 text-gold" /></div>
                  <div className="flex-1 min-w-0"><p className="text-[10px] font-mono uppercase tracking-widest text-gold/70 mb-1">Theorem {String.fromCharCode(8544 + i)} · {th.attribution}</p><h3 className="font-display text-xl sm:text-2xl text-cream leading-tight">{th.title}</h3></div>
                </div>
                <div className="p-5 sm:p-7 space-y-5">
                  <div><p className="text-[10px] font-mono uppercase tracking-widest text-cream-dim mb-2">Statement</p><p className="text-cream text-base sm:text-lg leading-relaxed italic font-display">&ldquo;{th.statement}&rdquo;</p></div>
                  <div><p className="text-[10px] font-mono uppercase tracking-widest text-cream-dim mb-2">Setup</p><p className="text-cream/85 text-sm sm:text-base leading-relaxed">{th.setup.map((part, j) => { if (part.type === 'var') return <span key={j} className="font-mono text-gold font-semibold px-1">{part.value}</span>; return <span key={j}>{part.value}</span>; })}</p></div>
                  <div className="relative"><p className="text-[10px] font-mono uppercase tracking-widest text-cream-dim mb-2">Theorem</p><div className="relative bg-cosmos-deep/60 border border-gold/25 rounded-xl py-6 px-4 sm:px-8 text-center overflow-hidden"><span className="absolute top-1 left-1 w-3 h-3 border-t border-l border-gold/50" /><span className="absolute top-1 right-1 w-3 h-3 border-t border-r border-gold/50" /><span className="absolute bottom-1 left-1 w-3 h-3 border-b border-l border-gold/50" /><span className="absolute bottom-1 right-1 w-3 h-3 border-b border-r border-gold/50" /><p className="font-mono text-sm sm:text-base md:text-lg text-gold-bright tracking-wide break-words">{th.equation}</p></div></div>
                  <div className="grid sm:grid-cols-2 gap-4 pt-2">
                    <div className="border-l-2 border-gold/30 pl-3"><p className="text-[10px] font-mono uppercase tracking-widest text-gold/70 mb-1">Why it matters</p><p className="text-cream-dim text-xs sm:text-sm leading-relaxed">{th.note}</p></div>
                    <div className="border-l-2 border-gold/60 pl-3"><p className="text-[10px] font-mono uppercase tracking-widest text-gold mb-1">Result</p><p className="text-cream text-xs sm:text-sm leading-relaxed font-medium">{th.outcome}</p></div>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>
        <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, margin: "0px 0px 50% 0px" }} transition={{ duration: 0.7, delay: 0.4 }} className="mt-12 text-center max-w-3xl mx-auto">
          <p className="text-cream/90 text-sm sm:text-base leading-relaxed">Vesalius, Harvey, and Pasteur were all brilliant. But the controlled trial, contagion theory, and pulmonary circulation were already in writing — in Arabic — 350–900 years earlier. The Canon of Medicine was their textbook. SDAM treats these manuscripts as <span className="text-gold">Tier-1 primary evidence</span>.</p>
        </motion.div>
      </div>
    </section>
  );
}
