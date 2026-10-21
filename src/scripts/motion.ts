import { animate, inView } from 'motion';

const REVEAL_EASE = [0.22, 1, 0.36, 1] as const;
const REVEAL_DISTANCE = 80;
const REVEAL_DURATION = 0.9;
const STAGGER_DELAY = 0.15;

// Reveals run only when JS and Motion are available and the user has not asked
// for reduced motion. Otherwise the CSS default leaves content fully visible.
export function initReveal(): void {
  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

  document.documentElement.classList.add('motion-ready');

  document.querySelectorAll<HTMLElement>('.reveal').forEach((el) => {
    const delay = el.classList.contains('reveal-delay-1') ? STAGGER_DELAY : 0;

    const stop = inView(
      el,
      () => {
        stop();
        animate(
          el,
          { opacity: [0, 1], x: [REVEAL_DISTANCE, 0] },
          { duration: REVEAL_DURATION, delay, ease: REVEAL_EASE },
        );
      },
      { amount: 0.12 },
    );
  });
}
