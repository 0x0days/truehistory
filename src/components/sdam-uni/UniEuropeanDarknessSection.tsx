'use client';
import { motion } from 'framer-motion';
import Image from 'next/image';
import { Flame, Skull, BookX, Cross } from 'lucide-react';

const HORRORS = [
  {
    year: '5th – 6th c. CE',
    title: 'Women denied souls by church councils',
    detail: 'The Council of Nicaea (325 CE) and later councils debated whether women possessed souls. Theologians including Thomas Aquinas (1225–1274) defined women as "defective males" — "misbegotten" and "defective in nature." This was the official theological position of the European church during the entire period when Fatima al-Fehri, Lubna, and Dhayfa Khatun were building universities.',
    image: '/images/sdam-uni/inquisition-conversation-1.jpg',
    imageAlt: 'Authentic historical illustration of a woman being burned at the stake during the medieval period',
    source: 'The Conversation',
  },
  {
    year: '12th – 17th c. CE',
    title: 'Witch burnings — women killed for practicing science',
    detail: 'An estimated 40,000–60,000 women were executed as witches across Europe between 1450 and 1750. The charge of "witchcraft" was routinely applied to women who practiced herbal medicine, midwifery, or any form of knowledge outside church control. The Malleus Maleficarum (1486) — the witch-hunter\'s manual written by a Dominican friar — explicitly stated that women were more susceptible to witchcraft because they were "weaker in faith." A woman who could read was suspect. A woman who healed was a witch. A woman who studied was condemned.',
    image: '/images/sdam-uni/witch-burning-alamy-1.jpg',
    imageAlt: 'Authentic historical illustration of a public execution by burning, likely a witch trial',
    source: 'Alamy (historical illustration)',
  },
  {
    year: '1231 – 1834 CE',
    title: 'The Inquisition — scientists tortured for claiming truth',
    detail: 'The Inquisition tortured and executed anyone who claimed scientific truth contradicting church doctrine. Michael Servetus was burned alive in 1553 for discovering pulmonary circulation. Giordano Bruno was burned alive in 1600 for proposing the stars were distant suns. Galileo was threatened with torture and placed under house arrest in 1633 for defending heliocentrism. The Inquisition operated for 603 years — the entire period of the "European Renaissance."',
    image: '/images/sdam-uni/inquisition-history.jpg',
    imageAlt: 'Authentic historical illustration of a witch trial by water test',
    source: 'History.com',
  },
  {
    year: '1486 – 1782 CE',
    title: 'The Malleus Maleficarum — 300 years of legal woman-killing',
    detail: 'The Malleus Maleficarum ("Hammer of Witches"), published in 1486 by Heinrich Kramer, was the legal manual for witch prosecution. It was used by secular and church courts for 296 years. It stated: "All witchcraft comes from carnal lust, which is in women insatiable." It instructed judges to strip-search women for the "Devil\'s mark," to torture them until they confessed, and to burn them alive. The last witch was executed in Switzerland in 1782 — 1,923 years after Fatima al-Fehri founded her university.',
    image: '/images/sdam-uni/witch-meisterdrucke.jpg',
    imageAlt: 'Authentic historical painting of a public execution by burning with onlookers',
    source: 'MeisterDrucke',
  },
];

export default function UniEuropeanDarknessSection() {
  return (
    <section id="darkness" className="relative min-h-screen flex flex-col items-center justify-center px-6 py-24 overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-b from-cosmos via-cosmos-deep to-cosmos pointer-events-none" />
      <div className="absolute inset-0 opacity-[0.04] pointer-events-none" style={{ backgroundImage: 'radial-gradient(circle at 50% 30%, rgba(107, 29, 42, 0.5) 0%, transparent 50%)' }} />
      <div className="max-w-6xl w-full relative z-10">
        <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, margin: "0px 0px 15% 0px" }} transition={{ duration: 0.8 }} className="text-center mb-14">
          <p className="text-[10px] font-mono tracking-[0.4em] uppercase text-burgundy mb-4 flex items-center justify-center gap-2"><Flame className="w-3 h-3" />Chapter 04c — The European Darkness</p>
          <h2 className="font-display text-4xl sm:text-6xl md:text-7xl text-cream leading-tight">While Fatima built a university,<br /><span className="text-burgundy italic">Europe burned women alive.</span></h2>
          <p className="mt-6 text-cream-dim max-w-2xl mx-auto text-sm sm:text-base leading-relaxed">The same centuries that saw Fatima al-Fehri found the world&apos;s oldest university (859 CE), Lubna manage a library of 500,000 books (960s CE), and Dhayfa Khatun finance hospital-universities (1230s CE) — saw European women denied souls, burned as witches for practicing medicine, and executed by the Inquisition for claiming scientific truth. This is the contrast the textbooks do not make.</p>
        </motion.div>
        <div className="space-y-6">
          {HORRORS.map((h, i) => (
            <motion.article key={i} initial={{ opacity: 0, x: i % 2 === 0 ? -30 : 30 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true, margin: "0px 0px 15% 0px" }} transition={{ duration: 0.7, delay: i * 0.05 }} className={`glass-card rounded-2xl overflow-hidden flex flex-col sm:flex-row ${i % 2 === 0 ? 'sm:flex-row' : 'sm:flex-row-reverse'}`}>
              <div className="relative sm:w-2/5 aspect-[4/3] sm:aspect-[4/3] overflow-hidden flex-shrink-0">
                <Image src={h.image} alt={h.imageAlt} fill sizes="(max-width: 640px) 100vw, 40vw" className="object-cover" style={{ filter: 'grayscale(20%) brightness(0.85)' }} />
                <div className="absolute inset-0 bg-gradient-to-t from-cosmos-deep/90 via-cosmos-deep/40 to-transparent sm:bg-gradient-to-r" />
                <div className="absolute top-4 left-4 w-10 h-10 rounded-full bg-burgundy/80 border border-burgundy flex items-center justify-center backdrop-blur-md">
                  {i === 0 ? <Cross className="w-5 h-5 text-cream" /> : i === 1 ? <Flame className="w-5 h-5 text-cream" /> : i === 2 ? <BookX className="w-5 h-5 text-cream" /> : <Skull className="w-5 h-5 text-cream" />}
                </div>
              </div>
              <div className="p-5 sm:p-6 flex-1 flex flex-col">
                <div className="flex items-baseline gap-3 mb-2"><span className="text-burgundy font-mono text-sm tracking-wider">{h.year}</span><span className="h-px flex-1 bg-burgundy/20" /></div>
                <h3 className="font-display text-xl sm:text-2xl text-cream italic leading-tight mb-3">{h.title}</h3>
                <p className="text-cream/85 text-xs sm:text-sm leading-relaxed">{h.detail}</p>
                <p className="text-[10px] font-mono uppercase tracking-widest text-burgundy/70 mt-3 pt-3 border-t border-burgundy/15">Source: {h.source}</p>
              </div>
            </motion.article>
          ))}
        </div>
        {/* The direct contrast */}
        <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, margin: "0px 0px 15% 0px" }} transition={{ duration: 0.8, delay: 0.4 }} className="mt-16 text-center">
          <div className="glass-card-gold rounded-2xl p-6 sm:p-8 glow-gold max-w-3xl mx-auto">
            <p className="font-display text-xl sm:text-2xl text-cream italic leading-snug mb-6">The same year. The same century. Two civilizations.</p>
            <div className="grid grid-cols-2 gap-4 text-left">
              <div className="rounded-xl bg-gold/10 border border-gold/30 p-4">
                <p className="text-[10px] font-mono uppercase tracking-widest text-gold mb-2">Islamic World · 859 CE</p>
                <p className="text-cream text-sm leading-relaxed">Fatima al-Fehri founds al-Qarawiyyin University. Women manage libraries of 500,000 books. Women finance hospitals and schools. Women teach mathematics.</p>
              </div>
              <div className="rounded-xl bg-burgundy/10 border border-burgundy/30 p-4">
                <p className="text-[10px] font-mono uppercase tracking-widest text-burgundy mb-2">Europe · 859 CE</p>
                <p className="text-cream text-sm leading-relaxed">Women defined as "defective males" by theologians. Women denied souls by church councils. Women who practice medicine burned as witches. Women barred from learning to read.</p>
              </div>
            </div>
            <p className="text-cream-dim text-[10px] mt-4 italic">The contrast is not coincidence. It is the documented difference between two civilizations — one that valued women&apos;s minds, one that feared them.</p>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
