'use client';

import { motion } from 'framer-motion';
import Image from 'next/image';
import { Camera, ArrowRight } from 'lucide-react';

const CHAIN = [
  {
    year: '1011 CE',
    person: 'Ibn al-Haytham',
    location: 'Cairo',
    contribution: 'Proves the camera obscura theorem. Light through a pinhole forms an inverted image on the far wall.',
    detail:
      'The apparatus itself is the discovery. Ibn al-Haytham did not "invent" the camera obscura — he proved mathematically WHY it works (light travels in straight lines), and he experimentally verified the inversion. Every photograph taken since 1822 uses this exact optical principle.',
    image: '/images/sdam-optics/camera-obscura-4.jpg',
    imageAlt: 'Historical illustration of a camera obscura apparatus, the foundational technology of photography',
    source: 'Alamy (historical illustration)',
    essential: true,
  },
  {
    year: 'c. 1490 CE',
    person: 'Leonardo da Vinci',
    location: 'Florence',
    contribution: 'Describes the camera obscura in his Codex Atlanticus, explicitly citing "Alhazen" (Ibn al-Haytham) as the source.',
    detail:
      'Da Vinci is sometimes credited with "discovering" the camera obscura in Europe. He did not — he learned it from the Latin translation of Ibn al-Haytham\'s Optics. Da Vinci\'s contribution was using it as a drawing aid for artists. He was honest about the source. Later European accounts were not.',
    image: '/images/sdam-optics/davinci-camera-1.jpg',
    imageAlt: 'Authentic page from Leonardo da Vinci\'s notebooks showing optical and anatomical studies',
    source: 'Alamy (historical reproduction)',
    essential: false,
  },
  {
    year: '1826–27 CE',
    person: 'Joseph Nicéphore Niépce',
    location: 'Saint-Loup-de-Varennes, France',
    contribution: 'Captures "View from the Window at Le Gras" — the oldest surviving photograph. Uses bitumen of Judea on a pewter plate inside a camera obscura.',
    detail:
      'Niépce took the first photograph 17 years before Daguerre. His apparatus was literally a camera obscura fitted with a light-sensitive plate. The optics was Ibn al-Haytham\'s 1011 theorem. Only the chemistry (bitumen of Judea, hardened by light) was Niépce\'s innovation. Daguerre would later commercialize a different chemistry — but the camera was already 800 years old.',
    image: '/images/sdam-optics/niepce-view-le-gras.jpg',
    imageAlt: 'Joseph Nicéphore Niépce\'s View from the Window at Le Gras (1826/27), the oldest surviving photograph',
    source: 'Public domain (photo reproduction)',
    essential: true,
  },
  {
    year: '1839 CE',
    person: 'Louis Daguerre',
    location: 'Paris',
    contribution: 'Announces the daguerreotype — a commercial photographic process using silver-plated copper and iodine vapor.',
    detail:
      'Daguerre is routinely credited as "the inventor of photography." He was not. Niépce had made photographs 17 years earlier (and had been Daguerre\'s partner from 1829 until Niépce\'s death in 1833). Daguerre\'s contribution was a faster, more practical chemistry — silver iodide developed with mercury vapor. The optics was Ibn al-Haytham\'s. The first image was Niépce\'s. Daguerre\'s real role was commercialization.',
    image: '/images/sdam-optics/daguerre-boulevard.jpg',
    imageAlt: 'Louis Daguerre\'s Boulevard du Temple (1838), one of the earliest surviving photographs of a person',
    source: 'Khan Academy (public domain)',
    essential: true,
  },
];

export default function PhotographyChainSection() {
  return (
    <section
      id="photography"
      className="relative min-h-screen flex flex-col items-center justify-center px-6 py-24 overflow-hidden"
    >
      {/* Background — subtle camera-aperture pattern */}
      <div
        className="absolute inset-0 opacity-[0.02] pointer-events-none"
        style={{
          backgroundImage:
            'repeating-conic-gradient(from 0deg, rgba(212,175,55,0.4) 0deg 15deg, transparent 15deg 30deg)',
          backgroundSize: '400px 400px',
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
          <p className="text-[10px] font-mono tracking-[0.4em] uppercase text-gold/70 mb-4 flex items-center justify-center gap-2">
            <Camera className="w-3 h-3" />
            Chapter 08 — The Photography Chain
          </p>
          <h2 className="font-display text-4xl sm:text-6xl md:text-7xl text-cream leading-tight">
            Photography was not
            <br />
            <span className="text-gradient-gold italic">invented in France.</span>
          </h2>
          <p className="mt-6 text-cream-dim max-w-2xl mx-auto text-sm sm:text-base leading-relaxed">
            Daguerre (1839) did not invent photography. Niépce (1826) made the
            first photograph 13 years earlier. And neither would have been
            possible without the camera obscura — a theorem proved by Ibn
            al-Haytham in Cairo in 1011 CE, 815 years before Niépce pressed
            bitumen onto a pewter plate.
          </p>
        </motion.div>

        {/* The chain — vertical timeline */}
        <div className="relative max-w-4xl mx-auto">
          {/* Vertical line */}
          <div className="absolute left-8 sm:left-1/2 top-0 bottom-0 w-px -translate-x-1/2 bg-gold/20" />

          <div className="space-y-12">
            {CHAIN.map((step, i) => {
              const isLeft = i % 2 === 0;
              return (
                <motion.div
                  key={step.year}
                  initial={{ opacity: 0, y: 40 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "0px 0px 15% 0px" }}
                  transition={{ duration: 0.7, delay: i * 0.1 }}
                  className={`relative pl-20 sm:pl-0 flex ${isLeft ? 'sm:justify-start' : 'sm:justify-end'}`}
                >
                  {/* Node */}
                  <div className="absolute left-8 sm:left-1/2 top-8 -translate-x-1/2 z-10">
                    <div
                      className={`w-6 h-6 rounded-full border-2 ${
                        step.essential
                          ? 'bg-gold border-gold glow-gold'
                          : 'bg-cosmos border-gold/60'
                      } flex items-center justify-center`}
                    >
                      {step.essential && (
                        <span className="w-2 h-2 rounded-full bg-cosmos" />
                      )}
                    </div>
                  </div>

                  {/* Card */}
                  <div
                    className={`glass-card rounded-2xl overflow-hidden max-w-md w-full ${
                      isLeft ? 'sm:mr-12' : 'sm:ml-12'
                    } ${step.essential ? 'glass-card-gold' : ''}`}
                  >
                    <div className="relative h-40 overflow-hidden">
                      <Image
                        src={step.image}
                        alt={step.imageAlt}
                        fill
                        sizes="(max-width: 768px) 100vw, 50vw"
                        className="object-cover"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-cosmos-deep via-cosmos/30 to-transparent" />
                      <div className="absolute bottom-0 left-0 right-0 p-4">
                        <p className="font-mono text-xs text-gold tracking-wider">
                          {step.year} · {step.location}
                        </p>
                        <h3 className="font-display text-xl text-cream italic leading-tight">
                          {step.person}
                        </h3>
                      </div>
                      {step.essential && (
                        <div className="absolute top-3 right-3 px-2 py-1 rounded-full bg-gold/20 border border-gold/50 backdrop-blur-md">
                          <span className="text-[9px] font-mono uppercase tracking-widest text-gold">
                            Essential link
                          </span>
                        </div>
                      )}
                    </div>
                    <div className="p-5">
                      <p className="font-display text-base text-gradient-gold italic mb-3 leading-snug">
                        {step.contribution}
                      </p>
                      <p className="text-cream/85 text-xs leading-relaxed">
                        {step.detail}
                      </p>
                      <p className="text-[10px] font-mono uppercase tracking-widest text-gold/60 mt-3 pt-3 border-t border-gold/15">
                        {step.source}
                      </p>
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </div>

          {/* Conclusion */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "0px 0px 15% 0px" }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="mt-16 text-center"
          >
            <div className="glass-card-gold rounded-2xl p-6 sm:p-8 max-w-2xl mx-auto">
              <ArrowRight className="w-6 h-6 text-gold mx-auto mb-3" />
              <p className="font-display text-xl sm:text-2xl text-cream italic leading-snug">
                Take away Ibn al-Haytham&apos;s camera obscura (1011 CE), and
                photography does not exist — not in 1826, not in 1839, not today.
              </p>
              <p className="text-cream-dim text-xs mt-4">
                The chemistry changed. The optics never did. The optics was
                already 815 years old when Niépce pressed bitumen onto his
                plate.
              </p>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
