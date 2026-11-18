// ---------- Rules ----------
// Große Felder (7×7, 8×8) im Endlos-Modus: ab Level 30 Felsen, ab Level 40 eine 6. Farbe (★ Orange)
const BIG_ROCKS=30,BIG_COLOR6=40;
const numColors=()=>mode==='level'?LV.colors:(N>=7&&level>=BIG_COLOR6)?6:(N>=7||level>=3)?5:4;
const rockChance=()=>mode==='endless'&&N>=7&&level>=BIG_ROCKS?Math.min(.15,.06+(level-BIG_ROCKS)*.005):0;
const spawnCount=()=>mode==='level'?LV.spawn:BASE_SPAWN[N]+(level>=4?1:0)+(level>=10?1:0)+(N>=7?Math.floor((level-1)/6):0);
const wildChance=()=>mode==='level'?(LV.wild||0):level>=2?.05:0;
function randColor(){const w=rc(),c=rc();const rk=rockChance();if(rk&&rc()<rk)return ROCK;return w<wildChance()?WILD:Math.floor(c*numColors())}
function fillQueue(){while(nextQ.length<3)nextQ.push(randColor())}
const idx=(r,c)=>r*N+c;

function slide(dir){
  let moved=false;
  for(let line=0;line<N;line++){
    const cells=[];
    for(let k=0;k<N;k++){
      if(dir==='L')cells.push([line,k]);
      else if(dir==='R')cells.push([line,N-1-k]);
      else if(dir==='U')cells.push([k,line]);
      else cells.push([N-1-k,line]);
    }
    const tiles=cells.map(([r,c])=>grid[idx(r,c)]).filter(Boolean);
    cells.forEach(([r,c],i)=>{
      const t=tiles[i]||null;
      if(grid[idx(r,c)]!==t)moved=true;
      grid[idx(r,c)]=t;
      if(t){t.r=r;t.c=c}
    });
  }
  return moved;
}

function findGroups(){
  const groups=[],taken=new Set();
  for(let col=0;col<COLORS.length;col++){
    const seen=new Set();
    for(let i=0;i<N*N;i++){
      const t=grid[i];
      if(!t||t.color!==col||seen.has(i))continue;
      const stack=[i],group=[];seen.add(i);
      while(stack.length){
        const j=stack.pop();group.push(j);
        const r=Math.floor(j/N),c=j%N;
        for(const[dr,dc]of[[1,0],[-1,0],[0,1],[0,-1]]){
          const nr=r+dr,nc=c+dc;if(nr<0||nc<0||nr>=N||nc>=N)continue;
          const k=idx(nr,nc),u=grid[k];
          if(u&&!seen.has(k)&&(u.color===col||u.color===WILD)){seen.add(k);stack.push(k)}
        }
      }
      if(group.length>=3){groups.push({color:col,cells:group});group.forEach(g=>taken.add(g))}
    }
  }
  return {groups,cells:[...taken]};
}

function spawn(dir){
  const opp={L:'R',R:'L',U:'D',D:'U'}[dir]||null;
  const empties=[];for(let i=0;i<N*N;i++)if(!grid[i])empties.push(i);
  let edge=empties;
  if(opp){
    edge=empties.filter(i=>{const r=Math.floor(i/N),c=i%N;
      return opp==='L'?c===0:opp==='R'?c===N-1:opp==='U'?r===0:r===N-1});
  }
  const pick=[];
  const shuffle=a=>{for(let i=a.length-1;i>0;i--){const j=Math.floor(rp()*(i+1));[a[i],a[j]]=[a[j],a[i]]}return a};
  const pool=shuffle([...edge]);
  const rest=shuffle(empties.filter(i=>!edge.includes(i)));
  const n=Math.min(spawnCount(),empties.length);
  while(pick.length<n)pick.push(pool.length?pool.pop():rest.pop());
  pick.forEach(i=>{
    const color=nextQ.shift();fillQueue();
    grid[i]={id:++tileId,color,r:Math.floor(i/N),c:i%N,fresh:true};
  });
}

