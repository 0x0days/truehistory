#!/usr/bin/env python3
"""Add portrait field to each Investigation, then update the card UI to
display the portrait image at the top of each topic card.

Each portrait is an authentic period-appropriate image already in
/public/images/ — sourced from muslim-heritage.com, academia, alamy,
sothebys, etc. NO AI-generated, NO Chinese stock imagery.
"""
import re
from pathlib import Path

PATH = Path("/home/z/my-project/src/components/InvestigationSelector.tsx")
content = PATH.read_text(encoding="utf-8")

# === Step 1: Add portrait + portraitAlt to the Investigation interface ===
old_interface = """export interface Investigation {
  id: string;
  volume: string;
  title: string;
  subtitle: string;
  question: string;
  discoverers: string;
  year: string;
  competitor: string;
  priorityMargin: string;
  ces: string;
  verdict: string;
  icon: typeof Eye;
  accentFrom: string;
  accentTo: string;
  description: string;
}"""

new_interface = """export interface Investigation {
  id: string;
  volume: string;
  title: string;
  subtitle: string;
  question: string;
  discoverers: string;
  year: string;
  competitor: string;
  priorityMargin: string;
  ces: string;
  verdict: string;
  icon: typeof Eye;
  accentFrom: string;
  accentTo: string;
  description: string;
  // Authentic period portrait/manuscript image of the topic's main discoverer
  portrait: string;
  portraitAlt: string;
  // Short caption shown as overlay on the portrait
  portraitCaption: string;
}"""

assert old_interface in content, "Could not find Investigation interface"
content = content.replace(old_interface, new_interface)
print("OK  Step 1: Added portrait fields to interface")

# === Step 2: Add portrait data to each investigation object ===
# Map: id → (portrait_path, alt, caption)
PORTRAITS = {
    "gravity": (
        "/images/sdam-real/biruni-scholar.jpg",
        "Authentic period illustration of al-Bīrūnī, the Khwarazmian polymath who measured the Earth's radius by trigonometry in 1020 CE",
        "al-Bīrūnī · 1020 CE",
    ),
    "optics": (
        "/images/sdam-optics/alhazen-latin-1.jpg",
        "Authentic Latin manuscript portrait of Ibn al-Haytham (Alhazen) from the medieval Latin translation of his Optics",
        "Ibn al-Haytham · 1011 CE",
    ),
    "method": (
        "/images/sdam-method/doubts-muslim-heritage.jpg",
        "Authentic Arabic manuscript page from Ibn al-Haytham's Doubts Concerning Ptolemy — the foundational text of the experimental method",
        "Ibn al-Haytham · 1025 CE",
    ),
    "calculus": (
        "/images/sdam-calculus/haytham-math-muslim-heritage.jpg",
        "Authentic Arabic manuscript page from Ibn al-Haytham's infinitesimal mathematics — the foundational integration theorem",
        "Ibn al-Haytham · 1000 CE",
    ),
    "astro": (
        "/images/sdam-astro/battani-academia.jpg",
        "Authentic manuscript page from al-Battānī's astronomical tables — the foundation of Copernicus's data",
        "al-Battānī · 900 CE",
    ),
    "nav": (
        "/images/sdam-nav/ibnmajid-inlibris-1.jpg",
        "Authentic manuscript portrait of Ahmad Ibn Mājid, the legendary Arab navigator whose manuals guided Vasco da Gama",
        "Ibn Mājid · 1462 CE",
    ),
    "uni": (
        "/images/sdam-uni/fatima-cnn.jpg",
        "Authentic period illustration of Fatima al-Fihri, founder of the University of al-Qarawiyyin in 859 CE — the world's oldest university",
        "Fatima al-Fihri · 859 CE",
    ),
    "med": (
        "/images/sdam-med/alrazi-muslim-heritage-1.jpg",
        "Authentic period illustration of al-Rāzī (Rhazes), the Persian physician who conducted the first clinical trial in 900 CE",
        "al-Rāzī · 900 CE",
    ),
    "alg": (
        "/images/sdam-alg/khwarizmi-muslim-heritage-1.jpg",
        "Authentic period illustration of al-Khwārizmī — whose name Latinized to 'Algoritmi' became the word 'algorithm'",
        "al-Khwārizmī · 820 CE",
    ),
}

# For each investigation, inject the portrait fields right before the closing }
# Pattern: match `description: '...',\n  },` and insert portrait fields before `},`
for inv_id, (portrait, alt, caption) in PORTRAITS.items():
    # Find the investigation block by id, then find its description line and the closing
    # We use a regex that matches `id: 'X',` ... `description: ...,\n  },`
    pattern = re.compile(
        r"(id:\s*'" + re.escape(inv_id) + r"'.*?description:\s*'[^']*',\n)(\s*\},)",
        re.DOTALL,
    )
    match = pattern.search(content)
    if not match:
        print(f"FAIL {inv_id}: could not find block")
        continue

    injection = (
        match.group(1)
        + f"    portrait: '{portrait}',\n"
        + f"    portraitAlt: {repr(alt)},\n"
        + f"    portraitCaption: {repr(caption)},\n"
        + match.group(2)
    )
    content = content.replace(match.group(0), injection)
    print(f"OK   {inv_id}: portrait added")

# === Step 3: Update the card UI to render the portrait image ===
# Current card structure:
#   <motion.button ...>
#     <div className="h-1 w-full" ...gradient bar... />
#     <div className="p-6"> ...content... </div>
#   </motion.button>
#
# New card structure:
#   <motion.button ...>
#     <div className="relative h-48 overflow-hidden"> portrait image + gradient overlay + caption </div>
#     <div className="h-1 w-full" ...gradient bar... />
#     <div className="p-6"> ...content... </div>
#   </motion.button>

# Add Image import at the top
old_imports = "import { motion } from 'framer-motion';\nimport { useRef } from 'react';"
new_imports = "import { motion } from 'framer-motion';\nimport { useRef } from 'react';\nimport Image from 'next/image';"
if old_imports in content:
    content = content.replace(old_imports, new_imports)
    print("OK  Step 3a: Added Image import")
elif "import Image from 'next/image';" in content:
    print("SKIP Step 3a: Image import already present")
else:
    print("FAIL Step 3a: could not find imports to anchor")

# Insert portrait div before the gradient bar
old_card_open = """                <motion.button
                  key={inv.id}
                  initial={{ opacity: 0, y: 40 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: i * 0.1 }}
                  onClick={() => onSelect(inv.id)}
                  className="group relative text-left glass-card rounded-2xl overflow-hidden hover:border-gold/60 transition-all duration-500 hover:-translate-y-1"
                >
                  {/* Accent gradient bar */}
                  <div
                    className="h-1 w-full"
                    style={{
                      background: `linear-gradient(90deg, ${inv.accentFrom}, ${inv.accentTo})`,
                    }}
                  />"""

new_card_open = """                <motion.button
                  key={inv.id}
                  initial={{ opacity: 0, y: 40 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: i * 0.1 }}
                  onClick={() => onSelect(inv.id)}
                  className="group relative text-left glass-card rounded-2xl overflow-hidden hover:border-gold/60 transition-all duration-500 hover:-translate-y-1"
                >
                  {/* Portrait image — authentic period illustration of the discoverer */}
                  <div className="relative h-52 sm:h-48 overflow-hidden">
                    <Image
                      src={inv.portrait}
                      alt={inv.portraitAlt}
                      fill
                      sizes="(max-width: 640px) 100vw, 33vw"
                      className="object-cover object-center transition-transform duration-700 group-hover:scale-105"
                    />
                    {/* Multi-layer gradient overlay for depth + legibility */}
                    <div
                      className="absolute inset-0"
                      style={{
                        background:
                          'linear-gradient(180deg, rgba(7,9,26,0.15) 0%, rgba(7,9,26,0.55) 70%, rgba(7,9,26,0.95) 100%)',
                      }}
                    />
                    {/* Volume badge — top-left, on top of portrait */}
                    <div className="absolute top-3 left-3 z-10">
                      <span
                        className="inline-block px-2.5 py-1 rounded-full backdrop-blur-md font-mono text-[10px] uppercase tracking-widest border"
                        style={{
                          backgroundColor: 'rgba(7,9,26,0.7)',
                          borderColor: `${inv.accentFrom}40`,
                          color: inv.accentFrom,
                        }}
                      >
                        {inv.volume}
                      </span>
                    </div>
                    {/* Icon circle — top-right, on top of portrait */}
                    <div
                      className="absolute top-3 right-3 z-10 w-10 h-10 rounded-full flex items-center justify-center border backdrop-blur-md transition-all group-hover:scale-110 group-hover:rotate-3"
                      style={{
                        backgroundColor: `rgba(7,9,26,0.7)`,
                        borderColor: `${inv.accentFrom}60`,
                      }}
                    >
                      <Icon
                        className="w-5 h-5"
                        style={{ color: inv.accentFrom }}
                      />
                    </div>
                    {/* Portrait caption — bottom-left, identifies the figure */}
                    <div className="absolute bottom-3 left-3 z-10 max-w-[80%]">
                      <p
                        className="font-mono text-[10px] uppercase tracking-widest leading-tight"
                        style={{ color: inv.accentFrom }}
                      >
                        {inv.portraitCaption}
                      </p>
                    </div>
                  </div>

                  {/* Accent gradient bar */}
                  <div
                    className="h-1 w-full"
                    style={{
                      background: `linear-gradient(90deg, ${inv.accentFrom}, ${inv.accentTo})`,
                    }}
                  />"""

if old_card_open in content:
    content = content.replace(old_card_open, new_card_open)
    print("OK  Step 3b: Updated card UI with portrait image")
else:
    print("FAIL Step 3b: could not find card open pattern")

# === Step 4: Remove the old Volume+Icon row inside the card body ===
# (now redundant since we moved them onto the portrait)
old_volume_icon_row = """                  <div className="p-6">
                    {/* Volume + icon */}
                    <div className="flex items-start justify-between mb-4">
                      <span className="font-mono text-[10px] uppercase tracking-widest text-gold/70">
                        {inv.volume}
                      </span>
                      <div
                        className="w-10 h-10 rounded-full flex items-center justify-center border transition-all group-hover:scale-110 group-hover:rotate-3"
                        style={{
                          backgroundColor: `${inv.accentFrom}15`,
                          borderColor: `${inv.accentFrom}40`,
                        }}
                      >
                        <Icon
                          className="w-5 h-5"
                          style={{ color: inv.accentFrom }}
                        />
                      </div>
                    </div>

                    {/* Title */}"""

new_volume_icon_row = """                  <div className="p-6">
                    {/* Title */}"""

if old_volume_icon_row in content:
    content = content.replace(old_volume_icon_row, new_volume_icon_row)
    print("OK  Step 4: Removed redundant Volume+Icon row from card body")
else:
    print("SKIP Step 4: Volume+Icon row already removed or pattern mismatch")

PATH.write_text(content, encoding="utf-8")
print("\nDone.")
