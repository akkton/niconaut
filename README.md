# Nico's blog

Personal blog: daily journal + long-form posts. Built with Astro + MDX, hosted on Cloudflare Pages, authored through Claude Code.

## Stack

- **Astro 6** with **MDX** content collections (`journal` + `posts`)
- **Tailwind v4** via Vite plugin (utility classes available; base typography from `src/styles/global.css`)
- **PostHog** for analytics (set `PUBLIC_POSTHOG_KEY` in env)
- **Cloudflare Pages** for hosting
- **Namecheap** for domain registration; **Cloudflare DNS** managing the zone (nameservers point at Cloudflare)

## Local development

```bash
npm install            # one-time
cp .env.example .env   # then fill in PUBLIC_POSTHOG_KEY
npm run dev            # localhost:4321
npm run build          # static output in dist/
npm run preview        # preview the built site locally
```

## Project layout

```
src/
├── content.config.ts            # collection schemas (journal + posts)
├── content/
│   ├── journal/YYYY-MM-DD.mdx   # daily entries
│   └── posts/<slug>.mdx         # long-form posts
├── components/                  # BaseHead, Header, Footer, FormattedDate
├── layouts/
│   ├── JournalLayout.astro      # date-prominent, tight
│   └── PostLayout.astro         # title-prominent, prose-focused
├── pages/
│   ├── index.astro              # landing: intro + recent journal + recent posts
│   ├── journal/                 # journal index + entry route
│   ├── posts/                   # posts index + post route
│   ├── about.astro
│   └── rss.xml.js               # combined feed
└── styles/global.css            # base typography + Tailwind import
```

## Authoring

See [WRITING.md](./WRITING.md) for the Claude Code authoring workflow.

## Deploy

Cloudflare Pages, auto-deploy on push to `main`. Build command `npm run build`, output directory `dist/`. Custom domain is wired in the Cloudflare Pages project settings.

Live at https://nicolasneumann.blog
