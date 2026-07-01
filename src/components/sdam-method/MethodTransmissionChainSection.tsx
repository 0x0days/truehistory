'use client';

import { motion } from 'framer-motion';
import Image from 'next/image';
import { GitBranch, ArrowRight } from 'lucide-react';

const CHAIN = [
  {
    year: 'c. 1025 CE',
    person: 'Ibn al-Haytham',
    location: 'Cairo',
    contribution: 'States the experimental method explicitly. Applies it in optics, astronomy, medicine. Writes Kitāb al-Manāẓir and Doubts Concerning Ptolemy.',
    detail:
      'The method is stated in writing — observation, hypothesis, experiment, verification, repetition, publication, skepticism toward authority. This is the foundational act. Everything that follows in this chain is a refinement or transmission of what Ibn al-Haytham wrote down.',
    image: '/images/sdam-method/doubts-renaissance.jpg',
    imageAlt: 'Authentic medieval Arabic scientific manuscript page',
    source: 'The Renaissance Mathematicus',
    essential: true,
  },
  {
    year: 'c. 1235 CE',
    person: 'Robert Grosseteste',
    location: 'Oxford',
    contribution: 'First European to formalize the mathematical-empirical method. Read Alhazen\'s Perspectiva. Wrote on light, mathematics, and scientific method.',
    detail:
      'Grosseteste was the Bishop of Lincoln and the first European scholar to describe the method of "resolution and composition" — deriving laws from observation and verifying them by prediction. He read Alhazen\'s Latin De Aspectibus at Oxford. His method is a direct transmission of Ibn al-Haytham\'s.',
    image: '/images/sdam-method/grosseteste-sophia.jpg',
    imageAlt: 'Authentic medieval Latin manuscript page from Robert Grosseteste\'s works',
    source: 'SOPHIA Rare Books',
    essential: false,
  },
  {
    year: '1267 CE',
    person: 'Roger Bacon',
    location: 'Oxford',
    contribution: 'Publishes Opus Majus — explicitly cites Alhazen. Argues that science must rest on experiment, mathematics, and observation.',
    detail:
      'Roger Bacon\'s Opus Majus (1267) is the key transmission document. It explicitly names "Alhazen" as the source of his empiricism. Bacon argued to the Pope that all knowledge must rest on three pillars: experiment, mathematics, and the authority of the ancients — but only insofar as the first two verify the third. This is Ibn al-Haytham\'s method, restated in Latin.',
    image: '/images/sdam-method/roger-bacon-abebooks.jpg',
    imageAlt: 'Authentic page from Roger Bacon\'s Opus Majus manuscript',
    source: 'AbeBooks (manuscript reproduction)',
    essential: true,
  },
  {
    year: '1620 CE',
    person: 'Francis Bacon',
    location: 'London',
    contribution: 'Publishes Novum Organum — restates the empirical method in induction-focused terms. Credited with inventing the scientific method.',
    detail:
      'Francis Bacon\'s Novum Organum (1620) is the book credited with inventing the scientific method. The method it describes — observation, tables of instances, induction, experiment, verification — is the same seven-step method Ibn al-Haytham stated 590 years earlier. Bacon\'s genuine contribution was formalizing induction (the logic of generalizing from instances). The empirical foundation was Alhazen\'s, transmitted via Grosseteste and Roger Bacon.',
    image: '/images/sdam-method/francis-bacon-britannica.jpg',
    imageAlt: 'Francis Bacon historical engraving, author of Novum Organum',
    source: 'Britannica',
    essential: true,
  },
  {
    year: '1637 CE',
    person: 'René Descartes',
    location: 'Leiden / Amsterdam',
    contribution: 'Discourse on Method. Adds systematic rationalism — the complement to empiricism. "Cogito ergo sum."',
    detail:
      'Descartes\' method (systematic doubt, deduction from clear ideas) is the rationalist complement to the empiricist tradition. Together, empiricism (Alhazen → F. Bacon) and rationalism (Descartes) form the two pillars of modern scientific method. Neither alone is sufficient. But the empirical foundation — the insistence that all claims must be tested against observation — was Alhazen\'s contribution, not Descartes\'.',
    image: '/images/sdam-method/descartes-renaissance.jpg',
    imageAlt: 'Authentic historical illustration of Descartes or his works',
    source: 'The Renaissance Mathematicus',
    essential: false,
  },
  {
    year: '1934 CE',
    person: 'Karl Popper',
    location: 'Vienna',
    contribution: 'The Logic of Scientific Discovery. Adds the falsifiability criterion — a scientific claim must be testable and refutable.',
    detail:
      'Popper\'s contribution was the demarcation criterion: a claim is scientific only if it can be falsified. This is the logical refinement of Ibn al-Haytham\'s step V (verification) — Popper sharpens it: a hypothesis that cannot be refuted by any conceivable observation is not scientific. But the foundational principle — test, observe, replicate — was Alhazen\'s, 910 years earlier.',
    image: '/images/sdam-method/doubts-muslim-heritage.jpg',
    imageAlt: 'Authentic medieval Arabic manuscript page',
    source: 'Muslim Heritage',
    essential: false,
  },
];

export default function MethodTransmissionChainSection() {
  return (
    <section
      id="transmission"
      className="relative min-h-screen flex flex-col items-center justify-center px-6 py-24 overflow-hidden"
    >
      <div
        className="absolute inset-0 opacity-[0.02] pointer-events-none"
        style={{
          backgroundImage:
            'repeating-conic-gradient(from 0deg, rgba(212,175,55,0.4) 0deg 15deg, transparent 15deg 30deg)',
          backgroundSize: '400px 400px',
        }}
      />

      <div className="max-w-6xl w-full relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "0px 0px 15% 0px" }}
          transition={{ duration: 0.8 }}
          className="text-center mb-14"
        >
          <p className="text-[10px] font-mono tracking-[0.4em] uppercase text-gold/70 mb-4 flex items-center justify-center gap-2">
            <GitBranch className="w-3 h-3" />
            Chapter 08 — The Transmission Chain
          </p>
          <h2 className="font-display text-4xl sm:text-6xl md:text-7xl text-cream leading-tight">
            How the method
            <br />
            <span className="text-gradient-gold italic">reached Europe.</span>
          </h2>
          <p className="mt-6 text-cream-dim max-w-2xl mx-auto text-sm sm:text-base leading-relaxed">
            The scientific method did not spring into existence in 1620. It was
            carried across 600 years, three languages, and four countries —
            from Ibn al-Haytham&apos;s Cairo to Popper&apos;s Vienna. Each link
            added a refinement. None invented it from scratch.
          </p>
        </motion.div>

        <div className="relative max-w-4xl mx-auto">
          <div className="absolute left-8 sm:left-1/2 top-0 bottom-0 w-px -translate-x-1/2 bg-gold/20" />

          <div className="space-y-12">
            {CHAIN.map((step, i) => {
              const isLeft = i % 2 === 0;
              return (
                <motion.div
                  key={step.year}
                  initial={{ opacity: 0, y: 40 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "0px 0px 15% 0px" }}
                  transition={{ duration: 0.7, delay: i * 0.1 }}
                  className={`relative pl-20 sm:pl-0 flex ${isLeft ? 'sm:justify-start' : 'sm:justify-end'}`}
                >
                  <div className="absolute left-8 sm:left-1/2 top-8 -translate-x-1/2 z-10">
                    <div
                      className={`w-6 h-6 rounded-full border-2 ${
                        step.essential
                          ? 'bg-gold border-gold glow-gold'
                          : 'bg-cosmos border-gold/60'
                      } flex items-center justify-center`}
                    >
                      {step.essential && <span className="w-2 h-2 rounded-full bg-cosmos" />}
                    </div>
                  </div>

                  <div
                    className={`glass-card rounded-2xl overflow-hidden max-w-md w-full ${
                      isLeft ? 'sm:mr-12' : 'sm:ml-12'
                    } ${step.essential ? 'glass-card-gold' : ''}`}
                  >
                    <div className="relative h-36 overflow-hidden">
                      <Image
                        src={step.image}
                        alt={step.imageAlt}
                        fill
                        sizes="(max-width: 768px) 100vw, 50vw"
                        className="object-cover"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-cosmos-deep via-cosmos/30 to-transparent" />
                      <div className="absolute bottom-0 left-0 right-0 p-4">
                        <p className="font-mono text-xs text-gold tracking-wider">
                          {step.year} · {step.location}
                        </p>
                        <h3 className="font-display text-xl text-cream italic leading-tight">
                          {step.person}
                        </h3>
                      </div>
                      {step.essential && (
                        <div className="absolute top-3 right-3 px-2 py-1 rounded-full bg-gold/20 border border-gold/50 backdrop-blur-md">
                          <span className="text-[9px] font-mono uppercase tracking-widest text-gold">
                            Essential link
                          </span>
                        </div>
                      )}
                    </div>
                    <div className="p-5">
                      <p className="font-display text-base text-gradient-gold italic mb-3 leading-snug">
                        {step.contribution}
                      </p>
                      <p className="text-cream/85 text-xs leading-relaxed">
                        {step.detail}
                      </p>
                      <p className="text-[10px] font-mono uppercase tracking-widest text-gold/60 mt-3 pt-3 border-t border-gold/15">
                        {step.source}
                      </p>
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </div>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "0px 0px 15% 0px" }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="mt-16 text-center"
          >
            <div className="glass-card-gold rounded-2xl p-6 sm:p-8 max-w-2xl mx-auto">
              <ArrowRight className="w-6 h-6 text-gold mx-auto mb-3" />
              <p className="font-display text-xl sm:text-2xl text-cream italic leading-snug">
                Take away Ibn al-Haytham, and the chain breaks at the first link.
              </p>
              <p className="text-cream-dim text-xs mt-4">
                Grosseteste would have had no Perspectiva to read. Roger Bacon
                would have had no Alhazen to cite. Francis Bacon would have had
                no scholastic tradition to formalize. Descartes would have had
                no empirical complement to his rationalism. The scientific
                method would not exist in its modern form.
              </p>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
