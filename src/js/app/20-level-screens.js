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
  const prev=LP[lvNo]||0;if(st>prev){LP[lvNo]=st;saveLP();if(lvNo%10===0)setTimeout(()=>Unlocks.check(),900)}   // Welt geschafft → Belohnung
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
function openLevels(){
  const un=unlocked();$('levelsTotal').innerHTML=`⭐ ${totalStars()} / ${LEVELS.length*3} Sterne`+(LP[LEVELS.length]?'<br><small style="color:var(--muted)">Alle Welten geschafft – neue Welten folgen per Update</small>':'');
  $('lvGrid').innerHTML=LEVELS.map((l,i)=>{const n=i+1,s=LP[n]||0,lock=n>un,boss=n%10===0;
    let head='';if(i%10===0){const w=i/10,ws=LEVELS.slice(i,i+10).reduce((a,_,j)=>a+(LP[i+j+1]||0),0);head=`<div class="lvworld"><span>Welt ${w+1} · ${WORLDS[w]||''}</span><span>⭐ ${ws}/30</span></div>`}
    return head+`<button class="lvbtn${lock?' locked':''}${boss?' boss':''}${n===un&&!s?' next':''}${s===3?' s3':''}" data-n="${n}" ${lock?'disabled':''}>${lock?'🔒':(boss?'👑':'')+stg(n)}<small>${lock?'&nbsp;':'★'.repeat(s)+'<span class="off">'+'★'.repeat(3-s)+'</span>'}</small></button>`}).join('');
  ['startOv','overOv','lvlOv'].forEach(i=>$(i).classList.add('hidden'));$('levelsOv').classList.remove('hidden');
  const cur=$('lvGrid').querySelector(`[data-n="${Math.min(un,LEVELS.length)}"]`);if(cur)$('lvScroll').scrollTop=Math.max(0,cur.offsetTop-$('lvScroll').offsetTop-120);
}

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
    if(!practice){official={no:dailyNo(),score,chain:bestChain,hist:history,full:reason==='full'};saveDaily(official);sev=streakOnDaily();if(sev)official.streak=sev.cur,saveDaily(official);setTimeout(()=>Unlocks.check(),1500);
      lastEntry={no:dailyNo(),score,chain:bestChain,moves:history.length,cleared,date:fmtDate(),name:playerName||'Spieler',pid:playerId};addScore('daily',lastEntry);if(Audit.ok(score,cleared,history.length,DAILY_MOVES))Games.submit('daily',score,ScoreTag.enc({chain:bestChain,moves:history.length,cleared,day:todayKey()}));else{console.warn('Ergebnis nicht gemeldet:',Audit.reason);Games.note('daily',score,'⛔ '+Audit.reason)}
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
    const sl=sizeList(N);const qualifies=score>0&&(sl.length<TOP||score>sl[sl.length-1].score);
    let rank=0;lastEntry=null;
    if(Audit.ok(score,cleared,history.length))Games.submit('e'+N,score,ScoreTag.enc({chain:bestChain,moves:history.length,cleared,level}));else{console.warn('Ergebnis nicht gemeldet:',Audit.reason);Games.note('e'+N,score,'⛔ '+Audit.reason)}
    if(qualifies){lastEntry={name:playerName||'Spieler',pid:playerId,score,level,chain:bestChain,moves:history.length,cleared,date:fmtDate(),size:N};addScore('endless',lastEntry);rank=sizeList(N).indexOf(lastEntry)+1;}
    best=bestFor(N);
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
  setSize(mode==='endless'&&!tut?(+settings.size||6):6);
  grid=Array(N*N).fill(null);nextQ=[];score=0;cleared=0;level=1;busy=false;over=false;tileId=0;Audit.reset();
  best=bestFor(N);
  movesLeft=mode==='level'?LV.moves:DAILY_MOVES;history=[];bestChain=0;combos=[0,0,0,0,0,0,0];rescued=false;
  prog=mode==='level'?{color:[0,0,0,0,0],chain:0,rocks:0,clear:0}:null;
  $('modeTag').textContent=mode==='daily'?(practice?'Übung ':'Tag ')+dayShort(dailyNo()):mode==='level'?'Etappe '+stg(lvNo):(N!==6?N+'×'+N:'');
  if(mode==='level')for(const[r,c]of(LV.rocks||[]))grid[idx(r,c)]={id:++tileId,color:ROCK,r,c};
  if(tut){   // feste Aufstellung für das Tutorial (6×6)
    nextQ=[1,3,0,2,1,3];
    TUT_GRID.forEach((row,r)=>row.forEach((col,c)=>{if(col>=0)grid[idx(r,c)]={id:++tileId,color:col,r,c}}));
    $('modeTag').textContent='Tutorial';render();return}
  fillQueue();
  // Startaufstellung ohne fertige Gruppen
  let placed=0;const startN=mode==='level'?(LV.start||8):START_TILES[N],startC=mode==='level'?LV.colors:(N>=7?5:4);
  while(placed<startN){
    const i=Math.floor(rp()*N*N);if(grid[i])continue;
    grid[i]={id:++tileId,color:Math.floor(rc()*startC),r:Math.floor(i/N),c:i%N};
    if(findGroups().cells.length){grid[i]=null;continue}
    placed++;
  }
  render();
}

