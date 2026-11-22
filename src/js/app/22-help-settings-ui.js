// ---------- Hilfe ----------
const COLOR_NAMES=['Rot','Gelb','Grün','Blau','Lila','Orange'];
const CHANGES=[
 ['2.0.2','„Als Nächstes“: Steine linksbündig'],
 ['2.0.1','„Als Nächstes“ zeigt jetzt alle Steine des nächsten Zugs – bei vielen Steinen in zwei Reihen'],
 ['2.0.0','KIPPWERK 2.0: Hinweis, wenn du überholt wirst (Platz 1, Top 3, Top 10) – Tagesspiel und alle Endlos-Felder. Aufgeräumtes Hauptmenü – Top 5 mit einem Umschalter (Liste und Zeitraum), Feldauswahl als Aufklappliste unter „Endlos“. Felder mit Hindernissen 7×7/8×8 schwerer (6. Farbe ab Level 30). Neu in ⚙: „Feedback geben“. Vorschau „Als Nächstes“ zeigt jetzt, wie viele Steine wirklich kommen (z. B. „+5“)'],
 ['1.40.3','Feldauswahl im Hauptmenü passt sich jetzt dem gewählten Design an – normale Felder oben, Felder mit Hindernissen darunter'],
 ['1.40.2','Weltweite Bestenlisten jetzt auch für 4×4, 9×9 und 10×10 – mit Woche Mo–So und „Gestern“'],
 ['1.40.1','Neue Abzeichen jetzt auch als Erfolge in Google Play Spiele; weltweite Bestenlisten für die Felder mit Hindernissen'],
 ['1.40.0','Neue Felder zum Freischalten: 4×4, 9×9, 10×10 sowie 6×6/7×7/8×8 mit Hindernissen 🪨 – zu finden in 🎨 Sammlung → Felder. 12 neue Abzeichen. Extra-Leben auf 9×9 ab Combo ×7, auf 10×10 ab ×8'],
 ['1.39.0','Endlos jetzt auch mit Woche Montag–Sonntag (beste Runde der Woche) und „Gestern“ – für jede Feldgröße'],
 ['1.38.0','Tagesspiel-Woche jetzt von Montag bis Sonntag: Punkte aller Tagesspiele der Woche zusammengezählt (weltweit, mit gespielten Tagen und bestem Tag). Endlos bleibt bei der Google-Woche So–Sa. Erfolge in Google Play Spiele aktiv, „Gestern“ im Tagesspiel'],
 ['1.37.0','Endlos-Bestenlisten jetzt auch nach Zeitraum: Heute, Woche (So–Sa) und Gesamt – weltweit und auf diesem Gerät'],
 ['1.36.1','Tageswechsel jetzt exakt wie bei Google: im Winter um 08:00 Uhr, im Sommer um 09:00 Uhr. „Woche“ heißt jetzt „Woche (So–Sa)“ – die Google-Woche beginnt sonntags'],
 ['1.36.0','Neues Menü „Sammlung“ (🎨 im Hauptmenü) mit Designs, Kippi-Outfits und 12 Abzeichen samt Fortschritt. Im Spiel führt „←“ oben links zurück ins Hauptmenü'],
 ['1.35.1','„Meine Tage“ zeigt jetzt auch deine Endlos-Runden – nach Tagen sortiert, mit Feldgröße, Level, Combo, Zügen und Steinen'],
 ['1.35.0','Bestenliste: neuer Reiter „Meine Tage“ mit all deinen Tagesspielen, Tag für Tag. Vorbereitet: „Gestern“ weltweit im Tagesspiel'],
 ['1.34.0','Neu: „Was ist neu?“ in den Einstellungen – und nach jedem Update einmal automatisch mit allen Neuerungen seit deiner letzten Version'],
 ['1.33.1','Design „Retro 8-Bit“: Auswahl-Knöpfe und Schalter jetzt gut erkennbar'],
 ['1.33.0','Neue Sammlung: 17 Designs und 8 Kippi-Outfits – freischaltbar über Welten, Serie, Endlos, Tagesspiele, Dezember, Silvester und Ostern. 6×6 bekommt ab Level 30 Felsen, die Musik wird je Feldgröße passend schneller'],
 ['1.32.0','Das KIPPWERK-Thema: eine eigene Melodie zum Mitsummen in Menü und Spiel. Das Tempo steigt mit dem Level und wird in einer Partie nie wieder langsamer'],
 ['1.31.1','Dein eigenes Ergebnis erscheint jetzt auch dann in den Top 5 und der Bestenliste, wenn Google es nicht öffentlich wertet – mit Hinweis, wie du sichtbar wirst'],
 ['1.31.0','Das Tagesspiel wechselt jetzt weltweit gleichzeitig um 9:00 Uhr (passend zur Google-Rangliste „Heute“) – im Menü steht „offen bis 09:00“'],
 ['1.30.2','Weltweite Tagesspiel-Liste und Top 5 zeigen jetzt das Datum des jeweiligen Tagesspiels'],
 ['1.30.1','Top 5 im Hauptmenü jetzt auch für Endlos (Feldgröße wie im Menü) – und der Hinweis, wann bei Google ein neuer Tag beginnt'],
 ['1.30.0','Eine Bestenliste: Mit Google Play Games siehst du direkt die weltweite Rangliste (Heute/Woche/Gesamt) mit deinem Platz, Combo, Zügen und Steinen – dein Name kommt aus deinem Profil'],
 ['1.29.3','„Ranglisten prüfen“ zeigt jetzt auch, warum die Anmeldung bei Google Play Games scheitert'],
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
// ---------- Was ist neu? (eigenes Fenster, nach einem Update einmal automatisch) ----------
const APP_VER=CHANGES[0][0];
const verCmp=(a,b)=>{const x=String(a).split('.').map(Number),y=String(b).split('.').map(Number);for(let i=0;i<3;i++){const d=(x[i]||0)-(y[i]||0);if(d)return d}return 0};
let newsReturn=null;
// Bestandsspieler? Muss vor dem Start geprüft werden – danach legen Serie/Tutorial ihre Daten selbst an
const WAS_KNOWN=(()=>{try{return !!localStorage.getItem('kippwerk_helpseen')&&!!(localStorage.getItem('kippwerk_scores')||localStorage.getItem('kippwerk_levels')||localStorage.getItem('kippwerk_streak'))}catch(e){return false}})();
if(!WAS_KNOWN)try{if(!localStorage.getItem('kippwerk_seenver'))localStorage.setItem('kippwerk_seenver',APP_VER)}catch(e){}   // Neuinstallation: nichts nachholen
function openNews(since,all){
  newsReturn=!$('settingsOv').classList.contains('hidden')?'settings':!$('startOv').classList.contains('hidden')?'start':null;
  const txt=c=>I18N.lang==='en'&&CHANGES_EN[c[0]]||c[1];
  let list=all?CHANGES:since?CHANGES.filter(c=>verCmp(c[0],since)>0).slice(0,8):CHANGES.slice(0,5);if(!list.length)list=CHANGES.slice(0,1);
  $('newsBody').innerHTML=list.map((c,i)=>`<div class="nv${i===0?' cur':''}"><b>v${c[0]}${i===0?' · '+I18N.tr('aktuell'):''}</b><p>${txt(c)}</p></div>`).join('');
  $('newsAll').style.display=all?'none':'';
  ['startOv','settingsOv'].forEach(i=>$(i).classList.add('hidden'));$('newsOv').classList.remove('hidden');$('newsOv').scrollTop=0;
  try{localStorage.setItem('kippwerk_seenver',APP_VER)}catch(e){}}
function closeNews(){$('newsOv').classList.add('hidden');if(newsReturn==='settings'){renderSettings();$('settingsOv').classList.remove('hidden')}else showMenu()}
$('newsAll').onclick=()=>{const r=newsReturn;openNews(null,true);newsReturn=r};
$('newsClose').onclick=closeNews;
$('settingsNews').onclick=()=>openNews();
// Feedback: Google-Formular (FEEDBACK_URL) oder vorausgefüllte E-Mail mit den 5 Testfragen
const FEEDBACK_URL='',FEEDBACK_MAIL='david.digital@web.de';
function feedbackHref(){if(FEEDBACK_URL)return FEEDBACK_URL;const en=I18N.lang==='en';
  const Q=en?['What was unclear or annoying in the first 3 minutes?','Which mode do you play most (Daily, Endless, Stages) – and why?','Did you understand the daily game and the leaderboard? Do you play it every day?','How annoying are the ads (not at all / a bit / very)?','What would have to improve for you to recommend KIPPWERK to friends?']
    :['Was war in den ersten 3 Minuten unklar oder hat dich gestört?','Welchen Modus spielst du am meisten (Tagesspiel, Endlos, Etappen) – und warum?','Hast du das Tagesspiel und die Rangliste verstanden? Spielst du es jeden Tag?','Wie störend ist die Werbung (gar nicht / etwas / sehr)?','Was müsste besser werden, damit du KIPPWERK Freunden empfiehlst?'];
  const body=Q.map((q,i)=>`${i+1}. ${q}\n\n`).join('')+`\n—\nKIPPWERK v${APP_VER} · ${playerName||''}`;
  return 'mailto:'+FEEDBACK_MAIL+'?subject='+encodeURIComponent('KIPPWERK Feedback v'+APP_VER)+'&body='+encodeURIComponent(body)}
$('lnkFeedback').onclick=()=>{$('lnkFeedback').href=feedbackHref()};
// Nach einem Update einmal zeigen (nicht bei Neuinstallation – da kommt das Tutorial)
function newsAfterUpdate(){let seen=null;try{seen=localStorage.getItem('kippwerk_seenver')}catch(e){}
  const known=WAS_KNOWN;
  if(!known){try{localStorage.setItem('kippwerk_seenver',APP_VER)}catch(e){}return}
  if(seen===APP_VER)return;
  if(!$('startOv').classList.contains('hidden')&&!document.querySelector('.overlay:not(.hidden):not(#startOv)'))openNews(seen||CHANGES[1][0])}
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
let scoresTab='endless',scoresReturn=null,scoresSize='6',scoresPeriod='day';
let endlessSpan='all';   // Zeitraum der weltweiten Endlos-Listen (Tagesspiel nutzt scoresPeriod)
$('periodTabs').onclick=e=>{const b=e.target.closest('button');if(!b)return;if(scoresTab==='endless')endlessSpan=b.dataset.p;else scoresPeriod=b.dataset.p;renderScores()};
const PERIOD_TXT={day:()=>'Tagesspiel '+dayLabel(dailyNo()),week:()=>{const w=weekOf(dailyNo(),dailyWeekMon());return 'Woche '+dayShort(w)+' – '+dayShort(w+6)},all:()=>'Beste Tagesspiele aller Zeiten'};
// Mit Play Games: EINE Bestenliste = die weltweite. Ohne Anmeldung (oder offline/Web): die Liste dieses Geräts.
const onlineOn=()=>Games.available&&Games.signedIn;
function renderGamesBtn(){const b=$('gamesBoard');b.style.display=Games.available&&!Games.signedIn?'':'none';
  b.textContent=I18N.tr('🎮 Mit Google Play Games anmelden – weltweite Bestenliste');b.title=Games.label}
$('gamesBoard').onclick=async()=>{const b=$('gamesBoard');b.textContent='⏳';await Games.signIn();renderScores()};
const onlineCache={};let onlineReq=0;
function clearOnline(){for(const k in onlineCache)delete onlineCache[k]}
const SPAN_TXT={day:'Heute',yday:'Gestern',week:'Woche (So–Sa)',all:'Gesamt'};
// Tagesspiel-Woche Mo–So weltweit: Google kennt nur So–Sa, daher aus den 7 Wochentags-Listen zusammengezählt
// (je Tag die Liste dieses Wochentags, gefiltert auf das Datum im Score-Tag; Summe je Spieler)
// pre: 'wd' (Tagesspiel, Summe je Spieler) oder 'e6wd' usw. (Endlos, beste Runde der Woche)
async function loadWeekMoSo(n,pre){if(!Games.signedIn)throw new Error('n/a');pre=pre||'wd';const best=pre!=='wd';
  const t=todayKey(),mon=addDays(t,-wdOf(t)),gSun=addDays(t,-((wdOf(t)+1)%7)),days=[];
  for(let d=mon;d<=t;d=addDays(d,1))days.push(d);
  let fails=0;
  const res=await Promise.all(days.map(async d=>{const k=pre+wdOf(d),d8=d.replace(/-/g,''),ok=x=>!!x&&ScoreTag.dec(x.tag).day===d8;
    const get=async sp=>{try{return await Games.top(k,sp,25)}catch(e){fails++;return null}};
    let r=await get(d>=gSun?'week':'all');
    if(d>=gSun&&!(r&&((r.entries||[]).some(ok)||ok(r.me))))r=await get('all')||r;
    return{entries:(r&&r.entries||[]).filter(ok),me:r&&ok(r.me)?r.me:null}}));
  if(fails>=days.length)throw new Error('n/a');
  const P={},add=(x,pub)=>{const p=P[x.playerId]=P[x.playerId]||{playerId:x.playerId,name:x.name,score:0,days:0,best:0,pub:false,ids:new Set()};
    if(p.ids.has(x.d))return;p.ids.add(x.d);const v=+x.score||0;p.score+=v;p.days++;if(v>p.best){p.best=v;p.tag=x.tag}if(pub)p.pub=true;if(x.name)p.name=x.name};
  let meId=null,meHidden=false;
  res.forEach((r,i)=>{for(const x of r.entries)add({...x,d:days[i]},true);
    if(r.me){meId=r.me.playerId;if(!((r.me.rank|0)>0))meHidden=true;add({...r.me,d:days[i]},(r.me.rank|0)>0)}});
  const L=Object.values(P).filter(p=>p.pub||p.playerId===meId).sort((a,b)=>b.score-a.score);
  const val=p=>best?p.best:p.score;
  if(best)L.sort((a,b)=>b.best-a.best);
  const sub=p=>best?'':`${p.days}/7 ${I18N.lang==='en'?'days':'Tage'} · ${I18N.lang==='en'?'best day':'bester Tag'} ${p.best.toLocaleString(LOC())}`;
  const pub=L.filter(p=>!(p.playerId===meId&&meHidden)).map((p,i)=>({playerId:p.playerId,name:p.name,score:val(p),tag:best?p.tag:'',rank:i+1,sub:sub(p)}));
  const mp=meId&&P[meId],me=mp?{playerId:meId,name:mp.name,score:val(mp),tag:best?mp.tag:'',rank:meHidden?0:(pub.find(x=>x.playerId===meId)||{}).rank||0,sub:sub(mp)}:null;
  return{entries:pub.slice(0,n||25),me}}
// Rangliste laden – beim Tagesspiel „Woche“ die eigene Woche Mo–So, sonst direkt von Google
function boardTop(k,sp,n){if(sp==='week'){if(k==='daily'&&Games.hasWd)return loadWeekMoSo(n);if(/^e\d/.test(k)&&Games.hasEwdFor(k))return loadWeekMoSo(n,k+'wd')}return Games.top(k,sp,n)}
const weekMonOf=k=>k==='daily'?dailyWeekMon():Games.hasEwdFor(k);
// „Gestern“: Liste des gestrigen Wochentags; nur Einträge mit gestrigem Datum (Score-Tag d…). Erst Woche, sonst Gesamt (Wochenwechsel)
async function loadYesterday(pre){const yk=addDays(todayKey(),-1),k=(pre||'wd')+wdOf(yk),d8=yk.replace(/-/g,'');
  const pick=d=>{const en=(d&&d.entries||[]).filter(x=>ScoreTag.dec(x.tag).day===d8).map((x,i)=>({...x,rank:i+1}));
    const me=d&&d.me&&ScoreTag.dec(d.me.tag).day===d8?{...d.me,rank:(en.find(x=>x.playerId===d.me.playerId)||{}).rank||d.me.rank}:null;return{entries:en,me}};
  let r=pick(await Games.top(k,'week',25));if(!r.entries.length&&!r.me)r=pick(await Games.top(k,'all',25));return r}
function renderOnline(){
  const k=scoresTab==='endless'?'e'+scoresSize:'daily',sp=scoresTab==='endless'?endlessSpan:scoresPeriod,ck=k+'|'+sp;
  $('periodTabs').style.display='';$('periodTabs').querySelectorAll('button').forEach(b=>b.classList.toggle('on',b.dataset.p===sp));
  $('dailyStats').style.display='none';
  const ds=sp==='day'&&googleDayStart();$('periodInfo').textContent='🌍 '+I18N.tr('Weltweit')+' · '+I18N.tr(sp==='week'?weekLbl(weekMonOf(k)):SPAN_TXT[sp])+(sp==='yday'?' · '+dayLabel(dailyNo()-1):'')+(ds?' · '+I18N.tr('Neuer Tag ab')+' '+ds:'');$('periodInfo').style.display='';
  const c=onlineCache[ck];
  if(c)drawOnline(c.d);else{$('scoresTable').innerHTML='';$('scoresEmpty').style.display='';$('scoresEmpty').textContent=I18N.tr('⏳ Bestenliste wird geladen …')}
  if(!c||Date.now()-c.t>30000){const my=++onlineReq;
    (sp==='yday'?loadYesterday(k==='daily'?'wd':k+'wd'):boardTop(k,sp,25)).then(d=>{onlineCache[ck]={t:Date.now(),d};if(my===onlineReq&&onlineOn())drawOnline(d)})
      .catch(()=>{if(my===onlineReq&&!c)renderLocal(I18N.tr('Weltweite Bestenliste gerade nicht erreichbar – hier die Ergebnisse auf diesem Gerät.'))})}}
function drawOnline(d){
  const me=Games.player,mid=me&&me.id,en=d&&d.entries||[],esc=escH;
  const row=(x,mine)=>{const r=x.rank|0,medal=r>0?(['🥇','🥈','🥉'][r-1]||r+'.'):'–',t=ScoreTag.dec(x.tag);
    const name=mine?(me&&me.name||x.name||playerName||'Spieler'):(x.name||'Spieler');
    return `<tr class="${mine?'me':''}"><td class="rank">${medal}</td><td>${esc(name)}${(m=>m?'<small class="sub">'+m+'</small>':'')(x.sub||metaLine(t,t.level?'Lvl '+t.level:ScoreTag.date(t),''))}</td><td class="r">${(+x.score||0).toLocaleString(LOC())}</td></tr>`};
  let h=en.map(x=>row(x,!!mid&&x.playerId===mid)).join('');
  const my=d&&d.me;if(my&&!en.some(x=>x.playerId===my.playerId))h+=(en.length?`<tr class="gap"><td colspan="3">⋯</td></tr>`:'')+row(my,true);
  // Platz ≤ 0: Google wertet den Eintrag nicht öffentlich (meist Play-Games-Profil nicht „für alle sichtbar“)
  if(my&&!((my.rank|0)>0))h+=`<tr class="gap"><td colspan="3"><small class="sub">${I18N.tr('Nur für dich sichtbar: Stell in der App „Google Play Spiele“ unter Profil → Einstellungen dein Profil auf „Für alle sichtbar“, dann erscheinst du in der weltweiten Liste.')}</small></td></tr>`;
  $('scoresTable').innerHTML=h;
  const sp=scoresTab==='endless'?endlessSpan:scoresPeriod;
  $('scoresEmpty').style.display=h?'none':'';
  $('scoresEmpty').textContent=I18N.tr(sp==='yday'?(scoresTab==='endless'?'Gestern keine Endlos-Runden auf dieser Feldgröße.':'Gestern hat niemand das Tagesspiel gewertet.'):sp==='day'?'Heute noch keine Einträge – hol dir Platz 1!':sp==='week'?(weekMonOf(scoresTab==='endless'?'e'+scoresSize:'daily')?'Diese Woche (Mo–So) noch keine Einträge – hol dir Platz 1!':'Diese Woche (So–Sa) noch keine Einträge – die Google-Woche beginnt sonntags. Hol dir Platz 1!'):'Noch keine Einträge – hol dir Platz 1!')}
$('sizeTabs').onclick=e=>{const b=e.target.closest('button');if(!b)return;scoresSize=b.dataset.n;renderScores()};
// Feld-Reiter in der Bestenliste: alle freigeschalteten Felder
function renderSizeTabs(){const h=BOARDS.filter(k=>boardOpen(k)||sizeList(k).length).map(k=>`<button data-n="${k}">${bLabel(k)}</button>`).join('');const t=$('sizeTabs');if(t.innerHTML!==h)t.innerHTML=h;
  t.querySelectorAll('button').forEach(b=>b.classList.toggle('on',b.dataset.n===String(scoresSize)))}
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
  $('tabEndless').classList.toggle('on',scoresTab==='endless');$('tabDaily').classList.toggle('on',scoresTab==='daily');$('tabMine').classList.toggle('on',scoresTab==='mine');
  $('sizeTabs').style.display=scoresTab==='endless'?'':'none';
  // „Gestern“ nur weltweit und nur, wenn die Wochentags-Listen eingerichtet sind
  const yd=onlineOn()&&(scoresTab==='daily'?Games.hasWd:scoresTab==='endless'&&Games.hasEwdFor('e'+scoresSize));$('pYday').style.display=yd?'':'none';if(!(onlineOn()&&Games.hasWd)&&scoresPeriod==='yday')scoresPeriod='day';if(!(onlineOn()&&Games.hasEwdFor('e'+scoresSize))&&endlessSpan==='yday')endlessSpan='all';
  {const wb=$('periodTabs').querySelector('[data-p=week]');if(wb)wb.textContent=(scoresTab==='endless'?(onlineOn()&&Games.hasId('e'+scoresSize)?Games.hasEwdFor('e'+scoresSize):endlessWeekMon(scoresSize)):dailyWeekMon())?'Woche':'Woche (So–Sa)'}
  if(scoresTab==='mine'){renderMine();return}
  renderSizeTabs();
  renderGamesBtn();
  if(onlineOn()&&(scoresTab!=='endless'||Games.hasId('e'+scoresSize)))renderOnline();else renderLocal()}
// ---------- Meine Tage: eigene Tagesspiele und Endlos-Runden, Tag für Tag ----------
// Altes Datumsformat der Endlos-Bestenliste (21.11.26 bzw. 11/21/26) → JJJJ-MM-TT
const legacyKey=s=>{let m=String(s||'').match(/^(\d{1,2})\.(\d{1,2})\.(\d{2,4})$/),y,mo,d;
  if(m){d=+m[1];mo=+m[2];y=+m[3]}else{m=String(s||'').match(/^(\d{1,2})\/(\d{1,2})\/(\d{2,4})$/);if(!m)return '';mo=+m[1];d=+m[2];y=+m[3]}
  if(y<100)y+=2000;return y+'-'+String(mo).padStart(2,'0')+'-'+String(d).padStart(2,'0')};
function myDays(){const days={},put=(k,x)=>{if(!k)return;(days[k]=days[k]||[]).push(x)};
  for(const x of scores.daily)put(dk(noDate(x.no)),{...x,t:'d'});
  const hist=History.all();for(const x of hist)put(x.d,x);
  // ältere Endlos-Rekorde (vor dem Verlauf) nur, wenn nicht schon im Verlauf
  for(const x of scores.endless){const k=legacyKey(x.date);if(!k||!x.size)continue;if(hist.some(h=>h.d===k&&h.size===x.size&&h.score===x.score))continue;put(k,{...x,t:'e',d:k})}
  return Object.keys(days).sort().reverse().map(k=>({k,items:days[k].sort((a,b)=>(a.t===b.t?b.score-a.score:a.t==='d'?-1:1))}))}
function renderMine(){
  $('periodTabs').style.display='none';$('gamesBoard').style.display='none';
  const list=myDays(),all=list.flatMap(d=>d.items),bd=all.filter(x=>x.t==='d').reduce((a,x)=>Math.max(a,x.score),0),be=all.filter(x=>x.t==='e').reduce((a,x)=>Math.max(a,x.score),0);
  $('dailyStats').style.display='';
  $('dailyStats').innerHTML=`<div><b>${list.length}</b><small>Spieltage</small></div><div><b>${all.length}</b><small>Spiele</small></div><div><b>${bd.toLocaleString(LOC())}</b><small>Bestes Tagesspiel</small></div><div><b>${be.toLocaleString(LOC())}</b><small>Bestes Endlos</small></div>`;
  $('periodInfo').textContent=I18N.tr('Deine Spiele, neueste zuerst');$('periodInfo').style.display='';
  const row=x=>{const top=x.t==='d'?x.score===bd&&bd>0:x.score===be&&be>0;
    const what=x.t==='d'?'📅 '+I18N.tr('Tagesspiel'):'∞ '+I18N.tr('Endlos')+' '+bLabel(keyOf(x));
    return `<tr class="${x===lastEntry?'me':''}"><td class="rank">${top?'🏆':''}</td><td>${what}<small class="sub">${metaLine(x,x.t==='e'&&x.level?'Lvl '+x.level:'','')||'&nbsp;'}</small></td><td class="r">${x.score.toLocaleString(LOC())}</td></tr>`};
  $('scoresTable').innerHTML=list.slice(0,45).map(d=>`<tr class="dayhd"><td colspan="3">${dayLabel(dailyNoOf(d.k))}</td></tr>`+d.items.map(row).join('')).join('');
  $('scoresEmpty').style.display=list.length?'none':'';$('scoresEmpty').textContent=I18N.tr('Noch kein Spiel gespielt.')}
// Endlos auf diesem Gerät nach Zeitraum: Heute / Woche (So–Sa) aus dem Verlauf, Gesamt = Rekordliste
const ENDLESS_TXT={day:n=>`Endlos ${bLabel(n)} · `+dayLabel(dailyNo()),week:n=>{const w=weekOf(dailyNo(),endlessWeekMon(n));return `Endlos ${bLabel(n)} · Woche `+dayShort(w)+' – '+dayShort(w+6)},all:n=>`Endlos ${bLabel(n)} · Gesamt`};
function endlessLocal(n,sp){if(sp!=='day'&&sp!=='week')return sizeList(n);
  const t=todayKey(),w0=dk(noDate(weekOf(dailyNo(),endlessWeekMon(n)))),w1=addDays(w0,6),hist=History.all(),seen=new Set(),out=[];
  const inSpan=k=>k&&(sp==='day'?k===t:k>=w0&&k<=w1);
  for(const x of hist)if(keyOf(x)===String(n)&&inSpan(x.d)){out.push(x);seen.add(x.d+'|'+x.score)}
  for(const x of sizeList(n)){const k=legacyKey(x.date);if(inSpan(k)&&!seen.has(k+'|'+x.score))out.push(x)}
  return out.sort((a,b)=>b.score-a.score)}
function renderLocal(note){
  if(scoresPeriod==='yday')scoresPeriod='day';if(endlessSpan==='yday')endlessSpan='day';   // „Gestern“ gibt es nur weltweit
  const t=$('scoresTable'),esc=escH;
  const lsp=scoresTab==='endless'?endlessSpan:scoresPeriod;
  $('periodTabs').style.display='';
  $('periodTabs').querySelectorAll('button').forEach(b=>b.classList.toggle('on',b.dataset.p===lsp));
  renderSizeTabs();
  renderGamesBtn();
  const today=dailyNo(),wk=weekOf(today,dailyWeekMon());
  const dl=scores.daily.filter(x=>scoresPeriod==='day'?x.no===today:scoresPeriod==='week'?x.no>=wk&&x.no<wk+7:true);
  const list=(scoresTab==='endless'?endlessLocal(scoresSize,endlessSpan):dl).slice(0,TOP);
  $('dailyStats').style.display=scoresTab==='daily'?'':'none';
  if(scoresTab==='daily'&&scoresPeriod==='week'){const sum=dl.reduce((a,x)=>a+x.score,0),bst=dl.reduce((a,x)=>Math.max(a,x.score),0);
    $('dailyStats').innerHTML=`<div><b>${sum.toLocaleString(LOC())}</b><small>Wochensumme</small></div><div><b>${dl.length}/7</b><small>Tage</small></div><div><b>${bst.toLocaleString(LOC())}</b><small>Bester Tag</small></div>`}
  else if(scoresTab==='daily'){const st=dailyStats();
    $('dailyStats').innerHTML=`<div><b>${st.played}</b><small>Gespielt</small></div><div><b>${st.streak}🔥</b><small>Serie</small></div><div><b>${st.best.toLocaleString(LOC())}</b><small>Bester</small></div><div><b>${st.avg.toLocaleString(LOC())}</b><small>Schnitt</small></div>`}
  t.innerHTML=list.map((x,i)=>{const medal=['🥇','🥈','🥉'][i]||(i+1)+'.';
    return scoresTab==='endless'
      ?`<tr class="${x===lastEntry?'me':''}"><td class="rank">${medal}</td><td>${esc(x.name||playerName||'Spieler')}${tag(x)}<small class="sub">${metaLine(x,x.level?'Lvl '+x.level:'',x.d?dayLabel(dailyNoOf(x.d)):esc(x.date||''))}</small></td><td class="r">${x.score.toLocaleString(LOC())}</td></tr>`
      :`<tr class="${x===lastEntry?'me':''}"><td class="rank">${medal}</td><td>${esc(x.name||playerName||'Spieler')}${tag(x)}<small class="sub">${metaLine(x,'',dayLabel(x.no))}</small></td><td class="r">${x.score.toLocaleString(LOC())}</td></tr>`}).join('');
  $('scoresEmpty').style.display=list.length?'none':'';
  $('scoresEmpty').textContent=scoresTab==='endless'?(endlessSpan==='day'?`Heute noch keine Endlos-Runde auf ${bLabel(scoresSize)}.`:endlessSpan==='week'?`Diese ${weekLbl(endlessWeekMon(scoresSize))} noch keine Endlos-Runde auf ${bLabel(scoresSize)}.`:`Noch keine Einträge auf ${bLabel(scoresSize)} – spiel eine Runde Endlos!`):scoresPeriod==='day'?'Heute noch nicht gespielt – das Tagesspiel wartet!':scoresPeriod==='week'?(dailyWeekMon()?'Diese Woche (Mo–So) noch kein Tagesspiel gespielt.':'Diese Woche (So–Sa) noch kein Tagesspiel gespielt.'):'Noch kein Tagesspiel gespielt.';
  const pt=scoresTab==='daily'?PERIOD_TXT[scoresPeriod]():ENDLESS_TXT[endlessSpan](scoresSize);
  $('periodInfo').textContent=note?note+' · '+I18N.tr(pt):pt;$('periodInfo').style.display='';
}
function openScores(tab){
  scoresReturn=!$('overOv').classList.contains('hidden')?'over':!$('startOv').classList.contains('hidden')?'start':null;
  if(started&&!over){paused=true;started=false;scoresReturn='pause'}
  $('overOv').classList.add('hidden');$('startOv').classList.add('hidden');
  scoresTab=(tab==='level'?'endless':tab)||scoresTab;scoresSize=mode==='endless'?BK:curBoard();renderScores();$('scoresOv').classList.remove('hidden')}
$('scoresBtn').onclick=()=>{if(busy||document.querySelector('.overlay:not(.hidden)'))return;openScores(mode==='level'?'endless':mode)};
$('overScoresBtn').onclick=()=>openScores(mode);
$('tabEndless').onclick=()=>{scoresTab='endless';renderScores()};
$('tabDaily').onclick=()=>{scoresTab='daily';renderScores()};
$('tabMine').onclick=()=>{scoresTab='mine';renderScores()};
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
