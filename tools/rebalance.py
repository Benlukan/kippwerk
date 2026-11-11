# Neuabstimmung v1.18: mehr Züge, leichtere Sterne. Ziele/Felder bleiben, nur moves + stars neu.
import json, math, random, sys
from multiprocessing import Pool
from calib import first_done
def target(n):
    base=0.995-0.40*((n-1)/99)**0.9          # 99,5 % -> ~60 % (vorher 98 % -> 28 %)
    if n%10==0: base-=0.08                     # Boss
    elif n%10==1 and n>1: base+=0.05
    return max(0.5,min(0.995,base))
def work(a):
    n,L,T=a; rng=random.Random(n*7919)
    f=sorted(first_done(L,rng) for _ in range(T))
    tgt=target(n); M=f[math.ceil(tgt*T)-1]
    if M==math.inf: M=f[[x<math.inf for x in f].count(True)-1] if any(x<math.inf for x in f) else L['moves']
    M=max(L['moves'],M,6)
    ok=sorted((M-x for x in f if x<=M),reverse=True)
    s2=ok[int(len(ok)*0.80)] if ok else 1     # 80 % der geschafften Läufe -> mind. ★★
    s3=ok[int(len(ok)*0.45)] if ok else 2     # 45 % -> ★★★
    s2=max(1,s2); s3=max(s2+1,s3)
    succ=sum(x<=M for x in f)/T
    return n,M,[s2,s3],succ,L['moves'],L['stars']
if __name__=='__main__':
    T=int(sys.argv[1]); levels=json.load(open('levels.json'))
    with Pool() as p: res=p.map(work,[(n,L,T) for n,L in enumerate(levels,1)])
    for n,M,st,succ,om,ost in sorted(res):
        L=levels[n-1]; L['moves']=M; L['stars']=st
        print(f"{n:3d} Züge {om:2d}->{M:2d}  Sterne {ost}->{st}  Bot-Erfolg {succ*100:3.0f}%")
    json.dump(levels,open(sys.argv[2] if len(sys.argv)>2 else 'levels_neu.json','w'),separators=(',',':'))
