// ---------- Erinnerung (nur App) ----------
const Reminder=(()=>{
  const C=window.Capacitor,native=!!(C&&C.isNativePlatform&&C.isNativePlatform());
  const P=native?((C.Plugins&&C.Plugins.LocalNotifications)||(C.registerPlugin&&C.registerPlugin('LocalNotifications'))):null;
  const HOUR=19;
  async function schedule(){
    if(!P)return;
    try{await P.cancel({notifications:[{id:7001},{id:7002}]})}catch(e){}
    if(!settings.remind||!ST)return;
    const n=now(),t=todayKey(),done=ST.last===t;
    let first=new Date(n);first.setHours(HOUR,0,0,0);
    if(done||n>=first)first.setDate(first.getDate()+1);
    const second=new Date(first);second.setDate(second.getDate()+1);
    const streakAt=d=>{const k=dk(d);return (ST.last===addDays(k,-1))?ST.cur:0};
    // Kippi spricht – Texte wechseln von Tag zu Tag, damit es nicht eintönig wird
    const KS=[c=>`Bsss! Deine 🔥 ${c}er-Serie läuft heute ab – spiel schnell das Tagesspiel, ich halt sie solange fest!`,
              c=>`Bsss… deine 🔥 ${c}er-Serie wackelt! Ein Tagesspiel heute, und sie bleibt stehen.`];
    const K0=['Bsss! Das neue Tagesspiel ist da – ich hab schon reingeschaut 👀','Kippi hier! Heute warten neue Steine auf dich – kommst du kippen? 🧩','Bsss… ich sitz schon am Spielfeldrand. Fehlt nur noch du! 😉'];
    const body=d=>{const c=streakAt(d),k=Math.floor(d.getTime()/864e5);return I18N.tr(c>0?KS[k%KS.length](c):K0[k%K0.length])};
    try{
      await P.schedule({notifications:[
        {id:7001,title:'🪰 Kippi · KIPPWERK',body:body(first),schedule:{at:first,allowWhileIdle:true},smallIcon:'ic_stat_kippi',isExactNotification:false},
        {id:7002,title:'🪰 Kippi · KIPPWERK',body:I18N.tr('Bsss… ich vermisse dich! Das Tagesspiel wartet schon. 🪰'),schedule:{at:second,allowWhileIdle:true},smallIcon:'ic_stat_kippi',isExactNotification:false}]});
    }catch(e){console.warn('Erinnerung',e)}
  }
  async function enable(){if(!P)return false;try{const r=await P.requestPermissions();return r.display==='granted'}catch(e){return false}}
  return{native,schedule,enable};
})();

function dailyStats(){
  const keys=[];try{for(let i=0;i<localStorage.length;i++){const k=localStorage.key(i);if(k&&k.startsWith('kippwerk_daily_'))keys.push(k.slice(15))}}catch(e){}
  const set=new Set(keys);let streak=0,k=todayKey();   // Spieltage (siehe todayKey), nicht Kalendertage
  if(!set.has(k))k=addDays(k,-1);
  while(set.has(k)){streak++;k=addDays(k,-1)}
  const sc=scores.daily.map(x=>x.score);
  return{played:keys.length,streak,best:sc.length?Math.max(...sc):0,avg:sc.length?Math.round(sc.reduce((a,b)=>a+b,0)/sc.length):0}}

function setSize(n){
  N=n;const b=$('board');b.style.setProperty('--n',n);b.className=b.className.replace(/\bn\d+\b/g,'').trim();b.classList.add('n'+n);
  const c=$('cells');c.innerHTML='';for(let i=0;i<N*N;i++)c.appendChild(document.createElement('div'));
}
setSize(6);
const START_TILES={4:4,5:6,6:8,7:10,8:14,9:18,10:22}, BASE_SPAWN={4:1,5:1,6:2,7:3,8:4,9:5,10:6};
// ---------- Spielfelder (Endlos): Kürzel '4' … '10', dazu '6h' '7h' '8h' = mit Hindernissen ----------
const BOARDS=['4','5','6','7','8','9','10','6h','7h','8h'],BOARDS_FREE=['5','6','7','8'];
const bN=k=>parseInt(k,10)||6, bH=k=>/h$/.test(String(k));
const bLabel=(k,long)=>{const n=bN(k);return n+'×'+n+(bH(k)?(long?' '+I18N.tr('mit Hindernissen'):' 🪨'):'')};
let BK='6';   // aktuelles Endlos-Feld
const boardOpen=k=>{if(BOARDS_FREE.includes(String(k)))return true;try{return Unlocks.has('board',String(k))}catch(e){return false}};   // Unlocks wird später geladen
function curBoard(){const k=String(settings.size||'6');return BOARDS.includes(k)&&boardOpen(k)?k:'6'}
// höchstes erreichtes Endlos-Level je Feld (für Freischaltungen und Abzeichen)
const MaxLv=(()=>{const K='kippwerk_maxlv';let o={};try{const x=JSON.parse(localStorage.getItem(K)||'{}');if(x&&typeof x==='object')o=x}catch(e){}
  const save=()=>{try{localStorage.setItem(K,JSON.stringify(o))}catch(e){}};
  return{get:k=>+o[String(k)]||0,note(k,l){k=String(k);if(l>(+o[k]||0)){o[k]=l;save()}},all:()=>({...o}),
    merge(x){let c=false;for(const k in x||{})if(+x[k]>(+o[k]||0)){o[k]=+x[k];c=true}if(c)save()}}})();
// höchste Level aus Bestenliste und Verlauf übernehmen (auch für Stände vor v1.40)
try{for(const x of scores.endless)MaxLv.note(keyOf(x),+x.level||0);for(const x of History.all())if(x.t==='e')MaxLv.note(keyOf(x),+x.level||0)}catch(e){}
const perLevel=()=>N===6?30:Math.round(30*N*N/36);

