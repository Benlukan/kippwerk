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
Wische in eine Richtung und das ganze Spielfeld kippt: Alle Steine rutschen mit. Berühren sich drei oder mehr gleiche Farben, verschwinden sie. Was nachrutscht, kann die nächste Gruppe auslösen – Kette ×2, ×3, MEGA!

JEDE BEWEGUNG ZÄHLT
Neue Steine kommen immer von der Gegenseite. Wer nur nach Gefühl wischt, hat das Feld schnell voll. Wer vorausdenkt, baut riesige Ketten.

TAGESRÄTSEL
Jeden Tag dieselben Steine für alle – 40 Züge, eine gewertete Runde. Teile dein Ergebnis als Emoji-Raster und vergleiche dich mit Freunden.

ENDLOS-MODUS
Spiele, bis das Feld voll ist. Mit jedem Level kommen neue Farben, Prisma-Joker und mehr Tempo.

• Bestenliste mit Top 10 und Tages-Serie 🔥
• Keine Werbung, kein Konto, keine Datensammlung
• Komplett offline spielbar
• Farbsymbole für Spieler mit Farbsehschwäche
• Klein, schnell, akkuschonend

Gemacht von david.digital.
```

**Kategorie:** Spiele → Puzzle
**Tags:** Puzzle, Logik, Gelegenheitsspiel, Einzelspieler, Offline
**Kontakt-E-Mail:** [deine E-Mail]
**Datenschutzerklärung:** `https://benlukan.github.io/kippwerk/datenschutz.html`
*(vorher Name, Adresse und E-Mail in `www/datenschutz.html` eintragen)*

## 4. Formulare in der Play Console

| Abschnitt | Antwort |
|---|---|
| App-Zugriff | Alle Funktionen ohne Einschränkung verfügbar |
| Werbung | Nein, enthält keine Werbung |
| Einstufung (IARC-Fragebogen) | Puzzle, keine Gewalt/Glücksspiel/Chat → ergibt i. d. R. USK 0 / PEGI 3 |
| Zielgruppe | 13+ empfohlen (bei „unter 13“ gelten zusätzlich die Familien-Richtlinien) |
| Datensicherheit | **Keine Daten erhoben, keine Daten geteilt.** Daten werden nicht übertragen (nur lokal gespeichert) |
| Behörden-/Gesundheits-/Finanz-App | Nein |
| Nachrichten-App | Nein |

## 5. Grafiken
| Asset | Format | Quelle |
|---|---|---|
| App-Symbol | 512×512 PNG | `www/icon-512.png` |
| Feature-Grafik | 1024×500 PNG | `docs/store/feature-graphic.png` |
| Screenshots Smartphone | 1080×1920 | `docs/store/screenshot-*.png` (3 Stück) |

## 6. Neue Version veröffentlichen
Version + Build hochzählen in `www/index.html` (Footer), `package.json`, `android/app/build.gradle` (`versionCode` muss steigen!), `ios/App/App.xcodeproj/project.pbxproj`, `www/sw.js`, dazu `CHANGELOG.md`. Pushen → AAB aus den Actions-Artifacts hochladen.
