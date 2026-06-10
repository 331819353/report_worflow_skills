# Template Layout Design System

Use this file when extracting, applying, or reviewing common layout design from bundled report templates. It turns layout details currently scattered across `dashboard.config.ts`, `DashboardShell.vue`, `WidgetRenderer.vue`, and `src/styles.css` into one reusable template contract.

The current bundled assets contain four directories but three layout families:

| Layout family | Template assets | Primary use |
| --- | --- | --- |
| Topbar scroll dashboard | `topbar-dark-scroll-dashboard-template`, `topbar-light-scroll-dashboard-template` | Single-page scrollable dashboard with top title/control bar. |
| Left-nav analytics workbench | `left-nav-analytics-workbench-template` | Multi-page workbench with persistent navigation and scrollable right content. |
| Frozen-title cockpit | `frozen-title-sci-fi-cockpit-template` | Fixed 1920 * 1080 cockpit with image-backed title band and dark visual framing. |

## 1. Common Layout Layers

All template families use the same conceptual layers:

1. Design frame: fixed design width/height, normally `1920 * 1080`.
2. Shell frame: topbar, left-nav, or frozen title/header area.
3. Content canvas: vertical region bounded by `screen.grid.contentStartY` and `screen.grid.contentEndY`, or by row count and `rowHeight` when the page scrolls.
4. `8 * N` block grid: `layoutRows` characters resolve into rectangular blocks.
5. Block frame: `.placeholder-cell` reserves `cellPadding` around the block.
6. Block card: `.placeholder-cell-inner` owns the visible card/frame surface, title band, body viewport, radius, shadow, and theme surface.
7. Block title band: `.placeholder-cell-title` is a 32px reserved band with a left-aligned title zone and a right-aligned function area for local filters, panel triggers, or links.
8. Widget viewport: `.placeholder-cell-body > .widget-renderer` fills the remaining area and gives the business component or composite parent widget a stable `100% * 100%` viewport.
9. Optional internal sub-blocks: when a parent widget contains multiple components, the widget defines local grid/flex sub-blocks inside `.widget-renderer`; these are not page-grid blocks. The sub-block grid uses `5px` inset from the parent widget viewport and `5px` gap between sibling sub-blocks.

## 2. Config-Owned Tokens

Normal report delivery should change these fields through `src/config/dashboard.config.ts`, not by hardcoding parallel values in `src/styles.css`.

| Token | Source | Meaning | Rule |
| --- | --- | --- | --- |
| `designWidth`, `designHeight` | `screen.layout` | Fixed design frame size. | Keep `1920 * 1080` unless the user explicitly changes display target. |
| `topbarHeight` / sidebar widths / title asset sizes | `screen.layout` | Shell-specific reserved area. | Preserve selected template shell; do not recreate a second shell. |
| `contentStartY`, `contentEndY` | `screen.grid` | Content canvas vertical range. | Move these only when shell height or first-viewport hierarchy changes. |
| `contentGap` | `screen.layout` | Gap between resolved grid blocks. | Controls block-to-block spacing only, not card internal padding. |
| `rowHeight` | `screen.grid`, scroll templates | Minimum resolved grid-row height. | Never shrink below 220px; grow/scroll instead of squeezing content. |
| `cellPadding` | `screen.grid` | Space between grid cell and visible card surface. | Use `0` for clean enterprise cards; use small values such as `5px` for cockpit frames. |
| `dominantTitleColor` | `screen.grid` | Accent color for block title, glow, and weak highlights. | Keep aligned with brand/template theme. |
| `innerBackgroundColor` | `screen.grid` | Block body/frame background hint. | Do not use as business-widget data surface when component scoped styles own the body. |

## 3. Default Family Values

These values are the current shared baseline extracted from bundled template code.

| Family | Content range | `contentGap` | `rowHeight` | `cellPadding` | Card padding/radius | Title band | Notes |
| --- | --- | --- | --- | --- | --- | --- | --- |
| Topbar scroll | `88 -> 1064`, page may grow beyond 1080 | `14px` | `316px`, min `220px` | `0` | `8px / 8px` | `32px + 8px gap` | Topbar is `72px`; content starts after 16px breathing space. |
| Left-nav workbench | `0 -> 1032`, right content scrolls | `16px` | `320px`, min `220px` | `0` | `8px / 8px` | `32px + 8px gap` | Left shell width is `256px`, collapsed `80px`; content padding is `24px`. |
| Frozen cockpit | `118 -> 1080`, fixed screen | `10px` | proportional rows in fixed canvas | `5px` | `8px / 8px` | `32px + 8px gap` | Title image visible height is `116px`; content begins at `118px`. |

## 4. Block Anatomy Contract

Every block should keep this structure unless the task explicitly redesigns the template itself:

```text
placeholder-cell
  padding: var(--cell-padding)
  border-radius: 8px
  placeholder-cell-inner
    inset: var(--cell-padding)
    display: grid
    grid-template-rows: 32px minmax(0, 1fr)
    gap: 8px
    padding: var(--card-padding)      # default 8px
    border-radius: var(--card-radius) # default 8px
    placeholder-cell-title
      left: block title text
      right: function area for local filter, filter panel trigger, detail link, or more action
    placeholder-cell-body
      padding: 0
      border: 0
      border-radius: 0
      widget-renderer fills 100%
        optional widget-owned sub-block grid/flex
          padding: 5px
          gap: 5px
          sub-block viewport
            component
```

Rules:

- Block/page titles are layout-owned. Widgets should not duplicate a visible internal title when the block title exists.
- The 32px block title band is a reserved layout region, not optional decoration.
- The title band is split into two zones: `.placeholder-cell-title-text` on the left, left-aligned, and a right function area. Keep them on one line with at least `8px` gap; the function area must not push the title into unreadable truncation.
- Local filter control selection in the right function area:
  - One local filter and value count `< 3`: sliding capsule / segmented pill.
  - One local filter and value count `>= 3`: compact dropdown/select.
  - Multiple local filters: filter panel/popover/drawer trigger with active count or active summary.
  - Detail actions: text links such as `详情`, `查看详情`, `查看明细`, or `进入分析`; rare actions collapse into `更多`.
- Local filter chips in the title band use compact pill controls, normally `24px` high, `0 8px` padding, and `999px` radius.
- The body viewport has no extra padding by default for single-component widgets. For composite parent widgets, the widget-owned sub-block grid adds `padding: 5px` and `gap: 5px`.
- `WidgetRenderer` keeps `min-width: 0`, `min-height: 0`, `width: 100%`, `height: 100%`, and overflow policy. Table visuals may use internal scroll; charts/canvas/SVG must fill a measurable viewport.
- If the widget contains internal sub-blocks, each sub-block keeps `min-width: 0`, `min-height: 0`, a declared local track/area, `5px` sibling gap through the parent sub-block grid, overflow policy, and state behavior.
- Composite widgets own no-data mask scope. Compute every child sub-block data state first. If all child sub-blocks are no-data, render one parent-block mask over `.placeholder-cell-inner`, including the block title band and widget body. If only some child sub-blocks are no-data, render masks inside those sub-blocks only, covering each sub-block label/control strip plus its component body.

## 5. Spacing And Radius Rules

- Use `8px` as the default card radius across template blocks and compact panels.
- Use `8px` as the default card/frame padding inside `.placeholder-cell-inner`.
- Use `8px` gap between the title band and body viewport.
- Use `5px` as the fixed spacing inside composite parent widgets: parent viewport to sub-block edge is `5px`, and sub-block to sub-block spacing is `5px`.
- Use `999px` radius only for chips, badges, and pill controls.
- Keep block-to-block spacing in `contentGap`; do not simulate it with widget margins.
- Keep block-internal spacing in `cardPadding`, title/body gap, and component scoped styles; do not change `cellPadding` to solve widget-level density.
- In scroll templates, increase rows or allow page scroll when content is dense. In fixed cockpit, reduce visible content, split pages, or use drilldown rather than compressing the 1080px canvas.

## 6. Title And Function Area Placement

- Topbar family: title/control ownership is the topbar shell. Content blocks start at `contentStartY`; do not add a second persistent page header above the grid.
- Left-nav family: page identity is carried by the left navigation/header area. The right content area should not introduce another large page heading unless the user requests a subpage section.
- Frozen cockpit family: title image, logo, and header controls are shell-owned. Content starts below the frozen title band.
- Block title text lives in `.placeholder-cell-title-text`; long text uses one-line overflow with `title` disclosure at the block title level. Component-critical long labels still need component-level wrapping/disclosure.
- The block right function area is for local, block-scoped controls or links only. Page/global filters stay in the template's native filter entry.
- If title and function area conflict, keep the title readable, then collapse secondary controls into dropdown, filter panel, or `更多`.
- Do not place chart legends, metric units that belong to axes, or explanatory prose in the right function area.

## 7. Interaction Feedback

- Template shell hover/focus states should preserve geometry.
- Prefer border color, in-bounds outline, inset glow, stable background tint, or pseudo-elements inside the block/card bounds.
- Do not use hover `translate`, `scale`, or outside-only shadows for fixed grid blocks, compact toolbar buttons, nav rows, or cards that sit inside `overflow: hidden` containers.
- `focus-visible` should match hover feedback without shifting layout.

## 8. What To Change Where

| Change | Preferred place | Avoid |
| --- | --- | --- |
| Reorder blocks or change spans | `layoutRows` in `dashboard.config.ts` | CSS grid overrides in `styles.css`. |
| Change block gap | `screen.layout.contentGap` | Margins on widgets or block children. |
| Change content vertical area | `screen.grid.contentStartY/contentEndY` | Absolute offsets on individual blocks. |
| Change minimum row height | `screen.grid.rowHeight` in scroll templates | Shrinking widget internals below fit rules. |
| Change block accent/surface | `dominantTitleColor`, `innerBackgroundColor`, theme tokens | One-off colors per block without design-system reason. |
| Change business component padding | Widget scoped style | `placeholder-cell-body` padding. |
| Add internal sub-blocks inside one parent block | Widget scoped CSS/config view model with `padding: 5px; gap: 5px` | Extra page-grid blocks, nested card shadows, or collapsed sub-block gaps. |
| Change block title behavior | Template shell only when redesigning the template | Adding chart/table/KPI internal duplicate titles. |
| Add right title-band function controls | Template title-band function area through `localFilters`, link/action config, or existing action slots | Floating controls over chart/table body or adding a second component header. |
| Add no-data masks in composite blocks | Parent widget state calculation: all child sub-blocks empty -> parent-block mask; partial empty -> affected sub-block masks including sub-block title + component | Masking only the chart/table body, or masking the whole parent when siblings still have data. |

## 9. Review Checklist

- The selected template family is named and its shell contract is preserved.
- `layoutRows` remains rectangular and every row is compatible with the `8 * N` grid.
- `contentGap`, `rowHeight`, `cellPadding`, card padding, radius, and title band height are not changed ad hoc.
- Block title, right function area, local filter/link controls, and body viewport have reserved geometry.
- Right function area follows control-selection rules: one filter with `< 3` values uses sliding capsule; one filter with `>= 3` values uses dropdown; multiple filters use panel trigger; detail actions use lightweight links.
- Widgets receive a stable measurable viewport and do not depend on the parent block title for internal component labels.
- Composite widgets declare internal sub-blocks and component ownership; sub-blocks do not pretend to be top-level `layoutRows` cells.
- Composite widgets preserve `5px` parent-to-sub-block inset and `5px` sibling sub-block gaps.
- Hover/focus feedback stays inside component bounds and is not clipped.
- Any deviation from the family defaults is documented as a template-level design decision, not hidden in component code.
