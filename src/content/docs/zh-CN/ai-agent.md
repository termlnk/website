# AI Agent

Termlnk 内置 AI Agent，与终端工作区并排运行，支持多轮对话和工具调用。

## 多轮对话

AI 面板支持完整的多轮对话体验：

- Markdown 渲染（标题、列表、表格、引用）
- 代码块语法高亮
- 重试上一条回复
- 编辑已发送的消息

## 支持的 Provider

| Provider | 说明 |
| --- | --- |
| OpenAI | GPT 系列模型 |
| Claude | Anthropic Claude 系列 |
| Gemini | Google Gemini 系列 |
| DeepSeek | DeepSeek 系列 |
| Qwen | 通义千问系列 |
| OpenAI 兼容 | 任何兼容 OpenAI API 格式的端点 |

## 配置 Provider

1. 打开设置 → AI Provider
2. 选择 Provider 类型
3. 填入 API Key
4. （可选）自定义 API 端点地址

> **提示：** 使用 OpenAI 兼容模式可接入任何遵循 OpenAI API 格式的服务，包括本地部署的模型。

## terminal_run 工具

AI Agent 可以通过 `terminal_run` 工具在终端中执行命令，但执行前**必须经过用户审批**：

1. Agent 提议执行一条命令
2. 命令和目标终端展示给用户
3. 用户选择「允许」或「拒绝」
4. 获批后命令在指定终端中执行，输出自动回传给 Agent

## 权限模式

可为 AI Agent 配置不同的权限级别，控制其可执行的操作范围。

## Skills 管理

- 发现并安装 Skills
- 按会话启用 / 禁用不同的 Skill
- 每个 Skill 为 Agent 提供特定领域的知识或能力

## 会话持久化

AI 对话会话在应用重启后自动恢复，包括完整的消息历史和上下文。
