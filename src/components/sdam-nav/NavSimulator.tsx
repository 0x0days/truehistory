'use client';
import { useEffect, useRef, useState } from 'react';
import { motion } from 'framer-motion';
import Image from 'next/image';

/**
 * Interactive Astrolabe Simulator.
 * User rotates the astrolabe (drag or slider). The canvas shows:
 * - The astrolabe face with angular graduations
 * - The rete (star pointer) rotating
 * - The altitude measurement (the angle of a star above the horizon)
 * - The computed latitude
 *
 * This is the instrument Mariam al-Asturlābiyya perfected —
 * the GPS of the medieval world.
 */
export default function NavSimulator() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const [starAngle, setStarAngle] = useState(45); // degrees above horizon
  const [hasInteracted, setHasInteracted] = useState(false);
  const angleRef = useRef(45);

  // The latitude = star altitude (simplified for Polaris)
  const latitude = starAngle;

  useEffect(() => {
    angleRef.current = starAngle;
  }, [starAngle]);

  useEffect(() => {
    const canvas = canvasRef.current;
    const container = containerRef.current;
    if (!canvas || !container) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;
    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    let w = 0, h = 0;
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
      const angle = angleRef.current;
      ctx.clearRect(0, 0, w, h);
      const cx = w / 2;
      const cy = h / 2;
      const R = Math.min(w, h) * 0.38;

      // Outer ring
      ctx.strokeStyle = 'rgba(212, 175, 55, 0.5)';
      ctx.lineWidth = 2;
      ctx.beginPath();
      ctx.arc(cx, cy, R + 8, 0, Math.PI * 2);
      ctx.stroke();

      // Main face
      const faceGrad = ctx.createRadialGradient(cx, cy, 0, cx, cy, R);
      faceGrad.addColorStop(0, '#1a1a2a');
      faceGrad.addColorStop(0.7, '#0f0f18');
      faceGrad.addColorStop(1, '#0a0a14');
      ctx.fillStyle = faceGrad;
      ctx.beginPath();
      ctx.arc(cx, cy, R, 0, Math.PI * 2);
      ctx.fill();
      ctx.strokeStyle = '#d4af37';
      ctx.lineWidth = 2.5;
      ctx.stroke();

      // Angular graduations
      for (let i = 0; i < 72; i++) {
        const a = (i * 5 * Math.PI) / 180;
        const isMajor = i % 6 === 0;
        const r1 = R - (isMajor ? 14 : 8);
        const r2 = R - 2;
        ctx.strokeStyle = isMajor ? 'rgba(212, 175, 55, 0.7)' : 'rgba(212, 175, 55, 0.3)';
        ctx.lineWidth = isMajor ? 1.5 : 0.8;
        ctx.beginPath();
        ctx.moveTo(cx + Math.cos(a) * r1, cy + Math.sin(a) * r1);
        ctx.lineTo(cx + Math.cos(a) * r2, cy + Math.sin(a) * r2);
        ctx.stroke();
      }

      // Degree labels at cardinal points
      ctx.font = '10px ui-monospace, monospace';
      ctx.fillStyle = 'rgba(212, 175, 55, 0.6)';
      ctx.textAlign = 'center';
      ctx.textBaseline = 'middle';
      ctx.fillText('0°', cx, cy - R - 16);
      ctx.fillText('90°', cx + R + 16, cy);
      ctx.fillText('180°', cx, cy + R + 16);
      ctx.fillText('270°', cx - R - 16, cy);

      // Horizon line (horizontal through center)
      ctx.strokeStyle = 'rgba(74, 200, 184, 0.4)';
      ctx.lineWidth = 1;
      ctx.setLineDash([4, 4]);
      ctx.beginPath();
      ctx.moveTo(cx - R * 0.85, cy);
      ctx.lineTo(cx + R * 0.85, cy);
      ctx.stroke();
      ctx.setLineDash([]);
      ctx.fillStyle = 'rgba(74, 200, 184, 0.6)';
      ctx.font = '9px ui-monospace, monospace';
      ctx.textAlign = 'left';
      ctx.fillText('HORIZON', cx - R * 0.85, cy - 8);

      // The star (at the measured altitude angle, measured from horizon up)
      const starRad = ((90 - angle) * Math.PI) / 180; // 0° altitude = horizon (right), 90° = zenith (top)
      // Actually let's measure from the top (zenith): 0° at top = 90° altitude, 90° at right = 0° altitude
      const starX = cx + Math.cos(starRad) * R * 0.7;
      const starY = cy - Math.sin(starRad) * R * 0.7;

      // Line from center to star (the alidade line)
      ctx.strokeStyle = 'rgba(244, 208, 98, 0.5)';
      ctx.lineWidth = 1.5;
      ctx.setLineDash([3, 4]);
      ctx.beginPath();
      ctx.moveTo(cx, cy);
      ctx.lineTo(starX, starY);
      ctx.stroke();
      ctx.setLineDash([]);

      // The star
      const starGlow = ctx.createRadialGradient(starX, starY, 0, starX, starY, 16);
      starGlow.addColorStop(0, 'rgba(244, 208, 98, 0.8)');
      starGlow.addColorStop(1, 'rgba(244, 208, 98, 0)');
      ctx.fillStyle = starGlow;
      ctx.beginPath();
      ctx.arc(starX, starY, 16, 0, Math.PI * 2);
      ctx.fill();
      ctx.fillStyle = '#fff7d6';
      ctx.beginPath();
      ctx.arc(starX, starY, 4, 0, Math.PI * 2);
      ctx.fill();

      // Altitude arc (from horizon to star)
      ctx.strokeStyle = 'rgba(244, 208, 98, 0.6)';
      ctx.lineWidth = 2;
      ctx.beginPath();
      ctx.arc(cx, cy, R * 0.35, 0, -starRad, true);
      ctx.stroke();

      // Altitude label
      ctx.fillStyle = '#f4d062';
      ctx.font = 'bold 11px ui-monospace, monospace';
      ctx.textAlign = 'center';
      const labelAngle = -starRad / 2;
      const labelR = R * 0.45;
      ctx.fillText(`${angle.toFixed(0)}°`, cx + Math.cos(labelAngle) * labelR, cy + Math.sin(labelAngle) * labelR);

      // Center pivot
      ctx.fillStyle = '#d4af37';
      ctx.beginPath();
      ctx.arc(cx, cy, 6, 0, Math.PI * 2);
      ctx.fill();
      ctx.fillStyle = '#0a0a14';
      ctx.beginPath();
      ctx.arc(cx, cy, 3, 0, Math.PI * 2);
      ctx.fill();

      // Labels
      ctx.font = '10px ui-monospace, monospace';
      ctx.fillStyle = '#a39c87';
      ctx.textAlign = 'left';
      ctx.fillText('ASTROLABE · MARIAM AL-ASTURLĀBIYYA · c. 944 CE', 12, 18);
      ctx.fillStyle = '#f4d062';
      ctx.textAlign = 'right';
      ctx.fillText(`STAR ALTITUDE: ${angle.toFixed(0)}°`, w - 12, 18);
      ctx.fillStyle = 'rgba(74, 200, 184, 0.8)';
      ctx.fillText(`LATITUDE: ${latitude.toFixed(0)}° N`, w - 12, 34);

      raf = requestAnimationFrame(render);
    };
    render();
    return () => { cancelAnimationFrame(raf); window.removeEventListener('resize', resize); };
  }, [latitude]);

  return (
    <section id="simulator" className="relative min-h-screen flex flex-col items-center justify-center px-6 py-24 overflow-hidden">
      <div className="absolute inset-0 opacity-[0.025] pointer-events-none" style={{ backgroundImage: 'linear-gradient(rgba(212,175,55,1) 1px, transparent 1px), linear-gradient(90deg, rgba(212,175,55,1) 1px, transparent 1px)', backgroundSize: '80px 80px' }} />
      <div className="max-w-6xl w-full relative z-10">
        <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, margin: "0px 0px 15% 0px" }} transition={{ duration: 0.8 }} className="text-center mb-10">
          <p className="text-[10px] font-mono tracking-[0.4em] uppercase text-gold/70 mb-4">Chapter 07 — Use the Astrolabe</p>
          <h2 className="font-display text-4xl sm:text-6xl md:text-7xl text-cream leading-tight">Measure the star.<br /><span className="text-gradient-gold italic">Find your latitude.</span></h2>
          <p className="mt-6 text-cream-dim max-w-2xl mx-auto text-sm sm:text-base">This is the instrument Mariam al-Asturlābiyya perfected — the GPS of the medieval world. Drag the slider to set the altitude of Polaris (the pole star). The astrolabe computes your latitude. This is how Ibn Mājid navigated the Indian Ocean — and how Vasco da Gama&apos;s crew reached India in 1497.</p>
        </motion.div>
        <div className="grid lg:grid-cols-3 gap-6 items-stretch">
          <div className="lg:col-span-2 glass-card rounded-2xl overflow-hidden relative">
            <div className="px-4 py-3 border-b border-gold/15 flex items-center justify-between">
              <span className="text-[10px] font-mono uppercase tracking-widest text-gold/70">Astrolabe · latitude = star altitude</span>
              <span className="font-mono text-xs text-gold">φ = h</span>
            </div>
            <div ref={containerRef} className="relative w-full" style={{ height: 'min(60vh, 440px)' }}>
              <canvas ref={canvasRef} className="absolute inset-0 w-full h-full" />
            </div>
            <div className="p-4 border-t border-gold/15">
              <label className="text-[10px] font-mono uppercase tracking-widest text-cream-dim block mb-2">Star altitude (Polaris): {starAngle.toFixed(0)}°</label>
              <input type="range" min="0" max="90" step="1" value={starAngle} onChange={(e) => { setStarAngle(Number(e.target.value)); setHasInteracted(true); }} className="w-full accent-[#d4af37]" />
              <div className="flex justify-between text-[9px] font-mono text-cream-dim/60 mt-1">
                <span>0° (Equator)</span><span>23° (Tropic)</span><span>45° (Mid-latitude)</span><span>90° (Pole)</span>
              </div>
            </div>
          </div>
          <div className="flex flex-col gap-4">
            <div className="glass-card-gold rounded-2xl overflow-hidden">
              <div className="relative h-28 overflow-hidden">
                <Image src="/images/sdam-nav/astrolabe-caravanserai-1.jpg" alt="Authentic medieval Islamic astrolabe with Arabic inscriptions" fill sizes="(max-width: 1024px) 100vw, 33vw" className="object-cover" />
                <div className="absolute inset-0 bg-gradient-to-r from-cosmos-deep/95 via-cosmos/50 to-transparent" />
                <div className="absolute inset-0 flex flex-col justify-center p-4">
                  <p className="text-[9px] font-mono uppercase tracking-widest text-gold/80 mb-1">Mariam&apos;s instrument</p>
                  <h3 className="font-display text-base text-cream italic leading-tight">The Astrolabe</h3>
                  <p className="text-cream-dim text-[10px] mt-0.5">Aleppo · c. 944 CE</p>
                </div>
              </div>
            </div>
            <div className="glass-card-gold rounded-2xl p-5">
              <p className="text-[10px] font-mono uppercase tracking-widest text-gold/70 mb-2">Your latitude</p>
              <motion.span key={Math.round(latitude)} initial={{ scale: 0.9, opacity: 0.6 }} animate={{ scale: 1, opacity: 1 }} transition={{ duration: 0.2 }} className="font-display text-5xl text-gradient-gold block mb-2">{latitude.toFixed(0)}° N</motion.span>
              <div className="h-1.5 rounded-full bg-cream-dim/15 overflow-hidden">
                <motion.div className="h-full gradient-gold" animate={{ width: `${(latitude / 90) * 100}%` }} transition={{ duration: 0.15 }} />
              </div>
              <p className="text-cream-dim text-[11px] mt-2 italic">Measured from Polaris altitude</p>
            </div>
            <div className="glass-card rounded-2xl p-5 flex-1">
              <p className="text-[10px] font-mono uppercase tracking-widest text-gold/70 mb-2">The Principle</p>
              <p className="font-display text-base text-cream italic leading-snug mb-3">&ldquo;The navigator must know the altitude of the pole star, corrected for precession.&rdquo;</p>
              <p className="text-cream-dim text-xs">— Ibn Mājid, <em>Kitāb al-Fawāʾid</em>, c. 1462 CE</p>
              {hasInteracted && (
                <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="text-gold text-xs mt-3 pt-3 border-t border-gold/15 italic">
                  {latitude < 23.5 ? 'Equatorial latitude. The pole star is low on the horizon. Arab navigators used the kamal here — a board held at arm\'s length.'
                    : latitude < 45 ? 'Tropical to mid-latitude. The astrolabe gives a clean reading. This is the latitude band of the Indian Ocean trade routes Ibn Mājid mapped.'
                    : latitude < 70 ? 'High northern latitude. The astrolabe excels here — this is the band Columbus and the European navigators used, with instruments inherited from Mariam\'s tradition.'
                    : 'Near-polar latitude. The pole star is nearly overhead. Few medieval navigators sailed this far north — but the astrolabe still works.'}
                </motion.p>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
