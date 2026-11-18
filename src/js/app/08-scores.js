// ---------- Bestenliste ----------
const TOP=10;
function loadScores(){let d=null;try{d=JSON.parse(localStorage.getItem('kippwerk_scores')||'null')}catch(e){}
  // beschädigte/fremde Daten abfangen: nur gültige Einträge behalten
  if(!d||typeof d!=='object'||Array.isArray(d))d={};
  const ok=x=>x&&typeof x==='object'&&isFinite(x.score);
  d.endless=Array.isArray(d.endless)?d.endless.filter(ok):[];d.daily=Array.isArray(d.daily)?d.daily.filter(x=>ok(x)&&isFinite(x.no)):[];
  if(!d.endless.length){let old=0;try{old=+localStorage.getItem('kippwerk_best')||0}catch(e){}  // Rekord aus v1.x übernehmen
    if(old>0)d.endless.push({name:'Rekord',score:old,level:0,date:''})}
  return d}
function saveScores(){try{localStorage.setItem('kippwerk_scores',JSON.stringify(scores))}catch(e){}}
let scores=loadScores(), lastEntry=null;
let playerName='';try{playerName=localStorage.getItem('kippwerk_name')||''}catch(e){}
// Einmalige Spieler-ID (zufällig, 128 Bit) – wird einmal pro Installation erzeugt und nie geändert
function makeId(){try{if(crypto.randomUUID)return crypto.randomUUID()}catch(e){}
  const a=new Uint8Array(16);try{crypto.getRandomValues(a)}catch(e){for(let i=0;i<16;i++)a[i]=Math.random()*256|0}
  a[6]=a[6]&15|64;a[8]=a[8]&63|128;const h=[...a].map(x=>x.toString(16).padStart(2,'0')).join('');
  return `${h.slice(0,8)}-${h.slice(8,12)}-${h.slice(12,16)}-${h.slice(16,20)}-${h.slice(20)}`}
let playerId='';try{playerId=localStorage.getItem('kippwerk_pid')||'';if(!playerId){playerId=makeId();localStorage.setItem('kippwerk_pid',playerId)}}catch(e){playerId=playerId||makeId()}
const shortId=id=>'KW-'+String(id).replace(/-/g,'').slice(0,8).toUpperCase().replace(/(.{4})(.{4})/,'$1-$2');
const myTag=()=>'#'+String(playerId).replace(/-/g,'').slice(0,4).toUpperCase();
