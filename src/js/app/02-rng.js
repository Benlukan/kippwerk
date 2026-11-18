// ---------- Seeded RNG (Tagesspiel) ----------
let tut=null;   // laufendes Tutorial (siehe unten)
function mulberry32(a){return()=>{a|=0;a=a+0x6D2B79F5|0;let t=Math.imul(a^a>>>15,1|a);t=t+Math.imul(t^t>>>7,61|t)^t;return((t^t>>>14)>>>0)/4294967296}}
function hashStr(s){let h=2166136261;for(const ch of s){h^=ch.charCodeAt(0);h=Math.imul(h,16777619)}return h>>>0}
function now(){return new Date(Date.now()+(window.KW_DAY_OFFSET||0)*864e5)}
function dk(d){return d.getFullYear()+'-'+String(d.getMonth()+1).padStart(2,'0')+'-'+String(d.getDate()).padStart(2,'0')}
function dayDiff(a,b){const[x,y,z]=a.split('-').map(Number),[u,v,w]=b.split('-').map(Number);return Math.round((Date.UTC(u,v-1,w)-Date.UTC(x,y-1,z))/864e5)}
function addDays(k,n){const[y,m,d]=k.split('-').map(Number);return dk(new Date(y,m-1,d+n))}
function todayKey(){const d=now();return d.getFullYear()+'-'+String(d.getMonth()+1).padStart(2,'0')+'-'+String(d.getDate()).padStart(2,'0')}
const WD=['So','Mo','Di','Mi','Do','Fr','Sa'];
function noDate(no){return new Date(2026,9,30+(no-1))}
const WD_EN=['Sun','Mon','Tue','Wed','Thu','Fri','Sat'],MON_EN=['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec'];
function dayShort(no){const d=noDate(no);return I18N.lang==='en'?MON_EN[d.getMonth()]+' '+d.getDate():String(d.getDate()).padStart(2,'0')+'.'+String(d.getMonth()+1).padStart(2,'0')+'.'}
function dayLabel(no,long){const d=noDate(no);
  if(I18N.lang==='en')return long?MON_EN[d.getMonth()]+' '+d.getDate()+', '+d.getFullYear():WD_EN[d.getDay()]+', '+dayShort(no);
  return long?dayShort(no)+d.getFullYear():WD[d.getDay()]+', '+dayShort(no)}
function weekOf(no){const d=noDate(no),m=(d.getDay()+6)%7;return no-m}   // Nummer des Montags dieser Woche
function dailyNo(){const[y,m,d]=todayKey().split('-').map(Number);return Math.round((Date.UTC(y,m-1,d)-Date.UTC(2026,9,30))/864e5)+1}
let rc=Math.random, rp=Math.random; // rc: Farben, rp: Positionen
function loadDaily(){try{const d=JSON.parse(localStorage.getItem('kippwerk_daily_'+todayKey())||'null');return d&&typeof d==='object'&&isFinite(d.score)?d:null}catch(e){return null}}
function saveDaily(r){try{localStorage.setItem('kippwerk_daily_'+todayKey(),JSON.stringify(r))}catch(e){}}

