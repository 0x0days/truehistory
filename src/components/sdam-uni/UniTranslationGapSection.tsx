'use client';
import { motion } from 'framer-motion';
import { BookOpen, Languages, Unlink, GraduationCap } from 'lucide-react';
import { useTranslations } from 'next-intl';

const LOST_NAMES = [
  { original: 'Fatima al-Fehri', appeared: '(unnamed in European histories)', note: '→ university erased' },
  { original: 'al-Qarawiyyin University', appeared: 'Bologna (1088)', note: '→ 229 years later' },
  { original: 'Lubna of Cordoba', appeared: '(unnamed)', note: '→ 500,000-book library erased' },
  { original: 'Dhayfa Khatun', appeared: '(unnamed)', note: '→ university financing erased' },
  { original: 'Bimaristan system', appeared: '"European hospital" (18th c.)', note: '→ 900 years later' },
  { original: 'Iqra (Read!)', appeared: 'nullius in verba', note: '→ motto erased' },
];

export default function UniTranslationGapSection() {
  const tSections = useTranslations('Sections');
  return (
    <section id="gap" className="relative min-h-screen flex flex-col items-center justify-center px-6 py-24 manuscript-bg">
      <div className="absolute inset-0 opacity-[0.04] pointer-events-none" style={{ backgroundImage: 'radial-gradient(circle at 1px 1px, #d4af37 1px, transparent 0)', backgroundSize: '32px 32px' }} />
      <div className="max-w-6xl w-full relative z-10">
        <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, margin: "0px 0px 50% 0px" }} transition={{ duration: 0.8 }} className="text-center mb-16">
          <p className="text-[10px] font-mono tracking-[0.4em] uppercase text-gold/70 mb-4">{tSections('TranslationGap.chapterTitle')}</p>
          <h2 className="font-display text-4xl sm:text-6xl md:text-7xl text-cream leading-tight">The university crossed into Latin.<br /><span className="text-gradient-gold italic">The founder did not.</span></h2>
          <p className="mt-6 text-cream-dim max-w-2xl mx-auto text-base sm:text-lg leading-relaxed">Al-Qarawiyyin University was founded by a woman in 859 CE. When European universities adopted the institutional model — the degree, the faculty, the curriculum — they credited Bologna (1088) as the &ldquo;first.&rdquo; The Arabic origin was erased. The female founder was erased. The 229-year gap was erased.</p>
        </motion.div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-16 max-w-4xl mx-auto">
          <motion.div initial={{ opacity: 0, x: -30 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true, margin: "0px 0px 50% 0px" }} transition={{ duration: 0.7 }} className="glass-card-gold rounded-2xl p-6 text-center">
            <GraduationCap className="w-8 h-8 mx-auto mb-3 text-gold" />
            <p className="font-arabic text-2xl text-gold mb-1" dir="rtl">الجامعة</p>
            <p className="text-cream text-sm">Arabic university tradition</p>
            <p className="text-cream-dim text-xs mt-1">Al-Qarawiyyin (859), Al-Azhar (970), Nizamiyya (1065). Women founders. Open to all.</p>
          </motion.div>
          <motion.div initial={{ opacity: 0, y: -20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, margin: "0px 0px 50% 0px" }} transition={{ duration: 0.7, delay: 0.2 }} className="glass-card rounded-2xl p-6 text-center relative">
            <Languages className="w-8 h-8 mx-auto mb-3 text-cream-dim" />
            <p className="font-display text-2xl text-cream mb-1 italic">Translatio</p>
            <p className="text-cream-dim text-sm">Toledo (12th c.) + Sicily</p>
            <p className="text-cream-dim/70 text-xs mt-1">Arabic curriculum → Latin. Founder erased. Model renamed "European."</p>
            <div className="absolute -top-3 -right-3 w-7 h-7 rounded-full bg-burgundy/80 border border-burgundy flex items-center justify-center"><Unlink className="w-4 h-4 text-cream" /></div>
          </motion.div>
          <motion.div initial={{ opacity: 0, x: 30 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true, margin: "0px 0px 50% 0px" }} transition={{ duration: 0.7, delay: 0.4 }} className="glass-card rounded-2xl p-6 text-center">
            <BookOpen className="w-8 h-8 mx-auto mb-3 text-cream-dim" />
            <p className="font-display text-2xl text-cream mb-1 italic">Universitas</p>
            <p className="text-cream-dim text-sm">Bologna (1088) → Oxford → Paris</p>
            <p className="text-cream-dim/70 text-xs mt-1">Adopted the Arabic model. 229 years later. Credited as "first."</p>
          </motion.div>
        </div>
        <motion.div initial={{ opacity: 0, y: 40 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, margin: "0px 0px 50% 0px" }} transition={{ duration: 0.8 }} className="max-w-3xl mx-auto">
          <p className="text-center text-cream-dim text-sm uppercase tracking-widest mb-6 font-mono">Names erased, institutions inherited</p>
          <div className="space-y-2">
            {LOST_NAMES.map((n, i) => (
              <motion.div key={n.original} initial={{ opacity: 0, x: -20 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true, margin: "0px 0px 50% 0px" }} transition={{ duration: 0.5, delay: i * 0.08 }} className="grid grid-cols-12 items-center gap-2 glass-card rounded-xl px-4 py-3 hover:border-gold/40 transition-colors">
                <span className="col-span-5 text-cream font-medium text-sm sm:text-base truncate">{n.original}</span>
                <span className="col-span-1 text-gold/60 text-center">→</span>
                <span className="col-span-3 text-cream-dim italic text-xs sm:text-sm truncate">{n.appeared}</span>
                <span className="col-span-3 text-gold/70 text-[10px] sm:text-xs text-right font-mono truncate">{n.note}</span>
              </motion.div>
            ))}
          </div>
          <p className="text-center text-cream-dim/70 text-xs mt-6 italic">The word &ldquo;university&rdquo; comes from Latin <em>universitas</em> — but the institution (degree-granting, faculty-organized, open to scholars) was modeled on the Arabic <em>madrasa</em> system that Fatima al-Fehri&apos;s al-Qarawiyyin exemplified. The model crossed. The name of the founder did not.</p>
        </motion.div>
      </div>
    </section>
  );
}
