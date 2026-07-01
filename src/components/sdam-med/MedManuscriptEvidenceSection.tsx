'use client';
import { motion } from 'framer-motion';
import Image from 'next/image';
import { BookOpen, Stethoscope, FlaskConical, Hospital, Heart, Cross } from 'lucide-react';
import { useTranslations } from 'next-intl';
const EVIDENCE = [
  { image: '/images/sdam-med/ibnsina-alamy-1.jpg', icon: BookOpen, title: 'Ibn Sīnā · Canon of Medicine (1025 CE)', source: 'Source: Alamy (manuscript reproduction)', detail: 'An authentic page from a surviving Arabic manuscript of Ibn Sīnā\'s Canon of Medicine — the most influential medical textbook ever written. Used at European universities for 600+ years. Visible: Arabic calligraphic medical text with marginal annotations.', aspect: 'aspect-[3/4]' },
  { image: '/images/sdam-med/alrazi-nlm.jpg', icon: Stethoscope, title: 'al-Rāzī · medical manuscript', source: 'Source: U.S. National Library of Medicine', detail: 'A page from a surviving medical manuscript in the tradition of al-Rāzī (Rhazes), held at the U.S. National Library of Medicine. Al-Rāzī ran the first controlled clinical trial in history, wrote the first medical encyclopedia, and performed the first differential diagnosis of smallpox vs. measles.', aspect: 'aspect-[3/4]' },
  { image: '/images/sdam-med/canon-latin-britannica.jpg', icon: BookOpen, title: 'Canon of Medicine · Latin translation', source: 'Source: Britannica (manuscript reproduction)', detail: 'A page from the Latin translation of Ibn Sīnā\'s Canon — the edition used at Montpellier, Padua, Paris, and Louvain from the 12th to the 17th century. Visible: woodcut medical illustrations and Latin text. The Arabic author was renamed "Avicenna."', aspect: 'aspect-[3/4]' },
  { image: '/images/sdam-med/bimaristan-discover-1.jpg', icon: Hospital, title: 'Bimaristan · Islamic hospital', source: 'Source: Discover Islamic Art Museum', detail: 'An illustration from the Islamic hospital (bimaristan) tradition. The bimaristan was the world\'s first organized hospital — with separate wards for different diseases, 24/7 emergency care, psychiatric treatment with music therapy, and free treatment for all. The first was built in Baghdad in 805 CE.', aspect: 'aspect-[3/4]' },
  { image: '/images/sdam-med/surgical-alamy-1.jpg', icon: FlaskConical, title: 'Islamic surgical instruments', source: 'Source: Alamy (museum reproduction)', detail: 'Surviving medieval Islamic surgical instruments — the type designed and described by al-Zahrāwī (Abulcasis) in his 30-volume medical encyclopedia (c. 1000 CE). Al-Zahrāwī invented over 200 surgical instruments, many of which bear his design to this day. His manual was used in European medical schools for 500 years.', aspect: 'aspect-[3/4]' },
  { image: '/images/sdam-med/european-med-collector.jpg', icon: Cross, title: 'European "medicine" — bloodletting', source: 'Source: TheCollector (historical illustration)', detail: 'A medieval European illustration of bloodletting — the dominant European "treatment" for 1,300 years. Bloodletting was based on Galen\'s four humors theory (which had no empirical basis) and killed patients (including George Washington in 1799). While al-Rāzī was running controlled trials, European physicians were draining blood.', aspect: 'aspect-[4/3]' },
];
export default function MedManuscriptEvidenceSection() {
  const tSections = useTranslations('Sections');
  return (
    <section id="evidence" className="relative min-h-screen flex flex-col items-center justify-center px-6 py-24 manuscript-bg overflow-hidden">
      <div className="max-w-6xl w-full relative z-10">
        <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, margin: "0px 0px 50% 0px" }} transition={{ duration: 0.8 }} className="text-center mb-14">
          <p className="text-[10px] font-mono tracking-[0.4em] uppercase text-gold/70 mb-4">{tSections('ManuscriptEvidence.chapterTitle')}</p>
          <h2 className="font-display text-4xl sm:text-6xl md:text-7xl text-cream leading-tight">Real manuscripts.<br /><span className="text-gradient-gold italic">Real medicine.</span></h2>
          <p className="mt-6 text-cream-dim max-w-2xl mx-auto text-sm sm:text-base">Every image below is an authentic historical artifact — a surviving Arabic medical manuscript, a Latin Canon reproduction, a bimaristan illustration, or a European bloodletting scene. The contrast is visible: systematic clinical medicine vs. superstition.</p>
        </motion.div>
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {EVIDENCE.map((item, i) => {
            const Icon = item.icon;
            return (
              <motion.figure key={item.title} initial={{ opacity: 0, y: 40 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, margin: "0px 0px 50% 0px" }} transition={{ duration: 0.7, delay: (i % 3) * 0.1 }} className="glass-card-gold rounded-2xl overflow-hidden group flex flex-col">
                <div className={`relative ${item.aspect} overflow-hidden`}>
                  <Image src={item.image} alt={item.title} fill sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw" className="object-cover transition-transform duration-1000 group-hover:scale-105" />
                  <div className="absolute inset-0 bg-gradient-to-t from-cosmos-deep/80 via-transparent to-transparent" />
                  <div className="absolute top-4 left-4 w-10 h-10 rounded-full glass-card-gold flex items-center justify-center backdrop-blur-md"><Icon className="w-5 h-5 text-gold" /></div>
                  <div className="absolute top-4 right-4 px-2.5 py-1 rounded-full glass-card backdrop-blur-md"><span className="text-[9px] font-mono uppercase tracking-widest text-gold/80">Plate {i + 1}</span></div>
                </div>
                <figcaption className="p-5 flex-1 flex flex-col">
                  <h3 className="font-display text-lg text-cream italic leading-tight mb-2">{item.title}</h3>
                  <p className="text-cream/85 text-xs leading-relaxed flex-1">{item.detail}</p>
                  <p className="text-[10px] font-mono uppercase tracking-widest text-gold/70 mt-3 pt-3 border-t border-gold/15">{item.source}</p>
                </figcaption>
              </motion.figure>
            );
          })}
        </div>
        <motion.div initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true, margin: "0px 0px 50% 0px" }} transition={{ duration: 0.7, delay: 0.4 }} className="mt-10 text-center">
          <p className="text-cream-dim/70 text-xs italic max-w-2xl mx-auto leading-relaxed">All images are reproductions of authentic historical materials sourced from institutional archives: the U.S. National Library of Medicine, Discover Islamic Art Museum, Britannica, Alamy, and TheCollector. The Canon of Medicine alone survives in hundreds of manuscripts across European libraries.</p>
        </motion.div>
      </div>
    </section>
  );
}
