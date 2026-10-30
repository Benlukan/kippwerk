import json, random, sys, math
from multiprocessing import Pool
from sim import *
H=50
def clone(p): return {'score':p['score'],'color':p['color'][:],'chain':p['chain'],'rocks':p['rocks'],'clear':p['clear']}
def evalpos(L,g,p,base):
    return (progress_val(L,p)-base)*1000+sum(x is None for x in g)*4
def bot2(L,g,prog,rng):
    base=progress_val(L,prog); best=None
    for d in 'LRUD':
        ng,mv=slide(g,d)
        if not mv: continue
        p=clone(prog); ng,ch=resolve(ng,d,p)
        if done(L,p): return d
        v1=evalpos(L,ng,p,base)
        # eine Spawn-Stichprobe, dann bester Folgezug
        sg=ng[:]; spawn(sg,d,L,random.Random(rng.random())); p2=clone(p); sg,_=resolve(sg,None,p2,ch)
        v2=-1e9
        for d2 in 'LRUD':
            n2,m2=slide(sg,d2)
            if not m2: continue
            p3=clone(p2); n2,_=resolve(n2,d2,p3)
            v2=max(v2,evalpos(L,n2,p3,base))
        v=v1*0.4+(v2 if v2>-1e9 else -500)*0.6+rng.random()
        if best is None or v>best[0]: best=(v,d)
    return best[1] if best else None
def first_done(L,rng):
    g=init(L,rng); prog={'score':0,'color':[0]*5,'chain':0,'rocks':0,'clear':0}
    for m in range(H):
        d=bot2(L,g,prog,rng)
        if d is None: return math.inf
        g,_=slide(g,d); g,ch=resolve(g,d,prog)
        if done(L,prog): return m+1
        spawn(g,d,L,rng); g,_=resolve(g,None,prog,ch)
        if done(L,prog): return m+1
        if all(x is not None for x in g): return math.inf
    return math.inf
def run(args):
    n,L,T=args; rng=random.Random(n*104729)
    return n,[first_done(L,rng) for _ in range(T)]
if __name__=='__main__':
    levels=json.load(open(sys.argv[1])); T=int(sys.argv[2])
    with Pool() as pool: res=dict(pool.map(run,[(n,L,T) for n,L in enumerate(levels,1)]))
    out=[]
    for n,L in enumerate(levels,1):
        f=sorted(res[n]); target=0.97-0.40*(n-1)/29
        k=math.ceil(target*T)-1; M=f[k]
        fin=[x for x in f if x<math.inf]
        def q(p): return fin[min(len(fin)-1,int(p*len(fin)))] if fin else math.inf
        print(f"{n:2d} Ziel {target*100:4.0f}% -> Züge {M}  | Median {q(.5)}  Erfolg@{L['moves']}: {sum(x<=L['moves'] for x in f)/T*100:4.0f}%  unendl {sum(x==math.inf for x in f)}  {L['goals']}")
        L2=dict(L)
        if M<math.inf:
            M=max(8,M); L2['moves']=M
            # Sterne: verbleibende Züge der besseren Hälfte/Viertel der erfolgreichen Läufe innerhalb M
            ok=[M-x for x in f if x<=M]; ok.sort(reverse=True)
            L2['stars']=[ok[int(len(ok)*0.55)] if ok else 1, ok[int(len(ok)*0.2)] if ok else 2]
        else: L2['moves']=None
        out.append(L2)
    json.dump(out,open('levels_cal.json','w'),indent=0)
