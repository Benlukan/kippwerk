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
// Etappen-Karte: alle Welten als ein durchgehender Pfad (1-1 unten … 10-10 oben, darüber „Bald verfügbar“).
// Jede Welt hat einen eigenen Weltton (aus den Design-Farben) mit weichen Hügeln und einem Motiv am Rand;
// die Töne gehen fließend ineinander über. Kopfzeile folgt beim Scrollen der Welt im Blick, ‹ › springt zur Nachbarwelt.
const WTONE=['var(--c2)','color-mix(in srgb,var(--c1) 70%,var(--c0))','var(--c0)','var(--c3)','color-mix(in srgb,var(--c1) 50%,var(--muted))',
  'var(--c4)','color-mix(in srgb,var(--c3) 55%,var(--c4))','color-mix(in srgb,var(--c3) 50%,var(--c2))','color-mix(in srgb,var(--c0) 55%,var(--c4))','var(--c1)'];
const wTone=w=>WTONE[w%WTONE.length];
const tint=(w,p)=>`color-mix(in srgb,${wTone(w)} ${p}%,var(--bg))`;
const NWORLDS=()=>Math.ceil(LEVELS.length/10);
const MAP={STEP:78,GAP:150,BOT:150,TOP:190,H:0,wy:[]};
let mapWorld=0;
function mapMotif(w,x,y,s,f){            // kleines Weltmotiv (Busch, Fels, Farbpunkte, Zahnrad, Blöcke, Prisma, Wolke, Blasen, Stern, Raute)
  const t=`translate(${x} ${y}) scale(${s})`;
  switch(w%10){
    case 0:return `<g transform="${t}" style="fill:${f}"><circle cx="-7" cy="2" r="7"/><circle cx="4" cy="-2" r="9"/><circle cx="12" cy="4" r="6"/></g>`;
    case 1:return `<g transform="${t}" style="fill:${f}"><path d="M-14 8 L-9 -6 L2 -10 L12 -3 L14 8 Z"/></g>`;
    case 2:return `<g transform="${t}">${[0,1,2,3,4].map(k=>`<circle cx="${(k-2)*7}" cy="${(k%2)*6-3}" r="4" style="fill:color-mix(in srgb,var(--c${k}) 45%,var(--bg))"/>`).join('')}</g>`;
    case 3:return `<g transform="${t}" style="fill:none;stroke:${f}"><circle r="10" stroke-width="6" stroke-dasharray="4 3.85"/><circle r="5" stroke-width="3"/></g>`;
    case 4:return `<g transform="${t}" style="fill:${f}"><rect x="-14" y="0" width="13" height="9" rx="3"/><rect x="1" y="0" width="13" height="9" rx="3"/><rect x="-6" y="-11" width="13" height="9" rx="3"/></g>`;
    case 5:return `<g transform="${t}" style="fill:${f}"><path d="M0 -12 L11 8 L-11 8 Z" stroke-linejoin="round" style="stroke:${f}" stroke-width="3"/></g>`;
    case 6:return `<g transform="${t}" style="fill:${f}"><rect x="-15" y="-2" width="30" height="10" rx="5"/><circle cx="-3" cy="-3" r="7"/><circle cx="6" cy="-1" r="5"/></g>`;
    case 7:return `<g transform="${t}" style="fill:none;stroke:${f}" stroke-width="2.5"><circle r="7"/><circle cx="11" cy="-9" r="4"/><circle cx="-9" cy="-12" r="3"/></g>`;
    case 8:return `<g transform="${t}" style="fill:${f}"><path d="M0 -11 L3 -3 L11 -3 L5 2 L7 10 L0 5 L-7 10 L-5 2 L-11 -3 L-3 -3 Z"/></g>`;
    default:return `<g transform="${t}" style="fill:${f}"><rect x="-6" y="-6" width="12" height="12" rx="2" transform="rotate(45)"/><rect x="10" y="4" width="6" height="6" rx="1" transform="rotate(45 13 7)"/></g>`}}
function renderMap(){
  const un=unlocked(),nw=NWORLDS(),N=LEVELS.length,{STEP,GAP,BOT,TOP}=MAP;
  const H=MAP.H=BOT+(N-1)*STEP+(nw-1)*GAP+TOP;
  const X=i=>50+Math.sin(i*1.05+0.4)*30,Y=i=>H-BOT-i*STEP-Math.floor(i/10)*GAP;   // x in %, y in px (i=0 = 1-1 unten)
  const W=Math.max(280,Math.min(390,$('lvScroll').clientWidth||360)),px=x=>x*W/100;
  const seg=(i)=>{const my=(Y(i-1)+Y(i))/2;return ` C${X(i-1)} ${my} ${X(i)} ${my} ${X(i)} ${Y(i)}`};
  let d=`M${X(0)} ${Y(0)+70}L${X(0)} ${Y(0)}`;for(let i=1;i<N;i++)d+=seg(i);
  d+=` C${X(N-1)} ${Y(N-1)-50} 50 ${Y(N-1)-60} 50 ${Y(N-1)-110}`;
  let done='';for(let i=1;i<N;i++)if(LP[i]&&LP[i+1])done+=`<path d="M${X(i-1)} ${Y(i-1)}${seg(i)}" class="pdone" style="stroke:${wTone(Math.floor(i/10))}"/>`;
  // Hintergrund je Welt ein eigener Block (sehr hohe SVGs werden von WebViews abgeschnitten):
  // Weltton flächig, an den Grenzen weicher Übergang zum Nachbarton, dazu Hügel und Motive (px-Koordinaten im Block)
  MAP.wy=[];let bg='';
  const mid=(w,v)=>`color-mix(in srgb,${tint(w,9)} 50%,${tint(v,9)})`;
  for(let w=0;w<nw;w++){
    const yb=Y(w*10)+70,yt=Y(Math.min(N-1,w*10+9))-70;MAP.wy.push([yt,yb]);
    const B0=w===0?H:(Y(w*10-1)+Y(w*10))/2,T0=w===nw-1?0:(Y(w*10+9)+Y(w*10+10))/2,bh=B0-T0;
    const r=k=>((Math.sin((w+1)*12.9898+k*78.233)*43758.5453)%1+1)%1;          // fester Zufall je Welt
    let g='';
    for(let k=0;k<3;k++){const left=(k+w)%2===0,hy=(yb-T0)-k*(yb-yt)/3-r(k)*60,rx=90+r(k+3)*60,ry=60+r(k+6)*40;
      g+=`<ellipse cx="${left?-20+r(k+9)*30:W+20-r(k+9)*30}" cy="${hy}" rx="${rx}" ry="${ry}" style="fill:${tint(w,16)}"/>`
        +`<ellipse cx="${left?-40+r(k+12)*20:W+40-r(k+12)*20}" cy="${hy+ry*.45}" rx="${rx*.8}" ry="${ry*.6}" style="fill:${tint(w,22)}"/>`;
      g+=mapMotif(w,left?px(9):px(91),hy-ry*.55,1.1,tint(w,50))}
    for(let k=0;k<2;k++){const left=(k+w)%2===1,my=(yb-T0)-(k+.5)*(yb-yt)/2+r(k+20)*40;g+=mapMotif(w,left?px(8):px(92),my,.8,tint(w,38))}
    const top=w<nw-1?mid(w,w+1):tint(w,9),bot=w>0?mid(w,w-1):tint(w,9);
    bg+=`<div class="mbg" style="top:${T0}px;height:${bh}px;background:linear-gradient(to bottom,${top},${tint(w,9)} 140px,${tint(w,9)} calc(100% - 140px),${bot})"><svg width="${W}" height="${bh}" viewBox="0 0 ${W} ${bh}" aria-hidden="true">${g}</svg></div>`}
  // Knoten
  let nodes='';
  for(let i=0;i<N;i++){const n=i+1,s=LP[n]||0,lock=n>un,boss=n%10===0,cur=n===un&&!LP[n],w=Math.floor(i/10);
    const st=lock?'':`<small>${'★'.repeat(s)}<span class="off">${'★'.repeat(3-s)}</span></small>`;
    nodes+=`<button class="lvbtn mnode${lock?' locked':''}${boss?' boss':''}${cur?' cur':''}${s?' done':''}${s===3?' s3':''}" data-n="${n}" ${lock?'disabled':''} style="left:${X(i)}%;top:${Y(i)}px;--wc:${wTone(w)}" aria-label="Level ${stg(n)}">${lock?'🔒':(boss?'<i class="crown">👑</i>':'')+((n-1)%10+1)}${st}</button>`;
    if(cur)nodes+=`<span class="mkippi" style="left:${X(i)}%;top:${Y(i)}px">${kippiSvg(Unlocks.has('kippi',settings.kippi)?settings.kippi:'none')}</span>`}
  // Weltschilder: unten Welt 1, zwischen den Welten der Eingang zur nächsten, oben „Bald verfügbar“
  const wStars=w=>{let a=0;for(let n=w*10+1;n<=Math.min(N,w*10+10);n++)a+=LP[n]||0;return a};
  let signs='';
  for(let w=0;w<nw;w++){const first=w*10+1,open=first<=un;
    const y=w===0?Y(0)+95:(Y(w*10-1)+Y(w*10))/2,x=w===0?X(0):Math.max(32,Math.min(68,(X(w*10-1)+X(w*10))/2));
    signs+=`<div class="mgate${open?' open':''}" style="top:${y}px;left:${x}%;--wc:${wTone(w)}"><b>${open?'':'🔒 '}${I18N.tr('Welt '+(w+1))} · ${I18N.tr(WORLDS[w]||'')}</b><small>${open?'⭐ '+wStars(w)+' / 30':I18N.tr('Level '+stg(first-1)+' bestehen')}</small></div>`}
  signs+=`<div class="mgate soon" style="top:${Y(N-1)-120}px;left:50%"><b>🔜 ${I18N.tr('Bald verfügbar')}</b><small>${I18N.tr('Neue Welten folgen per Update')}</small></div>`;
  const g=$('lvGrid');g.className='lvmap';g.style.height=H+'px';
  g.innerHTML=`${bg}<svg class="mpath" viewBox="0 0 100 ${H}" preserveAspectRatio="none" aria-hidden="true"><path d="${d}" class="pbase"/><path d="${d}" class="pdots"/>${done}</svg>${signs}${nodes}`;
  const cn=g.querySelector('.mnode.cur')||[...g.querySelectorAll('.mnode:not(.locked)')].pop();
  requestAnimationFrame(()=>{const sc=$('lvScroll');sc.scrollTop=cn?Math.max(0,cn.offsetTop-sc.clientHeight/2):H;mapSync()})}
function mapSync(){                      // Kopfzeile = Welt in der Bildmitte
  const sc=$('lvScroll'),c=sc.scrollTop+sc.clientHeight/2,nw=MAP.wy.length;if(!nw)return;
  let w=0;for(let k=0;k<nw;k++)if(c<=MAP.wy[k][1]+MAP.GAP/2)w=k;
  if(w===mapWorld&&$('lvWorld').dataset.w==w)return;mapWorld=w;$('lvWorld').dataset.w=w;
  let a=0;for(let n=w*10+1;n<=Math.min(LEVELS.length,w*10+10);n++)a+=LP[n]||0;
  $('lvWorld').textContent=I18N.tr('Welt '+(w+1))+' · '+I18N.tr(WORLDS[w]||'');
  $('lvWorldStars').textContent='⭐ '+a+' / 30';$('levelsOv').style.setProperty('--wc',wTone(w));
  $('lvPrev').disabled=w<=0;$('lvNext').disabled=w>=nw-1||unlocked()<(w+1)*10+1}
function mapGo(w){const sc=$('lvScroll'),[yt,yb]=MAP.wy[w]||[0,0];sc.scrollTo({top:Math.max(0,(yt+yb)/2-sc.clientHeight/2),behavior:'smooth'})}
function openLevels(){
  $('levelsTotal').innerHTML=`⭐ ${totalStars()} / ${LEVELS.length*3} ${I18N.tr('Sterne')}`;
  ['startOv','overOv','lvlOv'].forEach(i=>$(i).classList.add('hidden'));$('levelsOv').classList.remove('hidden');renderMap();
}
$('lvPrev').onclick=()=>{if(mapWorld>0)mapGo(mapWorld-1)};
$('lvNext').onclick=()=>{if(mapWorld<NWORLDS()-1)mapGo(mapWorld+1)};
$('lvScroll').addEventListener('scroll',()=>mapSync(),{passive:true});

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

