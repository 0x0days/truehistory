'use client';

import { useEffect, useRef, useState } from 'react';
import { motion, useInView } from 'framer-motion';
import { ScrollText, Feather, Orbit } from 'lucide-react';
import Image from 'next/image';
import { useTranslations } from 'next-intl';

const FULL_QUOTE =
  'If two circles are arranged such that one rolls inside the other of twice the diameter, a point on the smaller circle traces a straight line — generating linear motion from two circular motions.';

export default function AstroProofSection() {
  const tSections = useTranslations('Sections');
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: '-200px' });
  const [typed, setTyped] = useState('');
  const [done, setDone] = useState(false);

  useEffect(() => {
    if (!inView) return;
    let i = 0;
    const interval = setInterval(() => {
      i += 1;
      setTyped(FULL_QUOTE.slice(0, i));
      if (i >= FULL_QUOTE.length) {
        clearInterval(interval);
        setTimeout(() => setDone(true), 400);
      }
    }, 32);
    return () => clearInterval(interval);
  }, [inView]);

  return (
    <section
      id="proof"
      ref={ref}
      className="relative min-h-screen flex flex-col items-center justify-center px-6 py-24 manuscript-bg overflow-hidden"
    >
      <motion.div
        animate={{ rotate: [0, 6, 0], y: [0, -8, 0] }}
        transition={{ duration: 6, repeat: Infinity, ease: 'easeInOut' }}
        className="absolute top-20 right-10 sm:right-20 opacity-20"
      >
        <Feather className="w-16 h-16 text-gold" />
      </motion.div>

      <div className="max-w-6xl w-full relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "0px 0px 15% 0px" }}
          transition={{ duration: 0.8 }}
          className="text-center mb-12"
        >
          <p className="text-[10px] font-mono tracking-[0.4em] uppercase text-gold/70 mb-4">
            {tSections('Proof.chapterTitle')}
          </p>
          <h2 className="font-display text-4xl sm:text-6xl md:text-7xl text-cream leading-tight">
            <span className="text-gradient-gold">1247 CE.</span>
            <br />
            The Tusi Couple.
          </h2>
        </motion.div>

        <div className="grid lg:grid-cols-3 gap-6 mb-8">
          {/* Al-Tusi portrait card with REAL manuscript */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "0px 0px 15% 0px" }}
            transition={{ duration: 0.7 }}
            className="glass-card-gold rounded-2xl overflow-hidden relative group"
          >
            <div className="relative aspect-[3/4] overflow-hidden">
              <Image
                src="/images/sdam-astro/tusi-nature-2.jpg"
                alt="Authentic page from a Maragheh astronomical manuscript showing geometric planetary diagrams and Arabic text"
                fill
                sizes="(max-width: 1024px) 100vw, 33vw"
                className="object-cover transition-transform duration-700 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-cosmos-deep via-cosmos/30 to-transparent" />
              <div className="absolute bottom-0 left-0 right-0 p-4">
                <p className="font-arabic text-xl text-gold mb-1" dir="rtl">
                  نصیر الدین الطوسی
                </p>
                <h3 className="font-display text-lg text-cream leading-tight">
                  Naṣīr al-Dīn al-Ṭūsī
                </h3>
                <p className="text-cream-dim text-xs mt-1">
                  1201 – 1274 CE · Maragheh, Persia
                </p>
              </div>
              <div className="absolute top-3 left-3 w-5 h-5 border-t-2 border-l-2 border-gold/60" />
              <div className="absolute top-3 right-3 w-5 h-5 border-t-2 border-r-2 border-gold/60" />
              <div className="absolute bottom-3 left-3 w-5 h-5 border-b-2 border-l-2 border-gold/60" />
              <div className="absolute bottom-3 right-3 w-5 h-5 border-b-2 border-r-2 border-gold/60" />
            </div>
            <div className="p-3 border-t border-gold/15 bg-cosmos-deep/50">
              <p className="text-[9px] font-mono uppercase tracking-widest text-cream-dim/70 text-center italic">
                Authentic Maragheh astronomical manuscript
              </p>
            </div>
          </motion.div>

          {/* Manuscript metadata card */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "0px 0px 15% 0px" }}
            transition={{ duration: 0.7, delay: 0.15 }}
            className="glass-card-gold rounded-2xl p-6 relative flex flex-col"
          >
            <div className="flex items-center gap-3 mb-4">
              <Orbit className="w-6 h-6 text-gold" />
              <span className="font-mono text-xs uppercase tracking-widest text-gold/80">
                The Maragheh School
              </span>
            </div>
            <p className="font-arabic text-3xl text-gold mb-2" dir="rtl">
              المرصد المراغی
            </p>
            <h3 className="font-display text-xl text-cream mb-1 italic">
              Maragheh Observatory
            </h3>
            <p className="text-cream-dim text-sm mb-6">
              Founded 1259 CE · Persia
            </p>

            <div className="space-y-3 text-sm flex-1">
              <div>
                <p className="text-cream-dim text-xs uppercase tracking-wider mb-1">
                  Founder
                </p>
                <p className="text-cream">Naṣīr al-Dīn al-Ṭūsī, under Hulagu Khan</p>
              </div>
              <div>
                <p className="text-cream-dim text-xs uppercase tracking-wider mb-1">
                  Library
                </p>
                <p className="text-cream">~400,000 manuscripts — the largest scientific library of its era</p>
              </div>
              <div>
                <p className="text-cream-dim text-xs uppercase tracking-wider mb-1">
                  Contribution
                </p>
                <p className="text-cream/85 text-xs leading-relaxed">
                  The Tusi Couple, planetary models eliminating the equant, the Ilkhanic Tables. The mathematics Copernicus would later use.
                </p>
              </div>
              <div>
                <p className="text-cream-dim text-xs uppercase tracking-wider mb-1">
                  Surviving MSS
                </p>
                <p className="text-cream">
                  Tehran, Vatican, Istanbul, Oxford (Bodleian)
                </p>
              </div>
            </div>

            <div className="mt-4 pt-4 border-t border-gold/15">
              <div className="flex items-center gap-2 text-gold/80 text-xs">
                <ScrollText className="w-4 h-4" />
                <span className="font-mono uppercase tracking-wider">
                  Tusi Couple · 1247 CE
                </span>
              </div>
            </div>
          </motion.div>

          {/* REAL Copernicus page for comparison */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "0px 0px 15% 0px" }}
            transition={{ duration: 0.7, delay: 0.3 }}
            className="glass-card rounded-2xl overflow-hidden relative group"
          >
            <div className="relative aspect-[4/3] overflow-hidden">
              <Image
                src="/images/sdam-astro/copernicus-ziereis-2.jpg"
                alt="Authentic page from Copernicus's De Revolutionibus showing the heliocentric planetary diagrams"
                fill
                sizes="(max-width: 1024px) 100vw, 33vw"
                className="object-cover transition-transform duration-700 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-cosmos-deep/90 via-cosmos/20 to-transparent" />
              <div className="absolute bottom-0 left-0 right-0 p-4">
                <p className="font-mono text-[10px] uppercase tracking-widest text-gold/80 mb-1">
                  Plate I — The "copy" (1543)
                </p>
                <h3 className="font-display text-lg text-cream italic leading-tight">
                  De Revolutionibus
                </h3>
                <p className="text-cream-dim text-xs mt-1">
                  Copernicus · 296 years after al-Ṭūsī
                </p>
              </div>
            </div>
            <div className="p-3 border-t border-gold/15">
              <p className="text-[10px] text-cream-dim/70 leading-relaxed italic">
                Copernicus&apos;s planetary diagrams use devices mathematically
                identical to the Tusi Couple. The transmission is documented.
              </p>
            </div>
          </motion.div>
        </div>

        {/* The typewriter quote — full width */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "0px 0px 15% 0px" }}
          transition={{ duration: 0.7, delay: 0.4 }}
          className="glass-card rounded-2xl p-8 sm:p-10 relative flex flex-col"
        >
          <span className="text-gold/30 text-7xl font-display absolute top-2 left-4 select-none leading-none">
            &ldquo;
          </span>
          <div className="mt-8 flex-1">
            <p
              className={`font-display text-xl sm:text-2xl md:text-3xl text-cream leading-relaxed italic ${
                !done ? 'cursor-blink' : ''
              }`}
            >
              {typed}
            </p>
          </div>

          {done && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7 }}
              className="mt-8 pt-6 border-t border-gold/15"
            >
              <p className="text-cream-dim text-sm mb-4">
                — Naṣīr al-Dīn al-Ṭūsī, <em>Tadhkira fī ʿIlm al-Hayʾa</em>{' '}
                (Memoir on Astronomy), c. 1247 CE
              </p>
              <div className="grid sm:grid-cols-3 gap-3">
                <div className="rounded-lg bg-gold/5 border border-gold/20 p-3">
                  <p className="text-gold font-mono text-xs uppercase tracking-wider mb-1">
                    Device
                  </p>
                  <p className="text-cream text-sm font-mono">
                    Tusi Couple (al-zūjāj)
                  </p>
                </div>
                <div className="rounded-lg bg-gold/5 border border-gold/20 p-3">
                  <p className="text-gold font-mono text-xs uppercase tracking-wider mb-1">
                    Innovation
                  </p>
                  <p className="text-cream text-sm font-mono">
                    Linear from circular motion
                  </p>
                </div>
                <div className="rounded-lg bg-gold/5 border border-gold/20 p-3">
                  <p className="text-gold font-mono text-xs uppercase tracking-wider mb-1">
                    Used by Copernicus
                  </p>
                  <p className="text-cream text-sm font-mono">
                    De Revolutionibus · 1543
                  </p>
                </div>
              </div>
            </motion.div>
          )}
        </motion.div>

        {done && (
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="mt-12 text-center"
          >
            <p className="text-cream-dim text-sm sm:text-base">
              The Tusi Couple appears in Copernicus&apos;s <em>De Revolutionibus</em>{' '}
              (1543) —{' '}
              <span className="text-gradient-gold font-semibold">
                296 years
              </span>{' '}
              after al-Ṭūsī stated it. The diagrams are mathematically
              identical. The attribution is not.
            </p>
          </motion.div>
        )}
      </div>
    </section>
  );
}
