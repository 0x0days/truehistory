'use client';
import { motion, useScroll, useTransform } from 'framer-motion';
import { useRef } from 'react';
import Image from 'next/image';
import { useTranslations } from 'next-intl';

export default function MedDiscoverySection() {
  const tCommon = useTranslations('Discovery.common');

  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start end', 'end start'] });
  const yearScale = useTransform(scrollYProgress, [0.15, 0.45], [0.3, 1]);
  const yearOpacity = useTransform(scrollYProgress, [0.15, 0.4], [0, 1]);
  const contentY = useTransform(scrollYProgress, [0.3, 0.6], [60, 0]);
  const contentOpacity = useTransform(scrollYProgress, [0.3, 0.6], [0, 1]);
  return (
    <section id="discovery" ref={ref} className="relative min-h-screen flex flex-col items-center justify-center px-6 py-24 overflow-hidden">
      <motion.div style={{ rotate: useTransform(scrollYProgress, [0, 1], [0, 120]) }} className="absolute -top-40 -right-40 w-[500px] h-[500px] rounded-full border border-gold/10 pointer-events-none"><div className="absolute inset-8 rounded-full border border-gold/8" /><div className="absolute inset-20 rounded-full border border-gold/6" /><div className="absolute top-0 left-1/2 -translate-x-1/2 w-3 h-3 rounded-full bg-gold glow-gold" /></motion.div>
      <div className="max-w-5xl w-full relative z-10">
        <motion.div style={{ opacity: yearOpacity, scale: yearScale }} className="text-center mb-12">
          <p className="text-[10px] font-mono tracking-[0.4em] uppercase text-gold/70 mb-6">{tCommon('chapterTitle')}</p>
          <h2 className="font-display text-[16vw] sm:text-[12vw] md:text-[10rem] leading-none text-gradient-gold text-glow-gold">900</h2>
          <p className="font-mono text-cream-dim tracking-[0.5em] uppercase text-xs sm:text-sm mt-2">Common Era · Baghdad</p>
        </motion.div>
        <motion.div style={{ y: contentY, opacity: contentOpacity }} className="grid md:grid-cols-2 gap-8 items-center max-w-4xl mx-auto">
          <motion.div initial={{ opacity: 0, scale: 0.9 }} whileInView={{ opacity: 1, scale: 1 }} viewport={{ once: true, margin: "0px 0px 50% 0px" }} transition={{ duration: 0.7 }} className="glass-card-gold rounded-2xl overflow-hidden relative group">
            <div className="relative aspect-[3/4] overflow-hidden">
              <Image src="/images/sdam-med/alrazi-nlm.jpg" alt="Authentic Arabic medical manuscript page from the National Library of Medicine, in the tradition of al-Razi" fill sizes="(max-width: 768px) 100vw, 50vw" className="object-cover transition-transform duration-700 group-hover:scale-105" />
              <div className="absolute inset-0 bg-gradient-to-t from-cosmos-deep via-cosmos/40 to-transparent" />
              <div className="absolute bottom-0 left-0 right-0 p-5">
                <p className="font-arabic text-2xl text-gold mb-1" dir="rtl">أبو بكر الرازي</p>
                <h3 className="font-display text-2xl sm:text-3xl text-cream leading-tight">Abū Bakr</h3>
                <h3 className="font-display text-2xl sm:text-3xl text-gradient-gold italic leading-tight">al-Rāzī</h3>
                <p className="text-cream-dim text-xs mt-1">854 – 925 CE · Baghdad / Rayy</p>
              </div>
              <div className="absolute top-3 left-3 w-6 h-6 border-t-2 border-l-2 border-gold/60" /><div className="absolute top-3 right-3 w-6 h-6 border-t-2 border-r-2 border-gold/60" /><div className="absolute bottom-3 left-3 w-6 h-6 border-b-2 border-l-2 border-gold/60" /><div className="absolute bottom-3 right-3 w-6 h-6 border-b-2 border-r-2 border-gold/60" />
            </div>
            <div className="p-4 pt-3 border-t border-gold/15 bg-cosmos-deep/50"><p className="text-[10px] font-mono uppercase tracking-widest text-cream-dim/70 text-center italic">Authentic Arabic medical manuscript · National Library of Medicine</p></div>
          </motion.div>
          <div className="relative">
            <div className="text-gold/40 text-6xl font-display absolute -top-6 -left-2 select-none">&ldquo;</div>
            <blockquote className="font-display text-xl sm:text-2xl md:text-3xl text-cream leading-relaxed italic pl-8 border-l-2 border-gold/40">To determine the healthiest location for the new hospital, I hung pieces of meat at various sites around Baghdad. The site where the meat decayed least had the purest air — and there the hospital was built.</blockquote>
            <p className="text-cream-dim text-sm mt-4 pl-8">— al-Rāzī, recorded in Ibn Abī Uṣaybiʿa&apos;s <em>ʿUyūn al-Anbāʾ</em> (13th century)</p>
            <motion.div initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true, margin: "0px 0px 50% 0px" }} transition={{ delay: 0.5, duration: 0.8 }} className="mt-8 pl-8 space-y-3">
              <div className="flex items-baseline gap-2"><span className="text-gold text-xs font-mono">01</span><span className="text-cream/85 text-sm">The <span className="text-gradient-gold font-semibold">first controlled clinical trial</span> in recorded history.</span></div>
              <div className="flex items-baseline gap-2"><span className="text-gold text-xs font-mono">02</span><span className="text-cream/85 text-sm">Al-Rāzī also wrote the first medical encyclopedia (Kitāb al-Hāwī), ran the first differential diagnosis of smallpox vs. measles, and treated psychiatric patients with music therapy.</span></div>
              <div className="flex items-baseline gap-2"><span className="text-gold text-xs font-mono">03</span><span className="text-cream/85 text-sm"><span className="text-gradient-gold font-semibold">663 years</span> before the first European hospital with comparable standards.</span></div>
              <div className="pt-4"><p className="text-cream/90 text-base leading-relaxed">Al-Rāzī was the first physician to systematically <span className="text-gold font-medium">test before treating</span>. He divided patients into groups, compared outcomes, and rejected treatments that failed — even if they were recommended by Galen. This was the birth of evidence-based medicine. It was stated in Arabic, in Baghdad, c. 900 CE — then <span className="text-gradient-gold font-semibold">erased from European histories</span>.</p></div>
            </motion.div>
          </div>
        </motion.div>
        <motion.div initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true, margin: "0px 0px 50% 0px" }} transition={{ delay: 0.4 }} className="text-center mt-16"><p className="text-cream-dim text-sm">Al-Rāzī started the clinical method. Ibn Sīnā systematized it.</p><p className="text-gold font-display text-xl sm:text-2xl italic mt-2">The Canon of Medicine — Europe&apos;s textbook for 600 years.</p></motion.div>
      </div>
    </section>
  );
}
