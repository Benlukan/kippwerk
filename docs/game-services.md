# Weltweite Ranglisten: Google Play Games & Game Center

Ab v1.15.0 nutzt KIPPWERK statt eines eigenen Servers die Ranglisten von **Google Play Games** (Android) und **Apple Game Center** (iOS). Plugin: `@idleflowgames/capacitor-play-games` (MIT).

- Android und iPhone haben **getrennte** Ranglisten, die Web-Version hat nur die lokale Bestenliste.
- Solange in `www/index.html` → `GAMES_CONFIG` `on:false` steht, ist alles ausgeblendet.
- Die Plattformen behalten pro Spieler automatisch den **Bestwert** und zeigen von sich aus **Heute / Woche / Gesamt**.
  Hinweis: Google rechnet „Heute“ und „Woche“ nach US-Westküstenzeit (Tageswechsel ca. 9:00 Uhr deutscher Zeit). Die Woche zeigt dort das beste Tagesspiel der Woche, keine Summe. Die Wochensumme gibt es weiterhin in der lokalen Bestenliste.

## Ranglisten (auf beiden Plattformen gleich anlegen)

| Schlüssel | Name | iOS-ID (fest im Code) |
|---|---|---|
| `e5` | Endlos 5×5 | `kippwerk.endlos.5x5` |
| `e6` | Endlos 6×6 | `kippwerk.endlos.6x6` |
| `e7` | Endlos 7×7 | `kippwerk.endlos.7x7` |
| `e8` | Endlos 8×8 | `kippwerk.endlos.8x8` |
| `daily` | Tagesspiel | `kippwerk.tagesspiel` |

Einstellungen jeweils: Format **Zahl** (ohne Nachkommastellen), Reihenfolge **höher ist besser**, Mindestwert 0, Höchstwert 10 000 000 (bremst Schummler).

## Android – Google Play Console (ca. 20 Min.)
1. App muss in der Play Console als **Spiel** angelegt sein (Store-Präsenz → Kategorie „Spiel“ / Puzzle).
2. **Wachstum → Play Games-Dienste → Einrichtung und Verwaltung → Konfiguration** → „Nein, mein Spiel verwendet noch keine Google APIs“ → Projekt erstellen.
3. Dem Link zur **Google Cloud** folgen und den **OAuth-Zustimmungsbildschirm** ausfüllen (Typ „Extern“, App-Name KIPPWERK, deine E-Mail). Zurück in der Play Console.
4. **Anmeldedaten hinzufügen → Android**, Paketname `de.daviddigital.kippwerk`, je eine Anmeldedatei für diese SHA-1-Fingerabdrücke:
   - **App-Signaturschlüssel** (Play Console → Testen und veröffentlichen → App-Integrität → App-Signatur)
   - **Upload-Schlüssel** (gleiche Seite)
   - **Test-APKs aus GitHub (Debug-Schlüssel):** `F6:C8:F4:34:6C:29:8F:34:B4:A1:8E:33:03:A0:9F:3D:A0:0E:8A:33`
5. **Bestenlisten** → die 5 Ranglisten aus der Tabelle anlegen. Die IDs (`CgkI…`) kopieren.
6. **Tester** → deine Google-Adresse (und die deiner Tester) eintragen. Bis zur Veröffentlichung funktioniert die Anmeldung nur für Tester.
7. Die **Projekt-ID** (Ziffern, oben auf der Konfigurationsseite) und die 5 Ranglisten-IDs an Claude schicken bzw. selbst eintragen:
   - `android/app/src/main/res/values/games-ids.xml` → `game_services_project_id`
   - `www/index.html` → `GAMES_CONFIG.android` → IDs eintragen, `on:true`
8. Vor dem öffentlichen Start: Play Games-Dienste → **Überprüfen und veröffentlichen**.

## iOS – App Store Connect (braucht Apple Developer Program, 99 €/Jahr)
1. App in App Store Connect anlegen (Bundle-ID `de.daviddigital.kippwerk`).
2. **Funktionen → Game Center** → 5 **klassische Ranglisten** mit genau den iOS-IDs aus der Tabelle anlegen (Score-Format „Ganzzahl“, Sortierung „hoch nach niedrig“), je eine deutsche Lokalisierung.
3. Die Game-Center-Berechtigung (`ios/App/App/App.entitlements`) ist schon im Projekt.
4. In `www/index.html` → `GAMES_CONFIG.ios` `on:true` setzen.
5. Für einen installierbaren iOS-Build braucht der Workflow noch Signatur-Zertifikat und Provisioning Profile (bisher baut er unsigniert).

## Datenschutz
Datenschutzerklärung (`www/datenschutz.html`) und Datensicherheits-Angaben (`docs/play-store.md`, Abschnitt 4d) sind angepasst.
