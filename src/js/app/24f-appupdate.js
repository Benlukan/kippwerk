// ---------- Hinweis auf neue App-Version (Google Play In-App-Update · App Store) ----------
// Android: flexibles Update – lädt im Hintergrund, man spielt weiter, danach „Neu starten“.
// iOS: nur Hinweis + Link in den App Store (braucht IOS_APP_ID; leer = auf iOS kein Hinweis).
// Hinweis erscheint nur im Hauptmenü, höchstens einmal pro neuer Version (weggetippt = bis zur nächsten Version still).
const IOS_APP_ID='';
const AppUpd=(()=>{
  const C=window.Capacitor,native=!!(C&&C.isNativePlatform&&C.isNativePlatform()),plat=native&&C.getPlatform?C.getPlatform():'web';
  const P=native?((C.Plugins&&C.Plugins.AppUpdate)||(C.registerPlugin&&C.registerPlugin('AppUpdate'))):null;
  const SK='kippwerk_upd_skip';
  let info=null,state='',ver='';   // state: '' | 'avail' | 'loading' | 'ready'
  const skipped=v=>{try{return localStorage.getItem(SK)===v}catch(e){return false}};
  function render(){const b=$('updBar');if(!b)return;
    const show=state==='ready'||state==='loading'||(state==='avail'&&!skipped(ver));
    b.hidden=!show;if(!show)return;
    $('updTxt').textContent=state==='ready'?I18N.tr('Update geladen – bereit zum Neustart'):state==='loading'?I18N.tr('Update wird geladen …'):I18N.tr('Neue Version verfügbar');
    $('updGo').textContent=I18N.tr(state==='ready'?'Neu starten':'Aktualisieren');
    $('updGo').style.display=state==='loading'?'none':'';$('updNo').style.display=state==='avail'?'':'none'}
  async function check(){if(!P)return;
    try{info=await P.getAppUpdateInfo();
      if(plat==='android'){
        if(info.installStatus===11){state='ready';ver=String(info.availableVersionCode||'')}
        else if(info.updateAvailability===2&&info.flexibleUpdateAllowed){state='avail';ver=String(info.availableVersionCode||'')}
        else if(info.updateAvailability===3){state='loading'}}
      else if(plat==='ios'&&IOS_APP_ID&&info.updateAvailability===2){state='avail';ver=String(info.availableVersionName||'')}
    }catch(e){}
    render()}
  async function go(){if(!P)return;
    try{
      if(state==='ready'){await P.completeFlexibleUpdate();return}
      if(plat==='ios'){await P.openAppStore({appId:IOS_APP_ID});return}
      try{await P.addListener('onFlexibleUpdateStateChange',s=>{
        if(s.installStatus===11){state='ready';toast('⬆ '+I18N.tr('Update geladen – tippe im Menü auf „Neu starten“'))}
        else if(s.installStatus===2||s.installStatus===1)state='loading';
        else if(s.installStatus===5||s.installStatus===6)state='avail';
        render()})}catch(e){}
      const r=await P.startFlexibleUpdate();
      if(r&&r.code===1){state='avail'}               // abgelehnt: Hinweis bleibt bis „×“
      else if(r&&r.code!==0){try{await P.openAppStore()}catch(x){}}   // Notlösung: Store-Seite öffnen
      render()}catch(e){try{await P.openAppStore(plat==='ios'?{appId:IOS_APP_ID}:{})}catch(x){}}}
  function skip(){try{localStorage.setItem(SK,ver)}catch(e){}render()}
  return{check,go,skip,render,get state(){return state}};
})();
$('updGo').onclick=()=>AppUpd.go();
$('updNo').onclick=()=>AppUpd.skip();
setTimeout(()=>AppUpd.check(),4000);
document.addEventListener('visibilitychange',()=>{if(!document.hidden)setTimeout(()=>AppUpd.check(),1500)});
