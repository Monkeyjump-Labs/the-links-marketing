# CJ's setup — two pastes and one thing CJ does by hand

> Send this **before** [`onboarding-prompt-cj.md`](onboarding-prompt-cj.md). This one gets the
> project and its tools onto CJ's machine; that one is the first working session.
>
> **Assumes two things are already true:**
>
> 1. CJ has a GitHub account with access to `Monkeyjump-Labs/the-links-marketing` — the
>    invitation sent 2026-08-28 has been **accepted**.
> 2. The Claude desktop app is installed and signed in, with the Claude Code tab open.
>
> Works on **Windows and macOS** — the prompts detect which and adapt. CJ is on Windows.

## ⚠️ Read this before sending anything

**This file was rewritten on 2026-09-03, after running it with CJ for real.** The first
version was one paste and assumed the agent could do everything. Three things were wrong, and
each one cost a phone call:

| What the old version said                     | What actually happened                                                                                                             |
| --------------------------------------------- | ---------------------------------------------------------------------------------------------------------------------------------- |
| Put the project in `Documents`                | OneDrive sync broke it. The fix is not a warning — it is **never suggest Documents**                                                |
| One session does the whole setup              | Claude Code fixes its working folder when the session STARTS, so the session that clones the project cannot then work inside it     |
| The agent installs and configures the tools   | The agent installs them fine. It **hangs forever on `gh auth login`**, which needs a human at a browser                             |

The structure below is the sequence that worked. Do not collapse it back into one paste.

---

## Step 1 — get the project onto the machine

CJ opens the Claude Code tab. It does not matter what folder it starts in — this paste creates
the right one. CJ pastes everything inside the fence as the first message.

```text
Before we start on anything, please get my website project onto this computer. I am CJ
Johnson — I run The Links, indoor golf simulator venues in Minnesota. I am not a developer:
no git, no code, no command line, and no reason to learn any of it. Do the work for me
rather than telling me what to type, and explain anything I have to click in plain English.

Work through this in order, and stop at the first thing that fails rather than working
around it.

1. GIT
   Check whether git is installed. If it is not, tell me which of these to download and
   then WAIT for me to say I have done it — do not try to install it yourself and do not
   suggest Homebrew, winget or any other package manager:
     - Windows: https://git-scm.com/download/win  (run it, accept every default)
     - Mac:     https://git-scm.com/download/mac
   Once I say it is installed, check again before continuing.

2. WHERE THE PROJECT GOES — one exact place
   Create and use this folder:
     Windows:  C:\Users\<my-username>\src
     Mac:      ~/src

   Three things about it, and the first one is not negotiable:

   - DO NOT put it in Documents, Desktop, or anywhere inside OneDrive, iCloud Drive,
     Dropbox or Google Drive. A synced folder will quietly corrupt this kind of project —
     it has thousands of small files and the sync tools fight with them. If you cannot
     tell whether a folder is synced, use the path above, which is not.
   - The website's files must sit DIRECTLY inside that folder. When I open it I should see
     things like a `src` folder and a `README.md` file — NOT another folder with a
     different name that I have to go into first.
   - If a copy of the project is already somewhere else on this machine, tell me where it
     is and MOVE it here rather than downloading a second one. Two copies is how I end up
     editing the wrong one.

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

Then tell me, in four short lines, plain English, no file paths or technical output except
the one I ask for:

  1. Is git installed?
  2. Did the project download successfully?
  3. Which branch am I on?
  4. THE FOLDER I OPEN EVERY TIME — give me the full path, and tell me plainly that this
     is the folder to open in Claude Code whenever I work on the website. This is the one
     thing I need to remember.

Do not change anything, do not edit any files, and do not start any work. Do not install
anything except git. When all four are good, just say I am ready for step 2 and stop there.
```

---

## Step 2 — start a NEW session, in the project folder

**This is a separate Claude Code session and it is not optional.** Claude Code fixes its
working folder when the session starts. The session in step 1 started before the project
existed, so it cannot work inside it — and an agent that thinks it is somewhere it is not
produces errors that read like a broken install. CJ closes that session and opens a new one
**in the folder step 1 just reported**.

Then CJ pastes this:

```text
This is my website project folder. Please install the two tools this project needs. Same
rules as before: do the work for me, plain English, stop at the first thing that fails.

1. NODE.JS — version 22
   Check whether it is installed by running: node --version
   If it is missing, or the version does not start with 22, tell me which of these to
   download and then WAIT for me to say I have done it. Do not use Homebrew, winget or any
   other package manager, and do not try to install it yourself:
     - Windows: the Windows Installer (.msi) for version 22 LTS from https://nodejs.org
     - Mac:     the macOS Installer (.pkg) for version 22 LTS from https://nodejs.org

   ⚠️ AFTER I INSTALL IT, THIS SESSION WILL STILL NOT SEE IT. Windows and Mac only read
   the list of available commands when a program starts, so you are still running with the
   old list. Tell me to close Claude Code completely and open it again in this same folder,
   and wait for me to come back. This is normal and it is not a failed install — if you
   skip it you will tell me node is missing when it is sitting right there.

2. THE PROJECT'S OWN PIECES
   In the project folder, run:  npm ci
   Use `npm ci`, NOT `npm install` — `npm install` can rewrite a file called
   package-lock.json, and I would end up sending that change to the website by accident.

   It downloads about 1 GB and takes a few minutes. That is expected.

   If it fails while building something called `better-sqlite3`, do NOT try to fix it and
   do NOT install any build tools or compilers — that is a very large download and it is
   not worth it. Instead run these two, which skip that part:
       npm ci --ignore-scripts
       npx husky install
   Then tell me that is what you had to do, so I can pass it on to Daran.

3. GITHUB CLI
   Check whether it is installed by running: gh --version
   If it is missing, tell me to download the Windows Installer (.msi) from
   https://cli.github.com and WAIT for me. Same as node: after I install it, tell me to
   close Claude Code and open it again in this folder before you check.

   ⚠️ DO NOT RUN `gh auth login` YOURSELF. It asks questions and waits for a browser, and
   you cannot answer it — you will simply hang and I will think the computer has frozen.
   When gh is installed, STOP and tell me to do it myself, using the instructions Daran
   gave me. Then wait for me to say it is done, and check it worked by running:
       gh auth status

Then tell me, in four short lines:

  1. Is node installed, and is it version 22?
  2. Did the project's pieces install? Did you have to use the fallback?
  3. Is the GitHub CLI installed?
  4. Am I signed in to GitHub? (gh auth status)

Do not change any files and do not start any work. When all four are good, say I am ready
and stop there.
```

---

## Step 3 — CJ signs in to GitHub, in a terminal, himself

**An agent cannot do this one.** `gh auth login` is an interactive prompt that ends at a
browser, and an agent driving it just stops responding — which looks exactly like a crash.
This is a human step by nature, not a gap in the prompt.

Send CJ this, in a message rather than as a paste:

> Open a terminal window — on Windows press the Start button, type **PowerShell**, and open
> it. Type this and press Enter:
>
> ```
> gh auth login
> ```
>
> It asks you a few questions. Answer them like this, pressing Enter after each:
>
> - **What account do you want to log into?** → GitHub.com
> - **What is your preferred protocol?** → HTTPS
> - **Authenticate Git with your GitHub credentials?** → Yes
> - **How would you like to authenticate?** → Login with a web browser
>
> It then shows you a short code like `ABCD-1234`. Copy it, press Enter, and your browser
> opens. Paste the code, sign in, and approve. When the terminal says you are logged in, you
> can close the window. You only ever do this once.

Then CJ goes back to the Claude Code session from step 2 and says it is done.

---

## What to expect

|                          |                                                                              |
| ------------------------ | ---------------------------------------------------------------------------- |
| **Time**                 | 20–30 minutes end to end, mostly waiting on downloads                        |
| **CJ types**             | Two pastes, one `gh auth login`, and a few installer clicks                  |
| **CJ installs**          | Git, Node.js 22, GitHub CLI — all plain installers, no package managers      |
| **Sessions**             | Two, plus one terminal window. The second session must start in the project folder |
| **Disk**                 | ~1.2 GB, most of it `node_modules`                                           |
| **A "no" on any line**   | A setup problem — send it to Daran rather than working around it             |

### Why CJ installs a toolchain at all

The original setup installed Git and nothing else, on the reasoning that CJ is not a
developer and should not have to hold a toolchain. That was right about CJ and wrong about
the consequences, and it cost two things:

- **The formatter never ran.** `.husky/pre-commit` runs `prettier` on every commit, but
  husky installs its git hooks from the `prepare` script during `npm install`. No install
  meant no hooks, so a mis-wrapped line left CJ's machine unformatted and failed CI five
  minutes later in a vocabulary CJ cannot act on. PR #47 was two round-trips over one word.
- **The agent could not open a pull request.** Promoting to production is
  `gh pr create --base main --head staging` (see [`handoff.md`](handoff.md) §2). Without the
  GitHub CLI the agent can push but cannot open the PR, so it sent CJ to the GitHub website
  to do it by hand — which is why every promote PR before #48 is titled "Staging", GitHub's
  auto-title, and why they kept failing the Conventional Commits check.

So the toolchain is now installed, and **the CI safety net stays anyway.**
`.github/workflows/autofix.yml` reformats and pushes back on every push to `staging`. That is
not redundant: hooks can be bypassed, a reinstall can lose them, and the next client may not
get this far. Local hooks are the fast path; CI is the guarantee.

⚠️ **The consequence of that workflow is rule 1 in `CLAUDE.md`:** it pushes a commit CJ does
not have, so the clone diverges and the next push is rejected. CJ's agent must pull at the
start of every session.

### What the tools buy CJ

Now that the full install works, CJ's agent can also run `npm run dev` and show him a change
in a browser **before** it reaches staging. Worth mentioning to him — it turns a five-minute
round-trip into a live preview.

**The standing rules are not in these prompts on purpose.** They live in the project's
`CLAUDE.md`, which loads in every session once the project is on the machine. These prompts
run once; the rules apply forever.

## Then the first working session

Paste [`onboarding-prompt-cj.md`](onboarding-prompt-cj.md) — the block inside its ```text
fence. It gives CJ a tour and walks through one small real edit end to end.
