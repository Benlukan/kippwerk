// ---------- Input ----------
const keys={ArrowLeft:'L',ArrowRight:'R',ArrowUp:'U',ArrowDown:'D',a:'L',d:'R',w:'U',s:'D',A:'L',D:'R',W:'U',S:'D'};
document.addEventListener('keydown',e=>{
  if(!$('rescueOv').classList.contains('hidden'))return;
  if(!$('lvlOv').classList.contains('hidden')){if(e.key==='Enter'||e.key===' '){e.preventDefault();$('lvlMain').click()}else if(e.key==='Escape')$('lvlMap').click();return}
  if(!$('levelsOv').classList.contains('hidden')){if(e.key==='Escape')$('closeLevels').click();return}
  if(!$('settingsOv').classList.contains('hidden')){if(e.key==='Escape')$('closeSettings').click();return}
  if(!$('helpOv').classList.contains('hidden')){if(e.key==='Escape'||e.key==='Enter')$('closeHelp').click();return}
  if(!$('streakOv').classList.contains('hidden')){if(e.key==='Escape')closeStreak();return}
  if(e.target.tagName==='INPUT'){if(e.key==='Enter'){e.preventDefault();e.target.id==='setName'?e.target.blur():$('saveName').click()}return}
  if(!$('scoresOv').classList.contains('hidden')){if(e.key==='Escape')$('closeScores').click();return}
  if(e.key==='Escape'&&started&&!over){e.preventDefault();handleBack();return}
  if(keys[e.key]){e.preventDefault();move(keys[e.key])}
  else if((e.key==='Enter'||e.key===' ')&&over){e.preventDefault();start(mode)}
});
let sx=0,sy=0,tracking=false;
document.addEventListener('pointerdown',e=>{if(e.target.closest('button,input,.overlay:not(.hidden)'))return;sx=e.clientX;sy=e.clientY;tracking=true});
document.addEventListener('pointerup',e=>{
  if(!tracking)return;tracking=false;
  const dx=e.clientX-sx,dy=e.clientY-sy;if(Math.max(Math.abs(dx),Math.abs(dy))<24)return;
  move(Math.abs(dx)>Math.abs(dy)?(dx>0?'R':'L'):(dy>0?'D':'U'));
});
document.querySelectorAll('.pad button').forEach(b=>b.addEventListener('click',()=>move(b.dataset.d)));
function start(m){mode=m;paused=false;['startOv','overOv','lvlOv','levelsOv'].forEach(i=>$(i).classList.add('hidden'));newGame();started=true;tone(660,.1,'triangle',.06);musicSync()}
document.querySelectorAll('.hl[data-for]').forEach(l=>l.onclick=()=>$(l.dataset.for).click());
function showMenu(){
  if(tut)endTut();
  setTimeout(musicSync,0);
  const done=loadDaily(),cur=ST?ST.cur:0;
  // Tagesspiel
  $('dailyNoTxt').textContent=dayLabel(dailyNo());
  $('dailyHint').textContent=done?`✓ ${done.score.toLocaleString(LOC())} Punkte`:'offen bis '+dayStartTime();
  $('dailyBtn').classList.toggle('open',!done);
  // Level
  const un=unlocked(),all=!!LP[LEVELS.length],w=Math.ceil(Math.min(un,LEVELS.length)/10);
  $('levelTitle').textContent=all?'Etappen ✓':'Etappe '+stg(un);
  $('levelSub').textContent=WORLDS[w-1]||'Welt '+w;$('levelStars').textContent='⭐ '+totalStars();
  $('levelBar').style.width=Math.max(3,Object.keys(LP).length/LEVELS.length*100)+'%';
  // Endlos
  const sz=curBoard(),bs=bestFor(sz);renderSizeSegs();
  $('endlessSize').textContent=bLabel(sz);
  $('endlessSub').textContent=bs?'Rekord '+bs.toLocaleString(LOC()):'Rekord –';
  document.querySelectorAll('.seg[data-key="size"] button').forEach(b=>b.classList.toggle('on',b.dataset.v===sz));
  // Serie, Pause, Fußzeile
  $('menuLives').style.display=lives>0?'':'none';$('menuLivesNum').textContent=lives;
  renderStreakChip();$('menuStreakNum').textContent=cur;$('menuStreak').className='streakchip'+(ST&&ST.last===todayKey()?' done':cur>0?' open':'');
  $('startOv').classList.toggle('paused',!!paused);$('resumeBtn').style.display=paused?'':'none';
  if(paused)$('resumeInfo').textContent=(mode==='daily'?`Tagesspiel ${dayLabel(dailyNo())} · noch ${movesLeft} Züge`:mode==='level'?`Etappe ${stg(lvNo)} · noch ${movesLeft} Züge`:`Endlos ${bLabel(BK)} · ${score.toLocaleString(LOC())} Punkte`);
  $('heroTag').textContent=paused?'Pause':'Kippen. Verbinden. Kettenreaktion.';
  $('privacyBtn').style.display=Ads.privacyRequired?'':'none';
  $('homeVer').textContent=(document.querySelector('footer')||{}).textContent?.split('·').slice(0,2).join('·').trim()||'';
  ['overOv','lvlOv','levelsOv','settingsOv','streakOv'].forEach(i=>$(i).classList.add('hidden'));$('startOv').classList.remove('hidden');
  try{Cloud.onMenu()}catch(e){}
  try{Top5.refresh()}catch(e){}
  try{Awards.check()}catch(e){}
}
$('dailyBtn').onclick=()=>start('daily');
$('endlessBtn').onclick=()=>start('endless');
$('resumeBtn').onclick=()=>{paused=false;started=true;$('startOv').classList.add('hidden');musicSync()};
$('againBtn').onclick=()=>{maybeInter();start(mode)};
$('menuBtn').onclick=()=>{maybeInter();started=false;showMenu()};
$('levelBtn').onclick=()=>{if(paused){paused=false}openLevels()};
$('lvGrid').onclick=e=>{const b=e.target.closest('.lvbtn');if(b&&!b.disabled)levelIntro(+b.dataset.n)};
$('closeLevels').onclick=()=>showMenu();
$('lvlMain').onclick=()=>lvlMainFn&&lvlMainFn();
$('lvlRetry').onclick=()=>{maybeInter();start('level')};
$('lvlMap').onclick=()=>{maybeInter();openLevels()};
// Einstellungen
let settingsReturn=null,resetArm={};
// Feldauswahl (Menü + Einstellungen): nur freigeschaltete Felder
function renderSizeSegs(){const cur=curBoard();document.querySelectorAll('.seg[data-key="size"]').forEach(sg=>{const big=!!sg.closest('.home-size');
  const h=BOARDS.filter(boardOpen).map(k=>`<button data-v="${k}"${k===cur?' class="on"':''}>${big?bLabel(k):bN(k)+(bH(k)?'🪨':'')}</button>`).join('');if(sg.innerHTML!==h)sg.innerHTML=h})}
function renderSettings(){renderSizeSegs();
  $('setName').value=playerName;$('pidText').textContent=shortId(playerId)+' '+myTag();
  $('newsVer').textContent='v'+APP_VER;
  $('themeName').textContent=I18N.tr(THEME_NAMES[settings.theme]||'Standard')+(settings.kippi&&settings.kippi!=='none'?' · 🪰':'');
  $('remindRow').style.display=Reminder.native?'':'none';$('setRemind').checked=!!settings.remind;
  $('setSfxVol').value=settings.sfxVol;$('setMusicVol').value=settings.musicVol;volTxt();$('setTilt').checked=settings.tilt!==false;$('setFly').checked=settings.fly!==false;$('setSymbols').checked=settings.symbols;
  document.querySelectorAll('.seg[data-key]').forEach(sg=>sg.querySelectorAll('button').forEach(b=>b.classList.toggle('on',settings[sg.dataset.key]===b.dataset.v)));
  $('privacyBtn2').style.display=Ads.privacyRequired?'':'none';
  renderGamesRow();
  $('resetScores').textContent='🏆 Bestenliste löschen';$('resetLevels').textContent='🗺 Level-Fortschritt löschen';resetArm={};
}
function openSettings(from){
  settingsReturn=from;
  if(from==='play'){paused=true;started=false}
  renderSettings();['startOv','overOv'].forEach(i=>$(i).classList.add('hidden'));$('settingsOv').classList.remove('hidden');
}
function volTxt(){$('sfxVolTxt').textContent=settings.sfxVol?settings.sfxVol+' %':I18N.tr('Aus');$('musicVolTxt').textContent=settings.musicVol?settings.musicVol+' %':I18N.tr('Aus')}
$('setSfxVol').oninput=e=>{settings.sfxVol=+e.target.value;settings.sound=settings.sfxVol>0;volTxt()};
$('setSfxVol').onchange=()=>{saveSettings();applySettings();tone(660,.1,'triangle',.06)};
$('setMusicVol').oninput=e=>{settings.musicVol=+e.target.value;settings.music=settings.musicVol>0;volTxt();settings.musicVol>0?(Music.playing?Music.volume():Music.start()):Music.stop()};
$('setMusicVol').onchange=()=>saveSettings();
$('setTilt').onchange=e=>{settings.tilt=e.target.checked;saveSettings();Tilt.wake()};
$('vibeTest').onclick=testVibration;
$('gamesTest').onclick=async()=>{const o=$('gamesDiag');o.textContent='…';try{o.textContent=await Games.diag()}catch(e){o.textContent='⚠ '+(e&&e.message||e)}renderGamesRow()};
$('setFly').onchange=e=>{settings.fly=e.target.checked;saveSettings();if(!settings.fly)Fly.away(true)};
$('setSymbols').onchange=e=>{settings.symbols=e.target.checked;saveSettings();applySettings()};
document.querySelectorAll('.seg').forEach(sg=>sg.onclick=e=>{const b=e.target.closest('button');if(!b)return;
  settings[sg.dataset.key]=b.dataset.v;saveSettings();applySettings();renderSettings();
  if(sg.dataset.key==='size'&&!$('startOv').classList.contains('hidden'))showMenu();
  if(sg.dataset.key==='lang')applyLang();
  if(sg.dataset.key==='vibe')haptic('heavy')});
function applyLang(boot){
  if(!boot)I18N.setLang(I18N.resolve(settings.lang));
  const en=I18N.lang==='en';
  document.querySelectorAll('a[href^="datenschutz"],a[href^="privacy"]').forEach(a=>a.href=en?'privacy.html':'datenschutz.html');
  document.querySelectorAll('a[href^="impressum"],a[href^="legal-notice"]').forEach(a=>a.href=en?'legal-notice.html':'impressum.html');
  if(boot)return;
  try{render()}catch(e){}try{renderStreakChip()}catch(e){}
  try{if(!$('startOv').classList.contains('hidden'))showMenu()}catch(e){}}
function armReset(id,label,fn){
  if(resetArm[id]){fn();$(id).textContent='✓ Gelöscht';resetArm[id]=false;return}
  resetArm[id]=true;$(id).textContent='⚠ Wirklich? Nochmal tippen';
  setTimeout(()=>{if(resetArm[id]){resetArm[id]=false;$(id).textContent=label}},3000)}
$('resetScores').onclick=()=>armReset('resetScores','🏆 Bestenliste löschen',()=>{scores={endless:[],daily:[]};saveScores();best=0;try{localStorage.removeItem('kippwerk_best')}catch(e){};render()});
$('resetLevels').onclick=()=>armReset('resetLevels','🗺 Level-Fortschritt löschen',()=>{LP={};saveLP()});
$('privacyBtn2').onclick=()=>Ads.privacy();
function renderGamesRow(){$('gamesRow').style.display=Games.available?'':'none';$('gamesDiagRow').style.display=Games.available?'':'none';
  $('gamesName').textContent='🎮 '+Games.label;$('gamesState').textContent=Games.signedIn?('✓ angemeldet'+(Games.savesOn?' · ☁ '+(Cloud.last||'…'):'')):'Anmelden'}
$('gamesRow').onclick=async()=>{if(Games.signedIn){Games.show(null);return}$('gamesState').textContent='⏳';await Games.signIn();renderGamesRow()};
// Angemeldet bei Play Games: Spielername kommt aus dem Google-Profil (Feld gesperrt)
function applyGoogleName(){const g=Games.signedIn&&Games.player&&Games.player.name,inp=$('setName');
  inp.readOnly=!!g;inp.title=g?I18N.tr('Name aus deinem Google Play Games-Profil'):'';
  if(g&&g!==playerName){playerName=g.slice(0,24);try{localStorage.setItem('kippwerk_name',playerName);localStorage.setItem('kippwerk_name_at',String(Date.now()))}catch(e){}}
  if(g)inp.value=playerName}
Games.onChange=()=>{try{if(Games.signedIn)setTimeout(()=>{try{Badges.resync()}catch(e){}},1500);applyGoogleName();renderGamesRow();renderGamesBtn();if(!$('scoresOv').classList.contains('hidden'))renderScores();if(!$('startOv').classList.contains('hidden'))Top5.refresh()}catch(e){}};
$('setName').onchange=e=>{if(e.target.readOnly)return;const n=e.target.value.trim().slice(0,12);if(!n)return;playerName=n;try{localStorage.setItem('kippwerk_name',n);localStorage.setItem('kippwerk_name_at',String(Date.now()))}catch(x){}
  for(const l of [scores.endless,scores.daily])for(const x of l)if(x.pid===playerId)x.name=n;saveScores()};
$('pidRow').onclick=async()=>{try{await navigator.clipboard.writeText(playerId);$('pidText').textContent='✓ kopiert'}catch(e){$('pidText').textContent=playerId}
  setTimeout(()=>$('pidText').textContent=shortId(playerId)+' '+myTag(),1800)};
$('closeSettings').onclick=()=>{$('settingsOv').classList.add('hidden');
  if(settingsReturn==='play'){paused=false;started=true}else showMenu()};
$('settingsBtn').onclick=()=>{if(busy||over||document.querySelector('.overlay:not(.hidden)'))return;openSettings('play')};
$('menuSettings').onclick=()=>openSettings('menu');
$('streakBtn').onclick=()=>{if(busy||!$('rescueOv').classList.contains('hidden'))return;openStreak()};
$('closeStreak').onclick=closeStreak;
$('menuStreak').onclick=()=>openStreak();

$('stkPlay').onclick=()=>{$('streakOv').classList.add('hidden');start('daily')};
$('stkMs').onclick=e=>{const b=e.target.closest('.ms');if(!b||b.disabled)return;if(b.dataset.coll){openCollection('badges');return}setTheme(b.dataset.th);renderStreak()};
$('stkAd').onclick=async()=>{const b=$('stkAd');b.disabled=true;b.textContent='VIDEO LÄDT …';const ok=await Ads.showReward();b.disabled=false;b.textContent='🎬 SCHUTZ PER VIDEO HOLEN';
  if(ok&&ST.shields<MAX_SHIELDS){ST.shields++;ST.adDay=todayKey();saveStreak();toast('🛡 Serienschutz erhalten!')}renderStreak()};
$('overOv').addEventListener('click',e=>{const b=e.target.closest('#applyMsTheme');if(b){setTheme(b.dataset.th);b.textContent='✓ angewendet'}});
$('setTheme').onclick=()=>openCollection('themes');
$('setRemind').onchange=async e=>{if(e.target.checked){const ok=await Reminder.enable();settings.remind=ok;e.target.checked=ok;if(!ok)toast('Benachrichtigungen sind für KIPPWERK nicht erlaubt (Handy-Einstellungen).')}else settings.remind=false;
  saveSettings();Reminder.schedule()};
