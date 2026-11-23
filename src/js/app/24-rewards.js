// ---------- Belohnungen für Tages- und Wochenplätze (Variante A: letzter bekannter Platz) ----------
// Bei jedem Abruf der Rangliste merkt sich die App den eigenen Platz im laufenden Tag / in der laufenden Woche.
// Ist der Zeitraum vorbei, gibt es beim nächsten Start die Belohnung für den zuletzt bekannten Platz.
const Awards=(()=>{
  const RK='kippwerk_rank',AK='kippwerk_awards';
  const J=(k,d)=>{try{return JSON.parse(localStorage.getItem(k)||'null')||d}catch(e){return d}};
  const put=(k,v)=>{try{localStorage.setItem(k,JSON.stringify(v))}catch(e){}};
  const dayKey=()=>todayKey(),weekKey=()=>String(weekOf(dailyNo(),dailyWeekMon()));
  // Belohnungen: [Leben, Abzeichen-Schlüssel]
  const RULES={day:[[1,1,'d1'],[3,0,'d3'],[10,0,'d10']],week:[[1,3,'w1'],[3,1,'w3'],[10,0,'w10']]};
  const BADGE={d1:['👑','Tagessieg'],d3:['🥈','Tag Top 3'],d10:['⭐','Tag Top 10'],w1:['🏆','Wochensieg'],w3:['🥇','Woche Top 3'],w10:['🎖','Woche Top 10']};
  function note(span,me){if(!me||!(me.rank>0)||(span!=='day'&&span!=='week'))return;
    try{PStats.rank(span,+me.rank)}catch(e){}const r=J(RK,{}),key=span==='day'?dayKey():weekKey();r[span]={key,rank:+me.rank,done:r[span]&&r[span].key===key?r[span].done:false};put(RK,r)}
  function check(){const r=J(RK,{}),aw=J(AK,{}),msgs=[];let won=0;
    for(const span of ['day','week']){const x=r[span];if(!x||x.done)continue;
      const cur=span==='day'?dayKey():weekKey();if(x.key===cur)continue;   // Zeitraum läuft noch
      x.done=true;const rule=RULES[span].find(([max])=>x.rank<=max);if(!rule)continue;
      const [,lv,b]=rule;aw[b]=(aw[b]||0)+1;const add=Math.min(lv,9-lives);if(add>0){lives+=add;won+=add}
      msgs.push(`${BADGE[b][0]} ${span==='day'?'Tagesspiel':'Woche'}: Platz ${x.rank}${add>0?` – +${add} ❤`:''}`)}
    put(RK,r);put(AK,aw);if(won)saveLives();
    if(msgs.length)setTimeout(()=>{toast('🎁 Belohnung! '+msgs.join(' · '));sfx.combo(4);haptic('win');try{if(!$('startOv').classList.contains('hidden'))showMenu()}catch(e){}},600);
    return msgs}
  return{note,check,BADGE,all:()=>J(AK,{}),merge(o){const a=J(AK,{});for(const k in o||{})a[k]=Math.max(a[k]||0,o[k]||0);put(AK,a)}};
})();
