// ---------- Werbung (nur in der Android-/iOS-App) ----------
// Android: eigene AdMob-IDs eingetragen. iOS: noch Google-Test-IDs (iOS-App in AdMob folgt später).
// testing:true  → das Plugin zeigt Googles Testanzeigen (für geschlossenen Test / Entwicklung)
// testing:false → echte Anzeigen. ERST beim öffentlichen Play-Store-Start umstellen!
const ADS_CONFIG={
  testing:true,
  rewarded:{android:'ca-app-pub-8873350241195536/5053799865',ios:'ca-app-pub-3940256099942544/1712485313'},
  interstitial:{android:'ca-app-pub-8873350241195536/2160218226',ios:'ca-app-pub-3940256099942544/4411468910'},
  interstitialEvery:3,  // Vollbild-Werbung nach jeder n-ten Endlos-Runde (0 = aus)
  rescueTiles:6,        // so viele Steine entfernt die Rettung
  rescueMoves:5         // so viele Extra-Züge gibt es im Level-Modus
};
const Ads=(()=>{
  const C=window.Capacitor;
  const native=!!(C&&C.isNativePlatform&&C.isNativePlatform());
  const platform=native?C.getPlatform():'web';
  const P=native?((C.Plugins&&C.Plugins.AdMob)||(C.registerPlugin&&C.registerPlugin('AdMob'))):null;
  let ready=false,rewardLoaded=false,interLoaded=false,privacyRequired=false;
  const id=k=>ADS_CONFIG[k][platform];
  async function loadReward(){if(!ready)return;try{await P.prepareRewardVideoAd({adId:id('rewarded'),isTesting:ADS_CONFIG.testing});rewardLoaded=true}catch(e){rewardLoaded=false;setTimeout(loadReward,60000)}}
  async function loadInter(){if(!ready||!ADS_CONFIG.interstitialEvery)return;try{await P.prepareInterstitial({adId:id('interstitial'),isTesting:ADS_CONFIG.testing});interLoaded=true}catch(e){interLoaded=false;setTimeout(loadInter,60000)}}
  async function init(onReady){
    if(!P)return;
    try{
      let info=await P.requestConsentInfo();                       // EU-Einwilligung (Google UMP)
      if(info.isConsentFormAvailable&&info.status==='REQUIRED')info=await P.showConsentForm();
      privacyRequired=info.privacyOptionsRequirementStatus==='REQUIRED';
      if(platform==='ios'){try{const t=await P.trackingAuthorizationStatus();if(t.status==='notDetermined')await P.requestTrackingAuthorization()}catch(e){}}
      if(info.canRequestAds===false){onReady&&onReady();return}
      await P.initialize({initializeForTesting:ADS_CONFIG.testing});
      ready=true;onReady&&onReady();
      loadReward();loadInter();
    }catch(e){console.warn('Werbung nicht verfügbar',e);onReady&&onReady()}
  }
  function showReward(){
    if(window.KW_MOCK_ADS)return Promise.resolve(window.KW_MOCK_ADS==='reward');
    return new Promise(async resolve=>{
      let earned=false,done=false;const hs=[];
      const finish=v=>{if(done)return;done=true;hs.forEach(h=>{try{h.remove()}catch(e){}});rewardLoaded=false;loadReward();resolve(v)};
      try{
        hs.push(await P.addListener('onRewardedVideoAdReward',()=>{earned=true}));
        hs.push(await P.addListener('onRewardedVideoAdDismissed',()=>setTimeout(()=>finish(earned),80)));
        hs.push(await P.addListener('onRewardedVideoAdFailedToShow',()=>finish(false)));
        P.showRewardVideoAd().then(()=>{earned=true}).catch(()=>finish(false));
      }catch(e){finish(false)}
    });
  }
  async function showInter(){if(!interLoaded)return;interLoaded=false;try{await P.showInterstitial()}catch(e){}loadInter()}
  return{native,init,showReward,showInter,
    get canRescue(){return !!window.KW_MOCK_ADS||(ready&&rewardLoaded)},
    get privacyRequired(){return privacyRequired},
    privacy(){if(P)P.showPrivacyOptionsForm().catch(()=>{})}};
})();
// Extra-Leben (❤): gibt es für ULTRA-Combos (×6+), max. 9; einsetzbar wie die Video-Rettung (nicht im Tagesspiel)
let lives=0;try{lives=Math.max(0,+(localStorage.getItem('kippwerk_lives')||0))}catch(e){}
function saveLives(){try{localStorage.setItem('kippwerk_lives',String(lives));localStorage.setItem('kippwerk_lives_at',String(Date.now()))}catch(e){}}
function gainLife(){if(lives>=9){setTimeout(()=>toast('❤ Du hast schon 9 Extra-Leben – mehr passen nicht in den Vorrat.'),1300);return}
  lives++;saveLives();setTimeout(()=>{banner('+1 ❤','combo c6','EXTRA-LEBEN');haptic('win')},1500)}
let rescued=false,gamesDone=0,pendingInter=false,rescueKind='full';
let lvNo=1,LV=null,prog=null;

