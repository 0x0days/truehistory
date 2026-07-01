#!/usr/bin/env python3
"""Wire useTranslations into all 9 hero components.

For each hero:
1. Add `import { useTranslations } from 'next-intl';`
2. Add `const t = useTranslations('Hero.<id>');` in the component body
3. Replace the key visible strings with {t('key')} calls
"""
import re
from pathlib import Path

BASE = Path("/home/z/my-project/src/components")

# Map: file path → (investigation_id, list of (old_string, new_string) replacements)
HEROES = {
    "sdam/HeroSection.tsx": ("gravity", [
        ("A SDAM Investigation", "{t('eyebrow')}"),
        (">Newton discovered<", ">{t('q1')}<"),
        (">\n              gravity\n            <", ">\n              {t('q2')}\n            <"),
        (">in 1687.<", ">{t('q3')}<"),
        (">Or did he?<", ">{t('orDid')}<"),
        (">Scroll to investigate<", ">{t('scrollHint')}<"),
    ]),
    "sdam-optics/OpticsHeroSection.tsx": ("optics", [
        (">A SDAM Investigation<", ">{t('eyebrow')}<"),
        (">Newton discovered<", ">{t('q1')}<"),
        (">\n              the laws of optics.\n            <", ">\n              {t('q2')}\n            <"),
        (">Daguerre invented<", ">{t('q3')}<"),
        (">\n              photography.\n            <", ">\n              {t('q4')}\n            <"),
        (">Or did they?<", ">{t('orDid')}<"),
        (">Scroll to investigate<", ">{t('scrollHint')}<"),
    ]),
    "sdam-method/MethodHeroSection.tsx": ("method", [
        (">A SDAM Investigation · Vol. III<", ">{t('eyebrow')}<"),
        (">Francis Bacon<", ">{t('q1')}<"),
        ("invented the scientific method", "{t('q2')}"),
        (">Or did he?<", ">{t('orDid')}<"),
        (">Scroll to investigate<", ">{t('scrollHint')}<"),
    ]),
    "sdam-calculus/CalculusHeroSection.tsx": ("calculus", [
        (">A SDAM Investigation · Vol. IV<", ">{t('eyebrow')}<"),
        (">Newton invented calculus<", ">{t('q1')}<"),
        (">Leibniz in 1684.<", ">{t('q2')}<"),
        (">Or did they?<", ">{t('orDid')}<"),
        (">Scroll to investigate<", ">{t('scrollHint')}<"),
    ]),
    "sdam-astro/AstroHeroSection.tsx": ("astro", [
        (">A SDAM Investigation · Vol. V<", ">{t('eyebrow')}<"),
        (">Copernicus invented<", ">{t('q1')}<"),
        (">Or did he?<", ">{t('orDid')}<"),
        (">Scroll to investigate<", ">{t('scrollHint')}<"),
    ]),
    "sdam-nav/NavHeroSection.tsx": ("nav", [
        (">A SDAM Investigation · Vol. VI<", ">{t('eyebrow')}<"),
        (">in the 15th century.<", ">{t('q2')}<"),
        (">Or did they?<", ">{t('orDid')}<"),
        (">Scroll to investigate<", ">{t('scrollHint')}<"),
    ]),
    "sdam-uni/UniHeroSection.tsx": ("uni", [
        (">A SDAM Investigation · Vol. VII<", ">{t('eyebrow')}<"),
        (">the first universities.<", ">{t('q2')}<"),
        (">Or did they?<", ">{t('orDid')}<"),
        (">Scroll to investigate<", ">{t('scrollHint')}<"),
    ]),
    "sdam-med/MedHeroSection.tsx": ("med", [
        (">A SDAM Investigation · Vol. VIII<", ">{t('eyebrow')}<"),
        (">modern medicine.<", ">{t('q2')}<"),
        (">Or did they?<", ">{t('orDid')}<"),
        (">Scroll to investigate<", ">{t('scrollHint')}<"),
    ]),
    "sdam-alg/AlgHeroSection.tsx": ("alg", [
        (">A SDAM Investigation · Vol. IX<", ">{t('eyebrow')}<"),
        (">Algorithms are<", ">{t('q1')}<"),
        (">Or are they?<", ">{t('orDid')}<"),
        (">Scroll to investigate<", ">{t('scrollHint')}<"),
    ]),
}

stats = {"ok": 0, "fail": 0, "skip": 0}

for rel_path, (inv_id, replacements) in HEROES.items():
    path = BASE / rel_path
    if not path.exists():
        print(f"MISS {rel_path}: file not found")
        stats["fail"] += 1
        continue

    content = path.read_text(encoding="utf-8")

    # Skip if already has useTranslations
    if "useTranslations" in content:
        print(f"SKIP {rel_path}: already has useTranslations")
        stats["skip"] += 1
        continue

    # 1. Add import
    # Find the last import line
    imports = list(re.finditer(r"^import .+?;", content, re.MULTILINE))
    if not imports:
        print(f"FAIL {rel_path}: no import found")
        stats["fail"] += 1
        continue

    last_import = imports[-1]
    import_line = "import { useTranslations } from 'next-intl';"
    content = content[:last_import.end()] + "\n" + import_line + content[last_import.end():]

    # 2. Add useTranslations hook — find the component function body
    # Pattern: export default function ComponentName() {
    #   ... (some code) ...
    # We need to insert after the function opening
    func_match = re.search(r"(export default function \w+\([^)]*\)\s*\{)", content)
    if func_match:
        hook_line = f"\n  const t = useTranslations('Hero.{inv_id}');\n"
        content = content[:func_match.end()] + hook_line + content[func_match.end():]
    else:
        print(f"FAIL {rel_path}: could not find function body")
        stats["fail"] += 1
        continue

    # 3. Replace strings
    replace_count = 0
    for old, new in replacements:
        if old in content:
            content = content.replace(old, new, 1)
            replace_count += 1
        else:
            # Try without exact whitespace
            pass

    path.write_text(content, encoding="utf-8")
    print(f"OK   {rel_path}: {replace_count}/{len(replacements)} strings replaced")
    stats["ok"] += 1

print(f"\n{'='*50}")
print(f"DONE: {stats['ok']} ok, {stats['skip']} skipped, {stats['fail']} failed")
