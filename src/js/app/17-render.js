// ---------- Render ----------
function place(el,t){el.style.transform=`translate(calc(${t.c} * (100% + var(--gap))), calc(${t.r} * (100% + var(--gap))))`}
function makeEl(t){
  const el=document.createElement('div');el.className='tile spawn'+(t.color===WILD?' wild':'')+(t.color===ROCK?' rock':'');
  const inner=document.createElement('div');inner.className='in';
  if(t.color===WILD){inner.textContent='✦';el.style.setProperty('--glow','#ffffff55')}
  else if(t.color===ROCK){el.style.setProperty('--glow','transparent')}
  else{inner.style.background=`linear-gradient(160deg, ${COLORS[t.color]}, color-mix(in srgb, ${COLORS[t.color]} 70%, #000))`;
    el.style.setProperty('--glow',`color-mix(in srgb, ${COLORS[t.color]} 40%, transparent)`);inner.textContent=SYMBOLS[t.color]}
  el.appendChild(inner);
  el.style.transition='none';place(el,t);tilesEl.appendChild(el);
  el.offsetWidth;el.style.transition='';
  setTimeout(()=>el.classList.remove('spawn'),260);
  return el;
}
function render(){
  for(const t of grid){if(!t)continue;
    let el=els.get(t.id);
    if(!el){el=makeEl(t);els.set(t.id,el)}else place(el,t);
  }
  $('score').textContent=score.toLocaleString(LOC());
  const isLv=mode==='level';
  $('best').style.display=isLv?'none':'';$('goalHud').style.display=isLv?'':'none';
  const od=mode==='daily'&&practice&&loadDaily();
  $('best').parentNode.style.display=mode==='daily'&&!od?'none':'';$('hud').classList.toggle('three',mode==='daily'&&!od);
  $('bestLabel').textContent=isLv?'Ziel':od?'Gewertet':'Rekord';
  if(isLv)$('goalHud').innerHTML=goalHud();
  else if(mode==='daily'){if(od)$('best').textContent=od.score.toLocaleString(LOC())}
  else $('best').textContent=Math.max(best,score).toLocaleString(LOC());
  if(mode!=='endless'){const tot=isLv?LV.moves:DAILY_MOVES;$('levelLabel').textContent='Züge';$('level').textContent=movesLeft;$('lvlbar').style.width=Math.min(100,movesLeft/tot*100)+'%'}
  else{$('levelLabel').textContent='Level';$('level').textContent=level;$('lvlbar').style.width=((cleared%perLevel())/perLevel()*100)+'%'}
  const nx=$('next');nx.innerHTML='';
  nextQ.slice(0,spawnCount()).forEach(c=>{
    const m=document.createElement('div');m.className='mini';
    if(c===WILD){m.classList.add('w');m.style.background='conic-gradient(var(--c0),var(--c1),var(--c2),var(--c3),var(--c4),var(--c5),var(--c0))';m.textContent='✦';m.style.color='#fff'}
    else if(c===ROCK){m.style.background='repeating-linear-gradient(135deg,#5b6079 0 4px,#4a4e66 4px 8px)';m.textContent=''}
    else{m.style.background=COLORS[c];m.textContent=SYMBOLS[c]}
    nx.appendChild(m);
  });
  renderInfo();
}
const LEGEND='<div class="ib-legend"><span><i style="background:var(--line)"></i>nichts</span><span><i style="background:var(--c3)"></i>abgeräumt</span><span><i style="background:var(--c2)"></i>×2</span><span><i style="background:var(--c1)"></i>×3</span><span><i style="background:var(--c0)"></i>×4</span><span><i style="background:var(--c4)"></i>×5</span><span><i style="background:#fff"></i>×6+</span><span>· ❓</span></div>';
// Combo-Zähler: kurze Hervorhebung bei jeder neuen Combo
function bumpCombo(t){setTimeout(()=>{const e=document.querySelector('#infobar .cc[data-t="'+t+'"] b');if(e){e.classList.remove('bump');void e.offsetWidth;e.classList.add('bump')}},0)}
const comboSummary=()=>combos[0]?`${combos[0]} ${combos[0]===1?'Combo':'Combos'} (`+[6,5,4,3,2].filter(k=>combos[k]).map(k=>combos[k]+'× '+COMBOS[k].replace('!','')).join(', ')+')':'keine Combo';
function renderInfo(){
  const ib=$('infobar');if(!ib||getComputedStyle(ib).display==='none')return;
  const CC=[[1,'Abgeräumt','k1'],[2,'Good','k2'],[3,'Super','k3'],[4,'Mega','k4'],[5,'Monster','k5'],[6,'Ultra','k6']];
  const counter=`<div class="ib-box cbox"><small><span>Combos${combos[0]?' '+combos[0]+' · beste ×'+bestChain:''} · ${cleared} Steine weg${mode==='endless'?' · noch '+(perLevel()-cleared%perLevel())+' bis Level '+(level+1):''}</span><span class="lives" title="Extra-Leben">❤ ${lives}</span></small><div class="ccs">${CC.map(([i,l,k])=>`<div class="cc ${k}${combos[i]?' on':''}" data-t="${i}"><b>${combos[i]}</b><small>${l}</small></div>`).join('')}</div></div>`;
  const tile=(l,v)=>`<div class="ib-tile"><small>${l}</small><b>${v}</b></div>`;
  // immer genau `max` Kästchen (2 Zeilen à 20): leere Plätze als Platzhalter → Höhe bleibt konstant, Feld springt nicht
  const dots=(arr,max)=>{const a=arr.slice(-max);return `<div class="ib-dots">${a.map(c=>`<span class="k${Math.min(c,6)}"></span>`).join('')}${'<span class="e"></span>'.repeat(max-a.length)}</div>`};
  let h='';
  if(mode==='level'){
    h+=`<div class="ib-box"><small>Ziele · Etappe ${stg(lvNo)} · jetzt ${movesLeft>=LV.stars[1]?'★★★':movesLeft>=LV.stars[0]?'★★':'★'}</small>`+LV.goals.map(g=>{const s=goalState(g),ok=s.cur>=s.n,pct=Math.min(100,s.n?s.cur/s.n*100:0);
      const t=g.t==='score'?'Punkte':g.t==='color'?'Farbe abräumen':g.t==='chain'?'Combo auslösen':g.t==='rocks'?'Felsen zerbrechen':'Steine abräumen';
      const v=g.t==='chain'?`×${Math.max(1,s.cur)} / ×${s.n}`:`${fmt(Math.min(s.cur,s.n))} / ${fmt(s.n)}`;
      return `<div class="ib-goal${ok?' ok':''}"><span>${goalIcon(g)}</span><span>${t}</span><b>${ok?'✓':v}</b><div class="bar"><i style="width:${pct}%"></i></div></div>`}).join('')+`</div>`;
    h+=counter;
  }else if(mode==='daily'){
    h+=counter;
    h+=`<div class="ib-box tap" data-help="hVerlauf"><small>Dein Raster · Tagesspiel ${dayLabel(dailyNo())}</small>${dots(history,DAILY_MOVES)}${LEGEND}</div>`;
  }else{
    h+=counter;
    h+=`<div class="ib-box tap" data-help="hVerlauf"><small>Verlauf · letzten 40 Züge</small>${dots(history,40)}${LEGEND}</div>`;
  }
  const wide=matchMedia('(min-aspect-ratio:1/1) and (min-width:760px) and (min-height:520px)').matches;
  if(wide)h+=`<div class="ib-box"><small>Steuerung</small><div class="ib-hint" style="text-align:left;margin-top:6px">⌨ Pfeiltasten oder W A S D<br>🖱 Wischen mit gedrückter Maustaste<br>☰ Menü / Pause · ❓ Tippen auf den Verlauf</div></div>`;
  else h+=`<div class="ib-hint" style="visibility:${history.length<3?'visible':'hidden'}">Tipp: Wischen funktioniert überall auf dem Bildschirm</div>`;
  ib.innerHTML=h;
}
addEventListener('resize',()=>{try{renderInfo()}catch(e){}});
function floatText(txt,r,c,color){
  const f=document.createElement('div');f.className='float';f.textContent=txt;f.style.color=color||'#fff';
  f.style.left=`calc(var(--gap) + ${(c+.5)/N*100}%)`;f.style.top=`calc(var(--gap) + ${(r+.5)/N*100}%)`;
  boardEl.appendChild(f);setTimeout(()=>f.remove(),950);
}
// Partikel beim Abräumen – mehr und weiter bei Combos
let ptAlive=0,ptSeed=12345;
const ptRnd=()=>(ptSeed=(ptSeed*1103515245+12345)>>>0)/4294967296;   // eigener Zufall – stört die Spiel-Zufallsfolge nicht
function burst(i,color,chain){
  if(ptAlive>140||document.hidden)return;
  const n=chain>=4?8:chain>=2?6:4,col=color===ROCK?'#9aa0bb':color===WILD?'#ffffff':COLORS[color];
  const r=Math.floor(i/N),c=i%N,reach=26+Math.min(chain,6)*9;
  for(let k=0;k<n;k++){
    const p=document.createElement('i');p.className='pt';const a=ptRnd()*6.2832,d=reach*(.55+ptRnd()*.7);
    p.style.cssText=`left:calc(var(--gap) + ${(c+.5)/N*100}%);top:calc(var(--gap) + ${(r+.5)/N*100}%);background:${col};color:${col};--dx:${(Math.cos(a)*d).toFixed(1)}px;--dy:${(Math.sin(a)*d).toFixed(1)}px`;
    boardEl.appendChild(p);ptAlive++;setTimeout(()=>{p.remove();ptAlive--},800)}}
function banner(txt,cls,sub){const b=document.createElement('div');b.className='banner'+(cls?' '+cls:'');b.textContent=txt;
  if(sub){const s=document.createElement('small');s.textContent=sub;b.appendChild(s)}
  boardEl.appendChild(b);setTimeout(()=>b.remove(),cls==='combo c5'?1650:cls==='combo c4'?1350:1150)}
const COMBOS=[null,null,'GOOD!','SUPER!','MEGA!','MONSTER!','ULTRA!'];
const TIER=n=>Math.min(n,6);   // 2 GOOD · 3 SUPER · 4 MEGA · 5 MONSTER · 6+ ULTRA
function comboFx(n){
  if(n<2)return;const lv=TIER(n);
  banner(COMBOS[lv],'combo c'+lv,'COMBO ×'+n);sfx.combo(Math.min(lv,5));
  if(n>=3)try{Fly.react(n>=6?'ultra':n>=5?'monster':'combo')}catch(e){}
  if(lv>=4){boardEl.classList.remove('flash');void boardEl.offsetWidth;boardEl.classList.add('flash');setTimeout(()=>boardEl.classList.remove('flash'),500)}
  const fx=c=>{boardEl.classList.remove('jolt','quake','ultra');void boardEl.offsetWidth;boardEl.classList.add(c);setTimeout(()=>boardEl.classList.remove(c),820)};
  if(lv>=6)fx('ultra');else if(lv>=5)fx('quake');else if(lv>=4)fx('jolt');
  haptic(lv>=5?'win':lv>=4?'heavy':'medium');
}
const sleep=ms=>new Promise(r=>setTimeout(r,ms));

