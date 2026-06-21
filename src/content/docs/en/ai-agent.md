# AI Agent

Termlnk's built-in AI agent lives alongside your terminal — ask questions, generate commands, and run tools without switching context.

## Multi-Turn Chat

The agent panel supports multi-turn conversations. Context persists within a session, so you can iterate on prompts, ask follow-ups, and refine outputs.

## Supported Providers

Connect to any of the following LLM providers:

| Provider | Models |
| :--- | :--- |
| OpenAI | GPT-4o, GPT-4.1, o3, o4-mini, etc. |
| Anthropic (Claude) | Claude Sonnet, Claude Opus, etc. |
| Google (Gemini) | Gemini 2.5 Pro, Gemini 2.5 Flash, etc. |
| DeepSeek | DeepSeek-V3, DeepSeek-R1, etc. |
| Qwen | Qwen3, etc. |
| OpenAI-compatible | Any endpoint that follows the OpenAI API spec |

Configure your API key and endpoint in **Settings > AI Agent**. You can switch providers per session.

## terminal_run Tool

The agent can execute shell commands through the `terminal_run` tool. Every command requires explicit user approval before execution.

When the agent proposes a command:

1. A permission request appears inline in the chat.
2. Review the command.
3. Click **Allow** to run it, or **Deny** to reject.

The command output is fed back to the agent so it can continue reasoning.

## Permission Modes

Control how much autonomy the agent has:

| Mode | Behavior |
| :--- | :--- |
| **Ask every time** | Every tool call requires manual approval (default) |
| **Allow session** | Approve a tool for the rest of the current session |
| **Allow always** | Persist approval across sessions |

Adjust permission mode in **Settings > AI Agent > Permissions**.

## Skills

Skills are reusable prompt templates or tool bundles that extend the agent's capabilities. Manage skills from the agent panel:

- **Add** — install a skill from the marketplace or create a custom one.
- **Enable / Disable** — toggle skills per session.
- **Configure** — some skills accept parameters (e.g. working directory, language).

Skills are stored locally and travel with your workspace.
