# Runtime Environment Checks

## Project Detection

- Package manager: npm, pnpm, yarn, bun, or none for static HTML.
- Framework/build tool: Vite, Vue CLI, webpack, Next, React scripts, static server, embedded webview, or micro-frontend shell.
- Commands: install, typecheck, lint, test, build, dev, preview, static serve.
- Output directory: `dist`, `build`, `.next`, `out`, or project-specific output.
- Router mode: hash, history, file-based, static entry, or host-controlled route.

## Temporary NPM Registry Fallback

Use this only when npm install/startup is blocked by network access to the default registry, especially in domestic network environments. Prefer command-level registry overrides so the project and user's global npm config remain unchanged.

```bash
npm install --registry=https://registry.npmmirror.com
npm install <package-name> --registry=https://registry.npmmirror.com
```

If the first mirror is unavailable, replace the registry URL with one of these alternatives:

```text
https://npm.aliyun.com/
https://mirrors.cloud.tencent.com/npm/
https://mirrors.ustc.edu.cn/npm/
https://mirrors.tuna.tsinghua.edu.cn/npm/
```

When the project has a trusted lockfile and exact dependency restoration is required, use:

```bash
npm ci --registry=https://registry.npmmirror.com
```

Rules:

- Treat the mirror as a temporary local fallback, not the default project policy. The registry URL may be `https://registry.npmmirror.com` or one of the listed alternatives.
- Do not run `npm config set registry ...`, edit `.npmrc`, or commit registry changes unless the user explicitly asks for a persistent mirror.
- After install succeeds, continue with the normal project commands such as `npm run dev`, `npm run build`, `npm run preview`, or template `npm run dev:auto`.
- If install still fails, record the registry command used, package name, error snippet, and whether the failure is dependency resolution, auth, TLS/proxy, or package-not-found.

## Environment Values

- API/BFF/GraphQL base URL.
- SDK keys, app IDs, tenant IDs, client IDs, feature flags, and mode flags.
- Static asset base URL, CDN path, public path, or local fixture mode.
- Realtime host, polling interval, timeout, and retry values.
- Auth-related runtime values only when the project owns frontend auth config.
- Provider mode flags such as online/offline/demo, mock fallback, proxy-on/off, and feature toggles that change data sources.
- Production readiness values: deployment target, backend/API base URL, route/base path, rollback or restore path, health/readiness or representative backend check, and observability/log access when available.
- Public vs private values: do not commit tokens, secrets, private captured cookies, or personal account data.

Keep environment values in project-native config files or request/client setup, not scattered through business components.
