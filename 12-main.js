/* ===== VN: voice notes (real mic recording, real waveform) + image lightbox ===== */
(function(){
const PL='<svg class="pl" viewBox="0 0 24 24"><path d="M7 4.6v14.8a.8.8 0 0 0 1.2.7l12-7.4a.8.8 0 0 0 0-1.4L8.2 3.9A.8.8 0 0 0 7 4.6Z"/></svg><svg class="pa" viewBox="0 0 24 24"><rect x="6" y="4.5" width="4.2" height="15" rx="1.3"/><rect x="13.8" y="4.5" width="4.2" height="15" rx="1.3"/></svg>';
const MAXS=90, BARS=36;
const VN={reg:{},aud:null,curEl:null,active:null};
const fmt=t=>{ t=Math.max(0,Math.round(t||0)); return Math.floor(t/60)+':'+String(t%60).padStart(2,'0'); };
const say=m=>{ try{ toast(m); }catch(e){} };
VN.supported=()=>!!(navigator.mediaDevices&&navigator.mediaDevices.getUserMedia&&window.MediaRecorder);
VN.html=function(c){
  VN.reg[c.id]=c.voice;
  const w=(Array.isArray(c.wave)&&c.wave.length)?c.wave:new Array(BARS).fill(30);
  return '<div class="vn" data-vid="'+c.id+'" data-dur="'+(c.vdur||0)+'"><button type="button" class="vn-p" data-vn="play" aria-label="تشغيل">'+PL+'</button><div class="vn-w" data-vn="seek">'+w.map(v=>'<i style="height:'+Math.max(14,Math.min(100,v))+'%"></i>').join('')+'</div><span class="vn-t">'+fmt(c.vdur)+'</span></div>';
};
function stopPlay(){
  if(VN.aud){ try{ VN.aud.pause(); }catch(e){} }
  if(VN.curEl){ VN.curEl.classList.remove('playing'); VN.curEl.querySelectorAll('.vn-w i.on').forEach(i=>i.classList.remove('on')); const t=VN.curEl.querySelector('.vn-t'); if(t) t.textContent=fmt(+VN.curEl.dataset.dur); }
  VN.aud=null; VN.curEl=null;
}
function paint(el,p){
  const bars=el.querySelectorAll('.vn-w i'), n=Math.round(p*bars.length);
  bars.forEach((b,i)=>b.classList.toggle('on',i<n));
}
VN.toggle=function(el,seekP){
  if(VN.curEl===el&&VN.aud&&seekP==null){ if(VN.aud.paused){ VN.aud.play().catch(()=>{}); el.classList.add('playing'); } else { VN.aud.pause(); el.classList.remove('playing'); } return; }
  const src=VN.reg[el.dataset.vid]; if(!src) return;
  if(VN.curEl!==el){
    stopPlay();
    const a=new Audio(src); VN.aud=a; VN.curEl=el;
    a.ontimeupdate=()=>{ const d=a.duration&&isFinite(a.duration)?a.duration:(+el.dataset.dur||1); paint(el,a.currentTime/d); const t=el.querySelector('.vn-t'); if(t) t.textContent=fmt(a.currentTime); };
    a.onended=()=>stopPlay();
    a.onerror=()=>{ stopPlay(); say('تعذّر تشغيل المقطع الصوتي'); };
  }
  const a=VN.aud;
  if(seekP!=null){ const d=(a.duration&&isFinite(a.duration))?a.duration:(+el.dataset.dur||0); if(d) try{ a.currentTime=d*seekP; }catch(e){} }
  a.play().then(()=>el.classList.add('playing')).catch(()=>say('تعذّر تشغيل المقطع الصوتي'));
};
document.addEventListener('click',e=>{
  const z=e.target.closest&&e.target.closest('img.cm-zoom');
  if(z){ e.stopPropagation(); const lb=document.createElement('div'); lb.className='vn-lb'; lb.innerHTML='<img alt="">'; lb.firstChild.src=z.src; lb.onclick=()=>lb.remove(); document.body.appendChild(lb); return; }
  const b=e.target.closest&&e.target.closest('[data-vn]'); if(!b) return;
  const el=b.closest('.vn'); if(!el) return;
  e.stopPropagation();
  if(b.dataset.vn==='seek'){ const r=b.getBoundingClientRect(); VN.toggle(el,Math.min(1,Math.max(0,(e.clientX-r.left)/r.width))); }
  else VN.toggle(el);
},true);

/* ----- recording ----- */
VN.cancelAll=function(){ if(VN.active) VN.active.cancel(); stopPlay(); };
VN.mount=function(bar,micBtn,onSend){
  if(!bar||!micBtn) return;
  const ui=document.createElement('div'); ui.className='vn-rec';
  ui.innerHTML='<button type="button" class="rx" aria-label="إلغاء"><svg viewBox="0 0 24 24"><path d="M4 7h16M9 7V4.5h6V7M6.5 7l1 13h9l1-13M10 11v5M14 11v5"/></svg></button><div class="rl"><span class="dot"></span><span class="tm">0:00</span><div class="lv"></div></div><button type="button" class="rs" aria-label="إرسال"><svg viewBox="0 0 24 24" style="transform:scaleX(-1)"><path d="M22 2 11 13"/><path d="M22 2 15 22l-4-9-9-4z"/></svg></button>';
  bar.appendChild(ui);
  const tm=ui.querySelector('.tm'), lv=ui.querySelector('.lv');
  const S={stream:null,rec:null,chunks:[],t0:0,iv:0,peaks:[],ctx:null,an:null,buf:null,live:false,mime:''};
  const clean=()=>{
    clearInterval(S.iv); S.iv=0;
    try{ if(S.stream) S.stream.getTracks().forEach(t=>t.stop()); }catch(e){}
    try{ if(S.ctx) S.ctx.close(); }catch(e){}
    S.stream=null; S.ctx=null; S.an=null; S.live=false; S.rec=null;
    bar.classList.remove('vn-recording'); micBtn.classList.remove('rec'); lv.innerHTML=''; tm.textContent='0:00';
    if(VN.active===api) VN.active=null;
  };
  const api={
    cancel(){ if(S.rec){ S.rec.onstop=null; try{ if(S.rec.state!=='inactive') S.rec.stop(); }catch(e){} } S.chunks=[]; clean(); },
    async finish(){
      if(!S.rec) return;
      const dur=(Date.now()-S.t0)/1000;
      const rec=S.rec, mime=S.mime||rec.mimeType||'audio/webm', peaks=S.peaks.slice();
      const blob=await new Promise(res=>{ rec.onstop=()=>res(new Blob(S.chunks,{type:mime})); try{ rec.stop(); }catch(e){ res(null); } });
      clean();
      if(!blob||dur<.7||blob.size<500){ say('التسجيل قصير جدًا'); return; }
      const data=await new Promise(ok=>{ const r=new FileReader(); r.onload=()=>ok(r.result); r.onerror=()=>ok(''); r.readAsDataURL(blob); });
      if(!data){ say('تعذّر حفظ التسجيل'); return; }
      const wave=[]; const n=BARS, per=Math.max(1,peaks.length/n);
      for(let i=0;i<n;i++){ let m=0; const a=Math.floor(i*per), b=Math.max(a+1,Math.floor((i+1)*per)); for(let j=a;j<b&&j<peaks.length;j++) m=Math.max(m,peaks[j]); wave.push(m); }
      const mx=Math.max(.05,...wave);
      onSend({data,dur:Math.round(dur),wave:wave.map(v=>Math.round(Math.max(.12,v/mx)*100))});
    }
  };
  micBtn.addEventListener('click',async e=>{
    e.preventDefault(); e.stopPropagation();
    if(S.rec){ api.finish(); return; }
    if(!VN.supported()){ say('المتصفح لا يدعم التسجيل الصوتي'); return; }
    if(VN.active) VN.active.cancel();
    try{ S.stream=await navigator.mediaDevices.getUserMedia({audio:true}); }
    catch(x){ say('اسمح بالوصول إلى الميكروفون لتسجيل صوتي'); return; }
    const mt=['audio/webm;codecs=opus','audio/mp4','audio/webm','audio/ogg;codecs=opus'].find(m=>window.MediaRecorder.isTypeSupported&&MediaRecorder.isTypeSupported(m))||'';
    try{ S.rec=new MediaRecorder(S.stream,mt?{mimeType:mt,audioBitsPerSecond:24000}:{audioBitsPerSecond:24000}); }
    catch(x){ try{ S.rec=new MediaRecorder(S.stream); }catch(y){ clean(); say('تعذّر بدء التسجيل'); return; } }
    S.mime=mt||S.rec.mimeType; S.chunks=[]; S.peaks=[];
    S.rec.ondataavailable=ev=>{ if(ev.data&&ev.data.size) S.chunks.push(ev.data); };
    try{
      const AC=window.AudioContext||window.webkitAudioContext;
      S.ctx=new AC(); const src=S.ctx.createMediaStreamSource(S.stream); S.an=S.ctx.createAnalyser(); S.an.fftSize=256; src.connect(S.an); S.buf=new Uint8Array(S.an.fftSize);
    }catch(x){ S.an=null; }
    S.rec.start(250); S.t0=Date.now(); S.live=true; VN.active=api;
    bar.classList.add('vn-recording'); micBtn.classList.add('rec');
    S.iv=setInterval(()=>{
      const el=(Date.now()-S.t0)/1000; tm.textContent=fmt(el);
      let pk=0; if(S.an){ S.an.getByteTimeDomainData(S.buf); for(let i=0;i<S.buf.length;i++){ pk=Math.max(pk,Math.abs(S.buf[i]-128)/128); } }
      S.peaks.push(pk);
      const i=document.createElement('i'); i.style.height=Math.max(12,Math.min(100,pk*220))+'%'; lv.appendChild(i);
      while(lv.children.length>40) lv.removeChild(lv.firstChild);
      if(el>=MAXS){ api.finish(); }
    },100);
  });
  ui.querySelector('.rx').onclick=e=>{ e.stopPropagation(); api.cancel(); };
  ui.querySelector('.rs').onclick=e=>{ e.stopPropagation(); api.finish(); };
};
window.VN=VN;
})();
