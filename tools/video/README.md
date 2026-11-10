# Produktvideo neu rendern

Bild-für-Bild-Aufnahme des echten Spiels mit virtueller Uhr (`timeweb.js`) – jedes Bild exakt, unabhängig von der Rechnerleistung.

```bash
cd ~            # Ordner, der kippwerk/ und video/ enthält
python3 -m http.server 8123 --bind 127.0.0.1 &
mkdir -p video && cp kippwerk/tools/video/* video/ && cd video
python3 search.py 80        # optional: Spielverlauf mit großer Combo suchen → best.json
python3 shots.py            # Standbilder (Level-Karte, Tagesrätsel, 8×8, Serie, Design)
# stage.html: __MOVES__/__SEED__ sind bereits aus best.json eingesetzt
for s in 1 2 3 4 5 6; do python3 render.py $s; done
printf "file 's%s.mp4'\n" 1 2 3 4 5 6 > list.txt
ffmpeg -f concat -safe 0 -i list.txt -c copy KIPPWERK_Produktvideo_1080x1920.mp4
```
Testbilder einer Szene: `python3 render.py 2 probe 200,7400`.
Szenen und Texte stehen in `stage.html` (Objekt `SCENES`).
