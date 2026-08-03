/**
 * The typesetting of a labelled cell, in one place.
 *
 * `ReadoutCell` (a fact) and `GapCell` (the absence of one) MUST set their value
 * slot identically. That is the whole load-bearing idea of the gap system:
 *
 *   > Every gap is typeset exactly like the filled cell beside it — the label
 *   > stays, the value slot holds an em-dash at the NEIGHBOURING VALUE'S SIZE, a
 *   > status word sits on its baseline, and a reason line goes underneath.
 *   > (SUBPAGE-EXPLORATION.md §"The gap system, as converged")
 *
 * Two components each carrying their own copy of that map is how they drift, and
 * a gap that is a size step off its neighbour reads as an unfinished page rather
 * than as a deliberate mark. So the map lives here and both import it.
 */
export type ReadoutSize = 'xl' | 'md' | 'name' | 'text';
export type ReadoutTone = 'light' | 'dark';

/**
 * The value slot at each step.
 *
 * `xl`/`md` take the `scoreboard` treatment (tabular, lining, expanded, 800)
 * because published figures are the brand's proof. `name` is a value that is
 * WORDS rather than a figure — a product, a technology — and takes the display
 * face, since tabular figures on a word are noise. `text` is a short sentence.
 */
export const READOUT_VALUE: Record<ReadoutSize, string> = {
  xl: 'scoreboard text-score-xl leading-score',
  md: 'scoreboard text-score-md leading-score',
  name: 'font-display text-card leading-display font-bold tracking-display',
  text: 'text-small leading-body',
};

/**
 * The label tone names the GROUND, because the muted label colour differs by it
 * and getting it wrong is an arithmetic failure, not a preference:
 *   light → ink.mutedOnLight  6.87:1 on white
 *   dark  → ink.mutedOnDark   5.48:1 on midnight (MIDNIGHT ONLY — 4.16:1 on
 *           navy, which is why muted text never appears in a hoverable row)
 */
export const READOUT_LABEL: Record<ReadoutTone, string> = {
  light: 'text-inkMuted',
  dark: 'text-slate',
};

export const READOUT_VALUE_TONE: Record<ReadoutTone, string> = {
  light: 'text-ink',
  dark: 'text-white',
};

/** The two marks that occupy the value slot. The third, `PendingTag`, rides beside it. */
export type GapState = 'notSet' | 'quoted';

export const GAP_WORD: Record<GapState, string> = {
  notSet: 'Not yet set',
  quoted: 'Ask us',
};

/**
 * Ground, label and value for a gap mark, resolved TOGETHER — because the tint
 * is a ground change and picking the three independently is how slate lands on
 * navy at 4.16:1, which is the trap three of four design agents hit.
 *
 * Shared by `GapCell` and by `HeroStrip` (a strip slot can hold a gap), so the
 * two cannot drift into two different answers to the same question.
 *
 * Measured:
 *   notSet  light   inkMuted on greige     5.29:1
 *   notSet  dark    screenLight on navy    8.42:1   <- NOT slate, which is 4.16:1
 *   quoted  light   ember on white         7.45:1   · label inkMuted 6.87:1
 *   quoted  dark    amber on midnight      9.48:1   · label slate    5.48:1
 *
 * `notSet` is tinted and colourless: an absence is not an event. `quoted` is
 * untinted and takes the ground's action colour, because it is not an absence at
 * all — it is a decision to give the number on request. Form carries the
 * distinction; colour only ever signals which ground you are on.
 */
export const GAP_STYLE: Record<GapState, Record<ReadoutTone, { tint: string; label: string; value: string }>> = {
  notSet: {
    light: { tint: 'bg-greige', label: 'text-inkMuted', value: 'text-inkMuted' },
    dark: { tint: 'bg-navy', label: 'text-screen', value: 'text-screen' },
  },
  quoted: {
    light: { tint: '', label: 'text-inkMuted', value: 'text-ember' },
    dark: { tint: '', label: 'text-slate', value: 'text-amber' },
  },
};
