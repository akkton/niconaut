#!/usr/bin/env python3
"""
pre-edit-guard.py  --  an example PreToolUse hook for Claude Code.

What it does: before the agent edits or writes a file, this hook checks the target path
against a small blacklist. If the path is protected (secrets, lockfiles, anything you
list), the edit is blocked and the agent is told why. This is the seatbelt for an agent
that can touch real files.

How to wire it up: copy the `hooks` block from settings.example.json into your
.claude/settings.json. Make this file executable (chmod +x on macOS/Linux).

How hooks work: Claude Code runs the hook before the tool call, passing a JSON payload on
stdin. The hook exits 0 to allow, or exits 2 (with a message on stderr) to block. That is
the whole protocol. Hooks are just scripts; this one happens to be Python.
"""

import json
import sys

# Edit this list for your project. Substrings are matched against the file path.
PROTECTED = [
    ".env",
    ".env.local",
    "secrets",
    "credentials",
    "package-lock.json",
    "pnpm-lock.yaml",
    "yarn.lock",
    ".mcp.json",  # holds API keys once you fill it in
]


def main() -> int:
    try:
        payload = json.load(sys.stdin)
    except Exception:
        # If we cannot read the payload, do not block. Fail open, not closed.
        return 0

    tool_input = payload.get("tool_input", {})
    path = tool_input.get("file_path") or tool_input.get("path") or ""

    for needle in PROTECTED:
        if needle in path:
            print(
                f"Blocked: '{path}' matches the protected pattern '{needle}'. "
                f"Edit it by hand, or remove the pattern from pre-edit-guard.py if this is intentional.",
                file=sys.stderr,
            )
            return 2  # exit code 2 tells Claude Code to block the tool call

    return 0


if __name__ == "__main__":
    sys.exit(main())