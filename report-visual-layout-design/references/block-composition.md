# Block Composition

Use this file when one `8 * N` content block needs to contain multiple subcomponents.

## Core Rule

At the page grid level, one block is still one rectangular grid occupant. Inside that block, the template may render one composite widget that contains multiple subcomponents.

Do not treat internal subcomponents as separate page-grid blocks. They must live inside the block body viewport and respect the block's padding, title area, and overflow strategy.

Before deciding to combine subcomponents, choose the outer span from the default distribution in `grid-containers.md`, then check the usable pixel size in `block-size-constraints.md`. Composite widgets must have enough space for the dominant subcomponent plus internal labels, controls, dividers, legends, and states.

## When To Combine Components

Combine subcomponents inside one block when they answer one business question together:

- KPI number + sparkline + target gap.
- Conclusion text + evidence chart.
- Chart + compact ranking/list.
- Map + regional risk legend.
- Table + row-level mini summary.
- Main chart + small reason tags.
- Two alternate views shown by tabs or segmented control.

Split into separate `8 * N` blocks when:

- The subcomponents answer different business questions.
- Each subcomponent needs its own independent title, filters, actions, or drilldown path; independent visible titles usually mean the content should become separate layout-owned blocks.
- The body becomes too dense for readable labels, legends, or table columns.
- Internal scroll becomes the primary way to use the block.
- A subcomponent needs more space than the outer block can safely provide.
- The combined subcomponent count exceeds the limits in `block-size-constraints.md`.

## Title Design

Use one block-level title for the business question:

- Title: what this block answers, not a list of internal chart names.
- Subtitle: optional scope, formula, period, or brief conclusion.
- Unit/status/actions: keep in the block header when they apply to the whole block.

Internal subcomponents should not repeat card-style titles. Use lighter labels:

- 12-14px section label.
- Legend label.
- Axis/table header.
- Segmented control label.
- Small badge or tag.

Avoid:

- Multiple same-weight titles inside one block.
- Boxed mini-title cards.
- Nested cards with their own shadows.
- A block title that says "Chart + Table"; use the business question instead.

## Peer Distribution

When one block or section contains repeated peer cards/charts/tiles, use internal exact `M * N` distribution where `M` is columns and `N` is internal rows:

- Let `actualTotal` be the actual number of peers shown together.
- Apply this factor algorithm only when `actualTotal > 4`.
- For `actualTotal <= 4`, use a small-group layout based on content, hierarchy, and the outer block shape; do not create a prime-balancing cell.
- Normally `layoutTotal = actualTotal`; when `actualTotal` is prime, use `layoutTotal = actualTotal + 1` before calculating factor pairs.
- `layoutTotal = M * N`.
- `M >= N`.
- Choose the valid factor pair with the smallest `M - N`.
- Use this matrix for the subcomponents inside the large block; do not reinterpret it as the top-level page-grid span.
- After choosing the matrix, check whether the outer block needs more page-grid rows with `heightExpansionRows = ceil(N * 2 / 3)` without crowding.
- Do not add arbitrary empty placeholders to force a nicer shape. The only allowed spare cell is the single prime-balancing cell created when the algorithm applies to a prime count, and it must not create fake metrics or mock data.
- If the factor pair creates a narrow column or awkward long strip, split the peers by business meaning, tabs, pagination, drawer, or another block unless the pattern is explicitly a timeline, KPI strip, or navigation and passes pixel-fit checks.

## Internal Layout Patterns

### 1. KPI Plus Sparkline

Header: block title + unit + status.

Body:

- Left/top: primary number and delta.
- Right/bottom: sparkline or compact trend.
- Footer or tooltip: target/baseline note.

Use for compact status and performance blocks.

### 2. Insight Plus Evidence

Header: diagnostic question.

Body:

- Left/top: short conclusion or driver summary.
- Right/bottom: chart, waterfall, Top N, or small table as evidence.

Use when the text and chart must be read together.

### 3. Chart Plus Ranking

Header: dimension comparison question.

Body:

- Main area: chart.
- Side strip: Top/Bottom list, badges, or exception list.

Use 5+3, 6+2, or vertical split depending on the outer block shape.

### 4. Tabs Or Segmented Views

Header:

- Block title.
- Small segmented control or tabs in the action area.

Body:

- Show one view at a time.
- Keep body height stable across views.

Use when views are alternatives, not simultaneous evidence.

### 5. Dense Table With Summary Strip

Header: table question and table actions.

Body:

- Top summary strip: 2-4 compact metrics or tags.
- Main body: table with internal scroll if needed.

Use when the summary explains how to read the table.

## Internal Layout Rules

- Use internal CSS grid/flex inside the block body.
- Reserve explicit height for each internal region.
- For 1280-wide pages, promote mixed chart/table/text composites to the next larger span tier unless the internal components are KPI/status-only.
- Every chart/table subcontainer needs `min-width: 0`, `min-height: 0`, and a deterministic resize behavior.
- ECharts/S2 instances mount to their own internal viewport, not to the full block or title area.
- Shared legends belong near the related chart, but must not overlap plot/table content.
- Business-question text, conclusions, labels, legends, marks, table cells, cards, and diagram nodes must not overlap, stack, or visually merge inside the block body.
- If internal labels wrap, increase the outer block span or switch to tabs/drawer.
- Use one internal scroll area at most; prefer table-level scroll over whole-block body scroll.
- Keep empty/loading/error/no-permission states inside the affected subcomponent when partial data fails; use whole-block state only when the whole block cannot render.

## Template Implementation

In bundled templates, one grid block maps to one configured widget. For a multi-component block:

- Implement a single composite widget such as `RevenueInsightBlock.vue`.
- Set `visualType` to the dominant or most layout-demanding subcomponent.
  - If a table is primary, use `table`.
  - If a chart is primary, use that chart type such as `line`, `bar`, or `heatmap`.
  - Use `other` only when no supported visual type dominates.
- Keep subcomponent data resolution in one widget `data` config when the subcomponents share data.
- If subcomponents need different datasets, either:
  - resolve a combined view model in a data source, or
  - pass secondary static/config data through `props`.
- Emit block-level `dashboard-action` events with clear names such as `rankClick`, `trendPointClick`, or `openEvidence`.

## QA Checklist

- The block has one clear business title.
- Internal labels are subordinate to the block title.
- No duplicate visible component title appears inside the body when the block already has a title.
- Peer subcomponents follow internal exact `M * N` distribution only when `actualTotal > 4`; prime `actualTotal` first becomes `layoutTotal = actualTotal + 1`, `layoutTotal = M * N`, `M >= N`, and `M - N` is minimal among valid factor pairs; the outer block passes the expansion check with `heightExpansionRows = ceil(N * 2 / 3)`.
- No nested card shadows or boxed mini-card titles.
- Every internal component has a stable container.
- No chart/table overlaps the title area.
- Legends, axes, labels, and table cells remain readable.
- Internal interaction does not conflict with block-level actions.
- The block still answers one business question; otherwise split it.
