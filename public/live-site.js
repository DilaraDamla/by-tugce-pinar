/* GitHub customer entry: initialize interactions exactly once, after fresh content or fallback. */
(async()=>{
 'use strict';if(location.hostname!=='dilaradamla.github.io')return;
 let initialized=false;
 const start=async revision=>{if(initialized)return;initialized=true;for(const name of ['icons','content-runtime','app','treatment','portfolio','video-qa'])await new Promise((resolve,reject)=>{const script=document.createElement('script');script.src=name+'.js?v=21&r='+encodeURIComponent(revision);script.onload=resolve;script.onerror=reject;document.body.append(script)});document.body.dataset.runtimeReady='true';};
 try{
  const r=await fetch('https://by-tugce-akman.dilaradamla222.chatgpt.site/api/public/site',{mode:'cors',credentials:'omit',cache:'no-store',signal:AbortSignal.timeout(10000)});if(!r.ok)throw Error('Güncel yayın okunamadı.');const data=await r.json();
  const doc=new DOMParser().parseFromString(data.html,'text/html');doc.querySelectorAll('script:not([type="application/ld+json"])').forEach(s=>s.remove());doc.querySelector('a[href="/admin"]')?.remove();
  window.StudioCMS=data.content;window.StudioBrand=data.brand;document.body.replaceWith(doc.body);
  for(const name of ['title','meta[name="description"]','meta[property="og:title"]','meta[property="og:description"]','meta[property="og:image"]','link[rel="canonical"]','script[type="application/ld+json"]']){const next=doc.head.querySelector(name);if(next)document.head.querySelector(name)?.replaceWith(next);}
  await start(data.revision);document.body.dataset.liveContent='true';
 }catch{const note=document.createElement('p');note.className='live-content-note';note.setAttribute('role','status');note.textContent='Güncel içeriğe şu an ulaşılamıyor. Kayıtlı görünümü inceleyebilir, güncel bilgileri işletmeden teyit edebilirsiniz.';document.body.prepend(note);try{await start('fallback')}catch{note.textContent+=' Etkileşimler yüklenemedi; sayfayı yenileyebilirsiniz.';}}
})();
