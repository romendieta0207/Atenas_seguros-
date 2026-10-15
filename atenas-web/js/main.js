// Cuenta animada de las cifras (respeta "reducir movimiento")
(() => {
  const els = document.querySelectorAll('.cifras b');
  if (matchMedia('(prefers-reduced-motion: reduce)').matches || !('IntersectionObserver' in window)) return;
  const io = new IntersectionObserver((entries) => {
    entries.forEach((e) => {
      if (!e.isIntersecting) return;
      io.unobserve(e.target);
      const el = e.target, to = +el.dataset.to, pre = el.dataset.pre || '', suf = el.dataset.suf || '';
      const t0 = performance.now(), dur = 1400;
      const tick = (t) => {
        const k = Math.min((t - t0) / dur, 1);
        el.textContent = pre + Math.round(to * (1 - Math.pow(1 - k, 3))) + suf;
        if (k < 1) requestAnimationFrame(tick);
      };
      requestAnimationFrame(tick);
    });
  }, { threshold: 0.6 });
  els.forEach((el) => io.observe(el));
})();
