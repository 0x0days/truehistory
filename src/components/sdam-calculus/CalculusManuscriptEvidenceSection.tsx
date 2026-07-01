'use client';

import { motion } from 'framer-motion';
import Image from 'next/image';
import { BookOpen, Sigma, TrendingUp, Library, Crown, Flame } from 'lucide-react';
import { useTranslations } from 'next-intl';

const EVIDENCE = [
  {
    image: '/images/sdam-calculus/haytham-math-muslim-heritage.jpg',
    icon: Sigma,
    title: 'Ibn al-Haytham · Arabic mathematics',
    source: 'Source: Muslim Heritage archive',
    detail:
      'A page from a surviving Arabic mathematics manuscript in the tradition of Ibn al-Haytham. Visible: calligraphic text and geometric diagrams. This is the primary source material — the actual words in which the sum-of-fourth-powers formula and the paraboloid volume were proven.',
    aspect: 'aspect-[3/4]',
  },
  {
    image: '/images/sdam-calculus/sharaf-muslim-heritage-1.jpg',
    icon: TrendingUp,
    title: 'Sharaf al-Dīn al-Ṭūsī · equations manuscript',
    source: 'Source: Muslim Heritage',
    detail:
      'A page from a manuscript in the tradition of Sharaf al-Ṭūsī\'s On Equations — the work Roshdi Rashed (1986) showed contains recognizably differential analysis of cubic equations. The diagrams depict the geometric constructions al-Ṭūsī used to locate the maximum of a polynomial.',
    aspect: 'aspect-[3/4]',
  },
  {
    image: '/images/sdam-calculus/principia-corpus.jpg',
    icon: BookOpen,
    title: 'Newton · Principia Mathematica (1687)',
    source: 'Source: Corpus Newtonicum',
    detail:
      'A page from Newton\'s Principia Mathematica (1687) — the book credited with inventing calculus. The methods visible here — limits of sums, rates of change — were already in writing in Arabic manuscripts 666 years earlier. Newton\'s teacher Isaac Barrow knew the Arabic tradition; Newton himself owned and annotated works derived from Alhazen.',
    aspect: 'aspect-[3/4]',
  },
  {
    image: '/images/sdam-calculus/leibniz-auction.jpg',
    icon: BookOpen,
    title: 'Leibniz · Nova Methodus (1684)',
    source: 'Source: Auction Calendar (rare book reproduction)',
    detail:
      'A page from Leibniz\'s Nova Methodus pro Maximis et Minimis (1684) — the first published calculus paper. Leibniz\'s notation (dy/dx, ∫) survives in modern mathematics. The infinite series he published in 1676 (π/4 = 1 − 1/3 + 1/5 − …) had been stated by Mādhava 276 years earlier.',
    aspect: 'aspect-[3/4]',
  },
  {
    image: '/images/sdam-calculus/archimedes-smithsonian.jpg',
    icon: Library,
    title: 'Archimedes Palimpsest · the Greek precursor',
    source: 'Source: Smithsonian Magazine',
    detail:
      'The Archimedes Palimpsest — a 10th-century Byzantine manuscript of Archimedes\' works, including The Method, which uses a form of integration. Lost for a millennium, rediscovered in 1906. Archimedes\' method of exhaustion is the Greek precursor to Ibn al-Haytham\'s limit-of-sums.',
    aspect: 'aspect-[3/4]',
  },
  {
    image: '/images/sdam-calculus/napoleon-sothebys.jpg',
    icon: Crown,
    title: 'Description de l\'Égypte · Napoleon\'s loot (1809–1829)',
    source: "Source: Sotheby's",
    detail:
      'A plate from the Description de l\'Égypte — the 23-volume publication produced from the manuscripts and antiquities Napoleon\'s 167 scholars removed from Egypt in 1798–1801. This is the physical evidence of the colonial-era transfer of Arabic scientific knowledge to France.',
    aspect: 'aspect-[4/3]',
  },
];

export default function CalculusManuscriptEvidenceSection() {
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
            <span className="text-gradient-gold italic">Real transfer.</span>
          </h2>
          <p className="mt-6 text-cream-dim max-w-2xl mx-auto text-sm sm:text-base">
            Every image below is an authentic historical artifact — a page from
            a surviving Arabic, Latin, or Greek mathematics manuscript, or a
            reproduction of a colonial-era publication. No AI, no
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
            sourced from institutional archives: Muslim Heritage, Corpus
            Newtonicum, Smithsonian Magazine, Sotheby\'s auction records, and
            rare book dealers. The Vatican Library, British Library, and
            Bibliothèque nationale hold the originals.
          </p>
        </motion.div>
      </div>
    </section>
  );
}
