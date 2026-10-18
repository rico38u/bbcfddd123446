/* ============================================================
   REELS — real posts only (videos / images you or others published)
   ============================================================ */
(function(){
const $=id=>document.getElementById(id);
const RL={tab:'fy',q:'',cur:null,reply:null,img:'',io:null,open:{},ready:false};

const ICON_FIRE='<svg viewBox="8 7 48 48"><path d="M33.5 9c1 7.5 4.5 10.5 8.5 15.5 4 5 5.5 9 5.5 13.5a15.5 15.5 0 0 1-31 0c0-5 2-9 5-12.5 1 3.2 2.4 5 4.6 6.2-1.2-8.6 1.2-17 7.4-22.7z" fill="url(#rlFl)"/><path d="M32 29.5c1.4 4.2 5.8 6.4 5.8 11.6a5.8 5.8 0 0 1-11.6 0c0-3.2 1.8-4.8 3.2-6.8.8 1.8 1.6 2.4 2.6 2.6-.3-2.6-.3-4.8 0-7.4z" fill="url(#rlFl2)"/></svg>';
const ICON_CHAT='<svg viewBox="3 3 58 58"><path d="M13 9h38a7 7 0 0 1 7 7v21a7 7 0 0 1-7 7H35.5L23 55V44H13a7 7 0 0 1-7-7V16a7 7 0 0 1 7-7z" fill="rgba(70,160,255,.2)" stroke="url(#rlBl)" stroke-width="3.6" stroke-linejoin="round"/><circle cx="21.5" cy="26.5" r="3.1" fill="#9bdcff"/><circle cx="32" cy="26.5" r="3.1" fill="#9bdcff"/><circle cx="42.5" cy="26.5" r="3.1" fill="#9bdcff"/></svg>';
const ICON_REP='<svg class="rpf-svg" viewBox="34.2 3.5 114.1 114.4"><g class="rp-halo" filter="url(#rpBl)"><use href="#rpA"/><use href="#rpB"/></g><use href="#rpA" fill="url(#rpGA)" stroke="#ffd7a6" stroke-opacity=".55" stroke-width="1.1" stroke-linejoin="round"/><use href="#rpB" fill="url(#rpGB)" stroke="#ffd7a6" stroke-opacity=".55" stroke-width="1.1" stroke-linejoin="round"/><g clip-path="url(#rpClip)"><rect class="rp-flow a" x="30" y="10" width="120" height="140" fill="url(#rpF1)"/><rect class="rp-flow b" x="30" y="10" width="120" height="140" fill="url(#rpF2)"/></g><g transform="translate(52 47.1) scale(0.9)"><path class="rpf f0" d="M0 0C-3.4-2-3.8-6.8-1-11.2C-.6-8.8 0-8.2 .9-9.6C2.8-7 3.6-2.5 0 0Z" fill="url(#rpFl)"/></g><g transform="translate(68 38.3) scale(1.15)"><path class="rpf f1" d="M0 0C-3.4-2-3.8-6.8-1-11.2C-.6-8.8 0-8.2 .9-9.6C2.8-7 3.6-2.5 0 0Z" fill="url(#rpFl)"/></g><g transform="translate(86 30.6) scale(1.3)"><path class="rpf f2" d="M0 0C-3.4-2-3.8-6.8-1-11.2C-.6-8.8 0-8.2 .9-9.6C2.8-7 3.6-2.5 0 0Z" fill="url(#rpFl)"/></g><g transform="translate(104 30.5) scale(1.1)"><path class="rpf f3" d="M0 0C-3.4-2-3.8-6.8-1-11.2C-.6-8.8 0-8.2 .9-9.6C2.8-7 3.6-2.5 0 0Z" fill="url(#rpFl)"/></g><g transform="translate(121 29.2) scale(1.0)"><path class="rpf f4" d="M0 0C-3.4-2-3.8-6.8-1-11.2C-.6-8.8 0-8.2 .9-9.6C2.8-7 3.6-2.5 0 0Z" fill="url(#rpFl)"/></g><g transform="translate(62 87.6) scale(0.8)"><path class="rpf f0" d="M0 0C-3.4-2-3.8-6.8-1-11.2C-.6-8.8 0-8.2 .9-9.6C2.8-7 3.6-2.5 0 0Z" fill="url(#rpFl)"/></g><g transform="translate(82 89.7) scale(0.95)"><path class="rpf f1" d="M0 0C-3.4-2-3.8-6.8-1-11.2C-.6-8.8 0-8.2 .9-9.6C2.8-7 3.6-2.5 0 0Z" fill="url(#rpFl)"/></g><g transform="translate(101 90.2) scale(0.9)"><path class="rpf f2" d="M0 0C-3.4-2-3.8-6.8-1-11.2C-.6-8.8 0-8.2 .9-9.6C2.8-7 3.6-2.5 0 0Z" fill="url(#rpFl)"/></g><g transform="translate(120 85.4) scale(0.85)"><path class="rpf f3" d="M0 0C-3.4-2-3.8-6.8-1-11.2C-.6-8.8 0-8.2 .9-9.6C2.8-7 3.6-2.5 0 0Z" fill="url(#rpFl)"/></g><circle class="rps s0" cx="70" cy="26" r="1"/><circle class="rps s1" cx="98" cy="21" r="0.9"/><circle class="rps s2" cx="122" cy="30" r="1.1"/><circle class="rps s3" cx="58" cy="60" r="0.8"/><circle class="rps s4" cx="112" cy="62" r="0.9"/></svg>';
const ICON_STAR='<svg viewBox="5 3 54 54"><path d="M32 10.5l6.9 14 15.4 2.2-11.2 10.9 2.7 15.3L32 45.5l-13.8 7.4 2.7-15.3L9.7 26.7l15.4-2.2z" fill="url(#rlGd)" stroke="#ffd45a" stroke-width="3.6" stroke-linejoin="round"/><path d="M12 8v7M8.5 11.5h7M53 6v6M50 9h6M55 40v6M52 43h6" stroke="#ffe08a" stroke-width="2.2" stroke-linecap="round"/></svg>';
const ICON_VB='<svg class="rl-vb" viewBox="0 0 24 24"><path fill="#2f9bff" d="M12 1.7l2.4 1.7 2.9-.3 1.2 2.7 2.7 1.2-.3 2.9L22.6 12l-1.7 2.4.3 2.9-2.7 1.2-1.2 2.7-2.9-.3L12 22.6l-2.4-1.7-2.9.3-1.2-2.7-2.7-1.2.3-2.9L1.4 12l1.7-2.4-.3-2.9 2.7-1.2 1.2-2.7 2.9.3z"/><path d="m7.6 12.3 3 3 5.9-6" fill="none" stroke="#fff" stroke-width="2.3" stroke-linecap="round" stroke-linejoin="round"/></svg>';
const ICON_NOTE='<svg viewBox="0 0 24 24"><rect x="1" y="1" width="22" height="22" rx="7" fill="#fff"/><path d="M15.8 5.2 10.4 6.4v8.1a2.4 2.4 0 1 0 1.8 2.3V9.6l3.6-.8z" fill="#17182a"/></svg>';
const ICON_PLANE='<svg viewBox="0 0 24 24"><path d="M21.5 3.2 2.8 10.3c-.8.3-.8 1.4 0 1.7l4.6 1.8 1.8 4.6c.3.8 1.4.8 1.7 0l1.3-3.4 3.9 2.9c.6.5 1.5.1 1.6-.7L22.6 4.2c.1-.8-.5-1.3-1.1-1zM9.6 13.2l8.4-6.1-6.7 7.3z" opacity=".9"/></svg>';
const ICON_DOTS='<svg viewBox="0 0 24 24"><circle cx="5" cy="12" r="1.9"/><circle cx="12" cy="12" r="1.9"/><circle cx="19" cy="12" r="1.9"/></svg>';

function esc(s){ return escapeHtml(s); }
function ago(ts){
  const s=Math.max(1,Math.floor((Date.now()-(ts||Date.now()))/1000));
  if(s<60) return s+'s'; const m=Math.floor(s/60); if(m<60) return m+'m';
  const h=Math.floor(m/60); if(h<24) return h+'h'; const d=Math.floor(h/24); if(d<7) return d+'d';
  const w=Math.floor(d/7); if(w<52) return w+'w'; return Math.floor(d/365)+'y';
}
function agoAr(ts){
  const s=Math.max(1,Math.floor((Date.now()-(ts||Date.now()))/1000));
  if(s<60) return s+' ث'; const m=Math.floor(s/60); if(m<60) return m+' د';
  const h=Math.floor(m/60); if(h<24) return h+' س'; const d=Math.floor(h/24); if(d<7) return d+' ي';
  const w=Math.floor(d/7); if(w<52) return w+' أ'; return Math.floor(d/365)+' سنة';
}
function allReels(){
  const mine=DATA.profile.handle||'';
  return allPosts().sort((x,y)=>(y.time||0)-(x.time||0)).filter(p=>p&&p.mediaData&&((p.mediaType||'').startsWith('video')||(p.mediaType||'').startsWith('image')));
}
function followedHandles(){ return Array.isArray(DATA.profile.followingList)?DATA.profile.followingList:[]; }
function tagsOf(p){ const m=((p.title||'')+' '+(p.text||'')).match(/#[\p{L}\p{N}_]+/gu); return m?Array.from(new Set(m)):[]; }
function capOf(p){ const t=[(p.title||''),(p.text||'')].filter(Boolean).join('\n'); return t.replace(/#[\p{L}\p{N}_]+/gu,'').replace(/[ \t]+\n/g,'\n').replace(/\n{2,}/g,'\n').trim(); }
function rpResolve(id){ const p=findPost(id); if(p&&p.repostOf){ const r=findPost(rpRootId(p)); if(r&&r.mediaData) return r.id; } return id; }
function list(){
  let l=allReels(); if(RL.mode!=='profile'){ const hd=rsHidden(); if(hd.length) l=l.filter(p=>!hd.includes(p.id)); }
  if(RL.mode==='profile'&&RL.ids){ const set=new Set(RL.ids.map(rpResolve)); l=l.filter(p=>set.has(p.id)); }
  else if(RL.mode==='profile'){ const mine=String(DATA.profile.handle||'').replace(/^@/,''); l=l.filter(p=>String(postAuthor(p).handle||'').replace(/^@/,'')===mine); }
  else{
    /* a repost is not a second reel: the original shows once, with the repost pill */
    const ids=new Set(l.map(p=>p.id)), seen=new Set();
    l=l.filter(p=>{
      if(!p.repostOf) return true;
      const r=rpRootId(p); if(ids.has(r)) return false;
      if(seen.has(r)) return false; seen.add(r); return true;
    });
    if(RL.tab==='fo'){ const f=followedHandles(); l=l.filter(p=>f.includes((postAuthor(p).handle)||'')||repostersOf(p).some(a=>f.includes(a.handle||''))); }
  }
  const q=RL.q.trim().toLowerCase();
  if(q){ l=l.filter(p=>{ const a=postAuthor(p); return `${p.title||''} ${p.text||''} ${p.category||''} ${a.name||''} ${a.handle||''}`.toLowerCase().includes(q); }); }
  return l;
}
function savesOf(p){ return Math.max(Number(p.saves||0),p.saved?1:0); }
function commentTotal(p){ const c=Array.isArray(p.comments)?p.comments:[]; return c.reduce((n,x)=>n+1+((x.replies||[]).length),0); }

/* every registered account (yourself included) whose username or name matches the search */
function peopleMatches(raw){
  const q=String(raw||'').trim().toLowerCase().replace(/^@/,''); if(!q) return [];
  const acc=getAccounts(), me=String(currentUser||'').toLowerCase();
  return Object.keys(acc).map(k=>{
    const a=acc[k]; let pr={};
    if(k===me&&DATA&&DATA.profile) pr=DATA.profile;
    else{ try{ pr=(JSON.parse(localStorage.getItem('black1_data__'+a.username))||{}).profile||{}; }catch(e){} }
    const name=pr.name||a.name||a.username, handle=String(pr.handle||a.username).replace(/^@/,'');
    return {u:a.username,name,handle,pr,me:k===me,hay:(a.username+' '+(a.name||'')+' '+name+' '+handle).toLowerCase()};
  }).filter(x=>x.hay.includes(q)).sort((x,y)=>(y.u.toLowerCase().startsWith(q)-x.u.toLowerCase().startsWith(q))||x.u.localeCompare(y.u)).slice(0,40);
}
function renderPeople(){
  const box=$('rlPeople'); if(!box) return;
  const l=RL.mode==='profile'?[]:peopleMatches(RL.q);
  box.classList.toggle('on',l.length>0);
  box.innerHTML=l.map(x=>{
    const av=x.pr.avatarData?`<img src="${x.pr.avatarData}" alt="">`:esc(x.pr.avatar||String(x.name).trim().slice(0,1).toUpperCase());
    return `<button type="button" class="rl-pp" data-u="${esc(x.u)}"><span class="a">${av}</span><span class="t"><span class="n"><span dir="auto">${esc(x.name)}</span>${x.pr.verified===true?ICON_VB:''}</span><span class="h" style="display:block">@${esc(x.handle)}</span></span>${x.me?'<span class="me">أنت</span>':''}</button>`;
  }).join('');
}
function emptyHtml(){
  const ic='<svg viewBox="0 0 24 24"><rect x="3.5" y="4" width="17" height="16" rx="3.5"/><path d="M10 9.2v5.6l4.6-2.8z"/></svg>';
  if(RL.q){ if(RL.mode!=='profile'&&peopleMatches(RL.q).length) return ic+'<h3>لا توجد ريلز مطابقة</h3><p>اضغط على أحد الحسابات أعلاه لفتح ملفه الشخصي.</p>'; return ic+'<h3>لا توجد نتائج</h3><p>جرّب اسم حساب أو وسمًا أو كلمة أخرى.</p>'; }
  if(RL.tab==='fo') return ic+'<h3>لا توجد حسابات تتابعها بعد</h3><p>ستظهر هنا ريلز الحسابات التي تتابعها.</p>';
  return ic+'<h3>لا توجد ريلز بعد</h3><p>انشر أول فيديو أو صورة من زر + وستظهر هنا.</p><button type="button" onclick="openPostModal()">إنشاء منشور</button>';
}

const RP_ICON='<svg class="rp-ic" viewBox="40 82 608 482" aria-hidden="true"><defs><linearGradient id="rpg0" x1="0" y1="0" x2="0" y2="1"><stop offset="8%" stop-color="rgb(223,233,240)"/><stop offset="25%" stop-color="rgb(213,221,229)"/><stop offset="42%" stop-color="rgb(194,203,212)"/><stop offset="58%" stop-color="rgb(146,155,164)"/><stop offset="75%" stop-color="rgb(111,121,130)"/><stop offset="92%" stop-color="rgb(130,139,148)"/></linearGradient><linearGradient id="rpg1" x1="0" y1="0" x2="0" y2="1"><stop offset="8%" stop-color="rgb(251,253,252)"/><stop offset="25%" stop-color="rgb(252,253,253)"/><stop offset="42%" stop-color="rgb(252,254,253)"/><stop offset="58%" stop-color="rgb(239,246,251)"/><stop offset="75%" stop-color="rgb(201,211,219)"/><stop offset="92%" stop-color="rgb(169,178,187)"/></linearGradient></defs><path d="M174 98 L145 133 L147 142 L81 218 L65 241 L55 245 L62 251 L141 250 L144 253 L143 445 L155 483 L175 511 L207 536 L237 547 L265 551 L342 551 L357 548 L363 540 L364 491 L358 485 L348 482 L291 483 L251 479 L234 471 L216 446 L210 400 L209 251 L294 250 L301 246 L302 230 L298 229 L290 215 L195 103 L186 96Z" fill="url(#rpg0)" stroke="rgba(255,255,255,.78)" stroke-width="5" stroke-linejoin="round"/><path d="M329 96 L330 104 L322 107 L317 145 L321 153 L412 152 L431 155 L455 168 L468 182 L476 198 L480 213 L480 320 L478 348 L475 351 L479 401 L476 404 L460 404 L459 397 L464 393 L387 391 L377 397 L376 404 L379 405 L383 399 L390 400 L390 411 L380 410 L383 418 L494 548 L506 548 L526 526 L522 525 L523 517 L618 416 L625 416 L630 411 L632 403 L628 396 L617 392 L585 394 L550 402 L529 400 L532 322 L529 302 L528 219 L524 190 L530 189 L530 181 L522 160 L502 134 L490 125 L488 129 L482 129 L453 111 L405 105 L332 105 L332 97 L345 96Z" fill="url(#rpg1)" stroke="rgba(255,255,255,.85)" stroke-width="5" stroke-linejoin="round"/></svg>';
function rpPillHtml(p){
  const r=repostersOf(p); if(!r.length) return '';
  const n=r.length, num=n.toLocaleString('ar-EG'), t=num+(n===1?' أعاد النشر':' أعادوا النشر');
  const av=(a,c)=>`<span class="rp-av ${c}">${authorAvatarMarkup(a)}</span>`;
  return `<div class="rp-pill" data-rp="${p.id}" role="note" aria-label="${t}">${RP_ICON}<span class="rp-tx">${t}</span>${r[1]?av(r[1],'rp-a2'):''}${av(r[0],'rp-a1')}</div>`;
}

/* ===== follow button next to the reel author's name (real follow data, same storage as the profile follow button) ===== */
function rlIsFollowing(h){
  h=String(h||'').replace(/^@/,'').toLowerCase();
  return followedHandles().some(x=>String(x).replace(/^@/,'').toLowerCase()===h);
}
function rlFoBtn(a,owner){
  const h=String((a&&a.handle)||'').replace(/^@/,'').trim();
  if(!h || h.toLowerCase()===curH().toLowerCase()) return '';
  if(owner && String(owner).toLowerCase()===String(currentUser||'').toLowerCase()) return '';
  const on=rlIsFollowing(h);
  return `<button type="button" class="rl-fo${on?' on':''}" data-act="follow" data-h="${esc(h)}" data-u="${esc(owner||'')}" aria-pressed="${on}">${on?'تتابعه':'متابعة'}</button>`;
}
function rlToggleFollow(b){
  const h=String(b.dataset.h||'').replace(/^@/,''), hl=h.toLowerCase();
  let u=b.dataset.u&&getAccounts()[String(b.dataset.u).toLowerCase()]?getAccounts()[String(b.dataset.u).toLowerCase()].username:rlResolve(h);
  if(!u){ toast('هذا الحساب غير متاح'); return; }
  const meU=String(currentUser||'').toLowerCase();
  if(String(u).toLowerCase()===meU) return;
  const was=rlIsFollowing(h);
  let list=followedHandles().filter(x=>String(x).replace(/^@/,'').toLowerCase()!==hl);
  if(!was) list.push(h);
  DATA.profile.followingList=list; DATA.profile.following=list.length;
  /* write the follower into that account's own stored profile so its counter stays real */
  let fol=null;
  try{
    const key='black1_data__'+u; let d=null;
    try{ d=JSON.parse(localStorage.getItem(key)); }catch(e){}
    d=d||{}; d.profile=d.profile||{};
    const had=Array.isArray(d.profile.followersList)&&d.profile.followersList.includes(meU);
    let fl=(Array.isArray(d.profile.followersList)?d.profile.followersList:[]).filter(x=>x!==meU); if(!was) fl.push(meU);
    d.profile.followersList=fl;
    d.profile.followers=Math.max(0,Number(d.profile.followers||0)+(was?(had?-1:0):(had?0:1)));
    fol=d.profile.followers;
    const txt=JSON.stringify(d);
    try{ localStorage.setItem(key,txt); }catch(e){}
    try{ if(window.storage&&typeof window.storage.set==='function') window.storage.set(key,txt,false); }catch(e){}
  }catch(e){}
  saveData();
  const now=!was;
  document.querySelectorAll('.rl-fo').forEach(x=>{
    if(String(x.dataset.h||'').toLowerCase()!==hl) return;
    x.classList.toggle('on',now); x.setAttribute('aria-pressed',now); x.textContent=now?'تتابعه':'متابعة';
  });
  try{ if(PV&&String(PV.username).toLowerCase()===String(u).toLowerCase()){ if(fol!=null) PV.profile.followers=fol; pfSyncFollow(false); } }catch(e){}
  sound(was?'soft':'pop'); toast(was?'تم إلغاء المتابعة':'تمت المتابعة ✨');
}

const repOnMe=p=>{try{const root=rpRootId(p),me=rpKey(currentAuthorSnapshot());return DATA.posts.some(x=>x&&x.repostOf&&rpRootId(x)===root&&rpKey(postAuthor(x))===me)}catch(e){return false}};
function itemHtml(p){
  const src=p.repostOf&&findPost(rpRootId(p)); /* a repost copy shows the original owner */
  const a=(src&&src.mediaData)?postAuthor(src):(p.repostOf&&p.repostOf.author)||postAuthor(p), cap=capOf(p), tags=tagsOf(p);
  const comments=commentTotal(p);
  const fo=rlFoBtn(a,((src&&src.mediaData)?src:p).__owner);
  return `<div class="rl-item" data-id="${p.id}">
    <div class="rl-media" data-m="${p.id}"></div>
    <div class="rl-shade"></div>
    <div class="rl-hit" data-hit="${p.id}"></div>
    <div class="rl-pause"><svg viewBox="0 0 24 24"><path d="M7 4.5v15l13-7.5z"/></svg></div>
    <div class="rl-ctl"><button class="rl-cb" data-ctl="prev" type="button" aria-label="السابق"><svg viewBox="0 0 24 24"><path d="M5.5 5.2h2.6v13.6H5.5zM19.5 5.4v13.2L9.4 12z"/></svg></button><button class="rl-cb big" data-ctl="pp" type="button" aria-label="إيقاف / تشغيل"><svg class="i-ps" viewBox="0 0 24 24"><rect x="5.8" y="4.2" width="4.2" height="15.6" rx="1.4"/><rect x="14" y="4.2" width="4.2" height="15.6" rx="1.4"/></svg><svg class="i-pl" viewBox="0 0 24 24"><path d="M8 4.6v14.8L20 12z"/></svg></button><button class="rl-cb" data-ctl="next" type="button" aria-label="التالي"><svg viewBox="0 0 24 24"><path d="M15.9 5.2h2.6v13.6h-2.6zM4.5 5.4v13.2L14.6 12z"/></svg></button></div>
    <div class="rl-side">
      <button class="rl-ab fire ${p.liked?'on':''}" data-act="like" data-id="${p.id}" type="button" aria-label="إعجاب">${ICON_FIRE}<b>${fmtCount(p.likes)}</b></button>
      <button class="rl-ab chat" data-act="cm" data-id="${p.id}" type="button" aria-label="التعليقات">${ICON_CHAT}<b>${fmtCount(comments)}</b></button>
      <button class="rl-ab rep ${repOnMe(p)?'on':''}" data-act="rep" data-id="${p.id}" type="button" aria-label="إعادة نشر">${ICON_REP}<b>${fmtCount(p.reposts)}</b></button>
      <button class="rl-ab star ${p.saved?'on':''}" data-act="save" data-id="${p.id}" type="button" aria-label="حفظ">${ICON_STAR}<b>${fmtCount(savesOf(p))}</b></button>
      <button class="rl-ab more" data-act="more" data-id="${p.id}" type="button" aria-label="المزيد"><svg viewBox="0 0 24 24"><circle cx="5" cy="12" r="2"/><circle cx="12" cy="12" r="2"/><circle cx="19" cy="12" r="2"/></svg></button>
    </div>
    <div class="rl-pg"><i></i></div>
    <div class="rl-info">
      ${rpPillHtml(p)}
      <div class="rl-user">
        <div class="rl-av" data-pf="${esc(p.__owner||(a.handle||'').replace(/^@/,''))}" role="button" tabindex="0">${authorAvatarMarkup(a)}</div>
        <div style="min-width:0">
          <div class="rl-un${fo?' has-fo':''}"><span class="n ${nfc(a)}" dir="auto" data-pf="${esc(p.__owner||(a.handle||'').replace(/^@/,''))}">${esc(a.name||'حساب')}</span>${bkVerified(a)?ICON_VB:''}${fo}</div>
          <div class="rl-hd ${nfc(a)}">@${esc(a.handle||'user')} · ${ago(p.time)}</div>
        </div>
      </div>
      ${cap?`<div class="rl-cap ${nfc(a)}" data-cap="${p.id}">${esc(cap)}</div>`:''}
      ${tags.length?`<div class="rl-tags">${tags.map(t=>`<span data-tag="${esc(t)}">${esc(t)}</span>`).join('')}</div>`:''}
      <div class="rl-music">
        <div class="rl-pill"><i>${ICON_NOTE}</i><span class="${nfc(a)}">${esc('الصوت الأصلي - '+(a.name||'حساب'))}</span></div>
        <button class="rl-mb" data-act="share" data-id="${p.id}" type="button" aria-label="مشاركة">${ICON_PLANE}</button>
      </div>
    </div>
  </div>`;
}

function mountMedia(l){
  l.forEach(p=>{
    const box=document.querySelector(`.rl-media[data-m="${p.id}"]`); if(!box) return;
    if((p.mediaType||'').startsWith('video')){
      const v=document.createElement('video');
      v.loop=true; v.playsInline=true; v.setAttribute('playsinline',''); v.preload='metadata';
      v.muted=false; v.src=p.mediaData; rsWire(v);
      if(p.cover) v.poster=p.cover;
      box.appendChild(v);
    }else{
      const im=document.createElement('img'); im.src=p.mediaData; im.alt=''; box.appendChild(im);
    }
  });
}

function render(keep){
  const sc=$('rlScroll'), em=$('rlEmpty'); if(!sc) return;
  const top=keep?sc.scrollTop:0;
  const l=list();
  stopAll();
  sc.innerHTML=l.map(itemHtml).join('');
  mountMedia(l);
  em.innerHTML=emptyHtml(); em.classList.toggle('show',!l.length); renderPeople();
  sc.style.display=l.length?'block':'none';
  if(keep) sc.scrollTop=top;
  if(RL.startId){
    const st=sc.querySelector('.rl-item[data-id="'+rpResolve(RL.startId)+'"]');
    if(st){ sc.style.scrollBehavior='auto'; sc.scrollTop=st.offsetTop; }
    RL.startId=null;
  }
  observe();
}
function stopAll(){
  if(RL.io){ RL.io.disconnect(); RL.io=null; }
  document.querySelectorAll('#rlScroll video').forEach(v=>{ try{v.pause();}catch(e){} });
}
function observe(){
  const sc=$('rlScroll'); if(!sc) return;
  RL.io=new IntersectionObserver(es=>{
    es.forEach(e=>{
      const it=e.target, v=it.querySelector('video');
      if(e.isIntersecting&&e.intersectionRatio>=.6){
        RL.cur=it.dataset.id;
        it.classList.remove('paused');
        if(v){ const pr=v.play(); if(pr&&pr.catch) pr.catch(()=>{ v.muted=true; const p2=v.play(); if(p2&&p2.catch) p2.catch(()=>{}); }); }
      }else if(v){ try{v.pause();}catch(x){} }
    });
  },{root:sc,threshold:[0,.6,1]});
  sc.querySelectorAll('.rl-item').forEach(i=>RL.io.observe(i));
}
function refreshCounts(id){
  const p=findPost(id); if(!p) return;
  const it=document.querySelector(`.rl-item[data-id="${id}"]`); if(!it) return;
  it.querySelector('[data-act="like"]').classList.toggle('on',!!p.liked);
  it.querySelector('[data-act="like"] b').textContent=fmtCount(p.likes);
  it.querySelector('[data-act="cm"] b').textContent=fmtCount(commentTotal(p));
  it.querySelector('[data-act="rep"] b').textContent=fmtCount(p.reposts);
  it.querySelector('[data-act="save"]').classList.toggle('on',!!p.saved);
  it.querySelector('[data-act="save"] b').textContent=fmtCount(savesOf(p));
  it.querySelector('[data-act="rep"]').classList.toggle('on',repOnMe(p));
  try{window.hmSyncPost&&window.hmSyncPost(id)}catch(e){}
}
window.rlRefresh=refreshCounts;

/* ---------- actions ---------- */
function doLike(id){
  const p=normalizePost(findPost(id)); if(!p) return;
  p.liked=!p.liked; p.likes=Math.max(0,p.likes+(p.liked?1:-1));
  sound(p.liked?'like':'soft'); saveData(); refreshCounts(id); try{fpSync(id);}catch(e){}
}
function doSave(id){
  const p=normalizePost(findPost(id)); if(!p) return;
  const was=!!p.saved; p.saved=!was;
  p.saves=Math.max(0,Math.max(Number(p.saves||0),was?1:0)+(p.saved?1:-1));
  sound('soft'); saveData(); refreshCounts(id); try{fpSync(id);}catch(e){}
  toast(p.saved?'أُضيف إلى المحفوظات':'أُزيل من المحفوظات');
}
function doRepost(id){
  repostPost(id); render(true);
  try{window.hmSyncPost&&window.hmSyncPost(id)}catch(e){}
}
function togglePlay(id){
  const it=document.querySelector(`.rl-item[data-id="${id}"]`); if(!it) return;
  const v=it.querySelector('video'); if(!v) return;
  if(v.paused){ v.muted=false; const pr=v.play(); if(pr&&pr.catch) pr.catch(()=>{}); it.classList.remove('paused'); }
  else{ v.pause(); it.classList.add('paused'); }
}

/* tap = glass controls (previous / pause-play / next) */
function armCtl(it){ clearTimeout(it._ct); if(!it.classList.contains('paused')) it._ct=setTimeout(()=>it.classList.remove('ctl'),3200); }
function showCtl(id){
  const it=document.querySelector(`.rl-item[data-id="${id}"]`); if(!it) return;
  if(it.classList.contains('ctl')&&!it.classList.contains('paused')){ clearTimeout(it._ct); it.classList.remove('ctl'); return; }
  it.classList.add('ctl'); armCtl(it);
}
function ctlPress(b){
  const it=b.closest('.rl-item'); if(!it) return; const k=b.dataset.ctl;
  if(k==='pp'){ togglePlay(it.dataset.id); armCtl(it); return; }
  const t=k==='prev'?it.previousElementSibling:it.nextElementSibling;
  if(t&&t.classList.contains('rl-item')){ sound('soft'); t.scrollIntoView({behavior:'smooth',block:'start'}); }
}
(function(){ const ua=navigator.userAgent; if(/Chrome|Chromium|Edg/.test(ua)&&!/iPhone|iPad|iPod/.test(ua)) document.documentElement.classList.add('rl-lens'); })();

/* ---------- comments sheet ---------- */
const ICO={
  dl:'<svg viewBox="0 0 24 24"><path d="M17 14V2"/><path d="M9 18.12 10 14H4.17a2 2 0 0 1-1.92-2.56l2.33-8A2 2 0 0 1 6.5 2H20a2 2 0 0 1 2 2v8a2 2 0 0 1-2 2h-2.76a2 2 0 0 0-1.79 1.11L12 22a3.13 3.13 0 0 1-3-3.88Z"/></svg>',
  lk:'<svg viewBox="0 0 24 24"><path d="M20.8 4.6a5.5 5.5 0 0 0-7.8 0L12 5.7l-1-1.1a5.5 5.5 0 0 0-7.8 7.8l1 1.1L12 21l7.8-7.5 1-1.1a5.5 5.5 0 0 0 0-7.8z"/></svg>',
  chev:'<svg viewBox="0 0 24 24"><path d="m6 9 6 6 6-6"/></svg>'
};
function ensureSheet(){
  if($('rlCm')) return;
  document.body.insertAdjacentHTML('beforeend',`
  <div class="rl-cm-bd" id="rlCmBd"></div>
  <div class="rl-cm" id="rlCm" role="dialog" aria-label="التعليقات">
    <div class="rl-cm-head">
      <div class="rl-cm-count"><svg viewBox="0 0 24 24"><path d="M4 7h16M7 12h10M10 17h4"/></svg><span id="rlCmN">0 تعليقًا</span></div>
      <button class="rl-cm-x" id="rlCmX" type="button" aria-label="إغلاق"><svg viewBox="0 0 24 24"><path d="M6 6l12 12M18 6 6 18"/></svg></button>
    </div>
    <div class="rl-cm-list" id="rlCmList"></div>
    <div class="rl-cm-emo" id="rlCmEmo"></div>
    <div class="rl-cm-prev" id="rlCmPrev"><img id="rlCmPrevImg" alt=""><span>صورة مرفقة</span><button id="rlCmPrevX" type="button" aria-label="إزالة">✕</button></div>
    <div class="rl-cm-bar">
      <div class="rl-cm-me" id="rlCmMe"></div>
      <div class="rl-cm-pill">
        <input id="rlCmIn" type="text" placeholder="إضافة تعليق..." autocomplete="off" enterkeyhint="send">
        <button class="ic" id="rlCmImg" type="button" aria-label="صورة"><svg viewBox="0 0 24 24"><rect x="3.5" y="3.5" width="17" height="17" rx="2.5"/><circle cx="9" cy="9" r="1.7"/><path d="m4 18 5.2-5.2 3.3 3.3 2.5-2.5L20 18"/></svg></button>
        <button class="ic mic" id="rlCmMic" type="button" aria-label="تسجيل صوتي"><svg viewBox="0 0 24 24"><rect x="9" y="3" width="6" height="11" rx="3"/><path d="M5.5 11.5a6.5 6.5 0 0 0 13 0M12 18v3"/></svg></button>
        <button class="ic" id="rlCmEmoBtn" type="button" aria-label="إيموجي"><svg viewBox="0 0 24 24"><path d="M20.4 12A8.4 8.4 0 1 0 12 20.4"/><path d="M8.5 14.3a4.2 4.2 0 0 0 6.2.4"/><circle cx="9" cy="10" r=".6" fill="currentColor"/><circle cx="15" cy="10" r=".6" fill="currentColor"/><path d="M17.5 21.5v-5m-2.5 2.5h5"/></svg></button>
        <button class="ic" id="rlCmAt" type="button" aria-label="إشارة"><svg viewBox="0 0 24 24"><circle cx="12" cy="12" r="3.6"/><path d="M15.6 8.4v5a2.6 2.6 0 0 0 5.2 0V12a8.8 8.8 0 1 0-3.4 6.9"/></svg></button>
      </div>
      <button class="rl-cm-send" id="rlCmSend" type="button" aria-label="إرسال"><svg viewBox="0 0 24 24"><path d="M22 2 11 13"/><path d="M22 2 15 22l-4-9-9-4z"/></svg></button>
      <input type="file" id="rlCmFile" accept="image/*" style="display:none">
    </div>
  </div>`);
  const EM=['😂','❤️','😍','🔥','👏','😭','🙏','😎','🥹','💯','😅','🤣','👍','🎉','😮','💔','🤝','✨','😢','😡'];
  $('rlCmEmo').innerHTML=EM.map(e=>`<button type="button">${e}</button>`).join('');
  $('rlCmEmo').onclick=e=>{ const b=e.target.closest('button'); if(!b) return; const i=$('rlCmIn'); i.value+=b.textContent; i.focus(); syncSend(); };
  $('rlCmBd').onclick=closeCm; $('rlCmX').onclick=closeCm;
  $('rlCmEmoBtn').onclick=()=>$('rlCmEmo').classList.toggle('show');
  $('rlCmAt').onclick=()=>{ const i=$('rlCmIn'); i.value+=(i.value&&!/\s$/.test(i.value)?' ':'')+'@'; i.focus(); syncSend(); };
  $('rlCmImg').onclick=()=>$('rlCmFile').click();
  $('rlCmFile').onchange=async e=>{
    const f=e.target.files&&e.target.files[0]; e.target.value=''; if(!f) return;
    try{
      const rd=await new Promise((ok,no)=>{ const r=new FileReader(); r.onload=()=>ok(r.result); r.onerror=no; r.readAsDataURL(f); });
      RL.img=await compressDataUrl(rd,900,.8);
      $('rlCmPrevImg').src=RL.img; $('rlCmPrev').classList.add('show'); syncSend();
    }catch(x){ toast('تعذر تحميل الصورة'); }
  };
  $('rlCmPrevX').onclick=()=>{ RL.img=''; $('rlCmPrev').classList.remove('show'); syncSend(); };
  $('rlCmIn').oninput=syncSend;
  $('rlCmIn').onkeydown=e=>{ if(e.key==='Enter'){ e.preventDefault(); sendCm(); } };
  $('rlCmSend').onclick=()=>sendCm();
  $('rlCmList').onclick=cmClick;
  if(window.VN) VN.mount(document.querySelector('#rlCm .rl-cm-bar'),$('rlCmMic'),v=>sendCm(v));
}
function syncSend(){ $('rlCmSend').classList.toggle('show',!!($('rlCmIn').value.trim()||RL.img)); }
function avHtml(a){ return authorAvatarMarkup(a); }
function normC(p){
  p.comments=Array.isArray(p.comments)?p.comments:[];
  p.comments.forEach(c=>{ if(!c.id) c.id=uid(); c.likes=Number(c.likes||0); c.replies=Array.isArray(c.replies)?c.replies:[]; c.replies.forEach(r=>{ if(!r.id) r.id=uid(); r.likes=Number(r.likes||0); }); });
}
const XI={
  fireI:'<svg viewBox="8 7 48 48"><path d="M33.5 9c1 7.5 4.5 10.5 8.5 15.5 4 5 5.5 9 5.5 13.5a15.5 15.5 0 0 1-31 0c0-5 2-9 5-12.5 1 3.2 2.4 5 4.6 6.2-1.2-8.6 1.2-17 7.4-22.7z" fill="url(#rlFl)"/><path d="M32 29.5c1.4 4.2 5.8 6.4 5.8 11.6a5.8 5.8 0 0 1-11.6 0c0-3.2 1.8-4.8 3.2-6.8.8 1.8 1.6 2.4 2.6 2.6-.3-2.6-.3-4.8 0-7.4z" fill="url(#rlFl2)"/></svg>',
  chatI:'<svg viewBox="3 3 58 58"><path d="M13 9h38a7 7 0 0 1 7 7v21a7 7 0 0 1-7 7H35.5L23 55V44H13a7 7 0 0 1-7-7V16a7 7 0 0 1 7-7z" fill="rgba(70,160,255,.2)" stroke="url(#rlBl)" stroke-width="3.6" stroke-linejoin="round"/><circle cx="21.5" cy="26.5" r="3.1" fill="#9bdcff"/><circle cx="32" cy="26.5" r="3.1" fill="#9bdcff"/><circle cx="42.5" cy="26.5" r="3.1" fill="#9bdcff"/></svg>',
  repI:'<svg class="rpf-svg" viewBox="34.2 3.5 114.1 114.4"><g class="rp-halo" filter="url(#rpBl)"><use href="#rpA"/><use href="#rpB"/></g><use href="#rpA" fill="url(#rpGA)" stroke="#ffd7a6" stroke-opacity=".55" stroke-width="1.1" stroke-linejoin="round"/><use href="#rpB" fill="url(#rpGB)" stroke="#ffd7a6" stroke-opacity=".55" stroke-width="1.1" stroke-linejoin="round"/><g clip-path="url(#rpClip)"><rect class="rp-flow a" x="30" y="10" width="120" height="140" fill="url(#rpF1)"/><rect class="rp-flow b" x="30" y="10" width="120" height="140" fill="url(#rpF2)"/></g><g transform="translate(52 47.1) scale(0.9)"><path class="rpf f0" d="M0 0C-3.4-2-3.8-6.8-1-11.2C-.6-8.8 0-8.2 .9-9.6C2.8-7 3.6-2.5 0 0Z" fill="url(#rpFl)"/></g><g transform="translate(68 38.3) scale(1.15)"><path class="rpf f1" d="M0 0C-3.4-2-3.8-6.8-1-11.2C-.6-8.8 0-8.2 .9-9.6C2.8-7 3.6-2.5 0 0Z" fill="url(#rpFl)"/></g><g transform="translate(86 30.6) scale(1.3)"><path class="rpf f2" d="M0 0C-3.4-2-3.8-6.8-1-11.2C-.6-8.8 0-8.2 .9-9.6C2.8-7 3.6-2.5 0 0Z" fill="url(#rpFl)"/></g><g transform="translate(104 30.5) scale(1.1)"><path class="rpf f3" d="M0 0C-3.4-2-3.8-6.8-1-11.2C-.6-8.8 0-8.2 .9-9.6C2.8-7 3.6-2.5 0 0Z" fill="url(#rpFl)"/></g><g transform="translate(121 29.2) scale(1.0)"><path class="rpf f4" d="M0 0C-3.4-2-3.8-6.8-1-11.2C-.6-8.8 0-8.2 .9-9.6C2.8-7 3.6-2.5 0 0Z" fill="url(#rpFl)"/></g><g transform="translate(62 87.6) scale(0.8)"><path class="rpf f0" d="M0 0C-3.4-2-3.8-6.8-1-11.2C-.6-8.8 0-8.2 .9-9.6C2.8-7 3.6-2.5 0 0Z" fill="url(#rpFl)"/></g><g transform="translate(82 89.7) scale(0.95)"><path class="rpf f1" d="M0 0C-3.4-2-3.8-6.8-1-11.2C-.6-8.8 0-8.2 .9-9.6C2.8-7 3.6-2.5 0 0Z" fill="url(#rpFl)"/></g><g transform="translate(101 90.2) scale(0.9)"><path class="rpf f2" d="M0 0C-3.4-2-3.8-6.8-1-11.2C-.6-8.8 0-8.2 .9-9.6C2.8-7 3.6-2.5 0 0Z" fill="url(#rpFl)"/></g><g transform="translate(120 85.4) scale(0.85)"><path class="rpf f3" d="M0 0C-3.4-2-3.8-6.8-1-11.2C-.6-8.8 0-8.2 .9-9.6C2.8-7 3.6-2.5 0 0Z" fill="url(#rpFl)"/></g><circle class="rps s0" cx="70" cy="26" r="1"/><circle class="rps s1" cx="98" cy="21" r="0.9"/><circle class="rps s2" cx="122" cy="30" r="1.1"/><circle class="rps s3" cx="58" cy="60" r="0.8"/><circle class="rps s4" cx="112" cy="62" r="0.9"/></svg>',
  starI:'<svg viewBox="5 3 54 54"><path d="M32 10.5l6.9 14 15.4 2.2-11.2 10.9 2.7 15.3L32 45.5l-13.8 7.4 2.7-15.3L9.7 26.7l15.4-2.2z" fill="url(#rlGd)" stroke="#ffd45a" stroke-width="3.6" stroke-linejoin="round"/><path d="M12 8v7M8.5 11.5h7M53 6v6M50 9h6M55 40v6M52 43h6" stroke="#ffe08a" stroke-width="2.2" stroke-linecap="round"/></svg>',
dots:'<svg viewBox="0 0 24 24"><circle cx="5" cy="12" r="1.9"/><circle cx="12" cy="12" r="1.9"/><circle cx="19" cy="12" r="1.9"/></svg>',cm:'<svg viewBox="0 0 24 24"><path d="M20.5 11.5a8 8 0 0 1-11.6 7.1L4 19.8l1.3-4.3A8 8 0 1 1 20.5 11.5Z"/></svg>',heart:'<svg viewBox="0 0 24 24"><path d="M12 20s-7.5-4.6-7.5-10A4.3 4.3 0 0 1 12 7.4 4.3 4.3 0 0 1 19.5 10c0 5.4-7.5 10-7.5 10Z"/></svg>',bars:'<svg viewBox="0 0 24 24"><path d="M5 20V12M10 20V4M15 20V9M20 20V14"/></svg>',rep:'<svg viewBox="0 0 24 24"><path d="M3.5 11V9.2A3.2 3.2 0 0 1 6.7 6H19"/><path d="m16 2.8 3.4 3.2L16 9.2"/><path d="M20.5 13v1.8a3.2 3.2 0 0 1-3.2 3.2H5"/><path d="M8 21.2 4.6 18 8 14.8"/></svg>',mark:'<svg viewBox="0 0 24 24"><path d="M5.5 3.5h13v17L12 16l-6.5 4.5z"/></svg>',vb:'<svg class="hm-vb" viewBox="0 0 24 24"><path fill="#1d9bf0" d="M12 1.7l2.4 1.7 2.9-.3 1.2 2.7 2.7 1.2-.3 2.9L22.6 12l-1.7 2.4.3 2.9-2.7 1.2-1.2 2.7-2.9-.3L12 22.6l-2.4-1.7-2.9.3-1.2-2.7-2.7-1.2.3-2.9L1.4 12l1.7-2.4-.3-2.9 2.7-1.2 1.2-2.7 2.9.3z"/><path d="m7.6 12.3 3 3 5.9-6" fill="none" stroke="#fff" stroke-width="2.3" stroke-linecap="round" stroke-linejoin="round"/></svg>',share:'<svg viewBox="0 0 24 24"><circle cx="5.5" cy="12" r="2.6"/><circle cx="18" cy="5.5" r="2.6"/><circle cx="18" cy="18.5" r="2.6"/><path d="m8 10.8 7.5-3.9M8 13.2l7.5 3.9"/></svg>'};
function xShort(t){ const x=Math.max(0,Math.floor((Date.now()-(t||Date.now()))/1000)); if(x<60) return 'now'; if(x<3600) return Math.floor(x/60)+'m'; if(x<86400) return Math.floor(x/3600)+'h'; if(x<604800) return Math.floor(x/86400)+'d'; return Math.floor(x/604800)+'w'; }
function rowHtml(c,pid,isRep,parent){
  const a=c.author||currentAuthorSnapshot();
  const h=(a.handle||'').replace(/^@/,''), cid=c.id, nrep=(c.replies||[]).length;
  const par=isRep?` data-par="${parent}"`:'';
  return `<div class="hmc-c${isRep?' rep':''}" data-cid="${cid}">
    <div class="hmc-av" data-pf="${esc(h)}" role="button" tabindex="0">${avHtml(a)}</div>
    <div class="hmc-b">
      <div class="hmc-hd">
        <div class="nm"><span class="${nfc(a)}" data-pf="${esc(h)}" style="cursor:pointer">${esc(a.name||'حساب')}</span>${(window.bkVerified&&bkVerified(a))?XI.vb:''}</div>
        <span class="tm">· ${xShort(c.time)}</span>${h===RL.own?'<em>الكاتب</em>':''}${c.pinned?'<span class="pin">📌</span>':''}
        <button type="button" class="mo" data-ca="more" data-c="${cid}"${par} aria-label="خيارات">${XI.dots}</button>
      </div>
      ${c.text?`<div class="hmc-t ${nfc(a)}" dir="auto">${esc(c.text)}</div>`:''}
      ${c.img?`<img class="hmc-img cm-zoom" src="${c.img}" alt="" loading="lazy">`:''}
      ${c.voice&&window.VN?VN.html(c):''}
      <div class="hmc-x2">
        <button type="button" class="chat" data-ca="reply" data-c="${cid}"${par} aria-label="رد">${XI.chatI}<span>${nrep}</span></button>
        <button type="button" class="rep" data-ca="rt" data-c="${cid}" aria-label="إعادة نشر">${XI.repI}<span>${c.reposts||0}</span></button>
        <button type="button" class="lk fire${c.liked?' on':''}" data-ca="like" data-c="${cid}" aria-label="إعجاب">${XI.fireI}<span>${c.likes||0}</span></button>
        <button type="button" data-ca="views" data-c="${cid}" aria-label="المشاهدات">${XI.bars}<span>${c.views||0}</span></button>
        <button type="button" class="bk star${c.saved?' on':''}" data-ca="save" data-c="${cid}" aria-label="حفظ">${XI.starI}</button>
        <button type="button" data-ca="share" data-c="${cid}" aria-label="مشاركة">${XI.share}</button>
      </div>
      ${!isRep&&c.replies.length?`<button type="button" class="hmc-vr" data-ca="rep" data-c="${cid}">${RL.open[c.id]?'إخفاء الردود':'عرض '+c.replies.length+(c.replies.length>2?' ردود':' رد')}</button>`:''}
      ${!isRep&&RL.open[c.id]?c.replies.map(r=>rowHtml(r,pid,true,c.id)).join(''):''}
    </div>
  </div>`;
}
function renderCm(scrollEnd){
  const p=findPost(RL.cmId); if(!p) return; normC(p); RL.own=ownerH(p); decorateCm();
  document.querySelectorAll('#rlCmSort button').forEach(b=>b.classList.toggle('on',b.dataset.s===RL.cmSort));
  const tot=commentTotal(p);
  $('rlCmN').textContent=tot+' تعليقًا';
  const off=p.allowComments===false;
  $('rlCmList').innerHTML = off ? '<div class="rl-cm-none">التعليقات مغلقة على هذا المنشور</div>'
    : (p.comments.length ? sortedC(p).map(c=>rowHtml(c,p.id,false)).join('') : '<div class="rl-cm-none">لا توجد تعليقات بعد</div>');
  { const rb=$('rlCmRep'); if(rb){ rb.classList.toggle('show',!!RL.reply); rb.firstChild.textContent=RL.reply?('رد على '+RL.reply.name):''; } }
  $('rlCmIn').disabled=off; $('rlCmIn').placeholder=RL.reply?('رد على '+RL.reply.name+'...'):'إضافة تعليق...';
  const me=currentAuthorSnapshot(); $('rlCmMe').innerHTML=avHtml(me);
  if(scrollEnd) $('rlCmList').scrollTop=$('rlCmList').scrollHeight;
}
function findC(p,cid){
  for(const c of p.comments){ if(c.id===cid) return {c,parent:null}; for(const r of c.replies){ if(r.id===cid) return {c:r,parent:c}; } }
  return null;
}
function rlResolve(h){
  h=String(h||'').replace(/^@/,'').trim().toLowerCase(); if(!h) return null;
  const accs=getAccounts();
  if(accs[h]) return accs[h].username;
  if(h===curH().toLowerCase() && currentUser) return currentUser;
  try{ const m=JSON.parse(localStorage.getItem('bk_handles')||'{}'); const u=m[h]; if(u&&accs[String(u).toLowerCase()]) return accs[String(u).toLowerCase()].username; }catch(e){}
  for(const k of Object.keys(accs)){
    try{
      const d=JSON.parse(localStorage.getItem('black1_data__'+accs[k].username))||{};
      const ph=String((d.profile&&d.profile.handle)||'').replace(/^@/,'').trim().toLowerCase();
      if(ph&&ph===h) return accs[k].username;
    }catch(e){}
  }
  return null;
}
function rlVisit(h){
  const u=rlResolve(h);
  if(!u){ toast('هذا الحساب غير متاح'); return; }
  sound('soft');
  const cm=$('rlCm'); if(cm&&cm.classList.contains('show')) closeCm();
  openUserProfile(u);
}
function cmClick(e){
  const pf=e.target.closest('[data-pf]'); if(pf){ e.preventDefault(); e.stopPropagation(); rlVisit(pf.dataset.pf); return; }
  const b=e.target.closest('[data-ca]'); if(!b) return;
  const p=findPost(RL.cmId); if(!p) return;
  const f=findC(p,b.dataset.c); if(!f) return;
  const act=b.dataset.ca;
  if(cmExtra(act,f,p,b)) return;
  if(act==='like'){ f.c.liked=!f.c.liked; f.c.likes=Math.max(0,f.c.likes+(f.c.liked?1:-1)); if(f.c.liked) f.c.disliked=false; sound(f.c.liked?'like':'soft'); saveData(); renderCm(); }
  else if(act==='dis'){ f.c.disliked=!f.c.disliked; if(f.c.disliked&&f.c.liked){ f.c.liked=false; f.c.likes=Math.max(0,f.c.likes-1); } sound('soft'); saveData(); renderCm(); }
  else if(act==='rep'){ RL.open[b.dataset.c]=!RL.open[b.dataset.c]; renderCm(); }
  else if(act==='reply'){
    const top=f.parent||f.c; RL.reply={id:top.id,name:(f.c.author&&f.c.author.name)||'حساب'};
    if(!RL.open[top.id]&&top.replies.length) RL.open[top.id]=true;
    renderCm(); const i=$('rlCmIn'); i.focus();
  }
}
function sendCm(v){
  const p=findPost(RL.cmId); if(!p||p.allowComments===false) return;
  v=(v&&v.wave)?v:null;
  const i=$('rlCmIn'), t=i.value.trim(); if(!t&&!RL.img&&!v) return;
  normC(p);
  const obj={id:uid(),text:t,time:Date.now(),author:currentAuthorSnapshot(),likes:0,replies:[]};
  if(RL.img) obj.img=RL.img;
  if(v){ obj.voice=v.data; obj.vdur=v.dur; obj.wave=v.wave; }
  if(RL.reply){ const par=p.comments.find(c=>c.id===RL.reply.id); if(par){ par.replies.push(obj); RL.open[par.id]=true; } else p.comments.push(obj); }
  else p.comments.push(obj);
  const wasReply=!!RL.reply;
  RL.reply=null; RL.img=''; i.value=''; $('rlCmPrev').classList.remove('show'); syncSend();
  saveData(); sound('send'); renderCm(!wasReply); refreshCounts(p.id);
}
function openCm(id){
  const p=findPost(id); if(!p) return;
  ensureSheet(); RL.cmId=id; RL.reply=null; RL.img=''; $('rlCmPrev').classList.remove('show'); $('rlCmEmo').classList.remove('show'); $('rlCmIn').value=''; syncSend();
  renderCm();
  const v=$('view-reels'); v.classList.add('cm');
  document.querySelectorAll('.rl-item').forEach(i=>i.classList.toggle('cmx',i.dataset.id===id));
  $('rlCmBd').classList.add('show'); requestAnimationFrame(()=>$('rlCm').classList.add('show'));
}
function closeCm(){
  const s=$('rlCm'); if(!s) return;
  try{ window.VN&&VN.cancelAll(); }catch(e){}
  s.classList.remove('show'); $('rlCmBd').classList.remove('show');
  const v=$('view-reels'); v.classList.remove('cm');
  document.querySelectorAll('.rl-item.cmx').forEach(i=>i.classList.remove('cmx'));
  const ae=document.activeElement; if(ae&&ae.blur) ae.blur();
}

/* ===== reels: comment tools ===== */
RL.cmSort=RL.cmSort||'top';
function curH(){ return (currentAuthorSnapshot().handle||'').replace(/^@/,''); }
function ownerH(p){ return ((postAuthor(p)||{}).handle||'').replace(/^@/,''); }
function sortedC(p){
  const a=p.comments.slice();
  a.sort((x,y)=>(y.pinned?1:0)-(x.pinned?1:0) || (RL.cmSort==='top' ? ((y.likes+y.replies.length)-(x.likes+x.replies.length)||y.time-x.time) : y.time-x.time));
  return a;
}
function decorateCm(){
  const s=$('rlCm'); if(!s||$('rlCmSort')) return;
  s.insertAdjacentHTML('afterbegin','<div class="gr"></div>');
  $('rlCmN').closest('.rl-cm-count').insertAdjacentHTML('afterend','<div class="rl-cm-sort" id="rlCmSort"><button type="button" data-s="top">الأعلى</button><button type="button" data-s="new">الأحدث</button></div>');
  $('rlCmSort').onclick=e=>{ const b=e.target.closest('button'); if(!b) return; RL.cmSort=b.dataset.s; renderCm(); };
  const bar=s.querySelector('.rl-cm-bar');
  bar.insertAdjacentHTML('beforebegin','<div class="rl-cm-rep" id="rlCmRep"><span></span><button type="button" aria-label="إلغاء">✕</button></div><div class="rl-cm-quick" id="rlCmQ">'+['😂','❤️','🔥','👏','😍','😮','🙏'].map(e=>'<button type="button">'+e+'</button>').join('')+'</div>');
  $('rlCmQ').onclick=e=>{ const b=e.target.closest('button'); if(!b) return; const i=$('rlCmIn'); i.value+=b.textContent; i.focus(); syncSend(); };
  $('rlCmRep').querySelector('button').onclick=()=>{ RL.reply=null; renderCm(); };
}
function mineC(c){ const h=((c.author||{}).handle||'').replace(/^@/,''); return !!h && h===curH(); }
function cmMenu(f,p,b){
  document.querySelectorAll('.hm-cmenu').forEach(x=>x.remove());
  const top=!f.parent, own=RL.own===curH();
  const items=[['copy','نسخ التعليق']];
  if(top&&own) items.push(['pin',f.c.pinned?'إلغاء التثبيت':'تثبيت التعليق']);
  if(mineC(f.c)||own) items.push(['del','حذف التعليق']);
  const m=document.createElement('div'); m.className='hm-cmenu';
  m.innerHTML=items.map(([k,t])=>`<button type="button" data-k="${k}" class="${k==='del'?'dg':''}">${t}</button>`).join('');
  document.body.appendChild(m);
  const r=b.getBoundingClientRect();
  m.style.top=Math.max(10,Math.min(window.innerHeight-m.offsetHeight-10,r.bottom+4))+'px'; m.style.left=Math.max(10,r.left)+'px';
  m.onclick=e=>{ const k=e.target.closest('button'); if(!k) return; m.remove(); cmExtra(k.dataset.k,f,p,b); };
  setTimeout(()=>document.addEventListener('click',()=>m.remove(),{once:true}),0);
}
function cmExtra(act,f,p,b){
  if(act==='more'){ cmMenu(f,p,b); return true; }
  if(act==='save'){ f.c.saved=!f.c.saved; sound('soft'); saveData(); renderCm(); return true; }
  if(act==='rt'||act==='views'){ toast(act==='rt'?'إعادة النشر غير متاحة للتعليقات':'عدّاد المشاهدات غير متاح للتعليقات'); return true; }
  if(act==='share'){ const tx=String(f.c.text||''); if(navigator.share){ navigator.share({text:tx}).catch(()=>{}); } else { try{ navigator.clipboard.writeText(tx); }catch(e){} toast('تم نسخ التعليق'); } return true; }
  if(act==='copy'){ try{ navigator.clipboard.writeText(f.c.text||''); }catch(e){} toast('تم نسخ التعليق'); return true; }
  if(act==='del'){ if(!confirm('حذف هذا التعليق؟')) return true; const arr=f.parent?f.parent.replies:p.comments; arr.splice(arr.indexOf(f.c),1); saveData(); renderCm(); refreshCounts(p.id); return true; }
  if(act==='pin'){ const was=!!f.c.pinned; p.comments.forEach(c=>c.pinned=false); f.c.pinned=!was; saveData(); renderCm(); toast(was?'أُلغي التثبيت':'تم تثبيت التعليق'); return true; }
  return false;
}
/* progress bar */
document.addEventListener('timeupdate',e=>{ const v=e.target; if(!v.closest) return; const it=v.closest('.rl-item'); if(!it||!v.duration) return; const i=it.querySelector('.rl-pg i'); if(i) i.style.width=(v.currentTime/v.duration*100)+'%'; },true);
(function(){ function seek(e){ const g=e.target.closest('.rl-pg'); if(!g) return; const v=g.closest('.rl-item').querySelector('video'); if(!v||!v.duration) return; const r=g.getBoundingClientRect(), x=(e.touches?e.touches[0].clientX:e.clientX); v.currentTime=Math.max(0,Math.min(1,(x-r.left)/r.width))*v.duration; e.stopPropagation(); }
 document.addEventListener('click',seek,true); document.addEventListener('touchmove',seek,{capture:true,passive:true}); })();

/* ===== reels: double-tap to like ===== */
let _lt=0,_lh=null;
document.addEventListener('click',e=>{ const h=e.target.closest('[data-hit]'); if(!h) return; const n=Date.now();
  if(_lh===h&&n-_lt<320){ e.stopPropagation(); e.preventDefault(); const id=h.dataset.hit, p=findPost(id); if(p&&!p.liked) doLike(id); togglePlay(id);
    const d=document.createElement('div'); d.className='rl-heart'; d.textContent='🔥'; d.style.left=e.clientX+'px'; d.style.top=e.clientY+'px'; document.body.appendChild(d); setTimeout(()=>d.remove(),850); _lt=0; return; }
  _lh=h; _lt=n; },true);

/* ---------- init ---------- */
function init(){
  if(RL.ready) return; RL.ready=true;
  const v=$('view-reels');
  $('rlTabFy').onclick=()=>setTab('fy'); $('rlTabFo').onclick=()=>setTab('fo');
  $('rlBack').onclick=()=>{
    RL.mode=null; v.classList.remove('prof'); sound('soft');
    const i=barIndex('حسابي'); if(i>=0&&window.setArcActive) window.setArcActive(i); else go('profile');
  };
  $('rlSearchBtn').onclick=()=>{ v.classList.add('srch'); setTimeout(()=>$('rlSearchInput').focus(),60); };
  $('rlSearchClose').onclick=()=>{ v.classList.remove('srch'); $('rlSearchInput').value=''; if(RL.q){ RL.q=''; render(); } };
  $('rlSearchInput').oninput=e=>{ RL.q=e.target.value; render(); };
  $('rlPeople').onclick=e=>{ const b=e.target.closest('[data-u]'); if(b){ sound('soft'); $('rlSearchClose').onclick(); openUserProfile(b.dataset.u); } };
  $('rlScroll').addEventListener('click',e=>{
    const pf=e.target.closest('[data-pf]'); if(pf){ e.stopPropagation(); rlVisit(pf.dataset.pf); return; }
    const cb=e.target.closest('[data-ctl]'); if(cb){ e.stopPropagation(); ctlPress(cb); return; }
    const b=e.target.closest('[data-act]');
    if(b){
      const id=b.dataset.id, a=b.dataset.act;
      if(a==='follow'){ rlToggleFollow(b); return; }
      if(a==='like') doLike(id); else if(a==='cm') openCm(id); else if(a==='rep') doRepost(id);
      else if(a==='save') doSave(id); else if(a==='share') sharePost(id); else if(a==='more') rsOpen(id);
      return;
    }
    const tg=e.target.closest('[data-tag]');
    if(tg){ v.classList.add('srch'); $('rlSearchInput').value=tg.dataset.tag; RL.q=tg.dataset.tag; render(); return; }
    const cap=e.target.closest('[data-cap]');
    if(cap){ cap.classList.toggle('open'); return; }
    const h=e.target.closest('[data-hit]');
    if(h) togglePlay(h.dataset.hit);
  });
  $('rlScroll').addEventListener('scroll',()=>{ document.querySelectorAll('#rlScroll .rl-item.ctl').forEach(i=>i.classList.remove('ctl')); },{passive:true});
}
function barIndex(label){ return Array.from(document.querySelectorAll('#bar .tab')).findIndex(b=>b.textContent.trim()===label); }
function setTab(t){
  if(RL.mode){ RL.mode=null; $('view-reels').classList.remove('prof'); }
  RL.tab=t; $('rlTabFy').classList.toggle('on',t==='fy'); $('rlTabFo').classList.toggle('on',t==='fo'); sound('soft'); render();
}

/* ===== Reels ⋯ settings sheet ===== */
const RSK='black1_rl_prefs',RATES=[.5,.75,1,1.25,1.5,2,3],THEMES=[['#2f9bff','#b55cff','أزرق'],['#ff8a2a','#ff4f7a','غروب'],['#29d391','#2f9bff','زمردي'],['#e6e9f0','#8b93a5','فضي']];
const rsLS=(k,d)=>{try{return JSON.parse(localStorage.getItem(k))||d}catch(e){return d}},rsSet=(k,v)=>{try{localStorage.setItem(k,JSON.stringify(v))}catch(e){}};
const P=Object.assign({rate:1,enh:0,voice:0,con:1,theme:0,next:0,swipe:1,hold:1,sleep:0,ar:0},rsLS(RSK,{}));
const rsSave=()=>rsSet(RSK,P),rsHidden=()=>rsLS('black1_rl_hidden',[]);
const curItem=()=>document.querySelector('.rl-item[data-id="'+RL.cur+'"]'),curVid=()=>{const i=curItem();return i&&i.querySelector('video')};
const sv=d=>'<svg viewBox="0 0 24 24">'+d+'</svg>';
const IC={dl:sv('<path d="M7 18a4.5 4.5 0 0 1-.6-8.9A6 6 0 0 1 18 8.6 4.8 4.8 0 0 1 17 18"/><path d="M12 11v8m-3-3 3 3 3-3"/>'),ni:sv('<path d="M12 20s-7-4.4-7-10a4 4 0 0 1 7-2.4A4 4 0 0 1 19 10"/><circle cx="17" cy="17" r="4.2"/><path d="m14 20 6-6"/>'),fl:sv('<path d="M5 21V4m0 1h12l-2.5 4L17 13H5"/>'),
pip:sv('<rect x="2.5" y="4.5" width="19" height="14" rx="3"/><rect x="12" y="11" width="7.5" height="5.5" rx="1.5" fill="currentColor"/>'),fs:sv('<path d="M3 8V5a2 2 0 0 1 2-2h3M16 3h3a2 2 0 0 1 2 2v3M21 16v3a2 2 0 0 1-2 2h-3M8 21H5a2 2 0 0 1-2-2v-3"/>'),
sum:sv('<path d="M6 3h8l4 4v14H6z"/><path d="M9 11h6M9 15h6"/>'),res:sv('<path d="M12 3 4 7.5v9L12 21l8-4.500v-9z"/><path d="m4 7.500 8 4.500 8-4.500M12 12v9"/>'),tr:sv('<path d="M4 19 9 5l5 14M6 14h6M15 8h5M17.500 6v2c0 3-1.500 5-3.500 6M16 12c.8 1.500 2.200 2.800 4 3.500"/>'),mic:sv('<rect x="9" y="3" width="6" height="11" rx="3"/><path d="M5 11a7 7 0 0 0 14 0M12 18v3"/>'),
ar:sv('<path d="M2 12s3.500-6 10-6 10 6 10 6-3.500 6-10 6S2 12 2 12z"/><circle cx="12" cy="12" r="3"/>'),air:sv('<path d="M5 17H4a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2h16a2 2 0 0 1 2 2v9a2 2 0 0 1-2 2h-1"/><path d="m12 14 5 6H7z" fill="currentColor"/>'),
st:sv('<path d="M5 20V10M10 20V4M15 20v-8M20 20V8"/>'),au:sv('<circle cx="12" cy="12" r="9"/><path d="m10 8.500 5 3.500-5 3.500z" fill="currentColor"/>'),pf:sv('<path d="M4 17a8 8 0 1 1 16 0"/><path d="m12 17 4-6"/>'),ges:sv('<path d="M4 7h9M19 7h1M4 17h1M11 17h9"/><circle cx="16" cy="7" r="2.500"/><circle cx="8" cy="17" r="2.500"/>')};
const card=(k,ic,t,s,cls)=>'<button type="button" class="rs-c rs-row '+(cls||'')+'" data-k="'+k+'"><span><b>'+t+'</b><small>'+s+'</small></span>'+ic+'</button>';
function rsHtml(){
 return '<i class="rs-hd"></i><div class="rs-top"><button type="button" id="rsX" aria-label="رجوع">›</button><span>إعدادات الريل</span></div><div class="rs-sc" id="rsSc"><div class="rs-t3">'+
 '<button type="button" class="rs-c" data-k="dl">'+IC.dl+'<span>تنزيل</span></button><button type="button" class="rs-c" data-k="ni">'+IC.ni+'<span>غير مهتم</span></button><button type="button" class="rs-c" data-k="rp">'+IC.fl+'<span>إبلاغ</span></button></div>'+
 '<div class="rs-r2"><button type="button" class="rs-c rs-sq" data-k="pip">'+IC.pip+'<span>صورة داخل صورة متقدمة</span></button><button type="button" class="rs-c rs-sq" data-k="fs">'+IC.fs+'<span>شاشة كاملة</span></button>'+
 '<div class="rs-c rs-dial"><span>قرص التحكم بالسرعة</span><svg id="rsDial" viewBox="0 0 230 124"></svg></div></div>'+
 '<div class="rs-h">تعزيز الوسائط بالذكاء الاصطناعي</div><div class="rs-g2">'+
 card('sum',IC.sum,'ملخصات الفيديو','Video Summaries')+card('res',IC.res,'محسّن دقة الصورة','Resolution | 4K Enhanced','')+card('tr',IC.tr,'الشرح والترجمة','English Selection | Translate')+card('voice',IC.mic,'عزل الصوت','Voice Isolation')+'</div>'+
 '<div class="rs-h">تخصيص العرض</div><div class="rs-g3">'+card('ar',IC.ar,'توافق الواقع المعزز','AR Compatibility','')+
 '<div class="rs-c rs-ct"><b>مقياس التباين المتقدم</b><input type="range" id="rsCon" min=".7" max="1.5" step=".01"></div><button type="button" class="rs-c rs-ct" data-k="theme"><b>واجهة مستخدم مخصصة</b><small style="color:#aeb4c2;direction:ltr;text-align:right">Custom UI Themes</small></button></div>'+
 '<div class="rs-h">الاتصال والبث</div><div class="rs-c rs-cast"><div class="t"><b>بث الشاشة</b><small>Screen Mirroring</small></div>'+
 '<button type="button" class="rs-dev" data-k="cast" id="rsDc"><b>Cast / TV</b><i>Status</i></button><button type="button" class="rs-dev" data-k="air" id="rsDa"><b>AirPlay</b><i>Status</i></button><button type="button" class="rs-dev" data-k="pres" id="rsDp"><b>Second Screen</b><i>Status</i></button></div>'+
 '<div class="rs-h">بيانات وتحكم</div><div class="rs-c rs-data"><div>'+
 '<button type="button" class="rs-li" data-k="stats">'+IC.st+'<span><b>إحصائيات المشاهدة المتقدمة</b><small>Advanced Watch Stats</small></span></button>'+
 '<button type="button" class="rs-li" data-k="auto">'+IC.au+'<span><b>أتمتة التشغيل</b><small>Playback Automation</small></span></button>'+
 '<button type="button" class="rs-li" data-k="perf">'+IC.pf+'<span><b>تتبع أداء البث</b><small>Playback Performance</small></span></button></div>'+
 '<div class="rs-mini"><button type="button" class="rs-sw" data-k="next"><span>تمرير تلقائي</span><i class="rs-tg" id="rsNx"></i></button><button type="button" class="rs-sw" data-k="ges"><span>التحكم بالإيماءات</span>'+IC.ges.replace('<svg','<svg width="24" height="24" fill="none" stroke="currentColor" stroke-width="1.8"')+'</button></div></div></div>'+
 '<div class="rs-sub" id="rsSub"><div class="rs-sh"><button type="button" id="rsBk">›</button><span id="rsT"></span></div><div id="rsB"></div></div>';
}
function rsDial(){
 const cx=115,cy=96,r=66,pt=(t,R)=>[cx+R*Math.cos(t*Math.PI/180),cy-R*Math.sin(t*Math.PI/180)],ang=i=>190-i*(200/6),a=pt(190,r),b=pt(-10,r),i=Math.max(0,RATES.indexOf(P.rate)),k=pt(ang(i),r);
 const d='M'+a[0]+' '+a[1]+'A'+r+' '+r+' 0 1 1 '+b[0]+' '+b[1];
 let h='<path d="'+d+'" stroke="rgba(255,255,255,.14)" stroke-width="20" stroke-linecap="round" fill="none"/><path d="'+d+'" stroke="rgba(255,255,255,.18)" stroke-width="2" fill="none" transform="translate(0,-8)"/><path d="'+d+'" pathLength="100" stroke="url(#rsG)" stroke-width="20" stroke-linecap="round" fill="none" stroke-dasharray="'+(i/6*100).toFixed(1)+' 200"/>';
 h='<defs><linearGradient id="rsG"><stop offset="0" stop-color="'+THEMES[P.theme][0]+'"/><stop offset="1" stop-color="'+THEMES[P.theme][1]+'"/></linearGradient></defs>'+h;
 RATES.forEach((x,j)=>{const q=pt(ang(j),84);h+='<text data-r="'+j+'" x="'+q[0]+'" y="'+(q[1]+4)+'" class="'+(j===i?'a':'')+'">×'+(x===1||x===2||x===3?x.toFixed(1):x)+'</text>'});
 h+='<circle cx="'+k[0]+'" cy="'+k[1]+'" r="11" fill="#fff" stroke="rgba(0,0,0,.25)" stroke-width="2"/><text x="'+cx+'" y="'+(cy-6)+'" style="font-size:13px;cursor:default;fill:#fff">سرعة التشغيل</text>';
 $('rsDial').innerHTML=h;
}
function rsRate(x){P.rate=x;rsSave();document.querySelectorAll('#rlScroll video').forEach(v=>{v.defaultPlaybackRate=x;v.playbackRate=x});rsDial();sound('soft')}
function rsLook(){
 const v=$('view-reels'),f='contrast('+P.con+') saturate('+(P.enh?1.12:1)+')'+(P.enh?' url(#rsSharp)':'');
 v.style.setProperty('--rs-f',(P.con===1&&!P.enh)?'none':f);
 const t=THEMES[P.theme];document.documentElement.style.setProperty('--rs-a',t[0]);document.documentElement.style.setProperty('--rs-b',t[1]);
}
function rsVoice(v){
 if(!v) return;
 try{
  if(!v._rs){ if(!P.voice) return; const C=window.AudioContext||window.webkitAudioContext,c=new C(),s=c.createMediaElementSource(v),hp=c.createBiquadFilter(),pk=c.createBiquadFilter(),lp=c.createBiquadFilter(),cm=c.createDynamicsCompressor();
   hp.type='highpass';hp.frequency.value=130;pk.type='peaking';pk.frequency.value=2600;pk.Q.value=.9;pk.gain.value=7;lp.type='lowpass';lp.frequency.value=5600;v._rs={c,s,n:[hp,pk,lp,cm]}; }
  const o=v._rs;o.s.disconnect();o.n.forEach(n=>n.disconnect());
  if(P.voice){let p=o.s;o.n.forEach(n=>{p.connect(n);p=n});p.connect(o.c.destination)}else o.s.connect(o.c.destination);
  if(o.c.state==='suspended') o.c.resume();
 }catch(e){}
}
function rsWire(v){
 v.loop=!P.next;v.defaultPlaybackRate=v.playbackRate=P.rate;
 v.addEventListener('ended',()=>{if(P.next) rsNext()});
 v.addEventListener('play',()=>{v.playbackRate=P.rate;rsVoice(v)});
}
function rsNext(){const i=curItem(),n=i&&i.nextElementSibling;if(n&&n.classList.contains('rl-item')) $('rlScroll').scrollTo({top:n.offsetTop,behavior:'smooth'})}
let RS={id:null,st:null,pf:null},S=rsLS('black1_rl_stats',{d:{},p:{}}),tk=0;
setInterval(()=>{ if(!document.body.classList.contains('rl-on')||document.hidden||!RL.cur) return; const v=curVid(); if(v&&v.paused) return; const k=new Date().toISOString().slice(0,10); S.d[k]=(S.d[k]||0)+1; S.p[RL.cur]=(S.p[RL.cur]||0)+1; if(++tk%5===0) rsSet('black1_rl_stats',S); },1000);
const fT=s=>s>=3600?Math.floor(s/3600)+'س '+Math.floor(s%3600/60)+'د':s>=60?Math.floor(s/60)+'د '+(s%60)+'ث':s+'ث';
function sub(t,h,fn){$('rsT').textContent=t;$('rsB').innerHTML=h;$('rsSub').classList.add('on');$('rsSub').scrollTop=0;if(fn) fn(); if(RS.pf&&t!=='تتبع أداء البث'){clearInterval(RS.pf);RS.pf=null}}
function rsSync(){
 $('rsCon').value=P.con;$('rsNx').classList.toggle('on',!!P.next);
 [['res','enh'],['voice','voice'],['ar','ar']].forEach(a=>{const e=$('rs').querySelector('[data-k="'+a[0]+'"]');if(e) e.classList.toggle('on',!!P[a[1]])});
 const v=curVid(),has=!!(v&&v.remote),ok=(el,y)=>{el.classList.toggle('ok',y);el.querySelector('i').textContent=y?'Available':'Unavailable'};
 ok($('rsDc'),has);ok($('rsDa'),!!(v&&v.webkitShowPlaybackTargetPicker));ok($('rsDp'),!!window.PresentationRequest);rsDial();
}
function rsEnsure(){
 if($('rs')) return;
 document.body.insertAdjacentHTML('beforeend','<svg width="0" height="0" style="position:absolute"><filter id="rsSharp"><feConvolveMatrix order="3" kernelMatrix="0 -.5 0 -.5 3 -.5 0 -.5 0" preserveAlpha="true"/></filter></svg><div id="rsBd"></div><div id="rs" role="dialog" aria-label="إعدادات الريل">'+rsHtml()+'</div>');
 $('rsBd').onclick=rsClose;$('rsX').onclick=rsClose;$('rsBk').onclick=()=>{$('rsSub').classList.remove('on');if(RS.pf){clearInterval(RS.pf);RS.pf=null}};
 $('rsCon').oninput=e=>{P.con=+e.target.value;rsLook()};$('rsCon').onchange=rsSave;
 const dl=$('rsDial'),pick=e=>{const R=dl.getBoundingClientRect(),x=(e.clientX-R.left)/R.width*230-115,y=124*(e.clientY-R.top)/R.height-96;let t=Math.atan2(-y,x)*180/Math.PI;if(t<-90)t+=360;t=Math.min(190,Math.max(-10,t));let i=Math.round((190-t)/(200/6));i=Math.max(0,Math.min(6,i));if(RATES[i]!==P.rate) rsRate(RATES[i])};
 dl.addEventListener('pointerdown',e=>{dl.setPointerCapture(e.pointerId);pick(e);dl.onpointermove=pick});dl.addEventListener('pointerup',()=>{dl.onpointermove=null});
 $('rs').addEventListener('click',e=>{const t=e.target.closest('text[data-r]');if(t){rsRate(RATES[+t.dataset.r]);return}const b=e.target.closest('[data-k]');if(b) rsAct(b.dataset.k)});
}
function rsOpen(id){rsEnsure();RS.id=id;rsSync();$('rsSub').classList.remove('on');$('rsBd').classList.add('on');$('rs').classList.add('on');sound('soft')}
function rsClose(){$('rs').classList.remove('on');$('rsBd').classList.remove('on');if(RS.pf){clearInterval(RS.pf);RS.pf=null}}
async function rsAct(k){
 const id=RS.id,p=findPost(id),v=curVid(),it=curItem();
 if(k==='dl'){rsClose();downloadPost(id)}
 else if(k==='ni'){const h=rsHidden();if(!h.includes(id)) h.push(id);rsSet('black1_rl_hidden',h);rsClose();render();toast('سنعرض لك محتوى أقل من هذا النوع')}
 else if(k==='rp'){sub('إبلاغ','<div class="rs-p" style="white-space:normal">اختر سبب البلاغ. يُحفظ البلاغ على هذا الجهاز ويُخفى الريل عنك.</div><div class="rs-lst">'+['محتوى مزعج أو احتيالي','محتوى غير لائق','عنف أو إيذاء','انتهاك حقوق النشر','معلومات مضللة','سبب آخر'].map(x=>'<button type="button">'+x+'</button>').join('')+'</div>');
  $('rsB').onclick=e=>{const b=e.target.closest('.rs-lst button');if(!b) return;const r=rsLS('black1_rl_reports',[]);r.push({id,reason:b.textContent,time:Date.now()});rsSet('black1_rl_reports',r);const h=rsHidden();if(!h.includes(id)) h.push(id);rsSet('black1_rl_hidden',h);rsClose();render();toast('تم حفظ البلاغ وإخفاء الريل')}}
 else if(k==='pip'){ if(!v) return toast('متاح للفيديو فقط'); try{ if(document.pictureInPictureElement) await document.exitPictureInPicture(); else if(v.requestPictureInPicture) await v.requestPictureInPicture(); else if(v.webkitSetPresentationMode) v.webkitSetPresentationMode('picture-in-picture'); else throw 0; rsClose() }catch(e){toast('جهازك لا يدعم صورة داخل صورة')} }
 else if(k==='fs'){ rsClose(); try{ if(v&&v.webkitEnterFullscreen&&!v.requestFullscreen) v.webkitEnterFullscreen(); else await (v||it).requestFullscreen() }catch(e){toast('تعذّر فتح ملء الشاشة')} }
 else if(k==='sum'){ if(!p) return; const a=postAuthor(p),cap=capOf(p),tags=tagsOf(p),n=commentTotal(p),vs=v?(v.videoWidth?v.videoWidth+'×'+v.videoHeight:'—'):'صورة',du=v&&isFinite(v.duration)?fT(Math.round(v.duration)):'—',mb=((p.mediaData||'').length*.75/1048576).toFixed(1)+' MB';
  const pts=cap.split(/[.!؟?\n]+/).map(s=>s.trim()).filter(Boolean).slice(0,4),cm=(p.comments||[])[0];
  sub('ملخص الريل','<div class="rs-p" style="white-space:normal"><b>'+esc(a.name||'حساب')+'</b> · @'+esc(a.handle||'')+'<br>'+esc(p.title||cap.slice(0,90)||'بدون عنوان')+'</div><div class="rs-kv"><div>المدة<b>'+du+'</b></div><div>الدقة<b>'+vs+'</b></div><div>الحجم<b>'+mb+'</b></div><div>منذ<b>'+agoAr(p.time)+'</b></div><div>إعجابات<b>'+fmtCount(p.likes)+'</b></div><div>تعليقات<b>'+fmtCount(n)+'</b></div><div>إعادة نشر<b>'+fmtCount(p.reposts)+'</b></div><div>حفظ<b>'+fmtCount(savesOf(p))+'</b></div></div>'+
  (pts.length?'<div class="rs-p">'+pts.map(s=>'• '+esc(s)).join('\n')+'</div>':'')+(tags.length?'<div class="rs-ch">'+tags.map(t=>'<button type="button">'+esc(t)+'</button>').join('')+'</div>':'')+(cm?'<div class="rs-p">أول تعليق: '+esc((cm.text||'').slice(0,140))+'</div>':'')+'<div class="rs-p" style="color:#aeb4c2;font-size:11px">ملخص مبني على بيانات الريل الحقيقية (الوصف والوسوم والتفاعل)، وليس تفريغًا صوتيًا للفيديو.</div>')}
 else if(k==='res'){P.enh=P.enh?0:1;rsSave();rsLook();rsSync();toast(P.enh?'تم تفعيل تحسين الوضوح (شحذ + تباين)':'تم إيقاف التحسين')}
 else if(k==='voice'){P.voice=P.voice?0:1;rsSave();if(!v) toast('الصوت متاح في الفيديو فقط');else{rsVoice(v);toast(P.voice?'تم تفعيل تركيز الصوت البشري':'تم إيقاف عزل الصوت')}rsSync()}
 else if(k==='tr'){ if(!p) return; const txt=(capOf(p)||p.title||'').slice(0,480),src=/[\u0600-\u06FF]/.test(txt)?'ar':'en',L=[['en','English'],['ar','العربية'],['fr','Français'],['es','Español'],['tr','Türkçe']];
  sub('الشرح والترجمة','<div class="rs-p">'+(esc(txt)||'لا يوجد نص في هذا الريل')+'</div><div class="rs-ch">'+L.map(l=>'<button type="button" data-l="'+l[0]+'">'+l[1]+'</button>').join('')+'</div><div class="rs-p" id="rsTr">اختر لغة الترجمة</div>');
  $('rsB').onclick=async e=>{const b=e.target.closest('[data-l]');if(!b||!txt) return;$('rsB').querySelectorAll('.rs-ch button').forEach(x=>x.classList.toggle('on',x===b));const o=$('rsTr');if(b.dataset.l===src){o.textContent=txt;return}o.textContent='جارٍ الترجمة…';
   try{const r=await fetch('https://api.mymemory.translated.net/get?q='+encodeURIComponent(txt)+'&langpair='+src+'|'+b.dataset.l),j=await r.json();o.textContent=(j.responseData&&j.responseData.translatedText)||'لا توجد نتيجة'}catch(x){o.textContent='تعذّرت الترجمة — تحقق من الاتصال بالإنترنت'}}}
 else if(k==='ar'){ if(P.ar){P.ar=0;const c=$('rsCam');if(c){c.srcObject&&c.srcObject.getTracks().forEach(t=>t.stop());c.remove()}$('view-reels').classList.remove('rs-ar');rsSave();rsSync();return}
  try{const s=await navigator.mediaDevices.getUserMedia({video:{facingMode:'environment'},audio:false}),c=document.createElement('video');c.id='rsCam';c.muted=true;c.playsInline=true;c.autoplay=true;c.srcObject=s;$('view-reels').prepend(c);$('view-reels').classList.add('rs-ar');P.ar=1;rsSave();rsSync();toast(navigator.xr?'الواقع المعزز مدعوم — عرض مختلط على الكاميرا':'عرض مختلط على الكاميرا')}catch(e){toast('اسمح بالوصول إلى الكاميرا لتفعيل العرض المختلط')} }
 else if(k==='theme'){sub('واجهة مستخدم مخصصة','<div class="rs-ch">'+THEMES.map((t,i)=>'<button type="button" data-t="'+i+'" class="'+(i===P.theme?'on':'')+'" style="border-inline-start:14px solid '+t[0]+'">'+t[2]+'</button>').join('')+'</div>');
  $('rsB').onclick=e=>{const b=e.target.closest('[data-t]');if(!b) return;P.theme=+b.dataset.t;rsSave();rsLook();rsDial();$('rsB').querySelectorAll('button').forEach(x=>x.classList.toggle('on',x===b))}}
 else if(k==='cast'){ if(v&&v.remote){try{await v.remote.prompt()}catch(e){toast('لا توجد أجهزة بث متاحة')}}else toast('المتصفح لا يدعم Cast لهذا الفيديو') }
 else if(k==='air'){ if(v&&v.webkitShowPlaybackTargetPicker) v.webkitShowPlaybackTargetPicker(); else toast('AirPlay متاح في Safari فقط') }
 else if(k==='pres'){ try{await new PresentationRequest([location.href]).start()}catch(e){toast('الشاشة الثانية غير متاحة على هذا الجهاز')} }
 else if(k==='stats'){ const days=[...Array(7)].map((_,i)=>{const d=new Date(Date.now()-(6-i)*864e5).toISOString().slice(0,10);return [d,S.d[d]||0]}),mx=Math.max(1,...days.map(x=>x[1])),tot=Object.values(S.d).reduce((a,b)=>a+b,0),ids=Object.keys(S.p),top=ids.sort((a,b)=>S.p[b]-S.p[a])[0],tp=top&&findPost(top);
  sub('إحصائيات المشاهدة','<div class="rs-kv"><div>إجمالي المشاهدة<b>'+fT(tot)+'</b></div><div>اليوم<b>'+fT(S.d[days[6][0]]||0)+'</b></div><div>ريلز شاهدتها<b>'+ids.length+'</b></div><div>المتوسط لكل ريل<b>'+fT(ids.length?Math.round(tot/ids.length):0)+'</b></div></div><div class="rs-bars">'+days.map(x=>'<i style="height:'+Math.max(3,x[1]/mx*100)+'%" title="'+x[0]+'"></i>').join('')+'</div><div class="rs-p" style="color:#aeb4c2;font-size:12px">آخر 7 أيام (يُسجَّل وقت التشغيل الفعلي على هذا الجهاز).</div>'+(tp?'<div class="rs-p">الأكثر مشاهدة: '+esc(tp.title||capOf(tp).slice(0,70)||'ريل')+' — '+fT(S.p[top])+'</div>':''))}
 else if(k==='auto'){ const o=[0,5,15,30];sub('أتمتة التشغيل','<div class="rs-sw" style="padding:6px 0"><span>الانتقال للريل التالي عند انتهاء الفيديو</span><button type="button" class="rs-tg '+(P.next?'on':'')+'" data-k="next" style="border:0"></button></div><div class="rs-h" style="font-size:14px">مؤقت إيقاف التشغيل</div><div class="rs-ch">'+o.map(m=>'<button type="button" data-s="'+m+'" class="'+(m===P.sleep?'on':'')+'">'+(m?m+' دقيقة':'بدون')+'</button>').join('')+'</div><div class="rs-p" style="color:#aeb4c2;font-size:12px">عند تفعيل الانتقال التلقائي يتوقف تكرار الفيديو.</div>');
  $('rsB').onclick=e=>{const s=e.target.closest('[data-s]');if(!s) return;P.sleep=+s.dataset.s;rsSave();clearTimeout(RS.st);if(P.sleep) RS.st=setTimeout(()=>{document.querySelectorAll('#rlScroll video').forEach(x=>x.pause());toast('انتهى مؤقت إيقاف التشغيل')},P.sleep*60000);$('rsB').querySelectorAll('[data-s]').forEach(x=>x.classList.toggle('on',x===s))}}
 else if(k==='next'){P.next=P.next?0:1;rsSave();document.querySelectorAll('#rlScroll video').forEach(x=>x.loop=!P.next);rsSync();const t=$('rsB').querySelector('.rs-tg');if(t) t.classList.toggle('on',!!P.next);toast(P.next?'التمرير التلقائي مفعّل':'التمرير التلقائي متوقف')}
 else if(k==='ges'){sub('التحكم بالإيماءات','<div class="rs-sw" style="padding:10px 0"><span>اسحب يمينًا/يسارًا للتقديم والتأخير 5 ثوانٍ</span><button type="button" class="rs-tg '+(P.swipe?'on':'')+'" data-g="swipe" style="border:0"></button></div><div class="rs-sw" style="padding:10px 0"><span>اضغط مطولًا للتشغيل بسرعة ×2</span><button type="button" class="rs-tg '+(P.hold?'on':'')+'" data-g="hold" style="border:0"></button></div><div class="rs-p" style="color:#aeb4c2;font-size:12px">النقر المزدوج للإعجاب والنقر للإيقاف يعملان دائمًا.</div>');
  $('rsB').onclick=e=>{const g=e.target.closest('[data-g]');if(!g) return;P[g.dataset.g]=P[g.dataset.g]?0:1;rsSave();g.classList.toggle('on',!!P[g.dataset.g])}}
 else if(k==='perf'){ const up=()=>{const x=curVid();if(!x){$('rsPf').innerHTML='<div class="rs-p">الريل الحالي صورة — لا يوجد بث فيديو.</div>';return}const q=x.getVideoPlaybackQuality?x.getVideoPlaybackQuality():{},b=x.buffered&&x.buffered.length?x.buffered.end(x.buffered.length-1):0,c=navigator.connection||{},kb=isFinite(x.duration)&&x.duration?Math.round(((p.mediaData||'').length*.75*8/1000)/x.duration):0;
   $('rsPf').innerHTML='<div class="rs-kv"><div>الدقة<b>'+(x.videoWidth?x.videoWidth+'×'+x.videoHeight:'—')+'</b></div><div>معدل البت التقريبي<b>'+kb+' kbps</b></div><div>المخزَّن مؤقتًا<b>'+(isFinite(x.duration)&&x.duration?Math.round(b/x.duration*100):0)+'%</b></div><div>الإطارات المفقودة<b>'+(q.droppedVideoFrames||0)+'/'+(q.totalVideoFrames||0)+'</b></div><div>سرعة التشغيل<b>×'+x.playbackRate+'</b></div><div>الشبكة<b>'+(c.effectiveType||'—')+(c.downlink?' · '+c.downlink+'Mb/s':'')+'</b></div></div>'};
  sub('تتبع أداء البث','<div id="rsPf"></div>',up);RS.pf=setInterval(up,1000)}
}
/* gestures: horizontal swipe = seek ±5s, long-press = 2× */
(function(){const sc=$('rlScroll');let g=null,sup=0;
 sc.addEventListener('pointerdown',e=>{if(!e.target.closest('[data-hit]')) return;g={x:e.clientX,y:e.clientY,h:0,v:curVid()};if(P.hold&&g.v) g.t=setTimeout(()=>{g.h=1;g.v.playbackRate=2;toast('×2')},450)});
 const end=e=>{if(!g) return;clearTimeout(g.t);const dx=e.clientX-g.x,dy=e.clientY-g.y;if(g.h){g.v.playbackRate=P.rate;sup=Date.now()}else if(P.swipe&&g.v&&Math.abs(dx)>50&&Math.abs(dx)>Math.abs(dy)*1.6){g.v.currentTime=Math.max(0,g.v.currentTime+(dx>0?5:-5));toast(dx>0?'+5ث':'−5ث');sup=Date.now()}g=null};
 sc.addEventListener('pointerup',end);sc.addEventListener('pointercancel',()=>{if(g){clearTimeout(g.t);if(g.h&&g.v) g.v.playbackRate=P.rate;g=null}});
 sc.addEventListener('click',e=>{if(Date.now()-sup<350){e.stopPropagation();e.preventDefault()}},true)})();
rsLook();

window.rlOpenFromProfile=function(id,ids){
  RL.pending={mode:'profile',id:id,ids:ids||null}; RL.q=''; const si=$('rlSearchInput'); if(si) si.value=''; const v=$('view-reels'); if(v) v.classList.remove('srch');
  const i=barIndex('ريلز');
  if(i>=0&&window.setArcActive) window.setArcActive(i); else go('reels');
};
const baseDel=window.deletePost;
window.deletePost=function(id){
  baseDel.apply(this,arguments);
  if(document.body.classList.contains('rl-on')) render(true);
};
const baseGo=window.go;
window.go=function(name){
  baseGo.apply(this,arguments);
  const on=name==='reels';
  document.body.classList.toggle('rl-on',on);
  if(on){
    if(RL.pending){ RL.mode=RL.pending.mode; RL.startId=RL.pending.id; RL.ids=RL.pending.ids; RL.pending=null; }
    else{ RL.mode=null; RL.startId=null; }
    $('view-reels').classList.toggle('prof',RL.mode==='profile');
    init(); render();
  }
  else{ stopAll(); closeCm(); }
};
})();

/* ============================================================
   EXPLORE → in-app browser
   - address bar accepts a link or search words
   - links open inside the app (sites that forbid embedding get an "open in new tab" button)
   - searches show real Wikipedia results + one-tap Google / Bing / DuckDuckGo / YouTube
   ============================================================ */
(function(){
const $=id=>document.getElementById(id);
const BR={stack:[],idx:-1,tok:0,noteTimer:null,mode:localStorage.getItem('b1-explore-mode')==='onion'?'onion':'web'};
const I={
  search:'<svg viewBox="0 0 24 24"><circle cx="11" cy="11" r="7"/><path d="m20 20-4-4"/></svg>',
  clock:'<svg viewBox="0 0 24 24"><circle cx="12" cy="12" r="9"/><path d="M12 7v5l3 2"/></svg>',
  ext:'<svg viewBox="0 0 24 24"><path d="M14 4h6v6M20 4l-9 9M18 14v4a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h4"/></svg>',
  lock:'<svg viewBox="0 0 24 24"><rect x="5" y="11" width="14" height="9" rx="2"/><path d="M8 11V8a4 4 0 0 1 8 0v3"/></svg>',
  globe:'<svg viewBox="0 0 24 24"><circle cx="12" cy="12" r="9"/><path d="M3 12h18M12 3c3 3.2 3 14.8 0 18M12 3c-3 3.2-3 14.8 0 18"/></svg>'
};
const TILES=[
  {n:'Google',u:'https://www.google.com/',c:'#4285f4',ext:1},
  {n:'YouTube',u:'https://www.youtube.com/',c:'#ff2a2a',ext:1},
  {n:'ويكيبيديا',u:'https://ar.wikipedia.org/',c:'#6b7280',l:'W'},
  {n:'Gmail',u:'https://mail.google.com/',c:'#ea4335',ext:1},
  {n:'Maps',u:'https://maps.google.com/',c:'#34a853',ext:1},
  {n:'X',u:'https://x.com/',c:'#111',ext:1},
  {n:'Instagram',u:'https://www.instagram.com/',c:'#c13584',ext:1},
  {n:'TikTok',u:'https://www.tiktok.com/',c:'#0f0f13',ext:1}
];
const ENG=[
  {n:'Google',f:q=>'https://www.google.com/search?q='+encodeURIComponent(q)},
  {n:'Bing',f:q=>'https://www.bing.com/search?q='+encodeURIComponent(q)},
  {n:'DuckDuckGo',f:q=>'https://duckduckgo.com/?q='+encodeURIComponent(q)},
  {n:'Brave',f:q=>'https://search.brave.com/search?q='+encodeURIComponent(q)},
  {n:'Startpage',f:q=>'https://www.startpage.com/sp/search?query='+encodeURIComponent(q)},
  {n:'Ecosia',f:q=>'https://www.ecosia.org/search?q='+encodeURIComponent(q)},
  {n:'YouTube',f:q=>'https://www.youtube.com/results?search_query='+encodeURIComponent(q)},
  {n:'صور Google',f:q=>'https://www.google.com/search?tbm=isch&q='+encodeURIComponent(q)}
];
function bdata(){ DATA.browser=DATA.browser||{}; DATA.browser.recent=Array.isArray(DATA.browser.recent)?DATA.browser.recent:[]; return DATA.browser; }
function onionHost(raw){
  try{
    const u=new URL(/^https?:\/\//i.test(raw)?raw:'http://'+raw);
    return u.hostname.toLowerCase().endsWith('.onion') || u.hostname.toLowerCase()==='.onion';
  }catch(e){ return false; }
}
function onionMeta(raw){
  const cleaned=String(raw||'').trim().replace(/^https?:\/\//i,'').replace(/\/+$/,'');
  const host=cleaned.split(/[\/?#]/)[0].toLowerCase();
  const label=host.endsWith('.onion')?host.slice(0,-6):host;
  const version=label.length===56?'v3':(label.length===16?'v2/legacy':'unknown');
  const charsOk=/^[a-z2-7]+$/i.test(label);
  return {cleaned,host,label,version,charsOk,validOnion:label.length===56&&charsOk};
}
function parse(raw){
  const t=String(raw||'').trim(); if(!t) return null;
  if(/^https?:\/\/\S+$/i.test(t)) return {type:onionHost(t)?'onion':'url',val:t};
  if(!/\s/.test(t) && (/^(www\.)?[\p{L}\p{N}-]+(\.[\p{L}\p{N}-]+)+(:\d+)?([\/?#]\S*)?$/u.test(t) || /^localhost(:\d+)?([\/?#]\S*)?$/i.test(t))){
    const normalized='https://'+t.replace(/^\/+/,'');
    return {type:onionHost(normalized)?'onion':'url',val:normalized};
  }
  return {type:(BR.mode==='onion' || /\.onion(?:[\/:?#]|$)/i.test(t))?'onionSearch':'search',val:t};
}
function hide(){ ['brHome','brRes'].forEach(i=>$(i).classList.remove('show')); $('brFrame').classList.remove('show'); }
function setProg(p){ const b=$('brProg').firstElementChild; b.style.transition=p===0?'none':'width .3s'; b.style.width=p+'%'; }
function showNote(on){ $('brNote').classList.toggle('show',!!on); }
function syncBar(e){
  const inp=$('brIn'); 
  inp.value=e?(e.type==='home'?'':e.val):'';
  $('brPill').classList.toggle('has',!!inp.value);
  const ic=$('brPillIc'); ic.outerHTML=(e&&e.type==='url'&&/^https:/i.test(e.val)?I.lock:(e&&e.type==='url'?I.globe:I.search)).replace('<svg','<svg id="brPillIc"');
  $('brBack').disabled=BR.idx<=0; $('brFwd').disabled=BR.idx>=BR.stack.length-1;
}
function go(e,push){
  if(push!==false){ BR.stack=BR.stack.slice(0,BR.idx+1); BR.stack.push(e); BR.idx=BR.stack.length-1; }
  show(e);
}
function show(e){
  const tok=++BR.tok; hide(); showNote(false); clearTimeout(BR.noteTimer); syncBar(e); setProg(0);
  if(e.type==='home'){ $('brFrame').removeAttribute('src'); renderHome(); $('brHome').classList.add('show'); $('brHome').scrollTop=0; return; }
  if(e.type==='search'){ $('brFrame').removeAttribute('src'); renderResults(e.val,tok,false); $('brRes').classList.add('show'); $('brRes').scrollTop=0; return; }
  if(e.type==='onionSearch'){ $('brFrame').removeAttribute('src'); renderResults(e.val,tok,true); $('brRes').classList.add('show'); $('brRes').scrollTop=0; return; }
  if(e.type==='onion'){ $('brFrame').removeAttribute('src'); renderOnion(e.val); $('brRes').classList.add('show'); $('brRes').scrollTop=0; return; }
  // url
  const f=$('brFrame'); f.classList.add('show'); setProg(12);
  let w=12; clearInterval(BR.pt); BR.pt=setInterval(()=>{ w=Math.min(88,w+(90-w)*.12); setProg(w); },250);
  f.onload=()=>{ if(tok!==BR.tok) return; clearInterval(BR.pt); setProg(100); setTimeout(()=>setProg(0),350); BR.noteTimer=setTimeout(()=>{ if(tok===BR.tok) showNote(true); },700); };
  f.src=e.val;
}
function renderHome(){
  const rec=bdata().recent;
  $('brHome').innerHTML=`
    <div class="br-hero"><h1>استكشف</h1><p>بحث ويب عام + فحص عناوين Onion</p></div>
    <div class="br-mode" role="tablist" aria-label="نوع البحث">
      <button type="button" class="${BR.mode==='web'?'sel':''}" data-mode="web">ويب كامل</button>
      <button type="button" class="${BR.mode==='onion'?'sel':''}" data-mode="onion">Onion / Dark Web</button>
    </div>
    <div class="br-bigsearch" id="brBig">${I.search}<span>${BR.mode==='onion'?'ابحث عن اسم أو رابط Onion…':'ابحث عن أي شيء أو اكتب رابطًا'}</span></div>
    <div class="br-sec"><span>عمليات البحث الأخيرة</span>${rec.length?'<button type="button" id="brClr">مسح</button>':''}</div>
    <div class="br-rec">${rec.length?rec.map((r,i)=>`<button class="br-ri" data-r="${i}" type="button">${I.clock}<span>${escapeHtml(r)}</span></button>`).join(''):'<div class="br-empty">لا توجد عمليات بحث بعد</div>'}</div>`;
}
function onionSearchLinks(q){
  const qq='site:.onion '+q;
  return [
    {n:'Google',u:'https://www.google.com/search?q='+encodeURIComponent(qq)},
    {n:'Bing',u:'https://www.bing.com/search?q='+encodeURIComponent(qq)},
    {n:'DuckDuckGo',u:'https://duckduckgo.com/?q='+encodeURIComponent(qq)},
    {n:'Brave',u:'https://search.brave.com/search?q='+encodeURIComponent(qq)}
  ];
}
function renderOnion(raw){
  const m=onionMeta(raw);
  const safe=escapeHtml(m.host||raw);
  const links=onionSearchLinks(m.host||raw);
  $('brRes').innerHTML=`
    <div class="br-onion-head">
      <span class="br-onion-badge">ONION</span>
      <div><b>وضع Onion / Dark Web</b><small>بحث وفحص عنوان فقط — لا يتم فتح شبكة Tor داخل الصفحة.</small></div>
    </div>
    <div class="br-onion-card">
      <div class="br-onion-url">${safe}</div>
      <div class="br-onion-grid">
        <div><span>الإصدار</span><b>${m.version==='v3'?'v3 Onion':m.version==='v2/legacy'?'v2 / Legacy':'غير معروف'}</b></div>
        <div><span>الصيغة</span><b>${m.validOnion?'صالحة مبدئيًا':'غير مكتملة'}</b></div>
      </div>
      <div class="br-onion-actions">
        <button type="button" id="brCopyOnion">نسخ العنوان</button>
        <button type="button" id="brSearchOnion">البحث عن العنوان</button>
      </div>
      <div class="br-msg">لا أفتح عناوين Onion مباشرة من داخل Black 1. يمكنك استخدام البحث العام للعثور على الصفحات التي تذكر العنوان.</div>
    </div>
    <div class="br-sec"><span>محركات بحث للعنوان</span></div>
    <div class="br-eng br-eng-onion">${links.map(x=>`<a href="${x.u}" target="_blank" rel="noopener noreferrer">${escapeHtml(x.n)}${I.ext}</a>`).join('')}</div>`;
  const c=$('brCopyOnion');
  if(c)c.onclick=async()=>{try{await navigator.clipboard.writeText(m.cleaned);toast('تم نسخ عنوان Onion 📋')}catch(e){toast('تعذر النسخ')}};
  const q=$('brSearchOnion');
  if(q)q.onclick=()=>submit(m.host||raw.replace(/^https?:\/\//i,''));
}
function hl(t){ return String(t||'').replace(/<span class="searchmatch">/g,'\u0001').replace(/<\/span>/g,'\u0002').replace(/<[^>]+>/g,''); }
function snip(t){ return escapeHtml(hl(t)).replace(/\u0001/g,'<b>').replace(/\u0002/g,'</b>'); }
async function renderResults(q,tok,isOnion=false){
  const res=$('brRes');
  const baseQ=isOnion ? 'site:.onion '+q : q;
  const engines=(isOnion?ENG.filter(e=>['Google','Bing','DuckDuckGo','Brave'].includes(e.n)):ENG);
  const eng=`<div class="br-eng">${engines.map(e=>`<a href="${e.f(baseQ)}" target="_blank" rel="noopener noreferrer">${escapeHtml(e.n)}${I.ext}</a>`).join('')}</div>`;
  res.innerHTML=(isOnion?`<div class="br-onion-head"><span class="br-onion-badge">ONION SEARCH</span><div><b>بحث عن «${escapeHtml(q)}»</b><small>النتائج من محركات ويب عادية تبحث عن صفحات مفهرسة تشير إلى نطاقات Onion.</small></div></div>`:'')+eng+'<div class="br-spin"></div>';
  const lang=/[\u0600-\u06FF]/.test(q)?'ar':'en';
  try{
    const ctl=new AbortController(); const to=setTimeout(()=>ctl.abort(),12000);
    const r=await fetch(`https://${lang}.wikipedia.org/w/api.php?action=query&list=search&srsearch=${encodeURIComponent(q)}&srlimit=12&format=json&origin=*`,{signal:ctl.signal});
    clearTimeout(to);
    const j=await r.json(); if(tok!==BR.tok) return;
    const items=(j&&j.query&&j.query.search)||[];
    if(!items.length){ res.innerHTML=(isOnion?`<div class="br-onion-head"><span class="br-onion-badge">ONION SEARCH</span><div><b>لا توجد نتائج مفهرسة في ويكيبيديا</b><small>استخدم أحد المحركات بالأعلى لبحث نطاقات Onion.</small></div></div>`:'')+eng+`<div class="br-msg">لا توجد نتائج في ويكيبيديا لـ «${escapeHtml(q)}».<br>استخدم أحد محركات البحث بالأعلى لعرض نتائج الويب أو صفحات Onion المفهرسة.</div>`; return; }
    res.innerHTML=(isOnion?`<div class="br-onion-head"><span class="br-onion-badge">ONION SEARCH</span><div><b>نتائج عامة</b><small>قد تظهر فقط الصفحات التي فهرستها محركات البحث العادية.</small></div></div>`:'')+eng+`<div class="br-src">نتائج من ${lang==='ar'?'ويكيبيديا العربية':'Wikipedia'} — وللويب الكامل اختر محرك بحث من الأعلى</div>`+items.map(it=>{
      const url=`https://${lang}.wikipedia.org/wiki/${encodeURIComponent(it.title.replace(/ /g,'_'))}`;
      return `<button class="br-r" type="button" data-u="${escapeHtml(url)}"><div class="u">${escapeHtml((()=>{try{return decodeURI(url)}catch(x){return url}})().replace(/^https:\/\//,''))}</div><div class="t">${escapeHtml(it.title)}</div><div class="d">${snip(it.snippet)}…</div></button>`;
    }).join('');
  }catch(err){
    if(tok!==BR.tok) return;
    res.innerHTML=(isOnion?`<div class="br-onion-head"><span class="br-onion-badge">ONION SEARCH</span><div><b>تعذر تحميل النتائج الداخلية</b><small>استخدم محرك بحث خارجي لصفحات Onion المفهرسة.</small></div></div>`:'')+eng+'<div class="br-msg">تعذّر تحميل النتائج الآن. تأكد من الاتصال بالإنترنت أو افتح أحد محركات البحث بالأعلى.</div>';
  }
}
function submit(raw){
  const e=parse(raw); if(!e) return;
  if(e.type==='search' || e.type==='onionSearch'){
    const d=bdata(); d.recent=[e.val].concat(d.recent.filter(x=>x!==e.val)).slice(0,12); saveData();
  }
  sound('soft'); go(e,true); const i=$('brIn'); if(i) i.blur();
}
function curUrl(){ const e=BR.stack[BR.idx]; if(!e) return ''; if(e.type==='url') return e.val; if(e.type==='search') return ENG[0].f(e.val); if(e.type==='onionSearch') return ENG[0].f('site:.onion '+e.val); return ''; }
function build(){
  const v=$('view-explore'); if(!v||v.dataset.br) return; v.dataset.br='1';
  const old=document.createElement('div'); old.id='exOld'; old.style.display='none';
  while(v.firstChild) old.appendChild(v.firstChild);
  v.classList.add('br');
  v.innerHTML=`<div class="br-wrap">
    <div class="br-bar">
      <button class="br-nb" id="brBack" type="button" aria-label="رجوع" disabled><svg viewBox="0 0 24 24"><path d="m15 5-7 7 7 7"/></svg></button>
      <button class="br-nb" id="brFwd" type="button" aria-label="للأمام" disabled><svg viewBox="0 0 24 24"><path d="m9 5 7 7-7 7"/></svg></button>
      <div class="br-pill" id="brPill">${I.search.replace('<svg','<svg id="brPillIc"')}<input id="brIn" type="text" inputmode="url" enterkeyhint="go" autocapitalize="off" autocomplete="off" autocorrect="off" spellcheck="false" placeholder="ابحث أو اكتب رابطًا"><button class="x" id="brX" type="button" aria-label="مسح"><svg viewBox="0 0 24 24"><path d="M6 6l12 12M18 6 6 18"/></svg></button></div>
      <button class="br-nb" id="brReload" type="button" aria-label="تحديث"><svg viewBox="0 0 24 24"><path d="M20 11a8 8 0 1 0 2 5"/><path d="M20 4v7h-7"/></svg></button>
      <button class="br-nb" id="brHomeBtn" type="button" aria-label="الرئيسية"><svg viewBox="0 0 24 24"><path d="M3 11.5 12 4l9 7.5"/><path d="M5.5 10v9a1 1 0 0 0 1 1H10v-5.5a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1V20h3.5a1 1 0 0 0 1-1v-9"/></svg></button>
    </div>
    <div class="br-prog" id="brProg"><i></i></div>
    <div class="br-note" id="brNote"><span>لا يظهر الموقع؟ بعض المواقع تمنع عرضها داخل التطبيق.</span><button id="brOpenExt" type="button">فتح في نافذة جديدة</button><button class="nx" id="brNoteX" type="button" aria-label="إغلاق">✕</button></div>
    <div class="br-body">
      <div class="br-page" id="brHome"></div>
      <div class="br-page" id="brRes"></div>
      <iframe class="br-frame" id="brFrame" title="المتصفح" referrerpolicy="no-referrer" allow="fullscreen; clipboard-write" sandbox="allow-scripts allow-same-origin allow-forms allow-popups allow-popups-to-escape-sandbox allow-presentation allow-downloads"></iframe>
    </div>
  </div>`;
  v.appendChild(old);
  const inp=$('brIn');
  inp.addEventListener('keydown',e=>{ if(e.key==='Enter'){ e.preventDefault(); submit(inp.value); } });
  inp.addEventListener('input',()=>{
    $('brPill').classList.toggle('has',!!inp.value);
    const modeOnion=/\.onion(?:[\/:?#]|$)/i.test(inp.value) || BR.mode==='onion';
    $('brPill').title=modeOnion?'وضع Onion / Dark Web':'بحث ويب';
  });
  inp.addEventListener('focus',()=>setTimeout(()=>{ try{inp.select();}catch(x){} },30));
  $('brX').onclick=()=>{ inp.value=''; $('brPill').classList.remove('has'); inp.focus(); };
  $('brBack').onclick=()=>{ if(BR.idx>0){ BR.idx--; show(BR.stack[BR.idx]); } };
  $('brFwd').onclick=()=>{ if(BR.idx<BR.stack.length-1){ BR.idx++; show(BR.stack[BR.idx]); } };
  $('brReload').onclick=()=>{ if(BR.idx>=0){ sound('soft'); show(BR.stack[BR.idx]); } };
  $('brHomeBtn').onclick=()=>{ sound('soft'); go({type:'home'},true); };
  $('brNoteX').onclick=()=>showNote(false);
  $('brOpenExt').onclick=()=>{ const u=curUrl(); if(u) window.open(u,'_blank','noopener'); };
  $('brHome').addEventListener('click',e=>{
    const mode=e.target.closest('[data-mode]');
    if(mode){
      BR.mode=mode.dataset.mode==='onion'?'onion':'web';
      localStorage.setItem('b1-explore-mode',BR.mode);
      renderHome(); sound('soft'); return;
    }
    if(e.target.closest('#brBig')){ inp.focus(); return; }
    if(e.target.closest('#brClr')){ bdata().recent=[]; saveData(); renderHome(); return; }
    const t=e.target.closest('[data-t]');
    if(t){ const x=TILES[+t.dataset.t]; if(x.ext){ window.open(x.u,'_blank','noopener'); } else { go({type:'url',val:x.u},true); } return; }
    const r=e.target.closest('[data-r]');
    if(r){ submit(bdata().recent[+r.dataset.r]); }
  });
  $('brRes').addEventListener('click',e=>{
    const r=e.target.closest('[data-u]'); if(r){ go({type:'url',val:r.dataset.u},true); }
  });
  go({type:'home'},true);
}
build();
})();
