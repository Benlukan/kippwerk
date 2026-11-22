// ---------- Rules ----------
// Endlos ab 6×6: ab Level 30 Felsen; große Felder (7×7, 8×8) zusätzlich ab Level 40 eine 6. Farbe (★ Orange)
const BIG_ROCKS=30,BIG_COLOR6=40;
// 4×4: immer 4 Farben · 10×10: 6. Farbe schon ab Level 30, Felsen ab Level 25
const obst=()=>mode==='endless'&&bH(BK);
// 10×10 und 7×7/8×8 mit Hindernissen: 6. Farbe schon ab Level 30
const rocksFrom=()=>N>=10?25:BIG_ROCKS, color6From=()=>N>=10||obst()?30:BIG_COLOR6;
const numColors=()=>mode==='level'?LV.colors:N<=4?4:(N>=7&&level>=color6From())?6:(N>=7||level>=3)?5:4;
// Hindernis-Felder: Felsen von Anfang an (6×6 ab 6 %, 7×7/8×8 ab 10 %, steigend)
const rockChance=()=>mode!=='endless'?0:obst()?(N>=7?Math.min(.18,.10+level*.002):Math.min(.15,.06+level*.003))
  :N>=6&&level>=rocksFrom()?Math.min(.15,.06+(level-rocksFrom())*.005):0;
// Extra-Leben ab Combo ×6, auf 9×9 ab ×7, auf 10×10 ab ×8
const lifeAt=()=>mode==='endless'&&N>=10?8:mode==='endless'&&N>=9?7:6;
const spawnCount=()=>mode==='level'?LV.spawn:BASE_SPAWN[N]+(level>=4?1:0)+(level>=10?1:0)+(N>=7?Math.floor((level-1)/6):0);
const wildChance=()=>mode==='level'?(LV.wild||0):level>=2?.05:0;
function randColor(){const w=rc(),c=rc();const rk=rockChance();if(rk&&rc()<rk)return ROCK;return w<wildChance()?WILD:Math.floor(c*numColors())}
// Vorschau-Schlange: mindestens so lang wie die Steine des nächsten Zugs (bis 8×8/9×9/10×10 mehr als 3)
function fillQueue(){const n=Math.max(3,spawnCount());while(nextQ.length<n)nextQ.push(randColor())}
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

