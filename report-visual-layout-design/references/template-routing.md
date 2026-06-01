# Template Routing

Use this file only when choosing which bundled template asset to copy or adjust.

## Asset Paths

Template assets live under:

`report-visual-layout-design/assets/templates/<template-id>/`

The old standalone template skill folders are intentionally not used. Copy the selected asset directory into the target project, or merge its `src/`, `public/`, scripts, and config files into an existing Vue 3 + Vite app.

## Routing Matrix

| Asset | Use When | Avoid When |
| --- | --- | --- |
| `single-page-dashboard-template` | One compact report theme, top bar only, one scrollable `8 * N` content grid. | Multi-chapter suite, persistent side navigation, dense workbench, or fixed cockpit is needed. |
| `left-nav-analytics-dashboard-template` | Multi-page report suite, complex analysis, dense tables, repeated filtering, enterprise workbench. | The page is a compact one-theme dashboard or a large-screen command center. |
| `sci-fi-dashboard-template` | 1920*1080 exhibition screen, monitoring wall, command center, leadership cockpit. | Daily office analytics, long text, frequent editing, dense forms, or table-heavy workbench. |

## Selection Priority

0. Style source: when the user has not specified a page style and has not provided HTML/source/sample styling, use a bundled template by default.
1. User-stated shell, provided sample/source style, or existing project frame.
2. Display scenario: big-screen/presentation uses `sci-fi-dashboard-template`.
3. Content volume: multiple chapters/views or dense repeated work uses `left-nav-analytics-dashboard-template`.
4. Focused one-topic report uses `single-page-dashboard-template`.
5. Analysis/diagnostic reports default to `single-page-dashboard-template` unless the user requests sidebar, multi-page, workbench, big screen, or fixed 1920*1080 cockpit.

Do not switch to a custom shell merely because the user omitted page style. Custom shell requires explicit user style direction, a provided sample/HTML/source style, or a documented template limitation.
