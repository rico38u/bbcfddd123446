/* ===== HOME (الرئيسية): feed built only from real posts + real stories ===== */
(function(){
const $=id=>document.getElementById(id);
const esc=s=>escapeHtml(s);
const PAGE=14;
let shown=PAGE, io=null, vio=null, moreIo=null, mio=null, hmSound=false;

const I={
  fireI:'<svg viewBox="8 7 48 48"><path d="M33.5 9c1 7.5 4.5 10.5 8.5 15.5 4 5 5.5 9 5.5 13.5a15.5 15.5 0 0 1-31 0c0-5 2-9 5-12.5 1 3.2 2.4 5 4.6 6.2-1.2-8.6 1.2-17 7.4-22.7z" fill="url(#rlFl)"/><path d="M32 29.5c1.4 4.2 5.8 6.4 5.8 11.6a5.8 5.8 0 0 1-11.6 0c0-3.2 1.8-4.8 3.2-6.8.8 1.8 1.6 2.4 2.6 2.6-.3-2.6-.3-4.8 0-7.4z" fill="url(#rlFl2)"/></svg>',
  chatI:'<svg viewBox="3 3 58 58"><path d="M13 9h38a7 7 0 0 1 7 7v21a7 7 0 0 1-7 7H35.5L23 55V44H13a7 7 0 0 1-7-7V16a7 7 0 0 1 7-7z" fill="rgba(70,160,255,.2)" stroke="url(#rlBl)" stroke-width="3.6" stroke-linejoin="round"/><circle cx="21.5" cy="26.5" r="3.1" fill="#9bdcff"/><circle cx="32" cy="26.5" r="3.1" fill="#9bdcff"/><circle cx="42.5" cy="26.5" r="3.1" fill="#9bdcff"/></svg>',
  repI:'<svg class="rpf-svg" viewBox="34.2 3.5 114.1 114.4"><g class="rp-halo" filter="url(#rpBl)"><use href="#rpA"/><use href="#rpB"/></g><use href="#rpA" fill="url(#rpGA)" stroke="#ffd7a6" stroke-opacity=".55" stroke-width="1.1" stroke-linejoin="round"/><use href="#rpB" fill="url(#rpGB)" stroke="#ffd7a6" stroke-opacity=".55" stroke-width="1.1" stroke-linejoin="round"/><g clip-path="url(#rpClip)"><rect class="rp-flow a" x="30" y="10" width="120" height="140" fill="url(#rpF1)"/><rect class="rp-flow b" x="30" y="10" width="120" height="140" fill="url(#rpF2)"/></g><g transform="translate(52 47.1) scale(0.9)"><path class="rpf f0" d="M0 0C-3.4-2-3.8-6.8-1-11.2C-.6-8.8 0-8.2 .9-9.6C2.8-7 3.6-2.5 0 0Z" fill="url(#rpFl)"/></g><g transform="translate(68 38.3) scale(1.15)"><path class="rpf f1" d="M0 0C-3.4-2-3.8-6.8-1-11.2C-.6-8.8 0-8.2 .9-9.6C2.8-7 3.6-2.5 0 0Z" fill="url(#rpFl)"/></g><g transform="translate(86 30.6) scale(1.3)"><path class="rpf f2" d="M0 0C-3.4-2-3.8-6.8-1-11.2C-.6-8.8 0-8.2 .9-9.6C2.8-7 3.6-2.5 0 0Z" fill="url(#rpFl)"/></g><g transform="translate(104 30.5) scale(1.1)"><path class="rpf f3" d="M0 0C-3.4-2-3.8-6.8-1-11.2C-.6-8.8 0-8.2 .9-9.6C2.8-7 3.6-2.5 0 0Z" fill="url(#rpFl)"/></g><g transform="translate(121 29.2) scale(1.0)"><path class="rpf f4" d="M0 0C-3.4-2-3.8-6.8-1-11.2C-.6-8.8 0-8.2 .9-9.6C2.8-7 3.6-2.5 0 0Z" fill="url(#rpFl)"/></g><g transform="translate(62 87.6) scale(0.8)"><path class="rpf f0" d="M0 0C-3.4-2-3.8-6.8-1-11.2C-.6-8.8 0-8.2 .9-9.6C2.8-7 3.6-2.5 0 0Z" fill="url(#rpFl)"/></g><g transform="translate(82 89.7) scale(0.95)"><path class="rpf f1" d="M0 0C-3.4-2-3.8-6.8-1-11.2C-.6-8.8 0-8.2 .9-9.6C2.8-7 3.6-2.5 0 0Z" fill="url(#rpFl)"/></g><g transform="translate(101 90.2) scale(0.9)"><path class="rpf f2" d="M0 0C-3.4-2-3.8-6.8-1-11.2C-.6-8.8 0-8.2 .9-9.6C2.8-7 3.6-2.5 0 0Z" fill="url(#rpFl)"/></g><g transform="translate(120 85.4) scale(0.85)"><path class="rpf f3" d="M0 0C-3.4-2-3.8-6.8-1-11.2C-.6-8.8 0-8.2 .9-9.6C2.8-7 3.6-2.5 0 0Z" fill="url(#rpFl)"/></g><circle class="rps s0" cx="70" cy="26" r="1"/><circle class="rps s1" cx="98" cy="21" r="0.9"/><circle class="rps s2" cx="122" cy="30" r="1.1"/><circle class="rps s3" cx="58" cy="60" r="0.8"/><circle class="rps s4" cx="112" cy="62" r="0.9"/></svg>',
  starI:'<svg viewBox="5 3 54 54"><path d="M32 10.5l6.9 14 15.4 2.2-11.2 10.9 2.7 15.3L32 45.5l-13.8 7.4 2.7-15.3L9.7 26.7l15.4-2.2z" fill="url(#rlGd)" stroke="#ffd45a" stroke-width="3.6" stroke-linejoin="round"/><path d="M12 8v7M8.5 11.5h7M53 6v6M50 9h6M55 40v6M52 43h6" stroke="#ffe08a" stroke-width="2.2" stroke-linecap="round"/></svg>',
  search:'<svg viewBox="0 0 24 24"><circle cx="11" cy="11" r="7.2"/><path d="m20.5 20.5-4.4-4.4"/></svg>',
  bell:'<svg viewBox="0 0 24 24"><path d="M6 9.5a6 6 0 0 1 12 0c0 4.6 1.7 6 2.2 6.8H3.8C4.3 15.5 6 14.1 6 9.5Z"/><path d="M10 19.2a2.2 2.2 0 0 0 4 0"/></svg>',
  plus:'<svg viewBox="0 0 24 24"><path d="M12 4.5v15M4.5 12h15"/></svg>',
  dots:'<svg viewBox="0 0 24 24"><circle cx="5" cy="12" r="1.9"/><circle cx="12" cy="12" r="1.9"/><circle cx="19" cy="12" r="1.9"/></svg>',
  cm:'<svg viewBox="0 0 24 24"><path d="M20.5 11.5a8 8 0 0 1-11.6 7.1L4 19.8l1.3-4.3A8 8 0 1 1 20.5 11.5Z"/></svg>',
  heart:'<svg viewBox="0 0 24 24"><path d="M12 20.6s-8.6-5.2-8.6-11.4A4.9 4.9 0 0 1 12 6.4a4.9 4.9 0 0 1 8.6 2.8c0 6.2-8.6 11.4-8.6 11.4Z"/></svg>',
  bars:'<svg viewBox="0 0 24 24"><path d="M5 20V12M10 20V4M15 20V9M20 20V14"/></svg>',
  rep:'<svg viewBox="0 0 24 24"><path d="M3.5 11V9.2A3.2 3.2 0 0 1 6.7 6H19"/><path d="m16 2.8 3.4 3.2L16 9.2"/><path d="M20.5 13v1.8a3.2 3.2 0 0 1-3.2 3.2H5"/><path d="M8 21.2 4.6 18 8 14.8"/></svg>',
  mark:'<svg viewBox="0 0 24 24"><path d="M5.5 3.5h13v17L12 16l-6.5 4.5z"/></svg>',
  play:'<svg viewBox="0 0 24 24"><path d="M7 4.6v14.8a.8.8 0 0 0 1.2.7l12-7.4a.8.8 0 0 0 0-1.4L8.2 3.9A.8.8 0 0 0 7 4.6Z"/></svg>',
  vb:'<svg class="hm-vb" viewBox="0 0 24 24"><path fill="#1d9bf0" d="M12 1.7l2.4 1.7 2.9-.3 1.2 2.7 2.7 1.2-.3 2.9L22.6 12l-1.7 2.4.3 2.9-2.7 1.2-1.2 2.7-2.9-.3L12 22.6l-2.4-1.7-2.9.3-1.2-2.7-2.7-1.2.3-2.9L1.4 12l1.7-2.4-.3-2.9 2.7-1.2 1.2-2.7 2.9.3z"/><path d="m7.6 12.3 3 3 5.9-6" fill="none" stroke="#fff" stroke-width="2.3" stroke-linecap="round" stroke-linejoin="round"/></svg>'
};

const myHandle=()=>String((DATA&&DATA.profile&&DATA.profile.handle)||'').replace(/^@/,'').toLowerCase();
const isMine=p=>String((postAuthor(p)||{}).handle||'').replace(/^@/,'').toLowerCase()===myHandle();
function short(t){
  const s=Math.max(0,Math.floor((Date.now()-(t||Date.now()))/1000));
  if(s<60) return 'now';
  if(s<3600) return Math.floor(s/60)+'m';
  if(s<86400) return Math.floor(s/3600)+'h';
  if(s<604800) return Math.floor(s/86400)+'d';
  return Math.floor(s/604800)+'w';
}
function avatar(a){
  if(a&&a.avatarData) return `<img src="${esc(a.avatarData)}" alt="" loading="lazy">`;
  return esc((a&&a.avatar)||'👤');
}
function cmTotal(p){ const c=Array.isArray(p.comments)?p.comments:[]; return c.reduce((n,x)=>n+1+((x.replies||[]).length),0); }
function feed(){
  return allPosts().filter(p=>p&&p.id).sort((x,y)=>(y.time||0)-(x.time||0));
}
function repostedByMe(p){
  const root=rpRootId(p), me=rpKey(currentAuthorSnapshot());
  return DATA.posts.some(x=>x&&x.repostOf&&rpRootId(x)===root&&rpKey(postAuthor(x))===me);
}
function postHtml(p){
  p=normalizePost(p);
  const a=postAuthor(p)||{}, id=esc(p.id);
  const handle=String(a.handle||'').replace(/^@/,'');
  const isV=String(p.mediaType||'').startsWith('video');
  let media='';
  if(p.mediaData){
    if(isV){
      media=`<div class="hm-media hm-h" data-open="${id}"><video src="${esc(p.mediaData)}#t=0.1" ${p.cover?`poster="${esc(p.cover)}"`:''} muted loop playsinline preload="metadata"></video><button type="button" class="hm-mute" data-act="mute" aria-label="Sound"><svg class="off-snd" viewBox="0 0 24 24"><path d="M3 9.5v5h3.8L12 19V5L6.8 9.5H3Z"/><path d="m16 9.5 5 5M21 9.5l-5 5"/></svg><svg class="on-snd" viewBox="0 0 24 24"><path d="M3 9.5v5h3.8L12 19V5L6.8 9.5H3Z"/><path d="M15.5 9a4.2 4.2 0 0 1 0 6M18.2 6.5a8 8 0 0 1 0 11"/></svg></button></div>`;
    }else{
      media=`<div class="hm-media" data-open="${id}"><img src="${esc(p.mediaData)}" alt="" loading="lazy"></div>`;
    }
  }
  const txt=(p.title?`<b>${esc(p.title)}</b>`+(p.text?'\n':''):'')+(p.text?hashHtml(p.text):'');
  const body=txt?`<div class="hm-t" dir="auto" data-cm="${p.mediaData?'':id}">${txt}</div>`:'';
  const verified=bkVerified(a)?I.vb:'';
  return `<article class="hm-post" id="hm-${id}" data-id="${id}">
    <div class="hm-head">
      <div class="hm-av" data-prof="${id}">${avatar(a)}</div>
      <div class="hm-who" data-prof="${id}">
        <div class="hm-nm"><span class="${nfc(a)}">${esc(a.name||handle||'')}</span>${verified}</div>
        <div class="hm-hd">${handle?'@'+esc(handle)+' · ':''}${short(p.time)}</div>
      </div>
      <button class="hm-more" data-act="menu" aria-label="خيارات">${I.dots}</button>
    </div>
    ${body}${media}
    <div class="hm-acts">
      <button class="hm-a hm-like fire${p.liked?' on':''}" data-act="like" aria-label="إعجاب">${I.fireI}<b>${fmtCount(p.likes)}</b></button>
      <button class="hm-a hm-cm chat" data-act="cm" aria-label="التعليقات">${I.chatI}<b>${fmtCount(cmTotal(p))}</b></button>
      <span class="hm-a hm-views">${I.bars}<b>${fmtCount(p.views)}</b></span>
      <button class="hm-a hm-rep rep${repostedByMe(p)?' on':''}" data-act="rep" aria-label="إعادة نشر">${I.repI}<b>${fmtCount(p.reposts)}</b></button>
      <button class="hm-a hm-save star${p.saved?' on':''}" data-act="save" aria-label="حفظ">${I.starI}</button>
    </div>
  </article>`;
}
function emptyHtml(){
  return `<div class="hm-empty"><h3>لا توجد منشورات بعد</h3><p>عند نشر صورة أو فيديو أو نص من زر + ستظهر هنا مع منشورات الحسابات الأخرى على هذا الجهاز.</p><button type="button" data-act="new">نشر الآن</button></div>`;
}
function bind(){
  if(io) io.disconnect();
  if(vio) vio.disconnect();
  if(mio) mio.disconnect();
  const box=$('hmFeed'); if(!box) return;
  mio=new IntersectionObserver(es=>es.forEach(en=>{
    const v=en.target.querySelector('video'); if(!v) return;
    if(en.isIntersecting){ v.muted=!hmSound; const pr=v.play(); if(pr&&pr.catch) pr.catch(()=>{ v.muted=true; hmSound=false; syncMute(); v.play().catch(()=>{}); }); }
    else v.pause();
  }),{threshold:.6});
  const fit=m=>{ const w=m.videoWidth||m.naturalWidth, h=m.videoHeight||m.naturalHeight; if(w&&h&&h>w&&m.tagName==='IMG'){ const c=m.closest('.hm-media'); if(c){ c.classList.add('hm-v'); c.classList.remove('hm-h','hm-w'); } }else if(w&&h&&w/h>=1.55){ const c=m.closest('.hm-media'); if(c) c.classList.add('hm-h','hm-w'); } };
  box.querySelectorAll('.hm-media img,.hm-media video').forEach(m=>{ if((m.tagName==='IMG'&&m.complete)||(m.tagName==='VIDEO'&&m.readyState>=1)) fit(m); });
  if(!box._hmFit){ box._hmFit=1; box.addEventListener('load',e=>{ if(e.target.matches&&e.target.matches('.hm-media img')) fit(e.target); },true); box.addEventListener('loadedmetadata',e=>{ if(e.target.matches&&e.target.matches('.hm-media video')) fit(e.target); },true); }
  box.querySelectorAll('.hm-media').forEach(el=>{ if(el.querySelector('video')) mio.observe(el); });
  /* a real view = another account's post stays on screen for a second (counted once per account) */
  let seen={}; try{ seen=JSON.parse(localStorage.getItem('black1_hm_seen_'+currentUser))||{}; }catch(e){}
  const timers=new WeakMap();
  vio=new IntersectionObserver(es=>es.forEach(en=>{
    const el=en.target, id=el.dataset.id;
    if(en.isIntersecting){
      if(timers.has(el)) return;
      timers.set(el,setTimeout(()=>{
        timers.delete(el);
        const p=findPost(id); if(!p||isMine(p)||seen[id]) return;
        seen[id]=1; try{ localStorage.setItem('black1_hm_seen_'+currentUser,JSON.stringify(seen)); }catch(e){}
        normalizePost(p); p.views=Number(p.views||0)+1; saveData();
        const b=el.querySelector('.hm-views b'); if(b) b.textContent=fmtCount(p.views);
        try{ pfSyncViews(p.id,p.views); }catch(e){}
      },1000));
    }else if(timers.has(el)){ clearTimeout(timers.get(el)); timers.delete(el); }
  }),{threshold:.6});
  box.querySelectorAll('.hm-post').forEach(el=>vio.observe(el));
  const more=$('hmMore');
  if(more){
    io=new IntersectionObserver(es=>{ if(es.some(e=>e.isIntersecting)){ shown+=PAGE; render(true); } },{rootMargin:'600px'});
    io.observe(more);
  }
}
function render(keep){
  const box=$('hmFeed'); if(!box||typeof DATA==='undefined'||!DATA||!DATA.posts) return;
  if(!keep) shown=PAGE;
  const list=feed();
  if(!list.length){ box.innerHTML=emptyHtml(); bind(); dot(); return; }
  const part=list.slice(0,shown);
  box.innerHTML=part.map(postHtml).join('')+(list.length>shown?'<div class="hm-more-s" id="hmMore"></div>':'');
  bind(); dot();
}
function syncMute(){ document.querySelectorAll('#hmFeed .hm-mute').forEach(b=>b.classList.toggle('snd',hmSound)); }
window.hmRender=render;
window.hmSyncPost=function(id){const el=document.getElementById('hm-'+id),p=findPost(id);if(!el||!p)return;normalizePost(p);
  const t=(q,f)=>{const b=el.querySelector(q);if(b)f(b)};
  t('.hm-like',b=>{b.classList.toggle('on',!!p.liked);const n=b.querySelector('b');if(n)n.textContent=fmtCount(p.likes)});
  t('.hm-cm b',n=>n.textContent=fmtCount(cmTotal(p)));
  t('.hm-rep',b=>{b.classList.toggle('on',repostedByMe(p));const n=b.querySelector('b');if(n)n.textContent=fmtCount(p.reposts)});
  t('.hm-save',b=>b.classList.toggle('on',!!p.saved))};

/* ---------- actions ---------- */
function mediaIds(){ return feed().filter(p=>p.mediaData&&/^(video|image)/.test(String(p.mediaType||''))).map(p=>p.id); }
function like(id,btn){
  const p=normalizePost(findPost(id)); if(!p) return;
  p.liked=!p.liked; p.likes=Math.max(0,p.likes+(p.liked?1:-1));
  sound(p.liked?'like':'soft'); saveData();
  btn.classList.toggle('on',!!p.liked); btn.querySelector('b').textContent=fmtCount(p.likes);
  try{window.rlRefresh&&window.rlRefresh(id)}catch(e){}
}
function save(id,btn){
  const p=normalizePost(findPost(id)); if(!p) return;
  const was=!!p.saved; p.saved=!was;
  p.saves=Math.max(0,Math.max(Number(p.saves||0),was?1:0)+(p.saved?1:-1));
  sound('soft'); saveData(); btn.classList.toggle('on',!!p.saved);
  try{window.rlRefresh&&window.rlRefresh(id)}catch(e){}
  toast(p.saved?'أُضيف إلى المحفوظات':'أُزيل من المحفوظات');
}
function ownerOf(id){ const p=findPost(id); return (p&&p.__owner)||currentUser; }
function onClick(e){
  const t=e.target;
  const act=t.closest('[data-act]');
  const art=t.closest('.hm-post');
  if(act){
    const k=act.dataset.act;
    if(k==='mute'){ e.stopPropagation(); hmSound=!hmSound; document.querySelectorAll('#hmFeed .hm-media video').forEach(v=>{ v.muted=!hmSound; }); syncMute(); return; }
    if(k==='new'){ openPostModal(); return; }
    const id=art&&art.dataset.id; if(!id) return;
    if(k==='like') like(id,act);
    else if(k==='save') save(id,act);
    else if(k==='rep'){ repostPost(id); try{window.hmSyncPost(id);window.rlRefresh&&window.rlRefresh(id)}catch(e){} }
    else if(k==='cm') openCm(id);
    else if(k==='menu') openPostMenu(id);
    return;
  }
  const pr=t.closest('[data-prof]'); if(pr){ openUserProfile(ownerOf(pr.dataset.prof)); return; }
  const op=t.closest('[data-open]'); if(op){ rlOpenFromProfile(op.dataset.open,mediaIds()); return; }
  const cm=t.closest('[data-cm]'); if(cm&&cm.dataset.cm){ openCm(cm.dataset.cm); return; }
}


/* ---------- comments sheet ---------- */
const HC={id:null,reply:null,open:{}};
const X_ICON='<svg viewBox="0 0 24 24"><path d="M6 6l12 12M18 6 6 18"/></svg>';
const LK='<svg viewBox="0 0 24 24"><path d="M12 20.6s-8.6-5.2-8.6-11.4A4.9 4.9 0 0 1 12 6.4a4.9 4.9 0 0 1 8.6 2.8c0 6.2-8.6 11.4-8.6 11.4Z"/></svg>';
function normC(p){
  p.comments=Array.isArray(p.comments)?p.comments:[];
  p.comments.forEach(c=>{ if(!c.id) c.id=uid(); c.likes=Number(c.likes||0); c.replies=Array.isArray(c.replies)?c.replies:[]; c.replies.forEach(r=>{ if(!r.id) r.id=uid(); r.likes=Number(r.likes||0); }); });
}
function ensureCm(){
  if($('hmc')) return;
  document.body.insertAdjacentHTML('beforeend',`<div class="hmc-bd" id="hmcBd"></div>
  <div class="hmc" id="hmc" role="dialog" aria-label="التعليقات" dir="rtl">
    <div class="hmc-grab" id="hmcGrab"><i></i></div>
    <div class="hmc-head" id="hmcHead"><div class="hmc-title">التعليقات<span id="hmcN">0</span></div><button class="hmc-x" id="hmcX" type="button" aria-label="إغلاق">${X_ICON}</button></div>
    <div class="hmc-list" id="hmcList"></div>
    <div class="hmc-reply" id="hmcReply"><span></span><button type="button" id="hmcRepX" aria-label="إلغاء الرد">✕</button></div>
    <div class="hmc-att" id="hmcAtt"><img id="hmcAttImg" alt=""><span>صورة مرفقة</span><button type="button" id="hmcAttX" aria-label="إزالة">✕</button></div>
    <div class="hmc-bar" id="hmcBar"><div class="hmc-me" id="hmcMe"></div>
      <div class="hmc-pill"><input id="hmcIn" type="text" placeholder="اكتب تعليقًا…" maxlength="600" autocomplete="off" enterkeyhint="send">
        <button type="button" class="hmc-ic" id="hmcImg" aria-label="صورة"><svg viewBox="0 0 24 24"><rect x="3.5" y="4.5" width="17" height="15" rx="3"/><circle cx="9" cy="10" r="1.6"/><path d="m20.5 16-4.5-4.5L8 19.5"/></svg></button>
        <button type="button" class="hmc-ic" id="hmcMic" aria-label="تسجيل صوتي"><svg viewBox="0 0 24 24"><rect x="9" y="3" width="6" height="11" rx="3"/><path d="M5.5 11.5a6.5 6.5 0 0 0 13 0M12 18v3"/></svg></button>
      </div>
      <input type="file" id="hmcFile" accept="image/*" style="display:none">
      <button class="hmc-send" id="hmcSend" type="button" aria-label="إرسال"><svg viewBox="0 0 24 24"><path d="M22 2 11 13"/><path d="M22 2 15 22l-4-9-9-4z"/></svg></button>
    </div></div>`);
  $('hmcBd').onclick=closeCm; $('hmcX').onclick=closeCm;
  $('hmcRepX').onclick=()=>{ HC.reply=null; renderCm(); };
  const inp=$('hmcIn');
  inp.oninput=sync;
  inp.onkeydown=e=>{ if(e.key==='Enter'){ e.preventDefault(); sendCm(); } };
  $('hmcSend').onclick=()=>sendCm();
  $('hmcList').onclick=cmClick;
  $('hmcImg').onclick=()=>$('hmcFile').click();
  $('hmcFile').onchange=async e=>{
    const f=e.target.files&&e.target.files[0]; e.target.value=''; if(!f) return;
    try{
      const rd=await new Promise((ok,no)=>{ const r=new FileReader(); r.onload=()=>ok(r.result); r.onerror=no; r.readAsDataURL(f); });
      HC.img=await compressDataUrl(rd,900,.8);
      $('hmcAttImg').src=HC.img; $('hmcAtt').classList.add('show'); sync();
    }catch(x){ toast('تعذر تحميل الصورة'); }
  };
  $('hmcAttX').onclick=()=>{ HC.img=''; $('hmcAtt').classList.remove('show'); sync(); };
  if(window.VN) VN.mount($('hmcBar'),$('hmcMic'),v=>sendCm(v));
  /* swipe down on the handle / header to close */
  const sh=$('hmc'); let y0=null,dy=0;
  const dn=e=>{ if(e.target.closest('button')) return; y0=e.clientY; dy=0; sh.classList.add('drag'); try{ e.currentTarget.setPointerCapture(e.pointerId); }catch(x){} };
  const mv=e=>{ if(y0==null) return; dy=Math.max(0,e.clientY-y0); sh.style.transform=`translateY(${dy}px)`; };
  const up=()=>{ if(y0==null) return; y0=null; sh.classList.remove('drag'); sh.style.transform=''; if(dy>90) closeCm(); };
  ['hmcGrab','hmcHead'].forEach(i=>{ const el=$(i); el.addEventListener('pointerdown',dn); el.addEventListener('pointermove',mv); el.addEventListener('pointerup',up); el.addEventListener('pointercancel',up); });
  /* keep the input above the on-screen keyboard */
  if(window.visualViewport){
    const fit=()=>{ const vv=window.visualViewport; const off=Math.max(0,window.innerHeight-vv.height-vv.offsetTop); sh.style.bottom=off+'px'; };
    window.visualViewport.addEventListener('resize',fit); window.visualViewport.addEventListener('scroll',fit);
  }
}
function sync(){ $('hmcSend').classList.toggle('on',!!($('hmcIn').value.trim()||HC.img)); }
function avMk(a){ return avatar(a); }
function cRow(c,isRep,parentId){
  const a=c.author||currentAuthorSnapshot();
  const mine=rpKey(a)===rpKey(currentAuthorSnapshot());
  const p=findPost(HC.id), own=p&&isMine(p)&&rpKey(a)===rpKey(postAuthor(p));
  const SH='<svg viewBox="0 0 24 24"><circle cx="5.5" cy="12" r="2.6"/><circle cx="18" cy="5.5" r="2.6"/><circle cx="18" cy="18.5" r="2.6"/><path d="m8 10.8 7.5-3.9M8 13.2l7.5 3.9"/></svg>';
  const cid=esc(c.id), nrep=(c.replies||[]).length;
  return `<div class="hmc-c${isRep?' rep':''}" data-cid="${cid}">
    <div class="hmc-av">${avMk(a)}</div>
    <div class="hmc-b">
      <div class="hmc-hd">
        <div class="nm"><span class="${nfc(a)}">${esc(a.name||a.handle||'حساب')}</span>${bkVerified(a)?I.vb:''}</div>
        <span class="tm">· ${short(c.time)}</span>${own?'<em>الكاتب</em>':''}
        <button type="button" class="mo" data-ca="more" data-c="${cid}" aria-label="خيارات">${I.dots}</button>
      </div>
      ${c.text?`<div class="hmc-t ${nfc(a)}" dir="auto">${esc(c.text)}</div>`:''}
      ${c.img?`<img class="hmc-img cm-zoom" src="${c.img}" alt="" loading="lazy">`:''}
      ${c.voice&&window.VN?VN.html(c):''}
      <div class="hmc-x2">
        <button type="button" class="chat" data-ca="reply" data-c="${cid}" aria-label="رد">${I.chatI}<span>${fmtCount(nrep)}</span></button>
        <button type="button" class="rep" data-ca="rt" data-c="${cid}" aria-label="إعادة نشر">${I.repI}<span>${fmtCount(c.reposts||0)}</span></button>
        <button type="button" class="lk fire${c.liked?' on':''}" data-ca="like" data-c="${cid}" aria-label="إعجاب">${I.fireI}<span>${fmtCount(c.likes||0)}</span></button>
        <button type="button" data-ca="views" data-c="${cid}" aria-label="المشاهدات">${I.bars}<span>${fmtCount(c.views||0)}</span></button>
        <button type="button" class="bk star${c.saved?' on':''}" data-ca="save" data-c="${cid}" aria-label="حفظ">${I.starI}</button>
        <button type="button" data-ca="share" data-c="${cid}" aria-label="مشاركة">${SH}</button>
      </div>
      ${!isRep&&c.replies.length?`<button type="button" class="hmc-vr" data-ca="rep" data-c="${cid}">${HC.open[c.id]?'إخفاء الردود':'عرض '+c.replies.length+(c.replies.length>2?' ردود':' رد')}</button>`:''}
      ${!isRep&&HC.open[c.id]?c.replies.map(r=>cRow(r,true,c.id)).join(''):''}
    </div></div>`;
}
function renderCm(scroll){
  const p=findPost(HC.id); if(!p) return; normC(p);
  const off=p.allowComments===false, list=$('hmcList');
  $('hmcN').textContent=fmtCount(cmTotal(p));
  const sorted=p.comments.slice().sort((x,y)=>(y.time||0)-(x.time||0));
  list.innerHTML=off?`<div class="hmc-none"><svg viewBox="0 0 24 24"><rect x="5" y="11" width="14" height="9" rx="2"/><path d="M8 11V8a4 4 0 0 1 8 0v3"/></svg><b>التعليقات مغلقة</b>صاحب المنشور أغلق التعليقات هنا</div>`
    :sorted.length?sorted.map(c=>cRow(c,false)).join('')
    :`<div class="hmc-none"><svg viewBox="0 0 24 24"><path d="M20.5 11.5a8 8 0 0 1-11.6 7.1L4 19.8l1.3-4.3A8 8 0 1 1 20.5 11.5Z"/></svg><div><b>لا توجد تعليقات بعد</b>كن أول من يشارك رأيه</div></div>`;
  const r=$('hmcReply'); r.classList.toggle('show',!!HC.reply);
  if(HC.reply) r.firstChild.innerHTML='الرد على <b>'+esc(HC.reply.name)+'</b>';
  const inp=$('hmcIn'); inp.disabled=off; inp.placeholder=off?'التعليقات مغلقة':(HC.reply?'اكتب ردًا…':'اكتب تعليقًا…');
  $('hmcMe').innerHTML=avMk(currentAuthorSnapshot());
  if(scroll) list.scrollTop=0;
  sync();
}
function cmFindC(p,cid){
  for(const c of p.comments){ if(c.id===cid) return {c,par:null}; for(const r of c.replies){ if(r.id===cid) return {c:r,par:c}; } }
  return null;
}
function cmClick(e){
  const b=e.target.closest('[data-ca]'); if(!b) return;
  const p=findPost(HC.id); if(!p) return; normC(p);
  const f=cmFindC(p,b.dataset.c); const k=b.dataset.ca;
  if(k==='rep'){ HC.open[b.dataset.c]=!HC.open[b.dataset.c]; renderCm(); return; }
  if(!f) return;
  if(k==='save'){ f.c.saved=!f.c.saved; sound('soft'); saveData(); renderCm(); return; }
  if(k==='rt'||k==='views'){ toast(k==='rt'?'إعادة النشر غير متاحة للتعليقات':'عدّاد المشاهدات غير متاح للتعليقات'); return; }
  if(k==='share'||(k==='more'&&!(rpKey(f.c.author||{})===rpKey(currentAuthorSnapshot())))){
    const tx=String(f.c.text||'');
    if(k==='share'&&navigator.share){ navigator.share({text:tx}).catch(()=>{}); return; }
    try{ navigator.clipboard.writeText(tx).then(()=>toast('تم نسخ التعليق'),()=>toast('تعذّر النسخ')); }catch(e){ toast('تعذّر النسخ'); }
    return;
  }
  if(k==='more'){
    if(!confirm('حذف هذا التعليق؟')) return;
    if(f.par) f.par.replies=f.par.replies.filter(x=>x!==f.c); else p.comments=p.comments.filter(x=>x!==f.c);
    if(HC.reply&&HC.reply.id===f.c.id) HC.reply=null;
    saveData(); sound('soft'); renderCm(); upd(p.id); return;
  }
  if(k==='like'){ f.c.liked=!f.c.liked; f.c.likes=Math.max(0,f.c.likes+(f.c.liked?1:-1)); sound(f.c.liked?'like':'soft'); saveData(); renderCm(); }
  else if(k==='reply'){
    const top=f.par||f.c; HC.reply={id:top.id,name:(f.c.author&&(f.c.author.name||f.c.author.handle))||'حساب'};
    if(top.replies.length) HC.open[top.id]=true;
    renderCm(); $('hmcIn').focus();
  }
  else if(k==='del'){
    if(!confirm('حذف هذا التعليق؟')) return;
    if(f.par) f.par.replies=f.par.replies.filter(x=>x!==f.c); else p.comments=p.comments.filter(x=>x!==f.c);
    if(HC.reply&&HC.reply.id===f.c.id) HC.reply=null;
    saveData(); sound('soft'); renderCm(); upd(p.id);
  }
}
function sendCm(v){
  const p=findPost(HC.id); if(!p||p.allowComments===false) return;
  v=(v&&v.wave)?v:null;
  const inp=$('hmcIn'), t=inp.value.trim(); if(!t&&!HC.img&&!v) return;
  normC(p);
  const obj={id:uid(),text:t,time:Date.now(),author:currentAuthorSnapshot(),likes:0,replies:[]};
  if(HC.img) obj.img=HC.img;
  if(v){ obj.voice=v.data; obj.vdur=v.dur; obj.wave=v.wave; }
  const par=HC.reply&&p.comments.find(c=>c.id===HC.reply.id);
  if(par){ par.replies.push(obj); HC.open[par.id]=true; } else p.comments.push(obj);
  const wasReply=!!par; HC.reply=null; HC.img=''; inp.value=''; $('hmcAtt').classList.remove('show');
  saveData(); sound('send'); renderCm(!wasReply); upd(p.id);
  if(wasReply){ const el=$('hmcList').querySelector(`[data-cid="${obj.id}"]`); if(el) el.scrollIntoView({block:'nearest',behavior:'smooth'}); }
}
function upd(id){
  const p=findPost(id), el=document.getElementById('hm-'+id); if(!p||!el) return;
  const b=el.querySelector('.hm-cm b'); if(b) b.textContent=fmtCount(cmTotal(p));
  try{window.rlRefresh&&window.rlRefresh(id)}catch(e){}
}
function openCm(id){
  const p=findPost(id); if(!p) return;
  ensureCm(); HC.id=id; HC.reply=null; HC.open={}; HC.img=''; $('hmcAtt').classList.remove('show'); $('hmcIn').value='';
  renderCm(true);
  document.body.style.overflow='hidden';
  $('hmcBd').classList.add('show');
  requestAnimationFrame(()=>requestAnimationFrame(()=>$('hmc').classList.add('show')));
  sound&&sound('soft');
}
function closeCm(){
  const s=$('hmc'); if(!s) return;
  s.classList.remove('show'); $('hmcBd').classList.remove('show'); s.style.bottom='';
  document.body.style.overflow=''; try{ $('hmcIn').blur(); }catch(e){}
  try{ window.VN&&VN.cancelAll(); }catch(e){}
  if(HC.id) upd(HC.id); HC.id=null;
}
window.addEventListener('keydown',e=>{ if(e.key==='Escape'&&HC.id) closeCm(); });


/* ---------- search page: real videos of real people ---------- */
const HS={q:'',sort:'new',shown:18,open:false,y:0,io:null,tm:0};
const EYE='<svg viewBox="0 0 24 24"><path d="M2 12s3.6-7 10-7 10 7 10 7-3.6 7-10 7S2 12 2 12Z"/><circle cx="12" cy="12" r="3"/></svg>';
const SRCH='<svg viewBox="0 0 24 24"><circle cx="11" cy="11" r="7"/><path d="m20 20-4.2-4.2"/></svg>';
const adg=t=>String(t).replace(/\d/g,d=>'٠١٢٣٤٥٦٧٨٩'[d]).replace('.','٫');
function arCount(n){
  n=Number(n||0);
  if(n>=1e6) return adg(String(Math.floor(n/1e5)/10).replace(/\.0$/,''))+' مليون';
  if(n>=1e3) return adg(String(Math.floor(n/100)/10).replace(/\.0$/,''))+' ألف';
  return adg(n);
}
function videosAll(){
  return allPosts().filter(p=>p&&p.id&&p.mediaData&&String(p.mediaType||'').startsWith('video')&&!p.repostOf&&p.privacy!=='private');
}
function hsMatch(p,q){
  if(!q) return true;
  const a=postAuthor(p)||{};
  return [a.name,a.handle,p.title,p.text,p.category].join(' ').toLowerCase().includes(q);
}
function hsPeople(q){
  q=q.replace(/^@/,''); if(!q) return [];
  const accs=getAccounts(), me=String(currentUser||'').toLowerCase(), out=[];
  Object.keys(accs).forEach(k=>{
    const a=accs[k]; if(!a||String(a.username).toLowerCase()===me) return;
    let pr={}; try{ pr=(JSON.parse(localStorage.getItem('black1_data__'+a.username))||{}).profile||{}; }catch(e){}
    const name=pr.name||a.name||a.username, handle=String(pr.handle||a.username).replace(/^@/,'');
    if([name,handle,a.username].join(' ').toLowerCase().includes(q)) out.push({u:a.username,name,handle,pr});
  });
  return out.slice(0,12);
}
function tileHtml(p){
  const th=p.cover?`<img src="${esc(p.cover)}" alt="" loading="lazy">`:`<video src="${esc(p.mediaData)}#t=0.1" muted playsinline preload="metadata"></video>`;
  return `<div class="hs-t" data-v="${esc(p.id)}">${th}<span class="hs-v">${EYE}<span>${arCount(p.views)}</span></span></div>`;
}
function hsRender(keep){
  const box=$('hsBody'); if(!box) return;
  if(!keep) HS.shown=18;
  const q=HS.q.trim().toLowerCase();
  let list=videosAll().filter(p=>hsMatch(p,q));
  list.sort(HS.sort==='views'?(a,b)=>(Number(b.views||0)-Number(a.views||0))||((b.time||0)-(a.time||0)):(a,b)=>(b.time||0)-(a.time||0));
  const ppl=hsPeople(q);
  let h='';
  if(ppl.length) h+=`<div class="hs-ppl"><div class="hs-h">الأشخاص</div><div class="hs-pl">${ppl.map(x=>`<div class="hs-p" data-u="${esc(x.u)}"><div class="hs-pa">${avatar(x.pr)}</div><div class="hs-pn"><span>${esc(x.name)}</span>${x.pr.verified===true?I.vb:''}</div><div class="hs-ph">@${esc(x.handle)}</div></div>`).join('')}</div></div>`;
  if(list.length) h+=`<div class="hs-g">${list.slice(0,HS.shown).map(tileHtml).join('')}</div>`+(list.length>HS.shown?'<div class="hs-sent" id="hsSent"></div>':'');
  else if(!ppl.length) h+=q
    ?`<div class="hs-none"><svg viewBox="0 0 24 24"><circle cx="11" cy="11" r="7"/><path d="m20 20-4.2-4.2"/></svg><b>لا توجد نتائج</b>لم نجد أشخاصًا أو فيديوهات تطابق «${esc(HS.q.trim())}»</div>`
    :`<div class="hs-none"><svg viewBox="0 0 24 24"><rect x="3.5" y="5" width="17" height="14" rx="3"/><path d="m10 9.5 4.5 2.5-4.5 2.5z"/></svg><b>لا توجد فيديوهات بعد</b>عند نشر فيديو سيظهر هنا</div>`;
  box.innerHTML=h;
  if(HS.io) HS.io.disconnect();
  const se=$('hsSent');
  if(se){ HS.io=new IntersectionObserver(es=>{ if(es.some(e=>e.isIntersecting)){ HS.shown+=18; hsRender(true); } },{rootMargin:'700px'}); HS.io.observe(se); }
}
function hsBuild(){
  const v=$('view-home'); if($('hsPage')||!v) return;
  const d=document.createElement('div'); d.className='hs'; d.id='hsPage';
  d.innerHTML=`<div class="hs-top"><div class="hs-row">
      <div class="hs-bar">${SRCH}<input id="hsIn" type="search" placeholder="بحث" autocomplete="off" autocapitalize="off" spellcheck="false" enterkeyhint="search"><button class="hs-clr" id="hsClr" type="button" aria-label="مسح"><svg viewBox="0 0 24 24"><path d="M6 6l12 12M18 6 6 18"/></svg></button></div>
      <button class="hs-cancel" id="hsCancel" type="button">إلغاء</button></div>
    <div class="hs-chips"><button class="hs-chip on" data-s="new" type="button">الأحدث</button><button class="hs-chip" data-s="views" type="button">الأكثر مشاهدة</button></div></div>
    <div id="hsBody"></div>`;
  v.appendChild(d);
  const inp=$('hsIn');
  inp.addEventListener('input',()=>{ HS.q=inp.value; $('hsClr').classList.toggle('on',!!inp.value); clearTimeout(HS.tm); HS.tm=setTimeout(()=>hsRender(),130); });
  inp.addEventListener('keydown',e=>{ if(e.key==='Enter') inp.blur(); });
  $('hsClr').onclick=()=>{ inp.value=''; HS.q=''; $('hsClr').classList.remove('on'); hsRender(); inp.focus(); };
  $('hsCancel').onclick=()=>closeSearch();
  d.querySelector('.hs-chips').onclick=e=>{ const b=e.target.closest('.hs-chip'); if(!b) return; HS.sort=b.dataset.s; d.querySelectorAll('.hs-chip').forEach(x=>x.classList.toggle('on',x===b)); hsRender(); };
  d.addEventListener('click',e=>{
    const t=e.target.closest('[data-v]'), pp=e.target.closest('[data-u]');
    if(t){
      const id=t.dataset.v, p=findPost(id);
      if(p&&!isMine(p)) countView(p);
      const q=HS.q.trim().toLowerCase();
      const ids=videosAll().filter(x=>hsMatch(x,q)).sort(HS.sort==='views'?(a,b)=>(Number(b.views||0)-Number(a.views||0))||((b.time||0)-(a.time||0)):(a,b)=>(b.time||0)-(a.time||0)).map(x=>x.id);
      rlOpenFromProfile(id,ids);
    }else if(pp){ openUserProfile(pp.dataset.u); }
  });
}
function countView(p){
  const k='black1_hm_seen_'+currentUser; let seen={};
  try{ seen=JSON.parse(localStorage.getItem(k))||{}; }catch(e){}
  if(seen[p.id]) return; seen[p.id]=1;
  try{ localStorage.setItem(k,JSON.stringify(seen)); }catch(e){}
  normalizePost(p); p.views=Number(p.views||0)+1; saveData();
  try{ pfSyncViews(p.id,p.views); }catch(e){}
}
function openSearch(){
  hsBuild(); const v=$('view-home'); if(!v) return;
  try{ extLoad(); }catch(e){}
  HS.y=window.scrollY; HS.open=true; v.classList.add('hs-on');
  hsRender(); window.scrollTo(0,0); sound&&sound('soft');
}
function closeSearch(silent){
  const v=$('view-home'); if(!HS.open||!v) return;
  HS.open=false; v.classList.remove('hs-on'); try{ $('hsIn').blur(); }catch(e){}
  if(!silent){ render(true); window.scrollTo(0,HS.y); }
}

/* ---------- notifications: real activity on my own posts only ---------- */
const seenKey=()=>'black1_notif_seen_'+currentUser;
function notifs(){
  const me=rpKey(currentAuthorSnapshot()), out=[];
  try{
    DATA.posts.forEach(p=>{
      if(!p||p.repostOf||!isMine(p)) return;
      (p.comments||[]).forEach(c=>{ const a=c.author||{}; if(rpKey(a)&&rpKey(a)!==me) out.push({t:c.time||0,ty:'c',a,x:c.text}); });
    });
    allPosts().forEach(x=>{
      if(!x||!x.repostOf) return;
      const root=findPost(rpRootId(x)); const a=postAuthor(x);
      if(root&&isMine(root)&&rpKey(a)!==me) out.push({t:x.time||0,ty:'r',a});
    });
  }catch(e){}
  return out.sort((a,b)=>b.t-a.t);
}
function lastSeen(){ try{ return Number(localStorage.getItem(seenKey()))||0; }catch(e){ return 0; } }
function dot(){
  const d=$('hmDot'); if(!d) return;
  d.classList.toggle('on',notifs().some(n=>n.t>lastSeen()));
}
function openNotifs(){
  const list=notifs(), ls=lastSeen();
  const box=$('modalBox'), ov=$('modalOverlay'); if(!box||!ov) return;
  const rows=list.slice(0,40).map(n=>{
    const a=n.a||{}, nm=esc(a.name||a.handle||'حساب');
    const txt=n.ty==='c'?`<b>${nm}</b> علّق على منشورك: ${esc(String(n.x||'').slice(0,90))}`:`<b>${nm}</b> أعاد نشر منشورك`;
    return `<div class="hm-nt-row"><div class="hm-nt-av">${avatar(a)}</div><div class="hm-nt-tx">${txt}<small>${timeAgo(n.t)}</small></div>${n.t>ls?'<i class="hm-nt-new"></i>':''}</div>`;
  }).join('');
  box.innerHTML=`<div class="modal-title">الإشعارات</div><div class="hm-nt" style="max-height:60vh;overflow:auto">${rows||'<div class="thread-empty" style="padding:14px 0;text-align:center">لا توجد إشعارات بعد</div>'}</div><div class="modal-actions" style="margin-top:12px"><div class="modal-cancel" onclick="closeModal()">إغلاق</div></div>`;
  ov.classList.add('show');
  try{ localStorage.setItem(seenKey(),String(Date.now())); }catch(e){}
  dot();
}

/* ---------- wiring ---------- */
function init(){
  const v=$('view-home'); if(!v) return;
  v.addEventListener('click',onClick);
  $('hmSearch').onclick=openSearch;
  $('hmBell').onclick=openNotifs;
  $('hmPlus').onclick=()=>openPostModal();
  render();
}
const g0=window.go;
window.go=function(n){
  const r=g0.apply(this,arguments);
  if(n!=='home') closeSearch(true);
  if(n==='home'){ try{ extLoad(); }catch(e){} render(); }
  return r;
};
const re0=window.renderExplore;
window.renderExplore=function(){ const r=re0.apply(this,arguments); try{ if($('view-home')&&$('view-home').classList.contains('active')){ render(true); if(HS.open) hsRender(true); } else dot(); }catch(e){} return r; };
setInterval(()=>{ try{ if($('view-home')&&$('view-home').classList.contains('active')) dot(); }catch(e){} },60000);
if(document.readyState==='loading') document.addEventListener('DOMContentLoaded',init); else init();
})();
