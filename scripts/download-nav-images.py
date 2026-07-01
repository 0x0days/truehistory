#!/usr/bin/env python3
"""Download real archival images for the NAVIGATION investigation."""
import urllib.request
import os
import ssl

OUT = '/home/z/my-project/public/images/sdam-nav'
os.makedirs(OUT, exist_ok=True)

DOWNLOADS = [
    # Mariam / Astrolabiya
    {'url': 'https://sfile.chatglm.cn/images-ppt/c36e0504538a.png', 'name': 'mariam-wellesley-1.png', 'source': 'Wellesley blogs', 'desc': 'Mariam al-Asturlabiya illustration'},
    {'url': 'https://sfile.chatglm.cn/images-ppt/d10d30e9c0c9.png', 'name': 'mariam-wellesley-2.png', 'source': 'Wellesley blogs', 'desc': 'Mariam al-Asturlabiya'},
    {'url': 'https://sfile.chatglm.cn/images-ppt/5c737404633d.jpeg', 'name': 'mariam-baytalfann-1.jpeg', 'source': 'Bayt Al Fann', 'desc': 'Astrolabe and Mariam illustration'},
    {'url': 'https://sfile.chatglm.cn/images-ppt/5bd0138e136f.jpeg', 'name': 'mariam-baytalfann-2.jpeg', 'source': 'Bayt Al Fann', 'desc': 'Medieval woman scientist illustration'},
    {'url': 'https://sfile.chatglm.cn/images-ppt/7268a92f0b16.jpeg', 'name': 'mariam-baytalfann-3.jpeg', 'source': 'Bayt Al Fann', 'desc': 'Astrolabe detail'},
    {'url': 'https://sfile.chatglm.cn/images-ppt/53a115b89a51.jpeg', 'name': 'mariam-baytalfann-4.jpeg', 'source': 'Bayt Al Fann', 'desc': 'Islamic scientific instrument'},
    # Astrolabes — surviving museum instruments
    {'url': 'https://sfile.chatglm.cn/images-ppt/f30d7fcce4e0.jpg', 'name': 'astrolabe-caravanserai-1.jpg', 'source': 'Caravanserai Substack', 'desc': 'Medieval Islamic astrolabe'},
    {'url': 'https://sfile.chatglm.cn/images-ppt/d926307858dd.jpg', 'name': 'astrolabe-sothebys.jpg', 'source': "Sotheby's", 'desc': 'Surviving medieval Islamic astrolabe'},
    {'url': 'https://sfile.chatglm.cn/images-ppt/d29f2694990b.jpeg', 'name': 'astrolabe-baytalfann.jpeg', 'source': 'Bayt Al Fann', 'desc': 'Astrolabe detail'},
    {'url': 'https://sfile.chatglm.cn/images-ppt/5113c6dd79b4.jpg', 'name': 'astrolabe-caravanserai-2.jpg', 'source': 'Caravanserai Substack', 'desc': 'Astrolabe reverse detail'},
    {'url': 'https://sfile.chatglm.cn/images-ppt/8125f52adbd0.jpg', 'name': 'astrolabe-erenow.jpg', 'source': 'Erenow', 'desc': 'Astrolabe historical illustration'},
    {'url': 'https://sfile.chatglm.cn/images-ppt/9650243f9d07.jpg', 'name': 'astrolabe-islamic-art.jpg', 'source': 'Islamic Art & Science', 'desc': 'Surviving Islamic astrolabe'},
    {'url': 'https://sfile.chatglm.cn/images-ppt/c888bbf22272.jpg', 'name': 'astrolabe-academia.jpg', 'source': 'Academia.edu', 'desc': 'Astrolabe manuscript diagram'},
    # Ibn Majid navigation manuscripts
    {'url': 'https://sfile.chatglm.cn/images-ppt/395fd767745b.jpg', 'name': 'ibnmajid-inlibris-1.jpg', 'source': 'Antiquariat INLIBRIS', 'desc': 'Ibn Majid navigation manuscript'},
    {'url': 'https://sfile.chatglm.cn/images-ppt/dfc5e2ae20bb.jpg', 'name': 'ibnmajid-inlibris-2.jpg', 'source': 'Antiquariat INLIBRIS', 'desc': 'Arabic navigation manuscript'},
    {'url': 'https://sfile.chatglm.cn/images-ppt/63c8819a0bfb.jpg', 'name': 'ibnmajid-inlibris-3.jpg', 'source': 'Antiquariat INLIBRIS', 'desc': 'Navigation treatise page'},
    {'url': 'https://sfile.chatglm.cn/images-ppt/b215ac7e984e.jpg', 'name': 'ibnmajid-rahalah.jpg', 'source': 'Al Rahalah', 'desc': 'Ibn Majid illustration'},
    {'url': 'https://sfile.chatglm.cn/images-ppt/38b60cec1779.jpg', 'name': 'ibnmajid-oer-1.jpg', 'source': 'OER Project', 'desc': 'Indian Ocean navigation'},
    {'url': 'https://sfile.chatglm.cn/images-ppt/a1e4f94efce7.jpg', 'name': 'ibnmajid-oer-2.jpg', 'source': 'OER Project', 'desc': 'Omani navigation illustration'},
    # Vasco da Gama
    {'url': 'https://sfile.chatglm.cn/images-ppt/a48d32795e81.jpg', 'name': 'vasco-alamy-1.jpg', 'source': 'Alamy', 'desc': 'Vasco da Gama voyage illustration'},
    {'url': 'https://sfile.chatglm.cn/images-ppt/bfb9cdaaa616.png', 'name': 'vasco-cambridge.png', 'source': 'Cambridge University Press', 'desc': 'Vasco da Gama historical source'},
    {'url': 'https://sfile.chatglm.cn/images-ppt/17be9876ed06.jpg', 'name': 'vasco-alamy-2.jpg', 'source': 'Alamy', 'desc': 'Vasco da Gama ship illustration'},
    # Columbus
    {'url': 'https://sfile.chatglm.cn/images-ppt/9746256e8a7a.jpg', 'name': 'columbus-alamy.jpg', 'source': 'Alamy', 'desc': 'Columbus voyage illustration'},
    {'url': 'https://sfile.chatglm.cn/images-ppt/ec951785d903.jpg', 'name': 'columbus-postcard.jpg', 'source': 'Postcard History', 'desc': 'Columbus ship historical'},
    # Portolan charts
    {'url': 'https://sfile.chatglm.cn/images-ppt/ad2f35598367.jpg', 'name': 'portolan-alamy.jpg', 'source': 'Alamy', 'desc': 'Portolan chart Mediterranean'},
    {'url': 'https://sfile.chatglm.cn/images-ppt/e7a20319abda.jpg', 'name': 'portolan-zmaps.jpg', 'source': 'Zmaps', 'desc': 'Carte Pisane portolan'},
    {'url': 'https://sfile.chatglm.cn/images-ppt/ca7500362392.jpg', 'name': 'portolan-cnrs.jpg', 'source': 'CNRS Images', 'desc': 'Medieval portolan chart detail'},
    {'url': 'https://sfile.chatglm.cn/images-ppt/7c1f0ef87cca.jpg', 'name': 'portolan-academia.jpg', 'source': 'Academia.edu', 'desc': 'Portolan chart reproduction'},
    # Kamal navigation
    {'url': 'https://sfile.chatglm.cn/images-ppt/0de29b45cbac.jpg', 'name': 'kamal-collector-1.jpg', 'source': 'TheCollector', 'desc': 'Kamal navigation instrument'},
    {'url': 'https://sfile.chatglm.cn/images-ppt/b718b121eb65.jpg', 'name': 'kamal-collector-2.jpg', 'source': 'TheCollector', 'desc': 'Kamal illustration'},
    # Ptolemy Geography
    {'url': 'https://sfile.chatglm.cn/images-ppt/9894d38a5948.jpg', 'name': 'ptolemy-geo-princeton.jpg', 'source': 'Princeton University Press', 'desc': 'Ptolemy Geography map'},
    {'url': 'https://sfile.chatglm.cn/images-ppt/b7da5d9b0907.jpg', 'name': 'ptolemy-geo-alamy.jpg', 'source': 'Alamy', 'desc': 'Ptolemy world map'},
    {'url': 'https://sfile.chatglm.cn/images-ppt/75a8fdb55916.jpg', 'name': 'ptolemy-geo-bodleian.jpg', 'source': 'Bodleian Libraries', 'desc': 'Ptolemy Geography manuscript'},
    # Sulayman al-Mahri
    {'url': 'https://sfile.chatglm.cn/images-ppt/650ac6a2cd13.jpg', 'name': 'mahri-academia.jpg', 'source': 'Academia.edu', 'desc': 'al-Mahri navigation manuscript'},
    {'url': 'https://sfile.chatglm.cn/images-ppt/a8cd867dd59d.png', 'name': 'mahri-cambridge-1.png', 'source': 'Cambridge University Press', 'desc': 'al-Mahri treatise page'},
    {'url': 'https://sfile.chatglm.cn/images-ppt/e8630c97c516.png', 'name': 'mahri-cambridge-2.png', 'source': 'Cambridge University Press', 'desc': 'al-Mahri navigation diagram'},
    {'url': 'https://sfile.chatglm.cn/images-ppt/0692acd59520.jpg', 'name': 'mahri-muslim-heritage.jpg', 'source': 'Muslim Heritage', 'desc': 'Arabic navigation manuscript'},
    # Scientific instruments
    {'url': 'https://sfile.chatglm.cn/images-ppt/686aca5a7ab1.jpeg', 'name': 'instruments-hsm.jpg', 'source': 'History of Science Museum', 'desc': 'Surviving Islamic scientific instruments'},
    {'url': 'https://sfile.chatglm.cn/images-ppt/12e6739ac3cf.jpg', 'name': 'instruments-renaissance.jpg', 'source': 'The Renaissance Mathematicus', 'desc': 'Medieval instrument illustration'},
    {'url': 'https://sfile.chatglm.cn/images-ppt/73682f112f83.jpg', 'name': 'instruments-hogendijk.jpg', 'source': 'J. Hogendijk index', 'desc': 'Islamic scientific instrument'},
    # Magellan
    {'url': 'https://sfile.chatglm.cn/images-ppt/342a6fafeff7.jpg', 'name': 'magellan-daily-sabah.jpg', 'source': 'Daily Sabah', 'desc': 'Magellan voyage illustration'},
    {'url': 'https://sfile.chatglm.cn/images-ppt/3f155af64a52.jpg', 'name': 'magellan-britannica.jpg', 'source': 'Britannica', 'desc': 'Magellan historical map'},
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
