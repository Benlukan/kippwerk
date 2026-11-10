import asyncio, random, json
from playwright.async_api import async_playwright
G='file:///home/claude/kippwerk/www/index.html'
async def settle(pg):
    while (await pg.evaluate('__kw.state'))['busy']: await pg.wait_for_timeout(20)
async def fresh(b,ls):
    ctx=await b.new_context(viewport={'width':412,'height':844},device_scale_factor=2.5); pg=await ctx.new_page()
    await pg.goto(G); await pg.evaluate("localStorage.clear();localStorage.setItem('kippwerk_helpseen','1');"+ls); await pg.reload(); await pg.wait_for_timeout(500); return pg
async def main():
    async with async_playwright() as p:
        b=await p.chromium.launch(); random.seed(4)
        # a) Level-Karte
        lp=json.dumps({str(i+1):(3 if i%4 else 2) for i in range(23)})
        pg=await fresh(b,f"localStorage.setItem('kippwerk_levels','{lp}')")
        await pg.click('#levelBtn'); await pg.wait_for_timeout(400); await pg.screenshot(path='m_levels.png')
        # b) Tagesrätsel-Ergebnis mit Serie
        st=json.dumps({"cur":12,"best":12,"last":None,"shields":1,"prot":[],"adDay":None,"ms":[3,7],"seen":[3,7]})
        pg=await fresh(b,f"localStorage.setItem('kippwerk_streak',JSON.stringify(Object.assign({st},{{last:(()=>{{const d=new Date(Date.now()-864e5);return d.getFullYear()+'-'+String(d.getMonth()+1).padStart(2,'0')+'-'+String(d.getDate()).padStart(2,'0')}})()}})));localStorage.setItem('kippwerk_name','Lena');localStorage.setItem('kippwerk_settings',JSON.stringify({{speed:'fast'}}))")
        await pg.click('#dailyBtn')
        best=None
        for i in range(40):
            if (await pg.evaluate('__kw.state'))['over']: break
            await pg.evaluate(f"__kw.move('{random.choice('LDLDR')}')"); await settle(pg)
        await pg.wait_for_timeout(1800); await pg.screenshot(path='m_daily.png')
        # c) 8x8 mitten im Spiel
        pg=await fresh(b,"localStorage.setItem('kippwerk_settings',JSON.stringify({size:'8'}))")
        await pg.click('#endlessBtn')
        for i in range(14): await pg.evaluate(f"__kw.move('{random.choice('LDLR')}')"); await settle(pg)
        await pg.wait_for_timeout(1300); await pg.screenshot(path='m_8x8.png')
        # d) Serien-Seite
        st2=json.dumps({"cur":13,"best":13,"last":"TODAY","shields":1,"prot":[],"adDay":None,"ms":[3,7],"seen":[3,7]})
        pg=await fresh(b,f"const t=(()=>{{const d=new Date();return d.getFullYear()+'-'+String(d.getMonth()+1).padStart(2,'0')+'-'+String(d.getDate()).padStart(2,'0')}})();for(let i=0;i<7;i++){{const x=new Date(Date.now()-i*864e5);localStorage.setItem('kippwerk_daily_'+x.getFullYear()+'-'+String(x.getMonth()+1).padStart(2,'0')+'-'+String(x.getDate()).padStart(2,'0'),'{{}}')}};localStorage.setItem('kippwerk_streak','{st2}'.replace('TODAY',t));localStorage.setItem('kippwerk_settings',JSON.stringify({{theme:'neon'}}))")
        await pg.click('#menuStreak'); await pg.wait_for_timeout(500); await pg.screenshot(path='m_streak.png')
        # e) Spiel im Design Ozean (Level-Modus mit Zielen)
        pg=await fresh(b,"localStorage.setItem('kippwerk_settings',JSON.stringify({theme:'ozean'}));localStorage.setItem('kippwerk_levels',JSON.stringify({1:3,2:3,3:3,4:3}))")
        await pg.click('#levelBtn'); await pg.click('.lvbtn[data-n="5"]'); await pg.click('#lvlMain')
        for i in range(5): await pg.evaluate(f"__kw.move('{random.choice('LDR')}')"); await settle(pg)
        await pg.wait_for_timeout(1300); await pg.screenshot(path='m_ozean.png')
        await b.close()
asyncio.run(main())
