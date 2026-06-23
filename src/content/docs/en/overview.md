# Termlnk Docs

Termlnk is a smart terminal for developers. It brings local terminals, SSH/SFTP, port forwarding, snippets, AI agents, MCP, and extensions into one workspace.

## Feature Map

| Feature | Use it for |
| :--- | :--- |
| Terminal workspace | Local PTY, SSH sessions, recursive splits, drag resize, and session restore |
| SSH connections | Host trees, auth methods, ProxyJump chains, SOCKS5 proxying, and X11 forwarding |
| SFTP file manager | Transfer, preview, rename, and edit permissions across local and remote panes |
| Port forwarding | Create Local, Remote, and Dynamic forwarding rules over SSH |
| Code snippets | Save reusable scripts, organize them in packages, and run them on target SSH hosts |
| AI Agent | Chat beside your terminal, call MCP tools, and approve command execution |
| Extensions | Extend the app through commands, menus, UI parts, settings, and themes |

## Suggested Path

1. Start with [Quick Start](./quick-start) to install Termlnk, open a terminal, and connect an SSH host.
2. Read [Terminal Workspace](./terminal) and [SSH Connections](./ssh) for the daily workflow model.
3. Read [Port Forwarding](./port-forwarding) when you need access to private services.
4. Read [Code Snippets](./snippets) when you repeat operational scripts.
5. Move to [AI Agent](./ai-agent) and [MCP Tools](./mcp) when you want AI-assisted automation.

## Local-first

Termlnk stores sessions, host configuration, snippets, forwarding rules, and workspace state locally by default. AI requests go only to the provider you configure. The web edition runs on your own self-hosted server.
