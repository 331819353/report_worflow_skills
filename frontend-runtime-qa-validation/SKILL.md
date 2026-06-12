---
name: frontend-runtime-qa-validation
description: "用于前端实现、视觉修改、数据接入或环境调整后的浏览器运行QA。用户提到运行检查、页面QA、浏览器测试、截图证据、控制台报错、网络请求、路由跳转、筛选、标签页、抽屉、弹窗、图表点击、表格操作、导出下载、刷新、hover/focus动效裁切、SVG/canvas/ECharts图形变形、比例失真、loading/empty/error/auth状态、布局遮挡/溢出、视觉异常、多模态检查、可运行URL验收时触发；不设计测试矩阵。"
---

# Frontend Runtime QA Validation

## Positioning

Use this skill after frontend or prototype changes affect a runnable page. It verifies browser runtime, visual quality, interaction behavior, data binding, states, and readiness evidence.

It is not a test-case design skill. For test matrices use `$integration-test-case-design`; for automated scripts use `$automated-test-generation`; for URL reachability only use `$runtime-url-smoke-test`.

## Reference Map

| Need | Read |
| --- | --- |
| Preflight understanding before QA/acceptance | `$quality-gate-validation` `references/preflight-understanding-gate.md` |
| Browser, console, route, asset, layout checks | `references/browser-qa-matrix.md` |
| Provider, filter, interaction, edge-state checks | `references/data-interaction-state-checks.md` |
| QA report structure | `references/qa-note-template.md` |
| Full runtime QA procedure and component-crop checklist | `references/runtime-qa-procedure.md` |
| Focused visual regression, screenshot diff, component crops, and `VIS-*` findings | `$visual-browser-regression-check` |
| Readiness and cross-stage gate | `$quality-gate-validation` |
| Haier/company application UI baseline | `$haier-enterprise-app-ui-design-spec` for Haier/enterprise Web surfaces, including report/dashboard pages |
| Report/dashboard baseline and anti-AI/report-decision gates | `$report-design-system-governance` relevant references |

## Workflow

1. Run the Preflight understanding gate before QA execution or acceptance; name QA goal, target URL/app, basis artifacts, affected surfaces, required viewports/interactions, missing runtime inputs, and start decision.
2. Run available build/typecheck/lint/test/start commands and record blockers.
3. Classify the UI baseline: Haier/enterprise app, report/dashboard, mixed, or unknown. For Haier/enterprise report pages, apply both Haier application baseline and report-specific baseline during visual judgment.
4. Open the target URL and confirm the page loads without blocking runtime errors.
5. Capture screenshots before visual judgment: full page, responsive states, interactions, and component crops when report/chart/table components exist.
6. Run DOM structural checks: expected card/component counts, fixed-height overflow, bounding-box overlap, and chart/table category uniqueness where inspectable.
7. Inspect console, network, assets, routes, auth, and provider calls.
8. Exercise filters, tabs, drawers, modals, chart clicks, table actions, pagination, sorting, export, refresh, fullscreen, hover, and focus states in scope.
9. Apply anti-AI, report-decision, and multimodal/visual checks when relevant. Use `$visual-browser-regression-check` when the scope requires deterministic baseline diff, screenshot coverage, component crops, or structured `VIS-*` findings.
10. Produce a compact QA note with findings, evidence paths, owner, retest criteria, URL, and readiness.

## Required Output

Use `references/qa-note-template.md` and include:

- Commands run and blockers.
- Preflight understanding result and scoped QA target.
- URL and viewport/screenshot evidence.
- Console/network result.
- Interaction/state checks.
- Visual/DOM structural findings: overflow, card/component counts, bounding-box overlap, and category uniqueness.
- Baseline references applied.
- Readiness: `ready`, `partial`, or `blocked`.

## Quality Gate

- Do not mark visual/runtime readiness without screenshots or a precise blocker.
- Do not execute or conclude visual/runtime QA before the target URL/app, affected surfaces, viewports, interactions, and required evidence are scoped.
- Do not pass Haier/enterprise report visual QA when report-specific checks pass but Haier application baseline checks for typography, color, spacing, base controls, states, or brand/logo are missing.
- Report/dashboard QA cannot rely only on full-page screenshots when component crops are needed.
- Fixed-height content with `scrollHeight > clientHeight` or `scrollWidth > clientWidth` fails unless it is an intentional visible scroll region.
- DOM QA must include count assertions for repeated cards/components, visible duplicate title/label checks inside the same block/card, bounding-box overlap checks for visible peer elements, KPI value-anchor bounding-box checks when metric cards exist, SVG/ECharts text-node overlap checks for legends, axis names, axis labels, and chart annotations when inspectable, and chart category uniqueness checks for rendered/configured category axes or equivalent categorical datasets when those elements exist.
- Data completeness must be checked before filter-linkage pass/fail.
- Standard ECharts charts must show ECharts-owned rendering and interaction when that renderer is claimed.
- Load `runtime-qa-procedure.md` before full QA execution or final readiness judgment.
