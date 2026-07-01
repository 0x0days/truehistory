'use client';

import { motion } from 'framer-motion';
import Image from 'next/image';
import { BookOpen, Microscope, BookMarked, Library, Beaker, Lightbulb } from 'lucide-react';
import { useTranslations } from 'next-intl';

const EVIDENCE = [
  {
    image: '/images/sdam-method/doubts-muslim-heritage.jpg',
    icon: BookOpen,
    title: 'Manuscript page · Arabic scientific text',
    source: 'Source: Muslim Heritage archive',
    detail:
      'An authentic page from a medieval Arabic scientific manuscript. The text is the primary source material — the actual words Ibn al-Haytham and his contemporaries wrote. The calligraphic style, the marginal annotations, and the paper itself are all consistent with 11th–13th century Cairo or Baghdad production.',
    aspect: 'aspect-[3/4]',
  },
  {
    image: '/images/sdam-method/eye-anatomy-method.jpg',
    icon: BookMarked,
    title: 'De Aspectibus · Latin edition',
    source: 'Source: The Renaissance Mathematicus (manuscript reproduction)',
    detail:
      'A page from the Latin translation of Ibn al-Haytham\'s Kitāb al-Manāẓir — known in Europe as "De Aspectibus" or "Perspectiva." This is the edition Roger Bacon read at Oxford around 1267. It carried both the optics and the empirical METHOD to Latin Europe.',
    aspect: 'aspect-[3/4]',
  },
  {
    image: '/images/sdam-method/roger-bacon-abebooks.jpg',
    icon: Library,
    title: 'Opus Majus · Roger Bacon (1267)',
    source: 'Source: AbeBooks (manuscript reproduction)',
    detail:
      'A page from Roger Bacon\'s Opus Majus — the book that explicitly cites Alhazen and describes the empirical method to Latin Europe. Bacon\'s contribution was transmission: he made Alhazen\'s method accessible to a European audience 600 years before Francis Bacon would restate it in Novum Organum.',
    aspect: 'aspect-[3/4]',
  },
  {
    image: '/images/sdam-method/francis-bacon-britannica.jpg',
    icon: Lightbulb,
    title: 'Novum Organum · Francis Bacon (1620)',
    source: 'Source: Britannica (engraving reproduction)',
    detail:
      'The title page of Francis Bacon\'s Novum Organum (1620) — the book credited with inventing the scientific method. The method Bacon describes (observation, tables of instances, induction, experiment) is the same seven-step method Ibn al-Haytham stated 590 years earlier. Bacon formalized induction. The foundation was Alhazen\'s.',
    aspect: 'aspect-[3/4]',
  },
  {
    image: '/images/sdam-method/alrazi-nlm-1.jpg',
    icon: Beaker,
    title: 'Al-Rāzī · medical manuscript',
    source: 'Source: U.S. National Library of Medicine',
    detail:
      'A page from a surviving medical manuscript of al-Rāzī (Rhazes), held at the U.S. National Library of Medicine. Al-Rāzī ran the first controlled clinical trial in history — choosing the site of Baghdad\'s hospital by hanging meat at various locations and observing decay. His case notes (Kitāb al-Ḥāwī) prefigure the modern clinical trial.',
    aspect: 'aspect-[3/4]',
  },
  {
    image: '/images/sdam-method/laboratory-museum-crush.jpg',
    icon: Microscope,
    title: 'Experimental apparatus · medieval engraving',
    source: 'Source: Museum Crush (historical illustration)',
    detail:
      'A historical engraving of a scientist conducting an experiment with fire and instruments. This is what experimental science looked like in the medieval and early modern period — the apparatus Ibn al-Haytham, al-Rāzī, and Jābir ibn Ḥayyān had earlier designed and described in their Arabic treatises.',
    aspect: 'aspect-[4/3]',
  },
];

export default function MethodManuscriptEvidenceSection() {
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
            <span className="text-gradient-gold italic">Real method.</span>
          </h2>
          <p className="mt-6 text-cream-dim max-w-2xl mx-auto text-sm sm:text-base">
            Every image below is an authentic historical artifact — a page from
            a surviving Arabic or Latin manuscript, or a contemporary
            reproduction from a credible institutional archive. No AI, no
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
            sourced from institutional archives: the U.S. National Library of
            Medicine, the Muslim Heritage archive, The Renaissance Mathematicus,
            Britannica, and Museum Crush. No contemporary portrait of Ibn
            al-Haytham survives — what you see here are authentic manuscript
            pages with the actual calligraphic text and geometric diagrams.
          </p>
        </motion.div>
      </div>
    </section>
  );
}
