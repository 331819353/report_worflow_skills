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
- Deterministic visual regression:
- Baseline diff artifacts:
- Multimodal visual review:
- Visual findings:
- Interaction cases checked:
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
Use `Component crop screenshots` for donut/pie chart, trend/cartesian chart, KPI card/group, and table/analytical-grid crops when present.
Use `Component crop checklist` for verifiable checks: ECharts bottom legend/x-axis spacing, small-card donut legend/label fit, KPI value-zone centering and >=40% height, complex/grouped table header rule, and any documented exception.
