# Port Forwarding

Termlnk includes a dedicated port forwarding panel for creating, starting, and stopping SSH forwarding rules. Rules reuse the same host tree, authentication methods, ProxyJump chains, and host key verification as SSH connections.

![Port forwarding rules](/images/docs/termlnk-port-forwarding-overview.png)

## Forwarding Types

| Type | SSH equivalent | Listener | Destination | Common use |
| :--- | :--- | :--- | :--- | :--- |
| Local | `-L` | Local machine | Service reachable from the SSH relay host | Reach a private database, admin UI, or HTTP service from your laptop |
| Remote | `-R` | Remote SSH server | Service reachable from your local machine | Expose a local development service to a remote environment |
| Dynamic | `-D` | Local SOCKS5 port | Decided by each client request | Create a temporary SOCKS5 proxy over SSH |

## Create a Rule

Open the Port Forwarding sidebar entry, click `+`, then choose Local, Remote, or Dynamic. The form includes the type switcher, a topology diagram, and connection fields.

![Local forwarding form](/images/docs/termlnk-port-forwarding-local-form.png)

Common fields:

- **Label** — the name shown in the rule list.
- **Bind address** — the address where the tunnel listener binds, such as `127.0.0.1` or `0.0.0.0`.
- **Bind port** — the listener port. You can use `0` to let the local system or remote sshd choose an available port; the actual port appears in runtime state.
- **Host** — selected from the SSH host tree. Termlnk reuses that host's auth, ProxyJump, SOCKS5 proxy, and host key settings.
- **Destination address / port** — required for Local and Remote rules. Dynamic rules do not use a fixed destination.

## Local Forwarding

Local forwarding is equivalent to `ssh -L`. Termlnk starts a TCP listener on your local machine. When a local client connects to that port, traffic crosses the SSH host and reaches the destination service.

```text
local client -> local listener -> SSH host -> destination service
```

### When to Use It

- Open a private remote web admin UI in your local browser.
- Connect a local database client to a database reachable only from a relay host.
- Debug HTTP, Redis, MySQL, PostgreSQL, or similar services behind a bastion.

### Fields

| Field | Meaning | Example |
| :--- | :--- | :--- |
| Bind address | Local address to listen on. Use `127.0.0.1` when only this machine should access it | `127.0.0.1` |
| Local port number | Local port used by browsers, database clients, or tools | `8009` |
| Intermediate host | SSH host that carries the tunnel | `prod-relay` |
| Destination address | Address reachable from the SSH host | `example.com` or `10.0.0.12` |
| Destination port number | Destination service port | `80`, `3306`, `5432` |

### Example

```text
Bind address: 127.0.0.1
Local port number: 8009
Intermediate host: prod-relay
Destination address: example.com
Destination port number: 80
```

After starting the rule, open locally:

```text
http://127.0.0.1:8009
```

Traffic path:

```text
127.0.0.1:8009 -> prod-relay -> example.com:80
```

### Notes

- If the port is already in use, the rule fails. Pick another local port or use `0` for automatic allocation.
- The destination address is resolved from the SSH host side, not your local machine.
- Binding to `0.0.0.0` allows other machines on the network to connect to your local listener. Use it only when you intend to share the tunnel.

## Remote Forwarding

Remote forwarding is equivalent to `ssh -R`. Termlnk asks the remote SSH server to listen on a port. When a remote client connects to that port, traffic returns through the SSH tunnel to your local machine, then connects to a destination reachable locally.

```text
remote client -> remote SSH listener -> SSH tunnel -> local machine -> destination service
```

### When to Use It

- Temporarily expose a local development service to a remote server or remote network.
- Let a remote environment call a webhook, debug server, or API mock running locally.
- Give the remote side access to a service visible only from your local network.

### Fields

| Field | Meaning | Example |
| :--- | :--- | :--- |
| Remote host | SSH server that listens on the remote port | `prod-relay` |
| Bind address | Address on the remote SSH server | `127.0.0.1` or `0.0.0.0` |
| Remote port number | Port opened on the remote SSH server | `9000` |
| Destination address | Address reachable from your local machine | `localhost`, `127.0.0.1` |
| Destination port number | Local or locally reachable service port | `3000`, `9001` |

### Example

```text
Remote host: prod-relay
Bind address: 127.0.0.1
Remote port number: 9000
Destination address: localhost
Destination port number: 3000
```

After starting the rule, run on the remote SSH server:

```text
curl http://127.0.0.1:9000
```

Traffic path:

```text
prod-relay:9000 -> SSH tunnel -> local localhost:3000
```

### External Access

If machines other than the remote SSH server should access the remote listener, all of these must be true:

- The rule bind address is `0.0.0.0`.
- The remote server's `sshd_config` permits external remote-forward binds, usually with `GatewayPorts yes` or `GatewayPorts clientspecified`.
- The remote firewall, security group, or cloud network policy allows the port.

### Notes

- Remote port conflicts happen on the remote SSH server, not locally.
- The destination address is resolved from your local machine. `localhost:3000` means the machine running Termlnk.
- Binding to `0.0.0.0` increases exposure. Prefer temporary use and stop the rule when finished.

## Dynamic Forwarding

Dynamic forwarding is equivalent to `ssh -D`. Termlnk starts a local SOCKS5 proxy. Applications send requests to that proxy, and each request decides its own target address through the SSH host.

```text
local app -> local SOCKS5 proxy -> SSH host -> requested destination
```

### When to Use It

- Route a browser through an SSH host to access a remote network.
- Let package managers, API clients, or command-line tools use an SSH-backed proxy.
- Avoid creating one Local rule per target service when a single SOCKS5 endpoint is enough.

### Fields

| Field | Meaning | Example |
| :--- | :--- | :--- |
| Bind address | Local SOCKS5 listener address | `127.0.0.1` |
| Local port number | SOCKS5 proxy port | `8981` |
| Intermediate host | SSH host that connects to requested destinations | `prod-relay` |

Dynamic rules do not have a destination address or port because each SOCKS5 request supplies its own target. The current implementation supports SOCKS5 `CONNECT` requests with IPv4, domain, and IPv6 targets.

### Example

```text
Bind address: 127.0.0.1
Local port number: 8981
Intermediate host: prod-relay
```

After starting the rule, use:

```text
socks5://127.0.0.1:8981
```

Command-line example:

```bash
curl --socks5-hostname 127.0.0.1:8981 https://example.com
```

### Notes

- Use `socks5h` or `--socks5-hostname` when you want DNS resolution to happen through the proxy side.
- Dynamic forwarding is not an HTTP proxy; the client application must support SOCKS5.
- Binding to `0.0.0.0` may let other machines use the proxy. Check network boundaries and access control first.

## Start and Stop

Creating a rule does not make it run forever. Use the play button in the list to start a rule and the stop button to close a running tunnel.

Runtime state includes:

- `Idle` / `Starting` / `Authenticating` / `Active` / `Failed` / `Stopping` / `Closed`
- Active connection count
- Total connection count
- Total inbound / outbound traffic
- Current inbound / outbound rates

If startup requires keyboard-interactive authentication, password change, or host key confirmation, Termlnk shows the matching authentication dialog. First connections still follow TOFU (Trust On First Use) host key verification.

## Relationship to SSH Hosts

Forwarding rules reference an SSH host by `hostId` instead of storing separate login details. That means:

- Password, private key, SSH Agent, ProxyJump, and SOCKS5 proxy changes are reused by forwarding rules.
- Deleting or changing a host can affect rules that reference it.
- Multiple rules for the same host can share the underlying SSH socket, reducing duplicate connection overhead.

## Examples

### Reach a private remote service locally

```text
127.0.0.1:8009 -> www.termlnk.com:80
```

Open `http://127.0.0.1:8009`; traffic crosses the SSH relay and reaches the target HTTP service.

### Expose a local development service remotely

```text
0.0.0.0:9000 -> localhost:9001
```

The remote SSH server listens on `9000`; traffic to that port returns to your local `localhost:9001`.

### Create a SOCKS5 proxy

```text
socks5://127.0.0.1:8981
```

Point a browser, package manager, or debugging tool at that proxy to route traffic through the SSH host.
