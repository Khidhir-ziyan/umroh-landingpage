import { animate, inView, scroll, stagger } from 'motion';

const EASE = [0.22, 1, 0.36, 1] as const;

// Semua animasi hanya berjalan bila JS & Motion tersedia dan pengguna tidak
// memilih "kurangi gerakan". Tanpa itu, CSS default tetap menampilkan semua konten.
const reduceMotion = () => window.matchMedia('(prefers-reduced-motion: reduce)').matches;

/** Elemen .reveal naik pelan + fade saat masuk layar. */
function initSectionReveal(): void {
  document.querySelectorAll<HTMLElement>('.reveal').forEach((el) => {
    const delay = el.classList.contains('reveal-delay-1') ? 0.12 : 0;
    const stop = inView(
      el,
      () => {
        stop();
        animate(el, { opacity: [0, 1], y: [28, 0] }, { duration: 0.9, delay, ease: EASE });
      },
      { amount: 0.12 },
    );
  });
}

/** Judul hero muncul per kata, lalu elemen pendukung menyusul bergiliran. */
function initHeroIntro(): void {
  const words = document.querySelectorAll<HTMLElement>('.hero-title .w > span');
  if (words.length) {
    animate(words, { y: ['110%', '0%'] }, { duration: 0.9, delay: stagger(0.06, { startDelay: 0.15 }), ease: EASE });
  }
  const fades = document.querySelectorAll<HTMLElement>('.hero-fade');
  if (fades.length) {
    animate(fades, { opacity: [0, 1], y: [18, 0] }, { duration: 0.8, delay: stagger(0.08, { startDelay: 0.35 }), ease: EASE });
  }
}

/** Angka statistik menghitung naik saat terlihat. */
function initCounters(): void {
  document.querySelectorAll<HTMLElement>('[data-count]').forEach((el) => {
    const target = Number(el.dataset.count);
    if (!Number.isFinite(target)) return;
    el.textContent = '0';
    const stop = inView(el, () => {
      stop();
      animate(0, target, {
        duration: 1.4,
        delay: 0.6,
        ease: EASE,
        onUpdate: (v) => { el.textContent = String(Math.round(v)); },
      });
    });
  });
}

/** Foto masjid di bingkai lengkung bergeser lebih lambat dari scroll. */
function initParallax(): void {
  document.querySelectorAll<HTMLElement>('[data-parallax]').forEach((el) => {
    const strength = Number(el.dataset.parallax) || 0.1;
    const box = el.closest('section') ?? el;
    scroll(animate(el, { y: ['0%', `${strength * 100}%`] }, { ease: 'linear' }), {
      target: box,
      offset: ['start start', 'end start'],
    });
  });
}

/** Buku sedikit miring mengikuti kursor (hanya perangkat dengan mouse). */
function initTilt(): void {
  if (!window.matchMedia('(hover: hover) and (pointer: fine)').matches) return;
  document.querySelectorAll<HTMLElement>('[data-tilt]').forEach((frame) => {
    const stage = frame.parentElement;
    const img = frame.querySelector<HTMLElement>('img');
    if (!stage || !img) return;
    stage.addEventListener('pointermove', (e) => {
      const r = stage.getBoundingClientRect();
      const x = (e.clientX - r.left) / r.width - 0.5;
      const y = (e.clientY - r.top) / r.height - 0.5;
      img.style.transform = `perspective(900px) rotateY(${x * 10}deg) rotateX(${-y * 8}deg)`;
    });
    stage.addEventListener('pointerleave', () => { img.style.transform = ''; });
  });
}

export function initReveal(): void {
  if (reduceMotion()) return;
  document.documentElement.classList.add('motion-ready');
  initHeroIntro();
  initSectionReveal();
  initCounters();
  initParallax();
  initTilt();
}
