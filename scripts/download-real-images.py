#!/usr/bin/env python3
"""Download the best real archival images for the SDAM site."""
import urllib.request
import os
import ssl

OUT = '/home/z/my-project/public/images/sdam-real'
os.makedirs(OUT, exist_ok=True)

# Carefully selected real archival images based on search results
# Each image is from a credible institutional source
DOWNLOADS = [
    # Mizan al-Hikma / al-Khazini manuscript diagrams (from Muslim Heritage - the leading academic site on Islamic science)
    {
        'url': 'https://sfile.chatglm.cn/images-ppt/aaad8b4a25b0.jpg',
        'name': 'mizan-diagram-1.jpg',
        'source': 'Muslim Heritage',
        'desc': 'Diagram from Kitab Mizan al-Hikma (Book of the Balance of Wisdom) by al-Khazini',
    },
    {
        'url': 'https://sfile.chatglm.cn/images-ppt/401cc26645e6.jpg',
        'name': 'mizan-diagram-2.jpg',
        'source': 'Muslim Heritage',
        'desc': 'Page from Kitab Mizan al-Hikma showing the balance instrument',
    },
    {
        'url': 'https://sfile.chatglm.cn/images-ppt/8ca4fac7f4db.jpg',
        'name': 'mizan-diagram-3.jpg',
        'source': 'Muslim Heritage',
        'desc': 'Manuscript page from Kitab Mizan al-Hikma',
    },
    {
        'url': 'https://sfile.chatglm.cn/images-ppt/d8fca1569b65.jpg',
        'name': 'mizan-diagram-4.jpg',
        'source': 'Muslim Heritage',
        'desc': 'Scientific diagram from a medieval Arabic mechanics manuscript',
    },
    {
        'url': 'https://sfile.chatglm.cn/images-ppt/8693d5785757.jpg',
        'name': 'mizan-diagram-5.jpg',
        'source': 'Muslim Heritage',
        'desc': 'Page from a medieval Arabic scientific manuscript',
    },
    # al-Biruni imagery - manuscript illustration / scholarly depiction
    {
        'url': 'https://sfile.chatglm.cn/images-ppt/1d87358f7f10.jpg',
        'name': 'biruni-manuscript.jpg',
        'source': 'Muslim Heritage',
        'desc': 'al-Biruni in scholarly setting, from a medieval manuscript illustration',
    },
    {
        'url': 'https://sfile.chatglm.cn/images-ppt/66b11b8cfbb8.jpg',
        'name': 'biruni-illustration.jpg',
        'source': 'Muslim Heritage',
        'desc': 'Depiction of al-Biruni at astronomical work',
    },
    {
        'url': 'https://sfile.chatglm.cn/images-ppt/1e7a39a5d23e.jpg',
        'name': 'biruni-scholar.jpg',
        'source': 'OpenEdition Journals',
        'desc': 'Academic illustration of al-Biruni',
    },
    # Astrolabes — real museum photographs from the Met
    {
        'url': 'https://sfile.chatglm.cn/images-ppt/e8449e3f74ab.jpg',
        'name': 'astrolabe-met-1.jpg',
        'source': 'The Metropolitan Museum of Art',
        'desc': 'Surviving medieval Islamic astrolabe (Metropolitan Museum of Art)',
    },
    {
        'url': 'https://sfile.chatglm.cn/images-ppt/ae88f6bf6dbc.jpg',
        'name': 'astrolabe-met-2.jpg',
        'source': 'The Metropolitan Museum of Art',
        'desc': 'Detail of a medieval Islamic astrolabe (Metropolitan Museum of Art)',
    },
    {
        'url': 'https://sfile.chatglm.cn/images-ppt/35853c51542b.jpg',
        'name': 'astrolabe-muslim-heritage.jpg',
        'source': 'Muslim Heritage',
        'desc': 'Medieval astrolabe from the Islamic Golden Age',
    },
    # Arabic scientific manuscripts with diagrams
    {
        'url': 'https://sfile.chatglm.cn/images-ppt/3a1ede68c9a8.jpg',
        'name': 'manuscript-1.jpg',
        'source': 'Alamy',
        'desc': 'Medieval Arabic scientific manuscript page with geometric diagrams',
    },
    {
        'url': 'https://sfile.chatglm.cn/images-ppt/8098ebfc09be.jpg',
        'name': 'manuscript-2.jpg',
        'source': 'Alamy',
        'desc': 'Page from a medieval Arabic scientific manuscript',
    },
    {
        'url': 'https://sfile.chatglm.cn/images-ppt/8d36f7825f62.jpg',
        'name': 'manuscript-sothebys.jpg',
        'source': "Sotheby's",
        'desc': 'Medieval Arabic scientific manuscript (Sotheby\'s auction record)',
    },
    {
        'url': 'https://sfile.chatglm.cn/images-ppt/ecb696b79da2.jpg',
        'name': 'manuscript-3.jpg',
        'source': 'Academia.edu',
        'desc': 'Medieval Arabic scientific manuscript page',
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
        print(f"  ✓ {d['name']}: {size_kb:.1f} KB ({d['source']})")
        success += 1
    except Exception as e:
        print(f"  ✗ {d['name']}: {e}")

print(f"\nDownloaded {success}/{len(DOWNLOADS)} images to {OUT}")
