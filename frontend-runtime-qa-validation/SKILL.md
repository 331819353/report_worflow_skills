---
name: frontend-runtime-qa-validation
description: "用于前端实现、视觉修改、数据接入或环境调整后的浏览器运行QA。用户提到运行检查、页面QA、浏览器测试、截图证据、控制台报错、网络请求、路由跳转、筛选、标签页、抽屉、弹窗、图表点击、表格操作、导出下载、刷新、hover/focus动效裁切、SVG/canvas/ECharts图形变形、比例失真、loading/empty/error/auth状态、布局遮挡/溢出、视觉异常、多模态检查、可运行URL验收时触发；不设计测试矩阵。"
---

# Frontend Runtime QA Validation

## Positioning

Use this skill independently after frontend code changes that affect a runnable page. It turns final verification into a repeatable browser QA pass instead of a quick build-only check.

This skill is not bound to 数据服务. It can verify API-backed pages, SDK-backed pages, local/static-data pages, realtime views, visual-only prototypes, and deployed static builds. Use data-service checks only when the frontend actually depends on data-service endpoints.

## Reference Map

- Read `references/browser-qa-matrix.md` for browser, console, route, asset, and layout checks.
- Read `references/data-interaction-state-checks.md` for provider, filter, interaction, and edge-state checks.
- Read `references/qa-note-template.md` when producing the QA result.
- Read `$quality-gate-validation` before visual pass/fail judgment for any runnable page.

## Workflow

1. Start from build/runtime basics.
   Run available typecheck, lint, tests, build, and dev/preview startup commands. Record skipped commands only when they are not defined or blocked by an external dependency.

2. Open the target page.
   Use a local verified URL. Check that the page loads without blocking runtime errors and that core layout appears.

3. Capture headless browser screenshots.
   After the page is stable, capture first-viewport screenshots before visual judgment. Capture full-page, responsive, filter-state, drawer, modal, tab, and edge-state screenshots when those states are in scope. Store screenshot paths as QA evidence.

4. Run multimodal visual anomaly recognition.
   Use `$quality-gate-validation` to ask a multimodal model to inspect screenshots for layout offset, excessive blank area, duplicate component titles, text overlap, graphic overlap, text-graphic overlap, clipping, tiny/crowded charts/tables/cards, unbalanced peer-component strips, unreadable labels, nonblank chart/canvas rendering, SVG/canvas/ECharts geometry distortion, broken proportions, stale prototype residue, and broken scroll behavior. Convert all findings into structured `VIS-*` items.

5. Check browser console and network.
   Verify there are no blocking console errors, unresolved assets, failed provider requests, wrong base URLs, CORS/proxy failures, unexpected 401/403 loops, or malformed responses. For global filter/search/pagination/sort interactions, verify network/provider calls include active params and do not request all candidate data for local full-materialize-then-filter behavior. For component-internal filters, verify the behavior is local to already fetched component data and does not change API-level totals, permission scope, pagination, or business aggregation.
   Before judging filter binding, verify data completeness evidence: the page has option data, default data, at least one non-default filter state, required fields, and API/resolver/mock branches capable of returning different rows/values or an explicit invariant scope.

6. Exercise page interactions.
   Traverse visible controls page by page: filters, search, date ranges, organization selectors, pagination, sorting, tabs, route jumps, drawers, modals, chart clicks, table row actions, export/download, refresh, fullscreen, and close/back flows.
   For interactive cards, KPI tiles, chart/table containers, navigation items, toolbar controls, and local filter chips, check hover and `focus-visible` states. A hover/focus state that moves/scales the element and clips borders/shadows at a grid/card edge is a visual defect.

7. Check data states.
   Confirm loading, empty, error, no-permission, token-invalid, stale-selection, and retry states render without layout breakage or stale data.

8. Check copy and prototype residue.
   Search visible source text and UI for stale wording such as `原型`, `mock`, `demo`, `示例`, placeholder titles, wrong metric names, malformed units, and irrelevant explanatory copy.

9. Feed visual findings into repair or QA conclusion.
   For self-check tasks, repair all actionable `blocker` and `major` visual findings, then re-capture affected screenshots and rerun multimodal inspection. For reporting-only tasks, include findings, screenshot evidence, likely owner, and retest criteria in the QA note.

## Required Output

Produce a compact QA note using `references/qa-note-template.md`.

## Verification Checklist

- Build/startup succeeds or a concrete external blocker is documented.
- Browser reaches the target page without blocking console/runtime failures.
- Headless browser screenshots were captured before visual pass/fail judgment, or an explicit blocker explains why screenshots could not be captured.
- Multimodal visual review was run on the screenshots, with `VIS-*` findings recorded or an explicit no-issue result.
- Runtime data requests hit expected endpoints, SDKs, files, or configured proxies.
- Data completeness for filters is checked before linkage: options, provider/mock rows, fields, default/non-default states, and resolver/API branches exist or are recorded as gaps.
- Filters and interactions update the correct data without stale values.
- Global filter/search/pagination/sort interactions send scope params to providers before response construction; any all-data request followed by local filtering is a `fail` or `partial` QA finding unless it is explicitly a component-internal filter over already fetched component data.
- Empty/error/loading/auth states are visible and stable.
- Hover/focus states preserve geometry and use in-bounds border/outline/glow; no border, shadow, or focus ring is clipped by parent overflow.
- SVG/canvas/ECharts/custom graphics preserve aspect ratio and geometry; circles, gauges, maps, paths, nodes, and icons are not stretched, squeezed, or warped after resize, tab switch, drawer/fullscreen, or filter update.
- No stale prototype-only wording remains unless explicitly required.
- Chinese report rate/change labels use `%`, and change-rate indicators follow positive-red-up / negative-green-down icon semantics when present.
- HTML-replica or custom layouts preserve global UI token consistency instead of copied one-off colors or surfaces.
- Final answer includes the verified URL when startup succeeds.
