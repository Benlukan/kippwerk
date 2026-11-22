// ---------- Abzeichen (Erfolge) – lokal, optional zusätzlich als Google-Play-Games-Erfolg ----------
// Erreicht-Datum in kippwerk_badges {id: 'JJJJ-MM-TT'}. Google-IDs in GAMES_CONFIG.android.ach (leer = nur lokal).
const bestEndlessScore=()=>{let m=0;try{for(const x of scores.endless)m=Math.max(m,+x.score||0);for(const x of History.all())m=Math.max(m,+x.score||0)}catch(e){}return m};
const BADGES=[
  {id:'funke',e:'✨',n:'Funke',d:'3 Tage Serie',pts:10,goal:3,val:()=>ST.best||0},
  {id:'woche',e:'⚡',n:'Eine Woche',d:'7 Tage Serie',pts:20,goal:7,val:()=>ST.best||0},
  {id:'zwei',e:'🌊',n:'Zwei Wochen',d:'14 Tage Serie',pts:40,goal:14,val:()=>ST.best||0},
  {id:'monat',e:'🌋',n:'Ein Monat',d:'30 Tage Serie',pts:75,goal:30,val:()=>ST.best||0},
  {id:'fuenfzig',e:'👑',n:'Fünfzig Tage',d:'50 Tage Serie',pts:100,goal:50,val:()=>ST.best||0},
  {id:'hundert',e:'🌌',n:'Hundert Tage',d:'100 Tage Serie',pts:200,goal:100,val:()=>ST.best||0},
  {id:'ultra',e:'💥',n:'ULTRA!',d:'Erste ULTRA-Combo',pts:15,goal:1,val:()=>0},
  {id:'welt1',e:'🧩',n:'Welt 1',d:'Etappe 1-10 geschafft',pts:25,goal:1,val:()=>LP[10]?1:0},
  {id:'sterne',e:'⭐',n:'Sternesammler',d:'100 Sterne in den Etappen',pts:50,goal:100,val:()=>totalStars(),unit:'★',inc:true},
  {id:'stammgast',e:'📅',n:'Stammgast',d:'25 Tagesspiele gespielt',pts:50,goal:25,val:()=>dailyCount(),inc:true},
  {id:'sieger',e:'🥇',n:'Tagessieger',d:'Platz 1 im weltweiten Tagesspiel',pts:100,goal:1,val:()=>(Awards.all().d1||0)>0?1:0},
  {id:'profi',e:'🎯',n:'Endlos-Profi',d:'10.000 Punkte in einer Endlos-Runde',pts:50,goal:10000,val:()=>bestEndlessScore()},
  {id:'mini',e:'🔷',n:'Mini-Meister',d:'Endlos 4×4 bis Level 20',pts:25,goal:20,val:()=>MaxLv.get('4')},
  {id:'fels6',e:'🧱',n:'Felsbrecher',d:'6×6 mit Hindernissen bis Level 30',pts:40,goal:30,val:()=>MaxLv.get('6h')},
  {id:'fels7',e:'🗿',n:'Steinbruch',d:'7×7 mit Hindernissen bis Level 30',pts:50,goal:30,val:()=>MaxLv.get('7h')},
  {id:'fels8',e:'⛰️',n:'Gipfelstürmer',d:'8×8 mit Hindernissen bis Level 30',pts:75,goal:30,val:()=>MaxLv.get('8h')},
  {id:'welt7',e:'🌍',n:'Welt 7',d:'Etappe 7-10 geschafft',pts:50,goal:1,val:()=>LP[70]?1:0},
  {id:'welten',e:'🏆',n:'Alle Welten',d:'Etappe 10-10 geschafft',pts:150,goal:1,val:()=>LP[100]?1:0},
  {id:'weitblick',e:'🔭',n:'Weitblick',d:'9×9 freigeschaltet',pts:50,goal:1,val:()=>boardOpen('9')?1:0},
  {id:'gross',e:'🌌',n:'Großes Feld',d:'10×10 freigeschaltet',pts:100,goal:1,val:()=>boardOpen('10')?1:0},
  {id:'neuner',e:'🏔️',n:'Neuner-Profi',d:'Endlos 9×9 bis Level 40',pts:100,goal:40,val:()=>MaxLv.get('9')},
  {id:'zehner',e:'🪐',n:'Zehner-Legende',d:'Endlos 10×10 bis Level 40',pts:150,goal:40,val:()=>MaxLv.get('10')},
  {id:'ultra8',e:'💎',n:'ULTRA ×8',d:'Combo ×8 oder mehr',pts:50,goal:1,val:()=>0},
  {id:'wochensieger',e:'🗓️',n:'Wochensieger',d:'Platz 1 in der Tagesspiel-Woche (Mo–So)',pts:100,goal:1,val:()=>(Awards.all().w1||0)>0?1:0}];
const Badges=(()=>{
  const K='kippwerk_badges';
  const load=()=>{try{const o=JSON.parse(localStorage.getItem(K)||'{}');return o&&typeof o==='object'&&!Array.isArray(o)?o:{}}catch(e){return{}}};
  let got=load();const save=()=>{try{localStorage.setItem(K,JSON.stringify(got))}catch(e){}};
  const gid=id=>{try{return (GAMES_CONFIG.android.ach||{})[id]||''}catch(e){return ''}};
  // Google: Standard-Erfolge freischalten, hochzählende mit Schritten (nur Android, nur mit ID, nur angemeldet)
  function google(b,steps){const id=gid(b.id);if(!id||!Games.available||!Games.signedIn||!Games.plugin)return;
    try{if(b.inc){const sent=+(localStorage.getItem('kippwerk_ach_'+b.id)||0),add=Math.min(b.goal,steps)-sent;
        if(add>0)Games.plugin.incrementAchievement({id,steps:add}).then(()=>localStorage.setItem('kippwerk_ach_'+b.id,String(sent+add))).catch(()=>{})}
      else Games.plugin.unlockAchievement({id}).catch(()=>{})}catch(e){}}
  function check(silent){const neu=[];
    for(const b of BADGES){let v=0;try{v=+b.val()||0}catch(e){}
      if(b.inc)google(b,v);
      if(got[b.id])continue;
      if(v>=b.goal){got[b.id]=todayKey();neu.push(b);if(!b.inc)google(b,v)}}
    if(neu.length){save();if(!silent)neu.slice(0,3).forEach((b,i)=>setTimeout(()=>{toast('🏅 '+I18N.tr('Neues Abzeichen')+': '+b.e+' '+I18N.tr(b.n));try{sfx.combo(4)}catch(e){}},400+i*1800));try{collBadge()}catch(e){}}
    return neu}
  function earn(id){const b=BADGES.find(x=>x.id===id);if(!b||got[id])return;got[id]=todayKey();save();google(b,b.goal);
    toast('🏅 '+I18N.tr('Neues Abzeichen')+': '+b.e+' '+I18N.tr(b.n));try{collBadge()}catch(e){}}
  // Bereits erreichte Google-Erfolge nachholen, sobald angemeldet
  function resync(){for(const b of BADGES)if(got[b.id]&&!b.inc)google(b,b.goal);check(true)}
  return{check,earn,resync,has:id=>!!got[id],date:id=>got[id]||'',all:()=>({...got}),
    merge(o){let ch=false;for(const k in o||{})if(!got[k]){got[k]=o[k];ch=true}if(ch)save()}};
})();
