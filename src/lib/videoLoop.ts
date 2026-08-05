/**
 * The playback contract for every silent looping clip on this site, in one
 * place — because two components each keeping their own copy of it is how the
 * one on the newer page quietly loses the reduced-motion branch.
 *
 * The contract, unchanged from `VideoBand` where it was first written:
 *
 * - **Lazy.** `preload="none"` and no `autoplay` attribute, so a clip costs
 *   nothing until it is actually played. `play()` is what first fetches it.
 * - **Only while in view.** An `IntersectionObserver` starts and stops it, so
 *   four loops on one page never decode at once and an offscreen clip is never
 *   downloaded at all.
 * - **`prefers-reduced-motion` is poster-only.** It never auto-starts and never
 *   auto-fetches; the visitor can still press play, and flipping the preference
 *   at runtime pauses whatever is running. Reduced motion therefore costs zero
 *   bytes as well as zero movement.
 * - **Pausable** (WCAG 2.2.2). A loop runs indefinitely, which is exactly the
 *   content that rule exists for, so the toggle is required rather than a
 *   nicety.
 *
 * Mount by giving the wrapper `data-video-band`, the media `data-video` and the
 * control `data-video-toggle`. `data-video-title` on the wrapper is optional:
 * with several loops on one page, four buttons all named "Play" are four
 * indistinguishable controls in a screen-reader's control list, so the title is
 * folded into the button's accessible name while its visible label stays the
 * one word.
 */
export function initVideoLoops(selector = '[data-video-band]'): void {
  for (const band of document.querySelectorAll<HTMLElement>(selector)) {
    // Both components import this module, and Astro may run it once per
    // component on a page carrying both. Binding twice would double every
    // listener.
    if (band.dataset.videoLoopBound === 'true') continue;
    band.dataset.videoLoopBound = 'true';

    const video = band.querySelector<HTMLVideoElement>('[data-video]');
    const toggle = band.querySelector<HTMLButtonElement>('[data-video-toggle]');
    if (!video) continue;

    const title = band.dataset.videoTitle;
    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)');

    const sync = () => {
      if (!toggle) return;
      const playing = !video.paused;
      const word = playing ? 'Pause' : 'Play';
      toggle.textContent = word;
      toggle.setAttribute('aria-pressed', String(playing));
      // Not "${word} the ${title} loop" — most of these headings already open
      // with an article, and it announced as "Pause the the course is built".
      if (title) toggle.setAttribute('aria-label', `${word}: ${title}`);
    };

    // `preload="none"` means this call is also what first fetches the file.
    const play = () => void video.play().catch(() => {});
    const pause = () => video.pause();

    video.addEventListener('play', sync);
    video.addEventListener('pause', sync);
    toggle?.addEventListener('click', () => (video.paused ? play() : pause()));

    const io = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (reduced.matches) continue;
          if (entry.isIntersecting) play();
          else pause();
        }
      },
      { threshold: 0.25 },
    );
    io.observe(video);

    reduced.addEventListener('change', (event) => {
      if (event.matches) pause();
    });

    sync();
  }
}
