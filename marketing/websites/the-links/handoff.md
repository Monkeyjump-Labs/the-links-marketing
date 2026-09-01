# Handoff — client onboarding, staging pipeline, and rollback

> Website Studio artifact · **Phase 6** · drafted 2026-08-13 · slug `the-links`
> Companion to [`EDITING.md`](../../../EDITING.md) (the client-facing editing guide) and
> [`ship-gate.md`](ship-gate.md) (launch checks). This file is the operator runbook for
> handing the site to the client and being able to take it back.

## Cutover record

| Field | Value |
|---|---|
| **Cutover date** | **2026-08-30** |
| **Snapshot tag** | [`handoff-2026-08-30`](https://github.com/Monkeyjump-Labs/the-links-marketing/releases/tag/handoff-2026-08-30) → `ce1b35f` |
| **Client GitHub user(s)** | `cjohnson-creator` (CJ Johnson), **write** — invited 2026-08-28 |
| **Client Claude account** | CJ's own, Claude desktop app → Claude Code tab. Setup: [`cj-setup.md`](cj-setup.md), then [`onboarding-prompt-cj.md`](onboarding-prompt-cj.md) |
| **Client sandbox** | `https://staging-the-links.vercel.app` (noindex) |
| **Live site at cutover** | `https://the-links-marketing.vercel.app` — ⚠️ `thelinks.golf` still 301s to the old Squarespace site |
| **Lead notifications switched to client email** | ✅ `info@lakevillelinks.com` since 2026-08-30. Styleguide test form stays on our inbox |

### Open at cutover, deliberately

- **CJ will see our `StubNote` notes** on the sandbox. `PUBLIC_SITE_NOINDEX` drives both
  noindex and StubNote, so the two cannot be separated without a code change. Correct by
  design, but that design predates staging belonging to the client. Undecided.
- **The production `.vercel.app` is indexable** — `Allow: /`, real prices — against the
  intent recorded in `ship-gate.md`. Open decision, see that file.
- **Domain not cut over.** Publishing updates the new site; a customer typing
  `thelinks.golf` still gets the old one. The prompt says so plainly; delete that passage
  at cutover.

---

## 1. The editing model we are onboarding them into

Two lanes, both writing git (they can never disagree):

| Lane | Tool | Branch | Who |
|---|---|---|---|
| Content (hours, rates, leagues, menu, FAQ) | TinaCMS `/admin` *(if Tina Cloud is enabled)* or Claude Desktop | `staging` | client |
| Play / experiments / copy tweaks | **Claude Desktop** + GitHub connector | `staging` | client |
| Structural work | Claude Code on the repo | feature branches → PR | developer |

**The client may promote to production themselves** — decided 2026-08-26. They are a
collaborator with write, and `main`'s protection does not restrict who may merge, so the
capability is real and deliberate rather than an oversight.

What still holds the line is CI, not permissions: `main` requires a pull request, requires the
`Quality` check to pass, is strict (the branch must be current), and blocks force pushes and
deletions (verified 2026-08-13). A broken promotion is refused; an unwise one is not.

The guardrail against an *accidental* promotion is therefore behavioural, and lives in the
onboarding prompt: publishing is a separate, spoken request, never the tail end of another
task. If that ever proves too thin, the mechanical fix is a push restriction on `main` with a
bypass list — it also restricts who can merge, and needs no change to their write access.

## 2. Staging pipeline — play, preview, promote, or throw away

**One Vercel project, no second deployment.** A long-lived `staging` branch is the client's
sandbox.

```
client pushes ──► staging branch ──► deploy.yml staging job ──► stable staging URL (noindex)
                                       │
                             happy?  PR staging → main ──► Quality CI ──► merge ──► production
                             junk?   reset staging to main — nothing ever reached prod
```

### ⚠️ Do not use a Vercel branch domain for this

The obvious setup — Vercel → Domains → assign a domain to the `staging` branch — is a **Git
integration** feature, and this repo deliberately does not deploy that way. `deploy.yml` runs
`vercel build && vercel deploy` under a CI-owned `VERCEL_TOKEN` so that deploys are attributed
to the token owner rather than the commit author. The whole reason that workflow exists
(`docs/vercel-ci-token-deploys.md`, FW-3994) is the failure this section used to walk into:

> Vercel's Git integration attributes every deployment to the commit author, and on a Pro team
> that author must be a Vercel member who has linked their Git provider. Anyone else's commit
> is refused with `BLOCKED` — which is **not** a build failure. CI stays green, no error is
> raised, and the deploy simply never happens.

The client operator is precisely "anyone else". Give them a branch domain and their pushes look
successful and ship nothing. The stable staging URL must come from a **`vercel alias`** applied
by the workflow, not from a branch domain.

### One-time setup (operator)

1. **Create the branch.** `git branch staging main && git push -u origin staging`.
   Leave it unprotected — being able to force-reset it is the throwaway feature.

2. **Teach `deploy.yml` about `staging`.** It currently fires on `main` only, so a staging push
   deploys nothing. Three edits:
   - Add `staging` to the `push:` branches.
   - Guard the existing `production` job with `github.ref_name == 'main'` — without this, a
     push to `staging` deploys **straight to production**. This is the sharpest edge in the
     whole change.
   - Add a `staging` job: same steps as `preview`, built against the preview environment (no
     `--prod`), with `TINA_BRANCH: staging`, ending in
     `vercel alias set "$url" "$STAGING_ALIAS" --token="$VERCEL_TOKEN"`.

3. **Pick the alias hostname.** A free `*.vercel.app` subdomain works today; move it to
   `staging.thelinks.golf` after the domain cuts over. Whatever it is, it goes in the
   onboarding prompt's `{{STAGING_URL}}` blank.

4. **Run Quality on staging pushes too** — add `staging` to `quality.yml`'s `push:` branches.
   It does not gate the deploy, and should not: the sandbox exists to be broken in. But a red
   check tells the client something is wrong before they ask why the page looks odd.

5. **`PUBLIC_SITE_NOINDEX` is set by the staging job itself**, not on the Vercel project.
   `ship-gate.md` recorded it as set on both environments; it was set on neither, and the first
   staging deploy came up publicly crawlable as a result (PR #25). The workflow now hardcodes
   it for staging, so the sandbox cannot become indexable through a dashboard change.
   ⚠️ The **production** `.vercel.app` deploy is still indexable — open decision, see
   `ship-gate.md`.

6. ~~Turn the Vercel Git integration off~~ — **already disconnected.** Verified 2026-08-28:
   the repo has zero GitHub Deployments and every check-run belongs to `github-actions`. The
   Vercel app leaves both traces, so their absence is the evidence. `deploy.yml` had claimed
   for an unknown period that the integration was still enabled and that switching it off was
   overdue; that comment was simply stale, and it sent people looking for a switch that was
   already thrown. Nothing to do here.

### A useful property of this setup

If the client pushes something that does not build, `vercel build` fails, the deploy step never
runs, and the alias keeps pointing at the last good staging deployment. They get a red check
rather than a broken staging site.

### Promote (either the client or us)

```bash
gh pr create --base main --head staging --title "chore: promote staging to production"
# Quality CI runs (tokens → tina-lock → leads → lint → check → test → build). Green → merge.
```

PR titles are validated against Conventional Commits (`commit-check.yml`), so the `chore:`
prefix is required, not decoration.

### Throw away

```bash
git fetch origin && git checkout staging
git reset --hard origin/main && git push --force origin staging
```

Staging is `main` again. The next push redeploys; nothing to clean up in Vercel.

## 3. Client onboarding checklist

### The client needs (they provide)

- ⬜ **A Claude account with the Desktop app** — Pro at minimum; a **Team seat on our
  workspace is the streamlined option** (we manage billing, we pre-configure the project,
  they just sign in).
- ⬜ **A GitHub account** (free) — one per person who will edit. No git knowledge required;
  Claude drives it through the connector.
- ⬜ 30 minutes for a walkthrough against `EDITING.md`.

### We do before cutover (operator)

- ⬜ Create the `staging` branch + Vercel branch domain + env scoping (§2).
- ⬜ Invite client GitHub user(s) as collaborators with **write** (write lets them push
  `staging`; branch protection keeps `main` ours).
- ⬜ In the client's Claude: connect the **GitHub connector** to the repo and create a
  Claude **Project** with instructions (draft in §5) — always `staging`, follow
  `EDITING.md`, never merge, never invent facts (stubs stay stubs).
- ⬜ Decide **Tina Cloud on/off** for `/admin` prod editing. Off = Claude Desktop is the
  only content lane (simplest). On = follow CLAUDE.md "Enabling Tina Cloud on a forked
  site" (Tina Cloud project + 3 env vars + `tinacms build && astro build` as the Vercel
  build command + seeded lock). Set `TINA_BRANCH=staging` so Tina edits land in the
  sandbox too.
- ✅ Switch form notifications from `hello@fareway.golf` to the client's inbox
  (ship-gate launch task) — at cutover, not before.
- ⬜ Fill the **Cutover record** above and take the snapshot (§4).

### Explicitly NOT required

- No Vercel access for the client (previews arrive as URLs; the staging URL is stable).
- No local dev environment, no npm, no clone.
- No Tina Cloud unless we choose it above.

## 4. Snapshot & rollback — taking it back if they do something wild

**At cutover, before their first edit** (fill the record above):

```bash
git checkout main && git pull
git tag -a handoff-YYYY-MM-DD -m "Pre-client-handoff snapshot. Site state at cutover."
git push origin handoff-YYYY-MM-DD
gh release create handoff-YYYY-MM-DD --title "Pre-handoff snapshot" \
  --notes "State of the site at client cutover. Roll back with: git revert <range> or branch from this tag."
```

The tag is immutable on GitHub regardless of what happens to branches afterward.

**Rollback paths, fastest first:**

1. **Vercel instant rollback** (minutes, no git): Vercel → Deployments → the last good
   production deployment → *Promote to Production*. Buys time while git is sorted out.
2. **Throw away staging** (§2) — if the mess never got promoted, this is the whole fix.
3. **Git revert** (the honest history): `git revert <bad-merge-sha> -m 1` on a branch → PR
   → merge. Protection stays intact; CI re-verifies.
4. **Branch from the tag** (nuclear): `git checkout -b restore handoff-YYYY-MM-DD`, PR it
   into `main`. History keeps the client's commits, production returns to the snapshot.

Force-pushing `main` is never the move — protection blocks it, and nothing above needs it.

## 5. The onboarding prompt

Moved to [`operator-onboarding.md`](operator-onboarding.md), which carries the prompt itself,
the six blanks to fill before sending it, and the six prerequisites from §2–§4 that must be
true first. Written for the **Claude desktop app, Claude Code tab** — not the Desktop GitHub
connector this section originally assumed.

One thing that section did not anticipate: this repo's `CLAUDE.md` instructs Claude Code to
open a PR and self-merge once CI is green. In an operator's session that points straight at
the one thing they must never do, so the prompt overrides it by name. If that override ever
fails to hold, move the guardrail into `CLAUDE.md` itself.
