# Code Snippets

Snippets save reusable commands or scripts and organize them in packages. A snippet can target multiple SSH hosts; when you run it, Termlnk creates an SSH session for each target and executes the script.

![Snippets tree](/images/docs/termlnk-snippets-tree.png)

## Snippet Tree

Open snippets from the `{}` sidebar entry. The two header buttons create a package or a snippet.

The tree supports:

- Organizing snippets into packages.
- Expanding and collapsing packages, with expanded state persisted.
- Dragging snippets or packages to reorder them.
- Right-clicking snippets to run, edit, duplicate, or delete.
- Right-clicking packages to rename or delete them.

## Create or Edit a Snippet

The snippet dialog contains label, description, package, script, and execution targets.

![Snippet editor](/images/docs/termlnk-snippet-edit-form.png)

| Field | Description |
| :--- | :--- |
| Label | Required name shown in the tree |
| Description | Optional note about what the snippet does |
| Package | Parent package; empty means the root |
| Script | Command content to paste or run, up to 65536 characters |
| Targets for Execution | One or more SSH hosts from the host tree |

## Run and Paste

The snippet context menu exposes run and paste-oriented actions.

- **Run** — enabled when the snippet has execution targets. Termlnk creates an SSH session for each target host, waits for the session to become ready, then runs the script.
- **Paste / run into a session** — backed by `snippet.paste(sessionId, content)` and `snippet.run(sessionId, content)`, which send snippet content to a specific terminal session.

When running against multiple targets, make the script idempotent or explicitly handle repeated execution, retries, and privilege escalation.

## SSH Startup Snippets

SSH host configuration supports `startupSnippetId`. When a host has a startup snippet, new SSH sessions resolve that snippet and run its content as the startup script.

Good uses include:

- Changing to a project directory after login.
- Attaching to a tmux or screen session.
- Initializing remote environment variables.
- Running fixed diagnostic commands.

If a host has both an older inline startup script and `startupSnippetId`, the startup snippet takes precedence.

## Sync

Snippet data includes label, content, description, package, target host IDs, sort order, and favorite state. Snippets can sync alongside hosts and settings; when remote changes arrive, the snippet tree refreshes automatically.

## Tips

- Use clear names for production scripts, such as `restart api service` or `tail nginx errors`.
- Keep dangerous actions small and reviewable instead of mixing deploy, delete, and restart logic in one snippet.
- Configure explicit execution targets for snippets that are meant for remote hosts.
- Add comments to scripts that change system state, especially when they require preconditions.
