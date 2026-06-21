# Web Edition

Termlnk's web edition (termlnk-web) is a self-hosted server that runs the same features as the desktop app in any modern browser.

## Overview

The web edition shares the same DI container, plugins, and vault as the desktop app, with Electron IPC replaced by HTTP + WebSocket. You get terminals, SSH, SFTP, AI agent, and theming — all from a browser tab.

> **Security note** — termlnk-web holds the vault master key and has full execution power (SSH/SFTP, AI inference, filesystem access). Run it only on a machine you trust.

## Docker Deployment

Prebuilt multi-arch images (amd64 / arm64) are published to GitHub Container Registry.

### Quick Install

```bash
cd apps/web

# Generate a master password, pull the image, start, health-check
./install.sh

# With automatic HTTPS (Caddy + Let's Encrypt)
./install.sh --tls termlnk.example.com
```

### Manual Deploy

```bash
cd apps/web
printf '%s' 'choose-a-strong-passphrase' > master_password.secret
chmod 600 master_password.secret
docker compose up -d
```

### Environment Variables

| Variable | Description | Default |
| :--- | :--- | :--- |
| `MASTER_PASSWORD_FILE` | Path to the master password secret | `master_password.secret` |
| `PORT` | HTTP listening port | `3000` |
| `TLS_DOMAIN` | Domain for auto-HTTPS (optional) | — |

## Features

The web edition supports the same core features as the desktop app:

- Local and SSH terminal sessions
- SFTP file manager
- AI agent with MCP tools
- Themes and extensions
- Session restore

## Differences from Desktop

| Feature | Desktop | Web |
| :--- | :--- | :--- |
| Installation | Native installer | Docker container |
| Window chrome | Native title bar, transparency, blur | Browser tab |
| Dynamic Island (macOS) | Supported | Not available |
| Local file drag-and-drop | System-level | Browser upload/download |
| Offline access | Full offline | Requires network to reach server |
