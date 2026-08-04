# Client answers — 2026-08-04

Answers to `client-intake-email.md`, given by **Daran (runs marketing for The Links)** rather
than the venue. Most of the intake list is now closed.

**This file is the authority.** Where it contradicts `truth-audit.md`, `brief.md` or a
`PendingTag` in the code, this wins and the other should be updated to match. Where a decision
is deliberately vague, that vagueness is the decision — do not "improve" it.

Still outstanding at the bottom.

---

## 1. Hours — CLOSED

Publish the hours already in the content collections; they are right.

**Holiday closures: publish Memorial Day, Independence Day and Labor Day as closed, regardless
of where they fall this year.** The intake draft worried that Labor Day (7 Sept) sits inside
the published schedule — publish the closure anyway. It is a standing annual closure, not a
one-off.

## 2. Rates — CLOSED

**No hard cutover.** Rates are updated later through the normal editing process, so the site
does not need to defend a date. Publish the **30 September** figure for now.

This retires the "critical deadline" framing in the intake draft — it was our inference from
two contradictory dates on their site, and it is not how they operate.

## 3. Leagues — build to last year's spec, DISABLED

Source documents (Lakeville; none of them mention Stillwater):

| Season | Nights | Weeks | Format | Skins |
| -- | -- | -- | -- | -- |
| 2025 Fall | Mon **and** Thu, 6–10pm — *combined*, 8 teams | 10 (wk of 10/6 → 12/15), 8 regular + 2 playoff | 2-person best-shot scramble against the field | **$64/team, gross** |
| 2025 Fall | Tue **and** Wed, 6–10pm | 10 (wk of 10/6 → 12/15), 8 regular + 2 playoff | 2-person team-vs-team match play, best ball, handicapped | **$64/team, net and gross** |
| 2026 Winter | Mon / Thu, 6–10pm — *each night separate* | 14 (wk of 1/12 → 4/13), 12 regular + 2 playoff | 2-person best-shot scramble against the field | **$48/team, gross** |
| 2026 Winter | Tue / Wed, 6–10pm — *each night its own league* | 14 (wk of 1/12 → 4/13), 12 regular + 2 playoff | 2-person team-vs-team match play, best ball, handicapped | **$96/team, net and gross** |

Shared rules across all four: men off the **white** tees (**gold** at 65+), women off **red**;
mulligans need opponent approval; subs must be in the system with name, mobile and email (plus a
handicap screenshot for the handicapped leagues) and may sub for any team; a missing partner
means you play both balls, signing the absent player in as a guest.

**Render these as last season's spec, visibly disabled, with "check back for the updated 2026
fall schedule."** They are shown so a returning player can see the shape of what is coming —
they are not registerable.

> ⚠️ **The dollar figures above are SKINS buy-ins, not league entry fees.** Every document says
> "Skins — to be paid at beginning of the season, $X per team". None of them states the league
> entry fee. Do not present these as the price of joining a league. That number is still unknown
> — see Outstanding.

## 4. Lessons — CLOSED

No prices. The page becomes a **reach-out for more information**, routed through the form/email
flow (`/api/lead`), not a price list.

## 5. Cancellation — CLOSED, and deliberately vague in one place

- The published policy is **still current** (free cancellation 48h+ ahead; inside 48h you may be
  charged for the full bay).
- **A booking can be moved.** Wording stays deliberately loose: *let us know as soon as you can.*
  **Do not invent a deadline for changes** — the vagueness is intentional.
- **No-shows are charged for the full bay.**
- **If the venue closes:** they reserve the right to, and **will not close on a day with
  bookings without reaching out first.**

## 6. Phone — CLOSED

Use the number listed on the **Greater Stillwater Chamber** site: **612-699-0526**.

**It all goes to one phone.** So the "which number rings the Stillwater desk" question was a
false premise — there is no separate desk line.

➡️ Remove the `phoneNote` / `PendingTag` from `stillwater.json`. Nothing is pending any more.

## 7. Simulators — CLOSED, and this resolves the biggest open question on the site

**GolfZon TwoVision NX — the latest model, and they are tour spec.**

This ends the NX-vs-TwoVision contradiction that `simulators.astro`, `truth-audit.md` and the
ship gate all flag as the single most consequential unconfirmed fact. Both halves of the
tour-spec claim are now confirmed (model **and** plate), so the tour-spec line can be written.

**TrackMan and Full Swing:** name them **only** inside content arguing why GolfZon is better,
framed as our opinion. Not as a neutral "what else you'll see around the Twin Cities" aside,
which is how the page currently uses them.

## 8. Stillwater opened — CLOSED

**February 2026.** "Early 2026" remains fine as general phrasing.

## 9. Menu — custom-code it

The print/site hours mismatch will be fixed on the print side. For the site: **do not transcribe
the PNGs into a plain table — custom-code the menu and make it visually excellent.** Treat it as
a design surface, not a data dump.

## 10. Gift cards — CLOSED

**Purposefully vague.** Carry the existing copy across as-is. Do not chase whether they cover
food and drink.

## 11. Photography — partially closed

Client will share photos and discuss a shoot. Stillwater's empty `MediaSlot` stays honest until
frames arrive.

## 12. Google Business Profile — DO NOT BLOCK ON IT

Being checked. **It must not hold up the site.** The ship gate's 🔴 on footer-NAP-matches-GBP
should be downgraded from a blocker to a follow-up.

## 13. Memberships / LinksFlex — CLOSED, and it changes the page's argument

- **LinksFlex Anytime costs more on purpose — it is an IN-SEASON promo.** Our page holds it back
  on the grounds that it costs more per hour than walking in. That reasoning was wrong: it is
  priced for in-season demand, and the **Summer Monthly** membership is the summer answer.
  Revisit whether to publish Anytime, with that framing.
- **The member must be present to use it.**
- **Guests: yes, members can bring guests.** This closes the contradiction the page currently
  carries a `PendingTag` for. Remove the tag and state it plainly.
- **Additional hours are purchased at normal rates** unless specified elsewhere.

## 14. Voice — CLOSED

**Fun, welcoming, light humour — nothing too far.**

Our current voice was assumed, and `SUBPAGE-EXPLORATION`/`brief.md` describe it as "confident,
warm, not stuffy". This is warmer and funnier than what is on the site today, so **the copy
review has a brief now**: the pages read accurate and slightly austere, and they should be more
fun without becoming jokey.

## 15. Juniors — CLOSED

**Nothing running for now.** Do not build a junior programme page beyond what exists.

## 16. Logos and brand assets — placeholders

Use placeholders. Assets come later. **Anything worth stripping from the current live site,
take it.** The favicon is still the retired Lakeville Links badge, so every share preview shows
the old brand.

---

## Assets received

Promo video, from the client directly (better than the Squarespace HLS rendition on their live
site):

| File | Size | Likely use |
| -- | -- | -- |
| `Lakeville Links Video Ad.mp4` | 8 MB | homepage hero background |
| `Lakeville Links Video Ad 2.mp4` | 6 MB | alternate cut |
| `walk through stillwater.mp4` | 11 MB | **the first real Stillwater footage we have** |

Move into the repo, **cut down as needed** — a hero background wants a short silent loop, not a
full ad.

> The Stillwater walkthrough matters beyond the hero: Stillwater has no photography at all, and
> its `MediaSlot` is drawn deliberately unlit because of it. Stills pulled from this video may be
> the first honest imagery that venue can have.

---

## Copy to bring back from the current live site

Decided after the copy comparison. All of it is the client's own material.

- **Their main headline** → reuse on our landing hero.
- **Instructor bios** — Tamara's and Nick's philosophies and contact details. We reduced four
  coaches with personality to a list of names.
- **The founders' story** from `/our-story` — first-person, genuinely charming, and better than
  anything we would write. Matches the newly-stated voice.
- **The attributed Google reviews** (e.g. *"The simulator was unlike any I have used before,
  very realistic. Very unique place!" — Lucas*). ➡️ **This may unblock the testimonials ship-gate
  item**, which we have been treating as blocked on the client. They are already published and
  attributed on their own site.
- **Stillwater's own positioning** — "Your New Local Clubhouse on the East-Side", the Stillwater
  Bowl food partnership, floating and fixed day leagues. Our Stillwater page is the only one
  *shorter* than theirs.
- **The operational-honesty line** — *"If there are no pre-booked bay times, we reserve the right
  to open late or close early."*
- **The policy page** — theirs is 1768 words to our 625. Restore what we dropped.

---

## Still outstanding

- **League ENTRY fee** — the docs give skins buy-ins only. Unknown.
- **Stillwater leagues** — every league document is Lakeville. Unknown whether Stillwater runs any.
- **Events / group pricing** — never answered. Still rendered as *Quoted · Ask us*, which the
  client has not contradicted, so it stands.
- **Google Business Profile for Stillwater** — being checked, not blocking.
- **Photography** — shoot to be discussed.
- **Logo artwork and favicon** — placeholders for now.
