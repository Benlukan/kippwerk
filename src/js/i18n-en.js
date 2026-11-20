/* ===== Englische Übersetzung: deutscher Originaltext → Englisch ===== */
// ---------- Englische Übersetzung (Deutsch = Quelltext) ----------
const I18N_NAMES={'Werkstatt':'Workshop','Retro 8-Bit':'Retro 8-Bit','Papier':'Paper','Wald':'Forest','Bonbon':'Candy','Kristall':'Crystal','Prisma':'Prism','Winter':'Winter','Feuerwerk':'Fireworks','Frühling':'Spring','Ohne':'None','Sonnenbrille':'Sunglasses','Kopfhörer':'Headphones','Bauhelm':'Hard hat','Zauberhut':'Wizard hat','Schal':'Scarf','Krone':'Crown','Partyhut':'Party hat','Hasenohren':'Bunny ears','Erste Schritte':'First Steps','Felsenfeld':'Rock Field','Farbrausch':'Color Rush','Kettenwerk':'Chain Works','Steinbruch':'Quarry','Prismental':'Prism Valley','Sturmzone':'Storm Zone','Tiefenwerk':'Deep Works','Meisterklasse':'Master Class','Finale':'Finale',
  'Funke':'Spark','Eine Woche':'One Week','Zwei Wochen':'Two Weeks','Ein Monat':'One Month','Fünfzig Tage':'Fifty Days','Hundert Tage':'Hundred Days',
  'Standard':'Standard','Neon':'Neon','Pastell':'Pastel','Ozean':'Ocean','Lava':'Lava','Gold':'Gold','Kosmos':'Cosmos',
  'Rot':'Red','Gelb':'Yellow','Grün':'Green','Blau':'Blue','Lila':'Purple','Orange':'Orange','Grau':'Gray','Weiß':'White',
  'Tagessieg':'Daily win','Tag Top 3':'Day Top 3','Tag Top 10':'Day Top 10','Wochensieg':'Weekly win','Woche Top 3':'Week Top 3','Woche Top 10':'Week Top 10'};
const I18N_EN=new Map(Object.entries(Object.assign({},I18N_NAMES,{
  'Abgeräumt':'Cleared','abgeräumt':'cleared','nichts':'nothing','Combo':'Combo','Combos':'Combos',
  'Good':'Good','Super':'Super','Mega':'Mega','Monster':'Monster','Ultra':'Ultra',
  'Abzeichen & Designs · tippen zum Anwenden':'Badges & themes · tap to apply',
  'All the best':'All-time best','Alle':'All','Als Nächstes':'Up next','An':'On','Aus':'Off','Auto':'Auto','Anmelden':'Sign in',
  'Beste Tagesspiele aller Zeiten':'Best daily games of all time','Bestenliste':'Leaderboard','Bester':'Best','Bester Tag':'Best day',
  'COMBO ×2':'COMBO ×2',
  'Das neue Tagesspiel wartet auf dich – starte eine Serie! 🔥':'The new daily game is waiting – start a streak! 🔥',
  'Ein neues Tagesspiel ist da – heute schon gekippt? 🧩':'A new daily game is here – tilted yet today? 🧩',
  'Datenschutz':'Privacy','Datenschutz-Einstellungen (Werbung)':'Privacy settings (ads)','🛡 Datenschutz-Einstellungen (Werbung)':'🛡 Privacy settings (ads)',
  'Dein Name':'Your name','Deine Serie':'Your streak','Du':'You',
  'Diese Woche noch kein Tagesspiel gespielt.':'No daily game played this week yet.','Diese Woche noch keine Ergebnisse.':'No results this week yet.',
  'Noch kein Tagesspiel gespielt.':'No daily game played yet.',
  'EINTRAGEN':'SUBMIT','ERGEBNIS TEILEN':'SHARE RESULT','ETAPPE':'STAGE','Etappe':'Stage',
  'Eine Rettung pro Runde · freiwillig':'One rescue per round · optional',
  'Einstellungen':'Settings','Endlos':'Endless','Endlos-Feld':'Endless board','Extra-Leben':'Extra lives',
  'Extra-Leben (für ULTRA-Combos)':'Extra lives (from ULTRA combos)','Extra-Leben gibt es für ULTRA-Combos (×6)':'You earn extra lives with ULTRA combos (×6)',
  'FELD VOLL':'BOARD FULL','FERTIG':'DONE','GESCHAFFT':'COMPLETE','GESCHAFFT!':'COMPLETE!','LEIDER NICHT':'NOT THIS TIME',
  'Farbe abräumen':'Clear color','Farbschwäche':'Color blind','Felsen':'Rocks',
  'Ganze Rangliste ›':'Full leaderboard ›','Gespielt':'Played','Gewertet':'Counted',
  'Heute':'Today','Heute noch nicht gespielt – das Tagesspiel wartet!':'Not played yet today – the daily game is waiting!',
  'Hilfe':'Help','Impressum':'Legal notice','ℹ️ Impressum':'ℹ️ Legal notice','📄 Datenschutzerklärung':'📄 Privacy policy',
  'Kippen. Verbinden. Kettenreaktion.':'Tilt. Connect. Chain reaction.',
  'Level':'Level','MENÜ':'MENU','Meilensteine:':'Milestones:','Menü / Pause':'Menu / Pause','Modi':'Modes',
  'NEIN DANKE':'NO THANKS','NOCHMAL':'AGAIN','↻ NOCHMAL':'↻ AGAIN','Normal':'Normal','Nächster Meilenstein':'Next milestone',
  'Noch eine Chance?':'One more chance?','Pause':'Pause','Prisma':'Prism','Prisma-Steine':'Prism stones','Punkte':'Points',
  'Ranglisten-Erfolge':'Leaderboard achievements','Rekord':'Record','Rekord –':'Record –',
  'Rettet automatisch einen verpassten Tag. Gratis alle 7 Serientage, zusätzlich 1× täglich per Video.':'Automatically saves a missed day. Free every 7 streak days, plus 1× daily via video.',
  'Rettet automatisch einen verpassten Tag. Gratis alle 7 Serientage.':'Automatically saves a missed day. Free every 7 streak days.',
  'SCHLIESSEN':'CLOSE','SERIE':'STREAK','START':'START','▶ START':'▶ START','Schnell':'Fast','Schnitt':'Average','Serie':'Streak','Serienschutz':'Streak shield',
  'Spiel das Tagesspiel, um eine Serie zu starten.':'Play the daily game to start a streak.',
  'Spieler-ID':'Player ID','Spieler-ID kopieren':'Copy player ID','Spielernamen':'player name','Spielmodi':'Game modes',
  'Starte eine Serie mit dem Tagesspiel':'Start a streak with the daily game',
  'TEXT MARKIERT – KOPIEREN':'TEXT SELECTED – COPY','Tage':'Days','Tage in Folge':'days in a row','Tag in Folge':'day in a row',
  'Tagesspiel':'Daily game','Tipp: Wischen funktioniert überall auf dem Bildschirm':'Tip: swipe anywhere on the screen',
  'VERSTANDEN':'GOT IT','Verlauf · letzten 40 Züge':'History · last 40 moves','WEITER ▶':'NEXT ▶','WEITER!':'CONTINUE!','❤ WEITER!':'❤ CONTINUE!',
  'Weiterspielen':'Continue','Woche':'Week','Wochensumme':'Week total','ZURÜCK':'BACK','Ziel':'Goal','Ziele':'Goals','Züge':'Moves',
  'Zurück-Taste':'Back button','übrige Züge':'moves left','heute offen':'open today',
  'Wer im Tagesspiel vorne liegt, bekommt nach Ablauf des Tages bzw. der Woche eine Belohnung:':'Top daily-game players get a reward when the day or week ends:',
  '∞ Endlos':'∞ Endless','⏳ Lade Rangliste …':'⏳ Loading leaderboard …',
  '⏳ Heute noch offen – spiel das Tagesspiel, sonst reißt die Serie (oder ein 🛡 springt ein).':'⏳ Still open today – play the daily game or your streak breaks (unless a 🛡 steps in).',
  '✅ Heute gesichert – bis morgen!':'✅ Secured for today – see you tomorrow!',
  '◆ Symbole auf Steinen':'◆ Symbols on stones','☁ Spielstand mit deinen anderen Geräten abgeglichen':'☁ Progress synced with your other devices',
  '⚙ EINSTELLUNGEN':'⚙ SETTINGS','⚠ Wirklich? Nochmal tippen':'⚠ Sure? Tap again','⚡ Tempo':'⚡ Speed','✓ Gelöscht':'✓ Deleted',
  '❓ HILFE':'❓ HELP','❓ Hilfe & Anleitung':'❓ Help & guide','❤ Extra-Leben':'❤ Extra lives','❤ LEBEN EINSETZEN':'❤ USE A LIFE',
  '🆔 Spieler-ID':'🆔 Player ID','🌍 WELTWEITE RANGLISTE':'🌍 GLOBAL LEADERBOARD','🌍 WELTWEIT · TAGESSPIEL':'🌍 GLOBAL · DAILY GAME',
  '🎨 Farben':'🎨 Colors','🎬 SCHUTZ PER VIDEO HOLEN':'🎬 GET SHIELD VIA VIDEO','🎬 VIDEO ANSEHEN & WEITER':'🎬 WATCH VIDEO & CONTINUE','VIDEO LÄDT …':'VIDEO LOADING …',
  '🎮 Steuerkreuz':'🎮 D-pad','🏆 BESTENLISTE':'🏆 LEADERBOARD','🏆 Bestenliste löschen':'🏆 Clear leaderboard','🏆 Tagesspiel · Top 5':'🏆 Daily game · Top 5',
  '👑 Boss-Etappe – die schwerste der Welt!':'👑 Boss stage – the hardest in the world!','👤 Spielername':'👤 Player name',
  '📅 JETZT TAGESSPIEL SPIELEN':'📅 PLAY DAILY GAME NOW','📅 Tagesspiel':'📅 Daily game','📳 Vibration':'📳 Vibration','🔊 Ton':'🔊 Sound',
  '🔔 Serien-Erinnerung (abends)':'🔔 Streak reminder (evening)','🔥 Serie':'🔥 Streak','🔲 Feldgröße (Endlos)':'🔲 Board size (Endless)','🖌 Design':'🖌 Theme',
  '🗺 ETAPPEN':'🗺 STAGES','🗺 Etappen':'🗺 Stages','🗺 KARTE':'🗺 MAP','🗺 ZUR KARTE':'🗺 TO MAP','🗺 Level-Fortschritt löschen':'🗺 Clear stage progress',
  'Keine Züge mehr übrig.':'No moves left.','Das Feld ist voll.':'The board is full.',
  'Steuerung':'Controls','Combos ·':'Combos ·',
  '📡 Rangliste gerade nicht erreichbar.':'📡 Leaderboard unavailable right now.',
  'Heute hat noch niemand gespielt – sei die/der Erste!':'Nobody has played today yet – be the first!',
  'Benachrichtigungen sind für KIPPWERK nicht erlaubt (Handy-Einstellungen).':'Notifications are blocked for KIPPWERK (phone settings).',
  '🛡 Serienschutz erhalten!':'🛡 Streak shield earned!','Zum Beenden nochmal „Zurück“ drücken':'Press “Back” again to exit',
  '❤ Du hast schon 9 Extra-Leben – mehr passen nicht in den Vorrat.':'❤ You already have 9 extra lives – that’s the maximum.',
  'Ab Level 30 kommen Felsen dazu – sie zerbrechen, wenn direkt daneben eine Gruppe verschwindet.':'From level 30, rocks appear – they break when a group next to them clears.',
  'Ab Level 40 gibt es eine 6. Farbe: Orange ★.':'From level 40 there is a 6th color: Orange ★.',
  'NEUES ABZEICHEN':'NEW BADGE','AB JETZT IM SPIEL':'NOW IN PLAY','★ NEUE FARBE':'★ NEW COLOR','🪨 FELSEN!':'🪨 ROCKS!','EXTRA-LEBEN':'EXTRA LIFE',
  '💡 Felsen zerbrechen, wenn direkt daneben eine Gruppe verschwindet.':'💡 Rocks break when a group next to them clears.',
  '💡 Eine Kette entsteht, wenn nachrutschende Steine eine neue Gruppe bilden.':'💡 A chain happens when sliding stones form a new group.',
  'Alle Welten geschafft – neue Welten folgen per Update':'All worlds complete – new worlds coming in an update',
  'Video: einmal pro Runde · Leben: so viele du hast':'Video: once per round · Lives: as many as you have',
  'Setz ein ❤ Extra-Leben ein oder schau ein kurzes Video':'Use a ❤ extra life or watch a short video','Setz ein ❤ Extra-Leben ein':'Use a ❤ extra life',
  'extra':'extra','weniger – du spielst weiter.':'fewer – you keep playing.','weniger – du spielst weiter':'fewer – you keep playing',
  'keine Combo':'no combo','🎁 Belohnung!':'🎁 Reward!',
  'Benachrichtigungen':'Notifications','Sprache':'Language','🌐 Sprache':'🌐 Language','Deutsch':'Deutsch','English':'English',
  '⌨ Pfeiltasten oder W A S D':'⌨ Arrow keys or W A S D','📳 Vibration testen':'📳 Test vibration','🌍 Ranglisten prüfen':'🌍 Check leaderboards','angemeldet':'signed in','nicht angemeldet':'not signed in','ausgeschaltet':'switched off','Warteschlange':'Queue','leer':'empty','dein Bestwert':'your best','Platz':'rank','kein Eintrag sichtbar':'no entry visible','Liste':'list','Liste leer':'list empty','Letzte Meldungen':'Last submissions','Neues Design':'New theme','Neu für Kippi':'New for Kippi','Sammlung':'Collection','aktiv':'active','frei':'unlocked','immer':'always','Welt 1 geschafft':'World 1 complete','Welt 2 geschafft':'World 2 complete','Welt 3 geschafft':'World 3 complete','Welt 4 geschafft':'World 4 complete','Welt 5 geschafft':'World 5 complete','Welt 6 geschafft':'World 6 complete','Welt 7 geschafft':'World 7 complete','Welt 8 geschafft':'World 8 complete','Welt 9 geschafft':'World 9 complete','Welt 10 geschafft':'World 10 complete','3 Tage Serie':'3-day streak','7 Tage Serie':'7-day streak','14 Tage Serie':'14-day streak','30 Tage Serie':'30-day streak','50 Tage Serie':'50-day streak','100 Tage Serie':'100-day streak','Endlos Level 20':'Endless level 20','25 Tagesspiele':'25 daily games','im Dezember spielen':'play in December','an Silvester spielen':'play on New Year’s Eve','an Ostern spielen':'play at Easter','🎨 Sammlung':'🎨 Collection','Designs':'Themes','🪰 Kippi':'🪰 Kippi','🖌 Design & Kippi':'🖌 Theme & Kippi','Designs und Kippi-Outfits schaltest du frei durch Welten in den Etappen, deine Serie, Endlos, Tagesspiele und an Feiertagen.':'You unlock themes and Kippi outfits through stage worlds, your streak, Endless, daily games and on holidays.','Werkstatt':'Workshop','Retro 8-Bit':'Retro 8-Bit','Papier':'Paper','Wald':'Forest','Bonbon':'Candy','Kristall':'Crystal','Winter':'Winter','Feuerwerk':'Fireworks','Frühling':'Spring','Ohne':'None','Sonnenbrille':'Sunglasses','Kopfhörer':'Headphones','Bauhelm':'Hard hat','Zauberhut':'Wizard hat','Schal':'Scarf','Krone':'Crown','Partyhut':'Party hat','Hasenohren':'Bunny ears','Nur für dich sichtbar: Stell in der App „Google Play Spiele“ unter Profil → Einstellungen dein Profil auf „Für alle sichtbar“, dann erscheinst du in der weltweiten Liste.':'Only visible to you: in the “Google Play Games” app, set your profile to “Visible to everyone” under Profile → Settings, then you will appear in the worldwide list.','🔒 Nur für dich sichtbar – Profil in „Google Play Spiele“ auf „Für alle sichtbar“ stellen.':'🔒 Only visible to you – set your profile in “Google Play Games” to “Visible to everyone”.','Neuer Tag ab':'New day from','🏆 Top 5':'🏆 Top 5','Weltweit':'Worldwide','Diese Woche':'This week','Gesamt':'All time','🎮 Mit Google Play Games anmelden – weltweite Bestenliste':'🎮 Sign in with Google Play Games – worldwide leaderboard','⏳ Bestenliste wird geladen …':'⏳ Loading leaderboard …','Weltweite Bestenliste gerade nicht erreichbar – hier die Ergebnisse auf diesem Gerät.':'Worldwide leaderboard not reachable right now – showing results on this device.','Heute noch keine Einträge – hol dir Platz 1!':'No entries today yet – grab first place!','Diese Woche noch keine Einträge – hol dir Platz 1!':'No entries this week yet – grab first place!','Noch keine Einträge – hol dir Platz 1!':'No entries yet – grab first place!','Name aus deinem Google Play Games-Profil':'Name from your Google Play Games profile','Grund':'Reason','Anmeldefenster abgebrochen oder sofort geschlossen → meist Konto nicht als Tester eingetragen oder Fingerabdruck (SHA-1) passt nicht':'Sign-in window cancelled or closed at once → usually the account is not a tester or the fingerprint (SHA-1) does not match','Google meldet „nicht angemeldet“ → Tester-Konto bzw. Fingerabdruck prüfen':'Google reports “not signed in” → check tester account and fingerprint','Google Play-Dienste fehlen oder sind veraltet':'Google Play services missing or outdated','Fingerabdruck (SHA-1) oder Paketname passt nicht zu den Anmeldedaten in der Play Console':'Fingerprint (SHA-1) or package name does not match the credentials in the Play Console','gesendet':'sent','✓ Vibration angefordert (Browser)':'✓ Vibration requested (browser)','Dieser Browser kann nicht vibrieren':'This browser can’t vibrate','✓ Vibration gesendet':'✓ Vibration sent','Klingelmodus':'Ringer','lautlos':'silent','vibration':'vibrate','normal':'normal','ohne Stärkeregelung':'no strength control',
  'Bsss! Das neue Tagesspiel ist da – ich hab schon reingeschaut 👀':'Bzzz! The new daily game is here – I already took a peek 👀',
  'Kippi hier! Heute warten neue Steine auf dich – kommst du kippen? 🧩':'Kippi here! New stones are waiting for you today – coming to tilt? 🧩',
  'Bsss… ich sitz schon am Spielfeldrand. Fehlt nur noch du! 😉':'Bzzz… I’m already sitting on the board’s edge. Just missing you! 😉',
  'Bsss… ich vermisse dich! Das Tagesspiel wartet schon. 🪰':'Bzzz… I miss you! The daily game is waiting. 🪰','🪰 Kippi (Maskottchen)':'🪰 Kippi (mascot)','So geht’s':'How to play',
  'Profil':'Profile','Ton & Vibration':'Sound & vibration','Spiel':'Game','Darstellung':'Display','Hilfe & Rechtliches':'Help & legal','Daten':'Data',
  '🔊 Effekte':'🔊 Effects','Sanft':'Soft','Stark':'Strong',
  '🎵 Musik':'🎵 Music','📱 Menü kippt mit dem Handy':'📱 Menu tilts with your phone','Tutorial':'Tutorial','Tutorial überspringen':'Skip tutorial','LOS GEHT’S ▶':'LET’S GO ▶',
  'Hi, ich bin Kippi! Wisch mal nach links: Das ganze Feld kippt und alle Steine rutschen mit. 3 gleiche, die sich berühren, verschwinden!':'Hi, I’m Kippi! Swipe left: the whole board tilts and every stone slides along. 3 matching stones that touch disappear!',
  'Neue Steine kommen immer von der Gegenseite. Jetzt nach unten wischen – rutschen danach wieder 3 gleiche zusammen, gibt’s eine Combo!':'New stones always come from the opposite side. Now swipe down – if 3 matching stones slide together again, that’s a combo!',
  'Bsss, stark! Ist das Feld voll, ist die Runde vorbei. Mein Tipp: Kipp öfter in dieselbe Richtung und schau oben bei „Als Nächstes“, was kommt. Ich schau ab und zu vorbei!':'Bzzz, great! When the board is full, the round is over. My tip: tilt in the same direction more often and check “Up next” at the top. I’ll drop by now and then!',
  'KEINE ZÜGE MEHR':'OUT OF MOVES','Schau ein kurzes Video':'Watch a short video','Ergebnis teilen':'Share result',
  '🖱 Wischen mit gedrückter Maustaste':'🖱 Drag with the mouse button held','☰ Menü / Pause · ❓ Tippen auf den Verlauf':'☰ Menu / Pause · ❓ Tap the history',
  '– kommt ab Level 3 dazu (im Endlos-Modus; auf 7×7 und 8×8 von Anfang an)':'– joins from level 3 (in Endless; on 7×7 and 8×8 from the start)',
  '– nur Endlos auf 7×7 und 8×8, ab Level 40':'– Endless on 7×7 and 8×8 only, from level 40'
})));
const I18N_PATS=(()=>{
  const N=s=>I18N_NAMES[s]||s;
  const num=s=>s.replace(/\.(?=\d{3}\b)/g,',');           // 3.050 → 3,050
  const pl=(n,one,many)=>(+String(n).replace(/\D/g,'')===1?one:many);
  const days=n=>n+' '+pl(n,'day','days');
  const combo=s=>s.replace(/(\d+) Combos?/,(m,n)=>n+' '+pl(n,'combo','combos')).replace(/keine Combo/,'no combo');
  const tail=s=>s.split(' · ').map(p=>{
    let m;
    if(m=p.match(/^(\d+) (Zug|Züge) übrig$/))return m[1]+' '+pl(m[1],'move','moves')+' left';
    if(m=p.match(/^([\d.,]+) Punkte$/))return num(m[1])+' points';
    if(m=p.match(/^(\d+) Steine abgeräumt$/))return m[1]+' stones cleared';
    if(/Combo/.test(p))return combo(p);
    if(p==='neuer Bestwert!')return 'new best!';
    if(p==='Feld voll')return 'board full';
    return p}).join(' · ');
  return [
  [/^Combos(?: (\d+) · beste ×(\d+))? · (\d+) Steine weg(?: · noch (\d+) bis Level (\d+))?$/,(m,c,b,s,r,l)=>'Combos'+(c?` ${c} · best ×${b}`:'')+` · ${s} cleared`+(r?` · ${r} to level ${l}`:'')],
  [/^(\d+) Tage?$/,(m,n)=>days(n)],
  [/^(\d+) (Zug|Züge)$/,(m,n)=>n+' '+pl(n,'move','moves')],
  [/^(\d+) Steine$/,(m,n)=>n+' stones'],
  [/^(\d+) Steine abräumen$/,(m,n)=>`Clear ${n} stones`],
  [/^(✓ )?([\d.,]+) Punkte erreichen$/,(m,c,n)=>(c||'')+`Reach ${num(n)} points`],
  [/^(✓ )?(\d+) Steine dieser Farbe abräumen$/,(m,c,n)=>(c||'')+`Clear ${n} stones of this color`],
  [/^(✓ )?Eine Kette ×(\d+) auslösen$/,(m,c,n)=>(c||'')+`Trigger a ×${n} chain`],
  [/^(✓ )?Alle (\d+) Felsen zerbrechen$/,(m,c,n)=>(c||'')+`Break all ${n} rocks`],
  [/^(✓ )?(\d+) Steine abräumen$/,(m,c,n)=>(c||'')+`Clear ${n} stones`],
  [/^✓ ([\d.,]+) Punkte$/,(m,n)=>`✓ ${num(n)} points`],
  [/^(\d+ (?:Zug|Züge) übrig · .*)$/,(m,s)=>tail(s)],
  [/^· übrige Züge für ★★: (\d+) · ★★★: (\d+)$/,'· moves left for ★★: $1 · ★★★: $2'],
  [/^ETAPPE ([\d-]+)$/,'STAGE $1'],[/^Etappe ([\d-]+)$/,'Stage $1'],
  [/^Etappe ([\d-]+) · noch (\d+) Züge$/,'Stage $1 · $2 moves left'],
  [/^Ziele · Etappe ([\d-]+) · jetzt (★+)$/,'Goals · Stage $1 · now $2'],
  [/^(👑 BOSS · )?WELT (\d+) · (BESTES ERGEBNIS|NEUE ETAPPE)$/,(m,b,w,k)=>(b||'')+`WORLD ${w} · `+(k==='NEUE ETAPPE'?'NEW STAGE':'BEST RESULT')],
  [/^Welt (\d+) · (.+)$/,(m,w,n)=>`World ${w} · ${N(n)}`],
  [/^LEVEL (\d+)$/,'LEVEL $1'],[/^Lvl (\d+)$/,'Lvl $1'],
  [/^\+(\d+) ZÜGE$/,'+$1 MOVES'],
  [/^Endlos (\d+)×(\d+) · ([\d.,]+) Punkte$/,(m,a,b,p)=>`Endless ${a}×${b} · ${num(p)} points`],
  [/^Rekord ([\d.,]+)$/,(m,p)=>'Record '+num(p)],
  [/^Noch keine Einträge auf (\d+)×(\d+) – spiel eine Runde Endlos!$/,'No entries on $1×$2 yet – play a round of Endless!'],
  [/^Nächstes Tagesspiel in (\d+) h (\d+) min$/,'Next daily game in $1 h $2 min'],[/^Nächstes Tagesspiel in (\d+) h (\d+) min · um (.+)$/,'Next daily game in $1 h $2 min · at $3'],[/^offen bis (.+)$/,'open until $1'],
  [/^Noch (\d+) bis (\S+) (.+)$/,(m,n,b,x)=>`${n} more to ${b} ${N(x)}`],
  [/^([✨⚡🌊🌋👑🌌]) (.+)$/u,(m,b,x)=>I18N_NAMES[x]?`${b} ${N(x)}`:undefined],
  [/^– noch (\d+) (Tag|Tage) · Design „(.+)“$/,(m,n,t,d)=>`– ${days(n)} to go · theme “${N(d)}”`],
  [/^– noch (\d+) (Tag|Tage) · Kippi: (.+)$/,(m,n,t,d)=>`– ${days(n)} to go · Kippi: ${N(d)}`],
  [/^ – Kippi-Outfit „(.+)“ freigeschaltet! $/,(m,d)=>` – Kippi outfit “${N(d)}” unlocked! `],[/^ – Kippi-Outfit „(.+)“ freigeschaltet!$/,(m,d)=>` – Kippi outfit “${N(d)}” unlocked!`],
  [/^🪰 (.+)$/,(m,d)=>'🪰 '+N(d)],
  [/^Längste Serie: (\d+) (Tag|Tage)$/,(m,n)=>`Longest streak: ${days(n)}`],
  [/^Serie: (\d+) (Tag|Tage) – heute gesichert$/,(m,n)=>`Streak: ${days(n)} – secured today`],
  [/^Serie: (\d+) (Tag|Tage) – heute noch offen!$/,(m,n)=>`Streak: ${days(n)} – still open today!`],
  [/^🔥 Serie: (\d+) (Tag|Tage)!$/,(m,n)=>`🔥 Streak: ${days(n)}!`],
  [/^heute offen · 🔥 (\d+)$/,'open today · 🔥 $1'],
  [/^🛡 \+1 Serienschutz für 7 Tage am Stück!$/,'🛡 +1 streak shield for 7 days in a row!'],
  [/^🛡 Serienschutz eingesetzt – deine 🔥 (\d+)er-Serie lebt weiter!$/,'🛡 Streak shield used – your 🔥 $1-day streak lives on!'],
  [/^Deine 🔥 (\d+)er-Serie ist leider gerissen\. Heute beginnt eine neue!$/,'Your 🔥 $1-day streak has ended. A new one starts today!'],
  [/^Bsss! Deine 🔥 (\d+)er-Serie läuft heute ab – spiel schnell das Tagesspiel, ich halt sie solange fest!$/,'Bzzz! Your 🔥 $1-day streak ends today – play the daily game quickly, I’ll hold on to it!'],
  [/^Bsss… deine 🔥 (\d+)er-Serie wackelt! Ein Tagesspiel heute, und sie bleibt stehen\.$/,'Bzzz… your 🔥 $1-day streak is wobbling! One daily game today keeps it standing.'],
  [/^Woche (.+) – (.+)$/,'Week $1 – $2'],
  [/^Tag (.+)$/,'Day $1'],[/^Übung (.+)$/,'Practice $1'],
  [/^Tagesspiel (.+?) · noch (\d+) Züge$/,'Daily game $1 · $2 moves left'],
  [/^Tagesspiel (.+?) · (\d+) Steine abgeräumt · (.+)$/,(m,d,s,c)=>`Daily game ${d} · ${s} stones cleared · ${combo(c)}`],
  [/^Dein Raster · Tagesspiel (.+)$/,'Your grid · Daily game $1'],
  [/^Tagesspiel (.+)$/,'Daily game $1'],
  [/^Übungsrunde – gewertet bleibt dein erstes Ergebnis: ([\d.,]+)$/,(m,p)=>'Practice round – your first result counts: '+num(p)],
  [/^(🏆 Neuer Rekord! |Platz (\d+) in der Bestenliste! )?Level (\d+) · (\d+) Steine abgeräumt · (.+?)\.( Rekord: ([\d.,]+))?$/,(m,h,r,l,s,c,x,rec)=>
     (h?(r?`#${r} on the leaderboard! `:'🏆 New record! '):'')+`Level ${l} · ${s} stones cleared · ${combo(c)}.`+(x?' Record: '+num(rec):'')],
  [/^(\d+ Combos?|keine Combo)( \(.+\))?$/,(m)=>combo(m)],
  [/^⭐ (\d+) \/ (\d+) Sterne$/,'⭐ $1 / $2 stars'],
  [/^🎉 Welt (\d+) geschafft – weiter nach „(.+)“!$/,(m,w,n)=>`🎉 World ${w} complete – on to “${N(n)}”!`],
  [/^❤ LEBEN EINSETZEN \((\d+) übrig\)$/,'❤ USE A LIFE ($1 left)'],
  [/^KIPPI · SCHRITT (\d) \/ 3$/,'KIPPI · STEP $1 / 3'],
  [/^(Fast geschafft|Noch eine Chance)\? (.*?)( – dafür gibt es)?$/,(m,h,r,y)=>{
    const R={'Setz ein ❤ Extra-Leben ein oder schau ein kurzes Video':'Use a ❤ extra life or watch a short video','Setz ein ❤ Extra-Leben ein':'Use a ❤ extra life','Schau ein kurzes Video':'Watch a short video'};
    return (h==='Fast geschafft'?'Almost there? ':'One more chance? ')+(R[r]||r)+(y?' – you get':'')}],
  [/^(.*) – dafür gibt es$/,(m,a)=>(a==='Setz ein ❤ Extra-Leben ein oder schau ein kurzes Video'?'Use a ❤ extra life or watch a short video':'Use a ❤ extra life')+' – you get'],
  [/^– dafür gibt es$/,'– you get'],
  [/^(\d+) Züge extra$/,'$1 extra moves'],
  [/^🎮 Bei (.+) anmelden, um die Top 5 zu sehen ›$/,'🎮 Sign in to $1 to see the Top 5 ›'],
  [/^✓ angemeldet · ☁ (.*)$/,'✓ signed in · ☁ $1'],
  [/^🎁 Belohnung! (.+)$/,(m,r)=>'🎁 Reward! '+r.replace(/Tagesspiel/g,'Daily game').replace(/Woche/g,'Week').replace(/Platz/g,'Rank')],
  [/^(\S+) (Tagesspiel|Woche): Platz (\d+)(.*)$/u,(m,b,s,r,x)=>`${b} ${s==='Woche'?'Week':'Daily game'}: rank ${r}${x}`],
  [/^(\d+)× (\S+)$/,'$1× $2'],
  [/^Platz (\d+)$/,'Rank $1'],
  [/^Etappe (\d+-\d+) · (.+)$/,(m,e,r)=>`Stage ${e} · ${r}`],
  [/^(.+) \(du\)$/,'$1 (you)'],
  [/^Rekord: (.+)$/,'Record: $1']
  ].map(([re,f])=>[re,typeof f==='function'?(...a)=>{const v=f(...a);return v}:f]);
})();
const HELP_EN=`<div class="toc"><button data-s="hGrund">How to play</button><button data-s="hSteine">Stones &amp; colors</button><button data-s="hCombo">Combos</button><button data-s="hVerlauf">Color history</button><button data-s="hModi">Modes</button><button data-s="hSerie">Streak</button><button data-s="hTipps">Tips</button><button data-s="hNeu">What's new</button></div>
<button class="btn lvl tutbtn" id="tutBtn">🎓 START TUTORIAL</button>
<section id="hGrund"><h3>How to play</h3>
<p><b>Swipe</b> anywhere on the screen in one direction (or use arrow keys/WASD). The phone's <b>back button</b> (or Esc) pauses the game. The whole board tilts – <b>all stones slide</b> to the edge.</p>
<p>When <b>3 or more matching stones</b> touch horizontally or vertically, they disappear. Bigger groups score a lot more (size² × 10).</p>
<p>After every move, <b>new stones arrive from the opposite side</b>. “Up next” at the top shows which colors are coming. When the board is full, the round is over.</p></section>
<section id="hSteine"><h3>Stones &amp; colors</h3>
<p>Every color has its own symbol – so it also works with color blindness (color scheme can be changed in ⚙).</p>
<div id="helpColors"></div>
<div class="row"><span class="sw wild">✦</span><span><b>Prism</b> – matches any color and connects groups (from level 2).</span></div>
<div class="row"><span class="sw rock"></span><span><b>Rocks</b> (stages; Endless from 6×6, from level 30) – slide along and break when a group right next to them clears.</span></div></section>
<section id="hCombo"><h3>Combos</h3>
<p>When a group disappears, the remaining stones slide on. If that forms a new group, it's a <b>combo</b> – points are multiplied by the combo level.</p>
<div class="row"><span class="sw" style="background:var(--c2)">×2</span><span><b>GOOD!</b> – second group in a row</span></div>
<div class="row"><span class="sw" style="background:var(--c3)">×3</span><span><b>SUPER!</b> – triple chain</span></div>
<div class="row"><span class="sw" style="background:var(--c1)">×4</span><span><b>MEGA!</b> – with a flash of light</span></div>
<div class="row"><span class="sw wild">×5</span><span><b>MONSTER!</b> – rainbow and quake, very rare! (×5)</span></div>
<div class="row"><span class="sw" style="background:#fff;color:#000">×6</span><span><b>ULTRA!</b> – ×6 and up, extremely rare – and you get a <b>❤ extra life</b>!</span></div>
<p>The <b>Combos</b> bar below the board counts along each game: how often you simply <b>cleared</b> and how often GOOD, SUPER, MEGA, MONSTER and ULTRA happened. At the end you see the breakdown, e.g. “5 combos (1× MEGA, 4× GOOD)”.</p>
<p><b>❤ Extra lives:</b> Every ULTRA combo gives you a life (store up to 9, saved). When the board is full or you're out of moves, you can use one instead of a video and keep playing – in Endless and in stages, not in the daily game. Your supply is shown in the main menu and in the combo bar.</p></section>
<section id="hVerlauf"><h3>Color history &amp; grid</h3>
<p>In the info bar at the bottom (and when sharing the daily game) each square stands for <b>one move</b>. The color shows what the move achieved:</p>
<div class="row"><span class="sw d" style="background:var(--line)"></span><span><b>Gray</b> (⬛) – nothing cleared</span></div>
<div class="row"><span class="sw d" style="background:var(--c3)"></span><span><b>Blue</b> (🟦) – one group cleared</span></div>
<div class="row"><span class="sw d" style="background:var(--c2)"></span><span><b>Green</b> (🟩) – combo ×2 GOOD</span></div>
<div class="row"><span class="sw d" style="background:var(--c1)"></span><span><b>Yellow</b> (🟨) – combo ×3 SUPER</span></div>
<div class="row"><span class="sw d" style="background:var(--c0)"></span><span><b>Red</b> (🟥) – combo ×4 MEGA</span></div>
<div class="row"><span class="sw d" style="background:var(--c4)"></span><span><b>Purple</b> (🟪) – combo ×5 MONSTER</span></div>
<div class="row"><span class="sw d" style="background:#fff"></span><span><b>White</b> (⬜) – combo ×6 or more: ULTRA (+1 ❤)</span></div>
<p>The more colorful your grid, the better you played.</p></section>
<section id="hModi"><h3>Game modes</h3>
<ul><li><b>📅 Daily game</b> – new every day, the same stones for every player, 40 moves. The new day starts worldwide at the same moment: <b>midnight Pacific Time</b> (9:00 in Germany) – matching the worldwide leaderboard. Your first round counts, the rest are practice. Share your result as a grid!</li>
<li><b>🗺 Stages</b> – 100 stages in 10 worlds (more worlds coming in updates) with goals (points, colors, stones, combos, rocks). “Stage 2-3” means world 2, third stage. 1–3 stars depending on moves left. The 10th stage of each world is a 👑 boss.</li>
<li><b>∞ Endless</b> – no end: play until the board is full. Every few stones the level rises: more colors, more new stones. Board size 5×5 to 8×8 – bigger boards have more colors and fill up faster.</li></ul>
<p><b>🏆 Leaderboard:</b> Top 10 in Endless per board size. The <b>daily game</b> has three lists: <b>Today</b> (today's game), <b>Week</b> (points from Monday to Sunday added up – every day played counts) and <b>All-time best</b> (the best daily games ever) – each with your <b>player name</b>. Your name and your unique <b>player ID</b> (e.g. KW-1A2B-3C4D) are in ⚙. The short code after the name (#1A2B) tells players with the same name apart.</p>
<p><b>🌍 Worldwide (app):</b> When you are signed in to <b>Google Play Games</b> (Android) or <b>Game Center</b> (iPhone), the leaderboard shows the <b>worldwide ranking</b> right away – today, this week and all time, with your rank and details like combo, moves and stones. Your player name then comes from your profile. Your best Endless rounds per board size and your scored daily game are entered automatically. Without signing in (or offline) you see the results on this device. Android and iPhone have separate leaderboards.</p>
<p><b>🏆 Top 5 in the menu (app):</b> When you're signed in to Google Play Games or Game Center, the main menu shows the top 5 of the daily game – switchable between Today, Week and All. If you're not in the top 5, your rank is shown below. Tap to open the full leaderboard. (On Google, “Today” resets at midnight Pacific Time; “Week” shows the best daily game of the week.)</p>
<p><b>🎁 Leaderboard rewards:</b> Top daily-game players get a reward when the day or week ends: <b>daily win</b> 👑 +1 ❤ · day top 3 🥈 and top 10 ⭐ as badges · <b>weekly win</b> 🏆 +3 ❤ · week top 3 🥇 +1 ❤ · week top 10 🎖. The rank the app saw last counts – so feel free to open the app again in the evening. Your achievements are on the 🔥 streak page.</p>
<p><b>☁ Progress on several devices:</b> When you're signed in to Google Play Games or Game Center, KIPPWERK saves levels, stars, records, daily games, streak, name and settings to your account. On another device with the same account (Android ↔ Android, iPhone ↔ iPad) everything is restored automatically – the better value always wins, nothing gets lost. On iPhone, iCloud must be turned on.</p>
<p><b>🎬 Rescue:</b> Board full or out of moves? An optional video clears 6 stones or gives 5 extra moves (once per round, not in the daily game).</p></section>
<section id="hSerie"><h3>🔥 Streak</h3>
<p>Play the <b>daily game</b> every day (the first, counted round) – and your streak grows by one day. The flame at the top shows it: colored = secured today, gray = still open today.</p>
<p><b>🛡 Streak shield:</b> If you miss a day, a shield saves your streak automatically. You get one free every 7 streak days, plus one per day via an optional video (at most 2 in stock).</p>
<p><b>Milestones:</b> At 3, 7, 14, 30, 50 and 100 days you get a badge and a reward (Pastel, Neon, headphones for Kippi, Lava, Gold, Cosmos) – purely cosmetic.</p><p><b>🎨 Collection</b> (⚙ → Theme &amp; Kippi): 17 themes and 8 Kippi outfits. Every completed stage world unlocks something, plus Endless level 20, 25 daily games, December, New Year’s Eve and Easter.</p>
<p><b>🔔 Reminder:</b> In the app, a notification reminds you in the evening if your streak is still open (can be turned off in ⚙).</p></section>
<section id="hTipps"><h3>Tips</h3>
<ul><li>Tilt in the <b>same direction</b> more often – colors collect on one side and combos become more likely.</li>
<li>Watch <b>“Up next”</b> and remember: new stones come from the opposite side.</li>
<li>Save <b>prism stones</b> to join two groups into a big one.</li>
<li>In stages, <b>moves left</b> count – finishing fast earns stars.</li>
<li>🪰 <b>Kippi</b>, the KIPPWERK fly, is your companion: drops by now and then, cheers your combos, reminds you of the daily game – and never gets in the way. Turn off in ⚙.</li>
<li>🎵 The music speeds up as the game gets harder – boss stages have their own track.</li></ul></section>
<section id="hNeu"><h3>What's new</h3><div id="helpChangelog"></div></section>`;
const CHANGES_EN={'1.33.0':'New collection: 17 themes and 8 Kippi outfits – unlocked through worlds, streak, Endless, daily games, December, New Year’s Eve and Easter. 6×6 gets rocks from level 30, the music speeds up to suit each board size','1.32.0':'The KIPPWERK theme: a melody of its own to hum along in the menu and the game. The tempo rises with the level and never slows down again during a round','1.31.1':'Your own result now also shows in the Top 5 and the leaderboard when Google does not rank it publicly – with a note on how to become visible','1.31.0':'The daily game now changes worldwide at the same moment, midnight Pacific Time (matching the Google “Today” leaderboard) – the menu shows “open until …”','1.30.2':'Worldwide daily game list and Top 5 now show the date of each daily game','1.30.1':'Top 5 in the main menu now also for Endless (board size as in the menu) – plus a note when a new day starts at Google','1.30.0':'One leaderboard: with Google Play Games you see the worldwide ranking right away (today/week/all time) with your rank, combo, moves and stones – your name comes from your profile','1.29.3':'“Check leaderboards” now also shows why signing in to Google Play Games fails','1.29.2':'Settings → “Check leaderboards”: shows whether your results reached Google Play Games','1.29.1':'Also installable from Google Play on tablets, Chromebooks and PC','1.29.0':'Worldwide leaderboards via Google Play Games: Endless 5×5 to 8×8 and daily game, plus cloud save of your progress','1.28.1':'Kippi only lands where it covers nothing – board, displays and buttons always stay clear','1.28.0':'Source code reorganized into modules (no visible changes) – groundwork for future updates','1.27.1':'Vibration on Android fixed (own driver) + “Test vibration” button in settings','1.27.0':'The fly is called Kippi: hosts the tutorial, speaks in your reminders and has its own notification icon','1.26.0':'New mascot: the KIPPWERK fly · music speeds up with the level, boss stages have their own track · protection against cheated leaderboard entries','1.25.2':'English: menu date and streak weekdays translated; small display fixes','1.25.1':'Speed option removed – the game always runs at normal speed','1.25.0':'Volume sliders for effects and music, vibration off/soft/strong (much more noticeable), leaderboard shows best combo, moves and stones cleared, settings reorganized','1.24.1':'Symbols on the stones slightly larger','1.24.0':'Guided tutorial on first launch, music, particles and stronger combo effects, menu stones follow your phone’s tilt','1.23.0':'English language (follows system language, switchable in ⚙), more robust saves, tablet layout fixed, updated privacy policy',
 '1.22.0':'Endless on 7×7 and 8×8: rocks from level 30, a 6th color from level 40 (★ Orange)',
 '1.21.0':'Rewards for daily and weekly ranks (extra lives, badges) – leaderboard achievements on the streak page',
 '1.20.2':'History: MONSTER (×5, purple) and ULTRA (×6+, white) have their own colors; Endless shows “last 40 moves” again',
 '1.20.0':'Combo bar (Cleared, Good, Super, Mega, Monster, Ultra), new ULTRA tier from ×6 with ❤ extra life, info bar at the bottom',
 '1.19.2':'Main menu: stones sit below the top 5 list and move down for longer lists or small screens',
 '1.19.1':'Fixed positions instead of centered; stage map uses full height; daily game shows the day\'s score instead of the Endless record',
 '1.19.0':'Main menu: daily game top 5 (Today / Week / All) from Google Play Games / Game Center',
 '1.18.2':'Fullscreen: status and navigation bars hidden, appear when swiping from the edge',
 '1.18.1':'Levels are now stages: “Stage 2-3” = world 2, third stage',
 '1.18.0':'Levels much easier (more moves, easier stars), big stars on the map, combo counter per game',
 '1.17.0':'Cloud save: progress across devices via Google Play Games / Game Center',
 '1.16.1':'Start screen: KIPPWERK wordmark now above the stones',
 '1.16.0':'Main menu: the tilted logo stones are the buttons, with subtle labels',
 '1.15.0':'Global leaderboards via Google Play Games / Game Center instead of our own server; smaller menu stones',
 '1.14.0':'New main menu: the four logo stones are now the buttons',
 '1.13.0':'Daily puzzle is now “daily game” (with date); leaderboard Today / Week / All-time best',
 '1.12.0':'New start screen with mode cards, pause card and animated logo',
 '1.11.2':'Back button pauses or returns to the menu; fixed history grid',
 '1.11.1':'Streak reachable from the start menu',
 '1.11.0':'Daily streaks: flame, streak shield, milestones with 6 themes, evening reminder',
 '1.10.0':'Global online leaderboard (optional)',
 '1.9.3':'Info bar as a sidebar on PC; scrollable menus on short screens',
 '1.9.1':'Note about upcoming worlds after level 100',
 '1.9.0':'Board sizes 5×5 to 8×8, leaderboard per size, player name, unique player ID, help with color guide',
 '1.8.0':'Full screen height used, info bar with history and goals',
 '1.7.0':'Combo tiers GOOD, SUPER, MEGA and MONSTER',
 '1.5.0':'100 levels in 10 worlds with boss levels','1.4.0':'Level mode, settings, vibration','1.2.0':'Leaderboard','1.1.0':'Shareable daily puzzle'};

