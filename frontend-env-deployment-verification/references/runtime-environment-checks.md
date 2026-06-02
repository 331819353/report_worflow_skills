# Runtime Environment Checks

## Project Detection

- Package manager: npm, pnpm, yarn, bun, or none for static HTML.
- Framework/build tool: Vite, Vue CLI, webpack, Next, React scripts, static server, embedded webview, or micro-frontend shell.
- Commands: install, typecheck, lint, test, build, dev, preview, static serve.
- Output directory: `dist`, `build`, `.next`, `out`, or project-specific output.
- Router mode: hash, history, file-based, static entry, or host-controlled route.

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
