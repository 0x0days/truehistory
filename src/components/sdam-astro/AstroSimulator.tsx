'use client';

import { useEffect, useRef, useState } from 'react';
import { motion } from 'framer-motion';
import Image from 'next/image';

/**
 * Interactive Tusi Couple Simulator.
 * User controls the rotation speed. The canvas draws:
 * - A large circle (radius 2r)
 * - A smaller circle (radius r) rolling inside it
 * - A point P on the smaller circle that traces a straight line (the diameter)
 * - The traced path (showing the linear motion)
 *
 * This is the device Copernicus copied from al-Ṭūsī 296 years later.
 */
export default function AstroSimulator() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const angleRef = useRef(0);
  const speedRef = useRef(0.012);
  const [speed, setSpeed] = useState(0.012);
  const [showTrail, setShowTrail] = useState(true);
  const [hasInteracted, setHasInteracted] = useState(false);

  const trailRef = useRef<{ x: number; y: number; life: number }[]>([]);

  useEffect(() => {
    speedRef.current = speed;
  }, [speed]);

  useEffect(() => {
    const canvas = canvasRef.current;
    const container = containerRef.current;
    if (!canvas || !container) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    let w = 0;
    let h = 0;

    const resize = () => {
      w = container.clientWidth;
      h = container.clientHeight;
      canvas.width = w * dpr;
      canvas.height = h * dpr;
      canvas.style.width = `${w}px`;
      canvas.style.height = `${h}px`;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    };

    resize();
    window.addEventListener('resize', resize);

    let raf = 0;
    const render = () => {
      angleRef.current += speedRef.current;
      const angle = angleRef.current;

      ctx.clearRect(0, 0, w, h);

      const cx = w / 2;
      const cy = h / 2;
      const R = Math.min(w, h) * 0.38; // large circle radius (2r)
      const r = R / 2; // small circle radius (r)

      // Large circle
      ctx.strokeStyle = 'rgba(212, 175, 55, 0.4)';
      ctx.lineWidth = 2;
      ctx.beginPath();
      ctx.arc(cx, cy, R, 0, Math.PI * 2);
      ctx.stroke();

      // Center of small circle — it rotates inside the large one
      // The small circle's center is at distance R - r = r from the large center
      const smallCx = cx + Math.cos(angle) * (R - r);
      const smallCy = cy + Math.sin(angle) * (R - r);

      // The point P on the small circle — it rotates at twice the speed (in the opposite direction relative to the small circle's center)
      // P = center + r * (cos(2*angle + π), sin(2*angle + π))
      // This simplifies to: P = (cx + R*cos(angle) - 0... actually let me re-derive
      // For the Tusi couple: the small circle rolls inside the large one.
      // If the small circle's center is at angle θ from the large center, then P (on the small circle) is at angle -θ from the small center (rolling).
      // P = (cx + (R-r)cos(θ) + r*cos(-θ), cy + (R-r)sin(θ) + r*sin(-θ))
      //   = (cx + (R-r)cos(θ) + r*cos(θ), cy + (R-r)sin(θ) - r*sin(θ))
      //   = (cx + R*cos(θ), cy + (R-r)sin(θ) - r*sin(θ))
      //   = (cx + R*cos(θ), cy + (R-2r)*sin(θ))
      // Since R = 2r, this becomes: (cx + R*cos(θ), cy + 0) = (cx + R*cos(θ), cy)
      // That's a straight horizontal line! The Tusi Couple.

      const Px = cx + R * Math.cos(angle);
      const Py = cy; // This is the magic — it's always on the horizontal diameter

      // Draw the small circle
      ctx.strokeStyle = 'rgba(244, 208, 98, 0.6)';
      ctx.lineWidth = 1.5;
      ctx.beginPath();
      ctx.arc(smallCx, smallCy, r, 0, Math.PI * 2);
      ctx.stroke();
      // Fill
      const smallGrad = ctx.createRadialGradient(smallCx, smallCy, 0, smallCx, smallCy, r);
      smallGrad.addColorStop(0, 'rgba(244, 208, 98, 0.05)');
      smallGrad.addColorStop(1, 'rgba(212, 175, 55, 0.02)');
      ctx.fillStyle = smallGrad;
      ctx.fill();

      // Line from small center to point P
      ctx.strokeStyle = 'rgba(244, 208, 98, 0.4)';
      ctx.lineWidth = 1;
      ctx.beginPath();
      ctx.moveTo(smallCx, smallCy);
      ctx.lineTo(Px, Py);
      ctx.stroke();

      // The diameter line (the path P traces)
      ctx.strokeStyle = 'rgba(74, 200, 184, 0.3)';
      ctx.lineWidth = 1;
      ctx.setLineDash([3, 4]);
      ctx.beginPath();
      ctx.moveTo(cx - R, cy);
      ctx.lineTo(cx + R, cy);
      ctx.stroke();
      ctx.setLineDash([]);

      // Trail
      if (showTrail) {
        trailRef.current.push({ x: Px, y: Py, life: 0 });
        if (trailRef.current.length > 200) trailRef.current.shift();
        trailRef.current = trailRef.current.map((t) => ({ ...t, life: t.life + 1 }));

        for (let i = 0; i < trailRef.current.length - 1; i++) {
          const t1 = trailRef.current[i];
          const t2 = trailRef.current[i + 1];
          const alpha = (1 - t1.life / 200) * 0.6;
          ctx.strokeStyle = `rgba(244, 208, 98, ${alpha})`;
          ctx.lineWidth = 2;
          ctx.beginPath();
          ctx.moveTo(t1.x, t1.y);
          ctx.lineTo(t2.x, t2.y);
          ctx.stroke();
        }
      }

      // Point P (the tracing point)
      const pGrad = ctx.createRadialGradient(Px, Py, 0, Px, Py, 12);
      pGrad.addColorStop(0, 'rgba(244, 208, 98, 0.6)');
      pGrad.addColorStop(1, 'rgba(244, 208, 98, 0)');
      ctx.beginPath();
      ctx.arc(Px, Py, 12, 0, Math.PI * 2);
      ctx.fillStyle = pGrad;
      ctx.fill();
      ctx.beginPath();
      ctx.arc(Px, Py, 5, 0, Math.PI * 2);
      ctx.fillStyle = '#f4d062';
      ctx.fill();
      ctx.strokeStyle = '#fff7d6';
      ctx.lineWidth = 1.5;
      ctx.stroke();

      // Labels
      ctx.font = '10px ui-monospace, monospace';
      ctx.fillStyle = 'rgba(212, 175, 55, 0.7)';
      ctx.textAlign = 'left';
      ctx.fillText('LARGE CIRCLE (radius 2r)', 12, 18);
      ctx.fillStyle = 'rgba(244, 208, 98, 0.7)';
      ctx.fillText('SMALL CIRCLE (radius r)', smallCx - r, smallCy - r - 6);
      ctx.fillStyle = '#f4d062';
      ctx.fillText('POINT P', Px + 8, Py - 8);
      ctx.fillStyle = 'rgba(74, 200, 184, 0.6)';
      ctx.fillText('PATH TRACED (straight line)', cx - R + 4, cy - 8);

      // Speed indicator
      ctx.fillStyle = 'rgba(244, 234, 213, 0.4)';
      ctx.textAlign = 'right';
      ctx.fillText(`angular speed: ${speedRef.current.toFixed(4)}`, w - 12, 18);

      raf = requestAnimationFrame(render);
    };

    render();

    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener('resize', resize);
    };
  }, [showTrail]);

  return (
    <section
      id="simulator"
      className="relative min-h-screen flex flex-col items-center justify-center px-6 py-24 overflow-hidden"
    >
      <div
        className="absolute inset-0 opacity-[0.025] pointer-events-none"
        style={{
          backgroundImage:
            'linear-gradient(rgba(212,175,55,1) 1px, transparent 1px), linear-gradient(90deg, rgba(212,175,55,1) 1px, transparent 1px)',
          backgroundSize: '80px 80px',
        }}
      />

      <div className="max-w-6xl w-full relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "0px 0px 15% 0px" }}
          transition={{ duration: 0.8 }}
          className="text-center mb-10"
        >
          <p className="text-[10px] font-mono tracking-[0.4em] uppercase text-gold/70 mb-4">
            Chapter 07 — Watch the Tusi Couple Work
          </p>
          <h2 className="font-display text-4xl sm:text-6xl md:text-7xl text-cream leading-tight">
            Two circles generate
            <br />
            <span className="text-gradient-gold italic">a straight line.</span>
          </h2>
          <p className="mt-6 text-cream-dim max-w-2xl mx-auto text-sm sm:text-base">
            This is the Tusi Couple — the device al-Ṭūsī stated in 1247 CE and
            Copernicus copied in 1543. A point on a circle rolling inside a
            circle of twice the diameter traces a straight line. Adjust the
            speed. Watch the linear motion emerge from two circular motions.
            This is the mathematics Copernicus used to eliminate the Ptolemaic equant.
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-3 gap-6 items-stretch">
          {/* Canvas */}
          <div className="lg:col-span-2 glass-card rounded-2xl overflow-hidden relative">
            <div className="px-4 py-3 border-b border-gold/15 flex items-center justify-between">
              <span className="text-[10px] font-mono uppercase tracking-widest text-gold/70">
                Tusi Couple · al-Ṭūsī, 1247 CE
              </span>
              <span className="font-mono text-xs text-gold">
                P(t) = (2r cos t, 0)
              </span>
            </div>
            <div ref={containerRef} className="relative w-full" style={{ height: 'min(60vh, 440px)' }}>
              <canvas ref={canvasRef} className="absolute inset-0 w-full h-full" />
            </div>
            <div className="p-4 border-t border-gold/15">
              <label className="text-[10px] font-mono uppercase tracking-widest text-cream-dim block mb-2">
                Rotation speed: {speed.toFixed(4)}
              </label>
              <input
                type="range"
                min="0.001"
                max="0.04"
                step="0.001"
                value={speed}
                onChange={(e) => {
                  setSpeed(Number(e.target.value));
                  setHasInteracted(true);
                }}
                className="w-full accent-[#d4af37]"
              />
              <div className="flex items-center justify-between mt-3">
                <button
                  onClick={() => setShowTrail(!showTrail)}
                  className={`px-3 py-1.5 rounded-lg text-[10px] font-mono uppercase tracking-wider transition-all ${
                    showTrail
                      ? 'bg-gold/20 border border-gold/60 text-gold'
                      : 'border border-cream-dim/15 text-cream-dim hover:border-gold/30'
                  }`}
                >
                  {showTrail ? '✓ Trail visible' : 'Trail hidden'}
                </button>
                <p className="text-[10px] text-cream-dim/60 italic">
                  {hasInteracted
                    ? 'Notice: P traces a perfect horizontal line — the diameter of the large circle.'
                    : 'Adjust the speed to see the couple in action.'}
                </p>
              </div>
            </div>
          </div>

          {/* Readouts */}
          <div className="flex flex-col gap-4">
            {/* Historical provenance */}
            <div className="glass-card-gold rounded-2xl overflow-hidden">
              <div className="relative h-28 overflow-hidden">
                <Image
                  src="/images/sdam-astro/tusi-nature-1.jpg"
                  alt="Authentic astronomical diagram from a Maragheh-era manuscript showing geometric constructions"
                  fill
                  sizes="(max-width: 1024px) 100vw, 33vw"
                  className="object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-r from-cosmos-deep/95 via-cosmos/50 to-transparent" />
                <div className="absolute inset-0 flex flex-col justify-center p-4">
                  <p className="text-[9px] font-mono uppercase tracking-widest text-gold/80 mb-1">
                    Copied by Copernicus
                  </p>
                  <h3 className="font-display text-base text-cream italic leading-tight">
                    De Revolutionibus, 1543
                  </h3>
                  <p className="text-cream-dim text-[10px] mt-0.5">
                    296 years after al-Ṭūsī
                  </p>
                </div>
              </div>
            </div>

            {/* What it proves */}
            <div className="glass-card-gold rounded-2xl p-5">
              <p className="text-[10px] font-mono uppercase tracking-widest text-gold/70 mb-2">
                The mathematical result
              </p>
              <p className="text-cream text-sm leading-relaxed mb-3">
                A point on a circle of radius <span className="text-gold font-mono">r</span> rolling
                inside a circle of radius <span className="text-gold font-mono">2r</span> traces
                a straight line.
              </p>
              <div className="rounded-lg bg-cosmos-deep/60 border border-gold/20 p-3">
                <p className="font-mono text-sm text-gold-bright text-center">
                  P(t) = (2r cos t, 0)
                </p>
              </div>
              <p className="text-cream-dim text-[11px] mt-3 leading-relaxed">
                This eliminates the need for Ptolemy&apos;s equant — the
                &ldquo;fudge factor&rdquo; that had troubled astronomers for
                1,000 years. Copernicus used the same device for the same
                purpose.
              </p>
            </div>

            {/* The context */}
            <div className="glass-card rounded-2xl p-5 flex-1">
              <p className="text-[10px] font-mono uppercase tracking-widest text-gold/70 mb-2">
                Why it matters
              </p>
              <p className="text-cream/85 text-xs leading-relaxed">
                Before the Tusi Couple, astronomers (including Ptolemy) needed
                an &ldquo;equant&rdquo; — a point not at the center of the
                orbit — to make planetary models match observations. The equant
                was mathematically ugly. Al-Ṭūsī&apos;s device replaced it with
                pure circular motions. Copernicus, 296 years later, did the same
                thing with the same device. The diagrams in his De Revolutionibus
                are geometrically identical to al-Ṭūsī&apos;s.
              </p>
              {hasInteracted && (
                <motion.p
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="text-gold text-xs mt-3 pt-3 border-t border-gold/15 italic"
                >
                  The point P never leaves the horizontal line. Linear motion
                  from circular motion. Al-Ṭūsī&apos;s 1247 insight.
                </motion.p>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
