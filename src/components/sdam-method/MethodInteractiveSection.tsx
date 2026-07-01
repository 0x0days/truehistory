'use client';

import { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Eye, HelpCircle, Lightbulb, FlaskConical, CheckCircle2, Repeat, Share2, ChevronRight, RotateCcw } from 'lucide-react';

type StepIdx = 0 | 1 | 2 | 3 | 4 | 5 | 6;

const STEPS = [
  {
    name: 'Observation',
    arabic: 'المُشاهدة',
    icon: Eye,
    instruction: 'Observe the phenomenon below.',
  },
  {
    name: 'Problem',
    arabic: 'التَّقْدير',
    icon: HelpCircle,
    instruction: 'State the question precisely.',
  },
  {
    name: 'Hypothesis',
    arabic: 'الاعْتِقاد',
    icon: Lightbulb,
    instruction: 'Choose a tentative explanation.',
  },
  {
    name: 'Experiment',
    arabic: 'التَّجْرِبة',
    icon: FlaskConical,
    instruction: 'Vary the water depth and observe.',
  },
  {
    name: 'Verification',
    arabic: 'التَّحْقيق',
    icon: CheckCircle2,
    instruction: 'Compare results to the hypothesis.',
  },
  {
    name: 'Repetition',
    arabic: 'التَّكْرار',
    icon: Repeat,
    instruction: 'Run it again with different parameters.',
  },
  {
    name: 'Publication',
    arabic: 'التَّصْنيف',
    icon: Share2,
    instruction: 'Record and share your findings.',
  },
];

const HYPOTHESES = [
  {
    id: 'A',
    text: 'The coin physically rises when water is added.',
    correct: false,
    feedback: 'Tested and refuted. The coin does not move — only the image does.',
  },
  {
    id: 'B',
    text: 'The water bends the light coming from the coin.',
    correct: true,
    feedback: 'Confirmed. The light bends at the water surface. This is REFRACTION.',
  },
  {
    id: 'C',
    text: 'The water tricks the eye into seeing the coin higher.',
    correct: false,
    feedback: 'Partial — but where does the "trick" come from? The hypothesis is vague. We need the mechanism. (This is what Euclid and Ptolemy would have said — the eye is fooled. Ibn al-Haytham rejected this kind of explanation as untestable.)',
  },
];

export default function MethodInteractiveSection() {
  const [step, setStep] = useState<StepIdx>(0);
  const [hypothesis, setHypothesis] = useState<string | null>(null);
  const [waterDepth, setWaterDepth] = useState(60);
  const [dataPoints, setDataPoints] = useState<{ depth: number; apparent: number }[]>([]);
  const [finalVerdict, setFinalVerdict] = useState<string | null>(null);

  const canvasRef = useRef<HTMLCanvasElement>(null);

  // Draw the experiment (cup with water + coin)
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;
    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    const w = canvas.clientWidth;
    const h = canvas.clientHeight;
    canvas.width = w * dpr;
    canvas.height = h * dpr;
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);

    ctx.clearRect(0, 0, w, h);

    // Cup outline
    const cupLeft = w * 0.25;
    const cupRight = w * 0.75;
    const cupTop = h * 0.15;
    const cupBottom = h * 0.85;
    const cupInset = 20;

    // Cup back/walls
    ctx.strokeStyle = 'rgba(212, 175, 55, 0.5)';
    ctx.lineWidth = 2;
    ctx.beginPath();
    ctx.moveTo(cupLeft, cupTop);
    ctx.lineTo(cupLeft + cupInset, cupBottom);
    ctx.lineTo(cupRight - cupInset, cupBottom);
    ctx.lineTo(cupRight, cupTop);
    ctx.stroke();

    // Water level
    const waterLevelY = cupTop + (cupBottom - cupTop) * (1 - waterDepth / 100);

    if (waterDepth > 0) {
      // Water fill
      const waterGrad = ctx.createLinearGradient(0, waterLevelY, 0, cupBottom);
      waterGrad.addColorStop(0, 'rgba(74, 200, 184, 0.25)');
      waterGrad.addColorStop(1, 'rgba(26, 77, 74, 0.45)');
      ctx.fillStyle = waterGrad;
      ctx.beginPath();
      ctx.moveTo(cupLeft + (cupInset * (waterLevelY - cupTop)) / (cupBottom - cupTop), waterLevelY);
      ctx.lineTo(cupRight - (cupInset * (waterLevelY - cupTop)) / (cupBottom - cupTop), waterLevelY);
      ctx.lineTo(cupRight - cupInset, cupBottom);
      ctx.lineTo(cupLeft + cupInset, cupBottom);
      ctx.closePath();
      ctx.fill();
      // Water surface line
      ctx.strokeStyle = 'rgba(74, 200, 184, 0.8)';
      ctx.lineWidth = 1.5;
      ctx.beginPath();
      ctx.moveTo(cupLeft + (cupInset * (waterLevelY - cupTop)) / (cupBottom - cupTop), waterLevelY);
      ctx.lineTo(cupRight - (cupInset * (waterLevelY - cupTop)) / (cupBottom - cupTop), waterLevelY);
      ctx.stroke();
    }

    // The actual coin position (real, at the bottom)
    const coinRealY = cupBottom - 14;
    const coinX = (cupLeft + cupRight) / 2;
    // Apparent coin position (shifted up by refraction; proportional to water depth)
    const apparentShift = waterDepth > 0 ? (waterDepth / 100) * (cupBottom - cupTop) * 0.28 : 0;
    const coinApparentY = coinRealY - apparentShift;

    // Draw the real coin (dimmer if water is present, because the eye sees the apparent one)
    if (waterDepth > 0) {
      // Eye-line from viewer (top-right) to apparent coin position
      ctx.strokeStyle = 'rgba(244, 208, 98, 0.35)';
      ctx.lineWidth = 1;
      ctx.setLineDash([4, 4]);
      ctx.beginPath();
      ctx.moveTo(w - 10, 30);
      ctx.lineTo(coinX + 30, coinApparentY);
      ctx.stroke();
      ctx.setLineDash([]);

      // Apparent coin (bright)
      ctx.fillStyle = '#f4d062';
      ctx.beginPath();
      ctx.ellipse(coinX, coinApparentY, 24, 8, 0, 0, Math.PI * 2);
      ctx.fill();
      ctx.strokeStyle = '#d4af37';
      ctx.lineWidth = 1.5;
      ctx.stroke();
      // Label
      ctx.font = '10px ui-monospace, monospace';
      ctx.fillStyle = '#f4d062';
      ctx.textAlign = 'center';
      ctx.fillText('APPARENT POSITION', coinX, coinApparentY - 14);
    }

    // Real coin
    ctx.fillStyle = waterDepth > 0 ? 'rgba(244, 208, 98, 0.35)' : '#f4d062';
    ctx.beginPath();
    ctx.ellipse(coinX, coinRealY, 24, 8, 0, 0, Math.PI * 2);
    ctx.fill();
    if (waterDepth === 0) {
      ctx.strokeStyle = '#d4af37';
      ctx.lineWidth = 1.5;
      ctx.stroke();
    }
    ctx.font = '10px ui-monospace, monospace';
    ctx.fillStyle = waterDepth > 0 ? 'rgba(244, 208, 98, 0.5)' : '#f4d062';
    ctx.textAlign = 'center';
    ctx.fillText('REAL POSITION', coinX, coinRealY + 20);

    // Eye (top right)
    ctx.fillStyle = '#f4ead5';
    ctx.beginPath();
    ctx.arc(w - 10, 30, 6, 0, Math.PI * 2);
    ctx.fill();
    ctx.font = '9px ui-monospace, monospace';
    ctx.fillStyle = '#a39c87';
    ctx.textAlign = 'right';
    ctx.fillText('OBSERVER', w - 10, 50);

    // Water depth label
    if (waterDepth > 0) {
      ctx.font = '10px ui-monospace, monospace';
      ctx.fillStyle = '#4ac8b8';
      ctx.textAlign = 'left';
      ctx.fillText(`WATER DEPTH: ${waterDepth}%`, 10, h - 10);
    } else {
      ctx.font = '10px ui-monospace, monospace';
      ctx.fillStyle = '#a39c87';
      ctx.textAlign = 'left';
      ctx.fillText('NO WATER (CONTROL)', 10, h - 10);
    }
  }, [waterDepth, step]);

  // Record a data point when the user changes water depth during the experiment steps
  const recordDataPoint = (depth: number) => {
    if ((step === 3 || step === 5) && depth > 0) {
      const apparentShift = (depth / 100) * 0.28 * 100; // normalized
      setDataPoints((prev) => {
        const exists = prev.find((p) => p.depth === depth);
        if (exists) return prev;
        return [...prev, { depth, apparent: apparentShift }].sort((a, b) => a.depth - b.depth);
      });
    }
  };

  const handleSliderChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const v = Number(e.target.value);
    setWaterDepth(v);
    recordDataPoint(v);
  };

  const next = () => setStep((s) => Math.min(6, (s + 1) as StepIdx));
  const prev = () => setStep((s) => Math.max(0, (s - 1) as StepIdx));
  const restart = () => {
    setStep(0);
    setHypothesis(null);
    setWaterDepth(60);
    setDataPoints([]);
    setFinalVerdict(null);
  };

  const selectedHypothesis = HYPOTHESES.find((h) => h.id === hypothesis);

  return (
    <section
      id="simulator"
      className="relative min-h-screen flex flex-col items-center justify-center px-6 py-24 overflow-hidden"
    >
      {/* Subtle grid pattern */}
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
            Chapter 07 — Run the Method Yourself
          </p>
          <h2 className="font-display text-4xl sm:text-6xl md:text-7xl text-cream leading-tight">
            Conduct an experiment
            <br />
            <span className="text-gradient-gold italic">as Ibn al-Haytham did.</span>
          </h2>
          <p className="mt-6 text-cream-dim max-w-2xl mx-auto text-sm sm:text-base">
            Walk through his seven steps on a real experiment — the coin that
            appears to rise when water is added. Observe. State the problem.
            Hypothesize. Experiment. Verify. Repeat. Publish. This is the
            method — and you will use it.
          </p>
        </motion.div>

        {/* Step progress indicator */}
        <div className="flex items-center justify-between max-w-4xl mx-auto mb-8 px-2">
          {STEPS.map((s, i) => {
            const Icon = s.icon;
            const isActive = i === step;
            const isDone = i < step;
            return (
              <div key={i} className="flex items-center flex-1 last:flex-none">
                <div className="flex flex-col items-center gap-1">
                  <div
                    className={`w-9 h-9 sm:w-11 sm:h-11 rounded-full flex items-center justify-center border-2 transition-all ${
                      isActive
                        ? 'bg-gold/20 border-gold glow-gold scale-110'
                        : isDone
                        ? 'bg-gold/10 border-gold/60'
                        : 'bg-cosmos border-cream-dim/30'
                    }`}
                  >
                    <Icon
                      className={`w-4 h-4 sm:w-5 sm:h-5 ${
                        isActive ? 'text-gold' : isDone ? 'text-gold/70' : 'text-cream-dim/50'
                      }`}
                    />
                  </div>
                  <span
                    className={`text-[9px] sm:text-[10px] font-mono uppercase tracking-wider hidden sm:block ${
                      isActive ? 'text-gold' : isDone ? 'text-gold/60' : 'text-cream-dim/40'
                    }`}
                  >
                    {s.name}
                  </span>
                </div>
                {i < STEPS.length - 1 && (
                  <div
                    className={`flex-1 h-px mx-1 sm:mx-2 transition-all ${
                      isDone ? 'bg-gold/60' : 'bg-cream-dim/20'
                    }`}
                  />
                )}
              </div>
            );
          })}
        </div>

        {/* Main panel */}
        <div className="grid lg:grid-cols-5 gap-6">
          {/* Canvas — the experiment */}
          <div className="lg:col-span-3 glass-card rounded-2xl overflow-hidden">
            <div className="px-4 py-3 border-b border-gold/15 flex items-center justify-between">
              <span className="text-[10px] font-mono uppercase tracking-widest text-gold/70">
                Step {step + 1} · {STEPS[step].name}
              </span>
              <span className="font-arabic text-sm text-gold" dir="rtl">
                {STEPS[step].arabic}
              </span>
            </div>
            <div
              className="relative w-full"
              style={{ height: 'min(60vh, 440px)' }}
            >
              <canvas ref={canvasRef} className="absolute inset-0 w-full h-full" />
            </div>
            {/* Slider for Step 4 (Experiment) and Step 6 (Repetition) */}
            {(step === 3 || step === 5) && (
              <div className="p-4 border-t border-gold/15">
                <label className="text-[10px] font-mono uppercase tracking-widest text-cream-dim block mb-2">
                  Vary water depth: {waterDepth}%
                </label>
                <input
                  type="range"
                  min="0"
                  max="100"
                  value={waterDepth}
                  onChange={handleSliderChange}
                  className="w-full accent-[#d4af37]"
                />
                <p className="text-[10px] text-cream-dim/70 mt-1 italic">
                  Drag the slider. Watch the apparent position of the coin shift.
                </p>
              </div>
            )}
          </div>

          {/* Step content + controls */}
          <div className="lg:col-span-2 flex flex-col gap-4">
            <div className="glass-card-gold rounded-2xl p-5 flex-1">
              <p className="text-[10px] font-mono uppercase tracking-widest text-gold/70 mb-1">
                {STEPS[step].instruction}
              </p>

              <AnimatePresence mode="wait">
                {/* Step 1: Observation */}
                {step === 0 && (
                  <motion.div
                    key="obs"
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    className="mt-3"
                  >
                    <p className="font-display text-lg text-cream italic leading-snug mb-3">
                      A coin rests at the bottom of an empty cup.
                    </p>
                    <p className="text-cream/85 text-sm leading-relaxed">
                      The observer (top-right) sees it at its real position.
                      Now imagine pouring water into the cup. What do you think
                      will happen? Don&apos;t guess yet — just observe.
                    </p>
                    <p className="text-cream-dim text-xs mt-3 italic">
                      Ibn al-Haytham: &ldquo;We ought not to be satisfied with
                      the say-so of others.&rdquo;
                    </p>
                  </motion.div>
                )}

                {/* Step 2: Problem */}
                {step === 1 && (
                  <motion.div
                    key="prob"
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    className="mt-3"
                  >
                    <p className="font-display text-lg text-cream italic leading-snug mb-3">
                      Why does the coin appear to rise when water is poured?
                    </p>
                    <p className="text-cream/85 text-sm leading-relaxed">
                      The question must be precise. Not &ldquo;why does the
                      coin move?&rdquo; (it doesn&apos;t). Not &ldquo;why does
                      the eye see it wrong?&rdquo; (vague). The question is: what
                      is the mechanism by which water changes the apparent
                      position of a stationary object?
                    </p>
                  </motion.div>
                )}

                {/* Step 3: Hypothesis */}
                {step === 2 && (
                  <motion.div
                    key="hyp"
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    className="mt-3 space-y-2"
                  >
                    <p className="text-cream/85 text-sm mb-2">Choose a hypothesis:</p>
                    {HYPOTHESES.map((h) => (
                      <button
                        key={h.id}
                        onClick={() => setHypothesis(h.id)}
                        className={`w-full text-left p-3 rounded-lg border transition-all ${
                          hypothesis === h.id
                            ? 'border-gold/60 bg-gold/10 text-cream'
                            : 'border-cream-dim/20 text-cream-dim hover:border-gold/30'
                        }`}
                      >
                        <span className="font-mono text-xs text-gold mr-2">{h.id}.</span>
                        <span className="text-sm">{h.text}</span>
                      </button>
                    ))}
                    {hypothesis && (
                      <p className="text-[10px] text-gold/70 italic mt-2">
                        ✓ Hypothesis selected. Proceed to experiment.
                      </p>
                    )}
                  </motion.div>
                )}

                {/* Step 4: Experiment */}
                {step === 3 && (
                  <motion.div
                    key="exp"
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    className="mt-3"
                  >
                    <p className="text-cream/85 text-sm leading-relaxed mb-3">
                      Vary the water depth using the slider below the canvas.
                      For each depth, the apparent position of the coin is
                      recorded as a data point.
                    </p>
                    <p className="text-cream-dim text-xs mb-2">
                      Data points so far: <span className="text-gold">{dataPoints.length}</span>
                    </p>
                    <div className="max-h-24 overflow-y-auto gold-scrollbar text-[10px] font-mono text-cream-dim/80 space-y-0.5">
                      {dataPoints.map((p, i) => (
                        <div key={i} className="flex justify-between">
                          <span>depth: {p.depth}%</span>
                          <span>apparent shift: +{p.apparent.toFixed(1)}%</span>
                        </div>
                      ))}
                    </div>
                  </motion.div>
                )}

                {/* Step 5: Verification */}
                {step === 4 && (
                  <motion.div
                    key="ver"
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    className="mt-3"
                  >
                    <p className="text-cream/85 text-sm leading-relaxed mb-3">
                      Compare the data to your hypothesis.
                    </p>
                    {selectedHypothesis && (
                      <div className={`p-3 rounded-lg border ${
                        selectedHypothesis.correct
                          ? 'border-gold/60 bg-gold/10'
                          : 'border-burgundy/50 bg-burgundy/10'
                      }`}>
                        <p className="text-[10px] font-mono uppercase tracking-widest text-gold/70 mb-1">
                          Your hypothesis ({selectedHypothesis.id})
                        </p>
                        <p className="text-cream text-xs italic mb-2">{selectedHypothesis.text}</p>
                        <p className={`text-sm ${selectedHypothesis.correct ? 'text-gold' : 'text-burgundy'}`}>
                          {selectedHypothesis.feedback}
                        </p>
                      </div>
                    )}
                    <p className="text-cream-dim text-xs mt-3">
                      The data show a <span className="text-gold">linear relationship</span> between water depth and apparent shift. The coin does not move. The light bends. This is refraction.
                    </p>
                  </motion.div>
                )}

                {/* Step 6: Repetition */}
                {step === 5 && (
                  <motion.div
                    key="rep"
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    className="mt-3"
                  >
                    <p className="text-cream/85 text-sm leading-relaxed mb-3">
                      Move the slider again. Try different depths. The
                      relationship holds: each water depth produces a
                      proportional apparent shift. The result is reproducible —
                      which is what makes it a fact, not an anecdote.
                    </p>
                    <p className="text-cream-dim text-xs italic">
                      &ldquo;Repeat the experiment under varied conditions, so
                      that no accident may deceive the seeker.&rdquo;
                    </p>
                  </motion.div>
                )}

                {/* Step 7: Publication */}
                {step === 6 && (
                  <motion.div
                    key="pub"
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    className="mt-3"
                  >
                    <p className="text-cream/85 text-sm leading-relaxed mb-3">
                      Write up the method, the apparatus, the data, and the
                      conclusion. Publish so others may repeat it.
                    </p>
                    <div className="rounded-lg border border-gold/30 bg-cosmos-deep/60 p-3 font-mono text-[10px] text-cream/85 leading-relaxed">
                      <p className="text-gold mb-1">{'// FINDINGS'}</p>
                      <p>Phenomenon: Coin in cup appears to rise when water added.</p>
                      <p>Hypothesis tested: {selectedHypothesis?.text}</p>
                      <p>Result: {selectedHypothesis?.correct ? 'CONFIRMED' : 'REFUTED'}.</p>
                      <p>Mechanism: Light bends at water surface (refraction).</p>
                      <p>Relation: apparent_shift ∝ water_depth (linear).</p>
                      <p>Replications: {dataPoints.length} data points, all consistent.</p>
                    </div>
                    <p className="text-cream-dim text-xs italic mt-2">
                      &ldquo;Compose the findings into a book, so that those who
                      come after may examine and extend them.&rdquo;
                    </p>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            {/* Navigation controls */}
            <div className="flex items-center justify-between gap-3">
              <button
                onClick={prev}
                disabled={step === 0}
                className="px-4 py-2.5 rounded-lg border border-cream-dim/20 text-cream-dim text-xs font-mono uppercase tracking-wider hover:border-gold/40 hover:text-cream transition-all disabled:opacity-30 disabled:cursor-not-allowed flex items-center gap-1.5"
              >
                <RotateCcw className="w-3 h-3" /> Back
              </button>
              <button
                onClick={restart}
                className="px-4 py-2.5 rounded-lg border border-cream-dim/20 text-cream-dim text-xs font-mono uppercase tracking-wider hover:border-gold/40 hover:text-cream transition-all"
              >
                Restart
              </button>
              {step < 6 ? (
                <button
                  onClick={next}
                  disabled={step === 2 && !hypothesis}
                  className="px-5 py-2.5 rounded-lg bg-gold/20 border border-gold text-gold text-xs font-mono uppercase tracking-wider hover:bg-gold/30 transition-all disabled:opacity-30 disabled:cursor-not-allowed flex items-center gap-1.5"
                >
                  Next <ChevronRight className="w-3 h-3" />
                </button>
              ) : (
                <button
                  onClick={() => {
                    setFinalVerdict('complete');
                  }}
                  className="px-5 py-2.5 rounded-lg bg-gold/20 border border-gold text-gold text-xs font-mono uppercase tracking-wider hover:bg-gold/30 transition-all flex items-center gap-1.5"
                >
                  <CheckCircle2 className="w-3 h-3" /> Complete
                </button>
              )}
            </div>
          </div>
        </div>

        {/* Completion banner */}
        <AnimatePresence>
          {step === 6 && finalVerdict === 'complete' && (
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              className="mt-10 text-center max-w-2xl mx-auto"
            >
              <div className="glass-card-gold rounded-2xl p-6 glow-gold">
                <p className="font-display text-xl sm:text-2xl text-gradient-gold italic mb-2">
                  You just used the scientific method.
                </p>
                <p className="text-cream/85 text-sm leading-relaxed">
                  Seven steps. Observation → Problem → Hypothesis → Experiment →
                  Verification → Repetition → Publication. This is the method
                  Ibn al-Haytham stated in 1025 CE — and the method you used
                  just now to discover refraction. Francis Bacon restated these
                  same steps in 1620. The foundation was Alhazen&apos;s.
                </p>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </section>
  );
}
