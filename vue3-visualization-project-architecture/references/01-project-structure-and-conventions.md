# Project Structure And Conventions

This reference captures the uploaded Vue3 visualization sample's architecture baseline.

## Stack

| Category | Technology |
| --- | --- |
| Framework | Vue3 |
| Build tool | Vite |
| Type system | TypeScript |
| State management | Pinia |
| Routing | Vue Router |
| UI components | Element Plus |
| Charts | ECharts |
| HTTP client | Axios |
| Time handling | Day.js |
| CSS preprocessing | Sass |

## Directory Structure

```text
public/                         static assets not processed by build
src/
  main.ts                       app entry
  App.vue                       root component
  permission.ts                 route permission control
  api/                          API layer
    users/api.ts                user API example
  assets/images/                processed image assets
  components/                   shared reusable components
    ChartRenderer.vue           chart renderer
  router/
    index.ts                    router entry
    modules/manage.ts           module routes
  stores/
    index.ts                    Pinia store entry
    modules/user/index.ts       user store module
  styles/
    element/index.scss          Element Plus theme overrides
  types/                        TypeScript declarations
  utils/
    login.ts                    login utilities
    request.ts                  Axios wrapper
  views/
    404.vue
    index.vue
    no-access.vue
index.html
vite.config.ts
tsconfig.json
tsconfig.node.json
package.json
pnpm-lock.yaml
eslintrc.js
nginx-http.conf
Dockerfile
.env.production
.env.test
.gitignore
README.md
```

## Directory Responsibilities

| Directory | Responsibility |
| --- | --- |
| `src/api/` | Encapsulate API requests and backend interaction. |
| `src/assets/` | Images, fonts, and other assets processed by Vite. |
| `src/components/` | Reusable Vue components such as chart renderers. |
| `src/router/` | Application route configuration and route modules. |
| `src/stores/` | Pinia global state, split by modules. |
| `src/styles/` | Global styles, theme variables, resets, Element Plus overrides. |
| `src/types/` | Shared TypeScript type declarations. |
| `src/utils/` | Request, login, and common utility functions. |
| `src/views/` | Route-level page components. |

## Naming Rules

- Vue component files use PascalCase, such as `PriceChartCom.vue`.
- Utility files use camelCase, such as `chatApi.ts`.
- Style files use kebab-case, such as `ai-message.scss`.
- Type files use `.ts`; type names use an `I` prefix or `Type` suffix when following the sample convention.

## Placement Rules

- Put route-level pages in `src/views`, not `src/components`.
- Put reusable chart/table/filter components in `src/components`.
- Put API request declarations in `src/api/<domain>/api.ts` or an equivalent domain module.
- Put request instance, login helpers, and shared utilities in `src/utils`.
- Put global user/token state in `src/stores/modules/user`.
- Put route modules under `src/router/modules`.
- Put Element Plus theme overrides under `src/styles/element`.
