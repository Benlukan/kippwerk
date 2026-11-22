// ---------- Top 5 im Hauptmenü: Tagesspiel oder Endlos (Feldgröße wie im Menü) – Play Games / Game Center ----------
// Google-„Heute“ = Spieltag (siehe todayKey): Wechsel um Mitternacht Pazifikzeit
const googleDayStart=()=>dayStartTime();
const Top5=(()=>{
  const SK='kippwerk_top5span',BK='kippwerk_top5board',cache={};let span='day',board='daily';try{span=localStorage.getItem(SK)||'day';board=localStorage.getItem(BK)||'daily'}catch(e){}
  const key=()=>board==='daily'?'daily':'e'+curBoard();
  const esc=x=>String(x).replace(/[&<>"]/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;'}[c]));
  const EMPTY={day:'Heute hat noch niemand gespielt – sei die/der Erste!',week:()=>weekMonOf(key())?'Diese Woche (Mo–So) noch keine Ergebnisse.':'Diese Woche (So–Sa) noch keine Ergebnisse.',all:'Noch keine Ergebnisse.'};
  const ck=sp=>key()+'|'+sp;
  const cap=t=>t.charAt(0).toUpperCase()+t.slice(1);
  const SPANS={day:()=>'heute',week:k=>weekMonOf(k||key())?'Woche':'Woche (So–Sa)',all:()=>'gesamt'};
  const row=(x,me)=>{const r=+x.rank;return `<div class="t5-row${me?' me':''}${me==='extra'?' t5-me':''}"><span${r>3||!(r>0)?' class="m"':''}>${r>0?(['🥇','🥈','🥉'][r-1]||r+'.'):'–'}</span><span class="n">${esc(x.name||'Spieler')}${me&&x.name!=='Du'?' (du)':''}${board==='daily'&&ScoreTag.date(x.tag)?' <small class="t5d">'+ScoreTag.date(x.tag)+'</small>':''}</span><span class="r">${(+x.score).toLocaleString(LOC())}</span></div>`};
  function draw(d){const L=$('top5List');
    if(!d){L.innerHTML='<div class="t5-msg">⏳ Lade Rangliste …</div>';return}
    if(d.err){L.innerHTML='<div class="t5-msg">📡 Rangliste gerade nicht erreichbar.</div>';return}
    const myId=d.me&&d.me.playerId,ent=d.entries||[];
    if(!ent.length&&!d.me){L.innerHTML=`<div class="t5-msg">${I18N.tr(typeof EMPTY[span]==='function'?EMPTY[span]():EMPTY[span])}</div>`;return}
    let h=ent.map(x=>row(x,myId&&x.playerId===myId)).join('');
    if(d.me&&!ent.some(x=>x.playerId===myId))h+=row({...d.me,name:playerName||'Du'},'extra');
    if(d.me&&!(d.me.rank>0))h+=`<div class="t5-msg">${'🔒 Nur für dich sichtbar – Profil in „Google Play Spiele“ auf „Für alle sichtbar“ stellen.'}</div>`;
    L.innerHTML=h}
  async function refresh(force){
    const box=$('homeTop5');if(!Games.available){box.style.display='none';return}
    box.style.display='';
    $('top5PickTxt').textContent=(board==='daily'?I18N.tr('Tagesspiel'):I18N.tr('Endlos')+' '+bLabel(curBoard()))+' · '+cap(I18N.tr(SPANS[span]()));
    const t=span==='day'&&googleDayStart();$('top5Note').textContent=t?I18N.tr('ab')+' '+t:'';
    if(board!=='daily'&&!Games.hasId(key())){$('top5List').innerHTML=`<div class="t5-msg">${I18N.tr('🌍 Für dieses Feld gibt es noch keine weltweite Rangliste.')}</div>`;return}
    if(!Games.signedIn){$('top5List').innerHTML=`<div class="t5-msg">🎮 Bei ${Games.label} anmelden, um die Top 5 zu sehen ›</div>`;return}
    const c=cache[ck(span)];if(c&&!force&&Date.now()-c.t<60000){draw(c.d);return}
    if(!c)draw(null);else draw(c.d);
    const want=span,wk=key(),daily=wk==='daily';let d;try{d=await boardTop(wk,want,5)}catch(e){d={err:1}}
    if(!d.err){cache[wk+'|'+want]={t:Date.now(),d};if(daily)Awards.note(want,d.me)}if(want===span&&wk===key())draw(d);
    // Auszeichnungen (Tagesspiel Heute/Woche) auch dann aktuell halten, wenn gerade Endlos angezeigt wird
    for(const other of ['day','week'])if(!(cache['daily|'+other]&&Date.now()-cache['daily|'+other].t<60000)&&!(daily&&other===want))boardTop('daily',other,5).then(o=>{cache['daily|'+other]={t:Date.now(),d:o};Awards.note(other,o.me)}).catch(()=>{})}
  // ein Umschalter: Liste (Tagesspiel / Endlos-Feld) und Zeitraum zusammen
  $('top5Pick').onclick=e=>{e.stopPropagation();if(PopMenu.isOpen){PopMenu.close();return}const en=I18N.tr('Endlos')+' '+bLabel(curBoard()),it=[{sep:1,t:'📅 '+I18N.tr('Tagesspiel')}];
    for(const sp of ['day','week','all'])it.push({v:'daily|'+sp,t:cap(I18N.tr(SPANS[sp]('daily'))),on:board==='daily'&&span===sp});
    it.push({sep:1,t:'∞ '+en});for(const sp of ['day','week','all'])it.push({v:'endless|'+sp,t:cap(I18N.tr(SPANS[sp]('e'+curBoard()))),on:board!=='daily'&&span===sp});
    PopMenu.open(e.currentTarget,it,v=>{[board,span]=v.split('|');try{localStorage.setItem(SK,span);localStorage.setItem(BK,board)}catch(x){}refresh()})};
  // „Ganze Rangliste“ öffnet dieselbe Liste in 🏆 (gleiche Liste, gleicher Zeitraum)
  const open=async()=>{if(!Games.signedIn){if(await Games.signIn())refresh(true);return}
    openScores(board==='daily'?'daily':'endless');if(board==='daily')scoresPeriod=span;else endlessSpan=span;scoresSize=curBoard();renderScores()};
  $('top5List').onclick=open;$('top5More').onclick=open;
  return{refresh,get span(){return span},clear(){for(const k in cache)delete cache[k]}};
})();
