// ---------- Level-Ziele ----------
const fmt=n=>n.toLocaleString(LOC());
const chip=c=>c===ROCK?'<span class="chip rock"></span>':`<span class="chip" style="background:${COLORS[c]}">${SYMBOLS[c]}</span>`;
function goalState(g){
  switch(g.t){
    case 'score':return{cur:score,n:g.n};
    case 'color':return{cur:prog.color[g.c],n:g.n};
    case 'chain':return{cur:prog.chain,n:g.n};
    case 'rocks':return{cur:prog.rocks,n:(LV.rocks||[]).length};
    case 'clear':return{cur:prog.clear,n:g.n};
  }}
function goalsMet(){return LV.goals.every(g=>{const s=goalState(g);return s.cur>=s.n})}
function goalIcon(g){return g.t==='score'?'⭐':g.t==='color'?chip(g.c):g.t==='chain'?'⛓':g.t==='rocks'?chip(ROCK):'✦'}
function goalHud(){return LV.goals.map(g=>{const s=goalState(g),ok=s.cur>=s.n;
  const v=g.t==='chain'?`×${Math.max(1,s.cur)}/×${s.n}`:g.t==='score'?`${fmt(Math.min(s.cur,s.n))}/${fmt(s.n)}`:`${Math.min(s.cur,s.n)}/${s.n}`;
  return `<span class="${ok?'ok':''}">${goalIcon(g)} ${ok?'✓':v}</span>`}).join('')}
function goalText(g,withProgress){
  const s=goalState(g),ok=withProgress&&s.cur>=s.n;
  const t=g.t==='score'?`${fmt(g.n)} Punkte erreichen`:g.t==='color'?`${g.n} Steine dieser Farbe abräumen`:g.t==='chain'?`Eine Kette ×${g.n} auslösen`:
    g.t==='rocks'?`Alle ${s.n} Felsen zerbrechen`:`${g.n} Steine abräumen`;
  const p=withProgress&&!ok?` <small style="color:var(--muted)">(${g.t==='chain'?'×'+Math.max(1,s.cur):fmt(s.cur)})</small>`:'';
  return `<div class="${ok?'ok':''}">${goalIcon(g)} <span>${ok?'✓ ':''}${t}${p}</span></div>`}
const starsHtml=n=>[1,2,3].map(i=>i<=n?'★':'<span class="off">★</span>').join('');

