/* ===== Block card logic (inline, in place of the composer) ===== */
(function(){
var BOY='assets/img-30fdfb0d.png',HEART='assets/img-506f6822.png',FLOOR='assets/img-77f5adac.png';
var raf=0,cv,cx,W=0,H=0,dpr=1,last=0,drops=[],rip=[],gl=[],gT=0,io,ro,el,FLR=.515;
var ICON='<svg viewBox="0 0 24 24" fill="none" stroke="#fff" stroke-width="2.3" stroke-linecap="round" aria-hidden="true"><circle cx="12" cy="12" r="9.6"/><path d="M5.2 5.2l13.6 13.6"/></svg>';
function build(){
 var d=document.createElement('div');d.id='bkIn';d.setAttribute('role','status');d.setAttribute('aria-label','تم الحظر');
 d.innerHTML='<div class="bk-glass"><canvas id="bkRain"></canvas>'
 +'<img class="bk-fl" alt="" src="'+FLOOR+'" draggable="false">'
 +'<i class="bk-rp"></i><i class="bk-rp b"></i><i class="bk-rp c"></i><i class="bk-sp"></i>'
 +'<img class="bk-ht" alt="" src="'+HEART+'" draggable="false"></div>'
 +'<div class="bk-boy"><img alt="" src="'+BOY+'" draggable="false"></div>'
 +'<div class="bk-t">'+ICON+'<span>تم الحظر</span></div>'
 +'<div class="bk-s">لا يمكنك إرسال رسائل أو رؤية محادثات هذا الشخص.</div>';
 return d;
}
function size(){if(!cv)return;var r=cv.getBoundingClientRect();if(!r.width)return;dpr=Math.min(2.5,window.devicePixelRatio||1);W=r.width;H=r.height;cv.width=Math.round(W*dpr);cv.height=Math.round(H*dpr);cx.setTransform(dpr,0,0,dpr,0,0);spawn()}
function mk(init){var fl=H*FLR,len=H*(.07+Math.random()*.17);return{x:W*(.02+Math.random()*.96),y:init?Math.random()*fl:-len*Math.random(),l:len,v:H*(.5+Math.random()*.55),a:.16+Math.random()*.5,f:fl+(Math.random()-.5)*H*.012}}
function spawn(){drops=[];rip=[];gl=[];var n=Math.max(12,Math.round(W/11));for(var i=0;i<n;i++)drops.push(mk(1))}
function glint(){gl.push({x:W*(.655+Math.random()*.14),y:H*(.43+Math.random()*.05),vx:(Math.random()-.5)*W*.035,vy:H*(.04+Math.random()*.1),t:0,L:.9+Math.random()*.9,s:W*(.0035+Math.random()*.004),r:Math.random()*6.28})}
function frame(t){
 if(!cv||!cv.isConnected||!cv.offsetWidth){raf=0;return}
 var dt=Math.min(.05,(t-last)/1000||.016);last=t;cx.clearRect(0,0,W,H);cx.lineCap='round';cx.lineWidth=Math.max(1,W*.0018);
 var i,d,g,top,bot,fade;
 for(i=0;i<drops.length;i++){d=drops[i];d.y+=d.v*dt;top=d.y-d.l;bot=Math.min(d.y,d.f);
  fade=Math.max(0,Math.min(1,(d.f-d.y)/(H*.12)+.4));
  if(bot>top){g=cx.createLinearGradient(0,top,0,bot);g.addColorStop(0,'rgba(150,185,255,0)');g.addColorStop(1,'rgba(190,212,255,'+(d.a*fade).toFixed(3)+')');cx.strokeStyle=g;cx.beginPath();cx.moveTo(d.x,top);cx.lineTo(d.x,bot);cx.stroke()}
  if(d.y>=d.f){if(Math.random()<.2&&d.x>W*.07&&d.x<W*.93)rip.push({x:d.x,y:d.f,r:0,m:W*(.018+Math.random()*.02)});drops[i]=mk(0)}}
 for(i=rip.length-1;i>=0;i--){d=rip[i];d.r+=dt*W*.05;var k=d.r/d.m;if(k>=1){rip.splice(i,1);continue}
  cx.strokeStyle='rgba(165,198,255,'+(.34*(1-k)).toFixed(3)+')';cx.lineWidth=Math.max(1,W*.0014);cx.beginPath();cx.ellipse(d.x,d.y,d.r*2.4,d.r*.5,0,0,6.283);cx.stroke()}
 gT-=dt;if(gT<=0){gT=.22+Math.random()*.4;if(gl.length<14)glint()}
 for(i=gl.length-1;i>=0;i--){d=gl[i];d.t+=dt;if(d.t>=d.L||d.y>H*FLR){gl.splice(i,1);continue}d.x+=d.vx*dt;d.y+=d.vy*dt;d.vy+=H*.12*dt;
  var al=Math.sin(Math.PI*d.t/d.L);cx.save();cx.translate(d.x,d.y);cx.rotate(d.r+d.t*3);cx.fillStyle='rgba(205,223,255,'+(.8*al).toFixed(3)+')';cx.shadowColor='rgba(120,165,255,.9)';cx.shadowBlur=W*.01;
  cx.beginPath();cx.moveTo(0,-d.s);cx.lineTo(d.s*.8,d.s*.9);cx.lineTo(-d.s*.8,d.s*.5);cx.closePath();cx.fill();cx.restore()}
 raf=requestAnimationFrame(frame)
}
function start(){if(raf||!cv)return;size();last=performance.now();raf=requestAnimationFrame(frame)}
function stop(){if(raf){cancelAnimationFrame(raf);raf=0}}
function sync(on){
 var c=document.getElementById('mgC');if(!c)return;var ex=c.querySelector('#bkIn');
 if(!on){c.classList.remove('bk-on');if(ex)ex.remove();el=cv=null;stop();if(io)io.disconnect();if(ro)ro.disconnect();return}
 c.classList.add('bk-on');
 if(ex){if(!raf&&cv)start();return}
 el=build();var cp=c.querySelector('.mg-cp');if(cp&&cp.parentNode===c)cp.after(el);else c.appendChild(el);
 cv=el.querySelector('#bkRain');cx=cv.getContext('2d');
 try{if(io)io.disconnect();io=new IntersectionObserver(function(e){if(e[0]&&e[0].isIntersecting)start();else stop()});io.observe(el)}catch(e){start()}
 try{if(ro)ro.disconnect();ro=new ResizeObserver(function(){size();if(!raf)start()});ro.observe(el)}catch(e){}
 start();
 try{navigator.vibrate&&navigator.vibrate(14)}catch(e){}
}
window.bkInline=sync;
window.showBlockCard=function(){sync(true)};
})();
