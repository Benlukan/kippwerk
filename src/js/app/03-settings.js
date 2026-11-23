// ---------- Einstellungen ----------
const DEF_SETTINGS={fly:true,lang:'auto',sound:true,music:true,sfxVol:80,musicVol:70,tilt:true,vibe:'strong',palette:'std',symbols:true,pad:'auto',size:'6',theme:'std',kippi:'none',remind:true,overtake:'on',frame:'std',title:'neu'};
let settings={...DEF_SETTINGS};
try{settings={...DEF_SETTINGS,...JSON.parse(localStorage.getItem('kippwerk_settings')||'{}')};
  if(localStorage.getItem('kippwerk_sound')==='0'&&!localStorage.getItem('kippwerk_settings'))settings.sound=false}catch(e){}
// ältere Spielstände: Schalter → Regler/Stufen
if(settings.vibe===true)settings.vibe='strong';else if(settings.vibe===false)settings.vibe='off';
if(settings.sound===false)settings.sfxVol=0;if(settings.music===false)settings.musicVol=0;
settings.sound=settings.sfxVol>0;settings.music=settings.musicVol>0;delete settings.speed;   // Tempo-Auswahl entfernt (v1.25.1)
