# Editing this website

Two ways to change the site. Pick by what you're changing.

| You want to change… | Use | Who |
|---|---|---|
| Hours, prices, league details, menu items, FAQ answers, venue info | **the CMS** at `/admin` | anyone at The Links |
| Page layout, new pages, design, anything structural | **Claude Code** on this repo | your developer |

Everything both tools write goes to the same place — git — so they can never disagree.

---

## The CMS

Go to `/admin` on the site. You'll see six things you can edit.

### Venues
The two locations. **This is where hours live** — change them here and they update on the
homepage, the rates page, the contact page, the footer and the venue page all at once. You never
edit hours in more than one place.

Each venue also has:
- **Details confirmed by the venue** — a checkbox. Leave it **off** until someone at that location
  has personally checked every field. While it's off, the venue page shows a small "some details
  are not yet confirmed" note. Turning it on removes that note, so only tick it when it's true.
- **Still needed from the client** — the running list of what's missing for that venue. Clear items
  off it as you supply them.

### Leagues
One entry per league. The important field is **Registration state**:

| State | What the page shows |
|---|---|
| **Open** | The registration button |
| **Full** | A waitlist sign-up |
| **Between seasons** | A "tell me when it opens" sign-up, plus your between-seasons message |

You only ever change this one dropdown as a season turns. The page never becomes a dead end —
there is always something a visitor can do. That matters more than it sounds: of 126 golf and
simulator venue websites surveyed, **not one** offered a waitlist, and 11% of league pages just
say "registration closed" and stop. Every one of those is a warm customer lost for a whole season.

**Beginner reassurance** is a required field. Two-thirds of league pages in that survey skipped it,
and it's the single biggest reason people don't sign up. Say plainly that beginners are welcome.

### Rate cards
One card per season. Set **This is the current rate card** on whichever one is live now — you do
**not** make a new page for a new season. Each price row carries its own "when it applies" text
(e.g. "Mon–Tue all day"), so a visitor never has to work out whether a price applies to them.

⚠️ Prices must be **typed as text**, never uploaded as a picture of a price list. A picture can't
be read by Google, by ChatGPT, or by a blind visitor's screen reader. This is the single biggest
problem with the old site.

### Menu
Same rule: type the items in. No PDFs, no screenshots.

### FAQ
Questions and answers. These do double duty — they answer visitors *and* they're what AI
assistants quote when someone asks "where can I play indoor golf near Stillwater". Write them the
way a customer would actually ask.

### Pages
Free-text pages for things like policies.

---

## Saving

Editing in `/admin` writes straight to the site's files and saves them to git. Depending on setup,
your change either publishes automatically within a couple of minutes, or waits for your developer
to approve it. Ask which applies here.

---

## Things worth knowing

**Changing hours changes them everywhere.** That's the point. Don't go looking for a second place
to update them — there isn't one.

**Every seasonal thing carries its season.** "Fall/Winter 2026–27", not "this season". A year from
now, someone needs to be able to tell at a glance whether a page is stale. Old undated content is
how sites quietly start lying to customers.

**Booking still happens on Whoosh.** The site sends people there deliberately, and the buttons say
so. If your Whoosh links change, update them on the venue records.

**Don't invent numbers.** If a price isn't set yet, leave the STUB note in place rather than
guessing. A visible gap is recoverable; a wrong price on the internet is not.

---

## For the developer

Setup, architecture, the block model, the Tina lock rule and the CI gate are in
[`CLAUDE.md`](CLAUDE.md). The strategy, audit and content specs behind every decision on this site
are in [`marketing/websites/the-links/`](marketing/websites/the-links/).
