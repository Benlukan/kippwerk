let hapticPlugin=null,kwVibePlugin=null;
function kwVibe(ms,amp,touch){
  const C=window.Capacitor;
  kwVibePlugin=kwVibePlugin||(C&&((C.Plugins&&C.Plugins.KwVibe)||(C.registerPlugin&&C.registerPlugin('KwVibe'))));
  if(!kwVibePlugin)return Promise.reject(new Error('KwVibe fehlt'));
  return Promise.resolve(kwVibePlugin.vibrate({ms,amp,touch})).then(r=>{if(r&&r.ok===false)throw new Error(r.why||'aus');return r})}
// Diagnose-Knopf in den Einstellungen: vibriert und zeigt, was das Gerät meldet
async function testVibration(){
  const out=$('vibeDiag');out.textContent='…';
  const C=window.Capacitor,native=C&&C.isNativePlatform&&C.isNativePlatform();
  if(!native){const ok=!!(navigator.vibrate&&navigator.vibrate(120));out.textContent=I18N.tr(ok?'✓ Vibration angefordert (Browser)':'Dieser Browser kann nicht vibrieren');return}
  if(C.getPlatform()==='ios'){haptic('heavy');out.textContent=I18N.tr('✓ Vibration gesendet');return}
  try{const r=await kwVibe(160,255,true);let info={};try{info=await kwVibePlugin.info()}catch(e){}
    out.textContent=I18N.tr('✓ Vibration gesendet')+` · Android ${info.sdk||'?'} · ${info.maker||''} · ${I18N.tr('Klingelmodus')}: ${I18N.tr(info.ringer||'?')}${info.amplitude?'':' · '+I18N.tr('ohne Stärkeregelung')}`}
  catch(e){out.textContent='⚠ '+(e&&e.message||e);try{await hapticPlugin.vibrate({duration:160})}catch(e2){}}}
function haptic(kind){
  const v=settings.vibe;if(!v||v==='off')return;const strong=v!=='soft';
  const ms=({light:strong?32:16,medium:strong?50:26,heavy:strong?85:45,win:strong?110:60})[kind]||24;
  const C=window.Capacitor;
  try{
    if(C&&C.isNativePlatform&&C.isNativePlatform()){
      hapticPlugin=hapticPlugin||(C.Plugins&&C.Plugins.Haptics)||(C.registerPlugin&&C.registerPlugin('Haptics'));
      const H=hapticPlugin;if(!H)return;
      if(C.getPlatform()==='ios'){   // iOS: echte Taptic-Impulse (vibrate wäre immer ein langer Summer)
        const st=kind==='light'?(strong?'MEDIUM':'LIGHT'):kind==='medium'?(strong?'HEAVY':'MEDIUM'):'HEAVY';
        Promise.resolve(kind==='win'?H.notification({type:'SUCCESS'}):H.impact({style:st})).catch(()=>{});return}
      // Android: eigenes Plugin (vibriert ausdrücklich als Spiel-/Medien-Vibration – sonst dämpfen viele Geräte sie weg),
      // bei Fehlern das Standard-Plugin
      kwVibe(ms,strong?255:150,kind!=='light').catch(()=>H.vibrate({duration:ms}).catch(()=>{}));
      if(kind==='win')setTimeout(()=>kwVibe(ms,strong?255:150,true).catch(()=>{}),ms+90);
      return}
    if(navigator.vibrate)navigator.vibrate(kind==='win'?[ms,80,ms]:ms);
  }catch(e){}
}
