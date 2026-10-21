(() => {
  'use strict';
  // A browser refresh starts the customer page at its introduction.
  if(performance.getEntriesByType('navigation')[0]?.type==='reload'){
    history.scrollRestoration='manual';
    if(location.hash)history.replaceState(history.state,'',location.pathname+location.search);
    const resetTop=()=>window.scrollTo({top:0,left:0,behavior:'instant'});
    resetTop();requestAnimationFrame(resetTop);
    window.addEventListener('pageshow',resetTop,{once:true});
  }

  const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  window.StudioIcons?.render();
  const motion = window.Motion;
  const lenis = !reduced && window.Lenis ? new window.Lenis({ autoRaf: true, duration: 1.05, smoothWheel: true, syncTouch: false }) : null;
  const menu = document.querySelector('#mobile-menu');
  const menuToggle = document.querySelector('.menu-toggle');
  const booking = document.querySelector('#booking');
  const mobileBook = document.querySelector('.mobile-book');
  const care = document.querySelector('#care-select');
  const date = document.querySelector('#care-date');
  const time = document.querySelector('#care-time');
  const preview = document.querySelector('#message-preview');
  let bookingTrigger;
  const purpose = document.querySelector('#request-purpose');
  const clients = [...document.querySelectorAll('[name="client"]')];
  const purposes = {
    new: ['İlk görüşme / bilgi alma', 'Fiyat ve kapsam bilgisi', 'Konum ve ulaşım'],
    returning: ['Devam seansı / kontrol randevusu', 'Randevu tarihi değişikliği', 'Mevcut planımla ilgili soru', 'Konum ve ulaşım']
  };
  const setClient = value => {
    clients.forEach(input => { input.checked = input.value === value; });
    purpose.replaceChildren(...purposes[value].map(text => new Option(text, text)));
  };

  const closeMenu = () => { menu.close(); menuToggle.setAttribute('aria-expanded', 'false'); };
  menuToggle.addEventListener('click', () => { menu.showModal(); menuToggle.setAttribute('aria-expanded', 'true'); });
  document.querySelector('[data-close-menu]').addEventListener('click', closeMenu);
  menu.addEventListener('close', () => { menuToggle.setAttribute('aria-expanded', 'false'); lenis?.start(); });
  const outsideClick = dialog => dialog.addEventListener('click', event => {
    if (event.target !== dialog) return;
    const bounds = dialog.getBoundingClientRect();
    if (event.clientX < bounds.left || event.clientX > bounds.right || event.clientY < bounds.top || event.clientY > bounds.bottom) dialog.close();
  });
  [menu].forEach(dialog => { outsideClick(dialog); dialog.addEventListener('toggle', () => { if (dialog.open) lenis?.stop(); }); });

  document.addEventListener('click', event => {
    const link = event.target.closest('a[href^="#"]');
    if (!link || event.metaKey || event.ctrlKey || event.shiftKey || event.altKey || event.button !== 0) return;
    const target = document.getElementById(link.hash.slice(1));
    if (!target) return;
    event.preventDefault();
    if (menu.open) closeMenu();
    lenis?.start();
    if (location.hash !== link.hash) history.pushState(null, '', link.hash);
    target.setAttribute('tabindex', '-1');
    target.focus({ preventScroll: true });
    if (lenis) lenis.scrollTo(target, { offset: -30, duration: 1.15 });
    else target.scrollIntoView({ behavior: reduced ? 'instant' : 'smooth', block: 'start' });
  });
  window.addEventListener('popstate', () => {
    const target = document.getElementById(location.hash.slice(1) || 'top');
    if (target) { if (lenis) lenis.scrollTo(target, { immediate: true }); else target.scrollIntoView({ behavior: 'instant' }); }
  });

  const services = window.StudioServices;
  const tabs = [...document.querySelectorAll('[data-service]')];
  const panel = document.querySelector('#service-panel');
  const chooseService = tab => {
    const data = services[tab.dataset.service];
    tabs.forEach(button => { const active = button === tab; button.setAttribute('aria-selected', String(active)); button.tabIndex = active ? 0 : -1; });
    panel.setAttribute('aria-labelledby', tab.id);
    window.renderStudioPhotos(panel.querySelector('[data-service-gallery]'), tab.dataset.service);
    const serviceImage=panel.querySelector('[data-service-image]');if(data.image)serviceImage.src=data.image;else serviceImage.removeAttribute('src');
    panel.querySelector('[data-service-image]').alt = data.alt;
    const photo=panel.querySelector('[data-service-source]');photo.hidden=!data.image;panel.querySelector('.service-image-empty').hidden=!!data.image;
    
    panel.querySelector('[data-info-current]').dataset.infoCurrent = tab.dataset.service;
    panel.querySelector('[data-service-label]').textContent = data.label;
    panel.querySelector('[data-service-title]').innerHTML = data.title;
    panel.querySelector('[data-service-copy]').textContent = data.copy;
      panel.querySelector('[data-service-meta]').textContent = [data.price && 'Ücret: '+data.price, data.duration && 'Süre: '+data.duration].filter(Boolean).join(' · ');
    panel.querySelector('[data-service-tags]').replaceChildren(...data.tags.map(text => { const tag = document.createElement('span'); tag.textContent = text; return tag; }));
    panel.querySelector('[data-service-questions]').replaceChildren(...['Güncel uygulama kapsamı ve uygunluk nasıl değerlendiriliyor?', 'Ücret, kontrol ve varsa devam planı neleri içeriyor?'].map(text => { const item = document.createElement('li'); item.textContent = text; return item; }));
    panel.querySelector('[data-selected-service]').dataset.selectedService = data.care;
    panel.querySelector('.panel-number').textContent = String(tabs.indexOf(tab) + 1).padStart(2, '0');
    if (!reduced && motion) motion.animate(panel.querySelectorAll('h3,p,.service-tags'), { opacity: [0, 1], y: [12, 0] }, { duration: .45, delay: motion.stagger(.04) });
  };
  tabs.forEach((tab, index) => {
    tab.addEventListener('click', () => chooseService(tab));
    tab.addEventListener('keydown', event => {
      let next;
      if (event.key === 'ArrowDown' || event.key === 'ArrowRight') next = (index + 1) % tabs.length;
      if (event.key === 'ArrowUp' || event.key === 'ArrowLeft') next = (index - 1 + tabs.length) % tabs.length;
      if (event.key === 'Home') next = 0;
      if (event.key === 'End') next = tabs.length - 1;
      if (next === undefined) return;
      event.preventDefault(); chooseService(tabs[next]); tabs[next].focus({ preventScroll: true });
    });
  });

  if(tabs.length)chooseService(tabs[0]);

  const today = new Date();
  const localDate = `${today.getFullYear()}-${String(today.getMonth() + 1).padStart(2, '0')}-${String(today.getDate()).padStart(2, '0')}`;
  date.min = localDate;
  const message = () => {
    let result = `Merhaba ${window.StudioBrand.name}, web siteniz üzerinden ulaşıyorum. ${clients.find(input => input.checked).value === 'returning' ? 'Mevcut danışanınızım.' : 'İlk kez iletişime geçiyorum.'}\nTalebim: ${purpose.value}.`;
    const name = document.querySelector('#client-name').value.trim();
    const note = document.querySelector('#client-note').value.trim();
    if (name) result += `\nAdım: ${name}.`;
    if (note) result += `\nNotum: ${note}`;
    if (care.value !== 'Henüz karar vermedim') result += `\nİlgilendiğim uygulama: ${care.value}.`;
    if (!date.disabled && date.value) { const [year, month, day] = date.value.split('-'); result += `\nTercih ettiğim gün: ${day}.${month}.${year}.`; }
    if (!time.disabled && time.value !== 'Birlikte belirleyelim') result += `\nTercih ettiğim zaman: ${time.value}.`;
    return result + (purpose.value === 'Konum ve ulaşım' ? '\nGüncel adres ve görüşme konumunu paylaşabilir misiniz?' : '\nTalebim hakkında bilgi verebilir misiniz?');
  };
  const updatePreview = () => {
    const schedule = /görüşme|randevusu|değişikliği/.test(purpose.value);
    document.querySelector('.form-row').hidden = !schedule;
    date.disabled = time.disabled = !schedule;
    preview.textContent = message(); document.querySelector('.form-status').textContent = '';
    const fallback=document.querySelector('[data-whatsapp-preview]');const invalid=!window.StudioCMS.settings.whatsapp||!date.disabled&&date.value&&(!date.validity.valid||date.value<date.min);fallback.setAttribute('aria-disabled',String(!!invalid));if(invalid)fallback.removeAttribute('href');else fallback.href='https://wa.me/'+window.StudioCMS.settings.whatsapp+'?text='+encodeURIComponent(message());
  };
  clients.forEach(input => input.addEventListener('change', () => { setClient(input.value); updatePreview(); }));
  [care, date, time, purpose, document.querySelector('#client-name'), document.querySelector('#client-note')].forEach(input => input.addEventListener('input', updatePreview));
  document.querySelectorAll('[data-book]').forEach(button => button.addEventListener('click', () => {
    bookingTrigger = button;
    if (menu.open) closeMenu();
    document.querySelector('#treatment-dialog')?.close();
    if (button.dataset.client) setClient(button.dataset.client);
    if (button.dataset.purpose) purpose.value = button.dataset.purpose;
    if (button.dataset.selectedService) care.value = button.dataset.selectedService;
    updatePreview(); lenis?.start();
    if (lenis) lenis.scrollTo(booking, { offset: -25 }); else booking.scrollIntoView({ behavior: reduced ? "instant" : "smooth", block: "start" });
    document.querySelector('[data-next-step]').focus({ preventScroll: true });

  }));
  document.querySelector('[data-close-booking]')?.addEventListener('click', () => booking.close());
  booking.addEventListener('close', () => { lenis?.start(); if (bookingTrigger && !menu.contains(bookingTrigger)) bookingTrigger.focus({ preventScroll: true }); else menuToggle.focus({ preventScroll: true }); });
  document.querySelector('#booking-form').addEventListener('submit', event => {
    event.preventDefault();
    const error = document.querySelector('#date-error');
    if(!window.StudioCMS.settings.whatsapp){document.querySelector('.form-status').textContent='WhatsApp bilgisi henüz belirtilmemiş. Diğer iletişim kanallarını kullanın.';return;}
    const invalid = !date.disabled && date.value && (!date.validity.valid || date.value < date.min);
    date.setAttribute('aria-invalid', String(Boolean(invalid)));
    error.textContent = invalid ? 'Bugün veya daha sonraki bir günü seçin.' : '';
    if (invalid) { date.focus(); return; }
    if (!event.currentTarget.reportValidity()) return;
    const submit = event.currentTarget.querySelector('[type=submit]');
    if (submit.disabled) return;
    submit.disabled = true; submit.setAttribute('aria-busy', 'true');
    setTimeout(() => { submit.disabled = false; submit.removeAttribute('aria-busy'); }, 1500);
    const url = `https://wa.me/${window.StudioCMS.settings.whatsapp}?text=${encodeURIComponent(message())}`;
    const link = document.createElement('a'); link.href = url; link.target = '_blank'; link.rel = 'noopener noreferrer'; link.click();
    document.querySelector('.form-status').textContent = 'Mesaj taslağınız hazır. WhatsApp açıldıysa kontrol edip gönderin. Açılmadıysa mesajı kopyalayabilir veya bizi arayabilirsiniz. Randevunuz henüz kesinleşmedi.';
  });
  document.querySelector('[data-copy-message]').addEventListener('click', async () => {
    const status = document.querySelector('.form-status');
    if (!date.disabled && date.value && (!date.validity.valid || date.value < date.min)) {
      document.querySelector('#date-error').textContent = 'Bugün veya daha sonraki bir günü seçin.';
      date.setAttribute('aria-invalid', 'true'); date.focus(); return;
    }
    try { await navigator.clipboard.writeText(message()); status.textContent = 'Mesaj kopyalandı. WhatsApp sohbetine yapıştırıp gönderebilirsiniz.'; }
    catch { status.textContent = 'Kopyalama kullanılamıyor. Yukarıdaki mesajı seçip kopyalayabilir veya telefonla ulaşabilirsiniz.'; }
  });
  date.addEventListener('input', () => { date.removeAttribute('aria-invalid'); document.querySelector('#date-error').textContent = ''; });
  updatePreview();

  if (!reduced && motion) {
    motion.animate(document.querySelectorAll('.hero-enter'), { opacity: [0, 1], y: [24, 0] }, { duration: .9, delay: motion.stagger(.11), ease: [.22, 1, .36, 1] });
    motion.animate('.hero-portrait', { opacity: [0, 1], y: [30, 0] }, { duration: 1.3, delay: .2, ease: [.22, 1, .36, 1] });
    motion.inView('.reveal', element => { motion.animate(element, { opacity: [0, 1], y: [25, 0] }, { duration: .8, ease: [.22, 1, .36, 1] }); }, { margin: '0px 0px -35px 0px' });
    if (window.matchMedia('(pointer:fine)').matches) document.querySelectorAll('.magnetic').forEach(button => {
      button.addEventListener('pointermove', event => { const bounds = button.getBoundingClientRect(); motion.animate(button, { x: (event.clientX - bounds.left - bounds.width / 2) * .08, y: (event.clientY - bounds.top - bounds.height / 2) * .1 }, { duration: .3 }); });
      button.addEventListener('pointerleave', () => motion.animate(button, { x: 0, y: 0 }, { type: 'spring', stiffness: 180, damping: 17 }));
    });
  }
  const progress = document.querySelector('.reading-progress');
  const scrollState = () => { const distance = document.documentElement.scrollHeight - innerHeight; progress.style.width = `${distance > 0 ? scrollY / distance * 100 : 0}%`; mobileBook.classList.toggle('is-hidden', scrollY < 450); };
  addEventListener('scroll', scrollState, { passive: true }); scrollState();
  window.addEventListener('pageshow', event => { if (event.persisted) { if (menu.open) closeMenu();  lenis?.start(); } });
})();

// Progressive booking: one form, two short steps, no availability claims.
(() => {
  const form = document.querySelector('#booking-form');
  const care = document.querySelector('#care-select');
  const date = document.querySelector('#care-date');
  const purpose = document.querySelector('#request-purpose');
  const cards = [...document.querySelectorAll('[data-quick-care]')];
  const syncCards = () => cards.forEach(card => card.setAttribute('aria-pressed', String(card.dataset.quickCare === care.value)));
  const showStep = (step, focus = true) => {
    document.querySelectorAll('[data-booking-step]').forEach(panel => { panel.hidden = Number(panel.dataset.bookingStep) !== step; });
    document.querySelectorAll('[data-progress]').forEach(item => {
      const current = Number(item.dataset.progress) === step;
      item.classList.toggle('is-current', current);
      if (current) item.setAttribute('aria-current', 'step'); else item.removeAttribute('aria-current');
    });
    document.querySelector('[data-selection-summary]').textContent = care.value + ' · ' + purpose.value;
    document.querySelector('.quick-days').hidden = document.querySelector('.form-row').hidden;
    document.querySelector('.availability-note').hidden = document.querySelector('.form-row').hidden;
    syncCards();
    if (focus) {
      const target = step ? document.querySelector('[data-prev-step]') : document.querySelector('[data-next-step]');
      target.focus({ preventScroll: true });
      document.querySelector('#booking').scrollIntoView({ behavior: matchMedia('(prefers-reduced-motion: reduce)').matches ? 'instant' : 'smooth', block: 'start' });
    }
  };
  cards.forEach(card => card.addEventListener('click', () => {
    care.value = card.dataset.quickCare;
    care.dispatchEvent(new Event('input', { bubbles: true })); syncCards();
  }));
  care.addEventListener('input', syncCards);
  document.querySelector('[data-next-step]').addEventListener('click', () => showStep(1));
  document.querySelector('[data-prev-step]').addEventListener('click', () => showStep(0));
  document.querySelectorAll('[data-book]').forEach(button => button.addEventListener('click', () => showStep(0, false)));
  const days = document.querySelector('.quick-days');
  const dayButtons = [];
  for (let i = 0; i < 5; i++) {
    const day = new Date(); day.setHours(12, 0, 0, 0); day.setDate(day.getDate() + i);
    const value = `${day.getFullYear()}-${String(day.getMonth() + 1).padStart(2, '0')}-${String(day.getDate()).padStart(2, '0')}`;
    const button = document.createElement('button'); button.type = 'button'; button.dataset.date = value;
    button.setAttribute('aria-label', day.toLocaleDateString('tr-TR', { day: 'numeric', month: 'long', weekday: 'long' }));
    button.setAttribute('aria-pressed', 'false');
    const label = document.createElement('span'); label.textContent = i === 0 ? 'Bugün' : day.toLocaleDateString('tr-TR', { weekday: 'short' });
    const number = document.createElement('strong'); number.textContent = String(day.getDate());
    button.append(label, number); days.append(button); dayButtons.push(button);
    button.addEventListener('click', () => { date.value = value; date.dispatchEvent(new Event('input', { bubbles: true })); });
  }
  date.addEventListener('input', () => dayButtons.forEach(button => button.setAttribute('aria-pressed', String(button.dataset.date === date.value))));
  form.addEventListener('keydown', event => { if (event.key === 'Enter' && !document.querySelector('[data-booking-step="0"]').hidden && !event.target.closest('button')) { event.preventDefault(); showStep(1); } });
  const reset=()=>{form.reset();document.querySelector('[name=client][value=new]').checked=true;document.querySelector('[name=client][value=new]').dispatchEvent(new Event('change'));care.value='Henüz karar vermedim';date.removeAttribute('aria-invalid');document.querySelector('#date-error').textContent='';care.dispatchEvent(new Event('input'));showStep(0);};
  document.querySelector('[data-reset-booking]').addEventListener('click',()=>{if(confirm('Girdiğiniz tercihler temizlensin mi?'))reset()});
  document.querySelector('[data-cancel-booking]').addEventListener('click',()=>{if(confirm('Talep taslağından vazgeçilsin mi?')){reset();document.querySelector('#hizmetler').scrollIntoView({behavior:'smooth'})}});
  const filters = [...document.querySelectorAll('[data-gallery-filter]')];
  filters.forEach(filter => filter.addEventListener('click', () => {
    filters.forEach(button => button.setAttribute('aria-pressed', String(button === filter)));
    document.querySelectorAll('[data-gallery-category]').forEach(card => { card.hidden = filter.dataset.galleryFilter !== 'all' && card.dataset.galleryCategory !== filter.dataset.galleryFilter; });
  }));
  showStep(0, false);
})();
