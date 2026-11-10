import asyncio, subprocess, sys, os, json
from playwright.async_api import async_playwright
from vt import SEED_JS
TW=open('/home/claude/video/timeweb.js').read()
FPS=30
async def render(scene, out=None, probe=None):
    async with async_playwright() as p:
        b=await p.chromium.launch(); ctx=await b.new_context(viewport={'width':1080,'height':1920})
        await ctx.add_init_script(TW); await ctx.add_init_script(SEED_JS)
        pg=await ctx.new_page(); errs=[]; pg.on('pageerror',lambda e:errs.append(str(e)))
        await pg.goto('http://127.0.0.1:8123/video/stage.html'); await pg.wait_for_timeout(600)
        await pg.evaluate("document.fonts.ready")
        d=await pg.evaluate(f"SCENES[{scene}].d")
        if await pg.evaluate(f"!!SCENES[{scene}].prep"):
            await pg.evaluate(f"SCENES[{scene}].prep()"); await pg.wait_for_timeout(400)
            await pg.evaluate("__vtAdvance(400)")
        pm=await pg.evaluate(f"SCENES[{scene}].prepMs||0")
        if pm:
            await pg.evaluate(f"SCENES[{scene}].prepRun()")
            for _ in range(int(pm/100)): await pg.evaluate("__vtAdvance(100)")
        await pg.evaluate(f"SCENES[{scene}].run()")
        n=int(round(d/1000*FPS))
        if probe:   # nur einzelne Testbilder
            t=0
            for ms in probe:
                while t<ms-1: await pg.evaluate(f"__vtAdvance({1000/FPS})"); t+=1000/FPS
                await pg.screenshot(path=f'/home/claude/video/probe_s{scene}_{ms}.jpg',type='jpeg',quality=92)
        else:
            tmp=out+'.part.mp4'
            ff=subprocess.Popen(['ffmpeg','-y','-loglevel','error','-f','image2pipe','-framerate',str(FPS),'-c:v','mjpeg','-i','-',
               '-c:v','libx264','-preset','veryfast','-crf','18','-pix_fmt','yuv420p','-r',str(FPS),tmp],stdin=subprocess.PIPE)
            for i in range(n):
                await pg.evaluate(f"__vtAdvance({1000/FPS})")
                ff.stdin.write(await pg.screenshot(type='jpeg',quality=92))
            ff.stdin.close(); rc=ff.wait()
            if rc==0: os.replace(tmp,out)
            print('Szene',scene,'Bilder',n,'rc',rc)
        print('errors',errs); await b.close()
if __name__=='__main__':
    sc=int(sys.argv[1])
    if len(sys.argv)>2 and sys.argv[2]=='probe': asyncio.run(render(sc,probe=[int(x) for x in sys.argv[3].split(',')]))
    else: asyncio.run(render(sc,out=f'/home/claude/video/s{sc}.mp4'))
