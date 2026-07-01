#!/usr/bin/env python3
"""Add Hero namespace to all 4 message files (en, fr, de, ar).

Each hero gets: eyebrow, question lines, orDid closer, scrollHint.
"""
import json
from pathlib import Path

MESSAGES_DIR = Path("/home/z/my-project/messages")

# === English ===
EN_HERO = {
    "gravity": {
        "eyebrow": "A SDAM Investigation",
        "q1": "Newton discovered",
        "q2": "gravity",
        "q3": "in 1687.",
        "orDid": "Or did he?",
        "scrollHint": "Scroll to investigate"
    },
    "optics": {
        "eyebrow": "A SDAM Investigation",
        "q1": "Newton discovered",
        "q2": "the laws of optics.",
        "q3": "Daguerre invented",
        "q4": "photography.",
        "orDid": "Or did they?",
        "scrollHint": "Scroll to investigate"
    },
    "method": {
        "eyebrow": "A SDAM Investigation",
        "q1": "Francis Bacon",
        "q2": "invented the scientific method",
        "orDid": "Or did he?",
        "scrollHint": "Scroll to investigate"
    },
    "calculus": {
        "eyebrow": "A SDAM Investigation",
        "q1": "Newton invented calculus",
        "q2": "Leibniz in 1684.",
        "orDid": "Or did they?",
        "scrollHint": "Scroll to investigate"
    },
    "astro": {
        "eyebrow": "A SDAM Investigation",
        "q1": "Copernicus invented",
        "q2": "modern astronomy.",
        "orDid": "Or did he?",
        "scrollHint": "Scroll to investigate"
    },
    "nav": {
        "eyebrow": "A SDAM Investigation",
        "q1": "Europeans explored the oceans",
        "q2": "in the 15th century.",
        "orDid": "Or did they?",
        "scrollHint": "Scroll to investigate"
    },
    "uni": {
        "eyebrow": "A SDAM Investigation",
        "q1": "Europe founded",
        "q2": "the first universities.",
        "orDid": "Or did they?",
        "scrollHint": "Scroll to investigate"
    },
    "med": {
        "eyebrow": "A SDAM Investigation",
        "q1": "Europeans invented",
        "q2": "modern medicine.",
        "orDid": "Or did they?",
        "scrollHint": "Scroll to investigate"
    },
    "alg": {
        "eyebrow": "A SDAM Investigation",
        "q1": "Algorithms are",
        "q2": "a European invention.",
        "orDid": "Or are they?",
        "scrollHint": "Scroll to investigate"
    }
}

# === French ===
FR_HERO = {
    "gravity": {
        "eyebrow": "Une enquête SDAM",
        "q1": "Newton a découvert",
        "q2": "la gravité",
        "q3": "en 1687.",
        "orDid": "Ou pas ?",
        "scrollHint": "Faites défiler pour enquêter"
    },
    "optics": {
        "eyebrow": "Une enquête SDAM",
        "q1": "Newton a découvert",
        "q2": "les lois de l'optique.",
        "q3": "Daguerre a inventé",
        "q4": "la photographie.",
        "orDid": "Ou pas ?",
        "scrollHint": "Faites défiler pour enquêter"
    },
    "method": {
        "eyebrow": "Une enquête SDAM",
        "q1": "Francis Bacon",
        "q2": "a inventé la méthode scientifique",
        "orDid": "Ou pas ?",
        "scrollHint": "Faites défiler pour enquêter"
    },
    "calculus": {
        "eyebrow": "Une enquête SDAM",
        "q1": "Newton a inventé le calcul",
        "q2": "Leibniz en 1684.",
        "orDid": "Ou pas ?",
        "scrollHint": "Faites défiler pour enquêter"
    },
    "astro": {
        "eyebrow": "Une enquête SDAM",
        "q1": "Copernic a inventé",
        "q2": "l'astronomie moderne.",
        "orDid": "Ou pas ?",
        "scrollHint": "Faites défiler pour enquêter"
    },
    "nav": {
        "eyebrow": "Une enquête SDAM",
        "q1": "Les Européens ont exploré les océans",
        "q2": "au XVe siècle.",
        "orDid": "Ou pas ?",
        "scrollHint": "Faites défiler pour enquêter"
    },
    "uni": {
        "eyebrow": "Une enquête SDAM",
        "q1": "L'Europe a fondé",
        "q2": "les premières universités.",
        "orDid": "Ou pas ?",
        "scrollHint": "Faites défiler pour enquêter"
    },
    "med": {
        "eyebrow": "Une enquête SDAM",
        "q1": "Les Européens ont inventé",
        "q2": "la médecine moderne.",
        "orDid": "Ou pas ?",
        "scrollHint": "Faites défiler pour enquêter"
    },
    "alg": {
        "eyebrow": "Une enquête SDAM",
        "q1": "Les algorithmes sont",
        "q2": "une invention européenne.",
        "orDid": "Ou pas ?",
        "scrollHint": "Faites défiler pour enquêter"
    }
}

# === German ===
DE_HERO = {
    "gravity": {
        "eyebrow": "Eine SDAM-Untersuchung",
        "q1": "Newton entdeckte",
        "q2": "die Schwerkraft",
        "q3": "1687.",
        "orDid": "Oder doch nicht?",
        "scrollHint": "Scrollen zum Untersuchen"
    },
    "optics": {
        "eyebrow": "Eine SDAM-Untersuchung",
        "q1": "Newton entdeckte",
        "q2": "die optischen Gesetze.",
        "q3": "Daguerre erfand",
        "q4": "die Fotografie.",
        "orDid": "Oder doch nicht?",
        "scrollHint": "Scrollen zum Untersuchen"
    },
    "method": {
        "eyebrow": "Eine SDAM-Untersuchung",
        "q1": "Francis Bacon",
        "q2": "erfand die wissenschaftliche Methode",
        "orDid": "Oder doch nicht?",
        "scrollHint": "Scrollen zum Untersuchen"
    },
    "calculus": {
        "eyebrow": "Eine SDAM-Untersuchung",
        "q1": "Newton erfand die Infinitesimalrechnung",
        "q2": "Leibniz 1684.",
        "orDid": "Oder doch nicht?",
        "scrollHint": "Scrollen zum Untersuchen"
    },
    "astro": {
        "eyebrow": "Eine SDAM-Untersuchung",
        "q1": "Kopernikus erfand",
        "q2": "die moderne Astronomie.",
        "orDid": "Oder doch nicht?",
        "scrollHint": "Scrollen zum Untersuchen"
    },
    "nav": {
        "eyebrow": "Eine SDAM-Untersuchung",
        "q1": "Europäer erforschten die Ozeane",
        "q2": "im 15. Jahrhundert.",
        "orDid": "Oder doch nicht?",
        "scrollHint": "Scrollen zum Untersuchen"
    },
    "uni": {
        "eyebrow": "Eine SDAM-Untersuchung",
        "q1": "Europa gründete",
        "q2": "die ersten Universitäten.",
        "orDid": "Oder doch nicht?",
        "scrollHint": "Scrollen zum Untersuchen"
    },
    "med": {
        "eyebrow": "Eine SDAM-Untersuchung",
        "q1": "Europäer erfanden",
        "q2": "die moderne Medizin.",
        "orDid": "Oder doch nicht?",
        "scrollHint": "Scrollen zum Untersuchen"
    },
    "alg": {
        "eyebrow": "Eine SDAM-Untersuchung",
        "q1": "Algorithmen sind",
        "q2": "eine europäische Erfindung.",
        "orDid": "Oder doch nicht?",
        "scrollHint": "Scrollen zum Untersuchen"
    }
}

# === Arabic ===
AR_HERO = {
    "gravity": {
        "eyebrow": "تحقيق SDAM",
        "q1": "نيوتن اكتشف",
        "q2": "الجاذبية",
        "q3": "عام ١٦٨٧.",
        "orDid": "أم أن الأمر غير ذلك؟",
        "scrollHint": "مرر للتحقيق"
    },
    "optics": {
        "eyebrow": "تحقيق SDAM",
        "q1": "نيوتن اكتشف",
        "q2": "قوانين البصريات.",
        "q3": "داجير اخترع",
        "q4": "التصوير.",
        "orDid": "أم أن الأمر غير ذلك؟",
        "scrollHint": "مرر للتحقيق"
    },
    "method": {
        "eyebrow": "تحقيق SDAM",
        "q1": "فرانسيس بيكون",
        "q2": "اخترع المنهج العلمي",
        "orDid": "أم أن الأمر غير ذلك؟",
        "scrollHint": "مرر للتحقيق"
    },
    "calculus": {
        "eyebrow": "تحقيق SDAM",
        "q1": "نيوتن اخترع التفاضل والتكامل",
        "q2": "لايبنيتس ١٦٨٤.",
        "orDid": "أم أن الأمر غير ذلك؟",
        "scrollHint": "مرر للتحقيق"
    },
    "astro": {
        "eyebrow": "تحقيق SDAM",
        "q1": "كوبرنيكوس اخترع",
        "q2": "علم الفلك الحديث.",
        "orDid": "أم أن الأمر غير ذلك؟",
        "scrollHint": "مرر للتحقيق"
    },
    "nav": {
        "eyebrow": "تحقيق SDAM",
        "q1": "الأوروبيون استكشفوا المحيطات",
        "q2": "في القرن الخامس عشر.",
        "orDid": "أم أن الأمر غير ذلك؟",
        "scrollHint": "مرر للتحقيق"
    },
    "uni": {
        "eyebrow": "تحقيق SDAM",
        "q1": "أوروبا أسست",
        "q2": "أولى الجامعات.",
        "orDid": "أم أن الأمر غير ذلك؟",
        "scrollHint": "مرر للتحقيق"
    },
    "med": {
        "eyebrow": "تحقيق SDAM",
        "q1": "الأوروبيون اخترعوا",
        "q2": "الطب الحديث.",
        "orDid": "أم أن الأمر غير ذلك؟",
        "scrollHint": "مرر للتحقيق"
    },
    "alg": {
        "eyebrow": "تحقيق SDAM",
        "q1": "الخوارزميات",
        "q2": "اختراع أوروبي.",
        "orDid": "أم أن الأمر غير ذلك؟",
        "scrollHint": "مرر للتحقيق"
    }
}

HERO_MAP = {
    "en": EN_HERO,
    "fr": FR_HERO,
    "de": DE_HERO,
    "ar": AR_HERO,
}

for locale, hero_data in HERO_MAP.items():
    filepath = MESSAGES_DIR / f"{locale}.json"
    content = json.loads(filepath.read_text(encoding="utf-8"))
    content["Hero"] = hero_data
    filepath.write_text(json.dumps(content, ensure_ascii=False, indent=2) + "\n", encoding="utf-8")
    print(f"OK   {locale}.json: Hero namespace added ({len(hero_data)} investigations)")

print("\nDone.")
