# FAQ

## Which platforms are supported?

Termlnk runs on **macOS** (Apple Silicon and Intel), **Windows** (10+), and **Linux** (AppImage). Download the latest installer from [GitHub Releases](https://github.com/termlnk/termlnk/releases).

The web edition runs anywhere Docker does and is accessible from any modern browser.

## What AI providers are supported?

Termlnk works with:

- OpenAI (GPT-4o, o3, o4-mini, etc.)
- Anthropic Claude (Sonnet, Opus, etc.)
- Google Gemini (2.5 Pro, 2.5 Flash, etc.)
- DeepSeek (V3, R1, etc.)
- Qwen
- Any OpenAI-compatible API endpoint

You bring your own API key. Switch providers at any time in settings.

## What AI coding tools does it work with?

Termlnk integrates with external AI coding tools that run in the terminal, including Claude Code, Codex, Gemini CLI, Cursor, OpenCode, Droid, and others. Permission requests from these tools appear inline with Allow / Deny buttons — no context switching needed.

## Does my data leave my machine?

Termlnk is local-first by design. Sessions, terminal state, SSH credentials (stored in an encrypted vault), and approval history stay on your machine. The only outbound traffic is to the AI provider you configure, and only when you use the AI agent feature.

## Is Termlnk open source?

Yes. The source code is publicly available on [GitHub](https://github.com/termlnk/termlnk) under the **PolyForm Noncommercial License 1.0.0**. Commercial use is not permitted. Forks and derivative works must also be open-source, non-commercial, and distributed under the same license.

## Is it resource-heavy?

No. Termlnk is lightweight when idle. The terminal renderer uses GPU acceleration via WebGL, and background services are spun down when not in use.

## How does zero-config work?

On first launch, Termlnk writes integration hooks into each supported AI coding tool's config. A local bridge process handles the communication. No manual setup is required.

## Can I use my existing SSH config?

Termlnk has its own host manager with an encrypted credential vault. You can import hosts manually. The host tree supports folders, proxy jumps, and per-host settings.

## Where do I report bugs or request features?

- [GitHub Issues](https://github.com/termlnk/termlnk/issues) — bug reports and feature requests.
- [GitHub Discussions](https://github.com/termlnk/termlnk/discussions) — questions and ideas.
