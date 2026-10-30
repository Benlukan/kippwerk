# Changelog

## v1.4.0 (Build 6) – 30.10.2026
- Neu: **Level-Modus** mit 30 Leveln
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
