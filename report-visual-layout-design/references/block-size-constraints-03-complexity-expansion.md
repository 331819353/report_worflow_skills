# Complexity Based Size Expansion

This file was split from `block-size-constraints.md`. Load it only for this focused rule group; use `block-size-constraints.md` as the routing index.

## 6. Complexity-Based Size Expansion Rules

After applying the component type's base minimum size, expand the required size according to content complexity.

### KPI Rules

If a KPI contains any of the following, it is not `simple_kpi`:

- more than one secondary metric;
- sparkline;
- progress bar;
- gauge;
- multiline explanation;
- more than two comparison values.

Reclassify it as `rich_kpi`, `mini_chart_kpi`, `progress_kpi`, or `gauge_kpi`.

### Chart Rules

For charts:

```text
if legend_item_count > 4:
  min_outer_height_px += 40

if legend_item_count > 8:
  min_outer_width_px += 80
  min_outer_height_px += 60

if x_axis_label_count > 6:
  min_outer_height_px += 32

if x_axis_label_count > 12:
  min_outer_width_px += 80
  min_outer_height_px += 48

if y_axis_label_max_length > 8 Chinese characters:
  min_outer_width_px += 48
```

Never solve chart overcrowding only by reducing font size. Increase span, reduce label density with a reversible interaction, split, or paginate.

### Table Rules

For tables:

```text
if column_count > 6:
  min_outer_width_px = max(min_outer_width_px, 760)

if column_count > 10:
  min_outer_width_px = max(min_outer_width_px, 900)
  use horizontal scroll, column hiding, or pagination

if row_count > 20:
  min_outer_height_px += 96
  prefer pagination or virtual scrolling

if visible_rows < 5:
  increase row_span or paginate
```

### Path Chart Rules

For `path_chart`, `conversion_path`, `flow_chart`, and similar ordered path components:

```text
if node_count <= 8 and link_count <= 8:
  use base minimum size

if 9 <= node_count <= 20 or 9 <= link_count <= 20:
  min_outer_width_px += 120
  min_outer_height_px += 60
  hide ordinary path labels before shrinking path viewport

if 21 <= node_count <= 40 or 21 <= link_count <= 50:
  min_outer_width_px = max(min_outer_width_px, 760)
  min_outer_height_px = max(min_outer_height_px, 420)
  prefer 8-column full-width layout
  require Top N, aggregation, pagination, or horizontal scroll

if node_count > 40 or link_count > 50:
  do not render as a full path chart
  filter, paginate, aggregate into "other", switch to Sankey/relation graph, or provide a detail table
```

### Relationship Graph Rules

For `relationship_graph`, `dependency_graph`, `topology_graph`, and similar graph components:

```text
if node_count <= 30 and edge_count <= 50:
  use base minimum size

if 31 <= node_count <= 80 or 51 <= edge_count <= 150:
  min_outer_width_px += 120
  min_outer_height_px += 80
  hide ordinary labels before shrinking graph viewport

if 81 <= node_count <= 150 or 151 <= edge_count <= 300:
  min_outer_width_px = max(min_outer_width_px, 760)
  min_outer_height_px = max(min_outer_height_px, 520)
  prefer 8-column full-width layout
  require aggregation, filtering, neighborhood focus, or layered loading

if edge_count > node_count * 2:
  min_outer_width_px += 120
  min_outer_height_px += 80

if node_count > 150 or edge_count > 300:
  default to local exploration, aggregation, filtering, or fullscreen

if node_count > 300 or edge_count > 300:
  do not render as a dense single graph
  split by cluster, paginate, collapse nodes, or provide a summary table
```

### Sankey Rules

For `sankey_chart`:

```text
recommended_width_px = 560-960
recommended_height_px = 360-520
minimum_width_px = 320
minimum_height_px = 260

sankeyAreaH must be >= CH * 0.55

if stages_count <= 4 and node_count <= 12 and link_count <= 20:
  use base minimum size

if node_count > 12 or link_count > 20:
  min_outer_width_px += 120
  min_outer_height_px += 80
  hide ordinary link labels before shrinking Sankey viewport

if 31 <= node_count <= 60 or 51 <= link_count <= 100:
  min_outer_width_px = max(min_outer_width_px, 760)
  min_outer_height_px = max(min_outer_height_px, 440)
  require Top N + "other", long-tail weakening, or local filtering

if node_count > 60 or link_count > 100:
  do not render as one full Sankey
  use aggregation, drilldown, fullscreen, path/funnel/table fallback, or split by stage

if stages_count > 4:
  min_outer_width_px = max(min_outer_width_px, 760)
  min_outer_width_px += 120
  use 8-column full-width layout

if stages_count > 5:
  use drilldown, pagination, path chart, or table fallback

if assigned_span is 2x2:
  reject; Sankey requires at least 3x2 because horizontal layer spacing is decision-critical

if actual_flow_width_px < 180:
  use simplified mode: title, compact local filter, Top5 flows, key nodes only, no metric strip, no legend row, no permanent link labels

node labels:
  nodeH >= 28px => name + value
  nodeH >= 16px => name only
  nodeH < 16px => tooltip only

link labels:
  show only for main/loss/anomaly flows
  require linkW >= 8px and no overlap

negative value:
  invalid for Sankey; choose another chart

unbalanced flow:
  expose "loss", "unknown", or "other" nodes rather than disappearing flow

local filters:
  collapse to dropdown before shrinking the Sankey body
  never mix with legend or page/global filters

recommended default:
  3-4 layers, Top10 + other, nodeW 10-14px, nodeGap 8-16px, link opacity 35%-60%, main flow 70%-90%
```

### Flow Chart Rules

For `flow_chart`:

```text
if step_count <= 5:
  use base minimum size

if step_count > 5:
  min_outer_width_px += 120
  min_outer_height_px += 80

if step_count > 10:
  use full-width layout or split into phases
```

### Org Chart / Tree Diagram Rules

For `org_chart`, `tree_diagram`, and `duPont_chart`:

```text
if tree_depth > 4:
  min_outer_height_px += 96

if max_nodes_per_level > 4:
  min_outer_width_px += 160

if total_node_count <= 30 and tree_depth <= 4:
  visible tree may be complete

if total_node_count > 30 or tree_depth > 4:
  default expand only 2-3 levels
  collapse deeper branches

if total_node_count > 80 or max_child_count > 12:
  require expand/collapse, search/locate, and Top N/+N child display

if total_node_count > 150 or tree_depth > 10 or max_child_count > 30:
  use indented tree list, virtual scroll, pagination, fullscreen, or table/detail fallback
```

### Gantt Chart Rules

For `gantt_chart`:

```text
if task_count > 8:
  min_outer_height_px += 96

if task_count > 16:
  use pagination or vertical scrolling

if time_bucket_count > 8:
  min_outer_width_px = max(min_outer_width_px, 900)
  use full-width layout
```

### Map Rules

For `map` and `geo_heatmap`:

```text
if region_label_count > 8:
  min_outer_width_px += 80
  min_outer_height_px += 60

if marker_count > 50:
  use clustering

if marker_count > 200:
  do not render all markers directly
  use aggregation, clustering, or heatmap
```

### Text Capacity Rule

Estimate text height before rendering:

```text
average_char_width_px =
font_size_px * 0.9 for Chinese text
font_size_px * 0.55 for English text
font_size_px * 0.75 for mixed text

estimated_lines =
ceil(text_character_count * average_char_width_px / component_content_width_px)

estimated_text_height_px =
estimated_lines * line_height_px
```

If estimated text height exceeds content height, increase span, shorten text, split, collapse secondary text, or move details to drawer.
