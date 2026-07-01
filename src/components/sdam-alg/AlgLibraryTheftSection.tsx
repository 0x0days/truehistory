'use client';
import { motion } from 'framer-motion';
import Image from 'next/image';
import { Library, Flame, Crown, Scroll, ArrowRight, BookOpen } from 'lucide-react';
import { useTranslations } from 'next-intl';
interface Theft { id: number; year: string; event: string; actor: string; location: string; mechanism: string; loot: string; image: string; imageAlt: string; source: string; icon: typeof Flame; }
const THEFTS: Theft[] = [
  { id:1, year:'1145 CE', event:'Robert of Chester translates al-Jabr into Latin', actor:'Robert of Chester + Toledo school', location:'Toledo, al-Andalus', mechanism:'Robert of Chester produced the first Latin translation of al-Khwārizmī\'s al-Jabr — titled "Liber Algebrae et Almucabola." The Arabic title became the Latin discipline. The Arabic author was renamed "Algoritmi."', loot:'The word "algebra" (from al-Jabr) entered Latin — and then every European language. The word "algorithm" (from Algoritmi = al-Khwārizmī) entered Latin. The methods crossed. The author was reduced to a word.', image:'/images/sdam-alg/algorismus-renaissance-1.jpg', imageAlt:'Authentic medieval Latin mathematical manuscript page with geometric diagrams', source:'The Renaissance Mathematicus (manuscript reproduction)', icon: Crown },
  { id:2, year:'12th c. CE', event:'The Latin "Algoritmi" — his name becomes a word', actor:'Latin translators of Toledo', location:'Toledo → European universities', mechanism:'The Latin title of al-Khwārizmī\'s book on Hindu calculation was "Algoritmi de numero Indorum" — "Al-Khwārizmī on Indian Numbers." European scholars assumed "Algoritmi" was a method, not a name. The word "algorismus" entered medieval Latin as a common noun meaning "the method of calculating with Arabic numerals."', loot:'The word "algorithm" — which now means "a step-by-step procedure for computation" in every language on Earth. The man whose name it was — Muḥammad ibn Mūsā al-Khwārizmī — was forgotten. His name survived as a word. He did not survive as a person.', image:'/images/sdam-alg/algorismus-renaissance-2.jpg', imageAlt:'Authentic medieval Latin manuscript with mathematical text and diagrams', source:'The Renaissance Mathematicus (manuscript reproduction)', icon: BookOpen },
  { id:3, year:'1202 CE', event:'Fibonacci publishes Liber Abaci — crediting "the Arabs"', actor:'Leonardo Fibonacci', location:'Pisa, Italy', mechanism:'Fibonacci\'s Liber Abaci (1202) introduced Hindu-Arabic numerals to European commerce and mathematics. Fibonacci explicitly credits "the Indians and the Arabs" in the preface. But the European tradition that followed credited Fibonacci — not al-Khwārizmī.', loot:'The credit for "bringing Arabic numerals to Europe." The credit for "introducing algebra to the West." The Liber Abaci is directly based on al-Khwārizmī\'s methods — Fibonacci says so himself. But 800 years of textbooks credit Fibonacci.', image:'/images/sdam-alg/fibonacci-facsimile-2.jpg', imageAlt:'Authentic page from Fibonacci\'s Liber Abaci showing mathematical text', source:'Facsimile Finder (manuscript reproduction)', icon: Scroll },
  { id:4, year:'1492 – 1500s CE', event:'European "algebra" — built on al-Khwārizmī\'s framework', actor:'Pacioli, Cardano, Tartaglia, Vieta', location:'Italy / France', mechanism:'The Italian algebraists (Pacioli 1494, Cardano 1545, Tartaglia) and the French formalizer Vieta (1591) all built on the framework al-Khwārizmī had established 700 years earlier. Completing the square, the quadratic formula, systematic equation-solving — all were in al-Jabr.', loot:'The credit for "inventing algebra." Pacioli, Cardano, and Vieta are credited as the founders of European algebra. None of them cited al-Khwārizmī by his full name. The word "algebra" — which IS the title of his book — was treated as a European term.', image:'/images/sdam-alg/algorismus-christies.jpg', imageAlt:'Authentic medieval manuscript with Latin text and astronomical/geometric diagrams', source: "Christie's (manuscript reproduction)", icon: Flame },
  { id:5, year:'1936 CE', event:'Turing formalizes the algorithm — without naming al-Khwārizmī', actor:'Alan Turing', location:'Cambridge, England', mechanism:'Turing\'s 1936 paper "On Computable Numbers" formalized the concept of an algorithm as a mathematical object (the Turing machine). Turing is credited with "inventing the algorithm." The word he used — "algorithm" — IS al-Khwārizmī\'s name. Turing formalized what al-Khwārizmī had systematized 1,116 years earlier.', loot:'The credit for "inventing the algorithm." Every computer science textbook credits Turing. None mention that the word "algorithm" is a Latinized form of the name of the man who systematized the concept — al-Khwārizmī, c. 820 CE.', image:'/images/sdam-alg/numerals-pbs.jpg', imageAlt:'Historical illustration of Arabic numerals and mathematical notation', source:'PBS (educational reproduction)', icon: BookOpen },
  { id:6, year:'Ongoing', event:'Every computer on Earth runs on his name', actor:'Every programmer, every computer, every algorithm', location:'Worldwide', mechanism:'Every line of code ever written, every algorithm ever designed, every computation ever performed uses the word "algorithm" — which IS al-Khwārizmī\'s name. The number system (0–9 with place value) that every computer uses was transmitted by al-Khwārizmī. The algebra that underlies computer science was systematized by al-Khwārizmī.', loot:'The name "algorithm" — used billions of times per day, in every programming language, by every programmer, on every computer. The man behind the word is unknown to most of them. His name is everywhere. He is nowhere.', image:'/images/sdam-alg/khwarizmi-muslim-heritage-3.jpg', imageAlt:'Authentic Arabic mathematical manuscript page with geometric diagrams', source:'Muslim Heritage', icon: Library },
];
export default function AlgLibraryTheftSection() {
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
          <h2 className="font-display text-4xl sm:text-6xl md:text-7xl text-cream leading-tight">{tH('LibraryTheft.alg')}<br /><span className="text-gradient-gold italic">He became nobody.</span></h2>
          <p className="mt-6 text-cream-dim max-w-2xl mx-auto text-sm sm:text-base leading-relaxed">No other SDAM case has this paradox. The word &ldquo;algorithm&rdquo; IS al-Khwārizmī&apos;s name — used billions of times per day on every computer on Earth. And yet most programmers do not know whose name they are using. The Toledo translation (1145) turned his name into a word. Fibonacci (1202) spread his methods without crediting him by full name. Turing (1936) formalized the concept without mentioning the etymology. His name is everywhere. He is nowhere.</p>
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
            <p className="font-display text-xl sm:text-2xl text-cream italic leading-snug mb-4">Every algorithm ever written carries his name. He is unknown to most programmers.</p>
            <p className="text-cream/85 text-xs sm:text-sm leading-relaxed">This is the cruelest erasure in the SDAM collection. Al-Khwārizmī&apos;s name survived — as a word. But the person was erased. The word &ldquo;algorithm&rdquo; is used billions of times per day. The man behind it is a footnote. The Toledo translators turned his name into a noun. Fibonacci spread his methods without crediting him by full name. Turing formalized the concept without mentioning the etymology. The name is everywhere. The person is nowhere.</p>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
