# MCP（Model Context Protocol）

## 什么是 MCP

MCP（Model Context Protocol）是一个标准协议，允许 AI Agent 连接到工具服务器并调用结构化工具。Termlnk 原生支持 MCP，Agent 可以在对话中直接调用外部工具。

## 连接本地 MCP 服务器

1. 打开设置 → MCP
2. 点击「添加服务器」
3. 填写服务器启动命令和参数
4. 保存后 Termlnk 自动启动并连接该服务器

```json
{
  "command": "npx",
  "args": ["-y", "@modelcontextprotocol/server-filesystem", "/path/to/dir"]
}
```

## 连接远程 MCP 服务器

支持通过 SSE（Server-Sent Events）或 Streamable HTTP 连接远程 MCP 服务器：

1. 打开设置 → MCP
2. 选择远程服务器类型
3. 填写服务器 URL
4. 保存连接

## 查看可用工具

连接成功后，可在 MCP 面板中浏览该服务器提供的所有工具列表，包括：

- 工具名称
- 工具描述
- 参数定义

## 在对话中调用工具

AI Agent 在对话过程中会自动识别可用的 MCP 工具，并在需要时调用。工具调用结果会直接显示在对话中。

## MCP 设置

在设置页中管理所有 MCP 服务器：

- 启用 / 禁用服务器
- 编辑连接配置
- 查看连接状态
- 删除服务器

## 代理设置

如果你的网络环境需要代理才能访问 MCP Registry，可在 MCP 设置中配置代理地址。
