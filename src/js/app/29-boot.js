// Musik während Werbung leise
{const sr=Ads.showReward,si=Ads.showInter;
 Ads.showReward=async(...a)=>{Music.hold(true);try{return await sr(...a)}finally{Music.hold(false)}};
 Ads.showInter=async(...a)=>{Music.hold(true);try{return await si(...a)}finally{Music.hold(false)}};}
try{if(localStorage.getItem('kippwerk_i18n_collect'))I18N.collect(true)}catch(e){}
I18N.init(settings.lang,I18N_EN,I18N_PATS);applyLang(true);
applyKippi();collBadge();setTimeout(()=>{Unlocks.check();applyKippi()},2500);setTimeout(newsAfterUpdate,1200);   // Feiertage, Welten, Serie … (Toast bei Neuem)
window.__kw={unlocks:Unlocks,badges:Badges,openCollection,holiday:Holiday,fly:Fly,games:Games,i18n:I18N,auditOk:()=>Audit.ok(score,cleared,history.length),music:Music,startTutorial,burst,setLevel:n=>{level=n;render()},handleBack,move,LEVELS,comboFx,openHelp,get ST(){return ST},checkStreak,initStreak,get N(){return N},get state(){return{combos,bestChain,score,level,over,busy,cleared,movesLeft,mode,lvNo,prog,LP,filled:grid.filter(Boolean).length,
  layout:grid.map(t=>t?t.color:'-').join(''),queue:nextQ.join('')}}};
