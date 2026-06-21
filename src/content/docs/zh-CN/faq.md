# 常见问题

## 支持哪些平台？

| 平台 | 架构 |
| --- | --- |
| macOS | Apple Silicon (ARM64)、Intel (x64) |
| Windows | x64、ARM64 |
| Linux | x64、ARM64 |

安装包在 [GitHub Releases](https://github.com/termlnk/termlnk/releases) 下载。

macOS 构建已签名但未 Notarize，首次启动可能触发 Gatekeeper 提示。Windows 和 Linux 构建未签名。

## 支持哪些 AI 工具？

Termlnk 的内置 AI Agent 支持以下 Provider：

- OpenAI（GPT 系列）
- Anthropic Claude
- Google Gemini
- DeepSeek
- Qwen（通义千问）
- 任何 OpenAI 兼容端点

此外，Termlnk 支持 MCP（Model Context Protocol），可连接本地和远程 MCP 工具服务器。

## 数据会离开我的机器吗？

Termlnk 采用**本地优先**设计：

- 会话数据、终端状态、SSH 配置均存储在本地
- AI 对话内容仅发送到你配置的 Provider API（由你控制）
- 不存在 Termlnk 自有的云端数据收集

## 零配置是怎么做到的？

首次启动后，Termlnk 自动向各工具的配置文件写入 Hook，本地 Bridge 进程处理后续通信。无需手动修改 `.bashrc` 或其他 Shell 配置。

## 占用资源多吗？

空闲时 Termlnk 轻量运行。资源消耗主要取决于：

- 打开的终端面板数量
- SSH 连接数
- AI Agent 是否活跃

日常使用下内存占用与其他 Electron 应用相当。

## 开源许可证是什么？

Termlnk 源码公开，采用 [PolyForm Noncommercial 1.0.0](https://polyformproject.org/licenses/noncommercial/1.0.0/) 许可证。

关键要点：

- **允许** — 个人使用、学习、研究
- **不允许** — 商业用途
- Fork 和衍生作品必须同样开源且非商业，并以相同许可证分发

## 可以商用吗？

当前许可证**不允许商业使用**。如有商业需求，请联系 Termlnk 团队。

## 如何报告 Bug？

1. 前往 [GitHub Issues](https://github.com/termlnk/termlnk/issues)
2. 使用 Bug Report 模板创建 Issue
3. 包含以下信息：
   - 操作系统和版本
   - Termlnk 版本
   - 复现步骤
   - 预期行为与实际行为
   - 相关截图或日志
