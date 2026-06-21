# Themes & Appearance

Termlnk ships with 71 built-in themes and a live editor for full visual control.

## Built-in Themes

Choose from 56 dark themes and 15 light themes. Switch instantly from **Settings > Themes** or the theme picker in the toolbar.

Popular picks include:

- **One Dark** — Atom's classic dark palette
- **Catppuccin Mocha** — soft pastel dark
- **GitHub Light** — clean and bright
- **Dracula** — bold purples and greens
- **Tokyo Night** — cool blues and soft contrast

## Live Theme Editor

Open the theme editor to adjust any theme in real time. Changes preview instantly in the terminal and UI. When you're happy, save the result as a custom theme.

The editor exposes every color token used by the UI and terminal renderer, organized by category:

- **Base UI** — background, surface, text, border, accent
- **Terminal palette** — ANSI 0-15, foreground, background, cursor, selection
- **Syntax** — comment, keyword, string, type, function, etc.

## Base46 Color System

Termlnk uses the Base46 color system — an extended set of 46 semantic color tokens that drive the entire UI. Each theme defines values for all 46 tokens, ensuring consistent appearance across every component.

Key token groups:

| Group | Tokens | Purpose |
| :--- | :--- | :--- |
| Base backgrounds | `base_00` - `base_04` | Editor, sidebar, panels, borders |
| Accent | `accent`, `accent_fg` | Primary interactive elements |
| Semantic | `info`, `success`, `warning`, `error` | Status indicators |
| Terminal | 16 ANSI colors + fg/bg/cursor/selection | Terminal rendering |

## Customization Options

Beyond colors, you can adjust:

- **Window opacity** — make the window semi-transparent (macOS and Windows).
- **Background blur** — frosted glass effect behind the transparent window.
- **Font family** — set the terminal font (any installed monospace font).
- **Font size and line height** — fine-tune terminal text density.
- **Cursor style** — block, underline, or bar.
