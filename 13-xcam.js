(function(){
if(window.XCam)return;
var CSS=''
+'.xc{position:fixed;inset:0;z-index:2147483000;background:#000;display:flex;justify-content:center;direction:ltr;font-family:Cairo,Tajawal,system-ui,sans-serif;color:#fff;-webkit-user-select:none;user-select:none;touch-action:none;opacity:0;transition:opacity .2s}'
+'.xc.on{opacity:1}'
+'.xc-box{position:relative;width:100%;max-width:480px;height:100%;background:#000;overflow:hidden}'
+'.xc-stage{position:absolute;inset:0;display:flex;align-items:center;justify-content:center}'
+'.xc-vw{position:relative;overflow:hidden;background:#111;transition:width .25s,height .25s}'
+'.xc-vw video{position:absolute;inset:0;width:100%;height:100%;object-fit:cover;background:#111}'
+'.xc-dc{position:absolute;inset:0;width:100%;height:100%;pointer-events:none;touch-action:none}'
+'.xc.dr .xc-dc{pointer-events:auto}'
+'.xc-grid{position:absolute;inset:0;pointer-events:none;background:'
+'linear-gradient(90deg,transparent calc(33.33% - .5px),rgba(255,255,255,.38) 0 calc(33.33% + .5px),transparent 0),'
+'linear-gradient(90deg,transparent calc(66.66% - .5px),rgba(255,255,255,.38) 0 calc(66.66% + .5px),transparent 0),'
+'linear-gradient(180deg,transparent calc(33.33% - .5px),rgba(255,255,255,.38) 0 calc(33.33% + .5px),transparent 0),'
+'linear-gradient(180deg,transparent calc(66.66% - .5px),rgba(255,255,255,.38) 0 calc(66.66% + .5px),transparent 0)}'
+'.xc-fx{position:absolute;inset:0;background:#fff;opacity:0;pointer-events:none}.xc-fx.go{animation:xcFx .3s ease-out}'
+'@keyframes xcFx{0%{opacity:.9}100%{opacity:0}}'
+'.xc-sf{position:absolute;inset:0;background:#fff;opacity:0;pointer-events:none;transition:opacity .12s;z-index:2}.xc-sf.on{opacity:1}'
+'.xc-cnt{position:absolute;inset:0;display:none;align-items:center;justify-content:center;font:800 130px/1 system-ui;color:#fff;text-shadow:0 4px 30px rgba(0,0,0,.6);pointer-events:none;z-index:3}'
+'.xc-cnt.on{display:flex}.xc-cnt b{animation:xcCn 1s ease-out}'
+'@keyframes xcCn{0%{transform:scale(1.5);opacity:0}25%{opacity:1}100%{transform:scale(.8);opacity:.2}}'
+'.xc-pill{position:absolute;left:50%;top:84px;transform:translateX(-50%);display:flex;align-items:center;gap:6px;padding:5px 11px;border-radius:99px;background:#ffd60a;color:#1b1b1b;font:800 12px/1 system-ui;opacity:0;transition:opacity .2s;z-index:3}'
+'.xc-pill i{width:7px;height:7px;border-radius:50%;background:#d62b1f}.xc.rec .xc-pill{opacity:1}'
+'.xc button{font-family:inherit;color:#fff;border:0;cursor:pointer;-webkit-tap-highlight-color:transparent;padding:0}'
+'.xc button:active{transform:scale(.92)}'
+'.xc-b{position:absolute;z-index:6;width:60px;height:60px;border-radius:50%;display:grid;place-items:center;background:rgba(40,40,44,.55);-webkit-backdrop-filter:blur(14px);backdrop-filter:blur(14px)}'
+'.xc-b svg{width:28px;height:28px}'
+'.xc-b.g{background:linear-gradient(145deg,#38e08f,#14b86a)}'
+'.xc-b[hidden],.xc-cs[hidden],.xc-sub[hidden]{display:none}'
+'.xc-pen{left:18px;top:calc(env(safe-area-inset-top,0px) + 18px)}'
+'.xc-und{left:96px;top:calc(env(safe-area-inset-top,0px) + 18px);background:none;-webkit-backdrop-filter:none;backdrop-filter:none}'
+'.xc-und svg{width:34px;height:34px;opacity:.9}'
+'.xc-end{right:18px;top:calc(env(safe-area-inset-top,0px) + 18px)}'
+'.xc-chv{left:50%;margin-left:-22px;top:calc(env(safe-area-inset-top,0px) + 26px);width:44px;height:44px}'
+'.xc-chv svg{transition:transform .25s;width:24px;height:24px}.xc.pn .xc-chv svg{transform:rotate(180deg)}'
+'.xc-cs{position:absolute;z-index:6;left:18px;top:calc(env(safe-area-inset-top,0px) + 118px);width:24px;height:290px;border-radius:14px;border:3px solid #fff;box-shadow:0 0 0 1px rgba(0,0,0,.25);touch-action:none;'
+'background:linear-gradient(180deg,#000 0,#2a2a2a 7%,#ff3b1f 8%,#ff9900 20%,#ffe600 32%,#22dd44 48%,#00d5ff 62%,#2255ff 76%,#aa33ff 88%,#ff33cc 100%)}'
+'.xc-cs i{position:absolute;left:50%;width:30px;height:30px;margin:-15px 0 0 -15px;border-radius:50%;border:4px solid #fff;box-shadow:0 2px 8px rgba(0,0,0,.4);pointer-events:none}'
+'.xc-pn{position:absolute;z-index:4;left:14px;right:14px;bottom:calc(env(safe-area-inset-bottom,0px) + 14px);direction:rtl;border-radius:56px;padding:40px 18px 122px;'
+'background:rgba(78,86,78,.42);-webkit-backdrop-filter:blur(26px) saturate(1.3);backdrop-filter:blur(26px) saturate(1.3);border:1.5px solid rgba(255,255,255,.28);'
+'display:grid;grid-template-columns:repeat(3,1fr);row-gap:24px;opacity:0;transform:translateY(24px) scale(.97);pointer-events:none;transition:opacity .22s,transform .25s}'
+'.xc.pn .xc-pn{opacity:1;transform:none;pointer-events:auto}'
+'.xc-t{display:flex;flex-direction:column;align-items:center;gap:10px;background:none;font-size:15px;color:rgba(255,255,255,.88);text-align:center;line-height:1.2}'
+'.xc-t b{position:relative;width:var(--t);height:var(--t);border-radius:50%;display:grid;place-items:center;background:rgba(36,38,38,.82);color:#fff}'
+'.xc-t b svg{width:44%;height:44%}.xc-t.y b{color:#ffd60a}.xc-t.y{color:#fff}'
+'.xc-t b em{font:600 calc(var(--t)*.5)/1 system-ui;font-style:normal}'
+'.xc-t b u{position:absolute;right:20%;bottom:20%;width:19px;height:19px;border-radius:50%;background:#fff;color:#111;font:800 12px/19px system-ui;text-decoration:none;text-align:center}'
+'.xc-t.sp{visibility:hidden}'
+'.xc{--t:min(15.6vw,76px)}'
+'.xc-bar{position:absolute;z-index:7;left:0;right:0;bottom:0;height:calc(120px + env(safe-area-inset-bottom,0px));padding:0 28px calc(env(safe-area-inset-bottom,0px) + 12px);display:flex;align-items:center;justify-content:space-between;background:linear-gradient(0deg,rgba(0,0,0,.65),transparent)}'
+'.xc.pn .xc-bar{background:none}'
+'.xc-bar button.s{width:50px;height:50px;border-radius:50%;display:grid;place-items:center;background:rgba(255,255,255,.14)}'
+'.xc-bar button.s svg{width:25px;height:25px}'
+'.xc-sb{position:relative;width:78px;height:78px;border-radius:50%;border:4px solid #fff;background:transparent}'
+'.xc-sb i{position:absolute;inset:4px;border-radius:50%;background:#fff;transition:transform .15s,background .2s}'
+'.xc-sb:active i{transform:scale(.88)}.xc.rec .xc-sb{pointer-events:none}.xc.rec .xc-sb i{transform:scale(.7);background:#ffd60a}'
+'.xc.dr .xc-nb{display:none}.xc-br{display:none;width:100%;justify-content:space-between;align-items:center}.xc.dr .xc-br{display:flex}'
+'.xc-br button{width:58px;height:58px;border-radius:50%;display:grid;place-items:center;background:rgba(40,42,42,.85)}'
+'.xc-br button svg{width:30px;height:30px}.xc-br button.on{background:#fff;color:#111;width:66px;height:66px}'
+'.xc-nb{display:contents}'
+'.xc-sub{position:absolute;z-index:8;left:18px;right:18px;direction:rtl;border-radius:26px;padding:12px 14px;background:rgba(30,32,32,.78);-webkit-backdrop-filter:blur(20px);backdrop-filter:blur(20px);display:flex;gap:8px;align-items:center;overflow-x:auto}'
+'.xc-sub button{flex:none;padding:9px 16px;border-radius:99px;background:rgba(255,255,255,.14);font-size:14px;white-space:nowrap}.xc-sub button.on{background:#ffd60a;color:#111;font-weight:700}'
+'.xc-sub input{flex:1;direction:ltr;accent-color:#ffd60a;height:30px}.xc-sub span{min-width:44px;text-align:center;font:700 14px system-ui;color:#ffd60a;direction:ltr}'
+'@media (prefers-reduced-motion:reduce){.xc *{animation:none!important}}';
var st=document.createElement('style');st.textContent=CSS;document.head.appendChild(st);

function S(p,x){return '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round"'+(x||'')+'>'+p+'</svg>'}
var IC={
 bolt:'<path d="M13.2 2.5 5.5 13.6h5.3L10 21.5l7.8-11.2h-5.3z" fill="currentColor" stroke="none"/>',
 live:'<circle cx="12" cy="12" r="2.6" fill="currentColor" stroke="none"/><circle cx="12" cy="12" r="6"/><circle cx="12" cy="12" r="9.5" stroke-dasharray="1.7 2.6"/>',
 slash:'<path d="M3.5 3.5l17 17" stroke="#262828" stroke-width="4.4"/><path d="M3.5 3.5l17 17" stroke-width="1.9"/>',
 timer:'<circle cx="12" cy="13.2" r="8"/><path d="M12 13.2V8.6M9.6 2.8h4.8"/>',
 filt:'<circle cx="9" cy="9.5" r="5.5"/><circle cx="15" cy="9.5" r="5.5"/><circle cx="12" cy="15" r="5.5"/>',
 sty:'<rect x="3.5" y="7" width="12" height="13" rx="2.2" transform="rotate(-8 9.5 13.5)"/><rect x="9" y="4" width="12" height="13" rx="2.2" transform="rotate(8 15 10.5)"/>',
 moon:'<path d="M20 14.6A8.6 8.6 0 1 1 9.4 4a7 7 0 0 0 10.6 10.6z" fill="currentColor" stroke="none"/><circle cx="17" cy="5" r=".9" fill="currentColor" stroke="none"/><circle cx="20.3" cy="8.5" r=".9" fill="currentColor" stroke="none"/><circle cx="14.5" cy="3.2" r=".7" fill="currentColor" stroke="none"/>',
 ar:'<path d="M3 8V5.5A2.5 2.5 0 0 1 5.5 3H8M16 3h2.5A2.5 2.5 0 0 1 21 5.5V8M21 16v2.5a2.5 2.5 0 0 1-2.5 2.5H16M8 21H5.5A2.5 2.5 0 0 1 3 18.5V16"/>',
 pen:'<path d="M4 20l1-4.2L16.5 4.3a1.8 1.8 0 0 1 2.5 0l.7.7a1.8 1.8 0 0 1 0 2.5L8.2 19z"/><path d="M14.5 6.3l3.2 3.2"/>',
 undo:'<path d="M9 14 4 9l5-5"/><path d="M4 9h10.5a5.5 5.5 0 0 1 0 11H11"/>',
 chk:'<path d="M5 12.5l4.5 4.5L19 7.5" stroke-width="2.4"/>',
 x:'<path d="M6 6l12 12M18 6 6 18" stroke-width="2.2"/>',
 chv:'<path d="M6 9l6 6 6-6" stroke-width="2.2"/>',
 gal:'<rect x="3.5" y="4.5" width="17" height="15" rx="3.5"/><circle cx="9" cy="10" r="1.7"/><path d="M4 17l5-4.5 4 3.5 3-2.5 4 3.5"/>',
 flip:'<path d="M4 12a8 8 0 0 1 13.5-5.8L20 8.5M20 4v4.5h-4.5M20 12a8 8 0 0 1-13.5 5.8L4 15.5M4 20v-4.5h4.5"/>',
 b1:'<path d="M4 19c2-5 3-3 5-6s2-6 5-8 4 0 6-1" stroke-width="1.6"/><path d="M4 19c2-5 3-3 5-6s2-6 5-8" stroke-width="3.2" opacity=".5"/>',
 b2:'<path d="M4 16c3-7 5 3 8-3s5 3 8-3" stroke-width="4" opacity=".8"/>',
 b3:'<path d="M4 16c3-7 5 3 8-3s5 3 8-3" stroke-width="2.4"/><path d="M4 16c3-7 5 3 8-3s5 3 8-3" stroke-width="6" opacity=".3"/>',
 b4:'<path d="M5 15.5l7.5-8.5 6 5.5-5 6H9z"/><path d="M8.5 12l6 5.4"/><path d="M5 20h14"/>'
};

var STY=[['عادي',''],['حيوي','saturate(1.45) contrast(1.08)'],['دافئ','sepia(.28) saturate(1.25) hue-rotate(-8deg)'],['بارد','saturate(1.05) hue-rotate(14deg) brightness(1.03)'],['درامي','contrast(1.32) saturate(.85) brightness(.92)'],['ناعم','contrast(.9) brightness(1.08) saturate(1.1)']];
var FIL=[['بدون',''],['أبيض وأسود','grayscale(1)'],['سيبيا','sepia(.9)'],['باهت','contrast(.8) brightness(1.15) saturate(.8)'],['عتيق','sepia(.5) contrast(1.1) hue-rotate(-15deg)'],['نيون','saturate(2.1) contrast(1.15)']];
var RAT=[[9/16,'١٦:٩'],[3/4,'٤:٣'],[1,'١:١'],[0,'كامل']];
var STOPS=[[0,[0,0,0]],[.07,[42,42,42]],[.08,[255,59,31]],[.2,[255,153,0]],[.32,[255,230,0]],[.48,[34,221,68]],[.62,[0,213,255]],[.76,[34,85,255]],[.88,[170,51,255]],[1,[255,51,204]]];
function colAt(p){for(var i=1;i<STOPS.length;i++){if(p<=STOPS[i][0]){var a=STOPS[i-1],b=STOPS[i],k=(p-a[0])/(b[0]-a[0]||1);return 'rgb('+[0,1,2].map(function(j){return Math.round(a[1][j]+(b[1][j]-a[1][j])*k)}).join(',')+')'}}return 'rgb(255,51,204)'}
var FPS=15,PRE=1.5,POST=1.5,FW=480;
function sleep(ms){return new Promise(function(r){setTimeout(r,ms)})}
function toast(m){try{typeof window.toast==='function'&&window.toast(m)}catch(e){}}

var cur=null;
function close(){if(!cur)return;var c=cur;cur=null;clearInterval(c.tm);c.cancel=1;try{c.stream&&c.stream.getTracks().forEach(function(t){t.stop()})}catch(e){}document.removeEventListener('keydown',c.kd);window.removeEventListener('resize',c.rs);c.el.remove()}

function open(o){
 o=o||{};close();
 var s={facing:'environment',flash:'auto',live:!!o.onLive,timer:0,ev:0,sty:0,fil:0,rat:0,night:false,draw:false,sub:null,pn:false,tool:0,cp:.2,strokes:[],cur:null};
 var c={s:s,o:o,ring:[],post:null,busy:false,counting:false,cancel:0,stream:null,tm:0,torch:false};cur=c;
 var el=document.createElement('div');el.className='xc';c.el=el;
 el.innerHTML='<div class="xc-box"><div class="xc-stage"><div class="xc-vw"><video playsinline muted autoplay></video><canvas class="xc-dc"></canvas><div class="xc-grid"></div><i class="xc-fx"></i><div class="xc-sf"></div><div class="xc-cnt"></div><div class="xc-pill"><i></i>LIVE</div></div></div>'
 +'<button class="xc-b xc-pen" data-k="pen" aria-label="رسم">'+S(IC.pen)+'</button>'
 +'<button class="xc-b xc-und" data-k="undo" aria-label="تراجع" hidden>'+S(IC.undo)+'</button>'
 +'<button class="xc-b xc-chv" data-k="pan" aria-label="الإعدادات">'+S(IC.chv)+'</button>'
 +'<button class="xc-b xc-end" data-k="x" aria-label="إغلاق">'+S(IC.x)+'</button>'
 +'<div class="xc-cs" hidden><i></i></div>'
 +'<div class="xc-sub" hidden></div>'
 +'<div class="xc-pn"></div>'
 +'<div class="xc-bar"><div class="xc-nb"><button class="s" data-k="gal" aria-label="المعرض">'+S(IC.gal)+'</button><button class="xc-sb" data-k="shot" aria-label="التقاط"><i></i></button><button class="s" data-k="flip" aria-label="قلب الكاميرا">'+S(IC.flip)+'</button></div>'
 +'<div class="xc-br">'+[1,2,3,4].map(function(n,i){return '<button data-k="tool" data-i="'+i+'" aria-label="فرشاة">'+S(IC['b'+n])+'</button>'}).join('')+'</div></div></div>';
 document.body.appendChild(el);
 var $=function(q){return el.querySelector(q)};
 var vw=$('.xc-vw'),vid=$('video'),dc=$('.xc-dc'),pn=$('.xc-pn'),sub=$('.xc-sub'),cs=$('.xc-cs'),csI=cs.querySelector('i'),box=$('.xc-box');
 var gcv=document.createElement('canvas');

 function css(){var a=[];if(s.ev)a.push('brightness('+(1+s.ev*.2).toFixed(2)+')');if(s.night)a.push('brightness(1.35) contrast(1.1) saturate(1.1)');if(STY[s.sty][1])a.push(STY[s.sty][1]);if(FIL[s.fil][1])a.push(FIL[s.fil][1]);return a.join(' ')}
 function applyCss(){vid.style.filter=css()}
 function ratio(){var r=RAT[s.rat][0];if(r)return r;var W=box.clientWidth,H=box.clientHeight;return W/H}
 function layout(){var W=box.clientWidth,H=box.clientHeight,r=ratio(),w,h;if(r>=W/H){w=W;h=W/r}else{h=H;w=H*r}vw.style.width=Math.round(w)+'px';vw.style.height=Math.round(h)+'px';
  var d=Math.min(2,window.devicePixelRatio||1);dc.width=Math.round(w*d);dc.height=Math.round(h*d);redraw();updSub()}
 c.rs=layout;window.addEventListener('resize',c.rs);

 /* ---- drawing ---- */
 function paint(g,k,W,H){var p=k.pts;if(!p.length)return;g.save();g.lineCap='round';g.lineJoin='round';g.strokeStyle=k.c;g.fillStyle=k.c;
  var w=k.w*W;g.lineWidth=w;g.globalAlpha=1;
  if(k.t===1){g.globalAlpha=.5}
  if(k.t===2){g.shadowColor=k.c;g.shadowBlur=w*2.2}
  if(k.t===3){g.globalCompositeOperation='destination-out'}
  g.beginPath();g.moveTo(p[0][0]*W,p[0][1]*H);
  if(p.length===1){g.lineTo(p[0][0]*W+.01,p[0][1]*H)}
  for(var i=1;i<p.length;i++){var m=[(p[i-1][0]+p[i][0])/2*W,(p[i-1][1]+p[i][1])/2*H];g.quadraticCurveTo(p[i-1][0]*W,p[i-1][1]*H,m[0],m[1])}
  g.stroke();g.restore()}
 function redraw(){var g=dc.getContext('2d');g.clearRect(0,0,dc.width,dc.height);s.strokes.forEach(function(k){paint(g,k,dc.width,dc.height)});if(s.cur)paint(g,s.cur,dc.width,dc.height)}
 var WID=[.008,.032,.012,.05];
 dc.addEventListener('pointerdown',function(e){if(!s.draw)return;e.preventDefault();try{dc.setPointerCapture(e.pointerId)}catch(x){}var r=dc.getBoundingClientRect();
  s.cur={t:s.tool,c:colAt(s.cp),w:WID[s.tool],pts:[[(e.clientX-r.left)/r.width,(e.clientY-r.top)/r.height]]};redraw()});
 dc.addEventListener('pointermove',function(e){if(!s.cur)return;var r=dc.getBoundingClientRect();s.cur.pts.push([(e.clientX-r.left)/r.width,(e.clientY-r.top)/r.height]);redraw()});
 function up(){if(!s.cur)return;s.strokes.push(s.cur);s.cur=null;redraw()}
 dc.addEventListener('pointerup',up);dc.addEventListener('pointercancel',up);
 function setCs(p){s.cp=Math.max(0,Math.min(1,p));csI.style.top=(s.cp*100)+'%';csI.style.background=colAt(s.cp)}
 function csMove(e){var r=cs.getBoundingClientRect();setCs((e.clientY-r.top)/r.height)}
 var csD=0;cs.addEventListener('pointerdown',function(e){csD=1;try{cs.setPointerCapture(e.pointerId)}catch(x){}csMove(e)});
 cs.addEventListener('pointermove',function(e){if(csD)csMove(e)});cs.addEventListener('pointerup',function(){csD=0});cs.addEventListener('pointercancel',function(){csD=0});
 setCs(s.cp);
 function setDraw(on){s.draw=on;el.classList.toggle('dr',on);$('.xc-pen').classList.toggle('g',on);$('.xc-und').hidden=!on;cs.hidden=!on;$('.xc-end').dataset.k=on?'ok':'x';$('.xc-end').classList.toggle('g',on);$('.xc-end').innerHTML=S(on?IC.chk:IC.x);
  if(on){s.pn=false;el.classList.remove('pn');s.sub=null;updSub();setTool(s.tool)}}
 function setTool(i){s.tool=i;el.querySelectorAll('.xc-br button').forEach(function(b,j){b.classList.toggle('on',j===i)})}

 /* ---- settings panel ---- */
 function tile(k,lab,ic,yel,extra){return '<button class="xc-t'+(yel?' y':'')+'" data-k="'+k+'"><b>'+ic+(extra||'')+'</b><span>'+lab+'</span></button>'}
 function renderPn(){
  var fl=s.flash,flIc=S(IC.bolt)+(fl==='off'?S(IC.slash,' style="position:absolute;inset:28%;width:44%;height:44%"'):''),flX=fl==='auto'?'<u>A</u>':'';
  var lvIc=S(IC.live)+(s.live?'':S(IC.slash,' style="position:absolute;inset:28%;width:44%;height:44%"'));
  var tmIc=s.timer?'<em>'+s.timer+'</em>':S(IC.timer);
  var ev='<em>±</em>';
  var ra=RAT[s.rat][1];
  var arIc='<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round">'+IC.ar+'<text x="12" y="14.8" font-size="'+(ra.length>4?5.6:6.6)+'" font-weight="700" text-anchor="middle" fill="currentColor" stroke="none" font-family="system-ui">'+ra+'</text></svg>';
  pn.innerHTML=tile('timer','المؤقت',tmIc,s.timer)+tile('live','صورة حية',lvIc,s.live)+tile('flash','فلاش',flIc,fl==='on',flX)
  +tile('fil','فلتر',S(IC.filt),s.fil||s.sub==='fil')+tile('sty','الأنماط',S(IC.sty),s.sty||s.sub==='sty')+tile('ev','التعرض للضوء',ev,s.ev||s.sub==='ev')
  +'<span class="xc-t sp"></span>'+tile('night','النمط الليلي',S(IC.moon),s.night)+tile('ar','العرض إلى الارتفاع',arIc,true)}
 function updSub(){
  if(!s.sub){sub.hidden=true;return}
  var h='';
  if(s.sub==='ev'){h='<span>'+(s.ev>0?'+':'')+s.ev.toFixed(1)+'</span><input type="range" min="-20" max="20" value="'+Math.round(s.ev*10)+'"><button data-k="evr">إعادة</button>'}
  else{var L=s.sub==='sty'?STY:FIL,v=s.sub==='sty'?s.sty:s.fil;h=L.map(function(x,i){return '<button data-k="pick" data-i="'+i+'" class="'+(i===v?'on':'')+'">'+x[0]+'</button>'}).join('')}
  sub.innerHTML=h;sub.hidden=false;
  var br=box.getBoundingClientRect(),b=130;if(s.pn){var pr=pn.getBoundingClientRect();b=br.bottom-pr.top+10}
  sub.style.bottom=b+'px';
  var inp=sub.querySelector('input');if(inp)inp.oninput=function(){s.ev=inp.value/10;sub.querySelector('span').textContent=(s.ev>0?'+':'')+s.ev.toFixed(1);applyCss();renderPn()}}
 function setSub(k){s.sub=s.sub===k?null:k;renderPn();updSub()}
 function setPn(on){s.pn=on;el.classList.toggle('pn',on);if(!on){s.sub=null}renderPn();setTimeout(updSub,30)}

 /* ---- camera ---- */
 async function start(){clearInterval(c.tm);if(c.stream)c.stream.getTracks().forEach(function(t){t.stop()});c.ring=[];c.post=null;var st;
  try{st=await navigator.mediaDevices.getUserMedia({video:{facingMode:{ideal:s.facing},width:{ideal:1280},height:{ideal:1280}},audio:false})}
  catch(x){if(cur!==c)return;close();toast('لم يتم السماح باستخدام الكاميرا');if(o.onDenied)o.onDenied();return}
  if(cur!==c){st.getTracks().forEach(function(t){t.stop()});return}
  c.stream=st;vid.srcObject=st;vid.style.transform=s.facing==='user'?'scaleX(-1)':'';vid.play().catch(function(){});
  var tr=st.getVideoTracks()[0],caps={};try{caps=tr.getCapabilities?tr.getCapabilities():{}}catch(e){}c.hasTorch=!!caps.torch;c.torch=false;
  c.tm=setInterval(tick,1000/FPS)}
 function frame(g,w,h,withStr){
  var vwid=vid.videoWidth,vh=vid.videoHeight,k=Math.max(w/vwid,h/vh),dw=vwid*k,dh=vh*k,f=css();
  g.save();if(f&&'filter' in g)g.filter=f;
  if(s.facing==='user'){g.translate(w,0);g.scale(-1,1)}
  g.drawImage(vid,(w-dw)/2,(h-dh)/2,dw,dh);g.restore();
  if(withStr&&s.strokes.length)g.drawImage(dc,0,0,dc.width,dc.height,0,0,w,h)}
 function tick(){if(!s.live||!o.onLive||!vid.videoWidth||!c.stream||s.draw)return;
  var h=Math.round(FW/ratio());if(gcv.width!==FW||gcv.height!==h){gcv.width=FW;gcv.height=h}
  frame(gcv.getContext('2d'),FW,h,false);
  var f={t:performance.now(),p:new Promise(function(ok){gcv.toBlob(ok,'image/jpeg',.72)})};
  if(c.post)c.post.push(f);else{c.ring.push(f);var lim=performance.now()-PRE*1000-120;while(c.ring.length&&c.ring[0].t<lim)c.ring.shift()}}
 function still(){var r=ratio(),w,h;if(r<1){h=1280;w=Math.round(h*r)}else{w=1280;h=Math.round(w/r)}var cv=document.createElement('canvas');cv.width=w;cv.height=h;frame(cv.getContext('2d'),w,h,true);return cv.toDataURL('image/jpeg',.85)}
 function lum(){try{var t=document.createElement('canvas');t.width=t.height=24;var g=t.getContext('2d');g.drawImage(vid,0,0,24,24);var d=g.getImageData(0,0,24,24).data,a=0;for(var i=0;i<d.length;i+=4)a+=d[i]*.3+d[i+1]*.59+d[i+2]*.11;return a/(d.length/4)}catch(e){return 255}}
 async function torch(on){var tr=c.stream&&c.stream.getVideoTracks()[0];if(!tr)return;try{await tr.applyConstraints({advanced:[{torch:on}]});c.torch=on}catch(e){}}

 async function shoot(){
  if(c.counting){c.cancel2=1;return}
  if(c.busy||!c.stream||!vid.videoWidth)return;c.busy=true;
  if(s.timer){c.counting=true;c.cancel2=0;var cn=$('.xc-cnt');cn.classList.add('on');
   for(var n=s.timer;n>0;n--){cn.innerHTML='<b>'+n+'</b>';await sleep(1000);if(cur!==c)return;if(c.cancel2)break}
   cn.classList.remove('on');c.counting=false;if(c.cancel2){c.busy=false;return}}
  var useF=s.flash==='on'||(s.flash==='auto'&&lum()<70),sf=$('.xc-sf'),tor=false;
  if(useF){if(c.hasTorch&&s.facing!=='user'){await torch(true);tor=true;await sleep(380)}else{sf.classList.add('on');await sleep(260)}}
  if(cur!==c)return;
  var img=still();
  var fx=$('.xc-fx');fx.classList.remove('go');void fx.offsetWidth;fx.classList.add('go');try{navigator.vibrate&&navigator.vibrate(12)}catch(e){}
  if(!(s.live&&o.onLive)){if(tor)torch(false);sf.classList.remove('on');close();o.onPhoto&&o.onPhoto(img);return}
  var pre=c.ring.slice(),post=[];c.post=post;el.classList.add('rec');
  await sleep(POST*1000);if(cur!==c)return;c.post=null;
  if(tor)torch(false);sf.classList.remove('on');
  var all=pre.concat(post),fr=(await Promise.all(all.map(function(f){return f.p}))).filter(Boolean);
  var span=all.length>1?(all[all.length-1].t-all[0].t)/1000:0,fps=span>0?Math.min(30,Math.max(6,(all.length-1)/span)):FPS;
  close();
  if(fr.length<4){o.onPhoto&&o.onPhoto(img);return}
  o.onLive(img,{frames:fr,fps:fps})}

 /* ---- events ---- */
 el.addEventListener('click',function(e){
  var b=e.target.closest('[data-k]');
  if(!b){if(e.target.closest('.xc-vw')&&s.pn&&!s.draw)setPn(false);return}
  var k=b.dataset.k;
  if(k==='x')return close();
  if(k==='shot')return shoot();
  if(k==='gal'){close();o.onGallery&&o.onGallery();return}
  if(k==='flip'){if(c.busy)return;s.facing=s.facing==='user'?'environment':'user';return start()}
  if(k==='pan')return setPn(!s.pn);
  if(k==='pen')return setDraw(!s.draw);
  if(k==='ok')return setDraw(false);
  if(k==='undo'){s.strokes.pop();redraw();return}
  if(k==='tool')return setTool(+b.dataset.i);
  if(k==='flash'){s.flash={auto:'on',on:'off',off:'auto'}[s.flash];renderPn();toast('الفلاش: '+{auto:'تلقائي',on:'مفعّل',off:'متوقف'}[s.flash]);return}
  if(k==='live'){if(!o.onLive){toast('الصورة الحية متاحة في كاميرا القصص فقط');return}s.live=!s.live;c.ring=[];renderPn();toast(s.live?'الصورة الحية: تشغيل':'الصورة الحية: إيقاف');return}
  if(k==='timer'){s.timer={0:3,3:10,10:0}[s.timer];renderPn();toast(s.timer?'المؤقت: '+s.timer+' ثوانٍ':'المؤقت: متوقف');return}
  if(k==='ev')return setSub('ev');
  if(k==='evr'){s.ev=0;applyCss();renderPn();updSub();return}
  if(k==='sty')return setSub('sty');
  if(k==='fil')return setSub('fil');
  if(k==='pick'){var i=+b.dataset.i;if(s.sub==='sty')s.sty=i;else s.fil=i;applyCss();renderPn();updSub();return}
  if(k==='night'){s.night=!s.night;applyCss();renderPn();toast(s.night?'النمط الليلي: تشغيل':'النمط الليلي: إيقاف');return}
  if(k==='ar'){s.rat=(s.rat+1)%RAT.length;renderPn();layout();return}
 });
 c.kd=function(e){if(e.key==='Escape')close()};document.addEventListener('keydown',c.kd);
 renderPn();applyCss();requestAnimationFrame(function(){el.classList.add('on');layout()});start();
}
window.XCam={open:open,close:close};
addEventListener('pagehide',close);
})();
