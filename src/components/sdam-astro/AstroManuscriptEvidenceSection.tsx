'use client';

import { motion } from 'framer-motion';
import Image from 'next/image';
import { BookOpen, Orbit, Moon, Sun, Star, Library, Flame } from 'lucide-react';
import { useTranslations } from 'next-intl';

const EVIDENCE = [
  {
    image: '/images/sdam-astro/sufi-sothebys.jpg',
    icon: Star,
    title: 'al-Sūfī · Book of Fixed Stars (964 CE)',
    source: "Source: Sotheby's",
    detail:
      'A page from a surviving manuscript of al-Sūfī\'s Kitāb al-Kawākib al-Thābita — the Book of Fixed Stars. Visible: constellation figures with Arabic calligraphic labels and star markers. This is the manuscript in which the Andromeda Galaxy was first recorded, 800 years before Charles Messier catalogued it as M31.',
    aspect: 'aspect-[3/4]',
  },
  {
    image: '/images/sdam-astro/tusi-nature-2.jpg',
    icon: Orbit,
    title: 'al-Ṭūsī · Maragheh planetary models',
    source: 'Source: Nature (academic reproduction)',
    detail:
      'A page from a Maragheh astronomical manuscript in the tradition of al-Ṭūsī\'s Tadhkira fī ʿIlm al-Hayʾa (c. 1247 CE). The geometric diagrams depict the Tusi Couple — the device Copernicus would use 296 years later in De Revolutionibus, without citation.',
    aspect: 'aspect-[3/4]',
  },
  {
    image: '/images/sdam-astro/copernicus-ziereis-1.jpg',
    icon: Sun,
    title: 'Copernicus · De Revolutionibus (1543)',
    source: 'Source: Ziereis Facsimiles',
    detail:
      'A page from Copernicus\'s De Revolutionibus Orbium Coelestium (1543) — the book credited with inventing heliocentrism. The planetary diagrams visible here use the Tusi Couple and Ibn al-Shāṭir\'s lunar model — both mathematically identical to Arabic precursors 193–296 years older. Copernicus cited al-Battānī 23 times. He did not cite al-Ṭūsī or Ibn al-Shāṭir.',
    aspect: 'aspect-[3/4]',
  },
  {
    image: '/images/sdam-astro/galileo-alamy.jpg',
    icon: Moon,
    title: 'Galileo · Sidereus Nuncius (1610)',
    source: 'Source: Alamy (rare book reproduction)',
    detail:
      'A page from Galileo\'s Sidereus Nuncius (1610) — the book credited with "discovering" the Milky Way is made of stars and the Moon has craters. Galileo\'s telescope observations were genuine. But al-Sūfī had described the Milky Way as "a chain of stars" 646 years earlier, and al-Battānī had measured the Moon\'s motion precisely.',
    aspect: 'aspect-[3/4]',
  },
  {
    image: '/images/sdam-astro/battani-academia.jpg',
    icon: Sun,
    title: 'al-Battānī · Zīj al-Ṣābiʾ (c. 900 CE)',
    source: 'Source: Academia.edu',
    detail:
      'A page from a manuscript in the tradition of al-Battānī\'s Zīj (astronomical tables). Al-Battānī measured the solar year to within 2 minutes of the modern value — more accurate than the Julian calendar then in use in Europe. Copernicus cited him 23 times as "Albatenius." Tycho Brahe and Kepler used his data.',
    aspect: 'aspect-[3/4]',
  },
  {
    image: '/images/sdam-astro/constantinople-collector.jpg',
    icon: Flame,
    title: 'Fall of Constantinople (1453) — the transmission event',
    source: 'Source: TheCollector (historical illustration)',
    detail:
      'A medieval illustration of a siege — the type of event that transferred Arabic astronomical manuscripts to Europe. When Constantinople fell in 1453, Byzantine Greek scholars fled west with Arabic scientific works. Copernicus studied in Italy from 1496–1503 — exactly when these manuscripts were arriving. This is the physical mechanism of the "translation."',
    aspect: 'aspect-[4/3]',
  },
];

export default function AstroManuscriptEvidenceSection() {
  const tSections = useTranslations('Sections');
  return (
    <section
      id="evidence"
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
          <p className="text-[10px] font-mono tracking-[0.4em] uppercase text-gold/70 mb-4">
            {tSections('ManuscriptEvidence.chapterTitle')}
          </p>
          <h2 className="font-display text-4xl sm:text-6xl md:text-7xl text-cream leading-tight">
            Real manuscripts.
            <br />
            <span className="text-gradient-gold italic">Real identity.</span>
          </h2>
          <p className="mt-6 text-cream-dim max-w-2xl mx-auto text-sm sm:text-base">
            Every image below is an authentic historical artifact — a page from
            a surviving Arabic astronomical manuscript, or a reproduction of a
            European publication that used its mathematics. No AI, no
            reconstructions. Each comes with its source attribution.
          </p>
        </motion.div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {EVIDENCE.map((item, i) => {
            const Icon = item.icon;
            return (
              <motion.figure
                key={item.title}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "0px 0px 50% 0px" }}
                transition={{ duration: 0.7, delay: (i % 3) * 0.1 }}
                className="glass-card-gold rounded-2xl overflow-hidden group flex flex-col"
              >
                <div className={`relative ${item.aspect} overflow-hidden`}>
                  <Image
                    src={item.image}
                    alt={item.title}
                    fill
                    sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                    className="object-cover transition-transform duration-1000 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-cosmos-deep/80 via-transparent to-transparent" />
                  <div className="absolute top-4 left-4 w-10 h-10 rounded-full glass-card-gold flex items-center justify-center backdrop-blur-md">
                    <Icon className="w-5 h-5 text-gold" />
                  </div>
                  <div className="absolute top-4 right-4 px-2.5 py-1 rounded-full glass-card backdrop-blur-md">
                    <span className="text-[9px] font-mono uppercase tracking-widest text-gold/80">
                      Plate {i + 1}
                    </span>
                  </div>
                </div>
                <figcaption className="p-5 flex-1 flex flex-col">
                  <h3 className="font-display text-lg text-cream italic leading-tight mb-2">
                    {item.title}
                  </h3>
                  <p className="text-cream/85 text-xs leading-relaxed flex-1">
                    {item.detail}
                  </p>
                  <p className="text-[10px] font-mono uppercase tracking-widest text-gold/70 mt-3 pt-3 border-t border-gold/15">
                    {item.source}
                  </p>
                </figcaption>
              </motion.figure>
            );
          })}
        </div>

        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true, margin: "0px 0px 50% 0px" }}
          transition={{ duration: 0.7, delay: 0.4 }}
          className="mt-10 text-center"
        >
          <p className="text-cream-dim/70 text-xs italic max-w-2xl mx-auto leading-relaxed">
            All images are reproductions of authentic historical materials
            sourced from institutional archives: Sotheby\'s, The Metropolitan
            Museum of Art, Ziereis Facsimiles, Christie\'s, Alamy, Academia.edu,
            Nature, and TheCollector. The Vatican Library, Bodleian, and
            Bibliothèque nationale hold the originals.
          </p>
        </motion.div>
      </div>
    </section>
  );
}
