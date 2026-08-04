/**
 * The Google Sheet writer — **the system of record**.
 *
 * The spreadsheet lives in the CLIENT'S own Google account. They share it with
 * our service account, which can then append rows and nothing else. That is the
 * whole ownership story: they can revoke us in two clicks from a UI they already
 * know, and if they ever leave, the data is already theirs and never moves.
 *
 * The service account deliberately holds **no project-level IAM roles**. Its
 * entire authority comes from sheets being shared with it, so a leaked key can
 * append to the handful of spreadsheets clients have explicitly shared and
 * touch nothing else in the project.
 *
 * Why the raw REST API instead of `googleapis`: that package is ~50MB unpacked
 * and we make exactly one call. `google-auth-library` (800K) signs the JWT,
 * `fetch` does the rest, and the serverless cold start stays honest.
 */
import { GoogleAuth } from 'google-auth-library';
import { SHEET_COLUMNS, type SheetColumn, type SheetTab } from './config';

export type LeadRow = Partial<Record<SheetColumn, string>>;

export interface SheetWriter {
  /** `tab` comes from the list's routing entry — see LEAD_LISTS. */
  append(row: LeadRow, tab: SheetTab): Promise<void>;
}

/**
 * Decode the base64 service-account JSON.
 *
 * Base64 rather than a raw PEM because the private key is multi-line, and
 * multi-line secrets get their newlines mangled somewhere between a clipboard,
 * a dashboard field and a shell. The failure is opaque — an `invalid_grant` at
 * runtime with nothing pointing at the newlines — so the format is chosen to
 * make it impossible rather than debuggable.
 */
function decodeCredentials(b64: string): { client_email: string; private_key: string } {
  let parsed: unknown;
  try {
    parsed = JSON.parse(Buffer.from(b64, 'base64').toString('utf8'));
  } catch {
    throw new Error(
      'GOOGLE_SERVICE_ACCOUNT_JSON_B64 is not valid base64-encoded JSON. ' +
        'Produce it with:  base64 -i service-account.json',
    );
  }
  const c = parsed as { client_email?: string; private_key?: string };
  if (!c.client_email || !c.private_key) {
    throw new Error('Service-account JSON is missing client_email or private_key.');
  }
  return { client_email: c.client_email, private_key: c.private_key };
}

/** Order the row positionally. See SHEET_COLUMNS on why order is append-only. */
export function toValues(row: LeadRow): string[] {
  return SHEET_COLUMNS.map((c) => row[c] ?? '');
}

export function createSheetWriter(opts: { credentialsB64: string; sheetId: string }): SheetWriter {
  return {
    async append(row, tab) {
      const { client_email, private_key } = decodeCredentials(opts.credentialsB64);

      const auth = new GoogleAuth({
        credentials: { client_email, private_key },
        scopes: ['https://www.googleapis.com/auth/spreadsheets'],
      });
      const token = await auth.getAccessToken();
      if (!token) throw new Error('Could not obtain a Google access token for the service account.');

      // `INSERT_ROWS` rather than `OVERWRITE` so a concurrent submission can
      // never land on top of one already written.
      const url =
        `https://sheets.googleapis.com/v4/spreadsheets/${encodeURIComponent(opts.sheetId)}` +
        `/values/${encodeURIComponent(tab)}!A1:append` +
        `?valueInputOption=RAW&insertDataOption=INSERT_ROWS`;

      const res = await fetch(url, {
        method: 'POST',
        headers: { Authorization: `Bearer ${token}`, 'Content-Type': 'application/json' },
        body: JSON.stringify({ values: [toValues(row)] }),
      });

      if (!res.ok) {
        const detail = await res.text().catch(() => '');
        // 403 here almost always means the sheet was never shared with the
        // service account — by far the most common setup mistake, so name it.
        const hint =
          res.status === 403
            ? ` — is the spreadsheet shared with ${client_email} as an Editor?`
            : res.status === 400 || res.status === 404
              ? ` — check LEAD_SHEET_ID, and that a tab named "${tab}" exists. ` +
                `Run \`npm run sheet:provision\` to create the workbook's tabs.`
              : '';
        throw new Error(`Sheets append failed (${res.status})${hint} ${detail.slice(0, 300)}`);
      }
    },
  };
}
