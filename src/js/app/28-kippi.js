// ---------- Maskottchen: die KIPPWERK-Fliege ----------
// Kommt ab und zu vorbei, landet auf Rändern (Anzeigen, Spielfeld-Rahmen, Info-Boxen, Menü-Steine) und schaut zu.
// Reagiert auf Combos, Gefahr, Rekorde und aufs Kippen. Keine Klicks, landet nie auf dem Spielfeld selbst.
const Fly=(()=>{
  const el=$('fly'),bub=$('flyBubble'),pup=el.querySelector('.pupils'),mouth=el.querySelector('.mouth');
  const W=54,H=49,MOUTH={happy:'M29 31q3 2.6 6 0',sad:'M29 32.5q3-2.6 6 0',oh:'M30.5 31.5a1.6 1.8 0 1 0 3.2 0a1.6 1.8 0 1 0-3.2 0'};
  let x=-80,y=160,state='away',raf=0,fl=null,sitTimer=0,nextVisit=Date.now()+9000,lastReact=0,bubT=0,pending=null,last=null;
  const reduce=matchMedia('(prefers-reduced-motion: reduce)').matches;
  const enabled=()=>settings.fly!==false&&!reduce&&!tut;
  function scene(){
    const ov=[...document.querySelectorAll('.overlay')].filter(o=>!o.classList.contains('hidden'));
    if(!ov.length)return started&&!over?'game':null;
    return ov.length===1&&ov[0].id==='startOv'?'menu':null}
  function perches(sc){
    const pts=[],add=(sel,fs)=>document.querySelectorAll(sel).forEach(e=>{const r=e.getBoundingClientRect();
      if(r.width<30||r.top<8||r.top>innerHeight-60)return;fs.forEach(f=>pts.push({x:r.left+r.width*f-W/2,y:r.top-H+5}))});
    if(sc==='game'){add('#board',[.1,.9]);add('.ib-box',[.12,.88])}
    else add('#homeTiles .hst',[.5]);
    return pts.filter(p=>!last||Math.hypot(p.x-last.x,p.y-last.y)>40)}
  const put=(r=0)=>{el.style.transform=`translate(${x.toFixed(1)}px,${y.toFixed(1)}px) rotate(${r.toFixed(1)}deg)`};
  function look(tx,ty){const dx=tx-(x+W/2),dy=ty-(y+H/2),d=Math.hypot(dx,dy)||1;pup.style.transform=`translate(${(dx/d*1.8).toFixed(2)}px,${(dy/d*1.6).toFixed(2)}px)`}
  function face(m){mouth.setAttribute('d',MOUTH[m]||MOUTH.happy)}
  function say(t,ms=1500){bub.textContent=t;bub.classList.add('on');clearTimeout(bubT);bubT=setTimeout(()=>bub.classList.remove('on'),ms)}
  function flyTo(tx,ty,done,loop){
    el.classList.add('flying');el.classList.remove('hidden');state='fly';
    const x0=x,y0=y,dist=Math.hypot(tx-x0,ty-y0),dur=Math.min(2000,Math.max(650,dist/0.42)),cx=(x0+tx)/2+(Math.random()-.5)*120,cy=Math.min(y0,ty)-60-Math.random()*60;
    const t0=performance.now();cancelAnimationFrame(raf);
    const stepf=now=>{let k=Math.min(1,(now-t0)/dur);const e=k<.5?2*k*k:1-Math.pow(-2*k+2,2)/2,u=1-e;
      let nx=u*u*x0+2*u*e*cx+e*e*tx,ny=u*u*y0+2*u*e*cy+e*e*ty;
      if(loop){const a=e*Math.PI*2;nx+=Math.sin(a)*28;ny+=-Math.sin(a/2)*40+(1-Math.cos(a))*0}
      ny+=Math.sin(now/90)*1.6*(1-k);
      const r=Math.max(-25,Math.min(25,(nx-x)*2.2));x=nx;y=ny;put(r);
      if(k<1)raf=requestAnimationFrame(stepf);else{raf=0;el.classList.remove('flying');put(0);done&&done()}};
    raf=requestAnimationFrame(stepf)}
  function land(){
    const sc=scene();if(!sc||!enabled())return away(true);
    const ps=perches(sc);if(!ps.length)return away();
    const p=ps[Math.floor(Math.random()*ps.length)];last=p;
    el.classList.toggle('top',sc==='menu');
    flyTo(p.x,p.y,()=>{state='sit';face('happy');
      const b=boardEl.getBoundingClientRect();look(b.left+b.width/2,b.top+b.height/2);
      if(pending){const m=pending;pending=null;react(m.kind,true)}
      clearTimeout(sitTimer);sitTimer=setTimeout(()=>Math.random()<.35?land():away(),6000+Math.random()*5000)})}
  function enter(){
    const fromLeft=Math.random()<.5;x=fromLeft?-W-20:innerWidth+20;y=60+Math.random()*innerHeight*.4;put();land()}
  function away(now){
    clearTimeout(sitTimer);nextVisit=Date.now()+(scene()==='menu'?14000:26000)+Math.random()*24000;
    if(state==='away')return;
    if(now||!el.isConnected){cancelAnimationFrame(raf);raf=0;state='away';el.classList.add('hidden');el.classList.remove('flying');return}
    const tx=x<innerWidth/2?-W-30:innerWidth+30;
    flyTo(tx,y-80-Math.random()*80,()=>{state='away';el.classList.add('hidden')})}
  // Reaktionen (aus dem Spiel aufgerufen)
  const R={combo:['!','happy'],monster:['😮','oh'],ultra:['🤩','oh'],danger:['💦','sad'],record:['♥','happy'],level:['🎉','happy'],win:['⭐','happy'],over:['😢','sad']};
  function react(kind,arrived){
    if(!enabled())return;const now=Date.now(),r=R[kind];if(!r)return;
    if(state==='sit'){face(r[1]);say(r[0]);
      if(kind==='ultra'){const hx=x,hy=y;flyTo(hx,hy,()=>{state='sit'},true)}
      if(kind==='over')setTimeout(()=>away(),1800);
      setTimeout(()=>{if(state==='sit')face('happy')},2200);lastReact=now;return}
    if(arrived||state!=='away'||now-lastReact<9000||!scene())return;
    if(kind==='combo'&&Math.random()<.6)return;              // nicht bei jeder Combo vorbeikommen
    lastReact=now;pending={kind};enter()}
  // Kippen: sitzende Fliege wackelt mit – manchmal wird sie dabei „abgeschüttelt“
  function onMove(dir){
    if(state!=='sit')return;const v={L:[-1,0],R:[1,0],U:[0,-1],D:[0,1]}[dir]||[0,0];
    el.style.setProperty('--wx',v[0]*5+'px');el.style.setProperty('--wr',v[0]*10+'deg');
    el.classList.remove('wob');void el.offsetWidth;el.classList.add('wob');
    pup.style.transform=`translate(${v[0]*1.8}px,${v[1]*1.6}px)`;
    if(Math.random()<.12){say('😵',900);clearTimeout(sitTimer);setTimeout(land,350)}}
  // Besuchs-Zeitplan (1× pro Sekunde prüfen – sparsam)
  let lastSc=null;
  setInterval(()=>{
    const sc=scene(),changed=sc!==lastSc;lastSc=sc;
    if(state!=='away'&&(!sc||!enabled()))return away(true);
    if(changed&&state==='sit'){clearTimeout(sitTimer);land();return}       // Bildschirm gewechselt → neuen Platz suchen
    if(state==='away'&&sc&&enabled()&&!document.hidden&&Date.now()>nextVisit)enter()},1000);
  addEventListener('resize',()=>{if(state==='sit')land()});
  return{react,onMove,away,get state(){return state},visit:enter};
})();
