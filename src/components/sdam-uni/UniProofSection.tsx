'use client';
import { useEffect, useRef, useState } from 'react';
import { motion, useInView } from 'framer-motion';
import { Feather } from 'lucide-react';
import Image from 'next/image';
import { useTranslations } from 'next-intl';

const FULL_QUOTE = 'She was the most knowledgeable person of her time in mathematics, and her calligraphy was the most beautiful. She wrote manuscripts, lectured on literature and mathematics, and was respected by the scholars of Cordoba.';

export default function UniProofSection() {
  const tSections = useTranslations('Sections');
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: '0px 0px 15% 0px' });
  const [typed, setTyped] = useState('');
  const [done, setDone] = useState(false);

  useEffect(() => {
    if (!inView) return;
    let i = 0;
    const interval = setInterval(() => {
      i += 1;
      setTyped(FULL_QUOTE.slice(0, i));
      if (i >= FULL_QUOTE.length) { clearInterval(interval); setTimeout(() => setDone(true), 400); }
    }, 32);
    return () => clearInterval(interval);
  }, [inView]);

  return (
    <section id="proof" ref={ref} className="relative min-h-screen flex flex-col items-center justify-center px-6 py-24 manuscript-bg overflow-hidden">
      <motion.div animate={{ rotate: [0, 6, 0], y: [0, -8, 0] }} transition={{ duration: 6, repeat: Infinity, ease: 'easeInOut' }} className="absolute top-20 right-10 sm:right-20 opacity-20">
        <Feather className="w-16 h-16 text-gold" />
      </motion.div>
      <div className="max-w-4xl w-full relative z-10">
        <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, margin: "0px 0px 15% 0px" }} transition={{ duration: 0.8 }} className="text-center mb-12">
          <p className="text-[10px] font-mono tracking-[0.4em] uppercase text-gold/70 mb-4">{tSections('Proof.chapterTitle')}</p>
          <h2 className="font-display text-4xl sm:text-6xl md:text-7xl text-cream leading-tight"><span className="text-gradient-gold">10th century CE.</span><br />The librarian of Cordoba.</h2>
        </motion.div>
        <div className="grid lg:grid-cols-3 gap-6 mb-8">
          <motion.div initial={{ opacity: 0, x: -30 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true, margin: "0px 0px 15% 0px" }} transition={{ duration: 0.7 }} className="glass-card-gold rounded-2xl overflow-hidden relative group lg:col-span-2">
            <div className="relative aspect-[3/2] overflow-hidden">
              <Image src="/images/sdam-uni/madrasa-ucla-1.jpg" alt="Authentic medieval Arabic manuscript page showing scholarly text and calligraphy" fill sizes="(max-width: 1024px) 100vw, 66vw" className="object-cover transition-transform duration-700 group-hover:scale-105" />
              <div className="absolute inset-0 bg-gradient-to-t from-cosmos-deep/80 to-transparent" />
            </div>
          </motion.div>
          <motion.div initial={{ opacity: 0, x: 30 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true, margin: "0px 0px 15% 0px" }} transition={{ duration: 0.7, delay: 0.2 }} className="glass-card-gold rounded-2xl p-6 flex flex-col justify-center">
            <p className="font-arabic text-3xl text-gold mb-2" dir="rtl">لبنة القرطبية</p>
            <h3 className="font-display text-xl text-cream mb-1 italic">Lubna of Cordoba</h3>
            <p className="text-cream-dim text-sm mb-4">10th century CE · al-Andalus</p>
            <div className="space-y-3 text-sm">
              <div><p className="text-cream-dim text-xs uppercase tracking-wider mb-1">Library</p><p className="text-cream">500,000+ volumes</p></div>
              <div><p className="text-cream-dim text-xs uppercase tracking-wider mb-1">Expertise</p><p className="text-cream">Mathematics, calligraphy, literature</p></div>
              <div><p className="text-cream-dim text-xs uppercase tracking-wider mb-1">Source</p><p className="text-cream">Ibn Bashkuwal, Kitab al-Silla (Cairo, 2008), Vol. 2: 324</p></div>
            </div>
          </motion.div>
        </div>
        <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, margin: "0px 0px 15% 0px" }} transition={{ duration: 0.7, delay: 0.4 }} className="glass-card rounded-2xl p-8 sm:p-10 relative flex flex-col">
          <span className="text-gold/30 text-7xl font-display absolute top-2 left-4 select-none leading-none">&ldquo;</span>
          <div className="mt-8 flex-1">
            <p className={`font-display text-xl sm:text-2xl md:text-3xl text-cream leading-relaxed italic ${!done ? 'cursor-blink' : ''}`}>{typed}</p>
          </div>
          {done && (
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7 }} className="mt-8 pt-6 border-t border-gold/15">
              <p className="text-cream-dim text-sm mb-4">— Ibn Bashkuwal, <em>Kitāb al-Ṣila</em> (Cairo, 2008), Vol. 2: 324 — recording Lubna of Cordoba</p>
              <div className="grid sm:grid-cols-3 gap-3">
                <div className="rounded-lg bg-gold/5 border border-gold/20 p-3"><p className="text-gold font-mono text-xs uppercase tracking-wider mb-1">Library size</p><p className="text-cream text-sm font-mono">500,000+ volumes</p></div>
                <div className="rounded-lg bg-gold/5 border border-gold/20 p-3"><p className="text-gold font-mono text-xs uppercase tracking-wider mb-1">European comparison</p><p className="text-cream text-sm font-mono">Largest: ~600 volumes</p></div>
                <div className="rounded-lg bg-gold/5 border border-gold/20 p-3"><p className="text-gold font-mono text-xs uppercase tracking-wider mb-1">Gender in Europe</p><p className="text-cream text-sm font-mono">Women barred from reading</p></div>
              </div>
            </motion.div>
          )}
        </motion.div>
        {done && (
          <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, delay: 0.3 }} className="mt-12 text-center">
            <p className="text-cream-dim text-sm sm:text-base">Lubna managed a library of <span className="text-gradient-gold font-semibold">500,000 books</span> — at a time when the largest European library had fewer than 600. She lectured on mathematics. She was a woman. In Europe, a woman who could read was suspect.</p>
          </motion.div>
        )}
      </div>
    </section>
  );
}
