// ---------- Sprache (Deutsch / Englisch) ----------
// Standard = Systemsprache: Deutsch für alle deutschsprachigen Systeme (de-DE, de-AT, de-CH, de-LI, de-LU …), sonst Englisch.
// Übersetzt wird zentral: jeder angezeigte Text läuft durch tr() (Wörterbuch + Muster für Texte mit Zahlen).
const I18N=(()=>{
  const sys=()=>{try{const l=(navigator.languages&&navigator.languages[0])||navigator.language||'en';return /^de(\b|-|_)/i.test(l)?'de':'en'}catch(e){return 'en'}};
  let lang='de';
  const orig=new WeakMap(),setv=new WeakMap();  // Textknoten → deutscher Originaltext / zuletzt gesetzter Text
  const SKIP=new Set(['SCRIPT','STYLE','TEXTAREA']);
  const skipEl=e=>e&&(e.closest&&e.closest('.tiles,.mini,.chip,[data-noi18n]'));
  const ATTR=['title','placeholder','aria-label'];
  let dict=null,pats=[],collect=null;
  const norm=x=>x.replace(/\s+/g,' ').trim();
  function tr(str){
    if(collect&&str&&/[A-Za-zÄÖÜäöüß]/.test(str))collect.add(norm(str));
    if(lang==='de'||!str||!dict)return str;
    const n=norm(str);if(!n)return str;
    let out=dict.get(n);
    if(out===undefined){for(const [re,f] of pats){const m=n.match(re);if(m){out=typeof f==='function'?f(...m):n.replace(re,f);if(out!==undefined)break}}}
    if(out===undefined)return str;
    const lead=str.match(/^\s*/)[0],trail=str.match(/\s*$/)[0];return lead+out+trail}
  function node(t){
    const cur=t.nodeValue;if(setv.get(t)===cur)return;   // eigener Text, nichts zu tun
    orig.set(t,cur);const v=tr(cur);if(v!==cur)t.nodeValue=v;setv.set(t,t.nodeValue)}
  function attrs(el){for(const a of ATTR){if(!el.hasAttribute||!el.hasAttribute(a))continue;const k='data-de-'+a;
    const cur=el.getAttribute(a);if(el.getAttribute('data-set-'+a)===cur)continue;el.setAttribute(k,cur);const v=tr(cur);el.setAttribute(a,v);el.setAttribute('data-set-'+a,v)}}
  function walk(root){
    if(!root)return;
    if(root.nodeType===3){if(!skipEl(root.parentElement))node(root);return}
    if(root.nodeType!==1||SKIP.has(root.tagName)||skipEl(root))return;
    attrs(root);
    const w=document.createTreeWalker(root,NodeFilter.SHOW_TEXT|NodeFilter.SHOW_ELEMENT,{acceptNode:n=>n.nodeType===1?(SKIP.has(n.tagName)||skipEl(n)?NodeFilter.FILTER_REJECT:NodeFilter.FILTER_SKIP):NodeFilter.FILTER_ACCEPT});
    root.querySelectorAll&&root.querySelectorAll('[title],[placeholder],[aria-label]').forEach(e=>{if(!skipEl(e))attrs(e)});
    let t;while(t=w.nextNode())node(t)}
  function retranslateAll(){   // nach Sprachwechsel: alle bekannten Texte aus dem deutschen Original neu setzen
    const w=document.createTreeWalker(document.body,NodeFilter.SHOW_TEXT);let t;
    while(t=w.nextNode()){const o=orig.get(t);if(o!==undefined){const v=tr(o);t.nodeValue=v;setv.set(t,v)}}
    document.querySelectorAll('[data-de-title],[data-de-placeholder],[data-de-aria-label]').forEach(el=>{for(const a of ATTR){const o=el.getAttribute('data-de-'+a);if(o!==null){const v=tr(o);el.setAttribute(a,v);el.setAttribute('data-set-'+a,v)}}});
    walk(document.body)}
  let obs=null;
  function start(){
    walk(document.body);
    obs=new MutationObserver(ms=>{for(const m of ms){
      if(m.type==='characterData')node(m.target);
      else if(m.type==='attributes')attrs(m.target);
      else m.addedNodes.forEach(walk)}});
    obs.observe(document.body,{subtree:true,childList:true,characterData:true,attributes:true,attributeFilter:ATTR})}
  return{
    get lang(){return lang},
    loc:()=>lang==='en'?'en-US':'de-DE',
    resolve(pref){return pref==='de'||pref==='en'?pref:sys()},
    setLang(l){lang=l==='en'?'en':'de';document.documentElement.lang=lang;if(dict)retranslateAll()},
    init(pref,d,p){dict=d;pats=p||[];lang=this.resolve(pref);document.documentElement.lang=lang;start()},
    tr,t:(de,vars)=>{let x=tr(de);if(vars)for(const k in vars)x=x.split('{'+k+'}').join(vars[k]);return x},
    collect(on){collect=on?new Set():null},get collected(){return collect?[...collect]:[]}};
})();
const LOC=()=>I18N.loc();
I18N.setLang(I18N.resolve(settings.lang));   // Sprache schon vor dem ersten Zeichnen (Datumsangaben im Menü)
