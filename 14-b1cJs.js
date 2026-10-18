(function(){
const IC={
spk:'<svg viewBox="0 0 24 24"><path d="M4 9.5v5h3.6l4.6 4V5.5l-4.6 4z" fill="currentColor"/><path d="M15.6 9a4.2 4.2 0 0 1 0 6M18.2 6.4a8 8 0 0 1 0 11.2" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round"/></svg>',
ft:'<svg viewBox="0 0 24 24"><rect x="2.5" y="6.5" width="13" height="11" rx="3" fill="currentColor"/><path d="m16.5 11 5-3v8l-5-3z" fill="currentColor"/></svg>',
mu:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.9" stroke-linecap="round" stroke-linejoin="round"><rect x="9" y="3" width="6" height="11" rx="3" fill="currentColor" stroke="none"/><path d="M5.5 11.5a6.5 6.5 0 0 0 13 0M12 18v3"/><path d="M4 4l16 16" stroke-width="2.2"/></svg>',
more:'<svg viewBox="0 0 24 24" fill="currentColor"><circle cx="5" cy="12" r="1.9"/><circle cx="12" cy="12" r="1.9"/><circle cx="19" cy="12" r="1.9"/></svg>',
end:'<svg viewBox="0 0 24 24" fill="currentColor"><path d="M12 9c-1.6 0-3.15.25-4.6.72v3.1c0 .39-.23.74-.56.9-.98.49-1.87 1.12-2.66 1.85-.18.18-.43.28-.7.28-.28 0-.53-.11-.71-.29L.29 13.08a.96.96 0 0 1-.29-.7c0-.28.11-.53.29-.71C3.34 8.78 7.46 7 12 7s8.66 1.78 11.71 4.67c.18.18.29.43.29.71 0 .28-.11.53-.29.71l-2.48 2.48c-.18.18-.43.29-.71.29-.27 0-.52-.11-.7-.28a11.3 11.3 0 0 0-2.67-1.85.99.99 0 0 1-.56-.9v-3.1C15.15 9.25 13.6 9 12 9z"/></svg>',
acc:'<svg viewBox="0 0 24 24" fill="currentColor"><path d="M6.62 10.79c1.44 2.83 3.76 5.14 6.59 6.59l2.2-2.2c.27-.27.67-.36 1.02-.24 1.12.37 2.33.57 3.57.57.55 0 1 .45 1 1V20c0 .55-.45 1-1 1-9.39 0-17-7.61-17-17 0-.55.45-1 1-1h3.5c.55 0 1 .45 1 1 0 1.25.2 2.45.57 3.57.11.35.03.74-.25 1.02z"/></svg>',
kp:'<svg viewBox="0 0 24 24" fill="currentColor"><circle cx="6" cy="5" r="1.8"/><circle cx="12" cy="5" r="1.8"/><circle cx="18" cy="5" r="1.8"/><circle cx="6" cy="11" r="1.8"/><circle cx="12" cy="11" r="1.8"/><circle cx="18" cy="11" r="1.8"/><circle cx="6" cy="17" r="1.8"/><circle cx="12" cy="17" r="1.8"/><circle cx="18" cy="17" r="1.8"/><circle cx="12" cy="22.5" r="1.8"/></svg>',
msg:'<svg viewBox="0 0 24 24" fill="currentColor"><path d="M12 3C6.5 3 2 6.6 2 11c0 2.3 1.2 4.3 3.1 5.8-.2 1.3-.8 2.5-1.6 3.4 1.9-.1 3.5-.8 4.7-1.7 1.2.4 2.5.5 3.8.5 5.5 0 10-3.6 10-8s-4.5-8-10-8z"/></svg>',
rem:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="13" r="8"/><path d="M12 8.5V13l3 2M4 4.5 7 3M20 4.5 17 3"/></svg>',
add:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"><path d="M12 5v14M5 12h14"/></svg>',
hold:'<svg viewBox="0 0 24 24" fill="currentColor"><rect x="6" y="5" width="4" height="14" rx="1.2"/><rect x="14" y="5" width="4" height="14" rx="1.2"/></svg>',
con:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"><circle cx="12" cy="8.5" r="3.6"/><path d="M5 20a7 7 0 0 1 14 0"/></svg>'};
const LET={1:'',2:'ABC',3:'DEF',4:'GHI',5:'JKL',6:'MNO',7:'PQRS',8:'TUV',9:'WXYZ','*':'','0':'+','#':''};
const DT={1:[697,1209],2:[697,1336],3:[697,1477],4:[770,1209],5:[770,1336],6:[770,1477],7:[852,1209],8:[852,1336],9:[852,1477],'*':[941,1209],0:[941,1336],'#':[941,1477]};
let root,S=null,ctx,tick,ringT,noAns,endT,media;
const q=s=>root.querySelector(s);
function ac(){try{ctx=ctx||new(window.AudioContext||window.webkitAudioContext)();if(ctx.state==='suspended')ctx.resume()}catch(e){}return ctx}
function bp(f,d,v,t0){const c=ac();if(!c)return;const o=c.createOscillator(),g=c.createGain();o.frequency.value=f;o.connect(g);g.connect(c.destination);const t=c.currentTime+(t0||0);g.gain.setValueAtTime(0,t);g.gain.linearRampToValueAtTime(v,t+.01);g.gain.setValueAtTime(v,t+d-.02);g.gain.linearRampToValueAtTime(0,t+d);o.start(t);o.stop(t+d+.03)}
function ring(kind){stopRing();const go=()=>{if(kind==='out'){bp(440,1.1,.04);bp(480,1.1,.04)}else{[0,.22,.44].forEach(x=>{bp(784,.16,.06,x);bp(988,.16,.05,x)});try{navigator.vibrate&&navigator.vibrate([300,150,300])}catch(e){}}};go();ringT=setInterval(go,kind==='out'?3200:2400)}
function stopRing(){clearInterval(ringT);ringT=null}
const btn=(k,l,c)=>`<button class="b1c-b ${c||''}" data-k="${k}"><i>${IC[{spk:'spk',ft:'ft',mu:'mu',more:'more',end:'end',kp:'kp',acc:'acc',dec:'end',msg:'msg',rem:'rem'}[k]]}</i>${l}</button>`;
function build(){if(root)return;root=document.createElement('div');root.id='b1c';root.hidden=true;
root.innerHTML=`<div class="b1c-bg"></div><div class="b1c-sh"></div><video class="b1c-pip" playsinline muted hidden></video>
<div class="b1c-top"><h2 dir="auto"></h2><p></p></div><div class="b1c-mid"></div><div class="b1c-dig" hidden></div>
<div class="b1c-in" hidden><div class="r1">${btn('rem','Remind Me')}${btn('msg','Message')}</div><div class="r2">${btn('dec','Decline','end')}${btn('acc','Accept','acc')}</div></div>
<div class="b1c-grid" hidden>${btn('spk','Speaker')}${btn('ft','FaceTime')}${btn('mu','Mute')}${btn('more','More')}${btn('end','End','end')}${btn('kp','Keypad')}</div>
<div class="b1c-kp" hidden>${['1','2','3','4','5','6','7','8','9','*','0','#'].map(d=>`<button class="b1c-k" data-d="${d}"><b>${d}</b><small>${LET[d]}</small></button>`).join('')}${btn('end','','end')}<button class="hide" data-k="hide">Hide</button></div>
<div class="b1c-more" hidden><button data-k="hold">Hold<span>${IC.hold}</span></button><button data-k="add">Add Call<span>${IC.add}</span></button><button data-k="con">Contacts<span>${IC.con}</span></button></div>`;
document.body.appendChild(root);root.addEventListener('click',onClick)}
function fmt(s){const m=Math.floor(s/60),r=s%60;return m+':'+String(r).padStart(2,'0')}
function status(t){q('.b1c-top p').textContent=t}
function upd(){const g=q('.b1c-grid'),kp=q('.b1c-kp'),inc=q('.b1c-in'),mid=q('.b1c-mid'),dg=q('.b1c-dig');
inc.hidden=S.mode!=='in';g.hidden=S.mode==='in'||S.kp;kp.hidden=!(S.mode!=='in'&&S.kp);dg.hidden=!(S.mode!=='in'&&S.kp);mid.style.visibility=S.kp&&S.mode!=='in'?'hidden':'visible';mid.style.flex=S.kp&&S.mode!=='in'?'0 0 0':'1';
dg.textContent=S.dig||'';
[['spk',S.spk],['ft',S.vid],['mu',S.mute]].forEach(([k,v])=>{const b=g.querySelector('[data-k="'+k+'"]');b&&b.classList.toggle('on',!!v)});
q('.b1c-more').hidden=!S.more}
function open(p,mode,video){build();if(S)finish(true);
S={mode,p,t:0,spk:false,mute:false,vid:false,kp:false,dig:'',more:false,hold:false,on:false};
q('.b1c-top h2').textContent=p.name||'Unknown';
q('.b1c-mid').innerHTML=p.av||'';
const bg=q('.b1c-bg');bg.style.backgroundImage=p.img?`url("${p.img}")`:'';
root.hidden=false;document.body.style.overflow='hidden';
if(mode==='in'){status('Black 1 Audio…');ring('in')}
else{status('calling…');ring('out');clearTimeout(noAns);noAns=setTimeout(()=>{if(S&&!S.on){toast('No answer — no calling service is connected');finish()}},25000)}
upd();if(video&&mode!=='in')vid()}
function connect(){if(!S||S.on)return;S.on=true;S.mode='call';stopRing();clearTimeout(noAns);S.t=0;status('0:00');clearInterval(tick);tick=setInterval(()=>{if(!S.hold)status(fmt(++S.t))},1000);bp(880,.08,.05);upd()}
async function vid(){if(S.vid){stopVid();S.vid=false;return upd()}
try{media=await navigator.mediaDevices.getUserMedia({video:{facingMode:'user'}});const v=q('.b1c-pip');v.srcObject=media;v.hidden=false;v.play&&v.play().catch(()=>{});S.vid=true}catch(e){toast('Camera permission is off — allow it in browser settings')}upd()}
function stopVid(){try{media&&media.getTracks().forEach(t=>t.stop())}catch(e){}media=null;const v=q('.b1c-pip');v.srcObject=null;v.hidden=true}
function finish(quiet){stopRing();clearInterval(tick);clearTimeout(noAns);stopVid();if(!S)return;const was=S.on;S=null;
if(quiet){root.hidden=true;document.body.style.overflow='';return}
q('.b1c-in').hidden=true;q('.b1c-grid').hidden=false;status('Call Ended');bp(480,.12,.05);bp(380,.2,.05,.14);
clearTimeout(endT);endT=setTimeout(()=>{root.hidden=true;document.body.style.overflow=''},800)}
function onClick(e){const d=e.target.closest('[data-d]');if(d&&S){const k=d.dataset.d;if(DT[k]){bp(DT[k][0],.14,.04);bp(DT[k][1],.14,.04)}if((S.dig||'').length<20)S.dig=(S.dig||'')+k;return upd()}
const b=e.target.closest('[data-k]');if(!b||!S){if(S&&S.more&&!e.target.closest('.b1c-more')){S.more=false;upd()}return}
const k=b.dataset.k;
if(k==='spk')S.spk=!S.spk;else if(k==='mu')S.mute=!S.mute;else if(k==='ft')return vid();
else if(k==='more')S.more=!S.more;else if(k==='kp'){S.kp=true;S.more=false}else if(k==='hide')S.kp=false;
else if(k==='end'||k==='dec')return finish();
else if(k==='acc')return connect();
else if(k==='msg'||k==='rem'){toast(k==='rem'?'We will remind you later':'Message sent');return finish()}
else if(k==='hold'){S.hold=!S.hold;S.more=false;status(S.hold?'On Hold':fmt(S.t))}
else if(k==='add'||k==='con'){S.more=false;toast('Not available during a call')}
upd()}
window.B1Call={start:(p,v)=>open(p,'out',v),incoming:p=>open(p,'in'),connect,end:()=>finish(),active:()=>!!S};
})();
