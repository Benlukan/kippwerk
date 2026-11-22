# Weltweite Ranglisten: Google Play Games & Game Center

Ab v1.15.0 nutzt KIPPWERK statt eines eigenen Servers die Ranglisten von **Google Play Games** (Android) und **Apple Game Center** (iOS). Plugin: `@idleflowgames/capacitor-play-games` (MIT).

- Android und iPhone haben **getrennte** Ranglisten, die Web-Version hat nur die lokale Bestenliste.
- Konfiguration in `src/js/app/10-play-games.js` → `GAMES_CONFIG` (danach `npm run build`). Steht dort `on:false`, ist alles ausgeblendet.
- **Stand v1.29.0:** Android aktiv. Projekt-ID `414239949537`. Bestenlisten: Endless 5×5 `CgkI4YWAlYcMEAIQAQ`, 6×6 `CgkI4YWAlYcMEAIQAg`, 7×7 `CgkI4YWAlYcMEAIQAw`, 8×8 `CgkI4YWAlYcMEAIQBA`, Daily game `CgkI4YWAlYcMEAIQBQ`. Standardsprache der Bestenlisten in der Play Console: Englisch (en-US), deutsche Namen als Übersetzung. iOS noch aus.
- Die Plattformen behalten pro Spieler automatisch den **Bestwert** und zeigen von sich aus **Heute / Woche / Gesamt**.
  Hinweis: Google rechnet „Heute“ und „Woche“ nach US-Westküstenzeit (fest UTC-7: Tageswechsel 08:00 Uhr im Winter, 09:00 Uhr im Sommer; Woche So–Sa, Reset Sonntag zur selben Uhrzeit, nicht änderbar). Die Woche zeigt dort das beste Tagesspiel der Woche, keine Summe. Die Wochensumme gibt es weiterhin in der lokalen Bestenliste.

## Fehlersuche (ab v1.29.2)
Einstellungen → **„🌍 Ranglisten prüfen“** zeigt Anmeldestatus, Grund einer gescheiterten Anmeldung, Warteschlange, eigene Einträge je Bestenliste und die letzten Meldungen.
- `cancelled` / `not_authenticated` → Konto in **Play Games-Dienste → Tester** fehlt (solange das Projekt nicht veröffentlicht ist) oder SHA-1 passt nicht.
- `10` / `DEVELOPER_ERROR` → SHA-1 oder Paketname passen nicht zu einem Android-Client.
- Pro Signatur ein Android-Client nötig: **App-Signaturschlüssel** (Play-Store-Version), **Upload-Schlüssel** `02:62:CF:8A:4D:8E:C4:FA:BD:57:84:1A:95:68:A3:0D:1A:19:5C:74` (KIPPWERK-release.apk), **Debug** `F6:C8:F4:34:6C:29:8F:34:B4:A1:8E:33:03:A0:9F:3D:A0:0E:8A:33` (KIPPWERK.apk).

## Eine Bestenliste (ab v1.30.0)
- Angemeldet: 🏆 zeigt die weltweite Liste (`loadTopScores`, Zeitraum `day`/`week`/`all`, 25 Einträge + eigener Platz). Abgemeldet/Web/offline: lokale Liste.
- Score-Tag je Ergebnis: `c<Combo>m<Züge>s<Steine>l<Level>d<JJJJMMTT>` (`d` = Datum des Tagesspiels, ab v1.30.2) (max. 64 Zeichen, nur Buchstaben/Ziffern) – `ScoreTag.enc/dec` in `src/js/app/10-play-games.js`.
- Plugin-Patch (`patches/@idleflowgames+capacitor-play-games+0.3.3.patch`): `submitScore({scoreTag})`, `loadTopScores` liefert `tag` je Eintrag und bei `me`.
- Spielername kommt aus dem Play-Games-Profil (`Games.player.name`).

## Spieltag (ab v1.31.0)
- `todayKey()` rechnet in **Etc/GMT+7** (= UTC-7, ab v1.36.1; vorher America/Los_Angeles) – das Tagesspiel, die Serie, „Heute“-Listen und Belohnungen wechseln damit weltweit gleichzeitig um Mitternacht UTC-7 (Deutschland: 08:00 Winter / 9:00 Uhr) und passen zu Googles Zeitraum „Heute“. `nextDayStart()`/`dayStartTime()` liefern den nächsten Wechsel in Ortszeit (Menü „offen bis …“, Countdown nach dem Tagesspiel, Top 5).

## Tagesspiel je Wochentag – „Gestern (weltweit)“ (ab v1.35.0)
Google speichert pro Spieler und Zeitraum nur den besten Wert; „Gestern“ gibt es dort nicht. Deshalb zusätzlich **7 Bestenlisten**, eine je Wochentag. Jedes Tagesspiel geht an „Tagesspiel“ **und** an die Liste seines Wochentags (Spieltag, siehe `todayKey`).
- In der Play Console anlegen (wie „Tagesspiel“: Zahl, 0 Dezimalstellen, höher ist besser, 1 – 100000, Manipulationsschutz an), Standardsprache Englisch:
  | Nr. | Name (EN) | Name (DE) |
  |---|---|---|
  | 0 | Daily Monday | Tagesspiel Montag |
  | 1 | Daily Tuesday | Tagesspiel Dienstag |
  | 2 | Daily Wednesday | Tagesspiel Mittwoch |
  | 3 | Daily Thursday | Tagesspiel Donnerstag |
  | 4 | Daily Friday | Tagesspiel Freitag |
  | 5 | Daily Saturday | Tagesspiel Samstag |
  | 6 | Daily Sunday | Tagesspiel Sonntag |
- IDs in `src/js/app/10-play-games.js` → `GAMES_CONFIG.android.wd` (Reihenfolge Mo … So). Erst wenn alle 7 gesetzt sind, erscheint der Reiter „Gestern“.
- Anzeige „Gestern“: Liste des gestrigen Wochentags, Zeitraum „Woche“, gefiltert auf das gestrige Datum im Score-Tag; leer → Zeitraum „Gesamt“, ebenfalls gefiltert.

## Abzeichen / Erfolge (ab v1.36.0)
- 12 Abzeichen in der Sammlung (🎨 → Abzeichen), lokal in `kippwerk_badges` (Datum), Cloud-Sicherung führt zusammen.
- Optional als Google-Erfolge: IDs in `GAMES_CONFIG.android.ach` (Schlüssel funke, woche, zwei, monat, fuenfzig, hundert, ultra, welt1, sterne, stammgast, sieger, profi). Sterne (100 Schritte) und Stammgast (25 Schritte) zählen hoch, der Rest wird freigeschaltet. Vorlage: `docs/play-games-erfolge.md`. Bereits erreichte Abzeichen werden nach der Anmeldung nachgereicht.

## Top 5 im Hauptmenü
- Liefert Google den eigenen Eintrag mit Platz ≤ 0 (leere öffentliche Liste), ist das Play-Games-Profil nicht öffentlich: Die App zeigt den Eintrag mit „–“ und den Hinweis „Nur für dich sichtbar“ (ab v1.31.1).
- Ab v1.30.1 umschaltbar: **Tagesspiel** oder **Endlos N×N** (N = Endlos-Feld im Menü), jeweils Heute/Woche/Alle. „Ganze Rangliste“ öffnet dieselbe Liste in 🏆.
- Google-„Heute“ beginnt ganzjährig um Mitternacht UTC-7 (in Deutschland 08:00 Uhr im Winter, 09:00 Uhr im Sommer); die Google-Woche läuft Sonntag–Samstag – die App zeigt die lokale Uhrzeit dazu an („Neuer Tag ab …“).
 (ab v1.19.0)
Lädt die besten 5 der Rangliste „Tagesspiel“ (Zeitraum Heute / Woche / Alle) plus die eigene Platzierung über `loadTopScores` – eine Erweiterung des Plugins per `patches/@idleflowgames+capacitor-play-games+0.3.3.patch` (wird bei `npm install` automatisch angewendet). Bei einem Plugin-Update den Patch prüfen.

## Spielstand in der Cloud (ab v1.17.0)
Mit `saves:true` in `GAMES_CONFIG` speichert KIPPWERK den Spielstand als „Gespeichertes Spiel“ (`kippwerk-spielstand`) im Play-Games- bzw. Game-Center-Konto:
Level/Sterne, Endlos-Rekorde, Tagesspiele (Ergebnisse der letzten 60 Tage), Serie inkl. Schutz und Abzeichen, Spielername, Einstellungen (Ton, Vibration, Tempo, Farben, Symbole, Feldgröße, Design).
- Abgleich beim Start (nach der Anmeldung), im Menü und wenn die App in den Hintergrund geht: Cloud lesen → **zusammenführen** (es zählt jeweils das Bessere) → zurückschreiben.
- Läuft gerade eine Runde, wird der fremde Stand erst im Menü übernommen. Danach lädt die App einmal neu und zeigt „☁ Spielstand … abgeglichen“.
- Nur innerhalb einer Plattform (Android ↔ Android, iPhone ↔ iPad). Web: nur lokal.

## Ranglisten (auf beiden Plattformen gleich anlegen)

| Schlüssel | Name | iOS-ID (fest im Code) |
|---|---|---|
| `e5` | Endlos 5×5 | `kippwerk.endlos.5x5` |
| `e6` | Endlos 6×6 | `kippwerk.endlos.6x6` |
| `e7` | Endlos 7×7 | `kippwerk.endlos.7x7` |
| `e8` | Endlos 8×8 | `kippwerk.endlos.8x8` |
| `daily` | Tagesspiel | `kippwerk.tagesspiel` |

Einstellungen jeweils: Format **Zahl** (ohne Nachkommastellen), Reihenfolge **höher ist besser**.

### Schutz gegen Schummeln (ab v1.26.0)
**In der App** (automatisch):
- Jeder Punktgewinn wird in einem geschlossenen Protokoll nachgerechnet (Gruppengröße² × 10 × Combo, Zahl der Steine, Züge). Stimmt der Endstand nicht mit dem Protokoll überein (z. B. Speicher-Editor, manipulierte App), wird das Ergebnis **nicht** gemeldet. Das Tagesspiel wird außerdem nur mit höchstens 40 Zügen gemeldet.
- Noch nicht gesendete Ergebnisse liegen **signiert** im Speicher; nachträglich geänderte Werte werden verworfen.

**In der Play Console** (je Rangliste unter *Play Games-Dienste → Bestenlisten → bearbeiten*):
| Rangliste | Mindestwert | Höchstwert |
|---|---|---|
| Endlos 5×5 bis 8×8 | 1 | 5 000 000 |
| Tagesspiel | 1 | 100 000 |
- **Manipulationsschutz** (Tamper protection) **einschalten** – Google blendet dann verdächtige Einträge aus.
- Einzelne Einträge kann man im Bereich *Bestenlisten → Spielstände verwalten* auch von Hand entfernen.
- Grenzen: Ohne eigenen Server kann ein sehr entschlossener Angreifer mit einer veränderten App trotzdem Werte senden. Die Maßnahmen oben stoppen aber alle üblichen Wege (Speicher-Editor, Speicherdatei ändern, Werte oberhalb der Grenzen).

Game Center (iOS): je Rangliste **Wertebereich** 1–5 000 000 bzw. 1–100 000 setzen; Apple entfernt Einträge außerhalb automatisch.

## Android – Google Play Console (ca. 20 Min.)
1. App muss in der Play Console als **Spiel** angelegt sein (Store-Präsenz → Kategorie „Spiel“ / Puzzle).
2. **Wachstum → Play Games-Dienste → Einrichtung und Verwaltung → Konfiguration** → „Nein, mein Spiel verwendet noch keine Google APIs“ → Projekt erstellen.
3. Dem Link zur **Google Cloud** folgen und den **OAuth-Zustimmungsbildschirm** ausfüllen (Typ „Extern“, App-Name KIPPWERK, deine E-Mail). Zurück in der Play Console.
4. **Anmeldedaten hinzufügen → Android**, Paketname `de.daviddigital.kippwerk`, je eine Anmeldedatei für diese SHA-1-Fingerabdrücke:
   - **App-Signaturschlüssel** (Play Console → Testen und veröffentlichen → App-Integrität → App-Signatur)
   - **Upload-Schlüssel** (gleiche Seite)
   - **Test-APKs aus GitHub (Debug-Schlüssel):** `F6:C8:F4:34:6C:29:8F:34:B4:A1:8E:33:03:A0:9F:3D:A0:0E:8A:33`
5. **Bestenlisten** → die 5 Ranglisten aus der Tabelle anlegen. Die IDs (`CgkI…`) kopieren.
6. **Gespeicherte Spiele**: in der Konfiguration (Eigenschaften) auf **An** stellen.
7. **Tester** → deine Google-Adresse (und die deiner Tester) eintragen. Bis zur Veröffentlichung funktioniert die Anmeldung nur für Tester.
8. Die **Projekt-ID** (Ziffern, oben auf der Konfigurationsseite) und die 5 Ranglisten-IDs an Claude schicken bzw. selbst eintragen:
   - `android/app/src/main/res/values/games-ids.xml` → `game_services_project_id`
   - `src/js/app/10-play-games.js` → `GAMES_CONFIG.android` → IDs eintragen, `on:true`, dann `npm run build`
9. Vor dem öffentlichen Start: Play Games-Dienste → **Überprüfen und veröffentlichen**.

## iOS – App Store Connect (braucht Apple Developer Program, 99 €/Jahr)
1. App in App Store Connect anlegen (Bundle-ID `de.daviddigital.kippwerk`).
2. **Funktionen → Game Center** → 5 **klassische Ranglisten** mit genau den iOS-IDs aus der Tabelle anlegen (Score-Format „Ganzzahl“, Sortierung „hoch nach niedrig“), je eine deutsche Lokalisierung.
3. Unter Certificates, IDs & Profiles für die App-ID **Game Center** und **iCloud** aktivieren und den iCloud-Container `iCloud.de.daviddigital.kippwerk` anlegen. Die Berechtigungen (`ios/App/App/App.entitlements`) sind schon im Projekt.
4. In `src/js/app/10-play-games.js` → `GAMES_CONFIG.ios` `on:true` setzen, dann `npm run build`.
5. Für einen installierbaren iOS-Build braucht der Workflow noch Signatur-Zertifikat und Provisioning Profile (bisher baut er unsigniert).

## Datenschutz
Datenschutzerklärung (`www/datenschutz.html`) und Datensicherheits-Angaben (`docs/play-store.md`, Abschnitt 4d) sind angepasst.

## Endlos nach Zeitraum (ab v1.37.0)

- Die Endlos-Ranglisten (e5–e8) zeigen Heute / Woche (So–Sa) / Gesamt. Google erzeugt Tages- und Wochenversion jeder Rangliste automatisch – dieselben IDs, nur `timeSpan` unterscheidet sich.
- Ohne Anmeldung: Heute/Woche aus `kippwerk_history` (letzte 400 Endlos-Runden), Gesamt aus der lokalen Rekordliste.

## Woche Mo–So im Tagesspiel (ab v1.38.0)

- `loadWeekMoSo()`: je Tag Mo…heute die Liste `wd<Wochentag>`; Tage in der laufenden Google-Woche (ab Sonntag) mit `timeSpan:week`, ältere mit `all`; Einträge nach Datum im Score-Tag gefiltert, je Spieler summiert. Bis zu 7 Abrufe (je max. 25 Einträge), 30–60 s Cache.
- Belohnungen „Woche“ nutzen dieselbe Woche (`weekOf(no, dailyWeekMon())`).
- IDs: `wd` Mo…So = …QBg, QBw, QCA, QCQ, QCg, QCw, QDA; Erfolge `ach` = …QDQ … QGA.
