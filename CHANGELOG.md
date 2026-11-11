# Changelog

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
