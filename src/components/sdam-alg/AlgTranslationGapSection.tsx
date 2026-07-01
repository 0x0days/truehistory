'use client';
import { motion } from 'framer-motion';
import { BookOpen, Languages, Unlink, Sigma } from 'lucide-react';
import { useTranslations } from 'next-intl';
const LOST_NAMES = [
  { original: 'al-Khwārizmī', appeared: 'Algoritmi → Algorithm', note: '→ his NAME became the word' },
  { original: 'al-Jabr w\'al-Muqābala', appeared: 'Algebra', note: '→ his BOOK TITLE became the discipline' },
  { original: 'Hindu-Arabic numerals', appeared: '"Arabic numerals" / "Fibonacci\'s numerals"', note: '→ number system renamed' },
  { original: 'al-Khwārizmī\'s Zīj', appeared: 'Latin astronomical tables', note: '→ star tables transmitted unnamed' },
  { original: 'Hisab al-Jabr', appeared: 'Algebra (Latin)', note: '→ 700-yr textbook renamed' },
  { original: 'Completing the square', appeared: '"Vieta\'s method" (1591)', note: '→ technique renamed 771 yrs later' },
];
export default function AlgTranslationGapSection() {
  const tSections = useTranslations('Sections');
  return (
    <section id="gap" className="relative min-h-screen flex flex-col items-center justify-center px-6 py-24 manuscript-bg">
      <div className="absolute inset-0 opacity-[0.04] pointer-events-none" style={{ backgroundImage: 'radial-gradient(circle at 1px 1px, #d4af37 1px, transparent 0)', backgroundSize: '32px 32px' }} />
      <div className="max-w-6xl w-full relative z-10">
        <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, margin: "0px 0px 50% 0px" }} transition={{ duration: 0.8 }} className="text-center mb-16">
          <p className="text-[10px] font-mono tracking-[0.4em] uppercase text-gold/70 mb-4">{tSections('TranslationGap.chapterTitle')}</p>
          <h2 className="font-display text-4xl sm:text-6xl md:text-7xl text-cream leading-tight">His name became the word.<br /><span className="text-gradient-gold italic">His book became the discipline.</span></h2>
          <p className="mt-6 text-cream-dim max-w-2xl mx-auto text-base sm:text-lg leading-relaxed">No other case in the SDAM collection has etymological proof this airtight. The word &ldquo;algorithm&rdquo; is a Latinized form of &ldquo;al-Khwārizmī.&rdquo; The word &ldquo;algebra&rdquo; is the title of his book. The names crossed into every European language. The author was renamed &ldquo;Algoritmi&rdquo; — then forgotten.</p>
        </motion.div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-16 max-w-4xl mx-auto">
          <motion.div initial={{ opacity: 0, x: -30 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true, margin: "0px 0px 50% 0px" }} transition={{ duration: 0.7 }} className="glass-card-gold rounded-2xl p-6 text-center">
            <Sigma className="w-8 h-8 mx-auto mb-3 text-gold" />
            <p className="font-arabic text-2xl text-gold mb-1" dir="rtl">الجبر</p>
            <p className="text-cream text-sm">Arabic mathematical tradition</p>
            <p className="text-cream-dim text-xs mt-1">al-Khwārizmī (820 CE) — systematic algebra, algorithms, Hindu-Arabic numerals</p>
          </motion.div>
          <motion.div initial={{ opacity: 0, y: -20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, margin: "0px 0px 50% 0px" }} transition={{ duration: 0.7, delay: 0.2 }} className="glass-card rounded-2xl p-6 text-center relative">
            <Languages className="w-8 h-8 mx-auto mb-3 text-cream-dim" />
            <p className="font-display text-2xl text-cream mb-1 italic">Translatio</p>
            <p className="text-cream-dim text-sm">Toledo (12th c.) + Fibonacci (1202)</p>
            <p className="text-cream-dim/70 text-xs mt-1">Al-Khwārizmī → "Algoritmi." al-Jabr → "Algebra."</p>
            <div className="absolute -top-3 -right-3 w-7 h-7 rounded-full bg-burgundy/80 border border-burgundy flex items-center justify-center"><Unlink className="w-4 h-4 text-cream" /></div>
          </motion.div>
          <motion.div initial={{ opacity: 0, x: 30 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true, margin: "0px 0px 50% 0px" }} transition={{ duration: 0.7, delay: 0.4 }} className="glass-card rounded-2xl p-6 text-center">
            <BookOpen className="w-8 h-8 mx-auto mb-3 text-cream-dim" />
            <p className="font-display text-2xl text-cream mb-1 italic">Algebra / Algorithm</p>
            <p className="text-cream-dim text-sm">Every language on Earth</p>
            <p className="text-cream-dim/70 text-xs mt-1">His name and his book title — in every programming language, every textbook, every computer</p>
          </motion.div>
        </div>
        <motion.div initial={{ opacity: 0, y: 40 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, margin: "0px 0px 50% 0px" }} transition={{ duration: 0.8 }} className="max-w-3xl mx-auto">
          <p className="text-center text-cream-dim text-sm uppercase tracking-widest mb-6 font-mono">Names erased — but the words survived</p>
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
          <p className="text-center text-cream-dim/70 text-xs mt-6 italic">Fibonacci&apos;s Liber Abaci (1202) — the book that brought &ldquo;Arabic numerals&rdquo; to Europe — explicitly credits &ldquo;the Indians and the Arabs.&rdquo; But the European tradition that followed credited Fibonacci, not al-Khwārizmī. The word &ldquo;algorithm&rdquo; survived. The man did not.</p>
        </motion.div>
      </div>
    </section>
  );
}
