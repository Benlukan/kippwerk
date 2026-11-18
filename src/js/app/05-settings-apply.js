function saveSettings(){try{localStorage.setItem('kippwerk_settings',JSON.stringify(settings));localStorage.setItem('kippwerk_settings_at',String(Date.now()))}catch(e){}}
function applySettings(){
  for(const th of Object.keys(THEME_NAMES))document.body.classList.toggle('th-'+th,th!=='std'&&settings.theme===th);
  sound=settings.sound;const b=document.body.classList;
  b.toggle('nosym',!settings.symbols);b.toggle('pal-cb',settings.palette==='cb');
  b.toggle('pad-on',settings.pad==='on');b.toggle('pad-off',settings.pad==='off');
}
