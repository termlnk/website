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

## 创建端口转发

1. 打开侧边栏的端口转发面板
2. 点击「+」，选择本地、远程或动态转发
3. 选择 SSH 主机并填写监听地址、端口和目标地址
4. 保存后点击规则右侧的启动按钮

## 保存常用代码片段

1. 打开侧边栏的代码片段面板
2. 新建分组或新建片段
3. 填写名称、脚本内容和执行目标
4. 在片段上右键选择执行、编辑、复制或删除

## 开始 AI 对话

1. 打开 AI Agent 面板
2. 选择 Provider（OpenAI、Claude、Gemini、DeepSeek、Qwen 等）
3. 填入 API Key
4. 输入消息，开始对话
