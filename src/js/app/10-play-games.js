// ---------- Weltweite Ranglisten: Google Play Games (Android) / Game Center (iOS) ----------
// Android: Projekt-ID 414239949537 (games-ids.xml). IDs aus der Play Console (Play Games-Dienste → Bestenlisten) bzw. App Store Connect (Game Center → Ranglisten).
// on:false oder leere IDs = Funktion ausgeblendet. saves:true = Spielstand in der Cloud (Play Games „Gespeicherte Spiele“ / Game Center + iCloud). Web: nur lokal.
const GAMES_CONFIG={
  android:{on:true,saves:true,e5:'CgkI4YWAlYcMEAIQAQ',e6:'CgkI4YWAlYcMEAIQAg',e7:'CgkI4YWAlYcMEAIQAw',e8:'CgkI4YWAlYcMEAIQBA',daily:'CgkI4YWAlYcMEAIQBQ'},
  ios:{on:false,saves:true,e5:'kippwerk.endlos.5x5',e6:'kippwerk.endlos.6x6',e7:'kippwerk.endlos.7x7',e8:'kippwerk.endlos.8x8',daily:'kippwerk.tagesspiel'}};
const Games=(()=>{
  const C=window.Capacitor,native=!!(C&&C.isNativePlatform&&C.isNativePlatform()),plat=native?C.getPlatform():'web';
  const cfg=GAMES_CONFIG[plat];
  const P=native?((C.Plugins&&C.Plugins.PlayGames)||(C.registerPlugin&&C.registerPlugin('PlayGames'))):null;
  const available=!!(P&&cfg&&cfg.on&&cfg.daily);
  const label=plat==='ios'?'Game Center':'Google Play Games';
  const PK='kippwerk_games_pending',LK='kippwerk_games_log';
  // Protokoll der letzten Meldungen (für „Ranglisten prüfen“ in den Einstellungen)
  const note=(key,score,what)=>{try{const l=JSON.parse(localStorage.getItem(LK)||'[]');const d=new Date();
      l.unshift({t:d.toLocaleDateString(LOC(),{day:'2-digit',month:'2-digit'})+' '+d.toLocaleTimeString(LOC(),{hour:'2-digit',minute:'2-digit'}),k:key,s:score,w:String(what).slice(0,140)});
      localStorage.setItem(LK,JSON.stringify(l.slice(0,8)))}catch(e){}};
  let ready=null,signedIn=false,why='';   // why = letzter Grund/Fehler der Anmeldung (Diagnose)
  const errTxt=e=>{const c=e&&e.code,m=e&&(e.message||e.errorMessage)||String(e);return (c?c+': ':'')+m};
  const pend=()=>{try{const o=JSON.parse(localStorage.getItem(PK)||'{}'),r={};
      for(const k in o){const v=o[k];if(v&&typeof v==='object'&&v.h===Audit.sign(k,v.s,playerId))r[k]=v.s}   // nur unveränderte, signierte Werte
      return r}catch(e){return{}}};
  const savePend=o=>{try{const w={};for(const k in o)w[k]={s:o[k],h:Audit.sign(k,o[k],playerId)};localStorage.setItem(PK,JSON.stringify(w))}catch(e){}};
  function init(){if(!available)return Promise.resolve(false);
    if(!ready)ready=(async()=>{try{await P.initialize();
        try{P.addListener('signInStateChanged',r=>{const was=signedIn;signedIn=!!(r&&r.signedIn);if(signedIn){flush();if(!was)afterSignIn()}onChange()})}catch(e){}
        const r=await P.signIn({silent:true});signedIn=!!(r&&r.signedIn);why=signedIn?'':'still: '+((r&&r.reason)||'?');if(signedIn){flush();afterSignIn()}}catch(e){signedIn=false;why='still: '+errTxt(e)}
      onChange();return signedIn})();
    return ready}
  let onChange=()=>{};
  const afterSignIn=()=>{try{if(typeof Cloud!=='undefined')setTimeout(()=>Cloud.sync(),300)}catch(e){}};
  async function flush(){if(!signedIn)return;const o=pend();
    for(const k of Object.keys(o)){const id=cfg[k];if(!id){delete o[k];continue}
      try{await P.submitScore({leaderboardId:id,score:o[k]});note(k,o[k],'ok');delete o[k]}catch(e){note(k,o[k],'⚠ '+(e&&e.message||e))}}
    savePend(o)}
  async function signIn(){if(!available)return false;await init();if(signedIn)return true;
    try{const r=await P.signIn({silent:false});signedIn=!!(r&&r.signedIn);why=signedIn?'':((r&&r.reason)||'?')}catch(e){signedIn=false;why=errTxt(e)}
    if(signedIn){flush();afterSignIn()}onChange();return signedIn}
  const NAMES={e5:'5×5',e6:'6×6',e7:'7×7',e8:'8×8',daily:'Tagesspiel'};
  async function diag(){const T=I18N.tr,out=[];
    out.push(label+': '+(available?(signedIn?T('angemeldet'):T('nicht angemeldet')):T('ausgeschaltet')));
    if(!available)return out.join('\n');
    if(!signedIn){await signIn();out[0]=label+': '+(signedIn?T('angemeldet'):T('nicht angemeldet'))}
    if(!signedIn){out.push(T('Grund')+': '+(why||'?'));
      const h={cancelled:'Anmeldefenster abgebrochen oder sofort geschlossen → meist Konto nicht als Tester eingetragen oder Fingerabdruck (SHA-1) passt nicht',not_authenticated:'Google meldet „nicht angemeldet“ → Tester-Konto bzw. Fingerabdruck prüfen',unavailable:'Google Play-Dienste fehlen oder sind veraltet'};
      const k=Object.keys(h).find(x=>String(why).includes(x));if(k)out.push('→ '+T(h[k]))
      else if(/DEVELOPER_ERROR|10:|SIGN_IN_REQUIRED|4:/.test(why))out.push('→ '+T('Fingerabdruck (SHA-1) oder Paketname passt nicht zu den Anmeldedaten in der Play Console'))}
    if(signedIn)await flush();
    const p=pend(),pk=Object.keys(p);out.push(T('Warteschlange')+': '+(pk.length?pk.map(k=>T(NAMES[k])+' '+p[k]).join(', '):T('leer')));
    if(signedIn)for(const k of ['e5','e6','e7','e8','daily']){if(!cfg[k])continue;
      try{const r=await P.loadTopScores({leaderboardId:cfg[k],timeSpan:'all',maxResults:1});
        out.push(T(NAMES[k])+': '+(r&&r.me?T('dein Bestwert')+' '+r.me.score+' · '+T('Platz')+' '+r.me.rank:T('kein Eintrag sichtbar'))+' · '+((r&&r.entries&&r.entries.length)?T('Liste')+' ✓':T('Liste leer')))}
      catch(e){out.push(T(NAMES[k])+': ⚠ '+(e&&e.message||e))}}
    let l=[];try{l=JSON.parse(localStorage.getItem(LK)||'[]')}catch(e){}
    out.push(T('Letzte Meldungen')+':'+(l.length?'':' –'));
    for(const x of l.slice(0,5))out.push('· '+x.t+' '+T(NAMES[x.k]||x.k)+' '+x.s+' → '+(x.w==='ok'?T('gesendet'):x.w));
    return out.join('\n')}
  return{available,label,plugin:P,note,diag,savesOn:!!(available&&cfg.saves),get signedIn(){return signedIn},set onChange(f){onChange=f},init,signIn,
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
