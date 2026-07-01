'use client';

import { useEffect, useRef, useState } from 'react';
import { motion } from 'framer-motion';
import Image from 'next/image';

/**
 * Interactive Calculus Simulator.
 * User selects a function (x², x³, x⁴ — Ibn al-Haytham's case) and a
 * rectangle count. The canvas draws the Riemann sum. The exact integral
 * is computed alongside, showing the sum converging to the integral as
 * n → ∞. This is the EXACT method Ibn al-Haytham used c. 1000 CE.
 */
export default function CalculusSimulator() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const [func, setFunc] = useState<'x2' | 'x3' | 'x4'>('x4');
  const [n, setN] = useState(8);
  const [hasInteracted, setHasInteracted] = useState(false);

  // Compute integral and Riemann sum
  const funcDef = {
    x2: { f: (x: number) => x * x, F: (x: number) => (x * x * x) / 3, label: 'x²', integral: 'x³/3' },
    x3: { f: (x: number) => x * x * x, F: (x: number) => (x * x * x * x) / 4, label: 'x³', integral: 'x⁴/4' },
    x4: { f: (x: number) => x * x * x * x, F: (x: number) => (x * x * x * x * x) / 5, label: 'x⁴', integral: 'x⁵/5' },
  };
  const xMax = 1;
  const exactIntegral = funcDef[func].F(xMax) - funcDef[func].F(0);
  const dx = xMax / n;
  let riemannSum = 0;
  for (let i = 0; i < n; i++) {
    const xMid = (i + 0.5) * dx;
    riemannSum += funcDef[func].f(xMid) * dx;
  }
  const error = Math.abs(exactIntegral - riemannSum);

  useEffect(() => {
    const canvas = canvasRef.current;
    const container = containerRef.current;
    if (!canvas || !container) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;
    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    const w = container.clientWidth;
    const h = container.clientHeight;
    canvas.width = w * dpr;
    canvas.height = h * dpr;
    canvas.style.width = `${w}px`;
    canvas.style.height = `${h}px`;
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);

    const padding = 36;
    const plotW = w - padding * 2;
    const plotH = h - padding - 20;
    const yMax = funcDef[func].f(xMax);

    const xToPx = (x: number) => padding + (x / xMax) * plotW;
    const yToPx = (y: number) => padding + plotH - (y / yMax) * plotH;

    ctx.clearRect(0, 0, w, h);

    // Background grid
    ctx.strokeStyle = 'rgba(212, 175, 55, 0.06)';
    ctx.lineWidth = 1;
    for (let i = 0; i <= 10; i++) {
      const x = padding + (i / 10) * plotW;
      ctx.beginPath();
      ctx.moveTo(x, padding);
      ctx.lineTo(x, padding + plotH);
      ctx.stroke();
    }
    for (let i = 0; i <= 5; i++) {
      const y = padding + (i / 5) * plotH;
      ctx.beginPath();
      ctx.moveTo(padding, y);
      ctx.lineTo(padding + plotW, y);
      ctx.stroke();
    }

    // Axes
    ctx.strokeStyle = 'rgba(244, 234, 213, 0.4)';
    ctx.lineWidth = 1.5;
    ctx.beginPath();
    ctx.moveTo(padding, padding + plotH);
    ctx.lineTo(padding + plotW, padding + plotH);
    ctx.stroke();
    ctx.beginPath();
    ctx.moveTo(padding, padding);
    ctx.lineTo(padding, padding + plotH);
    ctx.stroke();

    // The Riemann rectangles
    for (let i = 0; i < n; i++) {
      const xLeft = i * dx;
      const xMid = (i + 0.5) * dx;
      const xRight = (i + 1) * dx;
      const yMid = funcDef[func].f(xMid);

      const px1 = xToPx(xLeft);
      const px2 = xToPx(xRight);
      const pyTop = yToPx(yMid);
      const pyBottom = yToPx(0);

      // Fill
      const grad = ctx.createLinearGradient(0, pyTop, 0, pyBottom);
      grad.addColorStop(0, 'rgba(244, 208, 98, 0.35)');
      grad.addColorStop(1, 'rgba(212, 175, 55, 0.1)');
      ctx.fillStyle = grad;
      ctx.fillRect(px1, pyTop, Math.max(0.5, px2 - px1), pyBottom - pyTop);
      // Border
      ctx.strokeStyle = 'rgba(212, 175, 55, 0.5)';
      ctx.lineWidth = 0.8;
      ctx.strokeRect(px1, pyTop, Math.max(0.5, px2 - px1), pyBottom - pyTop);
    }

    // The exact curve
    ctx.strokeStyle = '#f4d062';
    ctx.lineWidth = 2.5;
    ctx.shadowColor = '#f4d062';
    ctx.shadowBlur = 8;
    ctx.beginPath();
    for (let i = 0; i <= 100; i++) {
      const x = (i / 100) * xMax;
      const y = funcDef[func].f(x);
      const px = xToPx(x);
      const py = yToPx(y);
      if (i === 0) ctx.moveTo(px, py);
      else ctx.lineTo(px, py);
    }
    ctx.stroke();
    ctx.shadowBlur = 0;

    // Labels
    ctx.font = '11px ui-monospace, monospace';
    ctx.fillStyle = '#f4d062';
    ctx.textAlign = 'left';
    ctx.fillText(`y = ${funcDef[func].label}`, padding + plotW - 50, padding + 16);
    ctx.fillStyle = '#a39c87';
    ctx.textAlign = 'center';
    ctx.fillText('0', padding, padding + plotH + 14);
    ctx.fillText('1', padding + plotW, padding + plotH + 14);
    ctx.textAlign = 'right';
    ctx.fillText(yMax.toFixed(2), padding - 6, padding + 8);
    ctx.fillText('0', padding - 6, padding + plotH + 4);
  }, [func, n]);

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
          viewport={{ once: true, margin: "0px 0px 50% 0px" }}
          transition={{ duration: 0.8 }}
          className="text-center mb-10"
        >
          <p className="text-[10px] font-mono tracking-[0.4em] uppercase text-gold/70 mb-4">
            Chapter 07 — Compute the Integral
          </p>
          <h2 className="font-display text-4xl sm:text-6xl md:text-7xl text-cream leading-tight">
            Drag the rectangle count.
            <br />
            <span className="text-gradient-gold italic">Watch the limit converge.</span>
          </h2>
          <p className="mt-6 text-cream-dim max-w-2xl mx-auto text-sm sm:text-base">
            This is Ibn al-Haytham&apos;s method, c. 1000 CE. Pick a function
            (his was x⁴ — the paraboloid volume problem). Increase the rectangle
            count. Watch the Riemann sum converge to the exact integral. This
            IS the limit of a sum — what Newton would call fluxions 666 years
            later.
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-3 gap-6 items-stretch">
          {/* Canvas */}
          <div className="lg:col-span-2 glass-card rounded-2xl overflow-hidden relative">
            <div className="px-4 py-3 border-b border-gold/15 flex items-center justify-between">
              <span className="text-[10px] font-mono uppercase tracking-widest text-gold/70">
                ∫₀¹ {funcDef[func].label} dx  ·  Riemann sum (midpoint)
              </span>
              <span className="font-mono text-xs text-gold">
                n = {n}
              </span>
            </div>
            <div ref={containerRef} className="relative w-full" style={{ height: 'min(60vh, 440px)' }}>
              <canvas ref={canvasRef} className="absolute inset-0 w-full h-full" />
            </div>
            {/* Slider */}
            <div className="p-4 border-t border-gold/15">
              <label className="text-[10px] font-mono uppercase tracking-widest text-cream-dim block mb-2">
                Number of rectangles (n): {n}
              </label>
              <input
                type="range"
                min="2"
                max="200"
                step="1"
                value={n}
                onChange={(e) => {
                  setN(Number(e.target.value));
                  setHasInteracted(true);
                }}
                className="w-full accent-[#d4af37]"
              />
              <div className="flex justify-between text-[9px] font-mono text-cream-dim/60 mt-1">
                <span>2</span>
                <span>50</span>
                <span>100</span>
                <span>200 → ∞</span>
              </div>
            </div>
          </div>

          {/* Readouts */}
          <div className="flex flex-col gap-4">
            {/* Historical provenance */}
            <div className="glass-card-gold rounded-2xl overflow-hidden">
              <div className="relative h-28 overflow-hidden">
                <Image
                  src="/images/sdam-calculus/haytham-math-renaissance.jpg"
                  alt="Authentic medieval Arabic mathematics manuscript page"
                  fill
                  sizes="(max-width: 1024px) 100vw, 33vw"
                  className="object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-r from-cosmos-deep/95 via-cosmos/50 to-transparent" />
                <div className="absolute inset-0 flex flex-col justify-center p-4">
                  <p className="text-[9px] font-mono uppercase tracking-widest text-gold/80 mb-1">
                    Ibn al-Haytham&apos;s method
                  </p>
                  <h3 className="font-display text-base text-cream italic leading-tight">
                    Limit of a sum
                  </h3>
                  <p className="text-cream-dim text-[10px] mt-0.5">
                    c. 1000 CE · Cairo
                  </p>
                </div>
              </div>
            </div>

            {/* Riemann sum readout */}
            <div className="glass-card-gold rounded-2xl p-5">
              <p className="text-[10px] font-mono uppercase tracking-widest text-gold/70 mb-2">
                Riemann sum (approximation)
              </p>
              <div className="flex items-baseline gap-2 mb-3">
                <motion.span
                  key={`r-${Math.round(riemannSum * 1000)}`}
                  initial={{ scale: 0.95, opacity: 0.6 }}
                  animate={{ scale: 1, opacity: 1 }}
                  transition={{ duration: 0.2 }}
                  className="font-display text-3xl text-cream"
                >
                  {riemannSum.toFixed(6)}
                </motion.span>
              </div>
              <div className="h-1.5 rounded-full bg-cream-dim/15 overflow-hidden">
                <motion.div
                  className="h-full bg-gold/70"
                  animate={{ width: `${(riemannSum / exactIntegral) * 100}%` }}
                  transition={{ duration: 0.15 }}
                />
              </div>
            </div>

            {/* Exact integral readout */}
            <div className="glass-card rounded-2xl p-5">
              <p className="text-[10px] font-mono uppercase tracking-widest text-cream-dim mb-2">
                Exact integral (the limit)
              </p>
              <div className="flex items-baseline gap-2 mb-2">
                <span className="font-display text-3xl text-gradient-gold">
                  {exactIntegral.toFixed(6)}
                </span>
              </div>
              <p className="text-cream-dim text-xs font-mono">
                = {funcDef[func].integral} |₀¹
              </p>
            </div>

            {/* Error */}
            <div className="glass-card rounded-2xl p-5 flex-1">
              <p className="text-[10px] font-mono uppercase tracking-widest text-gold/70 mb-2">
                Error |sum − integral|
              </p>
              <motion.span
                key={`e-${Math.round(error * 1e8)}`}
                initial={{ scale: 0.95 }}
                animate={{ scale: 1 }}
                transition={{ duration: 0.2 }}
                className="font-display text-2xl text-cream block mb-2"
              >
                {error < 1e-9 ? '< 10⁻⁹' : error.toExponential(2)}
              </motion.span>
              {hasInteracted && (
                <motion.p
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="text-cream text-xs leading-relaxed"
                >
                  {n < 20
                    ? 'Few rectangles → coarse approximation. Ibn al-Haytham worked with discrete sums like this.'
                    : n < 80
                    ? 'As n grows, the rectangles shrink. The sum approaches the integral.'
                    : n < 150
                    ? 'The rectangles are nearly invisible. The sum is nearly exact.'
                    : 'At n → ∞, the sum equals the integral. This is the limit — what Newton would formalize as the integral in 1687.'}
                </motion.p>
              )}
            </div>
          </div>
        </div>

        {/* Function selector */}
        <div className="mt-6 flex items-center justify-center gap-2">
          <span className="text-[10px] font-mono uppercase tracking-widest text-cream-dim mr-2">
            Function:
          </span>
          {(['x2', 'x3', 'x4'] as const).map((f) => (
            <button
              key={f}
              onClick={() => setFunc(f)}
              className={`px-4 py-2 rounded-lg text-xs font-mono uppercase tracking-wider transition-all ${
                func === f
                  ? 'bg-gold/20 border border-gold/60 text-gold'
                  : 'border border-cream-dim/15 text-cream-dim hover:border-gold/30'
              }`}
            >
              y = {funcDef[f].label}
            </button>
          ))}
          <span className="text-[10px] text-cream-dim/70 italic ml-3">
            (Ibn al-Haytham&apos;s case was x⁴ — the paraboloid volume.)
          </span>
        </div>
      </div>
    </section>
  );
}
