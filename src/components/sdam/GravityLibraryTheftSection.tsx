'use client';

import { motion } from 'framer-motion';
import Image from 'next/image';
import { Library, Flame, Sword, Crown, Scroll, ArrowRight, Ship } from 'lucide-react';
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
    mechanism: 'Military conquest followed by systematic looting of Islamic libraries. Manuscripts carried back to European monasteries. The first mass transfer of Arabic physics and mathematics manuscripts to Europe.',
    loot: 'Hundreds of Arabic scientific manuscripts — including works on mechanics, hydrostatics, and the science of weights (ʿilm al-ḥiyal) that al-Khāzini had refined. Many were later "translated" without attribution.',
    image: '/images/sdam-calculus/crusades-byzantine.jpg',
    imageAlt: 'Authentic Byzantine manuscript illumination depicting figures in ceremonial attire from the Crusades era',
    source: 'Byzantine manuscript collection',
    icon: Sword,
  },
  {
    id: 2,
    year: '1085 CE',
    event: 'Capture of Toledo',
    actor: 'King Alfonso VI of Castile',
    location: 'Toledo, al-Andalus',
    mechanism: 'Toledo\'s libraries — filled with 400 years of Arabic science — fell intact. A systematic translation school was established. Gerard of Cremona alone translated 87 Arabic scientific books into Latin, including works on mechanics and statics.',
    loot: 'The Toledo translation movement (12th–13th c.) transferred the entire Arabic physics corpus into Latin. Al-Khāzini\'s hydrostatic balance became the "science of weights" (scientia de ponderibus) in Latin Europe — the foundation that Galileo and Newton would inherit.',
    image: '/images/sdam-astro/toledo-sothebys.jpg',
    imageAlt: 'Authentic medieval Latin manuscript page from the Toledo translation tradition with heraldic decoration',
    source: "Sotheby's (Latin manuscript reproduction)",
    icon: Crown,
  },
  {
    id: 3,
    year: '1204 CE',
    event: 'Sack of Constantinople',
    actor: 'Fourth Crusade (Venetian-led)',
    location: 'Constantinople (Istanbul)',
    mechanism: 'Crusaders diverted from Egypt to attack Constantinople. Carried off Greek AND Arabic manuscripts that had been preserved in Byzantine libraries for centuries — including works on mechanics and the science of weights.',
    loot: 'The largest single transfer of scientific manuscripts in medieval history. Venetian and French libraries filled with looted Arabic works on physics, hydrostatics, and statics — the exact tradition al-Khāzini had developed.',
    image: '/images/sdam-calculus/crusades-alamy-2.jpg',
    imageAlt: 'Authentic historical painting of a medieval battle scene with armored soldiers and a coastal cityscape',
    source: 'Alamy (historical reproduction)',
    icon: Ship,
  },
  {
    id: 4,
    year: '1492 CE',
    event: 'Fall of Granada + burning of Andalusian libraries',
    actor: 'Ferdinand & Isabella / Cardinal Cisneros',
    location: 'Granada, al-Andalus',
    mechanism: 'After the Reconquista, Cardinal Cisneros ordered the burning of an estimated 1,000,000+ Arabic manuscripts from Granada\'s libraries. Works on physics, mechanics, and hydrostatics were destroyed alongside religious texts. A surviving fragment was carried off by Spanish scholars.',
    loot: 'The 700-year Andalusian scientific tradition — including the Arabic mechanics that al-Khāzini had refined — was largely erased. Surviving manuscripts reached European scholars via Spanish royal collections, often without attribution.',
    image: '/images/sdam-calculus/granada-invictus-1.jpg',
    imageAlt: 'Authentic historical illustration of a medieval caravan or travelers in a mountainous landscape',
    source: 'INVICTUS (historical reproduction)',
    icon: Flame,
  },
  {
    id: 5,
    year: '1500s CE',
    event: 'European scholastics inherit the "science of weights"',
    actor: 'Jordanus de Nemore, Galileo, Newton',
    location: 'Paris, Padua, Cambridge',
    mechanism: 'The Arabic "science of weights" (ʿilm al-thiqāl) that al-Khāzini had systematized reached Europe via the Toledo and Constantinople transmissions. Jordanus de Nemore (c. 1200) wrote on positional gravity — directly traceable to Arabic statics. Galileo inherited the tradition at Padua. Newton inherited it from Galileo.',
    loot: 'The conceptual foundation of European mechanics. The variable-weight theorem that al-Khāzini stated in 1121 — "gravity varies with distance from the Earth\'s center" — entered European physics as an inherited assumption. Newton formalized it mathematically. He did not cite al-Khāzini.',
    image: '/images/sdam-real/manuscript-2.jpg',
    imageAlt: 'Authentic medieval Arabic scientific manuscript page with diagrams',
    source: 'Alamy (library reproduction)',
    icon: Scroll,
  },
  {
    id: 6,
    year: 'Ongoing',
    event: 'European national libraries hold the evidence',
    actor: 'Vatican Library, Bodleian, Bibliothèque nationale',
    location: 'Rome, Oxford, Paris',
    mechanism: 'The accumulated loot of centuries of Crusades, Reconquista, and "diplomatic" acquisition. The Vatican Library alone holds hundreds of Arabic scientific manuscripts — including works on mechanics and hydrostatics in the tradition of al-Khāzini.',
    loot: 'The surviving manuscripts on which Galileo and Newton\'s predecessors worked. These are the books European scholars "translated" — and from which they derived theorems they then claimed as their own. The physical evidence is still catalogued under European accession numbers.',
    image: '/images/sdam-calculus/vatican-iqs.jpg',
    imageAlt: 'Authentic Arabic manuscript page from the Vatican Library collection',
    source: 'International Qur\'anic Studies / Vatican Library',
    icon: Library,
  },
];

export default function GravityLibraryTheftSection() {
  const tCommon = useTranslations('Common');
  const tSections = useTranslations('Sections');
  const tH = useTranslations('Headings');
  return (
    <section
      id="theft"
      className="relative min-h-screen flex flex-col items-center justify-center px-6 py-24 overflow-hidden"
    >
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
          viewport={{ once: true, margin: "0px 0px 50% 0px" }}
          transition={{ duration: 0.8 }}
          className="text-center mb-14"
        >
          <p className="text-[10px] font-mono tracking-[0.4em] uppercase text-burgundy mb-4 flex items-center justify-center gap-2">
            <Flame className="w-3 h-3" />
            {tSections('LibraryTheft.chapterTitle')}
          </p>
          <h2 className="font-display text-4xl sm:text-6xl md:text-7xl text-cream leading-tight">
            {tH('LibraryTheft.gravity')}
            <br />
            <span className="text-gradient-gold italic">reached Europe.</span>
          </h2>
          <p className="mt-6 text-cream-dim max-w-2xl mx-auto text-sm sm:text-base leading-relaxed">
            The physics Newton inherited did not arrive in Cambridge by chance.
            It arrived by conquest, looting, and colonial administration. Six
            episodes — spanning 800 years — transferred the Islamic world&apos;s
            scientific patrimony to European libraries. Al-Khāzini&apos;s
            hydrostatics became the European &ldquo;science of weights.&rdquo;
            The Arabic author was renamed. The European &ldquo;discoverer&rdquo;
            took the credit.
          </p>
        </motion.div>

        <div className="space-y-5">
          {THEFTS.map((theft, i) => {
            const Icon = theft.icon;
            return (
              <motion.article
                key={theft.id}
                initial={{ opacity: 0, x: i % 2 === 0 ? -30 : 30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, margin: "0px 0px 50% 0px" }}
                transition={{ duration: 0.7, delay: i * 0.05 }}
                className={`glass-card rounded-2xl overflow-hidden flex flex-col sm:flex-row ${
                  i % 2 === 0 ? 'sm:flex-row' : 'sm:flex-row-reverse'
                }`}
              >
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

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "0px 0px 50% 0px" }}
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
              Newton was brilliant. His inverse-square law was a genuine
              mathematical synthesis. But the foundational discovery — that
              gravity is a variable force directed toward the Earth&apos;s
              center — was already in writing in al-Khāzini&apos;s <em>Mīzān
              al-ḥikma</em> (1121 CE). The manuscript reached Europe through
              the Crusades (1099, 1204), the fall of Granada (1492), and the
              Toledo translation. Al-Khāzini was renamed &ldquo;Alhazen&rdquo;
              or unnamed. Newton took the credit.
            </p>
            <p className="text-cream-dim text-[10px] mt-4 italic">
              This is not a conspiracy theory. It is documented history. The
              Vatican Library, the British Library, the Bibliothèque nationale,
              and the Bodleian all hold the physical evidence — Arabic
              scientific manuscripts acquired during these episodes, still
              catalogued under their European accession numbers.
            </p>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
