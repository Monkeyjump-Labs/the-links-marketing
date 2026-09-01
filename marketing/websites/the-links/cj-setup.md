# CJ's setup prompt — paste into Claude Code

> Send this **before** [`onboarding-prompt-cj.md`](onboarding-prompt-cj.md). This one gets the
> project onto CJ's machine; that one is the first working session.
>
> **Assumes two things are already true:**
> 1. CJ has a GitHub account with access to `Monkeyjump-Labs/the-links-marketing` — the
>    invitation sent 2026-08-28 has been **accepted**.
> 2. The Claude desktop app is installed and signed in, with the Claude Code tab open.
>
> Everything after that is handled by CJ's agent. CJ types no commands and installs nothing
> except Git, and only if it turns out to be missing.
>
> Works on **Windows and macOS** — the prompt detects which and adapts. CJ is on Windows.

CJ opens the Claude Code tab — anywhere, any folder, it does not matter — and pastes
everything inside the fence as the first message.

---

```text
Before we start on anything, please get this computer set up to work on my website. I am
CJ Johnson — I run The Links, indoor golf simulator venues in Minnesota. I am not a
developer: no git, no code, no command line, and no reason to learn any of it. Do the work
for me rather than telling me what to type, and explain anything I have to click in plain
English.

Here is what needs to be true when you are done. Work through it in order, and stop at the
first thing that fails rather than working around it.

1. GIT
   Check whether git is installed. If it is not, tell me which of these to download and
   then WAIT for me to say I have done it — do not try to install it yourself and do not
   suggest Homebrew, winget or any other package manager:
     - Windows: https://git-scm.com/download/win  (run it, accept every default)
     - Mac:     https://git-scm.com/download/mac
   Once I say it is installed, check again before continuing.

2. A HOME FOR THE PROJECT
   Make a folder somewhere I will find again — inside my Documents is ideal, named
   something obvious like "The Links Website". Tell me exactly where you put it. If a
   copy of the project is already on this machine, use that instead of making a second
   one, and say so.

3. DOWNLOAD THE PROJECT
   Download it into that folder from:
     https://github.com/Monkeyjump-Labs/the-links-marketing
   The first time, GitHub may ask me to sign in — usually a browser window. That is
   normal and it happens once. Tell me what to expect before it appears, and wait for me.
   If it asks for something I do not have, stop and tell me.

4. THE RIGHT BRANCH
   Switch to the branch called `staging`. That is where all my work happens. If `staging`
   does not exist, STOP and tell me to contact Daran — do not create it yourself, and do
   not put me on any other branch.

5. READ THE PROJECT'S INSTRUCTIONS
   Read the CLAUDE.md file at the top of the project, including the section addressed to
   me. Those are your standing rules for this website and they apply every time we work
   together, not just today.

Then tell me, in five short lines, plain English, no file paths or technical output:

  1. Is git installed?
  2. Where did you put the project?
  3. Did it download successfully?
  4. Which branch am I on?
  5. Have you read the project's instructions, including the part about me?

Do not change anything, do not edit any files, and do not start any work. Setup only.
When all five are good, just say I am ready and stop there.
```

---

## What to expect

| | |
|---|---|
| **Time** | A few minutes, unless Git needs installing |
| **CJ types** | Nothing but this paste, and a GitHub sign-in if prompted |
| **CJ installs** | Git, and only if it is missing |
| **A "no" on any line** | A setup problem — send it to Daran rather than working around it |

**The rules are not in this prompt on purpose.** They live in the project's `CLAUDE.md`, which
loads in every session once the project is on the machine. This prompt only has to run once;
the rules apply forever.

## Then the first working session

Paste [`onboarding-prompt-cj.md`](onboarding-prompt-cj.md) — the block inside its ```text
fence. It gives CJ a tour and walks through one small real edit end to end.
