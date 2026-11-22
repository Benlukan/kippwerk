// ---------- Seeded RNG (Tagesspiel) ----------
let tut=null;   // laufendes Tutorial (siehe unten)
function mulberry32(a){return()=>{a|=0;a=a+0x6D2B79F5|0;let t=Math.imul(a^a>>>15,1|a);t=t+Math.imul(t^t>>>7,61|t)^t;return((t^t>>>14)>>>0)/4294967296}}
function hashStr(s){let h=2166136261;for(const ch of s){h^=ch.charCodeAt(0);h=Math.imul(h,16777619)}return h>>>0}
function now(){return new Date(Date.now()+(window.KW_DAY_OFFSET||0)*864e5)}
function dk(d){return d.getFullYear()+'-'+String(d.getMonth()+1).padStart(2,'0')+'-'+String(d.getDate()).padStart(2,'0')}
function dayDiff(a,b){const[x,y,z]=a.split('-').map(Number),[u,v,w]=b.split('-').map(Number);return Math.round((Date.UTC(u,v-1,w)-Date.UTC(x,y-1,z))/864e5)}
function addDays(k,n){const[y,m,d]=k.split('-').map(Number);return dk(new Date(y,m-1,d+n))}
// Der Spieltag richtet sich nach Google Play Games: neuer Tag ganzjährig um Mitternacht UTC-7
// (ohne Zeitumstellung; Deutschland: 08:00 Uhr im Winter, 09:00 Uhr im Sommer) – weltweit für alle
// zur selben Zeit, passend zur Rangliste „Heute“. Etc/GMT+7 bedeutet UTC-7 (Vorzeichen umgekehrt).
const DAY_TZ='Etc/GMT+7';
function todayKey(){const n=now();try{const p={};for(const x of new Intl.DateTimeFormat('en-US',{timeZone:DAY_TZ,year:'numeric',month:'2-digit',day:'2-digit'}).formatToParts(n))p[x.type]=x.value;
  if(p.year&&p.month&&p.day)return p.year+'-'+p.month+'-'+p.day}catch(e){}return dk(n)}
// Beginn des nächsten Spieltags (Date) und dessen Uhrzeit in Ortszeit, z. B. „09:00“
function nextDayStart(){const n=now();try{const pt=new Date(n.toLocaleString('en-US',{timeZone:DAY_TZ})),m=new Date(pt);m.setHours(24,0,0,0);
  const t=new Date(n.getTime()+(m-pt));if(t>n&&t-n<=26*36e5)return t}catch(e){}const t=new Date(n);t.setHours(24,0,0,0);return t}
// Wochentag eines Spieltags (JJJJ-MM-TT) mit Mo=0 … So=6
function wdOf(key){const p=String(key).split('-').map(Number);return (new Date(p[0],p[1]-1,p[2]).getDay()+6)%7}
function dayStartTime(){return nextDayStart().toLocaleTimeString(LOC(),{hour:'2-digit',minute:'2-digit'})}
const WD=['So','Mo','Di','Mi','Do','Fr','Sa'];
function noDate(no){return new Date(2026,9,30+(no-1))}
const WD_EN=['Sun','Mon','Tue','Wed','Thu','Fri','Sat'],MON_EN=['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec'];
function dayShort(no){const d=noDate(no);return I18N.lang==='en'?MON_EN[d.getMonth()]+' '+d.getDate():String(d.getDate()).padStart(2,'0')+'.'+String(d.getMonth()+1).padStart(2,'0')+'.'}
function dayLabel(no,long){const d=noDate(no);
  if(I18N.lang==='en')return long?MON_EN[d.getMonth()]+' '+d.getDate()+', '+d.getFullYear():WD_EN[d.getDay()]+', '+dayShort(no);
  return long?dayShort(no)+d.getFullYear():WD[d.getDay()]+', '+dayShort(no)}
function weekOf(no,mon){const d=noDate(no),m=mon?(d.getDay()+6)%7:d.getDay();return no-m}   // erster Tag der Woche: Montag (mon) bzw. Sonntag (Google-Woche So–Sa)
// Tagesspiel: Woche Mo–So, wenn sie aus den 7 Wochentags-Listen gebildet werden kann (oder ganz ohne Google); sonst Google-Woche So–Sa
function dailyWeekMon(){try{return !Games.available||Games.hasWd}catch(e){return true}}
// Endlos: Google kennt nur die Woche So–Sa – ohne Google-Dienste (Web) Mo–So
function endlessWeekMon(){try{return !Games.available}catch(e){return true}}
const weekLbl=mon=>mon?'Woche (Mo–So)':'Woche (So–Sa)';
function dailyNoOf(k){const[y,m,d]=String(k).split('-').map(Number);return Math.round((Date.UTC(y,m-1,d)-Date.UTC(2026,9,30))/864e5)+1}
function dailyNo(){return dailyNoOf(todayKey())}
let rc=Math.random, rp=Math.random; // rc: Farben, rp: Positionen
function loadDaily(){try{const d=JSON.parse(localStorage.getItem('kippwerk_daily_'+todayKey())||'null');return d&&typeof d==='object'&&isFinite(d.score)?d:null}catch(e){return null}}
function saveDaily(r){try{localStorage.setItem('kippwerk_daily_'+todayKey(),JSON.stringify(r))}catch(e){}}

