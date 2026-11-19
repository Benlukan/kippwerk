// ---------- Hilfe ----------
const COLOR_NAMES=['Rot','Gelb','Grün','Blau','Lila','Orange'];
const CHANGES=[
 ['1.29.2','Einstellungen → „Ranglisten prüfen“: zeigt, ob deine Ergebnisse bei Google Play Games angekommen sind'],
 ['1.29.1','Auch auf Tablets, Chromebooks und PC über Google Play installierbar'],
 ['1.29.0','Weltweite Bestenlisten über Google Play Games: Endlos 5×5 bis 8×8 und Tagesspiel, dazu Spielstand-Sicherung in der Cloud'],
 ['1.28.1','Kippi landet nur noch dort, wo er nichts verdeckt – Spielfeld, Anzeigen und Knöpfe bleiben immer frei'],
 ['1.28.0','Neuer Aufbau des Quellcodes in Module (keine sichtbaren Änderungen) – Grundlage für künftige Updates'],
 ['1.27.1','Vibration auf Android repariert (eigene Ansteuerung) + Knopf „Vibration testen“ in den Einstellungen'],
 ['1.27.0','Die Fliege heißt Kippi: Sie erklärt das Tutorial, meldet sich in den Erinnerungen und hat ein eigenes Benachrichtigungs-Symbol'],
 ['1.26.0','Neues Maskottchen: die KIPPWERK-Fliege · Musik wird mit dem Level schneller, Boss-Etappen mit eigenem Stück · Schutz gegen geschummelte Ranglisten-Einträge'],
 ['1.25.2','Englisch: Datum im Menü und Wochentage der Serie übersetzt; kleine Darstellungs-Korrekturen'],
 ['1.25.1','Tempo-Auswahl entfernt – das Spiel läuft immer im normalen Tempo'],
 ['1.25.0','Lautstärkeregler für Effekte und Musik, Vibration Aus/Sanft/Stark (deutlich spürbarer), Bestenliste mit bester Combo, Zügen und abgeräumten Steinen, Einstellungen neu sortiert'],
 ['1.24.1','Symbole auf den Steinen etwas größer'],
 ['1.24.0','Geführtes Tutorial beim ersten Start, Musik, Partikel und stärkere Combo-Effekte, Menü-Steine folgen der Handy-Neigung'],
 ['1.23.0','Englische Sprache (folgt der Systemsprache, umschaltbar in ⚙), robustere Spielstände, Tablet-Darstellung korrigiert, Datenschutzerklärung aktualisiert'],
 ['1.22.0','Endlos auf 7×7 und 8×8: ab Level 30 Felsen, ab Level 40 eine 6. Farbe (★ Orange)'],
 ['1.21.0','Belohnungen für Tages- und Wochenplätze (Extra-Leben, Abzeichen) – Ranglisten-Erfolge auf der Serien-Seite'],
 ['1.20.2','Verlauf: MONSTER (×5, lila) und ULTRA (×6+, weiß) eigene Farben statt wie MEGA; Endlos wieder „letzten 40 Züge“'],
 ['1.20.0','Combo-Leiste (Abgeräumt, Good, Super, Mega, Monster, Ultra), neue Stufe ULTRA ab ×6 mit ❤ Extra-Leben, Info-Leiste unten'],
 ['1.19.2','Hauptmenü: Steine stehen unter der Top-5-Liste (etwa ab Bildschirmmitte) und rutschen bei längerer Liste oder kleinem Display nach unten'],
 ['1.19.1','Feste Positionen statt mittig (Menü, Spielfeld, Listen); Etappenkarte nutzt die ganze Höhe; Tagesspiel zeigt die Punktzahl des Tages statt Endlos-Rekord'],
 ['1.19.0','Hauptmenü: Top 5 im Tagesspiel (Heute / Woche / Alle) aus Google Play Games / Game Center'],
 ['1.18.2','Vollbild: Uhrzeit- und Navigationsleiste ausgeblendet, erscheinen beim Wischen vom Rand'],
 ['1.18.1','Level heißen jetzt Etappen: „Etappe 2-3“ = Welt 2, dritte Etappe'],
 ['1.18.0','Level deutlich leichter (mehr Züge, Sterne leichter), große Sterne in der Levelkarte, Combo-Zähler pro Spiel'],
 ['1.17.0','Spielstand in der Cloud: Fortschritt geräteübergreifend über Google Play Games / Game Center'],
 ['1.16.1','Startbildschirm: Schriftzug KIPPWERK steht jetzt über den Steinen'],
 ['1.16.0','Hauptmenü: die gekippten Logo-Steine sind die Knöpfe, Beschriftung dezent daneben'],
 ['1.15.0','Weltweite Ranglisten über Google Play Games / Game Center statt eigenem Server; Menü-Steine kleiner'],
 ['1.14.0','Hauptmenü neu: die vier Steine des Logos sind jetzt die Knöpfe'],
 ['1.13.0','Tagesrätsel heißt jetzt Tagesspiel (mit Datum); Bestenliste Heute / Woche / All the best'],
 ['1.12.0','Neuer Startbildschirm mit Modus-Karten, Pause-Karte und animiertem Logo'],
 ['1.11.2','Zurück-Taste: pausiert bzw. zurück ins Menü; Verlauf in festem Raster, Spielfeld springt nicht mehr'],
 ['1.11.1','Serie direkt im Startmenü erreichbar'],
 ['1.11.0','Serien fürs Tagesrätsel: Flamme, Serienschutz, Meilensteine mit 6 Designs, Erinnerung am Abend'],
 ['1.10.0','Weltweite Online-Bestenliste (freiwillig): Tagesrätsel des Tages und Endlos je Feldgröße'],
 ['1.9.3','Info-Leiste am PC als Seitenleiste neben dem Spielfeld; Menüs scrollbar auf niedrigen Bildschirmen'],
 ['1.9.1','Hinweis auf kommende Welten nach Level 100'],
 ['1.9.0','Feldgrößen 5×5 bis 8×8, Bestenliste je Größe, Spielername im Tagesrätsel, einmalige Spieler-ID, Hilfe mit Farb-Erklärung'],
 ['1.8.0','Ganze Bildschirmhöhe genutzt, Info-Leiste mit Verlauf und Zielen'],
 ['1.7.0','Combo-Stufen GOOD, SUPER, MEGA und MONSTER'],
 ['1.5.0','100 Level in 10 Welten mit Boss-Leveln'],
 ['1.4.0','Level-Modus, Einstellungen, Vibration'],
 ['1.2.0','Bestenliste'],['1.1.0','Tagesrätsel zum Teilen']];
let helpReturn=null;
function openHelp(section,from){
  helpReturn=from||(!$('startOv').classList.contains('hidden')?'start':!$('settingsOv').classList.contains('hidden')?'settings':'play');
  if(helpReturn==='play'&&started&&!over){paused=true;started=false}
  const hb=$('helpOv').querySelector('.help');if(!hb.dataset.de)hb.dataset.de=hb.innerHTML;
  const hl=I18N.lang==='en'?'en':'de';if(hb.dataset.l!==hl){hb.innerHTML=hl==='en'?HELP_EN:hb.dataset.de;hb.dataset.l=hl}
  $('helpColors').innerHTML=COLOR_NAMES.map((n,i)=>`<div class="row"><span class="sw" style="background:${COLORS[i]}">${SYMBOLS[i]}</span><span><b>${I18N.tr(n)}</b> ${SYMBOLS[i]}${I18N.tr(i===4?' – kommt ab Level 3 dazu (im Endlos-Modus; auf 7×7 und 8×8 von Anfang an)':i===5?' – nur Endlos auf 7×7 und 8×8, ab Level 40':'')}</span></div>`).join('');
  $('helpChangelog').innerHTML='<ul>'+CHANGES.map(c=>`<li><b>v${c[0]}</b> – ${I18N.lang==='en'&&CHANGES_EN[c[0]]||c[1]}</li>`).join('')+'</ul>';
  ['startOv','settingsOv','overOv'].forEach(i=>$(i).classList.add('hidden'));$('helpOv').classList.remove('hidden');
  const el=section&&$(section);$('helpOv').scrollTop=el?el.offsetTop-20:0;
}
$('helpOv').addEventListener('click',e=>{if(e.target.closest('#tutBtn'))startTutorial()});
$('helpOv').onclick=e=>{const b=e.target.closest('.toc button');if(b){const el=$(b.dataset.s);$('helpOv').scrollTo({top:el.offsetTop-20,behavior:'smooth'})}};
$('closeHelp').onclick=()=>{$('helpOv').classList.add('hidden');
  if(helpReturn==='settings')$('settingsOv').classList.remove('hidden');
  else if(helpReturn==='play'){if(paused){paused=false;started=true}}
  else showMenu()};
$('menuHelp').onclick=()=>openHelp(null,'start');
$('settingsHelp').onclick=()=>openHelp(null,'settings');
$('infobar').addEventListener('click',e=>{const b=e.target.closest('[data-help]');if(b&&!busy&&!over)openHelp(b.dataset.help,'play')});
try{if(!localStorage.getItem('kippwerk_helpseen')){localStorage.setItem('kippwerk_helpseen','1');setTimeout(()=>{if(!$('startOv').classList.contains('hidden'))startTutorial()},900)}}catch(e){}
$('menuScores').onclick=()=>openScores('endless');
$('rescueBtn').onclick=rescue;$('lifeBtn').onclick=useLife;
$('noRescueBtn').onclick=()=>{$('rescueOv').classList.add('hidden');finishGame('full')};
$('privacyBtn').onclick=()=>Ads.privacy();
$('shareBtn').onclick=async()=>{
  const txt=$('shareBox').textContent,b=$('shareBtn');
  const C=window.Capacitor;
  const Native=C&&C.isNativePlatform&&C.isNativePlatform()&&((C.Plugins&&C.Plugins.Share)||(C.registerPlugin&&C.registerPlugin('Share')));
  if(Native){try{await Native.share({text:txt,dialogTitle:I18N.tr('Ergebnis teilen')})}catch(e){}return}
  try{if(navigator.share&&matchMedia('(hover:none)').matches){await navigator.share({text:txt});return}}catch(e){if(e&&e.name==='AbortError')return}
  try{await navigator.clipboard.writeText(txt);b.textContent='✓ KOPIERT'}
  catch(e){const r=document.createRange();r.selectNodeContents($('shareBox'));const s=getSelection();s.removeAllRanges();s.addRange(r);b.textContent='TEXT MARKIERT – KOPIEREN'}
  setTimeout(()=>b.textContent='ERGEBNIS TEILEN',2000);
};
$('saveName').onclick=()=>{
  const n=$('nameInput').value.trim().slice(0,12)||'Spieler';playerName=n;
  try{localStorage.setItem('kippwerk_name',n);localStorage.setItem('kippwerk_name_at',String(Date.now()))}catch(e){}
  if(lastEntry){lastEntry.name=n;saveScores()}
  for(const l of [scores.endless,scores.daily])for(const x of l)if(x.pid===playerId&&(x.name==='Spieler'||!x.name))x.name=n;saveScores();
  $('nameInput').blur();$('saveName').textContent='✓ GESPEICHERT';try{$('setName').value=n}catch(e){}};
let scoresTab='endless',scoresReturn=null,scoresSize=6,scoresPeriod='day';
$('periodTabs').onclick=e=>{const b=e.target.closest('button');if(!b)return;scoresPeriod=b.dataset.p;renderScores()};
const PERIOD_TXT={day:()=>'Tagesspiel '+dayLabel(dailyNo()),week:()=>'Woche '+dayShort(weekOf(dailyNo()))+' – '+dayShort(weekOf(dailyNo())+6),all:()=>'Beste Tagesspiele aller Zeiten'};
function renderGamesBtn(){const b=$('gamesBoard');b.style.display=Games.available?'':'none';
  b.textContent='🌍 WELTWEIT · '+(scoresTab==='endless'?scoresSize+'×'+scoresSize:'TAGESSPIEL');b.title=Games.label}
$('gamesBoard').onclick=()=>Games.show(scoresTab==='endless'?'e'+scoresSize:'daily');
$('sizeTabs').onclick=e=>{const b=e.target.closest('button');if(!b)return;scoresSize=+b.dataset.n;renderScores()};
const tag=x=>x.pid?`<small class="ptag">#${String(x.pid).replace(/-/g,'').slice(0,4).toUpperCase()}</small>`:'';
const escH=x=>String(x).replace(/[&<>"]/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;'}[c]));
// Zusatzzeile in der Bestenliste: Level · beste Combo · Züge · abgeräumte Steine · Datum
function metaLine(x,lvl,date){const en=I18N.lang==='en',p=[];
  if(lvl)p.push(lvl);
  if(x.chain>0)p.push(`<span class="cb">Combo ×${x.chain}</span>`);
  if(x.moves>0)p.push(`${x.moves} ${en?(x.moves===1?'move':'moves'):(x.moves===1?'Zug':'Züge')}`);
  if(x.cleared>0)p.push(`${x.cleared} ${en?'stones':'Steine'}`);
  if(date)p.push(date);return p.join(' · ')}
function renderScores(){
  $('tabEndless').classList.toggle('on',scoresTab==='endless');$('tabDaily').classList.toggle('on',scoresTab==='daily');
  const t=$('scoresTable'),esc=escH;
  $('sizeTabs').style.display=scoresTab==='endless'?'':'none';
  $('periodTabs').style.display=scoresTab==='daily'?'':'none';
  $('periodTabs').querySelectorAll('button').forEach(b=>b.classList.toggle('on',b.dataset.p===scoresPeriod));
  $('sizeTabs').querySelectorAll('button').forEach(b=>b.classList.toggle('on',+b.dataset.n===scoresSize));
  renderGamesBtn();
  const today=dailyNo(),wk=weekOf(today);
  const dl=scores.daily.filter(x=>scoresPeriod==='day'?x.no===today:scoresPeriod==='week'?x.no>=wk&&x.no<wk+7:true);
  const list=(scoresTab==='endless'?sizeList(scoresSize):dl).slice(0,TOP);
  $('dailyStats').style.display=scoresTab==='daily'?'':'none';
  if(scoresTab==='daily'&&scoresPeriod==='week'){const sum=dl.reduce((a,x)=>a+x.score,0),bst=dl.reduce((a,x)=>Math.max(a,x.score),0);
    $('dailyStats').innerHTML=`<div><b>${sum.toLocaleString(LOC())}</b><small>Wochensumme</small></div><div><b>${dl.length}/7</b><small>Tage</small></div><div><b>${bst.toLocaleString(LOC())}</b><small>Bester Tag</small></div>`}
  else if(scoresTab==='daily'){const st=dailyStats();
    $('dailyStats').innerHTML=`<div><b>${st.played}</b><small>Gespielt</small></div><div><b>${st.streak}🔥</b><small>Serie</small></div><div><b>${st.best.toLocaleString(LOC())}</b><small>Bester</small></div><div><b>${st.avg.toLocaleString(LOC())}</b><small>Schnitt</small></div>`}
  t.innerHTML=list.map((x,i)=>{const medal=['🥇','🥈','🥉'][i]||(i+1)+'.';
    return scoresTab==='endless'
      ?`<tr class="${x===lastEntry?'me':''}"><td class="rank">${medal}</td><td>${esc(x.name)}${tag(x)}<small class="sub">${metaLine(x,x.level?'Lvl '+x.level:'',esc(x.date))}</small></td><td class="r">${x.score.toLocaleString(LOC())}</td></tr>`
      :`<tr class="${x===lastEntry?'me':''}"><td class="rank">${medal}</td><td>${esc(x.name||playerName||'Spieler')}${tag(x)}<small class="sub">${metaLine(x,'',dayLabel(x.no))}</small></td><td class="r">${x.score.toLocaleString(LOC())}</td></tr>`}).join('');
  $('scoresEmpty').style.display=list.length?'none':'';
  $('scoresEmpty').textContent=scoresTab==='endless'?`Noch keine Einträge auf ${scoresSize}×${scoresSize} – spiel eine Runde Endlos!`:scoresPeriod==='day'?'Heute noch nicht gespielt – das Tagesspiel wartet!':scoresPeriod==='week'?'Diese Woche noch kein Tagesspiel gespielt.':'Noch kein Tagesspiel gespielt.';
  $('periodInfo').textContent=scoresTab==='daily'?PERIOD_TXT[scoresPeriod]():'';$('periodInfo').style.display=scoresTab==='daily'?'':'none';
}
function openScores(tab){
  scoresReturn=!$('overOv').classList.contains('hidden')?'over':!$('startOv').classList.contains('hidden')?'start':null;
  if(started&&!over){paused=true;started=false;scoresReturn='pause'}
  $('overOv').classList.add('hidden');$('startOv').classList.add('hidden');
  scoresTab=(tab==='level'?'endless':tab)||scoresTab;scoresSize=mode==='endless'?N:(+settings.size||6);renderScores();$('scoresOv').classList.remove('hidden')}
$('scoresBtn').onclick=()=>{if(busy||document.querySelector('.overlay:not(.hidden)'))return;openScores(mode==='level'?'endless':mode)};
$('overScoresBtn').onclick=()=>openScores(mode);
$('tabEndless').onclick=()=>{scoresTab='endless';renderScores()};
$('tabDaily').onclick=()=>{scoresTab='daily';renderScores()};
$('closeScores').onclick=()=>{$('scoresOv').classList.add('hidden');
  if(scoresReturn==='over')$('overOv').classList.remove('hidden');else if(scoresReturn==='start'||scoresReturn==='pause')showMenu()};
$('helpBtn').onclick=()=>{if(over||busy)return;
  if(started){paused=true;started=false}
  showMenu()};

initStreak();
applySettings();
newGame();showMenu();
setTimeout(()=>Reminder.schedule(),2000);
try{const A=AppPlugin();if(A)A.addListener('backButton',()=>handleBack())}catch(e){}
document.addEventListener('visibilitychange',()=>{if(document.hidden&&started&&!over&&!adBusy){const go=()=>{if(busy)return setTimeout(go,200);pauseToMenu()};go()}});
document.addEventListener('visibilitychange',()=>{if(!document.hidden&&ST){const m=checkStreak();renderStreakChip();if(m&&!$('startOv').classList.contains('hidden'))showMenu()}});
