'use client';
import { motion } from 'framer-motion';
import { BookOpen, Languages, Unlink, Stethoscope } from 'lucide-react';
import { useTranslations } from 'next-intl';
const LOST_NAMES = [
  { original: 'al-Rāzī (Abū Bakr)', appeared: 'Rhazes', note: '→ clinical trial erased' },
  { original: 'Ibn Sīnā', appeared: 'Avicenna', note: '→ Canon attributed to "Europeans"' },
  { original: 'Ibn al-Nafīs', appeared: '(rarely cited)', note: '→ pulmonary circulation erased' },
  { original: 'al-Zahrāwī', appeared: 'Abulcasis', note: '→ surgical textbook erased' },
  { original: 'Kitāb al-Qānūn', appeared: 'Canon of Medicine (Latin)', note: '→ 600-yr textbook renamed' },
  { original: 'Bimaristan', appeared: '"hospital" (18th c.)', note: '→ 800-yr institution renamed' },
];
export default function MedTranslationGapSection() {
  const tSections = useTranslations('Sections');
  return (
    <section id="gap" className="relative min-h-screen flex flex-col items-center justify-center px-6 py-24 manuscript-bg">
      <div className="absolute inset-0 opacity-[0.04] pointer-events-none" style={{ backgroundImage: 'radial-gradient(circle at 1px 1px, #d4af37 1px, transparent 0)', backgroundSize: '32px 32px' }} />
      <div className="max-w-6xl w-full relative z-10">
        <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, margin: "0px 0px 15% 0px" }} transition={{ duration: 0.8 }} className="text-center mb-16">
          <p className="text-[10px] font-mono tracking-[0.4em] uppercase text-gold/70 mb-4">{tSections('TranslationGap.chapterTitle')}</p>
          <h2 className="font-display text-4xl sm:text-6xl md:text-7xl text-cream leading-tight">The Canon crossed into Latin.<br /><span className="text-gradient-gold italic">The author was renamed.</span></h2>
          <p className="mt-6 text-cream-dim max-w-2xl mx-auto text-base sm:text-lg leading-relaxed">Ibn Sīnā became &ldquo;Avicenna.&rdquo; Al-Rāzī became &ldquo;Rhazes.&rdquo; Al-Zahrāwī became &ldquo;Abulcasis.&rdquo; The Canon of Medicine — Europe&apos;s medical textbook for 600 years — was attributed to &ldquo;the Arabs&rdquo; in general, then to the Europeans who printed it. The bimaristan became the &ldquo;hospital.&rdquo; The clinical trial was forgotten entirely.</p>
        </motion.div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-16 max-w-4xl mx-auto">
          <motion.div initial={{ opacity: 0, x: -30 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true, margin: "0px 0px 15% 0px" }} transition={{ duration: 0.7 }} className="glass-card-gold rounded-2xl p-6 text-center">
            <Stethoscope className="w-8 h-8 mx-auto mb-3 text-gold" />
            <p className="font-arabic text-2xl text-gold mb-1" dir="rtl">الطب</p>
            <p className="text-cream text-sm">Arabic medical tradition</p>
            <p className="text-cream-dim text-xs mt-1">al-Rāzī (900), Ibn Sīnā (1025), al-Zahrāwī (1000), Ibn al-Nafīs (1242)</p>
          </motion.div>
          <motion.div initial={{ opacity: 0, y: -20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, margin: "0px 0px 15% 0px" }} transition={{ duration: 0.7, delay: 0.2 }} className="glass-card rounded-2xl p-6 text-center relative">
            <Languages className="w-8 h-8 mx-auto mb-3 text-cream-dim" />
            <p className="font-display text-2xl text-cream mb-1 italic">Translatio</p>
            <p className="text-cream-dim text-sm">Toledo (12th c.) + Constantinople 1453</p>
            <p className="text-cream-dim/70 text-xs mt-1">Canon → Latin. Used at Montpellier, Padu, Paris for 600 years.</p>
            <div className="absolute -top-3 -right-3 w-7 h-7 rounded-full bg-burgundy/80 border border-burgundy flex items-center justify-center"><Unlink className="w-4 h-4 text-cream" /></div>
          </motion.div>
          <motion.div initial={{ opacity: 0, x: 30 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true, margin: "0px 0px 15% 0px" }} transition={{ duration: 0.7, delay: 0.4 }} className="glass-card rounded-2xl p-6 text-center">
            <BookOpen className="-8 h-8 mx-auto mb-3 text-cream-dim" />
            <p className="font-display text-2xl text-cream mb-1 italic">Medicina</p>
            <p className="text-cream-dim text-sm">European "Renaissance" medicine</p>
            <p className="text-cream-dim/70 text-xs mt-1">Vesalius, Harvey — using Arabic textbooks</p>
          </motion.div>
        </div>
        <motion.div initial={{ opacity: 0, y: 40 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, margin: "0px 0px 15% 0px" }} transition={{ duration: 0.8 }} className="max-w-3xl mx-auto">
          <p className="text-center text-cream-dim text-sm uppercase tracking-widest mb-6 font-mono">Names erased, medicine inherited</p>
          <div className="space-y-2">
            {LOST_NAMES.map((n, i) => (
              <motion.div key={n.original} initial={{ opacity: 0, x: -20 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true, margin: "0px 0px 15% 0px" }} transition={{ duration: 0.5, delay: i * 0.08 }} className="grid grid-cols-12 items-center gap-2 glass-card rounded-xl px-4 py-3 hover:border-gold/40 transition-colors">
                <span className="col-span-5 text-cream font-medium text-sm sm:text-base truncate">{n.original}</span>
                <span className="col-span-1 text-gold/60 text-center">→</span>
                <span className="col-span-3 text-cream-dim italic text-xs sm:text-sm truncate">{n.appeared}</span>
                <span className="col-span-3 text-gold/70 text-[10px] sm:text-xs text-right font-mono truncate">{n.note}</span>
              </motion.div>
            ))}
          </div>
          <p className="text-center text-cream-dim/70 text-xs mt-6 italic">The Canon of Medicine was used as the standard textbook at the University of Montpellier from its founding in 1181 until the 17th century — 500+ years. It was attributed to &ldquo;Avicenna.&rdquo; No European physician innovated beyond it until Vesalius (1543), and even Vesalius used its anatomical framework.</p>
        </motion.div>
      </div>
    </section>
  );
}
