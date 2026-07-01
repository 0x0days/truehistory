#!/usr/bin/env python3
"""Download real archival images for the UNIVERSITIES investigation."""
import urllib.request, os, ssl

OUT = '/home/z/my-project/public/images/sdam-uni'
os.makedirs(OUT, exist_ok=True)

DOWNLOADS = [
    # Fatima al-Fehri / al-Qarawiyyin University
    {'url': 'https://sfile.chatglm.cn/images-ppt/c86d465d7e37.jpg', 'name': 'fatima-cnn.jpg', 'source': 'CNN', 'desc': 'Fatima al-Fehri depiction'},
    {'url': 'https://sfile.chatglm.cn/images-ppt/4bfcb8edfd79.png', 'name': 'fatima-world-history.png', 'source': 'World History Encyclopedia', 'desc': 'Fatima al-Fehri illustration'},
    {'url': 'https://sfile.chatglm.cn/images-ppt/b2d0525a1bcf.jpeg', 'name': 'fatima-cairo-scene.jpeg', 'source': 'Cairo Scene', 'desc': 'Fatima al-Fehri illustration'},
    # Al-Qarawiyyin University — the building (survives to this day)
    {'url': 'https://sfile.chatglm.cn/images-ppt/0b563ca0f0e4.jpg', 'name': 'qarawiyyin-atlas.jpg', 'source': 'Atlas Obscura', 'desc': 'Al-Qarawiyyin University interior'},
    {'url': 'https://sfile.chatglm.cn/images-ppt/cb567ce9d4d4.jpg', 'name': 'qarawiyyin-mainly.jpg', 'source': 'Mainly Museums', 'desc': 'Al-Qarawiyyin courtyard'},
    {'url': 'https://sfile.chatglm.cn/images-ppt/26a106c82929.jpg', 'name': 'qarawiyyin-oasis.jpg', 'source': 'Oasis Aventure', 'desc': 'Al-Qarawiyyin architecture'},
    {'url': 'https://sfile.chatglm.cn/images-ppt/31516c030322.jpg', 'name': 'qarawiyyin-alamy-1.jpg', 'source': 'Alamy', 'desc': 'Al-Qarawiyyin mosque interior'},
    {'url': 'https://sfile.chatglm.cn/images-ppt/10135c651280.jpg', 'name': 'qarawiyyin-alamy-2.jpg', 'source': 'Alamy', 'desc': 'Al-Qarawiyyin courtyard detail'},
    # Medieval Islamic woman scholar manuscripts
    {'url': 'https://sfile.chatglm.cn/images-ppt/2bc6ea40af0f.jpg', 'name': 'woman-scholar-christies.jpg', 'source': "Christie's", 'desc': 'Medieval Islamic manuscript with woman scholar'},
    {'url': 'https://sfile.chatglm.cn/images-ppt/1d87358f7f10.jpg', 'name': 'woman-scholar-muslim-heritage.jpg', 'source': 'Muslim Heritage', 'desc': 'Medieval Islamic scholarly scene'},
    {'url': 'https://sfile.chatglm.cn/images-ppt/b22f39af9339.jpg', 'name': 'woman-scholar-alamy.jpg', 'source': 'Alamy', 'desc': 'Medieval Islamic manuscript illumination'},
    # Witch burning / European persecution of women
    {'url': 'https://sfile.chatglm.cn/images-ppt/59fac694a03f.jpg', 'name': 'witch-burning-alamy-1.jpg', 'source': 'Alamy', 'desc': 'Witch burning historical illustration'},
    {'url': 'https://sfile.chatglm.cn/images-ppt/93559a09a48a.jpg', 'name': 'witch-burning-alamy-2.jpg', 'source': 'Alamy', 'desc': 'Witch trial historical illustration'},
    {'url': 'https://sfile.chatglm.cn/images-ppt/f692e1fa2b70.jpg', 'name': 'witch-meisterdrucke.jpg', 'source': 'MeisterDrucke', 'desc': 'Witch execution historical painting'},
    {'url': 'https://sfile.chatglm.cn/images-ppt/816d4c02ebb1.jpg', 'name': 'witch-britannica.jpg', 'source': 'Britannica', 'desc': 'Witch trial historical engraving'},
    {'url': 'https://sfile.chatglm.cn/images-ppt/e58a99a95731.jpg', 'name': 'witch-hubpages.jpg', 'source': 'HubPages', 'desc': 'Witch persecution historical'},
    # Inquisition / persecution of scientists
    {'url': 'https://sfile.chatglm.cn/images-ppt/b46194905f25.jpg', 'name': 'inquisition-conversation-1.jpg', 'source': 'The Conversation', 'desc': 'Inquisition historical illustration'},
    {'url': 'https://sfile.chatglm.cn/images-ppt/33a3d12084d0.jpg', 'name': 'inquisition-conversation-2.jpg', 'source': 'The Conversation', 'desc': 'Medieval torture/persecution'},
    {'url': 'https://sfile.chatglm.cn/images-ppt/fdab9f41c71b.jpg', 'name': 'inquisition-natgeo.jpg', 'source': 'National Geographic', 'desc': 'Inquisition historical'},
    {'url': 'https://sfile.chatglm.cn/images-ppt/5362c45a005f.jpg', 'name': 'inquisition-history.jpg', 'source': 'History.com', 'desc': 'Inquisition historical illustration'},
    # Galileo trial
    {'url': 'https://sfile.chatglm.cn/images-ppt/56c9ad5a9b42.jpg', 'name': 'galileo-trial-pbs.jpg', 'source': 'PBS', 'desc': 'Galileo trial illustration'},
    {'url': 'https://sfile.chatglm.cn/images-ppt/5c3836560b6e.jpg', 'name': 'galileo-trial-magis.jpg', 'source': 'Magis Center', 'desc': 'Galileo before Inquisition'},
    # Madrasa / Islamic education manuscripts
    {'url': 'https://sfile.chatglm.cn/images-ppt/ddb5be129ed3.jpg', 'name': 'madrasa-ucla-1.jpg', 'source': 'UCLA Library', 'desc': 'Islamic education manuscript'},
    {'url': 'https://sfile.chatglm.cn/images-ppt/f91259d0be78.jpg', 'name': 'madrasa-ucla-2.jpg', 'source': 'UCLA Library', 'desc': 'Medieval Islamic scholarly text'},
    {'url': 'https://sfile.chatglm.cn/images-ppt/3354f4378102.jpeg', 'name': 'madrasa-muslim-heritage.jpeg', 'source': 'Muslim Heritage', 'desc': 'Islamic education illustration'},
    {'url': 'https://sfile.chatglm.cn/images-ppt/0d4e02bbb00a.jpg', 'name': 'madrasa-muslim-heritage-2.jpg', 'source': 'Muslim Heritage', 'desc': 'Medieval Islamic manuscript page'},
    {'url': 'https://sfile.chatglm.cn/images-ppt/c19f2e7fdba5.jpg', 'name': 'madrasa-ucla-3.jpg', 'source': 'UCLA Library', 'desc': 'Islamic scholarly manuscript'},
    # Lubna of Cordoba
    {'url': 'https://sfile.chatglm.cn/images-ppt/8ba742626bb4.jpg', 'name': 'lubna-women-1000ad.jpg', 'source': 'Women of 1000 AD', 'desc': 'Lubna of Cordoba depiction'},
    {'url': 'https://sfile.chatglm.cn/images-ppt/c3d2c5104066.jpeg', 'name': 'lubna-medium.jpeg', 'source': 'Kaaf Seen Medium', 'desc': 'Lubna of Cordoba illustration'},
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
