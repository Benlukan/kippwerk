# KIPPWERK – Erfolge für Google Play Games (Vorlage)

Stand: 20.11.2026 · noch **nicht** in der Play Console angelegt und noch **nicht** im Spiel eingebaut.

**Wo anlegen:** Play Console → KIPPWERK → Play Games-Dienste → **Erfolge** → „Erfolg erstellen“.
Standardsprache des Projekts ist Englisch (en-US) → zuerst die englischen Texte eintragen, Deutsch danach unter „Übersetzungen“.

**Für alle Erfolge:**
- **Symbol:** Datei aus `docs/store/erfolge/` (512 × 512 PNG, Nummer = Reihenfolge)
- **Ursprünglicher Status:** Sichtbar (Revealed)
- **Reihenfolge:** wie unten (01 → 12)
- Punkte: Vielfache von 5, je Erfolg max. 200, gesamt max. 1000 – hier gesamt **735**
- **Hochzählend** (Incremental) nur bei Nr. 09 und 10 – dort die **Schritte** eintragen

| Nr. | Symbol-Datei | Name (EN) | Beschreibung (EN) | Name (DE) | Beschreibung (DE) | Punkte | Art |
|---|---|---|---|---|---|---|---|
| 01 | 01-funke.png | Spark | Keep a 3-day streak in the daily game. | Funke | Halte eine Serie von 3 Tagen im Tagesspiel. | 10 | Standard |
| 02 | 02-woche.png | One Week | Keep a 7-day streak in the daily game. | Eine Woche | Halte eine Serie von 7 Tagen im Tagesspiel. | 20 | Standard |
| 03 | 03-zwei-wochen.png | Two Weeks | Keep a 14-day streak in the daily game. | Zwei Wochen | Halte eine Serie von 14 Tagen im Tagesspiel. | 40 | Standard |
| 04 | 04-monat.png | One Month | Keep a 30-day streak in the daily game. | Ein Monat | Halte eine Serie von 30 Tagen im Tagesspiel. | 75 | Standard |
| 05 | 05-fuenfzig.png | Fifty Days | Keep a 50-day streak in the daily game. | Fünfzig Tage | Halte eine Serie von 50 Tagen im Tagesspiel. | 100 | Standard |
| 06 | 06-hundert.png | Hundred Days | Keep a 100-day streak in the daily game. | Hundert Tage | Halte eine Serie von 100 Tagen im Tagesspiel. | 200 | Standard |
| 07 | 07-ultra.png | ULTRA! | Trigger your first ULTRA combo. | ULTRA! | Löse deine erste ULTRA-Combo aus. | 15 | Standard |
| 08 | 08-welt1.png | World 1 Complete | Finish stage 1-10. | Welt 1 geschafft | Schließe Etappe 1-10 ab. | 25 | Standard |
| 09 | 09-sterne.png | Star Collector | Collect 100 stars in the stages. | Sternesammler | Sammle 100 Sterne in den Etappen. | 50 | Hochzählend, **100 Schritte** |
| 10 | 10-stammgast.png | Regular | Play 25 daily games. | Stammgast | Spiele 25 Tagesspiele. | 50 | Hochzählend, **25 Schritte** |
| 11 | 11-tagessieger.png | Daily Champion | Reach rank 1 in today's worldwide daily game. | Tagessieger | Erreiche Platz 1 im weltweiten Tagesspiel des Tages. | 100 | Standard |
| 12 | 12-endlos-profi.png | Endless Pro | Score 10,000 points in a single Endless round. | Endlos-Profi | Erreiche 10.000 Punkte in einer Endlos-Runde. | 50 | Standard |

## Danach
1. Die 12 IDs (`CgkI…`) mit Nummer an Claude schicken, z. B. „01 Funke: CgkI…“.
2. Claude baut die Erfolge ein (Konfiguration in `src/js/app/10-play-games.js`, neue Version). Bereits erreichte Meilensteine (Serie, Sterne, Tagesspiele) werden beim ersten Start nachträglich freigeschaltet.
3. Play Games-Dienste → **Überprüfen und veröffentlichen** → Veröffentlichen.

Hinweis: Veröffentlichte Erfolge lassen sich nicht mehr löschen, und einige Einstellungen (z. B. hochzählend ja/nein) sind danach fest – vor dem Veröffentlichen prüfen.
