# Produktvideo & Store-Bilder neu erstellen

Alles wird aus dem echten Spiel aufgenommen. Virtuelle Uhr (`timeweb.js`) = jedes Bild exakt, unabhängig von der Rechnerleistung.

```bash
cd ~                                   # Ordner, der kippwerk/ und video/ enthält
python3 -m http.server 8123 --bind 127.0.0.1 &
mkdir -p video && cp kippwerk/tools/video/* video/ && cd video
python3 shots2.py                      # Standbilder je Sprache: m_<bild>_de.png / _en.png
python3 store_shots.py                 # Store-Screenshots 1080×1920 → out/de, out/en
python3 search.py 80                   # optional: Spielverlauf mit großer Combo suchen → best.json
for L in de en; do for s in 1 2 3 4 5 6 7; do LANG_V=$L python3 render.py $s; done; done
python3 music.py 29.2                  # Musik-Spur wie im Spiel → music.wav
for L in de en; do
  printf "file 's%s_$L.mp4'\n" 1 2 3 4 5 6 7 > list_$L.txt
  ffmpeg -f concat -safe 0 -i list_$L.txt -i music.wav -c:v copy -c:a aac -b:a 160k -shortest -movflags +faststart KIPPWERK_Produktvideo_1080x1920_$L.mp4
  ffmpeg -i KIPPWERK_Produktvideo_1080x1920_$L.mp4 -vf "crop=886:1920:97:0" -c:v libx264 -crf 18 -pix_fmt yuv420p -c:a copy KIPPWERK_AppStore_886x1920_$L.mp4
done
```
- Testbilder einer Szene: `python3 render.py 2 probe 200,7400` (Sprache über `LANG_V=en`)
- Szenen und Texte (DE/EN): `stage.html` → `SCENES`; Store-Bildtexte: `store_shots.py`
- Feature-Grafik 1024×500: `feature_de.html` / `feature_en.html` (Element `#f` als Screenshot)

## Produktvideo 2.0 (Querformat 1920×1080, 84 s, für YouTube)
```bash
cd ~ && python3 -m http.server 8123 --bind 127.0.0.1 &
cp kippwerk/tools/video/* video/ && cd video
python3 music_wide.py 84.3                       # Musik: KIPPWERK-Thema wie im Spiel → music_wide.wav
for L in de en; do for s in $(seq 1 14); do LANG_V=$L python3 render_wide.py $s; done; done
for L in de en; do printf "file 'w%s_$L.mp4'\n" $(seq 1 14) > wlist_$L.txt
  ffmpeg -f concat -safe 0 -i wlist_$L.txt -i music_wide.wav -c:v copy -c:a aac -b:a 160k -shortest -movflags +faststart KIPPWERK_Produktvideo_2.0_1920x1080_$L.mp4; done
```
- Szenen und Texte (DE/EN): `stage_wide.html` → `SCENES` (Intro, Menü 2.0, Spielprinzip, Combos, Tagesspiel, weltweite Ranglisten, Etappen, 4×4/9×9/10×10/Hindernisse, Sammlung mit Designs/Kippi/Abzeichen/Felder, Serie, Abspann)
- Simulierte Google-Play-Games-Anbindung nur für Video/Bilder: `pg_mock.js`; Testbilder: `LANG_V=en python3 render_wide.py 6 probe 1500,5000`
