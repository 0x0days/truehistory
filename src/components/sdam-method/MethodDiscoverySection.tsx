'use client';

import { motion, useScroll, useTransform } from 'framer-motion';
import { useRef } from 'react';
import Image from 'next/image';
import { useTranslations } from 'next-intl';

export default function MethodDiscoverySection() {
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
            1020
          </h2>
          <p className="font-mono text-cream-dim tracking-[0.5em] uppercase text-xs sm:text-sm mt-2">
            Common Era · Cairo · Under House Arrest
          </p>
        </motion.div>

        <motion.div
          style={{ y: contentY, opacity: contentOpacity }}
          className="grid md:grid-cols-2 gap-8 items-center max-w-4xl mx-auto"
        >
          {/* REAL manuscript image */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true, margin: "0px 0px 15% 0px" }}
            transition={{ duration: 0.7 }}
            className="glass-card-gold rounded-2xl overflow-hidden relative group"
          >
            <div className="relative aspect-[3/4] overflow-hidden">
              <Image
                src="/images/sdam-method/doubts-renaissance.jpg"
                alt="Authentic medieval Arabic scientific manuscript page showing astronomical/geometric diagrams and calligraphic text"
                fill
                sizes="(max-width: 768px) 100vw, 50vw"
                className="object-cover transition-transform duration-700 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-cosmos-deep via-cosmos/40 to-transparent" />
              <div className="absolute bottom-0 left-0 right-0 p-5">
                <p className="font-arabic text-2xl text-gold mb-1" dir="rtl">
                  ابن الهيثم
                </p>
                <h3 className="font-display text-2xl sm:text-3xl text-cream leading-tight">
                  Abū ʿAlī al-Ḥasan
                </h3>
                <h3 className="font-display text-2xl sm:text-3xl text-gradient-gold italic leading-tight">
                  ibn al-Haytham
                </h3>
                <p className="text-cream-dim text-xs mt-1">
                  c. 965 – c. 1040 CE · Basra → Cairo
                </p>
              </div>
              <div className="absolute top-3 left-3 w-6 h-6 border-t-2 border-l-2 border-gold/60" />
              <div className="absolute top-3 right-3 w-6 h-6 border-t-2 border-r-2 border-gold/60" />
              <div className="absolute bottom-3 left-3 w-6 h-6 border-b-2 border-l-2 border-gold/60" />
              <div className="absolute bottom-3 right-3 w-6 h-6 border-b-2 border-r-2 border-gold/60" />
            </div>
            <div className="p-4 pt-3 border-t border-gold/15 bg-cosmos-deep/50">
              <p className="text-[10px] font-mono uppercase tracking-widest text-cream-dim/70 text-center italic">
                Authentic medieval Arabic scientific manuscript
              </p>
            </div>
          </motion.div>

          {/* The breakthrough statement */}
          <div className="relative">
            <div className="text-gold/40 text-6xl font-display absolute -top-6 -left-2 select-none">
              &ldquo;
            </div>
            <blockquote className="font-display text-xl sm:text-2xl md:text-3xl text-cream leading-relaxed italic pl-8 border-l-2 border-gold/40">
              The seeker after truth must investigate what his predecessors have
              written and reflect on it. He should not accept their views
              uncritically.
            </blockquote>
            <p className="text-cream-dim text-sm mt-4 pl-8">
              — Ibn al-Haytham, <em>Doubts Concerning Ptolemy</em> (Al-Shukūk
              ʿalā Baṭlamyūs), c. 1025–1030 CE
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
                  Polymath in Cairo, placed under house arrest by the Caliph
                  al-Ḥākim for 10 years.
                </span>
              </div>
              <div className="flex items-baseline gap-2">
                <span className="text-gold text-xs font-mono">02</span>
                <span className="text-cream/85 text-sm">
                  Used the confinement to write 200+ works — including the
                  7-volume <em>Kitāb al-Manāẓir</em> and <em>Doubts Concerning
                  Ptolemy</em>.
                </span>
              </div>
              <div className="flex items-baseline gap-2">
                <span className="text-gold text-xs font-mono">03</span>
                <span className="text-cream/85 text-sm">
                  Stated the method explicitly: observe → hypothesize → test →
                  verify → repeat → publish.
                </span>
              </div>
              <div className="pt-4">
                <p className="text-cream/90 text-base leading-relaxed">
                  With this single move, Ibn al-Haytham{' '}
                  <span className="text-gold font-medium">
                    destroyed the authority principle
                  </span>{' '}
                  that had governed science since Aristotle. Truth, he wrote, is
                  &ldquo;sought for itself&rdquo; — not received from books, not
                  decreed by teachers. The paradigm had shifted —{' '}
                  <span className="text-gradient-gold font-semibold">
                    600 years before Francis Bacon&apos;s Novum Organum
                  </span>{' '}
                  — on the strength of explicit method, not poetic intuition.
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
            But stating the method was only the beginning.
          </p>
          <p className="text-gold font-display text-xl sm:text-2xl italic mt-2">
            He wrote it down. He applied it. He made it reproducible.
          </p>
        </motion.div>
      </div>
    </section>
  );
}
