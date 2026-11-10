// Virtuelle Uhr: Timer, Datum, rAF und CSS-/Web-Animationen werden Bild für Bild weitergestellt
(()=>{if(window.__vtAdvance)return;
let now=0;const t0=1794330000000;let id=1;const timers=new Map();const RD=Date;
window.setTimeout=(fn,ms=0,...a)=>{const i=id++;timers.set(i,{t:now+Math.max(0,+ms||0),fn,a,iv:0});return i};
window.setInterval=(fn,ms=0,...a)=>{const i=id++;const iv=Math.max(1,+ms||1);timers.set(i,{t:now+iv,fn,a,iv});return i};
window.clearTimeout=window.clearInterval=i=>timers.delete(i);
let rafs=[];window.requestAnimationFrame=fn=>{rafs.push(fn);return rafs.length};window.cancelAnimationFrame=()=>{};
performance.now=()=>now;
class D extends RD{constructor(...a){a.length?super(...a):super(t0+now)}static now(){return t0+now}}
window.Date=D;
const seen=new WeakMap();
function sync(){for(const an of document.getAnimations()){if(!seen.has(an))seen.set(an,now-(an.currentTime||0));try{an.pause();an.currentTime=now-seen.get(an)}catch(e){}}}
const tick=async()=>{for(let k=0;k<12;k++)await 0};
window.__vtAdvance=async ms=>{const end=now+ms;
  while(true){let nx=null;for(const[i,t]of timers)if(t.t<=end&&(!nx||t.t<nx[1].t))nx=[i,t];if(!nx)break;
    const t=nx[1];now=Math.max(now,t.t);if(t.iv)t.t+=t.iv;else timers.delete(nx[0]);try{t.fn(...t.a)}catch(e){console.error(e)}await tick()}
  now=end;const r=rafs;rafs=[];r.forEach(f=>{try{f(now)}catch(e){}});await tick();sync();
  for(const f of document.querySelectorAll('iframe')){try{if(f.contentWindow.__vtAdvance)await f.contentWindow.__vtAdvance(ms)}catch(e){}}
};
window.__vtNow=()=>now;
})();
