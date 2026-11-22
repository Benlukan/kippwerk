// ---------- Spielstand in der Cloud (geräteübergreifend, gleiche Plattform) ----------
// Lesen → zusammenführen (es zählt jeweils das Bessere) → lokal übernehmen → zurückschreiben.
const Cloud=(()=>{
  const NAME='kippwerk-spielstand',HK='kippwerk_cloud_hash';
  const ls=k=>{try{return localStorage.getItem(k)}catch(e){return null}};
  const lsSet=(k,v)=>{try{localStorage.setItem(k,v)}catch(e){}};
  const J=(k,d)=>{try{return JSON.parse(ls(k)||'null')??d}catch(e){return d}};
  const stable=o=>JSON.stringify(o,(k,v)=>v&&typeof v==='object'&&!Array.isArray(v)?Object.keys(v).sort().reduce((a,x)=>(a[x]=v[x],a),{}):v);
  const SET_KEYS=['sound','vibe','palette','symbols','size','theme','kippi'];
  function local(){
    const daily={};const cut=addDays(todayKey(),-60);
    try{for(let i=0;i<localStorage.length;i++){const k=localStorage.key(i);if(k&&k.startsWith('kippwerk_daily_')&&k.slice(15)>=cut)daily[k.slice(15)]=J(k,null)}}catch(e){}
    const st=J('kippwerk_settings',{}),set={};SET_KEYS.forEach(k=>{if(k in st)set[k]=st[k]});
    return{v:1,pid:ls('kippwerk_pid')||'',name:ls('kippwerk_name')||'',nameAt:+(ls('kippwerk_name_at')||0),
      set,setAt:+(ls('kippwerk_settings_at')||0),levels:J('kippwerk_levels',{}),scores:J('kippwerk_scores',{endless:[],daily:[]}),
      daily,streak:J('kippwerk_streak',null),awards:J('kippwerk_awards',{}),unlocks:J('kippwerk_unlocks',[]),badges:J('kippwerk_badges',{}),maxlv:J('kippwerk_maxlv',{}),lives:+(ls('kippwerk_lives')||0),livesAt:+(ls('kippwerk_lives_at')||0)}}
  const uni=(a,b)=>[...new Set([...(a||[]),...(b||[])])];
  function mergeStreak(a,b){if(!a)return b;if(!b)return a;
    const la=a.last||'',lb=b.last||'';const p=la>lb||(la===lb&&(a.cur||0)>=(b.cur||0))?a:b,o=p===a?b:a;
    return{...p,best:Math.max(a.best||0,b.best||0,p.cur||0),ms:uni(a.ms,b.ms).sort((x,y)=>x-y),seen:uni(a.seen,b.seen).sort((x,y)=>x-y),
      prot:uni(a.prot,b.prot).sort().slice(-30),adDay:[a.adDay||'',b.adDay||''].sort().pop()||null}}
  function merge(L,R){if(!R||R.v!==1)return L;
    const pid=R.pid||L.pid;const fix=x=>({...x,pid:pid});
    const lv={...R.levels};for(const k in L.levels)lv[k]=Math.max(lv[k]||0,L.levels[k]||0);
    const seen=new Set(),en=[];
    for(const x of [...(L.scores.endless||[]),...(R.scores.endless||[])].map(fix)){const id=[x.size+(x.h?'h':''),x.score,x.level,x.date].join('|');if(!seen.has(id)){seen.add(id);en.push(x)}}
    en.sort((a,b)=>b.score-a.score);const cnt={},endless=en.filter(x=>{const z=x.size+(x.h?'h':'');return (cnt[z]=(cnt[z]||0)+1)<=TOP});
    const dm={};for(const x of [...(R.scores.daily||[]),...(L.scores.daily||[])].map(fix))if(!dm[x.no]||x.score>dm[x.no].score)dm[x.no]=x;
    const daily=Object.values(dm).sort((a,b)=>b.score-a.score);
    const dk={...R.daily};for(const k in L.daily)if(!dk[k]||(L.daily[k]&&dk[k]&&L.daily[k].score>=dk[k].score))dk[k]=L.daily[k];
    const nameR=(R.nameAt||0)>(L.nameAt||0)&&R.name;
    const setR=(R.setAt||0)>(L.setAt||0);
    return{v:1,pid,name:nameR?R.name:(L.name||R.name||''),nameAt:Math.max(L.nameAt||0,R.nameAt||0),
      set:setR?{...L.set,...R.set}:L.set,setAt:Math.max(L.setAt||0,R.setAt||0),levels:lv,scores:{endless,daily},daily:dk,
      streak:mergeStreak(L.streak,R.streak),
      awards:(()=>{const a={...(R.awards||{})};for(const k in L.awards||{})a[k]=Math.max(a[k]||0,L.awards[k]||0);return a})(),
      unlocks:uni(L.unlocks,R.unlocks),badges:(()=>{const o={...(R.badges||{})};for(const k in L.badges||{})if(!o[k]||L.badges[k]<o[k])o[k]=L.badges[k];return o})(),
      maxlv:(()=>{const o={...(R.maxlv||{})};for(const k in L.maxlv||{})o[k]=Math.max(+o[k]||0,+L.maxlv[k]||0);return o})(),
      lives:(R.livesAt||0)>(L.livesAt||0)?(R.lives||0):(L.lives||0),livesAt:Math.max(L.livesAt||0,R.livesAt||0)}}
  function apply(M){
    lsSet('kippwerk_pid',M.pid);if(M.name){lsSet('kippwerk_name',M.name);lsSet('kippwerk_name_at',String(M.nameAt||0))}
    lsSet('kippwerk_settings',JSON.stringify({...J('kippwerk_settings',{}),...M.set}));lsSet('kippwerk_settings_at',String(M.setAt||0));
    lsSet('kippwerk_levels',JSON.stringify(M.levels));lsSet('kippwerk_scores',JSON.stringify(M.scores));
    for(const k in M.daily)if(M.daily[k])lsSet('kippwerk_daily_'+k,JSON.stringify(M.daily[k]));
    if(M.streak)lsSet('kippwerk_streak',JSON.stringify(M.streak));
    if(M.awards)lsSet('kippwerk_awards',JSON.stringify(M.awards));
    if(Array.isArray(M.unlocks))lsSet('kippwerk_unlocks',JSON.stringify(M.unlocks));
    if(M.badges&&typeof M.badges==='object')lsSet('kippwerk_badges',JSON.stringify(M.badges));
    if(M.maxlv&&typeof M.maxlv==='object')lsSet('kippwerk_maxlv',JSON.stringify(M.maxlv));
    lsSet('kippwerk_lives',String(M.lives||0));lsSet('kippwerk_lives_at',String(M.livesAt||0))}
  let busy=null,pending=false,last='';
  function reloadSafe(){const k='kippwerk_cloud_reload',t=+(sessionStorage.getItem(k)||0);
    if(Date.now()-t<30000)return false;sessionStorage.setItem(k,String(Date.now()));
    lsSet('kippwerk_cloud_toast','1');location.reload();return true}
  const idle=()=>!started&&!paused&&(!$('startOv').classList.contains('hidden')||!$('newsOv').classList.contains('hidden'));   // Menü oder „Was ist neu?“
  async function sync(){
    if(!Games.savesOn||!Games.signedIn)return;if(busy)return busy;
    busy=(async()=>{const P=Games.plugin;
      try{let R=null;const r=await P.loadSnapshot({name:NAME});if(r&&r.snapshot&&r.snapshot.data){try{R=JSON.parse(r.snapshot.data)}catch(e){}}
        const L=local(),M=merge(L,R),ms=stable(M);
        if(ms!==stable(L)){if(idle()){apply(M);reloadSafe()}else pending=true}   // mitten im Spiel: erst im Menü übernehmen
        if(ms!==ls(HK)&&ms!==stable(R)){const pl=await P.getPlayer();
          await P.saveSnapshot({name:NAME,data:JSON.stringify(M),description:'KIPPWERK Spielstand',expectedPlayerId:pl.playerId});lsSet(HK,ms)}
        else lsSet(HK,ms);
        last=new Date().toLocaleTimeString(LOC(),{hour:'2-digit',minute:'2-digit'})}
      catch(e){}
    })().finally(()=>{busy=null;try{renderGamesRow()}catch(e){}});
    return busy}
  let tmr=0;
  return{merge,local,sync,get last(){return last},
    later(){if(!Games.savesOn||!Games.signedIn)return;clearTimeout(tmr);tmr=setTimeout(sync,2500)},
    onMenu(){if(pending&&idle()){pending=false;setTimeout(sync,300);return}this.later()}};
})();
if(localStorage.getItem('kippwerk_cloud_toast')){localStorage.removeItem('kippwerk_cloud_toast');setTimeout(()=>toast('☁ Spielstand mit deinen anderen Geräten abgeglichen'),900)}
document.addEventListener('visibilitychange',()=>{if(document.hidden)Cloud.sync()});
setTimeout(()=>Games.init(),1500);
setTimeout(()=>Ads.init(()=>{if(!$('startOv').classList.contains('hidden'))showMenu()}),800);
if('serviceWorker' in navigator&&location.protocol==='https:'&&!window.Capacitor){try{navigator.serviceWorker.register('sw.js').catch(()=>{})}catch(e){}}
// Sprache starten (Wörterbuch I18N_EN / Muster I18N_PATS stehen am Ende)
