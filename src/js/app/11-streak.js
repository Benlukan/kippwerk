// ---------- Serie ----------
const MILESTONES=[
  {d:3,badge:'✨',name:'Funke',theme:'neon'},
  {d:7,badge:'⚡',name:'Eine Woche',theme:'pastell'},
  {d:14,badge:'🌊',name:'Zwei Wochen',theme:'ozean'},
  {d:30,badge:'🌋',name:'Ein Monat',theme:'lava'},
  {d:50,badge:'👑',name:'Fünfzig Tage',theme:'gold'},
  {d:100,badge:'🌌',name:'Hundert Tage',theme:'kosmos'}];
const THEME_NAMES={std:'Standard',neon:'Neon',pastell:'Pastell',ozean:'Ozean',lava:'Lava',gold:'Gold',kosmos:'Kosmos'};
const THEME_SW={std:['#ff5d73','#ffc145','#3ddc97','#4cc9f0','#b57bff'],neon:['#ff2e63','#ffe600','#00ff9d','#00d4ff','#c84bff'],pastell:['#ff8fa3','#ffd6a5','#a8e6cf','#9bd0f5','#cdb4ff'],
  ozean:['#ef476f','#ffd166','#06d6a0','#2bb3e0','#8c9eff'],lava:['#ff4d2e','#ffb703','#a7f432','#5ad1f5','#ff5fa2'],gold:['#ff5d73','#ffc145','#3ddc97','#4cc9f0','#b57bff'],kosmos:['#ff5d8f','#ffd23f','#3ee8b5','#5ec8ff','#b98cff']};
const MAX_SHIELDS=2;
function loadStreak(){let s=null;try{s=JSON.parse(localStorage.getItem('kippwerk_streak')||'null')}catch(e){}return s}
function saveStreak(){try{localStorage.setItem('kippwerk_streak',JSON.stringify(ST))}catch(e){}}
const dailyDone=k=>{try{return !!localStorage.getItem('kippwerk_daily_'+k)}catch(e){return false}};
let ST=null;
function initStreak(){
  ST=loadStreak();
  if(!ST){ // Übernahme: bisherige Serie aus gespielten Tagesspielen
    const t=todayKey();let cur=0,k=dailyDone(t)?t:addDays(t,-1);
    while(dailyDone(k)){cur++;k=addDays(k,-1)}
    ST={cur,best:cur,last:cur?(dailyDone(t)?t:addDays(t,-1)):null,shields:0,prot:[],adDay:null,ms:[],seen:[]};
    MILESTONES.forEach(m=>{if(cur>=m.d){ST.ms.push(m.d);ST.seen.push(m.d)}});
    saveStreak();
  }
  checkStreak();
}
// prüft beim Start, ob Tage verpasst wurden → Schutz einsetzen oder Serie beenden
function checkStreak(){
  if(!ST||!ST.last||ST.cur<=0)return null;
  const gap=dayDiff(ST.last,todayKey());if(gap<=1)return null;
  const missed=gap-1;let msg;
  if(ST.shields>=missed){
    for(let i=1;i<=missed;i++)ST.prot.push(addDays(ST.last,i));
    ST.shields-=missed;ST.last=addDays(todayKey(),-1);
    msg=`🛡 Serienschutz eingesetzt – deine 🔥 ${ST.cur}er-Serie lebt weiter!`;
  }else{
    msg=`Deine 🔥 ${ST.cur}er-Serie ist leider gerissen. Heute beginnt eine neue!`;
    ST.cur=0;ST.last=null;
  }
  ST.prot=ST.prot.slice(-30);saveStreak();toast(msg);return msg;
}
// nach dem ersten (gewerteten) Tagesspiel des Tages
function streakOnDaily(){
  checkStreak();const t=todayKey();if(ST.last===t)return null;
  ST.cur=(ST.last===addDays(t,-1))?ST.cur+1:1;ST.last=t;ST.best=Math.max(ST.best,ST.cur);
  const ev={cur:ST.cur,shield:false,ms:null};
  if(ST.cur%7===0&&ST.shields<MAX_SHIELDS){ST.shields++;ev.shield=true}
  for(const m of MILESTONES)if(ST.cur>=m.d&&!ST.ms.includes(m.d)){ST.ms.push(m.d);ev.ms=m}
  saveStreak();renderStreakChip();Reminder.schedule();return ev;
}
const themeUnlocked=th=>th==='std'||MILESTONES.some(m=>m.theme===th&&ST.ms.includes(m.d));
function renderStreakChip(){
  if(!ST)return;const done=ST.last===todayKey();
  $('streakNum').textContent=ST.cur;const b=$('streakBtn');
  b.classList.toggle('done',done);b.classList.toggle('open',!done&&ST.cur>0);
  b.title=done?`Serie: ${ST.cur} Tage – heute gesichert`:ST.cur>0?`Serie: ${ST.cur} Tage – heute noch offen!`:'Starte eine Serie mit dem Tagesspiel';
}
function renderStreak(){
  const t=todayKey(),done=ST.last===t;
  $('stkNum').textContent=ST.cur;$('stkSub').textContent=ST.cur===1?'Tag in Folge':'Tage in Folge';
  $('stkStatus').innerHTML=done?'✅ Heute gesichert – bis morgen!':ST.cur>0?'⏳ Heute noch offen – spiel das Tagesspiel, sonst reißt die Serie (oder ein 🛡 springt ein).':'Spiel das Tagesspiel, um eine Serie zu starten.';
  $('stkPlay').style.display=done?'none':'';
  const wd=I18N.lang==='en'?['Su','Mo','Tu','We','Th','Fr','Sa']:['So','Mo','Di','Mi','Do','Fr','Sa'];let w='';
  for(let i=6;i>=0;i--){const k=addDays(t,-i),[y,m,d]=k.split('-').map(Number),day=new Date(y,m-1,d).getDay();
    const ok=dailyDone(k),sh=ST.prot.includes(k);
    w+=`<div class="stk-day${ok?' ok':sh?' sh':''}${i===0?' today':''}"><i>${ok?'🔥':sh?'🛡':i===0?'·':'✕'}</i>${i===0?'Heute':wd[day]}</div>`}
  $('stkWeek').innerHTML=w;
  $('stkShield').innerHTML=`${'🛡'.repeat(ST.shields)}${'<span style="opacity:.25">🛡</span>'.repeat(MAX_SHIELDS-ST.shields)} &nbsp;<b>${ST.shields}/${MAX_SHIELDS}</b><br><span class="hint">Rettet automatisch einen verpassten Tag. Gratis alle 7 Serientage${Ads.native?', zusätzlich 1× täglich per Video':''}.</span>`;
  $('stkAd').style.display=(Ads.canRescue&&ST.shields<MAX_SHIELDS&&ST.adDay!==t)?'':'none';
  const nx=MILESTONES.find(m=>m.d>ST.cur);
  $('stkNext').innerHTML=nx?`<b>${nx.badge} ${nx.name}</b> – noch ${nx.d-ST.cur} ${nx.d-ST.cur===1?'Tag':'Tage'} · Design „${THEME_NAMES[nx.theme]}“<div class="stk-bar"><i style="width:${Math.min(100,ST.cur/nx.d*100)}%"></i></div>`:'🏆 Alle Meilensteine erreicht – unglaublich!';
  const cur=settings.theme||'std';
  $('stkMs').innerHTML=`<button class="ms${cur==='std'?' on':''}" data-th="std"><b>🎨</b>Standard${sw5('std')}</button>`+MILESTONES.map(m=>{const un=ST.ms.includes(m.d);
    return `<button class="ms${un?'':' lock'}${cur===m.theme?' on':''}" data-th="${m.theme}" ${un?'':'disabled'}><b>${un?m.badge:'🔒'}</b>${m.d} Tage<br>${THEME_NAMES[m.theme]}${sw5(m.theme)}</button>`}).join('');
  {const aw=Awards.all(),ks=Object.keys(Awards.BADGE).filter(k=>aw[k]);$('stkAwardsCard').style.display=ks.length||Games.available?'':'none';
   $('stkAwards').innerHTML=ks.length?ks.map(k=>`<div class="aw"><b>${Awards.BADGE[k][0]}</b><span>${aw[k]}×</span><small>${Awards.BADGE[k][1]}</small></div>`).join(''):'<p class="hint" style="margin:4px 0">Noch keine – landet im Tagesspiel vorne: Tagessieg +1 ❤ · Wochensieg +3 ❤ · Woche Top 3 +1 ❤</p>'}
  $('stkBest').textContent=`Längste Serie: ${ST.best} ${ST.best===1?'Tag':'Tage'}`;
}
const sw5=th=>`<div class="sw5">${THEME_SW[th].map(c=>`<span style="background:${c}"></span>`).join('')}</div>`;
let streakReturn=null;
function openStreak(){
  streakReturn=!$('startOv').classList.contains('hidden')?'start':!$('overOv').classList.contains('hidden')?'over':!$('settingsOv').classList.contains('hidden')?'settings':'play';
  if(streakReturn==='play'&&started&&!over){paused=true;started=false}
  ['startOv','overOv','settingsOv'].forEach(i=>$(i).classList.add('hidden'));
  renderStreak();$('streakOv').classList.remove('hidden');$('streakOv').scrollTop=0;
}
function closeStreak(){$('streakOv').classList.add('hidden');
  if(streakReturn==='over')$('overOv').classList.remove('hidden');
  else if(streakReturn==='settings'){renderSettings();$('settingsOv').classList.remove('hidden')}
  else if(streakReturn==='play'){if(paused){paused=false;started=true}}
  else showMenu()}
