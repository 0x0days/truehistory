#!/usr/bin/env python3
"""Download real archival images for the OPTICS investigation."""
import urllib.request
import os
import ssl

OUT = '/home/z/my-project/public/images/sdam-optics'
os.makedirs(OUT, exist_ok=True)

DOWNLOADS = [
    # Ibn al-Haytham / Kitab al-Manazir manuscript pages
    {
        'url': 'https://sfile.chatglm.cn/images-ppt/eb8804ce893a.jpg',
        'name': 'manazir-nature.jpg',
        'source': 'Nature (journal article reproduction)',
        'desc': 'Kitab al-Manazir manuscript page',
    },
    {
        'url': 'https://sfile.chatglm.cn/images-ppt/fa8665185192.jpg',
        'name': 'manazir-physorg.jpg',
        'source': 'Phys.org',
        'desc': 'Kitab al-Manazir manuscript page',
    },
    {
        'url': 'https://sfile.chatglm.cn/images-ppt/a270160e949d.jpg',
        'name': 'manazir-muslim-heritage.jpg',
        'source': 'Muslim Heritage',
        'desc': 'Optics manuscript page with diagrams',
    },
    {
        'url': 'https://sfile.chatglm.cn/images-ppt/3411b059300e.jpg',
        'name': 'manazir-academia.jpg',
        'source': 'Academia.edu',
        'desc': 'Medieval optics manuscript page',
    },
    {
        'url': 'https://sfile.chatglm.cn/images-ppt/ebe27f0e4c32.jpg',
        'name': 'manazir-renaissance-1.jpg',
        'source': 'The Renaissance Mathematicus',
        'desc': 'Manuscript page from Kitab al-Manazir',
    },
    {
        'url': 'https://sfile.chatglm.cn/images-ppt/348ad9616d09.jpg',
        'name': 'manazir-renaissance-2.jpg',
        'source': 'The Renaissance Mathematicus',
        'desc': 'Manuscript page from Kitab al-Manazir',
    },
    # Alhazen Latin translations (De Aspectibus / Perspectiva)
    {
        'url': 'https://sfile.chatglm.cn/images-ppt/f64eec94a8f7.jpg',
        'name': 'alhazen-latin-1.jpg',
        'source': 'The Renaissance Mathematicus',
        'desc': 'Latin translation of Alhazen\'s Optics',
    },
    {
        'url': 'https://sfile.chatglm.cn/images-ppt/b30bf67dec0c.jpg',
        'name': 'alhazen-latin-sophia.jpg',
        'source': 'SOPHIA Rare Books',
        'desc': 'Latin Perspectiva manuscript page',
    },
    {
        'url': 'https://sfile.chatglm.cn/images-ppt/21ced87e11ec.jpg',
        'name': 'alhazen-latin-2.jpg',
        'source': 'The Renaissance Mathematicus',
        'desc': 'Latin edition of Alhazen\'s Optics',
    },
    {
        'url': 'https://sfile.chatglm.cn/images-ppt/82a2ddb26699.jpg',
        'name': 'alhazen-latin-milestones.jpg',
        'source': 'Milestones of Science Books',
        'desc': 'Latin manuscript of Alhazen',
    },
    {
        'url': 'https://sfile.chatglm.cn/images-ppt/77533ee6b798.jpg',
        'name': 'alhazen-latin-3.jpg',
        'source': 'Academia.edu',
        'desc': 'Latin Alhazen manuscript with diagrams',
    },
    # Ibn Sahl — refraction manuscript (showing sine law 600+ years before Snell)
    {
        'url': 'https://sfile.chatglm.cn/images-ppt/324b10a367c5.png',
        'name': 'ibn-sahl-encyclopedia.png',
        'source': 'Encyclopedia of the History of Science',
        'desc': 'Ibn Sahl manuscript page showing the sine law of refraction',
    },
    {
        'url': 'https://sfile.chatglm.cn/images-ppt/3cedaad959cb.png',
        'name': 'ibn-sahl-eye.png',
        'source': 'Encyclopedia of the History of Science',
        'desc': 'Optical diagram showing refraction',
    },
    {
        'url': 'https://sfile.chatglm.cn/images-ppt/60f5239f876c.jpg',
        'name': 'ibn-sahl-renaissance.jpg',
        'source': 'The Renaissance Mathematicus',
        'desc': 'Medieval Arabic optics manuscript with geometric diagram',
    },
    {
        'url': 'https://sfile.chatglm.cn/images-ppt/1f77e94c23df.jpg',
        'name': 'ibn-sahl-burning-mirrors.jpg',
        'source': 'The Renaissance Mathematicus',
        'desc': 'Diagram of burning mirrors and lenses',
    },
    # Al-Farisi rainbow diagrams
    {
        'url': 'https://sfile.chatglm.cn/images-ppt/9f1ad7b887b2.jpg',
        'name': 'farisi-rainbow.jpg',
        'source': 'Muslim Heritage',
        'desc': 'Al-Farisi rainbow diagram from Tanqih al-Manazir',
    },
    {
        'url': 'https://sfile.chatglm.cn/images-ppt/07d837ee99bb.jpg',
        'name': 'farisi-2.jpg',
        'source': 'Muslim Heritage',
        'desc': 'Al-Farisi optical diagram showing rainbow formation',
    },
    # Camera obscura — historical illustrations
    {
        'url': 'https://sfile.chatglm.cn/images-ppt/fc9d1939f47e.jpg',
        'name': 'camera-obscura-1.jpg',
        'source': 'Camara Oscura World',
        'desc': 'Historical camera obscura illustration',
    },
    {
        'url': 'https://sfile.chatglm.cn/images-ppt/8b141ceb4a13.jpg',
        'name': 'camera-obscura-2.jpg',
        'source': 'Shutterstock (historical reproduction)',
        'desc': 'Engraving of camera obscura apparatus',
    },
    {
        'url': 'https://sfile.chatglm.cn/images-ppt/8b812bc9b439.jpg',
        'name': 'camera-obscura-3.jpg',
        'source': 'Alamy',
        'desc': 'Camera obscura illustration from historical book',
    },
    {
        'url': 'https://sfile.chatglm.cn/images-ppt/082d6bff657e.jpg',
        'name': 'camera-obscura-4.jpg',
        'source': 'Alamy',
        'desc': 'Historical diagram of camera obscura',
    },
    # Niepce — first photograph 1822/1827
    {
        'url': 'https://sfile.chatglm.cn/images-ppt/290ade8f8bc0.jpg',
        'name': 'niepce-le-gras.jpg',
        'source': 'PetaPixel (public domain reproduction)',
        'desc': 'Niepce\'s View from the Window at Le Gras (c. 1827), the oldest surviving photograph',
    },
    {
        'url': 'https://sfile.chatglm.cn/images-ppt/dd5666e41bfc.jpg',
        'name': 'niepce-2.jpg',
        'source': 'Birgit Buchart / Substack',
        'desc': 'Early photograph by Niepce',
    },
    # Da Vinci camera obscura sketches
    {
        'url': 'https://sfile.chatglm.cn/images-ppt/a25e21960d0e.jpg',
        'name': 'davinci-camera-1.jpg',
        'source': 'Alamy (historical reproduction)',
        'desc': 'Da Vinci notebook sketch of camera obscura',
    },
    {
        'url': 'https://sfile.chatglm.cn/images-ppt/d3975ed2510d.jpg',
        'name': 'davinci-camera-2.jpg',
        'source': 'HubPages',
        'desc': 'Da Vinci camera obscura diagram',
    },
    # Daguerre — daguerreotype 1839
    {
        'url': 'https://sfile.chatglm.cn/images-ppt/b35583e94e82.jpg',
        'name': 'daguerre-boulevard.jpg',
        'source': 'Khan Academy',
        'desc': 'Daguerre\'s Boulevard du Temple (1838), one of the earliest photographs of a person',
    },
    {
        'url': 'https://sfile.chatglm.cn/images-ppt/a2e52ad82526.jpg',
        'name': 'daguerre-2.jpg',
        'source': 'Alamy',
        'desc': 'Early daguerreotype photograph',
    },
    # Eye anatomy from manuscripts
    {
        'url': 'https://sfile.chatglm.cn/images-ppt/dfd4199ea518.jpg',
        'name': 'eye-anatomy-1.jpg',
        'source': 'The Renaissance Mathematicus',
        'desc': 'Medieval manuscript diagram of eye anatomy and vision',
    },
    {
        'url': 'https://sfile.chatglm.cn/images-ppt/2d2ec46c1f68.jpg',
        'name': 'eye-anatomy-2.jpg',
        'source': 'The Renaissance Mathematicus',
        'desc': 'Optical diagram showing eye and vision from medieval manuscript',
    },
]

ctx = ssl.create_default_context()
ctx.check_hostname = False
ctx.verify_mode = ssl.CERT_NONE

success = 0
for d in DOWNLOADS:
    out_path = os.path.join(OUT, d['name'])
    try:
        req = urllib.request.Request(d['url'], headers={'User-Agent': 'Mozilla/5.0'})
        with urllib.request.urlopen(req, context=ctx, timeout=30) as resp:
            data = resp.read()
        with open(out_path, 'wb') as f:
            f.write(data)
        size_kb = len(data) / 1024
        print(f"  + {d['name']}: {size_kb:.1f} KB ({d['source']})")
        success += 1
    except Exception as e:
        print(f"  X {d['name']}: {e}")

print(f"\nDownloaded {success}/{len(DOWNLOADS)} images to {OUT}")
