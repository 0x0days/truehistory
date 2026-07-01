'use client';

import { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { useTranslations } from 'next-intl';

const MYTH_FIGURES = [
  {
    year: '~1000 CE',
    name: 'Norse Vikings',
    claim: 'Leif Erikson reaches North America. Vikings navigate by sunstone and polaris.',
    note: 'Northern latitude sailing — limited, not a general system.',
  },
  {
    year: '1415 CE',
    name: 'Portuguese Age of Discovery',
    claim: 'Henry the Navigator establishes the school at Sagres. "Invents" celestial navigation.',
    note: 'Henry\'s school used translated Arabic instruments and tables.',
  },
  {
    year: '1492 CE',
    name: 'Christopher Columbus',
    claim: 'Crosses the Atlantic using dead reckoning and a quadrant. Credited with "discovering" the New World.',
    note: 'Used instruments and tables of Arabic origin, transmitted through Spain.',
  },
  {
    year: '1497–98 CE',
    name: 'Vasco da Gama',
    claim: 'First European to reach India by sea. "Founds" the spice trade route.',
    note: 'Was guided across the Indian Ocean by the Muslim navigator Ahmad ibn Mājid.',
  },
  {
    year: '1519–22 CE',
    name: 'Magellan / Elcano',
    claim: 'First circumnavigation of the globe. The pinnacle of "European navigation."',
    note: 'Used Arabic-derived instruments and charts throughout.',
  },
];

export default function NavMythSection() {
  const tCommon = useTranslations('Myth.common');
  const t = useTranslations('Myth.nav');

  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start end', 'end start'],
  });

  const lineScale = useTransform(scrollYProgress, [0.1, 0.7], [0, 1]);
  const problemY = useTransform(scrollYProgress, [0.7, 0.95], [60, 0]);
  const problemOpacity = useTransform(scrollYProgress, [0.7, 0.95], [0, 1]);

  return (
    <section
      id="myth"
      ref={ref}
      className="relative min-h-screen flex flex-col items-center justify-center px-6 py-24"
    >
      <div className="max-w-5xl w-full">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "0px 0px 15% 0px" }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <p className="text-[10px] font-mono tracking-[0.4em] uppercase text-gold/70 mb-4">
            {tCommon('chapterTitle')}
          </p>
          <h2 className="font-display text-4xl sm:text-6xl md:text-7xl text-cream leading-tight">
            {tCommon('officialNarrative')}
            <br />
            <span className="text-gradient-gold italic">{t('subtitle')}</span>
          </h2>
          <p className="mt-6 text-cream-dim max-w-2xl mx-auto text-base sm:text-lg">

            {t('intro')}
          </p>
        </motion.div>

        <div className="relative">
          <div className="absolute left-6 sm:left-1/2 top-0 bottom-0 w-px -translate-x-1/2 bg-cream-dim/15" />
          <motion.div
            style={{ scaleY: lineScale, transformOrigin: 'top' }}
            className="absolute left-6 sm:left-1/2 top-0 bottom-0 w-px -translate-x-1/2 gradient-gold"
          />

          <div className="space-y-20">
            {MYTH_FIGURES.map((fig, i) => (
              <TimelineCard key={fig.name} figure={fig} index={i} />
            ))}
          </div>
        </div>

        <motion.div
          style={{ y: problemY, opacity: problemOpacity }}
          className="mt-24 text-center"
        >
          <p className="text-[10px] font-mono tracking-[0.4em] uppercase text-burgundy mb-4">
            {tCommon('butThereIsAProblem')}
          </p>
          <h3 className="font-display text-3xl sm:text-5xl md:text-6xl text-cream leading-tight max-w-3xl mx-auto">
            {t('problem1')} {t('problemHighlight')}.
          </h3>
          <motion.div
            initial={{ width: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true, margin: "0px 0px 15% 0px" }}
            transition={{ duration: 0.9, delay: 0.3 }}
            className="h-px gradient-gold mx-auto mt-8"
          />
        </motion.div>
      </div>
    </section>
  );
}

function TimelineCard({
  figure,
  index,
}: {
  figure: (typeof MYTH_FIGURES)[number];
  index: number;
}) {
  const isLeft = index % 2 === 0;
  return (
    <motion.div
      initial={{ opacity: 0, y: 50, x: isLeft ? -30 : 30 }}
      whileInView={{ opacity: 1, y: 0, x: 0 }}
      viewport={{ once: true, margin: "0px 0px 15% 0px" }}
      transition={{ duration: 0.8, delay: 0.1 }}
      className={`relative pl-16 sm:pl-0 flex ${isLeft ? 'sm:justify-start' : 'sm:justify-end'}`}
    >
      <div className="absolute left-6 sm:left-1/2 top-6 -translate-x-1/2 z-10">
        <div className="w-4 h-4 rounded-full bg-cosmos border-2 border-gold glow-gold" />
      </div>

      <div
        className={`glass-card rounded-2xl p-6 sm:p-8 max-w-md w-full ${
          isLeft ? 'sm:mr-12' : 'sm:ml-12'
        }`}
      >
        <div className="flex items-baseline gap-3 mb-3">
          <span className="text-gold font-mono text-sm tracking-wider">
            {figure.year}
          </span>
          <span className="h-px flex-1 bg-gold/20" />
        </div>
        <h3 className="font-display text-2xl sm:text-3xl text-cream mb-3">
          {figure.name}
        </h3>
        <p className="text-cream/85 text-sm sm:text-base leading-relaxed mb-3">
          {figure.claim}
        </p>
        <p className="text-cream-dim italic text-xs sm:text-sm border-l-2 border-gold/30 pl-3">
          {figure.note}
        </p>
      </div>
    </motion.div>
  );
}
