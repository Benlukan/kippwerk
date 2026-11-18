// ---------- Weltweite Ranglisten: Google Play Games (Android) / Game Center (iOS) ----------
// IDs aus der Play Console (Play Games-Dienste → Bestenlisten) bzw. App Store Connect (Game Center → Ranglisten).
// on:false oder leere IDs = Funktion ausgeblendet. saves:true = Spielstand in der Cloud (Play Games „Gespeicherte Spiele“ / Game Center + iCloud). Web: nur lokal.
const GAMES_CONFIG={
  android:{on:false,saves:true,e5:'',e6:'',e7:'',e8:'',daily:''},
  ios:{on:false,saves:true,e5:'kippwerk.endlos.5x5',e6:'kippwerk.endlos.6x6',e7:'kippwerk.endlos.7x7',e8:'kippwerk.endlos.8x8',daily:'kippwerk.tagesspiel'}};
const Games=(()=>{
  const C=window.Capacitor,native=!!(C&&C.isNativePlatform&&C.isNativePlatform()),plat=native?C.getPlatform():'web';
  const cfg=GAMES_CONFIG[plat];
  const P=native?((C.Plugins&&C.Plugins.PlayGames)||(C.registerPlugin&&C.registerPlugin('PlayGames'))):null;
  const available=!!(P&&cfg&&cfg.on&&cfg.daily);
  const label=plat==='ios'?'Game Center':'Google Play Games';
  const PK='kippwerk_games_pending';
  let ready=null,signedIn=false;
  const pend=()=>{try{const o=JSON.parse(localStorage.getItem(PK)||'{}'),r={};
      for(const k in o){const v=o[k];if(v&&typeof v==='object'&&v.h===Audit.sign(k,v.s,playerId))r[k]=v.s}   // nur unveränderte, signierte Werte
      return r}catch(e){return{}}};
  const savePend=o=>{try{const w={};for(const k in o)w[k]={s:o[k],h:Audit.sign(k,o[k],playerId)};localStorage.setItem(PK,JSON.stringify(w))}catch(e){}};
  function init(){if(!available)return Promise.resolve(false);
    if(!ready)ready=(async()=>{try{await P.initialize();
        try{P.addListener('signInStateChanged',r=>{const was=signedIn;signedIn=!!(r&&r.signedIn);if(signedIn){flush();if(!was)afterSignIn()}onChange()})}catch(e){}
        const r=await P.signIn({silent:true});signedIn=!!(r&&r.signedIn);if(signedIn){flush();afterSignIn()}}catch(e){signedIn=false}
      onChange();return signedIn})();
    return ready}
  let onChange=()=>{};
  const afterSignIn=()=>{try{if(typeof Cloud!=='undefined')setTimeout(()=>Cloud.sync(),300)}catch(e){}};
  async function flush(){if(!signedIn)return;const o=pend();
    for(const k of Object.keys(o)){const id=cfg[k];if(!id){delete o[k];continue}
      try{await P.submitScore({leaderboardId:id,score:o[k]});delete o[k]}catch(e){}}
    savePend(o)}
  async function signIn(){if(!available)return false;await init();if(signedIn)return true;
    try{const r=await P.signIn({silent:false});signedIn=!!(r&&r.signedIn)}catch(e){signedIn=false}
    if(signedIn){flush();afterSignIn()}onChange();return signedIn}
  return{available,label,plugin:P,savesOn:!!(available&&cfg.saves),get signedIn(){return signedIn},set onChange(f){onChange=f},init,signIn,
    // Ergebnis merken und senden (die Plattform behält automatisch den Bestwert)
    submit(key,score){if(!available||!(score>0)||!cfg[key])return;const o=pend();o[key]=Math.max(o[key]||0,Math.round(score));savePend(o);flush().then(()=>{if(key==='daily')try{Top5.clear()}catch(e){}})},
    async top(key,span,n){if(!available||!signedIn||!cfg[key])throw new Error('n/a');return await P.loadTopScores({leaderboardId:cfg[key],timeSpan:span,maxResults:n||5})},
    async show(key){if(!available)return;if(!(await signIn()))return false;
      try{if(key&&cfg[key])await P.showLeaderboard({leaderboardId:cfg[key]});else await P.showAllLeaderboards()}catch(e){}return true}};
})();
// Migration: alle bisherigen (lokalen) Einträge gehören diesem Gerät/Spieler
{let mig=false;for(const l of [scores.endless,scores.daily])for(const x of l){if(!x.pid||x.pid==='lokal'){x.pid=playerId;mig=true}if(!x.name){x.name=playerName||'Spieler';mig=true}}if(mig)saveScores()}
const fmtDate=()=>now().toLocaleDateString(LOC(),{day:'2-digit',month:'2-digit',year:'2-digit'});
scores.endless.forEach(x=>{if(!x.size)x.size=6});   // Migration: alte Einträge = 6×6
const sizeList=n=>scores.endless.filter(x=>x.size===n);
const bestFor=n=>{const l=sizeList(n);return l.length?l[0].score:0};
best=bestFor(6);
function addScore(list,entry,key='score'){
  scores[list].push(entry);scores[list].sort((a,b)=>b[key]-a[key]);
  if(list==='endless'){const keep=[];const cnt={};for(const x of scores.endless){cnt[x.size]=(cnt[x.size]||0)+1;if(cnt[x.size]<=TOP)keep.push(x)}scores.endless=keep}
  saveScores();const i=scores[list].indexOf(entry);return i<0?0:i+1}
