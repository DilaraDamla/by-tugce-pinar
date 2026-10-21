(() => {
'use strict';const videos=window.StudioVideos||[];
  const grid = document.querySelector('[data-qa-videos]');
  const players = [];
  const validPost = value => {
    try {
      const url = new URL(value);
      if (url.protocol !== 'https:' || !['instagram.com', 'www.instagram.com'].includes(url.hostname)) return null;
      const match = url.pathname.match(/^\/(?:[A-Za-z0-9_.]+\/)?(reel|p)\/([A-Za-z0-9_-]+)\/?$/);
      return match ? `https://www.instagram.com/${match[1]}/${match[2]}/` : null;
    } catch { return null; }
  };
  for (const video of videos) {
    const url = validPost(video.url);
    if (!url) continue;
    const article = document.createElement('article'); article.className = 'qa-video-card';
    article.setAttribute('role', 'group');
    article.setAttribute('aria-roledescription', 'slayt');
    const h = document.createElement('h3'); h.textContent = video.title;
    const slot = document.createElement('div'); slot.className = 'qa-video-slot';
    const load = document.createElement('button'); load.type = 'button'; load.className = 'qa-play'; load.setAttribute('aria-label', video.title + ' — videoyu yükle');
    const poster = document.createElement('img'); poster.src = video.poster; poster.alt = video.title + ' röportajından bir kare'; poster.width = 290; poster.height = 516; poster.loading = 'lazy';
    const playLabel = document.createElement('span'); playLabel.textContent = '▶ Videoyu izle'; load.append(poster, playLabel);
    const source = document.createElement('a'); source.href = url; source.target = '_blank'; source.rel = 'noopener noreferrer'; source.className = 'text-button'; source.textContent = 'Instagram’da aç ↗';
    const status = document.createElement('p'); status.setAttribute('role', 'status');
    slot.append(load);
    players.push({ article, slot, load, status });
    load.addEventListener('click', () => {
      const frame = document.createElement('iframe');
      frame.title = video.title + ' — Instagram videosu';
      frame.src = url + 'embed/'; frame.loading = 'lazy';
      frame.allow = 'encrypted-media; picture-in-picture; fullscreen';
      frame.referrerPolicy = 'strict-origin-when-cross-origin';
      frame.setAttribute('sandbox', 'allow-scripts allow-same-origin allow-popups allow-forms allow-presentation');
      slot.replaceChildren(frame);
      status.textContent = 'Video Instagram tarafından yüklenir. Görünmüyorsa Instagram’da aç bağlantısını kullanın; giriş gerekebilir.';
      frame.addEventListener('error', () => { status.textContent = 'Instagram oynatıcısı açılamadı. Videoyu Instagram’da açabilirsiniz.'; });
    });
    article.append(h, slot, status, source); grid.append(article);
  }
  if (grid.childElementCount) {
    grid.hidden = false;
    grid.classList.add('qa-carousel');
    grid.setAttribute('role', 'region');
    grid.setAttribute('aria-roledescription', 'slayt gösterisi');
    grid.setAttribute('aria-label', window.StudioBrand.name+' soru-cevap videoları');
    const slides = [...grid.children];
    slides.forEach((slide, index) => slide.setAttribute('aria-label', `${index + 1} / ${slides.length}`));
    const controls = document.createElement('div'); controls.className = 'qa-carousel-controls';
    const previous = document.createElement('button'); previous.type = 'button'; previous.textContent = '←'; previous.setAttribute('aria-label', 'Önceki video');
    const next = document.createElement('button'); next.type = 'button'; next.textContent = '→'; next.setAttribute('aria-label', 'Sonraki video');
    const count = document.createElement('span'); count.setAttribute('role', 'status'); count.setAttribute('aria-live', 'polite');
    controls.append(previous, count, next); grid.after(controls);
    let current = 0;
    const sync = () => {
      const left = grid.getBoundingClientRect().left;
      const index = slides.reduce((best, slide, i) => Math.abs(slide.getBoundingClientRect().left - left) < Math.abs(slides[best].getBoundingClientRect().left - left) ? i : best, 0);
      if (current !== index) players.forEach((player, i) => {
        if (i !== index && player.slot.querySelector('iframe')) { player.slot.replaceChildren(player.load); player.status.textContent = ''; }
      });
      current = index;
      count.textContent = `${current + 1} / ${slides.length}`;
      previous.disabled = current === 0; next.disabled = current === slides.length - 1;
    };
    const move = delta => {
      const target = slides[Math.max(0, Math.min(slides.length - 1, current + delta))];
      grid.scrollTo({ left: target.offsetLeft - slides[0].offsetLeft, behavior: matchMedia('(prefers-reduced-motion: reduce)').matches ? 'instant' : 'smooth' });
    };
    previous.addEventListener('click', () => move(-1)); next.addEventListener('click', () => move(1));
    grid.tabIndex = 0;
    grid.addEventListener('keydown', event => {
      if (event.target !== grid || !['ArrowLeft', 'ArrowRight'].includes(event.key)) return;
      event.preventDefault(); move(event.key === 'ArrowLeft' ? -1 : 1);
    });
    grid.addEventListener('scroll', sync, { passive: true });
    new ResizeObserver(sync).observe(grid);
    sync();
  }
})();

