import json, sys, math
from multiprocessing import Pool
import calib; calib.H=90
from calib import first_done
import random
def run(a):
    n,L,T=a; rng=random.Random(n*7+1); f=[first_done(L,rng) for _ in range(T)]
    return n,sum(x<=L['moves'] for x in f)/T
if __name__=='__main__':
    Ls=json.load(open(sys.argv[1])); T=int(sys.argv[2])
    with Pool() as p: r=dict(p.map(run,[(n,L,T) for n,L in enumerate(Ls,1)]))
    for n in sorted(r): print(n, f"{r[n]*100:4.0f}%", '#'*int(r[n]*40))
