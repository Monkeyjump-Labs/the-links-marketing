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
          { type: 'string', name: 'intro', label: 'Short intro', ui: { component: 'textarea' } },
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
          { type: 'string', name: 'format', label: 'Format', required: true },
          { type: 'string', name: 'night', label: 'Night of the week' },
          { type: 'string', name: 'startDate', label: 'Start date (YYYY-MM-DD)' },
          { type: 'number', name: 'weeks', label: 'Number of weeks' },
          { type: 'string', name: 'price', label: 'Price' },
          { type: 'string', name: 'prizes', label: 'What you win' },
          { type: 'string', name: 'registerUrl', label: 'Registration URL' },
          { type: 'string', name: 'nextSeasonNote', label: 'Between-seasons message', ui: { component: 'textarea' } },
          { type: 'string', name: 'standingsUrl', label: 'Standings / results URL' },
          { type: 'string', name: 'season', label: 'Season and year', required: true },
          { type: 'boolean', name: 'published', label: 'Published' },
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
          { type: 'string', name: 'note', label: 'Note', ui: { component: 'textarea' } },
          {
            type: 'object',
            name: 'rows',
            label: 'Prices',
            list: true,
            ui: { itemProps: (item) => ({ label: `${item?.label ?? ''} — ${item?.price ?? ''}` }) },
            fields: [
              { type: 'string', name: 'label', label: 'What', required: true },
              { type: 'string', name: 'price', label: 'Price', required: true },
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
          { type: 'string', name: 'note', label: 'Note', ui: { component: 'textarea' } },
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
