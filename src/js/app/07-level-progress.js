// ---------- Level-Fortschritt ----------
function loadLP(){try{const d=JSON.parse(localStorage.getItem('kippwerk_levels')||'{}');return d&&typeof d==='object'&&!Array.isArray(d)?d:{}}catch(e){return{}}}
let LP=loadLP();
function saveLP(){try{localStorage.setItem('kippwerk_levels',JSON.stringify(LP))}catch(e){}}
// Etappen-Bezeichnung: Welt-Etappe, z. B. Level 13 → „2-3“
const stg=n=>Math.ceil(n/10)+'-'+((n-1)%10+1);
const unlocked=()=>{let n=1;while(LP[n]&&n<LEVELS.length)n++;return LP[n]?LEVELS.length:n};
const totalStars=()=>Object.values(LP).reduce((a,b)=>a+b,0);
