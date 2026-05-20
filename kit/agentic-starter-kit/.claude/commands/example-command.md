---
description: TEMPLATE. This shows the shape of a slash command. Delete it and write your own.
---

# Example command

A slash command is just a Markdown file in `.claude/commands/`. The filename becomes the
command name (this file is `/example-command`). The frontmatter `description` is what
shows up in the command list. The body is the instruction the agent runs when you invoke it.

Replace everything below with the actual steps you want to repeat. Good candidates for a
command are anything you find yourself typing out more than twice: a checkpoint routine,
a code review pass, a release checklist, a "resume where we left off" loader.

When invoked, do the following:

1. [first step]
2. [second step]
3. [report back in one line]

Keep commands small and single-purpose. Build a few of them rather than one giant one.