// ---------- Spielerprofil & Profil anpassen ----------
// Alle Farben über die Design-Variablen – das Profil sieht in jedem Design passend aus.
function avatarHtml(cls){const f=curFrame(),k=Unlocks.has('kippi',settings.kippi)?settings.kippi:'none';
  return`<span class="ava-ring ${cls||''}" style="--ring:${f.ring}"><span>${kippiSvg(k)}</span></span>`}
function renderAvatarChip(){const b=$('menuProfile');if(!b)return;
  b.innerHTML=avatarHtml('xs')+`<span class="dot" id="loginDot"${Login.can()?'':' style="display:none"'}>🎁</span>`}
const profName=()=>{try{return (Games.signedIn&&Games.player&&Games.player.name)||playerName||I18N.tr('Spieler')}catch(e){return playerName||I18N.tr('Spieler')}};
// Höchstes erreichtes Etappen-Level
function profLevel(){const n=Math.max(0,...Object.keys(LP).map(Number).filter(x=>LP[x]));if(!n)return{t:'–',s:''};
  return{t:LP[LEVELS.length]?I18N.tr('alle')+' ✓':stg(Math.min(n+1,LEVELS.length)),s:I18N.tr('Welt')+' '+Math.ceil(Math.min(n+1,LEVELS.length)/10)}}
function profEndless(){let best=0,bk='';for(const k of BOARDS){const v=MaxLv.get(k)||0;if(v>best||(v===best&&v&&bN(k)>bN(bk||'5'))){best=v;bk=k}}
  return best?{t:'Level '+best,s:bLabel(bk,true)}:{t:'–',s:''}}
function openProfile(){Unlocks.check(true);Badges.check(true);
  ['startOv','loginOv','custOv'].forEach(i=>$(i).classList.add('hidden'));
  const P=PStats.get(),lv=profLevel(),en=profEndless(),cur=ST?ST.cur:0;
  $('prAva').innerHTML=avatarHtml('lg');$('prName').textContent=profName();$('prTitle').textContent=I18N.tr(curTitle().n);
  $('prBonus').classList.toggle('ready',Login.can());
  $('prBonusTxt').textContent=Login.can()?I18N.tr('Bereit zum Abholen'):I18N.tr('Morgen wieder')+' · '+I18N.tr('Woche')+' '+(Math.floor(((Login.state().n-1+28)%28)/7)+1);
  const tile=(c,l,v,s)=>`<div class="pr-stat"><small>${I18N.tr(l)}</small><b style="color:var(${c})">${v}</b>${s?`<small>${s}</small>`:''}</div>`;
  $('prStats').innerHTML=
    tile('--c3','Etappe',lv.t,lv.s)+
    tile('--c5','Serie',cur+' '+I18N.tr(cur===1?'Tag':'Tage'),I18N.tr('Rekord')+' '+(ST?ST.best:0))+
    tile('--c1','Sterne','⭐ '+totalStars(),'')+
    tile('--c4','Beste Kombo',P.combo?'×'+P.combo:'–','')+
    tile('--c2','Endlos-Rekord',en.t,en.s)+
    tile('--text','Tagesspiele',String(dailyCount()),'');
  // Vitrine: die drei wertvollsten erreichten Abzeichen
  const got=BADGES.filter(b=>Badges.has(b.id)).sort((a,b)=>b.pts-a.pts||Badges.date(a.id).localeCompare(Badges.date(b.id))).slice(0,3);
  $('prShelfCount').textContent=BADGES.filter(b=>Badges.has(b.id)).length+' / '+BADGES.length+' '+I18N.tr('Abzeichen')+' ›';
  $('prShelf').innerHTML=got.length?got.map(b=>`<div class="pr-badge"><span class="be">${b.e}</span><small>${I18N.tr(b.n)}</small></div>`).join('')+
    Array.from({length:3-got.length},()=>'<div class="pr-badge empty"><span class="be">?</span><small>–</small></div>').join('')
    :`<p class="hint">${I18N.tr('Noch keine Abzeichen – spiel einfach los!')}</p>`;
  // Beste Platzierungen (aus der weltweiten Rangliste, nur mit Google Play Games)
  const aw=Awards.all(),rows=[];
  if(P.rd)rows.push(['Tagesspiel · Tag',I18N.tr('Platz')+' '+P.rd]);
  if(P.rw)rows.push(['Tagesspiel · Woche',I18N.tr('Platz')+' '+P.rw]);
  if(aw.d1)rows.push(['Tagessiege','× '+aw.d1]);
  if(aw.w1)rows.push(['Wochensiege','× '+aw.w1]);
  $('prRanks').innerHTML=rows.length?rows.map(([l,v])=>`<div class="pr-row"><span>${I18N.tr(l)}</span><b>${v}</b></div>`).join('')
    :`<p class="hint">${I18N.tr('Noch keine Platzierung – spiel das Tagesspiel mit Google Play Games.')}</p>`;
  $('profOv').classList.remove('hidden');$('profOv').scrollTop=0}
function closeProfile(){$('profOv').classList.add('hidden');showMenu()}
$('menuProfile').onclick=()=>openProfile();
$('prClose').onclick=closeProfile;
$('prEdit').onclick=()=>openCustom();
$('prBonus').onclick=()=>openLogin('profile');
$('prShelfCount').onclick=()=>{$('profOv').classList.add('hidden');openCollection('badges');collReturn='profile'};

// ---------- Profil anpassen: Kippi · Rahmen · Titel ----------
let custTab='frame';
function renderCustom(){
  $('cuAva').innerHTML=avatarHtml('lg');$('cuName').textContent=profName();$('cuTitle').textContent=I18N.tr(curTitle().n);
  $('cuTabs').querySelectorAll('button').forEach(b=>b.classList.toggle('on',b.dataset.t===custTab));
  const lockTxt=(how,pk)=>`<small>${pk?'🛍 ':''}${I18N.tr(how)}</small>`;
  let h='';
  if(custTab==='kippi'){const ck=settings.kippi||'none';
    h=REWARDS.filter(r=>r.t==='kippi').map(r=>{const un=Unlocks.has('kippi',r.id);
      return`<button class="tcard${un?'':' lock'}${ck===r.id&&un?' on':''}" data-kp="${r.id}" ${un?'':'disabled'}><span class="kv">${kippiSvg(r.id)}</span>${un?'':'🔒 '}${I18N.tr(KIPPI_NAMES[r.id])}${un?`<small>${I18N.tr(ck===r.id?'aktiv':'frei')}</small>`:lockTxt(r.how,r.paket)}</button>`}).join('')}
  if(custTab==='frame'){const cf=curFrame().id;
    h=FRAMES.map(f=>{const un=frameOwned(f);
      return`<button class="tcard${un?'':' lock'}${cf===f.id?' on':''}" data-fr="${f.id}" ${un?'':'disabled'}><span class="ava-ring md" style="--ring:${f.ring}"><span></span></span>${un?'':'🔒 '}${I18N.tr(f.n)}${un?`<small>${I18N.tr(cf===f.id?'aktiv':'frei')}</small>`:lockTxt(f.how,f.paket)}</button>`}).join('')}
  if(custTab==='title'){const ct=curTitle().id;
    h=TITLES.map(t=>{const un=titleOwned(t);
      return`<button class="tcard ttl${un?'':' lock'}${ct===t.id?' on':''}" data-ti="${t.id}" ${un?'':'disabled'}><b>${un?'':'🔒 '}${I18N.tr(t.n)}</b>${un?`<small>${I18N.tr(ct===t.id?'aktiv':'frei')}</small>`:lockTxt(t.how,t.paket)}</button>`}).join('')}
  $('cuGrid').className='coll-grid'+(custTab==='title'?' two':'');$('cuGrid').innerHTML=h}
function openCustom(){$('profOv').classList.add('hidden');renderCustom();$('custOv').classList.remove('hidden');$('custOv').scrollTop=0}
function closeCustom(){$('custOv').classList.add('hidden');openProfile()}
$('cuTabs').onclick=e=>{const b=e.target.closest('button[data-t]');if(!b)return;custTab=b.dataset.t;renderCustom()};
$('cuGrid').onclick=e=>{const b=e.target.closest('button');if(!b||b.disabled)return;
  if(b.dataset.kp){settings.kippi=b.dataset.kp;applyKippi();try{Fly.react&&Fly.react('record')}catch(x){}}
  else if(b.dataset.fr)settings.frame=b.dataset.fr;
  else if(b.dataset.ti)settings.title=b.dataset.ti;
  else return;
  saveSettings();renderCustom()};
$('cuClose').onclick=closeCustom;
