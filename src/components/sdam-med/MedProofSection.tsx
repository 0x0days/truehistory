'use client';
import { useEffect, useRef, useState } from 'react';
import { motion, useInView } from 'framer-motion';
import { Feather, Stethoscope, BookOpen } from 'lucide-react';
import Image from 'next/image';
import { useTranslations } from 'next-intl';

const FULL_QUOTE = 'The physician must test the drug on the healthy first, then on the sick. He must test it on one disease, not many. He must observe the result in controlled conditions, and repeat the experiment. Only then may he prescribe it.';

export default function MedProofSection() {
  const tSections = useTranslations('Sections');
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: '0px 0px 15% 0px' });
  const [typed, setTyped] = useState('');
  const [done, setDone] = useState(false);
  useEffect(() => {
    if (!inView) return;
    let i = 0;
    const interval = setInterval(() => {
      i += 1; setTyped(FULL_QUOTE.slice(0, i));
      if (i >= FULL_QUOTE.length) { clearInterval(interval); setTimeout(() => setDone(true), 400); }
    }, 32);
    return () => clearInterval(interval);
  }, [inView]);
  return (
    <section id="proof" ref={ref} className="relative min-h-screen flex flex-col items-center justify-center px-6 py-24 manuscript-bg overflow-hidden">
      <motion.div animate={{ rotate: [0, 6, 0], y: [0, -8, 0] }} transition={{ duration: 6, repeat: Infinity, ease: 'easeInOut' }} className="absolute top-20 right-10 sm:right-20 opacity-20"><Feather className="w-16 h-16 text-gold" /></motion.div>
      <div className="max-w-6xl w-full relative z-10">
        <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, margin: "0px 0px 50% 0px" }} transition={{ duration: 0.8 }} className="text-center mb-12">
          <p className="text-[10px] font-mono tracking-[0.4em] uppercase text-gold/70 mb-4">{tSections('Proof.chapterTitle')}</p>
          <h2 className="font-display text-4xl sm:text-6xl md:text-7xl text-cream leading-tight"><span className="text-gradient-gold">1025 CE.</span><br />The Canon of Medicine.</h2>
        </motion.div>
        <div className="grid lg:grid-cols-3 gap-6 mb-8">
          <motion.div initial={{ opacity: 0, x: -30 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true, margin: "0px 0px 50% 0px" }} transition={{ duration: 0.7 }} className="glass-card-gold rounded-2xl overflow-hidden relative group">
            <div className="relative aspect-[3/4] overflow-hidden">
              <Image src="/images/sdam-med/ibnsina-alamy-1.jpg" alt="Authentic page from Ibn Sina's Canon of Medicine manuscript showing Arabic calligraphic medical text" fill sizes="(max-width: 1024px) 100vw, 33vw" className="object-cover transition-transform duration-700 group-hover:scale-105" />
              <div className="absolute inset-0 bg-gradient-to-t from-cosmos-deep via-cosmos/30 to-transparent" />
              <div className="absolute bottom-0 left-0 right-0 p-4">
                <p className="font-arabic text-xl text-gold mb-1" dir="rtl">ابن سينا</p>
                <h3 className="font-display text-lg text-cream leading-tight">Ibn Sīnā (Avicenna)</h3>
                <p className="text-cream-dim text-xs mt-1">980 – 1037 CE · Bukhara / Persia</p>
              </div>
              <div className="absolute top-3 left-3 w-5 h-5 border-t-2 border-l-2 border-gold/60" /><div className="absolute top-3 right-3 w-5 h-5 border-t-2 border-r-2 border-gold/60" /><div className="absolute bottom-3 left-3 w-5 h-5 border-b-2 border-l-2 border-gold/60" /><div className="absolute bottom-3 right-3 w-5 h-5 border-b-2 border-r-2 border-gold/60" />
            </div>
            <div className="p-3 border-t border-gold/15 bg-cosmos-deep/50"><p className="text-[9px] font-mono uppercase tracking-widest text-cream-dim/70 text-center italic">Authentic Arabic Canon of Medicine manuscript</p></div>
          </motion.div>
          <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, margin: "0px 0px 50% 0px" }} transition={{ duration: 0.7, delay: 0.15 }} className="glass-card-gold rounded-2xl p-6 relative flex flex-col">
            <div className="flex items-center gap-3 mb-4"><Stethoscope className="w-6 h-6 text-gold" /><span className="font-mono text-xs uppercase tracking-widest text-gold/80">The Canon of Medicine</span></div>
            <p className="font-arabic text-3xl text-gold mb-2" dir="rtl">القانون في الطب</p>
            <h3 className="font-display text-xl text-cream mb-1 italic">al-Qānūn fī al-Ṭibb</h3>
            <p className="text-cream-dim text-sm mb-6">The Canon of Medicine · 5 volumes</p>
            <div className="space-y-3 text-sm flex-1">
              <div><p className="text-cream-dim text-xs uppercase tracking-wider mb-1">Author</p><p className="text-cream">Abū ʿAlī al-Ḥusayn ibn ʿAbd Allāh ibn Sīnā</p></div>
              <div><p className="text-cream-dim text-xs uppercase tracking-wider mb-1">Composed</p><p className="text-cream">c. 1025 CE · Persia</p></div>
              <div><p className="text-cream-dim text-xs uppercase tracking-wider mb-1">Size</p><p className="text-cream">~1 million words · 5 volumes · 14,000 pages</p></div>
              <div><p className="text-cream-dim text-xs uppercase tracking-wider mb-1">Used in Europe</p><p className="text-cream">Montpellier (1181), Padua, Paris, Louvain — until the 17th century</p></div>
              <div><p className="text-cream-dim text-xs uppercase tracking-wider mb-1">Duration as standard text</p><p className="text-gradient-gold font-bold">600+ years</p></div>
            </div>
            <div className="mt-4 pt-4 border-t border-gold/15"><div className="flex items-center gap-2 text-gold/80 text-xs"><BookOpen className="w-4 h-4" /><span className="font-mono uppercase tracking-wider">Most influential medical textbook ever written</span></div></div>
          </motion.div>
          <motion.div initial={{ opacity: 0, x: 30 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true, margin: "0px 0px 50% 0px" }} transition={{ duration: 0.7, delay: 0.3 }} className="glass-card rounded-2xl overflow-hidden relative group">
            <div className="relative aspect-[4/3] overflow-hidden">
              <Image src="/images/sdam-med/canon-latin-britannica.jpg" alt="Authentic page from the Latin translation of Avicenna's Canon of Medicine with medical woodcut illustrations" fill sizes="(max-width: 1024px) 100vw, 33vw" className="object-cover transition-transform duration-700 group-hover:scale-105" />
              <div className="absolute inset-0 bg-gradient-to-t from-cosmos-deep/90 via-cosmos/20 to-transparent" />
              <div className="absolute bottom-0 left-0 right-0 p-4">
                <p className="font-mono text-[10px] uppercase tracking-widest text-gold/80 mb-1">Plate I — The Latin Canon</p>
                <h3 className="font-display text-lg text-cream italic leading-tight">Canon of Medicine (Latin)</h3>
                <p className="text-cream-dim text-xs mt-1">Europe&apos;s medical textbook · 12th–17th century</p>
              </div>
            </div>
            <div className="p-3 border-t border-gold/15"><p className="text-[10px] text-cream-dim/70 leading-relaxed italic">The Latin translation of Ibn Sīnā&apos;s Canon — used at European medical schools for 600 years. Attributed to &ldquo;Avicenna.&rdquo; The Arabic author was renamed.</p></div>
          </motion.div>
        </div>
        <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, margin: "0px 0px 50% 0px" }} transition={{ duration: 0.7, delay: 0.4 }} className="glass-card rounded-2xl p-8 sm:p-10 relative flex flex-col">
          <span className="text-gold/30 text-7xl font-display absolute top-2 left-4 select-none leading-none">&ldquo;</span>
          <div className="mt-8 flex-1"><p className={`font-display text-xl sm:text-2xl md:text-3xl text-cream leading-relaxed italic ${!done ? 'cursor-blink' : ''}`}>{typed}</p></div>
          {done && (
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7 }} className="mt-8 pt-6 border-t border-gold/15">
              <p className="text-cream-dim text-sm mb-4">— Ibn Sīnā, <em>al-Qānūn fī al-Ṭibb</em> (Canon of Medicine), Book II, c. 1025 CE</p>
              <div className="grid sm:grid-cols-3 gap-3">
                <div className="rounded-lg bg-gold/5 border border-gold/20 p-3"><p className="text-gold font-mono text-xs uppercase tracking-wider mb-1">Method</p><p className="text-cream text-sm font-mono">Controlled clinical trial</p></div>
                <div className="rounded-lg bg-gold/5 border border-gold/20 p-3"><p className="text-gold font-mono text-xs uppercase tracking-wider mb-1">Standard</p><p className="text-cream text-sm font-mono">600+ years in Europe</p></div>
                <div className="rounded-lg bg-gold/5 border border-gold/20 p-3"><p className="text-gold font-mono text-xs uppercase tracking-wider mb-1">Priority</p><p className="text-cream text-sm font-mono">500 yrs pre-Vesalius</p></div>
              </div>
            </motion.div>
          )}
        </motion.div>
        {done && (
          <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, delay: 0.3 }} className="mt-12 text-center">
            <p className="text-cream-dim text-sm sm:text-base">The Canon was <span className="text-gradient-gold font-semibold">Europe&apos;s medical textbook for 600 years</span> — from the 12th century to the 17th. Every European physician who studied at Montpellier, Padua, Paris, or Louvain learned from Ibn Sīnā. The book was attributed to &ldquo;Avicenna.&rdquo; The Arabic author was renamed.</p>
          </motion.div>
        )}
      </div>
    </section>
  );
}
