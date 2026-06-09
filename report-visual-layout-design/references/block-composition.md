# Block Composition

Use this file when one `8 * N` parent content block needs to contain internal sub-blocks, and those sub-blocks need to contain components.

## Core Rule

At the page grid level, one parent block is still one rectangular `8 * N` grid occupant. Inside that parent block, the layout may define internal sub-blocks. Each internal sub-block may contain one component or one tightly related micro-group.

Do not treat internal sub-blocks as separate page-grid blocks. They live inside the parent block body viewport and respect the parent block's padding, title area, and overflow strategy.

Before deciding to create sub-blocks, choose the parent span from the default distribution in `grid-containers.md`, then check the usable pixel size in `block-size-constraints.md`. Parent blocks must have enough space for the dominant sub-block plus internal labels, controls, dividers, legends, gaps, and states.

Hierarchy:

```text
page content grid: 8 * N
  parent block: rectangular page-grid occupant
    parent title/action band: one business title for the whole parent block
    parent body viewport
      internal sub-block grid/flex layout
        sub-block: stable local viewport
          component: chart, table, KPI group, text, list, diagram, control, or state
```

Allowed internal sub-block strategies:

- Local CSS grid with named areas, such as `summary | chart` or `chart | ranking`.
- Local `M * N` peer matrix for repeated KPI cards, mini charts, status cards, or comparable tiles.
- Responsive local tracks such as `minmax(220px, 1fr)` when the parent block has enough width.
- Tabs or segmented controls when sub-block components are alternative views rather than simultaneous evidence.

## Spacing Rule

When a parent block contains internal sub-blocks, use fixed internal spacing:

- `subBlockInset = 5px`: distance between the parent block body edge and the nearest sub-block edge.
- `subBlockGap = 5px`: distance between sibling sub-blocks.

These values apply only inside the parent block body. They do not replace page-grid `contentGap`, template `cellPadding`, card padding, or the title/body gap.

Size checks must subtract `subBlockInset * 2` from the parent body width/height before assigning sub-block tracks, then subtract `subBlockGap * (trackCount - 1)` along the relevant axis.

## When To Combine Components

Create internal sub-blocks inside one parent block when they answer one business question together:

- KPI number + sparkline + target gap.
- Conclusion text + evidence chart.
- Chart + compact ranking/list.
- Map + regional risk legend.
- Table + row-level mini summary.
- Main chart + small reason tags.
- Two alternate views shown by tabs or segmented control.

Split into separate `8 * N` parent blocks when:

- The sub-blocks/components answer different business questions.
- Each sub-block/component needs its own independent title, filters, actions, or drilldown path; independent visible titles usually mean the content should become separate layout-owned parent blocks.
- The body becomes too dense for readable labels, legends, or table columns.
- Internal scroll becomes the primary way to use the block.
- A sub-block/component needs more space than the parent block can safely provide.
- The combined sub-block/component count exceeds the limits in `block-size-constraints.md`.

## Title Design

Use one parent block-level title for the business question:

- Title: what this block answers, not a list of internal chart names.
- Subtitle: optional scope, formula, period, or brief conclusion.
- Unit/status/actions: keep in the block header when they apply to the whole block.

Internal sub-blocks and components should not repeat card-style titles. Use lighter labels:

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

When one parent block or internal section contains repeated peer sub-blocks/cards/charts/tiles, use internal exact `M * N` distribution where `M` is local columns and `N` is local rows:

- Let `actualTotal` be the actual number of peers shown together.
- Apply this factor algorithm only when `actualTotal > 4`.
- For `actualTotal <= 4`, use a small-group layout based on content, hierarchy, and the parent block shape; do not create a prime-balancing cell.
- Normally `layoutTotal = actualTotal`; when `actualTotal` is prime, use `layoutTotal = actualTotal + 1` before calculating factor pairs.
- `layoutTotal = M * N`.
- `M >= N`.
- Choose the valid factor pair with the smallest `M - N`.
- Use this matrix for the internal sub-blocks inside the large parent block; do not reinterpret it as the top-level page-grid span.
- After choosing the matrix, check whether the parent block needs more page-grid rows with `heightExpansionRows = ceil(N * 2 / 3)` without crowding.
- Do not add arbitrary empty placeholders to force a nicer shape. The only allowed spare cell is the single prime-balancing cell created when the algorithm applies to a prime count, and it must not create fake metrics or mock data.
- If the factor pair creates a narrow column or awkward long strip, split the peers by business meaning, tabs, pagination, drawer, or another parent block unless the pattern is explicitly a timeline, KPI strip, or navigation and passes pixel-fit checks.

## Internal Sub-Block Patterns

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

Use 5+3, 6+2, or vertical split depending on the parent block shape.

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
- Reserve explicit width, height, or grid track for each internal sub-block.
- Each sub-block must declare its component owner, minimum useful width/height, `subBlockInset: 5px`, `subBlockGap: 5px`, state behavior, and overflow rule.
- A sub-block may contain only one primary component unless it is a micro-group such as value+unit+trend, icon+label+value, or label+badge.
- For 1280-wide pages, promote mixed chart/table/text composites to the next larger span tier unless the internal components are KPI/status-only.
- Every chart/table subcontainer needs `min-width: 0`, `min-height: 0`, and a deterministic resize behavior.
- ECharts/S2 instances mount to their own internal viewport, not to the full block or title area.
- Shared legends belong near the related chart, but must not overlap plot/table content.
- Business-question text, conclusions, labels, legends, marks, table cells, cards, and diagram nodes must not overlap, stack, or visually merge inside the parent body or any sub-block.
- If internal labels wrap, increase the parent block span or switch to tabs/drawer.
- Use one internal scroll area at most; prefer table-level scroll over whole-block body scroll.
- Keep empty/loading/error/no-permission states inside the affected sub-block/component when partial data fails; use whole-block state only when the whole block cannot render.

## Template Implementation

In bundled templates, one page-grid parent block maps to one configured widget. For a parent block with internal sub-blocks:

- Implement a single composite widget such as `RevenueInsightBlock.vue`.
- Inside the widget, define local sub-block layout through component CSS grid/flex or an explicit `subBlocks[]` view-model when the project uses config-driven widget internals.
- Set `visualType` to the dominant or most layout-demanding sub-block/component.
  - If a table is primary, use `table`.
  - If a chart is primary, use that chart type such as `line`, `bar`, or `heatmap`.
  - Use `other` only when no supported visual type dominates.
- Keep sub-block/component data resolution in one widget `data` config when they share data.
- If sub-blocks/components need different datasets, either:
  - resolve a combined view model in a data source, or
  - pass secondary static/config data through `props`.
- Emit block-level `dashboard-action` events with clear names such as `rankClick`, `trendPointClick`, or `openEvidence`.

## QA Checklist

- The block has one clear business title.
- Internal sub-block labels are subordinate to the parent block title.
- No duplicate visible component title appears inside the body when the block already has a title.
- Peer sub-blocks/components follow internal exact `M * N` distribution only when `actualTotal > 4`; prime `actualTotal` first becomes `layoutTotal = actualTotal + 1`, `layoutTotal = M * N`, `M >= N`, and `M - N` is minimal among valid factor pairs; the parent block passes the expansion check with `heightExpansionRows = ceil(N * 2 / 3)`.
- No nested card shadows or boxed mini-card titles.
- Every internal sub-block and component has a stable container.
- Parent-to-sub-block spacing is exactly 5px, and sibling sub-block spacing is exactly 5px.
- No chart/table overlaps the title area.
- No sub-block overlaps another sub-block, the parent title band, local controls, legends, or state messages.
- Legends, axes, labels, and table cells remain readable.
- Internal interaction does not conflict with block-level actions.
- The block still answers one business question; otherwise split it.
