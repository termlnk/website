# Quick Start

Get Termlnk running in under five minutes.

## Download & Install

Grab the latest installer from [GitHub Releases](https://github.com/termlnk/termlnk/releases).

| Platform | File | Notes |
| :--- | :--- | :--- |
| macOS (Apple Silicon) | `Termlnk-*-mac-arm64.dmg` | M-series Macs |
| macOS (Intel) | `Termlnk-*-mac-x64.dmg` | 2020 and earlier |
| Windows | `Termlnk-*-win-x64-setup.exe` | Windows 10+ |
| Linux | `Termlnk-*-linux-x64.AppImage` | Most distros |

> **macOS first launch** — if Gatekeeper blocks the app, right-click **Termlnk.app** > **Open** > confirm, or run `xattr -cr /Applications/Termlnk.app` in Terminal.

> **Windows SmartScreen** — click "More info" then "Run anyway".

## First Launch

1. Open Termlnk. A default workspace is created automatically.
2. Click **New Terminal** (or press the shortcut) to open a local shell session.

## Split Panes

- **Horizontal split** — drag a tab to the left or right edge of a pane.
- **Vertical split** — drag a tab to the top or bottom edge.
- **Resize** — drag the divider between panes.
- **Magnify** — double-click a pane's title bar to toggle full-size mode.

## Connect to an SSH Host

1. Open the **Hosts** panel in the sidebar.
2. Click **Add Host** and fill in the connection details (hostname, port, username, auth method).
3. Click **Connect** — a new terminal tab opens with the remote session.

See [SSH Connections](./ssh) for advanced options like proxy jump and port forwarding.

## Open AI Chat

1. Open the **AI Agent** panel.
2. Select a provider (OpenAI, Claude, Gemini, DeepSeek, Qwen, or any OpenAI-compatible endpoint).
3. Enter your API key.
4. Start a conversation — the agent can read context from your terminal and run commands with your approval.

See [AI Agent](./ai-agent) for details on permissions, tools, and MCP integration.
