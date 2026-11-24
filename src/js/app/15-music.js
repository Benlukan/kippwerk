// ---------- Musik (prozedural, Loop: Am – F – C – G) ----------
// Drei Stücke: Menü (ruhig), Spiel (wird mit dem Level schneller und voller – in Stufen, nicht bei jedem Level), Boss (eigenes, dunkleres Stück)
// Das KIPPWERK-Thema: eine eigene, gleichbleibende Melodie (16 Takte, A – A' – B – A), die in Menü und Spiel immer wiederkehrt –
// wie ein Ohrwurm. Das Tempo steigt in einer Partie nur an, nie zurück; „Gefahr“ (Feld fast voll) macht die Musik dichter, nicht schneller.
const Music=(()=>{
  let on=false,hold=0,timer=null,step=0,next=0,g=null,f=null,noise=null;
  let cur='menu',stage=0,danger=false,E=60/84/2;
  const POP=[[57,60,64],[53,57,60],[48,52,55],[55,59,62]];                 // Am – F – C – G
  const TR={menu:{bpm:[84],ch:POP},game:{bpm:[88,93,98,104,110],ch:POP},
            boss:{bpm:[112],ch:[[57,60,64],[53,57,60],[50,53,57],[52,56,59]]}};   // Am – F – Dm – E (harmonisch Moll)
  const ARP=[0,1,2,1,0,2,1,2],BARP=[0,1,2,0,1,2,1,2];
  // Melodie in Achteln (MIDI-Noten, 0 = halten, -1 = Pause), je Phrase 4 Takte über Am – F – C – G
  const _=0,P=-1,MEL_SRC=[
    [76,_,72,74,76,_,74,72, 69,_,69,72,77,_,76,74, 72,_,_,76,79,_,76,72, 74,_,71,72,74,_,_,P],   // A
    [76,_,72,74,76,_,74,72, 69,_,69,72,77,_,76,74, 72,_,_,76,79,_,76,72, 74,_,76,74,71,_,_,P],   // A'
    [81,_,_,79,76,_,72,P,   77,_,76,77,81,_,_,P,   79,_,76,72,76,_,79,P,   71,_,72,74,76,_,_,P],   // B (höher)
    [76,_,72,74,76,_,74,72, 69,_,69,72,77,_,76,74, 72,_,_,76,79,_,76,72, 74,_,71,74,69,_,_,P]];  // A'' (endet auf A)
  const MEL=MEL_SRC.map(ph=>ph.map((n,i)=>{if(n<=0)return null;let l=1;while(i+l<ph.length&&ph[i+l]===0)l++;return{n,l}}));
  const hz=m=>440*Math.pow(2,(m-69)/12);
  function note(fr,t,d,type,vol){const o=actx.createOscillator(),e=actx.createGain();o.type=type;o.frequency.value=fr;
    e.gain.setValueAtTime(0,t);e.gain.linearRampToValueAtTime(vol,t+.02);e.gain.exponentialRampToValueAtTime(.0001,t+d);o.connect(e).connect(f);o.start(t);o.stop(t+d+.05)}
  function nz(t,d,vol,type,freq){const src=actx.createBufferSource(),fl=actx.createBiquadFilter(),e=actx.createGain();src.buffer=noise;fl.type=type;fl.frequency.value=freq;
    e.gain.setValueAtTime(vol,t);e.gain.exponentialRampToValueAtTime(.0001,t+d);src.connect(fl).connect(e).connect(g);src.start(t);src.stop(t+d+.02)}
  const hat=(t,v)=>nz(t,.045,v,'highpass',7000),snare=(t,v)=>nz(t,.12,v,'bandpass',1800);
  function kick(t,v){const o=actx.createOscillator(),e=actx.createGain();o.frequency.setValueAtTime(130,t);o.frequency.exponentialRampToValueAtTime(42,t+.12);
    e.gain.setValueAtTime(v,t);e.gain.exponentialRampToValueAtTime(.0001,t+.2);o.connect(e).connect(g);o.start(t);o.stop(t+.22)}
  function bar0(){const tr=TR[cur];E=60/tr.bpm[Math.min(stage,tr.bpm.length-1)]/2}   // kein Tempo-Sprung bei Gefahr
  // Melodie-Ton: weich (Menü) bzw. kräftiger Puls (Spiel)
  function lead(ph,s,t,soft){const m=MEL[ph][s];if(!m)return;const d=E*m.l*.92;
    if(soft){note(hz(m.n),t,d,'sine',.05);return}
    note(hz(m.n),t,d,'square',.016);note(hz(m.n),t,d,'triangle',.028);
    if(stage>=4)note(hz(m.n+12),t,d*.8,'triangle',.008)}
  function tick(){
    if(!actx||actx.state!=='running')return;
    if(next<actx.currentTime)next=actx.currentTime+.05;
    while(next<actx.currentTime+.3){
      const s=step%8;if(s===0)bar0();
      const ch=TR[cur].ch[Math.floor(step/8)%4],phrase=Math.floor(step/32)%4,t=next;
      if(cur==='menu'){
        if(s===0){note(hz(ch[0]-12),t,E*7,'sine',.11);ch.forEach(m=>note(hz(m),t,E*8.5,'sine',.022))}
        if(s===4)note(hz(ch[0]-12),t,E*3,'sine',.07);
        if(s%2===0)note(hz(ch[ARP[s]]+12),t,E*1.7,'triangle',.02);
        lead(Math.floor(step/32)%4,step%32,t,true);
      }else if(cur==='game'){
        if(s===0)ch.forEach(m=>note(hz(m),t,E*8.5,'sine',.02));
        if(stage<3){if(s===0)note(hz(ch[0]-12),t,E*7,'sine',.11);if(s===4)note(hz(ch[0]-12),t,E*3,'sine',.07)}
        else note(hz(ch[s%2?2:0]-12),t,E*.9,'sine',.08);                       // ab Stufe 3: treibender Bass
        note(hz(ch[ARP[s]]),t,E*1.5,'triangle',.02);                            // Begleitung eine Oktave tiefer, Platz für die Melodie
        lead(Math.floor(step/32)%4,step%32,t,false);
        if(stage>=1&&s%2===1)hat(t,.02);
        if(stage>=2&&(s===0||s===4))kick(t,.16);
        if(danger){hat(t,.012);if(s===2||s===6)snare(t,.03)}                    // Gefahr: dichter, nicht schneller
      }else{   // Boss
        note(hz(ch[0]-12),t,E*.85,'sawtooth',.035);note(hz(ch[0]-24),t,E*.9,'sine',.07);
        if(s===0)ch.forEach(m=>note(hz(m),t,E*8,'sine',.018));
        note(hz(ch[BARP[s]]+12+(s===7?12:0)),t,E*.9,'triangle',.034);
        if(s===0||s===4)kick(t,.18);if(s===2||s===6)snare(t,.05);if(s%2)hat(t,.016);
      }
      step++;next+=E}}
  function ensure(){actx=actx||new (window.AudioContext||window.webkitAudioContext)();
    if(!g){g=actx.createGain();g.gain.value=.0001;f=actx.createBiquadFilter();f.type='lowpass';f.frequency.value=1900;f.connect(g);g.connect(actx.destination);
      noise=actx.createBuffer(1,actx.sampleRate*.3,actx.sampleRate);const d=noise.getChannelData(0);let x=1;for(let i=0;i<d.length;i++){x=(x*16807)%2147483647;d[i]=x/1073741823.5-1}}}
  function fade(v,s){const t=actx.currentTime;g.gain.cancelScheduledValues(t);g.gain.setValueAtTime(Math.max(.0001,g.gain.value),t);g.gain.linearRampToValueAtTime(v,t+s)}
  const level=()=>2*Math.pow((settings.musicVol??70)/100,2);
  function play(){try{ensure();if(actx.state==='suspended')actx.resume();if(!timer){next=actx.currentTime+.1;timer=setInterval(tick,100)}fade(level(),1.6)}catch(e){}}
  function pause(){if(!g)return;try{fade(.0001,.3)}catch(e){}setTimeout(()=>{if(!(on&&!hold&&!document.hidden)){clearInterval(timer);timer=null}},350)}
  const want=()=>on&&!hold&&!document.hidden;
  function sync(){want()?play():pause()}
  document.addEventListener('visibilitychange',sync);
  // Stückwechsel: kurz leiser, neues Stück beginnt mit einem neuen Takt
  function setTrack(t,st){st=st|0;
    if(t===cur&&st===stage)return;
    if(t===cur&&t==='game'&&st<stage)return;                        // innerhalb einer Partie wird es nie wieder langsamer
    if(t!==cur){cur=t;step=0;stage=st;if(g&&want())try{const v=level(),n=actx.currentTime;g.gain.cancelScheduledValues(n);g.gain.setValueAtTime(Math.max(.0001,g.gain.value),n);g.gain.linearRampToValueAtTime(v*.25,n+.2);g.gain.linearRampToValueAtTime(v,n+1.2)}catch(e){}}
    else stage=st}                                                   // Stufe greift ab dem nächsten Takt
  return{start(){on=true;sync()},resume(){try{if(actx&&actx.state==='suspended')actx.resume()}catch(e){}},stop(){on=false;sync()},volume(){if(want()&&g)try{fade(level(),.15)}catch(e){}},hold(b){hold=Math.max(0,hold+(b?1:-1));sync()},
    track:setTrack,danger(b){danger=!!b},get playing(){return want()},get state(){return{track:cur,stage,danger,bpm:Math.round(30/E)}}};
})();
// Welches Stück passt gerade? (Menü · Spiel mit Stufe · Boss) – aufgerufen bei Start, nach jedem Zug, bei Menü/Ende
// Ab welchem Endlos-Level die Musik eine Stufe schneller wird – je Feldgröße (aus Bot-Simulation, v1.32)
const MUSIC_STEPS={4:[3,5,7,10],5:[3,5,7,10],6:[5,10,16,22],7:[4,8,13,18],8:[8,15,23,32],9:[8,15,23,32],10:[8,15,23,32]};
function musicSync(){
  const menu=!$('startOv').classList.contains('hidden')||!started||over;
  if(menu){Music.track('menu');Music.danger(false);return}
  if(mode==='level'&&lvNo%10===0)Music.track('boss',0);
  else{let st=0;
    if(mode==='endless'){const T=MUSIC_STEPS[N]||MUSIC_STEPS[6];st=T.filter(x=>level>=x).length}
    else if(mode==='level')st=Math.min(4,Math.floor((Math.ceil(lvNo/10)-1)/2));
    else if(mode==='daily'){const u=history.length;st=u<15?0:u<28?1:u<36?2:3}
    Music.track('game',st)}
  const dg=!!(grid&&grid.filter(Boolean).length>=N*N*.78);if(dg&&!musicSync.dg)try{Fly.react('danger')}catch(e){}
  musicSync.dg=dg;Music.danger(dg);
}
// Start bei der ersten Berührung (Browser) – falls der Ton trotz Start noch gesperrt ist, hier freigeben
['pointerdown','keydown'].forEach(ev=>addEventListener(ev,()=>{if(settings.musicVol>0){if(!Music.playing)Music.start();else Music.resume()}},{passive:true}));
// In der App (Android/iOS) läuft die Musik direkt beim Start – mit sanftem Einblenden; Lautstärke 0 = still
try{if(window.Capacitor&&Capacitor.isNativePlatform&&Capacitor.isNativePlatform())setTimeout(()=>{if(settings.musicVol>0&&!document.hidden&&!Music.playing)Music.start()},700)}catch(e){}

