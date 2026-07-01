'use client';

import { motion, useScroll, useTransform } from 'framer-motion';
import { useRef } from 'react';
import Image from 'next/image';
import { useTranslations } from 'next-intl';

export default function NavDiscoverySection() {
  const tCommon = useTranslations('Discovery.common');

  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start end', 'end start'],
  });

  const yearScale = useTransform(scrollYProgress, [0.15, 0.45], [0.3, 1]);
  const yearOpacity = useTransform(scrollYProgress, [0.15, 0.4], [0, 1]);
  const contentY = useTransform(scrollYProgress, [0.3, 0.6], [60, 0]);
  const contentOpacity = useTransform(scrollYProgress, [0.3, 0.6], [0, 1]);
  const ringRotate = useTransform(scrollYProgress, [0, 1], [0, 120]);

  return (
    <section
      id="discovery"
      ref={ref}
      className="relative min-h-screen flex flex-col items-center justify-center px-6 py-24 overflow-hidden"
    >
      <motion.div
        style={{ rotate: ringRotate }}
        className="absolute -top-40 -right-40 w-[500px] h-[500px] rounded-full border border-gold/10 pointer-events-none"
      >
        <div className="absolute inset-8 rounded-full border border-gold/8" />
        <div className="absolute inset-20 rounded-full border border-gold/6" />
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-3 h-3 rounded-full bg-gold glow-gold" />
      </motion.div>

      <div className="max-w-5xl w-full relative z-10">
        <motion.div
          style={{ opacity: yearOpacity, scale: yearScale }}
          className="text-center mb-12"
        >
          <p className="text-[10px] font-mono tracking-[0.4em] uppercase text-gold/70 mb-6">
            {tCommon('chapterTitle')}
          </p>
          <h2 className="font-display text-[16vw] sm:text-[12vw] md:text-[10rem] leading-none text-gradient-gold text-glow-gold">
            944
          </h2>
          <p className="font-mono text-cream-dim tracking-[0.5em] uppercase text-xs sm:text-sm mt-2">
            Common Era · Aleppo
          </p>
        </motion.div>

        <motion.div
          style={{ y: contentY, opacity: contentOpacity }}
          className="grid md:grid-cols-2 gap-8 items-center max-w-4xl mx-auto"
        >
          {/* REAL astrolabe image */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true, margin: "0px 0px 15% 0px" }}
            transition={{ duration: 0.7 }}
            className="glass-card-gold rounded-2xl overflow-hidden relative group"
          >
            <div className="relative aspect-[3/4] overflow-hidden">
              <Image
                src="/images/sdam-nav/astrolabe-islamic-art.jpg"
                alt="Authentic surviving medieval Islamic astrolabe with Arabic inscriptions, the type manufactured by Mariam al-Asturlabiya"
                fill
                sizes="(max-width: 768px) 100vw, 50vw"
                className="object-cover transition-transform duration-700 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-cosmos-deep via-cosmos/40 to-transparent" />
              <div className="absolute bottom-0 left-0 right-0 p-5">
                <p className="font-arabic text-2xl text-gold mb-1" dir="rtl">
                  مريم الأسطرلابية
                </p>
                <h3 className="font-display text-2xl sm:text-3xl text-cream leading-tight">
                  Mariam
                </h3>
                <h3 className="font-display text-2xl sm:text-3xl text-gradient-gold italic leading-tight">
                  al-Asturlābiyya
                </h3>
                <p className="text-cream-dim text-xs mt-1">
                  early 10th century · Aleppo, Syria
                </p>
              </div>
              <div className="absolute top-3 left-3 w-6 h-6 border-t-2 border-l-2 border-gold/60" />
              <div className="absolute top-3 right-3 w-6 h-6 border-t-2 border-r-2 border-gold/60" />
              <div className="absolute bottom-3 left-3 w-6 h-6 border-b-2 border-l-2 border-gold/60" />
              <div className="absolute bottom-3 right-3 w-6 h-6 border-b-2 border-r-2 border-gold/60" />
            </div>
            <div className="p-4 pt-3 border-t border-gold/15 bg-cosmos-deep/50">
              <p className="text-[10px] font-mono uppercase tracking-widest text-cream-dim/70 text-center italic">
                Authentic surviving medieval Islamic astrolabe
              </p>
            </div>
          </motion.div>

          {/* The breakthrough statement */}
          <div className="relative">
            <div className="text-gold/40 text-6xl font-display absolute -top-6 -left-2 select-none">
              &ldquo;
            </div>
            <blockquote className="font-display text-xl sm:text-2xl md:text-3xl text-cream leading-relaxed italic pl-8 border-l-2 border-gold/40">
              She manufactured astrolabes — the precision instruments that made
              celestial navigation possible — in Aleppo, and was employed at the
              court of Sayf al-Dawla.
            </blockquote>
            <p className="text-cream-dim text-sm mt-4 pl-8">
              — Ibn al-Nadīm, <em>al-Fihrist</em> (987 CE), and Ibn al-Ṣābiʾ,
              <em> Tārīkh</em>
            </p>

            <motion.div
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true, margin: "0px 0px 15% 0px" }}
              transition={{ delay: 0.5, duration: 0.8 }}
              className="mt-8 pl-8 space-y-3"
            >
              <div className="flex items-baseline gap-2">
                <span className="text-gold text-xs font-mono">01</span>
                <span className="text-cream/85 text-sm">
                  The only female astrolabe maker recorded in the medieval Islamic world.
                </span>
              </div>
              <div className="flex items-baseline gap-2">
                <span className="text-gold text-xs font-mono">02</span>
                <span className="text-cream/85 text-sm">
                  Her astrolabes were precision instruments — the navigational
                  computers of their era, used for latitude, qibla, and time.
                </span>
              </div>
              <div className="flex items-baseline gap-2">
                <span className="text-gold text-xs font-mono">03</span>
                <span className="text-cream/85 text-sm">
                  <span className="text-gradient-gold font-semibold">554 years</span> before
                  Columbus. Her instruments enabled the navigation Europeans
                  later claimed as their own.
                </span>
              </div>
              <div className="pt-4">
                <p className="text-cream/90 text-base leading-relaxed">
                  No contemporary portrait of Mariam survives. What survives is
                  the{' '}
                  <span className="text-gold font-medium">instrument itself</span>{' '}
                  — the astrolabes in museum collections today are direct
                  descendants of the manufacturing tradition she perfected. Her
                  name was recorded by Ibn al-Nadīm in 987 CE. Then it was{' '}
                  <span className="text-gradient-gold font-semibold">erased</span>.
                </p>
              </div>
            </motion.div>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true, margin: "0px 0px 15% 0px" }}
          transition={{ delay: 0.4 }}
          className="text-center mt-16"
        >
          <p className="text-cream-dim text-sm">
            Mariam built the instruments. But the navigation treatises came from the sailors.
          </p>
          <p className="text-gold font-display text-xl sm:text-2xl italic mt-2">
            Ibn Mājid and al-Mahrī wrote them down.
          </p>
        </motion.div>
      </div>
    </section>
  );
}
