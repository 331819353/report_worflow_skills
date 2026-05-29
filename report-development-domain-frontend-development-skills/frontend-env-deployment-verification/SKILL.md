---
name: frontend-env-deployment-verification
description: "Verify frontend environment, proxy, build, preview, deployment, and URL behavior for Vite/Vue/React/static frontend projects. Use when configuring API base URLs, .env files, dev-server proxy, CORS workarounds, base paths, hash/history routing, static assets, public paths, build output, preview server, deployment target, or final shareable URL."
---

# Frontend Env Deployment Verification

## Overview

Use this skill when frontend code must run outside the happy path of a local mock. Environment and deployment issues often look like API or UI bugs, so isolate them explicitly.

This skill is usually called by `$frontend-development-workflow` when configuring local API access, previewing builds, deploying, or returning a URL.

## Workflow

1. Identify the project runtime.
   Detect package manager, framework, build tool, router mode, env file convention, dev-server config, preview command, and deployment output directory.

2. Configure API base URLs.
   Use environment variables and project-native request config. Avoid hard-coding production-only domains in components. Keep test, local, and production values separable.

3. Configure local proxy when needed.
   Use Vite/webpack/dev-server proxy only when local browser CORS blocks direct API access and the backend host is known. Document proxy target and path rewrite behavior.

4. Verify route and asset base path.
   Check `base`, public path, hash/history routing, static asset paths, logo/image/font paths, and deep-link refresh behavior for the intended deployment target.

5. Build and preview.
   Run the project build command, then preview the built output when available. Verify the preview URL, route entry, assets, API base path, and network behavior.

6. Deploy or document blocker.
   If deployment is requested and credentials/target are available, deploy the build output. If blocked, state the missing deployment target, credential, network, or command.

## Required Output

Produce a compact environment/deployment note:

- Package manager and commands:
- Env files/variables:
- API base URL/proxy:
- Router/base path:
- Build output:
- Preview/deploy URL:
- Remaining blocker:

## Verification Checklist

- Env values are not scattered through business components.
- Local proxy behavior is explicit and does not leak into production build unintentionally.
- Build output succeeds and preview serves the intended route.
- Static assets load under the configured base path.
- Browser network requests use the expected API base URL.
- Final handoff includes a verified URL or a precise external blocker.
