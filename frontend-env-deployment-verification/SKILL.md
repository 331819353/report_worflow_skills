---
name: frontend-env-deployment-verification
description: "用于验证或配置前端运行环境、数据源地址、代理、构建和部署URL。用户提到环境变量、.env、API base URL、数据源地址、dev-server proxy、CORS、Vite/Vue/React/Next启动、build、preview、静态资源路径、public path、hash/history路由、嵌入页面、微前端、部署地址、页面打不开、接口打错环境时触发；不负责业务数据适配。"
---

# Frontend Env Deployment Verification

## Positioning

Use this skill independently when frontend code must run outside the happy path of a local mock. Environment and deployment issues often look like API or UI bugs, so isolate them explicitly.

This skill is not bound to 数据服务. It verifies the runtime configuration for any frontend data provider: REST/BFF API base URLs, GraphQL endpoints, SDK keys, static asset paths, local fixture modes, realtime hosts, and deployment routing.

## Reference Map

- Read `references/runtime-environment-checks.md` to identify project/runtime commands and env conventions.
- Read `references/proxy-routing-assets.md` for data-source URL, proxy, router, and asset path checks.
- Read `references/verification-note-template.md` when producing the environment/deployment note.
- Read `$environment-profile-contract` when test/production runtime profile separation, release readiness, or environment acceptance is in scope.
- Read `$quality-gate-validation` when environment findings affect cross-stage readiness.

## Workflow

1. Identify the project runtime.
   Detect package manager, framework, build tool, router mode, env file convention, dev-server config, preview command, and deployment output directory.

2. Resolve dependency-install network issues when needed.
   If domestic network access blocks npm dependency installation or a one-off package add, use a command-level temporary mirror instead of changing global npm config: `npm install --registry=https://registry.npmmirror.com` for project dependencies, or `npm install <package-name> --registry=https://registry.npmmirror.com` for one package. If that mirror is unavailable, replace the registry URL with `https://npm.aliyun.com/`, `https://mirrors.cloud.tencent.com/npm/`, `https://mirrors.ustc.edu.cn/npm/`, or `https://mirrors.tuna.tsinghua.edu.cn/npm/`. Prefer `npm ci --registry=<registry-url>` when the project has a trusted lockfile and exact install is required. Record that the mirror was a temporary local fallback.

3. Configure data-source runtime values.
   Use environment variables and project-native config for API URLs, SDK keys, GraphQL endpoints, static asset bases, fixture mode, or realtime hosts. Keep local, test, and production values separable.

4. Configure local proxy when direct provider access is blocked.
   Use Vite/webpack/dev-server proxy only when local browser CORS blocks direct provider access and the target host is known. Document proxy target and path rewrite behavior.

5. Verify route and asset base path.
   Check `base`, public path, hash/history routing, static asset paths, logo/image/font paths, and deep-link refresh behavior for the intended deployment target.

6. Build and preview.
   Run the project build command, then preview the built output when available. Verify the preview URL, route entry, assets, API base path, and network behavior.

7. Deploy or document blocker.
   If deployment is requested and credentials/target are available, deploy the build output. If blocked, state the missing deployment target, credential, network, or command.

## Required Output

Produce a compact environment/deployment note using `references/verification-note-template.md`.

## Verification Checklist

- Env values are not scattered through business components.
- Temporary npm registry fallback is command-scoped and recorded when used; no global `.npmrc` or persistent registry change is introduced without explicit approval.
- Local proxy behavior is explicit and does not leak into production build unintentionally.
- Build output succeeds and preview serves the intended route.
- Static assets load under the configured base path.
- Browser network/SDK/file requests use the expected runtime provider configuration.
- Final handoff includes a verified URL or a precise external blocker.
