# Report Charts, Tables, And Format Guidelines

Use this reference for report chart/table UI standards, color semantics, typography, number/date formats, and visualization rules.

## Chart Anatomy

A standard chart should include:

| Element | Position | Rule |
| --- | --- | --- |
| Chart title | Top-left | Describes chart topic |
| Subtitle / conclusion | Below title | Gives key conclusion or explanation |
| Unit | Beside title or axis name | Example: `单位：万元` |
| Filter condition | Top-right | Date or dimension switch |
| Axis | Plot edge | Shows dimension/value scale |
| Legend | Bottom-center by default | Explains series meaning |
| Plot area | Middle | Core data display |
| Data labels | Near marks | Show only key values to avoid crowding |
| Reference line | Plot area | Target, average, warning line |
| Supplemental info | Bottom-left | Data source, update time |
| Detail link | Bottom-right | Jump to secondary page or detail |

## Chart Typography

| Text | Font size | Line height | Color | Rule |
| --- | ---: | ---: | --- | --- |
| Chart title | `16px` | `24px` | `#000000` | Bold, left-aligned; may adapt to theme |
| Subtitle/conclusion | `14px` | `22px` | `#5B5B59` | Left-aligned |
| Filter button | `14px` | `22px` | `#5B5B59` | Top-right area |
| Description/unit | `12px` | `18px` | `#8D8D8B` | Bottom-left or beside title |
| Axis/legend | `10px` | `14px` | `#8D8D8B` | Axis text centered; legend centered |

Main body font guidance: recommended font size `14px`, line-height `22px`.

## Chart Lines And Links

| Element | Color |
| --- | --- |
| Grid line | `#E5E5E5` |
| Axis line | `#E5E5E5` |
| Link | `#0073E5` |

## Chart Series Palette

Default multi-series order:

| Order | Color |
| ---: | --- |
| 1 | `#0052D9` |
| 2 | `#219CF9` |
| 3 | `#40C057` |
| 4 | `#F5BA18` |
| 5 | `#FF8143` |
| 6 | `#F56B6D` |
| 7 | `#C065E7` |
| 8 | `#765DEB` |

Rules:

- Series count `<= 8`: use colors in sequence.
- Series count `> 8`: first reduce visible series; if necessary, cycle colors or use same-hue depth variations.
- Same business object should keep stable color across pages when possible.
- Color cannot be the only information carrier; pair with legend, label, or explanation.

Blue same-hue palette:

| Order | Color |
| ---: | --- |
| 1 | `#002181` |
| 2 | `#003CA4` |
| 3 | `#0052D9` |
| 4 | `#2663E9` |
| 5 | `#477BFF` |
| 6 | `#7195FF` |
| 7 | `#96AFFF` |
| 8 | `#B8C8FF` |

Use the blue palette for unified theme, stage gradients, or depth hierarchy.

## Warning Colors

Warning colors communicate business state. Always judge whether the metric is positive, negative, or neutral before applying colors.

| Color | Value | Business meaning examples |
| --- | --- | --- |
| Red | `#FF0000` | Loss, negative growth, key reminder, YoY > 0, negative number |
| Green | `#43C061` | Zero forecast/actual difference, completion rate `>= 100%`, YoY < 0 |
| Blue | `#007AFF` | Small forecast/actual difference, completion rate `>= 90%` |
| Orange | `#FAAA37` | Large forecast/actual difference, completion rate `> 0` and `< 90%` |

For negative indicators such as complaint volume, overdue rate, and cost rate, decreasing values may be good. Reverse color semantics by business meaning, not by raw sign. High-risk warnings should use color plus text/icon/tag.

## Chart Selection

| Analysis relationship | Preferred chart | Use when | Avoid when |
| --- | --- | --- | --- |
| Category comparison | Column chart | Categories are few, usually `<= 5` | Long names or too many categories |
| Many/long categories | Bar chart | Categories usually `> 15`, names are long, vertical space is limited | Time trend |
| Time trend | Line/curve chart | One time variable plus one numeric variable | Category comparison or composition |
| Composition | Pie/donut or stacked bar | Categories few, usually `<= 5` | Many categories or precise comparison |
| Correlation | Scatter/bubble | Two numeric variables, relation or pattern | Category comparison |
| Density/crossing | Heatmap | Two category variables, or 2 categories + 1 numeric with many combinations | Few categories that table can show |
| Multi-dimensional score | Radar | Ability score, product feature comparison | Too many dimensions or precise comparison |
| Conversion | Funnel | Ordered conversion path | No clear stage order |
| Single progress | Gauge | KPI completion, progress, realtime monitor | Multi-metric comparison |
| Multi-category composition and value | Rose chart | Many categories and both share/value are needed | Precise financial comparison |
| Step change | Waterfall | Budget, P&L, cash flow, additive changes | Simple trend or category comparison |

## Specific Chart Rules

### Column Chart

- Must start from `0` baseline.
- Sort by business order or numeric value.
- Keep consistent bar gaps.
- Show only key data labels.
- If series are too many, switch to bar chart, facet, or filter switch.

### Bar Chart

- Use for many categories, long category names, ranking.
- Prefer descending numeric order.
- Long names can truncate with tooltip.
- Axis unit must be explicit.
- Ranking charts should highlight Top N or anomalies.

### Line / Curve Chart

- X-axis uses ascending time order.
- Time granularity stays consistent; do not mix day/week/month.
- Recommended series count: `2-5`.
- Can add target, average, or warning line.
- Historical and forecast data should use different line styles, such as solid/dashed.
- Anomalous peaks can use annotations.

### Pie / Donut

- Use only for few categories and part-to-whole relationship.
- Too many categories should become bar chart or `Other`.
- Similar shares are hard to compare; avoid pie.
- Donut center can show total or key conclusion.
- Empty data uses empty state, not broken pie.

### Scatter / Heat Scatter

- X/Y axes must state variable names and units.
- Add trend line when useful.
- Anomaly points need tooltip or click detail.
- Too many points use opacity, sampling, aggregation, or heatmap.

### Heatmap

- Color scale must have legend.
- Color meaning must match business semantics.
- Numeric labels show only when cells are large enough.
- Missing data and zero must display differently.

### Radar

- Recommended dimensions: `5-8`.
- Metrics should share unit or be standardized.
- Avoid too many comparison objects.

### Funnel

- Stages must be ordered.
- Each layer shows stage name, value, and conversion rate.
- Distinguish total conversion rate and stage conversion rate.
- Stage口径 must be consistent; do not mix people, orders, and amount.

### Gauge

- One gauge expresses one core metric.
- Threshold ranges need clear meaning.
- Define whether completion rate over `100%` is capped.
- Gauge is not for detailed multi-metric comparison.

### Rose

- Pair with legend and tooltip.
- Show Top N and merge the rest as `Other` when categories are too many.
- Avoid precise financial comparison.

### Waterfall

- Positive and negative changes must be distinguished.
- Start value, delta items, and final value need clear labels.
- Every delta item needs business explanation.

## General Chart Rules

Title format:

```text
指标 + 分析维度/时间范围 + 分析关系
```

Examples:

| Avoid | Prefer |
| --- | --- |
| 趋势图 | 近 12 个月销售收入趋势 |
| 对比分析 | 各区域本月销售收入对比 |
| 占比 | 产品类型销售收入占比 |

Unit must appear in at least one of:

- Title: `销售收入趋势（单位：万元）`
- Y-axis: `销售收入（万元）`
- Table header: `销售收入（万元）`
- KPI card note: `单位：万元`

Legend:

- Default bottom-center.
- Full legend when series count is small.
- Scroll, filter, or interaction-hide when many series.
- Legend labels use business names, not API fields.

Axis:

- Axis text should be concise; long text truncates with tooltip.
- Numeric axis uses reasonable business range.
- Column/bar charts start from `0`.
- Dual-axis charts should be used carefully and must show both units clearly.

Data labels:

- Show only key values, max/min, anomalies, or user-focused values.
- Hide dense labels by default and show on hover.
- Label format follows unified number format.

Tooltip must include:

- Dimension name.
- Metric name.
- Metric value.
- Unit.
- YoY/MoM or derived metrics when present.
- Data time or range when present.

Links:

- Secondary/detail link is placed bottom-right of chart.
- Link color is `#0073E5`.
- Link copy should be explicit, such as `查看明细`, `查看详情`, `进入分析`.

## Table Rules

Use tables for:

- Detail data.
- Rankings.
- Audit/operation lists.
- Multi-field precise comparison.
- Chart drilldown results.
- Exportable data.

Layout:

| Item | Rule |
| --- | --- |
| Header background | `#FAFAFA` |
| Border color | `#F0F0F0` |
| Default alignment | Left |
| Numeric/amount/rate fields | Right |
| Last column | Usually right |
| Operation column | Center or right by scenario |
| Horizontal scroll | Allowed when many fields |
| Fixed operation column | Float/fix operation column in first visible area when many fields |

Column contract:

| Field | Meaning |
| --- | --- |
| Column name | User-facing Chinese label |
| Field name | API field |
| Data type | Text/amount/quantity/rate/date/status/action |
| Unit | 万元/%/个/单 |
| Width | Default and min width |
| Alignment | Left/right/center |
| Wrapping | Prefer no wrap |
| Max chars | Truncate with tooltip |
| Sort/filter/fixed | Explicit yes/no and fixed side |
| Permission | Role-based visibility |

Content:

- Long content uses ellipsis plus tooltip.
- Date format stays unified, for example `YYYY-MM-DD HH:mm:ss`.
- Numeric fields right-align for vertical comparison.
- Status fields can use dot, tag, and color, but must have text.

Operations:

- High-frequency operations display directly.
- Low-frequency operations collapse into `更多`.
- Dangerous operations require confirmation.
- No-permission operations can hide or disable with reason.
- Operation copy uses verbs; `查看详情` is clearer than `详情`.

Pagination:

- Long lists must paginate; load one page at a time.
- Types: basic pagination, more pagination, quick jump.
- Default page size can be `10`, `20`, `50` by business need.
- Filter change resets to page 1.
- Selected page uses primary color `#0073E5`.
- Pagination is placed bottom-right of table.

Export:

- Clarify current page vs all query results.
- Respect data permission.
- Define whether hidden columns are included.
- Include filter conditions, export time, and exporter when needed.
- Large data export should be asynchronous.
- Recommended file name: `报表名称_筛选范围_导出日期.xlsx`, for example `销售收入明细_202606_20260609.xlsx`.

## Typography And Format

Fonts:

| Type | Font |
| --- | --- |
| Chinese | Microsoft YaHei |
| English/digits | Arial |

Text:

| Text type | Size | Line height | Color |
| --- | ---: | ---: | --- |
| Page title | `20px` | `30px` | `#000000` |
| Large title | `16px` | `24px` | `#000000` |
| Small title | `14px` | `22px` | `#5B5B59` |
| Body | `14px` | `22px` | `#5B5B59` |
| Note | `12px` | `18px` | `#8D8D8B` |

Number format:

| Type | Rule | Example |
| --- | --- | --- |
| Negative | Red | `-1,234` |
| Rate | YoY/completion no decimal | `86%` |
| Number | Thousands separator, no decimal | `1,234,567` |
| Amount | Thousands separator, business unit | `1,234 万元` |
| Empty | `-` | `-` |
| Extreme anomaly | Follow口径, display `-` or prompt | `-` |

Date/time:

| Type | Format | Example |
| --- | --- | --- |
| Date | `YYYY-MM-DD` | `2026-06-09` |
| Month | `YYYY-MM` | `2026-06` |
| Year | `YYYY` | `2026` |
| DateTime | `YYYY-MM-DD HH:mm:ss` | `2026-06-09 08:30:00` |
| Range | `YYYY-MM-DD ~ YYYY-MM-DD` | `2026-06-01 ~ 2026-06-09` |

Copywriting:

- Titles use concise noun phrases.
- Buttons use verbs: `查询`, `重置`, `导出`, `确认`.
- Explanations should tell why and how to handle, not only "error".
- Empty state copy explains current state, such as `暂无数据` or `当前筛选条件下暂无数据`.
- Error copy gives next action, such as `加载失败，请刷新重试`.
- Do not expose API field names or technical terms in UI.

## Token Suggestions

Color tokens:

| Token | Value |
| --- | --- |
| `--color-primary` | `#0073E5` |
| `--color-primary-hover` | `#2793F2` |
| `--color-primary-light` | `#E6F7FF` |
| `--color-text-title` | `#000000` |
| `--color-text-primary` | `#5B5B59` |
| `--color-text-secondary` | `#8D8D8B` |
| `--color-border` | `#F0F0F0` |
| `--color-grid-line` | `#E5E5E5` |
| `--color-table-header-bg` | `#FAFAFA` |
| `--color-disabled-bg` | `#F2F2F2` |

Spacing tokens:

| Token | Value |
| --- | --- |
| `--spacing-2` | `2px` |
| `--spacing-4` | `4px` |
| `--spacing-8` | `8px` |
| `--spacing-12` | `12px` |
| `--spacing-16` | `16px` |
| `--spacing-24` | `24px` |
| `--module-gap` | `16px` |
| `--module-title-content-gap` | `24px` |
| `--button-gap` | `8px` |
| `--input-inner-padding` | `12px` |
