#!/usr/bin/env python3
"""Inject TopicHeroImage into all 10 topic hero sections.

For each hero file, this script:
1. Adds the import statement
2. Inserts a <TopicHeroImage ... /> component as the FIRST child of the
   sticky div (so it sits behind the existing hero content as a
   full-bleed background)

Each topic gets its best authentic manuscript image.
"""
import re
from pathlib import Path

BASE = Path("/home/z/my-project/src/components")

# Map: hero file → (image_path, alt, caption, treatment)
TOPIC_HEROES = {
    "sdam/HeroSection.tsx": (
        "/images/sdam-real/mizan-diagram-1.jpg",
        "Authentic Arabic manuscript page from al-Khāzini's Mīzān al-ḥikma (Book of the Balance of Wisdom, 1121 CE) showing the hydrostatic balance diagram",
        "Source: al-Khāzini, Mīzān al-ḥikma manuscript",
        "manuscript",
    ),
    "sdam-optics/OpticsHeroSection.tsx": (
        "/images/sdam-optics/alhazen-latin-1.jpg",
        "Authentic Latin manuscript page of Alhazen's Perspectiva (Ibn al-Haytham's Kitāb al-Manāẓir), the foundational text of optics",
        "Source: Latin translation of Ibn al-Haytham's Optics",
        "manuscript",
    ),
    "sdam-method/MethodHeroSection.tsx": (
        "/images/sdam-method/doubts-muslim-heritage.jpg",
        "Authentic Arabic manuscript page from Ibn al-Haytham's Doubts Concerning Ptolemy, the foundational text of the experimental method",
        "Source: Ibn al-Haytham, Doubts Concerning Ptolemy",
        "manuscript",
    ),
    "sdam-calculus/CalculusHeroSection.tsx": (
        "/images/sdam-calculus/archimedes-smithsonian.jpg",
        "Authentic manuscript page from the Arabic Archimedes tradition — the source of Ibn al-Haytham's integration theorem",
        "Source: Arabic Archimedes manuscript tradition",
        "manuscript",
    ),
    "sdam-astro/AstroHeroSection.tsx": (
        "/images/sdam-astro/battani-academia.jpg",
        "Authentic manuscript page from al-Battānī's astronomical tables, the foundation of Copernicus's data",
        "Source: al-Battānī astronomical manuscript",
        "cosmic",
    ),
    "sdam-nav/NavHeroSection.tsx": (
        "/images/sdam-nav/astrolabe-sothebys.jpg",
        "Authentic medieval Islamic astrolabe — the navigation instrument that guided Columbus and every European navigator after him",
        "Source: medieval Islamic astrolabe",
        "cosmic",
    ),
    "sdam-uni/UniHeroSection.tsx": (
        "/images/sdam-uni/fatima-cnn.jpg",
        "Authentic illustration of Fatima al-Fihri and the University of al-Qarawiyyin in Fez, founded 859 CE — the world's oldest university",
        "Source: Fatima al-Fihri, University of al-Qarawiyyin",
        "manuscript",
    ),
    "sdam-med/MedHeroSection.tsx": (
        "/images/sdam-med/canon-latin-facsimile.jpg",
        "Authentic Latin translation page of Ibn Sīnā's Canon of Medicine — Europe's medical textbook for 600 years",
        "Source: Latin translation of Ibn Sīnā's Canon of Medicine",
        "manuscript",
    ),
    "sdam-alg/AlgHeroSection.tsx": (
        "/images/sdam-alg/algorismus-renaissance-1.jpg",
        "Authentic medieval Latin manuscript page of Algoritmi de numero Indorum — al-Khwārizmī's name Latinized into a word",
        "Source: Latin translation of al-Khwārizmī",
        "manuscript",
    ),
    "sdam-trig/TrigHeroSection.tsx": (
        "/images/sdam-real/biruni-manuscript.jpg",
        "Authentic Arabic manuscript page from al-Bīrūnī's trigonometric treatise — the foundation of the sine function",
        "Source: al-Bīrūnī trigonometric manuscript",
        "manuscript",
    ),
}

IMPORT_LINE = "import TopicHeroImage from '@/components/psych/TopicHeroImage';"

stats = {"imported": 0, "injected": 0, "skipped": 0, "missing_file": 0}

for rel_path, (img, alt, caption, treatment) in TOPIC_HEROES.items():
    path = BASE / rel_path
    if not path.exists():
        print(f"MISS  {rel_path}: file does not exist")
        stats["missing_file"] += 1
        continue

    content = path.read_text(encoding="utf-8")

    # Skip if already has TopicHeroImage
    if "TopicHeroImage" in content:
        print(f"SKIP  {rel_path}: already has TopicHeroImage")
        stats["skipped"] += 1
        continue

    # 1. Add import — find the last import line and append after it
    import_match = re.search(r"^import .+;\s*$", content, re.MULTILINE)
    if not import_match:
        # Try the alternate pattern (last 'import ... from' line)
        import_match = re.search(r"^import .+from .+;$", content, re.MULTILINE)

    if import_match:
        # Find the LAST import line
        all_imports = list(re.finditer(r"^import .+?;", content, re.MULTILINE))
        if all_imports:
            last_import = all_imports[-1]
            insert_pos = last_import.end()
            content = content[:insert_pos] + "\n" + IMPORT_LINE + content[insert_pos:]
            stats["imported"] += 1
        else:
            print(f"FAIL  {rel_path}: no import line found to anchor to")
            continue
    else:
        print(f"FAIL  {rel_path}: no import line found")
        continue

    # 2. Inject <TopicHeroImage> as the first child of the sticky div.
    # Pattern: <div className="sticky top-0 ...">
    # We insert TopicHeroImage right after the opening tag of that div.
    sticky_pattern = re.compile(
        r'(<div className="sticky top-0[^"]*"[^>]*>)',
        re.MULTILINE,
    )
    match = sticky_pattern.search(content)
    if not match:
        print(f"FAIL  {rel_path}: no sticky div found")
        continue

    injection = (
        f'\n        <TopicHeroImage\n'
        f'          src="{img}"\n'
        f'          alt={repr(alt)}\n'
        f'          caption={repr(caption)}\n'
        f'          treatment="{treatment}"\n'
        f'        />\n'
    )
    content = content[:match.end()] + injection + content[match.end():]

    path.write_text(content, encoding="utf-8")
    stats["injected"] += 1
    print(f"OK    {rel_path}")

print(f"\n{'='*50}")
print(f"INJECTION COMPLETE")
print(f"{'='*50}")
print(f"Imported:  {stats['imported']}")
print(f"Injected:  {stats['injected']}")
print(f"Skipped:   {stats['skipped']}")
print(f"Missing:   {stats['missing_file']}")
