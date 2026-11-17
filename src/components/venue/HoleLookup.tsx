import { useEffect, useMemo, useState } from 'react';

/**
 * GolfZon hole-data lookup. Search a course, see every hole: par, handicap
 * (HCP) and the distance from each of the five tees.
 *
 * Data is `public/data/golfzon-holes.json`, fetched on first render rather than
 * bundled, so the page's JS stays small. Source and caveats are on the page
 * itself (`src/pages/golfzon-hole-data.astro`).
 *
 * Distances are stored in METRES (that is how GolfZon Global stores them) and
 * converted to yards here, so the two can never disagree.
 */

type Hole = [hole: number, par: number, hcp: number | null, ...tees: (number | null)[]];
interface Course {
  id: string;
  n: string;
  c: string;
  par: number | null;
  /** Course totals in metres: Black, Blue, White, Yellow, Red. */
  t: (number | null)[];
  nines: { n: string; h: Hole[] }[];
}

const TEES = ['Black', 'Blue', 'White', 'Yellow', 'Red'] as const;
const MAX_RESULTS = 40;

const norm = (s: string) => s.toLowerCase().replace(/[^a-z0-9]+/g, '');
const toYd = (m: number) => Math.round(m * 1.0936133);

const chip =
  'min-h-tap cursor-pointer rounded-control border-rule border-navy px-s4 py-s2 text-small font-semibold aria-pressed:bg-navy aria-pressed:text-white bg-white text-navy';

export default function HoleLookup() {
  const [courses, setCourses] = useState<Course[] | null>(null);
  const [failed, setFailed] = useState(false);
  const [query, setQuery] = useState('');
  const [country, setCountry] = useState('');
  const [selected, setSelected] = useState<Course | null>(null);
  const [nineIdx, setNineIdx] = useState(0);
  const [unit, setUnit] = useState<'yd' | 'm'>('yd');

  useEffect(() => {
    fetch('/data/golfzon-holes.json')
      .then((r) => {
        if (!r.ok) throw new Error(String(r.status));
        return r.json();
      })
      .then((d: Course[]) => setCourses(d))
      .catch(() => setFailed(true));
  }, []);

  const countries = useMemo(() => (courses ? [...new Set(courses.map((c) => c.c))].sort() : []), [courses]);

  const matches = useMemo(() => {
    if (!courses) return [];
    const q = norm(query);
    return courses.filter((c) => (!country || c.c === country) && (!q || norm(c.n).includes(q)));
  }, [courses, query, country]);

  const dist = (m: number | null) => (m == null ? '–' : unit === 'yd' ? toYd(m) : m);
  const sum = (vals: (number | null)[]) =>
    vals.some((v) => v == null) ? null : vals.reduce<number>((a, v) => a + (v as number), 0);

  if (failed) {
    return (
      <p role="alert" className="border-l-slab border-accent pl-s4 text-body text-inkBody">
        The course data did not load. Refresh the page to try again.
      </p>
    );
  }
  if (!courses) return <p className="text-body text-inkMuted">Loading courses…</p>;

  const nine = selected?.nines[Math.min(nineIdx, (selected?.nines.length ?? 1) - 1)];

  return (
    <div>
      <div className="flex flex-col gap-s4 sm:flex-row">
        <div className="flex-1">
          <label htmlFor="hl-search" className="text-label caps-label text-inkMuted">
            Course name
          </label>
          <input
            id="hl-search"
            type="search"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Try “Pebble” or “St Andrews”"
            autoComplete="off"
            className="mt-s2 min-h-tap w-full min-w-0 rounded-control border-rule border-navy bg-white px-s4 py-s3 text-body text-navy placeholder:text-inkMuted"
          />
        </div>
        <div className="sm:w-56">
          <label htmlFor="hl-country" className="text-label caps-label text-inkMuted">
            Country
          </label>
          <select
            id="hl-country"
            value={country}
            onChange={(e) => setCountry(e.target.value)}
            className="mt-s2 min-h-tap w-full rounded-control border-rule border-navy bg-white px-s4 py-s3 text-body text-navy"
          >
            <option value="">All countries</option>
            {countries.map((c) => (
              <option key={c} value={c}>
                {c}
              </option>
            ))}
          </select>
        </div>
      </div>

      <p className="mt-s4 text-small text-inkMuted" aria-live="polite">
        {matches.length} of {courses.length} courses
        {matches.length > MAX_RESULTS ? ` — showing the first ${MAX_RESULTS}, type more to narrow` : ''}
      </p>

      <ul className="mt-s3 grid gap-s2 sm:grid-cols-2">
        {matches.slice(0, MAX_RESULTS).map((c) => (
          <li key={c.id}>
            <button
              type="button"
              aria-pressed={selected?.id === c.id}
              onClick={() => {
                setSelected(c);
                setNineIdx(0);
              }}
              className="min-h-tap w-full cursor-pointer border-rule border-ink/20 bg-white px-s4 py-s3 text-left text-body text-ink aria-pressed:border-navy aria-pressed:bg-paper"
            >
              <span className="font-semibold">{c.n}</span>
              <span className="block text-small text-inkMuted">
                {c.c} · {c.nines.reduce((a, x) => a + x.h.length, 0)} holes{c.par ? ` · par ${c.par}` : ''}
              </span>
            </button>
          </li>
        ))}
      </ul>

      {selected && nine && (
        <section className="mt-s9" aria-labelledby="hl-course">
          <h2 id="hl-course" className="text-section font-extrabold leading-display tracking-display-tight text-ink">
            {selected.n}
          </h2>
          <p className="mt-s2 text-body text-inkMuted">
            {selected.c} · {selected.nines.reduce((a, x) => a + x.h.length, 0)} holes
            {selected.par ? ` · par ${selected.par}` : ''}
          </p>

          <div className="mt-s5 flex flex-wrap items-center gap-s3">
            {selected.nines.length > 1 &&
              selected.nines.map((x, i) => (
                <button
                  key={x.n}
                  type="button"
                  aria-pressed={i === nineIdx}
                  onClick={() => setNineIdx(i)}
                  className={chip}
                >
                  {x.n}
                </button>
              ))}
            <span className="grow" />
            <button type="button" aria-pressed={unit === 'yd'} onClick={() => setUnit('yd')} className={chip}>
              Yards
            </button>
            <button type="button" aria-pressed={unit === 'm'} onClick={() => setUnit('m')} className={chip}>
              Meters
            </button>
          </div>

          <div className="mt-s4 overflow-x-auto" tabIndex={0} role="region" aria-label={`${selected.n} hole data`}>
            <table className="w-full min-w-max text-right text-body tabular-nums">
              <caption className="sr-only">
                {selected.n}, {nine.n}: par, handicap and distance in {unit === 'yd' ? 'yards' : 'meters'} from each tee
              </caption>
              <thead>
                <tr className="border-b-2 border-ink/20 text-small">
                  <th scope="col" className="py-s2 pr-s4 text-left">
                    Hole
                  </th>
                  <th scope="col" className="py-s2 pr-s4">
                    Par
                  </th>
                  <th scope="col" className="py-s2 pr-s4">
                    HCP
                  </th>
                  {TEES.map((t) => (
                    <th key={t} scope="col" className="py-s2 pr-s4 last:pr-0">
                      {t}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {nine.h.map((h) => (
                  <tr key={h[0]} className="border-b border-ink/10">
                    <th scope="row" className="py-s2 pr-s4 text-left font-semibold">
                      {h[0]}
                    </th>
                    <td className="py-s2 pr-s4">{h[1]}</td>
                    <td className="py-s2 pr-s4 text-inkMuted">{h[2] ?? '–'}</td>
                    {TEES.map((t, i) => (
                      <td key={t} className="py-s2 pr-s4 last:pr-0">
                        {dist(h[3 + i])}
                      </td>
                    ))}
                  </tr>
                ))}
              </tbody>
              <tfoot>
                <tr className="border-t-2 border-ink/20 font-semibold">
                  <th scope="row" className="py-s2 pr-s4 text-left">
                    {nine.n}
                  </th>
                  <td className="py-s2 pr-s4">{sum(nine.h.map((h) => h[1]))}</td>
                  <td className="py-s2 pr-s4" />
                  {TEES.map((t, i) => {
                    const total = sum(nine.h.map((h) => h[3 + i]));
                    return (
                      <td key={t} className="py-s2 pr-s4 last:pr-0">
                        {total == null ? '–' : dist(total)}
                      </td>
                    );
                  })}
                </tr>
              </tfoot>
            </table>
          </div>
          <p className="mt-s3 text-small text-inkMuted">
            HCP is the hole’s stroke-index (1 = hardest). A dash means GolfZon has no value for that hole.
          </p>
        </section>
      )}
    </div>
  );
}
