// ---------- Freischaltungen: Designs & Kippi-Outfits ----------
// Quellen: Welten (Etappen), Serie, Endlos-Level, Anzahl Tagesspiele und Feiertage (Dezember, Silvester, Ostern).
// Einmal freigeschaltet bleibt freigeschaltet (kippwerk_unlocks, auch in der Cloud-Sicherung).
const KIPPI_NAMES={none:'Ohne',brille:'Sonnenbrille',kopfhoerer:'Kopfhörer',helm:'Bauhelm',zauberhut:'Zauberhut',schal:'Schal',krone:'Krone',partyhut:'Partyhut',hasen:'Hasenohren'};
const KIPPI_SVG={none:'',
  brille:'<rect x="17" y="18.5" width="13" height="8" rx="3" fill="#111"/><rect x="34" y="18.5" width="13" height="8" rx="3" fill="#111"/><path d="M30 21h4" stroke="#111" stroke-width="2"/><path d="M19 20h4" stroke="#fff6" stroke-width="1.4"/>',
  kopfhoerer:'<path d="M19 25q0-17 13-17t13 17" fill="none" stroke="#4cc9f0" stroke-width="3"/><rect x="15" y="21" width="7" height="10" rx="3" fill="#4cc9f0"/><rect x="42" y="21" width="7" height="10" rx="3" fill="#4cc9f0"/>',
  helm:'<path d="M18 17q0-12 14-12t14 12z" fill="#ffc145"/><rect x="15" y="15.5" width="34" height="3.5" rx="1.7" fill="#e0a52e"/><rect x="30" y="5" width="4" height="11" rx="2" fill="#e0a52e"/>',
  zauberhut:'<path d="M21 15l11-19 11 19z" fill="#6c4bd1"/><ellipse cx="32" cy="15" rx="15" ry="3.5" fill="#5536b3"/><circle cx="31" cy="4" r="1.5" fill="#ffc145"/><circle cx="35" cy="9" r="1.2" fill="#ffc145"/>',
  schal:'<path d="M19 33q13 7 26 0l1 4q-14 8-28 0z" fill="#ff5d73"/><path d="M38 36l4 10-5 1-3-10z" fill="#ff5d73"/><path d="M22 35l2 1M27 37l2 .5M33 37.5l2-.3M39 36l2-1" stroke="#fff8" stroke-width="1.2"/>',
  krone:'<path d="M20 15l2-11 6 6 4-8 4 8 6-6 2 11z" fill="#ffc145" stroke="#e0a52e" stroke-width="1"/><circle cx="32" cy="9" r="1.6" fill="#ff5d73"/><circle cx="25" cy="11" r="1.2" fill="#4cc9f0"/><circle cx="39" cy="11" r="1.2" fill="#3ddc97"/>',
  partyhut:'<path d="M24 15l8-18 8 18z" fill="#ff5d73"/><path d="M26.5 9.5l11 0M28.8 4.3l6.4 0" stroke="#ffd23f" stroke-width="2"/><circle cx="32" cy="-3" r="2.6" fill="#ffd23f"/><path d="M22 15h20" stroke="#4cc9f0" stroke-width="2.4" stroke-linecap="round"/>',
  hasen:'<ellipse cx="24" cy="2" rx="4.5" ry="12" fill="#f4f0ff" transform="rotate(-14 24 2)"/><ellipse cx="24" cy="3" rx="2.2" ry="8.5" fill="#ffb3c8" transform="rotate(-14 24 3)"/><ellipse cx="40" cy="2" rx="4.5" ry="12" fill="#f4f0ff" transform="rotate(14 40 2)"/><ellipse cx="40" cy="3" rx="2.2" ry="8.5" fill="#ffb3c8" transform="rotate(14 40 3)"/>'};

// Ostersonntag (Gauß/Meeus, gregorianisch)
function easterSunday(y){const a=y%19,b=Math.floor(y/100),c=y%100,d=Math.floor(b/4),e=b%4,f=Math.floor((b+8)/25),g=Math.floor((b-f+1)/3),
  h=(19*a+b-d-g+15)%30,i=Math.floor(c/4),k=c%4,l=(32+2*e+2*i-h-k)%7,m=Math.floor((a+11*h+22*l)/451),mo=Math.floor((h+l-7*m+114)/31),da=((h+l-7*m+114)%31)+1;
  return new Date(y,mo-1,da)}
const Holiday={
  now:()=>now(),
  december(){return this.now().getMonth()===11},
  silvester(){const d=this.now();return (d.getMonth()===11&&d.getDate()===31)||(d.getMonth()===0&&d.getDate()===1)},
  easter(){const d=this.now(),e=easterSunday(d.getFullYear()),t=new Date(d.getFullYear(),d.getMonth(),d.getDate());
    const diff=Math.round((t-e)/864e5);return diff>=-2&&diff<=1}};           // Karfreitag bis Ostermontag

const worldDone=w=>!!LP[w*10];
const dailyCount=()=>{let n=0;try{for(let i=0;i<localStorage.length;i++){const k=localStorage.key(i);if(k&&k.startsWith('kippwerk_daily_'))n++}}catch(e){}return n};
const bestEndlessLevel=()=>{let m=0;try{for(const x of (JSON.parse(localStorage.getItem('kippwerk_scores')||'{}').endless||[]))m=Math.max(m,+x.level||0)}catch(e){}
  if(mode==='endless')m=Math.max(m,level||0);return m};
const msHas=d=>!!(ST&&ST.ms&&ST.ms.includes(d));

// Reihenfolge = Anzeige in der Sammlung
const REWARDS=[
  {t:'theme',id:'std',how:'immer',test:()=>true},
  {t:'theme',id:'werkstatt',how:'Welt 1 geschafft',test:()=>worldDone(1)},
  {t:'theme',id:'pastell',how:'3 Tage Serie',test:()=>msHas(3)},
  {t:'theme',id:'retro',how:'Endlos Level 20',test:()=>bestEndlessLevel()>=20},
  {t:'theme',id:'neon',how:'7 Tage Serie',test:()=>msHas(7)},
  {t:'theme',id:'ozean',how:'Welt 3 geschafft',test:()=>worldDone(3)},
  {t:'theme',id:'papier',how:'25 Tagesspiele',test:()=>dailyCount()>=25},
  {t:'theme',id:'wald',how:'Welt 5 geschafft',test:()=>worldDone(5)},
  {t:'theme',id:'lava',how:'30 Tage Serie',test:()=>msHas(30)},
  {t:'theme',id:'bonbon',how:'Welt 7 geschafft',test:()=>worldDone(7)},
  {t:'theme',id:'gold',how:'50 Tage Serie',test:()=>msHas(50)},
  {t:'theme',id:'kristall',how:'Welt 9 geschafft',test:()=>worldDone(9)},
  {t:'theme',id:'kosmos',how:'100 Tage Serie',test:()=>msHas(100)},
  {t:'theme',id:'prisma',how:'Welt 10 geschafft',test:()=>worldDone(10)},
  {t:'theme',id:'winter',how:'im Dezember spielen',test:()=>Holiday.december()},
  {t:'theme',id:'feuerwerk',how:'an Silvester spielen',test:()=>Holiday.silvester()},
  {t:'theme',id:'fruehling',how:'an Ostern spielen',test:()=>Holiday.easter()},
  {t:'kippi',id:'none',how:'immer',test:()=>true},
  {t:'kippi',id:'brille',how:'Welt 2 geschafft',test:()=>worldDone(2)},
  {t:'kippi',id:'kopfhoerer',how:'14 Tage Serie',test:()=>msHas(14)},
  {t:'kippi',id:'helm',how:'Welt 4 geschafft',test:()=>worldDone(4)},
  {t:'kippi',id:'zauberhut',how:'Welt 6 geschafft',test:()=>worldDone(6)},
  {t:'kippi',id:'schal',how:'Welt 8 geschafft',test:()=>worldDone(8)},
  {t:'kippi',id:'krone',how:'Welt 10 geschafft',test:()=>worldDone(10)},
  {t:'kippi',id:'partyhut',how:'an Silvester spielen',test:()=>Holiday.silvester()},
  {t:'kippi',id:'hasen',how:'an Ostern spielen',test:()=>Holiday.easter()}];

const Unlocks=(()=>{
  const K='kippwerk_unlocks';
  const load=()=>{try{const a=JSON.parse(localStorage.getItem(K)||'[]');return Array.isArray(a)?a.filter(x=>typeof x==='string'):[]}catch(e){return[]}};
  let have=new Set(load());
  const save=()=>{try{localStorage.setItem(K,JSON.stringify([...have]))}catch(e){}};
  const key=r=>r.t+':'+r.id;
  // Bestandsschutz: Designs aus der alten Serien-Zuordnung (3 Neon, 7 Pastell, 14 Ozean) bleiben erhalten
  if(!localStorage.getItem('kippwerk_unlocks_v2')){
    try{if(msHas(3))have.add('theme:neon');if(msHas(7))have.add('theme:pastell');if(msHas(14))have.add('theme:ozean');
      if(settings.theme&&settings.theme!=='std')have.add('theme:'+settings.theme);save();localStorage.setItem('kippwerk_unlocks_v2','1')}catch(e){}}
  const name=r=>I18N.tr(r.t==='theme'?(THEME_NAMES[r.id]||r.id):KIPPI_NAMES[r.id]);
  return{
    has(t,id){return id==='std'||id==='none'||have.has(t+':'+id)},
    // prüft alle Bedingungen; neue Freischaltungen melden (Toast), außer silent
    check(silent){const neu=[];for(const r of REWARDS){if(r.id==='std'||r.id==='none'||have.has(key(r)))continue;let ok=false;try{ok=r.test()}catch(e){}
        if(ok){have.add(key(r));neu.push(r)}}
      if(neu.length){save();if(!silent)neu.slice(0,3).forEach((r,i)=>setTimeout(()=>toast((r.t==='theme'?'🎨 '+I18N.tr('Neues Design')+': ':'🪰 '+I18N.tr('Neu für Kippi')+': ')+name(r)+' – ⚙ '+I18N.tr('Sammlung')),i*1800))}
      return neu},
    all:()=>[...have],merge(list){let ch=false;for(const x of list||[])if(typeof x==='string'&&!have.has(x)){have.add(x);ch=true}if(ch)save()},
    name};
})();

// Kippi-Outfit anlegen
function applyKippi(){const id=Unlocks.has('kippi',settings.kippi)?settings.kippi:'none';document.querySelectorAll('.fly-acc').forEach(g=>g.innerHTML=KIPPI_SVG[id]||'')}

// ---------- Sammlung (Designs & Kippi) ----------
function kippiSvg(id){const s=document.querySelector('#fly svg');if(!s)return '';const c=s.cloneNode(true);const a=c.querySelector('.fly-acc');if(a)a.innerHTML=KIPPI_SVG[id]||'';
  c.querySelectorAll('.lid').forEach(l=>l.remove());return c.outerHTML}
let collReturn=null;
function renderCollection(){
  const cur=settings.theme||'std',ck=settings.kippi||'none';
  $('collThemes').innerHTML=REWARDS.filter(r=>r.t==='theme').map(r=>{const un=Unlocks.has('theme',r.id);
    return `<button class="ms${un?'':' lock'}${cur===r.id?' on':''}" data-th="${r.id}" ${un?'':'disabled'}><b>${un?'🎨':'🔒'}</b>${I18N.tr(THEME_NAMES[r.id])}<small>${un?(cur===r.id?I18N.tr('aktiv'):I18N.tr('frei')):I18N.tr(r.how)}</small>${sw5(r.id)}</button>`}).join('');
  $('collKippi').innerHTML=REWARDS.filter(r=>r.t==='kippi').map(r=>{const un=Unlocks.has('kippi',r.id);
    return `<button class="kc${un?'':' lock'}${ck===r.id?' on':''}" data-kp="${r.id}" ${un?'':'disabled'}><span class="kv">${kippiSvg(r.id)}</span>${I18N.tr(KIPPI_NAMES[r.id])}<small>${un?(ck===r.id?I18N.tr('aktiv'):I18N.tr('frei')):'🔒 '+I18N.tr(r.how)}</small></button>`}).join('');
  const n=REWARDS.filter(r=>Unlocks.has(r.t,r.id)).length;$('collCount').textContent=`${n} / ${REWARDS.length}`}
function openCollection(){Unlocks.check(true);
  collReturn=!$('settingsOv').classList.contains('hidden')?'settings':!$('streakOv').classList.contains('hidden')?'streak':'start';
  ['settingsOv','streakOv','startOv'].forEach(i=>$(i).classList.add('hidden'));renderCollection();$('collOv').classList.remove('hidden');$('collOv').scrollTop=0}
function closeCollection(){$('collOv').classList.add('hidden');
  if(collReturn==='settings'){renderSettings();$('settingsOv').classList.remove('hidden')}else if(collReturn==='streak')openStreak();else showMenu()}
$('collThemes').onclick=e=>{const b=e.target.closest('button[data-th]');if(!b||b.disabled)return;setTheme(b.dataset.th);renderCollection()};
$('collKippi').onclick=e=>{const b=e.target.closest('button[data-kp]');if(!b||b.disabled)return;settings.kippi=b.dataset.kp;saveSettings();applyKippi();renderCollection();try{Fly.react&&Fly.react('happy')}catch(x){}};
$('collClose').onclick=closeCollection;
