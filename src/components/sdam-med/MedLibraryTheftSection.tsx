'use client';
import { motion } from 'framer-motion';
import Image from 'next/image';
import { Library, Flame, Crown, Scroll, ArrowRight, BookOpen, Cross } from 'lucide-react';
import { useTranslations } from 'next-intl';
interface Theft { id: number; year: string; event: string; actor: string; location: string; mechanism: string; loot: string; image: string; imageAlt: string; source: string; icon: typeof Flame; }
const THEFTS: Theft[] = [
  { id:1, year:'1085–1150 CE', event:'Toledo translation — the Canon enters Latin', actor:'Gerard of Cremona + Toledo school', location:'Toledo, al-Andalus', mechanism:'Gerard of Cremona translated 87 Arabic scientific books into Latin, including Ibn Sīnā\'s Canon of Medicine. The Canon became the standard medical textbook at European universities within a generation. The Arabic author was renamed "Avicenna."', loot:'The complete Arabic medical corpus — al-Rāzī\'s Kitāb al-Hāwī, Ibn Sīnā\'s Canon, al-Zahrāwī\'s surgical manual. All entered Latin without attribution to their authors by name. "Avicenna" and "Rhazes" were Latin ghosts.', image:'/images/sdam-med/canon-latin-britannica.jpg', imageAlt:'Authentic page from the Latin translation of Avicenna\'s Canon of Medicine', source:'Britannica (Latin manuscript reproduction)', icon: Crown },
  { id:2, year:'1181 CE', event:'University of Montpellier founded — on the Canon', actor:'King of Aragon / Montpellier medical school', location:'Montpellier, France', mechanism:'The University of Montpellier\'s medical school was founded using Ibn Sīnā\'s Canon as its primary textbook. For 500+ years, every physician trained at Montpellier — the leading European medical school — learned from "Avicenna."', loot:'The Canon of Medicine became the foundation of European medical education. Al-Rāzī\'s clinical method was absorbed. Al-Zahrāwī\'s surgical instruments were adopted. The Arabic origin was obscured.', image:'/images/sdam-med/ibnsina-alamy-1.jpg', imageAlt:'Authentic Arabic medical manuscript page from Ibn Sina\'s tradition', source:'Alamy (manuscript reproduction)', icon: BookOpen },
  { id:3, year:'1453 CE', event:'Fall of Constantinople — medical manuscripts flood Italy', actor:'Byzantine Greek scholars fleeing west', location:'Constantinople → Italy', mechanism:'When Constantinople fell, Byzantine scholars carried Arabic medical manuscripts to Italy. These reached the Italian universities — Padua, Bologna — just as the European "Renaissance of medicine" was beginning.', loot:'The manuscripts that made Vesalius (1543) and Harvey (1628) possible. Ibn al-Nafīs\'s pulmonary circulation (1242) was among them — though his priority was not recognized until 1924.', image:'/images/sdam-med/canon-latin-facsimile.jpg', imageAlt:'Authentic Latin medical manuscript page from the European Renaissance tradition', source:'Facsimile Finder (manuscript reproduction)', icon: Flame },
  { id:4, year:'5th–17th c. CE', event:'European "medicine" — bloodletting and four humors', actor:'European church and medical establishment', location:'Europe', mechanism:'While the Islamic world had controlled clinical trials, contagion theory, and 24/7 hospitals with separate wards — European "medicine" was dominated by bloodletting (which killed patients), the four humors (which had no empirical basis), and church prohibitions on dissection (which prevented anatomical knowledge).', loot:'1,300 years of medical stagnation. Galen\'s errors — including the invisible heart pores Ibn al-Nafīs had corrected in 1242 — persisted in Europe until the 16th century. The Black Death (1347–1351) killed 30–60% of Europe\'s population, partly because European physicians rejected contagion theory as "Arabic superstition."', image:'/images/sdam-med/european-med-collector.jpg', imageAlt:'Authentic medieval European illustration depicting a chaotic medical scene with bloodletting', source:'TheCollector (historical illustration)', icon: Cross },
  { id:5, year:'1543 CE', event:'Vesalius publishes — using Ibn Sīnā\'s framework', actor:'Andreas Vesalius', location:'Padua, Italy', mechanism:'Vesalius published De Humani Corporis Fabrica in 1543 — credited as the foundation of modern anatomy. But his anatomical framework was inherited from the Canon of Medicine, which was still the standard text at Padua. He corrected Galen — using corrections Ibn al-Nafīs had already made 300 years earlier.', loot:'The credit for "overturning Galen." Ibn al-Nafīs had overturned Galen\'s pulmonary circulation error in 1242 — 301 years before Vesalius. The Arabic correction was not cited.', image:'/images/sdam-med/hippocrates-alamy.jpg', imageAlt:'Authentic medieval European medical illustration', source:'Alamy (historical reproduction)', icon: Scroll },
  { id:6, year:'Ongoing', event:'European libraries hold the evidence', actor:'Bibliothèque nationale, Bodleian, Vatican', location:'Paris, Oxford, Rome', mechanism:'The surviving Arabic medical manuscripts — including copies of the Canon, Kitāb al-Hāwī, and Ibn al-Nafīs\'s Commentary — are held in European national libraries. The Canon alone survives in hundreds of Arabic and Latin manuscripts.', loot:'The physical evidence of the transmission. The Bibliothèque nationale holds the oldest surviving Arabic Canon (12th century). The Bodleian holds Ibn al-Nafīs\'s manuscript — the one that was not rediscovered until 1924.', image:'/images/sdam-med/alrazi-muslim-heritage-1.jpg', imageAlt:'Authentic Arabic medical illustration from the Islamic tradition', source:'Muslim Heritage', icon: Library },
];
export default function MedLibraryTheftSection() {
  const tCommon = useTranslations('Common');
  const tSections = useTranslations('Sections');
  const tH = useTranslations('Headings');
  return (
    <section id="theft" className="relative min-h-screen flex flex-col items-center justify-center px-6 py-24 overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-b from-cosmos via-cosmos-deep to-cosmos pointer-events-none" />
      <div className="absolute inset-0 opacity-[0.03] pointer-events-none" style={{ backgroundImage: 'radial-gradient(circle at 30% 50%, rgba(107, 29, 42, 0.4) 0%, transparent 50%)' }} />
      <div className="max-w-6xl w-full relative z-10">
        <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, margin: "0px 0px 50% 0px" }} transition={{ duration: 0.8 }} className="text-center mb-14">
          <p className="text-[10px] font-mono tracking-[0.4em] uppercase text-burgundy mb-4 flex items-center justify-center gap-2"><Flame className="w-3 h-3" />{tSections('LibraryTheft.chapterTitle')}</p>
          <h2 className="font-display text-4xl sm:text-6xl md:text-7xl text-cream leading-tight">{tH('LibraryTheft.med')}<br /><span className="text-gradient-gold italic">reached Europe.</span></h2>
          <p className="mt-6 text-cream-dim max-w-2xl mx-auto text-sm sm:text-base leading-relaxed">The Canon of Medicine — Europe&apos;s medical textbook for 600 years — did not arrive in France by accident. It arrived through the Toledo translation (12th c.), the fall of Constantinople (1453), and 500 years of use at European universities. The Arabic authors were renamed. The clinical method was claimed as European. The evidence is in every European medical library.</p>
        </motion.div>
        <div className="space-y-5">
          {THEFTS.map((theft, i) => {
            const Icon = theft.icon;
            return (
              <motion.article key={theft.id} initial={{ opacity: 0, x: i % 2 === 0 ? -30 : 30 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true, margin: "0px 0px 50% 0px" }} transition={{ duration: 0.7, delay: i * 0.05 }} className={`glass-card rounded-2xl overflow-hidden flex flex-col sm:flex-row ${i % 2 === 0 ? 'sm:flex-row' : 'sm:flex-row-reverse'}`}>
                <div className="relative sm:w-2/5 aspect-[4/3] sm:aspect-[4/3] overflow-hidden flex-shrink-0">
                  <Image src={theft.image} alt={theft.imageAlt} fill sizes="(max-width: 640px) 100vw, 40vw" className="object-cover" />
                  <div className="absolute inset-0 bg-gradient-to-t from-cosmos-deep/80 via-transparent to-transparent sm:bg-gradient-to-r" />
                  <div className="absolute top-4 left-4 w-10 h-10 rounded-full bg-burgundy/80 border border-burgundy flex items-center justify-center backdrop-blur-md"><Icon className="w-5 h-5 text-cream" /></div>
                  <div className="absolute top-4 right-4 px-2.5 py-1 rounded-full bg-cosmos/80 border border-gold/30 backdrop-blur-md"><span className="text-[9px] font-mono uppercase tracking-widest text-gold/80">{tCommon('incident')}{theft.id}</span></div>
                </div>
                <div className="p-5 sm:p-6 flex-1 flex flex-col">
                  <div className="flex items-baseline gap-3 mb-2"><span className="text-burgundy font-mono text-sm tracking-wider">{theft.year}</span><span className="h-px flex-1 bg-gold/20" /><span className="text-cream-dim/70 text-[10px] font-mono uppercase tracking-wider">{theft.location}</span></div>
                  <h3 className="font-display text-xl sm:text-2xl text-cream italic leading-tight mb-2">{theft.event}</h3>
                  <p className="text-cream-dim text-xs mb-3">{tCommon('perpetrator')} <span className="text-cream/85">{theft.actor}</span></p>
                  <p className="text-cream/85 text-xs sm:text-sm leading-relaxed mb-3">{theft.mechanism}</p>
                  <div className="border-l-2 border-burgundy/60 pl-3 py-1 mb-3"><p className="text-[10px] font-mono uppercase tracking-widest text-burgundy/80 mb-1 flex items-center gap-1"><Scroll className="w-3 h-3" /> {tCommon('whatWasTaken')}</p><p className="text-cream/90 text-xs leading-relaxed">{theft.loot}</p></div>
                  <p className="text-[10px] font-mono uppercase tracking-widest text-gold/60 mt-auto pt-3 border-t border-gold/15">{tCommon('source')} {theft.source}</p>
                </div>
              </motion.article>
            );
          })}
        </div>
        <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, margin: "0px 0px 50% 0px" }} transition={{ duration: 0.8, delay: 0.4 }} className="mt-16 text-center max-w-3xl mx-auto">
          <div className="glass-card-gold rounded-2xl p-6 sm:p-8 glow-gold">
            <ArrowRight className="w-6 h-6 text-gold mx-auto mb-3" />
            <p className="font-display text-xl sm:text-2xl text-cream italic leading-snug mb-4">European &ldquo;Renaissance medicine&rdquo; was built on a 600-year-old Arabic textbook.</p>
            <p className="text-cream/85 text-xs sm:text-sm leading-relaxed">Vesalius studied the Canon at Padua. Harvey studied the Canon at Padua. The clinical trial method was in the Canon. The contagion theory was in the Canon. The pulmonary circulation correction was in Ibn al-Nafīs&apos;s Commentary on the Canon. Every European physician from 1181 to the 17th century learned medicine from &ldquo;Avicenna.&rdquo; The Arabic authors were renamed. The European &ldquo;discoverers&rdquo; took the credit.</p>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
