# KIPPWERK

Kipp-Puzzle von david.digital: Kippe das Feld, alle Steine rutschen mit. Drei oder mehr gleiche Farben, die sich berühren, verschwinden – Nachrutschen erzeugt Ketten-Combos.

**Web-Version:** https://benlukan.github.io/kippwerk/

## Modi
- **Level** – 100 Level in 10 Welten mit Zielen (Punkte, Farben, Ketten, Felsen), steigender Schwierigkeit, Boss-Leveln und 1–3 Sternen
- **Tagesrätsel** – jeden Tag dieselben Steine für alle, 40 Züge, Ergebnis als Emoji-Raster teilen
- **Endlos** – so lange, bis das Feld voll ist; Level steigern Farben, Joker und Tempo

## Projektstruktur
| Pfad | Inhalt |
|---|---|
| `www/` | Das komplette Spiel (eine HTML-Datei) + PWA-Manifest und Service Worker |
| `android/`, `ios/` | Native Capacitor-Projekte |
| `assets/` | Quellbilder für App-Icon und Splash (`npm run icons`) |
| `tools/` | Level-Simulator, Generator und Kalibrierung (`cd tools && python3 gen.py 100`, prüfen: `python3 check.py levels.json 80`) |
| `.github/workflows/` | Automatische Builds: APK, iOS-IPA, GitHub Pages |

## Builds
Jeder Push auf `main` baut automatisch – Ergebnisse unter **Actions → letzter Lauf → Artifacts**.
Ein Tag `v*` (z. B. `v1.1.0`) erstellt zusätzlich ein GitHub-Release mit den Dateien.

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

## Lizenzen
Schrift *Space Grotesk* unter SIL Open Font License (`www/fonts/OFL-LICENSE.txt`).

## Version
Aktuell **v1.6.0 · Build 8** – siehe [CHANGELOG.md](CHANGELOG.md). Bei jeder Auslieferung Version + Build hochzählen in: `www/index.html` (Footer), `package.json`, `android/app/build.gradle`, `ios/App/App.xcodeproj/project.pbxproj`, `www/sw.js` (Cache-Name).
