'use client';

import { motion } from 'framer-motion';
import Image from 'next/image';
import { Library, Flame, Sword, Crown, Scroll, ArrowRight } from 'lucide-react';
import { useTranslations } from 'next-intl';

interface Theft {
  id: number;
  year: string;
  event: string;
  actor: string;
  location: string;
  mechanism: string;
  loot: string;
  image: string;
  imageAlt: string;
  source: string;
  icon: typeof Flame;
}

const THEFTS: Theft[] = [
  {
    id: 1,
    year: '1099 CE',
    event: 'Crusader sack of Jerusalem',
    actor: 'European Crusader armies',
    location: 'Jerusalem',
    mechanism: 'Military conquest followed by systematic looting of Islamic libraries. Manuscripts carried back to European monasteries.',
    loot: 'Hundreds of Arabic scientific manuscripts — including works on mathematics, astronomy, and medicine. Many were later "translated" without attribution.',
    image: '/images/sdam-calculus/crusades-byzantine.jpg',
    imageAlt: 'Authentic Byzantine manuscript illumination depicting figures in ceremonial attire from the Crusades era',
    source: 'Byzantine manuscript collection',
    icon: Sword,
  },
  {
    id: 2,
    year: '1204 CE',
    event: 'Sack of Constantinople',
    actor: 'Fourth Crusade (Venetian-led)',
    location: 'Constantinople (Istanbul)',
    mechanism: 'Crusaders diverted from Egypt to attack Constantinople. Carried off Greek AND Arabic manuscripts that had been preserved in Byzantine libraries for centuries.',
    loot: 'The largest single transfer of scientific manuscripts in medieval history. Venetian and French libraries filled with looted Arabic and Greek works on mathematics, optics, astronomy.',
    image: '/images/sdam-calculus/crusades-alamy-2.jpg',
    imageAlt: 'Authentic historical painting of a medieval battle scene with armored soldiers and a coastal cityscape',
    source: 'Alamy (historical reproduction)',
    icon: Sword,
  },
  {
    id: 3,
    year: '1492 CE',
    event: 'Fall of Granada + burning of Andalusian libraries',
    actor: 'Spanish Catholic Monarchs (Ferdinand & Isabella)',
    location: 'Granada, al-Andalus',
    mechanism: 'After the Reconquista, Cardinal Cisneros ordered the burning of an estimated 1,000,000+ Arabic manuscripts from the libraries of Granada. Scientific works were destroyed alongside religious texts. A surviving fragment was carried off by Spanish scholars.',
    loot: 'The greatest library destruction in medieval history. The 700-year Andalusian scientific tradition — algebra, astronomy, medicine, optics — was largely erased. Surviving manuscripts went to Spanish royal collections.',
    image: '/images/sdam-calculus/granada-invictus-1.jpg',
    imageAlt: 'Authentic historical illustration of a medieval caravan or travelers in a mountainous landscape',
    source: 'INVICTUS (historical reproduction)',
    icon: Flame,
  },
  {
    id: 4,
    year: '1798–1801 CE',
    event: 'Napoleon\'s Egyptian expedition',
    actor: 'Napoleon Bonaparte + 167 French scholars',
    location: 'Egypt',
    mechanism: 'Napoleon invaded Egypt with an army of 36,000 soldiers AND 167 civilian scholars (the "Commission des Sciences et Arts"). They systematically catalogued and removed Arabic manuscripts, monuments, and antiquities. The findings were published in the 23-volume Description de l\'Égypte (1809–1829).',
    loot: 'Thousands of Arabic manuscripts + the Rosetta Stone (later seized by the British). French scholars translated, published, and took credit for "discovering" knowledge that had been in continuous Arabic use for a millennium.',
    image: '/images/sdam-calculus/napoleon-thinking-3d-1.jpg',
    imageAlt: 'Authentic 18th-century illustration of scholars gathered around a scientific experiment',
    source: 'Thinking 3D',
    icon: Crown,
  },
  {
    id: 5,
    year: '1858–1947 CE',
    event: 'British colonial administration of India',
    actor: 'British East India Company + British Crown',
    location: 'India',
    mechanism: 'Under colonial rule, British administrators systematically acquired Sanskrit and Arabic manuscripts from Indian libraries, temples, and private collections. These were shipped to the British Library, the Bodleian, and Cambridge. The Kerala school manuscripts — including Mādhava\'s infinite series — were among them.',
    loot: 'Tens of thousands of manuscripts. The British Library\'s Oriental and India Office Collections holds ~66,000 manuscripts looted or "acquired" during this period. Many were catalogued under British scholars\' names.',
    image: '/images/sdam-calculus/british-bayerische.jpg',
    imageAlt: 'Authentic Orientalist manuscript page from a colonial-era European library collection',
    source: 'Bayerische Staatsbibliothek',
    icon: Crown,
  },
  {
    id: 6,
    year: 'Ongoing',
    event: 'The Vatican Library + European national collections',
    actor: 'Vatican Library, Bibliothèque nationale, British Library',
    location: 'Rome, Paris, London',
    mechanism: 'The accumulated loot of centuries of Crusades, colonial administration, and "diplomatic" acquisition. The Vatican Library alone holds thousands of Arabic scientific manuscripts — many never returned to their countries of origin.',
    loot: 'The surviving manuscripts on which Newton, Leibniz, and their successors worked. These are the books European scholars "translated" — and from which they derived theorems they then claimed as their own.',
    image: '/images/sdam-calculus/vatican-iqs.jpg',
    imageAlt: 'Authentic Arabic manuscript page from the Vatican Library collection',
    source: 'International Qur\'anic Studies / Vatican Library',
    icon: Library,
  },
];

export default function LibraryTheftSection() {
  const tCommon = useTranslations('Common');
  const tSections = useTranslations('Sections');
  const tH = useTranslations('Headings');
  return (
    <section
      id="theft"
      className="relative min-h-screen flex flex-col items-center justify-center px-6 py-24 overflow-hidden"
    >
      {/* Dark, ominous backdrop */}
      <div className="absolute inset-0 bg-gradient-to-b from-cosmos via-cosmos-deep to-cosmos pointer-events-none" />
      <div
        className="absolute inset-0 opacity-[0.03] pointer-events-none"
        style={{
          backgroundImage:
            'radial-gradient(circle at 30% 50%, rgba(107, 29, 42, 0.4) 0%, transparent 50%), radial-gradient(circle at 70% 80%, rgba(107, 29, 42, 0.3) 0%, transparent 40%)',
        }}
      />

      <div className="max-w-6xl w-full relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "0px 0px 15% 0px" }}
          transition={{ duration: 0.8 }}
          className="text-center mb-14"
        >
          <p className="text-[10px] font-mono tracking-[0.4em] uppercase text-burgundy mb-4 flex items-center justify-center gap-2">
            <Flame className="w-3 h-3" />
            {tSections('LibraryTheft.chapterTitle')}
          </p>
          <h2 className="font-display text-4xl sm:text-6xl md:text-7xl text-cream leading-tight">
            {tH('LibraryTheft.calculus')}
            <br />
            <span className="text-gradient-gold italic">reached Europe.</span>
          </h2>
          <p className="mt-6 text-cream-dim max-w-2xl mx-auto text-sm sm:text-base leading-relaxed">
            The books Newton and Leibniz read did not arrive in Cambridge and
            Paris by chance. They arrived by conquest, looting, and colonial
            administration. Six episodes — spanning 800 years — transferred the
            Islamic world&apos;s scientific patrimony to European libraries.
            Some were translated. Many were destroyed. The theorems survived
            under European names.
          </p>
        </motion.div>

        {/* The timeline of thefts */}
        <div className="space-y-5">
          {THEFTS.map((theft, i) => {
            const Icon = theft.icon;
            return (
              <motion.article
                key={theft.id}
                initial={{ opacity: 0, x: i % 2 === 0 ? -30 : 30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, margin: "0px 0px 15% 0px" }}
                transition={{ duration: 0.7, delay: i * 0.05 }}
                className={`glass-card rounded-2xl overflow-hidden flex flex-col sm:flex-row ${
                  i % 2 === 0 ? 'sm:flex-row' : 'sm:flex-row-reverse'
                }`}
              >
                {/* Image */}
                <div className="relative sm:w-2/5 aspect-[4/3] sm:aspect-[4/3] overflow-hidden flex-shrink-0">
                  <Image
                    src={theft.image}
                    alt={theft.imageAlt}
                    fill
                    sizes="(max-width: 640px) 100vw, 40vw"
                    className="object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-cosmos-deep/80 via-transparent to-transparent sm:bg-gradient-to-r" />
                  <div className="absolute top-4 left-4 w-10 h-10 rounded-full bg-burgundy/80 border border-burgundy flex items-center justify-center backdrop-blur-md">
                    <Icon className="w-5 h-5 text-cream" />
                  </div>
                  <div className="absolute top-4 right-4 px-2.5 py-1 rounded-full bg-cosmos/80 border border-gold/30 backdrop-blur-md">
                    <span className="text-[9px] font-mono uppercase tracking-widest text-gold/80">
                      {tCommon('incident')}{theft.id}
                    </span>
                  </div>
                </div>

                {/* Body */}
                <div className="p-5 sm:p-6 flex-1 flex flex-col">
                  <div className="flex items-baseline gap-3 mb-2">
                    <span className="text-burgundy font-mono text-sm tracking-wider">
                      {theft.year}
                    </span>
                    <span className="h-px flex-1 bg-gold/20" />
                    <span className="text-cream-dim/70 text-[10px] font-mono uppercase tracking-wider">
                      {theft.location}
                    </span>
                  </div>
                  <h3 className="font-display text-xl sm:text-2xl text-cream italic leading-tight mb-2">
                    {theft.event}
                  </h3>
                  <p className="text-cream-dim text-xs mb-3">
                    {tCommon('perpetrator')} <span className="text-cream/85">{theft.actor}</span>
                  </p>
                  <p className="text-cream/85 text-xs sm:text-sm leading-relaxed mb-3">
                    {theft.mechanism}
                  </p>
                  <div className="border-l-2 border-burgundy/60 pl-3 py-1 mb-3">
                    <p className="text-[10px] font-mono uppercase tracking-widest text-burgundy/80 mb-1 flex items-center gap-1">
                      <Scroll className="w-3 h-3" /> {tCommon('whatWasTaken')}
                    </p>
                    <p className="text-cream/90 text-xs leading-relaxed">
                      {theft.loot}
                    </p>
                  </div>
                  <p className="text-[10px] font-mono uppercase tracking-widest text-gold/60 mt-auto pt-3 border-t border-gold/15">
                    {tCommon('source')} {theft.source}
                  </p>
                </div>
              </motion.article>
            );
          })}
        </div>

        {/* Closing statement */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "0px 0px 15% 0px" }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="mt-16 text-center max-w-3xl mx-auto"
        >
          <div className="glass-card-gold rounded-2xl p-6 sm:p-8 glow-gold">
            <ArrowRight className="w-6 h-6 text-gold mx-auto mb-3" />
            <p className="font-display text-xl sm:text-2xl text-cream italic leading-snug mb-4">
              The European &ldquo;scientific revolution&rdquo; was built on
              manuscripts acquired by conquest.
            </p>
            <p className="text-cream/85 text-xs sm:text-sm leading-relaxed">
              Newton and Leibniz were brilliant. They unified the calculus.
              But the theorems they unified — the sum of fourth powers, the
              derivative criterion, the infinite series — were already in
              writing, in manuscripts their societies had acquired through
              Crusades, Reconquista, and colonial administration. The Arabic
              authors were renamed &ldquo;Alhazen&rdquo; or simply unnamed. The
              European &ldquo;discoverers&rdquo; took the credit. The pattern
              is consistent across 800 years.
            </p>
            <p className="text-cream-dim text-[10px] mt-4 italic">
              This is not a conspiracy theory. It is documented history. The
              Vatican Library, the British Library, the Bibliothèque nationale,
              and the Bodleian all hold the physical evidence — Arabic and
              Sanskrit manuscripts acquired during these episodes, still
              catalogued under their European accession numbers.
            </p>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
