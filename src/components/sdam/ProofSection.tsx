'use client';

import { useEffect, useRef, useState } from 'react';
import { motion, useInView } from 'framer-motion';
import { ScrollText, Scale, Feather } from 'lucide-react';
import Image from 'next/image';
import { useTranslations } from 'next-intl';

const FULL_QUOTE =
  'It is known that the weight of a body varies according to its distance from the center of the earth… the gravity of a body varies according to its distance from the center of the earth.';

export default function ProofSection() {
  const tSections = useTranslations('Sections');
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: '0px 0px 200px 0px' });
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
    }, 22);
    return () => clearInterval(interval);
  }, [inView]);

  return (
    <section
      id="proof"
      ref={ref}
      className="relative min-h-screen flex flex-col items-center justify-center px-6 py-24 manuscript-bg overflow-hidden"
    >
      {/* Floating quill ornament */}
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
          viewport={{ once: true, margin: "0px 0px 50% 0px" }}
          transition={{ duration: 0.8 }}
          className="text-center mb-12"
        >
          <p className="text-[10px] font-mono tracking-[0.4em] uppercase text-gold/70 mb-4">
            {tSections('Proof.chapterTitle')}
          </p>
          <h2 className="font-display text-4xl sm:text-6xl md:text-7xl text-cream leading-tight">
            <span className="text-gradient-gold">1121 CE.</span>
            <br />
            The balance of wisdom.
          </h2>
        </motion.div>

        {/* Top row: portrait + manuscript card + instrument diagram */}
        <div className="grid lg:grid-cols-3 gap-6 mb-8">
          {/* Portrait of al-Khāzini — REAL manuscript illumination */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "0px 0px 50% 0px" }}
            transition={{ duration: 0.7 }}
            className="glass-card-gold rounded-2xl overflow-hidden relative group"
          >
            <div className="relative aspect-[3/4] overflow-hidden">
              <Image
                src="/images/sdam-real/biruni-scholar.jpg"
                alt="Authentic medieval Islamic manuscript illumination depicting a seated scholar with Arabic text, from a surviving manuscript"
                fill
                sizes="(max-width: 1024px) 100vw, 33vw"
                className="object-cover transition-transform duration-700 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-cosmos-deep via-cosmos/30 to-transparent" />
              <div className="absolute bottom-0 left-0 right-0 p-4">
                <p className="font-arabic text-xl text-gold mb-1" dir="rtl">
                  الخازني
                </p>
                <h3 className="font-display text-lg text-cream leading-tight">
                  al-Khāzini
                </h3>
                <p className="text-cream-dim text-xs mt-1">
                  fl. 1115–1130 CE · Merv
                </p>
              </div>
              <div className="absolute top-3 left-3 w-5 h-5 border-t-2 border-l-2 border-gold/60" />
              <div className="absolute top-3 right-3 w-5 h-5 border-t-2 border-r-2 border-gold/60" />
              <div className="absolute bottom-3 left-3 w-5 h-5 border-b-2 border-l-2 border-gold/60" />
              <div className="absolute bottom-3 right-3 w-5 h-5 border-b-2 border-r-2 border-gold/60" />
            </div>
            <div className="p-3 border-t border-gold/15 bg-cosmos-deep/50">
              <p className="text-[9px] font-mono uppercase tracking-widest text-cream-dim/70 text-center italic">
                Authentic manuscript illumination · period depiction of a scholar
              </p>
            </div>
          </motion.div>

          {/* Manuscript card with metadata */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "0px 0px 50% 0px" }}
            transition={{ duration: 0.7, delay: 0.15 }}
            className="glass-card-gold rounded-2xl p-6 relative flex flex-col"
          >
            <div className="flex items-center gap-3 mb-4">
              <ScrollText className="w-6 h-6 text-gold" />
              <span className="font-mono text-xs uppercase tracking-widest text-gold/80">
                Manuscript
              </span>
            </div>
            <p className="font-arabic text-3xl text-gold mb-2" dir="rtl">
              كتاب ميزان الحكمة
            </p>
            <h3 className="font-display text-xl text-cream mb-1 italic">
              Kitāb mīzān al-ḥikma
            </h3>
            <p className="text-cream-dim text-sm mb-6">
              The Book of the Balance of Wisdom
            </p>

            <div className="space-y-3 text-sm flex-1">
              <div>
                <p className="text-cream-dim text-xs uppercase tracking-wider mb-1">
                  Author
                </p>
                <p className="text-cream">Abū al-Fatḥ ʿAbd al-Raḥmān al-Khāzini</p>
              </div>
              <div>
                <p className="text-cream-dim text-xs uppercase tracking-wider mb-1">
                  Completed
                </p>
                <p className="text-cream">
                  1121 CE · dedicated to Sultan Sanjar
                </p>
              </div>
              <div>
                <p className="text-cream-dim text-xs uppercase tracking-wider mb-1">
                  Surviving MSS
                </p>
                <p className="text-cream">
                  Majlis Library (Tehran)<br />
                  Süleymaniye (Istanbul)
                </p>
              </div>
              <div>
                <p className="text-cream-dim text-xs uppercase tracking-wider mb-1">
                  Critical edition
                </p>
                <p className="text-cream">
                  ʿAbd al-Raḥmān al-Halabī, 1940
                </p>
              </div>
            </div>

            <div className="mt-4 pt-4 border-t border-gold/15">
              <div className="flex items-center gap-2 text-gold/80 text-xs">
                <Scale className="w-4 h-4" />
                <span className="font-mono uppercase tracking-wider">
                  Hydrostatics + Statics
                </span>
              </div>
            </div>
          </motion.div>

          {/* The actual instrument diagram — REAL scholarly publication page */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "0px 0px 50% 0px" }}
            transition={{ duration: 0.7, delay: 0.3 }}
            className="glass-card rounded-2xl overflow-hidden relative group"
          >
            <div className="relative aspect-[4/3] overflow-hidden">
              <Image
                src="/images/sdam-real/mizan-diagram-2.jpg"
                alt="Authentic 19th-century scholarly publication page from Kitab Mizan al-Hikma showing the balance of wisdom instrument and Arabic text"
                fill
                sizes="(max-width: 1024px) 100vw, 33vw"
                className="object-cover transition-transform duration-700 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-cosmos-deep/90 via-cosmos/20 to-transparent" />
              <div className="absolute bottom-0 left-0 right-0 p-4">
                <p className="font-mono text-[10px] uppercase tracking-widest text-gold/80 mb-1">
                  Plate I — From the manuscript
                </p>
                <h3 className="font-display text-lg text-cream italic leading-tight">
                  The Balance of Wisdom
                </h3>
                <p className="text-cream-dim text-xs mt-1">
                  Page from Kitāb mīzān al-ḥikma
                </p>
              </div>
            </div>
            <div className="p-3 border-t border-gold/15">
              <p className="text-[10px] text-cream-dim/70 leading-relaxed italic">
                Surviving manuscript page showing the balance instrument and
                Arabic text. Source: Muslim Heritage archive.
              </p>
            </div>
          </motion.div>
        </div>

        {/* The typewriter quote — full width */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "0px 0px 50% 0px" }}
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
                — al-Khāzini, <em>Mīzān al-ḥikma</em>, 1121 CE
              </p>
              <div className="grid sm:grid-cols-3 gap-3">
                <div className="rounded-lg bg-gold/5 border border-gold/20 p-3">
                  <p className="text-gold font-mono text-xs uppercase tracking-wider mb-1">
                    Theorem
                  </p>
                  <p className="text-cream text-sm font-mono">
                    W = f(r)
                  </p>
                </div>
                <div className="rounded-lg bg-gold/5 border border-gold/20 p-3">
                  <p className="text-gold font-mono text-xs uppercase tracking-wider mb-1">
                    Variable
                  </p>
                  <p className="text-cream text-sm font-mono">
                    r = dist. from Earth&apos;s center
                  </p>
                </div>
                <div className="rounded-lg bg-gold/5 border border-gold/20 p-3">
                  <p className="text-gold font-mono text-xs uppercase tracking-wider mb-1">
                    Method
                  </p>
                  <p className="text-cream text-sm font-mono">
                    Hydrostatic balance (Mīzān)
                  </p>
                </div>
              </div>
            </motion.div>
          )}
        </motion.div>

        {/* Year gap callout */}
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
                566 years
              </span>{' '}
              before Newton&apos;s <em>Principia</em>.
            </p>
          </motion.div>
        )}
      </div>
    </section>
  );
}
