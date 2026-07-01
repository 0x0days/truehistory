'use client';
import { motion } from 'framer-motion';
import Image from 'next/image';
import { Users } from 'lucide-react';

const SCHOLARS = [
  {
    name: 'Fatima al-Fehri',
    arabic: 'فاطمة الفهرية',
    dates: 'd. 880 CE',
    location: 'Fez, Morocco',
    contribution: 'Founded the world\'s oldest university',
    detail: 'Fatima al-Fehri migrated from Qayrawan (Tunisia) to Fez, inherited a fortune, and spent it entirely on building al-Qarawiyyin — a mosque-university that has operated continuously since 859 CE. She fasted and prayed throughout its construction. UNESCO recognizes it as the oldest degree-granting institution in the world. 229 years before Bologna.',
    image: '/images/sdam-uni/qarawiyyin-atlas.jpg',
    imageAlt: 'Authentic interior of al-Qarawiyyin University in Fez, Morocco — the world\'s oldest university founded by Fatima al-Fehri',
    source: 'Atlas Obscura',
  },
  {
    name: 'Lubna of Cordoba',
    arabic: 'لبنة القرطبية',
    dates: '10th century CE',
    location: 'Cordoba, al-Andalus',
    contribution: 'Library of 500,000+ books — the largest in medieval Europe',
    detail: 'Lubna was the personal scribe and librarian of Caliph al-Hakam II. She managed the royal library of Cordoba, which held over 500,000 volumes — at a time when the largest European library had fewer than 600. Ibn Bashkuwal records (Kitab al-Silla, Cairo 2008, Vol. 2: 324) that she was "the most knowledgeable person in mathematics" and "wrote beautiful calligraphy." She lectured on mathematics and literature. No European woman would hold a comparable position for 800 years.',
    image: '/images/sdam-uni/woman-scholar-christies.jpg',
    imageAlt: 'Authentic medieval Persian miniature painting depicting a scholarly scene with figures in a decorated interior',
    source: "Christie's",
  },
  {
    name: 'Dhayfa Khatun',
    arabic: 'ضيفة خاتون',
    dates: '1186 – 1242 CE',
    location: 'Aleppo, Syria',
    contribution: 'Built and financed universities, hospitals, and Sufi lodges',
    detail: 'Dhayfa Khatun was the regent of Aleppo and the most powerful woman in the Ayyubid dynasty. She founded two madrasas (universities) — al-Firdaws and al-Zahiriyya — a hospital (bimaristan), and a Sufi lodge. She personally selected the scholars who taught there and financed their salaries. The institutions she built still stand in Aleppo today. While European women were being denied the right to own property, Dhayfa was financing entire university systems.',
    image: '/images/sdam-uni/woman-scholar-muslim-heritage.jpg',
    imageAlt: 'Authentic medieval Islamic miniature painting depicting figures in a richly decorated interior',
    source: 'Muslim Heritage',
  },
  {
    name: 'Nusayba bint Kaʿb al-Anṣāriyya',
    arabic: 'نسيبة بنت كعب',
    dates: '7th century CE',
    location: 'Medina, Arabia',
    contribution: 'Warrior-scholar who defended the Prophet — and taught afterward',
    detail: 'Nusayba (also known as Umm ʿUmāra) was one of the first women to pledge allegiance to the Prophet Muhammad. She fought in the Battle of Uhud (625 CE), sustaining 13 wounds while defending him. But she was also a scholar — the Prophet said she was among the few who understood the Quran fully. She taught both men and women. Her status as a warrior AND scholar was unremarkable in 7th-century Arabia. In 7th-century Europe, women were being defined as "defective males" by Thomas Aquinas.',
    image: '/images/sdam-uni/madrasa-muslim-heritage.jpeg',
    imageAlt: 'Authentic medieval Islamic manuscript illustration showing scholarly activity',
    source: 'Muslim Heritage',
  },
];

export default function UniWomenScholarsSection() {
  return (
    <section id="others" className="relative min-h-screen flex flex-col items-center justify-center px-6 py-24 manuscript-bg overflow-hidden">
      <div className="max-w-6xl w-full relative z-10">
        <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, margin: "0px 0px 50% 0px" }} transition={{ duration: 0.8 }} className="text-center mb-14">
          <p className="text-[10px] font-mono tracking-[0.4em] uppercase text-gold/70 mb-4 flex items-center justify-center gap-2"><Users className="w-3 h-3" />Chapter 04b — The Women Who Built Universities</p>
          <h2 className="font-display text-4xl sm:text-6xl md:text-7xl text-cream leading-tight">Fatima was not<br /><span className="text-gradient-gold italic">alone.</span></h2>
          <p className="mt-6 text-cream-dim max-w-2xl mx-auto text-sm sm:text-base leading-relaxed">While European women were being denied souls, burned as witches, and excluded from education — the Islamic world had women founding universities, managing libraries of half a million books, financing hospital systems, and teaching mathematics. Four of them, across six centuries.</p>
        </motion.div>
        <div className="grid sm:grid-cols-2 gap-6">
          {SCHOLARS.map((s, i) => (
            <motion.article key={s.name} initial={{ opacity: 0, y: 40 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, margin: "0px 0px 50% 0px" }} transition={{ duration: 0.7, delay: (i % 2) * 0.1 }} className="glass-card-gold rounded-2xl overflow-hidden group flex flex-col sm:flex-row">
              <div className="relative sm:w-2/5 aspect-[3/4] sm:aspect-[4/3] overflow-hidden flex-shrink-0">
                <Image src={s.image} alt={s.imageAlt} fill sizes="(max-width: 640px) 100vw, 40vw" className="object-cover transition-transform duration-1000 group-hover:scale-105" />
                <div className="absolute inset-0 bg-gradient-to-t from-cosmos-deep/80 via-transparent to-transparent sm:bg-gradient-to-r" />
              </div>
              <div className="p-5 sm:p-6 flex-1 flex flex-col">
                <div className="flex items-start justify-between mb-2">
                  <div>
                    <p className="font-arabic text-xl text-gold mb-1" dir="rtl">{s.arabic}</p>
                    <h3 className="font-display text-xl sm:text-2xl text-cream leading-tight">{s.name}</h3>
                  </div>
                  <span className="text-[9px] font-mono uppercase tracking-widest text-gold/60 px-2 py-1 rounded-full border border-gold/20 whitespace-nowrap">{s.dates}</span>
                </div>
                <p className="text-cream-dim text-xs mb-3">{s.location}</p>
                <p className="font-display text-base text-gradient-gold italic mb-3">{s.contribution}</p>
                <p className="text-cream/85 text-xs sm:text-sm leading-relaxed flex-1">{s.detail}</p>
                <p className="text-[10px] font-mono uppercase tracking-widest text-gold/60 mt-3 pt-3 border-t border-gold/15">Source: {s.source}</p>
              </div>
            </motion.article>
          ))}
        </div>
        <motion.div initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true, margin: "0px 0px 50% 0px" }} transition={{ duration: 0.7, delay: 0.3 }} className="mt-12 text-center max-w-2xl mx-auto">
          <p className="text-cream-dim/80 text-xs sm:text-sm italic leading-relaxed">No contemporary portrait of any of these four women survives. The images shown are authentic medieval Islamic manuscript illustrations and surviving architecture from their era and tradition. What survives is not their faces — it is their institutions, their libraries, and the records of those who wrote about them.</p>
        </motion.div>
      </div>
    </section>
  );
}
