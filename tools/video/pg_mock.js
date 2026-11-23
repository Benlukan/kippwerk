(()=>{if(!/kippwerk\/www/.test(location.pathname))return;
const t=()=>new Date(Date.now()-7*36e5).toISOString().slice(0,10).replace(/-/g,'');
const P=[['Mia',3420,6,92],['Lena',3180,5,88],['Tom',2950,5,81],['Jonas',2710,4,77],['Ella',2490,4,70],['Noah',2260,3,66],['Ben',2010,3,61],['Sofia',1840,3,57]];
const E=(f,lv)=>P.map(([n,s,c,cl],i)=>({rank:i+1,name:n,score:s*f,playerId:n==='Lena'?'g-me':'p'+i,tag:`c${c}m40s${cl}${lv?'l'+(lv-i):''}d${t()}`}));
const PG={initialize:async()=>{},signIn:async()=>({signedIn:true,player:{playerId:'g-me',displayName:'Lena'}}),submitScore:async()=>{},
 loadTopScores:async(o)=>{const daily=/QBQ$|Q[B-D][g-zA]$/.test(o.leaderboardId)&&!/QBA$|QAg$|QAw$|QAQ$/.test(o.leaderboardId);const f=daily?1:8,e=E(f,daily?0:24);return{entries:e.slice(0,o.maxResults||5),me:e[1]}},
 unlockAchievement:async()=>{},incrementAchievement:async()=>{},showLeaderboard:async()=>{},showAllLeaderboards:async()=>{},addListener:()=>({remove(){}})};
window.Capacitor={isNativePlatform:()=>true,getPlatform:()=>'android',Plugins:{PlayGames:PG},registerPlugin:()=>new Proxy({},{get:(t,k)=>k==='then'?undefined:()=>Promise.resolve({})})};})();