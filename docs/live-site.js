/* GitHub customer entry: initialize interactions exactly once, after fresh content or fallback. */
(async()=>{
 'use strict';if(location.hostname!=='dilaradamla.github.io')return;
// A browser refresh starts the customer page at its introduction.
  if(performance.getEntriesByType('navigation')[0]?.type==='reload'){
    history.scrollRestoration='manual';
    if(location.hash)history.replaceState(history.state,'',location.pathname+location.search);
    const resetTop=()=>window.scrollTo({top:0,left:0,behavior:'instant'});
    resetTop();requestAnimationFrame(resetTop);
    window.addEventListener('pageshow',resetTop,{once:true});
  }
 let initialized=false;
 const start=async revision=>{if(initialized)return;initialized=true;for(const name of ['icons','content-runtime','app','treatment','portfolio','video-qa'])await new Promise((resolve,reject)=>{const script=document.createElement('script');script.src=name+'.js?v=25&r='+encodeURIComponent(revision);script.onload=resolve;script.onerror=reject;document.body.append(script)});document.body.dataset.runtimeReady='true';};
 try{
  const r=await fetch('https://by-tugce-akman.dilaradamla222.chatgpt.site/api/public/site',{mode:'cors',credentials:'omit',cache:'no-store',signal:AbortSignal.timeout(10000)});if(!r.ok)throw Error('Güncel yayın okunamadı.');const data=await r.json();
  const doc=new DOMParser().parseFromString(data.html,'text/html');doc.querySelectorAll('script:not([type="application/ld+json"])').forEach(s=>s.remove());const admin=doc.querySelector('a[href="/admin"]');if(admin){admin.href='https://by-tugce-akman.dilaradamla222.chatgpt.site/admin';admin.textContent='Yönetim paneli ↗';}
  window.StudioCMS=data.content;window.StudioBrand=data.brand;document.body.replaceWith(doc.body);
  for(const name of ['title','meta[name="description"]','meta[property="og:title"]','meta[property="og:description"]','meta[property="og:image"]','link[rel="canonical"]','script[type="application/ld+json"]']){const next=doc.head.querySelector(name);if(next)document.head.querySelector(name)?.replaceWith(next);}
  await start(data.revision);document.body.dataset.liveContent='true';
 }catch{const note=document.createElement('p');note.className='live-content-note';note.setAttribute('role','status');note.textContent='Güncel içeriğe şu an ulaşılamıyor. Kayıtlı görünümü inceleyebilir, güncel bilgileri işletmeden teyit edebilirsiniz.';document.body.prepend(note);try{await start('fallback')}catch{note.textContent+=' Etkileşimler yüklenemedi; sayfayı yenileyebilirsiniz.';}}
})();
