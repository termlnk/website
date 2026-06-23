# Terminal Workspace

Termlnk's terminal workspace combines a fast local PTY with a flexible tiling layout.

## Local PTY Sessions

Each terminal tab spawns a native pseudoterminal using your system's default shell. All standard shells are supported (bash, zsh, fish, PowerShell, etc.).

## Split Layouts

Panes can be split recursively in any direction:

- **Horizontal split** — place panes side by side.
- **Vertical split** — stack panes top to bottom.
- **Nested splits** — split any pane again to build complex grids.

Drag a tab toward the edge of an existing pane to create a new split. The drop zone highlights show you where the pane will land.

## Drag to Resize

Drag the divider between any two panes to adjust their proportions. The layout snaps and persists automatically.

## Magnify Mode

Double-click a pane's title bar (or use the magnify shortcut) to expand it to fill the entire workspace. Double-click again or press `Esc` to return to the tiled layout.

## Shell Integration (OSC 633)

Termlnk supports the OSC 633 shell integration protocol. When enabled, the terminal can:

- Detect command boundaries (prompt start, command start, command end).
- Track the current working directory.
- Highlight the last command's exit status.

Shell integration activates automatically for supported shells.

## Code Snippets

Reusable commands can be saved as [Code Snippets](./snippets). Snippets can be sent to the current terminal session or bound to SSH hosts for targeted execution.

## Rendering

The terminal renderer is built on xterm.js and supports:

| Feature | Details |
| :--- | :--- |
| True color | 24-bit RGB color output |
| Ligatures | Programming font ligatures (Fira Code, JetBrains Mono, etc.) |
| Sixel | Inline image rendering via Sixel protocol |
| Image protocols | iTerm2 / Kitty image protocols |
| Hyperlinks | Clickable OSC 8 links |
| IME | Full CJK input method support |

## Buffer Search

Press `Ctrl+Shift+F` (or `Cmd+Shift+F` on macOS) to open the buffer search bar. Matches are highlighted in-place as you type.

## Session Restore

Terminal sessions are persisted across restarts. When you relaunch Termlnk, your workspace layout, open tabs, and scroll history are restored automatically.
