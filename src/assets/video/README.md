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

**The cheaper answer is not to have a background.** All of the above is a property of ONE
structure: text composited over moving footage. Give the words their own ground and put the film
where the words are not, and there is no per-frame composite to measure. That is what `HeroFilm`
does, and it is why the promo is the hero now (FW-4010) with no scrim on it at all.

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

### The promo did not go BEHIND the hero, and the reason is measured

Sampling **all 354 frames** of `lakeville-promo.mp4`: the brightest block-averaged region reaches
Y=242/255, and even the _darkest_ frame's brightest region is Y=138. The footage is mostly lit
projection screens, so there is no frame where the hero's text area is reliably dark.

Holding the hero's existing contrast over the worst frame needs a scrim of about **89%** — the
amber eyebrow is the binding constraint (white alone needs 71%). At 89–90% the visible luminance
spread between brightest and darkest frames collapses to ~0.01: you would ship a megabyte to
render a texture nobody can see.

So FW-4003 shipped it as a **band** near the foot of the homepage with **no text composited over
it**, which costs no contrast at all.

### It IS the hero now — a different structure, not a reversal (FW-4010)

The client asked for a hero and proposed the structure that dissolves the objection: don't
composite. The words got their own ground and the film sits beside them as a ruled screen, so the
89% never applies. **Nothing above is retracted; it describes a structure we did not build.**

Two things were re-measured on this pass, and they change what the numbers above mean:

- **The figures above describe the master, not the file on the page.** What ships is
  `public/video/lakeville-night.mp4` — seconds 3.60–9.30 of the promo, 171 frames, fading from and
  to black. Its brightest 32×32 block is **Y=207/255 (relLum 0.6273)**, not Y=242, so the binding
  amber scrim for THAT clip is **71%**, not 89%. A scrimmed hero was therefore _possible_ here; it
  was not on the master. It was still declined, because at the client's suggested 80% the visible
  luminance spread falls from 0.6273 to 0.0401 — about **6% of the film's range** — and at the
  binding 71%, about 11%.
- **An offset scrim does not find a dark side, because there isn't one.** Brightest block per
  horizontal fifth across all 171 frames: 0.4775 / 0.5737 / 0.6273 / 0.6272 / 0.5180, needing 67 /
  70 / 71 / 71 / 68%. There are lit screens along the whole wall, so confining the words to the
  left column buys **four percentage points**. That is the finding worth carrying forward: on this
  footage, "put the words over the dark part" is not a strategy.

Unscrimmed, a visitor sees 100% of it. The full reasoning is in
`src/components/venue/HeroFilm.astro`.

### Note on audio

Only `stillwater-walkthrough.mp4` ever had an audio track. **Both Lakeville promos shipped with no
audio stream at all**, so "strip the audio" was a no-op for them — the encode still passes `-an`
so the property is guaranteed rather than inherited.

---

# GolfZon pillar loops (FW-3992)

The four capability loops on `/simulators`. **These masters are not in this repo, deliberately.**

## Provenance

GolfZon product footage, published as GIFs on the landing page of a comparable GolfZon venue
(`teeoffgolf.com`, South Barrington IL). Confirmed by the client on 2026-08-05 to be **GolfZon's
own assets, cleared for our use**.

They are **not** footage of Lakeville or Stillwater, and the page says so out loud in the section
intro. A vendor's studio lighting standing in for our rooms is the same defect as Lakeville's
photography standing in for Stillwater (`STYLE-GUIDE` §6.10).

## ⚠️ Do not commit the GIFs

| Master GIF (not committed)                 |    Size | Pillar                             |
| ------------------------------------------ | ------: | ---------------------------------- |
| `HYPER-REALISTIC-1.gif` (1152×648, 312f)   | 32.0 MB | course rendering / visual fidelity |
| `ADVANCED-PRACTICE-1.gif` (1152×648, 288f) | 24.6 MB | practice tools / shot data         |
| `INNOVATIVE-MOTION.gif` (1920×1080, 76f)   | 14.0 MB | the motion plate                   |
| `WEIGHT-SHIFT.gif` (1920×1080, 117f)       | 36.2 MB | standing on the slope              |

**106.8 MB together.** Git keeps a blob forever, so committing them would bloat every clone of this
repo permanently, including after a later `git rm`. Only the derived files below are committed. The
masters live outside the repo; re-request them from GolfZon if they are ever needed again — and see
"the generational-loss problem" below for why you should ask for the true sources rather than these.

## Derived files, and the exact invocations

Common filter chain — downscale to 960×540 (16:9 on all four sources), then a mild `hqdn3d` pass
that removes the GIF's palette dither. The dither is what makes a GIF-sourced encode expensive:
denoising it before the encoder sees it is worth roughly a third of the bitrate on these clips.

```sh
VF="scale=960:540:flags=lanczos,hqdn3d=1.5:1.5:6:6,format=yuv420p"

# WebM (VP9) — the file ~95% of visitors actually get
ffmpeg -i <MASTER>.gif -vf "$VF" \
  -c:v libvpx-vp9 -crf 42 -b:v 0 -row-mt 1 -tile-columns 2 \
  -auto-alt-ref 1 -lag-in-frames 25 -deadline good -cpu-used 1 -g 240 \
  -an public/video/<name>.webm

# MP4 (H.264) — the fallback
ffmpeg -i <MASTER>.gif -vf "$VF" \
  -c:v libx264 -crf 28 -preset slow -profile:v main \
  -movflags +faststart -an public/video/<name>.mp4

# Poster frame
ffmpeg -ss <TS> -i <MASTER>.gif -frames:v 1 \
  -vf "scale=960:540:flags=lanczos" -q:v 4 src/assets/images/<name>-poster.jpg
```

| Derived file               | Master                    | Poster `TS` |   WebM |    MP4 |
| -------------------------- | ------------------------- | ----------: | -----: | -----: |
| `golfzon-course-render.*`  | `HYPER-REALISTIC-1.gif`   |        6.9s | 665 KB | 749 KB |
| `golfzon-practice-tools.*` | `ADVANCED-PRACTICE-1.gif` |        6.0s | 524 KB | 617 KB |
| `golfzon-motion-plate.*`   | `INNOVATIVE-MOTION.gif`   |        1.6s |  94 KB | 105 KB |
| `golfzon-weight-shift.*`   | `WEIGHT-SHIFT.gif`        |        2.4s | 394 KB | 428 KB |

**1.60 MiB of WebM for all four**, against 106.8 MB of GIF — a 64× reduction for the same footage,
and `preload="none"` means a visitor who never scrolls to the section pays none of it. Posters are
JPEG masters that Astro re-encodes to WebP at 960/q70 (~30 KB each).

`-an` is a guarantee, not a fix: none of these GIFs had audio to begin with.

## The generational-loss problem, stated plainly

These are re-encodes of already-compressed GIFs — a second generation. Checked frame-for-frame
against the masters at 960×540, VP9 CRF 42 holds up: the HUD's smallest type (`107.3Mph`,
`3,974Rpm`) stays legible and the rendered turf keeps its banding rather than gaining any. **The
visible defects that remain are in the GIFs themselves** — palette banding across the sky and the
fairway, and dither on the plate footage — and no encoder setting recovers those.

So they ship. But if GolfZon supplies the true sources, re-encoding from those is a free upgrade,
and the first place it would show is the two 1920×1080 plate loops, which were downscaled the
furthest.

## ⚠️ GolfZon's HUD shows a "Face Angle" column

The shot-data bar in the first two loops includes **Face Angle**. That is GolfZon's own software,
and it is **not** licence to put face angle back into our copy — `Club face impact area` is what
GolfZon publishes about its sensors, and face angle was removed from this site once already
(`truth-audit` §U19). Nothing in the pillar copy claims it.
