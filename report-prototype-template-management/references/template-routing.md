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
| `left-nav-analytics-workbench-template` | Multi-page report suite, complex analysis, dense tables, repeated filtering, enterprise workbench, status/diagnosis/detail/action chapters; each nav page uses a scrollable `8 * N` content grid. | The page is a compact one-theme dashboard, only one homepage can be populated, or a large-screen command center. |
| `frozen-title-sci-fi-cockpit-template` | Fixed 1920*1080 exhibition screen, monitoring wall, command center, leadership cockpit, frozen title/background visual assets; nav drawer pages must all be substantial when retained. | Daily office analytics, long text, frequent editing, dense forms, table-heavy workbench, scrollable report reading, or only one cockpit page can be populated. |

## Display Theme Hints

When a report prototype workflow supplies `displayTheme` and selected pattern cards, use them as routing evidence. Do not choose a template from display theme alone.

| Display theme | Useful template tendency | Check before choosing |
| --- | --- | --- |
| `detail-table` | `topbar-light-scroll-dashboard-template` for one focused list/detail page; `left-nav-analytics-workbench-template` for multi-page ledgers or dense workbench suites. | Server-side table patterns, detail drawer/page, export, field permission, and table viewport needs. |
| `summary-stat` | `topbar-light-scroll-dashboard-template` for compact office summary; `left-nav-analytics-workbench-template` for multi-chapter summaries or pivot-heavy analysis. | Aggregation/matrix density, drilldown path, and whether AntV S2 is needed. |
| `business-dashboard` | Topbar light/dark for one-story dashboard; dark when status/cockpit atmosphere helps; fixed sci-fi only for explicit big-screen/presentation. | First-screen answer, global context, number of KPI/chart/list modules, and refresh context. |
| `exploratory-analysis` | Topbar for focused analysis; `left-nav-analytics-workbench-template` for saved views, repeated filtering, and multiple analysis chapters. | Dynamic dimension/metric controls, linked detail table, interaction density, and multiple substantial pages. |
| `management-report` | Topbar light for interactive report; left-nav for long chaptered suite; custom only for exact paginated/print restoration. | Conclusion/evidence structure, export/print, version/sign-off, and chapter count. |
| `monitoring-alert` | `frozen-title-sci-fi-cockpit-template` for monitoring wall; topbar dark for scrollable operational monitor; left-nav for multi-environment workbench. | Fixed-screen requirement, refresh cadence, alert list density, runbook/root-cause paths, and whether retained nav pages are substantial. |

## Report Decision Routing Guard

Before choosing a template for a report surface, verify the template can carry the report decision anti-AI requirements from `$report-design-system-governance` `references/09-report-decision-anti-ai-gate.md`.

- Do not choose a template because it visually resembles a dashboard. Choose it because it can express the metric tree, diagnostic path, detail/action areas, trust metadata, realistic data states, and required interaction density.
- `topbar-light-scroll-dashboard-template` is the default for office decision reports that need readability, tables, detail drawers, and handoff clarity.
- `topbar-dark-scroll-dashboard-template` is acceptable for status/diagnosis atmosphere only when numeric readability, detail/action paths, and trust metadata remain clear.
- `left-nav-analytics-workbench-template` is preferred when the decision path naturally splits into multiple substantial chapters such as overview, diagnosis, detail, action, and audit.
- `frozen-title-sci-fi-cockpit-template` is for fixed monitoring or command screens; it must still expose alert cause, runbook/action, refresh/freshness, and drilldown paths. Do not use it for ordinary office reports only to create "科技感".
- If a report-designer/editor page is requested, route by data-binding workflow needs, not by the three-panel shell appearance. The chosen shell must support data source, field binding, aggregation, filters, validation, preview, version, and publish flow.
- If the chosen template cannot support the required decision path without fighting its shell, document a real template limitation before routing to custom.

## Selection Priority

0. Hard intent: 自行设计开发 / 自由设计 routes to `custom/freeDesign`; 百分百复刻 routes to `custom/htmlReplica`.
1. Existing project shell: if the user explicitly says to keep an existing shell, implement the selected template contract inside that shell where possible.
2. Display scenario: fixed big-screen/presentation/command-center use `frozen-title-sci-fi-cockpit-template`.
3. Navigation depth and content volume: multiple chapters/views, dense repeated work, or daily workbench use `left-nav-analytics-workbench-template` only when each nav page can be made substantial.
4. Focused one-topic report uses a topbar scroll template.
5. Choose `topbar-light-scroll-dashboard-template` for ordinary office analysis, long reading, detail/query, and handoff clarity.
6. Choose `topbar-dark-scroll-dashboard-template` for overview, executive/diagnostic dashboards, stronger status atmosphere, or dark Haier-branded cockpit feel that still needs scrolling.
7. Analysis/diagnostic reports default to a topbar scroll template unless the user requests sidebar, multi-page, workbench, big screen, or fixed 1920*1080 cockpit.

Do not switch to a custom shell merely because the user omitted page style or provided a loose reference. Custom shell requires explicit custom-development intent, explicit exact-restoration intent, or a documented template limitation.

## `nav[]` Template Gate

- Before selecting any template with `nav[]`, including `left-nav-analytics-workbench-template` and `frozen-title-sci-fi-cockpit-template`, define at least two meaningful nav pages with distinct business questions.
- Each nav page must have its own `layoutRows`, widgets, dataset scope, and filter/interaction behavior. A page made only of placeholder cards, duplicate homepage widgets, or a single thin summary does not count.
- If the available content cannot fill multiple nav pages, use a non-nav template where possible and keep secondary detail as sections, drawers, tabs, or drilldowns inside that page.
- Do not keep the template's default nav labels unless they match the redesigned information architecture.

## Template Shell Compatibility

- Requirement-document title, filter, navigation, toolbar, and shell-layout sketches are inputs to adapt, not authority to duplicate the shell.
- When a bundled template is selected, map title text to `screen.title` and template title/logo assets; map filters to the template `filters` array and data-source/filter-field contracts; map navigation requests to existing `nav[]` or `page` structures; map toolbar actions to `screen.controls` or `actions`.
- Do not add a second header/title band, separate filter bar, filter toolbar, extra sidebar, extra top navigation, or ad hoc toolbar just because the requirement document drew one. A requested "main filter bar" is interpreted as the selected template's native filter trigger/panel/popover/drawer plus `filters[]` config.
- If a requirement shell element is incompatible with the selected template, preserve the business intent through the nearest template slot and document the adaptation. Only redesign the template shell when the user explicitly asks for template-level redesign.
