# Specialized Chart Placement Algorithms

This file is now a routing index. Load the smallest matching split file instead of loading the whole specialized chart placement algorithms set.

## Split Reference Map

| Need | Read |
| --- | --- |
| Radar charts | `12d1-placement-radar.md` |
| Gauge charts | `12d2-placement-gauge.md` |
| Scatter and bubble charts | `12d3-placement-scatter-bubble.md` |
| Parallel coordinates | `12d4-placement-parallel-coordinates.md` |
| Map and geographic charts | `12d5-placement-map-geographic.md` |
| Candlestick / K-line charts | `12d6-placement-candlestick-kline.md` |
| Boxplot / box-and-whisker charts | `12d7-placement-boxplot.md` |
| Matrix, time, calendar, and correlation heatmaps | `12d8-placement-heatmap-matrix.md` |

## Loading Guidance

- Start here only to choose the exact placement reference.
- Load `12a-placement-foundation-controls.md` first when local-filter geometry or shared coordinate variables are needed.
- Load only the split file that matches the component family in the user request.
- Pair the placement file with the visual/content reference for the same family, such as `05-echarts-charts.md`, `06-analytical-tables.md`, `03-text-summary.md`, or `04-kpi-metric-cards.md`.
