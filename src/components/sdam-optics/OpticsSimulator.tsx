'use client';

import { useEffect, useRef, useState } from 'react';
import { motion } from 'framer-motion';
import Image from 'next/image';

/**
 * Interactive Optics Simulator.
 * User drags the incoming light ray's angle. The ray hits a glass surface
 * and splits into a reflected ray (angle of incidence = angle of reflection)
 * and a refracted ray (governed by Snell's law: sin(θ₁)/sin(θ₂) = n₂/n₁).
 * Live readouts show all three angles and the refractive indices.
 */
export default function OpticsSimulator() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const draggingRef = useRef(false);
  const incidentAngleRef = useRef(35); // degrees from normal
  const [hintVisible, setHintVisible] = useState(true);

  // State for readouts
  const [thetaI, setThetaI] = useState(35);
  const [thetaR, setThetaR] = useState(35);
  const [thetaT, setThetaT] = useState(22.5);
  const n1 = 1.000; // air
  // Material presets the user can switch between
  const [material, setMaterial] = useState<'glass' | 'water' | 'diamond'>('glass');
  const MATERIAL_N: Record<typeof material, number> = {
    glass: 1.500,
    water: 1.333,
    diamond: 2.417,
  };
  const n2 = MATERIAL_N[material];
  const [hasInteracted, setHasInteracted] = useState(false);

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

    // The interface is a horizontal line at h/2. Air above (n1), glass below (n2).
    // The incident ray comes from upper-left, hits center, then reflects (upper-right) and refracts (lower-right).
    const getCenter = () => ({ cx: w / 2, cy: h / 2 });

    // Pointer handling — drag angle of incident ray
    const onPointerDown = (e: PointerEvent) => {
      const rect = canvas.getBoundingClientRect();
      const px = e.clientX - rect.left;
      const py = e.clientY - rect.top;
      // Check if pointer is near the incident ray's source point (upper-left area)
      const { cx, cy } = getCenter();
      const sourceX = cx - 200;
      const sourceY = cy - 200;
      if (Math.hypot(px - sourceX, py - sourceY) < 50) {
        draggingRef.current = true;
        canvas.setPointerCapture(e.pointerId);
        setHasInteracted(true);
        setHintVisible(false);
        updateAngleFromPointer(px, py);
      }
    };
    const onPointerMove = (e: PointerEvent) => {
      if (!draggingRef.current) return;
      const rect = canvas.getBoundingClientRect();
      const px = e.clientX - rect.left;
      const py = e.clientY - rect.top;
      updateAngleFromPointer(px, py);
    };
    const onPointerUp = (e: PointerEvent) => {
      draggingRef.current = false;
      try {
        canvas.releasePointerCapture(e.pointerId);
      } catch {}
    };

    const updateAngleFromPointer = (px: number, py: number) => {
      const { cx, cy } = getCenter();
      // Angle from the normal (pointing up) at the interface
      // Pointer is somewhere upper-left. The incident angle = angle between (pointer → center) and the upward normal.
      const dx = cx - px;
      const dy = cy - py;
      // Angle from vertical (upward normal)
      let angle = Math.atan2(dx, dy) * (180 / Math.PI);
      // Clamp to 5–80 degrees
      angle = Math.max(5, Math.min(80, angle));
      incidentAngleRef.current = angle;
    };

    canvas.addEventListener('pointerdown', onPointerDown);
    canvas.addEventListener('pointermove', onPointerMove);
    canvas.addEventListener('pointerup', onPointerUp);
    canvas.addEventListener('pointercancel', onPointerUp);

    let raf = 0;
    let t = 0;
    const render = () => {
      t += 1;
      ctx.clearRect(0, 0, w, h);
      const { cx, cy } = getCenter();
      const thetaI_rad = (incidentAngleRef.current * Math.PI) / 180;
      const thetaR_rad = thetaI_rad; // law of reflection

      // Snell's law: n1 * sin(thetaI) = n2 * sin(thetaT)
      const sinThetaT = (n1 * Math.sin(thetaI_rad)) / n2;
      let thetaT_rad: number;
      let totalInternal = false;
      if (Math.abs(sinThetaT) > 1) {
        totalInternal = true;
        thetaT_rad = 0;
      } else {
        thetaT_rad = Math.asin(sinThetaT);
      }

      // Update readouts (throttled by frame)
      const newThetaI = incidentAngleRef.current;
      const newThetaR = incidentAngleRef.current;
      const newThetaT = totalInternal ? 90 : (thetaT_rad * 180) / Math.PI;
      setThetaI(newThetaI);
      setThetaR(newThetaR);
      setThetaT(newThetaT);

      // Draw the two media with subtle gradient
      // Air (top)
      const airGrad = ctx.createLinearGradient(0, 0, 0, cy);
      airGrad.addColorStop(0, 'rgba(10, 10, 20, 0.4)');
      airGrad.addColorStop(1, 'rgba(20, 30, 50, 0.6)');
      ctx.fillStyle = airGrad;
      ctx.fillRect(0, 0, w, cy);
      // Glass (bottom)
      const glassGrad = ctx.createLinearGradient(0, cy, 0, h);
      glassGrad.addColorStop(0, 'rgba(26, 77, 74, 0.4)');
      glassGrad.addColorStop(1, 'rgba(10, 30, 28, 0.6)');
      ctx.fillStyle = glassGrad;
      ctx.fillRect(0, cy, w, h - cy);

      // Labels for media
      ctx.font = '10px ui-monospace, monospace';
      ctx.fillStyle = 'rgba(244, 234, 213, 0.5)';
      ctx.textAlign = 'left';
      ctx.fillText(`AIR · n₁ = ${n1.toFixed(3)}`, 12, 20);
      ctx.fillStyle = 'rgba(212, 175, 55, 0.7)';
      ctx.fillText(`${material.toUpperCase()} · n₂ = ${n2.toFixed(3)}`, 12, cy + 20);

      // Interface line
      ctx.strokeStyle = 'rgba(212, 175, 55, 0.6)';
      ctx.lineWidth = 1.5;
      ctx.beginPath();
      ctx.moveTo(0, cy);
      ctx.lineTo(w, cy);
      ctx.stroke();

      // Normal (dashed vertical line through center)
      ctx.strokeStyle = 'rgba(244, 234, 213, 0.3)';
      ctx.lineWidth = 1;
      ctx.setLineDash([4, 4]);
      ctx.beginPath();
      ctx.moveTo(cx, 30);
      ctx.lineTo(cx, h - 30);
      ctx.stroke();
      ctx.setLineDash([]);
      ctx.fillStyle = 'rgba(244, 234, 213, 0.4)';
      ctx.font = '9px ui-monospace, monospace';
      ctx.textAlign = 'center';
      ctx.fillText('NORMAL', cx, 22);

      // Geometry: incident ray comes from upper-left at angle thetaI from normal
      const rayLen = Math.min(w, h) * 0.4;
      const incidentStart = {
        x: cx - Math.sin(thetaI_rad) * rayLen,
        y: cy - Math.cos(thetaI_rad) * rayLen,
      };
      // Reflected ray goes upper-right at angle thetaR from normal (mirror)
      const reflectedEnd = {
        x: cx + Math.sin(thetaR_rad) * rayLen,
        y: cy - Math.cos(thetaR_rad) * rayLen,
      };
      // Refracted ray goes lower-right at angle thetaT from downward normal
      const refractedEnd = {
        x: cx + Math.sin(thetaT_rad) * rayLen * 0.85,
        y: cy + Math.cos(thetaT_rad) * rayLen * 0.85,
      };

      // Animated dashed flow effect on the rays
      const flowOffset = (t * 0.5) % 12;

      // Incident ray (gold, bright)
      ctx.strokeStyle = '#f4d062';
      ctx.lineWidth = 2.5;
      ctx.shadowColor = '#f4d062';
      ctx.shadowBlur = 8;
      ctx.beginPath();
      ctx.moveTo(incidentStart.x, incidentStart.y);
      ctx.lineTo(cx, cy);
      ctx.stroke();
      ctx.shadowBlur = 0;
      // Flow arrows on incident ray
      drawFlowArrows(ctx, incidentStart.x, incidentStart.y, cx, cy, flowOffset, '#f4d062');

      // Reflected ray (gold, dimmer)
      ctx.strokeStyle = 'rgba(244, 208, 98, 0.6)';
      ctx.lineWidth = 2;
      ctx.setLineDash([6, 4]);
      ctx.lineDashOffset = -flowOffset;
      ctx.beginPath();
      ctx.moveTo(cx, cy);
      ctx.lineTo(reflectedEnd.x, reflectedEnd.y);
      ctx.stroke();
      ctx.setLineDash([]);
      // Refracted ray (teal, bright) — only if not total internal reflection
      if (!totalInternal) {
        ctx.strokeStyle = '#4ac8b8';
        ctx.lineWidth = 2.5;
        ctx.shadowColor = '#4ac8b8';
        ctx.shadowBlur = 6;
        ctx.beginPath();
        ctx.moveTo(cx, cy);
        ctx.lineTo(refractedEnd.x, refractedEnd.y);
        ctx.stroke();
        ctx.shadowBlur = 0;
        drawFlowArrows(ctx, cx, cy, refractedEnd.x, refractedEnd.y, flowOffset, '#4ac8b8');
      } else {
        // Total internal reflection — make reflected ray fully bright
        ctx.strokeStyle = '#f4d062';
        ctx.lineWidth = 2.5;
        ctx.shadowColor = '#f4d062';
        ctx.shadowBlur = 8;
        ctx.beginPath();
        ctx.moveTo(cx, cy);
        ctx.lineTo(reflectedEnd.x, reflectedEnd.y);
        ctx.stroke();
        ctx.shadowBlur = 0;
        // Label
        ctx.fillStyle = '#b94545';
        ctx.font = 'bold 11px ui-monospace, monospace';
        ctx.textAlign = 'center';
        ctx.fillText('TOTAL INTERNAL REFLECTION', cx, cy + 50);
      }

      // Angle arcs (small arcs at the incidence point)
      drawAngleArc(ctx, cx, cy, 30, -Math.PI / 2, -Math.PI / 2 + thetaI_rad, '#f4d062', `θᵢ=${newThetaI.toFixed(1)}°`);
      drawAngleArc(ctx, cx, cy, 36, -Math.PI / 2, -Math.PI / 2 - thetaR_rad, 'rgba(244, 208, 98, 0.7)', `θᵣ=${newThetaR.toFixed(1)}°`);
      if (!totalInternal) {
        drawAngleArc(ctx, cx, cy, 30, Math.PI / 2, Math.PI / 2 - thetaT_rad, '#4ac8b8', `θₜ=${newThetaT.toFixed(1)}°`);
      }

      // Draggable source point (the light origin)
      const sourcePulse = 1 + Math.sin(t * 0.08) * 0.15;
      const sourceR = 10 * sourcePulse;
      const sourceGlow = ctx.createRadialGradient(incidentStart.x, incidentStart.y, 0, incidentStart.x, incidentStart.y, sourceR * 3);
      sourceGlow.addColorStop(0, 'rgba(244, 208, 98, 0.6)');
      sourceGlow.addColorStop(1, 'rgba(244, 208, 98, 0)');
      ctx.beginPath();
      ctx.arc(incidentStart.x, incidentStart.y, sourceR * 3, 0, Math.PI * 2);
      ctx.fillStyle = sourceGlow;
      ctx.fill();
      ctx.beginPath();
      ctx.arc(incidentStart.x, incidentStart.y, sourceR, 0, Math.PI * 2);
      ctx.fillStyle = '#fff7d6';
      ctx.fill();
      ctx.strokeStyle = draggingRef.current ? '#fff7d6' : 'rgba(244, 208, 98, 0.8)';
      ctx.lineWidth = 2;
      ctx.stroke();
      // Drag hint ring
      if (!hasInteracted) {
        ctx.strokeStyle = `rgba(244, 208, 98, ${0.3 + Math.sin(t * 0.05) * 0.2})`;
        ctx.lineWidth = 1.5;
        ctx.beginPath();
        ctx.arc(incidentStart.x, incidentStart.y, sourceR * 2.5, 0, Math.PI * 2);
        ctx.stroke();
      }

      raf = requestAnimationFrame(render);
    };

    render();

    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener('resize', resize);
      canvas.removeEventListener('pointerdown', onPointerDown);
      canvas.removeEventListener('pointermove', onPointerMove);
      canvas.removeEventListener('pointerup', onPointerUp);
      canvas.removeEventListener('pointercancel', onPointerUp);
    };
  }, [n1, n2, material, hasInteracted]);

  return (
    <section
      id="simulator"
      className="relative min-h-screen flex flex-col items-center justify-center px-6 py-24"
    >
      <div className="max-w-6xl w-full">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "0px 0px 15% 0px" }}
          transition={{ duration: 0.8 }}
          className="text-center mb-10"
        >
          <p className="text-[10px] font-mono tracking-[0.4em] uppercase text-gold/70 mb-4">
            Chapter 07 — Feel the Discovery
          </p>
          <h2 className="font-display text-4xl sm:text-6xl md:text-7xl text-cream leading-tight">
            Drag the light ray.
            <br />
            <span className="text-gradient-gold italic">Watch Ibn al-Haytham&apos;s laws work.</span>
          </h2>
          <p className="mt-6 text-cream-dim max-w-2xl mx-auto text-sm sm:text-base">
            Drag the gold light source. The ray hits the surface and splits
            into a reflected ray (gold) and a refracted ray (teal) — obeying
            the laws Ibn al-Haytham proved in 1011 and Ibn Sahl formalized in
            984. Switch materials to feel how the refractive index bends light.
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
                      drag the light source
                    </span>
                  </div>
                </motion.div>
              )}
            </div>
          </div>

          {/* Live readouts */}
          <div className="flex flex-col gap-4">
            {/* Historical instrument provenance */}
            <div className="glass-card-gold rounded-2xl overflow-hidden">
              <div className="relative h-28 overflow-hidden">
                <Image
                  src="/images/sdam-optics/camera-obscura-1.jpg"
                  alt="Authentic historical illustration of a camera obscura apparatus"
                  fill
                  sizes="(max-width: 1024px) 100vw, 33vw"
                  className="object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-r from-cosmos-deep/95 via-cosmos/50 to-transparent" />
                <div className="absolute inset-0 flex flex-col justify-center p-4">
                  <p className="text-[9px] font-mono uppercase tracking-widest text-gold/80 mb-1">
                    Ibn al-Haytham&apos;s apparatus
                  </p>
                  <h3 className="font-display text-base text-cream italic leading-tight">
                    Camera Obscura
                  </h3>
                  <p className="text-cream-dim text-[10px] mt-0.5">
                    1011 CE · the ancestor of all cameras
                  </p>
                </div>
              </div>
            </div>

            {/* Live angle readouts */}
            <div className="glass-card-gold rounded-2xl p-5">
              <p className="text-[10px] font-mono uppercase tracking-widest text-gold/70 mb-3">
                Live angles
              </p>
              <div className="space-y-2.5">
                <AngleRow label="θᵢ · incidence" value={thetaI} color="#f4d062" />
                <AngleRow label="θᵣ · reflection" value={thetaR} color="rgba(244, 208, 98, 0.8)" />
                <AngleRow label="θₜ · refraction" value={thetaT} color="#4ac8b8" />
              </div>
              <p className="text-cream-dim text-[10px] mt-3 italic">
                Ibn al-Haytham: θᵢ = θᵣ · Ibn Sahl: sin(θᵢ)/sin(θₜ) = n₂/n₁
              </p>
            </div>

            {/* Material selector */}
            <div className="glass-card rounded-2xl p-5">
              <p className="text-[10px] font-mono uppercase tracking-widest text-cream-dim mb-3">
                Refractive medium
              </p>
              <div className="grid grid-cols-3 gap-2">
                {(['glass', 'water', 'diamond'] as const).map((m) => (
                  <button
                    key={m}
                    onClick={() => setMaterial(m)}
                    className={`px-2 py-2 rounded-lg text-xs font-mono uppercase tracking-wider transition-all ${
                      material === m
                        ? 'bg-gold/20 border border-gold/60 text-gold'
                        : 'border border-cream-dim/15 text-cream-dim hover:border-gold/30'
                    }`}
                  >
                    {m}
                    <div className="text-[9px] opacity-70 mt-0.5">n={MATERIAL_N[m]}</div>
                  </button>
                ))}
              </div>
            </div>

            {/* Context */}
            <div className="glass-card rounded-2xl p-5 flex-1">
              <p className="text-[10px] font-mono uppercase tracking-widest text-gold/70 mb-2">
                The Principle
              </p>
              <p className="font-display text-base text-cream italic leading-snug mb-3">
                &ldquo;Light travels in straight lines. The angle of incidence
                equals the angle of reflection.&rdquo;
              </p>
              <p className="text-cream-dim text-xs">
                — Ibn al-Haytham, <em>Kitāb al-Manāẓir</em>, c. 1011 CE
              </p>
              {hasInteracted && (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="mt-3 pt-3 border-t border-gold/15"
                >
                  <p className="text-cream text-xs leading-relaxed">
                    {material === 'diamond'
                      ? 'In diamond, refraction is extreme — this is why a cut diamond sparkles so much. Ibn Sahl\'s 984 sine law predicts it precisely.'
                      : material === 'water'
                      ? 'Water bends light modestly — this is why a stick appears broken at the waterline. Ibn al-Haytham studied this exact effect.'
                      : 'Glass is the workhorse of optics — lenses, prisms, camera obscura windows. Ibn al-Haytham\'s apparatus used it extensively.'}
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

function AngleRow({ label, value, color }: { label: string; value: number; color: string }) {
  return (
    <div className="flex items-center justify-between">
      <span className="text-cream-dim text-xs font-mono">{label}</span>
      <div className="flex items-center gap-2">
        <motion.span
          key={Math.round(value * 10)}
          initial={{ scale: 0.9, opacity: 0.6 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.15 }}
          className="font-display text-lg"
          style={{ color }}
        >
          {value.toFixed(1)}°
        </motion.span>
      </div>
    </div>
  );
}

// Helper: draw small flow arrowheads on a ray
function drawFlowArrows(ctx: CanvasRenderingContext2D, x1: number, y1: number, x2: number, y2: number, offset: number, color: string) {
  const dx = x2 - x1;
  const dy = y2 - y1;
  const len = Math.hypot(dx, dy);
  if (len === 0) return;
  const numArrows = 3;
  for (let i = 0; i < numArrows; i++) {
    const t = ((i / numArrows) + (offset / len)) % 1;
    const ax = x1 + dx * t;
    const ay = y1 + dy * t;
    const aLen = 6;
    const aAngle = Math.atan2(dy, dx);
    ctx.fillStyle = color;
    ctx.beginPath();
    ctx.moveTo(ax, ay);
    ctx.lineTo(ax - aLen * Math.cos(aAngle - 0.4), ay - aLen * Math.sin(aAngle - 0.4));
    ctx.lineTo(ax - aLen * Math.cos(aAngle + 0.4), ay - aLen * Math.sin(aAngle + 0.4));
    ctx.closePath();
    ctx.fill();
  }
}

// Helper: draw an arc with a label at the angle
function drawAngleArc(ctx: CanvasRenderingContext2D, cx: number, cy: number, r: number, startAngle: number, endAngle: number, color: string, label: string) {
  ctx.strokeStyle = color;
  ctx.lineWidth = 1.5;
  ctx.beginPath();
  ctx.arc(cx, cy, r, Math.min(startAngle, endAngle), Math.max(startAngle, endAngle));
  ctx.stroke();
  const midAngle = (startAngle + endAngle) / 2;
  const labelR = r + 14;
  const lx = cx + Math.cos(midAngle) * labelR;
  const ly = cy + Math.sin(midAngle) * labelR;
  ctx.fillStyle = color;
  ctx.font = '10px ui-monospace, monospace';
  ctx.textAlign = 'center';
  ctx.textBaseline = 'middle';
  ctx.fillText(label, lx, ly);
}
