# SFTP File Manager

Termlnk includes a built-in SFTP browser for managing files on remote hosts.

## Dual-Pane Browser

The SFTP view opens a dual-pane layout:

- **Left pane** — local filesystem.
- **Right pane** — remote filesystem (connected via the active SSH session).

Navigate directories, preview files, and manage transfers without leaving the app.

## Drag-and-Drop Transfer

Move files between local and remote by dragging them between panes. You can also drag files from your system's file manager into the SFTP view.

Transfers support:

- Single files and folders (recursive)
- Multiple selection
- Overwrite confirmation

## Transfer Queue & History

Active transfers appear in a queue panel at the bottom of the SFTP view. The queue shows:

- File name and path
- Progress and speed
- Status (transferring, queued, completed, failed)

Completed and failed transfers are logged in the transfer history for review.

## Permission Editor

Right-click a file or folder on the remote side to open the permission editor. Set owner, group, and other permissions using either checkboxes or an octal input.

## Batch Operations

Select multiple files to perform bulk actions:

- **Delete** — remove selected files and folders.
- **Download / Upload** — queue all selected items for transfer.
- **Change permissions** — apply the same permission mask to all selected items.

> **Tip** — use `Ctrl+A` / `Cmd+A` to select all items in the current directory.
