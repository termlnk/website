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

Termlnk supports all three SSH forwarding modes:

### Local Forwarding (-L)

Forward a local port to a remote destination through the SSH tunnel.

```
Local 8080 → remote-db:3306
```

### Remote Forwarding (-R)

Expose a local service on the remote host.

```
Remote 9090 → localhost:3000
```

### Dynamic Forwarding (-D)

Create a SOCKS proxy on a local port that tunnels all traffic through the SSH connection.

```
SOCKS on localhost:1080
```

Port forwarding rules are configured per host and start automatically on connect.

## Host Key Verification

Termlnk follows the Trust On First Use (TOFU) model. On first connection, the server's host key fingerprint is displayed for verification and then stored locally. Subsequent connections check against the stored key and warn on mismatch.
