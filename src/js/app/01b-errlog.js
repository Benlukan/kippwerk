// ---------- Fehlerprotokoll (v2.0.5) ----------
// Sammelt JavaScript-Fehler und Hänger lokal (letzte 40, nur auf dem Gerät). Gesendet wird nichts automatisch:
// Nach einem Fehler fragt das Spiel einmal, ob der Bericht per E-Mail an den Entwickler gehen soll; außerdem ⚙ → „Problem melden“.
const ErrLog=(()=>{const K='kippwerk_errlog',MAX=40;let L=[],fresh=false;
  try{const x=JSON.parse(localStorage.getItem(K)||'[]');if(Array.isArray(x))L=x}catch(e){}
  const save=()=>{try{localStorage.setItem(K,JSON.stringify(L.slice(-MAX)))}catch(e){}};
  function ctx(){try{return{mode,BK,N,level,over,busy,started,score,moves:history.length}}catch(e){return{}}}
  function add(kind,msg,stack){msg=String(msg||'').slice(0,300);
    const last=L[L.length-1];if(last&&last.m===msg&&Date.now()-last.t<5000)return;   // gleiche Meldung nicht mehrfach
    L.push({t:Date.now(),v:(typeof APP_VER!=='undefined'?APP_VER:'?'),k:kind,m:msg,s:String(stack||'').split('\n').slice(0,6).join(' | ').slice(0,600),c:ctx()});
    L=L.slice(-MAX);fresh=true;save()}
  window.addEventListener('error',e=>add('error',e.message,(e.error&&e.error.stack)||(e.filename+':'+e.lineno)));
  window.addEventListener('unhandledrejection',e=>{const r=e.reason;add('promise',r&&r.message||r,r&&r.stack)});
  function text(){const ua=navigator.userAgent.replace(/\s+/g,' ');
    return 'KIPPWERK Problembericht\nVersion: '+(typeof APP_VER!=='undefined'?APP_VER:'?')+'\nGerät: '+ua+'\n\n'+
      L.slice(-15).map(x=>`${new Date(x.t).toLocaleString('de-DE')} [${x.k}] ${x.m}\n  ${x.s}\n  ${JSON.stringify(x.c)}`).join('\n\n')}
  return{add,text,get count(){return L.length},get fresh(){return fresh},seen(){fresh=false},clear(){L=[];fresh=false;save()}}})();
