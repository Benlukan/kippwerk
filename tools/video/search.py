import asyncio, random, json, sys
from playwright.async_api import async_playwright
from vt import VT, SEED_JS
G='file:///home/claude/kippwerk/www/index.html'
async def trial(b,seed,moves):
    ctx=await b.new_context(viewport={'width':412,'height':844}); await ctx.add_init_script(SEED_JS)
    pg=await ctx.new_page(); await pg.goto(G+'#seed=%d'%seed)
    await pg.evaluate("localStorage.setItem('kippwerk_helpseen','1')")
    cdp=await ctx.new_cdp_session(pg); vt=VT(cdp); await vt.start(); await vt.adv(500)
    await pg.evaluate("document.getElementById('endlessBtn').click()"); await vt.adv(300)
    chains=[]
    for d in moves:
        await pg.evaluate(f"void __kw.move('{d}')"); await vt.adv(2500)
        st=await pg.evaluate('__kw.state'); chains.append(st['bestChain'])
        if st['over']: break
    await ctx.close(); return chains,st['score']
async def main():
    async with async_playwright() as p:
        b=await p.chromium.launch(); best=None; rng=random.Random(7)
        for seed in range(1,int(sys.argv[1])):
            mv=[rng.choice('LRUD') for _ in range(14)]
            # Bevorzugt zwei Richtungen abwechselnd – erzeugt mehr Ketten
            if seed%2: mv=[rng.choice('LD') for _ in range(14)]
            ch,sc=await trial(b,seed,mv)
            # Ziel: früh eine hohe Kette
            val=max(ch)*100-([i for i,c in enumerate(ch) if c==max(ch)][0] if ch else 0)+sc/1000
            if best is None or val>best[0]: best=(val,seed,''.join(mv),ch,sc); print(best,flush=True)
        json.dump({'seed':best[1],'moves':best[2],'chains':best[3]},open('best.json','w'))
        await b.close()
if __name__=="__main__": asyncio.run(main())
