# Composite Panel Placement Algorithm
This file was split from `12f-placement-composite-tables.md`. Load it only when this exact component family is present; use `12f-placement-composite-tables.md` as the routing index.


Use this for multi-component analysis cards where one report component container combines several child components into one decision unit. A Composite Panel is not a whole dashboard and is not the same as a Combo Chart. It is a single block that lets the user read one small analysis loop:

```text
summary -> main trend/structure -> contribution/exception -> brief detail/action
```

Valid examples:

- KPI strip + line chart.
- KPI strip + target/actual bar chart + short exception table.
- Main trend chart + Top list.
- Target attainment gauge + target/actual bar chart + variance list.
- Main chart + auxiliary composition chart.

Reject a Composite Panel when:

- Only one metric or one chart is needed.
- Child components answer different business questions.
- Every child needs its own full title, filter, action, or drilldown path.
- The component would need more than four visible analytical child components in a normal report card.
- The user expects a freeform dashboard canvas or drag-and-drop layout.
- The child components are only placed together for visual richness.

### Required Contract

Implementation-ready Composite Panels declare `compositePanelContract` or an equivalent local structure:

```ts
type CompositeChildRole =
  | 'primary-metric'
  | 'main-visual'
  | 'auxiliary-visual'
  | 'top-list'
  | 'detail-preview'
  | 'insight'
  | 'legend'
  | 'state';

type CompositePanelContract = {
  topic: string;
  analysisSequence: Array<'summary' | 'trend' | 'structure' | 'contribution' | 'exception' | 'detail' | 'action'>;
  layoutPattern: 'metric-main' | 'main-side' | 'main-detail' | 'main-two-side' | 'two-by-two' | 'metric-main-side';
  primaryChildId: string;
  children: Array<{
    id: string;
    role: CompositeChildRole;
    visualType: string;
    priority: 'P1' | 'P2' | 'P3' | 'P4';
    minW: number;
    minH: number;
    title?: string;
    datasetId?: string;
    unit?: string;
    localFilterScope?: 'panel' | 'child-only';
  }>;
  sharedLocalFilters?: string[];
  childLocalFilterException?: string;
  sharedLegend?: boolean;
  sharedUnit?: string;
  linkedInteraction?: 'none' | 'hover-highlight' | 'click-select' | 'hover-and-click';
  detailRoute?: string;
  responsiveFallback: string[];
  stateRules: string[];
};
```

### Anatomy

| Element | Required | Placement |
| --- | ---: | --- |
| Panel title | Yes | Top-left; names the business analysis topic |
| Panel local filter | Optional | Top-right capsule/dropdown; affects the whole panel by default |
| Subtitle/unit/source | Optional | Under title, weak text |
| Metric strip | Recommended | Under header; max `3` metrics |
| Main child | Yes | Largest body region, primary reading anchor |
| Auxiliary child | Optional | Right side or bottom, weaker than main child |
| Detail preview | Optional | Bottom or side; `3-6` rows and `3-5` columns |
| Shared legend | Optional | Main visual top/right or content top/right |
| Tooltip | Yes | Child tooltip by default; composite insight on click or selected state |
| Definition/source/freshness | Optional | Subtitle, footer, or tooltip |
| Loading/empty/error/no-permission states | Yes | Parent or affected child scope |

The title should say `销售经营分析`, `渠道表现诊断`, or `风险监控概览`. Do not title the panel `销售额趋势 + 品类占比 + Top 商品`; that is a list of tools, not the shared question.

### Coordinate System

```text
W = container width
H = container height
P = clamp(12px, W * 0.04, 24px)
CW = W - 2P
CH = H - 2P
componentGap = clamp(8px, W * 0.015, 20px)
```

Width tiers:

| Container width | Padding |
| ---: | ---: |
| `W < 320px` | `12px` |
| `320px <= W < 480px` | `16px` |
| `480px <= W < 720px` | `20px` |
| `W >= 720px` | `24px` |

### Header And Local Filter

Composite Panels use one panel-level local filter group by default:

- Suitable: period, metric, actual/target/attainment, all/exception/unreached, amount/count/share, day/week/month.
- Unsuitable: region + channel + category + store + user type + time + status. Put complex filters in the page/global filter surface.
- Child-level filters are discouraged. If required, allow at most one child-only filter; it must be visually weaker, placed beside that child label, scoped to that child only, and disclosed in the tooltip or child label.

Filter sizing:

```text
filterH = clamp(24px, H * 0.08, 32px)
optionW = clamp(44px, textWidth + 24px, 96px)
filterW = sum(optionW) + outerPaddingX * 2
filterMaxW = min(CW * 0.45, 280px)
```

When `filterW > filterMaxW`, collapse to a single capsule dropdown such as `本月 v`. Do not create a new filter row before trying this collapse.

Filter and title placement:

```text
filterX = W - P - filterW
filterY = P + (titleLineH - filterH) / 2
titleX = P
titleY = P
titleMaxW = CW - filterW - 12px
```

Legends must not mix with filters. The title area owns filters; the main visual or content top owns shared legends.

### Vertical Budget

```text
titleAreaH = 36-56px
metricH = 0-56px
toolbarH = 0-32px
footerH = 0-24px

contentY = P + titleAreaH + metricH + toolbarH + topGaps
contentX = P
contentW = CW
contentH = H - P - footerH - contentY
```

Default:

```text
titleAreaH = 44px
metricH = 0-48px
toolbarH = 0-24px
footerH = 0 or 20px
contentH >= CH * 0.60
```

If `contentH < CH * 0.60`, degrade in this order:

1. Hide footer/long notes.
2. Reduce metric strip to one or two metrics.
3. Collapse panel filter to dropdown.
4. Hide secondary legends and persistent labels.
5. Hide or collapse detail preview.
6. Hide auxiliary child.
7. Keep only P1 metric/main visual.

### Child Priority And Count

Recommended child count:

| Visible analytical children | Rule |
| ---: | --- |
| `1` | Not a Composite Panel; use a normal component |
| `2` | Clearest default |
| `3` | Recommended upper default |
| `4` | Large-container maximum |
| `5+` | Split into separate blocks, tabs, drawer, or dashboard sections |

Priority:

```text
P1 = primary metric or main visual
P2 = key auxiliary visual
P3 = Top list or detail preview
P4 = definition, footer, update time, optional notes
```

Responsive shrink order is `P4 -> P3 -> P2 -> P1`.

### Child Minimum Sizes

| Child type | Min width | Min height |
| --- | ---: | ---: |
| Metric card | `120px` | `72px` |
| Line chart | `220px` | `140px` |
| Bar chart | `240px` | `160px` |
| Pie/donut | `180px` | `160px` |
| Top list | `140px` | `120px` |
| Detail preview | `240px` | `120px` |
| Heatmap | `240px` | `160px` |
| Map | `280px` | `220px` |
| Gauge | `180px` | `160px` |

If a child falls below its minimum, convert it to a metric summary, hide labels/legend, collapse it, or move it to a detail route. Do not render an unreadable miniature chart.

### Chart Plus Table/List Split

Use this gate when a Composite Panel places a trend/combo/bar chart above or beside a detail table, ranking, action list, or issue preview.

The chart and table/list must both have a declared band budget:

```text
chartChildH = allocated chart child height
chartPlotH = chartChildH - chartReservedTop - chartReservedBottom
previewChildH = allocated table/list child height

chartChildH >= 220px for standard axis charts with title/legend/axes
chartPlotH >= max(140px, chartChildH * 0.48)
previewChildH >= headerH + rowH * 3 for visible table/list preview
chartChildH + previewChildH + componentGap <= contentH
```

If this fails:

1. Keep the chart as P1 and move the table/list to drawer/detail/tab when the chart answers the main question.
2. Keep only Top3 rows or one selected-object preview if the table/list is supporting evidence.
3. Collapse secondary legends, local filters, metric strips, ordinary labels, and footers before shrinking the chart plot.
4. Split the chart and table/list into separate page blocks when both are P1 evidence.
5. Convert the chart to an intentional sparkline only when axes, legend, and exact comparison are not needed.

Do not accept a Composite Panel where a full ECharts axis chart is squeezed into a thin band above a table/list. Record `VIS-CHART-TABLE-CROWDING` when the panel cannot satisfy both chart and preview floors.

### Layout Pattern A: Metric Strip + Main Visual

Use for simple operating trends.

```text
metricH = clamp(36px, CH * 0.15, 56px)
mainX = contentX
mainY = contentY + metricH + componentGap
mainW = contentW
mainH = contentH - metricH - componentGap
```

Fit range: `W = 360-720px`, `H = 280-420px`.

### Layout Pattern B: Main Visual + Right Auxiliary

Use for trend plus Top list, small composition chart, or summary card.

```text
sideW = clamp(160px, contentW * 0.28, 260px)
mainW = contentW - sideW - componentGap

mainX = contentX
mainY = contentY
mainH = contentH

sideX = contentX + mainW + componentGap
sideY = contentY
sideH = contentH
```

Fit range: `W >= 640px`, `H >= 320px`. Main child should occupy `65-75%` of content width.

### Layout Pattern C: Main Visual + Bottom Detail

Use for trend plus exception list or brief evidence table.

```text
detailH = clamp(80px, contentH * 0.28, 140px)
mainH = contentH - detailH - componentGap

mainX = contentX
mainY = contentY
mainW = contentW

detailX = contentX
detailY = contentY + mainH + componentGap
detailW = contentW
```

Require:

```text
mainH >= contentH * 0.55
detail rows = 3-6
detail columns = 3-5
```

### Layout Pattern D: Main Visual + Two Side Cards

Use for main trend plus one composition and one Top/summary card.

```text
sideW = clamp(160px, contentW * 0.28, 260px)
mainW = contentW - sideW - componentGap
sideItemH = (contentH - componentGap) / 2
```

The two side items must be P2/P3 and visually weaker than the main child.

### Layout Pattern E: Two By Two Matrix

Use only in a large container when four child views are truly necessary.

```text
cellW = (contentW - componentGap) / 2
cellH = (contentH - componentGap) / 2
```

Requirements:

```text
W >= 720px
H >= 420px
one child remains visually primary
```

If the container is smaller, use a main/side or main/detail layout. Do not make four equal-weight mini charts.

### Layout Pattern F: Metric Strip + Main Visual + Right Insight

Use for large operating cockpit modules.

```text
metricRowH = clamp(48px, contentH * 0.18, 72px)
bottomH = contentH - metricRowH - componentGap

sideW = clamp(180px, contentW * 0.26, 280px)
mainW = contentW - sideW - componentGap
```

The metric strip summarizes the whole panel, not each child. Show at most `3` metrics in normal report cards.

### Metrics, Units, And Legends

Metric strip:

- Use total, change rate, target attainment, exception count, Top contribution, or average.
- Default maximum is `3` metrics.
- Small cards keep only `1-2` metrics.

Unit rules:

- Same unit across the panel: place it in the subtitle.
- Different child units: put primary unit in subtitle and child units near child label or axis.
- Do not repeat the unit beside every value.

Legend rules:

- If multiple child charts share series such as actual/target/YoY, use one shared legend.
- Place shared legend at the main visual top-right or content top-right.
- Never merge legend items into the local filter capsule.

Color rules:

- The same metric keeps the same color meaning across all children.
- Target/reference uses one consistent line/tick style.
- Exception/status colors follow the report semantic palette.
- Do not recolor the same metric differently in the main chart, auxiliary chart, and table.

### Text Rules

| Text | Size | Weight | Line height |
| --- | ---: | ---: | ---: |
| Panel title | `14-16px` | `600` | `20-24px` |
| Subtitle | `12px` | `400` | `16-18px` |
| Filter text | `12px` | `400-500` | `16px` |
| Metric label | `11-12px` | `400` | `16px` |
| Metric value | `18-24px` | `600-700` | `22-28px` |
| Child label | `12-13px` | `500-600` | `16-18px` |
| Axis label | `11-12px` | `400` | `14-16px` |
| Legend | `12px` | `400` | `16-18px` |
| Table text | `12-13px` | `400` | `18-20px` |
| Tooltip | `12px` | `400` | `18px` |

### Linked Interaction

Hover on the main child may:

- Highlight the same category/time/object in auxiliary children.
- Update metric strip preview values.
- Highlight matching detail rows.
- Show a child tooltip.

Click selection may:

- Pin the selected category/time/object.
- Filter or highlight auxiliary child content.
- Show a composite insight panel or update detail preview.

Click selection must have a clear exit:

- Click the selected item again.
- Click blank space.
- Use a visible reset/clear selection control when the selected state persists.

Default tooltip behavior:

- Hover shows child tooltip only.
- Click or selected state may show composite insight.
- Avoid long hover tooltips that list every child value.

### Responsive Rules

| Size | Rule |
| --- | --- |
| `W < 360px` or `H < 280px` | Keep title, single dropdown filter, core metric, and one main visual. Hide subtitle, auxiliary child, detail preview, shared legend, and footer. |
| `360px <= W < 720px`, `H >= 320px` | Use vertical layout. Keep title/filter, metric strip, main child, and one auxiliary child. Hide complex detail and secondary notes. |
| `W >= 720px`, `H >= 420px` | Full structure can show `3-4` child components, main/side layouts, shared legend, and detail preview. |
| `W >= 960px`, `H >= 540px` | Metric strip + main visual + right auxiliary + bottom detail can be used, but child count still needs a clear primary visual and should not exceed `5` even in exceptional large modules. |

### State Rules

| State | Behavior |
| --- | --- |
| Loading | Skeleton preserves title/filter, metric strip, main child, auxiliary child, and detail preview geometry |
| Empty all children | Show one parent-level empty state over the panel body |
| Partial child empty | Show a child-local empty state covering that child label/control plus body |
| Error all children | Parent-level error with retry when supported |
| Partial child error | Child-level error with local retry or link to detail |
| Filter empty | `当前筛选无结果`, with reset path when supported |
| Too many children | Auto-collapse P4/P3/P2 or split into separate blocks |
| Container too small | Keep P1 metric/main visual only |
| Unit mismatch | Child-level unit near label/axis plus exact unit in tooltip |
| Linked selection no match | Affected child shows `无匹配数据` without clearing the selected context silently |
| No permission | Only unauthorized child shows permission state unless the whole panel is unauthorized |

### Default Specification

```text
recommendedW = 640-960px
recommendedH = 360-560px
minW = 320px
minH = 260px
defaultChildCount = 2-3
maxRecommendedChildCount = 4
P = 16-20px
titleAreaH = 44px
filterH = 28px
metricH = 40-56px
componentGap = 12-16px
contentH >= CH * 0.60
mainVisualWeight = 50-70%
auxiliaryWeight = 20-35%
detailH = 80-140px
metricCount <= 3
mainVisualCount = 1
auxiliaryVisualCount <= 2
detailRows <= 6
```

### Acceptance Checks

- The panel has one business topic and one analysis sequence; it is not a bag of unrelated widgets.
- One child is visibly primary and owns the largest area or strongest value hierarchy.
- Child count defaults to `2-3`, stays `<=4` for normal cards, and has a split/tab/fullscreen reason when larger.
- Panel-level local filters affect the whole panel by default. Any child-only filter is labeled, weak, and scoped.
- `contentH >= CH * 0.60`, or fallback removes footer, metrics, filters, detail, and auxiliary children before shrinking P1.
- Every child satisfies its minimum viewport or is collapsed/replaced by summary/detail route.
- Shared legends and shared units are not duplicated inside every child.
- Detail preview uses `3-6` rows and `3-5` columns, with a `查看全部` or drilldown route when more detail is needed.
- Hover/click linkage preserves active filter, selected category/object, tooltip, detail, and export context.
- Loading, empty, error, no-permission, partial-data, and filter-empty states use correct parent vs child scope.
