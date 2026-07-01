#!/usr/bin/env python3
"""Download real archival images for the MEDICINE investigation."""
import urllib.request, os, ssl

OUT = '/home/z/my-project/public/images/sdam-med'
os.makedirs(OUT, exist_ok=True)

DOWNLOADS = [
    # Ibn Sina / Canon of Medicine
    {'url': 'https://sfile.chatglm.cn/images-ppt/658d637ba59e.jpg', 'name': 'ibnsina-alamy-1.jpg', 'source': 'Alamy', 'desc': 'Ibn Sina Canon of Medicine manuscript'},
    {'url': 'https://sfile.chatglm.cn/images-ppt/3c438f8dd24a.jpg', 'name': 'ibnsina-alamy-2.jpg', 'source': 'Alamy', 'desc': 'Avicenna medical manuscript'},
    {'url': 'https://sfile.chatglm.cn/images-ppt/e1d63eb4dd24.jpg', 'name': 'canon-facsimile-1.jpg', 'source': 'Facsimile Finder', 'desc': 'Canon of Medicine facsimile page'},
    {'url': 'https://sfile.chatglm.cn/images-ppt/601615477b05.jpg', 'name': 'canon-facsimile-2.jpg', 'source': 'Facsimile Finder', 'desc': 'Canon of Medicine anatomical illustration'},
    {'url': 'https://sfile.chatglm.cn/images-ppt/8ee5b4db2ff0.jpg', 'name': 'ibnsina-pazzo.jpg', 'source': 'Pazzo Books', 'desc': 'Ibn Sina medical text'},
    {'url': 'https://sfile.chatglm.cn/images-ppt/bc7b6afa825d.jpg', 'name': 'ibnsina-alamy-3.jpg', 'source': 'Alamy', 'desc': 'Avicenna illustration'},
    # Al-Razi
    {'url': 'https://sfile.chatglm.cn/images-ppt/f89a7f634f4c.png', 'name': 'alrazi-history-info.png', 'source': 'History of Information', 'desc': 'al-Razi medical text'},
    {'url': 'https://sfile.chatglm.cn/images-ppt/6128a30dea24.jpg', 'name': 'alrazi-nls.jpg', 'source': 'Medieval Manuscripts at the National Library', 'desc': 'al-Razi manuscript page'},
    {'url': 'https://sfile.chatglm.cn/images-ppt/e4e8a243163d.jpg', 'name': 'alrazi-nlm.jpg', 'source': 'National Library of Medicine', 'desc': 'al-Razi medical manuscript'},
    {'url': 'https://sfile.chatglm.cn/images-ppt/aa6aff4b20a3.jpg', 'name': 'alrazi-muslim-heritage-1.jpg', 'source': 'Muslim Heritage', 'desc': 'al-Razi illustration'},
    {'url': 'https://sfile.chatglm.cn/images-ppt/d75d35f8389e.jpg', 'name': 'alrazi-james-lind.jpg', 'source': 'The James Lind Library', 'desc': 'al-Razi clinical method'},
    {'url': 'https://sfile.chatglm.cn/images-ppt/90d78ec06830.jpg', 'name': 'alrazi-muslim-heritage-2.jpg', 'source': 'Muslim Heritage', 'desc': 'al-Razi medical scene'},
    {'url': 'https://sfile.chatglm.cn/images-ppt/27daf420593a.jpg', 'name': 'alrazi-muslim-heritage-3.jpg', 'source': 'Muslim Heritage', 'desc': 'Islamic medical illustration'},
    # Bimaristan / Islamic hospital
    {'url': 'https://sfile.chatglm.cn/images-ppt/b5a612c72b96.jpg', 'name': 'bimaristan-muslim-heritage.jpg', 'source': 'Muslim Heritage', 'desc': 'Islamic hospital illustration'},
    {'url': 'https://sfile.chatglm.cn/images-ppt/1600e22b6ee5.jpg', 'name': 'bimaristan-discover-1.jpg', 'source': 'Discover Islamic Art Museum', 'desc': 'Bimaristan medical illustration'},
    {'url': 'https://sfile.chatglm.cn/images-ppt/1e6a9cec94ba.jpg', 'name': 'bimaristan-medical-news.jpg', 'source': 'Medical News Today', 'desc': 'Islamic hospital scene'},
    {'url': 'https://sfile.chatglm.cn/images-ppt/a76eb3b09c4f.jpg', 'name': 'bimaristan-damascus.jpg', 'source': 'Visit Damascus Syria', 'desc': 'Damascus Bimaristan'},
    {'url': 'https://sfile.chatglm.cn/images-ppt/9193d2ded195.jpg', 'name': 'bimaristan-history-geo.jpg', 'source': 'History Geographic', 'desc': 'Islamic hospital historical'},
    {'url': 'https://sfile.chatglm.cn/images-ppt/59bebe2d2cca.jpg', 'name': 'bimaristan-discover-2.jpg', 'source': 'Discover Islamic Art Museum', 'desc': 'Medical scene from Islamic world'},
    # Canon of Medicine Latin translation
    {'url': 'https://sfile.chatglm.cn/images-ppt/cbed815d26f2.jpg', 'name': 'canon-latin-britannica.jpg', 'source': 'Britannica', 'desc': 'Canon of Medicine Latin edition'},
    {'url': 'https://sfile.chatglm.cn/images-ppt/942e061c2e4f.jpg', 'name': 'canon-latin-facsimile.jpg', 'source': 'Facsimile Finder', 'desc': 'Latin Canon of Medicine'},
    {'url': 'https://sfile.chatglm.cn/images-ppt/bb71ef72d706.jpg', 'name': 'canon-latin-alamy.jpg', 'source': 'Alamy', 'desc': 'Latin Avicenna manuscript'},
    # Surgical instruments
    {'url': 'https://sfile.chatglm.cn/images-ppt/653cc4a60fe0.jpg', 'name': 'surgical-alamy-1.jpg', 'source': 'Alamy', 'desc': 'Medieval surgical instruments'},
    {'url': 'https://sfile.chatglm.cn/images-ppt/5183c961fb3d.jpg', 'name': 'surgical-alamy-2.jpg', 'source': 'Alamy', 'desc': 'Islamic surgical instruments'},
    {'url': 'https://sfile.chatglm.cn/images-ppt/7504e5077116.jpg', 'name': 'surgical-alamy-3.jpg', 'source': 'Alamy', 'desc': 'Medieval medical tools'},
    {'url': 'https://sfile.chatglm.cn/images-ppt/03ea8f63dac8.jpg', 'name': 'surgical-the-past.jpg', 'source': 'The Past', 'desc': 'Historical surgical instruments'},
    # European medicine (for contrast)
    {'url': 'https://sfile.chatglm.cn/images-ppt/132ffe74bae2.jpg', 'name': 'european-med-history.jpg', 'source': 'History.com', 'desc': 'European medieval medicine'},
    {'url': 'https://sfile.chatglm.cn/images-ppt/382f38cdb76f.jpg', 'name': 'european-med-alamy.jpg', 'source': 'Alamy', 'desc': 'Medieval bloodletting illustration'},
    {'url': 'https://sfile.chatglm.cn/images-ppt/16bd68d03077.jpg', 'name': 'european-med-collector.jpg', 'source': 'TheCollector', 'desc': 'Four humors illustration'},
    {'url': 'https://sfile.chatglm.cn/images-ppt/4845d8aa9449.jpg', 'name': 'european-med-britannica.jpg', 'source': 'Britannica', 'desc': 'Medieval European medical illustration'},
    # Hippocrates / Galen (Greek precursor)
    {'url': 'https://sfile.chatglm.cn/images-ppt/ed97a98beab5.png', 'name': 'hippocrates-nlm.png', 'source': 'National Library of Medicine', 'desc': 'Hippocrates/Galen manuscript'},
    {'url': 'https://sfile.chatglm.cn/images-ppt/8d7ad175f824.jpg', 'name': 'galen-quadriformis-1.jpg', 'source': 'Quadriformisratio', 'desc': 'Galen medical text'},
    {'url': 'https://sfile.chatglm.cn/images-ppt/8353055483fa.jpg', 'name': 'hippocrates-alamy.jpg', 'source': 'Alamy', 'desc': 'Hippocratic illustration'},
    # Plague
    {'url': 'https://sfile.chatglm.cn/images-ppt/b309c5133278.jpg', 'name': 'plague-alamy.jpg', 'source': 'Alamy', 'desc': 'Medieval plague illustration'},
    {'url': 'https://sfile.chatglm.cn/images-ppt/059bb2c9e785.jpg', 'name': 'plague-alamy-2.jpg', 'source': 'Alamy', 'desc': 'Black Death historical'},
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
        print(f"  + {d['name']}: {len(data)/1024:.1f} KB ({d['source']})")
        success += 1
    except Exception as e:
        print(f"  X {d['name']}: {e}")

print(f"\nDownloaded {success}/{len(DOWNLOADS)} images to {OUT}")
