/**
 * `POST /api/lead` — the one endpoint every form on the site posts to.
 *
 * **This route is why the site has an adapter.** It is the only file with
 * `prerender = false`; all 21 pages are still prerendered HTML.
 *
 * It is a fixed, same-origin path, which is the point: the old design put the
 * destination in `PUBLIC_LEAD_ENDPOINT`, and a URL you can configure is a URL
 * you can leave unset — which is exactly how this site launched with every form
 * inert. There is no URL to get wrong now. What remains configurable is
 * destinations, and `npm run leads:check` refuses to let production ship
 * without them.
 *
 * Content negotiation carries the progressive enhancement:
 *   - `Accept: application/json` (the `fetch` path) → JSON, page never navigates
 *   - anything else (a native form POST, no JS) → 303 to `/thanks/`
 *
 * So the forms work with JavaScript disabled and feel modern with it, and
 * neither path is a second implementation.
 */
import type { APIRoute } from 'astro';
import { RESEND_API_KEY, GOOGLE_SERVICE_ACCOUNT_JSON_B64, LEAD_SHEET_ID, LEAD_FORM_SECRET } from 'astro:env/server';
import { handleLead } from '../../lib/leads/handle';
import { createSheetWriter } from '../../lib/leads/sheet';
import { createResendNotifier } from '../../lib/leads/notify';
import { signTimestamp } from '../../lib/leads/spam';

export const prerender = false;

const log = (level: 'warn' | 'error', message: string) => {
  // Vercel captures stdout/stderr per invocation, and these lines are the ONLY
  // record of a discarded or half-delivered submission. The no-console rule is
  // right for components shipped to a browser and wrong for a server function,
  // so the exception is scoped to exactly here rather than switched off.
  /* eslint-disable no-console */
  if (level === 'error') console.error(message);
  else console.warn(message);
  /* eslint-enable no-console */
};

export const POST: APIRoute = async ({ request, url }) => {
  const wantsJson = (request.headers.get('accept') ?? '').includes('application/json');

  const respond = (result: { status: number; ok: boolean; message: string }) => {
    if (wantsJson) {
      return new Response(JSON.stringify({ ok: result.ok, message: result.message }), {
        status: result.status,
        headers: { 'Content-Type': 'application/json' },
      });
    }
    if (result.ok) {
      // 303 so the browser re-issues as GET and a refresh cannot resubmit.
      return new Response(null, { status: 303, headers: { Location: '/thanks/' } });
    }
    return new Response(null, {
      status: 303,
      headers: { Location: `/thanks/?error=${encodeURIComponent(result.message)}` },
    });
  };

  // Without a sheet there is no system of record, and the rule is that we never
  // report success unless the lead is durable. Failing loudly here beats
  // accepting submissions into nothing.
  if (!GOOGLE_SERVICE_ACCOUNT_JSON_B64 || !LEAD_SHEET_ID) {
    log('error', 'lead: GOOGLE_SERVICE_ACCOUNT_JSON_B64 or LEAD_SHEET_ID is unset — refusing the submission');
    return respond({
      status: 500,
      ok: false,
      message: 'Our form is not accepting submissions right now. Please call us and we will take the details.',
    });
  }

  const fields: Record<string, string> = {};
  try {
    const form = await request.formData();
    for (const [k, v] of form.entries()) if (typeof v === 'string') fields[k] = v;
  } catch {
    return respond({ status: 400, ok: false, message: 'We could not read that submission.' });
  }

  const result = await handleLead(
    { fields, pageUrl: fields._page || request.headers.get('referer') || url.origin },
    {
      sheet: createSheetWriter({
        credentialsB64: GOOGLE_SERVICE_ACCOUNT_JSON_B64,
        sheetId: LEAD_SHEET_ID,
      }),
      notifier: RESEND_API_KEY ? createResendNotifier(RESEND_API_KEY) : undefined,
      formSecret: LEAD_FORM_SECRET,
      log,
    },
  );

  return respond(result);
};

/**
 * `GET /api/lead?stamp=1` — mint a signed timestamp.
 *
 * The pages are prerendered, so a stamp baked into the HTML would measure time
 * since DEPLOY, not time since a human opened the form. Issuing it here, when
 * the enhancement script says someone has actually touched a form, is what
 * makes the age check mean anything. See `lib/leads/spam.ts`.
 *
 * `no-store` matters: a cached stamp is a stale stamp, and the CDN would happily
 * serve one for hours.
 *
 * Any other GET is someone pasting the URL into a browser; send them somewhere
 * useful rather than showing them a 405.
 */
export const GET: APIRoute = ({ url }) => {
  if (url.searchParams.get('stamp') !== '1') {
    return new Response(null, { status: 303, headers: { Location: '/contact/' } });
  }
  if (!LEAD_FORM_SECRET) {
    // No secret configured: the check is skipped server-side anyway, so hand
    // back an empty stamp rather than an error the script has to special-case.
    return new Response(JSON.stringify({ stamp: '' }), {
      headers: { 'Content-Type': 'application/json', 'Cache-Control': 'no-store' },
    });
  }
  return new Response(JSON.stringify({ stamp: signTimestamp(Date.now(), LEAD_FORM_SECRET) }), {
    headers: { 'Content-Type': 'application/json', 'Cache-Control': 'no-store' },
  });
};
