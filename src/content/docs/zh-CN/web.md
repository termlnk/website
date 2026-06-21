# Web 版

## 什么是 termlnk-web

termlnk-web 是 Termlnk 桌面版的服务端孪生（Server Twin）。它运行相同的 DI 容器、业务插件和加密保险库，将 Electron IPC 替换为 HTTP + WebSocket，让你可以从任何现代浏览器访问完整的终端、SSH、SFTP、AI Agent 功能。

> **安全提醒：** termlnk-web 拥有与桌面主进程同等的执行权限（SSH/SFTP、AI 推理、本地文件系统访问），请仅在可信的机器上部署。

## Docker 一键部署

预构建的多架构镜像（amd64 / arm64）已发布到 GHCR，无需克隆仓库。

```bash
cd apps/web

# 自动生成主密码 → 拉取镜像 → 启动 → 健康检查
./install.sh
```

启动后打开 `http://127.0.0.1:3000`，使用主密码登录即可。

## Docker Compose 手动部署

```bash
cd apps/web
printf '%s' '你的强密码' > master_password.secret
chmod 600 master_password.secret
docker compose up -d
```

主密码通过 Docker Secret 注入，不会出现在环境变量或 `docker inspect` 输出中。

> **重要：** 请立即备份 `master_password.secret`，丢失后保险库将无法恢复。

## 内置 Caddy 自动 HTTPS

Compose 文件包含一个 Caddy 反向代理服务，支持 Let's Encrypt 自动签发证书：

```bash
TERMLNK_WEB_DOMAIN=termlnk.example.com docker compose --profile tls up -d
# 或
./install.sh --tls termlnk.example.com
```

前提：域名 A/AAAA 记录指向该主机，且 80/443 端口可从公网访问。

## 浏览器访问

termlnk-web 通过 HTTP + WebSocket 提供服务：

- HTTP 端口默认 `3000`
- WebSocket 用于终端会话和实时通信
- 支持反向代理（nginx / Caddy）

## 功能覆盖

Web 版包含桌面版的核心功能：

- 终端工作区（本地 PTY + 递归分屏）
- SSH 连接与主机管理
- SFTP 双栏文件浏览器
- AI Agent 与 MCP
- 主题切换
- 插件系统

## 与桌面版的差异

| 方面 | 桌面版 | Web 版 |
| --- | --- | --- |
| 运行方式 | 本地 Electron 应用 | Docker 容器 + 浏览器 |
| 访问方式 | 直接启动 | 浏览器打开 URL |
| 平台 | macOS / Windows / Linux | 任何支持 Docker 的 Linux 服务器 |
| Dynamic Island | 支持（macOS） | 不适用 |
| 系统集成 | 本地文件拖拽、通知等 | 受浏览器沙箱限制 |
