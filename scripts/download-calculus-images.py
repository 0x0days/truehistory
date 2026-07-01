#!/usr/bin/env python3
"""Download real archival images for the CALCULUS investigation + colonialism angle."""
import urllib.request
import os
import ssl

OUT = '/home/z/my-project/public/images/sdam-calculus'
os.makedirs(OUT, exist_ok=True)

DOWNLOADS = [
    # Newton Principia 1687
    {
        'url': 'https://sfile.chatglm.cn/images-ppt/c1936c548bdb.jpg',
        'name': 'principia-guardian.jpg',
        'source': 'The Guardian',
        'desc': 'Principia Mathematica title page',
    },
    {
        'url': 'https://sfile.chatglm.cn/images-ppt/86dc091ed626.jpg',
        'name': 'principia-abebooks.jpg',
        'source': 'AbeBooks',
        'desc': 'Principia Mathematica 1687 first edition',
    },
    {
        'url': 'https://sfile.chatglm.cn/images-ppt/c95183d26eec.jpg',
        'name': 'principia-corpus.jpg',
        'source': 'Corpus Newtonicum',
        'desc': 'Newton manuscript page',
    },
    # Leibniz calculus 1684
    {
        'url': 'https://sfile.chatglm.cn/images-ppt/3cd4b738cf8d.jpg',
        'name': 'leibniz-auction.jpg',
        'source': 'Auction Calendar',
        'desc': 'Leibniz Acta Eruditorum 1684',
    },
    {
        'url': 'https://sfile.chatglm.cn/images-ppt/321b6da3f6f9.jpg',
        'name': 'leibniz-oak-knoll.jpg',
        'source': 'Oak Knoll Books',
        'desc': 'Leibniz calculus manuscript reproduction',
    },
    {
        'url': 'https://sfile.chatglm.cn/images-ppt/36e7272f9f69.jpg',
        'name': 'leibniz-christies.jpg',
        'source': "Christie's",
        'desc': 'Leibniz original manuscript page',
    },
    # Ibn al-Haytham math manuscripts
    {
        'url': 'https://sfile.chatglm.cn/images-ppt/3354f4378102.jpeg',
        'name': 'haytham-math-muslim-heritage.jpg',
        'source': 'Muslim Heritage',
        'desc': 'Ibn al-Haytham mathematical manuscript',
    },
    {
        'url': 'https://sfile.chatglm.cn/images-ppt/ecb696b79da2.jpg',
        'name': 'haytham-math-academia.jpg',
        'source': 'Academia.edu',
        'desc': 'Medieval Arabic scientific manuscript page',
    },
    {
        'url': 'https://sfile.chatglm.cn/images-ppt/8aceb7c7a0a0.jpg',
        'name': 'haytham-math-renaissance.jpg',
        'source': 'The Renaissance Mathematicus',
        'desc': 'Medieval Arabic mathematics manuscript',
    },
    # Sharaf al-Din al-Tusi equations
    {
        'url': 'https://sfile.chatglm.cn/images-ppt/a270160e949d.jpg',
        'name': 'sharaf-muslim-heritage-1.jpg',
        'source': 'Muslim Heritage',
        'desc': 'Sharaf al-Din al-Tusi equations manuscript',
    },
    {
        'url': 'https://sfile.chatglm.cn/images-ppt/ac289cb432bf.jpg',
        'name': 'sharaf-muslim-heritage-2.jpg',
        'source': 'Muslim Heritage',
        'desc': 'Medieval Arabic algebra manuscript',
    },
    {
        'url': 'https://sfile.chatglm.cn/images-ppt/17970a738f02.jpg',
        'name': 'sharaf-muslim-heritage-3.jpg',
        'source': 'Muslim Heritage',
        'desc': 'Medieval Arabic scientific manuscript page',
    },
    # Madhava Kerala school
    {
        'url': 'https://sfile.chatglm.cn/images-ppt/75adfcace12d.jpg',
        'name': 'madhava-scribd.jpg',
        'source': 'Scribd',
        'desc': 'Kerala school mathematics manuscript',
    },
    {
        'url': 'https://sfile.chatglm.cn/images-ppt/0521737491bb.jpeg',
        'name': 'madhava-medium.jpg',
        'source': 'Medium',
        'desc': 'Madhava infinite series illustration',
    },
    # Napoleon Egypt 1798 — Description de l'Egypte
    {
        'url': 'https://sfile.chatglm.cn/images-ppt/0f837afb8dfd.jpg',
        'name': 'napoleon-auction.jpg',
        'source': 'Auction Calendar',
        'desc': 'Description de l\'Egypte publication',
    },
    {
        'url': 'https://sfile.chatglm.cn/images-ppt/dd0128432bb9.jpg',
        'name': 'napoleon-sothebys.jpg',
        'source': "Sotheby's",
        'desc': 'Description de l\'Egypte — French expedition manuscript',
    },
    {
        'url': 'https://sfile.chatglm.cn/images-ppt/4fedfedefea8.jpg',
        'name': 'napoleon-thinking-3d-1.jpg',
        'source': 'Thinking 3D',
        'desc': 'French expedition scholar illustration',
    },
    {
        'url': 'https://sfile.chatglm.cn/images-ppt/e26ef53306f6.jpg',
        'name': 'napoleon-thinking-3d-2.jpg',
        'source': 'Thinking 3D',
        'desc': 'Description de l\'Egypte plate',
    },
    # Fall of Granada 1492 / library destruction
    {
        'url': 'https://sfile.chatglm.cn/images-ppt/a7bf3788ac2a.jpg',
        'name': 'granada-invictus-1.jpg',
        'source': 'INVICTUS',
        'desc': 'Fall of Granada 1492 historical illustration',
    },
    {
        'url': 'https://sfile.chatglm.cn/images-ppt/c9348382d461.jpg',
        'name': 'granada-invictus-2.jpg',
        'source': 'INVICTUS',
        'desc': 'Reconquista illustration',
    },
    {
        'url': 'https://sfile.chatglm.cn/images-ppt/0f7768748f60.jpg',
        'name': 'granada-academia.jpg',
        'source': 'Academia.edu',
        'desc': 'Andalusian manuscript illustration',
    },
    {
        'url': 'https://sfile.chatglm.cn/images-ppt/3ecfddbf141a.jpg',
        'name': 'granada-collector.jpg',
        'source': 'TheCollector',
        'desc': 'Historical illustration of medieval Spain',
    },
    # Vatican Library Arabic manuscripts
    {
        'url': 'https://sfile.chatglm.cn/images-ppt/5a08e3ec997f.jpg',
        'name': 'vatican-ibiblio-1.jpg',
        'source': 'Ibiblio',
        'desc': 'Vatican Library Arabic manuscript',
    },
    {
        'url': 'https://sfile.chatglm.cn/images-ppt/b15018ad1dfe.jpg',
        'name': 'vatican-iqs.jpg',
        'source': 'International Qur\'anic Studies',
        'desc': 'Vatican Library Islamic manuscript',
    },
    {
        'url': 'https://sfile.chatglm.cn/images-ppt/65d9a36c0547.jpg',
        'name': 'vatican-open-book.jpg',
        'source': 'Open Book Publishers',
        'desc': 'Vatican Library Arabic manuscript collection',
    },
    {
        'url': 'https://sfile.chatglm.cn/images-ppt/7bc36ae7ea9c.jpg',
        'name': 'vatican-ibiblio-2.jpg',
        'source': 'Ibiblio',
        'desc': 'Vatican Library medieval manuscript',
    },
    # Archimedes palimpsest (Greek precursor)
    {
        'url': 'https://sfile.chatglm.cn/images-ppt/23917efd5c06.jpg',
        'name': 'archimedes-smithsonian.jpg',
        'source': 'Smithsonian Magazine',
        'desc': 'Archimedes Palimpsest',
    },
    {
        'url': 'https://sfile.chatglm.cn/images-ppt/e411702b7124.jpg',
        'name': 'archimedes-physorg.jpg',
        'source': 'Phys.org',
        'desc': 'Archimedes Palimpsest imaging',
    },
    # British Library colonial-era manuscripts
    {
        'url': 'https://sfile.chatglm.cn/images-ppt/1cf919dc9a5b.jpg',
        'name': 'british-bayerische.jpg',
        'source': 'Bayerische Staatsbibliothek',
        'desc': 'Colonial-era acquired Arabic manuscript',
    },
    {
        'url': 'https://sfile.chatglm.cn/images-ppt/95bf00a4cd78.jpg',
        'name': 'british-academia.jpg',
        'source': 'Academia.edu',
        'desc': 'Acquired Persian/Arabic manuscript',
    },
    # Crusades / Constantinople
    {
        'url': 'https://sfile.chatglm.cn/images-ppt/55c66082f8c6.jpg',
        'name': 'crusades-byzantine.jpg',
        'source': 'byzantinemanuscripts (WordPress)',
        'desc': 'Byzantine manuscript of Crusades era',
    },
    {
        'url': 'https://sfile.chatglm.cn/images-ppt/ad1596555aea.jpg',
        'name': 'crusades-alamy.jpg',
        'source': 'Alamy',
        'desc': 'Medieval Crusades illustration',
    },
    {
        'url': 'https://sfile.chatglm.cn/images-ppt/96290da9e4a6.jpg',
        'name': 'crusades-alamy-2.jpg',
        'source': 'Alamy',
        'desc': 'Sack of Constantinople 1204 illustration',
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
