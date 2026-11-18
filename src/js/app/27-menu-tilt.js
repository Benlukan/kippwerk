// ---------- Menü-Steine folgen der Handy-Neigung ----------
const Tilt=(()=>{
  let gx=0,gy=0,cx=0,cy=0,base=null,raf=0,sensor=false,mouse=false,asked=false;
  const reduce=matchMedia('(prefers-reduced-motion: reduce)').matches;
  const logo=()=>document.querySelector('#homeTiles .hlogo');
  const enabled=()=>settings.tilt!==false&&!reduce;
  addEventListener('deviceorientation',e=>{
    if(e.gamma==null||e.beta==null)return;sensor=true;
    base=base==null?e.beta:base+(e.beta-base)*.008;             // Haltung langsam nachführen
    gx=Math.max(-1,Math.min(1,e.gamma/28));gy=Math.max(-1,Math.min(1,(e.beta-base)/15));wake()});
  if(matchMedia('(pointer:fine)').matches)addEventListener('pointermove',e=>{
    if(sensor)return;mouse=true;gx=(e.clientX/innerWidth-.5)*1.2;gy=(e.clientY/innerHeight-.5)*1.2;wake()},{passive:true});
  // iOS: Bewegungssensor braucht einmal eine Erlaubnis (nur nach Tippen möglich)
  $('startOv').addEventListener('pointerdown',()=>{
    if(asked||!enabled())return;asked=true;
    const D=window.DeviceOrientationEvent;if(D&&typeof D.requestPermission==='function')D.requestPermission().catch(()=>{})},{passive:true});
  function frame(){
    const el=logo(),vis=!$('startOv').classList.contains('hidden');
    if(!el||!vis||!enabled()||!(sensor||mouse)){raf=0;if(el){el.classList.remove('tilt');el.querySelectorAll('.hst').forEach(t=>{t.style.removeProperty('--tx');t.style.removeProperty('--ty')})}return}
    raf=requestAnimationFrame(frame);
    cx+=(gx-cx)*.1;cy+=(gy-cy)*.1;
    const rot=-12+cx*7,th=rot*Math.PI/180,co=Math.cos(th),si=Math.sin(th);
    el.classList.add('tilt');el.style.setProperty('--rot',rot.toFixed(2)+'deg');
    el.querySelectorAll('.hst').forEach((t,i)=>{
      const k=5.5*(1+(i%2)*.3+(i>>1)*.2),vx=cx*k,vy=cy*k;       // Steine rutschen Richtung „unten“, leicht versetzt
      t.style.setProperty('--tx',(vx*co+vy*si).toFixed(1)+'px');t.style.setProperty('--ty',(-vx*si+vy*co).toFixed(1)+'px')})}
  function wake(){if(!raf)raf=requestAnimationFrame(frame)}
  new MutationObserver(wake).observe($('startOv'),{attributes:true,attributeFilter:['class']});
  return{wake};
})();
