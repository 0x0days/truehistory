'use client';
import { motion } from 'framer-motion';
import Image from 'next/image';
import { BookOpen, Sigma, Hash, Languages, Library, Scroll } from 'lucide-react';
import { useTranslations } from 'next-intl';
const EVIDENCE = [
  { image: '/images/sdam-alg/khwarizmi-muslim-heritage-1.jpg', icon: Sigma, title: 'al-Khwārizmī · Arabic mathematical manuscript', source: 'Source: Muslim Heritage', detail: 'An authentic page from an Arabic mathematical manuscript in the tradition of al-Khwārizmī. Visible: geometric diagrams and Arabic calligraphic mathematical text. This is the primary source tradition — the actual words in which systematic algebra was first stated.', aspect: 'aspect-[3/4]' },
  { image: '/images/sdam-alg/khwarizmi-renaissance.png', icon: BookOpen, title: 'Latin translation of al-Khwārizmī', source: 'Source: The Renaissance Mathematicus', detail: 'An authentic page from the Latin translation of al-Khwārizmī\'s mathematical works — the edition that carried "algebra" and "algorithm" into European mathematics. The Arabic author was renamed "Algoritmi." His name became a word.', aspect: 'aspect-[3/4]' },
  { image: '/images/sdam-alg/fibonacci-facsimile-1.jpg', icon: BookOpen, title: 'Fibonacci · Liber Abaci (1202)', source: 'Source: Facsimile Finder', detail: 'An authentic page from Fibonacci\'s Liber Abaci — the book that brought Hindu-Arabic numerals and algebraic methods to Europe. Fibonacci explicitly credits "the Indians and the Arabs." The European tradition credited Fibonacci.', aspect: 'aspect-[3/4]' },
  { image: '/images/sdam-alg/algorismus-renaissance-1.jpg', icon: Languages, title: 'Latin "Algoritmi" manuscript', source: 'Source: The Renaissance Mathematicus', detail: 'An authentic medieval Latin manuscript from the "Algoritmi" tradition — the Latinized form of al-Khwārizmī\'s name that became the word "algorithm." European scholars assumed "Algoritmi" was a method, not a person. The word entered every European language.', aspect: 'aspect-[3/4]' },
  { image: '/images/sdam-alg/numerals-pbs.jpg', icon: Hash, title: 'Hindu-Arabic numerals — the number system', source: 'Source: PBS (educational reproduction)', detail: 'The Hindu-Arabic numeral system (0–9 with place value) that al-Khwārizmī transmitted to the Islamic world and, through Latin translation, to Europe. Every number ever written on a computer uses this system. The zero — the most important digit — was introduced by al-Khwārizmī.', aspect: 'aspect-[3/4]' },
  { image: '/images/sdam-alg/algorismus-christies.jpg', icon: Library, title: 'Latin mathematical manuscript — the "European" algebra', source: "Source: Christie's", detail: 'An authentic medieval Latin mathematical manuscript — the type that built on al-Khwārizmī\'s framework for 700 years. The word "algebra" (from his book title al-Jabr) was treated as a European term. The Arabic author was forgotten.', aspect: 'aspect-[4/3]' },
];
export default function AlgManuscriptEvidenceSection() {
  const tSections = useTranslations('Sections');
  return (
    <section id="evidence" className="relative min-h-screen flex flex-col items-center justify-center px-6 py-24 manuscript-bg overflow-hidden">
      <div className="max-w-6xl w-full relative z-10">
        <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, margin: "0px 0px 15% 0px" }} transition={{ duration: 0.8 }} className="text-center mb-14">
          <p className="text-[10px] font-mono tracking-[0.4em] uppercase text-gold/70 mb-4">{tSections('ManuscriptEvidence.chapterTitle')}</p>
          <h2 className="font-display text-4xl sm:text-6xl md:text-7xl text-cream leading-tight">Real manuscripts.<br /><span className="text-gradient-gold italic">Real words.</span></h2>
          <p className="mt-6 text-cream-dim max-w-2xl mx-auto text-sm sm:text-base">Every image below is an authentic historical artifact — an Arabic mathematical manuscript, a Latin translation, or a Fibonacci facsimile. The evidence is not just in the manuscripts — it is in the words themselves. &ldquo;Algorithm&rdquo; IS his name. &ldquo;Algebra&rdquo; IS his book.</p>
        </motion.div>
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {EVIDENCE.map((item, i) => {
            const Icon = item.icon;
            return (
              <motion.figure key={item.title} initial={{ opacity: 0, y: 40 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, margin: "0px 0px 15% 0px" }} transition={{ duration: 0.7, delay: (i % 3) * 0.1 }} className="glass-card-gold rounded-2xl overflow-hidden group flex flex-col">
                <div className={`relative ${item.aspect} overflow-hidden`}>
                  <Image src={item.image} alt={item.title} fill sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw" className="object-cover transition-transform duration-1000 group-hover:scale-105" />
                  <div className="absolute inset-0 bg-gradient-to-t from-cosmos-deep/80 via-transparent to-transparent" />
                  <div className="absolute top-4 left-4 w-10 h-10 rounded-full glass-card-gold flex items-center justify-center backdrop-blur-md"><Icon className="w-5 h-5 text-gold" /></div>
                  <div className="absolute top-4 right-4 px-2.5 py-1 rounded-full glass-card backdrop-blur-md"><span className="text-[9px] font-mono uppercase tracking-widest text-gold/80">Plate {i + 1}</span></div>
                </div>
                <figcaption className="p-5 flex-1 flex flex-col">
                  <h3 className="font-display text-lg text-cream italic leading-tight mb-2">{item.title}</h3>
                  <p className="text-cream/85 text-xs leading-relaxed flex-1">{item.detail}</p>
                  <p className="text-[10px] font-mono uppercase tracking-widest text-gold/70 mt-3 pt-3 border-t border-gold/15">{item.source}</p>
                </figcaption>
              </motion.figure>
            );
          })}
        </div>
      </div>
    </section>
  );
}
