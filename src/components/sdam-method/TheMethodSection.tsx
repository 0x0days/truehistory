'use client';

import { motion } from 'framer-motion';
import { Eye, HelpCircle, Lightbulb, FlaskConical, CheckCircle2, Repeat, Share2 } from 'lucide-react';

const STEPS = [
  {
    num: 'I',
    arabic: 'المُشاهدة',
    name: 'Observation',
    arabicLat: 'al-mushāhada',
    desc: 'Direct, careful observation of natural phenomena. Not hearsay, not book-learning — first-hand encounter with the world.',
    ibnQuote: 'We ought not to be satisfied with the say-so of others, nor with what is found in books.',
  },
  {
    num: 'II',
    arabic: 'التَّقْدير',
    name: 'Problem Statement',
    arabicLat: 'al-taqdīr',
    desc: 'Define precisely what is to be explained. A vague question yields a vague answer. Formulate the problem in mathematical or geometric terms.',
    ibnQuote: 'The seeker after truth begins by formulating the question that disturbs him.',
  },
  {
    num: 'III',
    arabic: 'الاعْتِقاد',
    name: 'Hypothesis',
    arabicLat: 'al-iʿtiqād',
    desc: 'Propose a tentative explanation. Treat it as provisional — not as truth, but as a candidate to be tested. The hypothesis must be falsifiable.',
    ibnQuote: 'Form a conception of the matter, and let it be a hypothesis to be tested — not a belief to be held.',
  },
  {
    num: 'IV',
    arabic: 'التَّجْرِبة',
    name: 'Experiment',
    arabicLat: 'al-tajriba',
    desc: 'Design and conduct a controlled experiment. Vary one factor at a time. Use instruments to measure precisely. The apparatus must be reproducible.',
    ibnQuote: 'Test the hypothesis by experiment, using instruments built for the purpose.',
  },
  {
    num: 'V',
    arabic: 'التَّحْقيق',
    name: 'Verification',
    arabicLat: 'al-taḥqīq',
    desc: 'Compare results against the hypothesis. If they match, the hypothesis is provisionally confirmed. If they do not, the hypothesis is rejected — regardless of who proposed it.',
    ibnQuote: 'If the result contradicts the hypothesis, the hypothesis is false — even if its author was Aristotle.',
  },
  {
    num: 'VI',
    arabic: 'التَّكْرار',
    name: 'Repetition',
    arabicLat: 'al-takrār',
    desc: 'Repeat the experiment. Vary conditions. Have others repeat it. A single result is an anecdote; a replicated result is a fact.',
    ibnQuote: 'Repeat the experiment under varied conditions, so that no accident may deceive the seeker.',
  },
  {
    num: 'VII',
    arabic: 'التَّصْنيف',
    name: 'Publication',
    arabicLat: 'al-taṣnīf',
    desc: 'Publish the method, the apparatus, and the results — so others may scrutinize, replicate, and build upon them. Science is a collective enterprise.',
    ibnQuote: 'Compose the findings into a book, so that those who come after may examine and extend them.',
  },
];

const ICONS = [Eye, HelpCircle, Lightbulb, FlaskConical, CheckCircle2, Repeat, Share2];

export default function TheMethodSection() {
  return (
    <section
      id="method"
      className="relative min-h-screen flex flex-col items-center justify-center px-6 py-24 overflow-hidden"
    >
      {/* Subtle grid pattern suggesting systematic inquiry */}
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
          className="text-center mb-16"
        >
          <p className="text-[10px] font-mono tracking-[0.4em] uppercase text-gold/70 mb-4">
            Chapter 04b — The Method Itself
          </p>
          <h2 className="font-display text-4xl sm:text-6xl md:text-7xl text-cream leading-tight">
            Seven steps.
            <br />
            <span className="text-gradient-gold italic">Stated in 1025 CE.</span>
          </h2>
          <p className="mt-6 text-cream-dim max-w-2xl mx-auto text-sm sm:text-base leading-relaxed">
            Modern textbooks credit Francis Bacon (1620) with formulating the
            scientific method. But Ibn al-Haytham had already stated it — in
            writing, in Arabic, with each step explicitly defined — 600 years
            earlier. Here are the seven steps, in his own words.
          </p>
        </motion.div>

        {/* The 7-step diagram — vertical numbered journey */}
        <div className="relative max-w-4xl mx-auto">
          {/* Vertical connecting line */}
          <div className="absolute left-[28px] sm:left-1/2 top-0 bottom-0 w-px -translate-x-1/2 bg-gradient-to-b from-gold/40 via-gold/20 to-gold/40" />

          <div className="space-y-6">
            {STEPS.map((step, i) => {
              const Icon = ICONS[i];
              const isLeft = i % 2 === 0;
              return (
                <motion.div
                  key={step.num}
                  initial={{ opacity: 0, y: 30, x: isLeft ? -20 : 20 }}
                  whileInView={{ opacity: 1, y: 0, x: 0 }}
                  viewport={{ once: true, margin: "0px 0px 15% 0px" }}
                  transition={{ duration: 0.6, delay: i * 0.05 }}
                  className={`relative pl-16 sm:pl-0 flex ${isLeft ? 'sm:justify-start' : 'sm:justify-end'}`}
                >
                  {/* Numbered node */}
                  <div className="absolute left-[28px] sm:left-1/2 top-6 -translate-x-1/2 z-10">
                    <div className="relative w-14 h-14 rounded-full bg-cosmos border-2 border-gold flex items-center justify-center glow-gold">
                      <span className="font-display text-xl text-gradient-gold">{step.num}</span>
                      {/* Inner ring */}
                      <div className="absolute inset-1 rounded-full border border-gold/30" />
                    </div>
                  </div>

                  {/* Card */}
                  <div
                    className={`glass-card-gold rounded-2xl p-5 sm:p-6 max-w-md w-full ${
                      isLeft ? 'sm:mr-12' : 'sm:ml-12'
                    } group hover:glow-gold transition-all duration-500`}
                  >
                    <div className="flex items-start justify-between mb-3">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-full bg-gold/10 border border-gold/30 flex items-center justify-center">
                          <Icon className="w-5 h-5 text-gold" />
                        </div>
                        <div>
                          <h3 className="font-display text-xl text-cream leading-tight">
                            {step.name}
                          </h3>
                          <p className="font-arabic text-sm text-gold" dir="rtl">
                            {step.arabic}
                          </p>
                        </div>
                      </div>
                      <span className="text-[10px] font-mono uppercase tracking-widest text-cream-dim/60 mt-1">
                        Step {step.num}
                      </span>
                    </div>
                    <p className="text-cream/85 text-sm leading-relaxed mb-3">
                      {step.desc}
                    </p>
                    <div className="border-l-2 border-gold/40 pl-3 py-1">
                      <p className="font-display text-xs sm:text-sm text-cream italic leading-snug">
                        &ldquo;{step.ibnQuote}&rdquo;
                      </p>
                      <p className="text-cream-dim/70 text-[10px] mt-1 font-mono uppercase tracking-wider">
                        — Ibn al-Haytham
                      </p>
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>

        {/* Closing statement */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "0px 0px 15% 0px" }}
          transition={{ duration: 0.7, delay: 0.3 }}
          className="mt-16 text-center max-w-2xl mx-auto"
        >
          <p className="text-cream/90 text-sm sm:text-base leading-relaxed">
            Compare these seven steps to the method Francis Bacon described in{' '}
            <em>Novum Organum</em> (1620): observation, tables of instances,
            induction, experiment, verification. They are the{' '}
            <span className="text-gold font-semibold">same seven steps</span>,
            restated 600 years later in Latin. The Arabic origin had been
            erased.
          </p>
        </motion.div>
      </div>
    </section>
  );
}
