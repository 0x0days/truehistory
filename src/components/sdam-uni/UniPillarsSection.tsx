'use client';
import { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronRight, RotateCcw } from 'lucide-react';
import Image from 'next/image';
import { useTranslations } from 'next-intl';

interface Pillar { id: number; roman: string; title: string; short: string; rating: 'CONCLUSIVE'|'VERY STRONG'|'STRONG'|'MODERATE'|'WEAK'; points: number; maxPoints: number; evidence: string; detail: string; image?: string; imageAlt?: string; }
const PILLARS: Pillar[] = [
  { id:1, roman:'I', title:'Primary Source', short:'Authentication', rating:'VERY STRONG', points:2.5, maxPoints:3, evidence:'Al-Qarawiyyin University still operates in Fez (859 CE). Ibn Abī Zarʿ records Fatima al-Fehri by name. Ibn Bashkuwal records Lubna (Kitab al-Silla, Cairo 2008, Vol 2:324). Dhayfa Khatun\'s buildings still stand in Aleppo.', detail:'The institutions themselves are the primary sources. Al-Qarawiyyin is recognized by UNESCO and Guinness World Records. The women are named in medieval Arabic biographical dictionaries.', image:'/images/sdam-uni/qarawiyyin-mainly.jpg', imageAlt:'Al-Qarawiyyin University courtyard — the world\'s oldest university' },
  { id:2, roman:'II', title:'Priority Dating', short:'Chronology', rating:'CONCLUSIVE', points:3, maxPoints:3, evidence:'Al-Qarawiyyin (859 CE) precedes Bologna (1088) by 229 years, Oxford (1096) by 237, Paris (1150) by 291, Cambridge (1209) by 350.', detail:'Priority margin of 229 years exceeds the 200-year "definitive" threshold. The gap is not marginal — it is nearly a quarter of a millennium.' },
  { id:3, roman:'III', title:'Citation Chain', short:'Reception', rating:'STRONG', points:2, maxPoints:3, evidence:'The Arabic madrasa model → Toledo translation → European universities. The degree-granting, faculty-organized, curriculum-based structure was adopted from Arabic institutions.', detail:'The specific chain from al-Qarawiyyin → specific European university is not documented at the desk level. But the institutional model is demonstrably inherited.' },
  { id:4, roman:'IV', title:'Content Analysis', short:'Concept Map', rating:'VERY STRONG', points:2.5, maxPoints:3, evidence:'The European "university" (degree, faculty, curriculum, open admission) is the Arabic madrasa model. The bimaristan (hospital) system was also transmitted. The contrast with European women\'s education is stark: Islamic women founded universities; European women were burned for reading.', detail:'Content match exceeds 80% for the institutional model. The gender contrast is 100% — Islamic world had women founders; Europe had women persecution.' },
  { id:5, roman:'V', title:'Transmission', short:'Influence', rating:'STRONG', points:2, maxPoints:3, evidence:'The Toledo translation (12th c.) transmitted Arabic educational texts. Sicily and Spain transmitted the madrasa model. European universities adopted the structure but credited themselves with invention.', detail:'No specific desk-level chain from Fatima → Bologna. But the institutional model is clearly inherited, and the 229-year gap makes independent invention implausible.' },
  { id:6, roman:'VI', title:'Linguistic', short:'Etymology', rating:'MODERATE', points:1, maxPoints:3, evidence:'"Rector" possibly from Arabic "raʾīs." "Baccalaureate" debated origin. "Algebra," "algorithm," "almanac" all Arabic — but "university" is Latin.', detail:'Some vocabulary crossed. The institutional name did not. The Arabic "madrasa" did not enter European languages as the word for "university."' },
  { id:7, roman:'VII', title:'Scholarly Consensus', short:'Modern View', rating:'VERY STRONG', points:2.5, maxPoints:3, evidence:'UNESCO and Guinness World Records recognize al-Qarawiyyin as the oldest continuously operating university. George Makdisi (The Rise of Colleges, 1981) demonstrated the Arabic origin of the European university model.', detail:'The scholarly consensus is settled. The gap is between scholarly consensus and textbook/curriculum — which still credit Bologna as "first."' },
];
const RATING_COLORS: Record<Pillar['rating'], string> = { CONCLUSIVE:'#f4d062','VERY STRONG':'#f4d062',STRONG:'#d4af37',MODERATE:'#a39c87',WEAK:'#6b1d2a' };

export default function UniPillarsSection() {
  const tSections = useTranslations('Sections');
  const [flipped, setFlipped] = useState<Set<number>>(new Set());
  const totalScore = useMemo(() => PILLARS.filter((p) => flipped.has(p.id)).reduce((s, p) => s + p.points, 0), [flipped]);
  const allFlipped = flipped.size === PILLARS.length;
  const toggle = (id: number) => { setFlipped((prev) => { const next = new Set(prev); if (next.has(id)) next.delete(id); else next.add(id); return next; }); };
  return (
    <section id="pillars" className="relative min-h-screen flex flex-col items-center justify-center px-6 py-24">
      <div className="max-w-7xl w-full">
        <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, margin: "0px 0px 15% 0px" }} transition={{ duration: 0.8 }} className="text-center mb-12">
          <p className="text-[10px] font-mono tracking-[0.4em] uppercase text-gold/70 mb-4">{tSections('Pillars.chapterTitle')}</p>
          <h2 className="font-display text-4xl sm:text-6xl md:text-7xl text-cream leading-tight">Tap each pillar<br /><span className="text-gradient-gold italic">to weigh the evidence.</span></h2>
        </motion.div>
        <div className="sticky top-4 z-30 mb-12 mx-auto max-w-3xl">
          <div className="glass-card-gold rounded-2xl p-4 sm:p-5 flex items-center gap-4 sm:gap-6">
            <div className="flex-shrink-0"><p className="text-[10px] font-mono uppercase tracking-widest text-gold/70 mb-0.5">CES Score</p><div className="flex items-baseline gap-1"><motion.span key={Math.round(totalScore*10)} initial={{y:-8,opacity:0.5}} animate={{y:0,opacity:1}} transition={{duration:0.3}} className="font-display text-3xl sm:text-4xl text-gradient-gold">{totalScore%1===0?totalScore:totalScore.toFixed(1)}</motion.span><span className="text-cream-dim text-lg sm:text-xl font-display">/21</span></div></div>
            <div className="flex-1"><div className="h-2 rounded-full bg-cream-dim/15 overflow-hidden"><motion.div className="h-full gradient-gold" animate={{ width: `${(totalScore/21)*100}%` }} transition={{ type: 'spring', stiffness: 120, damping: 20 }} /></div><p className="text-[10px] font-mono uppercase tracking-wider text-cream-dim mt-1.5">{flipped.size} of 7 pillars revealed · <span className="text-gold">{allFlipped ? 'VERDICT UNLOCKED' : 'keep tapping'}</span></p></div>
            <button onClick={() => allFlipped ? setFlipped(new Set()) : setFlipped(new Set(PILLARS.map(p=>p.id)))} className="flex-shrink-0 px-3 py-2 rounded-lg border border-gold/30 hover:border-gold/60 hover:bg-gold/10 transition-colors text-cream text-xs font-mono uppercase tracking-wider flex items-center gap-1.5">{allFlipped ? <><RotateCcw className="w-3 h-3" /> Reset</> : <><ChevronRight className="w-3 h-3" /> Reveal all</>}</button>
          </div>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 sm:gap-5">
          {PILLARS.map((pillar, i) => {
            const ratingColor = RATING_COLORS[pillar.rating];
            return (
              <motion.button key={pillar.id} initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, margin: "0px 0px 15% 0px" }} transition={{ duration: 0.5, delay: i * 0.05 }} onClick={() => toggle(pillar.id)} className="relative aspect-[3/4] sm:aspect-[4/5] perspective-1000 cursor-pointer text-left group" aria-label={`Pillar ${pillar.roman}`}>
                <motion.div className="relative w-full h-full preserve-3d transition-transform duration-700" style={{ transform: flipped.has(pillar.id) ? 'rotateY(180deg)' : 'rotateY(0deg)' }}>
                  <div className="absolute inset-0 backface-hidden glass-card rounded-2xl p-5 flex flex-col justify-between group-hover:border-gold/40 transition-colors"><div><div className="flex items-start justify-between mb-3"><span className="font-display text-5xl text-gradient-gold leading-none">{pillar.roman}</span><span className="text-[9px] font-mono uppercase tracking-widest text-cream-dim/60 mt-1">Pillar</span></div><h3 className="font-display text-xl text-cream mb-1">{pillar.title}</h3><p className="text-cream-dim text-xs uppercase tracking-wider">{pillar.short}</p></div><div className="flex items-center justify-between"><span className="text-[10px] font-mono uppercase tracking-widest text-gold/60 flex items-center gap-1"><ChevronRight className="w-3 h-3" /> Tap to reveal</span><div className="flex gap-0.5">{Array.from({length:pillar.maxPoints}).map((_,i)=><span key={i} className="w-1.5 h-1.5 rounded-full bg-cream-dim/25" />)}</div></div></div>
                  <div className="absolute inset-0 backface-hidden rotate-y-180 glass-card-gold rounded-2xl p-5 flex flex-col"><div className="flex items-start justify-between mb-2"><span className="font-display text-2xl text-gradient-gold leading-none">{pillar.roman}</span><div className="text-right"><span className="text-[9px] font-mono uppercase tracking-widest block" style={{color:ratingColor}}>{pillar.rating}</span><span className="font-display text-lg text-cream">{pillar.points}<span className="text-cream-dim text-xs">/{pillar.maxPoints}</span></span></div></div><h3 className="font-display text-base text-cream mb-2">{pillar.title}</h3><p className="text-cream/85 text-xs leading-relaxed mb-2">{pillar.evidence}</p>{pillar.image && <div className="relative h-20 rounded-md overflow-hidden mb-2 border border-gold/20"><Image src={pillar.image} alt={pillar.imageAlt||pillar.title} fill sizes="200px" className="object-cover" /><div className="absolute inset-0 bg-gradient-to-t from-cosmos-deep/80 to-transparent" /><span className="absolute bottom-1 left-2 text-[8px] font-mono uppercase tracking-widest text-gold/80">Authentic</span></div>}<p className="text-cream-dim text-[11px] leading-relaxed border-t border-gold/15 pt-2 flex-1">{pillar.detail}</p><div className="mt-2 flex items-center justify-end gap-1 text-gold/60 text-[10px] font-mono uppercase tracking-wider"><RotateCcw className="w-3 h-3" /> flip back</div></div>
                </motion.div>
              </motion.button>
            );
          })}
          <motion.div initial={{ opacity: 0, scale: 0.95 }} whileInView={{ opacity: 1, scale: 1 }} viewport={{ once: true, margin: "0px 0px 15% 0px" }} transition={{ duration: 0.6, delay: 0.4 }} className={`relative rounded-2xl p-6 min-h-[260px] flex flex-col justify-center text-center transition-all duration-500 ${allFlipped ? 'glass-card-gold glow-gold-strong border-gold/50' : 'glass-card border-cream-dim/15'}`}>
            <AnimatePresence mode="wait">
              {allFlipped ? (
                <motion.div key="verdict" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
                  <p className="text-[10px] font-mono uppercase tracking-widest text-gold mb-2">Final Verdict</p>
                  <p className="font-display text-5xl text-gradient-gold text-glow-gold mb-2">15.5</p>
                  <p className="text-cream font-display text-xl italic mb-3">Very Strong Case</p>
                  <p className="text-cream-dim text-xs leading-relaxed">The world&apos;s oldest university was founded by a woman — <span className="text-gold">229 years before Bologna</span>. While Europe burned women for reading, the Islamic world had women building university systems.</p>
                  <p className="mt-3 text-[10px] font-mono uppercase tracking-widest text-gold/70">↓ Continue to verdict</p>
                </motion.div>
              ) : (
                <motion.div key="locked" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
                  <p className="text-cream-dim text-xs uppercase tracking-widest mb-2 font-mono">Verdict</p><p className="font-display text-3xl text-cream-dim/40 mb-2">?? / 21</p><p className="text-cream-dim/60 text-xs">Reveal all 7 pillars<br />to unlock the verdict.</p>
                  <div className="mt-4 inline-flex items-center gap-1 text-gold/70 text-[10px] font-mono uppercase tracking-wider">{flipped.size} / 7<div className="ml-1 flex gap-0.5">{PILLARS.map((p)=><span key={p.id} className={`w-1 h-1 rounded-full ${flipped.has(p.id)?'bg-gold':'bg-cream-dim/20'}`} />)}</div></div>
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
