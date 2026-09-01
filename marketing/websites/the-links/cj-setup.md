# CJ's setup — from nothing to ready

> Send this **before** [`onboarding-prompt-cj.md`](onboarding-prompt-cj.md). That one is the
> first working session; this one gets the machine ready for it.
>
> Written for a Windows PC with nothing installed. CJ does not need Git, Node, a terminal, or
> any developer tooling.

## Why this is a separate document

The onboarding prompt cannot do any of this. It is pasted **into** a Claude Code session — so
it only runs once the session already exists. Everything below is what has to be true before
there is a Claude to paste anything into.

Steps 1–4 are CJ's, by hand. Step 5 hands over to the other file.

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

<https://claude.ai/download> → the Windows version. Sign in with the account from step 2.

## 4. Open the Claude Code tab and connect the project

In the desktop app, switch to the **Claude Code** tab and point it at
`Monkeyjump-Labs/the-links-marketing`.

> ⚠️ **Operator: dry-run this step on a Windows machine before sending.**
> This is the one instruction here that has not been walked through end to end, and it is the
> step where a non-technical person gets stuck. Two shapes are possible depending on how the
> app is set up, and they need different things from CJ:
>
> | | What CJ needs |
> |---|---|
> | Connects to the GitHub repo directly | Nothing else — step 1 covered it |
> | Wants a folder on the PC | Git installed and the project downloaded — a real extra step |
>
> Replace this box with the actual click-path once confirmed, and delete the branch that does
> not apply. Do not make CJ discover this.

## 5. First session

Paste [`onboarding-prompt-cj.md`](onboarding-prompt-cj.md) — the block inside the ```text
fence — as the first message. It gives a tour, then does one small practice edit end to end.

---

## Verify it worked

Before the tour, paste this and check the four answers:

```text
Before we do anything, confirm four things and tell me in four short lines, plain English:

1. Can you see the project Monkeyjump-Labs/the-links-marketing?
2. Which branch are you on? It must be `staging` — switch if it is not, and tell me if
   `staging` does not exist rather than creating it.
3. Have you read the project's CLAUDE.md, including the section addressed to me?
4. Without changing anything, is the working copy clean?

If any answer is no, say exactly which one and stop. Do not try to fix it yourself.
```

Four yeses and CJ is ready. Any no is a setup problem, not something to work around.
