// ---------- Top 5 des Tagesspiels im Hauptmenü (Play Games / Game Center) ----------
const Top5=(()=>{
  const SK='kippwerk_top5span',cache={};let span='day';try{span=localStorage.getItem(SK)||'day'}catch(e){}
  const esc=x=>String(x).replace(/[&<>"]/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;'}[c]));
  const EMPTY={day:'Heute hat noch niemand gespielt – sei die/der Erste!',week:'Diese Woche noch keine Ergebnisse.',all:'Noch keine Ergebnisse.'};
  const row=(x,me)=>{const r=+x.rank;return `<div class="t5-row${me?' me':''}${me==='extra'?' t5-me':''}"><span${r>3?' class="m"':''}>${['🥇','🥈','🥉'][r-1]||r+'.'}</span><span class="n">${esc(x.name||'Spieler')}${me&&x.name!=='Du'?' (du)':''}</span><span class="r">${(+x.score).toLocaleString(LOC())}</span></div>`};
  function draw(d){const L=$('top5List');
    if(!d){L.innerHTML='<div class="t5-msg">⏳ Lade Rangliste …</div>';return}
    if(d.err){L.innerHTML='<div class="t5-msg">📡 Rangliste gerade nicht erreichbar.</div>';return}
    const myId=d.me&&d.me.playerId,ent=d.entries||[];
    if(!ent.length){L.innerHTML=`<div class="t5-msg">${EMPTY[span]}</div>`;return}
    let h=ent.map(x=>row(x,myId&&x.playerId===myId)).join('');
    if(d.me&&d.me.rank>0&&!ent.some(x=>x.playerId===myId))h+=row({...d.me,name:playerName||'Du'},'extra');
    L.innerHTML=h}
  async function refresh(force){
    const box=$('homeTop5');if(!Games.available){box.style.display='none';return}
    box.style.display='';$('top5Seg').querySelectorAll('button').forEach(b=>b.classList.toggle('on',b.dataset.p===span));
    if(!Games.signedIn){$('top5List').innerHTML=`<div class="t5-msg">🎮 Bei ${Games.label} anmelden, um die Top 5 zu sehen ›</div>`;return}
    const c=cache[span];if(c&&!force&&Date.now()-c.t<60000){draw(c.d);return}
    if(!c)draw(null);else draw(c.d);
    const want=span;let d;try{d=await Games.top('daily',want,5)}catch(e){d={err:1}}
    if(!d.err){cache[want]={t:Date.now(),d};Awards.note(want,d.me)}if(want===span)draw(d);
    for(const other of ['day','week'])if(other!==want&&!(cache[other]&&Date.now()-cache[other].t<60000))Games.top('daily',other,5).then(o=>{cache[other]={t:Date.now(),d:o};Awards.note(other,o.me)}).catch(()=>{})}
  $('top5Seg').onclick=e=>{const b=e.target.closest('button');if(!b)return;e.stopPropagation();span=b.dataset.p;try{localStorage.setItem(SK,span)}catch(x){}refresh()};
  const open=async()=>{if(!Games.signedIn){if(await Games.signIn())refresh(true);return}Games.show('daily')};
  $('top5List').onclick=open;$('top5More').onclick=open;
  return{refresh,get span(){return span},clear(){for(const k in cache)delete cache[k]}};
})();
