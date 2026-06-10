# Runtime QA Note Template

```markdown
## Frontend Runtime QA Note

- Commands run:
- URL verified:
- Console status:
- Runtime provider status:
- Route/surface cases checked:
- Headless screenshots:
- Component crop screenshots:
- Component crop checklist:
- Perspective navigation DOM checks:
- Fixed-height card budget/DOM checks:
- Deterministic visual regression:
- Baseline diff artifacts:
- Multimodal visual review:
- Visual findings:
- Interaction cases checked:
- Perspective/control semantics checked:
- Cross-perspective consistency checked:
- Data states checked:
- Copy cleanup:
- Layout/clipping status:
- Evidence:
- Remaining blocker:
```

Use `Runtime provider status` for network APIs, GraphQL, SDK calls, static files, local fixtures, or realtime feeds.
Use `Deterministic visual regression` for baseline status: pass, fail, baseline missing, or not run, with threshold and masked-region notes.
Use `Baseline diff artifacts` for baseline/current/diff image paths from Playwright/Cypress or the project's visual regression setup.
Use `Visual findings` for `VDIFF-*` items from deterministic image diff and `VIS-*` items from multimodal screenshot review, including severity, screenshot path, diff path when available, component/region, likely owner, fix direction, and retest criteria.
Use `Component crop screenshots` for donut/pie chart, trend/cartesian chart, KPI card/group, and table/analytical-grid crops when present. Donut/pie charts require their own crop; do not accept only full-page evidence.
Use `Component crop checklist` for verifiable checks: ECharts bottom legend/x-axis spacing, small-card donut/pie legend/label-line/label/title/center fit, `legendBandHeight`, `labelLineBudget`, `radius`, `center`, right-legend width budget when used, low-value label handling, KPI value-zone centering and >=40% height, complex/grouped table header rule, and any documented exception.
Use `Perspective/control semantics checked` for non-default domain/theme/management-object/subject-area cases, including metric names, title/summary wording, table dimensions/headers, component set, specialty metrics, risk focus, and口径 labels.
Use `Perspective navigation DOM checks` for `1920x1080` and `1280x768` checks where visible domain nav/Tab/Segment item content satisfies `scrollHeight <= clientHeight` and `scrollWidth <= clientWidth`.
Use `Fixed-height card budget/DOM checks` for fixed-height navigation/cards/KPI tiles/compact summaries: declared padding, explicit line-height, gaps, badge/status/footer heights, `requiredContentHeight <= componentHeight`, and DOM overflow results. `scrollHeight > clientHeight` or `scrollWidth > clientWidth` is clipping unless it is an intentional visible scroll region.
Use `Cross-perspective consistency checked` for field-level assertions tying navigation percentages to the same data chain as overview KPIs, journey cards, and chart summaries, such as navigation satisfaction equals current `experienceProfiles.satisfaction`.
