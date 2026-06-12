# ECharts Combo Pie Radar Gauge

This file was split from `05-echarts-charts.md`. Load it only for this focused rule group; use `05-echarts-charts.md` as the routing index.

## Combo Charts

Use Combo charts only when two related metrics must be read on the same category/time axis, such as sales amount + growth rate, order volume + conversion rate, revenue + margin, actual + target attainment, traffic + CTR, cost + ROI, or actual value + target/reference. A Combo chart is not a container for unrelated charts.

Business fit:

- Default encoding: `bar` = scale/amount/count, `line` = rate/trend/efficiency, target/reference = standard or benchmark.
- Valid types include bar + line, bar + target/reference line, grouped bar + line, stacked bar + line, area + line, and dual-y-axis bar + line.
- Split into separate charts when metrics are unrelated, series exceed density limits, the right axis would imply false correlation, the user needs exact audit, or the component is too small.
- Do not use Combo just because a dashboard needs visual variety. It must state the paired relationship such as `规模与效率`, `实际与达成`, `投入与产出`, or `流量与转化`.

Required data and option contract:

- Category/time field and deterministic order.
- Primary bar metric name, unit, value field, and axis mapping.
- Secondary line/target metric name, unit, value field, and axis mapping.
- `xAxis`, one or two `yAxis` definitions, `legend`, `tooltip`, `axisPointer`, and data-driven `series`.
- ECharts owns bars, lines, target/reference lines, axes, grid, tooltip, legend, hover emphasis, and label layout. Do not hand-draw bars, lines, axes, targets, or legends with DOM/SVG/CSS/canvas while claiming ECharts Combo.
- Use `dataset` or a shared ordered row array so `xAxis.data`, bar data, line data, target values, tooltip payloads, and click payloads all come from the same sorted rows.
- Do not treat `grid.containLabel` as collision avoidance for `legend`, y-axis `name`, title, or DOM header content. Combo charts must explicitly budget and validate these slots.

Series and axis limits:

- Recommended: `1` bar series + `1` line series.
- Bar series `<= 2`, line series `<= 2`, target/reference lines `<= 2`, total visible series `<= 4`; legend items should be `<= 4` and hard max `5`.
- Grouped bar + line supports at most `2` bar series and normally `N <= 12` categories.
- Stacked bar + line supports at most `4` stacked bar parts and `1` main line.
- Dual axis is allowed only when the units differ and the business relationship is explicit. Left axis normally carries amount/count, right axis carries percent/rate. Both axes must show units, tooltip must show both units, and axis label color may weakly match the series without becoming decorative.
- Avoid dual axes for unrelated indicators, hidden right axis, exaggerated right-axis ranges, or synchronized-looking curves without a real relationship.

Plot budget:

```text
titleAreaH = 36-56px
metricH = 0-48px
legendH = 20-28px
axisNameH = 0 or measured yAxis name text height
topAxisNameReserve = max axisNameH + max yAxis.nameGap when any yAxis.name uses nameLocation: 'end'
xAxisH = 32-56px
footerH = 0-24px
plotH = CH - titleAreaH - metricH - legendH - topAxisNameReserve - xAxisH - footerH - gaps
require plotH >= CH * 0.48

leftAxisW = clamp(40px, maxLeftAxisLabelWidth + 8px, 80px)
rightAxisW = hasRightAxis ? clamp(36px, maxRightAxisLabelWidth + 8px, 72px) : 0
grid.left = leftAxisW
grid.right = rightAxisW + 8-16px
grid.top >= titleAreaH + metricH + legendH + legendAxisNameGap + topAxisNameReserve
grid.containLabel = true
```

If title, metric strip, local filter, or legend are DOM outside ECharts, subtract those bands before mounting ECharts. Collapse footer, secondary metric strip, legend detail, local filters, and ordinary labels before shrinking the plot below the floor.

Dual-axis name and legend collision contract:

- Left and right axis units such as `件`, `元`, `%`, `人`, or `次` are real text elements. They must be represented in one declared place: y-axis `name`, axis-label formatter, subtitle/unit metadata, or tooltip/legend metadata. Do not duplicate the same unit in multiple visible places without a reason.
- When a top legend is rendered inside the same ECharts instance and a y-axis `name` uses the default/top `nameLocation: 'end'`, the option must declare `legend.top`, `legend.left/right`, `grid.top`, `yAxis.nameGap`, `yAxis.nameLocation`, `yAxis.nameTextStyle`, and the expected safe gap between legend and axis names.
- The top-band layout must either reserve separate vertical lanes or pass measured rectangle checks. Minimum safe gap between legend item text/marker boxes and any left/right y-axis name box is `8px`; overlap area greater than `4px²` is a visual defect.
- Unit-only y-axis names should usually move to `axisLabel.formatter` such as `{value}%` / `{value}件`, to a subtitle/unit line, or to `nameLocation: 'middle'` with explicit `nameRotate` when the top legend is crowded. Keeping `nameLocation: 'end'` is allowed only with a passing budget and screenshot/DOM proof.
- Fixed magic numbers such as `legend: { top: 0, right: 8 }` plus `grid: { top: 38 }` are not accepted for dual-axis combo charts unless the measured legend, both axis names, and the required safe gaps are shown to fit at every target viewport.

Category density and geometry:

- `N <= 8`: show all x-axis labels; labels may be horizontal.
- `9-16`: tilt or sample labels after measuring; show only key data labels.
- `17-30`: sample x-axis labels and hide ordinary labels; consider dataZoom.
- `N > 30`: use scroll/dataZoom, switch to a trend chart, or split/table fallback.
- Single bar width: `barW = clamp(8px, bandW * 0.48, 40px)`.
- Grouped bars: `barW = clamp(6px, (bandW * 0.72 - innerGap * (S - 1)) / S, 28px)`, with `innerGap = 4-8px`.
- Line points align to category centers. Line width is `2px`; emphasis width `2.5-3px`; point radius `3-4px`, hover `5-6px`; hide normal points when `N > 20`.
- Draw order: grid -> bars -> target/reference -> line -> points -> key labels -> tooltip guide.

Labels, legend, and tooltip:

- Legend sits above the plot or in the title-function area, separate from component-local filters. Use items such as `■ 销售额`, `— 增长率`, `┄ 目标`.
- Legend interaction may toggle series, but it must preserve at least one primary bar/scale series or switch to an explicit split/empty state; never leave only a secondary rate line that implies an unsupported story.
- Permanent bar labels are off by default. For `N <= 6`, show all only if they fit; for `7-12`, show max/min/anomaly/selected; for `>12`, hide.
- Line labels show only latest, max/min, selected, or anomaly. If labels collide, preserve the line/target evidence and move ordinary bar labels to tooltip.
- Target/reference labels use `11-12px`, dashed `1-1.5px` line, and right-edge label only when the right gap fits; otherwise move the label to legend/tooltip.
- Metric strip is optional and should show at most `3` summary values: primary total/latest value, line/rate change, and target attainment or anomaly evidence.
- Tooltip is required with `trigger: 'axis'` and should list category, bar metrics first, line/rate metrics after, target/reference last, units, target gap or attainment when relevant, active filter, period, source, and denominator-zero notes. Keep tooltip width about `180-320px`, flip away from right/top/bottom boundaries, and do not use static labels as a substitute for exact values.

Component-internal local filter:

- Suitable filters: main metric basis, time range, time grain, actual/target/attainment, YoY/MoM, amount/count/share.
- Unsuitable filters: large region/channel/category/store/user/status sets that change report scope or component schema; move them to page/global filters or perspective controls.
- Place one local filter in the title/header right side when it fits: `filterH = clamp(24px, H * 0.08, 32px)`, `filterMaxW = min(CW * 0.45, 280px)`, `filterX = W - P - filterW`, `titleMaxW = CW - filterW - 12px`.
- If the filter does not fit, collapse to a single compact dropdown such as `销售额 ▾`; do not add a new filter row until the chart's legend/axis/plot budget still passes.

States:

- Loading: reserve title/filter and show bar + line skeletons.
- Empty: show `暂无数据` in the plot body.
- Small `W < 360px` or `H < 260px`: keep only title, collapsed local filter, main bar, main line/target, axes, and tooltip; hide subtitle, metric strip, ordinary labels, footer, and noncritical legend detail.
- Missing bar series: hide bar only and keep line if the relationship still makes sense; missing line/target hides that series and explains in tooltip/state.
- Missing category breaks the line and omits the bar rather than converting to `0`; real zero renders at baseline.
- Negative values require visible zero baseline on the relevant axis.
- Too many categories trigger label sampling, dataZoom/scroll, aggregation, or split-chart fallback.


## Pie, Donut, Rose

- Use only when category count is small and part-to-whole proportions matter. Do not use pie/donut for trend, exact ranking, precise audit comparison, negative values, or visually similar shares that users must compare exactly.
- Donut is the default report shape. Plain pie is allowed when center content is unnecessary or the component is too small. Semi-donut/progress donut is a separate single-progress pattern and must not be mixed with normal category composition.
- Recommended category count: `2-6`; maximum before merging is `8`. When category count is `> 8`, or when small categories make the legend/label ring unreadable, use `Top5 + 其他`, ranked bar, table, or detail drawer.
- Merge small items deterministically:

```text
sort by value desc
keep TopN, default TopN = 5
otherValue = total - sum(TopN)
merge when categoryCount > 6 or singleCategoryPercent < 3%
```

- `其他` must stay last and use a weaker/neutral color. If `其他` becomes the largest item, warn that categories are too fragmented or switch to ranked bar/table.
- Follow `12-internal-placement-algorithms.md`: reserve title/subtitle, optional metric strip, legend band/side width, pie area, optional outside label budget, center metric, footer, local filter, and state geometry before setting ECharts options.
- Use ECharts `series: [{ type: 'pie' }]`, `radius`, `center`, `startAngle`, `minAngle`, `avoidLabelOverlap`, `labelLayout`, `labelLine`, `legend`, `tooltip`, and emphasis behavior. Do not hand-draw slices, arcs, labels, guide lines, legends, or center text with SVG/HTML/CSS/canvas while claiming an ECharts pie/donut.
- Set `startAngle: 90` or the project-equivalent top start convention so the first slice starts from the top and proceeds clockwise. Slice order should follow value descending or a declared business order; `其他` stays last.
- Negative values are invalid for pie/donut. All-zero values must render an empty/all-zero state such as `暂无有效占比`, not fake shares. A single category may render a full ring/slice labeled `100%`.
- Default label strategy: legend shows category + percent; tooltip shows exact values. Do not show every outside label by default.
- Outside labels are allowed only for large components with category count `<= 5` and passing collision checks. Reserve `labelLineBudget = 24-48px`, set label max width/wrap/truncation disclosure, enable overlap hiding, and configure edge/bleed margins.
- Inside labels show percent only and hide when slice angle is `< 18deg`. Do not place long category names inside slices.
- Center text is donut-only by default: total value, selected category, Top1 share, or empty/all-zero message. Keep `centerTextMaxW = innerR * 1.5`, shorten units/decimals when needed, and disclose full values in tooltip.
- Tooltip must include category, value + unit, percent, rank, change-rate when available, and source/period/filter context.

### Small-Card Donut Hard Rules

For donut charts inside small cards, KPI tiles, compact sub-blocks, or narrow dashboard cards:

- Use a bottom legend by default. Bottom legends must declare `legendBandHeight` before choosing chart body height, `center`, and `radius`.
- If outside labels are enabled, a right-side legend must first pass a width budget. If the budget does not pass, use a bottom legend instead.
- Right-side legends are allowed only when the card is wide enough and outside labels are disabled or limited to key labels such as Top N, selected, anomaly, or current focus categories.
- For wide report components (`W >= 480px`), a right legend is allowed when `legendSideWidth = clamp(120px, CW * 0.28, 200px)` passes and the pie area remains readable. For narrower components, use a bottom legend with `legendBandHeight = 36-56px`.
- Declare the donut space budget explicitly:

```text
legendBandHeight = <px or %>      // required for bottom legend
legendSideWidth = <px or %>       // required for right legend
labelLineBudget = <px>            // reserved outward space for labels and guide lines
center = [x, y]
radius = [inner, outer]
```

- Recommended radius algorithm:

```text
labelReserve = 0px when outside labels are hidden
labelReserve = 24-48px when outside labels are visible
outerR = min(pieAreaWidth - 2 * labelReserve, pieAreaHeight - 2 * labelReserve) / 2
outerR = clamp(48px, outerR, 160px)
innerR = outerR * 0.62
```

- Recommended donut inner radius ratio: small `0.56-0.60`, standard `0.60-0.66`, large `0.64-0.70`.
- Shrink radius deliberately after legend and `labelLineBudget` reservation; do not use a large default radius that pushes labels into card edges or legends.
- Set label constraints explicitly: maximum label width, wrapping or truncation policy, tooltip/full label disclosure, `labelLayout: { hideOverlap: true }`, `bleedMargin`, and `edgeDistance` where supported.
- Low-share categories may hide permanent outside labels. Full category name, value, percentage, and status must remain available through tooltip and legend. Do not force every low-value slice to keep an outside label when it creates a crowded label ring.
- Outside labels and guide lines must stay inside the card bounds. If labels cannot fit with `hideOverlap`, reduced radius, `bleedMargin`, `edgeDistance`, and low-value label hiding, move detail to legend/tooltip or switch to bar/table.
- Center text, slice labels, label lines, legend, tooltip trigger area, and card title must each have reserved space. No element may rely on `overflow: hidden` to hide a collision.
- Do not accept a configuration that says only "adjust legend position"; it must include the legend band/width, `labelLineBudget`, `center`, and `radius` decisions.


## Radar

- Use radar only for multi-dimensional score/health/profile comparison where shape, balance, strengths, weaknesses, or actual-vs-target gap is the main task. Do not use it for precise value lookup or unrelated raw-unit comparison.
- Recommended dimensions: `5-8`. `3-4` is allowed but weak; `9-10` requires abbreviated labels and hidden ordinary value labels; `>10` should become facets, bar chart, or table.
- Recommended visible series: `1-2`; maximum normal visible series is `3`. More objects require a selector, facets, small multiples, bar chart, or table.
- Radar values must share one comparable scale, normally `0-100`. If raw fields use different units, plot standardized scores and expose raw value, target, and score in tooltip.
- Follow `12-internal-placement-algorithms.md`: reserve title/subtitle, optional metric strip, legend, plot, dimension-label outer ring, optional footer, local filter, and state geometry before setting ECharts options.
- Component-local filters are allowed only for lightweight current-chart changes such as `本月 / 本季 / 本年`, `实际 / 达成率 / 评分`, `本期 / 上期`, or one small object switch. Keep filters separate from legend and collapse to dropdown before shrinking the radar body below budget.
- Use ECharts `series: [{ type: 'radar' }]`, `radar.indicator`, `radar.center`, `radar.radius`, `radar.shape`, `radar.splitNumber`, `axisName`/`name.textStyle`, `nameGap`, `tooltip`, `legend`, and ECharts emphasis/blur. Do not hand-draw radar polygons, rings, axes, points, or legends with SVG/HTML/CSS/canvas while claiming an ECharts radar.
- Set the radar center and radius from a measured plot viewport:

```text
labelOuterGap = 12-20px
labelMaxW = 48-80px
labelMaxH = 16-32px
R = min(plotW / 2 - labelMaxW - labelOuterGap, plotH / 2 - labelMaxH - labelOuterGap)
R = clamp(48px, R, 180px)
```

- Keep the radar coordinate system circular. Do not let the radar stretch into an ellipse because the container is wide or tall. Use uniform scale, square/near-square inner geometry, and centered unused space.
- Default grid: polygon shape for BI reports, `splitNumber` `3-5` by radius, weak `1px` axis/split lines. Circular grid is a named variant for softer big-screen display, not the default.
- Keep indicator names short: `2-6` Chinese characters preferred. `7-10` may wrap to two lines if fit passes; longer names must abbreviate and expose the full label in tooltip.
- Dimension labels sit outside the outer ring with `nameGap`/label gap `12-20px` and quadrant alignment. Do not shrink labels below `11px`; reduce radius, abbreviate labels, enlarge the chart, or switch chart type first.
- Actual series uses solid line `2px`, point radius `3-4px`, hover radius `5-6px`, and light area fill opacity `8%-18%`.
- Target series uses dashed or weak outline around target values, `1.5px`, with no fill or very weak fill. A shared target such as `80分` may be a target ring. Previous period should be weak/dashed.
- Permanent value labels are not default. Show all values only when `N <= 5` and collision checks pass; for `6-8`, show max/min/anomaly/selected; for `>8` or multi-series, use tooltip.
- Tooltip must include dimension, actual, target, attainment/gap, previous/change-rate when available, unit/score scale, raw value when standardized, and period/source context.
- If labels collide with title, edge, legend, metric strip, filter, or each other, collapse filter/legend/metrics, reduce radius, abbreviate labels, hide value labels, enlarge the component, or switch chart type. Do not solve collisions with clipping.


## Gauge

Use Gauge only for one bounded progress/status metric, such as completion rate, attainment, resource usage, risk score, health score, SLA attainment, budget consumption, or target progress. Do not use Gauge for multi-category comparison, time trend, composition, exact-value audit, unbounded metrics, or many same-weight gauges on one screen. If the user only needs a number, use a KPI card; if they need comparison, use bar/table; if they need movement, use line.

Data contract:

- Required fields: metric name, current value, unit, `minValue`, `maxValue`, period/source, and status rule.
- Target, thresholds, change rate, and metric strip items are optional but must declare formulas and units when shown.
- `ratio = (currentValue - minValue) / (maxValue - minValue)` and `ratio` is clamped to `0-1` for arc drawing. When true value is below min or above max, the center value shows the real value and tooltip explains overflow.
- `maxValue == minValue`, missing current value, missing target, missing thresholds, denominator zero, and comparison-period zero all need explicit display behavior.
- Status color is driven by business meaning, not raw high/low. High risk, complaint rate, failure rate, CPU load, and cost consumption cannot reuse positive-progress colors without a declared threshold rule.

Default report shape:

- Use a semicircle Gauge by default: `startAngle = 180`, `endAngle = 0`, center value prominent, light target tick, only key min/max ticks.
- A `240deg` arc or circular Gauge is allowed for large screens/monitoring when height is sufficient.
- Pointer Gauge is optional and should be used only for risk, pressure, load, temperature, or health-score monitoring. Completion/progress gauges should usually use progress arc only.
- Threshold segments are limited to `3-4` by default and `<=5` maximum. More status levels require a table, legend, or simplified state mapping.

Placement and geometry:

- Follow `12-internal-placement-algorithms.md`: reserve title, local filter, subtitle, optional metric strip, Gauge area, status/footer, and state geometry before setting ECharts options.
- The Gauge body should keep `gaugeAreaH >= CH * 0.50`. If space is tight, hide footer, reduce metric strip, collapse filter, hide middle ticks, hide threshold labels, and keep only center value plus progress arc.
- Use ECharts `series: [{ type: 'gauge' }]`, `min`, `max`, `startAngle`, `endAngle`, `radius`, `center`, `progress`, `axisLine`, `axisTick`, `splitLine`, `axisLabel`, `pointer`, `anchor`, `detail`, `data`, `markPoint`/custom target marker when needed, `tooltip`, and emphasis behavior. Do not hand-draw arcs, ticks, labels, needles, legends, or targets with SVG/HTML/CSS/canvas while claiming an ECharts Gauge.
- Preserve arc geometry. Do not stretch a circular or semicircular Gauge independently on X/Y; use a measured inner fit box and center unused space.
- Default Gauge area formulas:

```text
centerX = plotX + plotW / 2
centerY = plotY + plotH * 0.72 for 180deg semicircle
centerY = plotY + plotH * 0.58-0.64 for 240deg arc
R = min(plotW / 2, plotH * 0.82) - labelReserve
R = clamp(44px, R, 220px)
arcW = clamp(8px, R * 0.12, 22px)
valueFontSize = clamp(24px, R * 0.32, 42px)
unitFontSize = valueFontSize * 0.45-0.55
```

Labels and targets:

- Center value plus unit is the primary visual anchor and must be measured as one centered group. Status text sits `4-6px` below the value.
- Keep ticks sparse: show min/max by default, optional midpoint only when radius and label space pass. Tick labels use `11-12px`.
- Target marker default is a short radial tick. Target label is optional; hide the label and keep tooltip when it collides with ticks, arc, center value, or card edge.
- Legend is normally unnecessary. Use a legend only when threshold segments are not self-explanatory and keep legend items `<=4`, maximum `5`.

Tooltip and interaction:

- Tooltip must include metric, current value, range, target, gap, status, threshold interval, change rate when present, period, source, and overflow/denominator notes.
- Hovering progress arc highlights the current arc and weakens the background track. Hovering target marker shows target tooltip.
- Clicking Gauge may pin tooltip, open metric detail, or link sibling components only when an event contract exists.

States:

- Loading skeleton preserves title/filter/arc/value geometry.
- Empty or missing current value shows center `--` and does not draw progress arc.
- Missing target hides target marker. Missing thresholds uses a single progress color.
- Out-of-range current value clamps the arc but displays the real center value.
- Many gauges in one view must use unified range, status colors, type, typography, and radius ratio; otherwise switch to KPI cards or a comparison table.
