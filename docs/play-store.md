# KIPPWERK – Google Play Veröffentlichung

## 1. Signatur einrichten (einmalig)
1. Die vier Secrets aus `KIPPWERK-Signatur-Secrets.txt` im Repo anlegen:
   GitHub → Settings → Secrets and variables → Actions → *New repository secret*
2. Actions → „Apps bauen“ → *Run workflow*.
3. Unter *Artifacts* → `KIPPWERK-android` liegt jetzt zusätzlich **`KIPPWERK-playstore.aab`**. Diese Datei wird in die Play Console hochgeladen.

> `kippwerk-upload.jks` ist der **Upload-Schlüssel**. Google verwaltet den eigentlichen App-Signaturschlüssel (Play App Signing, Standard). Geht der Upload-Schlüssel verloren, kann er über den Play-Support zurückgesetzt werden – trotzdem sicher aufbewahren.

## 2. Play Console
- Entwicklerkonto: play.google.com/console (einmalig 25 USD, Identitätsprüfung)
- **Neues privates Konto (nach 13.11.2023 erstellt):** Vor der Veröffentlichung ist ein **geschlossener Test mit mindestens 12 Testern über 14 Tage am Stück** Pflicht. Erst danach kann der Produktionszugang beantragt werden. → Freunde/Familie früh einladen, lieber 15–20 Tester, weil einige abspringen.
- Interner Test (bis 100 Tester, ohne Prüfung) eignet sich zum schnellen Ausprobieren, zählt aber nicht für die 14 Tage.

## 3. Store-Eintrag (Deutsch)

**App-Name (max. 30):**
`KIPPWERK – Kipp-Puzzle`

**Kurzbeschreibung (max. 80):**
`Kippe das Feld, verbinde Farben, löse Ketten aus – mit täglichem Rätsel.`

**Vollständige Beschreibung:**
```
KIPPWERK ist ein Puzzle, das du in zehn Sekunden verstehst – und das dich nicht mehr loslässt.

KIPPEN STATT FALLEN
Wische in eine Richtung und das ganze Spielfeld kippt: Alle Steine rutschen mit. Berühren sich drei oder mehr gleiche Farben, verschwinden sie. Was nachrutscht, kann die nächste Gruppe auslösen – GOOD ×2, SUPER ×3, MEGA ×4, MONSTER ×5!

JEDE BEWEGUNG ZÄHLT
Neue Steine kommen immer von der Gegenseite. Wer nur nach Gefühl wischt, hat das Feld schnell voll. Wer vorausdenkt, baut riesige Ketten.

100 LEVEL IN 10 WELTEN
Knacke Level mit klaren Zielen – von entspannt bis knallhart, mit Boss-Level am Ende jeder Welt: Punkte sammeln, Farben abräumen, Ketten auslösen und Felsen sprengen. Sammle bis zu drei Sterne pro Level.

TAGESRÄTSEL
Jeden Tag dieselben Steine für alle – 40 Züge, eine gewertete Runde. Teile dein Ergebnis als Emoji-Raster und vergleiche dich mit Freunden.

ENDLOS-MODUS
Spiele auf 5×5 bis 8×8 Feldern, bis das Feld voll ist. Mit jedem Level kommen neue Farben, Prisma-Joker und mehr Tempo.

• Bestenliste mit Top 10 und Tages-Serie 🔥
• Faire Werbung: freiwillige Videos für eine Rettung, nie mitten im Spiel
• Kein Konto nötig, offline spielbar
• Farbschema und Symbole für Spieler mit Farbsehschwäche
• Klein, schnell, akkuschonend

Gemacht von david.digital.
```

**Kategorie:** Spiele → Puzzle
**Tags:** Puzzle, Logik, Gelegenheitsspiel, Einzelspieler, Offline
**Kontakt-E-Mail:** david.digital@web.de
**Website (für app-ads.txt):** https://benlukan.github.io
**Datenschutzerklärung:** `https://benlukan.github.io/kippwerk/datenschutz.html`
**Impressum:** `https://benlukan.github.io/kippwerk/impressum.html`

## 4. Formulare in der Play Console

| Abschnitt | Antwort |
|---|---|
| App-Zugriff | Alle Funktionen ohne Einschränkung verfügbar |
| Werbung | **Ja, enthält Werbung** (ab v1.3.0) |
| Einstufung (IARC-Fragebogen) | Puzzle, keine Gewalt/Glücksspiel/Chat → ergibt i. d. R. USK 0 / PEGI 3 |
| Zielgruppe | 13+ empfohlen (bei „unter 13“ gelten zusätzlich die Familien-Richtlinien) |
| Datensicherheit | siehe Abschnitt 4a (AdMob) und 4d (Online-Bestenliste) |
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

## 4d. Datensicherheit mit Online-Bestenliste (ab v1.10.0)
Zusätzlich zu 4a angeben, sobald `ONLINE_CONFIG` in `www/index.html` gesetzt ist (Details: [supabase.md](supabase.md)):

| Datentyp | Erhoben | Geteilt | Optional | Zweck |
|---|---|---|---|---|
| Persönliche Infos → Name (Spielername) | Ja | Nein | Ja (Opt-in) | App-Funktionen |
| Geräte- oder andere IDs (zufällige Spieler-ID) | Ja | Nein | Ja (Opt-in) | App-Funktionen |
| App-Aktivität → Sonstige nutzergenerierte Inhalte / In-App-Aktionen (Punkte) | Ja | Nein | Ja (Opt-in) | App-Funktionen |

- „Geteilt“ = Nein, weil Supabase als Auftragsverarbeiter arbeitet
- Verschlüsselt übertragen: **Ja** (HTTPS) · Löschung: **Ja**, in der App (⚙ → Online-Einträge löschen) oder per E-Mail
- App Store Connect (App Privacy): **Name**, **User ID**, **Gameplay Content** · Zweck: App Functionality · Tracking: Nein

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

## 5. Grafiken
| Asset | Format | Quelle |
|---|---|---|
| App-Symbol | 512×512 PNG | `www/icon-512.png` |
| Feature-Grafik | 1024×500 PNG | `docs/store/feature-graphic.png` |
| Screenshots Smartphone | 1080×1920 | `docs/store/screenshot-*.png` (3 Stück) |

## 6. Neue Version veröffentlichen
Version + Build hochzählen in `www/index.html` (Footer), `package.json`, `android/app/build.gradle` (`versionCode` muss steigen!), `ios/App/App.xcodeproj/project.pbxproj`, `www/sw.js`, dazu `CHANGELOG.md`. Pushen → AAB aus den Actions-Artifacts hochladen.
