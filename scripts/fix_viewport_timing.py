#!/usr/bin/env python3
"""Universal fix for scroll-animation timing bugs.

PROBLEM:
  `viewport={{ once: true, amount: 0.1 }}` means animation triggers when 10%
  of the element is visible. For tall sections (min-h-screen), 10% visible
  means the user has already scrolled past the top. Content appears
  half-rendered, then jumps in when the user stops scrolling.

  Bare `viewport={{ once: true }}` uses default `amount: 0`, which is better
  but still doesn't pre-trigger — the animation plays AFTER the element
  enters the viewport, so the user sees the tail end of the animation.

FIX:
  Replace ALL viewport configs with a margin-based pre-trigger:
    viewport={{ once: true, margin: "0px 0px 15% 0px" }}

  This expands the viewport root by 15% at the bottom, so the animation
  fires BEFORE the element enters the visible area. By the time the user
  scrolls to it, the animation has already completed — content appears
  instantly visible with no jank.

  The 15% margin is responsive (percentage of viewport height), so it
  works on all screen sizes.
"""
import re
from pathlib import Path
from collections import Counter

BASE = Path("/home/z/my-project/src/components")

# Match all viewport prop variants:
#   viewport={{ once: true }}
#   viewport={{ once: true, amount: 0.1 }}
#   viewport={{ once: true, amount: 0.2 }}
#   viewport={{ once: true, amount: 0 }}
#   viewport={{ once: true, amount: 0.1, ... }}
PATTERN = re.compile(
    r'viewport=\{\{\s*once:\s*true\s*(?:,\s*amount:\s*[\d.]+)?\s*(?:,\s*[^}]+)?\s*\}\}'
)

REPLACEMENT = 'viewport={{ once: true, margin: "0px 0px 15% 0px" }}'

stats = Counter()
files_changed = []

for tsx_file in BASE.rglob("*.tsx"):
    content = tsx_file.read_text(encoding="utf-8")
    matches = PATTERN.findall(content)
    if not matches:
        continue

    new_content = PATTERN.sub(REPLACEMENT, content)
    tsx_file.write_text(new_content, encoding="utf-8")

    count = len(matches)
    stats['total_replacements'] += count
    files_changed.append((str(tsx_file.relative_to(BASE)), count))

# Print report
print(f"\n{'='*60}")
print(f"UNIVERSAL VIEWPORT FIX COMPLETE")
print(f"{'='*60}")
print(f"Total replacements: {stats['total_replacements']}")
print(f"Files modified: {len(files_changed)}")
print(f"\nTop 10 files by replacement count:")
for fname, count in sorted(files_changed, key=lambda x: -x[1])[:10]:
    print(f"  {count:3d}  {fname}")
print(f"{'='*60}\n")
