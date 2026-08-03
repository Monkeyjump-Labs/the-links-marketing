import { defineCollection, z, type SchemaContext } from 'astro:content';

const brandColor = z.enum([
  'watermelon',
  'pink',
  'grape',
  'lavender',
  'banana',
  'gold',
  'mint',
  'teal',
  'blue',
  'offWhite',
  'softBlack',
]);

const postSchema = ({ image }: SchemaContext) =>
  z.object({
    title: z.string(),
    shortName: z.string().optional(),
    description: z.string(),
    datePublished: z.date(),
    author: z.string(),
    heroBgColor: brandColor,
    heroImage: image().optional(),
    heroImageAltText: z.string().optional(),
    featured: z.boolean().default(false),
    indexImage: image().optional(),
    indexImageAltText: z.string().optional(),
    indexTitle: z.string().optional(),
    indexDescription: z.string().optional(),
    metaData: z
      .object({
        metaTitle: z.string().optional(),
        metaDescription: z.string().optional(),
        shareImage: image().optional(),
        twitterCardType: z.enum(['summary', 'summary_large_image']).optional(),
      })
      .optional(),
  });

// ── Collections ───────────────────────────────────────────────────────────────

const blog = defineCollection({ type: 'content', schema: postSchema });

const articles = defineCollection({ type: 'content', schema: postSchema });

const caseStudies = defineCollection({
  type: 'content',
  schema: ({ image }) =>
    z.object({
      title: z.string(),
      shortName: z.string().optional(),
      description: z.string(),
      slideshowDescription: z.string().optional(),
      heroBgColor: brandColor.optional(),
      heroImage: image().optional(),
      heroImageAltText: z.string().optional(),
      cardImage: z.string().optional(),
      cardImageAltText: z.string().optional(),
      slideshowImage: z.string().optional(),
      slideshowImageAltText: z.string().optional(),
      industry: z.string().optional(),
      technologies: z.string().optional(),
      status: z.string().optional(),
      gridOrder: z.number().optional(),
      slideshowOrder: z.number().optional(),
      published: z.boolean().default(false),
      metaData: z
        .object({
          metaTitle: z.string().optional(),
          metaDescription: z.string().optional(),
          shareImage: image().optional(),
          twitterCardType: z.enum(['summary', 'summary_large_image']).optional(),
        })
        .optional(),
    }),
});

// Free-form markdown pages, editable in TinaCMS and rendered at /pages/[slug]/.
const pages = defineCollection({
  type: 'content',
  schema: z.object({
    title: z.string(),
    description: z.string().optional(),
    metaData: z
      .object({
        metaTitle: z.string().optional(),
        metaDescription: z.string().optional(),
      })
      .optional(),
  }),
});

// ── Venue collections ─────────────────────────────────────────────────────────
// The Links runs two venues. Venue is a DIMENSION of the site, not a fork of it:
// one set of topic pages, each carrying a venue column or a venue-prefixed row.
// See marketing/websites/the-links/sitemap.md §1.

/** One row of opening hours. `closed` wins over the times. */
const hoursRow = z.object({
  day: z.enum(['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun']),
  opens: z.string().optional(), // "12:00" 24h, for schema.org
  closes: z.string().optional(),
  closed: z.boolean().default(false),
});

const venues = defineCollection({
  type: 'data',
  schema: z.object({
    name: z.string(), // "The Links of Lakeville"
    shortName: z.string(), // "Lakeville" — used in the switcher
    slug: z.string(),
    order: z.number().default(0),
    streetAddress: z.string(),
    addressLocality: z.string(),
    addressRegion: z.string().default('MN'),
    postalCode: z.string(),
    phone: z.string(),
    /**
     * Set when the published number is believed-but-unverified. Renders the
     * gap system's "Pending confirmation" tag beside the number everywhere it
     * appears. Clear it the moment the venue confirms — a permanent caution tag
     * stops being read.
     */
    phoneNote: z.string().optional(),
    email: z.string().optional(),
    /**
     * ⚠️ Leave these EMPTY unless the coordinates come from the venue itself
     * (their Google Business Profile pin, or a pin they have confirmed).
     * `VenueSchema` only emits `GeoCoordinates` when both are present, and a
     * geocode we invented is worse than no geo at all: a wrong point in
     * `LocalBusiness` schema sends people to the wrong building, and four
     * decimal places asserts a precision nobody here has earned. Both venues
     * shipped invented coordinates until 2026-08-03; Lakeville's was ~2 miles
     * from the actual address. Google geocodes fine from `address` alone.
     * See truth-audit.md §U17.
     */
    latitude: z.number().optional(),
    longitude: z.number().optional(),
    bays: z.number(),
    simulator: z.string().default('GolfZon'),
    /**
     * schema.org types for this venue. Lakeville is also a BarOrPub (full bar);
     * Stillwater's F&B belongs to its host, so it is not.
     */
    schemaTypes: z.array(z.string()).default(['SportsActivityLocation']),
    /** Set when the venue sits inside another business (Stillwater Bowl & Lounge). */
    containedInPlace: z.string().optional(),
    bookingUrl: z.string().url(),
    mapUrl: z.string().url().optional(),
    openedYear: z.number().optional(),
    intro: z.string().optional(),
    hours: z.array(hoursRow).default([]),
    hoursNote: z.string().optional(),
    amenities: z.array(z.string()).default([]),
    /**
     * Set false when a field on this venue is inherited/assumed rather than
     * confirmed by the client. Surfaces a build warning and a CMS note; never
     * publish an unverified venue fact silently.
     */
    verified: z.boolean().default(false),
    needsFromClient: z.array(z.string()).default([]),
  }),
});

/**
 * Leagues. The playbook's highest-value page type and the worst-executed in the
 * corpus: 46% of league pages offer no way to register and exactly ZERO of 126
 * audited sites offered a waitlist. `state` drives all three behaviours and must
 * never produce a dead end. See playbook-core.md §5.
 */
const leagues = defineCollection({
  type: 'data',
  schema: z.object({
    name: z.string(),
    venue: z.enum(['lakeville', 'stillwater', 'both']),
    order: z.number().default(0),
    /** open = register now · full = waitlist · between = notify me */
    state: z.enum(['open', 'full', 'between']),
    oneLiner: z.string(), // "Eight weeks. Two-person teams. Wednesday nights."
    beginnerNote: z.string(), // required — 67% of the corpus omits this
    /**
     * All six season facts are OPTIONAL, and an absent one is not a defect.
     *
     * `format` used to be required, which forced the content to carry the string
     * "TBC" — and "TBC" printed in a value slot is the flat-page behaviour the
     * gap system replaces. An undecided fact now renders as a `GapCell` marked
     * *Not yet set*: same label, same size, an em-dash where the value goes. The
     * page says "the venue has not decided this yet" instead of shipping a
     * placeholder that looks like an unfinished page.
     *
     * Do not reintroduce sentinel strings ("TBC", "STUB", "-") in these fields.
     * Leave the field out; the page knows what to draw.
     */
    format: z.string().optional(),
    night: z.string().optional(),
    startDate: z.string().optional(),
    weeks: z.number().optional(),
    price: z.string().optional(),
    prizes: z.string().optional(),
    registerUrl: z.string().url().optional(),
    /** Shown when state is `between` — when registration is expected to open. */
    nextSeasonNote: z.string().optional(),
    standingsUrl: z.string().url().optional(),
    season: z.string(), // every dated page carries its season + year
    published: z.boolean().default(true),
  }),
});

/**
 * Memberships. Two unlike products that the page deliberately gives DIFFERENT
 * GRAMMARS, which is why one collection carries both and `kind` decides how a
 * row is drawn:
 *
 *   monthly  a recurring subscription  → card comparison
 *   flex     a prepaid bank of hours   → fuel gauge
 *
 * An hour bank is a punch card, not a SaaS plan, and drawing it as a third and
 * fourth pricing card was the thing that made the old page read as four
 * near-identical boxes (SUBPAGE-EXPLORATION.md §"What each page committed to").
 *
 * **Prices are NUMBERS here, not strings.** The per-hour figure a buyer uses to
 * compare a bank against the $35 walk-up rate is arithmetic on the venue's own
 * price, so the page divides rather than storing a second number that can drift
 * out of agreement with the first. Store 399, not "$399".
 */
const memberships = defineCollection({
  type: 'data',
  schema: z.object({
    name: z.string(),
    kind: z.enum(['monthly', 'flex']),
    order: z.number().default(0),
    venue: z.enum(['lakeville', 'stillwater', 'both']).default('both'),
    /**
     * Marks the tier the page recommends. `recommendedNote` must state a REASON
     * the customer can check — "$149 ÷ $35 pays back after about 4¼ hours a
     * month" — never "Most popular", which is a claim about other people that a
     * buyer cannot verify and we have no data for.
     */
    recommended: z.boolean().default(false),
    recommendedNote: z.string().optional(),
    published: z.boolean().default(true),

    // ── monthly ──
    price: z.number().optional(),
    cadence: z.string().optional(),
    forWho: z.string().optional(),
    includes: z.array(z.string()).default([]),

    // ── flex ──
    /** When these hours can be used. The restriction IS the product. */
    window: z.string().optional(),
    /**
     * True when a tier is limited by age (LinksFlex Junior is 13–18).
     *
     * It exists so a "from $X an hour" headline cannot quote a price most
     * readers are not eligible for. The Junior bank is the cheapest per hour on
     * the page by some way, and an adult reading "LinksFlex from $20.81" and
     * then finding they cannot buy it has been misled by arithmetic that was
     * technically correct.
     */
    ageRestricted: z.boolean().default(false),
    banks: z
      .array(
        z.object({
          hours: z.number(),
          price: z.number(),
        }),
      )
      .default([]),
  }),
});

/** A rate card for one season. Seasonality is a FIELD, never a second page. */
const rates = defineCollection({
  type: 'data',
  schema: z.object({
    season: z.string(), // "Summer 2026"
    order: z.number().default(0),
    effectiveFrom: z.string().optional(),
    effectiveTo: z.string().optional(),
    current: z.boolean().default(false),
    note: z.string().optional(),
    rows: z
      .array(
        z.object({
          label: z.string(),
          price: z.string(), // HTML text, never an image
          eligibility: z.string().optional(), // price cards carry their own windows
          venue: z.enum(['lakeville', 'stillwater', 'both']).default('both'),
        }),
      )
      .default([]),
  }),
});

/** HTML menu, never a PDF and never a PNG. */
const menu = defineCollection({
  type: 'data',
  schema: z.object({
    section: z.string(),
    order: z.number().default(0),
    venue: z.enum(['lakeville', 'stillwater', 'both']).default('both'),
    note: z.string().optional(),
    items: z
      .array(
        z.object({
          name: z.string(),
          description: z.string().optional(),
          price: z.string().optional(),
        }),
      )
      .default([]),
  }),
});

/**
 * Testimonials. 81% of the audited sim-venue corpus shows no reviews at all, so
 * this is a real differentiator — but only with attributed, real quotes. The
 * reference competitor runs three unsourced ones; we do not copy that. An empty
 * collection is the honest state until the client supplies them.
 */
const testimonials = defineCollection({
  type: 'data',
  schema: z.object({
    quote: z.string(),
    name: z.string(),
    venue: z.enum(['lakeville', 'stillwater', 'both']).default('both'),
    source: z.string().optional(),
    sourceUrl: z.string().url().optional(),
    order: z.number().default(0),
  }),
});

/** FAQ — the AEO surface. Renders FAQPage schema; 4% of the corpus has it. */
const faq = defineCollection({
  type: 'data',
  schema: z.object({
    question: z.string(),
    answer: z.string(),
    category: z.string().default('General'),
    order: z.number().default(0),
  }),
});

export const collections = {
  blog,
  articles,
  caseStudies,
  pages,
  venues,
  leagues,
  memberships,
  rates,
  menu,
  faq,
  testimonials,
};
