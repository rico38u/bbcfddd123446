/* ===== القصص (Stories) داخل قائمة الرسائل ===== */
(function(){
const $=i=>document.getElementById(i),K='black1_stories_v1',N=x=>String(x==null?'':x),DAY=864e5,DUR=5000;
const esc=s=>N(s).replace(/[&<>"]/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;'}[c]));
const ME=()=>N(typeof currentUser!=='undefined'&&currentUser).toLowerCase();
const BG=['linear-gradient(135deg,#3b6bff,#7a3cf0)','linear-gradient(135deg,#ff7ab8,#e0388f)','linear-gradient(135deg,#ffbd4a,#ff7a1a)','linear-gradient(135deg,#34e07a,#0f9a8a)','linear-gradient(135deg,#232526,#414345)','linear-gradient(135deg,#ff5f6d,#7a1fa2)'];
const GR=['#6db3ff,#2f6bff','#ff7ab8,#e0388f','#5fdc8b,#1fa653','#ffbd4a,#ff7a1a','#c39bff,#7a4dff','#4fdccf,#17a3a3','#ff8a80,#e8433a'];
const sv=a=>{try{localStorage.setItem(K,JSON.stringify(a));return true}catch(e){return false}};
const raw=()=>{try{const a=JSON.parse(localStorage.getItem(K));return Array.isArray(a)?a:[]}catch(e){return[]}};
function ld(){const a=raw(),n=Date.now(),f=a.filter(s=>s&&n-s.t<DAY);if(f.length!==a.length){a.filter(x=>x&&n-x.t>=DAY&&(x.ty==='vid'||x.ty==='live')).forEach(x=>mdel(x.id));sv(f)}return f}
const acc=()=>{try{return getAccounts()||{}}catch(e){return{}}};
const prf=p=>{if(p===ME()&&typeof DATA!=='undefined'&&DATA&&DATA.profile)return DATA.profile;let r={};try{const a=acc()[p];r=(JSON.parse(localStorage.getItem('black1_data__'+(a?a.username:p)))||{}).profile||{}}catch(e){}return r};
const dn=p=>{const a=acc()[p]||{};return prf(p).name||a.name||a.username||p};
const isImg=x=>/^(data:image|https?:|blob:)/.test(N(x));
function av(p,s){const q=prf(p),src=q.avatarData||q.avatar;if(isImg(src))return `<img class="st-av" style="width:${s}px;height:${s}px" src="${esc(src)}" alt="">`;
const n=dn(p),h=[...N(p)].reduce((a,c)=>a+c.charCodeAt(0),0),w=N(n).trim().split(/\s+/);
return `<i class="st-av" style="width:${s}px;height:${s}px;font-size:${Math.round(s*.4)}px;background:linear-gradient(135deg,${GR[h%GR.length]})">${esc((w.length>1?w[0][0]+w[1][0]:w[0].slice(0,1)).toUpperCase())}</i>`}
const ago=t=>{const m=Math.floor((Date.now()-t)/6e4);return m<1?'الآن':m<60?'منذ '+m+' د':'منذ '+Math.floor(m/60)+' س'};
const tst=m=>typeof toast==='function'&&toast(m);
/* الفيديوهات تُحفظ في IndexedDB لأن localStorage صغير */
const MAXV=80*1024*1024,MAXD=30;
function mdb(){return new Promise((ok,no)=>{if(!window.indexedDB)return no(new Error('no idb'));const r=indexedDB.open('black1_stories_media',1);r.onupgradeneeded=()=>r.result.createObjectStore('v');r.onsuccess=()=>ok(r.result);r.onerror=()=>no(r.error)})}
const mput=(id,b)=>mdb().then(d=>new Promise((ok,no)=>{const t=d.transaction('v','readwrite');t.objectStore('v').put(b,id);t.oncomplete=()=>ok();t.onerror=t.onabort=()=>no(t.error)}));
const mget=id=>mdb().then(d=>new Promise((ok,no)=>{const q=d.transaction('v').objectStore('v').get(id);q.onsuccess=()=>ok(q.result);q.onerror=()=>no(q.error)}));
function mdel(id){mdb().then(d=>{d.transaction('v','readwrite').objectStore('v').delete(id)}).catch(()=>{})}

/* ---------- الشريط داخل قائمة الرسائل ---------- */
const VB='<svg viewBox="0 0 24 24"><path fill="#2f9bff" d="M12 1.7l2.4 1.7 2.9-.3 1.2 2.7 2.7 1.2-.3 2.9L22.6 12l-1.7 2.4.3 2.9-2.7 1.2-1.2 2.7-2.9-.3L12 22.6l-2.4-1.7-2.9.3-1.2-2.7-2.7-1.2.3-2.9L1.4 12l1.7-2.4-.3-2.9 2.7-1.2 1.2-2.7 2.9.3z"/><path d="m7.6 12.3 3 3 5.9-6" fill="none" stroke="#fff" stroke-width="2.3" stroke-linecap="round" stroke-linejoin="round"/></svg>';
/* متصل = أرسل رسالة حقيقية خلال آخر 5 دقائق (نفس منطق شاشة المحادثة) */
function online(p){try{const D=JSON.parse(localStorage.getItem('black1_msgs_v1'))||{},t=(D.t||{})[[ME(),p].sort().join('|')]||[];return t.some(m=>m.f===p&&Date.now()-m.t<3e5&&!(m.hd&&m.hd.indexOf(ME())>-1))}catch(e){return false}}
function renderH(){const h=$('hmStories');if(!h)return;
const all=ld(),me=ME(),by={};all.forEach(x=>(by[x.u]=by[x.u]||[]).push(x));
const seen=u=>by[u].every(x=>(x.v||[]).includes(me));
const last=u=>Math.max(...by[u].map(x=>x.t));
const us=Object.keys(by).filter(u=>u!==me&&acc()[u]).sort((a,b)=>(seen(a)-seen(b))||last(b)-last(a));
let o=`<div class="hm-s" data-u="${esc(me)}" data-own="1" role="button"><div class="hm-r">${av(me,76)}<b class="hm-pl" data-add="1"><svg viewBox="0 0 24 24"><path d="M12 5v14M5 12h14"/></svg></b></div><span class="hm-sn w">Your story</span></div>`;
us.forEach(u=>{o+=`<div class="hm-s" data-u="${esc(u)}" role="button"><div class="hm-r${seen(u)?' old':''}">${av(u,76)}${prf(u).verified===true?'<i class="hm-sv"><svg viewBox="0 0 24 24"><path d="m5 12.5 4.2 4.2L19 7.2"/></svg></i>':''}</div><span class="hm-sn">${esc(dn(u))}</span></div>`});
h.innerHTML=o}
function render(){try{renderH()}catch(e){}const b=$('stBar');if(!b)return;const sx=$('mgS');if(sx&&!sx.hidden){b.style.display='none';return}b.style.display='';
const all=ld(),me=ME(),by={};all.forEach(x=>(by[x.u]=by[x.u]||[]).push(x));
const seen=u=>by[u].every(x=>(x.v||[]).includes(me));
const last=u=>Math.max(...by[u].map(x=>x.t));
const us=Object.keys(by).filter(u=>u!==me&&acc()[u]).sort((a,b)=>(seen(a)-seen(b))||last(b)-last(a));
let h=`<div class="st-i" data-u="${esc(me)}" data-own="1" role="button"><div class="st-r new">${av(me,76)}<b class="st-plus" data-add="1"><svg viewBox="0 0 24 24"><path d="M12 5v14M5 12h14"/></svg></b></div><span><em class="w">Your story</em></span></div>`;
us.forEach(u=>{h+=`<div class="st-i" data-u="${esc(u)}" role="button"><div class="st-r ${seen(u)?'old':'new'}">${av(u,76)}${online(u)?'<i class="st-on"></i>':''}</div><span><em${(prf(u).settings||{}).nastaFont?' class="nf"':''}>${esc(dn(u))}</em>${prf(u).verified===true?VB:''}</span></div>`});
b.innerHTML=h}

/* ---------- عارض القصص ---------- */
let V=null;
function closeV(){if(!V)return;cancelAnimationFrame(V.raf);clearTimeout(V.lt);if(V.lp){V.lp.stop();V.lp=null}const vd=V.e.querySelector('video');if(vd){vd.pause();vd.removeAttribute('src');vd.load()}if(V.url)URL.revokeObjectURL(V.url);V.e.remove();V=null;render()}
function openV(u){const l=ld().filter(s=>s.u===u).sort((a,b)=>a.t-b.t);if(!l.length)return;const me=ME();
let i=l.findIndex(s=>!(s.v||[]).includes(me));if(u===me||i<0)i=0;
if(V)closeV();
const e=document.createElement('div');e.className='st-v';
e.innerHTML='<div class="st-vc"><div class="st-pb" id="stPb"></div><div class="st-vm" id="stVm"></div><div class="st-tz" id="stTz"></div><div class="st-vh" id="stVh"></div><div class="st-vf" id="stVf"></div></div>';
document.body.appendChild(e);V={u,l,i,e,el:0,last:0,paused:false,raf:0,own:u===me};
let t0=0,x0=0,y0=0;const tz=$('stTz');
tz.addEventListener('pointerdown',ev=>{V.paused=true;t0=Date.now();x0=ev.clientX;y0=ev.clientY;clearTimeout(V.lt);if(V.l[V.i].ty==='live')V.lt=setTimeout(()=>{if(V&&V.lp)V.lp.play()},250)});
tz.addEventListener('pointerup',ev=>{if(!V)return;clearTimeout(V.lt);V.paused=false;if(Date.now()-t0<280&&Math.abs(ev.clientX-x0)<12&&Math.abs(ev.clientY-y0)<12){const r=V.e.querySelector('.st-vc').getBoundingClientRect();ev.clientX>r.left+r.width*.33?nxt():prv()}});
tz.addEventListener('pointercancel',()=>{if(V){clearTimeout(V.lt);V.paused=false}});
e.addEventListener('click',ev=>{const b=ev.target.closest('[data-x]');if(!b)return;if(b.dataset.x==='c')return closeV();if(b.dataset.x==='d')del()});
requestAnimationFrame(()=>e.classList.add('on'));showS()}
const STV={trash:'assets/img-fc6e1a47.webp',eye:'assets/img-e912963a.webp'};
function showS(){const s=V.l[V.i],me=ME();V.el=0;V.last=0;
$('stPb').innerHTML=V.l.map((x,k)=>`<span><i style="width:${k<V.i?100:0}%"></i></span>`).join('');
$('stVh').innerHTML=`${av(V.u,38)}<div><b>${esc(V.own?'قصتك':dn(V.u))}</b><small>${ago(s.t)}</small></div><button data-x="c" aria-label="إغلاق">✕</button>`;
V.vid=null;if(V.url){URL.revokeObjectURL(V.url);V.url=''}
const cp=s.cap?`<p dir="auto">${esc(s.cap)}</p>`:'';
if(V.lp){V.lp.stop();V.lp=null}
$('stVm').innerHTML=s.ty==='live'?`<div class="cm-lw cm-vw"><img src="${esc(s.d)}" alt="" draggable="false"><canvas class="cm-lc" id="stLc"></canvas></div><span class="cm-bdg">${LV}LIVE</span>${cp}`:s.ty==='img'?`<img src="${esc(s.d)}" alt="">${cp}`:s.ty==='vid'?`<video id="stVd" playsinline preload="auto"></video>${cp}`:`<div class="st-tx" style="background:${esc(s.bg)}"><p dir="auto">${esc(s.tx)}</p></div>`;
if(s.ty==='vid'){const id=s.id,vd=$('stVd');vd.onended=()=>{if(V&&V.l[V.i]&&V.l[V.i].id===id)nxt()};
mget(id).then(b=>{if(!V||!V.l[V.i]||V.l[V.i].id!==id)return;if(!b){tst('الفيديو غير متوفر');return nxt()}V.url=URL.createObjectURL(b);vd.src=V.url;V.vid=vd;vd.play().catch(()=>{vd.muted=true;vd.play().catch(()=>{})})}).catch(()=>{tst('تعذّر تشغيل الفيديو');nxt()})}
if(s.ty==='live'){const id=s.id;mget(id).then(m=>{if(!V||!V.l[V.i]||V.l[V.i].id!==id||!m||!m.frames)return;const c=$('stLc');if(!c)return;V.lp=lvPlayer(c,m.frames,m.fps||FPS);V.lp.play()}).catch(()=>{})}
if(V.own){const vs=(s.v||[]).filter(x=>x!==me);$('stVf').innerHTML=`<div class="st-vw"><em class="st-eye"><img alt="" draggable="false" src="${STV.eye}"></em><b class="st-vtx">${vs.length?vs.length+' · '+esc(vs.map(dn).join('، ')):'لا مشاهدات بعد'}</b></div><button data-x="d" class="st-del" aria-label="حذف"><img alt="" draggable="false" src="${STV.trash}"></button>`}
else{$('stVf').innerHTML='';if(!(s.v||[]).includes(me)){const a=raw(),t=a.find(x=>x.id===s.id);if(t){(t.v=t.v||[]).push(me);sv(a)}(s.v=s.v||[]).push(me)}}
cancelAnimationFrame(V.raf);V.raf=requestAnimationFrame(tick)}
function tick(ts){if(!V)return;const s=V.l[V.i],v=V.vid;let d=DUR;
if(s.ty==='vid'){if(!v){V.raf=requestAnimationFrame(tick);return}
if(V.paused){if(!v.paused)v.pause()}else if(v.paused&&!v.ended)v.play().catch(()=>{});
V.el=v.currentTime*1000;d=(isFinite(v.duration)&&v.duration?v.duration:(s.dur||1))*1000}
else{if(!V.last)V.last=ts;if(!V.paused)V.el+=ts-V.last;V.last=ts}
const f=V.e.querySelector('#stPb span:nth-child('+(V.i+1)+') i');if(f)f.style.width=Math.min(100,V.el/d*100)+'%';
if(s.ty!=='vid'&&V.el>=DUR)return nxt();V.raf=requestAnimationFrame(tick)}
function nxt(){if(!V)return;if(V.i<V.l.length-1){V.i++;showS()}else closeV()}
function prv(){if(!V)return;if(V.i>0)V.i--;showS()}
function del(){if(!V)return;const s=V.l[V.i];V.paused=true;if(!confirm('حذف هذه القصة؟')){V.paused=false;V.last=0;return}
sv(raw().filter(x=>x.id!==s.id));if(s.ty==='vid'||s.ty==='live')mdel(s.id);V.l.splice(V.i,1);
if(!V.l.length){closeV();tst('تم حذف القصة');return}
if(V.i>=V.l.length)V.i=V.l.length-1;V.paused=false;showS();tst('تم حذف القصة')}

/* ---------- نشر قصة ---------- */
function closeS(){const e=$('stSh');if(e){e.classList.remove('on');setTimeout(()=>e.remove(),220);e.id=''}}
function closeE(){const e=$('stE');if(e){if(e._lp)e._lp.stop();if(e._u)URL.revokeObjectURL(e._u);e.remove()}}
function pub(o){const a=ld();a.push(Object.assign({id:Date.now().toString(36)+Math.random().toString(36).slice(2,5),u:ME(),t:Date.now(),v:[]},o));
if(!sv(a)){tst('تعذّر النشر: مساحة التخزين ممتلئة');return false}closeE();render();tst('تم نشر قصتك ✨');return true}
const mk=(acc_,cap)=>{const i=document.createElement('input');i.type='file';i.accept=acc_;if(cap)i.setAttribute('capture','environment');i.hidden=true;return i};
const fi=mk('image/*'),fv=mk('video/*'),fc=mk('image/*,video/*',1);
document.body.append(fi,fv,fc);
const rf=f=>new Promise((ok,no)=>{const r=new FileReader();r.onload=()=>ok(r.result);r.onerror=no;r.readAsDataURL(f)});
const vmeta=f=>new Promise((ok,no)=>{const u=URL.createObjectURL(f),v=document.createElement('video');v.preload='metadata';v.onloadedmetadata=()=>{const d=v.duration;URL.revokeObjectURL(u);ok(d)};v.onerror=()=>{URL.revokeObjectURL(u);no()};v.src=u});
async function onF(ev){const f=ev.target.files[0];ev.target.value='';if(!f)return;
if(/^video\//.test(f.type)||/\.(mp4|mov|m4v|webm|3gp)$/i.test(f.name)){
if(f.size>MAXV)return tst('الفيديو كبير جداً (الحد الأقصى 80 ميجابايت)');
try{const d=await vmeta(f);if(!(d>0))throw 0;if(d>MAXD+1)return tst('الحد الأقصى للفيديو '+MAXD+' ثانية');edit('vid',f,d)}catch(x){tst('تعذّر فتح الفيديو')}return}
try{const d=typeof compressDataUrl==='function'?await compressDataUrl(await rf(f),1000,.72):await rf(f);edit('img',d)}catch(x){tst('تعذّر فتح الصورة')}}
fi.onchange=fv.onchange=fc.onchange=onF;
const STI={txt:'assets/img-f1fabb4d.webp',cam:'assets/img-e7fd9b68.webp',vid:'assets/img-73d202b4.webp',photo:'assets/img-ef162701.webp'};
function sheet(){closeS();const e=document.createElement('div');e.id='stSh';e.className='st-sh';
e.innerHTML='<div class="st-sp"><i class="st-hd"></i><h3>نشر قصة</h3><div class="st-og"><button data-o="txt" aria-label="نص"><b class="st-ic"><img alt="" draggable="false" src="'+STI.txt+'"></b>نص</button><button data-o="cam" aria-label="كاميرا"><b class="st-ic"><img alt="" draggable="false" src="'+STI.cam+'"></b>كاميرا</button><button data-o="vid" aria-label="فيديو"><b class="st-ic"><img alt="" draggable="false" src="'+STI.vid+'"></b>فيديو</button><button data-o="photo" aria-label="صورة"><b class="st-ic"><img alt="" draggable="false" src="'+STI.photo+'"></b>صورة</button></div><button class="st-cn" data-o="x">إلغاء</button></div>';
document.body.appendChild(e);requestAnimationFrame(()=>e.classList.add('on'));
e.onclick=ev=>{const o=ev.target.closest('[data-o]');if(!o){if(!ev.target.closest('.st-sp'))closeS();return}const k=o.dataset.o;closeS();
if(k==='photo')fi.click();else if(k==='vid')fv.click();else if(k==='cam')openCam();else if(k==='txt')edit('txt')}}
function edit(mode,d,dur){closeE();const e=document.createElement('div');e.id='stE';e.className='st-e';let bg=0;
if(mode==='vid')e._u=URL.createObjectURL(d);
const act='<div class="st-ea"><button data-e="x">إلغاء</button><button data-e="p">نشر</button></div>',cap='<input id="stCap" class="st-cap" dir="auto" placeholder="أضف تعليقاً..." maxlength="200" autocomplete="off">';
e.innerHTML=mode==='img'?`<div class="st-ec"><div class="st-ei"><img src="${esc(d)}" alt=""></div>${cap}${act}</div>`
:mode==='live'?`<div class="st-ec"><div class="st-ei cm-lw"><img src="${esc(d)}" alt="" draggable="false"><canvas class="cm-lc" id="cmLc"></canvas><button type="button" class="cm-lb on" id="cmLb" aria-label="Live">${LV}<span>LIVE</span></button><em class="cm-hint">اضغط مع الاستمرار لتشغيل الصورة</em></div>${cap}${act}</div>`
:mode==='vid'?`<div class="st-ec"><div class="st-ei"><video src="${e._u}" controls playsinline muted loop autoplay></video></div>${cap}${act}</div>`
:`<div class="st-ec st-et" id="stBg" style="background:${BG[0]}"><textarea id="stTx" dir="auto" placeholder="اكتب قصتك..." maxlength="280"></textarea><div class="st-cl">${BG.map((g,k)=>`<button data-c="${k}" aria-label="لون" style="background:${g}" class="${k?'':'on'}"></button>`).join('')}</div>${act}</div>`;
document.body.appendChild(e);if(mode==='txt')setTimeout(()=>$('stTx').focus(),60);
if(mode==='live'){e._on=1;const cvs=e.querySelector('#cmLc'),lb=e.querySelector('#cmLb'),w=e.querySelector('.cm-lw');e._lp=lvPlayer(cvs,dur.frames,dur.fps);setTimeout(()=>{if(e._lp&&e._on)e._lp.play()},350);
w.addEventListener('pointerdown',()=>{if(e._on)e._lp.play()});
lb.addEventListener('click',ev=>{ev.stopPropagation();e._on=e._on?0:1;lb.classList.toggle('on',!!e._on);lb.querySelector('span').textContent=e._on?'LIVE':'OFF';if(e._on)e._lp.play();else e._lp.stop()});lb.addEventListener('pointerdown',ev=>ev.stopPropagation())}
e.onclick=ev=>{const c=ev.target.closest('[data-c]');if(c){bg=+c.dataset.c;$('stBg').style.background=BG[bg];e.querySelectorAll('[data-c]').forEach(x=>x.classList.toggle('on',x===c));return}
const b=ev.target.closest('[data-e]');if(!b)return;if(b.dataset.e==='x')return closeE();
if(mode==='img')pub({ty:'img',d,cap:$('stCap').value.trim()});
else if(mode==='live'){const cp=$('stCap').value.trim();if(!e._on)return void pub({ty:'img',d,cap:cp});if(b.disabled)return;b.disabled=true;b.textContent='جارٍ الحفظ...';const id=Date.now().toString(36)+Math.random().toString(36).slice(2,5);
mput(id,{frames:dur.frames,fps:dur.fps}).then(()=>{if(!pub({id,ty:'live',d,fps:dur.fps,cap:cp})){mdel(id);b.disabled=false;b.textContent='نشر'}}).catch(()=>{tst('تعذّر حفظ الصورة الحية على هذا المتصفح');b.disabled=false;b.textContent='نشر'})}
else if(mode==='vid'){if(b.disabled)return;b.disabled=true;b.textContent='جارٍ الحفظ...';const id=Date.now().toString(36)+Math.random().toString(36).slice(2,5),cp=$('stCap').value.trim();
mput(id,d).then(()=>{if(!pub({id,ty:'vid',dur:Math.min(dur,MAXD),cap:cp})){mdel(id);b.disabled=false;b.textContent='نشر'}}).catch(()=>{tst('تعذّر حفظ الفيديو على هذا المتصفح');b.disabled=false;b.textContent='نشر'})}
else{const tx=$('stTx').value.trim();if(!tx)return tst('اكتب شيئاً أولاً');pub({ty:'txt',tx,bg:BG[bg]})}}}

/* ---------- كاميرا القصص + Live Photo (حقيقية: مخزن إطارات قبل/بعد الالتقاط) ---------- */
const PRE=1.5,POST=1.5,FPS=15,FW=480,FH=854;
const LV='<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linecap="round" aria-hidden="true"><circle cx="12" cy="12" r="2.7" fill="currentColor" stroke="none"/><circle cx="12" cy="12" r="6.1"/><circle cx="12" cy="12" r="9.6" stroke-dasharray="1.7 2.5"/></svg>';
const sleep=ms=>new Promise(r=>setTimeout(r,ms));
function crop(v,ctx,w,h){const vw=v.videoWidth,vh=v.videoHeight,k=Math.max(w/vw,h/vh),dw=vw*k,dh=vh*k;ctx.drawImage(v,(w-dw)/2,(h-dh)/2,dw,dh)}
function lvPlayer(cvs,frames,fps,onend){
 const ctx=cvs.getContext('2d');let raf=0,run=0;const cache=new Map();
 const dec=i=>{if(!cache.has(i))cache.set(i,createImageBitmap(frames[i]));return cache.get(i)};
 function clear(){cache.forEach(p=>p.then(b=>b.close&&b.close()).catch(()=>{}));cache.clear()}
 function stop(){run++;cancelAnimationFrame(raf);cvs.classList.remove('on');clear()}
 async function play(){stop();const my=run,n=frames.length;if(!n)return;
  let b0;try{b0=await dec(0)}catch(e){return}if(my!==run)return;
  cvs.width=b0.width;cvs.height=b0.height;const t0=performance.now();let last=-1;cvs.classList.add('on');
  const step=async()=>{if(my!==run)return;const i=Math.floor((performance.now()-t0)/1000*fps);
   if(i>=n){stop();onend&&onend();return}
   if(i!==last){last=i;for(let k=1;k<4;k++)if(i+k<n)dec(i+k).catch(()=>{});
    try{const bm=await dec(i);if(my!==run)return;ctx.drawImage(bm,0,0,cvs.width,cvs.height)}catch(e){}
    const o=cache.get(i-3);if(o){o.then(b=>b.close&&b.close()).catch(()=>{});cache.delete(i-3)}}
   raf=requestAnimationFrame(step)};
  step()}
 return{play,stop}}
let CM=null;
function closeCam(){if(!CM)return;clearInterval(CM.tm);if(CM.stream)CM.stream.getTracks().forEach(t=>t.stop());CM.e.remove();CM=null}
async function camStart(){const c=CM;if(!c)return;clearInterval(c.tm);if(c.stream)c.stream.getTracks().forEach(t=>t.stop());c.ring=[];c.post=null;
 const v=c.e.querySelector('#cmV');let s;
 try{s=await navigator.mediaDevices.getUserMedia({video:{facingMode:{ideal:c.facing},width:{ideal:1280},height:{ideal:1280}},audio:false})}
 catch(x){if(CM!==c)return;closeCam();tst('لم يتم السماح باستخدام الكاميرا');return}
 if(CM!==c){s.getTracks().forEach(t=>t.stop());return}
 c.stream=s;v.srcObject=s;v.style.transform=c.facing==='user'?'scaleX(-1)':'';v.play().catch(()=>{});
 const tr=s.getVideoTracks()[0];let caps={};try{caps=tr.getCapabilities?tr.getCapabilities():{}}catch(e){}
 const fl=c.e.querySelector('#cmFl');fl.hidden=!caps.torch;fl.classList.remove('on');c.torch=false;
 const g=document.createElement('canvas');g.width=FW;g.height=FH;const gx=g.getContext('2d');
 c.tm=setInterval(()=>{if(!c.live||!v.videoWidth||c.stream!==s)return;crop(v,gx,FW,FH);
  const f={t:performance.now(),p:new Promise(ok=>g.toBlob(ok,'image/jpeg',.72))};
  if(c.post)c.post.push(f);else{c.ring.push(f);const lim=performance.now()-PRE*1000-120;while(c.ring.length&&c.ring[0].t<lim)c.ring.shift()}},1000/FPS)}
async function shoot(){const c=CM;if(!c||c.busy||!c.stream)return;const v=c.e.querySelector('#cmV');if(!v.videoWidth)return;c.busy=true;
 const sc=document.createElement('canvas');sc.width=720;sc.height=1280;crop(v,sc.getContext('2d'),720,1280);
 const still=sc.toDataURL('image/jpeg',.8);
 const fx=c.e.querySelector('#cmFx');fx.classList.remove('go');void fx.offsetWidth;fx.classList.add('go');
 try{navigator.vibrate&&navigator.vibrate(12)}catch(e){}
 if(!c.live){closeCam();return edit('img',still)}
 const pre=c.ring.slice(),post=[];c.post=post;c.e.classList.add('rec');
 await sleep(POST*1000);if(CM!==c)return;c.post=null;
 const all=pre.concat(post),fr=(await Promise.all(all.map(f=>f.p))).filter(Boolean);
 const span=all.length>1?(all[all.length-1].t-all[0].t)/1000:0,fps=span>0?Math.min(30,Math.max(6,(all.length-1)/span)):FPS;
 closeCam();
 if(fr.length<4)return edit('img',still);
 edit('live',still,{frames:fr,fps})}
function openCam(){
 if(!navigator.mediaDevices||!navigator.mediaDevices.getUserMedia){fc.click();return}
 if(window.XCam){closeCam();window.XCam.open({onPhoto:d=>edit('img',d),onLive:(s,l)=>edit('live',s,l),onGallery:()=>fi.click()});return}
 closeCam();const e=document.createElement('div');e.className='cm-root';
 e.innerHTML='<div class="cm-box"><div class="cm-view"><video id="cmV" playsinline muted autoplay></video><i class="cm-fx" id="cmFx"></i>'
 +'<div class="cm-top"><button type="button" data-c="x" aria-label="إغلاق"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round"><path d="M6 6l12 12M18 6L6 18"/></svg></button>'
 +'<span class="cm-pill" id="cmPl"><i></i>LIVE</span>'
 +'<div class="cm-tr"><button type="button" data-c="fl" id="cmFl" hidden aria-label="الفلاش"><svg viewBox="0 0 24 24" fill="currentColor"><path d="M13 2L5 13.5h5.5L10 22l8-11.5h-5.5z"/></svg></button>'
 +'<button type="button" data-c="lv" id="cmLv" class="on" aria-label="Live">'+LV+'</button></div></div>'
 +'<div class="cm-st" id="cmSt">LIVE</div></div>'
 +'<div class="cm-bar"><button type="button" data-c="g" aria-label="المعرض"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><rect x="3.5" y="4.5" width="17" height="15" rx="3.5"/><circle cx="9" cy="10" r="1.7"/><path d="M4 17l5-4.5 4 3.5 3-2.5 4 3.5"/></svg></button>'
 +'<button type="button" class="cm-sb" data-c="s" aria-label="التقاط"><i></i></button>'
 +'<button type="button" data-c="f" aria-label="قلب الكاميرا"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.9" stroke-linecap="round" stroke-linejoin="round"><path d="M4 12a8 8 0 0 1 13.5-5.8L20 8.5M20 4v4.5h-4.5M20 12a8 8 0 0 1-13.5 5.8L4 15.5M4 20v-4.5h4.5"/></svg></button></div></div>';
 document.body.appendChild(e);CM={e,facing:'environment',live:true,ring:[],post:null,busy:false,stream:null,tm:0,torch:false};
 e.addEventListener('click',async ev=>{const b=ev.target.closest('[data-c]');if(!b||!CM)return;const k=b.dataset.c,c=CM;
  if(k==='x')return closeCam();
  if(k==='g'){closeCam();return fi.click()}
  if(k==='s')return shoot();
  if(k==='f'){if(c.busy)return;c.facing=c.facing==='user'?'environment':'user';return camStart()}
  if(k==='lv'){c.live=!c.live;b.classList.toggle('on',c.live);c.ring=[];const st=e.querySelector('#cmSt');st.textContent=c.live?'LIVE':'LIVE OFF';st.classList.remove('go');void st.offsetWidth;st.classList.add('go');return}
  if(k==='fl'){const tr=c.stream&&c.stream.getVideoTracks()[0];if(!tr)return;try{await tr.applyConstraints({advanced:[{torch:!c.torch}]});c.torch=!c.torch;b.classList.toggle('on',c.torch)}catch(x){tst('الفلاش غير متاح')}}});
 requestAnimationFrame(()=>e.classList.add('on'));camStart()}
addEventListener('pagehide',closeCam);

/* ---------- ربط الأحداث ---------- */
document.addEventListener('click',ev=>{const b=ev.target.closest&&ev.target.closest('#stBar,#hmStories');if(!b)return;const it=ev.target.closest('.st-i,.hm-s');if(!it)return;
if(ev.target.closest('[data-add]'))return sheet();
const u=it.dataset.u;if(it.dataset.own&&!ld().some(s=>s.u===u))return sheet();openV(u)});
const sb=$('mgSb');if(sb)sb.addEventListener('click',()=>setTimeout(render,0));
const sx=$('mgS');if(sx)sx.addEventListener('input',render);
const g1=window.go;if(typeof g1==='function')window.go=function(n){const r=g1.apply(this,arguments);if(n==='messages'||n==='home')render();return r};
addEventListener('storage',e=>{if(e.key===K)render()});
addEventListener('keydown',e=>{if(e.key==='Escape'){closeV();closeS();closeE();closeCam()}});
setInterval(()=>{const m=document.querySelector('#view-messages.active,#view-home.active');if(m&&!V)render()},60000);
render();
})();
