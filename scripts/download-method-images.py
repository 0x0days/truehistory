#!/usr/bin/env python3
"""Download real archival images for the SCIENTIFIC METHOD investigation."""
import urllib.request
import os
import ssl

OUT = '/home/z/my-project/public/images/sdam-method'
os.makedirs(OUT, exist_ok=True)

DOWNLOADS = [
    # Ibn al-Haytham / Doubts on Ptolemy / scientific method manuscripts
    {
        'url': 'https://sfile.chatglm.cn/images-ppt/99ce8ea5de2a.jpg',
        'name': 'doubts-muslim-heritage.jpg',
        'source': 'Muslim Heritage',
        'desc': 'Ibn al-Haytham manuscript page',
    },
    {
        'url': 'https://sfile.chatglm.cn/images-ppt/eaaa03901f89.jpg',
        'name': 'doubts-renaissance.jpg',
        'source': 'The Renaissance Mathematicus',
        'desc': 'Medieval Arabic scientific manuscript',
    },
    {
        'url': 'https://sfile.chatglm.cn/images-ppt/c814c3017329.jpg',
        'name': 'doubts-renaissance-2.jpg',
        'source': 'The Renaissance Mathematicus',
        'desc': 'Scientific manuscript page',
    },
    {
        'url': 'https://sfile.chatglm.cn/images-ppt/f9e7dab35ba1.jpg',
        'name': 'britannica-alhazen.jpg',
        'source': 'Britannica',
        'desc': 'Alhazen illustration from Britannica',
    },
    {
        'url': 'https://sfile.chatglm.cn/images-ppt/dfd4199ea518.jpg',
        'name': 'eye-anatomy-method.jpg',
        'source': 'The Renaissance Mathematicus',
        'desc': 'Eye anatomy diagram from De Aspectibus',
    },
    # Roger Bacon Opus Majus (transmission chain)
    {
        'url': 'https://sfile.chatglm.cn/images-ppt/49f3580338d3.jpg',
        'name': 'roger-bacon-james-lind.jpg',
        'source': 'The James Lind Library',
        'desc': 'Roger Bacon manuscript reproduction',
    },
    {
        'url': 'https://sfile.chatglm.cn/images-ppt/5f58aa079f6d.jpg',
        'name': 'roger-bacon-abebooks.jpg',
        'source': 'AbeBooks',
        'desc': 'Medieval Latin manuscript page',
    },
    {
        'url': 'https://sfile.chatglm.cn/images-ppt/c94355ecf21d.jpg',
        'name': 'roger-bacon-abebooks-2.jpg',
        'source': 'AbeBooks',
        'desc': 'Medieval Latin scientific manuscript',
    },
    # Francis Bacon Novum Organum 1620
    {
        'url': 'https://sfile.chatglm.cn/images-ppt/323ebad38c11.jpg',
        'name': 'francis-bacon-britannica.jpg',
        'source': 'Britannica',
        'desc': 'Francis Bacon engraving',
    },
    {
        'url': 'https://sfile.chatglm.cn/images-ppt/98cb695a4522.jpg',
        'name': 'novum-organum-edward-worth.jpg',
        'source': 'Edward Worth Library',
        'desc': 'Novum Organum title page or front matter',
    },
    {
        'url': 'https://sfile.chatglm.cn/images-ppt/6bb8bd87735d.jpg',
        'name': 'novum-organum-edward-worth-2.jpg',
        'source': 'Edward Worth Library',
        'desc': 'Novum Organum page',
    },
    {
        'url': 'https://sfile.chatglm.cn/images-ppt/b39e9ffe44af.jpg',
        'name': 'novum-organum-sophia.jpg',
        'source': 'SOPHIA Rare Books',
        'desc': 'Novum Organum rare book page',
    },
    # Descartes Discourse on Method 1637
    {
        'url': 'https://sfile.chatglm.cn/images-ppt/5b9b7bdb5560.jpg',
        'name': 'descartes-renaissance.jpg',
        'source': 'The Renaissance Mathematicus',
        'desc': 'Descartes manuscript or title page',
    },
    {
        'url': 'https://sfile.chatglm.cn/images-ppt/04c93f3098fe.jpg',
        'name': 'descartes-world-history.jpg',
        'source': 'World History Encyclopedia',
        'desc': 'Descartes historical illustration',
    },
    {
        'url': 'https://sfile.chatglm.cn/images-ppt/7f24a317cdb4.jpg',
        'name': 'descartes-alamy.jpg',
        'source': 'Alamy',
        'desc': 'Descartes historical engraving',
    },
    # Robert Grosseteste (early transmission)
    {
        'url': 'https://sfile.chatglm.cn/images-ppt/ba7a47aa4980.jpg',
        'name': 'grosseteste-sophia.jpg',
        'source': 'SOPHIA Rare Books',
        'desc': 'Robert Grosseteste manuscript',
    },
    {
        'url': 'https://sfile.chatglm.cn/images-ppt/0ff6e5c5e793.jpg',
        'name': 'grosseteste-aeon.jpg',
        'source': 'Aeon',
        'desc': 'Grosseteste scientific illustration',
    },
    # Al-Razi (clinical trial — other Muslims section)
    {
        'url': 'https://sfile.chatglm.cn/images-ppt/bacbec332092.jpg',
        'name': 'alrazi-nlm-1.jpg',
        'source': 'National Library of Medicine',
        'desc': 'Al-Razi medical manuscript',
    },
    {
        'url': 'https://sfile.chatglm.cn/images-ppt/e4e8a243163d.jpg',
        'name': 'alrazi-nlm-2.jpg',
        'source': 'National Library of Medicine',
        'desc': 'Al-Razi medical text page',
    },
    {
        'url': 'https://sfile.chatglm.cn/images-ppt/ef8255a9bce6.jpg',
        'name': 'alrazi-muslim-heritage.jpg',
        'source': 'Muslim Heritage',
        'desc': 'Al-Razi manuscript illustration',
    },
    {
        'url': 'https://sfile.chatglm.cn/images-ppt/77d8ba10f70d.jpg',
        'name': 'alrazi-muslim-heritage-2.jpg',
        'source': 'Muslim Heritage',
        'desc': 'Medieval Islamic medicine illustration',
    },
    # Medieval laboratory / experiment scene
    {
        'url': 'https://sfile.chatglm.cn/images-ppt/ca35df310967.jpg',
        'name': 'laboratory-museum-crush.jpg',
        'source': 'Museum Crush',
        'desc': 'Historical scientific apparatus',
    },
    {
        'url': 'https://sfile.chatglm.cn/images-ppt/c413cbc6eda4.jpg',
        'name': 'laboratory-renaissance.jpg',
        'source': 'The Renaissance Mathematicus',
        'desc': 'Historical scientific instrument illustration',
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
