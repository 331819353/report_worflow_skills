# Template Routing

Use this file only when choosing which bundled template asset to copy or adjust.

## Asset Paths

Template assets live under:

`report-prototype-template-management/assets/templates/<template-id>/`

Copy the selected asset directory into the target project, or merge its `src/`, `public/`, scripts, and config files into an existing Vue 3 + Vite app.

## Default Operation Logic

Default to `pageShellPath: template`.

Choose `pageShellPath: custom` only when:

- the user explicitly says 自行设计开发, 自由设计, 自定义开发, custom development, or equivalent; or
- the user provides a screenshot/HTML/source/sample and explicitly asks for 百分百复刻, 像素级复刻, exact restoration, or equivalent; or
- a documented requirement cannot be met by any bundled template.

When the user provides a sample but does not demand exact restoration, treat the sample as evidence for information hierarchy, density, and visual tone. Still choose the closest bundled template by scenario.

## Routing Matrix

Only `frozen-title-sci-fi-cockpit-template` is fixed to a full 1920*1080 screen. All other bundled templates are scrollable `8 * N` report grids with a business overview/cockpit atmosphere, not fixed big-screen frames.

| Asset | Use When | Avoid When |
| --- | --- | --- |
| `topbar-dark-scroll-dashboard-template` | One compact report theme, top bar only, dark Haier-branded shell, one scrollable `8 * N` content grid, overview/diagnosis cockpit feel without fixed big-screen constraints. | Multi-chapter suite, persistent side navigation, dense workbench, light office-reading scenario, or fixed exhibition cockpit is needed. |
| `topbar-light-scroll-dashboard-template` | One compact report theme, top bar only, light enterprise shell, one scrollable `8 * N` content grid, daily office reports, readable analysis, and business handoff pages without fixed big-screen constraints. | Multi-chapter suite, persistent side navigation, dark command/cockpit atmosphere, or fixed big-screen display is needed. |
| `left-nav-analytics-workbench-template` | Multi-page report suite, complex analysis, dense tables, repeated filtering, enterprise workbench, status/diagnosis/detail/action chapters; each nav page uses a scrollable `8 * N` content grid. | The page is a compact one-theme dashboard or a large-screen command center. |
| `frozen-title-sci-fi-cockpit-template` | Fixed 1920*1080 exhibition screen, monitoring wall, command center, leadership cockpit, frozen title/background visual assets. | Daily office analytics, long text, frequent editing, dense forms, table-heavy workbench, or scrollable report reading. |

## Selection Priority

0. Hard intent: 自行设计开发 / 自由设计 routes to `custom/freeDesign`; 百分百复刻 routes to `custom/htmlReplica`.
1. Existing project shell: if the user explicitly says to keep an existing shell, implement the selected template contract inside that shell where possible.
2. Display scenario: fixed big-screen/presentation/command-center use `frozen-title-sci-fi-cockpit-template`.
3. Navigation depth and content volume: multiple chapters/views, dense repeated work, or daily workbench use `left-nav-analytics-workbench-template`.
4. Focused one-topic report uses a topbar scroll template.
5. Choose `topbar-light-scroll-dashboard-template` for ordinary office analysis, long reading, detail/query, and handoff clarity.
6. Choose `topbar-dark-scroll-dashboard-template` for overview, executive/diagnostic dashboards, stronger status atmosphere, or dark Haier-branded cockpit feel that still needs scrolling.
7. Analysis/diagnostic reports default to a topbar scroll template unless the user requests sidebar, multi-page, workbench, big screen, or fixed 1920*1080 cockpit.

Do not switch to a custom shell merely because the user omitted page style or provided a loose reference. Custom shell requires explicit custom-development intent, explicit exact-restoration intent, or a documented template limitation.
