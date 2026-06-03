---
name: frontend-env-deployment-verification
description: "用于验证或配置前端运行环境、数据源地址、代理和部署URL。用户提到环境变量、.env、API base URL、数据源地址、dev-server proxy、CORS、Vite/Vue/React/Next启动、build、preview、静态资源路径、public path、hash/history路由、嵌入页面、微前端、部署地址、访问URL、页面打不开、接口打错环境、最终预览地址时触发。"
---

# Frontend Env Deployment Verification

## Positioning

Use this skill independently when frontend code must run outside the happy path of a local mock. Environment and deployment issues often look like API or UI bugs, so isolate them explicitly.

This skill is not bound to 数据服务. It verifies the runtime configuration for any frontend data provider: REST/BFF API base URLs, GraphQL endpoints, SDK keys, static asset paths, local fixture modes, realtime hosts, and deployment routing.

## Reference Map

- Read `references/runtime-environment-checks.md` to identify project/runtime commands and env conventions.
- Read `references/proxy-routing-assets.md` for data-source URL, proxy, router, and asset path checks.
- Read `references/verification-note-template.md` when producing the environment/deployment note.

## Workflow

1. Identify the project runtime.
   Detect package manager, framework, build tool, router mode, env file convention, dev-server config, preview command, and deployment output directory.

2. Configure data-source runtime values.
   Use environment variables and project-native config for API URLs, SDK keys, GraphQL endpoints, static asset bases, fixture mode, or realtime hosts. Keep local, test, and production values separable.

3. Configure local proxy when needed.
   Use Vite/webpack/dev-server proxy only when local browser CORS blocks direct provider access and the target host is known. Document proxy target and path rewrite behavior.

4. Verify route and asset base path.
   Check `base`, public path, hash/history routing, static asset paths, logo/image/font paths, and deep-link refresh behavior for the intended deployment target.

5. Build and preview.
   Run the project build command, then preview the built output when available. Verify the preview URL, route entry, assets, API base path, and network behavior.

6. Deploy or document blocker.
   If deployment is requested and credentials/target are available, deploy the build output. If blocked, state the missing deployment target, credential, network, or command.

## Required Output

Produce a compact environment/deployment note using `references/verification-note-template.md`.

## Verification Checklist

- Env values are not scattered through business components.
- Local proxy behavior is explicit and does not leak into production build unintentionally.
- Build output succeeds and preview serves the intended route.
- Static assets load under the configured base path.
- Browser network/SDK/file requests use the expected runtime provider configuration.
- Final handoff includes a verified URL or a precise external blocker.
