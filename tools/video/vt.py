# Hilfen: virtuelle Zeit im Browser (deterministisch, Bild für Bild)
import asyncio
SEED_JS="""(()=>{const m=/seed=(\\d+)/.exec(location.hash);if(!m)return;let a=+m[1]>>>0;
Math.random=function(){a|=0;a=a+0x6D2B79F5|0;let t=Math.imul(a^a>>>15,1|a);t=t+Math.imul(t^t>>>7,61|t)^t;return((t^t>>>14)>>>0)/4294967296}})();"""
class VT:
    def __init__(s,cdp): s.cdp=cdp; s.ev=None
    async def start(s):
        s.cdp.on('Emulation.virtualTimeBudgetExpired',lambda e: s.ev and not s.ev.done() and s.ev.set_result(1))
        await s.cdp.send('Emulation.setVirtualTimePolicy',{'policy':'pause'})
    async def adv(s,ms):
        s.ev=asyncio.get_event_loop().create_future()
        await s.cdp.send('Emulation.setVirtualTimePolicy',{'policy':'advance','budget':ms})
        await s.ev
