# Project

> This file is the wrapper. It is the single most important file in the repo. The
> model is the same model everyone else has. This file is what makes the agent good
> at *your* work. Keep it to about two pages. Grow it every session.

What this is: [one sentence describing the project]
Why it exists: [one sentence on the problem it solves]
What done looks like: [one sentence per milestone]

## Stack

Language: [e.g. TypeScript / Python / Go]
Frameworks: [e.g. Astro, FastAPI, Hono]
Hosting: [e.g. Cloudflare Pages, Railway, Vercel]
External services: [e.g. Stripe, Supabase, Sentry, n8n]

## Layout

Sketch the folder structure so the agent does not have to guess where things go.

```
src/                # application code
docs/sessions/      # one short log per working session
.claude/
  commands/         # your slash commands (/checkpoint, /review, ...)
  hooks/            # scripts that run automatically on agent actions
  settings.json     # wires hooks + permissions
.mcp.json           # connections to external tools (never commit secrets)
CLAUDE.md           # this file
```

## Session start

At the start of a session: read this file, then skim `docs/sessions/` for the most
recent log so you know where we left off. State in one line what we are picking up.

## How I work with the agent

- **Exhaust the obvious before asking.** Read the file, run the command, check the
  docs, look at how a similar thing is already done. Ask me only after those run dry.
- **Frontload context.** Give me the whole picture in one go. I would rather paste a
  long brief than feed you the problem one sentence at a time.
- **Iteration limit: two.** If the same fix fails twice, stop and explain what is
  actually happening. Do not try a third variation of the same idea.
- **Report changes.** When you edit, tell me which files changed and why.
- **One-line summaries.** When a task is done, summarize it in a sentence.
- **I am the sanity checker and direction giver.** You do the work; I verify it and
  point it. Think of me as the orchestrator, not the typist.

## House rules

- Never run destructive commands (delete, force-push, drop a table) without confirming.
- Never edit secrets, env files, or lockfiles. The pre-edit guard hook enforces this.
- Reuse existing patterns. If the codebase already does a thing a certain way, match it
  instead of inventing a new way.
- No emojis in code or commits. No em-dashes in prose. Match the voice of existing files.
- "It compiled" is not "it works." Verify the actual behavior before you call it done.

## Memory across sessions

Decisions that should survive a fresh session do not live in the chat. They live here,
or in `docs/sessions/`. If we decide something important, write it down so the next
session does not relitigate it.

## The loop

1. Work a task with the agent.
2. Run `/checkpoint` when the conversation gets long: it logs a summary and a list of
   friction points, so a fresh session loses nothing. This beats letting the context
   auto-compact, which silently drops detail.
3. Every few checkpoints, run `/system-dev`: it reads the accumulated friction, fixes
   the concrete errors, then steps back and asks whether the same class of error keeps
   happening because the design is wrong. Fixing the design is what ends the loop of
   the same bug returning.
4. Commit and push often. This file plus the code plus your understanding of both is
   the whole asset. Do not lose it.

## Definition of done

A change is done when: it builds, the behavior is verified (not just the compile),
the relevant files are committed, and you have told me in one line what shipped.

---

This file is a seed. It is meant to grow. Every time the agent does something you did
not want, add a rule. Every time it does something you want to keep, write it down.
