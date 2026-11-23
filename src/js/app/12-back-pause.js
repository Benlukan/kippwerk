// ---------- Zurück-Taste & Pausieren ----------
let backArmed=0;
function pauseToMenu(){if(started&&!over){paused=true;started=false;showMenu();return true}return false}
function handleBack(){
  try{if(PopMenu.close())return}catch(e){}   // offenes Auswahlmenü zuerst schließen
  const open=id=>!$(id).classList.contains('hidden');
  if(open('bugOv')){$('bugNo').click();return}
  if(open('rescueOv')){$('noRescueBtn').click();return}
  if(open('helpOv')){$('closeHelp').click();return}
  if(open('streakOv')){closeStreak();return}
  if(open('scoresOv')){$('closeScores').click();return}
  if(open('settingsOv')){$('closeSettings').click();return}
  if(open('lvlOv')){$('lvlMap').style.display!=='none'?$('lvlMap').click():openLevels();return}
  if(open('levelsOv')){$('closeLevels').click();return}
  if(open('overOv')){$('menuBtn').click();return}
  if(open('startOv')){
    if(paused){$('resumeBtn').click();return}                 // im Pause-Menü: weiterspielen
    if(Date.now()-backArmed<2200){const A=AppPlugin();if(A)A.exitApp();return}
    backArmed=Date.now();toast('Zum Beenden nochmal „Zurück“ drücken');return}
  if(busy){setTimeout(handleBack,250);return}                // Zug läuft noch → kurz warten
  if(started&&over){started=false;showMenu();return}           // Runde vorbei, aber kein Fenster offen → ins Menü
  pauseToMenu();
}
const AppPlugin=()=>{const C=window.Capacitor;return C&&C.isNativePlatform&&C.isNativePlatform()?((C.Plugins&&C.Plugins.App)||(C.registerPlugin&&C.registerPlugin('App'))):null};
function setTheme(th){if(!themeUnlocked(th))return;settings.theme=th;saveSettings();applySettings()}
function toast(msg){const t=document.createElement('div');t.className='toast';t.textContent=msg;document.body.appendChild(t);setTimeout(()=>t.remove(),4600)}
