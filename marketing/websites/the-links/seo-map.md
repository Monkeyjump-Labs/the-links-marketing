# SEO & Local-SEO Map — The Links (Lakeville + Stillwater)

> Website Studio artifact · **Phase 1 (Search architecture)** · 2026-08-02 · slug `the-links`
> Canonical domain: **`https://thelinks.golf`** (apex). Today `lakevillelinks.com` is canonical and
> `thelinks.golf` 301s *into* it — this document assumes that redirect is reversed.
> Companions: `brief.md`, `current-site-audit.md`, `_ingest/operating-facts.md`, `_ingest/_corrections.md`.
> Playbook: [`playbook-core.md`](../../../../fareway-brain/marketing/websites/_playbook/playbook-core.md) ·
> [`playbook-sim-venue.md`](../../../../fareway-brain/marketing/websites/_playbook/playbook-sim-venue.md).

## How to read this document

**Placeholder tokens** (`{{LIKE_THIS}}`) mark operating data the client has not supplied. They are
**not** rhetorical — they are literal strings that must be present in the built components so CI can
grep for them. **A `{{TOKEN}}` remaining in a production build is a ship-blocker.** The client has not
supplied winter hours, winter rates, league pricing, group pricing, instruction pricing, or
Stillwater's true hours (`brief.md` §10).

**No search volumes appear in this document.** No verified keyword-volume source was available for this
engagement. Priority is ranked qualitatively — **High / Med / Low** — and every ranking is an
**estimate** based on (a) the audit corpus, (b) live SERP inspection on 2026-08-02, and (c) the
business's own conversion priority in `brief.md` §2. Do not present these as measured demand.

**Nothing here fabricates a metric, a ranking, or a review count.** Where a competitor is named it is
because they appeared in a live search on 2026-08-02; no position, traffic, or authority number is
claimed for any of them.

---

## 0. What the SERP actually looks like (verified 2026-08-02)

Live searches run while building this map. These are observations, not rankings.

| Query run | Who appeared | Read |
|---|---|---|
| `indoor golf Lakeville MN` | Yelp, Facebook, visitlakeville.org, playgolfindoors.com, **Swing Lab Performance Golf** (TrackMan, 20721 Holyoke Ave), **Ernie Rose Golf**, lakevillelinks.com | The Links ranks, but **directories and aggregators outrank or flank it**. Two direct Lakeville competitors exist. |
| `golf simulator Stillwater MN` | GolfNow, Yelp, discoverstillwater.com, TwinCitiesGolf, **Applewood Hills**, greatplacesminnesota.com, **stillwatergolfsimulator.com** (TrackMan), **GolfSimMap**, lakevillelinks.com | The Links of Stillwater surfaces **only through third parties**. A competitor owns the exact-match domain `stillwatergolfsimulator.com`. |
| `indoor golf leagues Twin Cities winter simulator league` | TwinCitiesGolf (two dedicated league directory pages), X-Golf Eden Prairie, Inside Edge, Mulligan's, BIRDI Golf, Northfield GC, SCN Golf | **TwinCitiesGolf.com owns this query** with directory pages. Every named competitor publishes league detail; The Links publishes "check back." |
| `corporate event golf simulator Twin Cities private party` | X-Golf Eden Prairie (capacity 75), Mulligan's, Inside Edge, Dryvebox, Los Virtuality | Competitors publish **capacity numbers**; The Links publishes "groups of 12 or more" with no numbers. |
| `how much does a golf simulator cost per hour Minnesota` | Columbia Golf Simulator ($45–$50/hr, published by day-part), Mulligan's ("from $25/hr"), Ernie Rose ($39/hr), The Golf Garage rates page, MyGolfSpy | **The cost query is answered by whoever publishes a rate card.** The Links' rate goes dark 2026-10-03. |
| `indoor golf near Woodbury Oakdale Hudson WI` | **The ParT Barn** (Lake Elmo, 9 GolfZon), **X-Golf Woodbury**, **BIRDI Golf** (GolfZon, Woodbury), Back Nine Golf (Hudson WI) | Stillwater's competitive set is **dense and GolfZon-equipped**. "We have GolfZon" is not a differentiator in the east metro; "GolfZon **NX**" and "4 bays inside Stillwater Bowl" are. |

### The finding that should change the build order

The AI-generated summaries returned on those searches describe Lakeville Links as **"6 Golfzon
TwoVision simulators"** — the *retired* technology. That claim lives on `/home-2`, `/home-old`, and
`/news/golfzon-twovision`, all of which are live, indexed, and being read as current. Third-party
directories echo it (`_ingest/operating-facts.md` §2).

The crawlers are already allowed in (`_corrections.md` §1). The problem is not access — **the site is
actively teaching answer engines a fact that is false.** That is why five URLs in §4 get a `410`, not
a `301`: a redirect preserves the page's history, a `410` asks for its removal.

---

## 1. Keyword & intent map

### 1.1 Geography — the two markets are not one market

The Links is **two local businesses that share a brand**, ~40 miles apart across the metro. They do
not compete for the same searcher and should almost never share a ranking target.

| | Lakeville | Stillwater |
|---|---|---|
| Metro position | **South metro**, Dakota County | **East metro**, Washington County |
| Own geo modifiers | Lakeville · Apple Valley · Burnsville · Farmington · Rosemount · Prior Lake · Elko New Market · "south metro" · Dakota County | Stillwater · Oak Park Heights · Bayport · Lake Elmo · Mahtomedi · Afton · Hudson WI · "east metro" · Washington County · St. Croix Valley |
| Shared umbrella modifiers | "Twin Cities" · "Minneapolis" · "St. Paul" · "MN" — used on **both-venue** pages only | ← |
| Named local rivals seen 2026-08-02 | Swing Lab Performance Golf, Ernie Rose Golf, X-Golf Apple Valley, Mulligan's Eagan | The ParT Barn (Lake Elmo), X-Golf Woodbury, BIRDI Golf, Applewood Hills, stillwatergolfsimulator.com, Back Nine Golf (Hudson WI) |
| Copy note | Client's own line, keep it: *"Your south metro clubhouse"* | Client's own line, keep it: *"Your east metro clubhouse"* |

> **Rule applied — `playbook-core.md` §7:** *"`<title>` with a geographic cue … 56% of sim venues have
> no geo cue in the title."* Every title in §2 carries one. On venue-specific pages the cue is that
> venue's **town**; on both-venue pages it is both towns or "Twin Cities".

**Do not build a `/indoor-golf-apple-valley` style doorway page per suburb.** Neighbouring-town terms
are earned by the two location pages through address proximity, `areaServed`, and body copy — not by
thin duplicated pages. `playbook-core.md` §3: *"small-and-complete beats large-and-thin."*

### 1.2 The canonical sitemap, and how it maps to today's URLs

`playbook-sim-venue.md` §3 gives 14 pages. The brief used slightly different slugs; the playbook slugs
win, because they match the labels the market already uses. Two location pages are added — required by
the two-venue architecture in `current-site-audit.md` §5, and the audit's central competitive finding:
**across 7 audited multi-location peers, not one ships correct per-location schema.**

| Canonical URL | Playbook name | Brief called it | Nav |
|---|---|---|---|
| `/` | Home | `/` | logo |
| `/book` | Book a Bay | `/booking*` | header button |
| `/rates` | Rates & Hours | `/rates` | top |
| `/leagues` | Leagues & Competitions | `/leagues` | **top — non-negotiable** |
| `/memberships` | Memberships | `/memberships` | top |
| `/events` | Events & Parties | `/groups` | top |
| `/food-and-drink` | Food & Drink | `/menu` | top |
| `/lessons` | Lessons & Practice | `/instruction` | footer |
| `/juniors` | Juniors & Camps | — | footer |
| `/simulators` | The Bays | — | footer |
| `/about` | About Us | `/about` + `/our-story` | footer |
| `/contact` | Contact & Hours | `/contact` | top |
| `/gift-cards` | Gift Cards | `/gift-cards` | footer |
| `/faq` | FAQ | `/faq` | footer |
| `/locations/lakeville` | *(two-venue addition)* | ✓ | **Locations, top** |
| `/locations/stillwater` | *(two-venue addition)* | ✓ | **Locations, top** |

Support URLs outside the 14 (redirect targets, not ranking targets, `noindex` not required but no
keyword assigned): `/gallery`, `/policies`, `/policies/linksflex-terms`, `/policies/membership-terms`.

**Top nav (7 max, per `playbook-sim-venue.md` §3):**
`Locations · Rates & Hours · Leagues · Memberships · Events · Food & Drink · Contact` + persistent
**Book a Bay** button.

### 1.3 The map

Intent codes: **N** navigational (branded) · **I** informational · **C** commercial-investigation ·
**T** transactional. Priority is a **qualitative estimate** (see "How to read this document").

---

#### `/` — Home
| | |
|---|---|
| **Primary** | `indoor golf Twin Cities` *(C · High — est.)* |
| **Secondary** | `golf simulator near me` *(C · High — est.)* · `the links golf` *(N · Med — est., the brand's new name)* · `lakeville links` *(N · High — est., the brand's **old** name and still the dominant branded term)* · `indoor golf Minnesota` *(C · Med — est.)* |
| **Intent** | Mixed. Two distinct arrivals: the branded searcher who knows "Lakeville Links" and must land somewhere that confirms the rebrand, and the cold "golf simulator near me" searcher who must be told *which two towns* within one screen. |
| **Notes** | Hero is **location-neutral** per audit §5; the geography lives in the subhead and the trust strip. `playbook-core.md` §4: trust strip (hours, address, phone) immediately under the hero — *67% of this segment has no hours on the homepage.* The homepage must carry **both** venues' hours, not one. |
| **Trap** | `lakeville links` outranks `the links` in branded demand today and will for a year. The homepage must contain the string "Lakeville Links" in body copy (in the About/rebrand line) so the brand-transition query resolves here. Do **not** purge the old name from the site. |

#### `/book` — Book a Bay
| | |
|---|---|
| **Primary** | `book golf simulator Twin Cities` *(T · Med — est.)* |
| **Secondary** | `book a bay lakeville mn` *(T · Low–Med — est.)* · `golf simulator tee time stillwater` *(T · Low–Med — est.)* · `indoor golf reservation MN` *(T · Low — est.)* |
| **Intent** | Transactional, already decided. This page ranks for very little and is not supposed to. |
| **Notes** | `playbook-sim-venue.md` §4: no marketing interstitial; the button says where it goes (**"Book on Whoosh →"**). The page must answer the four pre-booking objections in crawlable text — what an hour costs, how many fit in a bay, are clubs provided, **and the cancellation window** (*"the top pre-booking objection and almost never answered"*). The 48-hour cancellation policy and the **Lakeville pays-at-venue vs Stillwater prepay-in-full** split are currently disclosed only on the vendor interstitial (`operating-facts.md` §10) — publish both here. |
| **Trap** | Two Whoosh clubs, two flows. The venue chooser is the SEO-safe pattern; **never** a header button hardcoded to one venue (audit §5). |

#### `/rates` — Rates & Hours
| | |
|---|---|
| **Primary** | `golf simulator cost per hour Minnesota` *(C · **High** — est.; the single most answerable high-intent query in the segment)* |
| **Secondary** | `indoor golf prices Twin Cities` *(C · Med — est.)* · `indoor golf hours Lakeville MN` *(I · Med — est.)* · `golf simulator rates Stillwater MN` *(C · Med — est.)* · `how much is indoor golf MN` *(I · Med — est.)* |
| **Intent** | Screening. Answer question 2 of the visitor's five (`playbook-core.md` §2) — *"the single biggest gap in the market."* |
| **Notes** | `playbook-sim-venue.md` §4: *"Only ~25% of the segment publishes findable prices at all — publishing them is a differentiator, not a risk."* Verified live: Columbia, Mulligan's, Ernie Rose and The Golf Garage all publish rate cards and all surfaced on the cost query. **Rates and hours ship on one page** (`playbook-core.md` §3). |
| **Blocking gaps** | `{{WINTER_RATE_LAKEVILLE}}` · `{{WINTER_RATE_STILLWATER}}` · `{{LAKEVILLE_HOURS}}` · `{{STILLWATER_HOURS}}` · `{{WINTER_HOURS_LAKEVILLE}}` · `{{WINTER_HOURS_STILLWATER}}`. The current site's only rate expires **2026-10-03**, nine weeks out. |
| **Trap** | Do **not** create `/rates-winter` alongside `/rates`. The reference site `onthegreen-golf.com` runs `/rates` and `/rates-summer` simultaneously, contradictory, one orphaned (audit §5). **One page, a season-labelled column per venue**, per `playbook-core.md` §8: *"every date-bearing page carries a season or year."* |

#### `/leagues` — Leagues & Competitions
| | |
|---|---|
| **Primary** | `indoor golf leagues Twin Cities` *(C · **High** — est.; verified as a live, contested, directory-dominated query)* |
| **Secondary** | `winter golf league Minnesota` *(C · High — est.)* · `golf simulator league Lakeville MN` *(C · Med — est.)* · `indoor golf league Stillwater MN` *(C · Low–Med — est., near-zero local supply)* · `golf leagues near me` *(C · Med — est.)* |
| **Intent** | Commercial-investigation with a hard seasonal spike (Sep–Jan). The highest-value page of the year and the one the site currently cannot perform at all (`brief.md` §2). |
| **Notes** | Full spec: `playbook-core.md` §5, all nine required elements in order. Segment benchmarks to beat: *46% of league pages never explain the format; 50% don't state a price; 46% have neither a registration form nor a link; only 33% reassure beginners; only 39% show standings.* **Waitlist is mandatory in all three registration states** — across all 126 audited sites, *exactly zero* offered one. |
| **Structure** | One page per **topic**, venue as a dimension (audit §5): a venue-prefixed row per league, not `/leagues/lakeville` + `/leagues/stillwater`. Each league gets its own `Event` block (§3.5). |
| **Blocking gaps** | `{{LEAGUE_LINEUP}}` · `{{LEAGUE_FORMAT}}` · `{{LEAGUE_NIGHT}}` · `{{LEAGUE_PRICE}}` · `{{LEAGUE_SEASON_DATES}}` — per venue. Segment reference for sanity-checking whatever the client returns: observed league pricing runs **median $60, p25 $40, p75 $250** (`playbook-sim-venue.md` §4). |
| **Trap** | `TwinCitiesGolf.com` runs two dedicated league directory pages and surfaced above every venue on the live query. **Get listed there** — that is a link/citation task, not an on-page task, and it is probably the cheapest league-traffic win available. |

#### `/memberships` — Memberships
| | |
|---|---|
| **Primary** | `indoor golf membership Twin Cities` *(C · Med — est.)* |
| **Secondary** | `golf simulator membership Minnesota` *(C · Med — est.)* · `LinksFlex` *(N · Low — est., but zero competition and a real differentiator)* · `prepaid golf simulator hours MN` *(C · Low — est.)* · `unlimited indoor golf membership MN` *(C · Low–Med — est.)* |
| **Intent** | Commercial-investigation, retention-side. |
| **Notes** | `playbook-sim-venue.md` §4: tiers as cards, one marked recommended; state hours restrictions, guest policy, whether the member must be present, commitment length, **and how to cancel**. Observed segment pricing: **median $195/mo, p25 $50, p75 $299** — The Links' $149/$199 sits inside that band. |
| **Content debt** | Prices are currently **inside a JPEG**. `playbook-core.md` §8: *"Prices are text, not images."* Transcription exists in `operating-facts.md` §4 — re-confirm with the client before publishing. |
| **Blocking gaps** | `{{MEMBERSHIP_CANCELLATION}}` · `{{LINKSFLEX_ANYTIME_PRICE}}` (the Anytime tier currently prices **above** the walk-up rate — a repricing decision, not a copy fix) · `{{LINKSFLEX_STILLWATER}}` (LinksFlex is Lakeville-only today; state it or extend it). |

#### `/events` — Events & Parties
| | |
|---|---|
| **Primary** | `corporate event golf simulator Twin Cities` *(C · **High** — est.; highest revenue per visit, `playbook-sim-venue.md` §4)* |
| **Secondary** | `golf simulator birthday party MN` *(C · Med — est.)* · `bachelor party golf simulator Twin Cities` *(C · Med — est.)* · `holiday party venue Lakeville MN` *(C · Med — est., strongly seasonal Nov–Dec)* · `private event space Stillwater MN` *(C · Low–Med — est.)* |
| **Intent** | Commercial-investigation by a planner, not a golfer. Long consideration, high ticket. |
| **Notes** | Lead with the **lead-capture form**, not 1,500 words of packages. Publish **capacity as a number** — X-Golf Eden Prairie publishes "up to 75 guests" and surfaced on the live query; The Links has a real number to use (*"6 bays and room for up to 36 golfers"*, `operating-facts.md` §7) and currently buries it. |
| **Blocking gaps** | `{{GROUP_PRICING}}` · `{{EVENT_MINIMUM_SPEND}}` · `{{BUYOUT_PRICE_LAKEVILLE}}` · `{{BUYOUT_PRICE_STILLWATER}}` · `{{EVENT_LEAD_TIME}}` · `{{STILLWATER_EVENT_CAPACITY}}`. The reference site publishes $399/$699/$1,599 packages; The Links publishes "groups of 12 or more" with no numbers (audit §1). |

#### `/food-and-drink` — Food & Drink
| | |
|---|---|
| **Primary** | `indoor golf with food and drinks Lakeville MN` *(C · Med — est.)* |
| **Secondary** | `golf simulator bar Twin Cities` *(C · Med — est.)* · `Lakeville MN sports bar` *(C · Low–Med — est.)* · `pizza and golf Lakeville` *(C · Low — est.)* · `full bar indoor golf MN` *(C · Low–Med — est.)* |
| **Intent** | Reassurance + the F&B-first buyer. `playbook-sim-venue.md` §1: *"a hospitality business that happens to sell golf."* |
| **Notes** | **HTML menu, never a PDF or PNG** (`playbook-core.md` §8). The current `/menu` is 72 characters of text plus six PNGs with `alt=""` — invisible to search, to AI, and to a screen reader. Full OCR transcription is in `operating-facts.md` §8; **re-confirm every price with the client before publishing** — the graphic itself contains two conflicting Breakfast Bowl descriptions. |
| **Two-venue rule** | Lakeville has its own kitchen and bar. Stillwater's F&B is **via Stillwater Bowl & Lounge**. Say so plainly rather than implying one menu. `{{STILLWATER_MENU_STATUS}}`. |
| **Also unresolved** | `{{CARD_SURCHARGE_STATUS}}` — a 3% credit-card surcharge appears only on the menu graphic and nowhere in the booking flow. |

#### `/lessons` — Lessons & Practice
| | |
|---|---|
| **Primary** | `golf lessons Lakeville MN` *(C · Med — est.)* |
| **Secondary** | `indoor golf lessons Twin Cities` *(C · Med — est.)* · `winter golf lessons Minnesota` *(C · Med — est., seasonal)* · `PGA golf instructor south metro MN` *(C · Low–Med — est.)* · `golf swing evaluation MN` *(C · Low — est.)* |
| **Intent** | Commercial-investigation, high trust threshold. |
| **Notes** | `playbook-sim-venue.md` §4: broaden beyond "lessons" — offer a **lighter entry point** ("book a swing evaluation") because a package commitment converts worse. Instructor credentials are genuinely strong here (a Class A PGA professional, a state Hall of Fame coach, two varsity head coaches) and are a real E-E-A-T asset; keep the credential detail in crawlable text. |
| **Blocking gaps** | `{{LESSON_PRICING}}` — four coaches, four personal email addresses, zero prices today. The reference site positions a **free trial lesson** under a $495 package; The Links publishes nothing. `{{STILLWATER_INSTRUCTION}}`. |

#### `/juniors` — Juniors & Camps
| | |
|---|---|
| **Primary** | `junior golf league Lakeville MN` *(C · Low–Med — est.)* |
| **Secondary** | `youth indoor golf Twin Cities` *(C · Low–Med — est.)* · `high school golf winter training MN` *(C · Med — est., a real parent query in Jan–Mar)* · `junior golf camp south metro` *(C · Low — est.)* |
| **Intent** | Parent-buyer, seasonal (Nov–Mar), decided by format + price + schedule. |
| **Notes** | The existing junior league content is genuinely good and genuinely specific (8 weeks, 2-person best-ball match play, boys/girls divisions, flighted, $250/person) — it is simply **five months expired and still in the present tense**. `playbook-core.md` §8: date it and name a refresh owner. Each season gets an `Event` block (§3.5). |
| **Blocking gaps** | `{{JUNIOR_AGE_RANGE}}` — the site says 12–18 in one place and 13–18 in another · `{{JUNIOR_SEASON_2027}}` · `{{JUNIOR_PRICE}}`. |

#### `/simulators` — The Bays
| | |
|---|---|
| **Primary** | `GolfZon NX simulator Minnesota` *(C/I · Low–Med — est., but high-quality intent)* |
| **Secondary** | `GolfZon vs TrackMan` *(I · Med — est.)* · `best golf simulator Twin Cities` *(C · Med — est.)* · `moving swing plate golf simulator` *(I · Low — est.)* · `left handed golf simulator Lakeville` *(I · Low — est., a real question nobody answers)* |
| **Intent** | Informational, high-consideration golfer. Also the page that must **correct the record**. |
| **Notes** | `playbook-core.md` §8: *"Name the simulator technology. 42% of sim venues don't. TrackMan, Full Swing, and GolfZon are search terms with real volume and real credibility weight."* Verified 2026-08-02: the east metro rival set is GolfZon-heavy (The ParT Barn, BIRDI Golf) — so **"GolfZon" alone is table stakes there; "GolfZon NX" is the differentiator.** The two Lakeville rivals are TrackMan, which makes the comparison query worth answering honestly on-page. |
| **Blocking gaps** | `{{SIM_TECH_LAKEVILLE}}` — NX vs TwoVision is contradicted across live pages and is the exact false fact AI engines are currently repeating (§0) · `{{COURSE_COUNT}}` · `{{STILLWATER_BAY_HANDEDNESS}}` · `{{STILLWATER_TV_COUNT}}`. Confirmed and usable today: Lakeville 6 bays, 5 of 6 both-handed, 9 TVs, balls included, rental sets $15. |

#### `/about` — About Us
| | |
|---|---|
| **Primary** | `the links golf lakeville stillwater` *(N · Med — est.)* |
| **Secondary** | `lakeville links rebrand` *(N · Low — est., but this is the page that resolves the name change)* · `who owns lakeville links` *(N/I · Low — est.)* · `indoor golf lakeville since 2022` *(I · Low — est.)* |
| **Intent** | Navigational + trust. |
| **Notes** | Merge today's `/about` (facility facts) and `/our-story` (voice). The `/our-story` voice is the best writing on the site — *"six feet of Minnesota sadness"*, *"Apparently having multiple locations means you're supposed to look professional or something"* — and matches `playbook-sim-venue.md` §2's *"warm and slightly irreverent beats premium and serious."* Keep it verbatim. |
| **Carries** | The press citations (TwinCitiesGolf ×3, Sun ThisWeek) migrated off the retired `/news` shell, and the bay-sponsor strip (Align, Thor, Von Hanson, Miller, Kretsch) — real local proof, currently on an orphan asset page. `#press` and `#sponsors` anchors are redirect targets in §4. |

#### `/contact` — Contact & Hours
| | |
|---|---|
| **Primary** | `the links indoor golf phone number` *(N · Low–Med — est.)* |
| **Secondary** | `indoor golf Lakeville address` *(N · Low — est.)* · `The Links Stillwater directions` *(N · Low–Med — est.)* · `indoor golf near me open now` *(I · Med — est.)* |
| **Intent** | Navigational/logistics. This is the **local SEO anchor page** (`playbook-sim-venue.md` §4). |
| **Notes** | Both NAPs, both maps, both full weekly schedules, parking guidance for both, one form with a venue selector. `playbook-core.md` §7: *"NAP in the footer, identical character-for-character to the Google Business Profile."* Today three phone numbers are in circulation and one `tel:` link dials the wrong one. |
| **Blocking gaps** | `{{STILLWATER_PHONE}}` (0526 vs 0527, unresolved) · `{{STILLWATER_EMAIL}}` · `{{PARKING_LAKEVILLE}}` · `{{PARKING_STILLWATER}}`. |

#### `/gift-cards` — Gift Cards
| | |
|---|---|
| **Primary** | `golf gift card Twin Cities` *(T · Low–Med — est., sharply seasonal Nov–Dec)* |
| **Secondary** | `indoor golf gift certificate MN` *(T · Low–Med — est.)* · `golf gift ideas Minnesota` *(C · Low — est.)* · `check gift card balance the links` *(N · Low — est.)* |
| **Intent** | Transactional, gift-buyer — frequently **not a golfer**, which is exactly the segment's core insight. |
| **Notes** | Two vendors are currently in play (Square on live pages, Toast on an orphaned homepage). Pick one, state denominations, state whether one card works at both venues. `{{GIFT_CARD_DENOMINATIONS}}` · `{{GIFT_CARD_CROSS_VENUE}}`. |

#### `/faq` — FAQ
| | |
|---|---|
| **Primary** | `do you need clubs for a golf simulator` *(I · Med — est.)* |
| **Secondary** | `how long does 18 holes take on a simulator` *(I · Med — est.)* · `how many people fit in a golf simulator bay` *(I · Med — est.)* · `is indoor golf good for beginners` *(I · Med — est.)* · `indoor golf cancellation policy` *(I · Low–Med — est.)* |
| **Intent** | Purely informational — and the **AEO engine of the site**. Full question set in §5. |
| **Notes** | `playbook-core.md` §7: *"`FAQPage` schema on the FAQ page. 4% of the corpus has it."* Google has narrowed FAQ *rich results* to authoritative health/government sites, so treat `FAQPage` as an **answer-engine and extraction asset**, not a SERP-decoration play. That is still the right reason to ship it. |

#### `/locations/lakeville` — The Links of Lakeville
| | |
|---|---|
| **Primary** | `indoor golf Lakeville MN` *(C · **High** — est.; verified contested)* |
| **Secondary** | `golf simulator Lakeville MN` *(C · High — est.)* · `indoor golf south metro Minneapolis` *(C · Med — est.)* · `golf simulator Apple Valley / Burnsville / Farmington MN` *(C · Med — est.)* · `indoor golf Dakota County` *(C · Low — est.)* · `lakeville links` *(N · High — est.)* |
| **Intent** | The money query. Local-pack + organic, dominated by proximity and Google Business Profile strength. |
| **Notes** | Carries this venue's NAP, geo, hours, phone, photos, `LocalBusiness` JSON-LD (§3.2), booking deep-link, and the venue's own leagues/events summary. `playbook-core.md` §7: exactly one `<h1>`, carrying the page's actual promise. This page is where the site finally competes with Swing Lab and Ernie Rose on their own term. |
| **Trap** | Directories (Yelp, playgolfindoors, visitlakeville, GolfSimMap) flank this query. **Citation consistency across those listings matters as much as the page does** — see §5.4. |

#### `/locations/stillwater` — The Links of Stillwater
| | |
|---|---|
| **Primary** | `indoor golf Stillwater MN` *(C · **High** — est.; and the largest single gap between demand and current supply on this site)* |
| **Secondary** | `golf simulator Stillwater MN` *(C · High — est.)* · `Stillwater Bowl golf simulators` *(N/C · Med — est., a genuinely useful co-location term)* · `indoor golf east metro MN` *(C · Med — est.)* · `golf simulator Oak Park Heights / Bayport / Lake Elmo` *(C · Low–Med — est.)* · `indoor golf Washington County MN` *(C · Low — est.)* · `indoor golf near Hudson WI` *(C · Low–Med — est.)* |
| **Intent** | The money query for the east metro. |
| **Notes** | Today this venue is **one untitled, meta-less page with an empty `href`, the wrong phone number, and zero photography of the actual venue** (audit §1). It is also six months old with no `LocalBusiness` markup, so **Stillwater does not exist to search engines at all.** |
| **Trap 1** | A competitor owns the exact-match domain `stillwatergolfsimulator.com`. Exact-match domains are weak ranking signals now, but they are strong *click* signals — the title and description in §2 have to work harder here than anywhere else on the site. |
| **Trap 2** | The footer's Stillwater map link resolves to the **Stillwater Bowl & Lounge** Google listing, not a Links listing. If no separate GBP exists, **creating one is the highest-ROI single action in this entire document** (§5.4). `{{STILLWATER_GBP_URL}}`. |
| **Blocking gaps** | `{{STILLWATER_HOURS}}` · `{{STILLWATER_PHONE}}` · `{{STILLWATER_PHOTOGRAPHY}}` — none exists · `{{STILLWATER_CAPACITY}}`. |

### 1.4 Keywords deliberately not targeted

| Term | Why not |
|---|---|
| `topgolf twin cities`, `x-golf woodbury` | Competitor-brand terms. Low conversion, brand-risk, and the segment does not reward it. |
| `golf simulator for sale` / `home golf simulator` | Wrong buyer entirely. Ensure the `/simulators` copy does not drift into product-review language. |
| `mini golf Lakeville`, `driving range MN` | Different product; attracts a visitor who will bounce. |
| `indoor golf Minneapolis` as a *primary* | Neither venue is in Minneapolis. Use it as a **secondary umbrella** term on both-venue pages only. Claiming it as primary is the geo-cue mistake the playbook warns about, inverted. |
| Per-suburb doorway pages | See §1.1. |

---

## 2. Per-page metadata — ready to paste

All titles ≤60 characters **with a geographic cue** (`playbook-core.md` §7). All descriptions 70–155
characters and unique (*"20% of sim venues have none at all"*). Character counts are exact for titles.

> **Convention:** em-dash separator, brand last where it fits. Do **not** append a global
> `| The Links` suffix in the layout — it pushes several titles past 60. Titles here are complete.

| # | Page | `<title>` | len | Meta description |
|---|---|---|---|---|
| 1 | `/` | `The Links — Indoor Golf, Lakeville & Stillwater MN` | 50 | Six GolfZon NX bays in Lakeville and four in Stillwater, MN. Book a bay, join a league, eat and drink. Real prices and real hours, on the page. |
| 2 | `/book` | `Book a Bay — The Links, Lakeville & Stillwater MN` | 49 | Book a simulator bay at The Links in Lakeville or Stillwater, MN. Pick your venue, see the cancellation window, and reserve on Whoosh. |
| 3 | `/rates` | `Indoor Golf Rates & Hours — Lakeville & Stillwater MN` | 53 | Hourly bay rates and full weekly hours for The Links in Lakeville and Stillwater, MN — winter and summer, both venues, in plain text. |
| 4 | `/leagues` | `Indoor Golf Leagues — Lakeville & Stillwater, MN` | 48 | Indoor golf leagues at The Links in Lakeville and Stillwater, MN. Format, night, price and how to join — beginners welcome. Waitlist always open. |
| 5 | `/memberships` | `Golf Memberships & LinksFlex — Lakeville & Stillwater` | 53 | Monthly memberships and LinksFlex prepaid hours at The Links, Lakeville and Stillwater MN. Hours never expire. Compare tiers and join online. |
| 6 | `/events` | `Golf Simulator Parties & Corporate Events — Twin Cities` | 55 | Corporate outings, birthdays and bachelor parties on golf simulators in Lakeville and Stillwater, MN. Capacity, packages and an inquiry form. |
| 7 | `/food-and-drink` | `Food & Drink Menu — The Links, Lakeville MN` | 43 | Full bar, Minnesota thin-crust pizza, wings and brisket burnt ends at The Links of Lakeville, MN. The whole menu in text, with prices. |
| 8 | `/lessons` | `Golf Lessons & Practice — Lakeville, MN \| The Links` | 51 | Golf lessons and swing work on GolfZon NX in Lakeville, MN. PGA and varsity coaching staff, 1:1 or group. Start with a swing evaluation. |
| 9 | `/juniors` | `Junior Golf Leagues & Camps — Lakeville, MN` | 43 | Junior golf leagues and camps at The Links of Lakeville, MN. Boys and girls divisions, eight weeks of match play, indoors all winter. |
| 10 | `/simulators` | `GolfZon NX Simulator Bays — Lakeville & Stillwater MN` | 53 | Six GolfZon NX bays in Lakeville, four in Stillwater MN — moving swing plate, auto tee-up, real ball flight. Five of six bays suit lefties. |
| 11 | `/about` | `About The Links — Indoor Golf in Lakeville & Stillwater` | 55 | Two neighbours, one long Minnesota winter, now two clubhouses — Lakeville since 2022, Stillwater since 2026. The story, the press, the sponsors. |
| 12 | `/contact` | `Contact & Hours — The Links, Lakeville & Stillwater` | 51 | Addresses, phone numbers, hours and parking for The Links of Lakeville and The Links of Stillwater, MN. Maps and a message form for both. |
| 13 | `/gift-cards` | `Golf Gift Cards — The Links, Lakeville & Stillwater` | 51 | Buy a The Links gift card online for indoor golf, food and drinks in Lakeville or Stillwater, MN — or check a balance in a couple of clicks. |
| 14 | `/faq` | `Indoor Golf FAQ — Lakeville & Stillwater, MN` | 44 | Straight answers about indoor golf at The Links: cost per hour, clubs, beginners, group size, how long 18 holes takes, and cancellations. |
| 15 | `/locations/lakeville` | `Indoor Golf in Lakeville, MN — The Links of Lakeville` | 53 | The Links of Lakeville: 6 GolfZon NX bays, full bar and kitchen at 17630 Juniper Path Suite H. South metro indoor golf — hours, rates, booking. |
| 16 | `/locations/stillwater` | `Indoor Golf in Stillwater, MN — The Links of Stillwater` | 55 | The Links of Stillwater: 4 GolfZon NX bays inside Stillwater Bowl & Lounge, 5862 Omaha Ave N. East metro indoor golf — hours, rates, booking. |

### 2.1 Support pages (not ranking targets, but must not ship with empty metadata)

| Page | `<title>` | Meta description |
|---|---|---|
| `/gallery` | `Photo Gallery — The Links, Lakeville & Stillwater MN` | Inside the bays, the bar and the kitchen at The Links in Lakeville and Stillwater, Minnesota. Real photos of both venues, not stock. |
| `/policies` | `Policies & Waiver — The Links, Lakeville & Stillwater` | Booking, cancellation, payment and liability terms for The Links of Lakeville and The Links of Stillwater, Minnesota. |
| `/policies/linksflex-terms` | `LinksFlex Terms — The Links of Lakeville, MN` | Terms for LinksFlex prepaid hour packages at The Links of Lakeville, Minnesota — expiry, transfers, refunds and how hours are redeemed. |
| `/policies/membership-terms` | `Membership Terms — The Links, Lakeville & Stillwater` | Membership terms for The Links of Lakeville and The Links of Stillwater, Minnesota — renewal, guest policy, cancellation and eligibility. |

> The `/gallery` description promises Stillwater photos. **Do not ship that sentence until
> `{{STILLWATER_PHOTOGRAPHY}}` is resolved** — a description that promises what the page lacks is the
> stock-photo anti-pattern in a different costume.

### 2.2 Metadata build rules

1. **One `<h1>` per page**, carrying the page's actual promise, distinct from the `<title>`.
   *38% of sim venues have no `<h1>`; 17 of the current site's 41 pages have none, including the
   homepage* (`playbook-core.md` §7).
2. **Server-rendered.** Astro static output. The crawler must receive copy, nav, NAP and hours in the
   initial HTML response — `playbook-core.md` §7 makes this **mandatory**.
3. **`<link rel="canonical">` self-referencing, absolute, apex, no trailing slash** other than `/`.
   The current site's `/` and `/home` are byte-identical and both live — the duplicate-homepage
   anti-pattern (`playbook-core.md` §9). `/home` must not exist in the new build.
4. **OpenGraph mirrors the title/description** but may exceed 60 chars; `og:image` is a real venue
   photo, per venue on the location pages.
5. **No `noindex` in production.** Staging is `noindex` (`brief.md` §9) — the launch checklist must
   include removing it. This is the most common launch-day own-goal in the category.
6. **CI check:** fail the build if any page has a duplicate `<title>`, a duplicate description, a
   description outside 70–155 chars, a title over 60 chars, zero or 2+ `<h1>`, or a literal `{{`.
   The current site ships **five pages sharing one title** and **19 with an empty description**.

---

## 3. Structured data plan

> **The opportunity, stated plainly.** `playbook-core.md` §7: *61% of sim venues lack `LocalBusiness`;
> only 1% of the corpus uses `Event`; 4% has `FAQPage`.* And from the 7-peer multi-location scan
> (audit §5): **not one ships correct per-location schema.** This is the cheapest genuine competitive
> edge available to this build, and it is worth more than any copy decision on the page.

### 3.1 Entity architecture

```
                    Organization  @id  https://thelinks.golf/#organization
                    "The Links"  ·  the brand  ·  emitted site-wide in BaseLayout
                                   │
              ┌────────────────────┴────────────────────┐
    subOrganization                              subOrganization
              │                                          │
  SportsActivityLocation + BarOrPub          SportsActivityLocation
  @id …/locations/lakeville#venue            @id …/locations/stillwater#venue
  own NAP · geo · hours · sameAs             own NAP · geo · hours · sameAs
  hasMenu → …/food-and-drink#menu            containedInPlace → Stillwater Bowl
  parentOrganization → #organization         parentOrganization → #organization
              │                                          │
              └───────────────┬──────────────────────────┘
                              │  referenced by @id, never re-declared
        ┌─────────────────────┼─────────────────────┬──────────────────┐
     Event ×N              OfferCatalog          Menu               FAQPage
   (leagues, tourneys)   (rates, memberships)  (Lakeville)       (/faq)
   location → venue @id  offeredBy → venue @id  hasMenu ← venue   about → #organization
```

**Three rules that make this work and that the peer set gets wrong:**

1. **Declare each entity exactly once, at a stable `@id`, and reference it everywhere else.** The
   current site emits an identical `LocalBusiness` on all 41 pages — Lakeville's address, on
   Stillwater's page. Repeating a full entity on every page is how you end up with one venue in
   Google's index and one that does not exist.
2. **The `Organization` is not a `LocalBusiness`.** "The Links" is a brand with no address of its own.
   Giving the parent an address — Lakeville's, as today — is precisely what tells Google there is one
   business, in Lakeville.
3. **`@id` values are absolute URLs with fragments**, and the fragment page must actually exist.
   `#venue` fragments live on the location pages; that is what makes the location pages load-bearing
   rather than decorative.

**Where each block is emitted (Astro):**

| Component | Emits | Rendered on |
|---|---|---|
| `src/components/schema/Organization.astro` | `Organization` + `WebSite` | `BaseLayout` — every page |
| `src/components/schema/Venue.astro` | `SportsActivityLocation`(+`BarOrPub`) | `/locations/*` only, `venue` prop |
| `src/components/schema/Breadcrumbs.astro` | `BreadcrumbList` | every page except `/` |
| `src/components/schema/LeagueEvent.astro` | `SportsEvent` | `/leagues`, `/juniors`, per league |
| `src/components/schema/RateCatalog.astro` | `OfferCatalog` | `/rates`, `/memberships` |
| `src/components/schema/MenuSchema.astro` | `Menu` | `/food-and-drink` |
| `src/components/schema/FaqSchema.astro` | `FAQPage` | `/faq` |

Venue data lives in **one** TinaCMS collection (`content/venues/lakeville.json`,
`stillwater.json`) and feeds the schema, the footer NAP, the location page, and the rates table. One
source, four surfaces — which is how the footer NAP stays character-for-character identical to the GBP
(`playbook-core.md` §7).

### 3.2 `Organization` + `WebSite` — site-wide

```json
{
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "Organization",
      "@id": "https://thelinks.golf/#organization",
      "name": "The Links",
      "alternateName": ["The Links Indoor Golf", "Lakeville Links"],
      "legalName": "{{LEGAL_ENTITY_NAME}}",
      "url": "https://thelinks.golf/",
      "logo": {
        "@type": "ImageObject",
        "@id": "https://thelinks.golf/#logo",
        "url": "https://thelinks.golf/img/the-links-logo.png",
        "width": 512,
        "height": 512,
        "caption": "The Links"
      },
      "image": { "@id": "https://thelinks.golf/#logo" },
      "description": "Indoor golf simulator venues in Lakeville and Stillwater, Minnesota, on GolfZon NX simulators, with leagues, memberships, food and a full bar.",
      "foundingDate": "2022",
      "email": "info@lakevillelinks.com",
      "sameAs": [
        "https://www.instagram.com/lakevillelinks",
        "https://www.facebook.com/LakevilleLinks",
        "https://www.facebook.com/linksofstillwater/"
      ],
      "subOrganization": [
        { "@id": "https://thelinks.golf/locations/lakeville#venue" },
        { "@id": "https://thelinks.golf/locations/stillwater#venue" }
      ],
      "contactPoint": [
        {
          "@type": "ContactPoint",
          "contactType": "reservations",
          "telephone": "+1-612-699-0526",
          "areaServed": "US-MN",
          "availableLanguage": "en"
        },
        {
          "@type": "ContactPoint",
          "contactType": "customer service",
          "email": "info@lakevillelinks.com",
          "availableLanguage": "en"
        }
      ]
    },
    {
      "@type": "WebSite",
      "@id": "https://thelinks.golf/#website",
      "url": "https://thelinks.golf/",
      "name": "The Links",
      "description": "Indoor golf in Lakeville and Stillwater, Minnesota.",
      "publisher": { "@id": "https://thelinks.golf/#organization" },
      "inLanguage": "en-US"
    }
  ]
}
```

**Notes.**
`alternateName` includes **"Lakeville Links"** deliberately: it is the name with the search history,
the app-store listing, the email domain and the reviews. Declaring it as an alternate name is how you
tell an entity-resolution system that the two names are one business, rather than letting it guess.
`legalName` is a token because three different legal entities appear across the current legal pages
and none is named for Stillwater (`operating-facts.md` §1).
**No `SearchAction`** — the site has no search. **No `aggregateRating` here or anywhere** — see §3.9.

### 3.3 `LocalBusiness` — Lakeville

Subtype choice: **`SportsActivityLocation` + `BarOrPub`**. Multi-typing is valid JSON-LD and is the
honest description — Lakeville runs a full bar and its own kitchen, so `hasMenu` and `servesCuisine`
(both `FoodEstablishment` properties) only validate if a food type is present.
`playbook-core.md` §7 names exactly these subtypes: *"`GolfCourse`, `SportsActivityLocation`,
`BarOrPub` where F&B is material."* It is material here.

```json
{
  "@context": "https://schema.org",
  "@type": ["SportsActivityLocation", "BarOrPub"],
  "@id": "https://thelinks.golf/locations/lakeville#venue",
  "name": "The Links of Lakeville",
  "alternateName": "Lakeville Links Indoor Golf",
  "url": "https://thelinks.golf/locations/lakeville",
  "parentOrganization": { "@id": "https://thelinks.golf/#organization" },
  "description": "Indoor golf in Lakeville, Minnesota: six GolfZon NX simulator bays, a full bar and a scratch kitchen, in the south metro. Leagues, memberships, lessons and private events.",
  "image": [
    "https://thelinks.golf/img/lakeville/bays-16x9.jpg",
    "https://thelinks.golf/img/lakeville/bar-4x3.jpg",
    "https://thelinks.golf/img/lakeville/bay-play-1x1.jpg"
  ],
  "logo": { "@id": "https://thelinks.golf/#logo" },
  "telephone": "+1-612-699-0526",
  "email": "info@lakevillelinks.com",
  "address": {
    "@type": "PostalAddress",
    "streetAddress": "17630 Juniper Path Suite H",
    "addressLocality": "Lakeville",
    "addressRegion": "MN",
    "postalCode": "55044",
    "addressCountry": "US"
  },
  "geo": {
    "@type": "GeoCoordinates",
    "latitude": 44.6928959,
    "longitude": -93.2865013
  },
  "hasMap": "https://maps.app.goo.gl/s4jgsSzGd5m1RAZd9",
  "sameAs": [
    "https://www.facebook.com/LakevilleLinks",
    "https://www.instagram.com/lakevillelinks",
    "{{LAKEVILLE_GBP_URL}}"
  ],
  "openingHoursSpecification": [
    {
      "@type": "OpeningHoursSpecification",
      "dayOfWeek": ["Monday","Tuesday","Wednesday","Thursday","Friday","Saturday","Sunday"],
      "opens": "{{LAKEVILLE_HOURS_OPEN}}",
      "closes": "{{LAKEVILLE_HOURS_CLOSE}}",
      "validFrom": "{{WINTER_SEASON_START}}",
      "validThrough": "{{WINTER_SEASON_END}}"
    },
    {
      "@type": "OpeningHoursSpecification",
      "dayOfWeek": ["Monday","Tuesday","Wednesday","Thursday","Friday","Saturday","Sunday"],
      "opens": "11:00",
      "closes": "21:00",
      "validFrom": "2026-05-03",
      "validThrough": "2026-10-03"
    }
  ],
  "specialOpeningHoursSpecification": [
    { "@type": "OpeningHoursSpecification", "validFrom": "2026-05-25", "validThrough": "2026-05-25", "opens": "00:00", "closes": "00:00" },
    { "@type": "OpeningHoursSpecification", "validFrom": "2026-07-04", "validThrough": "2026-07-04", "opens": "00:00", "closes": "00:00" },
    { "@type": "OpeningHoursSpecification", "validFrom": "2026-09-07", "validThrough": "2026-09-07", "opens": "00:00", "closes": "00:00" }
  ],
  "currenciesAccepted": "USD",
  "paymentAccepted": "Cash, Credit Card, Debit Card, Gift Card",
  "priceRange": "$$",
  "servesCuisine": ["Pizza", "American", "Bar Food"],
  "hasMenu": { "@id": "https://thelinks.golf/food-and-drink#menu" },
  "smokingAllowed": false,
  "publicAccess": true,
  "isAccessibleForFreeYesNo": false,
  "areaServed": [
    { "@type": "City", "name": "Lakeville", "containedInPlace": { "@type": "AdministrativeArea", "name": "Dakota County, Minnesota" } },
    { "@type": "City", "name": "Apple Valley" },
    { "@type": "City", "name": "Burnsville" },
    { "@type": "City", "name": "Farmington" },
    { "@type": "City", "name": "Rosemount" },
    { "@type": "City", "name": "Prior Lake" }
  ],
  "amenityFeature": [
    { "@type": "LocationFeatureSpecification", "name": "GolfZon NX simulator bays", "value": 6 },
    { "@type": "LocationFeatureSpecification", "name": "Left-handed capable bays", "value": 5 },
    { "@type": "LocationFeatureSpecification", "name": "Televisions", "value": 9 },
    { "@type": "LocationFeatureSpecification", "name": "Full bar", "value": true },
    { "@type": "LocationFeatureSpecification", "name": "Club rental available", "value": true },
    { "@type": "LocationFeatureSpecification", "name": "Balls included", "value": true },
    { "@type": "LocationFeatureSpecification", "name": "Maximum golfers", "value": 36 }
  ],
  "makesOffer": { "@id": "https://thelinks.golf/rates#bay-hour-lakeville" },
  "hasOfferCatalog": { "@id": "https://thelinks.golf/rates#catalog-lakeville" },
  "potentialAction": {
    "@type": "ReserveAction",
    "name": "Book a bay at The Links of Lakeville",
    "target": {
      "@type": "EntryPoint",
      "urlTemplate": "https://app.whoosh.io/patron/club/the-links-indoor-golf/agenda/simulators/today",
      "actionPlatform": [
        "http://schema.org/DesktopWebPlatform",
        "http://schema.org/MobileWebPlatform"
      ]
    },
    "result": { "@type": "Reservation", "name": "Simulator bay reservation" }
  }
}
```

**Notes.**
The `geo` coordinates are read from the Google Maps place URL captured in
`_ingest/site-inventory.md` — **verify against the GBP before launch**; they are the one numeric value
here not stated by the client.
Two `openingHoursSpecification` entries with `validFrom`/`validThrough` is the correct way to express
seasonal hours in a single entity. It is also the schema-level version of the `/rates` + `/rates-summer`
trap the reference site fell into (audit §5): **one entity, two dated windows — never two entities.**
`amenityFeature` numbers are all published on the current site and confirmed. `{{SIM_TECH_LAKEVILLE}}`
resolution must be applied here too if the NX claim turns out to be wrong.

### 3.4 `LocalBusiness` — Stillwater

Subtype: **`SportsActivityLocation` only.** Stillwater has no kitchen or bar of its own — F&B is via
Stillwater Bowl & Lounge. Declaring `BarOrPub` here would be a claim the venue cannot support, and
`containedInPlace` is the accurate and more useful statement. It also creates a genuine co-location
signal for the `Stillwater Bowl golf simulators` query.

```json
{
  "@context": "https://schema.org",
  "@type": "SportsActivityLocation",
  "@id": "https://thelinks.golf/locations/stillwater#venue",
  "name": "The Links of Stillwater",
  "url": "https://thelinks.golf/locations/stillwater",
  "parentOrganization": { "@id": "https://thelinks.golf/#organization" },
  "description": "Indoor golf in Stillwater, Minnesota: four GolfZon NX simulator bays inside Stillwater Bowl & Lounge, in the east metro. Leagues, memberships and private events, with food and drinks from the Bowl.",
  "image": ["{{STILLWATER_PHOTOGRAPHY}}"],
  "logo": { "@id": "https://thelinks.golf/#logo" },
  "telephone": "{{STILLWATER_PHONE}}",
  "email": "{{STILLWATER_EMAIL}}",
  "address": {
    "@type": "PostalAddress",
    "streetAddress": "5862 Omaha Ave N",
    "addressLocality": "Stillwater",
    "addressRegion": "MN",
    "postalCode": "55082",
    "addressCountry": "US"
  },
  "geo": {
    "@type": "GeoCoordinates",
    "latitude": "{{STILLWATER_LAT}}",
    "longitude": "{{STILLWATER_LNG}}"
  },
  "hasMap": "{{STILLWATER_GBP_MAP_URL}}",
  "sameAs": [
    "https://www.facebook.com/linksofstillwater/",
    "https://greaterstillwaterchamber.com/list/member/the-links-of-stillwater-10458",
    "{{STILLWATER_GBP_URL}}"
  ],
  "containedInPlace": {
    "@type": ["BowlingAlley", "BarOrPub"],
    "name": "Stillwater Bowl & Lounge",
    "address": {
      "@type": "PostalAddress",
      "streetAddress": "5862 Omaha Ave N",
      "addressLocality": "Stillwater",
      "addressRegion": "MN",
      "postalCode": "55082",
      "addressCountry": "US"
    }
  },
  "openingHoursSpecification": [
    {
      "@type": "OpeningHoursSpecification",
      "dayOfWeek": "{{STILLWATER_HOURS_DAYS}}",
      "opens": "{{STILLWATER_HOURS_OPEN}}",
      "closes": "{{STILLWATER_HOURS_CLOSE}}",
      "validFrom": "{{WINTER_SEASON_START}}",
      "validThrough": "{{WINTER_SEASON_END}}"
    }
  ],
  "currenciesAccepted": "USD",
  "paymentAccepted": "Credit Card, Debit Card, Gift Card",
  "priceRange": "$$",
  "publicAccess": true,
  "areaServed": [
    { "@type": "City", "name": "Stillwater", "containedInPlace": { "@type": "AdministrativeArea", "name": "Washington County, Minnesota" } },
    { "@type": "City", "name": "Oak Park Heights" },
    { "@type": "City", "name": "Bayport" },
    { "@type": "City", "name": "Lake Elmo" },
    { "@type": "City", "name": "Mahtomedi" },
    { "@type": "City", "name": "Hudson", "addressRegion": "WI" }
  ],
  "amenityFeature": [
    { "@type": "LocationFeatureSpecification", "name": "GolfZon NX simulator bays", "value": 4 },
    { "@type": "LocationFeatureSpecification", "name": "Food and drinks via Stillwater Bowl & Lounge", "value": true },
    { "@type": "LocationFeatureSpecification", "name": "Left-handed capable bays", "value": "{{STILLWATER_BAY_HANDEDNESS}}" },
    { "@type": "LocationFeatureSpecification", "name": "Televisions", "value": "{{STILLWATER_TV_COUNT}}" }
  ],
  "hasOfferCatalog": { "@id": "https://thelinks.golf/rates#catalog-stillwater" },
  "potentialAction": {
    "@type": "ReserveAction",
    "name": "Book a bay at The Links of Stillwater",
    "target": {
      "@type": "EntryPoint",
      "urlTemplate": "https://app.whoosh.io/patron/club/linksstillwater/agenda/simulators/today",
      "actionPlatform": [
        "http://schema.org/DesktopWebPlatform",
        "http://schema.org/MobileWebPlatform"
      ]
    },
    "result": { "@type": "Reservation", "name": "Simulator bay reservation" }
  }
}
```

**`{{STILLWATER_GBP_URL}}` is the single most consequential token in this document.** If no separate
Google Business Profile exists for The Links of Stillwater — and the evidence says it does not, because
the site's own Stillwater map link resolves to the bowling alley's listing — then **no amount of
schema will produce a local-pack result.** Schema supports a GBP; it does not substitute for one.
Creating and verifying it is task #1 in §6.

### 3.5 `Event` — every league and every tournament

`playbook-core.md` §7: ***"`Event` schema on every league, tournament, and event. 1% of the corpus has
it. This is the largest untapped structured-data opportunity in the segment."***

Model a league season as **one `SportsEvent` with an `eventSchedule`** — not 8 separate weekly events.
The `Schedule` type expresses "Wednesdays, 6:30pm, for 8 weeks" natively, and it keeps the page to one
block per league instead of a wall of near-duplicates.

```json
{
  "@context": "https://schema.org",
  "@type": "SportsEvent",
  "@id": "https://thelinks.golf/leagues#{{LEAGUE_SLUG}}",
  "name": "{{LEAGUE_NAME}}",
  "description": "{{LEAGUE_ONE_LINER}} {{LEAGUE_FORMAT}} Beginners welcome — handicapped so a first-timer can win a match.",
  "url": "https://thelinks.golf/leagues#{{LEAGUE_SLUG}}",
  "image": "https://thelinks.golf/img/lakeville/league-night-16x9.jpg",
  "sport": "Golf",
  "eventAttendanceMode": "https://schema.org/OfflineEventAttendanceMode",
  "eventStatus": "https://schema.org/EventScheduled",
  "startDate": "{{LEAGUE_START_DATE}}",
  "endDate": "{{LEAGUE_END_DATE}}",
  "eventSchedule": {
    "@type": "Schedule",
    "byDay": "https://schema.org/{{LEAGUE_DAY}}",
    "startTime": "{{LEAGUE_START_TIME}}",
    "endTime": "{{LEAGUE_END_TIME}}",
    "repeatFrequency": "P1W",
    "repeatCount": "{{LEAGUE_WEEKS}}",
    "startDate": "{{LEAGUE_START_DATE}}",
    "endDate": "{{LEAGUE_END_DATE}}",
    "scheduleTimezone": "America/Chicago"
  },
  "location": { "@id": "https://thelinks.golf/locations/{{VENUE_SLUG}}#venue" },
  "organizer": { "@id": "https://thelinks.golf/#organization" },
  "isAccessibleForFree": false,
  "maximumAttendeeCapacity": "{{LEAGUE_CAPACITY}}",
  "audience": {
    "@type": "Audience",
    "audienceType": "Adult golfers, all skill levels",
    "suggestedMinAge": 21
  },
  "offers": {
    "@type": "Offer",
    "@id": "https://thelinks.golf/leagues#{{LEAGUE_SLUG}}-offer",
    "name": "{{LEAGUE_NAME}} registration",
    "price": "{{LEAGUE_PRICE}}",
    "priceCurrency": "USD",
    "availability": "https://schema.org/InStock",
    "validFrom": "{{LEAGUE_REGISTRATION_OPENS}}",
    "validThrough": "{{LEAGUE_REGISTRATION_CLOSES}}",
    "url": "{{LEAGUE_REGISTRATION_URL}}",
    "category": "League registration per player"
  }
}
```

**Junior leagues** use the same block with `"@type": ["SportsEvent","EducationEvent"]` and
`audience.suggestedMinAge` / `suggestedMaxAge` from `{{JUNIOR_AGE_RANGE}}`. The Jan–Mar 2026 season's
real values are on record in `operating-facts.md` §5 and can be used as the template shape — 8 weeks,
Sundays, 2-person best-ball match play, $250/person, boys and girls divisions — but the **2027 season's
values must come from the client**, not be copied forward. `playbook-core.md` §8: *"every date-bearing
page carries a season or year, and the build hands over a refresh owner."*

**Three `Event` rules that keep this honest:**

| Registration state | `offers.availability` | Page behaviour |
|---|---|---|
| Open | `InStock` | Registration link, prominent |
| Full | `SoldOut` | **Waitlist capture** + "next season starts ~{{MONTH}}" |
| Between seasons | omit `offers` entirely; set `eventStatus` to the *next* season's `EventScheduled` with future dates | **Notify-me capture** + last season's standings + the date registration opens |

That table is `playbook-core.md` §5's waitlist rule expressed in schema. **Never emit an `Offer` with
`InStock` for a league that has ended** — that is the structured-data version of the *"Registration
closed. Full stop."* anti-pattern, and it is worse, because it feeds a machine.

**Tournaments and one-offs** (the Caz Open pattern) use plain `SportsEvent` with a fixed `startDate`
and no `eventSchedule`. **When the date passes, the page is removed and the URL returns `410`** — which
is exactly what §4 does to `/cazopen`, a year-expired tournament page still live today with a working
payment link.

### 3.6 `OfferCatalog` — rates and memberships

One catalog per venue for bay time, one shared catalog for memberships. `Service` (not `Product`) is
the correct `itemOffered` for time-based access.

```json
{
  "@context": "https://schema.org",
  "@type": "OfferCatalog",
  "@id": "https://thelinks.golf/rates#catalog-lakeville",
  "name": "Bay rates — The Links of Lakeville",
  "url": "https://thelinks.golf/rates",
  "itemListElement": [
    {
      "@type": "Offer",
      "@id": "https://thelinks.golf/rates#bay-hour-lakeville",
      "name": "Simulator bay, one hour",
      "description": "One GolfZon NX bay for one hour. Priced per bay, not per person — up to 6 players, 4 recommended. Balls included; club rental $15.",
      "price": "{{WINTER_RATE_LAKEVILLE}}",
      "priceCurrency": "USD",
      "availability": "https://schema.org/InStock",
      "validFrom": "{{WINTER_SEASON_START}}",
      "validThrough": "{{WINTER_SEASON_END}}",
      "url": "https://thelinks.golf/book?venue=lakeville",
      "offeredBy": { "@id": "https://thelinks.golf/locations/lakeville#venue" },
      "eligibleQuantity": { "@type": "QuantitativeValue", "value": 1, "unitCode": "HUR" },
      "itemOffered": {
        "@type": "Service",
        "name": "Indoor golf simulator bay rental",
        "serviceType": "Golf simulator bay rental"
      }
    },
    {
      "@type": "Offer",
      "@id": "https://thelinks.golf/rates#bay-hour-lakeville-summer",
      "name": "Simulator bay, one hour — summer rate",
      "price": "35.00",
      "priceCurrency": "USD",
      "availability": "https://schema.org/InStock",
      "validFrom": "2026-05-03",
      "validThrough": "{{SUMMER_RATE_END_DATE}}",
      "url": "https://thelinks.golf/book?venue=lakeville",
      "offeredBy": { "@id": "https://thelinks.golf/locations/lakeville#venue" },
      "eligibleQuantity": { "@type": "QuantitativeValue", "value": 1, "unitCode": "HUR" },
      "itemOffered": { "@type": "Service", "name": "Indoor golf simulator bay rental" }
    },
    {
      "@type": "Offer",
      "name": "Club rental",
      "description": "A basic set of clubs for the round. Lakeville only.",
      "price": "15.00",
      "priceCurrency": "USD",
      "offeredBy": { "@id": "https://thelinks.golf/locations/lakeville#venue" },
      "itemOffered": { "@type": "Service", "name": "Golf club set rental" }
    }
  ]
}
```

> `{{SUMMER_RATE_END_DATE}}` is a token even though a date is published, because the site publishes
> **two contradictory dates** for it — Sept 30 on the homepage, Oct 3 on `/rates`
> (`operating-facts.md` §3). Structured data must not encode a contradiction.

Memberships and LinksFlex:

```json
{
  "@context": "https://schema.org",
  "@type": "OfferCatalog",
  "@id": "https://thelinks.golf/memberships#catalog",
  "name": "Memberships and LinksFlex — The Links",
  "url": "https://thelinks.golf/memberships",
  "itemListElement": [
    {
      "@type": "Offer",
      "@id": "https://thelinks.golf/memberships#summer-individual",
      "name": "Summer Membership — Individual",
      "description": "Two hours of bay time per day, 21-day booking window, 10% off food and beverage, no guest fees. Member must be present. Renews monthly until {{MEMBERSHIP_RENEWAL_END}} or until cancelled.",
      "price": "149.00",
      "priceCurrency": "USD",
      "priceSpecification": {
        "@type": "UnitPriceSpecification",
        "price": "149.00",
        "priceCurrency": "USD",
        "billingDuration": 1,
        "billingIncrement": 1,
        "unitCode": "MON"
      },
      "availability": "https://schema.org/InStock",
      "validFrom": "{{MEMBERSHIP_SEASON_START}}",
      "validThrough": "{{MEMBERSHIP_SEASON_END}}",
      "url": "https://app.whoosh.io/patron/club/the-links-indoor-golf/store",
      "itemOffered": { "@type": "Service", "name": "Summer golf membership", "serviceType": "Membership" }
    },
    {
      "@type": "Offer",
      "@id": "https://thelinks.golf/memberships#summer-family",
      "name": "Summer Membership — Family",
      "price": "199.00",
      "priceCurrency": "USD",
      "priceSpecification": {
        "@type": "UnitPriceSpecification",
        "price": "199.00", "priceCurrency": "USD",
        "billingDuration": 1, "billingIncrement": 1, "unitCode": "MON"
      },
      "availability": "https://schema.org/InStock",
      "url": "https://app.whoosh.io/patron/club/the-links-indoor-golf/store",
      "itemOffered": { "@type": "Service", "name": "Summer golf membership, family", "serviceType": "Membership" }
    },
    {
      "@type": "Offer",
      "@id": "https://thelinks.golf/memberships#linksflex-offpeak-12",
      "name": "LinksFlex Off Peak — 12 hours",
      "description": "Twelve prepaid bay hours that never expire. Valid {{LINKSFLEX_OFFPEAK_WINDOW}}. 21-day booking window, 10% off food and beverage, no guest fees. Lakeville only.",
      "price": "399.00",
      "priceCurrency": "USD",
      "availability": "https://schema.org/InStock",
      "url": "https://app.whoosh.io/patron/club/the-links-indoor-golf/store/packages",
      "offeredBy": { "@id": "https://thelinks.golf/locations/lakeville#venue" },
      "eligibleQuantity": { "@type": "QuantitativeValue", "value": 12, "unitCode": "HUR" },
      "itemOffered": { "@type": "Service", "name": "Prepaid simulator hours", "serviceType": "Prepaid package" }
    }
  ]
}
```

> Remaining LinksFlex tiers (24h/48h × Off Peak / Anytime / Junior) follow the same shape; all nine
> prices are transcribed in `operating-facts.md` §4. **`LinksFlex Anytime` is deliberately omitted from
> this block until `{{LINKSFLEX_ANYTIME_PRICE}}` resolves** — at its current price it works out to
> $39.56–$45.75 per hour against a $35 walk-up rate, and publishing that as machine-readable structured
> data broadcasts the pricing error to every comparison engine that reads it.

### 3.7 `Menu` — Lakeville food & drink

Referenced by the Lakeville venue's `hasMenu`. Abridged to two sections; the full transcription in
`operating-facts.md` §8 supplies the rest.

```json
{
  "@context": "https://schema.org",
  "@type": "Menu",
  "@id": "https://thelinks.golf/food-and-drink#menu",
  "name": "The Links of Lakeville menu",
  "url": "https://thelinks.golf/food-and-drink",
  "inLanguage": "en-US",
  "hasMenuSection": [
    {
      "@type": "MenuSection",
      "name": "Appetizers",
      "hasMenuItem": [
        {
          "@type": "MenuItem",
          "name": "Brisket Burnt Ends",
          "description": "Brisket, served with your choice of sauce.",
          "offers": { "@type": "Offer", "price": "16.00", "priceCurrency": "USD" }
        },
        {
          "@type": "MenuItem",
          "name": "Pork Wings (6)",
          "description": "Mini pork shanks with your choice of sauce.",
          "offers": { "@type": "Offer", "price": "15.00", "priceCurrency": "USD" }
        },
        {
          "@type": "MenuItem",
          "name": "Cheese Curds",
          "offers": { "@type": "Offer", "price": "8.00", "priceCurrency": "USD" }
        }
      ]
    },
    {
      "@type": "MenuSection",
      "name": "Pizza",
      "description": "Minnesota thin crust. 14\" regular crust or 10\" gluten-sensitive. We cannot guarantee gluten free.",
      "hasMenuItem": [
        {
          "@type": "MenuItem",
          "name": "Cheese Pizza",
          "offers": [
            { "@type": "Offer", "name": "14\" regular crust", "price": "12.00", "priceCurrency": "USD" },
            { "@type": "Offer", "name": "10\" gluten-sensitive", "price": "14.00", "priceCurrency": "USD" }
          ]
        },
        {
          "@type": "MenuItem",
          "name": "Smokehouse Chicken BBQ Pizza",
          "offers": [
            { "@type": "Offer", "name": "14\" regular crust", "price": "17.00", "priceCurrency": "USD" },
            { "@type": "Offer", "name": "10\" gluten-sensitive", "price": "19.00", "priceCurrency": "USD" }
          ]
        }
      ],
      "suitableForDiet": "https://schema.org/GlutenFreeDiet"
    }
  ]
}
```

> `suitableForDiet: GlutenFreeDiet` is applied **at the section level with the disclaimer in
> `description`**, not per item, because the venue's own copy says "we cannot guarantee gluten free."
> Claiming a diet property per item would overstate it.
> **Stillwater gets no `Menu`.** Its `hasMenu` is absent and `containedInPlace` carries the F&B story
> until `{{STILLWATER_MENU_STATUS}}` resolves.

### 3.8 `FAQPage` and `BreadcrumbList`

```json
{
  "@context": "https://schema.org",
  "@type": "FAQPage",
  "@id": "https://thelinks.golf/faq#faq",
  "url": "https://thelinks.golf/faq",
  "about": { "@id": "https://thelinks.golf/#organization" },
  "mainEntity": [
    {
      "@type": "Question",
      "name": "How much does a golf simulator cost per hour at The Links?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "A bay is {{WINTER_RATE_LAKEVILLE}} per hour at The Links of Lakeville and {{WINTER_RATE_STILLWATER}} per hour at The Links of Stillwater. The price is per bay, not per person, so a group of four splits one hourly rate. Golf balls are included; a rental set of clubs is $15."
      }
    },
    {
      "@type": "Question",
      "name": "Do I need my own clubs to play indoor golf?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "No. Bring your own if you have them, but The Links of Lakeville rents basic sets for $15, and balls are included with every bay. Five of the six Lakeville bays work for left-handed golfers."
      }
    }
  ]
}
```

The full question set is §5. Every answer must be **the same text that appears visibly on the page** —
schema that does not match rendered content is a spam signal, and it also defeats the point.

```json
{
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  "itemListElement": [
    { "@type": "ListItem", "position": 1, "name": "Home", "item": "https://thelinks.golf/" },
    { "@type": "ListItem", "position": 2, "name": "Locations", "item": "https://thelinks.golf/locations" },
    { "@type": "ListItem", "position": 3, "name": "The Links of Stillwater" }
  ]
}
```

> The final crumb has **no `item`** — it is the current page. A `/locations` index page must exist for
> crumb 2 to be honest; it is a thin hub with the two venue cards, and it doubles as the destination
> for a `Locations` nav item. It is not a keyword target and shares `/`'s intent.

### 3.9 What this build deliberately does **not** emit

| Not emitted | Why |
|---|---|
| `aggregateRating` / `Review` | The only rating found anywhere is third-party (`teebly.io`: 4.9 / 70 for Lakeville) and unverified; Stillwater has none. `brief.md` §7 lists review counts as **unverified — needs pulling**. Self-serving `aggregateRating` on `LocalBusiness` also violates Google's structured-data policy. **Ship reviews as a live Google widget instead** (`playbook-core.md` §4 — *6% of sim venues have one*), and add `aggregateRating` only if the client supplies verified, first-party-collected numbers. |
| `Organization.address` | Would re-create today's bug: one business, in Lakeville. |
| Per-page duplicated `LocalBusiness` | The current site's exact failure. Reference by `@id`. |
| `Product` for memberships | `Service` is correct for time-based access; `Product` invites merchant-listing validation errors. |
| `SearchAction` | No site search exists. |
| `Event` for expired seasons | See §3.5. Expired → page removed → `410`. |

### 3.10 Validation gate

Add to the ship gate (`playbook-core.md` §10 — *"`LocalBusiness` (or subtype) schema validates"*,
*"`Event` schema on every league and event"*):

- [ ] Both venue entities pass the Rich Results Test **and** Schema.org validator
- [ ] `@id` graph resolves: every `{ "@id": … }` reference points at an entity declared somewhere on the site
- [ ] `Organization` appears exactly once per page; each `LocalBusiness` appears on exactly one page
- [ ] Every league on `/leagues` and `/juniors` has an `Event` block, and every block's dates are in the future
- [ ] No `{{TOKEN}}` string survives in any rendered JSON-LD
- [ ] Footer NAP string === `address` in JSON-LD === Google Business Profile, character for character
- [ ] Both GBPs link to their **own location page**, not to `/`

---

## 4. Redirect map

### 4.1 The domain-level move

Today: `thelinks.golf` → **301** → `https://www.lakevillelinks.com/` (single hop, verified). This must
be **reversed**, and the reversal has an ordering hazard.

```
1. DELETE the existing thelinks.golf → lakevillelinks.com rule FIRST.
   Adding the new rule while the old one lives creates an infinite redirect loop.
2. Point thelinks.golf (apex) at the new Vercel deployment. Canonical host = APEX.
3. www.thelinks.golf        → 301 → https://thelinks.golf/$1        (host normalisation)
4. lakevillelinks.com/*     → 301 → https://thelinks.golf/<mapped>  (per §4.2 table)
   www.lakevillelinks.com/* → 301 → https://thelinks.golf/<mapped>  (same table, one hop)
5. Any path on lakevillelinks.com not in the table → 301 → https://thelinks.golf/
   (a soft catch-all; the table is exhaustive for the 41 known URLs, this covers stragglers,
   query-string variants, and Squarespace's ?format= URLs)
```

**One hop, always.** `www.lakevillelinks.com/menu` must go straight to `https://thelinks.golf/food-and-drink`
— never `www.lakevillelinks.com/menu` → `thelinks.golf/menu` → `thelinks.golf/food-and-drink`. Chained
redirects across a domain move are where link equity actually leaks.

**Implementation:** add `lakevillelinks.com` and `www.lakevillelinks.com` as domains on the same Vercel
project and express the table as `redirects` in `vercel.json`, keyed on `has: [{ "type": "host", … }]`
where a rule is domain-specific. Path-identical rules (`/about` → `/about`) still need an entry so the
host rewrite happens in one hop. **Do not leave the redirects in Squarespace** — the Squarespace site is
being decommissioned, and a redirect that depends on the old CMS staying paid for is a time bomb.

**Also required at the domain level:**
- Google Search Console: verify `thelinks.golf`, then submit **Change of Address** from
  `lakevillelinks.com`. This is the mechanism that moves the site's history; the 301s alone are slower.
- Keep `lakevillelinks.com` registered and redirecting **indefinitely**. It is the brand's search
  history, the email domain (`info@`, `hr@`), and the app-store listing's name.
- Update the GBP website field for both venues to the **location page**, not the homepage.
- Update `robots.txt` on the new domain to declare `https://thelinks.golf/sitemap-index.xml`
  (`playbook-core.md` §7), and **do not add any AI-crawler `Disallow`** — the current site does not
  block them (`_corrections.md` §1) and the new one must not either.

### 4.2 The URL table — all 41 current URLs

> **Reconciled 2026-08-02 during build:** rows 30–32 of the table below proposed `/policies`,
> `/policies/linksflex-terms` and `/policies/membership-terms`. The build ships a single
> **`/policy`** page instead — the old site's `/policy` path is unchanged, so it needs no redirect
> at all, and splitting three thin legal pages out of one contradicts the playbook's
> "small-and-complete beats large-and-thin". `vercel.json` maps the two terms URLs to `/policy/`.
> Row 24's `/gallery` is also not built — `/photo-gallery` maps to `/about/` until there is a
> gallery worth having.


Old URLs are relative to `https://www.lakevillelinks.com`. New URLs are relative to
`https://thelinks.golf`. Cut list per `current-site-audit.md` §3.

| # | Old URL | Status | New URL | Why |
|---|---|---|---|---|
| 1 | `/` | 301 | `/` | Domain move |
| 2 | `/home` | 301 | `/` | Duplicate homepage — `playbook-core.md` §9 anti-pattern |
| 3 | `/home-2` | 301 | `/` | **Cut.** Third live homepage; still sells TwoVision and links the retired GolfBook vendor |
| 4 | `/home-old` | 301 | `/` | **Cut.** Fourth live homepage; TwoVision |
| 5 | `/about` | 301 | `/about` | Keep & rebuild |
| 6 | `/our-story` | 301 | `/about` | Merged — the voice moves into `/about` |
| 7 | `/rates` | 301 | `/rates` | Keep & rebuild |
| 8 | `/specials` | 301 | `/rates` | **Cut.** 318 characters, no actual specials; seasonal offers move to the homepage featured slot |
| 9 | `/memberships` | 301 | `/memberships` | Keep & rebuild |
| 10 | `/farewaygolf/lakeville-links-memberships` | 301 | `/memberships` | **Cut.** A one-line shim to a stale 2025 offer on a retired vendor |
| 11 | `/leagues` | 301 | `/leagues` | Keep & rebuild — from placeholder to the site's most valuable page |
| 12 | `/leagues-contests` | 301 | `/leagues` | **Cut.** 105 characters whose only two links leave the domain |
| 13 | `/juniorleagues` | 301 | `/juniors` | **Cut as-is** (Jan–Mar 2026 season still saying "Sign-Up Now"); the *content pattern* moves to `/juniors` |
| 14 | `/groups` | 301 | `/events` | Renamed to the playbook's canonical slug |
| 15 | `/instruction` | 301 | `/lessons` | Renamed to the playbook's canonical slug |
| 16 | `/menu` | 301 | `/food-and-drink` | Renamed; content moves from six PNGs to HTML |
| 17 | `/contact` | 301 | `/contact` | Keep & rebuild |
| 18 | `/stillwater` | 301 | `/locations/stillwater` | **The most important single redirect in the table** — the second venue gets a real page |
| 19 | `/booking` | 301 | `/book?venue=lakeville` | Interstitial removed; venue intent preserved in the query |
| 20 | `/bookingstillwater` | 301 | `/book?venue=stillwater` | Same; this URL carries real Stillwater booking intent |
| 21 | `/bookinglanding` | 301 | `/book` | The chooser becomes the page |
| 22 | `/booking-scheduler` | 301 | `/book` | **Cut.** Hard-iframes the retired GolfBook calendar, which 404s |
| 23 | `/simulator-settings` | 301 | `/simulators` | **Cut as-is** (33 characters + 5 PNGs); how-to content is rewritten as text on `/simulators` |
| 24 | `/photo-gallery` | 301 | `/gallery` | Keep, rebuild with real alt text |
| 25 | `/advertisinglogos` | 301 | `/about#sponsors` | **Cut.** Internal asset shelf, zero body text, indexable |
| 26 | `/align-logo` | 301 | `/about#sponsors` | **Cut.** Renders completely empty |
| 27 | `/feedback` | 301 | `/contact` | **Cut.** Orphan; the Google-review CTA moves into `/contact` per venue |
| 28 | `/sms-opt-in-form` | 301 | `/contact#sms` | Consolidated |
| 29 | `/sms-opt-in-form-1` | 301 | `/contact#sms` | **Cut.** Exact duplicate |
| 30 | `/policy` | 301 | `/policies` | Keep |
| 31 | `/linksflex-terms-conditions` | 301 | `/policies/linksflex-terms` | Keep; the broken find-and-replace template must be fixed |
| 32 | `/membership-packages-terms-conditions-copy` | 301 | `/policies/membership-terms` | **Cut the `-copy` URL**; it is the only both-location terms page, so the content survives |
| 33 | `/news` | 301 | `/about#press` | **Cut the blog shell**; keep the press citations |
| 34 | `/news/indoor-golf-leagues-stay-active-and-social-with-high-tech-simulators-all-winter-long` | 301 | `/leagues` | ~1,700 words on winter leagues — the one news post with topical equity worth pointing somewhere relevant |
| 35 | `/news/first-look-at-lakeville-indoor-golf` | 301 | `/about#press` | Press citation preserved on `/about` |
| 36 | `/news/sneak-peak-pre-opening-look-inside-lakeville-links-by-twincitiesgolfcom` | 301 | `/about#press` | Press citation preserved on `/about` |
| 37 | `/cazopen` | **410** | — | Tournament dated **2 Aug 2025**, a year expired, still live **with a working payment link**. Orphan, no nav, no footer. |
| 38 | `/vikings-game-day-special` | **410** | — | Promo dated **9 Feb 2025**; its "BOOK ONLINE" 404s to the retired GolfBook vendor; five decorative `<h1>`s |
| 39 | `/news/golfzon-twovision` | **410** | — | **Actively harmful.** Dated 1 Apr 2022, and the source of the false "TwoVision" fact that answer engines are repeating today (§0) |
| 40 | `/news/grand-opening-is-planned-for-october-29th-2022` | **410** | — | Dated event announcement, four years expired |
| 41 | `/news/lakeville-links-golf-simulator-business-may-open-by-august` | **410** | — | Dated pre-opening speculation from Apr 2022; the business has been open for four years |

**Totals: 41 URLs · 36 × 301 · 5 × 410 · 0 left live.**
21 of the 41 are retirements per audit §3; every one of them lands somewhere useful or is explicitly
gone. **No `404`s anywhere in the map** — a 404 on a URL you knowingly retired is an accident that
looks like neglect; a 410 is a decision.

### 4.3 Why 410 and not 301, for those five

A `301` says "this thing moved, please follow." A `410` says "this thing is gone, stop asking, remove
it from your index." Google removes `410` URLs faster than `404`s and materially faster than it stops
following a `301`.

Four of the five are **dated events that will never recur at that URL**. The fifth,
`/news/golfzon-twovision`, is the page teaching search engines and LLMs that Lakeville runs TwoVision
simulators — a claim the client's own current pages contradict. Redirecting it to `/simulators` would
pass its accumulated association *into* the page that is supposed to correct the record. Kill it.

`playbook-core.md` §8: *"Every date-bearing page carries a season or year, and the build hands over a
refresh owner."* The corollary this table applies: **when a dated page's date passes and nobody owns
the refresh, it gets removed, not archived.**

### 4.4 Implementation sketch

`vercel.json` (abridged — the full table follows the same shape):

```json
{
  "redirects": [
    { "source": "/home", "destination": "https://thelinks.golf/", "permanent": true },
    { "source": "/our-story", "destination": "https://thelinks.golf/about", "permanent": true },
    { "source": "/stillwater", "destination": "https://thelinks.golf/locations/stillwater", "permanent": true },
    { "source": "/bookingstillwater", "destination": "https://thelinks.golf/book?venue=stillwater", "permanent": true },
    { "source": "/menu", "destination": "https://thelinks.golf/food-and-drink", "permanent": true },
    { "source": "/news/:slug", "destination": "https://thelinks.golf/about#press", "permanent": true },
    {
      "source": "/:path*",
      "has": [{ "type": "host", "value": "(www\\.)?lakevillelinks\\.com" }],
      "destination": "https://thelinks.golf/",
      "permanent": true
    }
  ]
}
```

> Order matters: specific rules before the host catch-all. The `/news/:slug` rule must sit **after** the
> explicit `/news/indoor-golf-leagues-…` rule and **after** the four `410` news routes, or it will
> swallow them.

`410` cannot be expressed as a Vercel redirect. Ship one Astro endpoint per gone URL:

```ts
// src/pages/cazopen.ts   (and vikings-game-day-special.ts, news/golfzon-twovision.ts, …)
export const prerender = false;
export function GET() {
  return new Response(
    "410 Gone — this page described a past event and has been removed. https://thelinks.golf/",
    { status: 410, headers: { "content-type": "text/plain; charset=utf-8" } }
  );
}
```

**Post-launch verification (add to the launch checklist):**
- [ ] Every one of the 41 old URLs returns its intended status in **one hop** — script it, don't spot-check
- [ ] No redirect chain anywhere exceeds 1 hop
- [ ] The five `410`s return `410`, not `404` and not `200`
- [ ] `sitemap-index.xml` contains **only** the 16 canonical pages + 4 support pages — **no** retired URL
- [ ] GSC Change of Address submitted and accepted
- [ ] Both GBP website fields updated to the location pages
- [ ] Crawl `thelinks.golf` and confirm zero internal links to any `lakevillelinks.com` URL

---

## 5. AI-citation (AEO) plan

### 5.1 The constraint, restated

`_corrections.md` §1 establishes it: **robots.txt blocks nothing.** GPTBot, ClaudeBot, CCBot,
Google-Extended, Applebot-Extended and the rest all fall under a permissive shared group. There is no
crawler to unblock and no robots.txt task on this build. Do **not** carry over the Fareway rebuild's
unblocking item.

So the constraint is content. And §0 shows what happens when the door is open and the room is full of
old furniture: answer engines are currently telling people that Lakeville Links has **six GolfZon
TwoVision simulators**, because that is what `/home-2`, `/home-old` and `/news/golfzon-twovision` say,
and those pages are live, indexed, and — critically — **more prose-dense than the current homepage.**
Answer engines quote the page that is easiest to quote. Right now that is the wrong page.

Three jobs, in order:
1. **Remove the wrong answer** — the five `410`s in §4.
2. **Publish the right answer in extractable form** — §5.2 and §5.3.
3. **Make the entity resolvable** — §5.4.

### 5.2 The extractability pattern

Answer engines lift **self-contained paragraphs that answer a whole question without their
surroundings.** Every commercially important page gets one, near the top, in this shape:

> **[Direct answer, first sentence, with the number in it.] [The qualifier that makes it true.]
> [The venue and town.]**

Concretely, on `/rates`:

> *A simulator bay at The Links of Lakeville costs `{{WINTER_RATE_LAKEVILLE}}` per hour. The rate is
> per bay, not per person — up to six players can share one bay, though four is better for pace of
> play. The Links of Lakeville is at 17630 Juniper Path Suite H in Lakeville, Minnesota; The Links of
> Stillwater is at 5862 Omaha Ave N, inside Stillwater Bowl & Lounge.*

That paragraph answers *"what does a golf simulator cost per hour in the Twin Cities"* with a number, a
unit, a caveat and two addresses, and it survives being quoted alone. The current site cannot produce a
single paragraph like it, because the numbers are inside JPEGs.

**Five rules the build enforces:**

| Rule | Why | Playbook |
|---|---|---|
| Every number in **HTML text**, never an image | The menu, membership card and specials are all images today. A crawler, an answer engine and a screen reader all see an empty page. | `playbook-core.md` §8 |
| Every claim carries its **venue and town** in the same sentence | Answer engines chunk. A price with no town is unquotable for a "near me" question. | `playbook-core.md` §7 |
| Every seasonal fact carries its **season and year** | An undated price is a price the engine will still be repeating next March. | `playbook-core.md` §8 |
| **One canonical statement per fact**, sitewide | Today: 3 phone numbers, 2 sim technologies, 2 summer-rate end dates, 3 legal entities. Contradiction is worse than silence — the engine picks one at random and it may pick the dead one. | audit §4 |
| Prose answers **match the JSON-LD** exactly | Divergence is a spam signal and defeats the point of both. | §3.8 |

### 5.3 The FAQ content to write

These are the actual questions. Grouped by the real-world query they serve. **Answer in the venue's own
voice** — the `/our-story` voice, per `playbook-sim-venue.md` §2 (*"warm and slightly irreverent beats
premium and serious"*), not in corporate FAQ-ese.

Each answer follows the same discipline: **first sentence answers it outright; the venue and town appear
by name; no answer is under 40 words or over 120.**

#### A. Cost — the highest-value AEO cluster
*Serves: "what does a golf simulator cost per hour in the Twin Cities", "how much is indoor golf in Minnesota"*

1. **How much does a golf simulator cost per hour at The Links?**
2. **Is the price per person or per bay?** *(The genuine differentiator — competitors publish per-bay pricing without ever saying so, and a group of four reads $35 as $140.)*
3. **What does an hour of indoor golf cost in the Twin Cities generally?** *(Answer honestly with a range and say where The Links sits in it. Engines reward the page that answers the category question, not just the brand question.)*
4. **Do you charge more on weekends or at night?** `{{PEAK_PRICING}}`
5. **What is the cheapest way to play regularly?** *(LinksFlex and memberships — the retention pitch, in an informational frame.)*
6. **Is there a credit card surcharge?** `{{CARD_SURCHARGE_STATUS}}` *(Currently disclosed only on a menu graphic. Answering it here is a trust move that costs nothing.)*
7. **Do you sell gift cards, and can they be used at both locations?** `{{GIFT_CARD_CROSS_VENUE}}`

#### B. Where — the local-pack cluster
*Serves: "where can I play indoor golf near Stillwater MN", "indoor golf near me"*

8. **Where can I play indoor golf near Stillwater, Minnesota?** *(Answer with The Links of Stillwater — 4 GolfZon NX bays at 5862 Omaha Ave N, inside Stillwater Bowl & Lounge — **and then name the neighbouring towns it serves**: Oak Park Heights, Bayport, Lake Elmo, Mahtomedi, and across the river from Hudson, WI.)*
9. **Where can I play indoor golf in the south metro?** *(Same shape for Lakeville: Apple Valley, Burnsville, Farmington, Rosemount, Prior Lake.)*
10. **Is The Links of Stillwater the same business as The Links of Lakeville?** *(Yes — one brand, two venues, opened 2022 and 2026. This question is doing entity-resolution work; it is worth more than it looks.)*
11. **Wasn't this called Lakeville Links?** *(The rebrand, answered directly. Every stale citation on the internet says "Lakeville Links"; this is the page that reconciles them.)*
12. **Are you inside the bowling alley?** *(Stillwater — the co-location is an asset, not an apology. It also captures the "Stillwater Bowl golf simulators" query.)*
13. **What are your hours?** `{{LAKEVILLE_HOURS}}` / `{{STILLWATER_HOURS}}` *(Answer **per venue, by day**, in text. This is the segment's #1 gap: `playbook-core.md` §2 — 67% of sim venues and 74% of courses don't put hours on the homepage.)*
14. **Where do I park?** `{{PARKING_LAKEVILLE}}` / `{{PARKING_STILLWATER}}`

#### C. Leagues — the retention cluster
*Serves: "indoor golf leagues near me", "winter golf league Minnesota"*

15. **Do you have indoor golf leagues?** *(Yes, at both venues — then the lineup.)* `{{LEAGUE_LINEUP}}`
16. **Can I join a league if I've never played in one?** *(Beginner reassurance. `playbook-core.md` §5: only 33% of league pages do this, **and it is the top reason people don't join**.)*
17. **What format are the leagues?** `{{LEAGUE_FORMAT}}` *(46% of league pages never explain it.)*
18. **How much does a league cost, and what does that include?** `{{LEAGUE_PRICE}}` *(50% don't state a number.)*
19. **What night do leagues play, and how many weeks?** `{{LEAGUE_NIGHT}}` `{{LEAGUE_SEASON_DATES}}`
20. **Do I need a team, or can I sign up alone?** *(The single most common unasked barrier.)*
21. **Are the leagues handicapped?** *(Sub-question of 16 and worth its own answer — "yes, a first-timer can win a match" is the sentence that converts.)*
22. **The league I want is full — what now?** *(**The waitlist answer.** Across 126 audited sites, exactly zero offered a waitlist. This question, answered with a live capture form, is the highest-value single component in the playbook — `playbook-core.md` §5.)*
23. **When does registration open for the next season?** `{{LEAGUE_REGISTRATION_OPENS}}`
24. **Do you run junior leagues?** `{{JUNIOR_AGE_RANGE}}` `{{JUNIOR_SEASON_2027}}`

#### D. First-timers — the largest addressable audience
*Serves: "is indoor golf fun if you don't golf", "do you need clubs for a golf simulator"*
> `playbook-core.md` §8: *"Write to the least confident visitor. The person who has never used a simulator and doesn't know if they'd embarrass themselves is a larger addressable market than the scratch golfer, and almost nobody writes for them."*

25. **Do I need my own clubs?** *(No. Rental sets are $15 at Lakeville; balls are included.)*
26. **I've never used a golf simulator. Will I embarrass myself?** *(Answer it in the venue's actual voice. This is the question the entire segment refuses to write.)*
27. **Is this fun if I don't golf?** *(Full bar, 9 TVs, games, and the fact that the buyer is frequently not a golfer at all — `playbook-sim-venue.md` §1.)*
28. **How many people fit in one bay?** *(Up to 6; 4 recommended for pace of play. A confirmed, published number — use it.)*
29. **How long does 18 holes take on a simulator?** *(About an hour per person; a foursome is about four hours. Confirmed copy already on the site and genuinely useful.)*
30. **Can left-handed golfers play?** *(Five of six Lakeville bays. `{{STILLWATER_BAY_HANDEDNESS}}`. Nobody in the peer set answers this and left-handers ask it every time.)*
31. **What should I wear?** *(No dress code, and say so — the unasked anxiety.)*
32. **Can kids play? Is there an age limit?** *(And the bar/minor policy.)* `{{MINOR_POLICY}}`

#### E. Booking and policy — the pre-transaction cluster

33. **How do I book a bay?** *(And name Whoosh explicitly — `playbook-core.md` §6: *"Never link out mid-funnel without warning."*)*
34. **What is your cancellation policy?** *(Free cancellation 48+ hours ahead; inside 48 hours may be charged in full. **The top pre-booking objection in the segment and almost never answered** — `playbook-sim-venue.md` §4.)*
35. **Do I pay when I book or when I arrive?** *(Lakeville: card held, charged at the venue. Stillwater: charged in full at booking. A real, currently-hidden difference between the two venues.)*
36. **Do you take walk-ins?** `{{WALKIN_POLICY}}`
37. **What happens if I finish early?** *(You pay for the time booked. Published today; keep it.)*
38. **Is there a minimum booking length?** `{{MIN_BOOKING_LENGTH}}`

#### F. Groups and events — the highest-ticket cluster
*Serves: "corporate event golf simulator Twin Cities", "birthday party golf simulator MN"*

39. **Can I book the whole place for a party?** `{{BUYOUT_PRICE_LAKEVILLE}}` `{{BUYOUT_PRICE_STILLWATER}}`
40. **How many people can you host?** *(Lakeville: 6 bays, up to 36 golfers — a real published number. `{{STILLWATER_EVENT_CAPACITY}}`. Competitors publish this; The Links currently hides it.)*
41. **What does a corporate event cost?** `{{GROUP_PRICING}}` `{{EVENT_MINIMUM_SPEND}}`
42. **How far in advance should I book an event?** `{{EVENT_LEAD_TIME}}`
43. **Can we bring a cake, or outside food?** `{{OUTSIDE_FOOD_POLICY}}`
44. **Do you do fundraisers?** *(Listed as an event type today with nothing behind it; a real answer here is a local-link magnet.)*

#### G. The kit — the credibility cluster

45. **What simulators do you use?** `{{SIM_TECH_LAKEVILLE}}` *(**The correction question.** GolfZon NX, at both venues, if confirmed. This is the answer that has to displace "TwoVision" in the engines — `playbook-core.md` §8: 42% of sim venues name no brand at all.)*
46. **What's the difference between GolfZon NX and a TrackMan bay?** *(Answer it fairly. Both Lakeville rivals run TrackMan. A fair comparison written by the venue is the kind of page answer engines cite; a hatchet job is not.)*
47. **How many courses can I play?** `{{COURSE_COUNT}}`
48. **Is it accurate enough to practise on?** *(The serious-golfer question — moving swing plate, high-speed cameras, real ball flight.)*
49. **Do you have food and drinks?** *(Lakeville: own kitchen and full bar, menu in full. Stillwater: via Stillwater Bowl & Lounge. Two different true answers — give both.)*

**49 questions. Ship the ones that can be answered today; each remaining token is a client-input
blocker, not a reason to guess.** `brief.md` §8: *"anything not confirmed by the client ships as a gap,
not a guess."*

**Placement:** all 49 on `/faq` with `FAQPage` schema (§3.8). The 6–10 most relevant to each page also
appear **on that page**, in an expandable block, with the same answer text — `/rates` gets cluster A,
`/leagues` gets C, `/book` gets E, `/events` gets F, `/simulators` gets G.

### 5.4 Entity resolution — the part that isn't on the website

An answer engine recommending an indoor golf venue near Stillwater is reconciling the venue's website
against Google Business Profile, Apple Maps, Yelp, Facebook, Bing Places, and the vertical directories
that showed up in every live search: **TwinCitiesGolf.com, GolfSimMap, playgolfindoors.com,
greatplacesminnesota.com, teebly.io, visitlakeville.org, screengolfers.com,** and the
**Greater Stillwater Chamber**. Consistency across those is what makes the entity resolvable.

**Ranked by impact:**

1. **Create and verify a Google Business Profile for The Links of Stillwater.** The site's own Stillwater
   map link resolves to Stillwater Bowl & Lounge — strong evidence no separate profile exists. A venue
   with no GBP cannot appear in a local pack, cannot accumulate reviews, and is nearly invisible to the
   "near me" answer. Six months of operating history are already lost. `{{STILLWATER_GBP_URL}}`
2. **Fix the NAP contradictions before touching anything external.** Three phone numbers, one `tel:`
   that dials a different number than it displays, three legal entity names, four opening dates for
   Stillwater. Propagating inconsistency to twenty directories is worse than propagating nothing.
   `playbook-core.md` §7: *"NAP in the footer, identical character-for-character to the Google Business
   Profile."*
3. **Update the Lakeville GBP name** to match the rebrand, and point both GBP website fields at their
   **location pages**, not the homepage.
4. **Correct the directory listings that carry the TwoVision claim** — GolfSimMap, playgolfindoors,
   screengolfers, teebly. GolfSimMap additionally claims Stillwater has 10 bays; it has 4. These are the
   sources the engines are reading.
5. **Get listed on TwinCitiesGolf.com's league directory.** It ranked above every individual venue on
   the live league query, it has already covered both venues editorially (three features), and it is a
   local, topical, genuinely relevant citation. This is probably the single best link available.
6. **Claim the Greater Stillwater Chamber listing** — it currently carries Lakeville's phone number.
7. **Link the Stillwater Facebook page from the site.** It exists, it is active, and nothing on the
   website points to it — which means nothing tells an engine the two are the same entity.

### 5.5 What to measure

`playbook-core.md` §11, with the AEO layer from `brief.md` §2. Baseline is effectively zero.

| Question | How | Cadence |
|---|---|---|
| Does an engine name The Links for *"indoor golf near Stillwater MN"*? | Manual prompt across ChatGPT / Claude / Gemini / Perplexity, logged verbatim | Monthly |
| Has the **TwoVision** claim stopped appearing? | Same prompts, watch for the phrase | Monthly until clear |
| Is the venue described with the **right bay counts** (6 / 4)? | Same prompts | Monthly |
| Non-branded organic sessions | GA4 `G-DTLFJD8KFF` | Monthly |
| `LocalBusiness` impressions **per venue** | Search Console, two GBP profiles | Monthly |
| **Waitlist signups** | GA4 event | Weekly in season — *"the metric to watch,"* `playbook-core.md` §11 |

---

## 6. Sequenced next actions

| # | Action | Owner | Blocks |
|---|---|---|---|
| 1 | Create + verify the **Stillwater Google Business Profile** | Client | All Stillwater local ranking. Start today; verification takes weeks. |
| 2 | Resolve the **NAP contradictions** — phone per venue, legal entity per venue, one opening date | Client | Schema, footer, every directory update |
| 3 | Confirm **`{{SIM_TECH_LAKEVILLE}}`** — NX or TwoVision | Client | `/simulators`, the homepage, and the AEO correction |
| 4 | Supply **winter rates + winter hours, per venue** | Client | `/rates`, both `LocalBusiness` blocks, FAQ cluster A. **Hard deadline 2026-10-03** — the published rate expires |
| 5 | Supply the **adult league lineup** — format, night, price, dates, per venue | Client | `/leagues`, all `Event` schema, FAQ cluster C. The highest-value page of the year |
| 6 | Reverse the domain redirect, then ship the §4 map in one change window | Build | Everything |
| 7 | Transcribe menu / memberships / rates out of images into HTML + schema | Build | `/food-and-drink`, `/memberships`, `/rates` |
| 8 | Write the 49 FAQ answers that are not token-blocked | Build | `/faq`, AEO |
| 9 | Correct the directory listings carrying the TwoVision and 10-bay claims | Build | AEO |
| 10 | Instrument GA4 events: booking click, league registration, **waitlist signup**, event enquiry | Build | Measurement |

---

## Appendix — playbook rules applied, with citations

| Applied where | Rule | Source |
|---|---|---|
| §2, all titles | `<title>` with a geographic cue — *56% of sim venues have none* | `playbook-core.md` §7 |
| §2, all descriptions | Unique meta description, 70–155 chars — *20% have none at all* | `playbook-core.md` §7 |
| §2.2 | Exactly one `<h1>` per page — *38% have none* | `playbook-core.md` §7 |
| §2.2 | Server-rendered HTML is mandatory — *9% serve a JS shell* | `playbook-core.md` §7 |
| §3.3 / §3.4 | `LocalBusiness` or correct subtype, with NAP, hours, geo — *61% lack it* | `playbook-core.md` §7 |
| §3.3 | `BarOrPub` subtype where F&B is material | `playbook-core.md` §7 |
| §3.5 | `Event` schema on every league and tournament — *1% of the corpus* | `playbook-core.md` §7 |
| §3.5 | Three registration states, never a dead end; waitlist mandatory — *0 of 126 sites* | `playbook-core.md` §5 |
| §3.8 | `FAQPage` schema — *4% of the corpus* | `playbook-core.md` §7 |
| §3.9 | Live review widget over self-asserted `aggregateRating` — *6% have a widget* | `playbook-core.md` §4 |
| §3.10 | Schema validates; `Event` on every league | `playbook-core.md` §10 ship gate |
| §4.1 | Sitemap declared in `robots.txt`; block no AI crawler | `playbook-core.md` §7 |
| §4.2 | No duplicate homepages (`/` and `/home` both live) | `playbook-core.md` §9 |
| §4.3 | Every date-bearing page carries a season or year + a refresh owner | `playbook-core.md` §8 |
| §5.2 | Prices as text, never images; menus as HTML, never PDFs | `playbook-core.md` §8 |
| §5.3 D | Write to the least confident visitor | `playbook-core.md` §8 |
| §5.3 G | Name the simulator technology — *42% don't* | `playbook-core.md` §8 |
| §5.3 C | Beginner reassurance on leagues — *only 33% do it* | `playbook-core.md` §5 |
| §5.3 E | Cancellation policy findable from booking | `playbook-sim-venue.md` §4, §7 |
| §5.4 | Footer NAP identical character-for-character to GBP | `playbook-core.md` §7 |
| §1.2 | Canonical 14-page sitemap; Leagues in the top nav | `playbook-sim-venue.md` §3 |
| §1.3 `/rates` | Rates and hours on one page | `playbook-core.md` §3 |
| §1.3 `/leagues` | Full nine-element leagues spec | `playbook-core.md` §5 |
| §1.1 | Target 12–18 pages; add answers, not pages | `playbook-core.md` §3 |
| §5.5 | Waitlist signups is the metric to watch | `playbook-core.md` §11 |
