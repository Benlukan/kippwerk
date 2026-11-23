# KIPPWERK – Google Play Veröffentlichung

## 1. Signatur einrichten (einmalig)
1. Die vier Secrets aus `KIPPWERK-Signatur-Secrets.txt` im Repo anlegen:
   GitHub → Settings → Secrets and variables → Actions → *New repository secret*
2. Actions → „Apps bauen“ → *Run workflow*.
3. Unter *Artifacts* → `KIPPWERK-android` liegt jetzt zusätzlich **`KIPPWERK-playstore.aab`**. Diese Datei wird in die Play Console hochgeladen.
4. Einfacher (auch am Handy): Jeder Push auf `main` legt eine **GitHub-Release** an – https://github.com/Benlukan/kippwerk/releases/latest – mit `KIPPWERK.apk`, `KIPPWERK-release.apk` und `KIPPWERK-playstore.aab` zum direkten Herunterladen.

> `kippwerk-upload.jks` ist der **Upload-Schlüssel**. Google verwaltet den eigentlichen App-Signaturschlüssel (Play App Signing, Standard). Geht der Upload-Schlüssel verloren, kann er über den Play-Support zurückgesetzt werden – trotzdem sicher aufbewahren.

## 2. Play Console
- Entwicklerkonto: play.google.com/console (einmalig 25 USD, Identitätsprüfung)
- **Neues privates Konto (nach 13.11.2023 erstellt):** Vor der Veröffentlichung ist ein **geschlossener Test mit mindestens 12 Testern über 14 Tage am Stück** Pflicht. Erst danach kann der Produktionszugang beantragt werden. → Freunde/Familie früh einladen, lieber 15–20 Tester, weil einige abspringen.
- Interner Test (bis 100 Tester, ohne Prüfung) eignet sich zum schnellen Ausprobieren, zählt aber nicht für die 14 Tage.

## 3. Store-Eintrag (Deutsch)

**App-Name (max. 30):**
`KIPPWERK – Kipp-Puzzle`

**Kurzbeschreibung (max. 80):**
`Kippe das Feld, verbinde Farben, löse Ketten aus – mit Tagesspiel und Kippi!`

**Vollständige Beschreibung (Stand v2.1.1):**
```
KIPPWERK ist ein Puzzle, das du in zehn Sekunden verstehst – und das dich nicht mehr loslässt.

KIPPEN STATT FALLEN
Wische in eine Richtung und das ganze Spielfeld kippt: Alle Steine rutschen mit. Berühren sich drei oder mehr gleiche Farben, verschwinden sie. Was nachrutscht, kann die nächste Gruppe auslösen – GOOD ×2, SUPER ×3, MEGA ×4, MONSTER ×5, ULTRA ×6!

JEDE BEWEGUNG ZÄHLT
Neue Steine kommen immer von der Gegenseite. Wer nur nach Gefühl wischt, hat das Feld schnell voll. Wer vorausdenkt, baut riesige Ketten.

100 ETAPPEN IN 10 WELTEN
Folge dem Pfad über die Etappen-Karte – Kippi sitzt immer auf deinem aktuellen Level. Knacke Etappen mit klaren Zielen, von entspannt bis knallhart: Punkte sammeln, Farben abräumen, Ketten auslösen, Felsen sprengen. Bis zu drei Sterne pro Etappe, ein Boss am Ende jeder Welt – und oben wartet das Tor zur nächsten.

TAGESSPIEL & SERIEN
Jeden Tag dieselben Steine für alle – 40 Züge, eine gewertete Runde. Teile dein Ergebnis als Emoji-Raster, miss dich in der weltweiten Tages- und Wochenwertung und halte deine 🔥 Serie am Leben.

ENDLOS-MODUS MIT 10 FELDERN
Spiele, bis das Feld voll ist – auf 4×4 bis 10×10 und auf Feldern mit Hindernissen. Mit jedem Level kommen neue Farben, Prisma-Joker, Felsen und mehr Tempo. Neue Felder schaltest du durch dein Können frei.

DEIN PROFIL & TÄGLICHER BONUS
Dein Profil zeigt deine Bestwerte, eine Vitrine mit deinen wertvollsten Abzeichen und deine besten Platzierungen. Hol dir jeden Tag deinen Bonus: Extraleben, Serienschutz, Rahmen, Titel und Kippi-Outfits, die es nur hier gibt. Tag verpasst? Kein Problem – der Fortschritt pausiert nur.

SAMMELN & ANPASSEN
17 Designs, 12 Kippi-Outfits, dazu Rahmen, Titel und 24 Abzeichen. Alles rein optisch, freigeschaltet durch Welten, Serien, Abzeichen und den täglichen Bonus – kein Pay-to-win.

MIT KIPPI 🪰
Kippi, die kleine KIPPWERK-Fliege, begleitet dich: Sie zeigt dir am Anfang, wie alles geht, schaut beim Spielen vorbei und feiert deine Combos.

• Weltweite Ranglisten, Erfolge und Cloud-Spielstand über Google Play Games (freiwillig)
• Hinweis, wenn dich jemand in der Rangliste überholt
• Faire Werbung: freiwillige Videos für eine Rettung, nie mitten im Spiel
• Kein Konto nötig, offline spielbar
• Geführtes Tutorial, Musik, die mit dem Level schneller wird, satte Combo-Effekte
• Farbschema und Symbole für Spieler mit Farbsehschwäche
• Deutsch und Englisch
• Klein, schnell, akkuschonend

Gemacht von david.digital · Impressum: https://benlukan.github.io/kippwerk/impressum.html
```

**Kategorie:** Spiele → Puzzle
**Tags:** Puzzle, Logik, Gelegenheitsspiel, Einzelspieler, Offline
**Kontakt-E-Mail:** david.digital@web.de
**Website (für app-ads.txt):** https://benlukan.github.io
**Datenschutzerklärung:** `https://benlukan.github.io/kippwerk/datenschutz.html`
**Impressum:** `https://benlukan.github.io/kippwerk/impressum.html`

> Der Impressum-Link gehört zusätzlich in die **Beschreibung** (letzte Zeile, siehe unten) – im Play Store gibt es kein eigenes Impressum-Feld.

## 3b. Store-Eintrag (Englisch, ab v1.23.0)
Play Console → Haupteintrag → *Übersetzungen verwalten* → **Englisch (USA) – en-US** hinzufügen.

**App name:** `KIPPWERK – Tilt Puzzle`

**Short description (max. 80):**
`Tilt the board, match colors, trigger chain reactions – daily game & Kippi!`

**Full description (as of v2.1.1):**
```
KIPPWERK is a puzzle you understand in ten seconds – and can't put down.

TILT, DON'T DROP
Swipe in any direction and the whole board tilts: every stone slides along. When three or more of the same color touch, they vanish. What slides in next can trigger the next group – GOOD ×2, SUPER ×3, MEGA ×4, MONSTER ×5, ULTRA ×6!

EVERY MOVE COUNTS
New stones always arrive from the opposite side. Swipe on instinct and the board fills up fast. Think ahead and you build huge chains.

100 STAGES IN 10 WORLDS
Follow the path across the stage map – Kippi always sits on your current level. Clear stages with clear goals, from relaxed to brutal: score points, clear colors, trigger chains, blast rocks. Up to three stars per stage, a boss at the end of every world – and the gate to the next one waits at the top.

DAILY GAME & STREAKS
The same stones for everyone, every day – 40 moves, one counted round. Share your result as an emoji grid, compete in the worldwide daily and weekly rankings and keep your 🔥 streak alive.

ENDLESS MODE WITH 10 BOARDS
Play until the board is full – on 4×4 up to 10×10 and on boards with obstacles. Every level brings new colors, prism jokers, rocks and more pace. Unlock new boards through your skill.

YOUR PROFILE & DAILY BONUS
Your profile shows your best stats, a showcase of your most valuable badges and your best placements. Collect your bonus every day: extra lives, streak shields, frames, titles and Kippi outfits you can only get here. Missed a day? No problem – your progress just pauses.

COLLECT & CUSTOMIZE
17 themes, 12 Kippi outfits, plus frames, titles and 24 badges. All purely cosmetic, unlocked through worlds, streaks, badges and the daily bonus – no pay-to-win.

WITH KIPPI 🪰
Kippi, the little KIPPWERK fly, keeps you company: shows you the ropes, drops by while you play and cheers your combos.

• Global leaderboards, achievements and cloud save via Google Play Games (optional)
• Notice when someone overtakes you on the leaderboard
• Fair ads: optional videos for a rescue, never mid-game
• No account needed, plays offline
• Guided tutorial, music that speeds up as you level, punchy combo effects
• Color scheme and symbols for color-blind players
• English and German
• Small, fast, battery-friendly

Made by david.digital · Legal notice: https://benlukan.github.io/kippwerk/legal-notice.html
```
**Privacy policy (EN):** `https://benlukan.github.io/kippwerk/privacy.html` (in der Play Console gibt es nur ein Feld – dort die deutsche URL eintragen; die Seite verlinkt die englische Fassung)

## 4. Formulare in der Play Console

| Abschnitt | Antwort |
|---|---|
| App-Zugriff | Alle Funktionen ohne Einschränkung verfügbar |
| Werbung | **Ja, enthält Werbung** (ab v1.3.0) |
| Einstufung (IARC-Fragebogen) | Puzzle, keine Gewalt/Glücksspiel/Chat → ergibt i. d. R. USK 0 / PEGI 3 |
| Zielgruppe | 13+ empfohlen (bei „unter 13“ gelten zusätzlich die Familien-Richtlinien) |
| Datensicherheit | siehe Abschnitt 4a (AdMob) und 4d (Ranglisten & Cloud-Spielstand) |
| Behörden-/Gesundheits-/Finanz-App | Nein |
| Nachrichten-App | Nein |

## 4a. Datensicherheit mit AdMob (ab v1.3.0)
Grundlage: das Google Mobile Ads SDK. Vor dem Absenden mit Googles Hilfeseite „Daten, die das Google Mobile Ads SDK erhebt“ abgleichen.

| Datentyp | Erhoben | Geteilt | Zweck |
|---|---|---|---|
| Geräte- oder andere IDs (Werbe-ID) | Ja | Ja | Werbung, Analyse, Betrugsprävention |
| Ungefährer Standort (aus IP) | Ja | Ja | Werbung, Analyse, Betrugsprävention |
| App-Interaktionen (Anzeigen-Klicks/-Aufrufe) | Ja | Ja | Werbung, Analyse |
| Absturzprotokolle / Diagnosedaten | Ja | Ja | Analyse, Betrugsprävention |

- Daten bei Übertragung verschlüsselt: **Ja**
- Nutzer können Löschung beantragen: über Google (Werbe-ID zurücksetzen)
- In der Play Console zusätzlich: **App-Inhalte → Werbe-ID → „Ja, für Werbung“** (Berechtigung `AD_ID` bringt das SDK automatisch mit)

## 4d. Weltweite Ranglisten (ab v1.15.0): Google Play Games / Game Center
Einrichtung: [game-services.md](game-services.md). KIPPWERK selbst sammelt dafür nichts; Punkte gehen über das Play-Games-SDK an Google.
- Play Console → Datensicherheit: zusätzlich **App-Aktivität → Sonstige Aktionen (Punktestände)** · Erhoben: Ja · Geteilt: Nein · Optional: Ja · Zweck: App-Funktionen
- Spielstand in der Cloud (ab v1.17.0): Speicherung im Play-Games-Konto des Nutzers über Googles „Gespeicherte Spiele“ – zusätzlich **App-Aktivität → Sonstige nutzergenerierte Inhalte (Spielstand)** · Erhoben: Ja · Geteilt: Nein · Optional: Ja · Zweck: App-Funktionen
- App Store Connect (App Privacy): **Gameplay Content** · Zweck: App Functionality · Tracking: Nein

## 4c. AdMob-Status (Stand v1.6.0, 10.11.2026)
| | Android | iOS |
|---|---|---|
| App in AdMob | ✅ angelegt (nicht veröffentlicht) | ⏳ später |
| App-ID | `ca-app-pub-8873350241195536~3572363083` | Test-ID |
| Prämie „Rettung“ | `ca-app-pub-8873350241195536/5053799865` | Test-ID |
| Interstitial „Zwischen Runden“ | `ca-app-pub-8873350241195536/2160218226` | Test-ID |
| Testmodus | aktiv (`testing:true`) | aktiv |

**Fahrplan bis echte Einnahmen**
1. ✅ DSGVO-Mitteilung in AdMob veröffentlicht (10.11.2026, Deutsch + Englisch)
2. Geschlossener Test: ≥ 12 Tester, 14 Tage am Stück
3. Öffentlicher Start → `testing:false` setzen, neue Version bauen
4. In AdMob: App-Einstellungen → Store hinzufügen → mit Play-Eintrag verknüpfen (App-Prüfung startet)
5. `app-ads.txt` im Repo `Benlukan/benlukan.github.io` ablegen:
   `google.com, pub-8873350241195536, DIRECT, f08c47fec0942fa0`
   und `https://benlukan.github.io` als Website im Play-Store-Eintrag angeben

## 4b. AdMob einrichten (vor Veröffentlichung)
1. Konto auf admob.google.com anlegen, Auszahlungs- und Steuerdaten hinterlegen.
2. Zwei Apps anlegen (Android + iOS) → je eine **App-ID** (`ca-app-pub-…~…`).
3. Pro App zwei Anzeigenblöcke: **Prämie** (Rettung) und **Interstitial** → **Anzeigenblock-IDs** (`ca-app-pub-…/…`).
4. **Datenschutz & Mitteilungen → DSGVO-Mitteilung** erstellen und veröffentlichen (sonst erscheint kein Einwilligungsdialog). Für iOS zusätzlich die **IDFA-Erklärung**.
5. IDs eintragen:
   - Android-App-ID: `android/app/src/main/res/values/strings.xml` (`admob_app_id`)
   - iOS-App-ID: `ios/App/App/Info.plist` (`GADApplicationIdentifier`)
   - Anzeigenblöcke: `www/index.html` → `ADS_CONFIG` (dort auch `testing:false` setzen)
6. **app-ads.txt:** muss im Stammverzeichnis der Website liegen, die im Store als Entwickler-Website steht. Mit GitHub Pages: Repo **`Benlukan/benlukan.github.io`** anlegen und dort eine Datei `app-ads.txt` mit der Zeile aus AdMob ablegen, z. B.
   `google.com, pub-XXXXXXXXXXXXXXXX, DIRECT, f08c47fec0942fa0`
   und `https://benlukan.github.io` als Website im Store-Eintrag angeben.
7. **Nie auf eigene Anzeigen klicken** – solange `testing:true` gesetzt ist, kommen nur Testanzeigen. Eigene Testgeräte können zusätzlich in AdMob registriert werden.

## 5. Grafiken (Stand v1.28.1, je Sprache in `docs/store/de/` und `docs/store/en/`)
| Asset | Format | Datei |
|---|---|---|
| App-Symbol | 512×512 PNG | `www/icon-512.png` |
| Feature-Grafik | 1024×500 PNG | `feature-graphic.png` |
| Screenshots Smartphone (8) | 1080×1920 PNG | ab v2.1.1: `1-menu` · `2-play` (MEGA-Combo) · `3-levels` (Etappen-Karte) · `4-profile` · `5-bonus` (täglicher Bonus) · `6-daily` · `7-world` (weltweite Rangliste) · `8-10x10` – erstellt mit `tools/video/shots3.py` + `store_shots.py` |

Play Console → Haupteintrag: deutsche Dateien im deutschen Eintrag, englische in der Übersetzung **en-US** hochladen (Reihenfolge wie die Nummern).

## 5a. Produktvideo (29,2 s, mit Musik)
| Datei | Format | Verwendung |
|---|---|---|
| `KIPPWERK_Produktvideo_1080x1920_de.mp4` / `_en.mp4` | 1080×1920, 30 fps | **Google Play**: auf YouTube hochladen (öffentlich oder „nicht gelistet“, Werbung aus) und den Link im jeweiligen Store-Eintrag unter „Video“ eintragen · Social Media / Shorts |
| `KIPPWERK_AppStore_886x1920_de.mp4` / `_en.mp4` | 886×1920, 30 fps | **App Store** – App-Vorschau (15–30 s) |

Inhalt: Kippi fliegt aufs Logo → echtes Gameplay mit Kippi und MEGA-Combo → GOOD bis ULTRA → 100 Etappen, Tagesspiel, Endlos 8×8 → Bestenliste & „Kippi – dein Wegbegleiter“ → Menü kippt mit dem Handy → „Jetzt kostenlos spielen“. Musik = die Spielmusik. Neu erstellen: `tools/video/README.md`.

## 6. Neue Version veröffentlichen
Version + Build hochzählen in `www/index.html` (Footer), `package.json`, `android/app/build.gradle` (`versionCode` muss steigen!), `ios/App/App.xcodeproj/project.pbxproj`, `www/sw.js`, dazu `CHANGELOG.md`. Pushen → die AAB liegt automatisch auf https://github.com/Benlukan/kippwerk/releases/latest (oder in den Actions-Artifacts) → in der Play Console hochladen.

## 7. Start-Checkliste (Stand v1.25.0)
- [ ] GitHub Pages aktivieren (Settings → Pages → Source: GitHub Actions) und prüfen, dass `datenschutz.html`, `impressum.html`, `privacy.html`, `legal-notice.html` erreichbar sind
- [ ] Play Console: App-Inhalte vollständig (Datenschutz-URL, Werbung „Ja“, **Werbe-ID deklarieren** – kommt über play-services-ads, Datensicherheit, Zielgruppe 13+, IARC)
- [ ] Play Games Services: Projekt-ID + 5 Ranglisten-IDs eintragen, `GAMES_CONFIG.android.on:true`, testen
- [ ] Geschlossener Test: ≥ 12 Tester, 14 Tage am Stück → Produktionszugang beantragen
- [ ] Erst zum öffentlichen Start: `ADS_CONFIG.testing:false`, echte iOS-Anzeigenblöcke, neue Version bauen, `app-ads.txt`
- [ ] iOS: Apple-Developer-Konto, Signatur, Game Center, App-Store-Datenschutzangaben

### Vorschauvideo (Google Play)
- Google Play nimmt nur einen **YouTube-Link** (Store-Präsenz → Haupteintrag im Store → Grafiken → „Video“).
- Dafür das **Querformat** hochladen – ab v2.1.1 das lange Video (101 s): `docs/store/de/KIPPWERK_Produktvideo_2.1_1920x1080_de.mp4` (EN: `docs/store/en/…_en.mp4`); das kurze 29-s-Video (`KIPPWERK_Produktvideo_1920x1080_*.mp4`) bleibt als Alternative. Hochformat unter 60 s wird bei YouTube zum Short – Shorts nimmt Google Play nicht an.
- YouTube: Sichtbarkeit **Öffentlich** oder **Nicht gelistet**, **keine Werbung/Monetarisierung**, **Einbetten erlauben**, keine Altersbeschränkung. In die Play Console nur die reine Video-URL eintragen (ohne Playlist/Zeitmarke).
- Die Vorstellungsgrafik (1024 × 500) dient als Vorschaubild des Videos.
