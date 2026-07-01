'use client';
import { useEffect, useRef, useState } from 'react';
import { motion, useInView } from 'framer-motion';
import { Feather, BookOpen, Sigma } from 'lucide-react';
import Image from 'next/image';
import { useTranslations } from 'next-intl';

const FULL_QUOTE = 'When I considered what people generally need in calculating, I found that it is always a number. I then observed that every number is composed of units, and that any number may be divided into its units. I have also observed that the numbers which are needed in calculation are of two kinds: whole numbers and fractions.';

export default function AlgProofSection() {
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
    }, 28);
    return () => clearInterval(interval);
  }, [inView]);
  return (
    <section id="proof" ref={ref} className="relative min-h-screen flex flex-col items-center justify-center px-6 py-24 manuscript-bg overflow-hidden">
      <motion.div animate={{ rotate: [0, 6, 0], y: [0, -8, 0] }} transition={{ duration: 6, repeat: Infinity, ease: 'easeInOut' }} className="absolute top-20 right-10 sm:right-20 opacity-20"><Feather className="w-16 h-16 text-gold" /></motion.div>
      <div className="max-w-6xl w-full relative z-10">
        <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, margin: "0px 0px 15% 0px" }} transition={{ duration: 0.8 }} className="text-center mb-12">
          <p className="text-[10px] font-mono tracking-[0.4em] uppercase text-gold/70 mb-4">{tSections('Proof.chapterTitle')}</p>
          <h2 className="font-display text-4xl sm:text-6xl md:text-7xl text-cream leading-tight"><span className="text-gradient-gold">c. 820 CE.</span><br />The Book of al-Jabr.</h2>
        </motion.div>
        <div className="grid lg:grid-cols-3 gap-6 mb-8">
          <motion.div initial={{ opacity: 0, x: -30 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true, margin: "0px 0px 15% 0px" }} transition={{ duration: 0.7 }} className="glass-card-gold rounded-2xl overflow-hidden relative group">
            <div className="relative aspect-[3/4] overflow-hidden">
              <Image src="/images/sdam-alg/khwarizmi-renaissance.png" alt="Authentic page from a Latin translation of al-Khwarizmi's mathematical text showing geometric diagrams" fill sizes="(max-width: 1024px) 100vw, 33vw" className="object-cover transition-transform duration-700 group-hover:scale-105" />
              <div className="absolute inset-0 bg-gradient-to-t from-cosmos-deep via-cosmos/30 to-transparent" />
              <div className="absolute bottom-0 left-0 right-0 p-4">
                <p className="font-arabic text-xl text-gold mb-1" dir="rtl">الجبر والمقابلة</p>
                <h3 className="font-display text-lg text-cream leading-tight">al-Jabr wa-al-Muqābala</h3>
                <p className="text-cream-dim text-xs mt-1">The Book of Completion and Balancing</p>
              </div>
              <div className="absolute top-3 left-3 w-5 h-5 border-t-2 border-l-2 border-gold/60" /><div className="absolute top-3 right-3 w-5 h-5 border-t-2 border-r-2 border-gold/60" /><div className="absolute bottom-3 left-3 w-5 h-5 border-b-2 border-l-2 border-gold/60" /><div className="absolute bottom-3 right-3 w-5 h-5 border-b-2 border-r-2 border-gold/60" />
            </div>
            <div className="p-3 border-t border-gold/15 bg-cosmos-deep/50"><p className="text-[9px] font-mono uppercase tracking-widest text-cream-dim/70 text-center italic">Authentic Latin translation of al-Khwārizmī</p></div>
          </motion.div>
          <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, margin: "0px 0px 15% 0px" }} transition={{ duration: 0.7, delay: 0.15 }} className="glass-card-gold rounded-2xl p-6 relative flex flex-col">
            <div className="flex items-center gap-3 mb-4"><Sigma className="w-6 h-6 text-gold" /><span className="font-mono text-xs uppercase tracking-widest text-gold/80">The Masterwork</span></div>
            <p className="font-arabic text-3xl text-gold mb-2" dir="rtl">الكتاب المختصر</p>
            <h3 className="font-display text-xl text-cream mb-1 italic">al-Kitāb al-Mukhtaṣar</h3>
            <p className="text-cream-dim text-sm mb-6">The Compendious Book on Calculation by Completion and Balancing</p>
            <div className="space-y-3 text-sm flex-1">
              <div><p className="text-cream-dim text-xs uppercase tracking-wider mb-1">Author</p><p className="text-cream">Muḥammad ibn Mūsā al-Khwārizmī</p></div>
              <div><p className="text-cream-dim text-xs uppercase tracking-wider mb-1">Composed</p><p className="text-cream">c. 820 CE · Baghdad, House of Wisdom</p></div>
              <div><p className="text-cream-dim text-xs uppercase tracking-wider mb-1">What it contains</p><p className="text-cream/85 text-xs leading-relaxed">Systematic solution of all linear and quadratic equations. The method of completing the square. The quadratic formula. The term <em>al-jabr</em> (algebra). The word <em>algorithm</em> (from his name).</p></div>
              <div><p className="text-cream-dim text-xs uppercase tracking-wider mb-1">Latin translation</p><p className="text-cream">12th century, Toledo — by Robert of Chester (1145) and Gerard of Cremona</p></div>
              <div><p className="text-cream-dim text-xs uppercase tracking-wider mb-1">Used until</p><p className="text-gradient-gold font-bold">16th century in Europe (700+ years)</p></div>
            </div>
            <div className="mt-4 pt-4 border-t border-gold/15"><div className="flex items-center gap-2 text-gold/80 text-xs"><BookOpen className="w-4 h-4" /><span className="font-mono uppercase tracking-wider">The book that gave algebra its name</span></div></div>
          </motion.div>
          <motion.div initial={{ opacity: 0, x: 30 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true, margin: "0px 0px 15% 0px" }} transition={{ duration: 0.7, delay: 0.3 }} className="glass-card rounded-2xl overflow-hidden relative group">
            <div className="relative aspect-[4/3] overflow-hidden">
              <Image src="/images/sdam-alg/fibonacci-facsimile-1.jpg" alt="Authentic page from Fibonacci's Liber Abaci (1202) showing Hindu-Arabic numerals and mathematical text" fill sizes="(max-width: 1024px) 100vw, 33vw" className="object-cover transition-transform duration-700 group-hover:scale-105" />
              <div className="absolute inset-0 bg-gradient-to-t from-cosmos-deep/90 via-cosmos/20 to-transparent" />
              <div className="absolute bottom-0 left-0 right-0 p-4">
                <p className="font-mono text-[10px] uppercase tracking-widest text-gold/80 mb-1">Plate I — The "copy" (1202)</p>
                <h3 className="font-display text-lg text-cream italic leading-tight">Fibonacci · Liber Abaci</h3>
                <p className="text-cream-dim text-xs mt-1">382 years after al-Khwārizmī — explicitly credits "the Arabs"</p>
              </div>
            </div>
            <div className="p-3 border-t border-gold/15"><p className="text-[10px] text-cream-dim/70 leading-relaxed italic">Fibonacci&apos;s Liber Abaci — the book that brought &ldquo;Arabic numerals&rdquo; to Europe. Fibonacci explicitly credits &ldquo;the Indians and the Arabs.&rdquo; The European tradition that followed credited Fibonacci.</p></div>
          </motion.div>
        </div>
        <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, margin: "0px 0px 15% 0px" }} transition={{ duration: 0.7, delay: 0.4 }} className="glass-card rounded-2xl p-8 sm:p-10 relative flex flex-col">
          <span className="text-gold/30 text-7xl font-display absolute top-2 left-4 select-none leading-none">&ldquo;</span>
          <div className="mt-8 flex-1"><p className={`font-display text-xl sm:text-2xl md:text-3xl text-cream leading-relaxed italic ${!done ? 'cursor-blink' : ''}`}>{typed}</p></div>
          {done && (
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7 }} className="mt-8 pt-6 border-t border-gold/15">
              <p className="text-cream-dim text-sm mb-4">— al-Khwārizmī, <em>al-Kitāb al-Mukhtaṣar fī Ḥisāb al-Jabr wa-al-Muqābala</em>, c. 820 CE</p>
              <div className="grid sm:grid-cols-3 gap-3">
                <div className="rounded-lg bg-gold/5 border border-gold/20 p-3"><p className="text-gold font-mono text-xs uppercase tracking-wider mb-1">Method</p><p className="text-cream text-sm font-mono">Systematic algebra (al-Jabr)</p></div>
                <div className="rounded-lg bg-gold/5 border border-gold/20 p-3"><p className="text-gold font-mono text-xs uppercase tracking-wider mb-1">Etymology</p><p className="text-cream text-sm font-mono">Algorithm = his name</p></div>
                <div className="rounded-lg bg-gold/5 border border-gold/20 p-3"><p className="text-gold font-mono text-xs uppercase tracking-wider mb-1">Priority</p><p className="text-cream text-sm font-mono">382 yrs pre-Fibonacci</p></div>
              </div>
            </motion.div>
          )}
        </motion.div>
        {done && (
          <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, delay: 0.3 }} className="mt-12 text-center">
            <p className="text-cream-dim text-sm sm:text-base">The word <span className="text-gradient-gold font-semibold">algorithm</span> is a Latinized form of <span className="text-gradient-gold font-semibold">al-Khwārizmī</span>. The word <span className="text-gradient-gold font-semibold">algebra</span> is the title of his book. Every algorithm ever written carries his name — <span className="text-gradient-gold font-semibold">382 years before Fibonacci</span> brought the methods to Europe.</p>
          </motion.div>
        )}
      </div>
    </section>
  );
}
