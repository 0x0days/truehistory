#!/usr/bin/env python3
"""Download real archival images for the ASTRONOMY investigation."""
import urllib.request
import os
import ssl

OUT = '/home/z/my-project/public/images/sdam-astro'
os.makedirs(OUT, exist_ok=True)

DOWNLOADS = [
    # al-Sufi Book of Fixed Stars (Andromeda, constellations)
    {'url': 'https://sfile.chatglm.cn/images-ppt/7ff7885d0a42.jpg', 'name': 'sufi-sothebys.jpg', 'source': "Sotheby's", 'desc': 'al-Sufi Book of Fixed Stars manuscript'},
    {'url': 'https://sfile.chatglm.cn/images-ppt/7086cc5f67ae.jpg', 'name': 'sufi-met-1.jpg', 'source': 'The Metropolitan Museum of Art', 'desc': 'Constellation illustration from al-Sufi tradition'},
    {'url': 'https://sfile.chatglm.cn/images-ppt/ddf2d1824a62.jpg', 'name': 'sufi-met-2.jpg', 'source': 'The Metropolitan Museum of Art', 'desc': 'Constellation from Book of Fixed Stars tradition'},
    {'url': 'https://sfile.chatglm.cn/images-ppt/62bfeb2964b7.jpg', 'name': 'sufi-met-3.jpg', 'source': 'The Metropolitan Museum of Art', 'desc': 'Medieval Islamic astronomical illustration'},
    {'url': 'https://sfile.chatglm.cn/images-ppt/70237ef6ce27.jpg', 'name': 'sufi-met-4.jpg', 'source': 'The Metropolitan Museum of Art', 'desc': 'Constellation figure from Arabic astronomy'},
    {'url': 'https://sfile.chatglm.cn/images-ppt/f5d04b664a54.jpg', 'name': 'sufi-academia.jpg', 'source': 'Academia.edu', 'desc': 'al-Sufi manuscript page'},
    {'url': 'https://sfile.chatglm.cn/images-ppt/beb5ece59ef5.jpg', 'name': 'sufi-ziereis.jpg', 'source': 'Ziereis Facsimiles', 'desc': 'Book of Fixed Stars facsimile'},
    # al-Battani astronomy
    {'url': 'https://sfile.chatglm.cn/images-ppt/d4647cbf274d.jpeg', 'name': 'battani-medium-1.jpeg', 'source': 'Kaaf Seen - Medium', 'desc': 'al-Battani astronomical manuscript'},
    {'url': 'https://sfile.chatglm.cn/images-ppt/56b26a838089.jpg', 'name': 'battani-light-islam.jpg', 'source': 'Light of Islam', 'desc': 'Islamic astronomy manuscript'},
    {'url': 'https://sfile.chatglm.cn/images-ppt/6864db563a58.jpeg', 'name': 'battani-medium-2.jpeg', 'source': 'Kaaf Seen - Medium', 'desc': 'Arabic astronomy manuscript page'},
    {'url': 'https://sfile.chatglm.cn/images-ppt/b0a865ec03bd.jpg', 'name': 'battani-academia.jpg', 'source': 'Academia.edu', 'desc': 'Medieval Arabic astronomical tables'},
    {'url': 'https://sfile.chatglm.cn/images-ppt/7b7ab058d8d7.jpeg', 'name': 'battani-medium-3.jpeg', 'source': 'Kaaf Seen - Medium', 'desc': 'Arabic astronomy illustration'},
    # Tusi Couple / Maragheh
    {'url': 'https://sfile.chatglm.cn/images-ppt/fe856c2f1224.jpg', 'name': 'tusi-nature-1.jpg', 'source': 'Nature', 'desc': 'Tusi Couple diagram'},
    {'url': 'https://sfile.chatglm.cn/images-ppt/9479a08e60c2.jpg', 'name': 'tusi-nature-2.jpg', 'source': 'Nature', 'desc': 'Maragheh astronomical diagram'},
    {'url': 'https://sfile.chatglm.cn/images-ppt/b42cc2874b2c.jpg', 'name': 'tusi-alamy.jpg', 'source': 'Alamy', 'desc': 'Medieval Islamic astronomical manuscript'},
    {'url': 'https://sfile.chatglm.cn/images-ppt/d5c70ba8389d.jpg', 'name': 'tusi-oer.jpg', 'source': 'OER Project', 'desc': 'Maragheh observatory illustration'},
    # Ibn al-Shatir Damascus astronomy
    {'url': 'https://sfile.chatglm.cn/images-ppt/bd79ec007b31.jpg', 'name': 'shatir-physorg.jpg', 'source': 'Phys.org', 'desc': 'Ibn al-Shatir astronomical model'},
    {'url': 'https://sfile.chatglm.cn/images-ppt/2761156d7f27.jpg', 'name': 'shatir-sothebys-1.jpg', 'source': "Sotheby's", 'desc': 'Damascus astronomical manuscript'},
    {'url': 'https://sfile.chatglm.cn/images-ppt/5e429e0e9dba.jpg', 'name': 'shatir-sothebys-2.jpg', 'source': "Sotheby's", 'desc': 'Medieval Arabic astronomy page'},
    {'url': 'https://sfile.chatglm.cn/images-ppt/84c22720e2dd.jpg', 'name': 'shatir-muslim-heritage.jpg', 'source': 'Muslim Heritage', 'desc': 'Ibn al-Shatir manuscript'},
    {'url': 'https://sfile.chatglm.cn/images-ppt/f763802169ff.jpg', 'name': 'shatir-renaissance.jpg', 'source': 'The Renaissance Mathematicus', 'desc': 'Arabic astronomical diagram'},
    # Copernicus De Revolutionibus 1543
    {'url': 'https://sfile.chatglm.cn/images-ppt/4c01d8b45c40.jpg', 'name': 'copernicus-christies.jpg', 'source': "Christie's", 'desc': 'De Revolutionibus title page'},
    {'url': 'https://sfile.chatglm.cn/images-ppt/54210313a15a.jpg', 'name': 'copernicus-ziereis-1.jpg', 'source': 'Ziereis Facsimiles', 'desc': 'De Revolutionibus 1543 page'},
    {'url': 'https://sfile.chatglm.cn/images-ppt/f7c74a317b01.jpg', 'name': 'copernicus-auction.jpg', 'source': 'Auction Calendar', 'desc': 'Copernicus manuscript'},
    {'url': 'https://sfile.chatglm.cn/images-ppt/0f34d57a8c36.jpg', 'name': 'copernicus-ziereis-2.jpg', 'source': 'Ziereis Facsimiles', 'desc': 'Copernicus diagram'},
    # Galileo Sidereus Nuncius 1610
    {'url': 'https://sfile.chatglm.cn/images-ppt/913fa54c99b0.jpg', 'name': 'galileo-alamy.jpg', 'source': 'Alamy', 'desc': 'Sidereus Nuncius 1610 page'},
    {'url': 'https://sfile.chatglm.cn/images-ppt/d96d22aa6e3f.jpg', 'name': 'galileo-linda-hall.jpg', 'source': 'Linda Hall Library', 'desc': 'Galileo moon drawings'},
    {'url': 'https://sfile.chatglm.cn/images-ppt/29948b7268f4.jpg', 'name': 'galileo-alamy-2.jpg', 'source': 'Alamy', 'desc': 'Galileo manuscript page'},
    # Ulugh Beg Samarkand
    {'url': 'https://sfile.chatglm.cn/images-ppt/ce41beca67f6.jpg', 'name': 'ulughbeg-astronomy.jpg', 'source': 'Astronomy Magazine', 'desc': 'Samarkand observatory illustration'},
    {'url': 'https://sfile.chatglm.cn/images-ppt/72c3db74271c.jpg', 'name': 'ulughbeg-academic.jpg', 'source': 'en-academic.com', 'desc': 'Ulugh Beg observatory'},
    {'url': 'https://sfile.chatglm.cn/images-ppt/c49deb952ccd.jpg', 'name': 'ulughbeg-travelserai.jpg', 'source': 'TravelSerai', 'desc': 'Samarkand observatory ruins'},
    # Maragheh observatory
    {'url': 'https://sfile.chatglm.cn/images-ppt/3c85a03151a3.jpg', 'name': 'maragheh-tripadvisor.jpg', 'source': 'Tripadvisor', 'desc': 'Maragheh observatory site'},
    {'url': 'https://sfile.chatglm.cn/images-ppt/a420f258113e.jpg', 'name': 'maragheh-muslim-heritage.jpg', 'source': 'Muslim Heritage', 'desc': 'Maragheh observatory illustration'},
    # Fall of Constantinople 1453
    {'url': 'https://sfile.chatglm.cn/images-ppt/971dd66746bf.jpg', 'name': 'constantinople-qalam.jpg', 'source': 'Qalam Global', 'desc': 'Fall of Constantinople 1453'},
    {'url': 'https://sfile.chatglm.cn/images-ppt/3416a62c7c7d.jpg', 'name': 'constantinople-collector.jpg', 'source': 'TheCollector', 'desc': 'Constantinople 1453 illustration'},
    {'url': 'https://sfile.chatglm.cn/images-ppt/607b7ff05e4e.jpg', 'name': 'constantinople-unravel.jpg', 'source': 'The Unravel', 'desc': '1453 historical illustration'},
    # Toledo translation school
    {'url': 'https://sfile.chatglm.cn/images-ppt/599020bdf33f.jpg', 'name': 'toledo-sothebys.jpg', 'source': "Sotheby's", 'desc': 'Medieval Latin translation manuscript'},
    {'url': 'https://sfile.chatglm.cn/images-ppt/1c4d5449715f.jpg', 'name': 'toledo-muslim-heritage.jpg', 'source': 'Muslim Heritage', 'desc': 'Translation school illustration'},
    {'url': 'https://sfile.chatglm.cn/images-ppt/b81a13332bd6.jpeg', 'name': 'toledo-constantinus.jpg', 'source': 'constantinusafricanus.com', 'desc': 'Medieval translation movement'},
    # Ptolemy Almagest
    {'url': 'https://sfile.chatglm.cn/images-ppt/76bbadbd06e9.jpg', 'name': 'ptolemy-alamy.jpg', 'source': 'Alamy', 'desc': 'Ptolemy Almagest manuscript'},
    {'url': 'https://sfile.chatglm.cn/images-ppt/1cf895ad8d97.jpg', 'name': 'ptolemy-britannica.jpg', 'source': 'Britannica', 'desc': 'Almagest geocentric model'},
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
