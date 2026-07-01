'use client';

import { motion } from 'framer-motion';
import Image from 'next/image';
import { BookOpen, Telescope, Scale } from 'lucide-react';
import { useTranslations } from 'next-intl';

const EVIDENCE = [
  {
    image: '/images/sdam-real/mizan-diagram-1.jpg',
    icon: BookOpen,
    title: 'Manuscript page · Kitāb mīzān al-ḥikma',
    source: 'Source: Muslim Heritage archive',
    detail:
      'Authentic page from a surviving manuscript of al-Khāzini\'s Book of the Balance of Wisdom. Visible are geometric diagrams and Arabic script — the original mathematical content, not a modern reconstruction. The diagrams illustrate the balance apparatus used to weigh bodies in air and water.',
    aspect: 'aspect-[4/3]',
  },
  {
    image: '/images/sdam-real/astrolabe-met-1.jpg',
    icon: Telescope,
    title: 'Surviving brass astrolabe',
    source: 'Source: The Metropolitan Museum of Art',
    detail:
      'A real medieval Islamic astrolabe from the Met\'s collection — the same type of instrument al-Bīrūnī used to measure angles to stars and to determine the dip angle for his Earth-radius calculation. Note the engraved angular scales, the rotating rete (star pointer), and the calligraphic rim inscriptions.',
    aspect: 'aspect-[3/4]',
  },
  {
    image: '/images/sdam-real/manuscript-sothebys.jpg',
    icon: Scale,
    title: 'Scientific manuscript page',
    source: "Source: Sotheby's auction record (public domain)",
    detail:
      'A medieval Arabic scientific manuscript page with geometric diagrams and calligraphic text. The layout — diagram embedded in running text — is the standard format Islamic Golden Age scientists used to present theorems. This is what mathematical proof looked like in 1100 CE.',
    aspect: 'aspect-[3/4]',
  },
  {
    image: '/images/sdam-real/manuscript-2.jpg',
    icon: BookOpen,
    title: 'Zodiacal / astronomical diagram',
    source: 'Source: Alamy (library reproduction)',
    detail:
      'Medieval Arabic manuscript page showing a circular astronomical diagram with calligraphic labels. Astronomical drawings like this were the empirical foundation on which al-Bīrūnī built his rejection of the Aristotelian "center of the universe" — every observation pointed to the Earth as the local center of attraction.',
    aspect: 'aspect-[4/5]',
  },
  {
    image: '/images/sdam-real/astrolabe-met-2.jpg',
    icon: Telescope,
    title: 'Astrolabe — reverse detail',
    source: 'Source: The Metropolitan Museum of Art',
    detail:
      'The reverse of a surviving medieval Islamic astrolabe. The engraved angular scales and sighting vanes (alidades) visible here are exactly what al-Bīrūnī used to measure the dip angle θ from a mountain summit — the input to his Earth-radius formula R = h·cos θ / (1 − cos θ).',
    aspect: 'aspect-[3/4]',
  },
  {
    image: '/images/sdam-real/manuscript-3.jpg',
    icon: Scale,
    title: 'Geometric theorem page',
    source: 'Source: Academia.edu (library reproduction)',
    detail:
      'Medieval Arabic scientific manuscript with a circular geometric construction and surrounding text. This is the visual language of Islamic Golden Age mathematics — circles, radii, and inscribed figures used to prove theorems. The same visual grammar appears in al-Khāzini\'s hydrostatic proofs.',
    aspect: 'aspect-[3/4]',
  },
];

export default function ManuscriptEvidenceSection() {
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
            <span className="text-gradient-gold italic">Real instruments.</span>
          </h2>
          <p className="mt-6 text-cream-dim max-w-2xl mx-auto text-sm sm:text-base">
            Every image below is an authentic historical artifact — a page from
            a surviving Arabic scientific manuscript, or a photograph of a
            surviving brass instrument held in a museum collection. No AI, no
            reconstructions. Each comes with its source attribution.
          </p>
        </motion.div>

        {/* Evidence grid — masonry-like layout */}
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
                {/* Image */}
                <div className={`relative ${item.aspect} overflow-hidden`}>
                  <Image
                    src={item.image}
                    alt={item.title}
                    fill
                    sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                    className="object-cover transition-transform duration-1000 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-cosmos-deep/80 via-transparent to-transparent" />
                  {/* Icon badge */}
                  <div className="absolute top-4 left-4 w-10 h-10 rounded-full glass-card-gold flex items-center justify-center backdrop-blur-md">
                    <Icon className="w-5 h-5 text-gold" />
                  </div>
                  {/* Plate number */}
                  <div className="absolute top-4 right-4 px-2.5 py-1 rounded-full glass-card backdrop-blur-md">
                    <span className="text-[9px] font-mono uppercase tracking-widest text-gold/80">
                      Plate {i + 1}
                    </span>
                  </div>
                </div>
                {/* Caption */}
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

        {/* Footnote / provenance */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true, margin: "0px 0px 15% 0px" }}
          transition={{ duration: 0.7, delay: 0.4 }}
          className="mt-10 text-center"
        >
          <p className="text-cream-dim/70 text-xs italic max-w-2xl mx-auto leading-relaxed">
            All images are reproductions of authentic historical materials
            sourced from institutional archives: The Metropolitan Museum of Art,
            Muslim Heritage, Sotheby&apos;s auction records, and academic
            reproductions via Alamy and Academia.edu. No contemporary portrait
            of al-Bīrūnī or al-Khāzini survives — what you see here are
            authentic manuscript illuminations from the same era and tradition.
          </p>
        </motion.div>
      </div>
    </section>
  );
}
