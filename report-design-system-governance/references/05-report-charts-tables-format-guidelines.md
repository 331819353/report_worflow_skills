# Report Charts, Tables, And Format Guidelines

Use this reference for report chart/table UI standards, color semantics, typography, number/date formats, and visualization rules.

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

## Specific Chart Rules

### Component-Internal Local Filters

- Chart-local filters are named `组件内筛选区 / 局部筛选区` and affect only the current chart or declared local chart group.
- Default surface is a title/header capsule for `2-4` short options. Use compact dropdown for `>4` options, long labels, or failed width fit; use panel/popover/drawer only for multiple local filter groups.
- Keep filter, metric strip, and legend distinct: filter changes chart state, metric strip summarizes values, legend explains visual encoding.
- Local filters cannot overlay or compress the plot, axis labels, legend, table fallback, or state message. Collapse the filter or secondary metrics before shrinking the plot below its reserved budget.

### Column Chart

- Must start from `0` baseline.
- Sort by business order or numeric value.
- Keep consistent bar gaps.
- Show only key data labels.
- If series are too many, switch to bar chart, facet, or filter switch.
- Target/actual comparison columns must declare the target encoding before design acceptance: unified target line for shared targets, per-category target tick for different targets, or grouped actual/target bars for small-category exact comparison.
- Target/actual columns must reserve title/subtitle, metric strip, legend, y-axis label band, right target-label gap, plot area, x-axis label band, and optional footer before choosing `grid` and label visibility.
- Tooltip for target/actual columns must include category, actual, target, attainment, gap, unit, and YoY/MoM/change-rate when available.

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
- Line/area charts must declare y-axis baseline/range behavior. Non-zero y-axis starts are allowed only when they improve bounded/ratio trend readability and the axis makes the range clear.
- Dense line charts must define point and label strategy before acceptance: show all points only for sparse data, keep key labels such as latest/max/min/anomaly, and use tooltip/brush/dataZoom/aggregation for dense data.
- Missing values must not be converted to `0`; lines should break or show an explicit gap while true zero values remain visible.
- Tooltip must include period/category, series name, value, unit, target/reference value when relevant, YoY/MoM/change-rate when available, and source/period context.

### Combo Chart

- Use Combo only when scale and rate/trend/target must be read together on one shared category/time axis. Default encoding is bar for amount/count/scale, line for rate/trend/efficiency, and dashed target/reference for standard.
- Required contract: paired business relationship, ordered x-axis grain, bar metric and unit, line/target metric and unit, left/right y-axis mapping, visible series count, dual-axis rationale when present, category-density fallback, legend/filter separation, and exact tooltip payload.
- Recommended visible series: one bar plus one line or target/reference. Hard limits: bar series `<=2`, line series `<=2`, target/reference `<=2`, total visible series `<=4`, legend items `<=4` preferred and `<=5` maximum.
- Dual axes are allowed only when units differ and the relationship is explicit. Both axes must show units, tooltip must show both values/units, and the right-axis range must not exaggerate or imply unsupported correlation.
- Layout must preserve the chart body: `plotH >= CH * 0.48`; collapse footer, secondary metrics, legend detail, local filter, and ordinary labels before shrinking the plot.
- Category density: `N <= 8` show all labels, `9-16` tilt/sample, `17-30` sample or dataZoom, `>30` scroll/aggregate/split or switch to trend/table.
- Component-local filters may switch metric basis, time range, time grain, actual/target/attainment, YoY/MoM, or amount/count/share for this component only. Large scope filters belong to the page/global filter layer.
- Tooltip must include category/period, bar values, line/rate values, target/reference, unit, target gap or attainment when relevant, active filter, source, period, and denominator-zero/missing-value notes.
- Split into separate charts or table/detail when metrics are unrelated, right-axis semantics are weak, series exceed limits, labels cannot fit, or exact audit is the real task.

### Pie / Donut

- Use only for `2-6` categories and part-to-whole relationship. Default report shape is donut; plain pie is allowed when center content is unnecessary or space is tight.
- Recommended categories: `2-6`; maximum before merging: `8`. When categories exceed budget, use deterministic `Top5 + 其他`, ranked bar, table, or detail drawer.
- Similar shares are hard to compare; avoid pie/donut when users need exact ordering or audit comparison.
- Pie/donut does not support negative values. All-zero data uses an empty/all-zero state such as `暂无有效占比`, not fake shares.
- Donut center can show total, selected category, Top1 share, or key conclusion. Do not put multiple metrics or long口径 text in the center.
- Legend is the default label surface: category + percent. Exact value, rank, change-rate, source, and period go to tooltip/detail.
- Outside labels and guide lines are optional only for large charts with category count `<=5`. They are not the default for compact report cards.
- `其他` must stay last and use a weaker/neutral color. If `其他` becomes the largest item, mark the category structure as fragmented or switch to bar/table.
- Empty data uses empty state, not broken pie.
- In small cards, donut charts must reserve legend width/band before radius is chosen. Reduce radius, set label maximum width/wrap or truncation disclosure, enable overlap hiding, and configure edge/bleed margins so labels, legend, center text, and title do not collide.

### Scatter / Heat Scatter

- Use scatter/bubble for two numeric variables and a relationship task: correlation, clustering, outlier detection, high-value object discovery, or quadrant diagnosis.
- X/Y axes must state variable names and units. Prefer subtitle wording such as `X：客单价 / 元 · Y：转化率 / %`.
- Axis ranges must be declared. Use padded `niceMin/niceMax` for relationship reading, `0` baseline for positive magnitude comparison when needed, visible zero baseline for negative values, and fallback ranges when all X or Y values are identical.
- Point count drives rendering: `N <= 50` may show key labels; `51-300` hides ordinary labels; `301-1000` lowers opacity and uses zoom/brush/sampling; `N > 1000` needs aggregation, density/hexbin, or table/detail fallback.
- Bubble charts require a declared third size metric, bounded sqrt radius mapping, size legend or tooltip disclosure, and overlap handling.
- Add target/average lines for thresholds or four-quadrant diagnosis. Target lines should be stronger than average lines, but both remain visually weaker than the point cloud.
- Four-quadrant backgrounds are optional and weak, `4%-8%` opacity. Quadrant labels sit in corners and must not cover points.
- Add a trend line only when correlation is the task; keep it weak and do not overstate unsupported causality.
- Permanent point labels are limited to Top/outlier/selected/hover or sparse charts. Exact object values belong in tooltip/detail.
- Tooltip must include object name, X/Y values and units, size metric when present, category, target/average comparison, quadrant when present, change-rate when available, and source/period context.
- Too many points use opacity, sampling, aggregation, density/hexbin, brush/zoom, or table/detail fallback.

### Parallel Coordinates

- Use parallel coordinates only for multi-metric object profiles: store/product/user/risk/model samples compared across `3+` metrics where the decision is pattern similarity, outlier detection, Top/anomaly comparison, or multi-factor screening.
- Required data contract: object/sample id and name, group/status when present, `3-12` visible dimension fields, dimension display order, per-axis unit, min/max/range rule, and direction (`higher is better` or reversed lower-is-better axes).
- `3-5` dimensions are clearest, `6-8` are the recommended upper range, `9-12` require short labels/tick reduction, and `>12` requires dimension filter, horizontal scroll, split view, or table/scatter fallback.
- When metrics have mixed units, use independent axis scaling by default or a clearly labeled standardized `0-100` / `0-1` mode. Tooltip must still show original values and units.
- Layout must reserve title/function/local-filter area, optional metric strip, legend, axis-title band, plot area, bottom axis labels, and footer. The plot should remain dominant: `plotH >= CH * 0.48`; collapse footer, secondary metrics, legend, and filters before shrinking the plot.
- Axis spacing must be explicit: `axisGap = plotW / (dimensionCount - 1)`, with `axisGap >= 56px` and `72-96px` for long titles. If the axis gap fails, reduce dimensions, enlarge the block, scroll horizontally, or switch component.
- Lines are data-driven object samples. Ordinary lines use low opacity based on sample count, while Top/anomaly/selected/hover lines are drawn above them. Do not make every line bright or equal-weight.
- Sample density controls rendering: `<=30` normal opacity, `31-100` lower opacity, `101-500` very low opacity plus brush/filter, and `>500` requires sampling, aggregation, density view, or table/detail fallback.
- Legend explains group/status/line semantics and is separate from component-local filters. Local filters may switch Top/all/anomaly, period, raw/standardized mode, metric set, or object type, and affect only the current component.
- Brush ranges are optional but, when used, must declare axis, range, intersection/union behavior, selected count, dimmed nonmatches, and reset path.
- Tooltip must include object identity, all visible dimension values, original and standardized values when applicable, group/status/anomaly reason, active brush/filter context, source, and period.
- States include loading, empty, error, no-permission, fewer than `3` dimensions, too many dimensions, too many samples, all values equal on one axis, missing dimension values, and unit mismatch.

### Map / Geographic Coordinate

- Use maps only when geography is the decision dimension: where values are high/low, where objects cluster, where abnormal regions appear, how coverage differs, or how flows move. If the task is only category ranking, use bar/table.
- Map standards must declare the geography grain, map resource, and join fields. Administrative maps should use stable region codes; point maps must declare longitude/latitude fields and missing-coordinate handling.
- The map viewport must preserve geographic aspect ratio through fitBounds/projection. Extra letterbox space is acceptable; stretched provinces, routes, or coordinate layers are not.
- The map body should remain the dominant area. Implementation-ready map components should reserve title/filter, subtitle/unit, optional metric strip, map viewport, legend, controls, and footer before rendering; `mapAreaH >= CH * 0.55` is the default acceptance floor.
- Choropleth maps use `5-6` color bins through `visualMap`: quantile bins for operating metrics, business thresholds for risk/status, and divergent scale when values cross zero. Missing regions use neutral/no-data fill.
- Point maps use key-only labels. Point density controls rendering: `N <= 100` normal points, `101-500` hide ordinary labels/lower opacity, `501-2000` clustering or heatmap, `N > 2000` heatmap/bin/server aggregation/sampling.
- Bubble maps require a declared size metric, unit, bounded sqrt radius mapping, and size legend or tooltip disclosure. Large bubbles must not hide the geography or each other.
- Heatmap layers express density rather than exact point values. Do not layer ordinary point labels across heatmaps.
- Flow maps require origin/destination fields, line-width sqrt mapping, and Top N limit: small Top `5`, standard Top `10`, large Top `20`. Use table/detail fallback when routes become tangled.
- Basemaps must stay weak: boundaries and land fills provide reference only; data layer, visualMap, and selected/hover states carry the business meaning.
- Permanent map labels are limited to Top `3-5`, selected, hover, abnormal/high-risk, or current drilldown focus. Full region/point/flow values belong in tooltip/detail.
- Legends must match encoding: color scale for choropleth/heat, size legend for bubble/flow, category legend for point status. The legend must not cover high-value regions, dense points, or key routes.
- Tooltip must include region/object/route identity, value + unit, target/gap or attainment when relevant, rank/share/status, missing/aggregation context when relevant, source, period, and active filter context.
- Map states include loading, empty, map-resource failure, no-permission, unmatched region code, missing coordinates, all-zero values, negative-value scale, too-many-points, and too-many-flows.

### Candlestick / K-Line

- Use K-line/candlestick only when the task needs open, high, low, close, and price volatility. If the source has only one value per time point, use line/area.
- Standards must declare ordered time, `open/high/low/close`, unit, instrument/market, adjustment mode when relevant, data delay/freshness, and whether time spacing follows trading calendar or real elapsed time.
- Validate OHLC rows before rendering: `high >= max(open, close)`, `low <= min(open, close)`, numeric values share one unit, and missing/invalid rows are exposed as data gaps.
- Market color convention must be explicit. Chinese market convention normally uses red-up/green-down; international convention often uses green-up/red-down. Do not silently apply generic report positive/negative colors.
- Main candlestick plot remains dominant: `mainChartH >= CH * 0.45`. Volume is secondary, normally `22%-28%` of chart area; all extra indicator subplots together stay `<=38%` of chart area.
- Candle density controls rendering: `N <= 30` wide candles, `31-80` standard, `81-150` sampled time labels, `151-300` dataZoom/brush required, `N > 300` recent-window plus dataZoom/aggregation/table fallback.
- Default MA lines are at most `3`, usually MA5/MA10/MA20. More technical indicators require toggle/dropdown/fullscreen/professional mode and are not default report-card content.
- Permanent labels are limited to latest/current, visible-range high/low, selected, or hover. Do not show OHLC values on every candle.
- Crosshair/axisPointer and tooltip carry exact reading. Tooltip must include time, open/high/low/close, unit, change/change-rate, volume, MA values when present, adjustment mode, source, period, and delay/freshness.
- Volume bars share candle x positions, follow candle direction color with lower opacity, and must distinguish missing volume from real zero volume.
- States include loading, empty, error, no-permission, missing OHLC, missing volume, equal prices, time discontinuity, missing adjustment data, insufficient MA period, and delayed data.

### Boxplot / Box-And-Whisker

- Use boxplot only when the decision needs distribution comparison: median, IQR, spread, stability, and outliers across categories. If the task is ranking one aggregate value, use bar/table.
- Standards must declare whether the data source is raw samples or precomputed statistics. Required statistics are sample count, Q1, median, Q3, IQR, lower/upper whisker, min/max, and outlier count.
- Default outlier rule is Tukey `1.5 * IQR`; Min-Max whiskers are allowed only when explicitly labeled because they do not express outliers the same way.
- Sample count is part of the chart contract: `0` empty, `1` point/short line, `2-4` partial distribution, `>=5` normal boxplot. Do not make strong distribution claims for tiny samples.
- Main plot remains dominant: `plotH >= CH * 0.50`. Metric strip, legend, labels, and filters collapse before the boxplot body is compressed.
- Category density controls layout: `N <= 8` vertical with all labels; `9-16` tilt/sample labels, horizontal boxplot, or scroll; `17-30` horizontal/scroll/pagination; `N > 30` filter, paginate, Top N, or distribution summary table.
- Grouped boxplot is limited to visible series `S <= 3` and categories `N <= 8` unless a scroll/fullscreen fallback is declared.
- Box style is intentionally light: box fill `8%-18%`, border `1-1.5px`, median line `1.5-2px`, whisker/cap `1px`. The median line must be clearer than the box fill.
- Outlier points use stable jitter, small radius, and opacity. Dense outliers aggregate, lower opacity, or show extreme Top N; do not show every raw point by default.
- Mean point and target/reference lines are optional and visually weaker than the box/median, unless the business question specifically focuses on target gap.
- Permanent labels are limited to target/reference, optional median, selected category, or extreme outlier. Full five-number summary belongs in tooltip/detail.
- Tooltip must include category, sample count, min, lower whisker, Q1, median, Q3, upper whisker, max, IQR, outlier count, target/gap when present, unit, period, source, and outlier rule.
- States include loading, empty, error, no-permission, sample too small, no outliers, all values equal, negative values, missing unit, and too many outliers.

### Heatmap

- Use this for matrix heatmaps, time heatmaps, calendar heatmaps, cohort heatmaps, utilization grids, and correlation heatmaps. Geographic heat layers follow map/geographic rules.
- Use heatmap only when the decision needs a two-dimensional pattern: where values are high/low, concentrated, sparse, abnormal, cyclical, retained, utilized, or correlated. If the task is "who is largest", use sorted bar/table.
- Standards must declare row dimension, column dimension, value metric, aggregation grain, unit, period, color-scale rule, and exact-value tooltip payload.
- Color scale must be visible through `visualMap` or equivalent legend. Sequential scales are for positive magnitude metrics, stepped scales are for business levels, and diverging scales are for signed deltas/deviations/profit-loss/correlation.
- Correlation heatmaps must use a diverging scale from `-1` to `1` with `0` as neutral and must not imply causality.
- Missing data and zero must display differently: missing cells use neutral/blank/hatch; zero uses the real lowest-value color.
- Color range defaults to min/max, but outlier-heavy data should declare percentile clipping such as P5-P95 and show that rule in tooltip/legend.
- Main matrix remains dominant: `matrixH >= CH * 0.45`. Metric strip, footer, value labels, and secondary filters collapse before the matrix body is compressed.
- Row/column density controls layout: `R <= 12` and `C <= 12` may show complete labels; `R <= 20` and `C <= 24` sample labels and hide cell values; `R > 20`, `C > 30`, or `R * C > 600` requires scroll, pagination, aggregation, Top N, virtual rendering, or table/detail fallback.
- Numeric labels are off by default. Show them only when cells are large enough (`cellW >= 36px` and `cellH >= 24px`; correlation uses `cellH >= 28px`) or when the user explicitly enables values.
- Highlight at most Top 3 or selected/anomaly cells. Use subtle border/corner marker; avoid large icons, flashing, or full red overlays.
- Tooltip must include row, column, metric, exact value, unit, share/rank/change when present, aggregation grain, period/source, color-scale rule, missing/zero state, and anomaly/threshold reason.
- States include loading, empty, error, no-permission, missing cells, zero cells, all values equal, extreme-value scale dominance, too many rows/columns, unit missing, invalid color range, and no correlation variation.

### Treemap / Rectangular Tree Map

- Use treemap only when the report decision depends on hierarchical composition and scale/share reading: largest parent/leaf, contribution under a parent, long-tail structure, cost/category/product/file/resource/user distribution, or value decomposition by hierarchy.
- Treemap is not a tree chart. Use tree/hierarchical tree for expansion, ownership path, and node context; use treemap when area-based contribution is the decision object. Many-to-many structures use relation/network graph.
- Standards must declare hierarchy schema, parent/leaf aggregation, non-negative additive area metric, optional color metric, total and parent totals, percent of total, percent of parent, level/depth rule, Top N/`其他` aggregation, label thresholds, color legend, local filter separation, breadcrumb/drilldown, and tooltip/detail payload.
- Main treemap area remains dominant: `treemapAreaH >= CH * 0.55`. Footer, metric strip, legend, secondary controls, child values, and tiny labels collapse before the rectangle body is compressed.
- Area metric must be non-negative and additive. Amount, orders, quantity, users, cost, inventory, and file size are valid area metrics. Rates, scores, satisfaction, conversion rate, rank, and signed changes can color or annotate rectangles but cannot be area by default.
- Directly visible levels default to `1-2`; `3` levels require a large block; deeper hierarchies use drilldown with breadcrumb instead of showing every level.
- Leaf density: `<=12` full display, `13-30` Top N with small labels hidden, `31-80` Top N + `其他`, and `>80` drilldown/search/pagination/table fallback.
- Rectangle label thresholds are explicit: `96 * 56` may show name/value/share, `72 * 40` name/value, `48 * 28` name only, smaller rectangles tooltip-only, and rectangles below `16 * 16` aggregate or hide.
- Color semantics must be explicit. Area is the primary metric; color may encode parent category, status, change rate, attainment, or risk. Parent category colors should stay `<=6` visible families; signed changes use diverging scale with `0` midpoint; status colors stay `<=4` levels.
- Tooltip/detail must include full path, value + unit, percent of total, percent of parent, color metric when present, rank, aggregation rule for `其他`, active period/filter, source, and freshness.
- Required states include loading, empty, error, no-permission, all-zero, negative-area invalid, zero-value leaf, missing hierarchy, too many leaves, too many levels, tiny-label hidden, color metric missing, drilldown no child, and aggregated `其他`.

### Sunburst / Sunburst Chart

- Use sunburst only when the report decision depends on hierarchy path plus composition share: first-level branch share, child split under a parent, current path contribution, or long-tail branch materiality. It is not a prettier pie chart. Use Treemap when area-size comparison and space efficiency matter more; use tree/hierarchical tree for expansion and node context; use bar/table for precise ranking.
- Standards must declare hierarchy schema or `children`, parent/child aggregation, non-negative additive angle metric, optional color metric, total and parent totals, percent of total, percent of parent, visible level/ring rule, Top N/`其他` aggregation, sector/label thresholds, center content, color legend, local filter separation, breadcrumb/drilldown, and tooltip/detail payload.
- Main sunburst area remains dominant: `sunburstAreaH >= CH * 0.55`. Footer, metric strip, legend, secondary controls, and deep labels collapse before the radial body is compressed.
- Angle metric must be non-negative and additive. Amount, orders, quantity, users, cost, inventory, visits, and file size are valid angle metrics. Rates, scores, satisfaction, conversion rate, profit rate, rank, and signed changes can color or annotate sectors but cannot be angle by default.
- Visible levels default to `2-3`; `4` levels require a large block and restrained labels; `5+` levels must use drilldown, search, table detail, or another view.
- Ring budget is explicit: `innerR = outerR * 0.22-0.34` with `0.28` default, `ringGap = 1-3px`, and `ringW >= 18px`. If the ring width cannot pass, reduce visible depth or enlarge/split the component before shrinking text.
- Density rules: total nodes `<=20` may render directly, `21-50` requires Top N + `其他`, `51-100` requires drilldown or only `2` visible levels, and `>100` should not render full sunburst by default. Children per parent `>12` need label hiding or Top N; `>20` need Top N plus drilldown/search/detail.
- Sector labels are not default for every node. Show labels only when `sectorAngle >= 10deg`, `ringW >= 22px`, and arc length can fit the text. Permanent labels prioritize first-level branches, largest second-level branches, selected path, Top branches, and anomalies; exact values live in tooltip/detail.
- Center content is part of the decision surface: total, current node, selected path, Top branch, or all-zero/empty state. Center text must fit `centerTextMaxW = innerR * 1.5`; shorten unit/precision before enlarging the hole.
- Color semantics must be explicit. First-level branches use stable distinct colors; child sectors inherit the parent hue. If color encodes status/change/risk/attainment, legend text distinguishes angle from color, for example `角度：销售额 / 颜色：同比变化率`.
- Tooltip/detail must include full path, value + unit, percent of total, percent of parent, color metric when present, rank among siblings, aggregation rule for `其他`, active period/filter, source, freshness, and any parent-child total reconciliation rule.
- Required states include loading, empty, error, no-permission, all-zero, negative-angle invalid, zero-value node, missing hierarchy, parent-child total mismatch, too many nodes, too many levels, tiny sectors merged/hidden, label overflow, color metric missing, drilldown no child, and aggregated `其他`.

### Path / User Journey / Process Path

- Use path charts only when the report decision depends on ordered flow: start-to-end journey, conversion path, approval/workflow path, task handoff, drop-off path, abnormal path, or Top path comparison.
- Standards must declare step/node schema, transition/link schema, start node, end node, order/layer, metric basis, conversion/drop-off formulas, path depth, Top N rule, aggregation/"other" rule, label strategy, legend/filter separation, and tooltip/detail payload.
- Geographic routes and trajectories use map/geographic flow standards. Unordered entity relationships use relation/network graph standards. High-volume many-to-many flows use Sankey or table/detail fallback instead of a path chart.
- Main path area remains dominant: `pathAreaH >= CH * 0.52`. Footer, metric strip, legend, secondary controls, ordinary path labels, and minor branches collapse before the path body is compressed.
- Node density: `N <= 8` may show full path; `9-20` key labels only; `21-40` Top paths plus aggregation; `N > 40` requires filtering, pagination, Sankey, relation graph, or table fallback.
- Link density: `E <= 8` may show full links; `9-20` Top path labels only; `21-50` filter low-weight links; `E > 50` requires aggregation or another visualization.
- Default display should show Top `5` paths, path depth `<= 5`, hide paths below `1%` share, show Top `3` drop-off paths, and preserve abnormal paths when relevant.
- Node content stays compact: node name plus one value. Node name, count, share, YoY, MoM, rank, and reason must not all live inside the node.
- Main path is visually strongest. Branches are weaker, drop-off/abnormal paths use restrained warning or dashed semantics, and all-branch saturated colors are forbidden.
- Path labels are key-only: main conversion rate, important drop-off amount/rate, or anomaly marker. Ordinary transition values belong in tooltip/detail.
- Legend explains path/node semantics and path-width meaning. Component-local filters switch path scope, metric basis, period, path type, Top N, or depth. Do not mix legend items with filter options.
- Tooltip/detail must include exact node and transition evidence. Node tooltip includes node value/share/inbound/outbound/conversion/drop-off/period/source. Link tooltip includes source, target, value, conversion rate, drop-off rate, change or dwell time when present, period/source, and aggregation rule.
- Required states include loading, empty, error, no-permission, missing start, missing end, too many paths, too many nodes, zero-value path hidden, conversion unavailable, change unavailable, isolated node, circular path, and aggregated "other" node.

### Sankey Diagram

- Use Sankey only when the report decision depends on source-to-target flow, allocation, transfer, conversion, loss, traffic routing, fund flow, order-status flow, inventory flow, customer pipeline, or energy flow. If the question is "each channel sales amount", use bar/table; if the question is "where channel users flow and where they drop", use Sankey.
- Standards must declare node schema, directed link schema with `source`/`target`/`value`, layer/stage order, metric basis and unit, node-value calculation, loss/unknown handling, Top N/`其他` aggregation, label strategy, legend/filter separation, and tooltip/detail payload.
- Use ECharts `series.type: 'sankey'` or a named data-driven custom exception. Do not hand-draw ribbons, nodes, legends, or hover states while claiming an ECharts chart.
- Main Sankey area remains dominant: `sankeyAreaH >= CH * 0.55`. Footer, metric strip, legend, secondary controls, ordinary link labels, and minor node values collapse before the Sankey body is compressed.
- Visible layers default to `3-4`; `5` layers require a large block; `>5` layers require drilldown, pagination, path chart, or table fallback.
- Node density: `<=12` complete display, `13-30` Top labels only, `31-60` long-tail aggregation, and `>60` filtering/drilldown/table fallback. Link density: `<=20` full links, `21-50` hidden ordinary labels and weak long tail, `51-100` Top N + `其他`, and `>100` not rendered as a single full Sankey.
- Flow width maps non-negative `value`. `0` links are hidden with disclosure; negative values are invalid for Sankey and need another chart. Unbalanced flow should show `流失`, `未知来源`, `未知去向`, or `其他` nodes rather than visual disappearance.
- Labels are key-only. Node labels show name by default; name + value only when the node is tall enough. Link labels show only for main/loss/anomaly flows and only when the ribbon is wide enough and not colliding; exact values live in tooltip/detail.
- Color defaults to source node/category. Target/status coloring is allowed when the report emphasizes final result. Loss/anomaly flows use restrained warning color, not all-ribbon saturation.
- Component-local filters switch metric basis, path scope, stage, period comparison, or Top N and affect only this component. They must not mix with legend items or compress the Sankey body.
- Tooltip/detail must include exact source, target, value + unit, source share, target share, total share, conversion/loss rate when present, active period/filter, source/freshness, and aggregation rule for `其他`.
- Required states include loading, empty, error, no-permission, missing source, missing target, zero-value link, negative-value invalid, too many nodes, too many links, non-conserved flow, hidden labels, and aggregated `其他`.

### Tree / Hierarchical Tree

- Use tree charts only when the report decision depends on hierarchy, parent-child ownership, decomposition, or upstream/downstream levels: organization, category, product/module, metric tree, cost breakdown, permission tree, directory, task breakdown, data lineage, or system dependency hierarchy.
- Treemap is separate: use Treemap for area-based composition by value; use tree/hierarchical tree for structural reading, expansion, and node context. Many-to-many or multiple-parent structures should use relation/network graph.
- Standards must declare root node, node schema, parent-child schema or children array, depth/layer, visible depth, default expanded levels, node count, max children per node, Top N/`+N` aggregation, orientation, metric basis, label strategy, legend/filter separation, expand/collapse/search behavior, and tooltip/detail payload.
- Main tree area remains dominant: `treeAreaH >= CH * 0.55`. Footer, metric strip, legend, secondary controls, node values, and ordinary labels collapse before the tree body is compressed.
- Orientation follows data shape: horizontal tree for deep hierarchy and long labels, vertical tree for shallow organization/category trees, indented tree list for many nodes or precise name reading, and radial tree only as a display exception.
- Node density: `N <= 30` may show visible tree; `31-80` default expands only `2-3` levels; `81-150` requires expand/collapse, search/locate, and Top N child display; `N > 150` requires tree list, virtual scroll, pagination, or search-first fallback.
- Depth density: `D <= 4` may show complete levels; `5-6` uses horizontal tree plus partial collapse; `7-10` needs tree list, horizontal scroll, or search; `D > 10` should not render as an ordinary static tree.
- Child density: `<=5` may expand, `6-12` requires sorting, `13-30` shows Top N plus `+N`, and `>30` aggregates as `其他` or switches to list/table. Default child display is Top `5`.
- Node content stays compact: name plus one core value and optional status marker. Full details such as parent, children, value, share of parent, owner, status reason, period, source, and update time belong in tooltip/detail.
- Connectors are weaker than nodes, stop at node edges, and must not cross or cover node labels. Parent nodes align to the average center of visible children where feasible.
- Legend explains node/status semantics. Component-local filters switch scope, visible depth, metric basis, period, or expanded/collapsed mode. Do not mix legend items with filter options.
- Interactions include hover root/parent/child path highlight, click node detail, expand/collapse with stable local layout, and optional search/locate that expands to the target node.
- Required states include loading, empty, error, no-permission, missing root, empty children, child loading, too many nodes, too many levels, branch too dense, circular reference, multiple parent conflict, long node name, search no result, and aggregated `+N`/`其他` nodes.

### Relation / Network Graph

- Use relation graph only when the report decision depends on entity connections: who relates to whom, core node, community cluster, upstream/downstream impact, ownership/control, dependency/call path, suspicious transaction cluster, or knowledge graph structure.
- Standards must declare node schema, edge schema, node categories, edge types, relationship direction, relationship weight, layout type, node/edge density strategy, legend/filter separation, interaction behavior, and tooltip/detail payload.
- Layout choice must match the task: force for exploratory multi-center networks, hierarchical for directed dependency/ownership/call chains, radial for one core subject, and grouped/circular for category/community comparison.
- Node density: `N <= 30` may show full graph; `31-80` hide ordinary labels; `81-150` aggregate low-weight nodes; `151-300` requires filtering/aggregation/layered loading; `N > 300` should not render full graph by default.
- Edge density: `E <= 50` may show all edges; `51-150` weaken ordinary edges and hide edge labels; `151-300` show key edges or selected neighborhood; `E > 300` requires aggregation, filtering, or local exploration.
- Node categories are `3-5` visible types by default; edge relationship colors/types are `<=4` when shown through color. More types require merging, filters, or tooltip disclosure.
- Main graph remains dominant: `graphH >= CH * 0.55`. Footer, metric strip, legend, ordinary labels, and secondary controls collapse before graph body compression.
- Nodes must be stronger than edges. Edges use weak opacity by default; important edges may thicken, but the graph cannot become visually dirty.
- Permanent labels are limited to core, Top, anomaly, selected, or sparse graphs. Edge labels are hover/selected by default.
- Legend explains node/edge/status semantics; component-local filters switch relationship scope/type/period/direction. Do not mix legend categories and filter controls into one row.
- Tooltip must include node or edge evidence. Node tooltip includes node name/type, relation count/degree, key metric, status/risk, period/source. Edge tooltip includes source, target, relationship type, direction, weight/count/amount, latest time, status, period/source.
- Required states include loading, empty, error, no-permission, missing nodes, missing relationships, isolated nodes, too many nodes/edges, circular/self-links, layout failure, search no result, and aggregated nodes.

### Radar

- Use radar for shape-based judgement: balance, strengths/weaknesses, actual-vs-target gap, current-vs-previous change, or a small object profile comparison.
- Recommended dimensions: `5-8`. `3-4` is allowed but weak; `9-10` requires short labels and no dense value labels; `>10` must split, facet, switch to bar chart, or switch to table.
- Metrics must share unit/scale or be standardized to a declared score such as `0-100`. If raw values have different units, the main radar plots standardized scores and tooltip/detail exposes raw values.
- Visible series should be `1-2`; maximum normal visible series is `3`. More objects require a component-local selector, facets, small multiples, bar chart, or table.
- For report components, the preferred pattern is actual vs target: actual uses solid line plus light fill, target uses dashed/weak outline or a unified target ring.
- Component-internal local filters can switch period, metric口径, comparison mode, or a small object set, but they affect only the current radar and must not merge with legend or page/global filters.
- Dimension labels must be short and outside the outer ring. Long labels abbreviate with tooltip; exact values belong to tooltip by default.
- The radar coordinate system must stay circular. Do not stretch the chart into an ellipse to fill a wide or tall card.
- Tooltip must include dimension, actual, target, attainment/gap, previous/change-rate when available, score scale/unit, raw value when standardized, and period/source context.
- Avoid radar when the user needs exact numeric audit, many objects, many dimensions, or dimensions without a defensible shared scoring model.

### Funnel

- Use only for ordered conversion/process questions with a shared population or documented cohort logic, such as exposure -> click -> visit -> order -> pay or lead -> opportunity -> quote -> contract.
- Default to a horizontal bar funnel in report components. Traditional trapezoid funnels are allowed only for large-display storytelling with few stages and a documented area-reading caveat.
- Stage data must declare stage id/name/order, value, unit/metric basis, entry/final values, entry share, stage conversion, drop value/rate, total conversion, period/source, and denominator-zero behavior.
- Each visible stage shows stage name, value, and entry share by default. Stage conversion and loss are secondary; only max/key loss is permanently highlighted unless the user selects a stage.
- Keep `3-5` stages as the best default, `6-7` acceptable, `8-10` compact/folded, and `>10` routed to process table, path chart, Sankey, or scroll/folded detail.
- Stage口径 must be consistent; do not mix people, orders, and amount. If repeat counts, backflow, or re-entry make values non-decreasing, show a口径 note instead of forcing fake decreasing data.
- Local filters may switch metric basis, short period, object type, path scope, or actual/target view for this component only. Complex business dimensions belong to page/global filters.
- Legend is normally unnecessary. Use it only for actual vs target, current vs previous, normal vs abnormal, or at most two comparison groups.
- Tooltip must include exact stage value, unit, entry share, stage conversion, drop value/rate, total conversion, target/attainment when present, comparison delta when present, period, source, and口径.
- Do not use funnel for unordered ranking, time trends, simple composition, dense multi-branch paths, or decorative descending blocks.

### Gauge

- Use only for one bounded progress/status metric where the user must judge current value, status interval, and distance to target. Examples include completion rate, attainment, resource usage, risk score, health score, SLA, budget consumption, and target progress.
- Default report shape is a semicircle Gauge with center value, current progress arc, light target marker, sparse min/max ticks, and status label. Circular or `240deg` gauges are allowed only when height is sufficient or monitoring display needs stronger visual presence.
- Required data contract: metric name, current value, unit, `minValue`, `maxValue`, clamp/overflow behavior, status/threshold rule, period/source, and tooltip payload. Target, change rate, and metric strip items are optional but must declare formulas and units.
- Center value plus unit is the primary visual anchor. It must be the largest text in the component and measured as one centered value group. Ticks, pointer, legend, and decoration must not compete with it.
- Threshold ranges need clear meaning and business direction. High risk, complaint rate, failure rate, CPU load, or cost consumption cannot reuse positive-progress colors just because the value is high.
- Keep threshold segments `3-4` by default and `<=5` maximum. If more levels are needed, simplify the state model or add a table/detail explanation.
- Define whether over-`100%` or above-maximum values are capped visually. Recommended behavior: clamp the arc to the full range but display the real value, such as `126%`, with tooltip explanation.
- Pointer is not default. Use pointer only for monitoring/risk/load/temperature/pressure/health-score cases; progress/completion gauges should use progress arc only.
- Local filters may switch short period, metric口径, object scope, or current/forecast view for the current Gauge only. Complex business filters belong to page/global filters.
- Legend is normally unnecessary. Use it only for threshold segments that cannot be understood from center status and tooltip.
- Tooltip must include metric, current value, min/max range, target, target gap, status/threshold interval, change rate when present, period, source, overflow/denominator notes, and update time when available.
- Do not use Gauge for multi-object comparison, trends, composition, unbounded metrics, exact-value audit, or many same-weight gauges in one screen. Use KPI, progress bar, bar/table, or line chart instead.

### Rose

- Pair with legend and tooltip.
- Show Top N and merge the rest as `其他` when categories are too many.
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
- For charts with x-axis labels and bottom legends, reserve a clear safe distance between legend and axis labels. In ECharts implementations, require `grid.containLabel = true` and `grid.bottom >= 56px`.

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

### Detail Table

Use Detail Tables for row-level lookup, comparison, exception location, row evidence, and light operation flows such as order, customer, product, store, transaction, ticket, budget, and metric-detail records.

Required contract:

- Row grain, row id/primary key, display object field, total count, default sort, data source, period/freshness, and row-level permission/action state.
- Column metadata: user-facing label, field name, data type, unit/precision, width/min width, alignment, priority, sortable/filterable/fixed/visible state, tooltip formatter, status semantics, and permission visibility.
- Search/sort/pagination/export execution scope. Global search, sort, pagination, permission, and export scope should be provider/API/resolver inputs. Component-local filters may only narrow the current table's already loaded bounded data.
- Row-detail or row-action contract when the table is an evidence/action surface.

Fit and density:

- Default visible columns: `5-8`. Large blocks may show `8-12`.
- `11-16` columns require horizontal scroll plus fixed primary key column.
- `>16` columns require low-priority hidden columns and column settings.
- `>24` columns should be grouped, moved into a drawer/detail page, or redesigned; do not show a single flat table.
- Table body should remain dominant: `tableBodyAreaH >= CH * 0.55`.
- Recommended visible rows: `4-6` minimum by default. Fewer than `3` visible rows is only acceptable for an explicitly small preview with a detail route.
- Default row height `40px`; compact `32-36px`; relaxed `48-56px` only for avatar/two-line rows. Row height must stay stable.

Detail-table alignment and behavior:

- Primary key/object and text columns left-align.
- Amount, count, rate, completion, YoY/MoM, variance, and ranking columns right-align with tabular numerals.
- Status columns use lightweight tags or icon+text, not large saturated backgrounds.
- Operation column keeps `1` primary action plus `更多` when actions exceed `2`.
- Checkbox columns appear only when batch action/export/assignment/linked selection exists.
- Header is fixed when body scrolls. Primary key column freezes when horizontal scroll is needed; operation column freezes only when row actions are required.
- Long text uses single-line ellipsis plus tooltip. Missing fields show `--`; real zero displays `0`.
- Sorting icons appear only on sortable numeric/time/ranking/status columns. Do not add sort controls to every header.
- Empty/loading/error/filter-empty/no-permission states preserve header/body geometry.

Tooling:

- Component-local filters use `2-4` short status/time/type options as title-right capsules, collapse to dropdown when width fails, and do not replace page/global filters.
- Search is optional. Use a compact icon or `160-240px` search field; when space is limited, preserve the local status filter and collapse search first.
- Pagination sits bottom-right; total/summary text sits bottom-left. Compact mode may show only previous/next.
- Summary rows are `36-44px`, numeric cells right-align, and complex statistics move to the metric strip or detail drawer.

Renderer choice:

- Use Element Plus or the project table component for simple row-level Detail Tables.
- Use AntV S2 only for pivot tables, cross tables, frozen-header analytical tables, wide metric matrices, dense comparison grids, or S2-class analysis behavior. Do not add S2 merely because the component is a table.

### Analysis & Insight Components

Use Analysis & Insight components when the report must explain what happened, why it happened, how large the impact is, whether it is abnormal, what to do next, or whether the data/metric口径 is trustworthy. They may render as `visualType: 'text-summary'`, but they are not generic narrative copy.

Required contract:

- `analysisInsightContract` or equivalent metadata with subtype, insight family, conclusion, evidence, affected object, comparison/change value when relevant, reason fields, action/detail route, confidence/definition/source/freshness, local filters, tooltip payload, and state rules.
- One component, one main point. Use `2-4` insight items for multi-insight lists and max `5`.
- Conclusion appears before evidence. Evidence can be a metric, baseline, affected object, cause, source, freshness, or definition.
- Recommendations and risks include concrete next action. Definition, data-quality, and prediction notes include trust context.

Fit and density:

- Summary bar: `280-960px` wide, `36-56px` high.
- Small insight card: `220-360px` wide, `88-128px` high.
- Standard insight card: `320-560px` wide, `120-180px` high.
- Enhanced diagnosis card: `480-720px` wide, `160-240px` high.
- Side insight panel: `220-320px` wide, `240-480px` high.
- Annotation bubble: `120-240px` wide, `40-96px` high, with `12-48px` leader line.
- Chart-side insights use `insightW = clamp(200px, W * 0.28, 320px)` and stay within `25%` of a Composite Panel area unless the panel is explicitly an explanation panel.

Visual and copy rules:

- Title `2-8` Chinese characters; main conclusion `12-32`; explanation `1-2` visible lines; actions `1-3`; tooltip `3-6` short lines.
- Use weak neutral or semantic tint, `1px` weak border, radius `8-12px`, and semantic icons `14-18px`.
- Warnings use weak tint or `3-4px` left bar, never full-card red.
- Component-local filters are optional and current-component scoped; use capsule/dropdown rules and never change global scope, metric口径, table schema, permission, pagination, export, or another component.
- Loading, generating, insufficient-data, empty/filter-no-result, data-delay, error, no-permission, and long-content states preserve card geometry.

Anti-patterns:

- Generic `智能洞察`, `建议关注`, `数据有所波动`, or "overall good" text with no evidence.
- Essay-like explanation blocks inside compact report cards.
- Every explanation card owning its own independent filter.
- Insight cards visually stronger than the primary chart/table.
- Data-quality warnings presented as business anomalies without distinction.

### Composite Panels / Multi-Component Analysis Cards

Use Composite Panels when several child components work together to answer one small business question, such as `核心指标 + 趋势 + Top 列表`, `目标完成率 + 实际目标对比 + 差额明细`, or `主趋势图 + 构成图 + 异常明细`. They are not whole dashboards and are not Combo Charts.

Required contract:

- One shared business topic and one analysis sequence, such as summary -> trend/structure -> contribution/exception -> detail/action.
- `compositePanelContract` or equivalent metadata with layout pattern, primary child id, child roles, child priorities, child minimum sizes, shared filters, linked interaction, responsive fallback, and state rules.
- One primary child. The primary child should own `50-70%` of visual weight; auxiliary children stay `20-35%`; notes/actions stay `5-10%`.
- Default child count is `2-3`; normal maximum is `4`. More than `4` visible analytical child components should become separate blocks, tabs, drawer/fullscreen, or a redesigned page section.
- Panel-level local filters affect the whole panel by default. Allow at most one child-only filter exception, visually weaker and clearly scoped.
- Shared legends and units are consolidated. Do not repeat the same legend or unit inside every child.
- Detail preview is small: `3-6` rows and `3-5` columns, with `查看全部`, drilldown, drawer, or full Detail Table when more evidence is needed.
- Hover/click linkage preserves context: hover may highlight matching child values; click may pin a category/object and update auxiliary/detail children; selected state needs a clear reset.

Fit rules:

- Recommended outer size is `640-960px` wide and `360-560px` high; minimum is `320x260px` only after auxiliary content has collapsed.
- Content body should keep `contentH >= CH * 0.60`.
- Common layouts: metric strip + main visual; main visual + right auxiliary; main visual + bottom detail; main visual + two side cards; large-only `2 x 2`; metric strip + main visual + right insight.
- Shrink order is P4 note/footer -> P3 detail/Top list -> P2 auxiliary -> P1 primary child. Do not shrink the primary child below its minimum viewport to keep decorative secondary content.
- Small size keeps title, single dropdown filter, core metric, and one main visual. Standard size keeps one auxiliary child. Large size may show `3-4` child components.

Anti-patterns:

- A panel title that is a concatenation of child chart names.
- Four equal-weight mini charts with no primary visual.
- Nested card shells or independent shadows inside the panel.
- Separate filters on every child, making the active口径 unclear.
- Using a Composite Panel to avoid page-grid layout work or to make a report look more complete.

### Complex / Grouped Table Headers

Use complex headers when table fields naturally group by business meaning: metric family, actual/target/variance, current/YoY/MoM, amount/count/rate, time period, finance section, region/channel/product, or pivot column hierarchy. A grouped header makes wide tables easier to understand; it should not make a simple table look complex.

Trigger rules:

- Tables with `>8` visible columns or natural field groups use grouped headers by default.
- Keep a flat header for `4-5` simple unrelated fields, small preview tables, or row-level lookup surfaces where grouping adds no meaning.
- Default grouped-header depth is `2`; maximum recommended depth is `3`. Depth `4` requires collapse, split, fullscreen, or redesign; depth `>4` is not accepted in report display mode.

Required contract:

- `columnTree` or equivalent grouped-column metadata with business group nodes and leaf field nodes.
- Leaf fields declare field id, label, unit, definition/口径, width/minWidth/maxWidth, alignment, priority, sortable/filterable status, formatter, fixed behavior, and tooltip payload.
- `colSpan` is computed from visible leaf descendants; `rowSpan` is computed from `maxDepth`. Parent group width equals the sum of visible leaf widths.
- Component-local filters and per-column header filters are separate. Component-local filters sit in the title/function area as capsule/dropdown controls; column filters are small icons on relevant leaf headers only.

Fit and behavior:

- Header row height is `32-40px`; two levels are normally `64-80px`; three levels are `96-116px`.
- The table must preserve useful body rows. If grouped headers leave fewer than `4` visible body rows, remove optional metrics/subtitles, collapse filters, reduce header depth, compact rows, enlarge, split, or use fullscreen/detail.
- The entire multi-level header stays fixed during vertical body scroll. When horizontal scroll exists, the top-left header and row dimension/primary columns freeze together.
- Parent group backgrounds are restrained, leaf headers are lighter, and weak dividers can show group boundaries. Do not use strong color blocks, thick borders, or every-column icons.
- Group collapse is appropriate when leaf columns exceed `12` or metric groups exceed `4`; collapsed groups retain group title and optional key summary column.
- Header tooltips expose group meaning, field definition, unit, formula/aggregation, period/freshness, and source. Long headers use ellipsis plus tooltip.

### Pivot Table

Use Pivot Tables for multidimensional aggregated cross summaries, not row-level record lookup. A valid Pivot Table has row dimensions, column dimensions, and measures, and it helps users compare aggregated values, subtotals, grand totals, and high/low/exception cells across dimensions.

Required contract:

- Row dimensions, column dimensions, measures, aggregation grain, source dataset, period/freshness, permission scope, and renderer choice.
- Measure metadata: label, unit, precision, aggregation function, numerator/denominator for rate metrics, weighted-average rule when applicable, and subtotal/grand-total formula.
- Row/column hierarchy metadata: level order, display order, expand/collapse behavior, subtotal behavior, natural time order, and empty labels such as `未分类` or `未分组`.
- Sorting: row sort by business order, dimension label, total value, or selected cell/measure; time columns use natural chronological order unless a named business rule overrides it.

Fit and density:

- `pivotAreaH >= CH * 0.55`; fewer than `4` visible body rows is not useful except for a declared preview with fullscreen/detail route.
- Default row dimension depth `1-2`, column dimension depth `1-2`.
- Default measures `1-3`; maximum visible measures `5`. More measures use metric switch, column settings, split table, or a dedicated analysis page.
- Rows `<=50` and columns `<=12` can display directly; rows `51-200` or columns `13-24` require fixed headers and scrolling; rows `>200` require row virtualization; columns `>24` require horizontal scroll and frozen row headers; columns `>50` require dimension reduction, column paging, or redesign.

Layout and behavior:

- Use AntV S2 or a project S2-equivalent analytical table renderer for real pivot/cross/wide analytical tables.
- Row dimension column width is `140-260px`; measure columns are `88-140px`; amount `100-140px`; percent `80-120px`; total `100-150px`.
- Column headers can be multi-level merged cells; parent and measure headers center-align.
- Row dimensions left-align and indent by `16-20px` per level. Expand/collapse icons are `14-16px`.
- Numeric, amount, percent, rate, rank, subtotal, and total cells right-align with tabular numerals and consistent precision.
- Subtotal rows/columns use light emphasis and `500` weight. Grand-total rows/columns use clearer but restrained emphasis and `600` weight.
- Fixed column headers are required when vertical scrolling exists; frozen row dimension columns are required when horizontal scrolling exists.

Aggregation and conditional formatting:

- Subtotals and grand totals are explicit. Percentage/rate metrics recompute from numerator/denominator, such as `sum(actual) / sum(target)`; do not sum percentages and do not average percentages unless the business口径 explicitly says unweighted average.
- Conditional formatting is limited to `1-2` core measures by default: light heat background, in-cell data bar, attainment/exception tag, or positive/negative YoY/MoM color.
- Do not color every cell family. The table should remain a readable cross-summary, not a noisy color grid.

Tooltip and drilldown:

- Cell tooltip includes row path, column path, measure, exact value and unit, row share, column share, subtotal/grand-total context, YoY/MoM when present, aggregation function, formula or numerator/denominator for rates, period, source, and data-quality/permission notes when relevant.
- Cell click may select, link sibling components, open a Detail Table drilldown, or open a formula/detail drawer. Field configuration belongs to edit mode; report display mode should not show Excel-style drag field wells by default.

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
| Complex/grouped header | Required by default when visible columns exceed 8 or fields naturally group by subject, period, metric family, amount/rate/count, target/actual/variance, current/YoY/MoM, region/channel/product |

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

Use the project or Haier system font stack first. Do not force a one-off font family inside chart/table components when the page shell already defines typography tokens.

| Type | Font |
| --- | --- |
| Chinese | Project/Haier system font stack, with Microsoft YaHei as a Windows fallback |
| English/digits | Project/Haier system font stack, with Arial as a fallback; use tabular numerals for comparable values |

Text:

| Text type | Size | Line height | Color |
| --- | ---: | ---: | --- |
| Page title | `20px` | `30px` | `text.primary` / Haier fallback `#262626` |
| Large title | `16px` | `24px` | `text.primary` / Haier fallback `#262626` |
| Small title | `14px` | `22px` | `text.secondary` / Haier fallback `#595959` |
| Body | `14px` | `22px` | `text.secondary` / Haier fallback `#595959` |
| Note | `12px` | `18px` | `text.tertiary` / Haier fallback `#8C8C8C` |

Number format:

| Type | Rule | Example |
| --- | --- | --- |
| Negative / change value | Color by metric direction and business meaning, not raw sign alone; Chinese report rate/change indicators default to positive-red-up and negative-green-down | `-1,234` |
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

Use semantic project/template tokens first. The values below are Haier-aligned fallbacks or roles, not permission to create one-off raw colors.

| Token | Value/source |
| --- | --- |
| `--color-primary` | `brand.primary` / Haier fallback `#0073E5` |
| `--color-primary-hover` | generated `HBlue` hover token or documented project token |
| `--color-primary-light` | generated `HBlue-1`/light brand token or documented project token |
| `--color-text-title` | `text.primary` / Haier fallback `#262626` |
| `--color-text-primary` | `text.secondary` / Haier fallback `#595959` |
| `--color-text-secondary` | `text.tertiary` / Haier fallback `#8C8C8C` |
| `--color-border` | `border.default` / Haier fallback `#D9D9D9` |
| `--color-divider` | `divider.default` / Haier fallback `#F0F0F0` |
| `--color-grid-line` | chart grid token, default `#E5E5E5` unless brand/template overrides |
| `--color-table-header-bg` | table header surface token, default `#FAFAFA` unless brand/template overrides |
| `--color-disabled-bg` | disabled/background token / Haier fallback `#F5F5F5` |

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
