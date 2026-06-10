# Visual Browser Regression And Multimodal Check

Use this shared reference whenever a runnable frontend page, report page, dashboard, big-screen, or prototype must be self-checked or tested visually.

Visual QA has two complementary tracks:

- Deterministic visual regression: Playwright/Cypress/headless browser screenshots plus baseline image diff for repeatable layout-regression detection.
- Multimodal explanatory review: screenshot inspection by a multimodal model to explain visual anomalies, usability impact, and likely repair direction.

Do not treat multimodal review as the only visual regression mechanism. Use deterministic evidence for repeatability and multimodal evidence for interpretation.

## Mandatory Sequence

For runnable pages, do the visual check in this order:

1. Open the target URL with a headless browser or browser automation tool.
2. Wait until the main page shell, charts, tables, fonts, and async data are stable.
3. Capture deterministic screenshots before judging visual quality.
4. Run deterministic checks:
   - Confirm nonblank rendering, stable viewport size, expected screenshot count, and key screenshot file paths.
   - If approved baselines exist, run image diff and record threshold, diff count/ratio, ignored or masked dynamic regions, and diff output paths.
   - If no approved baseline exists, mark deterministic regression as `baseline missing` and save the current screenshots as baseline candidates rather than claiming regression pass.
5. Run multimodal explanatory review on the screenshots when the model/service is available and visual acceptance is in scope.
6. Convert deterministic image-diff failures and multimodal anomalies into structured findings.
7. Feed findings back to the main workflow:
   - In frontend/prototype self-check, repair actionable issues and rerun deterministic diff plus multimodal review when available.
   - In testing workflow, write findings into the test result and defect feedback bundle.

Do not mark deterministic visual regression as passed without screenshot evidence and a passing baseline diff when a baseline is available. Do not mark explanatory visual review as passed without a multimodal review result. If the multimodal model is unavailable, record `multimodal: not run` with the service/tool blocker; deterministic regression may still pass, but overall visual QA should be `partial` unless the task explicitly only requires deterministic regression. If the page cannot be opened, record a blocker instead of skipping visual QA.

## Screenshot Coverage

Capture the smallest set that can prove the page is visually usable:

- First viewport at the target desktop size.
- Header/logo area for Haier or branded pages, including placeholder state when the asset is missing.
- Full-page screenshot when the page scrolls.
- Mobile/tablet screenshots when the page is responsive or embedded in variable containers.
- One screenshot after changing a representative primary filter, plus the expected visible data-change assertion for affected components when the filter is supposed to change data.
- One screenshot or focused crop after switching each non-default business domain, report theme, management object, subject area, or first-level perspective when those controls exist. The assertion must cover metric names, titles/summaries, table dimensions/headers, component set, specialty metrics, risk focus, and口径 labels, not only values.
- DOM overflow evidence for domain navigation, Tabs, Segments, and first-level perspective controls at `1920x1080` and `1280x768`: each visible item/card content viewport must satisfy `scrollHeight <= clientHeight` and `scrollWidth <= clientWidth`. Screenshots are not a substitute for this evidence.
- Height-budget and DOM overflow evidence for fixed-height navigation/cards/KPI tiles/compact summaries: padding, explicit line-height, gaps, badge/status/footer heights, and `requiredContentHeight <= componentHeight`. `scrollHeight > clientHeight` or `scrollWidth > clientWidth` is a clipping defect unless the region is an intentional visible scroll area.
- One screenshot of opened custom filter popovers/dropdowns when filter visual acceptance is in scope.
- One screenshot focused on complex flow, Sankey, graph, tree, decomposition, or lineage diagrams when present.
- For diagrams with layer/stage/lane labels such as `L1/L2/L3`, capture the full diagram header/title band and the first row of nodes in the same screenshot so title-node collisions are visible.
- One screenshot after opening each important tab, drawer, modal, drilldown, fullscreen view, or export preview.
- Error, empty, loading, no-permission, and token-invalid states when those states are in scope and reachable.

Use stable screenshot file names that include page, viewport, state, and cycle, for example:

```text
visual-check/<page>-<viewport>-<state>-cycle-<n>.png
```

## Deterministic Baseline Diff

Use Playwright, Cypress, or an equivalent headless-browser screenshot diff path when a repeatable visual regression decision is needed.

Baseline rules:

- Store baselines in a stable path such as `visual-baseline/<page>/<viewport>/<state>.png` or the project's existing screenshot baseline folder.
- Store current screenshots and diff images separately, for example `visual-check/current/` and `visual-check/diff/`.
- Baselines must be reviewed or accepted intentionally. First-run screenshots are baseline candidates, not proof that no regression exists.
- Keep viewport, device scale factor, color scheme, locale, timezone, route, seed data, auth role, and feature flags stable between baseline and current screenshots.
- Mask or ignore only documented dynamic regions such as timestamps, random IDs, animated counters, maps/tiles, realtime values, ad hoc loading shimmer, or user avatar images.
- Use thresholds deliberately. Record pixel count/ratio and threshold values. Small antialiasing/font differences may be tolerated only when layout, text, charts, and controls remain readable.
- Any diff affecting core content, controls, chart/table geometry, logo placement, or first-viewport answer should be treated as a finding even if the raw pixel ratio is small.

Deterministic finding schema:

- `Finding ID`: `VDIFF-*`.
- `Screenshot`: current screenshot path.
- `Baseline`: baseline screenshot path or `missing`.
- `Diff`: diff image path when available.
- `Viewport/state`: desktop/mobile/full-page/filter/drawer/modal/etc.
- `Metric`: diff pixels, diff ratio, threshold, masked regions.
- `Severity`: `blocker`, `major`, or `minor`.
- `Location`: page, module, component, chart/table/card/control, or approximate screen region.
- `Impact`: why the repeated layout regression affects usability, data interpretation, or acceptance.
- `Likely owner`: `prototype`, `frontend`, `style/layout`, `data`, `environment`, or `unclear`.
- `Suggested fix`: concrete repair direction.
- `Retest criteria`: baseline diff and screenshot state that must pass after repair.

## Multimodal Anomaly Categories

Ask the multimodal model to inspect screenshots for:

- Layout offset: blocks are not aligned to the intended grid, content drifts out of its container, or spacing looks structurally broken.
- Excessive blank area: first viewport or component body has large unused space that weakens the core answer.
- Text overlap: titles, labels, values, legends, buttons, table cells, or tooltips overlap each other.
- Duplicate component title: a page/block title is repeated again inside an ECharts/S2/table/KPI/custom component body, creating redundant hierarchy or wasting component body space.
- Title-node collision: section headers, stage/layer/lane titles, group captions, or column labels overlap, touch, or visually attach to card borders, node cards, node titles, badges, connector paths, chart marks, legends, or child labels. This includes cases where a top stage label appears to sit inside or on the top edge of the first node card.
- Graphic overlap: chart marks, labels, legends, axes, maps, diagrams, table headers, or cards overlap.
- Text-graphic collision: business-question text, conclusion text, titles, labels, legends, chart marks, tables, cards, diagram nodes, connectors, or controls overlap, stack, or visually merge.
- Component too small: chart/table/KPI/detail content is compressed, unreadable, or occupies too little of its block.
- Internal component clipping: summary text, nested KPI grids, submetric tiles, metric titles, values, helper text, or actions are truncated by narrow columns, forced fixed grids, `nowrap`, ellipsis, or hidden overflow without tooltip/focus/drawer disclosure.
- Missing fixed-height budget: fixed-height navigation/cards/KPI tiles do not declare padding, explicit line-height, gaps, badge/status/footer heights, or a passing `requiredContentHeight <= componentHeight` calculation.
- Crowded component distribution: repeated peer cards/charts/tiles are too narrow, too small, or arranged in an awkward long strip instead of a balanced `M * N` pattern when space allows.
- Clipping or truncation: important text, values, legends, axes, controls, drawers, modals, or table content is cropped.
- Nonblank rendering: charts, canvases, maps, icons, logos, images, and tables render with visible content.
- Brand/logo acceptance: required logo or declared placeholder is visible, uses the correct light/dark variant, keeps aspect ratio, and is not clipped. For custom `htmlReplica` or `freeDesign` pages, a real bundled Haier logo is required; placeholder is a blocker.
- Sample fidelity: for sample/screenshot/HTML-source restoration, shell, module order, control count, hierarchy, card proportions, and first viewport match the source unless an enhancement is labeled.
- Control surface quality: primary filters use a styled design-system/custom select/dropdown surface; naked native `<select>` controls are not accepted as final visuals.
- Perspective semantics mismatch: domain/theme/management-object/subject-area switching is shown as a normal filter while component schema changes, or the non-default perspective leaves default metric names, titles, table headers, specialty metrics, or口径 labels in place.
- Perspective navigation clipping: domain navigation, Tabs, Segments, or first-level perspective cards fail DOM no-clipping checks even when screenshots appear acceptable.
- Perspective data-chain mismatch: navigation percentages, overview KPIs, journey cards, or chart summaries disagree under the same domain/statistical口径 and active filters.
- Complex diagram spacing: layer numbers, stage/layer/lane titles, group captions, labels, nodes, connectors, and edges in flow/Sankey/graph/tree/decomposition visuals have at least 16px visible separation and do not collide with rail, title-band, or edge-bend zones.
- Complex diagram title band: layer/stage/lane titles reserve a separate top/side title band with at least 16px spacing from the nearest node, card border, connector, or label.
- Bad visual proportion: primary KPI, chart, table, or conclusion area is visually underweighted compared with decorative or secondary elements.
- Broken scroll behavior: page, table, drawer, modal, or chart needs scroll/zoom but no usable control is visible.
- Low readability: font too small, contrast too weak, dense labels unreadable, or long values not inspectable.
- Stale/prototype residue: visible `mock`, `demo`, `示例`, placeholder text, wrong title, or irrelevant explanatory copy.

## Finding Schema

Every visual anomaly must be recorded as:

- `Finding ID`: `VIS-*`.
- `Screenshot`: screenshot path or URL.
- `Viewport/state`: desktop/mobile/full-page/filter/drawer/modal/etc.
- `Category`: one category from the anomaly list.
- `Severity`: `blocker`, `major`, or `minor`.
- `Location`: page, module, component, chart/table/card/control, or approximate screen region.
- `Observation`: what the multimodal model sees.
- `Impact`: why it affects usability, data interpretation, or acceptance.
- `Likely owner`: `prototype`, `frontend`, `style/layout`, `data`, `environment`, or `unclear`.
- `Suggested fix`: concrete repair direction.
- `Retest criteria`: which screenshot/state must pass after repair.

## Severity Standard

- `blocker`: the page is blank, core conclusion cannot be read, critical data is hidden, main interaction is unusable, deterministic diff breaks a key acceptance area, text/graphic collision hides core content, title-node collision hides or corrupts a key layer/component title, critical metric title/value text is clipped without disclosure, or the screenshot cannot support acceptance.
- `major`: a key component is readable only with difficulty, a chart/table/card is visibly distorted, duplicated titles waste meaningful body space, layout is clearly broken, components are cramped when a balanced layout is available, summary/KPI internal cells truncate business labels, a stage/layer/lane title touches or visually attaches to a card/node/connector, deterministic diff changes important geometry/content, or a normal user may misread the result.
- `minor`: polish issue, secondary spacing issue, non-critical alignment/diff problem, or low-risk text/visual density issue.

## Feedback Loop

For self-check and repair workflows:

1. Add visual findings to the current self-check report.
2. Repair all `blocker` and `major` `VDIFF-*` and `VIS-*` findings unless blocked by missing product/design input.
3. Re-capture the affected screenshot states.
4. Re-run deterministic baseline diff.
5. Re-run multimodal inspection on the new screenshots when available.
6. Stop only when findings are resolved, downgraded with evidence, accepted as partial with owner decision, or the configured repair-cycle limit is reached.

For testing workflows:

1. Attach screenshot paths, baseline diff artifacts, and multimodal findings to test evidence.
2. Convert every `blocker` or `major` `VDIFF-*` or `VIS-*` finding into a defect item.
3. Assign likely owner and retest criteria.
4. Do not report deterministic visual regression as pass when required screenshots or baseline diffs were not captured.
5. Do not report multimodal explanatory review as pass when required screenshots were not reviewed by the model.
