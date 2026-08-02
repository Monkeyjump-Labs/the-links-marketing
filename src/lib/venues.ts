import { getCollection, type CollectionEntry } from 'astro:content';

export type Venue = CollectionEntry<'venues'>;
export type VenueScope = 'lakeville' | 'stillwater' | 'both';

const DAY_ORDER = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'] as const;
export type Day = (typeof DAY_ORDER)[number];

/** Venues in display order. The switcher, the footer and the schema all use this. */
export async function getVenues(): Promise<Venue[]> {
  const venues = await getCollection('venues');
  return venues.sort((a, b) => a.data.order - b.data.order);
}

export async function getVenue(slug: string): Promise<Venue | undefined> {
  return (await getVenues()).find((v) => v.data.slug === slug);
}

/** True when an item scoped to `scope` should show for `venueSlug`. */
export function appliesTo(scope: VenueScope, venueSlug?: string): boolean {
  if (!venueSlug) return true;
  return scope === 'both' || scope === venueSlug;
}

/** "12:00" -> "12pm", "21:00" -> "9pm", "10:30" -> "10:30am" */
export function formatTime(t?: string): string {
  if (!t) return '';
  const [hRaw, mRaw] = t.split(':');
  const h = Number(hRaw);
  const m = Number(mRaw ?? 0);
  const suffix = h >= 12 ? 'pm' : 'am';
  const h12 = h % 12 === 0 ? 12 : h % 12;
  return m === 0 ? `${h12}${suffix}` : `${h12}:${String(m).padStart(2, '0')}${suffix}`;
}

export interface HoursRow {
  day: Day;
  closed: boolean;
  opens?: string;
  closes?: string;
}

/** Hours in Mon–Sun order, with any missing day treated as closed. */
export function orderedHours(venue: Venue): HoursRow[] {
  return DAY_ORDER.map((day) => {
    const row = venue.data.hours.find((h) => h.day === day);
    return row ? { ...row, day } : { day, closed: true };
  });
}

/**
 * Collapse consecutive identical days: "Mon–Fri 3pm–9pm", "Sat 10am–10pm".
 * Used in the trust strip and the footer where a 7-row table is too heavy.
 */
export function summariseHours(venue: Venue): string[] {
  const rows = orderedHours(venue);
  const out: string[] = [];
  let runStart = 0;

  const same = (a: HoursRow, b: HoursRow) => a.closed === b.closed && a.opens === b.opens && a.closes === b.closes;

  for (let i = 1; i <= rows.length; i++) {
    if (i < rows.length && same(rows[i], rows[runStart])) continue;

    const first = rows[runStart];
    const last = rows[i - 1];
    const label = runStart === i - 1 ? first.day : `${first.day}–${last.day}`;
    out.push(first.closed ? `${label} closed` : `${label} ${formatTime(first.opens)}–${formatTime(first.closes)}`);
    runStart = i;
  }
  return out;
}

/** schema.org `openingHours` strings, e.g. "Mo-Fr 15:00-21:00". */
export function schemaOpeningHours(venue: Venue): string[] {
  const abbr: Record<Day, string> = { Mon: 'Mo', Tue: 'Tu', Wed: 'We', Thu: 'Th', Fri: 'Fr', Sat: 'Sa', Sun: 'Su' };
  return orderedHours(venue)
    .filter((r) => !r.closed && r.opens && r.closes)
    .map((r) => `${abbr[r.day]} ${r.opens}-${r.closes}`);
}

export function venuePath(venue: Venue): string {
  return `/locations/${venue.data.slug}/`;
}

/** "17630 Juniper Path Suite H, Lakeville, MN 55044" — must match the GBP exactly. */
export function formatAddress(venue: Venue): string {
  const d = venue.data;
  return `${d.streetAddress}, ${d.addressLocality}, ${d.addressRegion} ${d.postalCode}`;
}

/** tel: href — digits only, US country code. */
export function telHref(phone: string): string {
  const digits = phone.replace(/\D/g, '');
  return `tel:+1${digits.length === 11 && digits.startsWith('1') ? digits.slice(1) : digits}`;
}
