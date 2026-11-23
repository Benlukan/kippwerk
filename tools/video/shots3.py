# Standbilder für die Store-Screenshots v2.0 (412×844 bei 2,5× = 1030×2110) – je Sprache
# Wie shots2.py, dazu: neues Menü mit Top 5, weltweite Rangliste (simulierte Google-Anbindung), Sammlung „Felder“, 10×10
import asyncio, json, sys
from playwright.async_api import async_playwright
from vt import SEED_JS
G='http://127.0.0.1:8123/kippwerk/www/index.html'
DAY="(()=>{const d=new Date();return d.getFullYear()+'-'+String(d.getMonth()+1).padStart(2,'0')+'-'+String(d.getDate()).padStart(2,'0')})()"
VER=None
# simulierte Google-Play-Games-Anbindung für Top 5 und weltweite Rangliste (nur für die Bilder)
MOCK="""(()=>{const t=new Date(Date.now()-8*36e5).toISOString().slice(0,10).replace(/-/g,'');
const P=[['Mia',3420,6,92],['Lena',3180,5,88],['Tom',2950,5,81],['Jonas',2710,4,77],['Ella',2490,4,70],['Noah',2260,3,66],['Ben',2010,3,61],['Sofia',1840,3,57]];
const E=P.map(([n,s,c,cl],i)=>({rank:i+1,name:n,score:s,playerId:n==='Lena'?'g-me':'p'+i,tag:`c${c}m40s${cl}d${t}`}));
const PG={initialize:async()=>{},signIn:async()=>({signedIn:true,player:{playerId:'g-me',displayName:'Lena'}}),submitScore:async()=>{},
 loadTopScores:async(o)=>({entries:E.slice(0,o.maxResults||5),me:E[1]}),unlockAchievement:async()=>{},incrementAchievement:async()=>{},
 showLeaderboard:async()=>{},showAllLeaderboards:async()=>{},addListener:()=>({remove(){}})};
window.Capacitor={isNativePlatform:()=>true,getPlatform:()=>'android',Plugins:{PlayGames:PG},registerPlugin:()=>new Proxy({},{get:(t,k)=>k==='then'?undefined:()=>Promise.resolve({})})};})();"""
async def settle(pg):
    while (await pg.evaluate('__kw.state'))['busy']: await pg.wait_for_timeout(20)
async def kippi(pg):
    await pg.evaluate("__kw.fly.away(true)"); await pg.evaluate("__kw.fly.visit()")
    for _ in range(80):
        if await pg.evaluate("__kw.fly.state")=='sit': break
        await pg.wait_for_timeout(50)
    await pg.wait_for_timeout(250)
async def fresh(b,lang,ls='',hash='',online=False):
    ctx=await b.new_context(viewport={'width':412,'height':844},device_scale_factor=2.5,locale='de-DE' if lang=='de' else 'en-US')
    await ctx.add_init_script(SEED_JS)
    if online: await ctx.add_init_script(MOCK)
    pg=await ctx.new_page(); await pg.goto(G+hash)
    ver=await pg.evaluate("document.querySelector('.foot,footer')?.textContent.match(/v(\\d+\\.\\d+\\.\\d+)/)?.[1]||''")
    await pg.evaluate("localStorage.clear();localStorage.setItem('kippwerk_helpseen','1');localStorage.setItem('kippwerk_name','Lena');"
        f"localStorage.setItem('kippwerk_seenver','{ver}');"
        f"localStorage.setItem('kippwerk_settings',JSON.stringify({{lang:'{lang}',musicVol:0,sfxVol:0,vibe:'off'}}));"
        f"const t={DAY};localStorage.setItem('kippwerk_streak',JSON.stringify({{cur:13,best:13,last:t,shields:1,prot:[],adDay:null,ms:[3,7],seen:[3,7]}}));"
        "localStorage.setItem('kippwerk_lives','2');"+ls)
    await pg.reload(); await pg.wait_for_timeout(900)
    if await pg.is_visible('#newsOv'): await pg.evaluate("document.getElementById('newsOv').classList.add('hidden')")
    await pg.add_style_tag(content='.toast{display:none!important}')   # keine Abzeichen-Meldungen im Bild
    return pg
SET=lambda o:"localStorage.setItem('kippwerk_settings',JSON.stringify(Object.assign(JSON.parse(localStorage.getItem('kippwerk_settings')),%s)));"%json.dumps(o)
async def main(lang):
    async with async_playwright() as p:
        b=await p.chromium.launch(); out=lambda n:f'm_{n}_{lang}.png'
        lp=json.dumps({str(i+1):(3 if i%4 else 2) for i in range(23)})
        # 1 Menü (neu, mit Top 5)
        pg=await fresh(b,lang,f"localStorage.setItem('kippwerk_levels','{lp}');localStorage.setItem('kippwerk_unlocks',JSON.stringify(['board:4','board:9']));",online=True)
        await pg.wait_for_timeout(2500); await pg.screenshot(path=out('menu'))
        # 2 Spiel mit Combo (Seed wie im Video)
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
        # 3 Tutorial mit Kippi (erster Start)
        tp=await (await b.new_context(viewport={'width':412,'height':844},device_scale_factor=2.5,locale='de-DE' if lang=='de' else 'en-US')).new_page()
        await tp.goto(G); await tp.evaluate(f"localStorage.clear();localStorage.setItem('kippwerk_settings',JSON.stringify({{lang:'{lang}',musicVol:0,sfxVol:0,vibe:'off'}}))")
        await tp.reload(); await tp.wait_for_timeout(2200); await tp.screenshot(path=out('tutorial'))
        # 4 Tagesspiel-Ergebnis
        pg=await fresh(b,lang,'','#seed=3')
        await pg.click('#dailyBtn')
        for i in range(40):
            if (await pg.evaluate('__kw.state'))['over']: break
            await pg.evaluate(f"__kw.move('{'LDLDRDLU'[i%8]}')"); await settle(pg)
        await pg.wait_for_timeout(1800)
        if await pg.is_visible('#nameRow'): await pg.evaluate("document.getElementById('nameRow').style.display='none'")
        await pg.screenshot(path=out('daily'))
        # 5 Weltweite Rangliste (Tagesspiel heute)
        pg=await fresh(b,lang,'',online=True); await pg.wait_for_timeout(1500)
        await pg.click('#menuScores'); await pg.wait_for_timeout(300); await pg.click('#tabDaily'); await pg.wait_for_timeout(200)
        await pg.click('#periodTabs [data-p=day]'); await pg.wait_for_timeout(1200); await pg.screenshot(path=out('world'))
        # 6 Sammlung → Felder
        pg=await fresh(b,lang,"localStorage.setItem('kippwerk_unlocks',JSON.stringify(['board:4','board:9','board:6h','board:7h']));localStorage.setItem('kippwerk_maxlv',JSON.stringify({'5':22,'6':34,'7':31,'8':27,'9':18}));")
        await pg.evaluate("__kw.openCollection('boards')"); await pg.wait_for_timeout(700); await pg.screenshot(path=out('boards'))
        # 7 10×10
        pg=await fresh(b,lang,"localStorage.setItem('kippwerk_unlocks',JSON.stringify(['board:4','board:9','board:10']));"+SET({'size':'10'}),'#seed=11')
        await pg.click('#endlessBtn'); await pg.wait_for_timeout(300)
        for i in range(60):
            if (await pg.evaluate('__kw.filled'))>=58 or (await pg.evaluate('__kw.state'))['over']: break
            await pg.evaluate(f"__kw.move('{'LDRDLDRULDLDRDLU'[i%16]}')"); await settle(pg)
        await pg.wait_for_timeout(1300); await kippi(pg); await pg.screenshot(path=out('10x10'))
        # 8 Etappen-Karte
        pg=await fresh(b,lang,f"localStorage.setItem('kippwerk_levels','{lp}')")
        await pg.click('#levelBtn'); await pg.wait_for_timeout(600); await pg.screenshot(path=out('levels'))
        await b.close()
for l in (sys.argv[1:] or ['de','en']): asyncio.run(main(l))
