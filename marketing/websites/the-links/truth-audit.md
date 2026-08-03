# The Links — Truth Audit

**Run:** 2026-08-03 · **Scope:** the built site at `the-links-marketing/src/**` and the Paper
design exploration at `design/SUBPAGE-EXPLORATION.md`.
**Method:** every claim traced to (a) the archived raw HTML in `_ingest/raw/`, (b) a live
`curl` of `https://www.lakevillelinks.com` re-run today to confirm the archive is still
current, (c) first-hand reads of the client's price and menu **images** (downloaded and read,
not taken from the earlier OCR pass), or (d) a named third party. Nothing below is taken on
the word of `operating-facts.md` alone.

**Verdict counts**

| Class | Count |
|---|---|
| SUPPORTED | 40 |
| UNSUPPORTED | 24 |
| CONTRADICTED | 10 |
| DERIVED | 11 |
| MARKED UNKNOWN | 27 |
| **Total claims audited** | **112** |

Two housekeeping notes before the findings.

**The archive is still accurate.** Re-fetched today: `/` still says "6 GolfZon NX Simulators"
and "4 GolfZon NX Simulators"; `/rates` still says "Summer 2026 Hours & Rates: $35/Hour",
"11am to 9pm Daily" and the Sunday–Saturday day list; `/about` still says "We have (6) Total
simulators. (5) are set up for both right and left handers. (1) is right hand only." and "We
have (9) TVs for your enjoyment!". Nothing has moved under us.

**Two of our own extraction documents are wrong, and one of them is the "corrections" file.**
See CONTRADICTED §C7. This matters more than any single page claim, because anyone briefing
the client will read `_corrections.md` as authoritative.

---

## SUPPORTED — 40

Each of these is stated by the client's own live site, by GolfZon's own material, or by a
named third party. Citation is the exact published string.

### Simulator technology

**S1 · "GolfZon NX" at both venues, six bays in Lakeville and four in Stillwater.**
`src/content/venues/*.json`, `index.astro`, `simulators.astro`, `faq/07`, `faq/09`, `faq/10`.
Source, live today at `https://www.lakevillelinks.com/`:
> "6 GolfZon NX Simulators" · "4 GolfZon NX Simulators" · "Experience the most advanced golf
> simulator technology available featuring Golfzon NX sims along with great food and drinks."

Supported **as a faithful transcription of what the client publishes today**. Whether that
name is correct is a separate question — see C1.

**S2 · Lakeville has six bays.** `https://www.lakevillelinks.com/about`: "We have (6) Total
simulators."

**S3 · "Five bays play both-handed; one is right-handed only."** `venues/lakeville.json`,
`simulators.astro`, `book.astro`, `faq/04`. Source, `/about`, verbatim:
> "(5) are set up for both right and left handers. (1) is right hand only."
This is the single best-evidenced facility claim on the site. It also appears in the Paper
Simulators design as "five `L|R` cells and one `R`" — correctly.

**S4 · Nine TVs / "nine screens" at Lakeville.** `/about`: "We have (9) TVs for your
enjoyment!"

**S5 · "Up to 36 golfers" at Lakeville.** `https://www.lakevillelinks.com/groups`:
> "With 6 bays and room for up to 36 golfers and great food and drink options…"

**S6 · Club rental $15, Lakeville, basic sets.** `/about`:
> "We do have sets available to rent for $15 (these are basic clubs)"
Our pages correctly scope it to Lakeville and correctly say "basic, not fitted".

**S7 · Balls are included.** `/about`: "No need to bring your own balls! Each simulator
includes its own balls!"

**S8 · Full bar and food at Lakeville.** `/about`: "We have a full bar and great food!"

**S9 · Stillwater has four bays.** `/`: "4 GolfZon NX Simulators".

**S10 · Stillwater sits inside Stillwater Bowl & Lounge, and its food and drink come from
them.** `https://www.lakevillelinks.com/stillwater`:
> "A joint-entertainment facility connected to a bowling alley" · "In partnership with
> Stillwater Bowl, we are bringing you amazing burgers and bites paired with a full selection
> of drinks."
Homepage: "Full bar and menu (via Stillwater Bowl)".

**S11 · Stillwater opened in early 2026.** `venues/stillwater.json`, `faq/09`. Every client
version of the date falls inside January–February 2026, so the hedge "early 2026" is true
under all of them. (`about.astro`'s harder claim is not — see C5.)

**S12 · Lakeville opened in autumn 2022.** `/our-story`: "We finally opened in the fall of
2022." Grand opening 29 October 2022 per `/news/grand-opening-is-planned-for-october-29th-2022`.

**S30 · GolfZon sensors measure ball speed, launch angle, spin rate and club path.**
`faq/07` and the Paper Simulators page. GolfZon's own technology page
(`golfzongolf.com/global/user/technology/sensors.do`) on the T2 sensor:
> "ball speed, direction and trajectory, spin rate, launch angle and spin axis"
and on the TwoVision sensor:
> "club path and the angle of attack from your stroke"
So all four named metrics are GolfZon's own claims. **Caveat worth knowing:** they span two
different sensors — the ball metrics come from the floor-mounted T2, the club metrics from
the overhead TwoVision unit. Our copy attributes them all to overhead cameras (see C6).

**S31 · Moving swing plate, high-speed camera sensors, auto-tee and ball retrieval,
touchscreen kiosk.** `simulators.astro` `hardware[]`. Client homepage feature bullets,
verbatim: "Moving Swing Plate", "High-Speed Camera Sensors", "Touchscreen Monitor Kiosk",
"Auto-Tee and Ball Retrieval System". The plate description is corroborated by GolfZon:
> "Five-segment plates (1 segment for the hitting mat and 4 segments for the stance mat)"
> that "can create approximately 100 detailed slopes", with "a fairway mat, two types of rough
> mats, and two bunker mats".

### Rates, hours and packages

**S13 · $35 per hour, per bay.** Homepage: "$35 per hour per bay!" · `/rates`: "Summer 2026
Hours & Rates: $35/Hour". "Per bay, not per person" is the client's own framing, not ours.

**S14 · Lakeville hours 11am–9pm daily.**
**S15 · Stillwater hours Sun 12–7, Mon 12–9, Tue–Fri 3–9, Sat 10–10.**

These two are **supported**, and the brief's suspicion that they may be swapped is unfounded.
I resolved it from the page's own CSS grid rather than from reading order. In
`_ingest/raw/rates.html`, at `min-width: 768px`:

| Block | Content | `grid-area` | Column |
|---|---|---|---|
| `yui_3_17_2_1_1768581994487_23244` | "Lakeville, MN" | `12/2/14/11` | left |
| `697fa4a4ddc32628f4cd` | "11am to 9pm Daily" | `13/2/17/13` | left |
| `ceaeee4f536ce4a35b45` | "Stillwater, MN" | `12/14/14/23` | right |
| `a5aa092b36c7eccf9bf6` | "Sunday → 12PM to 7PM …" | `13/14/18/25` | right |

The mobile stack (`max-width: 767px`) confirms it independently, because the blocks reflow to
rows 23 / 24 / 32 / 34 in exactly that order: Lakeville heading, Lakeville hours, Stillwater
heading, Stillwater hours. **Two headings, two schedules, correctly bound in both
breakpoints.** Our data matches. See C7 for why our own correction file says otherwise.

**S16 · Summer Monthly $149 individual / $199 family.** `memberships.astro`. The client
publishes these **only inside a PNG**, so I downloaded and read
`Screenshot 2026-05-07 130606.png` first-hand rather than trusting the earlier OCR. It reads:
> "Summer Membership Monthly Individual — Golf Anytime! — **$149 Monthly**"
> "Summer Membership Monthly Family — Golf Anytime! — **$199 Monthly**"
Confirmed. **Standing risk:** because these numbers exist nowhere in HTML on the client's
site, they cannot be re-verified by a crawl and can change without any trace we could detect.

**S17 · Two hours of bay time a day.** Same image: "Includes (2) Hours Per Day!". Page body,
in HTML: "Includes 2 hours a day".

**S18 · 21-day booking window.** Same image: "21-Day Booking window". Also in HTML text on
`/memberships` under LinksFlex.

**S19 · 10% off food and drink.** Same image: "10% Off Food & Beverage". Also HTML text.

**S20 · Bills automatically until 3 October, or until cancelled.** Same image: "Automatic
Monthly Renewal until October 3rd - Or until cancelled". Our "until 3 October 2026" adds the
year; the year is safe (it matches the rates window).

**S21 · LinksFlex Off Peak $399 / $749 / $1,399.** Unlike the monthly tiers, these **are**
HTML text on `/memberships`, verbatim: "12 Hours: $399 / 24 Hours: $749 / 48 Hours: $1399".

**S22 · LinksFlex Junior $299 / $549 / $999, 13–18 year olds, M–F 2pm–5pm.** HTML text:
"13-18 Year Olds", "LinksFlex Junior", "M-F 2P-5P", "12 Hours: $299 / 24 Hours: $549 /
48 Hours: $999".

**S23 · LinksFlex Anytime $549 / $1,049 / $1,899.** HTML text: "12 Hours: $549 / 24 Hours:
$1,049 / 48 Hours: $1,899". Our page holds this tier back from sale and discloses why — a
defensible call, honestly made.

**S24 · LinksFlex is Lakeville only.** Heading, verbatim: "LinksFlex Packages (Lakeville
Location Only)".

**S25 · Off Peak window "M–F 8am–5pm, and Sundays after 3pm".** Verbatim: "M-F 8a-5P; Sun
after 3PM".

**S26 · Hours never expire.** `/memberships`: "No guest fees. Hours never expire."
`/linksflex-terms-conditions`: "LinksFlex packages do not expire." **But the T&C attaches a
condition our page drops** — see U5.

**S27 · 3% credit-card surcharge; debit exempt.** `menu.astro`. I downloaded and read the
menu cover image first-hand. Verbatim:
> "IF YOU USE A CREDIT CARD, WE WILL CHARGE A 3% FEE TO HELP OFFSET PROCESSING COSTS. THIS
> AMOUNT IS NOT MORE THAN WE PAY IN FEES. WE DO NOT SURCHARGE ON DEBIT CARDS."
Our "Cash and debit avoid it" is a safe reading. The Stillwater caveat is correctly stubbed.

### Facility, people, proof

**S28 · Bay sponsors: Align (1), Thor (2), Von Hanson (4), Miller (5), Kretsch (6); Bay 3
absent.** `about.astro`. Evidence is the image filenames and `alt` text on
`/advertisinglogos`: `Align Logo Bay 1.png`, `Thor Logo Bay 2.png`, `Von Hanson Logo Bay
4.png`, `Miller Logo Bay 5.png`, `Kretsch Logo Bay 6.png`. No Bay 3 file exists.
**Caveat:** no body copy on the client's site names these sponsors. These are real local
businesses who paid for the bays, and filenames are abbreviations — "Von Hanson" is almost
certainly "Von Hanson's Meats". Publishing a paying sponsor's name in truncated form is a
small error with an outsized apology attached. Get the list confirmed.

**S29 · Lakeville phone 612-699-0526 and `info@lakevillelinks.com`.** Global footer, `/about`,
`/rates`. (Stillwater's number is a different story — C4.)

**S32 · The 2026 junior league as described.** `juniors.astro`. All six facts transcribe
verbatim from `/juniorleagues`: "Weeks of January 11th thru March 8th 2026", "8 Weeks!",
"SUNDAYS:", "Girls sessions- 3pm to 6pm", "Boys sessions - 6pm to 9pm", "2-Person Best Ball
Match Play (Team vs Team)", "$250 Per Person ($500 per Team)", "Payment required on or before
league start", and the weeks 1–3 / 4–6 / 7–8 structure. Putting it in the past tense and
dating it is the right handling of content the client still presents as "Sign-Up Now".

**S33 · The four coaches and their credentials.** `lessons.astro`. Every bullet transcribes
from `/instruction`, including the load-bearing ones: "Class A PGA Golf Professional",
"Director of Golf Instruction at Emerald Greens Golf Course", "coached the Rosemount girls
golf teams since 1991", "inducted into the MN State Golf Coaches Association Hall of Fame in
2018". Correctly stubbed as needing re-confirmation with each coach.

**S34 · Press attribution to TwinCitiesGolf.com.** `about.astro`. The client's own blog post
"First Look at Lakeville Indoor Golf" carries **no outlet attribution** (author: "Guest
User"), so this credit was originally an inference. It happens to be right: I resolved both
embedded videos through YouTube's oEmbed endpoint and both return
`"author_name":"twincitiesgolf"`, `"author_url":"https://www.youtube.com/@twincitiesgolf"`.
Attribution stands. The *titles* we print do not — see U22.

**S35 · The origin story.** `about.astro`. Near-verbatim from `/our-story`: December 2021
start, Wednesday-night golf, "six feet of Minnesota sadness", bourbon nights, "This doesn't
look THAT hard. Spoiler alert: it was.", "We formed the LLC in January", choosing GolfZon
"because it felt the most immersive and realistic", "an IT professional and a commodity
broker", the Stillwater Bowl simulators "running on Windows 98", the rebrand, and
`thelinks.golf`. This section is the cleanest writing in the build and the best-sourced.

**S36 · Booking is on Whoosh, two separate club accounts; Lakeville places a hold, Stillwater
charges in full.** `policy.astro`. Verbatim from `/booking`: "Credit Card Required to hold
your reservation… Charges will be transferred to our POS system, so you can split the bill";
from `/bookingstillwater`: "Credit Card Required to make your reservation. Your card will be
charged in full." Both Whoosh URLs return HTTP 200 today.

**S37 · Gift cards via Square.** Both `globalData.external` URLs return HTTP 200 and match the
account published on the client's `/rates`.

**S38 · One hour per person for 18 holes; four people ≈ four hours.** `policy.astro`,
`events.astro`, `simulators.astro`. Verbatim, on three client pages: "It takes one person
around an hour to complete 18 holes. Each additional person is about an hour. A group of four
will take around four hours to complete 18 holes."

**S39 · You pay for the whole booking; the slot ends five to the hour; we may move your bay.**
`policy.astro`. Verbatim from `/policy`: "Accept responsibility for full payment of all
hour(s) booked", "Time period booked ends at 5 minutes to the hour to allow the next group to
start on time", "We reserve the right to move a booking to a different bay to optimize our
tee sheet".

**S40 · The menu is Minnesota thin-crust pizza, wings and appetisers.** `menu.astro` intro.
From the menu graphic: "AVAILABLE ON 14\" REGULAR CRUST OR 10\" GLUTEN SENSITVE — MINNESOTA
THIN CRUST!", plus the wings and appetiser sections.

---

## UNSUPPORTED — 24

**This is the section that matters.** Each of these is stated on our site or in the Paper
designs with nothing behind it.

### U1 · "Four readings" — the framing is ours, not GolfZon's
`design/SUBPAGE-EXPLORATION.md:25` — "The machine measures things, so the page does too. **Four
readings** as small diagrams…"

GolfZon nowhere characterises its output as four readings. Its own sensors page lists **five**
for the T2 alone ("ball speed, direction and trajectory, spin rate, launch angle and spin
axis"), then club path and angle of attack from the TwoVision unit, then — on TwoVisionNX —
"a comprehensive four-stage weight shift analysis". Our own `simulators.astro:44` lists
**five** ("speed, face angle, path, spin, launch"). So the design commits to four, the code
ships five, and the manufacturer implies seven or more.

"Four readings" is a design conceit that reads as a product specification. It is the exact
thing the client flagged. **To confirm it:** nothing will — there is no source that says
four. The honest fix is to stop counting and name the metrics.

**Note on "reads all four whether you look at them or not":** that string does not exist
anywhere in this repository or in `SUBPAGE-EXPLORATION.md`. I grepped for it and for every
fragment of it. It lives only in the Paper file, which I cannot read from here. **Cannot
verify the wording** — but the "four" in it inherits the problem above, and the substantive
half ("whether you look at them or not") is true of any launch monitor and is unobjectionable.

### U2 · "It is the same system used on the GolfZon tour"
`src/content/faq/07-simulator.json`.

Partly checkable, and it does not fully check out. The GOLFZON Tour's own FAQ states the
venue requirement:
> "You must have either a TwoVision or TwoVisionNX and a Dual Plate or Motion Plate."

So the tour runs on this **family** of hardware — but the requirement is two-part, and we have
verified neither part for these bays. We have not confirmed which TwoVision generation is
installed (C1/M15) and we have no evidence at all about the plate. There are also two
different things called a GolfZon tour: GTOUR in Korea, and the GOLFZON Tour launched in North
America in 2024. The sentence implies a parity we cannot demonstrate.

**To confirm it:** the client tells us the exact model and plate in each bay. If it is
TwoVision or TwoVisionNX **with** a Dual Plate or Motion Plate, the sentence becomes true and
becomes a genuinely strong differentiator worth more prominence than an FAQ answer.

### U3 · "No guest fees on either monthly tier. Guests play on your booking, in your bay."
`memberships.astro:100`.

The first sentence is supported. The second is invented, and it resolves a live ambiguity in
the customer's favour without saying it is doing so. The Individual card, read first-hand off
the price image, says **both** things at once:
> "** Only available for the package purchaser | No Guest Fees"

The Family card, by contrast, is explicit: "Available to package purchaser and immediate
family members to use | No guest Fees". The natural reading is that "no guest fees" means the
purchaser is not charged extra for people in their bay — which is what we wrote — but the
membership T&Cs cut the other way:
> "Each Membership Packages represents one use of the designated service or facility access as
> defined by the package, **ONLY FOR THE PURCHASER**."

`operating-facts.md` flagged this as "Needs client clarification". The built page removed the
flag and shipped an answer. **This one can cost a customer money at the till.**

**To confirm it:** one sentence from the client: can an Individual member bring guests into
their bay at no charge, yes or no.

### U4 · "Buy extra hours any time at the normal rate"
`memberships.astro:41`. The client's bullet is "Purchase more hours anytime". Nothing states
the price of those hours. The retired Fareway 2025 page did ("charged at the summer rate of
$35/hour") — but that page sells a different membership through a retired vendor and is not
evidence for 2026.

### U5 · "The hours never expire" — published without the condition attached to it
`memberships.astro:104`, `index.astro` hero region, `lessons.astro:230`, `faq` framing.

"Hours never expire" is the client's own marketing line, so as a quote it is supported (S26).
But the LinksFlex T&Cs qualify it:
> "LinksFlex hours remain valid for as long as the customer **is in good standing with the
> Company and the Company continues to offer the associated service**."

We publish the promise and drop the condition. That is the shape of a complaint.

### U6 · "In February that is the only range in Minnesota that is open"
`lessons.astro:228`.

False, and contradicted by our own site two pages away: `simulators.astro:145` says "the
others you will see around the Twin Cities are TrackMan and Full Swing". Applewood Hills Golf
Course, 11840 60th St N, **Stillwater MN 55082** — the client's own second market — publishes
"Two top of the line Trackman Golf Simulators". This is a rhetorical flourish that reads as a
factual superlative, and it is the kind of line a competitor screenshots.

### U7 · "Leagues at both venues through the fall and winter"
`src/content/faq/06-leagues.json` ("Yes, at both venues through the fall and winter") and
`index.astro:80` ("Fall and winter leagues at both venues").

Stillwater has never run a league. The client's own `/stillwater` page says "Leagues &
Contests (Coming Soon)", and our own content file
`leagues/fall-winter-2026-stillwater.json` calls it "Stillwater's first league season". The
FAQ answer states an established practice at a venue that has not yet done it once.

### U8 · "League nights are the reason winter is our busiest season"
`index.astro:289`. An operational claim about the client's own business that the client has
never made. Plausible; unevidenced.

### U9 · "Most of our league players hadn't either"
`index.astro:295`, and both league content files ("Most of our league players were too" /
"Neither had most of the room"). A claim about the composition of their membership. Nobody
has counted.

### U10 · "Most first-timers here have never held a club" / "Most people in the building have
not either" / "that is most of the room"
`faq/01-never-golfed.json`, `simulators.astro:193`, `simulators.astro:68`, `about.astro:222`.
Four instances of the same unevidenced pattern. It is good copy and it may well be true —
but it is presented as knowledge of who is in the room.

### U11 · "Junior leagues fill from the list before they are advertised anywhere else"
`juniors.astro:52`. This is a promise about how the client will operate registration. There
has never been a list. We invented both the mechanism and the scarcity.

### U12 · "Groups usually take two or three bays and rotate"
`events.astro:40`. Unevidenced observation about customer behaviour.

### U13 · "The closest indoor golf to downtown Stillwater and the St Croix valley"
`src/content/faq/09-stillwater.json`. A competitive superlative in an FAQ answer written
specifically to be quoted by AI assistants — so it will be repeated verbatim if it is wrong.

It survives the one test I could run: Applewood Hills (11840 60th St N) is roughly twice as
far from downtown Stillwater as 5862 Omaha Ave N. But no survey was done, and "the St Croix
valley" extends into Wisconsin. **Cannot verify** as stated.

### U14 · "Serves the south metro — Lakeville, Farmington, Apple Valley and Burnsville"
`src/content/faq/10-lakeville.json`. The client says "Your south metro clubhouse"; the four
named towns are ours. Harmless, but it is our geography, not theirs.

### U15 · Gift-card mechanics: "delivered by email, usable the same day", "It takes about a
minute", "It covers food and drink too"
`gift-cards.astro:48`, `:56`, `:34`. Three claims about how the Square card behaves and what
it can be spent on. The page's own stub asks whether one card works at both venues — a good
question — but does not ask the more basic one it has already answered on the customer's
behalf: whether the card covers food and drink at all.

### U16 · "Lakeville has a full bar and its own kitchen"
`events.astro:131`, `menu.astro:53`. The client says "full bar and great food". "Its own
kitchen" is an inference, and it is load-bearing on the Events page because it is the
distinction drawn against Stillwater.

### U17 · Venue latitude and longitude, shipped in JSON-LD
`venues/lakeville.json` (44.6794, -93.2448) and `venues/stillwater.json` (45.035, -92.822),
emitted by `VenueSchema.astro` as `GeoCoordinates`. The client publishes no coordinates
anywhere. These are our geocodes, published to four decimal places — a precision that asserts
confidence we do not have. Both are plausible; neither is verified.

### U18 · "Registration for Fall/Winter 2026-27 opens soon at both venues"
`index.astro:290`. "Opens soon" is a scheduling commitment. The client's `/leagues` page says
only "Check back for league information".

### U19 · Simulator behaviour details we describe but nobody published
`simulators.astro:40` — "in a bunker shot it drops"; `:52` — "You pick the course, the
difficulty and the wind, and it keeps score for everyone in the bay". Standard GolfZon
behaviour, most likely true, but written with the confidence of someone who has stood in the
bay. Neither is in the client's copy or GolfZon's.

### U20 · "GolfZon is one of the three simulator systems people compare"
`simulators.astro:144`. An editorial framing of the market presented as fact. TrackMan and
Full Swing are real local competitors (verified), but "the three" is ours. Also worth a
separate conversation with the client: this names two competitors' technologies on their own
site.

### U21 · Menu meta description: "The whole menu in text, with prices."
`menu.astro:30`. The page contains no menu. This is the sentence Google will show under the
result. The file's own header comment flags it as needing resolution — which means it is
half-marked internally and fully wrong externally.

### U22 · Press titles presented as outlet headlines
`about.astro:37–52`. We print "First Look at Lakeville Indoor Golf" and "Sneak Peek:
Pre-Opening Look Inside Lakeville Links" under the byline "TwinCitiesGolf.com". Those are the
client's **blog post** headlines. The actual videos are titled "Lakeville Links Indoor Golf
Simulator Facility in Lakeville Minnesota" and "Pre-Opening Sneak Peek Inside Lakeville Links
Indoor Golf Simulator" (confirmed via YouTube oEmbed). We are attributing a headline to an
outlet that did not write it, in a section called "In the press".

### U23 · "None of the 126 audited competitors have [a waitlist]"
`design/SUBPAGE-EXPLORATION.md:22`, and `zero of 126` in `leagues.astro:6`, `juniors.astro:10`,
`STYLE-GUIDE.md:278`, `sitemap.md:140`, `brief.md:155`.

**Cannot verify** — it is our own research artefact and the underlying audit is not in this
repository. It is also **internally inconsistent**: `index.astro:64` and `data/global.ts:19`
cite a **96**-site corpus ("appears exactly once across 96 sites"), while everything else cites
126. `SUBPAGE-EXPLORATION.md` is a client-facing document and quotes the 126 figure as the
justification for the largest component on the Leagues page. Two different corpus sizes in
one project is the sort of thing a sharp client notices and then stops trusting the rest of
the numbers.

### U24 · "If you play Bay 2, you are playing Thor's bay"
`about.astro:189`. Assumes the bays are numbered and labelled in the room in a way a customer
can see. Reasonable; unverified.

---

## CONTRADICTED — 10

### C1 · "GolfZon NX" is not a GolfZon product name
**We say** (30+ places, including every `<title>`, the schema, and `metaTitle: 'GolfZon NX
Simulator Bays — Lakeville & Stillwater MN'`): **GolfZon NX**.

**GolfZon says** its simulators are **GOLFZON TWOVISION** and **TwoVisionNX**. There is no
product called "GolfZon NX" on `golfzongolf.com`. The current model was announced on
**4 November 2024** as "TwoVisionNX", and the GOLFZON Tour requirement is written as "either a
TwoVision or TwoVisionNX".

**This reframes the client's own worry, and improves it.** The NX-vs-TwoVision split on their
site is probably not a contradiction at all — "GolfZon NX" is almost certainly shorthand for
TwoVision **NX**, and the 2022 post about "Golfzon TwoVision" is about the previous
generation. That makes the real question sharper and much easier for the client to answer:

> TwoVisionNX did not exist until November 2024. Lakeville opened in October 2022. So either
> the bays were re-fitted after November 2024, or the site is calling TwoVision "NX".

That is a question with a yes/no answer and a date, and it is a far better thing to put in
front of the client than "your site contradicts itself". Whichever way it lands, **the product
name we publish should be GolfZon's** — "GOLFZON TwoVision NX" — because that is the string
people search for and the string an answer engine will match against.

### C2 · "Up to five people per bay" vs the client's published six — and vs ourselves
**We say**, in eleven places: `index.astro:79` "Up to five of you, same price"; `rates.astro:29`
"Bring up to five people for the same price"; `faq/02` "Up to five people can share one bay";
`faq/03` "Up to five comfortably"; `book.astro:24` "Up to five people in a bay comfortably";
`menu.astro:154`; `events.astro:151`; `terms.astro:84`.

**The client says**, `/groups`:
> "Each simulator will accommodate **up to 6 players** but we recommend 4 per simulator for
> the best pace of play."

We are understating the client's own capacity by one person on the pages where people decide
whether their group fits — including the homepage hero.

**And we contradict ourselves three ways.** `simulators.astro:124` says "Up to six people,
though four is the number that keeps a round moving". `events.astro:48` says "Each bay takes
up to 6 people; 4 per bay is the pace we recommend" — and then `events.astro:151`, on the same
page, says "Up to five people per bay, same price". Meanwhile `index.astro:130` and
`rates/summer-2026.json` say "bring up to **five friends**", which means six people, while
`rates.astro:29` says "up to five **people**", which means five. **The site ships 5, 6 and
"five friends" simultaneously.**

### C3 · "$35 an hour through 3 October 2026" vs the client's "until September 30th"
**We say**, unmarked, in eight places (`rates.astro` meta, `faq/02`, `book.astro:23`,
`simulators.astro:206`, `rates/summer-2026.json` `effectiveTo`, and the rates table):
> "through 3 October 2026"

**The client's homepage says**:
> "$35 per hour per bay! **Valid until September 30th, 2026** and subject to change at any
> time."

**The client's `/rates` says**:
> "(May 3rd, 2026 through **October 3, 2026**)"

The client contradicts themselves; we picked one and published it as fact with no marking
anywhere. This is a price claim with a date on it, three days wide, and it is currently
**eight weeks away**. If the rate changes on 30 September and a customer booked 1–3 October
off our page, that is a refund conversation.

### C4 · Stillwater phone number
**We publish** 612-699-0527 (`venues/stillwater.json`) — on the contact page, the location
page, the policy page, and in `LocalBusiness` JSON-LD.

**Sources disagree.** Footer: "Stillwater -> 612-699-0527". But the `/stillwater` page body
says:
> "P: (612) 699 - 0526"

and the Greater Stillwater Chamber's listing for The Links of Stillwater also gives
**(612) 699-0526**. So the number we chose has one source; the other has two. Neither the page
nor the schema carries any marking. The venue record's `needsFromClient` mentions the *Lakeville*
number ambiguity but not this one.

### C5 · "The Links of Stillwater opened in February 2026"
**We say**, `about.astro:115`, in bold, flatly.

**The client's homepage says**:
> "The Links of Stillwater **opens officially on Thursday January 29th**. Join us at the Grand
> Opening party on Friday, January 30th."

**TwinCitiesGolf.com** reports bays open for tee times Thursday 29 January 2026 at 9am.
`/our-story` says February. The grand-opening graphic says the specials ran 2/1–2/7/26.

Everywhere else we hedge to "early 2026" and it holds (S11). `about.astro` is the one place
that commits, and it commits against the client's own homepage.

### C6 · Sensor placement described wrongly
**We say**, `simulators.astro:44`:
> "Cameras **above and beside you** read the club and the ball at impact — speed, face angle,
> path, spin, launch."

**GolfZon says**:
> "Positioned **above and in front of** the player, the sensors meet at 90 degrees for optimum
> data capture"

and the ball metrics come from the **T2**, which is a **floor-mounted** sensor, not a camera.
Also "face angle" is not in GolfZon's published metric list — they publish "club face impact
area". Small, but this is the paragraph whose entire job is to sound like it knows the machine.

### C7 · Our own `_corrections.md` §2 is wrong, and it overrides a correct reading
`_ingest/_corrections.md` §2 states:

> "Two venue headings are followed by **one** schedule, so nothing binds those hours to either
> venue. It may render as two visual columns, but **only one column has content**."

**That is false.** The left column has its own content block: `697fa4a4ddc32628f4cd`, holding
"11am to 9pm Daily", at `grid-area: 13/2/17/13` on desktop and row 24 on mobile — directly
under the "Lakeville, MN" heading in both breakpoints. The correction is right that there is
only one *day-by-day* schedule, and wrong about what follows from it.

`operating-facts.md` §Hours got this right, with the same grid evidence. `_corrections.md`
presents itself as authoritative ("Verified directly by the orchestrator; these override the
subagent's reading") and overrides the correct reading with an incorrect one.

**Downstream damage:** `venues/stillwater.json` carries
`"hoursNote": "UNVERIFIED. Inferred from a schedule that appears under BOTH venue headings on
the current site - it may belong to Lakeville. Confirm before launch."` — which renders on the
live Stillwater location page, the rates page and the contact page. We are telling visitors we
do not know a venue's opening hours when the client's own site states them unambiguously.
`venues/lakeville.json` carries the mirror-image doubt in `needsFromClient`.

Confirming hours with the client is always worth doing. Telling the client *their site does not
say* is a different and wrong statement.

### C8 · "Four readings" (design) vs five metrics (code)
`SUBPAGE-EXPLORATION.md:25` commits the Simulators page to four diagrams.
`simulators.astro:44` lists five. If the Paper page is ported as designed, the site will
contain both.

### C9 · Events page contradicts itself on capacity
`events.astro:48` — "Each bay takes up to 6 people" — and `events.astro:151` — "Up to five
people per bay, same price". Same page. Roughly 900px apart.

### C10 · A fourth set of opening hours the client publishes and we neither carry nor mention
The menu graphic — the one document a customer physically holds in the venue — states:
> "HOURS: SUN-SAT 8AM-10PM (HOURS ARE SUBJECT TO CHANGE BASED ON CAPACITY)"

That contradicts `/rates` for both venues. Third-party directories carry a fifth set. We
publish the `/rates` version, which is the right choice, but nothing on our site or in our
client-facing docs tells the client their printed menu disagrees with their website.

---

## DERIVED — 11

Arithmetic we performed. Every figure recomputed from the client's published prices.

| # | Claim | Where | Arithmetic | Verdict |
|---|---|---|---|---|
| D1 | "Ten GolfZon NX bays" | `index.astro:130`, `simulators.astro:77` | 6 + 4 = 10 | ✅ correct |
| D2 | "$149 ÷ $35 pays back after ~4¼ hours" | `SUBPAGE-EXPLORATION.md:36` | 149 ÷ 35 = 4.257 | ✅ correct |
| D3 | Off Peak $33.25 / $31.21 / $29.15 | `memberships.astro:73–75` | 399÷12 = 33.25 · 749÷24 = 31.208 · 1399÷48 = 29.146 | ✅ all correct |
| D4 | Junior $24.92 / $22.88 / $20.81 | `memberships.astro:83–85` | 299÷12 = 24.917 · 549÷24 = 22.875 · 999÷48 = 20.813 | ✅ all correct |
| D5 | Anytime $45.75 / $43.71 / $39.56 | `memberships.astro:262` | 549÷12 = 45.75 · 1049÷24 = 43.708 · 1899÷48 = 39.563 | ✅ all correct |
| D6 | Anytime "more than the $35 walk-up rate" | `memberships.astro:263` | 39.56 > 35 at every tier | ✅ correct |
| D7 | Off Peak = "Best value per hour" | `memberships.astro:71` | true among general-availability blocks; Junior is cheaper but age-gated | ✅ correct as scoped |
| D8 | Junior LinksFlex "from $20.81 an hour" | `juniors.astro:131` | 999 ÷ 48 | ✅ correct |
| D9 | **"Book one hour… come back twice more this month, the membership has already paid for itself"** | `memberships.astro:306` | 3 hrs × $35 = **$105**, against a **$149** membership | ❌ **wrong** |
| D10 | "They formed the LLC in January 2022" | `about.astro:94` | source says only "in January"; Dec 2021 context fixes the year | ✅ safe |
| D11 | "Cash and debit avoid it" | `menu.astro:136` | source states debit explicitly; cash follows from a credit-card-only surcharge | ✅ safe |

**On D9.** Break-even is 4.26 hours a month (D2 gets this right). The closing CTA on the
memberships page invites the reader to check the maths and then fails it by $44. Two more
hours after the first gets you to $105. Even at two hours per visit, 1 + 2 + 2 = 5 hours =
$175 — which works, but is not what the sentence says. This is a number a prospective member
will do in their head, on the page that asks them to spend $149 a month.

---

## MARKED UNKNOWN — 27

Gaps the site already shows. **24 of the 27 markings are honest and well-made** — the stub
system is the strongest thing in this build, and the Stillwater photography decision
(`index.astro:107`, "We will not use Lakeville's photography to stand in for it") is a
principled call most agencies would not make. Confirmations below are terse; the three
problems are set out in full.

**Honest and correctly marked (24):** winter rates · winter hours · winter membership terms ·
the menu transcription · league format, night, price and prizes (both venues) · Stillwater
photography · Stillwater handedness, TV count, seating and club rental · event pricing and
buyout · lesson pricing · gift-card denominations and cross-venue validity · terms of use
("Do not publish this site to production with this page in this state") · walk-in policy ·
testimonials and review counts (production renders nothing at all — correct) · the legal
entity ambiguity · NX vs TwoVision (`simulators.astro:160`, prominently and accurately) ·
the LinksFlex 8am window against an 11am open · whether LinksFlex extends to Stillwater ·
junior age range 12 vs 13 · Bay 3's missing sponsor · whether the 3% surcharge applies at
Stillwater · whether the four coaches still teach there · press pull quotes ("inventing one is
not an option") · Stillwater's email address · whether Stillwater takes events at all.

### M25 · The cancellation window — **this marking is not honest**

`src/content/faq/05-cancel.json`, in full:
> "STUB - the cancellation window **has not been supplied by the client**. This is the top
> pre-booking question in the category and needs a real answer before launch."

`book.astro:33`: "STUB — the cancellation window needs confirming with the client."
`policy.astro:66`: "STUB — the cancellation window is not confirmed and must not be guessed."

**The client publishes it, in three separate places.** `/booking` and `/bookingstillwater`,
verbatim:
> "Free Cancellation: Cancel at least **48 hours** before your reservation. Cancelling within
> 48 hours may result in a charge for 100% of the bay reservation cost."

`/bookingstillwater` adds: "Cancel via the Whoosh reservation app." And `/policy` states it a
third time:
> "Provide minimum 48 hours notice for cancellation or changes to the booking"

`policy.astro`'s **code comment** knows this and gives a defensible reason for withholding it
("shipping an unconfirmed cancellation charge is the one stub that could cost a customer
money"). That is a reasonable editorial position. But the **customer-facing FAQ answer says
something else and something false** — that the client never supplied it.

The distinction matters commercially. "We are holding this until you confirm it is still
current" is diligence. "You did not give us this" is an accusation, and the client can
disprove it in ten seconds by opening their own booking page. Of everything in this audit,
this is the finding most likely to damage the room.

### M23 · The "hours being confirmed" marking exists in the UI but not in the schema

`TrustStrip.astro:57` renders an amber "Hours being confirmed" tag whenever `verified` is
false — which is currently both venues. Good, visible, correctly designed.

But `VenueSchema.astro:37` emits `openingHours: schemaOpeningHours(venue)` for the same
unverified data with no qualifier at all. Google, and every AI assistant reading the page,
will ingest the hours as asserted fact. The honesty lives only in the layer humans read.

Related, and unmarked anywhere: the client publishes holiday closures on `/rates` — "CLOSED :
Memorial Day (May 25, '26), Independence Day, Labor Day" — and these are **not carried into
`venues/*.json`, the hours tables, or the schema at all**. Labor Day 2026 is 7 September,
inside the summer window we are publishing. That is not a false claim, but it is a gap we did
not mark and a customer could drive to a closed building on.

### M24 · The "240+ courses" stub is honest but unnecessarily pessimistic

`simulators.astro:183` withholds the figure because it "exists only on two retired homepages".
Correct about the client's site. But GolfZon's own TwoVisionNX launch material publishes a
**"240+ golf course library"**, and names Pebble Beach, the Old Course at St Andrews and Bay
Hill. The figure has a first-party source; we simply looked for it in the wrong place. This
is the one stub that could probably be closed today rather than added to the client's list.

### M26 · The Lakeville hours doubt is over-cautious

`venues/lakeville.json` `needsFromClient`: "Confirm 11am-9pm daily is LAKEVILLE's schedule -
the source page shows one schedule under two venue headings." As set out in S14/S15 and C7,
the page shows **two** schedules under two headings and binds them correctly in both
breakpoints. Worth confirming with the client as a matter of course; not worth describing as
unrecoverable.

---

## Fix before the client sees this

Ordered by how badly it goes in the room, not by effort.

**1. `faq/05-cancel.json` — stop telling the client they withheld their own cancellation
policy.** They publish "Free Cancellation: Cancel at least 48 hours before your reservation…"
on `/booking`, `/bookingstillwater` and `/policy`. `policy.astro`'s reasoning for withholding
it pending confirmation is sound; the FAQ's wording is not. Change "has not been supplied by
the client" to "we are confirming this is still current before publishing it" — everywhere it
appears. **This is a two-word fix and the highest-value one in the audit.**

**2. Settle "up to five people" — it is wrong, and it is wrong three different ways.** The
client publishes six ("Each simulator will accommodate up to 6 players but we recommend 4").
We publish five on the homepage hero, six on the Simulators page, and both on the Events page
900 pixels apart. And "up to five friends" (six people) and "up to five people" (five people)
are used interchangeably. Pick one number, apply it in all eleven places, and say which one
the client wants to lead with — the capacity or the recommendation.

**3. Reframe the simulator question before the client asks it, and use GolfZon's product
name.** "GolfZon NX" is not a GolfZon product; the products are **GOLFZON TwoVision** and
**TwoVisionNX**, and TwoVisionNX was announced 4 November 2024 — two years after Lakeville
opened. That turns a vague "your site contradicts itself" into one crisp question with a
date-shaped answer: *were the Lakeville bays re-fitted after November 2024, or is the site
calling TwoVision "NX"?* Either way, publish GolfZon's own string. And drop **"four readings"**
— no source supports the count, our own page lists five, and it is the exact claim the client
was worried about. Name the metrics instead; they are all real (GolfZon publishes ball speed,
launch angle, spin rate, spin axis, club path and angle of attack).

**4. Resolve the $35 end date, or mark it.** We publish "through 3 October 2026" in eight
places with no qualifier. The client's homepage says "Valid until September 30th, 2026". Three
days, eight weeks from now, on a price. Either get the answer or carry the ambiguity visibly —
publishing the later of two dates the client gives is the worst of the three options.

**5. Fix the membership payback sentence.** `memberships.astro:306` invites the reader to check
the arithmetic and then gets it wrong: one hour plus two more is $105 against a $149
membership. Break-even is 4¼ hours — which the Paper design already states correctly. This is
a number a buyer will do in their head on the page where they decide.

**Close behind, and worth naming in the same conversation:**

- **`_corrections.md` §2 is itself wrong** (C7). It overrides a correct reading of the hours
  layout with an incorrect one, and that error is now rendering on three live pages as
  "UNVERIFIED… it may belong to Lakeville". Fix the source document, not just the symptom —
  it is the file the next person will trust.
- **"The only range in Minnesota that is open in February"** (`lessons.astro:228`) is false,
  and contradicted by our own Simulators page and by a TrackMan venue in Stillwater.
- **"Leagues at both venues through the fall and winter"** — Stillwater has never run one, and
  our own content file says so.
- **Stillwater's phone number**: we publish 612-699-0527 on one source; 612-699-0526 has two
  (the client's own `/stillwater` page and the Chamber listing). It is unmarked, and it is in
  the schema.
- **"Guests play on your booking, in your bay"** silently resolves a real ambiguity the
  earlier extraction had correctly flagged. It can cost a member money at the till.
- **The corpus is cited as both 126 sites and 96 sites**, including in the client-facing
  `SUBPAGE-EXPLORATION.md`. Pick one before the client reads both.
