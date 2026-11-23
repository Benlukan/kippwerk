import asyncio, urllib.parse, os
from playwright.async_api import async_playwright
S={'de':[('menu','Kippen. Verbinden.<br><em>Kettenreaktion.</em>','Das Puzzle mit Kippi, der kleinen Fliege'),
 ('play','Combos bis<br><em>ULTRA ×6</em>','Nachrutschende Steine lösen Ketten aus'),
 ('levels','<em>100 Etappen</em><br>auf der Karte','Kippi zeigt dir, wo du stehst – oben wartet das Tor'),
 ('profile','Dein <em>Profil</em>','Bestwerte, Vitrine und beste Platzierungen'),
 ('bonus','Jeden Tag ein<br><em>Bonus</em>','Extraleben, Rahmen, Titel und Kippi-Outfits'),
 ('daily','Jeden Tag ein neues<br><em>Tagesspiel</em>','Gleiche Steine für alle – teile dein Ergebnis'),
 ('world','<em>Weltweite</em><br>Bestenlisten','Tag, Woche und Gesamt – über Google Play Games'),
 ('10x10','<em>Endlos</em> bis<br>10×10','Neue Felder freischalten – auch mit Hindernissen')],
'en':[('menu','Tilt. Connect.<br><em>Chain reaction.</em>','The puzzle with Kippi, the little fly'),
 ('play','Combos up to<br><em>ULTRA ×6</em>','Sliding stones set off chain reactions'),
 ('levels','<em>100 stages</em><br>on the map','Kippi shows where you are – the gate waits on top'),
 ('profile','Your <em>profile</em>','Best stats, showcase and top placements'),
 ('bonus','A <em>bonus</em><br>every day','Extra lives, frames, titles and Kippi outfits'),
 ('daily','A new <em>daily game</em><br>every day','Same stones for everyone – share your result'),
 ('world','<em>Worldwide</em><br>leaderboards','Day, week and all time – via Google Play Games'),
 ('10x10','<em>Endless</em> up to<br>10×10','Unlock new boards – with obstacles too')]}
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
