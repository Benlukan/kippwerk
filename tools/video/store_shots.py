import asyncio, urllib.parse, os
from playwright.async_api import async_playwright
S={'de':[('menu','Kippen. Verbinden.<br><em>Kettenreaktion.</em>','Das Puzzle, das du in 10 Sekunden verstehst'),
 ('play','Combos bis<br><em>ULTRA ×6</em>','Nachrutschende Steine lösen Ketten aus'),
 ('daily','Jeden Tag ein neues<br><em>Tagesspiel</em>','Gleiche Steine für alle – teile dein Ergebnis'),
 ('levels','<em>100 Etappen</em><br>in 10 Welten','Ziele, Felsen, Bosse und bis zu 3 Sterne'),
 ('scores','Bestenliste mit<br><em>Combos</em> &amp; Zügen','Dazu weltweite Ranglisten über Google Play Games'),
 ('streak','Halte deine<br>🔥 <em>Serie</em>','Abzeichen, Belohnungen &amp; 6 Designs'),
 ('8x8','<em>Endlos</em> auf<br>5×5 bis 8×8','Felsen und eine 6. Farbe für Profis')],
'en':[('menu','Tilt. Connect.<br><em>Chain reaction.</em>','The puzzle you get in 10 seconds'),
 ('play','Combos up to<br><em>ULTRA ×6</em>','Sliding stones set off chain reactions'),
 ('daily','A new <em>daily game</em><br>every day','Same stones for everyone – share your result'),
 ('levels','<em>100 stages</em><br>in 10 worlds','Goals, rocks, bosses and up to 3 stars'),
 ('scores','Leaderboards with<br><em>combos</em> &amp; moves','Plus global rankings via Google Play Games'),
 ('streak','Keep your<br>🔥 <em>streak</em> alive','Badges, rewards &amp; 6 themes'),
 ('8x8','<em>Endless</em> on<br>5×5 to 8×8','Rocks and a 6th color for pros')]}
async def main():
    async with async_playwright() as p:
        b=await p.chromium.launch(); pg=await b.new_page(viewport={'width':1080,'height':1920})
        for l,items in S.items():
            os.makedirs(f'out/{l}',exist_ok=True)
            for i,(img,h,t) in enumerate(items,1):
                q=urllib.parse.urlencode({'n':i,'h':h,'p':t,'img':f'm_{img}_{l}.png'})
                await pg.goto('http://127.0.0.1:8123/video/store_frame.html?'+q); await pg.wait_for_timeout(500)
                await pg.evaluate("document.fonts.ready")
                await pg.screenshot(path=f'out/{l}/{i}-{img}.png')
        await b.close()
asyncio.run(main())
