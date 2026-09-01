# CJ's setup — from nothing to ready

> Send this **before** [`onboarding-prompt-cj.md`](onboarding-prompt-cj.md). That one is the
> first working session; this one gets the machine ready for it.
>
> Written for a machine with nothing installed. **Covers both Windows and macOS** — CJ is on
> Windows; follow that column. This is the reusable shape for any client operator, not a
> one-off.
>
> The only developer tool needed is **Git**. No Node, no package manager, no terminal use.

## Why this is a separate document

The onboarding prompt cannot do any of this. It is pasted **into** a Claude Code session — so
it only runs once the session already exists. Everything below is what has to be true before
there is a Claude to paste anything into.

Steps 1–5 are CJ's, by hand. Step 6 is one paste. Step 7 hands over to the other file.

The **rules** CJ's Claude follows are not part of setup at all — they live in the project's
own `CLAUDE.md`, which loads automatically in every session inside this repo. Nothing to
install, nothing to paste, and nothing that can drift out of sync with the project.

---

## 1. Accept the GitHub invitation ⚠️ time-limited

CJ was invited to `Monkeyjump-Labs/the-links-marketing` with write access on **2026-08-28**.
GitHub invitations expire after 7 days — **this one lapses around 4 September**. If it does,
it simply has to be re-sent; nothing breaks.

- Check the email inbox for a GitHub invitation, **or** go straight to
  <https://github.com/Monkeyjump-Labs/the-links-marketing/invitations>
- If CJ has no GitHub account yet, create a free one first at <https://github.com/signup>,
  then re-open the invitation link.

**How to know it worked:** <https://github.com/Monkeyjump-Labs/the-links-marketing> loads the
project instead of showing a 404.

## 2. Get a Claude account

Claude Code needs a paid plan — Pro at minimum. A free account will not run it.

## 3. Install the Claude desktop app

<https://claude.ai/download> — Windows and macOS builds are both there. Sign in with the
account from step 2.

## 4. Install Git

Git is the one developer tool required — the Claude Code tab uses it to save CJ's changes and
send them to the project. Install it **directly from the official site**, not through a
package manager: Homebrew and winget are extra software to install first, and nothing else
here needs them.

| | Download | Notes |
|---|---|---|
| **Windows** (CJ) | <https://git-scm.com/download/win> | Run the installer and accept every default. It is a long wizard; none of the choices matter for this. |
| **macOS** | <https://git-scm.com/download/mac> | Or run `xcode-select --install`, which also provides Git. |

**Nothing else is needed.** CJ never builds the website on his own machine — pushing a change
makes Vercel build it. That is why there is no Node, no npm, and no toolchain here.

**How to know it worked:** the Git installer finishes without an error. There is nothing to
check by hand; step 6 confirms it for real.

## 5. Make an empty folder for the project

Somewhere CJ will find again — `Documents\The Links Website` is fine. **Leave it empty.**

This exists so the Claude Code tab has somewhere to work. CJ does not download the project
himself; Claude does that in step 6, so nobody has to type a command.

## 6. Open that folder in the Claude Code tab, and let Claude fetch the project

Open the Claude desktop app → **Claude Code** tab → open the empty folder from step 5.

Then paste this as the very first message:

```text
This folder is empty. Please download The Links website into it from
https://github.com/Monkeyjump-Labs/the-links-marketing so we can start working.

I am not a developer — do it for me rather than telling me what to type, and if it asks
who I am, tell me exactly what to click in plain English.

Once it is downloaded, tell me in four short lines:
1. Did it work?
2. Which branch am I on? It must be `staging` — switch if it is not. If `staging` does
   not exist, stop and tell me rather than creating it.
3. Have you read the project's CLAUDE.md, including the section addressed to me?
4. Is the working copy clean?

If anything failed, say exactly what and stop. Do not work around it.
```

The first time Git talks to GitHub it will ask CJ to sign in — a browser window, the normal
GitHub login. That is expected and it happens once.

**Four yeses and CJ is ready.** Any no is a setup problem; send it to Daran rather than
working around it.

## 7. First working session

Now paste [`onboarding-prompt-cj.md`](onboarding-prompt-cj.md) — the block inside its ```text
fence. It gives CJ a tour, then walks through one small real edit end to end.

---
