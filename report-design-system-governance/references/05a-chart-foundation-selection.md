# Chart Foundation And Selection

This file was split from `05-report-charts-tables-format-guidelines.md`. Load it only for this focused rule group; use `05-report-charts-tables-format-guidelines.md` as the routing index.

## Chart Anatomy

A standard chart should include these semantics. When the chart is placed inside a report block with a block-owned title/function band, the block title owns `Chart title` and the chart body must not render a duplicate internal title.

| Element | Position | Rule |
| --- | --- | --- |
| Chart title | Top-left or block-owned title/function band | Describes chart topic; do not duplicate it inside the chart body when the surrounding block already has a title |
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
| Chart title | `16px` | `24px` | `text.primary` / Haier fallback `#262626` | Bold, left-aligned; block-owned when block title exists |
| Subtitle/conclusion | `14px` | `22px` | `text.secondary` / Haier fallback `#595959` | Left-aligned |
| Filter button | `14px` | `22px` | `text.secondary` / Haier fallback `#595959` | Top-right area |
| Description/unit | `12px` | `18px` | `text.tertiary` / Haier fallback `#8C8C8C` | Bottom-left or beside title |
| Axis/legend | `12px` | `18px` | `text.tertiary` / Haier fallback `#8C8C8C` | Axis text centered; legend centered; do not shrink below component readability baseline |

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

Warning colors communicate business state. Always judge metric direction and business meaning before applying colors; do not color by raw sign alone.

| Semantic role | Preferred token/value | Business meaning examples |
| --- | --- | --- |
| Danger/major warning | `state.error` / Haier fallback `#FF4D4F` | Loss, risk, overdue, threshold breach, abnormal exception, business-negative result |
| Good/healthy | `state.success` / Haier fallback `#52C41A` | Reached target, healthy status, risk reduced, business-positive result |
| Info/normal highlight | `state.info` / Haier fallback `#0073E5` | Selected item, normal progress, small difference, neutral highlight |
| Warning/attention | `state.warning` / Haier fallback `#FAAD14` | Approaching threshold, incomplete target, needs attention |

For Chinese report rate/change/YoY/MoM/variance indicators, use positive-red-up and negative-green-down by default unless the metric dictionary explicitly defines a different direction. For negative indicators such as complaint volume, overdue rate, and cost rate, decreasing values may be good. Reverse color semantics by business meaning, not by raw sign. High-risk warnings should use color plus text/icon/tag.


## Chart Selection

| Analysis relationship | Preferred chart | Use when | Avoid when |
| --- | --- | --- | --- |
| Category comparison | Column chart | Categories are few, usually `<= 5` | Long names or too many categories |
| Many/long categories | Bar chart | Categories usually `> 15`, names are long, vertical space is limited | Time trend |
| Time trend | Line/curve chart | One time variable plus one numeric variable | Category comparison or composition |
| Scale + rate / target relationship | Combo chart | One shared category/time axis must show scale and efficiency/rate/target together, such as sales + growth, orders + conversion, actual + target | Metrics are unrelated, total visible series `>4`, right-axis units are hidden/ambiguous, labels are dense, exact audit is the main task, or two separate charts would be clearer |
| Price OHLC / market quote | Candlestick / K-line | Ordered time with open, high, low, close; price volatility, range, and market movement matter | Only one value per time point, non-financial audiences unfamiliar with OHLC, exact row audit without table |
| Composition | Donut/pie or stacked bar | Categories few, usually `2-6`, and part-to-whole share matters | More than `8` unmerged categories, precise comparison, trend, negative values, or similar shares |
| Hierarchical composition / scale distribution | Treemap / rectangular tree map | Hierarchy plus non-negative additive value share matters: category/product/cost/file/resource/user distribution, parent contribution, or long-tail structure | Trend, negative area values, unclear hierarchy, many unaggregated leaves, exact comparison across similar values, or ordinary expand/collapse hierarchy |
| Hierarchical path / composition share | Sunburst | Hierarchy path and parent-child share matter: category/cost/user/resource/metric decomposition where first-level branch, child split, and current path contribution must be read together | Single-level share, trend, exact ranking, negative/rate/score angle values, too many siblings, `>4` visible levels without drilldown, or decorative multi-ring pie |
| Correlation | Scatter/bubble | Two numeric variables, relationship, cluster, outlier, or quadrant diagnosis | One numeric metric, category comparison, time trend, part-to-whole composition, or dense points without aggregation |
| Distribution / stability | Boxplot | Comparing median, IQR, spread, and outliers across categories | Single aggregate ranking, tiny samples, trend, composition, or exact row audit without table |
| Geography / spatial distribution | Map / geographic coordinate | Region distribution, location cluster, abnormal area, coverage, target attainment by geography, or origin-destination flow | No real geography field, few categories without spatial meaning, precise ranking/audit, or too-small map container |
| Density/crossing | Heatmap | Two category/time dimensions plus one numeric metric; the task is distribution pattern, hotspot, cohort, utilization, or correlation structure | One dimension, few values better shown by table/bar, tiny variance, unclear color meaning, or too many cells without aggregation |
| Ordered movement / journey | Path chart | Start-to-end business path, user behavior path, conversion path, approval/workflow path, drop-off path, or abnormal path where sequence and breakpoints are the decision object | Simple ranking, composition, unordered entity relationships, geographic route, exact row audit, or too many paths without Top N/aggregation |
| Hierarchy / parent-child structure | Tree / hierarchical tree | Organization, category, product/module, metric decomposition, cost structure, permission tree, directory, lineage, or dependency hierarchy where parent-child ownership is the decision object | Many-to-many relationships, area-based composition, simple ranking, exact row audit, or too many nodes without collapse/search/tree-list fallback |
| Entity relationship / network | Relation graph | Entities and relationships are the decision object: central node, community, upstream/downstream, dependency, ownership, transaction path, or risk cluster | Simple ranking, trend, exact row audit, too many nodes/edges without filter/aggregation, or decorative network background |
| Multi-dimensional score | Radar | Ability score, operating health, profile, product/channel comparison, actual-vs-target score | More than `10` dimensions, more than `3` visible objects, mixed raw units, or precise comparison |
| Multi-metric object profile | Parallel coordinates | `3+` metrics across multiple objects, profile similarity, anomaly discovery, Top/selected comparison, or multi-factor screening | `1-2` metrics, single ranking, precise row audit without table, `>12` dimensions without filtering, or too many samples without opacity/sampling/aggregation |
| Conversion | Funnel | Ordered conversion path | No clear stage order |
| Single bounded progress/status | Gauge | KPI completion, progress, realtime monitor with min/max range | Multi-metric comparison, trend, composition, exact audit, or unbounded score |
| Multi-category composition and value | Rose chart | Many categories and both share/value are needed | Precise financial comparison |
| Step change | Waterfall | Budget, P&L, cash flow, additive changes | Simple trend or category comparison |
