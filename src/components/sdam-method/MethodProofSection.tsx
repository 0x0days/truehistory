'use client';

import { useEffect, useRef, useState } from 'react';
import { motion, useInView } from 'framer-motion';
import { ScrollText, Feather, BookMarked } from 'lucide-react';
import Image from 'next/image';
import { useTranslations } from 'next-intl';

const FULL_QUOTE =
  'Truth is sought for itself — but the truths are submerged in uncertainties. The authority of those who profess to teach is a hindrance to those who desire to learn.';

export default function MethodProofSection() {
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
            <span className="text-gradient-gold">1025–1030 CE.</span>
            <br />
            The method, in his own words.
          </h2>
        </motion.div>

        <div className="grid lg:grid-cols-3 gap-6 mb-8">
          {/* REAL manuscript image — Kitab al-Manazir */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "0px 0px 15% 0px" }}
            transition={{ duration: 0.7 }}
            className="glass-card-gold rounded-2xl overflow-hidden relative group"
          >
            <div className="relative aspect-[3/4] overflow-hidden">
              <Image
                src="/images/sdam-method/eye-anatomy-method.jpg"
                alt="Authentic Latin manuscript page from De Aspectibus showing eye anatomy and vision diagrams"
                fill
                sizes="(max-width: 1024px) 100vw, 33vw"
                className="object-cover transition-transform duration-700 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-cosmos-deep via-cosmos/30 to-transparent" />
              <div className="absolute bottom-0 left-0 right-0 p-4">
                <p className="font-arabic text-xl text-gold mb-1" dir="rtl">
                  المناظر
                </p>
                <h3 className="font-display text-lg text-cream leading-tight">
                  Kitāb al-Manāẓir
                </h3>
                <p className="text-cream-dim text-xs mt-1">
                  The Book of Optics · 7 volumes
                </p>
              </div>
              <div className="absolute top-3 left-3 w-5 h-5 border-t-2 border-l-2 border-gold/60" />
              <div className="absolute top-3 right-3 w-5 h-5 border-t-2 border-r-2 border-gold/60" />
              <div className="absolute bottom-3 left-3 w-5 h-5 border-b-2 border-l-2 border-gold/60" />
              <div className="absolute bottom-3 right-3 w-5 h-5 border-b-2 border-r-2 border-gold/60" />
            </div>
            <div className="p-3 border-t border-gold/15 bg-cosmos-deep/50">
              <p className="text-[9px] font-mono uppercase tracking-widest text-cream-dim/70 text-center italic">
                Latin De Aspectibus · 13th century
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
              <ScrollText className="w-6 h-6 text-gold" />
              <span className="font-mono text-xs uppercase tracking-widest text-gold/80">
                The Method Treatises
              </span>
            </div>
            <p className="font-arabic text-3xl text-gold mb-2" dir="rtl">
              الشكوك
            </p>
            <h3 className="font-display text-xl text-cream mb-1 italic">
              Al-Shukūk ʿalā Baṭlamyūs
            </h3>
            <p className="text-cream-dim text-sm mb-6">
              Doubts Concerning Ptolemy
            </p>

            <div className="space-y-3 text-sm flex-1">
              <div>
                <p className="text-cream-dim text-xs uppercase tracking-wider mb-1">
                  Author
                </p>
                <p className="text-cream">Ibn al-Haytham</p>
              </div>
              <div>
                <p className="text-cream-dim text-xs uppercase tracking-wider mb-1">
                  Composed
                </p>
                <p className="text-cream">
                  c. 1025–1030 CE · Cairo
                </p>
              </div>
              <div>
                <p className="text-cream-dim text-xs uppercase tracking-wider mb-1">
                  Surviving MSS
                </p>
                <p className="text-cream">
                  Süleymaniye (Istanbul)<br />
                  Bodleian (Oxford) · Leiden
                </p>
              </div>
              <div>
                <p className="text-cream-dim text-xs uppercase tracking-wider mb-1">
                  Latin translation
                </p>
                <p className="text-cream">
                  <em>Dubitatio in Ptolemaeum</em>, 12th–13th c.
                </p>
              </div>
              <div>
                <p className="text-cream-dim text-xs uppercase tracking-wider mb-1">
                  Critical edition
                </p>
                <p className="text-cream">
                  A. I. Sabra & N. Shehaby (1971)
                </p>
              </div>
            </div>

            <div className="mt-4 pt-4 border-t border-gold/15">
              <div className="flex items-center gap-2 text-gold/80 text-xs">
                <BookMarked className="w-4 h-4" />
                <span className="font-mono uppercase tracking-wider">
                  Systematic critique of authority
                </span>
              </div>
            </div>
          </motion.div>

          {/* REAL manuscript image — Doubts page */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "0px 0px 15% 0px" }}
            transition={{ duration: 0.7, delay: 0.3 }}
            className="glass-card rounded-2xl overflow-hidden relative group"
          >
            <div className="relative aspect-[4/3] overflow-hidden">
              <Image
                src="/images/sdam-method/doubts-renaissance-2.jpg"
                alt="Authentic page from a 16th-century printed edition of a medieval scientific text showing diagrams and calligraphic text"
                fill
                sizes="(max-width: 1024px) 100vw, 33vw"
                className="object-cover transition-transform duration-700 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-cosmos-deep/90 via-cosmos/20 to-transparent" />
              <div className="absolute bottom-0 left-0 right-0 p-4">
                <p className="font-mono text-[10px] uppercase tracking-widest text-gold/80 mb-1">
                  Plate I — The transmitted text
                </p>
                <h3 className="font-display text-lg text-cream italic leading-tight">
                  The method, in Latin circulation
                </h3>
                <p className="text-cream-dim text-xs mt-1">
                  Read by scholastics across Europe
                </p>
              </div>
            </div>
            <div className="p-3 border-t border-gold/15">
              <p className="text-[10px] text-cream-dim/70 leading-relaxed italic">
                The Latin tradition that carried Ibn al-Haytham&apos;s
                method to Roger Bacon, then to Francis Bacon.
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
                — Ibn al-Haytham, <em>Doubts Concerning Ptolemy</em>, c. 1025–1030 CE
              </p>
              <div className="grid sm:grid-cols-3 gap-3">
                <div className="rounded-lg bg-gold/5 border border-gold/20 p-3">
                  <p className="text-gold font-mono text-xs uppercase tracking-wider mb-1">
                    Foundational principle
                  </p>
                  <p className="text-cream text-sm font-mono">
                    Truth is sought for itself
                  </p>
                </div>
                <div className="rounded-lg bg-gold/5 border border-gold/20 p-3">
                  <p className="text-gold font-mono text-xs uppercase tracking-wider mb-1">
                    Skepticism
                  </p>
                  <p className="text-cream text-sm font-mono">
                    Question all authority
                  </p>
                </div>
                <div className="rounded-lg bg-gold/5 border border-gold/20 p-3">
                  <p className="text-gold font-mono text-xs uppercase tracking-wider mb-1">
                    Method
                  </p>
                  <p className="text-cream text-sm font-mono">
                    Observe → test → verify
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
              This sentence was written{' '}
              <span className="text-gradient-gold font-semibold">
                590 years
              </span>{' '}
              before Francis Bacon published <em>Novum Organum</em> — the book
              credited with inventing the scientific method.
            </p>
          </motion.div>
        )}
      </div>
    </section>
  );
}
