// KIPPWERK – baut www/index.html aus den Modulen in src/ (eine Datei: offline, schnell, wie bisher)
//   node tools/build.mjs           → www/index.html schreiben
//   node tools/build.mjs --check   → nur prüfen, ob www/index.html zum Quellcode passt (für CI)
import {readFileSync,writeFileSync} from 'node:fs';
import {dirname,join} from 'node:path';
import {fileURLToPath} from 'node:url';
const root=join(dirname(fileURLToPath(import.meta.url)),'..'),src=join(root,'src'),out=join(root,'www','index.html');
const man=JSON.parse(readFileSync(join(src,'build.json'),'utf8'));
let html=readFileSync(join(src,'index.html'),'utf8');
for(const [key,files] of Object.entries(man)){
  const marker=`<!-- @include ${key} -->\n`;
  if(!html.includes(marker))throw new Error('Marker fehlt: '+marker.trim());
  html=html.replace(marker,()=>files.map(f=>readFileSync(join(src,f),'utf8')).join(''));
}
if(process.argv.includes('--check')){
  const cur=readFileSync(out,'utf8');
  if(cur!==html){console.error('✗ www/index.html passt nicht zu src/ – bitte „node tools/build.mjs“ ausführen und committen.');process.exit(1)}
  console.log('✓ www/index.html entspricht src/');
}else{writeFileSync(out,html);console.log('✓ www/index.html gebaut ('+(html.length/1024).toFixed(0)+' KB, '+Object.values(man).flat().length+' Module)')}
