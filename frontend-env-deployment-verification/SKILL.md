---
name: frontend-env-deployment-verification
description: "Verify frontend environment, data-source configuration, proxy, build, preview, deployment, and URL behavior for Vite, Vue, React, Next, static, embedded, or micro-frontend projects. Use when configuring API/data base URLs, .env files, dev-server proxy, CORS workarounds, SDK/client init values, base paths, hash/history routing, static assets, public paths, build output, preview server, deployment target, or final shareable URL. Data service is optional; verify any runtime provider configuration."
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
## Execution Completeness Gate

Before finalizing work with this skill, verify the following items explicitly:

1. Scope and trigger reliability: confirm the request truly matches this skill. General report-design skills must stay independent of workflow function words such as `原型设计`, `技术方案`, `前端开发`, `后端开发`, or `测试`; workflow-specific skills may use those words only when they are part of the actual phase intent.
2. Input condition handling: classify inputs as complete, partial, missing, conflicting, or runtime-only. Continue with a minimal useful artifact when safe, but mark assumptions, blockers, owners, and confirmation questions instead of inventing source fields, formulas, permissions, URLs, credentials, or business rules.
3. Flow completeness and feasibility: execute the workflow in order, split broad requests into smaller stages, and validate that each stage has the artifacts needed by the next stage before producing final output.
4. Constraint enforcement: apply the hard constraints, reference-loading rules, technology boundaries, security rules, and avoid-lists in this skill and its referenced files.
5. Output completeness: include the core deliverable, key decisions, data/source or evidence trace, missing-information list, self-check result, and next-step handoff details required by the user scenario.
6. Self-check before response: review process completeness, logical feasibility, missing-input coverage, decomposition, constraints, output integrity, generality, and trigger hygiene; repair any gap found before delivering.
