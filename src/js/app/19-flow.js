// ---------- Flow ----------
async function resolve(dir,chain){
  while(true){
    const {groups,cells}=findGroups();
    if(!cells.length)return chain;
    chain++;
    let gained=0;const sizes=[];
    for(const g of groups){sizes.push(g.cells.length);
      const size=g.cells.length;
      const pts=(size*size*10)*chain;gained+=pts;
      const mid=g.cells.reduce((a,i)=>[a[0]+Math.floor(i/N),a[1]+i%N],[0,0]).map(v=>v/size);
      floatText('+'+pts+(chain>1?' ×'+chain:''),mid[0],mid[1],COLORS[g.color]);
    }
    score+=gained;Audit.step(sizes,chain,gained,cells.length);
    const lvBefore=level;
    cleared+=cells.length;level=1+Math.floor(cleared/perLevel());
    if(mode==='endless'&&level!==lvBefore&&level>=20)setTimeout(()=>Unlocks.check(),600);   // z. B. Design „Retro 8-Bit“
    // Felsen neben abgeräumten Steinen zerbrechen
    const rocks=new Set();
    for(const i of cells){const r=Math.floor(i/N),c=i%N;
      for(const[dr,dc]of[[1,0],[-1,0],[0,1],[0,-1]]){const nr=r+dr,nc=c+dc;if(nr<0||nc<0||nr>=N||nc>=N)continue;
        const k=idx(nr,nc);if(grid[k]&&grid[k].color===ROCK)rocks.add(k)}}
    if(prog){for(const g of groups)prog.color[g.color]+=g.cells.length;prog.clear+=cells.length;prog.rocks+=rocks.size;prog.chain=Math.max(prog.chain,chain)}
    sfx.pop(chain);if(chain<2)haptic('light');
    for(const i of [...cells,...rocks])burst(i,grid[i].color,chain);
    for(const i of [...cells,...rocks]){const t=grid[i];const el=els.get(t.id);if(el){el.classList.add('pop');setTimeout(()=>el.remove(),230)}els.delete(t.id);grid[i]=null}
    comboFx(chain);
    if(mode==='endless'&&level>lvBefore){setTimeout(()=>{banner('LEVEL '+level);sfx.level();try{Fly.react('level')}catch(e){}},chain>1?700:200)
      if(N>=6&&!obst()&&lvBefore<rocksFrom()&&level>=rocksFrom())setTimeout(()=>{banner('🪨 FELSEN!','combo c4','AB JETZT IM SPIEL');toast('Ab Level '+rocksFrom()+' kommen Felsen dazu – sie zerbrechen, wenn direkt daneben eine Gruppe verschwindet.')},chain>1?1900:1400);
      if(N>=7&&lvBefore<color6From()&&level>=color6From())setTimeout(()=>{banner('★ NEUE FARBE','combo c4','ORANGE');toast('Ab Level '+color6From()+' gibt es eine 6. Farbe: Orange ★.')},chain>1?1900:1400)}
    render();
    await sleep(230);
    if(dir&&slide(dir)){render();await sleep(150)}
  }
}

async function move(dir){
  if(busy||over||!started)return;
  if(tut&&tut.step<TUT_STEPS.length&&dir!==TUT_STEPS[tut.step].dir){coachNudge();return}
  if(!slide(dir)){boardEl.classList.remove('shake');void boardEl.offsetWidth;boardEl.classList.add('shake');sfx.bump();return}
  busy=true;sfx.slide();
  if(mode!=='endless')movesLeft--;
  render();await sleep(150);
  const chain=await resolve(dir,0);
  if(mode==='level'&&goalsMet())return levelWin();
  spawn(dir);render();await sleep(200);
  const total=await resolve(null,chain);
  history.push(total);Audit.move();bestChain=Math.max(bestChain,total);if(total===1)combos[1]++;if(total>=2){combos[TIER(total)]++;combos[0]++;bumpCombo(TIER(total))}if(total>=lifeAt())gainLife();if(total>=8)try{Badges.earn('ultra8')}catch(e){}if(mode==='endless')MaxLv.note(BK,level);renderInfo();
  if(mode==='level'&&goalsMet())return levelWin();
  if(grid.every(Boolean))return gameOver('full');
  if(mode!=='endless'&&movesLeft<=0)return gameOver('moves');
  busy=false;musicSync();try{Fly.onMove(dir)}catch(e){}
  if(tut)tutNext(total);
}

const EMO=c=>c<=0?'⬛':c===1?'🟦':c===2?'🟩':c===3?'🟨':c===4?'🟥':c===5?'🟪':'⬜';
function shareText(r){
  const rows=[];for(let i=0;i<r.hist.length;i+=10)rows.push(r.hist.slice(i,i+10).map(EMO).join(''));
  const en=I18N.lang==='en';
  return `KIPPWERK ${en?'Daily':'Tagesspiel'} ${dayLabel(r.no,true)}\n⭐ ${r.score.toLocaleString(LOC())} ${en?'points · chain':'Punkte · Kette'} ×${Math.max(1,r.chain)}${r.full?(en?' · board full':' · Feld voll'):''}${r.streak>=2?`\n🔥 ${r.streak} ${en?'days in a row':'Tage in Folge'}`:''}\n${rows.join('\n')}\n${SHARE_URL}`;
}
function countdown(){
  const n=now(),t=nextDayStart();const m=Math.max(0,Math.ceil((t-n)/6e4));
  return `Nächstes Tagesspiel in ${Math.floor(m/60)} h ${m%60} min · um ${dayStartTime()}`;
}

function gameOver(reason){
  over=true;busy=false;sfx.over();haptic('heavy');musicSync();try{Fly.react('over')}catch(e){}
  let canVideo=false,canLife=false;try{canVideo=!rescued&&!!Ads.canRescue;canLife=lives>0}catch(e){ErrLog.add('gameOver',e&&e.message,e&&e.stack)}
  if(mode!=='daily'&&(canVideo||canLife))try{
    rescueKind=reason;
    $('rescueTitle').textContent=reason==='moves'?'KEINE ZÜGE MEHR':'FELD VOLL';
    $('rescueScore').textContent=mode==='level'?'ETAPPE '+stg(lvNo):score.toLocaleString(LOC());
    const gain=reason==='moves'?`<b>${ADS_CONFIG.rescueMoves} Züge</b> extra`:`<b>${ADS_CONFIG.rescueTiles} Steine</b> weniger – du spielst weiter`;
    $('rescueText').innerHTML=(reason==='moves'?'Fast geschafft? ':'Noch eine Chance? ')+(canLife&&canVideo?'Setz ein ❤ Extra-Leben ein oder schau ein kurzes Video':canLife?'Setz ein ❤ Extra-Leben ein':'Schau ein kurzes Video')+` – dafür gibt es ${gain}.`;
    $('lifeBtn').style.display=canLife?'':'none';$('lifeBtn').textContent=`❤ LEBEN EINSETZEN (${lives} übrig)`;
    $('rescueBtn').style.display=canVideo?'':'none';
    $('rescueBtn').disabled=false;$('rescueBtn').textContent='🎬 VIDEO ANSEHEN & WEITER';
    $('rescueHint').textContent=canVideo?'Video: einmal pro Runde · Leben: so viele du hast':'Extra-Leben gibt es für Combos ab ×'+lifeAt();
    setTimeout(()=>$('rescueOv').classList.remove('hidden'),500);return;
  }catch(e){ErrLog.add('rescue',e&&e.message,e&&e.stack)}
  endRound(reason);
}
function endRound(reason){
  try{mode==='level'?levelFail(reason):finishGame(reason)}
  catch(e){ErrLog.add('endRound',e&&e.message,e&&e.stack);console.error(e);
    // Notfall: Endbildschirm ohne Details zeigen, damit man nie im Spiel festhängt
    try{$('overTitle').textContent=mode==='level'?'ETAPPE VORBEI':'RUNDE VORBEI';$('overText').textContent=I18N.tr('Ein Fehler ist aufgetreten – dein Spiel wurde beendet.');}catch(x){}
    setTimeout(()=>$('overOv').classList.remove('hidden'),300)}}
// Wächter: hängt eine Runde (vorbei, aber kein Fenster offen) oder bleibt ein Zug „beschäftigt“, geht es automatisch weiter
let stuckTicks=0,busySince=0,busyMv=-1;
setInterval(()=>{try{
  if(busy&&started&&!over){const mv=history.length;if(busyMv!==mv||!busySince){busyMv=mv;busySince=Date.now()}
    else if(Date.now()-busySince>15000){ErrLog.add('stuck','Zug hing länger als 15 s');busy=false;busySince=0;render()}}else busySince=0;
  const anyOpen=!!document.querySelector('.overlay:not(.hidden)');
  if(started&&over&&!busy&&!anyOpen&&!adBusy){if(++stuckTicks>=3){stuckTicks=0;ErrLog.add('stuck','Runde vorbei, aber kein Fenster offen');endRound(rescueKind||'full')}}else stuckTicks=0;
}catch(e){}},1000);
async function rescue(){
  $('rescueBtn').disabled=true;$('rescueBtn').textContent='VIDEO LÄDT …';
  let earned=false;try{earned=await Promise.race([Ads.showReward(),new Promise(r=>setTimeout(()=>r(false),45000))])}catch(e){ErrLog.add('ad',e&&e.message,e&&e.stack)}
  $('rescueOv').classList.add('hidden');
  if(!earned)return endRound(rescueKind);
  rescued=true;applyRescue();
}
function useLife(){if(lives<=0)return;lives--;saveLives();$('rescueOv').classList.add('hidden');applyRescue('❤ WEITER!')}
function applyRescue(msg){
  if(rescueKind==='moves'){movesLeft+=ADS_CONFIG.rescueMoves;over=false;busy=false;started=true;render();banner('+'+ADS_CONFIG.rescueMoves+' ZÜGE');sfx.level();musicSync();return}
  const filled=[];for(let i=0;i<N*N;i++)if(grid[i]&&grid[i].color!==ROCK)filled.push(i);
  for(let i=filled.length-1;i>0;i--){const j=Math.floor(Math.random()*(i+1));[filled[i],filled[j]]=[filled[j],filled[i]]}
  for(const i of filled.slice(0,ADS_CONFIG.rescueTiles)){const t=grid[i];const el=els.get(t.id);if(el){el.classList.add('pop');setTimeout(()=>el.remove(),230)}els.delete(t.id);grid[i]=null}
  over=false;busy=false;started=true;render();banner(msg||'WEITER!');sfx.level();musicSync();
}
function countRound(){gamesDone++;pendingInter=!!ADS_CONFIG.interstitialEvery&&Ads.native&&gamesDone%ADS_CONFIG.interstitialEvery===0&&!rescued}
let adBusy=false;
function maybeInter(){if(pendingInter){pendingInter=false;adBusy=true;Promise.resolve(Ads.showInter()).finally(()=>setTimeout(()=>adBusy=false,1500))}}

