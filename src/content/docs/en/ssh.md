# SSH Connections

Termlnk includes a full SSH client with a visual host manager, proxy chains, and port forwarding.

## Host Tree

Hosts are organized in a hierarchical tree in the sidebar. You can create folders to group hosts by project, environment, or team.

Each host entry stores:

- Hostname and port
- Username
- Authentication method
- Proxy settings
- Startup commands

## Authentication Methods

| Method | Description |
| :--- | :--- |
| Password | Prompted on connect or saved in the encrypted vault |
| Private key | RSA, Ed25519, ECDSA — with optional passphrase |
| SSH agent | Delegates to `ssh-agent` or Pageant (Windows) |

> **Tip** — you can set a default key path in settings so new hosts inherit it automatically.

## ProxyJump Chains

Connect through one or more bastion hosts by adding proxy jump entries to a host:

```
Host → Bastion-1 → Bastion-2 → Target
```

Each hop is established sequentially. All supported auth methods work at every hop.

## SOCKS5 Proxy

Route SSH traffic through a SOCKS5 proxy by specifying the proxy address in the host configuration. Useful for reaching hosts behind a corporate firewall.

## X11 Forwarding

Enable X11 forwarding per host to display remote GUI applications on your local machine. Requires an X server running locally (XQuartz on macOS, Xming/VcXsrv on Windows).

## Port Forwarding

Termlnk supports all three SSH forwarding modes. See [Port Forwarding](./port-forwarding) for the dedicated rule manager.

| Type | SSH flag | Use |
| :--- | :--- | :--- |
| Local | `-L` | Forward a local port to a destination reachable from the SSH host |
| Remote | `-R` | Expose a local service from the remote SSH server |
| Dynamic | `-D` | Create a local SOCKS5 proxy through the SSH host |

Forwarding rules reference SSH hosts by ID, so they reuse the host's authentication method, ProxyJump chain, SOCKS5 proxy, and host key verification.

## Startup Snippets

An SSH host can reference a startup snippet. When a new SSH session is created, Termlnk resolves the snippet and runs its content as the startup script. This is useful for changing directories, attaching to tmux, or initializing a remote environment. See [Code Snippets](./snippets).

## Host Key Verification

Termlnk follows the Trust On First Use (TOFU) model. On first connection, the server's host key fingerprint is displayed for verification and then stored locally. Subsequent connections check against the stored key and warn on mismatch.
