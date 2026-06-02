# Visual Multimodal Browser Check

Use this shared reference whenever a runnable frontend page, report page, dashboard, big-screen, or prototype must be self-checked or tested visually.

## Mandatory Sequence

For runnable pages, do the visual check in this order:

1. Open the target URL with a headless browser or browser automation tool.
2. Wait until the main page shell, charts, tables, fonts, and async data are stable.
3. Capture screenshots before judging visual quality.
4. Send the screenshots to a multimodal model for visual anomaly recognition.
5. Convert every recognized anomaly into a structured finding.
6. Feed findings back to the main workflow:
   - In frontend/prototype self-check, repair actionable issues and rerun screenshot validation.
   - In testing workflow, write findings into the test result and defect feedback bundle.

Do not mark a runnable frontend/prototype visual check as passed without screenshot evidence and a multimodal visual review result. If the page cannot be opened, record a blocker instead of skipping visual QA.

## Screenshot Coverage

Capture the smallest set that can prove the page is visually usable:

- First viewport at the target desktop size.
- Header/logo area for Haier or branded pages, including placeholder state when the asset is missing.
- Full-page screenshot when the page scrolls.
- Mobile/tablet screenshots when the page is responsive or embedded in variable containers.
- One screenshot after changing a representative primary filter.
- One screenshot of opened custom filter popovers/dropdowns when filter visual acceptance is in scope.
- One screenshot focused on complex flow, Sankey, graph, tree, decomposition, or lineage diagrams when present.
- One screenshot after opening each important tab, drawer, modal, drilldown, fullscreen view, or export preview.
- Error, empty, loading, no-permission, and token-invalid states when those states are in scope and reachable.

Use stable screenshot file names that include page, viewport, state, and cycle, for example:

```text
visual-check/<page>-<viewport>-<state>-cycle-<n>.png
```

## Multimodal Anomaly Categories

Ask the multimodal model to inspect screenshots for:

- Layout offset: blocks are not aligned to the intended grid, content drifts out of its container, or spacing looks structurally broken.
- Excessive blank area: first viewport or component body has large unused space that weakens the core answer.
- Text overlap: titles, labels, values, legends, buttons, table cells, or tooltips overlap each other.
- Graphic overlap: chart marks, labels, legends, axes, maps, diagrams, table headers, or cards overlap.
- Component too small: chart/table/KPI/detail content is compressed, unreadable, or occupies too little of its block.
- Clipping or truncation: important text, values, legends, axes, controls, drawers, modals, or table content is cropped.
- Nonblank rendering: charts, canvases, maps, icons, logos, images, and tables render with visible content.
- Brand/logo acceptance: required logo or declared placeholder is visible, uses the correct light/dark variant, keeps aspect ratio, and is not clipped. For custom `htmlReplica` or `freeDesign` pages, a real bundled Haier logo is required; placeholder is a blocker.
- Sample fidelity: for sample/screenshot/HTML-source restoration, shell, module order, control count, hierarchy, card proportions, and first viewport match the source unless an enhancement is labeled.
- Control surface quality: primary filters use a styled design-system/custom select/dropdown surface; naked native `<select>` controls are not accepted as final visuals.
- Complex diagram spacing: layer numbers, labels, nodes, and edges in flow/Sankey/graph/tree/decomposition visuals have at least 16px visible separation and do not collide with rail or edge-bend zones.
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

- `blocker`: the page is blank, core conclusion cannot be read, critical data is hidden, main interaction is unusable, or the screenshot cannot support acceptance.
- `major`: a key component is readable only with difficulty, a chart/table/card is visibly distorted, layout is clearly broken, or a normal user may misread the result.
- `minor`: polish issue, secondary spacing issue, non-critical alignment problem, or low-risk text/visual density issue.

## Feedback Loop

For self-check and repair workflows:

1. Add visual findings to the current self-check report.
2. Repair all `blocker` and `major` findings unless blocked by missing product/design input.
3. Re-capture the affected screenshot states.
4. Re-run multimodal inspection on the new screenshots.
5. Stop only when findings are resolved, downgraded with evidence, or the configured repair-cycle limit is reached.

For testing workflows:

1. Attach screenshot paths and visual findings to test evidence.
2. Convert every `blocker` or `major` visual finding into a defect item.
3. Assign likely owner and retest criteria.
4. Do not report visual testing as pass when required screenshots were not captured or not reviewed.
