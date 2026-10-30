import json, random, sys
N=6; WILD=9; ROCK=8
def slide(g,d):
    moved=False; ng=g[:]
    for line in range(N):
        cells=[]
        for k in range(N):
            if d=='L': cells.append(line*N+k)
            elif d=='R': cells.append(line*N+N-1-k)
            elif d=='U': cells.append(k*N+line)
            else: cells.append((N-1-k)*N+line)
        ts=[g[i] for i in cells if g[i] is not None]
        for j,i in enumerate(cells):
            v=ts[j] if j<len(ts) else None
            if ng[i]!=v: moved=True
            ng[i]=v
    return ng,moved
def nb(i):
    r,c=divmod(i,N)
    for dr,dc in((1,0),(-1,0),(0,1),(0,-1)):
        nr,nc=r+dr,c+dc
        if 0<=nr<N and 0<=nc<N: yield nr*N+nc
def groups(g):
    out=[];taken=set()
    for col in range(5):
        seen=set()
        for i in range(N*N):
            if g[i]!=col or i in seen: continue
            st=[i];grp=[];seen.add(i)
            while st:
                j=st.pop();grp.append(j)
                for k in nb(j):
                    if k not in seen and (g[k]==col or g[k]==WILD): seen.add(k);st.append(k)
            if len(grp)>=3: out.append((col,grp));taken|=set(grp)
    return out,taken
def resolve(g,d,prog,chain=0):
    while True:
        gs,taken=groups(g)
        if not taken: return g,chain
        chain+=1
        for col,grp in gs:
            prog['score']+=len(grp)**2*10*chain; prog['color'][col]+=len(grp)
        rocks=set(k for i in taken for k in nb(i) if g[k]==ROCK)
        prog['rocks']+=len(rocks); prog['clear']+=len(taken)
        prog['chain']=max(prog['chain'],chain)
        for i in taken|rocks: g[i]=None
        if d:
            g,_=slide(g,d)
def done(L,prog):
    for go in L['goals']:
        t=go['t']
        if t=='score' and prog['score']<go['n']: return False
        if t=='color' and prog['color'][go['c']]<go['n']: return False
        if t=='chain' and prog['chain']<go['n']: return False
        if t=='rocks' and prog['rocks']<len(L.get('rocks',[])): return False
        if t=='clear' and prog['clear']<go['n']: return False
    return True
def progress_val(L,prog):
    v=0
    for go in L['goals']:
        t=go['t']
        if t=='score': v+=min(prog['score'],go['n'])/go['n']
        if t=='color': v+=min(prog['color'][go['c']],go['n'])/go['n']
        if t=='chain': v+=min(prog['chain'],go['n'])/go['n']
        if t=='rocks': v+=prog['rocks']/max(1,len(L['rocks']))
        if t=='clear': v+=min(prog['clear'],go['n'])/go['n']
    return v
def rcolor(L,rng):
    if rng.random()<L.get('wild',0): return WILD
    return rng.randrange(L['colors'])
def spawn(g,d,L,rng):
    opp={'L':'R','R':'L','U':'D','D':'U'}[d]
    emp=[i for i in range(N*N) if g[i] is None]
    def edge(i):
        r,c=divmod(i,N)
        return c==0 if opp=='L' else c==N-1 if opp=='R' else r==0 if opp=='U' else r==N-1
    e=[i for i in emp if edge(i)]; rest=[i for i in emp if not edge(i)]
    rng.shuffle(e); rng.shuffle(rest)
    for _ in range(min(L['spawn'],len(emp))):
        i=e.pop() if e else rest.pop(); g[i]=rcolor(L,rng)
def init(L,rng):
    g=[None]*(N*N)
    for r,c in L.get('rocks',[]): g[r*N+c]=ROCK
    placed=0
    while placed<L.get('start',8):
        i=rng.randrange(N*N)
        if g[i] is not None: continue
        g[i]=rng.randrange(L['colors'])
        if groups(g)[1]: g[i]=None; continue
        placed+=1
    return g
def play(L,rng,bot):
    g=init(L,rng); prog={'score':0,'color':[0]*5,'chain':0,'rocks':0,'clear':0}
    for m in range(L['moves']):
        opts=[]
        for d in 'LRUD':
            ng,mv=slide(g,d)
            if not mv: continue
            if bot=='random': opts.append((rng.random(),d)); continue
            p=json.loads(json.dumps(prog)); ng2,_=resolve(ng[:],d,p)
            val=(progress_val(L,p)-progress_val(L,prog))*1000+(p['score']-prog['score'])*0.05+sum(x is None for x in ng2)*3+rng.random()
            opts.append((val,d))
        if not opts: return False,m
        d=max(opts)[1]
        g,_=slide(g,d); g,ch=resolve(g,d,prog)
        if done(L,prog): return True,L['moves']-m-1
        spawn(g,d,L,rng); g,_=resolve(g,None,prog,ch)
        if done(L,prog): return True,L['moves']-m-1
        if all(x is not None for x in g): return False,m
    return False,0
if __name__=='__main__':
    levels=json.load(open(sys.argv[1])); T=int(sys.argv[2]) if len(sys.argv)>2 else 200
    for n,L in enumerate(levels,1):
        res={}
        for bot in ('greedy','random'):
            rng=random.Random(n*7919); w=0; left=[]
            for _ in range(T):
                ok,ml=play(L,rng,bot)
                if ok: w+=1; left.append(ml/L['moves'])
            res[bot]=(w/T, sum(left)/len(left) if left else 0)
        g=res['greedy']; r=res['random']
        print(f"{n:2d} greedy {g[0]*100:5.1f}% (Rest {g[1]*100:4.0f}%)  random {r[0]*100:5.1f}%   {L['goals']}")
