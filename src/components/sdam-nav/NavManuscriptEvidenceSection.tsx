'use client';
import { motion } from 'framer-motion';
import Image from 'next/image';
import { Compass, BookOpen, Ship, Globe, Scroll, Star } from 'lucide-react';
import { useTranslations } from 'next-intl';

const EVIDENCE = [
  { image: '/images/sdam-nav/astrolabe-islamic-art.jpg', icon: Compass, title: 'Surviving Islamic astrolabe', source: 'Source: Islamic Art & Science', detail: 'A surviving medieval Islamic astrolabe — the type Mariam al-Asturlābiyya perfected in Aleppo c. 944 CE. Visible: the angular graduations, the rete (star pointer), and Arabic calligraphic inscriptions. This instrument was the GPS of the medieval world — capable of determining latitude, time, and direction.', aspect: 'aspect-[3/4]' },
  { image: '/images/sdam-nav/ibnmajid-inlibris-1.jpg', icon: Scroll, title: 'Ibn Mājid · Kitāb al-Fawāʾid (c. 1462)', source: 'Source: Antiquariat INLIBRIS', detail: 'A page from a surviving manuscript of Ibn Mājid\'s Kitāb al-Fawāʾid — the most comprehensive navigation manual of the medieval era. Visible: coastal routes, place names, and navigational instructions in Arabic. This is the manual that guided Vasco da Gama across the Indian Ocean in 1497.', aspect: 'aspect-[3/4]' },
  { image: '/images/sdam-nav/portolan-alamy.jpg', icon: Globe, title: 'Portolan chart — the Italian "inheritance"', source: 'Source: Alamy (historical reproduction)', detail: 'A medieval portolan chart with rhumb lines and coastal outlines. The portolan tradition appeared in Italy (Carte Pisane, c. 1290) immediately after the Crusader period — with no documented European precursor. The technique was inherited from Arabic navigators of the Mediterranean.', aspect: 'aspect-[3/4]' },
  { image: '/images/sdam-nav/vasco-alamy-1.jpg', icon: Ship, title: 'Vasco da Gama\'s carrack (1497–98)', source: 'Source: Alamy (historical reproduction)', detail: 'A Portuguese carrack of the type Vasco da Gama sailed to India. Da Gama hired a Muslim navigator at Malindi to guide him across the Indian Ocean. The navigator — almost certainly Ibn Mājid — used the Kitāb al-Fawāʾid system. Da Gama called him "the Moor." His name appears in no Portuguese account.', aspect: 'aspect-[3/4]' },
  { image: '/images/sdam-nav/mahri-muslim-heritage.jpg', icon: BookOpen, title: 'al-Mahrī · Indian Ocean navigation', source: 'Source: Muslim Heritage', detail: 'A page from a manuscript in the tradition of Sulaymān al-Mahrī (c. 1480–1550), the Yemeni navigator who systematized Ibn Mājid\'s methods into formal mathematical navigation — including the first tabulated latitude corrections for the Indian Ocean monsoon system.', aspect: 'aspect-[3/4]' },
  { image: '/images/sdam-nav/instruments-hsm.jpg', icon: Star, title: 'Surviving Islamic scientific instruments', source: 'Source: History of Science Museum, Oxford', detail: 'A collection of surviving medieval Islamic scientific instruments held at the History of Science Museum, Oxford. Visible: astrolabes, a celestial globe, a quadrant, a sundial, a compass, and an illustrated manuscript. These are the direct descendants of Mariam al-Asturlābiyya\'s manufacturing tradition.', aspect: 'aspect-[4/3]' },
];

export default function NavManuscriptEvidenceSection() {
  const tSections = useTranslations('Sections');
  return (
    <section id="evidence" className="relative min-h-screen flex flex-col items-center justify-center px-6 py-24 manuscript-bg overflow-hidden">
      <div className="max-w-6xl w-full relative z-10">
        <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, margin: "0px 0px 15% 0px" }} transition={{ duration: 0.8 }} className="text-center mb-14">
          <p className="text-[10px] font-mono tracking-[0.4em] uppercase text-gold/70 mb-4">{tSections('ManuscriptEvidence.chapterTitle')}</p>
          <h2 className="font-display text-4xl sm:text-6xl md:text-7xl text-cream leading-tight">Real instruments.<br /><span className="text-gradient-gold italic">Real manuals.</span></h2>
          <p className="mt-6 text-cream-dim max-w-2xl mx-auto text-sm sm:text-base">Every image below is an authentic historical artifact — a surviving astrolabe, a page from Ibn Mājid\'s navigation manual, or a historical reproduction from a credible institutional archive. No AI, no reconstructions. Each comes with its source attribution.</p>
        </motion.div>
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {EVIDENCE.map((item, i) => {
            const Icon = item.icon;
            return (
              <motion.figure key={item.title} initial={{ opacity: 0, y: 40 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, margin: "0px 0px 15% 0px" }} transition={{ duration: 0.7, delay: (i % 3) * 0.1 }} className="glass-card-gold rounded-2xl overflow-hidden group flex flex-col">
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
        <motion.div initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true, margin: "0px 0px 15% 0px" }} transition={{ duration: 0.7, delay: 0.4 }} className="mt-10 text-center">
          <p className="text-cream-dim/70 text-xs italic max-w-2xl mx-auto leading-relaxed">All images are reproductions of authentic historical materials sourced from institutional archives: the History of Science Museum (Oxford), Antiquariat INLIBRIS, Muslim Heritage, Islamic Art & Science, and Alamy. No contemporary portrait of Mariam al-Asturlābiyya survives — what you see here are authentic surviving instruments from her manufacturing tradition.</p>
        </motion.div>
      </div>
    </section>
  );
}
