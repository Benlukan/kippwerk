# Online-Bestenliste mit Supabase einrichten

Ab v1.10.0 hat KIPPWERK eine freiwillige, weltweite Bestenliste. Solange in `www/index.html` kein Supabase-Projekt eingetragen ist, bleibt sie unsichtbar – das Spiel läuft wie bisher.

## 1. Projekt anlegen (ca. 5 Min.)
1. Auf <https://supabase.com> anmelden (z. B. mit GitHub) → **New project**.
2. Name: `kippwerk` · Datenbank-Passwort: generieren und sicher ablegen (wird von der App nicht gebraucht).
3. **Region: Central EU (Frankfurt)** – wichtig, die Datenschutzerklärung nennt Frankfurt.
4. Plan: **Free** reicht. Free-Projekte werden nach 7 Tagen ohne Aufrufe pausiert – dagegen pingt der Workflow `.github/workflows/supabase-keepalive.yml` die Datenbank automatisch alle 3 Tage an (siehe Abschnitt 6).

## 2. Datenbank einrichten

> **Update auf v1.13.0:** `supabase/schema.sql` einmal erneut komplett im SQL Editor ausführen (fügt `kw_top_daily` hinzu, Daten bleiben). Bis dahin zeigt „Heute“ weiter die alte Liste, „Woche“ und „All the best“ melden keine Verbindung.
1. Im Projekt links **SQL Editor** → **New query**.
2. Den kompletten Inhalt von [`supabase/schema.sql`](../supabase/schema.sql) einfügen → **Run**.
3. Erwartet: „Success. No rows returned“. Unter **Table Editor** gibt es jetzt `kw_scores`.
4. Mehrfaches Ausführen ist unbedenklich (für spätere Schema-Updates genauso vorgehen).

Was das Schema macht:
- Tabelle `kw_scores` mit **RLS an und ohne Policies** → die App kann die Tabelle weder direkt lesen noch schreiben.
- Die App nutzt nur fünf Funktionen:
  - `kw_submit` – Ergebnis eintragen (Tagesspiel: nur das erste zählt, nur gestern/heute/morgen; Endlos: nur Bestwert je Feldgröße; Plausibilitätsgrenzen)
  - `kw_top` – Top 10 + eigene Platzierung; öffentlich nur Name, Kurzkennung `#1A2B`, Punkte
  - `kw_top_daily` – Tagesspiel-Listen *Heute*, *Woche* (Summe Mo–So je Spieler) und *All the best* (bestes Einzelergebnis je Spieler) – ab v1.13.0
  - `kw_rename` – Namen ändern
  - `kw_delete` – alle eigenen Einträge löschen (DSGVO)

## 3. Schlüssel holen
**Project Settings → API Keys** (bzw. „Connect“ oben):
- **Project URL**, z. B. `https://abcdefghijkl.supabase.co`
- **Publishable key** (`sb_publishable_…`) – alternativ der alte **anon public key** (`eyJ…`). Beide funktionieren.

⚠ Niemals den **secret**/`service_role`-Key ins Spiel eintragen.
Der publishable Key ist absichtlich öffentlich – geschützt wird die Datenbank durch RLS und die Funktionen oben.

## 4. In KIPPWERK eintragen
In `www/index.html` suchen nach `ONLINE_CONFIG` und eintragen:
```js
const ONLINE_CONFIG={url:'https://abcdefghijkl.supabase.co',key:'sb_publishable_…'};
```
Dann Version + Build hochzählen, pushen – die Builds (APK, IPA, Web) laufen automatisch.
(Oder URL + publishable Key an Claude geben, dann wird es eingetragen.)

## 5. Testen
1. Web-Version öffnen → 🏆 Bestenliste → **🌍 Weltweit** → **Mitmachen**.
2. Eine Runde Endlos spielen → das Ergebnis taucht unter „Weltweit“ auf.
3. Im Supabase-Dashboard unter **Table Editor → kw_scores** sind die Einträge sichtbar.

## 6. Pflege
- **Keep-Alive:** Der Workflow „Supabase wach halten“ läuft alle 3 Tage (Actions → Supabase wach halten → *Run workflow* zum Testen). Schlägt er fehl, schickt GitHub eine E-Mail – dann ist das Projekt vermutlich pausiert: Dashboard → Projekt → **Resume project**. Daten bleiben erhalten; Restore ist mindestens 90 Tage nach der Pause möglich.
- **Anstößige Namen / Cheater entfernen:** Table Editor → `kw_scores` → Zeile löschen (oder Namen ändern).
- **Löschanfrage per E-Mail:** im SQL Editor `select kw_delete('SPIELER-ID');`
- **Statistik:** `select mode, size, count(*), count(distinct player_id) from kw_scores group by 1,2;`
- **Alte Tagesrätsel aufräumen** (optional, z. B. älter als 90 Tage):
  `delete from kw_scores where mode='daily' and daily_no < kw_daily_no_today() - 90;`

## 7. Play Store / App Store
Durch die Online-Bestenliste ändern sich die Angaben zur **Datensicherheit** (Play Console → App-Inhalte → Datensicherheit) bzw. **App Privacy** (App Store Connect) – siehe [play-store.md](play-store.md#4d-datensicherheit-mit-online-bestenliste-ab-v1100).
