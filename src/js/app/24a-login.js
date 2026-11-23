// ---------- Profil-Daten, Rahmen, Titel & täglicher Login-Bonus ----------
// Rahmen und Titel sind rein optisch. Freischalten über Welten, Serie, Abzeichen, den Login-Bonus – oder später ein Paket.
// Ring-Farben kommen aus den Design-Variablen (--c0 … --c5, --line), passen sich also jedem Design an.
const FRAMES=[
  {id:'std',n:'Schlicht',ring:'var(--line)',how:'immer',test:()=>true},
  {id:'regen',n:'Regenbogen',ring:'conic-gradient(var(--c0),var(--c1),var(--c2),var(--c3),var(--c4),var(--c0))',how:'Welt 1 geschafft',test:()=>!!LP[10]},
  {id:'neon',n:'Neon',ring:'repeating-conic-gradient(var(--c3) 0 20deg,var(--c4) 20deg 40deg)',how:'Login-Bonus Woche 1 · Tag 3',login:1},
  {id:'mint',n:'Minze',ring:'conic-gradient(var(--c2),var(--c3),var(--c2))',how:'Login-Bonus Woche 2 · Tag 3',login:2},
  {id:'sonne',n:'Sonne',ring:'conic-gradient(var(--c1),var(--c5,#ff8a3d),var(--c1))',how:'Login-Bonus Woche 3 · Tag 3',login:3},
  {id:'sterne',n:'Sternenstaub',ring:'repeating-conic-gradient(var(--c4) 0 12deg,var(--c1) 12deg 18deg)',how:'Login-Bonus Woche 4 · Tag 3',login:4},
  {id:'gold',n:'Gold',ring:'conic-gradient(#ffd86b,#b8860b,#ffe9a6,#b8860b,#ffd86b)',how:'30 Tage Serie',test:()=>!!(ST&&ST.ms&&ST.ms.includes(30))},
  {id:'smaragd',n:'Smaragd',ring:'var(--c2)',how:'Welt 7 geschafft',test:()=>!!LP[70]},
  {id:'profi',n:'Zielscheibe',ring:'repeating-radial-gradient(circle,var(--c0) 0 3px,var(--text) 3px 6px)',how:'Abzeichen „Endlos-Profi“',test:()=>Badges.has('profi')},
  {id:'glut',n:'Glut',ring:'conic-gradient(var(--c0),var(--c5,#ff8a3d),var(--c1),var(--c0))',how:'Paket „Feuer“ – bald',paket:true}];
const TITLES=[
  {id:'neu',n:'Neuling',how:'immer',test:()=>true},
  {id:'sterne',n:'Sternesammler',how:'Abzeichen „Sternesammler“',test:()=>Badges.has('sterne')},
  {id:'serie',n:'Serienheld',how:'30 Tage Serie',test:()=>Badges.has('monat')},
  {id:'kombo',n:'Kombo-König',how:'Combo ×8 oder mehr',test:()=>Badges.has('ultra8')},
  {id:'weit',n:'Weitblick',how:'9×9 freigeschaltet',test:()=>Badges.has('weitblick')},
  {id:'sieger',n:'Tagessieger',how:'Platz 1 im Tagesspiel',test:()=>Badges.has('sieger')},
  {id:'welten',n:'Weltenbummler',how:'Alle Welten geschafft',test:()=>Badges.has('welten')},
  {id:'frueh',n:'Frühaufsteher',how:'Login-Bonus Woche 1 · Tag 6',login:1},
  {id:'stamm',n:'Stammspieler',how:'Login-Bonus Woche 2 · Tag 6',login:2},
  {id:'jaeger',n:'Bonusjäger',how:'Login-Bonus Woche 3 · Tag 6',login:3},
  {id:'treu',n:'Treue Seele',how:'Login-Bonus Woche 4 · Tag 6',login:4},
  {id:'feuer',n:'Feuerteufel',how:'Paket „Feuer“ – bald',paket:true}];

// Persönliche Bestwerte fürs Profil (beste Kombo, beste Platzierungen) – auch in der Cloud-Sicherung
const PStats=(()=>{const K='kippwerk_pstats';
  const load=()=>{try{const o=JSON.parse(localStorage.getItem(K)||'{}');return o&&typeof o==='object'&&!Array.isArray(o)?o:{}}catch(e){return{}}};
  let s=load();const save=()=>{try{localStorage.setItem(K,JSON.stringify(s))}catch(e){}};
  const better=(a,b)=>a>0&&b>0?Math.min(a,b):(a>0?a:b>0?b:0);
  return{get:()=>({...s}),
    combo(n){if(n>(s.combo||0)){s.combo=n;save()}},
    rank(span,r){const k=span==='day'?'rd':span==='week'?'rw':'';if(!k||!(r>0))return;const v=better(s[k]||0,+r);if(v!==s[k]){s[k]=v;save()}},
    merge(o){if(!o||typeof o!=='object')return;s.combo=Math.max(s.combo||0,+o.combo||0);s.rd=better(s.rd||0,+o.rd||0);s.rw=better(s.rw||0,+o.rw||0);save()},
    better};
})();

// Täglicher Login-Bonus: 7-Tage-Wochen, 4 Wochen = ein Monat, danach beginnt der Monat von vorn.
// Ein Schritt pro Spieltag (todayKey). Verpasste Tage pausieren nur – es geht beim nächsten Besuch weiter.
const LOGIN_PLAN=['life','life','frame','life','shield','title','kippi'];
const LOGIN_KIPPI=['zylinder','muetze','fliege','sternreif'];
const Login=(()=>{const K='kippwerk_login';
  const load=()=>{try{const o=JSON.parse(localStorage.getItem(K)||'null');if(o&&typeof o==='object')return{n:Math.max(0,+o.n||0),last:typeof o.last==='string'?o.last:'',got:Array.isArray(o.got)?o.got.filter(x=>typeof x==='string'):[]}}catch(e){}return{n:0,last:'',got:[]}};
  let L=load();const save=()=>{try{localStorage.setItem(K,JSON.stringify(L))}catch(e){}};
  const can=()=>L.last!==todayKey();
  // Belohnung eines Schritts (0 … 27)
  function reward(step){const w=Math.floor(step/7)%4,t=LOGIN_PLAN[step%7];
    if(t==='frame'){const f=FRAMES.find(x=>x.login===w+1);return{t,id:f.id,key:'frame:'+f.id}}
    if(t==='title'){const x=TITLES.find(y=>y.login===w+1);return{t,id:x.id,key:'title:'+x.id}}
    if(t==='kippi'){const id=LOGIN_KIPPI[w];return{t,id,key:'kippi:'+id}}
    return{t}}
  const EN=()=>I18N.tr('abholen')!=='abholen',q=x=>EN()?'“'+x+'”':'„'+x+'“';
  function label(r){
    if(r.t==='life')return'❤ '+I18N.tr('Extraleben');
    if(r.t==='shield')return'🛡 '+I18N.tr('Serienschutz');
    if(r.t==='frame')return I18N.tr('Rahmen')+' '+q(I18N.tr(FRAMES.find(f=>f.id===r.id).n));
    if(r.t==='title')return I18N.tr('Titel')+' '+q(I18N.tr(TITLES.find(f=>f.id===r.id).n));
    return'Kippi: '+I18N.tr(KIPPI_NAMES[r.id]||r.id)}
  // Abholen: einmal pro Spieltag. Doppelte Gegenstände (zweiter Monat) werden zu 2 Extraleben.
  function claim(){if(!can())return null;const step=L.n%28,r=reward(step);let msg=label(r);
    const addLife=k=>{const a=Math.min(k,Math.max(0,9-lives));if(a>0){lives+=a;saveLives()}return a};
    if(r.t==='life'){if(!addLife(1))msg+=' – '+I18N.tr('Leben schon voll')}
    else if(r.t==='shield'){if(ST&&ST.shields<MAX_SHIELDS){ST.shields++;saveStreak()}else{addLife(1);msg='❤ '+I18N.tr('Extraleben')+' ('+I18N.tr('Schutz schon voll')+')'}}
    else if(L.got.includes(r.key)){const a=addLife(2);msg='❤ ×'+(a||2)+' ('+label(r)+' '+I18N.tr('hast du schon')+')'}
    else L.got.push(r.key);
    L.n++;L.last=todayKey();save();
    try{Unlocks.check(true)}catch(e){}try{Cloud.later()}catch(e){}
    return{r,msg}}
  return{can,claim,reward,label,collect:r=>EN()?'Collect '+label(r).replace(/^Frame/,'frame').replace(/^Title/,'title'):label(r)+' abholen',state:()=>({...L,got:[...L.got]}),has:k=>L.got.includes(k),
    merge(o){if(!o||typeof o!=='object')return;const n=+o.n||0,last=typeof o.last==='string'?o.last:'';
      if(n>L.n||(n===L.n&&last>L.last)){L.n=n;L.last=last}
      for(const k of Array.isArray(o.got)?o.got:[])if(typeof k==='string'&&!L.got.includes(k))L.got.push(k);save()}};
})();
const frameOwned=f=>!f.paket&&(f.login?Login.has('frame:'+f.id):(()=>{try{return f.test()}catch(e){return false}})());
const titleOwned=t=>!t.paket&&(t.login?Login.has('title:'+t.id):(()=>{try{return t.test()}catch(e){return false}})());
const curFrame=()=>FRAMES.find(f=>f.id===settings.frame&&frameOwned(f))||FRAMES[0];
const curTitle=()=>TITLES.find(t=>t.id===settings.title&&titleOwned(t))||TITLES[0];

// ---------- Login-Bonus-Fenster ----------
let loginReturn='start';
function loginIcon(r,big){
  if(r.t==='life')return'<span class="lg-ic">❤</span>';
  if(r.t==='shield')return'<span class="lg-ic">🛡</span>';
  if(r.t==='frame')return`<span class="ava-ring sm" style="--ring:${FRAMES.find(f=>f.id===r.id).ring}"><span></span></span>`;
  if(r.t==='title')return'<span class="lg-ic">🏷</span>';
  return`<span class="kv${big?' big':''}">${kippiSvg(r.id)}</span>`}
function renderLogin(){const S=Login.state(),can=Login.can();
  const step=can?S.n%28:(S.n-1+28)%28,w=Math.floor(step/7),d=step%7,base=w*7;
  $('lgWeek').textContent=I18N.tr('Woche '+(w+1)+' · Tag '+(d+1));
  let h='';for(let i=0;i<6;i++){const r=Login.reward(base+i),cls=i<d||(!can&&i===d)?'done':i===d?'today':'';
    const tag=cls==='today'?`<b class="lg-tag">${I18N.tr('HEUTE')}</b>`:(!can&&i===d+1)?`<b class="lg-tag next">${I18N.tr('MORGEN')}</b>`:'';
    h+=`<div class="lg-day ${cls}">${tag}${cls==='done'?'<span class="lg-ok">✓</span>':''}<small>${I18N.tr('Tag '+(i+1))}</small>${loginIcon(r)}<span class="lg-lbl">${Login.label(r)}</span></div>`}
  $('lgGrid').innerHTML=h;
  const r7=Login.reward(base+6),c7=6<d||(!can&&d===6)?'done':d===6&&can?'today':'';
  $('lgBig').className='lg-big '+c7;
  $('lgBig').innerHTML=`${loginIcon(r7,true)}<div><small>${I18N.tr('Tag 7 · Wochenbelohnung')}</small><b>${Login.label(r7)}</b><small>${I18N.tr('Nur über den Login-Bonus erhältlich')}</small></div>${c7==='done'?'<span class="lg-ok">✓</span>':''}`;
  // Monatsleiste: 4 Wochen
  const doneSteps=can?step:step+1;
  $('lgMonth').innerHTML=[0,1,2,3].map(i=>`<i style="--p:${Math.max(0,Math.min(7,doneSteps-i*7))/7*100}%"></i>`).join('');
  $('lgClaim').style.display=can?'':'none';
  if(can)$('lgClaim').textContent=Login.collect(Login.reward(step));
  $('lgClose').textContent=I18N.tr(can?'SPÄTER':'SCHLIESSEN')}
function openLogin(from){loginReturn=from||(!$('profOv').classList.contains('hidden')?'profile':'start');
  ['startOv','profOv'].forEach(i=>$(i).classList.add('hidden'));renderLogin();$('loginOv').classList.remove('hidden');$('loginOv').scrollTop=0}
function closeLogin(){$('loginOv').classList.add('hidden');if(loginReturn==='profile')openProfile();else showMenu()}
$('lgClaim').onclick=()=>{const res=Login.claim();if(!res)return;try{sfx.combo(4);haptic('win')}catch(e){}
  toast('🎁 '+res.msg);renderLogin();try{renderAvatarChip()}catch(e){}};
$('lgClose').onclick=closeLogin;
// Automatisch einmal pro Spieltag im Menü zeigen – nicht beim allerersten Start und nicht über anderen Fenstern
function maybeShowLogin(){try{
  if(!Login.can()||paused||started)return;
  const k='kippwerk_login_pop';if(localStorage.getItem(k)===todayKey())return;
  const veteran=Object.keys(LP).length>0||dailyCount()>0||(scores&&scores.endless&&scores.endless.length>0);if(!veteran)return;
  setTimeout(()=>{const open=id=>!$(id).classList.contains('hidden');
    if(started||paused||!open('startOv')||open('newsOv')||open('bugOv')||!Login.can())return;
    try{localStorage.setItem(k,todayKey())}catch(e){}openLogin('start')},900)}catch(e){}}
