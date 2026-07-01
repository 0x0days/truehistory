'use client';

import { useEffect, useState } from 'react';
import { motion, useScroll, useSpring } from 'framer-motion';

interface Chapter {
  id: string;
  label: string;
  index: number;
}

const CHAPTERS: Chapter[] = [
  { id: 'hero', label: 'The Question', index: 0 },
  { id: 'myth', label: 'The Myth', index: 1 },
  { id: 'gap', label: 'The Gap', index: 2 },
  { id: 'discovery', label: 'Discovery', index: 3 },
  { id: 'proof', label: 'The Proof', index: 4 },
  { id: 'math', label: 'The Math', index: 5 },
  { id: 'others', label: 'Others', index: 6 },
  { id: 'pillars', label: '7 Pillars', index: 7 },
  { id: 'verdict', label: 'Verdict', index: 8 },
  { id: 'evidence', label: 'Evidence', index: 9 },
  { id: 'simulator', label: 'Simulator', index: 10 },
  { id: 'photography', label: 'Photo Chain', index: 11 },
  { id: 'timeline', label: 'Timeline', index: 12 },
  { id: 'arcade', label: 'Rebuttals', index: 13 },
  { id: 'finale', label: 'Finale', index: 14 },
];

export default function ScrollProgress() {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 120,
    damping: 30,
    restDelta: 0.001,
  });

  const [activeChapter, setActiveChapter] = useState(0);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const onScroll = () => {
      const y = window.scrollY;
      const vh = window.innerHeight;
      let current = 0;
      for (let i = 0; i < CHAPTERS.length; i++) {
        const el = document.getElementById(CHAPTERS[i].id);
        if (!el) continue;
        const rect = el.getBoundingClientRect();
        if (rect.top <= vh * 0.5 && rect.bottom >= vh * 0.3) {
          current = i;
          break;
        }
      }
      setActiveChapter(current);
      const docH = document.documentElement.scrollHeight - vh;
      setProgress(docH > 0 ? Math.min(1, y / docH) : 0);
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const scrollToChapter = (id: string) => {
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  return (
    <>
      <motion.div
        className="fixed top-0 left-0 right-0 h-[3px] z-50 origin-left gradient-gold"
        style={{ scaleX }}
      />

      <div className="fixed right-4 sm:right-6 top-1/2 -translate-y-1/2 z-40 hidden md:flex flex-col gap-2.5">
        {CHAPTERS.map((ch, i) => (
          <button
            key={ch.id}
            onClick={() => scrollToChapter(ch.id)}
            className="group flex items-center gap-3 justify-end"
            aria-label={`Jump to ${ch.label}`}
          >
            <span
              className={`text-[10px] font-display tracking-widest uppercase transition-all duration-300 ${
                activeChapter === i
                  ? 'text-gold opacity-100 translate-x-0'
                  : 'text-cream-dim opacity-0 -translate-x-2 group-hover:opacity-70 group-hover:translate-x-0'
              }`}
            >
              {ch.label}
            </span>
            <span
              className={`relative flex items-center justify-center transition-all duration-300 ${
                activeChapter === i ? 'scale-125' : 'scale-100'
              }`}
            >
              <span
                className={`block rounded-full transition-all duration-300 ${
                  activeChapter === i
                    ? 'w-2.5 h-2.5 bg-gold glow-gold'
                    : i < activeChapter
                    ? 'w-1.5 h-1.5 bg-gold-soft'
                    : 'w-1.5 h-1.5 bg-cream-dim/40 group-hover:bg-cream-dim/70'
                }`}
              />
            </span>
          </button>
        ))}
      </div>

      <div className="fixed bottom-5 left-5 z-40 pointer-events-none">
        <div className="flex items-center gap-2 text-[10px] font-mono tracking-widest text-cream-dim/70 uppercase">
          <span>{String(Math.round(progress * 100)).padStart(2, '0')}%</span>
          <span className="text-gold/60">·</span>
          <span className="text-gold/90">
            {CHAPTERS[activeChapter].label}
          </span>
        </div>
      </div>
    </>
  );
}
