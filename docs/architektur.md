# KIPPWERK – Aufbau des Quellcodes (ab v1.28.0)

Bearbeitet wird **nur `src/`**. `www/index.html` wird daraus gebaut (eine Datei – offline, schnell, wie die App sie lädt).

```bash
npm run build          # src/ → www/index.html
npm run build:check    # prüft, ob www/index.html zu src/ passt (läuft auch in der CI)
npm run sync           # bauen + Capacitor-Sync
```
Die CI („Apps bauen“) bricht ab, wenn `www/index.html` nicht zu `src/` passt – also nach Änderungen in `src/` immer `npm run build` und beides committen.

## Bausteine
| Datei | Inhalt |
|---|---|
| `src/index.html` | HTML-Gerüst: Kopf, Spielfeld, alle Overlays (Menü, Einstellungen, Hilfe, Serie, Bestenliste, Etappen …). Marker `<!-- @include … -->` |
| `src/build.json` | Reihenfolge der Module (die Reihenfolge ist wichtig!) |
| `tools/build.mjs` | Baut die Datei, ohne Abhängigkeiten (nur Node) |

### Gestaltung (`src/css/`)
| Datei | Inhalt |
|---|---|
| `base.css` | Schriften, Grundlayout, Kopfzeile, HUD, Spielfeld, Steine, Erscheinen/Platzen, Punkte-Text |
| `combos-board.css` | Combo-Banner und -Effekte (Blitz, Beben, Partikel), Tutorial-Hinweis, Overlays, Knöpfe, Tabs, Bestenliste, Einstellungen, Etappen |
| `themes.css` | Designs (Neon, Pastell, Ozean, Lava, Gold, Kosmos) |
| `streak.css` · `sizes.css` · `help.css` | Serien-Seite · Feldgrößen · Hilfe |
| `menu.css` | Hauptmenü (Logo-Steine als Knöpfe, Top 5, Neigung) |
| `small-screens.css` | Anpassungen für kleine Displays |
| `kippi.css` | Kippi (Fliege), Sprechblase, Avatar im Tutorial |
| `profile.css` | Profil, Profil anpassen, Login-Bonus (nur Design-Variablen) |
| `infobar.css` · `wide-screens.css` | Info-Leiste (Combos, Verlauf) · PC/Tablet quer |

### Logik (`src/js/`)
`i18n-en.js` – englisches Wörterbuch, Muster, englische Hilfe und Neuigkeiten.

`app/` – wird zu **einem** Programmblock zusammengesetzt (gemeinsame Variablen); Reihenfolge = Nummer:
| Modul | Aufgabe |
|---|---|
| `00-core` | Grundwerte: Feldgröße, Farben, Etappen-Daten, Welten, Spielzustand |
| `01-ads` | AdMob (Einwilligung, Belohnungsvideo, Zwischenwerbung) |
| `02-rng` | Zufall mit Startwert (Tagesspiel für alle gleich) |
| `03-settings` · `05-settings-apply` | Einstellungen laden/migrieren · speichern/anwenden |
| `04-i18n` | Sprache: Erkennung, Übersetzen der Oberfläche, Datumsformate |
| `06-haptics` | Vibration (eigenes Android-Plugin `KwVibe`, iOS Taptic, Diagnose) |
| `07-level-progress` · `08-scores` | Etappen-Fortschritt · lokale Bestenliste |
| `09-anticheat` | Prüfprotokoll der Punkte, Signatur wartender Ergebnisse |
| `10-play-games` | Google Play Games / Game Center (Anmeldung, Ranglisten, Senden) |
| `11-streak` | Serie, Serienschutz, Meilensteine |
| `12-back-pause` | Zurück-Taste, Pause, App im Hintergrund |
| `13-reminder` | Erinnerungen (Kippis Texte) |
| `14-audio` · `15-music` | Soundeffekte · Musik (Menü/Spiel mit 5 Stufen/Boss) |
| `16-rules` | Spielregeln: Kippen, Gruppen finden, Nachrücken |
| `17-render` | Spielfeld und Anzeigen zeichnen, Partikel, Combo-Effekte |
| `18-level-goals` | Etappen-Ziele und Sterne |
| `19-flow` | Spielablauf: Zug, Auflösen, Punkte, Spielende, Rettung |
| `20-level-screens` | Etappen-Karte, Start-/Ergebnis-Bildschirme |
| `21-input` | Wischen, Tasten, Steuerkreuz |
| `22-help-settings-ui` | Hilfe, Einstellungen, Bestenliste, Teilen, Hauptmenü |
| `23-top5` · `24-rewards` | Top 5 im Menü · Belohnungen für Tages-/Wochenplätze |
| `24a-login` | Rahmen, Titel, Profil-Bestwerte (`kippwerk_pstats`), täglicher Login-Bonus (`kippwerk_login`) |
| `24e-profile` | Profil-Fenster, Profil anpassen, Avatar im Menü |
| `24f-appupdate` | Hinweis auf neue App-Version (Play In-App-Update, App-Store-Link) |
| `25-cloud-save` | Spielstand in der Cloud |
| `26-tutorial` | Geführtes Tutorial mit Kippi |
| `27-menu-tilt` | Menü-Steine folgen der Handy-Neigung |
| `28-kippi` | Kippi: Besuche, Landeplätze, Reaktionen |
| `29-boot` | Start: Sprache, Testschnittstelle `window.__kw` |

### Nativ
- `android/app/src/main/java/de/daviddigital/kippwerk/MainActivity.java` – Vollbild, registriert `KwVibePlugin`
- `KwVibePlugin.java` – Vibration als Spiel-/Medien-Vibration + Geräte-Info für die Diagnose
- `patches/` – Anpassungen am Play-Games-Plugin (Top 5, Cloud-Spielstand)

## Nächste Schritte (nach dem geschlossenen Test)
- Module schrittweise entflechten (z. B. `22-help-settings-ui` aufteilen, Spiellogik `16-rules`/`19-flow` ohne Zugriff auf die Oberfläche → testbar und für eine echte Prüfung des Tagesspiels nutzbar)
- Später optional echte ES-Module + Bundler, wenn die Abhängigkeiten sauber getrennt sind
