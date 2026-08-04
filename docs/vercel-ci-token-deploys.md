# Deploying a client site — target architecture

How sites forked from this starter deploy to Vercel, and how to set one up.

Read this **before** launching a client site. Retrofitting it afterwards means a
window where deploys silently depend on who happened to author a merge commit.

## The short version

Deploys run from a GitHub Action authenticated with a **Vercel token**, not from
Vercel's Git integration. The deployment is attributed to the token's owner, so
commit authorship stops deciding whether the site ships.

```
push/merge  →  GitHub Action  →  vercel pull / build / deploy --prebuilt
                     ↑
              VERCEL_TOKEN (repo secret)
```

## Why not the Git integration

It is the default, and it is the wrong default for client work.

Vercel's Git integration attributes every deployment to the **commit author**, and
on a Pro team that author must be a Vercel member who has linked their Git
provider. Anyone else's commit is refused with `BLOCKED` — and that is **not a
build failure**. CI stays green, no error is raised, the merge looks clean, and
the deploy simply never happens.

Two things make it worse than a plain misconfiguration:

- **It is nondeterministic.** On fareway-marketing, PRs #36 and #37 had identical
  commit-author sets and were merged minutes apart with the same command. #36 was
  attributed to a linked identity and shipped; #37 was attributed to an unlinked
  one and blocked. You cannot predict it from the PR.
- **It costs a seat per contributor.** A deploying seat (Owner or Member) is
  $20/month each; free Viewer seats cannot deploy. One seat per marketer, per
  contractor, per client is the wrong shape of bill — and it hands client staff a
  Vercel dashboard you may not want them in.

A CLI deploy is attributed to the token owner instead, so any number of
contributors — marketers, contractors, the autofix bot, client staff — can push
against a single paid seat.

## Setup for a new client site

1. **Link the project** — `vercel link` in the repo, then read
   `.vercel/project.json` for `orgId` and `projectId`.
2. **Fill in the two IDs** in `.github/workflows/deploy.yml`'s `env:` block,
   replacing the `REPLACE_ME_…` placeholders. These are not secrets — they are
   identifiers, inert without the token.
3. **Create an account-scoped Vercel token.** Read the next section first; getting
   this wrong costs an afternoon.
4. **Verify the token before storing it:**
   ```
   vercel whoami --token=<token>     # must print a username
   ```
5. **Store it:** `gh secret set VERCEL_TOKEN --repo <org>/<repo>`. Use the
   interactive prompt — `echo "$TOKEN" | gh secret set …` appends a newline and
   Vercel rejects the result as malformed.
6. **Add whatever build-time secrets the site needs** — Tina Cloud vars if live
   editing is on, lead-capture destinations per `docs/lead-capture.md`. Drop the
   entries the fork does not use.
7. **Leave the Git integration ON** and merge. Confirm both a preview and a
   production run go green.
8. **Only then disable it:** Vercel → project → Settings → Git. Until you do,
   every merge deploys twice and burns double build minutes.

## The token must be account-scoped

Scoping a deploy credential to the one project it needs is the right instinct, and
Vercel supports it — `vercel tokens add "CI" --project prj_…`. **It does not work
with the CLI.** Do not use it here.

A project-scoped token holds rights over a project, not an account. Every Vercel
CLI command resolves the *user* before it touches the project, and there is no
user to resolve. The result is a credential that is genuinely valid and still
cannot deploy:

| Call | Project-scoped | Account-scoped |
| --- | --- | --- |
| `GET /v9/projects/prj_…?teamId=…` (REST) | `200` | `200` |
| `vercel whoami` | `Error: User not found.` | prints the username |
| `vercel teams ls` | `token … is not valid` | lists the team |
| `vercel pull` | `Could not retrieve Project Settings` | pulls |

The REST `200` is what makes this expensive: the token tests fine by hand and
fails only in CI. **`vercel whoami --token=…` is the check that predicts CI.**

If `vercel tokens add` returns `Cannot create tokens for this app (403)`, your CLI
session cannot mint credentials — use the dashboard at
`https://vercel.com/account/settings/tokens` instead.

### Narrowing an account-scoped token back down

An account-scoped token can deploy **every project on the team**, not just this
one. Size that deliberately rather than by accident.

To get narrow scope and CLI compatibility together: create a dedicated Vercel
*user* as a service account, add it to the team as a **Contributor** with a
project-level role on this project only, and mint an account-scoped token as that
user. The token then resolves a user, so the CLI works, but that user can only
reach the one project.

Confirm whether a Contributor consumes a paid seat before committing to it —
Vercel's pricing docs specify Owner/Member as billed and Viewer as free, and are
silent on Contributor.

A service account is also the right owner regardless of scope: a token tied to a
person breaks when they leave or rotate credentials.

## What this changes about who can deploy

This is the real trade, and it is easy to miss.

Under the Git integration, Vercel independently verified **who authored the
commit**. Under this workflow it verifies only that the caller holds a valid
token. Every question about who may trigger a production deploy becomes GitHub's
to answer.

Deploy access becomes *whoever can cause the workflow to run with that secret*:

1. anyone who can push or merge to the production branch
2. anyone who can land a change to `.github/workflows/` — editing the workflow
   means running arbitrary code with the token in scope, which is both "deploy
   anything" and "exfiltrate the credential"

The second is the one people forget.

**So before disabling the Git integration, check the repo's protections are real.**
On fareway-marketing at the time of writing they were not:
`required_approving_review_count: 0`, `require_code_owner_reviews: false`, and a
`CODEOWNERS` naming a placeholder team that did not exist. That was tolerable
while Vercel independently checked commit authors. It is not once GitHub is the
only gate.

Two cheap hardening steps for a client site:

- Put `VERCEL_TOKEN` in a GitHub **Environment** with required reviewers and a
  branch restriction, so a production deploy needs a human approval even if
  something reaches the production branch.
- Make `CODEOWNERS` real — a team that exists, plus `require_code_owner_reviews` —
  so `.github/` cannot be changed unilaterally.

Fork PRs are already safe: they receive no secrets, and the workflow skips them
rather than failing red.

## What this does not solve

- It does not remove the need for a Vercel account to *view* the dashboard, only
  to *deploy*.
- It adds a token to store and rotate. If you set an expiry, put a reminder next
  to it — a silently expired token reintroduces the exact failure mode this
  removes.
- **If the client's editors work in TinaCMS rather than git, this is not what
  unblocks them.** Their commits already come from Tina's app identity, and the
  seat problem never applies. This pattern matters for contributors and
  contractors pushing real commits, and for making merges deterministic.

## Team structure

Decide before launch whether each client gets **their own Vercel team, billed to
them**, with us added as members — rather than every client site living in one
agency team.

Moving a project between Vercel teams afterwards means redoing domains and
environment variables, so this is much cheaper to settle up front.

## Reference implementation

`Monkeyjump-Labs/fareway-marketing` — `.github/workflows/deploy.yml` and
`docs/vercel-ci-token-deploys.md`. Tracked as FW-3994.
