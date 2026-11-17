# KIPPWERK

Kipp-Puzzle von david.digital: Kippe das Feld, alle Steine rutschen mit. Drei oder mehr gleiche Farben, die sich berühren, verschwinden – Nachrutschen erzeugt Ketten-Combos.

**Web-Version:** https://benlukan.github.io/kippwerk/

## Modi
- **Etappen** – 100 Etappen in 10 Welten („Etappe 2-3“ = Welt 2, dritte Etappe) mit Zielen (Punkte, Farben, Ketten, Felsen), steigender Schwierigkeit, Boss-Etappen und 1–3 Sternen
- **🔥 Serie** – jeden Tag das Tagesspiel spielen: Flamme in der Kopfzeile, Serienschutz, Meilensteine mit 6 Designs, Erinnerung am Abend (App)
- **Tagesspiel** – jeden Tag dieselben Steine für alle, 40 Züge, Ergebnis als Emoji-Raster teilen; Bestenliste Heute / Woche / All the best
- **Endlos** – so lange, bis das Feld voll ist; Feldgröße 5×5 bis 8×8, Bestenliste je Größe (mit bester Combo, Zügen, abgeräumten Steinen); Level steigern Farben, Joker und Tempo; auf 7×7/8×8 ab Level 30 Felsen, ab Level 40 eine 6. Farbe
- **Tutorial** – geführte 3 Schritte beim ersten Start, erneut über Hilfe
- **Sprachen** – Deutsch und Englisch (Systemsprache, umschaltbar in ⚙)
- **🌍 Weltweite Ranglisten** (App, freiwillig) – Google Play Games (Android) und Game Center (iOS) für Endlos je Feldgröße und Tagesspiel: Einrichtung in [docs/game-services.md](docs/game-services.md)

## Projektstruktur
| Pfad | Inhalt |
|---|---|
| `www/` | Das komplette Spiel (eine HTML-Datei) + PWA-Manifest und Service Worker |
| `android/`, `ios/` | Native Capacitor-Projekte |
| `assets/` | Quellbilder für App-Icon und Splash (`npm run icons`) |
| `tools/` | Level-Simulator, Generator und Kalibrierung (`cd tools && python3 gen.py 100`, prüfen: `python3 check.py levels.json 80`) |
| `.github/workflows/` | Automatische Builds: APK, iOS-IPA, GitHub Pages |

## Builds
Jeder Push auf `main` baut Android automatisch und legt ein GitHub-Release an – **Download (auch am Handy): https://github.com/Benlukan/kippwerk/releases/latest** (zusätzlich unter Actions → Artifacts).
iOS wird nur auf Wunsch gebaut (Actions → „Apps bauen“ → *Run workflow* → Haken „iOS“) oder bei einem Tag `v*`, weil macOS-Runner oft lange warten.

- `KIPPWERK.apk` – direkt auf Android installierbar (Installation aus unbekannten Quellen erlauben)
- `KIPPWERK-unsigned.ipa` – unsigniert; per Sideloadly/AltStore mit eigener Apple-ID installierbar
- `KIPPWERK-playstore.aab` – nur wenn Release-Secrets gesetzt sind

### Werbung (AdMob)
Nur in der Android-/iOS-App: Rettung per Video + Vollbild-Anzeige jede 3. Endlos-Runde. Android: **eigene AdMob-IDs** eingetragen, Testmodus noch aktiv bis zum öffentlichen Start · iOS: noch Test-IDs – Details: [docs/play-store.md](docs/play-store.md#4b-admob-einrichten-vor-veröffentlichung). Einstellungen in `www/index.html` → `ADS_CONFIG`.

### Play Store
Alles zur Veröffentlichung (Signatur-Secrets, Store-Texte, Formulare, Grafiken): [docs/play-store.md](docs/play-store.md)

### Lokal entwickeln
```bash
npm install
npx cap sync
npx cap open android   # Android Studio
npx cap open ios       # Xcode (macOS)
```

## Neue Welten per Update
Festgelegt: Der Level-Modus bleibt vorerst bei **100 Leveln (10 Welten)**, neue Welten kommen per Update. Der Endlos-Modus hat keine Obergrenze.

So entsteht eine neue Welt (10 Level, Level 10 = Boss):
1. In `tools/gen.py` die Level-Spanne erweitern (z. B. `range(1,111)`) und die Zielkurve `target()` fortsetzen.
2. `cd tools && python3 gen.py 100` erzeugen, dann **nur die neuen Level (101+)** übernehmen – Level 1–100 im Spiel nie ersetzen (dort stecken handgemachte Level 1–30 und nachjustierte Boss-Level 40/60/100).
3. Mit `python3 check.py` die neuen Level prüfen (Erfolgsquote fällt weiter leicht, Boss deutlich darunter), dann an `LEVELS` in `www/index.html` anhängen und Namen in `WORLDS` ergänzen.
4. Fortschritt der Spieler bleibt erhalten (gespeichert je Levelnummer); bisherige „Alles geschafft“-Spieler sehen die neue Welt sofort freigeschaltet.
5. Version + Build hochzählen, Changelog, Store-Text („110 Level in 11 Welten“).

## Lizenzen
Schrift *Space Grotesk* unter SIL Open Font License (`www/fonts/OFL-LICENSE.txt`).

## Version
Aktuell **v1.25.2 · Build 43** – siehe [CHANGELOG.md](CHANGELOG.md). Bei jeder Auslieferung Version + Build hochzählen in: `www/index.html` (Footer), `package.json`, `android/app/build.gradle`, `ios/App/App.xcodeproj/project.pbxproj`, `www/sw.js` (Cache-Name).
