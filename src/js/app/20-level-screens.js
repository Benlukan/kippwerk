// ---------- Level-Bildschirme ----------
function showLvl({kicker,title,stars,goalsProg,text,main,mainFn,retry=true,map=true}){
  $('lvlKicker').textContent=kicker;$('lvlTitle').textContent=title;
  $('lvlStars').style.display=stars==null?'none':'';$('lvlStars').innerHTML=stars==null?'':starsHtml(stars);
  $('lvlGoals').innerHTML=LV.goals.map(g=>goalText(g,goalsProg)).join('');
  $('lvlText').innerHTML=text||'';$('lvlMain').textContent=main;lvlMainFn=mainFn;
  $('lvlRetry').style.display=retry?'':'none';$('lvlMap').style.display=map?'':'none';
  ['startOv','overOv','levelsOv'].forEach(i=>$(i).classList.add('hidden'));$('lvlOv').classList.remove('hidden');
}
let lvlMainFn=null;
function levelIntro(n){
  lvNo=n;LV=LEVELS[n-1];prog={color:[0,0,0,0,0],chain:0,rocks:0,clear:0};score=0;
  const best=LP[n]||0;
  let tip='';
  if(LV.rocks&&LV.rocks.length&&!LEVELS.slice(0,n-1).some(l=>l.rocks))tip='<br>💡 Felsen zerbrechen, wenn direkt daneben eine Gruppe verschwindet.';
  if(LV.goals.some(g=>g.t==='chain')&&!LEVELS.slice(0,n-1).some(l=>l.goals.some(g=>g.t==='chain')))tip+='<br>💡 Eine Kette entsteht, wenn nachrutschende Steine eine neue Gruppe bilden.';
  if(n%10===0)tip+='<br>👑 Boss-Etappe – die schwerste der Welt!';
  showLvl({kicker:(n%10===0?'👑 BOSS · ':'')+`WELT ${Math.ceil(n/10)} · `+(best?'BESTES ERGEBNIS':'NEUE ETAPPE'),title:'ETAPPE '+stg(n),stars:best,goalsProg:false,
    text:`<b>${LV.moves} Züge</b> · übrige Züge für ★★: ${LV.stars[0]} · ★★★: ${LV.stars[1]}${tip}`,
    main:'▶ START',mainFn:()=>start('level'),retry:false});
}
function levelWin(){
  setTimeout(musicSync,0);try{Fly.react('win')}catch(e){}
  over=true;busy=false;started=false;countRound();
  const st=movesLeft>=LV.stars[1]?3:movesLeft>=LV.stars[0]?2:1;
  const prev=LP[lvNo]||0;if(st>prev){LP[lvNo]=st;saveLP();}setTimeout(()=>Unlocks.check(),900)   // Welt geschafft → Belohnung
  sfx.level();haptic('win');banner('GESCHAFFT!');
  const last=lvNo>=LEVELS.length;
  setTimeout(()=>showLvl({kicker:'GESCHAFFT!',title:'ETAPPE '+stg(lvNo),stars:st,goalsProg:true,
    text:`${movesLeft} ${movesLeft===1?'Zug':'Züge'} übrig · ${fmt(score)} Punkte · ${comboSummary()}${st>prev&&prev?' · neuer Bestwert!':''}${lvNo%10===0&&!last?`<br>🎉 Welt ${lvNo/10} geschafft – weiter nach „${WORLDS[lvNo/10]}“!`:''}${last?'<br>🎉 Du hast alle 100 Etappen geschafft! Neue Welten kommen mit den nächsten Updates – bis dahin: fehlende Sterne holen oder im ∞ Endlos-Modus weiterspielen.':''}`,
    main:last?'🗺 ZUR KARTE':'WEITER ▶',mainFn:()=>{maybeInter();last?openLevels():levelIntro(lvNo+1)}}),900);
}
function levelFail(reason){
  over=true;busy=false;started=false;countRound();
  setTimeout(()=>showLvl({kicker:'LEIDER NICHT',title:'ETAPPE '+stg(lvNo),stars:null,goalsProg:true,
    text:reason==='moves'?'Keine Züge mehr übrig.':'Das Feld ist voll.',
    main:'↻ NOCHMAL',mainFn:()=>{maybeInter();start('level')},retry:false}),400);
}
// Etappen-Karte: eine Welt als geschwungener Pfad (Level 1 unten, Boss oben), Kippi sitzt auf dem aktuellen Level,
// oben das Tor zur nächsten Welt. ‹ › blättert durch die Welten. Farben nur aus den Design-Variablen.
let mapWorld=-1;
const NWORLDS=()=>Math.ceil(LEVELS.length/10);
function renderMap(){
  const un=unlocked(),nw=NWORLDS(),curW=Math.min(nw-1,Math.floor((Math.min(un,LEVELS.length)-1)/10));
  if(mapWorld<0||mapWorld>=nw)mapWorld=curW;
  const w=mapWorld,first=w*10+1,last=Math.min(LEVELS.length,first+9),cnt=last-first+1;
  const ws=Array.from({length:cnt},(_,j)=>LP[first+j]||0).reduce((a,b)=>a+b,0);
  const STEP=78,TOP=150,H=TOP+cnt*STEP+40;
  const X=j=>50+Math.sin(j*1.05+0.4)*30,Y=j=>H-60-j*STEP;            // x in %, y in px (j=0 unten)
  let d=`M${X(0)} ${Y(0)}`;for(let j=1;j<cnt;j++){const my=(Y(j-1)+Y(j))/2;d+=` C${X(j-1)} ${my} ${X(j)} ${my} ${X(j)} ${Y(j)}`}
  const gx=50,gy=64;d+=` C${X(cnt-1)} ${(Y(cnt-1)+gy)/2} ${gx} ${(Y(cnt-1)+gy)/2} ${gx} ${gy+34}`;
  // gelaufener Teil des Pfads: bis zum aktuellen Level
  const c=Array.from({length:cnt},(_,j)=>LP[first+j]?1:0).reduce((a,b)=>a+b,0),k=Math.min(c,cnt-1);
  let dd='';if(c>0){dd=`M${X(0)} ${Y(0)}`;for(let j=1;j<=k;j++){const my=(Y(j-1)+Y(j))/2;dd+=` C${X(j-1)} ${my} ${X(j)} ${my} ${X(j)} ${Y(j)}`}}
  let nodes='';
  for(let j=0;j<cnt;j++){const n=first+j,s=LP[n]||0,lock=n>un,boss=n%10===0,cur=n===un&&!LP[n];
    const st=lock?'':`<small>${'★'.repeat(s)}<span class="off">${'★'.repeat(3-s)}</span></small>`;
    nodes+=`<button class="lvbtn mnode${lock?' locked':''}${boss?' boss':''}${cur?' cur':''}${s?' done':''}${s===3?' s3':''}" data-n="${n}" ${lock?'disabled':''} style="left:${X(j)}%;top:${Y(j)}px" aria-label="Level ${stg(n)}">${lock?'🔒':(boss?'<i class="crown">👑</i>':'')+((n-1)%10+1)}${st}</button>`;
    if(cur)nodes+=`<span class="mkippi" style="left:${X(j)}%;top:${Y(j)}px">${kippiSvg(Unlocks.has('kippi',settings.kippi)?settings.kippi:'none')}</span>`}
  // Tor zur nächsten Welt
  let gate;
  if(w+1<nw){const open=un>last||!!LP[last];
    gate=open?`<button class="mgate open" data-w="${w+1}"><b>${I18N.tr('Tor offen')}</b><small>${I18N.tr('Weiter zu Welt '+(w+2))} ›</small></button>`
             :`<div class="mgate"><b>🔒 ${I18N.tr('Tor zu Welt '+(w+2))}</b><small>${I18N.tr('Level '+stg(last)+' bestehen')}</small></div>`}
  else gate=`<div class="mgate${LP[last]?' open':''}"><b>${LP[last]?'🏆 '+I18N.tr('Alle Welten geschafft'):'🏁 '+I18N.tr('Letzte Welt')}</b><small>${I18N.tr('Neue Welten folgen per Update')}</small></div>`;
  $('lvGrid').className='lvmap';$('lvGrid').style.height=H+'px';
  $('lvGrid').innerHTML=`<svg class="mpath" viewBox="0 0 100 ${H}" preserveAspectRatio="none" aria-hidden="true"><path d="${d}" class="pbase"/><path d="${d}" class="pdots"/>${dd?`<path d="${dd}" class="pdone"/>`:''}</svg>${gate.replace('class="mgate','style="top:'+gy+'px" class="mgate')}${nodes}`;
  $('lvWorld').textContent=I18N.tr('Welt '+(w+1))+' · '+I18N.tr(WORLDS[w]||'');
  $('lvWorldStars').textContent='⭐ '+ws+' / '+cnt*3;
  $('lvPrev').disabled=w<=0;$('lvNext').disabled=w>=nw-1||un<first+10;
  const cn=$('lvGrid').querySelector('.mnode.cur')||$('lvGrid').querySelector('.mnode:not(.locked):last-of-type');
  requestAnimationFrame(()=>{const sc=$('lvScroll');sc.scrollTop=cn?Math.max(0,cn.offsetTop-sc.clientHeight/2):H})}
function openLevels(){
  $('levelsTotal').innerHTML=`⭐ ${totalStars()} / ${LEVELS.length*3} ${I18N.tr('Sterne')}`;
  mapWorld=-1;['startOv','overOv','lvlOv'].forEach(i=>$(i).classList.add('hidden'));$('levelsOv').classList.remove('hidden');renderMap();
}
$('lvPrev').onclick=()=>{if(mapWorld>0){mapWorld--;renderMap()}};
$('lvNext').onclick=()=>{mapWorld++;renderMap()};
$('lvGrid').addEventListener('click',e=>{const g=e.target.closest('[data-w]');if(g){mapWorld=+g.dataset.w;renderMap()}});

function finishGame(reason){
  setTimeout(musicSync,0);
  if(mode==='endless')countRound();
  $('finalScore').textContent=score.toLocaleString(LOC());
  const daily=mode==='daily';
  $('shareBox').style.display=$('shareBtn').style.display=daily?'':'none';
  $('countdown').textContent=daily?countdown():'';
  if(daily){
    $('overTitle').textContent=reason==='full'?'FELD VOLL':'GESCHAFFT';
    let official=loadDaily();
    $('nameRow').style.display='none';lastEntry=null;
    let sev=null;
    if(!practice){official={no:dailyNo(),score,chain:bestChain,hist:history,cleared,full:reason==='full'};saveDaily(official);sev=streakOnDaily();if(sev)official.streak=sev.cur,saveDaily(official);setTimeout(()=>Unlocks.check(),1500);
      lastEntry={no:dailyNo(),score,chain:bestChain,moves:history.length,cleared,date:fmtDate(),name:playerName||'Spieler',pid:playerId};addScore('daily',lastEntry);if(Audit.ok(score,cleared,history.length,DAILY_MOVES)){const tg=ScoreTag.enc({chain:bestChain,moves:history.length,cleared,day:todayKey()});Games.submit('daily',score,tg);Games.submit('wd'+wdOf(todayKey()),score,tg)}else{console.warn('Ergebnis nicht gemeldet:',Audit.reason);Games.note('daily',score,'⛔ '+Audit.reason)}
      if(!playerName&&!(Games.signedIn&&Games.player&&Games.player.name)){$('nameRow').style.display='';$('nameInput').value='';$('saveName').textContent='EINTRAGEN'}}
    $('overText').textContent=practice?`Übungsrunde – gewertet bleibt dein erstes Ergebnis: ${official.score.toLocaleString(LOC())}`:`Tagesspiel ${dayLabel(dailyNo())} · ${cleared} Steine abgeräumt · ${comboSummary()}`;
    $('shareBox').textContent=shareText(official);
    const sn=$('streakNote');
    if(sev){
      let h=`<b>🔥 Serie: ${sev.cur} ${sev.cur===1?'Tag':'Tage'}!</b>`;
      if(sev.ms&&sev.ms.theme)h+=`<br>🏅 Neues Abzeichen <b>${sev.ms.badge} ${sev.ms.name}</b> – Design „${THEME_NAMES[sev.ms.theme]}“ freigeschaltet! <button class="linkbtn" id="applyMsTheme" data-th="${sev.ms.theme}">Jetzt anwenden</button>`;
      else if(sev.ms)h+=`<br>🏅 Neues Abzeichen <b>${sev.ms.badge} ${sev.ms.name}</b> – Kippi-Outfit „${KIPPI_NAMES[sev.ms.kippi]}“ freigeschaltet!`;
      if(sev.shield)h+=`<br>🛡 +1 Serienschutz für 7 Tage am Stück!`;
      if(!sev.ms){const nx=MILESTONES.find(m=>m.d>sev.cur);if(nx)h+=`<br><span class="hint">Noch ${nx.d-sev.cur} bis ${nx.badge} ${nx.name}</span>`}
      sn.innerHTML=h;sn.style.display='';
      setTimeout(()=>{banner('🔥 '+sev.cur,'combo c'+(sev.ms?5:sev.cur>=7?4:3),sev.ms?'NEUES ABZEICHEN':'SERIE');sfx.combo(sev.ms?5:3);haptic('win')},300);
      if(sev.cur===1&&settings.remind&&Reminder.native)Reminder.enable().then(ok=>{if(!ok){settings.remind=false;saveSettings()}else Reminder.schedule()});
    }else sn.style.display='none';
  }else{
    $('streakNote').style.display='none';
    $('overTitle').textContent='FELD VOLL';
    const isBest=score>best;if(isBest)try{Fly.react('record')}catch(e){}
    setTimeout(()=>Unlocks.check(),1200);   // Abzeichen/Designs (z. B. Endlos-Profi)
    MaxLv.note(BK,level);
    if(score>0)History.add({d:todayKey(),t:'e',size:N,...(bH(BK)?{h:1}:{}),score,level,chain:bestChain,moves:history.length,cleared});
    const sl=sizeList(BK);const qualifies=score>0&&(sl.length<TOP||score>sl[sl.length-1].score);
    let rank=0;lastEntry=null;
    if(Audit.ok(score,cleared,history.length)){const tg=ScoreTag.enc({chain:bestChain,moves:history.length,cleared,level,day:todayKey()});Games.submit('e'+BK,score,tg);Games.submit('e'+BK+'wd'+wdOf(todayKey()),score,tg)}else{console.warn('Ergebnis nicht gemeldet:',Audit.reason);Games.note('e'+BK,score,'⛔ '+Audit.reason)}
    if(qualifies){lastEntry={name:playerName||'Spieler',pid:playerId,score,level,chain:bestChain,moves:history.length,cleared,date:fmtDate(),size:N,...(bH(BK)?{h:1}:{})};addScore('endless',lastEntry);rank=sizeList(BK).indexOf(lastEntry)+1;}
    best=bestFor(BK);
    $('overText').textContent=(isBest?'🏆 Neuer Rekord! ':rank?`Platz ${rank} in der Bestenliste! `:'')+'Level '+level+' · '+cleared+' Steine abgeräumt · '+comboSummary()+'.'+(!isBest?' Rekord: '+best.toLocaleString(LOC()):'');
    $('nameRow').style.display=rank&&!(Games.signedIn&&Games.player&&Games.player.name)?'':'none';
    $('nameInput').value=playerName;$('saveName').textContent='EINTRAGEN';
  }
  setTimeout(()=>$('overOv').classList.remove('hidden'),500);
}

function newGame(){
  els.forEach(el=>el.remove());els.clear();
  if(mode==='daily'){const s=hashStr('kippwerk-'+todayKey());rc=mulberry32(s);rp=mulberry32(s^0x9e3779b9);practice=!!loadDaily()}
  else if(tut){rc=mulberry32(20261117);rp=mulberry32(7);practice=false}
  else{rc=Math.random;rp=Math.random;practice=false}
  if(mode==='endless'&&!tut)BK=curBoard();
  setSize(mode==='endless'&&!tut?bN(BK):6);
  grid=Array(N*N).fill(null);nextQ=[];score=0;cleared=0;level=1;busy=false;over=false;tileId=0;Audit.reset();
  best=bestFor(mode==='endless'?BK:N);
  movesLeft=mode==='level'?LV.moves:DAILY_MOVES;history=[];bestChain=0;combos=[0,0,0,0,0,0,0];rescued=false;
  prog=mode==='level'?{color:[0,0,0,0,0],chain:0,rocks:0,clear:0}:null;
  $('modeTag').textContent=mode==='daily'?(practice?'Übung ':'Tag ')+dayShort(dailyNo()):mode==='level'?'Etappe '+stg(lvNo):(BK!=='6'?bLabel(BK):'');
  if(mode==='level')for(const[r,c]of(LV.rocks||[]))grid[idx(r,c)]={id:++tileId,color:ROCK,r,c};
  if(tut){   // feste Aufstellung für das Tutorial (6×6)
    nextQ=[1,3,0,2,1,3];
    TUT_GRID.forEach((row,r)=>row.forEach((col,c)=>{if(col>=0)grid[idx(r,c)]={id:++tileId,color:col,r,c}}));
    $('modeTag').textContent='Tutorial';render();return}
  fillQueue();
  // Startaufstellung ohne fertige Gruppen
  let placed=0;const startN=mode==='level'?(LV.start||8):START_TILES[N],startC=mode==='level'?LV.colors:(N<=4?4:N>=7?5:4);
  while(placed<startN){
    const i=Math.floor(rp()*N*N);if(grid[i])continue;
    grid[i]={id:++tileId,color:Math.floor(rc()*startC),r:Math.floor(i/N),c:i%N};
    if(findGroups().cells.length){grid[i]=null;continue}
    placed++;
  }
  // Hindernis-Felder: Start mit Felsen (6×6: 2, 7×7/8×8: 3)
  if(obst()){let k=N>=7?3:2;while(k>0){const i=Math.floor(rp()*N*N);if(grid[i])continue;grid[i]={id:++tileId,color:ROCK,r:Math.floor(i/N),c:i%N};k--}}
  render();
}

