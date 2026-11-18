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
  const set=new Set(keys);let streak=0;const d=now();
  if(!set.has(todayKey()))d.setDate(d.getDate()-1);
  while(true){const k=d.getFullYear()+'-'+String(d.getMonth()+1).padStart(2,'0')+'-'+String(d.getDate()).padStart(2,'0');if(!set.has(k))break;streak++;d.setDate(d.getDate()-1)}
  const sc=scores.daily.map(x=>x.score);
  return{played:keys.length,streak,best:sc.length?Math.max(...sc):0,avg:sc.length?Math.round(sc.reduce((a,b)=>a+b,0)/sc.length):0}}

function setSize(n){
  N=n;const b=$('board');b.style.setProperty('--n',n);b.classList.remove('n5','n6','n7','n8');b.classList.add('n'+n);
  const c=$('cells');c.innerHTML='';for(let i=0;i<N*N;i++)c.appendChild(document.createElement('div'));
}
setSize(6);
const START_TILES={5:6,6:8,7:10,8:14}, BASE_SPAWN={5:1,6:2,7:3,8:4};
const perLevel=()=>N===6?30:Math.round(30*N*N/36);

