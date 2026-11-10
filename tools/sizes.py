import random, json, sys
import sim, os
RAMP=int(os.environ.get('RAMP','4'))
from multiprocessing import Pool
def game(a):
    n,sp,c0,seed=a; sim.N=n
    L={'colors':4,'spawn':sp,'goals':[{'t':'score','n':10**9}],'moves':2000,'start':max(6,n*n//4)}
    rng=random.Random(seed); g=sim.init(L,rng); prog={'score':0,'color':[0]*5,'chain':0,'rocks':0,'clear':0}; cl=0
    for m in range(2500):
        # Level-Regeln wie im Spiel (vereinfacht): ab 90 abgeräumt 5 Farben, ab 90 Steinen +1 Spawn
        lv=1+prog['clear']//round(30*n*n/36); L['colors']=5 if (lv>=3 or c0==5) else 4; L['spawn']=sp+(1 if lv>=4 else 0)+(1 if lv>=10 else 0)+(((lv-1)//RAMP) if n>=7 else 0)
        best=None
        for d in 'LRUD':
            ng,mv=sim.slide(g,d)
            if not mv: continue
            p=json.loads(json.dumps(prog)); ng2,_=sim.resolve(ng[:],d,p)
            v=(p['score']-prog['score'])+sum(x is None for x in ng2)*30+rng.random()
            if best is None or v>best[0]: best=(v,d)
        if not best: return m,prog['score']
        d=best[1]; g,_=sim.slide(g,d); g,ch=sim.resolve(g,d,prog); sim.spawn(g,d,L,rng); g,_=sim.resolve(g,None,prog,ch)
        if all(x is not None for x in g): return m+1,prog['score']
    return 2500,prog['score']
if __name__=='__main__':
    combos=[(5,1,4)]
    with Pool() as p:
        for n,sp,c0 in combos:
            r=p.map(game,[(n,sp,c0,s) for s in range(60)])
            mv=sorted(x[0] for x in r); sc=sorted(x[1] for x in r)
            print(f"{n}x{n} spawn {sp} farben {c0}: Züge Median {mv[30]:4d} (P25 {mv[15]}, P75 {mv[45]})  Punkte Median {sc[30]}")
