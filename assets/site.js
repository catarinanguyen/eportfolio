// mobile menu
const burger = document.querySelector('.burger');
if (burger) burger.addEventListener('click', () => {
  const open = document.body.classList.toggle('nav-open');
  burger.setAttribute('aria-expanded', open);
});
// artifacts dropdown (click/tap + keyboard; hover handled in CSS)
document.querySelectorAll('.dd > button').forEach(btn => {
  btn.addEventListener('click', e => {
    e.stopPropagation();
    const dd = btn.parentElement, open = dd.classList.toggle('open');
    btn.setAttribute('aria-expanded', open);
  });
});
document.addEventListener('click', e => {
  document.querySelectorAll('.dd.open').forEach(dd => { if (!dd.contains(e.target)) { dd.classList.remove('open'); dd.querySelector('button').setAttribute('aria-expanded', false); } });
});
document.addEventListener('keydown', e => { if (e.key === 'Escape') document.querySelectorAll('.dd.open').forEach(dd => dd.classList.remove('open')); });

// reflection: live word count + section highlighting
const prose = document.querySelector('article.prose');
if (prose) {
  const words = [...prose.querySelectorAll('p')].map(p => p.textContent.trim().split(/\s+/).length).reduce((a, b) => a + b, 0);
  const wc = document.getElementById('wc');
  if (wc) wc.textContent = `${words.toLocaleString()} words · ${Math.max(1, Math.round(words / 230))} min read`;
  const links = [...document.querySelectorAll('.toc a')];
  const obs = new IntersectionObserver(entries => {
    entries.forEach(en => {
      if (en.isIntersecting) links.forEach(l => l.classList.toggle('active', l.getAttribute('href') === '#' + en.target.id));
    });
  }, { rootMargin: '-30% 0px -60% 0px' });
  prose.querySelectorAll('[id]').forEach(s => obs.observe(s));
}

// revision tabs
const tabs = document.querySelectorAll('.rtabs button');
tabs.forEach(t => t.addEventListener('click', () => {
  tabs.forEach(x => x.setAttribute('aria-selected', x === t));
  document.querySelectorAll('.panel').forEach(p => p.hidden = p.id !== t.getAttribute('aria-controls'));
}));

// document viewer page counter
document.querySelectorAll('.viewer').forEach(v => {
  const box = v.querySelector('.vpages'), pages = [...box.querySelectorAll('img')], out = v.querySelector('.pg');
  if (!out || pages.length < 2) return;
  box.addEventListener('scroll', () => {
    const top = box.scrollTop + box.clientHeight / 3;
    let i = 0; pages.forEach((p, k) => { if (p.offsetTop <= top) i = k; });
    out.textContent = `Page ${i + 1} of ${pages.length}`;
  }, { passive: true });
});
