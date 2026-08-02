# Ingest corrections (verified first-hand)

Corrections to `_ingest/site-inventory.md`. Verified directly by the orchestrator; these
override the subagent's reading. Apply before the audit or brief cites them.

## 1. robots.txt does NOT block AI crawlers — the site is already open

**Inventory claim (finding #4):** "GPTBot, ClaudeBot, anthropic-ai, CCBot, Google-Extended,
Applebot-Extended, Bytespider, Meta-ExternalAgent + ~20 more are grouped into the
restricted-agent block — and so is `AdsBot-Google`."

**Actual:** `https://www.lakevillelinks.com/robots.txt` is 62 lines and contains **no
`Disallow: /` for any user-agent.** Verified 2026-08-02:

```
curl -sSL https://www.lakevillelinks.com/robots.txt | grep -n "^Disallow: /$"   # → no match
```

The ~30 stacked `User-agent:` lines (AI2Bot … AdsBot-Google-Mobile-Apps) are followed
immediately by `User-agent: *` and then a single shared rule group. Under the robots.txt
grammar, consecutive `User-agent` lines with no intervening rules form **one group**, so
every named agent — including GPTBot, ClaudeBot, and AdsBot-Google — receives exactly the
same rules as `*`: the stock Squarespace path exclusions (`/config`, `/search`, `/api/`,
`?format=` query variants, etc.). Nothing is site-blocked.

**Why the misread happened:** the stacked agent list *looks* like Squarespace's
AI-crawler-blocking block. That feature emits a separate group terminated by `Disallow: /`.
That group is absent here, which means the setting is **off** — the agents are named but not
restricted.

**Consequence for the plan:** do **not** carry over Fareway's "unblocking the AI crawlers is
a launch task" item — it does not apply here. The Links' AEO problem is the opposite and
harder: the crawlers are already welcome, there is simply almost nothing on the site worth
citing (see the trapped-in-images finding — `/menu` is 72 characters of text, `/specials` is
318). The fix is content and structured data, not a robots.txt edit.

**Still true and still worth fixing:** `PerplexityBot` is not named anywhere in the file. It
is unaffected today (it falls under `*`, which is permissive), so this is a non-issue rather
than a defect — note it only so nobody "fixes" it twice.

## 2. `/rates` does NOT carry per-venue hours — it has two labels and one schedule

**Competitor-teardown claim:** "Its `/rates` page already does the right thing (one price, a
column per venue)."

**Actual:** verified in `raw/rates.html`. The venue labels and the day rows sit in a *single*
Squarespace text block, in this document order:

```
| Lakeville, MN
| Stillwater, MN
| Sunday → 12PM to 7PM
| Monday → 12PM to 9PM
| Tuesday through Friday → 3PM to 9PM
| Saturday → 10AM to 10PM
```

There is exactly one `Sunday`, one `Monday`, one `Saturday` in the page source. Two venue
headings are followed by **one** schedule, so nothing binds those hours to either venue. It
may render as two visual columns, but only one column has content.

It also contradicts the line directly above it in the same section: *"Summer 2026 Hours &
Rates: $35/Hour (May 3rd, 2026 through October 3, 2026) **11am to 9pm Daily**"* — which
matches none of the four day rows.

**Consequence for the plan:** treat "a golfer cannot determine Stillwater's hours from this
website" as a **confirmed defect**, not a nice-to-have. Per-venue hours are a launch
requirement and a client-input blocker (Stillwater's real hours are not recoverable from the
site — they must be asked for). Do not cite `/rates` as prior art for the two-venue pattern;
it is the bug, not the model.
