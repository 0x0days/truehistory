'use client';

import { motion } from 'framer-motion';
import Image from 'next/image';
import { Library, Flame, Sword, Crown, Scroll, ArrowRight, Ship, Compass } from 'lucide-react';
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
    event: 'Capture of Toledo — translation of navigation tables',
    actor: 'King Alfonso VI of Castile',
    location: 'Toledo, al-Andalus',
    mechanism: 'Toledo\'s libraries fell intact. Gerard of Cremona translated 87 Arabic scientific books into Latin, including al-Fazārī\'s astrolabe treatise and the Zīj astronomical tables used for navigation.',
    loot: 'The Arabic astrolabe tradition — including Mariam al-Asturlābiyya\'s manufacturing techniques — entered Latin Europe as the "mariner\'s astrolabe." The spherical trigonometry of al-Bīrūnī became the basis for European celestial navigation. The Arabic authors were renamed or unnamed.',
    image: '/images/sdam-calculus/toledo-sothebys.jpg',
    imageAlt: 'Authentic medieval Latin manuscript page from the Toledo translation tradition',
    source: "Sotheby's (Latin manuscript reproduction)",
    icon: Crown,
  },
  {
    id: 2,
    year: '1099–1291 CE',
    event: 'Crusades — systematic looting of Islamic ports and libraries',
    actor: 'European Crusader armies',
    location: 'Levant, Eastern Mediterranean',
    mechanism: 'The Crusader states along the Levant coast gave European sailors direct contact with Arabic navigation. Crusaders captured Acre, Tyre, and Jaffa — ports where Arab navigators had perfected the kamal and the astrolabe. Italian maritime republics (Venice, Genoa) absorbed the techniques.',
    loot: 'The kamal (renamed "cross-staff"), the astrolabe (renamed "mariner\'s astrolabe"), and the portolan chart tradition — which appears in Italy (Carte Pisane, c. 1290) immediately after the Crusader period, with no documented European precursor.',
    image: '/images/sdam-nav/portolan-alamy.jpg',
    imageAlt: 'Authentic medieval portolan chart with rhumb lines and coastal outlines',
    source: 'Alamy (historical reproduction)',
    icon: Ship,
  },
  {
    id: 3,
    year: '1453 CE',
    event: 'Fall of Constantinople — astrolabes and tables flood Italy',
    actor: 'Ottoman forces / fleeing Byzantine scholars',
    location: 'Constantinople → Italy',
    mechanism: 'When Constantinople fell, Byzantine Greek scholars fled west — carrying Arabic astronomical and navigational manuscripts that had been preserved in the Byzantine tradition. These reached Italy just as the Portuguese "Age of Discovery" was beginning.',
    loot: 'The manuscripts that made Henry the Navigator\'s school at Sagres possible. The astrolabes Columbus and Vasco da Gama carried were manufactured using techniques transmitted through this channel. Mariam al-Asturlābiyya\'s name was not in any of them.',
    image: '/images/sdam-calculus/granada-invictus-1.jpg',
    imageAlt: 'Historical illustration of medieval travelers in a mountainous landscape',
    source: 'INVICTUS (historical reproduction)',
    icon: Flame,
  },
  {
    id: 4,
    year: '1492 CE',
    event: 'Fall of Granada — Spanish seizure of Andalusian navigation',
    actor: 'Ferdinand & Isabella',
    location: 'Granada, al-Andalus',
    mechanism: 'The Reconquista gave Spain direct access to 700 years of Andalusian navigation science. Columbus sailed in 1492 — the same year Granada fell — using instruments and tables from the Andalusian tradition. The Spanish burned many Arabic manuscripts but kept the navigational ones.',
    loot: 'The navigation tables, astrolabes, and portolan charts that made Columbus\'s Atlantic crossing possible. The Andalusian tradition of al-Idrīsī\'s geography (1154 CE) — the most accurate world map of the medieval era — was absorbed into Spanish cartography without attribution.',
    image: '/images/sdam-nav/columbus-alamy.jpg',
    imageAlt: 'Authentic historical illustration of Columbus\'s ship Santa Maria',
    source: 'Alamy (historical reproduction)',
    icon: Compass,
  },
  {
    id: 5,
    year: '1497–98 CE',
    event: 'Vasco da Gama uses a Muslim navigator — then erases him',
    actor: 'Vasco da Gama / Portuguese Crown',
    location: 'Indian Ocean (Malindi to Calicut)',
    mechanism: 'Vasco da Gama hired a Muslim navigator at Malindi to guide him across the Indian Ocean to India. The navigator — almost certainly Aḥmad ibn Mājid — used the Kitāb al-Fawāʾid navigation system to guide the Portuguese fleet 23 days across open ocean. Da Gama\'s crew called him "the Moor." His name appears in no Portuguese account.',
    loot: 'The Indian Ocean navigation route. Portugal claimed it as a "discovery." The Treaty of Tordesillas (1494) divided the world between Spain and Portugal — both using navigation systems stolen from Muslim sailors. Ibn Mājid\'s name was erased for 400 years.',
    image: '/images/sdam-nav/vasco-alamy-1.jpg',
    imageAlt: 'Authentic historical illustration of a Portuguese carrack from the Age of Discovery',
    source: 'Alamy (historical reproduction)',
    icon: Ship,
  },
  {
    id: 6,
    year: '1500s CE',
    event: 'Portuguese seizure of Indian Ocean navigation charts',
    actor: 'Portuguese colonial administration',
    location: 'Goa, Ormuz, Malacca',
    mechanism: 'As Portugal built its Indian Ocean empire, it systematically seized Arab navigation manuals and charts from captured ships and ports. The Portuguese "rota da India" (India route) was built entirely on stolen Arabic navigation knowledge — then attributed to Portuguese "discovery."',
    loot: 'The complete Arabic navigation corpus of the Indian Ocean — star tables, rhumb sailing instructions, monsoon calendars, port descriptions. The Portuguese locked the route as a state secret. The Arabic authors — Ibn Mājid, al-Mahrī, and the unnamed navigators — were never credited.',
    image: '/images/sdam-nav/ibnmajid-inlibris-2.jpg',
    imageAlt: 'Authentic Arabic navigation manuscript page showing coastal routes',
    source: 'Antiquariat INLIBRIS (manuscript reproduction)',
    icon: Library,
  },
];

export default function NavLibraryTheftSection() {
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
          viewport={{ once: true, margin: "0px 0px 15% 0px" }}
          transition={{ duration: 0.8 }}
          className="text-center mb-14"
        >
          <p className="text-[10px] font-mono tracking-[0.4em] uppercase text-burgundy mb-4 flex items-center justify-center gap-2">
            <Flame className="w-3 h-3" />
            {tSections('LibraryTheft.chapterTitle')}
          </p>
          <h2 className="font-display text-4xl sm:text-6xl md:text-7xl text-cream leading-tight">
            {tH('LibraryTheft.nav')}
            <br />
            <span className="text-gradient-gold italic">reached Europe.</span>
          </h2>
          <p className="mt-6 text-cream-dim max-w-2xl mx-auto text-sm sm:text-base leading-relaxed">
            The astrolabes Columbus carried, the navigation tables Vasco da
            Gama used, the portolan charts that appeared in Italy — none of
            these were European inventions. They were acquired by conquest,
            looting, and colonial seizure. Six episodes document the transfer.
            Mariam al-Asturlābiyya and Ibn Mājid were erased. The European
            &ldquo;Age of Discovery&rdquo; took the credit.
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
                viewport={{ once: true, margin: "0px 0px 15% 0px" }}
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
          viewport={{ once: true, margin: "0px 0px 15% 0px" }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="mt-16 text-center max-w-3xl mx-auto"
        >
          <div className="glass-card-gold rounded-2xl p-6 sm:p-8 glow-gold">
            <ArrowRight className="w-6 h-6 text-gold mx-auto mb-3" />
            <p className="font-display text-xl sm:text-2xl text-cream italic leading-snug mb-4">
              The European &ldquo;Age of Discovery&rdquo; was built on stolen
              navigation.
            </p>
            <p className="text-cream/85 text-xs sm:text-sm leading-relaxed">
              Vasco da Gama crossed the Indian Ocean in 23 days because a
              Muslim navigator showed him how. Columbus carried an astrolabe
              manufactured using techniques Mariam al-Asturlābiyya had perfected
              554 years earlier. The portolan charts that appeared in Italy
              after the Crusades had no documented European precursor. The
              instruments, the mathematics, and the route knowledge were all
              Arabic. The Portuguese and Spanish took the credit.
            </p>
            <p className="text-cream-dim text-[10px] mt-4 italic">
              This is not a conspiracy theory. It is documented history. The
              Portuguese archives, the Vatican Library, and the Bodleian hold
              the physical evidence — Arabic navigation manuscripts catalogued
              under European accession numbers, including copies of Ibn
              Mājid&apos;s Kitāb al-Fawāʾid.
            </p>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
