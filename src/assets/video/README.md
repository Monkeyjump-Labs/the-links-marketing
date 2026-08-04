# Video assets

Client-supplied, received 2026-08-04. These are the **originals** from the client, not the
Squarespace HLS renditions their current live site serves — so they are the best copies we will
get. Do not replace them with anything re-encoded from `lakevillelinks.com`.

| File | Source | Notes |
| --- | --- | --- |
| `lakeville-promo.mp4` | `Lakeville Links Video Ad.mp4` | The promo running as the background on their current homepage |
| `lakeville-promo-alt.mp4` | `Lakeville Links Video Ad 2.mp4` | Alternate cut |
| `stillwater-walkthrough.mp4` | `walk through stillwater.mp4` | **The only real footage of Stillwater in existence** |

## The Stillwater one is the valuable file

Stillwater has never been photographed. Its `MediaSlot` on the homepage is drawn deliberately
unlit and hatched because using Lakeville's photography to stand in for it is the exact trust
defect this rebuild exists to fix (`STYLE-GUIDE` §6.10).

Stills pulled from this walkthrough would be the first honest imagery that venue can have. That
is a bigger win than the hero background — check the footage before commissioning a shoot.

## Before any of these goes on a page

These are **ads**, and a hero background is not an ad. Expect to cut them down.

- **Cut to a short silent loop** — a few seconds that tile cleanly. A 30-second promo playing
  behind a headline reads as a distraction.
- **Strip the audio track.** A background video is muted by definition, and the audio is dead
  weight in the file.
- **Ship WebM + MP4**, with a `poster` frame so something meaningful renders before the video
  does.
- **Respect `prefers-reduced-motion`** — show the poster, do not autoplay.
- **Do not import these through Astro's asset pipeline.** It fingerprints and inlines images,
  not multi-megabyte video; these belong in `public/` once cut, served as static files.

## ⚠️ The contrast problem, which the gates cannot see

The homepage hero is a deliberate midnight field with white display type and an 8px amber slab —
"a scoreboard, not a brochure". **Text over video has contrast that changes every frame**, and
neither `tokens:check` nor axe can measure that: the tokens stay correct and the composite is
what fails. This is the same shape as the unlayered-CSS bug that shipped every button at 1.78:1
site-wide while every token in the file was right.

So a video background needs a **guaranteed scrim** — an opaque-enough overlay that the worst
frame still clears the contrast floor — not an opacity that happens to look fine on the frame
you were looking at.
