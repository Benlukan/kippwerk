// ---------- Schutz gegen geschummelte Ranglisten-Einträge ----------
// 1) Jeder Punktgewinn wird in einem geschlossenen Protokoll nachgerechnet (Gruppengröße² × 10 × Combo).
//    Weicht der Punktestand am Ende davon ab (z. B. durch Speicher-Manipulation), wird nichts gemeldet.
// 2) Noch nicht gesendete Ergebnisse liegen signiert im Speicher – nachträglich geänderte Werte werden verworfen.
// 3) Zusätzlich in der Play Console: Grenzwerte je Rangliste + Manipulationsschutz (siehe docs/play-store.md).
const Audit=(()=>{
  let sc=0,cl=0,mv=0,bad='',on=false;
  const K=[0x6b69,0x7070,0x7765,0x726b].map((x,i)=>x^(0x2d1f*(i+1)));
  function h32(str,seed){let h=seed>>>0;for(let i=0;i<str.length;i++){h^=str.charCodeAt(i);h=Math.imul(h,0x01000193)>>>0;h^=h>>>13}return h>>>0}
  const sign=(...a)=>{const s=a.join('|');return h32(s,K[0]^K[2]).toString(36)+h32(s,K[1]^K[3]).toString(36)};
  return{
    reset(){sc=0;cl=0;mv=0;bad='';on=true},
    move(){mv++},
    step(sizes,chain,gained,cells){
      if(!on)return;
      if(!(chain>=1&&chain<=30))bad=bad||'chain';
      let sum=0,n=0;for(const z of sizes){if(!(z>=3&&z<=N*N))bad=bad||'size';sum+=z*z*10*chain;n+=z}
      if(sum!==gained||n<cells||cells<3)bad=bad||'sum';   // Prisma-Steine können zu zwei Gruppen gehören → n ≥ cells
      sc+=gained;cl+=cells},
    ok(score,cleared,moves,maxMoves){
      if(!on)return false;
      return !bad&&sc===score&&cl===cleared&&mv===moves&&(!maxMoves||moves<=maxMoves)&&score>0},
    get reason(){return bad||'mismatch'},
    sign,
    off(){on=false}};
})();
