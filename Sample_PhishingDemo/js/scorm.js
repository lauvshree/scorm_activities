
// Minimal SCORM 1.2 wrapper
(function(){
  var API = null;
  var initialized = false;

  function findAPI(win){
    var n=0; var max=50;
    while(win && !win.API && win.parent && win.parent !== win){
      n++; if(n>max) break; win = win.parent;
    }
    return win && win.API ? win.API : (win.opener && win.opener.API) ? win.opener.API : null;
  }
  function getAPI(){
    if(API) return API;
    API = findAPI(window) || findAPI(window.top) || null;
    if(!API) console.warn('SCORM API not found: running standalone');
    return API;
  }
  function LMSInitialize(){
    var api = getAPI();
    if(api && !initialized){
      var res = api.LMSInitialize("");
      initialized = (res === 'true');
      if(initialized){ api.LMSSetValue('cmi.core.lesson_status','incomplete'); api.LMSCommit(""); }
      return initialized;
    }
    initialized = true; // standalone
    return true;
  }
  function LMSFinish(){ var api = getAPI(); if(api && initialized){ api.LMSFinish(""); } }
  function LMSSetValue(k,v){ var api = getAPI(); if(api && initialized) return api.LMSSetValue(k,String(v)); console.log('[SCORM mock] set',k,v); return 'true'; }
  function LMSCommit(){ var api = getAPI(); if(api && initialized) return api.LMSCommit(""); return 'true'; }

  window.SCORM = { init:LMSInitialize, finish:LMSFinish, set:LMSSetValue, commit:LMSCommit };
  window.addEventListener('load', function(){ var ok=LMSInitialize(); var el=document.getElementById('scormStatus'); if(el) el.textContent = ok? 'initialized':'not initialized'; });
  window.addEventListener('beforeunload', LMSFinish);
})();
