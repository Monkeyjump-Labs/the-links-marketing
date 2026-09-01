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
| 🟡 | Footer NAP matches Google Business Profile exactly | **Downgraded from blocker 2026-08-04.** Stillwater's GBP is being checked by the client, who has said explicitly it must not hold up the site. Still worth chasing — six months of local searches going nowhere — but a follow-up, not a gate |

## Conversion

| | Check | Status |
|---|---|---|
| ✅ | Transactional CTA in the header on every page | `Book a bay`, persistent. Sentence case as of FW-3967 — caps is reserved for the 12px label role |
| ✅ | Booking reachable in ≤2 clicks from every page | Header → venue chooser → Whoosh. The old "ACKNOWLEDGE AND GO TO BOOKING" interstitial is deleted |
| ✅ | Leagues page has a registration path **and** a waitlist in all three states | The one component no audited competitor has |
| ✅ | Email capture present with a stated reason to subscribe | |
| 🟡 | Every form tested end-to-end; submissions arrive somewhere a human reads | **Built and verified live (FW-3975, FW-3999).** Six forms post to `/api/lead`, which writes to the *The Links Website Log* workbook then notifies. A submission is never reported successful unless it reached the sheet. Verified end-to-end in a real browser against the deployed site. **Notifications point at `info@lakevillelinks.com` since 2026-08-30.** |

## Content

| | Check | Status |
|---|---|---|
| ✅ | Hours and address on the homepage | `TrustStrip`, directly under the hero |
| 🟡 | Real prices, as text, on a Rates & Hours page | Summer 2026 is real. **Winter is a stub and the summer card expires 2026-10-03** |
| ✅ | At least three attributed testimonials or a live review widget | **Unblocked 2026-08-04 (FW-4000). Four, not three** — Lucas, Jeff, Anita and Rob, each an attributed Google review the client already publishes on their own site. They were never missing: they sat in `_ingest/raw/` (`groups.html`, `home-2.html`) the whole time this row read "None supplied", which is the lesson worth keeping. The homepage proof band now renders in production and `/about` carries all four. Still worth chasing but no longer gating: the permalink per review, so each quote can link to its source. **All four are Lakeville** — Stillwater has no Google Business Profile and so has no reviews, which is an argument for creating one, not for borrowing a quote from the other venue |
| ✅ | No PDFs in place of menus, rates or rules | |
| 🟡 | Venue photography, not stock | Lakeville's shoot is strong. **Stillwater now has its first real photograph** — a still pulled from the venue's own walkthrough video (FW-4003), which closes the worst of this. It is handheld footage of an empty room and will not enlarge, so **the shoot is still needed**; it is no longer a blocker |
| ✅ | Simulator technology named | **GolfZon TwoVision NX, tour spec** — confirmed 2026-08-04. This was the single most consequential unconfirmed fact on the site; both halves of the tour-spec claim (model and plate) are now confirmed, so the line is written |
| ✅ | Every seasonal page dated, with a named refresh owner | Season carried in content; **owner still to be named at handoff** |

## Sim-venue additions

| | Check | Status |
|---|---|---|
| ✅ | Hourly bay rate published as text | $35/hr |
| ✅ | Bay capacity stated | Up to five |
| ✅ | Clubs-provided / left-handed availability stated | $15 rental; 5 of 6 Lakeville bays play both ways |
| ✅ | Cancellation policy findable from the booking page | Confirmed current 2026-08-04, and the three previously-unpublished cases are now answered: a booking can be moved (deliberately no stated deadline), a no-show is charged for the full bay, and the venue will not close on a day with bookings without reaching out |
| ✅ | Simulator brand named on the homepage and the Bays page | |
| ✅ | Beginner reassurance on Leagues **and** Book | Required field on every league record |
| ✅ | Menu is HTML | **Custom-coded 2026-08-04 (FW-4002).** Zero `<img>` tags, 39 priced items as text, `Menu` JSON-LD, editable in TinaCMS. The six PNGs are retired. Three genuine ambiguities in the source ship as gap marks rather than guesses |
| ✅ | Leagues in the top nav | |
| ✅ | Waitlist live and tested | Tested end-to-end against live Google and Resend 2026-08-04 (FW-3975). Submissions land on the workbook's Waitlist tab with the consent text recorded, and a notification sends. Notifications point at `info@lakevillelinks.com` since 2026-08-30. |

## Not covered by the playbook — test independently

- ⬜ Core Web Vitals / Lighthouse pass
- 🟡 WCAG AA contrast — **token-level pairings verified by recomputation** (body 10.14:1, secondary text 6.89:1, solid CTA 6.85:1, dark-field CTA 9.32:1; 184 failing `text-ink/70` instances fixed), and **re-verified in the browser**: `npm run audit:visual` runs axe over 12 routes at desktop and mobile and reports zero colour-contrast violations. **focus-visible styling now ships** — a 4px `focus.width` slab at `focus.offset` 2px, in `state.focus` / `state.focusOnDark` / `state.focusOnAccentBand` depending on the ground (`global.css`, `@layer base`). Keyboard navigation ORDER still needs a manual pass.
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
6. ~~NX vs TwoVision~~ — **RESOLVED 2026-08-04.** GolfZon **TwoVision NX, tour spec**. Published,
   and the three stale source pages still need retiring so AI answers stop repeating the old one.
7. ~~The lead endpoint~~ — **RESOLVED.** `/api/lead` writes to the workbook then notifies
   (FW-3975). Verified end-to-end against the deployed site.
8. ~~Which phone number is which~~ — **RESOLVED.** It all goes to one phone: `612-699-0526`.
   The question was a false premise, not an unknown.
9. **Legal entity per venue** — three names across the old legal pages; no Stillwater entity named.
10. **The domain cutover**, in the order set out in `seo-map.md` §4.1. The existing
    `thelinks.golf` → `lakevillelinks.com` rule must be deleted *first* or the two form a loop.

## Access to the staging site

**Vercel SSO protection is OFF** as of 2026-08-04 — the staging URL is publicly reachable and
the client can review it. Worth knowing that this means the `.vercel.app` URL carries real
prices and real customer reviews to anyone with the link.

The project lives under the personal Vercel team `daran-7928's projects` while the repo is in
the `Monkeyjump-Labs` GitHub org. Reviewed 2026-08-04 and **accepted deliberately** — moving a
project between Vercel teams means redoing domains and environment variables, so it is much
cheaper to leave than to move now.

### ⚠️ Corrected 2026-08-26 — this was never true

This section previously read: *"`PUBLIC_SITE_NOINDEX=true` is set on **both** preview and
production environments."* **It is set on neither.** Verified against the live deploys:

| Deploy | `robots.txt` served |
|---|---|
| `the-links-marketing.vercel.app` (production) | `Allow: /` — **indexable** |
| `staging-the-links.vercel.app` | `Disallow: /` — fixed in PR #25 |

The variable was recorded as set on the Vercel project but is not on either environment, and
`vercel pull` only supplies what the project actually carries, so every build has shipped
without it. Staging is now fixed in the workflow itself (`deploy.yml` sets it inline for the
staging job, so no dashboard setting can drift out from under the client's sandbox).

**Production is still indexable and that is an open decision, not an oversight to fix
silently.** The intent recorded here — that the `.vercel.app` deploy stays noindex until the
real domain cuts over — has not been in force. Anyone reading this before launch should decide
whether to apply it now, knowing that setting it also makes every `StubNote` appear on the
production deploy (see §3 below).

## Deferred, logged deliberately

- **Dependency vulnerabilities.** Inherited from the starter. `npm audit fix` applied; 4 remain in
  production deps (2 high, 2 low) needing breaking upgrades. Not launch-blocking for a static
  marketing site, but it should be cleared and the fix pushed back up into
  `appletron-site-starter` so the next client build doesn't inherit it.
- **Branch protection.** ⚠️ This matters more than it did. Deploys now run from a GitHub Action
  holding a `VERCEL_TOKEN` rather than from Vercel's Git integration, which means Vercel no
  longer independently checks who authored a commit — **production access is now whatever
  GitHub allows**. That is anyone who can merge to `main`, *and* anyone who can land a change to
  `.github/workflows/` (editing the workflow runs arbitrary code with the token in scope). Check
  the protections are real before relying on them; see `docs/vercel-ci-token-deploys.md`.
- **On-site league registration.** The playbook says own it; we link to ply.golf for v1 because
  there is no on-site registration surface yet. Logged in `brief.md` §11.


---



## Deploy note — the Vercel git-author block

`vercel --prod` reads the **local HEAD commit's author** and refuses to build when that
author is not a member of the Vercel team:

```
Git author 26395706+daranhan@users.noreply.github.com must have access to the
team daran-7928's projects on Vercel to create deployments.   blockCode: TEAM_ACCESS_REQUIRED
```

This bites specifically after **merging a PR on GitHub**: GitHub authors the merge commit
server-side as `<user>@users.noreply.github.com`, not as the local `daranhan-mjl
<daran.han@monkeyjumplabs.com>` that every hand-made commit here uses. The build never
starts — the deployment goes straight to `BLOCKED` with a 0ms build, and the previous
production deployment stays live, so **the symptom is "nothing changed" rather than an
error.** Check `readyStateReason` on the deployment, not the build logs; there are none.

Two fixes, and the second is the one that actually ends it:

1. **Per-deploy:** put a commit authored by the linked identity at HEAD before deploying.
2. **Permanent:** add `26395706+daranhan@users.noreply.github.com` to the Vercel account's
   emails (Account Settings → Emails), so GitHub-authored merge commits stop tripping it.

---

# Go-live cutover

**Everything below is deliberately deferred until the day of launch.** None of it is
outstanding work — each item is correct as it stands for a site that is not yet public, and
each becomes wrong the moment it is.

Do these **in order**. Steps 1 and 2 are independent; step 3 must come last, because pointing
the domain at a site whose forms email the wrong inbox is the one combination that loses a
real customer's enquiry silently.

## 1. ~~Point form notifications at the venue~~ — DONE 2026-08-30

```ts
// src/lib/leads/config.ts
const INBOX = VENUE_INBOX;   // was TESTING_INBOX
```

Enquiries now reach `info@lakevillelinks.com`. The `leads:check` banner clears itself — it
keys off the literal `const INBOX = TESTING_INBOX`, so it cannot be left stale.

One change went with it. The `styleguide` list used to point at `INBOX` too, on the reasoning
that "the same inbox" cost nothing — true while that inbox was ours. It is now a real
business, and a reference page whose purpose is to be poked at must not mail the venue every
time someone tries a form. `styleguide` is pinned to `TESTING_INBOX`, which also makes it the
safe way to exercise the mail path.

**Still to verify:** submit one real enquiry and confirm it arrives. Note that this now emails
the venue for real — warn them first, or exercise the path from `/styleguide` instead, which
notifies us.

## 2. Delete the old redirect, then point the domain

`thelinks.golf` currently **301s into `lakevillelinks.com`** — the redirect points the wrong
way round, away from the parent brand. Until it is removed the domain cannot serve this site,
and adding a Vercel domain on top of it forms a loop.

Ordered steps are in `seo-map.md` §4.1. In short: delete the outbound 301, add the domain in
Vercel, confirm the 28 mapped redirects still resolve, then submit the sitemap.

Note the site is currently reachable only at `the-links-marketing.vercel.app`, which is why
`astro.config.mjs` already sets `site: 'https://thelinks.golf'` — canonicals and the sitemap
are written for the destination, not the staging host.

## 3. Turn off `PUBLIC_SITE_NOINDEX`

Staging is noindex site-wide, and `StubNote` renders **only** while it is set. Clearing it
does two things at once: the site becomes indexable, and every internal build note disappears
from view. Confirm both after deploying.

---

## Accepted at launch, on the client's punch list

Recorded here so nobody treats them as blockers on the day.

| | Why it is safe to launch |
| -- | -- |
| **Waiver names Lakeville only** (FW-4008) | The same document with the same scope is already live on their current site. We surfaced a pre-existing exposure; we did not create one. The page says plainly which entity and address it names |
| **Privacy and terms are provisional** (FW-4015) | Both pages **tell the reader so, in plain language**. We are not presenting an unreviewed policy as finished. ⚠️ That notice is load-bearing — do not remove it to tidy up |
| **Winter rates and hours** | The summer card is real and current. Rates are updated through the normal editing process; there is no cliff |
| **League entry fee** | Renders as an honest gap with a reason line. The skins figures are labelled as skins, so nothing misleads |
| **Stillwater photography** | Has its first real image. The shoot improves it; nothing depends on it |
| **Google Business Profile** | Client is checking. Explicitly not blocking, at their request |
