#!/usr/bin/env python3
"""Refactor InvestigationSelector to use next-intl translations.

Strategy:
  1. Strip translatable fields (volume, title, subtitle, question, discoverers,
     year, competitor, priorityMargin, ces, verdict, portraitCaption, description)
     from the INVESTIGATIONS array.
  2. Keep only: id, icon, accentFrom, accentTo, portrait, portraitAlt.
  3. At render time, use useTranslations('Investigation') with the inv.id
     to pull translated strings from the message files.
  4. Translate the collection header strings too.
"""
import re
from pathlib import Path

PATH = Path("/home/z/my-project/src/components/InvestigationSelector.tsx")
content = PATH.read_text(encoding="utf-8")

# === Step 1: Add useTranslations import ===
old_imports = """import { motion } from 'framer-motion';
import { useRef } from 'react';
import Image from 'next/image';
import { ArrowRight, ScrollText, Eye, Sigma, FunctionSquare, Orbit, BookOpen, Compass, GraduationCap, Stethoscope, Binary } from 'lucide-react';
import MainPageHero from '@/components/MainPageHero';"""

new_imports = """import { motion } from 'framer-motion';
import { useRef } from 'react';
import Image from 'next/image';
import { useTranslations } from 'next-intl';
import { ArrowRight, ScrollText, Eye, Sigma, FunctionSquare, Orbit, BookOpen, Compass, GraduationCap, Stethoscope, Binary } from 'lucide-react';
import MainPageHero from '@/components/MainPageHero';"""

assert old_imports in content, "Could not find imports"
content = content.replace(old_imports, new_imports)
print("OK  Step 1: Added useTranslations import")

# === Step 2: Slim down the Investigation interface ===
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
  // Authentic period portrait/manuscript image of the topic's main discoverer
  portrait: string;
  portraitAlt: string;
  // Short caption shown as overlay on the portrait
  portraitCaption: string;
}"""

new_interface = """export interface Investigation {
  id: string;
  // Visual-only fields (not translated)
  icon: typeof Eye;
  accentFrom: string;
  accentTo: string;
  // Authentic period portrait/manuscript image of the topic's main discoverer
  portrait: string;
  portraitAlt: string;
  // Translatable fields are pulled from messages/<locale>.json at render time
  // using useTranslations('Investigation') with this id as the namespace key.
}"""

assert old_interface in content, "Could not find interface"
content = content.replace(old_interface, new_interface)
print("OK  Step 2: Slimmed down Investigation interface")

# === Step 3: For each investigation block, strip the translated fields ===
# Each block has the structure:
#   {
#     id: 'gravity',
#     volume: 'Vol. I',
#     title: 'Gravity',
#     subtitle: '...',
#     question: '...',
#     discoverers: '...',
#     year: '...',
#     competitor: '...',
#     priorityMargin: '...',
#     ces: '...',
#     verdict: '...',
#     icon: ScrollText,
#     accentFrom: '#d4af37',
#     accentTo: '#8a7028',
#     description: '...',
#     portrait: '...',
#     portraitAlt: '...',
#     portraitCaption: '...',
#   },
#
# We want to keep ONLY:
#   {
#     id: 'gravity',
#     icon: ScrollText,
#     accentFrom: '#d4af37',
#     accentTo: '#8a7028',
#     portrait: '...',
#     portraitAlt: '...',
#   },

# Match a full investigation block (from `{` after `INVESTIGATIONS: Investigation[] = [` to the closing `},`)
# We use a simpler approach: for each known id, find its block and rewrite.

INVESTIGATION_IDS = [
    'gravity', 'optics', 'method', 'calculus', 'astro',
    'nav', 'uni', 'med', 'alg',
]

# Find each block by id, then extract portrait and portraitAlt, then rewrite the block.
for inv_id in INVESTIGATION_IDS:
    # Pattern: from `id: 'X',` to the closing `  },` of that block.
    # We need to be careful — blocks contain apostrophes in descriptions.
    # Use a non-greedy match up to the FIRST `  },` after the id.
    pattern = re.compile(
        r"  \{\n    id: '" + re.escape(inv_id) + r"',\n(.*?)  \},\n",
        re.DOTALL,
    )
    match = pattern.search(content)
    if not match:
        print(f"FAIL {inv_id}: block not found")
        continue

    block_body = match.group(1)

    # Extract icon, accentFrom, accentTo, portrait, portraitAlt
    icon_m = re.search(r"icon:\s*(\w+),", block_body)
    accent_from_m = re.search(r"accentFrom:\s*'([^']+)',", block_body)
    accent_to_m = re.search(r"accentTo:\s*'([^']+)',", block_body)
    portrait_m = re.search(r"portrait:\s*'([^']+)',", block_body)
    portrait_alt_m = re.search(r"portraitAlt:\s*(.+?),\n", block_body)

    if not all([icon_m, accent_from_m, accent_to_m, portrait_m, portrait_alt_m]):
        print(f"FAIL {inv_id}: missing fields")
        continue

    icon = icon_m.group(1)
    accent_from = accent_from_m.group(1)
    accent_to = accent_to_m.group(1)
    portrait = portrait_m.group(1)
    portrait_alt_raw = portrait_alt_m.group(1).rstrip()

    # Build the new slim block
    new_block = (
        f"  {{\n"
        f"    id: '{inv_id}',\n"
        f"    icon: {icon},\n"
        f"    accentFrom: '{accent_from}',\n"
        f"    accentTo: '{accent_to}',\n"
        f"    portrait: '{portrait}',\n"
        f"    portraitAlt: {portrait_alt_raw},\n"
        f"  }},\n"
    )

    content = content.replace(match.group(0), new_block)
    print(f"OK   {inv_id}: slimmed")

# === Step 4: Add useTranslations in the component body ===
old_component_open = """export default function InvestigationSelector({
  onSelect,
}: {
  onSelect: (id: string) => void;
}) {
  const collectionRef = useRef<HTMLDivElement>(null);"""

new_component_open = """export default function InvestigationSelector({
  onSelect,
}: {
  onSelect: (id: string) => void;
}) {
  const t = useTranslations('Collection');
  const tInv = useTranslations('Investigation');
  const collectionRef = useRef<HTMLDivElement>(null);"""

assert old_component_open in content, "Could not find component open"
content = content.replace(old_component_open, new_component_open)
print("OK  Step 4: Added useTranslations hooks")

# === Step 5: Replace collection header strings with t() calls ===
replacements = [
    ("The SDAM Collection", "{t('eyebrow')}"),
    ("Five investigations.", "{t('titleLine1')}"),
    ("One methodology.", "{t('titleLine2')}"),
]

for old, new in replacements:
    if old in content:
        content = content.replace(f">  {old}<", f">{new}<")
        # also try without leading space
        content = content.replace(f">{old}<", f">{new}<")

# More precise: replace the text content of specific elements
# Find: <span className="text-gradient-gold text-glow-gold italic">
#         One methodology.
#       </span>
# And similar
print("OK  Step 5: Replaced collection header strings (basic)")

# === Step 6: Replace investigation card field references ===
# In the card, replace {inv.volume} with {tInv(`${inv.id}.volume`)} etc.
field_replacements = [
    ("{inv.volume}", "{tInv(`${inv.id}.volume`)}"),
    ("{inv.title}", "{tInv(`${inv.id}.title`)}"),
    ("{inv.subtitle}", "{tInv(`${inv.id}.subtitle`)}"),
    ("{inv.question}", "{tInv(`${inv.id}.question`)}"),
    ("{inv.discoverers}", "{tInv(`${inv.id}.discoverers`)}"),
    ("{inv.year}", "{tInv(`${inv.id}.year`)}"),
    ("{inv.competitor}", "{tInv(`${inv.id}.competitor`)}"),
    ("{inv.priorityMargin}", "{tInv(`${inv.id}.priorityMargin`)}"),
    ("{inv.ces}", "{tInv(`${inv.id}.ces`)}"),
    ("{inv.verdict}", "{tInv(`${inv.id}.verdict`)}"),
    ("{inv.portraitCaption}", "{tInv(`${inv.id}.portraitCaption`)}"),
    ("{inv.description}", "{tInv(`${inv.id}.description`)}"),
]

for old, new in field_replacements:
    content = content.replace(old, new)
print(f"OK  Step 6: Replaced {len(field_replacements)} field references with tInv() calls")

# === Step 7: Replace the discoverers/year/priorityMargin/ces labels ===
label_replacements = [
    ("Discoverers", "{t('discoverers')}"),
    ("Year", "{t('year')}"),
    ("Priority margin", "{t('priorityMargin')}"),
    ("CES Score", "{t('cesScore')}"),
    ("Investigate", "{t('investigate')}"),
]

for old, new in label_replacements:
    # These appear as text content in spans/paragraphs
    content = content.replace(f">{old}<", f">{new}<")

print(f"OK  Step 7: Replaced {len(label_replacements)} labels with t() calls")

PATH.write_text(content, encoding="utf-8")
print("\nDone.")
