(function(){
const $=i=>document.getElementById(i),K='black1_msgs_v1',N=x=>String(x==null?'':x);
const esc=s=>N(s).replace(/[&<>"]/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;'}[c]));
const P={back:'<path d="m15 5-7 7 7 7"/>',chev:'<path d="m9 5 7 7-7 7"/>',video:'<rect x="3" y="6.5" width="12.5" height="11" rx="3"/><path d="m15.5 11 5-3v8l-5-3"/>',phone:'<path d="M5 4h4l2 5-2.5 1.5a11 11 0 0 0 5 5L15 13l5 2v4a2 2 0 0 1-2 2A16 16 0 0 1 3 6a2 2 0 0 1 2-2Z"/>',mail:'<rect x="3" y="5.5" width="18" height="13" rx="2.5"/><path d="m4 8 8 5.5L20 8"/>',msg:'<path d="M20 11.5a7.5 7.5 0 0 1-11 6.6L4 19.5l1.4-4.6A7.5 7.5 0 1 1 20 11.5Z"/>',bell:'<path d="M6 16V11a6 6 0 0 1 12 0v5l1.5 2h-15Z"/><path d="M10 20.5h4"/>',moon:'<path d="M20 14.5A8 8 0 0 1 9.5 4 8 8 0 1 0 20 14.5Z"/>',shield:'<path d="M12 3 5 6v5.5c0 4.3 3 8 7 9.5 4-1.5 7-5.2 7-9.5V6Z"/>',link:'<path d="M10 14a4.5 4.5 0 0 0 6.4 0l3-3a4.5 4.5 0 0 0-6.4-6.4l-1.1 1.1"/><path d="M14 10a4.5 4.5 0 0 0-6.4 0l-3 3a4.5 4.5 0 0 0 6.4 6.4l1.1-1.1"/>',user:'<circle cx="12" cy="8" r="4"/><path d="M4.5 20.5c.7-4 3.7-6 7.5-6s6.8 2 7.5 6Z"/>',help:'<circle cx="12" cy="12" r="9"/><path d="M9.5 9.5a2.6 2.6 0 1 1 3.6 2.4c-.8.4-1.1.9-1.1 1.8M12 17h.01"/>',plus:'<path d="M12 5v14M5 12h14"/>',wave:'<path d="M4 10v4M8 6v12M12 3v18M16 7v10M20 10v4"/>',cam:'<path d="M4 8h3l1.5-2h7L17 8h3v11H4Z"/><circle cx="12" cy="13" r="3.5"/>',photo:'<rect x="4" y="5" width="16" height="14" rx="3"/><circle cx="9" cy="10" r="1.6"/><path d="m5 17 5-4.5 3.5 3L16 13l3 4"/>',pin:'<path d="M12 21s-6.5-6-6.5-11a6.5 6.5 0 0 1 13 0c0 5-6.5 11-6.5 11Z"/><circle cx="12" cy="10" r="2.4"/>',doc:'<path d="M7 3.5h6.5L18 8v12.5H7Z"/><path d="M13.5 3.5V8H18"/>',contact:'<circle cx="12" cy="12" r="9"/><circle cx="12" cy="10" r="3"/><path d="M6.5 18c1-2.5 3-3.5 5.5-3.5s4.5 1 5.5 3.5"/>',dollar:'<path d="M16 8.5c-.5-1.5-2-2.3-4-2.3-2.3 0-3.8 1.1-3.8 2.8 0 4 8 1.6 8 5.8 0 1.8-1.6 3-4.2 3-2 0-3.6-.9-4.2-2.5M12 4v16"/>'};
const FI=['bell','moon','shield','user','msg','phone','video'],ic=n=>`<svg class="${FI.includes(n)?'f':''}" viewBox="0 0 24 24">${P[n]}</svg>`;
let AV=false,BV=false,RP=null,DB={t:{},m:{}},cur=null,from='mgL',pv=null,ed=false,rec=null,PC={},FL={};
const ME=()=>N(typeof currentUser!=='undefined'&&currentUser).toLowerCase();
function ld(){try{DB=JSON.parse(localStorage.getItem(K))||{}}catch(e){DB={}}DB.t=DB.t||{};DB.m=DB.m||{}}
function sv(){try{localStorage.setItem(K,JSON.stringify(DB));return 1}catch(e){return 0}}
const vis=a=>a.filter(m=>!(m.hd&&m.hd.indexOf(ME())>-1));
const key=p=>[ME(),p].sort().join('|'),mt=p=>DB.m[ME()+'>'+p]||(DB.m[ME()+'>'+p]={});
const acs=(all)=>{const a=getAccounts();return Object.keys(a).filter(k=>all||k!==ME()).map(k=>a[k])};
const pr=p=>{if(p===ME()&&typeof DATA!=='undefined'&&DATA&&DATA.profile)return DATA.profile;if(PC[p])return PC[p];let r={};try{const a=getAccounts()[p];r=(JSON.parse(localStorage.getItem('black1_data__'+(a?a.username:p)))||{}).profile||{}}catch(e){}return PC[p]=r};
const nfn=p=>{const s=pr(p)||{};return (s.settings&&s.settings.nastaFont)?' nf':''};
const VBG=p=>pr(p).verified===true?'<svg class="mg-vb" viewBox="0 0 24 24" aria-label="Verified"><path fill="#2f9bff" d="M12 1.7l2.4 1.7 2.9-.3 1.2 2.7 2.7 1.2-.3 2.9L22.6 12l-1.7 2.4.3 2.9-2.7 1.2-1.2 2.7-2.9-.3L12 22.6l-2.4-1.7-2.9.3-1.2-2.7-2.7-1.2.3-2.9L1.4 12l1.7-2.4-.3-2.9 2.7-1.2 1.2-2.7 2.9.3z"/><path d="m7.6 12.3 3 3 5.9-6" fill="none" stroke="#fff" stroke-width="2.3" stroke-linecap="round" stroke-linejoin="round"/></svg>':'';
const nm=p=>mt(p).nick||pr(p).name||(getAccounts()[p]||{}).name||(getAccounts()[p]||{}).username||p;
const GR=['#6db3ff,#2f6bff','#ff7ab8,#e0388f','#5fdc8b,#1fa653','#ffbd4a,#ff7a1a','#c39bff,#7a4dff','#4fdccf,#17a3a3','#ff8a80,#e8433a'];
const img=x=>/^(data:image|https?:|blob:)/.test(N(x))?x:'';
const ini=n=>{const w=N(n).trim().split(/\s+/);return(w.length>1?w[0][0]+w[1][0]:w[0].slice(0,1)).toUpperCase()};
function A(n,seed,src,s){const im=img(src),h=[...N(seed)].reduce((a,c)=>a+c.charCodeAt(0),0);return `<i class="mg-av" style="width:${s}px;height:${s}px;font-size:${Math.round(s*.4)}px;background:${im?`url(&quot;${im}&quot;) center/cover`:`linear-gradient(150deg,${GR[h%7]})`}">${im?'':esc(ini(n))}</i>`}
const av=(p,s)=>A(nm(p),p,pr(p).avatarData||pr(p).avatar,s);
const T=t=>new Date(t).toLocaleTimeString('en-US',{hour:'numeric',minute:'2-digit'});
const D=t=>{const d=new Date(t),n=new Date(),k=Math.round((new Date(n.getFullYear(),n.getMonth(),n.getDate())-new Date(d.getFullYear(),d.getMonth(),d.getDate()))/864e5);return k<1?T(t):k<2?'Yesterday':k<7?d.toLocaleDateString('en-US',{weekday:'long'}):d.toLocaleDateString('en-US',{month:'short',day:'numeric'})};
const PV=m=>m.ty==='img'?'📷 Photo':m.ty==='file'?'📄 '+m.n:m.ty==='loc'?'📍 Location':m.ty==='con'?'👤 '+m.n:m.ty==='aud'?'🎤 Voice message':m.tx;
function show(id){['mgL','mgC','mgP'].forEach(x=>{const e=$(x);e.classList.toggle('on',x===id);e.classList.toggle('pre',x!==id&&(id==='mgP'||(id==='mgC'&&x==='mgL')))});document.body.classList.toggle('mg-chat',id==='mgC')}
const row=(p,l,u)=>`<div class="mg-r" data-p="${esc(p)}">${av(p,50)}<div class="mg-rb"><div class="mg-rt"><b dir="auto"><span class="mg-nt${nfn(p)}">${esc(nm(p))}</span>${VBG(p)}</b>${mt(p).mute?'<span>🔇</span>':''}${l?`<time>${D(l.t)}</time>`:''}</div><div class="mg-rm"><span dir="auto">${l?esc(PV(l)):'@'+esc(p)+(p===ME()?' · You':'')}</span>${u?'<u></u>':''}</div></div></div>`;
function list(){ld();PC={};const q=N($('mgS').value).trim().toLowerCase().replace(/^@/,''),me=ME();
/* search matches every registered account (yourself included) by display name or username */
const idf=p=>(nm(p)+' '+p+' '+N(pr(p).name)+' '+N(pr(p).handle).replace(/^@/,'')).toLowerCase();
const th=acs(!!q).map(a=>{const p=a.username.toLowerCase(),ms=vis(DB.t[key(p)]||[]);return{p,l:ms[ms.length-1],u:ms.some(m=>m.f!==me&&m.s<2)}});
if(BV&&!th.some(x=>mt(x.p).blk))BV=false;const vw=x=>BV?!!mt(x.p).blk:!mt(x.p).blk;
const rs=th.filter(x=>x.l&&vw(x)&&(q||BV||(AV?mt(x.p).arch:!mt(x.p).arch))&&(!q||(idf(x.p)+' '+PV(x.l)).toLowerCase().includes(q))).sort((a,b)=>(!!mt(b.p).pin-!!mt(a.p).pin)||b.l.t-a.l.t);
const na=th.filter(x=>x.l&&mt(x.p).arch&&!mt(x.p).blk).length,nbk=th.filter(x=>mt(x.p).blk).length,pp=AV?[]:th.filter(x=>!x.l&&vw(x)&&(q?idf(x.p).includes(q):(BV||!mt(x.p).gone)));
let h=q?'':BV?'<div class="mg-ar back" data-blk="0"><span>المحظورون</span><em>رجوع ›</em></div>':ARB(q,na)+(!AV&&nbk?`<div class="mg-ar" data-blk="1"><span>المحظورون</span><em>${nbk} ‹</em></div>`:'');h+=rs.length?`<div class="mg-g mg-lp">${rs.map(x=>row(x.p,x.l,x.u)).join('')}</div>`:'';
if(pp.length&&(q||BV||!rs.length))h+=`<div class="mg-sec">${q?'People':BV?'محظورون':'Start a conversation'}</div><div class="mg-g mg-lp">${pp.map(x=>row(x.p)).join('')}</div>`;
if(AV&&!q&&!rs.length)h+=`<div class="mg-em">${ic('msg')}<b>لا توجد محادثات مؤرشفة</b><span>اضغط مطولاً على أي محادثة واختر «أرشفة» لتظهر هنا.</span></div>`;
if(!h)h=`<div class="mg-em">${ic('msg')}<b>${q?'No results':'No conversations yet'}</b><span>${q?'Try another name or username.':'Messages are saved on this device only. Create another account on this device to start a conversation.'}</span></div>`;
$('mgR').innerHTML=h}
const st=p=>{const l=vis(DB.t[key(p)]||[]).filter(m=>m.f===p).pop();return mt(p).blk?'Blocked':l&&Date.now()-l.t<3e5?'<em class="mg-dot"></em>online':l?'Active '+D(l.t):'@'+esc(p)};
/* ===== message backgrounds: registry, apply, settings ===== */
const MGE=(...c)=>c.map(x=>x.indexOf('<')===0?x:'<i class="'+x+'"></i>').join('');
const MGT='<i class="vg"></i><i class="dm"></i><i class="gr"></i>';
const MGBG={
 custom:{n:'صورتي',get h(){return '<i class="cimg" style="background-image:url('+(mgSet('mgBgImg')||'')+')"></i>'}},
 nebula:{n:'السديم الملكي',h:MGE('o o1','o o2','o o3','o o4','s s1','s s2','sh','sh sh2','sw')},
 aurora:{n:'الشفق الحريري',h:MGE('o o1','o o2','o o3','r r1','r r2','r r3','b b2','b b1','s s1','sw')},
 northern:{n:'الشفق القطبي',h:MGE('s s1','s s2','cu cu1','cu cu2','cu cu3','sh','mt2','mt')},
 sunset:{n:'الغروب الذهبي',h:MGE('su','cl cl1','cl cl2','cl cl3','b b1','sw','hl')},
 ocean:{n:'أعماق المحيط',h:MGE('o o1','o o3','ry','ry ry2','fl up bu2','fl up bu1','sw')},
 sakura:{n:'ليل الساكورا',h:MGE('mo','s s2','fl dn pt2','fl dn pt1','br')},
 emerald:{n:'الزمرد الملكي',h:MGE('o o1','o o2','o o3','dc','fl gd2','fl gd1','sw')},
 gold:{n:'الذهب الأسود',h:MGE('o o1','o o2','o o3','r r1','r r2','r r3','fl gd2','fl gd1','sw')},
 cyber:{n:'نيون سايبر',h:MGE('s s1','ns','<i class="gw"><i class="gx"></i></i>','sl')},
 galaxy:{n:'المجرّة الحلزونية',h:MGE('s s2','gl','gl gl2','cr','s s1','sh','sh sh2')},
 lava:{n:'بركان متوهّج',h:MGE('o o1','o o2','o o3','o o4','ht','fl up em2','fl up em1')},
 frost:{n:'جليد الأساطير',h:MGE('o o1','o o2','o o3','fl dn sn2','fl dn sn1','sw')},
 midnight:{n:'منتصف الليل',h:MGE('o o1','o o3','s s2','s s1','sh')},
 holo:{n:'الهولوجرام',h:MGE('ho','ho ho2','s s1','sw')},
 storm:{n:'عاصفة رعدية',h:MGE('cd cd1','cd cd2','cd cd3','lt','fl dv rn2','fl dv rn1')},
 classic:{n:'كلاسيكي (ثابت)',h:''}
};
const MGDEF={list:'nebula',chat:'aurora'};
function mgSet(k){try{return typeof tpGet==='function'?tpGet(k):undefined}catch(e){}}
function mgTheme(w){const v=mgSet(w==='chat'?'mgBgChat':'mgBgList');return MGBG[v]&&(v!=='custom'||mgSet('mgBgImg'))?v:MGDEF[w]}
function mgBgHtml(id){return '<div class="mg-bgx" aria-hidden="true" data-t="'+id+'">'+MGBG[id].h+MGT+'</div>'}
function mgApplyBg(){
 const dim=Number(mgSet('mgBgDim')),vw=$('view-messages');if(vw)vw.style.setProperty('--mgdim',String(isFinite(dim)&&dim>0?Math.min(.75,dim/100):0));if(vw)vw.style.setProperty('--mgblur',(Number(mgSet('mgBgBlur'))||0)+'px');
 document.body.classList.toggle('mg-still',mgSet('mgBgAnim')===false);
 [['mgL','list'],['mgC','chat']].forEach(([id,w])=>{const p=$(id);if(!p)return;const t=mgTheme(w);let b=p.querySelector(':scope>.mg-bgx');
  if(b&&b.dataset.t===t)return;
  const h=mgBgHtml(t);if(b)b.outerHTML=h;else p.insertAdjacentHTML('afterbegin',h)})}
window.mgApplyBg=mgApplyBg;
let mgSv=0;
function mgPut(k,v){try{DATA.profile.settings[k]=v}catch(e){try{tpSet(k,v)}catch(_){}return}clearTimeout(mgSv);mgSv=setTimeout(mgFlush,500)}
function mgFlush(){if(!mgSv)return;clearTimeout(mgSv);mgSv=0;try{saveData()}catch(e){}}
addEventListener('pagehide',mgFlush);document.addEventListener('visibilitychange',()=>{if(document.hidden)mgFlush()});
let mgRf=0;function mgApplyLater(){if(mgRf)return;mgRf=requestAnimationFrame(()=>{mgRf=0;mgApplyBg()})}
function mgPick(id){if(id==='custom'&&!mgSet('mgBgImg')){mgChoose();return}const tg=window.__mgTg||'both';const set=mgPut;
 if(tg!=='chat')set('mgBgList',id);if(tg!=='list')set('mgBgChat',id);mgApplyBg();mgSettingsPaint()}
function mgSettingsPaint(){const el=document.getElementById('mgsBody');if(!el)return;const tg=window.__mgTg||'both',cur=mgTheme(tg==='chat'?'chat':'list');
 const mock=tg==='chat'?'<em class="mgs-m" style="top:22%;right:8%;width:54%"></em><em class="mgs-m" style="top:36%;left:8%;width:46%"></em><em class="mgs-m" style="top:50%;right:8%;width:60%"></em>':'<em class="mgs-m" style="top:16%;left:8%;right:8%"></em><em class="mgs-m" style="top:30%;left:8%;right:8%"></em><em class="mgs-m" style="top:44%;left:8%;right:8%"></em>';
 /* already built: only flip the selected card + swap the mock bubbles (no DOM rebuild => instant, no lag) */
 if(el.dataset.built==='1'&&el.firstElementChild){
  const cs=el.querySelectorAll('.mgs-card');
  cs.forEach(c=>c.classList.toggle('sel',c.dataset.id===cur));
  if(el.dataset.mk!==tg){el.dataset.mk=tg;cs.forEach(c=>{c.querySelectorAll('.mgs-m').forEach(m=>m.remove());c.insertAdjacentHTML('beforeend',mock)})}
  return}
 el.dataset.built='1';el.dataset.mk=tg;
 const ids=Object.keys(MGBG);
 el.innerHTML=ids.map(id=>`<div class="mgs-card ${id===cur?'sel':''}" data-id="${id}" onclick="mgPick('${id}')" role="button" aria-label="${MGBG[id].n}"><div class="mgp"></div>${mock}<span>${MGBG[id].n}</span></div>`).join('');
 const c0=el.querySelector('.mgs-card');el.style.setProperty('--k',c0?c0.clientWidth/390:.28);
 /* fill the previews progressively (selected first, 2 per frame) so opening the sheet never janks */
 const order=[cur].concat(ids.filter(x=>x!==cur));let n=0;
 (function step(){if(el.dataset.built!=='1'||!el.isConnected)return;
  for(let q=0;q<2&&n<order.length;q++,n++){const id=order[n],m=el.querySelector('.mgs-card[data-id="'+id+'"] .mgp');
   if(m&&!m.firstChild)m.innerHTML=id==='classic'?'<div class="mgs-classic"></div>':(id==='custom'&&!mgSet('mgBgImg'))?'<div class="mgs-classic mgs-add">🖼️<small>أضف صورتك</small></div>':'<div class="mg-bgx" data-t="'+id+'">'+MGBG[id].h+'<i class="vg"></i></div>'}
  if(n<order.length)requestAnimationFrame(step)})()}
function mgInp(){let i=document.getElementById('mgBgFile');if(i)return i;i=document.createElement('input');i.type='file';i.accept='image/*';i.id='mgBgFile';i.style.cssText='position:fixed;left:-9999px;opacity:0;pointer-events:none';document.body.appendChild(i);
 i.onchange=()=>{const f=i.files&&i.files[0];i.value='';if(!f)return;if(f.type&&f.type.indexOf('image/')!==0){try{toast('اختر ملف صورة')}catch(e){}return}
  const r=new FileReader();r.onerror=()=>{try{toast('تعذّر قراءة الصورة')}catch(e){}};
  r.onload=async()=>{let d=r.result;try{d=await compressDataUrl(d,1400,.82)}catch(e){}
   const prevImg=mgSet('mgBgImg');mgPut('mgBgImg',d);mgFlush();
   if(typeof storageOK!=='undefined'&&storageOK===false){mgPut('mgBgImg',prevImg);try{toast('المساحة ممتلئة — جرّب صورة أصغر')}catch(e){}return}
   const tg=window.__mgTg||'both';if(tg!=='chat')mgPut('mgBgList','custom');if(tg!=='list')mgPut('mgBgChat','custom');mgFlush();
   ['mgL','mgC'].forEach(id=>{const p=$(id),b=p&&p.querySelector(':scope>.mg-bgx');if(b&&b.dataset.t==='custom')b.outerHTML=mgBgHtml('custom')});
   const m=document.querySelector('#mgsBody .mgs-card[data-id="custom"] .mgp');if(m)m.innerHTML='<div class="mg-bgx" data-t="custom">'+MGBG.custom.h+'<i class="vg"></i></div>';
   mgApplyBg();mgSettingsPaint();mgSyncCtl();try{toast('تم تعيين الصورة كخلفية')}catch(e){}};
  r.readAsDataURL(f)};return i}
function mgChoose(){mgInp().click()}
function mgRemoveImg(){if(!mgSet('mgBgImg'))return;mgPut('mgBgImg','');mgFlush();
 const m=document.querySelector('#mgsBody .mgs-card[data-id="custom"] .mgp');if(m)m.innerHTML='<div class="mgs-classic mgs-add">🖼️<small>أضف صورتك</small></div>';
 mgApplyBg();mgSettingsPaint();mgSyncCtl();try{toast('تمت إزالة الصورة')}catch(e){}}
function mgBlur(el){mgPut('mgBgBlur',Number(el.value));el.style.setProperty('--v',(el.value/.2)+'%');mgApplyLater()}
function mgSyncCtl(){const has=!!mgSet('mgBgImg');document.querySelectorAll('.mgs-imgctl').forEach(e=>e.style.display=has?'':'none')}
function mgTarget(t){window.__mgTg=t;document.querySelectorAll('.mgs-seg button').forEach(b=>b.classList.toggle('sel',b.dataset.t===t));mgSettingsPaint()}
function mgTog(k,el){const v=!(mgSet(k)!==false);mgPut(k,v);mgApplyBg();el.querySelector('.tp-sw').classList.toggle('on',v);el.querySelector('.tp-tv').textContent=v?'تشغيل':'إيقاف'}
function mgDim(el){mgPut('mgBgDim',Number(el.value));el.style.setProperty('--v',(el.value/.7)+'%');mgApplyLater()}
function openMsgSettings(){window.__mgTg='both';const on=mgSet('mgBgAnim')!==false,dim=Number(mgSet('mgBgDim'))||0;
 tpSubOpen(tpHeader('إعدادات الرسائل','closeSub()','closeSub()','تم')+`<section class="tp-card" dir="rtl"><div class="tp-h">خلفيات الرسائل</div>
 <div class="tp-note" style="text-align:right">اختر خلفية متحركة لقائمة الرسائل وللمحادثة — ${Object.keys(MGBG).length-2} خلفية أسطورية، أو أضف صورتك الخاصة. المعاينة المتحركة للخلفية المحددة.</div>
 <div class="mgs-seg"><button type="button" data-t="both" class="sel" onclick="mgTarget('both')">الاثنان معاً</button><button type="button" data-t="list" onclick="mgTarget('list')">قائمة الرسائل</button><button type="button" data-t="chat" onclick="mgTarget('chat')">المحادثة</button></div>
 <div id="mgsBody" class="mgs-grid"></div>
 <div class="tp-label" style="text-align:right;direction:rtl">التحكم</div>
 <div class="tp-panel"><div class="tp-trow" onclick="mgChoose()"><span class="tp-tl">إضافة صورة كخلفية</span><span class="tp-tv">اختيار ›</span></div>
 <div class="tp-trow mgs-imgctl" onclick="mgRemoveImg()" style="${mgSet('mgBgImg')?'':'display:none'}"><span class="tp-tl">إزالة صورتي</span><span class="tp-tv">حذف</span></div>
 <div class="tp-slider mgs-imgctl" style="${mgSet('mgBgImg')?'':'display:none'}"><span class="tp-tl">ضبابية الصورة</span><input type="range" min="0" max="20" value="${Number(mgSet('mgBgBlur'))||0}" style="--v:${(Number(mgSet('mgBgBlur'))||0)/.2}%" oninput="mgBlur(this)"></div>
 <div class="tp-trow" onclick="mgTog('mgBgAnim',this)"><span class="tp-tl">تحريك الخلفيات</span><span class="tp-tv">${on?'تشغيل':'إيقاف'}</span><span class="tp-sw ${on?'on':''}" data-c="green"></span></div>
 <div class="tp-slider"><span class="tp-tl">تعتيم الخلفية (لراحة العين)</span><input type="range" min="0" max="70" value="${dim}" style="--v:${dim/.7}%" oninput="mgDim(this)"></div></div></section>`);
 requestAnimationFrame(()=>requestAnimationFrame(mgSettingsPaint))}
window.openMsgSettings=openMsgSettings;window.mgPick=mgPick;window.mgTarget=mgTarget;window.mgTog=mgTog;window.mgDim=mgDim;window.mgChoose=mgChoose;window.mgRemoveImg=mgRemoveImg;window.mgBlur=mgBlur;
window.mgThemeName=w=>MGBG[mgTheme(w)].n;

function setC(h){const c=$('mgC');mgApplyBg();const b=c.querySelector(':scope>.mg-bgx');[...c.children].forEach(e=>{if(e!==b)e.remove()});b.insertAdjacentHTML('afterend',h)}
function chat(){const p=cur;setC(`<div class="mg-ch mg-g"><button class="mg-bk" data-a="bk">${ic('back')}<span>Messages</span></button><button class="mg-pe" data-a="pf">${av(p,40)}<div><b dir="auto"><span class="mg-nt${nfn(p)}">${esc(nm(p))}</span>${VBG(p)}</b><small>${st(p)}</small></div></button><button data-a="cl" data-v="1" aria-label="Video call">${ic('video')}</button><button data-a="cl" aria-label="Voice call">${ic('phone')}</button></div><div class="mg-off" ${navigator.onLine?'hidden':''}>No connection — messages are saved on this device</div><div class="mg-ms" id="mgM"></div><div class="mg-rp mg-g" id="mgRp" hidden></div><div class="mg-cp mg-g"><button data-a="sh" aria-label="Share">${ic('plus')}</button><button data-a="mic" id="mgMic" aria-label="Voice message">${ic('wave')}</button><button data-a="cam" aria-label="Camera">${ic('cam')}</button><input id="mgIn" placeholder="Message..." dir="rtl" class="${nfo(ME())?'nf':''}" autocomplete="off"><button data-a="snd" class="mg-sn" aria-label="Send">${ic('chev')}</button></div>`);msgs();show('mgC');banUI()}
const nfo=u=>{const t=(pr(u).settings||{}).nastaFont;return !!t};
function bub(m){const me=m.f===ME();let c;
if(m.ty==='img')c=`<img src="${m.d}" alt="">`;else if(m.ty==='aud')c=`<audio controls src="${m.d}"></audio>`;
else if(m.ty==='file')c=`<a href="${m.d}" download="${esc(m.n)}">📄 <b>${esc(m.n)}</b></a><br><small>${esc(m.z)}</small>`;
else if(m.ty==='loc')c=`<a href="https://www.openstreetmap.org/?mlat=${+m.la}&amp;mlon=${+m.lo}#map=16/${+m.la}/${+m.lo}" target="_blank" rel="noopener">📍 Location</a><br><small>${(+m.la).toFixed(4)}, ${(+m.lo).toFixed(4)}</small>`;
else if(m.ty==='con')c=`👤 <b>${esc(m.n)}</b><br><small>${esc(m.tel)}</small>`;
else c=esc(m.tx).replace(/((?:https?:\/\/|www\.)[^\s<]+)/g,u=>`<a href="${/^www/.test(u)?'https://':''}${u}" target="_blank" rel="noopener">${u}</a>`);
return `<div class="mg-b ${me?'me':'th'}" data-mi="${esc(m.i)}">${me?'':av(cur,30)}<div><p dir="auto"${nfo(m.f)?' class="nf"':''}>${m.rp?`<span class="mg-q" dir="auto"><b>${esc(m.rp.n)}</b>${esc(m.rp.t)}</span>`:''}${c}</p><time>${m.st?'<span class="mg-st">★</span> ':''}${T(m.t)}${me?(m.s===-1?` · <a data-rt="${m.i}">Failed — tap to retry</a>`:m.s===2?' · Read':' · Sent'):''}</time></div></div>`}
function msgs(){ld();const th=vis(DB.t[key(cur)]||[]).concat(FL[cur]||[]),e=$('mgM');if(!e)return;e.innerHTML=th.length?th.map(bub).join(''):`<div class="mg-em">${ic('msg')}<b>Say hello 👋</b><span>Messages in this chat are stored on this device only.</span></div>`;e.scrollTop=e.scrollHeight}
window.mgOpenChat=function(p){go('messages');openC(String(p).toLowerCase())};
function openC(p){PC={};RP=null;cur=p;from='mgL';ld();let c=0;(DB.t[key(p)]||[]).forEach(m=>{if(m.f!==ME()&&m.s<2){m.s=2;c=1}});if(c)sv();chat()}
/* ===== anti-abuse: profanity -> 30 min messaging ban ===== */
const BAN_MS=30*60*1000,BK=()=>'black1_msgban_v1:'+ME();
const bnu=()=>{try{const u=+localStorage.getItem(BK())||0;if(u>Date.now())return u;if(u)localStorage.removeItem(BK())}catch(e){}return 0};
const bnLeft=()=>{const u=bnu();if(!u)return '';const s=Math.ceil((u-Date.now())/1000);return Math.floor(s/60)+':'+String(s%60).padStart(2,'0')};
const nrm=(s,j)=>{s=N(s).toLowerCase().replace(/[\u064B-\u065F\u0670\u0640\u200c\u200d]/g,'').replace(/[أإآٱ]/g,'ا').replace(/ى/g,'ي').replace(/ئ/g,'ي').replace(/ؤ/g,'و').replace(/ة/g,'ه').replace(/ک/g,'ك').replace(/[یۍ]/g,'ي');if(j)s=s.replace(/[._\-*+'"`~]+/g,'');return s.replace(/[^\p{L}\p{N}]+/gu,' ').trim().replace(/(.)\1+/g,'$1')};
const EX=new Set(['خول','خولات','عرص','عرصين','كس','زب','طيز','نيك','قحبه','قحاب','عاهره','شرموط','شرموطه','متناك','متناكه','منيوك','منيوكه','fuck','fuk','fck','fucker','fucking','motherfucker','bitch','cunt','pussy','dick','asshole','whore','slut'].map(w=>nrm(w)));
const ST=['كسمك','كسامك','كسختك','كساختك','كسكم','هنيك','انيكك','نيكمك','شرموط','متناك','منيوك','ابنالمتناك','ابنالعرص','ابنالخول','ابنالقحب','ابنالشرموط'].map(w=>nrm(w));
const bad=t=>{for(const j of[0,1]){const raw=nrm(t,j).split(' ').filter(Boolean),tk=[];let run='';for(const w of raw){if(w.length===1)run+=w;else{if(run){tk.push(run);run=''}tk.push(w)}}if(run)tk.push(run);
for(const w of tk){if(EX.has(w)||(w.length>2&&EX.has(w.replace(/^(?:ال|[وفبلك])/,''))))return 1}
const c=tk.join('');if(ST.some(x=>c.includes(x)))return 1}return 0};
let bt=null;
const bkS=()=>{try{window.bkInline&&window.bkInline(!!cur&&(bkb(cur)||!!bnu()))}catch(e){}};
function banUI(){clearInterval(bt);const f=()=>{const i=$('mgIn');if(!i){clearInterval(bt);return}const l=bnLeft();if(l){i.disabled=true;i.value='';i.placeholder='🚫 محظور من المراسلة '+l}else{i.disabled=false;i.placeholder='Message...';clearInterval(bt)}bkS()};f();bt=setInterval(f,1000)}
function chk(t){if(bnu()){toast('🚫 أنت محظور من المراسلة، متبقي '+bnLeft());banUI();return 1}
if(t&&bad(t)){try{localStorage.setItem(BK(),String(Date.now()+BAN_MS))}catch(e){}toast('🚫 تم حظرك من مراسلة أي شخص لمدة 30 دقيقة بسبب ألفاظ مسيئة');banUI();return 2}return 0}
const bkb=p=>{ld();return !!(mt(p).blk||(DB.m[p+'>'+ME()]||{}).blk)};
function send(o){if(bkb(cur)){window.showBlockCard&&window.showBlockCard();return}if(chk(o&&o.tx))return;if(mt(cur).blk)return toast('Unblock this contact to send messages');ld();const k=key(cur),m=Object.assign({i:Date.now()+Math.random().toString(36).slice(2,6),f:ME(),t:Date.now(),s:1},o);(DB.t[k]=DB.t[k]||[]).push(m);if(!sv()){DB.t[k].pop();m.s=-1;(FL[cur]=FL[cur]||[]).push(m)}msgs()}
function snd(){const i=$('mgIn'),v=i.value.trim();if(!v)return;if(bkb(cur)){window.showBlockCard&&window.showBlockCard();return}const ck=chk(v);if(ck){if(ck===2)i.value='';return}i.value='';const o={ty:'txt',tx:v};if(RP){o.rp={n:RP.n,t:RP.t};RP=null;rpBar()}send(o)}
function prof(p){ld();const m=mt(p),a=getAccounts()[p]||{},u=a.username||p,nb=Object.keys(DB.m).filter(k=>k.indexOf(ME()+'>')===0&&DB.m[k].blk).length;
const r=(i,l,v,x)=>`<button class="mg-sr" data-s="${x}">${ic(i)}<span>${l}</span><em dir="auto">${esc(v)}</em>${ic('chev')}</button>`;
$('mgP').innerHTML=`<div class="mg-ph mg-g"><button data-a="pb" aria-label="Back">${ic('back')}</button><b>Contact Details</b><button data-a="ed">${ed?'Done':'Edit'}</button></div><div class="mg-pcd mg-g">${av(p,92)}${img(pr(p).avatarData||pr(p).avatar)?`<em class="mg-in">${esc(ini(nm(p)))}</em>`:''}${ed?`<input id="mgEn" value="${esc(nm(p))}" dir="auto" maxlength="40">`:`<h2 dir="auto">${esc(nm(p))}</h2>`}${ed?`<input id="mgEt" value="${esc(m.title||'')}" placeholder="Title or note" dir="auto" maxlength="60">`:`<p dir="auto">${esc(m.title||pr(p).bio||'@'+u)}</p>`}<div class="mg-ac">${[['msg','Message','m'],['phone','Call','c'],['video','Video','v'],['mail','Mail','e']].map(x=>`<button data-a="${x[2]}"><b>${ic(x[0])}</b>${x[1]}</button>`).join('')}</div></div><div class="mg-set mg-g"><h3>Settings</h3>${r('bell','Notifications',m.mute?'Off':'On','mute')}${r('moon','Preferences',m.pin?'Pinned':'Not pinned','pin')}${r('shield','Privacy &amp; Security','Clear chat','clr')}${r('link','Linked Accounts','@'+u,'cp')}${r('user',m.blk?'Unblock Contact':'Block Contact',(m.blk?'Blocked · ':'')+nb,'blk')}${r('bell','Test incoming call','Preview','tinc')}${r('help','Help Center','?','help')}</div>`;show('mgP')}
function openP(f){from=f;ed=false;prof(cur)}
const rf=f=>new Promise((ok,no)=>{const r=new FileReader();r.onload=()=>ok(r.result);r.onerror=no;r.readAsDataURL(f)});
function prev(h,cb){pv=cb;$('mgPb').innerHTML=h;$('mgPv').classList.add('on');$('mgSh').classList.remove('on')}
const pick=e=>{e.value='';e.click()};
const pickCam=()=>{if(window.XCam&&navigator.mediaDevices&&navigator.mediaDevices.getUserMedia){window.XCam.open({onPhoto:async d=>{try{const c=await compressDataUrl(d,1000,.72);prev(`<img src="${c}" alt="">`,()=>send({ty:'img',d:c}))}catch(x){toast('Could not open this image')}},onGallery:()=>pick($('mgFi'))})}else pick($('mgFc'))};
$('mgFi').onchange=$('mgFc').onchange=async e=>{const f=e.target.files[0];if(!f)return;try{const d=await compressDataUrl(await rf(f),1000,.72);prev(`<img src="${d}" alt="">`,()=>send({ty:'img',d}))}catch(x){toast('Could not open this image')}};
$('mgFd').onchange=async e=>{const f=e.target.files[0];if(!f)return;if(f.size>7e5)return toast('File is too large (max 700 KB)');const d=await rf(f),z=Math.ceil(f.size/1024)+' KB';prev(`<div class="mg-fp">${ic('doc')}<b dir="auto">${esc(f.name)}</b><small>${z}</small></div>`,()=>send({ty:'file',d,n:f.name,z}))};
function loc(){if(!navigator.geolocation)return toast('Location is not supported here');navigator.geolocation.getCurrentPosition(p=>{const la=p.coords.latitude,lo=p.coords.longitude;prev(`<div class="mg-fp">${ic('pin')}<b>Current location</b><small>${la.toFixed(4)}, ${lo.toFixed(4)}</small></div>`,()=>send({ty:'loc',la,lo}))},()=>toast('Location permission is off — allow it in browser settings'),{timeout:12000})}
async function con(){if(!(navigator.contacts&&navigator.contacts.select))return toast('Contact picker is not supported in this browser');try{const r=await navigator.contacts.select(['name','tel'],{multiple:false});if(!r[0])return;const n=(r[0].name||[])[0]||'Contact',tel=(r[0].tel||[])[0]||'';prev(`<div class="mg-fp">${ic('contact')}<b dir="auto">${esc(n)}</b><small>${esc(tel)}</small></div>`,()=>send({ty:'con',n,tel}))}catch(e){toast('Contact access was denied')}}
async function mic(){if(rec)return rec.stop();try{const s=await navigator.mediaDevices.getUserMedia({audio:true}),ch=[],r=rec=new MediaRecorder(s);r.ondataavailable=e=>ch.push(e.data);r.onstop=async()=>{s.getTracks().forEach(t=>t.stop());rec=null;$('mgMic')&&$('mgMic').classList.remove('rec');send({ty:'aud',d:await rf(new Blob(ch,{type:r.mimeType}))})};r.start();$('mgMic').classList.add('rec');setTimeout(()=>r.state==='recording'&&r.stop(),3e4)}catch(e){rec=null;toast('Microphone permission is off — allow it in browser settings')}}
const O=[['photo','Photos','photo','radial-gradient(circle at 30% 22%,#9be4ff,#2f7bff 52%,#9a3cff)'],['cam','Camera','cam','radial-gradient(circle at 30% 22%,#ffe680,#ff9a1f 50%,#ff4a2e)'],['loc','Location','pin','radial-gradient(circle at 30% 22%,#86f3c6,#19b98a 55%,#0b7f95)'],['doc','Document','doc','radial-gradient(circle at 30% 22%,#e6b3ff,#9a4dff 55%,#5b3cff)'],['con','Contact','contact','linear-gradient(105deg,#ffe92e,#ff9a1f 45%,#ff3b30)'],['cash','Apple Cash','dollar','radial-gradient(circle at 30% 22%,#f0fdff,#7fd7e8 55%,#93a8ff)']];
$('mgOg').innerHTML=O.map(o=>`<button data-o="${o[0]}"><b class="mg-o" style="background:${o[3]}">${ic(o[2])}</b>${o[1]}</button>`).join('');
const cinfo=p=>({name:nm(p),av:av(p,128),img:img(pr(p).avatarData||pr(p).avatar)||''});
const NA='Calls are unavailable — no calling service is connected';
$('mgSh').onclick=e=>{const o=e.target.closest('[data-o]');if(!o){if(!e.target.closest('.mg-sp'))$('mgSh').classList.remove('on');return}$('mgSh').classList.remove('on');({photo:()=>pick($('mgFi')),cam:()=>pickCam(),loc,doc:()=>pick($('mgFd')),con,cash:()=>toast('Apple Cash is unavailable — no payment service is connected')})[o.dataset.o]()};
$('mgPx').onclick=()=>{pv=null;$('mgPv').classList.remove('on')};
$('mgPo').onclick=()=>{const c=pv;pv=null;$('mgPv').classList.remove('on');c&&c()};
$('mgR').onclick=e=>{const bz=e.target.closest('[data-blk]');if(bz){BV=bz.dataset.blk==='1';AV=false;return list()}const a=e.target.closest('[data-arch]');if(a){AV=a.dataset.arch==='1';BV=false;return list()}if(Date.now()-LPF<700)return;const r=e.target.closest('[data-p]');if(r)openC(r.dataset.p)};
$('mgSb').onclick=()=>{const s=$('mgS');s.hidden=!s.hidden;if(!s.hidden)s.focus();else{s.value='';list()}};$('mgS').oninput=list;
{const mb=$('mgL').querySelector('.mg-h h1');if(mb){mb.style.cursor='pointer';mb.setAttribute('role','button');mb.onclick=()=>{try{sound('soft')}catch(e){}openMsgSettings()}}}
$('mgMe').onclick=()=>window.setArcActive&&window.setArcActive('profile');
$('mgC').onclick=e=>{const b=e.target.closest('[data-a],[data-rt]');if(!b)return;if(b.dataset.rt){const x=(FL[cur]||[]).find(y=>y.i===b.dataset.rt);FL[cur]=(FL[cur]||[]).filter(y=>y!==x);const{i,f,t,s,...o}=x;return send(o)}
({bk:()=>{cur=null;show('mgL');list()},pf:()=>openP('mgC'),cl:()=>B1Call.start(cinfo(cur),b.dataset.v==='1'),sh:()=>$('mgSh').classList.add('on'),cam:()=>pickCam(),mic,snd})[b.dataset.a]()};
/* ===== message context menu (tap a bubble) ===== */
const CI={d:'<path d="M4 7h16M9 7V4h6v3M6 7l1 13h10l1-13M10 11v6M14 11v6"/>',f:'<path d="M14 5l6 6-6 6M20 11H9a5 5 0 0 0-5 5v2"/>',c:'<rect x="8" y="8" width="12" height="12" rx="3"/><path d="M16 8V6a2 2 0 0 0-2-2H6a2 2 0 0 0-2 2v8a2 2 0 0 0 2 2h2"/>',s:'<path d="m12 3.5 2.6 5.3 5.9.9-4.3 4.1 1 5.8L12 16.8 6.8 19.6l1-5.8L3.5 9.7l5.9-.9z"/>',r:'<path d="M10 5 4 11l6 6M4 11h10a6 6 0 0 1 6 6v1"/>',i:'<circle cx="12" cy="12" r="9"/><path d="M12 11v6M12 7.5v.5"/>',b:'<circle cx="12" cy="12" r="9"/><path d="m6 6 12 12"/>'};
const cb=(k,l,x)=>`<button class="${k}" data-k="${x||k}"><svg viewBox="0 0 24 24">${CI[k]}</svg><span>${l}</span></button>`;
function fm(id){ld();for(const a of[DB.t[key(cur)]||[],FL[cur]||[]]){const m=a.find(y=>String(y.i)===id);if(m)return{m,a}}return null}
function mtx(m){return m.ty==='img'?'📷 صورة':m.ty==='aud'?'🎤 رسالة صوتية':m.ty==='file'?'📄 '+m.n:m.ty==='loc'?'📍 موقع':m.ty==='con'?'👤 '+m.n:String(m.tx||'')}
function rpBar(){const e=$('mgRp');if(!e)return;if(!RP){e.hidden=true;e.innerHTML='';return}e.hidden=false;e.innerHTML=`<span dir="auto"><b>رد على ${esc(RP.n)}</b>${esc(RP.t)}</span><button type="button" data-rpx aria-label="إلغاء">✕</button>`}
function cmClose(){document.querySelectorAll('.mg-cmo,.mg-cm').forEach(e=>{e.classList.remove('on');setTimeout(()=>e.remove(),220)})}
function cmPlace(el,r,me){const w=250,h=el.offsetHeight,W=innerWidth,H=innerHeight;let l=me?r.right-w:r.left;l=Math.max(8,Math.min(l,W-w-8));let t=r.bottom+8;if(t+h>H-8)t=r.top-h-8;if(t<8)t=Math.max(8,H-h-8);el.style.left=l+'px';el.style.top=t+'px';el.style.transformOrigin=(t>r.top?'top':'bottom')+(me?' right':' left')}
function cmOpen(id,r){const f=fm(id);if(!f)return;const m=f.m,me=m.f===ME();cmClose();
const ov=document.createElement('div');ov.className='mg-cmo';const el=document.createElement('div');el.className='mg-cm';el.dir='rtl';
el.innerHTML=cb('d','حذف')+cb('f','إعادة توجيه')+cb('c','نسخ النص')+'<div class="sp"></div>'+cb('s',m.st?'إلغاء التمييز':'تمييز بنجمة')+cb('r','رد')+'<div class="sp"></div>'+cb('i','معلومات الرسالة')+(me?'':cb('b','حظر المستخدم'));
document.body.append(ov,el);cmPlace(el,r,me);requestAnimationFrame(()=>{ov.classList.add('on');el.classList.add('on')});
ov.onclick=cmClose;
el.onclick=e=>{const b=e.target.closest('[data-k],[data-fw],[data-dl]');if(!b)return;e.stopPropagation();
if(b.dataset.dl){const all=b.dataset.dl==='all',bp=document.querySelector('.mg-b[data-mi="'+CSS.escape(String(m.i))+'"] p');if(all||f.a===FL[cur])f.a.splice(f.a.indexOf(m),1);else(m.hd=m.hd||[]).push(ME());sv();cmClose();ivClose();const fin=()=>{msgs();toast(all?'تم الحذف للجميع':'تم الحذف لك')};return bp?snap(bp,fin):fin()}
if(b.dataset.fw){const p=b.dataset.fw;if(chk(m&&m.tx)){cmClose();return}if(mt(p).blk){cmClose();return toast('هذا المستخدم محظور')}ld();const k=[ME(),p].sort().join('|'),c=Object.assign({},m,{i:Date.now()+Math.random().toString(36).slice(2,6),f:ME(),t:Date.now(),s:1});delete c.rp;delete c.st;(DB.t[k]=DB.t[k]||[]).push(c);sv();cmClose();return toast('تمت إعادة التوجيه')}
const x=b.dataset.k;
if(x==='d'){el.innerHTML='<h4>حذف الرسالة</h4><button class="d" data-dl="me"><svg viewBox="0 0 24 24">'+CI.d+'</svg><span>حذف لي</span></button><button class="d" data-dl="all"><svg viewBox="0 0 24 24">'+CI.d+'</svg><span>حذف للجميع</span></button><div class="sp"></div><button class="i" data-k="x"><svg viewBox="0 0 24 24"><path d="M6 6l12 12M18 6 6 18"/></svg><span>إلغاء</span></button>';cmPlace(el,r,me);return}
if(x==='x')return cmClose();
if(x==='c'){const t=m.ty==='loc'?(+m.la).toFixed(5)+', '+(+m.lo).toFixed(5):m.ty==='img'||m.ty==='aud'?'':mtx(m);cmClose();if(!t)return toast('لا يوجد نص للنسخ');try{navigator.clipboard.writeText(t);toast('تم نسخ النص')}catch(e){toast('تعذّر النسخ')}return}
if(x==='s'){m.st=!m.st;if(!m.st)delete m.st;sv();cmClose();msgs();return toast(m.st?'تم تمييز الرسالة بنجمة':'أُلغي التمييز')}
if(x==='r'){RP={i:m.i,n:me?'نفسك':nm(cur),t:mtx(m).slice(0,80)};cmClose();ivClose();rpBar();const i=$('mgIn');i&&i.focus();return}
if(x==='b'){mt(cur).blk=true;sv();cmClose();bkS();return toast('تم حظر المستخدم')}
if(x==='i'){const ty={txt:'نص',img:'صورة',aud:'رسالة صوتية',file:'ملف',loc:'موقع',con:'جهة اتصال'}[m.ty||'txt']||'نص',st=me?(m.s===-1?'فشل الإرسال':m.s===2?'تمت القراءة':'تم الإرسال'):'مستلمة';
el.innerHTML=`<h4>معلومات الرسالة</h4><div class="inf"><span>النوع</span><b>${ty}</b></div><div class="inf"><span>الوقت</span><b>${new Date(m.t).toLocaleString('ar-EG',{dateStyle:'medium',timeStyle:'short'})}</b></div><div class="inf"><span>الحالة</span><b>${st}</b></div>`;cmPlace(el,r,me);return}
if(x==='f'){const ps=acs().map(a=>a.username.toLowerCase());if(!ps.length){cmClose();return toast('لا توجد جهات اتصال')}el.innerHTML='<h4>إعادة توجيه إلى</h4>'+ps.map(q=>`<button data-fw="${esc(q)}">${av(q,30)}<span dir="auto">${esc(nm(q))}</span></button>`).join('');cmPlace(el,r,me)}}}
/* ===== full-screen image viewer ===== */
function ivClose(){const v=document.getElementById('mgIv');if(v){v.classList.remove('on');setTimeout(()=>v.remove(),220)}}
function ivMenu(id){cmOpen(id,{left:innerWidth/2-125,right:innerWidth/2+125,top:innerHeight-70,bottom:innerHeight-70})}
function ivOpen(id,src){ivClose();const v=document.createElement('div');v.id='mgIv';v.className='mg-iv';
v.innerHTML='<button class="x" aria-label="إغلاق">✕</button><button class="mo" aria-label="القائمة">⋯</button><img alt="">';
v.querySelector('img').src=src;document.body.append(v);requestAnimationFrame(()=>v.classList.add('on'));
v.onclick=e=>{if(e.target.closest('.x'))return ivClose();if(e.target.closest('.mo'))return ivMenu(id)};lpBind(v.querySelector('img'),()=>ivMenu(id))}
addEventListener('keydown',e=>{if(e.key==='Escape')ivClose()});
/* ===== dust disintegration animation ===== */
function snap(p,done,paint){
 const r=p.getBoundingClientRect(),w=Math.ceil(r.width),h=Math.ceil(r.height),row=p.closest('.mg-b')||p;
 if(!w||!h||matchMedia('(prefers-reduced-motion:reduce)').matches)return done();
 const me=row.classList.contains('me'),cs=getComputedStyle(p),o=document.createElement('canvas');o.width=w;o.height=h;const x=o.getContext('2d',{willReadFrequently:true});
 if(paint)paint(x,w,h);else{const g=x.createLinearGradient(0,0,w,h);if(me){g.addColorStop(0,'#3b6bff');g.addColorStop(1,'#7a3cf0')}else{g.addColorStop(0,'rgba(255,255,255,.8)');g.addColorStop(1,'rgba(235,240,255,.6)')}
 const R=Math.min(22,h/2);x.beginPath();x.moveTo(R,0);x.arcTo(w,0,w,h,R);x.arcTo(w,h,0,h,R);x.arcTo(0,h,0,0,R);x.arcTo(0,0,w,0,R);x.closePath();x.fillStyle=g;x.fill();
 p.querySelectorAll('img').forEach(im=>{const q=im.getBoundingClientRect();try{x.drawImage(im,q.left-r.left,q.top-r.top,q.width,q.height)}catch(e){}});
 const t=(p.innerText||'').trim();
 if(t&&!p.querySelector('img')){const fs=parseFloat(cs.fontSize)||18,rtl=/[֐-ࣿ]/.test(t);x.font=cs.fontWeight+' '+fs+'px '+cs.fontFamily;x.fillStyle=cs.color;x.textBaseline='top';x.direction=rtl?'rtl':'ltr';x.textAlign=rtl?'right':'left';
  const mx=w-32,ls=[];t.split('\n').forEach(par=>{let l='';par.split(' ').forEach(wd=>{const n=l?l+' '+wd:wd;if(l&&x.measureText(n).width>mx){ls.push(l);l=wd}else l=n});ls.push(l)});
  ls.forEach((l,i)=>x.fillText(l,rtl?w-16:16,11+i*fs*1.3))}
 }
 const st=Math.max(2,Math.ceil(Math.sqrt(w*h/5500))),d=x.getImageData(0,0,w,h).data,P=[];
 for(let yy=0;yy<h;yy+=st)for(let xx=0;xx<w;xx+=st){const i=(yy*w+xx)*4;if(d[i+3]<50)continue;
  P.push({x:xx,y:yy,c:'rgb('+d[i]+','+d[i+1]+','+d[i+2]+')',a:d[i+3]/255,d:(1-xx/w)*480+Math.random()*180,vx:-(70+Math.random()*300),vy:(Math.random()-.55)*150,l:700+Math.random()*600,ph:Math.random()*6.28})}
 const OX=340,OY=90,cv=document.createElement('canvas');cv.width=w+OX+30;cv.height=h+OY*2;cv.style.cssText='position:fixed;pointer-events:none;z-index:242;left:'+(r.left-OX)+'px;top:'+(r.top-OY)+'px';
 const c=cv.getContext('2d');document.body.appendChild(cv);row.style.visibility='hidden';
 let t0=0,end=0;P.forEach(q=>end=Math.max(end,q.d+q.l));
 (function f(ts){if(!t0)t0=ts;const T=ts-t0;c.clearRect(0,0,cv.width,cv.height);
  for(const q of P){const a=T-q.d;let px=q.x,py=q.y,al=q.a,s=st;
   if(a>0){const k=a/q.l;if(k>=1)continue;const e=a/1000;px+=q.vx*e*(1-.3*k);py+=q.vy*e+Math.sin(a/130+q.ph)*7*k-26*k*k;al*=1-k*k;s=st*(1-.55*k)}
   c.globalAlpha=al;c.fillStyle=q.c;c.fillRect(OX+px,OY+py,s,s)}
  if(T<end)requestAnimationFrame(f);else{cv.remove();done()}})(performance.now?performance.now():0);
}
/* long-press helper */
let LPF=0;
function lpBind(el,fn){if(!el)return;let t,x0,y0;const c=()=>{clearTimeout(t)};
el.addEventListener('pointerdown',e=>{x0=e.clientX;y0=e.clientY;c();t=setTimeout(()=>{LPF=Date.now();if(navigator.vibrate)try{navigator.vibrate(15)}catch(_){}fn(e)},450)});
el.addEventListener('pointermove',e=>{if(Math.abs(e.clientX-x0)>10||Math.abs(e.clientY-y0)>10)c()});
['pointerup','pointercancel','pointerleave'].forEach(n=>el.addEventListener(n,c));
el.addEventListener('contextmenu',e=>{e.preventDefault();c();if(Date.now()-LPF>600){LPF=Date.now();fn(e)}})}

/* ===== conversation list: long-press menu (delete / archive) ===== */
CI.a='<rect x="3" y="4" width="18" height="5" rx="1.5"/><path d="M5 9v9a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2V9M10 13h4"/>';
function ARB(q,na){if(q)return'';return AV?'<div class="mg-ar back" data-arch="0"><span>المحادثات المؤرشفة</span><em>رجوع ›</em></div>':na?`<div class="mg-ar" data-arch="1"><span>المؤرشفة</span><em>${na} ‹</em></div>`:''}
function cvPaint(r,box){return new Promise(ok=>{
 const a=r.querySelector('.mg-av'),bg=a?getComputedStyle(a).backgroundImage:'',m=/url\("?'?([^"')]+)"?'?\)/.exec(bg);
 const go=im=>ok((x,w,h)=>{const rr=(box||r).getBoundingClientRect();
  {const R=box?24:18,g=x.createLinearGradient(0,0,w,h);g.addColorStop(0,'rgba(120,130,175,.62)');g.addColorStop(1,'rgba(70,78,120,.55)');x.beginPath();x.moveTo(R,.5);x.arcTo(w-.5,.5,w-.5,h-.5,R);x.arcTo(w-.5,h-.5,.5,h-.5,R);x.arcTo(.5,h-.5,.5,.5,R);x.arcTo(.5,.5,w-.5,.5,R);x.closePath();x.fillStyle=g;x.fill();x.lineWidth=1;x.strokeStyle='rgba(255,255,255,.7)';x.stroke()}
  if(a){const q=a.getBoundingClientRect(),cx=q.left-rr.left+q.width/2,cy=q.top-rr.top+q.height/2,R=q.width/2;x.save();x.beginPath();x.arc(cx,cy,R,0,6.2832);x.clip();
   if(im){const k=Math.max(q.width/im.width,q.height/im.height);x.drawImage(im,cx-im.width*k/2,cy-im.height*k/2,im.width*k,im.height*k)}
   else{const cs=bg.match(/rgba?\([^)]+\)/g)||['rgb(80,120,255)','rgb(120,70,240)'],g=x.createLinearGradient(cx-R,cy-R,cx+R,cy+R);g.addColorStop(0,cs[0]);g.addColorStop(1,cs[1]||cs[0]);x.fillStyle=g;x.fillRect(cx-R,cy-R,R*2,R*2);
    x.fillStyle='#fff';x.font='700 '+Math.round(R*.8)+'px sans-serif';x.textAlign='center';x.textBaseline='middle';x.direction='ltr';x.fillText((a.textContent||'').trim(),cx,cy+1)}
   x.restore()}
  ['.mg-nt','.mg-rm span','.mg-rt time'].forEach(sel=>{const el=r.querySelector(sel);if(!el)return;const t=(el.textContent||'').trim();if(!t)return;
   const q=el.getBoundingClientRect(),cs=getComputedStyle(el),rtl=/[֐-ࣿ]/.test(t);
   x.font=cs.fontWeight+' '+cs.fontSize+' '+cs.fontFamily;x.fillStyle=cs.color;x.textBaseline='middle';x.direction=rtl?'rtl':'ltr';x.textAlign=rtl?'right':'left';
   x.fillText(t,rtl?q.right-rr.left:q.left-rr.left,q.top-rr.top+q.height/2,Math.max(10,q.width))})});
 if(m){const im=new Image();im.onload=()=>go(im);im.onerror=()=>go(null);im.src=m[1]}else go(null)})}
/* ===== synthesized glass-breaking sound (WebAudio, no files) ===== */
function glassSound(c,t0,out,ts){
 ts=ts||.56;
 const rnd=(a,b)=>a+Math.random()*(b-a),SR=c.sampleRate;
 const bus=c.createGain(),master=c.createGain(),comp=c.createDynamicsCompressor(),wet=c.createGain(),cvv=c.createConvolver();
 master.gain.value=.8;comp.threshold.value=-16;comp.knee.value=8;comp.ratio.value=8;comp.attack.value=.002;comp.release.value=.25;
 const L=Math.floor(SR*.75),ib=c.createBuffer(2,L,SR);
 for(let ch=0;ch<2;ch++){const d=ib.getChannelData(ch);for(let i=0;i<L;i++)d[i]=(Math.random()*2-1)*Math.pow(1-i/L,3.4)}
 cvv.buffer=ib;wet.gain.value=.2;
 bus.connect(master);bus.connect(cvv);cvv.connect(wet);wet.connect(master);master.connect(comp);comp.connect(out||c.destination);
 const nbuf=c.createBuffer(1,SR*2,SR),nd=nbuf.getChannelData(0);for(let i=0;i<nd.length;i++)nd[i]=Math.random()*2-1;
 /* filtered noise burst: shaped, swept, with a sharp attack */
 const nz=(t,dur,type,f0,f1,q,pk,att)=>{const s=c.createBufferSource(),f=c.createBiquadFilter(),g=c.createGain();
  s.buffer=nbuf;f.type=type;f.Q.value=q;f.frequency.setValueAtTime(f0,t);f.frequency.exponentialRampToValueAtTime(Math.max(40,f1),t+dur);
  g.gain.setValueAtTime(0.0001,t);g.gain.linearRampToValueAtTime(pk,t+(att||.002));g.gain.exponentialRampToValueAtTime(0.0001,t+dur);
  s.connect(f);f.connect(g);g.connect(bus);s.start(t,rnd(0,1.5));s.stop(t+dur+.02)};
 /* inharmonic partials = the "ting" of a glass shard */
 const ping=(t,f,dec,v)=>{[[1,1],[2.76,.42],[5.4,.16]].forEach(([r,a])=>{const o=c.createOscillator(),g=c.createGain();o.type='sine';o.frequency.value=f*r;
  g.gain.setValueAtTime(0.0001,t);g.gain.linearRampToValueAtTime(v*a,t+.0012);g.gain.exponentialRampToValueAtTime(0.0001,t+dec/(r>1?r*.6:1));
  o.connect(g);g.connect(bus);o.start(t);o.stop(t+dec+.03)})};
 const thud=(t,v,lo)=>{const o=c.createOscillator(),g=c.createGain();o.type='sine';o.frequency.setValueAtTime(lo?150:230,t);o.frequency.exponentialRampToValueAtTime(lo?38:62,t+.16);
  g.gain.setValueAtTime(0.0001,t);g.gain.linearRampToValueAtTime(v,t+.004);g.gain.exponentialRampToValueAtTime(0.0001,t+(lo?.3:.14));o.connect(g);g.connect(bus);o.start(t);o.stop(t+.35);
  nz(t,.05,'lowpass',1400,300,.7,v*.8,.001)};
 const lf=()=>Math.exp(rnd(Math.log(1900),Math.log(9500)));
 /* 1) two hard impacts: the knock, a bright snap and a few shard rings */
 [[0,1],[.14,.8]].forEach(([d,k])=>{const t=t0+d;thud(t,.5*k);nz(t,.1,'bandpass',4200,2600,.8,.85*k,.001);nz(t,.03,'highpass',6500,6500,.5,.5*k,.0008);
  for(let i=0;i<7;i++)ping(t+rnd(0,.06),lf(),rnd(.06,.2),rnd(.03,.08)*k)});
 /* 2) the pane creaking as the cracks run, denser early */
 for(let i=0;i<16;i++){const t=t0+.03+Math.pow(Math.random(),1.6)*(ts-.06);
  if(Math.random()<.65)nz(t,rnd(.008,.026),'bandpass',rnd(2600,8500),rnd(2200,7000),rnd(3,9),rnd(.12,.42),.0006);
  else nz(t,rnd(.05,.11),'bandpass',rnd(1500,2400),rnd(2400,3800),rnd(5,10),rnd(.06,.14),.01);
  if(Math.random()<.3)ping(t,lf(),rnd(.03,.09),rnd(.015,.04))}
 /* 3) the pane gives way: crash, hiss of fragments, body of the break */
 const T=t0+ts;
 thud(T,.65,1);thud(T,.35);
 nz(T,.55,'bandpass',8200,2300,.6,1.0,.0025);
 nz(T,.95,'highpass',5200,3800,.4,.55,.003);
 nz(T+.02,.35,'bandpass',3200,1500,1.1,.6,.003);
 /* 4) the shower of shard rings and the clinks of pieces falling */
 for(let i=0;i<80;i++)ping(T+Math.min(.9,-Math.log(rnd(.04,1))*.22)+rnd(0,.02),lf(),rnd(.05,.3),rnd(.025,.1));
 for(let i=0;i<34;i++){const t=T+rnd(.3,1.55);ping(t,rnd(3000,10500),rnd(.03,.13),rnd(.015,.06));if(Math.random()<.7)nz(t,rnd(.01,.03),'bandpass',rnd(5000,9500),rnd(4000,8000),rnd(2,6),rnd(.08,.22),.0005)}
}
/* ===== glass shatter animation (conversation row) ===== */
function glassBreakOld(tg,done,paint){
 const r=tg.getBoundingClientRect(),w=Math.ceil(r.width),h=Math.ceil(r.height);
 if(!w||!h||matchMedia('(prefers-reduced-motion:reduce)').matches)return done();
 const D=Math.min(2,window.devicePixelRatio||1),rnd=(a,b)=>a+Math.random()*(b-a),TAU=Math.PI*2,G=2400;
 /* 1) the pane = the row painted onto a canvas, with a glass sheen */
 const pane=document.createElement('canvas');pane.width=Math.round(w*D);pane.height=Math.round(h*D);
 const px=pane.getContext('2d');px.scale(D,D);if(paint)paint(px,w,h);
 px.save();px.globalCompositeOperation='source-atop';
 const sg=px.createLinearGradient(0,0,w,h);sg.addColorStop(0,'rgba(255,255,255,.22)');sg.addColorStop(.38,'rgba(255,255,255,0)');sg.addColorStop(.62,'rgba(255,255,255,.07)');sg.addColorStop(1,'rgba(0,0,0,.24)');
 px.fillStyle=sg;px.fillRect(0,0,w,h);px.restore();
 /* 2) two impact points, like the reference: one upper-left, one lower-right */
 const I=[{x:w*rnd(.16,.3),y:h*rnd(.28,.5)},{x:w*rnd(.7,.84),y:h*rnd(.5,.74)}],
  nx=I[1].x-I[0].x,ny=I[1].y-I[0].y,mc=nx*(I[0].x+I[1].x)/2+ny*(I[0].y+I[1].y)/2;
 const clipH=(P,a,b,c)=>{const o=[];for(let i=0;i<P.length;i++){const A=P[i],B=P[(i+1)%P.length],da=a*A[0]+b*A[1]-c,db=a*B[0]+b*B[1]-c;
  if(da<=0)o.push(A);if((da<0&&db>0)||(da>0&&db<0)){const t=da/(da-db);o.push([A[0]+(B[0]-A[0])*t,A[1]+(B[1]-A[1])*t])}}return o};
 const area=P=>{let s=0;for(let i=0;i<P.length;i++){const A=P[i],B=P[(i+1)%P.length];s+=A[0]*B[1]-B[0]*A[1]}return Math.abs(s)/2};
 const polys=[],edges=[],MD=[];
 I.forEach((o,ri)=>{
  const md=Math.hypot(Math.max(o.x,w-o.x),Math.max(o.y,h-o.y))+6,J=13,rad=[0],off=rnd(0,TAU);MD[ri]=md;
  let q=rnd(9,14);while(q<md){rad.push(q);q*=rnd(1.45,1.8)}rad.push(md*1.15);
  const ang=[];for(let j=0;j<J;j++)ang.push(off+(j+rnd(-.38,.38))/J*TAU);
  const V=rad.map((R,i)=>ang.map(a=>i?[o.x+Math.cos(a)*R*rnd(.84,1.16),o.y+Math.sin(a)*R*rnd(.84,1.16)]:[o.x,o.y]));
  for(let i=0;i<rad.length-1;i++)for(let j=0;j<J;j++){
   const j2=(j+1)%J;let P=i?[V[i][j],V[i][j2],V[i+1][j2],V[i+1][j]]:[V[0][0],V[1][j2],V[1][j]];
   P=ri?clipH(P,-nx,-ny,-mc):clipH(P,nx,ny,mc);
   P=clipH(P,1,0,w);P=clipH(P,-1,0,0);P=clipH(P,0,1,h);P=clipH(P,0,-1,0);
   if(P.length<3||area(P)<5)continue;
   let cx=0,cy=0;P.forEach(v=>{cx+=v[0];cy+=v[1]});cx/=P.length;cy/=P.length;polys.push({P,ri,cx,cy,ar:area(P)});
   for(let k=0;k<P.length;k++){let a=P[k],b=P[(k+1)%P.length],da=Math.hypot(a[0]-o.x,a[1]-o.y),db=Math.hypot(b[0]-o.x,b[1]-o.y);
    if(da>db){const t=a;a=b;b=t;const u=da;da=db;db=u}const mx=(a[0]+b[0])/2-o.x,my=(a[1]+b[1])/2-o.y,ex=b[0]-a[0],ey=b[1]-a[1],rd=Math.abs(mx*ex+my*ey)/((Math.hypot(mx,my)*Math.hypot(ex,ey))||1)>.6;
    if(rd||Math.random()>.45)edges.push({a,b,da,db,o:ri,t:rd?0:1,j:rnd(0,24)})}}
  /* hairline splinters radiating past the main cracks */
  for(let k=0;k<20;k++){const a=rnd(0,TAU),L=rnd(.12,.55)*md,b=[o.x+Math.cos(a)*L,o.y+Math.sin(a)*L];edges.push({a:[o.x,o.y],b,da:0,db:L,o:ri,t:1,j:0})}
 });
 /* 3) one sprite per shard, with a bright glass edge */
 const S=polys.map(p=>{let x0=1e9,y0=1e9,x1=-1e9,y1=-1e9;p.P.forEach(v=>{x0=Math.min(x0,v[0]);y0=Math.min(y0,v[1]);x1=Math.max(x1,v[0]);y1=Math.max(y1,v[1])});
  x0=Math.floor(x0)-2;y0=Math.floor(y0)-2;const bw=Math.ceil(x1)+2-x0,bh=Math.ceil(y1)+2-y0,
   sc=document.createElement('canvas');sc.width=Math.ceil(bw*D);sc.height=Math.ceil(bh*D);
  const c=sc.getContext('2d');c.scale(D,D);c.translate(-x0,-y0);c.save();c.beginPath();p.P.forEach((v,i)=>i?c.lineTo(v[0],v[1]):c.moveTo(v[0],v[1]));c.closePath();c.clip();
  c.drawImage(pane,0,0,w,h);c.lineJoin='round';c.strokeStyle='rgba(0,0,0,.4)';c.lineWidth=3;c.stroke();c.strokeStyle='rgba(255,255,255,.72)';c.lineWidth=1.3;c.stroke();c.restore();
  const o=I[p.ri],dx=p.cx-o.x,dy=p.cy-o.y,dl=Math.hypot(dx,dy)||1,sm=6/(1+Math.sqrt(p.ar)/12),fp=1.8-Math.min(1,dl/MD[p.ri]);
  return{sc,x0,y0,cx:(x0*2+bw)/2,cy:(y0*2+bh)/2,
   d:Math.min(1,dl/MD[p.ri])*260+rnd(0,90),vx:dx/dl*rnd(50,210)*fp+rnd(-45,45),vy:dy/dl*rnd(40,150)*fp-rnd(20,170),vr:rnd(-1,1)*sm,
   l:rnd(.85,1.35),tp:rnd(0,TAU),tf:rnd(2,5),zs:rnd(-.2,.55)}});
 const OX=80,OY=60,cw=w+OX*2,ch=Math.max(h+OY*2,Math.ceil(innerHeight-r.top+OY)),
  cv=document.createElement('canvas');cv.width=Math.round(cw*D);cv.height=Math.round(ch*D);
 cv.style.cssText='position:fixed;pointer-events:none;z-index:242;width:'+cw+'px;height:'+ch+'px;left:'+(r.left-OX)+'px;top:'+(r.top-OY)+'px';
 const c=cv.getContext('2d'),TS=560;let end=0;S.forEach(s=>end=Math.max(end,TS+s.d+s.l*1000));end+=60;
 const dust=[];for(let k=0;k<70;k++){const s=S[Math.floor(Math.random()*S.length)];dust.push({x:s.cx+rnd(-8,8),y:s.cy+rnd(-8,8),vx:rnd(-160,160),vy:rnd(-220,60),l:rnd(.5,1),z:rnd(.8,2)})}
 document.body.appendChild(cv);tg.style.visibility='hidden';
 try{const ax=ac();glassSound(ax,ax.currentTime+.03,null,TS/1000)}catch(_){}
 try{if(navigator.vibrate)navigator.vibrate([22,40,14,330,45,25,20,10])}catch(_){}
 const SP=[];I.forEach((o,i)=>{for(let k=0;k<18;k++)SP.push({o,d:i*140,a:rnd(0,TAU),v:rnd(160,560),l:rnd(.22,.5)})});
 const vw=document.getElementById('view-messages'),shake=T=>{if(!vw)return;const am=(T<320?Math.exp(-T/80)*3.2:0)+(T>=TS?Math.exp(-(T-TS)/100)*7:0);vw.style.translate=am>.15?(Math.sin(T*1.7)*am).toFixed(1)+'px '+(Math.cos(T*2.3)*am*.7).toFixed(1)+'px':''};
 const ease=k=>1-Math.pow(1-Math.min(1,Math.max(0,k)),3);
 let t0=0;
 (function f(ts){if(!t0)t0=ts;const T=ts-t0;c.setTransform(D,0,0,D,0,0);c.clearRect(0,0,cw,ch);
  if(T<TS){
   /* intact pane: jolt + impact flash + cracks growing outward */
   const dk=Math.exp(-T/80),tr=Math.max(0,(T-380)/180),sx=Math.sin(T/9)*2.6*dk+Math.sin(T/5)*1.8*tr,sy=Math.cos(T/11)*1.8*dk+Math.cos(T/6)*1.2*tr,sk=1-.016*Math.exp(-T/70);
   c.save();c.translate(OX+w/2+sx,OY+h/2+sy);c.scale(sk,sk);c.drawImage(pane,-w/2,-h/2,w,h);c.restore();
   const Rs=I.map((o,i)=>MD[i]*ease((T-i*140)/400));
   c.save();c.beginPath();c.rect(OX,OY,w,h);c.clip();c.lineCap='round';c.lineJoin='round';
   const m=new Path2D,tn=new Path2D;
   for(const e of edges){const R=Rs[e.o]-e.j;if(R<=e.da)continue;let bx=e.b[0],by=e.b[1];if(R<e.db){const t=(R-e.da)/(e.db-e.da);bx=e.a[0]+(e.b[0]-e.a[0])*t;by=e.a[1]+(e.b[1]-e.a[1])*t}
    const pa=e.t?tn:m;pa.moveTo(OX+e.a[0]+sx,OY+e.a[1]+sy);pa.lineTo(OX+bx+sx,OY+by+sy)}
   c.strokeStyle='rgba(0,0,0,.45)';c.lineWidth=2.4;c.stroke(m);c.lineWidth=1.4;c.stroke(tn);
   c.strokeStyle='rgba(255,255,255,.85)';c.lineWidth=.9;c.stroke(m);c.strokeStyle='rgba(255,255,255,.55)';c.lineWidth=.6;c.stroke(tn);
   c.globalCompositeOperation='lighter';
   I.forEach((o,i)=>{const a=T-i*140;if(a<0||a>280)return;const al=.95*(1-a/280),gr=c.createRadialGradient(OX+o.x,OY+o.y,0,OX+o.x,OY+o.y,50);
    gr.addColorStop(0,'rgba(255,255,255,'+al+')');gr.addColorStop(.35,'rgba(200,225,255,'+al*.4+')');gr.addColorStop(1,'rgba(255,255,255,0)');c.fillStyle=gr;c.fillRect(OX+o.x-50,OY+o.y-50,100,100)});
   I.forEach((o,i)=>{const a=T-i*140;if(a<0||a>380)return;const k=a/380;c.strokeStyle='rgba(215,232,255,'+.7*(1-k)+')';c.lineWidth=2.2*(1-k)+.4;c.beginPath();c.arc(OX+o.x,OY+o.y,ease(k)*90,0,TAU);c.stroke()});
   c.restore();
  }else{
   /* shards peel away from the impact points, tumble and fall */
   const U=T-TS;
   for(const s of S){const e=(U-s.d)/1000;let x=0,y=0,rot=0,al=1,tm=1,gl=0,zz=1;
    if(e>0){const k=e/s.l;if(k>=1)continue;x=s.vx*e;y=s.vy*e+.5*G*e*e;rot=s.vr*e;al=1-k*k*k;const rw=Math.abs(Math.cos(s.tp+s.tf*e));tm=Math.max(.3,rw);gl=Math.pow(1-rw,4)*.9;zz=1+s.zs*e}
    c.globalAlpha=al;c.save();c.translate(OX+s.cx+x,OY+s.cy+y);c.rotate(rot);c.scale(zz,zz*tm);c.drawImage(s.sc,s.x0-s.cx,s.y0-s.cy,s.sc.width/D,s.sc.height/D);
    if(gl>.06){c.globalCompositeOperation='lighter';c.globalAlpha=al*gl;c.drawImage(s.sc,s.x0-s.cx,s.y0-s.cy,s.sc.width/D,s.sc.height/D);c.globalCompositeOperation='source-over'}c.restore()}
   c.globalAlpha=1;c.fillStyle='#fff';
   for(const p of dust){const e=(U-60)/1000;if(e<=0)continue;const k=e/p.l;if(k>=1)continue;c.globalAlpha=(1-k)*.9;
    c.fillRect(OX+p.x+p.vx*e,OY+p.y+p.vy*e+.5*900*e*e,p.z,p.z)}
   c.globalAlpha=1}
  c.save();c.globalCompositeOperation='lighter';c.lineCap='round';
  for(const q of SP){const e=(T-q.d)/1000;if(e<=0||e>=q.l)continue;const k=e/q.l,ox=OX+q.o.x,oy=OY+q.o.y,vx=Math.cos(q.a)*q.v,vy=Math.sin(q.a)*q.v,x=ox+vx*e,y=oy+vy*e+.5*700*e*e;
   c.strokeStyle='rgba(235,245,255,'+(1-k)+')';c.lineWidth=1.4*(1-k)+.3;c.beginPath();c.moveTo(x,y);c.lineTo(x-vx*.03,y-(vy+700*e)*.03);c.stroke()}
  c.restore();shake(T);
  if(T<end)requestAnimationFrame(f);else{cv.remove();if(vw)vw.style.translate='';done()}})(performance.now?performance.now():0);
}
/* ===== reference-faithful glass break (real crack map + shard layout extracted from the reference photo) ===== */
const GB_SH={"W":2016,"H":488,"I":[[392,92],[1512,402]],"P":[[1507,400,1508,404,1517,402,1512,398],[380,90,379,97,385,97,386,91],[389,78,389,87,394,89,399,81],[395,89,399,93,406,93,401,86],[395,94,397,104,401,97],[388,93,385,102,392,101,396,105,394,94],[387,77,382,78,380,89,388,85],[379,98,385,106,384,97],[403,96,403,105,409,105,413,101,411,96],[377,87,373,87,371,95,375,94],[417,79,403,83,408,94,413,97,419,86,415,82],[396,108,405,110,406,124,409,118,405,108,409,106],[386,106,384,114,389,119,398,115,394,112,395,108,391,110],[370,101,361,102,365,119],[361,65,373,86,378,83,379,76,374,65],[375,70,381,77,388,74,398,76,399,80,405,76,405,70,410,66,391,68,381,62,375,66],[419,70,415,76,409,77,410,81,421,75],[435,86,425,82,420,84,414,101,429,101,429,91,435,89],[378,99,374,100,366,114,366,123,375,123,384,115,385,107],[356,93,362,101,371,98,369,93],[380,61,366,64,375,65],[387,56,386,63,389,66,404,65,392,58,396,52],[430,75,426,81,429,84,433,80],[453,96,432,96,429,102,413,102,406,110,409,113,412,109,423,118,436,120,438,115,433,110,445,111,448,103,454,103],[403,109,396,109,395,112,399,115,395,117,394,123,389,123,390,144,396,139,397,133,401,134,398,137,410,139],[386,115,375,124,366,124,371,127,368,137,375,146,389,146],[359,99,356,103,359,108,357,111,362,110,364,113],[295,23,342,68,340,82,345,90,355,94,357,91,372,90,372,82,360,64,350,60,342,61,340,53,336,53,329,43,322,42,323,36,316,23,304,26],[430,53,424,52,419,58,413,56,403,64,409,64,411,74,415,75,427,63],[459,108,450,103,445,112,434,110,434,113,452,116,449,109,452,106],[410,113,407,124,430,171,446,145,437,136,443,132,448,133,452,128,451,117,441,117,444,121,442,130,438,125],[365,125,362,111,335,119,335,122,359,128],[358,109,355,105,357,97,350,103,324,105,355,107,353,111,344,114],[350,59,355,63,365,64,386,57,389,54,387,41,357,32,350,50],[393,58,400,64,413,55,419,57,424,51,434,52,421,48,420,42,411,45,403,34,398,40,397,52],[428,63,420,68,422,73,430,66],[429,120,442,129,442,115,436,121],[409,130,412,140,410,146,416,147,417,142,413,140],[367,137,364,151,368,151],[333,119,336,143,353,140,356,136,367,136,370,132,368,125,359,129,335,123],[340,67,337,74,326,75,320,81,331,87,332,99,327,103,356,99,339,82],[323,34,323,42,329,42,344,58,347,52,330,41,325,41],[385,10,388,12,385,32,392,32,387,46,391,54,397,47,397,40,403,33,404,22,409,20,409,14],[484,22,478,17,456,13,455,9,441,14,410,14,410,20,405,22,404,33,411,44,420,41,421,47,435,52,431,62,435,63,444,56,449,56],[431,54,428,61,431,66,416,82,423,83,430,74,434,79,431,85,436,86,430,93,447,93,458,79,456,64,452,57,444,57,432,64],[452,129,448,134,438,136,444,140,444,144,447,144,451,136,456,138],[388,147,389,167,429,177,433,181,418,150,409,146,411,140,398,138],[340,144,370,182,381,167,387,164,387,146,375,147,369,144,369,151,364,152,366,137,356,137,353,141],[308,79,290,108,321,156,335,144,332,119,354,107,324,106,331,99,330,87,326,84,319,86],[292,61,319,80,326,74,338,71,338,66,313,40,309,40,309,46,302,48],[319,12,320,17,315,20,319,23,325,40,330,40,344,51,350,49,356,32,354,12,338,10,335,14,326,15],[386,9,352,11,355,12,357,31,387,40,391,32,384,32,387,24],[262,0,365,4,348,8,381,9,384,6,407,13,441,13,462,3,477,1,511,4,523,1],[450,56,457,64,459,79,468,75,489,75,466,42],[491,76,468,76,457,80,448,93,454,96,454,104,463,107,459,102,461,96,488,92,491,88,479,86,482,82,490,82],[371,183,395,219,437,192,434,181,429,178,416,177,387,165,382,167],[320,158,317,167,341,191,370,183,339,144],[289,108,281,118,273,177,315,167,320,157],[275,55,294,69,299,77,306,76,319,85,324,83],[365,5,332,4,308,11,296,11,313,12,315,16,309,20,318,19,318,12,321,10,325,14,335,13,338,9,361,10,348,9,348,5],[557,12,535,12,532,15,523,12,512,19,510,15,514,12,511,11,508,16,496,21,503,21,504,26,488,25,465,41,489,74,497,75,518,68,536,53],[450,109,454,115,454,128,454,117,470,123,466,115,460,113,461,110,491,116,494,120,490,122,503,120,517,124,510,118,509,110,503,108,489,112,465,107],[453,128,457,138,450,138,430,172,436,187,460,185,477,165,472,159,478,157,477,152,463,142],[370,184,342,192,337,202,354,249,394,228,395,220],[341,192,316,167,274,177,257,194,281,227,336,203],[307,78,299,78,294,70,276,57,259,50,244,59,225,115,281,114,299,94],[164,0,197,4,228,3,232,7,242,4,245,8,253,8,252,13,205,15,250,38,261,51,290,61,312,39,294,23,304,25,316,22,319,27,316,21,308,20,314,16,313,13,295,11,331,4,261,0],[456,12,480,17,485,24,479,31,488,24,504,25,503,22,495,21,508,15,511,10,515,12,511,17,515,18,523,11,531,14,549,10,577,11,582,6,599,9,608,5,615,6,617,3,629,5,633,0,524,0,513,5,477,2,456,7],[535,55,518,69,492,76,490,83,482,83,480,86,491,87,488,93,463,96,461,104,480,111,503,107,510,110,511,118,518,123,515,125,536,127],[473,158,478,165,462,186,536,214,546,212,532,201,528,202,509,178,490,164,493,153,485,154,485,160,478,153,479,157],[395,221,395,229,404,238,467,255,457,231,448,223,438,192],[336,204,282,228,288,252,348,257,353,249],[281,115,224,116,212,124,197,172,212,188,256,193,272,177],[182,52,169,61,210,125,224,115,243,59,212,57,207,50],[637,4,617,4,615,7,608,6,599,10,582,7,577,12,558,12,536,54,538,129,554,136,564,135,569,130,572,133,589,133,616,115,651,46],[454,118,454,125,461,139,484,159,485,153,493,152,491,164,503,174,562,167,560,154,571,151,571,146,574,145,559,141,559,137,535,127,515,126,503,121,490,123,493,120,491,117,465,111,461,113,467,115,471,122,469,125],[437,188,449,223,458,231,468,256,536,215,461,186],[394,229,355,249,348,258,366,312,400,313,400,304,403,302,401,237],[114,24,109,34,99,42,103,47,100,52,105,53,103,59,108,65,116,63,112,67,112,73,122,82,126,91,153,109,151,168,196,171,209,125,169,63,170,57,126,27],[122,24,171,57,188,49,207,49,212,56,244,58,259,49,250,39,204,15,252,12,253,9,245,9,242,5,232,8,228,4,197,5,139,0,130,7],[606,123,589,134,572,134,569,131,558,139,568,141,580,151,588,153,595,149,591,145,586,146,584,142],[504,175,510,178,528,201,532,200,569,227,594,151,584,154,572,146,571,152,561,154,564,165,562,168],[402,238,404,302,401,304,401,313,457,336,468,257],[288,253,286,260,327,340,365,313,347,258],[212,189,190,273,240,293,285,258,287,251,282,230,256,194],[25,100,36,117,57,125,60,132,114,173,150,168,152,109,125,91,121,82,111,73,111,67,115,63,108,66,102,59,104,53,97,59,92,70,85,71,77,79,55,91,34,91],[651,47,617,115,585,143,591,144,602,155,617,158,622,164,627,161,643,175,658,173,664,180,670,197,684,206,715,202,728,189,704,180,699,91],[595,151,576,212,570,222,571,234,577,230,601,246,623,255,683,206,669,197,658,174,643,176,627,162,622,165,617,159,602,156],[589,240,577,231,571,235,563,222,544,213,470,256,458,335,463,345,564,357,592,344],[366,313,325,346,369,415,367,424,370,426,366,432,354,433,338,440,365,450,391,450,397,460,401,461,464,347,457,337,405,315],[285,259,241,293,260,366,323,347,327,341],[196,172,146,169,115,174,103,276,144,296,190,272,211,190],[700,91,705,180,729,189,766,193,771,197,851,184,828,94],[590,240,593,343,705,390,708,398,723,403,731,389,715,203,683,207,623,256],[563,358,465,348,403,460,366,472,397,473,397,480,353,484,302,482,283,484,282,487,398,487,401,484,441,481,535,480],[398,477,397,474,365,472,397,462,391,451,360,450,337,440,341,436,366,431,369,426,366,424,368,415,324,347,261,367,196,456,188,462,184,478,197,477,202,483,263,482,273,484,272,487,281,487,288,482,379,482],[192,274,143,297,165,397,165,409,181,428,176,445,175,465,185,475,187,462,195,456,260,367,240,294],[37,118,32,126,37,146,33,145,28,128,19,122,15,138,18,143,17,158,11,160,9,172,5,174,3,168,0,175,0,345,3,306,7,300,102,276,114,174,60,133,57,126,51,126],[0,118,9,104,7,95,14,91,12,87,25,67,33,65,30,73,35,77,56,68,57,64,63,67,88,60,90,63,75,76,92,69,96,59,101,56,99,51,102,47,98,42,108,34,114,23,121,26,129,7,138,0,0,0],[634,0,641,9,652,46,699,90,828,93,853,10,861,8,862,4,870,7,876,1],[852,184,782,198,730,189,716,202,732,388,901,261,892,219],[399,486,804,487,759,483,763,455,760,421,708,399,705,391,593,344,564,358,535,481,462,481],[7,301,0,346,0,487,273,485,236,482,226,485,221,482,202,484,197,478,186,481,183,478,184,474,174,465,175,445,180,428,164,409,164,397,141,296,99,277],[88,61,63,68,57,65,56,69,38,78,29,73,33,66,24,69,20,80,13,87,15,91,8,95,10,104,0,119,0,174,3,167,7,173,10,160,16,158,17,143,14,138,19,121,29,128,36,146,31,126,36,119,30,112,25,97,34,90,55,90,77,78,74,76,85,68],[852,183,893,218,1003,122,1025,128,1031,123,1039,128,1055,124,1069,26,1068,13,1082,9,1083,6,1079,4,1081,2,1149,1,877,0,870,8,862,5,861,9,854,10,829,90],[984,335,900,262,733,388,724,403,753,417,774,423,784,422,829,450,828,445,833,444,855,453,922,353],[1511,403,1514,410,1522,411,1522,405],[1510,404,1504,406,1506,415,1503,416,1508,417,1514,413],[1508,405,1506,400,1502,400,1489,408,1500,413,1501,407],[1510,384,1507,393,1512,397,1514,389],[1523,390,1513,398,1517,401,1526,399,1527,395],[1525,401,1535,402,1530,397],[1517,414,1518,418,1525,419,1525,412],[1507,389,1501,388,1497,397,1502,397],[1527,387,1524,390,1532,399],[1535,403,1523,405,1523,411,1531,411],[1516,414,1509,417,1513,423,1517,418],[1541,374,1524,368,1518,383,1512,385,1523,389],[1526,414,1526,419,1535,422,1541,431,1554,419,1564,419,1566,408,1543,409,1536,406],[1526,420,1517,419,1512,425,1511,435,1507,438,1510,444,1514,442,1514,437],[1481,390,1490,401,1496,397,1495,392,1489,388],[1541,381,1528,383,1533,399,1531,388],[1523,428,1536,427,1536,424,1527,421],[1496,416,1490,422,1490,434,1503,440,1510,435,1512,420],[1486,408,1488,423,1490,416],[1468,393,1470,406,1489,406,1490,402,1482,394],[1476,380,1494,391,1499,388,1499,380,1503,388,1508,388,1504,372,1496,372,1494,367,1493,371,1483,372],[1506,371,1504,373,1509,379,1509,386,1510,383,1516,384,1517,375,1521,372],[1534,400,1536,405,1548,407,1542,405,1541,400],[1506,438,1503,444,1510,445,1514,451,1516,443,1510,445],[1471,407,1470,413,1486,422,1485,408],[1469,391,1480,393,1486,387,1473,380],[1497,364,1492,361,1491,367,1480,368,1481,373,1493,370],[1542,381,1549,389,1558,391,1550,385,1553,379],[1537,427,1523,429,1517,435,1518,442,1524,445,1536,440,1539,436],[1487,433,1487,443,1484,444,1480,461,1490,464,1496,454,1503,453,1502,440],[1469,413,1459,418,1451,433,1450,443,1461,449,1457,442,1460,441,1481,454,1483,444,1486,443,1486,433,1489,433,1489,422,1487,424],[1472,383,1468,384,1467,390,1457,390,1461,392,1462,398,1467,399],[1478,336,1474,337,1460,369,1473,379,1480,375,1480,367,1492,365,1483,345,1478,343],[1531,337,1510,340,1496,360,1498,365,1495,370,1520,372,1524,367,1528,368,1525,359],[1536,358,1534,366,1529,369,1539,371,1542,376,1538,378,1552,378,1548,374,1555,371,1549,365,1544,368,1543,360],[1532,388,1535,399,1541,399,1544,405,1552,402,1557,407,1568,408,1571,402,1579,402,1573,398,1575,389,1555,393,1541,382],[1558,419,1545,427,1538,439,1538,443,1549,453,1550,445,1553,444,1550,437,1561,430],[1441,430,1443,432,1439,435,1445,438,1443,442,1452,450,1466,453,1456,461,1454,475,1449,477,1455,479,1457,484,1466,482,1481,470,1477,466,1477,457,1467,459,1465,457,1469,454,1469,448,1458,442,1462,447,1458,450,1449,443,1450,434,1447,437,1445,431],[1420,421,1422,414,1427,420,1431,419,1432,413,1436,419,1445,416,1460,417,1468,413,1470,407,1460,397,1460,392,1454,395,1423,392,1423,409,1419,410],[1448,364,1446,374,1458,389,1467,389,1467,384,1472,379],[1476,314,1474,320,1479,332,1479,343,1484,345,1495,361,1509,339],[1535,332,1532,334,1526,359,1528,366,1533,366,1539,350,1540,339],[1551,360,1551,369,1560,373,1564,365,1553,367],[1559,420,1567,422,1571,428,1584,430,1576,425,1578,419,1566,414,1564,420],[1525,444,1523,464,1527,476,1537,478,1558,475,1550,454,1537,443,1537,439],[1483,474,1485,479,1496,479,1501,471,1504,476,1524,476,1529,479,1524,474,1522,464,1523,448,1517,446,1514,452,1510,446,1504,445,1504,453,1496,455,1493,462,1486,465,1488,471],[1458,418,1436,420,1432,414,1432,419,1427,421,1422,415,1420,424,1425,424,1427,428,1416,437,1427,432,1432,438,1431,423,1445,430,1449,436],[1411,374,1417,387,1439,394,1456,393,1456,385,1445,371,1428,363],[1470,314,1459,320,1427,362,1442,370,1447,368,1448,363,1453,364,1455,369,1460,368,1473,337,1478,335],[1471,303,1470,313,1473,319,1476,313,1480,314,1510,339,1531,336,1535,322],[1537,358,1544,360,1544,367,1551,359,1553,366,1564,363,1572,350,1580,350,1590,338,1588,332,1582,338,1585,321,1575,329,1539,317,1535,328,1541,339],[1592,338,1580,351,1572,351,1560,374,1549,374,1554,379,1551,383,1553,387,1572,390,1588,383],[1584,431,1590,439,1624,459,1608,441,1603,443,1595,438,1594,425,1589,432],[1551,437,1554,440,1551,445,1552,459,1615,454,1590,440,1583,432,1571,429,1565,422,1562,422,1562,430],[1458,486,1621,487,1566,482,1552,484,1535,478,1528,480,1524,477,1504,477,1501,472,1496,480,1479,479,1473,475,1466,483],[1468,449,1470,454,1467,458,1471,455,1478,457,1478,466,1482,470,1474,476,1480,478,1487,471,1485,464,1479,461,1482,454,1478,455],[1430,391,1415,387,1409,374,1412,381,1410,384,1403,381,1381,382,1375,406,1382,406,1385,411,1395,406,1422,409,1422,392],[1458,321,1392,335,1426,362],[1471,299,1471,302,1536,322,1539,310,1533,291,1491,287],[1540,316,1578,328,1591,308,1545,303,1540,309],[1589,382,1596,382,1638,360,1637,355,1631,353,1619,356,1593,339],[1593,383,1576,390,1574,398,1580,402,1571,403,1566,411,1568,415,1578,418,1577,425,1587,431,1590,426,1588,430,1582,419,1596,415,1607,407,1603,397,1601,400,1584,399,1586,393,1602,391,1587,387],[1633,487,1631,483,1617,482,1632,478,1628,463,1617,455,1552,460,1559,475,1538,477,1539,480,1552,483,1566,481],[1436,447,1432,445,1417,464,1422,466,1421,461],[1344,309,1323,363,1369,375,1377,380,1403,380,1410,383,1408,374,1418,367,1424,367,1423,360,1418,359,1404,344,1385,331],[1470,299,1425,260,1387,332,1396,334,1458,320,1469,313],[1511,239,1492,286,1534,291,1542,279],[1596,283,1567,269,1542,280,1535,291,1539,309,1545,302,1591,307],[1695,336,1659,306,1587,318,1583,338,1588,331,1591,337,1617,354,1634,352,1639,360,1684,341,1676,340,1676,337],[1691,403,1678,402,1669,396,1667,399,1644,398,1642,394,1634,393,1633,398,1606,399,1606,409,1583,421,1588,429,1594,424,1596,438,1603,442,1608,440,1623,455],[1406,472,1411,481,1427,482,1431,478,1437,484,1446,483,1453,487,1460,485,1447,474,1439,479,1434,471,1416,464],[1421,425,1420,422,1379,437,1411,431],[1417,212,1426,259,1470,298,1490,287,1510,239,1509,228],[1536,208,1513,225,1510,232,1516,245,1542,278,1568,268,1563,259,1555,214],[1638,243,1625,251,1622,260,1611,273,1595,280,1597,287,1592,312,1588,317,1658,305],[1677,385,1664,352,1640,359,1588,387,1603,391,1586,394,1584,397,1601,399,1603,396,1614,399,1633,397,1633,393,1637,392,1644,397,1667,398,1669,395,1678,400,1672,396],[1753,487,1743,482,1738,428,1723,409,1719,409,1717,414,1710,404,1692,404,1626,453,1623,461,1629,463,1633,478,1630,481,1618,481,1631,482,1634,487],[1465,453,1452,451,1443,443,1444,438,1438,435,1442,432,1434,424,1430,425,1433,429,1432,439,1427,433,1415,437,1425,430,1425,425,1411,432,1378,437,1383,432,1417,423,1419,411,1414,410,1347,443,1339,442,1337,448,1312,460,1279,468,1266,476,1304,477,1307,484,1245,487,1452,487,1437,485,1431,479,1427,483,1411,482,1405,472,1429,451,1432,444,1437,448,1422,464,1434,470,1439,478,1446,473,1452,476,1453,464],[1279,365,1314,457,1337,447,1339,441,1347,442,1413,410,1395,407,1385,412,1384,408,1375,407,1381,381,1324,364,1284,361],[1421,245,1346,299,1343,307,1386,331,1425,259],[1649,186,1556,213,1564,259,1570,269,1598,279,1617,266,1624,251,1638,241,1650,198],[1650,199,1638,242,1661,307,1696,336,1719,323,1724,326,1776,307,1775,303,1757,303],[1766,326,1743,320,1724,327,1719,324,1692,339,1676,338,1684,338,1685,341,1664,351,1678,385,1673,396,1678,401,1710,403,1717,409,1717,413,1719,408,1730,408,1735,396,1737,372,1756,362,1767,351,1771,352],[1269,354,1279,364,1284,360,1316,364,1301,357,1296,349,1296,354,1290,357,1286,352,1280,356],[1402,191,1307,274,1314,281,1314,287,1324,290,1331,301,1336,299,1342,306,1346,298,1421,244,1416,212],[1401,180,1402,190,1418,212,1510,227,1536,207,1531,184,1457,157],[1654,172,1650,184,1651,198,1757,302,1783,299,1790,301,1817,286,1847,257,1850,240,1848,217,1676,171],[1724,409,1738,427,1765,428,1772,419,1884,394,1885,381,1875,383,1864,372,1862,361,1848,346,1810,349,1808,345,1791,351,1784,340,1784,333,1793,311,1799,309,1795,302,1783,300,1776,302,1776,308,1745,320,1755,320,1767,326,1772,352,1767,352,1756,363,1738,372,1734,405,1730,409],[1313,456,1278,364,1268,356,1253,355,1214,344,1172,338,1142,368,1126,404,1077,413,1076,469,1085,474,1086,478,1074,480,1073,484,1031,487,1244,487,1247,484,1301,484,1307,481,1304,478,1265,476,1279,467,1312,459],[1224,233,1224,247,1252,350,1276,355,1286,351,1290,356,1295,354,1293,349,1296,348,1307,360,1322,363,1343,308,1336,300,1331,302,1320,288,1314,288,1313,281,1306,274,1293,268,1289,257,1270,234,1266,239,1252,234,1239,242],[1351,124,1263,215,1264,223,1259,226,1265,231,1262,234,1256,233,1257,236,1266,238,1270,233,1290,257,1296,270,1309,272,1401,190,1398,177,1362,128],[1518,98,1458,157,1531,183,1546,135],[1532,187,1537,207,1555,213,1647,186,1654,168,1648,150,1546,136],[1973,192,1928,190,1893,201,1860,201,1851,216,1851,240,1847,259,1817,287,1791,301,1795,301,1800,309,1794,311,1785,333,1790,349,1797,349,1804,344,1808,344,1810,348,1848,345,1863,361,1865,372,1875,382,1901,375,1929,341,1914,326,1891,322,1894,328,1875,329,1867,333,1848,320,1876,319,1874,315,1858,309,1866,301,1855,300,1866,282,1866,268,1881,258,1891,244,1886,241,1893,234,1897,239,1909,238,1915,232,1934,231,1935,224,1942,219,1944,222,1941,228,1965,217,1976,196,1968,202,1965,198],[1917,455,1903,452,1884,395,1772,420,1765,429,1739,428,1744,482,1751,483,1754,487,1891,487,1894,483,1903,481,1899,478,1915,468,1914,459],[1221,232,1206,226,1135,319,1124,327,1109,327,1104,330,1105,358,1073,399,1077,412,1126,403,1141,368,1172,337,1268,355,1255,353,1250,348],[1277,48,1257,88,1233,93,1214,106,1215,113,1224,119,1220,125,1230,162,1245,187,1243,211,1232,219,1241,223,1241,233,1232,236,1239,241,1252,233,1256,235,1256,232,1264,231,1258,226,1263,223,1262,215,1351,123],[1515,5,1505,4,1503,9,1496,10,1363,127,1400,179,1456,157,1517,98],[1508,0,1508,3,1517,6,1518,97,1547,135,1647,149,1660,9,1687,7,1673,3,1708,1],[1859,202,1800,92,1785,97,1677,171,1849,217],[1098,156,1091,164,1084,162,1031,286,1036,293,1047,293,1071,302,1080,309,1047,324,1028,326,1026,322,1022,322,1008,333,1073,398,1104,358,1103,330,1109,326,1124,326,1134,319,1206,225,1201,218,1198,220,1184,216,1144,191,1113,177,1110,171,1099,169],[1081,3,1084,6,1082,10,1069,13,1070,26,1056,123,1062,121,1064,124,1056,131,1050,130,1043,138,1056,145,1063,143,1069,152,1078,148,1081,151,1078,156,1089,163,1098,155,1099,168,1110,170,1113,176,1144,190,1184,215,1198,219,1201,217,1216,231,1230,235,1240,233,1240,223,1231,219,1242,211,1244,187,1229,162,1219,125,1223,119,1214,113,1213,106,1226,95,1254,88,1259,84,1276,48,1259,12,1243,12,1241,4,1237,4,1236,9,1193,7,1218,5,1141,1],[1149,0,1215,2,1219,5,1194,7,1236,8,1236,4,1241,3,1243,11,1259,11,1277,47,1352,123,1361,127,1496,9,1503,8,1507,0],[1773,8,1754,5,1726,8,1722,3,1673,4,1684,4,1687,8,1661,9,1648,149,1655,169,1677,170,1785,96,1799,91],[2015,157,2011,154,2007,157,1999,150,1994,164,1983,177,1982,185,1966,198,1968,201,1974,195,1977,196,1965,218,1941,229,1942,220,1936,224,1932,233,1915,233,1914,237,1901,240,1893,235,1887,241,1892,243,1878,262,1867,268,1867,282,1856,299,1866,300,1868,303,1859,309,1874,314,1877,319,1849,320,1867,332,1875,328,1894,327,1889,323,1891,321,1914,325,1932,343,1944,347,1959,361,1966,361,1971,367,1984,371,1983,365,1997,356,1999,331,2007,318,2010,293,2005,291,2005,287,2015,282],[1085,475,1075,469,1076,411,1072,398,1007,333,975,338,922,354,855,454,829,445,829,451,784,423,774,424,756,418,762,423,764,443,760,483,805,487,1030,487,1073,483,1074,479,1085,478],[1062,122,1041,129,1032,124,1025,129,1003,123,893,219,902,261,985,335,1008,332,1022,321,1026,321,1028,325,1051,322,1079,309,1047,294,1036,294,1030,288,1085,161,1077,156,1080,153,1078,149,1069,153,1063,144,1056,146,1042,138,1050,129,1056,130],[1708,0,1711,3,1722,2,1726,7,1754,4,1774,8,1799,90,1860,200,1893,200,1928,189,1974,191,1981,185,1982,177,1993,164,1999,149,2007,156,2009,153,2015,156,2015,0],[2015,283,2006,287,2006,291,2011,293,2010,306,2007,309,2008,318,2000,331,1998,356,1990,364,1984,365,1983,373,1971,368,1966,362,1959,362,1944,348,1929,342,1901,376,1886,381,1885,397,1904,452,1911,451,1918,455,1915,459,1916,468,1900,478,1904,481,1901,484,1894,484,1892,487,2015,487]]};
const GB_URL='assets/img-773a1c5f.png';
let GBA=null;
function gbLoad(){return new Promise(ok=>{if(GBA)return ok(GBA);const im=new Image();im.onload=()=>{try{const c=document.createElement('canvas');c.width=im.width;c.height=im.height;const x=c.getContext('2d');x.drawImage(im,0,0);const d=x.getImageData(0,0,c.width,c.height),p=d.data;for(let i=0;i<p.length;i+=4){const l=p[i];p[i]=228;p[i+1]=238;p[i+2]=253;p[i+3]=l}x.putImageData(d,0,0);GBA=c}catch(e){}ok(GBA)};im.onerror=()=>ok(null);im.src=GB_URL})}
function gbRR(x,w,h,R,i){i=i||0;x.beginPath();x.moveTo(i+R,i);x.arcTo(w-i,i,w-i,h-i,R);x.arcTo(w-i,h-i,i,h-i,R);x.arcTo(i,h-i,i,i,R);x.arcTo(i,i,w-i,i,R);x.closePath()}
/* the dark crystal pane of the reference: black glass, bevelled rim, avatar left, @handle, name + verified badge right */
function cvPaintDark(r){return new Promise(ok=>{
 const a=r.querySelector('.mg-av'),bg=a?getComputedStyle(a).backgroundImage:'',m=/url\("?'?([^"')]+)"?'?\)/.exec(bg),
  ne=r.querySelector('.mg-nt'),name=(ne&&ne.textContent||'').trim(),handle='@'+(r.dataset.p||''),vb=!!r.querySelector('.mg-vb'),ff=ne?getComputedStyle(ne).fontFamily:'sans-serif',
  ini=(a&&a.textContent||'').trim();
 const go=im=>ok((x,w,h)=>{const R=Math.min(h*.2,26);
  x.save();gbRR(x,w,h,R,0);x.clip();
  let g=x.createLinearGradient(0,0,w*.55,h*1.7);g.addColorStop(0,'#15171f');g.addColorStop(.5,'#0a0b10');g.addColorStop(1,'#13151c');x.fillStyle=g;x.fillRect(0,0,w,h);
  g=x.createRadialGradient(w*.42,-h*.25,0,w*.42,-h*.25,w*.46);g.addColorStop(0,'rgba(125,155,235,.26)');g.addColorStop(1,'rgba(125,155,235,0)');x.fillStyle=g;x.fillRect(0,0,w,h);
  g=x.createLinearGradient(0,0,w,h);g.addColorStop(0,'rgba(255,255,255,.07)');g.addColorStop(.45,'rgba(255,255,255,0)');g.addColorStop(1,'rgba(255,255,255,.05)');x.fillStyle=g;x.fillRect(0,0,w,h);
  /* avatar (left) */
  const ar=h*.303,ax=h*.485,ay=h/2;x.save();x.beginPath();x.arc(ax,ay,ar,0,6.2832);x.clip();
  if(im){const k=Math.max(ar*2/im.width,ar*2/im.height);x.drawImage(im,ax-im.width*k/2,ay-im.height*k/2,im.width*k,im.height*k)}
  else{const cs=bg.match(/rgba?\([^)]+\)/g)||['rgb(80,120,255)','rgb(120,70,240)'],q=x.createLinearGradient(ax-ar,ay-ar,ax+ar,ay+ar);q.addColorStop(0,cs[0]);q.addColorStop(1,cs[1]||cs[0]);x.fillStyle=q;x.fillRect(ax-ar,ay-ar,ar*2,ar*2);
   x.fillStyle='#fff';x.font='700 '+Math.round(ar*.8)+'px sans-serif';x.textAlign='center';x.textBaseline='middle';x.direction='ltr';x.fillText(ini,ax,ay+1)}
  x.restore();x.save();x.beginPath();x.arc(ax,ay,ar,0,6.2832);x.lineWidth=1;x.strokeStyle='rgba(255,255,255,.18)';x.stroke();x.restore();
  /* @handle */
  x.textBaseline='middle';x.direction='ltr';x.textAlign='left';x.fillStyle='rgba(232,233,238,.94)';x.font='500 '+(h*.215).toFixed(1)+'px Inter,system-ui,-apple-system,sans-serif';
  const hx=Math.max(w*.223,ax+ar+h*.2);x.fillText(handle,hx,h*.625,Math.max(20,w*.34));
  /* name + verified badge (right) */
  const fs=h*.27;x.font='700 '+fs.toFixed(1)+'px '+ff;x.direction='rtl';x.textAlign='right';x.fillStyle='#fff';
  const nr=w*.954,nw=Math.min(x.measureText(name).width,w*.42);x.fillText(name,nr,h*.355,w*.42);
  if(vb){const s=h*.25,k=s/21.2,bx=nr-nw-h*.11-s/2,by=h*.345;x.save();x.translate(bx-12*k,by-12*k);x.scale(k,k);
   const P=new Path2D('M12 1.7l2.4 1.7 2.9-.3 1.2 2.7 2.7 1.2-.3 2.9L22.6 12l-1.7 2.4.3 2.9-2.7 1.2-1.2 2.7-2.9-.3L12 22.6l-2.4-1.7-2.9.3-1.2-2.7-2.7-1.2.3-2.9L1.4 12l1.7-2.4-.3-2.9 2.7-1.2 1.2-2.7 2.9.3z');
   x.lineJoin='round';x.lineWidth=2.2;x.strokeStyle='#fff';x.stroke(P);x.fillStyle='#2f9bff';x.fill(P);
   x.lineCap='round';x.lineWidth=2.5;x.strokeStyle='#fff';x.beginPath();x.moveTo(7.6,12.3);x.lineTo(10.6,15.3);x.lineTo(16.5,9.3);x.stroke();x.restore()}
  x.restore();
  /* bevelled glass rim: bright outer edge, softer inner edge, top glints */
  x.save();gbRR(x,w,h,R,.9);x.lineWidth=1.7;g=x.createLinearGradient(0,0,w,h);g.addColorStop(0,'rgba(255,255,255,.85)');g.addColorStop(.5,'rgba(205,220,245,.55)');g.addColorStop(1,'rgba(255,255,255,.78)');x.strokeStyle=g;x.stroke();
  gbRR(x,w,h,Math.max(2,R-h*.05),h*.05);x.lineWidth=1;x.strokeStyle='rgba(190,210,255,.2)';x.stroke();
  [.37,.46,.62].forEach((f,i)=>{const gx=w*f;x.save();x.translate(gx,1);x.scale(3.2,1);const gr=x.createRadialGradient(0,0,0,0,0,h*(.1-i*.02));gr.addColorStop(0,'rgba(255,255,255,'+(.7-i*.18)+')');gr.addColorStop(1,'rgba(255,255,255,0)');x.fillStyle=gr;x.fillRect(-h*.2,-2,h*.4,h*.2);x.restore()});
  x.restore()});
 if(m){const im=new Image();im.onload=()=>go(im);im.onerror=()=>go(null);im.src=m[1]}else go(null)})}
const GB_SLOW=.58;/* 1 = original speed; lower = slower motion */
function glassBreak(tg,done,paint,pd,dbg){
 if(!GBA||!pd)return glassBreakOld(tg,done,paint);
 const r=tg.getBoundingClientRect(),w=Math.ceil(r.width),h=Math.ceil(r.height);
 if(!w||!h||matchMedia('(prefers-reduced-motion:reduce)').matches)return done();
 const D=Math.min(3,window.devicePixelRatio||1),rnd=(a,b)=>a+Math.random()*(b-a),TAU=Math.PI*2,G=2600,R=Math.min(h*.2,26),
  mk=()=>{const c=document.createElement('canvas');c.width=Math.round(w*D);c.height=Math.round(h*D);const x=c.getContext('2d');x.scale(D,D);x.imageSmoothingQuality='high';return[c,x]};
 /* 1) layers: the live row, the dark crystal pane, and the crack network of the reference */
 const [orig,ox]=mk();if(paint)paint(ox,w,h);
 const [dark,dx]=mk();pd(dx,w,h);
 const [crk,cx0]=mk();cx0.save();gbRR(cx0,w,h,R,0);cx0.clip();
 const lay=col=>{const c=document.createElement('canvas');c.width=Math.round(w*D);c.height=Math.round(h*D);const x=c.getContext('2d');x.imageSmoothingQuality='high';x.drawImage(GBA,0,0,c.width,c.height);if(col){x.globalCompositeOperation='source-in';x.fillStyle=col;x.fillRect(0,0,c.width,c.height)}return c},
  L1=lay('rgba(206,219,241,.88)'),L0=lay('rgba(0,0,0,.55)');
 cx0.drawImage(L0,.8,1.1,w,h);cx0.drawImage(L1,0,0,w,h);cx0.globalCompositeOperation='lighter';cx0.globalAlpha=.16;cx0.drawImage(L1,0,0,w,h);
 try{cx0.filter='blur(1.4px)';cx0.globalAlpha=.3;cx0.drawImage(L1,0,0,w,h);cx0.filter='none'}catch(e){}
 cx0.restore();
 const [full,fx]=mk();fx.drawImage(dark,0,0,w,h);fx.drawImage(crk,0,0,w,h);
 /* 2) the two impact points and the shards, taken from the reference's own crack layout */
 const SX=w/GB_SH.W,SY=h/GB_SH.H,I=GB_SH.I.map(p=>({x:p[0]*SX,y:p[1]*SY})),
  MD=I.map(o=>Math.hypot(Math.max(o.x,w-o.x),Math.max(o.y,h-o.y))+8);
 const S=GB_SH.P.map(q=>{const P=[];for(let i=0;i<q.length;i+=2)P.push([q[i]*SX,q[i+1]*SY]);
  let x0=1e9,y0=1e9,x1=-1e9,y1=-1e9,ax=0,ay=0,A=0;P.forEach((v,i)=>{x0=Math.min(x0,v[0]);y0=Math.min(y0,v[1]);x1=Math.max(x1,v[0]);y1=Math.max(y1,v[1]);const n=P[(i+1)%P.length];const c=v[0]*n[1]-n[0]*v[1];A+=c;ax+=(v[0]+n[0])*c;ay+=(v[1]+n[1])*c});
  A/=2;const mx=A?ax/(6*A):(x0+x1)/2,my=A?ay/(6*A):(y0+y1)/2,ar=Math.abs(A);if(ar<2)return null;
  x0=Math.floor(x0)-2;y0=Math.floor(y0)-2;const bw=Math.ceil(x1)+2-x0,bh=Math.ceil(y1)+2-y0,sc=document.createElement('canvas');sc.width=Math.ceil(bw*D);sc.height=Math.ceil(bh*D);
  const c=sc.getContext('2d');c.scale(D,D);c.translate(-x0,-y0);c.save();gbRR(c,w,h,R,0);c.clip();c.beginPath();P.forEach((v,i)=>i?c.lineTo(v[0],v[1]):c.moveTo(v[0],v[1]));c.closePath();c.clip();
  c.drawImage(full,0,0,w,h);c.lineJoin='round';c.strokeStyle='rgba(0,0,0,.5)';c.lineWidth=2.6;c.stroke();c.strokeStyle='rgba(235,243,255,.78)';c.lineWidth=1.1;c.stroke();c.restore();
  const ni=Math.hypot(mx-I[0].x,my-I[0].y)<=Math.hypot(mx-I[1].x,my-I[1].y)?0:1,o=I[ni],ddx=mx-o.x,ddy=my-o.y,dl=Math.hypot(ddx,ddy)||1,sm=7/(1+Math.sqrt(ar)/11),fp=1.8-Math.min(1,dl/MD[ni]);
  return{sc,x0,y0,cx:mx,cy:my,ni,
   d:Math.min(1,dl/MD[ni])*300+rnd(0,110),vx:ddx/dl*rnd(50,230)*fp+rnd(-50,50),vy:ddy/dl*rnd(40,160)*fp-rnd(30,190),vr:rnd(-1,1)*sm,
   l:rnd(.9,1.45),tp:rnd(0,TAU),tf:rnd(1.6,4.5),zs:rnd(-.2,.6)}}).filter(Boolean);
 const OX=90,OY=70,cw=w+OX*2,ch=Math.max(h+OY*2,Math.ceil(innerHeight-r.top+OY)),cv=document.createElement('canvas');cv.width=Math.round(cw*D);cv.height=Math.round(ch*D);
 cv.style.cssText='position:fixed;pointer-events:none;z-index:242;width:'+cw+'px;height:'+ch+'px;left:'+(r.left-OX)+'px;top:'+(r.top-OY)+'px';
 const c=cv.getContext('2d'),TS=560;let end=0;S.forEach(s=>end=Math.max(end,TS+s.d+s.l*1000));end+=60;
 const dust=[];for(let k=0;k<110;k++){const s=S[Math.floor(Math.random()*S.length)];dust.push({x:s.cx+rnd(-8,8),y:s.cy+rnd(-8,8),vx:rnd(-190,190),vy:rnd(-250,70),l:rnd(.5,1.1),z:rnd(.7,2.2)})}
 const SP=[];I.forEach((o,i)=>{for(let k=0;k<26;k++)SP.push({o,d:i*140,a:rnd(0,TAU),v:rnd(160,620),l:rnd(.22,.55)})});
 const vw=document.getElementById('view-messages'),shake=T=>{if(!vw)return;const am=(T<320?Math.exp(-T/80)*3.2:0)+(T>=TS?Math.exp(-(T-TS)/100)*7:0);vw.style.translate=am>.15?(Math.sin(T*1.7)*am).toFixed(1)+'px '+(Math.cos(T*2.3)*am*.7).toFixed(1)+'px':''};
 const ease=k=>1-Math.pow(1-Math.min(1,Math.max(0,k)),3);
 document.body.appendChild(cv);if(dbg==null){tg.style.visibility='hidden';
  try{const ax=ac();glassSound(ax,ax.currentTime+.03,null,TS/GB_SLOW/1000)}catch(_){}
  try{if(navigator.vibrate)navigator.vibrate([37,67,23,550,75,42,33,17])}catch(_){}}
 let t0=0;
 const f=function(ts){if(dbg==null&&!t0)t0=ts;const T=dbg!=null?dbg:(ts-t0)*GB_SLOW;c.setTransform(D,0,0,D,0,0);c.clearRect(0,0,cw,ch);
  if(T<TS){
   const dk=Math.exp(-T/80),tr=Math.max(0,(T-380)/180),sx=Math.sin(T/9)*2.6*dk+Math.sin(T/5)*1.8*tr,sy=Math.cos(T/11)*1.8*dk+Math.cos(T/6)*1.2*tr,sk=1-.016*Math.exp(-T/70),fd=ease(T/170);
   c.save();c.translate(OX+w/2+sx,OY+h/2+sy);c.scale(sk,sk);c.translate(-w/2,-h/2);
   c.drawImage(orig,0,0,w,h);c.globalAlpha=fd;c.drawImage(dark,0,0,w,h);c.globalAlpha=1;
   c.save();c.beginPath();I.forEach((o,i)=>{const Rr=MD[i]*ease((T-i*140)/430);if(Rr>1){c.moveTo(o.x+Rr,o.y);c.arc(o.x,o.y,Rr,0,TAU)}});c.clip();c.globalAlpha=fd;c.drawImage(crk,0,0,w,h);c.restore();c.restore();
   c.save();c.globalCompositeOperation='lighter';
   I.forEach((o,i)=>{const a=T-i*140;if(a<0||a>300)return;const al=.95*(1-a/300),X=OX+o.x+sx,Y=OY+o.y+sy,gr=c.createRadialGradient(X,Y,0,X,Y,56);
    gr.addColorStop(0,'rgba(255,255,255,'+al+')');gr.addColorStop(.35,'rgba(200,225,255,'+al*.4+')');gr.addColorStop(1,'rgba(255,255,255,0)');c.fillStyle=gr;c.fillRect(X-56,Y-56,112,112);
    c.strokeStyle='rgba(235,245,255,'+al*.8+')';c.lineWidth=1;c.beginPath();c.moveTo(X-34*(1-a/300),Y);c.lineTo(X+34*(1-a/300),Y);c.moveTo(X,Y-20*(1-a/300));c.lineTo(X,Y+20*(1-a/300));c.stroke()});
   I.forEach((o,i)=>{const a=T-i*140;if(a<0||a>400)return;const k=a/400;c.strokeStyle='rgba(215,232,255,'+.7*(1-k)+')';c.lineWidth=2.2*(1-k)+.4;c.beginPath();c.arc(OX+o.x+sx,OY+o.y+sy,ease(k)*95,0,TAU);c.stroke()});
   c.restore();
  }else{
   const U=T-TS;
   for(const s of S){const e=(U-s.d)/1000;let x=0,y=0,rot=0,al=1,tm=1,gl=0,zz=1;
    if(e>0){const k=e/s.l;if(k>=1)continue;x=s.vx*e;y=s.vy*e+.5*G*e*e;rot=s.vr*e;al=1-k*k*k;const rw=Math.abs(Math.cos(s.tp+s.tf*e));tm=Math.max(.3,rw);gl=Math.pow(1-rw,4)*.9;zz=1+s.zs*e}
    c.globalAlpha=al;c.save();c.translate(OX+s.cx+x,OY+s.cy+y);c.rotate(rot);c.scale(zz,zz*tm);c.translate(-s.cx,-s.cy);c.drawImage(s.sc,s.x0,s.y0,s.sc.width/D,s.sc.height/D);
    if(gl>.06){c.globalCompositeOperation='lighter';c.globalAlpha=al*gl;c.drawImage(s.sc,s.x0,s.y0,s.sc.width/D,s.sc.height/D);c.globalCompositeOperation='source-over'}c.restore()}
   c.globalAlpha=1;c.fillStyle='#fff';
   for(const p of dust){const e=(U-60)/1000;if(e<=0)continue;const k=e/p.l;if(k>=1)continue;c.globalAlpha=(1-k)*.9;c.fillRect(OX+p.x+p.vx*e,OY+p.y+p.vy*e+.5*900*e*e,p.z,p.z)}
   c.globalAlpha=1}
  c.save();c.globalCompositeOperation='lighter';c.lineCap='round';
  for(const q of SP){const e=(T-q.d)/1000;if(e<=0||e>=q.l)continue;const k=e/q.l,ox=OX+q.o.x,oy=OY+q.o.y,vx=Math.cos(q.a)*q.v,vy=Math.sin(q.a)*q.v,x=ox+vx*e,y=oy+vy*e+.5*700*e*e;
   c.strokeStyle='rgba(235,245,255,'+(1-k)+')';c.lineWidth=1.4*(1-k)+.3;c.beginPath();c.moveTo(x,y);c.lineTo(x-vx*.03,y-(vy+700*e)*.03);c.stroke()}
  c.restore();if(dbg==null)shake(T);
  if(dbg!=null)return;
  if(T<end)requestAnimationFrame(f);else{cv.remove();if(vw)vw.style.translate='';done()}};
 if(dbg!=null){f(0);return cv}
 requestAnimationFrame(f);
}

async function cvDelete(p,r){cmClose();try{ac()}catch(_){}
 const wait=ms=>new Promise(o=>setTimeout(o,ms));
 const fin=()=>{ld();const me=ME();(DB.t[key(p)]||[]).forEach(m=>{m.hd=m.hd||[];if(m.hd.indexOf(me)<0)m.hd.push(me)});FL[p]=[];delete mt(p).arch;mt(p).gone=1;sv();cur=null;show('mgL');list();toast('تم حذف المحادثة')};
 if(matchMedia('(prefers-reduced-motion:reduce)').matches)return fin();
 try{
  /* 1) open the chat so the user sees the messages dissolve one by one, newest first */
  openC(p);await wait(430);
  const M=$('mgM'),mr=M.getBoundingClientRect();
  const ps=[...M.querySelectorAll('.mg-b p')].filter(e=>{const q=e.getBoundingClientRect();return q.bottom>mr.top&&q.top<mr.bottom}).reverse();
  const gap=Math.min(170,1500/Math.max(1,ps.length));
  await Promise.all(ps.map((e,i)=>new Promise(ok=>setTimeout(()=>snap(e,ok),i*gap))));
  await wait(200);
  /* 2) go back to the list and dissolve the person's row in front of them */
  cur=null;show('mgL');list();await wait(460);
  const r2=document.querySelector('.mg-r[data-p="'+CSS.escape(p)+'"]');
  if(!r2)return fin();
  const g=r2.parentElement,solo=g&&g.classList.contains('mg-lp')&&g.querySelectorAll('.mg-r').length===1,tg=solo?g:r2;
  const pt=await cvPaint(r2,solo?g:null);let pd=null;try{await gbLoad();pd=await cvPaintDark(r2)}catch(_){}
  /* once the dust starts flying, close the gap so the rows below glide up */
  setTimeout(()=>{if(!tg.isConnected)return;tg.style.overflow='hidden';tg.style.maxHeight=tg.offsetHeight+'px';void tg.offsetHeight;
   tg.style.transition='max-height .5s cubic-bezier(.4,0,.2,1),padding .5s ease,margin .5s ease,border-width .5s ease';
   tg.style.maxHeight='0px';tg.style.paddingTop=tg.style.paddingBottom='0px';tg.style.borderWidth='0px';if(solo)tg.style.marginBottom='0px'},1350);
  glassBreak(tg,fin,pt,pd);
 }catch(e){fin()}}
async function cvBlock(p,r){cmClose();try{ac()}catch(_){}
 const wait=ms=>new Promise(o=>setTimeout(o,ms));ld();const m=mt(p);
 if(m.blk){delete m.blk;sv();const fin=()=>{list();toast('تم إلغاء الحظر — عادت المحادثة إلى القائمة')};
  if(!r||!r.isConnected||!$('mgL').classList.contains('on'))return fin();
  r.style.maxHeight=r.offsetHeight+'px';r.style.overflow='hidden';void r.offsetHeight;r.classList.add('mg-out');return setTimeout(fin,460)}
 /* blocking: the row shatters like a deleted chat, but nothing is deleted — messages stay and the row returns on unblock */
 const fin=()=>{ld();mt(p).blk=1;sv();cur=null;show('mgL');list();toast('تم حظر المستخدم')};
 if(matchMedia('(prefers-reduced-motion:reduce)').matches)return fin();
 try{
  if(!r||!r.isConnected||!$('mgL').classList.contains('on')){cur=null;show('mgL');list();await wait(460)}
  const r2=document.querySelector('.mg-r[data-p="'+CSS.escape(p)+'"]');
  if(!r2)return fin();
  const g=r2.parentElement,solo=g&&g.classList.contains('mg-lp')&&g.querySelectorAll('.mg-r').length===1,tg=solo?g:r2;
  const pt=await cvPaint(r2,solo?g:null);let pd=null;try{await gbLoad();pd=await cvPaintDark(r2)}catch(_){}
  setTimeout(()=>{if(!tg.isConnected)return;tg.style.overflow='hidden';tg.style.maxHeight=tg.offsetHeight+'px';void tg.offsetHeight;
   tg.style.transition='max-height .5s cubic-bezier(.4,0,.2,1),padding .5s ease,margin .5s ease,border-width .5s ease';
   tg.style.maxHeight='0px';tg.style.paddingTop=tg.style.paddingBottom='0px';tg.style.borderWidth='0px';if(solo)tg.style.marginBottom='0px'},1350);
  glassBreak(tg,fin,pt,pd);
 }catch(e){fin()}}
function cvArchive(p,r,on){cmClose();ld();const m=mt(p);if(on)m.arch=true;else delete m.arch;sv();
 const fin=()=>{list();toast(on?'تمت الأرشفة':'أُعيدت المحادثة إلى القائمة')};if(!r||!r.isConnected)return fin();
 r.style.maxHeight=r.offsetHeight+'px';r.style.overflow='hidden';void r.offsetHeight;r.classList.add('mg-out');setTimeout(fin,460)}
function cvOpen(p,e){const r=document.querySelector('.mg-r[data-p="'+CSS.escape(p)+'"]');cmClose();
 const ov=document.createElement('div');ov.className='mg-cmo';const el=document.createElement('div');el.className='mg-cm';el.dir='rtl';
 el.innerHTML=cb('d','حذف المحادثة')+cb('a',mt(p).arch?'إلغاء الأرشفة':'إضافة إلى الأرشيف')+cb('b',mt(p).blk?'إلغاء الحظر':'حظر');
 document.body.append(ov,el);const x=e&&e.clientX||innerWidth/2,y=e&&e.clientY||innerHeight/2;cmPlace(el,{left:x-125,right:x+125,top:y-8,bottom:y+8},false);
 if(r)r.classList.add('mg-hold');
 requestAnimationFrame(()=>{ov.classList.add('on');el.classList.add('on')});
 const off=()=>{if(r)r.classList.remove('mg-hold')};
 ov.onclick=()=>{off();cmClose()};
 el.onclick=ev=>{const b=ev.target.closest('[data-k]');if(!b)return;ev.stopPropagation();off();if(b.dataset.k==='d')cvDelete(p,r);else if(b.dataset.k==='b')cvBlock(p,r);else cvArchive(p,r,!mt(p).arch)}}
$('mgR').addEventListener('pointerdown',e=>{const r=e.target.closest&&e.target.closest('.mg-r[data-p]');if(!r||r._lp)return;r._lp=1;lpBind(r,ev=>cvOpen(r.dataset.p,ev));r.dispatchEvent(new PointerEvent('pointerdown',{clientX:e.clientX,clientY:e.clientY}))},true);
$('mgC').addEventListener('pointerdown',e=>{const im=e.target.closest&&e.target.closest('.mg-b p img');if(!im||im.closest('.mg-q'))return;const b=im.closest('.mg-b');
if(im._lp)return;im._lp=1;lpBind(im,()=>cmOpen(b.dataset.mi,im.closest('p').getBoundingClientRect()));im.dispatchEvent(new PointerEvent('pointerdown',{clientX:e.clientX,clientY:e.clientY}))},true);
$('mgC').addEventListener('click',e=>{if(e.target.closest('[data-rpx]')){RP=null;return rpBar()}
const p=e.target.closest('.mg-b p');if(!p||e.target.closest('a,audio'))return;if(Date.now()-LPF<700)return;const b=p.closest('.mg-b');if(e.target.tagName==='IMG'&&!e.target.closest('.mg-q'))return ivOpen(b.dataset.mi,e.target.src);cmOpen(b.dataset.mi,p.getBoundingClientRect())});
addEventListener('keydown',e=>{if(e.key==='Escape')cmClose()});
$('mgC').onkeydown=e=>{if(e.key==='Enter'&&e.target.id==='mgIn'){e.preventDefault();snd()}};
$('mgP').onclick=e=>{const b=e.target.closest('[data-a],[data-s]');if(!b)return;const p=cur,m=mt(p),a=getAccounts()[p]||{};
if(b.dataset.s){const s=b.dataset.s;if(s==='mute')m.mute=!m.mute;else if(s==='pin')m.pin=!m.pin;else if(s==='blk'){if(m.blk)delete m.blk;else{sv();return cvBlock(p)}}else if(s==='clr'){if(confirm('Clear all messages in this chat?')){delete DB.t[key(p)];FL[p]=[];toast('Chat cleared')}}else if(s==='cp'){try{navigator.clipboard.writeText('@'+(a.username||p));toast('Username copied')}catch(x){toast('@'+(a.username||p))}}else if(s==='tinc'){const ci=cinfo(p);setTimeout(()=>B1Call.incoming(ci),500)}else if(s==='help')toast('Messages are stored on this device only — they are not sent to any server');sv();return prof(p)}
const x=b.dataset.a;if(x==='pb'){ed=false;return from==='mgC'?chat():(show('mgL'),list())}
if(x==='ed'){if(ed){const n=$('mgEn').value.trim(),t=$('mgEt').value.trim();m.nick=n&&n!==nm(p)?n:m.nick;m.title=t;sv()}ed=!ed;return prof(p)}
if(x==='m')return chat();if(x==='c')return B1Call.start(cinfo(p),false);if(x==='v')return B1Call.start(cinfo(p),true);
const em=a.email||pr(p).email;em?location.href='mailto:'+em:toast('No email is saved for this account')};
mgApplyBg();
const g0=window.go;window.go=function(n){g0(n);document.body.classList.remove('mg-chat');if(n==='messages'){mgApplyBg();cur=null;$('mgS').hidden=true;$('mgS').value='';show('mgL');list();const q=(typeof DATA!=='undefined'&&DATA.profile)||{};$('mgMe').innerHTML=A(q.name||ME(),ME(),q.avatarData||q.avatar,40)}};
addEventListener('storage',e=>{if(e.key===K&&$('view-messages').classList.contains('active'))cur?msgs():list()});
addEventListener('offline',()=>{const o=document.querySelector('.mg-off');if(o)o.hidden=false});addEventListener('online',()=>{const o=document.querySelector('.mg-off');if(o)o.hidden=true});
})();
