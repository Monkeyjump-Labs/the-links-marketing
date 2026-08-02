# Ship Gate — The Links

> Website Studio artifact · **Phase 5** · 2026-08-02 · slug `the-links`
> Source: `fareway-brain/marketing/websites/_playbook/playbook-core.md` §10 + `playbook-sim-venue.md` §7.
> **A build does not go live until every line is true.** Status reflects the staging draft.

Legend: ✅ done · 🟡 built but stubbed pending client data · ⬜ not started · 🔴 blocked on a third party

---

## Findability

| | Check | Status |
|---|---|---|
| ✅ | Server-rendered HTML contains copy, nav, NAP and hours | Astro static output; zero-JS by default |
| ✅ | `LocalBusiness` (or subtype) schema validates | Two entities, `SportsActivityLocation` + `BarOrPub` for Lakeville; Stillwater carries `containedInPlace` → Stillwater Bowl |
| 🟡 | `Event` schema on every league and event | Component ships; emits nothing until leagues have real `startDate`s — deliberately, rather than invalid markup |
| ✅ | Unique `<title>` with geo cue + unique meta description on every page | From `seo-map.md`; all ≤60 chars with a town in them |
| ✅ | Exactly one `<h1>` per page | |
| ✅ | `robots.txt` declares the sitemap and blocks no AI crawler | Generated per-environment; staging serves `Disallow: /` |
| 🔴 | Footer NAP matches Google Business Profile exactly | **Stillwater appears to have no GBP at all** — see blockers |

## Conversion

| | Check | Status |
|---|---|---|
| ✅ | Transactional CTA in the header on every page | `Book a Bay`, persistent |
| ✅ | Booking reachable in ≤2 clicks from every page | Header → venue chooser → Whoosh. The old "ACKNOWLEDGE AND GO TO BOOKING" interstitial is deleted |
| ✅ | Leagues page has a registration path **and** a waitlist in all three states | The one component no audited competitor has |
| ✅ | Email capture present with a stated reason to subscribe | |
| ⬜ | Every form tested end-to-end; submissions arrive somewhere a human reads | **`PUBLIC_LEAD_ENDPOINT` is not configured.** Forms currently degrade to `mailto:`. This must be wired and tested before launch |

## Content

| | Check | Status |
|---|---|---|
| ✅ | Hours and address on the homepage | `TrustStrip`, directly under the hero |
| 🟡 | Real prices, as text, on a Rates & Hours page | Summer 2026 is real. **Winter is a stub and the summer card expires 2026-10-03** |
| ⬜ | At least three attributed testimonials or a live review widget | None supplied. We will not ship unsourced quotes |
| ✅ | No PDFs in place of menus, rates or rules | |
| 🟡 | Venue photography, not stock | Lakeville's shoot is strong. **Stillwater has one usable frame** — a pre-opening phone night shot |
| ✅ | Simulator technology named | GolfZon NX — pending the NX-vs-TwoVision confirmation below |
| ✅ | Every seasonal page dated, with a named refresh owner | Season carried in content; **owner still to be named at handoff** |

## Sim-venue additions

| | Check | Status |
|---|---|---|
| ✅ | Hourly bay rate published as text | $35/hr |
| ✅ | Bay capacity stated | Up to five |
| ✅ | Clubs-provided / left-handed availability stated | $15 rental; 5 of 6 Lakeville bays play both ways |
| 🟡 | Cancellation policy findable from the booking page | **Stub — the window is unknown.** Top pre-booking objection in the segment |
| ✅ | Simulator brand named on the homepage and the Bays page | |
| ✅ | Beginner reassurance on Leagues **and** Book | Required field on every league record |
| 🟡 | Menu is HTML | Structure ships; **the six menu PNGs still need transcribing** |
| ✅ | Leagues in the top nav | |
| ⬜ | Waitlist live and tested | Renders correctly; untested end-to-end until the lead endpoint exists |

## Not covered by the playbook — test independently

- ⬜ Core Web Vitals / Lighthouse pass
- 🟡 WCAG AA contrast — **token-level pairings verified by recomputation** (body 10.14:1, secondary text 6.89:1, solid CTA 6.85:1, dark-field CTA 9.32:1; 184 failing `text-ink/70` instances fixed). Keyboard navigation and focus-visible styling still need a pass.
- ⬜ Mobile rendering on a real device

---

## Launch blockers not in our control

1. **Stillwater has no Google Business Profile.** The current site's own map link resolves to the
   bowling alley. Six months of local search history already lost. Schema supports a GBP; it does
   not substitute for one. *This is the highest-value single action on the list and it is not a
   website task.*
2. **Winter rates and winter hours.** The published rate dies 2026-10-03. Hard date.
3. **Stillwater's real hours.** Not recoverable from the old site — the source page shows one
   schedule under two venue headings (`_ingest/_corrections.md` §2).
4. **The adult league lineup.** The site's most valuable page is a structural shell until this
   arrives, and we are launching into league-registration season.
5. **A Stillwater photo shoot.**
6. **NX vs TwoVision.** Live pages contradict each other and **AI answers are already repeating
   the wrong one**. Retiring the three stale source pages is necessary but not sufficient — the
   correct fact has to be published and crawled.
7. **The lead endpoint.** Every form on the site is inert without it.
8. **Which phone number is which** — three are in circulation, one with a `tel:` mismatch.
9. **Legal entity per venue** — three names across the old legal pages; no Stillwater entity named.
10. **The domain cutover**, in the order set out in `seo-map.md` §4.1. The existing
    `thelinks.golf` → `lakevillelinks.com` rule must be deleted *first* or the two form a loop.

## Access to the staging site

**Vercel SSO protection is ON** (`all_except_custom_domains`), so the staging URL returns a 302
to anyone who is not signed in to the Vercel account. **The client cannot review it in this
state** — disable Vercel Authentication on the project, or add password protection, before
sharing. Attempting to disable it programmatically was blocked.

The project also currently lives under the personal Vercel team `daran-7928's projects` while the
repo is in the `Monkeyjump-Labs` GitHub org. Worth moving before handoff.

`PUBLIC_SITE_NOINDEX=true` is set on **both** preview and production environments — deliberate,
because even the `.vercel.app` production deploy is staging until the real domain cuts over.
**Removing it is a launch step.**

## Deferred, logged deliberately

- **Dependency vulnerabilities.** Inherited from the starter. `npm audit fix` applied; 4 remain in
  production deps (2 high, 2 low) needing breaking upgrades. Not launch-blocking for a static
  marketing site, but it should be cleared and the fix pushed back up into
  `appletron-site-starter` so the next client build doesn't inherit it.
- **Branch protection** is not enabled on the repo. Turn it on at handoff.
- **On-site league registration.** The playbook says own it; we link to ply.golf for v1 because
  there is no on-site registration surface yet. Logged in `brief.md` §11.
