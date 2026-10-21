(() => {
 'use strict';const c=window.StudioCMS;window.StudioServices=c.services;window.StudioPhotoExtras=c.photos;window.StudioVideos=c.videos;
 window.renderStudioPhotos=(container,key)=>{const photos=c.photos.filter(p=>p.serviceId===key&&p.gallery);container.replaceChildren(...photos.map(p=>{const b=document.createElement('button');b.type='button';b.dataset.photoIndex=c.photos.indexOf(p);b.setAttribute('aria-label',p.label+' fotoğrafını büyüt');const img=document.createElement('img');img.src=p.image;img.alt=p.alt;img.width=p.width;img.height=p.height;img.loading='lazy';b.append(img);return b}));container.hidden=!photos.length;};
 const care=document.querySelector('#care-select');care.replaceChildren(new Option('Henüz karar vermedim'),...Object.values(c.services).filter(s=>s.enabled).sort((a,b)=>a.order-b.order).map(s=>new Option(s.care,s.care)));
 document.querySelector('.booking-phone').hidden=!c.settings.phone;document.querySelector('.booking-phone').href='tel:+'+c.settings.phone;document.querySelector('.booking-phone').textContent='Aramak için: +'+c.settings.phone;
 document.querySelectorAll('[data-service-jump]').forEach(a=>a.addEventListener('click',()=>document.querySelector('[data-service="'+a.dataset.serviceJump+'"]').click()));
})();
