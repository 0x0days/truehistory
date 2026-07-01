'use client';

import { useEffect, useRef, useState } from 'react';
import { motion } from 'framer-motion';
import Image from 'next/image';

/**
 * Interactive Gravity Simulator.
 * User drags an object closer to / farther from the Earth's center.
 * The "weight" reading updates in real-time using an inverse-square falloff.
 * This is the conceptual core of al-Khāzini's claim, made tangible.
 */
export default function GravitySimulator() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const objectPosRef = useRef<{ x: number; y: number }>({ x: 0, y: 0 });
  const draggingRef = useRef(false);
  const [weight, setWeight] = useState(100);
  const [distance, setDistance] = useState(1);
  const [hasInteracted, setHasInteracted] = useState(false);

  // earth center in canvas pixels (set during resize)
  const earthRef = useRef<{ cx: number; cy: number; r: number }>({
    cx: 0,
    cy: 0,
    r: 0,
  });
  const objRadiusRef = useRef(14);
  const animRef = useRef(0);
  const [hintVisible, setHintVisible] = useState(true);

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
      const cx = w / 2;
      const cy = h / 2;
      const r = Math.min(w, h) * 0.18;
      earthRef.current = { cx, cy, r };
      // Initialize object position to a sensible default if not set
      if (objectPosRef.current.x === 0 && objectPosRef.current.y === 0) {
        objectPosRef.current = { x: cx + r * 2.6, y: cy - r * 0.3 };
      }
    };

    resize();
    window.addEventListener('resize', resize);

    const getPointer = (e: PointerEvent | React.PointerEvent) => {
      const rect = canvas.getBoundingClientRect();
      return {
        x: (e.clientX - rect.left),
        y: (e.clientY - rect.top),
      };
    };

    const onPointerDown = (e: PointerEvent) => {
      const p = getPointer(e);
      const op = objectPosRef.current;
      const dx = p.x - op.x;
      const dy = p.y - op.y;
      if (Math.hypot(dx, dy) < 30) {
        draggingRef.current = true;
        canvas.setPointerCapture(e.pointerId);
        setHasInteracted(true);
        setHintVisible(false);
      }
    };
    const onPointerMove = (e: PointerEvent) => {
      if (!draggingRef.current) return;
      const p = getPointer(e);
      const { cx, cy, r } = earthRef.current;
      const minDist = r + objRadiusRef.current + 6;
      const maxDist = Math.min(w, h) * 0.46;
      const d = Math.hypot(p.x - cx, p.y - cy);
      let clamped = d;
      if (clamped < minDist) clamped = minDist;
      if (clamped > maxDist) clamped = maxDist;
      const angle = Math.atan2(p.y - cy, p.x - cx);
      objectPosRef.current = {
        x: cx + Math.cos(angle) * clamped,
        y: cy + Math.sin(angle) * clamped,
      };
    };
    const onPointerUp = (e: PointerEvent) => {
      draggingRef.current = false;
      try {
        canvas.releasePointerCapture(e.pointerId);
      } catch {}
    };

    canvas.addEventListener('pointerdown', onPointerDown);
    canvas.addEventListener('pointermove', onPointerMove);
    canvas.addEventListener('pointerup', onPointerUp);
    canvas.addEventListener('pointercancel', onPointerUp);

    // Render loop
    let t = 0;
    const render = () => {
      t += 1;
      ctx.clearRect(0, 0, w, h);

      const { cx, cy, r } = earthRef.current;
      const op = objectPosRef.current;
      const dx = op.x - cx;
      const dy = op.y - cy;
      const dist = Math.hypot(dx, dy);
      const normDist = Math.max(0.001, (dist - r) / (Math.min(w, h) * 0.46 - r));
      // Weight = 100 / (1 + normDist)^2 — inverse-square-ish falloff so it feels right
      const wValue = 100 / Math.pow(1 + normDist * 2.2, 2);
      setWeight(wValue);
      setDistance(normDist);

      // Draw gravity field rings (concentric, subtle)
      for (let i = 1; i <= 6; i++) {
        const rr = r + i * (Math.min(w, h) * 0.46 - r) / 6;
        ctx.beginPath();
        ctx.arc(cx, cy, rr, 0, Math.PI * 2);
        ctx.strokeStyle = `rgba(212, 175, 55, ${0.08 - i * 0.008})`;
        ctx.lineWidth = 1;
        ctx.setLineDash([2, 6]);
        ctx.stroke();
        ctx.setLineDash([]);
      }

      // Draw radial pull lines emanating from earth
      const lineCount = 36;
      for (let i = 0; i < lineCount; i++) {
        const a = (i / lineCount) * Math.PI * 2 + t * 0.001;
        const x1 = cx + Math.cos(a) * (r + 4);
        const y1 = cy + Math.sin(a) * (r + 4);
        const x2 = cx + Math.cos(a) * (r + 18 + Math.sin(t * 0.04 + i) * 4);
        const y2 = cy + Math.sin(a) * (r + 18 + Math.sin(t * 0.04 + i) * 4);
        ctx.beginPath();
        ctx.moveTo(x1, y1);
        ctx.lineTo(x2, y2);
        ctx.strokeStyle = `rgba(212, 175, 55, ${0.18 + Math.sin(t * 0.04 + i) * 0.08})`;
        ctx.lineWidth = 1;
        ctx.stroke();
      }

      // Draw earth (glowing sphere)
      const earthGrad = ctx.createRadialGradient(
        cx - r * 0.3,
        cy - r * 0.3,
        0,
        cx,
        cy,
        r
      );
      earthGrad.addColorStop(0, '#3a4a6a');
      earthGrad.addColorStop(0.5, '#1a2a4a');
      earthGrad.addColorStop(1, '#050509');
      ctx.beginPath();
      ctx.arc(cx, cy, r, 0, Math.PI * 2);
      ctx.fillStyle = earthGrad;
      ctx.fill();
      // Earth glow
      const glowGrad = ctx.createRadialGradient(cx, cy, r, cx, cy, r * 2.2);
      glowGrad.addColorStop(0, 'rgba(212, 175, 55, 0.18)');
      glowGrad.addColorStop(1, 'rgba(212, 175, 55, 0)');
      ctx.beginPath();
      ctx.arc(cx, cy, r * 2.2, 0, Math.PI * 2);
      ctx.fillStyle = glowGrad;
      ctx.fill();
      // Center marker (crosshair)
      ctx.strokeStyle = 'rgba(244, 208, 98, 0.6)';
      ctx.lineWidth = 1;
      ctx.beginPath();
      ctx.moveTo(cx - 8, cy);
      ctx.lineTo(cx + 8, cy);
      ctx.moveTo(cx, cy - 8);
      ctx.lineTo(cx, cy + 8);
      ctx.stroke();

      // Earth label
      ctx.font = '10px ui-monospace, monospace';
      ctx.fillStyle = 'rgba(244, 234, 213, 0.5)';
      ctx.textAlign = 'center';
      ctx.fillText("EARTH'S CENTER", cx, cy + r + 22);

      // Pull vector from object toward earth
      ctx.beginPath();
      ctx.moveTo(op.x, op.y);
      ctx.lineTo(cx + (dx / dist) * (r + 2), cy + (dy / dist) * (r + 2));
      ctx.strokeStyle = 'rgba(244, 208, 98, 0.4)';
      ctx.lineWidth = 1;
      ctx.setLineDash([4, 4]);
      ctx.stroke();
      ctx.setLineDash([]);

      // Draw draggable object (pulsing if heavy)
      const pulse = 1 + Math.sin(t * 0.1) * 0.05 * (wValue / 100);
      const objR = objRadiusRef.current * pulse;
      // outer glow
      const objGlow = ctx.createRadialGradient(op.x, op.y, 0, op.x, op.y, objR * 3);
      objGlow.addColorStop(0, `rgba(244, 208, 98, ${0.4 * (wValue / 100)})`);
      objGlow.addColorStop(1, 'rgba(244, 208, 98, 0)');
      ctx.beginPath();
      ctx.arc(op.x, op.y, objR * 3, 0, Math.PI * 2);
      ctx.fillStyle = objGlow;
      ctx.fill();
      // body
      const objGrad = ctx.createRadialGradient(
        op.x - objR * 0.3,
        op.y - objR * 0.3,
        0,
        op.x,
        op.y,
        objR
      );
      objGrad.addColorStop(0, '#fff7d6');
      objGrad.addColorStop(0.5, '#f4d062');
      objGrad.addColorStop(1, '#8a7028');
      ctx.beginPath();
      ctx.arc(op.x, op.y, objR, 0, Math.PI * 2);
      ctx.fillStyle = objGrad;
      ctx.fill();
      ctx.strokeStyle = draggingRef.current ? '#fff7d6' : 'rgba(244, 208, 98, 0.7)';
      ctx.lineWidth = 2;
      ctx.stroke();

      animRef.current = requestAnimationFrame(render);
    };
    render();

    return () => {
      cancelAnimationFrame(animRef.current);
      window.removeEventListener('resize', resize);
      canvas.removeEventListener('pointerdown', onPointerDown);
      canvas.removeEventListener('pointermove', onPointerMove);
      canvas.removeEventListener('pointerup', onPointerUp);
      canvas.removeEventListener('pointercancel', onPointerUp);
    };
  }, []);

  const weightColor =
    weight > 70 ? '#f4d062' : weight > 35 ? '#d4af37' : '#a39c87';

  return (
    <section
      id="simulator"
      className="relative min-h-screen flex flex-col items-center justify-center px-6 py-24"
    >
      <div className="max-w-6xl w-full">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "0px 0px 50% 0px" }}
          transition={{ duration: 0.8 }}
          className="text-center mb-10"
        >
          <p className="text-[10px] font-mono tracking-[0.4em] uppercase text-gold/70 mb-4">
            Chapter 07 — Feel the Discovery
          </p>
          <h2 className="font-display text-4xl sm:text-6xl md:text-7xl text-cream leading-tight">
            Drag the body.
            <br />
            <span className="text-gradient-gold italic">Watch its weight change.</span>
          </h2>
          <p className="mt-6 text-cream-dim max-w-2xl mx-auto text-sm sm:text-base">
            This is the principle al-Khāzini stated in 1121: an object&apos;s
            weight is not fixed — it varies with distance from the Earth&apos;s
            center. Drag the gold body closer and farther to feel it.
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-3 gap-6 items-stretch">
          {/* Canvas */}
          <div className="lg:col-span-2 glass-card rounded-2xl overflow-hidden relative">
            <div
              ref={containerRef}
              className="relative w-full"
              style={{ height: 'min(70vh, 520px)' }}
            >
              <canvas
                ref={canvasRef}
                className="absolute inset-0 touch-none cursor-grab active:cursor-grabbing"
              />
              {/* Hint overlay */}
              {hintVisible && (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.5 }}
                  className="absolute top-4 left-4 right-4 flex items-center gap-2 pointer-events-none"
                >
                  <div className="glass-card-gold rounded-full px-3 py-1.5 flex items-center gap-2">
                    <motion.span
                      animate={{ x: [0, 6, 0] }}
                      transition={{ repeat: Infinity, duration: 1.4 }}
                      className="text-gold"
                    >
                      ←
                    </motion.span>
                    <span className="text-cream text-xs font-mono uppercase tracking-wider">
                      drag the gold body
                    </span>
                  </div>
                </motion.div>
              )}
            </div>
          </div>

          {/* Live readouts */}
          <div className="flex flex-col gap-4">
            {/* Historical instrument — provenance */}
            <div className="glass-card-gold rounded-2xl overflow-hidden">
              <div className="relative h-32 overflow-hidden">
                <Image
                  src="/images/sdam-real/mizan-diagram-1.jpg"
                  alt="Authentic manuscript page from Kitab Mizan al-Hikma showing the balance of wisdom apparatus with geometric diagrams and Arabic text"
                  fill
                  sizes="(max-width: 1024px) 100vw, 33vw"
                  className="object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-r from-cosmos-deep/95 via-cosmos/50 to-transparent" />
                <div className="absolute inset-0 flex flex-col justify-center p-4">
                  <p className="text-[9px] font-mono uppercase tracking-widest text-gold/80 mb-1">
                    The original instrument
                  </p>
                  <h3 className="font-display text-base text-cream italic leading-tight">
                    Mizan al-Hikma
                  </h3>
                  <p className="text-cream-dim text-[10px] mt-0.5">
                    Authentic manuscript · 1121 CE · al-Khāzini
                  </p>
                </div>
              </div>
            </div>

            <div className="glass-card-gold rounded-2xl p-6">
              <p className="text-[10px] font-mono uppercase tracking-widest text-gold/70 mb-2">
                Weight
              </p>
              <div className="flex items-baseline gap-2 mb-3">
                <motion.span
                  key={Math.round(weight)}
                  initial={{ scale: 0.95, opacity: 0.6 }}
                  animate={{ scale: 1, opacity: 1 }}
                  transition={{ duration: 0.2 }}
                  className="font-display text-5xl"
                  style={{ color: weightColor }}
                >
                  {weight.toFixed(1)}
                </motion.span>
                <span className="text-cream-dim text-lg font-display">
                  / 100
                </span>
              </div>
              <div className="h-1.5 rounded-full bg-cream-dim/15 overflow-hidden">
                <motion.div
                  className="h-full"
                  style={{ background: weightColor }}
                  animate={{ width: `${weight}%` }}
                  transition={{ duration: 0.15 }}
                />
              </div>
              <p className="text-cream-dim text-[11px] mt-2 italic">
                Relative to surface value
              </p>
            </div>

            <div className="glass-card rounded-2xl p-6">
              <p className="text-[10px] font-mono uppercase tracking-widest text-cream-dim mb-2">
                Distance from center
              </p>
              <div className="flex items-baseline gap-2 mb-3">
                <span className="font-display text-4xl text-cream">
                  {(1 + distance * 3).toFixed(2)}
                </span>
                <span className="text-cream-dim text-sm">× Earth radii</span>
              </div>
              <div className="h-1.5 rounded-full bg-cream-dim/15 overflow-hidden">
                <motion.div
                  className="h-full bg-gold/70"
                  animate={{ width: `${distance * 100}%` }}
                  transition={{ duration: 0.15 }}
                />
              </div>
            </div>

            <div className="glass-card rounded-2xl p-5 flex-1">
              <p className="text-[10px] font-mono uppercase tracking-widest text-gold/70 mb-2">
                The Principle
              </p>
              <p className="font-display text-lg text-cream italic leading-snug mb-3">
                &ldquo;The gravity of a body varies according to its distance
                from the center of the earth.&rdquo;
              </p>
              <p className="text-cream-dim text-xs">
                — al-Khāzini, <em>Mīzān al-ḥikma</em>, 1121 CE
              </p>
              {hasInteracted && (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="mt-4 pt-4 border-t border-gold/15"
                >
                  <p className="text-cream text-xs leading-relaxed">
                    {weight > 85
                      ? 'Near the surface, weight is at maximum. This is what we feel every day.'
                      : weight > 50
                      ? 'A few radii out, weight drops noticeably. The pull weakens with the square of distance.'
                      : weight > 20
                      ? 'Far from Earth, weight becomes a whisper of its surface value.'
                      : 'At extreme distances, gravity still pulls — but barely. Yet it never reaches zero. This universality is what Newton would later formalize.'}
                  </p>
                </motion.div>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
