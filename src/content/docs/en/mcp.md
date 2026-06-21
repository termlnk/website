# MCP (Model Context Protocol)

Termlnk supports the Model Context Protocol, letting the AI agent call external tool servers directly from chat.

## What is MCP

MCP is an open protocol that standardizes how AI models interact with tools and data sources. Instead of hardcoding integrations, the agent discovers available tools at runtime by connecting to MCP servers.

Each MCP server exposes a set of tools (functions the agent can call) with typed schemas. The agent sees the tool descriptions, decides when to invoke them, and passes the results back into the conversation.

## Connecting Servers

### Local Servers

Local MCP servers run on your machine (typically via `npx`, `uvx`, or a standalone binary). To add one:

1. Open **Settings > MCP**.
2. Click **Add Server**.
3. Choose **Local (stdio)** and enter the command to launch the server.

```json
{
  "name": "filesystem",
  "transport": "stdio",
  "command": "npx",
  "args": ["-y", "@modelcontextprotocol/server-filesystem", "/path/to/dir"]
}
```

### Remote Servers

Remote MCP servers communicate over HTTP (SSE or Streamable HTTP). To connect:

1. Open **Settings > MCP**.
2. Click **Add Server**.
3. Choose **Remote (HTTP)** and enter the server URL.

```json
{
  "name": "my-remote-tools",
  "transport": "sse",
  "url": "https://mcp.example.com/sse"
}
```

## Inspecting and Calling Tools

Once a server is connected, its tools appear in the agent panel under the MCP section. You can:

- **Browse** — see all available tools with their descriptions and parameter schemas.
- **Test** — invoke a tool manually to verify it works.
- **Use in chat** — the agent automatically selects and calls relevant tools during a conversation. Tool calls follow the same approval flow as `terminal_run`.

## Configuration

MCP server configs are stored per workspace. You can also define global servers in **Settings > MCP > Global Servers** so they are available in every workspace.

| Field | Description |
| :--- | :--- |
| `name` | Display name for the server |
| `transport` | `stdio` (local) or `sse` / `streamable-http` (remote) |
| `command` | Launch command (stdio only) |
| `args` | Command arguments (stdio only) |
| `url` | Server URL (remote only) |
| `env` | Environment variables passed to the server process |
