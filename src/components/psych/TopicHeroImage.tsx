'use client';

import Image from 'next/image';
import { motion } from 'framer-motion';

/**
 * TopicHeroImage — full-bleed authentic manuscript image at the top of each
 * investigation page. Sits BEHIND the hero text, with a premium gradient
 * overlay so the question text remains readable.
 *
 * Image loads immediately (priority), so users see authentic historical
 * manuscript imagery the moment they enter the topic — not a blank void.
 */
interface TopicHeroImageProps {
  src: string;
  alt: string;
  /** Caption shown bottom-right (source attribution). */
  caption?: string;
  /** Visual treatment: 'manuscript' (warm) or 'cosmic' (cool). */
  treatment?: 'manuscript' | 'cosmic';
}

export default function TopicHeroImage({
  src,
  alt,
  caption,
  treatment = 'manuscript',
}: TopicHeroImageProps) {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 1.05 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 1.6, ease: [0.16, 1, 0.3, 1] }}
      className="absolute inset-0 z-0 overflow-hidden"
    >
      {/* Full-bleed authentic manuscript image — loads immediately */}
      <Image
        src={src}
        alt={alt}
        fill
        priority
        sizes="100vw"
        className="object-cover object-center"
        quality={85}
      />

      {/* Multi-layer gradient overlay for text legibility */}
      <div
        className="absolute inset-0"
        style={{
          background:
            treatment === 'manuscript'
              ? `linear-gradient(180deg,
                  rgba(7, 9, 26, 0.85) 0%,
                  rgba(7, 9, 26, 0.55) 35%,
                  rgba(7, 9, 26, 0.75) 75%,
                  rgba(7, 9, 26, 0.95) 100%)`
              : `linear-gradient(180deg,
                  rgba(12, 23, 38, 0.88) 0%,
                  rgba(7, 9, 26, 0.55) 35%,
                  rgba(7, 9, 26, 0.75) 75%,
                  rgba(7, 9, 26, 0.95) 100%)`,
        }}
      />

      {/* Subtle aurora tint to harmonize with the Embered Aether palette */}
      <div
        className="absolute inset-0 mix-blend-soft-light opacity-60"
        style={{
          background:
            'radial-gradient(ellipse 60% 50% at 20% 30%, rgba(232, 149, 72, 0.25), transparent 70%), radial-gradient(ellipse 60% 50% at 80% 70%, rgba(122, 139, 212, 0.20), transparent 70%)',
        }}
      />

      {/* Premium grain for tactile feel */}
      <div
        className="absolute inset-0 opacity-[0.04] mix-blend-overlay pointer-events-none"
        style={{
          backgroundImage:
            "url(\"data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E\")",
        }}
      />

      {/* Caption — source attribution, bottom-right */}
      {caption && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.2, duration: 1 }}
          className="absolute bottom-3 right-4 z-10 max-w-xs text-right"
        >
          <p className="text-[9px] font-mono uppercase tracking-widest text-cream/40 leading-tight">
            {caption}
          </p>
        </motion.div>
      )}
    </motion.div>
  );
}
