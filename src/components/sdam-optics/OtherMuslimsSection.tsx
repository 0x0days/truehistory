'use client';

import { motion } from 'framer-motion';
import Image from 'next/image';
import { Users } from 'lucide-react';

const SCHOLARS = [
  {
    name: 'Ibn Sahl',
    arabic: 'ابن سهل',
    dates: 'c. 940 – 1000 CE',
    location: 'Baghdad',
    contribution: 'The sine law of refraction',
    detail:
      'In his manuscript On Burning Mirrors and Lenses (984 CE), Ibn Sahl gave the first geometric proof of the sine law of refraction — 637 years before Snell. He used it to design hyperbolic lenses. The manuscript was lost to Europe until 1993.',
    image: '/images/sdam-optics/ibn-sahl-burning-mirrors.jpg',
    imageAlt: 'Authentic medieval Arabic manuscript page showing the geometric construction of burning mirrors and lenses by Ibn Sahl',
    source: 'The Renaissance Mathematicus',
  },
  {
    name: 'Kamāl al-Dīn al-Fārisī',
    arabic: 'كمال الدين الفارسي',
    dates: '1267 – 1319 CE',
    location: 'Tabriz, Persia',
    contribution: 'The first correct explanation of the rainbow',
    detail:
      'In his Tanqīḥ al-Manāẓir (Revision of the Optics), al-Fārisī corrected Ibn al-Haytham and gave the first mathematically correct explanation of the rainbow: two refractions and one reflection inside a spherical water droplet. He verified it using a glass sphere filled with water — the model of a raindrop.',
    image: '/images/sdam-optics/farisi-rainbow.jpg',
    imageAlt: 'Authentic diagram from al-Farisi\'s Tanqih al-Manazir showing the rainbow formation through a water-filled glass sphere',
    source: 'Muslim Heritage',
  },
  {
    name: 'Yaʿqūb ibn Isḥāq al-Kindī',
    arabic: 'الكندي',
    dates: 'c. 801 – 873 CE',
    location: 'Baghdad',
    contribution: 'Foundational theory of light rays',
    detail:
      'Al-Kindi wrote De Radiis ("On Rays") — a treatise on the geometric propagation of light rays that influenced European optics for centuries. He explicitly attacked the emission theory of vision two centuries before Ibn al-Haytham did it more rigorously.',
    image: '/images/sdam-optics/eye-anatomy-1.jpg',
    imageAlt: 'Authentic medieval manuscript diagram of eye anatomy from Alhazen\'s De Aspectibus (1269 AD)',
    source: 'The Renaissance Mathematicus',
  },
  {
    name: 'Taqī al-Dīn',
    arabic: 'تقي الدين',
    dates: '1526 – 1585 CE',
    location: 'Istanbul',
    contribution: 'Advanced camera obscura + astronomy',
    detail:
      'Ottoman polymath. In his astronomical works he described the camera obscura in detail and used it to observe solar eclipses safely — extending Ibn al-Haytham\'s apparatus into precision instrumentation 500 years later.',
    image: '/images/sdam-optics/alhazen-latin-milestones.jpg',
    imageAlt: 'Authentic Latin edition of Alhazen\'s optics, illustrating the continuing transmission of the optical tradition',
    source: 'Milestones of Science Books',
  },
];

export default function OtherMuslimsSection() {
  return (
    <section
      id="others"
      className="relative min-h-screen flex flex-col items-center justify-center px-6 py-24 manuscript-bg overflow-hidden"
    >
      <div className="max-w-6xl w-full relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "0px 0px 50% 0px" }}
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
            The discovery of optics was not a single genius event. It was a
            tradition — sustained across four centuries and four cities — by
            scholars whose names were erased from European textbooks. Without
            any one of them, the chain breaks.
          </p>
        </motion.div>

        <div className="grid sm:grid-cols-2 gap-6">
          {SCHOLARS.map((s, i) => (
            <motion.article
              key={s.name}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "0px 0px 50% 0px" }}
              transition={{ duration: 0.7, delay: (i % 2) * 0.1 }}
              className="glass-card-gold rounded-2xl overflow-hidden group flex flex-col sm:flex-row"
            >
              {/* Image */}
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
              {/* Body */}
              <div className="p-5 sm:p-6 flex-1 flex flex-col">
                <div className="flex items-start justify-between mb-2">
                  <div>
                    <p className="font-arabic text-xl text-gold mb-1" dir="rtl">
                      {s.arabic}
                    </p>
                    <h3 className="font-display text-xl sm:text-2xl text-cream leading-tight">
                      {s.name}
                    </h3>
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
          viewport={{ once: true, margin: "0px 0px 50% 0px" }}
          transition={{ duration: 0.7, delay: 0.3 }}
          className="mt-12 text-center max-w-2xl mx-auto"
        >
          <p className="text-cream-dim/80 text-xs sm:text-sm italic leading-relaxed">
            This is not a list of coincidences. It is a continuous research
            program — from Baghdad in 801 (al-Kindi) to Istanbul in 1585 (Taqī
            al-Dīn). Each scholar built on the last. The chain ends only when
            Europe decided to rename the discipline.
          </p>
        </motion.div>
      </div>
    </section>
  );
}
