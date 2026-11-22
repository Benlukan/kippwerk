# Changelog

## v1.38.0 (Build 67) – 22.11.2026
- **Google-Play-Games-IDs eingetragen:** 7 Wochentags-Ranglisten (Tagesspiel Montag … Sonntag) und 12 Erfolge (Funke … Endlos-Profi). Abzeichen werden jetzt auch als Erfolg in Google Play Spiele freigeschaltet (bereits verdiente beim nächsten Anmelden nachgereicht)
- **Tagesspiel-Woche Mo–So:** „Woche (Mo–So)“ zählt die Punkte aller Tagesspiele von Montag bis Sonntag je Spieler zusammen – aus den 7 Wochentags-Listen (Datum aus dem Score-Tag), mit „x/7 Tage · bester Tag“. Gilt auch für die Top 5 im Menü und die Wochen-Belohnungen. Endlos bleibt bei der Google-Woche So–Sa (Google lässt den Wochenstart nicht ändern)
- **„Gestern“** im Tagesspiel ist jetzt aktiv (weltweit, aus der Wochentags-Liste)
- Einschränkung: Am Sonntag stammen Mo–Sa aus der Gesamt-Liste des jeweiligen Wochentags – hatte ein Spieler an einem früheren gleichen Wochentag mehr Punkte, fehlt dieser Tag in seiner Summe
## v1.37.0 (Build 66) – 22.11.2026
- **Endlos-Bestenlisten nach Zeitraum:** Für jede Feldgröße (5×5 bis 8×8) jetzt **Heute**, **Woche (So–Sa)** und **Gesamt** – weltweit über Google Play Games (Google führt Tages- und Wochenwerte für jede Rangliste automatisch, keine neuen IDs nötig) und ohne Anmeldung auch auf diesem Gerät (aus dem Endlos-Verlauf)
- „Gestern“ erscheint nur noch beim Tagesspiel
- Hilfe und „Was ist neu?“ ergänzt (DE/EN)
## v1.36.1 (Build 65) – 22.11.2026
- **Tageswechsel exakt wie Google:** Spieltag jetzt fest nach UTC-7 (`Etc/GMT+7`) statt Pazifikzeit mit Zeitumstellung. Neuer Tag in Deutschland um **08:00 Uhr im Winter**, 09:00 Uhr im Sommer – vorher wechselte die App im Winter erst um 09:00, Google aber schon um 08:00
- **„Woche (So–Sa)“:** Google setzt die Wochenliste in der Nacht Samstag→Sonntag (UTC-7) zurück und lässt sich nicht auf Montag umstellen. Reiter, Menü-Umschalter, Hinweise und Hilfe zeigen das jetzt an; die Wochenauswertung der App (Wochensumme, Wochen-Belohnungen) läuft ebenfalls So–Sa, damit sie zur Google-Liste passt
## v1.36.0 (Build 64) – 21.11.2026
- **Neues Menü „🎨 Sammlung“** mit eigenem Knopf im Hauptmenü (roter Punkt = Anzahl neu freigeschalteter Dinge). Drei Reiter mit Zähler: **Designs** (Mini-Vorschau mit 4 Steinen, tippen = anwenden), **Kippi** (Outfits), **Abzeichen**
- **12 Abzeichen** mit Fortschrittsbalken und Datum: Serie 3/7/14/30/50/100 Tage, erste ULTRA-Combo, Welt 1, 100 Sterne, 25 Tagesspiele, Tagessieger, 10.000 Punkte Endlos – dazu die Platzierungen aus der weltweiten Rangliste. Einblendung „🏅 Neues Abzeichen“. Vorbereitet für Google-Play-Games-Erfolge (IDs in `GAMES_CONFIG.android.ach`)
- ⚙ „Design & Kippi“ und 🔥-Fenster führen direkt in die Sammlung
- **Zurück im Spiel:** klarer „←“-Knopf oben links (statt „☰“ rechts) – zurück ins Hauptmenü, die Runde bleibt als „Weiterspielen“ erhalten
## v1.35.1 (Build 63) – 21.11.2026
- **„Meine Tage“ mit Endlos:** Tagesspiel und alle Endlos-Runden, nach Spieltag gruppiert (neueste zuerst), je Runde Feldgröße, Level, Combo, Züge, Steine; 🏆 markiert das beste Tagesspiel und die beste Endlos-Runde. Kennzahlen: Spieltage, Spiele, Bestes Tagesspiel, Bestes Endlos
- Neuer Verlauf `kippwerk_history` (letzte 400 Endlos-Runden, nur auf diesem Gerät); ältere Endlos-Rekorde aus der Bestenliste werden einmalig mit angezeigt
## v1.35.0 (Build 62) – 21.11.2026
- **🗓 Meine Tage:** dritter Reiter in der Bestenliste – alle eigenen Tagesspiele, neueste zuerst, mit Datum, Combo, Zügen und Steinen (🏆 = bester Tag) und Kennzahlen (Gespielt, Serie, Bester, Schnitt). Neue Tagesspiele speichern auch die abgeräumten Steine
- **„Gestern“ (weltweit) vorbereitet:** Tagesspiele werden zusätzlich an eine Bestenliste je Wochentag gemeldet (`wd0`…`wd6`); der Zeitraum „Gestern“ erscheint, sobald die 7 IDs eingetragen sind. Anleitung in `docs/game-services.md`
- Behoben (seit v1.34.0): Solange „Was ist neu?“ offen war, wurde ein Cloud-Spielstand erst nach dem Schließen übernommen
## v1.34.0 (Build 61) – 21.11.2026
- **„🆕 Was ist neu?“** in ⚙ (Hilfe & Rechtliches) mit aktueller Versionsnummer: zeigt die letzten 5 Versionen, „Alle Versionen anzeigen“ für die komplette Liste (DE/EN)
- **Nach einem Update einmal automatisch** im Hauptmenü – mit allen Neuerungen seit der zuletzt gesehenen Version (max. 8). Nicht bei Neuinstallation (dort kommt das Tutorial); gemerkt in `kippwerk_seenver`
## v1.33.1 (Build 60) – 20.11.2026
- **Retro 8-Bit:** Auswahl war unsichtbar (weiße Schrift auf weißem Grund, weil die Linienfarbe weiß war). Linienfarbe jetzt gedämpft, gewählte Knöpfe pink mit blauem Pixel-Schatten, eingeschaltete Schalter grün; Spielfeld behält den weißen Pixel-Rahmen
## v1.33.0 (Build 59) – 20.11.2026
- **Sammlung (⚙ → Design & Kippi):** 17 Designs mit eigener Oberfläche (Holz, Pixel, Papier, Streifen, Edelstein-Facetten, Schnee …) – auch auf den großen Menü-Steinen – und 8 Kippi-Outfits (Sonnenbrille, Kopfhörer, Bauhelm, Zauberhut, Schal, Krone, Partyhut, Hasenohren)
- **Neue Designs:** Werkstatt, Retro 8-Bit, Papier, Wald, Bonbon, Kristall, Prisma, Winter, Feuerwerk, Frühling; überarbeitet: Pastell, Neon (unterschiedliche Symbole sichtbar), Ozean, Lava, Gold, Kosmos
- **Freischaltung:** jede Welt (Etappe x-10) – abwechselnd Design und Kippi-Outfit, Welt 10 beides; Serie 3/7/14/30/50/100 Tage → Pastell, Neon, Kopfhörer, Lava, Gold, Kosmos; Endlos Level 20 → Retro; 25 Tagesspiele → Papier; im Dezember → Winter; an Silvester (31.12./1.1.) → Feuerwerk + Partyhut; an Ostern (Karfreitag–Ostermontag) → Frühling + Hasenohren. Hinweis per Einblendung, freigeschaltet bleibt freigeschaltet (`kippwerk_unlocks`, Cloud-Sicherung führt zusammen)
- Bestandsschutz: Wer nach der alten Zuordnung schon Neon/Pastell/Ozean hatte oder ein Design nutzt, behält es
- **6×6 schwerer:** Endlos ab Level 30 Felsen (wie 7×7 und 8×8)
- **Musik je Feldgröße:** Tempo-Stufen nach Bot-Simulation – 5×5 ab Level 3/5/7/10, 6×6 ab 5/10/16/22, 7×7 ab 4/8/13/18, 8×8 ab 8/15/23/32
- Hilfe (DE/EN) ergänzt
## v1.32.0 (Build 58) – 20.11.2026
- **Das KIPPWERK-Thema:** eigene, gleichbleibende Melodie (16 Takte, A – A' – B – A) über Am – F – C – G, im Spiel als heller Puls-Ton, im Menü leise und weich. Vorher gab es nur Akkord-Arpeggios ohne Melodie
- **Tempo nur noch aufwärts:** Die Stufe (88 → 93 → 98 → 104 → 110 BPM) kann in einer Partie nicht mehr sinken
- **Gefahr ohne Tempo-Sprung:** Bei fast vollem Feld (≥ 78 %) wird die Musik dichter (Hi-Hat + Snare), aber nicht mehr 6 % schneller – das ständige schnell/langsam beim Füllen und Abräumen entfällt
- Begleit-Arpeggio eine Oktave tiefer, damit die Melodie Platz hat; Boss-Musik unverändert
## v1.31.1 (Build 57) – 20.11.2026
- **Eigenes Ergebnis immer sichtbar:** Liefert Google den eigenen Eintrag ohne öffentlichen Platz (Rang ≤ 0, z. B. weil das Play-Games-Profil nicht „für alle sichtbar“ ist), zeigt KIPPWERK ihn trotzdem – in den Top 5 im Menü und in 🏆 – mit „–“ statt „-1.“ und dem Hinweis „Nur für dich sichtbar“ samt Anleitung
- Top 5 zeigen den eigenen Eintrag jetzt auch, wenn die öffentliche Liste leer ist; „⋯“ erscheint nur noch, wenn darüber Einträge stehen
## v1.31.0 (Build 56) – 20.11.2026
- **Neuer Spieltag um 9:00 Uhr:** Das Tagesspiel (Steine, Serie, Belohnungen, Listen „Heute“) wechselt jetzt weltweit gleichzeitig um Mitternacht Pazifikzeit – in Deutschland 9:00 Uhr. Damit passt es zu Googles Rangliste „Heute“, und alle Spieler weltweit spielen zur selben Zeit dasselbe Tagesspiel
- **Hinweise:** Menü „offen bis 09:00“ (statt „heute offen“), nach dem Tagesspiel „Nächstes Tagesspiel in … · um 09:00“, Top 5 „Neuer Tag ab 09:00“, Hilfe (DE/EN) ergänzt. Die Uhrzeit wird in Ortszeit angezeigt (z. B. 17:00 in Japan)
- Statistik „Serie“ im Tagesspiel zählt nach Spieltagen statt Kalendertagen
## v1.30.2 (Build 55) – 20.11.2026
- **Datum beim Tagesspiel:** Ergebnisse senden das Datum des Tagesspiels im Score-Tag mit (`d20261120`); die weltweite Tagesspiel-Liste in 🏆 und die Top 5 im Menü zeigen es an (z. B. „Fr., 20.11.“). Wichtig bei „Woche“/„Alle“ und vor 9 Uhr, wenn Googles „Heute“ noch das Tagesspiel vom Vortag enthält
- Ergebnisse von vor v1.30.2 haben kein Datum und werden ohne angezeigt
## v1.30.1 (Build 54) – 20.11.2026
- **Top 5 im Hauptmenü auch für Endlos:** Umschalter „Tagesspiel | Endlos N×N“ (Feldgröße folgt dem Endlos-Feld im Menü), Auswahl wird gemerkt; Heute/Woche/Alle wie bisher
- „Ganze Rangliste ›“ öffnet jetzt die passende Liste direkt in 🏆 (gleiche Feldgröße, gleicher Zeitraum) statt der Google-Ansicht
- **Hinweis „Neuer Tag ab 09:00“:** Google wertet „Heute“ nach Pazifikzeit; die App zeigt, ab wann bei dir ein neuer Ranglisten-Tag beginnt (Top 5 und 🏆)
- Behoben: Das Aktualisieren der Einstellungs-Schalter konnte die Markierung der Top-5-Auswahl entfernen
## v1.30.0 (Build 53) – 20.11.2026
- **Eine Bestenliste statt zwei:** Mit Google Play Games zeigt 🏆 direkt die **weltweite** Rangliste im Spiel – Endlos je Feldgröße und Tagesspiel, jeweils **Heute / Diese Woche / Gesamt**, bis Platz 25 plus dein eigener Platz (mit „⋯“, falls weiter unten). Der Knopf „Weltweit“ entfällt
- **Details auch online:** Level, beste Combo, Züge und abgeräumte Steine werden als Score-Tag mitgesendet (`c…m…s…l…`) und in der Liste angezeigt. Dafür erweitert der Plugin-Patch `submitScore` um `scoreTag` und `loadTopScores` um `tag`
- **Spielername aus Google:** angemeldet übernimmt KIPPWERK den Namen aus dem Play-Games-Profil; das Namensfeld in ⚙ ist dann gesperrt, die Namensabfrage nach dem Spiel entfällt
- Ohne Anmeldung (bzw. Web-Version) bleibt die Liste dieses Geräts – mit Knopf „🎮 Mit Google Play Games anmelden“. Ist Google nicht erreichbar, wird automatisch die Geräte-Liste gezeigt
- Warteschlange speichert die Details mit; bisher wartende Ergebnisse (z. B. aus v1.29) bleiben gültig
- Hilfe (DE/EN) angepasst
## v1.29.3 (Build 52) – 19.11.2026
- **„Ranglisten prüfen“ zeigt den Grund einer gescheiterten Anmeldung** (Rückmeldung von Google, z. B. `cancelled`, `not_authenticated`, `10: DEVELOPER_ERROR`) samt Hinweis, was zu prüfen ist – Tester-Konto oder Fingerabdruck (SHA-1)
- Doku `docs/game-services.md`: Abschnitt Fehlersuche, SHA-1 des Upload-Schlüssels ergänzt
## v1.29.2 (Build 51) – 19.11.2026
- **Einstellungen → „🌍 Ranglisten prüfen“** (nur mit Play Games): zeigt Anmeldestatus, Warteschlange, je Bestenliste den eigenen sichtbaren Bestwert/Platz (öffentliche Liste, Zeitraum „Gesamt“) und die letzten 8 Meldungen mit Ergebnis – „gesendet“, Fehlermeldung von Google oder „⛔ Grund“, wenn der Ranglisten-Schutz ein Ergebnis zurückgehalten hat
- Fehler beim Senden wurden bisher still verschluckt; sie werden jetzt protokolliert (`kippwerk_games_log`), das Ergebnis bleibt wie bisher in der Warteschlange und wird später erneut gesendet
- Hinweis: Etappen (Level-Modus) werden nicht an Bestenlisten gemeldet – nur Endlos (bei „Feld voll“) und Tagesspiel
## v1.29.1 (Build 50) – 19.11.2026
- **Play Console: Geräte-Sperre behoben.** Durch `screenOrientation="portrait"` galt Hochformat als Pflicht-Hardware (`android.hardware.screen.portrait`) – Google Play blockiert damit das Einreichen. Jetzt im Manifest als `required="false"` erklärt; die App bleibt im Hochformat
## v1.29.0 (Build 49) – 19.11.2026
- **Google Play Games aktiv (Android):** Projekt-ID 414239949537 in `games-ids.xml`, fünf Bestenlisten in `GAMES_CONFIG.android` eingetragen und eingeschaltet – Endless 5×5/6×6/7×7/8×8 (Obergrenze 5 000 000) und Daily game (100 000), Manipulationsschutz an
- Anmeldung mit Play Games, weltweite Ranglisten im Spiel, Spielstand in der Cloud („Gespeicherte Spiele“)
- Ergebnisse gehen weiterhin nur nach erfolgreicher Prüfung durch den Ranglisten-Schutz raus; ohne Anmeldung bleiben sie signiert in der Warteschlange
- Doku: `docs/game-services.md` auf den Modulaufbau (`src/js/app/10-play-games.js`) und die eingetragenen IDs aktualisiert
## v1.28.1 (Build 48) – 18.11.2026
- **Kippi verdeckt nichts mehr:** Landeplätze werden geprüft – nie über Spielfeld, Punkte-Anzeigen, Knöpfen, Info-Boxen oder Steuerkreuz. Bevorzugt auf Box-Oberkanten mit freiem Platz darüber, über der Fußzeile oder (PC/Tablet) neben dem Spielfeld; gibt es keinen freien Platz, landet er auf dem KIPPWERK-Schriftzug. Geprüft auf 360×640 bis 1280×720 (vorher saß er z. B. über „Als Nächstes“)
- Kippi nutzt einen eigenen Zufall (beeinflusst die Spiel-Zufallsfolge nicht mehr); „Abgeschüttelt“ etwas seltener
- **Neue Store-Grafiken mit Kippi** (DE/EN): 8 Screenshots (neu: „Kippi zeigt dir, wie’s geht“), Feature-Grafik mit Kippi auf dem Logo, Produktvideo 29,2 s – Kippi fliegt im Intro aufs Logo, landet beim Spielen, eigene Szene „Kippi – dein Wegbegleiter“
## v1.28.0 (Build 47) – 18.11.2026
- **Modulaufbau:** Quellcode liegt jetzt in `src/` – 11 CSS-Module, englisches Wörterbuch und 30 Logik-Module (Werbung, Sprache, Vibration, Ranglisten-Schutz, Play Games, Serie, Musik, Regeln, Ablauf, Kippi …). `tools/build.mjs` setzt daraus `www/index.html` zusammen (weiterhin eine Datei, offline). Erster Bau byte-genau identisch mit v1.27.1 → keine Verhaltensänderung
- `npm run build` / `npm run build:check`; `npm run sync` und `npm run android` bauen vorher automatisch
- CI prüft vor jedem App-Build, ob `www/index.html` zu `src/` passt
- Übersicht aller Module: `docs/architektur.md`
## v1.27.1 (Build 46) – 18.11.2026
- **Vibration (Android) neu:** eigenes natives Plugin `KwVibePlugin` (in `MainActivity` registriert). Vibriert ausdrücklich als Spiel-/Medien-Vibration (`VibrationAttributes.USAGE_MEDIA` ab Android 13, sonst `AudioAttributes.USAGE_GAME`) mit voller Stärke; bei Combos/Gewinnen zusätzlich System-Haptik. Hintergrund: Das Standard-Plugin vibriert ohne Verwendungszweck – viele Geräte dämpfen oder ignorieren das. Fallback auf das Standard-Plugin bleibt
- `VIBRATE`-Berechtigung ausdrücklich im App-Manifest
- **Einstellungen → „📳 Vibration testen“:** vibriert kräftig und zeigt, was das Gerät meldet (Android-Version, Hersteller, Klingelmodus, Stärkeregelung) bzw. die Fehlermeldung – zur Fehlersuche
## v1.27.0 (Build 45) – 17.11.2026
- **Kippi**, die KIPPWERK-Fliege, ist jetzt der Wegbegleiter:
  - Tutorial: Kippi (mit Bild) erklärt die drei Schritte („Hi, ich bin Kippi! …“), Kopfzeile „KIPPI · SCHRITT 1 / 3“
  - Erinnerungen: Titel „🪰 Kippi · KIPPWERK“, Texte in Kippis Stimme, wechseln von Tag zu Tag (3 Texte ohne Serie, 2 mit Serie, eigener Text am zweiten Tag), Deutsch und Englisch
  - Android: eigenes Benachrichtigungs-Symbol `ic_stat_kippi` (Fliegen-Silhouette)
  - Einstellung heißt „🪰 Kippi (Maskottchen)“; Hilfe und Store-Texte stellen Kippi vor
- Tutorial-Hinweis jetzt undurchsichtig (Text dahinter schien durch)
## v1.26.0 (Build 44) – 17.11.2026
- **Maskottchen „KIPPWERK-Fliege“:** fliegt alle 25–50 s (Menü 15–40 s) vorbei, landet auf Rändern (Spielfeld-Ecken, Info-Boxen, Menü-Steine – nie auf dem Spielfeld), schaut aufs Feld, blinzelt, wackelt beim Kippen mit (wird manchmal „abgeschüttelt“ 😵) und reagiert: Combo „!“, MONSTER 😮, ULTRA 🤩 mit Looping, volles Feld 💦, Level 🎉, Rekord ♥, Etappe geschafft ⭐, Spielende 😢. Keine Klicks, verschwindet bei offenen Menüs, aus bei „Bewegung reduzieren“, abschaltbar in ⚙ „🪰 Maskottchen (Fliege)“
- **Musik mit Steigerung:** drei Stücke – Menü (ruhig), Spiel, Boss. Das Spiel-Stück wird in 5 Stufen schneller und voller (88 → 110 BPM, Hi-Hats, Bass-Drum, treibender Bass, Oktave): Endlos ab Level 5/10/15/25, Etappen je zwei Welten, Tagesspiel ab Zug 15/28/36. Boss-Etappen: eigenes Stück in harmonischem Moll (112 BPM, Bass-Ostinato, Snare). Ist das Feld zu ¾ voll, zieht das Tempo um 6 % an. Wechsel immer zum nächsten Takt mit kurzer Überblendung
- **Schutz gegen Schummeln:** Punkte werden in einem geschlossenen Protokoll nachgerechnet, nur stimmige Ergebnisse gehen an Play Games/Game Center; wartende Ergebnisse sind signiert. Grenzwerte + Manipulationsschutz für die Play Console in `docs/game-services.md`
- Hilfe: Tipps zu Fliege und Musik
## v1.25.2 (Build 43) – 17.11.2026
- **Neue Store-Grafiken und Produktvideo** (Deutsch + Englisch, siehe `docs/store/de|en`): 7 Screenshots 1080×1920 mit Überschriften, Feature-Grafik, Video 29,2 s mit Spielmusik (Play-Store- und App-Store-Format); Werkzeuge in `tools/video`
- Englisch: Datum im Hauptmenü war beim Start noch deutsch („Di, 17.11.“), Wochentage auf der Serien-Seite übersetzt, „So geht’s“ → „How to play“
- Tagesspiel-Ende: „Nächstes Rätsel in …“ → „Nächstes Tagesspiel in …“
- Hauptmenü: Hinweis unter „Tagesspiel“ ohne Serienzahl (steht schon im Flammen-Chip) – lief auf schmalen Handys über den Rand; Beschriftungen umbrechen statt abgeschnitten zu werden
- Combo-Leiste: ❤-Anzeige bricht nicht mehr um
- Partikel nutzen einen eigenen Zufall (beeinflusst die Spiel-Zufallsfolge nicht mehr)
## v1.25.1 (Build 42) – 17.11.2026
- Einstellung „⚡ Tempo“ (Normal/Schnell) entfernt; das Spiel läuft immer im normalen Tempo, gespeicherte „Schnell“-Einstellungen werden ignoriert
## v1.25.0 (Build 41) – 17.11.2026
- **Lautstärke unabhängig vom Handy:** Regler für 🔊 Effekte und 🎵 Musik (0 % = aus). Musik standardmäßig deutlich lauter (70 %, bisher entsprach das etwa 35 %); alte Ton-/Musik-Schalter werden übernommen
- **Vibration:** Auswahl Aus · Sanft · Stark (Standard Stark), Probe-Vibration beim Umschalten. Android vibriert jetzt mit fester Dauer und voller Stärke (vorher kaum spürbare „leichte“ Impulse beim Abräumen); iOS nutzt Taptic-Impulse
- **Bestenliste:** zweite Zeile je Eintrag mit **beste Combo**, **Anzahl Züge** und **abgeräumte Steine** (Endlos zusätzlich Level, dazu Datum); ältere Einträge ohne diese Angaben zeigen nur das Vorhandene
- **Einstellungen aufgeräumt:** Gruppen Profil · Ton & Vibration · Spiel · Darstellung · Hilfe & Rechtliches · Daten (Löschen-Knöpfe ganz unten)
## v1.24.1 (Build 40) – 17.11.2026
- Symbole auf den Steinen etwa 25 % größer (alle Feldgrößen, max. 30 px)
## v1.24.0 (Build 39) – 17.11.2026
- **Geführtes Tutorial beim ersten Start** (statt Hilfetext): 3 Schritte auf einem vorbereiteten 6×6-Feld – nach links kippen (3 gleiche verschwinden), nach unten kippen (Combo ×2), dann freies Spiel. Pfeil zeigt die Richtung, falsche Richtung wird abgefangen, überspringbar; jederzeit erneut über Hilfe → „🎓 Tutorial starten“
- **Musik:** ruhiger, im Spiel erzeugter Loop (Am–F–C–G), schaltbar in ⚙ „🎵 Musik“; pausiert im Hintergrund und während Werbung
- **Mehr Wirkung:** Partikel beim Abräumen (mehr und weiter bei Combos), MEGA ruckt das Feld, MONSTER bebt, ULTRA bebt stark
- **Hauptmenü:** die vier Logo-Steine folgen der Handy-Neigung (am PC der Maus), schaltbar in ⚙ „📱 Menü kippt mit dem Handy“; ohne Sensor bleibt die bisherige Kipp-Animation
- Englisch: alle neuen Texte übersetzt; Rettungs-Dialog „Fast geschafft?“ vollständig übersetzt
## v1.23.0 (Build 38) – 17.11.2026
- **Englisch als zweite Sprache:** Standard ist die Systemsprache (Deutsch für de-DE/AT/CH/LI/LU …, sonst Englisch); umschaltbar in ⚙ „🌐 Sprache / Language: Auto · Deutsch · English“. Alle Menüs, Spieltexte, Toasts, Benachrichtigungen, Teilen-Text, Datumsformate, Hilfe und Neuigkeiten übersetzt
- **Rechtstexte:** Datenschutzerklärung aktualisiert (eigener Server/Supabase-Teil entfernt, lokale Speicherung nach § 25 Abs. 2 Nr. 2 TDDDG, Extra-Leben/Belohnungen/Ranglistenplatz, Abruf der Top 5); englische Fassungen `privacy.html` und `legal-notice.html`, Links folgen der Sprache
- **Robuster Spielstand:** beschädigte, aber gültige JSON-Daten im Speicher (z. B. `null`-Einträge) brachten das Spiel zum Absturz – Laden ist jetzt abgesichert
- **Tablet (z. B. 768×1024):** Spielfeld lief 112 px über den Bildschirm – korrigiert
## v1.22.0 (Build 37) – 11.11.2026
- **Endlos auf 7×7 und 8×8 – neue Steinarten:**
  - ab **Level 30 Felsen** 🪨: kommen zufällig mit den neuen Steinen (6 %, je Level +0,5 %, höchstens 15 %), rutschen mit und zerbrechen, wenn direkt daneben eine Gruppe verschwindet
  - ab **Level 40 eine 6. Farbe: Orange ★** (Farbschwäche-Schema: Blau)
  - Ankündigung beim Erreichen der Stufe; Vorschau „Als nächstes“ zeigt Felsen; Hilfe ergänzt
  - 5×5, 6×6, Tagesspiel und Etappen unverändert
## v1.21.0 (Build 36) – 11.11.2026
- **Belohnungen für die Tagesspiel-Rangliste** (Google Play Games / Game Center):
  - Tag: Platz 1 👑 +1 ❤ · Top 3 🥈 · Top 10 ⭐ (Abzeichen)
  - Woche: Platz 1 🏆 +3 ❤ · Top 3 🥇 +1 ❤ · Top 10 🎖
  - Gewertet wird der zuletzt gesehene Platz (die App merkt ihn sich bei jedem Abruf der Rangliste, die Woche wird im Hintergrund mitgeladen); vergeben beim ersten Start nach Ablauf von Tag bzw. Woche, jeweils nur einmal; Extra-Leben bis max. 9
  - Ranglisten-Erfolge mit Anzahl auf der 🔥 Serien-Seite; Abzeichen im Cloud-Spielstand
  - Hinweis: Plattform und App rechnen Tag/Woche leicht unterschiedlich (App: deutscher Kalendertag, Woche Mo–So)
## v1.20.2 (Build 35) – 11.11.2026
- Verlauf (Endlos): wieder die **letzten 40 Züge** in zwei Zeilen, Überschrift „Verlauf · letzten 40 Züge“
- Verlauf, Legende, Hilfe und geteiltes Ergebnis: **MONSTER ×5** (lila 🟪) und **ULTRA ×6+** (weiß ⬜) haben eigene Farben – vorher liefen sie als ×4 MEGA (rot) mit
## v1.20.1 (Build 34) – 11.11.2026
- Endlos: Verlauf heißt „Verlauf · letzten 20 Züge“ und zeigt genau die letzten 20 Züge (eine Zeile statt zwei)

## v1.20.0 (Build 33) – 11.11.2026
- **Info-Leiste unten:** Combo-Leiste und Verlauf stehen im Spiel (Tagesspiel, Endlos, Etappen) am unteren Bildschirmrand
- **Combo-Leiste** mit je einem Zähler pro Spiel: Abgeräumt · Good (×2) · Super (×3) · Mega (×4) · Monster (×5) · **Ultra (×6+)**; Kopfzeile mit Combos gesamt, bester Kette, Steinen weg (Endlos: bis zum nächsten Level), ❤-Vorrat
  - Etappen: aktuelles Sterne-Ziel steht in der Ziele-Kopfzeile
- **Neue Stufe ULTRA ab ×6** (eigener Effekt) – bringt ein **❤ Extra-Leben** (Vorrat bis 9, gespeichert, im Cloud-Spielstand)
  - Leben einsetzen statt Video, wenn das Feld voll ist bzw. die Züge alle sind (Endlos + Etappen, nicht im Tagesspiel); mehrere pro Runde möglich, funktioniert auch in der Web-Version
  - Vorrat im Hauptmenü neben der Flamme (nur wenn > 0)
- Kleine Displays (bis 780 px Höhe): Verlauf-Raster ausgeblendet; bis 740 px etwas kleineres Spielfeld – alles passt ohne Abschneiden
## v1.19.2 (Build 32) – 11.11.2026
- Hauptmenü: Die Steine stehen wieder direkt unter der Top-5-Liste (etwa ab Bildschirmmitte) statt ganz unten. Wird die Liste länger oder ist das Display kleiner, rutschen sie automatisch weiter nach unten; Version unten am Rand
## v1.19.1 (Build 31) – 11.11.2026
- **Feste Positionen statt vertikal mittig:** Spiel, Menüs und Listen beginnen oben und stehen pro Gerät immer an derselben Stelle (Spielfeld springt nicht mehr je nach Modus/Inhalt)
  - Hauptmenü: Schriftzug oben, darunter Top 5, die Steine mit Beschriftung im unteren Drittel
  - Bestenliste: oben bündig, „Schließen“ unten
  - Etappenkarte nutzt die ganze Bildschirmhöhe
- **Tagesspiel:** zeigt nicht mehr den Endlos-Rekord – nur noch die Punkte des Tages (in der Übungsrunde zusätzlich das gewertete Ergebnis „Gewertet“)
## v1.19.0 (Build 30) – 11.11.2026
- **Top 5 im Hauptmenü:** zwischen Schriftzug und Steinen die besten 5 im Tagesspiel aus Google Play Games / Game Center
  - Umschalter **Heute / Woche / Alle** (Auswahl wird gemerkt), eigene Zeile blau; außerhalb der Top 5 steht die eigene Platzierung darunter
  - Antippen bzw. „Ganze Rangliste ›“ öffnet die Plattform-Rangliste; nicht angemeldet: Hinweis zum Anmelden
  - nur in der App (Web blendet den Kasten aus), noch ausgeschaltet bis zur Play-Games-Einrichtung
  - Plugin um `loadTopScores` erweitert (Android: Play Games v2 `loadTopScores` + eigene Platzierung; iOS: `GKLeaderboard.loadEntries`) – als Patch in `patches/`
- Hauptmenü: Weltname und Sterne der Etappe auf zwei Zeilen (wurden auf manchen Handys abgeschnitten)
## v1.18.2 (Build 29) – 11.11.2026
- **Vollbild auf Android:** Uhrzeit-/Statusleiste und Navigationsleiste sind ausgeblendet. Wischen vom oberen bzw. unteren Rand blendet sie kurz ein, danach verschwinden sie wieder (auch nach Werbung, Teilen oder App-Wechsel)
- Keine grauen Flächen mehr hinter den Leisten: Fensterhintergrund in Spielfarbe, Inhalt reicht bis neben die Kamera-Aussparung
- iOS: Statusleiste ausgeblendet
## v1.18.1 (Build 28) – 11.11.2026
- Im Level-Modus heißen die Level jetzt **Etappen** im Format **Welt-Etappe**: „Etappe 2-3“ = Welt 2, dritte Etappe (bisher Level 13)
  - Menü, Etappenkarte (🗺 ETAPPEN, Knöpfe 1-1 … 10-10), Intro/Gewonnen/Verloren, Spielkopf, Ziele, Pause und Rettung
  - Boss = jeweils Etappe x-10; Hilfe angepasst
  - Endlos-Modus behält seine Stufen („Level“ = Schwierigkeit im Endlos-Spiel)
## v1.18.0 (Build 27) – 11.11.2026
- **Level deutlich leichter** (alle 100 Level neu abgestimmt per Bot-Simulation, `tools/rebalance.py`):
  - mehr Züge pro Level (insgesamt +27 %), kein Level hat weniger Züge als vorher
  - Sterne leichter: für ★★★ und ★★ darf man deutlich mehr Züge verbrauchen (★★★ etwa 35–80 % mehr Spielraum)
  - Bot schafft die Level jetzt zu 87–100 % je Welt (vorher 35–93 %)
  - bereits erspielte Sterne bleiben erhalten
- **Levelkarte:** Sterne groß und farbig (leere Sterne grau), Level mit ★★★ golden hervorgehoben
- **Combo-Zähler pro Spiel:** Kachel „Combos“ unter dem Feld zählt jede Combo mit (springt bei jeder neuen Combo) und zeigt die beste; am Ende die Aufteilung, z. B. „5 Combos (1× SUPER, 4× GOOD)“
## v1.17.0 (Build 26) – 11.11.2026
- **☁ Spielstand in der Cloud (geräteübergreifend):** Mit Anmeldung bei Google Play Games bzw. Game Center werden Level/Sterne, Endlos-Rekorde, Tagesspiele, Serie (inkl. Schutz und Abzeichen), Spielername und Einstellungen im Konto gespeichert
  - auf einem anderen Gerät mit demselben Konto wird alles automatisch übernommen – Zusammenführung statt Überschreiben, es zählt jeweils das Bessere
  - Abgleich beim Start, im Menü und beim Verlassen der App; mitten im Spiel wird erst im Menü übernommen
  - ⚙ zeigt den letzten Abgleich („✓ angemeldet · ☁ 09:41“)
  - nur innerhalb einer Plattform (Android ↔ Android, iPhone ↔ iPad); Web bleibt lokal
  - noch ausgeschaltet bis zur Einrichtung der Play-Games-Dienste (`docs/game-services.md`: „Gespeicherte Spiele“ aktivieren; iOS: iCloud-Berechtigung ist im Projekt)
- Hilfe und Datenschutzerklärung ergänzt
## v1.16.1 (Build 25) – 11.11.2026
- Startbildschirm: Schriftzug **KIPPWERK** steht jetzt über den Steinen (aufgeräumter)
- Endlos ohne Rekord zeigt „Rekord –“ (Text passt auch auf schmale Handys)
## v1.16.0 (Build 24) – 11.11.2026
- **Hauptmenü:** Das Logo mit den vier gekippten Steinen ist das Menü – jeder Stein ist ein Knopf (● Tagesspiel, ▲ Level, ■ Endlos, ◆ Hilfe)
  - Beschriftung dezent daneben: links Tagesspiel und Endlos, rechts Level und Hilfe (Titel + graue Infozeile: Datum/Status, Welt/Sterne/Fortschritt, Feldgröße/Rekord) – auch die Beschriftung ist antippbar
  - Tagesspiel-Stein leuchtet, solange das heutige Spiel offen ist; Logo kippt ab und zu
  - darunter Schriftzug KIPPWERK und Endlos-Feldgröße; Pause: „Weiterspielen“ oben
## v1.15.0 (Build 23) – 11.11.2026
- **Weltweite Ranglisten jetzt über Google Play Games (Android) und Game Center (iOS)** statt eigenem Supabase-Server
  - Ranglisten: Endlos 5×5 / 6×6 / 7×7 / 8×8 und Tagesspiel – mit Heute / Woche / Gesamt der Plattform
  - Bestenliste: Knopf „🌍 Weltweit“ öffnet die Rangliste zum aktuellen Reiter; ⚙ zeigt den Anmeldestatus („Anmelden“ / „✓ angemeldet“)
  - Ergebnisse werden vorgemerkt und automatisch nachgereicht, sobald man angemeldet ist
  - Noch ausgeschaltet (`GAMES_CONFIG` in `www/index.html`), bis die Ranglisten in Play Console / App Store Connect angelegt sind – Anleitung: `docs/game-services.md`
  - Web-Version: nur lokale Bestenliste
- Supabase komplett entfernt (Schema, Keep-alive-Workflow, Einstellungen, Datenschutz-Abschnitt); Datenschutzerklärung um Play Games / Game Center ergänzt
- Startbildschirm: die vier Menü-Steine sind kleiner und ruhiger, Logo und Steine stehen mittig
## v1.14.0 (Build 22) – 11.11.2026
- **Hauptmenü neu:** Die vier Steine aus dem Logo sind jetzt die Knöpfe – im Stil der Spielsteine, leicht gekippt, mit gelegentlichem „Kipp“-Wackler
  - ● rot = **Tagesspiel** (Datum, Status, „!“ wenn heute noch offen, ✓ wenn gespielt)
  - ▲ gelb = **Level** (aktuelles Level, Sterne, Fortschritt)
  - ■ grün = **Endlos** (Feldgröße, Rekord) – Feldgröße darunter wählbar
  - ◆ blau = **Hilfe**
- Farben folgen Design und Farbschwäche-Schema; Karten-Optik, Emoji-Symbole und schwebende Deko entfernt
- Pause: „Weiterspielen“ als breiter Stein über den vier Knöpfen
## v1.13.0 (Build 21) – 11.11.2026
- **„Tagesrätsel“ heißt jetzt „Tagesspiel“** und wird mit **Datum** statt Nummer angezeigt (Menü, Spielkopf, Ergebnis, Teilen: „KIPPWERK Tagesspiel 11.11.2026“, Serie, Erinnerung, Hilfe)
- **Bestenliste Tagesspiel mit drei Listen:**
  - **Heute** – das Tagesspiel des Tages
  - **Woche** – alle Tagesspiele von Montag bis Sonntag zusammengezählt (lokal mit Wochensumme, Tagen x/7, bestem Tag)
  - **All the best** – die besten Tagesspiele aller Zeiten
  - jeweils auf diesem Gerät und weltweit
- Online: neue Server-Funktion `kw_top_daily` – **`supabase/schema.sql` einmal erneut im SQL Editor ausführen** (Daten bleiben erhalten)
## v1.12.0 (Build 20) – 11.11.2026
- **Neuer Startbildschirm** im KIPPWERK-Stil statt Regel-Text über dem Spielfeld:
  - animiertes Logo aus vier kippenden Steinen, Schriftzug KIPP**WERK**, schwebende Steine im Hintergrund (passt sich dem gewählten Design an)
  - drei große **Modus-Karten** mit eigener Farbe: Tagesrätsel (Nummer, Status bzw. Punkte + Countdown, offene Serie), Level (aktuelles Level, Welt, Sterne, Fortschrittsbalken), Endlos (Rekord für die gewählte Größe, Feldgröße direkt in der Karte)
  - oben Serien-Flamme mit Zahl sowie 🏆 / ⚙ / ? als Symbole
  - Pause: große **„Weiterspielen“-Karte** mit Modus und Stand
  - Spielregeln wandern komplett in die Hilfe („So wird gespielt“)
## v1.11.2 (Build 19) – 10.11.2026
- **Zurück-Taste (Android):** im Spiel → Pause-Menü; im Pause-Menü → weiterspielen; in Menüs/Fenstern → einen Schritt zurück (Level-Intro → Karte → Menü); im Hauptmenü zweimal drücken zum Beenden
- Spiel pausiert automatisch, wenn die App in den Hintergrund geht (nicht während Werbung); Esc am PC pausiert ebenfalls
- **Verlauf** in festem Raster: immer 2 Zeilen à 20 Kästchen über die volle Breite, leere Plätze angedeutet
- Fix: Das Spielfeld rutschte nach oben, sobald eine neue Verlaufszeile dazukam oder der Tipp-Text verschwand – Info-Leiste hat jetzt eine feste Höhe

## v1.11.1 (Build 18) – 10.11.2026
- Fix: Die Flamme in der Kopfzeile war im Startmenü verdeckt – neuer Menüpunkt **„🔥 Serie“** (mit aktueller Zahl), auch der Serien-Hinweis unter dem Tagesrätsel öffnet die Serien-Seite
- Store: **Produktvideo** (29,6 s, Hochformat) in `docs/store/` – 1080×1920 (YouTube/Google Play, Social Media) und 886×1920 (App-Store-Vorschau)
- Werkzeug zum Neu-Rendern des Videos in `tools/video/`

## v1.11.0 (Build 17) – 10.11.2026
- Neu: **🔥 Serie** – jeder Tag mit gewertetem Tagesrätsel verlängert die Serie
  - **Flamme in der Kopfzeile**: farbig = heute gesichert, grau/pulsierend = heute noch offen; Tippen öffnet die Serien-Seite
  - Serien-Seite mit Wochenleiste, längster Serie, nächstem Meilenstein
  - **Serienschutz 🛡**: rettet verpasste Tage automatisch; gratis alle 7 Serientage, zusätzlich 1× täglich per freiwilligem Video, max. 2 auf Vorrat
  - **Meilensteine** bei 3/7/14/30/50/100 Tagen mit Abzeichen und **6 neuen Designs** (Neon, Pastell, Ozean, Lava, Gold, Kosmos) – rein optisch; Farbschwäche-Schema hat Vorrang
  - Feier-Animation beim Verlängern, Serie im Menü und im **geteilten Ergebnis** („🔥 8 Tage in Folge“)
  - **Erinnerung** (nur App): lokale Benachrichtigung um 19 Uhr, wenn die Serie noch offen ist; Berechtigung wird nach dem ersten Serientag erfragt, abschaltbar in ⚙
  - bestehende Serien werden aus den bisher gespielten Tagesrätseln übernommen
- Einstellungen: Design-Auswahl und Erinnerung
- Hilfe: neuer Abschnitt „Serie“; Datenschutz: Hinweis zur lokalen Erinnerung
- Android: exakte Wecker-Berechtigung bewusst entfernt (Play-Richtlinie), eigenes Benachrichtigungs-Symbol
- Kopfzeile auf schmalen Handys kompakter

## v1.10.0 (Build 16) – 10.11.2026
- Neu: **Weltweite Online-Bestenliste** (Supabase) – in der Bestenliste umschalten zwischen „📱 Dieses Gerät“ und „🌍 Weltweit“
  - Tagesrätsel: Rangliste des heutigen Rätsels, nur das erste (gewertete) Ergebnis zählt
  - Endlos: Top 10 je Feldgröße (5×5 bis 8×8), pro Spieler nur der Bestwert
  - eigene Platzierung wird auch außerhalb der Top 10 angezeigt
  - **freiwillig**: erst nach „Mitmachen“ werden Daten übertragen; abschaltbar und Einträge löschbar in ⚙
  - beim Mitmachen werden vorhandene Bestwerte einmal hochgeladen; ohne Netz werden Ergebnisse gemerkt und später gesendet
  - Namensänderung gilt auch online
- Datenschutzerklärung um die Online-Bestenliste ergänzt

## v1.9.3 (Build 15) – 10.11.2026
- **Info-Leiste jetzt auch am PC** (und Tablet quer): als Seitenleiste rechts neben dem Spielfeld – Combo, Abgeräumt, Level-Fortschritt, Verlauf mit Legende bzw. Level-Ziele und Tages-Raster
- enthält den Scroll-Fix aus v1.9.2

## v1.9.2 (Build 14) – 10.11.2026 (nicht separat ausgeliefert)
- Fix: Einstellungen wurden auf niedrigen Bildschirmen (Computer, kleine Handys) gestaucht und abgeschnitten statt scrollbar – alle Menüs scrollen jetzt mit Mausrad, Touchpad und Wischen

## v1.9.1 (Build 13) – 10.11.2026
- Level-Modus bleibt bei 100 Leveln; nach Level 100 Hinweis, dass neue Welten per Update folgen (Sieg-Bildschirm und Level-Karte)
- Hilfe: Endlos-Modus als „ohne Ende“ beschrieben, Hinweis auf kommende Welten
- README: Ablauf für neue Welten per Update dokumentiert

## v1.9.0 (Build 12) – 10.11.2026
- Neu: **Feldgrößen im Endlos-Modus** – 5×5 Kompakt, 6×6 Standard, 7×7 Groß, 8×8 Riesig (Auswahl im Menü und in ⚙)
  - per Simulation abgestimmt: größere Felder starten mit 5 Farben und mehr neuen Steinen pro Zug, Level-Schwelle wächst mit der Feldfläche
  - 6×6 spielt sich exakt wie bisher; Level-Modus und Tagesrätsel bleiben 6×6
- **Bestenliste und Rekord je Feldgröße** (Top 10 pro Größe); bisherige Einträge werden automatisch als 6×6 übernommen
- Neu: **Hilfe** (❓ im Menü, in ⚙ und unter der Kurzanleitung): Spielprinzip, alle Steinfarben mit Symbolen, Prisma und Felsen, Combo-Stufen, **Bedeutung der Farben im Verlauf/Raster**, Spielmodi, Rettung, Tipps, Neuigkeiten
  - öffnet sich beim ersten Start einmal automatisch
  - Legende direkt unter dem Verlauf; Tippen auf den Verlauf öffnet die Erklärung
- **Spielername in der Tagesrätsel-Bestenliste** (bisher nur Rätsel-Nummer); beim ersten gewerteten Tagesrätsel ohne Namen wird nach dem Namen gefragt
- **Einmalige Spieler-ID** je Installation (zufällige 128-Bit-ID, z. B. `KW-1A2B-3C4D`), sichtbar und kopierbar in ⚙; Kurzkennung `#1A2B` hinter dem Namen unterscheidet gleiche Namen
- Spielername jetzt auch in ⚙ änderbar (ändert alle eigenen Einträge)

## v1.8.0 (Build 11) – 10.11.2026
- **Ganze Bildschirmhöhe genutzt** (hohe Handys und Tablets im Hochformat):
  - Kopfzeile und Anzeigen oben, Spielfeld mittig und etwas breiter, Anzeigen wachsen mit der Bildschirmhöhe
  - Neue **Info-Leiste** unten, je nach Modus:
    - Endlos: beste Combo, abgeräumte Steine, Steine bis zum nächsten Level, Verlauf der letzten Züge
    - Level: Ziele mit Fortschrittsbalken, beste Combo, aktuelles Sterne-Ziel
    - Tagesrätsel: beste Combo, abgeräumte Steine, übrige Züge und dein Ergebnis-Raster live
- Desktop und Querformat unverändert kompakt; Footer passt auch auf schmale Handys in eine Zeile

## v1.7.0 (Build 10) – 10.11.2026
- Neu: **Combo-Stufen** beim Nachrutschen, jede Stufe lauter und größer:
  - ×2 **GOOD!** (grün) · ×3 **SUPER!** (blau) · ×4 **MEGA!** (gold, Lichtblitz) · ×5 und mehr **MONSTER!** (Regenbogen, Lichtblitz, Beben)
  - eigene Fanfare je Stufe, stärkere Vibration ab MEGA
- Anleitung im Menü um die Combo-Stufen ergänzt

## v1.6.1 (Build 9) – 10.11.2026
- Datenschutzerklärung: Verantwortlicher vollständig (Name, Anschrift, E-Mail), Stand aktualisiert
- Neu: **Impressum** (§ 5 DDG, Kleinunternehmer § 19 UStG) – verlinkt im Footer, in den Einstellungen und in der Datenschutzerklärung
- Offline-Cache um das Impressum ergänzt
- Doku: Kontakt-E-Mail, Impressum-URL, Status DSGVO-Mitteilung

## v1.6.0 (Build 8) – 10.11.2026
- **AdMob Android: eigene IDs** eingetragen (App-ID, Anzeigenblöcke „Rettung“ und „Zwischen Runden“)
- Testmodus bleibt bewusst **aktiv** (Testanzeigen) für den geschlossenen Test – Umschalten auf echte Anzeigen erst zum öffentlichen Start (`ADS_CONFIG.testing:false`)
- iOS weiterhin mit Google-Test-IDs (iOS-App in AdMob folgt)
- Doku: AdMob-Status und Fahrplan bis zum Start in `docs/play-store.md`

## v1.5.0 (Build 7) – 30.10.2026
- **100 Level** statt 30, aufgeteilt in **10 Welten** (Erste Schritte, Felsenfeld, Farbrausch, Kettenwerk, Steinbruch, Prismental, Sturmzone, Tiefenwerk, Meisterklasse, Finale)
- **Gleichmäßig steigende Schwierigkeit** – per Bot-Simulation neu kalibriert:
  Welt 1 ≈ 93 % Erfolgsquote → Welt 10 ≈ 34 % (vorher sprunghaft zwischen 54 % und 100 %)
- Jedes 10. Level ist ein **👑 Boss-Level** (deutlich schwerer), danach folgt ein leichteres Level zum Durchatmen
- Spätere Welten: mehr Farben, 3 neue Steine pro Zug, mehr Felsen, bis zu 3 Ziele gleichzeitig
- Level-Karte mit Welt-Überschriften und Sternen je Welt, springt automatisch zum aktuellen Level
- Generator und Kalibrierung: `tools/gen.py`, Prüfung: `tools/check.py`

## v1.4.0 (Build 6) – 30.10.2026
- Neu: **Level-Modus** mit 30 Leveln (ab v1.5.0: 100)
  - Ziele: Punkte, Farben abräumen, Steine abräumen, Ketten auslösen, **Felsen** zerbrechen (neues Hindernis)
  - 1–3 Sterne je nach übrigen Zügen, Level schalten sich nacheinander frei, Level-Karte mit Sternsumme
  - Ziel-Anzeige im Spielfeld, Tipps beim ersten Felsen-/Ketten-Level
  - Rettung per Video im Level: **+5 Züge** (Züge aufgebraucht) bzw. 6 Steine weg (Feld voll)
  - Schwierigkeit per Bot-Simulation kalibriert (`tools/`)
- Neu: **Einstellungen** (⚙): Ton, Vibration, Tempo (Normal/Schnell), Farbschema für Farbschwäche, Symbole an/aus, Steuerkreuz Auto/An/Aus, Bestenliste bzw. Level-Fortschritt löschen, Datenschutz-Einstellungen
- Vibration (Haptik) beim Abräumen, bei Ketten, Sieg und Niederlage
- Kopfzeile: 🏆 ⚙ ☰ (Ton-Schalter in die Einstellungen verschoben), besser auf schmalen Handys
- Vollbild-Werbung zählt jetzt Endlos- und Level-Runden

## v1.3.0 (Build 5) – 30.10.2026
- Neu: **Werbung über Google AdMob** (nur Android/iOS-App, Web bleibt werbefrei)
  - **Rettung per Video:** Feld voll im Endlos-Modus → freiwilliges Video, 6 Steine verschwinden, weiterspielen (1× pro Runde)
  - **Vollbild-Anzeige** nach jeder 3. Endlos-Runde (nicht nach einer Rettung, nie im Tagesrätsel)
  - **EU-Einwilligungsdialog** (Google UMP) beim ersten Start, **Datenschutz-Einstellungen** im Menü
  - iOS: Tracking-Abfrage (ATT)
- Vorerst mit **Google-Test-IDs** – echte IDs siehe `docs/play-store.md`, Abschnitt 4b
- Datenschutzerklärung um AdMob ergänzt

## v1.2.0 (Build 4) – 30.10.2026
- Neu: **Bestenliste** (🏆 oben rechts und im Game-Over-Bildschirm)
  - Endlos: Top 10 mit Name, Level und Datum; Namenseingabe bei Platzierung, Name wird gemerkt
  - Tagesrätsel: alle gewerteten Ergebnisse plus Statistik (Gespielt, Serie 🔥, Bester, Schnitt)
- Bisheriger Rekord wird automatisch in die Bestenliste übernommen
- Öffnen der Bestenliste pausiert ein laufendes Spiel

## v1.1.1 (Build 3) – 30.10.2026
- Play-Store-Vorbereitung: Release-Signatur über GitHub-Secrets, AAB-Build
- Datenschutzerklärung (`datenschutz.html`), im Spiel verlinkt
- Schrift lokal eingebunden – keine Verbindungen zu Drittanbietern mehr
- Store-Texte, Feature-Grafik und Screenshots unter `docs/`

## v1.1.0 (Build 2) – 30.10.2026
- Neu: **Tagesrätsel** – jeden Tag dieselbe Steinfolge für alle Spieler, 40 Züge
- Ergebnis teilen als Emoji-Verlauf (Wordle-Stil), natives Teilen in der App
- Erstes Tagesergebnis wird gewertet, weitere Runden zählen als Übung
- Countdown bis zum nächsten Rätsel
- Menü mit Modusauswahl (Tagesrätsel / Endlos), Pause über „?“
- Installierbar als Web-App (PWA, offline spielbar)
- Android- und iOS-App (Capacitor), nur Hochformat
- Balancing: ab Level 4 drei, ab Level 10 vier neue Steine pro Zug

## v1.0.0 (Build 1)
- Erste Version: Endlos-Modus, Kipp-Mechanik, Ketten-Combos, Prisma-Joker, Level, Rekord
