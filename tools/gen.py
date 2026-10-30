import json, random, math, sys
from multiprocessing import Pool
from calib import first_done
import calib
calib.H=90
ROCKP=[
 [[2,2],[2,3],[3,2],[3,3]],
 [[0,0],[0,5],[5,0],[5,5],[2,2],[3,3]],
 [[1,1],[1,4],[4,1],[4,4],[2,2],[2,3],[3,2],[3,3]],
 [[0,2],[0,3],[5,2],[5,3],[2,0],[3,0],[2,5],[3,5]],
 [[1,0],[1,1],[1,2],[1,3],[1,4],[1,5],[4,0],[4,1],[4,2],[4,3],[4,4],[4,5]],
 [[0,0],[0,2],[0,4],[1,1],[1,3],[1,5],[4,0],[4,2],[4,4],[5,1],[5,3],[5,5]],
 [[2,0],[2,1],[2,2],[2,3],[2,4],[2,5],[3,0],[3,1],[3,2],[3,3],[3,4],[3,5]],
 [[0,1],[0,4],[1,2],[1,3],[2,0],[2,5],[3,0],[3,5],[4,2],[4,3],[5,1],[5,4]],
 [[0,0],[0,1],[1,0],[0,5],[0,4],[1,5],[5,0],[5,1],[4,0],[5,5],[5,4],[4,5]],
 [[1,1],[1,2],[1,3],[1,4],[2,1],[2,4],[3,1],[3,4],[4,1],[4,2],[4,3],[4,4]],
 [[0,0],[0,1],[0,2],[0,3],[0,4],[0,5],[2,1],[2,4],[3,1],[3,4],[5,0],[5,1],[5,2],[5,3],[5,4],[5,5]],
]
def target(n):
    base=0.98-0.70*((n-1)/99)**0.85          # 98% -> 28%
    if n%10==0: base-=0.12                      # Boss
    elif n%10==1 and n>1: base+=0.10            # Verschnaufpause
    return max(0.15,min(0.99,base))
def gen(n,rng):
    t=(n-1)/99
    colors=3 if n<=4 else 4 if n<=14 else 5
    spawn=2 if n<=40 else 3 if rng.random()<min(1,(n-40)/30) else 2
    wild=0 if n<=8 else round(rng.choice([0,0.03,0.05])*(1-0.5*t),3)
    ngoals=1 if n<=12 else (2 if n<=55 else rng.choice([2,2,3]))
    if n%10==0: ngoals=min(3,ngoals+1)
    kinds=['score','color','clear','chain']
    if n>=5: kinds.append('rocks')
    goals=[];used=set();rocks=None
    s=1+2.2*t
    for _ in range(ngoals):
        k=rng.choice([x for x in kinds if x not in used and not (x=='chain' and 'chain' in used)])
        used.add(k)
        if k=='score': goals.append({'t':'score','n':int(round(900*s/50)*50)})
        elif k=='color':
            cs=[c for c in range(colors) if all(g.get('c')!=c for g in goals)]
            goals.append({'t':'color','c':rng.choice(cs),'n':int(9*s)}); used.discard('color') if ngoals==3 and rng.random()<.4 else None
        elif k=='clear': goals.append({'t':'clear','n':int(round(35*s/5)*5)})
        elif k=='chain': goals.append({'t':'chain','n':2 if n<45 or rng.random()<.6 else 3})
        elif k=='rocks':
            maxp=min(len(ROCKP)-1,1+int(t*len(ROCKP)))
            rocks=ROCKP[rng.randint(max(0,maxp-3),maxp)]; goals.append({'t':'rocks'})
    goals.sort(key=lambda g:['rocks','color','clear','chain','score'].index(g['t']))
    L={'colors':colors,'spawn':spawn,'goals':goals}
    if wild: L['wild']=wild
    if rocks: L['rocks']=rocks
    return L
def calibrate(a):
    n,L,T=a; tgt=target(n)
    for attempt in range(8):
        rng=random.Random(n*104729+attempt)
        f=sorted(first_done(L,rng) for _ in range(T))
        k=math.ceil(tgt*T)-1; M=f[k]
        if M<math.inf and M<=60: break
        for g in L['goals']:   # Ziel unerreichbar -> abschwächen
            if 'n' in g and g['t']!='chain': g['n']=max(3,int(g['n']*0.85))
            if g['t']=='chain' and g['n']>2: g['n']-=1
        if 'rocks' in L and attempt>=2 and L['spawn']==3: L['spawn']=2
    M=max(6,M); L['moves']=M
    ok=sorted((M-x for x in f if x<=M),reverse=True)
    s2=ok[int(len(ok)*0.55)] if ok else 1; s3=ok[int(len(ok)*0.2)] if ok else 2
    L['stars']=[max(1,s2),max(max(1,s2)+1,s3)]
    return n,L,tgt
if __name__=='__main__':
    T=int(sys.argv[1]); hand=json.load(open('levels-handgemacht-1-30.json'))
    levels=[]
    for n in range(1,101):
        if n<=30:
            L={k:v for k,v in hand[n-1].items() if k not in('moves','stars')}
        else: L=gen(n,random.Random(n*31337))
        levels.append(L)
    with Pool() as p: res=p.map(calibrate,[(n,L,T) for n,L in enumerate(levels,1)])
    out=[]
    for n,L,tgt in sorted(res,key=lambda x:x[0]):
        out.append(L); print(n,f"Ziel {tgt*100:3.0f}%",L['moves'],L['stars'],L['colors'],L['spawn'],len(L.get('rocks',[])),L.get('wild',0),L['goals'])
    json.dump(out,open('levels.json','w'),separators=(',',':'))
