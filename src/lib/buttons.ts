/**
 * The one button recipe, shared by `BookButton` and by the handful of links
 * that are visually buttons but are not the Book action (so they must not
 * carry its analytics attribute or its "opens Whoosh" affordance).
 *
 * Every value here binds a token. Two things are load-bearing:
 *
 * 1. **The variant names a GROUND, not a look.** `primary`/`outline` are for
 *    LIGHT fields; `onDark` and `ghostDark` are for midnight. This is not a
 *    styling preference — an ember fill on midnight measures 2.35:1
 *    (`rules.noEmberOnDark`), so on dark the action colour inverts to an amber
 *    fill with midnight ink at 9.48:1 both directions.
 * 2. **Hover is a token, never an opacity.** `hover:opacity-90` fades the
 *    label along with the fill; ember's darkness was picked so its brightened
 *    form still clears 4.91:1 (`rules.hoverIsComputed`).
 *
 * `radius.control` (3px) is the ONLY radius on the site — the whole of the
 * client-requested softening. Panels, cells and media slots stay square.
 */
export type ButtonSize = 'sm' | 'md' | 'lg';
export type ButtonVariant = 'primary' | 'outline' | 'onDark' | 'ghostDark';

/**
 * **Buttons are sentence case.** They were `uppercase tracking-label`, which put
 * the header's `BOOK A BAY` in caps while every in-page CTA written with ad-hoc
 * classes was sentence case — a split nobody had decided, just a leftover.
 * Resolved 2026-08-03 (FW-3967 §"Three decisions for the human"): the system
 * reserves caps for the 12px label role, so a capitalised button was borrowing a
 * treatment that means "this is a label, not a sentence".
 *
 * `tracking-label` went with it. Wide tracking is PART of the caps treatment —
 * kept on sentence case it reads as a spacing defect rather than as emphasis —
 * so the recipe takes `tracking-display`, the display face's normal step. Caps
 * now survives in exactly one place on the site: `caps-label`.
 */
const BASE =
  'inline-flex items-center justify-center gap-s3 min-h-tap rounded-control border-rule ' +
  'font-display font-bold tracking-display leading-label text-center ' +
  'transition-colors duration-fast ease-standard';

const SIZES: Record<ButtonSize, string> = {
  sm: 'px-s5 py-s3 text-label',
  md: 'px-s6 py-s4 text-body',
  lg: 'px-s7 py-s5 text-score-md',
};

const VARIANTS: Record<ButtonVariant, string> = {
  // Light grounds: solid ember, paper label — 6.85:1.
  primary:
    'bg-primary border-primary text-surface hover:bg-emberHover hover:border-emberHover active:bg-emberActive active:border-emberActive',
  // Light grounds, secondary: navy outline — 13.31:1.
  outline: 'bg-transparent border-ink text-ink hover:bg-ink hover:text-white',
  // Dark grounds: amber fill, midnight ink — 9.48:1 in both directions.
  onDark: 'bg-amber border-amber text-midnight font-extrabold hover:bg-white hover:border-white',
  // Dark grounds, secondary: paper outline — 16.09:1.
  ghostDark: 'bg-transparent border-paper text-paper hover:bg-paper hover:text-midnight',
};

export function buttonClasses(size: ButtonSize = 'md', variant: ButtonVariant = 'primary'): string {
  return `${BASE} ${SIZES[size]} ${VARIANTS[variant]}`;
}
