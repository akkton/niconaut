# Agentic Starter Kit

A clean, generic version of the wrapper I run around a coding agent. It is not my whole
system. It is the smallest useful seed: one `CLAUDE.md` you can drop into a project, plus
an example of the structure that grows around it.

The whole premise: the model is the same model for everyone. What makes an agent good at
*your* work is the wrapper. This kit is that wrapper, stripped to its bones.

## What is in the zip

```
agentic-starter-kit/
├── CLAUDE.md                       # THE file. The wrapper. This is what you actually use.
├── README.md                       # this guide
├── .claude/
│   ├── settings.example.json       # how hooks + permissions get wired
│   ├── commands/
│   │   └── example-command.md      # the SHAPE of a slash command (a template, build your own)
│   └── hooks/
│       └── pre-edit-guard.py        # a real, useful safety hook: blocks edits to protected paths
└── .mcp.json.example               # the SHAPE of an external-tool connection (no secrets)
```

The one file you act on is `CLAUDE.md`. Everything else shows you what the structure
around it looks like once it grows.

## Install (about ten minutes)

1. **Get an IDE with an agent.** I use VS Code with Claude Code. Install Claude Code and
   sign in. Any editor with an agent integration works.
2. **Open a project folder** (or make an empty one for a new project).
3. **Copy `CLAUDE.md` into the root** of that folder. Copy `.claude/` too if you want the
   examples on hand.
4. **Edit `CLAUDE.md`** so it describes your actual project: what it is, the stack, the
   layout, the rules. Two pages, not ten.
5. **Point the agent at it.** Open the folder in Claude Code and say:
   > Read CLAUDE.md, then propose a scaffold. Ask me what you need before you build.
6. **Critique what it does** for the next half hour. Every correction you give becomes a
   new line in `CLAUDE.md`. That is the entire loop.

### Connecting an external tool (MCP), optional

If you want the agent to talk to something outside the repo (a database, an automation
platform, an analytics tool), that is what MCP is: a toolbox the agent plugs into.

1. Copy `.mcp.json.example` to `.mcp.json` and fill in the real values.
2. **Never commit `.mcp.json`** with real keys. Add it to `.gitignore`.
3. **Fully restart the IDE** (close the whole window, not just the agent panel) so the
   connection loads.
4. Run a small test first ("create one test record and show me the result") before you
   build anything real on top of it.

### Turning on the safety hook, optional

`pre-edit-guard.py` blocks the agent from editing protected files (secrets, lockfiles,
anything you list). Wire it up by copying the `hooks` block from `settings.example.json`
into your `.claude/settings.json`. Hooks are just scripts that run on agent actions. This
one is your seatbelt.

## A little hard-won wisdom

- **The bottleneck is never the model. It is the wrapper.** When my agent is good at
  something, it is because that `CLAUDE.md` got shaped by twenty sessions of getting it
  wrong. Skip the wrapper and you get a contractor with no context: it produces something
  that looks right and is subtly wrong in ways you find out later.
- **Frontload, do not dribble.** Give the agent the whole picture at once. Quality of
  output tracks quality of input, and a long voice-dictated brief beats ten tiny prompts.
- **Push it to do more itself.** Agents hand you tasks they could do themselves. Ask
  "can you do that part yourself?" more often than feels natural. The automation ceiling
  goes up every time you do.
- **You are the sanity checker.** You do not need to know how the model works internally.
  You need to read what it produced and judge it. If you cannot read what it wrote, you do
  not own what it built, and the first time it breaks you will have nothing to debug from.
- **Checkpoint before the context fills.** Letting the window auto-compact silently drops
  detail. A `/checkpoint` that writes a summary and a friction log keeps the thread.
- **Then fix the design, not just the bug.** Every few checkpoints, read the friction and
  ask whether the same class of error keeps recurring because the design is wrong. That is
  what stops the infinite loop of the same mistake.
- **Sync to git constantly.** The wrapper is the asset. Losing the folder is losing months.
- **The honest version of "ship faster with AI":** you spend the time you save building
  the system that lets you trust the speed. It is a fair trade. It is not a free one.

---

Built by Nico Neumann. The longer story, and the posts this kit came from, are at
https://nicolasneumann.blog
