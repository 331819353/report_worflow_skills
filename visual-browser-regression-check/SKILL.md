---
name: visual-browser-regression-check
description: "用于对可运行前端页面、报表、仪表盘、大屏或原型执行视觉回归与截图证据检查。用户提到视觉回归、截图diff、baseline diff、Playwright/Cypress截图、multimodal视觉检查、视觉异常识别、组件截图裁切、VIS-*缺陷、截图验收时触发；不替代完整前端运行QA或交互测试。"
---

# Visual Browser Regression Check

## Positioning

Use this skill for visual evidence and regression checks: browser screenshots, deterministic image diff, component crops, multimodal visual inspection, and structured visual findings.

Use `$frontend-runtime-qa-validation` for complete runtime QA including console, network, interactions, states, data binding, auth, and readiness.

## Reference Loading

- Read `references/visual-multimodal-browser-check.md` before running or accepting visual regression, screenshot coverage, multimodal review, or `VIS-*` findings.

## Anti-Laziness Gate

For non-trivial work, apply `$quality-gate-validation` `references/anti-laziness-execution-gate.md` before final output, handoff, or readiness. Do not mark the result ready while `LAZY-*` findings remain open, when available local evidence was not inspected, when owning skills were skipped, or when proof is limited to generic statements such as "checked", "optimized", "looks good", or "implemented".

## Workflow

1. Open the target URL with browser automation and wait for page, fonts, charts, tables, and async data to stabilize.
2. Capture deterministic screenshots before judging visual quality.
3. Run baseline image diff when an approved baseline exists; otherwise save baseline candidates and mark baseline as missing.
4. Capture focused component crops for dense report/chart/table/KPI/diagram components when present.
5. When ECharts/SVG/canvas components are present, run at least one geometry probe at a second viewport or container size: measure chart body, generated SVG/canvas, legend/axis/plot bounds, plot-height floor, axis-label overlap, nonblank pixels/marks, and resize result before accepting visual readiness.
6. Run multimodal explanatory review when available and in scope.
7. Convert image-diff failures and visual anomalies into structured `VIS-*` findings with severity, evidence, owner, fix direction, and retest criteria.

## Required Output

- URL, viewport, screenshot paths, and crop coverage.
- Baseline diff status and thresholds when available.
- Multimodal review status or precise blocker.
- Proof obligation coverage when owning skills require it: component crops, DOM geometry, CSS/computed-style notes, ECharts/S2 option evidence, ECharts resize lifecycle evidence, control ownership evidence, alignment-intent evidence, and non-default visual states.
- Structured `VIS-*` findings.
- Readiness: `ready`, `partial`, or `blocked`.

## Quality Gate

- Do not mark deterministic visual regression passed without screenshot evidence and a passing baseline diff when a baseline exists.
- Do not replace required component crops with only a full-page screenshot for dense report components.
- Do not mark visual readiness `ready` when required owning-skill proof obligations are missing. Screenshots can support KPI alignment, overflow, chart legend position, and contract implementation, but they do not replace DOM geometry, CSS cascade, ECharts/S2 option, or control ownership checks when those are required.
- Do not mark ECharts visual readiness `ready` by observing only the initial screenshot. Runtime-verifiable charts must provide chart-body dimensions, generated SVG/canvas dimensions, resize trigger or lifecycle evidence, and a second-size nonblank/collision check, or readiness stays `partial`.
- Do not accept full axis charts squeezed into a thin band. If chart body/plot height is below the owning chart floor, axis labels stack, gridlines merge, or a table/list preview crowds the chart, record `VIS-CHART-SQUEEZED`, `VIS-AXIS-LABEL-STACKED`, or `VIS-CHART-TABLE-CROWDING`.
- If multimodal review is unavailable, record the blocker and keep explanatory visual review `partial` unless the task only requires deterministic regression.
