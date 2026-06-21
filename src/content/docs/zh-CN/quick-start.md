# 快速开始

## 下载安装

前往 [GitHub Releases](https://github.com/termlnk/termlnk/releases) 下载适合你平台的安装包：

| 平台 | 架构 |
| --- | --- |
| macOS | Apple Silicon (ARM64)、Intel (x64) |
| Windows | x64、ARM64 |
| Linux | x64、ARM64（AppImage / deb / rpm） |

> **macOS 用户：** 首次打开如遇 Gatekeeper 提示，右键点击应用 → 打开，或在终端执行 `xattr -cr /Applications/Termlnk.app`。

> **Windows 用户：** 如遇 SmartScreen 拦截，点击「更多信息」→「仍要运行」。

## 创建工作区

1. 启动 Termlnk
2. 应用会自动创建默认工作区并打开一个本地终端

## 基本操作

| 操作 | 方式 |
| --- | --- |
| 水平分屏 | 右键终端标签 → 水平拆分 |
| 垂直分屏 | 右键终端标签 → 垂直拆分 |
| 调整面板大小 | 拖拽分隔线 |
| 聚焦放大 | 双击面板标题，或使用快捷键进入 Magnify 模式 |

## 连接 SSH 主机

1. 打开 SSH 面板
2. 点击 **添加主机**
3. 填写主机名、端口、认证方式（密码 / 密钥 / SSH Agent）
4. 保存后双击主机即可连接

## 开始 AI 对话

1. 打开 AI Agent 面板
2. 选择 Provider（OpenAI、Claude、Gemini、DeepSeek、Qwen 等）
3. 填入 API Key
4. 输入消息，开始对话
