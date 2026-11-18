// ---------- Audio ----------
let actx=null;
function tone(f,d=.08,type='sine',vol=.08,delay=0){
  if(!sound)return;
  try{
    actx=actx||new (window.AudioContext||window.webkitAudioContext)();
    const t=actx.currentTime+delay,o=actx.createOscillator(),g=actx.createGain();
    o.type=type;o.frequency.setValueAtTime(f,t);
    vol*=1.6*Math.pow((settings.sfxVol??80)/100,2);if(vol<=0)return;
    g.gain.setValueAtTime(vol,t);g.gain.exponentialRampToValueAtTime(.0001,t+d);
    o.connect(g).connect(actx.destination);o.start(t);o.stop(t+d+.02);
  }catch(e){}
}
const sfx={
  slide:()=>tone(180,.06,'triangle',.05),
  bump:()=>tone(90,.12,'square',.04),
  pop:(chain)=>{const b=440*Math.pow(1.122,chain-1);tone(b,.12,'sine',.09);tone(b*1.5,.14,'sine',.06,.05)},
  level:()=>[523,659,784,1046].forEach((f,i)=>tone(f,.15,'triangle',.07,i*.08)),
  combo:(n)=>{const seq=n>=5?[523,659,784,1046,1318,1568]:n===4?[523,659,784,1046,1318]:n===3?[587,740,880]:[659,880];
    seq.forEach((f,i)=>tone(f,.14,n>=4?'square':'triangle',n>=4?.05:.06,.12+i*.07));if(n>=5)tone(110,.5,'sawtooth',.06,.1)},
  over:()=>[392,330,262].forEach((f,i)=>tone(f,.25,'sawtooth',.04,i*.15))
};

