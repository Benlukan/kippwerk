# Standbilder aus dem echten Spiel (412×844 bei 2,5× = 1030×2110) – je Sprache
import asyncio, json, sys
from playwright.async_api import async_playwright
from vt import SEED_JS
G='http://127.0.0.1:8123/kippwerk/www/index.html'
DAY="(()=>{const d=new Date();return d.getFullYear()+'-'+String(d.getMonth()+1).padStart(2,'0')+'-'+String(d.getDate()).padStart(2,'0')})()"
async def settle(pg):
    while (await pg.evaluate('__kw.state'))['busy']: await pg.wait_for_timeout(20)
async def kippi(pg):
    await pg.evaluate("__kw.fly.away(true)"); await pg.evaluate("__kw.fly.visit()")
    for _ in range(80):
        if await pg.evaluate("__kw.fly.state")=='sit': break
        await pg.wait_for_timeout(50)
    await pg.wait_for_timeout(250)
async def fresh(b,lang,ls='',hash=''):
    ctx=await b.new_context(viewport={'width':412,'height':844},device_scale_factor=2.5,locale='de-DE' if lang=='de' else 'en-US')
    await ctx.add_init_script(SEED_JS)
    pg=await ctx.new_page(); await pg.goto(G+hash)
    await pg.evaluate("localStorage.clear();localStorage.setItem('kippwerk_helpseen','1');localStorage.setItem('kippwerk_name','Lena');"
        f"localStorage.setItem('kippwerk_settings',JSON.stringify({{lang:'{lang}',musicVol:0,sfxVol:0,vibe:'off'}}));"
        f"const t={DAY};localStorage.setItem('kippwerk_streak',JSON.stringify({{cur:13,best:13,last:t,shields:1,prot:[],adDay:null,ms:[3,7],seen:[3,7]}}));"
        "localStorage.setItem('kippwerk_lives','2');for(let i=1;i<14;i++){const x=new Date(Date.now()-i*864e5);localStorage.setItem('kippwerk_daily_'+x.getFullYear()+'-'+String(x.getMonth()+1).padStart(2,'0')+'-'+String(x.getDate()).padStart(2,'0'),JSON.stringify({no:0,score:2000+i*97,chain:2,hist:[],full:false}))}"+ls)
    await pg.reload(); await pg.wait_for_timeout(700); return pg
async def main(lang):
    async with async_playwright() as p:
        b=await p.chromium.launch(); out=lambda n:f'm_{n}_{lang}.png'
        lp=json.dumps({str(i+1):(3 if i%4 else 2) for i in range(23)})
        # Menü
        pg=await fresh(b,lang,f"localStorage.setItem('kippwerk_levels','{lp}')")
        await pg.wait_for_timeout(500); await kippi(pg); await pg.screenshot(path=out('menu'))
        # Tutorial mit Kippi (erster Start)
        tp=await (await b.new_context(viewport={'width':412,'height':844},device_scale_factor=2.5,locale='de-DE' if lang=='de' else 'en-US')).new_page()
        await tp.goto(G); await tp.evaluate(f"localStorage.clear();localStorage.setItem('kippwerk_settings',JSON.stringify({{lang:'{lang}',musicVol:0,sfxVol:0,vibe:'off'}}))")
        await tp.reload(); await tp.wait_for_timeout(2200); await tp.screenshot(path=out('tutorial'))
        # Etappen-Karte
        await pg.click('#levelBtn'); await pg.wait_for_timeout(500); await pg.screenshot(path=out('levels'))
        # Spiel mit Combo (Seed wie im Video)
        best=json.load(open('best.json'))
        pg=await fresh(b,lang,'',f"#seed={best['seed']}")
        await pg.click('#endlessBtn'); await pg.wait_for_timeout(300)
        for m in best['moves'][:9]: await pg.evaluate(f"__kw.move('{m}')"); await settle(pg); await pg.wait_for_timeout(60)
        await pg.wait_for_timeout(600); await kippi(pg)
        await pg.evaluate(f"__kw.move('{best['moves'][9]}')")
        for _ in range(300):
            if await pg.evaluate("!!document.querySelector('.banner.combo.c4')"): break
            await pg.wait_for_timeout(10)
        await pg.wait_for_timeout(70); await pg.screenshot(path=out("play"))
        await settle(pg); await pg.wait_for_timeout(300)
        print(lang,'combo',await pg.evaluate('__kw.state.combos'))
        # 8×8
        pg=await fresh(b,lang,"localStorage.setItem('kippwerk_settings',JSON.stringify(Object.assign(JSON.parse(localStorage.getItem('kippwerk_settings')),{size:'8'})))",'#seed=7')
        await pg.click('#endlessBtn')
        for m in 'LDLRDLDRLDLDRL': await pg.evaluate(f"__kw.move('{m}')"); await settle(pg)
        await pg.wait_for_timeout(1300); await kippi(pg); await pg.screenshot(path=out('8x8'))
        # Tagesspiel-Ergebnis
        pg=await fresh(b,lang,'','#seed=3')
        await pg.click('#dailyBtn')
        for i in range(40):
            if (await pg.evaluate('__kw.state'))['over']: break
            await pg.evaluate(f"__kw.move('{'LDLDRDLU'[i%8]}')"); await settle(pg)
        await pg.wait_for_timeout(1800)
        if await pg.is_visible('#nameRow'): await pg.evaluate("document.getElementById('nameRow').style.display='none'")
        await pg.screenshot(path=out('daily'))
        # Bestenliste mit Combo / Zügen / Steinen
        E=[('Lena',23710,9,5,212,488,'15.11.26'),('Tom',18690,8,6,168,411,'16.11.26'),('Mia',15240,7,4,151,362,'12.11.26'),('Jonas',11080,6,4,124,301,'14.11.26'),
           ('Ben',9350,5,3,108,262,'10.11.26'),('Ella',7720,5,3,96,231,'13.11.26'),('Noah',5460,4,3,72,170,'17.11.26')]
        en=[dict(name=n,pid='p'+str(i),score=s,level=l,chain=c,moves=mv,cleared=cl,date=d,size=6) for i,(n,s,l,c,mv,cl,d) in enumerate(E)]
        pg=await fresh(b,lang,f"localStorage.setItem('kippwerk_scores',JSON.stringify({json.dumps({'endless':en,'daily':[]})}))")
        await pg.click('#menuScores'); await pg.wait_for_timeout(500); await pg.screenshot(path=out('scores'))
        # Serie
        pg=await fresh(b,lang,"localStorage.setItem('kippwerk_awards',JSON.stringify({d1:2,d3:5,w3:1,d10:9}))")
        await pg.click('#menuStreak'); await pg.wait_for_timeout(600); await pg.screenshot(path=out('streak'))
        await b.close()
for l in (sys.argv[1:] or ['de','en']): asyncio.run(main(l))
