(function(){
 var vw=document.getElementById('view-messages');if(!vw)return;
 /* pause the background while scrolling so every frame goes to scrolling; resume 160ms after */
 var busy=0,bt=0;
 function hold(){if(!busy){busy=1;vw.classList.add('mg-busy')}clearTimeout(bt);bt=setTimeout(function(){busy=0;vw.classList.remove('mg-busy')},160)}
 vw.addEventListener('scroll',hold,{passive:true,capture:true});
 /* adaptive governor: if the device still drops frames, switch to the lighter glass automatically */
 var SS={get:function(k){try{return sessionStorage.getItem(k)}catch(e){}},set:function(k,v){try{sessionStorage.setItem(k,v)}catch(e){}}};
 function lite(){document.body.classList.add('mg-lite');SS.set('mgLite','1')}
 try{if(SS.get('mgLite')==='1'||(navigator.deviceMemory&&navigator.deviceMemory<=2)||(navigator.hardwareConcurrency&&navigator.hardwareConcurrency<=2))lite()}catch(e){}
 var mon=0,tries=0;
 function probe(){if(mon||tries>=3||document.body.classList.contains('mg-lite'))return;mon=1;tries++;
  var last=0,n=0,slow=0;
  (function f(t){
   if(!vw.classList.contains('active')||document.hidden){mon=0;return}
   if(last&&n++>10&&t-last>34)slow++;
   last=t;
   if(n>=70){mon=0;if(slow>=14)lite();return}
   requestAnimationFrame(f)})(0)}
 new MutationObserver(function(){if(vw.classList.contains('active'))setTimeout(probe,450)}).observe(vw,{attributes:true,attributeFilter:['class']});
})();
