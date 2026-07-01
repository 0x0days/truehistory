#!/usr/bin/env python3
"""Wire useTranslations into all 9 finale components.

Replaces common UI strings + PeakEndFinaleEnhancer props.
"""
import re
from pathlib import Path

BASE = Path("/home/z/my-project/src/components")

# Map: file path → investigation_id
FINALES = {
    "sdam/FinaleSection.tsx": "gravity",
    "sdam-optics/OpticsFinaleSection.tsx": "optics",
    "sdam-method/MethodFinaleSection.tsx": "method",
    "sdam-calculus/CalculusFinaleSection.tsx": "calculus",
    "sdam-astro/AstroFinaleSection.tsx": "astro",
    "sdam-nav/NavFinaleSection.tsx": "nav",
    "sdam-uni/UniFinaleSection.tsx": "uni",
    "sdam-med/MedFinaleSection.tsx": "med",
    "sdam-alg/AlgFinaleSection.tsx": "alg",
}

# Common string replacements across ALL finales
# These use regex to match across whitespace
COMMON_REPLACEMENTS = [
    # The Corrected Record
    (r'>The Corrected Record<', '>{tCommon(\'correctedRecord\')}<'),
    # The next textbook should read:
    (r'>The next textbook should read:', '>{tCommon(\'nextTextbook\')}:'),
    # Share the corrected record:
    (r'Share the corrected record:', '{tCommon(\'shareLabel\')}'),
    # The SDAM framework is general
    (r'>The SDAM framework is general<', '>{tCommon(\'frameworkGeneral\')}<'),
    # What should we investigate next?
    (r'>What should we investigate next\?<', '>{tCommon(\'whatNext\')}<'),
    # Reinvestigate from the top
    (r'>Reinvestigate from the top<', '>{tCommon(\'reinvestigate\')}<'),
    # PeakEndFinaleEnhancer children: "The question that does not close"
    (r'>The question that does not close<', '>{tCommon(\'peakEyebrow\')}<'),
]

stats = {"ok": 0, "skip": 0, "fail": 0}

for rel_path, inv_id in FINALES.items():
    path = BASE / rel_path
    if not path.exists():
        print(f"MISS {rel_path}")
        stats["fail"] += 1
        continue

    content = path.read_text(encoding="utf-8")

    if "useTranslations" in content:
        print(f"SKIP {rel_path}: already has useTranslations")
        stats["skip"] += 1
        continue

    # 1. Add import
    imports = list(re.finditer(r"^import .+?;", content, re.MULTILINE))
    if imports:
        last_import = imports[-1]
        import_line = "import { useTranslations } from 'next-intl';"
        content = content[:last_import.end()] + "\n" + import_line + content[last_import.end():]

    # 2. Add useTranslations hooks — find the component function body
    func_match = re.search(r"(export default function \w+\([^)]*\)\s*\{)", content)
    if func_match:
        hooks = f"\n  const tCommon = useTranslations('Finale.common');\n  const t = useTranslations('Finale.{inv_id}');\n"
        content = content[:func_match.end()] + hooks + content[func_match.end():]
    else:
        print(f"FAIL {rel_path}: no function body found")
        stats["fail"] += 1
        continue

    # 3. Apply common replacements
    replace_count = 0
    for pattern, replacement in COMMON_REPLACEMENTS:
        new_content, n = re.subn(pattern, replacement, content)
        if n > 0:
            content = new_content
            replace_count += n

    # 4. Replace PeakEndFinaleEnhancer props
    # peakPhrase="..." → peakPhrase={t('peakPhrase')}
    # openLoopQuestion="..." → openLoopQuestion={t('openLoop')}
    peak_pattern = r'peakPhrase="([^"]*)"'
    peak_match = re.search(peak_pattern, content)
    if peak_match:
        content = re.sub(peak_pattern, "peakPhrase={t('peakPhrase')}", content, count=1)
        replace_count += 1

    loop_pattern = r'openLoopQuestion="([^"]*)"'
    loop_match = re.search(loop_pattern, content)
    if loop_match:
        content = re.sub(loop_pattern, "openLoopQuestion={t('openLoop')}", content, count=1)
        replace_count += 1

    # Also handle openLoopQuestion with single quotes
    loop_pattern2 = r"openLoopQuestion='([^']*)'"
    loop_match2 = re.search(loop_pattern2, content)
    if loop_match2:
        content = re.sub(loop_pattern2, "openLoopQuestion={t('openLoop')}", content, count=1)
        replace_count += 1

    path.write_text(content, encoding="utf-8")
    print(f"OK   {rel_path}: {replace_count} strings replaced")
    stats["ok"] += 1

print(f"\n{'='*50}")
print(f"DONE: {stats['ok']} ok, {stats['skip']} skipped, {stats['fail']} failed")
