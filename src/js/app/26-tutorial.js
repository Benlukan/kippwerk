// ---------- Tutorial (erster Start) ----------
const TUT_GRID=[   // -1 leer · 0 Rot · 1 Gelb · 2 Grün · 3 Blau
  [0,-1,-1,1,-1,2],
  [-1,-1,-1,-1,-1,-1],
  [-1,2,-1,2,3,-1],
  [0,-1,0,-1,-1,0],
  [1,-1,-1,1,-1,3],
  [-1,2,2,-1,3,-1]];
const TUT_STEPS=[
  {dir:'L',a:'180deg',mx:'-40px',my:'0px',txt:'Hi, ich bin Kippi! Wisch mal nach links: Das ganze Feld kippt und alle Steine rutschen mit. 3 gleiche, die sich berühren, verschwinden!'},
  {dir:'D',a:'90deg',mx:'0px',my:'40px',txt:'Neue Steine kommen immer von der Gegenseite. Jetzt nach unten wischen – rutschen danach wieder 3 gleiche zusammen, gibt’s eine Combo!'}];
function startTutorial(){
  tut={step:0};['helpOv','settingsOv'].forEach(i=>$(i).classList.add('hidden'));start('endless');showTut()}
function showTut(){
  const c=$('coach'),st=TUT_STEPS[tut.step];c.classList.remove('hidden');
  if(!$('coachAva').firstChild)$('coachAva').appendChild(document.querySelector('#fly svg').cloneNode(true));
  $('coachStep').textContent=I18N.t('KIPPI · SCHRITT {n} / 3',{n:tut.step+1});
  let ar=boardEl.querySelector('.coach-arrow');
  $('coachSkip').style.visibility=st?'':'hidden';
  if(st){$('coachTxt').textContent=st.txt;$('coachGo').style.display='none';
    if(!ar){ar=document.createElement('div');ar.className='coach-arrow';boardEl.appendChild(ar)}
    ar.style.setProperty('--a',st.a);ar.style.setProperty('--mx',st.mx);ar.style.setProperty('--my',st.my)}
  else{if(ar)ar.remove();$('coachTxt').textContent='Bsss, stark! Ist das Feld voll, ist die Runde vorbei. Mein Tipp: Kipp öfter in dieselbe Richtung und schau oben bei „Als Nächstes“, was kommt. Ich schau ab und zu vorbei!';$('coachGo').style.display=''}
}
function tutNext(total){
  if(!tut)return;tut.step++;
  if(tut.step<=TUT_STEPS.length)setTimeout(()=>{if(tut)showTut()},total>=2?900:250);
}
function endTut(){tut=null;$('coach').classList.add('hidden');const ar=boardEl.querySelector('.coach-arrow');if(ar)ar.remove();try{localStorage.setItem('kippwerk_tutdone','1')}catch(e){}}
function coachNudge(){const c=$('coach');c.classList.remove('nudge');void c.offsetWidth;c.classList.add('nudge');sfx.bump()}
$('coachGo').onclick=endTut;
$('coachSkip').onclick=endTut;
