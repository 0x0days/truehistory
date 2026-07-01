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
    year: '1085 CE',
    event: 'Capture of Toledo by Christian forces',
    actor: 'King Alfonso VI of Castile',
    location: 'Toledo, al-Andalus',
    mechanism: 'Toledo\'s libraries — filled with 400 years of Arabic science — fell intact. A systematic translation school was established. Gerard of Cremona alone translated 87 Arabic scientific books into Latin, including al-Battānī\'s astronomy.',
    loot: 'The Toledo translation movement (12th–13th c.) transferred the entire Arabic astronomical corpus into Latin. Al-Battānī became "Albatenius." Al-Sūfī became "Azophi." The star catalogs, the Zīj tables, the planetary models — all in Latin within 150 years, all without attribution.',
    image: '/images/sdam-astro/toledo-sothebys.jpg',
    imageAlt: 'Authentic medieval Latin manuscript page from the Toledo translation tradition with heraldic decoration',
    source: "Sotheby's (Latin manuscript reproduction)",
    icon: Crown,
  },
  {
    id: 2,
    year: '1258 CE',
    event: 'Mongol sack of Baghdad',
    actor: 'Hulagu Khan\'s Mongol army',
    location: 'Baghdad',
    mechanism: 'The Mongols destroyed the House of Wisdom (Bayt al-Ḥikma) and threw so many manuscripts into the Tigris that the river ran black with ink. Surviving astronomical and mathematical manuscripts were carried off to Maragheh — where al-Ṭūsī incorporated them into the new observatory.',
    loot: 'The greatest single loss of scientific manuscripts in history. But the Maragheh school — built with the salvage — produced the Tusi Couple and the planetary models that Copernicus would later copy.',
    image: '/images/sdam-astro/battani-light-islam.jpg',
    imageAlt: 'Authentic Arabic astronomical manuscript page from the Islamic scientific tradition',
    source: 'Light of Islam',
    icon: Flame,
  },
  {
    id: 3,
    year: '1453 CE',
    event: 'Fall of Constantinople',
    actor: 'Ottoman forces under Mehmed II',
    location: 'Constantinople (Istanbul)',
    mechanism: 'When Constantinople fell, Byzantine Greek scholars fled west to Italy — carrying with them Greek manuscripts that included Arabic astronomical works preserved in the Byzantine tradition. These manuscripts reached Italy just as Copernicus was studying there (1496–1503).',
    loot: 'The direct transmission channel for the Maragheh planetary models to Copernicus. The fall of Constantinople is the single event that made the European "rediscovery" of Arabic astronomy possible. Copernicus studied at Bologna and Padua — exactly where the fleeing scholars settled.',
    image: '/images/sdam-astro/constantinople-collector.jpg',
    imageAlt: 'Authentic medieval illustration of a siege with soldiers climbing ladders toward a castle',
    source: 'TheCollector',
    icon: Ship,
  },
  {
    id: 4,
    year: '1492 CE',
    event: 'Fall of Granada + burning of Andalusian libraries',
    actor: 'Ferdinand & Isabella / Cardinal Cisneros',
    location: 'Granada, al-Andalus',
    mechanism: 'After the Reconquista, Cardinal Cisneros ordered the burning of an estimated 1,000,000+ Arabic manuscripts from Granada\'s libraries. Astronomical tables (Zīj), star catalogs, and planetary models were destroyed alongside religious texts. A surviving fragment went to Spanish royal collections.',
    loot: 'The 700-year Andalusian astronomical tradition — the most advanced in medieval Europe — was largely erased. Surviving manuscripts (including some of al-Battānī\'s works) reached European scholars via Spanish royal collections, often without attribution.',
    image: '/images/sdam-astro/toledo-muslim-heritage.jpg',
    imageAlt: 'Authentic medieval Latin manuscript page from the translation tradition',
    source: 'Muslim Heritage',
    icon: Flame,
  },
  {
    id: 5,
    year: '1496–1503 CE',
    event: 'Copernicus studies in Italy',
    actor: 'Nicolaus Copernicus (student)',
    location: 'Bologna, Padua, Ferrara',
    mechanism: 'Copernicus studied canon law and astronomy in Italy from 1496 to 1503 — precisely the period when Byzantine Greek scholars, fleeing Constantinople, were bringing Arabic astronomical manuscripts into Italian universities. The Tusi Couple and Ibn al-Shāṭir\'s models were in circulation in the manuscripts Copernicus could read.',
    loot: 'The mathematical content of De Revolutionibus (1543). Copernicus cited "Albatenius" (al-Battānī) 23 times. He did not cite al-Ṭūsī or Ibn al-Shāṭir — though their models appear in his work, mathematically identical.',
    image: '/images/sdam-astro/copernicus-christies.jpg',
    imageAlt: 'Authentic title page of Copernicus\'s De Revolutionibus Orbium Coelestium (1543)',
    source: "Christie's",
    icon: Scroll,
  },
  {
    id: 6,
    year: 'Ongoing',
    event: 'European national libraries hold the evidence',
    actor: 'Vatican Library, Bodleian, Bibliothèque nationale',
    location: 'Rome, Oxford, Paris',
    mechanism: 'The accumulated astronomical manuscripts of the Toledo translation, the fall of Constantinople, and the Andalusian diaspora. The Vatican Library alone holds hundreds of Arabic astronomical manuscripts — including Maragheh Zīj tables and copies of al-Ṭūsī\'s Tadhkira.',
    loot: 'The physical evidence of the transmission chain. George Saliba (2007) and others have documented the mathematical identity between these manuscripts and Copernicus\'s De Revolutionibus. The manuscripts are catalogued under European accession numbers.',
    image: '/images/sdam-astro/sufi-met-2.jpg',
    imageAlt: 'Authentic medieval Arabic astronomical manuscript page from a European collection',
    source: 'The Metropolitan Museum of Art',
    icon: Library,
  },
];

export default function AstroLibraryTheftSection() {
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
            {tH('LibraryTheft.astro')}
            <br />
            <span className="text-gradient-gold italic">reached Copernicus.</span>
          </h2>
          <p className="mt-6 text-cream-dim max-w-2xl mx-auto text-sm sm:text-base leading-relaxed">
            The mathematics Copernicus published in 1543 did not appear from
            nothing. It traveled — from Maragheh and Damascus, through Toledo
            and Constantinople, into Italian universities where Copernicus
            studied. Six episodes document the transfer. The Arabic authors
            were renamed or unnamed. The European &ldquo;discoverers&rdquo; took
            the credit.
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
              Copernicus&apos;s &ldquo;revolution&rdquo; was built on Arabic
              manuscripts that reached Italy by conquest.
            </p>
            <p className="text-cream/85 text-xs sm:text-sm leading-relaxed">
              Copernicus was brilliant. His heliocentric framework was a
              genuine conceptual breakthrough. But the planetary devices he
              used — the Tusi Couple, Ibn al-Shāṭir&apos;s lunar model,
              al-Battānī&apos;s solar year — were in manuscripts that reached
              Italy through Toledo (1085), the fall of Constantinople (1453),
              and the Andalusian diaspora. Copernicus studied at Bologna and
              Padua from 1496–1503 — exactly when these manuscripts were
              entering Italian universities. He cited al-Battānī 23 times. He
              did not cite al-Ṭūsī or Ibn al-Shāṭir. The mathematical identity
              is documented. The pattern is consistent.
            </p>
            <p className="text-cream-dim text-[10px] mt-4 italic">
              This is not a conspiracy theory. The Vatican Library, the
              Bodleian, and the Bibliothèque nationale hold the physical
              evidence — Maragheh and Damascus astronomical manuscripts
              catalogued under European accession numbers, mathematically
              identical to Copernicus&apos;s published diagrams.
            </p>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
