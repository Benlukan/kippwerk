// ---------- Überholt-Hinweis (v2.0): Platz 1 / Top 3 / Top 10 verloren – Tagesspiel und Endlos ----------
// Kein Server: geprüft wird beim Öffnen der App, beim Zurückkehren und im Menü (höchstens alle 10 Minuten).
// Gemerkt wird der zuletzt gesehene Platz je Liste und Zeitraum; fällt er über eine Stufe (1 → 3 → 10), gibt es einen Hinweis.
const RankWatch=(()=>{
  const K='kippwerk_rankwatch',TIERS=[1,3,10],GAP=10*60*1000;let st={},busy=false,last=0;
  try{const x=JSON.parse(localStorage.getItem(K)||'{}');if(x&&typeof x==='object')st=x}catch(e){}
  const save=()=>{try{localStorage.setItem(K,JSON.stringify(st))}catch(e){}};
  const tierOf=r=>TIERS.find(t=>r>0&&r<=t)||0;
  // zu prüfende Listen: Tagesspiel Heute + Woche, Endlos Woche + Gesamt für jedes Feld mit Runden in den letzten 14 Tagen
  function lists(){const L=[{k:'daily',sp:'day'},{k:'daily',sp:'week'}],since=addDays(todayKey(),-14),seen=new Set();
    try{for(const x of History.all())if(x.t==='e'&&x.d>=since)seen.add(keyOf(x))}catch(e){}
    for(const b of seen)if(Games.hasId('e'+b)){L.push({k:'e'+b,sp:'week'},{k:'e'+b,sp:'all'})}return L}
  const period=(k,sp)=>sp==='day'?todayKey():sp==='week'?String(weekOf(dailyNo(),k==='daily'?dailyWeekMon():Games.hasEwdFor(k))):'all';
  const label=(k,sp)=>(k==='daily'?I18N.tr('Tagesspiel'):I18N.tr('Endlos')+' '+bLabel(k.slice(1)))+' · '+I18N.tr(sp==='day'?'heute':sp==='week'?'Woche':'gesamt');
  function msg(t){return t===1?I18N.tr('nicht mehr Platz 1'):t===3?I18N.tr('nicht mehr in den Top 3'):I18N.tr('nicht mehr in den Top 10')}
  async function check(force){
    if(busy||settings.overtake==='off'||!Games.available||!Games.signedIn)return[];if(!force&&Date.now()-last<GAP)return[];
    busy=true;last=Date.now();const out=[];
    try{for(const {k,sp} of lists()){let d;try{d=await boardTop(k,sp,10)}catch(e){continue}
        const me=d&&d.me,r=me&&(me.rank|0)>0?me.rank|0:0,id=k+'|'+sp,p=period(k,sp),o=st[id];
        if(!r){if(o&&o.p!==p)delete st[id];continue}               // nicht gewertet / nur für dich sichtbar
        if(o&&o.p===p&&o.r>0){const a=tierOf(o.r),b=tierOf(r);
          if(a&&(!b||b>a))out.push({k,sp,from:o.r,to:r,tier:a})}
        st[id]={p,r}}
      save()}finally{busy=false}
    if(out.length)show(out);return out}
  function show(out){out.sort((a,b)=>a.tier-b.tier);const x=out[0];
    const more=out.length>1?' '+I18N.tr('(+')+(out.length-1)+' '+I18N.tr('weitere)'):'';
    toast('🏁 '+I18N.tr('Überholt!')+' '+label(x.k,x.sp)+': '+msg(x.tier)+` (${I18N.tr('Platz')} ${x.from} → ${x.to})`+more);}
  // eigener Platz nach einem neuen Ergebnis: sofort merken, damit der eigene Rekord nicht als „überholt“ zählt
  function note(k,sp,rank){if(!(rank>0))return;st[k+'|'+sp]={p:period(k,sp),r:rank};save()}
  document.addEventListener('visibilitychange',()=>{if(!document.hidden)setTimeout(()=>check(),2500)});
  return{check,note,get state(){return st},_reset(){st={};last=0;save()}}})();
