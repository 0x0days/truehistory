'use client';

import { motion } from 'framer-motion';
import Image from 'next/image';
import { Users } from 'lucide-react';

const SCHOLARS = [
  {
    name: 'Abū Bakr al-Rāzī',
    arabic: 'الرازي',
    latinized: 'Rhazes',
    dates: '854 – 925 CE',
    location: 'Baghdad / Rayy',
    contribution: 'The first controlled clinical trial',
    detail:
      'Al-Rāzī ran what historians now recognize as the first controlled clinical trial in history. To determine where to build Baghdad\'s new hospital, he hung meat at various locations and chose the site where the meat decayed least — the cleanest air. He then systematically compared treatments, dividing patients into groups and recording outcomes. His case notes (Kitāb al-Ḥāwī) are the earliest known controlled medical experiments.',
    image: '/images/sdam-method/alrazi-nlm-1.jpg',
    imageAlt: 'Authentic medieval medical manuscript page by al-Razi from the National Library of Medicine',
    source: 'National Library of Medicine',
  },
  {
    name: 'Ibn Sīnā',
    arabic: 'ابن سينا',
    latinized: 'Avicenna',
    dates: '980 – 1037 CE',
    location: 'Bukhara / Persia',
    contribution: 'Codified the experimental method in medicine',
    detail:
      'In his Canon of Medicine (al-Qānūn fī al-Ṭibb), Ibn Sīnā laid out 7 rules for testing drugs — including the requirement of controlled conditions, comparison with controls, and replication. These rules directly prefigure the modern clinical trial. The Canon was the standard medical textbook in Europe for 600 years, used at Montpellier and Padua until the 17th century.',
    image: '/images/sdam-method/alrazi-nlm-2.jpg',
    imageAlt: 'Authentic medieval Arabic medical manuscript page from a surviving medical text',
    source: 'National Library of Medicine',
  },
  {
    name: 'Abū al-Rayhān al-Bīrūnī',
    arabic: 'البيروني',
    latinized: 'Alberonius',
    dates: '973 – 1048 CE',
    location: 'Khwarazm / India',
    contribution: 'Empirical method in astronomy + geology',
    detail:
      'Al-Bīrūnī applied Ibn al-Haytham\'s method to astronomy, geology, and anthropology. He measured the Earth\'s radius to within 0.27% of the modern value using the mountain-dip method. He studied minerals by their specific gravity. He studied Indian religion by living among Hindus — writing the first comparative-religion study in history. In every case: observe, measure, test, publish.',
    image: '/images/sdam-method/doubts-muslim-heritage.jpg',
    imageAlt: 'Authentic medieval Arabic manuscript page showing calligraphic text and marginal annotations',
    source: 'Muslim Heritage',
  },
  {
    name: 'Jābir ibn Ḥayyān',
    arabic: 'جابر بن حيان',
    latinized: 'Geber',
    dates: 'c. 721 – c. 813 CE',
    location: 'Kufa / Baghdad',
    contribution: 'Systematic experimental chemistry',
    detail:
      'The father of experimental chemistry. Jābir designed and described dozens of laboratory apparatus — the alembic, the retort, the condenser — that survive in modern labs. He insisted that every chemical claim must be verified by experiment: "He who performs not the experiment, let him not claim knowledge of it." This was stated in the late 8th century — 800 years before Bacon.',
    image: '/images/sdam-method/laboratory-museum-crush.jpg',
    imageAlt: 'Authentic historical engraving of a medieval scientist conducting experiments with scientific apparatus',
    source: 'Museum Crush',
  },
];

export default function MethodOtherMuslimsSection() {
  return (
    <section
      id="others"
      className="relative min-h-screen flex flex-col items-center justify-center px-6 py-24 manuscript-bg overflow-hidden"
    >
      <div className="max-w-6xl w-full relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "0px 0px 15% 0px" }}
          transition={{ duration: 0.8 }}
          className="text-center mb-14"
        >
          <p className="text-[10px] font-mono tracking-[0.4em] uppercase text-gold/70 mb-4 flex items-center justify-center gap-2">
            <Users className="w-3 h-3" />
            Chapter 04c — The Other Undercredited Muslims
          </p>
          <h2 className="font-display text-4xl sm:text-6xl md:text-7xl text-cream leading-tight">
            Ibn al-Haytham
            <br />
            <span className="text-gradient-gold italic">was not alone.</span>
          </h2>
          <p className="mt-6 text-cream-dim max-w-2xl mx-auto text-sm sm:text-base leading-relaxed">
            The experimental method was not a single genius event. It was a
            tradition sustained across 300 years and four cities — by scholars
            whose names were Latinized and erased from European textbooks. Each
            of them applied the method to a different field. Together they
            invented modern science.
          </p>
        </motion.div>

        <div className="grid sm:grid-cols-2 gap-6">
          {SCHOLARS.map((s, i) => (
            <motion.article
              key={s.name}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "0px 0px 15% 0px" }}
              transition={{ duration: 0.7, delay: (i % 2) * 0.1 }}
              className="glass-card-gold rounded-2xl overflow-hidden group flex flex-col sm:flex-row"
            >
              <div className="relative sm:w-2/5 aspect-[3/4] sm:aspect-[4/3] overflow-hidden flex-shrink-0">
                <Image
                  src={s.image}
                  alt={s.imageAlt}
                  fill
                  sizes="(max-width: 640px) 100vw, 40vw"
                  className="object-cover transition-transform duration-1000 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-cosmos-deep/80 via-transparent to-transparent sm:bg-gradient-to-r" />
              </div>
              <div className="p-5 sm:p-6 flex-1 flex flex-col">
                <div className="flex items-start justify-between mb-2">
                  <div>
                    <p className="font-arabic text-xl text-gold mb-1" dir="rtl">
                      {s.arabic}
                    </p>
                    <h3 className="font-display text-xl sm:text-2xl text-cream leading-tight">
                      {s.name}
                    </h3>
                    <p className="text-cream-dim/70 text-xs italic mt-0.5">
                      Latinized: {s.latinized}
                    </p>
                  </div>
                  <span className="text-[9px] font-mono uppercase tracking-widest text-gold/60 px-2 py-1 rounded-full border border-gold/20 whitespace-nowrap">
                    {s.dates.split(' – ')[0]}
                  </span>
                </div>
                <p className="text-cream-dim text-xs mb-3">{s.dates} · {s.location}</p>
                <p className="font-display text-base text-gradient-gold italic mb-3">
                  {s.contribution}
                </p>
                <p className="text-cream/85 text-xs sm:text-sm leading-relaxed flex-1">
                  {s.detail}
                </p>
                <p className="text-[10px] font-mono uppercase tracking-widest text-gold/60 mt-3 pt-3 border-t border-gold/15">
                  Source: {s.source}
                </p>
              </div>
            </motion.article>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true, margin: "0px 0px 15% 0px" }}
          transition={{ duration: 0.7, delay: 0.3 }}
          className="mt-12 text-center max-w-2xl mx-auto"
        >
          <p className="text-cream-dim/80 text-xs sm:text-sm italic leading-relaxed">
            From Jābir ibn Ḥayyān in 8th-century Kufa to Ibn al-Haytham in
            11th-century Cairo — a continuous research program in experimental
            science, sustained for 300 years before the Latin translation
            carried it to Europe.
          </p>
        </motion.div>
      </div>
    </section>
  );
}
