'use client';

import { motion } from 'framer-motion';
import { Share2, RotateCcw, BookOpen, ArrowUp } from 'lucide-react';
import { useTranslations } from 'next-intl';

export default function CalculusFinaleSection() {
  const tCommon = useTranslations('Finale.common');
  const tC = useTranslations('Common');
  const t = useTranslations('Finale.calculus');
  const tBody = useTranslations('FinaleBody.calculus');

  const scrollTop = () => window.scrollTo({ top: 0, behavior: 'smooth' });

  const shareText = encodeURIComponent(
    'Newton unified it. Leibniz named it. But integration was Ibn al-Haytham\'s (1000 CE, 666 yrs pre-Newton), differentiation was Sharaf al-Ṭūsī\'s (1170), and infinite series were Mādhava\'s (1400). And the manuscripts reached Europe by conquest. An interactive SDAM investigation.'
  );

  const openShare = (platform: 'twitter' | 'facebook' | 'linkedin') => {
    const url = encodeURIComponent(window.location.href);
    const targets = {
      twitter: `https://twitter.com/intent/tweet?text=${shareText}&url=${url}`,
      facebook: `https://www.facebook.com/sharer/sharer.php?u=${url}`,
      linkedin: `https://www.linkedin.com/sharing/share-offsite/?url=${url}`,
    };
    window.open(targets[platform], '_blank', 'noopener,noreferrer,width=600,height=540');
  };

  const shareButtons = [
    { label: 'X / Twitter', platform: 'twitter' as const },
    { label: 'Facebook', platform: 'facebook' as const },
    { label: 'LinkedIn', platform: 'linkedin' as const },
  ];

  return (
    <section
      id="finale"
      className="relative min-h-screen flex flex-col items-center justify-center px-6 py-24 overflow-hidden"
    >
      <motion.div
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true, margin: "0px 0px 50% 0px" }}
        transition={{ duration: 1.5 }}
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            'radial-gradient(circle at 50% 40%, rgba(212,175,55,0.16) 0%, transparent 60%)',
        }}
      />

      <div className="max-w-4xl w-full relative z-10 text-center">
        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true, margin: "0px 0px 50% 0px" }}
          transition={{ duration: 0.8 }}
          className="text-[10px] font-mono tracking-[0.4em] uppercase text-gold/70 mb-6"
        >
          {tCommon('correctedRecord')}
        </motion.p>

        <motion.h2
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "0px 0px 50% 0px" }}
          transition={{ duration: 0.8, delay: 0.1 }}
          className="font-display text-3xl sm:text-5xl md:text-6xl text-cream leading-tight mb-8"
        >
          {tCommon('nextTextbook')}:
        </motion.h2>

        <motion.blockquote
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "0px 0px 50% 0px" }}
          transition={{ duration: 0.8, delay: 0.3 }}
          className="glass-card-gold rounded-2xl p-8 sm:p-10 mb-10 relative"
        >
          <span className="absolute -top-4 left-6 text-gold/30 text-6xl font-display select-none">
            &ldquo;
          </span>
          <p className="font-display text-base sm:text-xl md:text-2xl text-cream leading-relaxed italic">
            {tBody('blockquote')}
          </p>
        </motion.blockquote>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "0px 0px 50% 0px" }}
          transition={{ duration: 0.7, delay: 0.4 }}
          className="grid sm:grid-cols-3 gap-4 mb-12"
        >
          {[
            { num: '01', t: tBody('principles.1.title'), d: tBody('principles.1.desc') },
            { num: '02', t: tBody('principles.2.title'), d: tBody('principles.2.desc') },
            { num: '03', t: tBody('principles.3.title'), d: tBody('principles.3.desc') },
          ].map((p) => (
            <div key={p.num} className="glass-card rounded-xl p-5 text-left">
              <p className="font-mono text-xs text-gold mb-1">{p.num}</p>
              <p className="font-display text-base text-cream mb-1">{p.t}</p>
              <p className="text-cream-dim text-xs leading-relaxed">{p.d}</p>
            </div>
          ))}
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "0px 0px 50% 0px" }}
          transition={{ duration: 0.7, delay: 0.5 }}
          className="flex flex-col sm:flex-row items-center justify-center gap-3 mb-8"
        >
          <span className="flex items-center gap-2 text-cream-dim text-sm">
            <Share2 className="w-4 h-4" />
            {tCommon('shareLabel')}
          </span>
          <div className="flex flex-wrap items-center justify-center gap-2">
            {shareButtons.map((btn) => (
              <button
                key={btn.label}
                onClick={() => openShare(btn.platform)}
                className="px-4 py-2 rounded-full border border-cream-dim/20 bg-cosmos-soft/60 backdrop-blur-md hover:border-gold/60 hover:bg-gold/10 transition-all text-cream text-xs font-mono uppercase tracking-wider"
              >
                {btn.label}
              </button>
            ))}
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "0px 0px 50% 0px" }}
          transition={{ duration: 0.7, delay: 0.6 }}
          className="glass-card rounded-2xl p-6 sm:p-8 max-w-2xl mx-auto mb-10"
        >
          <div className="flex items-center justify-center gap-2 mb-3 text-gold">
            <BookOpen className="w-5 h-5" />
            <span className="font-mono text-xs uppercase tracking-widest">
              {tCommon('frameworkGeneral')}
            </span>
          </div>
          <p className="font-display text-xl sm:text-2xl text-cream mb-2">
            {tCommon('whatNext')}
          </p>
          <p className="text-cream-dim text-sm mb-4">
            Algebra · Trigonometry · Medicine · Astronomy · The heliocentric
            model · Hospitals · Navigation…
          </p>
          <p className="text-gold/80 text-xs italic">
            {tC('whatNextHint')}
          </p>
        </motion.div>

        <motion.button
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true, margin: "0px 0px 50% 0px" }}
          transition={{ duration: 0.6, delay: 0.7 }}
          onClick={scrollTop}
          className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full border border-gold/40 hover:border-gold hover:bg-gold/10 transition-all text-cream text-xs font-mono uppercase tracking-wider group"
        >
          <ArrowUp className="w-3.5 h-3.5 group-hover:-translate-y-0.5 transition-transform" />
          {tCommon('reinvestigate')}
          <RotateCcw className="w-3 h-3 opacity-60" />
        </motion.button>

        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true, margin: "0px 0px 50% 0px" }}
          transition={{ duration: 0.8, delay: 1 }}
          className="mt-16 pt-8 border-t border-gold/10"
        >
          <p className="font-display text-sm text-cream-dim italic">
            {tC('footerText')}{' '}
            <span className="text-gold">Scientific Discovery Attribution Methodology</span>.
          </p>
          <p className="font-mono text-[10px] uppercase tracking-widest text-cream-dim/60 mt-2">
            Seven pillars · CES 14/21 · Strong Case · Calculus + The Library Theft
          </p>
        </motion.div>
      </div>
    </section>
  );
}
