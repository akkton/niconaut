# How this blog gets written

The whole point of this stack is that **publishing runs through Claude Code**. No raw markdown editing, no admin panel, no Notion sync. You talk to the agent, it writes the file, it commits and pushes, Cloudflare rebuilds. Live in ~60 seconds.

## The daily journal flow

Open Claude Code in this directory and say something like:

> *Draft today's journal. Worked 5h on the OneProposal live-mode flip. Wins: caching is finally hitting on cold paths. Losses: hit a Workers cold-start issue that cost an hour. Lesson: pre-warm the worker before the first user hits it. Tags: oneproposal, infra.*

The agent will:

1. Create `src/content/journal/YYYY-MM-DD.mdx` with proper frontmatter (`date`, `hoursWorked`, `summary`, `tags`).
2. Write the body in your voice (the agent reads prior entries to match tone).
3. Show you the draft for a review pass.
4. After approval: `git add`, `git commit`, `git push`.
5. Cloudflare Pages rebuilds and deploys in ~30s.

**Frontmatter required for journal entries:**
- `date` — ISO date (`YYYY-MM-DD`)
- `summary` — one-line summary shown on the index + RSS
- `hoursWorked` — optional number
- `tags` — optional string array
- `draft` — optional boolean; `true` hides from build

## Long-form posts

Same flow, different folder: `src/content/posts/<slug>.mdx`.

**Frontmatter for posts:**
- `title`, `description`, `pubDate` — required
- `updatedDate`, `heroImage`, `tags`, `draft` — optional

Posts typically take multiple sessions: draft → revise → finalize. Use `draft: true` to keep them out of the build while iterating.

## Adding interactive widgets, charts, or videos

MDX lets you import any Astro/React/Svelte/Vue component directly inside a post. The pattern:

```mdx
---
title: My post
pubDate: 2026-06-01
description: ...
---

import HoursChart from '../../components/HoursChart.astro';

This week I worked the following hours:

<HoursChart data={[...]} />

(prose continues)
```

Drop new components into `src/components/`. They are available everywhere automatically.

## Images

Two patterns:

1. **Hero image (typed, optimized)**: put the file in `src/assets/`, reference it in frontmatter as `heroImage: ../../assets/my-image.jpg`. Astro+Sharp resize and optimize on build.
2. **In-body image**: drop into `public/images/` and reference as `/images/file.jpg`. No optimization but the simplest path.

## Common chores

- Change the site title/tagline → `src/consts.ts`
- Add a nav link → `src/components/Header.astro`
- Tweak base typography or color → `src/styles/global.css`
- Add a new content collection → `src/content.config.ts` + create the folder + create routes

## What is *not* the workflow

- **Do not** hand-edit MDX in a different editor while Claude Code has the project open — the agent expects to control the commit cadence.
- **Do not** publish without a review pass. Even when the draft is good, read it once.
- **Do not** put secrets in `PUBLIC_` env vars — those ship to the browser.
