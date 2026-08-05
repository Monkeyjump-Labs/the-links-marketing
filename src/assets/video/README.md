# Video assets

Client-supplied, received 2026-08-04. These are the **originals** from the client, not the
Squarespace HLS renditions their current live site serves — so they are the best copies we will
get. Do not replace them with anything re-encoded from `lakevillelinks.com`.

| File                         | Source                           | Notes                                                         |
| ---------------------------- | -------------------------------- | ------------------------------------------------------------- |
| `lakeville-promo.mp4`        | `Lakeville Links Video Ad.mp4`   | The promo running as the background on their current homepage |
| `lakeville-promo-alt.mp4`    | `Lakeville Links Video Ad 2.mp4` | Alternate cut                                                 |
| `stillwater-walkthrough.mp4` | `walk through stillwater.mp4`    | **The only real footage of Stillwater in existence**          |

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

## What was cut from these, and what was decided (FW-4003)

**Do not re-cut these from scratch without reading this first.** The derived files are committed;
these originals stay here as the masters and are never imported by the site.

| Derived file                                   | From                                            | How                                        |
| ---------------------------------------------- | ----------------------------------------------- | ------------------------------------------ |
| `src/assets/images/stillwater-room.jpg`        | `stillwater-walkthrough.mp4` frame 43 (t≈1.43s) | `crop=720:480:0:360`                       |
| `public/video/lakeville-night.{webm,mp4}`      | `lakeville-promo.mp4` 3.60s–9.30s               | `scale=1280:720`, `-an`, 0.5s fades in/out |
| `src/assets/images/lakeville-night-poster.jpg` | `lakeville-promo.mp4` t=4.30s                   | `scale=1280:720`                           |

### The walkthrough is portrait, and that decided the crop

`stillwater-walkthrough.mp4` is **720×1280 (vertical phone video), 10.5s**, one continuous
handheld walking shot. Two consequences:

- A 3:2 landscape crop keeps only 37.5% of the frame height, so most moments do not survive it.
  The shots that do are the ones looking **down the length of the room** (t≈1.2–2.0s), where the
  content is spread horizontally. Close-ups of a single bay crop to just the screen.
- Because the camera never stops, every frame of the room carries motion blur. Measured by sobel
  edge energy, only the stationary opening (frames 1–10, the entrance banner) is genuinely sharp;
  the room shots sit ~30% lower. At the size the slot renders (~480px) this is not visible, but
  **it will not enlarge**, and it is not a substitute for the shoot.

Other usable moments, if more Stillwater imagery is ever needed: **t≈5.4s** (frame 163,
`crop=720:480:0:250`) is a clean single bay, and **t≈0.13s** is the "The Links of Stillwater"
entrance banner — note that banner reads "PREMIER INDOOR GOLF", and _premier_ is a banned word in
our copy, so it is a photograph of their sign and never a source for wording.

### The promo did not go behind the hero, and the reason is measured

Sampling **all 354 frames** of `lakeville-promo.mp4`: the brightest block-averaged region reaches
Y=242/255, and even the _darkest_ frame's brightest region is Y=138. The footage is mostly lit
projection screens, so there is no frame where the hero's text area is reliably dark.

Holding the hero's existing contrast over the worst frame needs a scrim of about **89%** — the
amber eyebrow is the binding constraint (white alone needs 71%). At 89–90% the visible luminance
spread between brightest and darkest frames collapses to ~0.01: you would ship a megabyte to
render a texture nobody can see.

So it ships as a **band** near the foot of the homepage with **no text composited over it**, which
costs no contrast at all. The full reasoning, including the two structural arguments (the hero is
venue-neutral on purpose, and its committed idea is "a scoreboard, not a brochure"), is in
`src/components/venue/VideoBand.astro`.

### Note on audio

Only `stillwater-walkthrough.mp4` ever had an audio track. **Both Lakeville promos shipped with no
audio stream at all**, so "strip the audio" was a no-op for them — the encode still passes `-an`
so the property is guaranteed rather than inherited.
