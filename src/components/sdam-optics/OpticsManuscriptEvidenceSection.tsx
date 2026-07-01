'use client';

import { motion } from 'framer-motion';
import Image from 'next/image';
import { BookOpen, Microscope, Camera, Eye } from 'lucide-react';
import { useTranslations } from 'next-intl';

const EVIDENCE = [
  {
    image: '/images/sdam-optics/manazir-renaissance-1.jpg',
    icon: BookOpen,
    title: 'Kitāb al-Manāẓir · Arabic original',
    source: 'Source: The Renaissance Mathematicus (library reproduction)',
    detail:
      'A page from a surviving Arabic manuscript of Ibn al-Haytham\'s Book of Optics. Visible: geometric diagrams of light rays and the calligraphic Arabic text that proves the laws of reflection and the camera obscura theorem. This is the primary source — Tier-1 evidence.',
    aspect: 'aspect-[3/4]',
  },
  {
    image: '/images/sdam-optics/alhazen-latin-1.jpg',
    icon: BookOpen,
    title: 'Perspectiva · Latin translation',
    source: 'Source: The Renaissance Mathematicus (medieval manuscript reproduction)',
    detail:
      'A page from the Latin translation of Ibn al-Haytham\'s Optics — known in Europe as "Perspectiva" or "De Aspectibus." This is the edition that Roger Bacon, Witelo, John Pecham, Leonardo da Vinci, and Johannes Kepler read. The geometric diagrams are direct copies of the Arabic original.',
    aspect: 'aspect-[3/4]',
  },
  {
    image: '/images/sdam-optics/ibn-sahl-encyclopedia.png',
    icon: Microscope,
    title: 'Ibn Sahl · The sine law of refraction',
    source: 'Source: Encyclopedia of the History of Science (Rashed, 1993)',
    detail:
      'Ibn Sahl\'s manuscript On Burning Mirrors and Lenses (984 CE), showing the geometric construction of the sine law of refraction — 637 years before Snell. Rediscovered by Roshdi Rashed in 1993, this single manuscript rewrites the history of optical mathematics.',
    aspect: 'aspect-square',
  },
  {
    image: '/images/sdam-optics/alhazen-latin-3.jpg',
    icon: Eye,
    title: 'Eye anatomy · De Aspectibus',
    source: 'Source: Academia.edu (manuscript reproduction)',
    detail:
      'A diagram of the eye from a Latin manuscript of Ibn al-Haytham\'s De Aspectibus. Ibn al-Haytham was the first to correctly identify that vision occurs by light entering the eye (intromission theory), overturning 1,300 years of Greek emission theory from Euclid and Ptolemy.',
    aspect: 'aspect-[3/4]',
  },
  {
    image: '/images/sdam-optics/farisi-rainbow.jpg',
    icon: Microscope,
    title: 'Al-Fārisī · Rainbow formation',
    source: 'Source: Muslim Heritage',
    detail:
      'Diagram from Kamāl al-Dīn al-Fārisī\'s Tanqīḥ al-Manāẓir (c. 1300 CE) showing the path of light through a water-filled glass sphere — his model for the raindrop. Al-Fārisī used this to give the first correct explanation of the rainbow: two refractions and one internal reflection. Verified experimentally.',
    aspect: 'aspect-[4/3]',
  },
  {
    image: '/images/sdam-optics/camera-obscura-1.jpg',
    icon: Camera,
    title: 'Camera obscura · the ancestor of photography',
    source: 'Source: Camara Oscura World (historical illustration)',
    detail:
      'A historical illustration of the camera obscura — the apparatus Ibn al-Haytham proved and described in 1011 CE. This exact instrument, transmitted through Latin translations, became the photographic camera when Niepce (1822) and Daguerre (1839) added light-sensitive chemistry. The optics is Ibn al-Haytham\'s. Only the film is 19th-century.',
    aspect: 'aspect-[4/3]',
  },
];

export default function OpticsManuscriptEvidenceSection() {
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
          viewport={{ once: true, margin: "0px 0px 15% 0px" }}
          transition={{ duration: 0.8 }}
          className="text-center mb-14"
        >
          <p className="text-[10px] font-mono tracking-[0.4em] uppercase text-gold/70 mb-4">
            {tSections('ManuscriptEvidence.chapterTitle')}
          </p>
          <h2 className="font-display text-4xl sm:text-6xl md:text-7xl text-cream leading-tight">
            Real manuscripts.
            <br />
            <span className="text-gradient-gold italic">Real theorems.</span>
          </h2>
          <p className="mt-6 text-cream-dim max-w-2xl mx-auto text-sm sm:text-base">
            Every image below is an authentic historical artifact — a page from
            a surviving Arabic or Latin optics manuscript, with the actual
            geometric diagrams and equations. No AI, no reconstructions. Each
            comes with its source attribution.
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
                viewport={{ once: true, margin: "0px 0px 15% 0px" }}
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
          viewport={{ once: true, margin: "0px 0px 15% 0px" }}
          transition={{ duration: 0.7, delay: 0.4 }}
          className="mt-10 text-center"
        >
          <p className="text-cream-dim/70 text-xs italic max-w-2xl mx-auto leading-relaxed">
            All images are reproductions of authentic historical materials
            sourced from institutional archives and academic publications. No
            contemporary portrait of Ibn al-Haytham, Ibn Sahl, or al-Fārisī
            survives — what you see here are authentic manuscript pages with
            their actual geometric diagrams and calligraphic text.
          </p>
        </motion.div>
      </div>
    </section>
  );
}
