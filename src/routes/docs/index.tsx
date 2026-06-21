import { createFileRoute } from '@tanstack/react-router';
import { DocPage } from '@/layouts/docs/doc-page';
import { useDocContent } from '@/lib/doc-loader';

export const Route = createFileRoute('/docs/')({
  component: DocsIndexPage,
});

const FALLBACK_OVERVIEW = `
# Welcome to Termlnk Docs

Termlnk is a modern, extensible smart terminal for developers. It brings SSH, SFTP, AI agents, themes, and plugins into one unified workspace.

## Getting Started

Download Termlnk for your platform and launch it. The terminal workspace opens immediately — no extra configuration needed.

## What You'll Find Here

- **Quick Start** — Install and run your first session in minutes
- **Features** — Deep dives into Terminal, SSH, SFTP, AI Agent, and MCP tooling
- **Customization** — Themes, extensions, and keybindings
- **Web** — Using Termlnk in the browser
- **FAQ** — Common questions answered

## Core Concepts

### Terminal Workspace

Recursive splits, drag-to-resize, and pane magnification let you tile your workspace however you like.

### SSH & SFTP

A tree-based host manager with dual-pane file transfer makes remote server management seamless.

### AI Agent

Chat with Claude, GPT, Gemini, DeepSeek, and more — right next to your terminal. Permission requests expand in-place so you never lose context.

### MCP Tooling

Connect tool servers and let AI agents call them directly from chat. Zero-config hooks wire everything up automatically.
`;

function DocsIndexPage() {
  const loaded = useDocContent('overview');
  const content = loaded || FALLBACK_OVERVIEW;

  return <DocPage content={content} />;
}
