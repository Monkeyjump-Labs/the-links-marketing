import { defineConfig } from 'tinacms';

/**
 * TinaCMS configuration — LOCAL / filesystem mode.
 *
 * This runs with NO Tina Cloud credentials. `npm run dev` starts
 * `tinacms dev -c "astro dev"`, which serves a local content API and the admin
 * UI at http://localhost:4321/admin. Edits are written straight back to the
 * files in `src/content/**` and committed with your normal git flow.
 *
 * The collections below are shaped for what the CLIENT actually needs to change
 * on their own after handoff: hours, prices, league state, menu items, FAQs.
 * Structural/design changes stay in Claude Code.
 *
 * ⚠️ Editing this file? Run `npm run tina:lock` and commit `tina/tina-lock.json`
 * in the SAME commit — the CI quality gate fails a stale lock.
 *
 * To connect Tina Cloud later (multi-user editorial, media, prod editing):
 *   1. Create a project at https://app.tina.io and get its Client ID + Token.
 *   2. Set TINA_CLIENT_ID, TINA_TOKEN, and TINA_BRANCH (see .env.example).
 *   3. Point the Vercel build at `tinacms build && astro build`.
 */

const branch = process.env.TINA_BRANCH || process.env.VERCEL_GIT_COMMIT_REF || process.env.HEAD || 'main';

const DAYS = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];
const VENUE_SCOPE = ['lakeville', 'stillwater', 'both'];

/**
 * Kept in step with the `menu` collection's Zod enums in `src/content/config.ts`.
 * Tina writes the value; Astro validates it at build time, so a drift between
 * these two lists is a build failure rather than a silent bad edit.
 */
const MENU_LAYOUTS = [
  { value: 'plates', label: 'Plates — a dish, a description, one price' },
  { value: 'grid', label: 'Price grid — one dish priced in more than one column' },
  { value: 'choices', label: 'Choices — lists with no prices' },
];
const GAP_STATES = [
  { value: 'notSet', label: 'Not yet set — nobody has decided' },
  { value: 'quoted', label: 'Ask us — we know, and give it on request' },
];

export default defineConfig({
  branch,
  // Empty in local mode. Populate via env for Tina Cloud.
  clientId: process.env.TINA_CLIENT_ID || '',
  token: process.env.TINA_TOKEN || '',
  build: {
    outputFolder: 'admin',
    publicFolder: 'public',
  },
  media: {
    tina: {
      mediaRoot: 'uploads',
      publicFolder: 'public',
    },
  },
  schema: {
    collections: [
      {
        name: 'venue',
        label: 'Venues',
        path: 'src/content/venues',
        format: 'json',
        fields: [
          { type: 'string', name: 'name', label: 'Venue name', isTitle: true, required: true },
          { type: 'string', name: 'shortName', label: 'Short name (used in the venue switcher)', required: true },
          { type: 'string', name: 'slug', label: 'URL slug', required: true },
          { type: 'number', name: 'order', label: 'Display order' },
          { type: 'string', name: 'streetAddress', label: 'Street address', required: true },
          { type: 'string', name: 'addressLocality', label: 'City', required: true },
          { type: 'string', name: 'addressRegion', label: 'State' },
          { type: 'string', name: 'postalCode', label: 'ZIP', required: true },
          { type: 'string', name: 'phone', label: 'Phone', required: true },
          {
            type: 'string',
            name: 'phoneNote',
            label: 'Phone: pending confirmation',
            description:
              'Fill this in only while the number is in doubt. It renders a "Pending confirmation" tag beside the number everywhere it appears. Clear it as soon as the venue confirms.',
            ui: { component: 'textarea' },
          },
          { type: 'string', name: 'email', label: 'Email' },
          {
            type: 'number',
            name: 'latitude',
            label: 'Latitude',
            description:
              'Leave empty unless the coordinate comes from the venue itself. A geocode we guessed is worse than none: it ships as GeoCoordinates in LocalBusiness schema and can send people to the wrong building. Google geocodes fine from the address alone.',
          },
          {
            type: 'number',
            name: 'longitude',
            label: 'Longitude',
            description: 'See Latitude. Both must be present before either is published.',
          },
          { type: 'number', name: 'bays', label: 'Number of bays', required: true },
          { type: 'string', name: 'simulator', label: 'Simulator technology' },
          { type: 'string', name: 'schemaTypes', label: 'schema.org types', list: true },
          { type: 'string', name: 'containedInPlace', label: 'Inside another business (if any)' },
          { type: 'string', name: 'bookingUrl', label: 'Whoosh booking URL', required: true },
          { type: 'string', name: 'mapUrl', label: 'Map URL' },
          { type: 'number', name: 'openedYear', label: 'Year opened' },
          {
            type: 'string',
            name: 'tagline',
            label: 'Positioning line',
            description: "The venue's own one-liner, e.g. 'Your new local clubhouse on the east side.' Sentence case.",
          },
          { type: 'string', name: 'intro', label: 'Short intro', ui: { component: 'textarea' } },
          {
            type: 'object',
            name: 'highlights',
            label: 'What is here',
            list: true,
            ui: { itemProps: (item) => ({ label: item?.title ?? 'Highlight' }) },
            description:
              'The venue feature blocks. Every one has to survive the truth audit on its own - do not restate a plan as something that is already running.',
            fields: [
              { type: 'string', name: 'title', label: 'Title', isTitle: true, required: true },
              { type: 'string', name: 'body', label: 'Body', required: true, ui: { component: 'textarea' } },
            ],
          },
          {
            type: 'object',
            name: 'hours',
            label: 'Opening hours',
            list: true,
            ui: { itemProps: (item) => ({ label: `${item?.day ?? ''} ${item?.opens ?? ''}–${item?.closes ?? ''}` }) },
            fields: [
              { type: 'string', name: 'day', label: 'Day', options: DAYS, required: true },
              { type: 'string', name: 'opens', label: 'Opens (24h, e.g. 15:00)' },
              { type: 'string', name: 'closes', label: 'Closes (24h, e.g. 21:00)' },
              { type: 'boolean', name: 'closed', label: 'Closed this day' },
            ],
          },
          { type: 'string', name: 'hoursNote', label: 'Note about hours', ui: { component: 'textarea' } },
          {
            type: 'string',
            name: 'closedHolidays',
            label: 'Closed on these holidays (every year)',
            list: true,
            description:
              'Named holidays, not dates - these recur annually. Shown beside the hours regardless of where they fall in the current schedule.',
          },
          { type: 'string', name: 'amenities', label: 'Amenities', list: true },
          {
            type: 'boolean',
            name: 'verified',
            label: 'Details confirmed by the venue',
            description: 'Leave off until someone at the venue has checked every field on this page.',
          },
          { type: 'string', name: 'needsFromClient', label: 'Still needed from the client', list: true },
        ],
      },
      {
        name: 'league',
        label: 'Leagues',
        path: 'src/content/leagues',
        format: 'json',
        fields: [
          { type: 'string', name: 'name', label: 'League name', isTitle: true, required: true },
          { type: 'string', name: 'venue', label: 'Venue', options: VENUE_SCOPE, required: true },
          { type: 'number', name: 'order', label: 'Display order' },
          {
            type: 'string',
            name: 'state',
            label: 'Registration state',
            options: [
              { value: 'open', label: 'Open — show the registration link' },
              { value: 'full', label: 'Full — show the waitlist' },
              { value: 'between', label: 'Between seasons — show notify-me' },
            ],
            required: true,
            description: 'Every state shows an action. The page never dead-ends.',
          },
          {
            type: 'string',
            name: 'status',
            label: 'Season status',
            options: [
              { value: 'live', label: 'Live — the season ahead, the state above decides the action' },
              { value: 'archive', label: 'Archive — a season that has run, shown disabled for reference' },
            ],
            description:
              'Archive draws the block greyed and not registerable: no register link, no waitlist of its own, and the ' +
              'message below shown as a check-back. Switch a row to Live when its new schedule is published and it ' +
              'starts taking signups again — nobody needs to touch the code to do it.',
          },
          {
            type: 'string',
            name: 'oneLiner',
            label: 'One line — format and commitment',
            required: true,
            description: 'e.g. "Eight weeks. Two-person teams. Wednesday nights."',
            ui: { component: 'textarea' },
          },
          {
            type: 'string',
            name: 'beginnerNote',
            label: 'Beginner reassurance',
            required: true,
            description: 'Required. Two-thirds of league pages skip this and it is the top reason people do not join.',
            ui: { component: 'textarea' },
          },
          /**
           * NOT required. An empty season fact renders as the gap system's
           * "Not yet set" mark — same label, same size, an em-dash where the
           * value goes. Leave it blank rather than typing "TBC": a sentinel
           * string prints in the value slot and makes the page look unfinished,
           * which is exactly what the mark exists to avoid.
           */
          { type: 'string', name: 'format', label: 'Format (leave blank if not decided)' },
          { type: 'string', name: 'night', label: 'Night of the week' },
          { type: 'string', name: 'startDate', label: 'Start date (YYYY-MM-DD)' },
          { type: 'number', name: 'weeks', label: 'Number of weeks' },
          {
            type: 'string',
            name: 'price',
            label: 'Entry fee — what it costs to JOIN',
            description:
              'The fee to join the league, and nothing else. It is NOT the skins buy-in — that has its own field ' +
              'below. Every league sheet we have states a skins figure and none of them states an entry fee, so this ' +
              'is deliberately blank on the archived seasons and draws "Not yet set". Putting the skins number here ' +
              'would tell someone the league costs $64 to join and they would find out otherwise at the till.',
          },
          {
            type: 'string',
            name: 'skins',
            label: 'Skins buy-in — the side pot, on top of the entry fee',
            description:
              'e.g. "$64 per team, gross". Paid once at the start of the season. Say gross, net, or both, the way the ' +
              'league sheet says it.',
          },
          { type: 'string', name: 'prizes', label: 'What you win' },
          { type: 'string', name: 'registerUrl', label: 'Registration URL' },
          {
            type: 'string',
            name: 'nextSeasonNote',
            label: 'What happens next',
            description:
              'On a live between-seasons row: when registration is expected to open. On an archived row: the ' +
              'check-back, e.g. "Check back for the updated 2026 fall schedule."',
            ui: { component: 'textarea' },
          },
          { type: 'string', name: 'standingsUrl', label: 'Standings / results URL' },
          { type: 'string', name: 'season', label: 'Season and year', required: true },
          { type: 'boolean', name: 'published', label: 'Published' },
        ],
      },
      {
        name: 'membership',
        label: 'Memberships',
        path: 'src/content/memberships',
        format: 'json',
        fields: [
          { type: 'string', name: 'name', label: 'Name', isTitle: true, required: true },
          {
            type: 'string',
            name: 'kind',
            label: 'Kind',
            required: true,
            options: [
              { value: 'monthly', label: 'Monthly membership — drawn as a card' },
              { value: 'flex', label: 'LinksFlex hour bank — drawn as a fuel gauge' },
            ],
          },
          { type: 'number', name: 'order', label: 'Display order' },
          { type: 'string', name: 'venue', label: 'Which venue', options: VENUE_SCOPE },
          { type: 'boolean', name: 'recommended', label: 'Recommend this one' },
          {
            type: 'string',
            name: 'recommendedNote',
            label: 'Why we recommend it',
            description:
              'Give a REASON the customer can check ("$149 ÷ $35 pays back after about 4.3 hours a month"), never "Most popular" — that is a claim about other people that a buyer cannot verify.',
            ui: { component: 'textarea' },
          },
          { type: 'boolean', name: 'published', label: 'Published' },

          {
            type: 'number',
            name: 'price',
            label: 'Monthly price (number only, no $)',
            description: 'A NUMBER, e.g. 149. The page adds the $ and does the per-hour arithmetic itself.',
          },
          { type: 'string', name: 'cadence', label: 'Monthly: cadence, e.g. "a month"' },
          { type: 'string', name: 'forWho', label: 'Monthly: who it is for', ui: { component: 'textarea' } },
          { type: 'string', name: 'includes', label: 'Monthly: what is included', list: true },

          { type: 'string', name: 'window', label: 'LinksFlex: when the hours can be used' },
          {
            type: 'boolean',
            name: 'ageRestricted',
            label: 'LinksFlex: age-restricted tier',
            description:
              'Tick for Junior. Keeps this tier out of the "LinksFlex from $X an hour" headline, so we never quote a price most readers cannot buy.',
          },
          {
            type: 'object',
            name: 'banks',
            label: 'LinksFlex: hour banks',
            list: true,
            ui: { itemProps: (item) => ({ label: `${item?.hours ?? ''} hours — $${item?.price ?? ''}` }) },
            fields: [
              { type: 'number', name: 'hours', label: 'Hours in the bank', required: true },
              {
                type: 'number',
                name: 'price',
                label: 'Price (number only, no $)',
                required: true,
                description: 'The per-hour figure is divided from this. Do not enter it separately.',
              },
            ],
          },
        ],
      },
      {
        name: 'rate',
        label: 'Rate cards',
        path: 'src/content/rates',
        format: 'json',
        fields: [
          { type: 'string', name: 'season', label: 'Season', isTitle: true, required: true },
          { type: 'number', name: 'order', label: 'Display order' },
          { type: 'string', name: 'effectiveFrom', label: 'Effective from (YYYY-MM-DD)' },
          { type: 'string', name: 'effectiveTo', label: 'Effective to (YYYY-MM-DD)' },
          { type: 'boolean', name: 'current', label: 'This is the current rate card' },
          {
            type: 'string',
            name: 'note',
            label: 'Note (customers read this)',
            description:
              'Shown on the live site under the table. Customer language only — what the price means, what is not settled yet. Anything addressed to us goes in the build note below.',
            ui: { component: 'textarea' },
          },
          {
            type: 'string',
            name: 'buildNote',
            label: 'Build note (staging only)',
            description:
              'What WE still need. Shows on staging and renders nothing in production, so it is safe to write plainly.',
            ui: { component: 'textarea' },
          },
          {
            type: 'object',
            name: 'rows',
            label: 'Prices',
            list: true,
            ui: { itemProps: (item) => ({ label: `${item?.label ?? ''} — ${item?.price ?? 'Not yet set'}` }) },
            fields: [
              { type: 'string', name: 'label', label: 'What', required: true },
              {
                type: 'string',
                name: 'price',
                label: 'Price',
                description:
                  'Leave EMPTY if it has not been set — the page draws a “Not yet set” mark. Never type TBC, STUB or a dash.',
              },
              { type: 'string', name: 'eligibility', label: 'When it applies' },
              { type: 'string', name: 'venue', label: 'Which venue', options: VENUE_SCOPE },
            ],
          },
        ],
      },
      {
        name: 'menuSection',
        label: 'Menu',
        path: 'src/content/menu',
        format: 'json',
        fields: [
          { type: 'string', name: 'section', label: 'Section', isTitle: true, required: true },
          { type: 'number', name: 'order', label: 'Display order' },
          { type: 'string', name: 'venue', label: 'Which venue', options: VENUE_SCOPE },
          {
            type: 'string',
            name: 'layout',
            label: 'How this section is drawn',
            options: MENU_LAYOUTS,
            description:
              'Plates = a list of dishes with one price each. Price grid = the same dish priced more than one way (the 14" and 10" pizza crusts). Choices = lists with no prices, like the sauces or the taps.',
          },
          { type: 'string', name: 'intro', label: 'Intro line', ui: { component: 'textarea' } },
          { type: 'string', name: 'note', label: 'Footnote', ui: { component: 'textarea' } },
          {
            type: 'object',
            name: 'priceColumns',
            label: 'Price columns (price grid only)',
            list: true,
            description:
              'One per price column. Keep the heading short — it sits over a narrow column of figures. Put the explanation in the qualifier.',
            ui: { itemProps: (item) => ({ label: item?.label ?? 'Column' }) },
            fields: [
              { type: 'string', name: 'label', label: 'Column heading (short)', required: true },
              { type: 'string', name: 'qualifier', label: 'What it means' },
            ],
          },
          {
            type: 'object',
            name: 'items',
            label: 'Items',
            list: true,
            ui: { itemProps: (item) => ({ label: `${item?.name ?? ''} ${item?.price ?? ''}` }) },
            fields: [
              { type: 'string', name: 'name', label: 'Item', required: true },
              { type: 'string', name: 'description', label: 'Description', ui: { component: 'textarea' } },
              { type: 'string', name: 'price', label: 'Price' },
              {
                type: 'string',
                name: 'prices',
                label: 'Prices (price grid only)',
                list: true,
                description: 'One per price column above, in the same order.',
              },
            ],
          },
          {
            type: 'object',
            name: 'choices',
            label: 'Choice lists (choices only)',
            list: true,
            ui: { itemProps: (item) => ({ label: item?.label ?? 'List' }) },
            fields: [
              { type: 'string', name: 'label', label: 'List heading', required: true },
              { type: 'string', name: 'options', label: 'Options', list: true },
            ],
          },
          {
            type: 'object',
            name: 'gaps',
            label: 'What this section does not know',
            list: true,
            description:
              'For anything the printed menu leaves unclear or unpriced. It renders as the site-wide gap mark — never write "TBD" into a price or a description instead.',
            ui: { itemProps: (item) => ({ label: item?.label ?? 'Gap' }) },
            fields: [
              { type: 'string', name: 'label', label: 'What is missing', required: true },
              {
                type: 'string',
                name: 'state',
                label: 'Kind',
                options: GAP_STATES,
                description:
                  'Not yet set = nobody has decided. Ask us = we know and give it on request; that one needs a reason.',
              },
              { type: 'string', name: 'word', label: 'Status word (optional override)' },
              { type: 'string', name: 'reason', label: 'Why', required: true, ui: { component: 'textarea' } },
            ],
          },
        ],
      },
      {
        name: 'testimonial',
        label: 'Testimonials',
        path: 'src/content/testimonials',
        format: 'json',
        fields: [
          {
            type: 'string',
            name: 'quote',
            label: 'The quote',
            isTitle: true,
            required: true,
            ui: { component: 'textarea' },
          },
          {
            type: 'string',
            name: 'name',
            label: 'Who said it',
            required: true,
            description: 'Only publish a name you have permission to use.',
          },
          { type: 'string', name: 'venue', label: 'Which venue', options: VENUE_SCOPE },
          { type: 'string', name: 'source', label: 'Where it came from', description: 'e.g. Google review, in person' },
          { type: 'string', name: 'sourceUrl', label: 'Link to the source' },
          { type: 'number', name: 'order', label: 'Display order' },
        ],
      },
      {
        name: 'faqItem',
        label: 'FAQ',
        path: 'src/content/faq',
        format: 'json',
        fields: [
          { type: 'string', name: 'question', label: 'Question', isTitle: true, required: true },
          { type: 'string', name: 'answer', label: 'Answer', required: true, ui: { component: 'textarea' } },
          { type: 'string', name: 'category', label: 'Category' },
          { type: 'number', name: 'order', label: 'Display order' },
        ],
      },
      {
        name: 'page',
        label: 'Pages',
        path: 'src/content/pages',
        format: 'md',
        fields: [
          { type: 'string', name: 'title', label: 'Title', isTitle: true, required: true },
          { type: 'string', name: 'description', label: 'Description', ui: { component: 'textarea' } },
          { type: 'rich-text', name: 'body', label: 'Body', isBody: true },
        ],
      },
    ],
  },
});
