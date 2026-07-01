'use client';

import { useEffect, useRef, useState } from 'react';
import { motion, useInView } from 'framer-motion';
import { ScrollText, Feather, Sigma } from 'lucide-react';
import Image from 'next/image';
import { useTranslations } from 'next-intl';

const FULL_QUOTE =
  'I shall compute the volume of the paraboloid by dividing it into slices, summing the slices, and taking the limit as the slices become infinitely thin.';

export default function CalculusProofSection() {
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
            <span className="text-gradient-gold">Three traditions.</span>
            <br />
            Three independent limits.
          </h2>
        </motion.div>

        <div className="grid lg:grid-cols-3 gap-6 mb-8">
          {/* Ibn al-Haytham — Arabic tradition */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "0px 0px 15% 0px" }}
            transition={{ duration: 0.7 }}
            className="glass-card-gold rounded-2xl overflow-hidden relative group"
          >
            <div className="relative aspect-[3/4] overflow-hidden">
              <Image
                src="/images/sdam-calculus/haytham-math-academia.jpg"
                alt="Authentic medieval Arabic mathematics manuscript page with geometric diagrams"
                fill
                sizes="(max-width: 1024px) 100vw, 33vw"
                className="object-cover transition-transform duration-700 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-cosmos-deep via-cosmos/30 to-transparent" />
              <div className="absolute bottom-0 left-0 right-0 p-4">
                <p className="font-arabic text-xl text-gold mb-1" dir="rtl">
                  ابن الهيثم
                </p>
                <h3 className="font-display text-lg text-cream leading-tight">
                  Ibn al-Haytham
                </h3>
                <p className="text-cream-dim text-xs mt-1">
                  c. 1000 CE · Cairo
                </p>
              </div>
              <div className="absolute top-3 left-3 w-5 h-5 border-t-2 border-l-2 border-gold/60" />
              <div className="absolute top-3 right-3 w-5 h-5 border-t-2 border-r-2 border-gold/60" />
              <div className="absolute bottom-3 left-3 w-5 h-5 border-b-2 border-l-2 border-gold/60" />
              <div className="absolute bottom-3 right-3 w-5 h-5 border-b-2 border-r-2 border-gold/60" />
            </div>
            <div className="p-4 border-t border-gold/15">
              <p className="text-[9px] font-mono uppercase tracking-widest text-gold/80 mb-2">
                Arabic tradition · Integration
              </p>
              <p className="text-cream/85 text-xs leading-relaxed">
                Computed the volume of a paraboloid by deriving the closed form
                for the sum of the first <em>n</em> fourth powers — a definite
                integral by limit of a sum.
              </p>
            </div>
          </motion.div>

          {/* Sharaf al-Din al-Tusi — Arabic tradition, derivative */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "0px 0px 15% 0px" }}
            transition={{ duration: 0.7, delay: 0.15 }}
            className="glass-card-gold rounded-2xl p-6 relative flex flex-col"
          >
            <div className="flex items-center gap-3 mb-4">
              <Sigma className="w-6 h-6 text-gold" />
              <span className="font-mono text-xs uppercase tracking-widest text-gold/80">
                Arabic tradition · Derivative
              </span>
            </div>
            <p className="font-arabic text-3xl text-gold mb-2" dir="rtl">
              شرف الدين الطوسي
            </p>
            <h3 className="font-display text-xl text-cream mb-1 italic">
              Sharaf al-Dīn al-Ṭūsī
            </h3>
            <p className="text-cream-dim text-sm mb-6">
              c. 1135 – c. 1213 CE · Tus, Persia
            </p>

            <div className="space-y-3 text-sm flex-1">
              <div>
                <p className="text-cream-dim text-xs uppercase tracking-wider mb-1">
                  Masterwork
                </p>
                <p className="text-cream">
                  <em>al-Muʿādalāt</em> (On Equations)
                </p>
              </div>
              <div>
                <p className="text-cream-dim text-xs uppercase tracking-wider mb-1">
                  Contribution
                </p>
                <p className="text-cream/85 text-xs leading-relaxed">
                  Treated cubic equations by analyzing the maximum of a
                  polynomial — what we now call its derivative. Roshdi Rashed
                  (1986) showed al-Ṭūsī&apos;s method is recognizably
                  differential calculus, 500 years before Newton.
                </p>
              </div>
              <div>
                <p className="text-cream-dim text-xs uppercase tracking-wider mb-1">
                  Rediscovery
                </p>
                <p className="text-cream">
                  Rashed, 1986 — manuscript analyzed
                </p>
              </div>
            </div>

            <div className="mt-4 pt-4 border-t border-gold/15">
              <div className="flex items-center gap-2 text-gold/80 text-xs">
                <ScrollText className="w-4 h-4" />
                <span className="font-mono uppercase tracking-wider">
                  Surviving MSS · Istanbul
                </span>
              </div>
            </div>
          </motion.div>

          {/* Madhava — Indian tradition */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "0px 0px 15% 0px" }}
            transition={{ duration: 0.7, delay: 0.3 }}
            className="glass-card rounded-2xl overflow-hidden relative group"
          >
            <div className="relative aspect-[4/3] overflow-hidden">
              <Image
                src="/images/sdam-calculus/sharaf-muslim-heritage-2.jpg"
                alt="Authentic page from a medieval Arabic algebra manuscript showing geometric diagrams and Arabic text"
                fill
                sizes="(max-width: 1024px) 100vw, 33vw"
                className="object-cover transition-transform duration-700 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-cosmos-deep/90 via-cosmos/20 to-transparent" />
              <div className="absolute bottom-0 left-0 right-0 p-4">
                <p className="font-mono text-[10px] uppercase tracking-widest text-gold/80 mb-1">
                  Indian tradition · Infinite series
                </p>
                <h3 className="font-display text-lg text-cream italic leading-tight">
                  Mādhava of Saṅgamagrāma
                </h3>
                <p className="text-cream-dim text-xs mt-1">
                  c. 1340 – c. 1425 CE · Kerala, India
                </p>
              </div>
            </div>
            <div className="p-4 border-t border-gold/15">
              <p className="text-cream/85 text-xs leading-relaxed">
                Derived the infinite series for sine, cosine, and arctangent
                (the Madhava–Leibniz series for π) — 280 years before Newton&apos;s
                binomial series. The Kerala school&apos;s work was not transmitted
                to Europe.
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
                — Ibn al-Haytham, <em>On the Measurement of the Paraboloid</em>, c. 1000 CE
              </p>
              <div className="grid sm:grid-cols-3 gap-3">
                <div className="rounded-lg bg-gold/5 border border-gold/20 p-3">
                  <p className="text-gold font-mono text-xs uppercase tracking-wider mb-1">
                    Method
                  </p>
                  <p className="text-cream text-sm font-mono">
                    Limit of a sum (Riemann)
                  </p>
                </div>
                <div className="rounded-lg bg-gold/5 border border-gold/20 p-3">
                  <p className="text-gold font-mono text-xs uppercase tracking-wider mb-1">
                    Result
                  </p>
                  <p className="text-cream text-sm font-mono">
                    ∑ k⁴ = n(n+1)(2n+1)(3n²+3n−1) / 30
                  </p>
                </div>
                <div className="rounded-lg bg-gold/5 border border-gold/20 p-3">
                  <p className="text-gold font-mono text-xs uppercase tracking-wider mb-1">
                    Year
                  </p>
                  <p className="text-cream text-sm font-mono">
                    c. 1000 CE — 666 yrs pre-Newton
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
              Three independent traditions reached the limit. The Arabic was
              transmitted. The Indian was not. The Greek was lost for a
              millennium. Newton and Leibniz unified them —{' '}
              <span className="text-gradient-gold font-semibold">
                666 years
              </span>{' '}
              after Ibn al-Haytham.
            </p>
          </motion.div>
        )}
      </div>
    </section>
  );
}
