# Candlestick / K-Line Chart Placement Algorithm
This file was split from `12d-placement-specialized-charts.md`. Load it only when this exact component family is present; use `12d-placement-specialized-charts.md` as the routing index.


Use this for financial, price, quote, exchange-rate, commodity, or market-like data where each time point has `open`, `high`, `low`, and `close`. A candlestick chart is valid only when OHLC volatility matters. If the user only needs a single price trend, use a line chart instead.

### Anatomy

| Slot | Required | Default behavior |
| --- | ---: | --- |
| Chart title | Yes | Block-owned title or component top-left title; do not duplicate both |
| Component-local filter | Optional | Title-right capsule/dropdown for current candlestick only |
| Subtitle/unit/definition | Optional | Instrument, market, period, unit, adjustment mode, and delay |
| Metric strip | Recommended | At most `3-4` items such as latest price, change, change rate, volume, amplitude |
| Indicator legend | Optional | MA5/MA10/MA20, volume, or one optional technical indicator |
| Main candlestick plot | Yes | Candles, wicks, moving averages, price axis, crosshair |
| Price Y axis | Yes | Right side by market convention, left side allowed by product convention |
| Time X axis | Yes | Date/time labels sampled by density |
| Volume subplot | Optional, recommended default | Shares the same x positions as candles |
| Technical indicator subplot | Optional | MACD/KDJ/RSI only for professional scenes; off by default |
| High/low markers | Optional | Current visible-range highest and lowest only |
| Crosshair / axis pointer | Recommended | Vertical and horizontal reading aid with current time/price labels |
| Brush / dataZoom | Optional | Required for dense visible history |
| Tooltip | Yes | Time, open, high, low, close, change, change rate, volume, MA values, unit/source |
| Footer metadata | Optional | Source/freshness/delay/adjustment note |
| State mask | Yes | Loading, empty, error, no-permission, missing OHLC, equal prices, insufficient MA |

### Fit Gate And Chart Type Choice

| Condition | Decision |
| --- | --- |
| Missing any of `open/high/low/close` | Do not use candlestick; use line/table or mark data gap |
| Only one price/value per time point | Use line/area instead |
| No ordered time dimension | Do not use candlestick |
| User is not expected to understand OHLC and volatility is not the task | Use line/KPI/table |
| Need exact audit of all rows | Add table/detail; candlestick is overview |
| Need composition, ranking, relationship, or geography | Use the matching chart family |
| `N <= 30` visible candles | Wide candles, sparse labels allowed |
| `31 <= N <= 80` | Standard candlestick |
| `81 <= N <= 150` | Narrow body, sampled time labels |
| `151 <= N <= 300` | Use brush/dataZoom; thin body |
| `N > 300` | Default to recent window plus dataZoom, aggregation, or detail table |

### Size Tiers

| Tier | Condition | Keep | Remove/collapse first |
| --- | --- | --- | --- |
| Tiny | `W < 360` or `H < 260` | Title, single dropdown filter, main candlestick, price axis, sampled time axis, tooltip | Subtitle, secondary metrics, volume, legend, high/low labels, footer |
| Standard | `360 <= W < 720` and `H >= 320` | Title, one filter, metric strip, main candlestick, volume, price/time axes, tooltip | Secondary MA lines, brush, technical indicators |
| Large | `W >= 720` and `H >= 420` | Full structure, volume, up to `3` MA lines, brush, crosshair, optional one technical subplot | Ordinary per-candle labels still forbidden |

Minimum recommended size:

```text
minW = 320px
minH = 260px
recommendedW = 560-960px
recommendedH = 360-520px
```

### Layout Variables

```text
W = component width
H = component height
P = clamp(12px, W * 0.04, 24px)
CW = W - 2 * P
CH = H - 2 * P
gap = 6-12px
```

Recommended bands:

```text
titleAreaH = 36-56px
metricH = 0-52px
legendH = 0-28px
xAxisH = 24-36px
brushH = 0-28px
footerH = 0-24px
```

Chart height:

```text
chartTopY = P + titleAreaH + metricH + legendH + topGaps
chartH = H - P - chartTopY - xAxisH - brushH - footerH - bottomGaps
```

Main candlestick budget:

```text
mainChartH >= CH * 0.45
```

If `mainChartH < CH * 0.45`, degrade in this order:

1. Hide footer metadata and move it to tooltip/detail.
2. Reduce metric strip to `2-3` items.
3. Hide secondary MA lines and collapse legend to `指标 ▾`.
4. Hide volume subplot.
5. Collapse local filters to one dropdown.
6. Enlarge the component or switch to line/table.

### Slot Geometry

```text
filterH = clamp(24px, H * 0.08, 32px)
optionW = clamp(44px, textWidth + 24px, 96px)
filterW = sum(optionW) + 4px
filterMaxW = min(CW * 0.45, 280px)
filterX = W - P - filterW
filterY = P + (titleLineH - filterH) / 2
titleX = P
titleY = P
titleMaxW = CW - filterW - 12px
```

Collapse the filter to one dropdown before adding an extra filter row. Candlestick charts need vertical plot area.

Metric strip:

```text
metricX = P
metricY = P + titleAreaH + 8px
metricW = CW
metricH = 36-48px
M = 3 or 4
metricGap = 12-24px
metricItemW = (CW - metricGap * (M - 1)) / M
```

Main plot:

```text
yAxisW = clamp(44px, maxPriceLabelW + 8px, 80px)
leftGap = 8-16px
rightGap = 8-16px
plotX = P + leftGap
plotW = CW - leftGap - yAxisW - rightGap
plotY = chartTopY
priceAxisX = plotX + plotW + 6px
```

Financial market convention prefers the price axis on the right. BI report variants may place it on the left if the product standard requires that.

When volume is present:

```text
volumeH = chartH * 0.22-0.28
mainChartH = chartH - volumeH - volumeGap
volumeGap = 6-10px
volumePlotX = plotX
volumePlotY = plotY + mainChartH + volumeGap
volumePlotW = plotW
volumePlotH = volumeH
```

When one technical indicator subplot is present:

```text
mainChartH = chartH * 0.60-0.66
volumeH = chartH * 0.16-0.20
indicatorH = chartH * 0.16-0.20
volumeH + indicatorH <= chartH * 0.38
```

Do not show multiple technical subplots in a compact report card.

### Component-Local Filters

Suitable local filters:

- Period granularity: `分时 / 日K / 周K / 月K`.
- Range: `1日 / 5日 / 1月 / 6月 / 1年`.
- Adjustment: `不复权 / 前复权 / 后复权`.
- View metric: `价格 / 涨跌幅`, `成交量 / 成交额`.
- Indicator: `MA / MACD / KDJ / RSI` as a compact selector.

Unsuitable local filters:

- Complex instrument discovery such as exchange + sector + industry + symbol + adjustment + indicator + period.
- Filters that change page/global market scope, permission scope, export scope, or other components.

Use one visible filter group by default. Two groups are allowed only when `W >= 720px` and title/subtitle fit passes; otherwise keep period as the visible control and move range to brush/dataZoom or dropdown.

### OHLC Data Contract

Each row must include:

```text
time
open
high
low
close
optional volume
optional change
optional changeRate
```

Validation:

```text
high >= max(open, close)
low <= min(open, close)
time rows sorted ascending before rendering
open/high/low/close numeric and same price unit
```

Invalid OHLC rows are not drawn as normal candles. Mark them as data gaps and expose count/detail in tooltip, footer, or QA evidence.

Time continuity must be declared:

- Trading-calendar mode: missing non-trading days are ignored.
- Real-time mode: gaps show actual elapsed time.
- Unknown mode is a design gap for financial/market charts.

### X Distribution And Candle Geometry

```text
N = visibleDataCount
bandW = plotW / N
candleCenterX[i] = plotX + i * bandW + bandW / 2
bodyW = clamp(3px, bandW * 0.55, 14px)
```

When the chart is very wide and `N` is small, `bodyW <= 18px`. When `bandW < 3px`, switch to thin-line mode, show fewer visible candles, or require dataZoom.

Price range:

```text
priceMin = min(lowValues, maValues)
priceMax = max(highValues, maValues)
pricePadding = max((priceMax - priceMin) * 0.08, priceMax * 0.005)
yMin = niceMin(priceMin - pricePadding)
yMax = niceMax(priceMax + pricePadding)
```

If all prices are equal, expand the fallback range around the price rather than drawing a flat line on the edge.

Coordinate mapping:

```text
priceToY(value) = plotY + mainChartH * (1 - (value - yMin) / (yMax - yMin))
openY = priceToY(open)
closeY = priceToY(close)
highY = priceToY(high)
lowY = priceToY(low)
```

Wick and body:

```text
wickX = candleCenterX
wickY1 = highY
wickY2 = lowY
wickWidth = 1px
bodyX = candleCenterX - bodyW / 2
bodyY = min(openY, closeY)
bodyH = max(1px, abs(openY - closeY))
```

Open equals close renders as a thin body or horizontal mark, not as missing data.

### Rise/Fall Color Semantics

Candlestick colors must be configurable by market convention:

```text
riseColor
fallColor
flatColor
```

Direction:

```text
close > open => rise
close < open => fall
close == open => flat
```

Chinese market convention usually uses red for rise and green for fall. International market convention often uses green for rise and red for fall. The component must name the convention; do not silently use generic positive/negative report colors if the market uses the opposite convention.

### Volume Subplot

Volume bars share candle centers:

```text
volumeBarCenterX[i] = candleCenterX[i]
volumeBarW = bodyW
volumeMax = niceMax(max(volumeValues))
volumeBarH = volumePlotH * volume / volumeMax
volumeBarY = volumePlotY + volumePlotH - volumeBarH
```

Volume color follows candle direction with lower opacity:

```text
volumeOpacity = 45%-70%
```

Missing volume behavior must be declared: hide volume subplot, draw zero, or show missing state. Do not silently mix missing volume with real zero volume.

### Moving Averages And Technical Indicators

Default moving averages:

```text
MA5
MA10
MA20
```

Do not show more than `3` MA lines by default. More indicators require legend toggles, dropdown, fullscreen, or professional-analysis mode.

```text
MA_N[i] = average(close of latest N rows)
maX[i] = candleCenterX[i]
maY[i] = priceToY(MA_N[i])
```

If fewer than `N` rows exist, do not draw the early MA points, or start drawing from the first valid point.

MA style:

```text
lineWidth = 1-1.5px
hoverLineWidth = 2px
opacity = 80%-100%
```

MA lines must not overpower the candles.

Technical indicators such as MACD/KDJ/RSI are optional and off by default unless the component is explicitly for professional market analysis.

### Axes And Label Density

Price ticks:

```text
tickCount = clamp(3, floor(mainChartH / 48px), 6)
```

Recommended:

| Main height | Price ticks |
| ---: | ---: |
| `<160px` | `3` |
| `160-240px` | `4` |
| `240-360px` | `5` |
| `>360px` | `5-6` |

Time label sampling:

```text
minLabelW = 56-72px
maxLabelCount = floor(plotW / minLabelW)
labelStep = ceil(N / maxLabelCount)
```

Keep first/last labels and important month/year boundaries before regular sampling. Time labels align to candle centers.

### High/Low Markers

Show at most the visible-range highest high and lowest low by default.

```text
highLabelX = candleCenterX[highestIndex]
highLabelY = priceToY(highestValue) - 6px
lowLabelX = candleCenterX[lowestIndex]
lowLabelY = priceToY(lowestValue) + 6px
```

Markers flip away from chart edges. Do not label every candle's high/low.

### Crosshair, DataZoom, And Tooltip

Crosshair:

```text
lineWidth = 1px
lineStyle = dashed or thin solid
opacity = 50%-70%
```

The crosshair should expose current time and price labels without dominating the chart.

Use brush/dataZoom when `N > 80`; for `N > 150`, default to a recent visible window. Brush stays at the bottom:

```text
brushX = plotX
brushY = H - P - brushH
brushW = plotW
brushH = 20-28px
```

Tooltip payload:

```text
time
open/high/low/close + unit
change and changeRate
volume
MA values when present
adjustment mode
source/period/delay
```

Tooltip width is `180-320px`, padding `8-12px`, text `12px/18px`, and flips away from viewport edges. A fixed top-left/right tooltip is allowed in professional market charts only if it does not cover the newest candles.

### State Geometry

| State | Behavior |
| --- | --- |
| Loading | Preserve title/filter/metric/main/volume/axis skeleton geometry |
| Empty | Main plot shows `暂无数据`; axes/legend geometry remains stable |
| Error | Preserve geometry and show retry/detail when available |
| No permission | Preserve geometry and explain permission without leaking values |
| Missing OHLC | Skip invalid candles and expose count/detail |
| Missing volume | Hide volume, draw zero, or state missing according to contract |
| Equal prices | Expand y-axis fallback range |
| Time discontinuity | Use declared trading-calendar or real-time spacing mode |
| Adjustment data missing | Hide adjustment filter and note unavailable state |
| Insufficient MA period | Start MA only after enough rows exist |
| Delayed data | Show delay in subtitle or footer |
