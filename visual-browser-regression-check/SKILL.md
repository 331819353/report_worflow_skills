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
5. Run multimodal explanatory review when available and in scope.
6. Convert image-diff failures and visual anomalies into structured `VIS-*` findings with severity, evidence, owner, fix direction, and retest criteria.

## Required Output

- URL, viewport, screenshot paths, and crop coverage.
- Baseline diff status and thresholds when available.
- Multimodal review status or precise blocker.
- Structured `VIS-*` findings.
- Readiness: `ready`, `partial`, or `blocked`.

## Quality Gate

- Do not mark deterministic visual regression passed without screenshot evidence and a passing baseline diff when a baseline exists.
- Do not replace required component crops with only a full-page screenshot for dense report components.
- If multimodal review is unavailable, record the blocker and keep explanatory visual review `partial` unless the task only requires deterministic regression.
