'use client';
import { motion } from 'framer-motion';
import Image from 'next/image';
import { GraduationCap, BookOpen, Flame, Cross, Users, Library } from 'lucide-react';
import { useTranslations } from 'next-intl';

const EVIDENCE = [
  { image: '/images/sdam-uni/qarawiyyin-oasis.jpg', icon: GraduationCap, title: 'Al-Qarawiyyin University (859 CE — present)', source: 'Source: Oasis Aventure', detail: 'The world\'s oldest continuously operating university, founded by Fatima al-Fehri in Fez, Morocco. This photograph shows the actual building — still teaching after 1,166 years. UNESCO and Guinness World Records recognize it as the oldest degree-granting institution.', aspect: 'aspect-[3/4]' },
  { image: '/images/sdam-uni/woman-scholar-christies.jpg', icon: Users, title: 'Medieval Islamic manuscript — scholarly scene', source: "Source: Christie's", detail: 'An authentic medieval Persian/Mughal miniature painting depicting a scholarly scene with figures in a decorated interior. This is the visual tradition in which Fatima al-Fehri, Lubna, and Dhayfa Khatun lived — a tradition that valued and depicted women scholars.', aspect: 'aspect-[3/4]' },
  { image: '/images/sdam-uni/madrasa-ucla-1.jpg', icon: BookOpen, title: 'Arabic scholarly manuscript', source: 'Source: UCLA Library', detail: 'An aged Arabic manuscript page from the UCLA Library collection — the type of text that was studied at al-Qarawiyyin and the madrasas Fatima, Lubna, and Dhayfa built. The calligraphy, the marginal annotations, and the paper itself are all consistent with medieval Islamic scholarly production.', aspect: 'aspect-[3/4]' },
  { image: '/images/sdam-uni/witch-burning-alamy-1.jpg', icon: Flame, title: 'Witch burning — European persecution of women', source: 'Source: Alamy (historical illustration)', detail: 'An authentic historical illustration of a public execution by burning — the fate of an estimated 40,000–60,000 European women accused of witchcraft between 1450 and 1750. Women who practiced medicine, midwifery, or any form of knowledge outside church control were burned alive. This is the European contrast to Fatima al-Fehri founding a university.', aspect: 'aspect-[3/4]' },
  { image: '/images/sdam-uni/inquisition-conversation-1.jpg', icon: Cross, title: 'The Inquisition — persecution of scientists', source: 'Source: The Conversation', detail: 'An authentic historical illustration of a woman being burned at the stake during the Inquisition. The Inquisition operated from 1231 to 1834 — torturing and executing anyone who claimed scientific truth contradicting church doctrine. Michael Servetus was burned for discovering pulmonary circulation. Giordano Bruno was burned for proposing stars were distant suns.', aspect: 'aspect-[3/4]' },
  { image: '/images/sdam-uni/qarawiyyin-atlas.jpg', icon: Library, title: 'Al-Qarawiyyin interior — the library', source: 'Source: Atlas Obscura', detail: 'The interior of al-Qarawiyyin University in Fez — the institution Fatima al-Fehri founded. Its library holds the world\'s oldest surviving manuscript on the astrolabe. While Lubna of Cordoba managed 500,000 books, European libraries had fewer than 600. The contrast is not metaphorical — it is architectural, institutional, and documented.', aspect: 'aspect-[4/3]' },
];

export default function UniManuscriptEvidenceSection() {
  const tSections = useTranslations('Sections');
  return (
    <section id="evidence" className="relative min-h-screen flex flex-col items-center justify-center px-6 py-24 manuscript-bg overflow-hidden">
      <div className="max-w-6xl w-full relative z-10">
        <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, margin: "0px 0px 15% 0px" }} transition={{ duration: 0.8 }} className="text-center mb-14">
          <p className="text-[10px] font-mono tracking-[0.4em] uppercase text-gold/70 mb-4">{tSections('ManuscriptEvidence.chapterTitle')}</p>
          <h2 className="font-display text-4xl sm:text-6xl md:text-7xl text-cream leading-tight">Real institutions.<br /><span className="text-gradient-gold italic">Real persecution.</span></h2>
          <p className="mt-6 text-cream-dim max-w-2xl mx-auto text-sm sm:text-base">Every image below is an authentic historical artifact — a surviving university building, a medieval manuscript, or a historical illustration of European persecution. The contrast is visible in the images themselves: Islamic architecture vs. burning stakes.</p>
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
        <motion.div initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true, margin: "0px 0px 15% 0px" }} transition={{ duration: 0.7, delay: 0.4 }} className="mt-10 text-center">
          <p className="text-cream-dim/70 text-xs italic max-w-2xl mx-auto leading-relaxed">No contemporary portrait of Fatima al-Fehri, Lubna of Cordoba, or Dhayfa Khatun survives. What survives is greater than any portrait: the institutions they built, the libraries they managed, and the records of those who wrote about them. The European persecution images are authentic historical illustrations of documented events.</p>
        </motion.div>
      </div>
    </section>
  );
}
