# Extensions

Termlnk's plugin system follows VS Code-style contribution points, making it easy to extend every part of the app.

## Contribution Points

Extensions can contribute to the following areas:

| Contribution Point | What It Does |
| :--- | :--- |
| **Commands** | Register named actions callable from the command palette or keybindings |
| **Menus** | Add items to context menus, toolbar menus, and the menu bar |
| **UI parts** | Inject React components into sidebar panels, status bar, and other UI slots |
| **Settings** | Declare typed configuration keys with defaults and validation |
| **Themes** | Bundle custom Base46 themes |
| **Keybindings** | Register default keyboard shortcuts for commands |

## Marketplace

Browse and install extensions from the built-in marketplace:

1. Open **Extensions** in the sidebar.
2. Search or browse by category.
3. Click **Install** — the extension activates immediately.

Installed extensions can be updated, disabled, or uninstalled from the same panel.

## Extension Development

Extensions are TypeScript packages that export a standard plugin entry point. The development workflow:

1. Scaffold a new extension with the CLI or by creating a `plugin.ts` entry file.
2. Use the stable TypeScript API to register commands, menus, settings, and UI components.
3. Test locally by loading the extension in development mode.
4. Publish to the marketplace when ready.

### Minimal Example

```typescript
import type { IPlugin } from '@termlnk/extension';

export default class MyPlugin implements IPlugin {
  onActivate() {
    // Register commands, menus, UI parts, etc.
  }

  onDeactivate() {
    // Clean up resources
  }
}
```

> **Tip** — extensions have access to the full DI container. You can inject any service (terminal, SSH, AI agent, etc.) into your plugin.
